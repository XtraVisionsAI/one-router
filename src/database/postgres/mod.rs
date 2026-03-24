//! PostgreSQL storage backend
//!
//! Full implementation using sqlx with PgPool.

pub mod migrations;

use anyhow::Result;
use async_trait::async_trait;
use sqlx::postgres::PgPoolOptions;
use sqlx::{PgPool, Row};
use std::time::{SystemTime, UNIX_EPOCH};

use crate::database::models::*;
use crate::database::traits::*;

/// PostgreSQL-backed storage.
pub struct PostgresBackend {
    pool: PgPool,
}

impl PostgresBackend {
    pub async fn new(url: &str) -> Result<Self> {
        let pool = PgPoolOptions::new().max_connections(5).connect(url).await?;

        tracing::info!("PostgreSQL backend connected");
        Ok(Self { pool })
    }

    async fn run_migrations(&self) -> Result<()> {
        migrations::run_ddl(&self.pool).await
    }
}

fn unix_now() -> i64 {
    SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .expect("system clock before UNIX epoch")
        .as_secs() as i64
}

// ============================================================================
// DatabaseService
// ============================================================================

#[async_trait]
impl DatabaseService for PostgresBackend {
    fn api_keys(&self) -> &dyn ApiKeyStore {
        self
    }
    fn usage(&self) -> &dyn UsageStore {
        self
    }
    fn model_mapping(&self) -> &dyn ModelMappingStore {
        self
    }
    fn backends(&self) -> &dyn BackendConfigStore {
        self
    }
    fn feature_flags(&self) -> &dyn FeatureFlagStore {
        self
    }

    async fn initialize(&self) -> Result<()> {
        self.run_migrations().await?;
        self.seed_defaults().await?;
        Ok(())
    }

    async fn health_check(&self) -> bool {
        sqlx::query("SELECT 1").execute(&self.pool).await.is_ok()
    }
}

// ============================================================================
// ApiKeyStore
// ============================================================================

#[async_trait]
impl ApiKeyStore for PostgresBackend {
    async fn get_api_key(&self, api_key: &str) -> Result<Option<ApiKeyRecord>> {
        let row = sqlx::query(
            "SELECT api_key, user_id, name, is_active, rate_limit, service_tier, \
             monthly_budget, budget_used, budget_used_mtd, budget_mtd_month, \
             deactivated_reason, tpm_limit, metadata, created_at, updated_at \
             FROM api_keys WHERE api_key = $1",
        )
        .bind(api_key)
        .fetch_optional(&self.pool)
        .await?;

        match row {
            Some(r) => Ok(Some(ApiKeyRecord {
                api_key: r.get("api_key"),
                user_id: r.get("user_id"),
                name: r.get("name"),
                is_active: r.get("is_active"),
                rate_limit: r.get("rate_limit"),
                service_tier: r.get("service_tier"),
                monthly_budget: r.get("monthly_budget"),
                budget_used: r.get("budget_used"),
                budget_used_mtd: r.get("budget_used_mtd"),
                budget_mtd_month: r.get("budget_mtd_month"),
                deactivated_reason: r.get("deactivated_reason"),
                tpm_limit: r.get("tpm_limit"),
                metadata: r.get("metadata"),
                created_at: r.get("created_at"),
                updated_at: r.get("updated_at"),
            })),
            None => Ok(None),
        }
    }

    async fn create_api_key(&self, record: &ApiKeyRecord) -> Result<()> {
        sqlx::query(
            "INSERT INTO api_keys \
             (api_key, user_id, name, is_active, rate_limit, service_tier, \
              monthly_budget, budget_used, budget_used_mtd, budget_mtd_month, \
              deactivated_reason, tpm_limit, metadata, created_at, updated_at) \
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)",
        )
        .bind(&record.api_key)
        .bind(&record.user_id)
        .bind(&record.name)
        .bind(record.is_active)
        .bind(record.rate_limit)
        .bind(&record.service_tier)
        .bind(record.monthly_budget)
        .bind(record.budget_used)
        .bind(record.budget_used_mtd)
        .bind(&record.budget_mtd_month)
        .bind(&record.deactivated_reason)
        .bind(record.tpm_limit)
        .bind(&record.metadata)
        .bind(record.created_at)
        .bind(record.updated_at)
        .execute(&self.pool)
        .await?;

        Ok(())
    }

