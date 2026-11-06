//! Usage tracking service
//!
//! Modified to use the `UsageStore` trait instead of DynamoDB directly.

use crate::database::models::{BudgetLayer, SpendAfter, UsageRecord};
use crate::database::traits::DatabaseService;
use crate::middleware::auth::ApiKeyInfo;
use crate::middleware::rate_limit::{team_bucket, user_bucket, TokenRateLimiter};
use crate::schemas::anthropic::Usage;
use crate::services::budget_alerts::{self, BudgetAlert, BudgetAlertConfig};
use crate::services::model_mapping::ModelMappingService;
use crate::services::precharge::{PrechargeConfig, Settlement};
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

/// Multiplier applied to the base input price for 1-hour cache writes.
/// Anthropic prices a 1h cache write at 2× the base input token rate
/// (vs. ~1.25× for the default 5-minute TTL).
const CACHE_WRITE_1H_MULTIPLIER: f64 = 2.0;

/// Resolve the per-token cache-write price given the effective TTL.
/// 1-hour writes are priced at 2× the base input rate; every other TTL
/// (5-minute default, unknown, or none) uses the model's stored write price.
fn cache_write_price_for_ttl(
    input_price: f64,
    stored_write_price: f64,
    cache_ttl: Option<&str>,
) -> f64 {
    if cache_ttl == Some("1h") {
        input_price * CACHE_WRITE_1H_MULTIPLIER
    } else {
        stored_write_price
    }
}

/// Service for tracking API usage statistics.
#[derive(Clone)]
pub struct UsageTracker {
    storage: Arc<dyn DatabaseService>,
    model_mapping: Arc<ModelMappingService>,
    /// TPM meter shared with the rate-limit middleware.
    token_limiter: Arc<TokenRateLimiter>,
    /// Budget alert thresholds / webhook (hot-reloaded via `set_alert_config`).
    alerts: Arc<std::sync::RwLock<BudgetAlertConfig>>,
    /// Budget precharge mode (hot-reloaded via `set_precharge_config`).
    precharge: Arc<std::sync::RwLock<PrechargeConfig>>,
    http: Arc<reqwest::Client>,
}

/// One budget-carrying layer of a caller, as seen by the tracker.
struct LayerRef<'a> {
    layer: BudgetLayer,
    /// Storage id (key hash / user_id / team_id).
    store_id: &'a str,
    /// Id for alerts (key_id / user_id / team_id — never the key hash).
    public_id: &'a str,
    name: &'a str,
    period: String,
}

impl UsageTracker {
    pub fn new(storage: Arc<dyn DatabaseService>, model_mapping: Arc<ModelMappingService>) -> Self {
        let token_limiter = Arc::new(TokenRateLimiter::new());
        token_limiter.set_store(storage.clone());
        Self {
            storage,
            model_mapping,
            token_limiter,
            alerts: Arc::new(std::sync::RwLock::new(BudgetAlertConfig::default())),
            precharge: Arc::new(std::sync::RwLock::new(PrechargeConfig::default())),
            http: Arc::new(reqwest::Client::new()),
        }
    }

    /// The TPM meter fed by [`record_usage`](Self::record_usage); the rate-limit
    /// middleware checks against the same instance.
    pub fn token_limiter(&self) -> Arc<TokenRateLimiter> {
        self.token_limiter.clone()
    }

    pub fn set_alert_config(&self, cfg: BudgetAlertConfig) {
        *self.alerts.write().unwrap_or_else(|e| e.into_inner()) = cfg;
    }

    fn alert_config(&self) -> BudgetAlertConfig {
        self.alerts
            .read()
            .unwrap_or_else(|e| e.into_inner())
            .clone()
    }

    pub fn set_precharge_config(&self, cfg: PrechargeConfig) {
        *self.precharge.write().unwrap_or_else(|e| e.into_inner()) = cfg;
    }

    pub fn precharge_config(&self) -> PrechargeConfig {
        *self.precharge.read().unwrap_or_else(|e| e.into_inner())
    }

