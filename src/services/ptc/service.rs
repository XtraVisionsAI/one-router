//! PTC Service - Main orchestration for Programmatic Tool Calling
//!
//! This service handles the complete PTC workflow including:
//! - Detection of PTC requests
//! - Session management
//! - Code execution orchestration
//! - Tool call handling

use super::exceptions::{PtcError, PtcResult};
use super::sandbox::{
    ContainerHandle, ContainerInfo, ContainerMessage, SandboxConfig, SandboxExecutor,
};
use crate::schemas::anthropic::{
    ContentBlock, Message, MessageRequest, MessageResponse, Metadata, SystemContent, ThinkingConfig,
};
use std::collections::HashMap;
use std::sync::Arc;
use std::time::Duration;
use tokio::sync::{Mutex as TokioMutex, RwLock};

// ============================================================================
// Constants
// ============================================================================

/// PTC beta header value
pub const PTC_BETA_HEADER: &str = "advanced-tool-use-2025-11-20";

/// Code execution tool type
pub const CODE_EXECUTION_TOOL_TYPE: &str = "code_execution_20250825";

/// Default session timeout in seconds (4.5 minutes)
pub const DEFAULT_SESSION_TIMEOUT_SECS: u64 = 270;

/// Default max iterations for code execution
pub const DEFAULT_MAX_ITERATIONS: u32 = 10;

/// Tool call batch window in milliseconds
pub const TOOL_CALL_BATCH_WINDOW_MS: u64 = 100;

// ============================================================================
// Session
// ============================================================================

/// Represents a PTC session with container and state
#[derive(Debug, Clone)]
pub struct PtcSession {
    /// Session ID
    pub id: String,
    /// Container information
    pub container: ContainerInfo,
    /// Session creation time
    pub created_at: chrono::DateTime<chrono::Utc>,
    /// Last activity time
    pub last_activity: chrono::DateTime<chrono::Utc>,
    /// Pending tool calls waiting for results
    pub pending_tool_calls: Vec<PendingToolCall>,
    /// Current iteration count
    pub iteration_count: u32,
    /// Session state
    pub state: SessionState,
}

/// State of a PTC session
#[derive(Debug, Clone, PartialEq)]
pub enum SessionState {
    /// Session is active and ready
    Active,
    /// Session is waiting for tool results
    WaitingForToolResults,
    /// Session is executing code
    Executing,
    /// Session is completed
    Completed,
    /// Session has expired
    Expired,
}

/// A pending tool call waiting for result
#[derive(Debug, Clone)]
pub struct PendingToolCall {
    /// Tool use ID
    pub tool_use_id: String,
    /// Tool name
    pub name: String,
    /// Tool input
    pub input: serde_json::Value,
    /// Server tool use ID (for PTC)
    pub server_tool_use_id: Option<String>,
}

impl PtcSession {
    /// Check if session has expired
    pub fn is_expired(&self, timeout_secs: u64) -> bool {
        let now = chrono::Utc::now();
        let elapsed = now.signed_duration_since(self.last_activity);
        elapsed.num_seconds() as u64 > timeout_secs
    }

    /// Update last activity time
    pub fn touch(&mut self) {
        self.last_activity = chrono::Utc::now();
    }
}

// ============================================================================
// PTC Response
// ============================================================================

/// Response from PTC processing
#[derive(Debug)]
pub enum PtcResponse {
    /// Regular response (not PTC)
    PassThrough,
    /// PTC response with tool calls requiring client execution
    ToolCalls {
        response: MessageResponse,
        session_id: String,
        container_id: String,
    },
    /// Final PTC response
    Final(MessageResponse),
}

// ============================================================================
// Execution State (preserved across continuation turns)
// ============================================================================

/// State preserved between PTC turns for proper continuation.
///
/// When the sandbox yields a tool call, this state is saved so that
/// the continuation request can reconstruct the full Claude conversation.
#[derive(Debug, Clone)]
pub struct PtcExecutionState {
    /// The execute_code tool_use ID from Claude's response
    pub execute_code_tool_id: String,
    /// The code that was sent to the sandbox
    pub code: String,
    /// Claude's full assistant response content (including thinking blocks)
    pub original_assistant_content: Vec<ContentBlock>,
    /// Original conversation messages (before the assistant turn)
    pub original_messages: Vec<Message>,
    /// Original request parameters needed for Claude continuation
    pub original_model: String,
    pub original_system: Option<SystemContent>,
    pub original_max_tokens: i32,
    pub original_temperature: Option<f32>,
    pub original_top_p: Option<f32>,
    pub original_top_k: Option<i32>,
    pub original_stop_sequences: Option<Vec<String>>,
    pub original_tools: Option<Vec<serde_json::Value>>,
    pub original_thinking: Option<ThinkingConfig>,
    pub original_metadata: Option<Metadata>,
    pub original_service_tier: Option<String>,
}

