//! Protocol-aware request extractors.
//!
//! Axum's stock [`Json`] extractor answers a malformed or unrecognised body with
//! a plain-text 400/422 (`Failed to deserialize the JSON body …`). Clients of the
//! Anthropic protocol expect the documented error envelope
//! (`{"type":"error","error":{"type":"invalid_request_error","message":…}}`),
//! and Claude Code in particular keys its error classification off that
//! envelope, so `/v1/messages`-family handlers use [`AnthropicJson`] instead.

use axum::{
    async_trait,
    extract::{rejection::JsonRejection, FromRequest, Request},
    Json,
};

use crate::error::ApiError;

/// `Json<T>` whose rejection is rendered as an Anthropic `invalid_request_error`.
pub struct AnthropicJson<T>(pub T);

#[async_trait]
impl<S, T> FromRequest<S> for AnthropicJson<T>
where
    Json<T>: FromRequest<S, Rejection = JsonRejection>,
    S: Send + Sync,
{
    type Rejection = ApiError;

    async fn from_request(req: Request, state: &S) -> Result<Self, Self::Rejection> {
        match Json::<T>::from_request(req, state).await {
            Ok(Json(value)) => Ok(AnthropicJson(value)),
            Err(rejection) => Err(ApiError::InvalidRequest(rejection_message(&rejection))),
        }
    }
}

/// Human-readable reason for a JSON rejection, without axum's status boilerplate.
fn rejection_message(rejection: &JsonRejection) -> String {
    let text = rejection.body_text();
    // axum prefixes serde errors with a fixed phrase; keep only the serde part
    // (it carries the JSON path, e.g. `messages[1].content[0]: …`).
    match text.split_once(": ") {
        Some((prefix, rest)) if prefix.starts_with("Failed to deserialize") => rest.to_string(),
        _ => text,
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::schemas::anthropic::MessageRequest;
    use axum::{
        body::{to_bytes, Body},
        http::{header, Request, StatusCode},
        response::IntoResponse,
    };

    fn json_request(body: &str) -> Request<Body> {
        Request::builder()
            .method("POST")
            .uri("/v1/messages")
            .header(header::CONTENT_TYPE, "application/json")
            .body(Body::from(body.to_string()))
            .unwrap()
    }

    #[tokio::test]
    async fn malformed_body_yields_anthropic_error_envelope() {
        // `max_tokens` as a string is a type error serde reports with a path.
        let req = json_request(r#"{"model":"m","max_tokens":"x","messages":[]}"#);
        let err = AnthropicJson::<MessageRequest>::from_request(req, &())
            .await
            .err()
            .expect("must reject");
        let resp = err.into_response();
        assert_eq!(resp.status(), StatusCode::BAD_REQUEST);
        let bytes = to_bytes(resp.into_body(), usize::MAX).await.unwrap();
        let v: serde_json::Value = serde_json::from_slice(&bytes).unwrap();
        assert_eq!(v["type"], "error");
        assert_eq!(v["error"]["type"], "invalid_request_error");
        let msg = v["error"]["message"].as_str().unwrap();
        assert!(
            msg.contains("max_tokens"),
            "message should carry the JSON path: {msg}"
        );
        assert!(
            !msg.starts_with("Failed to deserialize"),
            "axum prefix stripped: {msg}"
        );
    }

    #[tokio::test]
    async fn malformed_known_block_reports_index_and_cause() {
        let req = json_request(
            r#"{"model":"m","max_tokens":1,"messages":[{"role":"user","content":[{"type":"text"}]}]}"#,
        );
        let err = AnthropicJson::<MessageRequest>::from_request(req, &())
            .await
            .err()
            .expect("must reject");
        let resp = err.into_response();
        let bytes = to_bytes(resp.into_body(), usize::MAX).await.unwrap();
        let v: serde_json::Value = serde_json::from_slice(&bytes).unwrap();
        let msg = v["error"]["message"].as_str().unwrap();
        assert!(
            msg.contains("messages[0].content"),
            "outer path kept: {msg}"
        );
        assert!(msg.contains("block[0]"), "block index kept: {msg}");
        assert!(msg.contains("missing field `text`"), "cause kept: {msg}");
        assert!(!msg.contains("untagged"), "{msg}");
    }

    #[tokio::test]
    async fn unknown_content_block_is_accepted() {
        // A `tool_addition` block (mid-conversation-tool-changes beta) must not be
        // rejected at the extractor; it lands in ContentBlock::Unknown.
        let req = json_request(
            r#"{"model":"m","max_tokens":1,"messages":[{"role":"system","content":[{"type":"tool_addition","tool":{"type":"tool_reference","name":"get_time"}}]}]}"#,
        );
        let AnthropicJson(parsed) = AnthropicJson::<MessageRequest>::from_request(req, &())
            .await
            .expect("unknown block types are preserved, not rejected");
        let blocks = parsed.messages[0].content.clone().into_blocks();
        assert_eq!(blocks[0].unknown_type(), Some("tool_addition"));
    }
}
