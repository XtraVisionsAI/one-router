//! Admin session management (login / logout)
//!
//! POST /admin/api/login  — verify master/ephemeral key, issue HttpOnly session cookie
//! POST /admin/api/logout — invalidate session, clear cookie

use axum::{
    extract::{ConnectInfo, State},
    http::{header, HeaderMap, StatusCode},
    response::IntoResponse,
    Json,
};
use serde::Deserialize;
use uuid::Uuid;

use crate::server::state::AppState;

#[derive(Deserialize)]
pub struct LoginRequest {
    key: String,
}

/// Failed logins allowed per client address per lockout window.
const MAX_LOGIN_FAILURES: u32 = 10;
const LOGIN_LOCKOUT: std::time::Duration = std::time::Duration::from_secs(15 * 60);

/// client address → failed attempts in the current window (per instance).
fn login_throttle() -> &'static moka::sync::Cache<String, u32> {
    static T: std::sync::OnceLock<moka::sync::Cache<String, u32>> = std::sync::OnceLock::new();
    T.get_or_init(|| {
        moka::sync::Cache::builder()
            .max_capacity(100_000)
            .time_to_live(LOGIN_LOCKOUT)
            .build()
    })
}

/// `ADMIN_COOKIE_INSECURE=true` drops the cookie's `Secure` flag — only for
/// plain-HTTP access from a non-localhost address (browsers already accept
/// `Secure` cookies on http://localhost).
fn cookie_insecure() -> bool {
    std::env::var("ADMIN_COOKIE_INSECURE").is_ok_and(|v| v == "true" || v == "1")
}

pub async fn login(
    State(state): State<AppState>,
    connect: Option<ConnectInfo<std::net::SocketAddr>>,
    headers: HeaderMap,
    Json(body): Json<LoginRequest>,
) -> impl IntoResponse {
    let key = body.key.trim();
    let client = crate::services::audit::meta(connect.map(|c| c.0), &headers, &state.settings).0;
    let throttle_key = client.clone().unwrap_or_else(|| "unknown".into());
    if login_throttle().get(&throttle_key).unwrap_or(0) >= MAX_LOGIN_FAILURES {
        // Throttled attempts are not audited individually (flood protection).
        return (
            StatusCode::TOO_MANY_REQUESTS,
            [(header::RETRY_AFTER, LOGIN_LOCKOUT.as_secs().to_string())],
            Json(serde_json::json!({
                "error": { "type": "rate_limit_error", "message": "Too many failed logins. Try again later." }
            })),
        )
            .into_response();
    }
    let audit_state = crate::services::audit::AuditState {
        database: state.database.clone(),
        settings: state.settings.clone(),
    };
    let meta = crate::services::audit::meta(connect.map(|c| c.0), &headers, &state.settings);

    // Verify against master key
    let is_master = state
        .settings
        .master_api_key
        .as_deref()
        .map(|mk| crate::config::master_key::matches(key, mk))
        .unwrap_or(false);

    // Verify against ephemeral key
    let is_ephemeral = state
        .settings
        .ephemeral_api_key
        .as_deref()
        .map(|ek| crate::utils::api_key::secret_eq(key, ek))
        .unwrap_or(false);

    if !is_master && !is_ephemeral {
        let failures = login_throttle().get(&throttle_key).unwrap_or(0) + 1;
        login_throttle().insert(throttle_key, failures);
        crate::services::audit::record_login(&audit_state, meta, "anonymous", false, 401);
        return (
            StatusCode::UNAUTHORIZED,
            Json(serde_json::json!({
                "error": { "type": "authentication_error", "message": "Invalid API key." }
            })),
        )
            .into_response();
    }

    // Generate session token and store it
    login_throttle().invalidate(&throttle_key);
    let token = Uuid::new_v4().to_string();
    {
        let mut sessions = state.sessions.write().await;
        sessions.retain(|_, s| !s.is_expired());
        sessions.insert(
            crate::server::state::session_key(&token),
            crate::server::state::AdminSession::new(),
        );
    }
    let actor = if is_master { "master" } else { "ephemeral" };
    crate::services::audit::record_login(&audit_state, meta, actor, true, 200);

    // Build Set-Cookie header
    let cookie = format!(
        "admin_session={token}; HttpOnly; SameSite=Strict; Path=/admin; Max-Age={}{}",
        crate::server::state::ADMIN_SESSION_TTL.as_secs(),
        if cookie_insecure() { "" } else { "; Secure" }
    );

    let mut headers = HeaderMap::new();
    headers.insert(header::SET_COOKIE, cookie.parse().unwrap());

    (
        headers,
        Json(serde_json::json!({
            "ok": true,
            "version": state.settings.app_version,
        })),
    )
        .into_response()
}

pub async fn logout(State(state): State<AppState>, headers: HeaderMap) -> impl IntoResponse {
    // Extract token from cookie
    if let Some(token) = extract_session_cookie(&headers) {
        state
            .sessions
            .write()
            .await
            .remove(&crate::server::state::session_key(&token));
    }

    // Clear cookie
    let cookie = format!(
        "admin_session=; HttpOnly; SameSite=Strict; Path=/admin; Max-Age=0{}",
        if cookie_insecure() { "" } else { "; Secure" }
    );
    let mut resp_headers = HeaderMap::new();
    resp_headers.insert(header::SET_COOKIE, cookie.parse().unwrap());

    (resp_headers, Json(serde_json::json!({ "ok": true }))).into_response()
}

/// Extract the admin_session token from the Cookie header.
pub fn extract_session_cookie(headers: &HeaderMap) -> Option<String> {
    headers
        .get(header::COOKIE)?
        .to_str()
        .ok()?
        .split(';')
        .find_map(|pair| {
            let pair = pair.trim();
            pair.strip_prefix("admin_session=").map(|v| v.to_string())
        })
}
