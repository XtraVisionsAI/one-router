#!/usr/bin/env bash
set -euo pipefail

# Migration 002: Backfill model pricing (per million tokens, USD)
#
# Updates input_price, output_price, cache_write_price, cache_read_price
# for all default model mappings in the DynamoDB model_mappings table.
#
# Prices sourced from Anthropic / Google / AWS Bedrock published rates
# as of April 2026.
#
# Idempotent: UpdateItem overwrites prices on each run.
#
# Usage:
#   ./scripts/migrations/dynamodb/002_model_pricing.sh [OPTIONS]
#
# Options:
#   --region REGION         AWS region (default: us-east-1)
#   --profile PROFILE       AWS CLI profile
#   --table-prefix PREFIX   Table name prefix (default: one_router_)

# ─── Defaults ──────────────────────────────────────────────────────────────
REGION="us-east-1"
PROFILE=""
TABLE_PREFIX="one_router_"

# ─── Parse arguments ──────────────────────────────────────────────────────
while [[ $# -gt 0 ]]; do
    case "$1" in
        --region)       REGION="$2"; shift 2 ;;
        --profile)      PROFILE="$2"; shift 2 ;;
        --table-prefix) TABLE_PREFIX="$2"; shift 2 ;;
        -h|--help)
            sed -n '/^# Usage:/,/^$/p' "$0" | sed 's/^# //'
            exit 0
            ;;
        *) echo "Unknown option: $1" >&2; exit 1 ;;
    esac
done

TABLE_NAME="${TABLE_PREFIX}model_mappings"

AWS_OPTS=(--region "$REGION" --output json)
if [[ -n "$PROFILE" ]]; then
    AWS_OPTS+=(--profile "$PROFILE")
fi

# ─── Helper: update pricing for one model ─────────────────────────────────
update_price() {
    local source_model_id="$1"
    local provider="$2"
    local input_price="$3"
    local output_price="$4"
    local cache_write_price="$5"
    local cache_read_price="$6"

    aws dynamodb update-item \
        "${AWS_OPTS[@]}" \
        --table-name "$TABLE_NAME" \
        --key "{
            \"source_model_id\": {\"S\": \"${source_model_id}\"},
            \"provider\": {\"S\": \"${provider}\"}
        }" \
        --update-expression "SET input_price = :ip, output_price = :op, cache_write_price = :cw, cache_read_price = :cr" \
        --expression-attribute-values "{
            \":ip\": {\"N\": \"${input_price}\"},
            \":op\": {\"N\": \"${output_price}\"},
            \":cw\": {\"N\": \"${cache_write_price}\"},
            \":cr\": {\"N\": \"${cache_read_price}\"}
        }" \
        --condition-expression "attribute_exists(source_model_id)" \
        > /dev/null 2>&1 || true
}

echo "=== DynamoDB Migration 002: Model Pricing ==="
echo "Table: ${TABLE_NAME}"
echo "Region: ${REGION}"
echo ""

count=0

# ── Claude 3.5 Sonnet (Bedrock Extended Access) ─────────────────────────
update_price "claude-3-5-sonnet-20241022"  bedrock 6.0 30.0 7.50 0.60; ((count++))
update_price "claude-3-5-sonnet-latest"    bedrock 6.0 30.0 7.50 0.60; ((count++))

# ── Claude 3 Sonnet ─────────────────────────────────────────────────────
update_price "claude-3-sonnet-20240229"    bedrock 3.0 15.0 3.75 0.30; ((count++))

# ── Claude Sonnet 4 ─────────────────────────────────────────────────────
update_price "claude-sonnet-4-20250514"    bedrock 3.0 15.0 3.75 0.30; ((count++))
update_price "claude-sonnet-4"             bedrock 3.0 15.0 3.75 0.30; ((count++))

# ── Claude 3.5 Haiku ────────────────────────────────────────────────────
update_price "claude-3-5-haiku-20241022"   bedrock 0.80 4.0 1.0 0.08; ((count++))

# ── Claude 3 Haiku ──────────────────────────────────────────────────────
update_price "claude-3-haiku-20240307"     bedrock 0.25 1.25 0.30 0.03; ((count++))

# ── Claude 3 Opus ───────────────────────────────────────────────────────
update_price "claude-3-opus-20240229"      bedrock 15.0 75.0 18.75 1.50; ((count++))

# ── Claude Opus 4.5 ─────────────────────────────────────────────────────
update_price "claude-opus-4-5-20251101"    bedrock 5.0 25.0 6.25 0.50; ((count++))
update_price "claude-opus-4-5"             bedrock 5.0 25.0 6.25 0.50; ((count++))

# ── Claude Sonnet 4.6 ───────────────────────────────────────────────────
update_price "claude-sonnet-4-6-20260313"  bedrock 3.0 15.0 3.75 0.30; ((count++))
update_price "claude-sonnet-4-6"           bedrock 3.0 15.0 3.75 0.30; ((count++))

