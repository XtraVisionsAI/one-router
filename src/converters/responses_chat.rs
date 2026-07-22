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
