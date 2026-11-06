#!/usr/bin/env bash
set -euo pipefail

# Migration 003: Assign a stable key_id to every api_keys item
#
# Adds a UUIDv4 `key_id` attribute (admin API identifier, rate-limit bucket,
# usage attribution) to api_keys items that lack one. Uses a conditional
# update (attribute_not_exists(key_id)) so it never overwrites an id assigned
# by a running gateway.
#
# Usage items are NOT backfilled (the table can be large): new usage items
# carry key_id; legacy items stay attributed through the key hash while the
# key exists.
#
# The gateway performs the same backfill on startup; this script is for
# pre-deployment runs.
#
# Idempotent: items that already have a key_id are skipped.
#
# Usage:
#   ./scripts/migrations/dynamodb/003_api_key_ids.sh [OPTIONS]
#
# Options:
#   --region REGION         AWS region (default: us-east-1)
#   --profile PROFILE       AWS CLI profile
#   --table-prefix PREFIX   Table name prefix (default: one_router_)

REGION="us-east-1"
PROFILE=""
TABLE_PREFIX="one_router_"

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

TABLE_NAME="${TABLE_PREFIX}api_keys"
AWS_OPTS=(--region "$REGION" --output json)
if [[ -n "$PROFILE" ]]; then
    AWS_OPTS+=(--profile "$PROFILE")
fi

new_uuid() {
    if command -v uuidgen >/dev/null 2>&1; then
        uuidgen | tr '[:upper:]' '[:lower:]'
    else
        cat /proc/sys/kernel/random/uuid
    fi
}

echo "Scanning ${TABLE_NAME} for items without key_id..."
# The AWS CLI paginates scan automatically.
HASHES=$(aws dynamodb scan "${AWS_OPTS[@]}" \
    --table-name "$TABLE_NAME" \
    --filter-expression "attribute_not_exists(key_id)" \
    --projection-expression "api_key" \
    --query "Items[].api_key.S" --output text)

count=0
for hash in $HASHES; do
    [[ "$hash" == "None" ]] && continue
    if aws dynamodb update-item "${AWS_OPTS[@]}" \
        --table-name "$TABLE_NAME" \
        --key "{\"api_key\":{\"S\":\"${hash}\"}}" \
        --update-expression "SET key_id = :id" \
        --condition-expression "attribute_exists(api_key) AND attribute_not_exists(key_id)" \
        --expression-attribute-values "{\":id\":{\"S\":\"$(new_uuid)\"}}" \
        >/dev/null 2>&1; then
        count=$((count + 1))
    fi
done

echo "Assigned key_id to ${count} api_keys item(s)."
