//! OpenAI Responses API endpoint (`POST /v1/responses`) — Codex CLI compatible.
//!
//! one-router has no Responses-native backend, so it translates:
//!   Responses request → ChatCompletionRequest → existing 4-backend chat pipeline
//!   → ChatCompletionResponse → Responses response.
//! Hosted `web_search` requests take a separate branch through the Anthropic
//! `WebToolExecutor` (see [`handle_web_search`]).
//!
//! Streaming is **replay-based**: the full answer is computed non-streaming, then
//! emitted as the Responses SSE event sequence — each frame carries an
//! `event: <type>` line and a `sequence_number`, which strict clients (Codex)
//! require.

use axum::{
    extract::{Path, State},
    http::HeaderMap,
    response::{sse::Event, IntoResponse, Response, Sse},
    Json,
};
use std::convert::Infallible;
use std::pin::Pin;

use futures::stream::Stream;

use crate::api::chat_completions::{dispatch_chat, ChatCompletionApiResponse, OpenAIApiError};
use crate::converters::responses_chat::{
    chat_messages_to_stored, chat_response_to_responses, responses_to_chat_request,
    stored_to_chat_messages,
};
use crate::middleware::auth::ApiKeyInfo;
use crate::schemas::responses::{
    generate_response_id, ResponsesInput, ResponsesRequest, ResponsesResponse,
};
use crate::server::state::AppState;
use crate::services::responses_context::ResponsesContextError;

type SseStream = Pin<Box<dyn Stream<Item = Result<Event, Infallible>> + Send>>;

/// JSON or SSE response for the Responses API.
pub enum ResponsesApiResponse {
    Json(Box<ResponsesResponse>),
    Stream(SseStream),
}

impl IntoResponse for ResponsesApiResponse {
    fn into_response(self) -> Response {
        match self {
            ResponsesApiResponse::Json(resp) => Json(*resp).into_response(),
            ResponsesApiResponse::Stream(stream) => Sse::new(stream).into_response(),
        }
    }
}

/// Derive the owner identifier from the API key (mirrors PTC ownership).
fn owner_key_hash(key_info: &ApiKeyInfo) -> String {
    if key_info.is_master {
        "__master__".to_string()
    } else {
        key_info.raw_api_key.clone()
    }
}

impl From<ResponsesContextError> for OpenAIApiError {
    fn from(err: ResponsesContextError) -> Self {
        match err {
            ResponsesContextError::NotFound => OpenAIApiError::not_found(err.to_string()),
        }
    }
}

/// POST /v1/responses — create a model response (Responses API).
pub async fn create_response(
    State(state): State<AppState>,
    axum::extract::Extension(key_info): axum::extract::Extension<ApiKeyInfo>,
    headers: HeaderMap,
    Json(request): Json<ResponsesRequest>,
) -> Result<ResponsesApiResponse, OpenAIApiError> {
    let owner = owner_key_hash(&key_info);
    let request_id = uuid::Uuid::new_v4().to_string();

    // Restore prior-turn history (as stored (role, text) pairs) if a
    // previous_response_id was supplied.
    let prev_stored = match &request.previous_response_id {
        Some(prev_id) => state.responses_context.load(prev_id, &owner).await?,
        None => Vec::new(),
    };

    // Hosted web_search takes the Anthropic WebToolExecutor path.
    if crate::converters::responses_chat::is_responses_web_search_request(&request) {
        return handle_web_search(
            &state,
            &request,
            &key_info,
            &owner,
            prev_stored,
            &request_id,
        )
        .await;
    }

    // Main path: Responses → Chat → 4-backend pipeline → Chat response.
    let prev_msgs = stored_to_chat_messages(&prev_stored);
    let mut chat_req = responses_to_chat_request(&request, &prev_msgs);
    chat_req.stream = false; // always non-streaming internally; we replay for SSE
    let stored_input = chat_messages_to_stored(&chat_req.messages);
    let model = request.model.clone();

    let dispatch = dispatch_chat(
        &state,
        chat_req,
        &headers,
        &key_info,
        &request_id,
        std::time::Instant::now(),
    )
    .await?;

    let chat_resp = match dispatch.response {
        ChatCompletionApiResponse::Json(json) => json.0,
        ChatCompletionApiResponse::Stream(_) => {
            return Err(OpenAIApiError::internal_error(
                "internal dispatch returned a stream unexpectedly",
            ))
        }
    };

    // Record usage (protocol = "responses"), splitting cached tokens out.
    record_responses_usage(
        &state,
        &key_info,
        &request_id,
        &model,
        &dispatch.provider,
        &chat_resp.usage,
        dispatch.cache_ttl.as_deref(),
    );

    let response_id = generate_response_id();
    let responses = chat_response_to_responses(
        &chat_resp,
        &model,
        Some(response_id.clone()),
        crate::schemas::openai::current_timestamp(),
    );

    finalize(
        &state,
        &request,
        &owner,
        &response_id,
        stored_input,
        responses,
    )
    .await
}

