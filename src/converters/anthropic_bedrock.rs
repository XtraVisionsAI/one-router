//! Anthropic <-> Bedrock converter
//!
//! Handles conversion in both directions:
//! - Anthropic Messages API request → Bedrock Converse API request
//! - Bedrock Converse API response → Anthropic Messages API response
//!
//! Uses AWS SDK types directly (not the old custom `schemas::bedrock` types).

use aws_sdk_bedrockruntime::types::{
    CachePointBlock, CachePointType,
    ContentBlock as SdkContentBlock, ConversationRole, InferenceConfiguration,
    Message as SdkMessage, SystemContentBlock, Tool as SdkTool, ToolConfiguration,
    ToolInputSchema as SdkToolInputSchema, ToolResultContentBlock, ToolResultStatus,
    ToolSpecification, ToolUseBlock,
};
use thiserror::Error;
use uuid::Uuid;

use crate::converters::sdk_utils::{document_to_json, json_to_document};
use crate::schemas::anthropic::{
    ContentBlock, Message, MessageContent, MessageRequest, MessageResponse, StopReason,
    SystemContent, ToolResultValue, Usage,
};
use crate::services::ConverseRequest;
use crate::utils::ToolNameMapper;

// ============================================================================
// Error Types
// ============================================================================

/// Errors that can occur during Anthropic <-> Bedrock conversion.
#[derive(Debug, Error)]
pub enum ConversionError {
    #[error("Invalid content block: {0}")]
    InvalidContentBlock(String),

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
}

// ============================================================================
// Request Conversion (Anthropic → Bedrock)
// ============================================================================

/// Convert an Anthropic MessageRequest to a Bedrock ConverseRequest.
///
/// Returns the ConverseRequest and a ToolNameMapper for restoring long tool names in responses.
pub fn convert_request(
    request: &MessageRequest,
    bedrock_model: &str,
) -> Result<(ConverseRequest, ToolNameMapper), ConversionError> {
    let model_id = bedrock_model.to_string();

    // Convert messages
    let messages = convert_messages_to_sdk(&request.messages)?;

    // Build inference config
    let mut inference_config = InferenceConfiguration::builder().max_tokens(request.max_tokens);

    if let Some(temp) = request.temperature {
        inference_config = inference_config.temperature(temp);
    }
    if let Some(top_p) = request.top_p {
        inference_config = inference_config.top_p(top_p);
    }
    if let Some(ref stop_seqs) = request.stop_sequences {
        inference_config = inference_config.set_stop_sequences(Some(stop_seqs.clone()));
    }

    let mut converse_req = ConverseRequest::new(model_id)
        .with_messages(messages)
        .with_inference_config(inference_config.build());

    // Convert system prompt
    if let Some(ref system) = request.system {
        let system_blocks = convert_system_to_sdk(system);
        converse_req = converse_req.with_system(system_blocks);
    }

    // Convert tools with name mapping for long names
    let mut tool_name_mapper = ToolNameMapper::new();
    if let Some(ref tools) = request.tools {
        if !tools.is_empty() {
            let tool_config = convert_tools_to_sdk(tools, &mut tool_name_mapper)?;
            converse_req = converse_req.with_tool_config(tool_config);
        }
    }

    // Handle extended thinking via additional fields
    if let Some(ref thinking) = request.thinking {
        let mut thinking_map = std::collections::HashMap::new();
        thinking_map.insert(
            "type".to_string(),
            aws_smithy_types::Document::String(thinking.thinking_type.clone()),
        );
        if let Some(budget) = thinking.budget_tokens {
            thinking_map.insert(
                "budget_tokens".to_string(),
                aws_smithy_types::Document::Number(aws_smithy_types::Number::PosInt(budget as u64)),
            );
        }

        let additional = aws_smithy_types::Document::Object(std::collections::HashMap::from([(
            "thinking".to_string(),
            aws_smithy_types::Document::Object(thinking_map),
        )]));
        converse_req = converse_req.with_additional_fields(additional);
    }

    Ok((converse_req, tool_name_mapper))
}

