//! Admin API — model mapping management
//!
//! GET    /admin/api/mappings                            → list all mappings
//! POST   /admin/api/mappings                            → create/upsert mapping
//! PUT    /admin/api/mappings/:source_model_id/:provider → update mapping
//! DELETE /admin/api/mappings/:source_model_id/:provider → delete mapping

use axum::{
    extract::{Path, State},
    http::StatusCode,
    response::IntoResponse,
    Json,
};
use chrono::Utc;
use serde::{Deserialize, Serialize};

use crate::database::models::ModelMappingRecord;
use crate::schemas::anthropic::ErrorResponse;
use crate::server::state::AppState;

// ============================================================================
// Response / Request types
// ============================================================================

#[derive(Debug, Serialize)]
pub struct MappingListResponse {
    pub object: &'static str,
    pub data: Vec<ModelMappingRecord>,
}

#[derive(Debug, Serialize)]
pub struct OkResponse {
    pub ok: bool,
}

#[derive(Debug, Deserialize)]
pub struct UpsertMappingRequest {
    pub source_model_id: String,
    pub target_model_id: String,
    pub provider: String,
    #[serde(default)]
    pub display_name: String,
    #[serde(default)]
    pub input_price: f64,
    #[serde(default)]
    pub output_price: f64,
    #[serde(default)]
    pub cache_read_price: f64,
    #[serde(default)]
    pub cache_write_price: f64,
    #[serde(default = "default_priority")]
    pub priority: i32,
    #[serde(default = "default_status")]
    pub status: String,
}

fn default_priority() -> i32 {
    0
}

fn default_status() -> String {
    "active".to_string()
}

#[derive(Debug, Deserialize)]
pub struct MappingPath {
    pub source_model_id: String,
    pub provider: String,
}

// ============================================================================
// Handlers
// ============================================================================

/// GET /admin/api/mappings
pub async fn list_mappings(State(state): State<AppState>) -> impl IntoResponse {
    match state.database.model_mapping().list_mappings().await {
        Ok(records) => (
            StatusCode::OK,
            Json(MappingListResponse {
                object: "list",
                data: records,
            }),
        )
            .into_response(),
        Err(e) => {
            tracing::error!(error = %e, "Failed to list model mappings");
            (
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(ErrorResponse::new(
                    "api_error",
                    "Failed to retrieve model mappings",
                )),
            )
                .into_response()
        }
    }
}

/// POST /admin/api/mappings
pub async fn create_mapping(
    State(state): State<AppState>,
    Json(body): Json<UpsertMappingRequest>,
) -> impl IntoResponse {
    let now = Utc::now().timestamp();
    let record = ModelMappingRecord {
        source_model_id: body.source_model_id,
        target_model_id: body.target_model_id,
        provider: body.provider,
        display_name: body.display_name,
        input_price: body.input_price,
        output_price: body.output_price,
        cache_read_price: body.cache_read_price,
        cache_write_price: body.cache_write_price,
        priority: body.priority,
        status: body.status,
        created_at: now,
        updated_at: None,
    };

    match state.database.model_mapping().upsert_mapping(&record).await {
        Ok(()) => (StatusCode::CREATED, Json(record)).into_response(),
        Err(e) => {
            tracing::error!(error = %e, "Failed to create model mapping");
            (
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(ErrorResponse::new(
                    "api_error",
                    "Failed to create model mapping",
                )),
            )
                .into_response()
        }
    }
}

/// PUT /admin/api/mappings/:source_model_id/:provider
pub async fn update_mapping(
    State(state): State<AppState>,
    Path(path): Path<MappingPath>,
    Json(body): Json<UpsertMappingRequest>,
) -> impl IntoResponse {
    // Fetch existing to preserve created_at
    let existing = match state
        .database
        .model_mapping()
        .get_mapping(&path.source_model_id, &path.provider)
        .await
    {
        Ok(Some(r)) => r,
        Ok(None) => {
            return (
                StatusCode::NOT_FOUND,
                Json(ErrorResponse::new(
                    "not_found_error",
                    "Model mapping not found",
                )),
            )
                .into_response()
        }
        Err(e) => {
            tracing::error!(error = %e, "Failed to fetch model mapping for update");
            return (
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(ErrorResponse::new(
                    "api_error",
                    "Failed to retrieve model mapping",
                )),
            )
                .into_response();
        }
    };

    let now = Utc::now().timestamp();
    let record = ModelMappingRecord {
        source_model_id: path.source_model_id,
        target_model_id: body.target_model_id,
        provider: path.provider,
        display_name: body.display_name,
        input_price: body.input_price,
        output_price: body.output_price,
        cache_read_price: body.cache_read_price,
        cache_write_price: body.cache_write_price,
        priority: body.priority,
        status: body.status,
        created_at: existing.created_at,
        updated_at: Some(now),
    };

    match state.database.model_mapping().upsert_mapping(&record).await {
        Ok(()) => (StatusCode::OK, Json(record)).into_response(),
        Err(e) => {
            tracing::error!(error = %e, "Failed to update model mapping");
            (
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(ErrorResponse::new(
                    "api_error",
                    "Failed to update model mapping",
                )),
            )
                .into_response()
        }
    }
}

/// DELETE /admin/api/mappings/:source_model_id/:provider
pub async fn delete_mapping(
    State(state): State<AppState>,
    Path(path): Path<MappingPath>,
) -> impl IntoResponse {
    match state
        .database
        .model_mapping()
        .delete_mapping(&path.source_model_id, &path.provider)
        .await
    {
        Ok(()) => (StatusCode::OK, Json(OkResponse { ok: true })).into_response(),
        Err(e) => {
            tracing::error!(error = %e, "Failed to delete model mapping");
            (
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(ErrorResponse::new(
                    "api_error",
                    "Failed to delete model mapping",
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
    fn upsert_request_defaults() {
        let json = r#"{
            "source_model_id": "claude-3-5-sonnet*",
            "target_model_id": "anthropic.claude...",
            "provider": "bedrock"
        }"#;
        let req: UpsertMappingRequest = serde_json::from_str(json).unwrap();
        assert_eq!(req.display_name, "");
        assert_eq!(req.input_price, 0.0);
        assert_eq!(req.priority, 0);
        assert_eq!(req.status, "active");
    }

    #[test]
    fn upsert_request_full() {
        let json = r#"{
            "source_model_id": "gpt-4o",
            "target_model_id": "gemini-2.0-flash",
            "provider": "gemini",
            "display_name": "GPT-4o via Gemini",
            "input_price": 0.005,
            "output_price": 0.015,
            "priority": 5,
            "status": "inactive"
        }"#;
        let req: UpsertMappingRequest = serde_json::from_str(json).unwrap();
        assert_eq!(req.display_name, "GPT-4o via Gemini");
        assert_eq!(req.input_price, 0.005);
        assert_eq!(req.status, "inactive");
    }
}