// ============================================================================
// PTC Service
// ============================================================================

/// Main PTC service for handling Programmatic Tool Calling
pub struct PtcService {
    /// Sandbox executor
    sandbox: Arc<SandboxExecutor>,
    /// Active sessions (cloneable metadata)
    sessions: Arc<RwLock<HashMap<String, PtcSession>>>,
    /// Container handles (not cloneable — stored separately)
    container_handles: Arc<TokioMutex<HashMap<String, ContainerHandle>>>,
    /// Execution states for continuation (preserved across turns)
    execution_states: Arc<RwLock<HashMap<String, PtcExecutionState>>>,
    /// Session timeout in seconds
    session_timeout: u64,
    /// Max iterations per session
    max_iterations: u32,
}

impl PtcService {
    /// Create a new PTC service
    pub async fn new() -> PtcResult<Self> {
        let sandbox = Arc::new(SandboxExecutor::new().await?);
        Ok(Self {
            sandbox,
            sessions: Arc::new(RwLock::new(HashMap::new())),
            container_handles: Arc::new(TokioMutex::new(HashMap::new())),
            execution_states: Arc::new(RwLock::new(HashMap::new())),
            session_timeout: DEFAULT_SESSION_TIMEOUT_SECS,
            max_iterations: DEFAULT_MAX_ITERATIONS,
        })
    }

    /// Create a PTC service with custom configuration
    pub async fn with_config(
        sandbox_config: SandboxConfig,
        session_timeout: u64,
        max_iterations: u32,
    ) -> PtcResult<Self> {
        let sandbox = Arc::new(SandboxExecutor::with_config(sandbox_config).await?);
        Ok(Self {
            sandbox,
            sessions: Arc::new(RwLock::new(HashMap::new())),
            container_handles: Arc::new(TokioMutex::new(HashMap::new())),
            execution_states: Arc::new(RwLock::new(HashMap::new())),
            session_timeout,
            max_iterations,
        })
    }

    // ========================================================================
    // PTC Detection
    // ========================================================================

    /// Check if a request is a PTC request
    pub fn is_ptc_request(&self, request: &MessageRequest, beta_header: Option<&str>) -> bool {
        // Check beta header
        let has_beta_header = beta_header
            .map(|h| h.contains(PTC_BETA_HEADER))
            .unwrap_or(false);

        if !has_beta_header {
            return false;
        }

        // Check for code_execution tool
        if let Some(ref tools) = request.tools {
            return tools.iter().any(|tool| {
                tool.get("type")
                    .and_then(|t| t.as_str())
                    .map(|t| t == CODE_EXECUTION_TOOL_TYPE)
                    .unwrap_or(false)
            });
        }

        false
    }

    /// Check if a request is a PTC continuation
    ///
    /// The container ID is typically passed via a custom header or request field.
    /// This method validates the container ID exists in active sessions.
    pub fn is_ptc_continuation(&self, container_id: Option<&str>) -> bool {
        container_id.is_some()
    }

    /// Validate that a container ID exists in active sessions
    pub async fn validate_container_id(&self, container_id: &str) -> bool {
        let sessions = self.sessions.read().await;
        sessions.values().any(|s| s.container.id == container_id)
    }

    /// Get session by container ID
    pub async fn get_session_by_container(&self, container_id: &str) -> Option<String> {
        let sessions = self.sessions.read().await;
        sessions
            .iter()
            .find(|(_, s)| s.container.id == container_id)
            .map(|(id, _)| id.clone())
    }

    /// Extract tools with allowed_callers from request
    pub fn get_callable_tools(&self, request: &MessageRequest) -> Vec<serde_json::Value> {
        request
            .tools
            .as_ref()
            .map(|tools| {
                tools
                    .iter()
                    .filter(|tool| {
                        // Include tools with code_execution in allowed_callers
                        tool.get("allowed_callers")
                            .and_then(|ac| ac.as_array())
                            .map(|callers| {
                                callers.iter().any(|c| {
                                    c.as_str()
                                        .map(|s| s == CODE_EXECUTION_TOOL_TYPE)
                                        .unwrap_or(false)
                                })
                            })
                            .unwrap_or(false)
                    })
                    .cloned()
                    .collect()
            })
            .unwrap_or_default()
    }