/// Convert Anthropic messages to SDK messages.
fn convert_messages_to_sdk(messages: &[Message]) -> Result<Vec<SdkMessage>, ConversionError> {
    let mut sdk_messages = Vec::new();

    for msg in messages {
        let role = match msg.role.as_str() {
            "user" => ConversationRole::User,
            "assistant" => ConversationRole::Assistant,
            _ => {
                return Err(ConversionError::InvalidMessage(format!(
                    "Invalid role: {}",
                    msg.role
                )));
            }
        };

        let content_blocks = convert_content_to_sdk(&msg.content)?;

        let sdk_msg = SdkMessage::builder()
            .role(role)
            .set_content(Some(content_blocks))
            .build()
            .map_err(|e| {
                ConversionError::InvalidMessage(format!("Failed to build message: {}", e))
            })?;

        sdk_messages.push(sdk_msg);
    }

    Ok(sdk_messages)
}

/// Convert Anthropic content to SDK content blocks.
fn convert_content_to_sdk(
    content: &MessageContent,
) -> Result<Vec<SdkContentBlock>, ConversionError> {
    match content {
        MessageContent::Text(text) => Ok(vec![SdkContentBlock::Text(text.clone())]),
        MessageContent::Blocks(blocks) => {
            blocks
                .iter()
                .map(convert_content_block_to_sdk)
                .collect::<Result<Vec<Vec<_>>, _>>()
                .map(|v| v.into_iter().flatten().collect())
        }
    }
}

/// Build a Bedrock CachePoint block (maps from any Anthropic cache_control).
fn make_cache_point() -> Result<SdkContentBlock, ConversionError> {
    Ok(SdkContentBlock::CachePoint(
        CachePointBlock::builder()
            .r#type(CachePointType::Default)
            .build()
            .map_err(|e| ConversionError::InvalidContentBlock(e.to_string()))?,
    ))
}

/// Convert a single content block to SDK format.
/// Returns a Vec because a cached block emits two SDK blocks: the block itself + a CachePoint.
fn convert_content_block_to_sdk(
    block: &ContentBlock,
) -> Result<Vec<SdkContentBlock>, ConversionError> {
    match block {
        ContentBlock::Text { text, cache_control } => {
            let mut out = vec![SdkContentBlock::Text(text.clone())];
            if cache_control.is_some() {
                out.push(make_cache_point()?);
            }
            Ok(out)
        }

        ContentBlock::Image { source, cache_control } => {
            use aws_sdk_bedrockruntime::types::{ImageBlock, ImageFormat, ImageSource};
            use base64::{engine::general_purpose::STANDARD as BASE64, Engine};

            let bytes = BASE64
                .decode(&source.data)
                .map_err(|e| ConversionError::Base64DecodeError(e.to_string()))?;

            let format = match source.media_type.as_str() {
                "image/png" => ImageFormat::Png,
                "image/jpeg" => ImageFormat::Jpeg,
                "image/gif" => ImageFormat::Gif,
                "image/webp" => ImageFormat::Webp,
                _ => ImageFormat::Png,
            };

            let image = ImageBlock::builder()
                .format(format)
                .source(ImageSource::Bytes(
                    aws_sdk_bedrockruntime::primitives::Blob::new(bytes),
                ))
                .build()
                .map_err(|e| {
                    ConversionError::InvalidContentBlock(format!("Failed to build image: {}", e))
                })?;

            let mut out = vec![SdkContentBlock::Image(image)];
            if cache_control.is_some() {
                out.push(make_cache_point()?);
            }
            Ok(out)
        }

        ContentBlock::ToolUse { id, name, input, .. } => {
            let tool_use = ToolUseBlock::builder()
                .tool_use_id(id)
                .name(name)
                .input(json_to_document(input))
                .build()
                .map_err(|e| {
                    ConversionError::InvalidContentBlock(format!("Failed to build tool use: {}", e))
                })?;
            Ok(vec![SdkContentBlock::ToolUse(tool_use)])
        }

        ContentBlock::ToolResult { tool_use_id, content, is_error, cache_control } => {
            use aws_sdk_bedrockruntime::types::ToolResultBlock;

            let result_content = match content {
                ToolResultValue::Text(text) => vec![ToolResultContentBlock::Text(text.clone())],
                ToolResultValue::Blocks(blocks) => {
                    let mut result_blocks = Vec::new();
                    for b in blocks {
                        if let ContentBlock::Text { text, .. } = b {
                            result_blocks.push(ToolResultContentBlock::Text(text.clone()));
                        }
                    }
                    result_blocks
                }
            };

            let status = if is_error.unwrap_or(false) {
                ToolResultStatus::Error
            } else {
                ToolResultStatus::Success
            };

            let tool_result = ToolResultBlock::builder()
                .tool_use_id(tool_use_id)
                .set_content(Some(result_content))
                .status(status)
                .build()
                .map_err(|e| {
                    ConversionError::InvalidContentBlock(format!(
                        "Failed to build tool result: {}",
                        e
                    ))
                })?;

            let mut out = vec![SdkContentBlock::ToolResult(tool_result)];
            if cache_control.is_some() {
                out.push(make_cache_point()?);
            }
            Ok(out)
        }

        ContentBlock::Document { source, cache_control } => {
            use aws_sdk_bedrockruntime::types::{
                DocumentBlock, DocumentFormat, DocumentSource as SdkDocumentSource,
            };
            use base64::{engine::general_purpose::STANDARD as BASE64, Engine};

            let bytes = BASE64
                .decode(&source.data)
                .map_err(|e| ConversionError::Base64DecodeError(e.to_string()))?;

            let format = match source.media_type.as_str() {
                "application/pdf" => DocumentFormat::Pdf,
                "text/plain" => DocumentFormat::Txt,
                "text/html" => DocumentFormat::Html,
                "text/csv" => DocumentFormat::Csv,
                _ => DocumentFormat::Pdf,
            };

            let doc = DocumentBlock::builder()
                .format(format)
                .name("document")
                .source(SdkDocumentSource::Bytes(
                    aws_sdk_bedrockruntime::primitives::Blob::new(bytes),
                ))
                .build()
                .map_err(|e| {
                    ConversionError::InvalidContentBlock(format!("Failed to build document: {}", e))
                })?;

            let mut out = vec![SdkContentBlock::Document(doc)];
            if cache_control.is_some() {
                out.push(make_cache_point()?);
            }
            Ok(out)
        }

        // Skip thinking blocks — no cache_control field
        ContentBlock::Thinking { .. } | ContentBlock::RedactedThinking { .. } => Ok(vec![]),

        // Skip server tool blocks — no cache_control field
        ContentBlock::ServerToolUse { .. } | ContentBlock::ServerToolResult { .. } => Ok(vec![]),
    }
}

