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

/// One reserved layer: the amount added to `id`'s counters in `period`.
#[derive(Debug, Clone, PartialEq)]
pub struct Reservation {
    pub layer: BudgetLayer,
    /// Storage id — key hash / user_id / team_id.
    pub id: String,
    pub amount: f64,
    /// Budget period key the reservation landed in (`BudgetPeriod::key_at`).
    pub period: String,
}

/// How long a settled-on-body-end request waits for `record_usage` to report
/// its cost before giving up. On timeout the reservation is **kept** (charged
/// at the estimate) rather than refunded; a later report still corrects it.
pub const SETTLE_REPORT_TIMEOUT: std::time::Duration = std::time::Duration::from_secs(30);

/// Amount already applied to one layer's counters for this request.
#[derive(Debug)]
struct LedgerEntry {
    layer: BudgetLayer,
    /// Period the applied amount landed in.
    period: String,
    applied: f64,
}

#[derive(Debug)]
struct SettlementInner {
    /// Sum of costs reported by `record_usage`.
    actual: f64,
    /// Number of `record_usage` reports.
    reports: u32,
    /// The response body has ended and the reservation is being settled.
    settled: bool,
    /// Settled without any report (timeout): keep the reservation until a
    /// report arrives.
    hold: bool,
    ledger: Vec<LedgerEntry>,
    /// Actual cost already used as an alert delta.
    alerted: f64,
}

/// One counter adjustment produced by [`Settlement::plan`].
#[derive(Debug, Clone, Copy, PartialEq)]
pub struct Adjustment {
    pub layer: BudgetLayer,
    pub delta: f64,
}

/// Per-request precharge state shared by the middleware and `record_usage`.
///
/// Settlement needs two signals — the response body ended (middleware) and the
/// request's cost is known (`record_usage`) — which may arrive in either
/// order. The ledger makes the outcome order-independent: every flush moves
/// each layer's counter from what was already applied to the current target
/// (`actual`), under one lock, so a late report after settlement is charged
/// by `record_usage` itself instead of being lost.
#[derive(Debug)]
pub struct Settlement {
    pub reserved: Vec<Reservation>,
    inner: Mutex<SettlementInner>,
    notify: tokio::sync::Notify,
}

impl Settlement {
    pub fn new(reserved: Vec<Reservation>) -> Self {
        let ledger = reserved
            .iter()
            .map(|r| LedgerEntry {
                layer: r.layer,
                period: r.period.clone(),
                applied: r.amount,
            })
            .collect();
        Self {
            reserved,
            inner: Mutex::new(SettlementInner {
                actual: 0.0,
                reports: 0,
                settled: false,
                hold: false,
                ledger,
                alerted: 0.0,
            }),
            notify: tokio::sync::Notify::new(),
        }
    }

