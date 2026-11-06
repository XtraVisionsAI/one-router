//! Authentication middleware
//!
//! Resolves the caller into an [`ApiKeyInfo`] principal: the key itself plus
//! its owning user. Rejects missing / unknown / inactive / expired keys, keys of
//! inactive users, and callers whose key- or user-level monthly budget is spent.

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
use crate::database::models::{period_spend, ApiKeyRecord, UserRecord};
use crate::database::traits::DatabaseService;
use crate::schemas::anthropic::ErrorResponse;
use crate::services::backend_pool::model_filter::ModelFilter;
use crate::utils::api_key::hash_key;
use crate::utils::truncate_str;

// ============================================================================
// API Key Info
// ============================================================================

/// `key_id` / usage identifier of the master key.
pub const MASTER_KEY_ID: &str = "__master__";
/// `key_id` / usage identifier of the debug-build ephemeral key.
pub const EPHEMERAL_KEY_ID: &str = "__ephemeral__";

/// The user that owns the calling key — the billing and shared-limit principal.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct UserPrincipal {
    pub user_id: String,
    pub name: String,
    /// RPM shared by all of the user's keys. `None` = global `rate_limit` setting.
    pub rate_limit: Option<u32>,
    /// TPM shared by all of the user's keys. `None` = unlimited.
    pub tpm_limit: Option<u32>,
    pub monthly_budget: Option<f64>,
    pub budget_used_mtd: f64,
    pub budget_mtd_month: Option<String>,
}

impl UserPrincipal {
    fn from_record(u: &UserRecord) -> Self {
        Self {
            user_id: u.user_id.clone(),
            name: u.name.clone(),
            rate_limit: positive(u.rate_limit),
            tpm_limit: positive(u.tpm_limit),
            monthly_budget: u.monthly_budget,
            budget_used_mtd: u.budget_used_mtd,
            budget_mtd_month: u.budget_mtd_month.clone(),
        }
    }
}

fn positive(v: Option<i32>) -> Option<u32> {
    v.filter(|n| *n > 0).map(|n| n as u32)
}

/// Authenticated caller. Field semantics for database keys:
/// - `rate_limit` / `tpm_limit` / `monthly_budget` are **key-level** sub-limits;
///   the user's shared limits live in `user`. Every layer must pass.
/// - `cost_rate` and `cache_ttl` are already resolved (user's cost rate; key
///   cache TTL, else the user's).
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ApiKeyInfo {
    pub api_key: String,
    /// The hashed api_key value used as PK in the database.
    /// Never serialize this into JSON responses.
    #[serde(skip_serializing)]
    pub raw_api_key: String,
    /// Stable key identifier (`__master__` / `__ephemeral__` for internal keys).
    /// Used for rate-limit buckets and usage attribution.
    pub key_id: String,
    pub is_master: bool,
    /// Key-level RPM sub-limit. `None` = none.
    pub rate_limit: Option<u32>,
    /// Key-level TPM sub-limit. `None` = unlimited.
    pub tpm_limit: Option<u32>,
    pub cost_rate: f64,
    pub monthly_budget: Option<f64>,
    pub budget_used_mtd: f64,
    pub budget_mtd_month: Option<String>,
    pub cache_ttl: Option<String>,
    /// Owning user (`None` for master/ephemeral keys).
    #[serde(default)]
    pub user: Option<UserPrincipal>,
    /// Model allowlists that must ALL admit the requested model (key, user).
    /// Empty = unrestricted.
    #[serde(skip)]
    pub model_filters: Vec<ModelFilter>,
}

impl ApiKeyInfo {
    fn internal(api_key: &str, key_id: &str, is_master: bool) -> Self {
        Self {
            api_key: Self::truncate_key(api_key),
            raw_api_key: String::new(),
            key_id: key_id.to_string(),
            is_master,
            rate_limit: None,
            tpm_limit: None,
            cost_rate: 1.0,
            monthly_budget: None,
            budget_used_mtd: 0.0,
            budget_mtd_month: None,
            cache_ttl: None,
            user: None,
            model_filters: Vec::new(),
        }
    }

    pub fn master(api_key: &str) -> Self {
        Self::internal(api_key, MASTER_KEY_ID, true)
    }

    pub fn ephemeral(api_key: &str) -> Self {
        Self::internal(api_key, EPHEMERAL_KEY_ID, false)
    }

