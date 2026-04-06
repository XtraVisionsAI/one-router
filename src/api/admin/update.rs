//! Admin API: Self-update management
//!
//! GET  /admin/api/update       — get cached update status
//! POST /admin/api/update/check — trigger immediate version check
//! POST /admin/api/update       — download and apply update

use axum::{extract::State, http::StatusCode, response::IntoResponse, Json};
use serde_json::json;

use crate::server::state::AppState;

/// GET /admin/api/update — return cached update info.
pub async fn get_update_status(State(state): State<AppState>) -> impl IntoResponse {
    let info = state.update_service.info().await;
    (StatusCode::OK, Json(json!(info)))
}

/// POST /admin/api/update/check — trigger immediate check against GitHub Releases.
pub async fn check_for_update(State(state): State<AppState>) -> impl IntoResponse {
    match state.update_service.check_latest().await {
        Ok(info) => (StatusCode::OK, Json(json!(info))),
        Err(e) => (
            StatusCode::BAD_GATEWAY,
            Json(json!({
                "error": format!("Update check failed: {e}")
            })),
        ),
    }
}

/// POST /admin/api/update — download, verify, and apply the latest update.
pub async fn trigger_update(State(state): State<AppState>) -> impl IntoResponse {
    // Ensure we have checked for updates first
    let info = state.update_service.info().await;
    if !info.update_available {
        // Try a fresh check
        if let Err(e) = state.update_service.check_latest().await {
            return (
                StatusCode::BAD_GATEWAY,
                Json(json!({ "error": format!("Update check failed: {e}") })),
            );
        }
        let info = state.update_service.info().await;
        if !info.update_available {
            return (
                StatusCode::OK,
                Json(json!({
                    "message": "Already up to date",
                    "current_version": info.current_version,
                })),
            );
        }
    }

    match state.update_service.download_and_apply().await {
        Ok(()) => {
            let info = state.update_service.info().await;
            (
                StatusCode::OK,
                Json(json!({
                    "message": "Update applied successfully. Restart to activate.",
                    "previous_version": info.current_version,
                    "new_version": info.latest_version,
                })),
            )
        }
        Err(e) => {
            let msg = format!("Update failed: {e}");
            state.update_service.record_failure(&msg).await;
            (
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(json!({ "error": msg })),
            )
        }
    }
}
