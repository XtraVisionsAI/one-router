//! Anthropic Messages ↔ OpenAI Responses one-hop conversion (Bedrock Mantle).
//!
//! Responses-only Bedrock models (GPT-5.x) speak only the Responses protocol on
//! the dedicated Mantle host. This module converts Anthropic `MessageRequest`s
//! directly into raw Responses request bodies (and back) — one hop, so thinking
//! signatures and tool-call ids survive multi-turn agentic loops:
//!
//! - thinking block `signature` ↔ reasoning item (`id` + `encrypted_content`),
//!   encoded as `mantle:{id}:{encrypted_content}` — an opaque token the client
//!   echoes back verbatim. Requests always carry
//!   `include: ["reasoning.encrypted_content"]` so the round-trip works.
//! - `tool_use`/`tool_result` ↔ `function_call`/`function_call_output` items
//!   (ids carried verbatim).
//! - `cache_control` is dropped (Responses caching is implicit);
//!   `stop_sequences`/`temperature`/`top_p`/`top_k` are dropped (reasoning-only
//!   models reject sampling params) with a debug log.
//! - `max_tokens` → `max_output_tokens`; `thinking` budget → `reasoning.effort`.
//!
//! The streaming converter turns Responses SSE frames into Anthropic SSE events
//! with lazily opened, dynamically indexed content blocks (same structure as the
//! OpenAI→Anthropic stream converters).

use crate::converters::anthropic_openai::thinking_to_reasoning_effort;
use crate::schemas::anthropic::{
    ContentBlock, MessageContent, MessageRequest, MessageResponse, StopReason, SystemContent,
    ToolChoice, ToolResultValue, Usage,
};

/// Prefix marking a thinking-block signature as a Mantle reasoning round-trip
/// token (vs. a native Claude signature, which cannot be replayed to GPT).
const SIGNATURE_PREFIX: &str = "mantle:";

/// Encode a reasoning item's identity into a thinking-block signature.
fn encode_reasoning_signature(item_id: &str, encrypted_content: &str) -> String {
    format!("{SIGNATURE_PREFIX}{item_id}:{encrypted_content}")
}

/// Decode a thinking-block signature back into `(item_id, encrypted_content)`.
/// Returns `None` for foreign signatures (e.g. produced by a Claude model).
fn decode_reasoning_signature(signature: &str) -> Option<(&str, &str)> {
    signature.strip_prefix(SIGNATURE_PREFIX)?.split_once(':')
}

/// Extract the plain text of a tool result (string form, or the concatenated
/// text blocks of the block form).
fn tool_result_text(value: &ToolResultValue) -> String {
    match value {
        ToolResultValue::Text(s) => s.clone(),
        ToolResultValue::Blocks(blocks) => blocks
            .iter()
            .filter_map(|b| b.as_text())
            .collect::<Vec<_>>()
            .join("\n"),
    }
}

/// Convert an Anthropic tool_choice into the Responses form.
fn convert_tool_choice(tc: &ToolChoice) -> Option<serde_json::Value> {
    let (choice_type, name) = match tc {
        ToolChoice::Auto(s) => (s.as_str(), None),
        ToolChoice::Specific { choice_type, name } => (choice_type.as_str(), Some(name.as_str())),
        ToolChoice::Object(v) => (
            v.get("type").and_then(|t| t.as_str()).unwrap_or(""),
            v.get("name").and_then(|n| n.as_str()),
        ),
    };
    match choice_type {
        "auto" => Some(serde_json::json!("auto")),
        "any" => Some(serde_json::json!("required")),
        "none" => Some(serde_json::json!("none")),
        "tool" => name.map(|n| serde_json::json!({"type": "function", "name": n})),
        _ => None,
    }
}

