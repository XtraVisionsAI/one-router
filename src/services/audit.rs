//! Admin audit log.
//!
//! Every admin **write** (`POST`/`PUT`/`PATCH`/`DELETE` under `/admin/api`) is
//! recorded by [`audit_admin_writes`], which runs inside the admin auth layer:
//! actor (from [`AdminActor`]), client address, user agent, method, path,
//! status, and an action / target derived from the path (`PUT /keys/<id>` →
//! `key.update` on `api_key/<id>`). Handlers that hold before/after state attach
//! an [`AuditDetail`] to the response to override the derived fields and add
//! JSON snapshots. Login attempts are recorded explicitly by the login handler.
//!
//! **Redaction is by construction**: snapshots are built from the admin API's
//! own response types (`AdminKeyItem`, `AdminUserItem`), which never carry key
//! plaintext or hashes; setting values are recorded only for non-sensitive
//! settings; backend credentials are never snapshotted.
//!
//! Writes are best-effort: a failed audit write is logged and counted in
//! `onerouter_audit_write_failures_total`, and never fails the admin operation.

use axum::{
    body::Body,
    extract::{ConnectInfo, State},
    http::{Method, Request},
    middleware::Next,
    response::Response,
};
use serde::Serialize;
use std::net::SocketAddr;
use std::sync::Arc;

use crate::config::Settings;
use crate::database::models::AuditLogRecord;
use crate::database::traits::DatabaseService;
use crate::utils::client_ip::client_ip;

/// Who passed admin auth — inserted into request extensions by the admin
/// middleware. Session actors carry a hash prefix of the token, never the token.
#[derive(Debug, Clone)]
pub struct AdminActor(pub String);

/// Handler-provided audit detail, attached as a **response** extension.
#[derive(Debug, Clone, Default)]
pub struct AuditDetail {
    pub action: Option<String>,
    pub target_type: Option<String>,
    pub target_id: Option<String>,
    pub before: Option<serde_json::Value>,
    pub after: Option<serde_json::Value>,
}

impl AuditDetail {
    pub fn new(action: &str, target_type: &str, target_id: impl Into<String>) -> Self {
        Self {
            action: Some(action.to_string()),
            target_type: Some(target_type.to_string()),
            target_id: Some(target_id.into()),
            ..Default::default()
        }
    }

    pub fn before<T: Serialize>(mut self, v: &T) -> Self {
        self.before = serde_json::to_value(v).ok();
        self
    }

    pub fn after<T: Serialize>(mut self, v: &T) -> Self {
        self.after = serde_json::to_value(v).ok();
        self
    }

    /// Attach to a response.
    pub fn attach(self, mut resp: Response) -> Response {
        resp.extensions_mut().insert(self);
        resp
    }
}

#[derive(Clone)]
pub struct AuditState {
    pub database: Arc<dyn DatabaseService>,
    pub settings: Arc<Settings>,
}

/// Map a URL resource segment to its audit target type.
fn target_type_of(resource: &str) -> &'static str {
    match resource {
        "keys" => "api_key",
        "users" => "user",
        "backends" => "backend",
        "mappings" => "mapping",
        "settings" => "setting",
        "pricing" => "pricing",
        "update" => "update",
        "usage" => "usage",
        "audit" => "audit",
        _ => "other",
    }
}

/// Derive `(action, target_type, target_id)` from method + path relative to
/// `/admin/api` (e.g. `/keys/abc/rotate`). The action vocabulary is bounded:
/// `<type>.<verb>`, verb ∈ create/update/delete/<sub-resource>.
pub fn derive_action(method: &Method, path: &str) -> (String, String, Option<String>) {
    let segs: Vec<&str> = path
        .trim_start_matches("/admin/api")
        .split('/')
        .filter(|s| !s.is_empty())
        .collect();
    let resource = segs.first().copied().unwrap_or("");
    let ty = target_type_of(resource);
    let id = segs.get(1).map(|s| s.to_string());
    let verb = match (segs.get(2), method) {
        (Some(sub), _) => match *sub {
            "activate" | "deactivate" | "rotate" | "toggle" | "check" | "sync" | "import" => *sub,
            _ => "action",
        },
        (None, &Method::POST) if id.is_none() => "create",
        (None, &Method::POST) => match id.as_deref() {
            Some("sync") | Some("import") | Some("check") => {
                return (format!("{ty}.{}", id.unwrap()), ty.into(), None)
            }
            _ => "action",
        },
        (None, &Method::PUT) | (None, &Method::PATCH) => "update",
        (None, &Method::DELETE) => "delete",
        _ => "action",
    };
    // `ty` is "other" for unknown resources, keeping the label set bounded.
    let verb = if ty == "other" { "action" } else { verb };
    (format!("{ty}.{verb}"), ty.to_string(), id)
}

fn new_record(actor: &str, method: &str, path: &str, status: u16) -> AuditLogRecord {
    AuditLogRecord {
        id: uuid::Uuid::now_v7().to_string(),
        timestamp: chrono::Utc::now().to_rfc3339_opts(chrono::SecondsFormat::Micros, true),
        actor: actor.to_string(),
        source_ip: None,
        user_agent: None,
        action: String::new(),
        target_type: None,
        target_id: None,
        before: None,
        after: None,
        status,
        method: method.to_string(),
        path: path.to_string(),
    }
}

