//! Admin API — API key management
//!
//! Keys are addressed by their stable `key_id` (UUID). For one release the path
//! segment may also be a key **name** (legacy form); such calls still work but
//! carry a `Deprecation: true` response header.
//!
//! GET    /admin/api/keys                    → list all keys (masked)
//! POST   /admin/api/keys                    → create key (returns plaintext once)
//! GET    /admin/api/keys/:key_id            → one key
//! PUT    /admin/api/keys/:key_id            → update mutable fields
//! DELETE /admin/api/keys/:key_id?action=delete      → permanently delete
//! DELETE /admin/api/keys/:key_id[?action=deactivate] → deactivate (deprecated
//!                                               default; use POST …/deactivate)
//! POST   /admin/api/keys/:key_id/deactivate → deactivate (reversible)
//! POST   /admin/api/keys/:key_id/activate   → re-activate

use axum::{
    extract::{Path, Query, State},
    http::{HeaderValue, StatusCode},
    response::{IntoResponse, Response},
    Json,
};
use chrono::Utc;
use serde::{Deserialize, Serialize};

use crate::database::models::{looks_like_key_id, new_key_id, ApiKeyRecord};
use crate::middleware::auth::ApiKeyInfo;
use crate::schemas::anthropic::ErrorResponse;
use crate::server::state::AppState;
use crate::utils::api_key::{hash_key, mask_key};

/// Serialized `metadata` must stay under this size.
const MAX_METADATA_BYTES: usize = 4096;

// ============================================================================
// Response types
// ============================================================================

/// Key info returned by list/get/update — never contains the secret or its hash.
#[derive(Debug, Serialize)]
pub struct AdminKeyItem {
    pub key_id: String,
    /// Masked display form (e.g. `sk-abcd••••5678`). Field name kept for
    /// backward compatibility with existing admin clients.
    pub api_key: String,
    pub name: String,
    pub is_active: bool,
    pub deactivated_reason: Option<String>,
    pub rate_limit: i32,
    pub tpm_limit: Option<i32>,
    pub cost_rate: f64,
    pub monthly_budget: Option<f64>,
    pub budget_used_mtd: f64,
    pub cache_ttl: Option<String>,
    pub metadata: Option<serde_json::Value>,
    pub created_at: i64,
    pub updated_at: Option<i64>,
}

