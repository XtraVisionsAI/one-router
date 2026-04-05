#!/usr/bin/env bash
set -euo pipefail

# Deploy One Router to AWS Lightsail Container Service
# Usage: ./scripts/deploy-lightsail.sh [OPTIONS]

# ─── Defaults ───────────────────────────────────────────────────────────────
REGION="us-east-1"
SERVICE_NAME="one-router"
DATABASE=""
CREATE=false
IMAGE=""
BUILD=false
BUILD_PLATFORM=""
DOCKERFILE="docker/Dockerfile"
TAG="latest"
DOCKERHUB_IMAGE="xtravisions/one-router"
POWER="micro"        # nano (0.25 vCPU/0.5GB), micro (1 vCPU/2GB), small (2/4), medium (4/8), large (8/16), xlarge (16/32)
SCALE=1              # Number of container nodes (1–20)

# Application secrets
MASTER_API_KEY=""
ENCRYPTION_KEY=""

# AWS authentication
AWS_PROFILE=""
AWS_ENDPOINT_URL=""
AWS_ACCESS_KEY_ID_OPT=""
AWS_SECRET_ACCESS_KEY_OPT=""
AWS_SESSION_TOKEN_OPT=""

# ─── Colors ─────────────────────────────────────────────────────────────────
RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; CYAN='\033[0;36m'; NC='\033[0m'
info()  { echo -e "${CYAN}>>>${NC} $*"; }
ok()    { echo -e "${GREEN}  ✓${NC} $*"; }
warn()  { echo -e "${YELLOW}  ⚠${NC} $*"; }
err()   { echo -e "${RED}  ✗${NC} $*" >&2; }

# ─── Parse arguments ────────────────────────────────────────────────────────
usage() {
    cat <<'EOF'
Usage: deploy-lightsail.sh [OPTIONS]

Deploy One Router to AWS Lightsail Container Service.

Image source (choose one):
  --build                   Build Docker image locally and push to Lightsail
  --image IMAGE             Pull a pre-built image and push to Lightsail
  (default)                 Pull from DockerHub (xtravisions/one-router) and push

Build options:
  --dockerfile FILE         Dockerfile path (default: docker/Dockerfile, --build only)
  --platform PLATFORM       Docker platform (e.g. linux/amd64)

Service configuration:
  -r, --region REGION       AWS region (default: us-east-1)
  -n, --name NAME           Service name (default: one-router)
  --database URL            DATABASE env var (default: sqlite:///app/data/gateway.db)
  --tag TAG                 Image tag (default: latest)
  --power POWER             Container power: nano, micro (default), small, medium, large, xlarge
  --scale N                 Number of nodes, 1–20 (default: 1)
  --create                  Create new service (vs update existing)
  --master-api-key KEY      MASTER_API_KEY for the gateway
  --encryption-key KEY      ENCRYPTION_KEY for credential encryption

AWS authentication:
  --profile PROFILE         AWS CLI named profile
  --endpoint-url URL        Custom AWS endpoint
  --access-key-id ID        AWS access key ID
  --secret-access-key KEY   AWS secret access key
  --session-token TOKEN     AWS session token

  -h, --help                Show this help

Environment variables (also respected):
  AWS_PROFILE, AWS_ENDPOINT_URL, AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY, AWS_SESSION_TOKEN, AWS_REGION

Examples:
  # Create with defaults (micro, 1 node, SQLite)
  ./scripts/deploy-lightsail.sh --create

  # Create with specific power and scale
  ./scripts/deploy-lightsail.sh --create --power small --scale 2

  # Build locally and deploy
  ./scripts/deploy-lightsail.sh --build --platform linux/amd64 --create

  # Pull specific image and deploy
  ./scripts/deploy-lightsail.sh --image xtravisions/one-router:v0.10.0 --create

  # Update existing service with new image
  ./scripts/deploy-lightsail.sh

  # Deploy with secrets
  ./scripts/deploy-lightsail.sh --create \
    --master-api-key sk-your-secret --encryption-key your-aes256-key
EOF
    exit 0
}

while [[ $# -gt 0 ]]; do
    case "$1" in
        -r|--region)              REGION="$2"; shift 2 ;;
        -n|--name)                SERVICE_NAME="$2"; shift 2 ;;
        --database)               DATABASE="$2"; shift 2 ;;
        --create)                 CREATE=true; shift ;;
        --image)                  IMAGE="$2"; shift 2 ;;
        --build)                  BUILD=true; shift ;;
        --dockerfile)             DOCKERFILE="$2"; shift 2 ;;
        --platform)               BUILD_PLATFORM="$2"; shift 2 ;;
        --tag)                    TAG="$2"; shift 2 ;;
        --power)                  POWER="$2"; shift 2 ;;
        --scale)                  SCALE="$2"; shift 2 ;;
        --master-api-key)         MASTER_API_KEY="$2"; shift 2 ;;
        --encryption-key)         ENCRYPTION_KEY="$2"; shift 2 ;;
        --profile)                AWS_PROFILE="$2"; shift 2 ;;
        --endpoint-url)           AWS_ENDPOINT_URL="$2"; shift 2 ;;
        --access-key-id)          AWS_ACCESS_KEY_ID_OPT="$2"; shift 2 ;;
        --secret-access-key)      AWS_SECRET_ACCESS_KEY_OPT="$2"; shift 2 ;;
        --session-token)          AWS_SESSION_TOKEN_OPT="$2"; shift 2 ;;
        -h|--help)                usage ;;
        *) err "Unknown option: $1"; usage ;;
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

