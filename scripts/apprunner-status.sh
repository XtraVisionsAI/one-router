#!/usr/bin/env bash
set -euo pipefail

# Check App Runner service status
# Usage: ./scripts/apprunner-status.sh [OPTIONS]

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
Usage: apprunner-status.sh [OPTIONS]

Query App Runner service status and run a health check.

Options:
  -r, --region REGION             AWS region (default: us-east-1)
  -n, --name NAME                 Service name (default: one-router)

AWS authentication:
  --profile PROFILE               AWS CLI named profile
  --endpoint-url URL              Custom AWS endpoint (e.g. LocalStack)
  --access-key-id ID              AWS access key ID
  --secret-access-key KEY         AWS secret access key
  --session-token TOKEN           AWS session token (temporary credentials)

  -h, --help                      Show this help

Environment variables (also respected):
  AWS_PROFILE, AWS_ENDPOINT_URL, AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY, AWS_SESSION_TOKEN, AWS_REGION

Examples:
  ./scripts/apprunner-status.sh
  ./scripts/apprunner-status.sh --profile prod -r ap-southeast-1
  ./scripts/apprunner-status.sh -n my-gateway --profile staging
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
if [[ -n "$AWS_PROFILE" ]]; then
    AWS_ARGS+=(--profile "${AWS_PROFILE}")
fi
if [[ -n "$AWS_ENDPOINT_URL" ]]; then
    AWS_ARGS+=(--endpoint-url "${AWS_ENDPOINT_URL}")
fi

# Export explicit credentials into env
if [[ -n "$AWS_ACCESS_KEY_ID_OPT" ]]; then
    export AWS_ACCESS_KEY_ID="${AWS_ACCESS_KEY_ID_OPT}"
fi
if [[ -n "$AWS_SECRET_ACCESS_KEY_OPT" ]]; then
    export AWS_SECRET_ACCESS_KEY="${AWS_SECRET_ACCESS_KEY_OPT}"
fi
if [[ -n "$AWS_SESSION_TOKEN_OPT" ]]; then
    export AWS_SESSION_TOKEN="${AWS_SESSION_TOKEN_OPT}"
fi

# Helper: run aws cli with global args
awscli() { aws "${AWS_ARGS[@]}" "$@"; }

# ─── Find service ───────────────────────────────────────────────────────────
SERVICE_ARN=$(awscli apprunner list-services \
    --query "ServiceSummaryList[?ServiceName=='${SERVICE_NAME}'].ServiceArn" \
    --output text 2>/dev/null)

if [[ -z "$SERVICE_ARN" || "$SERVICE_ARN" == "None" ]]; then
    echo -e "${RED}Service '${SERVICE_NAME}' not found in region ${REGION}${NC}"
    [[ -n "$AWS_PROFILE" ]] && echo "  Profile: ${AWS_PROFILE}"
    exit 1
fi

# ─── Get service details ────────────────────────────────────────────────────
SERVICE_JSON=$(awscli apprunner describe-service --service-arn "${SERVICE_ARN}" --output json)

STATUS=$(echo "${SERVICE_JSON}" | jq -r '.Service.Status')
SERVICE_URL=$(echo "${SERVICE_JSON}" | jq -r '.Service.ServiceUrl')
CREATED=$(echo "${SERVICE_JSON}" | jq -r '.Service.CreatedAt')
UPDATED=$(echo "${SERVICE_JSON}" | jq -r '.Service.UpdatedAt')
IMAGE_ID=$(echo "${SERVICE_JSON}" | jq -r '.Service.SourceConfiguration.ImageRepository.ImageIdentifier // "N/A"')

echo -e "${CYAN}=== App Runner Service: ${SERVICE_NAME} ===${NC}"
echo "  Status:     ${STATUS}"
echo "  URL:        https://${SERVICE_URL}"
echo "  Region:     ${REGION}"
[[ -n "$AWS_PROFILE" ]] && echo "  Profile:    ${AWS_PROFILE}"
echo "  ARN:        ${SERVICE_ARN}"
echo "  Image:      ${IMAGE_ID}"
echo "  Created:    ${CREATED}"
echo "  Updated:    ${UPDATED}"
echo ""

# ─── Health check ────────────────────────────────────────────────────────────
if [[ "$STATUS" == "RUNNING" ]]; then
    echo -e "${CYAN}>>> Health Check${NC}"
    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 "https://${SERVICE_URL}/health" 2>/dev/null || echo "000")
    if [[ "$HTTP_CODE" == "200" ]]; then
        echo -e "${GREEN}  /health => ${HTTP_CODE} OK${NC}"
        BODY=$(curl -s --max-time 10 "https://${SERVICE_URL}/health" 2>/dev/null || echo "{}")
        echo "  Response: ${BODY}"
    else
        echo -e "${YELLOW}  /health => ${HTTP_CODE} (unhealthy or unreachable)${NC}"
    fi
else
    echo -e "${YELLOW}  Service is not RUNNING — skipping health check.${NC}"
fi
