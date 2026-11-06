# Database Migrations

Standalone migration scripts for One Router database backends.

## When to use

The application auto-applies all migrations on startup. These scripts are for:

- **Pre-deployment on large databases** — Run index/GSI creation during a maintenance window to avoid impact during startup
- **CI/CD pipelines** — Execute migrations as a separate deployment step
- **Verification** — Confirm schema state before upgrading the application

## Directory structure

```
scripts/migrations/
├── run.sh                                      # Batch runner (all backends)
├── sqlite/
│   ├── 001_model_mapping_index.sql             # source_model_id index
│   ├── 002_api_key_display.sql                 # key_display column
│   ├── 003_model_pricing.sql                   # model pricing backfill
│   ├── 004_pricing_source.sql                  # pricing_source column
│   ├── 005_backend_models.sql                  # backend models filter
│   ├── 006_api_key_id.sql                      # api_keys/usage key_id
│   ├── 007_users.sql                           # users table, per-user key names
│   ├── 008_p2_audit_periods_tags.sql           # audit log, budget periods, tags, CIDRs
│   └── 009_p3_teams_rate_counters.sql          # teams, concurrency, shared rate counters
├── postgres/
│   ├── 001_model_mapping_pattern_index.sql     # text_pattern_ops index
│   ├── 002_api_key_display.sql                 # key_display column
│   ├── 003_model_pricing.sql                   # model pricing backfill
│   ├── 004_pricing_source.sql                  # pricing_source column
│   ├── 005_backend_models.sql                  # backend models filter
│   ├── 006_api_key_id.sql                      # api_keys/usage key_id
│   ├── 007_users.sql                           # users table, per-user key names
│   ├── 008_p2_audit_periods_tags.sql           # audit log, budget periods, tags, CIDRs
│   └── 009_p3_teams_rate_counters.sql          # teams, concurrency, shared rate counters
└── dynamodb/
    ├── 001_apikeys_name_gsi.sh                 # name-index GSI
    ├── 002_model_pricing.sh                    # model pricing backfill
    ├── 003_api_key_ids.sh                      # api_keys key_id backfill
    ├── 004_users_table.sh                      # users table
    ├── 005_audit_logs_table.sh                 # audit_logs table
    └── 006_teams_rate_counters.sh              # teams + rate_counters (TTL)
```

Migrations are numbered `NNN_description` and execute in lexicographic order.
All migrations are **idempotent** — safe to run multiple times — except SQLite 007 (table rebuild; run once, see its header).

## Usage

### Run all migrations for a backend

```bash
# SQLite
./scripts/migrations/run.sh --backend sqlite \
    --database-url ./data/gateway.db

# PostgreSQL
./scripts/migrations/run.sh --backend postgres \
    --database-url "postgres://user:pass@host:5432/one_router"

# DynamoDB
./scripts/migrations/run.sh --backend dynamodb \
    --region us-east-1 --profile production
```

### Run a single migration

```bash
# SQLite — run one SQL file directly
sqlite3 ./data/gateway.db < scripts/migrations/sqlite/001_model_mapping_index.sql

# PostgreSQL — run one SQL file directly
psql "$DATABASE_URL" -f scripts/migrations/postgres/001_model_mapping_pattern_index.sql

# DynamoDB — run one script directly
./scripts/migrations/dynamodb/001_apikeys_name_gsi.sh \
    --region us-east-1 --profile production
```

### DynamoDB options

| Option | Default | Description |
|--------|---------|-------------|
| `--region` | us-east-1 | AWS region |
| `--profile` | _(default)_ | AWS CLI profile |
| `--table-prefix` | one_router_ | Table name prefix |
| `--no-wait` | _(wait)_ | Don't wait for GSI to become ACTIVE |

## Migration details

### SQLite 001: Model mapping index

```sql
CREATE INDEX IF NOT EXISTS idx_model_mappings_source
    ON model_mappings(source_model_id);
```

Accelerates wildcard model mapping lookups (`LIKE 'claude-%'`).

### PostgreSQL 001: Model mapping pattern index

```sql
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_model_mappings_source
    ON model_mappings (source_model_id text_pattern_ops);
```

