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
- **OpenAI Responses API** — `/v1/responses` endpoint compatible with the OpenAI Responses protocol and the Codex CLI, with named-event SSE streaming and stateful multi-turn conversations via `previous_response_id`
- **Embeddings & Rerank** — OpenAI-compatible `/v1/embeddings` and Cohere-compatible `/v1/rerank` backed by Bedrock (Cohere Embed, Titan Embed, Nova Embed, Cohere Rerank)
- **Image Generation** — OpenAI-compatible `/v1/images/generations` routed to OpenAI DALL-E, AWS Bedrock (Stability AI SDXL, Amazon Nova Canvas, Titan Image Generator), or Google Gemini
- **Usage Query API** — query your token usage and cost history via `GET /v1/usage` (aggregated, grouped by hour or model) and `GET /v1/usage/records` (paginated raw records)
- **Smart Model Mapping** — maps model names across providers (e.g. `gpt-4o` -> Claude Sonnet, `claude-*` -> Bedrock), with exact match, wildcard, and configurable priority
- **Backend Pool & Load Balancing** — each backend record is an independent service instance; multiple instances of the same type are load-balanced with round-robin, weighted, random, or failover strategies
- **Per-Backend Model Affinity** — each backend can declare a `models` filter (wildcards + `!` negation, e.g. `["*", "!openai.*"]`) so same-provider backends in different regions serve different models
- **Model-Level Failover** — configurable failover chains switch a model to a backup provider/model when the primary provider has no healthy credential
- **Bedrock GPT-5.x (Mantle Responses)** — Responses-only GPT-5.x models on AWS Bedrock work from all three chat endpoints: native passthrough on `/v1/responses`, one-hop protocol conversion on `/v1/messages` (Claude Code) and `/v1/chat/completions`
- **Automatic Pricing Sync** — optionally sync per-model pricing from the LiteLLM price table on a schedule; mappings priced manually are pinned and never overwritten. Browse and import new model mappings from the LiteLLM catalog in the Admin UI
- **Pluggable Storage** — SQLite (zero-config), PostgreSQL, or DynamoDB — switch with one env var
- **API Key Management** — issue API keys with per-key rate limits, budget caps, and service tiers; master key is admin-only (cannot call business APIs)
- **Admin Session Auth** — admin UI uses HttpOnly cookie sessions via login endpoint; no key stored in browser
- **Streaming Support** — full SSE streaming for both OpenAI and Anthropic protocols
- **Extended Thinking** — per-model extended thinking support with style hints (Claude, Nova 2, Kimi, GPT effort-based)
- **Tool Use & PTC** — tool calling support including Programmatic Tool Calling with sandboxed code execution
- **Web Search & Fetch** — proxy-side web search (Tavily/Brave) and page fetch with agentic loop, streaming, citation post-processing, and Dynamic Filtering (code execution in loop for v2 tools)
- **Per-Model Capabilities** — declare per-model capabilities (thinking, document, tool use, PTC) in model mappings; global defaults configurable via settings
- **Admin Web UI** — built-in browser UI at `/admin` for managing API keys, backends, model mappings, settings, and usage stats — no external tools needed
- **AES-256-GCM Encryption** — encrypt backend credentials at rest; the Admin UI handles plaintext input and encrypts automatically on save
- **API Key Hashing** — API keys are HMAC-SHA256 hashed before storage; plaintext shown once at creation, middle-masked in admin UI (sk-abcd....5678)
- **Self-Update** — check and apply updates from GitHub Releases via CLI (`one-router update`) or Admin API
- **Hot-Reload** — backend and settings changes via Admin UI take effect immediately without restart
- **CLI Configuration** — override any setting via command-line flags (`--port`, `--database`, `--log-level`)
- **Health Endpoints** — built-in `/health`, `/ready`, `/liveness` endpoints
- **Prometheus Metrics** — unauthenticated `/metrics` endpoint exposing request/token/cost counters, an HTTP latency histogram, an in-flight-requests gauge, an auth-failure counter, and build info (the API key is never a label)
- **Multi-Arch Docker** — ships `linux/amd64` and `linux/arm64` images
- **Deploy Anywhere** — Docker, AWS App Runner, or bare metal

## Quick Start

### Option 1: Docker (recommended)

```bash
docker run -p 8000:8000 \
  -e MASTER_API_KEY=sk-your-secret \
  -e ENCRYPTION_KEY=your-64-char-hex-key \
  -v one-router-data:/app/data \
  xtravisions/one-router:latest
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

On startup (debug builds only), One Router prints an **ephemeral API key** for immediate use:

```
============================================================
  One Router v0.22.1
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

