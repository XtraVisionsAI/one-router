//! OpenAI Chat Completions API endpoint
//!
//! This module implements the POST /v1/chat/completions endpoint for OpenAI API compatibility.
//! It handles request conversion from OpenAI format to Bedrock, calls the Converse API,
//! and converts responses back to OpenAI format.

use aws_sdk_bedrockruntime::types::ConverseStreamOutput;
use axum::{
    extract::State,
    http::{HeaderMap, StatusCode},
    response::{sse::Event, IntoResponse, Response, Sse},
    Json,
};
use futures::stream::Stream;
use std::convert::Infallible;
use std::time::Instant;
use uuid::Uuid;

use crate::converters::{openai_bedrock, OpenAIConversionError};
use crate::schemas::openai::{
    current_timestamp, generate_completion_id, ChatCompletionChunk, ChatCompletionRequest,
    ChatCompletionResponse, ChatRole, ChunkChoice, ChunkDelta, CompletionUsage, FunctionCallDelta,
    OpenAIErrorResponse, ToolCallDelta,
};
use crate::server::state::AppState;
use crate::services::{BedrockError, BedrockService, ConverseRequest};

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
            error: OpenAIErrorResponse::invalid_request(&message.into()),
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
                Self::bad_request(format!("Model not found: {}", msg))
            }
            BedrockError::AccessDenied(msg) => Self::unauthorized(msg),
            BedrockError::ServiceUnavailable(msg) => Self::internal_error(msg),
            BedrockError::InternalError(msg) => Self::internal_error(msg),
            BedrockError::Serialization(msg) => {
                Self::bad_request(format!("Serialization error: {}", msg))
            }
            BedrockError::Deserialization(msg) => {
                Self::internal_error(format!("Response error: {}", msg))
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
                Self::bad_request(format!("Invalid base64: {}", msg))
            }
            OpenAIConversionError::MissingField(field) => {
                Self::bad_request(format!("Missing required field: {}", field))
            }
            OpenAIConversionError::UnsupportedFeature(msg) => {
                Self::bad_request(format!("Unsupported feature: {}", msg))
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

/// Enum to represent either a JSON response or an SSE stream (OpenAI format)
pub enum ChatCompletionApiResponse {
    Json(Json<ChatCompletionResponse>),
    #[allow(clippy::type_complexity)]
    Stream(Sse<std::pin::Pin<Box<dyn Stream<Item = Result<Event, Infallible>> + Send>>>),
}

impl IntoResponse for ChatCompletionApiResponse {
    fn into_response(self) -> Response {
        match self {
            ChatCompletionApiResponse::Json(json) => json.into_response(),
            ChatCompletionApiResponse::Stream(sse) => sse.into_response(),
        }
    }
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
    _headers: HeaderMap,
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

    // Currently chat completions only supports bedrock; gemini returns error
    if resolved.provider == "gemini" {
        return Err(OpenAIApiError::bad_request(
            "Gemini models are not supported via the OpenAI chat completions endpoint. Use the /v1/messages endpoint instead.",
        ));
    }

    let bedrock = state.bedrock.as_ref().ok_or_else(|| {
        OpenAIApiError::internal_error(
            "Bedrock backend is not configured. Add a 'bedrock' entry to the backends table.",
        )
    })?;

    let bedrock_model = &resolved.target_model_id;

    tracing::info!(
        request_id = %request_id,
        openai_model = %request.model,
        bedrock_model = %bedrock_model,
        provider = %resolved.provider,
        message_count = request.messages.len(),
        max_tokens = request.max_tokens.or(request.max_completion_tokens),
        stream = request.stream,
        "Processing OpenAI chat completions request"
    );

    // Check for unsupported features
    if request.n.map(|n| n > 1).unwrap_or(false) {
        return Err(OpenAIApiError::bad_request(
            "Only n=1 is supported. Multiple completions are not available.",
        ));
    }

    // Build Converse request
    let converse_request = openai_bedrock::convert_request(&request, bedrock_model)
        .map_err(|e| OpenAIApiError::from_conversion_error(&e))?;

    // Handle streaming vs non-streaming
    if request.stream {
        let include_usage = request
            .stream_options
            .as_ref()
            .map(|o| o.include_usage)
            .unwrap_or(false);

        let sse_stream = create_openai_streaming_response(
            bedrock,
            converse_request,
            &request_id,
            &request.model,
            include_usage,
        )
        .await?;

        return Ok(ChatCompletionApiResponse::Stream(sse_stream));
    }

    // Non-streaming response
    let converse_output = bedrock.converse(converse_request).await.map_err(|e| {
        tracing::error!(error = %e, "Bedrock Converse API call failed");
        OpenAIApiError::from_bedrock_error(&e)
    })?;

    // Convert response to OpenAI format
    let response = openai_bedrock::convert_response(converse_output, &request.model)
        .map_err(|e| OpenAIApiError::from_conversion_error(&e))?;

    let duration_ms = start_time.elapsed().as_millis();

    tracing::info!(
        request_id = %request_id,
        model = %response.model,
        bedrock_model = %bedrock_model,
        prompt_tokens = response.usage.prompt_tokens,
        completion_tokens = response.usage.completion_tokens,
        finish_reason = ?response.choices.first().and_then(|c| c.finish_reason.as_ref()),
        duration_ms = duration_ms,
        "OpenAI chat completion request completed"
    );

    Ok(ChatCompletionApiResponse::Json(Json(response)))
}

// ============================================================================
// Streaming Response Handler
// ============================================================================

/// Create a streaming response using SSE with OpenAI format
async fn create_openai_streaming_response(
    bedrock: &BedrockService,
    request: ConverseRequest,
    request_id: &str,
    original_model: &str,
    include_usage: bool,
) -> Result<
    Sse<std::pin::Pin<Box<dyn Stream<Item = Result<Event, Infallible>> + Send>>>,
    OpenAIApiError,
> {
    // Get streaming response from Bedrock
    let mut stream_response = bedrock.converse_stream(request).await.map_err(|e| {
        tracing::error!(error = %e, "Bedrock ConverseStream API call failed");
        OpenAIApiError::from_bedrock_error(&e)
    })?;

    let model_id = original_model.to_string();
    let req_id = request_id.to_string();
    let completion_id = generate_completion_id();
    let created = current_timestamp();

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
                    break;
                }
                Err(e) => {
                    tracing::error!(request_id = %req_id, error = %e, "Stream error");
                    let error_response = OpenAIErrorResponse::server_error(&e.to_string());
                    let json = serde_json::to_string(&error_response).unwrap_or_default();
                    yield Ok(Event::default().data(json));
                    break;
                }
            }
        }
    };

    Ok(Sse::new(Box::pin(stream)))
}