if [[ -n "$AWS_ACCESS_KEY_ID_OPT" ]]; then
    export AWS_ACCESS_KEY_ID="${AWS_ACCESS_KEY_ID_OPT}"
fi
if [[ -n "$AWS_SECRET_ACCESS_KEY_OPT" ]]; then
    export AWS_SECRET_ACCESS_KEY="${AWS_SECRET_ACCESS_KEY_OPT}"
fi
if [[ -n "$AWS_SESSION_TOKEN_OPT" ]]; then
    export AWS_SESSION_TOKEN="${AWS_SESSION_TOKEN_OPT}"
fi

awscli() { aws "${AWS_ARGS[@]}" "$@"; }

# ─── Validate ───────────────────────────────────────────────────────────────
if [[ "$BUILD" == "true" && -n "$IMAGE" ]]; then
    err "--build and --image are mutually exclusive"; exit 1
fi

# Validate power
case "$POWER" in
    nano|micro|small|medium|large|xlarge) ;;
    *) err "Invalid --power: $POWER (must be nano, micro, small, medium, large, or xlarge)"; exit 1 ;;
esac

# ─── Resolve DATABASE ───────────────────────────────────────────────────────
if [[ -z "$DATABASE" ]]; then
    DATABASE="sqlite:///app/data/gateway.db"
fi

# ─── Summary ────────────────────────────────────────────────────────────────
echo ""
echo -e "${CYAN}=== One Router — Lightsail Deploy ===${NC}"
echo "  Region:    ${REGION}"
echo "  Service:   ${SERVICE_NAME}"
echo "  Power:     ${POWER}"
echo "  Scale:     ${SCALE}"
echo "  Database:  ${DATABASE}"
[[ -n "$AWS_PROFILE" ]] && echo "  Profile:   ${AWS_PROFILE}"
if [[ "$BUILD" == "true" ]]; then
    echo "  Source:    local build (${DOCKERFILE})"
elif [[ -n "$IMAGE" ]]; then
    echo "  Source:    ${IMAGE}"
else
    echo "  Source:    ${DOCKERHUB_IMAGE}:${TAG}"
fi
echo ""

