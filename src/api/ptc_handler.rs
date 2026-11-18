//! PTC (Programmatic Tool Calling) handler
//!
//! Orchestrates the PTC flow for `/v1/messages`:
//! 1. Detect PTC request → modify tools → call Claude
//! 2. Claude returns `execute_code` → send code to sandbox via persistent channel
//! 3. Sandbox calls tool → return `tool_use` to client (with container ID)
//! 4. Client sends back `tool_result` → inject into sandbox → resume
//! 5. Sandbox completes → finalize with Claude using saved execution state
//!
//! Every Bedrock call's usage is accumulated into the caller-provided
//! `Usage` (recorded by `messages.rs` even when the flow fails later). The
//! session (and its container) is removed whenever a turn does not end in
//! sandbox tool calls for the client — final answers and errors alike.

use crate::api::messages::ApiError;
use crate::middleware::auth::ApiKeyInfo;
use crate::schemas::anthropic::{
    CallerInfo, ContainerResponse, ContentBlock, Message, MessageContent, MessageRequest,
    MessageResponse, StopReason, ToolResultValue, Usage,
};
use crate::server::state::AppState;
use crate::services::ptc::sandbox::ContainerMessage;
use crate::services::ptc::service::PtcExecutionState;
use crate::services::ptc::PtcService;
use std::sync::Arc;

/// Internal execute_code tool definition sent to Claude.
const EXECUTE_CODE_TOOL: &str = r#"{
    "name": "execute_code",
    "description": "Execute Python code. You can use available tools via call_tool('tool_name', key=value). Use this to fulfill the user's request.",
    "input_schema": {
        "type": "object",
        "properties": {
            "code": {
                "type": "string",
                "description": "Python code to execute"
            }
        },
        "required": ["code"]
    }
}"#;

// ============================================================================
// PtcError → ApiError conversion
// ============================================================================

impl From<crate::services::ptc::PtcError> for ApiError {
    fn from(err: crate::services::ptc::PtcError) -> Self {
        use crate::services::ptc::PtcError;
        match &err {
            PtcError::DockerNotAvailable(_)
            | PtcError::AttachFailed(_)
            | PtcError::RunnerNotReady(_) => ApiError::service_unavailable(err.to_string()),

            PtcError::SessionNotFound(_) | PtcError::ExecutionStateNotFound(_) => {
                ApiError::bad_request(err.to_string())
            }

            PtcError::SessionExpired(_) => ApiError {
                status: axum::http::StatusCode::GONE,
                error_type: "invalid_request_error".to_string(),
                message: err.to_string(),
            },

            PtcError::InvalidToolResult(_) => ApiError::bad_request(err.to_string()),

            PtcError::MaxIterationsExceeded(_) | PtcError::SessionLimitExceeded(_) => {
                ApiError::rate_limited(err.to_string())
            }

            PtcError::InvalidRequest(_) | PtcError::InvalidToolCall(_) => {
                ApiError::bad_request(err.to_string())
            }

            PtcError::PermissionDenied(_) => ApiError {
                status: axum::http::StatusCode::FORBIDDEN,
                error_type: "permission_error".to_string(),
                message: err.to_string(),
            },

            PtcError::ExecutionTimeout(_) => ApiError {
                status: axum::http::StatusCode::GATEWAY_TIMEOUT,
                error_type: "timeout_error".to_string(),
                message: err.to_string(),
            },

            _ => ApiError::internal_error(err.to_string()),
        }
    }
}

// ============================================================================
// Public API
// ============================================================================

