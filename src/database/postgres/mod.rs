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
    fn system_settings(&self) -> &dyn SystemSettingStore {
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
            "SELECT api_key, name, is_active, rate_limit, service_tier, \
             monthly_budget, budget_used, budget_used_mtd, budget_mtd_month, \
             deactivated_reason, budget_history, tpm_limit, cache_ttl, metadata, created_at, updated_at \
             FROM api_keys WHERE api_key = $1",
        )
        .bind(api_key)
        .fetch_optional(&self.pool)
        .await?;

        match row {
            Some(r) => Ok(Some(ApiKeyRecord {
                api_key: r.get("api_key"),
                name: r.get("name"),
                is_active: r.get("is_active"),
                rate_limit: r.get("rate_limit"),
                service_tier: r.get("service_tier"),
                monthly_budget: r.get("monthly_budget"),
                budget_used: r.get("budget_used"),
                budget_used_mtd: r.get("budget_used_mtd"),
                budget_mtd_month: r.get("budget_mtd_month"),
                deactivated_reason: r.get("deactivated_reason"),
                budget_history: r.get("budget_history"),
                tpm_limit: r.get("tpm_limit"),
                cache_ttl: r.get("cache_ttl"),
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
             (api_key, name, is_active, rate_limit, service_tier, \
              monthly_budget, budget_used, budget_used_mtd, budget_mtd_month, \
              deactivated_reason, budget_history, tpm_limit, cache_ttl, metadata, created_at, updated_at) \
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)",
        )
        .bind(&record.api_key)
        .bind(&record.name)
        .bind(record.is_active)
        .bind(record.rate_limit)
        .bind(&record.service_tier)
        .bind(record.monthly_budget)
        .bind(record.budget_used)
        .bind(record.budget_used_mtd)
        .bind(&record.budget_mtd_month)
        .bind(&record.deactivated_reason)
        .bind(&record.budget_history)
        .bind(record.tpm_limit)
        .bind(&record.cache_ttl)
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
             name = $1, is_active = $2, rate_limit = $3, service_tier = $4, \
             monthly_budget = $5, budget_used = $6, budget_used_mtd = $7, budget_mtd_month = $8, \
             deactivated_reason = $9, budget_history = $10, tpm_limit = $11, cache_ttl = $12, metadata = $13, updated_at = $14 \
             WHERE api_key = $15",
        )
        .bind(&record.name)
        .bind(record.is_active)
        .bind(record.rate_limit)
        .bind(&record.service_tier)
        .bind(record.monthly_budget)
        .bind(record.budget_used)
        .bind(record.budget_used_mtd)
        .bind(&record.budget_mtd_month)
        .bind(&record.deactivated_reason)
        .bind(&record.budget_history)
        .bind(record.tpm_limit)
        .bind(&record.cache_ttl)
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

    async fn reset_monthly_budget(
        &self,
        api_key: &str,
        month: &str,
        prev_month: &str,
        prev_mtd: f64,
    ) -> Result<()> {
        let now = unix_now();

        // Read existing budget_history, append prev month's usage
        let row = sqlx::query("SELECT budget_history FROM api_keys WHERE api_key = $1")
            .bind(api_key)
            .fetch_optional(&self.pool)
            .await?;

        let updated_history = if let Some(r) = row {
            let existing: Option<String> = r.get("budget_history");
            let mut history: std::collections::HashMap<String, f64> = existing
                .as_deref()
                .and_then(|s| serde_json::from_str(s).ok())
                .unwrap_or_default();
            if prev_mtd > 0.0 && !prev_month.is_empty() {
                history.insert(prev_month.to_string(), (prev_mtd * 100.0).round() / 100.0);
            }
            serde_json::to_string(&history).unwrap_or_else(|_| "{}".to_string())
        } else {
            "{}".to_string()
        };

        sqlx::query(
            "UPDATE api_keys SET \
             budget_used_mtd = 0.0, \
             budget_mtd_month = $1, \
             budget_history = $2, \
             updated_at = $3 \
             WHERE api_key = $4",
        )
        .bind(month)
        .bind(&updated_history)
        .bind(now)
        .bind(api_key)
        .execute(&self.pool)
        .await?;
        Ok(())
    }

    async fn reactivate_api_key(&self, api_key: &str) -> Result<()> {
        let now = unix_now();
        sqlx::query(
            "UPDATE api_keys SET is_active = TRUE, deactivated_reason = NULL, updated_at = $1 WHERE api_key = $2 AND deactivated_reason = 'budget_exceeded'",
        )
        .bind(now)
        .bind(api_key)
        .execute(&self.pool)
        .await?;
        Ok(())
    }

    async fn list_api_keys(&self) -> Result<Vec<ApiKeyRecord>> {
        let rows = sqlx::query(
            "SELECT api_key, name, is_active, rate_limit, service_tier, \
             monthly_budget, budget_used, budget_used_mtd, budget_mtd_month, \
             deactivated_reason, budget_history, tpm_limit, cache_ttl, metadata, created_at, updated_at \
             FROM api_keys ORDER BY created_at DESC",
        )
        .fetch_all(&self.pool)
        .await?;

        let records = rows
            .iter()
            .map(|r| ApiKeyRecord {
                api_key: r.get("api_key"),
                name: r.get("name"),
                is_active: r.get("is_active"),
                rate_limit: r.get("rate_limit"),
                service_tier: r.get("service_tier"),
                monthly_budget: r.get("monthly_budget"),
                budget_used: r.get("budget_used"),
                budget_used_mtd: r.get("budget_used_mtd"),
                budget_mtd_month: r.get("budget_mtd_month"),
                deactivated_reason: r.get("deactivated_reason"),
                budget_history: r.get("budget_history"),
                tpm_limit: r.get("tpm_limit"),
                cache_ttl: r.get("cache_ttl"),
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
        // Empty api_key means "all keys" (admin query with no key filter)
        let filter_by_key = !api_key.is_empty();

        // Build dynamic SQL with numbered placeholders ($1, $2, …)
        let mut param_idx = 1usize;
        let key_clause = if filter_by_key {
            let s = format!("WHERE api_key = ${param_idx}");
            param_idx += 1;
            s
        } else {
            "WHERE 1=1".to_string()
        };
        let since_clause = if since.is_some() {
            let s = format!("AND timestamp >= ${param_idx}");
            param_idx += 1;
            s
        } else {
            String::new()
        };
        let limit_clause = if limit.is_some() {
            format!("LIMIT ${param_idx}")
        } else {
            String::new()
        };

        let sql = format!(
            "SELECT id, api_key, timestamp, request_id, model, \
             input_tokens, output_tokens, cached_tokens, cache_write_tokens, \
             cost, success, duration_ms, error_message \
             FROM usage {key_clause} {since_clause} \
             ORDER BY timestamp DESC {limit_clause}",
        );

        let mut q = sqlx::query(&sql);
        if filter_by_key {
            q = q.bind(api_key);
        }
        if let Some(s) = since {
            q = q.bind(s);
        }
        if let Some(l) = limit {
            q = q.bind(l);
        }

        let rows = q.fetch_all(&self.pool).await?;

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
        api_key: &str,
        start: Option<&str>,
        end: Option<&str>,
        group_by: &str,
    ) -> Result<Vec<UsageSummaryRow>> {
        let group_expr = if group_by == "model" {
            "model".to_string()
        } else {
            "to_char(date_trunc('hour', timestamp::timestamptz), 'YYYY-MM-DD\"T\"HH24')".to_string()
        };

        // Postgres 使用 $1, $2… 占位符，参数顺序动态调整
        // Empty api_key means "all keys" (admin query with no key filter)
        let filter_by_key = !api_key.is_empty();

        #[allow(unused_assignments)]
        let mut param_idx = if filter_by_key { 2usize } else { 1usize }; // $1 = api_key (if filtered)
        let key_clause = if filter_by_key {
            "WHERE api_key = $1".to_string()
        } else {
            "WHERE 1=1".to_string()
        };
        let start_clause = if start.is_some() {
            let s = format!("AND timestamp >= ${param_idx}");
            param_idx += 1;
            s
        } else {
            String::new()
        };
        let end_clause = if end.is_some() {
            format!("AND timestamp <= ${param_idx}")
        } else {
            String::new()
        };

        let sql = format!(
            "SELECT {group_expr} AS group_key, \
             SUM(input_tokens) AS input_tokens, \
             SUM(output_tokens) AS output_tokens, \
             SUM(cached_tokens) AS cached_tokens, \
             SUM(cache_write_tokens) AS cache_write_tokens, \
             SUM(cost) AS total_cost, \
             COUNT(*) AS total_requests, \
             SUM(CASE WHEN success = false THEN 1 ELSE 0 END) AS error_requests \
             FROM usage \
             {key_clause} {start_clause} {end_clause} \
             GROUP BY {group_expr} \
             ORDER BY group_key DESC",
        );
        // 注意：Postgres 不允许 GROUP BY 引用列别名，必须重复原始表达式。

        let mut q = sqlx::query(&sql);
        if filter_by_key {
            q = q.bind(api_key);
        }
        if let Some(s) = start {
            q = q.bind(s);
        }
        if let Some(e) = end {
            q = q.bind(e);
        }

        let rows = q.fetch_all(&self.pool).await?;

        let records = rows
            .iter()
            .map(|r| UsageSummaryRow {
                group_key: r.get("group_key"),
                input_tokens: r.get("input_tokens"),
                output_tokens: r.get("output_tokens"),
                cached_tokens: r.get("cached_tokens"),
                cache_write_tokens: r.get("cache_write_tokens"),
                total_cost: r.get("total_cost"),
                total_requests: r.get("total_requests"),
                error_requests: r.get("error_requests"),
            })
            .collect();

        Ok(records)
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
             priority, status, created_at, updated_at, capabilities \
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
                capabilities: r.get("capabilities"),
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
             priority, status, created_at, updated_at, capabilities \
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
                capabilities: r.get("capabilities"),
            })),
            None => Ok(None),
        }
    }

    async fn list_mappings(&self) -> Result<Vec<ModelMappingRecord>> {
        let rows = sqlx::query(
            "SELECT source_model_id, target_model_id, provider, display_name, \
             input_price, output_price, cache_read_price, cache_write_price, \
             priority, status, created_at, updated_at, capabilities \
             FROM model_mappings ORDER BY provider, priority DESC, source_model_id",
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
                capabilities: r.get("capabilities"),
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
              priority, status, created_at, updated_at, capabilities) \
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) \
             ON CONFLICT(source_model_id, provider) DO UPDATE SET \
             target_model_id = EXCLUDED.target_model_id, \
             display_name = EXCLUDED.display_name, \
             input_price = EXCLUDED.input_price, \
             output_price = EXCLUDED.output_price, \
             cache_read_price = EXCLUDED.cache_read_price, \
             cache_write_price = EXCLUDED.cache_write_price, \
             priority = EXCLUDED.priority, \
             status = EXCLUDED.status, \
             updated_at = EXCLUDED.updated_at, \
             capabilities = EXCLUDED.capabilities",
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
        .bind(&record.capabilities)
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
             priority, status, created_at, updated_at, capabilities \
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
                capabilities: r.get("capabilities"),
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
            "SELECT name, backend_type, config, enabled, priority, weight, \
             strategy, max_failures, retry_after_secs, \
             created_at, updated_at \
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
                weight: r.get("weight"),
                strategy: r.get("strategy"),
                max_failures: r.get("max_failures"),
                retry_after_secs: r.get("retry_after_secs"),
                created_at: r.get("created_at"),
                updated_at: r.get("updated_at"),
            })),
            None => Ok(None),
        }
    }

    async fn list_enabled_backends(&self) -> Result<Vec<BackendRecord>> {
        let rows = sqlx::query(
            "SELECT name, backend_type, config, enabled, priority, weight, \
             strategy, max_failures, retry_after_secs, \
             created_at, updated_at \
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
                weight: r.get("weight"),
                strategy: r.get("strategy"),
                max_failures: r.get("max_failures"),
                retry_after_secs: r.get("retry_after_secs"),
                created_at: r.get("created_at"),
                updated_at: r.get("updated_at"),
            })
            .collect();

        Ok(records)
    }

    async fn list_all_backends(&self) -> Result<Vec<BackendRecord>> {
        let rows = sqlx::query(
            "SELECT name, backend_type, config, enabled, priority, weight, \
             strategy, max_failures, retry_after_secs, \
             created_at, updated_at \
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
                weight: r.get("weight"),
                strategy: r.get("strategy"),
                max_failures: r.get("max_failures"),
                retry_after_secs: r.get("retry_after_secs"),
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
             (name, backend_type, config, enabled, priority, weight, \
              strategy, max_failures, retry_after_secs, \
              created_at, updated_at) \
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) \
             ON CONFLICT(name) DO UPDATE SET \
             backend_type = EXCLUDED.backend_type, \
             config = EXCLUDED.config, \
             enabled = EXCLUDED.enabled, \
             priority = EXCLUDED.priority, \
             weight = EXCLUDED.weight, \
             strategy = EXCLUDED.strategy, \
             max_failures = EXCLUDED.max_failures, \
             retry_after_secs = EXCLUDED.retry_after_secs, \
             updated_at = EXCLUDED.updated_at",
        )
        .bind(&record.name)
        .bind(&record.backend_type)
        .bind(&record.config)
        .bind(record.enabled)
        .bind(record.priority)
        .bind(record.weight)
        .bind(&record.strategy)
        .bind(record.max_failures)
        .bind(record.retry_after_secs)
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
}

