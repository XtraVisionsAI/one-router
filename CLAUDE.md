# One Router — Development Guide

## Project Overview

One Router is a Rust API gateway that routes **Anthropic** and **OpenAI** protocol requests to four backend providers: **AWS Bedrock**, **Google Gemini**, **Anthropic API**, and **OpenAI API**.

- **Version:** 0.20.1
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
| `MASTER_API_KEY` | _(auto-generated)_ | Admin-only key — used for `/admin` UI login and admin API. Cannot call business endpoints (`/v1/*`). Auto-generated and saved to `.env` on first run |
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
| `web_fetch_provider` | _(empty)_ | Fetch method: `tavily` (Tavily Extract API) / empty (direct HTTP) |
| `failover_chains` | _(empty)_ | Model-level failover chains (JSON). `{"<source_model>":[{"provider":"...","model":"..."}]}`. When the resolved provider has no healthy credential, fall over to the first backup provider/model with a healthy pool. Empty = disabled |
| `pricing_sync_enabled` | `false` | Auto-sync model pricing from the LiteLLM price table. When on, a background job periodically overwrites the prices of mappings whose `pricing_source` is `litellm`; rows marked `manual` are never touched |
| `pricing_sync_url` | _(BerriAI raw JSON)_ | Source URL for the LiteLLM `model_prices_and_context_window.json`. Must be https |
| `pricing_sync_interval_hours` | `24` | Background pricing-sync interval (hours, min 1) |

---

## Key File Paths