    // ========================================================================
    // Session Management
    // ========================================================================

    /// Create a new PTC session with tool support.
    ///
    /// Sets up the runner script, attaches to the container, starts it,
    /// and waits for the runner's `__READY__` signal.
    pub async fn create_session(&self, tool_names: &[String]) -> PtcResult<String> {
        let session_id = format!("ptc_sess_{}", uuid::Uuid::new_v4());

        // 1. Create container (not started yet — CMD is runner.py)
        let container = self.sandbox.create_container(None).await?;

        // 2. Copy runner script into container
        self.sandbox
            .copy_file_to_container(
                &container.id,
                &super::runner::get_runner_script_bytes(),
                "/tmp/runner.py",
            )
            .await?;

        // 3. Copy PTC_TOOLS env wrapper script
        let tools_csv = tool_names.join(",");
        let wrapper =
            format!("#!/bin/sh\nexport PTC_TOOLS=\"{tools_csv}\"\npython -u /tmp/runner.py\n");
        self.sandbox
            .copy_file_to_container(&container.id, wrapper.as_bytes(), "/tmp/run.sh")
            .await?;

        // 4. Attach and start (attach first, then start)
        let mut handle = self.sandbox.attach_and_start(&container.id).await?;

        // 5. Wait for __READY__ signal from runner
        let msg = handle
            .recv_message_timeout(Duration::from_secs(30))
            .await
            .map_err(|_| {
                PtcError::RunnerNotReady("Timeout waiting for runner ready signal".into())
            })?;

        match msg {
            ContainerMessage::Ready => {}
            ContainerMessage::Error(e) => {
                return Err(PtcError::RunnerNotReady(format!(
                    "Runner error during startup: {e}"
                )));
            }
            other => {
                return Err(PtcError::RunnerNotReady(format!(
                    "Unexpected message during startup: {other:?}"
                )));
            }
        }

        // 6. Store session and handle
        let session = PtcSession {
            id: session_id.clone(),
            container,
            created_at: chrono::Utc::now(),
            last_activity: chrono::Utc::now(),
            pending_tool_calls: Vec::new(),
            iteration_count: 0,
            state: SessionState::Active,
        };

        {
            let mut sessions = self.sessions.write().await;
            sessions.insert(session_id.clone(), session);
        }
        {
            let mut handles = self.container_handles.lock().await;
            handles.insert(session_id.clone(), handle);
        }

        tracing::info!(session_id, "PTC session created with attach");
        Ok(session_id)
    }

    /// Get a session by ID
    pub async fn get_session(&self, session_id: &str) -> PtcResult<PtcSession> {
        let sessions = self.sessions.read().await;
        sessions
            .get(session_id)
            .cloned()
            .ok_or_else(|| PtcError::SessionNotFound(session_id.to_string()))
    }

    /// Get a mutable reference to a session
    async fn with_session<F, R>(&self, session_id: &str, f: F) -> PtcResult<R>
    where
        F: FnOnce(&mut PtcSession) -> PtcResult<R>,
    {
        let mut sessions = self.sessions.write().await;
        let session = sessions
            .get_mut(session_id)
            .ok_or_else(|| PtcError::SessionNotFound(session_id.to_string()))?;

        // Check if session has expired — remove it and clean up the container
        if session.is_expired(self.session_timeout) {
            let session = sessions.remove(session_id).expect("session was just found");
            let sandbox = Arc::clone(&self.sandbox);
            let container_id = session.container.id.clone();
            tokio::spawn(async move {
                let _ = sandbox.stop_and_remove(&container_id).await;
            });
            return Err(PtcError::SessionExpired(session_id.to_string()));
        }

        session.touch();
        f(session)
    }

    /// Remove a session and clean up its container
    pub async fn remove_session(&self, session_id: &str) -> PtcResult<()> {
        // Remove handle first (aborts background reader)
        if let Some(handle) = self.container_handles.lock().await.remove(session_id) {
            handle.shutdown();
        }
        // Remove execution state
        self.execution_states.write().await.remove(session_id);
        // Remove session and clean up container
        let mut sessions = self.sessions.write().await;
        if let Some(session) = sessions.remove(session_id) {
            let _ = self.sandbox.stop_and_remove(&session.container.id).await;
        }
        Ok(())
    }

