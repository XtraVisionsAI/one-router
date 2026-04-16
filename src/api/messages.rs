//! Messages API endpoint
//!
//! This module implements the POST /v1/messages endpoint for the Anthropic Messages API.
//! Supports Bedrock InvokeModel (Claude), Bedrock Mantle (non-Claude), Gemini, Anthropic passthrough, and OpenAI backend.

use axum::{
    extract::{Extension, State},
    http::{HeaderMap, StatusCode},
    response::{
        sse::{Event, Sse},
        IntoResponse, Response,
    },
    Json,
};
use futures::stream::Stream;
use serde::{Deserialize, Serialize};
use std::convert::Infallible;
use std::sync::Arc;
use std::time::Instant;
use uuid::Uuid;

use crate::converters::{
    AnthropicToGeminiConverter, AnthropicToOpenAIConverter, GeminiToAnthropicConverter,
};
use crate::middleware::auth::ApiKeyInfo;
use crate::schemas::anthropic::{
    ContentBlock, ErrorResponse, MessageContent, MessageRequest, MessageResponse, StopReason,
    SystemContent, ToolResultValue,
};
use crate::server::state::AppState;
use crate::services::{BedrockError, Credential};
use crate::utils::truncate_str;

// ============================================================================
// Error Types
// ============================================================================

/// API error response with HTTP status code
#[derive(Debug)]
pub struct ApiError {
    pub status: StatusCode,
    pub error_type: String,
    pub message: String,
}

impl ApiError {
    pub fn bad_request(message: impl Into<String>) -> Self {
        Self {
            status: StatusCode::BAD_REQUEST,
            error_type: "invalid_request_error".to_string(),
            message: message.into(),
        }
    }

    pub fn unauthorized(message: impl Into<String>) -> Self {
        Self {
            status: StatusCode::UNAUTHORIZED,
            error_type: "authentication_error".to_string(),
            message: message.into(),
        }
    }

    pub fn rate_limited(message: impl Into<String>) -> Self {
        Self {
            status: StatusCode::TOO_MANY_REQUESTS,
            error_type: "rate_limit_error".to_string(),
            message: message.into(),
        }
    }

    pub fn internal_error(message: impl Into<String>) -> Self {
        Self {
            status: StatusCode::INTERNAL_SERVER_ERROR,
            error_type: "api_error".to_string(),
            message: message.into(),
        }
    }

    pub fn service_unavailable(message: impl Into<String>) -> Self {
        Self {
            status: StatusCode::SERVICE_UNAVAILABLE,
            error_type: "overloaded_error".to_string(),
            message: message.into(),
        }
    }

    pub fn from_bedrock_error(err: &BedrockError) -> Self {
        match err {
            BedrockError::Throttled(msg) => Self::rate_limited(msg),
            BedrockError::ValidationError(msg) => Self::bad_request(msg),
            BedrockError::ModelNotFound(msg) => {
                Self::bad_request(format!("Model not found: {msg}"))
            }
            BedrockError::AccessDenied(msg) => Self::unauthorized(msg),
            BedrockError::ServiceUnavailable(msg) => Self::service_unavailable(msg),
            BedrockError::InternalError(msg) => Self::internal_error(msg),
            BedrockError::Serialization(msg) => {
                Self::bad_request(format!("Serialization error: {msg}"))
            }
            BedrockError::Deserialization(msg) => {
                Self::internal_error(format!("Response error: {msg}"))
            }
            BedrockError::ApiError { message, .. } => Self::internal_error(message),
            BedrockError::Unknown(msg) => Self::internal_error(msg),
        }
    }
}

impl IntoResponse for ApiError {
    fn into_response(self) -> Response {
        let error_response = ErrorResponse::new(&self.error_type, &self.message);
        (self.status, Json(error_response)).into_response()
    }
}

// ============================================================================
// Streaming Response Type
// ============================================================================

/// Type alias for SSE event streams used across all handlers.
type SseStream = std::pin::Pin<Box<dyn Stream<Item = Result<Event, Infallible>> + Send>>;

/// Enum to represent either a JSON response or an SSE stream
#[allow(clippy::large_enum_variant)]
pub enum MessageApiResponse {
    Json(Json<MessageResponse>),
    Stream(SseStream),
}

impl IntoResponse for MessageApiResponse {
    fn into_response(self) -> Response {
        match self {
            MessageApiResponse::Json(json) => json.into_response(),
            MessageApiResponse::Stream(stream) => Sse::new(stream).into_response(),
        }
    }
}

// ============================================================================
// Handler Implementation
// ============================================================================