/// Convert an Anthropic `MessageRequest` into a raw Responses request body for
/// the Bedrock Mantle `/v1/responses` endpoint.
pub fn anthropic_to_responses_request(
    request: &MessageRequest,
    target_model_id: &str,
) -> serde_json::Value {
    let mut input: Vec<serde_json::Value> = Vec::new();

    for message in &request.messages {
        let blocks: Vec<ContentBlock> = match &message.content {
            MessageContent::Text(text) => vec![ContentBlock::text(text.clone())],
            MessageContent::Blocks(blocks) => blocks.clone(),
        };

        if message.role == "assistant" {
            for block in &blocks {
                match block {
                    ContentBlock::Thinking { signature, .. } => {
                        // Only Mantle-originated signatures can be replayed;
                        // foreign (Claude) thinking is dropped from history.
                        if let Some((id, ec)) =
                            signature.as_deref().and_then(decode_reasoning_signature)
                        {
                            input.push(serde_json::json!({
                                "type": "reasoning",
                                "id": id,
                                "encrypted_content": ec,
                                "summary": [],
                            }));
                        }
                    }
                    ContentBlock::Text { text, .. } => {
                        input.push(serde_json::json!({
                            "type": "message",
                            "role": "assistant",
                            "content": [{"type": "output_text", "text": text}],
                        }));
                    }
                    ContentBlock::ToolUse {
                        id,
                        name,
                        input: args,
                        ..
                    } => {
                        input.push(serde_json::json!({
                            "type": "function_call",
                            "call_id": id,
                            "name": name,
                            "arguments": args.to_string(),
                        }));
                    }
                    _ => {}
                }
            }
        } else {
            // User (and any other role): text/image parts group into one message
            // item; tool_results become standalone items, preserving order.
            let mut parts: Vec<serde_json::Value> = Vec::new();
            for block in &blocks {
                match block {
                    ContentBlock::Text { text, .. } => {
                        parts.push(serde_json::json!({"type": "input_text", "text": text}));
                    }
                    ContentBlock::Image { source, .. } => {
                        let url = match (&source.media_type, &source.data) {
                            (Some(mt), Some(data)) => Some(format!("data:{mt};base64,{data}")),
                            _ => source.url.clone(),
                        };
                        if let Some(url) = url {
                            parts
                                .push(serde_json::json!({"type": "input_image", "image_url": url}));
                        }
                    }
                    ContentBlock::ToolResult {
                        tool_use_id,
                        content,
                        ..
                    } => {
                        if !parts.is_empty() {
                            input.push(serde_json::json!({
                                "type": "message", "role": "user",
                                "content": std::mem::take(&mut parts),
                            }));
                        }
                        input.push(serde_json::json!({
                            "type": "function_call_output",
                            "call_id": tool_use_id,
                            "output": tool_result_text(content),
                        }));
                    }
                    _ => {}
                }
            }
            if !parts.is_empty() {
                input.push(serde_json::json!({
                    "type": "message", "role": "user", "content": parts,
                }));
            }
        }
    }

    let mut body = serde_json::json!({
        "model": target_model_id,
        "input": input,
        "max_output_tokens": request.max_tokens,
        "store": false,
        "include": ["reasoning.encrypted_content"],
        "stream": request.stream,
    });

    if let Some(system) = &request.system {
        let instructions = match system {
            SystemContent::Text(text) => text.clone(),
            SystemContent::Messages(messages) => messages
                .iter()
                .map(|m| m.text.as_str())
                .collect::<Vec<_>>()
                .join("\n\n"),
        };
        if !instructions.is_empty() {
            body["instructions"] = serde_json::json!(instructions);
        }
    }

    // Function tools: Anthropic {name, description, input_schema} → Responses
    // flat {type: function, name, description, parameters}. Server tools have
    // no input_schema and are skipped (guarded upstream for this path anyway).
    if let Some(tools) = &request.tools {
        let converted: Vec<serde_json::Value> = tools
            .iter()
            .filter_map(|t| {
                let name = t.get("name")?.as_str()?;
                let schema = t.get("input_schema")?;
                Some(serde_json::json!({
                    "type": "function",
                    "name": name,
                    "description": t.get("description").and_then(|d| d.as_str()).unwrap_or(""),
                    "parameters": schema,
                }))
            })
            .collect();
        if !converted.is_empty() {
            body["tools"] = serde_json::Value::Array(converted);
        }
    }

    if let Some(tc) = request.tool_choice.as_ref().and_then(convert_tool_choice) {
        body["tool_choice"] = tc;
    }

    // thinking budget → reasoning effort; summaries requested so thinking text
    // streams back. If thinking was capability-filtered away, the model still
    // reasons internally at its default effort (inherent to these models).
    if let Some(thinking) = &request.thinking {
        let mut reasoning = serde_json::json!({"summary": "auto"});
        if let Some(effort) = thinking_to_reasoning_effort(thinking) {
            reasoning["effort"] = serde_json::json!(effort);
        }
        body["reasoning"] = reasoning;
    }

    if request.temperature.is_some()
        || request.top_p.is_some()
        || request.top_k.is_some()
        || request.stop_sequences.is_some()
    {
        tracing::debug!(
            "Dropping sampling params / stop_sequences for Mantle Responses model (unsupported)"
        );
    }

    body
}

