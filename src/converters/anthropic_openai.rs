//! Anthropic <-> OpenAI converter
//!
//! Handles conversion in both directions:
//! - Anthropic Messages API request → OpenAI Chat Completions API request
//! - OpenAI Chat Completions API response → Anthropic Messages API response
//! - OpenAI Chat Completions API request → Anthropic Messages API request
//! - Anthropic Messages API response → OpenAI Chat Completions API response

use crate::schemas::anthropic::{
    ContentBlock, Message, MessageContent, MessageRequest, MessageResponse, StopReason,
    SystemContent, Usage,
};
use crate::schemas::openai::{
    AssistantMessage, ChatCompletionChunk, ChatCompletionRequest, ChatCompletionResponse,
    ChatMessage, ChatRole, Choice, ChunkChoice, ChunkDelta, CompletionUsage, FunctionCall,
    FunctionCallDelta, MessageContent as OpenAIMessageContent, Tool, ToolCall, ToolCallDelta,
    ToolChoice,
};
use thiserror::Error;
use uuid::Uuid;

// ============================================================================
// Error Types
// ============================================================================

/// Errors that can occur during Anthropic <-> OpenAI conversion.
#[derive(Debug, Error)]
pub enum AnthropicOpenAIError {
    #[error("Invalid content: {0}")]
    InvalidContent(String),

    #[error("Invalid message: {0}")]
    InvalidMessage(String),

    #[error("Invalid tool configuration: {0}")]
    InvalidTool(String),

    #[error("Missing required field: {0}")]
    MissingField(String),

    #[error("Unsupported feature: {0}")]
    UnsupportedFeature(String),

    #[error("Invalid response: {0}")]
    InvalidResponse(String),

    #[error("Serialization error: {0}")]
    SerializationError(String),
}

// ============================================================================
// Anthropic → OpenAI Request Converter
// ============================================================================

/// Converts Anthropic Messages API requests to OpenAI Chat Completions format.
#[derive(Debug, Clone, Default)]
pub struct AnthropicToOpenAIConverter;

impl AnthropicToOpenAIConverter {
    pub fn new() -> Self {
        Self
    }

    /// Convert an Anthropic MessageRequest to an OpenAI ChatCompletionRequest.
    ///
    /// `target_model_id` is the OpenAI model to use (already resolved from model_mapping).
    pub fn convert_request(
        &self,
        request: &MessageRequest,
        target_model_id: &str,
    ) -> Result<ChatCompletionRequest, AnthropicOpenAIError> {
        // Build messages: system prompt first, then conversation
        let mut messages: Vec<ChatMessage> = Vec::new();

        // Insert system message if present
        if let Some(ref system) = request.system {
            let text = match system {
                SystemContent::Text(t) => t.clone(),
                SystemContent::Messages(msgs) => msgs
                    .iter()
                    .map(|m| m.text.clone())
                    .collect::<Vec<_>>()
                    .join("\n"),
            };
            messages.push(ChatMessage {
                role: ChatRole::System,
                content: Some(OpenAIMessageContent::Text(text)),
                name: None,
                tool_calls: None,
                tool_call_id: None,
            });
        }

        // Convert conversation messages
        for msg in &request.messages {
            let chat_msg = self.convert_message(msg)?;
            messages.push(chat_msg);
        }

        // Convert stop sequences
        let stop = request
            .stop_sequences
            .as_ref()
            .map(|seqs| crate::schemas::openai::StopSequence::Multiple(seqs.clone()));

        // Convert tools (Anthropic tools → OpenAI tools)
        let tools = self.convert_tools(&request.tools)?;

        // Convert tool_choice
        let tool_choice = self.convert_tool_choice(&request.tool_choice)?;

        Ok(ChatCompletionRequest {
            model: target_model_id.to_string(),
            messages,
            temperature: request.temperature,
            max_tokens: Some(request.max_tokens),
            max_completion_tokens: None,
            stream: request.stream,
            stream_options: None,
            top_p: request.top_p,
            stop,
            presence_penalty: None,
            frequency_penalty: None,
            tools,
            tool_choice,
            response_format: None,
            seed: None,
            user: None,
            n: None,
            logprobs: None,
            top_logprobs: None,
        })
    }

    fn convert_message(&self, msg: &Message) -> Result<ChatMessage, AnthropicOpenAIError> {
        let role = match msg.role.as_str() {
            "user" => ChatRole::User,
            "assistant" => ChatRole::Assistant,
            other => {
                return Err(AnthropicOpenAIError::InvalidMessage(format!(
                    "Unknown role: {other}"
                )))
            }
        };

        match &msg.content {
            MessageContent::Text(text) => Ok(ChatMessage {
                role,
                content: Some(OpenAIMessageContent::Text(text.clone())),
                name: None,
                tool_calls: None,
                tool_call_id: None,
            }),
            MessageContent::Blocks(blocks) => self.convert_message_blocks(role, blocks),
        }
    }

