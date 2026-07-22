//! OpenAI Responses API schema definitions.
//!
//! The Responses API (`POST /v1/responses`) is OpenAI's successor to Chat
//! Completions. Requests use `input`/`instructions`/`max_output_tokens`/
//! `previous_response_id`; responses are a `response` object with an `output[]`
//! array and an `output_text` convenience field. Streaming uses named SSE
//! events (`response.created`, `response.output_text.delta`, `response.completed`,
//! …) — each frame carries an `event: <type>` line that strict clients (OpenAI
//! Codex CLI) require.
//!
//! one-router translates Responses ↔ Chat Completions internally, so most
//! fields are intentionally lenient (`serde_json::Value`) — we only model what
//! the converters need and pass the rest through.

use serde::{Deserialize, Serialize};

// ============================================================================
// Request
// ============================================================================

/// `input` is either a bare string (single user turn) or an array of items
/// (messages / function_call / function_call_output). Items stay as `Value`
/// and are interpreted defensively by the converter.
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(untagged)]
pub enum ResponsesInput {
    Text(String),
    Items(Vec<serde_json::Value>),
}

/// OpenAI Responses API request.
#[derive(Debug, Clone, Deserialize)]
pub struct ResponsesRequest {
    pub model: String,

    #[serde(default)]
    pub input: Option<ResponsesInput>,

    /// System-level instructions (maps to a leading system message).
    #[serde(default)]
    pub instructions: Option<String>,

    /// Tool definitions (function tools are flat: `{type,name,description,parameters}`;
    /// hosted tools like `web_search` carry `{type:"web_search"}`).
    #[serde(default)]
    pub tools: Option<Vec<serde_json::Value>>,

    #[serde(default)]
    pub tool_choice: Option<serde_json::Value>,

    #[serde(default)]
    pub max_output_tokens: Option<i32>,

    #[serde(default)]
    pub temperature: Option<f32>,

    #[serde(default)]
    pub top_p: Option<f32>,

    #[serde(default)]
    pub stream: bool,

    /// Stateful continuation — load the prior turn's messages from the context store.
    #[serde(default)]
    pub previous_response_id: Option<String>,

    /// Reasoning config (e.g. `{"effort":"medium"}`). Passed through / mapped best-effort.
    #[serde(default)]
    pub reasoning: Option<serde_json::Value>,

    #[serde(default)]
    pub metadata: Option<serde_json::Value>,

    /// Whether the server should persist the response for `previous_response_id`
    /// continuation. Defaults to true (store) when absent.
    #[serde(default)]
    pub store: Option<bool>,

    #[serde(default)]
    pub service_tier: Option<String>,
}

impl ResponsesRequest {
    /// Whether to persist this response's context (default true).
    pub fn should_store(&self) -> bool {
        self.store.unwrap_or(true)
    }
}

// ============================================================================
// Response
// ============================================================================

/// OpenAI Responses API response object.
///
/// `output` items (message / function_call / web_search_call) are built as
/// `serde_json::Value` by the converters — mirroring the OpenAI wire shape
/// exactly without a variant per item type.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ResponsesResponse {
    pub id: String,
    pub object: String, // "response"
    pub created_at: i64,
    pub status: String, // "completed" | "incomplete"
    pub model: String,
    pub output: Vec<serde_json::Value>,
    pub output_text: String,
    pub usage: ResponsesUsage,
}

/// Responses API usage block.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ResponsesUsage {
    pub input_tokens: i32,
    pub output_tokens: i32,
    pub total_tokens: i32,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub input_tokens_details: Option<InputTokensDetails>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub output_tokens_details: Option<OutputTokensDetails>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct InputTokensDetails {
    pub cached_tokens: i32,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct OutputTokensDetails {
    pub reasoning_tokens: i32,
}

/// Generate a Responses object id (`resp_<32 hex>`).
pub fn generate_response_id() -> String {
    format!("resp_{}", uuid::Uuid::new_v4().simple())
}

/// Generate a message output-item id (`msg_<32 hex>`).
pub fn generate_message_id() -> String {
    format!("msg_{}", uuid::Uuid::new_v4().simple())
}
