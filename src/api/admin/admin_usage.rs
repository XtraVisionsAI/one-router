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

use crate::schemas::anthropic::ErrorResponse;
use crate::server::state::AppState;

// ============================================================================
// Query params
// ============================================================================

#[derive(Debug, Deserialize)]
pub struct AdminUsageQueryParams {
    /// Filter by API key (required — cross-key aggregation not yet supported)
    pub api_key: Option<String>,
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
    pub api_key: String,
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

/// GET /admin/api/usage/summary
pub async fn get_usage_summary(
    State(state): State<AppState>,
    Query(params): Query<AdminUsageQueryParams>,
) -> impl IntoResponse {
    const VALID_GROUP_BY: &[&str] = &["hour", "day", "month", "model", "provider", "api_key"];
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
    let api_key_filter = match params.api_key.as_deref().filter(|s| !s.is_empty()) {
        Some(name) => {
            match state.database.api_keys().get_api_key_by_name(name).await {
                Ok(Some(record)) => record.api_key, // the hash
                Ok(None) => {
                    return (
                        StatusCode::NOT_FOUND,
                        Json(ErrorResponse::new(
                            "not_found_error",
                            format!("API key '{name}' not found"),
                        )),
                    )
                        .into_response()
                }
                Err(e) => {
                    return (
                        StatusCode::INTERNAL_SERVER_ERROR,
                        Json(ErrorResponse::new("api_error", e.to_string())),
                    )
                        .into_response()
                }
            }
        }
        None => String::new(), // empty = all keys
    };

    let rows = match state
        .database
        .usage()
        .query_usage_summary(
            &api_key_filter,
            params.start_time.as_deref(),
            params.end_time.as_deref(),
            &params.group_by,
            params.split_by.as_deref(),
        )
        .await
    {
        Ok(r) => r,
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

    let data = rows
        .into_iter()
        .map(|r| UsageBucket {
            group_key: r.group_key,
            split_key: r.split_key,
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
    let api_key_filter = match params.api_key.as_deref().filter(|s| !s.is_empty()) {
        Some(name) => {
            match state.database.api_keys().get_api_key_by_name(name).await {
                Ok(Some(record)) => record.api_key, // the hash
                Ok(None) => {
                    return (
                        StatusCode::NOT_FOUND,
                        Json(ErrorResponse::new(
                            "not_found_error",
                            format!("API key '{name}' not found"),
                        )),
                    )
                        .into_response()
                }
                Err(e) => {
                    return (
                        StatusCode::INTERNAL_SERVER_ERROR,
                        Json(ErrorResponse::new("api_error", e.to_string())),
                    )
                        .into_response()
                }
            }
        }
        None => String::new(), // empty = all keys
    };

    // Fetch limit+1 rows so we can detect has_more without an extra query.
    // Passes the limit directly to the DB to avoid loading unbounded rows into RAM.
    let mut records = match state
        .database
        .usage()
        .get_usage_by_api_key(
            &api_key_filter,
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

    let data = records
        .into_iter()
        .map(|r| UsageRecordItem {
            id: r.id,
            api_key: r.api_key,
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
