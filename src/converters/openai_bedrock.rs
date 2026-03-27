//! OpenAI <-> Bedrock converter
//!
//! Handles conversion in both directions:
//! - OpenAI Chat Completions API request → Bedrock Converse API request
//! - Bedrock Converse API response → OpenAI Chat Completions API response
//!
//! Uses AWS SDK types directly.

use aws_sdk_bedrockruntime::types::{
    CachePointBlock, CachePointType, ContentBlock as SdkContentBlock, ConversationRole,
    InferenceConfiguration, Message as SdkMessage, SystemContentBlock, Tool as SdkTool,
    ToolConfiguration, ToolInputSchema as SdkToolInputSchema, ToolResultContentBlock,
    ToolResultStatus, ToolSpecification, ToolUseBlock,
};
use thiserror::Error;

use crate::converters::sdk_utils::{document_to_json, json_to_document};
use crate::schemas::openai::{
    current_timestamp, generate_completion_id, AssistantMessage, ChatCompletionResponse, ChatRole,
    Choice, CompletionUsage, FunctionCall, ToolCall,
};
use crate::services::ConverseRequest;

// ============================================================================
// Error Types
// ============================================================================

/// Errors that can occur during OpenAI <-> Bedrock conversion.
#[derive(Debug, Error)]
pub enum OpenAIConversionError {
    #[error("Invalid content: {0}")]
    InvalidContent(String),

    #[error("Invalid message: {0}")]
    InvalidMessage(String),

    #[error("Invalid tool configuration: {0}")]
    InvalidTool(String),

    #[error("Base64 decode error: {0}")]
    Base64DecodeError(String),

    #[error("Missing required field: {0}")]
    MissingField(String),

    #[error("Unsupported feature: {0}")]
    UnsupportedFeature(String),

    #[error("Invalid image URL: {0}")]
    InvalidImageUrl(String),
}

// ============================================================================
// Request Conversion (OpenAI → Bedrock)
// ============================================================================

fn bedrock_cache_point() -> CachePointBlock {
    CachePointBlock::builder()
        .r#type(CachePointType::Default)
        .build()
        .expect("CachePointBlock requires only r#type which is set")
}

/// Convert an OpenAI ChatCompletionRequest to a Bedrock ConverseRequest.
pub fn convert_request(
    request: &crate::schemas::openai::ChatCompletionRequest,
    bedrock_model: &str,
) -> Result<ConverseRequest, OpenAIConversionError> {
    // Split system and chat messages
    let (system_messages, chat_messages): (Vec<_>, Vec<_>) = request
        .messages
        .iter()
        .partition(|m| m.role == ChatRole::System);

    let mut sdk_messages = convert_openai_messages_to_sdk(&chat_messages)?;

    // Auto-inject CachePoint at the end of the last user message
    if let Some(last_user) = sdk_messages
        .iter_mut()
        .rev()
        .find(|m| m.role() == &ConversationRole::User)
    {
        let mut content = last_user.content().to_vec();
        content.push(SdkContentBlock::CachePoint(bedrock_cache_point()));
        *last_user = SdkMessage::builder()
            .role(ConversationRole::User)
            .set_content(Some(content))
            .build()
            .map_err(|e| OpenAIConversionError::InvalidMessage(e.to_string()))?;
    }

    // Build inference config
    let max_tokens = request
        .max_completion_tokens
        .or(request.max_tokens)
        .unwrap_or(4096);

    let mut inference_config = InferenceConfiguration::builder().max_tokens(max_tokens);

    if let Some(temp) = request.temperature {
        inference_config = inference_config.temperature(temp.clamp(0.0, 1.0));
    }
    if let Some(top_p) = request.top_p {
        inference_config = inference_config.top_p(top_p);
    }
    if let Some(ref stop) = request.stop {
        inference_config = inference_config.set_stop_sequences(Some(stop.to_vec()));
    }

    let mut converse_req = ConverseRequest::new(bedrock_model.to_string())
        .with_messages(sdk_messages)
        .with_inference_config(inference_config.build());

    // Convert system messages
    if !system_messages.is_empty() {
        let mut system_blocks: Vec<SystemContentBlock> = system_messages
            .iter()
            .filter_map(|m| {
                m.content
                    .as_ref()
                    .map(|c| SystemContentBlock::Text(c.to_string_content()))
            })
            .collect();

        if !system_blocks.is_empty() {
            // Auto-inject cache point after system prompt
            system_blocks.push(SystemContentBlock::CachePoint(bedrock_cache_point()));
            converse_req = converse_req.with_system(system_blocks);
        }
    }

    // Convert tools
    if let Some(ref tools) = request.tools {
        if !tools.is_empty() {
            let tool_config = convert_openai_tools_to_sdk_with_cache(tools)?;
            converse_req = converse_req.with_tool_config(tool_config);
        }
    }

    Ok(converse_req)
}

