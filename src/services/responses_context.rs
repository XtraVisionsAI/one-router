//! In-memory context store for the OpenAI Responses API.
//!
//! Backs `previous_response_id` stateful continuation. Each stored entry holds
//! the conversation messages (for continuation) plus the full response JSON
//! (for the `GET /v1/responses/{id}` endpoint), bound to the creating API key's
//! owner hash. Ownership mismatches return `NotFound` (not a 403) so the store
//! never leaks the existence of another key's response.
//!
//! Mirrors the PTC session pattern (`services/ptc/service.rs`): an
//! `Arc<RwLock<..>>` with TTL expiry and a periodic sweeper driven from
//! `server/app.rs`. Bounded by entry count, a per-entry byte cap (oversized
//! turns are answered but not stored — the request itself is never rejected
//! for context size), a total byte budget, and per-owner (API key) **and**
//! per-user byte / entry quotas (an owner or user over quota evicts its own
//! oldest entries first, so one user with many keys cannot flush others).
//! Global eviction (store over its entry count / byte budget) is **fair**: it
//! takes the oldest entry of the *tenant* (user, or the key for ownerless
//! keys) with the largest current usage (bytes, then entry count, then oldest
//! entry), so a tenant at or below its fair share is never evicted while a
//! bigger one exists. Eviction is O(log n) via `seq`-ordered `BTreeMap`
//! indexes and a `BTreeSet` usage index. In-memory only — entries do not
//! survive a restart and are not shared across instances.

use std::cmp::Reverse;
use std::collections::{BTreeMap, BTreeSet, HashMap};
use std::sync::atomic::{AtomicU64, Ordering};
use std::sync::Arc;
use std::time::{SystemTime, UNIX_EPOCH};

use tokio::sync::RwLock;

/// Default time-to-live for a stored response context (1 hour).
pub const DEFAULT_TTL_SECS: u64 = 3600;

/// Default maximum number of stored responses before oldest-eviction kicks in.
pub const DEFAULT_MAX_ENTRIES: usize = 10_000;

/// Largest single entry (history text + response JSON). Chained
/// `previous_response_id` history grows with every turn; past this the turn is
/// answered but not stored.
pub const DEFAULT_MAX_ENTRY_BYTES: usize = 8 * 1024 * 1024;
/// Byte budget for the whole store (oldest entries are evicted to fit).
pub const DEFAULT_MAX_TOTAL_BYTES: usize = 512 * 1024 * 1024;
/// Per-owner (API key) byte quota: an owner over quota evicts its **own**
/// oldest entries, so one tenant cannot flush everyone else's context.
pub const DEFAULT_MAX_OWNER_BYTES: usize = 64 * 1024 * 1024;
/// Per-owner entry quota (same rationale as the byte quota).
pub const DEFAULT_MAX_OWNER_ENTRIES: usize = 1_000;
/// Per-user byte quota, summed over all of the user's keys (a user cannot
/// multiply its share of the store by minting keys).
pub const DEFAULT_MAX_USER_BYTES: usize = 128 * 1024 * 1024;
/// Per-user entry quota, summed over all of the user's keys.
pub const DEFAULT_MAX_USER_ENTRIES: usize = 2_000;

/// Store limits.
#[derive(Debug, Clone, Copy)]
pub struct ContextLimits {
    pub max_entries: usize,
    pub max_entry_bytes: usize,
    pub max_total_bytes: usize,
    pub max_owner_bytes: usize,
    pub max_owner_entries: usize,
    pub max_user_bytes: usize,
    pub max_user_entries: usize,
}

impl Default for ContextLimits {
    fn default() -> Self {
        Self {
            max_entries: DEFAULT_MAX_ENTRIES,
            max_entry_bytes: DEFAULT_MAX_ENTRY_BYTES,
            max_total_bytes: DEFAULT_MAX_TOTAL_BYTES,
            max_owner_bytes: DEFAULT_MAX_OWNER_BYTES,
            max_owner_entries: DEFAULT_MAX_OWNER_ENTRIES,
            max_user_bytes: DEFAULT_MAX_USER_BYTES,
            max_user_entries: DEFAULT_MAX_USER_ENTRIES,
        }
    }
}

