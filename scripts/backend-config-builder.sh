#!/usr/bin/env bash
set -euo pipefail

# Build BackendRecord JSON for one-router backends table
# Usage: ./scripts/backend-config-builder.sh [OPTIONS]

# ─── Defaults ───────────────────────────────────────────────────────────────
TYPE=""
NAME=""
REGION="us-east-1"
PROFILE=""
ACCESS_KEY_ID=""
SECRET_ACCESS_KEY=""
SESSION_TOKEN=""
WEIGHT=1
API_KEYS=""
BASE_URL=""
TIMEOUT=""
STRATEGY=""
MAX_FAILURES=""
RETRY_AFTER=""
PRIORITY=10
ENABLED=true
FORMAT=json

# ─── Colors (stderr only) ──────────────────────────────────────────────────
RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; CYAN='\033[0;36m'
BOLD='\033[1m'; NC='\033[0m'

# ─── Helpers ────────────────────────────────────────────────────────────────

# All prompts go to stderr so stdout stays clean for JSON
info()  { printf "${CYAN}%s${NC}\n" "$*" >&2; }
warn()  { printf "${YELLOW}%s${NC}\n" "$*" >&2; }
err()   { printf "${RED}Error: %s${NC}\n" "$*" >&2; }
prompt_msg() { printf "${BOLD}%s${NC}" "$*" >&2; }

# Read a line from the terminal (not stdin, which may be a pipe)
read_tty() {
    local var_name="$1"
    local _read_tty_buf
    if [ -t 0 ]; then
        IFS= read -r _read_tty_buf
    else
        IFS= read -r _read_tty_buf </dev/tty
    fi
    eval "$var_name=\$_read_tty_buf"
}

usage() {
    cat >&2 <<'EOF'
Usage: backend-config-builder.sh [OPTIONS]

Build a BackendRecord JSON for the one-router backends table.
When all required arguments are provided, outputs JSON without prompting.

Options:
  --type TYPE             Backend type: bedrock | gemini
  --name NAME             Backend name (default: <type>-<region> or <type>-default)
  --region REGION         AWS region (bedrock, default: us-east-1)
  --profile PROFILE       AWS named profile (bedrock, optional)
  --access-key-id ID      AWS access key ID (bedrock, optional)
  --secret-access-key KEY AWS secret access key (bedrock, optional)
  --session-token TOKEN   AWS session token (bedrock, optional)
  --weight N              Load-balancing weight (bedrock, default: 1)
  --api-keys KEYS         Comma-separated API keys (gemini, required)
  --base-url URL          Custom base URL (gemini, optional)
  --timeout SECONDS       Request timeout (gemini, optional)
  --strategy STRATEGY     Pool strategy: round_robin|weighted|random|failover
  --max-failures N        Max failures before disabling credential
  --retry-after SECONDS   Seconds before retrying disabled credential
  --priority N            Priority (default: 10)
  --enabled               Enable backend (default)
  --disabled              Disable backend
  --format FORMAT         Output format: json (default), json-compact, dynamodb, sql
  -h, --help              Show this help

Examples:
  # Interactive mode
  ./scripts/backend-config-builder.sh

  # Non-interactive bedrock
  ./scripts/backend-config-builder.sh --type bedrock --region us-east-1

  # Non-interactive gemini
  ./scripts/backend-config-builder.sh --type gemini --api-keys "key1,key2"

  # Pipe to file
  ./scripts/backend-config-builder.sh --type bedrock --compact > backend.json
EOF
    exit 0
}

# ─── Parse CLI arguments ───────────────────────────────────────────────────

while [[ $# -gt 0 ]]; do
    case "$1" in
        --type)        TYPE="$2";           shift 2 ;;
        --name)        NAME="$2";           shift 2 ;;
        --region)      REGION="$2";         shift 2 ;;
        --profile)     PROFILE="$2";        shift 2 ;;
        --access-key-id)    ACCESS_KEY_ID="$2";    shift 2 ;;
        --secret-access-key) SECRET_ACCESS_KEY="$2"; shift 2 ;;
        --session-token)    SESSION_TOKEN="$2";    shift 2 ;;
        --weight)      WEIGHT="$2";         shift 2 ;;
        --api-keys)    API_KEYS="$2";       shift 2 ;;
        --base-url)    BASE_URL="$2";       shift 2 ;;
        --timeout)     TIMEOUT="$2";        shift 2 ;;
        --strategy)    STRATEGY="$2";       shift 2 ;;
        --max-failures) MAX_FAILURES="$2";  shift 2 ;;
        --retry-after) RETRY_AFTER="$2";    shift 2 ;;
        --priority)    PRIORITY="$2";       shift 2 ;;
        --enabled)     ENABLED=true;        shift ;;
        --disabled)    ENABLED=false;       shift ;;
        --format)      FORMAT="$2";         shift 2 ;;
        --compact)     FORMAT="json-compact"; shift ;;
        -h|--help)     usage ;;
        *)
            err "Unknown option: $1"
            echo "Run with -h for usage." >&2
            exit 1
            ;;
    esac
