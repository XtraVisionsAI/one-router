//! Admin API — usage statistics (bypasses per-key guards)
//!
//! GET /admin/api/usage/summary → aggregated usage (filtered by api_key)
//! GET /admin/api/usage/records → raw records (admin: no start_time guard)

use axum::{
    extract::{Query, State},
    http::StatusCode,
    response::IntoResponse,
    Json,
};
use serde::{Deserialize, Serialize};

use std::collections::HashMap;

use crate::database::models::{explode_tag_rows, looks_like_key_id, storage_dimension};
use crate::database::traits::UsageFilter;
use crate::middleware::auth::{EPHEMERAL_KEY_ID, MASTER_KEY_ID};
use crate::schemas::anthropic::ErrorResponse;
use crate::server::state::AppState;

// ============================================================================
// Query params
// ============================================================================

#[derive(Debug, Deserialize)]
pub struct AdminUsageQueryParams {
    /// Filter by API key: `key_id`, key name (legacy), or `__master__`/`__ephemeral__`.
    /// Absent = all keys.
    pub api_key: Option<String>,
    /// Filter by user: `user_id` or user name. Combines with `api_key` (AND).
    pub user: Option<String>,
    /// Filter by team: `team_id` or team name.
    pub team: Option<String>,
    /// Only rows carrying this usage tag.
    pub tag: Option<String>,
    pub start_time: Option<String>,
    pub end_time: Option<String>,
    #[serde(default = "default_group_by")]
    pub group_by: String,
    /// Optional secondary grouping dimension (e.g. split_by=provider with group_by=day)
    pub split_by: Option<String>,
}

fn default_group_by() -> String {
    "hour".to_string()
}

#[derive(Debug, Deserialize)]
pub struct AdminRecordsQueryParams {
    pub api_key: Option<String>,
    pub user: Option<String>,
    pub team: Option<String>,
    pub tag: Option<String>,
    pub start_time: Option<String>,
    pub limit: Option<i64>,
}

// ============================================================================
// Response types (re-use same shapes as /v1/usage)
// ============================================================================

#[derive(Debug, Serialize)]
pub struct UsageSummaryResponse {
    pub object: &'static str,
    pub data: Vec<UsageBucket>,
    pub summary: UsageTotals,
}

#[derive(Debug, Serialize)]
pub struct UsageBucket {
    pub group_key: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub split_key: Option<String>,
    pub input_tokens: i64,
    pub output_tokens: i64,
    pub cached_tokens: i64,
    pub cache_write_tokens: i64,
    pub total_cost: f64,
    pub total_requests: i64,
    pub error_requests: i64,
}

#[derive(Debug, Serialize)]
pub struct UsageTotals {
    pub total_requests: i64,
    pub total_input_tokens: i64,
    pub total_output_tokens: i64,
    pub total_cached_tokens: i64,
    pub total_cost: f64,
}

#[derive(Debug, Serialize)]
pub struct UsageRecordsResponse {
    pub object: &'static str,
    pub data: Vec<UsageRecordItem>,
    pub has_more: bool,
}

#[derive(Debug, Serialize)]
pub struct UsageRecordItem {
    pub id: Option<i64>,
    /// Display label of the key (name, or `deleted key · <id>`).
    pub api_key: String,
    /// Stable key identifier; `None` on legacy rows of since-deleted keys.
    pub key_id: Option<String>,
    /// Owning user's display label (name, `deleted user · <id>`, or `unattributed`).
    pub user: String,
    pub user_id: Option<String>,
    pub team_id: Option<String>,
    pub tags: Vec<String>,
    pub timestamp: String,
    pub request_id: String,
    pub model: String,
    pub input_tokens: i64,
    pub output_tokens: i64,
    pub cached_tokens: i64,
    pub cache_write_tokens: i64,
    pub cost: f64,
    pub success: bool,
    pub duration_ms: Option<i64>,
    pub provider: Option<String>,
    pub protocol: Option<String>,
}

// ============================================================================
// Handlers
// ============================================================================

