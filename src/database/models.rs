//! Storage data models
//!
//! Database-agnostic data structures for all tables.

use serde::{Deserialize, Serialize};

// ============================================================================
// api_keys
// ============================================================================

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ApiKeyRecord {
    /// HMAC-SHA256 hash of the plaintext key — the storage primary key and the
    /// auth lookup value. Never exposed through the admin API.
    pub api_key: String,
    /// Stable, secret-independent identifier (UUIDv4). Used by the admin API,
    /// usage attribution and the rate limiters.
    #[serde(default)]
    pub key_id: String,
    #[serde(default)]
    pub key_display: String,
    /// Owning user. Empty only on rows not yet migrated (startup migration
    /// assigns every key a user).
    #[serde(default)]
    pub user_id: String,
    /// Unique per user (not globally).
    pub name: String,
    pub is_active: bool,
    /// Key-level RPM sub-limit. `<= 0` = none (only the user limit applies).
    pub rate_limit: i32,
    /// Unused since keys gained an owning user — `cost_rate` lives on the user.
    /// Kept so the column round-trips; always 1.0 for new keys.
    pub cost_rate: f64,
    /// Key-level monthly budget sub-limit (USD). `None` = only the user budget applies.
    pub monthly_budget: Option<f64>,
    pub budget_used: f64,
    pub budget_used_mtd: f64,
    pub budget_mtd_month: Option<String>,
    pub deactivated_reason: Option<String>,
    /// Monthly budget history as JSON: {"2026-02": 45.67, "2026-01": 32.11}
    pub budget_history: Option<String>,
    pub tpm_limit: Option<i32>,
    pub cache_ttl: Option<String>, // "5m" | "1h" | None
    pub metadata: Option<String>,  // JSON
    /// Unix seconds after which the key is rejected. `None` = never expires.
    #[serde(default)]
    pub expires_at: Option<i64>,
    /// Key-level model allowlist (glob patterns, `!` negation — same syntax as
    /// backend `models`). Intersected with the user's. `None` = unrestricted.
    #[serde(default)]
    pub allowed_models: Option<Vec<String>>,
    /// Client-address allowlist (CIDRs). Intersected with the user's. `None` = any.
    #[serde(default)]
    pub allowed_cidrs: Option<Vec<String>>,
    /// Budget reset period for the key-level sub-budget.
    #[serde(default)]
    pub budget_period: BudgetPeriod,
    /// Alert dedupe state: `{"period": "<period key>", "thresholds": [0.8]}`.
    #[serde(default)]
    pub budget_alerts_sent: Option<String>,
    /// Tags added to every usage row of this key.
    #[serde(default)]
    pub default_tags: Option<Vec<String>>,
    /// Unix seconds of the last authenticated request (debounced, ~5 min).
    #[serde(default)]
    pub last_used_at: Option<i64>,
    /// Set on a key that was rotated: the replacement's `key_id`.
    #[serde(default)]
    pub rotated_to: Option<String>,
    pub created_at: i64,
    pub updated_at: Option<i64>,
}

/// Budget reset period. The stored "period key" (`budget_mtd_month` column,
/// kept for compatibility) is `2026-11` / `2026-W45` / `2026-11-06`.
#[derive(Debug, Clone, Copy, Default, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "lowercase")]
pub enum BudgetPeriod {
    #[default]
    Monthly,
    Weekly,
    Daily,
}

impl BudgetPeriod {
    pub fn as_str(self) -> &'static str {
        match self {
            BudgetPeriod::Monthly => "monthly",
            BudgetPeriod::Weekly => "weekly",
            BudgetPeriod::Daily => "daily",
        }
    }

    /// Parse a stored value; unknown / empty → monthly (the legacy behavior).
    pub fn parse(s: Option<&str>) -> Self {
        match s.map(str::trim) {
            Some("weekly") => BudgetPeriod::Weekly,
            Some("daily") => BudgetPeriod::Daily,
            _ => BudgetPeriod::Monthly,
        }
    }

    /// Period key containing `now` (UTC): `%Y-%m`, ISO week `%G-W%V`, `%Y-%m-%d`.
    pub fn key_at(self, now: chrono::DateTime<chrono::Utc>) -> String {
        match self {
            BudgetPeriod::Monthly => now.format("%Y-%m").to_string(),
            BudgetPeriod::Weekly => now.format("%G-W%V").to_string(),
            BudgetPeriod::Daily => now.format("%Y-%m-%d").to_string(),
        }
    }
}

