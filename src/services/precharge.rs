//! Budget precharge (`budget_enforcement = precharge`).
//!
//! The default (`soft`) enforcement checks spend **before** a request and adds
//! the cost **after** it, so concurrent / long requests can overshoot a budget
//! by up to "in-flight requests × request cost". Precharge narrows that:
//!
//! 1. Before the request, estimate its cost — input ≈ body bytes / 4 tokens
//!    (capped), output = `min(max_tokens, budget_precharge_output_cap)` — at
//!    the model's prices × the caller's cost rate.
//! 2. **Reserve** that amount on every budget layer that has a budget (key,
//!    user, team) with a conditional increment (`spend <= budget - estimate`).
//!    If any layer refuses, the earlier reservations are rolled back and the
//!    request is rejected (403, budget exceeded).
//! 3. When the response body finishes (or the client disconnects), settle:
//!    every layer gets `actual - reserved` (layers without a budget get the
//!    plain actual cost), budget alerts are evaluated, and `record_usage`'s own
//!    budget increments are skipped for this request.
//!
//! Residual overshoot: a request whose real output exceeds the cap. If the
//! process dies before settling, the request stays charged at its estimate
//! (conservative, bounded).

use axum::{
    body::{to_bytes, Body},
    extract::State,
    http::{Method, Request},
    middleware::Next,
    response::{IntoResponse, Response},
};
use serde::Deserialize;
use std::sync::atomic::{AtomicBool, Ordering};
use std::sync::{Arc, Mutex};

use crate::database::models::BudgetLayer;
use crate::database::traits::DatabaseService;
use crate::middleware::auth::{ApiKeyInfo, AuthError, BudgetScope};
use crate::services::usage_tracker::UsageTracker;

/// Input-token estimate ceiling (bytes/4 over-counts images and JSON overhead).
const MAX_INPUT_ESTIMATE: u64 = 200_000;

/// Hot-reloadable precharge configuration.
#[derive(Debug, Clone, Copy, PartialEq)]
pub struct PrechargeConfig {
    pub enabled: bool,
    pub output_cap: u64,
}

impl Default for PrechargeConfig {
    fn default() -> Self {
        Self {
            enabled: false,
            output_cap: 8192,
        }
    }
}

/// One reserved layer: (layer, storage id — key hash / user_id / team_id, amount).
pub type Reservation = (BudgetLayer, String, f64);

/// Per-request precharge state shared by the middleware and `record_usage`.
#[derive(Debug)]
pub struct Settlement {
    pub reserved: Vec<Reservation>,
    actual: Mutex<f64>,
    settled: AtomicBool,
}

impl Settlement {
    pub fn new(reserved: Vec<Reservation>) -> Self {
        Self {
            reserved,
            actual: Mutex::new(0.0),
            settled: AtomicBool::new(false),
        }
    }

    /// Called by `record_usage` with the computed cost (accumulates — a request
    /// may record usage more than once, e.g. web-tool loops).
    pub fn add_actual(&self, cost: f64) {
        *self.actual.lock().unwrap_or_else(|e| e.into_inner()) += cost;
    }

    pub fn actual(&self) -> f64 {
        *self.actual.lock().unwrap_or_else(|e| e.into_inner())
    }

    pub fn reserved_for(&self, layer: BudgetLayer) -> f64 {
        self.reserved
            .iter()
            .filter(|(l, _, _)| *l == layer)
            .map(|(_, _, a)| *a)
            .sum()
    }

    /// `true` exactly once.
    fn take(&self) -> bool {
        !self.settled.swap(true, Ordering::AcqRel)
    }
}

#[derive(Clone)]
pub struct PrechargeState {
    pub database: Arc<dyn DatabaseService>,
    pub usage_tracker: Arc<UsageTracker>,
    pub max_body_bytes: usize,
}

