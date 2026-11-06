//! Model allowlist enforcement (key ∩ user `allowed_models`).
//!
//! Runs after auth on every `/v1/*` business route. Only callers that actually
//! have an allowlist pay anything: their JSON body is buffered once to read the
//! top-level `model` (the client-facing **source** model id, before
//! `model_mappings` resolution — the name admins and users both see). A body
//! without a `model` field passes through; the handler reports that itself.
//! Failover targets are not re-checked (failover is gateway-internal).

use axum::{
    body::{to_bytes, Body},
    extract::State,
    http::{Request, StatusCode},
    middleware::Next,
    response::{IntoResponse, Response},
    Json,
};
use serde::Deserialize;

use crate::middleware::auth::ApiKeyInfo;
use crate::schemas::anthropic::ErrorResponse;
use crate::schemas::openai::OpenAIErrorResponse;

#[derive(Clone)]
pub struct ModelAccessState {
    /// Upper bound for buffering (the router-wide body limit).
    pub max_body_bytes: usize,
}

#[derive(Deserialize)]
struct ModelOnly {
    model: Option<String>,
}

/// 403 in the input protocol's error format.
fn forbidden(path: &str, model: &str) -> Response {
    let message = format!("Model '{model}' is not allowed for this API key");
    if path.starts_with("/v1/messages") || path.starts_with("/messages") {
        (
            StatusCode::FORBIDDEN,
            Json(ErrorResponse::new("permission_error", message)),
        )
            .into_response()
    } else {
        (
            StatusCode::FORBIDDEN,
            Json(OpenAIErrorResponse::with_code(
                "permission_error",
                &message,
                "model_not_allowed",
            )),
        )
            .into_response()
    }
}

pub async fn enforce_model_allowlist(
    State(state): State<ModelAccessState>,
    request: Request<Body>,
    next: Next,
) -> Response {
    let restricted = request
        .extensions()
        .get::<ApiKeyInfo>()
        .is_some_and(|k| !k.model_filters.is_empty());
    if !restricted || request.method() != axum::http::Method::POST {
        return next.run(request).await;
    }

    let (parts, body) = request.into_parts();
    let bytes = match to_bytes(body, state.max_body_bytes).await {
        Ok(b) => b,
        Err(_) => {
            return (
                StatusCode::PAYLOAD_TOO_LARGE,
                Json(ErrorResponse::new(
                    "request_too_large",
                    "Request body exceeds the configured size limit",
                )),
            )
                .into_response()
        }
    };

    if let Ok(ModelOnly { model: Some(model) }) = serde_json::from_slice::<ModelOnly>(&bytes) {
        let allowed = parts
            .extensions
            .get::<ApiKeyInfo>()
            .is_none_or(|k| k.allows_model(&model));
        if !allowed {
            crate::observability::metrics::record_auth_failure("model_not_allowed");
            return forbidden(parts.uri.path(), &model);
        }
    }

    next.run(Request::from_parts(parts, Body::from(bytes)))
        .await
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn error_format_follows_protocol() {
        let r = forbidden("/v1/messages", "m");
        assert_eq!(r.status(), StatusCode::FORBIDDEN);
        let r = forbidden("/v1/chat/completions", "m");
        assert_eq!(r.status(), StatusCode::FORBIDDEN);
    }
}