    fn convert_message_blocks(
        &self,
        role: ChatRole,
        blocks: &[ContentBlock],
    ) -> Result<ChatMessage, AnthropicOpenAIError> {
        let mut text_parts: Vec<String> = Vec::new();
        let mut tool_calls: Vec<ToolCall> = Vec::new();
        let mut tool_result_parts: Vec<(String, String)> = Vec::new(); // (tool_call_id, content)

        for block in blocks {
            match block {
                ContentBlock::Text { text, .. } => {
                    text_parts.push(text.clone());
                }
                ContentBlock::ToolUse {
                    id, name, input, ..
                } => {
                    let arguments = serde_json::to_string(input)
                        .map_err(|e| AnthropicOpenAIError::SerializationError(e.to_string()))?;
                    tool_calls.push(ToolCall {
                        id: id.clone(),
                        tool_type: "function".to_string(),
                        function: FunctionCall {
                            name: name.clone(),
                            arguments,
                        },
                    });
                }
                ContentBlock::ToolResult {
                    tool_use_id,
                    content,
                    ..
                } => {
                    let text = match content {
                        crate::schemas::anthropic::ToolResultValue::Text(t) => t.clone(),
                        crate::schemas::anthropic::ToolResultValue::Blocks(bs) => bs
                            .iter()
                            .filter_map(|b| b.as_text().map(|s| s.to_string()))
                            .collect::<Vec<_>>()
                            .join("\n"),
                    };
                    tool_result_parts.push((tool_use_id.clone(), text));
                }
                // Ignore thinking, redacted_thinking, server_tool_use, server_tool_result, image, document
                _ => {}
            }
        }

        // If we have tool results, return multiple tool role messages.
        // The caller should be iterating single-result blocks in practice.
        // For simplicity, if there's exactly one tool result block and it's the only content:
        if !tool_result_parts.is_empty() {
            // Return the first tool result as a Tool role message
            let (tool_call_id, content) = tool_result_parts.remove(0);
            return Ok(ChatMessage {
                role: ChatRole::Tool,
                content: Some(OpenAIMessageContent::Text(content)),
                name: None,
                tool_calls: None,
                tool_call_id: Some(tool_call_id),
            });
        }

        let content = if text_parts.is_empty() {
            None
        } else {
            Some(OpenAIMessageContent::Text(text_parts.join("")))
        };

        Ok(ChatMessage {
            role,
            content,
            name: None,
            tool_calls: if tool_calls.is_empty() {
                None
            } else {
                Some(tool_calls)
            },
            tool_call_id: None,
        })
    }

    fn convert_tools(
        &self,
        tools: &Option<Vec<serde_json::Value>>,
    ) -> Result<Option<Vec<Tool>>, AnthropicOpenAIError> {
        match tools {
            None => Ok(None),
            Some(tools) if tools.is_empty() => Ok(None),
            Some(tools) => {
                let mut result = Vec::new();
                for tool in tools {
                    if let Some(obj) = tool.as_object() {
                        // Skip code_execution and server tools
                        if obj
                            .get("type")
                            .and_then(|v| v.as_str())
                            .map(|t| t.starts_with("code_execution") || t == "server_tool")
                            .unwrap_or(false)
                        {
                            continue;
                        }

                        let name = obj
                            .get("name")
                            .and_then(|v| v.as_str())
                            .unwrap_or("unknown")
                            .to_string();
                        let description = obj
                            .get("description")
                            .and_then(|v| v.as_str())
                            .map(|s| s.to_string());
                        // Anthropic uses input_schema; OpenAI uses parameters
                        let parameters = obj.get("input_schema").cloned();

                        result.push(Tool {
                            tool_type: "function".to_string(),
                            function: crate::schemas::openai::FunctionDef {
                                name,
                                description,
                                parameters,
                                strict: None,
                            },
                        });
                    }
                }
                if result.is_empty() {
                    Ok(None)
                } else {
                    Ok(Some(result))
                }
            }
        }
    }

    fn convert_tool_choice(
        &self,
        tool_choice: &Option<crate::schemas::anthropic::ToolChoice>,
    ) -> Result<Option<ToolChoice>, AnthropicOpenAIError> {
        match tool_choice {
            None => Ok(None),
            Some(crate::schemas::anthropic::ToolChoice::Auto(s)) => {
                let mode = match s.as_str() {
                    "any" => "required",
                    "none" => "none",
                    _ => "auto",
                };
                Ok(Some(ToolChoice::Mode(mode.to_string())))
            }
            Some(crate::schemas::anthropic::ToolChoice::Specific { name }) => {
                Ok(Some(ToolChoice::Function {
                    choice_type: "function".to_string(),
                    function: crate::schemas::openai::ToolChoiceFunction { name: name.clone() },
                }))
            }
            Some(crate::schemas::anthropic::ToolChoice::Object(obj)) => {
                if let Some(t) = obj.get("type").and_then(|v| v.as_str()) {
                    match t {
                        "auto" => Ok(Some(ToolChoice::Mode("auto".to_string()))),
                        "any" => Ok(Some(ToolChoice::Mode("required".to_string()))),
                        "none" => Ok(Some(ToolChoice::Mode("none".to_string()))),
                        "tool" => {
                            let name = obj
                                .get("name")
                                .and_then(|v| v.as_str())
                                .unwrap_or("")
                                .to_string();
                            Ok(Some(ToolChoice::Function {
                                choice_type: "function".to_string(),
                                function: crate::schemas::openai::ToolChoiceFunction { name },
                            }))
                        }
                        _ => Ok(None),
                    }
                } else {
                    Ok(None)
                }
            }
        }
    }

