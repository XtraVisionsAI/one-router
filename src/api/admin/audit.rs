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

use super::common::{bad_request, internal_error, HandlerError};
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

/// Validate a time bound: RFC 3339 (`2026-11-01T00:00:00Z`) or a plain date
/// (`2026-11-01`). Storage compares these lexicographically against stored
/// RFC 3339 timestamps and derives month partitions from them, so anything
/// else is rejected with 400 rather than producing garbage (or a panic).
fn time_bound(field: &str, v: Option<String>) -> Result<Option<String>, HandlerError> {
    let Some(v) = non_empty(v) else {
        return Ok(None);
    };
    let v = v.trim().to_string();
    let ok = chrono::DateTime::parse_from_rfc3339(&v).is_ok()
        || (v.len() == 10 && chrono::NaiveDate::parse_from_str(&v, "%Y-%m-%d").is_ok());
    if ok {
        Ok(Some(v))
    } else {
        Err(bad_request(format!(
            "'{field}' must be an RFC 3339 timestamp or YYYY-MM-DD date"
        )))
    }
}

/// GET /admin/api/audit
pub async fn list_audit(State(state): State<AppState>, Query(p): Query<AuditParams>) -> Response {
    let limit = p.limit.unwrap_or(100).clamp(1, 500);
    let bounds = (|| {
        Ok::<_, HandlerError>((
            time_bound("start", p.start)?,
            time_bound("end", p.end)?,
            time_bound("before", p.before)?,
        ))
    })();
    let (start, end, before) = match bounds {
        Ok(b) => b,
        Err(e) => return *e,
    };
    let query = AuditQuery {
        action: non_empty(p.action),
        target_type: non_empty(p.target_type),
        target_id: non_empty(p.target_id),
        start,
        end,
        before,
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

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn time_bounds_validated() {
        assert_eq!(time_bound("end", None).unwrap(), None);
        assert_eq!(time_bound("end", Some("  ".into())).unwrap(), None);
        assert!(
            time_bound("end", Some("2026-11-18T10:00:00.123456Z".into()))
                .unwrap()
                .is_some()
        );
        assert!(time_bound("end", Some("2026-11-18T10:00:00+08:00".into()))
            .unwrap()
            .is_some());
        assert!(time_bound("start", Some("2026-11-18".into()))
            .unwrap()
            .is_some());
        for bad in [
            "2026",
            "x",
            "2026-13-01",
            "26-11-18",
            "2026-11-18T25:00:00Z",
        ] {
            assert!(time_bound("before", Some(bad.into())).is_err(), "{bad}");
        }
    }
}