/// Convert OpenAI messages to SDK messages.
fn convert_openai_messages_to_sdk(
    messages: &[&crate::schemas::openai::ChatMessage],
) -> Result<Vec<SdkMessage>, OpenAIConversionError> {
    let mut sdk_messages = Vec::new();

    for msg in messages {
        let role = match msg.role {
            ChatRole::User => ConversationRole::User,
            ChatRole::Assistant => ConversationRole::Assistant,
            ChatRole::Tool => ConversationRole::User,
            ChatRole::System => continue,
        };

        let content_blocks = convert_openai_content_to_sdk(msg)?;

        if content_blocks.is_empty() {
            continue;
        }

        let sdk_msg = SdkMessage::builder()
            .role(role)
            .set_content(Some(content_blocks))
            .build()
            .map_err(|e| {
                OpenAIConversionError::InvalidMessage(format!("Failed to build message: {e}"))
            })?;

        sdk_messages.push(sdk_msg);
    }

    Ok(sdk_messages)
}

/// Convert OpenAI message content to SDK content blocks.
fn convert_openai_content_to_sdk(
    msg: &crate::schemas::openai::ChatMessage,
) -> Result<Vec<SdkContentBlock>, OpenAIConversionError> {
    use crate::schemas::openai::{ContentPart, MessageContent};

    // Handle tool role (tool results)
    if msg.role == ChatRole::Tool {
        let tool_use_id = msg.tool_call_id.as_ref().ok_or_else(|| {
            OpenAIConversionError::MissingField("tool_call_id for tool message".to_string())
        })?;

        let content_text = msg
            .content
            .as_ref()
            .map(|c| c.to_string_content())
            .unwrap_or_default();

        use aws_sdk_bedrockruntime::types::ToolResultBlock;

        let tool_result = ToolResultBlock::builder()
            .tool_use_id(tool_use_id)
            .set_content(Some(vec![ToolResultContentBlock::Text(content_text)]))
            .status(ToolResultStatus::Success)
            .build()
            .map_err(|e| {
                OpenAIConversionError::InvalidContent(format!("Failed to build tool result: {e}"))
            })?;

        return Ok(vec![SdkContentBlock::ToolResult(tool_result)]);
    }

    // Handle assistant messages with tool calls
    if msg.role == ChatRole::Assistant {
        if let Some(ref tool_calls) = msg.tool_calls {
            let mut blocks = Vec::new();

            // Add text content if present
            if let Some(ref content) = msg.content {
                let text = content.to_string_content();
                if !text.is_empty() {
                    blocks.push(SdkContentBlock::Text(text));
                }
            }

            // Add tool use blocks
            for tool_call in tool_calls {
                let input: serde_json::Value = serde_json::from_str(&tool_call.function.arguments)
                    .unwrap_or_else(|_| serde_json::json!({}));

                let tool_use = ToolUseBlock::builder()
                    .tool_use_id(&tool_call.id)
                    .name(&tool_call.function.name)
                    .input(json_to_document(&input))
                    .build()
                    .map_err(|e| {
                        OpenAIConversionError::InvalidContent(format!(
                            "Failed to build tool use: {e}"
                        ))
                    })?;

                blocks.push(SdkContentBlock::ToolUse(tool_use));
            }

            return Ok(blocks);
        }
    }

    // Handle regular content
    match &msg.content {
        Some(MessageContent::Text(text)) => Ok(vec![SdkContentBlock::Text(text.clone())]),
        Some(MessageContent::Parts(parts)) => {
            let mut blocks = Vec::new();
            for part in parts {
                match part {
                    ContentPart::Text { text } => {
                        blocks.push(SdkContentBlock::Text(text.clone()));
                    }
                    ContentPart::ImageUrl { image_url } => {
                        if image_url.url.starts_with("data:") {
                            let image_block = parse_data_url_to_image(&image_url.url)?;
                            blocks.push(image_block);
                        } else {
                            return Err(OpenAIConversionError::InvalidImageUrl(
                                "External image URLs are not supported. Use base64 data URLs."
                                    .to_string(),
                            ));
                        }
                    }
                }
            }
            Ok(blocks)
        }
        None => Ok(vec![]),
    }
}

