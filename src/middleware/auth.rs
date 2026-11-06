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
use crate::database::models::{period_spend, ApiKeyRecord, BudgetPeriod, UserRecord};
use crate::database::traits::DatabaseService;
use crate::schemas::anthropic::ErrorResponse;
use crate::services::auth_cache::AuthCache;
use crate::services::backend_pool::model_filter::ModelFilter;
use crate::utils::api_key::hash_key;
use crate::utils::client_ip::{client_ip, in_any, parse_cidrs, Cidr};
use crate::utils::truncate_str;
use std::net::{IpAddr, SocketAddr};

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
    #[serde(default)]
    pub budget_period: BudgetPeriod,
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
            budget_period: u.budget_period,
        }
    }
}

/// Max tags taken from the `x-onerouter-tags` request header.
pub const MAX_REQUEST_TAGS: usize = 5;
/// Max tags on a usage row (request + key/user defaults).
pub const MAX_TOTAL_TAGS: usize = 10;
pub const MAX_TAG_LEN: usize = 64;

/// True for a well-formed tag: 1–64 chars of `[A-Za-z0-9_.:-]`.
pub fn valid_tag(t: &str) -> bool {
    !t.is_empty()
        && t.len() <= MAX_TAG_LEN
        && t.chars()
            .all(|c| c.is_ascii_alphanumeric() || matches!(c, '_' | '.' | ':' | '-'))
}

/// Parse `x-onerouter-tags` ("projA,ci"): invalid entries are dropped with a
/// warning, at most [`MAX_REQUEST_TAGS`] are kept.
pub fn parse_request_tags(raw: &str) -> Vec<String> {
    let mut out = Vec::new();
    for t in raw.split(',').map(str::trim).filter(|t| !t.is_empty()) {
        if !valid_tag(t) {
            tracing::warn!(tag = %truncate_str(t, 80), "Dropping invalid x-onerouter-tags entry");
            continue;
        }
        if out.len() >= MAX_REQUEST_TAGS {
            tracing::warn!("x-onerouter-tags has more than {MAX_REQUEST_TAGS} tags; extra dropped");
            break;
        }
        if !out.iter().any(|x| x == t) {
            out.push(t.to_string());
        }
    }
    out
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
    /// Key name (for alerts / logs).
    #[serde(default)]
    pub key_name: String,
    /// Budget period of the key-level sub-budget.
    #[serde(default)]
    pub budget_period: BudgetPeriod,
    /// Usage tags for this request (request header + key/user defaults).
    #[serde(default)]
    pub tags: Vec<String>,
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
            key_name: key_id.to_string(),
            budget_period: BudgetPeriod::Monthly,
            tags: Vec::new(),
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
            key_name: record.name.clone(),
            budget_period: record.budget_period,
            tags: merge_tags(
                &[],
                record.default_tags.as_deref(),
                user.and_then(|u| u.default_tags.as_deref()),
            ),
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

    /// Which budget layer (if any) is spent at `now` (each layer in its own period).
    pub fn exhausted_budget(&self, now: chrono::DateTime<chrono::Utc>) -> Option<BudgetScope> {
        let spent = |budget: Option<f64>, used: f64, stored: Option<&str>, p: BudgetPeriod| {
            budget.is_some_and(|limit| period_spend(used, stored, &p.key_at(now)) >= limit)
        };
        if let Some(u) = &self.user {
            if spent(
                u.monthly_budget,
                u.budget_used_mtd,
                u.budget_mtd_month.as_deref(),
                u.budget_period,
            ) {
                return Some(BudgetScope::User);
            }
        }
        if spent(
            self.monthly_budget,
            self.budget_used_mtd,
            self.budget_mtd_month.as_deref(),
            self.budget_period,
        ) {
            return Some(BudgetScope::Key);
        }
        None
    }
}