/// Internal key identifiers stored in usage records (not in api_keys table).
const INTERNAL_KEY_IDS: &[&str] = &[MASTER_KEY_ID, EPHEMERAL_KEY_ID];

/// Resolve an api_key query parameter to the value stored in `usage.api_key`
/// (the storage filter column). Accepts a `key_id`, a key name (legacy), or an
/// internal identifier (`__master__`, `__ephemeral__`, passed through).
async fn resolve_api_key_filter(
    state: &AppState,
    ident: Option<&str>,
) -> Result<String, Box<axum::response::Response>> {
    let store = state.database.api_keys();
    match ident.filter(|s| !s.is_empty()) {
        Some(id) if INTERNAL_KEY_IDS.contains(&id) => Ok(id.to_string()),
        Some(id) => {
            let by_id = if looks_like_key_id(id) {
                store.get_api_key_by_id(id).await
            } else {
                Ok(None)
            };
            let found = match by_id {
                Ok(Some(r)) => Ok(Some(r)),
                Ok(None) => store.get_api_key_by_name(id).await,
                Err(e) => Err(e),
            };
            let name = id;
            match found {
                Ok(Some(record)) => Ok(record.api_key),
                Ok(None) => Err(Box::new(
                    (
                        StatusCode::NOT_FOUND,
                        Json(ErrorResponse::new(
                            "not_found_error",
                            format!("API key '{name}' not found"),
                        )),
                    )
                        .into_response(),
                )),
                Err(e) => Err(Box::new(
                    (
                        StatusCode::INTERNAL_SERVER_ERROR,
                        Json(ErrorResponse::new("api_error", e.to_string())),
                    )
                        .into_response(),
                )),
            }
        }
        None => Ok(String::new()), // empty = all keys
    }
}

/// Resolve a `user` query parameter (`user_id` or name) to a `user_id`.
async fn resolve_user_filter(
    state: &AppState,
    ident: Option<&str>,
) -> Result<Option<String>, Box<axum::response::Response>> {
    let Some(ident) = ident.filter(|s| !s.is_empty()) else {
        return Ok(None);
    };
    let users = state.database.users();
    let found = match users.get_user(ident).await {
        Ok(Some(u)) => Ok(Some(u)),
        Ok(None) => users.get_user_by_name(ident).await,
        Err(e) => Err(e),
    };
    match found {
        Ok(Some(u)) => Ok(Some(u.user_id)),
        Ok(None) => Err(Box::new(
            (
                StatusCode::NOT_FOUND,
                Json(ErrorResponse::new(
                    "not_found_error",
                    format!("User '{ident}' not found"),
                )),
            )
                .into_response(),
        )),
        Err(e) => Err(Box::new(
            (
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(ErrorResponse::new("api_error", e.to_string())),
            )
                .into_response(),
        )),
    }
}

/// Resolve a `team` query parameter (`team_id` or name) to a `team_id`.
async fn resolve_team_filter(
    state: &AppState,
    ident: Option<&str>,
) -> Result<Option<String>, Box<axum::response::Response>> {
    let Some(ident) = ident.filter(|s| !s.is_empty()) else {
        return Ok(None);
    };
    let teams = state.database.teams();
    let found = match teams.get_team(ident).await {
        Ok(Some(t)) => Ok(Some(t)),
        Ok(None) => teams.get_team_by_name(ident).await,
        Err(e) => Err(e),
    };
    match found {
        Ok(Some(t)) => Ok(Some(t.team_id)),
        Ok(None) => Err(Box::new(
            (
                StatusCode::NOT_FOUND,
                Json(ErrorResponse::new(
                    "not_found_error",
                    format!("Team '{ident}' not found"),
                )),
            )
                .into_response(),
        )),
        Err(e) => Err(Box::new(
            (
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(ErrorResponse::new("api_error", e.to_string())),
            )
                .into_response(),
        )),
    }
}