#[derive(Deserialize, Default)]
struct BodyHints {
    model: Option<String>,
    max_tokens: Option<u64>,
    max_output_tokens: Option<u64>,
    max_completion_tokens: Option<u64>,
}

/// Endpoints whose cost is token-priced (count_tokens / GETs never precharge).
fn is_billable(path: &str) -> bool {
    let p = path.trim_start_matches("/v1");
    matches!(
        p,
        "/messages" | "/chat/completions" | "/responses" | "/embeddings"
    )
}

/// Estimate `(input_tokens, output_tokens)` from the raw body.
pub fn estimate_tokens(body_len: usize, max_out: Option<u64>, cap: u64) -> (u64, u64) {
    let input = (body_len as u64 / 4).min(MAX_INPUT_ESTIMATE);
    let output = max_out.unwrap_or(cap).min(cap);
    (input, output)
}

/// Layers with a budget, as `(layer, storage id, budget, current spend)`.
fn budget_layers(k: &ApiKeyInfo) -> Vec<(BudgetLayer, String, f64, f64)> {
    let mut out = Vec::new();
    if let Some(t) = &k.team {
        if let Some(b) = t.monthly_budget {
            out.push((BudgetLayer::Team, t.team_id.clone(), b, t.budget_used_mtd));
        }
    }
    if let Some(u) = &k.user {
        if let Some(b) = u.monthly_budget {
            out.push((BudgetLayer::User, u.user_id.clone(), b, u.budget_used_mtd));
        }
    }
    if let Some(b) = k.monthly_budget {
        out.push((
            BudgetLayer::Key,
            k.raw_api_key.clone(),
            b,
            k.budget_used_mtd,
        ));
    }
    out
}

fn scope_of(layer: BudgetLayer) -> BudgetScope {
    match layer {
        BudgetLayer::Key => BudgetScope::Key,
        BudgetLayer::User => BudgetScope::User,
        BudgetLayer::Team => BudgetScope::Team,
    }
}

pub async fn budget_precharge(
    State(state): State<PrechargeState>,
    request: Request<Body>,
    next: Next,
) -> Response {
    let cfg = state.usage_tracker.precharge_config();
    let eligible = cfg.enabled
        && request.method() == Method::POST
        && is_billable(request.uri().path())
        && request
            .extensions()
            .get::<ApiKeyInfo>()
            .is_some_and(|k| !k.raw_api_key.is_empty() && !budget_layers(k).is_empty());
    if !eligible {
        return next.run(request).await;
    }

    let (mut parts, body) = request.into_parts();
    let bytes = match to_bytes(body, state.max_body_bytes).await {
        Ok(b) => b,
        Err(_) => {
            return (
                axum::http::StatusCode::PAYLOAD_TOO_LARGE,
                axum::Json(crate::schemas::anthropic::ErrorResponse::new(
                    "request_too_large",
                    "Request body exceeds the configured size limit",
                )),
            )
                .into_response()
        }
    };
    let hints: BodyHints = serde_json::from_slice(&bytes).unwrap_or_default();
    let Some(mut key_info) = parts.extensions.remove::<ApiKeyInfo>() else {
        return next
            .run(Request::from_parts(parts, Body::from(bytes)))
            .await;
    };

    // Roll stale periods first so a reservation is not wiped by the lazy reset.
    if let Err(e) = state.usage_tracker.roll_periods(&mut key_info).await {
        tracing::warn!(error = %e, "Precharge: period rollover failed; continuing without precharge");
        parts.extensions.insert(key_info);
        return next
            .run(Request::from_parts(parts, Body::from(bytes)))
            .await;
    }

    let (input, output) = estimate_tokens(
        bytes.len(),
        hints
            .max_tokens
            .or(hints.max_output_tokens)
            .or(hints.max_completion_tokens),
        cfg.output_cap,
    );
    let estimate = match hints.model.as_deref() {
        Some(model) => {
            state
                .usage_tracker
                .estimate_cost(model, input, output, key_info.cost_rate)
                .await
        }
        None => 0.0,
    };

    let mut reserved: Vec<Reservation> = Vec::new();
    if estimate > 0.0 {
        for (layer, id, budget, _) in budget_layers(&key_info) {
            match state
                .database
                .budgets()
                .reserve_budget(layer, &id, estimate, budget - estimate)
                .await
            {
                Ok(true) => reserved.push((layer, id, estimate)),
                Ok(false) => {
                    rollback(&state, &reserved).await;
                    crate::observability::metrics::record_precharge("rejected");
                    return AuthError::BudgetExceeded(scope_of(layer)).into_response();
                }
                Err(e) => {
                    // Store trouble: fall back to soft enforcement for this request.
                    tracing::warn!(error = %e, "Precharge reservation failed; using soft enforcement");
                    rollback(&state, &reserved).await;
                    parts.extensions.insert(key_info);
                    return next
                        .run(Request::from_parts(parts, Body::from(bytes)))
                        .await;
                }
            }
        }
    }
    crate::observability::metrics::record_precharge("reserved");

    let settlement = Arc::new(Settlement::new(reserved));
    key_info.settlement = Some(settlement.clone());
    parts.extensions.insert(key_info.clone());
    let response = next
        .run(Request::from_parts(parts, Body::from(bytes)))
        .await;

    let guard = SettleGuard {
        tracker: state.usage_tracker.clone(),
        key_info,
        settlement,
    };
    hold_until_body_done(response, guard)
}

