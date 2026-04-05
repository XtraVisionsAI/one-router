-- Migration 001: Add text_pattern_ops index for wildcard model mapping lookups
--
-- This index accelerates LIKE queries on source_model_id (e.g., "gpt-*", "claude-*")
-- used by ModelMappingService::list_wildcard_mappings().
--
-- Uses CONCURRENTLY to avoid locking the table during index creation on production
-- databases. Note: CONCURRENTLY cannot run inside a transaction block.
--
-- Idempotent: safe to run multiple times (IF NOT EXISTS).
--
-- Usage:
--   psql "$DATABASE_URL" -f scripts/migrations/postgres/001_model_mapping_pattern_index.sql

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_model_mappings_source
    ON model_mappings (source_model_id text_pattern_ops);