    /// Convert an OpenAI ChatCompletionResponse to an Anthropic MessageResponse.
    pub fn convert_response(
        &self,
        response: &ChatCompletionResponse,
        original_model: &str,
    ) -> Result<MessageResponse, AnthropicOpenAIError> {
        let choice = response.choices.first().ok_or_else(|| {
            AnthropicOpenAIError::InvalidResponse("No choices in response".to_string())
        })?;

        let content = self.convert_choice_to_content(choice)?;
        let stop_reason = self.convert_finish_reason_to_anthropic(choice.finish_reason.as_deref());
        let usage = Usage {
            input_tokens: response.usage.prompt_tokens,
            output_tokens: response.usage.completion_tokens,
            cache_creation_input_tokens: None,
            cache_read_input_tokens: None,
        };

        Ok(MessageResponse {
            id: format!("msg_{}", Uuid::new_v4().to_string().replace("-", "")),
            response_type: "message".to_string(),
            role: "assistant".to_string(),
            content,
            model: original_model.to_string(),
            stop_reason: Some(stop_reason),
            stop_sequence: None,
            usage,
        })
    }

    fn convert_choice_to_content(
        &self,
        choice: &Choice,
    ) -> Result<Vec<ContentBlock>, AnthropicOpenAIError> {
        let mut blocks = Vec::new();

        if let Some(ref text) = choice.message.content {
            if !text.is_empty() {
                blocks.push(ContentBlock::Text {
                    text: text.clone(),
                    cache_control: None,
                });
            }
        }

        if let Some(ref tool_calls) = choice.message.tool_calls {
            for tc in tool_calls {
                let input: serde_json::Value = serde_json::from_str(&tc.function.arguments)
                    .unwrap_or_else(|_| serde_json::json!({}));
                blocks.push(ContentBlock::ToolUse {
                    id: tc.id.clone(),
                    name: tc.function.name.clone(),
                    input,
                    caller: None,
                });
            }
        }

        Ok(blocks)
    }

    fn convert_finish_reason_to_anthropic(&self, finish_reason: Option<&str>) -> StopReason {
        match finish_reason {
            Some("stop") => StopReason::EndTurn,
            Some("length") => StopReason::MaxTokens,
            Some("tool_calls") => StopReason::ToolUse,
            Some("content_filter") => StopReason::EndTurn,
            _ => StopReason::EndTurn,
        }
    }

    /// Convert a single OpenAI SSE chunk to an Anthropic SSE event.
    ///
    /// Returns `None` if the chunk should be skipped (e.g., empty delta).
    /// Returns a vec of (event_type, data_json) pairs to emit.
    pub fn convert_stream_chunk_to_anthropic(
        &self,
        chunk: &ChatCompletionChunk,
        state: &mut OpenAIToAnthropicStreamState,
    ) -> Vec<(String, String)> {
        let mut events = Vec::new();

        // On first chunk, emit message_start if not yet sent
        if !state.message_started {
            state.message_started = true;
            let msg_start = serde_json::json!({
                "type": "message_start",
                "message": {
                    "id": format!("msg_{}", Uuid::new_v4().to_string().replace("-", "")),
                    "type": "message",
                    "role": "assistant",
                    "content": [],
                    "model": chunk.model,
                    "stop_reason": null,
                    "stop_sequence": null,
                    "usage": {"input_tokens": 0, "output_tokens": 0}
                }
            });
            events.push(("message_start".to_string(), msg_start.to_string()));

            // Emit content_block_start for index 0 (text block)
            let cb_start = serde_json::json!({
                "type": "content_block_start",
                "index": 0,
                "content_block": {"type": "text", "text": ""}
            });
            events.push(("content_block_start".to_string(), cb_start.to_string()));
        }

        for choice in &chunk.choices {
            // Text delta
            if let Some(ref text) = choice.delta.content {
                if !text.is_empty() {
                    let delta = serde_json::json!({
                        "type": "content_block_delta",
                        "index": 0,
                        "delta": {"type": "text_delta", "text": text}
                    });
                    events.push(("content_block_delta".to_string(), delta.to_string()));
                }
            }

            // Tool call deltas
            if let Some(ref tool_calls) = choice.delta.tool_calls {
                for tc_delta in tool_calls {
                    let block_index = tc_delta.index + 1; // index 0 is text block

                    // If this tool call hasn't started yet, emit content_block_start
                    if !state.tool_call_started.contains(&tc_delta.index) {
                        state.tool_call_started.insert(tc_delta.index);
                        let tc_id = tc_delta.id.clone().unwrap_or_else(|| {
                            format!("toolu_{}", Uuid::new_v4().to_string().replace("-", ""))
                        });
                        let tc_name = tc_delta
                            .function
                            .as_ref()
                            .and_then(|f| f.name.clone())
                            .unwrap_or_default();

                        let cb_start = serde_json::json!({
                            "type": "content_block_start",
                            "index": block_index,
                            "content_block": {
                                "type": "tool_use",
                                "id": tc_id,
                                "name": tc_name,
                                "input": {}
                            }
                        });
                        events.push(("content_block_start".to_string(), cb_start.to_string()));
                    }

                    // Emit input_json_delta for arguments
                    if let Some(ref func) = tc_delta.function {
                        if let Some(ref args) = func.arguments {
                            if !args.is_empty() {
                                let delta = serde_json::json!({
                                    "type": "content_block_delta",
                                    "index": block_index,
                                    "delta": {
                                        "type": "input_json_delta",
                                        "partial_json": args
                                    }
                                });
                                events.push(("content_block_delta".to_string(), delta.to_string()));
                            }
                        }
                    }
                }
            }

            // Finish reason → message_delta + message_stop
            if let Some(ref finish_reason) = choice.finish_reason {
                let stop_reason = match finish_reason.as_str() {
                    "stop" => "end_turn",
                    "length" => "max_tokens",
                    "tool_calls" => "tool_use",
                    _ => "end_turn",
                };

                // Close text block (index 0)
                let cb_stop = serde_json::json!({
                    "type": "content_block_stop",
                    "index": 0
                });
                events.push(("content_block_stop".to_string(), cb_stop.to_string()));

                // Close any open tool call blocks
                for tc_idx in state.tool_call_started.iter() {
                    let block_index = tc_idx + 1;
                    let cb_stop = serde_json::json!({
                        "type": "content_block_stop",
                        "index": block_index
                    });
                    events.push(("content_block_stop".to_string(), cb_stop.to_string()));
                }

                let usage_out = chunk
                    .usage
                    .as_ref()
                    .map(|u| u.completion_tokens)
                    .unwrap_or(0);
                let usage_in = chunk.usage.as_ref().map(|u| u.prompt_tokens).unwrap_or(0);

                let msg_delta = serde_json::json!({
                    "type": "message_delta",
                    "delta": {
                        "type": "message_delta",
                        "stop_reason": stop_reason,
                        "stop_sequence": null
                    },
                    "usage": {"output_tokens": usage_out}
                });
                events.push(("message_delta".to_string(), msg_delta.to_string()));

                let _ = usage_in; // suppress warning

                let msg_stop = serde_json::json!({"type": "message_stop"});
                events.push(("message_stop".to_string(), msg_stop.to_string()));
            }
        }

        events
    }
}

