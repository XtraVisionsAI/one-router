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
