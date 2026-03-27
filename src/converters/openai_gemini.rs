//! OpenAI <-> Gemini converter
//!
//! Handles conversion in both directions:
//! - OpenAI Chat Completions API request → Gemini API request
//! - Gemini API response → OpenAI Chat Completions API response

use crate::schemas::gemini::{
    Candidate, FunctionCallingConfig, FunctionDeclaration, GeminiContent, GeminiRequest,
    GeminiResponse, GenerationConfig, Part, StreamChunk, Tool as GeminiTool, ToolConfig,
    UsageMetadata,
};
use crate::schemas::openai::{
    AssistantMessage, ChatCompletionChunk, ChatCompletionRequest, ChatCompletionResponse,
    ChatMessage, ChatRole, Choice, ChunkChoice, ChunkDelta, CompletionUsage, ContentPart,
    FunctionCall, FunctionCallDelta, MessageContent, Tool, ToolCall, ToolCallDelta, ToolChoice,
};
use base64::{engine::general_purpose::STANDARD as BASE64, Engine};
use std::collections::HashMap;
use thiserror::Error;
use uuid::Uuid;

// ============================================================================
// Error Types
// ============================================================================

/// Errors that can occur during OpenAI <-> Gemini conversion.
#[derive(Debug, Error)]
pub enum OpenAIGeminiError {
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

    #[error("Invalid response: {0}")]
    InvalidResponse(String),

    #[error("Missing content: {0}")]
    MissingContent(String),

    #[error("Conversion error: {0}")]
    ConversionError(String),
}

// ============================================================================
// Request Conversion (OpenAI → Gemini)
// ============================================================================

/// Converter for OpenAI Chat Completions API requests to Gemini API format.
#[derive(Debug, Clone)]
pub struct OpenAIToGeminiConverter {
    model_mapping: HashMap<String, String>,
}

impl Default for OpenAIToGeminiConverter {
    fn default() -> Self {
        Self::new()
    }
}

impl OpenAIToGeminiConverter {
    pub fn new() -> Self {
        Self {
            model_mapping: HashMap::new(),
        }
    }

    pub fn with_model_mapping(mut self, openai: &str, gemini: &str) -> Self {
        self.model_mapping
            .insert(openai.to_string(), gemini.to_string());
        self
    }

    pub fn get_gemini_model(&self, model: &str) -> String {
        self.model_mapping
            .get(model)
            .cloned()
            .unwrap_or_else(|| model.to_string())
    }

    pub fn convert_request(
        &self,
        request: &ChatCompletionRequest,
    ) -> Result<(String, GeminiRequest), OpenAIGeminiError> {
        // TODO(caching): Gemini context caching is not yet supported.
        // OpenAI requests have no cache_control field; no caching is applied for this path.
        // See: https://ai.google.dev/gemini-api/docs/caching
        let model = self.get_gemini_model(&request.model);

        let (system_messages, chat_messages) = self.split_messages(&request.messages);

        let contents = self.convert_messages(&chat_messages)?;
        let system_instruction = self.convert_system_messages(&system_messages)?;
        let generation_config = Some(self.convert_generation_config(request));
        let tools = self.convert_tools(&request.tools)?;
        let tool_config = self.convert_tool_choice(&request.tool_choice)?;

        let gemini_request = GeminiRequest {
            contents,
            system_instruction,
            generation_config,
            safety_settings: None,
            tools,
            tool_config,
        };

        Ok((model, gemini_request))
    }

