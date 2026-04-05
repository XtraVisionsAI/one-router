//! SQLite storage backend
//!
//! Zero-configuration storage using a local SQLite file.
//! Implements all five sub-store traits on a single `SqliteBackend` struct.

use anyhow::Result;
use async_trait::async_trait;
use sqlx::sqlite::{SqliteConnectOptions, SqlitePoolOptions};
use sqlx::{Row, SqlitePool};
use std::path::Path;
use std::str::FromStr;
use std::time::{SystemTime, UNIX_EPOCH};

use crate::database::models::*;
use crate::database::traits::*;

/// SQLite-backed storage.
///
/// Holds an async connection pool and implements every sub-store trait
/// so that `DatabaseService` can simply return `&self` for each accessor.
#[derive(Debug, Clone)]
pub struct SqliteBackend {
    pool: SqlitePool,
}

impl SqliteBackend {
    /// Create a new SQLite backend.
    ///
    /// * Creates parent directories if they don't exist.
    /// * Opens (or creates) the database file via `?mode=rwc`.
    /// * Does NOT call `initialize()` — that is done once by `app.rs`.
    pub async fn new(path: &str) -> Result<Self> {
        // Ensure parent directory exists
        if let Some(parent) = Path::new(path).parent() {
            if !parent.as_os_str().is_empty() {
                std::fs::create_dir_all(parent)?;
            }
        }

        let options = SqliteConnectOptions::from_str(&format!("sqlite://{path}?mode=rwc"))?
            .create_if_missing(true);

        let pool = SqlitePoolOptions::new()
            .max_connections(5)
            .connect_with(options)
            .await?;

        let backend = Self { pool };

        tracing::info!(path = %path, "SQLite backend connected");
        Ok(backend)
    }

    /// Run schema DDL (CREATE TABLE IF NOT EXISTS).
    async fn run_migrations(&self) -> Result<()> {
        // --- api_keys ---
        sqlx::query(
            "CREATE TABLE IF NOT EXISTS api_keys (
                api_key TEXT PRIMARY KEY,
                name TEXT UNIQUE DEFAULT '',
                is_active INTEGER DEFAULT 1,
                rate_limit INTEGER DEFAULT 100,
                service_tier TEXT DEFAULT 'default',
                monthly_budget REAL,
                budget_used REAL DEFAULT 0.0,
                budget_used_mtd REAL DEFAULT 0.0,
                budget_mtd_month TEXT,
                deactivated_reason TEXT,
                budget_history TEXT,
                tpm_limit INTEGER,
                cache_ttl TEXT,
                metadata TEXT,
                created_at INTEGER NOT NULL,
                updated_at INTEGER
            )",
        )
        .execute(&self.pool)
        .await?;

        // Migration: add budget_history column if upgrading from older schema
        sqlx::query("ALTER TABLE api_keys ADD COLUMN budget_history TEXT")
            .execute(&self.pool)
            .await
            .ok(); // ignore error if column already exists

        // Migration: add cache_ttl column if upgrading from older schema
        sqlx::query("ALTER TABLE api_keys ADD COLUMN cache_ttl TEXT")
            .execute(&self.pool)
            .await
            .ok(); // ignore error if column already exists

        // Migration: add unique index on api_keys.name if upgrading from older schema
        sqlx::query("CREATE UNIQUE INDEX IF NOT EXISTS idx_api_keys_name ON api_keys(name)")
            .execute(&self.pool)
            .await
            .ok(); // ignore error if index already exists

