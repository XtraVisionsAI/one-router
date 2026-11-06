//! Rate limiting middleware
//!
//! Two independent per-key limits:
//! - **RPM** — governor GCRA limiter, checked and consumed on request entry.
//! - **TPM** — [`TokenRateLimiter`], a sliding-window token counter. Token
//!   counts are only known after the response, so TPM is *metered after the
//!   fact* (`UsageTracker::record_usage` → [`TokenRateLimiter::record`]) and
//!   *checked before* the next request. One request can overshoot the window;
//!   that is inherent to post-hoc metering.
//!
//! - **Concurrency** — in-flight request caps (`max_concurrency` on key / user
//!   / team). A slot is held until the response **body** finishes (streams
//!   count until their last byte, or until the client disconnects).
//!
//! Buckets exist per key (`key_id`), per user (`user:<id>`, shared by all of
//! the user's keys) and per team (`team:<id>`). Every bucket must pass.
//!
//! **Stores** (`rate_limit_store` setting): `memory` (default) keeps RPM / TPM
//! per instance (effective limit = configured × instances); `database` keeps
//! them in shared fixed one-minute window counters (`rate_counters`), weighted
//! across two windows. Database errors **fail open** (logged): rate limiting is
//! a protection, not a reason to take the gateway down. Concurrency caps are
//! always per instance.

use axum::{
    body::Body,
    extract::State,
    http::{Request, StatusCode},
    middleware::Next,
    response::{IntoResponse, Response},
    Json,
};
use governor::{
    clock::{Clock, DefaultClock},
    state::{InMemoryState, NotKeyed},
    Quota, RateLimiter,
};
use moka::future::Cache;
use std::num::NonZeroU32;
use std::sync::{Arc, Mutex};
use std::time::{Duration, SystemTime, UNIX_EPOCH};
use tokio::sync::RwLock;

use crate::database::traits::DatabaseService;
use crate::middleware::auth::ApiKeyInfo;
use crate::schemas::anthropic::ErrorResponse;
use crate::server::state::DynamicConfig;
use std::sync::atomic::{AtomicBool, AtomicUsize, Ordering};

type KeyedRateLimiter = RateLimiter<NotKeyed, InMemoryState, DefaultClock>;

/// Idle eviction for per-key limiter state.
const LIMITER_IDLE: Duration = Duration::from_secs(600);
const LIMITER_CAPACITY: u64 = 10_000;

// ============================================================================
// TPM: sliding-window token counter
// ============================================================================

/// Two fixed one-minute windows, weighted to approximate a sliding window:
/// `used ≈ prev × (1 − elapsed/60) + curr`.
#[derive(Debug, Default, Clone, Copy)]
struct TokenWindow {
    /// Unix minute the `curr` bucket belongs to.
    minute: u64,
    curr: u64,
    prev: u64,
}

impl TokenWindow {
    fn roll(&mut self, now_minute: u64) {
        if now_minute == self.minute {
            return;
        }
        self.prev = if now_minute == self.minute + 1 {
            self.curr
        } else {
            0
        };
        self.curr = 0;
        self.minute = now_minute;
    }

    fn estimate(&self, secs_into_minute: f64) -> f64 {
        let prev_weight = (1.0 - secs_into_minute / 60.0).clamp(0.0, 1.0);
        self.prev as f64 * prev_weight + self.curr as f64
    }
}

/// Per-key tokens-per-minute meter. Keyed by `key_id`.
pub struct TokenRateLimiter {
    windows: Cache<String, Arc<Mutex<TokenWindow>>>,
    /// `true` = use the shared database store (RPM + TPM).
    shared: AtomicBool,
    db: std::sync::OnceLock<Arc<dyn DatabaseService>>,
}

impl Default for TokenRateLimiter {
    fn default() -> Self {
        Self::new()
    }
}

