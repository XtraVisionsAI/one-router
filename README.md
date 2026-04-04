<p align="center">
  <a href="README.md">English</a> | <a href="README_CN.md">中文</a>
</p>

<p align="center">
  <h1 align="center">One Router</h1>
  <p align="center">
    Unified LLM API gateway — route OpenAI & Anthropic protocols to Bedrock, Gemini, and more.
  </p>
  <p align="center">
    <a href="https://github.com/XtraVisionsAI/one-router/actions"><img src="https://github.com/XtraVisionsAI/one-router/actions/workflows/release.yml/badge.svg" alt="CI"></a>
    <a href="https://hub.docker.com/r/xtravisions/one-router"><img src="https://img.shields.io/docker/v/xtravisions/one-router?label=docker" alt="Docker"></a>
    <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License"></a>
    <img src="https://img.shields.io/badge/rust-1.75+-orange.svg" alt="Rust">
  </p>
</p>

---

One Router is a high-performance API gateway written in Rust that lets you use **a single endpoint** to access multiple LLM providers. Send requests using the OpenAI or Anthropic SDK format, and One Router automatically translates and routes them to the right backend — AWS Bedrock, Google Gemini, or others.

## Features

- **Dual Protocol Support** — accepts both OpenAI (`/v1/chat/completions`) and Anthropic (`/v1/messages`) request formats
- **Multi-Backend Routing** — routes to AWS Bedrock, Google Gemini, Anthropic API, and OpenAI API with automatic protocol conversion
- **Embeddings & Rerank** — OpenAI-compatible `/v1/embeddings` and Cohere-compatible `/v1/rerank` backed by Bedrock (Cohere Embed, Titan Embed, Nova Embed, Cohere Rerank)
- **Image Generation** — OpenAI-compatible `/v1/images/generations` routed to OpenAI DALL-E, AWS Bedrock (Stability AI SDXL, Amazon Nova Canvas, Titan Image Generator), or Google Gemini
- **Usage Query API** — query your token usage and cost history via `GET /v1/usage` (aggregated, grouped by hour or model) and `GET /v1/usage/records` (paginated raw records)
- **Smart Model Mapping** — maps model names across providers (e.g. `gpt-4o` -> Claude Sonnet, `claude-*` -> Bedrock), with exact match, wildcard, and configurable priority
- **Credential Pool & Load Balancing** — manage multiple backend credentials with round-robin, weighted, random, or failover strategies
- **Pluggable Storage** — SQLite (zero-config), PostgreSQL, or DynamoDB — switch with one env var
- **API Key Management** — issue API keys with per-key rate limits, budget caps, and service tiers
- **Streaming Support** — full SSE streaming for both OpenAI and Anthropic protocols
- **Extended Thinking** — per-model extended thinking support with style hints (Claude, Nova 2, Kimi)
- **Tool Use & PTC** — tool calling support including Programmatic Tool Calling with sandboxed code execution
- **Per-Model Capabilities** — declare per-model capabilities (thinking, document, tool use, PTC) in model mappings; global defaults configurable via settings
- **Admin Web UI** — built-in browser UI at `/admin` for managing API keys, backends, model mappings, settings, and usage stats — no external tools needed
- **AES-256-GCM Encryption** — encrypt backend credentials at rest; the Admin UI handles plaintext input and encrypts automatically on save
- **Prometheus Metrics** — built-in `/health`, `/ready`, `/liveness` endpoints
- **Multi-Arch Docker** — ships `linux/amd64` and `linux/arm64` images
- **Deploy Anywhere** — Docker, AWS App Runner, or bare metal

## Quick Start

### Option 1: Docker (recommended)

```bash
docker run -p 8000:8000 xtravisions/one-router:latest
```

### Option 2: Docker Compose

```bash
git clone https://github.com/XtraVisionsAI/one-router.git
cd one-router
docker compose up
```

### Option 3: Build from source

```bash
git clone https://github.com/XtraVisionsAI/one-router.git
cd one-router
cargo build --release
./target/release/one-router
```

On startup, One Router prints an **ephemeral API key** for immediate use:

```
============================================================
  One Router v0.10.0
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

### Embeddings (OpenAI SDK)

```python
from openai import OpenAI

client = OpenAI(
    api_key="sk-ephemeral-xxxxxxxxxxxx",
    base_url="http://localhost:8000/v1",
)

# OpenAI model names are automatically mapped to Bedrock Titan Embed
response = client.embeddings.create(
    model="text-embedding-3-small",
    input="Hello world",
)
print(response.data[0].embedding)

