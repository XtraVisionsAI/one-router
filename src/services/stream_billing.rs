//! Usage billing for streamed (SSE) responses.
//!
//! Streaming handlers learn their exact token usage only when the upstream
//! stream finishes (Anthropic `message_delta`, OpenAI's final `usage` chunk,
//! Responses `response.completed`). If the client disconnects first, the
//! handler's stream is dropped mid-way and nothing used to be recorded — an
//! aborted stream was free.
//!
//! [`bill_sse_response`] wraps the **encoded** SSE response body:
//!
//! - every frame is fed to an [`SseUsageMeter`], which tracks the usage
//!   reported so far and estimates output tokens from streamed deltas;
//! - when the body ends, usage is recorded once (the handler's exact usage if
//!   it reported any, else the meter's);
//! - when the body is dropped before its end (client went away), a drop guard
//!   records what was seen so far from a spawned task. Input falls back to an
//!   estimate from the request, output to the streamed-text estimate.
//!
//! Exactly one of the two paths runs (the recorder is `take()`n).

use std::sync::Arc;

use axum::{body::Body, response::Response};
use serde_json::Value;

use crate::middleware::auth::ApiKeyInfo;
use crate::schemas::anthropic::Usage;
use crate::services::usage_tracker::UsageTracker;
use crate::utils::tokens::estimate_text_tokens;

/// Incremental parser for an outgoing SSE body (Anthropic, OpenAI chat or
/// Responses frames).
#[derive(Debug, Default)]
pub struct SseUsageMeter {
    buf: Vec<u8>,
    input: i64,
    output: i64,
    cache_read: i64,
    cache_creation: i64,
    saw_input: bool,
    saw_output: bool,
    /// Output tokens estimated from streamed text / tool-argument deltas.
    est_output: u64,
}

impl SseUsageMeter {
    pub fn feed(&mut self, chunk: &[u8]) {
        self.buf.extend_from_slice(chunk);
        while let Some((end, sep)) = find_frame_end(&self.buf) {
            let frame: Vec<u8> = self.buf.drain(..end + sep).collect();
            let frame = String::from_utf8_lossy(&frame[..end]).into_owned();
            self.frame(&frame);
        }
    }

    fn frame(&mut self, frame: &str) {
        let mut event: Option<&str> = None;
        let mut data = String::new();
        for line in frame.lines() {
            let line = line.trim_end_matches('\r');
            if let Some(v) = line.strip_prefix("event:") {
                event = Some(v.trim());
            } else if let Some(v) = line.strip_prefix("data:") {
                if !data.is_empty() {
                    data.push('\n');
                }
                data.push_str(v.strip_prefix(' ').unwrap_or(v));
            }
        }
        if data.is_empty() || data == "[DONE]" {
            return;
        }
        let Ok(v) = serde_json::from_str::<Value>(&data) else {
            return;
        };
        let ty = event
            .map(str::to_string)
            .or_else(|| v.get("type").and_then(|t| t.as_str()).map(String::from));
        self.observe(ty.as_deref(), &v);
    }

    fn observe(&mut self, ty: Option<&str>, v: &Value) {
        match ty {
            // ---- Anthropic ----
            Some("message_start") => {
                if let Some(u) = v.pointer("/message/usage") {
                    self.anthropic_input(u);
                }
            }
            Some("message_delta") => {
                if let Some(u) = v.get("usage") {
                    self.anthropic_input(u);
                    if let Some(o) = u.get("output_tokens").and_then(Value::as_i64) {
                        self.output = o;
                        self.saw_output = true;
                    }
                }
            }
            Some("content_block_delta") => {
                if let Some(d) = v.get("delta") {
                    for k in ["text", "thinking", "partial_json"] {
                        self.estimate(d.get(k));
                    }
                }
            }
            // ---- OpenAI Responses ----
            Some("response.completed") | Some("response.incomplete") | Some("response.failed") => {
                if let Some(u) = v.pointer("/response/usage").filter(|u| u.is_object()) {
                    let input = u.get("input_tokens").and_then(Value::as_i64).unwrap_or(0);
                    let cached = u
                        .pointer("/input_tokens_details/cached_tokens")
                        .and_then(Value::as_i64)
                        .unwrap_or(0);
                    self.input = (input - cached).max(0);
                    self.cache_read = cached;
                    self.saw_input = true;
                    self.output = u.get("output_tokens").and_then(Value::as_i64).unwrap_or(0);
                    self.saw_output = true;
                }
            }
            Some(t) if t.starts_with("response.") && t.ends_with(".delta") => {
                self.estimate(v.get("delta"));
            }
            // ---- OpenAI Chat Completions chunks (no `event:` line, no `type`) ----
            _ => {
                if let Some(u) = v.get("usage").filter(|u| u.is_object()) {
                    let prompt = u.get("prompt_tokens").and_then(Value::as_i64).unwrap_or(0);
                    let cached = u
                        .pointer("/prompt_tokens_details/cached_tokens")
                        .and_then(Value::as_i64)
                        .unwrap_or(0);
                    if prompt > 0 || cached > 0 {
                        self.input = (prompt - cached).max(0);
                        self.cache_read = cached;
                        self.saw_input = true;
                    }
                    if let Some(c) = u.get("completion_tokens").and_then(Value::as_i64) {
                        self.output = c;
                        self.saw_output = true;
                    }
                }
                if let Some(choices) = v.get("choices").and_then(Value::as_array) {
                    for c in choices {
                        let Some(d) = c.get("delta") else { continue };
                        for k in ["content", "reasoning_content", "reasoning"] {
                            self.estimate(d.get(k));
                        }
                        if let Some(calls) = d.get("tool_calls").and_then(Value::as_array) {
                            for call in calls {
                                self.estimate(call.pointer("/function/arguments"));
                                self.estimate(call.pointer("/function/name"));
                            }
                        }
                    }
                }
            }
        }
    }

