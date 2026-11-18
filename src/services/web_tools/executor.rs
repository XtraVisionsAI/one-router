use std::collections::HashSet;
use std::convert::Infallible;
use std::pin::Pin;
use std::sync::Arc;

use axum::response::sse::Event;
use futures::stream::Stream;

use crate::schemas::anthropic::{
    ContentBlock, ErrorResponse, Message, MessageContent, MessageRequest, MessageResponse,
    ToolResultValue, Usage,
};
use crate::services::bedrock::BedrockService;
use crate::services::gemini::GeminiService;
use crate::services::ptc::sandbox::CodeExecutor;
use crate::services::web_tools::domains::DomainPolicy;
use crate::services::web_tools::search::SearchResult;

use super::{extract_server_calls, split_tools, ServerToolCall, WebToolError, WebToolKind};
use super::{
    fetch::{FetchProvider, ReqwestFetchProvider},
    search::SearchProvider,
};

/// A failed web-tool loop together with the usage of every backend call it
/// already made (those calls were billed upstream, so they must be billed here).
#[derive(Debug)]
pub struct WebToolRunError {
    pub error: WebToolError,
    pub usage: Usage,
}

impl std::fmt::Display for WebToolRunError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        self.error.fmt(f)
    }
}

/// Running usage total of a streamed web-tool loop, updated after every
/// backend call so the stream biller sees all iterations even when the loop
/// errors or the client disconnects mid-loop.
pub type UsageAccumulator = Arc<std::sync::Mutex<Usage>>;

/// `total += u` (input / output / cache tokens).
pub fn add_usage(total: &mut Usage, u: &Usage) {
    total.input_tokens = total.input_tokens.saturating_add(u.input_tokens);
    total.output_tokens = total.output_tokens.saturating_add(u.output_tokens);
    let sum = |a: Option<i32>, b: Option<i32>| match (a, b) {
        (None, None) => None,
        (a, b) => Some(a.unwrap_or(0).saturating_add(b.unwrap_or(0))),
    };
    total.cache_creation_input_tokens = sum(
        total.cache_creation_input_tokens,
        u.cache_creation_input_tokens,
    );
    total.cache_read_input_tokens = sum(total.cache_read_input_tokens, u.cache_read_input_tokens);
}

/// Trait abstracting the LLM backend call for the web tool agentic loop.
/// This allows the executor to work with any backend (Bedrock, Gemini, etc.)
#[async_trait::async_trait]
pub trait WebToolBackend: Send + Sync {
    async fn invoke(
        &self,
        request: &MessageRequest,
        model: &str,
    ) -> Result<MessageResponse, WebToolError>;
}

#[async_trait::async_trait]
impl WebToolBackend for BedrockService {
    async fn invoke(
        &self,
        request: &MessageRequest,
        model: &str,
    ) -> Result<MessageResponse, WebToolError> {
        self.invoke_model_messages(request, model, None)
            .await
            .map_err(bedrock_backend_error)
    }
}

/// Client-safe text for a Bedrock failure inside the web-tool loop.
///
/// Throttling / validation / model-not-found messages describe the request
/// and are shown as on the main Bedrock path (`ApiError::from_bedrock_error`).
/// AccessDenied names the host IAM role and account; everything else
/// (service, internal, (de)serialization, unmodeled SDK errors) may carry
/// endpoint, credential-provider or response details — both are logged in
/// full under an `error_ref` and replaced by an opaque message.
fn bedrock_backend_error(e: crate::services::bedrock::BedrockError) -> WebToolError {
    use crate::services::bedrock::BedrockError;
    match e {
        BedrockError::AccessDenied(msg) => {
            tracing::warn!(error = %msg, "Bedrock access denied (web tools)");
            WebToolError::BackendError(
                "Access denied by the upstream provider. Details are in the gateway logs."
                    .to_string(),
            )
        }
        BedrockError::Throttled(msg) => WebToolError::BackendError(format!("Throttled: {msg}")),
        BedrockError::ValidationError(msg) => {
            WebToolError::BackendError(format!("Validation error: {msg}"))
        }
        BedrockError::ModelNotFound(msg) => {
            WebToolError::BackendError(format!("Model not found: {msg}"))
        }
        other => {
            let id = uuid::Uuid::new_v4().simple().to_string();
            tracing::error!(error_ref = %id, error = %other, "Bedrock request failed (web tools)");
            WebToolError::BackendError(format!(
                "Upstream Bedrock request failed (error ref {id}; details in gateway logs)"
            ))
        }
    }
}

/// SSE `error` event built through the redacting [`ErrorResponse`]
/// constructor (keys, ARNs, account ids and URLs are stripped).
fn sse_error_event(error_type: &str, message: &str) -> Event {
    Event::default()
        .event("error")
        .data(ErrorResponse::new(error_type, message).to_json_string())
}

/// Effective domain policies for the two web tools, from the client's
/// server-tool definitions.
#[derive(Debug, Clone, Default)]
struct ToolPolicies {
    search: DomainPolicy,
    fetch: DomainPolicy,
}

impl ToolPolicies {
    fn from_server_tools(server_tools: &[serde_json::Value]) -> Self {
        let mut out = Self::default();
        for tool in server_tools {
            let name = tool["name"].as_str().unwrap_or("");
            let ty = tool["type"].as_str().unwrap_or("");
            if name == "web_search" || ty.starts_with("web_search_") {
                out.search = DomainPolicy::from_tool_definition(tool);
            } else if name == "web_fetch" || ty.starts_with("web_fetch_") {
                out.fetch = DomainPolicy::from_tool_definition(tool);
            }
        }
        out
    }
}

/// Upper bound on the model-supplied `max_results`.
const MAX_SEARCH_RESULTS: usize = 20;