# Or use a Bedrock model directly
response = client.embeddings.create(
    model="amazon.titan-embed-text-v2:0",
    input=["batch text one", "batch text two"],  # Cohere supports batches
)
```

### Rerank (cURL)

```bash
curl http://localhost:8000/v1/rerank \
  -H "x-api-key: sk-ephemeral-xxxxxxxxxxxx" \
  -H "content-type: application/json" \
  -d '{
    "model": "rerank-english-v3.0",
    "query": "What is machine learning?",
    "documents": [
      "Machine learning is a subset of AI.",
      "The weather is sunny today.",
      "Deep learning uses neural networks."
    ],
    "top_n": 2,
    "return_documents": true
  }'
```

### Image Generation (OpenAI SDK)

```python
from openai import OpenAI

client = OpenAI(
    api_key="sk-ephemeral-xxxxxxxxxxxx",
    base_url="http://localhost:8000/v1",
)

# OpenAI DALL-E (passthrough)
response = client.images.generate(
    model="dall-e-3",
    prompt="a cat sitting on a meadow",
    size="1024x1024",
    n=1,
)
print(response.data[0].url)

# AWS Bedrock — Amazon Nova Canvas (returns base64)
response = client.images.generate(
    model="amazon.nova-canvas-v1:0",
    prompt="a cat sitting on a meadow",
    size="1024x1024",
    response_format="b64_json",
)
print(response.data[0].b64_json[:40], "...")

# Google Gemini (returns base64)
response = client.images.generate(
    model="gemini-2.0-flash-preview-image-generation",
    prompt="a cat sitting on a meadow",
    response_format="b64_json",
)
print(response.data[0].b64_json[:40], "...")
```

> **Note:** Bedrock and Gemini backends only support `response_format=b64_json`. Requesting `url` format for these backends returns a `400 Bad Request`. The OpenAI passthrough supports both `url` and `b64_json`.

```

### Usage Query API

Query your own token usage statistics. Requires an API key.

```bash
# Aggregated usage grouped by hour (default)
curl "http://localhost:8000/v1/usage" \
  -H "x-api-key: sk-ephemeral-xxxxxxxxxxxx" | jq .

# Grouped by model
curl "http://localhost:8000/v1/usage?group_by=model" \
  -H "x-api-key: sk-ephemeral-xxxxxxxxxxxx" | jq .

# Filter by time range
curl "http://localhost:8000/v1/usage?start_time=2026-03-01T00:00:00Z&group_by=model" \
  -H "x-api-key: sk-ephemeral-xxxxxxxxxxxx" | jq .

# Paginated raw request records (start_time or before_id required)
curl "http://localhost:8000/v1/usage/records?start_time=2026-03-24T00:00:00Z&limit=50" \
  -H "x-api-key: sk-ephemeral-xxxxxxxxxxxx" | jq .
```

**`GET /v1/usage` response:**
```json
{
  "object": "list",
  "data": [
    {
      "group_key": "2026-03-24T15",
      "input_tokens": 12000,
      "output_tokens": 3400,
      "cached_tokens": 800,
      "cache_write_tokens": 0,
      "total_cost": 0.45,
      "total_requests": 10,
      "error_requests": 1
    }
  ],
  "summary": {
    "total_requests": 10,
    "total_input_tokens": 12000,
    "total_output_tokens": 3400,
    "total_cached_tokens": 800,
    "total_cost": 0.45,
    "budget_used_mtd": 4.50,
    "monthly_budget": 100.0
  }
}
```

| Query Param | Values | Description |
|---|---|---|
| `start_time` | RFC3339 | Filter start time |
| `end_time` | RFC3339 | Filter end time |
| `group_by` | `hour` (default) \| `model` | Aggregation dimension |