/// Mutable state for converting an OpenAI SSE stream to Anthropic format.
#[derive(Default)]
pub struct OpenAIToAnthropicStreamState {
    pub message_started: bool,
    pub tool_call_started: std::collections::HashSet<i32>,
}

// ============================================================================
// OpenAI → Anthropic Request Converter
// ============================================================================

/// Converts OpenAI Chat Completions API requests to Anthropic Messages format.
#[derive(Debug, Clone, Default)]
pub struct OpenAIToAnthropicConverter;

impl OpenAIToAnthropicConverter {
    pub fn new() -> Self {
        Self
    }

    /// Convert an OpenAI ChatCompletionRequest to an Anthropic MessageRequest.
    ///
    /// `target_model_id` is the Anthropic model to use.
    pub fn convert_request(
        &self,
        request: &ChatCompletionRequest,
        target_model_id: &str,
    ) -> Result<MessageRequest, AnthropicOpenAIError> {
        // Reject n > 1 (Anthropic doesn't support multiple completions)
        if request.n.map(|n| n > 1).unwrap_or(false) {
            return Err(AnthropicOpenAIError::UnsupportedFeature(
                "Anthropic does not support n > 1 (multiple completions)".to_string(),
            ));
        }

        // Split system messages from conversation messages
        let system_messages: Vec<_> = request
            .messages
            .iter()
            .filter(|m| m.role == ChatRole::System)
            .collect();
        let chat_messages: Vec<_> = request
            .messages
            .iter()
            .filter(|m| m.role != ChatRole::System)
            .collect();

        // Convert system prompt
        let system = if system_messages.is_empty() {
            None
        } else {
            let text = system_messages
                .iter()
                .filter_map(|m| m.content.as_ref().map(|c| c.to_string_content()))
                .collect::<Vec<_>>()
                .join("\n");
            if text.is_empty() {
                None
            } else {
                use crate::schemas::anthropic::{CacheControl, SystemMessage};
                Some(SystemContent::Messages(vec![SystemMessage {
                    message_type: "text".to_string(),
                    text,
                    cache_control: Some(CacheControl::new()),
                }]))
            }
        };

        // Convert messages
        let messages = self.convert_messages(&chat_messages)?;

        // Auto-inject cache_control on the last content block of the last user message
        let messages = {
            use crate::schemas::anthropic::CacheControl;
            let mut msgs = messages;
            if let Some(last_user) = msgs.iter_mut().rev().find(|m| m.role == "user") {
                match &mut last_user.content {
                    MessageContent::Text(text) => {
                        let text_val = text.clone();
                        last_user.content = MessageContent::Blocks(vec![ContentBlock::Text {
                            text: text_val,
                            cache_control: Some(CacheControl::new()),
                        }]);
                    }
                    MessageContent::Blocks(blocks) => {
                        if let Some(last_block) = blocks.last_mut() {
                            match last_block {
                                ContentBlock::Text { cache_control, .. } => {
                                    *cache_control = Some(CacheControl::new());
                                }
                                _ => {
                                    blocks.push(ContentBlock::Text {
                                        text: String::new(),
                                        cache_control: Some(CacheControl::new()),
                                    });
                                }
                            }
                        }
                    }
                }
            }
            msgs
        };

        // max_tokens (required by Anthropic)
        let max_tokens = request
            .max_completion_tokens
            .or(request.max_tokens)
            .unwrap_or(4096);

        // Convert stop sequences
        let stop_sequences = request.stop.as_ref().map(|s| s.to_vec());

        // Convert tools
        let tools = self.convert_tools(&request.tools)?;

        // Auto-inject cache_control on the last tool so Anthropic caches the tool list
        let tools = match tools {
            Some(mut tool_list) if !tool_list.is_empty() => {
                if let Some(last) = tool_list.last_mut() {
                    last["cache_control"] = serde_json::json!({"type": "ephemeral"});
                }
                Some(tool_list)
            }
            other => other,
        };

        // Convert tool_choice
        let tool_choice = self.convert_tool_choice(&request.tool_choice)?;

        Ok(MessageRequest {
            model: target_model_id.to_string(),
            messages,
            max_tokens,
            system,
            temperature: request.temperature,
            top_p: request.top_p,
            top_k: None,
            stop_sequences,
            stream: request.stream,
            tools,
            tool_choice,
            thinking: None,
            metadata: None,
            container: None,
            service_tier: None,
        })
    }

