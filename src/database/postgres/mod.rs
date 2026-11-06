//! PostgreSQL storage backend
//!
//! Full implementation using sqlx with PgPool.

pub mod migrations;

use anyhow::Result;
use async_trait::async_trait;
use sqlx::postgres::PgPoolOptions;
use sqlx::{PgPool, Row};
use std::time::{SystemTime, UNIX_EPOCH};

use crate::database::models::*;
use crate::database::traits::*;

/// PostgreSQL-backed storage.
pub struct PostgresBackend {
    pool: PgPool,
}

impl PostgresBackend {
    pub async fn new(url: &str) -> Result<Self> {
        let pool = PgPoolOptions::new().max_connections(5).connect(url).await?;

        tracing::info!("PostgreSQL backend connected");
        Ok(Self { pool })
    }

    async fn run_migrations(&self) -> Result<()> {
        migrations::run_ddl(&self.pool).await
    }

    /// Full-row update of an api_keys row; `extra_where` narrows the match.
    async fn write_api_key(&self, record: &ApiKeyRecord, extra_where: &str) -> Result<u64> {
        let res = sqlx::query(&format!(
            "UPDATE api_keys SET \
             user_id = $1, name = $2, is_active = $3, rate_limit = $4, cost_rate = $5, \
             monthly_budget = $6, budget_used = $7, budget_used_mtd = $8, budget_mtd_month = $9, \
             deactivated_reason = $10, budget_history = $11, tpm_limit = $12, cache_ttl = $13, \
             metadata = $14, expires_at = $15, allowed_models = $16, allowed_cidrs = $17, \
             budget_period = $18, default_tags = $19, rotated_to = $20, max_concurrency = $21, \
             updated_at = $22 WHERE api_key = $23{extra_where}"
        ))
        .bind(&record.user_id)
        .bind(&record.name)
        .bind(record.is_active)
        .bind(record.rate_limit)
        .bind(record.cost_rate)
        .bind(record.monthly_budget)
        .bind(record.budget_used)
        .bind(record.budget_used_mtd)
        .bind(&record.budget_mtd_month)
        .bind(&record.deactivated_reason)
        .bind(&record.budget_history)
        .bind(record.tpm_limit)
        .bind(&record.cache_ttl)
        .bind(&record.metadata)
        .bind(record.expires_at)
        .bind(patterns_to_json(&record.allowed_models))
        .bind(patterns_to_json(&record.allowed_cidrs))
        .bind(record.budget_period.as_str())
        .bind(patterns_to_json(&record.default_tags))
        .bind(&record.rotated_to)
        .bind(record.max_concurrency)
        .bind(unix_now())
        .bind(&record.api_key)
        .execute(&self.pool)
        .await?;
        Ok(res.rows_affected())
    }

    /// Backfill plaintext API keys with HMAC-SHA256 hashes.
    async fn backfill_key_hashes(&self, encryption_key: Option<&str>) -> Result<()> {
        use crate::utils::api_key::{hash_key, is_hashed, mask_key};

        let rows = sqlx::query("SELECT api_key FROM api_keys")
            .fetch_all(&self.pool)
            .await?;

        let mut migrated = 0u32;
        for row in &rows {
            let old_key: String = row.get("api_key");
            if is_hashed(&old_key) {
                continue;
            }
            let hashed = hash_key(&old_key, encryption_key);
            let display = mask_key(&old_key);

            sqlx::query("UPDATE api_keys SET api_key = $1, key_display = $2 WHERE api_key = $3")
                .bind(&hashed)
                .bind(&display)
                .bind(&old_key)
                .execute(&self.pool)
                .await?;

            sqlx::query("UPDATE usage SET api_key = $1 WHERE api_key = $2")
                .bind(&hashed)
                .bind(&old_key)
                .execute(&self.pool)
                .await?;

            migrated += 1;
        }

        if migrated > 0 {
            tracing::info!(count = migrated, "Backfilled API key hashes");
        }

        Ok(())
    }
}

const TEAM_COLS: &str = "team_id, name, is_active, cost_rate, monthly_budget, budget_used, \
     budget_used_mtd, budget_mtd_month, budget_history, budget_period, budget_alerts_sent, \
     rate_limit, tpm_limit, max_concurrency, allowed_models, allowed_cidrs, metadata, \
     created_at, updated_at";

fn row_to_team(r: &sqlx::postgres::PgRow) -> TeamRecord {
    TeamRecord {
        team_id: r.get("team_id"),
        name: r.get("name"),
        is_active: r.get::<Option<bool>, _>("is_active").unwrap_or(true),
        cost_rate: r.get::<Option<f64>, _>("cost_rate").unwrap_or(1.0),
        monthly_budget: r.get("monthly_budget"),
        budget_used: r.get::<Option<f64>, _>("budget_used").unwrap_or(0.0),
        budget_used_mtd: r.get::<Option<f64>, _>("budget_used_mtd").unwrap_or(0.0),
        budget_mtd_month: r.get("budget_mtd_month"),
        budget_history: r.get("budget_history"),
        budget_period: BudgetPeriod::parse(r.get::<Option<String>, _>("budget_period").as_deref()),
        budget_alerts_sent: r.get("budget_alerts_sent"),
        rate_limit: r.get("rate_limit"),
        tpm_limit: r.get("tpm_limit"),
        max_concurrency: r.get("max_concurrency"),
        allowed_models: patterns_from_json(r.get("allowed_models")),
        allowed_cidrs: patterns_from_json(r.get("allowed_cidrs")),
        metadata: r.get("metadata"),
        created_at: r.get("created_at"),
        updated_at: r.get("updated_at"),
    }
}

const API_KEY_COLS: &str = "api_key, key_id, key_display, user_id, name, is_active, rate_limit, cost_rate, \
     monthly_budget, budget_used, budget_used_mtd, budget_mtd_month, \
     deactivated_reason, budget_history, tpm_limit, cache_ttl, metadata, expires_at, allowed_models, \
     allowed_cidrs, budget_period, budget_alerts_sent, default_tags, last_used_at, rotated_to, \
     max_concurrency, created_at, updated_at";

const USER_COLS: &str = "user_id, name, email, team_id, max_concurrency, is_active, cost_rate, monthly_budget, budget_used, \
     budget_used_mtd, budget_mtd_month, budget_history, rate_limit, tpm_limit, allowed_models, \
     cache_ttl, metadata, allowed_cidrs, budget_period, budget_alerts_sent, default_tags, \
     created_at, updated_at";

fn row_to_user(r: &sqlx::postgres::PgRow) -> UserRecord {
    UserRecord {
        user_id: r.get("user_id"),
        name: r.get("name"),
        email: r.get("email"),
        team_id: r.get("team_id"),
        max_concurrency: r.get("max_concurrency"),
        is_active: r.get::<Option<bool>, _>("is_active").unwrap_or(true),
        cost_rate: r.get::<Option<f64>, _>("cost_rate").unwrap_or(1.0),
        monthly_budget: r.get("monthly_budget"),
        budget_used: r.get::<Option<f64>, _>("budget_used").unwrap_or(0.0),
        budget_used_mtd: r.get::<Option<f64>, _>("budget_used_mtd").unwrap_or(0.0),
        budget_mtd_month: r.get("budget_mtd_month"),
        budget_history: r.get("budget_history"),
        rate_limit: r.get("rate_limit"),
        tpm_limit: r.get("tpm_limit"),
        allowed_models: patterns_from_json(r.get("allowed_models")),
        cache_ttl: r.get("cache_ttl"),
        metadata: r.get("metadata"),
        allowed_cidrs: patterns_from_json(r.get("allowed_cidrs")),
        budget_period: BudgetPeriod::parse(r.get::<Option<String>, _>("budget_period").as_deref()),
        budget_alerts_sent: r.get("budget_alerts_sent"),
        default_tags: patterns_from_json(r.get("default_tags")),
        created_at: r.get("created_at"),
        updated_at: r.get("updated_at"),
    }
}

