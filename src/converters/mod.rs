//! Converters module
//!
//! Contains logic for converting between API formats, organized by endpoint + backend:
//! - `anthropic_bedrock` — Anthropic <-> Bedrock (SDK types)
//! - `openai_bedrock`    — OpenAI <-> Bedrock (SDK types)
//! - `anthropic_gemini`  — Anthropic <-> Gemini
//! - `openai_gemini`     — OpenAI <-> Gemini
//! - `sdk_utils`         — Shared Document ↔ JSON conversion utilities

pub mod anthropic_bedrock;
pub mod anthropic_gemini;
pub mod openai_bedrock;
pub mod openai_gemini;
pub mod sdk_utils;

// Re-export error types
pub use anthropic_bedrock::ConversionError;
pub use anthropic_gemini::{
    AnthropicGeminiError, AnthropicToGeminiConverter, GeminiToAnthropicConverter,
};
pub use openai_bedrock::OpenAIConversionError;
pub use openai_gemini::{GeminiToOpenAIConverter, OpenAIGeminiError, OpenAIToGeminiConverter};
