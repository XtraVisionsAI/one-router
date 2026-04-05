//! Admin API — backend configuration management
//!
//! GET    /admin/api/backends           → list all backends (config masked)
//! POST   /admin/api/backends           → create backend (config encrypted)
//! PUT    /admin/api/backends/:name     → update backend (config encrypted if provided)
//! DELETE /admin/api/backends/:name     → delete backend
//! PUT    /admin/api/backends/:name/toggle → toggle enabled flag
//! GET    /admin/api/backends/:name/config → return decrypted config for editing

use axum::{
    extract::{Path, State},
    http::StatusCode,
    response::IntoResponse,
    Json,
};
use chrono::Utc;
use serde::{Deserialize, Serialize};
use serde_json::Value;

use crate::database::models::BackendRecord;
use crate::schemas::anthropic::ErrorResponse;
use crate::server::state::AppState;

// ============================================================================
// Response types
// ============================================================================

/// Non-sensitive summary of a backend (config credentials are masked)
#[derive(Debug, Serialize)]
pub struct BackendSummary {
    pub name: String,
    pub backend_type: String,
    pub enabled: bool,
    pub priority: i32,
    pub health_status: String,
    pub config_summary: Value,
}

impl BackendSummary {
    fn from_record(r: &BackendRecord, health: &str) -> Self {
        Self {
            name: r.name.clone(),
            backend_type: r.backend_type.clone(),
            enabled: r.enabled,
            priority: r.priority,
            health_status: health.to_string(),
            config_summary: make_config_summary(&r.backend_type, &r.config),
        }
    }
}

/// Produce a non-sensitive config summary from the stored (possibly encrypted) config.
/// Sensitive credential values are replaced with "***".
fn make_config_summary(backend_type: &str, config: &str) -> Value {
    // If config is encrypted, we can't parse it — return a placeholder
    if config.starts_with("encrypted:") {
        return serde_json::json!({
            "type": backend_type,
            "encrypted": true
        });
    }

    // Try to parse as JSON and extract non-sensitive fields
    let Ok(val) = serde_json::from_str::<Value>(config) else {
        return serde_json::json!({ "type": backend_type });
    };

    match backend_type {
        "gemini" | "anthropic" | "openai" => {
            let key_count = val
                .get("api_keys")
                .and_then(|v| v.as_array())
                .map(|a| a.len())
                .unwrap_or(0);
            serde_json::json!({
                "type": backend_type,
                "key_count": key_count,
                "base_url": val.get("base_url").unwrap_or(&Value::Null)
            })
        }
        "bedrock" => {
            let auth_mode = if val.get("profile").is_some_and(|v| !v.is_null()) {
                "profile"
            } else if val.get("access_key_id").is_some_and(|v| !v.is_null()) {
                "access_key"
            } else {
                "default_chain"
            };
            serde_json::json!({
                "type": "bedrock",
                "region": val.get("region").unwrap_or(&Value::Null),
                "auth_mode": auth_mode
            })
        }
        _ => serde_json::json!({ "type": backend_type }),
    }
}

/// Get the live health status for a specific backend by name and type,
/// querying the in-memory credential pool for that credential's state.
fn backend_health_status(state: &AppState, name: &str, backend_type: &str) -> String {
    match backend_type {
        "bedrock" => state
            .bedrock
            .as_ref()
            .and_then(|svc| svc.credential_health(name))
            .unwrap_or_else(|| "not loaded".to_string()),
        "gemini" => state
            .gemini_service
            .as_ref()
            .and_then(|svc| svc.credential_health(name))
            .unwrap_or_else(|| "not loaded".to_string()),
        "anthropic" => state
            .anthropic_service
            .as_ref()
            .and_then(|svc| svc.credential_health(name))
            .unwrap_or_else(|| "not loaded".to_string()),
        "openai" => state
            .openai_service
            .as_ref()
            .and_then(|svc| svc.credential_health(name))
            .unwrap_or_else(|| "not loaded".to_string()),
        _ => "unknown".to_string(),
    }
}

#[derive(Debug, Serialize)]
pub struct BackendListResponse {
    pub object: &'static str,
    pub data: Vec<BackendSummary>,
}

#[derive(Debug, Serialize)]
pub struct OkResponse {
    pub ok: bool,
}

// ============================================================================
// Request types
// ============================================================================

#[derive(Debug, Deserialize)]
pub struct UpsertBackendRequest {
    pub name: String,
    pub backend_type: String,
    #[serde(default = "default_true")]
    pub enabled: bool,
    #[serde(default)]
    pub priority: i32,
    /// Full config as a JSON object. If omitted on PUT, existing config is kept.
    pub config: Option<Value>,
}

