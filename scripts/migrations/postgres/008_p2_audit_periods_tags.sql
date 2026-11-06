-- Migration 008: audit log, budget periods/alerts, IP allowlists, usage tags,
-- key rotation and last-used tracking.
--
-- Idempotent: safe to run multiple times.
--
-- Usage:
--   psql "$DATABASE_URL" -f scripts/migrations/postgres/008_p2_audit_periods_tags.sql

ALTER TABLE api_keys ADD COLUMN IF NOT EXISTS allowed_cidrs TEXT;
ALTER TABLE api_keys ADD COLUMN IF NOT EXISTS budget_period TEXT;
ALTER TABLE api_keys ADD COLUMN IF NOT EXISTS budget_alerts_sent TEXT;
ALTER TABLE api_keys ADD COLUMN IF NOT EXISTS default_tags TEXT;
ALTER TABLE api_keys ADD COLUMN IF NOT EXISTS last_used_at BIGINT;
ALTER TABLE api_keys ADD COLUMN IF NOT EXISTS rotated_to TEXT;

ALTER TABLE users ADD COLUMN IF NOT EXISTS allowed_cidrs TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS budget_period TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS budget_alerts_sent TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS default_tags TEXT;

ALTER TABLE usage ADD COLUMN IF NOT EXISTS tags TEXT;

CREATE TABLE IF NOT EXISTS audit_logs (
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
);
CREATE INDEX IF NOT EXISTS idx_audit_ts ON audit_logs(timestamp);
CREATE INDEX IF NOT EXISTS idx_audit_target ON audit_logs(target_type, target_id, timestamp);