/// `team_id` → team name.
async fn build_team_labels(state: &AppState) -> HashMap<String, String> {
    state
        .database
        .teams()
        .list_teams()
        .await
        .map(|ts| ts.into_iter().map(|t| (t.team_id, t.name)).collect())
        .unwrap_or_default()
}

/// Display label for a usage row's `team_id` ("" / None = no team).
fn resolve_team_name(raw: Option<&str>, labels: &HashMap<String, String>) -> String {
    match raw.filter(|s| !s.is_empty()) {
        None => "(no team)".to_string(),
        Some(id) => labels.get(id).cloned().unwrap_or_else(|| {
            let short: String = id.chars().take(8).collect();
            format!("deleted team · {short}")
        }),
    }
}

/// `user_id` → user name.
async fn build_user_labels(state: &AppState) -> HashMap<String, String> {
    state
        .database
        .users()
        .list_users()
        .await
        .map(|users| users.into_iter().map(|u| (u.user_id, u.name)).collect())
        .unwrap_or_default()
}

/// Display label for a usage row's `user_id` ("" / None = unattributed).
fn resolve_user_name(raw: Option<&str>, labels: &HashMap<String, String>) -> String {
    match raw.filter(|s| !s.is_empty()) {
        None => "unattributed".to_string(),
        Some(id) => labels.get(id).cloned().unwrap_or_else(|| {
            let short: String = id.chars().take(8).collect();
            format!("deleted user · {short}")
        }),
    }
}

/// Build a mapping from usage key identifiers (`key_id`, legacy hashes,
/// internal IDs) to human-readable display names.
async fn build_api_key_labels(state: &AppState) -> HashMap<String, String> {
    let mut labels = HashMap::new();
    labels.insert(MASTER_KEY_ID.to_string(), "Master Key".to_string());
    labels.insert(EPHEMERAL_KEY_ID.to_string(), "Ephemeral Key".to_string());

    if let Ok(keys) = state.database.api_keys().list_api_keys().await {
        for k in keys {
            if !k.key_id.is_empty() {
                labels.insert(k.key_id, k.name.clone());
            }
            labels.insert(k.api_key, k.name);
        }
    }
    labels
}

/// Resolve a usage key identifier (`key_id` or legacy hash) to its display name.
/// Identifiers with no live api_keys row belong to deleted keys and render as
/// `"deleted key · <first 8 chars>"` — stable, so they still group together.
fn resolve_display_name(raw: &str, labels: &HashMap<String, String>) -> String {
    if let Some(name) = labels.get(raw) {
        return name.clone();
    }
    let short: String = raw.chars().take(8).collect();
    format!("deleted key · {short}")
}

