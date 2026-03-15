#!/usr/bin/env bash
set -euo pipefail

# Build multi-arch Docker images locally and optionally push to DockerHub.
# Mirrors what .github/workflows/release.yml does, but from your machine.
# Usage: ./scripts/docker-publish.sh --version v0.1.0 [OPTIONS]

# ─── Defaults ───────────────────────────────────────────────────────────────
VERSION=""
REPO="xtravisions/one-router"
PUSH=false
BUILDER_NAME="one-router-multiarch"
USE_CROSS=false
SKIP_BUILD=false

# ─── Colors ─────────────────────────────────────────────────────────────────
RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; CYAN='\033[0;36m'; NC='\033[0m'
info()  { echo -e "${CYAN}>>>${NC} $*"; }
ok()    { echo -e "${GREEN}  ✓${NC} $*"; }
warn()  { echo -e "${YELLOW}  ⚠${NC} $*"; }
err()   { echo -e "${RED}  ✗${NC} $*" >&2; }

# ─── Parse arguments ────────────────────────────────────────────────────────
usage() {
    cat <<'EOF'
Usage: docker-publish.sh --version TAG [OPTIONS]

Build multi-arch Docker images locally (via buildx) and optionally push to
DockerHub. Reproduces the CI release workflow from your machine.

Required:
  --version TAG           Image version tag (e.g. v0.1.0)

Options:
  --repo REPO             DockerHub repo (default: xtravisions/one-router)
  --push                  Actually push to DockerHub (default: build only)
  --builder NAME          Buildx builder name (default: one-router-multiarch)
  --cross                 Use `cross` to compile locally, then package with
                          Dockerfile.prebuilt (default: compile inside Docker
                          via multi-stage Dockerfile — no cross needed)
  --skip-build            (Only with --cross) Skip cross compilation, reuse
                          existing target/ binaries
  -h, --help              Show this help

Build modes:
  Default       Compile Rust inside Docker containers via buildx + QEMU.
                Works on any machine (macOS, Linux, CI). Slower but zero
                host-side Rust toolchain required.

  --cross       Cross-compile on the host with `cross`, then package the
                pre-built binaries into lightweight images. Faster if cross
                works on your machine.

Notes:
  - By default the script only builds locally (dry-run). Add --push to publish.
  - You must `docker login` before using --push.
  - Requires: docker, docker buildx (+ cross when using --cross)

Examples:
  # Build inside Docker (works everywhere, no cross needed)
  ./scripts/docker-publish.sh --version v0.1.0

  # Build and push to DockerHub
  ./scripts/docker-publish.sh --version v0.1.0 --push

  # Use cross compilation (faster if cross works on your host)
  ./scripts/docker-publish.sh --version v0.1.0 --cross

  # Skip cross compilation if you already ran it
  ./scripts/docker-publish.sh --version v0.1.0 --cross --skip-build
EOF
    exit 0
}

while [[ $# -gt 0 ]]; do
    case "$1" in
        --version)      VERSION="$2"; shift 2 ;;
        --repo)         REPO="$2"; shift 2 ;;
        --push)         PUSH=true; shift ;;
        --builder)      BUILDER_NAME="$2"; shift 2 ;;
        --cross)        USE_CROSS=true; shift ;;
        --skip-build)   SKIP_BUILD=true; shift ;;
        -h|--help)      usage ;;
        *) err "Unknown option: $1"; usage ;;
    esac
done

if [[ -z "$VERSION" ]]; then
    err "--version is required"; echo ""; usage
fi
if [[ "$SKIP_BUILD" == "true" && "$USE_CROSS" == "false" ]]; then
    err "--skip-build only works with --cross"; exit 1
fi

# ─── Resolve project root ──────────────────────────────────────────────────
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
cd "${PROJECT_ROOT}"

# ─── Prerequisites ──────────────────────────────────────────────────────────
info "Step 1: Checking prerequisites..."

missing=()
command -v docker >/dev/null 2>&1 || missing+=("docker")
if [[ "$USE_CROSS" == "true" && "$SKIP_BUILD" == "false" ]]; then
    command -v cross >/dev/null 2>&1 || missing+=("cross")
fi

