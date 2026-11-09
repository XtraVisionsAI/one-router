//! Admin authentication middleware
//!
//! Grants access to `/admin/api/*` routes via:
//!   1. A valid session cookie (admin_session) — issued by POST /admin/api/login
//!   2. The MASTER_API_KEY in x-api-key / Authorization header
//!   3. The ephemeral key (debug builds only)
//!
//! Regular database-stored API keys are explicitly rejected.

use axum::{
    body::Body,
    extract::State,
    http::{Request, StatusCode},
    middleware::Next,
    response::{IntoResponse, Response},
    Json,
};
use std::sync::Arc;

use crate::api::admin::session::extract_session_cookie;
use crate::config::Settings;
use crate::middleware::auth::extract_api_key;
use crate::schemas::anthropic::ErrorResponse;
use crate::server::state::SessionStore;

#[derive(Clone)]
pub struct AdminAuthState {
    pub settings: Arc<Settings>,
    pub sessions: SessionStore,
}

impl AdminAuthState {
    pub fn new(settings: Arc<Settings>, sessions: SessionStore) -> Self {
        Self { settings, sessions }
    }
}

/// Audit actor for a session: a hash prefix, never the token itself.
pub fn session_actor(token: &str) -> String {
    use sha2::{Digest, Sha256};
    let digest = Sha256::digest(token.as_bytes());
    let hex: String = digest.iter().take(4).map(|b| format!("{b:02x}")).collect();
    format!("session:{hex}")
}

pub async fn require_admin_key(
    State(state): State<AdminAuthState>,
    mut request: Request<Body>,
    next: Next,
) -> Result<Response, AdminAuthError> {
    use crate::services::audit::AdminActor;

    // Path 1: Check session cookie
    if let Some(token) = extract_session_cookie(request.headers()) {
        let key = crate::server::state::session_key(&token);
        let valid = {
            let mut sessions = state.sessions.write().await;
            match sessions.get_mut(&key) {
                Some(s) if !s.is_expired() => {
                    s.last_seen = std::time::Instant::now();
                    true
                }
                Some(_) => {
                    sessions.remove(&key);
                    false
                }
                None => false,
            }
        };
        if valid {
            // Cookie-authenticated writes must come from our own UI (CSRF):
            // same-origin per Fetch Metadata, or the UI's explicit header.
            if !is_safe_method(request.method()) && !is_same_origin_request(request.headers()) {
                return Err(AdminAuthError::CrossSite);
            }
            request
                .extensions_mut()
                .insert(AdminActor(session_actor(&token)));
            return Ok(next.run(request).await);
        }
    }

    // Path 2: Check x-api-key / Authorization header
    let raw_key = match extract_api_key(&request) {
        Some(key) => key,
        None => return Err(AdminAuthError::Missing),
    };

    // Check master key
    if let Some(ref master_key) = state.settings.master_api_key {
        if crate::config::master_key::matches(&raw_key, master_key) {
            request.extensions_mut().insert(AdminActor("master".into()));
            return Ok(next.run(request).await);
        }
    }

    // Check ephemeral key
    if let Some(ref ephemeral_key) = state.settings.ephemeral_api_key {
        if crate::utils::api_key::secret_eq(&raw_key, ephemeral_key) {
            request
                .extensions_mut()
                .insert(AdminActor("ephemeral".into()));
            return Ok(next.run(request).await);
        }
    }

    Err(AdminAuthError::Forbidden)
}

#[derive(Debug)]
pub enum AdminAuthError {
    Missing,
    Forbidden,
    CrossSite,
}

fn is_safe_method(m: &axum::http::Method) -> bool {
    matches!(
        *m,
        axum::http::Method::GET | axum::http::Method::HEAD | axum::http::Method::OPTIONS
    )
}

/// Header the admin UI sends on every request. A cross-site page cannot set a
/// custom header on a credentialed request without a CORS preflight, and the
/// admin API answers no preflights.
pub const CSRF_HEADER: &str = "x-one-router-admin";

/// `true` when the browser says the request is same-origin (Fetch Metadata:
/// `Sec-Fetch-Site: same-origin` / `none` for user-initiated), or the UI's
/// custom header is present. Same-*site* (another port / subdomain) is rejected.
fn is_same_origin_request(headers: &axum::http::HeaderMap) -> bool {
    if headers.contains_key(CSRF_HEADER) {
        return true;
    }
    matches!(
        headers.get("sec-fetch-site").and_then(|v| v.to_str().ok()),
        Some("same-origin") | Some("none")
    )
}

impl IntoResponse for AdminAuthError {
    fn into_response(self) -> Response {
        let (status, msg) = match self {
            AdminAuthError::Missing => (
                StatusCode::UNAUTHORIZED,
                "Admin access requires master or ephemeral API key.",
            ),
            AdminAuthError::Forbidden => (
                StatusCode::FORBIDDEN,
                "This API key does not have admin access.",
            ),
            AdminAuthError::CrossSite => {
                (StatusCode::FORBIDDEN, "Cross-site admin request rejected.")
            }
        };
        (
            status,
            Json(ErrorResponse::new("authentication_error", msg)),
        )
            .into_response()
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    fn make_settings(master: Option<&str>, ephemeral: Option<&str>) -> Settings {
        Settings {
            database: "sqlite://:memory:".to_string(),
            host: "127.0.0.1".to_string(),
            port: 8000,
            metrics_public: false,
            trusted_proxy_cidrs: Vec::new(),
            log_level: "debug".to_string(),
            max_body_size_mb: crate::config::settings::DEFAULT_MAX_BODY_SIZE_MB,
            master_api_key: master.map(|s| s.to_string()),
            encryption_key: None,
            web_search_provider: None,
            web_search_api_key: None,
            web_fetch_max_content_kb: 512,
            seed_defaults: crate::database::seed::SeedMode::default(),
            app_version: "0.0.0".to_string(),
            ephemeral_api_key: ephemeral.map(|s| s.to_string()),
        }
    }

    fn is_admin(settings: &Settings, raw_key: &str) -> bool {
        if settings.master_api_key.as_deref() == Some(raw_key) {
            return true;
        }
        if settings.ephemeral_api_key.as_deref() == Some(raw_key) {
            return true;
        }
        false
    }

    #[test]
    fn master_key_is_admin() {
        let settings = make_settings(Some("sk-master"), None);
        assert!(is_admin(&settings, "sk-master"));
    }

    #[test]
    fn ephemeral_key_is_admin() {
        let settings = make_settings(None, Some("sk-ephemeral-abc"));
        assert!(is_admin(&settings, "sk-ephemeral-abc"));
        assert!(!is_admin(&settings, "sk-other"));
    }

    #[test]
    fn regular_db_key_is_not_admin() {
        let settings = make_settings(Some("sk-master"), Some("sk-ephemeral"));
        assert!(!is_admin(&settings, "sk-some-db-key"));
    }
}