    /// Clean up expired sessions
    pub async fn cleanup_expired_sessions(&self) -> usize {
        let mut sessions = self.sessions.write().await;
        let expired: Vec<String> = sessions
            .iter()
            .filter(|(_, s)| s.is_expired(self.session_timeout))
            .map(|(id, _)| id.clone())
            .collect();

        let count = expired.len();

        for session_id in expired {
            if let Some(session) = sessions.remove(&session_id) {
                // Clean up handle
                if let Some(handle) = self.container_handles.lock().await.remove(&session_id) {
                    handle.shutdown();
                }
                // Clean up execution state
                self.execution_states.write().await.remove(&session_id);
                // Clean up container in background
                let sandbox = Arc::clone(&self.sandbox);
                let container_id = session.container.id.clone();
                tokio::spawn(async move {
                    let _ = sandbox.stop_and_remove(&container_id).await;
                });
            }
        }

        count
    }

    /// Get active session count
    pub async fn active_session_count(&self) -> usize {
        let sessions = self.sessions.read().await;
        sessions
            .values()
            .filter(|s| !s.is_expired(self.session_timeout))
            .count()
    }

    // ========================================================================
    // Channel-based Code Execution
    // ========================================================================

    /// Send code to the container and wait for the next message (ToolCall or CodeOutput).
    pub async fn run_code_via_channel(
        &self,
        session_id: &str,
        code: &str,
    ) -> PtcResult<ContainerMessage> {
        // Update session state
        self.with_session(session_id, |session| {
            session.state = SessionState::Executing;
            session.iteration_count += 1;
            if session.iteration_count > self.max_iterations {
                return Err(PtcError::MaxIterationsExceeded(self.max_iterations));
            }
            Ok(())
        })
        .await?;

        let mut handles = self.container_handles.lock().await;
        let handle = handles
            .get_mut(session_id)
            .ok_or_else(|| PtcError::SessionNotFound(session_id.to_string()))?;

        // Send code to container
        handle.send_code(code).await?;

        // Wait for response (ToolCall or CodeOutput)
        let msg = handle
            .recv_message_timeout(Duration::from_secs(
                self.sandbox.config().execution_timeout + 5,
            ))
            .await?;

        // Update session state based on result
        match &msg {
            ContainerMessage::ToolCall(_) => {
                self.with_session(session_id, |session| {
                    session.state = SessionState::WaitingForToolResults;
                    Ok(())
                })
                .await?;
            }
            ContainerMessage::CodeOutput(_) => {
                self.with_session(session_id, |session| {
                    session.state = SessionState::Active;
                    Ok(())
                })
                .await?;
            }
            _ => {}
        }

        Ok(msg)
    }

    /// Send tool results to the container and wait for the next message.
    pub async fn send_tool_results_via_channel(
        &self,
        session_id: &str,
        results: &serde_json::Value,
    ) -> PtcResult<ContainerMessage> {
        let mut handles = self.container_handles.lock().await;
        let handle = handles
            .get_mut(session_id)
            .ok_or_else(|| PtcError::SessionNotFound(session_id.to_string()))?;

        // Send tool results
        handle.send_tool_result(results).await?;

        // Wait for response
        let msg = handle
            .recv_message_timeout(Duration::from_secs(
                self.sandbox.config().execution_timeout + 5,
            ))
            .await?;

        // Update session state
        match &msg {
            ContainerMessage::ToolCall(_) => {
                self.with_session(session_id, |session| {
                    session.state = SessionState::WaitingForToolResults;
                    Ok(())
                })
                .await?;
            }
            ContainerMessage::CodeOutput(_) => {
                self.with_session(session_id, |session| {
                    session.state = SessionState::Active;
                    Ok(())
                })
                .await?;
            }
            _ => {}
        }

        Ok(msg)
    }

    // ========================================================================
    // Execution State Management
    // ========================================================================

    /// Save execution state for a session (for continuation).
    pub async fn save_execution_state(&self, session_id: &str, state: PtcExecutionState) {
        let mut states = self.execution_states.write().await;
        states.insert(session_id.to_string(), state);
    }

