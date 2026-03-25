//! Admin API — API key management
//!
//! GET    /admin/api/keys          → list all keys (truncated)
//! POST   /admin/api/keys          → create key (returns plaintext once)
//! PUT    /admin/api/keys/:key     → update key metadata
//! DELETE /admin/api/keys/:key     → deactivate or delete
//! POST   /admin/api/keys/:key/activate → re-activate

use axum::{
    extract::{Path, Query, State},
    http::StatusCode,
    response::IntoResponse,
    Json,
};
use chrono::Utc;
use serde::{Deserialize, Serialize};

use crate::database::models::ApiKeyRecord;
use crate::middleware::auth::ApiKeyInfo;
use crate::schemas::anthropic::ErrorResponse;
use crate::server::state::AppState;

// ============================================================================
// Response types
// ============================================================================

/// Key info returned in list/update responses — key is always truncated
#[derive(Debug, Serialize)]
pub struct AdminKeyItem {
    pub api_key: String, // truncated
    pub name: String,
    pub user_id: String,
    pub is_active: bool,
    pub rate_limit: i32,
    pub tpm_limit: Option<i32>,
    pub service_tier: String,
    pub monthly_budget: Option<f64>,
    pub budget_used_mtd: f64,
    pub created_at: i64,
}

impl AdminKeyItem {
    fn from_record(r: &ApiKeyRecord) -> Self {
        Self {
            api_key: ApiKeyInfo::truncate_key(&r.api_key),
            name: r.name.clone(),
            user_id: r.user_id.clone(),
            is_active: r.is_active,
            rate_limit: r.rate_limit,
            tpm_limit: r.tpm_limit,
            service_tier: r.service_tier.clone(),
            monthly_budget: r.monthly_budget,
            budget_used_mtd: r.budget_used_mtd,
            created_at: r.created_at,
        }
    }
}

#[derive(Debug, Serialize)]
pub struct KeyListResponse {
    pub object: &'static str,
    pub data: Vec<AdminKeyItem>,
}

/// Response for successful key creation — contains plaintext key ONCE
#[derive(Debug, Serialize)]
pub struct CreateKeyResponse {
    pub api_key: String, // full plaintext — show once
    pub name: String,
    pub user_id: String,
    pub message: &'static str,
}

#[derive(Debug, Serialize)]
pub struct OkResponse {
    pub ok: bool,
}

// ============================================================================
// Request types
// ============================================================================

#[derive(Debug, Deserialize)]
pub struct CreateKeyRequest {
    pub name: String,
    pub user_id: String,
    #[serde(default)]
    pub rate_limit: Option<i32>,
    pub tpm_limit: Option<i32>,
    #[serde(default = "default_service_tier")]
    pub service_tier: String,
    pub monthly_budget: Option<f64>,
}

fn default_service_tier() -> String {
    "default".to_string()
}

/// Deserialize a field that can be absent (don't touch), null (clear), or a value (set).
/// - Field absent in JSON → `None` (do not change the existing value)
/// - Field present as `null` → `Some(None)` (clear the value)
/// - Field present as a value → `Some(Some(value))` (set to value)
fn deserialize_optional_field<'de, T, D>(d: D) -> Result<Option<Option<T>>, D::Error>
where
    T: serde::de::DeserializeOwned,
    D: serde::de::Deserializer<'de>,
{
    Ok(Some(Option::deserialize(d)?))
}

#[derive(Debug, Deserialize)]
pub struct UpdateKeyRequest {
    pub name: Option<String>,
    pub rate_limit: Option<i32>,
    /// None = don't change, Some(None) = clear, Some(Some(v)) = set to v
    #[serde(default, deserialize_with = "deserialize_optional_field")]
    pub tpm_limit: Option<Option<i32>>,
    pub service_tier: Option<String>,
    /// None = don't change, Some(None) = clear, Some(Some(v)) = set to v
    #[serde(default, deserialize_with = "deserialize_optional_field")]
    pub monthly_budget: Option<Option<f64>>,
}

#[derive(Debug, Deserialize)]
pub struct DeleteKeyQuery {
    /// "deactivate" (default) or "delete"
    pub action: Option<String>,
}

// ============================================================================
// Private helpers
// ============================================================================

