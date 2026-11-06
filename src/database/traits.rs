//! Database trait definitions
//!
//! All database backends must implement `DatabaseService` which composes
//! the sub-store traits.

use super::models::*;
use super::seed;
pub use super::seed::SeedMode;
use anyhow::Result;
use async_trait::async_trait;

// ============================================================================
// Sub-store traits
// ============================================================================

#[async_trait]
pub trait ApiKeyStore: Send + Sync {
    async fn get_api_key(&self, api_key: &str) -> Result<Option<ApiKeyRecord>>;
    async fn create_api_key(&self, record: &ApiKeyRecord) -> Result<()>;
    async fn update_api_key(&self, record: &ApiKeyRecord) -> Result<()>;
    async fn deactivate_api_key(&self, api_key: &str, reason: &str) -> Result<()>;
    /// Atomically add `amount` to the key's spend counters; returns the
    /// counters after the increment.
    async fn increment_budget_used(&self, api_key: &str, amount: f64) -> Result<SpendAfter>;
    /// Reset monthly budget and archive previous month's usage to budget_history.
    async fn reset_monthly_budget(
        &self,
        api_key: &str,
        month: &str,      // new month "YYYY-MM"
        prev_month: &str, // previous month "YYYY-MM"
        prev_mtd: f64,    // previous month's budget_used_mtd to archive
    ) -> Result<()>;
    async fn reactivate_api_key(&self, api_key: &str) -> Result<()>;
    async fn list_api_keys(&self) -> Result<Vec<ApiKeyRecord>>;

    /// Find an API key by a raw prefix (e.g. first 8 chars).
    /// Returns `Some` if exactly one key matches, `None` if zero match.
    /// Implementations should `LIMIT 2` to detect ambiguity cheaply.
    async fn find_api_key_by_prefix(&self, prefix: &str) -> Result<Option<ApiKeyRecord>>;

    /// Find an API key by its human-readable name.
    async fn get_api_key_by_name(&self, name: &str) -> Result<Option<ApiKeyRecord>>;

    /// Find an API key by its stable `key_id`.
    async fn get_api_key_by_id(&self, key_id: &str) -> Result<Option<ApiKeyRecord>>;

    /// Permanently remove an API key row (by hash). Usage rows are kept —
    /// they carry `key_id` for attribution.
    async fn delete_api_key(&self, api_key: &str) -> Result<()>;

    /// Keys owned by `user_id`.
    async fn list_api_keys_by_user(&self, user_id: &str) -> Result<Vec<ApiKeyRecord>>;

    /// Write `record` (which carries a new `user_id`) only if the stored key has
    /// no owner yet. Returns `false` when another writer assigned it first.
    /// Used by the one-time key → user migration (multi-instance safe).
    async fn assign_unowned_key(&self, record: &ApiKeyRecord) -> Result<bool>;

    /// Set `last_used_at` (no other column changes).
    async fn touch_last_used(&self, api_key: &str, at: i64) -> Result<()>;

    /// Record that the budget alert for `threshold` in `period` was sent.
    /// Returns `true` only for the caller that recorded it first (multi-instance
    /// dedupe: one alert per threshold per period).
    async fn claim_budget_alert(&self, api_key: &str, period: &str, threshold: f64)
        -> Result<bool>;
}

#[async_trait]
pub trait UserStore: Send + Sync {
    async fn get_user(&self, user_id: &str) -> Result<Option<UserRecord>>;
    async fn get_user_by_name(&self, name: &str) -> Result<Option<UserRecord>>;
    async fn list_users(&self) -> Result<Vec<UserRecord>>;
    /// Fails with an error containing `UNIQUE constraint failed: users.name`
    /// (or the backend's equivalent) on a duplicate name.
    async fn create_user(&self, record: &UserRecord) -> Result<()>;
    async fn update_user(&self, record: &UserRecord) -> Result<()>;
    async fn delete_user(&self, user_id: &str) -> Result<()>;
    /// Atomically add `amount` to the user's spend counters. Returns `true` when
    /// the month-to-date spend has reached the monthly budget.
    async fn increment_user_budget_used(&self, user_id: &str, amount: f64) -> Result<SpendAfter>;
    /// Reset month-to-date spend and archive `prev_mtd` under `prev_month`.
    async fn reset_user_monthly_budget(
        &self,
        user_id: &str,
        month: &str,
        prev_month: &str,
        prev_mtd: f64,
    ) -> Result<()>;
    /// See [`ApiKeyStore::claim_budget_alert`].
    async fn claim_user_budget_alert(
        &self,
        user_id: &str,
        period: &str,
        threshold: f64,
    ) -> Result<bool>;
}

