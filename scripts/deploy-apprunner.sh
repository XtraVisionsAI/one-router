#!/usr/bin/env bash
set -euo pipefail

# Deploy One Router to AWS App Runner
# Usage: ./scripts/deploy-apprunner.sh [OPTIONS]

# ─── Defaults ───────────────────────────────────────────────────────────────
REGION="us-east-1"
SERVICE_NAME="one-router"
DATABASE=""
CREATE=false
IMAGE=""
BUILD=false
BUILD_PLATFORM=""
DOCKERFILE="docker/Dockerfile"
ECR_REPO_NAME="one-router"
TAG="latest"
DOCKERHUB_IMAGE="xtravisions/one-router"
PTC_PREFIX="docker-hub"      # ECR Pull Through Cache prefix

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
Usage: deploy-apprunner.sh [OPTIONS]

Deploy One Router to AWS App Runner via private ECR.

Image source (choose one):
  --build                   Build Docker image locally and push to private ECR
  --image IMAGE             Pull a pre-built image and push to private ECR
  (default)                 Use ECR Pull Through Cache to sync from DockerHub automatically

Build options (only with --build):
  --dockerfile FILE         Dockerfile path (default: docker/Dockerfile)
  --platform PLATFORM       Docker build platform (e.g. linux/amd64, linux/arm64)

Service configuration:
  -r, --region REGION       AWS region (default: us-east-1)
  -n, --name NAME           Service name (default: one-router)
  --database URL            DATABASE for the gateway (default: dynamodb://<REGION>)
                            Examples: dynamodb://us-east-1, postgres://user:pass@host/db
  --tag TAG                 Image tag (default: latest)
  --create                  Create new service (vs update existing)

AWS authentication:
  --profile PROFILE         AWS CLI named profile (maps to aws --profile)
  --endpoint-url URL        Custom AWS endpoint (e.g. http://localhost:4566 for LocalStack)
  --access-key-id ID        AWS access key ID (overrides env/profile)
  --secret-access-key KEY   AWS secret access key (overrides env/profile)
  --session-token TOKEN     AWS session token for temporary credentials

  -h, --help                Show this help

Environment variables (also respected):
  AWS_PROFILE               Equivalent to --profile
  AWS_ENDPOINT_URL          Equivalent to --endpoint-url
  AWS_ACCESS_KEY_ID         Equivalent to --access-key-id
  AWS_SECRET_ACCESS_KEY     Equivalent to --secret-access-key
  AWS_SESSION_TOKEN         Equivalent to --session-token
  AWS_REGION                Equivalent to --region

Examples:
  # DynamoDB (default) — no --database needed
  ./scripts/deploy-apprunner.sh --profile prod --create

  # PostgreSQL
  ./scripts/deploy-apprunner.sh --create --database postgres://user:pass@host:5432/gateway

  # Use SSO profile + specific region
  ./scripts/deploy-apprunner.sh --profile my-sso -r ap-southeast-1 --build --create

  # Use explicit credentials (CI/CD)
  ./scripts/deploy-apprunner.sh \
    --access-key-id AKIA... --secret-access-key ... \
    --build --create

  # Build locally and push to private ECR
  ./scripts/deploy-apprunner.sh --build --create

  # Pull specific DockerHub image and push to private ECR
  ./scripts/deploy-apprunner.sh --image xtravisions/one-router:v0.1.0 --create
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
# These are appended to every `aws` invocation.
AWS_ARGS=(--region "${REGION}")
if [[ -n "$AWS_PROFILE" ]]; then
    AWS_ARGS+=(--profile "${AWS_PROFILE}")
fi
if [[ -n "$AWS_ENDPOINT_URL" ]]; then
    AWS_ARGS+=(--endpoint-url "${AWS_ENDPOINT_URL}")
fi

# Export explicit credentials into env so both aws cli and docker login pick them up
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

# ─── Validate ───────────────────────────────────────────────────────────────
if [[ "$BUILD" == "true" && -n "$IMAGE" ]]; then
    err "--build and --image are mutually exclusive"; exit 1
fi

# ─── Resolve AWS account ────────────────────────────────────────────────────
ACCOUNT_ID=$(awscli sts get-caller-identity --query Account --output text)
ECR_PRIVATE_URI="${ACCOUNT_ID}.dkr.ecr.${REGION}.amazonaws.com/${ECR_REPO_NAME}"

# Determine image source mode
if [[ "$BUILD" == "true" ]]; then
    MODE="build"
    DEPLOY_IMAGE="${ECR_PRIVATE_URI}:${TAG}"
elif [[ -n "$IMAGE" ]]; then
    MODE="pull"
    DEPLOY_IMAGE="${ECR_PRIVATE_URI}:${TAG}"
else
    MODE="ptc"
    # Pull Through Cache image path: <account>.dkr.ecr.<region>.amazonaws.com/<prefix>/<upstream-repo>:<tag>
    PTC_IMAGE_URI="${ACCOUNT_ID}.dkr.ecr.${REGION}.amazonaws.com/${PTC_PREFIX}/${DOCKERHUB_IMAGE}"
    DEPLOY_IMAGE="${PTC_IMAGE_URI}:${TAG}"
fi

echo ""
echo -e "${CYAN}=== One Router — App Runner Deploy ===${NC}"
echo "  Region:       ${REGION}"
echo "  Service:      ${SERVICE_NAME}"
echo "  Account:      ${ACCOUNT_ID}"
echo "  Deploy Image: ${DEPLOY_IMAGE}"
[[ -n "$AWS_PROFILE" ]] && echo "  AWS Profile:  ${AWS_PROFILE}"
case "$MODE" in
    build) echo "  Source:       local build (${DOCKERFILE})" ;;
    pull)  echo "  Source:       ${IMAGE} (pull & push)" ;;
    ptc)   echo "  Source:       DockerHub via ECR Pull Through Cache" ;;
