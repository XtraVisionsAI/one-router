//! PTC (Programmatic Tool Calling) handler
//!
//! Orchestrates the PTC flow for `/v1/messages`:
//! 1. Detect PTC request → modify tools → call Claude
//! 2. Claude returns `execute_code` → send code to sandbox via persistent channel
//! 3. Sandbox calls tool → return `tool_use` to client (with container ID)
//! 4. Client sends back `tool_result` → inject into sandbox → resume
//! 5. Sandbox completes → finalize with Claude using saved execution state

use crate::api::messages::ApiError;
use crate::schemas::anthropic::{
    CallerInfo, ContainerResponse, ContentBlock, Message, MessageContent, MessageRequest,
    MessageResponse, StopReason, ToolResultValue,
};
use crate::server::state::AppState;
use crate::services::ptc::sandbox::ContainerMessage;
use crate::services::ptc::service::PtcExecutionState;
use crate::services::ptc::PtcService;
use std::sync::Arc;

/// Maximum recursion depth for PTC execute_code loops
const MAX_PTC_DEPTH: u32 = 10;

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
// Public API
// ============================================================================

/// Handle a new PTC request (first turn — no container ID).
pub async fn handle_ptc_request(
    state: &AppState,
    request: &MessageRequest,
    target_model_id: &str,
    request_id: &str,
) -> Result<MessageResponse, ApiError> {
    let ptc = get_ptc_service(state)?;

    // 1. Create session with callable tool names
    let callable_tools = ptc.get_callable_tools(request);
    let tool_names: Vec<String> = callable_tools
        .iter()
        .filter_map(|t| t.get("name").and_then(|n| n.as_str()).map(String::from))
        .collect();

    let session_id = ptc
        .create_session(&tool_names)
        .await
        .map_err(|e| ApiError::internal_error(format!("PTC session creation failed: {e}")))?;

    tracing::info!(request_id, session_id, "PTC session created");

    // 2. Build modified request for Claude
    let modified_request = build_ptc_request(request);

    // 3. Call Claude
    let bedrock = get_bedrock(state).await?;
    let response = bedrock
        .invoke_model_messages(&modified_request, target_model_id)
        .await
        .map_err(|e| ApiError::internal_error(format!("Bedrock call failed: {e}")))?;

    // 4. Process response
    process_claude_response(
        state,
        ptc,
        &session_id,
        &response,
        request,
        target_model_id,
        0,
    )
    .await
}

/// Handle a PTC continuation (client sent back tool_result with container ID).
pub async fn handle_ptc_continuation(
    state: &AppState,
    request: &MessageRequest,
    target_model_id: &str,
    request_id: &str,
    container_id: &str,
) -> Result<MessageResponse, ApiError> {
    let ptc = get_ptc_service(state)?;

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

    // Extract tool results from the request
    let tool_results = extract_tool_results(request);
    if tool_results.is_empty() {
        return Err(ApiError::bad_request(
            "PTC continuation requires tool_result content blocks",
        ));
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

    // Inject results into sandbox and wait for response
    let msg = ptc
        .send_tool_results_via_channel(&session_id, &results_json)
        .await
        .map_err(|e| ApiError::internal_error(format!("Failed to send tool results: {e}")))?;

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
            let code_output = if output.exit_code == 0 {
                output.stdout.clone()
            } else {
                format!("Error (exit code {}):\n{}", output.exit_code, output.stderr)
            };
            finalize_with_claude_from_state(state, ptc, &session_id, &code_output, target_model_id)
                .await
        }
        ContainerMessage::Error(e) => Err(ApiError::internal_error(format!(
            "Sandbox error during continuation: {e}"
        ))),
        ContainerMessage::StreamEnded => Err(ApiError::internal_error(
            "Container exited during continuation",
        )),
        ContainerMessage::Ready => Err(ApiError::internal_error(
            "Unexpected ready signal during continuation",
        )),
    }
}

// ============================================================================
// Internal helpers
// ============================================================================

