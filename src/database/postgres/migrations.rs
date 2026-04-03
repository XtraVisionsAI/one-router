//! PostgreSQL DDL migrations
//!
//! Creates all five tables using PostgreSQL syntax.

use anyhow::Result;
use sqlx::PgPool;

/// Run DDL statements to create all tables (idempotent via IF NOT EXISTS).
pub async fn run_ddl(pool: &PgPool) -> Result<()> {
    // --- api_keys ---
    sqlx::query(
        "CREATE TABLE IF NOT EXISTS api_keys (
            api_key TEXT PRIMARY KEY,
            name TEXT UNIQUE DEFAULT '',
            is_active BOOLEAN DEFAULT TRUE,
            rate_limit INTEGER DEFAULT 100,
            service_tier TEXT DEFAULT 'default',
            monthly_budget DOUBLE PRECISION,
            budget_used DOUBLE PRECISION DEFAULT 0.0,
            budget_used_mtd DOUBLE PRECISION DEFAULT 0.0,
            budget_mtd_month TEXT,
            deactivated_reason TEXT,
            tpm_limit INTEGER,
            cache_ttl TEXT,
            metadata TEXT,
            created_at BIGINT NOT NULL,
            updated_at BIGINT
        )",
    )
    .execute(pool)
    .await?;

    // --- usage ---
    sqlx::query(
        "CREATE TABLE IF NOT EXISTS usage (
            id BIGSERIAL PRIMARY KEY,
            api_key TEXT NOT NULL,
            timestamp TEXT NOT NULL,
            request_id TEXT NOT NULL,
            model TEXT NOT NULL,
            input_tokens BIGINT DEFAULT 0,
            output_tokens BIGINT DEFAULT 0,
            cached_tokens BIGINT DEFAULT 0,
            cache_write_tokens BIGINT DEFAULT 0,
            cost DOUBLE PRECISION DEFAULT 0.0,
            success BOOLEAN DEFAULT TRUE,
            duration_ms BIGINT,
            error_message TEXT
        )",
    )
    .execute(pool)
    .await?;

    sqlx::query("CREATE INDEX IF NOT EXISTS idx_usage_api_key_ts ON usage(api_key, timestamp)")
        .execute(pool)
        .await?;

    // --- model_mappings ---
    sqlx::query(
        "CREATE TABLE IF NOT EXISTS model_mappings (
            source_model_id TEXT NOT NULL,
            target_model_id TEXT NOT NULL,
            provider TEXT NOT NULL DEFAULT '',
            display_name TEXT DEFAULT '',
            input_price DOUBLE PRECISION DEFAULT 0.0,
            output_price DOUBLE PRECISION DEFAULT 0.0,
            cache_read_price DOUBLE PRECISION DEFAULT 0.0,
            cache_write_price DOUBLE PRECISION DEFAULT 0.0,
            priority INTEGER DEFAULT 0,
            status TEXT DEFAULT 'active',
            created_at BIGINT NOT NULL,
            updated_at BIGINT,
            PRIMARY KEY (source_model_id, provider)
        )",
    )
    .execute(pool)
    .await?;

    // Migration: add priority column and update PK if upgrading from old schema
    migrate_model_mappings(pool).await?;

    // Migration: add budget_history column if not already present
    sqlx::query("ALTER TABLE api_keys ADD COLUMN IF NOT EXISTS budget_history TEXT")
        .execute(pool)
        .await?;

    // Migration: add cache_ttl column to api_keys if upgrading from older schema
    sqlx::query("ALTER TABLE api_keys ADD COLUMN IF NOT EXISTS cache_ttl TEXT")
        .execute(pool)
        .await
        .ok(); // ignore error if column already exists

    // Migration: add unique index on api_keys.name if upgrading from older schema
    sqlx::query("CREATE UNIQUE INDEX IF NOT EXISTS idx_api_keys_name ON api_keys(name)")
        .execute(pool)
        .await?;

    // --- backends ---
    sqlx::query(
        "CREATE TABLE IF NOT EXISTS backends (
            name TEXT PRIMARY KEY,
            backend_type TEXT NOT NULL,
            config TEXT NOT NULL,
            enabled BOOLEAN DEFAULT TRUE,
            priority INTEGER DEFAULT 0,
            health_status TEXT DEFAULT 'unknown',
            last_health_check BIGINT,
            created_at BIGINT NOT NULL,
            updated_at BIGINT
        )",
    )
    .execute(pool)
    .await?;

    // --- feature_flags ---
    sqlx::query(
        "CREATE TABLE IF NOT EXISTS feature_flags (
            name TEXT PRIMARY KEY,
            enabled BOOLEAN DEFAULT FALSE,
            description TEXT DEFAULT '',
            created_at BIGINT NOT NULL,
            updated_at BIGINT
        )",
    )
    .execute(pool)
    .await?;

    // --- system_settings ---
    sqlx::query(
        "CREATE TABLE IF NOT EXISTS system_settings (
            key TEXT PRIMARY KEY,
            value TEXT NOT NULL DEFAULT '',
            description TEXT NOT NULL DEFAULT '',
            updated_at BIGINT
        )",
    )
    .execute(pool)
    .await?;

    Ok(())
}

/// Migrate old model_mappings table to new schema with composite PK + priority.
async fn migrate_model_mappings(pool: &PgPool) -> Result<()> {
    use sqlx::Row;

    // Check if priority column exists
    let row = sqlx::query(
        "SELECT COUNT(*) as cnt FROM information_schema.columns \
         WHERE table_name = 'model_mappings' AND column_name = 'priority'",
    )
    .fetch_one(pool)
    .await?;

    let has_priority: i64 = row.get("cnt");

    if has_priority == 0 {
        tracing::info!("Migrating model_mappings table to new schema (composite PK + priority)");

        // Add priority column
        sqlx::query("ALTER TABLE model_mappings ADD COLUMN priority INTEGER DEFAULT 0")
            .execute(pool)
            .await?;

        // Update PK: drop old single-column PK and add composite PK
        // First check if old PK constraint exists
        let _ =
            sqlx::query("ALTER TABLE model_mappings DROP CONSTRAINT IF EXISTS model_mappings_pkey")
                .execute(pool)
                .await;

        // Make provider NOT NULL with a default for existing rows
        sqlx::query("UPDATE model_mappings SET provider = '' WHERE provider IS NULL")
            .execute(pool)
            .await?;

        sqlx::query("ALTER TABLE model_mappings ALTER COLUMN provider SET NOT NULL")
            .execute(pool)
            .await?;

        // Add composite PK
        sqlx::query("ALTER TABLE model_mappings ADD PRIMARY KEY (source_model_id, provider)")
            .execute(pool)
            .await?;

        tracing::info!("model_mappings migration completed");
    }

    Ok(())
}
