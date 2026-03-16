#!/usr/bin/env bash
set -euo pipefail

# Migrate Bedrock model mappings to use global inference profile IDs.
# Usage: ./scripts/migrate-model-mappings.sh [--region REGION] [--profile PROFILE] [--dry-run]

REGION="ap-northeast-1"
AWS_ARGS=()
DRY_RUN=false
TABLE="one_router_model_mappings"

while [[ $# -gt 0 ]]; do
    case "$1" in
        --region|-r)  REGION="$2"; shift 2 ;;
        --profile)    AWS_ARGS+=(--profile "$2"); shift 2 ;;
        --dry-run)    DRY_RUN=true; shift ;;
        -h|--help)    echo "Usage: $0 [--region REGION] [--profile PROFILE] [--dry-run]"; exit 0 ;;
        *)            echo "Unknown option: $1"; exit 1 ;;
    esac
done

AWS_ARGS+=(--region "$REGION")
awscli() { aws "${AWS_ARGS[@]}" "$@"; }

# old_target|new_target
MAPPINGS="
anthropic.claude-sonnet-4-6-20260313-v1:0|global.anthropic.claude-sonnet-4-6
anthropic.claude-opus-4-6-20260313-v1:0|global.anthropic.claude-opus-4-6-v1
anthropic.claude-sonnet-4-20250514-v1:0|global.anthropic.claude-sonnet-4-20250514-v1:0
anthropic.claude-opus-4-5-20251101-v1:0|global.anthropic.claude-opus-4-5-20251101-v1:0
anthropic.claude-haiku-4-5-20251001-v1:0|global.anthropic.claude-haiku-4-5-20251001-v1:0
"

lookup() {
    local result=""
    while IFS='|' read -r old new; do
        [[ -z "$old" ]] && continue
        if [[ "$old" == "$1" ]]; then
            result="$new"
            break
        fi
    done <<< "$MAPPINGS"
    echo "$result"
}

echo "=== Migrate model mappings to global inference profiles ==="
echo "  Table:  ${TABLE}"
echo "  Region: ${REGION}"
echo "  Dry run: ${DRY_RUN}"
echo ""

# Scan all bedrock mappings
ITEMS=$(awscli dynamodb scan \
    --table-name "${TABLE}" \
    --filter-expression "provider = :p" \
    --expression-attribute-values '{":p":{"S":"bedrock"}}' \
    --output json)

echo "$ITEMS" | jq -r '.Items[] | "\(.source_model_id.S)\t\(.target_model_id.S)"' | while IFS=$'\t' read -r src old_target; do
    new_target=$(lookup "$old_target")
    if [[ -z "$new_target" || "$old_target" == "$new_target" ]]; then
        continue
    fi

    echo "  ${src}: ${old_target} -> ${new_target}"

    if [[ "$DRY_RUN" == "false" ]]; then
        awscli dynamodb update-item \
            --table-name "${TABLE}" \
            --key "{\"source_model_id\":{\"S\":\"${src}\"},\"provider\":{\"S\":\"bedrock\"}}" \
            --update-expression "SET target_model_id = :t, updated_at = :u" \
            --expression-attribute-values "{\":t\":{\"S\":\"${new_target}\"},\":u\":{\"N\":\"$(date +%s)\"}}" \
            >/dev/null
    fi
done

echo ""
if [[ "$DRY_RUN" == "true" ]]; then
    echo "Dry run complete. Re-run without --dry-run to apply."
else
    echo "Done."
fi
