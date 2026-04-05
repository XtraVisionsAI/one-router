#!/usr/bin/env bash
set -euo pipefail

# One Router — Database Migration Runner
#
# Runs all pending migrations for the specified database backend in order.
# Each migration is idempotent and safe to re-run.
#
# Usage:
#   ./scripts/migrations/run.sh --backend <postgres|dynamodb> [OPTIONS]
#
# Options:
#   --backend BACKEND     Required. One of: postgres, dynamodb
#                         (SQLite migrations run automatically on app startup)
#
# PostgreSQL options:
#   --database-url URL    PostgreSQL connection string
#                         (or set DATABASE_URL env var)
#
# DynamoDB options:
#   --region REGION       AWS region (default: us-east-1)
#   --profile PROFILE     AWS CLI profile
#   --table-prefix PREFIX Table prefix (default: one_router_)
#   --no-wait             Don't wait for async operations (GSI builds)
#
# Examples:
#   # Run all PostgreSQL migrations
#   ./scripts/migrations/run.sh --backend postgres \
#       --database-url "postgres://user:pass@host:5432/db"
#
#   # Run all DynamoDB migrations
#   ./scripts/migrations/run.sh --backend dynamodb \
#       --region us-west-2 --profile production
#
#   # Use DATABASE_URL env var
#   DATABASE_URL="postgres://..." ./scripts/migrations/run.sh --backend postgres

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# ─── Defaults ──────────────────────────────────────────────────────────────
BACKEND=""
DATABASE_URL="${DATABASE_URL:-}"
REGION="us-east-1"
PROFILE=""
TABLE_PREFIX="one_router_"
NO_WAIT=""

# ─── Parse arguments ──────────────────────────────────────────────────────
while [[ $# -gt 0 ]]; do
    case "$1" in
        --backend)       BACKEND="$2"; shift 2 ;;
        --database-url)  DATABASE_URL="$2"; shift 2 ;;
        --region)        REGION="$2"; shift 2 ;;
        --profile)       PROFILE="$2"; shift 2 ;;
        --table-prefix)  TABLE_PREFIX="$2"; shift 2 ;;
        --no-wait)       NO_WAIT="--no-wait"; shift ;;
        -h|--help)
            sed -n '/^# One Router/,/^$/{ /^$/q; p }' "$0" | tail -n +2
            sed -n '/^# Usage:/,/^[^#]/{ /^[^#]/q; p }' "$0" | sed 's/^# \?//'
            exit 0
            ;;
        *) echo "Error: Unknown option: $1" >&2; exit 1 ;;
    esac
done

if [[ -z "$BACKEND" ]]; then
    echo "Error: --backend is required (postgres or dynamodb)" >&2
    echo "Run with --help for usage." >&2
    exit 1
fi

# ─── Run PostgreSQL migrations ────────────────────────────────────────────
run_postgres() {
    if [[ -z "$DATABASE_URL" ]]; then
        echo "Error: --database-url or DATABASE_URL env var required for PostgreSQL" >&2
        exit 1
    fi

    local migration_dir="${SCRIPT_DIR}/postgres"
    local count=0
    local failed=0

    echo "=== PostgreSQL Migrations ==="
    echo "Database: ${DATABASE_URL%%@*}@***"
    echo ""

    for sql_file in "$migration_dir"/*.sql; do
        [[ -f "$sql_file" ]] || continue
        local name
        name="$(basename "$sql_file")"
        echo -n "  Running ${name}... "

        if psql "$DATABASE_URL" -f "$sql_file" -v ON_ERROR_STOP=1 > /dev/null 2>&1; then
            echo "OK"
            ((count++))
        else
            echo "FAILED"
            ((failed++))
            # Show error details
            psql "$DATABASE_URL" -f "$sql_file" -v ON_ERROR_STOP=1 2>&1 | tail -5 || true
        fi
    done

    echo ""
    echo "Completed: ${count} succeeded, ${failed} failed."
    [[ $failed -eq 0 ]] || exit 1
}

# ─── Run DynamoDB migrations ─────────────────────────────────────────────
run_dynamodb() {
    local migration_dir="${SCRIPT_DIR}/dynamodb"
    local count=0
    local failed=0

    echo "=== DynamoDB Migrations ==="
    echo "Region: ${REGION}"
    [[ -n "$PROFILE" ]] && echo "Profile: ${PROFILE}"
    echo "Table prefix: ${TABLE_PREFIX}"
    echo ""

    for script in "$migration_dir"/*.sh; do
        [[ -f "$script" ]] || continue
        local name
        name="$(basename "$script")"
        echo "  Running ${name}..."

        local args=(--region "$REGION" --table-prefix "$TABLE_PREFIX")
        [[ -n "$PROFILE" ]] && args+=(--profile "$PROFILE")
        [[ -n "$NO_WAIT" ]] && args+=("$NO_WAIT")

        if bash "$script" "${args[@]}"; then
            echo "  ${name}: OK"
            ((count++))
        else
            echo "  ${name}: FAILED"
            ((failed++))
        fi
        echo ""
    done

    echo "Completed: ${count} succeeded, ${failed} failed."
    [[ $failed -eq 0 ]] || exit 1
}

# ─── Dispatch ─────────────────────────────────────────────────────────────
case "$BACKEND" in
    postgres)  run_postgres ;;
    dynamodb)  run_dynamodb ;;
    sqlite)
        echo "SQLite migrations run automatically on application startup."
        echo "No manual migration needed."
        exit 0
        ;;
    *)
        echo "Error: Unknown backend '${BACKEND}'. Use: postgres, dynamodb, sqlite" >&2
        exit 1
        ;;
esac