/// Handle a new PTC request (first turn — no container ID).
pub async fn handle_ptc_request(
    state: &AppState,
    request: &MessageRequest,
    target_model_id: &str,
    request_id: &str,
    key_info: &ApiKeyInfo,
    usage: &mut Usage,
) -> Result<MessageResponse, ApiError> {
    // PTC drives the loop through Claude InvokeModel — non-Claude Bedrock
    // models (Nova, GPT, …) cannot serve it.
    if !crate::services::BedrockService::is_claude_model(target_model_id) {
        return Err(ApiError::bad_request(format!(
            "Programmatic Tool Calling is only supported for Claude models; '{}' resolves to '{target_model_id}'",
            request.model
        )));
    }

    let ptc = get_ptc_service(state)?;

    // 1. Create session with callable tool names
    let callable_tools = ptc.get_callable_tools(request);
    let tool_names: Vec<String> = callable_tools
        .iter()
        .filter_map(|t| t.get("name").and_then(|n| n.as_str()).map(String::from))
        .collect();

    // Fail before creating a container when there is no Bedrock backend.
    get_bedrock(state).await?;

    let owner_hash = owner_key_hash(key_info);
    let session_id = ptc
        .create_session(&tool_names, &owner_hash)
        .await
        .map_err(ApiError::from)?;

    tracing::info!(request_id, session_id, "PTC session created");

    let result = async {
        // 2. Build modified request for Claude
        let modified_request = build_ptc_request(request);

        // 3. Call Claude
        let bedrock = get_bedrock(state).await?;
        let response = bedrock
            .invoke_model_messages(&modified_request, target_model_id, None)
            .await
            .map_err(|e| ApiError::internal_error(format!("Bedrock call failed: {e}")))?;
        add_usage(usage, &response.usage);

        // 4. Process response
        process_claude_response(
            state,
            ptc,
            &session_id,
            &response,
            request,
            target_model_id,
            usage,
        )
        .await
    }
    .await;

    finish_turn(ptc, &session_id, result).await
}

/// Handle a PTC continuation (client sent back tool_result with container ID).
pub async fn handle_ptc_continuation(
    state: &AppState,
    request: &MessageRequest,
    target_model_id: &str,
    request_id: &str,
    container_id: &str,
    key_info: &ApiKeyInfo,
    usage: &mut Usage,
) -> Result<MessageResponse, ApiError> {
    let ptc = get_ptc_service(state)?;

    // Validate ownership: the caller must be the same API key that created the session
    let owner_hash = owner_key_hash(key_info);
    ptc.validate_ownership(container_id, &owner_hash)
        .await
        .map_err(ApiError::from)?;

    // Find session by container ID
    let session_id = ptc
        .get_session_by_container(container_id)
        .await
        .ok_or_else(|| {
            ApiError::bad_request(format!(
                "No active PTC session for container {container_id}"
            ))
        })?;

    tracing::info!(request_id, session_id, container_id, "PTC continuation");

    // Only results for the sandbox's pending tool calls are forwarded (the
    // request history also carries earlier, already-consumed tool_results).
    let session = ptc.get_session(&session_id).await.map_err(ApiError::from)?;
    let pending: std::collections::HashSet<&str> = session
        .pending_tool_calls
        .iter()
        .map(|c| c.tool_use_id.as_str())
        .collect();
    let tool_results: Vec<_> = extract_tool_results(request)
        .into_iter()
        .filter(|(id, _, _)| pending.contains(id.as_str()))
        .collect();
    if tool_results.is_empty() {
        return Err(ApiError::bad_request(
            "PTC continuation requires tool_result content blocks for the pending sandbox tool calls",
        ));
    }

    // Validate tool_use_id format
    for (id, _, _) in &tool_results {
        validate_tool_use_id(id)?;
    }

    // Build results JSON for the sandbox
    let results_json = serde_json::json!({
        "results": tool_results.iter().map(|(id, content, is_error)| {
            serde_json::json!({
                "tool_use_id": id,
                "content": content,
                "is_error": is_error,
            })
        }).collect::<Vec<_>>()
    });

    let result = async {
        // Inject results into sandbox and wait for response
        let msg = ptc
            .send_tool_results_via_channel(&session_id, &results_json)
            .await
            .map_err(ApiError::from)?;

        match msg {
            ContainerMessage::ToolCall(calls) => {
                // More tool calls from sandbox — return to client
                tracing::info!(
                    session_id,
                    tool_count = calls.len(),
                    "Sandbox requesting more tool calls (continuation)"
                );
                build_tool_call_response(ptc, &session_id, &calls, request).await
            }
            ContainerMessage::CodeOutput(output) => {
                // Code completed — finalize with Claude using saved state
                tracing::info!(session_id, "Sandbox code completed (continuation)");
                let code_output = format_code_output(&output);
                finalize_with_claude_from_state(
                    state,
                    ptc,
                    &session_id,
                    &code_output,
                    target_model_id,
                    usage,
                )
                .await
            }
            other => Err(unexpected_message(&other)),
        }
    }
    .await;

    finish_turn(ptc, &session_id, result).await
}