    async fn update_api_key(&self, record: &ApiKeyRecord) -> Result<()> {
        let now = unix_now();
        sqlx::query(
            "UPDATE api_keys SET \
             user_id = $1, name = $2, is_active = $3, rate_limit = $4, service_tier = $5, \
             monthly_budget = $6, budget_used = $7, budget_used_mtd = $8, budget_mtd_month = $9, \
             deactivated_reason = $10, tpm_limit = $11, metadata = $12, updated_at = $13 \
             WHERE api_key = $14",
        )
        .bind(&record.user_id)
        .bind(&record.name)
        .bind(record.is_active)
        .bind(record.rate_limit)
        .bind(&record.service_tier)
        .bind(record.monthly_budget)
        .bind(record.budget_used)
        .bind(record.budget_used_mtd)
        .bind(&record.budget_mtd_month)
        .bind(&record.deactivated_reason)
        .bind(record.tpm_limit)
        .bind(&record.metadata)
        .bind(now)
        .bind(&record.api_key)
        .execute(&self.pool)
        .await?;

        Ok(())
    }

    async fn deactivate_api_key(&self, api_key: &str, reason: &str) -> Result<()> {
        let now = unix_now();
        sqlx::query(
            "UPDATE api_keys SET is_active = FALSE, deactivated_reason = $1, updated_at = $2 \
             WHERE api_key = $3",
        )
        .bind(reason)
        .bind(now)
        .bind(api_key)
        .execute(&self.pool)
        .await?;

        Ok(())
    }

    async fn increment_budget_used(&self, api_key: &str, amount: f64) -> Result<bool> {
        let now = unix_now();

        let result = sqlx::query(
            "UPDATE api_keys SET \
             budget_used = budget_used + $1, \
             budget_used_mtd = budget_used_mtd + $2, \
             updated_at = $3 \
             WHERE api_key = $4",
        )
        .bind(amount)
        .bind(amount)
        .bind(now)
        .bind(api_key)
        .execute(&self.pool)
        .await?;

        if result.rows_affected() == 0 {
            anyhow::bail!("api_key not found: {api_key}");
        }

        let row =
            sqlx::query("SELECT monthly_budget, budget_used FROM api_keys WHERE api_key = $1")
                .bind(api_key)
                .fetch_optional(&self.pool)
                .await?;

        if let Some(r) = row {
            let budget: Option<f64> = r.get("monthly_budget");
            let used: f64 = r.get("budget_used");
            if let Some(limit) = budget {
                if used >= limit {
                    return Ok(true);
                }
            }
        }

        Ok(false)
    }

    async fn list_api_keys(&self) -> Result<Vec<ApiKeyRecord>> {
        let rows = sqlx::query(
            "SELECT api_key, user_id, name, is_active, rate_limit, service_tier, \
             monthly_budget, budget_used, budget_used_mtd, budget_mtd_month, \
             deactivated_reason, tpm_limit, metadata, created_at, updated_at \
             FROM api_keys ORDER BY created_at DESC",
        )
        .fetch_all(&self.pool)
        .await?;

        let records = rows
            .iter()
            .map(|r| ApiKeyRecord {
                api_key: r.get("api_key"),
                user_id: r.get("user_id"),
                name: r.get("name"),
                is_active: r.get("is_active"),
                rate_limit: r.get("rate_limit"),
                service_tier: r.get("service_tier"),
                monthly_budget: r.get("monthly_budget"),
                budget_used: r.get("budget_used"),
                budget_used_mtd: r.get("budget_used_mtd"),
                budget_mtd_month: r.get("budget_mtd_month"),
                deactivated_reason: r.get("deactivated_reason"),
                tpm_limit: r.get("tpm_limit"),
                metadata: r.get("metadata"),
                created_at: r.get("created_at"),
                updated_at: r.get("updated_at"),
            })
            .collect();

        Ok(records)
    }
}

// ============================================================================
// UsageStore
// ============================================================================

