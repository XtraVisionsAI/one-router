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
│   └── 001_model_mapping_index.sql             # source_model_id index
├── postgres/
│   └── 001_model_mapping_pattern_index.sql     # text_pattern_ops index
└── dynamodb/
    └── 001_apikeys_name_gsi.sh                 # name-index GSI
```

Migrations are numbered `NNN_description` and execute in lexicographic order.
All migrations are **idempotent** — safe to run multiple times.

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

## Adding new migrations

1. Create a new file with the next sequence number:
   - SQLite: `scripts/migrations/sqlite/NNN_description.sql`
   - PostgreSQL: `scripts/migrations/postgres/NNN_description.sql`
   - DynamoDB: `scripts/migrations/dynamodb/NNN_description.sh`
2. Ensure the migration is **idempotent** (use `IF NOT EXISTS`, check-before-create, etc.)
3. Add a matching inline migration in the Rust code (`database/{backend}/mod.rs` or `migrations.rs`) so new deployments get the change on first startup
4. Update this README