/// Find a single ApiKeyRecord by its truncated key form.
/// Returns Err(Response) with 404 if not found, 409 if multiple keys share the same prefix.
async fn resolve_key(
    state: &AppState,
    key_prefix: &str,
) -> Result<ApiKeyRecord, axum::response::Response> {
    let records = state
        .database
        .api_keys()
        .list_api_keys()
        .await
        .map_err(|e| {
            tracing::error!(error = %e, "Failed to list API keys");
            (
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(ErrorResponse::new(
                    "api_error",
                    "Failed to retrieve API keys",
                )),
            )
                .into_response()
        })?;

    let mut matches: Vec<ApiKeyRecord> = records
        .into_iter()
        .filter(|r| ApiKeyInfo::truncate_key(&r.api_key) == key_prefix)
        .collect();

    if matches.len() > 1 {
        return Err((
            StatusCode::CONFLICT,
            Json(ErrorResponse::new(
                "conflict_error",
                "Ambiguous key prefix — multiple keys share this prefix",
            )),
        )
            .into_response());
    }

    matches.pop().ok_or_else(|| {
        (
            StatusCode::NOT_FOUND,
            Json(ErrorResponse::new("not_found_error", "API key not found")),
        )
            .into_response()
    })
}

// ============================================================================
// Handlers
// ============================================================================

/// GET /admin/api/keys
pub async fn list_keys(State(state): State<AppState>) -> impl IntoResponse {
    match state.database.api_keys().list_api_keys().await {
        Ok(records) => {
            let data = records.iter().map(AdminKeyItem::from_record).collect();
            (
                StatusCode::OK,
                Json(KeyListResponse {
                    object: "list",
                    data,
                }),
            )
                .into_response()
        }
        Err(e) => {
            tracing::error!(error = %e, "Failed to list API keys");
            (
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(ErrorResponse::new(
                    "api_error",
                    "Failed to retrieve API keys",
                )),
            )
                .into_response()
        }
    }
}

/// POST /admin/api/keys — generate key, store it, return plaintext once
pub async fn create_key(
    State(state): State<AppState>,
    Json(body): Json<CreateKeyRequest>,
) -> impl IntoResponse {
    // Generate key: sk-<32 hex chars>
    let raw_key = format!("sk-{}", uuid::Uuid::new_v4().to_string().replace('-', ""));

    let now = Utc::now().timestamp();
    let record = ApiKeyRecord {
        api_key: raw_key.clone(),
        user_id: body.user_id.clone(),
        name: body.name.clone(),
        is_active: true,
        rate_limit: body.rate_limit.unwrap_or(100),
        service_tier: body.service_tier.clone(),
        monthly_budget: body.monthly_budget,
        budget_used: 0.0,
        budget_used_mtd: 0.0,
        budget_mtd_month: None,
        deactivated_reason: None,
        tpm_limit: body.tpm_limit,
        metadata: None,
        created_at: now,
        updated_at: None,
    };

    match state.database.api_keys().create_api_key(&record).await {
        Ok(()) => (
            StatusCode::CREATED,
            Json(CreateKeyResponse {
                api_key: raw_key,
                name: body.name,
                user_id: body.user_id,
                message: "Save this key — it will not be shown again.",
            }),
        )
            .into_response(),
        Err(e) => {
            tracing::error!(error = %e, "Failed to create API key");
            (
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(ErrorResponse::new("api_error", "Failed to create API key")),
            )
                .into_response()
        }
    }
}

/// PUT /admin/api/keys/:key — update mutable fields
pub async fn update_key(
    State(state): State<AppState>,
    Path(key_prefix): Path<String>,
    Json(body): Json<UpdateKeyRequest>,
) -> impl IntoResponse {
    let mut record = match resolve_key(&state, &key_prefix).await {
        Ok(r) => r,
        Err(resp) => return resp,
    };

    // Apply partial updates
    if let Some(name) = body.name {
        record.name = name;
    }
    if let Some(rate_limit) = body.rate_limit {
        record.rate_limit = rate_limit;
    }
    if let Some(tpm) = body.tpm_limit {
        record.tpm_limit = tpm; // Some(v) sets it, None clears it
    }
    if let Some(service_tier) = body.service_tier {
        record.service_tier = service_tier;
    }
    if let Some(budget) = body.monthly_budget {
        record.monthly_budget = budget; // Some(v) sets it, None clears it
    }

    match state.database.api_keys().update_api_key(&record).await {
        Ok(()) => (StatusCode::OK, Json(AdminKeyItem::from_record(&record))).into_response(),
        Err(e) => {
            tracing::error!(error = %e, "Failed to update API key");
            (
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(ErrorResponse::new("api_error", "Failed to update API key")),
            )
                .into_response()
        }
    }
}

