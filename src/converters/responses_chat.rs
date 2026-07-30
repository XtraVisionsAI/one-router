//! Responses API ↔ Chat Completions translation (main path).
//!
//! one-router has no Responses-native backend; it reuses the existing Chat
//! Completions pipeline (all 4 providers). This module converts a
//! `ResponsesRequest` into a `ChatCompletionRequest` and converts the resulting
//! `ChatCompletionResponse` back into a `ResponsesResponse`.
//!
//! Hosted `web_search` requests take a different path (see `responses.rs`); this
//! module handles text + function-tool requests.

use crate::schemas::openai::{
    AssistantMessage, ChatCompletionRequest, ChatCompletionResponse, ChatMessage, ChatRole,
    ContentPart, FunctionCall, FunctionDef, ImageUrl, MessageContent, Tool, ToolCall, ToolChoice,
};
use crate::schemas::responses::{
    generate_message_id, generate_response_id, InputTokensDetails, OutputTokensDetails,
    ResponsesInput, ResponsesRequest, ResponsesResponse, ResponsesUsage,
};

/// Hosted web_search tool types recognized in the Responses API.
const WEB_SEARCH_TOOL_TYPES: &[&str] = &["web_search", "web_search_preview"];

/// Whether the request carries a hosted `web_search` tool (→ Anthropic
/// WebToolExecutor path rather than the plain chat pipeline).
pub fn is_responses_web_search_request(req: &ResponsesRequest) -> bool {
    req.tools.as_ref().is_some_and(|tools| {
        tools.iter().any(|t| {
            t.get("type")
                .and_then(|ty| ty.as_str())
                .is_some_and(|ty| WEB_SEARCH_TOOL_TYPES.contains(&ty))
        })
    })
}

/// Parse a Responses role string into a `ChatRole`. `developer` folds into system.
fn parse_role(role: &str) -> ChatRole {
    match role {
        "system" | "developer" => ChatRole::System,
        "assistant" => ChatRole::Assistant,
        "tool" => ChatRole::Tool,
        _ => ChatRole::User,
    }
}

/// Convert a Responses content value (string or array of typed parts) into a
/// Chat `MessageContent`. Handles `input_text`/`output_text`/`text` and
/// `input_image`/`image_url`.
fn convert_content(content: &serde_json::Value) -> Option<MessageContent> {
    match content {
        serde_json::Value::String(s) => Some(MessageContent::Text(s.clone())),
        serde_json::Value::Array(items) => {
            let mut parts: Vec<ContentPart> = Vec::new();
            for item in items {
                let part_type = item.get("type").and_then(|t| t.as_str()).unwrap_or("");
                match part_type {
                    "input_text" | "output_text" | "text" => {
                        if let Some(text) = item.get("text").and_then(|t| t.as_str()) {
                            parts.push(ContentPart::Text {
                                text: text.to_string(),
                            });
                        }
                    }
                    "input_image" | "image_url" => {
                        // `image_url` may be a bare string or `{url, detail}`.
                        let url = item
                            .get("image_url")
                            .and_then(|iu| match iu {
                                serde_json::Value::String(s) => Some(s.clone()),
                                serde_json::Value::Object(o) => {
                                    o.get("url").and_then(|u| u.as_str()).map(String::from)
                                }
                                _ => None,
                            })
                            .or_else(|| item.get("url").and_then(|u| u.as_str()).map(String::from));
                        if let Some(url) = url {
                            parts.push(ContentPart::ImageUrl {
                                image_url: ImageUrl { url, detail: None },
                            });
                        }
                    }
                    _ => {}
                }
            }
            if parts.is_empty() {
                None
            } else if parts.len() == 1 {
                if let ContentPart::Text { text } = &parts[0] {
                    Some(MessageContent::Text(text.clone()))
                } else {
                    Some(MessageContent::Parts(parts))
                }
            } else {
                Some(MessageContent::Parts(parts))
            }
        }
        _ => None,
    }
}

/// Convert a single Responses `input` item into zero or more Chat messages.
fn convert_input_item(item: &serde_json::Value) -> Vec<ChatMessage> {
    let item_type = item.get("type").and_then(|t| t.as_str()).unwrap_or("");

    match item_type {
        "function_call" => {
            let call_id = item
                .get("call_id")
                .or_else(|| item.get("id"))
                .and_then(|v| v.as_str())
                .unwrap_or("")
                .to_string();
            let name = item
                .get("name")
                .and_then(|v| v.as_str())
                .unwrap_or("")
                .to_string();
            let arguments = match item.get("arguments") {
                Some(serde_json::Value::String(s)) => s.clone(),
                Some(v) => v.to_string(),
                None => "{}".to_string(),
            };
            vec![ChatMessage {
                role: ChatRole::Assistant,
                content: None,
                name: None,
                tool_calls: Some(vec![ToolCall {
                    id: call_id,
                    tool_type: "function".to_string(),
                    function: FunctionCall { name, arguments },
                }]),
                tool_call_id: None,
            }]
        }
        "function_call_output" => {
            let call_id = item
                .get("call_id")
                .and_then(|v| v.as_str())
                .unwrap_or("")
                .to_string();
            let output = match item.get("output") {
                Some(serde_json::Value::String(s)) => s.clone(),
                Some(v) => v.to_string(),
                None => String::new(),
            };
            vec![ChatMessage {
                role: ChatRole::Tool,
                content: Some(MessageContent::Text(output)),
                name: None,
                tool_calls: None,
                tool_call_id: Some(call_id),
            }]
        }
        // "message" items, or items with a bare role field.
        _ => {
            let Some(role) = item.get("role").and_then(|r| r.as_str()) else {
                return Vec::new();
            };
            let content = item.get("content").and_then(convert_content);
            vec![ChatMessage {
                role: parse_role(role),
                content,
                name: None,
                tool_calls: None,
                tool_call_id: None,
            }]
        }
    }
}

/// Convert a Responses function-tool value into a Chat `Tool`. Returns `None`
/// for hosted tools (web_search) — those are handled on a separate path.
fn convert_tool(tool: &serde_json::Value) -> Option<Tool> {
    let tool_type = tool.get("type").and_then(|t| t.as_str()).unwrap_or("");
    if tool_type != "function" {
        return None;
    }
    // Responses flattens function tools: {type, name, description, parameters}.
    // Chat nests them under `function`.
    let name = tool.get("name").and_then(|n| n.as_str())?.to_string();
    Some(Tool {
        tool_type: "function".to_string(),
        function: FunctionDef {
            name,
            description: tool
                .get("description")
                .and_then(|d| d.as_str())
                .map(String::from),
            parameters: tool.get("parameters").cloned(),
            strict: tool.get("strict").and_then(|s| s.as_bool()),
        },
    })
}

