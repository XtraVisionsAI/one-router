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

/// Per-client admin-auth throttle shared by `POST /admin/api/login` and the
/// header-key path of `require_admin_key` (`x-api-key` / `Authorization` on
/// `/admin/api/*` and `/metrics`): both draw from the **same** buckets, so
/// splitting guesses across the two entry points gains nothing. Cheap to
/// clone (shared cache). Semantics: see [`reserve_attempt`].
#[derive(Clone)]
pub struct AdminThrottle(std::sync::Arc<ThrottleCache>);

/// Outcome of [`AdminThrottle::reserve`].
pub enum Reservation {
    /// Slot reserved under this bucket key; verify the key, then call
    /// [`AdminThrottle::succeeded`] on success (a failure keeps the slot).
    Allowed(String),
    /// Bucket full: refuse **without verifying** the key.
    Throttled,
}

impl AdminThrottle {
    /// Fresh, independent throttle (tests).
    pub fn new() -> Self {
        Self(std::sync::Arc::new(new_throttle_cache()))
    }

    /// The process-wide instance used by login and admin header auth.
    pub fn shared() -> Self {
        static T: std::sync::OnceLock<AdminThrottle> = std::sync::OnceLock::new();
        T.get_or_init(AdminThrottle::new).clone()
    }

    /// Reserve one attempt for `client` before verification (IPv6 by /64,
    /// unknown client → the shared `unknown` bucket).
    pub fn reserve(&self, client: Option<&str>) -> Reservation {
        let key = throttle_key(client);
        match reserve_attempt(&self.0, key.clone()) {
            Some(_) => Reservation::Allowed(key),
            None => Reservation::Throttled,
        }
    }

    /// A verified key refunds its own slot — only failures accumulate, so a
    /// correctly keyed client (e.g. Prometheus) never uses up the quota. It
    /// does **not** clear other attempts in the bucket: behind a shared
    /// address (proxy without `TRUSTED_PROXY_CIDRS`) a legitimate scraper
    /// must not reset an attacker's failure count every few seconds.
    pub fn succeeded(&self, bucket: &str) {
        self.0
            .entry(bucket.to_string())
            .and_compute_with(|existing| match existing.map(|e| e.into_value()) {
                Some((n, start)) if n > 1 => {
                    moka::ops::compute::Op::Put((n.min(MAX_LOGIN_FAILURES) - 1, start))
                }
                Some(_) => moka::ops::compute::Op::Remove,
                None => moka::ops::compute::Op::Nop,
            });
    }

    /// Seconds a throttled client should wait (`Retry-After`).
    pub fn retry_after_secs() -> u64 {
        LOGIN_LOCKOUT.as_secs()
    }
}