    /// The caller's budget layers at `now` (team, user, key).
    fn layers<'a>(key_info: &'a ApiKeyInfo, now: chrono::DateTime<Utc>) -> Vec<LayerRef<'a>> {
        let mut out = Vec::new();
        if key_info.raw_api_key.is_empty() {
            return out; // master / ephemeral: no budgets
        }
        if let Some(t) = &key_info.team {
            out.push(LayerRef {
                layer: BudgetLayer::Team,
                store_id: &t.team_id,
                public_id: &t.team_id,
                name: &t.name,
                period: t.budget_period.key_at(now),
            });
        }
        if let Some(u) = &key_info.user {
            out.push(LayerRef {
                layer: BudgetLayer::User,
                store_id: &u.user_id,
                public_id: &u.user_id,
                name: &u.name,
                period: u.budget_period.key_at(now),
            });
        }
        out.push(LayerRef {
            layer: BudgetLayer::Key,
            store_id: &key_info.raw_api_key,
            public_id: &key_info.key_id,
            name: &key_info.key_name,
            period: key_info.budget_period.key_at(now),
        });
        out
    }

    /// Lazily reset every layer whose stored period is stale, and reflect the
    /// reset in `key_info` (so a later rollover check is a no-op).
    pub async fn roll_periods(&self, key_info: &mut ApiKeyInfo) -> Result<(), UsageError> {
        if key_info.raw_api_key.is_empty() {
            return Ok(());
        }
        let now = Utc::now();
        let db = |e: anyhow::Error| UsageError::Database(e.to_string());

        let key_period = key_info.budget_period.key_at(now);
        if is_new_month(key_info.budget_mtd_month.as_deref(), &key_period) {
            self.storage
                .api_keys()
                .reset_monthly_budget(
                    &key_info.raw_api_key,
                    &key_period,
                    key_info.budget_mtd_month.as_deref().unwrap_or(""),
                    key_info.budget_used_mtd,
                )
                .await
                .map_err(db)?;
            key_info.budget_mtd_month = Some(key_period);
            key_info.budget_used_mtd = 0.0;
        }
        if let Some(u) = key_info.user.as_mut() {
            let period = u.budget_period.key_at(now);
            if is_new_month(u.budget_mtd_month.as_deref(), &period) {
                self.storage
                    .users()
                    .reset_user_monthly_budget(
                        &u.user_id,
                        &period,
                        u.budget_mtd_month.as_deref().unwrap_or(""),
                        u.budget_used_mtd,
                    )
                    .await
                    .map_err(db)?;
                u.budget_mtd_month = Some(period);
                u.budget_used_mtd = 0.0;
            }
        }
        if let Some(t) = key_info.team.as_mut() {
            let period = t.budget_period.key_at(now);
            if is_new_month(t.budget_mtd_month.as_deref(), &period) {
                self.storage
                    .teams()
                    .reset_team_monthly_budget(
                        &t.team_id,
                        &period,
                        t.budget_mtd_month.as_deref().unwrap_or(""),
                        t.budget_used_mtd,
                    )
                    .await
                    .map_err(db)?;
                t.budget_mtd_month = Some(period);
                t.budget_used_mtd = 0.0;
            }
        }
        Ok(())
    }

    /// Add `delta` (may be negative) to one layer's spend counters.
    pub async fn adjust_layer(
        &self,
        layer: BudgetLayer,
        store_id: &str,
        delta: f64,
    ) -> Result<SpendAfter, UsageError> {
        let r = match layer {
            BudgetLayer::Key => {
                self.storage
                    .api_keys()
                    .increment_budget_used(store_id, delta)
                    .await
            }
            BudgetLayer::User => {
                self.storage
                    .users()
                    .increment_user_budget_used(store_id, delta)
                    .await
            }
            BudgetLayer::Team => {
                self.storage
                    .teams()
                    .increment_team_budget_used(store_id, delta)
                    .await
            }
        };
        r.map_err(|e| UsageError::Database(e.to_string()))
    }

    /// Estimated cost of `input` + `output` tokens on `model` (precharge).
    pub async fn estimate_cost(&self, model: &str, input: u64, output: u64, cost_rate: f64) -> f64 {
        let usage = Usage::new(
            input.min(i32::MAX as u64) as i32,
            output.min(i32::MAX as u64) as i32,
        );
        self.calculate_cost(model, &usage, cost_rate, None).await
    }

    /// Claim and emit alerts for thresholds this spend crossed.
    async fn check_alerts(&self, l: &LayerRef<'_>, spend: SpendAfter, delta: f64) {
        let Some(budget) = spend.budget else { return };
        let cfg = self.alert_config();
        for threshold in budget_alerts::crossed(&cfg.thresholds, budget, spend.used, delta) {
            let claimed = match l.layer {
                BudgetLayer::Team => {
                    self.storage
                        .teams()
                        .claim_team_budget_alert(l.store_id, &l.period, threshold)
                        .await
                }
                BudgetLayer::User => {
                    self.storage
                        .users()
                        .claim_user_budget_alert(l.store_id, &l.period, threshold)
                        .await
                }
                BudgetLayer::Key => {
                    self.storage
                        .api_keys()
                        .claim_budget_alert(l.store_id, &l.period, threshold)
                        .await
                }
            };
            match claimed {
                Ok(true) => budget_alerts::emit(
                    BudgetAlert {
                        scope: l.layer.as_str(),
                        id: l.public_id.to_string(),
                        name: l.name.to_string(),
                        budget,
                        used: spend.used,
                        threshold,
                        period: l.period.clone(),
                    },
                    cfg.webhook_url.clone(),
                    self.http.clone(),
                ),
                Ok(false) => {} // another request / instance already sent it
                Err(e) => {
                    tracing::warn!(error = %e, scope = l.layer.as_str(), "Failed to claim budget alert")
                }
            }
        }
    }

    /// Apply `amount_for(layer)` to every layer, evaluating alerts with
    /// `alert_delta`. Returns whether any layer's budget is now reached.
    async fn charge_layers(
        &self,
        key_info: &ApiKeyInfo,
        amount_for: impl Fn(BudgetLayer) -> f64,
        alert_delta: f64,
    ) -> Result<bool, UsageError> {
        let mut exceeded = false;
        for l in Self::layers(key_info, Utc::now()) {
            let amount = amount_for(l.layer);
            if amount == 0.0 {
                continue;
            }
            let spend = self.adjust_layer(l.layer, l.store_id, amount).await?;
            self.check_alerts(&l, spend, alert_delta).await;
            exceeded |= spend.exceeded();
        }
        Ok(exceeded)
    }

    /// Settle a precharged request: each layer gets `actual - reserved`.
    pub async fn settle(&self, key_info: &ApiKeyInfo, settlement: &Settlement) {
        let actual = settlement.actual();
        let result = self
            .charge_layers(
                key_info,
                |layer| actual - settlement.reserved_for(layer),
                actual,
            )
            .await;
        match result {
            Ok(_) => crate::observability::metrics::record_precharge("settled"),
            Err(e) => tracing::error!(error = %e, "Failed to settle budget precharge"),
        }
    }

    /// Record usage for a completed request.
    ///
    /// Returns `Ok(true)` if a budget layer was reached by this request.
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
        cache_ttl: Option<&str>,
    ) -> Result<bool, UsageError> {
        let timestamp = Utc::now();
        let is_internal_key = key_info.raw_api_key.is_empty();

        if !is_internal_key && key_info.settlement.is_none() {
            // Lazy period rollover, per layer (precharged requests already rolled).
            let mut rolled = key_info.clone();
            self.roll_periods(&mut rolled).await?;
        }

        // TPM metering (only buckets with a limit; cache reads don't count,
        // matching Anthropic's ITPM accounting).
        let tokens: u64 = [
            usage.input_tokens,
            usage.output_tokens,
            usage.cache_creation_input_tokens.unwrap_or(0),
        ]
        .iter()
        .map(|t| (*t).max(0) as u64)
        .sum();
        if key_info.tpm_limit.is_some() {
            self.token_limiter.record(&key_info.key_id, tokens).await;
        }
        if let Some(user) = key_info.user.as_ref().filter(|u| u.tpm_limit.is_some()) {
            self.token_limiter
                .record(&user_bucket(&user.user_id), tokens)
                .await;
        }
        if let Some(team) = key_info.team.as_ref().filter(|t| t.tpm_limit.is_some()) {
            self.token_limiter
                .record(&team_bucket(&team.team_id), tokens)
                .await;
        }

        let mut record = UsageRecord {
            id: None,
            api_key: key_info.usage_api_key().to_string(),
            key_id: Some(key_info.key_id.clone()),
            user_id: key_info.user_id().map(String::from),
            team_id: key_info.team.as_ref().map(|t| t.team_id.clone()),
            tags: (!key_info.tags.is_empty()).then(|| key_info.tags.join(",")),
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

        let cost = self
            .calculate_cost(model, usage, key_info.cost_rate, cache_ttl)
            .await;
        record.cost = cost;

        // Prometheus metrics — bounded labels only (provider/protocol/model),
        // never the API key. See `observability::metrics`.
        crate::observability::metrics::record_request(provider, protocol, success);
        crate::observability::metrics::record_tokens(
            provider,
            model,
            record.input_tokens,
            record.output_tokens,
            record.cached_tokens,
            record.cache_write_tokens,
        );
        crate::observability::metrics::record_cost(provider, model, cost);

        self.storage
            .usage()
            .record_usage(&record)
            .await
            .map_err(|e| UsageError::Database(e.to_string()))?;

        if is_internal_key || cost <= 0.0 {
            return Ok(false);
        }
        if let Some(settlement) = &key_info.settlement {
            // Precharged: the middleware settles when the response completes.
            settlement.add_actual(cost);
            return Ok(false);
        }
        // Independent atomic increments per layer; a failure on one is
        // reported but does not undo the others.
        let exceeded = self.charge_layers(key_info, |_| cost, cost).await?;
        if exceeded {
            tracing::warn!(
                api_key = %key_info.api_key,
                user = key_info.user.as_ref().map(|u| u.name.as_str()).unwrap_or("-"),
                cost = cost,
                "Budget reached; further requests will be rejected"
            );
        }
        Ok(exceeded)
    }

    /// Compute the cost for a request.
    ///
    /// Pricing is keyed on `model` — the **source model id the client sent**
    /// (`request.model`), looked up in its `model_mappings` row. Consequences:
    ///
    /// - **Failover**: a request that failed over to a backup provider/model is
    ///   still billed at the *requested* model's rate (the backup's backend id
    ///   has no source mapping row of its own). This is intentional — the client
    ///   is charged for the model it asked for, regardless of which backend
    ///   served it.
    /// - **Application inference-profile ARN sent as the model**: priced from
    ///   that ARN's mapping row if it has prices; otherwise the DEFAULT_* rates
    ///   apply. The underlying foundation model resolved for routing is **not**
    ///   used to derive pricing — set prices on the ARN's mapping row for
    ///   accurate billing.
    async fn calculate_cost(
        &self,
        model: &str,
        usage: &Usage,
        cost_rate: f64,
        cache_ttl: Option<&str>,
    ) -> f64 {
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

        // 1-hour cache writes are priced at 2× the base input rate; the default
        // (5-minute) TTL uses the model's stored cache-write price (~1.25× input).
        let effective_write_price =
            cache_write_price_for_ttl(input_price, cache_write_price, cache_ttl);
        let cache_write_cost = usage
            .cache_creation_input_tokens
            .map(|t| (t as f64) * effective_write_price / 1_000_000.0)
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

    #[test]
    fn test_cache_write_price_for_ttl() {
        // 1h → 2× input price, regardless of stored write price.
        assert_eq!(cache_write_price_for_ttl(3.0, 3.75, Some("1h")), 6.0);
        // 5m / unknown / none → stored write price.
        assert_eq!(cache_write_price_for_ttl(3.0, 3.75, Some("5m")), 3.75);
        assert_eq!(cache_write_price_for_ttl(3.0, 3.75, None), 3.75);
        assert_eq!(
            cache_write_price_for_ttl(3.0, 3.75, Some("passthrough")),
            3.75
        );
    }
}