fn convert_tool_choice(tc: &serde_json::Value) -> Option<ToolChoice> {
    match tc {
        serde_json::Value::String(s) => Some(ToolChoice::Mode(s.clone())),
        serde_json::Value::Object(o) => {
            let name = o.get("name").and_then(|n| n.as_str())?;
            Some(ToolChoice::Function {
                choice_type: "function".to_string(),
                function: crate::schemas::openai::ToolChoiceFunction {
                    name: name.to_string(),
                },
            })
        }
        _ => None,
    }
}

/// Build the internal `ChatCompletionRequest` from a Responses request plus any
/// messages restored from `previous_response_id`. Always non-streaming — the
/// Responses handler synthesizes the SSE event stream from the full result.
pub fn responses_to_chat_request(
    req: &ResponsesRequest,
    prev_msgs: &[ChatMessage],
) -> ChatCompletionRequest {
    let mut messages: Vec<ChatMessage> = Vec::new();

    if let Some(instructions) = &req.instructions {
        if !instructions.is_empty() {
            messages.push(ChatMessage {
                role: ChatRole::System,
                content: Some(MessageContent::Text(instructions.clone())),
                name: None,
                tool_calls: None,
                tool_call_id: None,
            });
        }
    }

    messages.extend_from_slice(prev_msgs);

    match &req.input {
        Some(ResponsesInput::Text(text)) => messages.push(ChatMessage {
            role: ChatRole::User,
            content: Some(MessageContent::Text(text.clone())),
            name: None,
            tool_calls: None,
            tool_call_id: None,
        }),
        Some(ResponsesInput::Items(items)) => {
            for item in items {
                messages.extend(convert_input_item(item));
            }
        }
        None => {}
    }

    let tools: Option<Vec<Tool>> = req
        .tools
        .as_ref()
        .map(|tools| tools.iter().filter_map(convert_tool).collect::<Vec<_>>());
    let tools = tools.filter(|t| !t.is_empty());

    ChatCompletionRequest {
        model: req.model.clone(),
        messages,
        temperature: req.temperature,
        max_tokens: req.max_output_tokens,
        max_completion_tokens: None,
        stream: false,
        stream_options: None,
        top_p: req.top_p,
        stop: None,
        presence_penalty: None,
        frequency_penalty: None,
        tools,
        tool_choice: req.tool_choice.as_ref().and_then(convert_tool_choice),
        response_format: None,
        seed: None,
        user: None,
        n: None,
        logprobs: None,
        top_logprobs: None,
        service_tier: req.service_tier.clone(),
        // Responses `reasoning: {"effort": "..."}` → Chat Completions reasoning_effort
        reasoning_effort: req
            .reasoning
            .as_ref()
            .and_then(|r| r.get("effort"))
            .and_then(|v| v.as_str())
            .map(String::from),
    }
}

/// Build the assistant `message` output item for a Responses response.
fn message_output_item(text: &str) -> serde_json::Value {
    serde_json::json!({
        "id": generate_message_id(),
        "type": "message",
        "status": "completed",
        "role": "assistant",
        "content": [{
            "type": "output_text",
            "text": text,
            "annotations": [],
        }],
    })
}

/// Convert a completed `ChatCompletionResponse` into a `ResponsesResponse`.
pub fn chat_response_to_responses(
    resp: &ChatCompletionResponse,
    model: &str,
    response_id: Option<String>,
    created_at: i64,
) -> ResponsesResponse {
    let response_id = response_id.unwrap_or_else(generate_response_id);
    let message: Option<&AssistantMessage> = resp.choices.first().map(|c| &c.message);

    let output_text = message.and_then(|m| m.content.clone()).unwrap_or_default();

    let mut output: Vec<serde_json::Value> = Vec::new();

    // Function calls become their own output items (mirrors OpenAI's shape).
    if let Some(tool_calls) = message.and_then(|m| m.tool_calls.as_ref()) {
        for tc in tool_calls {
            output.push(serde_json::json!({
                "id": tc.id,
                "type": "function_call",
                "status": "completed",
                "call_id": tc.id,
                "name": tc.function.name,
                "arguments": tc.function.arguments,
            }));
        }
    }

    output.push(message_output_item(&output_text));

    ResponsesResponse {
        id: response_id,
        object: "response".to_string(),
        created_at,
        status: "completed".to_string(),
        model: model.to_string(),
        output,
        output_text,
        usage: completion_usage_to_responses(&resp.usage),
    }
}

/// Map a `ChatRole` to its lowercase wire string.
fn role_str(role: ChatRole) -> &'static str {
    match role {
        ChatRole::System => "system",
        ChatRole::User => "user",
        ChatRole::Assistant => "assistant",
        ChatRole::Tool => "tool",
    }
}

/// Extract user/assistant turns from chat messages as `(role, text)` pairs for
/// context storage. System/tool messages and empty content are dropped — the
/// stored context is only for reconstructing conversational history.
pub fn chat_messages_to_stored(messages: &[ChatMessage]) -> Vec<(String, String)> {
    messages
        .iter()
        .filter(|m| matches!(m.role, ChatRole::User | ChatRole::Assistant))
        .filter_map(|m| {
            let text = m.content.as_ref().map(|c| c.to_string_content())?;
            if text.is_empty() {
                return None;
            }
            Some((role_str(m.role).to_string(), text))
        })
        .collect()
}

/// Rebuild `ChatMessage`s from stored `(role, text)` pairs (history restore).
pub fn stored_to_chat_messages(stored: &[(String, String)]) -> Vec<ChatMessage> {
    stored
        .iter()
        .map(|(role, text)| ChatMessage {
            role: parse_role(role),
            content: Some(MessageContent::Text(text.clone())),
            name: None,
            tool_calls: None,
            tool_call_id: None,
        })
        .collect()
}

/// Map Chat `CompletionUsage` to Responses `ResponsesUsage`.
pub fn completion_usage_to_responses(
    usage: &crate::schemas::openai::CompletionUsage,
) -> ResponsesUsage {
    let cached = usage.cached_tokens();
    let reasoning = usage
        .completion_tokens_details
        .as_ref()
        .and_then(|d| d.reasoning_tokens)
        .unwrap_or(0);
    ResponsesUsage {
        input_tokens: usage.prompt_tokens,
        output_tokens: usage.completion_tokens,
        total_tokens: usage.total_tokens,
        input_tokens_details: (cached > 0).then_some(InputTokensDetails {
            cached_tokens: cached,
        }),
        output_tokens_details: (reasoning > 0).then_some(OutputTokensDetails {
            reasoning_tokens: reasoning,
        }),
    }
}

