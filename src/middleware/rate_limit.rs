//! Rate limiting middleware

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
use std::sync::Arc;
use std::time::Duration;

use crate::middleware::auth::ApiKeyInfo;
use crate::schemas::anthropic::ErrorResponse;

type KeyedRateLimiter = RateLimiter<NotKeyed, InMemoryState, DefaultClock>;

#[derive(Clone)]
pub struct RateLimitState {
    /// None means rate limiting is globally disabled (per-key limits also ignored).
    pub default_rpm: Option<u32>,
    pub limiters: Cache<String, Arc<KeyedRateLimiter>>,
}

impl RateLimitState {
    pub fn new(default_rpm: Option<u32>) -> Self {
        let limiters = Cache::builder()
            .max_capacity(10_000)
            .time_to_idle(Duration::from_secs(600))
            .build();

        Self {
            default_rpm,
            limiters,
        }
    }

    pub async fn get_limiter(&self, key_info: &ApiKeyInfo) -> Arc<KeyedRateLimiter> {
        let cache_key = key_info.api_key.clone();

        if let Some(limiter) = self.limiters.get(&cache_key).await {
            return limiter;
        }

        let rpm = self.default_rpm.unwrap_or(100);
        let rate_limit = key_info.effective_rate_limit(rpm);
        let limiter = Arc::new(self.create_limiter(rate_limit));
        self.limiters.insert(cache_key, limiter.clone()).await;
        limiter
    }

    fn create_limiter(&self, requests_per_minute: u32) -> KeyedRateLimiter {
        let rpm = requests_per_minute.max(1);
        let replenish_period = Duration::from_secs(60) / rpm;
        let quota = Quota::with_period(replenish_period)
            .unwrap()
            .allow_burst(NonZeroU32::new(rpm).unwrap());

        RateLimiter::direct(quota)
    }
}

#[derive(Debug)]
pub struct RateLimitError {
    pub retry_after_seconds: u64,
}

impl IntoResponse for RateLimitError {
    fn into_response(self) -> Response {
        let error_response = ErrorResponse::new(
            "rate_limit_error",
            format!(
                "Rate limit exceeded. Retry after {} seconds.",
                self.retry_after_seconds
            ),
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

pub async fn rate_limit(
    State(rate_state): State<RateLimitState>,
    request: Request<Body>,
    next: Next,
) -> Result<Response, RateLimitError> {
    // Globally disabled — bypass completely, including per-key limits
    if rate_state.default_rpm.is_none() {
        return Ok(next.run(request).await);
    }

    let key_info = request.extensions().get::<ApiKeyInfo>().cloned();

    let Some(key_info) = key_info else {
        return Ok(next.run(request).await);
    };

    if key_info.bypass_rate_limit() {
        return Ok(next.run(request).await);
    }

    let limiter = rate_state.get_limiter(&key_info).await;

    match limiter.check() {
        Ok(_) => Ok(next.run(request).await),
        Err(not_until) => {
            let retry_after = not_until.wait_time_from(DefaultClock::default().now());
            let retry_after_seconds = retry_after.as_secs().max(1);
            Err(RateLimitError {
                retry_after_seconds,
            })
        }
    }
}
