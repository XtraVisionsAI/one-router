//! Model allowlist enforcement (key ∩ user `allowed_models`).
//!
//! Runs after auth on every `/v1/*` business route. Only callers that actually
//! have an allowlist pay anything: their JSON body is buffered once to read the
//! top-level `model` (the client-facing **source** model id, before
//! `model_mappings` resolution — the name admins and users both see).
//!
//! **Fail closed** for restricted callers on model-bearing endpoints: a body
//! that is not a JSON object, has no string `model`, or carries the top-level
//! `model` key more than once is rejected with 400 — handlers parse the body
//! with different deserializers (typed structs reject duplicates, `Value`
//! keeps the last one), so an ambiguous body must never reach them.
//! Failover targets are not re-checked (failover is gateway-internal).

use std::fmt;

use axum::{
    body::{to_bytes, Body},
    extract::State,
    http::{Request, StatusCode},
    middleware::Next,
    response::{IntoResponse, Response},
    Json,
};
use serde::de::{self, Deserializer, IgnoredAny, MapAccess, Visitor};

use crate::middleware::auth::ApiKeyInfo;
use crate::schemas::anthropic::ErrorResponse;
use crate::schemas::openai::OpenAIErrorResponse;

#[derive(Clone)]
pub struct ModelAccessState {
    /// Upper bound for buffering (the router-wide body limit).
    pub max_body_bytes: usize,
}

/// Outcome of scanning a body's top level for `model`.
#[derive(Debug, PartialEq, Eq)]
enum TopLevelModel {
    Model(String),
    Missing,
}

/// Top-level `model` extractor that errors on duplicates / non-string values
/// instead of silently picking one occurrence.
struct ModelScan(TopLevelModel);

impl<'de> de::Deserialize<'de> for ModelScan {
    fn deserialize<D: Deserializer<'de>>(d: D) -> Result<Self, D::Error> {
        struct V;
        impl<'de> Visitor<'de> for V {
            type Value = ModelScan;
            fn expecting(&self, f: &mut fmt::Formatter) -> fmt::Result {
                f.write_str("a JSON object")
            }
            fn visit_map<A: MapAccess<'de>>(self, mut map: A) -> Result<ModelScan, A::Error> {
                let mut model: Option<String> = None;
                // `String` keys: escapes are decoded, so `"model"` is `model`.
                while let Some(key) = map.next_key::<String>()? {
                    if key == "model" {
                        if model.is_some() {
                            return Err(de::Error::custom("duplicate top-level field `model`"));
                        }
                        model = Some(map.next_value::<String>()?);
                    } else {
                        map.next_value::<IgnoredAny>()?;
                    }
                }
                Ok(ModelScan(match model {
                    Some(m) => TopLevelModel::Model(m),
                    None => TopLevelModel::Missing,
                }))
            }
        }
        d.deserialize_map(V)
    }
}

fn scan_model(bytes: &[u8]) -> Result<TopLevelModel, String> {
    serde_json::from_slice::<ModelScan>(bytes)
        .map(|s| s.0)
        .map_err(|e| e.to_string())
}

/// Strip the `/v1` nest prefix (nested routers see the stripped path, but be
/// robust to either form).
fn route_path(path: &str) -> &str {
    path.strip_prefix("/v1").unwrap_or(path)
}

fn is_anthropic_path(path: &str) -> bool {
    route_path(path).starts_with("/messages")
}

/// POST endpoints whose body selects a model. Other POSTs (e.g.
/// `/v1/responses/:id/cancel`) carry no model and pass through.
fn is_model_endpoint(path: &str) -> bool {
    matches!(
        route_path(path).trim_end_matches('/'),
        "/messages"
            | "/messages/count_tokens"
            | "/chat/completions"
            | "/responses"
            | "/embeddings"
            | "/rerank"
            | "/images/generations"
    )
}