/// Parse a data URL and convert to SDK ImageBlock.
fn parse_data_url_to_image(url: &str) -> Result<SdkContentBlock, OpenAIConversionError> {
    use aws_sdk_bedrockruntime::types::{ImageBlock, ImageFormat, ImageSource};
    use base64::{engine::general_purpose::STANDARD as BASE64, Engine};

    let parts: Vec<&str> = url.splitn(2, ',').collect();
    if parts.len() != 2 {
        return Err(OpenAIConversionError::InvalidImageUrl(
            "Invalid data URL format".to_string(),
        ));
    }

    let metadata = parts[0];
    let data = parts[1];

    let media_type = metadata
        .strip_prefix("data:")
        .and_then(|s| s.split(';').next())
        .ok_or_else(|| {
            OpenAIConversionError::InvalidImageUrl("Could not parse media type".to_string())
        })?;

    let format = match media_type {
        "image/png" => ImageFormat::Png,
        "image/jpeg" | "image/jpg" => ImageFormat::Jpeg,
        "image/gif" => ImageFormat::Gif,
        "image/webp" => ImageFormat::Webp,
        _ => ImageFormat::Png,
    };

    let bytes = BASE64
        .decode(data)
        .map_err(|e| OpenAIConversionError::Base64DecodeError(e.to_string()))?;

    let image = ImageBlock::builder()
        .format(format)
        .source(ImageSource::Bytes(
            aws_sdk_bedrockruntime::primitives::Blob::new(bytes),
        ))
        .build()
        .map_err(|e| {
            OpenAIConversionError::InvalidContent(format!("Failed to build image: {e}"))
        })?;

    Ok(SdkContentBlock::Image(image))
}

/// Convert OpenAI tools to SDK ToolConfiguration, appending a CachePoint after the last tool.
fn convert_openai_tools_to_sdk_with_cache(
    tools: &[crate::schemas::openai::Tool],
) -> Result<ToolConfiguration, OpenAIConversionError> {
    let mut sdk_tools = Vec::new();

    for tool in tools {
        if tool.tool_type != "function" {
            continue;
        }

        let input_schema = tool
            .function
            .parameters
            .clone()
            .unwrap_or(serde_json::json!({"type": "object", "properties": {}}));

        let tool_spec = ToolSpecification::builder()
            .name(&tool.function.name)
            .description(tool.function.description.as_deref().unwrap_or(""))
            .input_schema(SdkToolInputSchema::Json(json_to_document(&input_schema)))
            .build()
            .map_err(|e| {
                OpenAIConversionError::InvalidTool(format!("Failed to build tool spec: {e}"))
            })?;

        sdk_tools.push(SdkTool::ToolSpec(tool_spec));
    }

    if !sdk_tools.is_empty() {
        sdk_tools.push(SdkTool::CachePoint(bedrock_cache_point()));
    }

    ToolConfiguration::builder()
        .set_tools(Some(sdk_tools))
        .build()
        .map_err(|e| {
            OpenAIConversionError::InvalidTool(format!("Failed to build tool config: {e}"))
        })
}

// ============================================================================
// Response Conversion (Bedrock → OpenAI)
// ============================================================================