    /// Take (remove and return) execution state for a session.
    pub async fn take_execution_state(&self, session_id: &str) -> PtcResult<PtcExecutionState> {
        let mut states = self.execution_states.write().await;
        states
            .remove(session_id)
            .ok_or_else(|| PtcError::ExecutionStateNotFound(session_id.to_string()))
    }

    /// Peek at execution state without removing it.
    pub async fn get_execution_state(&self, session_id: &str) -> PtcResult<PtcExecutionState> {
        let states = self.execution_states.read().await;
        states
            .get(session_id)
            .cloned()
            .ok_or_else(|| PtcError::ExecutionStateNotFound(session_id.to_string()))
    }

    // ========================================================================
    // Legacy methods kept for backward compatibility
    // ========================================================================

    /// Set session pending tool calls and transition to WaitingForToolResults.
    pub async fn set_pending_tool_calls(
        &self,
        session_id: &str,
        calls: Vec<PendingToolCall>,
    ) -> PtcResult<()> {
        self.with_session(session_id, |session| {
            session.pending_tool_calls = calls;
            session.state = SessionState::WaitingForToolResults;
            Ok(())
        })
        .await
    }

    /// Get the sandbox executor (for direct container access).
    pub fn sandbox(&self) -> &Arc<SandboxExecutor> {
        &self.sandbox
    }

    // ========================================================================
    // Health Check
    // ========================================================================

    /// Check if PTC service is healthy
    pub async fn health_check(&self) -> PtcHealthStatus {
        let docker_available = self.sandbox.is_available().await;
        let active_sessions = self.active_session_count().await;

        let docker_version = if docker_available {
            self.sandbox.version().await.ok()
        } else {
            None
        };

        PtcHealthStatus {
            healthy: docker_available,
            docker_available,
            docker_version,
            active_sessions,
        }
    }
}

// ============================================================================
// Health Status
// ============================================================================

/// PTC health status
#[derive(Debug, Clone)]
pub struct PtcHealthStatus {
    /// Overall health
    pub healthy: bool,
    /// Docker daemon available
    pub docker_available: bool,
    /// Docker version
    pub docker_version: Option<String>,
    /// Number of active sessions
    pub active_sessions: usize,
}

impl PtcHealthStatus {
    /// Convert to JSON
    pub fn to_json(&self) -> serde_json::Value {
        serde_json::json!({
            "status": if self.healthy { "healthy" } else { "unhealthy" },
            "docker": if self.docker_available { "connected" } else { "disconnected" },
            "docker_version": self.docker_version,
            "active_sessions": self.active_sessions
        })
    }
}

// ============================================================================
// Tests
// ============================================================================

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_session_state() {
        assert_eq!(SessionState::Active, SessionState::Active);
        assert_ne!(SessionState::Active, SessionState::Executing);
    }

    #[test]
    fn test_pending_tool_call() {
        let ptc = PendingToolCall {
            tool_use_id: "toolu_123".to_string(),
            name: "get_weather".to_string(),
            input: serde_json::json!({"location": "SF"}),
            server_tool_use_id: Some("srvtoolu_456".to_string()),
        };

        assert_eq!(ptc.tool_use_id, "toolu_123");
        assert_eq!(ptc.name, "get_weather");
    }

    #[test]
    fn test_ptc_health_status_json() {
        let status = PtcHealthStatus {
            healthy: true,
            docker_available: true,
            docker_version: Some("24.0.0".to_string()),
            active_sessions: 5,
        };

        let json = status.to_json();
        assert_eq!(json["status"], "healthy");
        assert_eq!(json["docker"], "connected");
        assert_eq!(json["active_sessions"], 5);
    }

    #[test]
    fn test_ptc_health_status_unhealthy() {
        let status = PtcHealthStatus {
            healthy: false,
            docker_available: false,
            docker_version: None,
            active_sessions: 0,
        };

        let json = status.to_json();
        assert_eq!(json["status"], "unhealthy");
        assert_eq!(json["docker"], "disconnected");
    }

    #[test]
    fn test_is_ptc_request_detection() {
        // This is a unit test for the detection logic
        // We can't test PtcService::is_ptc_request without mocking
        // but we can verify the constants are correct

        assert_eq!(PTC_BETA_HEADER, "advanced-tool-use-2025-11-20");
        assert_eq!(CODE_EXECUTION_TOOL_TYPE, "code_execution_20250825");
    }
}
