//! Admin API — audit log
//!
//! GET /admin/api/audit?action=&target_type=&target_id=&start=&end=&before=&limit=
//!
//! Newest first. `action` is a prefix match (`api_key.` = every key action).
//! Paginate by passing the last entry's `timestamp` as `before`.

use axum::{
    extract::{Query, State},
    response::{IntoResponse, Response},
    Json,
};
use serde::{Deserialize, Serialize};

use super::common::internal_error;
use crate::database::models::{AuditLogRecord, AuditQuery};
use crate::server::state::AppState;

#[derive(Debug, Deserialize)]
pub struct AuditParams {
    pub action: Option<String>,
    pub target_type: Option<String>,
    pub target_id: Option<String>,
    pub start: Option<String>,
    pub end: Option<String>,
    pub before: Option<String>,
    pub limit: Option<usize>,
}

#[derive(Debug, Serialize)]
pub struct AuditEntry {
    #[serde(flatten)]
    pub record: AuditLogRecord,
    /// `before` / `after` parsed back into JSON for clients.
    pub before_json: Option<serde_json::Value>,
    pub after_json: Option<serde_json::Value>,
}

#[derive(Debug, Serialize)]
pub struct AuditListResponse {
    pub object: &'static str,
    pub data: Vec<AuditEntry>,
    pub has_more: bool,
}

fn non_empty(v: Option<String>) -> Option<String> {
    v.filter(|s| !s.trim().is_empty())
}

/// GET /admin/api/audit
pub async fn list_audit(State(state): State<AppState>, Query(p): Query<AuditParams>) -> Response {
    let limit = p.limit.unwrap_or(100).clamp(1, 500);
    let query = AuditQuery {
        action: non_empty(p.action),
        target_type: non_empty(p.target_type),
        target_id: non_empty(p.target_id),
        start: non_empty(p.start),
        end: non_empty(p.end),
        before: non_empty(p.before),
        limit: limit + 1,
    };
    let mut rows = match state.database.audit().query_audit(&query).await {
        Ok(r) => r,
        Err(e) => return *internal_error("Failed to retrieve audit log", &e),
    };
    let has_more = rows.len() > limit;
    rows.truncate(limit);
    let data = rows
        .into_iter()
        .map(|r| AuditEntry {
            before_json: r
                .before
                .as_deref()
                .and_then(|s| serde_json::from_str(s).ok()),
            after_json: r
                .after
                .as_deref()
                .and_then(|s| serde_json::from_str(s).ok()),
            record: r,
        })
        .collect();
    Json(AuditListResponse {
        object: "list",
        data,
        has_more,
    })
    .into_response()
}
