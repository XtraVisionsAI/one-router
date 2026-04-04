## v0.11.0 (2026-04-04)

### Feat

- **chat_completions**: route Claude models to InvokeModel, apply capability filter
- **capabilities**: add per-model capabilities + global policy flags
- **settings**: add rate_limit select setting, load prompt_cache+rate_limit at startup
- **bedrock**: migrate Claude to InvokeModel API, add prompt_cache setting
- **admin-ui**: auto-save select settings on change, remove Save button

### Fix

- **bedrock**: fill empty tool descriptions in Converse path (openai_bedrock.rs)
- **bedrock**: fill empty tool descriptions to satisfy Bedrock min-length constraint
- **admin-ui**: settings page full width layout
- **admin-ui**: widen settings page and NSelect width
- **deploy**: purge ECR PTC cache before pulling to ensure latest image is fetched

### Refactor

- **capabilities**: default all-disabled, use AppState::default_capabilities as fallback

## v0.10.0 (2026-04-03)

### Feat

- **admin-ui**: overhaul admin UI — settings page, key management, usage filters, lint config
- replace feature_flags with system_settings key-value store, migrate default_cache_ttl to DB
- remove user_id from api_keys, enforce name uniqueness, add tpm_limit/cache_ttl to admin API

### Fix

- static asset path prefix and favicon 401 in fallback handler

## v0.9.0 (2026-04-02)

### Feat

- prompt cache TTL extension with API key level override and DEFAULT_CACHE_TTL env var
- **cache-ttl**: add API key level cache_ttl override (highest priority)
- **api**: pass default_cache_ttl to Bedrock convert_request
- **converter**: inject cache TTL into Bedrock additionalModelRequestFields
- **config**: add default_cache_ttl setting from DEFAULT_CACHE_TTL env var
- budget auto-deactivation with monthly reset, reactivation, and budget_history archiving
- **budget**: add budget_history monthly archiving for DynamoDB-friendly history queries
- **auth**: add soft budget pre-check before request execution
- **usage**: lazy monthly budget reset and key reactivation
- **db**: add reset_monthly_budget and reactivate_api_key to all backends
- Bedrock service tier via serviceTier field with auto-fallback retry
- **api**: pass effective service_tier to Bedrock performanceConfig
- **converter**: add tier->performanceConfig mapping in anthropic_bedrock
- **schema**: add service_tier field to MessageRequest
- **bedrock**: add performance_config field to ConverseRequest
- Bedrock OpenAI Compat endpoint (Mantle) for non-Claude models with streaming
- **mantle**: add streaming support for Bedrock OpenAI Compat endpoint
- **bedrock**: add OpenAI compat endpoint support for non-Claude models
- web tool proxy execution (web_search/web_fetch) with streaming support
- **web-tools**: add streaming response support via synthetic SSE conversion
- **api**: integrate WebToolExecutor into handle_bedrock_request
- **web-tools**: wire WebToolExecutor into Settings and AppState
- **web-tools**: implement WebToolExecutor execution loop
- **web-tools**: implement TavilySearchProvider and BraveSearchProvider
- **web-tools**: implement ReqwestFetchProvider with domain filters and HTML stripping
- **web-tools**: add mod.rs with tool detection and split_tools
- **admin-ui**: add colored icons to stat cards in dashboard and usage pages
- **admin-ui**: add mappings, usage, and flags pages
- **admin-ui**: add KeyModal component and keys page
- **admin-ui**: add BackendModal component and backends page
- **admin-ui**: add dashboard page
- **admin-ui**: add layouts, login page, and root redirect
- **admin-ui**: add typed API layer for all resources
- **admin-ui**: add auth store, useApi composable, and route guard
- **admin-ui**: initialize Vue 3 + Vite project scaffold
- **admin**: add GET /backends/:name/config decrypted config endpoint

### Fix

- **bedrock**: use serviceTier in additionalModelRequestFields and add tier fallback retry
- normalize service_tier case and whitespace, add edge case tests
- **bedrock**: warn on empty credentials and add 4MB body size guard for Mantle
- **admin-ui**: show api_key as read-only text in edit modal, not editable input
- **admin-ui**: fix usage filter bar layout — replace NFormItem with inline flex divs
- **admin-ui**: fix invalid carbon icon name toggle -> toggle-on
- **admin-ui**: replace custom nav with NMenu for proper dark theme sidebar
- **admin-ui**: add presetIcons to UnoCSS config for i-carbon-* icons
- **admin-ui**: apply meta-layouts to router and enable Naive UI dark theme
- **admin-ui**: add missing useMessage import from naive-ui in login.vue
- **admin-ui**: use router.push for auth redirect, fix Content-Type on GET, persist version
- **admin-ui**: fix double-hash in useApi 401/403 redirect
- **admin**: improve get_backend_config — flatten match, add audit log, fix error logging
- **deploy**: force start-deployment after update-service to handle latest tag re-deploy
- **deploy**: trigger ECR PTC sync via docker pull instead of batch-get-image polling

