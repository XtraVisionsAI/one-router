//! Database trait definitions
//!
//! All database backends must implement `DatabaseService` which composes
//! the sub-store traits.

use super::models::*;
use super::seed;
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
    async fn increment_budget_used(&self, api_key: &str, amount: f64) -> Result<bool>;
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
}

#[async_trait]
pub trait UsageStore: Send + Sync {
    async fn record_usage(&self, record: &UsageRecord) -> Result<()>;
    async fn get_usage_by_api_key(
        &self,
        api_key: &str,
        since: Option<&str>,
        limit: Option<i64>,
        before_id: Option<i64>,
    ) -> Result<Vec<UsageRecord>>;
    /// Aggregate usage query, grouped by group_by ("hour" or "model").
    /// start / end are RFC3339 strings, both optional.
    async fn query_usage_summary(
        &self,
        api_key: &str,
        start: Option<&str>,
        end: Option<&str>,
        group_by: &str,
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
// Composite trait
// ============================================================================

#[async_trait]
pub trait DatabaseService: Send + Sync {
    fn api_keys(&self) -> &dyn ApiKeyStore;
    fn usage(&self) -> &dyn UsageStore;
    fn model_mapping(&self) -> &dyn ModelMappingStore;
    fn backends(&self) -> &dyn BackendConfigStore;
    fn system_settings(&self) -> &dyn SystemSettingStore;

    /// Initialize storage: create tables + insert default seed data.
    async fn initialize(&self) -> Result<()>;

    /// Quick health check (e.g., SELECT 1).
    async fn health_check(&self) -> bool;

    /// Seed default model mappings and system settings (insert-if-not-exists).
    ///
    /// Called by `initialize()` after schema migration.
    async fn seed_defaults(&self) -> Result<()> {
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
        for setting in seed::default_system_settings() {
            if self
                .system_settings()
                .get_setting(&setting.key)
                .await?
                .is_none()
            {
                self.system_settings().upsert_setting(&setting).await?;
            }
        }
        tracing::info!("Seed data applied");
        Ok(())
    }
}