fn default_true() -> bool {
    true
}

// ============================================================================
// Handlers
// ============================================================================

/// GET /admin/api/backends
pub async fn list_backends(State(state): State<AppState>) -> impl IntoResponse {
    match state.database.backends().list_all_backends().await {
        Ok(records) => {
            let data = records
                .iter()
                .map(|r| {
                    let health = backend_health_status(&state, &r.name, &r.backend_type);
                    BackendSummary::from_record(r, &health)
                })
                .collect();
            (
                StatusCode::OK,
                Json(BackendListResponse {
                    object: "list",
                    data,
                }),
            )
                .into_response()
        }
        Err(e) => {
            tracing::error!(error = %e, "Failed to list backends");
            (
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(ErrorResponse::new(
                    "api_error",
                    "Failed to retrieve backends",
                )),
            )
                .into_response()
        }
    }
}

/// POST /admin/api/backends
pub async fn create_backend(
    State(state): State<AppState>,
    Json(body): Json<UpsertBackendRequest>,
) -> impl IntoResponse {
    let Some(config_val) = body.config else {
        return (
            StatusCode::BAD_REQUEST,
            Json(ErrorResponse::new(
                "invalid_request_error",
                "config is required when creating a backend",
            )),
        )
            .into_response();
    };

    let config_json = match serde_json::to_string(&config_val) {
        Ok(s) => s,
        Err(e) => {
            tracing::error!(error = %e, "Failed to serialize backend config");
            return (
                StatusCode::BAD_REQUEST,
                Json(ErrorResponse::new(
                    "invalid_request_error",
                    "Invalid config JSON",
                )),
            )
                .into_response();
        }
    };

    let encrypted_config = state.encryptor.encrypt(&config_json);

    let now = Utc::now().timestamp();
    let record = BackendRecord {
        name: body.name.clone(),
        backend_type: body.backend_type.clone(),
        config: encrypted_config,
        enabled: body.enabled,
        priority: body.priority,
        created_at: now,
        updated_at: None,
    };

    match state.database.backends().upsert_backend(&record).await {
        Ok(()) => {
            let health = backend_health_status(&state, &record.name, &record.backend_type);
            (
                StatusCode::CREATED,
                Json(BackendSummary::from_record(&record, &health)),
            )
                .into_response()
        }
        Err(e) => {
            tracing::error!(error = %e, "Failed to create backend");
            (
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(ErrorResponse::new("api_error", "Failed to create backend")),
            )
                .into_response()
        }
    }
}

/// PUT /admin/api/backends/:name
pub async fn update_backend(
    State(state): State<AppState>,
    Path(name): Path<String>,
    Json(body): Json<UpsertBackendRequest>,
) -> impl IntoResponse {
    // Fetch existing record to preserve config if not provided
    let existing = match state.database.backends().get_backend(&name).await {
        Ok(Some(r)) => r,
        Ok(None) => {
            return (
                StatusCode::NOT_FOUND,
                Json(ErrorResponse::new("not_found_error", "Backend not found")),
            )
                .into_response()
        }
        Err(e) => {
            tracing::error!(error = %e, "Failed to fetch backend for update");
            return (
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(ErrorResponse::new(
                    "api_error",
                    "Failed to retrieve backend",
                )),
            )
                .into_response();
        }
    };

    // Encrypt new config if provided, otherwise keep existing
    let config = if let Some(config_val) = body.config {
        match serde_json::to_string(&config_val) {
            Ok(json) => state.encryptor.encrypt(&json),
            Err(e) => {
                tracing::error!(error = %e, "Failed to serialize backend config");
                return (
                    StatusCode::BAD_REQUEST,
                    Json(ErrorResponse::new(
                        "invalid_request_error",
                        "Invalid config JSON",
                    )),
                )
                    .into_response();
            }
        }
    } else {
        existing.config.clone()
    };

    let now = Utc::now().timestamp();
    let record = BackendRecord {
        name: name.clone(),
        backend_type: body.backend_type.clone(),
        config,
        enabled: body.enabled,
        priority: body.priority,
        created_at: existing.created_at,
        updated_at: Some(now),
    };

    match state.database.backends().upsert_backend(&record).await {
        Ok(()) => {
            let health = backend_health_status(&state, &record.name, &record.backend_type);
            (
                StatusCode::OK,
                Json(BackendSummary::from_record(&record, &health)),
            )
                .into_response()
        }
        Err(e) => {
            tracing::error!(error = %e, "Failed to update backend");
            (
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(ErrorResponse::new("api_error", "Failed to update backend")),
            )
                .into_response()
        }
    }
}

