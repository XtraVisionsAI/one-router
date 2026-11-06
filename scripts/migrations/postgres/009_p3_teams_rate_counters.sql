-- Migration 009: teams, concurrency caps, shared rate-limit counters.
--
-- Idempotent: safe to run multiple times.
--
-- Usage:
--   psql "$DATABASE_URL" -f scripts/migrations/postgres/009_p3_teams_rate_counters.sql

CREATE TABLE IF NOT EXISTS teams (
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
);

CREATE TABLE IF NOT EXISTS rate_counters (
    subject TEXT NOT NULL,
    window_start BIGINT NOT NULL,
    requests BIGINT NOT NULL DEFAULT 0,
    tokens BIGINT NOT NULL DEFAULT 0,
    expires_at BIGINT NOT NULL,
    PRIMARY KEY (subject, window_start)
);

ALTER TABLE users ADD COLUMN IF NOT EXISTS team_id TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS max_concurrency INTEGER;
ALTER TABLE api_keys ADD COLUMN IF NOT EXISTS max_concurrency INTEGER;
ALTER TABLE usage ADD COLUMN IF NOT EXISTS team_id TEXT;
CREATE INDEX IF NOT EXISTS idx_users_team ON users(team_id);
CREATE INDEX IF NOT EXISTS idx_usage_team_ts ON usage(team_id, timestamp);