done

# ─── Interactive prompts ───────────────────────────────────────────────────

interactive_select_type() {
    if [[ -n "$TYPE" ]]; then return; fi
    echo >&2
    info "=== One Router Backend Config Builder ==="
    echo >&2
    info "Select backend type:"
    info "  1) bedrock"
    info "  2) gemini"
    echo >&2
    prompt_msg "Choice [1]: "
    local choice
    read_tty choice
    case "${choice:-1}" in
        1|bedrock)  TYPE="bedrock" ;;
        2|gemini)   TYPE="gemini" ;;
        *)
            err "Invalid choice: $choice"
            exit 1
            ;;
    esac
    info "-> backend_type: $TYPE"
}

interactive_name() {
    if [[ -n "$NAME" ]]; then return; fi
    local default_name
    if [[ "$TYPE" == "bedrock" ]]; then
        default_name="${TYPE}-${REGION}"
    else
        default_name="${TYPE}-default"
    fi
    echo >&2
    prompt_msg "Backend name [$default_name]: "
    local input
    read_tty input
    NAME="${input:-$default_name}"
    info "-> name: $NAME"
}

interactive_bedrock_config() {
    echo >&2
    prompt_msg "AWS region [$REGION]: "
    local input
    read_tty input
    REGION="${input:-$REGION}"
    info "-> region: $REGION"

    info "Authentication (leave all empty for default credential chain):"
    prompt_msg "AWS profile (leave empty to use access keys or default): "
    read_tty input
    PROFILE="${input}"
    if [[ -n "$PROFILE" ]]; then
        info "-> profile: $PROFILE"
    else
        prompt_msg "AWS access key ID (leave empty for default): "
        read_tty input
        ACCESS_KEY_ID="${input}"
        if [[ -n "$ACCESS_KEY_ID" ]]; then
            info "-> access_key_id: ${ACCESS_KEY_ID:0:8}..."
            prompt_msg "AWS secret access key: "
            read_tty input
            SECRET_ACCESS_KEY="${input}"
            prompt_msg "AWS session token (leave empty if not needed): "
            read_tty input
            SESSION_TOKEN="${input}"
        fi
    fi

    prompt_msg "Weight [$WEIGHT]: "
    read_tty input
    if [[ -n "$input" ]]; then
        WEIGHT="$input"
    fi
    info "-> weight: $WEIGHT"
}

interactive_gemini_config() {
    if [[ -z "$API_KEYS" ]]; then
        echo >&2
        info "Enter API keys one per line (empty line to finish):"
        local keys=()
        local key
        while true; do
            prompt_msg "  API key: "
            read_tty key
            if [[ -z "$key" ]]; then
                break
            fi
            keys+=("$key")
        done
        if [[ ${#keys[@]} -eq 0 ]]; then
            err "At least one API key is required for gemini"
            exit 1
        fi
        # Join with commas
        local joined=""
        for k in "${keys[@]}"; do
            if [[ -n "$joined" ]]; then
                joined="${joined},${k}"
            else
                joined="$k"
            fi
        done
        API_KEYS="$joined"
    fi

    if [[ -z "$BASE_URL" ]]; then
        echo >&2
        prompt_msg "Custom base URL (leave empty for default): "
        local input
        read_tty input
        BASE_URL="${input}"
        if [[ -n "$BASE_URL" ]]; then
            info "-> base_url: $BASE_URL"
        fi
    fi

    if [[ -z "$TIMEOUT" ]]; then
        prompt_msg "Timeout seconds [120]: "
        local input
        read_tty input
        TIMEOUT="${input}"
    fi
}

interactive_priority() {
    echo >&2
    prompt_msg "Priority [$PRIORITY]: "
    local input
    read_tty input
    if [[ -n "$input" ]]; then
        PRIORITY="$input"
    fi
    info "-> priority: $PRIORITY"
}

interactive_enabled() {
    prompt_msg "Enabled? [Y/n]: "
    local input
    read_tty input
    case "${input:-y}" in
        [Yy]|[Yy]es|"") ENABLED=true ;;
        [Nn]|[Nn]o)      ENABLED=false ;;
        *)
            warn "Unrecognized input '$input', defaulting to enabled"
            ENABLED=true
            ;;
    esac
    info "-> enabled: $ENABLED"
}

