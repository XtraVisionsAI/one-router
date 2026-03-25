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

pub mod backends;
pub mod keys;
pub mod status;

/// Embedded static files from `static/admin/`
#[derive(Embed)]
#[folder = "static/admin/"]
struct AdminAssets;

/// Serve the admin index.html for GET /admin
pub async fn serve_index() -> impl IntoResponse {
    serve_file("index.html")
}

/// Serve a static asset by path under /admin/assets/*
/// e.g. GET /admin/assets/app.js → serve "app.js" from embedded files
pub async fn serve_asset(
    axum::extract::Path(path): axum::extract::Path<String>,
) -> impl IntoResponse {
    serve_file(&path)
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
