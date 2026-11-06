-- Migration 007: Users — keys gain an owning user; names unique per user
--
-- Schema only. The data migration (every ownerless key becomes one user that
-- takes over its budget, cost rate, RPM/TPM and cache TTL; usage rows get
-- user_id) runs automatically on gateway startup — it needs generated ids and
-- a multi-instance-safe conditional write, which the application performs.
--
-- Idempotent: safe to run multiple times.
--
-- Usage:
--   psql "$DATABASE_URL" -f scripts/migrations/postgres/007_users.sql

CREATE TABLE IF NOT EXISTS users (
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
);

ALTER TABLE api_keys ADD COLUMN IF NOT EXISTS user_id TEXT;
ALTER TABLE api_keys ADD COLUMN IF NOT EXISTS expires_at BIGINT;
ALTER TABLE api_keys ADD COLUMN IF NOT EXISTS allowed_models TEXT;

-- Global name uniqueness → per user
ALTER TABLE api_keys DROP CONSTRAINT IF EXISTS api_keys_name_key;
DROP INDEX IF EXISTS idx_api_keys_name;
CREATE UNIQUE INDEX IF NOT EXISTS idx_api_keys_user_name ON api_keys(user_id, name);
CREATE INDEX IF NOT EXISTS idx_api_keys_user ON api_keys(user_id);

ALTER TABLE usage ADD COLUMN IF NOT EXISTS user_id TEXT;
CREATE INDEX IF NOT EXISTS idx_usage_user_ts ON usage(user_id, timestamp);
