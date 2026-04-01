//! Database trait definitions
//!
//! All database backends must implement `DatabaseService` which composes
//! the five sub-store traits.

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
}

#[async_trait]
pub trait UsageStore: Send + Sync {
    async fn record_usage(&self, record: &UsageRecord) -> Result<()>;
    async fn get_usage_by_api_key(
        &self,
        api_key: &str,
        since: Option<&str>,
        limit: Option<i64>,
    ) -> Result<Vec<UsageRecord>>;
    /// 聚合查询用量，按 group_by 分组（"hour" 或 "model"）。
    /// start / end 为 RFC3339 字符串，均可选。
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
    async fn update_health_status(&self, name: &str, status: &str) -> Result<()>;
}

#[async_trait]
pub trait FeatureFlagStore: Send + Sync {
    async fn get_flag(&self, name: &str) -> Result<Option<FeatureFlagRecord>>;
    async fn is_enabled(&self, name: &str) -> Result<bool>;
    async fn list_flags(&self) -> Result<Vec<FeatureFlagRecord>>;
    async fn upsert_flag(&self, record: &FeatureFlagRecord) -> Result<()>;
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
    fn feature_flags(&self) -> &dyn FeatureFlagStore;

    /// Initialize storage: create tables + insert default seed data.
    async fn initialize(&self) -> Result<()>;

    /// Quick health check (e.g., SELECT 1).
    async fn health_check(&self) -> bool;

    /// Seed default model mappings and feature flags (insert-if-not-exists).
    ///
    /// Called by `initialize()` after schema migration. Each backend's
    /// sub-store upsert/insert logic handles conflict resolution.
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
        for flag in seed::default_feature_flags() {
            if self.feature_flags().get_flag(&flag.name).await?.is_none() {
                self.feature_flags().upsert_flag(&flag).await?;
            }
        }
        tracing::info!("Seed data applied");
        Ok(())
    }
}