# ═══════════════════════════════════════════════════════════════════════════════
# Step 1: Create or verify Lightsail container service
# ═══════════════════════════════════════════════════════════════════════════════
if [[ "$CREATE" == "true" ]]; then
    info "Step 1: Creating Lightsail container service..."

    if awscli lightsail get-container-services --service-name "${SERVICE_NAME}" >/dev/null 2>&1; then
        warn "Service '${SERVICE_NAME}' already exists — will update deployment."
    else
        awscli lightsail create-container-service \
            --service-name "${SERVICE_NAME}" \
            --power "${POWER}" \
            --scale "${SCALE}" \
            --output json >/dev/null
        ok "Created container service: ${SERVICE_NAME} (${POWER} × ${SCALE})"

        # Wait for service to become ready
        info "Waiting for service to become READY (this may take 1–2 minutes)..."
        for i in $(seq 1 60); do
            STATE=$(awscli lightsail get-container-services \
                --service-name "${SERVICE_NAME}" \
                --query 'containerServices[0].state' --output text 2>/dev/null || echo "UNKNOWN")
            if [[ "$STATE" == "READY" || "$STATE" == "RUNNING" ]]; then
                ok "Service state: ${STATE}"
                break
            fi
            if [[ "$STATE" == "DISABLED" ]]; then
                err "Service is DISABLED"; exit 1
            fi
            printf "  Waiting... (%s) state=%s\r" "$i" "$STATE"
            sleep 5
        done
    fi
else
    info "Step 1: Verifying existing service..."
    if ! awscli lightsail get-container-services --service-name "${SERVICE_NAME}" >/dev/null 2>&1; then
        err "Service '${SERVICE_NAME}' not found. Use --create for new services."
        exit 1
    fi
    ok "Service exists: ${SERVICE_NAME}"
fi

# ═══════════════════════════════════════════════════════════════════════════════
# Step 2: Prepare and push image
# ═══════════════════════════════════════════════════════════════════════════════
info "Step 2: Preparing container image..."

LOCAL_TAG="one-router-lightsail:deploy"

if [[ "$BUILD" == "true" ]]; then
    # Build locally
    SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
    PROJECT_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"

    BUILD_CMD=(docker build -f "${DOCKERFILE}" -t "${LOCAL_TAG}")
    if [[ -n "$BUILD_PLATFORM" ]]; then
        BUILD_CMD+=(--platform "${BUILD_PLATFORM}")
    fi
    BUILD_CMD+=("${PROJECT_ROOT}")

    echo "  Building: ${BUILD_CMD[*]}"
    "${BUILD_CMD[@]}"
    ok "Image built: ${LOCAL_TAG}"
elif [[ -n "$IMAGE" ]]; then
    # Pull specified image
    PULL_CMD=(docker pull)
    if [[ -n "$BUILD_PLATFORM" ]]; then
        PULL_CMD+=(--platform "${BUILD_PLATFORM}")
    fi
    PULL_CMD+=("${IMAGE}")
    echo "  Pulling: ${IMAGE}"
    "${PULL_CMD[@]}"
    docker tag "${IMAGE}" "${LOCAL_TAG}"
    ok "Pulled and tagged: ${LOCAL_TAG}"
else
    # Pull from DockerHub
    SRC="${DOCKERHUB_IMAGE}:${TAG}"
    PULL_CMD=(docker pull)
    if [[ -n "$BUILD_PLATFORM" ]]; then
        PULL_CMD+=(--platform "${BUILD_PLATFORM}")
    fi
    PULL_CMD+=("${SRC}")
    echo "  Pulling: ${SRC}"
    "${PULL_CMD[@]}"
    docker tag "${SRC}" "${LOCAL_TAG}"
    ok "Pulled and tagged: ${LOCAL_TAG}"
fi

# Push to Lightsail
info "Pushing image to Lightsail..."
PUSH_OUTPUT=$(awscli lightsail push-container-image \
    --service-name "${SERVICE_NAME}" \
    --label "one-router" \
    --image "${LOCAL_TAG}" 2>&1)

# Extract the Lightsail image name (e.g. :one-router.one-router.12)
LIGHTSAIL_IMAGE=$(echo "${PUSH_OUTPUT}" | grep -oE ':[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+\.[0-9]+' | head -1)
if [[ -z "$LIGHTSAIL_IMAGE" ]]; then
    err "Failed to parse Lightsail image name from push output:"
    echo "${PUSH_OUTPUT}"
    exit 1
fi
ok "Pushed: ${LIGHTSAIL_IMAGE}"

# ═══════════════════════════════════════════════════════════════════════════════
# Step 3: Deploy container
# ═══════════════════════════════════════════════════════════════════════════════
info "Step 3: Creating deployment..."