```
src/
├── main.rs                      # Entry point + CLI (clap)
├── api/
│   ├── messages.rs              # POST /v1/messages  (Anthropic protocol)
│   ├── chat_completions.rs      # POST /v1/chat/completions  (OpenAI protocol)
│   ├── responses.rs             # POST /v1/responses  (OpenAI Responses API / Codex)
│   ├── embeddings.rs            # POST /v1/embeddings
│   ├── images.rs                # POST /v1/images/generations
│   ├── rerank.rs                # POST /v1/rerank
│   ├── health.rs                # GET /health /ready /liveness /metrics
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
│       ├── update.rs            # Self-update API
│       └── pricing.rs           # LiteLLM pricing-sync API (trigger + status)
├── converters/
│   ├── anthropic_gemini.rs      # Anthropic ↔ Gemini
│   ├── anthropic_openai.rs      # Anthropic ↔ OpenAI
│   ├── openai_bedrock.rs        # OpenAI ↔ Bedrock
│   ├── openai_gemini.rs         # OpenAI ↔ Gemini
│   ├── responses_chat.rs        # OpenAI Responses ↔ Chat Completions / Anthropic (web_search)
│   ├── cache_transform.rs       # Prompt cache mode control
│   ├── capability_filter.rs     # Model capability filtering
│   └── sdk_utils.rs             # serde_json::Value ↔ aws_smithy Document
├── schemas/
│   ├── anthropic.rs             # Anthropic request/response structs
│   ├── openai.rs                # OpenAI request/response structs
│   ├── responses.rs             # OpenAI Responses API request/response structs
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
│   ├── failover.rs              # Model-level credential-exhaustion failover chains
│   ├── beta_headers.rs          # anthropic-beta → Bedrock anthropic_beta (blocklist/map/passthrough)
│   ├── pricing_sync.rs          # LiteLLM price-table sync (updates model_mappings prices)
│   ├── responses_context.rs     # In-memory Responses context store (owner + TTL + capacity)
│   ├── service_tier.rs          # Service tier resolution
│   ├── inference_profile.rs     # Bedrock application inference profile ARN resolution
│   ├── image_url_fetcher.rs     # Image URL → base64 (SSRF-guarded)
│   ├── update.rs                # Self-update from GitHub Releases
│   ├── backend_pool/            # Credential pool & load balancing
│   ├── ptc/                     # Programmatic Tool Calling (Docker sandbox)
│   │   ├── service.rs           # PtcService: session management, owner validation
│   │   ├── sandbox.rs           # SandboxExecutor, CodeExecutor trait, OneshotExecutor
│   │   ├── runner.rs            # Python runner script for sandbox
│   │   └── exceptions.rs        # PtcError enum with HTTP status codes
│   └── web_tools/               # Web search & fetch tools
│       ├── mod.rs               # is_server_tool(), version matching, split_tools()
│       ├── executor.rs          # WebToolExecutor, WebToolBackend trait, run/run_stream
│       ├── search.rs            # SearchProvider trait, Tavily/Brave providers
│       └── fetch.rs             # FetchProvider trait, Reqwest/TavilyExtract providers
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
├── observability/
│   └── metrics.rs               # Prometheus registry + /metrics (bounded labels, no api_key)
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

### POST /v1/responses (OpenAI Responses API input — Codex CLI)

Translated to Chat Completions internally, then routed through the same 4-way
`x-provider` matrix as `/v1/chat/completions`. Not a native backend protocol.

| Path | Internal target | Converter |
|---|---|---|
| No hosted tools | `ChatCompletionRequest` → chat pipeline (`dispatch_chat`) → `ResponsesResponse` | `responses_chat` |
| Hosted `web_search` | Anthropic `MessageRequest` → `WebToolExecutor` (Bedrock/Gemini) → `ResponsesResponse` | `responses_chat` |

Streaming is **replay-based**: compute the full response non-streaming, then
replay it as the named Responses SSE event sequence (each frame carries an
`event:` line + `sequence_number` — Codex rejects streams without them).
Aux endpoints: `GET/DELETE /v1/responses/:id`, `POST /v1/responses/:id/cancel`,
`GET /v1/responses/:id/input_items`.

```
HTTP Request
    │
    ├── Middleware: Auth (HMAC hash lookup) + Rate Limit
    │
    ├── /v1/messages         → messages.rs
    └── /v1/chat/completions → chat_completions.rs
              │
              ├── ModelMappingService  (resolve model ID + provider)
              ├── PTC detection        (before routing, if beta header present)
              ├── Web Tools detection  (before routing, for Bedrock/Gemini only)
              │     ├── WebToolExecutor agentic loop (search/fetch/code_execution)
              │     ├── Citation post-processing
              │     └── Streaming: per-iteration SSE events
              ├── Capability filtering
              ├── Provider routing     (bedrock / gemini / anthropic / openai)
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
    pub sessions: SessionStore,
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
- Master and ephemeral keys record usage with identifiers `__master__` / `__ephemeral__` (no budget management). Master key `cost_rate` is `1.0`.
- **Auth model:** Master key is admin-only (rejected by `/v1/*` middleware). Ephemeral key (debug builds only) can call both admin and business APIs. Database-stored API keys can only call `/v1/*` business endpoints.
- **Admin UI auth:** POST `/admin/api/login` with `{"key": "..."}` → returns HttpOnly `admin_session` cookie. Admin middleware accepts either cookie or master/ephemeral key in header.
- API keys are created via `POST /admin/api/keys` (admin auth required). Plaintext returned once. Stored as HMAC-SHA256 hash.
- Credential `record_success()` auto-re-enables a disabled credential — no need to wait for `try_recover_credential()`.
- Web tools (web_search/web_fetch) are detected **before** provider routing. Anthropic/OpenAI passthrough natively support them (transparent). Bedrock/Gemini use `WebToolExecutor` proxy-side execution.
- Server tool versions are exact-matched (`SUPPORTED_WEB_SEARCH_VERSIONS` / `SUPPORTED_WEB_FETCH_VERSIONS`). Unsupported versions return `invalid_request_error`.
- PTC sessions are bound to the creating API key (`owner_key_hash`). Continuation requests validate ownership (403 on mismatch).
- PTC errors map to specific HTTP codes via `From<PtcError> for ApiError` (403/404/410/429/503/504).
- Graceful shutdown cleans up all PTC Docker containers before exiting.
- `WebToolBackend` trait abstracts the LLM call in the web tool loop — `BedrockService` and `GeminiWebToolBackend` implement it.
- `CodeExecutor` trait (in `ptc/sandbox.rs`) provides one-shot code execution. `OneshotExecutor` creates a container per call. Used by Dynamic Filtering (`web_search_20260209`).
- Bedrock `invoke_model_messages` auto-retries without `service_tier` if the initial call fails with a tier-related ValidationError.
- **Failover** (`services/failover.rs`): configured via the `failover_chains` setting. `DynamicConfig::apply_failover` runs right after `resolve()` in both handlers — if the resolved provider has no healthy credential (`provider_available` → `PoolStats::is_healthy()`), it switches to the first backup provider/model with a healthy pool. Credential-*exhaustion* failover only (not per-response retry). **PTC requests skip failover** (Bedrock/Docker-specific — detected up front via `is_ptc`). Exempt from the cache-affinity lock (the primary is unusable, so no cache benefit is lost). Failover targets bypass model_mapping and use default capabilities. Each switch increments `onerouter_failover_total{from,to}`.
- **Metrics** (`observability/metrics.rs`): unauthenticated `GET /metrics` (Prometheus text format). Counters recorded from `UsageTracker::record_usage` + an HTTP-duration middleware. Labels are bounded (`provider`/`protocol`/`model`/`direction`/`status`/`from`/`to`/`reason`/`version`) — the API key is **never** a label. Series: `onerouter_requests_total`, `onerouter_tokens_total`, `onerouter_cost_usd_total`, `onerouter_failover_total`, `onerouter_http_request_duration_seconds` (histogram), `onerouter_inflight_requests` (gauge, inc/dec in the `track_http_metrics` middleware), `onerouter_auth_failures_total{reason}` (recorded once in `impl IntoResponse for AuthError`; reason ∈ `missing_key`/`invalid_key`/`inactive_key`/`internal_error`), `onerouter_build_info{version}` (constant `1`, register-and-forget, version = `CARGO_PKG_VERSION`).
- **Pricing sync** (`services/pricing_sync.rs`): pulls the LiteLLM price table and **updates existing `model_mappings` rows' inline prices** (never creates mappings — one-router prices per source→target mapping, not in a separate table). Covers all 4 backends: a mapping's `provider` selects the LiteLLM namespace, its `target_model_id` is matched (Bedrock region-prefix fallback). Per-token source costs are stored ×1e6 (per-1M). Rows with `pricing_source = "manual"` are pinned (skipped unless `overwrite_manual`); `"litellm"` (default) rows are overwritten. A `None` source field never nulls out a stored price. Admin: `POST/GET /admin/api/pricing/sync` (`dry_run` query for preview). Background job gated on `pricing_sync_enabled` (re-reads settings each iteration; interval `pricing_sync_interval_hours`). `run_sync` invalidates the model-mapping cache on change.
- **Refusal-fallback passthrough** (fallback-credit-2026-06-09 beta): `MessageRequest.fallback_credit_token` and `MessageResponse.stop_details` are carried verbatim; `StopReason` includes `Refusal`/`Compaction`/`ModelContextWindowExceeded` (a refusal response no longer fails to deserialize). The `fallback` content block (`ContentBlock::Fallback`) is client-side audit bookkeeping — preserved on Anthropic/OpenAI passthrough but **stripped in `build_invoke_model_body` before Bedrock** (Bedrock rejects it); the credit token stays on the request body. Claude InvokeModel streaming already forwards `stop_details` since it relays native SSE bytes.
- **Responses API** (`api/responses.rs`, `converters/responses_chat.rs`, `services/responses_context.rs`): `POST /v1/responses` translates the OpenAI Responses protocol to `ChatCompletionRequest`, runs it through the shared `dispatch_chat` seam (extracted from `chat_completions.rs` — resolve + failover + route, no usage recording), then converts `ChatCompletionResponse` → `ResponsesResponse`. Hosted `web_search`/`web_search_preview` tools fork to an Anthropic `MessageRequest` + `WebToolExecutor` (web tools are only wired on the `/v1/messages` side). Streaming is **replay-based**: `build_responses_events` (pure, unit-tested) produces the ordered `(event_type, payload)` sequence, `stream_responses_events` wraps each into an SSE `Event` with an `event:` line + auto-incrementing `sequence_number` (Codex CLI rejects streams lacking either). Context store is **in-memory** (`ResponsesContextStore`: `Arc<RwLock<HashMap>>` + `owner_key_hash` binding + TTL + capacity eviction by monotonic `seq`), swept every 600s by an `app.rs` background task; `previous_response_id` restores prior messages, owner mismatch returns 404 (no existence leak). Usage recorded with protocol tag `"responses"`. Storage on by default (`store != false`).
- **anthropic-beta pipeline** (`services/beta_headers.rs`): the inbound `anthropic-beta` HTTP header is resolved into the Bedrock body's `anthropic_beta` array via `resolve_bedrock_betas(header, model_id)` — a three-state rule per comma-separated value: **blocklist** → dropped (betas Bedrock rejects, e.g. `redact-thinking-2026-02-12`, `server-side-fallback-2026-06-01`); **mapping** (Claude models only) → expanded to native betas (`advanced-tool-use-2025-11-20` → `[tool-examples-2025-10-29, tool-search-tool-2025-10-19]`); otherwise → passed through. Result is order-preserving + de-duped, merged in `build_invoke_model_body` via `ensure_anthropic_beta` (stacks with the defer_loading auto-injection). **Bedrock InvokeModel only** — the `beta_header` param is threaded through `invoke_model_messages(_stream)` from `messages.rs`'s Bedrock branch; PTC, chat_completions, and web-tool callers pass `None`. Passthrough (Anthropic/OpenAI) forwards the header untouched to a native upstream, so no filtering there. Blocklist/mapping are hardcoded defaults (mirroring the reference proxy's `config.py`).
