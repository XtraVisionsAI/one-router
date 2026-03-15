<p align="center">
  <a href="README.md">English</a> | <a href="README_CN.md">中文</a>
</p>

<p align="center">
  <h1 align="center">One Router</h1>
  <p align="center">
    Unified LLM API gateway — route OpenAI & Anthropic protocols to Bedrock, Gemini, and more.
  </p>
  <p align="center">
    <a href="https://github.com/XtraVisonsAI/one-router/actions"><img src="https://github.com/XtraVisonsAI/one-router/actions/workflows/release.yml/badge.svg" alt="CI"></a>
    <a href="https://hub.docker.com/r/xtravisions/one-router"><img src="https://img.shields.io/docker/v/xtravisions/one-router?label=docker" alt="Docker"></a>
    <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License"></a>
    <img src="https://img.shields.io/badge/rust-1.75+-orange.svg" alt="Rust">
  </p>
</p>

---

One Router is a high-performance API gateway written in Rust that lets you use **a single endpoint** to access multiple LLM providers. Send requests using the OpenAI or Anthropic SDK format, and One Router automatically translates and routes them to the right backend — AWS Bedrock, Google Gemini, or others.

## Features

- **Dual Protocol Support** — accepts both OpenAI (`/v1/chat/completions`) and Anthropic (`/v1/messages`) request formats
- **Multi-Backend Routing** — routes to AWS Bedrock and Google Gemini with automatic protocol conversion
- **Smart Model Mapping** — maps model names across providers (e.g. `gpt-4o` -> Claude Sonnet, `claude-*` -> Bedrock), with exact match, wildcard, and configurable priority
- **Credential Pool & Load Balancing** — manage multiple backend credentials with round-robin, weighted, random, or failover strategies
- **Pluggable Storage** — SQLite (zero-config), PostgreSQL, or DynamoDB — switch with one env var
- **API Key Management** — issue API keys with per-key rate limits, budget caps, and service tiers
- **Streaming Support** — full SSE streaming for both OpenAI and Anthropic protocols
- **Extended Thinking** — pass-through support for Anthropic extended thinking
- **Tool Use & PTC** — tool calling support including Programmatic Tool Calling with sandboxed code execution
- **AES-256-GCM Encryption** — encrypt backend credentials at rest
- **Prometheus Metrics** — built-in `/health`, `/ready`, `/liveness` endpoints
- **Feature Flags** — toggle capabilities (tool use, PTC, caching, rate limiting) via database
- **Multi-Arch Docker** — ships `linux/amd64` and `linux/arm64` images
- **Deploy Anywhere** — Docker, AWS App Runner, or bare metal

## Quick Start

### Option 1: Docker (recommended)

```bash
docker run -p 8000:8000 xtravisions/one-router:latest
```

### Option 2: Docker Compose

```bash
git clone https://github.com/XtraVisonsAI/one-router.git
cd one-router
docker compose up
```

### Option 3: Build from source

```bash
git clone https://github.com/XtraVisonsAI/one-router.git
cd one-router
cargo build --release
./target/release/one-router
```

On startup, One Router prints an **ephemeral API key** for immediate use:

```
============================================================
  One Router v0.1.0
============================================================
  Database:  sqlite://./data/gateway.db
  Listen:    0.0.0.0:8000

  Ephemeral API Key (valid for this session only):
  sk-ephemeral-xxxxxxxxxxxx

  Usage:
    export ANTHROPIC_API_KEY="sk-ephemeral-xxxxxxxxxxxx"
    export ANTHROPIC_BASE_URL="http://0.0.0.0:8000"
============================================================
```

## Usage

Point your existing OpenAI or Anthropic SDK at One Router — no code changes needed.

### Anthropic SDK

```python
import anthropic

client = anthropic.Anthropic(
    api_key="sk-ephemeral-xxxxxxxxxxxx",
    base_url="http://localhost:8000",
)

message = client.messages.create(
    model="claude-sonnet-4-20250514",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Hello!"}],
)
```

### OpenAI SDK

```python
from openai import OpenAI

client = OpenAI(
    api_key="sk-ephemeral-xxxxxxxxxxxx",
    base_url="http://localhost:8000/v1",
)

response = client.chat.completions.create(
    model="gpt-4o",  # automatically routed to Claude Sonnet
    messages=[{"role": "user", "content": "Hello!"}],
)
```

### cURL

```bash
# Anthropic format
curl http://localhost:8000/v1/messages \
  -H "x-api-key: sk-ephemeral-xxxxxxxxxxxx" \
  -H "content-type: application/json" \
  -H "anthropic-version: 2023-06-01" \
  -d '{"model":"claude-sonnet-4-20250514","max_tokens":1024,"messages":[{"role":"user","content":"Hello!"}]}'

# OpenAI format
curl http://localhost:8000/v1/chat/completions \
  -H "Authorization: Bearer sk-ephemeral-xxxxxxxxxxxx" \
  -H "content-type: application/json" \
  -d '{"model":"gpt-4o","messages":[{"role":"user","content":"Hello!"}]}'
```

## Configuration

One Router is configured through **5 environment variables**. Everything else lives in the database.