/// Store context (when `store`) and return either JSON or a replayed SSE stream.
async fn finalize(
    state: &AppState,
    request: &ResponsesRequest,
    owner: &str,
    response_id: &str,
    mut stored_input: Vec<(String, String)>,
    responses: ResponsesResponse,
) -> Result<ResponsesApiResponse, OpenAIApiError> {
    if request.should_store() {
        if !responses.output_text.is_empty() {
            stored_input.push(("assistant".to_string(), responses.output_text.clone()));
        }
        let json = serde_json::to_value(&responses).unwrap_or(serde_json::Value::Null);
        state
            .responses_context
            .save(response_id, owner, stored_input, json)
            .await;
    }

    if request.stream {
        Ok(ResponsesApiResponse::Stream(stream_responses_events(
            responses,
        )))
    } else {
        Ok(ResponsesApiResponse::Json(Box::new(responses)))
    }
}

/// Record usage under the `responses` protocol tag.
#[allow(clippy::too_many_arguments)]
fn record_responses_usage(
    state: &AppState,
    key_info: &ApiKeyInfo,
    request_id: &str,
    model: &str,
    provider: &str,
    usage: &crate::schemas::openai::CompletionUsage,
    cache_ttl: Option<&str>,
) {
    let mut anth_usage = crate::schemas::anthropic::Usage::new(
        usage.uncached_prompt_tokens(),
        usage.completion_tokens,
    );
    let cached = usage.cached_tokens();
    if cached > 0 {
        anth_usage.cache_read_input_tokens = Some(cached);
    }
    let tracker = state.usage_tracker.clone();
    let key_info = key_info.clone();
    let request_id = request_id.to_string();
    let model = model.to_string();
    let provider = provider.to_string();
    let cache_ttl = cache_ttl.map(|s| s.to_string());
    tokio::spawn(async move {
        if let Err(e) = tracker
            .record_usage(
                &key_info,
                &request_id,
                &model,
                &anth_usage,
                true,
                &provider,
                "responses",
                cache_ttl.as_deref(),
            )
            .await
        {
            tracing::warn!(error = %e, "Failed to record responses usage");
        }
    });
}

