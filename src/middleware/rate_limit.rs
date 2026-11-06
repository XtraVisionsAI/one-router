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
//! Both are in-process: with several gateway instances the effective limit is
//! the configured value × instance count.

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

use crate::middleware::auth::ApiKeyInfo;
use crate::schemas::anthropic::ErrorResponse;
use crate::server::state::DynamicConfig;

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
        }
    }

    fn now() -> (u64, f64) {
        let since = SystemTime::now()
            .duration_since(UNIX_EPOCH)
            .unwrap_or_default();
        let secs = since.as_secs_f64();
        ((secs / 60.0) as u64, secs % 60.0)
    }

    /// `Err(retry_after_secs)` when the key's window is already at/over `limit`.
    pub async fn check(&self, key_id: &str, limit: u32) -> Result<(), u64> {
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

/// TPM / RPM bucket of a user (shared by all of the user's keys).
pub fn user_bucket(user_id: &str) -> String {
    format!("user:{user_id}")
}

/// One limiter a request must pass: (bucket id, limit, metric scope).
type Bucket = (String, u32, &'static str);

/// The TPM and RPM buckets for a caller, user scope first. The user's RPM
/// falls back to the global default; a key-level RPM applies only when set —
/// except for an ownerless key, which keeps the pre-users behavior (key RPM,
/// else the global default).
fn buckets(key_info: &ApiKeyInfo, default_rpm: u32) -> (Vec<Bucket>, Vec<Bucket>) {
    let mut tpm = Vec::new();
    let mut rpm = Vec::new();
    match &key_info.user {
        Some(user) => {
            let bucket = user_bucket(&user.user_id);
            if let Some(t) = user.tpm_limit {
                tpm.push((bucket.clone(), t, "user"));
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
    (tpm, rpm)
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

    let (tpm_buckets, rpm_buckets) = buckets(&key_info, default_rpm);

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

    for (bucket, limit, scope) in &rpm_buckets {
        let limiter = rate_state.get_limiter(bucket, *limit).await;
        if let Err(not_until) = limiter.check() {
            let retry_after = not_until.wait_time_from(DefaultClock::default().now());
            crate::observability::metrics::record_rate_limited("rpm", scope);
            return Err(RateLimitError {
                retry_after_seconds: retry_after.as_secs().max(1),
                kind: "rpm",
            });
        }
    }

    Ok(next.run(request).await)
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
        });
        info
    }

    #[test]
    fn user_bucket_uses_default_and_key_sub_limit_is_optional() {
        let (tpm, rpm) = buckets(&principal(None, None), 100);
        assert_eq!(tpm, vec![("user:u1".to_string(), 5000, "user")]);
        assert_eq!(rpm, vec![("user:u1".to_string(), 100, "user")]);

        let (_, rpm) = buckets(&principal(Some(30), Some(5)), 100);
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
        let (_, rpm) = buckets(&info, 100);
        assert_eq!(rpm, vec![("k1".to_string(), 100, "key")]);
    }

    #[test]
    fn limiter_key_changes_with_rpm() {
        assert_ne!(limiter_cache_key("k", 10), limiter_cache_key("k", 20));
    }
}
