//! Admin API: LiteLLM pricing sync + model catalog import
//!
//! GET  /admin/api/pricing/sync — last sync summary (cached in AppState)
//! POST /admin/api/pricing/sync?dry_run=&overwrite_manual= — run a sync now
//! GET  /admin/api/pricing/models?provider=&q= — browse importable LiteLLM entries
//! POST /admin/api/pricing/import — create mappings from selected entries

use axum::{
    extract::{Query, State},
    http::StatusCode,
    response::IntoResponse,
    Json,
};
use serde::Deserialize;
use serde_json::json;

use crate::server::state::AppState;
use crate::services::litellm_catalog::{self, ImportItem};
use crate::services::pricing_sync::{self, SyncOptions, DEFAULT_PRICING_SYNC_URL};

/// Resolve the LiteLLM table URL from settings (empty → default).
async fn resolve_table_url(state: &AppState) -> String {
    state
        .database
        .system_settings()
        .get_setting("pricing_sync_url")
        .await
        .ok()
        .flatten()
        .map(|s| s.value)
        .filter(|v| !v.is_empty())
        .unwrap_or_else(|| DEFAULT_PRICING_SYNC_URL.to_string())
}

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
    let url = resolve_table_url(&state).await;

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

// ============================================================================
// Model catalog import
// ============================================================================

#[derive(Debug, Deserialize)]
pub struct ModelsQuery {
    pub provider: String,
    /// Case-insensitive substring filter on the LiteLLM key.
    #[serde(default)]
    pub q: String,
}

/// GET /admin/api/pricing/models — browse importable LiteLLM entries for a provider.
pub async fn list_models(
    State(state): State<AppState>,
    Query(query): Query<ModelsQuery>,
) -> impl IntoResponse {
    let url = resolve_table_url(&state).await;
    let data = match litellm_catalog::fetch_table_cached(&url).await {
        Ok(d) => d,
        Err(e) => {
            return (
                StatusCode::BAD_GATEWAY,
                Json(json!({ "error": format!("Failed to fetch LiteLLM table: {e}") })),
            )
                .into_response()
        }
    };
    let existing = match state.database.model_mapping().list_mappings().await {
        Ok(m) => m,
        Err(e) => {
            return (
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(json!({ "error": format!("Failed to list mappings: {e}") })),
            )
                .into_response()
        }
    };
    match litellm_catalog::list_candidates(&data, &query.provider, &query.q, &existing) {
        Ok(candidates) => (
            StatusCode::OK,
            Json(json!({ "object": "list", "data": candidates })),
        )
            .into_response(),
        Err(e) => (StatusCode::BAD_REQUEST, Json(json!({ "error": e }))).into_response(),
    }
}

#[derive(Debug, Deserialize)]
pub struct ImportRequest {
    pub provider: String,
    pub items: Vec<ImportItem>,
}

/// POST /admin/api/pricing/import — create mappings from selected LiteLLM entries.
pub async fn import_models(
    State(state): State<AppState>,
    Json(body): Json<ImportRequest>,
) -> impl IntoResponse {
    if body.items.is_empty() {
        return (
            StatusCode::BAD_REQUEST,
            Json(json!({ "error": "items must not be empty" })),
        )
            .into_response();
    }
    let url = resolve_table_url(&state).await;
    let data = match litellm_catalog::fetch_table_cached(&url).await {
        Ok(d) => d,
        Err(e) => {
            return (
                StatusCode::BAD_GATEWAY,
                Json(json!({ "error": format!("Failed to fetch LiteLLM table: {e}") })),
            )
                .into_response()
        }
    };
    match litellm_catalog::import_models(
        state.database.clone(),
        state.model_mapping.clone(),
        &data,
        &body.provider,
        &body.items,
    )
    .await
    {
        Ok(summary) => (StatusCode::OK, Json(json!(summary))).into_response(),
        Err(e) => (
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(json!({ "error": e })),
        )
            .into_response(),
    }
}