esac
echo ""

# ═══════════════════════════════════════════════════════════════════════════════
# Step 1: Prepare image in private ECR
# ═══════════════════════════════════════════════════════════════════════════════
info "Step 1: Preparing image in private ECR..."

# Login to private ECR (needed for all modes)
awscli ecr get-login-password \
    | docker login --username AWS --password-stdin \
      "${ACCOUNT_ID}.dkr.ecr.${REGION}.amazonaws.com" 2>/dev/null
ok "Logged in to private ECR"

case "$MODE" in
    build)
        # ── Build locally, push to private ECR ─────────────────────────────
        SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
        PROJECT_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"

        # Ensure ECR repo exists
        awscli ecr describe-repositories \
            --repository-names "${ECR_REPO_NAME}" >/dev/null 2>&1 \
        || awscli ecr create-repository \
            --repository-name "${ECR_REPO_NAME}" \
            --image-scanning-configuration scanOnPush=true >/dev/null
        ok "ECR repository ready: ${ECR_REPO_NAME}"

        BUILD_CMD=(docker build -f "${DOCKERFILE}" -t "${DEPLOY_IMAGE}")
        if [[ -n "$BUILD_PLATFORM" ]]; then
            BUILD_CMD+=(--platform "${BUILD_PLATFORM}")
        fi
        BUILD_CMD+=("${PROJECT_ROOT}")

        echo "  Building: ${BUILD_CMD[*]}"
        "${BUILD_CMD[@]}"
        ok "Image built"

        docker push "${DEPLOY_IMAGE}"
        ok "Pushed: ${DEPLOY_IMAGE}"
        ;;

    pull)
        # ── Pull existing image, re-tag, push to private ECR ───────────────
        awscli ecr describe-repositories \
            --repository-names "${ECR_REPO_NAME}" >/dev/null 2>&1 \
        || awscli ecr create-repository \
            --repository-name "${ECR_REPO_NAME}" \
            --image-scanning-configuration scanOnPush=true >/dev/null
        ok "ECR repository ready: ${ECR_REPO_NAME}"

        echo "  Pulling: ${IMAGE}"
        docker pull "${IMAGE}"
        docker tag "${IMAGE}" "${DEPLOY_IMAGE}"
        docker push "${DEPLOY_IMAGE}"
        ok "Pushed: ${DEPLOY_IMAGE}"
        ;;

    ptc)
        # ── ECR Pull Through Cache — auto-sync from DockerHub ──────────────
        # Check if PTC rule for docker.io already exists
        if ! awscli ecr describe-pull-through-cache-rules \
                --ecr-repository-prefixes "${PTC_PREFIX}" >/dev/null 2>&1; then

            echo "  Creating Pull Through Cache rule (${PTC_PREFIX} -> docker.io)..."
            warn "If your DockerHub repo is private, create a secret first:"
            warn "  aws secretsmanager create-secret --name ecr-pullthroughcache/docker-hub \\"
            warn "    --secret-string '{\"username\":\"...\",\"accessToken\":\"...\"}'"
            echo ""

            PTC_CREATE_ARGS=(
                --ecr-repository-prefix "${PTC_PREFIX}"
                --upstream-registry docker-hub
            )

            # Check if a secret for DockerHub credentials exists
            SECRET_ARN=$(awscli secretsmanager describe-secret \
                --secret-id "ecr-pullthroughcache/docker-hub" \
                --query 'ARN' --output text 2>/dev/null || echo "")
            if [[ -n "$SECRET_ARN" && "$SECRET_ARN" != "None" ]]; then
                PTC_CREATE_ARGS+=(--credential-arn "${SECRET_ARN}")
                ok "Using DockerHub credentials from Secrets Manager"
            fi

            awscli ecr create-pull-through-cache-rule "${PTC_CREATE_ARGS[@]}" >/dev/null
            ok "Pull Through Cache rule created: ${PTC_PREFIX} -> docker.io"
        else
            ok "Pull Through Cache rule exists: ${PTC_PREFIX}"
        fi

        # Trigger a cache pull so the image is available in ECR.
        # App Runner will pull via ECR, which triggers the PTC sync automatically.
        # But we do an explicit pull here to verify the image resolves.
        echo "  Verifying image via PTC: ${DEPLOY_IMAGE}"
        if docker pull "${DEPLOY_IMAGE}" 2>/dev/null; then
            ok "Image cached in ECR: ${DEPLOY_IMAGE}"
        else
            warn "Could not pull locally (expected if running outside AWS)."
            warn "App Runner will trigger the PTC sync on first deploy."
        fi
        ;;