/// Build the ordered Responses SSE event sequence for a completed response as
/// `(event_type, payload)` pairs. Each payload carries an auto-incrementing
/// `sequence_number`. Pure and testable — [`stream_responses_events`] wraps
/// these into SSE `Event`s. Codex CLI keys off the event type of every frame.
pub(crate) fn build_responses_events(
    response: &ResponsesResponse,
) -> Vec<(String, serde_json::Value)> {
    let mut events: Vec<(String, serde_json::Value)> = Vec::new();
    let mut push = |event_type: &str, mut payload: serde_json::Value| {
        payload["sequence_number"] = serde_json::json!(events.len());
        events.push((event_type.to_string(), payload));
    };

    let response_value = serde_json::to_value(response).unwrap_or(serde_json::Value::Null);
    let stub = serde_json::json!({
        "id": response.id,
        "object": response.object,
        "created_at": response.created_at,
        "status": "in_progress",
        "model": response.model,
    });

    push(
        "response.created",
        serde_json::json!({"type": "response.created", "response": stub}),
    );

    for (index, item) in response.output.iter().enumerate() {
        let is_message = item.get("type").and_then(|t| t.as_str()) == Some("message");

        // output_item.added — for messages, mark in_progress with empty content.
        let added_item = if is_message {
            let mut m = item.clone();
            m["status"] = serde_json::json!("in_progress");
            m["content"] = serde_json::json!([]);
            m
        } else {
            item.clone()
        };
        push(
            "response.output_item.added",
            serde_json::json!({
                "type": "response.output_item.added",
                "output_index": index,
                "item": added_item,
            }),
        );

        if is_message {
            let item_id = item
                .get("id")
                .and_then(|v| v.as_str())
                .unwrap_or("")
                .to_string();
            if let Some(part) = item
                .get("content")
                .and_then(|c| c.as_array())
                .and_then(|parts| parts.first())
            {
                let text = part.get("text").and_then(|t| t.as_str()).unwrap_or("");
                push(
                    "response.content_part.added",
                    serde_json::json!({
                        "type": "response.content_part.added",
                        "item_id": item_id,
                        "output_index": index,
                        "content_index": 0,
                        "part": {"type": "output_text", "text": "", "annotations": []},
                    }),
                );
                if !text.is_empty() {
                    push(
                        "response.output_text.delta",
                        serde_json::json!({
                            "type": "response.output_text.delta",
                            "item_id": item_id,
                            "output_index": index,
                            "content_index": 0,
                            "delta": text,
                        }),
                    );
                    push(
                        "response.output_text.done",
                        serde_json::json!({
                            "type": "response.output_text.done",
                            "item_id": item_id,
                            "output_index": index,
                            "content_index": 0,
                            "text": text,
                        }),
                    );
                }
                push(
                    "response.content_part.done",
                    serde_json::json!({
                        "type": "response.content_part.done",
                        "item_id": item_id,
                        "output_index": index,
                        "content_index": 0,
                        "part": part,
                    }),
                );
            }
        }

        push(
            "response.output_item.done",
            serde_json::json!({
                "type": "response.output_item.done",
                "output_index": index,
                "item": item,
            }),
        );
    }

    push(
        "response.completed",
        serde_json::json!({"type": "response.completed", "response": response_value}),
    );

    events
}

/// Replay a completed `ResponsesResponse` as the Responses SSE event sequence.
/// Every frame carries an `event: <type>` line and a `sequence_number` — Codex
/// CLI rejects streams without them.
pub(crate) fn stream_responses_events(response: ResponsesResponse) -> SseStream {
    let events = build_responses_events(&response);
    Box::pin(async_stream::stream! {
        for (event_type, payload) in events {
            yield Ok(Event::default().event(event_type).data(payload.to_string()));
        }
    })
}