/// Who stores an entry: the API key owner (ownership checks) and, for
/// database keys, the owning user (quota only).
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct ContextOwner {
    pub key: String,
    pub user: Option<String>,
}

impl ContextOwner {
    pub fn new(key: impl Into<String>, user: Option<String>) -> Self {
        Self {
            key: key.into(),
            user,
        }
    }
}

/// A single stored turn: the conversation as (role, text) pairs plus the full
/// response JSON.
#[derive(Debug, Clone)]
pub struct StoredResponse {
    pub owner_key_hash: String,
    /// Owning user (quota accounting only; ownership is `owner_key_hash`).
    pub user_id: Option<String>,
    pub created_at: u64,
    pub expires_at: u64,
    /// Monotonic insertion sequence — used for deterministic oldest-eviction
    /// (wall-clock `created_at` has only second granularity and ties).
    seq: u64,
    /// Accounted size (history text + serialized response JSON).
    bytes: usize,
    /// Conversation messages (role, text) used to reconstruct history on the
    /// next turn. Only text is retained — rich parts (images/tools) are dropped.
    pub messages: Vec<(String, String)>,
    /// The full Responses response object, returned verbatim by `GET`.
    pub response_json: serde_json::Value,
}

#[derive(Debug, thiserror::Error)]
pub enum ResponsesContextError {
    #[error("previous_response_id was not found")]
    NotFound,
}

fn now_secs() -> u64 {
    SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .map(|d| d.as_secs())
        .unwrap_or(0)
}

/// Accounted size of stored history messages.
pub fn messages_bytes(messages: &[(String, String)]) -> usize {
    messages.iter().map(|(r, t)| r.len() + t.len() + 16).sum()
}

#[derive(Default)]
struct OwnerUsage {
    bytes: usize,
    /// seq → response id, oldest first.
    order: BTreeMap<u64, String>,
}

/// Tenant of an entry for global (fair) eviction: the user, or — for keys
/// without a user (master / ephemeral / legacy) — the key itself. Prefixed so
/// a user id can never collide with a key hash.
fn tenant_of(entry: &StoredResponse) -> String {
    match &entry.user_id {
        Some(u) => format!("u:{u}"),
        None => format!("k:{}", entry.owner_key_hash),
    }
}

/// Usage-index key: ordered so the **last** element is the tenant to evict
/// from — most bytes, then most entries, then the oldest entry.
type UsageKey = (usize, usize, Reverse<u64>, String);

/// Entries plus the indexes that make eviction O(log n).
#[derive(Default)]
struct Inner {
    entries: HashMap<String, StoredResponse>,
    owners: HashMap<String, OwnerUsage>,
    users: HashMap<String, OwnerUsage>,
    /// Fair-eviction tenants (see [`tenant_of`]).
    tenants: HashMap<String, OwnerUsage>,
    /// One key per tenant in `tenants`, mirroring its current usage.
    by_usage: BTreeSet<UsageKey>,
    total_bytes: usize,
}

fn usage_key(tenant: &str, u: &OwnerUsage) -> Option<UsageKey> {
    let (&oldest, _) = u.order.first_key_value()?;
    Some((u.bytes, u.order.len(), Reverse(oldest), tenant.to_string()))
}

impl Inner {
    /// Apply `f` to a tenant's usage, keeping `by_usage` in step (O(log n)).
    fn update_tenant(&mut self, tenant: &str, f: impl FnOnce(&mut OwnerUsage)) {
        let usage = self.tenants.entry(tenant.to_string()).or_default();
        if let Some(k) = usage_key(tenant, usage) {
            self.by_usage.remove(&k);
        }
        f(usage);
        match usage_key(tenant, usage) {
            Some(k) => {
                self.by_usage.insert(k);
            }
            None => {
                self.tenants.remove(tenant);
            }
        }
    }