| Query Param | Values | Description |
|---|---|---|
| `start_time` | RFC3339 | **Required** (unless `before_id` provided) |
| `limit` | 1–1000 (default 100) | Records per page |
| `before_id` | integer | Cursor for next page (use last record's `id`) |

## Admin Web UI

One Router includes a built-in admin UI at **`/admin`**. Open it in a browser and sign in with your master key or ephemeral key.

| Page | What you can do |
|---|---|
| **Dashboard** | Overview: backend health, API key count, uptime |
| **API Keys** | Create keys (plaintext shown once), edit rate limits / budgets, deactivate / reactivate |
| **Backends** | Add / edit backends (Gemini, Anthropic, OpenAI, Bedrock) — credentials entered in plaintext, encrypted before saving |
| **Model Maps** | Manage source → target model mappings, priorities, pricing, and per-model capabilities |
| **Usage** | Query usage statistics by API key, time range, and grouping |
| **Settings** | Configure default capabilities (tool use, thinking, document, PTC), rate limiting, and prompt cache behavior |

The UI is embedded directly in the binary (no separate deployment). It requires **no build step** — it's plain HTML + CSS + vanilla JS.

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

### Backend Configuration

Backend credentials are stored in the `backends` database table. Use the built-in helper script to generate config:

```bash
# Interactive mode
./scripts/backend-config-builder.sh

# Bedrock with AWS profile
./scripts/backend-config-builder.sh --type bedrock --region us-east-1 --profile prod

# Bedrock with access keys
./scripts/backend-config-builder.sh --type bedrock --region us-east-1 \
  --access-key-id AKIA... --secret-access-key ...

# Gemini with multiple API keys
./scripts/backend-config-builder.sh --type gemini --api-keys "key1,key2"

# Anthropic with API key
./scripts/backend-config-builder.sh --type anthropic --api-keys "sk-ant-..."

# OpenAI with API key
./scripts/backend-config-builder.sh --type openai --api-keys "sk-..."

# Pool settings (shared by all backend types)
./scripts/backend-config-builder.sh --type bedrock --region us-east-1 \
  --strategy weighted --max-failures 5 --retry-after 600
```

Output formats via `--format`:

| Format | Description |
|---|---|
| `json` | Pretty JSON (default) |
| `json-compact` | Single-line JSON (also `--compact`) |
| `dynamodb` | DynamoDB item JSON for AWS Console / `put-item` |
| `sql` | SQL INSERT with ON CONFLICT upsert (SQLite / PostgreSQL) |

```bash
# Output as DynamoDB item
./scripts/backend-config-builder.sh --type bedrock --region ap-northeast-1 --format dynamodb

# Output as SQL
./scripts/backend-config-builder.sh --type gemini --api-keys "key1" --format sql
```

## Architecture

```
                    ┌─────────────────────────────────────┐
                    │            One Router                │
                    │                                      │
  OpenAI SDK ──────►  /v1/chat/completions               │
                    │       │                              │
                    │       ├──► Converter ──► Bedrock    │──► AWS Bedrock
                    │       ├──► Converter ──► Gemini     │──► Google Gemini
                    │       ├──► Converter ──► Anthropic  │──► Anthropic API
                    │       └──► Passthrough ──► OpenAI   │──► OpenAI API
                    │                                      │
  Anthropic SDK ───►  /v1/messages                       │
                    │       │                              │
                    │       ├──► Converter ──► Bedrock    │──► AWS Bedrock
                    │       ├──► Converter ──► Gemini     │──► Google Gemini
                    │       ├──► Passthrough ──► Anthropic│──► Anthropic API
                    │       └──► Converter ──► OpenAI     │──► OpenAI API
                    │                                      │
  OpenAI SDK ──────►  /v1/embeddings                     │──► AWS Bedrock
  Cohere SDK ──────►  /v1/rerank                         │──► AWS Bedrock
  OpenAI SDK ──────►  /v1/images/generations             │──► OpenAI / Bedrock / Gemini
                    │                                      │
               ─────►  GET /v1/usage                     │  (aggregated usage stats)
               ─────►  GET /v1/usage/records             │  (paginated raw records)
                    │                                      │
  Browser ─────────►  GET /admin                         │  (Admin Web UI)
               ─────►  /admin/api/*                      │  (Admin REST API)
                    │                                      │
                    │  ┌───────────────────────────────┐  │
                    │  │ Auth · Rate Limit · Budget    │  │
                    │  │ Model Mapping · Credential    │  │
                    │  │ Pool · Usage Tracking         │  │
                    │  └───────────────────────────────┘  │
                    │                                      │
                    │  Storage: SQLite / PG / DynamoDB     │
                    └─────────────────────────────────────┘
```

## Model Mapping

One Router ships with pre-configured mappings. All mappings are stored in the database and can be customized.

### Chat / Completion Models

| Source Model | Target | Provider |
|---|---|---|
| `claude-sonnet-4-*` | `global.anthropic.claude-sonnet-4-*` | Bedrock |
| `claude-opus-4-*` | `global.anthropic.claude-opus-4-*` | Bedrock |
| `claude-haiku-4-*` | `global.anthropic.claude-haiku-4-*` | Bedrock |
| `claude-3-5-sonnet-*` | `anthropic.claude-3-5-sonnet-*` | Bedrock |
| `gpt-4o` | Claude Sonnet 4.6 | Bedrock |
| `gpt-4o-mini` | Claude Haiku 4.5 | Bedrock |
| `gpt-3.5-turbo` | Claude Haiku 4.5 | Bedrock |
| `o1` / `o1-preview` | Claude Opus 4.6 | Bedrock |
| `gemini-2.5-*` | Gemini 2.5 * | Gemini |
| `gemini-2.0-*` | Gemini 2.0 * | Gemini |

### Embedding Models (`/v1/embeddings`)

| Source Model | Target | Provider |
|---|---|---|
| `cohere.embed-english-v3` | direct | Bedrock |
| `cohere.embed-multilingual-v3` | direct | Bedrock |
| `amazon.titan-embed-text-v2:0` | direct | Bedrock |
| `amazon.titan-embed-text-v1` | direct | Bedrock |
| `text-embedding-3-small` | Titan Embed Text v2 | Bedrock |
| `text-embedding-3-large` | Titan Embed Text v2 | Bedrock |
| `text-embedding-ada-002` | Titan Embed Text v2 | Bedrock |

### Rerank Models (`/v1/rerank`)

| Source Model | Target | Provider |
|---|---|---|
| `cohere.rerank-v3-5:0` | direct | Bedrock |
| `rerank-english-v3.0` | Cohere Rerank v3.5 | Bedrock |
| `rerank-multilingual-v3.0` | Cohere Rerank v3.5 | Bedrock |

### Image Generation Models (`/v1/images/generations`)

| Source Model | Target | Provider |
|---|---|---|
| `dall-e-3` | direct | OpenAI |
| `dall-e-2` | direct | OpenAI |
| `stability.stable-diffusion-xl-v1` | direct | Bedrock |
| `amazon.nova-canvas-v1:0` | direct | Bedrock |
| `amazon.titan-image-generator-v2:0` | direct | Bedrock |
| `gemini-2.0-flash-preview-image-generation` | direct | Gemini |

Bedrock and Gemini return `b64_json` only. OpenAI passthrough supports both `url` and `b64_json`.

Wildcard catch-alls (`claude-*`, `gpt-*`, `gemini-*`, `o1-*`) ensure unknown model variants are still routed.

### Model Capabilities

Each mapping declares what features the target model supports. This controls what gets forwarded in requests.

| Field | Default | Description |
|---|---|---|
| `thinking.enabled` | false | Whether extended thinking / reasoning is forwarded |
| `thinking.style` | `claude` | How thinking is expressed: `claude` (native), `nova2`, or `kimi` |
| `document.enabled` | false | Whether document content blocks are forwarded |
| `tool_use.enabled` | false | Whether tool definitions are forwarded |
| `ptc.enabled` | false | Whether Programmatic Tool Calling is enabled |

Pre-configured mappings ship with sensible defaults: Claude models have full capabilities, Gemini models have thinking disabled, and embedding/rerank models have all capabilities disabled.

For model mappings with no explicit capabilities, the **Settings → default capabilities** values are used as fallback (configurable, take effect on restart).

## Project Structure

```
src/
├── api/                 # HTTP handlers (messages, chat_completions, embeddings, rerank, images, models, usage, health, admin)
├── config/              # Settings & AWS config
├── converters/          # Protocol converters (Anthropic/OpenAI ↔ Bedrock/Gemini/OpenAI/Anthropic)
├── database/            # Storage backends (SQLite, PostgreSQL, DynamoDB)
│   ├── sqlite/
│   ├── postgres/
│   └── dynamodb/
├── error/               # Error types
├── middleware/           # Auth & rate limiting
├── schemas/             # Request/response schemas (Anthropic, OpenAI, Bedrock, Gemini, Embeddings, Rerank, Images)
├── server/              # App bootstrap, routing, state
├── services/            # Business logic
│   ├── backend_pool/    # Credential pool & load balancing
│   ├── ptc/             # Programmatic Tool Calling (sandboxed execution)
│   ├── bedrock.rs       # AWS Bedrock service (InvokeModel for Claude, Converse for non-Claude)
│   ├── gemini.rs        # Google Gemini service
│   ├── passthrough.rs   # Anthropic & OpenAI passthrough service
│   ├── model_mapping.rs # Model resolution with caching
│   └── usage_tracker.rs # Usage & cost tracking
└── utils/
static/
└── admin/               # Admin Web UI (embedded into binary via rust-embed)
    ├── index.html
    ├── app.js
    └── app.css
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
# Default: pull from DockerHub via ECR Pull Through Cache
./scripts/deploy-apprunner.sh --create

# Use a specific DockerHub image (specify --platform on Apple Silicon)
./scripts/deploy-apprunner.sh --image xtravisions/one-router:latest --platform linux/amd64 --create

# Build locally and push to ECR
./scripts/deploy-apprunner.sh --build --platform linux/amd64 --create

# Specify region, database, and AWS profile
./scripts/deploy-apprunner.sh --profile prod -r ap-northeast-1 \
  --database dynamodb://ap-northeast-1 --create

# Pass secrets directly (otherwise set them in the AWS Console after deploy)
./scripts/deploy-apprunner.sh --create \
  --master-api-key sk-your-secret --encryption-key your-aes256-key
```

Run `./scripts/deploy-apprunner.sh --help` for all options.

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
