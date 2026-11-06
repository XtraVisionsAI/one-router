//! Admin API — API key management
//!
//! Every key belongs to a user (the billing / shared-limit principal, see
//! `admin/users.rs`). Key-level `rate_limit` / `tpm_limit` / `monthly_budget`
//! are optional **sub-limits** that can only narrow the user's.
//!
//! Keys are addressed by their stable `key_id` (UUID). For one release the path
//! segment may also be a key **name** (legacy form); such calls still work but
//! carry a `Deprecation: true` response header (names are unique per user, so
//! a name shared by several users answers 409).
//!
//! GET    /admin/api/keys[?user=<id|name>]   → list keys (masked)
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
    http::StatusCode,
    response::{IntoResponse, Response},
    Json,
};
use chrono::Utc;
use serde::{Deserialize, Serialize};
use std::collections::HashMap;

use super::common::*;
use super::users::resolve_user;
use crate::database::models::{looks_like_key_id, new_key_id, ApiKeyRecord, UserRecord};
use crate::middleware::auth::ApiKeyInfo;
use crate::server::state::AppState;
use crate::utils::api_key::{hash_key, mask_key};

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
    pub user_id: String,
    /// Owning user's name (`None` when the user row is missing).
    pub user_name: Option<String>,
    pub is_active: bool,
    pub deactivated_reason: Option<String>,
    /// Key-level RPM sub-limit (`None` = none).
    pub rate_limit: Option<i32>,
    pub tpm_limit: Option<i32>,
    pub monthly_budget: Option<f64>,
    pub budget_used_mtd: f64,
    pub budget_used: f64,
    pub cache_ttl: Option<String>,
    pub expires_at: Option<i64>,
    pub allowed_models: Option<Vec<String>>,
    pub metadata: Option<serde_json::Value>,
    pub created_at: i64,
    pub updated_at: Option<i64>,
}

