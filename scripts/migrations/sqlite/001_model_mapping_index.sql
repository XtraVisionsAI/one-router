-- Migration 001: Add index for wildcard model mapping lookups
--
-- Accelerates LIKE queries on source_model_id used by wildcard matching
-- in ModelMappingService.
--
-- Idempotent: safe to run multiple times (IF NOT EXISTS).
--
-- Usage:
--   sqlite3 ./data/gateway.db < scripts/migrations/sqlite/001_model_mapping_index.sql

CREATE INDEX IF NOT EXISTS idx_model_mappings_source
    ON model_mappings(source_model_id);