    fn split_messages<'a>(
        &self,
        messages: &'a [ChatMessage],
    ) -> (Vec<&'a ChatMessage>, Vec<&'a ChatMessage>) {
        let system: Vec<_> = messages
            .iter()
            .filter(|m| m.role == ChatRole::System)
            .collect();

        let others: Vec<_> = messages
            .iter()
            .filter(|m| m.role != ChatRole::System)
            .collect();

        (system, others)
    }

    fn convert_messages(
        &self,
        messages: &[&ChatMessage],
    ) -> Result<Vec<GeminiContent>, OpenAIGeminiError> {
        let mut contents = Vec::new();

        for message in messages {
            if let Some(content) = self.convert_message(message)? {
                contents.push(content);
            }
        }

        Ok(contents)
    }

    fn convert_message(
        &self,
        message: &ChatMessage,
    ) -> Result<Option<GeminiContent>, OpenAIGeminiError> {
        let role = match message.role {
            ChatRole::User => "user",
            ChatRole::Assistant => "model",
            ChatRole::Tool => "user",
            ChatRole::System => return Ok(None),
        };

        let parts = self.convert_message_content(message)?;

        if parts.is_empty() {
            return Ok(None);
        }

        Ok(Some(GeminiContent {
            role: Some(role.to_string()),
            parts,
        }))
    }

    fn convert_message_content(
        &self,
        message: &ChatMessage,
    ) -> Result<Vec<Part>, OpenAIGeminiError> {
        // Handle tool role messages (function responses)
        if message.role == ChatRole::Tool {
            return self.convert_tool_result_message(message);
        }

        // Handle assistant messages with tool calls
        if message.role == ChatRole::Assistant {
            if let Some(ref tool_calls) = message.tool_calls {
                let mut parts = Vec::new();

                if let Some(ref content) = message.content {
                    let text = content.to_string_content();
                    if !text.is_empty() {
                        parts.push(Part::text(&text));
                    }
                }

                for tool_call in tool_calls {
                    let args: serde_json::Value =
                        serde_json::from_str(&tool_call.function.arguments)
                            .unwrap_or_else(|_| serde_json::json!({}));

                    parts.push(Part {
                        text: None,
                        inline_data: None,
                        function_call: Some(crate::schemas::gemini::FunctionCall {
                            name: tool_call.function.name.clone(),
                            args,
                        }),
                        function_response: None,
                    });
                }

                return Ok(parts);
            }
        }

        // Handle regular content
        match &message.content {
            Some(MessageContent::Text(text)) => Ok(vec![Part::text(text)]),
            Some(MessageContent::Parts(parts)) => self.convert_content_parts(parts),
            None => Ok(vec![]),
        }
    }

    fn convert_content_parts(&self, parts: &[ContentPart]) -> Result<Vec<Part>, OpenAIGeminiError> {
        let mut result = Vec::new();

        for part in parts {
            match part {
                ContentPart::Text { text } => {
                    result.push(Part::text(text));
                }
                ContentPart::ImageUrl { image_url } => {
                    let (media_type, data) = self.convert_image_url(&image_url.url)?;
                    result.push(Part::inline_data(&media_type, &data));
                }
            }
        }

        Ok(result)
    }

    fn convert_image_url(&self, url: &str) -> Result<(String, String), OpenAIGeminiError> {
        if url.starts_with("data:") {
            return self.convert_data_url(url);
        }

        Err(OpenAIGeminiError::InvalidImageUrl(
            "External image URLs are not supported. Use base64 data URLs instead.".to_string(),
        ))
    }

    fn convert_data_url(&self, url: &str) -> Result<(String, String), OpenAIGeminiError> {
        let parts: Vec<&str> = url.splitn(2, ',').collect();
        if parts.len() != 2 {
            return Err(OpenAIGeminiError::InvalidImageUrl(
                "Invalid data URL format".to_string(),
            ));
        }

        let metadata = parts[0];
        let data = parts[1];

        let media_type = metadata
            .strip_prefix("data:")
            .and_then(|s| s.split(';').next())
            .ok_or_else(|| {
                OpenAIGeminiError::InvalidImageUrl("Could not parse media type".to_string())
            })?;

        BASE64
            .decode(data)
            .map_err(|e| OpenAIGeminiError::Base64DecodeError(e.to_string()))?;

        Ok((media_type.to_string(), data.to_string()))
    }

    fn convert_tool_result_message(
        &self,
        message: &ChatMessage,
    ) -> Result<Vec<Part>, OpenAIGeminiError> {
        let tool_call_id = message.tool_call_id.as_ref().ok_or_else(|| {
            OpenAIGeminiError::MissingField("tool_call_id for tool message".to_string())
        })?;

        let content_text = message
            .content
            .as_ref()
            .map(|c| c.to_string_content())
            .unwrap_or_default();

        Ok(vec![Part {
            text: None,
            inline_data: None,
            function_call: None,
            function_response: Some(crate::schemas::gemini::FunctionResponse {
                name: tool_call_id.clone(),
                response: serde_json::json!({ "result": content_text }),
            }),
        }])
    }

    fn convert_system_messages(
        &self,
        messages: &[&ChatMessage],
    ) -> Result<Option<GeminiContent>, OpenAIGeminiError> {
        if messages.is_empty() {
            return Ok(None);
        }

        let text: String = messages
            .iter()
            .filter_map(|m| m.content.as_ref().map(|c| c.to_string_content()))
            .collect::<Vec<_>>()
            .join("\n");

        if text.is_empty() {
            return Ok(None);
        }

        Ok(Some(GeminiContent::system(&text)))
    }

    fn convert_generation_config(&self, request: &ChatCompletionRequest) -> GenerationConfig {
        let max_tokens = request
            .max_completion_tokens
            .or(request.max_tokens)
            .unwrap_or(4096);

        GenerationConfig {
            temperature: request.temperature,
            top_p: request.top_p,
            top_k: None,
            max_output_tokens: Some(max_tokens),
            stop_sequences: request.stop.as_ref().map(|s| s.to_vec()),
            candidate_count: None,
        }
    }

    fn convert_tools(
        &self,
        tools: &Option<Vec<Tool>>,
    ) -> Result<Option<Vec<GeminiTool>>, OpenAIGeminiError> {
        match tools {
            None => Ok(None),
            Some(tools) if tools.is_empty() => Ok(None),
            Some(tools) => {
                let mut function_declarations = Vec::new();

                for tool in tools {
                    if tool.tool_type != "function" {
                        continue;
                    }

                    function_declarations.push(FunctionDeclaration {
                        name: tool.function.name.clone(),
                        description: tool.function.description.clone().unwrap_or_default(),
                        parameters: tool.function.parameters.clone(),
                    });
                }

                if function_declarations.is_empty() {
                    Ok(None)
                } else {
                    Ok(Some(vec![GeminiTool {
                        function_declarations,
                    }]))
                }
            }
        }
    }

    fn convert_tool_choice(
        &self,
        tool_choice: &Option<ToolChoice>,
    ) -> Result<Option<ToolConfig>, OpenAIGeminiError> {
        match tool_choice {
            None => Ok(None),
            Some(ToolChoice::Mode(mode)) => {
                let gemini_mode = match mode.as_str() {
                    "none" => "NONE",
                    "auto" => "AUTO",
                    "required" => "ANY",
                    _ => "AUTO",
                };

                Ok(Some(ToolConfig {
                    function_calling_config: FunctionCallingConfig {
                        mode: gemini_mode.to_string(),
                        allowed_function_names: None,
                    },
                }))
            }
            Some(ToolChoice::Function { function, .. }) => Ok(Some(ToolConfig {
                function_calling_config: FunctionCallingConfig {
                    mode: "ANY".to_string(),
                    allowed_function_names: Some(vec![function.name.clone()]),
                },
            })),
        }
    }
}