> **Production:** The ephemeral key is not generated. Use the Admin UI (`/admin`) to log in with your master key and create API keys for `/v1/*` business endpoints.

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

### OpenAI Responses API (Codex CLI)

One Router exposes `/v1/responses`, the OpenAI Responses protocol used by the Codex CLI and newer clients. Requests are translated to the same backends as `/v1/chat/completions`, so any provider works.

```bash
# Non-streaming
curl http://localhost:8000/v1/responses \
  -H "Authorization: Bearer sk-ephemeral-xxxxxxxxxxxx" \
  -H "content-type: application/json" \
  -d '{"model":"gpt-4o","input":"Write a haiku about the sea."}'

# Streaming — named SSE events (response.created / response.output_text.delta / response.completed)
curl -N http://localhost:8000/v1/responses \
  -H "Authorization: Bearer sk-ephemeral-xxxxxxxxxxxx" \
  -H "content-type: application/json" \
  -d '{"model":"gpt-4o","input":"Hello!","stream":true}'
```

Multi-turn conversations are stateful: pass a prior response's `id` as `previous_response_id` to continue where it left off (stored responses are bound to the API key that created them). To point the Codex CLI at One Router, set its base URL to `http://localhost:8000/v1` and use your API key.

> **Bedrock GPT-5.x:** GPT-5.x models on AWS Bedrock are Responses-only (no Converse API). When a mapping targets one (`openai.gpt-5*`), `/v1/responses` passes the raw request through to the Bedrock Mantle Responses endpoint with native SSE relay, and `/v1/messages` / `/v1/chat/completions` reach the same models via built-in one-hop protocol conversion — including thinking-signature round-trips for Claude Code. Note these models are region-restricted (e.g. sol is us-east-1/us-east-2 only), so the Bedrock backend credential's region must match — pair this with a per-backend `models` filter to route only GPT models to the matching region.

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

One Router includes a built-in admin UI at **`/admin`**. Open it in a browser and sign in with your master key or ephemeral key (debug builds). Authentication uses HttpOnly session cookies — no key is stored in the browser after login.

| Page | What you can do |
|---|---|
| **Dashboard** | Overview: backend health, API key count, uptime |
| **API Keys** | Create keys (plaintext shown once), edit rate limits / budgets, deactivate / reactivate |
| **Backends** | Add / edit backends (Gemini, Anthropic, OpenAI, Bedrock) — credentials entered in plaintext, encrypted before saving; optional per-backend models filter |
| **Model Maps** | Manage source → target model mappings, priorities, pricing, and per-model capabilities; import models from the LiteLLM price table |
| **Usage** | Query usage statistics by API key, time range, and grouping |
| **Settings** | Configure default capabilities (tool use, thinking, document, PTC), rate limiting, and prompt cache behavior. Changes take effect immediately |

Click the **version number** in the sidebar footer to check for updates, apply them, or view the changelog on GitHub.

The UI is built with Vue 3 + Naive UI + Vite, compiled into static assets, and embedded directly in the binary via rust-embed (no separate deployment needed).

## Configuration

One Router uses environment variables for infrastructure config. All runtime settings live in the database (`system_settings` table) and can be managed via the Admin UI.

| Variable | Default | Description |
|---|---|---|
| `DATABASE` | `sqlite://./data/gateway.db` | Storage backend URI. Supports `sqlite://`, `postgres://`, `dynamodb://` |
| `PORT` | `8000` | HTTP listen port |
| `HOST` | `0.0.0.0` | HTTP bind host |
| `LOG_LEVEL` | `info` | Log level: `trace`, `debug`, `info`, `warn`, `error` |
| `MASTER_API_KEY` | _(auto-generated)_ | Admin-only key — for `/admin` UI login and admin API. Cannot call `/v1/*` business endpoints. Auto-generated and saved to `.env` on first bare-metal run |
| `ENCRYPTION_KEY` | _(auto-generated)_ | AES-256 key for credential encryption and API key HMAC — auto-generated on first run |
| `SEED_DEFAULTS` | `empty` | When to seed default model mappings on startup: `off` (never), `empty` (only when the mappings table is empty — deletions stick), or `missing` (re-insert any missing default on every startup) |