/// Extract `(input_tokens, output_tokens, cached_tokens)` from a raw Responses
/// `usage` object. `input_tokens` includes the cached portion (OpenAI
/// accounting).
fn parse_responses_usage(usage: &serde_json::Value) -> (i32, i32, i32) {
    let as_i32 =
        |v: Option<&serde_json::Value>| -> i32 { v.and_then(|v| v.as_i64()).unwrap_or(0) as i32 };
    (
        as_i32(usage.get("input_tokens")),
        as_i32(usage.get("output_tokens")),
        as_i32(
            usage
                .get("input_tokens_details")
                .and_then(|d| d.get("cached_tokens")),
        ),
    )
}

/// Join a reasoning item's `summary` texts into the thinking text.
fn reasoning_summary_text(item: &serde_json::Value) -> String {
    item.get("summary")
        .and_then(|s| s.as_array())
        .map(|parts| {
            parts
                .iter()
                .filter_map(|p| p.get("text").and_then(|t| t.as_str()))
                .collect::<Vec<_>>()
                .join("\n\n")
        })
        .unwrap_or_default()
}

/// Map a completed Responses object's status to an Anthropic stop reason.
/// `has_tool_use` wins — a turn ending in function calls is `tool_use`.
fn responses_stop_reason(response: &serde_json::Value, has_tool_use: bool) -> StopReason {
    if has_tool_use {
        return StopReason::ToolUse;
    }
    let status = response.get("status").and_then(|s| s.as_str());
    if status == Some("incomplete") {
        let reason = response
            .pointer("/incomplete_details/reason")
            .and_then(|r| r.as_str());
        if reason == Some("max_output_tokens") {
            return StopReason::MaxTokens;
        }
    }
    StopReason::EndTurn
}

/// Convert a completed raw Responses object into an Anthropic `MessageResponse`.
pub fn responses_to_anthropic_response(
    response: &serde_json::Value,
    source_model: &str,
) -> MessageResponse {
    let mut content: Vec<ContentBlock> = Vec::new();
    let mut has_tool_use = false;

    if let Some(items) = response.get("output").and_then(|o| o.as_array()) {
        for item in items {
            match item.get("type").and_then(|t| t.as_str()).unwrap_or("") {
                "reasoning" => {
                    let thinking = reasoning_summary_text(item);
                    let signature = item
                        .get("encrypted_content")
                        .and_then(|ec| ec.as_str())
                        .map(|ec| {
                            let id = item.get("id").and_then(|i| i.as_str()).unwrap_or("");
                            encode_reasoning_signature(id, ec)
                        });
                    if thinking.is_empty() && signature.is_none() {
                        continue;
                    }
                    content.push(ContentBlock::Thinking {
                        thinking,
                        signature,
                    });
                }
                "message" => {
                    let text: String = item
                        .get("content")
                        .and_then(|c| c.as_array())
                        .map(|parts| {
                            parts
                                .iter()
                                .filter(|p| {
                                    p.get("type").and_then(|t| t.as_str()) == Some("output_text")
                                })
                                .filter_map(|p| p.get("text").and_then(|t| t.as_str()))
                                .collect::<Vec<_>>()
                                .join("")
                        })
                        .unwrap_or_default();
                    if !text.is_empty() {
                        content.push(ContentBlock::text(text));
                    }
                }
                "function_call" => {
                    has_tool_use = true;
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
                    let args = item
                        .get("arguments")
                        .and_then(|a| a.as_str())
                        .and_then(|a| serde_json::from_str(a).ok())
                        .unwrap_or_else(|| serde_json::json!({}));
                    content.push(ContentBlock::ToolUse {
                        id: call_id,
                        name,
                        input: args,
                        caller: None,
                    });
                }
                _ => {}
            }
        }
    }

    let (input_tokens, output_tokens, cached) = response
        .get("usage")
        .map(parse_responses_usage)
        .unwrap_or((0, 0, 0));
    // Anthropic accounting: input_tokens excludes cache reads.
    let mut usage = Usage::new(input_tokens.saturating_sub(cached), output_tokens);
    if cached > 0 {
        usage.cache_read_input_tokens = Some(cached);
    }

    let stop_reason = responses_stop_reason(response, has_tool_use);
    let id = response
        .get("id")
        .and_then(|i| i.as_str())
        .map(|s| s.to_string())
        .unwrap_or_else(|| format!("msg_{}", uuid::Uuid::new_v4().simple()));

    let mut result = MessageResponse::new(id, source_model, content, usage);
    result.stop_reason = Some(stop_reason);
    result
}

// ============================================================================
// Streaming: Responses SSE → Anthropic SSE
// ============================================================================

/// Kind of the currently open Anthropic content block.
enum OpenBlock {
    Thinking { summary_parts: u32 },
    Text,
    ToolUse { args_streamed: bool },
}

