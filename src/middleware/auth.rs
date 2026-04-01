//! Authentication middleware
//!
//! Modified to use `ApiKeyStore` trait instead of DynamoDB directly.

use axum::{
    body::Body,
    extract::State,
    http::{Request, StatusCode},
    middleware::Next,
    response::{IntoResponse, Response},
    Json,
};
use serde::{Deserialize, Serialize};
use std::sync::Arc;

use crate::config::Settings;
use crate::database::traits::DatabaseService;
use crate::schemas::anthropic::ErrorResponse;
use crate::utils::truncate_str;

// ============================================================================
// API Key Info
// ============================================================================

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ApiKeyInfo {
    pub api_key: String,
    pub user_id: String,
    pub is_master: bool,
    pub rate_limit: Option<u32>,
    pub service_tier: String,
    pub monthly_budget: Option<f64>,
    pub budget_used_mtd: f64,
    pub cache_ttl: Option<String>,
}

impl ApiKeyInfo {
    pub fn master(api_key: &str) -> Self {
        Self {
            api_key: Self::truncate_key(api_key),
            user_id: "master".to_string(),
            is_master: true,
            rate_limit: None,
            service_tier: "master".to_string(),
            monthly_budget: None,
            budget_used_mtd: 0.0,
            cache_ttl: None,
        }
    }

    pub fn from_db_record(record: &crate::database::models::ApiKeyRecord) -> Self {
        Self {
            api_key: Self::truncate_key(&record.api_key),
            user_id: record.user_id.clone(),
            is_master: false,
            rate_limit: if record.rate_limit > 0 {
                Some(record.rate_limit as u32)
            } else {
                None
            },
            service_tier: record.service_tier.clone(),
            monthly_budget: record.monthly_budget,
            budget_used_mtd: record.budget_used_mtd,
            cache_ttl: record.cache_ttl.clone(),
        }
    }

    pub fn truncate_key(key: &str) -> String {
        if key.chars().count() > 12 {
            format!("{}...", truncate_str(key, 8))
        } else {
            key.to_string()
        }
    }

    pub fn bypass_rate_limit(&self) -> bool {
        self.is_master
    }

    pub fn effective_rate_limit(&self, default: u32) -> u32 {
        self.rate_limit.unwrap_or(default)
    }
}

// ============================================================================
// Authentication Errors
// ============================================================================

#[derive(Debug)]
pub enum AuthError {
    MissingApiKey,
    InvalidApiKey,
    InactiveKey { reason: Option<String> },
    InternalError(String),
}

impl IntoResponse for AuthError {
    fn into_response(self) -> Response {
        let (status, error_type, message) = match self {
            AuthError::MissingApiKey => (
                StatusCode::UNAUTHORIZED,
                "authentication_error",
                "Missing API key. Include 'x-api-key' or 'Authorization: Bearer <key>' header.",
            ),
            AuthError::InvalidApiKey => (
                StatusCode::UNAUTHORIZED,
                "authentication_error",
                "Invalid API key.",
            ),
            AuthError::InactiveKey { reason } => {
                let msg = match reason.as_deref() {
                    Some("budget_exceeded") => "API key deactivated due to budget limit exceeded.",
                    Some(r) => {
                        return (
                            StatusCode::FORBIDDEN,
                            Json(ErrorResponse::new(
                                "permission_error",
                                format!("API key is inactive: {r}"),
                            )),
                        )
                            .into_response()
                    }
                    None => "API key is inactive.",
                };
                (StatusCode::FORBIDDEN, "permission_error", msg)
            }
            AuthError::InternalError(msg) => {
                tracing::error!(error = %msg, "Auth internal error");
                (
                    StatusCode::INTERNAL_SERVER_ERROR,
                    "api_error",
                    "An internal error occurred during authentication.",
                )
            }
        };

        let error_response = ErrorResponse::new(error_type, message);
        (status, Json(error_response)).into_response()
    }
}

// ============================================================================
// Authentication State
// ============================================================================

#[derive(Clone)]
pub struct AuthState {
    pub settings: Arc<Settings>,
    pub storage: Arc<dyn DatabaseService>,
}

impl AuthState {
    pub fn new(settings: Arc<Settings>, storage: Arc<dyn DatabaseService>) -> Self {
        Self { settings, storage }
    }
}

// ============================================================================
// Middleware
// ============================================================================

pub async fn require_api_key(
    State(auth_state): State<AuthState>,
    mut request: Request<Body>,
    next: Next,
) -> Result<Response, AuthError> {
    // Extract API key from headers
    let api_key = request
        .headers()
        .get("x-api-key")
        .and_then(|v| v.to_str().ok())
        .map(|s| s.to_string())
        .or_else(|| {
            request
                .headers()
                .get("authorization")
                .and_then(|v| v.to_str().ok())
                .and_then(|s| s.strip_prefix("Bearer "))
                .map(|s| s.to_string())
        });

    let Some(api_key) = api_key else {
        return Err(AuthError::MissingApiKey);
    };

    // Check master key
    if let Some(ref master_key) = auth_state.settings.master_api_key {
        if api_key == *master_key {
            request
                .extensions_mut()
                .insert(ApiKeyInfo::master(&api_key));
            return Ok(next.run(request).await);
        }
    }

    // Check ephemeral key
    if let Some(ref ephemeral_key) = auth_state.settings.ephemeral_api_key {
        if api_key == *ephemeral_key {
            request.extensions_mut().insert(ApiKeyInfo {
                api_key: ApiKeyInfo::truncate_key(&api_key),
                user_id: "ephemeral".to_string(),
                is_master: false,
                rate_limit: None,
                service_tier: "default".to_string(),
                monthly_budget: None,
                budget_used_mtd: 0.0,
                cache_ttl: None,
            });
            return Ok(next.run(request).await);
        }
    }

    // Validate against storage
    let result = auth_state
        .storage
        .api_keys()
        .get_api_key(&api_key)
        .await
        .map_err(|e| AuthError::InternalError(e.to_string()))?;

    match result {
        Some(record) if record.is_valid() => {
            request
                .extensions_mut()
                .insert(ApiKeyInfo::from_db_record(&record));
            Ok(next.run(request).await)
        }
        Some(record) => Err(AuthError::InactiveKey {
            reason: record.deactivated_reason,
        }),
        None => Err(AuthError::InvalidApiKey),
    }
}

/// Extract API key from request headers
pub fn extract_api_key<B>(request: &Request<B>) -> Option<String> {
    request
        .headers()
        .get("x-api-key")
        .and_then(|v| v.to_str().ok())
        .map(|s| s.to_string())
        .or_else(|| {
            request
                .headers()
                .get("authorization")
                .and_then(|v| v.to_str().ok())
                .and_then(|s| s.strip_prefix("Bearer "))
                .map(|s| s.to_string())
        })
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_api_key_info_master() {
        let info = ApiKeyInfo::master("sk-ant-master-key-12345");
        assert!(info.is_master);
        assert_eq!(info.user_id, "master");
        assert!(info.bypass_rate_limit());
    }

    #[test]
    fn test_api_key_truncation() {
        let truncated = ApiKeyInfo::truncate_key("sk-ant-api-key-very-long-string");
        assert_eq!(truncated, "sk-ant-a...");

        let short = ApiKeyInfo::truncate_key("short");
        assert_eq!(short, "short");
    }
}