/// Hosted web_search branch — runs the Anthropic `WebToolExecutor` agentic loop
/// (Bedrock/Gemini), then synthesizes a Responses response. Streaming replays the
/// completed result as Responses SSE events (Codex-compatible).
async fn handle_web_search(
    state: &AppState,
    request: &ResponsesRequest,
    key_info: &ApiKeyInfo,
    owner: &str,
    prev_stored: Vec<(String, String)>,
    request_id: &str,
) -> Result<ResponsesApiResponse, OpenAIApiError> {
    use crate::converters::responses_chat::{
        message_response_to_responses, responses_to_message_request,
    };

    // Resolve the model to pick the provider + target model id.
    let resolved = state
        .model_mapping
        .resolve(&request.model)
        .await
        .map_err(|_| {
            OpenAIApiError::bad_request(format!(
                "Model '{}' is not supported. Check model_mappings configuration.",
                request.model
            ))
        })?;

    // web tools only run proxy-side for Bedrock/Gemini (Anthropic/OpenAI support
    // them natively, but those are not reachable from this hosted-tool path).
    if !matches!(resolved.provider.as_str(), "bedrock" | "gemini") {
        return Err(OpenAIApiError::bad_request(format!(
            "hosted web_search is only supported for bedrock/gemini providers, not '{}'",
            resolved.provider
        )));
    }

    let message_req = responses_to_message_request(request, &prev_stored);

    let dynamic = state.dynamic.read().await;
    let executor = dynamic.web_tool_executor.clone().ok_or_else(|| {
        OpenAIApiError::bad_request("web_search requires web_search_provider to be configured")
    })?;
    let backend: std::sync::Arc<dyn crate::services::web_tools::executor::WebToolBackend> =
        match resolved.provider.as_str() {
            "gemini" => {
                let pool = dynamic.gemini_pool.clone().ok_or_else(|| {
                    OpenAIApiError::internal_error("Gemini backend not configured")
                })?;
                let instance = pool.get_next().ok_or_else(|| {
                    OpenAIApiError::internal_error("No healthy Gemini backend available")
                })?;
                std::sync::Arc::new(crate::services::web_tools::executor::GeminiWebToolBackend {
                    service: instance.service.clone(),
                })
            }
            _ => dynamic
                .bedrock
                .clone()
                .ok_or_else(|| OpenAIApiError::internal_error("Bedrock backend not configured"))?
                as std::sync::Arc<dyn crate::services::web_tools::executor::WebToolBackend>,
        };
    drop(dynamic);

    let message_resp = executor
        .run(&message_req, backend.as_ref(), &resolved.target_model_id)
        .await
        .map_err(|e| OpenAIApiError::internal_error(e.to_string()))?;

    // Record usage (protocol = "responses").
    let usage = message_resp.usage.clone();
    {
        let tracker = state.usage_tracker.clone();
        let key_info = key_info.clone();
        let req_id = request_id.to_string();
        let model = request.model.clone();
        let provider = resolved.provider.clone();
        tokio::spawn(async move {
            if let Err(e) = tracker
                .record_usage(
                    &key_info,
                    &req_id,
                    &model,
                    &usage,
                    true,
                    &provider,
                    "responses",
                    None,
                )
                .await
            {
                tracing::warn!(error = %e, "Failed to record responses web_search usage");
            }
        });
    }

    let response_id = generate_response_id();
    let responses = message_response_to_responses(
        &message_resp,
        &request.model,
        Some(response_id.clone()),
        crate::schemas::openai::current_timestamp(),
    );

    // Store the plain-text conversation for continuation: prior turns + this
    // turn's user input. `finalize` appends the assistant reply.
    let mut stored = prev_stored;
    if let Some(ResponsesInput::Text(t)) = &request.input {
        stored.push(("user".to_string(), t.clone()));
    }

    finalize(state, request, owner, &response_id, stored, responses).await
}

/// GET /v1/responses/{id} — return a stored response object (owner-validated).
pub async fn get_response(
    State(state): State<AppState>,
    axum::extract::Extension(key_info): axum::extract::Extension<ApiKeyInfo>,
    Path(response_id): Path<String>,
) -> Result<Json<serde_json::Value>, OpenAIApiError> {
    let owner = owner_key_hash(&key_info);
    let json = state
        .responses_context
        .get_response_json(&response_id, &owner)
        .await?;
    Ok(Json(json))
}

/// DELETE /v1/responses/{id} — delete a stored response (owner-validated).
pub async fn delete_response(
    State(state): State<AppState>,
    axum::extract::Extension(key_info): axum::extract::Extension<ApiKeyInfo>,
    Path(response_id): Path<String>,
) -> Result<Json<serde_json::Value>, OpenAIApiError> {
    let owner = owner_key_hash(&key_info);
    state.responses_context.delete(&response_id, &owner).await?;
    Ok(Json(serde_json::json!({
        "id": response_id,
        "object": "response.deleted",
        "deleted": true,
    })))
}

/// POST /v1/responses/{id}/cancel — Responses are produced synchronously
/// (replay-based streaming), so there is never a background job to cancel. If
/// the response exists and belongs to the caller, return it as-is (already
/// completed); otherwise 404.
pub async fn cancel_response(
    State(state): State<AppState>,
    axum::extract::Extension(key_info): axum::extract::Extension<ApiKeyInfo>,
    Path(response_id): Path<String>,
) -> Result<Json<serde_json::Value>, OpenAIApiError> {
    let owner = owner_key_hash(&key_info);
    let json = state
        .responses_context
        .get_response_json(&response_id, &owner)
        .await?;
    Ok(Json(json))
}

