//! Admin API — users (billing and shared-limit principals owning API keys)
//!
//! Users are addressed by `user_id` or by (globally unique) name.
//!
//! GET    /admin/api/users                      → list (with key counts)
//! POST   /admin/api/users                      → create
//! GET    /admin/api/users/:user                → one user + its keys
//! PUT    /admin/api/users/:user                → update mutable fields
//! DELETE /admin/api/users/:user[?cascade=true] → delete (409 while it owns keys,
//!                                                unless cascade deletes them too)
//! POST   /admin/api/users/:user/deactivate     → disable every key of the user
//! POST   /admin/api/users/:user/activate

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
use super::keys::{hard_delete, AdminKeyItem};
use crate::database::models::{period_spend, BudgetPeriod, UserRecord};
use crate::server::state::AppState;
use crate::services::audit::AuditDetail;

// ============================================================================
// Types
// ============================================================================

#[derive(Debug, Serialize)]
pub struct AdminUserItem {
    pub user_id: String,
    pub name: String,
    pub email: Option<String>,
    pub is_active: bool,
    pub cost_rate: f64,
    pub monthly_budget: Option<f64>,
    /// Spend in the current month (a counter from an earlier month reads 0).
    pub budget_used_mtd: f64,
    pub budget_used: f64,
    pub budget_history: Option<serde_json::Value>,
    /// RPM shared by all keys (`None` = global `rate_limit` setting).
    pub rate_limit: Option<i32>,
    pub tpm_limit: Option<i32>,
    pub allowed_models: Option<Vec<String>>,
    pub cache_ttl: Option<String>,
    pub allowed_cidrs: Option<Vec<String>>,
    pub budget_period: BudgetPeriod,
    pub default_tags: Option<Vec<String>>,
    pub metadata: Option<serde_json::Value>,
    pub key_count: usize,
    pub created_at: i64,
    pub updated_at: Option<i64>,
}

impl AdminUserItem {
    fn from_record(u: &UserRecord, key_count: usize) -> Self {
        let month = u.budget_period.key_at(Utc::now());
        Self {
            user_id: u.user_id.clone(),
            name: u.name.clone(),
            email: u.email.clone(),
            is_active: u.is_active,
            cost_rate: u.cost_rate,
            monthly_budget: u.monthly_budget,
            budget_used_mtd: period_spend(u.budget_used_mtd, u.budget_mtd_month.as_deref(), &month),
            budget_used: u.budget_used,
            budget_history: decode_metadata(u.budget_history.as_deref()),
            rate_limit: u.rate_limit,
            tpm_limit: u.tpm_limit,
            allowed_models: u.allowed_models.clone(),
            cache_ttl: u.cache_ttl.clone(),
            allowed_cidrs: u.allowed_cidrs.clone(),
            budget_period: u.budget_period,
            default_tags: u.default_tags.clone(),
            metadata: decode_metadata(u.metadata.as_deref()),
            key_count,
            created_at: u.created_at,
            updated_at: u.updated_at,
        }
    }
}

#[derive(Debug, Serialize)]
pub struct UserDetail {
    #[serde(flatten)]
    pub user: AdminUserItem,
    pub keys: Vec<AdminKeyItem>,
}

#[derive(Debug, Serialize)]
pub struct UserListResponse {
    pub object: &'static str,
    pub data: Vec<AdminUserItem>,
}

#[derive(Debug, Deserialize)]
pub struct CreateUserRequest {
    pub name: String,
    pub email: Option<String>,
    pub cost_rate: Option<f64>,
    pub monthly_budget: Option<f64>,
    pub rate_limit: Option<i32>,
    pub tpm_limit: Option<i32>,
    pub allowed_models: Option<Vec<String>>,
    pub cache_ttl: Option<String>,
    pub metadata: Option<serde_json::Value>,
    pub allowed_cidrs: Option<Vec<String>>,
    /// `monthly` (default) / `weekly` / `daily`.
    pub budget_period: Option<String>,
    pub default_tags: Option<Vec<String>>,
}