    fn anthropic_input(&mut self, u: &Value) {
        let get = |k: &str| u.get(k).and_then(Value::as_i64);
        let input = get("input_tokens").unwrap_or(0);
        let read = get("cache_read_input_tokens").unwrap_or(0);
        let write = get("cache_creation_input_tokens").unwrap_or(0);
        if input > 0 || read > 0 || write > 0 {
            self.input = input;
            self.cache_read = read;
            self.cache_creation = write;
            self.saw_input = true;
        }
    }

    fn estimate(&mut self, v: Option<&Value>) {
        if let Some(s) = v.and_then(Value::as_str) {
            self.est_output += estimate_text_tokens(s);
        }
    }

    /// Usage seen so far; `input_estimate` fills in when the stream never
    /// reported input, the streamed-text estimate when it never reported output.
    pub fn usage(&self, input_estimate: i32) -> Usage {
        let clamp = |n: i64| n.clamp(0, i32::MAX as i64) as i32;
        let mut u = Usage::new(
            if self.saw_input {
                clamp(self.input)
            } else {
                input_estimate.max(0)
            },
            if self.saw_output {
                clamp(self.output)
            } else {
                clamp(self.est_output.min(i32::MAX as u64) as i64)
            },
        );
        if self.cache_read > 0 {
            u.cache_read_input_tokens = Some(clamp(self.cache_read));
        }
        if self.cache_creation > 0 {
            u.cache_creation_input_tokens = Some(clamp(self.cache_creation));
        }
        u
    }
}

/// Fixed token estimate for an inline (data-URL) image.
const IMAGE_TOKEN_ESTIMATE: u64 = 1600;

/// Rough input-token estimate of a JSON request fragment (e.g. OpenAI
/// `messages` / Responses `input`): text of every string leaf, inline images at
/// a fixed cost. Used only when a stream ends before reporting input usage.
pub fn estimate_json_tokens(v: &Value) -> i32 {
    fn walk(v: &Value) -> u64 {
        match v {
            Value::String(s) if s.starts_with("data:") => IMAGE_TOKEN_ESTIMATE,
            Value::String(s) => estimate_text_tokens(s),
            Value::Array(a) => a.iter().map(walk).sum(),
            Value::Object(o) => o.values().map(walk).sum(),
            _ => 0,
        }
    }
    walk(v).min(i32::MAX as u64) as i32
}

/// `(frame length, separator length)` of the first complete SSE frame.
fn find_frame_end(buf: &[u8]) -> Option<(usize, usize)> {
    let lf = buf.windows(2).position(|w| w == b"\n\n").map(|p| (p, 2));
    let crlf = buf
        .windows(4)
        .position(|w| w == b"\r\n\r\n")
        .map(|p| (p, 4));
    match (lf, crlf) {
        (Some(a), Some(b)) => Some(if a.0 <= b.0 { a } else { b }),
        (a, b) => a.or(b),
    }
}

/// Exact usage written by a handler's inner stream once it finishes.
pub type ExactUsage = Arc<dyn Fn() -> Option<Usage> + Send + Sync>;

/// Everything needed to record a streamed request's usage.
pub struct StreamBilling {
    pub tracker: Arc<UsageTracker>,
    pub key_info: ApiKeyInfo,
    pub request_id: String,
    /// Source model id (pricing key).
    pub model: String,
    pub provider: String,
    pub protocol: &'static str,
    pub cache_ttl: Option<String>,
    /// Input-token estimate from the request, used when the stream ends
    /// before reporting input usage.
    pub input_estimate: i32,
    /// The handler's own exact usage (preferred when it reported any).
    pub exact: Option<ExactUsage>,
}

