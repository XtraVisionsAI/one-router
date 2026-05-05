//! Anthropic <-> Gemini converter
//!
//! Handles conversion in both directions:
//! - Anthropic Messages API request → Gemini API request
//! - Gemini API response → Anthropic Messages API response

use crate::schemas::anthropic::{
    ContentBlock, Message, MessageContent, MessageRequest, StopReason, SystemContent, ToolChoice,
    Usage,
};
use crate::schemas::gemini::{
    Candidate, FunctionCallingConfig, FunctionCallingMode, FunctionDeclaration, GeminiContent,
    GeminiRequest, GeminiResponse, GenerationConfig, Part, StreamChunk, Tool as GeminiTool,
    ToolConfig, UsageMetadata,
};
use std::collections::HashMap;
use thiserror::Error;
use uuid::Uuid;

// ============================================================================
// Error Types
// ============================================================================

/// Errors that can occur during Anthropic <-> Gemini conversion.
#[derive(Debug, Error)]
pub enum AnthropicGeminiError {
    #[error("Invalid content block: {0}")]
    InvalidContentBlock(String),

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

    #[error("Missing content: {0}")]
    MissingContent(String),

    #[error("Conversion error: {0}")]
    ConversionError(String),
}

// Allow converting from old specific error types
impl From<AnthropicToGeminiError> for AnthropicGeminiError {
    fn from(e: AnthropicToGeminiError) -> Self {
        match e {
            AnthropicToGeminiError::InvalidContentBlock(s) => Self::InvalidContentBlock(s),
            AnthropicToGeminiError::InvalidMessage(s) => Self::InvalidMessage(s),
            AnthropicToGeminiError::InvalidTool(s) => Self::InvalidTool(s),
            AnthropicToGeminiError::MissingField(s) => Self::MissingField(s),
            AnthropicToGeminiError::UnsupportedFeature(s) => Self::UnsupportedFeature(s),
        }
    }
}

impl From<GeminiToAnthropicError> for AnthropicGeminiError {
    fn from(e: GeminiToAnthropicError) -> Self {
        match e {
            GeminiToAnthropicError::InvalidResponse(s) => Self::InvalidResponse(s),
            GeminiToAnthropicError::MissingContent(s) => Self::MissingContent(s),
            GeminiToAnthropicError::ConversionError(s) => Self::ConversionError(s),
        }
    }
}

// Keep the original error types as aliases for backward compat in the converter structs
pub use self::request::AnthropicToGeminiError;
pub use self::response::GeminiToAnthropicError;

// ============================================================================
// Request Conversion (Anthropic → Gemini)
// ============================================================================

mod request {
    use super::*;

    /// Errors specific to Anthropic → Gemini conversion.
    #[derive(Debug, Error)]
    pub enum AnthropicToGeminiError {
        #[error("Invalid content block: {0}")]
        InvalidContentBlock(String),

        #[error("Invalid message: {0}")]
        InvalidMessage(String),

        #[error("Invalid tool configuration: {0}")]
        InvalidTool(String),

        #[error("Missing required field: {0}")]
        MissingField(String),

        #[error("Unsupported feature: {0}")]
        UnsupportedFeature(String),
    }

    /// Converter for Anthropic Messages API requests to Gemini API format.
    #[derive(Debug, Clone)]
    pub struct AnthropicToGeminiConverter {
        model_mapping: HashMap<String, String>,
    }

    impl Default for AnthropicToGeminiConverter {
        fn default() -> Self {
            Self::new()
        }
    }

    impl AnthropicToGeminiConverter {
        pub fn new() -> Self {
            Self {
                model_mapping: HashMap::new(),
            }
        }