/// POST /v1/messages - Create a message
///
/// This endpoint accepts Anthropic Messages API requests, converts them to Bedrock or Gemini format,
/// calls the appropriate backend API, and returns the response in Anthropic format.
///
/// Supports both streaming and non-streaming responses.
pub async fn create_message(
    State(state): State<AppState>,
    Extension(key_info): Extension<ApiKeyInfo>,
    headers: HeaderMap,
    Json(request): Json<MessageRequest>,
) -> Result<MessageApiResponse, ApiError> {
    let start_time = Instant::now();
    let request_id = Uuid::new_v4().to_string();

    // Resolve model via data-driven routing
    let resolved = match state.model_mapping.resolve(&request.model).await {
        Ok(r) => r,
        Err(_) => {
            return Err(ApiError::bad_request(format!(
                "Model '{}' is not supported. Check model_mappings configuration.",
                request.model
            )))
        }
    };

    tracing::info!(
        request_id = %request_id,
        model = %request.model,
        target_model = %resolved.target_model_id,
        provider = %resolved.provider,
        message_count = request.messages.len(),
        max_tokens = request.max_tokens,
        stream = request.stream,
        "Processing messages request"
    );

    // Print prompts if enabled (for debugging)
    if std::env::var("PRINT_PROMPTS")
        .map(|v| v == "true" || v == "1")
        .unwrap_or(false)
    {
        print_request_prompts(&request_id, &request);
    }

    // Extract beta headers for feature flags
    let beta_header = headers
        .get("anthropic-beta")
        .and_then(|v| v.to_str().ok())
        .map(|s| s.to_string());

    // PTC detection: check before normal routing
    if let Some(ref ptc_svc) = state.ptc_service {
        if ptc_svc.is_ptc_request(&request, beta_header.as_deref()) {
            tracing::info!(request_id, "Detected PTC request");

            let ptc_result = if let Some(ref container_id) = request.container {
                crate::api::ptc_handler::handle_ptc_continuation(
                    &state,
                    &request,
                    &resolved.target_model_id,
                    &request_id,
                    container_id,
                )
                .await
            } else {
                crate::api::ptc_handler::handle_ptc_request(
                    &state,
                    &request,
                    &resolved.target_model_id,
                    &request_id,
                )
                .await
            };

            let response = ptc_result?;

            // Record usage
            let usage = response.usage.clone();
            let tracker = state.usage_tracker.clone();
            let key = key_info.clone();
            let model = request.model.clone();
            let rid = request_id.clone();
            let provider = resolved.provider.clone();
            tokio::spawn(async move {
                if let Err(e) = tracker
                    .record_usage(&key, &rid, &model, &usage, true, &provider, "anthropic")
                    .await
                {
                    tracing::warn!(error = %e, "Failed to record PTC usage");
                }
            });

            return Ok(MessageApiResponse::Json(Json(response)));
        }
    }

    // Route to appropriate backend based on resolved provider
    let default_capabilities = state.dynamic.read().await.default_capabilities.clone();
    let effective_caps = resolved
        .capabilities
        .as_ref()
        .unwrap_or(&default_capabilities);
    let filtered_request =
        crate::converters::capability_filter::apply_capabilities(&request, effective_caps);

    // Build usage tracking context for handlers
    let stream_usage = Arc::new(tokio::sync::Mutex::new(StreamUsage::default()));
    let usage_ctx = UsageContext {
        tracker: state.usage_tracker.clone(),
        key_info: key_info.clone(),
        model: request.model.clone(),
        request_id: request_id.clone(),
        provider: resolved.provider.clone(),
        stream_usage: stream_usage.clone(),
    };

    let result = match resolved.provider.as_str() {
        "gemini" => {
            handle_gemini_request(
                &state,
                &filtered_request,
                &request_id,
                &usage_ctx,
                start_time,
            )
            .await
        }
        "anthropic" => {
            handle_anthropic_passthrough(
                &state,
                &filtered_request,
                &resolved.target_model_id,
                &request_id,
                &headers,
                &usage_ctx,
                start_time,
            )
            .await
        }
        "openai" => {
            handle_openai_backend(
                &state,
                &filtered_request,
                &resolved.target_model_id,
                &request_id,
                &usage_ctx,
                start_time,
            )
            .await
        }
        _ => {
            let prompt_cache_mode = state.dynamic.read().await.prompt_cache_mode.clone();
            handle_bedrock_request(
                &state,
                &filtered_request,
                &resolved.target_model_id,
                &request_id,
                &prompt_cache_mode,
                key_info.cache_ttl.as_deref(),
                &usage_ctx,
                start_time,
            )
            .await
        }
    };

    // Record usage for non-streaming responses; wrap streams for deferred recording
    match result {
        Ok(MessageApiResponse::Json(ref json_resp)) => {
            let usage = json_resp.usage.clone();
            let ctx = usage_ctx;
            tokio::spawn(async move {
                if let Err(e) = ctx
                    .tracker
                    .record_usage(
                        &ctx.key_info,
                        &ctx.request_id,
                        &ctx.model,
                        &usage,
                        true,
                        &ctx.provider,
                        "anthropic",
                    )
                    .await
                {
                    tracing::warn!(error = %e, "Failed to record usage");
                }
            });
            result
        }
        Ok(MessageApiResponse::Stream(stream)) => {
            let wrapped = wrap_stream_with_usage_recording(
                stream,
                stream_usage,
                state.usage_tracker.clone(),
                key_info.clone(),
                request.model.clone(),
                request_id,
                resolved.provider.clone(),
                "anthropic",
            );
            Ok(MessageApiResponse::Stream(wrapped))
        }
        Err(_) => result,
    }
}

/// Shared state for streaming usage — handlers write, entry wrapper reads.
#[derive(Debug, Default, Clone)]
pub struct StreamUsage {
    pub input_tokens: i32,
    pub output_tokens: i32,
    pub cache_creation_input_tokens: Option<i32>,
    pub cache_read_input_tokens: Option<i32>,
}

/// Context for recording usage, passed to handlers for streaming usage tracking.
#[derive(Clone)]
struct UsageContext {
    tracker: Arc<crate::services::UsageTracker>,
    key_info: ApiKeyInfo,
    model: String,
    request_id: String,
    provider: String,
    /// Shared state for streaming usage — handlers write, entry wrapper reads.
    stream_usage: Arc<tokio::sync::Mutex<StreamUsage>>,
}

/// Wrap an SSE stream so that after the inner stream completes, usage is
/// read from the shared `StreamUsage` state and recorded via the tracker.
#[allow(clippy::too_many_arguments)]
fn wrap_stream_with_usage_recording(
    inner: SseStream,
    usage: Arc<tokio::sync::Mutex<StreamUsage>>,
    tracker: Arc<crate::services::UsageTracker>,
    key_info: ApiKeyInfo,
    model: String,
    request_id: String,
    provider: String,
    protocol: &'static str,
) -> SseStream {
    use futures::StreamExt;
    let stream = async_stream::stream! {
        let mut inner = inner;
        while let Some(item) = inner.next().await {
            yield item;
        }
        let u = usage.lock().await;
        let anthropic_usage = crate::schemas::anthropic::Usage {
            input_tokens: u.input_tokens,
            output_tokens: u.output_tokens,
            cache_creation_input_tokens: u.cache_creation_input_tokens,
            cache_read_input_tokens: u.cache_read_input_tokens,
        };
        drop(u);
        if let Err(e) = tracker
            .record_usage(&key_info, &request_id, &model, &anthropic_usage, true, &provider, protocol)
            .await
        {
            tracing::warn!(error = %e, "Failed to record streaming usage");
        }
    };
    Box::pin(stream)
}