#[async_trait]
impl UsageStore for PostgresBackend {
    async fn record_usage(&self, record: &UsageRecord) -> Result<()> {
        sqlx::query(
            "INSERT INTO usage \
             (api_key, timestamp, request_id, model, input_tokens, output_tokens, \
              cached_tokens, cache_write_tokens, cost, success, duration_ms, error_message) \
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)",
        )
        .bind(&record.api_key)
        .bind(&record.timestamp)
        .bind(&record.request_id)
        .bind(&record.model)
        .bind(record.input_tokens)
        .bind(record.output_tokens)
        .bind(record.cached_tokens)
        .bind(record.cache_write_tokens)
        .bind(record.cost)
        .bind(record.success)
        .bind(record.duration_ms)
        .bind(&record.error_message)
        .execute(&self.pool)
        .await?;

        Ok(())
    }

    async fn get_usage_by_api_key(
        &self,
        api_key: &str,
        since: Option<&str>,
        limit: Option<i64>,
    ) -> Result<Vec<UsageRecord>> {
        let rows = match (since, limit) {
            (Some(since_ts), Some(lim)) => {
                sqlx::query(
                    "SELECT id, api_key, timestamp, request_id, model, \
                     input_tokens, output_tokens, cached_tokens, cache_write_tokens, \
                     cost, success, duration_ms, error_message \
                     FROM usage WHERE api_key = $1 AND timestamp >= $2 \
                     ORDER BY timestamp DESC LIMIT $3",
                )
                .bind(api_key)
                .bind(since_ts)
                .bind(lim)
                .fetch_all(&self.pool)
                .await?
            }
            (Some(since_ts), None) => {
                sqlx::query(
                    "SELECT id, api_key, timestamp, request_id, model, \
                     input_tokens, output_tokens, cached_tokens, cache_write_tokens, \
                     cost, success, duration_ms, error_message \
                     FROM usage WHERE api_key = $1 AND timestamp >= $2 \
                     ORDER BY timestamp DESC",
                )
                .bind(api_key)
                .bind(since_ts)
                .fetch_all(&self.pool)
                .await?
            }
            (None, Some(lim)) => {
                sqlx::query(
                    "SELECT id, api_key, timestamp, request_id, model, \
                     input_tokens, output_tokens, cached_tokens, cache_write_tokens, \
                     cost, success, duration_ms, error_message \
                     FROM usage WHERE api_key = $1 \
                     ORDER BY timestamp DESC LIMIT $2",
                )
                .bind(api_key)
                .bind(lim)
                .fetch_all(&self.pool)
                .await?
            }
            (None, None) => {
                sqlx::query(
                    "SELECT id, api_key, timestamp, request_id, model, \
                     input_tokens, output_tokens, cached_tokens, cache_write_tokens, \
                     cost, success, duration_ms, error_message \
                     FROM usage WHERE api_key = $1 \
                     ORDER BY timestamp DESC",
                )
                .bind(api_key)
                .fetch_all(&self.pool)
                .await?
            }
        };

        let records = rows
            .iter()
            .map(|r| UsageRecord {
                id: r.get("id"),
                api_key: r.get("api_key"),
                timestamp: r.get("timestamp"),
                request_id: r.get("request_id"),
                model: r.get("model"),
                input_tokens: r.get("input_tokens"),
                output_tokens: r.get("output_tokens"),
                cached_tokens: r.get("cached_tokens"),
                cache_write_tokens: r.get("cache_write_tokens"),
                cost: r.get("cost"),
                success: r.get("success"),
                duration_ms: r.get("duration_ms"),
                error_message: r.get("error_message"),
            })
            .collect();

        Ok(records)
    }

    async fn query_usage_summary(
        &self,
        _api_key: &str,
        _start: Option<&str>,
        _end: Option<&str>,
        _group_by: &str,
    ) -> Result<Vec<UsageSummaryRow>> {
        anyhow::bail!("query_usage_summary not yet implemented for Postgres")
    }
}

// ============================================================================
// ModelMappingStore
// ============================================================================

