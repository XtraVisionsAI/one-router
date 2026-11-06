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
                key_id TEXT,
                key_display TEXT DEFAULT '',
                user_id TEXT,
                name TEXT DEFAULT '',
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
                cost_rate REAL DEFAULT 1.0,
                expires_at INTEGER,
                allowed_models TEXT,
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

        // Migration: add cost_rate column, backfill from service_tier
        sqlx::query("ALTER TABLE api_keys ADD COLUMN cost_rate REAL DEFAULT 1.0")
            .execute(&self.pool)
            .await
            .ok();
        sqlx::query(
            "UPDATE api_keys SET cost_rate = CASE service_tier \
             WHEN 'flex' THEN 0.5 WHEN 'priority' THEN 1.75 WHEN 'master' THEN 0.0 \
             ELSE 1.0 END WHERE cost_rate = 1.0 AND service_tier != 'default'",
        )
        .execute(&self.pool)
        .await
        .ok();

        // Migration: add key_display column for masked display form
        sqlx::query("ALTER TABLE api_keys ADD COLUMN key_display TEXT DEFAULT ''")
            .execute(&self.pool)
            .await
            .ok();

        // Migration: stable key_id (UUID) — backfilled for existing rows below
        sqlx::query("ALTER TABLE api_keys ADD COLUMN key_id TEXT")
            .execute(&self.pool)
            .await
            .ok();
        self.backfill_api_key_ids().await?;
        // Migration: users — rebuild a legacy api_keys table (global UNIQUE name,
        // no owner columns) into the per-user schema.
        self.migrate_api_keys_to_user_schema().await?;
        sqlx::query("CREATE UNIQUE INDEX IF NOT EXISTS idx_api_keys_key_id ON api_keys(key_id)")
            .execute(&self.pool)
            .await?;
        sqlx::query(
            "CREATE UNIQUE INDEX IF NOT EXISTS idx_api_keys_user_name ON api_keys(user_id, name)",
        )
        .execute(&self.pool)
        .await?;
        sqlx::query("CREATE INDEX IF NOT EXISTS idx_api_keys_user ON api_keys(user_id)")
            .execute(&self.pool)
            .await?;

        // --- users ---
        sqlx::query(
            "CREATE TABLE IF NOT EXISTS users (
                user_id TEXT PRIMARY KEY,
                name TEXT NOT NULL UNIQUE,
                email TEXT,
                is_active INTEGER DEFAULT 1,
                cost_rate REAL DEFAULT 1.0,
                monthly_budget REAL,
                budget_used REAL DEFAULT 0.0,
                budget_used_mtd REAL DEFAULT 0.0,
                budget_mtd_month TEXT,
                budget_history TEXT,
                rate_limit INTEGER,
                tpm_limit INTEGER,
                allowed_models TEXT,
                cache_ttl TEXT,
                metadata TEXT,
                created_at INTEGER NOT NULL,
                updated_at INTEGER
            )",
        )
        .execute(&self.pool)
        .await?;

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

        // Migration: add provider and protocol columns for usage analytics dimensions
        sqlx::query("ALTER TABLE usage ADD COLUMN provider TEXT")
            .execute(&self.pool)
            .await
            .ok();
        sqlx::query("ALTER TABLE usage ADD COLUMN protocol TEXT")
            .execute(&self.pool)
            .await
            .ok();

        sqlx::query("CREATE INDEX IF NOT EXISTS idx_usage_provider ON usage(provider)")
            .execute(&self.pool)
            .await
            .ok();

        // Migration: usage.user_id (backfilled by migrate_keys_to_users)
        sqlx::query("ALTER TABLE usage ADD COLUMN user_id TEXT")
            .execute(&self.pool)
            .await
            .ok();
        sqlx::query("CREATE INDEX IF NOT EXISTS idx_usage_user_ts ON usage(user_id, timestamp)")
            .execute(&self.pool)
            .await?;

        // Migration: usage.key_id — on first add, attribute existing rows via
        // the key hash (only possible while the api_keys row still exists).
        let added_usage_key_id = sqlx::query("ALTER TABLE usage ADD COLUMN key_id TEXT")
            .execute(&self.pool)
            .await
            .is_ok();
        if added_usage_key_id {
            let res = sqlx::query(
                "UPDATE usage SET key_id = \
                 (SELECT key_id FROM api_keys WHERE api_keys.api_key = usage.api_key) \
                 WHERE key_id IS NULL",
            )
            .execute(&self.pool)
            .await?;
            tracing::info!(rows = res.rows_affected(), "Backfilled usage.key_id");
        }

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
                pricing_source TEXT DEFAULT 'litellm',
                PRIMARY KEY (source_model_id, provider)
            )",
        )
        .execute(&self.pool)
        .await?;

        // Migration: handle old table with single-column PK
        self.migrate_model_mappings().await?;

        // Index for wildcard model mapping lookups (LIKE queries)
        sqlx::query(
            "CREATE INDEX IF NOT EXISTS idx_model_mappings_source \
             ON model_mappings(source_model_id)",
        )
        .execute(&self.pool)
        .await?;

        // Migration: add capabilities column if not already present
        sqlx::query("ALTER TABLE model_mappings ADD COLUMN capabilities TEXT")
            .execute(&self.pool)
            .await
            .ok();

        // Migration: add pricing_source column if not already present
        sqlx::query("ALTER TABLE model_mappings ADD COLUMN pricing_source TEXT DEFAULT 'litellm'")
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
                weight INTEGER DEFAULT 1,
                strategy TEXT DEFAULT 'round_robin',
                max_failures INTEGER DEFAULT 3,
                retry_after_secs INTEGER DEFAULT 300,
                created_at INTEGER NOT NULL,
                updated_at INTEGER
            )",
        )
        .execute(&self.pool)
        .await?;

        // Migration: add weight column if upgrading
        sqlx::query("ALTER TABLE backends ADD COLUMN weight INTEGER DEFAULT 1")
            .execute(&self.pool)
            .await
            .ok();

        // Migration: add strategy/max_failures/retry_after_secs columns if upgrading
        sqlx::query("ALTER TABLE backends ADD COLUMN strategy TEXT DEFAULT 'round_robin'")
            .execute(&self.pool)
            .await
            .ok();
        sqlx::query("ALTER TABLE backends ADD COLUMN max_failures INTEGER DEFAULT 3")
            .execute(&self.pool)
            .await
            .ok();
        sqlx::query("ALTER TABLE backends ADD COLUMN retry_after_secs INTEGER DEFAULT 300")
            .execute(&self.pool)
            .await
            .ok();

        // Migration: add service_tier column to backends
        sqlx::query("ALTER TABLE backends ADD COLUMN service_tier TEXT")
            .execute(&self.pool)
            .await
            .ok();

        // Migration: add models column (per-backend model filter, JSON string array)
        sqlx::query("ALTER TABLE backends ADD COLUMN models TEXT")
            .execute(&self.pool)
            .await
            .ok();

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
                ui_schema TEXT,
                updated_at INTEGER
            )",
        )
        .execute(&self.pool)
        .await?;

        // Migration: add ui_schema column for existing databases
        sqlx::query("ALTER TABLE system_settings ADD COLUMN ui_schema TEXT")
            .execute(&self.pool)
            .await
            .ok();

        Ok(())
    }

    /// Backfill plaintext API keys with HMAC-SHA256 hashes.
    /// For each key that is not yet hashed, compute hash + masked display,
    /// then update both api_keys and usage tables.
    async fn backfill_key_hashes(&self, encryption_key: Option<&str>) -> Result<()> {
        use crate::utils::api_key::{hash_key, is_hashed, mask_key};

        let rows = sqlx::query("SELECT api_key FROM api_keys")
            .fetch_all(&self.pool)
            .await?;

        let mut migrated = 0u32;
        for row in &rows {
            let old_key: String = row.get("api_key");
            if is_hashed(&old_key) {
                continue;
            }
            let hashed = hash_key(&old_key, encryption_key);
            let display = mask_key(&old_key);

            sqlx::query("UPDATE api_keys SET api_key = ?, key_display = ? WHERE api_key = ?")
                .bind(&hashed)
                .bind(&display)
                .bind(&old_key)
                .execute(&self.pool)
                .await?;

            sqlx::query("UPDATE usage SET api_key = ? WHERE api_key = ?")
                .bind(&hashed)
                .bind(&old_key)
                .execute(&self.pool)
                .await?;

            migrated += 1;
        }

        if migrated > 0 {
            tracing::info!(count = migrated, "Backfilled API key hashes");
        }

        Ok(())
    }

    /// Full-row update of an api_keys row; `extra_where` narrows the match.
    /// Returns rows affected.
    async fn write_api_key(&self, record: &ApiKeyRecord, extra_where: &str) -> Result<u64> {
        let res = sqlx::query(&format!(
            "UPDATE api_keys SET \
             user_id = ?, name = ?, is_active = ?, rate_limit = ?, cost_rate = ?, \
             monthly_budget = ?, budget_used = ?, budget_used_mtd = ?, budget_mtd_month = ?, \
             deactivated_reason = ?, budget_history = ?, tpm_limit = ?, cache_ttl = ?, metadata = ?, \
             expires_at = ?, allowed_models = ?, updated_at = ? \
             WHERE api_key = ?{extra_where}"
        ))
        .bind(&record.user_id)
        .bind(&record.name)
        .bind(record.is_active as i32)
        .bind(record.rate_limit)
        .bind(record.cost_rate)
        .bind(record.monthly_budget)
        .bind(record.budget_used)
        .bind(record.budget_used_mtd)
        .bind(&record.budget_mtd_month)
        .bind(&record.deactivated_reason)
        .bind(&record.budget_history)
        .bind(record.tpm_limit)
        .bind(&record.cache_ttl)
        .bind(&record.metadata)
        .bind(record.expires_at)
        .bind(patterns_to_json(&record.allowed_models))
        .bind(unix_now())
        .bind(&record.api_key)
        .execute(&self.pool)
        .await?;
        Ok(res.rows_affected())
    }

    /// Legacy api_keys tables carry an inline global `UNIQUE(name)`, which SQLite
    /// cannot drop in place. Rebuild into the per-user schema (owner, expiry,
    /// allowlist columns; uniqueness becomes `(user_id, name)`). Runs once —
    /// detected by the missing `user_id` column.
    async fn migrate_api_keys_to_user_schema(&self) -> Result<()> {
        let cols = sqlx::query("PRAGMA table_info(api_keys)")
            .fetch_all(&self.pool)
            .await?;
        if cols.iter().any(|r| r.get::<String, _>("name") == "user_id") {
            return Ok(());
        }
        tracing::info!("Rebuilding api_keys table for per-user key names");
        let copied = "api_key, key_id, key_display, name, is_active, rate_limit, service_tier, \
             cost_rate, monthly_budget, budget_used, budget_used_mtd, budget_mtd_month, \
             deactivated_reason, budget_history, tpm_limit, cache_ttl, metadata, created_at, updated_at";
        let mut tx = self.pool.begin().await?;
        sqlx::query(
            "CREATE TABLE api_keys_new (
                api_key TEXT PRIMARY KEY,
                key_id TEXT,
                key_display TEXT DEFAULT '',
                user_id TEXT,
                name TEXT DEFAULT '',
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
                cost_rate REAL DEFAULT 1.0,
                expires_at INTEGER,
                allowed_models TEXT,
                created_at INTEGER NOT NULL,
                updated_at INTEGER
            )",
        )
        .execute(&mut *tx)
        .await?;
        sqlx::query(&format!(
            "INSERT INTO api_keys_new ({copied}) SELECT {copied} FROM api_keys"
        ))
        .execute(&mut *tx)
        .await?;
        sqlx::query("DROP TABLE api_keys").execute(&mut *tx).await?;
        sqlx::query("ALTER TABLE api_keys_new RENAME TO api_keys")
            .execute(&mut *tx)
            .await?;
        tx.commit().await?;
        Ok(())
    }

    /// Assign a `key_id` to every api_keys row that lacks one.
    async fn backfill_api_key_ids(&self) -> Result<()> {
        let rows = sqlx::query("SELECT api_key FROM api_keys WHERE key_id IS NULL OR key_id = ''")
            .fetch_all(&self.pool)
            .await?;
        for row in &rows {
            let hash: String = row.get("api_key");
            sqlx::query("UPDATE api_keys SET key_id = ? WHERE api_key = ?")
                .bind(new_key_id())
                .bind(&hash)
                .execute(&self.pool)
                .await?;
        }
        if !rows.is_empty() {
            tracing::info!(count = rows.len(), "Backfilled api_keys.key_id");
        }
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
// Helper: api_keys row mapping
// ============================================================================

const API_KEY_COLS: &str = "api_key, key_id, key_display, user_id, name, is_active, rate_limit, cost_rate, \
     monthly_budget, budget_used, budget_used_mtd, budget_mtd_month, \
     deactivated_reason, budget_history, tpm_limit, cache_ttl, metadata, expires_at, allowed_models, \
     created_at, updated_at";

const USER_COLS: &str = "user_id, name, email, is_active, cost_rate, monthly_budget, budget_used, \
     budget_used_mtd, budget_mtd_month, budget_history, rate_limit, tpm_limit, allowed_models, \
     cache_ttl, metadata, created_at, updated_at";

fn row_to_user(r: &sqlx::sqlite::SqliteRow) -> UserRecord {
    UserRecord {
        user_id: r.get("user_id"),
        name: r.get("name"),
        email: r.get("email"),
        is_active: r.get::<i32, _>("is_active") != 0,
        cost_rate: r.get::<Option<f64>, _>("cost_rate").unwrap_or(1.0),
        monthly_budget: r.get("monthly_budget"),
        budget_used: r.get::<Option<f64>, _>("budget_used").unwrap_or(0.0),
        budget_used_mtd: r.get::<Option<f64>, _>("budget_used_mtd").unwrap_or(0.0),
        budget_mtd_month: r.get("budget_mtd_month"),
        budget_history: r.get("budget_history"),
        rate_limit: r.get("rate_limit"),
        tpm_limit: r.get("tpm_limit"),
        allowed_models: patterns_from_json(r.get("allowed_models")),
        cache_ttl: r.get("cache_ttl"),
        metadata: r.get("metadata"),
        created_at: r.get("created_at"),
        updated_at: r.get("updated_at"),
    }
}

/// `UPDATE <table> SET budget_used += amount, budget_used_mtd += amount`, then
/// report whether month-to-date spend reached the monthly budget.
async fn increment_budget(
    pool: &SqlitePool,
    table: &str,
    id_col: &str,
    id: &str,
    amount: f64,
) -> Result<bool> {
    let mut tx = pool.begin().await?;
    let result = sqlx::query(&format!(
        "UPDATE {table} SET budget_used = budget_used + ?, \
         budget_used_mtd = budget_used_mtd + ?, updated_at = ? WHERE {id_col} = ?"
    ))
    .bind(amount)
    .bind(amount)
    .bind(unix_now())
    .bind(id)
    .execute(&mut *tx)
    .await?;
    if result.rows_affected() == 0 {
        tx.rollback().await?;
        anyhow::bail!("{table} row not found: {id}");
    }
    let row = sqlx::query(&format!(
        "SELECT monthly_budget, budget_used_mtd FROM {table} WHERE {id_col} = ?"
    ))
    .bind(id)
    .fetch_optional(&mut *tx)
    .await?;
    tx.commit().await?;
    Ok(row.is_some_and(|r| {
        let budget: Option<f64> = r.get("monthly_budget");
        let used: f64 = r.get("budget_used_mtd");
        budget.is_some_and(|limit| used >= limit)
    }))
}

/// Reset month-to-date spend and archive the previous month into budget_history.
async fn reset_budget(
    pool: &SqlitePool,
    table: &str,
    id_col: &str,
    id: &str,
    month: &str,
    prev_month: &str,
    prev_mtd: f64,
) -> Result<()> {
    let row = sqlx::query(&format!(
        "SELECT budget_history FROM {table} WHERE {id_col} = ?"
    ))
    .bind(id)
    .fetch_optional(pool)
    .await?;
    let updated_history = archive_month(
        row.and_then(|r| r.get::<Option<String>, _>("budget_history")),
        prev_month,
        prev_mtd,
    );
    sqlx::query(&format!(
        "UPDATE {table} SET budget_used_mtd = 0.0, budget_mtd_month = ?, \
         budget_history = ?, updated_at = ? WHERE {id_col} = ?"
    ))
    .bind(month)
    .bind(&updated_history)
    .bind(unix_now())
    .bind(id)
    .execute(pool)
    .await?;
    Ok(())
}

/// Add `prev_mtd` (rounded to cents) under `prev_month` in a budget_history JSON.
fn archive_month(existing: Option<String>, prev_month: &str, prev_mtd: f64) -> String {
    let mut history: std::collections::HashMap<String, f64> = existing
        .as_deref()
        .and_then(|s| serde_json::from_str(s).ok())
        .unwrap_or_default();
    if prev_mtd > 0.0 && !prev_month.is_empty() {
        history.insert(prev_month.to_string(), (prev_mtd * 100.0).round() / 100.0);
    }
    serde_json::to_string(&history).unwrap_or_else(|_| "{}".to_string())
}

fn row_to_api_key(r: &sqlx::sqlite::SqliteRow) -> ApiKeyRecord {
    ApiKeyRecord {
        api_key: r.get("api_key"),
        key_id: r.get::<Option<String>, _>("key_id").unwrap_or_default(),
        key_display: r
            .get::<Option<String>, _>("key_display")
            .unwrap_or_default(),
        user_id: r.get::<Option<String>, _>("user_id").unwrap_or_default(),
        name: r.get("name"),
        is_active: r.get::<i32, _>("is_active") != 0,
        rate_limit: r.get("rate_limit"),
        cost_rate: r.get("cost_rate"),
        monthly_budget: r.get("monthly_budget"),
        budget_used: r.get("budget_used"),
        budget_used_mtd: r.get("budget_used_mtd"),
        budget_mtd_month: r.get("budget_mtd_month"),
        deactivated_reason: r.get("deactivated_reason"),
        budget_history: r.get("budget_history"),
        tpm_limit: r.get("tpm_limit"),
        cache_ttl: r.get("cache_ttl"),
        metadata: r.get("metadata"),
        expires_at: r.get("expires_at"),
        allowed_models: patterns_from_json(r.get("allowed_models")),
        created_at: r.get("created_at"),
        updated_at: r.get("updated_at"),
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

    fn users(&self) -> &dyn UserStore {
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

    async fn initialize(&self, encryption_key: Option<&str>, seed_mode: SeedMode) -> Result<()> {
        self.run_migrations().await?;
        self.backfill_key_hashes(encryption_key).await?;
        self.migrate_keys_to_users().await?;
        self.seed_defaults(seed_mode).await?;
        Ok(())
    }

    async fn health_check(&self) -> bool {
        sqlx::query("SELECT 1").execute(&self.pool).await.is_ok()
    }

    async fn backfill_usage_user_ids(&self) -> Result<()> {
        let res = sqlx::query(
            "UPDATE usage SET user_id = \
             (SELECT user_id FROM api_keys WHERE api_keys.api_key = usage.api_key) \
             WHERE user_id IS NULL",
        )
        .execute(&self.pool)
        .await?;
        tracing::info!(rows = res.rows_affected(), "Backfilled usage.user_id");
        self.upsert_setting(&internal_setting(USAGE_USER_BACKFILL_SETTING, "done"))
            .await
    }
}

// ============================================================================
// ApiKeyStore
// ============================================================================

#[async_trait]
impl ApiKeyStore for SqliteBackend {
    async fn get_api_key(&self, api_key: &str) -> Result<Option<ApiKeyRecord>> {
        let row = sqlx::query(&format!(
            "SELECT {API_KEY_COLS} FROM api_keys WHERE api_key = ?"
        ))
        .bind(api_key)
        .fetch_optional(&self.pool)
        .await?;

        match row {
            Some(r) => Ok(Some(row_to_api_key(&r))),
            None => Ok(None),
        }
    }

    async fn create_api_key(&self, record: &ApiKeyRecord) -> Result<()> {
        sqlx::query(
            "INSERT INTO api_keys \
             (api_key, key_id, key_display, user_id, name, is_active, rate_limit, cost_rate, \
              monthly_budget, budget_used, budget_used_mtd, budget_mtd_month, \
              deactivated_reason, budget_history, tpm_limit, cache_ttl, metadata, \
              expires_at, allowed_models, created_at, updated_at) \
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        )
        .bind(&record.api_key)
        .bind(&record.key_id)
        .bind(&record.key_display)
        .bind(&record.user_id)
        .bind(&record.name)
        .bind(record.is_active as i32)
        .bind(record.rate_limit)
        .bind(record.cost_rate)
        .bind(record.monthly_budget)
        .bind(record.budget_used)
        .bind(record.budget_used_mtd)
        .bind(&record.budget_mtd_month)
        .bind(&record.deactivated_reason)
        .bind(&record.budget_history)
        .bind(record.tpm_limit)
        .bind(&record.cache_ttl)
        .bind(&record.metadata)
        .bind(record.expires_at)
        .bind(patterns_to_json(&record.allowed_models))
        .bind(record.created_at)
        .bind(record.updated_at)
        .execute(&self.pool)
        .await?;

        Ok(())
    }

    async fn update_api_key(&self, record: &ApiKeyRecord) -> Result<()> {
        self.write_api_key(record, "").await.map(|_| ())
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
        increment_budget(&self.pool, "api_keys", "api_key", api_key, amount).await
    }

    async fn reset_monthly_budget(
        &self,
        api_key: &str,
        month: &str,
        prev_month: &str,
        prev_mtd: f64,
    ) -> Result<()> {
        reset_budget(
            &self.pool, "api_keys", "api_key", api_key, month, prev_month, prev_mtd,
        )
        .await
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
        let rows = sqlx::query(&format!(
            "SELECT {API_KEY_COLS} FROM api_keys ORDER BY created_at DESC"
        ))
        .fetch_all(&self.pool)
        .await?;

        let records = rows.iter().map(row_to_api_key).collect();

        Ok(records)
    }

    async fn find_api_key_by_prefix(&self, prefix: &str) -> Result<Option<ApiKeyRecord>> {
        let rows = sqlx::query(&format!(
            "SELECT {API_KEY_COLS} FROM api_keys WHERE api_key LIKE ? || '%' LIMIT 2"
        ))
        .bind(prefix)
        .fetch_all(&self.pool)
        .await?;

        if rows.len() > 1 {
            anyhow::bail!("ambiguous_prefix");
        }

        Ok(rows.first().map(row_to_api_key))
    }

    async fn get_api_key_by_name(&self, name: &str) -> Result<Option<ApiKeyRecord>> {
        let row = sqlx::query(&format!(
            "SELECT {API_KEY_COLS} FROM api_keys WHERE name = ?"
        ))
        .bind(name)
        .fetch_optional(&self.pool)
        .await?;

        match row {
            Some(r) => Ok(Some(row_to_api_key(&r))),
            None => Ok(None),
        }
    }

    async fn get_api_key_by_id(&self, key_id: &str) -> Result<Option<ApiKeyRecord>> {
        let row = sqlx::query(&format!(
            "SELECT {API_KEY_COLS} FROM api_keys WHERE key_id = ?"
        ))
        .bind(key_id)
        .fetch_optional(&self.pool)
        .await?;
        Ok(row.as_ref().map(row_to_api_key))
    }

    async fn delete_api_key(&self, api_key: &str) -> Result<()> {
        sqlx::query("DELETE FROM api_keys WHERE api_key = ?")
            .bind(api_key)
            .execute(&self.pool)
            .await?;
        Ok(())
    }

    async fn list_api_keys_by_user(&self, user_id: &str) -> Result<Vec<ApiKeyRecord>> {
        let rows = sqlx::query(&format!(
            "SELECT {API_KEY_COLS} FROM api_keys WHERE user_id = ? ORDER BY created_at DESC"
        ))
        .bind(user_id)
        .fetch_all(&self.pool)
        .await?;
        Ok(rows.iter().map(row_to_api_key).collect())
    }

    async fn assign_unowned_key(&self, record: &ApiKeyRecord) -> Result<bool> {
        self.write_api_key(record, " AND (user_id IS NULL OR user_id = '')")
            .await
            .map(|n| n > 0)
    }
}

// ============================================================================
// UserStore
// ============================================================================

#[async_trait]
impl UserStore for SqliteBackend {
    async fn get_user(&self, user_id: &str) -> Result<Option<UserRecord>> {
        let row = sqlx::query(&format!("SELECT {USER_COLS} FROM users WHERE user_id = ?"))
            .bind(user_id)
            .fetch_optional(&self.pool)
            .await?;
        Ok(row.as_ref().map(row_to_user))
    }

    async fn get_user_by_name(&self, name: &str) -> Result<Option<UserRecord>> {
        let row = sqlx::query(&format!("SELECT {USER_COLS} FROM users WHERE name = ?"))
            .bind(name)
            .fetch_optional(&self.pool)
            .await?;
        Ok(row.as_ref().map(row_to_user))
    }

    async fn list_users(&self) -> Result<Vec<UserRecord>> {
        let rows = sqlx::query(&format!(
            "SELECT {USER_COLS} FROM users ORDER BY created_at DESC"
        ))
        .fetch_all(&self.pool)
        .await?;
        Ok(rows.iter().map(row_to_user).collect())
    }

    async fn create_user(&self, u: &UserRecord) -> Result<()> {
        sqlx::query(&format!(
            "INSERT INTO users ({USER_COLS}) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
        ))
        .bind(&u.user_id)
        .bind(&u.name)
        .bind(&u.email)
        .bind(u.is_active as i32)
        .bind(u.cost_rate)
        .bind(u.monthly_budget)
        .bind(u.budget_used)
        .bind(u.budget_used_mtd)
        .bind(&u.budget_mtd_month)
        .bind(&u.budget_history)
        .bind(u.rate_limit)
        .bind(u.tpm_limit)
        .bind(patterns_to_json(&u.allowed_models))
        .bind(&u.cache_ttl)
        .bind(&u.metadata)
        .bind(u.created_at)
        .bind(u.updated_at)
        .execute(&self.pool)
        .await?;
        Ok(())
    }

    async fn update_user(&self, u: &UserRecord) -> Result<()> {
        // Spend counters are owned by increment/reset — never overwritten here,
        // so an admin edit racing a request cannot lose spend.
        sqlx::query(
            "UPDATE users SET name = ?, email = ?, is_active = ?, cost_rate = ?, \
             monthly_budget = ?, rate_limit = ?, tpm_limit = ?, allowed_models = ?, \
             cache_ttl = ?, metadata = ?, updated_at = ? WHERE user_id = ?",
        )
        .bind(&u.name)
        .bind(&u.email)
        .bind(u.is_active as i32)
        .bind(u.cost_rate)
        .bind(u.monthly_budget)
        .bind(u.rate_limit)
        .bind(u.tpm_limit)
        .bind(patterns_to_json(&u.allowed_models))
        .bind(&u.cache_ttl)
        .bind(&u.metadata)
        .bind(unix_now())
        .bind(&u.user_id)
        .execute(&self.pool)
        .await?;
        Ok(())
    }

    async fn delete_user(&self, user_id: &str) -> Result<()> {
        sqlx::query("DELETE FROM users WHERE user_id = ?")
            .bind(user_id)
            .execute(&self.pool)
            .await?;
        Ok(())
    }

    async fn increment_user_budget_used(&self, user_id: &str, amount: f64) -> Result<bool> {
        increment_budget(&self.pool, "users", "user_id", user_id, amount).await
    }

    async fn reset_user_monthly_budget(
        &self,
        user_id: &str,
        month: &str,
        prev_month: &str,
        prev_mtd: f64,
    ) -> Result<()> {
        reset_budget(
            &self.pool, "users", "user_id", user_id, month, prev_month, prev_mtd,
        )
        .await
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
             (api_key, key_id, user_id, timestamp, request_id, model, input_tokens, output_tokens, \
              cached_tokens, cache_write_tokens, cost, success, duration_ms, error_message, \
              provider, protocol) \
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        )
        .bind(&record.api_key)
        .bind(&record.key_id)
        .bind(&record.user_id)
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
        .bind(&record.provider)
        .bind(&record.protocol)
        .execute(&self.pool)
        .await?;

        Ok(())
    }

    async fn get_usage_by_api_key(
        &self,
        api_key: &str,
        user_id: Option<&str>,
        since: Option<&str>,
        limit: Option<i64>,
        before_id: Option<i64>,
    ) -> Result<Vec<UsageRecord>> {
        // Empty api_key means "all keys" (admin query with no key filter)
        let filter_by_key = !api_key.is_empty();

        let key_clause = format!(
            "WHERE 1=1{}{}",
            if filter_by_key {
                " AND api_key = ?"
            } else {
                ""
            },
            if user_id.is_some() {
                " AND user_id = ?"
            } else {
                ""
            },
        );
        let since_clause = if since.is_some() {
            "AND timestamp >= ?"
        } else {
            ""
        };
        let before_id_clause = if before_id.is_some() {
            "AND id < ?"
        } else {
            ""
        };
        let limit_clause = if limit.is_some() { "LIMIT ?" } else { "" };

        let sql = format!(
            "SELECT id, api_key, key_id, user_id, timestamp, request_id, model, \
             input_tokens, output_tokens, cached_tokens, cache_write_tokens, \
             cost, success, duration_ms, error_message, provider, protocol \
             FROM usage {key_clause} {since_clause} {before_id_clause} \
             ORDER BY timestamp DESC {limit_clause}",
        );

        let mut q = sqlx::query(&sql);
        if filter_by_key {
            q = q.bind(api_key);
        }
        if let Some(u) = user_id {
            q = q.bind(u);
        }
        if let Some(s) = since {
            q = q.bind(s);
        }
        if let Some(bid) = before_id {
            q = q.bind(bid);
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
                key_id: r.get("key_id"),
                user_id: r.get("user_id"),
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
                provider: r.get("provider"),
                protocol: r.get("protocol"),
            })
            .collect();

        Ok(records)
    }

    async fn query_usage_summary(
        &self,
        api_key: &str,
        user_id: Option<&str>,
        start: Option<&str>,
        end: Option<&str>,
        group_by: &str,
        split_by: Option<&str>,
    ) -> Result<Vec<UsageSummaryRow>> {
        fn dim_expr(dim: &str) -> &str {
            match dim {
                "model" => "model",
                "day" => "strftime('%Y-%m-%d', timestamp)",
                "month" => "strftime('%Y-%m', timestamp)",
                "provider" => "COALESCE(provider, 'unknown')",
                "api_key" => "COALESCE(key_id, api_key)",
                "user" => "COALESCE(user_id, '')",
                _ => "strftime('%Y-%m-%dT%H', timestamp)",
            }
        }

        let group_expr = dim_expr(group_by);

        // Build split clause
        let (split_select, split_group, split_order) = if let Some(sb) = split_by {
            let se = dim_expr(sb);
            (
                format!(", {se} AS split_key"),
                format!(", {se}"),
                ", split_key",
            )
        } else {
            (String::new(), String::new(), "")
        };

        let filter_by_key = !api_key.is_empty();
        let key_clause = format!(
            "WHERE 1=1{}{}",
            if filter_by_key {
                " AND api_key = ?"
            } else {
                ""
            },
            if user_id.is_some() {
                " AND user_id = ?"
            } else {
                ""
            },
        );

        let sql = format!(
            "SELECT {group_expr} AS group_key{split_select}, \
             SUM(input_tokens) AS input_tokens, \
             SUM(output_tokens) AS output_tokens, \
             SUM(cached_tokens) AS cached_tokens, \
             SUM(cache_write_tokens) AS cache_write_tokens, \
             SUM(cost) AS total_cost, \
             COUNT(*) AS total_requests, \
             SUM(CASE WHEN success = 0 THEN 1 ELSE 0 END) AS error_requests \
             FROM usage \
             {key_clause} {start_clause} {end_clause} \
             GROUP BY {group_expr}{split_group} \
             ORDER BY group_key DESC{split_order}",
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
        if let Some(u) = user_id {
            q = q.bind(u);
        }
        if let Some(s) = start {
            q = q.bind(s);
        }
        if let Some(e) = end {
            q = q.bind(e);
        }

        let rows = q.fetch_all(&self.pool).await?;
        let has_split = split_by.is_some();

        let records = rows
            .iter()
            .map(|r| UsageSummaryRow {
                group_key: r.get("group_key"),
                split_key: if has_split { r.get("split_key") } else { None },
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
             priority, status, created_at, updated_at, capabilities, pricing_source \
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
                pricing_source: r
                    .get::<Option<String>, _>("pricing_source")
                    .unwrap_or_else(|| "litellm".to_string()),
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
             priority, status, created_at, updated_at, capabilities, pricing_source \
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
                pricing_source: r
                    .get::<Option<String>, _>("pricing_source")
                    .unwrap_or_else(|| "litellm".to_string()),
            })),
            None => Ok(None),
        }
    }

    async fn list_mappings(&self) -> Result<Vec<ModelMappingRecord>> {
        let rows = sqlx::query(
            "SELECT source_model_id, target_model_id, provider, display_name, \
             input_price, output_price, cache_read_price, cache_write_price, \
             priority, status, created_at, updated_at, capabilities, pricing_source \
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
                pricing_source: r
                    .get::<Option<String>, _>("pricing_source")
                    .unwrap_or_else(|| "litellm".to_string()),
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
              priority, status, created_at, updated_at, capabilities, pricing_source) \
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) \
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
             capabilities = excluded.capabilities, \
             pricing_source = excluded.pricing_source",
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
        .bind(&record.pricing_source)
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
             priority, status, created_at, updated_at, capabilities, pricing_source \
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
                pricing_source: r
                    .get::<Option<String>, _>("pricing_source")
                    .unwrap_or_else(|| "litellm".to_string()),
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
            "SELECT name, backend_type, config, enabled, priority, weight, \
             strategy, max_failures, retry_after_secs, service_tier, models, \
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
                weight: r.get("weight"),
                strategy: r.get("strategy"),
                max_failures: r.get("max_failures"),
                retry_after_secs: r.get("retry_after_secs"),
                service_tier: r.get("service_tier"),
                models: BackendRecord::models_from_json(r.get("models")),
                created_at: r.get("created_at"),
                updated_at: r.get("updated_at"),
            })),
            None => Ok(None),
        }
    }

    async fn list_enabled_backends(&self) -> Result<Vec<BackendRecord>> {
        let rows = sqlx::query(
            "SELECT name, backend_type, config, enabled, priority, weight, \
             strategy, max_failures, retry_after_secs, service_tier, models, \
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
                weight: r.get("weight"),
                strategy: r.get("strategy"),
                max_failures: r.get("max_failures"),
                retry_after_secs: r.get("retry_after_secs"),
                service_tier: r.get("service_tier"),
                models: BackendRecord::models_from_json(r.get("models")),
                created_at: r.get("created_at"),
                updated_at: r.get("updated_at"),
            })
            .collect();

        Ok(records)
    }

    async fn list_all_backends(&self) -> Result<Vec<BackendRecord>> {
        let rows = sqlx::query(
            "SELECT name, backend_type, config, enabled, priority, weight, \
             strategy, max_failures, retry_after_secs, service_tier, models, \
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
                weight: r.get("weight"),
                strategy: r.get("strategy"),
                max_failures: r.get("max_failures"),
                retry_after_secs: r.get("retry_after_secs"),
                service_tier: r.get("service_tier"),
                models: BackendRecord::models_from_json(r.get("models")),
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
              strategy, max_failures, retry_after_secs, service_tier, models, \
              created_at, updated_at) \
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) \
             ON CONFLICT(name) DO UPDATE SET \
             backend_type = excluded.backend_type, \
             config = excluded.config, \
             enabled = excluded.enabled, \
             priority = excluded.priority, \
             weight = excluded.weight, \
             strategy = excluded.strategy, \
             max_failures = excluded.max_failures, \
             retry_after_secs = excluded.retry_after_secs, \
             service_tier = excluded.service_tier, \
             models = excluded.models, \
             updated_at = excluded.updated_at",
        )
        .bind(&record.name)
        .bind(&record.backend_type)
        .bind(&record.config)
        .bind(record.enabled as i32)
        .bind(record.priority)
        .bind(record.weight)
        .bind(&record.strategy)
        .bind(record.max_failures)
        .bind(record.retry_after_secs)
        .bind(&record.service_tier)
        .bind(BackendRecord::models_to_json(&record.models))
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
            "SELECT key, value, description, ui_schema, updated_at FROM system_settings WHERE key = ?",
        )
        .bind(key)
        .fetch_optional(&self.pool)
        .await?;

        Ok(row.map(|r| SystemSettingRecord {
            key: r.get("key"),
            value: r.get("value"),
            description: r.get("description"),
            ui_schema: r.get("ui_schema"),
            updated_at: r.get("updated_at"),
        }))
    }

    async fn upsert_setting(&self, record: &SystemSettingRecord) -> Result<()> {
        let now = unix_now();
        sqlx::query(
            "INSERT INTO system_settings (key, value, description, ui_schema, updated_at) \
             VALUES (?, ?, ?, ?, ?) \
             ON CONFLICT(key) DO UPDATE SET \
             value = excluded.value, \
             description = excluded.description, \
             ui_schema = COALESCE(excluded.ui_schema, system_settings.ui_schema), \
             updated_at = excluded.updated_at",
        )
        .bind(&record.key)
        .bind(&record.value)
        .bind(&record.description)
        .bind(&record.ui_schema)
        .bind(now)
        .execute(&self.pool)
        .await?;

        Ok(())
    }

    async fn list_settings(&self) -> Result<Vec<SystemSettingRecord>> {
        let rows = sqlx::query(
            "SELECT key, value, description, ui_schema, updated_at FROM system_settings ORDER BY key",
        )
        .fetch_all(&self.pool)
        .await?;

        Ok(rows
            .iter()
            .map(|r| SystemSettingRecord {
                key: r.get("key"),
                value: r.get("value"),
                description: r.get("description"),
                ui_schema: r.get("ui_schema"),
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
        backend.initialize(None, SeedMode::Missing).await.unwrap();
        backend
    }

    fn key_record(hash: &str, name: &str) -> ApiKeyRecord {
        ApiKeyRecord {
            api_key: hash.into(),
            key_id: new_key_id(),
            key_display: "sk-abcd••••5678".into(),
            name: name.into(),
            is_active: true,
            rate_limit: 0,
            cost_rate: 1.0,
            monthly_budget: None,
            budget_used: 0.0,
            budget_used_mtd: 0.0,
            budget_mtd_month: None,
            deactivated_reason: None,
            budget_history: None,
            tpm_limit: None,
            cache_ttl: None,
            metadata: None,
            user_id: String::new(),
            expires_at: None,
            allowed_models: None,
            created_at: 0,
            updated_at: None,
        }
    }

    fn usage_row(hash: &str, key_id: Option<&str>, cost: f64) -> UsageRecord {
        UsageRecord {
            id: None,
            api_key: hash.into(),
            key_id: key_id.map(String::from),
            user_id: None,
            timestamp: "2026-11-06T10:00:00+00:00".into(),
            request_id: new_key_id(),
            model: "m".into(),
            input_tokens: 1,
            output_tokens: 1,
            cached_tokens: 0,
            cache_write_tokens: 0,
            cost,
            success: true,
            duration_ms: None,
            error_message: None,
            provider: Some("bedrock".into()),
            protocol: Some("anthropic".into()),
        }
    }

    #[tokio::test]
    async fn key_id_lookup_and_hard_delete_keep_usage() {
        let db = in_memory_db().await;
        let rec = key_record("hash-a", "alice");
        db.api_keys().create_api_key(&rec).await.unwrap();

        let found = db.api_keys().get_api_key_by_id(&rec.key_id).await.unwrap();
        assert_eq!(found.unwrap().name, "alice");
        assert!(db
            .api_keys()
            .get_api_key_by_id(&new_key_id())
            .await
            .unwrap()
            .is_none());

        db.usage()
            .record_usage(&usage_row("hash-a", Some(&rec.key_id), 1.5))
            .await
            .unwrap();
        db.api_keys().delete_api_key("hash-a").await.unwrap();
        assert!(db.api_keys().get_api_key("hash-a").await.unwrap().is_none());

        // Usage survives the delete and groups under the key_id.
        let rows = db
            .usage()
            .query_usage_summary("", None, None, None, "api_key", None)
            .await
            .unwrap();
        assert_eq!(rows.len(), 1);
        assert_eq!(rows[0].group_key, rec.key_id);
        assert_eq!(rows[0].total_cost, 1.5);
    }

    #[tokio::test]
    async fn names_and_key_ids_are_unique() {
        let db = in_memory_db().await;
        let a = key_record("hash-a", "dup");
        db.api_keys().create_api_key(&a).await.unwrap();
        assert!(db
            .api_keys()
            .create_api_key(&key_record("hash-b", "dup"))
            .await
            .is_err());
        let mut same_id = key_record("hash-c", "other");
        same_id.key_id = a.key_id.clone();
        assert!(db.api_keys().create_api_key(&same_id).await.is_err());
    }

    /// A database created before key ids existed gets ids on startup, and its
    /// usage rows are attributed through the key hash.
    #[tokio::test]
    async fn legacy_database_is_backfilled() {
        let pool = SqlitePoolOptions::new()
            .max_connections(1)
            .connect("sqlite::memory:")
            .await
            .unwrap();
        sqlx::query(
            "CREATE TABLE api_keys (api_key TEXT PRIMARY KEY, name TEXT UNIQUE DEFAULT '', \
             is_active INTEGER DEFAULT 1, rate_limit INTEGER DEFAULT 100, \
             service_tier TEXT DEFAULT 'default', monthly_budget REAL, budget_used REAL DEFAULT 0.0, \
             budget_used_mtd REAL DEFAULT 0.0, budget_mtd_month TEXT, deactivated_reason TEXT, \
             tpm_limit INTEGER, metadata TEXT, created_at INTEGER NOT NULL, updated_at INTEGER)",
        )
        .execute(&pool)
        .await
        .unwrap();
        sqlx::query(
            "CREATE TABLE usage (id INTEGER PRIMARY KEY AUTOINCREMENT, api_key TEXT NOT NULL, \
             timestamp TEXT NOT NULL, request_id TEXT NOT NULL, model TEXT NOT NULL, \
             input_tokens INTEGER DEFAULT 0, output_tokens INTEGER DEFAULT 0, \
             cached_tokens INTEGER DEFAULT 0, cache_write_tokens INTEGER DEFAULT 0, \
             cost REAL DEFAULT 0.0, success INTEGER DEFAULT 1, duration_ms INTEGER, error_message TEXT)",
        )
        .execute(&pool)
        .await
        .unwrap();
        // Two live keys (already hashed: 64 hex chars) + usage, plus usage of a
        // key that no longer exists.
        let h1 = "a".repeat(64);
        let h2 = "b".repeat(64);
        let gone = "c".repeat(64);
        for (h, n) in [(&h1, "k1"), (&h2, "k2")] {
            sqlx::query("INSERT INTO api_keys (api_key, name, created_at) VALUES (?, ?, 0)")
                .bind(h)
                .bind(n)
                .execute(&pool)
                .await
                .unwrap();
        }
        for h in [&h1, &h2, &gone] {
            sqlx::query(
                "INSERT INTO usage (api_key, timestamp, request_id, model) VALUES (?, 't', 'r', 'm')",
            )
            .bind(h)
            .execute(&pool)
            .await
            .unwrap();
        }

        let db = SqliteBackend { pool };
        db.initialize(None, SeedMode::Off).await.unwrap();
        // Idempotent on the next startup.
        db.initialize(None, SeedMode::Off).await.unwrap();

        let keys = db.api_keys().list_api_keys().await.unwrap();
        assert_eq!(keys.len(), 2);
        assert!(keys.iter().all(|k| looks_like_key_id(&k.key_id)));
        assert_ne!(keys[0].key_id, keys[1].key_id);

        let usage = db
            .usage()
            .get_usage_by_api_key("", None, None, None, None)
            .await
            .unwrap();
        for u in &usage {
            if u.api_key == gone {
                assert_eq!(u.key_id, None);
            } else {
                let k = keys.iter().find(|k| k.api_key == u.api_key).unwrap();
                assert_eq!(u.key_id.as_deref(), Some(k.key_id.as_str()));
            }
        }
    }

    /// Legacy keys (global names, key-level budget/limits, one exceeded its
    /// budget) become one user each with unchanged enforcement inputs.
    #[tokio::test]
    async fn legacy_keys_become_users() {
        let pool = SqlitePoolOptions::new()
            .max_connections(1)
            .connect("sqlite::memory:")
            .await
            .unwrap();
        // Pre-users schema: global UNIQUE(name), no owner columns.
        sqlx::query(
            "CREATE TABLE api_keys (api_key TEXT PRIMARY KEY, name TEXT UNIQUE DEFAULT '', \
             is_active INTEGER DEFAULT 1, rate_limit INTEGER DEFAULT 100, \
             service_tier TEXT DEFAULT 'default', monthly_budget REAL, budget_used REAL DEFAULT 0.0, \
             budget_used_mtd REAL DEFAULT 0.0, budget_mtd_month TEXT, deactivated_reason TEXT, \
             budget_history TEXT, tpm_limit INTEGER, cache_ttl TEXT, metadata TEXT, \
             cost_rate REAL DEFAULT 1.0, key_display TEXT DEFAULT '', key_id TEXT, \
             created_at INTEGER NOT NULL, updated_at INTEGER)",
        )
        .execute(&pool)
        .await
        .unwrap();
        sqlx::query(
            "CREATE TABLE usage (id INTEGER PRIMARY KEY AUTOINCREMENT, api_key TEXT NOT NULL, \
             key_id TEXT, timestamp TEXT NOT NULL, request_id TEXT NOT NULL, model TEXT NOT NULL, \
             input_tokens INTEGER DEFAULT 0, output_tokens INTEGER DEFAULT 0, \
             cached_tokens INTEGER DEFAULT 0, cache_write_tokens INTEGER DEFAULT 0, \
             cost REAL DEFAULT 0.0, success INTEGER DEFAULT 1, duration_ms INTEGER, \
             error_message TEXT, provider TEXT, protocol TEXT)",
        )
        .execute(&pool)
        .await
        .unwrap();
        let h1 = "a".repeat(64);
        let h2 = "b".repeat(64);
        sqlx::query(
            "INSERT INTO api_keys (api_key, key_id, name, rate_limit, cost_rate, monthly_budget, \
             budget_used, budget_used_mtd, budget_mtd_month, tpm_limit, cache_ttl, created_at) \
             VALUES (?, 'k1', 'alice', 60, 0.5, 10.0, 30.0, 4.0, '2026-11', 9000, '1h', 5)",
        )
        .bind(&h1)
        .execute(&pool)
        .await
        .unwrap();
        sqlx::query(
            "INSERT INTO api_keys (api_key, key_id, name, rate_limit, monthly_budget, \
             budget_used_mtd, budget_mtd_month, is_active, deactivated_reason, created_at) \
             VALUES (?, 'k2', 'bob', 0, 1.0, 2.0, '2026-10', 0, 'budget_exceeded', 6)",
        )
        .bind(&h2)
        .execute(&pool)
        .await
        .unwrap();
        sqlx::query(
            "INSERT INTO usage (api_key, key_id, timestamp, request_id, model) \
             VALUES (?, 'k1', 't', 'r', 'm')",
        )
        .bind(&h1)
        .execute(&pool)
        .await
        .unwrap();

        let db = SqliteBackend { pool };
        db.initialize(None, SeedMode::Off).await.unwrap();
        db.initialize(None, SeedMode::Off).await.unwrap(); // idempotent

        let users = db.users().list_users().await.unwrap();
        assert_eq!(users.len(), 2);
        let alice = db.users().get_user_by_name("alice").await.unwrap().unwrap();
        assert_eq!(alice.cost_rate, 0.5);
        assert_eq!(alice.monthly_budget, Some(10.0));
        assert_eq!(alice.budget_used, 30.0);
        assert_eq!(alice.budget_used_mtd, 4.0);
        assert_eq!(alice.budget_mtd_month.as_deref(), Some("2026-11"));
        assert_eq!(alice.rate_limit, Some(60));
        assert_eq!(alice.tpm_limit, Some(9000));
        assert_eq!(alice.cache_ttl.as_deref(), Some("1h"));
        let bob = db.users().get_user_by_name("bob").await.unwrap().unwrap();
        assert_eq!(bob.rate_limit, None); // 0 meant "global default"

        let k1 = db.api_keys().get_api_key(&h1).await.unwrap().unwrap();
        assert_eq!(k1.user_id, alice.user_id);
        assert_eq!(k1.monthly_budget, None);
        assert_eq!(k1.rate_limit, 0);
        assert_eq!(k1.tpm_limit, None);
        assert_eq!(k1.cache_ttl, None);
        assert_eq!(k1.budget_used, 30.0); // lifetime stats stay on the key
        let k2 = db.api_keys().get_api_key(&h2).await.unwrap().unwrap();
        assert!(k2.is_active, "budget_exceeded deactivation is lifted");
        assert_eq!(k2.deactivated_reason, None);

        // Usage attributed to the user; backfill marked done.
        let usage = db
            .usage()
            .get_usage_by_api_key("", Some(&alice.user_id), None, None, None)
            .await
            .unwrap();
        assert_eq!(usage.len(), 1);
        let flag = db
            .get_setting(USAGE_USER_BACKFILL_SETTING)
            .await
            .unwrap()
            .unwrap();
        assert_eq!(flag.value, "done");

        // Names are now unique per user, not globally.
        let mut dup = key_record("hash-dup", "alice");
        dup.user_id = bob.user_id.clone();
        db.api_keys().create_api_key(&dup).await.unwrap();
        let mut dup2 = key_record("hash-dup2", "alice");
        dup2.user_id = bob.user_id.clone();
        assert!(db.api_keys().create_api_key(&dup2).await.is_err());
    }

    #[tokio::test]
    async fn assign_unowned_key_is_first_writer_wins() {
        let db = in_memory_db().await;
        db.api_keys()
            .create_api_key(&key_record("hash-x", "x"))
            .await
            .unwrap();
        let mut first = db.api_keys().get_api_key("hash-x").await.unwrap().unwrap();
        first.user_id = "u-1".into();
        assert!(db.api_keys().assign_unowned_key(&first).await.unwrap());
        let mut second = first.clone();
        second.user_id = "u-2".into();
        assert!(!db.api_keys().assign_unowned_key(&second).await.unwrap());
        let stored = db.api_keys().get_api_key("hash-x").await.unwrap().unwrap();
        assert_eq!(stored.user_id, "u-1");
    }

    #[tokio::test]
    async fn user_crud_and_budget() {
        let db = in_memory_db().await;
        let mut u = UserRecord::new("carol", 1);
        u.monthly_budget = Some(5.0);
        u.allowed_models = Some(vec!["claude-*".into()]);
        db.users().create_user(&u).await.unwrap();
        assert!(db
            .users()
            .create_user(&UserRecord::new("carol", 2))
            .await
            .is_err());

        assert!(!db
            .users()
            .increment_user_budget_used(&u.user_id, 2.0)
            .await
            .unwrap());
        assert!(db
            .users()
            .increment_user_budget_used(&u.user_id, 3.0)
            .await
            .unwrap());

        // update_user never overwrites spend counters.
        let mut edit = db.users().get_user(&u.user_id).await.unwrap().unwrap();
        edit.budget_used_mtd = 0.0;
        edit.cost_rate = 2.0;
        db.users().update_user(&edit).await.unwrap();
        let got = db.users().get_user(&u.user_id).await.unwrap().unwrap();
        assert_eq!(got.cost_rate, 2.0);
        assert_eq!(got.budget_used_mtd, 5.0);
        assert_eq!(got.allowed_models, Some(vec!["claude-*".to_string()]));

        db.users()
            .reset_user_monthly_budget(&u.user_id, "2026-12", "2026-11", 5.0)
            .await
            .unwrap();
        let got = db.users().get_user(&u.user_id).await.unwrap().unwrap();
        assert_eq!(got.budget_used_mtd, 0.0);
        assert_eq!(got.budget_mtd_month.as_deref(), Some("2026-12"));
        assert!(got.budget_history.unwrap().contains("2026-11"));

        db.users().delete_user(&u.user_id).await.unwrap();
        assert!(db.users().get_user(&u.user_id).await.unwrap().is_none());
    }

    #[tokio::test]
    async fn budget_exceeded_uses_month_to_date() {
        let db = in_memory_db().await;
        let mut rec = key_record("hash-b", "budget");
        rec.monthly_budget = Some(10.0);
        rec.budget_used = 100.0; // lifetime spend well above the monthly budget
        rec.budget_used_mtd = 0.0;
        db.api_keys().create_api_key(&rec).await.unwrap();
        assert!(!db
            .api_keys()
            .increment_budget_used("hash-b", 1.0)
            .await
            .unwrap());
        assert!(db
            .api_keys()
            .increment_budget_used("hash-b", 9.0)
            .await
            .unwrap());
    }

    #[tokio::test]
    async fn test_reset_monthly_budget() {
        let db = in_memory_db().await;
        let record = ApiKeyRecord {
            key_id: new_key_id(),
            api_key: "sk-test-budget".into(),
            key_display: String::new(),
            name: "test".into(),
            is_active: true,
            rate_limit: 0,
            cost_rate: 1.0,
            monthly_budget: Some(10.0),
            budget_used: 5.0,
            budget_used_mtd: 5.0,
            budget_mtd_month: Some("2026-02".into()),
            deactivated_reason: None,
            budget_history: None,
            tpm_limit: None,
            cache_ttl: None,
            metadata: None,
            user_id: String::new(),
            expires_at: None,
            allowed_models: None,
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
            key_id: new_key_id(),
            api_key: "sk-test-reactivate".into(),
            key_display: String::new(),
            name: "test".into(),
            is_active: false,
            rate_limit: 0,
            cost_rate: 1.0,
            monthly_budget: Some(10.0),
            budget_used: 10.0,
            budget_used_mtd: 10.0,
            budget_mtd_month: Some("2026-02".into()),
            deactivated_reason: Some("budget_exceeded".into()),
            budget_history: None,
            tpm_limit: None,
            cache_ttl: None,
            metadata: None,
            user_id: String::new(),
            expires_at: None,
            allowed_models: None,
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
            key_id: new_key_id(),
            api_key: "sk-test-manual".into(),
            key_display: String::new(),
            name: "test".into(),
            is_active: false,
            rate_limit: 0,
            cost_rate: 1.0,
            monthly_budget: None,
            budget_used: 0.0,
            budget_used_mtd: 0.0,
            budget_mtd_month: None,
            deactivated_reason: Some("manual_deactivation".into()),
            budget_history: None,
            tpm_limit: None,
            cache_ttl: None,
            metadata: None,
            user_id: String::new(),
            expires_at: None,
            allowed_models: None,
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

#[cfg(test)]
mod seed_mode_tests {
    use super::*;
    use crate::database::seed::{self, SeedMode};
    use sqlx::sqlite::SqlitePoolOptions;

    async fn bare_db(seed_mode: SeedMode) -> SqliteBackend {
        let pool = SqlitePoolOptions::new()
            .max_connections(1)
            .connect("sqlite::memory:")
            .await
            .unwrap();
        let backend = SqliteBackend { pool };
        backend.initialize(None, seed_mode).await.unwrap();
        backend
    }

    #[tokio::test]
    async fn off_never_seeds_mappings() {
        let db = bare_db(SeedMode::Off).await;
        assert!(db.model_mapping().list_mappings().await.unwrap().is_empty());
    }

    #[tokio::test]
    async fn empty_seeds_first_run_but_respects_deletions() {
        let db = bare_db(SeedMode::Empty).await;
        let seeded = db.model_mapping().list_mappings().await.unwrap();
        assert_eq!(seeded.len(), seed::default_model_mappings().len());

        // Delete one default mapping, re-run seeding → it must NOT come back.
        let victim = &seeded[0];
        db.model_mapping()
            .delete_mapping(&victim.source_model_id, &victim.provider)
            .await
            .unwrap();
        db.seed_defaults(SeedMode::Empty).await.unwrap();
        assert!(db
            .model_mapping()
            .get_mapping(&victim.source_model_id, &victim.provider)
            .await
            .unwrap()
            .is_none());

        // Legacy mode resurrects it.
        db.seed_defaults(SeedMode::Missing).await.unwrap();
        assert!(db
            .model_mapping()
            .get_mapping(&victim.source_model_id, &victim.provider)
            .await
            .unwrap()
            .is_some());
    }

    #[tokio::test]
    async fn settings_are_seeded_regardless_of_mode() {
        let db = bare_db(SeedMode::Off).await;
        assert!(db
            .system_settings()
            .get_setting("rate_limit")
            .await
            .unwrap()
            .is_some());
    }
}