/// Handle request using Bedrock backend
#[allow(clippy::too_many_arguments)]
async fn handle_bedrock_request(
    state: &AppState,
    request: &MessageRequest,
    target_model_id: &str,
    request_id: &str,
    cache_mode: &crate::converters::cache_transform::PromptCacheMode,
    key_cache_ttl: Option<&str>,
    usage_ctx: &UsageContext,
    start_time: Instant,
) -> Result<MessageApiResponse, ApiError> {
    let bedrock = state.dynamic.read().await.bedrock.clone().ok_or_else(|| {
        ApiError::service_unavailable(
            "Bedrock backend is not configured. Add a 'bedrock' entry to the backends table.",
        )
    })?;

    let bedrock_model = target_model_id;

    // Non-Claude models → Bedrock OpenAI Compat endpoint (Bedrock Mantle)
    if !crate::services::BedrockService::is_claude_model(target_model_id) {
        tracing::debug!(
            request_id = %request_id,
            target_model = %target_model_id,
            stream = request.stream,
            "Routing to Bedrock OpenAI Compat endpoint (non-Claude model)"
        );

        let converter = crate::converters::AnthropicToOpenAIConverter::new();
        let openai_req = converter
            .convert_request(request, target_model_id)
            .map_err(|e| ApiError::bad_request(e.to_string()))?;
        let openai_json = serde_json::to_value(&openai_req)
            .map_err(|e| ApiError::internal_error(e.to_string()))?;

        if request.stream {
            let sse_stream = bedrock
                .chat_completions_stream(
                    &openai_json,
                    target_model_id,
                    Some(usage_ctx.stream_usage.clone()),
                )
                .await
                .map_err(|e| {
                    tracing::error!(error = %e, "Bedrock Mantle streaming failed");
                    ApiError::from_bedrock_error(&e)
                })?;
            return Ok(MessageApiResponse::Stream(Box::pin(sse_stream)));
        }

        let openai_resp_json = bedrock
            .chat_completions(&openai_json, target_model_id)
            .await
            .map_err(|e| {
                tracing::error!(error = %e, "Bedrock Mantle API call failed");
                ApiError::from_bedrock_error(&e)
            })?;

        let openai_resp: crate::schemas::openai::ChatCompletionResponse =
            serde_json::from_value(openai_resp_json).map_err(|e| {
                ApiError::internal_error(format!("Failed to parse Mantle response: {e}"))
            })?;

        let response = converter
            .convert_response(&openai_resp, &request.model)
            .map_err(|e| ApiError::internal_error(e.to_string()))?;

        return Ok(MessageApiResponse::Json(Json(response)));
    }

    tracing::debug!(
        request_id = %request_id,
        bedrock_model = %bedrock_model,
        "Routing to Bedrock InvokeModel (Claude native)"
    );

    // Resolve effective cache mode: per-key TTL takes priority over system setting
    let effective_cache_mode;
    let cache_mode_ref = if let Some(ttl) = key_cache_ttl {
        effective_cache_mode =
            crate::converters::cache_transform::PromptCacheMode::Ttl(ttl.to_string());
        &effective_cache_mode
    } else {
        cache_mode
    };
    let transformed_request =
        crate::converters::cache_transform::apply_to_request(request, cache_mode_ref);

    // Server-side web tool execution loop
    if crate::services::web_tools::executor::WebToolExecutor::has_server_tools(request) {
        let web_tool_executor = state.dynamic.read().await.web_tool_executor.clone();
        return match web_tool_executor.as_ref() {
            Some(executor) => {
                let response = executor
                    .run(request, &bedrock, bedrock_model)
                    .await
                    .map_err(|e| ApiError::internal_error(e.to_string()))?;
                if request.stream {
                    {
                        let mut u = usage_ctx.stream_usage.lock().await;
                        u.input_tokens = response.usage.input_tokens;
                        u.output_tokens = response.usage.output_tokens;
                        u.cache_creation_input_tokens =
                            response.usage.cache_creation_input_tokens;
                        u.cache_read_input_tokens =
                            response.usage.cache_read_input_tokens;
                    }
                    Ok(MessageApiResponse::Stream(response_to_sse_stream(response)))
                } else {
                    Ok(MessageApiResponse::Json(Json(response)))
                }
            }
            None => Err(ApiError::bad_request(
                "web_search/web_fetch tools require WEB_SEARCH_PROVIDER or WEB_FETCH_MAX_CONTENT_KB to be set",
            )),
        };
    }

    // Streaming via InvokeModelWithResponseStream
    if request.stream {
        let stream_response = bedrock
            .invoke_model_messages_stream(&transformed_request, bedrock_model)
            .await
            .map_err(|e| {
                tracing::error!(error = %e, "Bedrock InvokeModel streaming failed");
                ApiError::from_bedrock_error(&e)
            })?;
        let cred_name = stream_response.credential_name.clone();
        let event_pairs = stream_response.into_event_pairs();
        let stream_usage = usage_ctx.stream_usage.clone();
        let bedrock_clone = bedrock.clone();
        let req_id = request_id.to_string();

        let sse_stream: SseStream = Box::pin(async_stream::stream! {
            use axum::response::sse::Event;
            use futures::StreamExt;

            let mut input_tokens: i32 = 0;
            let mut output_tokens: i32 = 0;
            let mut cache_read: Option<i32> = None;
            let mut cache_creation: Option<i32> = None;

            futures::pin_mut!(event_pairs);
            while let Some((event_type, data)) = event_pairs.next().await {
                // Extract usage from Anthropic SSE events
                if let Ok(parsed) = serde_json::from_str::<serde_json::Value>(&data) {
                    match event_type.as_str() {
                        "message_start" => {
                            if let Some(usage) = parsed.pointer("/message/usage") {
                                if let Some(v) = usage.get("input_tokens").and_then(|v| v.as_i64()) {
                                    input_tokens = v as i32;
                                }
                                if let Some(v) = usage.get("cache_read_input_tokens").and_then(|v| v.as_i64()) {
                                    cache_read = Some(v as i32);
                                }
                                if let Some(v) = usage.get("cache_creation_input_tokens").and_then(|v| v.as_i64()) {
                                    cache_creation = Some(v as i32);
                                }
                            }
                        }
                        "message_delta" => {
                            if let Some(v) = parsed.pointer("/usage/output_tokens").and_then(|v| v.as_i64()) {
                                output_tokens = v as i32;
                            }
                        }
                        _ => {}
                    }
                }

                let mut ev = Event::default().data(data);
                if !event_type.is_empty() {
                    ev = ev.event(event_type);
                }
                yield Ok(ev);
            }

            bedrock_clone.record_success(&cred_name);

            tracing::debug!(
                request_id = %req_id,
                input_tokens,
                output_tokens,
                cache_read = ?cache_read,
                cache_creation = ?cache_creation,
                "Bedrock InvokeModel stream usage extracted"
            );

            {
                let mut u = stream_usage.lock().await;
                u.input_tokens = input_tokens;
                u.output_tokens = output_tokens;
                u.cache_creation_input_tokens = cache_creation;
                u.cache_read_input_tokens = cache_read;
            }
        });

        return Ok(MessageApiResponse::Stream(sse_stream));
    }

    // Non-streaming via InvokeModel
    let response = bedrock
        .invoke_model_messages(&transformed_request, bedrock_model)
        .await
        .map_err(|e| {
            tracing::error!(error = %e, "Bedrock InvokeModel API call failed");
            ApiError::from_bedrock_error(&e)
        })?;

    let duration_ms = start_time.elapsed().as_millis();

    tracing::info!(
        request_id = %request_id,
        model = %response.model,
        bedrock_model = %bedrock_model,
        input_tokens = response.usage.input_tokens,
        output_tokens = response.usage.output_tokens,
        stop_reason = ?response.stop_reason,
        duration_ms = duration_ms,
        "Bedrock request completed successfully"
    );

    Ok(MessageApiResponse::Json(Json(response)))
}

