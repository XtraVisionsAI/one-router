//! AWS Bedrock Converse API schema definitions
//!
//! Re-exports AWS SDK types + supplementary types not directly exposed by the SDK.
//! The old hand-written Bedrock structs are no longer used; handlers now talk to
//! the SDK types directly. These re-exports exist so that any future code that
//! needs a convenient single import path can use `schemas::bedrock::*`.

// ============================================================================
// SDK type re-exports
// ============================================================================

pub use aws_sdk_bedrockruntime::operation::converse::ConverseOutput;
pub use aws_sdk_bedrockruntime::types::{
    ContentBlock, ContentBlockDelta, ContentBlockStart, ConversationRole, ConverseStreamOutput,
    DocumentBlock, DocumentFormat, DocumentSource, ImageBlock, ImageFormat, ImageSource,
    InferenceConfiguration, Message, StopReason as SdkStopReason, SystemContentBlock, Tool,
    ToolConfiguration, ToolInputSchema, ToolResultBlock, ToolResultContentBlock, ToolResultStatus,
    ToolSpecification, ToolUseBlock,
};

// ============================================================================
// Supplementary types (SDK does not directly expose these)
// ============================================================================

use serde::{Deserialize, Serialize};

/// Cache point for prompt caching in Bedrock Converse API.
///
/// Can be attached to content blocks in messages, system messages, and tools.
/// See: <https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-caching.html>
#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
pub struct BedrockCachePoint {
    #[serde(rename = "type")]
    pub cache_type: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub ttl: Option<String>,
}

impl Default for BedrockCachePoint {
    fn default() -> Self {
        Self {
            cache_type: "default".to_string(),
            ttl: None,
        }
    }
}

impl BedrockCachePoint {
    pub fn new() -> Self {
        Self::default()
    }

    pub fn with_ttl(ttl: impl Into<String>) -> Self {
        Self {
            cache_type: "default".to_string(),
            ttl: Some(ttl.into()),
        }
    }
}

/// Bedrock stop reason enumeration with Anthropic mapping helpers.
#[derive(Debug, Clone, PartialEq, Eq)]
pub enum BedrockStopReason {
    EndTurn,
    MaxTokens,
    StopSequence,
    ToolUse,
    ContentFiltered,
    Unknown(String),
}

impl BedrockStopReason {
    pub fn parse_str(s: &str) -> Self {
        match s {
            "end_turn" => BedrockStopReason::EndTurn,
            "max_tokens" => BedrockStopReason::MaxTokens,
            "stop_sequence" => BedrockStopReason::StopSequence,
            "tool_use" => BedrockStopReason::ToolUse,
            "content_filtered" => BedrockStopReason::ContentFiltered,
            other => BedrockStopReason::Unknown(other.to_string()),
        }
    }

    pub fn to_anthropic_string(&self) -> &str {
        match self {
            BedrockStopReason::EndTurn => "end_turn",
            BedrockStopReason::MaxTokens => "max_tokens",
            BedrockStopReason::StopSequence => "stop_sequence",
            BedrockStopReason::ToolUse => "tool_use",
            BedrockStopReason::ContentFiltered => "end_turn",
            BedrockStopReason::Unknown(_) => "end_turn",
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
    fn test_stop_reason_mapping() {
        assert_eq!(
            BedrockStopReason::parse_str("end_turn"),
            BedrockStopReason::EndTurn
        );
        assert_eq!(
            BedrockStopReason::parse_str("tool_use"),
            BedrockStopReason::ToolUse
        );
        assert_eq!(BedrockStopReason::EndTurn.to_anthropic_string(), "end_turn");
        assert_eq!(
            BedrockStopReason::ContentFiltered.to_anthropic_string(),
            "end_turn"
        );
    }

    #[test]
    fn test_bedrock_cache_point() {
        let cache_point = BedrockCachePoint::with_ttl("1h");
        assert_eq!(cache_point.cache_type, "default");
        assert_eq!(cache_point.ttl, Some("1h".to_string()));
    }
}