/// Convert Converse response to OpenAI ChatCompletionResponse.
pub fn convert_response(
    output: aws_sdk_bedrockruntime::operation::converse::ConverseOutput,
    original_model: &str,
) -> Result<ChatCompletionResponse, OpenAIConversionError> {
    let completion_id = generate_completion_id();
    let created = current_timestamp();

    // Convert content blocks
    let mut text_parts = Vec::new();
    let mut tool_calls = Vec::new();

    if let Some(aws_sdk_bedrockruntime::types::ConverseOutput::Message(msg)) = output.output() {
        for block in msg.content() {
            match block {
                SdkContentBlock::Text(text) => {
                    text_parts.push(text.clone());
                }
                SdkContentBlock::ToolUse(tool_use) => {
                    let input_json = document_to_json(tool_use.input());
                    tool_calls.push(ToolCall {
                        id: tool_use.tool_use_id().to_string(),
                        tool_type: "function".to_string(),
                        function: FunctionCall {
                            name: tool_use.name().to_string(),
                            arguments: serde_json::to_string(&input_json)
                                .unwrap_or_else(|_| "{}".to_string()),
                        },
                    });
                }
                _ => {}
            }
        }
    }

    // Convert stop reason
    let finish_reason = convert_stop_reason_to_openai(output.stop_reason());

    // Get usage
    let usage = output
        .usage()
        .map(|u| CompletionUsage {
            prompt_tokens: u.input_tokens(),
            completion_tokens: u.output_tokens(),
            total_tokens: u.input_tokens() + u.output_tokens(),
            completion_tokens_details: None,
        })
        .unwrap_or(CompletionUsage {
            prompt_tokens: 0,
            completion_tokens: 0,
            total_tokens: 0,
            completion_tokens_details: None,
        });

    let content = text_parts.join("");

    Ok(ChatCompletionResponse {
        id: completion_id,
        object: "chat.completion".to_string(),
        created,
        model: original_model.to_string(),
        choices: vec![Choice {
            index: 0,
            message: AssistantMessage {
                role: ChatRole::Assistant,
                content: if content.is_empty() {
                    None
                } else {
                    Some(content)
                },
                tool_calls: if tool_calls.is_empty() {
                    None
                } else {
                    Some(tool_calls)
                },
            },
            finish_reason: Some(finish_reason),
            logprobs: None,
        }],
        usage,
        system_fingerprint: None,
    })
}

/// Convert SDK StopReason to OpenAI finish_reason string.
pub fn convert_stop_reason_to_openai(reason: &aws_sdk_bedrockruntime::types::StopReason) -> String {
    match reason {
        aws_sdk_bedrockruntime::types::StopReason::EndTurn => "stop".to_string(),
        aws_sdk_bedrockruntime::types::StopReason::MaxTokens => "length".to_string(),
        aws_sdk_bedrockruntime::types::StopReason::StopSequence => "stop".to_string(),
        aws_sdk_bedrockruntime::types::StopReason::ToolUse => "tool_calls".to_string(),
        aws_sdk_bedrockruntime::types::StopReason::ContentFiltered => "content_filter".to_string(),
        _ => "stop".to_string(),
    }
}

// ============================================================================
// Tests
// ============================================================================

#[cfg(test)]
mod tests {
    use super::*;
    use crate::schemas::openai::{ChatCompletionRequest, ChatMessage, ChatRole, MessageContent};

    fn make_request(messages: Vec<ChatMessage>) -> ChatCompletionRequest {
        ChatCompletionRequest {
            model: "gpt-4".to_string(),
            messages,
            max_tokens: Some(100),
            max_completion_tokens: None,
            temperature: None,
            top_p: None,
            stream: false,
            stream_options: None,
            stop: None,
            presence_penalty: None,
            frequency_penalty: None,
            tools: None,
            tool_choice: None,
            n: None,
            response_format: None,
            user: None,
            seed: None,
            logprobs: None,
            top_logprobs: None,
        }
    }

    fn user_msg(text: &str) -> ChatMessage {
        ChatMessage {
            role: ChatRole::User,
            content: Some(MessageContent::Text(text.to_string())),
            name: None,
            tool_calls: None,
            tool_call_id: None,
        }
    }

    fn system_msg(text: &str) -> ChatMessage {
        ChatMessage {
            role: ChatRole::System,
            content: Some(MessageContent::Text(text.to_string())),
            name: None,
            tool_calls: None,
            tool_call_id: None,
        }
    }

    #[test]
    fn system_gets_cache_point_injected() {
        let req = make_request(vec![system_msg("You are helpful."), user_msg("Hello")]);
        let result = convert_request(&req, "anthropic.claude-3-5-sonnet").unwrap();
        let system = result.system.unwrap();
        assert_eq!(system.len(), 2);
        assert!(matches!(system[0], SystemContentBlock::Text(_)));
        assert!(system[1].is_cache_point());
    }

    #[test]
    fn last_user_message_gets_cache_point_injected() {
        let req = make_request(vec![user_msg("Hello")]);
        let result = convert_request(&req, "anthropic.claude-3-5-sonnet").unwrap();
        let messages = result.messages;
        let last_content = messages.last().unwrap().content();
        let last_block = last_content.last().unwrap();
        assert!(last_block.is_cache_point());
    }
}