        // --- usage ---
        sqlx::query(
            "CREATE TABLE IF NOT EXISTS usage (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                api_key TEXT NOT NULL,
                timestamp TEXT NOT NULL,
                request_id TEXT NOT NULL,
                model TEXT NOT NULL,
                input_tokens INTEGER DEFAULT 0,
                output_tokens INTEGER DEFAULT 0,
                cached_tokens INTEGER DEFAULT 0,
                cache_write_tokens INTEGER DEFAULT 0,
                cost REAL DEFAULT 0.0,
                success INTEGER DEFAULT 1,
                duration_ms INTEGER,
                error_message TEXT
            )",
        )
        .execute(&self.pool)
        .await?;

        sqlx::query("CREATE INDEX IF NOT EXISTS idx_usage_api_key_ts ON usage(api_key, timestamp)")
            .execute(&self.pool)
            .await?;

        // --- model_mappings ---
        sqlx::query(
            "CREATE TABLE IF NOT EXISTS model_mappings (
                source_model_id TEXT NOT NULL,
                target_model_id TEXT NOT NULL,
                provider TEXT NOT NULL DEFAULT '',
                display_name TEXT DEFAULT '',
                input_price REAL DEFAULT 0.0,
                output_price REAL DEFAULT 0.0,
                cache_read_price REAL DEFAULT 0.0,
                cache_write_price REAL DEFAULT 0.0,
                priority INTEGER DEFAULT 0,
                status TEXT DEFAULT 'active',
                created_at INTEGER NOT NULL,
                updated_at INTEGER,
                capabilities TEXT,
                PRIMARY KEY (source_model_id, provider)
            )",
        )
        .execute(&self.pool)
        .await?;

        // Migration: handle old table with single-column PK
        self.migrate_model_mappings().await?;

        // Migration: add capabilities column if not already present
        sqlx::query("ALTER TABLE model_mappings ADD COLUMN capabilities TEXT")
            .execute(&self.pool)
            .await
            .ok();

        // --- backends ---
        sqlx::query(
            "CREATE TABLE IF NOT EXISTS backends (
                name TEXT PRIMARY KEY,
                backend_type TEXT NOT NULL,
                config TEXT NOT NULL,
                enabled INTEGER DEFAULT 1,
                priority INTEGER DEFAULT 0,
                created_at INTEGER NOT NULL,
                updated_at INTEGER
            )",
        )
        .execute(&self.pool)
        .await?;

        // --- feature_flags ---
        sqlx::query(
            "CREATE TABLE IF NOT EXISTS feature_flags (
                name TEXT PRIMARY KEY,
                enabled INTEGER DEFAULT 0,
                description TEXT DEFAULT '',
                created_at INTEGER NOT NULL,
                updated_at INTEGER
            )",
        )
        .execute(&self.pool)
        .await?;

        // --- system_settings ---
        sqlx::query(
            "CREATE TABLE IF NOT EXISTS system_settings (
                key TEXT PRIMARY KEY,
                value TEXT NOT NULL DEFAULT '',
                description TEXT NOT NULL DEFAULT '',
                updated_at INTEGER
            )",
        )
        .execute(&self.pool)
        .await?;

        // Migration: add budget_history column if it doesn't exist
        sqlx::query("ALTER TABLE api_keys ADD COLUMN budget_history TEXT")
            .execute(&self.pool)
            .await
            .ok(); // ok() to ignore error when column already exists

        Ok(())
    }

    /// Migrate old model_mappings table (single PK) to new schema (composite PK + priority).
    async fn migrate_model_mappings(&self) -> Result<()> {
        // Check if priority column exists
        let rows = sqlx::query("PRAGMA table_info(model_mappings)")
            .fetch_all(&self.pool)
            .await?;

        let has_priority = rows.iter().any(|r| {
            let name: String = r.get("name");
            name == "priority"
        });

        if !has_priority {
            tracing::info!(
                "Migrating model_mappings table to new schema (composite PK + priority)"
            );

            // Rename old table
            sqlx::query("ALTER TABLE model_mappings RENAME TO model_mappings_old")
                .execute(&self.pool)
                .await?;

            // Create new table with composite PK
            sqlx::query(
                "CREATE TABLE model_mappings (
                    source_model_id TEXT NOT NULL,
                    target_model_id TEXT NOT NULL,
                    provider TEXT NOT NULL DEFAULT '',
                    display_name TEXT DEFAULT '',
                    input_price REAL DEFAULT 0.0,
                    output_price REAL DEFAULT 0.0,
                    cache_read_price REAL DEFAULT 0.0,
                    cache_write_price REAL DEFAULT 0.0,
                    priority INTEGER DEFAULT 0,
                    status TEXT DEFAULT 'active',
                    created_at INTEGER NOT NULL,
                    updated_at INTEGER,
                    capabilities TEXT,
                    PRIMARY KEY (source_model_id, provider)
                )",
            )
            .execute(&self.pool)
            .await?;

            // Migrate data
            sqlx::query(
                "INSERT INTO model_mappings \
                 (source_model_id, target_model_id, provider, display_name, \
                  input_price, output_price, cache_read_price, cache_write_price, \
                  priority, status, created_at, updated_at) \
                 SELECT source_model_id, target_model_id, provider, display_name, \
                  input_price, output_price, cache_read_price, cache_write_price, \
                  0, status, created_at, updated_at \
                 FROM model_mappings_old",
            )
            .execute(&self.pool)
            .await?;

            // Drop old table
            sqlx::query("DROP TABLE model_mappings_old")
                .execute(&self.pool)
                .await?;

            tracing::info!("model_mappings migration completed");
        }

        Ok(())
    }
}

