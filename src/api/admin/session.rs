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

/// (attempts in the window, window start).
type ThrottleEntry = (u32, std::time::Instant);
type ThrottleCache = moka::sync::Cache<String, ThrottleEntry>;

/// client address (IPv6 by /64) → attempts in the current window (per instance).
fn login_throttle() -> &'static ThrottleCache {
    static T: std::sync::OnceLock<ThrottleCache> = std::sync::OnceLock::new();
    T.get_or_init(new_throttle_cache)
}

fn new_throttle_cache() -> ThrottleCache {
    moka::sync::Cache::builder()
        .max_capacity(100_000)
        // Eviction backstop only; the window itself is the stored start time
        // (updates would otherwise keep extending a TTL).
        .time_to_live(LOGIN_LOCKOUT)
        .build()
}

/// Throttle bucket for a client: the address, IPv6 truncated to its /64 (one
/// host usually owns a whole /64, so per-address buckets are trivially
/// evaded). IPv4-mapped IPv6 is treated as IPv4.
fn throttle_key(client: Option<&str>) -> String {
    let Some(raw) = client else {
        return "unknown".into();
    };
    match raw.parse::<std::net::IpAddr>() {
        Ok(std::net::IpAddr::V6(v6)) => match v6.to_ipv4_mapped() {
            Some(v4) => v4.to_string(),
            None => {
                let prefix = u128::from(v6) & (u128::MAX << 64);
                format!("{}/64", std::net::Ipv6Addr::from(prefix))
            }
        },
        Ok(ip) => ip.to_string(),
        Err(_) => raw.to_string(),
    }
}

/// Atomically count one login attempt for `key` **before** verification and
/// return the attempt number in the current window. Concurrent attempts each
/// get a distinct number, so at most `MAX_LOGIN_FAILURES` verifications run
/// per window (no read-then-insert race).
fn register_attempt(cache: &ThrottleCache, key: String) -> u32 {
    let now = std::time::Instant::now();
    cache
        .entry(key)
        .and_upsert_with(|existing| match existing.map(|e| e.into_value()) {
            Some((n, start)) if now.duration_since(start) < LOGIN_LOCKOUT => {
                (n.saturating_add(1), start)
            }
            _ => (1, now),
        })
        .into_value()
        .0
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
    let throttle_key = throttle_key(client.as_deref());
    // Counted before verification; a success clears the bucket, so N failures
    // allow attempt N+1 only while N < MAX_LOGIN_FAILURES.
    if register_attempt(login_throttle(), throttle_key.clone()) > MAX_LOGIN_FAILURES {
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

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn ipv6_keyed_by_slash_64() {
        assert_eq!(
            throttle_key(Some("2001:db8:1:2:aaaa::1")),
            throttle_key(Some("2001:db8:1:2:ffff::9"))
        );
        assert_ne!(
            throttle_key(Some("2001:db8:1:2::1")),
            throttle_key(Some("2001:db8:1:3::1"))
        );
        assert_eq!(throttle_key(Some("2001:db8:1:2::1")), "2001:db8:1:2::/64");
        assert_eq!(throttle_key(Some("::ffff:10.0.0.1")), "10.0.0.1");
        assert_eq!(throttle_key(Some("10.0.0.1")), "10.0.0.1");
        assert_eq!(throttle_key(None), "unknown");
    }

    #[test]
    fn attempts_counted_atomically_before_verification() {
        let cache = std::sync::Arc::new(new_throttle_cache());
        // 32 concurrent attempts from one client: each gets a distinct number,
        // so exactly MAX_LOGIN_FAILURES of them are allowed to verify.
        let handles: Vec<_> = (0..32)
            .map(|_| {
                let c = cache.clone();
                std::thread::spawn(move || register_attempt(&c, "1.2.3.4".into()))
            })
            .collect();
        let mut nums: Vec<u32> = handles.into_iter().map(|h| h.join().unwrap()).collect();
        nums.sort();
        assert_eq!(nums, (1..=32).collect::<Vec<_>>());
        assert_eq!(
            nums.iter().filter(|n| **n <= MAX_LOGIN_FAILURES).count(),
            MAX_LOGIN_FAILURES as usize
        );
        // Another client is independent; a success clears the bucket.
        assert_eq!(register_attempt(&cache, "5.6.7.8".into()), 1);
        cache.invalidate("1.2.3.4");
        assert_eq!(register_attempt(&cache, "1.2.3.4".into()), 1);
    }
}