fn is_empty(u: &Usage) -> bool {
    u.input_tokens <= 0
        && u.output_tokens <= 0
        && u.cache_read_input_tokens.unwrap_or(0) <= 0
        && u.cache_creation_input_tokens.unwrap_or(0) <= 0
}

impl StreamBilling {
    fn resolve(&self, meter: &SseUsageMeter) -> Usage {
        if let Some(u) = self.exact.as_ref().and_then(|f| f()) {
            if !is_empty(&u) {
                return u;
            }
        }
        meter.usage(self.input_estimate)
    }

    async fn record(self, usage: Usage) {
        if let Err(e) = self
            .tracker
            .record_usage(
                &self.key_info,
                &self.request_id,
                &self.model,
                &usage,
                true,
                &self.provider,
                self.protocol,
                self.cache_ttl.as_deref(),
            )
            .await
        {
            tracing::warn!(error = %e, request_id = %self.request_id, "Failed to record streaming usage");
        }
    }
}

struct BillingGuard {
    meter: SseUsageMeter,
    billing: Option<StreamBilling>,
}

impl Drop for BillingGuard {
    fn drop(&mut self) {
        let Some(billing) = self.billing.take() else {
            return;
        };
        let usage = billing.resolve(&self.meter);
        tracing::info!(
            request_id = %billing.request_id,
            input_tokens = usage.input_tokens,
            output_tokens = usage.output_tokens,
            "Stream ended early (client disconnect); recording usage seen so far"
        );
        if let Ok(handle) = tokio::runtime::Handle::try_current() {
            handle.spawn(billing.record(usage));
        }
    }
}

/// Wrap an SSE response so its usage is recorded exactly once — at the end of
/// the body, or from a drop guard if the body is abandoned.
pub fn bill_sse_response(resp: Response, billing: StreamBilling) -> Response {
    use futures::StreamExt;
    let (parts, body) = resp.into_parts();
    let mut guard = BillingGuard {
        meter: SseUsageMeter::default(),
        billing: Some(billing),
    };
    let stream = async_stream::stream! {
        let mut data = body.into_data_stream();
        while let Some(chunk) = data.next().await {
            if let Ok(bytes) = &chunk {
                guard.meter.feed(bytes);
            }
            yield chunk;
        }
        if let Some(billing) = guard.billing.take() {
            let usage = billing.resolve(&guard.meter);
            billing.record(usage).await;
        }
    };
    Response::from_parts(parts, Body::from_stream(stream))
}

#[cfg(test)]
mod tests {
    use super::*;

    fn feed_all(frames: &[&str]) -> SseUsageMeter {
        let mut m = SseUsageMeter::default();
        for f in frames {
            m.feed(f.as_bytes());
        }
        m
    }

    #[test]
    fn anthropic_complete_stream_uses_reported_usage() {
        let m = feed_all(&[
            "event: message_start\ndata: {\"type\":\"message_start\",\"message\":{\"usage\":{\"input_tokens\":120,\"cache_read_input_tokens\":30,\"output_tokens\":1}}}\n\n",
            "event: content_block_delta\ndata: {\"type\":\"content_block_delta\",\"delta\":{\"type\":\"text_delta\",\"text\":\"hello world\"}}\n\n",
            "event: message_delta\ndata: {\"type\":\"message_delta\",\"usage\":{\"output_tokens\":42}}\n\n",
        ]);
        let u = m.usage(999);
        assert_eq!(u.input_tokens, 120);
        assert_eq!(u.output_tokens, 42);
        assert_eq!(u.cache_read_input_tokens, Some(30));
    }

    #[test]
    fn anthropic_aborted_stream_estimates_output() {
        // No message_delta: output comes from the streamed text; frames split
        // across chunk boundaries.
        let text = "word ".repeat(200);
        let delta = format!(
            "event: content_block_delta\ndata: {{\"type\":\"content_block_delta\",\"delta\":{{\"type\":\"text_delta\",\"text\":\"{text}\"}}}}\n\n"
        );
        let mut m = SseUsageMeter::default();
        m.feed(b"event: message_start\ndata: {\"type\":\"message_start\",\"message\":{\"usage\":{\"input_tokens\":500}}}\n\n");
        let (a, b) = delta.as_bytes().split_at(40);
        m.feed(a);
        m.feed(b);
        let u = m.usage(1);
        assert_eq!(u.input_tokens, 500);
        assert!(u.output_tokens > 0);
        assert_eq!(u.output_tokens as u64, estimate_text_tokens(&text));
    }