    fn convert_messages(
        &self,
        messages: &[&ChatMessage],
    ) -> Result<Vec<Message>, AnthropicOpenAIError> {
        let mut result = Vec::new();

        for msg in messages {
            match msg.role {
                ChatRole::System => {} // Already handled above
                ChatRole::User => {
                    let content = match &msg.content {
                        Some(OpenAIMessageContent::Text(t)) => MessageContent::Text(t.clone()),
                        Some(OpenAIMessageContent::Parts(parts)) => {
                            let text = parts
                                .iter()
                                .filter_map(|p| match p {
                                    crate::schemas::openai::ContentPart::Text { text } => {
                                        Some(text.clone())
                                    }
                                    _ => None,
                                })
                                .collect::<Vec<_>>()
                                .join("\n");
                            MessageContent::Text(text)
                        }
                        None => MessageContent::Text(String::new()),
                    };
                    result.push(Message {
                        role: "user".to_string(),
                        content,
                    });
                }
                ChatRole::Assistant => {
                    let mut blocks: Vec<ContentBlock> = Vec::new();

                    if let Some(ref content) = msg.content {
                        let text = content.to_string_content();
                        if !text.is_empty() {
                            blocks.push(ContentBlock::Text {
                                text,
                                cache_control: None,
                            });
                        }
                    }

                    if let Some(ref tool_calls) = msg.tool_calls {
                        for tc in tool_calls {
                            let input: serde_json::Value =
                                serde_json::from_str(&tc.function.arguments)
                                    .unwrap_or_else(|_| serde_json::json!({}));
                            blocks.push(ContentBlock::ToolUse {
                                id: tc.id.clone(),
                                name: tc.function.name.clone(),
                                input,
                                caller: None,
                            });
                        }
                    }

                    let content = if blocks.is_empty() {
                        MessageContent::Text(String::new())
                    } else {
                        MessageContent::Blocks(blocks)
                    };

                    result.push(Message {
                        role: "assistant".to_string(),
                        content,
                    });
                }
                ChatRole::Tool => {
                    // Tool results become user messages with tool_result blocks
                    let tool_call_id = msg
                        .tool_call_id
                        .clone()
                        .unwrap_or_else(|| "unknown".to_string());
                    let content_text = msg
                        .content
                        .as_ref()
                        .map(|c| c.to_string_content())
                        .unwrap_or_default();

                    let block = ContentBlock::ToolResult {
                        tool_use_id: tool_call_id,
                        content: crate::schemas::anthropic::ToolResultValue::Text(content_text),
                        is_error: None,
                        cache_control: None,
                    };

                    result.push(Message {
                        role: "user".to_string(),
                        content: MessageContent::Blocks(vec![block]),
                    });
                }
            }
        }

        Ok(result)
    }

    fn convert_tools(
        &self,
        tools: &Option<Vec<crate::schemas::openai::Tool>>,
    ) -> Result<Option<Vec<serde_json::Value>>, AnthropicOpenAIError> {
        match tools {
            None => Ok(None),
            Some(tools) if tools.is_empty() => Ok(None),
            Some(tools) => {
                let mut result = Vec::new();
                for tool in tools {
                    if tool.tool_type != "function" {
                        continue;
                    }
                    // Convert OpenAI function def to Anthropic tool format
                    let mut anthropic_tool = serde_json::json!({
                        "name": tool.function.name,
                        "input_schema": tool.function.parameters.clone().unwrap_or_else(|| serde_json::json!({"type": "object", "properties": {}}))
                    });
                    if let Some(ref desc) = tool.function.description {
                        anthropic_tool["description"] = serde_json::Value::String(desc.clone());
                    }
                    result.push(anthropic_tool);
                }
                if result.is_empty() {
                    Ok(None)
                } else {
                    Ok(Some(result))
                }
            }
        }
    }

    fn convert_tool_choice(
        &self,
        tool_choice: &Option<ToolChoice>,
    ) -> Result<Option<crate::schemas::anthropic::ToolChoice>, AnthropicOpenAIError> {
        match tool_choice {
            None => Ok(None),
            Some(ToolChoice::Mode(mode)) => {
                let anthropic_mode = match mode.as_str() {
                    "none" => "none",
                    "required" => "any",
                    _ => "auto",
                };
                Ok(Some(crate::schemas::anthropic::ToolChoice::Auto(
                    anthropic_mode.to_string(),
                )))
            }
            Some(ToolChoice::Function { function, .. }) => {
                Ok(Some(crate::schemas::anthropic::ToolChoice::Specific {
                    name: function.name.clone(),
                }))
            }
        }
    }

