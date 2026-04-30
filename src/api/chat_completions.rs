//! OpenAI Chat Completions API endpoint
//!
//! Routes OpenAI Chat Completions requests to the appropriate backend:
//! - Bedrock Claude → OpenAI→Anthropic conversion + InvokeModel (native format)
//! - Bedrock non-Claude → OpenAI→Bedrock conversion + Converse API
//! - Gemini, Anthropic, OpenAI → respective passthrough/conversion handlers

use aws_sdk_bedrockruntime::types::ConverseStreamOutput;
use axum::{
    extract::State,
    http::{HeaderMap, StatusCode},
    response::{sse::Event, IntoResponse, Response, Sse},
    Json,
};
use futures::stream::Stream;
use std::convert::Infallible;
use std::sync::Arc;
use std::time::Instant;
use uuid::Uuid;

use crate::converters::{
    openai_bedrock, GeminiToOpenAIConverter, OpenAIConversionError, OpenAIToGeminiConverter,
};
use crate::schemas::openai::{
    current_timestamp, generate_completion_id, ChatCompletionChunk, ChatCompletionRequest,
    ChatCompletionResponse, ChatRole, ChunkChoice, ChunkDelta, CompletionUsage, FunctionCallDelta,
    OpenAIErrorResponse, ToolCallDelta,
};
use crate::server::state::AppState;
use crate::services::{BedrockError, BedrockService, ConverseRequest, Credential};

// ============================================================================
// Error Types
// ============================================================================

/// OpenAI-style API error
#[derive(Debug)]
pub struct OpenAIApiError {
    pub status: StatusCode,
    pub error: OpenAIErrorResponse,
}

impl OpenAIApiError {
    pub fn bad_request(message: impl Into<String>) -> Self {
        Self {
            status: StatusCode::BAD_REQUEST,
            error: OpenAIErrorResponse::invalid_request_error(&message.into()),
        }
    }

    pub fn unauthorized(message: impl Into<String>) -> Self {
        Self {
            status: StatusCode::UNAUTHORIZED,
            error: OpenAIErrorResponse::authentication_error(&message.into()),
        }
    }

    pub fn rate_limited(message: impl Into<String>) -> Self {
        Self {
            status: StatusCode::TOO_MANY_REQUESTS,
            error: OpenAIErrorResponse::rate_limit_error(&message.into()),
        }
    }

    pub fn internal_error(message: impl Into<String>) -> Self {
        Self {
            status: StatusCode::INTERNAL_SERVER_ERROR,
            error: OpenAIErrorResponse::server_error(&message.into()),
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
            BedrockError::ServiceUnavailable(msg) => Self::internal_error(msg),
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

    pub fn from_conversion_error(err: &OpenAIConversionError) -> Self {
        match err {
            OpenAIConversionError::InvalidContent(msg) => Self::bad_request(msg),
            OpenAIConversionError::InvalidMessage(msg) => Self::bad_request(msg),
            OpenAIConversionError::InvalidTool(msg) => Self::bad_request(msg),
            OpenAIConversionError::Base64DecodeError(msg) => {
                Self::bad_request(format!("Invalid base64: {msg}"))
            }
            OpenAIConversionError::MissingField(field) => {
                Self::bad_request(format!("Missing required field: {field}"))
            }
            OpenAIConversionError::UnsupportedFeature(msg) => {
                Self::bad_request(format!("Unsupported feature: {msg}"))
            }
            OpenAIConversionError::InvalidImageUrl(msg) => Self::bad_request(msg),
        }
    }
}

impl IntoResponse for OpenAIApiError {
    fn into_response(self) -> Response {
        (self.status, Json(self.error)).into_response()
    }
}

// ============================================================================
// Response Type
// ============================================================================

/// Type alias for SSE event streams used across all handlers.
type SseStream = std::pin::Pin<Box<dyn Stream<Item = Result<Event, Infallible>> + Send>>;

/// Enum to represent either a JSON response or an SSE stream (OpenAI format)
pub enum ChatCompletionApiResponse {
    Json(Json<ChatCompletionResponse>),
    Stream(SseStream),
}

impl IntoResponse for ChatCompletionApiResponse {
    fn into_response(self) -> Response {
        match self {
            ChatCompletionApiResponse::Json(json) => json.into_response(),
            ChatCompletionApiResponse::Stream(stream) => Sse::new(stream).into_response(),
        }
    }
}

// ============================================================================
// Usage Tracking Context
// ============================================================================

/// Shared state for streaming usage — handlers write, entry wrapper reads.
#[derive(Debug, Default, Clone)]
struct StreamUsage {
    input_tokens: i32,
    output_tokens: i32,
    cache_creation_input_tokens: Option<i32>,
    cache_read_input_tokens: Option<i32>,
}

/// Context for recording usage, passed to handlers for streaming usage tracking.
#[derive(Clone)]
struct UsageContext {
    tracker: Arc<crate::services::UsageTracker>,
    key_info: crate::middleware::auth::ApiKeyInfo,
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
    key_info: crate::middleware::auth::ApiKeyInfo,
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

// ============================================================================
// Handler Implementation
// ============================================================================

/// POST /v1/chat/completions - Create a chat completion
///
/// This endpoint accepts OpenAI Chat Completions API requests, converts them to Bedrock format,
/// calls the Bedrock Converse API, and returns the response in OpenAI format.
///
/// Supports both streaming and non-streaming responses.
pub async fn chat_completions(
    State(state): State<AppState>,
    axum::extract::Extension(key_info): axum::extract::Extension<
        crate::middleware::auth::ApiKeyInfo,
    >,
    headers: HeaderMap,
    Json(request): Json<ChatCompletionRequest>,
) -> Result<ChatCompletionApiResponse, OpenAIApiError> {
    let start_time = Instant::now();
    let request_id = Uuid::new_v4().to_string();

    // Resolve model via model mapping (seed / database)
    let resolved = match state.model_mapping.resolve(&request.model).await {
        Ok(r) => r,
        Err(_) => {
            return Err(OpenAIApiError::bad_request(format!(
                "Model '{}' is not supported. Check model_mappings configuration.",
                request.model
            )))
        }
    };

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

    // Route based on provider
    let result = if resolved.provider == "gemini" {
        handle_gemini_backend(
            &state,
            &request,
            &resolved.target_model_id,
            &request_id,
            &usage_ctx,
            start_time,
        )
        .await
    } else if resolved.provider == "anthropic" {
        handle_anthropic_backend(
            &state,
            &request,
            &resolved.target_model_id,
            &request_id,
            &usage_ctx,
            start_time,
        )
        .await
    } else if resolved.provider == "openai" {
        handle_openai_passthrough(
            &state,
            &request,
            &resolved.target_model_id,
            &request_id,
            &headers,
            &usage_ctx,
            start_time,
        )
        .await
    } else {
        handle_bedrock_request(
            &state,
            &request,
            &resolved.target_model_id,
            &resolved.capabilities,
            &request_id,
            &usage_ctx,
            start_time,
        )
        .await
    };

    // Record usage for non-streaming responses; wrap streams for deferred recording
    match result {
        Ok(ChatCompletionApiResponse::Json(ref json_resp)) => {
            let usage = crate::schemas::anthropic::Usage::new(
                json_resp.usage.prompt_tokens,
                json_resp.usage.completion_tokens,
            );
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
                        "openai",
                    )
                    .await
                {
                    tracing::warn!(error = %e, "Failed to record usage");
                }
            });
            result
        }
        Ok(ChatCompletionApiResponse::Stream(stream)) => {
            let wrapped = wrap_stream_with_usage_recording(
                stream,
                stream_usage,
                state.usage_tracker.clone(),
                key_info.clone(),
                request.model.clone(),
                request_id,
                resolved.provider.clone(),
                "openai",
            );
            Ok(ChatCompletionApiResponse::Stream(wrapped))
        }
        Err(_) => result,
    }
}