/// Spend counters after an atomic increment.
#[derive(Debug, Clone, Copy, PartialEq)]
pub struct SpendAfter {
    /// Spend in the current period after the increment.
    pub used: f64,
    pub budget: Option<f64>,
}

impl SpendAfter {
    pub fn exceeded(&self) -> bool {
        self.budget.is_some_and(|b| self.used >= b)
    }
}

/// Serialize a glob-pattern list for a TEXT column (`None`/empty → NULL).
pub fn patterns_to_json(patterns: &Option<Vec<String>>) -> Option<String> {
    patterns
        .as_ref()
        .filter(|m| !m.is_empty())
        .and_then(|m| serde_json::to_string(m).ok())
}

/// Parse a TEXT column back into a pattern list. Blank or malformed → `None`.
pub fn patterns_from_json(raw: Option<String>) -> Option<Vec<String>> {
    let raw = raw?;
    let trimmed = raw.trim();
    if trimmed.is_empty() {
        return None;
    }
    match serde_json::from_str::<Vec<String>>(trimmed) {
        Ok(v) if !v.is_empty() => Some(v),
        Ok(_) => None,
        Err(e) => {
            tracing::warn!(error = %e, raw = %trimmed, "Invalid allowed_models JSON; treating as unrestricted");
            None
        }
    }
}

/// Spend that counts for the current period key (`current_month` — any
/// [`BudgetPeriod`] key, the name predates periods): the stored counter belongs
/// to `stored_month`, and a stale key means nothing has been spent yet this
/// period (the reset happens lazily on the next usage write).
pub fn period_spend(used_mtd: f64, stored_month: Option<&str>, current_month: &str) -> f64 {
    if stored_month == Some(current_month) {
        used_mtd
    } else {
        0.0
    }
}

// ============================================================================
// users
// ============================================================================

/// A billing / limit principal owning one or more API keys.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct UserRecord {
    pub user_id: String,
    /// Globally unique display / login name.
    pub name: String,
    pub email: Option<String>,
    /// `false` disables every key of the user.
    pub is_active: bool,
    pub cost_rate: f64,
    pub monthly_budget: Option<f64>,
    pub budget_used: f64,
    pub budget_used_mtd: f64,
    pub budget_mtd_month: Option<String>,
    /// Monthly budget history as JSON: {"2026-02": 45.67}
    pub budget_history: Option<String>,
    /// RPM shared by all of the user's keys. `None` = global `rate_limit` setting.
    pub rate_limit: Option<i32>,
    /// TPM shared by all of the user's keys. `None` = unlimited.
    pub tpm_limit: Option<i32>,
    pub allowed_models: Option<Vec<String>>,
    pub cache_ttl: Option<String>,
    pub metadata: Option<String>,
    #[serde(default)]
    pub allowed_cidrs: Option<Vec<String>>,
    #[serde(default)]
    pub budget_period: BudgetPeriod,
    #[serde(default)]
    pub budget_alerts_sent: Option<String>,
    #[serde(default)]
    pub default_tags: Option<Vec<String>>,
    pub created_at: i64,
    pub updated_at: Option<i64>,
}

impl UserRecord {
    /// A fresh active user with no limits.
    pub fn new(name: impl Into<String>, now: i64) -> Self {
        Self {
            user_id: new_key_id(),
            name: name.into(),
            email: None,
            is_active: true,
            cost_rate: 1.0,
            monthly_budget: None,
            budget_used: 0.0,
            budget_used_mtd: 0.0,
            budget_mtd_month: None,
            budget_history: None,
            rate_limit: None,
            tpm_limit: None,
            allowed_models: None,
            cache_ttl: None,
            metadata: None,
            allowed_cidrs: None,
            budget_period: BudgetPeriod::Monthly,
            budget_alerts_sent: None,
            default_tags: None,
            created_at: now,
            updated_at: None,
        }
    }
}

// ============================================================================
// audit_logs
// ============================================================================

/// One admin write operation (or login attempt).
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct AuditLogRecord {
    /// UUIDv7 (time-ordered).
    pub id: String,
    /// RFC3339 UTC.
    pub timestamp: String,
    /// `master` / `ephemeral` / `session:<8 chars>` / `anonymous` (failed login).
    pub actor: String,
    pub source_ip: Option<String>,
    pub user_agent: Option<String>,
    /// e.g. `key.create`, `user.update`, `backend.delete`, `auth.login_failed`.
    pub action: String,
    pub target_type: Option<String>,
    pub target_id: Option<String>,
    /// JSON snapshots, secrets redacted.
    pub before: Option<String>,
    pub after: Option<String>,
    /// HTTP status of the operation.
    pub status: u16,
    pub method: String,
    pub path: String,
}

