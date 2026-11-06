#!/usr/bin/env bash
set -euo pipefail

# Migration 006: Create the teams and rate_counters tables
#
# teams:         PK team_id (S)
# rate_counters: PK subject (S), SK window_start (N); TTL on expires_at
#                (shared rate-limit store; old windows expire automatically).
# The gateway creates both on startup too.
#
# Idempotent: skips creation if the table already exists.
#
# Usage:
#   ./scripts/migrations/dynamodb/006_teams_rate_counters.sh [OPTIONS]
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

AWS_OPTS=(--region "$REGION" --output json)
if [[ -n "$PROFILE" ]]; then
    AWS_OPTS+=(--profile "$PROFILE")
fi

create() {
    local table="$1"; shift
    if aws dynamodb describe-table "${AWS_OPTS[@]}" --table-name "$table" >/dev/null 2>&1; then
        echo "Table ${table} already exists — skipping."
        return
    fi
    echo "Creating table ${table}..."
    aws dynamodb create-table "${AWS_OPTS[@]}" --table-name "$table" --billing-mode PAY_PER_REQUEST "$@" >/dev/null
    aws dynamodb wait table-exists "${AWS_OPTS[@]}" --table-name "$table"
    echo "Table ${table} is ACTIVE."
}

create "${TABLE_PREFIX}teams" \
    --attribute-definitions AttributeName=team_id,AttributeType=S \
    --key-schema AttributeName=team_id,KeyType=HASH

create "${TABLE_PREFIX}rate_counters" \
    --attribute-definitions AttributeName=subject,AttributeType=S AttributeName=window_start,AttributeType=N \
    --key-schema AttributeName=subject,KeyType=HASH AttributeName=window_start,KeyType=RANGE

aws dynamodb update-time-to-live "${AWS_OPTS[@]}" \
    --table-name "${TABLE_PREFIX}rate_counters" \
    --time-to-live-specification "Enabled=true,AttributeName=expires_at" >/dev/null 2>&1 \
    && echo "TTL enabled on rate_counters.expires_at" \
    || echo "TTL already enabled (or not yet possible) on rate_counters"