/// GET /admin/api/usage/summary
pub async fn get_usage_summary(
    State(state): State<AppState>,
    Query(params): Query<AdminUsageQueryParams>,
) -> impl IntoResponse {
    const VALID_GROUP_BY: &[&str] = &[
        "hour", "day", "month", "model", "provider", "api_key", "user", "team", "tag",
    ];
    if !VALID_GROUP_BY.contains(&params.group_by.as_str()) {
        return (
            StatusCode::BAD_REQUEST,
            Json(ErrorResponse::new(
                "invalid_request_error",
                format!("group_by must be one of: {}", VALID_GROUP_BY.join(", ")),
            )),
        )
            .into_response();
    }

    if let Some(ref sb) = params.split_by {
        if !VALID_GROUP_BY.contains(&sb.as_str()) {
            return (
                StatusCode::BAD_REQUEST,
                Json(ErrorResponse::new(
                    "invalid_request_error",
                    format!("split_by must be one of: {}", VALID_GROUP_BY.join(", ")),
                )),
            )
                .into_response();
        }
    }

    // Resolve api_key param as a key name, then look up the hash for DB filtering.
    let api_key_filter = match resolve_api_key_filter(&state, params.api_key.as_deref()).await {
        Ok(v) => v,
        Err(resp) => return *resp,
    };
    let user_filter = match resolve_user_filter(&state, params.user.as_deref()).await {
        Ok(v) => v,
        Err(resp) => return *resp,
    };
    let team_filter = match resolve_team_filter(&state, params.team.as_deref()).await {
        Ok(v) => v,
        Err(resp) => return *resp,
    };

    let rows = match state
        .database
        .usage()
        .query_usage_summary(
            UsageFilter {
                api_key: &api_key_filter,
                user_id: user_filter.as_deref(),
                team_id: team_filter.as_deref(),
                tag: params.tag.as_deref(),
            },
            params.start_time.as_deref(),
            params.end_time.as_deref(),
            storage_dimension(&params.group_by),
            params.split_by.as_deref().map(storage_dimension),
        )
        .await
    {
        Ok(r) => explode_tag_rows(
            r,
            params.group_by == "tag",
            params.split_by.as_deref() == Some("tag"),
        ),
        Err(e) => {
            tracing::error!(error = %e, "Failed to query admin usage summary");
            return (
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(ErrorResponse::new(
                    "api_error",
                    "Failed to retrieve usage data",
                )),
            )
                .into_response();
        }
    };

    let summary = UsageTotals {
        total_requests: rows.iter().map(|r| r.total_requests).sum(),
        total_input_tokens: rows.iter().map(|r| r.input_tokens).sum(),
        total_output_tokens: rows.iter().map(|r| r.output_tokens).sum(),
        total_cached_tokens: rows.iter().map(|r| r.cached_tokens).sum(),
        total_cost: rows.iter().map(|r| r.total_cost).sum(),
    };

    // Resolve api_key hashes to display names when grouped/split by api_key
    let resolve_group = params.group_by == "api_key";
    let resolve_split = params.split_by.as_deref() == Some("api_key");
    let labels = if resolve_group || resolve_split {
        build_api_key_labels(&state).await
    } else {
        HashMap::new()
    };
    let user_group = params.group_by == "user";
    let user_split = params.split_by.as_deref() == Some("user");
    let user_labels = if user_group || user_split {
        build_user_labels(&state).await
    } else {
        HashMap::new()
    };
    let team_group = params.group_by == "team";
    let team_split = params.split_by.as_deref() == Some("team");
    let team_labels = if team_group || team_split {
        build_team_labels(&state).await
    } else {
        HashMap::new()
    };
    let label = |raw: String, key_dim: bool, user_dim: bool, team_dim: bool| {
        if key_dim {
            resolve_display_name(&raw, &labels)
        } else if user_dim {
            resolve_user_name(Some(&raw), &user_labels)
        } else if team_dim {
            resolve_team_name(Some(&raw), &team_labels)
        } else {
            raw
        }
    };

    let data = rows
        .into_iter()
        .map(|r| UsageBucket {
            group_key: label(r.group_key, resolve_group, user_group, team_group),
            split_key: r
                .split_key
                .map(|sk| label(sk, resolve_split, user_split, team_split)),
            input_tokens: r.input_tokens,
            output_tokens: r.output_tokens,
            cached_tokens: r.cached_tokens,
            cache_write_tokens: r.cache_write_tokens,
            total_cost: r.total_cost,
            total_requests: r.total_requests,
            error_requests: r.error_requests,
        })
        .collect();

    (
        StatusCode::OK,
        Json(UsageSummaryResponse {
            object: "list",
            data,
            summary,
        }),
    )
        .into_response()
}