    /// Principal for a database key and its (optional — only unmigrated keys
    /// lack one) owning user.
    pub fn from_db_record(record: &ApiKeyRecord, user: Option<&UserRecord>) -> Self {
        let mut model_filters = Vec::new();
        for patterns in [
            record.allowed_models.as_deref(),
            user.and_then(|u| u.allowed_models.as_deref()),
        ]
        .into_iter()
        .flatten()
        {
            model_filters.push(ModelFilter::from_patterns(Some(patterns)));
        }
        Self {
            api_key: if record.key_display.is_empty() {
                Self::truncate_key(&record.api_key)
            } else {
                record.key_display.clone()
            },
            raw_api_key: record.api_key.clone(),
            // Rows predating key ids are backfilled at startup; fall back to the
            // hash so limiter buckets stay per-key even if one slipped through.
            key_id: if record.key_id.is_empty() {
                record.api_key.clone()
            } else {
                record.key_id.clone()
            },
            is_master: false,
            rate_limit: positive(Some(record.rate_limit)),
            tpm_limit: positive(record.tpm_limit),
            cost_rate: user.map(|u| u.cost_rate).unwrap_or(record.cost_rate),
            monthly_budget: record.monthly_budget,
            budget_used_mtd: record.budget_used_mtd,
            budget_mtd_month: record.budget_mtd_month.clone(),
            cache_ttl: record
                .cache_ttl
                .clone()
                .or_else(|| user.and_then(|u| u.cache_ttl.clone())),
            user: user.map(UserPrincipal::from_record),
            model_filters,
        }
    }

    pub fn truncate_key(key: &str) -> String {
        if key.chars().count() > 12 {
            format!("{}...", truncate_str(key, 8))
        } else {
            key.to_string()
        }
    }

    /// The value stored in `usage.api_key` for this caller: the key hash for
    /// database keys, the internal identifier for master/ephemeral keys.
    pub fn usage_api_key(&self) -> &str {
        if self.raw_api_key.is_empty() {
            &self.key_id
        } else {
            &self.raw_api_key
        }
    }

    pub fn user_id(&self) -> Option<&str> {
        self.user.as_ref().map(|u| u.user_id.as_str())
    }

    pub fn bypass_rate_limit(&self) -> bool {
        self.is_master
    }

    /// Whether every allowlist (key, user) admits `model` (the client-facing
    /// source model id).
    pub fn allows_model(&self, model: &str) -> bool {
        self.model_filters.iter().all(|f| f.matches(model))
    }

