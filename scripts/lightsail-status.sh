#!/usr/bin/env bash
set -euo pipefail

# Check Lightsail Container Service status
# Usage: ./scripts/lightsail-status.sh [OPTIONS]

# ─── Defaults ───────────────────────────────────────────────────────────────
REGION="us-east-1"
SERVICE_NAME="one-router"

# AWS authentication
AWS_PROFILE=""
AWS_ENDPOINT_URL=""
AWS_ACCESS_KEY_ID_OPT=""
AWS_SECRET_ACCESS_KEY_OPT=""
AWS_SESSION_TOKEN_OPT=""

# ─── Colors ─────────────────────────────────────────────────────────────────
RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; CYAN='\033[0;36m'; NC='\033[0m'

# ─── Parse arguments ────────────────────────────────────────────────────────
usage() {
    cat <<'EOF'
Usage: lightsail-status.sh [OPTIONS]

Query Lightsail Container Service status and run a health check.

Options:
  -r, --region REGION             AWS region (default: us-east-1)
  -n, --name NAME                 Service name (default: one-router)

AWS authentication:
  --profile PROFILE               AWS CLI named profile
  --endpoint-url URL              Custom AWS endpoint
  --access-key-id ID              AWS access key ID
  --secret-access-key KEY         AWS secret access key
  --session-token TOKEN           AWS session token

  -h, --help                      Show this help

Examples:
  ./scripts/lightsail-status.sh
  ./scripts/lightsail-status.sh --profile prod -r ap-southeast-1
EOF
    exit 0
}

while [[ $# -gt 0 ]]; do
    case "$1" in
        -r|--region)              REGION="$2"; shift 2 ;;
        -n|--name)                SERVICE_NAME="$2"; shift 2 ;;
        --profile)                AWS_PROFILE="$2"; shift 2 ;;
        --endpoint-url)           AWS_ENDPOINT_URL="$2"; shift 2 ;;
        --access-key-id)          AWS_ACCESS_KEY_ID_OPT="$2"; shift 2 ;;
        --secret-access-key)      AWS_SECRET_ACCESS_KEY_OPT="$2"; shift 2 ;;
        --session-token)          AWS_SESSION_TOKEN_OPT="$2"; shift 2 ;;
        -h|--help)                usage ;;
        *) echo -e "${RED}Unknown option: $1${NC}"; usage ;;
    esac
done

# ─── Build AWS CLI global args ──────────────────────────────────────────────
AWS_ARGS=(--region "${REGION}")
[[ -n "$AWS_PROFILE" ]]      && AWS_ARGS+=(--profile "${AWS_PROFILE}")
[[ -n "$AWS_ENDPOINT_URL" ]] && AWS_ARGS+=(--endpoint-url "${AWS_ENDPOINT_URL}")

[[ -n "$AWS_ACCESS_KEY_ID_OPT" ]]     && export AWS_ACCESS_KEY_ID="${AWS_ACCESS_KEY_ID_OPT}"
[[ -n "$AWS_SECRET_ACCESS_KEY_OPT" ]] && export AWS_SECRET_ACCESS_KEY="${AWS_SECRET_ACCESS_KEY_OPT}"
[[ -n "$AWS_SESSION_TOKEN_OPT" ]]     && export AWS_SESSION_TOKEN="${AWS_SESSION_TOKEN_OPT}"

awscli() { aws "${AWS_ARGS[@]}" "$@"; }

# ─── Get service details ────────────────────────────────────────────────────
SERVICE_JSON=$(awscli lightsail get-container-services \
    --service-name "${SERVICE_NAME}" --output json 2>/dev/null || echo "")

if [[ -z "$SERVICE_JSON" ]]; then
    echo -e "${RED}Service '${SERVICE_NAME}' not found in region ${REGION}${NC}"
    [[ -n "$AWS_PROFILE" ]] && echo "  Profile: ${AWS_PROFILE}"
    exit 1
fi

STATE=$(echo "${SERVICE_JSON}" | jq -r '.containerServices[0].state')
POWER=$(echo "${SERVICE_JSON}" | jq -r '.containerServices[0].power')
SCALE=$(echo "${SERVICE_JSON}" | jq -r '.containerServices[0].scale')
SERVICE_URL=$(echo "${SERVICE_JSON}" | jq -r '.containerServices[0].url // "N/A"')
CREATED=$(echo "${SERVICE_JSON}" | jq -r '.containerServices[0].createdAt')
CURRENT_IMAGE=$(echo "${SERVICE_JSON}" | jq -r '.containerServices[0].currentDeployment.containers["one-router"].image // "N/A"')
DEPLOY_STATE=$(echo "${SERVICE_JSON}" | jq -r '.containerServices[0].currentDeployment.state // "N/A"')
DEPLOY_VERSION=$(echo "${SERVICE_JSON}" | jq -r '.containerServices[0].currentDeployment.version // "N/A"')

echo -e "${CYAN}=== Lightsail Container Service: ${SERVICE_NAME} ===${NC}"
echo "  State:      ${STATE}"
echo "  Power:      ${POWER} × ${SCALE}"
echo "  URL:        ${SERVICE_URL}"
echo "  Region:     ${REGION}"
[[ -n "$AWS_PROFILE" ]] && echo "  Profile:    ${AWS_PROFILE}"
echo "  Image:      ${CURRENT_IMAGE}"
echo "  Deployment: v${DEPLOY_VERSION} (${DEPLOY_STATE})"
echo "  Created:    ${CREATED}"
echo ""

# ─── Health check ────────────────────────────────────────────────────────────
if [[ "$STATE" == "RUNNING" && "$SERVICE_URL" != "N/A" && "$SERVICE_URL" != "null" ]]; then
    echo -e "${CYAN}>>> Health Check${NC}"
    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 "${SERVICE_URL}health" 2>/dev/null || echo "000")
    if [[ "$HTTP_CODE" == "200" ]]; then
        echo -e "${GREEN}  /health => ${HTTP_CODE} OK${NC}"
        BODY=$(curl -s --max-time 10 "${SERVICE_URL}health" 2>/dev/null || echo "{}")
        echo "  Response: ${BODY}"
    else
        echo -e "${YELLOW}  /health => ${HTTP_CODE} (unhealthy or unreachable)${NC}"
    fi
else
    echo -e "${YELLOW}  Service is not RUNNING — skipping health check.${NC}"
fi
