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
- **Self-Update** — check and apply updates from GitHub Releases via CLI (`one-router update`) or Admin API; only Ed25519-signed releases are installed (fail closed — see `scripts/release-keygen.sh`)
- **Hot-Reload** — backend and settings changes via Admin UI take effect immediately without restart
- **CLI Configuration** — override any setting via command-line flags (`--port`, `--database`, `--log-level`)
- **Health Endpoints** — built-in `/health`, `/ready`, `/liveness` endpoints
- **Prometheus Metrics** — `/metrics` endpoint (master-key protected by default; `METRICS_PUBLIC=true` to open it on a private network) exposing request/token/cost counters, an HTTP latency histogram, an in-flight-requests gauge, an auth-failure counter, and build info (the API key is never a label)
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
  Listen:    127.0.0.1:8000

  Ephemeral API Key (valid for this session only):
  sk-ephemeral-xxxxxxxxxxxx

  Usage:
    export ANTHROPIC_API_KEY="sk-ephemeral-xxxxxxxxxxxx"
    export ANTHROPIC_BASE_URL="http://127.0.0.1:8000"
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

Multi-turn conversations are stateful: pass a prior response's `id` as `previous_response_id` to continue where it left off (stored responses are bound to the API key that created them). Context is kept in memory for 1 hour, text only (images and tool definitions are not stored); when the whole store is full, room is made by evicting from the user (or ownerless key) holding the most context, so light users keep theirs; a turn whose history exceeds 8 MB, or a key / user over its storage quota, is still answered normally — it is just not stored, so continuing from *that* response returns not-found (resend the conversation as `input` instead). To point the Codex CLI at One Router, set its base URL to `http://localhost:8000/v1` and use your API key.

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
    "monthly_budget": 100.0,
    "budget_period": "monthly"
  }
}
```

`budget_period` (`monthly` / `weekly` / `daily`) is the period `budget_used_mtd` and `monthly_budget` refer to — the field names predate budget periods. With `scope=user` all three describe the key's user.

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

### Key Status API

`GET /v1/key` lets an API key read its own expiry and current-period budgets — meant for status lines and other clients that poll. It is authenticated by the key itself and is **not** rate limited, never writes a usage row and does not update the key's `last_used_at`.

```bash
curl "http://localhost:8000/v1/key" -H "x-api-key: sk-or-xxxxxxxx" | jq .
```

```json
{
  "object": "key",
  "key_id": "a0af1f2d-84ca-4f19-af15-751e22c65b79",
  "name": "laptop",
  "key_display": "sk-or-0973••••dafb",
  "server_time": 1795266233,
  "expires_at": 1796040000,
  "expired": false,
  "rotated": true,
  "budgets": [
    { "scope": "key", "period": "monthly", "period_key": "2026-11", "used": 45.6, "budget": 100.0, "exhausted": false, "resets_at": 1796083200 },
    { "scope": "user", "name": "alice", "period": "weekly", "period_key": "2026-W47", "used": 12.5, "budget": 50.0, "exhausted": false, "resets_at": 1795392000 }
  ]
}
```

- Times are Unix seconds; compute the remaining lifetime against `server_time`. `expires_at: null` = never expires. `rotated: true` = a replacement key was issued and this one only lives until `expires_at`.
- `budgets` lists the key and user layers (`budget: null` = no budget on that layer) and the team layer **only when the team has a budget**. `used` is the value the gateway's own budget check compares (up to `auth_cache_ttl_secs` old; under `budget_enforcement = precharge` it includes in-flight reservations). `resets_at` is the start of the next period (UTC).
- A key whose budget is spent still gets `200` here (the layer has `exhausted: true`), while business endpoints answer `403`.
- An **expired** key gets `200` with `expired: true`, `expires_at`, `rotated` and nothing else (`name` omitted, `budgets` empty). A deactivated key / owner / team or a client outside the IP allowlist is refused as everywhere else.

### Authentication error codes

`401` / `403` responses from API-key authentication carry a stable `error.code` next to the human-readable message, so clients need not match on wording:

```json
{ "type": "error", "error": { "type": "permission_error", "message": "Budget exceeded for this API key's user.", "code": "budget_exceeded", "scope": "user" } }
```

`code` is one of `missing_key`, `invalid_key`, `inactive_key`, `expired_key`, `inactive_owner`, `inactive_team`, `budget_exceeded`, `ip_not_allowed` (`internal_error` on a `500`). `budget_exceeded` also carries `scope`: `key` / `user` / `team`.

## Admin Web UI

One Router includes a built-in admin UI at **`/admin`**. Open it in a browser and sign in with your master key or ephemeral key (debug builds). Authentication uses HttpOnly session cookies — no key is stored in the browser after login. Logins are throttled to 10 failed attempts per 15 minutes per client address; once the limit is hit, attempts from that address are refused (429) without the key being checked, so behind a reverse proxy set `TRUSTED_PROXY_CIDRS` or every client shares one bucket. The same buckets cover the master key sent as `x-api-key` / `Authorization: Bearer` to `/admin/api/*` and `/metrics`: only wrong keys count (a request without a key or with a valid session cookie does not), and a correct key only refunds its own attempt (it does not reset other clients' failures). With a **strong** master key — a random plaintext key or any `sha256:` hash (`hash-key` refuses weak keys unless `--allow-weak`) — a correct key is admitted even while the bucket is full, so nobody sharing your proxy address can lock out the UI, scripted admin calls or the Prometheus scraper. A weak plaintext master key keeps the strict lockout.

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
| `HOST` | `127.0.0.1` (`0.0.0.0` when `CONTAINER=true`) | HTTP bind host. Loopback by default on bare metal; set `HOST=0.0.0.0` only behind a firewall / TLS reverse proxy |
| `METRICS_PUBLIC` | `false` | Serve `/metrics` without authentication. Default requires the master key (`authorization: Bearer <MASTER_API_KEY>`) or an admin session |
| `TRUSTED_PROXY_CIDRS` | _(empty)_ | Comma-separated CIDRs of reverse proxies whose `X-Forwarded-For` is trusted for the client address (IP allowlists, audit log, admin login throttle). A trusted proxy sending a malformed / non-ASCII chain makes the client **unknown** (IP allowlists deny); no header at all = the proxy's own address. Set it behind a proxy — otherwise all clients share the proxy's admin-login throttle bucket (a warning is logged once) |
| `LOG_LEVEL` | `info` | Log level: `trace`, `debug`, `info`, `warn`, `error` |
| `MASTER_API_KEY` | _(auto-generated)_ | Admin-only key — for `/admin` UI login and admin API. Cannot call `/v1/*` business endpoints. Plaintext **or `sha256:<hex>`** (only compared, so the gateway never needs the plaintext). A strong plaintext key read from `.env` is replaced there by its hash on startup; first-run generation stores only the hash and shows the key once (on a terminal). `one-router reset-master-key` / `one-router hash-key`. Deploy scripts deploy the hash |
| `ENCRYPTION_KEY` | _(auto-generated)_ | AES-256 key for credential encryption and API key HMAC. Plaintext (startup warning) or a provider reference resolved at startup, fail-closed: `aws-kms:<region>:<base64>` (KMS Decrypt via the instance/task/pod role, encryption context `app=one-router,purpose=ENCRYPTION_KEY`), `vault-transit:<key>:<vault:v1:…>` (`VAULT_ADDR` + `VAULT_TOKEN` or `VAULT_K8S_ROLE`; optional `VAULT_TRANSIT_MOUNT`/`VAULT_NAMESPACE`/`VAULT_CACERT`), `systemd-creds:<name>` (`$CREDENTIALS_DIRECTORY`, TPM-bound), `raw:<key>`. Unknown `scheme:` prefixes abort startup. Create with `one-router wrap-key --provider aws-kms\|vault-transit\|systemd-creds --key …` (wraps the *same* key — existing data stays valid) |
| `SEED_DEFAULTS` | `empty` | When to seed default model mappings on startup: `off` (never), `empty` (only when the mappings table is empty — deletions stick), or `missing` (re-insert any missing default on every startup) |
| `MAX_BODY_SIZE_MB` | `64` | Maximum HTTP request body size in MB (long Codex / Claude Code sessions send the whole conversation per request). Align any reverse proxy's limit (e.g. nginx `client_max_body_size`) with this value |
| `BEDROCK_ALLOWED_PROFILES` | _(unset = any)_ | Comma-separated AWS profile names Bedrock backends may reference. A backend naming another profile is rejected on write and skipped on load |
| `BEDROCK_ALLOW_DEFAULT_CREDENTIALS` | `true` | Allow Bedrock backends without explicit keys/profile to use the host's default AWS credential chain (env / instance role / SSO cache). Set `false` so the gateway's own identity can never be borrowed through the admin API |
| `ADMIN_COOKIE_INSECURE` | _(unset)_ | Drop the `Secure` flag from the `admin_session` cookie (plain-HTTP admin access on a non-localhost host). Leave unset behind TLS |
| `OUTBOUND_PROXY` | `off` | Proxy for SSRF-guarded fetches: `off` / `env` (use `HTTPS_PROXY` / `HTTP_PROXY` / `NO_PROXY`) / an explicit `http://` or `https://` proxy URL (userinfo allowed, never logged; SOCKS not supported) / scheme-less `host:port` (port required; in `env` mode a port-less `HTTPS_PROXY=proxy.corp` is read as `http://proxy.corp:80`, like curl). Boolean-like values (`on`, `true`, `1`, `yes`, `enabled`, …) are rejected at startup — use `env` or a URL. Provider clients (Bedrock / Gemini / OpenAI / Anthropic / Tavily / Brave) always honor `HTTPS_PROXY` already |
| `OUTBOUND_PROXY_SCOPE` | `admin` | `admin`: pricing sync, LiteLLM catalog / import, budget webhook. `all`: also web_fetch direct fetches and image URL inlining (user-supplied URLs — the proxy must deny private ranges) |
| `PTC_MAX_SESSIONS_PER_USER` | `8` | Per-user cap (all of a user's keys) on concurrent PTC sessions and dynamic-filtering code runs; over the cap → 429 |

**First-run behavior:**
- **Bare metal:** Missing `MASTER_API_KEY` or `ENCRYPTION_KEY` are auto-generated and saved to `.env`.
- **Docker:** These must be provided explicitly via `-e` flags. The container will refuse to start without them.

CLI flags override environment variables: `one-router --port 9000 --database postgres://...`

### Running behind a proxy

In intranets or mainland-China deployments that reach the internet only through an
HTTP(S) proxy, the provider clients already use `HTTPS_PROXY`. The SSRF-guarded
fetches (pricing sync, LiteLLM import, budget webhook, web_fetch, image URLs) ignore
it by default — a proxy resolves names itself, bypassing the gateway's connect-time
DNS guard — and log a startup note when `HTTPS_PROXY` is set. Opt in:

```bash
OUTBOUND_PROXY=env            # or OUTBOUND_PROXY=http://user:pass@proxy.corp:3128
OUTBOUND_PROXY_SCOPE=admin    # or all (also web_fetch + image URLs)
```

Proxied requests still get the static URL checks (scheme, IP literals, blocked
hostnames incl. `*.localhost`) and a local DNS pre-check (any private / metadata
address → rejected; local resolution failure → allowed for public-looking names, since
only the proxy may resolve, but **refused** for names the proxy could map to an
internal service: single-label hosts, `*.local` / `*.internal` / `*.corp` / `*.lan` /
`*.home` / `*.home.arpa` / `*.intranet` / `*.localdomain` / `*.private`, and
IP-embedding wildcard-DNS services such as `*.nip.io` / `*.sslip.io` / `*.xip.io` /
`*.traefik.me` / `*.localtest.me` / `lvh.me`, which are refused outright), and
redirects are still followed manually with per-hop checks. For user-supplied URLs a
refused destination and a name that does not resolve return the same generic
`destination not allowed` error (details only in the gateway log). With `OUTBOUND_PROXY_SCOPE=all` the
**proxy is the last line of defense** for user-supplied URLs: it must refuse private
destinations, for example:

```
# squid.conf — deny private / link-local / metadata destinations
acl private_dst dst 10.0.0.0/8 172.16.0.0/12 192.168.0.0/16 127.0.0.0/8
acl private_dst dst 169.254.0.0/16 100.64.0.0/10 0.0.0.0/8
acl private_dst dst fc00::/7 fe80::/10 ::1
http_access deny private_dst
http_access deny CONNECT private_dst
```

```yaml
# Clash rules — reject private destinations before the proxy group
rules:
  - IP-CIDR,10.0.0.0/8,REJECT,no-resolve
  - IP-CIDR,172.16.0.0/12,REJECT,no-resolve
  - IP-CIDR,192.168.0.0/16,REJECT,no-resolve
  - IP-CIDR,127.0.0.0/8,REJECT,no-resolve
  - IP-CIDR,169.254.0.0/16,REJECT,no-resolve
  - IP-CIDR,100.64.0.0/10,REJECT,no-resolve
  - IP-CIDR6,fc00::/7,REJECT,no-resolve
  - IP-CIDR6,::1/128,REJECT,no-resolve
  - MATCH,PROXY
```
Use rules that match the **resolved** destination (Clash: without `no-resolve` on
domain traffic the proxy resolves the name first; keep `IP-CIDR` rules before any
`DOMAIN` / `MATCH` rule).

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

### Model Pricing

Each mapping carries per-1M-token prices (`input_price`, `output_price`, `cache_read_price`, `cache_write_price`) plus three non-token prices in USD (default 0):

| Field | Charged | Used by |
|---|---|---|
| `price_per_request` | once per call | `/v1/images/generations`, `/v1/rerank` (token endpoints ignore it) |
| `price_per_image` | per image actually returned | `/v1/images/generations` |
| `price_per_search_unit` | per search unit = one query over up to 100 documents (101–200 docs = 2 units); a document whose query + document tokens exceed 500 is split into 500-token chunks that each count as a document (`ceil(Σ ceil((query + docᵢ tokens) / 500) / 100)`, min 1, tokens estimated) | `/v1/rerank` |

Cost = token cost + non-token cost, × the caller's cost rate (user × team). Images bill the prompt as input tokens, rerank bills query + documents as input tokens — both at the mapping's own input price only (no default per-token fallback). The seeded Cohere Rerank 3.5 mappings ship at `$0.002` per search unit (Bedrock: $2.00 / 1K queries); image mappings must be priced before they cost anything — a budgeted key calling an unpriced image/rerank mapping logs a one-time warning. With `budget_enforcement = precharge`, images reserve `price_per_image × n` (default 1) and rerank reserves its search units up front.

LiteLLM pricing sync and import fill these from the price table: `image_generation` entries' `output_cost_per_image` → `price_per_image`, `rerank` entries' `input_cost_per_query` → `price_per_search_unit`, `input_cost_per_request` → `price_per_request`. Size/quality variants (`hd/1024-x-1024/dall-e-3`, `…/50-steps/…`, per-pixel pricing) and token-priced image models (`gpt-image-1`) are not imported — set their prices manually (and mark the mapping `manual`).

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

## Upgrading

Upgrades are **stop-the-world**: run one version at a time against a database (no rolling upgrades), and roll back by restoring the database backup.

1. Stop every one-router instance.
2. Back up the database (copy the SQLite file, `pg_dump`, or a DynamoDB on-demand backup).
3. With the **new** binary / image and the same `DATABASE` + `ENCRYPTION_KEY` (from `.env`, the environment, or `-d` / `--encryption-key`), preview the stored-secret migration:
   ```bash
   one-router migrate-secrets --dry-run
   ```
4. Apply it:
   ```bash
   one-router migrate-secrets
   ```
   It prints one line per changed row (`backend <name>: v1 → v2`, `setting <key>: plaintext → v2`, `… decrypt failed (skipped)`) and a summary — never secret values. It is idempotent ("Nothing to migrate") and exits non-zero if any row could not be decrypted (wrong `ENCRYPTION_KEY`, or a corrupted / copied value). The database must already exist (a SQLite path that does not exist is an error — no empty file is created). `--dry-run` is strictly read-only: the database is opened read-only and no schema migration or backfill runs; if the schema is too old to read as-is, the dry run says so and exits non-zero — then go straight to step 4. Without `--dry-run`, the command first runs the regular startup schema migrations and backfills (default model mappings are not seeded), then re-encrypts. (Starting the new server would also migrate the schema, then abort on the legacy secrets.)
5. Start the new version.

Stored backend credentials and sensitive settings must be in the current `encrypted:v2:` format: the server refuses to start while any are still plaintext or legacy v1, and lists the affected backend names / setting keys. Rollback = stop, restore the backup taken in step 2, start the old version.

Docker: `docker run --rm -e DATABASE=… -e ENCRYPTION_KEY=… -v one-router-data:/app/data xtravisions/one-router:<tag> one-router migrate-secrets --dry-run` (the image's command is `one-router`, so name it explicitly).

**CLI commands:**

| Command | Description |
|---|---|
| `one-router` | Run the server |
| `one-router update [--check]` | Check for / apply a signed self-update (bare metal) |
| `one-router migrate-secrets [--dry-run]` | Re-encrypt plaintext / v1 stored secrets as v2 (server stopped) |
| `one-router reset-master-key [--no-write]` | New master key, shown once; only its SHA-256 is saved to `.env` |
| `one-router hash-key [--allow-weak]` | stdin key → `sha256:<hex>` (for `MASTER_API_KEY`); weak keys are refused unless `--allow-weak` |
| `one-router wrap-key --provider aws-kms\|vault-transit\|systemd-creds` | Wrap `ENCRYPTION_KEY` with a key provider |

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