// ============================================================================
// Internal helpers
// ============================================================================

/// Result of one PTC turn: the response plus whether the session must stay
/// alive (only when the sandbox is waiting for client tool results).
type TurnResult = Result<(MessageResponse, bool), ApiError>;

/// Remove the session unless the turn handed sandbox tool calls to the client.
async fn finish_turn(
    ptc: &Arc<PtcService>,
    session_id: &str,
    result: TurnResult,
) -> Result<MessageResponse, ApiError> {
    match result {
        Ok((resp, true)) => Ok(resp),
        Ok((resp, false)) => {
            let _ = ptc.remove_session(session_id).await;
            Ok(resp)
        }
        Err(e) => {
            let _ = ptc.remove_session(session_id).await;
            Err(e)
        }
    }
}

/// Accumulate one Bedrock call's usage.
pub(crate) fn add_usage(acc: &mut Usage, u: &Usage) {
    fn add_opt(a: Option<i32>, b: Option<i32>) -> Option<i32> {
        match (a, b) {
            (None, None) => None,
            (a, b) => Some(a.unwrap_or(0).saturating_add(b.unwrap_or(0))),
        }
    }
    acc.input_tokens = acc.input_tokens.saturating_add(u.input_tokens);
    acc.output_tokens = acc.output_tokens.saturating_add(u.output_tokens);
    acc.cache_creation_input_tokens = add_opt(
        acc.cache_creation_input_tokens,
        u.cache_creation_input_tokens,
    );
    acc.cache_read_input_tokens = add_opt(acc.cache_read_input_tokens, u.cache_read_input_tokens);
}

fn format_code_output(output: &crate::services::ptc::sandbox::CodeOutputData) -> String {
    if output.exit_code == 0 {
        output.stdout.clone()
    } else {
        format!("Error (exit code {}):\n{}", output.exit_code, output.stderr)
    }
}

/// `run_code_via_channel` / `send_tool_results_via_channel` already map
/// error-type messages to `Err`; anything else here is unexpected.
fn unexpected_message(msg: &ContainerMessage) -> ApiError {
    ApiError::internal_error(format!("Unexpected sandbox message: {msg:?}"))
}

fn get_ptc_service(state: &AppState) -> Result<&Arc<PtcService>, ApiError> {
    state.ptc_service.as_ref().ok_or_else(|| {
        ApiError::service_unavailable("PTC service not available. Ensure Docker is running.")
    })
}

/// Derive the owner identifier from the API key info.
/// Uses the HMAC hash stored in the database (stable, unique per key).
fn owner_key_hash(key_info: &ApiKeyInfo) -> String {
    if key_info.is_master {
        "__master__".to_string()
    } else {
        key_info.raw_api_key.clone()
    }
}

async fn get_bedrock(
    state: &AppState,
) -> Result<Arc<crate::services::bedrock::BedrockService>, ApiError> {
    state
        .dynamic
        .read()
        .await
        .bedrock
        .clone()
        .ok_or_else(|| ApiError::service_unavailable("Bedrock backend required for PTC"))
}

