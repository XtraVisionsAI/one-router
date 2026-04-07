# One Router — Development Guide

## Project Overview

One Router is a Rust API gateway that routes **Anthropic** and **OpenAI** protocol requests to four backend providers: **AWS Bedrock**, **Google Gemini**, **Anthropic API**, and **OpenAI API**.

- **Version:** 0.13.0
- **Tech stack:** Rust / Axum / Tokio / AWS SDK / SQLx
- **Docker image:** `xtravisions/one-router`

---

## Development Commands

```bash
# Run locally (auto-generates ephemeral API key + MASTER/ENCRYPTION keys on first run)
cargo run

# With CLI overrides
cargo run -- --port 9000 --database postgres://localhost/mydb --log-level debug

# Self-update check
cargo run -- update --check

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

## CLI Usage

```bash
one-router [OPTIONS] [COMMAND]

Commands:
  update    Check for updates and optionally apply

Options:
  -d, --database <DATABASE>           Database connection string
  -p, --port <PORT>                   HTTP listen port
      --host <HOST>                   HTTP bind host
  -l, --log-level <LOG_LEVEL>         Log level
      --master-api-key <KEY>          Master API key for admin access
      --encryption-key <KEY>          Encryption key for credential storage
  -h, --help                          Print help
  -V, --version                       Print version
```

Configuration priority: `.env` file < environment variable < CLI argument.

---

## Environment Variables

Infrastructure env vars — all other config lives in the database (`system_settings` table):

| Variable | Default | Description |
|---|---|---|
| `DATABASE` | `sqlite://./data/gateway.db` | Storage backend URI |
| `PORT` | `8000` | HTTP listen port |
| `HOST` | `0.0.0.0` | HTTP bind host |
| `LOG_LEVEL` | `info` | Logging level |
| `MASTER_API_KEY` | _(auto-generated)_ | Admin key — auto-generated and saved to `.env` on first run |
| `ENCRYPTION_KEY` | _(auto-generated)_ | AES-256 key for credential encryption and API key HMAC — auto-generated on first run |
| `CONTAINER` | _(unset)_ | Set to `true` in Docker — requires MASTER_API_KEY and ENCRYPTION_KEY to be provided explicitly |

**DATABASE URI formats:**
- `sqlite:///app/data/gateway.db`
- `postgres://user:pass@host:5432/db`
- `dynamodb://us-east-1`

**First-run behavior:**
- **Bare metal:** If MASTER_API_KEY or ENCRYPTION_KEY are missing, they are auto-generated and appended to `.env`.
- **Container** (`CONTAINER=true`): Missing keys cause startup to abort with an error.

---

## System Settings (database)

Managed via Admin UI or `PUT /admin/api/settings/:key`. Changes take effect **immediately** (no restart needed).

| Key | Default | Description |
|---|---|---|
| `prompt_cache` | `passthrough` | Bedrock cache behavior: `disable` / `passthrough` / `5m` / `1h` |
| `rate_limit` | `100` | Default RPM for API keys: positive integer or `disable` |
| `enable_tool_use` | `true` | Default capability: tool use / function calling |
| `enable_extended_thinking` | `true` | Default capability: extended thinking |
| `enable_document_support` | `true` | Default capability: document content blocks |
| `enable_ptc` | `false` | Default capability: Programmatic Tool Calling |
| `web_search_provider` | _(empty)_ | Web search: `tavily` / `brave` / empty to disable |
| `web_search_api_key` | _(empty)_ | API key for web search provider |
| `web_fetch_max_content_kb` | `512` | Max content size (KB) for web_fetch tool |

---

## Key File Paths