/// Atomically add `amount` to a row's spend counters (single statement) and
/// report whether month-to-date spend reached the monthly budget.
async fn increment_budget(
    pool: &PgPool,
    table: &str,
    id_col: &str,
    id: &str,
    amount: f64,
) -> Result<SpendAfter> {
    let row = sqlx::query(&format!(
        "UPDATE {table} SET budget_used = budget_used + $1, \
         budget_used_mtd = budget_used_mtd + $1, updated_at = $2 WHERE {id_col} = $3 \
         RETURNING monthly_budget, budget_used_mtd"
    ))
    .bind(amount)
    .bind(unix_now())
    .bind(id)
    .fetch_optional(pool)
    .await?;
    let Some(r) = row else {
        anyhow::bail!("{table} row not found: {id}");
    };
    Ok(SpendAfter {
        used: r.get("budget_used_mtd"),
        budget: r.get("monthly_budget"),
    })
}

/// Compare-and-set on `budget_alerts_sent` — see `ApiKeyStore::claim_budget_alert`.
async fn claim_alert(
    pool: &PgPool,
    table: &str,
    id_col: &str,
    id: &str,
    period: &str,
    threshold: f64,
) -> Result<bool> {
    for _ in 0..5 {
        let row = sqlx::query(&format!(
            "SELECT budget_alerts_sent FROM {table} WHERE {id_col} = $1"
        ))
        .bind(id)
        .fetch_optional(pool)
        .await?;
        let Some(row) = row else { return Ok(false) };
        let current: Option<String> = row.get("budget_alerts_sent");
        let Some(next) = next_alert_state(current.as_deref(), period, threshold) else {
            return Ok(false);
        };
        let res = sqlx::query(&format!(
            "UPDATE {table} SET budget_alerts_sent = $1 \
             WHERE {id_col} = $2 AND budget_alerts_sent IS NOT DISTINCT FROM $3"
        ))
        .bind(&next)
        .bind(id)
        .bind(&current)
        .execute(pool)
        .await?;
        if res.rows_affected() == 1 {
            return Ok(true);
        }
    }
    Ok(false)
}

/// WHERE clause for a [`UsageFilter`], numbering placeholders from `idx`;
/// bind with [`bind_usage_filter`].
fn usage_where(f: &UsageFilter<'_>, idx: &mut usize) -> String {
    let mut w = String::from("WHERE 1=1");
    if !f.api_key.is_empty() {
        w.push_str(&format!(" AND api_key = ${idx}"));
        *idx += 1;
    }
    if f.user_id.is_some() {
        w.push_str(&format!(" AND user_id = ${idx}"));
        *idx += 1;
    }
    if f.team_id.is_some() {
        w.push_str(&format!(" AND team_id = ${idx}"));
        *idx += 1;
    }
    if f.tag.is_some() {
        w.push_str(&format!(
            " AND (',' || COALESCE(tags, '') || ',') LIKE ('%,' || ${idx} || ',%')"
        ));
        *idx += 1;
    }
    w
}

fn bind_usage_filter<'q>(
    mut q: sqlx::query::Query<'q, sqlx::Postgres, sqlx::postgres::PgArguments>,
    f: &UsageFilter<'q>,
) -> sqlx::query::Query<'q, sqlx::Postgres, sqlx::postgres::PgArguments> {
    if !f.api_key.is_empty() {
        q = q.bind(f.api_key);
    }
    if let Some(u) = f.user_id {
        q = q.bind(u);
    }
    if let Some(t) = f.team_id {
        q = q.bind(t);
    }
    if let Some(t) = f.tag {
        q = q.bind(t);
    }
    q
}

fn row_to_audit(r: &sqlx::postgres::PgRow) -> AuditLogRecord {
    AuditLogRecord {
        id: r.get("id"),
        timestamp: r.get("timestamp"),
        actor: r.get("actor"),
        source_ip: r.get("source_ip"),
        user_agent: r.get("user_agent"),
        action: r.get("action"),
        target_type: r.get("target_type"),
        target_id: r.get("target_id"),
        before: r.get("before"),
        after: r.get("after"),
        status: r.get::<i32, _>("status") as u16,
        method: r.get("method"),
        path: r.get("path"),
    }
}

async fn reset_budget(
    pool: &PgPool,
    table: &str,
    id_col: &str,
    id: &str,
    month: &str,
    prev_month: &str,
    prev_mtd: f64,
) -> Result<()> {
    let row = sqlx::query(&format!(
        "SELECT budget_history FROM {table} WHERE {id_col} = $1"
    ))
    .bind(id)
    .fetch_optional(pool)
    .await?;
    let mut history: std::collections::HashMap<String, f64> = row
        .and_then(|r| r.get::<Option<String>, _>("budget_history"))
        .as_deref()
        .and_then(|s| serde_json::from_str(s).ok())
        .unwrap_or_default();
    if prev_mtd > 0.0 && !prev_month.is_empty() {
        history.insert(prev_month.to_string(), (prev_mtd * 100.0).round() / 100.0);
    }
    let updated_history = serde_json::to_string(&history).unwrap_or_else(|_| "{}".to_string());
    sqlx::query(&format!(
        "UPDATE {table} SET budget_used_mtd = 0.0, budget_mtd_month = $1, \
         budget_history = $2, updated_at = $3 WHERE {id_col} = $4"
    ))
    .bind(month)
    .bind(&updated_history)
    .bind(unix_now())
    .bind(id)
    .execute(pool)
    .await?;
    Ok(())
}

fn row_to_api_key(r: &sqlx::postgres::PgRow) -> ApiKeyRecord {
    ApiKeyRecord {
        api_key: r.get("api_key"),
        key_id: r.get::<Option<String>, _>("key_id").unwrap_or_default(),
        key_display: r
            .get::<Option<String>, _>("key_display")
            .unwrap_or_default(),
        user_id: r.get::<Option<String>, _>("user_id").unwrap_or_default(),
        name: r.get("name"),
        is_active: r.get("is_active"),
        rate_limit: r.get("rate_limit"),
        cost_rate: r.get("cost_rate"),
        monthly_budget: r.get("monthly_budget"),
        budget_used: r.get("budget_used"),
        budget_used_mtd: r.get("budget_used_mtd"),
        budget_mtd_month: r.get("budget_mtd_month"),
        deactivated_reason: r.get("deactivated_reason"),
        budget_history: r.get("budget_history"),
        tpm_limit: r.get("tpm_limit"),
        cache_ttl: r.get("cache_ttl"),
        metadata: r.get("metadata"),
        expires_at: r.get("expires_at"),
        allowed_models: patterns_from_json(r.get("allowed_models")),
        allowed_cidrs: patterns_from_json(r.get("allowed_cidrs")),
        budget_period: BudgetPeriod::parse(r.get::<Option<String>, _>("budget_period").as_deref()),
        budget_alerts_sent: r.get("budget_alerts_sent"),
        default_tags: patterns_from_json(r.get("default_tags")),
        last_used_at: r.get("last_used_at"),
        rotated_to: r.get("rotated_to"),
        max_concurrency: r.get("max_concurrency"),
        created_at: r.get("created_at"),
        updated_at: r.get("updated_at"),
    }
}