/// Build a modified request for Claude: replace code_execution tool with execute_code.
fn build_ptc_request(request: &MessageRequest) -> MessageRequest {
    let execute_code_tool: serde_json::Value =
        serde_json::from_str(EXECUTE_CODE_TOOL).expect("Invalid execute_code tool JSON");

    let mut tools: Vec<serde_json::Value> = vec![execute_code_tool];
    if let Some(ref orig_tools) = request.tools {
        for tool in orig_tools {
            if tool
                .get("type")
                .and_then(|t| t.as_str())
                .map(|t| t == crate::services::ptc::CODE_EXECUTION_TOOL_TYPE)
                .unwrap_or(false)
            {
                continue;
            }
            if tool.get("allowed_callers").is_some() {
                continue;
            }
            tools.push(tool.clone());
        }
    }

    let messages = filter_non_direct_tool_calls(&request.messages);

    MessageRequest {
        output_config: None,
        model: request.model.clone(),
        messages,
        max_tokens: request.max_tokens,
        system: request.system.clone(),
        temperature: request.temperature,
        top_p: request.top_p,
        top_k: request.top_k,
        stop_sequences: request.stop_sequences.clone(),
        stream: false,
        tools: Some(tools),
        tool_choice: request.tool_choice.clone(),
        thinking: request.thinking.clone(),
        metadata: request.metadata.clone(),
        container: None,
        service_tier: request.service_tier.clone(),
        fallback_credit_token: request.fallback_credit_token.clone(),
    }
}

/// Filter out tool_use blocks with caller != "direct" and their corresponding tool_results.
fn filter_non_direct_tool_calls(messages: &[Message]) -> Vec<Message> {
    let mut non_direct_ids: std::collections::HashSet<String> = std::collections::HashSet::new();

    for msg in messages {
        if msg.role != "assistant" {
            continue;
        }
        if let MessageContent::Blocks(blocks) = &msg.content {
            for block in blocks {
                if let ContentBlock::ToolUse {
                    id,
                    caller: Some(caller),
                    ..
                } = block
                {
                    if caller.caller_type != "direct" {
                        non_direct_ids.insert(id.clone());
                    }
                }
            }
        }
    }

    if non_direct_ids.is_empty() {
        return messages.to_vec();
    }

    messages
        .iter()
        .map(|msg| {
            let content = match &msg.content {
                MessageContent::Blocks(blocks) => {
                    let filtered: Vec<ContentBlock> = blocks
                        .iter()
                        .filter(|block| match block {
                            ContentBlock::ToolUse { id, .. } => !non_direct_ids.contains(id),
                            ContentBlock::ToolResult { tool_use_id, .. } => {
                                !non_direct_ids.contains(tool_use_id)
                            }
                            ContentBlock::ServerToolUse { .. }
                            | ContentBlock::ServerToolResult { .. } => false,
                            _ => true,
                        })
                        .cloned()
                        .collect();
                    MessageContent::Blocks(filtered)
                }
                other => other.clone(),
            };
            Message {
                extra: Default::default(),
                role: msg.role.clone(),
                content,
            }
        })
        .collect()
}

/// Process Claude's response: check for execute_code tool_use, run in sandbox.
async fn process_claude_response(
    state: &AppState,
    ptc: &Arc<PtcService>,
    session_id: &str,
    response: &MessageResponse,
    original_request: &MessageRequest,
    target_model_id: &str,
    usage: &mut Usage,
) -> TurnResult {
    // Look for execute_code tool_use in response
    let execute_code_call = response.content.iter().find_map(|block| {
        if let ContentBlock::ToolUse {
            id, name, input, ..
        } = block
        {
            if name == "execute_code" {
                let code = input.get("code").and_then(|c| c.as_str()).unwrap_or("");
                return Some((id.clone(), code.to_string()));
            }
        }
        None
    });

    let Some((tool_use_id, code)) = execute_code_call else {
        // No execute_code call — final answer; the session is closed.
        return Ok((response.clone(), false));
    };

    tracing::info!(session_id, "Executing code in sandbox via channel");

    // Send code to sandbox and wait for response
    let msg = ptc
        .run_code_via_channel(session_id, &code)
        .await
        .map_err(ApiError::from)?;

    match msg {
        ContainerMessage::ToolCall(calls) => {
            // Sandbox wants to call tools — save state and return to client
            tracing::info!(
                session_id,
                tool_count = calls.len(),
                "Sandbox requesting tool calls"
            );

            // Save execution state for continuation
            let exec_state = PtcExecutionState {
                execute_code_tool_id: tool_use_id.clone(),
                code: code.clone(),
                original_assistant_content: response.content.clone(),
                original_messages: filter_non_direct_tool_calls(&original_request.messages),
                original_model: original_request.model.clone(),
                original_system: original_request.system.clone(),
                original_max_tokens: original_request.max_tokens,
                original_temperature: original_request.temperature,
                original_top_p: original_request.top_p,
                original_top_k: original_request.top_k,
                original_stop_sequences: original_request.stop_sequences.clone(),
                original_tools: original_request.tools.clone(),
                original_thinking: original_request.thinking.clone(),
                original_metadata: original_request.metadata.clone(),
                original_service_tier: original_request.service_tier.clone(),
            };
            ptc.save_execution_state(session_id, exec_state).await;

            build_tool_call_response(ptc, session_id, &calls, original_request).await
        }
        ContainerMessage::CodeOutput(output) => {
            // Code completed without tool calls — finalize with Claude
            let code_output = format_code_output(&output);

            call_claude_with_code_result(
                state,
                original_request,
                response,
                &tool_use_id,
                &code_output,
                target_model_id,
                usage,
            )
            .await
        }
        other => Err(unexpected_message(&other)),
    }
}