    fn remove(&mut self, id: &str) -> Option<StoredResponse> {
        let entry = self.entries.remove(id)?;
        self.total_bytes -= entry.bytes;
        unaccount(&mut self.owners, &entry.owner_key_hash, &entry);
        if let Some(user) = &entry.user_id {
            unaccount(&mut self.users, user, &entry);
        }
        self.update_tenant(&tenant_of(&entry), |u| {
            u.bytes -= entry.bytes;
            u.order.remove(&entry.seq);
        });
        Some(entry)
    }

    /// Fair global eviction: the oldest entry of the tenant with the largest
    /// usage. `incoming` is the tenant about to insert `incoming_bytes`; it
    /// competes with its usage *including* the pending entry, so a tenant
    /// that is itself the biggest pays for its own insert.
    fn evict_fair(&mut self, incoming: &str, incoming_bytes: usize) -> bool {
        let Some(top) = self.by_usage.last().cloned() else {
            return false;
        };
        let victim = match self
            .tenants
            .get(incoming)
            .and_then(|u| usage_key(incoming, u))
        {
            Some((b, n, oldest, t))
                if t != top.3 && (b + incoming_bytes, n + 1, oldest) >= (top.0, top.1, top.2) =>
            {
                t
            }
            _ => top.3,
        };
        let id = self
            .tenants
            .get(&victim)
            .and_then(|u| u.order.first_key_value().map(|(_, id)| id.clone()));
        match id {
            Some(id) => self.remove(&id).is_some(),
            None => false,
        }
    }

    /// Evict the oldest entry of `name` in the `owners` (`users == false`) or
    /// `users` index.
    fn evict_oldest_in(&mut self, users: bool, name: &str) -> bool {
        let index = if users { &self.users } else { &self.owners };
        let id = index
            .get(name)
            .and_then(|o| o.order.first_key_value().map(|(_, id)| id.clone()));
        match id {
            Some(id) => self.remove(&id).is_some(),
            None => false,
        }
    }

    fn usage_in(&self, users: bool, name: &str) -> (usize, usize) {
        let index = if users { &self.users } else { &self.owners };
        index
            .get(name)
            .map(|o| (o.bytes, o.order.len()))
            .unwrap_or((0, 0))
    }

    fn insert(&mut self, id: String, entry: StoredResponse) {
        self.total_bytes += entry.bytes;
        let o = self.owners.entry(entry.owner_key_hash.clone()).or_default();
        o.bytes += entry.bytes;
        o.order.insert(entry.seq, id.clone());
        if let Some(user) = &entry.user_id {
            let u = self.users.entry(user.clone()).or_default();
            u.bytes += entry.bytes;
            u.order.insert(entry.seq, id.clone());
        }
        let (bytes, seq) = (entry.bytes, entry.seq);
        let id_for_tenant = id.clone();
        self.update_tenant(&tenant_of(&entry), |u| {
            u.bytes += bytes;
            u.order.insert(seq, id_for_tenant);
        });
        self.entries.insert(id, entry);
    }
}

fn unaccount(index: &mut HashMap<String, OwnerUsage>, name: &str, entry: &StoredResponse) {
    if let Some(o) = index.get_mut(name) {
        o.bytes -= entry.bytes;
        o.order.remove(&entry.seq);
        if o.order.is_empty() {
            index.remove(name);
        }
    }
}

/// In-memory, ownership-bound store for Responses continuation context.
pub struct ResponsesContextStore {
    inner: Arc<RwLock<Inner>>,
    seq: AtomicU64,
    ttl_secs: u64,
    limits: ContextLimits,
}

impl ResponsesContextStore {
    pub fn new() -> Self {
        Self::with_config(DEFAULT_TTL_SECS, DEFAULT_MAX_ENTRIES)
    }

