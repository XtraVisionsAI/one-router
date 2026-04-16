//! Usage tracking service
//!
//! Modified to use the `UsageStore` trait instead of DynamoDB directly.

use crate::database::models::UsageRecord;
use crate::database::traits::DatabaseService;
use crate::middleware::auth::ApiKeyInfo;
use crate::schemas::anthropic::Usage;
use crate::services::model_mapping::ModelMappingService;
use chrono::Utc;
use std::sync::Arc;

fn is_new_month(stored_month: Option<&str>, current_month: &str) -> bool {
    stored_month.map(|m| m != current_month).unwrap_or(true)
}

/// Default pricing fallback (per million tokens) when model pricing is not configured.
const DEFAULT_INPUT_PRICE: f64 = 3.0;
const DEFAULT_OUTPUT_PRICE: f64 = 15.0;
const DEFAULT_CACHE_READ_PRICE: f64 = 0.30;
const DEFAULT_CACHE_WRITE_PRICE: f64 = 3.75;

/// Service for tracking API usage statistics.
#[derive(Clone)]
pub struct UsageTracker {
    storage: Arc<dyn DatabaseService>,
    model_mapping: Arc<ModelMappingService>,
}

impl UsageTracker {
    pub fn new(storage: Arc<dyn DatabaseService>, model_mapping: Arc<ModelMappingService>) -> Self {
        Self {
            storage,
            model_mapping,
        }
    }

    /// Record usage for a completed request.
    ///
    /// Returns `Ok(true)` if budget was exceeded and the key was deactivated.
    #[allow(clippy::too_many_arguments)]
    pub async fn record_usage(
        &self,
        key_info: &ApiKeyInfo,
        request_id: &str,
        model: &str,
        usage: &Usage,
        success: bool,
        provider: &str,
        protocol: &str,
    ) -> Result<bool, UsageError> {
        let timestamp = Utc::now();

        // Internal keys (master/ephemeral) have no DB entry — skip budget management
        let is_internal_key = key_info.raw_api_key.is_empty();

        if !is_internal_key {
            let current_month = chrono::Utc::now().format("%Y-%m").to_string();
            if is_new_month(key_info.budget_mtd_month.as_deref(), &current_month) {
                let prev_month = key_info.budget_mtd_month.as_deref().unwrap_or("");
                let prev_mtd = key_info.budget_used_mtd;
                self.storage
                    .api_keys()
                    .reset_monthly_budget(
                        &key_info.raw_api_key,
                        &current_month,
                        prev_month,
                        prev_mtd,
                    )
                    .await
                    .map_err(|e| UsageError::Database(e.to_string()))?;
                if key_info.is_budget_exceeded() {
                    self.storage
                        .api_keys()
                        .reactivate_api_key(&key_info.raw_api_key)
                        .await
                        .map_err(|e| UsageError::Database(e.to_string()))?;
                    tracing::info!(api_key = %key_info.api_key, month = %current_month, "Budget key reactivated for new month");
                }
            }
        }

        let record_api_key = if is_internal_key {
            if key_info.is_master {
                "__master__"
            } else {
                "__ephemeral__"
            }
        } else {
            &key_info.raw_api_key
        };

        let mut record = UsageRecord {
            id: None,
            api_key: record_api_key.to_string(),
            timestamp: timestamp.to_rfc3339(),
            request_id: request_id.to_string(),
            model: model.to_string(),
            input_tokens: usage.input_tokens as i64,
            output_tokens: usage.output_tokens as i64,
            cached_tokens: usage.cache_read_input_tokens.map(|t| t as i64).unwrap_or(0),
            cache_write_tokens: usage
                .cache_creation_input_tokens
                .map(|t| t as i64)
                .unwrap_or(0),
            cost: 0.0, // set below after calculation
            success,
            duration_ms: None,
            error_message: None,
            provider: Some(provider.to_string()),
            protocol: Some(protocol.to_string()),
        };

        let cost = self.calculate_cost(model, usage, key_info.cost_rate).await;
        record.cost = cost;

        self.storage
            .usage()
            .record_usage(&record)
            .await
            .map_err(|e| UsageError::Database(e.to_string()))?;

        if !is_internal_key && cost > 0.0 {
            let budget_exceeded = self
                .storage
                .api_keys()
                .increment_budget_used(&key_info.raw_api_key, cost)
                .await
                .map_err(|e| UsageError::Database(e.to_string()))?;

            if budget_exceeded {
                tracing::warn!(
                    api_key = %key_info.api_key,
                    cost = cost,
                    "Budget exceeded, key deactivated"
                );
            }

            return Ok(budget_exceeded);
        }

        Ok(false)
    }

    async fn calculate_cost(&self, model: &str, usage: &Usage, cost_rate: f64) -> f64 {
        let (input_price, output_price, cache_read_price, cache_write_price) =
            match self.model_mapping.get_pricing(model).await {
                Some(prices) if prices.0 > 0.0 || prices.1 > 0.0 => prices,
                _ => (
                    DEFAULT_INPUT_PRICE,
                    DEFAULT_OUTPUT_PRICE,
                    DEFAULT_CACHE_READ_PRICE,
                    DEFAULT_CACHE_WRITE_PRICE,
                ),
            };

        let input_cost = (usage.input_tokens as f64) * input_price / 1_000_000.0;
        let output_cost = (usage.output_tokens as f64) * output_price / 1_000_000.0;

        let cache_read_cost = usage
            .cache_read_input_tokens
            .map(|t| (t as f64) * cache_read_price / 1_000_000.0)
            .unwrap_or(0.0);

        let cache_write_cost = usage
            .cache_creation_input_tokens
            .map(|t| (t as f64) * cache_write_price / 1_000_000.0)
            .unwrap_or(0.0);

        let base_cost = input_cost + output_cost + cache_read_cost + cache_write_cost;
        base_cost * cost_rate
    }
}

#[derive(Debug, Clone, Default)]
pub struct UsageStats {
    pub total_requests: u64,
    pub successful_requests: u64,
    pub total_input_tokens: i64,
    pub total_output_tokens: i64,
    pub total_cached_tokens: i64,
    pub total_cache_write_tokens: i64,
}

#[derive(Debug, thiserror::Error)]
pub enum UsageError {
    #[error("Database error: {0}")]
    Database(String),

    #[error("API key not found")]
    ApiKeyNotFound,

    #[error("Invalid usage data: {0}")]
    InvalidData(String),
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_is_new_month() {
        assert!(is_new_month(Some("2026-02"), "2026-03"));
        assert!(!is_new_month(Some("2026-03"), "2026-03"));
        assert!(is_new_month(None, "2026-03"));
    }
}
