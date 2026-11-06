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
            name TEXT DEFAULT '',
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

    // Migration: add provider and protocol columns for usage analytics dimensions
    sqlx::query("ALTER TABLE usage ADD COLUMN IF NOT EXISTS provider TEXT")
        .execute(pool)
        .await?;
    sqlx::query("ALTER TABLE usage ADD COLUMN IF NOT EXISTS protocol TEXT")
        .execute(pool)
        .await?;

    sqlx::query("CREATE INDEX IF NOT EXISTS idx_usage_provider ON usage(provider)")
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
            capabilities TEXT,
            pricing_source TEXT DEFAULT 'litellm',
            PRIMARY KEY (source_model_id, provider)
        )",
    )
    .execute(pool)
    .await?;

    // Migration: add priority column and update PK if upgrading from old schema
    migrate_model_mappings(pool).await?;

    // Migration: add capabilities column if not already present
    sqlx::query("ALTER TABLE model_mappings ADD COLUMN IF NOT EXISTS capabilities TEXT")
        .execute(pool)
        .await?;

    // Migration: add pricing_source column if not already present
    sqlx::query(
        "ALTER TABLE model_mappings ADD COLUMN IF NOT EXISTS pricing_source TEXT DEFAULT 'litellm'",
    )
    .execute(pool)
    .await?;

    // Index for efficient wildcard (prefix) matching on source_model_id
    sqlx::query(
        "CREATE INDEX IF NOT EXISTS idx_model_mappings_source ON model_mappings (source_model_id text_pattern_ops)",
    )
    .execute(pool)
    .await?;

    // Migration: add budget_history column if not already present
    sqlx::query("ALTER TABLE api_keys ADD COLUMN IF NOT EXISTS budget_history TEXT")
        .execute(pool)
        .await?;

    // Migration: add cache_ttl column to api_keys if upgrading from older schema
    sqlx::query("ALTER TABLE api_keys ADD COLUMN IF NOT EXISTS cache_ttl TEXT")
        .execute(pool)
        .await
        .ok(); // ignore error if column already exists

    // Migration: add cost_rate column, backfill from service_tier
    sqlx::query(
        "ALTER TABLE api_keys ADD COLUMN IF NOT EXISTS cost_rate DOUBLE PRECISION DEFAULT 1.0",
    )
    .execute(pool)
    .await?;
    sqlx::query(
        "UPDATE api_keys SET cost_rate = CASE service_tier \
         WHEN 'flex' THEN 0.5 WHEN 'priority' THEN 1.75 WHEN 'master' THEN 0.0 \
         ELSE 1.0 END WHERE cost_rate = 1.0 AND service_tier != 'default'",
    )
    .execute(pool)
    .await
    .ok();

    // Migration: add key_display column for masked display form
    sqlx::query("ALTER TABLE api_keys ADD COLUMN IF NOT EXISTS key_display TEXT DEFAULT ''")
        .execute(pool)
        .await?;

    // Migration: stable key_id (UUID) on api_keys + usage attribution.
    // gen_random_uuid() is built in since PostgreSQL 13.
    sqlx::query("ALTER TABLE api_keys ADD COLUMN IF NOT EXISTS key_id TEXT")
        .execute(pool)
        .await?;
    sqlx::query(
        "UPDATE api_keys SET key_id = gen_random_uuid()::text WHERE key_id IS NULL OR key_id = ''",
    )
    .execute(pool)
    .await?;
    sqlx::query("CREATE UNIQUE INDEX IF NOT EXISTS idx_api_keys_key_id ON api_keys(key_id)")
        .execute(pool)
        .await?;
    usage_key_id_column(pool).await?;

    // Migration: users — keys gain an owner; names become unique per user.
    sqlx::query(
        "CREATE TABLE IF NOT EXISTS users (
            user_id TEXT PRIMARY KEY,
            name TEXT NOT NULL UNIQUE,
            email TEXT,
            is_active BOOLEAN DEFAULT TRUE,
            cost_rate DOUBLE PRECISION DEFAULT 1.0,
            monthly_budget DOUBLE PRECISION,
            budget_used DOUBLE PRECISION DEFAULT 0.0,
            budget_used_mtd DOUBLE PRECISION DEFAULT 0.0,
            budget_mtd_month TEXT,
            budget_history TEXT,
            rate_limit INTEGER,
            tpm_limit INTEGER,
            allowed_models TEXT,
            cache_ttl TEXT,
            metadata TEXT,
            created_at BIGINT NOT NULL,
            updated_at BIGINT
        )",
    )
    .execute(pool)
    .await?;
    for ddl in [
        "ALTER TABLE api_keys ADD COLUMN IF NOT EXISTS user_id TEXT",
        "ALTER TABLE api_keys ADD COLUMN IF NOT EXISTS expires_at BIGINT",
        "ALTER TABLE api_keys ADD COLUMN IF NOT EXISTS allowed_models TEXT",
        // Global name uniqueness → per user: the inline constraint from the old
        // CREATE TABLE and the later migration index.
        "ALTER TABLE api_keys DROP CONSTRAINT IF EXISTS api_keys_name_key",
        "DROP INDEX IF EXISTS idx_api_keys_name",
        "CREATE UNIQUE INDEX IF NOT EXISTS idx_api_keys_user_name ON api_keys(user_id, name)",
        "CREATE INDEX IF NOT EXISTS idx_api_keys_user ON api_keys(user_id)",
        "ALTER TABLE usage ADD COLUMN IF NOT EXISTS user_id TEXT",
        "CREATE INDEX IF NOT EXISTS idx_usage_user_ts ON usage(user_id, timestamp)",
        // P2
        "ALTER TABLE api_keys ADD COLUMN IF NOT EXISTS allowed_cidrs TEXT",
        "ALTER TABLE api_keys ADD COLUMN IF NOT EXISTS budget_period TEXT",
        "ALTER TABLE api_keys ADD COLUMN IF NOT EXISTS budget_alerts_sent TEXT",
        "ALTER TABLE api_keys ADD COLUMN IF NOT EXISTS default_tags TEXT",
        "ALTER TABLE api_keys ADD COLUMN IF NOT EXISTS last_used_at BIGINT",
        "ALTER TABLE api_keys ADD COLUMN IF NOT EXISTS rotated_to TEXT",
        "ALTER TABLE users ADD COLUMN IF NOT EXISTS allowed_cidrs TEXT",
        "ALTER TABLE users ADD COLUMN IF NOT EXISTS budget_period TEXT",
        "ALTER TABLE users ADD COLUMN IF NOT EXISTS budget_alerts_sent TEXT",
        "ALTER TABLE users ADD COLUMN IF NOT EXISTS default_tags TEXT",
        "ALTER TABLE usage ADD COLUMN IF NOT EXISTS tags TEXT",
        "CREATE TABLE IF NOT EXISTS audit_logs (
            id TEXT PRIMARY KEY,
            timestamp TEXT NOT NULL,
            actor TEXT NOT NULL,
            source_ip TEXT,
            user_agent TEXT,
            action TEXT NOT NULL,
            target_type TEXT,
            target_id TEXT,
            before TEXT,
            after TEXT,
            status INTEGER NOT NULL,
            method TEXT NOT NULL,
            path TEXT NOT NULL
        )",
        "CREATE INDEX IF NOT EXISTS idx_audit_ts ON audit_logs(timestamp)",
        "CREATE INDEX IF NOT EXISTS idx_audit_target ON audit_logs(target_type, target_id, timestamp)",
        // P3
        "ALTER TABLE users ADD COLUMN IF NOT EXISTS team_id TEXT",
        "ALTER TABLE users ADD COLUMN IF NOT EXISTS max_concurrency INTEGER",
        "ALTER TABLE api_keys ADD COLUMN IF NOT EXISTS max_concurrency INTEGER",
        "ALTER TABLE usage ADD COLUMN IF NOT EXISTS team_id TEXT",
        "CREATE INDEX IF NOT EXISTS idx_users_team ON users(team_id)",
        "CREATE INDEX IF NOT EXISTS idx_usage_team_ts ON usage(team_id, timestamp)",
        "CREATE TABLE IF NOT EXISTS teams (
            team_id TEXT PRIMARY KEY,
            name TEXT NOT NULL UNIQUE,
            is_active BOOLEAN DEFAULT TRUE,
            cost_rate DOUBLE PRECISION DEFAULT 1.0,
            monthly_budget DOUBLE PRECISION,
            budget_used DOUBLE PRECISION DEFAULT 0.0,
            budget_used_mtd DOUBLE PRECISION DEFAULT 0.0,
            budget_mtd_month TEXT,
            budget_history TEXT,
            budget_period TEXT,
            budget_alerts_sent TEXT,
            rate_limit INTEGER,
            tpm_limit INTEGER,
            max_concurrency INTEGER,
            allowed_models TEXT,
            allowed_cidrs TEXT,
            metadata TEXT,
            created_at BIGINT NOT NULL,
            updated_at BIGINT
        )",
        "CREATE TABLE IF NOT EXISTS rate_counters (
            subject TEXT NOT NULL,
            window_start BIGINT NOT NULL,
            requests BIGINT NOT NULL DEFAULT 0,
            tokens BIGINT NOT NULL DEFAULT 0,
            expires_at BIGINT NOT NULL,
            PRIMARY KEY (subject, window_start)
        )",
    ] {
        sqlx::query(ddl).execute(pool).await?;
    }

    // --- backends ---
    sqlx::query(
        "CREATE TABLE IF NOT EXISTS backends (
            name TEXT PRIMARY KEY,
            backend_type TEXT NOT NULL,
            config TEXT NOT NULL,
            enabled BOOLEAN DEFAULT TRUE,
            priority INTEGER DEFAULT 0,
            weight INTEGER DEFAULT 1,
            strategy TEXT DEFAULT 'round_robin',
            max_failures INTEGER DEFAULT 3,
            retry_after_secs BIGINT DEFAULT 300,
            created_at BIGINT NOT NULL,
            updated_at BIGINT
        )",
    )
    .execute(pool)
    .await?;

    // Migration: add weight column if upgrading
    sqlx::query("ALTER TABLE backends ADD COLUMN IF NOT EXISTS weight INTEGER DEFAULT 1")
        .execute(pool)
        .await?;

    // Migration: add service_tier column to backends
    sqlx::query("ALTER TABLE backends ADD COLUMN IF NOT EXISTS service_tier TEXT")
        .execute(pool)
        .await?;

    // Migration: add strategy/max_failures/retry_after_secs columns if upgrading
    sqlx::query(
        "ALTER TABLE backends ADD COLUMN IF NOT EXISTS strategy TEXT DEFAULT 'round_robin'",
    )
    .execute(pool)
    .await?;
    sqlx::query("ALTER TABLE backends ADD COLUMN IF NOT EXISTS max_failures INTEGER DEFAULT 3")
        .execute(pool)
        .await?;
    sqlx::query(
        "ALTER TABLE backends ADD COLUMN IF NOT EXISTS retry_after_secs BIGINT DEFAULT 300",
    )
    .execute(pool)
    .await?;

    // Migration: add models column (per-backend model filter, JSON string array)
    sqlx::query("ALTER TABLE backends ADD COLUMN IF NOT EXISTS models TEXT")
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
            ui_schema TEXT,
            updated_at BIGINT
        )",
    )
    .execute(pool)
    .await?;

    // Migration: add ui_schema column for existing databases
    sqlx::query("ALTER TABLE system_settings ADD COLUMN IF NOT EXISTS ui_schema TEXT")
        .execute(pool)
        .await?;

    Ok(())
}

/// Add `usage.key_id`; on first add, attribute existing rows through the key
/// hash (only possible while the api_keys row still exists).
async fn usage_key_id_column(pool: &PgPool) -> Result<()> {
    use sqlx::Row;

    let row = sqlx::query(
        "SELECT COUNT(*) as cnt FROM information_schema.columns \
         WHERE table_name = 'usage' AND column_name = 'key_id'",
    )
    .fetch_one(pool)
    .await?;
    let exists: i64 = row.get("cnt");
    if exists > 0 {
        return Ok(());
    }

    sqlx::query("ALTER TABLE usage ADD COLUMN key_id TEXT")
        .execute(pool)
        .await?;
    let res = sqlx::query(
        "UPDATE usage SET key_id = k.key_id FROM api_keys k \
         WHERE usage.api_key = k.api_key AND usage.key_id IS NULL",
    )
    .execute(pool)
    .await?;
    tracing::info!(rows = res.rows_affected(), "Backfilled usage.key_id");
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