```
src/
├── main.rs                      # Entry point + CLI (clap)
├── api/
│   ├── messages.rs              # POST /v1/messages  (Anthropic protocol)
│   ├── chat_completions.rs      # POST /v1/chat/completions  (OpenAI protocol)
│   ├── embeddings.rs            # POST /v1/embeddings
│   ├── images.rs                # POST /v1/images/generations
│   ├── rerank.rs                # POST /v1/rerank
│   ├── health.rs                # GET /health /ready /liveness
│   ├── models.rs                # GET /v1/models
│   ├── usage.rs                 # GET /v1/usage
│   ├── ptc_handler.rs           # PTC orchestration
│   └── admin/
│       ├── keys.rs              # API key CRUD
│       ├── backends.rs          # Backend CRUD
│       ├── mappings.rs          # Model mapping CRUD
│       ├── system_settings.rs   # System settings CRUD
│       ├── admin_usage.rs       # Admin usage analytics
│       ├── status.rs            # Server status
│       └── update.rs            # Self-update API
├── converters/
│   ├── anthropic_gemini.rs      # Anthropic ↔ Gemini
│   ├── anthropic_openai.rs      # Anthropic ↔ OpenAI
│   ├── openai_bedrock.rs        # OpenAI ↔ Bedrock
│   ├── openai_gemini.rs         # OpenAI ↔ Gemini
│   ├── cache_transform.rs       # Prompt cache mode control
│   ├── capability_filter.rs     # Model capability filtering
│   └── sdk_utils.rs             # serde_json::Value ↔ aws_smithy Document
├── schemas/
│   ├── anthropic.rs             # Anthropic request/response structs
│   ├── openai.rs                # OpenAI request/response structs
│   ├── bedrock.rs               # Bedrock structs
│   ├── gemini.rs                # Gemini structs
│   ├── embeddings.rs            # Embedding structs
│   ├── images.rs                # Image generation structs
│   └── rerank.rs                # Rerank structs
├── server/
│   ├── app.rs                   # App bootstrap, DynamicConfig build + reload
│   ├── state.rs                 # AppState + DynamicConfig definitions
│   └── routes.rs                # Axum router & middleware
├── services/
│   ├── bedrock.rs               # BedrockService (AWS SDK + Mantle)
│   ├── gemini.rs                # GeminiService (HTTP client)
│   ├── passthrough.rs           # PassthroughService (Anthropic / OpenAI proxy)
│   ├── model_mapping.rs         # Model ID resolution with moka cache
│   ├── usage_tracker.rs         # Token usage recording with per-model pricing
│   ├── capabilities.rs          # Model capability system
│   ├── service_tier.rs          # Service tier resolution
│   ├── update.rs                # Self-update from GitHub Releases
│   ├── backend_pool/            # Credential pool & load balancing
│   ├── ptc/                     # Programmatic Tool Calling (Docker sandbox)
│   └── web_tools/               # Web search & fetch tools
├── database/
│   ├── traits.rs                # DatabaseService trait (5 sub-traits)
│   ├── models.rs                # Data models (6 tables)
│   ├── encryption.rs            # AES-256-GCM encryption
│   ├── seed.rs                  # Default model mappings & settings
│   ├── sqlite/                  # SQLite implementation
│   ├── postgres/                # PostgreSQL implementation
│   └── dynamodb/                # DynamoDB implementation
├── middleware/
│   ├── auth.rs                  # API key auth (HMAC hash lookup)
│   ├── admin_auth.rs            # Admin key auth
│   └── rate_limit.rs            # Rate limiting (governor)
├── error/
│   └── types.rs                 # ApiError enum
├── config/
│   ├── settings.rs              # Settings struct + CLI overrides + auto-generation
│   └── aws.rs                   # AWS SDK config
└── utils/
    ├── api_key.rs               # HMAC-SHA256 hashing + middle-mask display
    ├── tokens.rs                # Token count estimation
    ├── retry.rs                 # Retry with backoff
    ├── string.rs                # String truncation
    ├── timeout.rs               # Timeout utilities
    └── tool_name_mapper.rs      # Long tool name shortening
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
    ├── Middleware: Auth (HMAC hash lookup) + Rate Limit
    │
    ├── /v1/messages         → messages.rs
    └── /v1/chat/completions → chat_completions.rs
              │
              ├── ModelMappingService  (resolve model ID)
              ├── Converter            (transform request)
              ├── Service              (call backend)
              └── Converter            (transform response)
```

### AppState + DynamicConfig

