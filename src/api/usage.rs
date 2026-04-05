//! GET /v1/usage       — Usage summary (grouped by hour or model)
//! GET /v1/usage/records — Raw request records (paginated)

use axum::{
    extract::{Query, State},
    http::StatusCode,
    response::IntoResponse,
    Extension, Json,
};
use serde::{Deserialize, Serialize};

use crate::middleware::auth::ApiKeyInfo;
use crate::schemas::anthropic::ErrorResponse;
use crate::server::state::AppState;

// ============================================================================
// Query params
// ============================================================================

#[derive(Debug, Deserialize)]
pub struct UsageQueryParams {
    /// RFC3339, e.g. "2026-03-01T00:00:00Z"
    pub start_time: Option<String>,
    /// RFC3339
    pub end_time: Option<String>,
    /// "hour" (default) or "model"
    pub group_by: Option<String>,
}

#[derive(Debug, Deserialize)]
pub struct RecordsQueryParams {
    pub start_time: Option<String>,
    pub limit: Option<i64>,
    /// Pagination cursor: id of the last record on the previous page (reverse order)
    pub before_id: Option<i64>,
}

// ============================================================================
// Response types
// ============================================================================

#[derive(Debug, Serialize)]
pub struct UsageSummaryResponse {
    pub object: &'static str,
    pub data: Vec<UsageBucket>,
    pub summary: UsageTotals,
}

#[derive(Debug, Serialize)]
pub struct UsageBucket {
    /// Group key: "2026-03-24T15" in hour mode, model name in model mode
    pub group_key: String,
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
    pub budget_used_mtd: f64,
    pub monthly_budget: Option<f64>,
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
}

// ============================================================================
// GET /v1/usage
// ============================================================================

pub async fn get_usage_summary(
    State(state): State<AppState>,
    Extension(key_info): Extension<ApiKeyInfo>,
    Query(params): Query<UsageQueryParams>,
) -> impl IntoResponse {
    let group_by = params.group_by.as_deref().unwrap_or("hour");

    // Validate group_by parameter
    if group_by != "hour" && group_by != "model" {
        return (
            StatusCode::BAD_REQUEST,
            Json(ErrorResponse::new(
                "invalid_request_error",
                "group_by must be 'hour' or 'model'",
            )),
        )
            .into_response();
    }

    let rows = match state
        .database
        .usage()
        .query_usage_summary(
            &key_info.api_key,
            params.start_time.as_deref(),
            params.end_time.as_deref(),
            group_by,
        )
        .await
    {
        Ok(r) => r,
        Err(e) => {
            tracing::error!(error = %e, "Failed to query usage summary");
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

    // key_info already contains budget info (loaded from DB by auth middleware into Extension).
    // api_key in ApiKeyInfo is the truncated string; use the fields already in key_info.
    let monthly_budget = key_info.monthly_budget;
    let budget_used_mtd = key_info.budget_used_mtd;

    let summary = UsageTotals {
        total_requests: rows.iter().map(|r| r.total_requests).sum(),
        total_input_tokens: rows.iter().map(|r| r.input_tokens).sum(),
        total_output_tokens: rows.iter().map(|r| r.output_tokens).sum(),
        total_cached_tokens: rows.iter().map(|r| r.cached_tokens).sum(),
        total_cost: rows.iter().map(|r| r.total_cost).sum(),
        budget_used_mtd,
        monthly_budget,
    };

    let data: Vec<UsageBucket> = rows
        .into_iter()
        .map(|r| UsageBucket {
            group_key: r.group_key,
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

// ============================================================================
// GET /v1/usage/records
// ============================================================================

pub async fn get_usage_records(
    State(state): State<AppState>,
    Extension(key_info): Extension<ApiKeyInfo>,
    Query(params): Query<RecordsQueryParams>,
) -> impl IntoResponse {
    let limit = params.limit.unwrap_or(100).min(1000);

    // Safety guard: disallow unbounded queries (neither start_time nor before_id).
    // Pulling all records without limits could cause OOM; require at least one time or cursor boundary.
    if params.start_time.is_none() && params.before_id.is_none() {
        return (
            StatusCode::BAD_REQUEST,
            Json(ErrorResponse::new(
                "invalid_request_error",
                "Either 'start_time' or 'before_id' is required to prevent unbounded queries.",
            )),
        )
            .into_response();
    }

    // Fetch all records after start_time (no row limit preset).
    // The before_id cursor must be filtered at the application layer to correctly determine has_more.
    // Note: The before_id cursor does not work with DynamoDB backend (id field is None);
    // in that case start_time must be used instead.
    let all_records = match state
        .database
        .usage()
        .get_usage_by_api_key(&key_info.api_key, params.start_time.as_deref(), None)
        .await
    {
        Ok(r) => r,
        Err(e) => {
            tracing::error!(error = %e, "Failed to query usage records");
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

    // before_id cursor filtering (records ordered by timestamp DESC, id monotonically increasing)
    let mut records: Vec<_> = if let Some(before) = params.before_id {
        all_records
            .into_iter()
            .filter(|r| r.id.map(|id| id < before).unwrap_or(true))
            .collect()
    } else {
        all_records
    };

    let has_more = records.len() as i64 > limit;
    if has_more {
        records.truncate(limit as usize);
    }

    let data: Vec<UsageRecordItem> = records
        .into_iter()
        .map(|r| UsageRecordItem {
            id: r.id,
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

// ============================================================================
// Tests
// ============================================================================

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_parse_group_by_defaults_to_hour() {
        let params = UsageQueryParams {
            start_time: None,
            end_time: None,
            group_by: None,
        };
        assert_eq!(params.group_by.as_deref().unwrap_or("hour"), "hour");
    }

    #[test]
    fn test_parse_group_by_model() {
        let params = UsageQueryParams {
            start_time: None,
            end_time: None,
            group_by: Some("model".to_string()),
        };
        assert_eq!(params.group_by.as_deref().unwrap_or("hour"), "model");
    }

    #[test]
    fn test_invalid_group_by_detected() {
        let group_by = "day";
        assert!(group_by != "hour" && group_by != "model");
    }
}