/// Request tags first, then key defaults, then user defaults; de-duplicated,
/// capped at [`MAX_TOTAL_TAGS`].
pub fn merge_tags(
    request: &[String],
    key: Option<&[String]>,
    user: Option<&[String]>,
) -> Vec<String> {
    let mut out: Vec<String> = Vec::new();
    for t in request
        .iter()
        .chain(key.unwrap_or(&[]).iter())
        .chain(user.unwrap_or(&[]).iter())
    {
        if out.len() >= MAX_TOTAL_TAGS {
            break;
        }
        if !out.contains(t) {
            out.push(t.clone());
        }
    }
    out
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
    IpNotAllowed,
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
            AuthError::IpNotAllowed => "ip_not_allowed",
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
                    BudgetScope::User => "Budget exceeded for this API key's user.",
                    BudgetScope::Key => "Budget exceeded for this API key.",
                }
                .into(),
            ),
            AuthError::IpNotAllowed => (
                StatusCode::FORBIDDEN,
                "permission_error",
                "Client address is not allowed for this API key.".into(),
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
    pub cache: Arc<AuthCache>,
}

impl AuthState {
    pub fn new(
        settings: Arc<Settings>,
        storage: Arc<dyn DatabaseService>,
        cache: Arc<AuthCache>,
    ) -> Self {
        Self {
            settings,
            storage,
            cache,
        }
    }
}

/// Per-request inputs to [`authorize`] beyond the stored records.
#[derive(Debug, Clone)]
pub struct RequestContext {
    pub now: chrono::DateTime<chrono::Utc>,
    /// Resolved client address (`None` = unknown).
    pub client_ip: Option<IpAddr>,
    /// Parsed `x-onerouter-tags`.
    pub tags: Vec<String>,
}

/// Every non-empty CIDR allowlist (key, user) must contain `ip`. Unknown
/// address + any allowlist → denied (fail closed). Malformed stored entries
/// deny as well (they were validated on write).
fn ip_allowed(lists: &[Option<&[String]>], ip: Option<IpAddr>) -> bool {
    for list in lists.iter().flatten().filter(|l| !l.is_empty()) {
        let Some(ip) = ip else { return false };
        let cidrs: Vec<Cidr> = match parse_cidrs(list) {
            Ok(c) => c,
            Err(_) => return false,
        };
        if !in_any(&cidrs, ip) {
            return false;
        }
    }
    true
}

// ============================================================================
// Middleware
// ============================================================================

/// Validate a key record (and its owner) into a principal. Pure.
pub fn authorize(
    record: &ApiKeyRecord,
    user: Option<&UserRecord>,
    ctx: &RequestContext,
) -> Result<ApiKeyInfo, AuthError> {
    let now = ctx.now.timestamp();
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
    if !ip_allowed(
        &[
            record.allowed_cidrs.as_deref(),
            user.and_then(|u| u.allowed_cidrs.as_deref()),
        ],
        ctx.client_ip,
    ) {
        return Err(AuthError::IpNotAllowed);
    }
    let mut info = ApiKeyInfo::from_db_record(record, user);
    if let Some(scope) = info.exhausted_budget(ctx.now) {
        return Err(AuthError::BudgetExceeded(scope));
    }
    info.tags = merge_tags(
        &ctx.tags,
        record.default_tags.as_deref(),
        user.and_then(|u| u.default_tags.as_deref()),
    );
    Ok(info)
}