#[async_trait]
impl ModelMappingStore for PostgresBackend {
    async fn get_mappings(&self, source_model_id: &str) -> Result<Vec<ModelMappingRecord>> {
        let rows = sqlx::query(
            "SELECT source_model_id, target_model_id, provider, display_name, \
             input_price, output_price, cache_read_price, cache_write_price, \
             priority, status, created_at, updated_at \
             FROM model_mappings WHERE source_model_id = $1 ORDER BY priority DESC",
        )
        .bind(source_model_id)
        .fetch_all(&self.pool)
        .await?;

        let records = rows
            .iter()
            .map(|r| ModelMappingRecord {
                source_model_id: r.get("source_model_id"),
                target_model_id: r.get("target_model_id"),
                provider: r.get("provider"),
                display_name: r.get("display_name"),
                input_price: r.get("input_price"),
                output_price: r.get("output_price"),
                cache_read_price: r.get("cache_read_price"),
                cache_write_price: r.get("cache_write_price"),
                priority: r.get("priority"),
                status: r.get("status"),
                created_at: r.get("created_at"),
                updated_at: r.get("updated_at"),
            })
            .collect();

        Ok(records)
    }

    async fn get_mapping(
        &self,
        source_model_id: &str,
        provider: &str,
    ) -> Result<Option<ModelMappingRecord>> {
        let row = sqlx::query(
            "SELECT source_model_id, target_model_id, provider, display_name, \
             input_price, output_price, cache_read_price, cache_write_price, \
             priority, status, created_at, updated_at \
             FROM model_mappings WHERE source_model_id = $1 AND provider = $2",
        )
        .bind(source_model_id)
        .bind(provider)
        .fetch_optional(&self.pool)
        .await?;

        match row {
            Some(r) => Ok(Some(ModelMappingRecord {
                source_model_id: r.get("source_model_id"),
                target_model_id: r.get("target_model_id"),
                provider: r.get("provider"),
                display_name: r.get("display_name"),
                input_price: r.get("input_price"),
                output_price: r.get("output_price"),
                cache_read_price: r.get("cache_read_price"),
                cache_write_price: r.get("cache_write_price"),
                priority: r.get("priority"),
                status: r.get("status"),
                created_at: r.get("created_at"),
                updated_at: r.get("updated_at"),
            })),
            None => Ok(None),
        }
    }

    async fn list_mappings(&self) -> Result<Vec<ModelMappingRecord>> {
        let rows = sqlx::query(
            "SELECT source_model_id, target_model_id, provider, display_name, \
             input_price, output_price, cache_read_price, cache_write_price, \
             priority, status, created_at, updated_at \
             FROM model_mappings ORDER BY source_model_id",
        )
        .fetch_all(&self.pool)
        .await?;

        let records = rows
            .iter()
            .map(|r| ModelMappingRecord {
                source_model_id: r.get("source_model_id"),
                target_model_id: r.get("target_model_id"),
                provider: r.get("provider"),
                display_name: r.get("display_name"),
                input_price: r.get("input_price"),
                output_price: r.get("output_price"),
                cache_read_price: r.get("cache_read_price"),
                cache_write_price: r.get("cache_write_price"),
                priority: r.get("priority"),
                status: r.get("status"),
                created_at: r.get("created_at"),
                updated_at: r.get("updated_at"),
            })
            .collect();

        Ok(records)
    }

    async fn upsert_mapping(&self, record: &ModelMappingRecord) -> Result<()> {
        let now = unix_now();
        sqlx::query(
            "INSERT INTO model_mappings \
             (source_model_id, target_model_id, provider, display_name, \
              input_price, output_price, cache_read_price, cache_write_price, \
              priority, status, created_at, updated_at) \
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) \
             ON CONFLICT(source_model_id, provider) DO UPDATE SET \
             target_model_id = EXCLUDED.target_model_id, \
             display_name = EXCLUDED.display_name, \
             input_price = EXCLUDED.input_price, \
             output_price = EXCLUDED.output_price, \
             cache_read_price = EXCLUDED.cache_read_price, \
             cache_write_price = EXCLUDED.cache_write_price, \
             priority = EXCLUDED.priority, \
             status = EXCLUDED.status, \
             updated_at = EXCLUDED.updated_at",
        )
        .bind(&record.source_model_id)
        .bind(&record.target_model_id)
        .bind(&record.provider)
        .bind(&record.display_name)
        .bind(record.input_price)
        .bind(record.output_price)
        .bind(record.cache_read_price)
        .bind(record.cache_write_price)
        .bind(record.priority)
        .bind(&record.status)
        .bind(record.created_at)
        .bind(now)
        .execute(&self.pool)
        .await?;

        Ok(())
    }