**First-run behavior:**
- **Bare metal:** Missing `MASTER_API_KEY` or `ENCRYPTION_KEY` are auto-generated and saved to `.env`.
- **Docker:** These must be provided explicitly via `-e` flags. The container will refuse to start without them.

CLI flags override environment variables: `one-router --port 9000 --database postgres://...`

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

Backend credentials are managed via the Admin UI at `/admin` -> Backends page. Credentials are encrypted at rest with AES-256-GCM.

Bedrock backends accept explicit access keys, a named AWS profile (including SSO), or the default credential chain (env vars, EC2/ECS instance role) — all forms work on every request path, including the Mantle endpoints for GPT models.

Each backend can optionally declare a **models filter** — a list of wildcard patterns matched against the target model ID, with `!` for exclusion. This lets same-provider backends in different regions split traffic by model, e.g.:

- `bedrock-ap-northeast-1`: `["*", "!openai.*"]` — serves everything except GPT models
- `bedrock-us-east-1`: `["openai.gpt-5*"]` — dedicated to GPT-5.x (which only exist in US regions)

An empty filter means the backend serves all models. Exclusions always win; among eligible backends the most specific match is preferred, then load-balanced.

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
  Codex CLI ───────►  /v1/responses                      │──► (translated to chat backends, or Mantle passthrough)
                    │                                      │
               ─────►  GET /v1/usage                     │  (aggregated usage stats)
               ─────►  GET /v1/usage/records             │  (paginated raw records)
               ─────►  GET /metrics                       │  (Prometheus metrics)
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
| `thinking.style` | `claude` | How thinking is expressed: `claude` (native), `nova2`, `kimi`, or `effort` (GPT-OSS / o-series reasoning effort) |
| `document.enabled` | false | Whether document content blocks are forwarded |
| `tool_use.enabled` | false | Whether tool definitions are forwarded |
| `ptc.enabled` | false | Whether Programmatic Tool Calling is enabled |

Pre-configured mappings ship with sensible defaults: Claude models have full capabilities, Gemini models have thinking disabled, and embedding/rerank models have all capabilities disabled.

For model mappings with no explicit capabilities, the **Settings -> default capabilities** values are used as fallback (configurable). Changes take effect immediately.

## Project Structure

```
src/
├── api/                 # HTTP handlers (messages, chat_completions, responses, embeddings, rerank, images, models, usage, health, admin)
├── config/              # Settings & AWS config
├── converters/          # Protocol converters (Anthropic/OpenAI ↔ Bedrock/Gemini/OpenAI/Anthropic; Responses ↔ Chat)
├── database/            # Storage backends (SQLite, PostgreSQL, DynamoDB)
│   ├── sqlite/
│   ├── postgres/
│   └── dynamodb/
├── error/               # Error types
├── middleware/           # Auth & rate limiting
├── observability/       # Prometheus metrics registry & /metrics
├── schemas/             # Request/response schemas (Anthropic, OpenAI, Responses, Bedrock, Gemini, Embeddings, Rerank, Images)
├── server/              # App bootstrap, routing, state
├── services/            # Business logic
│   ├── backend_pool/    # Backend instance pool & load balancing
│   ├── ptc/             # Programmatic Tool Calling (sandboxed execution)
│   ├── web_tools/       # Web search, fetch, and Dynamic Filtering (agentic loop)
│   ├── bedrock.rs       # AWS Bedrock service (InvokeModel for Claude; Converse for non-Claude; Mantle Responses for GPT-5.x)
│   ├── gemini.rs        # Google Gemini service
│   ├── passthrough.rs   # Anthropic & OpenAI passthrough service
│   ├── failover.rs      # Model-level credential-exhaustion failover
│   ├── pricing_sync.rs  # LiteLLM price-table sync
│   ├── responses_context.rs # In-memory Responses conversation store
│   ├── model_mapping.rs # Model resolution with caching
│   └── usage_tracker.rs # Usage & cost tracking
└── utils/
static/
└── admin/               # Admin Web UI build output (embedded via rust-embed)
    ├── index.html
    └── assets/          # Vite-compiled JS/CSS chunks
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
  -e ENCRYPTION_KEY=your-64-char-hex-key \
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

# Run with CLI overrides
one-router --port 9000 --database postgres://localhost/mydb

# Check for updates
one-router update --check

# Apply update
one-router update

# Run tests
cargo test

# Cross-compile for Linux
cargo install cross
cross build --release --target aarch64-unknown-linux-gnu
```

## License

[MIT](LICENSE)
