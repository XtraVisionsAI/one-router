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
  update            Check for updates and optionally apply
  reset-master-key  New master key: shown once, only its SHA-256 saved to .env
  hash-key          stdin key → sha256:<hex> (for MASTER_API_KEY); weak keys refused unless --allow-weak
  wrap-key          Wrap ENCRYPTION_KEY with aws-kms / vault-transit / systemd-creds
  migrate-secrets   Offline: re-encrypt plaintext / v1 stored secrets as v2 (--dry-run: read-only preview, no schema migration)

Options:
  -d, --database <DATABASE>           Database connection string
  -p, --port <PORT>                   HTTP listen port
      --host <HOST>                   HTTP bind host
  -l, --log-level <LOG_LEVEL>         Log level
      --master-api-key <KEY>          Master API key for admin access
      --encryption-key <KEY>          Encryption key for credential storage
      --seed-defaults <MODE>          When to seed default model mappings: off / empty / missing
      --max-body-size-mb <MB>         Maximum HTTP request body size in MB (default 64)
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
| `HOST` | `127.0.0.1` (`0.0.0.0` when `CONTAINER=true`) | HTTP bind host — loopback by default on bare metal; every Docker image sets `CONTAINER=true`, where the published port is the boundary |
| `METRICS_PUBLIC` | `false` | Serve `/metrics` unauthenticated. Default: admin auth (master key / admin session) |
| `TRUSTED_PROXY_CIDRS` | _(empty)_ | Comma-separated CIDRs of reverse proxies whose `X-Forwarded-For` is trusted for the client address (IP allowlists, audit log, admin login throttle). Empty = TCP peer only, header ignored. Hops are walked right-to-left as raw tokens (`ip`, `ip:port`, `[v6]:port`) past trusted hops; an unparsable / empty hop before the client, or a non-ASCII header line, makes the client **unknown** (`None`: IP allowlists deny, audit records no address) — never the proxy's own address. Header **absent** from a trusted peer → the peer (the proxy itself is the caller) |
| `LOG_LEVEL` | `info` | Logging level |
| `MASTER_API_KEY` | _(auto-generated)_ | Admin-only key — for `/admin` UI login and admin API. Cannot call `/v1/*` business endpoints. Plaintext **or `sha256:<hex>`** (only compared, so the gateway never needs the plaintext). A strong plaintext key read from `.env` is replaced there by its hash on startup; first-run generation stores only the hash and shows the key once (on a terminal). `one-router reset-master-key` / `one-router hash-key`. Deploy scripts deploy the hash |
| `ENCRYPTION_KEY` | _(auto-generated)_ | AES-256 key for credential encryption and API key HMAC. Plaintext (startup warning) or a provider reference resolved at startup, fail-closed: `aws-kms:<region>:<base64>` (KMS Decrypt via the instance/task/pod role, encryption context `app=one-router,purpose=ENCRYPTION_KEY`), `vault-transit:<key>:<vault:v1:…>` (`VAULT_ADDR` + `VAULT_TOKEN` or `VAULT_K8S_ROLE`; optional `VAULT_TRANSIT_MOUNT`/`VAULT_NAMESPACE`/`VAULT_CACERT`), `systemd-creds:<name>` (`$CREDENTIALS_DIRECTORY`, TPM-bound), `raw:<key>`. Unknown `scheme:` prefixes abort startup. Create with `one-router wrap-key --provider aws-kms\|vault-transit\|systemd-creds --key …` (wraps the *same* key — existing data stays valid) |
| `CONTAINER` | _(unset)_ | Set to `true` in Docker — requires MASTER_API_KEY and ENCRYPTION_KEY to be provided explicitly |
| `SEED_DEFAULTS` | `empty` | When to seed default model mappings on startup: `off` (never) / `empty` (only when the mappings table is empty — user deletions stick) / `missing` (legacy: re-insert any missing default on every startup). System settings are always backfilled per key regardless of this mode |
| `MAX_BODY_SIZE_MB` | `64` | Maximum HTTP request body size in MB, applied as an axum `DefaultBodyLimit` on the whole router (axum's own default is 2 MB). Infrastructure-level: read once at startup, not hot-reloadable. Keep any reverse proxy's limit (nginx `client_max_body_size`) in step |
| `BEDROCK_ALLOWED_PROFILES` | _(unset = any)_ | Comma-separated AWS profile names Bedrock backends may reference. A backend naming another profile is rejected on write and skipped on load |
| `BEDROCK_ALLOW_DEFAULT_CREDENTIALS` | `true` | Allow Bedrock backends without explicit keys/profile to use the host's default AWS credential chain (env / instance role / SSO cache). Set `false` so the gateway's own identity can never be borrowed through the admin API |
| `ADMIN_COOKIE_INSECURE` | _(unset)_ | Drop the `Secure` flag from the `admin_session` cookie (plain-HTTP admin access on a non-localhost host). Leave unset behind TLS |
| `PTC_ENABLED` | `false` | Infra opt-in for the Docker code-execution sandbox (PTC and web_search dynamic filtering). Without it the sandbox is never constructed, even when the Docker socket is reachable. PTC additionally needs the per-model / `enable_ptc` capability |
| `PTC_IMAGE` | `python:3.11-slim` | Sandbox image. Pin by digest in production (`python:3.11-slim@sha256:…`) |
| `PTC_MAX_SESSIONS` | `32` | Gateway-wide cap on concurrent PTC sessions (one container each); over the cap → 429 |
| `PTC_MAX_SESSIONS_PER_KEY` | `4` | Per-API-key cap on concurrent PTC sessions; over the cap → 429 |
| `PTC_MAX_SESSIONS_PER_USER` | `8` | Per-user cap (all of the user's keys, `ApiKeyInfo.user`) on concurrent PTC sessions + in-flight dynamic-filtering code runs, so one user with many keys cannot fill the global pool; over the cap → 429 |
| `OUTBOUND_PROXY` | `off` | Proxy for SSRF-guarded fetches (`config/outbound_proxy.rs`, read once at startup, invalid → startup error): `off` / `env` (`HTTPS_PROXY`/`HTTP_PROXY`/`NO_PROXY`, lowercase too) / explicit `http(s)://[user:pass@]host:port` (userinfo redacted in logs; SOCKS rejected — reqwest built without `socks`) / scheme-less `host:port` (explicit port required for `OUTBOUND_PROXY=<value>` — `proxy.corp` alone is refused; in `env` mode a scheme-less, port-less `HTTP(S)_PROXY` is read like curl does, `http://host:80`, with a warning, so existing proxy environments keep starting). Boolean-like values (`on`/`1`/`true`/`yes`/`enabled`/`false`/`no`/…) → startup error "use `env` or a URL" (they used to become `http://on:80`). Provider clients (Bedrock/Gemini/OpenAI/Anthropic/Tavily/Brave) honor env proxies regardless. Startup: `off` + `HTTPS_PROXY` set → info naming the unproxied features |
| `OUTBOUND_PROXY_SCOPE` | `admin` | `admin` = pricing sync, LiteLLM catalog/import, budget webhook; `all` = also web_fetch direct fetch + image URL inlining (startup warning: the proxy must deny 10/8, 172.16/12, 192.168/16, 127/8, 169.254/16, 100.64/10, fc00::/7, ::1) |

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
| `rate_limit` | `100` | Default RPM for API keys: positive integer or `disable` (disables per-key RPM/TPM too; `max_concurrency` caps still apply) |
| `enable_tool_use` | `true` | Default capability: tool use / function calling |
| `enable_extended_thinking` | `true` | Default capability: extended thinking |
| `enable_document_support` | `true` | Default capability: document content blocks |
| `enable_ptc` | `false` | Default capability: Programmatic Tool Calling (enforced — the proxy-side PTC branch needs this or the mapping's `ptc` capability, plus `PTC_ENABLED`) |
| `web_search_provider` | _(empty)_ | Web search: `tavily` / `brave` / empty to disable |
| `web_search_api_key` | _(empty)_ | API key for web search provider |
| `web_fetch_max_content_kb` | `512` | Max content size (KB) for web_fetch tool (1–10240; also clamped at use, saturating math) |
| `web_fetch_provider` | _(empty)_ | Fetch method: `tavily` (Tavily Extract API) / empty (direct HTTP) |
| `failover_chains` | _(empty)_ | Model-level failover chains (JSON). `{"<source_model>":[{"provider":"...","model":"..."}]}`. When the resolved provider has no healthy credential, fall over to the first backup provider/model with a healthy pool. Empty = disabled |
| `pricing_sync_enabled` | `false` | Auto-sync model pricing from the LiteLLM price table. When on, a background job periodically overwrites the prices of mappings whose `pricing_source` is `litellm`; rows marked `manual` are never touched |
| `pricing_sync_url` | _(BerriAI raw JSON)_ | Source URL for the LiteLLM `model_prices_and_context_window.json`. Must be https |
| `pricing_sync_interval_hours` | `24` | Background pricing-sync interval (hours, min 1) |
| `budget_alert_thresholds` | `0.8,1.0` | Budget alert thresholds (fractions of a user's / key's budget). Each fires once per budget period |
| `budget_alert_webhook_url` | _(empty)_ | HTTPS webhook (Slack-compatible) for budget alerts; sensitive. Empty = log + `onerouter_budget_alerts_total` only |
| `budget_enforcement` | `soft` | `soft` = check before, charge after (concurrent requests can overshoot). `precharge` = reserve an estimate on every budget layer before the request, settle when the response body ends |
| `budget_precharge_output_cap` | `8192` | Precharge only: output tokens assumed = min(max_tokens, cap) |
| `rate_limit_store` | `memory` | `memory` = RPM/TPM per instance; `database` = shared one-minute window counters (`rate_counters`), fails open |
| `audit_log_retention_days` | `365` | Audit log retention, purged daily (0 = keep) |
| `auth_cache_ttl_secs` | `30` | API key lookup cache TTL per instance (0–300; 0 = off). Revocation reaches other instances within this TTL |
| `bedrock_max_request_mb` | `15` | Gateway pre-check ceiling (MB, 1–64) for bodies sent to Bedrock's OpenAI-compatible endpoints (Mantle + runtime chat/responses). Measured 2026-10-15: bedrock-runtime caps at ~20,000,000 bytes and answers larger bodies with a misleading "JSON malformed" 400; Mantle accepted 20 MB. Replaces the old hardcoded 4 MB guard |

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
│   ├── key.rs                   # GET /v1/key  (a key's own expiry + budgets)
│   ├── ptc_handler.rs           # PTC orchestration
│   ├── extractors.rs            # AnthropicJson<T>: Json<T> with Anthropic-format rejections
│   └── admin/
│       ├── keys.rs              # API key CRUD
│       ├── users.rs             # User CRUD (billing principals)
│       ├── teams.rs             # Team CRUD (aggregate budget / limits)
│       ├── audit.rs             # Audit log query
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
│   ├── litellm_catalog.rs       # LiteLLM catalog browse + import (creates model_mappings)
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
│   ├── model_access.rs          # Model allowlist (key ∩ user) enforcement
│   └── rate_limit.rs            # Rate limiting (RPM governor + TPM window; user + key buckets)
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

## Database Schema (10 tables)

| Table | Purpose |
|---|---|
| `users` | Billing / shared-limit principals (budget, cost rate, RPM/TPM, model allowlist) owning API keys |
| `api_keys` | API keys (HMAC-SHA256 hashed), owned by a user; optional key-level sub-limits, expiry, allowlist |
| `audit_logs` | Admin write / login audit trail (actor, client, action, target, before/after) |
| `teams` | Aggregate budget / limit layer over users (no permissions) |
| `rate_counters` | Shared one-minute RPM/TPM window counters (`rate_limit_store = database`) |
| `usage` | Token usage records per request |
| `model_mappings` | Source → target model ID mappings (supports wildcards) |
| `backends` | Backend credentials (Bedrock / Gemini / Anthropic / OpenAI) |
| `system_settings` | Runtime settings (rate_limit, prompt_cache, capabilities, web_search) |

Model mapping priority: exact match → wildcard match (by priority, then specificity) → reject.

**Mapping prices:** per-1M-token `input_price` / `output_price` / `cache_read_price` / `cache_write_price`, plus non-token USD `price_per_request` / `price_per_image` / `price_per_search_unit` (SQL default 0, startup + `scripts/migrations/*/010_non_token_pricing.sql`; DynamoDB optional `N` attributes). The unit prices apply **only** to `/v1/images/generations` and `/v1/rerank` — handlers pass `DefaultPricing::Units(BillableUnits)` to `spawn_record_usage` (images: actual `data.len()`; rerank: `BillableUnits::rerank(query, documents)` = `ceil(Σᵢ ceil((query_tokens + doc_tokensᵢ) / 500) / 100)`, min 1 search unit — Cohere/Bedrock split a document over ~500 query + document tokens into chunks that each count as a document; tokens via `utils/tokens.rs::estimate_text_tokens`). Cost (`usage_tracker::compute_cost`) = tokens (mapping's own prices, no DEFAULT_* fallback for `Units`) + `price_per_request` + `price_per_image × images` + `price_per_search_unit × units`, × cost rate. Token endpoints ignore unit prices (they may record several rows per request). Precharge treats both paths as billable (`n` default 1 / the same `BillableUnits::rerank` over the body's query + documents → `estimate_cost_with`). A budgeted key whose images/rerank request costs 0 logs one warn per model per process. Admin API: fields optional, validated finite ≥ 0 (all seven prices); omitted on PUT = keep the stored value. Seeded Cohere Rerank 3.5 mappings: `$0.002`/search unit (Bedrock $2 / 1K queries); no image mappings are seeded.

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

**Signed releases (fail closed):** `one-router update` refuses to install unless the binary embeds a release public key (`ONE_ROUTER_RELEASE_PUBKEY` at build time) **and** the release ships `<asset>.sha256` + `<asset>.sha256.sig` (Ed25519 over the checksum file) **and** `<asset>.manifest.sig` (Ed25519 over the version-bound manifest `one-router-release-v1\n<tag>\n<asset>\n<sha256>\n`, tag exactly as published, e.g. `v0.21.0`) that all verify; the checksum file must contain exactly one entry naming this platform's asset. Binding tag + asset stops a validly signed checksum from an older release (downgrade) or another asset being replayed under a newer tag. Downloads are streamed with caps (archive 200 MB, checksum/signature files 64 KB). `release.yml`'s sign job produces both signatures (the `.sha256.sig` stays for older updaters and `Dockerfile.release`). Setup: `scripts/release-keygen.sh` → store the private key as the `RELEASE_SIGNING_KEY` Actions secret and the base64 SPKI public key as the `RELEASE_PUBLIC_KEY` Actions variable; `release.yml` fails without them. `docker/Dockerfile.release` needs `--build-arg RELEASE_PUBLIC_KEY=…` and verifies the signature before extracting. Local / unsigned builds cannot self-update.

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
- API keys are HMAC-SHA256 hashed. Admin routes use the key's `key_id` as identifier (legacy `name` accepted, deprecated), never the key or its hash.
- Master and ephemeral keys record usage with identifiers `__master__` / `__ephemeral__` (no budget management). Master key `cost_rate` is `1.0`.
- **Auth model:** Master key is admin-only (rejected by `/v1/*` middleware). Ephemeral key (debug builds only) can call both admin and business APIs. Database-stored API keys can only call `/v1/*` business endpoints.
- **Admin UI auth:** POST `/admin/api/login` with `{"key": "..."}` → returns HttpOnly `admin_session` cookie. Admin middleware accepts either cookie or master/ephemeral key in header.
- API keys are created via `POST /admin/api/keys` (admin auth required). Plaintext returned once. Stored as HMAC-SHA256 hash.
- **API key identity** (design: `docs/design/api-key-user-management.md`, P0 implemented): every key has a stable `key_id` (UUIDv4, `api_keys.key_id` unique; backfilled on startup) — the hash stays the PK/auth lookup but is **never** returned by the admin API. Admin routes are `/admin/api/keys/:key_id` (`GET`/`PUT`/`DELETE`, `POST …/activate`, `POST …/deactivate`); a non-UUID path segment is still resolved as a key **name** for one release and the response carries `Deprecation: true`. `DELETE ?action=delete` hard-deletes the row; `DELETE` without `action` (or `action=deactivate`) still only deactivates (deprecated default, kept so old scripts don't delete keys). `usage.key_id` is written on every new row (SQL backends backfill it through the hash; DynamoDB usage is not backfilled) and `group_by=api_key` groups by `COALESCE(key_id, api_key)`; identifiers with no live key render as `deleted key · <first 8>`. `ApiKeyInfo::usage_api_key()` is the single source for the `usage.api_key` value (hash, or `__master__`/`__ephemeral__`) — `/v1/usage` previously filtered by the masked display string and always came back empty. Key `metadata` is a free-form admin JSON object (≤ 4 KB).
- **Users** (P1 of `docs/design/api-key-user-management.md`): every API key belongs to a **user** (`users` table; `api_keys.user_id`), the billing and shared-limit principal. Budget (`monthly_budget`), `cost_rate`, RPM/TPM and `allowed_models` live on the user and are shared by all of its keys; key-level `rate_limit`/`tpm_limit`/`monthly_budget`/`allowed_models` are optional **sub-limits** that can only narrow (every layer must pass; allowlists intersect; `cache_ttl` key → user). Key names are unique **per user**. Keys can expire (`expires_at`, 401 `API key expired.`); a deactivated user disables all its keys (401 `API key owner is inactive.`). Budget exhaustion is **derived** from counters per layer (`period_spend`: a counter from an earlier month counts as 0) — keys are no longer deactivated with `budget_exceeded`. `usage.user_id` is denormalized at write time. Startup migration `DatabaseService::migrate_keys_to_users` turns every ownerless key into one user carrying its budget/limits (conditional `assign_unowned_key`, multi-instance safe) and backfills `usage.user_id` (DynamoDB: background, `__usage_user_backfill` pending→done). `__`-prefixed system settings are internal (hidden from / rejected by the settings API). Admin: `/admin/api/users` (`GET`/`POST`, `/:user` `GET`/`PUT`/`DELETE[?cascade=true]`, `…/activate|deactivate`; `:user` = id or name); `POST /admin/api/keys` takes `user_id` (id or name) — omitted = deprecated legacy call that auto-creates a same-named user from the limit fields; `cost_rate` on a key is rejected. Usage: admin `group_by=user` + `user=` filter; `/v1/usage?scope=user`. Model allowlist enforcement is `middleware/model_access.rs` (auth → allowlist → rate limit): only callers with an allowlist get their body buffered to read the top-level source `model`; **fail closed** on model-bearing POSTs (`/messages`, `/messages/count_tokens`, `/chat/completions`, `/responses`, `/embeddings`, `/rerank`, `/images/generations`): a non-object body, missing / non-string `model`, or a **duplicate top-level `model` key** (typed handlers reject duplicates but `/v1/responses` parses `Value`, last wins) → 400; 403 in the input protocol's format; `/v1/models` is filtered. Allowlist globs share `utils/glob.rs` — a single `*` only.
- **P2 key operations** (`docs/design/api-key-user-management.md` P2): **audit log** (`services/audit.rs`, table `audit_logs`) — `audit_admin_writes` middleware (inside admin auth, which inserts `AdminActor`: `master`/`ephemeral`/`session:<sha256(token)[..8]>`) records every admin POST/PUT/PATCH/DELETE incl. failures, action derived from the path (bounded `<type>.<verb>`); handlers add before/after snapshots via the `AuditDetail` response extension (keys, users, settings — snapshots are API response types, never secrets; sensitive setting values recorded as `<redacted>`); login success/failure recorded by the login handler; best-effort writes (`onerouter_audit_write_failures_total`); `GET /admin/api/audit` (prefix `action`, `target_type`, `target_id`, `start`/`end`, `before` cursor — time bounds must be RFC 3339 (any offset) or `YYYY-MM-DD` (UTC day; `end=<date>` covers the whole day), else 400, and are normalized in the handler to the UTC storage format `YYYY-MM-DDTHH:MM:SS.ffffffZ` because all three backends compare them as strings); daily retention purge. **Budget periods**: `budget_period` monthly/weekly(ISO)/daily per user and key; the period key lives in the legacy `budget_mtd_month` column. **Budget alerts** (`services/budget_alerts.rs`): thresholds crossed by a spend increment (`SpendAfter`) are claimed via compare-and-set on `budget_alerts_sent` (once per threshold per period across instances), then logged + metric + optional async webhook. **Rotation**: `POST /admin/api/keys/:id/rotate {grace_period_secs}` — replacement inherits owner/name/limits (not expiry), old key renamed `~rotated-…`, linked by `rotated_to`, expires after the grace period. **Auth cache** (`services/auth_cache.rs`, `AppState.auth_cache`): hash → (key, user), invalidated on this instance by every key/user write; `invalidate_all` bumps a generation counter and a lookup only caches its DB read if the generation is unchanged since before the read (`put_at`), so a read racing an admin write cannot re-insert the pre-write record; also debounces `last_used_at` (≤ 1 write / 5 min / key / instance). **IP allowlists**: `allowed_cidrs` on keys and users (intersect; unknown client address → deny); client address via `utils/client_ip.rs` (`TRUSTED_PROXY_CIDRS`; the server runs with `ConnectInfo`; malformed / non-ASCII `X-Forwarded-For` from a trusted proxy → unknown, never the proxy). **Usage tags**: `x-onerouter-tags` (≤ 5, `[A-Za-z0-9_.:-]{1,64}`) + key/user `default_tags` → `usage.tags`; `tag=` filter and `group_by=tag` (exploded per tag) on admin and `/v1/usage`. New keys are `sk-or-` + 32 hex (`utils/api_key::generate_key`); old `sk-` keys stay valid. New auth failure reason `ip_not_allowed`.
- **Teams & P3** (`docs/design/api-key-user-management.md` P3): `teams` table — a user belongs to at most one team (`users.team_id`, set via `PUT /admin/api/users/:user {"team": ..}`); team budget / period / RPM / TPM / `max_concurrency` are shared by all members' keys, team model and CIDR allowlists intersect with user/key, effective cost rate = user × team; a deactivated team disables every member key (401 `API key owner's team is inactive.`, reason `inactive_team`); `usage.team_id` denormalized, admin `group_by=team` / `team=` filter. Admin: `/admin/api/teams` CRUD (`DELETE` 409 with members unless `?force=true`, which unassigns them) + activate/deactivate. The auth cache holds `(key, user, team)`. **Concurrency** caps (`max_concurrency` on key/user/team) are per instance; the slot is released when the response body ends (streams hold it). **Shared rate limiting** (`rate_limit_store = database`): `TokenRateLimiter` switches RPM/TPM to `RateCounterStore` windows (RPM counted then un-counted on reject); expired windows purged every 10 min (DynamoDB: TTL). **Budget precharge** (`services/precharge.rs`, innermost business layer after rate limiting, `budget_enforcement = precharge`): estimate = body bytes/4 input (≤ 200k) + min(max_tokens, cap) output at model prices × cost rate (`/embeddings`: input only); conditional `BudgetStore::reserve_budget` on each budgeted layer (rollback + 403 if any refuses); each `Reservation` records the period key the reserve actually landed in (`reserve_budget` returns the row's stored `budget_mtd_month`, read atomically via `RETURNING` / DynamoDB `ALL_NEW`; falls back to the current period only when the row has none). `ApiKeyInfo.settlement` receives every cost from `record_usage` (`Settlement::report`, before the usage-row insert; `record_usage` then skips its own increments). **Settlement is order-independent** (security fix 2026-11 — non-streaming handlers `tokio::spawn` `record_usage`, which used to finish after the body and was lost → request free): when the body ends, a spawned task waits for ≥ 1 report (`SETTLE_REPORT_TIMEOUT` 30s; non-2xx responses don't wait → refund), then flushes a per-layer ledger (`Settlement::plan`: move each layer from what is applied to `actual`); a report arriving after settlement makes `record_usage` flush the delta itself (`UsageTracker::flush_settlement`). Timeout without a report → reservation **kept** (`precharge_total{result="held"}`), corrected by any later report. A refund is skipped when the layer's period rolled since the reservation (the reserve was archived with the old period; total = max(reserved, actual)). Spend counters are clamped at 0 in SQL (`MAX(0.0, …)` / `GREATEST(0, …)`; DynamoDB: conditional refund, else a compare-and-set loop (`refund_clamped`, consistent read → `budget_used_mtd` and `budget_used` both set to `max(0, cur − refund)` conditioned on the raw values just read, 5 attempts) — concurrent increments are never overwritten). **Period rollover** (`reset_*_monthly_budget`, shared helpers in `database/budget.rs`) is conditional on the stored `budget_mtd_month` still being the caller's previous period (`COALESCE(budget_mtd_month,'') = prev` / DynamoDB `ConditionExpression`; `NULL` ≡ `""`), so a request carrying a cached stale period (auth cache TTL) cannot reset the new period again; it archives the **stored** spend (the caller's `prev_mtd` is ignored) with a compare-and-set on `(period, spend)` (last attempt: period only). Keys, users and teams alike. Metrics: `onerouter_budget_precharge_total{result}`, `onerouter_rate_limit_store_errors_total`, `onerouter_rate_limited_total{kind=…|concurrency, scope=key|user|team}`.
- **Key self-query** (`api/key.rs`, request: one-statusline): `GET /v1/key` returns the calling key's `expires_at` / `expired` / `rotated` (`rotated_to` set — the replacement is never revealed), `server_time`, and `budgets[]` per layer (`scope`, `period`, `period_key` = `BudgetPeriod::key_at`, `used` = `period_spend` — the value `exhausted_budget` compares, `budget`, `exhausted`, `resets_at` = `BudgetPeriod::next_start`). It has its **own auth layer** `middleware/auth.rs::identify_api_key` and sits outside model-allowlist / rate-limit / precharge: no RPM/TPM, no usage row, no `last_used_at` touch (clients poll it). `identify_api_key` runs `check_revocation` (deactivated key / owner / team, IP allowlists — shared with `authorize`) but lets **expiry and spent budgets** through, inserting `KeyIdentity { now, principals, expired }` (the auth-cache `Principals`, so data is ≤ `auth_cache_ttl_secs` old). An **expired** key gets lifecycle fields only (no `name`, `budgets: []`) — it may be a leaked key that was rotated away. Key and user layers are always listed; the **team layer only when the team has a budget** (team-wide spend is other members' data). No `allowed_cidrs` / `metadata` / `cost_rate` / hash / limits. The master key cannot reach it (not a `/v1` key → `invalid_key`); the ephemeral key gets an empty `budgets`. `authorize` now checks revocation before expiry (an expired key from a disallowed address answers `ip_not_allowed`). **Auth error codes**: every `AuthError` body carries `error.code` = `AuthError::code()` (the same string as the `onerouter_auth_failures_total{reason}` label) and, for `budget_exceeded`, `error.scope` (`key`/`user`/`team`); existing fields and their order are unchanged. `/v1/usage` `summary.budget_period` names the period of `budget_used_mtd` / `monthly_budget` (the scope's principal).
- **Rate limiting** (`middleware/rate_limit.rs`): RPM (governor) limiters are cached per `"{key_id}:{rpm}"`, so a changed limit takes effect on the next request without invalidation; the global `rate_limit` setting is read from `DynamicConfig` per request (hot-reloaded; `disable` turns off RPM and TPM, but **not** `max_concurrency` caps). **TPM** (`tpm_limit`, positive int or null) is a sliding-window meter (`TokenRateLimiter`, two weighted 1-minute buckets) owned by `UsageTracker` and shared with the middleware: checked before the request, fed after it from `input + output + cache_creation` tokens (cache reads excluded) — one request can overshoot. Both are in-process (multi-instance = limit × instances). Buckets: user `user:{user_id}` (RPM = user `rate_limit` or the global default; TPM if set) + key `key_id` (only when a key-level sub-limit is set; an ownerless key keeps key RPM else default). Rejections → 429 `rate_limit_error` + `retry-after`, counted in `onerouter_rate_limited_total{kind=rpm|tpm,scope=key|user}`.
- **Billing integrity** (security fix 2026-11): **streams** (`services/stream_billing.rs`) — every billed SSE response (`/v1/messages`, `/v1/chat/completions`, Mantle `/v1/responses` relay, web-tool streams) is returned as the `Billed(stream, StreamBilling)` variant, whose `into_response` wraps the *encoded* body: an `SseUsageMeter` parses Anthropic / OpenAI-chat / Responses frames (usage events + output estimate from streamed text/tool-arg deltas via `utils/tokens.rs`); usage is recorded exactly once — at body end (the handler's exact `StreamUsage` if non-empty, else the meter) or, on client disconnect, from a drop guard (spawned) with the usage seen so far (input falls back to a request estimate). Both record paths run on a spawned task (`spawn_record`) — the end-of-body record is not awaited inside the body, so a client reset right after the last frame cannot cancel it (`take()` keeps it exactly-once with the drop guard). This also bills streams whose inner generator never wrote `StreamUsage`. **Web-tool loops**: `WebToolExecutor::run_billed` returns usage summed over every iteration (success: the response's `usage`; failure: `WebToolRunError { error, usage }`) — `/v1/messages` and hosted-`web_search` `/v1/responses` record it before returning the error, so a loop that fails after billed backend calls (max iterations, backend / tool error) is not free; streaming uses `run_stream_metered` with a `UsageAccumulator` updated after every backend call and read as the stream's exact usage, so a mid-loop error or disconnect bills all completed iterations. **OpenAI upstream streams**: `/v1/chat/completions` OpenAI passthrough forces `stream_options.include_usage: true` upstream; when the client did not ask for it, the usage-only final chunk is dropped and the `usage: null` field removed from the other chunks (`strip_forced_usage`), so client-visible output is unchanged. The Anthropic→OpenAI backend path (`/v1/messages`, `x-provider: openai`) forces it too and takes exact usage (cached split) from the final usage chunk, which the stream converter ignores; `[DONE]` no longer skips the `StreamUsage` write. **Bedrock Mantle chat streams** (`/v1/messages` → non-Claude Bedrock, `BedrockService::chat_completions_stream`) force `stream_options.include_usage: true` too (`force_include_usage`; the client gets converted Anthropic SSE, so nothing to strip) and take exact usage (cached split) from the final usage chunk instead of an estimate; `usage: null` on other chunks is ignored. **Mantle `/v1/responses` non-streaming** without a `usage` object bills an estimate (request `input` + `instructions`, output text + function-call args + reasoning summaries; `mantle_usage_or_estimate`) and logs a warn. **UTF-8-safe SSE decoding**: every incremental stream parser (OpenAI / Anthropic passthrough, Mantle chat / Responses relays, Gemini stream) decodes chunks through `utils/utf8_stream.rs::Utf8StreamDecoder`, which carries an incomplete multibyte tail to the next chunk (a CJK char / emoji split across TCP chunks used to drop the whole chunk or become U+FFFD) and lossy-replaces truly invalid bytes without stalling; `SseUsageMeter` already splits frames on bytes. **Embeddings / images / rerank** now call `UsageTracker::spawn_record_usage` (usage row, budgets, TPM, precharge settlement): embeddings bill input tokens at mapping prices (DEFAULT_* fallback like chat); images (prompt tokens) and rerank (query + document tokens) use `DefaultPricing::None` — billed only at the mapping's own input price, 0 when unpriced (no per-image / per-search-unit price exists in `model_mappings`). **Key updates** (`update_api_key`: admin edit / activate / rotate) never write `budget_used`/`budget_used_mtd`/`budget_mtd_month`/`budget_history` (SQL `write_api_key(.., with_counters=false)`; DynamoDB field-wise `UpdateItem` that also preserves `budget_alerts_sent`/`last_used_at`/`created_at`) — counters change only via increment / reserve / period reset; the user migration (`assign_unowned_key`) still writes them. A failed usage-row insert no longer skips budget charging.
- **Credential-leak hardening** (security audit 2026-11): outbound fetches of user/admin-supplied URLs (`web_fetch`, image URLs, pricing sync, budget webhook) go through `ssrf::guarded_client(Egress, …)` → `GuardedClient` — connect-time DNS guard (blocks private/loopback/metadata incl. trailing-dot and IPv4-embedded IPv6), no env proxy, no redirects. **Opt-in proxy** (`OUTBOUND_PROXY` + `OUTBOUND_PROXY_SCOPE`, installed once by `ssrf::init_outbound_proxy` in `App::new` before any guarded client): a proxied client sets explicit `reqwest::Proxy` entries, keeps the guarded resolver (the proxy's own hostnames are exempt so a private proxy is reachable; `NO_PROXY` targets still connect through the guard) and `send_guarded` adds `precheck_proxied` — static checks + local DNS with a 3s timeout: any forbidden address → reject, resolution failure / timeout / empty answer → allow **public-looking names only** (proxy-only DNS) — `ssrf::is_internal_name` refuses single-label hosts, `*.localhost`/`*.local`/`*.internal`/`*.corp`/`*.lan`/`*.home`/`*.home.arpa`/`*.intranet`/`*.localdomain`/`*.private`, and IP-embedding wildcard-DNS services (`*.nip.io`/`*.sslip.io`/`*.xip.io`/`*.traefik.me`/`*.localtest.me`/`lvh.me`, refused outright rather than parsing the embedded IP — encodings vary); redirects stay manual per hop (each hop re-runs the pre-check), size/time caps unchanged. The budget webhook client fails closed (no guarded client → error log, alerts log-only; `emit` sends through `send_guarded`). Refusals return the generic `ssrf::DESTINATION_NOT_ALLOWED` ("destination not allowed") to clients — the resolved address / reason is only logged (no DNS / network-layout oracle); for user-content egress (`validate_url` / `safe_get_bytes`: web_fetch, image URLs) a **local resolution failure returns the same message**, so a caller cannot enumerate internal names (admin egress may report more, never resolved IPs). `BLOCKED_HOSTS` + any `*.localhost` are refused statically on every path (`check_url_static` and the guarded resolver). **Tavily Extract limitation**: Tavily fetches server-side and may follow redirects there; only the requested URL and the URL Tavily reports back are policy-checked — intermediate hops are invisible to the gateway. Search provider (Tavily/Brave) and GitHub updater bodies are read capped (`read_body_capped`: 4 MB / 2 MB success, 4 KB error); the updater has no client-wide total timeout (connect 15s, API calls 30s, downloads 60s idle-per-chunk + 30 min ceiling). The resolver never sees **IP-literal** hosts (`https://169.254.169.254/`, `http://2130706433/`), so every guarded request goes through `ssrf::send_guarded` / `safe_get_bytes` (static `check_url_static` on the final URL first) and `parse_webhook_url` rejects forbidden literals at write and load time. Bodies are read with `ssrf::read_body_capped` (streamed; `Truncate` stops at the cap, `Reject` errors) — web_fetch `web_fetch_max_content_kb`, images 8 MB, pricing table 32 MB; every client that carries a credential has `redirect::Policy::none()`. Backend configs: `backend_pool/secure_config.rs` validates region (it is interpolated into SigV4-signed hostnames), https-only `base_url` without userinfo, and the `BEDROCK_ALLOWED_PROFILES` / `BEDROCK_ALLOW_DEFAULT_CREDENTIALS` policy on write **and** load (invalid stored rows are skipped with an error log); `GET …/config` returns secrets masked `••••last4` (audited as `backend.read_config`) and PUT merges masked values back — **only while the destination is unchanged**: if `base_url` is added/removed/changed or `backend_type` changes, any `••••` placeholder is refused with 400 (resend the real secrets), and a `backend_type` change without a config is refused too (region/profile are not destinations: region is restricted to AWS region codes). Sensitive settings (`web_search_api_key`, `budget_alert_webhook_url`) are encrypted at rest and masked on read. Ciphertext format is `encrypted:v2:` (AES-256-GCM with the row bound as AAD: `backend:<name>` / `setting:<key>` — a value copied to another row fails to decrypt); the runtime reads **v2 only** (`Encryptor::decrypt` rejects legacy `encrypted:` v1 and plaintext; empty = unset stays allowed). Legacy rows are migrated **offline** by `one-router migrate-secrets [--dry-run]` (`database/secret_migration.rs`, the only user of `Encryptor::decrypt_legacy`; re-read-and-compare before write, idempotent, per-row report without values, non-zero exit if a row fails to decrypt). It opens the store via `database::open_existing_database` (SQLite `mode=rw`/`ro`, never creates the file or directory — missing file → error). `--dry-run` is **strictly read-only**: `OpenMode::ReadOnly` (SQLite `mode=ro`, Postgres `default_transaction_read_only=on`, DynamoDB client only) and **no `initialize`** (no schema migration / backfill / seeding); a schema too old to read → non-zero exit telling the operator to run the real migration. The non-dry-run path still runs `initialize` (seeding off) before rewriting — the server would initialize and then abort on legacy secrets, so this is the upgrade path. Startup aborts (`server::app::check_stored_secrets`) while any backend config / sensitive setting is not v2, listing names/keys and the procedure (stop → back up DB → `migrate-secrets --dry-run` → `migrate-secrets` → start; rollback = restore the backup — no rolling-upgrade compatibility). On reload, unreadable rows (legacy or wrong-key v2) are skipped with an error log, and `GET /admin/api/status` reports `invalid_stored_secrets` (Admin UI dashboard shows an alert). Client-facing errors pass through `utils/redact.rs` (ARNs, account ids, AKIA/ASIA, sk-/AIza keys, reqwest `for url (…)` and bare `http(s)://` URLs → `<redacted-url>`, scheme-less internal endpoints → `<internal-host>`: `*.internal`/`*.local`/`*.corp`/`*.lan`/`*.intranet`/`*.localdomain` hosts and `localhost`/private/loopback/link-local IPv4 **with a port** — other scheme-less hostnames and port-less private IPs are a known limit, indistinguishable from ordinary text; relayed Responses `error`/`response.failed` SSE frames via `redact_error_payload`, Anthropic/OpenAI passthrough mid-stream error frames via `redact_sse_error_frame` — same JSON shape, non-error frames forwarded byte-for-byte) at the error-envelope constructors; AWS SDK errors become an opaque message + `error_ref` logged server-side; upstream 401/403 bodies are never echoed. Admin sessions: 12h absolute / 1h idle, cookie `HttpOnly; SameSite=Strict; Secure` (unless `ADMIN_COOKIE_INSECURE`), session ids stored hashed; cookie-authenticated non-GET admin requests need `X-One-Router-Admin: 1` or `Sec-Fetch-Site: same-origin|none` (403 otherwise; the Admin UI sends the header); login throttled to 10 failures / 15 min per client IP (429) — IPv6 bucketed per /64, each attempt atomically reserves a slot (moka entry upsert, `session.rs::reserve_attempt`) *before* verification so concurrent guesses cannot race past the limit; a success refunds only its own slot (`AdminThrottle::succeeded`; it does **not** clear other failures in the bucket, so a scraper sharing a proxy address cannot keep resetting a guesser), so only failures accumulate; a full bucket is refused **without verifying the key** (no correct-key oracle for a locked-out brute-forcer) — **except a correct strong key** (`session.rs::match_admin_key`: a plaintext master key passing `master_key::is_strong`, any `sha256:` hash — `hash-key` refuses weak input unless `--allow-weak` — or the random ephemeral key), which is admitted even while the bucket is full: guessing a high-entropy key online is infeasible, so the oracle is harmless, and a shared bucket can no longer lock out UI login, scripted admin calls or `/metrics`. A weak plaintext master key keeps the strict lockout. **Admin header-key auth shares the same throttle** (`session.rs::AdminThrottle::shared()`, same buckets as login): `require_admin_key` reserves a slot before checking an `x-api-key` / `Authorization: Bearer` key on `/admin/api/*` and `/metrics`, a full bucket → 429 `rate_limit_error` + `Retry-After` without verifying, a correct key refunds its slot and a correct strong key passes a full bucket (Prometheus with the right key never exhausts it or gets locked out); requests with no key (`Missing`, 401) or a valid session cookie are not counted. Remaining trade-off (weak plaintext master key only): anyone sharing a bucket can lock admins out for 15 min — behind a proxy without `TRUSTED_PROXY_CIDRS` that is every client, so the first admin auth (login or header key) carrying `X-Forwarded-For` with no trusted proxies configured logs a one-time warning; buckets are per instance, in memory (a restart clears them); malformed XFF from a trusted proxy shares the `unknown` bucket. Every `/admin` and `/admin/api` response carries `Content-Security-Policy` (`default-src 'self'`, `script-src 'self'`, `style-src 'self' 'unsafe-inline'` for naive-ui's runtime `<style>`, `img-src/font-src 'self' data:`, `frame-ancestors 'none'`, `object-src 'none'`, `base-uri 'self'`), `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: no-referrer` (`api::admin::admin_security_headers`). CORS applies to `/v1` only. Database URIs are redacted in logs; generated keys are printed masked and `.env` is written `0600`. Client `openai-organization` is not forwarded. PTC containers run as `65534:65534` with a pids limit. Recommended on EC2: IMDSv2 with hop limit 1. **Key storage** (`config/master_key.rs`, `config/key_provider.rs`, `config/dotenv_file.rs`): `MASTER_API_KEY` may be `sha256:<hex>` (malformed → startup error; `.env` plaintext migrated only when it is the effective value and strong — ≥ 24 chars, ≥ 10 distinct, no well-known fragment); `ENCRYPTION_KEY` providers are resolved in `main` before `App::new`, so everything downstream sees the plain key. The KMS role needs `kms:Decrypt` on the key, ideally conditioned on `kms:EncryptionContext:app = one-router`; `wrap-key --provider aws-kms` additionally needs `kms:Encrypt`. `.env` rewrites are atomic (temp + rename, `0600`) and never touch other lines.
- Credential `record_success()` auto-re-enables a disabled credential — no need to wait for `try_recover_credential()`.
- Web tools (web_search/web_fetch) are detected **before** provider routing. Anthropic/OpenAI passthrough natively support them (transparent). Bedrock/Gemini use `WebToolExecutor` proxy-side execution. **Domain restrictions** (`web_tools/domains.rs::DomainPolicy`) come from the client's server-tool definition (`allowed_domains` / `blocked_domains` on the `web_search_*` / `web_fetch_*` tool); the model's tool-call input may only narrow them (its allowlist is an extra layer that must also match, its blocklist is unioned). Client definitions are **strict** (400 `invalid_request_error`): each list must be absent, `null` or an array of non-blank valid domain strings — a non-array value or a non-string / blank entry is rejected, never read as "unrestricted"; an explicit empty `allowed_domains: []` / `blocked_domains: []` means "no list" (same as omitting it — clients that always send the field keep working, and a client widening its own policy is not an escalation). Model input is lenient (bad entries dropped, empty list = no-op) but an allowlist that had entries yet none valid — incl. non-string ones — matches nothing. Several definitions of the same tool (`web_search` / `web_fetch`) in one request are **intersected** (`DomainPolicy::intersect`: all allowlists must match, any blocklist refuses), not last-wins. The executor enforces the policy on every search result and every fetch URL (each redirect hop via `safe_get_bytes`; Tavily Extract: requested + reported URL) regardless of provider hints; a refused fetch is returned to the model as a tool error. Hosts come from `Url::parse` (http(s) only; userinfo / `?` / `#` / backslash / port / case / trailing-dot handled), matching is exact-or-subdomain on a label boundary, and a filter path (`example.com/blog`) must prefix the URL path on a segment boundary. Filter entries are parsed into `DomainFilter` with the same WHATWG parser: IDNA → punycode (`bücher.de` ≡ `xn--bcher-kva.de`), a port is ignored (filters match hosts, never ports), `*.good.com` = subdomains only (not the apex) while `good.com` / `.good.com` = apex + subdomains; entries with `?` `#` `@` `\` whitespace, or `*` other than a leading `*.`, are invalid — in the client's tool definition a 400 `invalid_request_error` (`web_tools::validate_server_tool`, called by `/v1/messages` and hosted-`web_search` `/v1/responses`), in model tool input ignored; an allowlist of only invalid entries matches nothing (fail closed). Provider hints widen `*.x` to `x` (allow) / omit it (block). Bedrock web-tool errors: AccessDenied generic, Throttled/Validation/ModelNotFound text kept (as on the main path), everything else opaque + `error_ref` logged. Model `max_results` is clamped to 1–20. Several definitions of the same web tool combine to the most restrictive policy (`DomainPolicy::intersect`); on `/v1/responses` every hosted `web_search` tool is converted (`web_search_tool_defs`) so an unfiltered extra tool cannot widen a filtered one, and a non-object `filters` is a 400 (`validate_web_search_filters`). Streaming web-tool error frames are built with the redacting `ErrorResponse::new`, and Bedrock `AccessDenied` becomes the same generic message as `from_bedrock_error`.
- Server tool versions are exact-matched (`SUPPORTED_WEB_SEARCH_VERSIONS` / `SUPPORTED_WEB_FETCH_VERSIONS`). Unsupported versions return `invalid_request_error`.
- PTC sessions are bound to the creating API key (`owner_key_hash`). Continuation requests validate ownership (403 on mismatch).
- PTC errors map to specific HTTP codes via `From<PtcError> for ApiError` (400/403/404/410/429/503/504).
- Graceful shutdown cleans up all PTC Docker containers before exiting.
- **PTC gating + lifecycle** (security audit 2026-11): the proxy-side PTC branch in `messages.rs` runs only when (1) `PTC_ENABLED=true` (else `PtcService` is never built), (2) the request is PTC-shaped (`advanced-tool-use-2025-11-20` beta + `code_execution_20250825` tool), (3) the route is `bedrock` and (4) the effective `ptc` capability is on (`ptc_handler::ptc_route_enabled`). Otherwise the request goes down the normal provider path unchanged (Anthropic passthrough handles PTC natively; failover is re-applied). Sessions: caps per key / global (`PTC_MAX_SESSIONS_PER_KEY` / `PTC_MAX_SESSIONS`, slot reserved before the container is created → 429 `SessionLimitExceeded`); expired sessions swept every 60s (`app.rs`) and before each creation; a session is removed (container force-removed) whenever a turn does not end in sandbox tool calls — final answer, any error, host timeout, oversized/invalid frame — so late runner output can never answer a later request; every `create_session` error path removes the container; containers also have `auto_remove`. Each session's `ContainerHandle` has its own mutex (no global lock across the up-to-65s exchange). Sandbox tool-call frames are untrusted (model-written code): `validate_sandbox_tool_calls` rejects names outside the session's callable set (`allowed_callers` ∋ `code_execution_20250825`), malformed/duplicate `toolu_` ids, non-object or > 256 KB inputs, > 32 calls; continuations forward only `tool_result`s for the pending ids. IPC payloads are **base64** in both directions (markers inside data cannot truncate frames); the host buffers ≤ 4 MB per in-flight frame (noise outside frames is discarded), the runner truncates captured stdout/stderr to 256k chars, one-shot exec output is capped at 4 MB. Usage of every Bedrock call in a PTC flow is accumulated and recorded (also when the flow fails after a billed call); the response `usage` is the turn total. Container hardening: read-only rootfs + `/tmp` tmpfs (64 MB), `memory_swap = memory`, `cap_drop ALL`, `no-new-privileges`, no network, uid 65534, pids limit; the runner runs inline via `python -u -B -c` (no file upload), tool names (validated `[A-Za-z0-9_-]{1,64}`) arrive in the `PTC_TOOLS` container env. **Cancellation safety** (2026-11): a created container is owned by an armed `ContainerCleanupGuard` (spawns removal on drop) until the session is in the map; explicit removals run on a spawned task (`sandbox::spawn_remove`, `PtcService::spawn_teardown`) and a guard is disarmed only *after* removal completed, so a client disconnect at any `.await` cannot leak a container (batch sweeps spawn every teardown before awaiting any); an in-flight exchange is covered by `ExchangeGuard`. **Runner batching** (thread-safe): `call_tool` from any thread queues under a `threading.Condition`; when no round-trip is in flight one caller leads it — collects the queue (20 ms quiet window, ≤ 200 ms), sends exactly one frame of ≤ 32 calls (excess → error results), reads exactly one result message and routes results by `tool_use_id` (missing id → error result, never `None`); calls made during a round-trip wait for the next one, and after the code block ends `close_and_drain` refuses new calls and waits for an in-flight round-trip before the output frame — so the host's one-frame-per-message rule holds for multi-threaded code. Tested against the real script by `runner.rs::test_runner_thread_safe_batching_with_python` (`testdata/runner_host.py`; skipped without `python3`). **Orphan sweep** (`PtcService` startup, `sweep_orphan_containers`): removes `ptc_sandbox_*` containers that are exited, never started for ≥ 10 min, or running for ≥ 60 min (2× the 30-min hard session lifetime); age is measured on the **daemon's** clock (`/info` `SystemTime`, fallback local clock — the margins absorb skew), so instances sharing one daemon don't remove each other's live sandboxes. Upgrade note: instances older than the 30-min lifetime cap have no such bound — drain PTC (or set `PTC_ENABLED=false`) for the stop-the-world upgrade.
- `WebToolBackend` trait abstracts the LLM call in the web tool loop — `BedrockService` and `GeminiWebToolBackend` implement it.
- `CodeExecutor` trait (in `ptc/sandbox.rs`) provides one-shot code execution. `OneshotExecutor` creates a container per call (main process `sleep`, code via `docker exec`). Used by Dynamic Filtering (`web_search_20260209` / `web_fetch_20260209`); only wired when `PTC_ENABLED=true`, and **gated per request** (`ptc/gated.rs::for_request`, applied in `messages.rs` via `WebToolExecutor::with_request_code_executor`): only with the model's effective `ptc` capability (else no executor → no `code_execution` tool, plain results), each run holds a PTC slot (`PtcService::reserve_oneshot`, same global / per-key / per-user caps as sessions), max 8 runs per response. The hosted-`web_search` `/v1/responses` path never gets an executor.
- **PTC lifecycle round 2**: per-user session cap (`PTC_MAX_SESSIONS_PER_USER`, `PtcSession.owner_user_id`); sessions also expire 30 min after creation regardless of activity (`MAX_SESSION_LIFETIME_SECS`). Reader channel: one solicited frame per host message (`ReaderState`: `send_code`/`send_tool_result` arm `awaiting`, the next frame consumes it) and an 8 MB queued-payload budget; an unsolicited or over-budget frame poisons the session — the reader force-removes the container and the sweep drops the session. Cancellation safety: `ContainerCleanupGuard` (create → start → store; also `OneshotExecutor`) and an exchange drop guard (client disconnect mid-exchange removes the session in the background). Orphan sweep of `ptc_sandbox_*` containers at startup and every ~10 min (age-gated for shared daemons: `created` ≥ 2 min, running ≥ 1 h, exited always). Runner tool-call ids are random (`toolu_` + 24 hex). Unpinned (non-digest) `PTC_IMAGE` logs a startup warning.
- Bedrock `invoke_model_messages` auto-retries without `service_tier` if the initial call fails with a tier-related ValidationError.
- **Failover** (`services/failover.rs`): configured via the `failover_chains` setting. `DynamicConfig::apply_failover` runs right after `resolve()` in both handlers — if the resolved provider has no healthy credential (`provider_available` → `PoolStats::is_healthy()`), it switches to the first backup provider/model with a healthy pool. Credential-*exhaustion* failover only (not per-response retry). **PTC requests skip failover** (Bedrock/Docker-specific — detected up front via `is_ptc`). Exempt from the cache-affinity lock (the primary is unusable, so no cache benefit is lost). Failover targets bypass model_mapping and use default capabilities. Each switch increments `onerouter_failover_total{from,to}`.
- **SSE keep-alive + mid-stream errors**: every streaming endpoint (`/v1/messages`, `/v1/chat/completions`, `/v1/responses`) wraps its `Sse` with `api::sse_keep_alive()` (SSE comment frame every 15s of silence). Bedrock `InvokeModelWithResponseStream` emits no `ping` while a Claude model thinks, and a multi-minute gap trips client idle watchdogs (Claude Code: "The response stopped arriving. The response above may be incomplete." — 180s default against a base-URL proxy, `CLAUDE_STREAM_IDLE_TIMEOUT_MS` floor 300s). `InvokeModelStreamResponse::into_event_pairs` yields `Result<(event, data), BedrockError>`: a mid-stream Bedrock exception (throttling / `ModelStreamErrorException` / internal / timeout) becomes a terminal `Err` which the handlers turn into an Anthropic `error` event (or an OpenAI error frame with no `[DONE]`) and `record_bedrock_error` on the credential — previously it was swallowed, the body just ended, and `record_success` was still called.
- **Metrics** (`observability/metrics.rs`): `GET /metrics` (Prometheus text format) behind admin auth (master key or admin session; Prometheus: `authorization: Bearer <MASTER_API_KEY>`) unless `METRICS_PUBLIC=true`. Counters recorded from `UsageTracker::record_usage` + an HTTP-duration middleware. Labels are bounded (`provider`/`protocol`/`model`/`direction`/`status`/`from`/`to`/`reason`/`version`) — the API key is **never** a label. `model` is the mapping's resolved **target** id (`UsageTracker::record_usage` resolves it; unmapped → `other`), never the client string (wildcard mappings accept any suffix), and `metrics.rs` additionally caps it at 256 distinct well-formed values (overflow / malformed → `other`). Series: `onerouter_requests_total`, `onerouter_tokens_total`, `onerouter_cost_usd_total`, `onerouter_failover_total`, `onerouter_http_request_duration_seconds` (histogram), `onerouter_inflight_requests` (gauge, inc/dec in the `track_http_metrics` middleware), `onerouter_auth_failures_total{reason}` (recorded once in `impl IntoResponse for AuthError`; reason ∈ `missing_key`/`invalid_key`/`inactive_key`/`expired_key`/`inactive_owner`/`inactive_team`/`budget_exceeded`/`ip_not_allowed`/`model_not_allowed`/`internal_error`), `onerouter_build_info{version}` (constant `1`, register-and-forget, version = `CARGO_PKG_VERSION`), `onerouter_rate_limited_total{kind,scope}`, `onerouter_budget_alerts_total{scope,result}`, `onerouter_audit_write_failures_total{action}`.
- **Pricing sync** (`services/pricing_sync.rs`): pulls the LiteLLM price table and **updates existing `model_mappings` rows' inline prices** (never creates mappings — one-router prices per source→target mapping, not in a separate table). Covers all 4 backends: a mapping's `provider` selects the LiteLLM namespace, its `target_model_id` is matched (Bedrock region-prefix fallback). Per-token source costs are stored ×1e6 (per-1M). Rows with `pricing_source = "manual"` are pinned (skipped unless `overwrite_manual`); `"litellm"` (default) rows are overwritten. A `None` source field never nulls out a stored price. Admin: `POST/GET /admin/api/pricing/sync` (`dry_run` query for preview). Background job gated on `pricing_sync_enabled` (re-reads settings each iteration; interval `pricing_sync_interval_hours`). `run_sync` invalidates the model-mapping cache on change. Imported modes: `chat` / `responses` / `embedding` (per-token; embeddings output 0) plus `image_generation` (`output_cost_per_image` → `price_per_image`, required) and `rerank` (`input_cost_per_query` → `price_per_search_unit`, required); both also take `input_cost_per_request` → `price_per_request`. Unit prices are stored as USD (not ×1e6) by the shared `pricing_sync::extract_prices`. Image size/quality/steps variant keys (`hd/1024-x-1024/dall-e-3`, `…/50-steps/…`, per-pixel) are skipped (`is_image_variant_key`) so they never shadow the base entry; token-only image models (`gpt-image-1`) are not imported — price manually.
- **LiteLLM model import** (`services/litellm_catalog.rs`): the *create* counterpart to pricing sync. `GET /admin/api/pricing/models?provider=&q=` browses importable table entries for a provider namespace (in-memory table cache, 1h TTL, URL from `pricing_sync_url`; capped at 200 candidates); `POST /admin/api/pricing/import {provider, items:[{key, source_model_id?}]}` creates mappings from selected entries — status `active`, `pricing_source: "litellm"` (kept fresh by the sync job), capabilities inferred from spec + id heuristics (`supports_function_calling` → tool_use; `supports_reasoning` → thinking with style nova→nova2 / kimi→kimi / claude→claude / else effort; embedding / image_generation / rerank → all off; candidates carry `price_per_request` / `price_per_image` / `price_per_search_unit`). Source id defaults to a friendly alias (Bedrock: region prefix + vendor segment + `-v2:0`-style version suffix stripped); an alias collision falls back to the full target id, then reports `skipped_existing`. Existing rows are never overwritten. Admin UI: "Import from LiteLLM" on the mappings page (`ImportLitellmModal.vue`).
- **Refusal-fallback passthrough** (fallback-credit-2026-06-09 beta): `MessageRequest.fallback_credit_token` and `MessageResponse.stop_details` are carried verbatim; `StopReason` includes `Refusal`/`Compaction`/`ModelContextWindowExceeded` (a refusal response no longer fails to deserialize). The `fallback` content block (`ContentBlock::Fallback`) is client-side audit bookkeeping — preserved on Anthropic/OpenAI passthrough but **stripped in `build_invoke_model_body` before Bedrock** (Bedrock rejects the block type); the top-level `fallback_credit_token` is **also stripped** for Bedrock ("Extra inputs are not permitted") and both `fallback-credit-2026-06-09` (the name in the reference proxy; Bedrock rejects it) and `fallback-credit-2026-06-01` (the name Claude Code 2.1.x actually sends; Bedrock tolerates it but does not implement the feature) are on the `beta_headers` blocklist. Verified against live Bedrock InvokeModel 2026-09-09/10. Claude InvokeModel streaming already forwards `stop_details` since it relays native SSE bytes.
- **Mid-conversation `role: "system"` directives + `output_config`** (Claude Code betas `mid-conversation-system-2026-04-07` / `per-turn-control-2026-07-01` / `mid-conversation-output-config-2026-07-01`): Claude Code emits `{role:"system", content: <blocks or []>, output_config:{effort}}` turns inside `messages[]` — the per-turn effort statement is exactly `content: []` + `output_config`. `Message.extra` (`#[serde(flatten)]`) preserves per-message unknown fields and `MessageRequest.output_config` carries the top-level form, so both round-trip on passthrough. **Bedrock InvokeModel** (verified 2026-09-10 on Haiku 4.5 + Opus 5 `global.` profiles, with and without the betas): accepts a system turn *with content* (`mid_conv_system`: must follow a user turn or an assistant turn ending in a server tool result), **rejects any per-message field beyond role/content** (`messages.N.output_config: Extra inputs are not permitted`), rejects an empty system turn (`messages.N: system content must contain at least one block`), and **accepts top-level `output_config.effort`** on effort-capable models (Haiku 4.5: "This model does not support the effort parameter", which Claude Code's classifier handles by retrying without effort). `build_invoke_model_body` therefore lifts every message-level `output_config` into the top-level one (message-level keys win), strips other per-message extras, and drops a system turn whose content is empty. Without this, the dropped `output_config` left `{role:"system",content:[]}` behind and every request in the session 400'd — Claude Code only self-heals on the `output_config`/"Extra inputs" wording, not on the empty-content wording. Regional (non-`global.`) Claude ids in ap-southeast-1 reject on-demand invocation outright (inference-profile only).
- **Unknown content blocks + Anthropic-format JSON rejections**: `ContentBlock` is derived with `remote = "Self"` and wrapped by hand-written `Serialize`/`Deserialize` — a block whose `type` is in `ContentBlock::KNOWN_TYPES` takes the strict derived path (a malformed known block is still a hard error), any other `type` becomes `ContentBlock::Unknown(Value)` and round-trips verbatim (Gemini/OpenAI converters drop it; Bedrock/Anthropic get it as-is so the *upstream* error wording reaches the client). Motivating case: Claude Code's `mid-conversation-tool-changes-2026-07-01` beta emits `{type:"tool_addition", tool:{type:"tool_reference", name}}` inside a `role:"system"` turn — Bedrock Opus 5 accepts it (200, verified 2026-09-10) when the beta is present and rejects the tag without it; previously one-router failed at body deserialization. Because that failure surfaced as axum's plain-text 400/422, `/v1/messages` and `/v1/messages/count_tokens` now use `api/extractors.rs::AnthropicJson<T>` — same as `Json<T>` but a rejection renders as the Anthropic `invalid_request_error` envelope with the serde path. `MessageContent` also has a hand-written `Deserialize` (string → `Text`, array → per-block `ContentBlock` with the failing index) so a malformed block reads `messages[0].content: block[1]: missing field 'text'` instead of the untagged-enum "data did not match any variant" message. OpenAI-protocol handlers still use plain `Json<T>` (follow-up: an `OpenAIJson` twin).
- **Responses API** (`api/responses.rs`, `converters/responses_chat.rs`, `services/responses_context.rs`): `POST /v1/responses` translates the OpenAI Responses protocol to `ChatCompletionRequest`, runs it through the shared `dispatch_chat` seam (extracted from `chat_completions.rs` — resolve + failover + route, no usage recording), then converts `ChatCompletionResponse` → `ResponsesResponse`. Hosted `web_search`/`web_search_preview` tools fork to an Anthropic `MessageRequest` + `WebToolExecutor` (web tools are only wired on the `/v1/messages` side). Streaming is **replay-based**: `build_responses_events` (pure, unit-tested) produces the ordered `(event_type, payload)` sequence, `stream_responses_events` wraps each into an SSE `Event` with an `event:` line + auto-incrementing `sequence_number` (Codex CLI rejects streams lacking either). Context store is **in-memory** (`ResponsesContextStore`: `Arc<RwLock<..>>` + `owner_key_hash` binding + TTL; bounded by 10k entries, an 8 MB per-entry cap (oversized turn → not stored + warn), a 512 MB total byte budget, per-owner (key) quotas of 64 MB / 1000 entries and per-user quotas of 128 MB / 2000 entries across all the user's keys (`ContextOwner { key, user }`, user = `ApiKeyInfo.user.user_id`; an owner / user over quota evicts its **own** oldest entries, so minting keys cannot flush other users); **global eviction is fair**: over the entry count / byte budget, the oldest entry of the *tenant* (user, else `k:<key>` for ownerless keys) with the largest usage (bytes, then count, then oldest entry; the inserting tenant competes including its pending entry) goes first, so a tenant at or under its fair share is never evicted while a bigger one exists; O(log n) eviction via `seq`-ordered `BTreeMap` indexes + a `BTreeSet<(bytes, count, Reverse(oldest_seq), tenant)>` usage index), swept every 600s by an `app.rs` background task; context size **never rejects a request** (`store: false` or not): `save` measures what is actually stored (history text + response JSON; images / tool defs are never stored) and past the cap simply skips storing, so only a continuation *from that turn* gets the normal not-found; `previous_response_id` restores prior messages, owner mismatch returns 404 (no existence leak). Usage recorded with protocol tag `"responses"`. Storage on by default (`store != false`).
- **Mantle Responses passthrough** (design: `docs/design/mantle-responses-support.md`): Bedrock GPT-5.x models are **Responses-only** — no Converse form, absent from `list-foundation-models`, served exclusively on the dedicated Mantle host `bedrock-mantle.{region}.api.aws` at `/openai/v1/responses` (SigV4, service name `bedrock`; sol lives in us-east-1/us-east-2 only — the backend credential's region must match). Detected via `BedrockService::is_mantle_responses_model(target_model_id)` (`openai.gpt-*` except `openai.gpt-oss-*` which keeps Converse — covers gpt-5.x/gpt-6+; cross-region inference-profile ids like `global.openai.gpt-6-astra` match via region-prefix strip). **Dual-host routing** (`MantleHost::for_responses`, verified 2026-09-09): a bare target id → dedicated Mantle host (only place gpt-5.4/5.5 exist; they have no profile form), a `global.`/`us.`-prefixed id → classic runtime host `bedrock-runtime.{region}.amazonaws.com/openai/v1/responses` (only place gpt-6+ exists; bare ids are rejected there with an on-demand-throughput error). The runtime host streams `data:`-only SSE frames + `data: [DONE]` (no `event:` lines; payloads carry `type`+`sequence_number`) — `parse_sse_frame` falls back to the payload `type` and the relay re-emits normalized `event:` lines, so Codex still gets both. The runtime Responses endpoint rejects the Mantle-only `include_reasoning` param (the runtime *chat* endpoint accepts it; only messages.rs's chat path sends it) **and `reasoning.summary`** ("Unsupported parameter: 'reasoning.summary' is not supported with the 'global.openai.gpt-6-astra' model", observed 2026-09-29) — `BedrockService::responses_supports_reasoning_summary` gates it: the Anthropic/Chat one-hop converters only emit `summary: "auto"` for bare (Mantle-host) ids, and the `/v1/responses` passthrough strips it from Codex's body (`strip_unsupported_reasoning_params`) for profile-prefixed ids. A Mantle 404 on a bare `openai.gpt-*` id appends a hint to switch the mapping target to the `global.`-prefixed profile id. `/v1/responses` for these models **passes the raw request body through** (`mantle_responses(_stream)` in `bedrock.rs`, shared SigV4 helper `mantle_post(host_kind, path, body, target_model_id)`; signing keys resolve through the SDK credential chain — `create_bedrock_client_from_config` returns the `SdkConfig`'s `SharedCredentialsProvider` alongside the client and `BedrockService` keeps it per credential, so explicit keys / profiles (incl. SSO) / EC2 instance roles all work, with `aws_config`'s lazy-caching handling temporary-credential refresh): handler takes `Json<serde_json::Value>` so unmodeled fields (`include`, `text`, …) survive; `model` rewritten to target id, `previous_response_id` resolved locally and stripped, `store` forced `false` upstream (state stays in the local context store, saved under the **upstream** response id); Codex's `additional_tools` input items are merged into top-level `tools` (Mantle rejects the item type), and its `configuration_update` items (`{type, reasoning:{effort}}`, Codex 0.155+ / GPT-6 Astra mid-conversation effort changes — both Bedrock hosts reject the item type, observed 2026-10-13) are folded into top-level `reasoning` (last item wins per key) and dropped (`apply_configuration_updates`); the translated `/v1/responses` path applies the same override to `reasoning_effort`. Streaming is **native relay** (not replay): upstream frames carry `sequence_number` with `data:` BEFORE `event:` lines (parser is line-order-agnostic); `relay_mantle_responses_sse` rewrites model fields per frame and records usage/context from the `response.completed` frame. Upstream 4xx errors surface as `invalid_request_error` with the extracted upstream message (`mantle_http_error`). This branch skips failover (PTC precedent). **Fixed alongside (pre-existing Mantle chat bugs)**: path is `/openai/v1/chat/completions` (without the `/openai` prefix bedrock-runtime answers HTTP 200 + coral `UnknownOperationException`, which then failed parsing as "missing field `id`"), and the manual `host` header doubled reqwest's own (`host: a,a`) breaking SigV4. **Guards**: web_search/web_fetch (both `/v1/messages` and hosted-tool `/v1/responses`) and PTC explicitly reject non-Claude Bedrock targets (`WebToolBackend`/PTC drive Claude InvokeModel). Verified E2E 2026-07-30 with real Codex CLI (simple reply + multi-turn shell tool call) against a local gateway → live us-east-1 endpoint.
- **Mantle Responses for Anthropic/Chat protocols** (Phase 2, `converters/anthropic_responses.rs` + `responses_chat.rs` additions): `/v1/messages` and `/v1/chat/completions` reach Responses-only models via **one-hop** conversion (no anthropic→chat→responses chaining) — both Bedrock handlers branch on `is_mantle_responses_model(routing_model_id)` before the Claude check. **Anthropic side**: thinking `signature` ↔ reasoning item encoded as `mantle:{item_id}:{encrypted_content}` (opaque token the client echoes; foreign/Claude signatures are dropped from history — Mantle tolerates function_call replay without its reasoning item, unlike native OpenAI); requests always carry `include: ["reasoning.encrypted_content"]` + `reasoning.summary: "auto"`; `tool_use`/`tool_result` ↔ `function_call`/`function_call_output` with verbatim ids; `max_tokens`→`max_output_tokens`, thinking budget→`reasoning.effort`; `temperature`/`top_p`/`top_k`/`stop_sequences` dropped (reasoning-only models reject them); streaming via `ResponsesToAnthropicStreamState` (lazy blocks, dynamic indexes; `encrypted_content` from `output_item.done` → `signature_delta`; function args only in `done` → whole `input_json_delta`). **Chat side**: `chat_to_responses_request`/`responses_to_chat_response`/`ResponsesToChatStreamState` — `reasoning_effort` gated by the thinking capability, reasoning summaries → `reasoning_content`, `stream_options.include_usage` honored. `parse_sse_frame` is shared from `api/responses.rs` (`pub(crate)`). Usage: S1 split (cached deducted from input, `cache_read_input_tokens` set) on the Anthropic side; OpenAI accounting preserved on chat responses with the entry handler doing the split. Notes from live testing: sol emits reasoning items only when it actually reasons and its `summary` is always empty (thinking blocks may be signature-only); Claude Code sends `role: "system"` messages inside `messages[]` (folded into user items — the old Mantle chat path 400s on them). Verified E2E 2026-07-30 with real Claude Code CLI (Bash tool round-trip) + two-turn thinking-signature round-trip against live us-east-1.
- **anthropic-beta pipeline** (`services/beta_headers.rs`): the inbound `anthropic-beta` HTTP header is resolved into the Bedrock body's `anthropic_beta` array via `resolve_bedrock_betas(header, model_id)` — a three-state rule per comma-separated value: **blocklist** → dropped (betas Bedrock rejects, e.g. `redact-thinking-2026-02-12`, `server-side-fallback-2026-06-01`); **mapping** (Claude models only) → expanded to native betas (`advanced-tool-use-2025-11-20` → `[tool-examples-2025-10-29, tool-search-tool-2025-10-19]`); otherwise → passed through. Result is order-preserving + de-duped, merged in `build_invoke_model_body` via `ensure_anthropic_beta` (stacks with the defer_loading auto-injection). **Bedrock InvokeModel only** — the `beta_header` param is threaded through `invoke_model_messages(_stream)` from `messages.rs`'s Bedrock branch; PTC, chat_completions, and web-tool callers pass `None`. Passthrough (Anthropic/OpenAI) forwards the header untouched to a native upstream, so no filtering there. Blocklist/mapping are hardcoded defaults (mirroring the reference proxy's `config.py`).
- **Non-Claude reasoning pipeline** (thinking for Nova 2 / Kimi / GPT-OSS / OpenAI o-series): gated by the existing thinking capability (`capability_filter` strips `thinking` when disabled — a `thinking`/`reasoning_effort` that survives means enabled). **Request side**: `ChatCompletionRequest.reasoning_effort` is a first-class field (OpenAI protocol passthrough; Responses `reasoning.effort` maps onto it). Anthropic `thinking` → `reasoning_effort` via `thinking_to_reasoning_effort` in `anthropic_openai.rs` (budget >10000 → high, <1000 → low, else medium) — applies to both the Mantle path (`messages.rs` also injects top-level `include_reasoning: true`, Mantle-only; the real OpenAI API rejects unknown params) and the OpenAI backend. Converse path (`openai_bedrock::convert_request`, takes `caps`) formats per `ThinkingStyle`: Nova2 → `additionalModelRequestFields.reasoningConfig` **and unsets temperature/maxTokens** (Nova 2 rejects them with reasoning on); Kimi → `reasoning_effort` forced `"high"`; Effort (GPT-OSS / o-series, "GPT (effort)" in the Admin UI) → effort passthrough — Claude style on this non-Claude path falls back to the same passthrough. **Response side**: Mantle/OpenAI `reasoning`/`reasoning_content` (both field names) → Anthropic `thinking` block; both OpenAI→Anthropic stream converters (`bedrock.rs::openai_sse_to_anthropic_sse` and `anthropic_openai.rs::convert_stream_chunk_to_anthropic`) open content blocks **lazily with dynamic indexes** so thinking can precede/interleave text (re-entry opens a fresh thinking block); Converse `reasoningContent` blocks/deltas → `reasoning_content` in OpenAI responses. `ThinkingStyle` (Claude/Nova2/Kimi/Effort) is consumed only on the Converse path; the OpenAI-format paths are style-agnostic.
- **Backend model affinity** (`backend_pool/model_filter.rs`, design: `docs/design/backend-model-affinity.md`): each backend row can declare a `models` filter (JSON string array, e.g. `["*", "!openai.*"]`) so same-provider backends serve different models. Matched against the **target model id** (as invoked; ARNs literal). Eligibility = ≥1 positive match ∧ no `!`-negative match (exclusions win regardless of order; pure-negative list implies a `*` base; `NULL`/`[]` ≡ `["*"]`). Selection ranks eligible credentials by best positive match (exact → backend `priority` → specificity), takes the top group, load-balances within it — **no cascade** to lower groups (a filter is a claim, not a capability proof; doomed requests would poison shared per-credential health). Glob helpers shared with model_mapping via `utils/glob.rs`. Plumbing: `Credential::serves_model`/`model_match_rank` (default = serve all), `CredentialPool::get_next_for_model`/`stats_for_model`, `BedrockService::get_client_for` + `mantle_post(+model)`, `provider_available(provider, model)` makes failover_chains model-scoped. No eligible credential → 503 `"No <provider> backend serves model '<id>'; check backends' models filter"`. Admin API validates filters at write time (blank / bare `!` / positive==negative / `!*` mixed → 400); UI: "Models Filter" input on the backend form + list column. Target topology: `bedrock-ap-northeast-1: ["*", "!openai.*"]` + `bedrock-us-east-1: ["openai.gpt-5*"]`.
- **Image parts across protocols** (`utils/image.rs`): every data-URL image path (`anthropic_openai` both directions, `openai_bedrock`, `openai_gemini`, `responses_chat` web_search, `image_url_fetcher`) goes through `parse_image_data_url`, which decodes the payload and takes the `media_type` from the **magic bytes** (PNG/JPEG/GIF/WEBP) — the declared MIME is only a fallback for unrecognized bytes, and a mismatch logs a warn. Anthropic rejects a `media_type` that disagrees with the payload, and some clients label everything `image/jpeg`. OpenAI `image_url` → Anthropic: text-only parts stay `MessageContent::Text` (joined with `\n`, keeps cache_control/hash shape); any `image_url` turns the message into `Blocks` in part order (`data:` → `base64` source, `http(s)` → `url` source — Bedrock/Gemini handlers inline external URLs *before* conversion, Anthropic fetches natively). Anthropic `image` → OpenAI: the message becomes `Parts` only when an image is present. Images inside `tool_result` and `document` blocks cannot be expressed in OpenAI chat and are dropped **with a warn** (never silently). There is no per-model `vision` capability; unsupported models surface the upstream error.
- **Token counting** (`POST /v1/messages/count_tokens`, design: `docs/design/count-tokens-dispatch.md`): the body is a `MessageRequest` without `max_tokens` (serde default fills it), parsed via `AnthropicJson`. Routing reuses `resolve_request_route` + `effective_capabilities` (the same resolve → failover → capability-filter steps as `create_message`, extracted so both endpoints agree on provider/model). Per provider: `anthropic` → upstream `/v1/messages/count_tokens` passthrough (`anthropic-version`/`anthropic-beta` forwarded; `max_tokens`/`stream`/`container`/`service_tier` stripped); `bedrock` Claude → `BedrockService::count_tokens_invoke_model` (SDK `CountTokens` with the **same body `build_invoke_model_body` produces**, so beta/`output_config`/fallback rewrites apply and the count matches what InvokeModel bills); `bedrock` Converse models → `count_tokens_converse` (Anthropic → Chat → `ConverseRequest`, `messages`/`system`/`tool_config` into `ConverseTokensRequest`); `bedrock` Mantle Responses-only → no API; `gemini` → `GeminiService::count_tokens` (`models/{id}:countTokens`, target id from the mapping); `openai` → no API. **Degradation**: any exact-path failure (no credential, unsupported model, upstream error) returns **200 with `utils/tokens.rs::estimate_message_request_tokens`** (CJK-aware text, fixed image cost, PDF by size) — never a 5xx, because Claude Code uses this endpoint for compaction decisions; only body-shape and unmapped-model errors surface as 400. **Credential health**: a 429 on any counting call does NOT cool the credential down (counting quotas are independent of inference); 5xx records a failure; 2xx records success. No usage row is written. Metric: `onerouter_count_tokens_total{provider,method=exact|estimated}`; the fallback reason (`provider_has_no_api`/`unsupported_model`/`no_credential`/`upstream_error`) is logged, not labeled.