// ============================================================================
// Hosted web_search path: Responses ↔ Anthropic MessageRequest
// ============================================================================

use crate::schemas::anthropic::{
    ContentBlock as AnthContentBlock, Message as AnthMessage, MessageContent as AnthMessageContent,
    MessageRequest, MessageResponse, SystemContent,
};

/// Extract plain text from a Responses `input` value (string or items) for the
/// Anthropic web_search path.
fn input_to_anthropic_messages(
    input: &Option<ResponsesInput>,
    prev: &[(String, String)],
) -> Vec<AnthMessage> {
    let mut messages: Vec<AnthMessage> = prev
        .iter()
        .map(|(role, text)| AnthMessage {
            role: if role == "assistant" {
                "assistant".to_string()
            } else {
                "user".to_string()
            },
            content: AnthMessageContent::Text(text.clone()),
        })
        .collect();

    match input {
        Some(ResponsesInput::Text(text)) => messages.push(AnthMessage {
            role: "user".to_string(),
            content: AnthMessageContent::Text(text.clone()),
        }),
        Some(ResponsesInput::Items(items)) => {
            for item in items {
                // Only message items carry conversational text; function items are
                // not meaningful to the web_search agentic loop.
                if let Some(role) = item.get("role").and_then(|r| r.as_str()) {
                    if let Some(content) = item.get("content") {
                        let text = match content {
                            serde_json::Value::String(s) => s.clone(),
                            serde_json::Value::Array(parts) => parts
                                .iter()
                                .filter_map(|p| p.get("text").and_then(|t| t.as_str()))
                                .collect::<Vec<_>>()
                                .join("\n"),
                            _ => String::new(),
                        };
                        if !text.is_empty() {
                            messages.push(AnthMessage {
                                role: if role == "assistant" {
                                    "assistant".to_string()
                                } else {
                                    "user".to_string()
                                },
                                content: AnthMessageContent::Text(text),
                            });
                        }
                    }
                }
            }
        }
        None => {}
    }
    messages
}

/// Build the Anthropic web_search tool definition from the Responses hosted tool,
/// mapping `filters.allowed_domains` / `filters.blocked_domains` when present.
fn web_search_tool_def(req: &ResponsesRequest) -> serde_json::Value {
    let mut tool = serde_json::json!({
        "type": "web_search_20250305",
        "name": "web_search",
    });
    if let Some(tools) = &req.tools {
        if let Some(ws) = tools.iter().find(|t| {
            t.get("type")
                .and_then(|ty| ty.as_str())
                .is_some_and(|ty| WEB_SEARCH_TOOL_TYPES.contains(&ty))
        }) {
            let filters = ws.get("filters");
            if let Some(allowed) = filters
                .and_then(|f| f.get("allowed_domains"))
                .filter(|v| v.is_array())
            {
                tool["allowed_domains"] = allowed.clone();
            }
            if let Some(blocked) = filters
                .and_then(|f| f.get("blocked_domains"))
                .filter(|v| v.is_array())
            {
                tool["blocked_domains"] = blocked.clone();
            }
        }
    }
    tool
}

/// Convert a Responses web_search request into an Anthropic `MessageRequest`
/// carrying the `web_search_20250305` server tool, for the WebToolExecutor path.
pub fn responses_to_message_request(
    req: &ResponsesRequest,
    prev: &[(String, String)],
) -> MessageRequest {
    let messages = input_to_anthropic_messages(&req.input, prev);
    let max_tokens = req.max_output_tokens.unwrap_or(4096);
    let mut message_req = MessageRequest::new(req.model.clone(), messages, max_tokens);
    message_req.tools = Some(vec![web_search_tool_def(req)]);
    if let Some(instructions) = &req.instructions {
        if !instructions.is_empty() {
            message_req.system = Some(SystemContent::Text(instructions.clone()));
        }
    }
    message_req.temperature = req.temperature;
    message_req.top_p = req.top_p;
    message_req
}

/// Convert an Anthropic `MessageResponse` (from the web_search loop) into a
/// Responses response: text blocks become `output_text`, and each `web_search`
/// tool-use block becomes a `web_search_call` output item.
pub fn message_response_to_responses(
    resp: &MessageResponse,
    model: &str,
    response_id: Option<String>,
    created_at: i64,
) -> ResponsesResponse {
    let response_id = response_id.unwrap_or_else(generate_response_id);

    let mut output_text = String::new();
    let mut search_count = 0usize;
    for block in &resp.content {
        match block {
            AnthContentBlock::Text { text, .. } => {
                if !output_text.is_empty() {
                    output_text.push('\n');
                }
                output_text.push_str(text);
            }
            AnthContentBlock::ToolUse { name, .. } if name.starts_with("web_search") => {
                search_count += 1;
            }
            _ => {}
        }
    }

    let mut output: Vec<serde_json::Value> = Vec::new();
    for _ in 0..search_count {
        output.push(serde_json::json!({
            "id": format!("ws_{}", uuid::Uuid::new_v4().simple()),
            "type": "web_search_call",
            "status": "completed",
        }));
    }
    output.push(message_output_item(&output_text));

    let input_tokens = resp.usage.input_tokens;
    let output_tokens = resp.usage.output_tokens;
    ResponsesResponse {
        id: response_id,
        object: "response".to_string(),
        created_at,
        status: "completed".to_string(),
        model: model.to_string(),
        output,
        output_text,
        usage: ResponsesUsage {
            input_tokens,
            output_tokens,
            total_tokens: input_tokens + output_tokens,
            input_tokens_details: None,
            output_tokens_details: None,
        },
    }
}

// ============================================================================
// Mantle Responses path: Chat Completions ↔ raw Responses
// ============================================================================
//
// Responses-only Bedrock models (GPT-5.x) can also be reached from
// `/v1/chat/completions`. These functions convert a `ChatCompletionRequest`
// into a raw Responses request body for the Mantle host and the raw Responses
// result (object or SSE frames) back into Chat Completions shapes.

use crate::schemas::openai::{
    current_timestamp, generate_completion_id, ChatCompletionChunk, Choice, ChunkChoice,
    ChunkDelta, CompletionTokensDetails, CompletionUsage, FunctionCallDelta, PromptTokensDetails,
    ToolCallDelta,
};

/// Convert chat message content into Responses user-message content parts.
fn chat_content_to_input_parts(content: &MessageContent) -> Vec<serde_json::Value> {
    match content {
        MessageContent::Text(text) => {
            vec![serde_json::json!({"type": "input_text", "text": text})]
        }
        MessageContent::Parts(parts) => parts
            .iter()
            .map(|p| match p {
                ContentPart::Text { text } => {
                    serde_json::json!({"type": "input_text", "text": text})
                }
                ContentPart::ImageUrl { image_url } => {
                    serde_json::json!({"type": "input_image", "image_url": image_url.url})
                }
            })
            .collect(),
    }
}