fn unix_now() -> i64 {
    SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .expect("system clock before UNIX epoch")
        .as_secs() as i64
}

// ============================================================================
// DatabaseService
// ============================================================================

#[async_trait]
impl DatabaseService for PostgresBackend {
    fn api_keys(&self) -> &dyn ApiKeyStore {
        self
    }
    fn users(&self) -> &dyn UserStore {
        self
    }
    fn audit(&self) -> &dyn AuditStore {
        self
    }
    fn teams(&self) -> &dyn TeamStore {
        self
    }
    fn budgets(&self) -> &dyn BudgetStore {
        self
    }
    fn rate_counters(&self) -> &dyn RateCounterStore {
        self
    }
    fn usage(&self) -> &dyn UsageStore {
        self
    }
    fn model_mapping(&self) -> &dyn ModelMappingStore {
        self
    }
    fn backends(&self) -> &dyn BackendConfigStore {
        self
    }
    fn system_settings(&self) -> &dyn SystemSettingStore {
        self
    }

    async fn initialize(&self, encryption_key: Option<&str>, seed_mode: SeedMode) -> Result<()> {
        self.run_migrations().await?;
        self.backfill_key_hashes(encryption_key).await?;
        self.migrate_keys_to_users().await?;
        self.seed_defaults(seed_mode).await?;
        Ok(())
    }

    async fn health_check(&self) -> bool {
        sqlx::query("SELECT 1").execute(&self.pool).await.is_ok()
    }

    async fn backfill_usage_user_ids(&self) -> Result<()> {
        let res = sqlx::query(
            "UPDATE usage SET user_id = k.user_id FROM api_keys k \
             WHERE usage.api_key = k.api_key AND usage.user_id IS NULL",
        )
        .execute(&self.pool)
        .await?;
        tracing::info!(rows = res.rows_affected(), "Backfilled usage.user_id");
        self.upsert_setting(&internal_setting(USAGE_USER_BACKFILL_SETTING, "done"))
            .await
    }
}

// ============================================================================
// ApiKeyStore
// ============================================================================

#[async_trait]
impl ApiKeyStore for PostgresBackend {
    async fn get_api_key(&self, api_key: &str) -> Result<Option<ApiKeyRecord>> {
        let row = sqlx::query(&format!(
            "SELECT {API_KEY_COLS} FROM api_keys WHERE api_key = $1"
        ))
        .bind(api_key)
        .fetch_optional(&self.pool)
        .await?;

        match row {
            Some(r) => Ok(Some(row_to_api_key(&r))),
            None => Ok(None),
        }
    }

    async fn create_api_key(&self, record: &ApiKeyRecord) -> Result<()> {
        sqlx::query(
            "INSERT INTO api_keys \
             (api_key, key_id, key_display, user_id, name, is_active, rate_limit, cost_rate, \
              monthly_budget, budget_used, budget_used_mtd, budget_mtd_month, \
              deactivated_reason, budget_history, tpm_limit, cache_ttl, metadata, \
              expires_at, allowed_models, allowed_cidrs, budget_period, budget_alerts_sent, \
              default_tags, last_used_at, rotated_to, max_concurrency, created_at, updated_at) \
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, \
                     $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28)",
        )
        .bind(&record.api_key)
        .bind(&record.key_id)
        .bind(&record.key_display)
        .bind(&record.user_id)
        .bind(&record.name)
        .bind(record.is_active)
        .bind(record.rate_limit)
        .bind(record.cost_rate)
        .bind(record.monthly_budget)
        .bind(record.budget_used)
        .bind(record.budget_used_mtd)
        .bind(&record.budget_mtd_month)
        .bind(&record.deactivated_reason)
        .bind(&record.budget_history)
        .bind(record.tpm_limit)
        .bind(&record.cache_ttl)
        .bind(&record.metadata)
        .bind(record.expires_at)
        .bind(patterns_to_json(&record.allowed_models))
        .bind(patterns_to_json(&record.allowed_cidrs))
        .bind(record.budget_period.as_str())
        .bind(&record.budget_alerts_sent)
        .bind(patterns_to_json(&record.default_tags))
        .bind(record.last_used_at)
        .bind(&record.rotated_to)
        .bind(record.max_concurrency)
        .bind(record.created_at)
        .bind(record.updated_at)
        .execute(&self.pool)
        .await?;

        Ok(())
    }

    async fn update_api_key(&self, record: &ApiKeyRecord) -> Result<()> {
        self.write_api_key(record, "").await.map(|_| ())
    }

    async fn deactivate_api_key(&self, api_key: &str, reason: &str) -> Result<()> {
        let now = unix_now();
        sqlx::query(
            "UPDATE api_keys SET is_active = FALSE, deactivated_reason = $1, updated_at = $2 \
             WHERE api_key = $3",
        )
        .bind(reason)
        .bind(now)
        .bind(api_key)
        .execute(&self.pool)
        .await?;

        Ok(())
    }

    async fn increment_budget_used(&self, api_key: &str, amount: f64) -> Result<SpendAfter> {
        increment_budget(&self.pool, "api_keys", "api_key", api_key, amount).await
    }

    async fn reset_monthly_budget(
        &self,
        api_key: &str,
        month: &str,
        prev_month: &str,
        prev_mtd: f64,
    ) -> Result<()> {
        reset_budget(
            &self.pool, "api_keys", "api_key", api_key, month, prev_month, prev_mtd,
        )
        .await
    }

    async fn reactivate_api_key(&self, api_key: &str) -> Result<()> {
        let now = unix_now();
        sqlx::query(
            "UPDATE api_keys SET is_active = TRUE, deactivated_reason = NULL, updated_at = $1 WHERE api_key = $2 AND deactivated_reason = 'budget_exceeded'",
        )
        .bind(now)
        .bind(api_key)
        .execute(&self.pool)
        .await?;
        Ok(())
    }

    async fn list_api_keys(&self) -> Result<Vec<ApiKeyRecord>> {
        let rows = sqlx::query(&format!(
            "SELECT {API_KEY_COLS} FROM api_keys ORDER BY created_at DESC"
        ))
        .fetch_all(&self.pool)
        .await?;

        let records = rows.iter().map(row_to_api_key).collect();

        Ok(records)
    }

    async fn find_api_key_by_prefix(&self, prefix: &str) -> Result<Option<ApiKeyRecord>> {
        let rows = sqlx::query(&format!(
            "SELECT {API_KEY_COLS} FROM api_keys WHERE api_key LIKE $1 || '%' LIMIT 2"
        ))
        .bind(prefix)
        .fetch_all(&self.pool)
        .await?;

        if rows.len() > 1 {
            anyhow::bail!("ambiguous_prefix");
        }

        Ok(rows.first().map(row_to_api_key))
    }

    async fn get_api_key_by_name(&self, name: &str) -> Result<Option<ApiKeyRecord>> {
        let row = sqlx::query(&format!(
            "SELECT {API_KEY_COLS} FROM api_keys WHERE name = $1"
        ))
        .bind(name)
        .fetch_optional(&self.pool)
        .await?;

        match row {
            Some(r) => Ok(Some(row_to_api_key(&r))),
            None => Ok(None),
        }
    }

