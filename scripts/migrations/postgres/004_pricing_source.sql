-- Migration 004: Add pricing_source column to model_mappings
--
-- Marks where each mapping's price came from:
--   'litellm' (default) — auto-synced from the LiteLLM price table, overwritten
--                         on each sync run.
--   'manual'            — pinned; the pricing sync never touches this row.
--
-- Idempotent: safe to re-run.

ALTER TABLE model_mappings ADD COLUMN IF NOT EXISTS pricing_source TEXT DEFAULT 'litellm';

-- Backfill any pre-existing NULLs (older rows) to the default.
UPDATE model_mappings SET pricing_source = 'litellm' WHERE pricing_source IS NULL;