/// State machine converting a Responses SSE frame sequence into Anthropic SSE
/// events. Blocks open lazily with dynamic indexes; the reasoning signature is
/// emitted as a `signature_delta` when the reasoning item completes (that is
/// when `encrypted_content` arrives).
pub struct ResponsesToAnthropicStreamState {
    source_model: String,
    started: bool,
    next_index: i32,
    open_block: Option<OpenBlock>,
    has_tool_use: bool,
    finished: bool,
    /// Usage extracted from the terminal frame, for the caller's records.
    pub input_tokens: i32,
    pub output_tokens: i32,
    pub cache_read_tokens: i32,
}

impl ResponsesToAnthropicStreamState {
    pub fn new(source_model: impl Into<String>) -> Self {
        Self {
            source_model: source_model.into(),
            started: false,
            next_index: 0,
            open_block: None,
            has_tool_use: false,
            finished: false,
            input_tokens: 0,
            output_tokens: 0,
            cache_read_tokens: 0,
        }
    }

    /// Index of the currently open block.
    fn current_index(&self) -> i32 {
        self.next_index - 1
    }

    fn ensure_started(&mut self, events: &mut Vec<(String, String)>, message_id: Option<&str>) {
        if self.started {
            return;
        }
        self.started = true;
        let id = message_id
            .map(|s| s.to_string())
            .unwrap_or_else(|| format!("msg_{}", uuid::Uuid::new_v4().simple()));
        events.push((
            "message_start".to_string(),
            serde_json::json!({
                "type": "message_start",
                "message": {
                    "id": id,
                    "type": "message",
                    "role": "assistant",
                    "content": [],
                    "model": self.source_model,
                    "stop_reason": null,
                    "stop_sequence": null,
                    "usage": {"input_tokens": 0, "output_tokens": 0},
                }
            })
            .to_string(),
        ));
        events.push(("ping".to_string(), r#"{"type":"ping"}"#.to_string()));
    }

    fn start_block(
        &mut self,
        events: &mut Vec<(String, String)>,
        kind: OpenBlock,
        content_block: serde_json::Value,
    ) {
        self.close_block(events);
        let index = self.next_index;
        self.next_index += 1;
        self.open_block = Some(kind);
        events.push((
            "content_block_start".to_string(),
            serde_json::json!({
                "type": "content_block_start",
                "index": index,
                "content_block": content_block,
            })
            .to_string(),
        ));
    }

    fn close_block(&mut self, events: &mut Vec<(String, String)>) {
        if self.open_block.take().is_some() {
            events.push((
                "content_block_stop".to_string(),
                serde_json::json!({
                    "type": "content_block_stop",
                    "index": self.current_index(),
                })
                .to_string(),
            ));
        }
    }

    fn push_delta(&self, events: &mut Vec<(String, String)>, delta: serde_json::Value) {
        events.push((
            "content_block_delta".to_string(),
            serde_json::json!({
                "type": "content_block_delta",
                "index": self.current_index(),
                "delta": delta,
            })
            .to_string(),
        ));
    }

    fn push_thinking_delta(&mut self, events: &mut Vec<(String, String)>, text: &str) {
        if !matches!(self.open_block, Some(OpenBlock::Thinking { .. })) {
            self.start_block(
                events,
                OpenBlock::Thinking { summary_parts: 1 },
                serde_json::json!({"type": "thinking", "thinking": ""}),
            );
        }
        self.push_delta(
            events,
            serde_json::json!({"type": "thinking_delta", "thinking": text}),
        );
    }

    /// Convert one Responses SSE frame into zero or more Anthropic
    /// `(event_type, data)` pairs.
    pub fn convert_frame(
        &mut self,
        event_type: &str,
        payload: &serde_json::Value,
    ) -> Vec<(String, String)> {
        let mut events: Vec<(String, String)> = Vec::new();

        match event_type {
            "response.created" => {
                let message_id = payload.pointer("/response/id").and_then(|i| i.as_str());
                self.ensure_started(&mut events, message_id);
            }
            "response.output_item.added" => {
                self.ensure_started(&mut events, None);
                let item = payload.get("item").cloned().unwrap_or_default();
                match item.get("type").and_then(|t| t.as_str()).unwrap_or("") {
                    "reasoning" => {
                        self.start_block(
                            &mut events,
                            OpenBlock::Thinking { summary_parts: 0 },
                            serde_json::json!({"type": "thinking", "thinking": ""}),
                        );
                    }
                    "function_call" => {
                        self.has_tool_use = true;
                        let call_id = item
                            .get("call_id")
                            .or_else(|| item.get("id"))
                            .and_then(|v| v.as_str())
                            .unwrap_or("");
                        let name = item.get("name").and_then(|v| v.as_str()).unwrap_or("");
                        self.start_block(
                            &mut events,
                            OpenBlock::ToolUse {
                                args_streamed: false,
                            },
                            serde_json::json!({
                                "type": "tool_use", "id": call_id, "name": name, "input": {},
                            }),
                        );
                    }
                    // "message": the text block opens lazily on the first
                    // output_text delta.
                    _ => {}
                }
            }
            "response.reasoning_summary_part.added" => {
                if let Some(OpenBlock::Thinking { summary_parts }) = &mut self.open_block {
                    *summary_parts += 1;
                    if *summary_parts > 1 {
                        self.push_delta(
                            &mut events,
                            serde_json::json!({"type": "thinking_delta", "thinking": "\n\n"}),
                        );
                    }
                }
            }
            "response.reasoning_summary_text.delta" | "response.reasoning_text.delta" => {
                if let Some(text) = payload.get("delta").and_then(|d| d.as_str()) {
                    self.push_thinking_delta(&mut events, text);
                }
            }
            "response.output_text.delta" => {
                if let Some(text) = payload.get("delta").and_then(|d| d.as_str()) {
                    if !matches!(self.open_block, Some(OpenBlock::Text)) {
                        self.start_block(
                            &mut events,
                            OpenBlock::Text,
                            serde_json::json!({"type": "text", "text": ""}),
                        );
                    }
                    self.push_delta(
                        &mut events,
                        serde_json::json!({"type": "text_delta", "text": text}),
                    );
                }
            }
            "response.function_call_arguments.delta" => {
                if let Some(args) = payload.get("delta").and_then(|d| d.as_str()) {
                    if let Some(OpenBlock::ToolUse { args_streamed }) = &mut self.open_block {
                        *args_streamed = true;
                        self.push_delta(
                            &mut events,
                            serde_json::json!({"type": "input_json_delta", "partial_json": args}),
                        );
                    }
                }
            }
            "response.output_item.done" => {
                let item = payload.get("item").cloned().unwrap_or_default();
                match item.get("type").and_then(|t| t.as_str()).unwrap_or("") {
                    "reasoning" => {
                        if matches!(self.open_block, Some(OpenBlock::Thinking { .. })) {
                            if let Some(ec) = item.get("encrypted_content").and_then(|e| e.as_str())
                            {
                                let id = item.get("id").and_then(|i| i.as_str()).unwrap_or("");
                                self.push_delta(
                                    &mut events,
                                    serde_json::json!({
                                        "type": "signature_delta",
                                        "signature": encode_reasoning_signature(id, ec),
                                    }),
                                );
                            }
                            self.close_block(&mut events);
                        }
                    }
                    "function_call" => {
                        // If arguments never streamed as deltas, emit them whole.
                        if let Some(OpenBlock::ToolUse {
                            args_streamed: false,
                        }) = self.open_block
                        {
                            if let Some(args) = item
                                .get("arguments")
                                .and_then(|a| a.as_str())
                                .filter(|a| !a.is_empty() && *a != "{}")
                            {
                                self.push_delta(
                                    &mut events,
                                    serde_json::json!({
                                        "type": "input_json_delta", "partial_json": args,
                                    }),
                                );
                            }
                        }
                        self.close_block(&mut events);
                    }
                    "message" => self.close_block(&mut events),
                    _ => {}
                }
            }
            "response.completed" | "response.incomplete" => {
                if self.finished {
                    return events;
                }
                self.finished = true;
                self.ensure_started(&mut events, None);
                self.close_block(&mut events);

                let response = payload.get("response").cloned().unwrap_or_default();
                let (input, output, cached) = response
                    .get("usage")
                    .map(parse_responses_usage)
                    .unwrap_or((0, 0, 0));
                self.input_tokens = input.saturating_sub(cached);
                self.output_tokens = output;
                self.cache_read_tokens = cached;

                let stop_reason = responses_stop_reason(&response, self.has_tool_use);
                let mut usage = serde_json::json!({
                    "input_tokens": self.input_tokens,
                    "output_tokens": self.output_tokens,
                });
                if cached > 0 {
                    usage["cache_read_input_tokens"] = serde_json::json!(cached);
                }
                events.push((
                    "message_delta".to_string(),
                    serde_json::json!({
                        "type": "message_delta",
                        "delta": {"stop_reason": stop_reason.to_string(), "stop_sequence": null},
                        "usage": usage,
                    })
                    .to_string(),
                ));
                events.push((
                    "message_stop".to_string(),
                    r#"{"type":"message_stop"}"#.to_string(),
                ));
            }
            "response.failed" | "error" => {
                let message = payload
                    .pointer("/response/error/message")
                    .or_else(|| payload.pointer("/error/message"))
                    .or_else(|| payload.get("message"))
                    .and_then(|m| m.as_str())
                    .unwrap_or("upstream response failed");
                events.push((
                    "error".to_string(),
                    serde_json::json!({
                        "type": "error",
                        "error": {"type": "api_error", "message": message},
                    })
                    .to_string(),
                ));
            }
            // in_progress, content_part.*, *.done text/summary events, etc. —
            // subsumed by the delta/done handling above.
            _ => {}
        }

        events
    }
}

// ============================================================================
// Tests
// ============================================================================

#[cfg(test)]
mod tests {
    use super::*;
    use crate::schemas::anthropic::{Message, ThinkingConfig};

    fn base_request() -> MessageRequest {
        MessageRequest::new("gpt-5.6-sol", vec![Message::user("hello")], 1024)
    }

    #[test]
    fn test_signature_roundtrip() {
        let sig = encode_reasoning_signature("rs_123", "abc+/=");
        assert_eq!(decode_reasoning_signature(&sig), Some(("rs_123", "abc+/=")));
        // Foreign (Claude) signatures don't decode.
        assert_eq!(decode_reasoning_signature("EqQBCkYIChgC..."), None);
    }

    #[test]
    fn test_request_basics() {
        let mut req = base_request();
        req.system = Some(SystemContent::Text("be terse".into()));
        req.temperature = Some(0.5);
        req.stop_sequences = Some(vec!["END".into()]);
        let body = anthropic_to_responses_request(&req, "openai.gpt-5.6-sol");

        assert_eq!(body["model"], "openai.gpt-5.6-sol");
        assert_eq!(body["instructions"], "be terse");
        assert_eq!(body["max_output_tokens"], 1024);
        assert_eq!(body["store"], false);
        assert_eq!(body["include"][0], "reasoning.encrypted_content");
        // Sampling params and stop_sequences are dropped.
        assert!(body.get("temperature").is_none());
        assert!(body.get("stop_sequences").is_none());
        // Plain text user turn becomes a message item with an input_text part.
        assert_eq!(body["input"][0]["type"], "message");
        assert_eq!(body["input"][0]["content"][0]["type"], "input_text");
        assert_eq!(body["input"][0]["content"][0]["text"], "hello");
    }

    #[test]
    fn test_request_thinking_maps_to_reasoning() {
        let mut req = base_request();
        req.thinking = Some(ThinkingConfig {
            thinking_type: "enabled".into(),
            budget_tokens: Some(20_000),
        });
        let body = anthropic_to_responses_request(&req, "m");
        assert_eq!(body["reasoning"]["effort"], "high");
        assert_eq!(body["reasoning"]["summary"], "auto");
    }

    #[test]
    fn test_request_tool_and_history_roundtrip() {
        let mut req = base_request();
        req.tools = Some(vec![serde_json::json!({
            "name": "get_weather",
            "description": "d",
            "input_schema": {"type": "object", "properties": {}},
        })]);
        req.tool_choice = Some(ToolChoice::Object(serde_json::json!({"type": "any"})));
        req.messages = vec![
            Message::user("check SF"),
            Message::with_blocks(
                "assistant",
                vec![
                    ContentBlock::Thinking {
                        thinking: "hmm".into(),
                        signature: Some(encode_reasoning_signature("rs_1", "ENC")),
                    },
                    ContentBlock::ToolUse {
                        id: "call_1".into(),
                        name: "get_weather".into(),
                        input: serde_json::json!({"city": "SF"}),
                        caller: None,
                    },
                ],
            ),
            Message::with_blocks(
                "user",
                vec![ContentBlock::ToolResult {
                    tool_use_id: "call_1".into(),
                    content: ToolResultValue::Text("sunny".into()),
                    is_error: None,
                    cache_control: None,
                }],
            ),
        ];
        let body = anthropic_to_responses_request(&req, "m");
        let input = body["input"].as_array().unwrap();
        assert_eq!(input.len(), 4);
        assert_eq!(input[0]["type"], "message");
        assert_eq!(input[1]["type"], "reasoning");
        assert_eq!(input[1]["id"], "rs_1");
        assert_eq!(input[1]["encrypted_content"], "ENC");
        assert_eq!(input[2]["type"], "function_call");
        assert_eq!(input[2]["call_id"], "call_1");
        assert_eq!(input[2]["arguments"], r#"{"city":"SF"}"#);
        assert_eq!(input[3]["type"], "function_call_output");
        assert_eq!(input[3]["call_id"], "call_1");
        assert_eq!(input[3]["output"], "sunny");

        let tools = body["tools"].as_array().unwrap();
        assert_eq!(tools[0]["type"], "function");
        assert_eq!(tools[0]["name"], "get_weather");
        assert!(tools[0]["parameters"].is_object());
        assert_eq!(body["tool_choice"], "required");
    }

    #[test]
    fn test_request_drops_foreign_thinking_signature() {
        let mut req = base_request();
        req.messages = vec![Message::with_blocks(
            "assistant",
            vec![ContentBlock::Thinking {
                thinking: "claude thought".into(),
                signature: Some("EqQBClaudeSig".into()),
            }],
        )];
        let body = anthropic_to_responses_request(&req, "m");
        assert!(body["input"].as_array().unwrap().is_empty());
    }

    fn sample_completed_response() -> serde_json::Value {
        serde_json::json!({
            "id": "resp_1",
            "status": "completed",
            "model": "openai.gpt-5.6-sol",
            "output": [
                {
                    "type": "reasoning",
                    "id": "rs_9",
                    "encrypted_content": "ENC9",
                    "summary": [
                        {"type": "summary_text", "text": "think a"},
                        {"type": "summary_text", "text": "think b"},
                    ],
                },
                {
                    "type": "message",
                    "content": [{"type": "output_text", "text": "The answer"}],
                },
            ],
            "usage": {
                "input_tokens": 100,
                "output_tokens": 20,
                "input_tokens_details": {"cached_tokens": 40},
            },
        })
    }

    #[test]
    fn test_response_conversion() {
        let resp = responses_to_anthropic_response(&sample_completed_response(), "gpt-5.6-sol");
        assert_eq!(resp.id, "resp_1");
        assert_eq!(resp.model, "gpt-5.6-sol");
        assert_eq!(resp.stop_reason, Some(StopReason::EndTurn));
        assert_eq!(resp.content.len(), 2);
        match &resp.content[0] {
            ContentBlock::Thinking {
                thinking,
                signature,
            } => {
                assert_eq!(thinking, "think a\n\nthink b");
                assert_eq!(
                    decode_reasoning_signature(signature.as_deref().unwrap()),
                    Some(("rs_9", "ENC9"))
                );
            }
            other => panic!("expected thinking block, got {other:?}"),
        }
        assert_eq!(resp.content[1].as_text(), Some("The answer"));
        // OpenAI input_tokens includes cached; Anthropic splits them out.
        assert_eq!(resp.usage.input_tokens, 60);
        assert_eq!(resp.usage.cache_read_input_tokens, Some(40));
        assert_eq!(resp.usage.output_tokens, 20);
    }

    #[test]
    fn test_response_function_call_and_incomplete() {
        let resp = serde_json::json!({
            "id": "resp_2",
            "status": "completed",
            "output": [{
                "type": "function_call",
                "call_id": "call_7",
                "name": "run",
                "arguments": "{\"cmd\":\"ls\"}",
            }],
            "usage": {"input_tokens": 5, "output_tokens": 3},
        });
        let out = responses_to_anthropic_response(&resp, "gpt");
        assert_eq!(out.stop_reason, Some(StopReason::ToolUse));
        match &out.content[0] {
            ContentBlock::ToolUse {
                id, name, input, ..
            } => {
                assert_eq!(id, "call_7");
                assert_eq!(name, "run");
                assert_eq!(input["cmd"], "ls");
            }
            other => panic!("expected tool_use, got {other:?}"),
        }

        let truncated = serde_json::json!({
            "id": "resp_3",
            "status": "incomplete",
            "incomplete_details": {"reason": "max_output_tokens"},
            "output": [],
            "usage": {"input_tokens": 5, "output_tokens": 3},
        });
        let out = responses_to_anthropic_response(&truncated, "gpt");
        assert_eq!(out.stop_reason, Some(StopReason::MaxTokens));
    }

    /// Drive the stream state with a realistic Mantle frame sequence.
    #[test]
    fn test_stream_conversion_full_sequence() {
        let mut state = ResponsesToAnthropicStreamState::new("gpt-5.6-sol");
        let mut all: Vec<(String, String)> = Vec::new();

        let frames = vec![
            (
                "response.created",
                serde_json::json!({"response": {"id": "resp_s"}}),
            ),
            (
                "response.output_item.added",
                serde_json::json!({"item": {"type": "reasoning", "id": "rs_1"}}),
            ),
            (
                "response.reasoning_summary_part.added",
                serde_json::json!({}),
            ),
            (
                "response.reasoning_summary_text.delta",
                serde_json::json!({"delta": "thinking..."}),
            ),
            (
                "response.output_item.done",
                serde_json::json!({"item": {
                    "type": "reasoning", "id": "rs_1", "encrypted_content": "ENC",
                }}),
            ),
            (
                "response.output_item.added",
                serde_json::json!({"item": {"type": "message"}}),
            ),
            (
                "response.output_text.delta",
                serde_json::json!({"delta": "Hello"}),
            ),
            (
                "response.output_item.done",
                serde_json::json!({"item": {"type": "message"}}),
            ),
            (
                "response.output_item.added",
                serde_json::json!({"item": {
                    "type": "function_call", "call_id": "call_1", "name": "run",
                }}),
            ),
            (
                "response.function_call_arguments.delta",
                serde_json::json!({"delta": "{\"x\":1}"}),
            ),
            (
                "response.output_item.done",
                serde_json::json!({"item": {"type": "function_call", "call_id": "call_1"}}),
            ),
            (
                "response.completed",
                serde_json::json!({"response": {
                    "status": "completed",
                    "usage": {"input_tokens": 50, "output_tokens": 10,
                              "input_tokens_details": {"cached_tokens": 20}},
                }}),
            ),
        ];
        for (evt, payload) in frames {
            all.extend(state.convert_frame(evt, &payload));
        }

        let names: Vec<&str> = all.iter().map(|(t, _)| t.as_str()).collect();
        assert_eq!(
            names,
            vec![
                "message_start",
                "ping",
                "content_block_start", // thinking (index 0)
                "content_block_delta", // thinking_delta
                "content_block_delta", // signature_delta
                "content_block_stop",
                "content_block_start", // text (index 1)
                "content_block_delta",
                "content_block_stop",
                "content_block_start", // tool_use (index 2)
                "content_block_delta", // input_json_delta
                "content_block_stop",
                "message_delta",
                "message_stop",
            ]
        );

        // Dynamic indexes: thinking 0, text 1, tool_use 2.
        let starts: Vec<serde_json::Value> = all
            .iter()
            .filter(|(t, _)| t == "content_block_start")
            .map(|(_, d)| serde_json::from_str(d).unwrap())
            .collect();
        assert_eq!(starts[0]["index"], 0);
        assert_eq!(starts[0]["content_block"]["type"], "thinking");
        assert_eq!(starts[1]["index"], 1);
        assert_eq!(starts[1]["content_block"]["type"], "text");
        assert_eq!(starts[2]["index"], 2);
        assert_eq!(starts[2]["content_block"]["type"], "tool_use");
        assert_eq!(starts[2]["content_block"]["id"], "call_1");

        // Signature delta carries the encoded round-trip token.
        let sig: serde_json::Value = serde_json::from_str(&all[4].1).unwrap();
        assert_eq!(sig["delta"]["type"], "signature_delta");
        assert_eq!(
            decode_reasoning_signature(sig["delta"]["signature"].as_str().unwrap()),
            Some(("rs_1", "ENC"))
        );

        // Terminal frame: tool_use wins the stop_reason; usage split S1-style.
        let md: serde_json::Value = serde_json::from_str(&all[12].1).unwrap();
        assert_eq!(md["delta"]["stop_reason"], "tool_use");
        assert_eq!(md["usage"]["input_tokens"], 30);
        assert_eq!(md["usage"]["cache_read_input_tokens"], 20);
        assert_eq!(state.input_tokens, 30);
        assert_eq!(state.cache_read_tokens, 20);
        assert_eq!(state.output_tokens, 10);
    }

    #[test]
    fn test_stream_function_call_args_only_in_done() {
        // Some upstreams put the full arguments only in output_item.done.
        let mut state = ResponsesToAnthropicStreamState::new("gpt");
        let mut all: Vec<(String, String)> = Vec::new();
        all.extend(state.convert_frame(
            "response.created",
            &serde_json::json!({"response": {"id": "r"}}),
        ));
        all.extend(state.convert_frame(
            "response.output_item.added",
            &serde_json::json!({"item": {"type": "function_call", "call_id": "c", "name": "f"}}),
        ));
        all.extend(state.convert_frame(
            "response.output_item.done",
            &serde_json::json!({"item": {
                "type": "function_call", "call_id": "c", "arguments": "{\"a\":2}",
            }}),
        ));
        let delta = all
            .iter()
            .find(|(t, _)| t == "content_block_delta")
            .expect("input_json_delta emitted from done");
        let parsed: serde_json::Value = serde_json::from_str(&delta.1).unwrap();
        assert_eq!(parsed["delta"]["partial_json"], "{\"a\":2}");
    }

    #[test]
    fn test_stream_error_frame() {
        let mut state = ResponsesToAnthropicStreamState::new("gpt");
        let events = state.convert_frame(
            "response.failed",
            &serde_json::json!({"response": {"error": {"message": "boom"}}}),
        );
        assert_eq!(events[0].0, "error");
        assert!(events[0].1.contains("boom"));
    }
}