    fn lock(&self) -> std::sync::MutexGuard<'_, SettlementInner> {
        self.inner.lock().unwrap_or_else(|e| e.into_inner())
    }

    /// Called by `record_usage` with the computed cost (accumulates — a request
    /// may record usage more than once, e.g. web-tool loops). Returns `true`
    /// when the request was already settled, i.e. the caller must
    /// [`flush`](crate::services::usage_tracker::UsageTracker::flush_settlement)
    /// the late cost itself.
    pub fn report(&self, cost: f64) -> bool {
        let settled = {
            let mut g = self.lock();
            g.actual += cost.max(0.0);
            g.reports += 1;
            g.settled
        };
        self.notify.notify_waiters();
        settled
    }

    pub fn actual(&self) -> f64 {
        self.lock().actual
    }

    pub fn reports(&self) -> u32 {
        self.lock().reports
    }

    pub fn reserved_for(&self, layer: BudgetLayer) -> f64 {
        self.reserved
            .iter()
            .filter(|r| r.layer == layer)
            .map(|r| r.amount)
            .sum()
    }

    /// Wait until at least one report arrived, or `timeout` passed.
    pub async fn wait_for_report(&self, timeout: std::time::Duration) -> bool {
        let deadline = tokio::time::Instant::now() + timeout;
        loop {
            let notified = self.notify.notified();
            tokio::pin!(notified);
            notified.as_mut().enable();
            if self.lock().reports > 0 {
                return true;
            }
            if tokio::time::timeout_at(deadline, notified).await.is_err() {
                return self.lock().reports > 0;
            }
        }
    }

    /// Mark the request settled. `hold` keeps the reservation in place while
    /// no report has arrived (timeout path). `true` exactly once.
    pub fn finish(&self, hold: bool) -> bool {
        let mut g = self.lock();
        if g.settled {
            return false;
        }
        g.settled = true;
        g.hold = hold;
        true
    }

    /// Compute (and book) the counter adjustments that bring every layer from
    /// what is already applied to the current target. `current` lists the
    /// caller's layers with their **current** period key. Returns the
    /// adjustments and the alert delta (actual cost not yet alerted on).
    ///
    /// - target = `actual`, except while held without a report (= max(actual,
    ///   applied), i.e. the reservation stays).
    /// - A refund (negative delta) is skipped when the layer's period rolled
    ///   since the reservation: the reserved amount was archived with the old
    ///   period and must not drive the new period's counter negative. Total
    ///   charge is then max(reserved, actual).
    pub fn plan(&self, current: &[(BudgetLayer, String)]) -> (Vec<Adjustment>, f64) {
        let mut g = self.lock();
        if !g.settled {
            return (Vec::new(), 0.0);
        }
        let actual = g.actual;
        let hold = g.hold && g.reports == 0;
        let mut out = Vec::new();
        for (layer, period) in current {
            let idx = match g.ledger.iter().position(|e| e.layer == *layer) {
                Some(i) => i,
                None => {
                    g.ledger.push(LedgerEntry {
                        layer: *layer,
                        period: period.clone(),
                        applied: 0.0,
                    });
                    g.ledger.len() - 1
                }
            };
            let entry = &mut g.ledger[idx];
            let target = if hold {
                actual.max(entry.applied)
            } else {
                actual
            };
            let mut delta = target - entry.applied;
            if entry.period != *period && delta < 0.0 {
                delta = 0.0;
            }
            if delta != 0.0 {
                entry.applied += delta;
                out.push(Adjustment {
                    layer: *layer,
                    delta,
                });
            }
        }
        let alert_delta = (actual - g.alerted).max(0.0);
        g.alerted = actual;
        (out, alert_delta)
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

/// Endpoints billed on input tokens only (no output reservation).
fn is_input_only(path: &str) -> bool {
    path.trim_start_matches("/v1") == "/embeddings"
}

/// The current period key of one of the caller's budget layers.
fn layer_period(k: &ApiKeyInfo, layer: BudgetLayer) -> String {
    let now = chrono::Utc::now();
    match layer {
        BudgetLayer::Key => k.budget_period.key_at(now),
        BudgetLayer::User => k
            .user
            .as_ref()
            .map(|u| u.budget_period.key_at(now))
            .unwrap_or_default(),
        BudgetLayer::Team => k
            .team
            .as_ref()
            .map(|t| t.budget_period.key_at(now))
            .unwrap_or_default(),
    }
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

    let (input, output) = if is_input_only(parts.uri.path()) {
        // Embeddings bill input tokens only.
        (estimate_tokens(bytes.len(), Some(0), 0).0, 0)
    } else {
        estimate_tokens(
            bytes.len(),
            hints
                .max_tokens
                .or(hints.max_output_tokens)
                .or(hints.max_completion_tokens),
            cfg.output_cap,
        )
    };
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
                Ok(true) => reserved.push(Reservation {
                    layer,
                    period: layer_period(&key_info, layer),
                    id,
                    amount: estimate,
                }),
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
        success: response.status().is_success(),
    };
    hold_until_body_done(response, guard)
}

async fn rollback(state: &PrechargeState, reserved: &[Reservation]) {
    for r in reserved {
        let layer = &r.layer;
        if let Err(e) = state
            .usage_tracker
            .adjust_layer(r.layer, &r.id, -r.amount)
            .await
        {
            tracing::error!(error = %e, layer = layer.as_str(), "Precharge rollback failed");
        }
    }
}

/// Settles when dropped — after the response body has been fully sent or the
/// client went away.
///
/// Settlement waits (spawned, bounded by [`SETTLE_REPORT_TIMEOUT`]) for
/// `record_usage` to report the request's cost: non-streaming handlers record
/// usage from a spawned task that can finish after the body was sent. Error
/// responses (non-2xx) settle immediately — they normally record nothing, so
/// the reservation is refunded; a late report is still charged by
/// `record_usage` itself.
struct SettleGuard {
    tracker: Arc<UsageTracker>,
    key_info: ApiKeyInfo,
    settlement: Arc<Settlement>,
    success: bool,
}

impl Drop for SettleGuard {
    fn drop(&mut self) {
        let tracker = self.tracker.clone();
        let key_info = self.key_info.clone();
        let settlement = self.settlement.clone();
        let success = self.success;
        tokio::spawn(async move {
            settle_after_report(
                &tracker,
                &key_info,
                &settlement,
                success,
                SETTLE_REPORT_TIMEOUT,
            )
            .await;
        });
    }
}