// ============================================================================
// Response Conversion (Gemini → OpenAI)
// ============================================================================

/// Converter for Gemini API responses to OpenAI Chat Completions API format.
#[derive(Debug, Clone, Default)]
pub struct GeminiToOpenAIConverter;

impl GeminiToOpenAIConverter {
    pub fn new() -> Self {
        Self
    }

    pub fn convert_response(
        &self,
        response: &GeminiResponse,
        model: &str,
    ) -> Result<ChatCompletionResponse, OpenAIGeminiError> {
        let candidate = response
            .candidates
            .first()
            .ok_or_else(|| OpenAIGeminiError::MissingContent("No candidates".to_string()))?;

        let message = self.convert_candidate_to_message(candidate)?;
        let finish_reason = self.convert_finish_reason(candidate.finish_reason.as_deref());
        let usage = self.convert_usage(response.usage_metadata.as_ref());

        let id = format!("chatcmpl-{}", Uuid::new_v4().to_string().replace("-", ""));

        Ok(ChatCompletionResponse {
            id,
            object: "chat.completion".to_string(),
            created: chrono::Utc::now().timestamp(),
            model: model.to_string(),
            choices: vec![Choice {
                index: 0,
                message,
                finish_reason: Some(finish_reason),
                logprobs: None,
            }],
            usage,
            system_fingerprint: None,
        })
    }