fn error_response(path: &str, status: StatusCode, kind: &str, message: String) -> Response {
    if is_anthropic_path(path) {
        (status, Json(ErrorResponse::new(kind, message))).into_response()
    } else {
        let code = if status == StatusCode::FORBIDDEN {
            "model_not_allowed"
        } else {
            "invalid_model"
        };
        (
            status,
            Json(OpenAIErrorResponse::with_code(kind, &message, code)),
        )
            .into_response()
    }
}

/// 403 in the input protocol's error format.
fn forbidden(path: &str, model: &str) -> Response {
    error_response(
        path,
        StatusCode::FORBIDDEN,
        "permission_error",
        format!("Model '{model}' is not allowed for this API key"),
    )
}

/// 400 for a body whose model cannot be determined unambiguously.
fn ambiguous(path: &str, detail: &str) -> Response {
    error_response(
        path,
        StatusCode::BAD_REQUEST,
        "invalid_request_error",
        format!("A single top-level string 'model' field is required: {detail}"),
    )
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
    if !restricted
        || request.method() != axum::http::Method::POST
        || !is_model_endpoint(request.uri().path())
    {
        return next.run(request).await;
    }

    let (parts, body) = request.into_parts();
    let path = parts.uri.path().to_string();
    let bytes = match to_bytes(body, state.max_body_bytes).await {
        Ok(b) => b,
        Err(_) => {
            return error_response(
                &path,
                StatusCode::PAYLOAD_TOO_LARGE,
                "request_too_large",
                "Request body exceeds the configured size limit".to_string(),
            )
        }
    };

    let model = match scan_model(&bytes) {
        Ok(TopLevelModel::Model(m)) => m,
        Ok(TopLevelModel::Missing) => {
            crate::observability::metrics::record_auth_failure("model_not_allowed");
            return ambiguous(&path, "missing field `model`");
        }
        Err(e) => {
            crate::observability::metrics::record_auth_failure("model_not_allowed");
            return ambiguous(&path, &e);
        }
    };
    let allowed = parts
        .extensions
        .get::<ApiKeyInfo>()
        .is_none_or(|k| k.allows_model(&model));
    if !allowed {
        crate::observability::metrics::record_auth_failure("model_not_allowed");
        return forbidden(&path, &model);
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
        assert_eq!(
            ambiguous("/messages", "x").status(),
            StatusCode::BAD_REQUEST
        );
    }

    #[test]
    fn scan_extracts_single_model() {
        assert_eq!(
            scan_model(br#"{"input":[{"model":"x"}],"model":"a"}"#).unwrap(),
            TopLevelModel::Model("a".into())
        );
        assert_eq!(
            scan_model(br#"{"input":"hi"}"#).unwrap(),
            TopLevelModel::Missing
        );
    }

    #[test]
    fn scan_rejects_duplicate_model() {
        let err = scan_model(br#"{"model":"allowed","model":"forbidden"}"#).unwrap_err();
        assert!(err.contains("duplicate"), "{err}");
        // An escaped spelling of the key is the same key.
        assert!(scan_model(br#"{"model":"a","\u006dodel":"b"}"#).is_err());
    }

    #[test]
    fn scan_rejects_non_string_or_non_object() {
        assert!(scan_model(br#"{"model":null}"#).is_err());
        assert!(scan_model(br#"{"model":["a"]}"#).is_err());
        assert!(scan_model(br#"[]"#).is_err());
        assert!(scan_model(b"not json").is_err());
    }

    #[test]
    fn model_endpoints() {
        for p in [
            "/messages",
            "/v1/messages",
            "/messages/count_tokens",
            "/chat/completions",
            "/responses",
            "/v1/responses",
            "/embeddings",
            "/rerank",
            "/images/generations",
        ] {
            assert!(is_model_endpoint(p), "{p}");
        }
        assert!(!is_model_endpoint("/responses/resp_1/cancel"));
        assert!(!is_model_endpoint("/v1/responses/resp_1/cancel"));
    }
}