| Variable | Default | Description |
|---|---|---|
| `DATABASE` | `sqlite://./data/gateway.db` | Storage backend URI. Supports `sqlite://`, `postgres://`, `dynamodb://` |
| `PORT` | `8000` | HTTP listen port |
| `LOG_LEVEL` | `info` | Log level: `trace`, `debug`, `info`, `warn`, `error` |
| `MASTER_API_KEY` | _(none)_ | Admin API key that bypasses rate limits |
| `ENCRYPTION_KEY` | _(none)_ | AES-256-GCM key for encrypting backend credentials at rest |

### Storage Backends

```bash
# SQLite (default, zero-config)
DATABASE=sqlite://./data/gateway.db

# PostgreSQL
DATABASE=postgres://user:pass@host/db

# DynamoDB
DATABASE=dynamodb://us-east-1
```

## Architecture

```
                    ┌─────────────────────────────────┐
                    │          One Router              │
                    │                                  │
  OpenAI SDK ──────►  /v1/chat/completions            │
                    │       │                          │
                    │       ├──► Converter ──► Bedrock │──► AWS Bedrock
                    │       └──► Converter ──► Gemini  │──► Google Gemini
                    │                                  │
  Anthropic SDK ───►  /v1/messages                    │
                    │       │                          │
                    │       ├──► Converter ──► Bedrock │──► AWS Bedrock
                    │       └──► Converter ──► Gemini  │──► Google Gemini
                    │                                  │
                    │  ┌─────────────────────────────┐ │
                    │  │ Auth · Rate Limit · Budget  │ │
                    │  │ Model Mapping · Credential  │ │
                    │  │ Pool · Usage Tracking       │ │
                    │  └─────────────────────────────┘ │
                    │                                  │
                    │  Storage: SQLite / PG / DynamoDB │
                    └─────────────────────────────────┘
```

## Model Mapping

One Router ships with pre-configured mappings. All mappings are stored in the database and can be customized.

| Source Model | Target | Provider |
|---|---|---|
| `claude-sonnet-4-*` | `anthropic.claude-sonnet-4-*` | Bedrock |
| `claude-opus-4-*` | `anthropic.claude-opus-4-*` | Bedrock |
| `claude-haiku-4-*` | `anthropic.claude-haiku-4-*` | Bedrock |
| `claude-3-5-sonnet-*` | `anthropic.claude-3-5-sonnet-*` | Bedrock |
| `gpt-4o` | Claude Sonnet 4.6 | Bedrock |
| `gpt-4o-mini` | Claude Haiku 4.5 | Bedrock |
| `gpt-3.5-turbo` | Claude Haiku 4.5 | Bedrock |
| `o1` / `o1-preview` | Claude Opus 4.6 | Bedrock |
| `gemini-2.5-*` | Gemini 2.5 * | Gemini |
| `gemini-2.0-*` | Gemini 2.0 * | Gemini |

Wildcard catch-alls (`claude-*`, `gpt-*`, `gemini-*`, `o1-*`) ensure unknown model variants are still routed.

## Project Structure

```
src/
├── api/                 # HTTP handlers (messages, chat_completions, models, health)
├── config/              # Settings & AWS config
├── converters/          # Protocol converters (Anthropic/OpenAI ↔ Bedrock/Gemini)
├── database/            # Storage backends (SQLite, PostgreSQL, DynamoDB)
│   ├── sqlite/
│   ├── postgres/
│   └── dynamodb/
├── error/               # Error types
├── middleware/           # Auth & rate limiting
├── schemas/             # Request/response schemas (Anthropic, OpenAI, Bedrock, Gemini)
├── server/              # App bootstrap, routing, state
├── services/            # Business logic
│   ├── backend_pool/    # Credential pool & load balancing
│   ├── ptc/             # Programmatic Tool Calling (sandboxed execution)
│   ├── bedrock.rs       # AWS Bedrock service
│   ├── gemini.rs        # Google Gemini service
│   ├── model_mapping.rs # Model resolution with caching
│   └── usage_tracker.rs # Usage & cost tracking
└── utils/
docker/
├── Dockerfile           # Multi-stage build
├── Dockerfile.prebuilt  # Pre-built binary (used in CI)
└── Dockerfile.release   # Release build
scripts/
├── deploy-apprunner.sh  # AWS App Runner deployment
├── docker-publish.sh    # Docker image publishing
└── ...
```

## Deployment

### Docker

```bash
docker run -d \
  -p 8000:8000 \
  -e DATABASE=sqlite:///app/data/gateway.db \
  -e MASTER_API_KEY=sk-your-secret \
  -v one-router-data:/app/data \
  xtravisions/one-router:latest
```

### Docker Compose with DynamoDB

```bash
docker compose --profile dynamodb up
```

### AWS App Runner

```bash
./scripts/deploy-apprunner.sh
```

## Development

```bash
# Run locally
cargo run

# Run with debug logging
LOG_LEVEL=debug cargo run

# Run tests
cargo test

# Cross-compile for Linux
cargo install cross
cross build --release --target aarch64-unknown-linux-gnu
```

## License

[MIT](LICENSE)
