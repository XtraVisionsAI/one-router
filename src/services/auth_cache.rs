//! Authentication lookup cache + `last_used_at` debounce.
//!
//! Caches `key hash → (ApiKeyRecord, owning UserRecord, user's TeamRecord)` for
//! `auth_cache_ttl_secs` (system setting, default 30; `0` disables) and unknown
//! hashes for a short negative TTL so invalid keys cannot hammer the database.
//!
//! Admin writes on keys / users call [`AuthCache::invalidate_all`] on **this**
//! instance; other instances pick changes up within the TTL. So revoking a key
//! takes effect after at most the TTL in a multi-instance deployment.
//!
//! Spend counters ride along in the cached records, so the soft budget check may
//! lag by up to the TTL as well.

use moka::sync::Cache;
use std::sync::atomic::{AtomicU64, Ordering};
use std::sync::Arc;
use std::time::{Duration, Instant};

use crate::database::models::{ApiKeyRecord, TeamRecord, UserRecord};

/// A key with its owning user and that user's team.
pub type Principals = (ApiKeyRecord, Option<UserRecord>, Option<TeamRecord>);

/// Negative entries (unknown hash) live this long regardless of the TTL setting.
const NEGATIVE_TTL: Duration = Duration::from_secs(5);
/// Upper bound on the configurable TTL (also the moka hard expiry).
pub const MAX_TTL_SECS: u64 = 300;
/// `last_used_at` is written at most once per key per this interval.
const LAST_USED_DEBOUNCE: Duration = Duration::from_secs(300);

#[derive(Clone)]
enum Entry {
    Found(Arc<Principals>),
    Missing,
}

pub struct AuthCache {
    entries: Cache<String, (Instant, Entry)>,
    ttl_secs: AtomicU64,
    last_used: Cache<String, ()>,
    /// Bumped by every [`AuthCache::invalidate_all`]. A lookup snapshots it
    /// before its storage read and only populates the cache if it is
    /// unchanged — otherwise a read that started before an admin write could
    /// re-insert the pre-write (e.g. still-active) record after the flush.
    generation: AtomicU64,
}

impl Default for AuthCache {
    fn default() -> Self {
        Self::new(30)
    }
}

impl AuthCache {
    pub fn new(ttl_secs: u64) -> Self {
        Self {
            entries: Cache::builder()
                .max_capacity(50_000)
                .time_to_live(Duration::from_secs(MAX_TTL_SECS))
                .build(),
            ttl_secs: AtomicU64::new(ttl_secs.min(MAX_TTL_SECS)),
            last_used: Cache::builder()
                .max_capacity(50_000)
                .time_to_live(LAST_USED_DEBOUNCE)
                .build(),
            generation: AtomicU64::new(0),
        }
    }

    /// Apply a new TTL (hot reload). `0` disables caching and drops entries.
    pub fn set_ttl(&self, secs: u64) {
        self.ttl_secs
            .store(secs.min(MAX_TTL_SECS), Ordering::Relaxed);
        if secs == 0 {
            self.invalidate_all();
        }
    }

    pub fn ttl_secs(&self) -> u64 {
        self.ttl_secs.load(Ordering::Relaxed)
    }

    /// `Some(Some(..))` = cached hit, `Some(None)` = cached "unknown key",
    /// `None` = not cached (or expired).
    #[allow(clippy::type_complexity)]
    pub fn get(&self, hash: &str) -> Option<Option<Arc<Principals>>> {
        let ttl = self.ttl_secs();
        if ttl == 0 {
            return None;
        }
        let (at, entry) = self.entries.get(hash)?;
        let max_age = match entry {
            Entry::Found(_) => Duration::from_secs(ttl),
            Entry::Missing => NEGATIVE_TTL.min(Duration::from_secs(ttl)),
        };
        if at.elapsed() >= max_age {
            self.entries.invalidate(hash);
            return None;
        }
        Some(match entry {
            Entry::Found(v) => Some(v),
            Entry::Missing => None,
        })
    }