    async fn get_api_key_by_id(&self, key_id: &str) -> Result<Option<ApiKeyRecord>> {
        let row = sqlx::query(&format!(
            "SELECT {API_KEY_COLS} FROM api_keys WHERE key_id = $1"
        ))
        .bind(key_id)
        .fetch_optional(&self.pool)
        .await?;
        Ok(row.as_ref().map(row_to_api_key))
    }

    async fn delete_api_key(&self, api_key: &str) -> Result<()> {
        sqlx::query("DELETE FROM api_keys WHERE api_key = $1")
            .bind(api_key)
            .execute(&self.pool)
            .await?;
        Ok(())
    }

    async fn list_api_keys_by_user(&self, user_id: &str) -> Result<Vec<ApiKeyRecord>> {
        let rows = sqlx::query(&format!(
            "SELECT {API_KEY_COLS} FROM api_keys WHERE user_id = $1 ORDER BY created_at DESC"
        ))
        .bind(user_id)
        .fetch_all(&self.pool)
        .await?;
        Ok(rows.iter().map(row_to_api_key).collect())
    }

    async fn assign_unowned_key(&self, record: &ApiKeyRecord) -> Result<bool> {
        self.write_api_key(record, " AND (user_id IS NULL OR user_id = '')")
            .await
            .map(|n| n > 0)
    }

    async fn touch_last_used(&self, api_key: &str, at: i64) -> Result<()> {
        sqlx::query("UPDATE api_keys SET last_used_at = $1 WHERE api_key = $2")
            .bind(at)
            .bind(api_key)
            .execute(&self.pool)
            .await?;
        Ok(())
    }

    async fn claim_budget_alert(
        &self,
        api_key: &str,
        period: &str,
        threshold: f64,
    ) -> Result<bool> {
        claim_alert(
            &self.pool, "api_keys", "api_key", api_key, period, threshold,
        )
        .await
    }
}

// ============================================================================
// UserStore
// ============================================================================

#[async_trait]
impl UserStore for PostgresBackend {
    async fn get_user(&self, user_id: &str) -> Result<Option<UserRecord>> {
        let row = sqlx::query(&format!("SELECT {USER_COLS} FROM users WHERE user_id = $1"))
            .bind(user_id)
            .fetch_optional(&self.pool)
            .await?;
        Ok(row.as_ref().map(row_to_user))
    }

    async fn get_user_by_name(&self, name: &str) -> Result<Option<UserRecord>> {
        let row = sqlx::query(&format!("SELECT {USER_COLS} FROM users WHERE name = $1"))
            .bind(name)
            .fetch_optional(&self.pool)
            .await?;
        Ok(row.as_ref().map(row_to_user))
    }

    async fn list_users(&self) -> Result<Vec<UserRecord>> {
        let rows = sqlx::query(&format!(
            "SELECT {USER_COLS} FROM users ORDER BY created_at DESC"
        ))
        .fetch_all(&self.pool)
        .await?;
        Ok(rows.iter().map(row_to_user).collect())
    }

    async fn create_user(&self, u: &UserRecord) -> Result<()> {
        sqlx::query(&format!(
            "INSERT INTO users ({USER_COLS}) VALUES \
             ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, \
              $18, $19, $20, $21, $22, $23)"
        ))
        .bind(&u.user_id)
        .bind(&u.name)
        .bind(&u.email)
        .bind(&u.team_id)
        .bind(u.max_concurrency)
        .bind(u.is_active)
        .bind(u.cost_rate)
        .bind(u.monthly_budget)
        .bind(u.budget_used)
        .bind(u.budget_used_mtd)
        .bind(&u.budget_mtd_month)
        .bind(&u.budget_history)
        .bind(u.rate_limit)
        .bind(u.tpm_limit)
        .bind(patterns_to_json(&u.allowed_models))
        .bind(&u.cache_ttl)
        .bind(&u.metadata)
        .bind(patterns_to_json(&u.allowed_cidrs))
        .bind(u.budget_period.as_str())
        .bind(&u.budget_alerts_sent)
        .bind(patterns_to_json(&u.default_tags))
        .bind(u.created_at)
        .bind(u.updated_at)
        .execute(&self.pool)
        .await?;
        Ok(())
    }

    async fn update_user(&self, u: &UserRecord) -> Result<()> {
        // Spend counters are owned by increment/reset — never overwritten here.
        sqlx::query(
            "UPDATE users SET name = $1, email = $2, team_id = $3, max_concurrency = $4, \
             is_active = $5, cost_rate = $6, monthly_budget = $7, rate_limit = $8, tpm_limit = $9, \
             allowed_models = $10, cache_ttl = $11, metadata = $12, allowed_cidrs = $13, \
             budget_period = $14, default_tags = $15, updated_at = $16 WHERE user_id = $17",
        )
        .bind(&u.name)
        .bind(&u.email)
        .bind(&u.team_id)
        .bind(u.max_concurrency)
        .bind(u.is_active)
        .bind(u.cost_rate)
        .bind(u.monthly_budget)
        .bind(u.rate_limit)
        .bind(u.tpm_limit)
        .bind(patterns_to_json(&u.allowed_models))
        .bind(&u.cache_ttl)
        .bind(&u.metadata)
        .bind(patterns_to_json(&u.allowed_cidrs))
        .bind(u.budget_period.as_str())
        .bind(patterns_to_json(&u.default_tags))
        .bind(unix_now())
        .bind(&u.user_id)
        .execute(&self.pool)
        .await?;
        Ok(())
    }

    async fn delete_user(&self, user_id: &str) -> Result<()> {
        sqlx::query("DELETE FROM users WHERE user_id = $1")
            .bind(user_id)
            .execute(&self.pool)
            .await?;
        Ok(())
    }

    async fn increment_user_budget_used(&self, user_id: &str, amount: f64) -> Result<SpendAfter> {
        increment_budget(&self.pool, "users", "user_id", user_id, amount).await
    }

    async fn reset_user_monthly_budget(
        &self,
        user_id: &str,
        month: &str,
        prev_month: &str,
        prev_mtd: f64,
    ) -> Result<()> {
        reset_budget(
            &self.pool, "users", "user_id", user_id, month, prev_month, prev_mtd,
        )
        .await
    }

    async fn claim_user_budget_alert(
        &self,
        user_id: &str,
        period: &str,
        threshold: f64,
    ) -> Result<bool> {
        claim_alert(&self.pool, "users", "user_id", user_id, period, threshold).await
    }
}

// ============================================================================
// TeamStore / BudgetStore / RateCounterStore
// ============================================================================

#[async_trait]
impl TeamStore for PostgresBackend {
    async fn get_team(&self, team_id: &str) -> Result<Option<TeamRecord>> {
        let row = sqlx::query(&format!("SELECT {TEAM_COLS} FROM teams WHERE team_id = $1"))
            .bind(team_id)
            .fetch_optional(&self.pool)
            .await?;
        Ok(row.as_ref().map(row_to_team))
    }

    async fn get_team_by_name(&self, name: &str) -> Result<Option<TeamRecord>> {
        let row = sqlx::query(&format!("SELECT {TEAM_COLS} FROM teams WHERE name = $1"))
            .bind(name)
            .fetch_optional(&self.pool)
            .await?;
        Ok(row.as_ref().map(row_to_team))
    }

    async fn list_teams(&self) -> Result<Vec<TeamRecord>> {
        let rows = sqlx::query(&format!(
            "SELECT {TEAM_COLS} FROM teams ORDER BY created_at DESC"
        ))
        .fetch_all(&self.pool)
        .await?;
        Ok(rows.iter().map(row_to_team).collect())
    }