impl TokenRateLimiter {
    pub fn new() -> Self {
        Self {
            windows: Cache::builder()
                .max_capacity(LIMITER_CAPACITY)
                .time_to_idle(LIMITER_IDLE)
                .build(),
            shared: AtomicBool::new(false),
            db: std::sync::OnceLock::new(),
        }
    }

    /// Attach the database used by the shared store.
    pub fn set_store(&self, db: Arc<dyn DatabaseService>) {
        let _ = self.db.set(db);
    }

    /// Switch between the in-memory and the shared database store (hot reload).
    pub fn set_shared(&self, shared: bool) {
        self.shared.store(shared, Ordering::Relaxed);
    }

    fn shared_db(&self) -> Option<&Arc<dyn DatabaseService>> {
        if self.shared.load(Ordering::Relaxed) {
            self.db.get()
        } else {
            None
        }
    }

    pub fn is_shared(&self) -> bool {
        self.shared_db().is_some()
    }

    /// `(prev, curr)` window counts from the shared store.
    async fn shared_windows(
        db: &Arc<dyn DatabaseService>,
        bucket: &str,
        minute: i64,
    ) -> anyhow::Result<(
        crate::database::models::WindowCount,
        crate::database::models::WindowCount,
    )> {
        let store = db.rate_counters();
        Ok((
            store.get_window(bucket, minute - 1).await?,
            store.get_window(bucket, minute).await?,
        ))
    }

    fn weighted(prev: i64, curr: i64, secs: f64) -> f64 {
        let w = (1.0 - secs / 60.0).clamp(0.0, 1.0);
        prev as f64 * w + curr as f64
    }

    /// Shared-store RPM: count this request, reject (and un-count) when the
    /// weighted window exceeds `limit`. `Err(retry_after_secs)`.
    pub async fn check_rpm_shared(&self, bucket: &str, limit: u32) -> Result<(), u64> {
        let Some(db) = self.shared_db() else {
            return Ok(());
        };
        let (minute, secs) = Self::now();
        let minute = minute as i64;
        let expires = (minute + 3) * 60;
        let store = db.rate_counters();
        let counted = async {
            let curr = store.incr_window(bucket, minute, 1, 0, expires).await?;
            let prev = store.get_window(bucket, minute - 1).await?;
            anyhow::Ok((prev, curr))
        }
        .await;
        match counted {
            Ok((prev, curr))
                if Self::weighted(prev.requests, curr.requests, secs) > limit as f64 =>
            {
                let _ = store.incr_window(bucket, minute, -1, 0, expires).await;
                Err(((60.0 - secs).ceil() as u64).max(1))
            }
            Ok(_) => Ok(()),
            Err(e) => {
                tracing::warn!(error = %e, "Shared rate-limit store unavailable; allowing request");
                crate::observability::metrics::record_rate_limit_store_error();
                Ok(())
            }
        }
    }

    fn now() -> (u64, f64) {
        let since = SystemTime::now()
            .duration_since(UNIX_EPOCH)
            .unwrap_or_default();
        let secs = since.as_secs_f64();
        ((secs / 60.0) as u64, secs % 60.0)
    }

    /// `Err(retry_after_secs)` when the bucket's window is already at/over `limit`.
    pub async fn check(&self, key_id: &str, limit: u32) -> Result<(), u64> {
        if let Some(db) = self.shared_db() {
            let (minute, secs) = Self::now();
            return match Self::shared_windows(db, key_id, minute as i64).await {
                Ok((prev, curr))
                    if Self::weighted(prev.tokens, curr.tokens, secs) >= limit as f64 =>
                {
                    Err(((60.0 - secs).ceil() as u64).max(1))
                }
                Ok(_) => Ok(()),
                Err(e) => {
                    tracing::warn!(error = %e, "Shared rate-limit store unavailable; allowing request");
                    crate::observability::metrics::record_rate_limit_store_error();
                    Ok(())
                }
            };
        }
        let Some(window) = self.windows.get(key_id).await else {
            return Ok(());
        };
        let (minute, secs) = Self::now();
        Self::check_at(&window, limit, minute, secs)
    }