#[derive(Debug, Deserialize)]
pub struct UpdateUserRequest {
    pub name: Option<String>,
    #[serde(default, deserialize_with = "deserialize_optional_field")]
    pub email: Option<Option<String>>,
    pub cost_rate: Option<f64>,
    #[serde(default, deserialize_with = "deserialize_optional_field")]
    pub monthly_budget: Option<Option<f64>>,
    #[serde(default, deserialize_with = "deserialize_optional_field")]
    pub rate_limit: Option<Option<i32>>,
    #[serde(default, deserialize_with = "deserialize_optional_field")]
    pub tpm_limit: Option<Option<i32>>,
    #[serde(default, deserialize_with = "deserialize_optional_field")]
    pub allowed_models: Option<Option<Vec<String>>>,
    #[serde(default, deserialize_with = "deserialize_optional_field")]
    pub cache_ttl: Option<Option<String>>,
    #[serde(default, deserialize_with = "deserialize_optional_field")]
    pub metadata: Option<Option<serde_json::Value>>,
    #[serde(default, deserialize_with = "deserialize_optional_field")]
    pub allowed_cidrs: Option<Option<Vec<String>>>,
    pub budget_period: Option<String>,
    #[serde(default, deserialize_with = "deserialize_optional_field")]
    pub default_tags: Option<Option<Vec<String>>>,
}

#[derive(Debug, Deserialize)]
pub struct DeleteUserQuery {
    #[serde(default)]
    pub cascade: bool,
}

#[derive(Debug, Serialize)]
pub struct DeleteUserResponse {
    pub ok: bool,
    pub deleted_keys: usize,
}

// ============================================================================
// Helpers
// ============================================================================

/// Resolve a `user_id` or user name.
pub(super) async fn resolve_user(
    state: &AppState,
    ident: &str,
) -> Result<UserRecord, HandlerError> {
    let users = state.database.users();
    match users.get_user(ident).await {
        Ok(Some(u)) => return Ok(u),
        Ok(None) => {}
        Err(e) => return Err(internal_error("Failed to retrieve user", &e)),
    }
    match users.get_user_by_name(ident).await {
        Ok(Some(u)) => Ok(u),
        Ok(None) => Err(not_found(format!("User '{ident}' not found"))),
        Err(e) => Err(internal_error("Failed to retrieve user", &e)),
    }
}

fn validate_user_limits(
    cost_rate: Option<f64>,
    monthly_budget: Option<f64>,
    rate_limit: Option<i32>,
    tpm_limit: Option<i32>,
) -> Result<(), HandlerError> {
    validate_non_negative("cost_rate", cost_rate)?;
    validate_non_negative("monthly_budget", monthly_budget)?;
    validate_positive("rate_limit", rate_limit)?;
    validate_positive("tpm_limit", tpm_limit)
}

fn name_conflict(name: &str) -> HandlerError {
    conflict(format!("A user named '{name}' already exists"))
}

async fn key_count(state: &AppState, user_id: &str) -> usize {
    state
        .database
        .api_keys()
        .list_api_keys_by_user(user_id)
        .await
        .map(|k| k.len())
        .unwrap_or(0)
}

fn respond<T: Serialize>(r: Result<T, HandlerError>) -> Response {
    match r {
        Ok(v) => Json(v).into_response(),
        Err(resp) => *resp,
    }
}

/// Like [`respond`], attaching an audit detail on success.
fn respond_audited<T: Serialize>(r: Result<(T, AuditDetail), HandlerError>) -> Response {
    match r {
        Ok((v, d)) => d.attach(Json(v).into_response()),
        Err(resp) => *resp,
    }
}

// ============================================================================
// Handlers
// ============================================================================

/// GET /admin/api/users
pub async fn list_users(State(state): State<AppState>) -> Response {
    let users = match state.database.users().list_users().await {
        Ok(u) => u,
        Err(e) => return *internal_error("Failed to retrieve users", &e),
    };
    let mut counts: HashMap<String, usize> = HashMap::new();
    if let Ok(keys) = state.database.api_keys().list_api_keys().await {
        for k in keys {
            *counts.entry(k.user_id).or_default() += 1;
        }
    }
    let data = users
        .iter()
        .map(|u| AdminUserItem::from_record(u, counts.get(&u.user_id).copied().unwrap_or(0)))
        .collect();
    Json(UserListResponse {
        object: "list",
        data,
    })
    .into_response()
}