/// Convert system content to SDK format.
fn convert_system_to_sdk(system: &SystemContent) -> Vec<SystemContentBlock> {
    match system {
        SystemContent::Text(text) => vec![SystemContentBlock::Text(text.clone())],
        SystemContent::Messages(messages) => messages
            .iter()
            .map(|m| SystemContentBlock::Text(m.text.clone()))
            .collect(),
    }
}

/// Convert tools to SDK ToolConfiguration.
fn convert_tools_to_sdk(
    tools: &[serde_json::Value],
    tool_name_mapper: &mut ToolNameMapper,
) -> Result<ToolConfiguration, ConversionError> {
    let mut sdk_tools = Vec::new();

    for tool in tools {
        // Skip code execution tools
        if tool.get("type").and_then(|v| v.as_str()) == Some("code_execution_20250825") {
            continue;
        }

        let original_name = tool
            .get("name")
            .and_then(|v| v.as_str())
            .ok_or_else(|| ConversionError::InvalidTool("Tool missing name".to_string()))?;

        // Use the mapper to get a short name if needed (Bedrock has 64 char limit)
        let name = tool_name_mapper.get_or_create_short_name(original_name);

        let description = tool
            .get("description")
            .and_then(|v| v.as_str())
            .unwrap_or("");

        let input_schema = tool
            .get("input_schema")
            .cloned()
            .unwrap_or(serde_json::json!({"type": "object", "properties": {}}));

        let tool_spec = ToolSpecification::builder()
            .name(&name)
            .description(description)
            .input_schema(SdkToolInputSchema::Json(json_to_document(&input_schema)))
            .build()
            .map_err(|e| {
                ConversionError::InvalidTool(format!("Failed to build tool spec: {}", e))
            })?;

        sdk_tools.push(SdkTool::ToolSpec(tool_spec));
    }

    if tool_name_mapper.has_mappings() {
        tracing::info!(
            mapping_count = tool_name_mapper.mapping_count(),
            "Tool names were shortened due to Bedrock's 64 character limit"
        );
    }

    ToolConfiguration::builder()
        .set_tools(Some(sdk_tools))
        .build()
        .map_err(|e| ConversionError::InvalidTool(format!("Failed to build tool config: {}", e)))
}

