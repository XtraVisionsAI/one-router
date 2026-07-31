-- Migration 005: Add models column to backends (per-backend model filter)
--
-- Stores a JSON string array of wildcard/negation patterns, e.g.
-- ["*", "!openai.*"]. NULL / empty means the backend serves all models
-- (legacy behavior). Matched against resolved target model ids.
--
-- Idempotent: safe to run multiple times (IF NOT EXISTS).
--
-- Usage:
--   psql "$DATABASE_URL" -f scripts/migrations/postgres/005_backend_models.sql

ALTER TABLE backends ADD COLUMN IF NOT EXISTS models TEXT;
