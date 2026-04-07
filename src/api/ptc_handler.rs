//! PTC (Programmatic Tool Calling) handler
//!
//! Orchestrates the PTC flow for `/v1/messages`:
//! 1. Detect PTC request → modify tools → call Claude
//! 2. Claude returns `execute_code` → run in sandbox
//! 3. Sandbox calls tool → return `tool_use` to client (with container ID)
//! 4. Client sends back `tool_result` → inject into sandbox → resume

use crate::api::messages::ApiError;
use crate::schemas::anthropic::{
    CallerInfo, ContainerResponse, ContentBlock, MessageRequest, MessageResponse, StopReason,
};
use crate::server::state::AppState;
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

    // 1. Create session
    let session_id = ptc
        .create_session()
        .await
        .map_err(|e| ApiError::internal_error(format!("PTC session creation failed: {e}")))?;

    tracing::info!(request_id, session_id, "PTC session created");

    // 2. Set up runner script with callable tool names
    let callable_tools = ptc.get_callable_tools(request);
    let tool_names: Vec<String> = callable_tools
        .iter()
        .filter_map(|t| t.get("name").and_then(|n| n.as_str()).map(String::from))
        .collect();

    ptc.setup_runner(&session_id, &tool_names)
        .await
        .map_err(|e| ApiError::internal_error(format!("PTC runner setup failed: {e}")))?;

    // 3. Build modified request for Claude
    let modified_request = build_ptc_request(request);

    // 4. Call Claude
    let bedrock = state
        .dynamic
        .read()
        .await
        .bedrock
        .clone()
        .ok_or_else(|| ApiError::service_unavailable("Bedrock backend required for PTC"))?;

    let response = bedrock
        .invoke_model_messages(&modified_request, target_model_id)
        .await
        .map_err(|e| ApiError::internal_error(format!("Bedrock call failed: {e}")))?;

    // 5. Process response
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

    // Inject tool results into sandbox
    ptc.inject_tool_results(&session_id, &tool_results)
        .await
        .map_err(|e| ApiError::internal_error(format!("Failed to inject tool results: {e}")))?;

    // The runner script is still running (blocked waiting for results).
    // After injecting results, it will continue executing.
    // We need to wait for it to finish or produce more tool calls.
    //
    // Since our current runner uses exec_command (synchronous), the execution
    // already completed in the first call. For the continuation, we need to
    // re-run the code. In a full implementation, the runner would be long-lived.
    //
    // For now, treat this as: the sandbox already finished, finalize with Claude.
    // Build finalization request: original messages + tool_result + code output
    finalize_with_claude(state, ptc, &session_id, request, target_model_id, 0).await
}

// ============================================================================
// Internal helpers
// ============================================================================

fn get_ptc_service(state: &AppState) -> Result<&Arc<PtcService>, ApiError> {
    state.ptc_service.as_ref().ok_or_else(|| {
        ApiError::service_unavailable("PTC service not available. Ensure Docker is running.")
    })
}

/// Build a modified request for Claude: replace code_execution tool with execute_code.
fn build_ptc_request(request: &MessageRequest) -> MessageRequest {
    let execute_code_tool: serde_json::Value =
        serde_json::from_str(EXECUTE_CODE_TOOL).expect("Invalid execute_code tool JSON");

    // Filter out code_execution tool and tools with allowed_callers,
    // add execute_code tool
    let mut tools: Vec<serde_json::Value> = vec![execute_code_tool];
    if let Some(ref orig_tools) = request.tools {
        for tool in orig_tools {
            // Skip code_execution_20250825 type
            if tool
                .get("type")
                .and_then(|t| t.as_str())
                .map(|t| t == crate::services::ptc::CODE_EXECUTION_TOOL_TYPE)
                .unwrap_or(false)
            {
                continue;
            }
            // Skip tools with allowed_callers (these are callable from sandbox, not directly by Claude)
            if tool.get("allowed_callers").is_some() {
                continue;
            }
            tools.push(tool.clone());
        }
    }

    // Filter non-direct tool calls from conversation history
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
        stream: false, // PTC always non-streaming for internal calls
        tools: Some(tools),
        tool_choice: request.tool_choice.clone(),
        thinking: request.thinking.clone(),
        metadata: request.metadata.clone(),
        container: None,
        service_tier: request.service_tier.clone(),
    }
}