impl Default for AdminThrottle {
    fn default() -> Self {
        Self::new()
    }
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

/// Login throttle design (per client address, per instance):
///
/// - Only **failed** verifications consume the budget: an attempt atomically
///   reserves a slot before verification ([`reserve_attempt`]); a success
///   clears the bucket, a failure keeps its slot. Concurrent attempts each get
///   a distinct slot, so at most `MAX_LOGIN_FAILURES` verifications run per
///   window (no read-then-insert race).
/// - The bucket is checked **before** verification: once it is full, further
///   attempts are answered 429 without the key being compared, so a locked-out
///   brute-forcer learns nothing (no correct-key oracle), at the cost that a
///   correct key from the same bucket also waits out the window.
/// - Buckets are keyed by the resolved client address. Behind a reverse proxy
///   without `TRUSTED_PROXY_CIDRS`, every client shares the proxy's bucket and
///   anyone can lock admins out for `LOGIN_LOCKOUT` (login and admin
///   header-key auth alike — they share the buckets); [`warn_untrusted_proxy`]
///   logs a one-time warning when that configuration is detected.
///
/// Returns `None` when the bucket is full (attempt refused, not counted).
fn reserve_attempt(cache: &ThrottleCache, key: String) -> Option<u32> {
    let now = std::time::Instant::now();
    let entry = cache
        .entry(key)
        .and_upsert_with(|existing| match existing.map(|e| e.into_value()) {
            Some((n, start)) if now.duration_since(start) < LOGIN_LOCKOUT => {
                // Full buckets stay at the cap: refused attempts are not
                // counted (they were never verified).
                (n.saturating_add(1).min(MAX_LOGIN_FAILURES + 1), start)
            }
            _ => (1, now),
        })
        .into_value();
    (entry.0 <= MAX_LOGIN_FAILURES).then_some(entry.0)
}

/// Match `key` against the admin secrets: `Some((actor, strong))`.
///
/// `strong` = the matched secret is too strong to brute-force online, so a
/// correct key may be admitted even while the client's throttle bucket is
/// full (the "correct-key oracle" a locked bucket otherwise hides is useless
/// against a high-entropy key). This keeps a shared bucket (all clients
/// behind a proxy without `TRUSTED_PROXY_CIDRS`) from letting anyone lock out
/// UI login, header-key API calls and `/metrics` scraping. Strong: a
/// plaintext master key passing `master_key::is_strong`, any `sha256:` hash
/// (`hash-key` refuses weak input unless `--allow-weak`; first-run /
/// `reset-master-key` keys are random), the ephemeral key (random). A weak
/// plaintext master key keeps the strict lockout.
pub(crate) fn match_admin_key(
    key: &str,
    settings: &crate::config::settings::Settings,
) -> Option<(&'static str, bool)> {
    if let Some(mk) = settings.master_api_key.as_deref() {
        if crate::config::master_key::matches(key, mk) {
            let strong = crate::config::master_key::is_hashed(mk)
                || crate::config::master_key::is_strong(mk);
            return Some(("master", strong));
        }
    }
    if let Some(ek) = settings.ephemeral_api_key.as_deref() {
        if crate::utils::api_key::secret_eq(key, ek) {
            return Some(("ephemeral", true));
        }
    }
    None
}

/// One-time warning: an admin login carried `X-Forwarded-For` but no trusted
/// proxies are configured, so the header is ignored and every client behind
/// the proxy shares one throttle bucket (and one audit address).
pub(crate) fn warn_untrusted_proxy(
    headers: &HeaderMap,
    settings: &crate::config::settings::Settings,
) {
    static WARNED: std::sync::atomic::AtomicBool = std::sync::atomic::AtomicBool::new(false);
    if settings.trusted_proxy_cidrs.is_empty()
        && headers.contains_key("x-forwarded-for")
        && !WARNED.swap(true, std::sync::atomic::Ordering::Relaxed)
    {
        tracing::warn!(
            "Admin authentication received X-Forwarded-For but TRUSTED_PROXY_CIDRS is empty: the header \
             is ignored, so all clients behind this proxy share one admin-auth throttle bucket \
             (anyone can trigger a {}-minute lockout of UI login, header-key API calls and /metrics scraping) and one audit address. Set \
             TRUSTED_PROXY_CIDRS to the proxy's address range.",
            LOGIN_LOCKOUT.as_secs() / 60
        );
    }
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
    warn_untrusted_proxy(&headers, &state.settings);
    let throttle = AdminThrottle::shared();
    // Slot reserved before verification (see `reserve_attempt`); a success
    // clears the bucket, so only failures accumulate.
    let reservation = throttle.reserve(client.as_deref());
    let matched = match_admin_key(key, &state.settings);
    let throttle_key = match reservation {
        Reservation::Allowed(k) => Some(k),
        // Full bucket: only a correct *strong* key gets through (see
        // `match_admin_key`); everything else is refused unverified-looking.
        Reservation::Throttled if matches!(matched, Some((_, true))) => None,
        Reservation::Throttled => {
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
    };
    let audit_state = crate::services::audit::AuditState {
        database: state.database.clone(),
        settings: state.settings.clone(),
    };
    let meta = crate::services::audit::meta(connect.map(|c| c.0), &headers, &state.settings);

    if matched.is_none() {
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
    if let Some(k) = &throttle_key {
        throttle.succeeded(k);
    }
    let token = Uuid::new_v4().to_string();
    {
        let mut sessions = state.sessions.write().await;
        sessions.retain(|_, s| !s.is_expired());
        sessions.insert(
            crate::server::state::session_key(&token),
            crate::server::state::AdminSession::new(),
        );
    }
    let actor = matched.map(|(a, _)| a).unwrap_or("ephemeral");
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
    fn attempts_reserved_atomically_before_verification() {
        let cache = std::sync::Arc::new(new_throttle_cache());
        // 32 concurrent attempts from one client: each reserves a distinct
        // slot, so exactly MAX_LOGIN_FAILURES of them are allowed to verify.
        let handles: Vec<_> = (0..32)
            .map(|_| {
                let c = cache.clone();
                std::thread::spawn(move || reserve_attempt(&c, "1.2.3.4".into()))
            })
            .collect();
        let mut slots: Vec<u32> = handles
            .into_iter()
            .filter_map(|h| h.join().unwrap())
            .collect();
        slots.sort();
        assert_eq!(slots, (1..=MAX_LOGIN_FAILURES).collect::<Vec<_>>());
        // Refused attempts are not counted: the bucket stays at the cap.
        assert_eq!(cache.get("1.2.3.4").unwrap().0, MAX_LOGIN_FAILURES + 1);
        // Another client is independent.
        assert_eq!(reserve_attempt(&cache, "5.6.7.8".into()), Some(1));
    }

    #[test]
    fn successes_do_not_consume_the_budget() {
        let cache = new_throttle_cache();
        // Many successful logins (each reserve followed by the success-path
        // invalidate) never lock the client out.
        for _ in 0..(MAX_LOGIN_FAILURES * 3) {
            assert!(reserve_attempt(&cache, "9.9.9.9".into()).is_some());
            cache.invalidate("9.9.9.9");
        }
        // Failures accumulate up to the cap, then attempts are refused
        // before verification.
        for n in 1..=MAX_LOGIN_FAILURES {
            assert_eq!(reserve_attempt(&cache, "9.9.9.9".into()), Some(n));
        }
        assert_eq!(reserve_attempt(&cache, "9.9.9.9".into()), None);
    }
}