/// Persist in the background; failures are logged + counted, never surfaced.
pub fn write(database: Arc<dyn DatabaseService>, record: AuditLogRecord) {
    tokio::spawn(async move {
        if let Err(e) = database.audit().record_audit(&record).await {
            tracing::error!(error = %e, action = %record.action, "Failed to write audit log entry");
            crate::observability::metrics::record_audit_write_failure(&record.action);
        }
    });
}

/// Request metadata shared by the middleware and the login handler.
pub fn request_meta<B>(req: &Request<B>, settings: &Settings) -> (Option<String>, Option<String>) {
    let peer = req
        .extensions()
        .get::<ConnectInfo<SocketAddr>>()
        .map(|c| c.0);
    meta(peer, req.headers(), settings)
}

/// `(client ip, user agent)` from a peer address and headers.
pub fn meta(
    peer: Option<SocketAddr>,
    headers: &axum::http::HeaderMap,
    settings: &Settings,
) -> (Option<String>, Option<String>) {
    let ip = client_ip(peer, headers, &settings.trusted_proxy_cidrs).map(|i| i.to_string());
    let ua = headers
        .get("user-agent")
        .and_then(|v| v.to_str().ok())
        .map(|s| s.chars().take(256).collect());
    (ip, ua)
}

/// Record a login attempt (called by the login handler).
pub fn record_login(
    state: &AuditState,
    req_meta: (Option<String>, Option<String>),
    actor: &str,
    success: bool,
    status: u16,
) {
    let mut r = new_record(
        if success { actor } else { "anonymous" },
        "POST",
        "/admin/api/login",
        status,
    );
    r.action = if success {
        "auth.login"
    } else {
        "auth.login_failed"
    }
    .into();
    (r.source_ip, r.user_agent) = req_meta;
    write(state.database.clone(), r);
}

/// Middleware: audit every admin write.
pub async fn audit_admin_writes(
    State(state): State<AuditState>,
    request: Request<Body>,
    next: Next,
) -> Response {
    let method = request.method().clone();
    if matches!(method, Method::GET | Method::HEAD | Method::OPTIONS) {
        return next.run(request).await;
    }
    let path = request.uri().path().to_string();
    let actor = request
        .extensions()
        .get::<AdminActor>()
        .map(|a| a.0.clone())
        .unwrap_or_else(|| "unknown".into());
    let meta = request_meta(&request, &state.settings);

    let response = next.run(request).await;

    let full_path = if path.starts_with("/admin/api") {
        path.clone()
    } else {
        format!("/admin/api{path}")
    };
    let (action, ty, id) = derive_action(&method, &full_path);
    let mut r = new_record(
        &actor,
        method.as_str(),
        &full_path,
        response.status().as_u16(),
    );
    r.action = action;
    r.target_type = Some(ty);
    r.target_id = id;
    (r.source_ip, r.user_agent) = meta;
    if let Some(d) = response.extensions().get::<AuditDetail>() {
        if let Some(a) = &d.action {
            r.action = a.clone();
        }
        if d.target_type.is_some() {
            r.target_type = d.target_type.clone();
        }
        if d.target_id.is_some() {
            r.target_id = d.target_id.clone();
        }
        r.before = d.before.as_ref().map(|v| v.to_string());
        r.after = d.after.as_ref().map(|v| v.to_string());
    }
    write(state.database.clone(), r);
    response
}

/// Daily retention purge (`audit_log_retention_days`, `0` = keep forever).
pub async fn purge_expired(database: &Arc<dyn DatabaseService>) {
    let days = database
        .system_settings()
        .get_setting("audit_log_retention_days")
        .await
        .ok()
        .flatten()
        .and_then(|s| s.value.trim().parse::<i64>().ok())
        .unwrap_or(365);
    if days <= 0 {
        return;
    }
    let cutoff = (chrono::Utc::now() - chrono::Duration::days(days))
        .to_rfc3339_opts(chrono::SecondsFormat::Micros, true);
    match database.audit().purge_audit_before(&cutoff).await {
        Ok(0) => {}
        Ok(n) => tracing::info!(removed = n, days, "Purged expired audit log entries"),
        Err(e) => tracing::warn!(error = %e, "Audit log retention purge failed"),
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    fn d(m: Method, p: &str) -> (String, String, Option<String>) {
        derive_action(&m, p)
    }

    #[test]
    fn derives_bounded_actions() {
        assert_eq!(
            d(Method::POST, "/admin/api/keys"),
            ("api_key.create".into(), "api_key".into(), None)
        );
        assert_eq!(
            d(Method::PUT, "/admin/api/keys/k1"),
            ("api_key.update".into(), "api_key".into(), Some("k1".into()))
        );
        assert_eq!(d(Method::DELETE, "/admin/api/users/u1").0, "user.delete");
        assert_eq!(
            d(Method::POST, "/admin/api/keys/k1/rotate").0,
            "api_key.rotate"
        );
        assert_eq!(
            d(Method::POST, "/admin/api/users/u1/deactivate").0,
            "user.deactivate"
        );
        assert_eq!(
            d(Method::PUT, "/admin/api/settings/rate_limit")
                .2
                .as_deref(),
            Some("rate_limit")
        );
        assert_eq!(
            d(Method::PUT, "/admin/api/backends/b/toggle").0,
            "backend.toggle"
        );
        assert_eq!(d(Method::POST, "/admin/api/pricing/sync").0, "pricing.sync");
        assert_eq!(d(Method::POST, "/admin/api/whatever/x").0, "other.action");
        assert_eq!(
            d(Method::POST, "/admin/api/keys/k1/weird").0,
            "api_key.action"
        );
    }
}