    /// Convert an Anthropic MessageResponse to an OpenAI ChatCompletionResponse.
    pub fn convert_response(
        &self,
        response: &MessageResponse,
        original_model: &str,
    ) -> Result<ChatCompletionResponse, AnthropicOpenAIError> {
        let mut text_parts = Vec::new();
        let mut tool_calls = Vec::new();

        for block in &response.content {
            match block {
                ContentBlock::Text { text, .. } => {
                    text_parts.push(text.clone());
                }
                ContentBlock::ToolUse {
                    id, name, input, ..
                } => {
                    let arguments = serde_json::to_string(input)
                        .map_err(|e| AnthropicOpenAIError::SerializationError(e.to_string()))?;
                    tool_calls.push(ToolCall {
                        id: id.clone(),
                        tool_type: "function".to_string(),
                        function: FunctionCall {
                            name: name.clone(),
                            arguments,
                        },
                    });
                }
                _ => {}
            }
        }

        let content = if text_parts.is_empty() {
            None
        } else {
            Some(text_parts.join(""))
        };

        let finish_reason = response.stop_reason.as_ref().map(|r| match r {
            StopReason::EndTurn => "stop".to_string(),
            StopReason::MaxTokens => "length".to_string(),
            StopReason::ToolUse => "tool_calls".to_string(),
            StopReason::StopSequence => "stop".to_string(),
        });

        let usage = CompletionUsage {
            prompt_tokens: response.usage.input_tokens,
            completion_tokens: response.usage.output_tokens,
            total_tokens: response.usage.input_tokens + response.usage.output_tokens,
            completion_tokens_details: None,
        };

        Ok(ChatCompletionResponse {
            id: format!("chatcmpl-{}", Uuid::new_v4().to_string().replace("-", "")),
            object: "chat.completion".to_string(),
            created: chrono::Utc::now().timestamp(),
            model: original_model.to_string(),
            choices: vec![Choice {
                index: 0,
                message: AssistantMessage {
                    role: ChatRole::Assistant,
                    content,
                    tool_calls: if tool_calls.is_empty() {
                        None
                    } else {
                        Some(tool_calls)
                    },
                },
                finish_reason,
                logprobs: None,
            }],
            usage,
            system_fingerprint: None,
        })
    }