// ============================================================================
// SystemSettingStore
// ============================================================================

#[async_trait]
impl SystemSettingStore for PostgresBackend {
    async fn get_setting(&self, key: &str) -> Result<Option<SystemSettingRecord>> {
        let row = sqlx::query(
            "SELECT key, value, description, updated_at FROM system_settings WHERE key = $1",
        )
        .bind(key)
        .fetch_optional(&self.pool)
        .await?;

        Ok(row.map(|r| SystemSettingRecord {
            key: r.get("key"),
            value: r.get("value"),
            description: r.get("description"),
            updated_at: r.get("updated_at"),
        }))
    }

    async fn upsert_setting(&self, record: &SystemSettingRecord) -> Result<()> {
        let now = unix_now();
        sqlx::query(
            "INSERT INTO system_settings (key, value, description, updated_at) \
             VALUES ($1, $2, $3, $4) \
             ON CONFLICT(key) DO UPDATE SET \
             value = EXCLUDED.value, \
             description = EXCLUDED.description, \
             updated_at = EXCLUDED.updated_at",
        )
        .bind(&record.key)
        .bind(&record.value)
        .bind(&record.description)
        .bind(now)
        .execute(&self.pool)
        .await?;

        Ok(())
    }

    async fn list_settings(&self) -> Result<Vec<SystemSettingRecord>> {
        let rows = sqlx::query(
            "SELECT key, value, description, updated_at FROM system_settings ORDER BY key",
        )
        .fetch_all(&self.pool)
        .await?;

        Ok(rows
            .iter()
            .map(|r| SystemSettingRecord {
                key: r.get("key"),
                value: r.get("value"),
                description: r.get("description"),
                updated_at: r.get("updated_at"),
            })
            .collect())
    }
}