/// Wrapper that allows GeminiService to be used as a WebToolBackend.
/// Performs Anthropic→Gemini→Anthropic conversion internally.
pub struct GeminiWebToolBackend {
    pub service: Arc<GeminiService>,
}

#[async_trait::async_trait]
impl WebToolBackend for GeminiWebToolBackend {
    async fn invoke(
        &self,
        request: &MessageRequest,
        _model: &str,
    ) -> Result<MessageResponse, WebToolError> {
        use crate::converters::{AnthropicToGeminiConverter, GeminiToAnthropicConverter};

        let converter = AnthropicToGeminiConverter::new();
        let (gemini_model, gemini_request) = converter
            .convert_request(request)
            .map_err(|e| WebToolError::ConversionError(e.to_string()))?;

        let gemini_response = self
            .service
            .generate_content(&gemini_model, &gemini_request)
            .await
            .map_err(|e| WebToolError::BackendError(e.to_string()))?;

        let response_converter = GeminiToAnthropicConverter::new();
        response_converter
            .convert_response(&gemini_response, &request.model)
            .map_err(|e| WebToolError::ConversionError(e.to_string()))
    }
}

#[derive(Clone)]
pub struct WebToolExecutor {
    pub search: Option<Arc<dyn SearchProvider>>,
    pub fetch: Arc<dyn FetchProvider>,
    pub code_executor: Option<Arc<dyn CodeExecutor>>,
    pub max_iterations: u32,
    pub max_fetch_kb: u64,
}

/// Tool name used for Dynamic Filtering code execution within the web tool loop.
const DYNAMIC_FILTER_TOOL_NAME: &str = "code_execution";

/// Versions that support Dynamic Filtering (code execution in the loop).
const DYNAMIC_FILTERING_VERSIONS: &[&str] = &["web_search_20260209", "web_fetch_20260209"];

impl WebToolExecutor {
    pub fn new(
        search: Option<Arc<dyn SearchProvider>>,
        max_fetch_kb: u64,
        max_iterations: u32,
    ) -> Self {
        Self {
            search,
            fetch: Arc::new(ReqwestFetchProvider::new(max_fetch_kb)),
            code_executor: None,
            max_iterations,
            max_fetch_kb,
        }
    }

    pub fn with_fetch(
        search: Option<Arc<dyn SearchProvider>>,
        fetch: Arc<dyn FetchProvider>,
        max_fetch_kb: u64,
        max_iterations: u32,
    ) -> Self {
        Self {
            search,
            fetch,
            code_executor: None,
            max_iterations,
            max_fetch_kb,
        }
    }

    pub fn with_code_executor(mut self, executor: Arc<dyn CodeExecutor>) -> Self {
        self.code_executor = Some(executor);
        self
    }

    /// Per-request copy with the code executor replaced (`None` = no
    /// Dynamic Filtering code execution: plain web-tool results). Used to
    /// apply the model's `ptc` capability and PTC slot accounting
    /// (`ptc::gated::for_request`).
    pub fn with_request_code_executor(
        self: &Arc<Self>,
        code_executor: Option<Arc<dyn CodeExecutor>>,
    ) -> Arc<Self> {
        let mut e = (**self).clone();
        e.code_executor = code_executor;
        Arc::new(e)
    }

    pub fn has_server_tools(request: &MessageRequest) -> bool {
        request
            .tools
            .as_deref()
            .map(|tools| tools.iter().any(super::is_server_tool))
            .unwrap_or(false)
    }

    pub async fn run(
        &self,
        request: &MessageRequest,
        backend: &dyn WebToolBackend,
        target_model: &str,
    ) -> Result<MessageResponse, WebToolError> {
        self.run_billed(request, backend, target_model)
            .await
            .map_err(|e| e.error)
    }

    /// [`Self::run`] with billing: the returned response's `usage` is the sum
    /// over all loop iterations, and an error carries the usage of the backend
    /// calls made before it failed.
    pub async fn run_billed(
        &self,
        request: &MessageRequest,
        backend: &dyn WebToolBackend,
        target_model: &str,
    ) -> Result<MessageResponse, WebToolRunError> {
        let mut total = Usage::new(0, 0);
        match self
            .run_inner(request, backend, target_model, &mut total)
            .await
        {
            Ok(mut response) => {
                response.usage = total;
                Ok(response)
            }
            Err(error) => Err(WebToolRunError {
                error,
                usage: total,
            }),
        }
    }

