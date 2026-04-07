-- Migration 003: Backfill model pricing (per million tokens, USD)
--
-- Populates input_price, output_price, cache_write_price, cache_read_price
-- for all default model mappings. Prices sourced from Anthropic / Google /
-- AWS Bedrock published rates as of April 2026.
--
-- Idempotent: UPDATE statements are safe to re-run.

-- ── Claude 3.5 Sonnet (Bedrock Extended Access) ────────────────────────────
UPDATE model_mappings SET
    input_price = 6.0, output_price = 30.0,
    cache_write_price = 7.50, cache_read_price = 0.60
WHERE source_model_id = 'claude-3-5-sonnet-20241022' AND provider = 'bedrock';

UPDATE model_mappings SET
    input_price = 6.0, output_price = 30.0,
    cache_write_price = 7.50, cache_read_price = 0.60
WHERE source_model_id = 'claude-3-5-sonnet-latest' AND provider = 'bedrock';

-- ── Claude 3 Sonnet ────────────────────────────────────────────────────────
UPDATE model_mappings SET
    input_price = 3.0, output_price = 15.0,
    cache_write_price = 3.75, cache_read_price = 0.30
WHERE source_model_id = 'claude-3-sonnet-20240229' AND provider = 'bedrock';

-- ── Claude Sonnet 4 ────────────────────────────────────────────────────────
UPDATE model_mappings SET
    input_price = 3.0, output_price = 15.0,
    cache_write_price = 3.75, cache_read_price = 0.30
WHERE source_model_id = 'claude-sonnet-4-20250514' AND provider = 'bedrock';

UPDATE model_mappings SET
    input_price = 3.0, output_price = 15.0,
    cache_write_price = 3.75, cache_read_price = 0.30
WHERE source_model_id = 'claude-sonnet-4' AND provider = 'bedrock';

-- ── Claude 3.5 Haiku ───────────────────────────────────────────────────────
UPDATE model_mappings SET
    input_price = 0.80, output_price = 4.0,
    cache_write_price = 1.0, cache_read_price = 0.08
WHERE source_model_id = 'claude-3-5-haiku-20241022' AND provider = 'bedrock';

-- ── Claude 3 Haiku ─────────────────────────────────────────────────────────
UPDATE model_mappings SET
    input_price = 0.25, output_price = 1.25,
    cache_write_price = 0.30, cache_read_price = 0.03
WHERE source_model_id = 'claude-3-haiku-20240307' AND provider = 'bedrock';

-- ── Claude 3 Opus ──────────────────────────────────────────────────────────
UPDATE model_mappings SET
    input_price = 15.0, output_price = 75.0,
    cache_write_price = 18.75, cache_read_price = 1.50
WHERE source_model_id = 'claude-3-opus-20240229' AND provider = 'bedrock';

-- ── Claude Opus 4.5 ────────────────────────────────────────────────────────
UPDATE model_mappings SET
    input_price = 5.0, output_price = 25.0,
    cache_write_price = 6.25, cache_read_price = 0.50
WHERE source_model_id = 'claude-opus-4-5-20251101' AND provider = 'bedrock';

UPDATE model_mappings SET
    input_price = 5.0, output_price = 25.0,
    cache_write_price = 6.25, cache_read_price = 0.50
WHERE source_model_id = 'claude-opus-4-5' AND provider = 'bedrock';

-- ── Claude Sonnet 4.6 ──────────────────────────────────────────────────────
UPDATE model_mappings SET
    input_price = 3.0, output_price = 15.0,
    cache_write_price = 3.75, cache_read_price = 0.30
WHERE source_model_id = 'claude-sonnet-4-6-20260313' AND provider = 'bedrock';

UPDATE model_mappings SET
    input_price = 3.0, output_price = 15.0,
    cache_write_price = 3.75, cache_read_price = 0.30
WHERE source_model_id = 'claude-sonnet-4-6' AND provider = 'bedrock';

-- ── Claude Opus 4.6 ────────────────────────────────────────────────────────
UPDATE model_mappings SET
    input_price = 5.0, output_price = 25.0,
    cache_write_price = 6.25, cache_read_price = 0.50
WHERE source_model_id = 'claude-opus-4-6-20260313' AND provider = 'bedrock';

UPDATE model_mappings SET
    input_price = 5.0, output_price = 25.0,
    cache_write_price = 6.25, cache_read_price = 0.50
WHERE source_model_id = 'claude-opus-4-6' AND provider = 'bedrock';

-- ── Claude Haiku 4.5 ───────────────────────────────────────────────────────
UPDATE model_mappings SET
    input_price = 1.0, output_price = 5.0,
    cache_write_price = 1.25, cache_read_price = 0.10
WHERE source_model_id = 'claude-haiku-4-5-20251001' AND provider = 'bedrock';

UPDATE model_mappings SET
    input_price = 1.0, output_price = 5.0,
    cache_write_price = 1.25, cache_read_price = 0.10
WHERE source_model_id = 'claude-haiku-4-5' AND provider = 'bedrock';

-- ── Claude -latest aliases ─────────────────────────────────────────────────
UPDATE model_mappings SET
    input_price = 3.0, output_price = 15.0,
    cache_write_price = 3.75, cache_read_price = 0.30
WHERE source_model_id = 'claude-sonnet-4-latest' AND provider = 'bedrock';

UPDATE model_mappings SET
    input_price = 5.0, output_price = 25.0,
    cache_write_price = 6.25, cache_read_price = 0.50