/// GET /v1/responses/{id}/input_items — list the input items (conversation
/// messages) stored for a response (owner-validated).
pub async fn list_input_items(
    State(state): State<AppState>,
    axum::extract::Extension(key_info): axum::extract::Extension<ApiKeyInfo>,
    Path(response_id): Path<String>,
) -> Result<Json<serde_json::Value>, OpenAIApiError> {
    let owner = owner_key_hash(&key_info);
    let messages = state.responses_context.load(&response_id, &owner).await?;
    let data: Vec<serde_json::Value> = messages
        .into_iter()
        .map(|(role, text)| {
            let part_type = if role == "assistant" {
                "output_text"
            } else {
                "input_text"
            };
            serde_json::json!({
                "type": "message",
                "role": role,
                "content": [{"type": part_type, "text": text}],
            })
        })
        .collect();
    Ok(Json(serde_json::json!({
        "object": "list",
        "data": data,
        "has_more": false,
    })))
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::schemas::responses::{ResponsesResponse, ResponsesUsage};

    fn sample_response(text: &str) -> ResponsesResponse {
        ResponsesResponse {
            id: "resp_test".to_string(),
            object: "response".to_string(),
            created_at: 1_700_000_000,
            status: "completed".to_string(),
            model: "gpt-test".to_string(),
            output: vec![serde_json::json!({
                "id": "msg_test",
                "type": "message",
                "role": "assistant",
                "status": "completed",
                "content": [{"type": "output_text", "text": text, "annotations": []}],
            })],
            output_text: text.to_string(),
            usage: ResponsesUsage {
                input_tokens: 1,
                output_tokens: 1,
                total_tokens: 2,
                input_tokens_details: None,
                output_tokens_details: None,
            },
        }
    }

    #[test]
    fn test_event_sequence_order_and_names() {
        let resp = sample_response("hello world");
        let events = build_responses_events(&resp);
        let names: Vec<&str> = events.iter().map(|(t, _)| t.as_str()).collect();
        assert_eq!(
            names,
            vec![
                "response.created",
                "response.output_item.added",
                "response.content_part.added",
                "response.output_text.delta",
                "response.output_text.done",
                "response.content_part.done",
                "response.output_item.done",
                "response.completed",
            ]
        );
    }

    #[test]
    fn test_sequence_numbers_are_monotonic() {
        let resp = sample_response("hi");
        let events = build_responses_events(&resp);
        for (i, (_, payload)) in events.iter().enumerate() {
            assert_eq!(
                payload["sequence_number"].as_u64(),
                Some(i as u64),
                "sequence_number must equal frame index"
            );
        }
    }

    #[test]
    fn test_every_frame_carries_matching_type() {
        // Codex keys off the SSE `event:` line, which mirrors payload["type"].
        let resp = sample_response("hi");
        for (event_type, payload) in build_responses_events(&resp) {
            assert_eq!(
                payload["type"].as_str(),
                Some(event_type.as_str()),
                "payload.type must match the SSE event name"
            );
        }
    }

    #[test]
    fn test_delta_carries_full_text() {
        let resp = sample_response("full answer");
        let events = build_responses_events(&resp);
        let delta = events
            .iter()
            .find(|(t, _)| t == "response.output_text.delta")
            .expect("delta event present");
        assert_eq!(delta.1["delta"].as_str(), Some("full answer"));
    }

    #[test]
    fn test_empty_text_skips_delta() {
        // A message with empty text must not emit delta/done text frames, but
        // still brackets with content_part.added/done.
        let resp = sample_response("");
        let names: Vec<String> = build_responses_events(&resp)
            .into_iter()
            .map(|(t, _)| t)
            .collect();
        assert!(!names.iter().any(|t| t == "response.output_text.delta"));
        assert!(names.iter().any(|t| t == "response.content_part.added"));
        assert!(names.iter().any(|t| t == "response.content_part.done"));
    }
}