    /// Which budget layer (if any) is spent for `current_month` ("YYYY-MM").
    pub fn exhausted_budget(&self, current_month: &str) -> Option<BudgetScope> {
        let spent = |budget: Option<f64>, used: f64, month: Option<&str>| {
            budget.is_some_and(|limit| period_spend(used, month, current_month) >= limit)
        };
        if let Some(u) = &self.user {
            if spent(
                u.monthly_budget,
                u.budget_used_mtd,
                u.budget_mtd_month.as_deref(),
            ) {
                return Some(BudgetScope::User);
            }
        }
        if spent(
            self.monthly_budget,
            self.budget_used_mtd,
            self.budget_mtd_month.as_deref(),
        ) {
            return Some(BudgetScope::Key);
        }
        None
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum BudgetScope {
    Key,
    User,
}

// ============================================================================
// Authentication Errors
// ============================================================================

#[derive(Debug)]
pub enum AuthError {
    MissingApiKey,
    InvalidApiKey,
    InactiveKey { reason: Option<String> },
    ExpiredKey,
    InactiveOwner,
    BudgetExceeded(BudgetScope),
    InternalError(String),
}

impl IntoResponse for AuthError {
    fn into_response(self) -> Response {
        // Record the auth failure before the match — covers every path. Reason
        // labels are bounded to the variant names.
        let reason = match &self {
            AuthError::MissingApiKey => "missing_key",
            AuthError::InvalidApiKey => "invalid_key",
            AuthError::InactiveKey { .. } => "inactive_key",
            AuthError::ExpiredKey => "expired_key",
            AuthError::InactiveOwner => "inactive_owner",
            AuthError::BudgetExceeded(_) => "budget_exceeded",
            AuthError::InternalError(_) => "internal_error",
        };
        crate::observability::metrics::record_auth_failure(reason);

        let (status, error_type, message): (StatusCode, &str, String) = match self {
            AuthError::MissingApiKey => (
                StatusCode::UNAUTHORIZED,
                "authentication_error",
                "Missing API key. Include 'x-api-key' or 'Authorization: Bearer <key>' header."
                    .into(),
            ),
            AuthError::InvalidApiKey => (
                StatusCode::UNAUTHORIZED,
                "authentication_error",
                "Invalid API key.".into(),
            ),
            AuthError::ExpiredKey => (
                StatusCode::UNAUTHORIZED,
                "authentication_error",
                "API key expired.".into(),
            ),
            AuthError::InactiveOwner => (
                StatusCode::UNAUTHORIZED,
                "authentication_error",
                "API key owner is inactive.".into(),
            ),
            AuthError::InactiveKey { reason } => (
                StatusCode::FORBIDDEN,
                "permission_error",
                match reason.as_deref() {
                    Some(r) => format!("API key is inactive: {r}"),
                    None => "API key is inactive.".into(),
                },
            ),
            AuthError::BudgetExceeded(scope) => (
                StatusCode::FORBIDDEN,
                "permission_error",
                match scope {
                    BudgetScope::User => "Monthly budget exceeded for this API key's user.",
                    BudgetScope::Key => "Monthly budget exceeded for this API key.",
                }
                .into(),
            ),
            AuthError::InternalError(msg) => {
                tracing::error!(error = %msg, "Auth internal error");
                (
                    StatusCode::INTERNAL_SERVER_ERROR,
                    "api_error",
                    "An internal error occurred during authentication.".into(),
                )
            }
        };

        (status, Json(ErrorResponse::new(error_type, message))).into_response()
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

/// Validate a key record (and its owner) into a principal. Pure — `now` is unix
/// seconds, `current_month` is "YYYY-MM".
pub fn authorize(
    record: &ApiKeyRecord,
    user: Option<&UserRecord>,
    now: i64,
    current_month: &str,
) -> Result<ApiKeyInfo, AuthError> {
    if !record.is_valid() {
        return Err(AuthError::InactiveKey {
            reason: record.deactivated_reason.clone(),
        });
    }
    if record.expires_at.is_some_and(|t| now >= t) {
        return Err(AuthError::ExpiredKey);
    }
    if user.is_some_and(|u| !u.is_active) {
        return Err(AuthError::InactiveOwner);
    }
    let info = ApiKeyInfo::from_db_record(record, user);
    if let Some(scope) = info.exhausted_budget(current_month) {
        return Err(AuthError::BudgetExceeded(scope));
    }
    Ok(info)
}

pub async fn require_api_key(
    State(auth_state): State<AuthState>,
    mut request: Request<Body>,
    next: Next,
) -> Result<Response, AuthError> {
    let Some(api_key) = extract_api_key(&request) else {
        return Err(AuthError::MissingApiKey);
    };

    // Check ephemeral key
    if let Some(ref ephemeral_key) = auth_state.settings.ephemeral_api_key {
        if crate::utils::api_key::secret_eq(&api_key, ephemeral_key) {
            request
                .extensions_mut()
                .insert(ApiKeyInfo::ephemeral(&api_key));
            return Ok(next.run(request).await);
        }
    }

    // Hash the incoming key before looking it up in the database
    let hashed = hash_key(&api_key, auth_state.settings.encryption_key.as_deref());

    let record = auth_state
        .storage
        .api_keys()
        .get_api_key(&hashed)
        .await
        .map_err(|e| AuthError::InternalError(e.to_string()))?
        .ok_or(AuthError::InvalidApiKey)?;

    let user = if record.user_id.is_empty() {
        None
    } else {
        let user = auth_state
            .storage
            .users()
            .get_user(&record.user_id)
            .await
            .map_err(|e| AuthError::InternalError(e.to_string()))?;
        // An owned key whose user row is gone is orphaned — reject it.
        Some(user.ok_or(AuthError::InactiveOwner)?)
    };

    let now = chrono::Utc::now();
    let key_info = authorize(
        &record,
        user.as_ref(),
        now.timestamp(),
        &now.format("%Y-%m").to_string(),
    )?;
    request.extensions_mut().insert(key_info);
    Ok(next.run(request).await)
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

    fn key() -> ApiKeyRecord {
        ApiKeyRecord {
            api_key: "hash".into(),
            key_id: "kid".into(),
            key_display: "sk-ab••••cd".into(),
            user_id: "uid".into(),
            name: "k".into(),
            is_active: true,
            rate_limit: 0,
            cost_rate: 1.0,
            monthly_budget: None,
            budget_used: 0.0,
            budget_used_mtd: 0.0,
            budget_mtd_month: None,
            deactivated_reason: None,
            budget_history: None,
            tpm_limit: None,
            cache_ttl: None,
            metadata: None,
            expires_at: None,
            allowed_models: None,
            created_at: 0,
            updated_at: None,
        }
    }

    fn user() -> UserRecord {
        let mut u = UserRecord::new("alice", 0);
        u.user_id = "uid".into();
        u
    }

    const MONTH: &str = "2026-11";

    #[test]
    fn test_api_key_info_master() {
        let info = ApiKeyInfo::master("sk-ant-master-key-12345");
        assert!(info.is_master);
        assert!(info.bypass_rate_limit());
        assert!(info.allows_model("anything"));
    }

    #[test]
    fn usage_api_key_is_hash_or_internal_id() {
        assert_eq!(ApiKeyInfo::master("sk-x").usage_api_key(), MASTER_KEY_ID);
        assert_eq!(
            ApiKeyInfo::ephemeral("sk-x").usage_api_key(),
            EPHEMERAL_KEY_ID
        );
        let info = ApiKeyInfo::from_db_record(&key(), None);
        assert_eq!(info.usage_api_key(), "hash");
    }

    #[test]
    fn test_api_key_truncation() {
        let truncated = ApiKeyInfo::truncate_key("sk-ant-api-key-very-long-string");
        assert_eq!(truncated, "sk-ant-a...");

        let short = ApiKeyInfo::truncate_key("short");
        assert_eq!(short, "short");
    }

    #[test]
    fn user_settings_resolve_into_principal() {
        let mut u = user();
        u.cost_rate = 0.5;
        u.cache_ttl = Some("1h".into());
        u.rate_limit = Some(30);
        let info = authorize(&key(), Some(&u), 0, MONTH).unwrap();
        assert_eq!(info.cost_rate, 0.5);
        assert_eq!(info.cache_ttl.as_deref(), Some("1h"));
        assert_eq!(info.user.as_ref().unwrap().rate_limit, Some(30));
        assert_eq!(info.rate_limit, None); // no key-level sub-limit

        let mut k = key();
        k.cache_ttl = Some("5m".into()); // key overrides user
        k.rate_limit = 10;
        let info = authorize(&k, Some(&u), 0, MONTH).unwrap();
        assert_eq!(info.cache_ttl.as_deref(), Some("5m"));
        assert_eq!(info.rate_limit, Some(10));
    }

    #[test]
    fn expiry_and_owner_status() {
        let mut k = key();
        k.expires_at = Some(100);
        assert!(authorize(&k, Some(&user()), 99, MONTH).is_ok());
        assert!(matches!(
            authorize(&k, Some(&user()), 100, MONTH),
            Err(AuthError::ExpiredKey)
        ));
        let mut u = user();
        u.is_active = false;
        assert!(matches!(
            authorize(&key(), Some(&u), 0, MONTH),
            Err(AuthError::InactiveOwner)
        ));
        let mut k = key();
        k.is_active = false;
        assert!(matches!(
            authorize(&k, Some(&user()), 0, MONTH),
            Err(AuthError::InactiveKey { .. })
        ));
    }

    #[test]
    fn budgets_are_per_layer_and_per_month() {
        let mut u = user();
        u.monthly_budget = Some(10.0);
        u.budget_used_mtd = 10.0;
        u.budget_mtd_month = Some(MONTH.into());
        assert!(matches!(
            authorize(&key(), Some(&u), 0, MONTH),
            Err(AuthError::BudgetExceeded(BudgetScope::User))
        ));
        // Last month's spend does not block this month (lazy reset).
        u.budget_mtd_month = Some("2026-10".into());
        assert!(authorize(&key(), Some(&u), 0, MONTH).is_ok());

        let mut k = key();
        k.monthly_budget = Some(1.0);
        k.budget_used_mtd = 1.5;
        k.budget_mtd_month = Some(MONTH.into());
        assert!(matches!(
            authorize(&k, Some(&user()), 0, MONTH),
            Err(AuthError::BudgetExceeded(BudgetScope::Key))
        ));
    }

    #[test]
    fn model_allowlists_intersect() {
        let mut k = key();
        k.allowed_models = Some(vec!["claude-*".into()]);
        let mut u = user();
        u.allowed_models = Some(vec!["*".into(), "!claude-opus-*".into()]);
        let info = authorize(&k, Some(&u), 0, MONTH).unwrap();
        assert!(info.allows_model("claude-sonnet-4-5"));
        assert!(!info.allows_model("claude-opus-4-1")); // user excludes
        assert!(!info.allows_model("gpt-5")); // key excludes
        let open = authorize(&key(), Some(&user()), 0, MONTH).unwrap();
        assert!(open.allows_model("gpt-5"));
    }
}