    async fn create_team(&self, t: &TeamRecord) -> Result<()> {
        sqlx::query(&format!(
            "INSERT INTO teams ({TEAM_COLS}) VALUES \
             ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)"
        ))
        .bind(&t.team_id)
        .bind(&t.name)
        .bind(t.is_active)
        .bind(t.cost_rate)
        .bind(t.monthly_budget)
        .bind(t.budget_used)
        .bind(t.budget_used_mtd)
        .bind(&t.budget_mtd_month)
        .bind(&t.budget_history)
        .bind(t.budget_period.as_str())
        .bind(&t.budget_alerts_sent)
        .bind(t.rate_limit)
        .bind(t.tpm_limit)
        .bind(t.max_concurrency)
        .bind(patterns_to_json(&t.allowed_models))
        .bind(patterns_to_json(&t.allowed_cidrs))
        .bind(&t.metadata)
        .bind(t.created_at)
        .bind(t.updated_at)
        .execute(&self.pool)
        .await?;
        Ok(())
    }

    async fn update_team(&self, t: &TeamRecord) -> Result<()> {
        sqlx::query(
            "UPDATE teams SET name = $1, is_active = $2, cost_rate = $3, monthly_budget = $4, \
             budget_period = $5, rate_limit = $6, tpm_limit = $7, max_concurrency = $8, \
             allowed_models = $9, allowed_cidrs = $10, metadata = $11, updated_at = $12 \
             WHERE team_id = $13",
        )
        .bind(&t.name)
        .bind(t.is_active)
        .bind(t.cost_rate)
        .bind(t.monthly_budget)
        .bind(t.budget_period.as_str())
        .bind(t.rate_limit)
        .bind(t.tpm_limit)
        .bind(t.max_concurrency)
        .bind(patterns_to_json(&t.allowed_models))
        .bind(patterns_to_json(&t.allowed_cidrs))
        .bind(&t.metadata)
        .bind(unix_now())
        .bind(&t.team_id)
        .execute(&self.pool)
        .await?;
        Ok(())
    }

    async fn delete_team(&self, team_id: &str) -> Result<()> {
        sqlx::query("DELETE FROM teams WHERE team_id = $1")
            .bind(team_id)
            .execute(&self.pool)
            .await?;
        Ok(())
    }

    async fn increment_team_budget_used(&self, team_id: &str, amount: f64) -> Result<SpendAfter> {
        increment_budget(&self.pool, "teams", "team_id", team_id, amount).await
    }

    async fn reset_team_monthly_budget(
        &self,
        team_id: &str,
        period: &str,
        prev_period: &str,
        prev_used: f64,
    ) -> Result<()> {
        reset_budget(
            &self.pool,
            "teams",
            "team_id",
            team_id,
            period,
            prev_period,
            prev_used,
        )
        .await
    }

    async fn claim_team_budget_alert(
        &self,
        team_id: &str,
        period: &str,
        threshold: f64,
    ) -> Result<bool> {
        claim_alert(&self.pool, "teams", "team_id", team_id, period, threshold).await
    }

    async fn list_team_members(&self, team_id: &str) -> Result<Vec<UserRecord>> {
        let rows = sqlx::query(&format!(
            "SELECT {USER_COLS} FROM users WHERE team_id = $1 ORDER BY name"
        ))
        .bind(team_id)
        .fetch_all(&self.pool)
        .await?;
        Ok(rows.iter().map(row_to_user).collect())
    }
}

#[async_trait]
impl BudgetStore for PostgresBackend {
    async fn reserve_budget(
        &self,
        layer: BudgetLayer,
        id: &str,
        amount: f64,
        max_used_before: f64,
    ) -> Result<bool> {
        let (table, id_col) = layer.table();
        let res = sqlx::query(&format!(
            "UPDATE {table} SET budget_used = budget_used + $1, \
             budget_used_mtd = budget_used_mtd + $1 \
             WHERE {id_col} = $2 AND budget_used_mtd <= $3"
        ))
        .bind(amount)
        .bind(id)
        .bind(max_used_before)
        .execute(&self.pool)
        .await?;
        Ok(res.rows_affected() == 1)
    }
}

#[async_trait]
impl RateCounterStore for PostgresBackend {
    async fn incr_window(
        &self,
        subject: &str,
        window: i64,
        requests: i64,
        tokens: i64,
        expires_at: i64,
    ) -> Result<WindowCount> {
        let row = sqlx::query(
            "INSERT INTO rate_counters (subject, window_start, requests, tokens, expires_at) \
             VALUES ($1, $2, $3, $4, $5) \
             ON CONFLICT (subject, window_start) DO UPDATE SET \
             requests = rate_counters.requests + EXCLUDED.requests, \
             tokens = rate_counters.tokens + EXCLUDED.tokens \
             RETURNING requests, tokens",
        )
        .bind(subject)
        .bind(window)
        .bind(requests)
        .bind(tokens)
        .bind(expires_at)
        .fetch_one(&self.pool)
        .await?;
        Ok(WindowCount {
            requests: row.get("requests"),
            tokens: row.get("tokens"),
        })
    }

    async fn get_window(&self, subject: &str, window: i64) -> Result<WindowCount> {
        let row = sqlx::query(
            "SELECT requests, tokens FROM rate_counters WHERE subject = $1 AND window_start = $2",
        )
        .bind(subject)
        .bind(window)
        .fetch_optional(&self.pool)
        .await?;
        Ok(row
            .map(|r| WindowCount {
                requests: r.get("requests"),
                tokens: r.get("tokens"),
            })
            .unwrap_or_default())
    }

    async fn purge_windows(&self, now: i64) -> Result<u64> {
        let res = sqlx::query("DELETE FROM rate_counters WHERE expires_at < $1")
            .bind(now)
            .execute(&self.pool)
            .await?;
        Ok(res.rows_affected())
    }
}

// ============================================================================
// AuditStore
// ============================================================================

#[async_trait]
impl AuditStore for PostgresBackend {
    async fn record_audit(&self, a: &AuditLogRecord) -> Result<()> {
        sqlx::query(
            "INSERT INTO audit_logs (id, timestamp, actor, source_ip, user_agent, action, \
             target_type, target_id, before, after, status, method, path) \
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)",
        )
        .bind(&a.id)
        .bind(&a.timestamp)
        .bind(&a.actor)
        .bind(&a.source_ip)
        .bind(&a.user_agent)
        .bind(&a.action)
        .bind(&a.target_type)
        .bind(&a.target_id)
        .bind(&a.before)
        .bind(&a.after)
        .bind(a.status as i32)
        .bind(&a.method)
        .bind(&a.path)
        .execute(&self.pool)
        .await?;
        Ok(())
    }

