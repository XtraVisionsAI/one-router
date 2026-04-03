//! Admin API — system settings management
//!
//! GET /admin/api/settings        → list all settings
//! PUT /admin/api/settings/:key   → upsert a setting

use axum::{
    extract::{Path, State},
    http::StatusCode,
    response::IntoResponse,
    Json,
};
use serde::{Deserialize, Serialize};

use crate::database::models::SystemSettingRecord;
use crate::schemas::anthropic::ErrorResponse;
use crate::server::state::AppState;

// ============================================================================
// Request / Response types
// ============================================================================

#[derive(Debug, Serialize)]
pub struct SettingsListResponse {
    pub object: &'static str,
    pub data: Vec<SystemSettingRecord>,
}

#[derive(Debug, Deserialize)]
pub struct UpsertSettingRequest {
    pub value: String,
    #[serde(default)]
    pub description: String,
}

// ============================================================================
// Known setting keys and validation
// ============================================================================

/// Validate the value for known keys. Returns Err with a human-readable message
/// if validation fails, Ok(()) otherwise.
fn validate_setting(key: &str, value: &str) -> Result<(), &'static str> {
    match key {
        "prompt_cache" => {
            if matches!(value, "" | "disable" | "passthrough" | "5m" | "1h") {
                Ok(())
            } else {
                Err("prompt_cache must be 'disable', 'passthrough', '5m', or '1h'")
            }
        }
        _ => Ok(()), // unknown keys are accepted as-is
    }
}

// ============================================================================
// Handlers
// ============================================================================

/// GET /admin/api/settings
pub async fn list_settings(State(state): State<AppState>) -> impl IntoResponse {
    match state.database.system_settings().list_settings().await {
        Ok(records) => (
            StatusCode::OK,
            Json(SettingsListResponse {
                object: "list",
                data: records,
            }),
        )
            .into_response(),
        Err(e) => {
            tracing::error!(error = %e, "Failed to list system settings");
            (
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(ErrorResponse::new(
                    "api_error",
                    "Failed to retrieve settings",
                )),
            )
                .into_response()
        }
    }
}

/// PUT /admin/api/settings/:key
pub async fn upsert_setting(
    State(state): State<AppState>,
    Path(key): Path<String>,
    Json(body): Json<UpsertSettingRequest>,
) -> impl IntoResponse {
    if let Err(msg) = validate_setting(&key, &body.value) {
        return (
            StatusCode::BAD_REQUEST,
            Json(ErrorResponse::new("invalid_request_error", msg)),
        )
            .into_response();
    }

    let record = SystemSettingRecord {
        key: key.clone(),
        value: body.value,
        description: body.description,
        updated_at: None,
    };

    match state
        .database
        .system_settings()
        .upsert_setting(&record)
        .await
    {
        Ok(()) => {
            // Return the freshly saved record
            match state.database.system_settings().get_setting(&key).await {
                Ok(Some(saved)) => (StatusCode::OK, Json(saved)).into_response(),
                _ => StatusCode::OK.into_response(),
            }
        }
        Err(e) => {
            tracing::error!(error = %e, key = %key, "Failed to upsert system setting");
            (
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(ErrorResponse::new("api_error", "Failed to save setting")),
            )
                .into_response()
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn validate_prompt_cache_valid_values() {
        assert!(validate_setting("prompt_cache", "").is_ok());
        assert!(validate_setting("prompt_cache", "disable").is_ok());
        assert!(validate_setting("prompt_cache", "passthrough").is_ok());
        assert!(validate_setting("prompt_cache", "5m").is_ok());
        assert!(validate_setting("prompt_cache", "1h").is_ok());
    }

    #[test]
    fn validate_prompt_cache_invalid_values() {
        assert!(validate_setting("prompt_cache", "2h").is_err());
        assert!(validate_setting("prompt_cache", "enable").is_err());
    }

    #[test]
    fn validate_unknown_key_passes() {
        assert!(validate_setting("some_future_key", "any_value").is_err() == false);
    }
}