/// Filter out tool_use blocks with caller != "direct" and their corresponding tool_results.
fn filter_non_direct_tool_calls(
    messages: &[crate::schemas::anthropic::Message],
) -> Vec<crate::schemas::anthropic::Message> {
    use crate::schemas::anthropic::{Message, MessageContent};

    // First pass: collect tool IDs that are non-direct (called from sandbox)
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

    // Second pass: filter out non-direct tool_use and corresponding tool_result
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

/// Process Claude's response: check for execute_code tool_use, run sandbox, handle result.
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

    tracing::info!(session_id, "Executing code in sandbox");

    // Execute code in sandbox
    let result = ptc
        .run_code_with_tools(session_id, &code)
        .await
        .map_err(|e| ApiError::internal_error(format!("Sandbox execution failed: {e}")))?;

    // Check if sandbox has pending tool calls
    let tool_calls = ptc
        .read_tool_calls(session_id)
        .await
        .map_err(|e| ApiError::internal_error(format!("Failed to read tool calls: {e}")))?;

    if let Some(calls) = tool_calls {
        // Sandbox wants to call tools — return tool_use blocks to client
        tracing::info!(
            session_id,
            tool_count = calls.len(),
            "Sandbox requesting tool calls"
        );

        let server_tool_use_id = format!("srvtoolu_{}", uuid::Uuid::new_v4());

        // Store pending calls in session
        ptc.set_pending_tool_calls(session_id, calls.clone())
            .await
            .map_err(|e| ApiError::internal_error(e.to_string()))?;

        // Build response with tool_use blocks (with caller info)
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
            response.usage.clone(),
        );
        resp.stop_reason = Some(StopReason::ToolUse);
        add_container_info(ptc, session_id, &mut resp).await;

        return Ok(resp);
    }

    // Code completed without tool calls — finalize with Claude
    let code_output = if result.is_success() {
        result.stdout.clone()
    } else {
        format!("Error (exit code {}):\n{}", result.exit_code, result.stderr)
    };

    // Call Claude again with code execution result
    call_claude_with_code_result(
        state,
        ptc,
        session_id,
        original_request,
        response,
        &tool_use_id,
        &code_output,
        target_model_id,
        depth,
    )
    .await
}

/// Call Claude with code execution result to get final response.
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
    _depth: u32,
) -> Result<MessageResponse, ApiError> {
    use crate::schemas::anthropic::{Message, MessageContent, ToolResultValue};

    let bedrock = state
        .dynamic
        .read()
        .await
        .bedrock
        .clone()
        .ok_or_else(|| ApiError::service_unavailable("Bedrock backend required for PTC"))?;

    // Build messages: original + assistant (with execute_code) + user (tool_result)
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

    let continuation = MessageRequest {
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
        tool_choice: None, // Let Claude decide
        thinking: original_request.thinking.clone(),
        metadata: original_request.metadata.clone(),
        container: None,
        service_tier: original_request.service_tier.clone(),
    };

    let mut final_response = bedrock
        .invoke_model_messages(&continuation, target_model_id)
        .await
        .map_err(|e| ApiError::internal_error(format!("Bedrock finalization failed: {e}")))?;

    add_container_info(ptc, session_id, &mut final_response).await;
    Ok(final_response)
}

/// Finalize a PTC continuation: call Claude with the full conversation.
async fn finalize_with_claude(
    state: &AppState,
    ptc: &Arc<PtcService>,
    session_id: &str,
    request: &MessageRequest,
    target_model_id: &str,
    depth: u32,
) -> Result<MessageResponse, ApiError> {
    let bedrock = state
        .dynamic
        .read()
        .await
        .bedrock
        .clone()
        .ok_or_else(|| ApiError::service_unavailable("Bedrock backend required for PTC"))?;

    // For continuation, the request already has the full conversation history.
    // Just forward it to Claude (with filtered non-direct tool calls).
    let modified = build_ptc_request(request);

    let mut response = bedrock
        .invoke_model_messages(&modified, target_model_id)
        .await
        .map_err(|e| ApiError::internal_error(format!("Bedrock call failed: {e}")))?;

    // Check if Claude wants to execute more code
    let has_execute_code = response
        .content
        .iter()
        .any(|block| matches!(block, ContentBlock::ToolUse { name, .. } if name == "execute_code"));

    if has_execute_code {
        // Recursive: process this new execute_code call
        return process_claude_response(
            state,
            ptc,
            session_id,
            &response,
            request,
            target_model_id,
            depth + 1,
        )
        .await;
    }

    add_container_info(ptc, session_id, &mut response).await;
    Ok(response)
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
    use crate::schemas::anthropic::MessageContent;

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
                        crate::schemas::anthropic::ToolResultValue::Text(t) => {
                            serde_json::json!(t)
                        }
                        crate::schemas::anthropic::ToolResultValue::Blocks(blocks) => {
                            serde_json::json!(blocks)
                        }
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
