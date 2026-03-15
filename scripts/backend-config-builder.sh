#!/usr/bin/env bash
set -euo pipefail

# Build BackendRecord JSON for one-router backends table
# Usage: ./scripts/backend-config-builder.sh [OPTIONS]

# ─── Defaults ───────────────────────────────────────────────────────────────
TYPE=""
NAME=""
REGION="us-east-1"
PROFILE=""
API_KEYS=""
BASE_URL=""
TIMEOUT=""
PRIORITY=10
ENABLED=true
COMPACT=false

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
    local input
    if [ -t 0 ]; then
        IFS= read -r input
    else
        IFS= read -r input </dev/tty
    fi
    eval "$var_name=\$input"
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
  --api-keys KEYS         Comma-separated API keys (gemini, required)
  --base-url URL          Custom base URL (gemini, optional)
  --timeout SECONDS       Request timeout (gemini, optional)
  --priority N            Priority (default: 10)
  --enabled               Enable backend (default)
  --disabled              Disable backend
  --compact               Output compact JSON (default: pretty)
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
        --api-keys)    API_KEYS="$2";       shift 2 ;;
        --base-url)    BASE_URL="$2";       shift 2 ;;
        --timeout)     TIMEOUT="$2";        shift 2 ;;
        --priority)    PRIORITY="$2";       shift 2 ;;
        --enabled)     ENABLED=true;        shift ;;
        --disabled)    ENABLED=false;       shift ;;
        --compact)     COMPACT=true;        shift ;;
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

    prompt_msg "AWS profile (leave empty for default): "
    read_tty input
    PROFILE="${input}"
    if [[ -n "$PROFILE" ]]; then
        info "-> profile: $PROFILE"
    fi
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

build_bedrock_config() {
    local config
    if [[ -n "$PROFILE" ]]; then
        config=$(printf '{"region":"%s","profile":"%s"}' "$REGION" "$PROFILE")
    else
        config=$(printf '{"region":"%s"}' "$REGION")
    fi
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

# Validate timeout is numeric if set
if [[ -n "$TIMEOUT" ]] && ! [[ "$TIMEOUT" =~ ^[0-9]+$ ]]; then
    err "Timeout must be a positive integer, got: '$TIMEOUT'"
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

# Build final BackendRecord JSON
if $COMPACT; then
    printf '{"name":"%s","backend_type":"%s","config":"%s","enabled":%s,"priority":%d,"health_status":"unknown","last_health_check":null,"created_at":%d,"updated_at":null}\n' \
        "$NAME" "$TYPE" "$CONFIG_ESCAPED" "$ENABLED" "$PRIORITY" "$CREATED_AT"
else
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
fi