/// Build a tool_use response to return to the client.
async fn build_tool_call_response(
    ptc: &Arc<PtcService>,
    session_id: &str,
    calls: &[crate::services::ptc::sandbox::ToolCallData],
    original_request: &MessageRequest,
) -> TurnResult {
    let server_tool_use_id = format!("srvtoolu_{}", uuid::Uuid::new_v4());

    let content: Vec<ContentBlock> = calls
        .iter()
        .map(|call| ContentBlock::ToolUse {
            id: call.tool_use_id.clone(),
            name: call.name.clone(),
            input: call.input.clone(),
            caller: Some(CallerInfo {
                caller_type: crate::services::ptc::CODE_EXECUTION_TOOL_TYPE.to_string(),
                tool_id: Some(server_tool_use_id.clone()),
            }),
        })
        .collect();

    let mut resp = MessageResponse::new(
        format!("msg_{}", uuid::Uuid::new_v4()),
        &original_request.model,
        content,
        crate::schemas::anthropic::Usage::new(0, 0),
    );
    resp.stop_reason = Some(StopReason::ToolUse);
    add_container_info(ptc, session_id, &mut resp).await;

    // Usage is filled in by the caller (accumulated over the turn).
    Ok((resp, true))
}

/// Call Claude with code execution result to get final response (first turn, no saved state).
async fn call_claude_with_code_result(
    state: &AppState,
    original_request: &MessageRequest,
    assistant_response: &MessageResponse,
    tool_use_id: &str,
    code_output: &str,
    target_model_id: &str,
    usage: &mut Usage,
) -> TurnResult {
    let bedrock = get_bedrock(state).await?;

    let mut messages = filter_non_direct_tool_calls(&original_request.messages);

    // Add assistant message (Claude's response with execute_code)
    messages.push(Message {
        extra: Default::default(),
        role: "assistant".to_string(),
        content: MessageContent::Blocks(assistant_response.content.clone()),
    });

    // Add tool_result
    messages.push(Message {
        extra: Default::default(),
        role: "user".to_string(),
        content: MessageContent::Blocks(vec![ContentBlock::ToolResult {
            tool_use_id: tool_use_id.to_string(),
            content: ToolResultValue::Text(code_output.to_string()),
            is_error: None,
            cache_control: None,
        }]),
    });

    let continuation = build_continuation_request(original_request, messages);

    let final_response = bedrock
        .invoke_model_messages(&continuation, target_model_id, None)
        .await
        .map_err(|e| ApiError::internal_error(format!("Bedrock finalization failed: {e}")))?;
    add_usage(usage, &final_response.usage);

    Ok((final_response, false))
}

