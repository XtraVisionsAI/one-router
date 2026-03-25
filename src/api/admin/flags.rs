//! Admin API — feature flag management
//!
//! GET /admin/api/flags        → list all feature flags
//! PUT /admin/api/flags/:name  → update flag (set enabled)

use axum::{
    extract::{Path, State},
    http::StatusCode,
    response::IntoResponse,
    Json,
};
use chrono::Utc;
use serde::{Deserialize, Serialize};

use crate::database::models::FeatureFlagRecord;
use crate::schemas::anthropic::ErrorResponse;
use crate::server::state::AppState;

// ============================================================================
// Request / Response types
// ============================================================================

#[derive(Debug, Serialize)]
pub struct FlagListResponse {
    pub object: &'static str,
    pub data: Vec<FeatureFlagRecord>,
}

#[derive(Debug, Deserialize)]
pub struct UpdateFlagRequest {
    pub enabled: bool,
}

// ============================================================================
// Handlers
// ============================================================================

/// GET /admin/api/flags
pub async fn list_flags(State(state): State<AppState>) -> impl IntoResponse {
    match state.database.feature_flags().list_flags().await {
        Ok(records) => (
            StatusCode::OK,
            Json(FlagListResponse {
                object: "list",
                data: records,
            }),
        )
            .into_response(),
        Err(e) => {
            tracing::error!(error = %e, "Failed to list feature flags");
            (
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(ErrorResponse::new(
                    "api_error",
                    "Failed to retrieve feature flags",
                )),
            )
                .into_response()
        }
    }
}

/// PUT /admin/api/flags/:name
pub async fn update_flag(
    State(state): State<AppState>,
    Path(name): Path<String>,
    Json(body): Json<UpdateFlagRequest>,
) -> impl IntoResponse {
    // Fetch existing flag (or create a new one if it doesn't exist yet)
    let existing = match state.database.feature_flags().get_flag(&name).await {
        Ok(Some(r)) => r,
        Ok(None) => {
            // Flag doesn't exist — create it on the fly
            FeatureFlagRecord {
                name: name.clone(),
                enabled: body.enabled,
                description: String::new(),
                created_at: Utc::now().timestamp(),
                updated_at: None,
            }
        }
        Err(e) => {
            tracing::error!(error = %e, "Failed to fetch feature flag");
            return (
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(ErrorResponse::new(
                    "api_error",
                    "Failed to retrieve feature flag",
                )),
            )
                .into_response();
        }
    };

    let record = FeatureFlagRecord {
        enabled: body.enabled,
        ..existing
    };

    match state.database.feature_flags().upsert_flag(&record).await {
        Ok(()) => (StatusCode::OK, Json(record)).into_response(),
        Err(e) => {
            tracing::error!(error = %e, "Failed to update feature flag");
            (
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(ErrorResponse::new(
                    "api_error",
                    "Failed to update feature flag",
                )),
            )
                .into_response()
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn update_flag_request_deserializes() {
        let json = r#"{"enabled":true}"#;
        let req: UpdateFlagRequest = serde_json::from_str(json).unwrap();
        assert!(req.enabled);

        let json2 = r#"{"enabled":false}"#;
        let req2: UpdateFlagRequest = serde_json::from_str(json2).unwrap();
        assert!(!req2.enabled);
    }
}