    async fn query_audit(&self, q: &AuditQuery) -> Result<Vec<AuditLogRecord>> {
        let mut sql = String::from("SELECT * FROM audit_logs WHERE 1=1");
        let mut binds: Vec<String> = Vec::new();
        let mut idx = 1usize;
        if let Some(a) = &q.action {
            sql.push_str(&format!(" AND action LIKE ${idx} || '%'"));
            idx += 1;
            binds.push(a.clone());
        }
        for (col, v) in [("target_type", &q.target_type), ("target_id", &q.target_id)] {
            if let Some(v) = v {
                sql.push_str(&format!(" AND {col} = ${idx}"));
                idx += 1;
                binds.push(v.clone());
            }
        }
        for (op, v) in [(">=", &q.start), ("<=", &q.end), ("<", &q.before)] {
            if let Some(v) = v {
                sql.push_str(&format!(" AND timestamp {op} ${idx}"));
                idx += 1;
                binds.push(v.clone());
            }
        }
        sql.push_str(&format!(" ORDER BY timestamp DESC, id DESC LIMIT ${idx}"));
        let mut query = sqlx::query(&sql);
        for b in &binds {
            query = query.bind(b);
        }
        let rows = query
            .bind(q.limit.max(1) as i64)
            .fetch_all(&self.pool)
            .await?;
        Ok(rows.iter().map(row_to_audit).collect())
    }

    async fn purge_audit_before(&self, cutoff: &str) -> Result<u64> {
        let res = sqlx::query("DELETE FROM audit_logs WHERE timestamp < $1")
            .bind(cutoff)
            .execute(&self.pool)
            .await?;
        Ok(res.rows_affected())
    }
}

// ============================================================================
// UsageStore
// ============================================================================

#[async_trait]
impl UsageStore for PostgresBackend {
    async fn record_usage(&self, record: &UsageRecord) -> Result<()> {
        sqlx::query(
            "INSERT INTO usage \
             (api_key, key_id, user_id, team_id, tags, timestamp, request_id, model, input_tokens, \
              output_tokens, cached_tokens, cache_write_tokens, cost, success, duration_ms, \
              error_message, provider, protocol) \
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)",
        )
        .bind(&record.api_key)
        .bind(&record.key_id)
        .bind(&record.user_id)
        .bind(&record.team_id)
        .bind(&record.tags)
        .bind(&record.timestamp)
        .bind(&record.request_id)
        .bind(&record.model)
        .bind(record.input_tokens)
        .bind(record.output_tokens)
        .bind(record.cached_tokens)
        .bind(record.cache_write_tokens)
        .bind(record.cost)
        .bind(record.success)
        .bind(record.duration_ms)
        .bind(&record.error_message)
        .bind(&record.provider)
        .bind(&record.protocol)
        .execute(&self.pool)
        .await?;

        Ok(())
    }

    async fn get_usage_by_api_key(
        &self,
        filter: UsageFilter<'_>,
        since: Option<&str>,
        limit: Option<i64>,
        before_id: Option<i64>,
    ) -> Result<Vec<UsageRecord>> {
        // Build dynamic SQL with numbered placeholders ($1, $2, …)
        let mut param_idx = 1usize;
        let key_clause = usage_where(&filter, &mut param_idx);
        let since_clause = if since.is_some() {
            let s = format!("AND timestamp >= ${param_idx}");
            param_idx += 1;
            s
        } else {
            String::new()
        };
        let before_id_clause = if before_id.is_some() {
            let s = format!("AND id < ${param_idx}");
            param_idx += 1;
            s
        } else {
            String::new()
        };
        let limit_clause = if limit.is_some() {
            format!("LIMIT ${param_idx}")
        } else {
            String::new()
        };

        let sql = format!(
            "SELECT id, api_key, key_id, user_id, team_id, tags, timestamp, request_id, model, \
             input_tokens, output_tokens, cached_tokens, cache_write_tokens, \
             cost, success, duration_ms, error_message, provider, protocol \
             FROM usage {key_clause} {since_clause} {before_id_clause} \
             ORDER BY timestamp DESC {limit_clause}",
        );

        let mut q = bind_usage_filter(sqlx::query(&sql), &filter);
        if let Some(s) = since {
            q = q.bind(s);
        }
        if let Some(bid) = before_id {
            q = q.bind(bid);
        }
        if let Some(l) = limit {
            q = q.bind(l);
        }

        let rows = q.fetch_all(&self.pool).await?;

        let records = rows
            .iter()
            .map(|r| UsageRecord {
                id: r.get("id"),
                api_key: r.get("api_key"),
                key_id: r.get("key_id"),
                user_id: r.get("user_id"),
                team_id: r.get("team_id"),
                tags: r.get("tags"),
                timestamp: r.get("timestamp"),
                request_id: r.get("request_id"),
                model: r.get("model"),
                input_tokens: r.get("input_tokens"),
                output_tokens: r.get("output_tokens"),
                cached_tokens: r.get("cached_tokens"),
                cache_write_tokens: r.get("cache_write_tokens"),
                cost: r.get("cost"),
                success: r.get("success"),
                duration_ms: r.get("duration_ms"),
                error_message: r.get("error_message"),
                provider: r.get("provider"),
                protocol: r.get("protocol"),
            })
            .collect();

        Ok(records)
    }

    async fn query_usage_summary(
        &self,
        filter: UsageFilter<'_>,
        start: Option<&str>,
        end: Option<&str>,
        group_by: &str,
        split_by: Option<&str>,
    ) -> Result<Vec<UsageSummaryRow>> {
        fn dim_expr(dim: &str) -> String {
            match dim {
                "model" => "model".to_string(),
                "day" => {
                    "to_char(date_trunc('day', timestamp::timestamptz), 'YYYY-MM-DD')".to_string()
                }
                "month" => {
                    "to_char(date_trunc('month', timestamp::timestamptz), 'YYYY-MM')".to_string()
                }
                "provider" => "COALESCE(provider, 'unknown')".to_string(),
                "api_key" => "COALESCE(key_id, api_key)".to_string(),
                "user" => "COALESCE(user_id, '')".to_string(),
                "team" => "COALESCE(team_id, '')".to_string(),
                "tags" => "COALESCE(tags, '')".to_string(),
                _ => "to_char(date_trunc('hour', timestamp::timestamptz), 'YYYY-MM-DD\"T\"HH24')"
                    .to_string(),
            }
        }

        let group_expr = dim_expr(group_by);

        let (split_select, split_group, split_order) = if let Some(sb) = split_by {
            let se = dim_expr(sb);
            (
                format!(", {se} AS split_key"),
                format!(", {se}"),
                ", split_key".to_string(),
            )
        } else {
            (String::new(), String::new(), String::new())
        };

        // Postgres uses $1, $2... placeholders, parameter order adjusted dynamically

        #[allow(unused_assignments)]
        let mut param_idx = 1usize;
        let key_clause = usage_where(&filter, &mut param_idx);
        let start_clause = if start.is_some() {
            let s = format!("AND timestamp >= ${param_idx}");
            param_idx += 1;
            s
        } else {
            String::new()
        };
        let end_clause = if end.is_some() {
            format!("AND timestamp <= ${param_idx}")
        } else {
            String::new()
        };

        let sql = format!(
            "SELECT {group_expr} AS group_key{split_select}, \
             SUM(input_tokens) AS input_tokens, \
             SUM(output_tokens) AS output_tokens, \
             SUM(cached_tokens) AS cached_tokens, \
             SUM(cache_write_tokens) AS cache_write_tokens, \
             SUM(cost) AS total_cost, \
             COUNT(*) AS total_requests, \
             SUM(CASE WHEN success = false THEN 1 ELSE 0 END) AS error_requests \
             FROM usage \
             {key_clause} {start_clause} {end_clause} \
             GROUP BY {group_expr}{split_group} \
             ORDER BY group_key DESC{split_order}",
        );

        let mut q = bind_usage_filter(sqlx::query(&sql), &filter);
        if let Some(s) = start {
            q = q.bind(s);
        }
        if let Some(e) = end {
            q = q.bind(e);
        }

        let rows = q.fetch_all(&self.pool).await?;
        let has_split = split_by.is_some();

        let records = rows
            .iter()
            .map(|r| UsageSummaryRow {
                group_key: r.get("group_key"),
                split_key: if has_split { r.get("split_key") } else { None },
                input_tokens: r.get("input_tokens"),
                output_tokens: r.get("output_tokens"),
                cached_tokens: r.get("cached_tokens"),
                cache_write_tokens: r.get("cache_write_tokens"),
                total_cost: r.get("total_cost"),
                total_requests: r.get("total_requests"),
                error_requests: r.get("error_requests"),
            })
            .collect();

        Ok(records)
    }
}