#[async_trait]
pub trait AuditStore: Send + Sync {
    async fn record_audit(&self, record: &AuditLogRecord) -> Result<()>;
    /// Newest first, at most `query.limit` rows.
    async fn query_audit(&self, query: &AuditQuery) -> Result<Vec<AuditLogRecord>>;
    /// Delete entries older than `cutoff` (RFC3339). Returns rows removed.
    async fn purge_audit_before(&self, cutoff: &str) -> Result<u64>;
}

/// Usage row filters; all set fields combine with AND.
#[derive(Debug, Clone, Copy, Default)]
pub struct UsageFilter<'a> {
    /// Stored `usage.api_key` value (key hash / internal id). Empty = any.
    pub api_key: &'a str,
    pub user_id: Option<&'a str>,
    /// Rows whose tag list contains this tag.
    pub tag: Option<&'a str>,
}

#[async_trait]
pub trait UsageStore: Send + Sync {
    async fn record_usage(&self, record: &UsageRecord) -> Result<()>;
    /// Raw usage rows, newest first.
    async fn get_usage_by_api_key(
        &self,
        filter: UsageFilter<'_>,
        since: Option<&str>,
        limit: Option<i64>,
        before_id: Option<i64>,
    ) -> Result<Vec<UsageRecord>>;
    /// Aggregate usage query, grouped by group_by ("hour", "day", "month", "model",
    /// "provider", "api_key", "user", "tags" — the raw comma-joined tag list;
    /// callers explode it per tag). Optional split_by adds a secondary grouping
    /// dimension. start / end are RFC3339 strings, both optional.
    async fn query_usage_summary(
        &self,
        filter: UsageFilter<'_>,
        start: Option<&str>,
        end: Option<&str>,
        group_by: &str,
        split_by: Option<&str>,
    ) -> Result<Vec<UsageSummaryRow>>;
}

#[async_trait]
pub trait ModelMappingStore: Send + Sync {
    /// Get all mappings for a source model, ordered by priority DESC
    async fn get_mappings(&self, source_model_id: &str) -> Result<Vec<ModelMappingRecord>>;
    /// Get a specific mapping by (source_model_id, provider)
    async fn get_mapping(
        &self,
        source_model_id: &str,
        provider: &str,
    ) -> Result<Option<ModelMappingRecord>>;
    async fn list_mappings(&self) -> Result<Vec<ModelMappingRecord>>;
    async fn upsert_mapping(&self, record: &ModelMappingRecord) -> Result<()>;
    async fn delete_mapping(&self, source_model_id: &str, provider: &str) -> Result<()>;
    /// Get all wildcard mappings (source_model_id contains '*'), ordered by priority DESC
    async fn list_wildcard_mappings(&self) -> Result<Vec<ModelMappingRecord>>;
}

#[async_trait]
pub trait BackendConfigStore: Send + Sync {
    async fn get_backend(&self, name: &str) -> Result<Option<BackendRecord>>;
    async fn list_enabled_backends(&self) -> Result<Vec<BackendRecord>>;
    async fn list_all_backends(&self) -> Result<Vec<BackendRecord>>;
    async fn upsert_backend(&self, record: &BackendRecord) -> Result<()>;
    async fn delete_backend(&self, name: &str) -> Result<()>;
}

#[async_trait]
pub trait SystemSettingStore: Send + Sync {
    async fn get_setting(&self, key: &str) -> Result<Option<SystemSettingRecord>>;
    async fn upsert_setting(&self, record: &SystemSettingRecord) -> Result<()>;
    async fn list_settings(&self) -> Result<Vec<SystemSettingRecord>>;
}

