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
    pub created_at: i64,
    pub updated_at: Option<i64>,
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

/// Month-to-date spend that counts for `current_month` ("YYYY-MM"): the stored
/// counter belongs to `stored_month`, and a stale month means nothing has been
/// spent yet this month (the reset happens lazily on the next usage write).
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
            created_at: now,
            updated_at: None,
        }
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
