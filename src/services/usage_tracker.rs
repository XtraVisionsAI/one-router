//! Usage tracking service
//!
//! Modified to use the `UsageStore` trait instead of DynamoDB directly.

use crate::database::models::UsageRecord;
use crate::database::traits::DatabaseService;
use crate::middleware::auth::ApiKeyInfo;
use crate::schemas::anthropic::Usage;
use chrono::Utc;
use std::sync::Arc;

fn get_tier_multiplier(tier: &str) -> f64 {
    match tier.to_lowercase().as_str() {
        "flex" => 0.5,
        "priority" => 1.75,
        "master" => 0.0,
        _ => 1.0,
    }
}

/// Service for tracking API usage statistics.
#[derive(Clone)]
pub struct UsageTracker {
    storage: Arc<dyn DatabaseService>,
}

impl UsageTracker {
    pub fn new(storage: Arc<dyn DatabaseService>) -> Self {
        Self { storage }
    }

    /// Record usage for a completed request.
    ///
    /// Returns `Ok(true)` if budget was exceeded and the key was deactivated.
    pub async fn record_usage(
        &self,
        key_info: &ApiKeyInfo,
        request_id: &str,
        model: &str,
        usage: &Usage,
        success: bool,
    ) -> Result<bool, UsageError> {
        let timestamp = Utc::now();

        if key_info.is_master {
            return Ok(false);
        }

        let record = UsageRecord {
            id: None,
            api_key: key_info.api_key.clone(),
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
            cost: 0.0, // Will be calculated below
            success,
            duration_ms: None,
            error_message: None,
        };

        self.storage
            .usage()
            .record_usage(&record)
            .await
            .map_err(|e| UsageError::Database(e.to_string()))?;

        let cost = self.calculate_cost(model, usage, &key_info.service_tier);

        if cost > 0.0 {
            let budget_exceeded = self
                .storage
                .api_keys()
                .increment_budget_used(&key_info.api_key, cost)
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

    fn calculate_cost(&self, _model: &str, usage: &Usage, service_tier: &str) -> f64 {
        const INPUT_PRICE_PER_MILLION: f64 = 3.0;
        const OUTPUT_PRICE_PER_MILLION: f64 = 15.0;
        const CACHE_READ_PRICE_PER_MILLION: f64 = 0.30;
        const CACHE_WRITE_PRICE_PER_MILLION: f64 = 3.75;

        let input_cost = (usage.input_tokens as f64) * INPUT_PRICE_PER_MILLION / 1_000_000.0;
        let output_cost = (usage.output_tokens as f64) * OUTPUT_PRICE_PER_MILLION / 1_000_000.0;

        let cache_read_cost = usage
            .cache_read_input_tokens
            .map(|t| (t as f64) * CACHE_READ_PRICE_PER_MILLION / 1_000_000.0)
            .unwrap_or(0.0);

        let cache_write_cost = usage
            .cache_creation_input_tokens
            .map(|t| (t as f64) * CACHE_WRITE_PRICE_PER_MILLION / 1_000_000.0)
            .unwrap_or(0.0);

        let base_cost = input_cost + output_cost + cache_read_cost + cache_write_cost;
        let multiplier = get_tier_multiplier(service_tier);
        base_cost * multiplier
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
    fn test_tier_multiplier() {
        assert_eq!(get_tier_multiplier("default"), 1.0);
        assert_eq!(get_tier_multiplier("flex"), 0.5);
        assert_eq!(get_tier_multiplier("priority"), 1.75);
        assert_eq!(get_tier_multiplier("master"), 0.0);
    }
}