/// Handle request using Anthropic passthrough backend
async fn handle_anthropic_passthrough(
    state: &AppState,
    request: &MessageRequest,
    target_model_id: &str,
    request_id: &str,
    client_headers: &HeaderMap,
    usage_ctx: &UsageContext,
    start_time: Instant,
) -> Result<MessageApiResponse, ApiError> {
    let pool = state
        .dynamic
        .read()
        .await
        .anthropic_pool
        .clone()
        .ok_or_else(|| {
            ApiError::service_unavailable(
                "Anthropic backend is not configured. Add an 'anthropic' entry to the backends table.",
            )
        })?;
    let instance = pool
        .get_next()
        .ok_or_else(|| ApiError::service_unavailable("No healthy Anthropic backend available"))?;
    let svc = &instance.service;

    // Serialize the request and replace model with the resolved target model id
    let mut body_value =
        serde_json::to_value(request).map_err(|e| ApiError::internal_error(e.to_string()))?;
    body_value["model"] = serde_json::Value::String(target_model_id.to_string());

    // Remove fields not recognized by the Anthropic API
    if let Some(obj) = body_value.as_object_mut() {
        obj.remove("container"); // PTC field, not part of Anthropic API
    }

    // Resolve service_tier: backend config → map to Anthropic provider value
    if let Some(obj) = body_value.as_object_mut() {
        match crate::services::service_tier::resolve_for_provider(
            instance.service_tier(),
            request.service_tier.as_deref(),
            "anthropic",
        ) {
            Some(tier) => {
                obj.insert("service_tier".to_string(), serde_json::json!(tier));
            }
            None => {
                obj.remove("service_tier");
            }
        }
    }

    let body_bytes =
        serde_json::to_vec(&body_value).map_err(|e| ApiError::internal_error(e.to_string()))?;

    // Forward only safe passthrough headers
    let mut extra_headers: Vec<(String, String)> = Vec::new();
    for name in &["anthropic-version", "anthropic-beta"] {
        if let Some(val) = client_headers.get(*name) {
            if let Ok(v) = val.to_str() {
                extra_headers.push((name.to_string(), v.to_string()));
            }
        }
    }

    tracing::debug!(
        request_id = %request_id,
        target_model = %target_model_id,
        stream = request.stream,
        "Routing to Anthropic passthrough"
    );

    let (resp, credential_name) = svc
        .forward("/v1/messages", body_bytes, &extra_headers)
        .await
        .map_err(|e| {
            tracing::error!(error = %e, "Anthropic passthrough request failed");
            ApiError::internal_error(format!("Anthropic API error: {e}"))
        })?;

    let upstream_status = resp.status().as_u16();

    // Non-success: propagate the error body
    if !(200..300).contains(&upstream_status) {
        let error_body = resp.text().await.unwrap_or_default();
        tracing::error!(
            request_id = %request_id,
            status = upstream_status,
            body = %error_body,
            "Anthropic passthrough returned error"
        );
        let status = StatusCode::from_u16(upstream_status).unwrap_or(StatusCode::BAD_GATEWAY);
        return Err(ApiError {
            status,
            error_type: "api_error".to_string(),
            message: error_body,
        });
    }

    if request.stream {
        let sse_stream = proxy_anthropic_sse_stream(
            resp,
            request_id,
            svc.clone(),
            credential_name,
            usage_ctx.clone(),
        )
        .await?;
        return Ok(MessageApiResponse::Stream(sse_stream));
    }

    // Non-streaming: read body and return JSON
    let body_text = resp
        .text()
        .await
        .map_err(|e| ApiError::internal_error(format!("Failed to read Anthropic response: {e}")))?;

    svc.record_success(&credential_name);

    let duration_ms = start_time.elapsed().as_millis();
    tracing::info!(
        request_id = %request_id,
        target_model = %target_model_id,
        duration_ms = duration_ms,
        "Anthropic passthrough completed"
    );

    let response: MessageResponse =
        serde_json::from_str(&body_text).map_err(|e| ApiError::internal_error(e.to_string()))?;
    Ok(MessageApiResponse::Json(Json(response)))
}

/// Proxy Anthropic SSE stream from upstream to client
async fn proxy_anthropic_sse_stream(
    upstream: reqwest::Response,
    request_id: &str,
    svc: Arc<crate::services::PassthroughService>,
    credential_name: String,
    usage_ctx: UsageContext,
) -> Result<SseStream, ApiError> {
    let req_id = request_id.to_string();

    let stream = async_stream::stream! {
        let mut response = upstream;
        let mut buffer = String::new();
        let mut stream_error = false;
        let mut input_tokens: i32 = 0;
        let mut output_tokens: i32 = 0;
        let mut cache_creation: Option<i32> = None;
        let mut cache_read: Option<i32> = None;

        loop {
            match response.chunk().await {
                Ok(Some(chunk)) => {
                    if let Ok(text) = std::str::from_utf8(&chunk) {
                        buffer.push_str(text);
                    }

                    // Parse complete SSE events (separated by \n\n)
                    while let Some(pos) = buffer.find("\n\n") {
                        let event_str = buffer[..pos].to_string();
                        buffer = buffer[pos + 2..].to_string();

                        // Parse event: and data: lines
                        let mut event_type: Option<String> = None;
                        let mut data_line: Option<String> = None;

                        for line in event_str.lines() {
                            if let Some(evt) = line.strip_prefix("event: ") {
                                event_type = Some(evt.trim().to_string());
                            } else if let Some(d) = line.strip_prefix("data: ") {
                                data_line = Some(d.trim().to_string());
                            }
                        }

                        if let Some(ref data) = data_line {
                            if data == "[DONE]" {
                                break;
                            }

                            // Extract usage from SSE events
                            if let Some(ref evt) = event_type {
                                if let Ok(parsed) = serde_json::from_str::<serde_json::Value>(data) {
                                    match evt.as_str() {
                                        "message_start" => {
                                            if let Some(usage) = parsed.pointer("/message/usage") {
                                                if let Some(v) = usage.get("input_tokens").and_then(|v| v.as_i64()) {
                                                    input_tokens = v as i32;
                                                }
                                                if let Some(v) = usage.get("cache_read_input_tokens").and_then(|v| v.as_i64()) {
                                                    cache_read = Some(v as i32);
                                                }
                                                if let Some(v) = usage.get("cache_creation_input_tokens").and_then(|v| v.as_i64()) {
                                                    cache_creation = Some(v as i32);
                                                }
                                            }
                                        }
                                        "message_delta" => {
                                            if let Some(v) = parsed.pointer("/usage/output_tokens").and_then(|v| v.as_i64()) {
                                                output_tokens = v as i32;
                                            }
                                        }
                                        _ => {}
                                    }
                                }
                            }

                            let mut sse_event = Event::default().data(data.clone());
                            if let Some(evt) = event_type {
                                sse_event = sse_event.event(evt);
                            }
                            yield Ok(sse_event);
                        }
                    }
                }
                Ok(None) => {
                    tracing::debug!(request_id = %req_id, "Anthropic passthrough stream ended");
                    break;
                }
                Err(e) => {
                    stream_error = true;
                    tracing::error!(request_id = %req_id, error = %e, "Anthropic passthrough stream error");
                    break;
                }
            }
        }

        if stream_error {
            svc.record_failure(&credential_name);
        } else {
            svc.record_success(&credential_name);
        }

        {
            let mut u = usage_ctx.stream_usage.lock().await;
            u.input_tokens = input_tokens;
            u.output_tokens = output_tokens;
            u.cache_creation_input_tokens = cache_creation;
            u.cache_read_input_tokens = cache_read;
        }
    };

    Ok(Box::pin(stream))
}