### Refactor

- **admin-ui**: extract format utils, add themeOverrides, unify styles, add delete confirm dialogs and empty states

## v0.8.0 (2026-03-27)

### Feat

- **caching**: auto-inject cache_control in openai→anthropic conversions
- **caching**: auto-inject CachePoint in openai→bedrock conversions
- **caching**: populate cache token counts from Bedrock response
- **caching**: cache_control → CachePoint for system messages and tools in anthropic→bedrock
- **caching**: translate cache_control to CachePoint in anthropic→bedrock content blocks

## v0.7.0 (2026-03-26)

### Feat

- **admin**: add Tom Select, Flatpickr, Chart.js, Tippy.js; fix chart resize loop with responsive:false and CSS fixed height
- **admin**: enhance form inputs — focus glow, custom select arrow, readonly/disabled states, JSON auto-format+validate, password show/hide
- split API key name/key columns, add mapping filters, sort mappings by provider+priority+source
- **admin**: elevate UI — Inter font, indigo accent, button glow, sidebar gradient, colored stat cards, zebra table, badge glow
- **admin**: retheme to Slate dark palette — deeper bg, blue primary, modern cards, wider sidebar, focus ring
- **admin**: UX improvements — fonts, contrast, loading states, confirm dialogs, a11y, table scroll, page transitions

### Fix

- **ci**: prevent race condition overwriting latest tag when releases run concurrently

## v0.6.0 (2026-03-26)

### Feat

- **admin**: simplify logo — full one-router in blue
- **admin**: float stat card icons to top-right corner
- **admin**: add icons to stat cards on Dashboard and Usage pages
- **admin**: add Bootstrap Icons via CDN, replace unicode symbols with bi-* icons

### Fix

- **admin**: restore logo-router blue color in auth card
- **admin**: fix logo spacing in auth card, widen auth card to 400px
- **admin**: center sidebar footer version and sign-out button

## v0.5.0 (2026-03-26)

### Feat

- **admin**: support all-key aggregation in usage query — empty api_key returns all records
- **admin**: implement Feature Flags and Usage pages
- **admin**: implement Model Mappings page
- **admin**: implement Backends page
- **admin**: implement auth flow, Dashboard, and API Keys pages
- **admin**: implement HTML shell and CSS design system
- **admin**: register /admin/api/flags and /admin/api/usage routes
- **admin**: add admin usage summary and records handlers
- **admin**: add feature flags list + update handlers
- **admin**: register /admin/api/backends and /admin/api/mappings routes
- **admin**: add model mappings CRUD handlers
- **admin**: add backends CRUD handlers with encryption
- **admin**: register /admin/api/keys routes
- **admin**: add API keys CRUD handlers
- **admin**: register /admin static and /admin/api routes, add status endpoint
- **admin**: add static file embedding via rust-embed
- **admin**: add require_admin_key middleware
- **admin**: add Encryptor to AppState

### Fix

- **usage**: support all-key aggregation in Postgres and DynamoDB implementations
- **admin**: page-content should fill available width
- **admin**: fix auth-gate visible after sign-in due to CSS display overriding hidden
- **admin**: fix modal and app-layout always visible due to CSS display overriding hidden attribute
- **admin**: prevent event listener accumulation on keys page re-render
- **admin**: handle ambiguous key prefix and allow clearing optional fields
- **admin**: avoid double uptime_seconds() call in status handler

## v0.4.0 (2026-03-24)

### Feat

- **usage**: usage query API complete — /v1/usage + /v1/usage/records
- **usage**: register /v1/usage and /v1/usage/records routes
- **usage**: add usage summary and records handlers
- **usage**: implement query_usage_summary for DynamoDB
- **usage**: implement query_usage_summary for Postgres
- **usage**: implement query_usage_summary for SQLite
- **usage**: add query_usage_summary to UsageStore trait
- **usage**: add UsageSummaryRow model

### Fix

- **usage**: require start_time or before_id in records endpoint to prevent unbounded queries

## v0.3.0 (2026-03-17)

### Feat

- add /v1/images/generations endpoint with OpenAI/Bedrock/Gemini support
- add Bedrock embed & rerank support via /v1/embeddings and /v1/rerank

### Fix

- **deploy**: update mode only changes image, preserves existing env vars

## v0.2.0 (2026-03-17)

### Feat

- add full 8-way routing matrix (Anthropic/OpenAI × Bedrock/Gemini/Anthropic/OpenAI)

## v0.1.2 (2026-03-16)

### Fix

- update Bedrock model IDs to use global. prefix and improve ECR PTC setup

## v0.1.1 (2026-03-16)

### Fix

- unify backend config parsing and fix interactive input handling

## v0.1.0 (2026-03-16)

### Feat

- init commit
