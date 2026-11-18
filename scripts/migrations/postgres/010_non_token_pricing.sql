-- Migration 010: Non-token prices on model_mappings
--
-- USD amounts (not per-1M tokens), charged on top of any token cost:
--   price_per_request     — every call to the mapping
--   price_per_image       — each image returned by /v1/images/generations
--   price_per_search_unit — each rerank search unit (one query over up to
--                           100 documents) on /v1/rerank
-- 0 = not priced.
--
-- Idempotent: safe to re-run.

ALTER TABLE model_mappings ADD COLUMN IF NOT EXISTS price_per_request DOUBLE PRECISION DEFAULT 0.0;
ALTER TABLE model_mappings ADD COLUMN IF NOT EXISTS price_per_image DOUBLE PRECISION DEFAULT 0.0;
ALTER TABLE model_mappings ADD COLUMN IF NOT EXISTS price_per_search_unit DOUBLE PRECISION DEFAULT 0.0;
