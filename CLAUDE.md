# One Router — Development Guide

## Project Overview

One Router is a Rust API gateway that routes **Anthropic** and **OpenAI** protocol requests to four backend providers: **AWS Bedrock**, **Google Gemini**, **Anthropic API**, and **OpenAI API**.

- **Version:** 0.2.0
- **Tech stack:** Rust / Axum / Tokio / AWS SDK / SQLx
- **Docker image:** `xtravisions/one-router`

---

## Development Commands

```bash
# Run locally (auto-generates ephemeral API key on startup)
cargo run

# Debug logging
LOG_LEVEL=debug cargo run

# Run tests
cargo test

# Format check (required by pre-commit hook)
cargo fmt --check

# Lint check (required by pre-commit hook)
cargo clippy -- -D warnings

# Cross-compile for Linux (required before Docker build)
cargo install cross
cross build --release --target x86_64-unknown-linux-gnu
cross build --release --target aarch64-unknown-linux-gnu
```

Pre-commit hooks automatically run `cargo fmt --check` and `cargo clippy -- -D warnings`. Fix all warnings before committing.

---

## Environment Variables

Only 5 env vars are needed — all other config lives in the database:

| Variable | Default | Description |
|---|---|---|
| `DATABASE` | `sqlite://./data/gateway.db` | Storage backend URI |
| `PORT` | `8000` | HTTP listen port |
| `LOG_LEVEL` | `info` | Logging level |
| `MASTER_API_KEY` | _(empty)_ | Optional admin key (bypasses rate limits) |
| `ENCRYPTION_KEY` | _(empty)_ | Optional AES-256 key for credential encryption |

**DATABASE URI formats:**
- `sqlite:///app/data/gateway.db`
- `postgres://user:pass@host:5432/db`
- `dynamodb://us-east-1`

---

## Key File Paths

```
src/
├── main.rs                      # Entry point
├── api/
│   ├── messages.rs              # POST /v1/messages  (Anthropic protocol)
│   ├── chat_completions.rs      # POST /v1/chat/completions  (OpenAI protocol)
│   ├── health.rs                # GET /health /ready /liveness
│   └── models.rs                # GET /v1/models
├── converters/
│   ├── anthropic_bedrock.rs     # Anthropic ↔ Bedrock
│   ├── anthropic_gemini.rs      # Anthropic ↔ Gemini
│   ├── anthropic_openai.rs      # Anthropic ↔ OpenAI
│   ├── openai_bedrock.rs        # OpenAI ↔ Bedrock
│   ├── openai_gemini.rs         # OpenAI ↔ Gemini
│   └── sdk_utils.rs             # serde_json::Value ↔ aws_smithy Document
├── schemas/
│   ├── anthropic.rs             # Anthropic request/response structs
│   ├── openai.rs                # OpenAI request/response structs
│   ├── bedrock.rs               # Bedrock structs
│   └── gemini.rs                # Gemini structs
├── server/
│   ├── app.rs                   # App bootstrap & service initialization
│   ├── state.rs                 # AppState definition
│   └── routes.rs                # Axum router & middleware
├── services/
│   ├── bedrock.rs               # BedrockService (AWS SDK client)
│   ├── gemini.rs                # GeminiService (HTTP client)
│   ├── passthrough.rs           # PassthroughService (Anthropic / OpenAI proxy)
│   ├── model_mapping.rs         # Model ID resolution with moka cache
│   ├── usage_tracker.rs         # Token usage recording
│   └── backend_pool/            # Credential pool & load balancing
├── database/
│   ├── traits.rs                # DatabaseService trait (5 sub-traits)
│   ├── models.rs                # Data models (5 tables)
│   ├── sqlite/                  # SQLite implementation
│   ├── postgres/                # PostgreSQL implementation
│   └── dynamodb/                # DynamoDB implementation
├── middleware/
│   ├── auth.rs                  # API key auth
│   └── rate_limit.rs            # Rate limiting (governor)
└── config/
    ├── settings.rs              # Settings struct (5 env vars)
    └── aws.rs                   # AWS SDK config
```

---

## Routing Matrix (8-way)

### POST /v1/messages (Anthropic protocol input)

| `x-provider` header | Backend | Converter |
|---|---|---|
| `bedrock` (default) | AWS Bedrock | `anthropic_bedrock` |
| `gemini` | Google Gemini | `anthropic_gemini` |
| `anthropic` | Anthropic API | passthrough |
| `openai` | OpenAI API | `anthropic_openai` |

### POST /v1/chat/completions (OpenAI protocol input)