/// Finalize with Claude using saved execution state (continuation turns).
async fn finalize_with_claude_from_state(
    state: &AppState,
    ptc: &Arc<PtcService>,
    session_id: &str,
    code_output: &str,
    target_model_id: &str,
    usage: &mut Usage,
) -> TurnResult {
    let bedrock = get_bedrock(state).await?;

    // Retrieve saved execution state
    let exec_state = ptc
        .take_execution_state(session_id)
        .await
        .map_err(ApiError::from)?;

    // Reconstruct conversation: original messages + saved assistant content + tool_result
    let mut messages = exec_state.original_messages;

    // Add assistant message with the full original content (thinking + execute_code)
    messages.push(Message {
        extra: Default::default(),
        role: "assistant".to_string(),
        content: MessageContent::Blocks(exec_state.original_assistant_content),
    });

    // Add tool_result for execute_code
    messages.push(Message {
        extra: Default::default(),
        role: "user".to_string(),
        content: MessageContent::Blocks(vec![ContentBlock::ToolResult {
            tool_use_id: exec_state.execute_code_tool_id,
            content: ToolResultValue::Text(code_output.to_string()),
            is_error: None,
            cache_control: None,
        }]),
    });

    // Build request from saved parameters
    let modified_messages = filter_non_direct_tool_calls(&messages);

    let continuation = MessageRequest {
        output_config: None,
        model: exec_state.original_model,
        messages: modified_messages,
        max_tokens: exec_state.original_max_tokens,
        system: exec_state.original_system,
        temperature: exec_state.original_temperature,
        top_p: exec_state.original_top_p,
        top_k: exec_state.original_top_k,
        stop_sequences: exec_state.original_stop_sequences,
        stream: false,
        tools: exec_state.original_tools,
        tool_choice: None,
        thinking: exec_state.original_thinking,
        metadata: exec_state.original_metadata,
        container: None,
        service_tier: exec_state.original_service_tier,
        fallback_credit_token: None,
    };

    let final_response = bedrock
        .invoke_model_messages(&continuation, target_model_id, None)
        .await
        .map_err(|e| ApiError::internal_error(format!("Bedrock finalization failed: {e}")))?;
    add_usage(usage, &final_response.usage);

    Ok((final_response, false))
}

/// Build a continuation request preserving original parameters.
fn build_continuation_request(
    original_request: &MessageRequest,
    messages: Vec<Message>,
) -> MessageRequest {
    MessageRequest {
        output_config: None,
        model: original_request.model.clone(),
        messages,
        max_tokens: original_request.max_tokens,
        system: original_request.system.clone(),
        temperature: original_request.temperature,
        top_p: original_request.top_p,
        top_k: original_request.top_k,
        stop_sequences: original_request.stop_sequences.clone(),
        stream: false,
        tools: original_request.tools.clone(),
        tool_choice: None,
        thinking: original_request.thinking.clone(),
        metadata: original_request.metadata.clone(),
        container: None,
        service_tier: original_request.service_tier.clone(),
        fallback_credit_token: original_request.fallback_credit_token.clone(),
    }
}

/// Add container info to response for session reuse.
async fn add_container_info(
    ptc: &Arc<PtcService>,
    session_id: &str,
    response: &mut MessageResponse,
) {
    if let Ok(session) = ptc.get_session(session_id).await {
        let expires_at = session.last_activity
            + chrono::Duration::seconds(crate::services::ptc::DEFAULT_SESSION_TIMEOUT_SECS as i64);
        response.container = Some(ContainerResponse {
            id: session.container.id.clone(),
            expires_at: expires_at.to_rfc3339(),
        });
    }
}

/// Validate tool_use_id format.
/// Accepts: toolu_<alphanumeric> (standard Anthropic format)
/// Also accepts srvtoolu_ prefix for server-generated IDs.
fn validate_tool_use_id(id: &str) -> Result<(), ApiError> {
    let suffix = if let Some(s) = id.strip_prefix("srvtoolu_") {
        s
    } else if let Some(s) = id.strip_prefix("toolu_") {
        s
    } else {
        return Err(ApiError::bad_request(format!(
            "Invalid tool_use_id format: '{id}'. Expected 'toolu_<id>' or 'srvtoolu_<id>'"
        )));
    };

    if !suffix.is_empty()
        && suffix
            .chars()
            .all(|c| c.is_alphanumeric() || c == '-' || c == '_')
    {
        return Ok(());
    }

    Err(ApiError::bad_request(format!(
        "Invalid tool_use_id format: '{id}'. Expected 'toolu_<id>' or 'srvtoolu_<id>'"
    )))
}