    pub fn with_config(ttl_secs: u64, max_entries: usize) -> Self {
        Self::with_limits(
            ttl_secs,
            ContextLimits {
                max_entries,
                ..ContextLimits::default()
            },
        )
    }

    pub fn with_limits(ttl_secs: u64, limits: ContextLimits) -> Self {
        Self {
            inner: Arc::new(RwLock::new(Inner::default())),
            seq: AtomicU64::new(0),
            ttl_secs,
            limits,
        }
    }

    /// Store a response's context. The size is measured on what is actually
    /// stored (history text + response JSON), not on the request. Returns
    /// `false` (and logs a warning) when the entry exceeds the per-entry cap
    /// or a quota — the turn behaves as `store: false` and a later
    /// `previous_response_id` naming it gets the normal not-found error.
    /// Otherwise evicts, oldest first: the key owner's own entries while it is
    /// over its quota, then the user's own entries while the user is over its
    /// quota, then — while the store is over capacity / bytes — the oldest
    /// entry of the largest tenant (fair eviction, see the module docs).
    pub async fn save(
        &self,
        response_id: &str,
        owner: &ContextOwner,
        messages: Vec<(String, String)>,
        response_json: serde_json::Value,
    ) -> bool {
        let owner_key_hash = owner.key.as_str();
        let json_bytes = serde_json::to_vec(&response_json)
            .map(|v| v.len())
            .unwrap_or(0);
        let bytes = messages_bytes(&messages) + json_bytes + response_id.len();
        let limits = self.limits;
        if bytes > limits.max_entry_bytes
            || bytes > limits.max_owner_bytes
            || (owner.user.is_some() && bytes > limits.max_user_bytes)
        {
            tracing::warn!(
                response_id,
                bytes,
                max_entry_bytes = limits.max_entry_bytes,
                "Responses context too large to store; previous_response_id continuation from this response will not be available"
            );
            return false;
        }
        let now = now_secs();
        let entry = StoredResponse {
            owner_key_hash: owner_key_hash.to_string(),
            user_id: owner.user.clone(),
            created_at: now,
            expires_at: now + self.ttl_secs,
            seq: self.seq.fetch_add(1, Ordering::Relaxed),
            bytes,
            messages,
            response_json,
        };

        let mut inner = self.inner.write().await;
        inner.remove(response_id);
        // Per-owner (key) quota: evict the key's own oldest entries.
        loop {
            let (owner_bytes, owner_count) = inner.usage_in(false, owner_key_hash);
            let fits = owner_bytes + bytes <= limits.max_owner_bytes
                && owner_count < limits.max_owner_entries;
            if fits || !inner.evict_oldest_in(false, owner_key_hash) {
                break;
            }
        }
        // Per-user quota (all of the user's keys): evict the user's oldest.
        if let Some(user) = owner.user.as_deref() {
            loop {
                let (user_bytes, user_count) = inner.usage_in(true, user);
                let fits = user_bytes + bytes <= limits.max_user_bytes
                    && user_count < limits.max_user_entries;
                if fits || !inner.evict_oldest_in(true, user) {
                    break;
                }
            }
        }
        // Global capacity / byte budget: fair across tenants.
        let tenant = tenant_of(&entry);
        while (inner.entries.len() >= limits.max_entries
            || inner.total_bytes + bytes > limits.max_total_bytes)
            && inner.evict_fair(&tenant, bytes)
        {}
        inner.insert(response_id.to_string(), entry);
        true
    }

    /// Load the stored conversation messages for `response_id`, validating owner.
    /// Returns `NotFound` if absent, expired, or owned by a different key.
    pub async fn load(
        &self,
        response_id: &str,
        owner_key_hash: &str,
    ) -> Result<Vec<(String, String)>, ResponsesContextError> {
        let inner = self.inner.read().await;
        match inner.entries.get(response_id) {
            Some(entry)
                if entry.owner_key_hash == owner_key_hash && entry.expires_at > now_secs() =>
            {
                Ok(entry.messages.clone())
            }
            _ => Err(ResponsesContextError::NotFound),
        }
    }