async fn rollback(state: &PrechargeState, reserved: &[Reservation]) {
    for (layer, id, amount) in reserved {
        if let Err(e) = state.usage_tracker.adjust_layer(*layer, id, -amount).await {
            tracing::error!(error = %e, layer = layer.as_str(), "Precharge rollback failed");
        }
    }
}

/// Settles when dropped — after the response body has been fully sent or the
/// client went away.
struct SettleGuard {
    tracker: Arc<UsageTracker>,
    key_info: ApiKeyInfo,
    settlement: Arc<Settlement>,
}

impl Drop for SettleGuard {
    fn drop(&mut self) {
        if !self.settlement.take() {
            return;
        }
        let tracker = self.tracker.clone();
        let key_info = self.key_info.clone();
        let settlement = self.settlement.clone();
        tokio::spawn(async move {
            tracker.settle(&key_info, &settlement).await;
        });
    }
}

fn hold_until_body_done(resp: Response, guard: SettleGuard) -> Response {
    use futures::StreamExt;
    let (parts, body) = resp.into_parts();
    let stream = body.into_data_stream().map(move |chunk| {
        let _held = &guard;
        chunk
    });
    Response::from_parts(parts, Body::from_stream(stream))
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn token_estimates() {
        assert_eq!(estimate_tokens(4000, Some(100), 8192), (1000, 100));
        assert_eq!(estimate_tokens(4000, Some(64_000), 8192), (1000, 8192));
        assert_eq!(estimate_tokens(4000, None, 8192), (1000, 8192));
        assert_eq!(estimate_tokens(10_000_000, None, 10).0, MAX_INPUT_ESTIMATE);
    }

    #[test]
    fn billable_paths() {
        assert!(is_billable("/v1/messages"));
        assert!(is_billable("/messages"));
        assert!(is_billable("/chat/completions"));
        assert!(!is_billable("/messages/count_tokens"));
        assert!(!is_billable("/models"));
    }

    #[test]
    fn settlement_accumulates_once() {
        let s = Settlement::new(vec![(BudgetLayer::User, "u".into(), 2.0)]);
        s.add_actual(0.5);
        s.add_actual(0.25);
        assert_eq!(s.actual(), 0.75);
        assert_eq!(s.reserved_for(BudgetLayer::User), 2.0);
        assert_eq!(s.reserved_for(BudgetLayer::Key), 0.0);
        assert!(s.take());
        assert!(!s.take());
    }
}
