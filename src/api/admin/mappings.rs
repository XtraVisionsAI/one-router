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
    /// JSON-encoded ModelCapabilities. None means use defaults.
    #[serde(default)]
    pub capabilities: Option<String>,
    /// Pricing origin: "litellm" (auto-synced) or "manual" (pinned). Defaults to "litellm".
    #[serde(default = "default_pricing_source")]
    pub pricing_source: String,
    /// Non-token prices (USD). Omitted on create = 0; omitted on update =
    /// keep the stored value (older clients that do not know the fields
    /// must not wipe them).
    #[serde(default)]
    pub price_per_request: Option<f64>,
    #[serde(default)]
    pub price_per_image: Option<f64>,
    #[serde(default)]
    pub price_per_search_unit: Option<f64>,
}

fn default_priority() -> i32 {
    0
}

fn default_status() -> String {
    "active".to_string()
}

fn default_pricing_source() -> String {
    "litellm".to_string()
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

/// Validate fields shared by create and update.
fn validate_mapping_fields(
    body: &UpsertMappingRequest,
) -> Result<(), (StatusCode, Json<ErrorResponse>)> {
    if body.source_model_id.trim().is_empty() {
        return Err((
            StatusCode::BAD_REQUEST,
            Json(ErrorResponse::new(
                "invalid_request_error",
                "source_model_id cannot be empty",
            )),
        ));
    }
    if body.target_model_id.trim().is_empty() {
        return Err((
            StatusCode::BAD_REQUEST,
            Json(ErrorResponse::new(
                "invalid_request_error",
                "target_model_id cannot be empty",
            )),
        ));
    }
    if body.provider.trim().is_empty() {
        return Err((
            StatusCode::BAD_REQUEST,
            Json(ErrorResponse::new(
                "invalid_request_error",
                "provider cannot be empty",
            )),
        ));
    }
    let prices = [
        ("input_price", Some(body.input_price)),
        ("output_price", Some(body.output_price)),
        ("cache_read_price", Some(body.cache_read_price)),
        ("cache_write_price", Some(body.cache_write_price)),
        ("price_per_request", body.price_per_request),
        ("price_per_image", body.price_per_image),
        ("price_per_search_unit", body.price_per_search_unit),
    ];
    for (name, value) in prices {
        if let Some(v) = value {
            if !v.is_finite() || v < 0.0 {
                return Err((
                    StatusCode::BAD_REQUEST,
                    Json(ErrorResponse::new(
                        "invalid_request_error",
                        format!("{name} must be a finite number >= 0"),
                    )),
                ));
            }
        }
    }
    if body.status != "active" && body.status != "inactive" {
        return Err((
            StatusCode::BAD_REQUEST,
            Json(ErrorResponse::new(
                "invalid_request_error",
                "status must be 'active' or 'inactive'",
            )),
        ));
    }
    Ok(())
}

/// POST /admin/api/mappings
pub async fn create_mapping(
    State(state): State<AppState>,
    Json(body): Json<UpsertMappingRequest>,
) -> impl IntoResponse {
    if let Err(resp) = validate_mapping_fields(&body) {
        return resp.into_response();
    }

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
        capabilities: body.capabilities,
        pricing_source: body.pricing_source,
        price_per_request: body.price_per_request.unwrap_or(0.0),
        price_per_image: body.price_per_image.unwrap_or(0.0),
        price_per_search_unit: body.price_per_search_unit.unwrap_or(0.0),
    };

    match state.database.model_mapping().upsert_mapping(&record).await {
        Ok(()) => {
            state.model_mapping.invalidate_all().await;
            (StatusCode::CREATED, Json(record)).into_response()
        }
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

    if let Err(resp) = validate_mapping_fields(&body) {
        return resp.into_response();
    }

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
        capabilities: body.capabilities,
        pricing_source: body.pricing_source,
        price_per_request: body.price_per_request.unwrap_or(existing.price_per_request),
        price_per_image: body.price_per_image.unwrap_or(existing.price_per_image),
        price_per_search_unit: body
            .price_per_search_unit
            .unwrap_or(existing.price_per_search_unit),
    };

    match state.database.model_mapping().upsert_mapping(&record).await {
        Ok(()) => {
            state.model_mapping.invalidate_all().await;
            (StatusCode::OK, Json(record)).into_response()
        }
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
        Ok(()) => {
            state.model_mapping.invalidate_all().await;
            (StatusCode::OK, Json(OkResponse { ok: true })).into_response()
        }
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
        assert_eq!(req.price_per_image, None);
    }

    fn req(extra: &str) -> UpsertMappingRequest {
        serde_json::from_str(&format!(
            r#"{{"source_model_id":"img","target_model_id":"amazon.nova-canvas-v1:0","provider":"bedrock"{extra}}}"#
        ))
        .unwrap()
    }

    #[test]
    fn non_token_prices_parse_and_validate() {
        let ok = req(
            r#","price_per_request":0.001,"price_per_image":0.04,"price_per_search_unit":0.002"#,
        );
        assert_eq!(ok.price_per_image, Some(0.04));
        assert_eq!(ok.price_per_search_unit, Some(0.002));
        assert!(validate_mapping_fields(&ok).is_ok());
        assert!(validate_mapping_fields(&req(r#","price_per_image":0"#)).is_ok());

        for bad in [
            r#","price_per_image":-0.01"#,
            r#","price_per_request":-1"#,
            r#","price_per_search_unit":-0.5"#,
            r#","input_price":-3"#,
        ] {
            let (status, _) = validate_mapping_fields(&req(bad)).unwrap_err();
            assert_eq!(status, StatusCode::BAD_REQUEST, "{bad}");
        }
        let mut inf = req("");
        inf.price_per_image = Some(f64::INFINITY);
        assert!(validate_mapping_fields(&inf).is_err());
        let mut nan = req("");
        nan.price_per_request = Some(f64::NAN);
        assert!(validate_mapping_fields(&nan).is_err());
    }
}