impl AdminKeyItem {
    pub(super) fn from_record(r: &ApiKeyRecord, user_name: Option<String>) -> Self {
        let current_month = Utc::now().format("%Y-%m").to_string();
        Self {
            key_id: r.key_id.clone(),
            api_key: if r.key_display.is_empty() {
                ApiKeyInfo::truncate_key(&r.api_key)
            } else {
                r.key_display.clone()
            },
            name: r.name.clone(),
            user_id: r.user_id.clone(),
            user_name,
            is_active: r.is_active,
            deactivated_reason: r.deactivated_reason.clone(),
            rate_limit: (r.rate_limit > 0).then_some(r.rate_limit),
            tpm_limit: r.tpm_limit,
            monthly_budget: r.monthly_budget,
            budget_used_mtd: crate::database::models::period_spend(
                r.budget_used_mtd,
                r.budget_mtd_month.as_deref(),
                &current_month,
            ),
            budget_used: r.budget_used,
            cache_ttl: r.cache_ttl.clone(),
            expires_at: r.expires_at,
            allowed_models: r.allowed_models.clone(),
            metadata: decode_metadata(r.metadata.as_deref()),
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
    pub user_id: String,
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
    /// Owning user (`user_id` or user name). Omitted = legacy call: a user with
    /// the key's name is created and the limit fields below configure **that
    /// user** (pre-users semantics). Deprecated; will become required.
    pub user_id: Option<String>,
    #[serde(default)]
    pub rate_limit: Option<i32>,
    pub tpm_limit: Option<i32>,
    /// Legacy only (no `user_id`): becomes the new user's cost rate.
    pub cost_rate: Option<f64>,
    pub monthly_budget: Option<f64>,
    pub cache_ttl: Option<String>,
    /// Free-form admin notes, JSON object ≤ 4 KB. Not interpreted by the gateway.
    pub metadata: Option<serde_json::Value>,
    /// Unix seconds; `None` = never expires.
    pub expires_at: Option<i64>,
    pub allowed_models: Option<Vec<String>>,
}

#[derive(Debug, Deserialize)]
pub struct UpdateKeyRequest {
    pub name: Option<String>,
    /// None = don't change, Some(None) = clear, Some(Some(v)) = set to v
    #[serde(default, deserialize_with = "deserialize_optional_field")]
    pub rate_limit: Option<Option<i32>>,
    #[serde(default, deserialize_with = "deserialize_optional_field")]
    pub tpm_limit: Option<Option<i32>>,
    /// Rejected — cost rate is a user setting.
    pub cost_rate: Option<f64>,
    #[serde(default, deserialize_with = "deserialize_optional_field")]
    pub monthly_budget: Option<Option<f64>>,
    #[serde(default, deserialize_with = "deserialize_optional_field")]
    pub cache_ttl: Option<Option<String>>,
    #[serde(default, deserialize_with = "deserialize_optional_field")]
    pub metadata: Option<Option<serde_json::Value>>,
    #[serde(default, deserialize_with = "deserialize_optional_field")]
    pub expires_at: Option<Option<i64>>,
    #[serde(default, deserialize_with = "deserialize_optional_field")]
    pub allowed_models: Option<Option<Vec<String>>>,
}

#[derive(Debug, Deserialize)]
pub struct DeleteKeyQuery {
    /// "delete" = permanent delete; "deactivate" or absent = deactivate (deprecated).
    pub action: Option<String>,
}

#[derive(Debug, Deserialize)]
pub struct ListKeysQuery {
    /// Only keys of this user (`user_id` or name).
    pub user: Option<String>,
}

// ============================================================================
// Private helpers
// ============================================================================

fn conflict_name() -> HandlerError {
    conflict("This user already has a key with this name")
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
async fn resolve_key(state: &AppState, ident: &str) -> Result<ResolvedKey, HandlerError> {
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
            Err(e) => return Err(internal_error("Failed to retrieve API key", &e)),
        }
    }
    let mut matches: Vec<ApiKeyRecord> = store
        .list_api_keys()
        .await
        .map_err(|e| internal_error("Failed to retrieve API key", &e))?
        .into_iter()
        .filter(|k| k.name == ident)
        .collect();
    match matches.len() {
        0 => Err(not_found(format!("API key '{ident}' not found"))),
        1 => Ok(ResolvedKey {
            record: matches.remove(0),
            by_name: true,
        }),
        _ => Err(conflict(format!(
            "Several users have a key named '{ident}'; address it by key_id"
        ))),
    }
}

async fn user_name_of(state: &AppState, user_id: &str) -> Option<String> {
    if user_id.is_empty() {
        return None;
    }
    state
        .database
        .users()
        .get_user(user_id)
        .await
        .ok()
        .flatten()
        .map(|u| u.name)
}

async fn item(state: &AppState, record: &ApiKeyRecord) -> AdminKeyItem {
    AdminKeyItem::from_record(record, user_name_of(state, &record.user_id).await)
}

fn validate_key_limits(
    rate_limit: Option<i32>,
    tpm_limit: Option<i32>,
    monthly_budget: Option<f64>,
    expires_at: Option<i64>,
) -> Result<(), HandlerError> {
    validate_positive("tpm_limit", tpm_limit)?;
    if rate_limit.is_some_and(|r| r < 0) {
        return Err(bad_request("rate_limit must be >= 0 (0 or null = none)"));
    }
    validate_non_negative("monthly_budget", monthly_budget)?;
    if expires_at.is_some_and(|t| t <= 0) {
        return Err(bad_request(
            "expires_at must be a unix timestamp in seconds",
        ));
    }
    Ok(())
}

// ============================================================================
// Handlers
// ============================================================================

/// GET /admin/api/keys[?user=]
pub async fn list_keys(
    State(state): State<AppState>,
    Query(query): Query<ListKeysQuery>,
) -> Response {
    let records = match query.user.as_deref().filter(|s| !s.is_empty()) {
        Some(ident) => match resolve_user(&state, ident).await {
            Ok(user) => {
                state
                    .database
                    .api_keys()
                    .list_api_keys_by_user(&user.user_id)
                    .await
            }
            Err(resp) => return *resp,
        },
        None => state.database.api_keys().list_api_keys().await,
    };
    let records = match records {
        Ok(r) => r,
        Err(e) => return *internal_error("Failed to retrieve API keys", &e),
    };
    let names: HashMap<String, String> = state
        .database
        .users()
        .list_users()
        .await
        .map(|us| us.into_iter().map(|u| (u.user_id, u.name)).collect())
        .unwrap_or_default();
    let data = records
        .iter()
        .map(|r| AdminKeyItem::from_record(r, names.get(&r.user_id).cloned()))
        .collect();
    Json(KeyListResponse {
        object: "list",
        data,
    })
    .into_response()
}

/// GET /admin/api/keys/:key_id
pub async fn get_key(State(state): State<AppState>, Path(ident): Path<String>) -> Response {
    match resolve_key(&state, &ident).await {
        Ok(k) => k.finish(Json(item(&state, &k.record).await).into_response()),
        Err(resp) => *resp,
    }
}

/// POST /admin/api/keys — generate key, store it, return plaintext once
pub async fn create_key(
    State(state): State<AppState>,
    Json(body): Json<CreateKeyRequest>,
) -> Response {
    match create_key_inner(&state, body).await {
        Ok(resp) => resp,
        Err(resp) => *resp,
    }
}

async fn create_key_inner(
    state: &AppState,
    body: CreateKeyRequest,
) -> Result<Response, HandlerError> {
    validate_name(&body.name)?;
    validate_key_limits(
        body.rate_limit,
        body.tpm_limit,
        body.monthly_budget,
        body.expires_at,
    )?;
    validate_non_negative("cost_rate", body.cost_rate)?;
    let metadata = body.metadata.as_ref().map(encode_metadata).transpose()?;
    let allowed_models = validate_allowed_models(body.allowed_models)?;
    let now = Utc::now().timestamp();

    // Owner: explicit user, or (legacy) a new user carrying the limit fields.
    let legacy = body.user_id.is_none();
    let (user, key_limits) = match body.user_id.as_deref() {
        Some(ident) => {
            if body.cost_rate.is_some() {
                return Err(bad_request(
                    "cost_rate is a user setting — set it on the user (PUT /admin/api/users/:id)",
                ));
            }
            let user = resolve_user(state, ident).await?;
            (
                user,
                (
                    body.rate_limit.unwrap_or(0),
                    body.tpm_limit,
                    body.monthly_budget,
                    body.cache_ttl.clone(),
                ),
            )
        }
        None => {
            let mut user = UserRecord::new(body.name.trim(), now);
            user.cost_rate = body.cost_rate.unwrap_or(1.0);
            user.monthly_budget = body.monthly_budget;
            // Pre-users default: a key without an explicit rate got 100 rpm.
            user.rate_limit = Some(body.rate_limit.unwrap_or(100)).filter(|r| *r > 0);
            user.tpm_limit = body.tpm_limit;
            user.cache_ttl = body.cache_ttl.clone();
            match state.database.users().create_user(&user).await {
                Ok(()) => {}
                Err(e) if is_unique_error(&e, "name") => {
                    return Err(conflict(format!(
                        "A user named '{}' already exists; pass user_id to add a key to it",
                        user.name
                    )))
                }
                Err(e) => return Err(internal_error("Failed to create user", &e)),
            }
            (user, (0, None, None, None))
        }
    };

    // Generate key: sk-<32 hex chars>
    let raw_key = format!("sk-{}", uuid::Uuid::new_v4().to_string().replace('-', ""));
    let (rate_limit, tpm_limit, monthly_budget, cache_ttl) = key_limits;
    let record = ApiKeyRecord {
        api_key: hash_key(&raw_key, state.settings.encryption_key.as_deref()),
        key_id: new_key_id(),
        key_display: mask_key(&raw_key),
        user_id: user.user_id.clone(),
        name: body.name.trim().to_string(),
        is_active: true,
        rate_limit,
        cost_rate: 1.0,
        monthly_budget,
        budget_used: 0.0,
        budget_used_mtd: 0.0,
        budget_mtd_month: None,
        deactivated_reason: None,
        budget_history: None,
        tpm_limit,
        cache_ttl,
        metadata,
        expires_at: body.expires_at,
        allowed_models,
        created_at: now,
        updated_at: None,
    };

    let created = state.database.api_keys().create_api_key(&record).await;
    if let Err(e) = created {
        if legacy {
            // Don't leave the auto-created user behind.
            let _ = state.database.users().delete_user(&user.user_id).await;
        }
        return Err(if is_unique_error(&e, "name") {
            conflict_name()
        } else {
            internal_error("Failed to create API key", &e)
        });
    }

    let resp = (
        StatusCode::CREATED,
        Json(CreateKeyResponse {
            key_id: record.key_id,
            user_id: record.user_id,
            api_key: raw_key,
            name: record.name,
            message: "Save this key — it will not be shown again.",
        }),
    )
        .into_response();
    Ok(if legacy { deprecated(resp) } else { resp })
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
    match update_key_inner(&state, &resolved, body).await {
        Ok(record) => resolved.finish(Json(item(&state, &record).await).into_response()),
        Err(resp) => *resp,
    }
}

async fn update_key_inner(
    state: &AppState,
    resolved: &ResolvedKey,
    body: UpdateKeyRequest,
) -> Result<ApiKeyRecord, HandlerError> {
    if body.cost_rate.is_some() {
        return Err(bad_request(
            "cost_rate is a user setting — set it on the user (PUT /admin/api/users/:id)",
        ));
    }
    validate_key_limits(
        body.rate_limit.flatten(),
        body.tpm_limit.flatten(),
        body.monthly_budget.flatten(),
        body.expires_at.flatten(),
    )?;
    let mut record = resolved.record.clone();

    if let Some(name) = body.name {
        validate_name(&name)?;
        record.name = name.trim().to_string();
    }
    if let Some(rate_limit) = body.rate_limit {
        record.rate_limit = rate_limit.unwrap_or(0);
    }
    if let Some(tpm) = body.tpm_limit {
        record.tpm_limit = tpm;
    }
    if let Some(budget) = body.monthly_budget {
        record.monthly_budget = budget;
    }
    if let Some(cache_ttl) = body.cache_ttl {
        record.cache_ttl = cache_ttl;
    }
    if let Some(metadata) = body.metadata {
        record.metadata = metadata.as_ref().map(encode_metadata).transpose()?;
    }
    if let Some(expires_at) = body.expires_at {
        record.expires_at = expires_at;
    }
    if let Some(models) = body.allowed_models {
        record.allowed_models = validate_allowed_models(models)?;
    }

    match state.database.api_keys().update_api_key(&record).await {
        Ok(()) => Ok(record),
        Err(e) if is_unique_error(&e, "name") => Err(conflict_name()),
        Err(e) => Err(internal_error("Failed to update API key", &e)),
    }
}

/// DELETE /admin/api/keys/:key_id?action=delete|deactivate
///
/// `action=delete` permanently removes the key (usage history is kept and stays
/// attributed through `key_id` / `user_id`). Without `action=delete` the key is
/// only deactivated — the pre-0.35 default, kept for one release and flagged
/// with a `Deprecation` header; use `POST …/deactivate` instead.
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
        Some("delete") => match hard_delete(&state, &resolved.record).await {
            Ok(()) => resolved.finish(Json(OkResponse { ok: true }).into_response()),
            Err(resp) => *resp,
        },
        None | Some("deactivate") => deprecated(deactivate(&state, &resolved.record).await),
        Some(other) => *bad_request(format!(
            "Unknown action '{other}' (expected 'delete' or 'deactivate')"
        )),
    }
}

