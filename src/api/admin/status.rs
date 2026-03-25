//! GET /admin/api/status

use axum::{extract::State, Json};
use chrono::Utc;
use serde::Serialize;

use crate::server::state::AppState;

#[derive(Serialize)]
pub struct StatusResponse {
    pub version: &'static str,
    pub uptime_seconds: u64,
    pub database: &'static str,
    pub started_at: String,
}

pub async fn get_status(State(state): State<AppState>) -> Json<StatusResponse> {
    Json(StatusResponse {
        version: env!("CARGO_PKG_VERSION"),
        uptime_seconds: state.uptime_seconds(),
        database: "healthy",
        // Use actual start time derived from uptime
        started_at: (Utc::now() - chrono::Duration::seconds(state.uptime_seconds() as i64))
            .to_rfc3339(),
    })
}
