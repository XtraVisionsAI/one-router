//! Prometheus metrics.
//!
//! A single process-global [`Metrics`] registry, initialized lazily on first
//! use (mirroring the `OnceLock` pattern used elsewhere in the codebase). The
//! business path records token/cost/request counters from
//! [`crate::services::usage_tracker::UsageTracker::record_usage`] — the one
//! place that already has provider, protocol, model, usage and success — and an
//! HTTP middleware records request-duration for every route.
//!
//! **Label cardinality:** labels are restricted to bounded dimensions
//! (`provider`, `protocol`, `model`, `direction`, `status`). The API key is
//! deliberately **not** a label — an unbounded, high-cardinality, and sensitive
//! dimension. (The reference implementation labels token counters by API key;
//! we intentionally do not copy that.)

use prometheus::{
    CounterVec, Encoder, HistogramOpts, HistogramVec, IntCounterVec, IntGauge, IntGaugeVec, Opts,
    Registry, TextEncoder,
};
use std::sync::OnceLock;

/// Process-global metrics registry.
static METRICS: OnceLock<Metrics> = OnceLock::new();

/// All collectors plus the registry they are registered against.
struct Metrics {
    registry: Registry,
    /// Business requests, labeled by provider, protocol and outcome.
    requests_total: IntCounterVec,
    /// Token counters, labeled by provider, model and direction.
    tokens_total: IntCounterVec,
    /// Cumulative cost in USD, labeled by provider and model.
    cost_usd_total: CounterVec,
    /// Failover switches, labeled by the from/to provider.
    failover_total: IntCounterVec,
    /// HTTP request duration in seconds, labeled by status class (2xx/4xx/5xx).
    http_request_duration: HistogramVec,
    /// Requests currently being processed (in-flight), across all routes.
    inflight_requests: IntGauge,
    /// Authentication failures, labeled by reason.
    auth_failures_total: IntCounterVec,
}

impl Metrics {
    fn new() -> Self {
        let registry = Registry::new();

        let requests_total = IntCounterVec::new(
            Opts::new(
                "onerouter_requests_total",
                "Total business requests recorded, by provider/protocol/status",
            ),
            &["provider", "protocol", "status"],
        )
        .expect("valid metric");

        let tokens_total = IntCounterVec::new(
            Opts::new(
                "onerouter_tokens_total",
                "Total tokens processed, by provider/model/direction",
            ),
            &["provider", "model", "direction"],
        )
        .expect("valid metric");

        let cost_usd_total = CounterVec::new(
            Opts::new(
                "onerouter_cost_usd_total",
                "Cumulative estimated cost in USD, by provider/model",
            ),
            &["provider", "model"],
        )
        .expect("valid metric");

        let failover_total = IntCounterVec::new(
            Opts::new(
                "onerouter_failover_total",
                "Credential-exhaustion failover switches, by from/to provider",
            ),
            &["from", "to"],
        )
        .expect("valid metric");

        let http_request_duration = HistogramVec::new(
            HistogramOpts::new(
                "onerouter_http_request_duration_seconds",
                "HTTP request duration in seconds, by status class",
            )
            .buckets(vec![
                0.05, 0.1, 0.25, 0.5, 1.0, 2.5, 5.0, 10.0, 30.0, 60.0, 120.0, 300.0,
            ]),
            &["status"],
        )
        .expect("valid metric");

        let inflight_requests = IntGauge::new(
            "onerouter_inflight_requests",
            "Requests currently being processed (in-flight)",
        )
        .expect("valid metric");

        let auth_failures_total = IntCounterVec::new(
            Opts::new(
                "onerouter_auth_failures_total",
                "Authentication failures, by reason",
            ),
            &["reason"],
        )
        .expect("valid metric");

        let build_info = IntGaugeVec::new(
            Opts::new(
                "onerouter_build_info",
                "Build info (always 1); version carried as a label",
            ),
            &["version"],
        )
        .expect("valid metric");
        // Fixed value 1; the version label carries the useful information.
        build_info
            .with_label_values(&[env!("CARGO_PKG_VERSION")])
            .set(1);

        registry
            .register(Box::new(requests_total.clone()))
            .expect("register requests_total");
        registry
            .register(Box::new(tokens_total.clone()))
            .expect("register tokens_total");
        registry
            .register(Box::new(cost_usd_total.clone()))
            .expect("register cost_usd_total");
        registry
            .register(Box::new(failover_total.clone()))
            .expect("register failover_total");
        registry
            .register(Box::new(http_request_duration.clone()))
            .expect("register http_request_duration");
        registry
            .register(Box::new(inflight_requests.clone()))
            .expect("register inflight_requests");
        registry
            .register(Box::new(auth_failures_total.clone()))
            .expect("register auth_failures_total");
        // build_info is register-and-forget: the registry holds the clone, the
        // value never changes, and nothing reads it back.
        registry
            .register(Box::new(build_info))
            .expect("register build_info");

        Self {
            registry,
            requests_total,
            tokens_total,
            cost_usd_total,
            failover_total,
            http_request_duration,
            inflight_requests,
            auth_failures_total,
        }
    }
}