/// Convert a `ChatCompletionRequest` into a raw Responses request body for the
/// Bedrock Mantle `/v1/responses` endpoint. Sampling params (`temperature`,
/// `top_p`, `stop`, penalties) are dropped — reasoning-only models reject them.
pub fn chat_to_responses_request(
    request: &ChatCompletionRequest,
    target_model_id: &str,
) -> serde_json::Value {
    let mut instructions: Vec<String> = Vec::new();
    let mut input: Vec<serde_json::Value> = Vec::new();

    for msg in &request.messages {
        match msg.role {
            ChatRole::System => {
                if let Some(content) = &msg.content {
                    let text = content.to_string_content();
                    if !text.is_empty() {
                        instructions.push(text);
                    }
                }
            }
            ChatRole::User => {
                if let Some(content) = &msg.content {
                    let parts = chat_content_to_input_parts(content);
                    if !parts.is_empty() {
                        input.push(serde_json::json!({
                            "type": "message", "role": "user", "content": parts,
                        }));
                    }
                }
            }
            ChatRole::Assistant => {
                if let Some(content) = &msg.content {
                    let text = content.to_string_content();
                    if !text.is_empty() {
                        input.push(serde_json::json!({
                            "type": "message", "role": "assistant",
                            "content": [{"type": "output_text", "text": text}],
                        }));
                    }
                }
                if let Some(tool_calls) = &msg.tool_calls {
                    for tc in tool_calls {
                        input.push(serde_json::json!({
                            "type": "function_call",
                            "call_id": tc.id,
                            "name": tc.function.name,
                            "arguments": tc.function.arguments,
                        }));
                    }
                }
            }
            ChatRole::Tool => {
                let output = msg
                    .content
                    .as_ref()
                    .map(|c| c.to_string_content())
                    .unwrap_or_default();
                input.push(serde_json::json!({
                    "type": "function_call_output",
                    "call_id": msg.tool_call_id.clone().unwrap_or_default(),
                    "output": output,
                }));
            }
        }
    }

    let mut body = serde_json::json!({
        "model": target_model_id,
        "input": input,
        "store": false,
        "stream": request.stream,
    });

    if !instructions.is_empty() {
        body["instructions"] = serde_json::json!(instructions.join("\n\n"));
    }
    if let Some(max) = request.max_completion_tokens.or(request.max_tokens) {
        body["max_output_tokens"] = serde_json::json!(max);
    }

    if let Some(tools) = &request.tools {
        let converted: Vec<serde_json::Value> = tools
            .iter()
            .map(|t| {
                let mut v = serde_json::json!({
                    "type": "function",
                    "name": t.function.name,
                    "parameters": t.function.parameters.clone()
                        .unwrap_or_else(|| serde_json::json!({"type": "object"})),
                });
                if let Some(desc) = &t.function.description {
                    v["description"] = serde_json::json!(desc);
                }
                if let Some(strict) = t.function.strict {
                    v["strict"] = serde_json::json!(strict);
                }
                v
            })
            .collect();
        if !converted.is_empty() {
            body["tools"] = serde_json::Value::Array(converted);
        }
    }

    if let Some(tc) = &request.tool_choice {
        body["tool_choice"] = match tc {
            ToolChoice::Mode(mode) => serde_json::json!(mode),
            ToolChoice::Function { function, .. } => {
                serde_json::json!({"type": "function", "name": function.name})
            }
        };
    }

    if let Some(effort) = &request.reasoning_effort {
        body["reasoning"] = serde_json::json!({"effort": effort, "summary": "auto"});
    }

    if request.temperature.is_some() || request.top_p.is_some() || request.stop.is_some() {
        tracing::debug!("Dropping sampling params / stop for Mantle Responses model (unsupported)");
    }

    body
}

/// Map a raw Responses `usage` object to a Chat `CompletionUsage` (OpenAI
/// accounting: `prompt_tokens` includes the cached portion).
fn responses_usage_to_completion(usage: &serde_json::Value) -> CompletionUsage {
    let as_i32 =
        |v: Option<&serde_json::Value>| -> i32 { v.and_then(|v| v.as_i64()).unwrap_or(0) as i32 };
    let input = as_i32(usage.get("input_tokens"));
    let output = as_i32(usage.get("output_tokens"));
    let cached = as_i32(
        usage
            .get("input_tokens_details")
            .and_then(|d| d.get("cached_tokens")),
    );
    let reasoning = as_i32(
        usage
            .get("output_tokens_details")
            .and_then(|d| d.get("reasoning_tokens")),
    );
    CompletionUsage {
        prompt_tokens: input,
        completion_tokens: output,
        total_tokens: input + output,
        prompt_tokens_details: (cached > 0).then_some(PromptTokensDetails {
            cached_tokens: Some(cached),
        }),
        completion_tokens_details: (reasoning > 0).then_some(CompletionTokensDetails {
            reasoning_tokens: Some(reasoning),
        }),
    }
}

/// Chat finish_reason for a completed raw Responses object.
fn responses_finish_reason(response: &serde_json::Value, has_tool_calls: bool) -> &'static str {
    if has_tool_calls {
        return "tool_calls";
    }
    if response.get("status").and_then(|s| s.as_str()) == Some("incomplete")
        && response
            .pointer("/incomplete_details/reason")
            .and_then(|r| r.as_str())
            == Some("max_output_tokens")
    {
        return "length";
    }
    "stop"
}