/// Handle request using OpenAI backend (converts Anthropic → OpenAI format)
async fn handle_openai_backend(
    state: &AppState,
    request: &MessageRequest,
    target_model_id: &str,
    request_id: &str,
    usage_ctx: &UsageContext,
    start_time: Instant,
) -> Result<MessageApiResponse, ApiError> {
    use crate::converters::anthropic_openai::OpenAIToAnthropicStreamState;

    let pool = state
        .dynamic
        .read()
        .await
        .openai_pool
        .clone()
        .ok_or_else(|| {
            ApiError::service_unavailable(
                "OpenAI backend is not configured. Add an 'openai' entry to the backends table.",
            )
        })?;
    let instance = pool
        .get_next()
        .ok_or_else(|| ApiError::service_unavailable("No healthy OpenAI backend available"))?;
    let svc = &instance.service;

    // Convert Anthropic request to OpenAI format
    let converter = AnthropicToOpenAIConverter::new();
    let mut openai_request = converter
        .convert_request(request, target_model_id)
        .map_err(|e| ApiError::bad_request(format!("Request conversion error: {e}")))?;

    // Resolve service_tier: backend config → map to OpenAI provider value
    openai_request.service_tier = crate::services::service_tier::resolve_for_provider(
        instance.service_tier(),
        request.service_tier.as_deref(),
        "openai",
    );

    let body_bytes =
        serde_json::to_vec(&openai_request).map_err(|e| ApiError::internal_error(e.to_string()))?;

    tracing::debug!(
        request_id = %request_id,
        target_model = %target_model_id,
        stream = request.stream,
        "Routing Anthropic request to OpenAI backend"
    );

    let (resp, credential_name) = svc
        .forward("/v1/chat/completions", body_bytes, &[])
        .await
        .map_err(|e| {
            tracing::error!(error = %e, "OpenAI backend request failed");
            ApiError::internal_error(format!("OpenAI API error: {e}"))
        })?;

    let upstream_status = resp.status().as_u16();

    if !(200..300).contains(&upstream_status) {
        let error_body = resp.text().await.unwrap_or_default();
        tracing::error!(
            request_id = %request_id,
            status = upstream_status,
            body = %error_body,
            "OpenAI backend returned error"
        );
        let status = StatusCode::from_u16(upstream_status).unwrap_or(StatusCode::BAD_GATEWAY);
        return Err(ApiError {
            status,
            error_type: "api_error".to_string(),
            message: error_body,
        });
    }

    if request.stream {
        let req_id = request_id.to_string();
        let original_model = request.model.clone();
        let svc_clone = svc.clone();
        let cred_name = credential_name.clone();
        let stream_usage = usage_ctx.stream_usage.clone();

        let stream = async_stream::stream! {
            let mut response = resp;
            let mut buffer = String::new();
            let mut stream_error = false;
            let response_converter = crate::converters::anthropic_openai::AnthropicToOpenAIConverter::new();
            let mut conv_state = OpenAIToAnthropicStreamState::default();
            let mut input_tokens: i32 = 0;
            let mut output_tokens: i32 = 0;
            let mut cache_creation: Option<i32> = None;
            let mut cache_read: Option<i32> = None;
            // We don't have usage info at stream start for OpenAI→Anthropic path
            let _ = original_model;

            loop {
                match response.chunk().await {
                    Ok(Some(chunk)) => {
                        if let Ok(text) = std::str::from_utf8(&chunk) {
                            buffer.push_str(text);
                        }

                        while let Some(pos) = buffer.find("\n\n") {
                            let line = buffer[..pos].to_string();
                            buffer = buffer[pos + 2..].to_string();

                            if let Some(data) = line.strip_prefix("data: ") {
                                let data = data.trim();
                                if data == "[DONE]" {
                                    return;
                                }
                                // Parse the OpenAI chunk and convert to Anthropic events
                                if let Ok(oai_chunk) = serde_json::from_str::<crate::schemas::openai::ChatCompletionChunk>(data) {
                                    let events = response_converter.convert_stream_chunk_to_anthropic(&oai_chunk, &mut conv_state);
                                    for (evt_type, evt_data) in &events {
                                        // Extract usage from converted Anthropic events
                                        if let Ok(parsed) = serde_json::from_str::<serde_json::Value>(evt_data) {
                                            match evt_type.as_str() {
                                                "message_start" => {
                                                    if let Some(usage) = parsed.pointer("/message/usage") {
                                                        if let Some(v) = usage.get("input_tokens").and_then(|v| v.as_i64()) {
                                                            input_tokens = v as i32;
                                                        }
                                                        if let Some(v) = usage.get("cache_read_input_tokens").and_then(|v| v.as_i64()) {
                                                            cache_read = Some(v as i32);
                                                        }
                                                        if let Some(v) = usage.get("cache_creation_input_tokens").and_then(|v| v.as_i64()) {
                                                            cache_creation = Some(v as i32);
                                                        }
                                                    }
                                                }
                                                "message_delta" => {
                                                    if let Some(v) = parsed.pointer("/usage/output_tokens").and_then(|v| v.as_i64()) {
                                                        output_tokens = v as i32;
                                                    }
                                                }
                                                _ => {}
                                            }
                                        }
                                        yield Ok(Event::default().event(evt_type.clone()).data(evt_data.clone()));
                                    }
                                }
                            }
                        }
                    }
                    Ok(None) => {
                        tracing::debug!(request_id = %req_id, "OpenAI backend stream ended");
                        break;
                    }
                    Err(e) => {
                        stream_error = true;
                        tracing::error!(request_id = %req_id, error = %e, "OpenAI backend stream error");
                        break;
                    }
                }
            }

            if stream_error {
                svc_clone.record_failure(&cred_name);
            } else {
                svc_clone.record_success(&cred_name);
            }

            {
                let mut u = stream_usage.lock().await;
                u.input_tokens = input_tokens;
                u.output_tokens = output_tokens;
                u.cache_creation_input_tokens = cache_creation;
                u.cache_read_input_tokens = cache_read;
            }
        };

        return Ok(MessageApiResponse::Stream(Box::pin(stream)));
    }

    // Non-streaming: read body, convert OpenAI → Anthropic response
    let body_text = resp
        .text()
        .await
        .map_err(|e| ApiError::internal_error(format!("Failed to read OpenAI response: {e}")))?;

    svc.record_success(&credential_name);

    let openai_response: crate::schemas::openai::ChatCompletionResponse =
        serde_json::from_str(&body_text).map_err(|e| {
            ApiError::internal_error(format!("Failed to parse OpenAI response: {e}"))
        })?;

    let response_converter = AnthropicToOpenAIConverter::new();
    let response = response_converter
        .convert_response(&openai_response, &request.model)
        .map_err(|e| ApiError::internal_error(format!("Response conversion error: {e}")))?;

    let duration_ms = start_time.elapsed().as_millis();
    tracing::info!(
        request_id = %request_id,
        target_model = %target_model_id,
        input_tokens = response.usage.input_tokens,
        output_tokens = response.usage.output_tokens,
        duration_ms = duration_ms,
        "OpenAI backend request completed"
    );

    Ok(MessageApiResponse::Json(Json(response)))
}

