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
    pub name: String,
    pub is_active: bool,
    pub rate_limit: i32,
    pub service_tier: String,
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
    pub health_status: String,
    pub last_health_check: Option<i64>,
    pub created_at: i64,
    pub updated_at: Option<i64>,
}

// ============================================================================
// system_settings
// ============================================================================

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SystemSettingRecord {
    pub key: String,
    pub value: String,
    pub description: String,
    pub updated_at: Option<i64>,
}

// ============================================================================
// usage summary (query result, not a table)
// ============================================================================

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct UsageSummaryRow {
    /// 分组键，按 hour 时格式为 "2026-03-24T15"，按 model 时为模型名
    pub group_key: String,
    pub input_tokens: i64,
    pub output_tokens: i64,
    pub cached_tokens: i64,
    pub cache_write_tokens: i64,
    pub total_cost: f64,
    pub total_requests: i64,
    pub error_requests: i64,
}