/// DELETE /admin/api/backends/:name
pub async fn delete_backend(
    State(state): State<AppState>,
    Path(name): Path<String>,
) -> impl IntoResponse {
    match state.database.backends().delete_backend(&name).await {
        Ok(()) => (StatusCode::OK, Json(OkResponse { ok: true })).into_response(),
        Err(e) => {
            tracing::error!(error = %e, "Failed to delete backend");
            (
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(ErrorResponse::new("api_error", "Failed to delete backend")),
            )
                .into_response()
        }
    }
}

/// PUT /admin/api/backends/:name/toggle — toggle enabled flag
pub async fn toggle_backend(
    State(state): State<AppState>,
    Path(name): Path<String>,
) -> impl IntoResponse {
    let existing = match state.database.backends().get_backend(&name).await {
        Ok(Some(r)) => r,
        Ok(None) => {
            return (
                StatusCode::NOT_FOUND,
                Json(ErrorResponse::new("not_found_error", "Backend not found")),
            )
                .into_response()
        }
        Err(e) => {
            tracing::error!(error = %e, "Failed to fetch backend for toggle");
            return (
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(ErrorResponse::new(
                    "api_error",
                    "Failed to retrieve backend",
                )),
            )
                .into_response();
        }
    };

    let now = Utc::now().timestamp();
    let record = BackendRecord {
        enabled: !existing.enabled,
        updated_at: Some(now),
        ..existing
    };

    match state.database.backends().upsert_backend(&record).await {
        Ok(()) => {
            let health = backend_health_status(&state, &record.name, &record.backend_type);
            (
                StatusCode::OK,
                Json(BackendSummary::from_record(&record, &health)),
            )
                .into_response()
        }
        Err(e) => {
            tracing::error!(error = %e, "Failed to toggle backend");
            (
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(ErrorResponse::new("api_error", "Failed to toggle backend")),
            )
                .into_response()
        }
    }
}

/// GET /admin/api/backends/:name/config — return decrypted config JSON
pub async fn get_backend_config(
    State(state): State<AppState>,
    Path(name): Path<String>,
) -> impl IntoResponse {
    let record = match state.database.backends().get_backend(&name).await {
        Ok(Some(r)) => r,
        Ok(None) => {
            return (
                StatusCode::NOT_FOUND,
                Json(ErrorResponse::new("not_found_error", "Backend not found")),
            )
                .into_response()
        }
        Err(e) => {
            tracing::error!(error = %e, "Failed to fetch backend config");
            return (
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(ErrorResponse::new(
                    "api_error",
                    "Failed to retrieve backend",
                )),
            )
                .into_response();
        }
    };

    let plaintext = match state.encryptor.decrypt(&record.config) {
        Ok(p) => p,
        Err(e) => {
            tracing::error!(error = %e, backend = %name, "Failed to decrypt backend config");
            return (
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(ErrorResponse::new(
                    "api_error",
                    "Failed to decrypt backend config",
                )),
            )
                .into_response();
        }
    };

    let config_val = match serde_json::from_str::<Value>(&plaintext) {
        Ok(v) => v,
        Err(e) => {
            tracing::error!(error = %e, backend = %name, "Decrypted config is not valid JSON");
            return (
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(ErrorResponse::new("api_error", "Config is not valid JSON")),
            )
                .into_response();
        }
    };

    tracing::info!(backend = %name, "Admin accessed decrypted backend config");
    (
        StatusCode::OK,
        Json(serde_json::json!({ "config": config_val })),
    )
        .into_response()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn config_summary_gemini_plaintext() {
        let summary = make_config_summary(
            "gemini",
            r#"{"api_keys":["k1","k2"],"base_url":null,"timeout_seconds":120}"#,
        );
        assert_eq!(summary["type"], "gemini");
        assert_eq!(summary["key_count"], 2);
    }

    #[test]
    fn config_summary_encrypted_is_masked() {
        let summary = make_config_summary("gemini", "encrypted:abc123base64==");
        assert_eq!(summary["type"], "gemini");
        assert_eq!(summary["encrypted"], true);
    }

    #[test]
    fn config_summary_bedrock_auth_mode() {
        let summary = make_config_summary(
            "bedrock",
            r#"{"region":"us-east-1","access_key_id":"AKIA123","secret_access_key":"secret"}"#,
        );
        assert_eq!(summary["auth_mode"], "access_key");
        assert_eq!(summary["region"], "us-east-1");
    }

    #[test]
    fn upsert_request_enabled_defaults_true() {
        let json = r#"{"name":"test","backend_type":"gemini"}"#;
        let req: UpsertBackendRequest = serde_json::from_str(json).unwrap();
        assert!(req.enabled);
        assert_eq!(req.priority, 0);
        assert!(req.config.is_none());
    }
}