    /// Fetch the full stored response JSON (owner-validated). Used by `GET`.
    pub async fn get_response_json(
        &self,
        response_id: &str,
        owner_key_hash: &str,
    ) -> Result<serde_json::Value, ResponsesContextError> {
        let inner = self.inner.read().await;
        match inner.entries.get(response_id) {
            Some(entry)
                if entry.owner_key_hash == owner_key_hash && entry.expires_at > now_secs() =>
            {
                Ok(entry.response_json.clone())
            }
            _ => Err(ResponsesContextError::NotFound),
        }
    }

    /// Delete a stored response (owner-validated). Returns `NotFound` if it did
    /// not exist or belonged to another key.
    pub async fn delete(
        &self,
        response_id: &str,
        owner_key_hash: &str,
    ) -> Result<(), ResponsesContextError> {
        let mut inner = self.inner.write().await;
        match inner.entries.get(response_id) {
            Some(entry) if entry.owner_key_hash == owner_key_hash => {
                inner.remove(response_id);
                Ok(())
            }
            _ => Err(ResponsesContextError::NotFound),
        }
    }

    /// Remove all expired entries. Returns the number removed.
    pub async fn sweep_expired(&self) -> usize {
        let now = now_secs();
        let mut inner = self.inner.write().await;
        let expired: Vec<String> = inner
            .entries
            .iter()
            .filter(|(_, v)| v.expires_at <= now)
            .map(|(k, _)| k.clone())
            .collect();
        for id in &expired {
            inner.remove(id);
        }
        expired.len()
    }

    #[cfg(test)]
    async fn len(&self) -> usize {
        self.inner.read().await.entries.len()
    }

    #[cfg(test)]
    async fn total_bytes(&self) -> usize {
        self.inner.read().await.total_bytes
    }
}