/// DELETE /admin/api/keys/:key?action=deactivate|delete
pub async fn delete_key(
    State(state): State<AppState>,
    Path(key_prefix): Path<String>,
    Query(query): Query<DeleteKeyQuery>,
) -> impl IntoResponse {
    // NOTE: "delete" action calls deactivate_api_key with reason="deleted".
    // There is no hard-delete in the DatabaseService trait; this is intentional.
    let action = query.action.as_deref().unwrap_or("deactivate");

    let record = match resolve_key(&state, &key_prefix).await {
        Ok(r) => r,
        Err(resp) => return resp,
    };

    let reason = match action {
        "delete" => "deleted",
        _ => "admin",
    };

    match state
        .database
        .api_keys()
        .deactivate_api_key(&record.api_key, reason)
        .await
    {
        Ok(()) => (StatusCode::OK, Json(OkResponse { ok: true })).into_response(),
        Err(e) => {
            tracing::error!(error = %e, "Failed to deactivate/delete API key");
            (
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(ErrorResponse::new("api_error", "Failed to delete API key")),
            )
                .into_response()
        }
    }
}

/// POST /admin/api/keys/:key/activate — re-activate a deactivated key
pub async fn activate_key(
    State(state): State<AppState>,
    Path(key_prefix): Path<String>,
) -> impl IntoResponse {
    let mut record = match resolve_key(&state, &key_prefix).await {
        Ok(r) => r,
        Err(resp) => return resp,
    };

    record.is_active = true;
    record.deactivated_reason = None;

    match state.database.api_keys().update_api_key(&record).await {
        Ok(()) => (StatusCode::OK, Json(AdminKeyItem::from_record(&record))).into_response(),
        Err(e) => {
            tracing::error!(error = %e, "Failed to activate API key");
            (
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(ErrorResponse::new(
                    "api_error",
                    "Failed to activate API key",
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
    fn key_generation_format() {
        let raw_key = format!("sk-{}", uuid::Uuid::new_v4().to_string().replace('-', ""));
        assert!(raw_key.starts_with("sk-"));
        assert_eq!(raw_key.len(), 35); // "sk-" + 32 hex chars
    }

    #[test]
    fn admin_key_item_truncates_key() {
        let record = ApiKeyRecord {
            api_key: "sk-a1b2c3d4e5f6a1b2".to_string(),
            name: "Test".to_string(),
            user_id: "u1".to_string(),
            is_active: true,
            rate_limit: 100,
            service_tier: "default".to_string(),
            monthly_budget: None,
            budget_used: 0.0,
            budget_used_mtd: 0.0,
            budget_mtd_month: None,
            deactivated_reason: None,
            tpm_limit: None,
            metadata: None,
            created_at: 0,
            updated_at: None,
        };
        let item = AdminKeyItem::from_record(&record);
        assert!(!item.api_key.contains("e5f6a1b2")); // full key not exposed
        assert!(item.api_key.contains("...")); // truncated
    }

    #[test]
    fn create_request_default_service_tier() {
        let json = r#"{"name":"Test","user_id":"u1"}"#;
        let req: CreateKeyRequest = serde_json::from_str(json).unwrap();
        assert_eq!(req.service_tier, "default");
        assert_eq!(req.rate_limit, None);
    }

    #[test]
    fn update_request_absent_fields_are_none() {
        let json = r#"{"name":"New Name"}"#;
        let req: UpdateKeyRequest = serde_json::from_str(json).unwrap();
        assert_eq!(req.tpm_limit, None); // absent → don't change
        assert_eq!(req.monthly_budget, None); // absent → don't change
        assert_eq!(req.name, Some("New Name".to_string()));
    }

    #[test]
    fn update_request_null_clears_optional_fields() {
        let json = r#"{"tpm_limit": null, "monthly_budget": null}"#;
        let req: UpdateKeyRequest = serde_json::from_str(json).unwrap();
        assert_eq!(req.tpm_limit, Some(None)); // explicit null → clear
        assert_eq!(req.monthly_budget, Some(None)); // explicit null → clear
    }

    #[test]
    fn update_request_value_sets_optional_fields() {
        let json = r#"{"tpm_limit": 5000, "monthly_budget": 99.5}"#;
        let req: UpdateKeyRequest = serde_json::from_str(json).unwrap();
        assert_eq!(req.tpm_limit, Some(Some(5000)));
        assert_eq!(req.monthly_budget, Some(Some(99.5)));
    }
}
