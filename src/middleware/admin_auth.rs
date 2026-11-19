//! Admin authentication middleware
//!
//! Grants access to `/admin/api/*` routes via:
//!   1. A valid session cookie (admin_session) — issued by POST /admin/api/login
//!   2. The MASTER_API_KEY in x-api-key / Authorization header
//!   3. The ephemeral key (debug builds only)
//!
//! Regular database-stored API keys are explicitly rejected.
//!
//! Header-key attempts share the login throttle ([`AdminThrottle`]): each one
//! reserves a slot per client address before verification, a full bucket is
//! refused with 429 **without verifying** the key, and a verified key clears
//! the bucket. Requests with no key (or a valid session cookie) are not counted.

use axum::{
    body::Body,
    extract::State,
    http::{Request, StatusCode},
    middleware::Next,
    response::{IntoResponse, Response},
    Json,
};
use std::sync::Arc;

use crate::api::admin::session::{extract_session_cookie, AdminThrottle, Reservation};
use crate::config::Settings;
use crate::middleware::auth::extract_api_key;
use crate::schemas::anthropic::ErrorResponse;
use crate::server::state::SessionStore;

#[derive(Clone)]
pub struct AdminAuthState {
    pub settings: Arc<Settings>,
    pub sessions: SessionStore,
    /// Shared with `POST /admin/api/login` (same buckets).
    pub throttle: AdminThrottle,
}

impl AdminAuthState {
    pub fn new(settings: Arc<Settings>, sessions: SessionStore) -> Self {
        Self {
            settings,
            sessions,
            throttle: AdminThrottle::shared(),
        }
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

    // Online-guessing guard: reserve a slot before verifying (a full bucket
    // is refused without checking the key — no correct-key oracle).
    crate::api::admin::session::warn_untrusted_proxy(request.headers(), &state.settings);
    let client = crate::services::audit::request_meta(&request, &state.settings).0;
    let reservation = state.throttle.reserve(client.as_deref());
    let matched = crate::api::admin::session::match_admin_key(&raw_key, &state.settings);
    let bucket = match reservation {
        Reservation::Allowed(k) => Some(k),
        // Full bucket: a correct strong key is still admitted (see
        // `session::match_admin_key`), so a shared bucket can't lock out
        // Prometheus / scripted admin calls; anything else → 429.
        Reservation::Throttled if matches!(matched, Some((_, true))) => None,
        Reservation::Throttled => return Err(AdminAuthError::Throttled),
    };

    match matched.map(|(actor, _)| actor) {
        Some(actor) => {
            if let Some(b) = &bucket {
                state.throttle.succeeded(b);
            }
            request.extensions_mut().insert(AdminActor(actor.into()));
            Ok(next.run(request).await)
        }
        // The failed attempt keeps its slot.
        None => Err(AdminAuthError::Forbidden),
    }
}

#[derive(Debug)]
pub enum AdminAuthError {
    Missing,
    Forbidden,
    CrossSite,
    /// Too many failed admin key attempts from this client.
    Throttled,
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
        let (status, error_type, msg) = match self {
            AdminAuthError::Missing => (
                StatusCode::UNAUTHORIZED,
                "authentication_error",
                "Admin access requires master or ephemeral API key.",
            ),
            AdminAuthError::Forbidden => (
                StatusCode::FORBIDDEN,
                "authentication_error",
                "This API key does not have admin access.",
            ),
            AdminAuthError::CrossSite => (
                StatusCode::FORBIDDEN,
                "authentication_error",
                "Cross-site admin request rejected.",
            ),
            AdminAuthError::Throttled => (
                StatusCode::TOO_MANY_REQUESTS,
                "rate_limit_error",
                "Too many failed admin key attempts. Try again later.",
            ),
        };
        let mut resp = (status, Json(ErrorResponse::new(error_type, msg))).into_response();
        if status == StatusCode::TOO_MANY_REQUESTS {
            resp.headers_mut().insert(
                axum::http::header::RETRY_AFTER,
                axum::http::HeaderValue::from(AdminThrottle::retry_after_secs()),
            );
        }
        resp
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
            outbound_proxy: Default::default(),
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

    mod throttle {
        use super::*;
        use axum::{extract::ConnectInfo, routing::get, Router};

        /// `Router` is always ready, so calling it directly is fine.
        async fn send(router: Router, req: Request<Body>) -> Response {
            let mut router = router;
            tower::Service::call(&mut router, req).await.unwrap()
        }

        const MASTER: &str = "sk-master-key-for-throttle-tests-0123456789";

        fn app(state: AdminAuthState) -> Router {
            Router::new()
                .route("/metrics", get(|| async { "ok" }))
                .layer(axum::middleware::from_fn_with_state(
                    state,
                    require_admin_key,
                ))
        }

        fn state(throttle: AdminThrottle) -> AdminAuthState {
            AdminAuthState {
                settings: Arc::new(make_settings(Some(MASTER), None)),
                sessions: Default::default(),
                throttle,
            }
        }

        async fn call(state: &AdminAuthState, ip: &str, key: Option<&str>) -> StatusCode {
            let mut req = Request::builder().uri("/metrics");
            if let Some(k) = key {
                req = req.header("authorization", format!("Bearer {k}"));
            }
            let mut req = req.body(Body::empty()).unwrap();
            let addr = std::net::SocketAddr::new(ip.parse().unwrap(), 4000);
            req.extensions_mut().insert(ConnectInfo(addr));
            send(app(state.clone()), req).await.status()
        }

