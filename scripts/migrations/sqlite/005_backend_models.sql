-- Migration 005: Add models column to backends (per-backend model filter)
--
-- Stores a JSON string array of wildcard/negation patterns, e.g.
-- ["*", "!openai.*"]. NULL / empty means the backend serves all models
-- (legacy behavior). Matched against resolved target model ids.
--
-- Idempotent caveat: SQLite has no IF NOT EXISTS for ADD COLUMN; the app's
-- auto-migration ignores the duplicate-column error, and re-running this
-- script on an already-migrated DB fails harmlessly.
--
-- Usage:
--   sqlite3 ./data/gateway.db < scripts/migrations/sqlite/005_backend_models.sql

ALTER TABLE backends ADD COLUMN models TEXT;
