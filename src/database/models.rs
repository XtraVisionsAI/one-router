//! Storage data models
//!
//! Database-agnostic data structures for all 5 tables.

use serde::{Deserialize, Serialize};

// ============================================================================
// api_keys
// ============================================================================

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ApiKeyRecord {
    pub api_key: String,
    #[serde(default)]
    pub key_display: String,
    pub name: String,
    pub is_active: bool,
    pub rate_limit: i32,
    pub cost_rate: f64,
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
    pub created_at: i64,
    pub updated_at: Option<i64>,
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
    pub api_key: String,
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
