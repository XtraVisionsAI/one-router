//! Admin API: LiteLLM pricing sync
//!
//! GET  /admin/api/pricing/sync — last sync summary (cached in AppState)
//! POST /admin/api/pricing/sync?dry_run=&overwrite_manual= — run a sync now

use axum::{
    extract::{Query, State},
    http::StatusCode,
    response::IntoResponse,
    Json,
};
use serde::Deserialize;
use serde_json::json;

use crate::server::state::AppState;
use crate::services::pricing_sync::{self, SyncOptions, DEFAULT_PRICING_SYNC_URL};

#[derive(Debug, Deserialize)]
pub struct SyncQuery {
    /// Compute the plan without writing.
    #[serde(default)]
    pub dry_run: bool,
    /// Also overwrite rows pinned as `manual`.
    #[serde(default)]
    pub overwrite_manual: bool,
}

/// GET /admin/api/pricing/sync — return the most recent sync summary (or null).
pub async fn get_sync_status(State(state): State<AppState>) -> impl IntoResponse {
    let status = state.pricing_sync_status.read().await.clone();
    (StatusCode::OK, Json(json!({ "last_sync": status })))
}

/// POST /admin/api/pricing/sync — fetch the LiteLLM table and reconcile prices.
pub async fn trigger_sync(
    State(state): State<AppState>,
    Query(query): Query<SyncQuery>,
) -> impl IntoResponse {
    let url = state
        .database
        .system_settings()
        .get_setting("pricing_sync_url")
        .await
        .ok()
        .flatten()
        .map(|s| s.value)
        .filter(|v| !v.is_empty())
        .unwrap_or_else(|| DEFAULT_PRICING_SYNC_URL.to_string());

    let opts = SyncOptions {
        dry_run: query.dry_run,
        overwrite_manual: query.overwrite_manual,
    };

    match pricing_sync::run_sync(
        state.database.clone(),
        state.model_mapping.clone(),
        &url,
        opts,
    )
    .await
    {
        Ok(summary) => {
            // Cache the summary for GET (skip dry runs — they don't reflect real state).
            if !summary.dry_run {
                *state.pricing_sync_status.write().await = Some(summary.clone());
            }
            (StatusCode::OK, Json(json!(summary))).into_response()
        }
        Err(e) => (
            StatusCode::BAD_GATEWAY,
            Json(json!({ "error": format!("Pricing sync failed: {e}") })),
        )
            .into_response(),
    }
}