# ── Claude Opus 4.6 ─────────────────────────────────────────────────────
update_price "claude-opus-4-6-20260313"    bedrock 5.0 25.0 6.25 0.50; ((count++))
update_price "claude-opus-4-6"             bedrock 5.0 25.0 6.25 0.50; ((count++))

# ── Claude Haiku 4.5 ────────────────────────────────────────────────────
update_price "claude-haiku-4-5-20251001"   bedrock 1.0 5.0 1.25 0.10; ((count++))
update_price "claude-haiku-4-5"            bedrock 1.0 5.0 1.25 0.10; ((count++))

# ── Claude -latest aliases ──────────────────────────────────────────────
update_price "claude-sonnet-4-latest"      bedrock 3.0 15.0 3.75 0.30; ((count++))
update_price "claude-opus-4-latest"        bedrock 5.0 25.0 6.25 0.50; ((count++))
update_price "claude-haiku-4-latest"       bedrock 1.0 5.0 1.25 0.10; ((count++))
update_price "claude-3-5-haiku-latest"     bedrock 0.80 4.0 1.0 0.08; ((count++))
update_price "claude-3-opus-latest"        bedrock 15.0 75.0 18.75 1.50; ((count++))

# ── Gemini models ───────────────────────────────────────────────────────
update_price "gemini-2.5-flash"            gemini 0.30 2.50 0.0 0.03; ((count++))
update_price "gemini-2.5-pro"              gemini 1.25 10.0 0.0 0.125; ((count++))
update_price "gemini-2.0-flash"            gemini 0.10 0.40 0.0 0.025; ((count++))
update_price "gemini-2.0-flash-lite"       gemini 0.075 0.30 0.0 0.0; ((count++))
update_price "gemini-1.5-pro"              gemini 1.25 5.0 0.0 0.3125; ((count++))
update_price "gemini-1.5-flash"            gemini 0.075 0.30 0.0 0.01875; ((count++))

# ── GPT → Sonnet 4.6 ───────────────────────────────────────────────────
update_price "gpt-4o"                      bedrock 3.0 15.0 3.75 0.30; ((count++))
update_price "gpt-4o-2024-05-13"           bedrock 3.0 15.0 3.75 0.30; ((count++))
update_price "gpt-4o-2024-08-06"           bedrock 3.0 15.0 3.75 0.30; ((count++))
update_price "gpt-4"                       bedrock 3.0 15.0 3.75 0.30; ((count++))
update_price "gpt-4-turbo"                 bedrock 3.0 15.0 3.75 0.30; ((count++))
update_price "gpt-4-turbo-preview"         bedrock 3.0 15.0 3.75 0.30; ((count++))
update_price "o1-mini"                     bedrock 3.0 15.0 3.75 0.30; ((count++))

# ── GPT → Haiku 4.5 ────────────────────────────────────────────────────
update_price "gpt-4o-mini"                 bedrock 1.0 5.0 1.25 0.10; ((count++))
update_price "gpt-4o-mini-2024-07-18"      bedrock 1.0 5.0 1.25 0.10; ((count++))
update_price "gpt-3.5-turbo"               bedrock 1.0 5.0 1.25 0.10; ((count++))
update_price "gpt-3.5-turbo-16k"           bedrock 1.0 5.0 1.25 0.10; ((count++))

# ── O1 → Opus 4.6 ──────────────────────────────────────────────────────
update_price "o1"                          bedrock 5.0 25.0 6.25 0.50; ((count++))
update_price "o1-preview"                  bedrock 5.0 25.0 6.25 0.50; ((count++))

# ── Embedding models (input-only pricing) ───────────────────────────────
update_price "cohere.embed-english-v3"     bedrock 0.10 0.0 0.0 0.0; ((count++))
update_price "cohere.embed-multilingual-v3" bedrock 0.10 0.0 0.0 0.0; ((count++))
update_price "amazon.titan-embed-text-v2:0" bedrock 0.02 0.0 0.0 0.0; ((count++))
update_price "amazon.titan-embed-text-v1"  bedrock 0.10 0.0 0.0 0.0; ((count++))
update_price "text-embedding-3-small"      bedrock 0.02 0.0 0.0 0.0; ((count++))
update_price "text-embedding-3-large"      bedrock 0.02 0.0 0.0 0.0; ((count++))
update_price "text-embedding-ada-002"      bedrock 0.02 0.0 0.0 0.0; ((count++))

# Rerank models: per-query pricing ($2/1K queries), not per-token — left at 0.

# ── Wildcard catch-all ──────────────────────────────────────────────────
update_price "claude-*"                    bedrock 3.0 15.0 3.75 0.30; ((count++))
update_price "gemini-*"                    gemini  0.30 2.50 0.0 0.03; ((count++))
update_price "gpt-*"                       bedrock 3.0 15.0 3.75 0.30; ((count++))
update_price "o1-*"                        bedrock 5.0 25.0 6.25 0.50; ((count++))

echo ""
echo "Updated ${count} model mappings."
echo "Migration 002 complete."
