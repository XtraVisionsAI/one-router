-- Migration 007: Users — keys gain an owning user; names unique per user
--
-- Schema only. The data migration (every ownerless key becomes one user that
-- takes over its budget, cost rate, RPM/TPM and cache TTL; usage rows get
-- user_id) runs automatically on gateway startup.
--
-- SQLite cannot drop the legacy inline UNIQUE(name) constraint, so api_keys is
-- rebuilt inside a transaction. A guard aborts the script (non-zero exit,
-- nothing changed) when api_keys already has `user_id` — re-running on a
-- migrated database must not rebuild it again. The gateway performs the same
-- rebuild itself on startup, so this script is optional.
--
-- Usage:
--   sqlite3 ./data/gateway.db < scripts/migrations/sqlite/007_users.sql

.bail on

-- Guard: fails with "CHECK constraint failed" if 007 was already applied.
CREATE TEMP TABLE m007_guard (already_migrated INTEGER CHECK (already_migrated = 0));
INSERT INTO m007_guard
    SELECT COUNT(*) FROM pragma_table_info('api_keys') WHERE name = 'user_id';

BEGIN;

CREATE TABLE api_keys_new (
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
);

INSERT INTO api_keys_new
    (api_key, key_id, key_display, name, is_active, rate_limit, service_tier, cost_rate,
     monthly_budget, budget_used, budget_used_mtd, budget_mtd_month, deactivated_reason,
     budget_history, tpm_limit, cache_ttl, metadata, created_at, updated_at)
SELECT api_key, key_id, key_display, name, is_active, rate_limit, service_tier, cost_rate,
       monthly_budget, budget_used, budget_used_mtd, budget_mtd_month, deactivated_reason,
       budget_history, tpm_limit, cache_ttl, metadata, created_at, updated_at
FROM api_keys;

DROP TABLE api_keys;
ALTER TABLE api_keys_new RENAME TO api_keys;

CREATE UNIQUE INDEX IF NOT EXISTS idx_api_keys_key_id ON api_keys(key_id);
CREATE UNIQUE INDEX IF NOT EXISTS idx_api_keys_user_name ON api_keys(user_id, name);
CREATE INDEX IF NOT EXISTS idx_api_keys_user ON api_keys(user_id);

CREATE TABLE IF NOT EXISTS users (
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
);

COMMIT;

ALTER TABLE usage ADD COLUMN user_id TEXT;
CREATE INDEX IF NOT EXISTS idx_usage_user_ts ON usage(user_id, timestamp);