Same purpose as SQLite 001, with `text_pattern_ops` for PostgreSQL LIKE optimization and `CONCURRENTLY` to avoid locking.

### DynamoDB 001: API keys name GSI

Creates a Global Secondary Index `name-index` on the `api_keys` table:

- **Partition key:** `name` (String)
- **Projection:** KEYS_ONLY
- **Purpose:** O(1) name uniqueness checks (replaces full-table scans)

The GSI builds asynchronously. The script waits for ACTIVE status by default. The application handles the building period gracefully by falling back to filtered scans.

### SQLite/PostgreSQL 003 & DynamoDB 002: Model pricing backfill

Populates `input_price`, `output_price`, `cache_write_price`, and `cache_read_price` for all default model mappings. Prices are in USD per million tokens, sourced from Anthropic / Google / AWS Bedrock published rates as of April 2026.

- Claude models: Anthropic published rates (3.5 Sonnet uses Bedrock Extended Access pricing)
- Gemini models: Google AI published rates (cache_write = 0; Google charges storage-per-hour instead)
- Embedding models: input-only pricing; output/cache fields remain 0
- Rerank models: per-query pricing ($2/1K queries), not per-token — left at 0

### SQLite/PostgreSQL 006 & DynamoDB 003: Stable API key ids

Adds a UUIDv4 `key_id` to every API key — the identifier used by the admin API
(`/admin/api/keys/:key_id`), the rate limiters and usage attribution, so a key
can be hard-deleted without orphaning its usage history.

- **SQL backends:** `api_keys.key_id` (unique index) and `usage.key_id`,
  backfilled through the key hash. Usage rows of keys that no longer exist keep
  `key_id = NULL`. PostgreSQL needs 13+ (`gen_random_uuid()`).
- **DynamoDB:** only `api_keys` items are backfilled; the usage table can be
  large, so legacy usage items stay attributed through the key hash while the
  key exists. New usage items carry `key_id`.

The gateway runs the same backfill on startup.

### SQLite/PostgreSQL 007 & DynamoDB 004: Users

Schema for users as billing / shared-limit principals: a `users` table,
`api_keys.user_id` / `expires_at` / `allowed_models`, key names unique per
user instead of globally, and `usage.user_id`.

These scripts only change the schema. The **data** migration runs on gateway
startup: every key without an owner becomes one user that takes over its
budget, spend counters, cost rate, RPM/TPM and cache TTL (so enforcement is
unchanged), and usage rows are attributed to that user. On DynamoDB the usage
attribution runs in the background and resumes on the next start if
interrupted. The key → user write is conditional, so several instances
starting at once cannot migrate a key twice.

**Rolling back** to a pre-users release after this migration leaves keys with
no budget (it moved to the user) — back up the database first.

### SQLite/PostgreSQL 008 & DynamoDB 005: Audit log, budget periods, tags

`audit_logs` table; on `api_keys` and `users`: `allowed_cidrs`,
`budget_period`, `budget_alerts_sent`, `default_tags` (keys also
`last_used_at`, `rotated_to`); `usage.tags`. All additive — no data migration.
DynamoDB attributes need no schema change; only the `audit_logs` table
(PK `month`, SK `sort_key`) is created.

### SQLite/PostgreSQL 009 & DynamoDB 006: Teams, concurrency, shared rate counters

`teams` table; `users.team_id`, `users.max_concurrency`,
`api_keys.max_concurrency`, `usage.team_id`; `rate_counters`
(`subject`, `window_start`) for `rate_limit_store = database`. DynamoDB:
`teams` and `rate_counters` tables, TTL on `rate_counters.expires_at`.
Additive — no data migration.

## Adding new migrations

1. Create a new file with the next sequence number:
   - SQLite: `scripts/migrations/sqlite/NNN_description.sql`
   - PostgreSQL: `scripts/migrations/postgres/NNN_description.sql`
   - DynamoDB: `scripts/migrations/dynamodb/NNN_description.sh`
2. Ensure the migration is **idempotent** (use `IF NOT EXISTS`, check-before-create, etc.)
3. Add a matching inline migration in the Rust code (`database/{backend}/mod.rs` or `migrations.rs`) so new deployments get the change on first startup
4. Update this README