    fn check_at(
        window: &Mutex<TokenWindow>,
        limit: u32,
        minute: u64,
        secs: f64,
    ) -> Result<(), u64> {
        let mut w = window.lock().unwrap_or_else(|e| e.into_inner());
        w.roll(minute);
        if w.estimate(secs) >= limit as f64 {
            // Waiting for the next minute boundary always helps: `prev` decays
            // and `curr` rolls over. Not exact, but never zero.
            Err(((60.0 - secs).ceil() as u64).max(1))
        } else {
            Ok(())
        }
    }

    /// Add `tokens` consumed by `key_id` to the current window.
    pub async fn record(&self, key_id: &str, tokens: u64) {
        if tokens == 0 {
            return;
        }
        if let Some(db) = self.shared_db() {
            let (minute, _) = Self::now();
            let minute = minute as i64;
            if let Err(e) = db
                .rate_counters()
                .incr_window(key_id, minute, 0, tokens as i64, (minute + 3) * 60)
                .await
            {
                tracing::warn!(error = %e, "Failed to record tokens in shared rate-limit store");
                crate::observability::metrics::record_rate_limit_store_error();
            }
            return;
        }
        let window = self
            .windows
            .get_with(key_id.to_string(), async {
                Arc::new(Mutex::new(TokenWindow::default()))
            })
            .await;
        let (minute, _) = Self::now();
        let mut w = window.lock().unwrap_or_else(|e| e.into_inner());
        w.roll(minute);
        w.curr = w.curr.saturating_add(tokens);
    }
}

// ============================================================================
// Middleware state
// ============================================================================

#[derive(Clone)]
pub struct RateLimitState {
    /// Source of the global `rate_limit` setting (hot-reloaded).
    /// `rate_limit_rpm = None` disables all rate limiting, per-key limits included.
    dynamic: Arc<RwLock<DynamicConfig>>,
    /// Keyed by `"{key_id}:{rpm}"` — a changed limit maps to a fresh limiter on
    /// the very next request (the old one idles out), with no cross-instance
    /// invalidation needed.
    limiters: Cache<String, Arc<KeyedRateLimiter>>,
    tokens: Arc<TokenRateLimiter>,
    concurrency: Arc<ConcurrencyLimiter>,
}

impl RateLimitState {
    pub fn new(dynamic: Arc<RwLock<DynamicConfig>>, tokens: Arc<TokenRateLimiter>) -> Self {
        let limiters = Cache::builder()
            .max_capacity(LIMITER_CAPACITY)
            .time_to_idle(LIMITER_IDLE)
            .build();

        Self {
            dynamic,
            limiters,
            tokens,
            concurrency: Arc::new(ConcurrencyLimiter::default()),
        }
    }

    async fn get_limiter(&self, key_id: &str, rpm: u32) -> Arc<KeyedRateLimiter> {
        self.limiters
            .get_with(limiter_cache_key(key_id, rpm), async {
                Arc::new(create_limiter(rpm))
            })
            .await
    }
}

fn limiter_cache_key(key_id: &str, rpm: u32) -> String {
    format!("{key_id}:{rpm}")
}

fn create_limiter(requests_per_minute: u32) -> KeyedRateLimiter {
    let rpm = requests_per_minute.max(1);
    let replenish_period = Duration::from_secs(60) / rpm;
    let quota = Quota::with_period(replenish_period)
        .unwrap()
        .allow_burst(NonZeroU32::new(rpm).unwrap());

    RateLimiter::direct(quota)
}

// ============================================================================
// Error
// ============================================================================

#[derive(Debug)]
pub struct RateLimitError {
    pub retry_after_seconds: u64,
    pub kind: &'static str,
}