/// POST /admin/api/users
pub async fn create_user(
    State(state): State<AppState>,
    Json(body): Json<CreateUserRequest>,
) -> Response {
    let result = async {
        validate_name(&body.name)?;
        validate_user_limits(
            body.cost_rate,
            body.monthly_budget,
            body.rate_limit,
            body.tpm_limit,
        )?;
        let mut user = UserRecord::new(body.name.trim(), Utc::now().timestamp());
        user.email = body.email.filter(|e| !e.trim().is_empty());
        user.cost_rate = body.cost_rate.unwrap_or(1.0);
        user.monthly_budget = body.monthly_budget;
        user.rate_limit = body.rate_limit;
        user.tpm_limit = body.tpm_limit;
        user.allowed_models = validate_allowed_models(body.allowed_models)?;
        user.cache_ttl = body.cache_ttl;
        user.metadata = body.metadata.as_ref().map(encode_metadata).transpose()?;
        user.allowed_cidrs = validate_cidrs(body.allowed_cidrs)?;
        user.default_tags = validate_tags(body.default_tags)?;
        user.budget_period =
            parse_budget_period(body.budget_period.as_deref())?.unwrap_or_default();
        match state.database.users().create_user(&user).await {
            Ok(()) => Ok(AdminUserItem::from_record(&user, 0)),
            Err(e) if is_unique_error(&e, "name") => Err(name_conflict(&user.name)),
            Err(e) => Err(internal_error("Failed to create user", &e)),
        }
    }
    .await;
    match result {
        Ok(item) => AuditDetail::new("user.create", "user", &item.user_id)
            .after(&item)
            .attach((StatusCode::CREATED, Json(item)).into_response()),
        Err(resp) => *resp,
    }
}

/// GET /admin/api/users/:user
pub async fn get_user(State(state): State<AppState>, Path(ident): Path<String>) -> Response {
    respond(
        async {
            let user = resolve_user(&state, &ident).await?;
            let keys = state
                .database
                .api_keys()
                .list_api_keys_by_user(&user.user_id)
                .await
                .map_err(|e| internal_error("Failed to retrieve API keys", &e))?;
            Ok(UserDetail {
                user: AdminUserItem::from_record(&user, keys.len()),
                keys: keys
                    .iter()
                    .map(|k| AdminKeyItem::from_record(k, Some(user.name.clone())))
                    .collect(),
            })
        }
        .await,
    )
}

/// PUT /admin/api/users/:user
pub async fn update_user(
    State(state): State<AppState>,
    Path(ident): Path<String>,
    Json(body): Json<UpdateUserRequest>,
) -> Response {
    respond_audited(
        async {
            let mut user = resolve_user(&state, &ident).await?;
            let before = AdminUserItem::from_record(&user, 0);
            validate_user_limits(
                body.cost_rate,
                body.monthly_budget.flatten(),
                body.rate_limit.flatten(),
                body.tpm_limit.flatten(),
            )?;
            if let Some(name) = body.name {
                validate_name(&name)?;
                user.name = name.trim().to_string();
            }
            if let Some(email) = body.email {
                user.email = email.filter(|e| !e.trim().is_empty());
            }
            if let Some(rate) = body.cost_rate {
                user.cost_rate = rate;
            }
            if let Some(budget) = body.monthly_budget {
                user.monthly_budget = budget;
            }
            if let Some(rpm) = body.rate_limit {
                user.rate_limit = rpm;
            }
            if let Some(tpm) = body.tpm_limit {
                user.tpm_limit = tpm;
            }
            if let Some(models) = body.allowed_models {
                user.allowed_models = validate_allowed_models(models)?;
            }
            if let Some(ttl) = body.cache_ttl {
                user.cache_ttl = ttl;
            }
            if let Some(meta) = body.metadata {
                user.metadata = meta.as_ref().map(encode_metadata).transpose()?;
            }
            if let Some(cidrs) = body.allowed_cidrs {
                user.allowed_cidrs = validate_cidrs(cidrs)?;
            }
            if let Some(p) = parse_budget_period(body.budget_period.as_deref())? {
                user.budget_period = p;
            }
            if let Some(tags) = body.default_tags {
                user.default_tags = validate_tags(tags)?;
            }
            match state.database.users().update_user(&user).await {
                Ok(()) => {
                    state.auth_cache.invalidate_all();
                    let mut before = before;
                    let after =
                        AdminUserItem::from_record(&user, key_count(&state, &user.user_id).await);
                    before.key_count = after.key_count;
                    let detail = AuditDetail::new("user.update", "user", &user.user_id)
                        .before(&before)
                        .after(&after);
                    Ok((after, detail))
                }
                Err(e) if is_unique_error(&e, "name") => Err(name_conflict(&user.name)),
                Err(e) => Err(internal_error("Failed to update user", &e)),
            }
        }
        .await,
    )
}