// ============================================================================
// ModelMappingStore
// ============================================================================

#[async_trait]
impl ModelMappingStore for PostgresBackend {
    async fn get_mappings(&self, source_model_id: &str) -> Result<Vec<ModelMappingRecord>> {
        let rows = sqlx::query(
            "SELECT source_model_id, target_model_id, provider, display_name, \
             input_price, output_price, cache_read_price, cache_write_price, \
             priority, status, created_at, updated_at, capabilities, pricing_source \
             FROM model_mappings WHERE source_model_id = $1 ORDER BY priority DESC",
        )
        .bind(source_model_id)
        .fetch_all(&self.pool)
        .await?;

        let records = rows
            .iter()
            .map(|r| ModelMappingRecord {
                source_model_id: r.get("source_model_id"),
                target_model_id: r.get("target_model_id"),
                provider: r.get("provider"),
                display_name: r.get("display_name"),
                input_price: r.get("input_price"),
                output_price: r.get("output_price"),
                cache_read_price: r.get("cache_read_price"),
                cache_write_price: r.get("cache_write_price"),
                priority: r.get("priority"),
                status: r.get("status"),
                created_at: r.get("created_at"),
                updated_at: r.get("updated_at"),
                capabilities: r.get("capabilities"),
                pricing_source: r
                    .try_get::<Option<String>, _>("pricing_source")
                    .ok()
                    .flatten()
                    .unwrap_or_else(|| "litellm".to_string()),
            })
            .collect();

        Ok(records)
    }

    async fn get_mapping(
        &self,
        source_model_id: &str,
        provider: &str,
    ) -> Result<Option<ModelMappingRecord>> {
        let row = sqlx::query(
            "SELECT source_model_id, target_model_id, provider, display_name, \
             input_price, output_price, cache_read_price, cache_write_price, \
             priority, status, created_at, updated_at, capabilities, pricing_source \
             FROM model_mappings WHERE source_model_id = $1 AND provider = $2",
        )
        .bind(source_model_id)
        .bind(provider)
        .fetch_optional(&self.pool)
        .await?;

        match row {
            Some(r) => Ok(Some(ModelMappingRecord {
                source_model_id: r.get("source_model_id"),
                target_model_id: r.get("target_model_id"),
                provider: r.get("provider"),
                display_name: r.get("display_name"),
                input_price: r.get("input_price"),
                output_price: r.get("output_price"),
                cache_read_price: r.get("cache_read_price"),
                cache_write_price: r.get("cache_write_price"),
                priority: r.get("priority"),
                status: r.get("status"),
                created_at: r.get("created_at"),
                updated_at: r.get("updated_at"),
                capabilities: r.get("capabilities"),
                pricing_source: r
                    .try_get::<Option<String>, _>("pricing_source")
                    .ok()
                    .flatten()
                    .unwrap_or_else(|| "litellm".to_string()),
            })),
            None => Ok(None),
        }
    }

    async fn list_mappings(&self) -> Result<Vec<ModelMappingRecord>> {
        let rows = sqlx::query(
            "SELECT source_model_id, target_model_id, provider, display_name, \
             input_price, output_price, cache_read_price, cache_write_price, \
             priority, status, created_at, updated_at, capabilities, pricing_source \
             FROM model_mappings ORDER BY provider, priority DESC, source_model_id",
        )
        .fetch_all(&self.pool)
        .await?;

        let records = rows
            .iter()
            .map(|r| ModelMappingRecord {
                source_model_id: r.get("source_model_id"),
                target_model_id: r.get("target_model_id"),
                provider: r.get("provider"),
                display_name: r.get("display_name"),
                input_price: r.get("input_price"),
                output_price: r.get("output_price"),
                cache_read_price: r.get("cache_read_price"),
                cache_write_price: r.get("cache_write_price"),
                priority: r.get("priority"),
                status: r.get("status"),
                created_at: r.get("created_at"),
                updated_at: r.get("updated_at"),
                capabilities: r.get("capabilities"),
                pricing_source: r
                    .try_get::<Option<String>, _>("pricing_source")
                    .ok()
                    .flatten()
                    .unwrap_or_else(|| "litellm".to_string()),
            })
            .collect();

        Ok(records)
    }

    async fn upsert_mapping(&self, record: &ModelMappingRecord) -> Result<()> {
        let now = unix_now();
        sqlx::query(
            "INSERT INTO model_mappings \
             (source_model_id, target_model_id, provider, display_name, \
              input_price, output_price, cache_read_price, cache_write_price, \
              priority, status, created_at, updated_at, capabilities, pricing_source) \
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) \
             ON CONFLICT(source_model_id, provider) DO UPDATE SET \
             target_model_id = EXCLUDED.target_model_id, \
             display_name = EXCLUDED.display_name, \
             input_price = EXCLUDED.input_price, \
             output_price = EXCLUDED.output_price, \
             cache_read_price = EXCLUDED.cache_read_price, \
             cache_write_price = EXCLUDED.cache_write_price, \
             priority = EXCLUDED.priority, \
             status = EXCLUDED.status, \
             updated_at = EXCLUDED.updated_at, \
             capabilities = EXCLUDED.capabilities, \
             pricing_source = EXCLUDED.pricing_source",
        )
        .bind(&record.source_model_id)
        .bind(&record.target_model_id)
        .bind(&record.provider)
        .bind(&record.display_name)
        .bind(record.input_price)
        .bind(record.output_price)
        .bind(record.cache_read_price)
        .bind(record.cache_write_price)
        .bind(record.priority)
        .bind(&record.status)
        .bind(record.created_at)
        .bind(now)
        .bind(&record.capabilities)
        .bind(&record.pricing_source)
        .execute(&self.pool)
        .await?;

        Ok(())
    }

    async fn delete_mapping(&self, source_model_id: &str, provider: &str) -> Result<()> {
        sqlx::query("DELETE FROM model_mappings WHERE source_model_id = $1 AND provider = $2")
            .bind(source_model_id)
            .bind(provider)
            .execute(&self.pool)
            .await?;

        Ok(())
    }

    async fn list_wildcard_mappings(&self) -> Result<Vec<ModelMappingRecord>> {
        let rows = sqlx::query(
            "SELECT source_model_id, target_model_id, provider, display_name, \
             input_price, output_price, cache_read_price, cache_write_price, \
             priority, status, created_at, updated_at, capabilities, pricing_source \
             FROM model_mappings WHERE source_model_id LIKE '%*%' AND status = 'active' \
             ORDER BY priority DESC",
        )
        .fetch_all(&self.pool)
        .await?;

        let records = rows
            .iter()
            .map(|r| ModelMappingRecord {
                source_model_id: r.get("source_model_id"),
                target_model_id: r.get("target_model_id"),
                provider: r.get("provider"),
                display_name: r.get("display_name"),
                input_price: r.get("input_price"),
                output_price: r.get("output_price"),
                cache_read_price: r.get("cache_read_price"),
                cache_write_price: r.get("cache_write_price"),
                priority: r.get("priority"),
                status: r.get("status"),
                created_at: r.get("created_at"),
                updated_at: r.get("updated_at"),
                capabilities: r.get("capabilities"),
                pricing_source: r
                    .try_get::<Option<String>, _>("pricing_source")
                    .ok()
                    .flatten()
                    .unwrap_or_else(|| "litellm".to_string()),
            })
            .collect();

        Ok(records)
    }
}