impl IntoResponse for RateLimitError {
    fn into_response(self) -> Response {
        let what = match self.kind {
            "tpm" => "Token rate limit (TPM) exceeded",
            "concurrency" => "Too many concurrent requests",
            _ => "Rate limit exceeded",
        };
        let error_response = ErrorResponse::new(
            "rate_limit_error",
            format!("{what}. Retry after {} seconds.", self.retry_after_seconds),
        );

        let mut response = (StatusCode::TOO_MANY_REQUESTS, Json(error_response)).into_response();
        let headers = response.headers_mut();
        headers.insert(
            "retry-after",
            self.retry_after_seconds.to_string().parse().unwrap(),
        );

        response
    }
}

// ============================================================================
// Middleware
// ============================================================================

/// TPM / RPM / concurrency bucket of a user (shared by all of the user's keys).
pub fn user_bucket(user_id: &str) -> String {
    format!("user:{user_id}")
}

/// Bucket of a team (shared by every member's keys).
pub fn team_bucket(team_id: &str) -> String {
    format!("team:{team_id}")
}

/// One limiter a request must pass: (bucket id, limit, metric scope).
type Bucket = (String, u32, &'static str);

/// The TPM, RPM and concurrency buckets for a caller (team, user, key order).
/// The user's RPM falls back to the global default; key / team RPM apply only
/// when set — except for an ownerless key, which keeps the pre-users behavior
/// (key RPM, else the global default).
fn buckets(key_info: &ApiKeyInfo, default_rpm: u32) -> (Vec<Bucket>, Vec<Bucket>, Vec<Bucket>) {
    let mut tpm = Vec::new();
    let mut rpm = Vec::new();
    let mut conc = Vec::new();
    if let Some(team) = &key_info.team {
        let b = team_bucket(&team.team_id);
        if let Some(t) = team.tpm_limit {
            tpm.push((b.clone(), t, "team"));
        }
        if let Some(r) = team.rate_limit {
            rpm.push((b.clone(), r, "team"));
        }
        if let Some(c) = team.max_concurrency {
            conc.push((b, c, "team"));
        }
    }
    match &key_info.user {
        Some(user) => {
            let bucket = user_bucket(&user.user_id);
            if let Some(t) = user.tpm_limit {
                tpm.push((bucket.clone(), t, "user"));
            }
            if let Some(c) = user.max_concurrency {
                conc.push((bucket.clone(), c, "user"));
            }
            rpm.push((bucket, user.rate_limit.unwrap_or(default_rpm), "user"));
            if let Some(r) = key_info.rate_limit {
                rpm.push((key_info.key_id.clone(), r, "key"));
            }
        }
        None => rpm.push((
            key_info.key_id.clone(),
            key_info.rate_limit.unwrap_or(default_rpm),
            "key",
        )),
    }
    if let Some(t) = key_info.tpm_limit {
        tpm.push((key_info.key_id.clone(), t, "key"));
    }
    if let Some(c) = key_info.max_concurrency {
        conc.push((key_info.key_id.clone(), c, "key"));
    }
    (tpm, rpm, conc)
}

/// Per-instance in-flight counters.
pub struct ConcurrencyLimiter {
    counters: moka::sync::Cache<String, Arc<AtomicUsize>>,
}

impl Default for ConcurrencyLimiter {
    fn default() -> Self {
        Self {
            counters: moka::sync::Cache::builder()
                .max_capacity(LIMITER_CAPACITY)
                .time_to_idle(LIMITER_IDLE)
                .build(),
        }
    }
}

/// Held slots; releasing happens on drop.
pub struct ConcurrencyGuard(Vec<Arc<AtomicUsize>>);

impl Drop for ConcurrencyGuard {
    fn drop(&mut self) {
        for c in &self.0 {
            c.fetch_sub(1, Ordering::AcqRel);
        }
    }
}

impl ConcurrencyLimiter {
    /// Take one slot in every bucket, or none: `Err(scope)` of the first full one.
    pub fn acquire(&self, buckets: &[Bucket]) -> Result<ConcurrencyGuard, &'static str> {
        let mut held = Vec::with_capacity(buckets.len());
        for (bucket, limit, scope) in buckets {
            let c = self
                .counters
                .get_with(bucket.clone(), || Arc::new(AtomicUsize::new(0)));
            if c.fetch_add(1, Ordering::AcqRel) >= *limit as usize {
                c.fetch_sub(1, Ordering::AcqRel);
                drop(ConcurrencyGuard(held)); // release what we took
                return Err(scope);
            }
            held.push(c);
        }
        Ok(ConcurrencyGuard(held))
    }
}