# ─── Build config JSON ────────────────────────────────────────────────────

build_pool_settings() {
    local fragment=""
    if [[ -n "$STRATEGY" ]]; then
        fragment+=",\"strategy\":\"${STRATEGY}\""
    fi
    if [[ -n "$MAX_FAILURES" ]]; then
        fragment+=",\"max_failures\":${MAX_FAILURES}"
    fi
    if [[ -n "$RETRY_AFTER" ]]; then
        fragment+=",\"retry_after_secs\":${RETRY_AFTER}"
    fi
    echo "$fragment"
}

build_bedrock_config() {
    local config="{\"region\":\"${REGION}\""
    if [[ -n "$PROFILE" ]]; then
        config+=",\"profile\":\"${PROFILE}\""
    fi
    if [[ -n "$ACCESS_KEY_ID" ]]; then
        local escaped_ak escaped_sk
        escaped_ak=$(printf '%s' "$ACCESS_KEY_ID" | sed 's/\\/\\\\/g; s/"/\\"/g')
        escaped_sk=$(printf '%s' "$SECRET_ACCESS_KEY" | sed 's/\\/\\\\/g; s/"/\\"/g')
        config+=",\"access_key_id\":\"${escaped_ak}\""
        config+=",\"secret_access_key\":\"${escaped_sk}\""
        if [[ -n "$SESSION_TOKEN" ]]; then
            local escaped_token
            escaped_token=$(printf '%s' "$SESSION_TOKEN" | sed 's/\\/\\\\/g; s/"/\\"/g')
            config+=",\"session_token\":\"${escaped_token}\""
        fi
    fi
    config+=",\"weight\":${WEIGHT}"
    # Append shared pool settings
    config+=$(build_pool_settings)
    config+="}"
    echo "$config"
}

build_gemini_config() {
    # Parse comma-separated keys
    local IFS=','
    local keys_array=()
    read -ra keys_array <<< "$API_KEYS"

    # Build JSON array of keys
    local keys_json="["
    local first=true
    for key in "${keys_array[@]}"; do
        key=$(echo "$key" | xargs)  # trim whitespace
        if [[ -z "$key" ]]; then continue; fi
        if $first; then
            first=false
        else
            keys_json+=","
        fi
        # Escape any special JSON characters in the key
        local escaped
        escaped=$(printf '%s' "$key" | sed 's/\\/\\\\/g; s/"/\\"/g')
        keys_json+="\"${escaped}\""
    done
    keys_json+="]"

    # Build config object
    local config="{\"api_keys\":${keys_json}"

    if [[ -n "$BASE_URL" ]]; then
        local escaped_url
        escaped_url=$(printf '%s' "$BASE_URL" | sed 's/\\/\\\\/g; s/"/\\"/g')
        config+=",\"base_url\":\"${escaped_url}\""
    fi

    local timeout_val="${TIMEOUT:-120}"
    config+=",\"timeout_seconds\":${timeout_val}"

    # Append shared pool settings
    config+=$(build_pool_settings)

    config+="}"
    echo "$config"
}

# ─── Main ──────────────────────────────────────────────────────────────────

# Track if we started in interactive mode
INTERACTIVE=false

# Run interactive type selection if needed
if [[ -z "$TYPE" ]]; then
    INTERACTIVE=true
    interactive_select_type
fi

# Validate type
case "$TYPE" in
    bedrock|gemini) ;;
    *)
        err "Invalid backend type: '$TYPE' (must be 'bedrock' or 'gemini')"
        exit 1
        ;;
esac

# Interactive prompts for type-specific config
if $INTERACTIVE; then
    case "$TYPE" in
        bedrock) interactive_bedrock_config ;;
        gemini)  interactive_gemini_config ;;
    esac
    interactive_name
    interactive_priority
    interactive_enabled
elif [[ "$TYPE" == "gemini" && -z "$API_KEYS" ]]; then
    # Non-interactive gemini but missing required api-keys
    err "gemini backend requires --api-keys"
    exit 1
fi

# Set default name if not provided
if [[ -z "$NAME" ]]; then
    if [[ "$TYPE" == "bedrock" ]]; then
        NAME="${TYPE}-${REGION}"
    else
        NAME="${TYPE}-default"
    fi
fi