// ============================================================================
// Key → user migration helpers
// ============================================================================

/// Internal (hidden, `__`-prefixed) setting tracking the usage `user_id`
/// backfill: `"pending"` → `"done"`.
pub const USAGE_USER_BACKFILL_SETTING: &str = "__usage_user_backfill";

/// System settings whose key starts with this prefix are internal state: hidden
/// from the settings API and not writable through it.
pub const INTERNAL_SETTING_PREFIX: &str = "__";

pub fn internal_setting(key: &str, value: &str) -> SystemSettingRecord {
    SystemSettingRecord {
        key: key.to_string(),
        value: value.to_string(),
        description: "internal migration state".to_string(),
        ui_schema: None,
        updated_at: None,
    }
}

/// Next alert-dedupe state if `threshold` has not been sent in `period`
/// (`None` = already sent). Shared by every backend's claim implementation.
pub fn next_alert_state(current: Option<&str>, period: &str, threshold: f64) -> Option<String> {
    #[derive(serde::Serialize, serde::Deserialize, Default)]
    struct State {
        period: String,
        thresholds: Vec<f64>,
    }
    let mut state: State = current
        .and_then(|s| serde_json::from_str(s).ok())
        .unwrap_or_default();
    if state.period != period {
        state = State {
            period: period.to_string(),
            thresholds: Vec::new(),
        };
    }
    if state
        .thresholds
        .iter()
        .any(|t| (t - threshold).abs() < 1e-9)
    {
        return None;
    }
    state.thresholds.push(threshold);
    serde_json::to_string(&state).ok()
}

/// The user a legacy (ownerless) key becomes: it takes over the key's
/// budget, spend counters, cost rate and limits.
fn legacy_key_user(key: &ApiKeyRecord, name: String, now: i64) -> UserRecord {
    let mut user = UserRecord::new(name, now);
    user.cost_rate = key.cost_rate;
    user.monthly_budget = key.monthly_budget;
    user.budget_used = key.budget_used;
    user.budget_used_mtd = key.budget_used_mtd;
    user.budget_mtd_month = key.budget_mtd_month.clone();
    user.budget_history = key.budget_history.clone();
    // Key rate_limit <= 0 meant "use the global default" — the user's None.
    user.rate_limit = (key.rate_limit > 0).then_some(key.rate_limit);
    user.tpm_limit = key.tpm_limit;
    user.cache_ttl = key.cache_ttl.clone();
    user.created_at = key.created_at;
    user
}

/// Clear what moved to the user; the key keeps its identity, status and
/// lifetime counters. A `budget_exceeded` deactivation is lifted (now derived).
fn strip_user_level_fields(key: &mut ApiKeyRecord) {
    key.cost_rate = 1.0;
    key.monthly_budget = None;
    key.rate_limit = 0;
    key.tpm_limit = None;
    key.cache_ttl = None;
    key.budget_used_mtd = 0.0;
    key.budget_mtd_month = None;
    key.budget_history = None;
    if key.deactivated_reason.as_deref() == Some("budget_exceeded") {
        key.is_active = true;
        key.deactivated_reason = None;
    }
}

/// `base`, or `base-2`, `base-3`, … — the first name no user has yet.
async fn unique_user_name<D: DatabaseService + ?Sized>(db: &D, base: &str) -> Result<String> {
    let base = if base.trim().is_empty() { "user" } else { base };
    let mut candidate = base.to_string();
    let mut n = 2;
    while db.users().get_user_by_name(&candidate).await?.is_some() {
        candidate = format!("{base}-{n}");
        n += 1;
    }
    Ok(candidate)
}

// ============================================================================
// Composite trait
// ============================================================================

#[async_trait]
pub trait DatabaseService: Send + Sync {
    fn api_keys(&self) -> &dyn ApiKeyStore;
    fn users(&self) -> &dyn UserStore;
    fn audit(&self) -> &dyn AuditStore;
    fn usage(&self) -> &dyn UsageStore;
    fn model_mapping(&self) -> &dyn ModelMappingStore;
    fn backends(&self) -> &dyn BackendConfigStore;
    fn system_settings(&self) -> &dyn SystemSettingStore;