    /// Convert a single Anthropic SSE event to OpenAI SSE chunk(s).
    ///
    /// `event_type` is the value from the `event:` line.
    /// `data` is the JSON data string from the `data:` line.
    ///
    /// Returns a vec of JSON strings to emit as `data:` lines.
    pub fn convert_stream_chunk_to_openai(
        &self,
        event_type: &str,
        data: &str,
        state: &mut AnthropicToOpenAIStreamState,
    ) -> Vec<String> {
        let mut chunks = Vec::new();

        match event_type {
            "message_start" => {
                // Capture input_tokens from message_start
                if let Ok(val) = serde_json::from_str::<serde_json::Value>(data) {
                    if let Some(tokens) = val["message"]["usage"]["input_tokens"].as_i64() {
                        state.input_tokens = tokens as i32;
                    }
                    // Emit first chunk with role if not yet sent
                    if !state.role_sent {
                        state.role_sent = true;
                        let model = val["message"]["model"]
                            .as_str()
                            .map(|s| s.to_string())
                            .unwrap_or_else(|| "claude".to_string());
                        if !model.is_empty() && state.model.is_empty() {
                            state.model = model.clone();
                        }

                        let chunk = ChatCompletionChunk {
                            id: format!("chatcmpl-{}", Uuid::new_v4().to_string().replace("-", "")),
                            object: "chat.completion.chunk".to_string(),
                            created: chrono::Utc::now().timestamp(),
                            model: if state.model.is_empty() {
                                model
                            } else {
                                state.model.clone()
                            },
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
                        if let Ok(json) = serde_json::to_string(&chunk) {
                            chunks.push(json);
                        }
                    }
                }
            }

            "content_block_start" => {
                // Track tool_use blocks
                if let Ok(val) = serde_json::from_str::<serde_json::Value>(data) {
                    let index = val["index"].as_i64().unwrap_or(0) as i32;
                    let block_type = val["content_block"]["type"].as_str().unwrap_or("");

                    if block_type == "tool_use" {
                        let tc_id = val["content_block"]["id"]
                            .as_str()
                            .unwrap_or("")
                            .to_string();
                        let tc_name = val["content_block"]["name"]
                            .as_str()
                            .unwrap_or("")
                            .to_string();
                        let tool_call_index = state.tool_call_count;
                        state.tool_call_count += 1;
                        state.block_to_tool_index.insert(index, tool_call_index);

                        let chunk = ChatCompletionChunk {
                            id: format!("chatcmpl-{}", Uuid::new_v4().to_string().replace("-", "")),
                            object: "chat.completion.chunk".to_string(),
                            created: chrono::Utc::now().timestamp(),
                            model: state.model.clone(),
                            choices: vec![ChunkChoice {
                                index: 0,
                                delta: ChunkDelta {
                                    role: None,
                                    content: None,
                                    tool_calls: Some(vec![ToolCallDelta {
                                        index: tool_call_index,
                                        id: Some(tc_id),
                                        tool_type: Some("function".to_string()),
                                        function: Some(FunctionCallDelta {
                                            name: Some(tc_name),
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
                        if let Ok(json) = serde_json::to_string(&chunk) {
                            chunks.push(json);
                        }
                    }
                }
            }

            "content_block_delta" => {
                if let Ok(val) = serde_json::from_str::<serde_json::Value>(data) {
                    let index = val["index"].as_i64().unwrap_or(0) as i32;
                    let delta_type = val["delta"]["type"].as_str().unwrap_or("");

                    match delta_type {
                        "text_delta" => {
                            let text = val["delta"]["text"].as_str().unwrap_or("").to_string();
                            if !text.is_empty() {
                                let chunk = ChatCompletionChunk {
                                    id: format!(
                                        "chatcmpl-{}",
                                        Uuid::new_v4().to_string().replace("-", "")
                                    ),
                                    object: "chat.completion.chunk".to_string(),
                                    created: chrono::Utc::now().timestamp(),
                                    model: state.model.clone(),
                                    choices: vec![ChunkChoice {
                                        index: 0,
                                        delta: ChunkDelta {
                                            role: None,
                                            content: Some(text),
                                            tool_calls: None,
                                        },
                                        finish_reason: None,
                                        logprobs: None,
                                    }],
                                    system_fingerprint: None,
                                    usage: None,
                                };
                                if let Ok(json) = serde_json::to_string(&chunk) {
                                    chunks.push(json);
                                }
                            }
                        }
                        "input_json_delta" => {
                            let partial_json = val["delta"]["partial_json"]
                                .as_str()
                                .unwrap_or("")
                                .to_string();
                            if !partial_json.is_empty() {
                                if let Some(&tc_idx) = state.block_to_tool_index.get(&index) {
                                    let chunk = ChatCompletionChunk {
                                        id: format!(
                                            "chatcmpl-{}",
                                            Uuid::new_v4().to_string().replace("-", "")
                                        ),
                                        object: "chat.completion.chunk".to_string(),
                                        created: chrono::Utc::now().timestamp(),
                                        model: state.model.clone(),
                                        choices: vec![ChunkChoice {
                                            index: 0,
                                            delta: ChunkDelta {
                                                role: None,
                                                content: None,
                                                tool_calls: Some(vec![ToolCallDelta {
                                                    index: tc_idx,
                                                    id: None,
                                                    tool_type: None,
                                                    function: Some(FunctionCallDelta {
                                                        name: None,
                                                        arguments: Some(partial_json),
                                                    }),
                                                }]),
                                            },
                                            finish_reason: None,
                                            logprobs: None,
                                        }],
                                        system_fingerprint: None,
                                        usage: None,
                                    };
                                    if let Ok(json) = serde_json::to_string(&chunk) {
                                        chunks.push(json);
                                    }
                                }
                            }
                        }
                        _ => {}
                    }
                }
            }

            "message_delta" => {
                if let Ok(val) = serde_json::from_str::<serde_json::Value>(data) {
                    let stop_reason = val["delta"]["stop_reason"].as_str().unwrap_or("stop");
                    let finish_reason = match stop_reason {
                        "end_turn" => "stop",
                        "max_tokens" => "length",
                        "tool_use" => "tool_calls",
                        "stop_sequence" => "stop",
                        _ => "stop",
                    };

                    let output_tokens = val["usage"]["output_tokens"].as_i64().unwrap_or(0) as i32;
                    let input_tokens = state.input_tokens;

                    let chunk = ChatCompletionChunk {
                        id: format!("chatcmpl-{}", Uuid::new_v4().to_string().replace("-", "")),
                        object: "chat.completion.chunk".to_string(),
                        created: chrono::Utc::now().timestamp(),
                        model: state.model.clone(),
                        choices: vec![ChunkChoice {
                            index: 0,
                            delta: ChunkDelta::default(),
                            finish_reason: Some(finish_reason.to_string()),
                            logprobs: None,
                        }],
                        system_fingerprint: None,
                        usage: if state.include_usage {
                            Some(CompletionUsage {
                                prompt_tokens: input_tokens,
                                completion_tokens: output_tokens,
                                total_tokens: input_tokens + output_tokens,
                                completion_tokens_details: None,
                            })
                        } else {
                            None
                        },
                    };
                    if let Ok(json) = serde_json::to_string(&chunk) {
                        chunks.push(json);
                    }
                }
            }

            // Ignore: content_block_stop, message_stop, ping, error
            _ => {}
        }

        chunks
    }
}

/// Mutable state for converting an Anthropic SSE stream to OpenAI format.
#[derive(Default)]
pub struct AnthropicToOpenAIStreamState {
    pub role_sent: bool,
    pub model: String,
    pub tool_call_count: i32,
    pub block_to_tool_index: std::collections::HashMap<i32, i32>,
    pub input_tokens: i32,
    pub include_usage: bool,
}

// ============================================================================
// Tests
// ============================================================================

#[cfg(test)]
mod tests {
    use super::*;
    use crate::schemas::anthropic::{Message, MessageRequest};
    use crate::schemas::openai::{ChatCompletionRequest, ChatMessage, ChatRole, MessageContent};

    #[test]
    fn test_anthropic_to_openai_simple_request() {
        let converter = AnthropicToOpenAIConverter::new();
        let request = MessageRequest::new("claude-3-sonnet", vec![Message::user("Hello")], 1024);
        let result = converter.convert_request(&request, "gpt-4o").unwrap();
        assert_eq!(result.model, "gpt-4o");
        assert_eq!(result.messages.len(), 1);
        assert_eq!(result.messages[0].role, ChatRole::User);
        assert_eq!(result.max_tokens, Some(1024));
    }

    #[test]
    fn test_anthropic_to_openai_with_system() {
        let converter = AnthropicToOpenAIConverter::new();
        let request = MessageRequest::new("claude-3-sonnet", vec![Message::user("Hello")], 1024)
            .with_system("Be helpful");
        let result = converter.convert_request(&request, "gpt-4o").unwrap();
        assert_eq!(result.messages.len(), 2);
        assert_eq!(result.messages[0].role, ChatRole::System);
    }

    #[test]
    fn test_openai_to_anthropic_simple_request() {
        let converter = OpenAIToAnthropicConverter::new();
        let request = ChatCompletionRequest {
            model: "gpt-4o".to_string(),
            messages: vec![ChatMessage {
                role: ChatRole::User,
                content: Some(MessageContent::Text("Hello".to_string())),
                name: None,
                tool_calls: None,
                tool_call_id: None,
            }],
            temperature: None,
            max_tokens: Some(512),
            max_completion_tokens: None,
            stream: false,
            stream_options: None,
            top_p: None,
            stop: None,
            presence_penalty: None,
            frequency_penalty: None,
            tools: None,
            tool_choice: None,
            response_format: None,
            seed: None,
            user: None,
            n: None,
            logprobs: None,
            top_logprobs: None,
        };
        let result = converter
            .convert_request(&request, "claude-3-5-sonnet-20241022")
            .unwrap();
        assert_eq!(result.model, "claude-3-5-sonnet-20241022");
        assert_eq!(result.messages.len(), 1);
        assert_eq!(result.max_tokens, 512);
    }

    #[test]
    fn test_openai_to_anthropic_system_extraction() {
        let converter = OpenAIToAnthropicConverter::new();
        let request = ChatCompletionRequest {
            model: "gpt-4o".to_string(),
            messages: vec![
                ChatMessage {
                    role: ChatRole::System,
                    content: Some(MessageContent::Text("Be helpful".to_string())),
                    name: None,
                    tool_calls: None,
                    tool_call_id: None,
                },
                ChatMessage {
                    role: ChatRole::User,
                    content: Some(MessageContent::Text("Hello".to_string())),
                    name: None,
                    tool_calls: None,
                    tool_call_id: None,
                },
            ],
            temperature: None,
            max_tokens: None,
            max_completion_tokens: None,
            stream: false,
            stream_options: None,
            top_p: None,
            stop: None,
            presence_penalty: None,
            frequency_penalty: None,
            tools: None,
            tool_choice: None,
            response_format: None,
            seed: None,
            user: None,
            n: None,
            logprobs: None,
            top_logprobs: None,
        };
        let result = converter
            .convert_request(&request, "claude-3-5-sonnet-20241022")
            .unwrap();
        assert!(result.system.is_some());
        assert_eq!(result.messages.len(), 1);
    }

    #[test]
    fn test_openai_to_anthropic_rejects_n_gt_1() {
        let converter = OpenAIToAnthropicConverter::new();
        let request = ChatCompletionRequest {
            model: "gpt-4o".to_string(),
            messages: vec![],
            temperature: None,
            max_tokens: None,
            max_completion_tokens: None,
            stream: false,
            stream_options: None,
            top_p: None,
            stop: None,
            presence_penalty: None,
            frequency_penalty: None,
            tools: None,
            tool_choice: None,
            response_format: None,
            seed: None,
            user: None,
            n: Some(2),
            logprobs: None,
            top_logprobs: None,
        };
        let result = converter.convert_request(&request, "claude-3-5-sonnet-20241022");
        assert!(result.is_err());
    }
}

#[cfg(test)]
mod openai_to_anthropic_cache_tests {
    use super::*;
    use crate::schemas::anthropic::{ContentBlock, MessageContent, SystemContent};
    use crate::schemas::openai::{
        ChatCompletionRequest, ChatMessage, ChatRole, MessageContent as OpenAIMessageContent,
    };

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
            content: Some(OpenAIMessageContent::Text(text.to_string())),
            name: None,
            tool_calls: None,
            tool_call_id: None,
        }
    }

    fn system_msg(text: &str) -> ChatMessage {
        ChatMessage {
            role: ChatRole::System,
            content: Some(OpenAIMessageContent::Text(text.to_string())),
            name: None,
            tool_calls: None,
            tool_call_id: None,
        }
    }

    #[test]
    fn system_gets_cache_control_injected() {
        let req = make_request(vec![system_msg("Be helpful."), user_msg("Hi")]);
        let converter = OpenAIToAnthropicConverter::new();
        let result = converter
            .convert_request(&req, "claude-3-5-sonnet-20241022")
            .unwrap();
        match result.system.unwrap() {
            SystemContent::Messages(msgs) => {
                assert!(msgs.last().unwrap().cache_control.is_some());
            }
            SystemContent::Text(_) => panic!("Expected Messages variant"),
        }
    }

    #[test]
    fn last_user_message_last_block_gets_cache_control() {
        let req = make_request(vec![user_msg("Hello there")]);
        let converter = OpenAIToAnthropicConverter::new();
        let result = converter
            .convert_request(&req, "claude-3-5-sonnet-20241022")
            .unwrap();
        let last_msg = result.messages.last().unwrap();
        match &last_msg.content {
            MessageContent::Blocks(blocks) => {
                let last = blocks.last().unwrap();
                match last {
                    ContentBlock::Text { cache_control, .. } => {
                        assert!(cache_control.is_some());
                    }
                    _ => panic!("Expected Text block"),
                }
            }
            MessageContent::Text(_) => panic!("Expected Blocks variant after cache injection"),
        }
    }
}
