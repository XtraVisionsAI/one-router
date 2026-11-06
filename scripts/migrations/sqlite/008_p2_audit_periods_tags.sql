-- Migration 008: audit log, budget periods/alerts, IP allowlists, usage tags,
-- key rotation and last-used tracking.
--
-- Idempotent caveat: SQLite has no IF NOT EXISTS for ADD COLUMN; re-running
-- fails harmlessly at the ALTERs (the CREATE ... IF NOT EXISTS statements are
-- idempotent). Requires 007 (users table).
--
-- Usage:
--   sqlite3 ./data/gateway.db < scripts/migrations/sqlite/008_p2_audit_periods_tags.sql

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

ALTER TABLE api_keys ADD COLUMN allowed_cidrs TEXT;
ALTER TABLE api_keys ADD COLUMN budget_period TEXT;
ALTER TABLE api_keys ADD COLUMN budget_alerts_sent TEXT;
ALTER TABLE api_keys ADD COLUMN default_tags TEXT;
ALTER TABLE api_keys ADD COLUMN last_used_at INTEGER;
ALTER TABLE api_keys ADD COLUMN rotated_to TEXT;
ALTER TABLE users ADD COLUMN allowed_cidrs TEXT;
ALTER TABLE users ADD COLUMN budget_period TEXT;
ALTER TABLE users ADD COLUMN budget_alerts_sent TEXT;
ALTER TABLE users ADD COLUMN default_tags TEXT;
ALTER TABLE usage ADD COLUMN tags TEXT;