    async fn run_inner(
        &self,
        request: &MessageRequest,
        backend: &dyn WebToolBackend,
        target_model: &str,
        total: &mut Usage,
    ) -> Result<MessageResponse, WebToolError> {
        let tools = request.tools.as_deref().unwrap_or(&[]);

        // Reject unsupported server tool versions early
        for tool in tools {
            if let Some(version) = super::unsupported_server_tool_version(tool) {
                return Err(WebToolError::UnsupportedVersion(version.to_string()));
            }
        }

        let (server_tools, client_tools) = split_tools(tools);
        let policies = ToolPolicies::from_server_tools(&server_tools);

        // W7: warn if both web_search and web_fetch are present simultaneously
        let has_search = server_tools
            .iter()
            .any(|t| t["name"].as_str().unwrap_or("") == "web_search");
        let has_fetch = server_tools
            .iter()
            .any(|t| t["name"].as_str().unwrap_or("") == "web_fetch");
        if has_search && has_fetch {
            tracing::warn!(
                "Request contains both web_search and web_fetch server tools simultaneously"
            );
        }

        // Detect Dynamic Filtering: any server tool uses a 20260209 version
        let uses_dynamic_filtering = server_tools.iter().any(|t| {
            let version = t["type"].as_str().unwrap_or("");
            DYNAMIC_FILTERING_VERSIONS.contains(&version)
        });

        let server_names: HashSet<String> = server_tools
            .iter()
            .filter_map(|t| t["name"].as_str().map(|s| s.to_string()))
            .collect();

        // Convert server tools into standard tool definitions so the model knows
        // it can call them. The actual execution is intercepted by the executor.
        let model_server_tools = server_tools_to_model_definitions(&server_tools);

        let mut all_model_tools = model_server_tools;
        all_model_tools.extend(client_tools.clone());

        // Inject code_execution tool if Dynamic Filtering is active and executor is available
        if uses_dynamic_filtering && self.code_executor.is_some() {
            all_model_tools.push(code_execution_tool_definition());
        }

        let mut messages = request.messages.clone();
        let mut server_blocks: Vec<ContentBlock> = Vec::new();
        let mut all_search_results: Vec<SearchResult> = Vec::new();

        for iteration in 0..self.max_iterations {
            let mut modified = request.clone();
            modified.messages = messages.clone();
            modified.tools = if all_model_tools.is_empty() {
                None
            } else {
                Some(all_model_tools.clone())
            };
            modified.stream = false;

            // Clear tool_choice if it references a server tool we've stripped
            if let Some(ref tc) = modified.tool_choice {
                let points_to_server = match tc {
                    crate::schemas::anthropic::ToolChoice::Specific { name, .. } => {
                        server_names.contains(name)
                    }
                    crate::schemas::anthropic::ToolChoice::Object(obj) => obj
                        .get("name")
                        .and_then(|v| v.as_str())
                        .map(|n| server_names.contains(n))
                        .unwrap_or(false),
                    _ => false,
                };
                if points_to_server {
                    modified.tool_choice = None;
                }
            }

            let response = backend.invoke(&modified, target_model).await?;
            add_usage(total, &response.usage);

            let server_calls = extract_server_calls(&response.content, &server_names);

            // Also extract code_execution calls if Dynamic Filtering is active
            let code_calls: Vec<(String, String)> = if uses_dynamic_filtering {
                response
                    .content
                    .iter()
                    .filter_map(|block| {
                        if let ContentBlock::ToolUse {
                            id, name, input, ..
                        } = block
                        {
                            if name == DYNAMIC_FILTER_TOOL_NAME {
                                let code = input.get("code").and_then(|c| c.as_str()).unwrap_or("");
                                return Some((id.clone(), code.to_string()));
                            }
                        }
                        None
                    })
                    .collect()
            } else {
                Vec::new()
            };

            if server_calls.is_empty() && code_calls.is_empty() {
                let mut final_content = server_blocks;
                final_content.extend(response.content);
                // Post-process citations if we have search results
                if !all_search_results.is_empty() {
                    post_process_citations(&mut final_content, &all_search_results);
                }
                return Ok(MessageResponse {
                    content: final_content,
                    ..response
                });
            }

            tracing::debug!(
                iteration,
                server_call_count = server_calls.len(),
                code_call_count = code_calls.len(),
                "Executing web tool calls"
            );

            let mut tool_result_blocks: Vec<ContentBlock> = Vec::new();

            // Execute server tool calls (web_search, web_fetch)
            for call in &server_calls {
                server_blocks.push(ContentBlock::ToolUse {
                    id: call.id.clone(),
                    name: call.name.clone(),
                    input: call.input.clone(),
                    caller: None,
                });

                let (result_text, search_results) =
                    self.execute_call_with_results(call, &policies).await?;
                all_search_results.extend(search_results);

                server_blocks.push(ContentBlock::ToolResult {
                    tool_use_id: call.id.clone(),
                    content: ToolResultValue::Text(result_text.clone()),
                    is_error: None,
                    cache_control: None,
                });

                tool_result_blocks.push(ContentBlock::ToolResult {
                    tool_use_id: call.id.clone(),
                    content: ToolResultValue::Text(result_text),
                    is_error: None,
                    cache_control: None,
                });
            }

            // Execute code_execution calls (Dynamic Filtering)
            for (tool_id, code) in &code_calls {
                let result_text = if let Some(ref executor) = self.code_executor {
                    match executor.execute(code, "python").await {
                        Ok(result) => {
                            if result.exit_code == 0 {
                                result.stdout
                            } else {
                                format!(
                                    "Error (exit code {}):\n{}{}",
                                    result.exit_code, result.stderr, result.stdout
                                )
                            }
                        }
                        Err(e) => format!("Execution error: {e}"),
                    }
                } else {
                    "Code execution not available".to_string()
                };

                server_blocks.push(ContentBlock::ToolUse {
                    id: tool_id.clone(),
                    name: DYNAMIC_FILTER_TOOL_NAME.to_string(),
                    input: serde_json::json!({"code": code}),
                    caller: None,
                });
                server_blocks.push(ContentBlock::ToolResult {
                    tool_use_id: tool_id.clone(),
                    content: ToolResultValue::Text(result_text.clone()),
                    is_error: None,
                    cache_control: None,
                });
                tool_result_blocks.push(ContentBlock::ToolResult {
                    tool_use_id: tool_id.clone(),
                    content: ToolResultValue::Text(result_text),
                    is_error: None,
                    cache_control: None,
                });
            }

            messages.push(Message {
                extra: Default::default(),
                role: "assistant".into(),
                content: MessageContent::Blocks(response.content),
            });
            messages.push(Message {
                extra: Default::default(),
                role: "user".into(),
                content: MessageContent::Blocks(tool_result_blocks),
            });
        }

        Err(WebToolError::MaxIterationsExceeded(self.max_iterations))
    }

    /// Streaming variant of `run()`. Yields SSE events as the agentic loop progresses.
    /// Each iteration emits content blocks incrementally so the client gets feedback
    /// rather than waiting for the entire multi-turn loop to complete.
    pub fn run_stream(
        self: Arc<Self>,
        request: MessageRequest,
        backend: Arc<dyn WebToolBackend>,
        target_model: String,
    ) -> Pin<Box<dyn Stream<Item = Result<Event, Infallible>> + Send>> {
        self.run_stream_metered(request, backend, target_model, None)
    }