    async fn delete_mapping(&self, source_model_id: &str, provider: &str) -> Result<()> {
        sqlx::query("DELETE FROM model_mappings WHERE source_model_id = $1 AND provider = $2")
            .bind(source_model_id)
            .bind(provider)
            .execute(&self.pool)
            .await?;

        Ok(())
    }

    async fn list_wildcard_mappings(&self) -> Result<Vec<ModelMappingRecord>> {
        let rows = sqlx::query(
            "SELECT source_model_id, target_model_id, provider, display_name, \
             input_price, output_price, cache_read_price, cache_write_price, \
             priority, status, created_at, updated_at \
             FROM model_mappings WHERE source_model_id LIKE '%*%' AND status = 'active' \
             ORDER BY priority DESC",
        )
        .fetch_all(&self.pool)
        .await?;

        let records = rows
            .iter()
            .map(|r| ModelMappingRecord {
                source_model_id: r.get("source_model_id"),
                target_model_id: r.get("target_model_id"),
                provider: r.get("provider"),
                display_name: r.get("display_name"),
                input_price: r.get("input_price"),
                output_price: r.get("output_price"),
                cache_read_price: r.get("cache_read_price"),
                cache_write_price: r.get("cache_write_price"),
                priority: r.get("priority"),
                status: r.get("status"),
                created_at: r.get("created_at"),
                updated_at: r.get("updated_at"),
            })
            .collect();

        Ok(records)
    }
}

// ============================================================================
// BackendConfigStore
// ============================================================================

#[async_trait]
impl BackendConfigStore for PostgresBackend {
    async fn get_backend(&self, name: &str) -> Result<Option<BackendRecord>> {
        let row = sqlx::query(
            "SELECT name, backend_type, config, enabled, priority, \
             health_status, last_health_check, created_at, updated_at \
             FROM backends WHERE name = $1",
        )
        .bind(name)
        .fetch_optional(&self.pool)
        .await?;

        match row {
            Some(r) => Ok(Some(BackendRecord {
                name: r.get("name"),
                backend_type: r.get("backend_type"),
                config: r.get("config"),
                enabled: r.get("enabled"),
                priority: r.get("priority"),
                health_status: r.get("health_status"),
                last_health_check: r.get("last_health_check"),
                created_at: r.get("created_at"),
                updated_at: r.get("updated_at"),
            })),
            None => Ok(None),
        }
    }

    async fn list_enabled_backends(&self) -> Result<Vec<BackendRecord>> {
        let rows = sqlx::query(
            "SELECT name, backend_type, config, enabled, priority, \
             health_status, last_health_check, created_at, updated_at \
             FROM backends WHERE enabled = TRUE ORDER BY priority DESC",
        )
        .fetch_all(&self.pool)
        .await?;

        let records = rows
            .iter()
            .map(|r| BackendRecord {
                name: r.get("name"),
                backend_type: r.get("backend_type"),
                config: r.get("config"),
                enabled: true,
                priority: r.get("priority"),
                health_status: r.get("health_status"),
                last_health_check: r.get("last_health_check"),
                created_at: r.get("created_at"),
                updated_at: r.get("updated_at"),
            })
            .collect();

        Ok(records)
    }

    async fn list_all_backends(&self) -> Result<Vec<BackendRecord>> {
        let rows = sqlx::query(
            "SELECT name, backend_type, config, enabled, priority, \
             health_status, last_health_check, created_at, updated_at \
             FROM backends ORDER BY priority DESC",
        )
        .fetch_all(&self.pool)
        .await?;

        let records = rows
            .iter()
            .map(|r| BackendRecord {
                name: r.get("name"),
                backend_type: r.get("backend_type"),
                config: r.get("config"),
                enabled: r.get("enabled"),
                priority: r.get("priority"),
                health_status: r.get("health_status"),
                last_health_check: r.get("last_health_check"),
                created_at: r.get("created_at"),
                updated_at: r.get("updated_at"),
            })
            .collect();

        Ok(records)
    }

