//! Application routing

use axum::{
    body::Body,
    http::Request,
    middleware,
    response::Response,
    routing::{delete, get, post, put},
    Router,
};
use tower_http::cors::{Any, CorsLayer};

use crate::api::{
    admin, chat_completions, embeddings, health, images, messages, models, rerank, usage,
};
use crate::middleware::{
    admin_auth::{require_admin_key, AdminAuthState},
    auth::{extract_api_key, require_api_key, AuthState},
    rate_limit::{rate_limit, RateLimitState},
};
use crate::server::state::AppState;

/// Create the main application router
pub fn create_router(state: AppState) -> Router {
    // Health check routes (no authentication required)
    let health_routes = Router::new()
        .route("/health", get(health::health_check))
        .route("/ready", get(health::readiness))
        .route("/liveness", get(health::liveness));

    // Create middleware state
    let auth_state = AuthState::new(state.settings.clone(), state.database.clone());
    let auth_state_clone = auth_state.clone();

    // Get default RPM from feature flags (loaded at startup) or use 100
    let default_rpm = 100u32;
    let rate_limit_state = RateLimitState::new(default_rpm);
    let rate_limit_state_clone = rate_limit_state.clone();

    // Anthropic API routes (POST /v1/messages)
    let anthropic_routes = Router::new()
        .route("/messages", post(messages::create_message))
        .route("/messages/count_tokens", post(messages::count_tokens))
        .layer(middleware::from_fn_with_state(
            rate_limit_state.clone(),
            rate_limit,
        ))
        .layer(middleware::from_fn_with_state(
            auth_state.clone(),
            require_api_key,
        ));

    // OpenAI API routes
    let openai_routes = Router::new()
        .route(
            "/chat/completions",
            post(chat_completions::chat_completions),
        )
        .route("/embeddings", post(embeddings::create_embeddings))
        .route("/rerank", post(rerank::create_rerank))
        .route("/images/generations", post(images::create_image))
        .route("/models", get(models::list_models))
        .route("/models/:model_id", get(models::get_model))
        .route("/usage", get(usage::get_usage_summary))
        .route("/usage/records", get(usage::get_usage_records))
        .layer(middleware::from_fn_with_state(
            rate_limit_state_clone,
            rate_limit,
        ))
        .layer(middleware::from_fn_with_state(
            auth_state_clone,
            require_api_key,
        ));

    // Admin auth state
    let admin_auth_state = AdminAuthState::new(state.settings.clone());

    // Admin API routes (protected by require_admin_key)
    let admin_api_routes = Router::new()
        .route("/status", get(admin::status::get_status))
        // API Keys
        .route("/keys", get(admin::keys::list_keys))
        .route("/keys", post(admin::keys::create_key))
        .route("/keys/:key", put(admin::keys::update_key))
        .route("/keys/:key", delete(admin::keys::delete_key))
        .route("/keys/:key/activate", post(admin::keys::activate_key))
        // Backends
        .route("/backends", get(admin::backends::list_backends))
        .route("/backends", post(admin::backends::create_backend))
        .route("/backends/:name", put(admin::backends::update_backend))
        .route("/backends/:name", delete(admin::backends::delete_backend))
        .route(
            "/backends/:name/toggle",
            put(admin::backends::toggle_backend),
        )
        // Model Mappings
        .route("/mappings", get(admin::mappings::list_mappings))
        .route("/mappings", post(admin::mappings::create_mapping))
        .route(
            "/mappings/:source_model_id/:provider",
            put(admin::mappings::update_mapping),
        )
        .route(
            "/mappings/:source_model_id/:provider",
            delete(admin::mappings::delete_mapping),
        )
        .layer(middleware::from_fn_with_state(
            admin_auth_state,
            require_admin_key,
        ));

    // Admin static file routes (no auth — browser fetches these directly)
    // Assets are served under /admin/assets/* to avoid shadowing /admin/api/*
    let admin_static_routes = Router::new()
        .route("/", get(admin::serve_index))
        .route("/assets/*path", get(admin::serve_asset));

    // Combine all routes
    Router::new()
        .nest("/v1", anthropic_routes)
        .nest("/v1", openai_routes)
        .merge(health_routes)
        .nest("/admin/api", admin_api_routes) // more specific first
        .nest("/admin", admin_static_routes) // broader wildcard second
        .fallback(move |request: Request<Body>| async move { fallback_handler(request) })
        .layer(create_cors_layer())
        .with_state(state)
}

/// Fallback handler for unknown routes
fn fallback_handler<B>(request: Request<B>) -> Response {
    use axum::http::StatusCode;
    use axum::response::IntoResponse;

    if extract_api_key(&request).is_none() {
        (
            StatusCode::UNAUTHORIZED,
            axum::Json(crate::schemas::anthropic::ErrorResponse::new(
                "authentication_error",
                "Missing API key. Include 'x-api-key' or 'Authorization: Bearer <key>' header.",
            )),
        )
            .into_response()
    } else {
        (
            StatusCode::NOT_FOUND,
            axum::Json(crate::schemas::anthropic::ErrorResponse::new(
                "not_found_error",
                "The requested endpoint does not exist.",
            )),
        )
            .into_response()
    }
}

/// Create CORS layer
fn create_cors_layer() -> CorsLayer {
    CorsLayer::new()
        .allow_origin(Any)
        .allow_methods(Any)
        .allow_headers(Any)
        .expose_headers([
            "x-trace-id".parse().unwrap(),
            "x-request-id".parse().unwrap(),
            "retry-after".parse().unwrap(),
        ])
}