/// Keep `guard` alive until the response body is fully sent (or dropped).
fn hold_until_body_done(resp: Response, guard: ConcurrencyGuard) -> Response {
    use futures::StreamExt;
    let (parts, body) = resp.into_parts();
    let stream = body.into_data_stream().map(move |chunk| {
        let _held = &guard;
        chunk
    });
    Response::from_parts(parts, Body::from_stream(stream))
}

pub async fn rate_limit(
    State(rate_state): State<RateLimitState>,
    request: Request<Body>,
    next: Next,
) -> Result<Response, RateLimitError> {
    let default_rpm = rate_state.dynamic.read().await.rate_limit_rpm;

    // Globally disabled — bypass completely, including per-key limits
    let Some(default_rpm) = default_rpm else {
        return Ok(next.run(request).await);
    };

    let Some(key_info) = request.extensions().get::<ApiKeyInfo>().cloned() else {
        return Ok(next.run(request).await);
    };

    if key_info.bypass_rate_limit() {
        return Ok(next.run(request).await);
    }

    let (tpm_buckets, rpm_buckets, conc_buckets) = buckets(&key_info, default_rpm);

    // TPM checks don't consume anything — run them all first.
    for (bucket, limit, scope) in &tpm_buckets {
        if let Err(retry_after_seconds) = rate_state.tokens.check(bucket, *limit).await {
            crate::observability::metrics::record_rate_limited("tpm", scope);
            return Err(RateLimitError {
                retry_after_seconds,
                kind: "tpm",
            });
        }
    }

    let shared = rate_state.tokens.is_shared();
    for (bucket, limit, scope) in &rpm_buckets {
        let rejected = if shared {
            rate_state
                .tokens
                .check_rpm_shared(bucket, *limit)
                .await
                .err()
        } else {
            let limiter = rate_state.get_limiter(bucket, *limit).await;
            limiter.check().err().map(|not_until| {
                not_until
                    .wait_time_from(DefaultClock::default().now())
                    .as_secs()
                    .max(1)
            })
        };
        if let Some(retry_after_seconds) = rejected {
            crate::observability::metrics::record_rate_limited("rpm", scope);
            return Err(RateLimitError {
                retry_after_seconds,
                kind: "rpm",
            });
        }
    }

    if conc_buckets.is_empty() {
        return Ok(next.run(request).await);
    }
    match rate_state.concurrency.acquire(&conc_buckets) {
        Ok(guard) => Ok(hold_until_body_done(next.run(request).await, guard)),
        Err(scope) => {
            crate::observability::metrics::record_rate_limited("concurrency", scope);
            Err(RateLimitError {
                retry_after_seconds: 1,
                kind: "concurrency",
            })
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn window_rolls_current_into_previous() {
        let mut w = TokenWindow {
            minute: 10,
            curr: 600,
            prev: 0,
        };
        w.roll(11);
        assert_eq!((w.minute, w.curr, w.prev), (11, 0, 600));
        // At 30s into minute 11 half of the previous window still counts.
        assert!((w.estimate(30.0) - 300.0).abs() < 1e-9);
    }

    #[test]
    fn window_gap_clears_both_buckets() {
        let mut w = TokenWindow {
            minute: 10,
            curr: 600,
            prev: 400,
        };
        w.roll(13);
        assert_eq!((w.curr, w.prev), (0, 0));
    }

    #[test]
    fn check_rejects_at_limit_and_recovers() {
        let window = Mutex::new(TokenWindow {
            minute: 100,
            curr: 1_000,
            prev: 0,
        });
        // Same minute, 1000 used vs limit 1000 → reject, retry until boundary.
        assert_eq!(
            TokenRateLimiter::check_at(&window, 1_000, 100, 45.0),
            Err(15)
        );
        // Next minute at 59s: prev weight ≈ 1/60 → ~17 tokens → allowed.
        assert!(TokenRateLimiter::check_at(&window, 1_000, 101, 59.0).is_ok());
    }

    #[tokio::test]
    async fn record_then_check() {
        let t = TokenRateLimiter::new();
        assert!(t.check("k1", 100).await.is_ok()); // no window yet
        t.record("k1", 150).await;
        assert!(t.check("k1", 100).await.is_err());
        assert!(t.check("k2", 100).await.is_ok()); // keys are independent
    }

    fn principal(user_rpm: Option<u32>, key_rpm: Option<u32>) -> ApiKeyInfo {
        let mut info = ApiKeyInfo::master("sk-x");
        info.is_master = false;
        info.key_id = "k1".into();
        info.rate_limit = key_rpm;
        info.user = Some(crate::middleware::auth::UserPrincipal {
            user_id: "u1".into(),
            name: "alice".into(),
            rate_limit: user_rpm,
            tpm_limit: Some(5000),
            monthly_budget: None,
            budget_used_mtd: 0.0,
            budget_mtd_month: None,
            budget_period: Default::default(),
            max_concurrency: Some(2),
        });
        info
    }

    #[test]
    fn user_bucket_uses_default_and_key_sub_limit_is_optional() {
        let (tpm, rpm, _) = buckets(&principal(None, None), 100);
        assert_eq!(tpm, vec![("user:u1".to_string(), 5000, "user")]);
        assert_eq!(rpm, vec![("user:u1".to_string(), 100, "user")]);

        let (_, rpm, _) = buckets(&principal(Some(30), Some(5)), 100);
        assert_eq!(
            rpm,
            vec![
                ("user:u1".to_string(), 30, "user"),
                ("k1".to_string(), 5, "key")
            ]
        );
    }

    #[test]
    fn ownerless_key_keeps_legacy_rpm() {
        let mut info = principal(None, None);
        info.user = None;
        let (_, rpm, _) = buckets(&info, 100);
        assert_eq!(rpm, vec![("k1".to_string(), 100, "key")]);
    }

    #[test]
    fn team_buckets_and_concurrency() {
        let mut info = principal(None, None);
        info.max_concurrency = Some(1);
        info.team = Some(crate::middleware::auth::TeamPrincipal {
            team_id: "t1".into(),
            name: "infra".into(),
            rate_limit: Some(500),
            tpm_limit: None,
            max_concurrency: Some(10),
            monthly_budget: None,
            budget_used_mtd: 0.0,
            budget_mtd_month: None,
            budget_period: Default::default(),
        });
        let (_, rpm, conc) = buckets(&info, 100);
        assert_eq!(rpm[0], ("team:t1".to_string(), 500, "team"));
        assert_eq!(
            conc,
            vec![
                ("team:t1".to_string(), 10, "team"),
                ("user:u1".to_string(), 2, "user"),
                ("k1".to_string(), 1, "key"),
            ]
        );

        let limiter = ConcurrencyLimiter::default();
        let g1 = limiter.acquire(&conc).unwrap();
        // Key allows 1 in flight → second is rejected at the key scope, and the
        // team/user slots it briefly took are released.
        assert_eq!(limiter.acquire(&conc).err(), Some("key"));
        drop(g1);
        let _g2 = limiter.acquire(&conc).unwrap();
    }

    #[test]
    fn shared_window_weighting() {
        assert!((TokenRateLimiter::weighted(60, 10, 30.0) - 40.0).abs() < 1e-9);
        assert!((TokenRateLimiter::weighted(60, 10, 60.0) - 10.0).abs() < 1e-9);
    }

    #[test]
    fn limiter_key_changes_with_rpm() {
        assert_ne!(limiter_cache_key("k", 10), limiter_cache_key("k", 20));
    }
}