| `x-provider` header | Backend | Converter |
|---|---|---|
| `openai` (default) | OpenAI API | passthrough |
| `bedrock` | AWS Bedrock | `openai_bedrock` |
| `gemini` | Google Gemini | `openai_gemini` |
| `anthropic` | Anthropic API | `anthropic_openai` (reverse) |

---

## Architecture

```
HTTP Request
    │
    ├── Middleware: Auth + Rate Limit
    │
    ├── /v1/messages         → messages.rs
    └── /v1/chat/completions → chat_completions.rs
              │
              ├── ModelMappingService  (resolve model ID)
              ├── Converter            (transform request)
              ├── Service              (call backend)
              └── Converter            (transform response)
```

### AppState fields

```rust
pub struct AppState {
    pub settings: Arc<Settings>,
    pub database: Arc<dyn DatabaseService>,
    pub bedrock: Option<Arc<BedrockService>>,
    pub gemini_service: Option<Arc<GeminiService>>,
    pub anthropic_service: Option<Arc<PassthroughService>>,
    pub openai_service: Option<Arc<PassthroughService>>,
    pub model_mapping: Arc<ModelMappingService>,
    pub usage_tracker: Arc<UsageTracker>,
    pub ptc_service: Option<Arc<PtcService>>,
    pub start_time: Instant,
}
```

Services are `Option` because they are only initialized when the corresponding backend is configured in the database.

---

## Database Schema (5 tables)

| Table | Purpose |
|---|---|
| `api_keys` | API keys with rate limits and budgets |
| `usage` | Token usage records per request |
| `model_mappings` | Source → target model ID mappings (supports wildcards) |
| `backends` | Backend credentials (Bedrock / Gemini / Anthropic / OpenAI) |
| `feature_flags` | Feature toggles (tool_use, ptc, caching, etc.) |

Model mapping priority: exact match → wildcard match (longest prefix wins) → reject.

---

## SSE Streaming Format Differences

**Anthropic SSE** — has `event:` lines:
```
event: content_block_start
data: {"type":"content_block_start",...}

event: content_block_delta
data: {"type":"content_block_delta",...}
```

**OpenAI SSE** — only `data:` lines, ends with `[DONE]`:
```
data: {"choices":[{"delta":{"content":"..."}}]}

data: [DONE]
```

---

## Adding a New Converter

1. Create `src/converters/<name>.rs`
2. Implement `convert_request()` and `convert_response()`
3. Register in `src/converters/mod.rs`
4. Add routing branch in `src/api/messages.rs` or `src/api/chat_completions.rs`

---

## Release Process

```bash
# 1. Bump version (updates Cargo.toml + CHANGELOG.md)
cz bump

# 2. Push tag — triggers GitHub Actions automatically
git push --follow-tags
```

GitHub Actions (`release.yml`) runs on `v*` tags:
1. Cross-compile for `x86_64` + `aarch64` Linux
2. Build multi-arch Docker image → push to DockerHub (`xtravisions/one-router`)
3. Create GitHub Release with binaries

---

## Deployment (AWS App Runner)

```bash
# Initial deployment (create)
./scripts/deploy-apprunner.sh \
  --profile <aws-profile> \
  --region <region> \
  --database dynamodb://<region> \
  --master-api-key sk-... \
  --encryption-key ... \
  --create

# Update image after new release (preserves existing env vars)
./scripts/deploy-apprunner.sh \
  --profile <aws-profile> \
  --region <region> \
  --tag v0.2.0

# Check service status
./scripts/apprunner-status.sh --profile <aws-profile> --region <region>
```

Update mode (`--create` 省略) only changes the image. Pass `--database` / `--master-api-key` / `--encryption-key` only when you need to update those values.

---

## Backend Configuration

Use the interactive script to generate backend config:

```bash
./scripts/backend-config-builder.sh
```

Supports output formats: JSON / DynamoDB / SQL. Covers all four backend types.

---

## Credential Pool & Load Balancing

Multiple credentials per backend are supported. Strategies:

- `RoundRobin` — cycle through credentials
- `Weighted` — probability-based on weight
- `Random` — random selection
- `Failover` — first available, falls back on error

---

## Conventions

- All async handlers take `State<Arc<AppState>>` — never mutate AppState directly.
- Errors in API handlers map to the **input protocol's** error format (Anthropic or OpenAI).
- Model ID resolution always goes through `ModelMappingService` — never hardcode backend model IDs in handlers.
- Streaming responses use `async_stream::stream!` macro.
- Database migrations are handled by each backend's `migrations.rs` — run automatically on startup.