# Build environment map
ENV_MAP='"DATABASE":"'"${DATABASE}"'","PORT":"8000","LOG_LEVEL":"info"'
[[ -n "$MASTER_API_KEY" ]] && ENV_MAP+=',"MASTER_API_KEY":"'"${MASTER_API_KEY}"'"'
[[ -n "$ENCRYPTION_KEY" ]] && ENV_MAP+=',"ENCRYPTION_KEY":"'"${ENCRYPTION_KEY}"'"'

CONTAINERS=$(cat <<JSON
{
  "one-router": {
    "image": "${LIGHTSAIL_IMAGE}",
    "ports": {
      "8000": "HTTP"
    },
    "environment": {
      ${ENV_MAP}
    }
  }
}
JSON
)

PUBLIC_ENDPOINT=$(cat <<JSON
{
  "containerName": "one-router",
  "containerPort": 8000,
  "healthCheck": {
    "path": "/health",
    "intervalSeconds": 10,
    "timeoutSeconds": 5,
    "healthyThreshold": 2,
    "unhealthyThreshold": 5
  }
}
JSON
)

awscli lightsail create-container-service-deployment \
    --service-name "${SERVICE_NAME}" \
    --containers "${CONTAINERS}" \
    --public-endpoint "${PUBLIC_ENDPOINT}" \
    --output json >/dev/null

ok "Deployment created"

# ═══════════════════════════════════════════════════════════════════════════════
# Step 4: Wait for deployment and show result
# ═══════════════════════════════════════════════════════════════════════════════
info "Step 4: Waiting for deployment to activate..."

for i in $(seq 1 120); do
    DEPLOY_STATE=$(awscli lightsail get-container-services \
        --service-name "${SERVICE_NAME}" \
        --query 'containerServices[0].state' --output text 2>/dev/null || echo "UNKNOWN")

    if [[ "$DEPLOY_STATE" == "RUNNING" ]]; then
        ok "Deployment active"
        break
    fi
    if [[ "$DEPLOY_STATE" == "DISABLED" ]]; then
        err "Service entered DISABLED state"; exit 1
    fi
    if [[ "$i" -eq 120 ]]; then
        warn "Timed out waiting for deployment (state: ${DEPLOY_STATE})"
        warn "Check status: ./scripts/lightsail-status.sh -r ${REGION} -n ${SERVICE_NAME}"
        break
    fi
    printf "  Waiting... (%s) state=%s\r" "$i" "$DEPLOY_STATE"
    sleep 5
done

# Get service URL
SERVICE_URL=$(awscli lightsail get-container-services \
    --service-name "${SERVICE_NAME}" \
    --query 'containerServices[0].url' --output text 2>/dev/null || echo "")

# ═══════════════════════════════════════════════════════════════════════════════
# Done
# ═══════════════════════════════════════════════════════════════════════════════
echo ""
echo -e "${GREEN}=== Deploy Complete ===${NC}"
echo "  Service:  ${SERVICE_NAME}"
echo "  Power:    ${POWER} × ${SCALE}"
echo "  Image:    ${LIGHTSAIL_IMAGE}"
if [[ -n "$SERVICE_URL" && "$SERVICE_URL" != "None" ]]; then
    echo "  URL:      ${SERVICE_URL}"
fi
echo ""

if [[ "$CREATE" == "true" ]]; then
    MISSING_SECRETS=()
    [[ -z "$MASTER_API_KEY" ]] && MISSING_SECRETS+=("MASTER_API_KEY")
    [[ -z "$ENCRYPTION_KEY" ]] && MISSING_SECRETS+=("ENCRYPTION_KEY")

    if [[ ${#MISSING_SECRETS[@]} -gt 0 ]]; then
        echo -e "${YELLOW}=== ACTION REQUIRED ===${NC}"
        echo "Set these env vars by re-deploying with flags:"
        for s in "${MISSING_SECRETS[@]}"; do
            echo "  - ${s}  (--$(echo "${s}" | tr '[:upper:]_' '[:lower:]-'))"
        done
        echo ""
        echo "Console: https://lightsail.aws.amazon.com/ls/webapp/${REGION}/container-services/${SERVICE_NAME}/deployments"
    fi
fi
echo "Status:  ./scripts/lightsail-status.sh -r ${REGION} -n ${SERVICE_NAME}"
