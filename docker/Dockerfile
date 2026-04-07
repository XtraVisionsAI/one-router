# Build stage
FROM rust:1.93-slim-bookworm AS builder

ARG TARGETARCH

WORKDIR /app

# Copy manifests first for dependency caching
COPY Cargo.toml Cargo.lock ./

# Create dummy src for dependency build cache
RUN mkdir src && echo 'fn main() {}' > src/main.rs && echo '' > src/lib.rs
RUN cargo build --release 2>/dev/null || true
RUN rm -rf src

# Copy actual source code
COPY src ./src

# Build the real binary
RUN cargo build --release

# Runtime stage
FROM debian:bookworm-slim

RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Create non-root user
RUN groupadd -r appuser && useradd -r -g appuser -d /app -s /sbin/nologin appuser

WORKDIR /app

# Copy binary from builder
COPY --from=builder /app/target/release/one-router /usr/local/bin/one-router

# Create data directory for SQLite with correct permissions
RUN mkdir -p /app/data && chown -R appuser:appuser /app/data

# Default environment
ENV DATABASE=sqlite:///app/data/gateway.db
ENV PORT=8000
ENV LOG_LEVEL=info
ENV CONTAINER=true

EXPOSE 8000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD curl -f http://localhost:8000/health || exit 1

USER appuser

CMD ["one-router"]