/// Audit log query (all filters optional, newest first).
#[derive(Debug, Clone, Default)]
pub struct AuditQuery {
    pub action: Option<String>,
    pub target_type: Option<String>,
    pub target_id: Option<String>,
    /// RFC3339 bounds (inclusive).
    pub start: Option<String>,
    pub end: Option<String>,
    /// Return entries strictly older than this timestamp (pagination cursor).
    pub before: Option<String>,
    pub limit: usize,
}

impl AuditQuery {
    pub fn matches(&self, r: &AuditLogRecord) -> bool {
        self.action
            .as_ref()
            .is_none_or(|a| r.action.starts_with(a.as_str()))
            && self
                .target_type
                .as_ref()
                .is_none_or(|t| r.target_type.as_deref() == Some(t.as_str()))
            && self
                .target_id
                .as_ref()
                .is_none_or(|t| r.target_id.as_deref() == Some(t.as_str()))
            && self.start.as_ref().is_none_or(|s| r.timestamp >= *s)
            && self.end.as_ref().is_none_or(|e| r.timestamp <= *e)
            && self.before.as_ref().is_none_or(|b| r.timestamp < *b)
    }
}

/// Generate a fresh `key_id` (UUIDv4, hyphenated).
pub fn new_key_id() -> String {
    uuid::Uuid::new_v4().to_string()
}

/// True when `s` has the shape of a `key_id` (hyphenated UUID).
pub fn looks_like_key_id(s: &str) -> bool {
    uuid::Uuid::try_parse(s).is_ok() && s.len() == 36
}

impl ApiKeyRecord {
    pub fn is_valid(&self) -> bool {
        self.is_active
    }

    pub fn is_budget_exceeded(&self) -> bool {
        self.deactivated_reason.as_deref() == Some("budget_exceeded")
    }
}

// ============================================================================
// usage
// ============================================================================

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct UsageRecord {
    pub id: Option<i64>,
    /// Key hash (or `__master__` / `__ephemeral__`). Kept for the DynamoDB
    /// partition key and legacy rows.
    pub api_key: String,
    /// Stable key identifier. `None` on rows written before key ids existed.
    #[serde(default)]
    pub key_id: Option<String>,
    /// Owning user at request time (denormalized). `None` on rows predating
    /// users that could not be attributed (key already deleted).
    #[serde(default)]
    pub user_id: Option<String>,
    /// Comma-joined usage tags (request `x-onerouter-tags` + key/user defaults).
    #[serde(default)]
    pub tags: Option<String>,
    pub timestamp: String,
    pub request_id: String,
    pub model: String,
    pub input_tokens: i64,
    pub output_tokens: i64,
    pub cached_tokens: i64,
    pub cache_write_tokens: i64,
    pub cost: f64,
    pub success: bool,
    pub duration_ms: Option<i64>,
    pub error_message: Option<String>,
    pub provider: Option<String>,
    pub protocol: Option<String>,
}

// ============================================================================
// model_mappings
// ============================================================================

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ModelMappingRecord {
    pub source_model_id: String,
    pub target_model_id: String,
    pub provider: String,
    pub display_name: String,
    pub input_price: f64,
    pub output_price: f64,
    pub cache_read_price: f64,
    pub cache_write_price: f64,
    pub priority: i32,
    pub status: String,
    pub created_at: i64,
    pub updated_at: Option<i64>,
    /// JSON-encoded ModelCapabilities. None means use defaults (all enabled).
    pub capabilities: Option<String>,
    /// Pricing origin: `"litellm"` (auto-synced from the LiteLLM price table,
    /// overwritten on each sync) or `"manual"` (pinned — never touched by sync).
    /// Defaults to `"litellm"`.
    pub pricing_source: String,
}

// ============================================================================
// backends
// ============================================================================

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct BackendRecord {
    pub name: String,
    pub backend_type: String, // "bedrock" / "gemini"
    pub config: String,       // JSON (possibly encrypted fields)
    pub enabled: bool,
    pub priority: i32,
    pub weight: i32,                  // load balancing weight, default 1
    pub strategy: String,             // "round_robin" | "weighted" | "random" | "failover"
    pub max_failures: i32,            // default 3
    pub retry_after_secs: i64,        // default 300
    pub service_tier: Option<String>, // None=ignore, "passthrough"=forward, "flex" etc.=override
    /// Model filter patterns (per-backend model affinity), e.g.
    /// `["*", "!openai.*"]`. `None` / empty ≡ `["*"]` (serves all models).
    /// Stored as a JSON string-array column; matched against target model ids.
    #[serde(default)]
    pub models: Option<Vec<String>>,
    pub created_at: i64,
    pub updated_at: Option<i64>,
}