    fn convert_candidate_to_message(
        &self,
        candidate: &Candidate,
    ) -> Result<AssistantMessage, OpenAIGeminiError> {
        let mut text_parts = Vec::new();
        let mut tool_calls = Vec::new();

        for part in &candidate.content.parts {
            if let Some(ref text) = part.text {
                text_parts.push(text.clone());
            }

            if let Some(ref function_call) = part.function_call {
                let call_id = format!("call_{}", Uuid::new_v4().to_string().replace("-", ""));
                tool_calls.push(ToolCall {
                    id: call_id,
                    tool_type: "function".to_string(),
                    function: FunctionCall {
                        name: function_call.name.clone(),
                        arguments: serde_json::to_string(&function_call.args)
                            .unwrap_or_else(|_| "{}".to_string()),
                    },
                });
            }
        }

        let content = if text_parts.is_empty() {
            None
        } else {
            Some(text_parts.join(""))
        };

        Ok(AssistantMessage {
            role: ChatRole::Assistant,
            content,
            tool_calls: if tool_calls.is_empty() {
                None
            } else {
                Some(tool_calls)
            },
        })
    }

    fn convert_finish_reason(&self, finish_reason: Option<&str>) -> String {
        match finish_reason {
            Some("STOP") => "stop".to_string(),
            Some("MAX_TOKENS") => "length".to_string(),
            Some("SAFETY") => "content_filter".to_string(),
            Some("RECITATION") => "content_filter".to_string(),
            Some("OTHER") => "stop".to_string(),
            _ => "stop".to_string(),
        }
    }

    fn convert_usage(&self, usage: Option<&UsageMetadata>) -> CompletionUsage {
        match usage {
            Some(u) => CompletionUsage {
                prompt_tokens: u.prompt_token_count,
                completion_tokens: u.candidates_token_count,
                total_tokens: u.total_token_count,
                completion_tokens_details: None,
            },
            None => CompletionUsage {
                prompt_tokens: 0,
                completion_tokens: 0,
                total_tokens: 0,
                completion_tokens_details: None,
            },
        }
    }

    pub fn convert_stream_chunk(
        &self,
        chunk: &StreamChunk,
        model: &str,
        chunk_index: i32,
    ) -> Result<ChatCompletionChunk, OpenAIGeminiError> {
        let id = format!("chatcmpl-{}", Uuid::new_v4().to_string().replace("-", ""));

        let mut delta = ChunkDelta {
            role: None,
            content: None,
            tool_calls: None,
        };

        let mut finish_reason = None;

        if let Some(candidate) = chunk.candidates.first() {
            for part in &candidate.content.parts {
                if let Some(ref text) = part.text {
                    delta.content = Some(text.clone());
                }

                if let Some(ref function_call) = part.function_call {
                    let call_id = format!("call_{}", Uuid::new_v4().to_string().replace("-", ""));
                    delta.tool_calls = Some(vec![ToolCallDelta {
                        index: 0,
                        id: Some(call_id),
                        tool_type: Some("function".to_string()),
                        function: Some(FunctionCallDelta {
                            name: Some(function_call.name.clone()),
                            arguments: Some(
                                serde_json::to_string(&function_call.args)
                                    .unwrap_or_else(|_| "{}".to_string()),
                            ),
                        }),
                    }]);
                }
            }

            if let Some(ref reason) = candidate.finish_reason {
                finish_reason = Some(self.convert_finish_reason(Some(reason)));
            }
        }

        if chunk_index == 0 {
            delta.role = Some(ChatRole::Assistant);
        }

        Ok(ChatCompletionChunk {
            id,
            object: "chat.completion.chunk".to_string(),
            created: chrono::Utc::now().timestamp(),
            model: model.to_string(),
            choices: vec![ChunkChoice {
                index: 0,
                delta,
                finish_reason,
                logprobs: None,
            }],
            system_fingerprint: None,
            usage: None,
        })
    }