/// Handle request using Gemini backend
async fn handle_gemini_request(
    state: &AppState,
    request: &MessageRequest,
    request_id: &str,
    usage_ctx: &UsageContext,
    start_time: Instant,
) -> Result<MessageApiResponse, ApiError> {
    let gemini_pool = state
        .dynamic
        .read()
        .await
        .gemini_pool
        .clone()
        .ok_or_else(|| ApiError::internal_error("Gemini service not available"))?;
    let gemini_instance = gemini_pool
        .get_next()
        .ok_or_else(|| ApiError::service_unavailable("No healthy Gemini backend available"))?;
    let gemini_service = &gemini_instance.service;

    // Convert Anthropic request to Gemini format
    let converter = AnthropicToGeminiConverter::new();
    let (gemini_model, gemini_request) = converter
        .convert_request(request)
        .map_err(|e| ApiError::bad_request(format!("Request conversion error: {e}")))?;

    tracing::debug!(
        request_id = %request_id,
        gemini_model = %gemini_model,
        "Routing to Gemini backend"
    );

    // Handle streaming vs non-streaming
    if request.stream {
        let instance_name = gemini_instance.name().to_string();
        let pool_clone = gemini_pool.clone();
        let sse_stream = create_gemini_streaming_response(
            gemini_service.clone(),
            &gemini_model,
            gemini_request,
            request_id,
            &request.model,
            pool_clone,
            instance_name,
            usage_ctx.clone(),
        )
        .await?;
        return Ok(MessageApiResponse::Stream(sse_stream));
    }

    // Non-streaming response
    let gemini_response = gemini_service
        .generate_content(&gemini_model, &gemini_request)
        .await
        .map_err(|e| {
            tracing::error!(error = %e, "Gemini API call failed");
            ApiError::internal_error(format!("Gemini API error: {e}"))
        })?;

    // Convert Gemini response to Anthropic format
    let response_converter = GeminiToAnthropicConverter::new();
    let response = response_converter
        .convert_response(&gemini_response, &request.model)
        .map_err(|e| ApiError::internal_error(format!("Response conversion error: {e}")))?;

    let duration_ms = start_time.elapsed().as_millis();

    tracing::info!(
        request_id = %request_id,
        model = %response.model,
        gemini_model = %gemini_model,
        input_tokens = response.usage.input_tokens,
        output_tokens = response.usage.output_tokens,
        stop_reason = ?response.stop_reason,
        duration_ms = duration_ms,
        "Gemini request completed successfully"
    );

    Ok(MessageApiResponse::Json(Json(response)))
}

/// Create a streaming response using SSE with Gemini API
#[allow(clippy::too_many_arguments)]
async fn create_gemini_streaming_response(
    gemini_service: std::sync::Arc<crate::services::GeminiService>,
    gemini_model: &str,
    gemini_request: crate::schemas::gemini::GeminiRequest,
    request_id: &str,
    original_model: &str,
    pool: Arc<
        crate::services::CredentialPool<
            crate::services::BackendInstance<crate::services::GeminiService>,
        >,
    >,
    instance_name: String,
    usage_ctx: UsageContext,
) -> Result<SseStream, ApiError> {
    let (mut stream_response, credential_name) = gemini_service
        .generate_content_stream(gemini_model, &gemini_request)
        .await
        .map_err(|e| {
            tracing::error!(error = %e, "Gemini stream API call failed");
            ApiError::internal_error(format!("Gemini API error: {e}"))
        })?;

    let model_id = original_model.to_string();
    let gemini_model_id = gemini_model.to_string();
    let req_id = request_id.to_string();
    let converter = GeminiToAnthropicConverter::new();
    let gemini_service_clone = gemini_service.clone();
    let cred_name = credential_name.clone();

    let stream = async_stream::stream! {
        let message_id = format!("msg_{}", Uuid::new_v4().to_string().replace("-", ""));
        let mut total_input_tokens: i32 = 0;
        let mut total_output_tokens: i32 = 0;
        let mut stop_reason = "end_turn".to_string();
        let mut content_block_started = false;
        let mut stream_error = false;

        tracing::debug!(request_id = %req_id, "Starting Gemini SSE stream");

        // Emit message_start event
        let message_start_data = serde_json::json!({
            "type": "message_start",
            "message": {
                "id": message_id,
                "type": "message",
                "role": "assistant",
                "content": [],
                "model": model_id,
                "stop_reason": null,
                "stop_sequence": null,
                "usage": {
                    "input_tokens": 0,
                    "output_tokens": 0
                }
            }
        });
        yield Ok(Event::default().event("message_start").data(message_start_data.to_string()));

        // Process Gemini stream events
        loop {
            match stream_response.recv().await {
                Ok(Some(chunk)) => {
                    // Convert chunk using the converter
                    match converter.convert_stream_chunk(&chunk) {
                        Ok((text_delta, finish_reason_opt)) => {
                            // Emit content block start if this is the first text
                            if text_delta.is_some() && !content_block_started {
                                content_block_started = true;
                                let start_data = serde_json::json!({
                                    "type": "content_block_start",
                                    "index": 0,
                                    "content_block": {"type": "text", "text": ""}
                                });
                                yield Ok(Event::default().event("content_block_start").data(start_data.to_string()));
                            }

                            // Emit text delta
                            if let Some(text) = text_delta {
                                let delta_data = serde_json::json!({
                                    "type": "content_block_delta",
                                    "index": 0,
                                    "delta": {"type": "text_delta", "text": text}
                                });
                                yield Ok(Event::default().event("content_block_delta").data(delta_data.to_string()));
                            }

                            // Check for finish reason
                            if let Some(reason) = finish_reason_opt {
                                stop_reason = match reason {
                                    StopReason::EndTurn => "end_turn".to_string(),
                                    StopReason::MaxTokens => "max_tokens".to_string(),
                                    StopReason::StopSequence => "stop_sequence".to_string(),
                                    StopReason::ToolUse => "tool_use".to_string(),
                                    StopReason::PauseTurn => "pause_turn".to_string(),
                                };
                            }

                            // Update usage if available
                            if let Some(usage) = chunk.usage_metadata {
                                total_input_tokens = usage.prompt_token_count;
                                total_output_tokens = usage.candidates_token_count;
                            }
                        }
                        Err(e) => {
                            tracing::warn!(request_id = %req_id, error = %e, "Failed to convert stream chunk");
                        }
                    }
                }
                Ok(None) => {
                    // Stream ended
                    tracing::debug!(request_id = %req_id, "Gemini stream ended");
                    break;
                }
                Err(e) => {
                    stream_error = true;
                    tracing::error!(request_id = %req_id, error = %e, "Gemini stream error");
                    let error_data = serde_json::json!({
                        "type": "error",
                        "error": {
                            "type": "api_error",
                            "message": e.to_string()
                        }
                    });
                    yield Ok(Event::default()
                        .event("error")
                        .data(error_data.to_string()));
                    break;
                }
            }
        }

        // Emit content block stop if we started one
        if content_block_started {
            let stop_data = serde_json::json!({
                "type": "content_block_stop",
                "index": 0
            });
            yield Ok(Event::default().event("content_block_stop").data(stop_data.to_string()));
        }

        // Emit message_delta with final usage
        let message_delta_data = serde_json::json!({
            "type": "message_delta",
            "delta": {
                "stop_reason": stop_reason,
                "stop_sequence": null
            },
            "usage": {
                "output_tokens": total_output_tokens
            }
        });
        yield Ok(Event::default().event("message_delta").data(message_delta_data.to_string()));

        // Emit message_stop event
        let message_stop_data = serde_json::json!({
            "type": "message_stop"
        });
        yield Ok(Event::default().event("message_stop").data(message_stop_data.to_string()));

        // Record success or failure for the credential (internal key-level)
        if stream_error {
            gemini_service_clone.record_failure(&cred_name);
            pool.record_failure(&instance_name);
        } else {
            gemini_service_clone.record_success(&cred_name);
            pool.record_success(&instance_name);
        }

        tracing::info!(
            request_id = %req_id,
            model = %model_id,
            gemini_model = %gemini_model_id,
            credential = %cred_name,
            input_tokens = total_input_tokens,
            output_tokens = total_output_tokens,
            stop_reason = %stop_reason,
            stream_error = stream_error,
            "Gemini streaming response completed"
        );

        {
            let mut u = usage_ctx.stream_usage.lock().await;
            u.input_tokens = total_input_tokens;
            u.output_tokens = total_output_tokens;
        }
    };

    Ok(Box::pin(stream))
}