    #[test]
    fn missing_input_falls_back_to_estimate() {
        let m = feed_all(&["data: {\"choices\":[{\"delta\":{\"content\":\"hi there\"}}]}\n\n"]);
        let u = m.usage(77);
        assert_eq!(u.input_tokens, 77);
        assert!(u.output_tokens > 0);
    }

    #[test]
    fn openai_usage_chunk_splits_cached() {
        let m = feed_all(&[
            "data: {\"choices\":[{\"delta\":{\"content\":\"x\"}}]}\n\n",
            "data: {\"choices\":[],\"usage\":{\"prompt_tokens\":100,\"completion_tokens\":7,\"prompt_tokens_details\":{\"cached_tokens\":40}}}\n\n",
            "data: [DONE]\n\n",
        ]);
        let u = m.usage(1);
        assert_eq!(u.input_tokens, 60);
        assert_eq!(u.cache_read_input_tokens, Some(40));
        assert_eq!(u.output_tokens, 7);
    }

    #[test]
    fn responses_completed_usage() {
        let m = feed_all(&[
            "data: {\"type\":\"response.output_text.delta\",\"delta\":\"abc\"}\nevent: response.output_text.delta\n\n",
            "event: response.completed\ndata: {\"type\":\"response.completed\",\"response\":{\"usage\":{\"input_tokens\":50,\"output_tokens\":9,\"input_tokens_details\":{\"cached_tokens\":10}}}}\n\n",
        ]);
        let u = m.usage(1);
        assert_eq!(u.input_tokens, 40);
        assert_eq!(u.cache_read_input_tokens, Some(10));
        assert_eq!(u.output_tokens, 9);
    }

    fn billing(f: &crate::services::usage_tracker::test_support::Fixture) -> StreamBilling {
        StreamBilling {
            tracker: f.tracker.clone(),
            key_info: f.key_info.clone(),
            request_id: "req".into(),
            model: "unpriced-model".into(),
            provider: "bedrock".into(),
            protocol: "anthropic",
            cache_ttl: None,
            input_estimate: 0,
            exact: None,
        }
    }

    fn sse_response(frames: Vec<&'static str>, then_hang: bool) -> Response {
        use futures::StreamExt;
        let head = futures::stream::iter(
            frames
                .into_iter()
                .map(|f| Ok::<bytes::Bytes, std::convert::Infallible>(bytes::Bytes::from(f))),
        );
        let body = if then_hang {
            Body::from_stream(head.chain(futures::stream::pending()))
        } else {
            Body::from_stream(head)
        };
        Response::new(body)
    }

    const START_1M: &str = "event: message_start\ndata: {\"type\":\"message_start\",\"message\":{\"usage\":{\"input_tokens\":1000000}}}\n\n";

    #[tokio::test]
    async fn aborted_stream_records_usage_seen_so_far() {
        use futures::StreamExt;
        let f = crate::services::usage_tracker::test_support::fixture(100.0).await;
        let resp = bill_sse_response(
            sse_response(
                vec![
                    START_1M,
                    "event: content_block_delta\ndata: {\"type\":\"content_block_delta\",\"delta\":{\"type\":\"text_delta\",\"text\":\"partial answer\"}}\n\n",
                ],
                true,
            ),
            billing(&f),
        );
        let mut data = resp.into_body().into_data_stream();
        assert!(data.next().await.is_some());
        assert!(data.next().await.is_some());
        drop(data); // client disconnects; upstream never finished

        let mut spend = 0.0;
        for _ in 0..100 {
            spend = f.user_spend().await;
            if spend > 0.0 {
                break;
            }
            tokio::time::sleep(std::time::Duration::from_millis(10)).await;
        }
        // 1M input tokens at the default $3/M plus the estimated output.
        assert!(spend > 3.0, "aborted stream billed {spend}");
        assert_eq!(spend, f.key_spend().await);
    }

    #[tokio::test]
    async fn completed_stream_records_exactly_once() {
        use futures::StreamExt;
        let f = crate::services::usage_tracker::test_support::fixture(100.0).await;
        let resp = bill_sse_response(
            sse_response(
                vec![
                    START_1M,
                    "event: message_delta\ndata: {\"type\":\"message_delta\",\"usage\":{\"output_tokens\":0}}\n\n",
                ],
                false,
            ),
            billing(&f),
        );
        let mut data = resp.into_body().into_data_stream();
        while data.next().await.is_some() {}
        drop(data);
        tokio::time::sleep(std::time::Duration::from_millis(100)).await;
        assert!((f.user_spend().await - 3.0).abs() < 1e-9);
    }

    #[test]
    fn keepalive_comments_are_ignored() {
        let m = feed_all(&[":\n\n", ": ping\n\n"]);
        let u = m.usage(5);
        assert_eq!((u.input_tokens, u.output_tokens), (5, 0));
    }
}