/// Convert a completed raw Responses object into a `ChatCompletionResponse`.
pub fn responses_to_chat_response(
    response: &serde_json::Value,
    source_model: &str,
) -> ChatCompletionResponse {
    let mut content = String::new();
    let mut reasoning_content = String::new();
    let mut tool_calls: Vec<ToolCall> = Vec::new();

    if let Some(items) = response.get("output").and_then(|o| o.as_array()) {
        for item in items {
            match item.get("type").and_then(|t| t.as_str()).unwrap_or("") {
                "message" => {
                    if let Some(parts) = item.get("content").and_then(|c| c.as_array()) {
                        for part in parts {
                            if part.get("type").and_then(|t| t.as_str()) == Some("output_text") {
                                if let Some(text) = part.get("text").and_then(|t| t.as_str()) {
                                    content.push_str(text);
                                }
                            }
                        }
                    }
                }
                "reasoning" => {
                    if let Some(parts) = item.get("summary").and_then(|s| s.as_array()) {
                        for part in parts {
                            if let Some(text) = part.get("text").and_then(|t| t.as_str()) {
                                if !reasoning_content.is_empty() {
                                    reasoning_content.push_str("\n\n");
                                }
                                reasoning_content.push_str(text);
                            }
                        }
                    }
                }
                "function_call" => {
                    tool_calls.push(ToolCall {
                        id: item
                            .get("call_id")
                            .or_else(|| item.get("id"))
                            .and_then(|v| v.as_str())
                            .unwrap_or("")
                            .to_string(),
                        tool_type: "function".to_string(),
                        function: FunctionCall {
                            name: item
                                .get("name")
                                .and_then(|v| v.as_str())
                                .unwrap_or("")
                                .to_string(),
                            arguments: item
                                .get("arguments")
                                .and_then(|a| a.as_str())
                                .unwrap_or("{}")
                                .to_string(),
                        },
                    });
                }
                _ => {}
            }
        }
    }

    let finish_reason = responses_finish_reason(response, !tool_calls.is_empty());
    let usage = response
        .get("usage")
        .map(responses_usage_to_completion)
        .unwrap_or(CompletionUsage {
            prompt_tokens: 0,
            completion_tokens: 0,
            total_tokens: 0,
            prompt_tokens_details: None,
            completion_tokens_details: None,
        });

    ChatCompletionResponse {
        id: response
            .get("id")
            .and_then(|i| i.as_str())
            .map(|s| s.to_string())
            .unwrap_or_else(generate_completion_id),
        object: "chat.completion".to_string(),
        created: response
            .get("created_at")
            .and_then(|c| c.as_i64())
            .unwrap_or_else(current_timestamp),
        model: source_model.to_string(),
        choices: vec![Choice {
            index: 0,
            message: AssistantMessage {
                role: ChatRole::Assistant,
                content: (!content.is_empty()).then_some(content),
                tool_calls: (!tool_calls.is_empty()).then_some(tool_calls),
                reasoning: None,
                reasoning_content: (!reasoning_content.is_empty()).then_some(reasoning_content),
            },
            finish_reason: Some(finish_reason.to_string()),
            logprobs: None,
        }],
        usage,
        system_fingerprint: None,
    }
}

/// State machine converting Responses SSE frames into OpenAI Chat Completions
/// SSE chunks (serialized JSON, without the `data: ` prefix or `[DONE]`).
pub struct ResponsesToChatStreamState {
    model: String,
    completion_id: String,
    created: i64,
    include_usage: bool,
    sent_role: bool,
    next_tool_index: i32,
    tool_args_streamed: bool,
    has_tool_calls: bool,
    finished: bool,
    /// Usage extracted from the terminal frame (OpenAI accounting), for the
    /// caller's records.
    pub prompt_tokens: i32,
    pub completion_tokens: i32,
    pub cached_tokens: i32,
}

impl ResponsesToChatStreamState {
    pub fn new(model: impl Into<String>, include_usage: bool) -> Self {
        Self {
            model: model.into(),
            completion_id: generate_completion_id(),
            created: current_timestamp(),
            include_usage,
            sent_role: false,
            next_tool_index: 0,
            tool_args_streamed: false,
            has_tool_calls: false,
            finished: false,
            prompt_tokens: 0,
            completion_tokens: 0,
            cached_tokens: 0,
        }
    }

    fn chunk(&self, delta: ChunkDelta, finish_reason: Option<String>) -> String {
        serde_json::to_string(&ChatCompletionChunk {
            id: self.completion_id.clone(),
            object: "chat.completion.chunk".to_string(),
            created: self.created,
            model: self.model.clone(),
            choices: vec![ChunkChoice {
                index: 0,
                delta,
                finish_reason,
                logprobs: None,
            }],
            system_fingerprint: None,
            usage: None,
        })
        .unwrap_or_default()
    }

    fn role_chunk(&mut self) -> Option<String> {
        if self.sent_role {
            return None;
        }
        self.sent_role = true;
        Some(self.chunk(
            ChunkDelta {
                role: Some(ChatRole::Assistant),
                ..Default::default()
            },
            None,
        ))
    }

    /// Convert one Responses SSE frame into zero or more serialized chunks.
    pub fn convert_frame(&mut self, event_type: &str, payload: &serde_json::Value) -> Vec<String> {
        let mut chunks: Vec<String> = Vec::new();

        match event_type {
            "response.created" => {
                if let Some(id) = payload.pointer("/response/id").and_then(|i| i.as_str()) {
                    self.completion_id = id.to_string();
                }
                if let Some(created) = payload
                    .pointer("/response/created_at")
                    .and_then(|c| c.as_i64())
                {
                    self.created = created;
                }
                chunks.extend(self.role_chunk());
            }
            "response.reasoning_summary_text.delta" | "response.reasoning_text.delta" => {
                if let Some(text) = payload.get("delta").and_then(|d| d.as_str()) {
                    chunks.extend(self.role_chunk());
                    chunks.push(self.chunk(
                        ChunkDelta {
                            reasoning_content: Some(text.to_string()),
                            ..Default::default()
                        },
                        None,
                    ));
                }
            }
            "response.output_text.delta" => {
                if let Some(text) = payload.get("delta").and_then(|d| d.as_str()) {
                    chunks.extend(self.role_chunk());
                    chunks.push(self.chunk(
                        ChunkDelta {
                            content: Some(text.to_string()),
                            ..Default::default()
                        },
                        None,
                    ));
                }
            }
            "response.output_item.added" => {
                let item = payload.get("item").cloned().unwrap_or_default();
                if item.get("type").and_then(|t| t.as_str()) == Some("function_call") {
                    chunks.extend(self.role_chunk());
                    self.has_tool_calls = true;
                    self.tool_args_streamed = false;
                    let index = self.next_tool_index;
                    self.next_tool_index += 1;
                    chunks.push(self.chunk(
                        ChunkDelta {
                            tool_calls: Some(vec![ToolCallDelta {
                                index,
                                id: item
                                    .get("call_id")
                                    .or_else(|| item.get("id"))
                                    .and_then(|v| v.as_str())
                                    .map(String::from),
                                tool_type: Some("function".to_string()),
                                function: Some(FunctionCallDelta {
                                    name: item
                                        .get("name")
                                        .and_then(|v| v.as_str())
                                        .map(String::from),
                                    arguments: None,
                                }),
                            }]),
                            ..Default::default()
                        },
                        None,
                    ));
                }
            }
            "response.function_call_arguments.delta" => {
                if let Some(args) = payload.get("delta").and_then(|d| d.as_str()) {
                    self.tool_args_streamed = true;
                    chunks.push(self.arguments_chunk(args));
                }
            }
            "response.output_item.done" => {
                let item = payload.get("item").cloned().unwrap_or_default();
                if item.get("type").and_then(|t| t.as_str()) == Some("function_call")
                    && !self.tool_args_streamed
                {
                    // Arguments never streamed as deltas — emit them whole.
                    if let Some(args) = item
                        .get("arguments")
                        .and_then(|a| a.as_str())
                        .filter(|a| !a.is_empty() && *a != "{}")
                    {
                        chunks.push(self.arguments_chunk(args));
                    }
                }
            }
            "response.completed" | "response.incomplete" => {
                if self.finished {
                    return chunks;
                }
                self.finished = true;
                chunks.extend(self.role_chunk());

                let response = payload.get("response").cloned().unwrap_or_default();
                let usage = response
                    .get("usage")
                    .map(responses_usage_to_completion)
                    .unwrap_or(CompletionUsage {
                        prompt_tokens: 0,
                        completion_tokens: 0,
                        total_tokens: 0,
                        prompt_tokens_details: None,
                        completion_tokens_details: None,
                    });
                self.prompt_tokens = usage.prompt_tokens;
                self.completion_tokens = usage.completion_tokens;
                self.cached_tokens = usage.cached_tokens();

                let finish = responses_finish_reason(&response, self.has_tool_calls);
                chunks.push(self.chunk(ChunkDelta::default(), Some(finish.to_string())));

                if self.include_usage {
                    let usage_chunk = ChatCompletionChunk {
                        id: self.completion_id.clone(),
                        object: "chat.completion.chunk".to_string(),
                        created: self.created,
                        model: self.model.clone(),
                        choices: vec![],
                        system_fingerprint: None,
                        usage: Some(usage),
                    };
                    chunks.push(serde_json::to_string(&usage_chunk).unwrap_or_default());
                }
            }
            "response.failed" | "error" => {
                let message = payload
                    .pointer("/response/error/message")
                    .or_else(|| payload.pointer("/error/message"))
                    .or_else(|| payload.get("message"))
                    .and_then(|m| m.as_str())
                    .unwrap_or("upstream response failed");
                chunks.push(
                    serde_json::to_string(
                        &crate::schemas::openai::OpenAIErrorResponse::server_error(message),
                    )
                    .unwrap_or_default(),
                );
            }
            _ => {}
        }

        chunks
    }

