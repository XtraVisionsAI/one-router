//! Shared helpers for the key / user admin handlers.

use axum::{
    http::{HeaderValue, StatusCode},
    response::{IntoResponse, Response},
    Json,
};
use serde::Deserialize;

use crate::schemas::anthropic::ErrorResponse;

/// Serialized `metadata` must stay under this size.
pub const MAX_METADATA_BYTES: usize = 4096;

pub type HandlerError = Box<Response>;

pub fn error_response(
    status: StatusCode,
    error_type: &str,
    message: impl Into<String>,
) -> Response {
    (status, Json(ErrorResponse::new(error_type, message.into()))).into_response()
}

pub fn bad_request(message: impl Into<String>) -> HandlerError {
    Box::new(error_response(
        StatusCode::BAD_REQUEST,
        "invalid_request_error",
        message,
    ))
}

pub fn not_found(message: impl Into<String>) -> HandlerError {
    Box::new(error_response(
        StatusCode::NOT_FOUND,
        "not_found_error",
        message,
    ))
}

pub fn conflict(message: impl Into<String>) -> HandlerError {
    Box::new(error_response(
        StatusCode::CONFLICT,
        "conflict_error",
        message,
    ))
}

pub fn internal_error(context: &str, e: &anyhow::Error) -> HandlerError {
    tracing::error!(error = %e, "{context}");
    Box::new(error_response(
        StatusCode::INTERNAL_SERVER_ERROR,
        "api_error",
        context,
    ))
}

/// Mark a response as using a deprecated form of the API.
pub fn deprecated(mut resp: Response) -> Response {
    resp.headers_mut()
        .insert("deprecation", HeaderValue::from_static("true"));
    resp
}

/// True for a unique-constraint violation mentioning `column` (SQLite /
/// Postgres wording, and the DynamoDB backend's emulated message).
pub fn is_unique_error(e: &anyhow::Error, column: &str) -> bool {
    let msg = e.to_string().to_lowercase();
    (msg.contains("unique constraint failed") && msg.contains(column))
        || msg.contains("duplicate key value violates unique constraint")
}

/// Deserialize a field that can be absent (don't touch), null (clear), or a value (set).
/// - Field absent in JSON → `None` (do not change the existing value)
/// - Field present as `null` → `Some(None)` (clear the value)
/// - Field present as a value → `Some(Some(value))` (set to value)
pub fn deserialize_optional_field<'de, T, D>(d: D) -> Result<Option<Option<T>>, D::Error>
where
    T: serde::de::DeserializeOwned,
    D: serde::de::Deserializer<'de>,
{
    Ok(Some(Option::deserialize(d)?))
}

/// Validate and serialize `metadata` (JSON object, ≤ 4 KB).
pub fn encode_metadata(value: &serde_json::Value) -> Result<String, HandlerError> {
    if !value.is_object() {
        return Err(bad_request("metadata must be a JSON object"));
    }
    let s = value.to_string();
    if s.len() > MAX_METADATA_BYTES {
        return Err(bad_request(format!(
            "metadata must be at most {MAX_METADATA_BYTES} bytes when serialized"
        )));
    }
    Ok(s)
}

pub fn decode_metadata(raw: Option<&str>) -> Option<serde_json::Value> {
    raw.and_then(|m| serde_json::from_str(m).ok())
}

/// Validate an `allowed_models` pattern list (same rules as backend `models`).
/// An empty list is normalized to `None` (unrestricted).
pub fn validate_allowed_models(
    patterns: Option<Vec<String>>,
) -> Result<Option<Vec<String>>, HandlerError> {
    let Some(patterns) = patterns.filter(|p| !p.is_empty()) else {
        return Ok(None);
    };
    let problems = crate::services::backend_pool::model_filter::validate_patterns(&patterns);
    if !problems.is_empty() {
        return Err(bad_request(format!(
            "invalid allowed_models: {}",
            problems.join("; ")
        )));
    }
    Ok(Some(
        patterns.iter().map(|p| p.trim().to_string()).collect(),
    ))
}

/// `Some(n)` must be a positive integer; `None` passes.
pub fn validate_positive(field: &str, value: Option<i32>) -> Result<(), HandlerError> {
    if value.is_some_and(|v| v <= 0) {
        return Err(bad_request(format!(
            "{field} must be a positive integer (use null for none)"
        )));
    }
    Ok(())
}

pub fn validate_non_negative(field: &str, value: Option<f64>) -> Result<(), HandlerError> {
    if value.is_some_and(|v| !v.is_finite() || v < 0.0) {
        return Err(bad_request(format!("{field} must be >= 0")));
    }
    Ok(())
}

pub fn validate_name(name: &str) -> Result<(), HandlerError> {
    if name.trim().is_empty() {
        return Err(bad_request("name must not be empty"));
    }
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn metadata_must_be_small_object() {
        assert!(encode_metadata(&serde_json::json!({"a": 1})).is_ok());
        assert!(encode_metadata(&serde_json::json!([1, 2])).is_err());
        assert!(encode_metadata(&serde_json::json!("x")).is_err());
        let big = serde_json::json!({"a": "x".repeat(MAX_METADATA_BYTES)});
        assert!(encode_metadata(&big).is_err());
    }

    #[test]
    fn allowed_models_validation() {
        assert_eq!(validate_allowed_models(None).unwrap(), None);
        assert_eq!(validate_allowed_models(Some(vec![])).unwrap(), None);
        assert_eq!(
            validate_allowed_models(Some(vec![" claude-* ".into()])).unwrap(),
            Some(vec!["claude-*".to_string()])
        );
        assert!(validate_allowed_models(Some(vec!["!".into()])).is_err());
        assert!(validate_allowed_models(Some(vec!["a".into(), "!a".into()])).is_err());
    }

    #[test]
    fn numeric_validation() {
        assert!(validate_positive("x", None).is_ok());
        assert!(validate_positive("x", Some(1)).is_ok());
        assert!(validate_positive("x", Some(0)).is_err());
        assert!(validate_non_negative("b", Some(0.0)).is_ok());
        assert!(validate_non_negative("b", Some(-1.0)).is_err());
        assert!(validate_non_negative("b", Some(f64::NAN)).is_err());
    }
}