fn metrics() -> &'static Metrics {
    METRICS.get_or_init(Metrics::new)
}

/// Record one completed business request (provider/protocol + success flag).
pub fn record_request(provider: &str, protocol: &str, success: bool) {
    let status = if success { "success" } else { "error" };
    metrics()
        .requests_total
        .with_label_values(&[provider, protocol, status])
        .inc();
}

/// Record token counts for a completed request. Zero-valued directions are
/// skipped so cache directions do not create noise for non-caching backends.
pub fn record_tokens(
    provider: &str,
    model: &str,
    input: i64,
    output: i64,
    cache_read: i64,
    cache_write: i64,
) {
    let t = &metrics().tokens_total;
    for (direction, count) in [
        ("input", input),
        ("output", output),
        ("cache_read", cache_read),
        ("cache_write", cache_write),
    ] {
        if count > 0 {
            t.with_label_values(&[provider, model, direction])
                .inc_by(count as u64);
        }
    }
}

/// Add estimated cost (USD) for a completed request.
pub fn record_cost(provider: &str, model: &str, cost: f64) {
    if cost > 0.0 {
        metrics()
            .cost_usd_total
            .with_label_values(&[provider, model])
            .inc_by(cost);
    }
}

/// Record one credential-exhaustion failover switch (primary → backup provider).
pub fn record_failover(from_provider: &str, to_provider: &str) {
    metrics()
        .failover_total
        .with_label_values(&[from_provider, to_provider])
        .inc();
}

/// Observe an HTTP request duration, bucketed by status class (2xx/4xx/5xx).
pub fn observe_http(status: u16, elapsed_secs: f64) {
    let class = match status {
        100..=199 => "1xx",
        200..=299 => "2xx",
        300..=399 => "3xx",
        400..=499 => "4xx",
        _ => "5xx",
    };
    metrics()
        .http_request_duration
        .with_label_values(&[class])
        .observe(elapsed_secs);
}

/// Increment the in-flight request gauge (call on request entry).
pub fn inc_inflight() {
    metrics().inflight_requests.inc();
}

/// Decrement the in-flight request gauge (call on request completion).
pub fn dec_inflight() {
    metrics().inflight_requests.dec();
}

/// Record one authentication failure, bucketed by reason.
pub fn record_auth_failure(reason: &str) {
    metrics()
        .auth_failures_total
        .with_label_values(&[reason])
        .inc();
}

/// Encode all metrics in the Prometheus text exposition format.
pub fn gather() -> String {
    let m = metrics();
    let mut buf = Vec::new();
    let encoder = TextEncoder::new();
    let families = m.registry.gather();
    // Encoding to an in-memory Vec of valid UTF-8 metric names cannot fail in
    // practice; on the off chance it does, return what was written so far.
    let _ = encoder.encode(&families, &mut buf);
    String::from_utf8(buf).unwrap_or_default()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_gather_contains_recorded_metrics() {
        record_request("bedrock", "anthropic", true);
        record_request("bedrock", "anthropic", false);
        record_tokens("bedrock", "claude-x", 100, 50, 10, 0);
        record_cost("bedrock", "claude-x", 0.0123);
        record_failover("bedrock", "anthropic");
        observe_http(200, 0.42);
        inc_inflight();
        dec_inflight();
        record_auth_failure("invalid_key");

        let out = gather();
        assert!(out.contains("onerouter_requests_total"));
        assert!(out.contains("onerouter_tokens_total"));
        assert!(out.contains("onerouter_cost_usd_total"));
        assert!(out.contains("onerouter_failover_total"));
        assert!(out.contains("onerouter_http_request_duration_seconds"));
        assert!(out.contains("onerouter_inflight_requests"));
        assert!(out.contains("onerouter_auth_failures_total"));
        assert!(out.contains("reason=\"invalid_key\""));
        // build_info is always present with the crate version label.
        assert!(out.contains("onerouter_build_info"));
        assert!(out.contains(concat!("version=\"", env!("CARGO_PKG_VERSION"), "\"")));
        // provider/status labels are present; api_key is never a label.
        assert!(out.contains("provider=\"bedrock\""));
        assert!(!out.contains("api_key"));
    }

    #[test]
    fn test_zero_token_directions_skipped() {
        // All-zero token counts for a unique model must not emit any series.
        record_tokens("gemini", "zzz-all-zero-model", 0, 0, 0, 0);
        assert!(!gather().contains("zzz-all-zero-model"));
    }
}