    fn arguments_chunk(&self, args: &str) -> String {
        self.chunk(
            ChunkDelta {
                tool_calls: Some(vec![ToolCallDelta {
                    index: (self.next_tool_index - 1).max(0),
                    id: None,
                    tool_type: None,
                    function: Some(FunctionCallDelta {
                        name: None,
                        arguments: Some(args.to_string()),
                    }),
                }]),
                ..Default::default()
            },
            None,
        )
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::schemas::openai::{Choice, CompletionUsage};

    fn req_with_input(input: ResponsesInput) -> ResponsesRequest {
        ResponsesRequest {
            model: "gpt".into(),
            input: Some(input),
            instructions: None,
            tools: None,
            tool_choice: None,
            max_output_tokens: None,
            temperature: None,
            top_p: None,
            stream: false,
            previous_response_id: None,
            reasoning: None,
            metadata: None,
            store: None,
            service_tier: None,
        }
    }

    #[test]
    fn test_input_text_to_user_message() {
        let req = req_with_input(ResponsesInput::Text("hello".into()));
        let chat = responses_to_chat_request(&req, &[]);
        assert_eq!(chat.messages.len(), 1);
        assert_eq!(chat.messages[0].role, ChatRole::User);
        assert_eq!(
            chat.messages[0]
                .content
                .as_ref()
                .unwrap()
                .to_string_content(),
            "hello"
        );
    }

    #[test]
    fn test_instructions_become_leading_system() {
        let mut req = req_with_input(ResponsesInput::Text("hi".into()));
        req.instructions = Some("be terse".into());
        let chat = responses_to_chat_request(&req, &[]);
        assert_eq!(chat.messages[0].role, ChatRole::System);
        assert_eq!(chat.messages[1].role, ChatRole::User);
    }

    #[test]
    fn test_previous_messages_prepended_after_instructions() {
        let mut req = req_with_input(ResponsesInput::Text("q2".into()));
        req.instructions = Some("sys".into());
        let prev = vec![ChatMessage {
            role: ChatRole::Assistant,
            content: Some(MessageContent::Text("a1".into())),
            name: None,
            tool_calls: None,
            tool_call_id: None,
        }];
        let chat = responses_to_chat_request(&req, &prev);
        assert_eq!(chat.messages[0].role, ChatRole::System);
        assert_eq!(chat.messages[1].role, ChatRole::Assistant); // prior turn
        assert_eq!(chat.messages[2].role, ChatRole::User); // new turn
    }

    #[test]
    fn test_input_items_message_and_parts() {
        let items = vec![serde_json::json!({
            "role": "user",
            "content": [
                {"type": "input_text", "text": "describe"},
                {"type": "input_image", "image_url": "https://x/y.png"}
            ]
        })];
        let req = req_with_input(ResponsesInput::Items(items));
        let chat = responses_to_chat_request(&req, &[]);
        assert_eq!(chat.messages.len(), 1);
        match chat.messages[0].content.as_ref().unwrap() {
            MessageContent::Parts(parts) => assert_eq!(parts.len(), 2),
            _ => panic!("expected multimodal parts"),
        }
    }

    #[test]
    fn test_function_call_and_output_items() {
        let items = vec![
            serde_json::json!({
                "type": "function_call",
                "call_id": "call_1",
                "name": "get_weather",
                "arguments": "{\"city\":\"SF\"}"
            }),
            serde_json::json!({
                "type": "function_call_output",
                "call_id": "call_1",
                "output": "sunny"
            }),
        ];
        let req = req_with_input(ResponsesInput::Items(items));
        let chat = responses_to_chat_request(&req, &[]);
        assert_eq!(chat.messages.len(), 2);
        assert_eq!(chat.messages[0].role, ChatRole::Assistant);
        assert_eq!(
            chat.messages[0].tool_calls.as_ref().unwrap()[0]
                .function
                .name,
            "get_weather"
        );
        assert_eq!(chat.messages[1].role, ChatRole::Tool);
        assert_eq!(chat.messages[1].tool_call_id.as_deref(), Some("call_1"));
    }

    #[test]
    fn test_function_tool_flatten() {
        let mut req = req_with_input(ResponsesInput::Text("hi".into()));
        req.tools = Some(vec![serde_json::json!({
            "type": "function",
            "name": "lookup",
            "description": "d",
            "parameters": {"type": "object"}
        })]);
        let chat = responses_to_chat_request(&req, &[]);
        let tools = chat.tools.unwrap();
        assert_eq!(tools.len(), 1);
        assert_eq!(tools[0].tool_type, "function");
        assert_eq!(tools[0].function.name, "lookup");
    }

    #[test]
    fn test_web_search_tool_filtered_out_on_chat_path() {
        let mut req = req_with_input(ResponsesInput::Text("hi".into()));
        req.tools = Some(vec![serde_json::json!({"type": "web_search"})]);
        let chat = responses_to_chat_request(&req, &[]);
        assert!(chat.tools.is_none()); // no function tools → None
    }

    #[test]
    fn test_max_output_tokens_maps_to_max_tokens() {
        let mut req = req_with_input(ResponsesInput::Text("hi".into()));
        req.max_output_tokens = Some(256);
        let chat = responses_to_chat_request(&req, &[]);
        assert_eq!(chat.max_tokens, Some(256));
    }

    fn chat_resp(
        content: Option<&str>,
        tool_calls: Option<Vec<ToolCall>>,
    ) -> ChatCompletionResponse {
        ChatCompletionResponse {
            id: "chatcmpl_1".into(),
            object: "chat.completion".into(),
            created: 100,
            model: "gpt".into(),
            choices: vec![Choice {
                index: 0,
                message: AssistantMessage {
                    role: ChatRole::Assistant,
                    content: content.map(String::from),
                    tool_calls,
                    reasoning: None,
                    reasoning_content: None,
                },
                finish_reason: Some("stop".into()),
                logprobs: None,
            }],
            usage: CompletionUsage {
                prompt_tokens: 10,
                completion_tokens: 5,
                total_tokens: 15,
                prompt_tokens_details: None,
                completion_tokens_details: None,
            },
            system_fingerprint: None,
        }
    }

    #[test]
    fn test_chat_response_to_responses_text() {
        let resp = chat_resp(Some("hi there"), None);
        let out = chat_response_to_responses(&resp, "gpt", Some("resp_x".into()), 100);
        assert_eq!(out.id, "resp_x");
        assert_eq!(out.object, "response");
        assert_eq!(out.status, "completed");
        assert_eq!(out.output_text, "hi there");
        assert_eq!(out.output.len(), 1);
        assert_eq!(out.output[0]["type"], "message");
        assert_eq!(out.output[0]["content"][0]["text"], "hi there");
        assert_eq!(out.usage.input_tokens, 10);
        assert_eq!(out.usage.total_tokens, 15);
    }

    #[test]
    fn test_chat_response_to_responses_function_call() {
        let tc = vec![ToolCall {
            id: "call_9".into(),
            tool_type: "function".into(),
            function: FunctionCall {
                name: "f".into(),
                arguments: "{}".into(),
            },
        }];
        let resp = chat_resp(None, Some(tc));
        let out = chat_response_to_responses(&resp, "gpt", None, 1);
        // function_call item + message item
        assert_eq!(out.output.len(), 2);
        assert_eq!(out.output[0]["type"], "function_call");
        assert_eq!(out.output[0]["name"], "f");
        assert_eq!(out.output[0]["call_id"], "call_9");
        assert_eq!(out.output[1]["type"], "message");
    }

    #[test]
    fn test_is_web_search_request() {
        let mut req = req_with_input(ResponsesInput::Text("q".into()));
        assert!(!is_responses_web_search_request(&req));
        req.tools = Some(vec![serde_json::json!({"type": "web_search"})]);
        assert!(is_responses_web_search_request(&req));
        req.tools = Some(vec![serde_json::json!({"type": "web_search_preview"})]);
        assert!(is_responses_web_search_request(&req));
    }

    #[test]
    fn test_responses_to_message_request_web_search_tool_and_domains() {
        let mut req = req_with_input(ResponsesInput::Text("weather?".into()));
        req.instructions = Some("be terse".into());
        req.tools = Some(vec![serde_json::json!({
            "type": "web_search",
            "filters": {"allowed_domains": ["weather.gov"], "blocked_domains": ["ads.example"]}
        })]);
        let mr = responses_to_message_request(&req, &[("assistant".into(), "prior".into())]);
        assert_eq!(mr.messages.len(), 2); // prior assistant + new user
        let tools = mr.tools.unwrap();
        assert_eq!(tools[0]["type"], "web_search_20250305");
        assert_eq!(tools[0]["allowed_domains"][0], "weather.gov");
        assert_eq!(tools[0]["blocked_domains"][0], "ads.example");
        assert!(mr.system.is_some());
    }

    #[test]
    fn test_message_response_to_responses_counts_web_search_calls() {
        use crate::schemas::anthropic::{ContentBlock, MessageResponse, Usage};
        let mut resp = MessageResponse::new(
            "msg_1",
            "claude",
            vec![
                ContentBlock::ToolUse {
                    id: "t1".into(),
                    name: "web_search".into(),
                    input: serde_json::json!({}),
                    caller: None,
                },
                ContentBlock::Text {
                    text: "The answer".into(),
                    cache_control: None,
                },
            ],
            Usage::new(20, 8),
        );
        resp.stop_details = None;
        let out = message_response_to_responses(&resp, "claude", Some("resp_ws".into()), 5);
        assert_eq!(out.output_text, "The answer");
        // one web_search_call + one message
        assert_eq!(out.output.len(), 2);
        assert_eq!(out.output[0]["type"], "web_search_call");
        assert_eq!(out.output[1]["type"], "message");
        assert_eq!(out.usage.input_tokens, 20);
        assert_eq!(out.usage.total_tokens, 28);
    }
}

#[cfg(test)]
mod mantle_tests {
    use super::*;
    use crate::schemas::openai::ChatMessage;