/// Permanently delete one key (shared with user cascade delete).
pub(super) async fn hard_delete(
    state: &AppState,
    record: &ApiKeyRecord,
) -> Result<(), HandlerError> {
    state
        .database
        .api_keys()
        .delete_api_key(&record.api_key)
        .await
        .map_err(|e| internal_error("Failed to delete API key", &e))?;
    tracing::info!(
        key_id = %record.key_id,
        user_id = %record.user_id,
        name = %record.name,
        key_display = %record.key_display,
        "API key permanently deleted"
    );
    Ok(())
}

async fn deactivate(state: &AppState, record: &ApiKeyRecord) -> Response {
    match state
        .database
        .api_keys()
        .deactivate_api_key(&record.api_key, "admin")
        .await
    {
        Ok(()) => Json(OkResponse { ok: true }).into_response(),
        Err(e) => *internal_error("Failed to deactivate API key", &e),
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
        Ok(()) => resolved.finish(Json(item(&state, &record).await).into_response()),
        Err(e) => *internal_error("Failed to activate API key", &e),
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
            user_id: "u1".to_string(),
            name: "Test".to_string(),
            is_active: true,
            rate_limit: 0,
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
            expires_at: None,
            allowed_models: Some(vec!["claude-*".into()]),
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
        let item = AdminKeyItem::from_record(&record(), Some("alice".into()));
        assert!(!item.api_key.contains("e5f6a1b2")); // full key not exposed
        assert!(item.api_key.contains("...")); // truncated
        assert_eq!(item.key_id, "4b1d2c9e-7a51-4f0e-9c1e-2f6a8d3b5c70");
        assert_eq!(item.user_name.as_deref(), Some("alice"));
        assert_eq!(item.rate_limit, None); // 0 = no key-level sub-limit
        assert_eq!(item.metadata, Some(serde_json::json!({"owner": "alice"})));
    }

    #[test]
    fn admin_key_item_never_serializes_hash() {
        let mut r = record();
        r.api_key = "a".repeat(64); // hashed form
        r.key_display = "sk-abcd••••5678".to_string();
        let json = serde_json::to_string(&AdminKeyItem::from_record(&r, None)).unwrap();
        assert!(!json.contains(&"a".repeat(64)));
    }

    #[test]
    fn stale_month_spend_reads_as_zero() {
        let mut r = record();
        r.budget_used_mtd = 9.0;
        r.budget_mtd_month = Some("2000-01".into());
        assert_eq!(AdminKeyItem::from_record(&r, None).budget_used_mtd, 0.0);
    }

    #[test]
    fn create_request_shapes() {
        let req: CreateKeyRequest = serde_json::from_str(r#"{"name":"Test"}"#).unwrap();
        assert!(req.user_id.is_none());
        assert!(req.cost_rate.is_none());
        let req: CreateKeyRequest = serde_json::from_str(
            r#"{"name":"ci","user_id":"alice","expires_at":1900000000,"allowed_models":["claude-*"]}"#,
        )
        .unwrap();
        assert_eq!(req.user_id.as_deref(), Some("alice"));
        assert_eq!(req.expires_at, Some(1_900_000_000));
    }

    #[test]
    fn update_request_tri_state() {
        let req: UpdateKeyRequest = serde_json::from_str(r#"{"name":"New Name"}"#).unwrap();
        assert_eq!(req.tpm_limit, None);
        assert_eq!(req.expires_at, None);
        let req: UpdateKeyRequest = serde_json::from_str(
            r#"{"rate_limit": null, "expires_at": null, "allowed_models": null}"#,
        )
        .unwrap();
        assert_eq!(req.rate_limit, Some(None));
        assert_eq!(req.expires_at, Some(None));
        assert_eq!(req.allowed_models, Some(None));
        let req: UpdateKeyRequest =
            serde_json::from_str(r#"{"tpm_limit": 5000, "monthly_budget": 99.5}"#).unwrap();
        assert_eq!(req.tpm_limit, Some(Some(5000)));
        assert_eq!(req.monthly_budget, Some(Some(99.5)));
    }

    #[test]
    fn key_limit_validation() {
        assert!(validate_key_limits(Some(0), None, None, None).is_ok());
        assert!(validate_key_limits(Some(-1), None, None, None).is_err());
        assert!(validate_key_limits(None, Some(0), None, None).is_err());
        assert!(validate_key_limits(None, None, Some(-1.0), None).is_err());
        assert!(validate_key_limits(None, None, None, Some(0)).is_err());
        assert!(validate_key_limits(Some(10), Some(1000), Some(5.0), Some(1)).is_ok());
    }
}