/// Extract tool results from request messages.
fn extract_tool_results(request: &MessageRequest) -> Vec<(String, serde_json::Value, bool)> {
    let mut results = Vec::new();

    for msg in &request.messages {
        if msg.role != "user" {
            continue;
        }
        if let MessageContent::Blocks(blocks) = &msg.content {
            for block in blocks {
                if let ContentBlock::ToolResult {
                    tool_use_id,
                    content,
                    is_error,
                    ..
                } = block
                {
                    let content_value = match content {
                        ToolResultValue::Text(t) => serde_json::json!(t),
                        ToolResultValue::Blocks(blocks) => serde_json::json!(blocks),
                    };
                    results.push((
                        tool_use_id.clone(),
                        content_value,
                        is_error.unwrap_or(false),
                    ));
                }
            }
        }
    }

    results
}

/// Whether a PTC-shaped request takes the proxy-side PTC branch: Bedrock
/// route and the model's effective `ptc` capability enabled (per-model
/// mapping, else the `enable_ptc` default — off).
pub(crate) fn ptc_route_enabled(
    provider: &str,
    caps: &crate::services::capabilities::ModelCapabilities,
) -> bool {
    provider == "bedrock" && caps.ptc.enabled
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::services::capabilities::{ModelCapabilities, SimpleCapability};

    #[test]
    fn test_ptc_route_requires_capability_and_bedrock() {
        let mut caps = ModelCapabilities {
            ptc: SimpleCapability { enabled: false },
            ..Default::default()
        };
        assert!(!ptc_route_enabled("bedrock", &caps));
        // The gateway default (`enable_ptc` unset) is off.
        assert!(!ModelCapabilities::default().ptc.enabled);
        caps.ptc = SimpleCapability { enabled: true };
        assert!(ptc_route_enabled("bedrock", &caps));
        assert!(!ptc_route_enabled("anthropic", &caps));
        assert!(!ptc_route_enabled("gemini", &caps));
    }

    #[test]
    fn test_add_usage_accumulates() {
        let mut acc = Usage::new(0, 0);
        add_usage(&mut acc, &Usage::new(100, 20));
        let mut second = Usage::new(50, 5);
        second.cache_read_input_tokens = Some(7);
        add_usage(&mut acc, &second);
        assert_eq!(acc.input_tokens, 150);
        assert_eq!(acc.output_tokens, 25);
        assert_eq!(acc.cache_read_input_tokens, Some(7));
        assert_eq!(acc.cache_creation_input_tokens, None);
        add_usage(&mut acc, &Usage::new(i32::MAX, 0));
        assert_eq!(acc.input_tokens, i32::MAX);
    }

    #[test]
    fn test_validate_tool_use_id() {
        assert!(validate_tool_use_id("toolu_000000000001").is_ok());
        assert!(validate_tool_use_id("srvtoolu_abc").is_ok());
        assert!(validate_tool_use_id("toolu_").is_err());
        assert!(validate_tool_use_id("bad").is_err());
    }

    #[test]
    fn test_new_ptc_errors_map_to_status() {
        use crate::services::ptc::PtcError;
        let e: ApiError = PtcError::SessionLimitExceeded("x".into()).into();
        assert_eq!(e.status, axum::http::StatusCode::TOO_MANY_REQUESTS);
        let e: ApiError = PtcError::InvalidToolCall("x".into()).into();
        assert_eq!(e.status, axum::http::StatusCode::BAD_REQUEST);
        let e: ApiError = PtcError::InvalidRequest("x".into()).into();
        assert_eq!(e.status, axum::http::StatusCode::BAD_REQUEST);
    }
}