    fn chat_request(messages: Vec<ChatMessage>) -> ChatCompletionRequest {
        ChatCompletionRequest {
            model: "gpt-5.6-sol".into(),
            messages,
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
            service_tier: None,
            reasoning_effort: None,
        }
    }

    fn text_msg(role: ChatRole, text: &str) -> ChatMessage {
        ChatMessage {
            role,
            content: Some(MessageContent::Text(text.into())),
            name: None,
            tool_calls: None,
            tool_call_id: None,
        }
    }

    #[test]
    fn test_chat_to_responses_request_roundtrip_items() {
        let mut req = chat_request(vec![
            text_msg(ChatRole::System, "be terse"),
            text_msg(ChatRole::User, "check SF"),
            ChatMessage {
                role: ChatRole::Assistant,
                content: None,
                name: None,
                tool_calls: Some(vec![ToolCall {
                    id: "call_1".into(),
                    tool_type: "function".into(),
                    function: FunctionCall {
                        name: "get_weather".into(),
                        arguments: "{\"city\":\"SF\"}".into(),
                    },
                }]),
                tool_call_id: None,
            },
            ChatMessage {
                role: ChatRole::Tool,
                content: Some(MessageContent::Text("sunny".into())),
                name: None,
                tool_calls: None,
                tool_call_id: Some("call_1".into()),
            },
        ]);
        req.max_tokens = Some(2048);
        req.temperature = Some(0.3);
        req.reasoning_effort = Some("high".into());
        req.tools = Some(vec![Tool {
            tool_type: "function".into(),
            function: FunctionDef {
                name: "get_weather".into(),
                description: Some("d".into()),
                parameters: Some(serde_json::json!({"type": "object"})),
                strict: None,
            },
        }]);
        req.tool_choice = Some(ToolChoice::Mode("auto".into()));

        let body = chat_to_responses_request(&req, "openai.gpt-5.6-sol");
        assert_eq!(body["model"], "openai.gpt-5.6-sol");
        assert_eq!(body["instructions"], "be terse");
        assert_eq!(body["max_output_tokens"], 2048);
        assert_eq!(body["store"], false);
        assert_eq!(body["reasoning"]["effort"], "high");
        assert!(body.get("temperature").is_none());
        assert_eq!(body["tool_choice"], "auto");

        let input = body["input"].as_array().unwrap();
        assert_eq!(input.len(), 3);
        assert_eq!(input[0]["type"], "message");
        assert_eq!(input[0]["role"], "user");
        assert_eq!(input[1]["type"], "function_call");
        assert_eq!(input[1]["call_id"], "call_1");
        assert_eq!(input[2]["type"], "function_call_output");
        assert_eq!(input[2]["output"], "sunny");

        let tools = body["tools"].as_array().unwrap();
        assert_eq!(tools[0]["type"], "function");
        assert_eq!(tools[0]["name"], "get_weather");
    }

