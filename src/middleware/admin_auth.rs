//! Admin authentication middleware
//!
//! Grants access to `/admin/api/*` routes only to:
//!   - The MASTER_API_KEY holder (is_master == true), OR
//!   - The ephemeral key holder (raw key matches settings.ephemeral_api_key)
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

use crate::config::Settings;
use crate::middleware::auth::extract_api_key;
use crate::schemas::anthropic::ErrorResponse;

#[derive(Clone)]
pub struct AdminAuthState {
    pub settings: Arc<Settings>,
}

impl AdminAuthState {
    pub fn new(settings: Arc<Settings>) -> Self {
        Self { settings }
    }
}

pub async fn require_admin_key(
    State(state): State<AdminAuthState>,
    request: Request<Body>,
    next: Next,
) -> Result<Response, AdminAuthError> {
    let raw_key = extract_api_key(&request).ok_or(AdminAuthError::Missing)?;

    // Check master key
    if let Some(ref master_key) = state.settings.master_api_key {
        if raw_key == *master_key {
            return Ok(next.run(request).await);
        }
    }

    // Check ephemeral key (is_master is false for ephemeral, so we re-check raw value)
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
            app_version: "0.0.0".to_string(),
            ephemeral_api_key: ephemeral.map(|s| s.to_string()),
            default_cache_ttl: None,
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
