//! GET /admin/api/status

use axum::{extract::State, Json};
use chrono::Utc;
use serde::Serialize;

use crate::server::state::AppState;

#[derive(Serialize)]
pub struct StatusResponse {
    pub version: &'static str,
    pub uptime_seconds: u64,
    pub database: String,
    pub started_at: String,
}

pub async fn get_status(State(state): State<AppState>) -> Json<StatusResponse> {
    let uptime = state.uptime_seconds();

    let database_status = match state.database.system_settings().list_settings().await {
        Ok(_) => "healthy".to_string(),
        Err(_) => "unhealthy".to_string(),
    };

    Json(StatusResponse {
        version: env!("CARGO_PKG_VERSION"),
        uptime_seconds: uptime,
        database: database_status,
        started_at: (Utc::now() - chrono::Duration::seconds(uptime as i64)).to_rfc3339(),
    })
}