// ============================================================================
// BackendConfigStore
// ============================================================================

#[async_trait]
impl BackendConfigStore for PostgresBackend {
    async fn get_backend(&self, name: &str) -> Result<Option<BackendRecord>> {
        let row = sqlx::query(
            "SELECT name, backend_type, config, enabled, priority, weight, \
             strategy, max_failures, retry_after_secs, service_tier, models, \
             created_at, updated_at \
             FROM backends WHERE name = $1",
        )
        .bind(name)
        .fetch_optional(&self.pool)
        .await?;

        match row {
            Some(r) => Ok(Some(BackendRecord {
                name: r.get("name"),
                backend_type: r.get("backend_type"),
                config: r.get("config"),
                enabled: r.get("enabled"),
                priority: r.get("priority"),
                weight: r.get("weight"),
                strategy: r.get("strategy"),
                max_failures: r.get("max_failures"),
                retry_after_secs: r.get("retry_after_secs"),
                service_tier: r.get("service_tier"),
                models: BackendRecord::models_from_json(r.get("models")),
                created_at: r.get("created_at"),
                updated_at: r.get("updated_at"),
            })),
            None => Ok(None),
        }
    }

    async fn list_enabled_backends(&self) -> Result<Vec<BackendRecord>> {
        let rows = sqlx::query(
            "SELECT name, backend_type, config, enabled, priority, weight, \
             strategy, max_failures, retry_after_secs, service_tier, models, \
             created_at, updated_at \
             FROM backends WHERE enabled = TRUE ORDER BY priority DESC",
        )
        .fetch_all(&self.pool)
        .await?;

        let records = rows
            .iter()
            .map(|r| BackendRecord {
                name: r.get("name"),
                backend_type: r.get("backend_type"),
                config: r.get("config"),
                enabled: true,
                priority: r.get("priority"),
                weight: r.get("weight"),
                strategy: r.get("strategy"),
                max_failures: r.get("max_failures"),
                retry_after_secs: r.get("retry_after_secs"),
                service_tier: r.get("service_tier"),
                models: BackendRecord::models_from_json(r.get("models")),
                created_at: r.get("created_at"),
                updated_at: r.get("updated_at"),
            })
            .collect();

        Ok(records)
    }

    async fn list_all_backends(&self) -> Result<Vec<BackendRecord>> {
        let rows = sqlx::query(
            "SELECT name, backend_type, config, enabled, priority, weight, \
             strategy, max_failures, retry_after_secs, service_tier, models, \
             created_at, updated_at \
             FROM backends ORDER BY priority DESC",
        )
        .fetch_all(&self.pool)
        .await?;

        let records = rows
            .iter()
            .map(|r| BackendRecord {
                name: r.get("name"),
                backend_type: r.get("backend_type"),
                config: r.get("config"),
                enabled: r.get("enabled"),
                priority: r.get("priority"),
                weight: r.get("weight"),
                strategy: r.get("strategy"),
                max_failures: r.get("max_failures"),
                retry_after_secs: r.get("retry_after_secs"),
                service_tier: r.get("service_tier"),
                models: BackendRecord::models_from_json(r.get("models")),
                created_at: r.get("created_at"),
                updated_at: r.get("updated_at"),
            })
            .collect();

        Ok(records)
    }

    async fn upsert_backend(&self, record: &BackendRecord) -> Result<()> {
        let now = unix_now();
        sqlx::query(
            "INSERT INTO backends \
             (name, backend_type, config, enabled, priority, weight, \
              strategy, max_failures, retry_after_secs, service_tier, models, \
              created_at, updated_at) \
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) \
             ON CONFLICT(name) DO UPDATE SET \
             backend_type = EXCLUDED.backend_type, \
             config = EXCLUDED.config, \
             enabled = EXCLUDED.enabled, \
             priority = EXCLUDED.priority, \
             weight = EXCLUDED.weight, \
             strategy = EXCLUDED.strategy, \
             max_failures = EXCLUDED.max_failures, \
             retry_after_secs = EXCLUDED.retry_after_secs, \
             service_tier = EXCLUDED.service_tier, \
             models = EXCLUDED.models, \
             updated_at = EXCLUDED.updated_at",
        )
        .bind(&record.name)
        .bind(&record.backend_type)
        .bind(&record.config)
        .bind(record.enabled)
        .bind(record.priority)
        .bind(record.weight)
        .bind(&record.strategy)
        .bind(record.max_failures)
        .bind(record.retry_after_secs)
        .bind(&record.service_tier)
        .bind(BackendRecord::models_to_json(&record.models))
        .bind(record.created_at)
        .bind(now)
        .execute(&self.pool)
        .await?;

        Ok(())
    }

    async fn delete_backend(&self, name: &str) -> Result<()> {
        sqlx::query("DELETE FROM backends WHERE name = $1")
            .bind(name)
            .execute(&self.pool)
            .await?;

        Ok(())
    }
}

// ============================================================================
// SystemSettingStore
// ============================================================================

#[async_trait]
impl SystemSettingStore for PostgresBackend {
    async fn get_setting(&self, key: &str) -> Result<Option<SystemSettingRecord>> {
        let row = sqlx::query(
            "SELECT key, value, description, ui_schema, updated_at FROM system_settings WHERE key = $1",
        )
        .bind(key)
        .fetch_optional(&self.pool)
        .await?;

        Ok(row.map(|r| SystemSettingRecord {
            key: r.get("key"),
            value: r.get("value"),
            description: r.get("description"),
            ui_schema: r.get("ui_schema"),
            updated_at: r.get("updated_at"),
        }))
    }

    async fn upsert_setting(&self, record: &SystemSettingRecord) -> Result<()> {
        let now = unix_now();
        sqlx::query(
            "INSERT INTO system_settings (key, value, description, ui_schema, updated_at) \
             VALUES ($1, $2, $3, $4, $5) \
             ON CONFLICT(key) DO UPDATE SET \
             value = EXCLUDED.value, \
             description = EXCLUDED.description, \
             ui_schema = COALESCE(EXCLUDED.ui_schema, system_settings.ui_schema), \
             updated_at = EXCLUDED.updated_at",
        )
        .bind(&record.key)
        .bind(&record.value)
        .bind(&record.description)
        .bind(&record.ui_schema)
        .bind(now)
        .execute(&self.pool)
        .await?;

        Ok(())
    }

    async fn list_settings(&self) -> Result<Vec<SystemSettingRecord>> {
        let rows = sqlx::query(
            "SELECT key, value, description, ui_schema, updated_at FROM system_settings ORDER BY key",
        )
        .fetch_all(&self.pool)
        .await?;

        Ok(rows
            .iter()
            .map(|r| SystemSettingRecord {
                key: r.get("key"),
                value: r.get("value"),
                description: r.get("description"),
                ui_schema: r.get("ui_schema"),
                updated_at: r.get("updated_at"),
            })
            .collect())
    }
}
