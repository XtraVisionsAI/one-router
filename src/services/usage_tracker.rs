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
            // Webhook URL is admin-supplied: guarded DNS, no proxy, no redirects.
            http: Arc::new(
                crate::services::web_tools::ssrf::guarded_client(
                    std::time::Duration::from_secs(5),
                    "one-router-budget-alerts",
                )
                .unwrap_or_default(),
            ),
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

    /// Bring a precharged request's counters in line with its settlement
    /// ledger (see [`Settlement::plan`]). Called once when the request settles
    /// and again for every cost reported after that, so neither ordering of
    /// "body ended" and "usage recorded" can lose cost.
    pub async fn flush_settlement(&self, key_info: &ApiKeyInfo, settlement: &Settlement) {
        let layers = Self::layers(key_info, Utc::now());
        let current: Vec<(BudgetLayer, String)> =
            layers.iter().map(|l| (l.layer, l.period.clone())).collect();
        let (adjustments, alert_delta) = settlement.plan(&current);
        for l in &layers {
            let Some(adj) = adjustments.iter().find(|a| a.layer == l.layer) else {
                continue;
            };
            match self.adjust_layer(l.layer, l.store_id, adj.delta).await {
                Ok(spend) => self.check_alerts(l, spend, alert_delta).await,
                Err(e) => tracing::error!(
                    error = %e,
                    layer = l.layer.as_str(),
                    delta = adj.delta,
                    "Failed to settle budget precharge"
                ),
            }
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
        self.record_usage_priced(
            key_info,
            request_id,
            model,
            usage,
            success,
            provider,
            protocol,
            cache_ttl,
            DefaultPricing::Fallback,
        )
        .await
    }

    /// Record a successful request's usage from a background task (the
    /// response is not delayed; a precharge settlement waits for the report).
    #[allow(clippy::too_many_arguments)]
    pub fn spawn_record_usage(
        self: &Arc<Self>,
        key_info: ApiKeyInfo,
        request_id: String,
        model: String,
        usage: Usage,
        provider: String,
        protocol: &'static str,
        default_pricing: DefaultPricing,
    ) {
        let tracker = self.clone();
        tokio::spawn(async move {
            if let Err(e) = tracker
                .record_usage_priced(
                    &key_info,
                    &request_id,
                    &model,
                    &usage,
                    true,
                    &provider,
                    protocol,
                    None,
                    default_pricing,
                )
                .await
            {
                tracing::warn!(error = %e, request_id = %request_id, "Failed to record usage");
            }
        });
    }

    /// [`record_usage`](Self::record_usage) with an explicit fallback for
    /// models whose mapping carries no prices. Token-priced endpoints (chat,
    /// embeddings) use the DEFAULT_* rates; non-token endpoints (images,
    /// rerank) pass [`DefaultPricing::None`] so an unpriced mapping costs 0.
    #[allow(clippy::too_many_arguments)]
    pub async fn record_usage_priced(
        &self,
        key_info: &ApiKeyInfo,
        request_id: &str,
        model: &str,
        usage: &Usage,
        success: bool,
        provider: &str,
        protocol: &str,
        cache_ttl: Option<&str>,
        default_pricing: DefaultPricing,
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
            .calculate_cost_with(model, usage, key_info.cost_rate, cache_ttl, default_pricing)
            .await;
        record.cost = cost;

        // Precharged: report the cost before anything else can fail. If the
        // request already settled (non-streaming handlers record from a
        // spawned task that may finish after the body), charge it here.
        if let Some(settlement) = &key_info.settlement {
            if settlement.report(cost) {
                self.flush_settlement(key_info, settlement).await;
            }
        }

        // Prometheus metrics — bounded labels only (provider/protocol/model),
        // never the API key. See `observability::metrics`.
        // `model` label = the mapping's admin-configured target id (the
        // client string is unbounded under wildcard mappings); unmapped → other.
        let metric_model = self
            .model_mapping
            .resolve(model)
            .await
            .map(|r| r.target_model_id)
            .unwrap_or_else(|_| crate::observability::metrics::OTHER_MODEL.to_string());
        crate::observability::metrics::record_request(provider, protocol, success);
        crate::observability::metrics::record_tokens(
            provider,
            &metric_model,
            record.input_tokens,
            record.output_tokens,
            record.cached_tokens,
            record.cache_write_tokens,
        );
        crate::observability::metrics::record_cost(provider, &metric_model, cost);

        // A failed usage-row insert must not make the request free: charge the
        // budget counters first, report the insert error afterwards.
        let inserted = self
            .storage
            .usage()
            .record_usage(&record)
            .await
            .map_err(|e| UsageError::Database(e.to_string()));

        if is_internal_key || cost <= 0.0 || key_info.settlement.is_some() {
            return inserted.map(|_| false);
        }
        // Independent atomic increments per layer; a failure on one is
        // reported but does not undo the others.
        let exceeded = self.charge_layers(key_info, |_| cost, cost).await?;
        inserted?;
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
        self.calculate_cost_with(model, usage, cost_rate, cache_ttl, DefaultPricing::Fallback)
            .await
    }

    async fn calculate_cost_with(
        &self,
        model: &str,
        usage: &Usage,
        cost_rate: f64,
        cache_ttl: Option<&str>,
        default_pricing: DefaultPricing,
    ) -> f64 {
        let (input_price, output_price, cache_read_price, cache_write_price) =
            match self.model_mapping.get_pricing(model).await {
                Some(prices) if prices.0 > 0.0 || prices.1 > 0.0 => prices,
                _ if default_pricing == DefaultPricing::None => return 0.0,
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

/// Price fallback when a model's mapping carries no prices.
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum DefaultPricing {
    /// DEFAULT_* per-token rates (chat, embeddings).
    Fallback,
    /// Cost 0 (images, rerank — not token-priced; set mapping prices to bill).
    None,
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

/// Test fixture: a file-backed SQLite store with one budgeted user and its key.
#[cfg(test)]
pub(crate) mod test_support {
    use super::*;
    use crate::database::models::{ApiKeyRecord, BudgetPeriod, UserRecord};
    use crate::database::seed::SeedMode;

    pub struct Fixture {
        pub db: Arc<dyn DatabaseService>,
        pub tracker: Arc<UsageTracker>,
        pub key_info: ApiKeyInfo,
        pub user_id: String,
        pub key_hash: String,
    }

    impl Fixture {
        pub async fn user_spend(&self) -> f64 {
            self.db
                .users()
                .get_user(&self.user_id)
                .await
                .unwrap()
                .unwrap()
                .budget_used_mtd
        }

        pub async fn key_spend(&self) -> f64 {
            self.db
                .api_keys()
                .get_api_key(&self.key_hash)
                .await
                .unwrap()
                .unwrap()
                .budget_used_mtd
        }
    }

    pub async fn fixture(user_budget: f64) -> Fixture {
        let path = std::env::temp_dir().join(format!(
            "one-router-test-{}.db",
            uuid::Uuid::new_v4().simple()
        ));
        let db = crate::database::create_database(&format!("sqlite://{}", path.display()))
            .await
            .unwrap();
        db.initialize(None, SeedMode::Off).await.unwrap();
        let mapping = Arc::new(ModelMappingService::new(db.clone()));
        let tracker = Arc::new(UsageTracker::new(db.clone(), mapping));

        let period = BudgetPeriod::Monthly.key_at(Utc::now());
        let mut user = UserRecord::new("billing-user", 0);
        user.monthly_budget = Some(user_budget);
        user.budget_mtd_month = Some(period.clone());
        db.users().create_user(&user).await.unwrap();

        let key_hash = format!("hash-{}", uuid::Uuid::new_v4().simple());
        let key = ApiKeyRecord {
            api_key: key_hash.clone(),
            key_id: crate::database::models::new_key_id(),
            key_display: "sk-or-••••0000".into(),
            name: "k".into(),
            is_active: true,
            rate_limit: 0,
            cost_rate: 1.0,
            monthly_budget: None,
            budget_used: 0.0,
            budget_used_mtd: 0.0,
            budget_mtd_month: Some(period),
            deactivated_reason: None,
            budget_history: None,
            tpm_limit: None,
            cache_ttl: None,
            metadata: None,
            user_id: user.user_id.clone(),
            expires_at: None,
            allowed_models: None,
            allowed_cidrs: None,
            budget_period: BudgetPeriod::Monthly,
            budget_alerts_sent: None,
            default_tags: None,
            last_used_at: None,
            rotated_to: None,
            max_concurrency: None,
            created_at: 0,
            updated_at: None,
        };
        db.api_keys().create_api_key(&key).await.unwrap();
        let key_info = ApiKeyInfo::from_db_record(&key, Some(&user), None);
        Fixture {
            db,
            tracker,
            key_info,
            user_id: user.user_id,
            key_hash,
        }
    }
}

#[cfg(test)]
mod settlement_tests {
    use super::test_support::fixture;
    use super::*;
    use crate::services::precharge::{settle_after_report, Reservation, Settlement};
    use std::time::Duration;

    /// 1M input tokens on an unpriced model = DEFAULT_INPUT_PRICE ($3).
    fn usage_costing_3() -> Usage {
        Usage::new(1_000_000, 0)
    }

    fn approx(a: f64, b: f64) -> bool {
        (a - b).abs() < 1e-9
    }

    /// Reserve `amount` on the fixture user in `period`, as the middleware does.
    async fn reserve(
        f: &super::test_support::Fixture,
        amount: f64,
        period: &str,
    ) -> Arc<Settlement> {
        assert!(f
            .db
            .budgets()
            .reserve_budget(BudgetLayer::User, &f.user_id, amount, 100.0)
            .await
            .unwrap());
        Arc::new(Settlement::new(vec![Reservation {
            layer: BudgetLayer::User,
            id: f.user_id.clone(),
            amount,
            period: period.to_string(),
        }]))
    }

    async fn record(f: &super::test_support::Fixture, key: &ApiKeyInfo) {
        f.tracker
            .record_usage(
                key,
                "req",
                "unpriced-model",
                &usage_costing_3(),
                true,
                "bedrock",
                "anthropic",
                None,
            )
            .await
            .unwrap();
    }

    fn current_period() -> String {
        crate::database::models::BudgetPeriod::Monthly.key_at(Utc::now())
    }

    #[tokio::test]
    async fn usage_reported_before_body_end_settles_to_actual() {
        let f = fixture(100.0).await;
        let s = reserve(&f, 5.0, &current_period()).await;
        let mut key = f.key_info.clone();
        key.settlement = Some(s.clone());

        record(&f, &key).await; // streaming: usage recorded inside the body
        assert!(approx(f.user_spend().await, 5.0)); // still reserved
        settle_after_report(&f.tracker, &key, &s, true, Duration::from_secs(1)).await;

        assert!(approx(f.user_spend().await, 3.0));
        assert!(approx(f.key_spend().await, 3.0));
    }

    #[tokio::test]
    async fn usage_reported_after_body_end_is_not_lost() {
        // The original race: a non-streaming handler spawns record_usage and
        // returns; the body ends before the cost is known.
        let f = fixture(100.0).await;
        let s = reserve(&f, 5.0, &current_period()).await;
        let mut key = f.key_info.clone();
        key.settlement = Some(s.clone());

        let settle = {
            let (tracker, key, s) = (f.tracker.clone(), key.clone(), s.clone());
            tokio::spawn(async move {
                settle_after_report(&tracker, &key, &s, true, Duration::from_secs(5)).await
            })
        };
        tokio::time::sleep(Duration::from_millis(50)).await;
        assert!(approx(f.user_spend().await, 5.0)); // waiting, not refunded
        record(&f, &key).await;
        settle.await.unwrap();

        assert!(approx(f.user_spend().await, 3.0));
        assert!(approx(f.key_spend().await, 3.0));
    }

    #[tokio::test]
    async fn report_after_settle_timeout_charges_directly() {
        let f = fixture(100.0).await;
        let s = reserve(&f, 5.0, &current_period()).await;
        let mut key = f.key_info.clone();
        key.settlement = Some(s.clone());

        // No report within the timeout: the reservation is kept, not refunded.
        settle_after_report(&f.tracker, &key, &s, true, Duration::from_millis(10)).await;
        assert!(approx(f.user_spend().await, 5.0));
        assert!(approx(f.key_spend().await, 0.0));

        // The late report corrects every layer to the actual cost.
        record(&f, &key).await;
        assert!(approx(f.user_spend().await, 3.0));
        assert!(approx(f.key_spend().await, 3.0));
    }

    #[tokio::test]
    async fn error_response_refunds_reservation() {
        let f = fixture(100.0).await;
        let s = reserve(&f, 5.0, &current_period()).await;
        let mut key = f.key_info.clone();
        key.settlement = Some(s.clone());
        settle_after_report(&f.tracker, &key, &s, false, Duration::from_secs(5)).await;
        assert!(approx(f.user_spend().await, 0.0));
    }

    #[tokio::test]
    async fn period_rollover_does_not_refund_into_new_period() {
        let f = fixture(100.0).await;
        // Reserved in an earlier period, which has since been rolled over.
        let s = reserve(&f, 5.0, "2000-01").await;
        f.db.users()
            .reset_user_monthly_budget(&f.user_id, &current_period(), "2000-01", 5.0)
            .await
            .unwrap();
        assert!(approx(f.user_spend().await, 0.0));
        let mut key = f.key_info.clone();
        key.settlement = Some(s.clone());

        record(&f, &key).await; // actual 3 < reserved 5
        settle_after_report(&f.tracker, &key, &s, true, Duration::from_secs(1)).await;

        // The -2 refund belonged to the old period: skipped, not applied to
        // the new period's counter (which would go negative / hide spend).
        assert!(approx(f.user_spend().await, 0.0));
        assert!(approx(f.key_spend().await, 3.0)); // unreserved layer: actual
    }

    #[tokio::test]
    async fn period_rollover_charges_excess_over_reservation() {
        let f = fixture(100.0).await;
        let s = reserve(&f, 1.0, "2000-01").await;
        f.db.users()
            .reset_user_monthly_budget(&f.user_id, &current_period(), "2000-01", 1.0)
            .await
            .unwrap();
        let mut key = f.key_info.clone();
        key.settlement = Some(s.clone());
        record(&f, &key).await; // actual 3 > reserved 1
        settle_after_report(&f.tracker, &key, &s, true, Duration::from_secs(1)).await;
        assert!(approx(f.user_spend().await, 2.0));
    }
}
