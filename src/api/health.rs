//! Health check endpoints

use axum::{extract::State, http::StatusCode, Json};
use serde::Serialize;

use crate::server::state::AppState;

#[derive(Serialize)]
pub struct HealthResponse {
    pub status: String,
    pub version: String,
    pub uptime_seconds: u64,
}

#[derive(Serialize)]
pub struct ReadinessResponse {
    pub ready: bool,
    pub storage: bool,
}

#[derive(Serialize)]
pub struct LivenessResponse {
    pub alive: bool,
}

pub async fn health_check(State(state): State<AppState>) -> Json<HealthResponse> {
    Json(HealthResponse {
        status: "healthy".to_string(),
        version: state.settings.app_version.clone(),
        uptime_seconds: state.uptime_seconds(),
    })
}

pub async fn readiness(State(state): State<AppState>) -> (StatusCode, Json<ReadinessResponse>) {
    let storage_healthy = state.database.health_check().await;

    let ready = storage_healthy;
    let status = if ready {
        StatusCode::OK
    } else {
        StatusCode::SERVICE_UNAVAILABLE
    };

    (
        status,
        Json(ReadinessResponse {
            ready,
            storage: storage_healthy,
        }),
    )
}

pub async fn liveness() -> Json<LivenessResponse> {
    Json(LivenessResponse { alive: true })
}

/// Prometheus scrape endpoint. Returns the text exposition format.
///
/// Unauthenticated by design (standard for Prometheus scrape targets); protect
/// at the network layer. It exposes only aggregate counters (tokens, cost,
/// request counts) with bounded labels — never API keys or request content.
pub async fn metrics() -> (StatusCode, [(&'static str, &'static str); 1], String) {
    let body = crate::observability::metrics::gather();
    (
        StatusCode::OK,
        [("content-type", "text/plain; version=0.0.4")],
        body,
    )
}
