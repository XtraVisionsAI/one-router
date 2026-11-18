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

/// Which side of the range a bound is (decides how a plain date expands).
#[derive(Clone, Copy)]
enum Bound {
    /// `start` (inclusive): a date means the start of that UTC day.
    Start,
    /// `end` (inclusive): a date means the whole UTC day.
    End,
    /// `before` (exclusive cursor): a date means the start of that UTC day.
    Before,
}

/// Format in which audit timestamps are stored (`services/audit.rs`).
fn storage_format(t: chrono::DateTime<chrono::Utc>) -> String {
    t.to_rfc3339_opts(chrono::SecondsFormat::Micros, true)
}

/// Validate a time bound — RFC 3339 with any offset (`2026-11-01T08:00:00+08:00`)
/// or a plain UTC date (`2026-11-01`) — and **normalize it to UTC in the
/// storage format** (`2026-11-01T00:00:00.000000Z`). Every backend compares
/// bounds lexicographically against stored timestamps (and DynamoDB derives
/// month partitions from them), so an un-normalized offset or a bare date
/// would compare wrong; anything unparsable is rejected with 400.
fn time_bound(field: &str, side: Bound, v: Option<String>) -> Result<Option<String>, HandlerError> {
    let Some(v) = non_empty(v) else {
        return Ok(None);
    };
    let v = v.trim();
    if let Ok(t) = chrono::DateTime::parse_from_rfc3339(v) {
        return Ok(Some(storage_format(t.with_timezone(&chrono::Utc))));
    }
    if v.len() == 10 {
        if let Ok(d) = chrono::NaiveDate::parse_from_str(v, "%Y-%m-%d") {
            let t = match side {
                Bound::Start | Bound::Before => d.and_hms_opt(0, 0, 0),
                Bound::End => d.and_hms_micro_opt(23, 59, 59, 999_999),
            };
            if let Some(t) = t {
                return Ok(Some(storage_format(t.and_utc())));
            }
        }
    }
    Err(bad_request(format!(
        "'{field}' must be an RFC 3339 timestamp or YYYY-MM-DD date"
    )))
}

/// GET /admin/api/audit
pub async fn list_audit(State(state): State<AppState>, Query(p): Query<AuditParams>) -> Response {
    let limit = p.limit.unwrap_or(100).clamp(1, 500);
    let bounds = (|| {
        Ok::<_, HandlerError>((
            time_bound("start", Bound::Start, p.start)?,
            time_bound("end", Bound::End, p.end)?,
            time_bound("before", Bound::Before, p.before)?,
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

    fn norm(side: Bound, v: &str) -> Option<String> {
        time_bound("t", side, Some(v.into())).unwrap()
    }

    #[test]
    fn time_bounds_validated() {
        assert_eq!(time_bound("end", Bound::End, None).unwrap(), None);
        assert_eq!(
            time_bound("end", Bound::End, Some("  ".into())).unwrap(),
            None
        );
        for bad in [
            "2026",
            "x",
            "2026-13-01",
            "26-11-18",
            "2026-11-18T25:00:00Z",
        ] {
            assert!(
                time_bound("before", Bound::Before, Some(bad.into())).is_err(),
                "{bad}"
            );
        }
    }

    #[test]
    fn time_bounds_normalized_to_utc_storage_format() {
        // UTC input: re-rendered with microseconds + Z.
        assert_eq!(
            norm(Bound::End, "2026-11-18T10:00:00.123456Z").as_deref(),
            Some("2026-11-18T10:00:00.123456Z")
        );
        assert_eq!(
            norm(Bound::Start, "2026-11-18T10:00:00Z").as_deref(),
            Some("2026-11-18T10:00:00.000000Z")
        );
        // Offsets converted to UTC (incl. across a day / month boundary).
        assert_eq!(
            norm(Bound::End, "2026-11-18T10:00:00+08:00").as_deref(),
            Some("2026-11-18T02:00:00.000000Z")
        );
        assert_eq!(
            norm(Bound::Start, "2026-12-01T03:00:00+08:00").as_deref(),
            Some("2026-11-30T19:00:00.000000Z")
        );
        assert_eq!(
            norm(Bound::Before, "2026-11-18T20:30:00-05:00").as_deref(),
            Some("2026-11-19T01:30:00.000000Z")
        );
        // Plain dates are UTC days; `end` covers the whole day.
        assert_eq!(
            norm(Bound::Start, "2026-11-18").as_deref(),
            Some("2026-11-18T00:00:00.000000Z")
        );
        assert_eq!(
            norm(Bound::Before, "2026-11-18").as_deref(),
            Some("2026-11-18T00:00:00.000000Z")
        );
        assert_eq!(
            norm(Bound::End, "2026-11-18").as_deref(),
            Some("2026-11-18T23:59:59.999999Z")
        );
    }

    #[test]
    fn normalized_bounds_compare_correctly_with_stored_timestamps() {
        // A record stored at 02:30Z is after 10:00+08:00 (= 02:00Z); the raw
        // string comparison used to say otherwise.
        let stored = "2026-11-18T02:30:00.000000Z";
        let start = norm(Bound::Start, "2026-11-18T10:00:00+08:00").unwrap();
        assert!(stored >= start.as_str());
        assert!(stored < "2026-11-18T10:00:00+08:00");
        // An end date includes records later that day.
        let end = norm(Bound::End, "2026-11-18").unwrap();
        assert!("2026-11-18T23:00:00.000000Z" <= end.as_str());
    }
}