        pub fn with_model_mapping(mut self, anthropic: &str, gemini: &str) -> Self {
            self.model_mapping
                .insert(anthropic.to_string(), gemini.to_string());
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
            request: &MessageRequest,
        ) -> Result<(String, GeminiRequest), AnthropicToGeminiError> {
            let model = self.get_gemini_model(&request.model);

            let contents = self.convert_messages(&request.messages)?;
            let system_instruction = self.convert_system(&request.system)?;
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

        fn convert_messages(
            &self,
            messages: &[Message],
        ) -> Result<Vec<GeminiContent>, AnthropicToGeminiError> {
            let mut contents = Vec::new();

            for message in messages {
                let role = match message.role.as_str() {
                    "user" => "user",
                    "assistant" => "model",
                    other => {
                        return Err(AnthropicToGeminiError::InvalidMessage(format!(
                            "Unknown role: {other}"
                        )))
                    }
                };

                let parts = self.convert_content(&message.content)?;

                contents.push(GeminiContent {
                    role: Some(role.to_string()),
                    parts,
                });
            }

            Ok(contents)
        }

        pub(crate) fn convert_content(
            &self,
            content: &MessageContent,
        ) -> Result<Vec<Part>, AnthropicToGeminiError> {
            // TODO(caching): cache_control on content blocks is silently ignored for Gemini.
            match content {
                MessageContent::Text(text) => Ok(vec![Part::text(text)]),
                MessageContent::Blocks(blocks) => {
                    let mut parts = Vec::new();

                    for block in blocks {
                        match block {
                            ContentBlock::Text { text, .. } => {
                                parts.push(Part::text(text));
                            }
                            ContentBlock::Image { source, .. } => {
                                parts.push(Part::inline_data(&source.media_type, &source.data));
                            }
                            ContentBlock::ToolUse {
                                id: _, name, input, ..
                            } => {
                                parts.push(Part {
                                    text: None,
                                    inline_data: None,
                                    function_call: Some(crate::schemas::gemini::FunctionCall {
                                        name: name.clone(),
                                        args: input.clone(),
                                    }),
                                    function_response: None,
                                });
                            }
                            ContentBlock::ToolResult {
                                tool_use_id,
                                content,
                                ..
                            } => {
                                let response_value = match content {
                                    crate::schemas::anthropic::ToolResultValue::Text(text) => {
                                        serde_json::json!({ "result": text })
                                    }
                                    crate::schemas::anthropic::ToolResultValue::Blocks(blocks) => {
                                        let text: String = blocks
                                            .iter()
                                            .filter_map(|b| b.as_text().map(|s| s.to_string()))
                                            .collect::<Vec<_>>()
                                            .join("\n");
                                        serde_json::json!({ "result": text })
                                    }
                                };

                                parts.push(Part {
                                    text: None,
                                    inline_data: None,
                                    function_call: None,
                                    function_response: Some(
                                        crate::schemas::gemini::FunctionResponse {
                                            name: tool_use_id.clone(),
                                            response: response_value,
                                        },
                                    ),
                                });
                            }
                            ContentBlock::Thinking { .. }
                            | ContentBlock::RedactedThinking { .. } => {}
                            ContentBlock::Document { .. } => {
                                return Err(AnthropicToGeminiError::UnsupportedFeature(
                                    "Document content not yet supported for Gemini".to_string(),
                                ));
                            }
                            ContentBlock::ServerToolUse { .. }
                            | ContentBlock::ServerToolResult { .. } => {}
                        }
                    }

                    Ok(parts)
                }
            }
        }

        fn convert_system(
            &self,
            system: &Option<SystemContent>,
        ) -> Result<Option<GeminiContent>, AnthropicToGeminiError> {
            // TODO(caching): Gemini context caching is not yet supported.
            // cache_control fields on SystemContent and ContentBlock are silently ignored.
            // Gemini caching requires pre-creating a cachedContent resource (32k token min,
            // hourly billing) — see: https://ai.google.dev/gemini-api/docs/caching
            match system {
                None => Ok(None),
                Some(SystemContent::Text(text)) => Ok(Some(GeminiContent::system(text))),
                Some(SystemContent::Messages(messages)) => {
                    let text: String = messages
                        .iter()
                        .map(|m| m.text.clone())
                        .collect::<Vec<_>>()
                        .join("\n");
                    Ok(Some(GeminiContent::system(text)))
                }
            }
        }

        fn convert_generation_config(&self, request: &MessageRequest) -> GenerationConfig {
            GenerationConfig {
                temperature: request.temperature,
                top_p: request.top_p,
                top_k: request.top_k,
                max_output_tokens: Some(request.max_tokens),
                stop_sequences: request.stop_sequences.clone(),
                candidate_count: None,
            }
        }

        fn convert_tools(
            &self,
            tools: &Option<Vec<serde_json::Value>>,
        ) -> Result<Option<Vec<GeminiTool>>, AnthropicToGeminiError> {
            match tools {
                None => Ok(None),
                Some(tools) if tools.is_empty() => Ok(None),
                Some(tools) => {
                    let mut function_declarations = Vec::new();

                    for tool in tools {
                        if let Some(obj) = tool.as_object() {
                            if obj.get("type").and_then(|v| v.as_str())
                                == Some("code_execution_20250825")
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
                                .unwrap_or("")
                                .to_string();
                            let parameters = obj.get("input_schema").cloned();

                            function_declarations.push(FunctionDeclaration {
                                name,
                                description,
                                parameters,
                            });
                        }
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
        ) -> Result<Option<ToolConfig>, AnthropicToGeminiError> {
            match tool_choice {
                None => Ok(None),
                Some(ToolChoice::Auto(s)) => {
                    let mode = match s.as_str() {
                        "any" => FunctionCallingMode::Any,
                        _ => FunctionCallingMode::Auto,
                    };
                    Ok(Some(ToolConfig {
                        function_calling_config: FunctionCallingConfig {
                            mode,
                            allowed_function_names: None,
                        },
                    }))
                }
                Some(ToolChoice::Specific { name, .. }) => Ok(Some(ToolConfig {
                    function_calling_config: FunctionCallingConfig {
                        mode: FunctionCallingMode::Any,
                        allowed_function_names: Some(vec![name.clone()]),
                    },
                })),
                Some(ToolChoice::Object(obj)) => {
                    if let Some(tool_type) = obj.get("type").and_then(|v| v.as_str()) {
                        match tool_type {
                            "auto" => Ok(Some(ToolConfig {
                                function_calling_config: FunctionCallingConfig {
                                    mode: FunctionCallingMode::Auto,
                                    allowed_function_names: None,
                                },
                            })),
                            "any" => Ok(Some(ToolConfig {
                                function_calling_config: FunctionCallingConfig {
                                    mode: FunctionCallingMode::Any,
                                    allowed_function_names: None,
                                },
                            })),
                            "tool" => {
                                let name = obj
                                    .get("name")
                                    .and_then(|v| v.as_str())
                                    .unwrap_or("")
                                    .to_string();
                                Ok(Some(ToolConfig {
                                    function_calling_config: FunctionCallingConfig {
                                        mode: FunctionCallingMode::Any,
                                        allowed_function_names: Some(vec![name]),
                                    },
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
    }
}

pub use request::AnthropicToGeminiConverter;

// ============================================================================
// Response Conversion (Gemini → Anthropic)
// ============================================================================

mod response {
    use super::*;

    /// Errors specific to Gemini → Anthropic conversion.
    #[derive(Debug, Error)]
    pub enum GeminiToAnthropicError {
        #[error("Invalid response: {0}")]
        InvalidResponse(String),

        #[error("Missing content: {0}")]
        MissingContent(String),

        #[error("Conversion error: {0}")]
        ConversionError(String),
    }

    /// Converter for Gemini API responses to Anthropic Messages API format.
    #[derive(Debug, Clone, Default)]
    pub struct GeminiToAnthropicConverter;

    impl GeminiToAnthropicConverter {
        pub fn new() -> Self {
            Self
        }

        pub fn convert_response(
            &self,
            response: &GeminiResponse,
            model: &str,
        ) -> Result<crate::schemas::anthropic::MessageResponse, GeminiToAnthropicError> {
            let candidate = response.candidates.first().ok_or_else(|| {
                GeminiToAnthropicError::MissingContent("No candidates".to_string())
            })?;

            let content = self.convert_content(candidate)?;
            let stop_reason = self.convert_finish_reason(candidate.finish_reason.as_deref());
            let usage = self.convert_usage(response.usage_metadata.as_ref());

            Ok(crate::schemas::anthropic::MessageResponse {
                id: format!("msg_{}", Uuid::new_v4().to_string().replace("-", "")),
                response_type: "message".to_string(),
                role: "assistant".to_string(),
                content,
                model: model.to_string(),
                stop_reason: Some(stop_reason),
                stop_sequence: None,
                usage,
                container: None,
            })
        }

        fn convert_content(
            &self,
            candidate: &Candidate,
        ) -> Result<Vec<ContentBlock>, GeminiToAnthropicError> {
            let mut blocks = Vec::new();

            for part in &candidate.content.parts {
                if let Some(ref text) = part.text {
                    blocks.push(ContentBlock::Text {
                        text: text.clone(),
                        cache_control: None,
                    });
                }

                if let Some(ref function_call) = part.function_call {
                    blocks.push(ContentBlock::ToolUse {
                        id: format!("toolu_{}", Uuid::new_v4().to_string().replace("-", "")),
                        name: function_call.name.clone(),
                        input: function_call.args.clone(),
                        caller: None,
                    });
                }
            }

            Ok(blocks)
        }

        pub(crate) fn convert_finish_reason(&self, finish_reason: Option<&str>) -> StopReason {
            match finish_reason {
                Some("STOP") => StopReason::EndTurn,
                Some("MAX_TOKENS") => StopReason::MaxTokens,
                Some("SAFETY") => StopReason::EndTurn,
                Some("RECITATION") => StopReason::EndTurn,
                Some("OTHER") => StopReason::EndTurn,
                _ => StopReason::EndTurn,
            }
        }

        pub(crate) fn convert_usage(&self, usage: Option<&UsageMetadata>) -> Usage {
            match usage {
                Some(u) => Usage {
                    input_tokens: u.prompt_token_count,
                    output_tokens: u.candidates_token_count,
                    cache_creation_input_tokens: None,
                    cache_read_input_tokens: None,
                },
                None => Usage {
                    input_tokens: 0,
                    output_tokens: 0,
                    cache_creation_input_tokens: None,
                    cache_read_input_tokens: None,
                },
            }
        }

        pub fn convert_stream_chunk(
            &self,
            chunk: &StreamChunk,
        ) -> Result<(Option<String>, Option<StopReason>), GeminiToAnthropicError> {
            let mut text_delta = None;
            let mut finish_reason = None;

            if let Some(candidate) = chunk.candidates.first() {
                for part in &candidate.content.parts {
                    if let Some(ref text) = part.text {
                        text_delta = Some(text.clone());
                    }
                }

                if let Some(ref reason) = candidate.finish_reason {
                    finish_reason = Some(self.convert_finish_reason(Some(reason)));
                }
            }

            Ok((text_delta, finish_reason))
        }
    }
}

pub use response::GeminiToAnthropicConverter;

// ============================================================================
// Tests
// ============================================================================

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_model_passthrough() {
        let converter = AnthropicToGeminiConverter::new();
        assert_eq!(
            converter.get_gemini_model("gemini-2.5-flash"),
            "gemini-2.5-flash"
        );
    }

    #[test]
    fn test_custom_model_mapping() {
        let converter = AnthropicToGeminiConverter::new()
            .with_model_mapping("my-custom-model", "gemini-2.5-flash");
        assert_eq!(
            converter.get_gemini_model("my-custom-model"),
            "gemini-2.5-flash"
        );
        assert_eq!(
            converter.get_gemini_model("gemini-3-flash-preview"),
            "gemini-3-flash-preview"
        );
    }

    #[test]
    fn test_convert_simple_message() {
        let converter = AnthropicToGeminiConverter::new();
        let content = MessageContent::Text("Hello".to_string());
        let parts = converter.convert_content(&content).unwrap();
        assert_eq!(parts.len(), 1);
        assert_eq!(parts[0].text, Some("Hello".to_string()));
    }

    #[test]
    fn test_convert_finish_reason() {
        let converter = GeminiToAnthropicConverter::new();
        assert_eq!(
            converter.convert_finish_reason(Some("STOP")),
            StopReason::EndTurn
        );
        assert_eq!(
            converter.convert_finish_reason(Some("MAX_TOKENS")),
            StopReason::MaxTokens
        );
        assert_eq!(converter.convert_finish_reason(None), StopReason::EndTurn);
    }

    #[test]
    fn test_convert_usage() {
        let converter = GeminiToAnthropicConverter::new();
        let usage = UsageMetadata {
            prompt_token_count: 100,
            candidates_token_count: 50,
            total_token_count: 150,
        };
        let converted = converter.convert_usage(Some(&usage));
        assert_eq!(converted.input_tokens, 100);
        assert_eq!(converted.output_tokens, 50);
    }
}