    pub fn create_final_stream_response(
        &self,
        model: &str,
        usage: Option<&UsageMetadata>,
    ) -> ChatCompletionChunk {
        let id = format!("chatcmpl-{}", Uuid::new_v4().to_string().replace("-", ""));

        ChatCompletionChunk {
            id,
            object: "chat.completion.chunk".to_string(),
            created: chrono::Utc::now().timestamp(),
            model: model.to_string(),
            choices: vec![],
            usage: usage.map(|u| CompletionUsage {
                prompt_tokens: u.prompt_token_count,
                completion_tokens: u.candidates_token_count,
                total_tokens: u.total_token_count,
                completion_tokens_details: None,
            }),
            system_fingerprint: None,
        }
    }
}

// ============================================================================
// Tests
// ============================================================================

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_model_passthrough() {
        let converter = OpenAIToGeminiConverter::new();
        assert_eq!(
            converter.get_gemini_model("gemini-2.5-flash"),
            "gemini-2.5-flash"
        );
    }

    #[test]
    fn test_custom_model_mapping() {
        let converter = OpenAIToGeminiConverter::new()
            .with_model_mapping("my-custom-model", "gemini-2.5-flash");
        assert_eq!(
            converter.get_gemini_model("my-custom-model"),
            "gemini-2.5-flash"
        );
        assert_eq!(
            converter.get_gemini_model("gemini-3-pro-image-preview"),
            "gemini-3-pro-image-preview"
        );
    }

    #[test]
    fn test_convert_simple_message() {
        let converter = OpenAIToGeminiConverter::new();
        let message = ChatMessage {
            role: ChatRole::User,
            content: Some(MessageContent::Text("Hello".to_string())),
            name: None,
            tool_calls: None,
            tool_call_id: None,
        };
        let result = converter.convert_message(&message).unwrap().unwrap();
        assert_eq!(result.role, Some("user".to_string()));
        assert_eq!(result.parts.len(), 1);
        assert_eq!(result.parts[0].text, Some("Hello".to_string()));
    }

    #[test]
    fn test_convert_finish_reason() {
        let converter = GeminiToOpenAIConverter::new();
        assert_eq!(converter.convert_finish_reason(Some("STOP")), "stop");
        assert_eq!(
            converter.convert_finish_reason(Some("MAX_TOKENS")),
            "length"
        );
        assert_eq!(
            converter.convert_finish_reason(Some("SAFETY")),
            "content_filter"
        );
        assert_eq!(converter.convert_finish_reason(None), "stop");
    }

    #[test]
    fn test_convert_usage() {
        let converter = GeminiToOpenAIConverter::new();
        let usage = UsageMetadata {
            prompt_token_count: 100,
            candidates_token_count: 50,
            total_token_count: 150,
        };
        let converted = converter.convert_usage(Some(&usage));
        assert_eq!(converted.prompt_tokens, 100);
        assert_eq!(converted.completion_tokens, 50);
        assert_eq!(converted.total_tokens, 150);
    }

    #[test]
    fn test_convert_generation_config() {
        let converter = OpenAIToGeminiConverter::new();
        let request = ChatCompletionRequest {
            model: "gpt-4".to_string(),
            messages: vec![],
            temperature: Some(0.7),
            max_tokens: Some(1024),
            max_completion_tokens: None,
            stream: false,
            stream_options: None,
            top_p: Some(0.9),
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
        let config = converter.convert_generation_config(&request);
        assert_eq!(config.temperature, Some(0.7));
        assert_eq!(config.top_p, Some(0.9));
        assert_eq!(config.max_output_tokens, Some(1024));
    }
}