/// DELETE /admin/api/users/:user[?cascade=true]
pub async fn delete_user(
    State(state): State<AppState>,
    Path(ident): Path<String>,
    Query(query): Query<DeleteUserQuery>,
) -> Response {
    respond_audited(
        async {
            let user = resolve_user(&state, &ident).await?;
            let keys = state
                .database
                .api_keys()
                .list_api_keys_by_user(&user.user_id)
                .await
                .map_err(|e| internal_error("Failed to retrieve API keys", &e))?;
            let before = AdminUserItem::from_record(&user, keys.len());
            if !keys.is_empty() && !query.cascade {
                return Err(conflict(format!(
                    "User '{}' still owns {} API key(s); delete them first or pass cascade=true",
                    user.name,
                    keys.len()
                )));
            }
            for key in &keys {
                hard_delete(&state, key).await?;
            }
            state
                .database
                .users()
                .delete_user(&user.user_id)
                .await
                .map_err(|e| internal_error("Failed to delete user", &e))?;
            state.auth_cache.invalidate_all();
            tracing::info!(user_id = %user.user_id, name = %user.name, deleted_keys = keys.len(), "User deleted");
            let detail = AuditDetail::new("user.delete", "user", &user.user_id)
                .before(&before)
                .after(&serde_json::json!({
                    "deleted_key_ids": keys.iter().map(|k| k.key_id.clone()).collect::<Vec<_>>(),
                }));
            Ok((
                DeleteUserResponse {
                    ok: true,
                    deleted_keys: keys.len(),
                },
                detail,
            ))
        }
        .await,
    )
}

async fn set_active(
    state: &AppState,
    ident: &str,
    active: bool,
) -> Result<(AdminUserItem, AuditDetail), HandlerError> {
    let mut user = resolve_user(state, ident).await?;
    user.is_active = active;
    state
        .database
        .users()
        .update_user(&user)
        .await
        .map_err(|e| internal_error("Failed to update user", &e))?;
    state.auth_cache.invalidate_all();
    let item = AdminUserItem::from_record(&user, key_count(state, &user.user_id).await);
    let action = if active {
        "user.activate"
    } else {
        "user.deactivate"
    };
    let detail = AuditDetail::new(action, "user", &user.user_id);
    Ok((item, detail))
}

/// POST /admin/api/users/:user/deactivate
pub async fn deactivate_user(State(state): State<AppState>, Path(ident): Path<String>) -> Response {
    respond_audited(set_active(&state, &ident, false).await)
}

/// POST /admin/api/users/:user/activate
pub async fn activate_user(State(state): State<AppState>, Path(ident): Path<String>) -> Response {
    respond_audited(set_active(&state, &ident, true).await)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn user_item_reports_current_month_spend() {
        let mut u = UserRecord::new("alice", 0);
        u.budget_used_mtd = 7.0;
        u.budget_mtd_month = Some("2000-01".into());
        u.metadata = Some(r#"{"team":"x"}"#.into());
        let item = AdminUserItem::from_record(&u, 2);
        assert_eq!(item.budget_used_mtd, 0.0);
        assert_eq!(item.key_count, 2);
        assert_eq!(item.metadata, Some(serde_json::json!({"team": "x"})));
    }

    #[test]
    fn user_limit_validation() {
        assert!(validate_user_limits(Some(1.0), Some(10.0), Some(60), Some(1000)).is_ok());
        assert!(validate_user_limits(Some(-1.0), None, None, None).is_err());
        assert!(validate_user_limits(None, None, Some(0), None).is_err());
        assert!(validate_user_limits(None, None, None, Some(0)).is_err());
    }

    #[test]
    fn update_request_tri_state() {
        let req: UpdateUserRequest =
            serde_json::from_str(r#"{"rate_limit": null, "email": "a@b"}"#).unwrap();
        assert_eq!(req.rate_limit, Some(None));
        assert_eq!(req.email, Some(Some("a@b".into())));
        assert!(req.monthly_budget.is_none());
    }
}