    #[test]
    fn test_responses_to_chat_response_full() {
        let resp = serde_json::json!({
            "id": "resp_1",
            "status": "completed",
            "created_at": 1234,
            "output": [
                {"type": "reasoning", "summary": [{"type": "summary_text", "text": "hmm"}]},
                {"type": "message", "content": [{"type": "output_text", "text": "The answer"}]},
            ],
            "usage": {
                "input_tokens": 100, "output_tokens": 20,
                "input_tokens_details": {"cached_tokens": 40},
                "output_tokens_details": {"reasoning_tokens": 12},
            },
        });
        let out = responses_to_chat_response(&resp, "gpt-5.6-sol");
        assert_eq!(out.id, "resp_1");
        assert_eq!(out.model, "gpt-5.6-sol");
        assert_eq!(out.created, 1234);
        let msg = &out.choices[0].message;
        assert_eq!(msg.content.as_deref(), Some("The answer"));
        assert_eq!(msg.reasoning_content.as_deref(), Some("hmm"));
        assert_eq!(out.choices[0].finish_reason.as_deref(), Some("stop"));
        // OpenAI accounting: prompt_tokens includes cached tokens.
        assert_eq!(out.usage.prompt_tokens, 100);
        assert_eq!(out.usage.cached_tokens(), 40);
        assert_eq!(
            out.usage
                .completion_tokens_details
                .as_ref()
                .unwrap()
                .reasoning_tokens,
            Some(12)
        );
    }

    #[test]
    fn test_responses_to_chat_response_tool_calls() {
        let resp = serde_json::json!({
            "id": "resp_2",
            "status": "completed",
            "output": [{
                "type": "function_call", "call_id": "call_9", "name": "run",
                "arguments": "{\"cmd\":\"ls\"}",
            }],
            "usage": {"input_tokens": 5, "output_tokens": 2},
        });
        let out = responses_to_chat_response(&resp, "gpt");
        assert_eq!(out.choices[0].finish_reason.as_deref(), Some("tool_calls"));
        let tc = &out.choices[0].message.tool_calls.as_ref().unwrap()[0];
        assert_eq!(tc.id, "call_9");
        assert_eq!(tc.function.name, "run");
        assert_eq!(tc.function.arguments, "{\"cmd\":\"ls\"}");
    }

    #[test]
    fn test_chat_stream_conversion_sequence() {
        let mut state = ResponsesToChatStreamState::new("gpt-5.6-sol", true);
        let mut all: Vec<String> = Vec::new();

        all.extend(state.convert_frame(
            "response.created",
            &serde_json::json!({"response": {"id": "resp_s", "created_at": 7}}),
        ));
        all.extend(state.convert_frame(
            "response.reasoning_summary_text.delta",
            &serde_json::json!({"delta": "think"}),
        ));
        all.extend(state.convert_frame(
            "response.output_text.delta",
            &serde_json::json!({"delta": "Hello"}),
        ));
        all.extend(state.convert_frame(
            "response.output_item.added",
            &serde_json::json!({"item": {
                "type": "function_call", "call_id": "call_1", "name": "run",
            }}),
        ));
        all.extend(state.convert_frame(
            "response.function_call_arguments.delta",
            &serde_json::json!({"delta": "{\"x\":1}"}),
        ));
        all.extend(state.convert_frame(
            "response.completed",
            &serde_json::json!({"response": {
                "status": "completed",
                "usage": {"input_tokens": 50, "output_tokens": 10,
                          "input_tokens_details": {"cached_tokens": 20}},
            }}),
        ));

        let parsed: Vec<serde_json::Value> = all
            .iter()
            .map(|c| serde_json::from_str(c).unwrap())
            .collect();
        // role → reasoning → content → tool start → tool args → finish → usage
        assert_eq!(parsed.len(), 7);
        assert_eq!(parsed[0]["choices"][0]["delta"]["role"], "assistant");
        assert_eq!(parsed[0]["id"], "resp_s");
        assert_eq!(
            parsed[1]["choices"][0]["delta"]["reasoning_content"],
            "think"
        );
        assert_eq!(parsed[2]["choices"][0]["delta"]["content"], "Hello");
        let tc = &parsed[3]["choices"][0]["delta"]["tool_calls"][0];
        assert_eq!(tc["index"], 0);
        assert_eq!(tc["id"], "call_1");
        assert_eq!(tc["function"]["name"], "run");
        assert_eq!(
            parsed[4]["choices"][0]["delta"]["tool_calls"][0]["function"]["arguments"],
            "{\"x\":1}"
        );
        assert_eq!(parsed[5]["choices"][0]["finish_reason"], "tool_calls");
        assert_eq!(parsed[6]["usage"]["prompt_tokens"], 50);
        assert_eq!(state.prompt_tokens, 50);
        assert_eq!(state.cached_tokens, 20);
        assert_eq!(state.completion_tokens, 10);
    }
}