    async fn upsert_backend(&self, record: &BackendRecord) -> Result<()> {
        let now = unix_now();
        sqlx::query(
            "INSERT INTO backends \
             (name, backend_type, config, enabled, priority, \
              health_status, last_health_check, created_at, updated_at) \
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) \
             ON CONFLICT(name) DO UPDATE SET \
             backend_type = EXCLUDED.backend_type, \
             config = EXCLUDED.config, \
             enabled = EXCLUDED.enabled, \
             priority = EXCLUDED.priority, \
             health_status = EXCLUDED.health_status, \
             last_health_check = EXCLUDED.last_health_check, \
             updated_at = EXCLUDED.updated_at",
        )
        .bind(&record.name)
        .bind(&record.backend_type)
        .bind(&record.config)
        .bind(record.enabled)
        .bind(record.priority)
        .bind(&record.health_status)
        .bind(record.last_health_check)
        .bind(record.created_at)
        .bind(now)
        .execute(&self.pool)
        .await?;

        Ok(())
    }

    async fn delete_backend(&self, name: &str) -> Result<()> {
        sqlx::query("DELETE FROM backends WHERE name = $1")
            .bind(name)
            .execute(&self.pool)
            .await?;

        Ok(())
    }

    async fn update_health_status(&self, name: &str, status: &str) -> Result<()> {
        let now = unix_now();
        sqlx::query(
            "UPDATE backends SET health_status = $1, last_health_check = $2, updated_at = $3 \
             WHERE name = $4",
        )
        .bind(status)
        .bind(now)
        .bind(now)
        .bind(name)
        .execute(&self.pool)
        .await?;

        Ok(())
    }
}

// ============================================================================
// FeatureFlagStore
// ============================================================================

#[async_trait]
impl FeatureFlagStore for PostgresBackend {
    async fn get_flag(&self, name: &str) -> Result<Option<FeatureFlagRecord>> {
        let row = sqlx::query(
            "SELECT name, enabled, description, created_at, updated_at \
             FROM feature_flags WHERE name = $1",
        )
        .bind(name)
        .fetch_optional(&self.pool)
        .await?;

        match row {
            Some(r) => Ok(Some(FeatureFlagRecord {
                name: r.get("name"),
                enabled: r.get("enabled"),
                description: r.get("description"),
                created_at: r.get("created_at"),
                updated_at: r.get("updated_at"),
            })),
            None => Ok(None),
        }
    }

    async fn is_enabled(&self, name: &str) -> Result<bool> {
        let row = sqlx::query("SELECT enabled FROM feature_flags WHERE name = $1")
            .bind(name)
            .fetch_optional(&self.pool)
            .await?;

        match row {
            Some(r) => Ok(r.get("enabled")),
            None => Ok(false),
        }
    }

    async fn list_flags(&self) -> Result<Vec<FeatureFlagRecord>> {
        let rows = sqlx::query(
            "SELECT name, enabled, description, created_at, updated_at \
             FROM feature_flags ORDER BY name",
        )
        .fetch_all(&self.pool)
        .await?;

        let records = rows
            .iter()
            .map(|r| FeatureFlagRecord {
                name: r.get("name"),
                enabled: r.get("enabled"),
                description: r.get("description"),
                created_at: r.get("created_at"),
                updated_at: r.get("updated_at"),
            })
            .collect();

        Ok(records)
    }

    async fn upsert_flag(&self, record: &FeatureFlagRecord) -> Result<()> {
        let now = unix_now();
        sqlx::query(
            "INSERT INTO feature_flags (name, enabled, description, created_at, updated_at) \
             VALUES ($1, $2, $3, $4, $5) \
             ON CONFLICT(name) DO UPDATE SET \
             enabled = EXCLUDED.enabled, \
             description = EXCLUDED.description, \
             updated_at = EXCLUDED.updated_at",
        )
        .bind(&record.name)
        .bind(record.enabled)
        .bind(&record.description)
        .bind(record.created_at)
        .bind(now)
        .execute(&self.pool)
        .await?;

        Ok(())
    }
}