/// Key + owner for a hash: auth cache first, then storage (result cached).
async fn lookup(
    state: &AuthState,
    hash: &str,
) -> Result<Option<Arc<(ApiKeyRecord, Option<UserRecord>)>>, AuthError> {
    if let Some(hit) = state.cache.get(hash) {
        return Ok(hit);
    }
    let record = state
        .storage
        .api_keys()
        .get_api_key(hash)
        .await
        .map_err(|e| AuthError::InternalError(e.to_string()))?;
    let Some(record) = record else {
        state.cache.put(hash, None);
        return Ok(None);
    };
    let user = if record.user_id.is_empty() {
        None
    } else {
        // An owned key whose user row is gone is orphaned — rejected below.
        state
            .storage
            .users()
            .get_user(&record.user_id)
            .await
            .map_err(|e| AuthError::InternalError(e.to_string()))?
    };
    let value = (record, user);
    state.cache.put(hash, Some(value.clone()));
    Ok(Some(Arc::new(value)))
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

    let Some(entry) = lookup(&auth_state, &hashed).await? else {
        return Err(AuthError::InvalidApiKey);
    };
    let (record, user) = (&entry.0, entry.1.as_ref());
    if !record.user_id.is_empty() && user.is_none() {
        return Err(AuthError::InactiveOwner);
    }

    let peer = request
        .extensions()
        .get::<axum::extract::ConnectInfo<SocketAddr>>()
        .map(|c| c.0);
    let ctx = RequestContext {
        now: chrono::Utc::now(),
        client_ip: client_ip(
            peer,
            request.headers(),
            &auth_state.settings.trusted_proxy_cidrs,
        ),
        tags: request
            .headers()
            .get("x-onerouter-tags")
            .and_then(|v| v.to_str().ok())
            .map(parse_request_tags)
            .unwrap_or_default(),
    };
    let key_info = authorize(record, user, &ctx)?;

    // last_used_at, debounced per instance; never blocks the request.
    if auth_state.cache.should_touch(&hashed) {
        let storage = auth_state.storage.clone();
        let at = ctx.now.timestamp();
        tokio::spawn(async move {
            if let Err(e) = storage.api_keys().touch_last_used(&hashed, at).await {
                tracing::debug!(error = %e, "Failed to update last_used_at");
            }
        });
    }

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
            allowed_cidrs: None,
            budget_period: BudgetPeriod::Monthly,
            budget_alerts_sent: None,
            default_tags: None,
            last_used_at: None,
            rotated_to: None,
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

    /// Context at unix `t` seconds, but in MONTH (2026-11-15) for budget periods
    /// when `t` is small (the expiry tests use tiny timestamps).
    fn ctx(t: i64) -> RequestContext {
        use chrono::TimeZone;
        let now = if t < 1_000_000 {
            chrono::Utc.with_ymd_and_hms(2026, 11, 15, 0, 0, 0).unwrap()
                + chrono::Duration::seconds(t)
        } else {
            chrono::Utc.timestamp_opt(t, 0).unwrap()
        };
        RequestContext {
            now,
            client_ip: Some("10.0.0.5".parse().unwrap()),
            tags: vec![],
        }
    }

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
        let info = authorize(&key(), Some(&u), &ctx(0)).unwrap();
        assert_eq!(info.cost_rate, 0.5);
        assert_eq!(info.cache_ttl.as_deref(), Some("1h"));
        assert_eq!(info.user.as_ref().unwrap().rate_limit, Some(30));
        assert_eq!(info.rate_limit, None); // no key-level sub-limit

        let mut k = key();
        k.cache_ttl = Some("5m".into()); // key overrides user
        k.rate_limit = 10;
        let info = authorize(&k, Some(&u), &ctx(0)).unwrap();
        assert_eq!(info.cache_ttl.as_deref(), Some("5m"));
        assert_eq!(info.rate_limit, Some(10));
    }

    #[test]
    fn expiry_and_owner_status() {
        let mut k = key();
        k.expires_at = Some(ctx(100).now.timestamp());
        assert!(authorize(&k, Some(&user()), &ctx(99)).is_ok());
        assert!(matches!(
            authorize(&k, Some(&user()), &ctx(100)),
            Err(AuthError::ExpiredKey)
        ));
        let mut u = user();
        u.is_active = false;
        assert!(matches!(
            authorize(&key(), Some(&u), &ctx(0)),
            Err(AuthError::InactiveOwner)
        ));
        let mut k = key();
        k.is_active = false;
        assert!(matches!(
            authorize(&k, Some(&user()), &ctx(0)),
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
            authorize(&key(), Some(&u), &ctx(0)),
            Err(AuthError::BudgetExceeded(BudgetScope::User))
        ));
        // Last month's spend does not block this month (lazy reset).
        u.budget_mtd_month = Some("2026-10".into());
        assert!(authorize(&key(), Some(&u), &ctx(0)).is_ok());

        let mut k = key();
        k.monthly_budget = Some(1.0);
        k.budget_used_mtd = 1.5;
        k.budget_mtd_month = Some(MONTH.into());
        assert!(matches!(
            authorize(&k, Some(&user()), &ctx(0)),
            Err(AuthError::BudgetExceeded(BudgetScope::Key))
        ));
    }

    #[test]
    fn ip_allowlists_intersect_and_fail_closed() {
        let mut k = key();
        k.allowed_cidrs = Some(vec!["10.0.0.0/8".into()]);
        let mut u = user();
        u.allowed_cidrs = Some(vec!["10.0.0.0/24".into()]);
        assert!(authorize(&k, Some(&u), &ctx(0)).is_ok()); // 10.0.0.5 in both
        let mut c = ctx(0);
        c.client_ip = Some("10.9.0.1".parse().unwrap()); // in key's, not user's
        assert!(matches!(
            authorize(&k, Some(&u), &c),
            Err(AuthError::IpNotAllowed)
        ));
        c.client_ip = None; // unknown address with an allowlist → deny
        assert!(matches!(
            authorize(&k, Some(&u), &c),
            Err(AuthError::IpNotAllowed)
        ));
        // No allowlists: unknown address is fine.
        assert!(authorize(&key(), Some(&user()), &c).is_ok());
    }

    #[test]
    fn weekly_user_budget_resets_with_the_week() {
        let mut u = user();
        u.budget_period = BudgetPeriod::Weekly;
        u.monthly_budget = Some(5.0);
        u.budget_used_mtd = 5.0;
        u.budget_mtd_month = Some(BudgetPeriod::Weekly.key_at(ctx(0).now));
        assert!(matches!(
            authorize(&key(), Some(&u), &ctx(0)),
            Err(AuthError::BudgetExceeded(BudgetScope::User))
        ));
        // Eight days later it is a new ISO week.
        assert!(authorize(&key(), Some(&u), &ctx(8 * 86_400)).is_ok());
    }

    #[test]
    fn tags_parse_and_merge() {
        assert_eq!(
            parse_request_tags(" projA, ci ,bad tag,projA"),
            vec!["projA", "ci"]
        );
        assert_eq!(parse_request_tags("a,b,c,d,e,f").len(), MAX_REQUEST_TAGS);
        assert!(!valid_tag(&"x".repeat(65)));
        let mut k = key();
        k.default_tags = Some(vec!["team-x".into(), "ci".into()]);
        let mut u = user();
        u.default_tags = Some(vec!["org".into()]);
        let mut c = ctx(0);
        c.tags = vec!["ci".into(), "run:42".into()];
        let info = authorize(&k, Some(&u), &c).unwrap();
        assert_eq!(info.tags, vec!["ci", "run:42", "team-x", "org"]);
    }

    #[test]
    fn model_allowlists_intersect() {
        let mut k = key();
        k.allowed_models = Some(vec!["claude-*".into()]);
        let mut u = user();
        u.allowed_models = Some(vec!["*".into(), "!claude-opus-*".into()]);
        let info = authorize(&k, Some(&u), &ctx(0)).unwrap();
        assert!(info.allows_model("claude-sonnet-4-5"));
        assert!(!info.allows_model("claude-opus-4-1")); // user excludes
        assert!(!info.allows_model("gpt-5")); // key excludes
        let open = authorize(&key(), Some(&user()), &ctx(0)).unwrap();
        assert!(open.allows_model("gpt-5"));
    }
}