/// GET /admin/api/usage/records
/// Admin version: no start_time guard, default limit 500.
pub async fn get_usage_records(
    State(state): State<AppState>,
    Query(params): Query<AdminRecordsQueryParams>,
) -> impl IntoResponse {
    let limit = params.limit.unwrap_or(500).min(1000);

    // Resolve api_key param as a key name, then look up the hash for DB filtering.
    let api_key_filter = match resolve_api_key_filter(&state, params.api_key.as_deref()).await {
        Ok(v) => v,
        Err(resp) => return *resp,
    };
    let user_filter = match resolve_user_filter(&state, params.user.as_deref()).await {
        Ok(v) => v,
        Err(resp) => return *resp,
    };
    let team_filter = match resolve_team_filter(&state, params.team.as_deref()).await {
        Ok(v) => v,
        Err(resp) => return *resp,
    };

    // Fetch limit+1 rows so we can detect has_more without an extra query.
    // Passes the limit directly to the DB to avoid loading unbounded rows into RAM.
    let mut records = match state
        .database
        .usage()
        .get_usage_by_api_key(
            UsageFilter {
                api_key: &api_key_filter,
                user_id: user_filter.as_deref(),
                team_id: team_filter.as_deref(),
                tag: params.tag.as_deref(),
            },
            params.start_time.as_deref(),
            Some(limit + 1),
            None,
        )
        .await
    {
        Ok(r) => r,
        Err(e) => {
            tracing::error!(error = %e, "Failed to query admin usage records");
            return (
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(ErrorResponse::new(
                    "api_error",
                    "Failed to retrieve usage records",
                )),
            )
                .into_response();
        }
    };

    let has_more = records.len() as i64 > limit;
    if has_more {
        records.truncate(limit as usize);
    }

    // Resolve api_key hashes / user ids to display names
    let labels = build_api_key_labels(&state).await;
    let user_labels = build_user_labels(&state).await;

    let data = records
        .into_iter()
        .map(|r| UsageRecordItem {
            id: r.id,
            api_key: resolve_display_name(r.key_id.as_deref().unwrap_or(&r.api_key), &labels),
            key_id: r.key_id,
            user: resolve_user_name(r.user_id.as_deref(), &user_labels),
            user_id: r.user_id,
            team_id: r.team_id,
            tags: r
                .tags
                .as_deref()
                .map(|t| {
                    t.split(',')
                        .filter(|x| !x.is_empty())
                        .map(String::from)
                        .collect()
                })
                .unwrap_or_default(),
            timestamp: r.timestamp,
            request_id: r.request_id,
            model: r.model,
            input_tokens: r.input_tokens,
            output_tokens: r.output_tokens,
            cached_tokens: r.cached_tokens,
            cache_write_tokens: r.cache_write_tokens,
            cost: r.cost,
            success: r.success,
            duration_ms: r.duration_ms,
            provider: r.provider,
            protocol: r.protocol,
        })
        .collect();

    (
        StatusCode::OK,
        Json(UsageRecordsResponse {
            object: "list",
            data,
            has_more,
        }),
    )
        .into_response()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn display_name_known_and_deleted() {
        let mut labels = HashMap::new();
        labels.insert(
            "4b1d2c9e-7a51-4f0e-9c1e-2f6a8d3b5c70".to_string(),
            "alice".to_string(),
        );
        assert_eq!(
            resolve_display_name("4b1d2c9e-7a51-4f0e-9c1e-2f6a8d3b5c70", &labels),
            "alice"
        );
        assert_eq!(
            resolve_display_name("9f8e7d6c-0000-4000-8000-000000000000", &labels),
            "deleted key · 9f8e7d6c"
        );
        assert_eq!(resolve_display_name("abc", &labels), "deleted key · abc");
    }

    #[test]
    fn user_labels() {
        let mut labels = HashMap::new();
        labels.insert("u-1".to_string(), "alice".to_string());
        assert_eq!(resolve_user_name(Some("u-1"), &labels), "alice");
        assert_eq!(resolve_user_name(None, &labels), "unattributed");
        assert_eq!(resolve_user_name(Some(""), &labels), "unattributed");
        assert_eq!(
            resolve_user_name(Some("9f8e7d6c-x"), &labels),
            "deleted user · 9f8e7d6c"
        );
    }

    #[test]
    fn default_group_by_is_hour() {
        let group_by = default_group_by();
        assert_eq!(group_by, "hour");
    }

    #[test]
    fn admin_records_params_default_limit_is_none() {
        let json = r#"{}"#;
        let params: AdminRecordsQueryParams = serde_json::from_str(json).unwrap();
        assert!(params.limit.is_none());
        assert!(params.api_key.is_none());
        assert!(params.start_time.is_none());
    }
}