// ============================================================================
// Count Tokens Endpoint
// ============================================================================

/// Count tokens request
#[derive(Debug, Clone, Deserialize)]
pub struct CountTokensRequest {
    pub model: String,
    pub messages: Vec<serde_json::Value>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub system: Option<serde_json::Value>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub tools: Option<Vec<serde_json::Value>>,
}

/// Count tokens response
#[derive(Debug, Clone, Serialize)]
pub struct CountTokensResponse {
    pub input_tokens: i32,
}

/// POST /v1/messages/count_tokens - Count tokens in a message
///
/// This endpoint estimates the number of tokens that would be used by a request.
/// Note: Bedrock doesn't provide a direct token counting API, so this returns an estimate.
pub async fn count_tokens(
    State(_state): State<AppState>,
    Json(request): Json<CountTokensRequest>,
) -> Result<Json<CountTokensResponse>, ApiError> {
    tracing::debug!(
        model = %request.model,
        message_count = request.messages.len(),
        "Counting tokens"
    );

    // Simple estimation: ~4 characters per token (rough estimate)
    let mut char_count = 0;

    for message in &request.messages {
        if let Some(content) = message.get("content") {
            char_count += content.to_string().len();
        }
    }

    if let Some(ref system) = request.system {
        char_count += system.to_string().len();
    }

    if let Some(ref tools) = request.tools {
        for tool in tools {
            char_count += tool.to_string().len();
        }
    }

    let estimated_tokens = (char_count / 4).max(1) as i32;

    Ok(Json(CountTokensResponse {
        input_tokens: estimated_tokens,
    }))
}

// ============================================================================
// Debug Utilities
// ============================================================================

/// Log request prompts via tracing for debugging (truncated to 2000 chars)
fn print_request_prompts(request_id: &str, request: &MessageRequest) {
    let mut output = String::new();

    // Header
    output.push_str(&format!("Model: {}", request.model));
    output.push_str(&format!(", Max tokens: {}", request.max_tokens));
    if let Some(temp) = request.temperature {
        output.push_str(&format!(", Temperature: {temp}"));
    }
    output.push_str(&format!(", Stream: {}", request.stream));

    // System prompt
    if let Some(ref system) = request.system {
        output.push_str(" | SYSTEM: ");
        match system {
            SystemContent::Text(text) => {
                output.push_str(truncate_str(text, 2000));
            }
            SystemContent::Messages(messages) => {
                for msg in messages {
                    output.push_str(truncate_str(&msg.text, 2000));
                    output.push(' ');
                }
            }
        }
    }

    // Messages
    output.push_str(&format!(" | MESSAGES ({} total):", request.messages.len()));
    for (i, msg) in request.messages.iter().enumerate() {
        let role_icon = match msg.role.as_str() {
            "user" => "U",
            "assistant" => "A",
            _ => "?",
        };
        output.push_str(&format!(" [{i}] {role_icon}:"));

        match &msg.content {
            MessageContent::Text(text) => {
                output.push_str(truncate_str(text, 2000));
            }
            MessageContent::Blocks(blocks) => {
                for content in blocks {
                    match content {
                        ContentBlock::Text { text, .. } => {
                            output.push_str(truncate_str(text, 2000));
                        }
                        ContentBlock::Image { source, .. } => {
                            output.push_str(&format!(
                                "[Image: {} bytes, type: {}]",
                                source.data.len(),
                                source.media_type
                            ));
                        }
                        ContentBlock::ToolUse {
                            id, name, input, ..
                        } => {
                            output.push_str(&format!("[Tool Use: {name} (id: {id})]"));
                            if let Ok(json) = serde_json::to_string_pretty(&input) {
                                output.push_str(&format!(" Input: {}", truncate_str(&json, 2000)));
                            }
                        }
                        ContentBlock::ToolResult {
                            tool_use_id,
                            content,
                            ..
                        } => {
                            output.push_str(&format!("[Tool Result for: {tool_use_id}]"));
                            match content {
                                ToolResultValue::Text(text) => {
                                    output
                                        .push_str(&format!(" Result: {}", truncate_str(text, 500)));
                                }
                                ToolResultValue::Blocks(blocks) => {
                                    output.push_str(&format!(" Result: [{} blocks]", blocks.len()));
                                }
                            }
                        }
                        _ => {
                            output.push_str("[Other content block]");
                        }
                    }
                }
            }
        }
    }

    // Tools
    if let Some(ref tools) = request.tools {
        output.push_str(&format!(" | TOOLS ({} defined):", tools.len()));
        for tool in tools {
            if let Some(name) = tool.get("name").and_then(|v| v.as_str()) {
                output.push_str(&format!(" {name}"));
            }
        }
    }

    tracing::debug!(request_id = %request_id, "{}", truncate_str(&output, 2000));
}