    /// Current invalidation generation; take it **before** the storage read
    /// whose result is passed to [`AuthCache::put_at`].
    pub fn generation(&self) -> u64 {
        self.generation.load(Ordering::Acquire)
    }

    /// Cache with the current generation (no preceding storage read).
    pub fn put(&self, hash: &str, value: Option<Principals>) {
        self.put_at(hash, value, self.generation());
    }

    /// Cache `value`, read from storage under generation `generation`. Skipped
    /// when an invalidation happened since; returns whether it was stored.
    pub fn put_at(&self, hash: &str, value: Option<Principals>, generation: u64) -> bool {
        if self.ttl_secs() == 0 || self.generation() != generation {
            return false;
        }
        let entry = match value {
            Some(v) => Entry::Found(Arc::new(v)),
            None => Entry::Missing,
        };
        self.entries
            .insert(hash.to_string(), (Instant::now(), entry));
        // An invalidation racing between the check and the insert: undo.
        if self.generation() != generation {
            self.entries.invalidate(hash);
            return false;
        }
        true
    }

    /// Drop everything (called after any admin write on keys / users).
    pub fn invalidate_all(&self) {
        self.generation.fetch_add(1, Ordering::AcqRel);
        self.entries.invalidate_all();
    }

    /// `true` when `last_used_at` should be written now for this key
    /// (at most once per debounce window per instance).
    pub fn should_touch(&self, hash: &str) -> bool {
        if self.last_used.contains_key(hash) {
            return false;
        }
        self.last_used.insert(hash.to_string(), ());
        true
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    fn rec() -> ApiKeyRecord {
        serde_json::from_value(serde_json::json!({
            "api_key": "h", "name": "k", "is_active": true, "rate_limit": 0,
            "cost_rate": 1.0, "monthly_budget": null, "budget_used": 0.0,
            "budget_used_mtd": 0.0, "budget_mtd_month": null, "deactivated_reason": null,
            "budget_history": null, "tpm_limit": null, "cache_ttl": null, "metadata": null,
            "created_at": 0, "updated_at": null
        }))
        .unwrap()
    }

    #[test]
    fn hit_miss_negative_and_invalidate() {
        let c = AuthCache::new(30);
        assert!(c.get("h").is_none());
        c.put("h", Some((rec(), None, None)));
        assert!(matches!(c.get("h"), Some(Some(_))));
        c.put("x", None);
        assert!(matches!(c.get("x"), Some(None)));
        c.invalidate_all();
        assert!(c.get("h").is_none());
    }

    #[test]
    fn zero_ttl_disables() {
        let c = AuthCache::new(0);
        c.put("h", Some((rec(), None, None)));
        assert!(c.get("h").is_none());
        let c = AuthCache::new(30);
        c.put("h", Some((rec(), None, None)));
        c.set_ttl(0);
        assert!(c.get("h").is_none());
    }

    #[test]
    fn stale_read_is_not_cached_after_invalidation() {
        let c = AuthCache::new(30);
        // Lookup snapshots the generation, then reads storage...
        let gen = c.generation();
        // ...meanwhile an admin write deactivates the key and flushes.
        c.invalidate_all();
        // The pre-write record must not be cached.
        assert!(!c.put_at("h", Some((rec(), None, None)), gen));
        assert!(c.get("h").is_none());
        // A read that started after the flush is cached normally.
        let gen = c.generation();
        assert!(c.put_at("h", Some((rec(), None, None)), gen));
        assert!(matches!(c.get("h"), Some(Some(_))));
        // set_ttl(0) is an invalidation too.
        let gen = c.generation();
        c.set_ttl(0);
        c.set_ttl(30);
        assert!(!c.put_at("x", None, gen));
    }

    #[test]
    fn last_used_debounce() {
        let c = AuthCache::new(30);
        assert!(c.should_touch("h"));
        assert!(!c.should_touch("h"));
        assert!(c.should_touch("other"));
    }
}
