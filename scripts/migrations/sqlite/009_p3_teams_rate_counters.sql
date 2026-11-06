-- Migration 009: teams, concurrency caps, shared rate-limit counters.
--
-- Idempotent caveat: SQLite has no IF NOT EXISTS for ADD COLUMN; re-running
-- fails harmlessly at the ALTERs. Requires 007 (users).
--
-- Usage:
--   sqlite3 ./data/gateway.db < scripts/migrations/sqlite/009_p3_teams_rate_counters.sql

CREATE TABLE IF NOT EXISTS teams (
    team_id TEXT PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    is_active INTEGER DEFAULT 1,
    cost_rate REAL DEFAULT 1.0,
    monthly_budget REAL,
    budget_used REAL DEFAULT 0.0,
    budget_used_mtd REAL DEFAULT 0.0,
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
    created_at INTEGER NOT NULL,
    updated_at INTEGER
);

CREATE TABLE IF NOT EXISTS rate_counters (
    subject TEXT NOT NULL,
    window_start INTEGER NOT NULL,
    requests INTEGER NOT NULL DEFAULT 0,
    tokens INTEGER NOT NULL DEFAULT 0,
    expires_at INTEGER NOT NULL,
    PRIMARY KEY (subject, window_start)
);

ALTER TABLE users ADD COLUMN team_id TEXT;
ALTER TABLE users ADD COLUMN max_concurrency INTEGER;
ALTER TABLE api_keys ADD COLUMN max_concurrency INTEGER;
ALTER TABLE usage ADD COLUMN team_id TEXT;
CREATE INDEX IF NOT EXISTS idx_users_team ON users(team_id);
CREATE INDEX IF NOT EXISTS idx_usage_team_ts ON usage(team_id, timestamp);
