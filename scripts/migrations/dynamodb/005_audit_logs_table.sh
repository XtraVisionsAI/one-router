#!/usr/bin/env bash
set -euo pipefail

# Migration 005: Create the audit_logs table (PK: month, SK: sort_key)
#
# Audit entries are partitioned by month ("YYYY-MM"); sort key is
# "<timestamp>#<id>". The gateway creates this table on startup too.
#
# Idempotent: skips creation if the table already exists.
#
# Usage:
#   ./scripts/migrations/dynamodb/005_audit_logs_table.sh [OPTIONS]
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

TABLE_NAME="${TABLE_PREFIX}audit_logs"
AWS_OPTS=(--region "$REGION" --output json)
if [[ -n "$PROFILE" ]]; then
    AWS_OPTS+=(--profile "$PROFILE")
fi

if aws dynamodb describe-table "${AWS_OPTS[@]}" --table-name "$TABLE_NAME" >/dev/null 2>&1; then
    echo "Table ${TABLE_NAME} already exists — skipping."
    exit 0
fi

echo "Creating table ${TABLE_NAME}..."
aws dynamodb create-table "${AWS_OPTS[@]}" \
    --table-name "$TABLE_NAME" \
    --attribute-definitions AttributeName=month,AttributeType=S AttributeName=sort_key,AttributeType=S \
    --key-schema AttributeName=month,KeyType=HASH AttributeName=sort_key,KeyType=RANGE \
    --billing-mode PAY_PER_REQUEST >/dev/null
aws dynamodb wait table-exists "${AWS_OPTS[@]}" --table-name "$TABLE_NAME"
echo "Table ${TABLE_NAME} is ACTIVE."