```rust
pub struct AppState {
    // Static (immutable after startup)
    pub settings: Arc<Settings>,
    pub database: Arc<dyn DatabaseService>,
    pub usage_tracker: Arc<UsageTracker>,
    pub model_mapping: Arc<ModelMappingService>,
    pub encryptor: Encryptor,
    pub ptc_service: Option<Arc<PtcService>>,
    pub update_service: Arc<UpdateService>,
    pub start_time: Instant,

    // Hot-reloadable (rebuilt on admin API changes)
    pub dynamic: Arc<RwLock<DynamicConfig>>,
}

pub struct DynamicConfig {
    pub bedrock: Option<Arc<BedrockService>>,
    pub gemini_pool: Option<Arc<CredentialPool<...>>>,
    pub anthropic_pool: Option<Arc<CredentialPool<...>>>,
    pub openai_pool: Option<Arc<CredentialPool<...>>>,
    pub web_tool_executor: Option<Arc<WebToolExecutor>>,
    pub prompt_cache_mode: PromptCacheMode,
    pub rate_limit_rpm: Option<u32>,
    pub default_capabilities: ModelCapabilities,
}
```

DynamicConfig fields are rebuilt and swapped atomically when backends or settings change via admin API. In-flight requests continue using the old config via Arc reference counting.

---

## Database Schema (6 tables)

| Table | Purpose |
|---|---|
| `api_keys` | API keys (HMAC-SHA256 hashed) with rate limits and budgets |
| `usage` | Token usage records per request |
| `model_mappings` | Source → target model ID mappings (supports wildcards) |
| `backends` | Backend credentials (Bedrock / Gemini / Anthropic / OpenAI) |
| `system_settings` | Runtime settings (rate_limit, prompt_cache, capabilities, web_search) |

Model mapping priority: exact match → wildcard match (by priority, then specificity) → reject.

**API key storage:** Keys are HMAC-SHA256 hashed before storage. The `key_display` column stores a middle-masked form (`sk-abcd••••5678`) for display. Plaintext is returned once at creation and never stored.

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

## Self-Update (bare metal)

```bash
# Check for updates
one-router update --check

# Download and apply update
one-router update
```

Admin API:
- `GET /admin/api/update` — cached update status
- `POST /admin/api/update/check` — trigger check against GitHub Releases
- `POST /admin/api/update` — download, verify SHA256, replace binary

Background checker runs every hour. Update replaces the binary in-place and requires manual restart.

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
2. Generate SHA256 checksums for each binary
3. Build multi-arch Docker image → push to DockerHub (`xtravisions/one-router`)
4. Create GitHub Release with binaries + checksums

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
  --tag v0.13.0

# Check service status
./scripts/apprunner-status.sh --profile <aws-profile> --region <region>
```

Update mode (`--create` omitted) only changes the image. Pass `--database` / `--master-api-key` / `--encryption-key` only when you need to update those values.

---

## Database Migrations

Migrations run automatically on startup. Standalone scripts available for pre-deployment:

```bash
# Run all migrations for a backend
./scripts/migrations/run.sh --backend sqlite --database-url ./data/gateway.db
./scripts/migrations/run.sh --backend postgres --database-url "postgres://..."
./scripts/migrations/run.sh --backend dynamodb --region us-east-1

# API key hashing backfill also runs automatically on startup
```

---

## Credential Pool & Load Balancing

Multiple credentials per backend are supported. Strategies:

- `RoundRobin` — cycle through credentials
- `Weighted` — probability-based on weight
- `Random` — random selection
- `Failover` — first available, falls back on error

---

## Conventions

- All async handlers take `State<AppState>`.
- Hot-reloadable fields accessed via `state.dynamic.read().await` — clone Arc values out, drop lock before `.await`.
- Errors in API handlers map to the **input protocol's** error format (Anthropic or OpenAI).
- Model ID resolution always goes through `ModelMappingService` — never hardcode backend model IDs in handlers.
- Streaming responses use `async_stream::stream!` macro.
- Database migrations run automatically on startup. Standalone scripts in `scripts/migrations/`.
- API keys are HMAC-SHA256 hashed. Admin routes use key `name` as identifier, not the key itself.
