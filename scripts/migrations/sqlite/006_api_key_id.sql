-- Migration 006: Stable key_id on api_keys + usage attribution
--
-- Adds a UUIDv4 `key_id` to every API key (admin API identifier, rate-limit
-- bucket, usage attribution) and a `key_id` column on usage, backfilled
-- through the key hash so history stays attributed after a key is deleted.
-- Usage rows of keys that no longer exist keep key_id = NULL.
--
-- Idempotent caveat: SQLite has no IF NOT EXISTS for ADD COLUMN; the app's
-- auto-migration ignores the duplicate-column error, and re-running this
-- script on an already-migrated DB fails harmlessly at the ALTERs (the
-- UPDATEs only touch NULL rows).
--
-- Usage:
--   sqlite3 ./data/gateway.db < scripts/migrations/sqlite/006_api_key_id.sql

ALTER TABLE api_keys ADD COLUMN key_id TEXT;

UPDATE api_keys SET key_id = lower(
    hex(randomblob(4)) || '-' || hex(randomblob(2)) || '-4' ||
    substr(hex(randomblob(2)), 2) || '-' ||
    substr('89ab', 1 + (abs(random()) % 4), 1) || substr(hex(randomblob(2)), 2) || '-' ||
    hex(randomblob(6)))
WHERE key_id IS NULL OR key_id = '';

CREATE UNIQUE INDEX IF NOT EXISTS idx_api_keys_key_id ON api_keys(key_id);

ALTER TABLE usage ADD COLUMN key_id TEXT;

UPDATE usage SET key_id =
    (SELECT key_id FROM api_keys WHERE api_keys.api_key = usage.api_key)
WHERE key_id IS NULL;
