#!/usr/bin/env bash
set -euo pipefail

# Migration 004: Create the users table (PK: user_id)
#
# Schema only. The data migration (every ownerless key becomes one user; usage
# items get user_id in a resumable background pass) runs on gateway startup.
#
# Idempotent: skips creation if the table already exists.
#
# Usage:
#   ./scripts/migrations/dynamodb/004_users_table.sh [OPTIONS]
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

TABLE_NAME="${TABLE_PREFIX}users"
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
    --attribute-definitions AttributeName=user_id,AttributeType=S \
    --key-schema AttributeName=user_id,KeyType=HASH \
    --billing-mode PAY_PER_REQUEST >/dev/null
aws dynamodb wait table-exists "${AWS_OPTS[@]}" --table-name "$TABLE_NAME"
echo "Table ${TABLE_NAME} is ACTIVE."