fn get_ptc_service(state: &AppState) -> Result<&Arc<PtcService>, ApiError> {
    state.ptc_service.as_ref().ok_or_else(|| {
        ApiError::service_unavailable("PTC service not available. Ensure Docker is running.")
    })
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
    depth: u32,
) -> Result<MessageResponse, ApiError> {
    if depth >= MAX_PTC_DEPTH {
        return Err(ApiError::bad_request(format!(
            "Maximum PTC recursion depth ({MAX_PTC_DEPTH}) exceeded"
        )));
    }

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
        // No execute_code call — return response as-is (with container info)
        let mut resp = response.clone();
        add_container_info(ptc, session_id, &mut resp).await;
        return Ok(resp);
    };

    tracing::info!(session_id, "Executing code in sandbox via channel");

    // Send code to sandbox and wait for response
    let msg = ptc
        .run_code_via_channel(session_id, &code)
        .await
        .map_err(|e| ApiError::internal_error(format!("Sandbox execution failed: {e}")))?;

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
            let code_output = if output.exit_code == 0 {
                output.stdout.clone()
            } else {
                format!("Error (exit code {}):\n{}", output.exit_code, output.stderr)
            };

            call_claude_with_code_result(
                state,
                ptc,
                session_id,
                original_request,
                response,
                &tool_use_id,
                &code_output,
                target_model_id,
            )
            .await
        }
        ContainerMessage::Error(e) => Err(ApiError::internal_error(format!("Sandbox error: {e}"))),
        ContainerMessage::StreamEnded => Err(ApiError::internal_error(
            "Container exited unexpectedly during code execution",
        )),
        ContainerMessage::Ready => Err(ApiError::internal_error(
            "Unexpected ready signal during code execution",
        )),
    }
}

/// Build a tool_use response to return to the client.
async fn build_tool_call_response(
    ptc: &Arc<PtcService>,
    session_id: &str,
    calls: &[crate::services::ptc::sandbox::ToolCallData],
    original_request: &MessageRequest,
) -> Result<MessageResponse, ApiError> {
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

    Ok(resp)
}

/// Call Claude with code execution result to get final response (first turn, no saved state).
#[allow(clippy::too_many_arguments)]
async fn call_claude_with_code_result(
    state: &AppState,
    ptc: &Arc<PtcService>,
    session_id: &str,
    original_request: &MessageRequest,
    assistant_response: &MessageResponse,
    tool_use_id: &str,
    code_output: &str,
    target_model_id: &str,
) -> Result<MessageResponse, ApiError> {
    let bedrock = get_bedrock(state).await?;

    let mut messages = filter_non_direct_tool_calls(&original_request.messages);

    // Add assistant message (Claude's response with execute_code)
    messages.push(Message {
        role: "assistant".to_string(),
        content: MessageContent::Blocks(assistant_response.content.clone()),
    });

    // Add tool_result
    messages.push(Message {
        role: "user".to_string(),
        content: MessageContent::Blocks(vec![ContentBlock::ToolResult {
            tool_use_id: tool_use_id.to_string(),
            content: ToolResultValue::Text(code_output.to_string()),
            is_error: None,
            cache_control: None,
        }]),
    });

    let continuation = build_continuation_request(original_request, messages);

    let mut final_response = bedrock
        .invoke_model_messages(&continuation, target_model_id)
        .await
        .map_err(|e| ApiError::internal_error(format!("Bedrock finalization failed: {e}")))?;

    add_container_info(ptc, session_id, &mut final_response).await;
    Ok(final_response)
}

/// Finalize with Claude using saved execution state (continuation turns).
async fn finalize_with_claude_from_state(
    state: &AppState,
    ptc: &Arc<PtcService>,
    session_id: &str,
    code_output: &str,
    target_model_id: &str,
) -> Result<MessageResponse, ApiError> {
    let bedrock = get_bedrock(state).await?;

    // Retrieve saved execution state
    let exec_state = ptc
        .take_execution_state(session_id)
        .await
        .map_err(|e| ApiError::internal_error(format!("Missing execution state: {e}")))?;

    // Reconstruct conversation: original messages + saved assistant content + tool_result
    let mut messages = exec_state.original_messages;

    // Add assistant message with the full original content (thinking + execute_code)
    messages.push(Message {
        role: "assistant".to_string(),
        content: MessageContent::Blocks(exec_state.original_assistant_content),
    });

    // Add tool_result for execute_code
    messages.push(Message {
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
    };

    let mut final_response = bedrock
        .invoke_model_messages(&continuation, target_model_id)
        .await
        .map_err(|e| ApiError::internal_error(format!("Bedrock finalization failed: {e}")))?;

    add_container_info(ptc, session_id, &mut final_response).await;
    Ok(final_response)
}

/// Build a continuation request preserving original parameters.
fn build_continuation_request(
    original_request: &MessageRequest,
    messages: Vec<Message>,
) -> MessageRequest {
    MessageRequest {
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