// ============================================================================
// Bedrock Backend Handler (OpenAI → Bedrock)
// ============================================================================

/// Handle request using Bedrock backend.
///
/// - Claude models: OpenAI → Anthropic conversion → InvokeModel (native format)
/// - Non-Claude models: OpenAI → Bedrock conversion → Converse API
#[allow(clippy::too_many_arguments)]
async fn handle_bedrock_request(
    state: &AppState,
    request: &ChatCompletionRequest,
    target_model_id: &str,
    caps: &Option<crate::services::ModelCapabilities>,
    request_id: &str,
    usage_ctx: &UsageContext,
    start_time: Instant,
) -> Result<ChatCompletionApiResponse, OpenAIApiError> {
    let bedrock = state.dynamic.read().await.bedrock.clone().ok_or_else(|| {
        OpenAIApiError::internal_error(
            "Bedrock backend is not configured. Add a 'bedrock' entry to the backends table.",
        )
    })?;

    tracing::info!(
        request_id = %request_id,
        openai_model = %request.model,
        bedrock_model = %target_model_id,
        message_count = request.messages.len(),
        stream = request.stream,
        "Routing OpenAI request to Bedrock backend"
    );

    if request.n.map(|n| n > 1).unwrap_or(false) {
        return Err(OpenAIApiError::bad_request(
            "Only n=1 is supported. Multiple completions are not available.",
        ));
    }

    // ── Claude path: OpenAI → Anthropic → InvokeModel ──────────────────────
    if crate::services::BedrockService::is_claude_model(target_model_id) {
        use crate::converters::anthropic_openai::OpenAIToAnthropicConverter;

        let converter = OpenAIToAnthropicConverter::new();
        let mut anthropic_req = converter
            .convert_request(request, target_model_id)
            .map_err(|e| OpenAIApiError::bad_request(format!("Conversion error: {e}")))?;

        // Apply capability filter
        let default_caps = state.dynamic.read().await.default_capabilities.clone();
        let effective_caps = caps.as_ref().unwrap_or(&default_caps);
        anthropic_req = crate::converters::capability_filter::apply_capabilities(
            &anthropic_req,
            effective_caps,
        );

        if request.stream {
            let stream_response = bedrock
                .invoke_model_messages_stream(&anthropic_req, target_model_id)
                .await
                .map_err(|e| {
                    tracing::error!(error = %e, "Bedrock InvokeModel streaming failed");
                    OpenAIApiError::from_bedrock_error(&e)
                })?;
            let cred_name = stream_response.credential_name.clone();
            let event_pairs = stream_response.into_event_pairs();
            let original_model = request.model.clone();
            let include_usage = request
                .stream_options
                .as_ref()
                .map(|o| o.include_usage)
                .unwrap_or(false);
            let bedrock_clone = bedrock.clone();
            let stream_usage = usage_ctx.stream_usage.clone();
            let req_id = request_id.to_string();

            // Convert Anthropic SSE events → OpenAI SSE chunks
            let stream = async_stream::stream! {
                use crate::converters::anthropic_openai::AnthropicToOpenAIStreamState;
                let mut conv_state = AnthropicToOpenAIStreamState {
                    model: original_model.clone(),
                    include_usage,
                    ..Default::default()
                };
                let converter = crate::converters::anthropic_openai::OpenAIToAnthropicConverter::new();
                futures::pin_mut!(event_pairs);
                use futures::StreamExt;

                let mut input_tokens: i32 = 0;
                let mut output_tokens: i32 = 0;
                let mut cache_read: Option<i32> = None;
                let mut cache_creation: Option<i32> = None;

                while let Some((event_type, data)) = event_pairs.next().await {
                    // Extract usage from Anthropic SSE events.
                    // Use JSON "type" field as primary identifier — Bedrock may omit
                    // the SSE "event:" prefix line depending on model/feature config.
                    if let Ok(parsed) = serde_json::from_str::<serde_json::Value>(&data) {
                        let json_type = parsed.get("type").and_then(|v| v.as_str()).unwrap_or("");
                        let effective_type = if !event_type.is_empty() { event_type.as_str() } else { json_type };
                        match effective_type {
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

                    for chunk_json in converter.convert_stream_chunk_to_openai(
                        &event_type, &data, &mut conv_state,
                    ) {
                        yield Ok(Event::default().data(format!("data: {chunk_json}\n\n")));
                    }
                }
                yield Ok(Event::default().data("data: [DONE]\n\n"));
                bedrock_clone.record_success(&cred_name);

                tracing::debug!(
                    request_id = %req_id,
                    input_tokens,
                    output_tokens,
                    cache_read = ?cache_read,
                    cache_creation = ?cache_creation,
                    "Bedrock InvokeModel stream usage extracted (OpenAI path)"
                );

                {
                    let mut u = stream_usage.lock().await;
                    u.input_tokens = input_tokens;
                    u.output_tokens = output_tokens;
                    u.cache_creation_input_tokens = cache_creation;
                    u.cache_read_input_tokens = cache_read;
                }
            };

            return Ok(ChatCompletionApiResponse::Stream(Box::pin(stream)));
        }

        // Non-streaming
        let response = bedrock
            .invoke_model_messages(&anthropic_req, target_model_id)
            .await
            .map_err(|e| {
                tracing::error!(error = %e, "Bedrock InvokeModel call failed");
                OpenAIApiError::from_bedrock_error(&e)
            })?;

        let oai_converter = crate::converters::anthropic_openai::OpenAIToAnthropicConverter::new();
        let openai_resp = oai_converter
            .convert_response(&response, &request.model)
            .map_err(|e| OpenAIApiError::internal_error(e.to_string()))?;

        let duration_ms = start_time.elapsed().as_millis();
        tracing::info!(
            request_id = %request_id,
            bedrock_model = %target_model_id,
            duration_ms = duration_ms,
            "Bedrock Claude InvokeModel chat completion completed"
        );
        return Ok(ChatCompletionApiResponse::Json(Json(openai_resp)));
    }

    // ── Non-Claude path: OpenAI → Bedrock Converse ─────────────────────────
    let converse_request = openai_bedrock::convert_request(request, target_model_id)
        .map_err(|e| OpenAIApiError::from_conversion_error(&e))?;

    if request.stream {
        let include_usage = request
            .stream_options
            .as_ref()
            .map(|o| o.include_usage)
            .unwrap_or(false);

        let sse_stream = create_openai_streaming_response(
            bedrock.clone(),
            converse_request,
            request_id,
            &request.model,
            include_usage,
            usage_ctx.clone(),
        )
        .await?;

        return Ok(ChatCompletionApiResponse::Stream(sse_stream));
    }

    let converse_output = bedrock.converse(converse_request).await.map_err(|e| {
        tracing::error!(error = %e, "Bedrock Converse API call failed");
        OpenAIApiError::from_bedrock_error(&e)
    })?;

    let response = openai_bedrock::convert_response(converse_output, &request.model)
        .map_err(|e| OpenAIApiError::from_conversion_error(&e))?;

    let duration_ms = start_time.elapsed().as_millis();
    tracing::info!(
        request_id = %request_id,
        bedrock_model = %target_model_id,
        duration_ms = duration_ms,
        "Bedrock Converse chat completion completed"
    );

    Ok(ChatCompletionApiResponse::Json(Json(response)))
}

// ============================================================================
// Streaming Response Handler
// ============================================================================

/// Create a streaming response using SSE with OpenAI format
async fn create_openai_streaming_response(
    bedrock: Arc<BedrockService>,
    request: ConverseRequest,
    request_id: &str,
    original_model: &str,
    include_usage: bool,
    usage_ctx: UsageContext,
) -> Result<SseStream, OpenAIApiError> {
    // Get streaming response from Bedrock
    let mut stream_response = bedrock.converse_stream(request).await.map_err(|e| {
        tracing::error!(error = %e, "Bedrock ConverseStream API call failed");
        OpenAIApiError::from_bedrock_error(&e)
    })?;

    let cred_name = stream_response.credential_name.clone();
    let model_id = original_model.to_string();
    let req_id = request_id.to_string();
    let completion_id = generate_completion_id();
    let created = current_timestamp();
    let bedrock_clone = bedrock.clone();

    // Create the SSE stream
    let stream = async_stream::stream! {
        let mut tool_call_index: i32 = 0;
        let mut block_to_tool_index: std::collections::HashMap<i32, i32> = std::collections::HashMap::new();
        let mut total_input_tokens: i32 = 0;
        let mut total_output_tokens: i32 = 0;
        let mut sent_role = false;

        tracing::debug!(request_id = %req_id, "Starting OpenAI SSE stream");

        // Process Bedrock ConverseStream events
        loop {
            match stream_response.recv().await {
                Ok(Some(event)) => {
                    match event {
                        ConverseStreamOutput::MessageStart(_) => {
                            // Send initial chunk with role
                            if !sent_role {
                                sent_role = true;
                                let chunk = ChatCompletionChunk {
                                    id: completion_id.clone(),
                                    object: "chat.completion.chunk".to_string(),
                                    created,
                                    model: model_id.clone(),
                                    choices: vec![ChunkChoice {
                                        index: 0,
                                        delta: ChunkDelta {
                                            role: Some(ChatRole::Assistant),
                                            content: None,
                                            tool_calls: None,
                                        },
                                        finish_reason: None,
                                        logprobs: None,
                                    }],
                                    system_fingerprint: None,
                                    usage: None,
                                };
                                let json = serde_json::to_string(&chunk).unwrap_or_default();
                                yield Ok(Event::default().data(json));
                            }
                        }

                        ConverseStreamOutput::ContentBlockStart(block_start) => {
                            let block_index = block_start.content_block_index();

                            if let Some(aws_sdk_bedrockruntime::types::ContentBlockStart::ToolUse(tool_start)) = block_start.start() {
                                // Assign tool call index
                                block_to_tool_index.insert(block_index, tool_call_index);

                                let chunk = ChatCompletionChunk {
                                    id: completion_id.clone(),
                                    object: "chat.completion.chunk".to_string(),
                                    created,
                                    model: model_id.clone(),
                                    choices: vec![ChunkChoice {
                                        index: 0,
                                        delta: ChunkDelta {
                                            role: None,
                                            content: None,
                                            tool_calls: Some(vec![ToolCallDelta {
                                                index: tool_call_index,
                                                id: Some(tool_start.tool_use_id().to_string()),
                                                tool_type: Some("function".to_string()),
                                                function: Some(FunctionCallDelta {
                                                    name: Some(tool_start.name().to_string()),
                                                    arguments: None,
                                                }),
                                            }]),
                                        },
                                        finish_reason: None,
                                        logprobs: None,
                                    }],
                                    system_fingerprint: None,
                                    usage: None,
                                };
                                let json = serde_json::to_string(&chunk).unwrap_or_default();
                                yield Ok(Event::default().data(json));

                                tool_call_index += 1;
                            }
                        }

                        ConverseStreamOutput::ContentBlockDelta(block_delta) => {
                            let block_index = block_delta.content_block_index();

                            if let Some(delta) = block_delta.delta() {
                                match delta {
                                    aws_sdk_bedrockruntime::types::ContentBlockDelta::Text(text) => {
                                        let chunk = ChatCompletionChunk {
                                            id: completion_id.clone(),
                                            object: "chat.completion.chunk".to_string(),
                                            created,
                                            model: model_id.clone(),
                                            choices: vec![ChunkChoice {
                                                index: 0,
                                                delta: ChunkDelta {
                                                    role: None,
                                                    content: Some(text.to_string()),
                                                    tool_calls: None,
                                                },
                                                finish_reason: None,
                                                logprobs: None,
                                            }],
                                            system_fingerprint: None,
                                            usage: None,
                                        };
                                        let json = serde_json::to_string(&chunk).unwrap_or_default();
                                        yield Ok(Event::default().data(json));
                                    }
                                    aws_sdk_bedrockruntime::types::ContentBlockDelta::ToolUse(tool_delta) => {
                                        let tc_index = block_to_tool_index.get(&block_index).copied().unwrap_or(0);

                                        let chunk = ChatCompletionChunk {
                                            id: completion_id.clone(),
                                            object: "chat.completion.chunk".to_string(),
                                            created,
                                            model: model_id.clone(),
                                            choices: vec![ChunkChoice {
                                                index: 0,
                                                delta: ChunkDelta {
                                                    role: None,
                                                    content: None,
                                                    tool_calls: Some(vec![ToolCallDelta {
                                                        index: tc_index,
                                                        id: None,
                                                        tool_type: None,
                                                        function: Some(FunctionCallDelta {
                                                            name: None,
                                                            arguments: Some(tool_delta.input().to_string()),
                                                        }),
                                                    }]),
                                                },
                                                finish_reason: None,
                                                logprobs: None,
                                            }],
                                            system_fingerprint: None,
                                            usage: None,
                                        };
                                        let json = serde_json::to_string(&chunk).unwrap_or_default();
                                        yield Ok(Event::default().data(json));
                                    }
                                    _ => {}
                                }
                            }
                        }

                        ConverseStreamOutput::ContentBlockStop(_) => {
                            // No action needed for OpenAI format
                        }

                        ConverseStreamOutput::MessageStop(stop_event) => {
                            let finish_reason = match stop_event.stop_reason() {
                                aws_sdk_bedrockruntime::types::StopReason::EndTurn => "stop".to_string(),
                                aws_sdk_bedrockruntime::types::StopReason::MaxTokens => "length".to_string(),
                                aws_sdk_bedrockruntime::types::StopReason::StopSequence => "stop".to_string(),
                                aws_sdk_bedrockruntime::types::StopReason::ToolUse => "tool_calls".to_string(),
                                _ => "stop".to_string(),
                            };

                            // Send final chunk with finish_reason
                            let chunk = ChatCompletionChunk {
                                id: completion_id.clone(),
                                object: "chat.completion.chunk".to_string(),
                                created,
                                model: model_id.clone(),
                                choices: vec![ChunkChoice {
                                    index: 0,
                                    delta: ChunkDelta::default(),
                                    finish_reason: Some(finish_reason),
                                    logprobs: None,
                                }],
                                system_fingerprint: None,
                                usage: None,
                            };
                            let json = serde_json::to_string(&chunk).unwrap_or_default();
                            yield Ok(Event::default().data(json));
                        }

                        ConverseStreamOutput::Metadata(metadata_event) => {
                            if let Some(usage) = metadata_event.usage() {
                                total_input_tokens = usage.input_tokens();
                                total_output_tokens = usage.output_tokens();
                            }
                        }

                        _ => {
                            tracing::debug!(request_id = %req_id, "Unknown stream event");
                        }
                    }
                }
                Ok(None) => {
                    // Stream ended
                    tracing::debug!(request_id = %req_id, "OpenAI stream ended");

                    // Send usage chunk if requested
                    if include_usage {
                        let usage_chunk = ChatCompletionChunk {
                            id: completion_id.clone(),
                            object: "chat.completion.chunk".to_string(),
                            created,
                            model: model_id.clone(),
                            choices: vec![],
                            system_fingerprint: None,
                            usage: Some(CompletionUsage {
                                prompt_tokens: total_input_tokens,
                                completion_tokens: total_output_tokens,
                                total_tokens: total_input_tokens + total_output_tokens,
                                completion_tokens_details: None,
                            }),
                        };
                        let json = serde_json::to_string(&usage_chunk).unwrap_or_default();
                        yield Ok(Event::default().data(json));
                    }

                    // Send [DONE] marker
                    yield Ok(Event::default().data("[DONE]"));
                    bedrock_clone.record_success(&cred_name);
                    break;
                }
                Err(e) => {
                    tracing::error!(request_id = %req_id, error = %e, "Stream error");
                    let error_response = OpenAIErrorResponse::server_error(&e.to_string());
                    let json = serde_json::to_string(&error_response).unwrap_or_default();
                    yield Ok(Event::default().data(json));
                    bedrock_clone.record_failure(&cred_name);
                    break;
                }
            }
        }

        {
            let mut u = usage_ctx.stream_usage.lock().await;
            u.input_tokens = total_input_tokens;
            u.output_tokens = total_output_tokens;
        }
    };

    Ok(Box::pin(stream))
}

// ============================================================================
// Gemini Backend Handler (OpenAI → Gemini)
// ============================================================================

/// Handle request using Gemini backend, converting OpenAI → Gemini format
async fn handle_gemini_backend(
    state: &AppState,
    request: &ChatCompletionRequest,
    target_model_id: &str,
    request_id: &str,
    usage_ctx: &UsageContext,
    start_time: Instant,
) -> Result<ChatCompletionApiResponse, OpenAIApiError> {
    let gemini_pool = state
        .dynamic
        .read()
        .await
        .gemini_pool
        .clone()
        .ok_or_else(|| {
            OpenAIApiError::internal_error(
                "Gemini backend is not configured. Add a 'gemini' entry to the backends table.",
            )
        })?;
    let gemini_instance = gemini_pool
        .get_next()
        .ok_or_else(|| OpenAIApiError::internal_error("No healthy Gemini backend available"))?;
    let gemini_service = &gemini_instance.service;

    // Convert OpenAI request to Gemini format
    let converter = OpenAIToGeminiConverter::new();
    let (gemini_model, gemini_request) = converter
        .convert_request(request)
        .map_err(|e| OpenAIApiError::bad_request(format!("Request conversion error: {e}")))?;

    // Use the resolved target_model_id if set, otherwise use the converted model name
    let final_model = if target_model_id.is_empty() {
        gemini_model.clone()
    } else {
        target_model_id.to_string()
    };

    tracing::debug!(
        request_id = %request_id,
        gemini_model = %final_model,
        "Routing OpenAI request to Gemini backend"
    );

    if request.stream {
        let response_converter = GeminiToOpenAIConverter::new();
        let original_model = request.model.clone();
        let final_model_clone = final_model.clone();
        let req_id = request_id.to_string();

        let (mut stream_response, credential_name) = gemini_service
            .generate_content_stream(&final_model, &gemini_request)
            .await
            .map_err(|e| {
                tracing::error!(error = %e, "Gemini stream API call failed");
                OpenAIApiError::internal_error(format!("Gemini API error: {e}"))
            })?;

        let gemini_service_clone = gemini_service.clone();
        let cred_name = credential_name.clone();
        let pool_clone = gemini_pool.clone();
        let inst_name = gemini_instance.name().to_string();
        let stream_usage = usage_ctx.stream_usage.clone();

        let stream = async_stream::stream! {
            let mut chunk_index: i32 = 0;
            let mut stream_error = false;
            let mut total_input_tokens: i32 = 0;
            let mut total_output_tokens: i32 = 0;

            loop {
                match stream_response.recv().await {
                    Ok(Some(chunk)) => {
                        // Extract usage if available
                        if let Some(ref usage) = chunk.usage_metadata {
                            total_input_tokens = usage.prompt_token_count;
                            total_output_tokens = usage.candidates_token_count;
                        }
                        match response_converter.convert_stream_chunk(&chunk, &original_model, chunk_index) {
                            Ok(oai_chunk) => {
                                if let Ok(json) = serde_json::to_string(&oai_chunk) {
                                    yield Ok(axum::response::sse::Event::default().data(json));
                                }
                                chunk_index += 1;
                            }
                            Err(e) => {
                                tracing::warn!(request_id = %req_id, error = %e, "Failed to convert Gemini stream chunk");
                            }
                        }
                    }
                    Ok(None) => {
                        tracing::debug!(request_id = %req_id, "Gemini stream ended");
                        // Send [DONE]
                        yield Ok(axum::response::sse::Event::default().data("[DONE]"));
                        break;
                    }
                    Err(e) => {
                        stream_error = true;
                        tracing::error!(request_id = %req_id, error = %e, "Gemini stream error");
                        break;
                    }
                }
            }

            if stream_error {
                gemini_service_clone.record_failure(&cred_name);
                pool_clone.record_failure(&inst_name);
            } else {
                gemini_service_clone.record_success(&cred_name);
                pool_clone.record_success(&inst_name);
            }
            let _ = final_model_clone;

            {
                let mut u = stream_usage.lock().await;
                u.input_tokens = total_input_tokens;
                u.output_tokens = total_output_tokens;
            }
        };

        return Ok(ChatCompletionApiResponse::Stream(Box::pin(stream)));
    }

    // Non-streaming
    let gemini_response = gemini_service
        .generate_content(&final_model, &gemini_request)
        .await
        .map_err(|e| {
            tracing::error!(error = %e, "Gemini API call failed");
            OpenAIApiError::internal_error(format!("Gemini API error: {e}"))
        })?;

    let response_converter = GeminiToOpenAIConverter::new();
    let response = response_converter
        .convert_response(&gemini_response, &request.model)
        .map_err(|e| OpenAIApiError::internal_error(format!("Response conversion error: {e}")))?;

    let duration_ms = start_time.elapsed().as_millis();
    tracing::info!(
        request_id = %request_id,
        gemini_model = %final_model,
        prompt_tokens = response.usage.prompt_tokens,
        completion_tokens = response.usage.completion_tokens,
        duration_ms = duration_ms,
        "Gemini backend request completed"
    );

    Ok(ChatCompletionApiResponse::Json(axum::Json(response)))
}

// ============================================================================
// Anthropic Backend Handler (OpenAI → Anthropic)
// ============================================================================

/// Handle request using Anthropic backend, converting OpenAI → Anthropic format
async fn handle_anthropic_backend(
    state: &AppState,
    request: &ChatCompletionRequest,
    target_model_id: &str,
    request_id: &str,
    usage_ctx: &UsageContext,
    start_time: Instant,
) -> Result<ChatCompletionApiResponse, OpenAIApiError> {
    use crate::converters::anthropic_openai::{
        AnthropicToOpenAIStreamState, OpenAIToAnthropicConverter,
    };
    let pool = state
        .dynamic
        .read()
        .await
        .anthropic_pool
        .clone()
        .ok_or_else(|| {
            OpenAIApiError::internal_error(
                "Anthropic backend is not configured. Add an 'anthropic' entry to the backends table.",
            )
        })?;
    let instance = pool
        .get_next()
        .ok_or_else(|| OpenAIApiError::internal_error("No healthy Anthropic backend available"))?;
    let svc = &instance.service;

    // Convert OpenAI request to Anthropic format
    let converter = OpenAIToAnthropicConverter::new();
    let mut anthropic_request = converter
        .convert_request(request, target_model_id)
        .map_err(|e| OpenAIApiError::bad_request(format!("Request conversion error: {e}")))?;

    // Resolve service_tier: backend config → map to Anthropic provider value
    anthropic_request.service_tier = crate::services::service_tier::resolve_for_provider(
        instance.service_tier(),
        request.service_tier.as_deref(),
        "anthropic",
    );

    let body_bytes = serde_json::to_vec(&anthropic_request)
        .map_err(|e| OpenAIApiError::internal_error(e.to_string()))?;

    tracing::debug!(
        request_id = %request_id,
        target_model = %target_model_id,
        stream = request.stream,
        "Routing OpenAI request to Anthropic backend"
    );

    let (resp, credential_name) =
        svc.forward("/v1/messages", body_bytes, &[])
            .await
            .map_err(|e| {
                tracing::error!(error = %e, "Anthropic backend request failed");
                OpenAIApiError::internal_error(format!("Anthropic API error: {e}"))
            })?;

    let upstream_status = resp.status().as_u16();

    if !(200..300).contains(&upstream_status) {
        let error_body = resp.text().await.unwrap_or_default();
        tracing::error!(
            request_id = %request_id,
            status = upstream_status,
            body = %error_body,
            "Anthropic backend returned error"
        );
        let status = axum::http::StatusCode::from_u16(upstream_status)
            .unwrap_or(axum::http::StatusCode::BAD_GATEWAY);
        return Err(OpenAIApiError {
            status,
            error: OpenAIErrorResponse::server_error(&error_body),
        });
    }

    if request.stream {
        let req_id = request_id.to_string();
        let original_model = request.model.clone();
        let svc_clone = svc.clone();
        let cred_name = credential_name.clone();
        let include_usage = request
            .stream_options
            .as_ref()
            .map(|o| o.include_usage)
            .unwrap_or(false);

        let stream_usage = usage_ctx.stream_usage.clone();

        let stream = async_stream::stream! {
            let mut response = resp;
            let mut buffer = String::new();
            let mut stream_error = false;
            let response_converter = crate::converters::anthropic_openai::OpenAIToAnthropicConverter::new();
            let mut conv_state = AnthropicToOpenAIStreamState {
                model: original_model.clone(),
                include_usage,
                ..Default::default()
            };
            let mut input_tokens: i32 = 0;
            let mut output_tokens: i32 = 0;

            'outer: loop {
                match response.chunk().await {
                    Ok(Some(chunk)) => {
                        if let Ok(text) = std::str::from_utf8(&chunk) {
                            buffer.push_str(text);
                        }

                        while let Some(pos) = buffer.find("\n\n") {
                            let event_str = buffer[..pos].to_string();
                            buffer = buffer[pos + 2..].to_string();

                            let mut event_type: Option<String> = None;
                            let mut data_line: Option<String> = None;

                            for line in event_str.lines() {
                                if let Some(evt) = line.strip_prefix("event: ") {
                                    event_type = Some(evt.trim().to_string());
                                } else if let Some(d) = line.strip_prefix("data: ") {
                                    data_line = Some(d.trim().to_string());
                                }
                            }

                            if let Some(data) = data_line {
                                if data == "[DONE]" {
                                    break 'outer;
                                }

                                // Extract usage from upstream Anthropic SSE events
                                if let Some(ref evt) = event_type {
                                    if let Ok(parsed) = serde_json::from_str::<serde_json::Value>(&data) {
                                        match evt.as_str() {
                                            "message_start" => {
                                                if let Some(usage) = parsed.pointer("/message/usage") {
                                                    if let Some(v) = usage.get("input_tokens").and_then(|v| v.as_i64()) {
                                                        input_tokens = v as i32;
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

                                let evt = event_type.as_deref().unwrap_or("");
                                let chunks = response_converter.convert_stream_chunk_to_openai(evt, &data, &mut conv_state);
                                for json in chunks {
                                    yield Ok(axum::response::sse::Event::default().data(json));
                                }
                            }
                        }
                    }
                    Ok(None) => {
                        tracing::debug!(request_id = %req_id, "Anthropic backend stream ended");
                        // Send [DONE]
                        yield Ok(axum::response::sse::Event::default().data("[DONE]"));
                        break;
                    }
                    Err(e) => {
                        stream_error = true;
                        tracing::error!(request_id = %req_id, error = %e, "Anthropic backend stream error");
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
            }
        };

        return Ok(ChatCompletionApiResponse::Stream(Box::pin(stream)));
    }

    // Non-streaming: read body, convert Anthropic → OpenAI response
    let body_text = resp.text().await.map_err(|e| {
        OpenAIApiError::internal_error(format!("Failed to read Anthropic response: {e}"))
    })?;

    svc.record_success(&credential_name);

    let anthropic_response: crate::schemas::anthropic::MessageResponse =
        serde_json::from_str(&body_text).map_err(|e| {
            OpenAIApiError::internal_error(format!("Failed to parse Anthropic response: {e}"))
        })?;

    let response_converter = crate::converters::anthropic_openai::OpenAIToAnthropicConverter::new();
    let response = response_converter
        .convert_response(&anthropic_response, &request.model)
        .map_err(|e| OpenAIApiError::internal_error(format!("Response conversion error: {e}")))?;

    let duration_ms = start_time.elapsed().as_millis();
    tracing::info!(
        request_id = %request_id,
        target_model = %target_model_id,
        prompt_tokens = response.usage.prompt_tokens,
        completion_tokens = response.usage.completion_tokens,
        duration_ms = duration_ms,
        "Anthropic backend request completed"
    );

    Ok(ChatCompletionApiResponse::Json(axum::Json(response)))
}

// ============================================================================
// OpenAI Passthrough Handler
// ============================================================================

/// Handle request using OpenAI passthrough backend
async fn handle_openai_passthrough(
    state: &AppState,
    request: &ChatCompletionRequest,
    target_model_id: &str,
    request_id: &str,
    client_headers: &HeaderMap,
    usage_ctx: &UsageContext,
    start_time: Instant,
) -> Result<ChatCompletionApiResponse, OpenAIApiError> {
    let pool = state
        .dynamic
        .read()
        .await
        .openai_pool
        .clone()
        .ok_or_else(|| {
            OpenAIApiError::internal_error(
                "OpenAI backend is not configured. Add an 'openai' entry to the backends table.",
            )
        })?;
    let instance = pool
        .get_next()
        .ok_or_else(|| OpenAIApiError::internal_error("No healthy OpenAI backend available"))?;
    let svc = &instance.service;

    // Serialize the request and replace model with resolved target model id
    let mut body_value =
        serde_json::to_value(request).map_err(|e| OpenAIApiError::internal_error(e.to_string()))?;
    body_value["model"] = serde_json::Value::String(target_model_id.to_string());

    // Resolve service_tier: backend config → map to OpenAI provider value
    if let Some(obj) = body_value.as_object_mut() {
        match crate::services::service_tier::resolve_for_provider(
            instance.service_tier(),
            request.service_tier.as_deref(),
            "openai",
        ) {
            Some(tier) => {
                obj.insert("service_tier".to_string(), serde_json::json!(tier));
            }
            None => {
                obj.remove("service_tier");
            }
        }
    }

    let body_bytes = serde_json::to_vec(&body_value)
        .map_err(|e| OpenAIApiError::internal_error(e.to_string()))?;

    // Forward only safe passthrough headers
    let mut extra_headers: Vec<(String, String)> = Vec::new();
    if let Some(val) = client_headers.get("openai-organization") {
        if let Ok(v) = val.to_str() {
            extra_headers.push(("openai-organization".to_string(), v.to_string()));
        }
    }

    tracing::debug!(
        request_id = %request_id,
        target_model = %target_model_id,
        stream = request.stream,
        "Routing to OpenAI passthrough"
    );

    let (resp, credential_name) = svc
        .forward("/v1/chat/completions", body_bytes, &extra_headers)
        .await
        .map_err(|e| {
            tracing::error!(error = %e, "OpenAI passthrough request failed");
            OpenAIApiError::internal_error(format!("OpenAI API error: {e}"))
        })?;

    let upstream_status = resp.status().as_u16();

    if !(200..300).contains(&upstream_status) {
        let error_body = resp.text().await.unwrap_or_default();
        tracing::error!(
            request_id = %request_id,
            status = upstream_status,
            body = %error_body,
            "OpenAI passthrough returned error"
        );
        let status = StatusCode::from_u16(upstream_status).unwrap_or(StatusCode::BAD_GATEWAY);
        return Err(OpenAIApiError {
            status,
            error: OpenAIErrorResponse::server_error(&error_body),
        });
    }

    if request.stream {
        let sse_stream = proxy_openai_sse_stream(
            resp,
            request_id,
            svc.clone(),
            credential_name,
            usage_ctx.clone(),
        )
        .await?;
        return Ok(ChatCompletionApiResponse::Stream(sse_stream));
    }

    // Non-streaming
    let body_text = resp.text().await.map_err(|e| {
        OpenAIApiError::internal_error(format!("Failed to read OpenAI response: {e}"))
    })?;

    svc.record_success(&credential_name);

    let duration_ms = start_time.elapsed().as_millis();
    tracing::info!(
        request_id = %request_id,
        target_model = %target_model_id,
        duration_ms = duration_ms,
        "OpenAI passthrough completed"
    );

    let response: ChatCompletionResponse = serde_json::from_str(&body_text)
        .map_err(|e| OpenAIApiError::internal_error(e.to_string()))?;
    Ok(ChatCompletionApiResponse::Json(Json(response)))
}

/// Proxy OpenAI SSE stream from upstream to client
async fn proxy_openai_sse_stream(
    upstream: reqwest::Response,
    request_id: &str,
    svc: Arc<crate::services::PassthroughService>,
    credential_name: String,
    usage_ctx: UsageContext,
) -> Result<SseStream, OpenAIApiError> {
    let req_id = request_id.to_string();

    let stream = async_stream::stream! {
        let mut response = upstream;
        let mut buffer = String::new();
        let mut stream_error = false;
        let mut got_done = false;
        let mut prompt_tokens: i32 = 0;
        let mut completion_tokens: i32 = 0;

        'outer: loop {
            match response.chunk().await {
                Ok(Some(chunk)) => {
                    if let Ok(text) = std::str::from_utf8(&chunk) {
                        buffer.push_str(text);
                    }

                    // Parse complete SSE lines (OpenAI uses "data: ...\n\n" format)
                    while let Some(pos) = buffer.find("\n\n") {
                        let line = buffer[..pos].to_string();
                        buffer = buffer[pos + 2..].to_string();

                        if let Some(data) = line.strip_prefix("data: ") {
                            let data = data.trim();

                            // Extract usage from OpenAI streaming chunks (usually in the final chunk before [DONE])
                            if data != "[DONE]" {
                                if let Ok(parsed) = serde_json::from_str::<serde_json::Value>(data) {
                                    if let Some(usage) = parsed.get("usage") {
                                        if let Some(v) = usage.get("prompt_tokens").and_then(|v| v.as_i64()) {
                                            prompt_tokens = v as i32;
                                        }
                                        if let Some(v) = usage.get("completion_tokens").and_then(|v| v.as_i64()) {
                                            completion_tokens = v as i32;
                                        }
                                    }
                                }
                            }

                            // Forward [DONE] and JSON data
                            yield Ok(Event::default().data(data));
                            if data == "[DONE]" {
                                got_done = true;
                                break 'outer;
                            }
                        }
                    }
                }
                Ok(None) => {
                    tracing::debug!(request_id = %req_id, "OpenAI passthrough stream ended");
                    break;
                }
                Err(e) => {
                    stream_error = true;
                    tracing::error!(request_id = %req_id, error = %e, "OpenAI passthrough stream error");
                    break;
                }
            }
        }

        if stream_error {
            svc.record_failure(&credential_name);
        } else {
            svc.record_success(&credential_name);
        }
        let _ = got_done;

        {
            let mut u = usage_ctx.stream_usage.lock().await;
            u.input_tokens = prompt_tokens;
            u.output_tokens = completion_tokens;
        }
    };

    Ok(Box::pin(stream))
}