if [[ ${#missing[@]} -gt 0 ]]; then
    err "Missing required tools: ${missing[*]}"
    [[ " ${missing[*]} " == *" cross "* ]] && echo "  Install: cargo install cross --git https://github.com/cross-rs/cross"
    exit 1
fi

if ! docker buildx version >/dev/null 2>&1; then
    err "docker buildx is not available"; exit 1
fi
ok "All tools available"

# ─── Summary ────────────────────────────────────────────────────────────────
MODE_LABEL="docker buildx (in-container compile)"
if [[ "$USE_CROSS" == "true" ]]; then
    MODE_LABEL="cross + Dockerfile.prebuilt"
fi

echo ""
echo -e "${CYAN}=== One Router — Docker Publish ===${NC}"
echo "  Version:    ${VERSION}"
echo "  Repo:       ${REPO}"
echo "  Mode:       ${MODE_LABEL}"
echo "  Push:       ${PUSH}"
echo "  Builder:    ${BUILDER_NAME}"
echo ""

# ─── Buildx builder ────────────────────────────────────────────────────────
info "Step 2: Setting up Buildx builder..."

# Detect host proxy settings
HOST_HTTP_PROXY="${HTTP_PROXY:-${http_proxy:-}}"
HOST_HTTPS_PROXY="${HTTPS_PROXY:-${https_proxy:-}}"
HAS_PROXY=false
if [[ -n "$HOST_HTTP_PROXY" || -n "$HOST_HTTPS_PROXY" ]]; then
    HAS_PROXY=true
fi

# When a proxy is detected, create the builder with --network=host so the
# BuildKit daemon shares the host network stack. This lets it reach
# 127.0.0.1:PORT proxies directly and inherits HTTP(S)_PROXY env vars
# without address rewriting or quoting issues.
BUILDER_EXTRA_ARGS=()
if [[ "$HAS_PROXY" == "true" ]]; then
    BUILDER_EXTRA_ARGS+=("--driver-opt" "network=host")
    BUILDER_EXTRA_ARGS+=("--driver-opt" "env.HTTP_PROXY=${HOST_HTTP_PROXY}")
    BUILDER_EXTRA_ARGS+=("--driver-opt" "env.HTTPS_PROXY=${HOST_HTTPS_PROXY}")
fi

need_recreate=false
if docker buildx inspect "${BUILDER_NAME}" >/dev/null 2>&1; then
    if [[ "$HAS_PROXY" == "true" ]]; then
        # Verify the existing builder has host networking + correct proxy
        existing_proxy=$(docker exec "buildx_buildkit_${BUILDER_NAME}0" sh -c 'echo $HTTP_PROXY' 2>/dev/null || echo "")
        if [[ "$existing_proxy" != "$HOST_HTTP_PROXY" ]]; then
            warn "Proxy settings changed — recreating builder"
            docker buildx rm "${BUILDER_NAME}" 2>/dev/null || true
            need_recreate=true
        else
            ok "Builder exists with correct proxy: ${BUILDER_NAME}"
        fi
    else
        ok "Builder exists: ${BUILDER_NAME}"
    fi
else
    need_recreate=true
fi

if [[ "$need_recreate" == "true" ]]; then
    docker buildx create --name "${BUILDER_NAME}" --use "${BUILDER_EXTRA_ARGS[@]}"
    if [[ "$HAS_PROXY" == "true" ]]; then
        ok "Created builder: ${BUILDER_NAME} (network=host, proxy=${HOST_HTTP_PROXY})"
    else
        ok "Created builder: ${BUILDER_NAME}"
    fi
fi
docker buildx use "${BUILDER_NAME}"

# Ensure QEMU is registered for cross-platform builds
docker run --rm --privileged tonistiigi/binfmt --install all >/dev/null 2>&1 || true
ok "QEMU binfmt registered"

# ─── Tag names ──────────────────────────────────────────────────────────────
TAG_AMD64="${REPO}:${VERSION}-amd64"
TAG_ARM64="${REPO}:${VERSION}-arm64"
TAG_VERSION="${REPO}:${VERSION}"
TAG_LATEST="${REPO}:latest"

# ═══════════════════════════════════════════════════════════════════════════════
# Build path: default (in-Docker compile) vs --cross
# ═══════════════════════════════════════════════════════════════════════════════
if [[ "$USE_CROSS" == "false" ]]; then
    # ── Default: buildx multi-stage build (Rust compiled inside Docker) ────
    info "Step 3: Building per-platform images (in-container compile)..."
    warn "This compiles Rust inside Docker via QEMU — may take a while."

    build_in_docker() {
        local platform="$1" tag="$2"
        local action="--load"
        if [[ "$PUSH" == "true" ]]; then
            action="--push"
        fi
        # Pass proxy settings as build args so RUN instructions (cargo, apt)
        # can reach the internet through the host proxy. Docker automatically
        # injects HTTP_PROXY/HTTPS_PROXY build-args into the RUN environment.
        local proxy_args=()
        if [[ -n "$HOST_HTTP_PROXY" ]]; then
            proxy_args+=(--build-arg "HTTP_PROXY=${HOST_HTTP_PROXY}")
            proxy_args+=(--build-arg "http_proxy=${HOST_HTTP_PROXY}")
        fi
        if [[ -n "$HOST_HTTPS_PROXY" ]]; then
            proxy_args+=(--build-arg "HTTPS_PROXY=${HOST_HTTPS_PROXY}")
            proxy_args+=(--build-arg "https_proxy=${HOST_HTTPS_PROXY}")
        fi
        docker buildx build \
            --builder "${BUILDER_NAME}" \
            --platform "${platform}" \
            --file docker/Dockerfile \
            --tag "${tag}" \
            "${proxy_args[@]}" \
            ${action} \
            .
    }

    echo "  Building amd64..."
    build_in_docker "linux/amd64" "${TAG_AMD64}"
    ok "${TAG_AMD64}"

    echo "  Building arm64..."
    build_in_docker "linux/arm64" "${TAG_ARM64}"
    ok "${TAG_ARM64}"

else
    # ── --cross: compile on host, then package with Dockerfile.prebuilt ────
    TARGETS=(
        "x86_64-unknown-linux-gnu:amd64"
        "aarch64-unknown-linux-gnu:arm64"
    )

    if [[ "$SKIP_BUILD" == "false" ]]; then
        info "Step 3a: Cross compiling release binaries..."
        for entry in "${TARGETS[@]}"; do
            target="${entry%%:*}"
            arch="${entry##*:}"
            echo "  Building ${target} (${arch})..."
            cross build --release --target "${target}"
            ok "${target}"
        done
    else
        info "Step 3a: Skipping cross compilation (--skip-build)"
        for entry in "${TARGETS[@]}"; do
            target="${entry%%:*}"
            bin="target/${target}/release/one-router"
            if [[ ! -f "$bin" ]]; then
                err "Binary not found: ${bin}"
                err "Run without --skip-build first, or cross build manually."
                exit 1
            fi
            ok "Found ${bin}"
        done
    fi

    info "Step 3b: Staging binaries..."
    rm -rf binaries
    mkdir -p binaries/amd64 binaries/arm64
    for entry in "${TARGETS[@]}"; do
        target="${entry%%:*}"
        arch="${entry##*:}"
        cp "target/${target}/release/one-router" "binaries/${arch}/one-router"
        ok "binaries/${arch}/one-router"
    done

    info "Step 3c: Building per-platform Docker images..."

    build_prebuilt() {
        local platform="$1" binary_path="$2" tag="$3"
        local action="--load"
        if [[ "$PUSH" == "true" ]]; then
            action="--push"
        fi
        local proxy_args=()
        if [[ -n "$HOST_HTTP_PROXY" ]]; then
            proxy_args+=(--build-arg "HTTP_PROXY=${HOST_HTTP_PROXY}")
        fi
        if [[ -n "$HOST_HTTPS_PROXY" ]]; then
            proxy_args+=(--build-arg "HTTPS_PROXY=${HOST_HTTPS_PROXY}")
        fi
        docker buildx build \
            --builder "${BUILDER_NAME}" \
            --platform "${platform}" \
            --file docker/Dockerfile.prebuilt \
            --build-arg "BINARY_PATH=${binary_path}" \
            --tag "${tag}" \
            "${proxy_args[@]}" \
            ${action} \
            .
    }

    echo "  Building amd64..."
    build_prebuilt "linux/amd64" "binaries/amd64/one-router" "${TAG_AMD64}"
    ok "${TAG_AMD64}"

    echo "  Building arm64..."
    build_prebuilt "linux/arm64" "binaries/arm64/one-router" "${TAG_ARM64}"
    ok "${TAG_ARM64}"

    # Cleanup staged binaries
    rm -rf binaries
    ok "Cleaned up staged binaries"
fi

# ─── Multi-arch manifest ───────────────────────────────────────────────────
if [[ "$PUSH" == "true" ]]; then
    info "Step 4: Creating multi-arch manifests..."

    docker buildx imagetools create -t "${TAG_VERSION}" \
        "${TAG_AMD64}" "${TAG_ARM64}"
    ok "${TAG_VERSION}"

    docker buildx imagetools create -t "${TAG_LATEST}" \
        "${TAG_AMD64}" "${TAG_ARM64}"
    ok "${TAG_LATEST}"

    info "Step 5: Verifying manifests..."
    docker buildx imagetools inspect "${TAG_VERSION}"
    echo ""
    ok "Manifests verified"
else
    info "Step 4: Skipping push (dry-run mode)"
    warn "Add --push to publish to DockerHub"
fi

# ─── Done ───────────────────────────────────────────────────────────────────
echo ""
echo -e "${GREEN}=== Done ===${NC}"
if [[ "$PUSH" == "true" ]]; then
    echo "  Published: ${TAG_VERSION}"
    echo "  Published: ${TAG_LATEST}"
    echo "  Platforms: linux/amd64, linux/arm64"
else
    echo "  Built locally: ${TAG_AMD64}"
    echo "  Built locally: ${TAG_ARM64}"
    echo "  Run with --push to publish to DockerHub"
fi