// ============================================================================
// Helper: current unix timestamp
// ============================================================================

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
impl DatabaseService for SqliteBackend {
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
impl ApiKeyStore for SqliteBackend {
    async fn get_api_key(&self, api_key: &str) -> Result<Option<ApiKeyRecord>> {
        let row = sqlx::query(
            "SELECT api_key, name, is_active, rate_limit, service_tier, \
             monthly_budget, budget_used, budget_used_mtd, budget_mtd_month, \
             deactivated_reason, budget_history, tpm_limit, cache_ttl, metadata, created_at, updated_at \
             FROM api_keys WHERE api_key = ?",
        )
        .bind(api_key)
        .fetch_optional(&self.pool)
        .await?;

        match row {
            Some(r) => Ok(Some(ApiKeyRecord {
                api_key: r.get("api_key"),
                name: r.get("name"),
                is_active: r.get::<i32, _>("is_active") != 0,
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
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        )
        .bind(&record.api_key)
        .bind(&record.name)
        .bind(record.is_active as i32)
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
             name = ?, is_active = ?, rate_limit = ?, service_tier = ?, \
             monthly_budget = ?, budget_used = ?, budget_used_mtd = ?, budget_mtd_month = ?, \
             deactivated_reason = ?, budget_history = ?, tpm_limit = ?, cache_ttl = ?, metadata = ?, updated_at = ? \
             WHERE api_key = ?",
        )
        .bind(&record.name)
        .bind(record.is_active as i32)
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
            "UPDATE api_keys SET is_active = 0, deactivated_reason = ?, updated_at = ? \
             WHERE api_key = ?",
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

        // Atomically increment budget_used and budget_used_mtd, then check if
        // the new total exceeds monthly_budget (if one is set).
        let result = sqlx::query(
            "UPDATE api_keys SET \
             budget_used = budget_used + ?, \
             budget_used_mtd = budget_used_mtd + ?, \
             updated_at = ? \
             WHERE api_key = ?",
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

        // Check if budget is now exceeded
        let row = sqlx::query("SELECT monthly_budget, budget_used FROM api_keys WHERE api_key = ?")
            .bind(api_key)
            .fetch_optional(&self.pool)
            .await?;

        if let Some(r) = row {
            let budget: Option<f64> = r.get("monthly_budget");
            let used: f64 = r.get("budget_used");
            if let Some(limit) = budget {
                if used >= limit {
                    return Ok(true); // budget exceeded
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
        let row = sqlx::query("SELECT budget_history FROM api_keys WHERE api_key = ?")
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
             budget_mtd_month = ?, \
             budget_history = ?, \
             updated_at = ? \
             WHERE api_key = ?",
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
            "UPDATE api_keys SET is_active = 1, deactivated_reason = NULL, updated_at = ? WHERE api_key = ? AND deactivated_reason = 'budget_exceeded'",
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
                is_active: r.get::<i32, _>("is_active") != 0,
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
impl UsageStore for SqliteBackend {
    async fn record_usage(&self, record: &UsageRecord) -> Result<()> {
        sqlx::query(
            "INSERT INTO usage \
             (api_key, timestamp, request_id, model, input_tokens, output_tokens, \
              cached_tokens, cache_write_tokens, cost, success, duration_ms, error_message) \
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
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
        .bind(record.success as i32)
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

        let key_clause = if filter_by_key {
            "WHERE api_key = ?"
        } else {
            "WHERE 1=1"
        };
        let since_clause = if since.is_some() {
            "AND timestamp >= ?"
        } else {
            ""
        };
        let limit_clause = if limit.is_some() { "LIMIT ?" } else { "" };

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
                success: r.get::<i32, _>("success") != 0,
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
        // SQLite strftime: 按小时截断 → "2026-03-24T15"
        // 按模型 → 直接取 model 字段
        let group_expr = if group_by == "model" {
            "model"
        } else {
            "strftime('%Y-%m-%dT%H', timestamp)"
        };

        // 构建动态 SQL（group_expr 是内部常量，无注入风险）
        // Empty api_key means "all keys" (admin query with no key filter)
        let filter_by_key = !api_key.is_empty();
        let key_clause = if filter_by_key {
            "WHERE api_key = ?"
        } else {
            "WHERE 1=1"
        };

        let sql = format!(
            "SELECT {group_expr} AS group_key, \
             SUM(input_tokens) AS input_tokens, \
             SUM(output_tokens) AS output_tokens, \
             SUM(cached_tokens) AS cached_tokens, \
             SUM(cache_write_tokens) AS cache_write_tokens, \
             SUM(cost) AS total_cost, \
             COUNT(*) AS total_requests, \
             SUM(CASE WHEN success = 0 THEN 1 ELSE 0 END) AS error_requests \
             FROM usage \
             {key_clause} {start_clause} {end_clause} \
             GROUP BY {group_expr} \
             ORDER BY group_key DESC",
            group_expr = group_expr,
            key_clause = key_clause,
            start_clause = if start.is_some() {
                "AND timestamp >= ?"
            } else {
                ""
            },
            end_clause = if end.is_some() {
                "AND timestamp <= ?"
            } else {
                ""
            },
        );

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
impl ModelMappingStore for SqliteBackend {
    async fn get_mappings(&self, source_model_id: &str) -> Result<Vec<ModelMappingRecord>> {
        let rows = sqlx::query(
            "SELECT source_model_id, target_model_id, provider, display_name, \
             input_price, output_price, cache_read_price, cache_write_price, \
             priority, status, created_at, updated_at, capabilities \
             FROM model_mappings WHERE source_model_id = ? ORDER BY priority DESC",
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
             FROM model_mappings WHERE source_model_id = ? AND provider = ?",
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
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) \
             ON CONFLICT(source_model_id, provider) DO UPDATE SET \
             target_model_id = excluded.target_model_id, \
             display_name = excluded.display_name, \
             input_price = excluded.input_price, \
             output_price = excluded.output_price, \
             cache_read_price = excluded.cache_read_price, \
             cache_write_price = excluded.cache_write_price, \
             priority = excluded.priority, \
             status = excluded.status, \
             updated_at = excluded.updated_at, \
             capabilities = excluded.capabilities",
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
        sqlx::query("DELETE FROM model_mappings WHERE source_model_id = ? AND provider = ?")
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
impl BackendConfigStore for SqliteBackend {
    async fn get_backend(&self, name: &str) -> Result<Option<BackendRecord>> {
        let row = sqlx::query(
            "SELECT name, backend_type, config, enabled, priority, \
             created_at, updated_at \
             FROM backends WHERE name = ?",
        )
        .bind(name)
        .fetch_optional(&self.pool)
        .await?;

        match row {
            Some(r) => Ok(Some(BackendRecord {
                name: r.get("name"),
                backend_type: r.get("backend_type"),
                config: r.get("config"),
                enabled: r.get::<i32, _>("enabled") != 0,
                priority: r.get("priority"),
                created_at: r.get("created_at"),
                updated_at: r.get("updated_at"),
            })),
            None => Ok(None),
        }
    }

    async fn list_enabled_backends(&self) -> Result<Vec<BackendRecord>> {
        let rows = sqlx::query(
            "SELECT name, backend_type, config, enabled, priority, \
             created_at, updated_at \
             FROM backends WHERE enabled = 1 ORDER BY priority DESC",
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
                created_at: r.get("created_at"),
                updated_at: r.get("updated_at"),
            })
            .collect();

        Ok(records)
    }

    async fn list_all_backends(&self) -> Result<Vec<BackendRecord>> {
        let rows = sqlx::query(
            "SELECT name, backend_type, config, enabled, priority, \
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
                enabled: r.get::<i32, _>("enabled") != 0,
                priority: r.get("priority"),
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
             (name, backend_type, config, enabled, priority, created_at, updated_at) \
             VALUES (?, ?, ?, ?, ?, ?, ?) \
             ON CONFLICT(name) DO UPDATE SET \
             backend_type = excluded.backend_type, \
             config = excluded.config, \
             enabled = excluded.enabled, \
             priority = excluded.priority, \
             updated_at = excluded.updated_at",
        )
        .bind(&record.name)
        .bind(&record.backend_type)
        .bind(&record.config)
        .bind(record.enabled as i32)
        .bind(record.priority)
        .bind(record.created_at)
        .bind(now)
        .execute(&self.pool)
        .await?;

        Ok(())
    }

    async fn delete_backend(&self, name: &str) -> Result<()> {
        sqlx::query("DELETE FROM backends WHERE name = ?")
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
impl SystemSettingStore for SqliteBackend {
    async fn get_setting(&self, key: &str) -> Result<Option<SystemSettingRecord>> {
        let row = sqlx::query(
            "SELECT key, value, description, updated_at FROM system_settings WHERE key = ?",
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
             VALUES (?, ?, ?, ?) \
             ON CONFLICT(key) DO UPDATE SET \
             value = excluded.value, \
             description = excluded.description, \
             updated_at = excluded.updated_at",
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

// ============================================================================
// Tests
// ============================================================================

#[cfg(test)]
mod tests {
    use super::*;
    use sqlx::sqlite::SqlitePoolOptions;

    async fn in_memory_db() -> SqliteBackend {
        let pool = SqlitePoolOptions::new()
            .max_connections(1)
            .connect("sqlite::memory:")
            .await
            .unwrap();
        let backend = SqliteBackend { pool };
        backend.initialize().await.unwrap();
        backend
    }

    #[tokio::test]
    async fn test_reset_monthly_budget() {
        let db = in_memory_db().await;
        let record = ApiKeyRecord {
            api_key: "sk-test-budget".into(),
            name: "test".into(),
            is_active: true,
            rate_limit: 0,
            service_tier: "default".into(),
            monthly_budget: Some(10.0),
            budget_used: 5.0,
            budget_used_mtd: 5.0,
            budget_mtd_month: Some("2026-02".into()),
            deactivated_reason: None,
            budget_history: None,
            tpm_limit: None,
            cache_ttl: None,
            metadata: None,
            created_at: 0,
            updated_at: None,
        };
        db.api_keys().create_api_key(&record).await.unwrap();
        db.api_keys()
            .reset_monthly_budget("sk-test-budget", "2026-03", "2026-02", 5.0)
            .await
            .unwrap();
        let updated = db
            .api_keys()
            .get_api_key("sk-test-budget")
            .await
            .unwrap()
            .unwrap();
        assert_eq!(updated.budget_used_mtd, 0.0);
        assert_eq!(updated.budget_mtd_month, Some("2026-03".into()));
        assert_eq!(updated.budget_used, 5.0); // cumulative NOT reset

        // After reset, budget_history should contain previous month's data
        let history: std::collections::HashMap<String, f64> =
            serde_json::from_str(updated.budget_history.as_deref().unwrap_or("{}")).unwrap();
        assert!(history.contains_key("2026-02"));
        assert_eq!(*history.get("2026-02").unwrap(), 5.0);
    }

    #[tokio::test]
    async fn test_reactivate_api_key_budget_exceeded() {
        let db = in_memory_db().await;
        let record = ApiKeyRecord {
            api_key: "sk-test-reactivate".into(),
            name: "test".into(),
            is_active: false,
            rate_limit: 0,
            service_tier: "default".into(),
            monthly_budget: Some(10.0),
            budget_used: 10.0,
            budget_used_mtd: 10.0,
            budget_mtd_month: Some("2026-02".into()),
            deactivated_reason: Some("budget_exceeded".into()),
            budget_history: None,
            tpm_limit: None,
            cache_ttl: None,
            metadata: None,
            created_at: 0,
            updated_at: None,
        };
        db.api_keys().create_api_key(&record).await.unwrap();
        db.api_keys()
            .reactivate_api_key("sk-test-reactivate")
            .await
            .unwrap();
        let updated = db
            .api_keys()
            .get_api_key("sk-test-reactivate")
            .await
            .unwrap()
            .unwrap();
        assert!(updated.is_active);
        assert_eq!(updated.deactivated_reason, None);
    }

    #[tokio::test]
    async fn test_reactivate_api_key_does_not_touch_manually_deactivated() {
        let db = in_memory_db().await;
        let record = ApiKeyRecord {
            api_key: "sk-test-manual".into(),
            name: "test".into(),
            is_active: false,
            rate_limit: 0,
            service_tier: "default".into(),
            monthly_budget: None,
            budget_used: 0.0,
            budget_used_mtd: 0.0,
            budget_mtd_month: None,
            deactivated_reason: Some("manual_deactivation".into()),
            budget_history: None,
            tpm_limit: None,
            cache_ttl: None,
            metadata: None,
            created_at: 0,
            updated_at: None,
        };
        db.api_keys().create_api_key(&record).await.unwrap();
        db.api_keys()
            .reactivate_api_key("sk-test-manual")
            .await
            .unwrap();
        let updated = db
            .api_keys()
            .get_api_key("sk-test-manual")
            .await
            .unwrap()
            .unwrap();
        assert!(!updated.is_active);
        assert_eq!(
            updated.deactivated_reason,
            Some("manual_deactivation".into())
        );
    }
}