// ============================================================================
// Synthetic SSE Conversion
// ============================================================================

/// Convert a complete `MessageResponse` into a synthetic Anthropic SSE stream.
///
/// Used when the web-tool execution loop finishes (always non-streaming internally)
/// but the caller requested `stream: true`.  The complete response is wrapped in
/// the standard Anthropic SSE event sequence so the client receives a well-formed
/// streaming response without an extra Bedrock round-trip.
fn response_to_sse_stream(response: MessageResponse) -> SseStream {
    let stream = async_stream::stream! {
        let message_id = response.id.clone();
        let model = response.model.clone();

        // 1. message_start
        yield Ok(Event::default().event("message_start").data(
            serde_json::json!({
                "type": "message_start",
                "message": {
                    "id": message_id,
                    "type": "message",
                    "role": "assistant",
                    "content": [],
                    "model": model,
                    "stop_reason": null,
                    "stop_sequence": null,
                    "usage": {
                        "input_tokens": response.usage.input_tokens,
                        "output_tokens": 0
                    }
                }
            }).to_string()
        ));

        // 2. ping
        yield Ok(Event::default().event("ping").data(r#"{"type":"ping"}"#));

        // 3. content blocks
        for (index, block) in response.content.iter().enumerate() {
            let (block_start_json, delta_data) = match block {
                ContentBlock::Text { text, .. } => (
                    serde_json::json!({"type": "text", "text": ""}),
                    serde_json::json!({
                        "type": "content_block_delta",
                        "index": index,
                        "delta": {"type": "text_delta", "text": text}
                    }),
                ),
                ContentBlock::ToolUse { id, name, input, .. } => (
                    serde_json::json!({"type": "tool_use", "id": id, "name": name, "input": {}}),
                    serde_json::json!({
                        "type": "content_block_delta",
                        "index": index,
                        "delta": {
                            "type": "input_json_delta",
                            "partial_json": serde_json::to_string(input).unwrap_or_default()
                        }
                    }),
                ),
                ContentBlock::Thinking { thinking, signature } => (
                    serde_json::json!({"type": "thinking", "thinking": ""}),
                    serde_json::json!({
                        "type": "content_block_delta",
                        "index": index,
                        "delta": {
                            "type": "thinking_delta",
                            "thinking": thinking,
                            "signature": signature
                        }
                    }),
                ),
                ContentBlock::RedactedThinking { data } => (
                    serde_json::json!({"type": "redacted_thinking", "data": ""}),
                    serde_json::json!({
                        "type": "content_block_delta",
                        "index": index,
                        "delta": {"type": "redacted_thinking_delta", "data": data}
                    }),
                ),
                _ => continue,
            };

            // content_block_start
            yield Ok(Event::default().event("content_block_start").data(
                serde_json::json!({
                    "type": "content_block_start",
                    "index": index,
                    "content_block": block_start_json
                }).to_string()
            ));

            // content_block_delta
            yield Ok(Event::default().event("content_block_delta").data(delta_data.to_string()));

            // content_block_stop
            yield Ok(Event::default().event("content_block_stop").data(
                serde_json::json!({"type": "content_block_stop", "index": index}).to_string()
            ));
        }

        // 4. message_delta
        let stop_reason = response.stop_reason.as_ref()
            .map(|r| r.to_string())
            .unwrap_or_else(|| "end_turn".to_string());

        yield Ok(Event::default().event("message_delta").data(
            serde_json::json!({
                "type": "message_delta",
                "delta": {
                    "stop_reason": stop_reason,
                    "stop_sequence": null
                },
                "usage": {"output_tokens": response.usage.output_tokens}
            }).to_string()
        ));

        // 5. message_stop
        yield Ok(Event::default().event("message_stop").data(
            r#"{"type":"message_stop"}"#
        ));
    };

    Box::pin(stream)
}

// ============================================================================
// Tests
// ============================================================================

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_api_error_status_codes() {
        assert_eq!(
            ApiError::bad_request("test").status,
            StatusCode::BAD_REQUEST
        );
        assert_eq!(
            ApiError::unauthorized("test").status,
            StatusCode::UNAUTHORIZED
        );
        assert_eq!(
            ApiError::rate_limited("test").status,
            StatusCode::TOO_MANY_REQUESTS
        );
        assert_eq!(
            ApiError::internal_error("test").status,
            StatusCode::INTERNAL_SERVER_ERROR
        );
        assert_eq!(
            ApiError::service_unavailable("test").status,
            StatusCode::SERVICE_UNAVAILABLE
        );
    }

    #[test]
    fn test_count_tokens_estimation() {
        let char_count = 400;
        let estimated_tokens = (char_count / 4).max(1);
        assert_eq!(estimated_tokens, 100);
    }

    #[test]
    fn test_web_tools_stream_flag_handled() {
        // Verify that response_to_sse_stream compiles and creates a valid SSE
        // for a response with no content blocks.
        use crate::schemas::anthropic::{StopReason, Usage};
        let response = MessageResponse {
            id: "msg_test".into(),
            response_type: "message".into(),
            role: "assistant".into(),
            content: vec![],
            model: "claude-haiku".into(),
            stop_reason: Some(StopReason::EndTurn),
            stop_sequence: None,
            usage: Usage {
                input_tokens: 10,
                output_tokens: 5,
                cache_creation_input_tokens: None,
                cache_read_input_tokens: None,
            },
            container: None,
        };
        let _sse = response_to_sse_stream(response);
    }

    #[test]
    fn test_web_tools_stream_with_text_content() {
        // Verify that response_to_sse_stream handles a text content block.
        use crate::schemas::anthropic::{StopReason, Usage};
        let response = MessageResponse {
            id: "msg_text_test".into(),
            response_type: "message".into(),
            role: "assistant".into(),
            content: vec![ContentBlock::Text {
                text: "Hello, world!".into(),
                cache_control: None,
            }],
            model: "claude-haiku".into(),
            stop_reason: Some(StopReason::EndTurn),
            stop_sequence: None,
            usage: Usage {
                input_tokens: 20,
                output_tokens: 10,
                cache_creation_input_tokens: None,
                cache_read_input_tokens: None,
            },
            container: None,
        };
        let _sse = response_to_sse_stream(response);
    }

    #[test]
    fn test_handle_bedrock_routes_non_claude_to_mantle() {
        // Verify routing logic: non-Claude target models should use OpenAI compat
        assert!(!crate::services::BedrockService::is_claude_model(
            "us.amazon.qwen3-235b-instruct-v1:0"
        ));
        assert!(!crate::services::BedrockService::is_claude_model(
            "deepseek-r1"
        ));
        // Claude models should use Converse API
        assert!(crate::services::BedrockService::is_claude_model(
            "us.anthropic.claude-sonnet-4-6-v1:0"
        ));
    }
}