impl AdminKeyItem {
    fn from_record(r: &ApiKeyRecord) -> Self {
        Self {
            key_id: r.key_id.clone(),
            api_key: if r.key_display.is_empty() {
                ApiKeyInfo::truncate_key(&r.api_key)
            } else {
                r.key_display.clone()
            },
            name: r.name.clone(),
            is_active: r.is_active,
            deactivated_reason: r.deactivated_reason.clone(),
            rate_limit: r.rate_limit,
            tpm_limit: r.tpm_limit,
            cost_rate: r.cost_rate,
            monthly_budget: r.monthly_budget,
            budget_used_mtd: r.budget_used_mtd,
            cache_ttl: r.cache_ttl.clone(),
            metadata: r
                .metadata
                .as_deref()
                .and_then(|m| serde_json::from_str(m).ok()),
            created_at: r.created_at,
            updated_at: r.updated_at,
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
    pub key_id: String,
    pub api_key: String, // full plaintext — show once
    pub name: String,
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
    #[serde(default)]
    pub rate_limit: Option<i32>,
    pub tpm_limit: Option<i32>,
    #[serde(default = "default_cost_rate")]
    pub cost_rate: f64,
    pub monthly_budget: Option<f64>,
    pub cache_ttl: Option<String>,
    /// Free-form admin notes, JSON object ≤ 4 KB. Not interpreted by the gateway.
    pub metadata: Option<serde_json::Value>,
}

fn default_cost_rate() -> f64 {
    1.0
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
    pub cost_rate: Option<f64>,
    /// None = don't change, Some(None) = clear, Some(Some(v)) = set to v
    #[serde(default, deserialize_with = "deserialize_optional_field")]
    pub monthly_budget: Option<Option<f64>>,
    /// None = don't change, Some(None) = clear, Some(Some(v)) = set to v
    #[serde(default, deserialize_with = "deserialize_optional_field")]
    pub cache_ttl: Option<Option<String>>,
    /// None = don't change, Some(None) = clear, Some(Some(v)) = set to v
    #[serde(default, deserialize_with = "deserialize_optional_field")]
    pub metadata: Option<Option<serde_json::Value>>,
}

#[derive(Debug, Deserialize)]
pub struct DeleteKeyQuery {
    /// "delete" = permanent delete; "deactivate" or absent = deactivate (deprecated).
    pub action: Option<String>,
}

// ============================================================================
// Private helpers
// ============================================================================

fn error_response(status: StatusCode, error_type: &str, message: impl Into<String>) -> Response {
    (status, Json(ErrorResponse::new(error_type, message.into()))).into_response()
}

fn internal_error(context: &str, e: &anyhow::Error) -> Response {
    tracing::error!(error = %e, "{context}");
    error_response(StatusCode::INTERNAL_SERVER_ERROR, "api_error", context)
}

fn conflict_name() -> Response {
    error_response(
        StatusCode::CONFLICT,
        "conflict_error",
        "A key with this name already exists",
    )
}

/// Returns true if the error is a unique constraint violation on the name column.
fn is_name_unique_error(e: &anyhow::Error) -> bool {
    let msg = e.to_string().to_lowercase();
    msg.contains("unique constraint failed: api_keys.name")
        || msg.contains("unique constraint failed") && msg.contains("name")
        || msg.contains("duplicate key value violates unique constraint")
}

/// Mark a response as using a deprecated form of the API.
fn deprecated(mut resp: Response) -> Response {
    resp.headers_mut()
        .insert("deprecation", HeaderValue::from_static("true"));
    resp
}

/// A resolved key plus whether it was addressed by the legacy name form.
struct ResolvedKey {
    record: ApiKeyRecord,
    by_name: bool,
}

impl ResolvedKey {
    fn finish(&self, resp: Response) -> Response {
        if self.by_name {
            deprecated(resp)
        } else {
            resp
        }
    }
}

/// Resolve a path segment to a key: by `key_id` first, then (legacy) by name.
async fn resolve_key(state: &AppState, ident: &str) -> Result<ResolvedKey, Box<Response>> {
    let store = state.database.api_keys();
    if looks_like_key_id(ident) {
        match store.get_api_key_by_id(ident).await {
            Ok(Some(record)) => {
                return Ok(ResolvedKey {
                    record,
                    by_name: false,
                })
            }
            Ok(None) => {} // a name may happen to look like a UUID — try it below
            Err(e) => return Err(Box::new(internal_error("Failed to retrieve API key", &e))),
        }
    }
    match store.get_api_key_by_name(ident).await {
        Ok(Some(record)) => Ok(ResolvedKey {
            record,
            by_name: true,
        }),
        Ok(None) => Err(Box::new(error_response(
            StatusCode::NOT_FOUND,
            "not_found_error",
            format!("API key '{ident}' not found"),
        ))),
        Err(e) => Err(Box::new(internal_error("Failed to retrieve API key", &e))),
    }
}

/// Validate and serialize `metadata` (JSON object, ≤ 4 KB).
fn encode_metadata(value: &serde_json::Value) -> Result<String, Box<Response>> {
    if !value.is_object() {
        return Err(Box::new(error_response(
            StatusCode::BAD_REQUEST,
            "invalid_request_error",
            "metadata must be a JSON object",
        )));
    }
    let s = value.to_string();
    if s.len() > MAX_METADATA_BYTES {
        return Err(Box::new(error_response(
            StatusCode::BAD_REQUEST,
            "invalid_request_error",
            format!("metadata must be at most {MAX_METADATA_BYTES} bytes when serialized"),
        )));
    }
    Ok(s)
}

/// Reject negative limits (0 keeps its existing meaning: "use the default" for
/// `rate_limit`; for `tpm_limit` 0 is rejected — use `null` to clear).
fn validate_limits(rate_limit: Option<i32>, tpm_limit: Option<i32>) -> Result<(), Box<Response>> {
    if rate_limit.is_some_and(|r| r < 0) {
        return Err(Box::new(error_response(
            StatusCode::BAD_REQUEST,
            "invalid_request_error",
            "rate_limit must be >= 0",
        )));
    }
    if tpm_limit.is_some_and(|t| t <= 0) {
        return Err(Box::new(error_response(
            StatusCode::BAD_REQUEST,
            "invalid_request_error",
            "tpm_limit must be a positive integer (use null for unlimited)",
        )));
    }
    Ok(())
}

// ============================================================================
// Handlers
// ============================================================================

/// GET /admin/api/keys
pub async fn list_keys(State(state): State<AppState>) -> Response {
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
        Err(e) => internal_error("Failed to retrieve API keys", &e),
    }
}

/// GET /admin/api/keys/:key_id
pub async fn get_key(State(state): State<AppState>, Path(ident): Path<String>) -> Response {
    match resolve_key(&state, &ident).await {
        Ok(k) => k.finish(Json(AdminKeyItem::from_record(&k.record)).into_response()),
        Err(resp) => *resp,
    }
}

/// POST /admin/api/keys — generate key, store it, return plaintext once
pub async fn create_key(
    State(state): State<AppState>,
    Json(body): Json<CreateKeyRequest>,
) -> Response {
    if let Err(resp) = validate_limits(body.rate_limit, body.tpm_limit) {
        return *resp;
    }
    let metadata = match body.metadata.as_ref().map(encode_metadata).transpose() {
        Ok(m) => m,
        Err(resp) => return *resp,
    };

    // Generate key: sk-<32 hex chars>
    let raw_key = format!("sk-{}", uuid::Uuid::new_v4().to_string().replace('-', ""));
    let hashed = hash_key(&raw_key, state.settings.encryption_key.as_deref());
    let display = mask_key(&raw_key);

    let now = Utc::now().timestamp();
    let record = ApiKeyRecord {
        api_key: hashed,
        key_id: new_key_id(),
        key_display: display,
        name: body.name.clone(),
        is_active: true,
        rate_limit: body.rate_limit.unwrap_or(100),
        cost_rate: body.cost_rate,
        monthly_budget: body.monthly_budget,
        budget_used: 0.0,
        budget_used_mtd: 0.0,
        budget_mtd_month: None,
        deactivated_reason: None,
        budget_history: None,
        tpm_limit: body.tpm_limit,
        cache_ttl: body.cache_ttl,
        metadata,
        created_at: now,
        updated_at: None,
    };

    match state.database.api_keys().create_api_key(&record).await {
        Ok(()) => (
            StatusCode::CREATED,
            Json(CreateKeyResponse {
                key_id: record.key_id,
                api_key: raw_key,
                name: body.name,
                message: "Save this key — it will not be shown again.",
            }),
        )
            .into_response(),
        Err(e) if is_name_unique_error(&e) => conflict_name(),
        Err(e) => internal_error("Failed to create API key", &e),
    }
}

/// PUT /admin/api/keys/:key_id — update mutable fields
pub async fn update_key(
    State(state): State<AppState>,
    Path(ident): Path<String>,
    Json(body): Json<UpdateKeyRequest>,
) -> Response {
    let resolved = match resolve_key(&state, &ident).await {
        Ok(k) => k,
        Err(resp) => return *resp,
    };
    if let Err(resp) = validate_limits(body.rate_limit, body.tpm_limit.flatten()) {
        return *resp;
    }
    let mut record = resolved.record.clone();

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
    if let Some(cost_rate) = body.cost_rate {
        record.cost_rate = cost_rate;
    }
    if let Some(budget) = body.monthly_budget {
        record.monthly_budget = budget; // Some(v) sets it, None clears it
    }
    if let Some(cache_ttl) = body.cache_ttl {
        record.cache_ttl = cache_ttl; // Some(v) sets it, None clears it
    }
    if let Some(metadata) = body.metadata {
        record.metadata = match metadata.as_ref().map(encode_metadata).transpose() {
            Ok(m) => m,
            Err(resp) => return *resp,
        };
    }

    match state.database.api_keys().update_api_key(&record).await {
        Ok(()) => resolved.finish(Json(AdminKeyItem::from_record(&record)).into_response()),
        Err(e) if is_name_unique_error(&e) => conflict_name(),
        Err(e) => internal_error("Failed to update API key", &e),
    }
}

/// DELETE /admin/api/keys/:key_id?action=delete|deactivate
///
/// `action=delete` permanently removes the key (usage history is kept and stays
/// attributed through `key_id`). Without `action=delete` the key is only
/// deactivated — the pre-0.35 default, kept for one release and flagged with a
/// `Deprecation` header; use `POST …/deactivate` instead.
pub async fn delete_key(
    State(state): State<AppState>,
    Path(ident): Path<String>,
    Query(query): Query<DeleteKeyQuery>,
) -> Response {
    let resolved = match resolve_key(&state, &ident).await {
        Ok(k) => k,
        Err(resp) => return *resp,
    };

    match query.action.as_deref() {
        Some("delete") => {
            let store = state.database.api_keys();
            match store.delete_api_key(&resolved.record.api_key).await {
                Ok(()) => {
                    tracing::info!(
                        key_id = %resolved.record.key_id,
                        name = %resolved.record.name,
                        key_display = %resolved.record.key_display,
                        "API key permanently deleted"
                    );
                    resolved.finish(Json(OkResponse { ok: true }).into_response())
                }
                Err(e) => internal_error("Failed to delete API key", &e),
            }
        }
        None | Some("deactivate") => deprecated(deactivate(&state, &resolved.record).await),
        Some(other) => error_response(
            StatusCode::BAD_REQUEST,
            "invalid_request_error",
            format!("Unknown action '{other}' (expected 'delete' or 'deactivate')"),
        ),
    }
}

async fn deactivate(state: &AppState, record: &ApiKeyRecord) -> Response {
    match state
        .database
        .api_keys()
        .deactivate_api_key(&record.api_key, "admin")
        .await
    {
        Ok(()) => Json(OkResponse { ok: true }).into_response(),
        Err(e) => internal_error("Failed to deactivate API key", &e),
    }
}

/// POST /admin/api/keys/:key_id/deactivate — reversible disable
pub async fn deactivate_key(State(state): State<AppState>, Path(ident): Path<String>) -> Response {
    match resolve_key(&state, &ident).await {
        Ok(k) => k.finish(deactivate(&state, &k.record).await),
        Err(resp) => *resp,
    }
}

/// POST /admin/api/keys/:key_id/activate — re-activate a deactivated key
pub async fn activate_key(State(state): State<AppState>, Path(ident): Path<String>) -> Response {
    let resolved = match resolve_key(&state, &ident).await {
        Ok(k) => k,
        Err(resp) => return *resp,
    };
    let mut record = resolved.record.clone();
    record.is_active = true;
    record.deactivated_reason = None;

    match state.database.api_keys().update_api_key(&record).await {
        Ok(()) => resolved.finish(Json(AdminKeyItem::from_record(&record)).into_response()),
        Err(e) => internal_error("Failed to activate API key", &e),
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    fn record() -> ApiKeyRecord {
        ApiKeyRecord {
            api_key: "sk-a1b2c3d4e5f6a1b2".to_string(),
            key_id: "4b1d2c9e-7a51-4f0e-9c1e-2f6a8d3b5c70".to_string(),
            key_display: String::new(),
            name: "Test".to_string(),
            is_active: true,
            rate_limit: 100,
            cost_rate: 1.0,
            monthly_budget: None,
            budget_used: 0.0,
            budget_used_mtd: 0.0,
            budget_mtd_month: None,
            deactivated_reason: None,
            budget_history: None,
            tpm_limit: None,
            cache_ttl: None,
            metadata: Some(r#"{"owner":"alice"}"#.to_string()),
            created_at: 0,
            updated_at: None,
        }
    }

    #[test]
    fn key_generation_format() {
        let raw_key = format!("sk-{}", uuid::Uuid::new_v4().to_string().replace('-', ""));
        assert!(raw_key.starts_with("sk-"));
        assert_eq!(raw_key.len(), 35); // "sk-" + 32 hex chars
    }

    #[test]
    fn admin_key_item_truncates_key_and_exposes_id() {
        let item = AdminKeyItem::from_record(&record());
        assert!(!item.api_key.contains("e5f6a1b2")); // full key not exposed
        assert!(item.api_key.contains("...")); // truncated
        assert_eq!(item.key_id, "4b1d2c9e-7a51-4f0e-9c1e-2f6a8d3b5c70");
        assert_eq!(item.metadata, Some(serde_json::json!({"owner": "alice"})));
    }

    #[test]
    fn admin_key_item_never_serializes_hash() {
        let mut r = record();
        r.api_key = "a".repeat(64); // hashed form
        r.key_display = "sk-abcd••••5678".to_string();
        let json = serde_json::to_string(&AdminKeyItem::from_record(&r)).unwrap();
        assert!(!json.contains(&"a".repeat(64)));
    }

    #[test]
    fn create_request_default_cost_rate() {
        let json = r#"{"name":"Test"}"#;
        let req: CreateKeyRequest = serde_json::from_str(json).unwrap();
        assert_eq!(req.cost_rate, 1.0);
        assert_eq!(req.rate_limit, None);
        assert!(req.metadata.is_none());
    }

    #[test]
    fn update_request_absent_fields_are_none() {
        let json = r#"{"name":"New Name"}"#;
        let req: UpdateKeyRequest = serde_json::from_str(json).unwrap();
        assert_eq!(req.tpm_limit, None); // absent → don't change
        assert_eq!(req.monthly_budget, None); // absent → don't change
        assert!(req.metadata.is_none());
        assert_eq!(req.name, Some("New Name".to_string()));
    }

    #[test]
    fn update_request_null_clears_optional_fields() {
        let json = r#"{"tpm_limit": null, "monthly_budget": null, "metadata": null}"#;
        let req: UpdateKeyRequest = serde_json::from_str(json).unwrap();
        assert_eq!(req.tpm_limit, Some(None)); // explicit null → clear
        assert_eq!(req.monthly_budget, Some(None)); // explicit null → clear
        assert_eq!(req.metadata, Some(None));
    }

    #[test]
    fn update_request_value_sets_optional_fields() {
        let json = r#"{"tpm_limit": 5000, "monthly_budget": 99.5}"#;
        let req: UpdateKeyRequest = serde_json::from_str(json).unwrap();
        assert_eq!(req.tpm_limit, Some(Some(5000)));
        assert_eq!(req.monthly_budget, Some(Some(99.5)));
    }

    #[test]
    fn metadata_must_be_small_object() {
        assert!(encode_metadata(&serde_json::json!({"a": 1})).is_ok());
        assert!(encode_metadata(&serde_json::json!([1, 2])).is_err());
        assert!(encode_metadata(&serde_json::json!("x")).is_err());
        let big = serde_json::json!({"a": "x".repeat(MAX_METADATA_BYTES)});
        assert!(encode_metadata(&big).is_err());
    }

    #[test]
    fn limit_validation() {
        assert!(validate_limits(Some(0), None).is_ok());
        assert!(validate_limits(Some(-1), None).is_err());
        assert!(validate_limits(None, Some(0)).is_err());
        assert!(validate_limits(None, Some(1000)).is_ok());
    }
}
