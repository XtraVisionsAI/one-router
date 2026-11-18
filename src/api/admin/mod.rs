//! Admin UI — static file serving and API handlers
//!
//! Static files are embedded at compile time via rust-embed.
//! API handlers (Phase 2) live in submodules.
//!
//! Route layout:
//!   GET /admin            → serve_index (index.html)
//!   GET /admin/assets/*   → serve_asset (JS, CSS)
//!   GET /admin/api/*      → API handlers (protected by require_admin_key)

use axum::{
    body::Body,
    http::{header, Response, StatusCode},
    response::IntoResponse,
};
use rust_embed::Embed;

pub mod admin_usage;
pub mod audit;
pub mod backends;
pub mod common;
pub mod keys;
pub mod mappings;
pub mod pricing;
pub mod session;
pub mod status;
pub mod system_settings;
pub mod teams;
pub mod update;
pub mod users;

/// Embedded static files from `static/admin/`
#[derive(Embed)]
#[folder = "static/admin/"]
struct AdminAssets;

/// Serve the admin index.html for GET /admin
pub async fn serve_index() -> impl IntoResponse {
    serve_file("index.html")
}

/// Serve a static asset by path under /admin/assets/*
/// e.g. GET /admin/assets/app.js → serve "assets/app.js" from embedded files
pub async fn serve_asset(
    axum::extract::Path(path): axum::extract::Path<String>,
) -> impl IntoResponse {
    serve_file(&format!("assets/{path}"))
}

/// Serve logo.png for GET /admin/logo.png
pub async fn serve_logo() -> impl IntoResponse {
    serve_file("logo.png")
}

/// Serve favicon.png for GET /admin/favicon.png
pub async fn serve_favicon() -> impl IntoResponse {
    serve_file("favicon.png")
}

/// Content-Security-Policy for the Admin UI. The Vite build loads only
/// same-origin module scripts / stylesheets (no inline `<script>`); naive-ui
/// (css-render) injects `<style>` elements at runtime, hence `'unsafe-inline'`
/// for styles only. The bundled CSS uses `data:` images / fonts.
pub const ADMIN_CSP: &str = "default-src 'self'; script-src 'self'; \
     style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:; \
     connect-src 'self'; frame-ancestors 'none'; object-src 'none'; base-uri 'self'; \
     form-action 'self'";

/// Middleware: security headers on every `/admin` and `/admin/api` response
/// (anti-framing, no MIME sniffing, no referrer leakage of admin URLs).
pub async fn admin_security_headers(
    request: axum::extract::Request,
    next: axum::middleware::Next,
) -> axum::response::Response {
    let mut response = next.run(request).await;
    let h = response.headers_mut();
    for (name, value) in [
        (header::CONTENT_SECURITY_POLICY, ADMIN_CSP),
        (header::X_FRAME_OPTIONS, "DENY"),
        (header::X_CONTENT_TYPE_OPTIONS, "nosniff"),
        (header::REFERRER_POLICY, "no-referrer"),
    ] {
        h.insert(name, header::HeaderValue::from_static(value));
    }
    response
}

fn serve_file(path: &str) -> Response<Body> {
    match AdminAssets::get(path) {
        Some(content) => {
            let mime = content.metadata.mimetype();
            Response::builder()
                .status(StatusCode::OK)
                .header(header::CONTENT_TYPE, mime)
                .body(Body::from(content.data.into_owned()))
                .unwrap()
        }
        None => Response::builder()
            .status(StatusCode::NOT_FOUND)
            .body(Body::from("Not found"))
            .unwrap(),
    }
}