# Validate priority is numeric
if ! [[ "$PRIORITY" =~ ^[0-9]+$ ]]; then
    err "Priority must be a non-negative integer, got: '$PRIORITY'"
    exit 1
fi

# Validate weight is numeric (bedrock only)
if [[ "$TYPE" == "bedrock" ]] && ! [[ "$WEIGHT" =~ ^[0-9]+$ ]]; then
    err "Weight must be a non-negative integer, got: '$WEIGHT'"
    exit 1
fi

# Validate timeout is numeric if set
if [[ -n "$TIMEOUT" ]] && ! [[ "$TIMEOUT" =~ ^[0-9]+$ ]]; then
    err "Timeout must be a positive integer, got: '$TIMEOUT'"
    exit 1
fi

# Validate strategy if set
if [[ -n "$STRATEGY" ]]; then
    case "$STRATEGY" in
        round_robin|weighted|random|failover) ;;
        *)
            err "Strategy must be round_robin|weighted|random|failover, got: '$STRATEGY'"
            exit 1
            ;;
    esac
fi

# Validate max_failures is numeric if set
if [[ -n "$MAX_FAILURES" ]] && ! [[ "$MAX_FAILURES" =~ ^[0-9]+$ ]]; then
    err "Max failures must be a non-negative integer, got: '$MAX_FAILURES'"
    exit 1
fi

# Validate retry_after is numeric if set
if [[ -n "$RETRY_AFTER" ]] && ! [[ "$RETRY_AFTER" =~ ^[0-9]+$ ]]; then
    err "Retry after must be a non-negative integer, got: '$RETRY_AFTER'"
    exit 1
fi

# Build config JSON
CONFIG=""
case "$TYPE" in
    bedrock) CONFIG=$(build_bedrock_config) ;;
    gemini)  CONFIG=$(build_gemini_config) ;;
esac

# Escape config for embedding in outer JSON
CONFIG_ESCAPED=$(printf '%s' "$CONFIG" | sed 's/\\/\\\\/g; s/"/\\"/g')

# Get current unix timestamp
CREATED_AT=$(date +%s)

# Enabled as integer for SQL
if $ENABLED; then ENABLED_INT=1; else ENABLED_INT=0; fi

# ─── Output formatters ────────────────────────────────────────────────────

output_json() {
    cat <<ENDJSON
{
  "name": "$NAME",
  "backend_type": "$TYPE",
  "config": "$CONFIG_ESCAPED",
  "enabled": $ENABLED,
  "priority": $PRIORITY,
  "health_status": "unknown",
  "last_health_check": null,
  "created_at": $CREATED_AT,
  "updated_at": null
}
ENDJSON
}

output_json_compact() {
    printf '{"name":"%s","backend_type":"%s","config":"%s","enabled":%s,"priority":%d,"health_status":"unknown","last_health_check":null,"created_at":%d,"updated_at":null}\n' \
        "$NAME" "$TYPE" "$CONFIG_ESCAPED" "$ENABLED" "$PRIORITY" "$CREATED_AT"
}

output_dynamodb() {
    cat <<ENDJSON
{
  "name": {"S": "$NAME"},
  "backend_type": {"S": "$TYPE"},
  "config": {"S": "$CONFIG_ESCAPED"},
  "enabled": {"BOOL": $ENABLED},
  "priority": {"N": "$PRIORITY"},
  "health_status": {"S": "unknown"},
  "last_health_check": {"NULL": true},
  "created_at": {"N": "$CREATED_AT"},
  "updated_at": {"NULL": true}
}
ENDJSON
}

output_sql() {
    # Double single-quotes for SQL escaping
    local sql_config
    sql_config=$(printf '%s' "$CONFIG" | sed "s/'/''/g")
    cat <<ENDSQL
INSERT INTO backends (name, backend_type, config, enabled, priority, health_status, last_health_check, created_at, updated_at)
VALUES ('$NAME', '$TYPE', '$sql_config', $ENABLED_INT, $PRIORITY, 'unknown', NULL, $CREATED_AT, NULL)
ON CONFLICT (name) DO UPDATE SET
  backend_type = excluded.backend_type,
  config = excluded.config,
  enabled = excluded.enabled,
  priority = excluded.priority,
  updated_at = $(date +%s);
ENDSQL
}

# ─── Output ────────────────────────────────────────────────────────────────

case "$FORMAT" in
    json)         output_json ;;
    json-compact) output_json_compact ;;
    dynamodb)     output_dynamodb ;;
    sql)          output_sql ;;
    *)
        err "Unknown format: '$FORMAT' (must be json|json-compact|dynamodb|sql)"
        exit 1
        ;;
esac