impl BackendRecord {
    /// Serialize `models` for a TEXT column. `None` and an empty list both
    /// store NULL (≡ serve all models), keeping legacy rows and "cleared"
    /// rows indistinguishable on purpose.
    pub fn models_to_json(models: &Option<Vec<String>>) -> Option<String> {
        models
            .as_ref()
            .filter(|m| !m.is_empty())
            .and_then(|m| serde_json::to_string(m).ok())
    }

    /// Parse a TEXT column value back into `models`. Blank or malformed JSON
    /// yields `None` (serve all) — a bad row must never break routing.
    pub fn models_from_json(raw: Option<String>) -> Option<Vec<String>> {
        let raw = raw?;
        let trimmed = raw.trim();
        if trimmed.is_empty() {
            return None;
        }
        match serde_json::from_str::<Vec<String>>(trimmed) {
            Ok(v) if !v.is_empty() => Some(v),
            Ok(_) => None,
            Err(e) => {
                tracing::warn!(error = %e, raw = %trimmed, "Invalid backends.models JSON; treating as serve-all");
                None
            }
        }
    }
}

// ============================================================================
// system_settings
// ============================================================================

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SystemSettingRecord {
    pub key: String,
    pub value: String,
    pub description: String,
    pub ui_schema: Option<String>,
    pub updated_at: Option<i64>,
}

// ============================================================================
// usage summary (query result, not a table)
// ============================================================================

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct UsageSummaryRow {
    /// 分组键，按 hour 时格式为 "2026-03-24T15"，按 model 时为模型名
    pub group_key: String,
    /// 可选的次级分组键（split_by 参数生效时填充）
    pub split_key: Option<String>,
    pub input_tokens: i64,
    pub output_tokens: i64,
    pub cached_tokens: i64,
    pub cache_write_tokens: i64,
    pub total_cost: f64,
    pub total_requests: i64,
    pub error_requests: i64,
}

/// Storage dimension for an API `group_by` / `split_by` value: the API's
/// `tag` dimension groups by the raw tag list (`tags`) and is exploded with
/// [`explode_tag_rows`].
pub fn storage_dimension(dim: &str) -> &str {
    if dim == "tag" {
        "tags"
    } else {
        dim
    }
}

/// Turn rows grouped by the raw comma-joined tag list into one row per tag (a
/// request with tags `a,b` counts toward both; untagged rows go to `(none)`).
/// Totals across tag rows can therefore exceed the overall total.
pub fn explode_tag_rows(
    rows: Vec<UsageSummaryRow>,
    group_is_tag: bool,
    split_is_tag: bool,
) -> Vec<UsageSummaryRow> {
    if !group_is_tag && !split_is_tag {
        return rows;
    }
    fn split(raw: &str) -> Vec<String> {
        let tags: Vec<String> = raw
            .split(',')
            .map(str::trim)
            .filter(|t| !t.is_empty())
            .map(String::from)
            .collect();
        if tags.is_empty() {
            vec!["(none)".to_string()]
        } else {
            tags
        }
    }
    let mut acc: std::collections::BTreeMap<(String, Option<String>), UsageSummaryRow> =
        std::collections::BTreeMap::new();
    for r in rows {
        let groups = if group_is_tag {
            split(&r.group_key)
        } else {
            vec![r.group_key.clone()]
        };
        let splits: Vec<Option<String>> = match (&r.split_key, split_is_tag) {
            (Some(sk), true) => split(sk).into_iter().map(Some).collect(),
            (sk, _) => vec![sk.clone()],
        };
        for g in &groups {
            for sk in &splits {
                let e = acc
                    .entry((g.clone(), sk.clone()))
                    .or_insert_with(|| UsageSummaryRow {
                        group_key: g.clone(),
                        split_key: sk.clone(),
                        input_tokens: 0,
                        output_tokens: 0,
                        cached_tokens: 0,
                        cache_write_tokens: 0,
                        total_cost: 0.0,
                        total_requests: 0,
                        error_requests: 0,
                    });
                e.input_tokens += r.input_tokens;
                e.output_tokens += r.output_tokens;
                e.cached_tokens += r.cached_tokens;
                e.cache_write_tokens += r.cache_write_tokens;
                e.total_cost += r.total_cost;
                e.total_requests += r.total_requests;
                e.error_requests += r.error_requests;
            }
        }
    }
    acc.into_values().collect()
}