esac

# ═══════════════════════════════════════════════════════════════════════════════
# Step 2: IAM Roles
# ═══════════════════════════════════════════════════════════════════════════════
info "Step 2: Ensuring IAM roles..."

ACCESS_ROLE_NAME="${SERVICE_NAME}-ecr-access"
INSTANCE_ROLE_NAME="${SERVICE_NAME}-instance"
ACCESS_ROLE_ARN="arn:aws:iam::${ACCOUNT_ID}:role/${ACCESS_ROLE_NAME}"
INSTANCE_ROLE_ARN="arn:aws:iam::${ACCOUNT_ID}:role/${INSTANCE_ROLE_NAME}"

# Access Role (App Runner → ECR)
ACCESS_ROLE_TRUST='{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": {"Service": "build.apprunner.amazonaws.com"},
    "Action": "sts:AssumeRole"
  }]
}'

if ! awscli iam get-role --role-name "${ACCESS_ROLE_NAME}" >/dev/null 2>&1; then
    awscli iam create-role \
        --role-name "${ACCESS_ROLE_NAME}" \
        --assume-role-policy-document "${ACCESS_ROLE_TRUST}" >/dev/null
    awscli iam attach-role-policy \
        --role-name "${ACCESS_ROLE_NAME}" \
        --policy-arn "arn:aws:iam::aws:policy/service-role/AWSAppRunnerServicePolicyForECRAccess"
    ok "Created ECR access role: ${ACCESS_ROLE_NAME}"
else
    ok "ECR access role exists: ${ACCESS_ROLE_NAME}"
fi

# Instance Role (Bedrock + DynamoDB)
INSTANCE_ROLE_TRUST='{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": {"Service": "tasks.apprunner.amazonaws.com"},
    "Action": "sts:AssumeRole"
  }]
}'

INSTANCE_POLICY=$(cat <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "bedrock:InvokeModel",
        "bedrock:InvokeModelWithResponseStream"
      ],
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "dynamodb:GetItem",
        "dynamodb:PutItem",
        "dynamodb:UpdateItem",
        "dynamodb:DeleteItem",
        "dynamodb:Query",
        "dynamodb:Scan",
        "dynamodb:CreateTable",
        "dynamodb:DescribeTable"
      ],
      "Resource": "arn:aws:dynamodb:*:${ACCOUNT_ID}:table/one_router_*"
    }
  ]
}
POLICY
)

if ! awscli iam get-role --role-name "${INSTANCE_ROLE_NAME}" >/dev/null 2>&1; then
    awscli iam create-role \
        --role-name "${INSTANCE_ROLE_NAME}" \
        --assume-role-policy-document "${INSTANCE_ROLE_TRUST}" >/dev/null
    awscli iam put-role-policy \
        --role-name "${INSTANCE_ROLE_NAME}" \
        --policy-name "${SERVICE_NAME}-permissions" \
        --policy-document "${INSTANCE_POLICY}"
    ok "Created instance role: ${INSTANCE_ROLE_NAME}"
    warn "Waiting 10s for IAM propagation..."
    sleep 10
