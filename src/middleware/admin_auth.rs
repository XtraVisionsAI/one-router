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

pub async fn require_admin_key(
    State(state): State<AdminAuthState>,
    request: Request<Body>,
    next: Next,
) -> Result<Response, AdminAuthError> {
    // Path 1: Check session cookie
    if let Some(token) = extract_session_cookie(request.headers()) {
        if state.sessions.read().await.contains(&token) {
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
        if raw_key == *master_key {
            return Ok(next.run(request).await);
        }
    }

    // Check ephemeral key
    if let Some(ref ephemeral_key) = state.settings.ephemeral_api_key {
        if raw_key == *ephemeral_key {
            return Ok(next.run(request).await);
        }
    }

    Err(AdminAuthError::Forbidden)
}

#[derive(Debug)]
pub enum AdminAuthError {
    Missing,
    Forbidden,
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
            log_level: "debug".to_string(),
            master_api_key: master.map(|s| s.to_string()),
            encryption_key: None,
            web_search_provider: None,
            web_search_api_key: None,
            web_fetch_max_content_kb: 512,
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