WHERE source_model_id = 'claude-opus-4-latest' AND provider = 'bedrock';

UPDATE model_mappings SET
    input_price = 1.0, output_price = 5.0,
    cache_write_price = 1.25, cache_read_price = 0.10
WHERE source_model_id = 'claude-haiku-4-latest' AND provider = 'bedrock';

UPDATE model_mappings SET
    input_price = 0.80, output_price = 4.0,
    cache_write_price = 1.0, cache_read_price = 0.08
WHERE source_model_id = 'claude-3-5-haiku-latest' AND provider = 'bedrock';

UPDATE model_mappings SET
    input_price = 15.0, output_price = 75.0,
    cache_write_price = 18.75, cache_read_price = 1.50
WHERE source_model_id = 'claude-3-opus-latest' AND provider = 'bedrock';

-- ── Gemini models ──────────────────────────────────────────────────────────
UPDATE model_mappings SET
    input_price = 0.30, output_price = 2.50,
    cache_write_price = 0.0, cache_read_price = 0.03
WHERE source_model_id = 'gemini-2.5-flash' AND provider = 'gemini';

UPDATE model_mappings SET
    input_price = 1.25, output_price = 10.0,
    cache_write_price = 0.0, cache_read_price = 0.125
WHERE source_model_id = 'gemini-2.5-pro' AND provider = 'gemini';

UPDATE model_mappings SET
    input_price = 0.10, output_price = 0.40,
    cache_write_price = 0.0, cache_read_price = 0.025
WHERE source_model_id = 'gemini-2.0-flash' AND provider = 'gemini';

UPDATE model_mappings SET
    input_price = 0.075, output_price = 0.30,
    cache_write_price = 0.0, cache_read_price = 0.0
WHERE source_model_id = 'gemini-2.0-flash-lite' AND provider = 'gemini';

UPDATE model_mappings SET
    input_price = 1.25, output_price = 5.0,
    cache_write_price = 0.0, cache_read_price = 0.3125
WHERE source_model_id = 'gemini-1.5-pro' AND provider = 'gemini';

UPDATE model_mappings SET
    input_price = 0.075, output_price = 0.30,
    cache_write_price = 0.0, cache_read_price = 0.01875
WHERE source_model_id = 'gemini-1.5-flash' AND provider = 'gemini';

-- ── GPT → Sonnet 4.6 mappings ──────────────────────────────────────────────
UPDATE model_mappings SET
    input_price = 3.0, output_price = 15.0,
    cache_write_price = 3.75, cache_read_price = 0.30
WHERE source_model_id IN (
    'gpt-4o', 'gpt-4o-2024-05-13', 'gpt-4o-2024-08-06',
    'gpt-4', 'gpt-4-turbo', 'gpt-4-turbo-preview', 'o1-mini'
) AND provider = 'bedrock';

-- ── GPT → Haiku 4.5 mappings ───────────────────────────────────────────────
UPDATE model_mappings SET
    input_price = 1.0, output_price = 5.0,
    cache_write_price = 1.25, cache_read_price = 0.10
WHERE source_model_id IN (
    'gpt-4o-mini', 'gpt-4o-mini-2024-07-18',
    'gpt-3.5-turbo', 'gpt-3.5-turbo-16k'
) AND provider = 'bedrock';

-- ── O1 → Opus 4.6 mappings ─────────────────────────────────────────────────
UPDATE model_mappings SET
    input_price = 5.0, output_price = 25.0,
    cache_write_price = 6.25, cache_read_price = 0.50
WHERE source_model_id IN ('o1', 'o1-preview') AND provider = 'bedrock';

-- ── Embedding models (input-only pricing) ───────────────────────────────────
UPDATE model_mappings SET input_price = 0.10
WHERE source_model_id = 'cohere.embed-english-v3' AND provider = 'bedrock';

UPDATE model_mappings SET input_price = 0.10
WHERE source_model_id = 'cohere.embed-multilingual-v3' AND provider = 'bedrock';

UPDATE model_mappings SET input_price = 0.02
WHERE source_model_id = 'amazon.titan-embed-text-v2:0' AND provider = 'bedrock';

UPDATE model_mappings SET input_price = 0.10
WHERE source_model_id = 'amazon.titan-embed-text-v1' AND provider = 'bedrock';

UPDATE model_mappings SET input_price = 0.02
WHERE source_model_id IN (
    'text-embedding-3-small', 'text-embedding-3-large', 'text-embedding-ada-002'
) AND provider = 'bedrock';

-- Rerank models: per-query pricing ($2/1K queries), not per-token — left at 0.

-- ── Wildcard catch-all models ───────────────────────────────────────────────
UPDATE model_mappings SET
    input_price = 3.0, output_price = 15.0,
    cache_write_price = 3.75, cache_read_price = 0.30
WHERE source_model_id = 'claude-*' AND provider = 'bedrock';

UPDATE model_mappings SET
    input_price = 0.30, output_price = 2.50,
    cache_write_price = 0.0, cache_read_price = 0.03
WHERE source_model_id = 'gemini-*' AND provider = 'gemini';

UPDATE model_mappings SET
    input_price = 3.0, output_price = 15.0,
    cache_write_price = 3.75, cache_read_price = 0.30
WHERE source_model_id = 'gpt-*' AND provider = 'bedrock';

UPDATE model_mappings SET
    input_price = 5.0, output_price = 25.0,
    cache_write_price = 6.25, cache_read_price = 0.50
WHERE source_model_id = 'o1-*' AND provider = 'bedrock';