else
    ok "Instance role exists: ${INSTANCE_ROLE_NAME}"
fi

# ═══════════════════════════════════════════════════════════════════════════════
# Step 3: Resolve DATABASE
# ═══════════════════════════════════════════════════════════════════════════════
# Default to DynamoDB in the deploy region if not specified
if [[ -z "$DATABASE" ]]; then
    DATABASE="dynamodb://${REGION}"
fi
EFFECTIVE_DB="${DATABASE}"
info "Database: ${EFFECTIVE_DB}"

# ═══════════════════════════════════════════════════════════════════════════════
# Step 4: Create / Update App Runner Service
# ═══════════════════════════════════════════════════════════════════════════════
info "Step 4: Configuring App Runner service..."

SOURCE_CONFIG=$(cat <<JSON
{
  "ImageRepository": {
    "ImageIdentifier": "${DEPLOY_IMAGE}",
    "ImageConfiguration": {
      "Port": "8000",
      "RuntimeEnvironmentVariables": {
        "DATABASE": "${EFFECTIVE_DB}",
        "PORT": "8000",
        "LOG_LEVEL": "info",
        "AWS_REGION": "${REGION}"
      }
    },
    "ImageRepositoryType": "ECR"
  },
  "AuthenticationConfiguration": {
    "AccessRoleArn": "${ACCESS_ROLE_ARN}"
  }
}
JSON
)

INSTANCE_CONFIG=$(cat <<JSON
{
  "Cpu": "1 vCPU",
  "Memory": "2 GB",
  "InstanceRoleArn": "${INSTANCE_ROLE_ARN}"
}
JSON
)

HEALTH_CHECK_CONFIG=$(cat <<JSON
{
  "Protocol": "HTTP",
  "Path": "/health",
  "Interval": 10,
  "Timeout": 5,
  "HealthyThreshold": 1,
  "UnhealthyThreshold": 5
}
JSON
)

if [[ "$CREATE" == "true" ]]; then
    echo "  Creating new service: ${SERVICE_NAME}..."
    awscli apprunner create-service \
        --service-name "${SERVICE_NAME}" \
        --source-configuration "${SOURCE_CONFIG}" \
        --instance-configuration "${INSTANCE_CONFIG}" \
        --health-check-configuration "${HEALTH_CHECK_CONFIG}" \
        --output json > /tmp/apprunner-result.json

    SERVICE_ARN=$(jq -r '.Service.ServiceArn' /tmp/apprunner-result.json)
    SERVICE_URL=$(jq -r '.Service.ServiceUrl' /tmp/apprunner-result.json)
else
    echo "  Updating service: ${SERVICE_NAME}..."
    SERVICE_ARN=$(awscli apprunner list-services \
        --query "ServiceSummaryList[?ServiceName=='${SERVICE_NAME}'].ServiceArn" \
        --output text)

    if [[ -z "$SERVICE_ARN" || "$SERVICE_ARN" == "None" ]]; then
        err "Service '${SERVICE_NAME}' not found. Use --create for new services."
        exit 1
    fi

    awscli apprunner update-service \
        --service-arn "${SERVICE_ARN}" \
        --source-configuration "${SOURCE_CONFIG}" \
        --instance-configuration "${INSTANCE_CONFIG}" \
        --health-check-configuration "${HEALTH_CHECK_CONFIG}" \
        --output json > /tmp/apprunner-result.json

    SERVICE_URL=$(jq -r '.Service.ServiceUrl' /tmp/apprunner-result.json)
fi

# ═══════════════════════════════════════════════════════════════════════════════
# Done
# ═══════════════════════════════════════════════════════════════════════════════
echo ""
echo -e "${GREEN}=== Deploy Complete ===${NC}"
echo "  Service:    ${SERVICE_NAME}"
echo "  ARN:        ${SERVICE_ARN}"
echo "  URL:        https://${SERVICE_URL}"
echo "  Image:      ${DEPLOY_IMAGE}"
echo ""
echo -e "${YELLOW}=== ACTION REQUIRED ===${NC}"
echo "Set these sensitive env vars in the AWS Console (or via aws apprunner update-service):"
echo "  - MASTER_API_KEY"
echo "  - ENCRYPTION_KEY"
echo ""
echo "Console: https://${REGION}.console.aws.amazon.com/apprunner/home?region=${REGION}"
echo "Status:  ./scripts/apprunner-status.sh -r ${REGION} -n ${SERVICE_NAME}"