    /// [`Self::run_stream`] that keeps `usage` updated with the running total
    /// of every backend call, so a loop that errors or is abandoned mid-way is
    /// still billed for all completed iterations.
    pub fn run_stream_metered(
        self: Arc<Self>,
        request: MessageRequest,
        backend: Arc<dyn WebToolBackend>,
        target_model: String,
        usage: Option<UsageAccumulator>,
    ) -> Pin<Box<dyn Stream<Item = Result<Event, Infallible>> + Send>> {
        Box::pin(async_stream::stream! {
            let tools = request.tools.as_deref().unwrap_or(&[]);

            // Reject unsupported versions
            for tool in tools {
                if let Some(version) = super::unsupported_server_tool_version(tool) {
                    yield Ok(sse_error_event(
                        "invalid_request_error",
                        &format!("{version} is not supported by this proxy"),
                    ));
                    return;
                }
            }

            let (server_tools, client_tools) = split_tools(tools);
            let policies = ToolPolicies::from_server_tools(&server_tools);

            let server_names: HashSet<String> = server_tools
                .iter()
                .filter_map(|t| t["name"].as_str().map(|s| s.to_string()))
                .collect();

            let model_server_tools = server_tools_to_model_definitions(&server_tools);
            let mut all_model_tools = model_server_tools;
            all_model_tools.extend(client_tools.clone());

            let mut messages = request.messages.clone();

            let message_id = format!("msg_{}", uuid::Uuid::new_v4());
            let model_name = request.model.clone();

            // Emit message_start
            yield Ok(Event::default().event("message_start").data(
                serde_json::json!({
                    "type": "message_start",
                    "message": {
                        "id": &message_id,
                        "type": "message",
                        "role": "assistant",
                        "content": [],
                        "model": &model_name,
                        "stop_reason": null,
                        "stop_sequence": null,
                        "usage": {"input_tokens": 0, "output_tokens": 0}
                    }
                }).to_string()
            ));
            yield Ok(Event::default().event("ping").data(r#"{"type":"ping"}"#));

            let mut block_index: usize = 0;
            let mut total_input_tokens: i32 = 0;
            let mut total_output_tokens: i32 = 0;

            for _iteration in 0..self.max_iterations {
                let mut modified = request.clone();
                modified.messages = messages.clone();
                modified.tools = if all_model_tools.is_empty() {
                    None
                } else {
                    Some(all_model_tools.clone())
                };
                modified.stream = false;

                if let Some(ref tc) = modified.tool_choice {
                    let points_to_server = match tc {
                        crate::schemas::anthropic::ToolChoice::Specific { name, .. } => {
                            server_names.contains(name)
                        }
                        crate::schemas::anthropic::ToolChoice::Object(obj) => obj
                            .get("name")
                            .and_then(|v| v.as_str())
                            .map(|n| server_names.contains(n))
                            .unwrap_or(false),
                        _ => false,
                    };
                    if points_to_server {
                        modified.tool_choice = None;
                    }
                }

                let response = match backend.invoke(&modified, &target_model).await {
                    Ok(r) => r,
                    Err(e) => {
                        yield Ok(sse_error_event("api_error", &e.to_string()));
                        return;
                    }
                };

                total_input_tokens += response.usage.input_tokens;
                total_output_tokens += response.usage.output_tokens;
                if let Some(acc) = &usage {
                    if let Ok(mut t) = acc.lock() {
                        add_usage(&mut t, &response.usage);
                    }
                }

                let server_calls = extract_server_calls(&response.content, &server_names);

                if server_calls.is_empty() {
                    // Final response — emit all content blocks
                    for block in &response.content {
                        let events = content_block_to_events(block, block_index);
                        for ev in events {
                            yield Ok(ev);
                        }
                        block_index += 1;
                    }
                    break;
                }

                // Emit server tool calls as content blocks (so client sees progress)
                let mut tool_result_blocks: Vec<ContentBlock> = Vec::new();
                for call in &server_calls {
                    // Emit tool_use block for visibility
                    let tool_block = ContentBlock::ToolUse {
                        id: call.id.clone(),
                        name: call.name.clone(),
                        input: call.input.clone(),
                        caller: None,
                    };
                    let events = content_block_to_events(&tool_block, block_index);
                    for ev in events {
                        yield Ok(ev);
                    }
                    block_index += 1;

                    let result_text = match self.execute_call(call, &policies).await {
                        Ok(text) => text,
                        Err(e) => {
                            yield Ok(sse_error_event("api_error", &e.to_string()));
                            return;
                        }
                    };

                    tool_result_blocks.push(ContentBlock::ToolResult {
                        tool_use_id: call.id.clone(),
                        content: ToolResultValue::Text(result_text),
                        is_error: None,
                        cache_control: None,
                    });
                }

                messages.push(Message {
                    extra: Default::default(),
                    role: "assistant".into(),
                    content: MessageContent::Blocks(response.content),
                });
                messages.push(Message {
                    extra: Default::default(),
                    role: "user".into(),
                    content: MessageContent::Blocks(tool_result_blocks),
                });
            }

            // message_delta + message_stop
            yield Ok(Event::default().event("message_delta").data(
                serde_json::json!({
                    "type": "message_delta",
                    "delta": {"stop_reason": "end_turn", "stop_sequence": null},
                    "usage": {"output_tokens": total_output_tokens, "input_tokens": total_input_tokens}
                }).to_string()
            ));
            yield Ok(Event::default().event("message_stop").data(
                r#"{"type":"message_stop"}"#
            ));
        })
    }

    async fn execute_call(
        &self,
        call: &ServerToolCall,
        policies: &ToolPolicies,
    ) -> Result<String, WebToolError> {
        let (text, _) = self.execute_call_with_results(call, policies).await?;
        Ok(text)
    }

    /// Execute a server tool call, returning the result text and any search results.
    ///
    /// Domain restrictions come from the client's tool definition
    /// (`policies`); the model's `allowed_domains` / `blocked_domains` input
    /// can only narrow them. They are enforced here on every search result
    /// and fetch URL, independent of what the provider does with the hints.
    async fn execute_call_with_results(
        &self,
        call: &ServerToolCall,
        policies: &ToolPolicies,
    ) -> Result<(String, Vec<SearchResult>), WebToolError> {
        match call.kind {
            WebToolKind::Search => {
                let searcher = self
                    .search
                    .as_ref()
                    .ok_or(WebToolError::SearchNotConfigured)?;
                let policy = policies.search.narrowed_by(&call.input);
                let allowed = policy.allowed_hint();
                if allowed.as_ref().is_some_and(|a| a.is_empty()) {
                    // The model's allowlist is disjoint from the client's.
                    return Ok((
                        "No results: the requested domains are outside the allowed domains."
                            .to_string(),
                        Vec::new(),
                    ));
                }
                let blocked = policy.blocked().to_vec();
                let query = call.input["query"].as_str().unwrap_or("");
                let max_results = (call.input["max_results"].as_u64().unwrap_or(5) as usize)
                    .clamp(1, MAX_SEARCH_RESULTS);
                let mut results = searcher
                    .search(
                        query,
                        allowed.as_deref(),
                        (!blocked.is_empty()).then_some(blocked.as_slice()),
                        max_results,
                    )
                    .await?;
                if !policy.is_unrestricted() {
                    results.retain(|r| policy.permits(&r.url));
                }
                let text = results
                    .iter()
                    .enumerate()
                    .map(|(i, r)| format!("[{}] {}\n{}\n{}", i + 1, r.title, r.url, r.snippet))
                    .collect::<Vec<_>>()
                    .join("\n\n");
                Ok((text, results))
            }
            WebToolKind::Fetch => {
                let url = call.input["url"].as_str().unwrap_or("");
                let policy = policies.fetch.narrowed_by(&call.input);
                // Refused URLs are reported to the model as a tool error
                // (like Anthropic's `url_not_allowed`) instead of failing the
                // whole request. Redirect hops are re-checked by the provider.
                if let Err(reason) = policy.check_url(url) {
                    return Ok((format!("Error: URL not allowed ({reason})"), Vec::new()));
                }
                let result = self.fetch.fetch(url, &policy, self.max_fetch_kb).await?;
                Ok((result.content, Vec::new()))
            }
        }
    }
}

/// Convert server tool definitions (e.g. `{"type": "web_search_20250305", "name": "web_search"}`)
/// into standard tool definitions with input_schema that the model can call.
fn server_tools_to_model_definitions(server_tools: &[serde_json::Value]) -> Vec<serde_json::Value> {
    use serde_json::json;

    server_tools
        .iter()
        .filter_map(|tool| {
            let name = tool["name"].as_str()?;
            if name == "web_search" || name.starts_with("web_search_") {
                Some(json!({
                    "name": "web_search",
                    "description": "Search the web for information. Returns search results with titles, URLs, and snippets.",
                    "input_schema": {
                        "type": "object",
                        "properties": {
                            "query": {
                                "type": "string",
                                "description": "The search query"
                            },
                            "max_results": {
                                "type": "integer",
                                "description": "Maximum number of results to return (default 5)"
                            },
                            "allowed_domains": {
                                "type": "array",
                                "items": {"type": "string"},
                                "description": "Only include results from these domains (can only narrow the domains the caller allows)"
                            },
                            "blocked_domains": {
                                "type": "array",
                                "items": {"type": "string"},
                                "description": "Additionally exclude results from these domains"
                            }
                        },
                        "required": ["query"]
                    }
                }))
            } else if name == "web_fetch" || name.starts_with("web_fetch_") {
                Some(json!({
                    "name": "web_fetch",
                    "description": "Fetch the content of a web page at the given URL.",
                    "input_schema": {
                        "type": "object",
                        "properties": {
                            "url": {
                                "type": "string",
                                "description": "The URL to fetch"
                            },
                            "allowed_domains": {
                                "type": "array",
                                "items": {"type": "string"},
                                "description": "Only allow fetching from these domains (can only narrow the domains the caller allows)"
                            },
                            "blocked_domains": {
                                "type": "array",
                                "items": {"type": "string"},
                                "description": "Additionally block fetching from these domains"
                            }
                        },
                        "required": ["url"]
                    }
                }))
            } else {
                None
            }
        })
        .collect()
}

/// Tool definition for code_execution injected in Dynamic Filtering mode.
fn code_execution_tool_definition() -> serde_json::Value {
    serde_json::json!({
        "name": DYNAMIC_FILTER_TOOL_NAME,
        "description": "Execute Python code to process, filter, or transform search results. Use this to extract structured data, parse JSON, filter results, or perform calculations on fetched content.",
        "input_schema": {
            "type": "object",
            "properties": {
                "code": {
                    "type": "string",
                    "description": "Python code to execute. Print output to stdout."
                }
            },
            "required": ["code"]
        }
    })
}

/// Convert a single content block into SSE events (start + delta + stop).
fn content_block_to_events(block: &ContentBlock, index: usize) -> Vec<Event> {
    let mut events = Vec::new();

    let (block_start_json, delta_data) = match block {
        ContentBlock::Text { text, .. } => (
            serde_json::json!({"type": "text", "text": ""}),
            serde_json::json!({
                "type": "content_block_delta",
                "index": index,
                "delta": {"type": "text_delta", "text": text}
            }),
        ),
        ContentBlock::ToolUse {
            id, name, input, ..
        } => (
            serde_json::json!({"type": "tool_use", "id": id, "name": name, "input": {}}),
            serde_json::json!({
                "type": "content_block_delta",
                "index": index,
                "delta": {
                    "type": "input_json_delta",
                    "partial_json": serde_json::to_string(input).unwrap_or_default()
                }
            }),
        ),
        ContentBlock::Thinking {
            thinking,
            signature,
        } => (
            serde_json::json!({"type": "thinking", "thinking": ""}),
            serde_json::json!({
                "type": "content_block_delta",
                "index": index,
                "delta": {
                    "type": "thinking_delta",
                    "thinking": thinking,
                    "signature": signature
                }
            }),
        ),
        _ => return events,
    };

    events.push(
        Event::default().event("content_block_start").data(
            serde_json::json!({
                "type": "content_block_start",
                "index": index,
                "content_block": block_start_json
            })
            .to_string(),
        ),
    );
    events.push(
        Event::default()
            .event("content_block_delta")
            .data(delta_data.to_string()),
    );
    events.push(
        Event::default()
            .event("content_block_stop")
            .data(serde_json::json!({"type": "content_block_stop", "index": index}).to_string()),
    );

    events
}

/// Post-process text content blocks to append citation metadata.
///
/// Scans text blocks for `[N]` reference markers and appends a citations
/// summary block at the end with URLs and titles for each referenced source.
fn post_process_citations(content: &mut Vec<ContentBlock>, search_results: &[SearchResult]) {
    if search_results.is_empty() {
        return;
    }

    // Collect all [N] references from text blocks
    let mut referenced_indices: Vec<usize> = Vec::new();

    for block in content.iter() {
        if let ContentBlock::Text { text, .. } = block {
            extract_bracket_refs(text, search_results.len(), &mut referenced_indices);
        }
    }

    if referenced_indices.is_empty() {
        return;
    }

    referenced_indices.sort();
    referenced_indices.dedup();

    // Build citations summary as a structured text block
    let citations_text = referenced_indices
        .iter()
        .filter_map(|&idx| {
            search_results
                .get(idx - 1)
                .map(|r| format!("[{}] {} - {}", idx, r.title, r.url))
        })
        .collect::<Vec<_>>()
        .join("\n");

    content.push(ContentBlock::Text {
        text: format!("\n\n---\nSources:\n{citations_text}"),
        cache_control: None,
    });
}

/// Extract [N] bracket references from text.
fn extract_bracket_refs(text: &str, max_index: usize, out: &mut Vec<usize>) {
    let bytes = text.as_bytes();
    let mut i = 0;
    while i < bytes.len() {
        if bytes[i] == b'[' {
            i += 1;
            let start = i;
            while i < bytes.len() && bytes[i].is_ascii_digit() {
                i += 1;
            }
            if i < bytes.len() && bytes[i] == b']' && i > start {
                if let Ok(n) = text[start..i].parse::<usize>() {
                    if n > 0 && n <= max_index {
                        out.push(n);
                    }
                }
            }
        } else {
            i += 1;
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_has_server_tools_true() {
        let mut req = MessageRequest::new("m", vec![], 100);
        req.tools = Some(vec![
            serde_json::json!({"type": "web_search_20250305", "name": "web_search"}),
        ]);
        assert!(WebToolExecutor::has_server_tools(&req));
    }
    #[test]
    fn test_has_server_tools_false() {
        let mut req = MessageRequest::new("m", vec![], 100);
        req.tools = Some(vec![serde_json::json!({"name": "calculator"})]);
        assert!(!WebToolExecutor::has_server_tools(&req));
    }
    #[test]
    fn test_has_server_tools_none() {
        let req = MessageRequest::new("m", vec![], 100);
        assert!(!WebToolExecutor::has_server_tools(&req));
    }

    #[test]
    fn test_extract_bracket_refs() {
        let mut refs = Vec::new();
        extract_bracket_refs(
            "According to [1] and [3], the answer is clear.",
            5,
            &mut refs,
        );
        assert_eq!(refs, vec![1, 3]);
    }

    #[test]
    fn test_extract_bracket_refs_out_of_range() {
        let mut refs = Vec::new();
        extract_bracket_refs("See [0] and [10] for details.", 5, &mut refs);
        assert!(refs.is_empty());
    }

    #[test]
    fn test_post_process_citations() {
        let results = vec![
            SearchResult {
                title: "Rust Lang".to_string(),
                url: "https://rust-lang.org".to_string(),
                snippet: "Systems language".to_string(),
            },
            SearchResult {
                title: "Tokio".to_string(),
                url: "https://tokio.rs".to_string(),
                snippet: "Async runtime".to_string(),
            },
        ];
        let mut content = vec![ContentBlock::Text {
            text: "Rust [1] is great for async [2] programming.".to_string(),
            cache_control: None,
        }];
        post_process_citations(&mut content, &results);
        assert_eq!(content.len(), 2);
        if let ContentBlock::Text { text, .. } = &content[1] {
            assert!(text.contains("Rust Lang"));
            assert!(text.contains("https://tokio.rs"));
        } else {
            panic!("Expected text block");
        }
    }

    #[test]
    fn test_post_process_citations_no_refs() {
        let results = vec![SearchResult {
            title: "Test".to_string(),
            url: "https://test.com".to_string(),
            snippet: "Snippet".to_string(),
        }];
        let mut content = vec![ContentBlock::Text {
            text: "No references here.".to_string(),
            cache_control: None,
        }];
        post_process_citations(&mut content, &results);
        assert_eq!(content.len(), 1); // No citation block added
    }

    // ---- domain enforcement / error redaction ---------------------------

    use crate::schemas::anthropic::Usage;
    use crate::services::web_tools::fetch::FetchResult;
    use std::sync::Mutex;

    /// Returns a tool_use for `tool` with `input` on the first call, then text.
    struct ScriptedBackend {
        tool: &'static str,
        input: serde_json::Value,
        calls: Mutex<Vec<MessageRequest>>,
    }

    #[async_trait::async_trait]
    impl WebToolBackend for ScriptedBackend {
        async fn invoke(
            &self,
            request: &MessageRequest,
            _model: &str,
        ) -> Result<MessageResponse, WebToolError> {
            let mut calls = self.calls.lock().unwrap();
            calls.push(request.clone());
            let content = if calls.len() == 1 {
                vec![ContentBlock::ToolUse {
                    id: "toolu_1".into(),
                    name: self.tool.into(),
                    input: self.input.clone(),
                    caller: None,
                }]
            } else {
                vec![ContentBlock::Text {
                    text: "done".into(),
                    cache_control: None,
                }]
            };
            Ok(MessageResponse::new("msg", "m", content, Usage::new(1, 1)))
        }
    }

    struct FailingBackend;

    #[async_trait::async_trait]
    impl WebToolBackend for FailingBackend {
        async fn invoke(
            &self,
            _request: &MessageRequest,
            _model: &str,
        ) -> Result<MessageResponse, WebToolError> {
            Err(WebToolError::BackendError(
                "User: arn:aws:sts::123456789012:assumed-role/GatewayRole/i-0abc is not authorized"
                    .into(),
            ))
        }
    }

    type HintPair = (Option<Vec<String>>, Option<Vec<String>>);

    #[derive(Default)]
    struct RecordingSearch {
        hints: Mutex<Vec<HintPair>>,
    }

    #[async_trait::async_trait]
    impl SearchProvider for RecordingSearch {
        async fn search(
            &self,
            _query: &str,
            allowed: Option<&[String]>,
            blocked: Option<&[String]>,
            _max_results: usize,
        ) -> Result<Vec<SearchResult>, WebToolError> {
            self.hints
                .lock()
                .unwrap()
                .push((allowed.map(<[_]>::to_vec), blocked.map(<[_]>::to_vec)));
            // A provider that ignores the hints entirely.
            Ok([
                "https://good.com/a",
                "https://evil.com?.good.com",
                "https://docs.good.com/b",
            ]
            .iter()
            .map(|u| SearchResult {
                title: "t".into(),
                url: u.to_string(),
                snippet: "s".into(),
            })
            .collect())
        }
    }

    #[derive(Default)]
    struct RecordingFetch {
        urls: Mutex<Vec<String>>,
    }

    #[async_trait::async_trait]
    impl FetchProvider for RecordingFetch {
        async fn fetch(
            &self,
            url: &str,
            _policy: &DomainPolicy,
            _max_content_kb: u64,
        ) -> Result<FetchResult, WebToolError> {
            self.urls.lock().unwrap().push(url.to_string());
            Ok(FetchResult {
                url: url.into(),
                content: "page body".into(),
                content_type: "text/plain".into(),
                status_code: 200,
            })
        }
    }

    fn tool_result_text(resp: &MessageResponse) -> String {
        resp.content
            .iter()
            .find_map(|b| match b {
                ContentBlock::ToolResult {
                    content: ToolResultValue::Text(t),
                    ..
                } => Some(t.clone()),
                _ => None,
            })
            .expect("tool result")
    }

    fn request_with(tool: serde_json::Value) -> MessageRequest {
        let mut req = MessageRequest::new("m", vec![], 100);
        req.tools = Some(vec![tool]);
        req
    }

    #[tokio::test]
    async fn client_search_domains_are_enforced_and_model_cannot_widen() {
        let search = Arc::new(RecordingSearch::default());
        let exec = WebToolExecutor::with_fetch(
            Some(search.clone()),
            Arc::new(RecordingFetch::default()),
            64,
            4,
        );
        let backend = ScriptedBackend {
            tool: "web_search",
            // The model tries to widen to evil.com and drop the blocklist.
            input: serde_json::json!({"query": "q", "allowed_domains": ["good.com", "evil.com"], "blocked_domains": []}),
            calls: Mutex::new(Vec::new()),
        };
        let req = request_with(serde_json::json!({
            "type": "web_search_20250305", "name": "web_search",
            "allowed_domains": ["good.com"], "blocked_domains": ["docs.good.com"]
        }));
        let resp = exec.run(&req, &backend, "m").await.unwrap();
        let text = tool_result_text(&resp);
        assert!(text.contains("https://good.com/a"), "{text}");
        assert!(!text.contains("evil.com"), "{text}");
        assert!(!text.contains("docs.good.com"), "{text}");
        let hints = search.hints.lock().unwrap();
        assert_eq!(hints[0].0, Some(vec!["good.com".to_string()]));
        assert_eq!(hints[0].1, Some(vec!["docs.good.com".to_string()]));
    }

    #[tokio::test]
    async fn client_fetch_domains_are_enforced() {
        let fetch = Arc::new(RecordingFetch::default());
        let exec = WebToolExecutor::with_fetch(None, fetch.clone(), 64, 4);
        let tool = serde_json::json!({
            "type": "web_fetch_20250910", "name": "web_fetch",
            "allowed_domains": ["good.com"]
        });
        for (url, model_allowed) in [
            ("https://evil.com/x", serde_json::json!(["evil.com"])),
            ("https://evil.com?.good.com", serde_json::json!(null)),
            ("https://good.com@evil.com/", serde_json::json!(null)),
        ] {
            let backend = ScriptedBackend {
                tool: "web_fetch",
                input: serde_json::json!({"url": url, "allowed_domains": model_allowed}),
                calls: Mutex::new(Vec::new()),
            };
            let resp = exec
                .run(&request_with(tool.clone()), &backend, "m")
                .await
                .unwrap();
            assert!(tool_result_text(&resp).contains("URL not allowed"), "{url}");
        }
        assert!(fetch.urls.lock().unwrap().is_empty(), "nothing fetched");

        let backend = ScriptedBackend {
            tool: "web_fetch",
            input: serde_json::json!({"url": "https://docs.good.com/page"}),
            calls: Mutex::new(Vec::new()),
        };
        let resp = exec.run(&request_with(tool), &backend, "m").await.unwrap();
        assert_eq!(tool_result_text(&resp), "page body");
        assert_eq!(
            *fetch.urls.lock().unwrap(),
            vec!["https://docs.good.com/page"]
        );
    }

    #[tokio::test]
    async fn stream_error_frames_are_redacted() {
        use futures::StreamExt;
        let exec = Arc::new(WebToolExecutor::with_fetch(
            None,
            Arc::new(RecordingFetch::default()),
            64,
            2,
        ));
        let req =
            request_with(serde_json::json!({"type": "web_search_20250305", "name": "web_search"}));
        let events: Vec<String> = exec
            .run_stream(req, Arc::new(FailingBackend), "m".into())
            .map(|e| format!("{:?}", e.unwrap()))
            .collect()
            .await;
        let err = events
            .iter()
            .find(|e| e.contains("api_error"))
            .expect("error frame");
        assert!(!err.contains("123456789012"), "{err}");
        assert!(!err.contains("GatewayRole"), "{err}");
    }

    #[test]
    fn bedrock_access_denied_is_generic() {
        let e = bedrock_backend_error(crate::services::bedrock::BedrockError::AccessDenied(
            "arn:aws:iam::123456789012:role/Secret is not authorized".into(),
        ));
        let s = e.to_string();
        assert!(!s.contains("123456789012") && !s.contains("Secret"), "{s}");
        assert!(s.contains("Access denied by the upstream provider"), "{s}");
    }

    /// Always calls `web_search` — the loop never finishes.
    struct LoopingBackend;

    #[async_trait::async_trait]
    impl WebToolBackend for LoopingBackend {
        async fn invoke(
            &self,
            _request: &MessageRequest,
            _model: &str,
        ) -> Result<MessageResponse, WebToolError> {
            let content = vec![ContentBlock::ToolUse {
                id: "toolu_x".into(),
                name: "web_search".into(),
                input: serde_json::json!({"query": "q"}),
                caller: None,
            }];
            let mut usage = Usage::new(100, 10);
            usage.cache_read_input_tokens = Some(5);
            Ok(MessageResponse::new("msg", "m", content, usage))
        }
    }

    fn search_exec(max_iterations: u32) -> WebToolExecutor {
        WebToolExecutor::with_fetch(
            Some(Arc::new(RecordingSearch::default())),
            Arc::new(RecordingFetch::default()),
            64,
            max_iterations,
        )
    }

    #[tokio::test]
    async fn failed_loop_carries_usage_of_all_iterations() {
        let exec = search_exec(3);
        let req =
            request_with(serde_json::json!({"type": "web_search_20250305", "name": "web_search"}));
        let err = exec
            .run_billed(&req, &LoopingBackend, "m")
            .await
            .unwrap_err();
        assert!(matches!(err.error, WebToolError::MaxIterationsExceeded(3)));
        assert_eq!(err.usage.input_tokens, 300);
        assert_eq!(err.usage.output_tokens, 30);
        assert_eq!(err.usage.cache_read_input_tokens, Some(15));
    }

    #[tokio::test]
    async fn successful_loop_sums_usage_over_iterations() {
        let exec = search_exec(4);
        let req =
            request_with(serde_json::json!({"type": "web_search_20250305", "name": "web_search"}));
        let backend = ScriptedBackend {
            tool: "web_search",
            input: serde_json::json!({"query": "q"}),
            calls: Mutex::new(Vec::new()),
        };
        let resp = exec.run_billed(&req, &backend, "m").await.unwrap();
        // Two backend calls at (1, 1) each.
        assert_eq!((resp.usage.input_tokens, resp.usage.output_tokens), (2, 2));
    }

    #[tokio::test]
    async fn stream_accumulator_sees_iterations_before_error() {
        use futures::StreamExt;
        let exec = Arc::new(search_exec(2));
        let req =
            request_with(serde_json::json!({"type": "web_search_20250305", "name": "web_search"}));
        let acc: UsageAccumulator = Arc::new(std::sync::Mutex::new(Usage::new(0, 0)));
        let _: Vec<_> = exec
            .run_stream_metered(req, Arc::new(LoopingBackend), "m".into(), Some(acc.clone()))
            .collect()
            .await;
        let u = acc.lock().unwrap().clone();
        assert_eq!((u.input_tokens, u.output_tokens), (200, 20));
        assert_eq!(u.cache_read_input_tokens, Some(10));
    }

    #[test]
    fn other_bedrock_errors_are_opaque_with_error_ref() {
        use crate::services::bedrock::BedrockError;
        for e in [
            BedrockError::InternalError("dispatch failure: profile 'prod-admin' via sso".into()),
            BedrockError::Unknown("https://bedrock-runtime.us-east-1.amazonaws.com x".into()),
            BedrockError::Deserialization("raw body {..}".into()),
            BedrockError::ServiceUnavailable("endpoint 10.0.0.7".into()),
        ] {
            let s = bedrock_backend_error(e).to_string();
            assert!(s.contains("error ref "), "{s}");
            for leak in ["prod-admin", "amazonaws", "raw body", "10.0.0.7"] {
                assert!(!s.contains(leak), "{s}");
            }
        }
        let s = bedrock_backend_error(BedrockError::ValidationError("max_tokens too big".into()))
            .to_string();
        assert!(s.contains("max_tokens too big"), "{s}");
    }
}
