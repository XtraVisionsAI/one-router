-- Migration 006: Stable key_id on api_keys + usage attribution
--
-- Adds a UUIDv4 `key_id` to every API key (admin API identifier, rate-limit
-- bucket, usage attribution) and a `key_id` column on usage, backfilled
-- through the key hash so history stays attributed after a key is deleted.
-- Usage rows of keys that no longer exist keep key_id = NULL.
--
-- Requires PostgreSQL 13+ (built-in gen_random_uuid()).
-- Idempotent: safe to run multiple times.
--
-- Usage:
--   psql "$DATABASE_URL" -f scripts/migrations/postgres/006_api_key_id.sql

ALTER TABLE api_keys ADD COLUMN IF NOT EXISTS key_id TEXT;

UPDATE api_keys SET key_id = gen_random_uuid()::text
WHERE key_id IS NULL OR key_id = '';

CREATE UNIQUE INDEX IF NOT EXISTS idx_api_keys_key_id ON api_keys(key_id);

ALTER TABLE usage ADD COLUMN IF NOT EXISTS key_id TEXT;

UPDATE usage SET key_id = k.key_id
FROM api_keys k
WHERE usage.api_key = k.api_key AND usage.key_id IS NULL;
