//! Admin session management (login / logout)
//!
//! POST /admin/api/login  — verify master/ephemeral key, issue HttpOnly session cookie
//! POST /admin/api/logout — invalidate session, clear cookie

use axum::{
    extract::State,
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

pub async fn login(
    State(state): State<AppState>,
    Json(body): Json<LoginRequest>,
) -> impl IntoResponse {
    let key = body.key.trim();

    // Verify against master key
    let is_master = state
        .settings
        .master_api_key
        .as_deref()
        .map(|mk| mk == key)
        .unwrap_or(false);

    // Verify against ephemeral key
    let is_ephemeral = state
        .settings
        .ephemeral_api_key
        .as_deref()
        .map(|ek| ek == key)
        .unwrap_or(false);

    if !is_master && !is_ephemeral {
        return (
            StatusCode::UNAUTHORIZED,
            Json(serde_json::json!({
                "error": { "type": "authentication_error", "message": "Invalid API key." }
            })),
        )
            .into_response();
    }

    // Generate session token and store it
    let token = Uuid::new_v4().to_string();
    state.sessions.write().await.insert(token.clone());

    // Build Set-Cookie header
    let cookie = format!("admin_session={token}; HttpOnly; SameSite=Strict; Path=/admin");

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
        state.sessions.write().await.remove(&token);
    }

    // Clear cookie
    let cookie = "admin_session=; HttpOnly; SameSite=Strict; Path=/admin; Max-Age=0";
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