    /// Initialize storage: create tables + insert default seed data.
    /// `encryption_key` is passed through to enable API key hash backfill.
    /// `seed_mode` controls whether/when default model mappings are inserted.
    async fn initialize(&self, encryption_key: Option<&str>, seed_mode: SeedMode) -> Result<()>;

    /// Quick health check (e.g., SELECT 1).
    async fn health_check(&self) -> bool;

    /// Attribute legacy usage rows (no `user_id`) to their key's owner through
    /// the key hash, then set [`USAGE_USER_BACKFILL_SETTING`] to `"done"`. May
    /// run in the background (DynamoDB). Must be idempotent.
    async fn backfill_usage_user_ids(&self) -> Result<()>;

    /// One-time migration from "key = billing principal" to users: every key
    /// without an owner becomes one user + one key. Budget, cost rate, RPM/TPM
    /// and cache TTL move to the user, so enforcement is unchanged. Keys that
    /// were deactivated for `budget_exceeded` are re-activated — budget
    /// exhaustion is now derived from the counters, not stored as a state.
    ///
    /// Idempotent and multi-instance safe: the key write is conditional on the
    /// key still being unowned; a losing writer deletes the user it created.
    async fn migrate_keys_to_users(&self) -> Result<()> {
        let keys = self.api_keys().list_api_keys().await?;
        let now = chrono::Utc::now().timestamp();
        let mut migrated = 0usize;
        for key in keys.into_iter().filter(|k| k.user_id.is_empty()) {
            let user = legacy_key_user(&key, unique_user_name(self, &key.name).await?, now);
            self.users().create_user(&user).await?;

            let mut owned = key.clone();
            owned.user_id = user.user_id.clone();
            strip_user_level_fields(&mut owned);
            if self.api_keys().assign_unowned_key(&owned).await? {
                migrated += 1;
            } else {
                // Another instance migrated this key concurrently.
                self.users().delete_user(&user.user_id).await?;
            }
        }
        if migrated > 0 {
            tracing::info!(
                count = migrated,
                "Migrated API keys to users (one user per key)"
            );
            self.system_settings()
                .upsert_setting(&internal_setting(USAGE_USER_BACKFILL_SETTING, "pending"))
                .await?;
        }
        let pending = self
            .system_settings()
            .get_setting(USAGE_USER_BACKFILL_SETTING)
            .await?
            .is_some_and(|s| s.value == "pending");
        if pending {
            self.backfill_usage_user_ids().await?;
        }
        Ok(())
    }

    /// Seed default model mappings (per `seed_mode`) and system settings.
    ///
    /// Settings are always backfilled per key (new releases add new keys);
    /// `seed_mode` only governs the model mappings.
    ///
    /// Called by `initialize()` after schema migration.
    async fn seed_defaults(&self, seed_mode: SeedMode) -> Result<()> {
        let seed_mappings = match seed_mode {
            SeedMode::Off => false,
            SeedMode::Missing => true,
            SeedMode::Empty => self.model_mapping().list_mappings().await?.is_empty(),
        };
        if seed_mappings {
            for mapping in seed::default_model_mappings() {
                if self
                    .model_mapping()
                    .get_mapping(&mapping.source_model_id, &mapping.provider)
                    .await?
                    .is_none()
                {
                    self.model_mapping().upsert_mapping(&mapping).await?;
                }
            }
        }
        for setting in seed::default_system_settings() {
            match self.system_settings().get_setting(&setting.key).await? {
                None => {
                    self.system_settings().upsert_setting(&setting).await?;
                }
                Some(existing) if existing.ui_schema.is_none() && setting.ui_schema.is_some() => {
                    let backfill = SystemSettingRecord {
                        ui_schema: setting.ui_schema,
                        ..existing
                    };
                    self.system_settings().upsert_setting(&backfill).await?;
                }
                _ => {}
            }
        }
        tracing::info!(seed_mode = %seed_mode, mappings_seeded = seed_mappings, "Seed data applied");
        Ok(())
    }
}