/// Body ended: wait for the cost report (successful responses), then settle.
pub async fn settle_after_report(
    tracker: &UsageTracker,
    key_info: &ApiKeyInfo,
    settlement: &Settlement,
    success: bool,
    timeout: std::time::Duration,
) {
    let reported = !success || settlement.wait_for_report(timeout).await;
    if !reported {
        tracing::warn!(
            key_id = %key_info.key_id,
            "Precharge: no usage reported before the settle timeout; keeping the reservation"
        );
    }
    if settlement.finish(!reported) {
        tracker.flush_settlement(key_info, settlement).await;
        crate::observability::metrics::record_precharge(if reported { "settled" } else { "held" });
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

    fn res(layer: BudgetLayer, amount: f64, period: &str) -> Reservation {
        Reservation {
            layer,
            id: "id".into(),
            amount,
            period: period.into(),
        }
    }

    fn layers(period: &str) -> Vec<(BudgetLayer, String)> {
        vec![
            (BudgetLayer::User, period.to_string()),
            (BudgetLayer::Key, period.to_string()),
        ]
    }

    #[test]
    fn settlement_accumulates_and_finishes_once() {
        let s = Settlement::new(vec![res(BudgetLayer::User, 2.0, "p")]);
        assert!(!s.report(0.5));
        assert!(!s.report(0.25));
        assert_eq!(s.actual(), 0.75);
        assert_eq!(s.reports(), 2);
        assert_eq!(s.reserved_for(BudgetLayer::User), 2.0);
        assert_eq!(s.reserved_for(BudgetLayer::Key), 0.0);
        assert!(s.finish(false));
        assert!(!s.finish(false));
        // Reports after settlement tell the caller to flush.
        assert!(s.report(0.1));
    }

    #[test]
    fn plan_before_settle_is_empty() {
        let s = Settlement::new(vec![res(BudgetLayer::User, 2.0, "p")]);
        s.report(1.0);
        assert!(s.plan(&layers("p")).0.is_empty());
    }

    #[test]
    fn plan_report_then_settle() {
        let s = Settlement::new(vec![res(BudgetLayer::User, 2.0, "p")]);
        s.report(0.5);
        s.finish(false);
        let (adj, alert) = s.plan(&layers("p"));
        assert_eq!(
            adj,
            vec![
                Adjustment {
                    layer: BudgetLayer::User,
                    delta: -1.5
                },
                Adjustment {
                    layer: BudgetLayer::Key,
                    delta: 0.5
                },
            ]
        );
        assert_eq!(alert, 0.5);
        // Idempotent: a second flush changes nothing.
        assert!(s.plan(&layers("p")).0.is_empty());
    }

    #[test]
    fn plan_settle_then_late_report() {
        let s = Settlement::new(vec![res(BudgetLayer::User, 2.0, "p")]);
        s.finish(false); // error path / no wait: refund everything
        let (adj, _) = s.plan(&layers("p"));
        assert_eq!(
            adj,
            vec![Adjustment {
                layer: BudgetLayer::User,
                delta: -2.0
            }]
        );
        assert!(s.report(0.75)); // late cost
        let (adj, alert) = s.plan(&layers("p"));
        assert_eq!(
            adj,
            vec![
                Adjustment {
                    layer: BudgetLayer::User,
                    delta: 0.75
                },
                Adjustment {
                    layer: BudgetLayer::Key,
                    delta: 0.75
                },
            ]
        );
        assert_eq!(alert, 0.75);
    }

    #[test]
    fn plan_hold_keeps_reservation_until_report() {
        let s = Settlement::new(vec![res(BudgetLayer::User, 2.0, "p")]);
        s.finish(true); // timeout: no report
        assert!(s.plan(&layers("p")).0.is_empty());
        s.report(0.5);
        let (adj, _) = s.plan(&layers("p"));
        assert_eq!(adj[0].delta, -1.5);
        assert_eq!(adj[1].delta, 0.5);
    }

    #[test]
    fn plan_skips_refund_across_period_rollover() {
        let s = Settlement::new(vec![res(BudgetLayer::User, 2.0, "old")]);
        s.report(0.5);
        s.finish(false);
        let (adj, _) = s.plan(&layers("new"));
        // No negative user adjustment into the new period.
        assert_eq!(
            adj,
            vec![Adjustment {
                layer: BudgetLayer::Key,
                delta: 0.5
            }]
        );
        // Excess over the reservation still lands in the new period.
        s.report(2.0);
        let (adj, _) = s.plan(&layers("new"));
        assert_eq!(adj[0].layer, BudgetLayer::User);
        assert!((adj[0].delta - 0.5).abs() < 1e-12);
    }

    #[tokio::test]
    async fn wait_for_report_wakes_on_report() {
        let s = Arc::new(Settlement::new(vec![]));
        let waiter = {
            let s = s.clone();
            tokio::spawn(async move { s.wait_for_report(std::time::Duration::from_secs(5)).await })
        };
        tokio::time::sleep(std::time::Duration::from_millis(20)).await;
        s.report(0.0);
        assert!(waiter.await.unwrap());
        let s2 = Settlement::new(vec![]);
        assert!(
            !s2.wait_for_report(std::time::Duration::from_millis(10))
                .await
        );
    }

    #[test]
    fn embeddings_reserve_input_only() {
        assert!(is_input_only("/v1/embeddings"));
        assert!(!is_input_only("/v1/messages"));
    }
}