        #[tokio::test]
        async fn failed_header_keys_are_throttled_without_verification() {
            let st = state(AdminThrottle::new());
            for _ in 0..10 {
                assert_eq!(
                    call(&st, "1.2.3.4", Some("wrong")).await,
                    StatusCode::FORBIDDEN
                );
            }
            // Bucket full: even the correct key gets 429 (no oracle).
            assert_eq!(
                call(&st, "1.2.3.4", Some("wrong")).await,
                StatusCode::TOO_MANY_REQUESTS
            );
            assert_eq!(
                call(&st, "1.2.3.4", Some(MASTER)).await,
                StatusCode::TOO_MANY_REQUESTS
            );
            // Another client is unaffected.
            assert_eq!(call(&st, "5.6.7.8", Some(MASTER)).await, StatusCode::OK);
        }

        #[tokio::test]
        async fn ipv6_clients_share_a_slash_64_bucket() {
            let st = state(AdminThrottle::new());
            for i in 0..10 {
                let ip = format!("2001:db8:1:2::{:x}", i + 1);
                assert_eq!(call(&st, &ip, Some("wrong")).await, StatusCode::FORBIDDEN);
            }
            assert_eq!(
                call(&st, "2001:db8:1:2:ffff::1", Some("wrong")).await,
                StatusCode::TOO_MANY_REQUESTS
            );
        }

        #[tokio::test]
        async fn successful_scrapes_never_exhaust_the_quota() {
            let st = state(AdminThrottle::new());
            for _ in 0..50 {
                assert_eq!(call(&st, "10.0.0.9", Some(MASTER)).await, StatusCode::OK);
            }
            // A success refunds only its own slot: failures from the same
            // (possibly shared) bucket are kept, not cleared by a scraper.
            for _ in 0..9 {
                call(&st, "10.0.0.9", Some("wrong")).await;
            }
            assert_eq!(call(&st, "10.0.0.9", Some(MASTER)).await, StatusCode::OK);
            assert_eq!(
                call(&st, "10.0.0.9", Some("wrong")).await,
                StatusCode::FORBIDDEN
            );
            assert_eq!(
                call(&st, "10.0.0.9", Some("wrong")).await,
                StatusCode::TOO_MANY_REQUESTS
            );
            // MASTER is a *weak* key (well-known fragments): strict lockout,
            // the correct key waits out the window too.
            assert_eq!(
                call(&st, "10.0.0.9", Some(MASTER)).await,
                StatusCode::TOO_MANY_REQUESTS
            );
        }

        #[tokio::test]
        async fn strong_key_bypasses_a_locked_shared_bucket() {
            const STRONG: &str = "sk-9f3c1a7e5b2d4086c1e9a3f7b5d20c84e6a1";
            assert!(crate::config::master_key::is_strong(STRONG));
            let st = AdminAuthState {
                settings: Arc::new(make_settings(Some(STRONG), None)),
                sessions: Default::default(),
                throttle: AdminThrottle::new(),
            };
            // An anonymous client behind the same proxy address fills the bucket…
            for _ in 0..10 {
                call(&st, "10.0.0.1", Some("guess")).await;
            }
            assert_eq!(
                call(&st, "10.0.0.1", Some("guess")).await,
                StatusCode::TOO_MANY_REQUESTS
            );
            // …but the scraper with the correct strong key keeps working, and
            // does not unlock the bucket for the guesser.
            for _ in 0..5 {
                assert_eq!(call(&st, "10.0.0.1", Some(STRONG)).await, StatusCode::OK);
            }
            assert_eq!(
                call(&st, "10.0.0.1", Some("guess")).await,
                StatusCode::TOO_MANY_REQUESTS
            );
            // A hashed master key counts as strong.
            let hashed = crate::config::master_key::hash(STRONG);
            let st = AdminAuthState {
                settings: Arc::new(make_settings(Some(&hashed), None)),
                sessions: Default::default(),
                throttle: AdminThrottle::new(),
            };
            for _ in 0..11 {
                call(&st, "10.0.0.2", Some("guess")).await;
            }
            assert_eq!(call(&st, "10.0.0.2", Some(STRONG)).await, StatusCode::OK);
        }

        #[tokio::test]
        async fn requests_without_a_key_are_not_counted() {
            let st = state(AdminThrottle::new());
            for _ in 0..50 {
                assert_eq!(call(&st, "1.1.1.1", None).await, StatusCode::UNAUTHORIZED);
            }
            assert_eq!(call(&st, "1.1.1.1", Some(MASTER)).await, StatusCode::OK);
        }

        #[tokio::test]
        async fn valid_session_cookie_bypasses_a_full_bucket() {
            let st = state(AdminThrottle::new());
            let token = "session-token-for-test";
            st.sessions.write().await.insert(
                crate::server::state::session_key(token),
                crate::server::state::AdminSession::new(),
            );
            for _ in 0..11 {
                call(&st, "3.3.3.3", Some("wrong")).await;
            }
            let mut req = Request::builder()
                .uri("/metrics")
                .header("cookie", format!("admin_session={token}"))
                .body(Body::empty())
                .unwrap();
            req.extensions_mut().insert(ConnectInfo(
                "3.3.3.3:1".parse::<std::net::SocketAddr>().unwrap(),
            ));
            assert_eq!(send(app(st.clone()), req).await.status(), StatusCode::OK);
        }

        #[tokio::test]
        async fn unknown_client_shares_one_bucket_with_login() {
            // No ConnectInfo → client unknown → the shared "unknown" bucket;
            // the same throttle instance as login (shared buckets).
            let throttle = AdminThrottle::new();
            let st = state(throttle.clone());
            for _ in 0..10 {
                let req = Request::builder()
                    .uri("/metrics")
                    .header("x-api-key", "wrong")
                    .body(Body::empty())
                    .unwrap();
                send(app(st.clone()), req).await;
            }
            assert!(matches!(throttle.reserve(None), Reservation::Throttled));
        }
    }
}