// ============================================================================
// Response Conversion (Bedrock → Anthropic)
// ============================================================================

/// Convert a Bedrock ConverseOutput to an Anthropic MessageResponse.
pub fn convert_response(
    output: aws_sdk_bedrockruntime::operation::converse::ConverseOutput,
    original_model: &str,
    tool_name_mapper: &ToolNameMapper,
) -> Result<MessageResponse, ConversionError> {
    let message_id = format!("msg_{}", Uuid::new_v4().to_string().replace("-", ""));

    // Convert content blocks
    let mut content = Vec::new();
    if let Some(aws_sdk_bedrockruntime::types::ConverseOutput::Message(msg)) = output.output() {
        for block in msg.content() {
            if let Some(converted) = convert_sdk_content_to_anthropic(block, tool_name_mapper) {
                content.push(converted);
            }
        }
    }

    // Convert stop reason
    let stop_reason = Some(convert_stop_reason(output.stop_reason()));

    // Get usage
    let usage = output
        .usage()
        .map(|u| Usage {
            input_tokens: u.input_tokens(),
            output_tokens: u.output_tokens(),
            cache_creation_input_tokens: None,
            cache_read_input_tokens: None,
        })
        .unwrap_or(Usage {
            input_tokens: 0,
            output_tokens: 0,
            cache_creation_input_tokens: None,
            cache_read_input_tokens: None,
        });

    Ok(MessageResponse {
        id: message_id,
        response_type: "message".to_string(),
        role: "assistant".to_string(),
        content,
        model: original_model.to_string(),
        stop_reason,
        stop_sequence: None,
        usage,
    })
}

/// Convert SDK content block to Anthropic ContentBlock.
///
/// This is `pub` because the streaming handler also uses it (for tool name restoration).
pub fn convert_sdk_content_to_anthropic(
    block: &SdkContentBlock,
    tool_name_mapper: &ToolNameMapper,
) -> Option<ContentBlock> {
    match block {
        SdkContentBlock::Text(text) => Some(ContentBlock::Text {
            text: text.clone(),
            cache_control: None,
        }),
        SdkContentBlock::ToolUse(tool_use) => {
            // Restore original tool name if it was shortened
            let name = tool_name_mapper.restore_original_name(tool_use.name());
            Some(ContentBlock::ToolUse {
                id: tool_use.tool_use_id().to_string(),
                name,
                input: document_to_json(tool_use.input()),
                caller: None,
            })
        }
        _ => None,
    }
}

/// Convert SDK StopReason to Anthropic StopReason.
fn convert_stop_reason(reason: &aws_sdk_bedrockruntime::types::StopReason) -> StopReason {
    match reason {
        aws_sdk_bedrockruntime::types::StopReason::EndTurn => StopReason::EndTurn,
        aws_sdk_bedrockruntime::types::StopReason::MaxTokens => StopReason::MaxTokens,
        aws_sdk_bedrockruntime::types::StopReason::StopSequence => StopReason::StopSequence,
        aws_sdk_bedrockruntime::types::StopReason::ToolUse => StopReason::ToolUse,
        aws_sdk_bedrockruntime::types::StopReason::ContentFiltered => StopReason::EndTurn,
        aws_sdk_bedrockruntime::types::StopReason::GuardrailIntervened => StopReason::EndTurn,
        _ => StopReason::EndTurn,
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::schemas::anthropic::{CacheControl, ContentBlock};

    #[test]
    fn text_with_cache_control_emits_cache_point() {
        let block = ContentBlock::Text {
            text: "hello".to_string(),
            cache_control: Some(CacheControl::new()),
        };
        let result = convert_content_block_to_sdk(&block).unwrap();
        assert_eq!(result.len(), 2);
        assert!(matches!(result[0], SdkContentBlock::Text(_)));
        assert!(result[1].is_cache_point());
    }

    #[test]
    fn text_without_cache_control_no_cache_point() {
        let block = ContentBlock::Text {
            text: "hello".to_string(),
            cache_control: None,
        };
        let result = convert_content_block_to_sdk(&block).unwrap();
        assert_eq!(result.len(), 1);
        assert!(matches!(result[0], SdkContentBlock::Text(_)));
    }
}