impl Default for ResponsesContextStore {
    fn default() -> Self {
        Self::new()
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    fn key(k: &str) -> ContextOwner {
        ContextOwner::new(k, None)
    }

    fn msgs() -> Vec<(String, String)> {
        vec![
            ("user".to_string(), "q".to_string()),
            ("assistant".to_string(), "a".to_string()),
        ]
    }

    #[tokio::test]
    async fn test_save_and_load_same_owner() {
        let store = ResponsesContextStore::new();
        store
            .save(
                "resp_1",
                &key("owner_a"),
                msgs(),
                serde_json::json!({"id": "resp_1"}),
            )
            .await;
        let loaded = store.load("resp_1", "owner_a").await.unwrap();
        assert_eq!(loaded.len(), 2);
    }

    #[tokio::test]
    async fn test_load_wrong_owner_is_not_found() {
        let store = ResponsesContextStore::new();
        store
            .save("resp_1", &key("owner_a"), msgs(), serde_json::json!({}))
            .await;
        assert!(matches!(
            store.load("resp_1", "owner_b").await,
            Err(ResponsesContextError::NotFound)
        ));
    }

    #[tokio::test]
    async fn test_expired_entry_not_loadable_and_swept() {
        let store = ResponsesContextStore::with_config(0, 100); // ttl 0 → immediately expired
        store
            .save("resp_1", &key("owner_a"), msgs(), serde_json::json!({}))
            .await;
        assert!(matches!(
            store.load("resp_1", "owner_a").await,
            Err(ResponsesContextError::NotFound)
        ));
        let removed = store.sweep_expired().await;
        assert_eq!(removed, 1);
        assert_eq!(store.len().await, 0);
        assert_eq!(store.total_bytes().await, 0);
    }

    #[tokio::test]
    async fn test_delete_owner_validated() {
        let store = ResponsesContextStore::new();
        store
            .save("resp_1", &key("owner_a"), msgs(), serde_json::json!({}))
            .await;
        assert!(store.delete("resp_1", "owner_b").await.is_err());
        assert!(store.delete("resp_1", "owner_a").await.is_ok());
        assert_eq!(store.len().await, 0);
    }

    #[tokio::test]
    async fn test_capacity_evicts_oldest() {
        let store = ResponsesContextStore::with_config(3600, 2);
        store
            .save("r1", &key("o"), msgs(), serde_json::json!({}))
            .await;
        store
            .save("r2", &key("o"), msgs(), serde_json::json!({}))
            .await;
        store
            .save("r3", &key("o"), msgs(), serde_json::json!({}))
            .await;
        assert_eq!(store.len().await, 2);
        // r1 (oldest) evicted
        assert!(store.load("r1", "o").await.is_err());
        assert!(store.load("r3", "o").await.is_ok());
    }

    #[tokio::test]
    async fn test_get_response_json() {
        let store = ResponsesContextStore::new();
        store
            .save(
                "resp_1",
                &key("o"),
                msgs(),
                serde_json::json!({"id": "resp_1", "object": "response"}),
            )
            .await;
        let json = store.get_response_json("resp_1", "o").await.unwrap();
        assert_eq!(json["object"], "response");
    }

    fn big(n: usize) -> Vec<(String, String)> {
        vec![("user".to_string(), "x".repeat(n))]
    }

    fn small_limits() -> ContextLimits {
        ContextLimits {
            max_entries: 100,
            max_entry_bytes: 1_000,
            max_total_bytes: 3_000,
            max_owner_bytes: 2_000,
            max_owner_entries: 10,
            max_user_bytes: 2_500,
            max_user_entries: 20,
        }
    }

    #[tokio::test]
    async fn test_oversized_entry_not_stored() {
        let store = ResponsesContextStore::with_limits(3600, small_limits());
        assert!(
            !store
                .save("r1", &key("o"), big(5_000), serde_json::json!({}))
                .await
        );
        assert!(store.load("r1", "o").await.is_err());
        assert_eq!(store.total_bytes().await, 0);
    }

    #[tokio::test]
    async fn test_oversized_continuation_skips_store_but_keeps_parent() {
        // A long session: the parent turn is stored; the next turn's history
        // outgrows the cap. The turn itself is answered (no error here), only
        // its own context is not stored — continuing from it is a normal
        // not-found, while the parent stays usable.
        let store = ResponsesContextStore::with_limits(3600, small_limits());
        assert!(
            store
                .save("parent", &key("o"), big(600), serde_json::json!({}))
                .await
        );
        let mut history = store.load("parent", "o").await.unwrap();
        history.push(("user".into(), "y".repeat(600)));
        assert!(
            !store
                .save("child", &key("o"), history, serde_json::json!({}))
                .await
        );
        assert!(matches!(
            store.load("child", "o").await,
            Err(ResponsesContextError::NotFound)
        ));
        assert!(store.load("parent", "o").await.is_ok());
    }

    #[tokio::test]
    async fn test_owner_quota_evicts_only_own_entries() {
        let store = ResponsesContextStore::with_limits(3600, small_limits());
        assert!(
            store
                .save("victim", &key("b"), big(500), serde_json::json!({}))
                .await
        );
        // Owner "a" writes far past its 2000-byte quota.
        for i in 0..10 {
            assert!(
                store
                    .save(&format!("a{i}"), &key("a"), big(800), serde_json::json!({}))
                    .await
            );
        }
        // The other tenant's entry survives; "a" keeps only its newest ones.
        assert!(store.load("victim", "b").await.is_ok());
        assert!(store.load("a9", "a").await.is_ok());
        assert!(store.load("a0", "a").await.is_err());
        assert!(store.total_bytes().await <= 3_000);
    }

    #[tokio::test]
    async fn test_owner_entry_quota() {
        let limits = ContextLimits {
            max_owner_entries: 2,
            ..small_limits()
        };
        let store = ResponsesContextStore::with_limits(3600, limits);
        store
            .save("b1", &key("b"), msgs(), serde_json::json!({}))
            .await;
        for i in 0..5 {
            store
                .save(&format!("a{i}"), &key("a"), msgs(), serde_json::json!({}))
                .await;
        }
        assert_eq!(store.len().await, 3);
        assert!(store.load("b1", "b").await.is_ok());
        assert!(store.load("a4", "a").await.is_ok());
        assert!(store.load("a2", "a").await.is_err());
    }

    #[tokio::test]
    async fn test_total_byte_budget_and_accounting() {
        let store = ResponsesContextStore::with_limits(3600, small_limits());
        for (i, owner) in ["a", "b", "c", "d", "e"].iter().enumerate() {
            store
                .save(
                    &format!("r{i}"),
                    &key(owner),
                    big(900),
                    serde_json::json!({}),
                )
                .await;
        }
        assert!(store.total_bytes().await <= 3_000);
        assert!(store.load("r0", "a").await.is_err()); // globally oldest evicted
        assert!(store.load("r4", "e").await.is_ok());
        // Delete / overwrite keep the byte counters exact.
        store.delete("r4", "e").await.unwrap();
        store
            .save("r3", &key("d"), msgs(), serde_json::json!({}))
            .await;
        let inner = store.inner.read().await;
        let sum: usize = inner.entries.values().map(|e| e.bytes).sum();
        assert_eq!(inner.total_bytes, sum);
        let tenant_entries: usize = inner.tenants.values().map(|t| t.order.len()).sum();
        assert_eq!(tenant_entries, inner.entries.len());
        assert_eq!(inner.by_usage.len(), inner.tenants.len());
    }

    #[tokio::test]
    async fn test_user_quota_spans_keys_and_spares_other_users() {
        let store = ResponsesContextStore::with_limits(3600, small_limits());
        let victim = ContextOwner::new("kb", Some("user_b".into()));
        assert!(
            store
                .save("victim", &victim, big(500), serde_json::json!({}))
                .await
        );
        // user_a rotates through many keys, each under its own key quota, but
        // together far past the 2500-byte user quota.
        for i in 0..10 {
            let k = ContextOwner::new(format!("ka{i}"), Some("user_a".into()));
            assert!(
                store
                    .save(&format!("a{i}"), &k, big(700), serde_json::json!({}))
                    .await
            );
        }
        assert!(store.load("victim", "kb").await.is_ok());
        assert!(store.load("a9", "ka9").await.is_ok());
        assert!(store.load("a0", "ka0").await.is_err());
        let inner = store.inner.read().await;
        let user_a: usize = inner
            .entries
            .values()
            .filter(|e| e.user_id.as_deref() == Some("user_a"))
            .map(|e| e.bytes)
            .sum();
        assert!(user_a <= 2_500);
        assert_eq!(inner.users["user_a"].bytes, user_a);
    }

    #[tokio::test]
    async fn test_user_entry_quota_and_index_cleanup() {
        let limits = ContextLimits {
            max_user_entries: 3,
            ..small_limits()
        };
        let store = ResponsesContextStore::with_limits(3600, limits);
        for i in 0..6 {
            let k = ContextOwner::new(format!("k{i}"), Some("u".into()));
            store
                .save(&format!("r{i}"), &k, msgs(), serde_json::json!({}))
                .await;
        }
        assert_eq!(store.len().await, 3);
        assert!(store.load("r5", "k5").await.is_ok());
        assert!(store.load("r2", "k2").await.is_err());
        for i in 3..6 {
            store
                .delete(&format!("r{i}"), &format!("k{i}"))
                .await
                .unwrap();
        }
        let inner = store.inner.read().await;
        assert!(inner.users.is_empty());
        assert!(inner.owners.is_empty());
        assert!(inner.tenants.is_empty());
        assert!(inner.by_usage.is_empty());
    }

    /// Store-wide pressure: per-user quotas are generous, so only global
    /// eviction runs.
    fn shared_limits() -> ContextLimits {
        ContextLimits {
            max_entries: 1_000,
            max_entry_bytes: 1_000,
            max_total_bytes: 10_000,
            max_owner_bytes: 10_000,
            max_owner_entries: 1_000,
            max_user_bytes: 10_000,
            max_user_entries: 1_000,
        }
    }

    #[tokio::test]
    async fn test_global_eviction_spares_light_user_under_fair_share() {
        let store = ResponsesContextStore::with_limits(3600, shared_limits());
        let light = ContextOwner::new("kl", Some("light".into()));
        let heavy = ContextOwner::new("kh", Some("heavy".into()));
        // The light user stores early (globally oldest entries) and stays
        // well under half the store.
        for i in 0..3 {
            assert!(
                store
                    .save(&format!("l{i}"), &light, big(900), serde_json::json!({}))
                    .await
            );
        }
        // The heavy user floods the store many times over.
        for i in 0..100 {
            assert!(
                store
                    .save(&format!("h{i}"), &heavy, big(900), serde_json::json!({}))
                    .await
            );
        }
        for i in 0..3 {
            assert!(store.load(&format!("l{i}"), "kl").await.is_ok(), "l{i}");
        }
        assert!(store.load("h99", "kh").await.is_ok());
        assert!(store.load("h0", "kh").await.is_err());
        assert!(store.total_bytes().await <= 10_000);
    }

    #[tokio::test]
    async fn test_global_eviction_takes_from_largest_user_first() {
        let store = ResponsesContextStore::with_limits(3600, shared_limits());
        let a = ContextOwner::new("ka", Some("a".into()));
        let b = ContextOwner::new("kb", Some("b".into()));
        let c = ContextOwner::new("kc", None); // ownerless key = its own tenant
                                               // a: 6 entries, b: 2, c: 1 → 9 × ~950 bytes, near the 10_000 budget.
        for i in 0..6 {
            store
                .save(&format!("a{i}"), &a, big(900), serde_json::json!({}))
                .await;
        }
        for i in 0..2 {
            store
                .save(&format!("b{i}"), &b, big(900), serde_json::json!({}))
                .await;
        }
        store.save("c0", &c, big(900), serde_json::json!({})).await;
        // A new light tenant arrives repeatedly: room is made from "a" only.
        let d = ContextOwner::new("kd", Some("d".into()));
        for i in 0..3 {
            store
                .save(&format!("d{i}"), &d, big(900), serde_json::json!({}))
                .await;
        }
        assert!(store.load("b0", "kb").await.is_ok());
        assert!(store.load("b1", "kb").await.is_ok());
        assert!(store.load("c0", "kc").await.is_ok());
        assert!(store.load("d0", "kd").await.is_ok());
        assert!(store.load("a0", "ka").await.is_err());
        assert!(store.load("a5", "ka").await.is_ok());
        let inner = store.inner.read().await;
        assert_eq!(inner.by_usage.len(), inner.tenants.len());
    }

    #[tokio::test]
    async fn test_entry_count_cap_is_fair_too() {
        let limits = ContextLimits {
            max_entries: 4,
            ..shared_limits()
        };
        let store = ResponsesContextStore::with_limits(3600, limits);
        let light = ContextOwner::new("kl", Some("light".into()));
        let heavy = ContextOwner::new("kh", Some("heavy".into()));
        store
            .save("l0", &light, msgs(), serde_json::json!({}))
            .await;
        for i in 0..10 {
            store
                .save(&format!("h{i}"), &heavy, msgs(), serde_json::json!({}))
                .await;
        }
        assert_eq!(store.len().await, 4);
        assert!(store.load("l0", "kl").await.is_ok());
        assert!(store.load("h9", "kh").await.is_ok());
    }
}
