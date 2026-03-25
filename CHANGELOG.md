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
