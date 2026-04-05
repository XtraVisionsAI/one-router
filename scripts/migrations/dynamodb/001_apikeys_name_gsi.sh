#!/usr/bin/env bash
set -euo pipefail

# Migration 001: Add GSI 'name-index' on api_keys table
#
# Creates a Global Secondary Index to enable O(1) lookups by key name,
# replacing full-table scans for uniqueness checks.
#
# GSI details:
#   - Index name:    name-index
#   - Partition key: name (S)
#   - Projection:    KEYS_ONLY (minimal storage/cost)
#   - Billing:       inherits table billing (PAY_PER_REQUEST)
#
# The GSI builds asynchronously. This script waits for it to reach ACTIVE
# status before exiting. The application handles the building period
# gracefully by falling back to filtered scans.
#
# Idempotent: skips creation if GSI already exists.
#
# Usage:
#   ./scripts/migrations/dynamodb/001_apikeys_name_gsi.sh [OPTIONS]
#
# Options:
#   --region REGION         AWS region (default: us-east-1)
#   --profile PROFILE       AWS CLI profile
#   --table-prefix PREFIX   Table name prefix (default: one_router_)
#   --no-wait               Don't wait for GSI to become ACTIVE

# ─── Defaults ──────────────────────────────────────────────────────────────
REGION="us-east-1"
PROFILE=""
TABLE_PREFIX="one_router_"
WAIT=true

# ─── Parse arguments ──────────────────────────────────────────────────────
while [[ $# -gt 0 ]]; do
    case "$1" in
        --region)       REGION="$2"; shift 2 ;;
        --profile)      PROFILE="$2"; shift 2 ;;
        --table-prefix) TABLE_PREFIX="$2"; shift 2 ;;
        --no-wait)      WAIT=false; shift ;;
        -h|--help)
            sed -n '/^# Usage:/,/^$/p' "$0" | sed 's/^# //'
            exit 0
            ;;
        *) echo "Unknown option: $1" >&2; exit 1 ;;
    esac
done

TABLE_NAME="${TABLE_PREFIX}api_keys"
GSI_NAME="name-index"

AWS_OPTS=(--region "$REGION" --output json)
if [[ -n "$PROFILE" ]]; then
    AWS_OPTS+=(--profile "$PROFILE")
fi

# ─── Check if GSI already exists ──────────────────────────────────────────
echo "Checking table ${TABLE_NAME} for existing GSI '${GSI_NAME}'..."

EXISTING=$(aws dynamodb describe-table \
    "${AWS_OPTS[@]}" \
    --table-name "$TABLE_NAME" \
    --query "Table.GlobalSecondaryIndexes[?IndexName=='${GSI_NAME}'].IndexStatus" \
    2>/dev/null || echo "[]")

if echo "$EXISTING" | grep -q '"ACTIVE"'; then
    echo "GSI '${GSI_NAME}' already exists and is ACTIVE. Nothing to do."
    exit 0
fi

if echo "$EXISTING" | grep -q '"CREATING"'; then
    echo "GSI '${GSI_NAME}' is already being created."
    if [[ "$WAIT" == true ]]; then
        echo "Waiting for ACTIVE status..."
    else
        echo "Use --no-wait to skip waiting. Exiting."
        exit 0
    fi
else
    # ─── Create GSI ───────────────────────────────────────────────────────
    echo "Creating GSI '${GSI_NAME}' on table '${TABLE_NAME}'..."

    aws dynamodb update-table \
        "${AWS_OPTS[@]}" \
        --table-name "$TABLE_NAME" \
        --attribute-definitions \
            AttributeName=name,AttributeType=S \
        --global-secondary-index-updates \
            "[{
                \"Create\": {
                    \"IndexName\": \"${GSI_NAME}\",
                    \"KeySchema\": [
                        {\"AttributeName\": \"name\", \"KeyType\": \"HASH\"}
                    ],
                    \"Projection\": {
                        \"ProjectionType\": \"KEYS_ONLY\"
                    }
                }
            }]" \
        > /dev/null

    echo "GSI creation initiated."
fi

# ─── Wait for ACTIVE ──────────────────────────────────────────────────────
if [[ "$WAIT" == true ]]; then
    echo -n "Waiting for GSI '${GSI_NAME}' to become ACTIVE"
    while true; do
        STATUS=$(aws dynamodb describe-table \
            "${AWS_OPTS[@]}" \
            --table-name "$TABLE_NAME" \
            --query "Table.GlobalSecondaryIndexes[?IndexName=='${GSI_NAME}'].IndexStatus | [0]" \
            2>/dev/null || echo '"UNKNOWN"')

        STATUS=$(echo "$STATUS" | tr -d '"')

        if [[ "$STATUS" == "ACTIVE" ]]; then
            echo ""
            echo "GSI '${GSI_NAME}' is now ACTIVE."
            break
        elif [[ "$STATUS" == "CREATING" ]]; then
            echo -n "."
            sleep 5
        else
            echo ""
            echo "Unexpected GSI status: ${STATUS}" >&2
            exit 1
        fi
    done
fi

echo "Migration 001 complete."
