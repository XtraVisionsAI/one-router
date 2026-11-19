//! PTC Service - Main orchestration for Programmatic Tool Calling
//!
//! This service handles the complete PTC workflow including:
//! - Detection of PTC requests
//! - Session management
//! - Code execution orchestration
//! - Tool call handling

use super::exceptions::{PtcError, PtcResult};
use super::sandbox::{
    ContainerHandle, ContainerInfo, ContainerMessage, SandboxConfig, SandboxExecutor, ToolCallData,
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

/// Absolute session lifetime (activity does not extend it). Bounds how long
/// any sandbox container can legitimately live, which the orphan sweep
/// relies on.
pub const MAX_SESSION_LIFETIME_SECS: u64 = 30 * 60;

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
    /// HMAC hash of the API key that owns this session
    pub owner_key_hash: String,
    /// Owning user (per-user session cap); `None` for master / ownerless keys
    pub owner_user_id: Option<String>,
    /// Tool names callable from sandbox code (validated at creation)
    pub allowed_tools: Vec<String>,
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
    /// Check if session has expired: idle longer than `timeout_secs`, or
    /// alive longer than [`MAX_SESSION_LIFETIME_SECS`] regardless of activity.
    pub fn is_expired(&self, timeout_secs: u64) -> bool {
        let now = chrono::Utc::now();
        let idle = now.signed_duration_since(self.last_activity).num_seconds();
        let age = now.signed_duration_since(self.created_at).num_seconds();
        idle.max(0) as u64 > timeout_secs || age.max(0) as u64 > MAX_SESSION_LIFETIME_SECS
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
// Detection helpers
// ============================================================================

/// Request shape check: `anthropic-beta` contains the PTC beta and a
/// `code_execution_20250825` tool is declared.
pub fn is_ptc_shaped(request: &MessageRequest, beta_header: Option<&str>) -> bool {
    let has_beta_header = beta_header
        .map(|h| h.split(',').any(|b| b.trim() == PTC_BETA_HEADER))
        .unwrap_or(false);
    if !has_beta_header {
        return false;
    }
    request.tools.as_ref().is_some_and(|tools| {
        tools
            .iter()
            .any(|tool| tool.get("type").and_then(|t| t.as_str()) == Some(CODE_EXECUTION_TOOL_TYPE))
    })
}

/// Tools whose `allowed_callers` include `code_execution_20250825`.
pub fn callable_tools(request: &MessageRequest) -> Vec<serde_json::Value> {
    request
        .tools
        .as_ref()
        .map(|tools| {
            tools
                .iter()
                .filter(|tool| {
                    tool.get("allowed_callers")
                        .and_then(|ac| ac.as_array())
                        .is_some_and(|callers| {
                            callers
                                .iter()
                                .any(|c| c.as_str() == Some(CODE_EXECUTION_TOOL_TYPE))
                        })
                })
                .cloned()
                .collect()
        })
        .unwrap_or_default()
}

// ============================================================================
// Limits & validation (pure, unit-tested)
// ============================================================================

/// Infra opt-in env var: the PTC sandbox (and the Docker-backed code executor
/// used by web_search dynamic filtering) is only constructed when `true`.
pub const PTC_ENABLED_ENV: &str = "PTC_ENABLED";
/// Gateway-wide cap on concurrent PTC sessions (containers).
pub const PTC_MAX_SESSIONS_ENV: &str = "PTC_MAX_SESSIONS";
/// Per-API-key cap on concurrent PTC sessions.
pub const PTC_MAX_SESSIONS_PER_KEY_ENV: &str = "PTC_MAX_SESSIONS_PER_KEY";
/// Per-user cap (all of a user's keys together) on concurrent PTC sessions.
pub const PTC_MAX_SESSIONS_PER_USER_ENV: &str = "PTC_MAX_SESSIONS_PER_USER";

pub const DEFAULT_MAX_SESSIONS: usize = 32;
pub const DEFAULT_MAX_SESSIONS_PER_KEY: usize = 4;
pub const DEFAULT_MAX_SESSIONS_PER_USER: usize = 8;

/// Max tool calls in one sandbox frame.
pub const MAX_TOOL_CALLS_PER_FRAME: usize = 32;
/// Max serialized size of one tool call's `input`.
pub const MAX_TOOL_INPUT_BYTES: usize = 256 * 1024;
/// Max length of a tool name passed into the sandbox.
pub const MAX_TOOL_NAME_LEN: usize = 64;

/// Interval of the background expired-session sweep.
pub const SESSION_SWEEP_INTERVAL_SECS: u64 = 60;

/// Whether the operator opted in to PTC (`PTC_ENABLED=true|1`).
pub fn ptc_enabled_from_env() -> bool {
    parse_bool_env(std::env::var(PTC_ENABLED_ENV).ok().as_deref())
}

fn parse_bool_env(v: Option<&str>) -> bool {
    matches!(
        v.map(|s| s.trim().to_ascii_lowercase()).as_deref(),
        Some("true" | "1" | "yes" | "on")
    )
}

/// Session caps.
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct PtcLimits {
    pub max_sessions: usize,
    pub max_sessions_per_owner: usize,
    /// Across all keys of one user (fairness of the global pool).
    pub max_sessions_per_user: usize,
}

impl Default for PtcLimits {
    fn default() -> Self {
        Self {
            max_sessions: DEFAULT_MAX_SESSIONS,
            max_sessions_per_owner: DEFAULT_MAX_SESSIONS_PER_KEY,
            max_sessions_per_user: DEFAULT_MAX_SESSIONS_PER_USER,
        }
    }
}

impl PtcLimits {
    /// Defaults overridden by `PTC_MAX_SESSIONS` / `PTC_MAX_SESSIONS_PER_KEY`
    /// / `PTC_MAX_SESSIONS_PER_USER` (positive integers; anything else keeps
    /// the default).
    pub fn from_env() -> Self {
        Self::from_values(
            std::env::var(PTC_MAX_SESSIONS_ENV).ok().as_deref(),
            std::env::var(PTC_MAX_SESSIONS_PER_KEY_ENV).ok().as_deref(),
            std::env::var(PTC_MAX_SESSIONS_PER_USER_ENV).ok().as_deref(),
        )
    }

    fn from_values(total: Option<&str>, per_owner: Option<&str>, per_user: Option<&str>) -> Self {
        let parse = |v: Option<&str>, default: usize| {
            v.and_then(|s| s.trim().parse::<usize>().ok())
                .filter(|n| *n > 0)
                .unwrap_or(default)
        };
        Self {
            max_sessions: parse(total, DEFAULT_MAX_SESSIONS),
            max_sessions_per_owner: parse(per_owner, DEFAULT_MAX_SESSIONS_PER_KEY),
            max_sessions_per_user: parse(per_user, DEFAULT_MAX_SESSIONS_PER_USER),
        }
    }
}

/// Check whether one more session may be created given the current counts
/// (live sessions + in-flight reservations). `user` is `None` for callers
/// without an owning user (master / ownerless keys).
pub fn check_session_caps(
    total: usize,
    owner: usize,
    user: Option<usize>,
    limits: &PtcLimits,
) -> PtcResult<()> {
    if owner >= limits.max_sessions_per_owner {
        return Err(PtcError::SessionLimitExceeded(format!(
            "at most {} concurrent PTC sessions per API key",
            limits.max_sessions_per_owner
        )));
    }
    if user.is_some_and(|n| n >= limits.max_sessions_per_user) {
        return Err(PtcError::SessionLimitExceeded(format!(
            "at most {} concurrent PTC sessions per user",
            limits.max_sessions_per_user
        )));
    }
    if total >= limits.max_sessions {
        return Err(PtcError::SessionLimitExceeded(format!(
            "gateway-wide limit of {} concurrent PTC sessions reached",
            limits.max_sessions
        )));
    }
    Ok(())
}

/// A tool name that may be exposed inside the sandbox: `[A-Za-z0-9_-]{1,64}`.
pub fn is_valid_tool_name(name: &str) -> bool {
    !name.is_empty()
        && name.len() <= MAX_TOOL_NAME_LEN
        && name
            .bytes()
            .all(|b| b.is_ascii_alphanumeric() || b == b'_' || b == b'-')
}

/// Validate the client's code-callable tool names before they reach the
/// container environment.
pub fn validate_tool_names(names: &[String]) -> PtcResult<()> {
    for name in names {
        if !is_valid_tool_name(name) {
            return Err(PtcError::InvalidRequest(format!(
                "tool name '{}' is not allowed for code execution (expected [A-Za-z0-9_-]{{1,{MAX_TOOL_NAME_LEN}}})",
                name.chars().take(80).collect::<String>()
            )));
        }
    }
    Ok(())
}

/// Sandbox-generated tool_use id: `toolu_[A-Za-z0-9_-]{1,64}`.
fn is_valid_sandbox_tool_use_id(id: &str) -> bool {
    id.strip_prefix("toolu_").is_some_and(|rest| {
        !rest.is_empty()
            && rest.len() <= 64
            && rest
                .bytes()
                .all(|b| b.is_ascii_alphanumeric() || b == b'_' || b == b'-')
    })
}

/// Validate a tool-call frame emitted by sandbox code against the session's
/// callable tool set (`allowed_callers` contains `code_execution_20250825`).
///
/// The frame is produced by model-written code running in the container, so
/// every field is untrusted: names outside the callable set, malformed /
/// duplicate ids, non-object or oversized inputs are rejected.
pub fn validate_sandbox_tool_calls(calls: &[ToolCallData], allowed: &[String]) -> PtcResult<()> {
    if calls.is_empty() {
        return Err(PtcError::InvalidToolCall("empty tool call batch".into()));
    }
    if calls.len() > MAX_TOOL_CALLS_PER_FRAME {
        return Err(PtcError::InvalidToolCall(format!(
            "{} tool calls in one batch (max {MAX_TOOL_CALLS_PER_FRAME})",
            calls.len()
        )));
    }
    let mut seen = std::collections::HashSet::new();
    for call in calls {
        if !is_valid_sandbox_tool_use_id(&call.tool_use_id) {
            return Err(PtcError::InvalidToolCall("malformed tool_use_id".into()));
        }
        if !seen.insert(call.tool_use_id.as_str()) {
            return Err(PtcError::InvalidToolCall("duplicate tool_use_id".into()));
        }
        if !allowed.iter().any(|a| a == &call.name) {
            return Err(PtcError::InvalidToolCall(format!(
                "tool '{}' is not callable from code execution",
                call.name.chars().take(80).collect::<String>()
            )));
        }
        if !call.input.is_object() {
            return Err(PtcError::InvalidToolCall(format!(
                "input for '{}' must be a JSON object",
                call.name
            )));
        }
        let size = serde_json::to_vec(&call.input)
            .map(|v| v.len())
            .unwrap_or(0);
        if size > MAX_TOOL_INPUT_BYTES {
            return Err(PtcError::InvalidToolCall(format!(
                "input for '{}' is {size} bytes (max {MAX_TOOL_INPUT_BYTES})",
                call.name
            )));
        }
    }
    Ok(())
}

// ============================================================================
// PTC Service
// ============================================================================

/// Per-session container handle. The handle is behind its own mutex so a
/// long exchange (up to execution_timeout + 5s) only serializes requests on
/// the same session; `abort` lets teardown stop the reader without waiting
/// for that mutex.
struct SessionHandle {
    handle: Arc<TokioMutex<ContainerHandle>>,
    abort: tokio::task::AbortHandle,
    /// Reader state (poisoned by unsolicited / over-budget frames).
    reader: Arc<super::sandbox::ReaderState>,
}

/// In-flight slot counts (session creations + one-shot code executions).
#[derive(Debug, Default)]
struct ReservationCounts {
    by_key: HashMap<String, usize>,
    by_user: HashMap<String, usize>,
}

impl ReservationCounts {
    fn total(&self) -> usize {
        self.by_key.values().sum()
    }

    fn add(&mut self, owner: &str, user: Option<&str>) {
        *self.by_key.entry(owner.to_string()).or_default() += 1;
        if let Some(u) = user {
            *self.by_user.entry(u.to_string()).or_default() += 1;
        }
    }

    fn remove(&mut self, owner: &str, user: Option<&str>) {
        fn dec(map: &mut HashMap<String, usize>, k: &str) {
            if let Some(n) = map.get_mut(k) {
                *n = n.saturating_sub(1);
                if *n == 0 {
                    map.remove(k);
                }
            }
        }
        dec(&mut self.by_key, owner);
        if let Some(u) = user {
            dec(&mut self.by_user, u);
        }
    }
}

/// Slot reservation counted against the global / per-key / per-user caps:
/// held while a session container is being created, and for the whole run of
/// a one-shot code execution (web-tool dynamic filtering). Released on drop.
pub struct SlotReservation {
    reservations: Arc<std::sync::Mutex<ReservationCounts>>,
    owner: String,
    user: Option<String>,
}

impl Drop for SlotReservation {
    fn drop(&mut self) {
        self.reservations
            .lock()
            .unwrap_or_else(|e| e.into_inner())
            .remove(&self.owner, self.user.as_deref());
    }
}

/// Main PTC service for handling Programmatic Tool Calling
pub struct PtcService {
    /// Sandbox executor
    sandbox: Arc<SandboxExecutor>,
    /// Active sessions (cloneable metadata)
    sessions: Arc<RwLock<HashMap<String, PtcSession>>>,
    /// Container handles (not cloneable — stored separately, one mutex each)
    container_handles: Arc<RwLock<HashMap<String, SessionHandle>>>,
    /// Execution states for continuation (preserved across turns)
    execution_states: Arc<RwLock<HashMap<String, PtcExecutionState>>>,
    /// In-flight session creations / one-shot runs per owner and user
    reservations: Arc<std::sync::Mutex<ReservationCounts>>,
    /// Session caps
    limits: PtcLimits,
    /// Session timeout in seconds
    session_timeout: u64,
    /// Max iterations per session
    max_iterations: u32,
}

impl PtcService {
    /// Create a new PTC service (image from `PTC_IMAGE`, caps from
    /// `PTC_MAX_SESSIONS` / `PTC_MAX_SESSIONS_PER_KEY`).
    pub async fn new() -> PtcResult<Self> {
        Self::with_config(
            SandboxConfig::from_env(),
            DEFAULT_SESSION_TIMEOUT_SECS,
            DEFAULT_MAX_ITERATIONS,
        )
        .await
    }

    /// Create a PTC service with custom configuration
    pub async fn with_config(
        sandbox_config: SandboxConfig,
        session_timeout: u64,
        max_iterations: u32,
    ) -> PtcResult<Self> {
        if !super::sandbox::image_is_digest_pinned(&sandbox_config.image) {
            tracing::warn!(
                image = %sandbox_config.image,
                "PTC sandbox image is not pinned by digest (mutable tag); set PTC_IMAGE=<image>@sha256:<digest>"
            );
        }
        let sandbox = Arc::new(SandboxExecutor::with_config(sandbox_config).await?);
        // Leftovers of a crashed / killed previous run.
        sandbox.sweep_orphan_containers().await;
        Ok(Self {
            sandbox,
            sessions: Arc::new(RwLock::new(HashMap::new())),
            container_handles: Arc::new(RwLock::new(HashMap::new())),
            execution_states: Arc::new(RwLock::new(HashMap::new())),
            reservations: Arc::new(std::sync::Mutex::new(ReservationCounts::default())),
            limits: PtcLimits::from_env(),
            session_timeout,
            max_iterations,
        })
    }

    /// Configured session caps.
    pub fn limits(&self) -> PtcLimits {
        self.limits
    }

    // ========================================================================
    // PTC Detection
    // ========================================================================

    /// Check if a request asks for PTC (beta header + code_execution tool).
    ///
    /// This is only the *shape* check; the caller must additionally require
    /// the model's effective `ptc` capability.
    pub fn is_ptc_request(&self, request: &MessageRequest, beta_header: Option<&str>) -> bool {
        is_ptc_shaped(request, beta_header)
    }

    /// Check if a request is a PTC continuation
    pub fn is_ptc_continuation(&self, container_id: Option<&str>) -> bool {
        container_id.is_some()
    }

    /// Validate that a container ID exists in active sessions
    pub async fn validate_container_id(&self, container_id: &str) -> bool {
        let sessions = self.sessions.read().await;
        sessions.values().any(|s| s.container.id == container_id)
    }

    /// Validate that the caller owns the session associated with this container.
    pub async fn validate_ownership(
        &self,
        container_id: &str,
        caller_key_hash: &str,
    ) -> PtcResult<()> {
        let sessions = self.sessions.read().await;
        let session = sessions
            .values()
            .find(|s| s.container.id == container_id)
            .ok_or_else(|| PtcError::SessionNotFound(container_id.to_string()))?;

        if session.owner_key_hash != caller_key_hash {
            return Err(PtcError::PermissionDenied(
                "Container does not belong to this API key".into(),
            ));
        }
        Ok(())
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
        callable_tools(request)
    }

    // ========================================================================
    // Session Management
    // ========================================================================

    /// Reserve a slot under the global, per-key and per-user caps.
    async fn reserve_slot(&self, owner: &str, user: Option<&str>) -> PtcResult<SlotReservation> {
        let sessions = self.sessions.read().await;
        let mut res = self.reservations.lock().unwrap_or_else(|e| e.into_inner());
        let total = sessions.len() + res.total();
        let owner_count = sessions
            .values()
            .filter(|s| s.owner_key_hash == owner)
            .count()
            + res.by_key.get(owner).copied().unwrap_or(0);
        let user_count = user.map(|u| {
            sessions
                .values()
                .filter(|s| s.owner_user_id.as_deref() == Some(u))
                .count()
                + res.by_user.get(u).copied().unwrap_or(0)
        });
        check_session_caps(total, owner_count, user_count, &self.limits)?;
        res.add(owner, user);
        Ok(SlotReservation {
            reservations: Arc::clone(&self.reservations),
            owner: owner.to_string(),
            user: user.map(str::to_string),
        })
    }

    /// Reserve a slot for a one-shot code execution (web-tool dynamic
    /// filtering): same global / per-key / per-user caps as sessions; hold
    /// the returned guard for the duration of the run.
    pub async fn reserve_oneshot(
        &self,
        owner_key_hash: &str,
        owner_user_id: Option<&str>,
    ) -> PtcResult<SlotReservation> {
        self.cleanup_expired_sessions().await;
        self.reserve_slot(owner_key_hash, owner_user_id).await
    }

    /// Create a new PTC session with tool support.
    ///
    /// Creates the runner container (tool names via `PTC_TOOLS` env), attaches,
    /// starts it, and waits for the runner's `__READY__` signal. Every error
    /// after the container exists removes it again.
    pub async fn create_session(
        &self,
        tool_names: &[String],
        owner_key_hash: &str,
        owner_user_id: Option<&str>,
    ) -> PtcResult<String> {
        validate_tool_names(tool_names)?;

        // Free slots held by expired sessions before checking the caps.
        self.cleanup_expired_sessions().await;
        let _slot = self.reserve_slot(owner_key_hash, owner_user_id).await?;

        let session_id = format!("ptc_sess_{}", uuid::Uuid::new_v4());

        // 1. Create container (not started yet)
        let container = self.sandbox.create_runner_container(tool_names).await?;
        // Cancellation-safe: if this future is dropped (client disconnect)
        // before the session is stored, the guard spawns the removal.
        let guard = super::sandbox::ContainerCleanupGuard::new(
            Arc::clone(&self.sandbox),
            container.id.clone(),
        );

        // 2. Attach, start, wait for ready — remove the container on failure.
        let handle = match self.start_runner(&container.id).await {
            Ok(h) => h,
            Err(e) => {
                // Spawned removal (not cancellable by dropping this future);
                // disarm only after it completed, so a cancellation while
                // waiting still leaves the guard to remove the container.
                if let Ok(Ok(())) =
                    super::sandbox::spawn_remove(&self.sandbox, container.id.clone()).await
                {
                    guard.disarm();
                }
                return Err(e);
            }
        };

        // 3. Store session and handle
        let session = PtcSession {
            id: session_id.clone(),
            container,
            owner_key_hash: owner_key_hash.to_string(),
            owner_user_id: owner_user_id.map(str::to_string),
            allowed_tools: tool_names.to_vec(),
            created_at: chrono::Utc::now(),
            last_activity: chrono::Utc::now(),
            pending_tool_calls: Vec::new(),
            iteration_count: 0,
            state: SessionState::Active,
        };

        let abort = handle.reader_abort_handle();
        let reader = handle.reader_state();
        // Both maps are locked before either insert, and the guard is
        // disarmed only once the session is visible to sweeps / teardown.
        let mut handles = self.container_handles.write().await;
        let mut sessions = self.sessions.write().await;
        handles.insert(
            session_id.clone(),
            SessionHandle {
                handle: Arc::new(TokioMutex::new(handle)),
                abort,
                reader,
            },
        );
        sessions.insert(session_id.clone(), session);
        guard.disarm();
        drop(sessions);
        drop(handles);

        tracing::info!(session_id, "PTC session created with attach");
        Ok(session_id)
    }

    /// Attach + start a created runner container and wait for `__READY__`.
    async fn start_runner(&self, container_id: &str) -> PtcResult<ContainerHandle> {
        let mut handle = self.sandbox.attach_and_start(container_id).await?;

        let msg = handle
            .recv_message_timeout(Duration::from_secs(30))
            .await
            .map_err(|_| {
                PtcError::RunnerNotReady("Timeout waiting for runner ready signal".into())
            })?;

        match msg {
            ContainerMessage::Ready => Ok(handle),
            ContainerMessage::Error(e) => Err(PtcError::RunnerNotReady(format!(
                "Runner error during startup: {e}"
            ))),
            other => Err(PtcError::RunnerNotReady(format!(
                "Unexpected message during startup: {other:?}"
            ))),
        }
    }

    /// Get a session by ID
    pub async fn get_session(&self, session_id: &str) -> PtcResult<PtcSession> {
        let sessions = self.sessions.read().await;
        sessions
            .get(session_id)
            .cloned()
            .ok_or_else(|| PtcError::SessionNotFound(session_id.to_string()))
    }

    /// Run `f` on a live session; an expired session is torn down instead.
    async fn with_session<F, R>(&self, session_id: &str, f: F) -> PtcResult<R>
    where
        F: FnOnce(&mut PtcSession) -> PtcResult<R>,
    {
        let expired = {
            let mut sessions = self.sessions.write().await;
            let session = sessions
                .get_mut(session_id)
                .ok_or_else(|| PtcError::SessionNotFound(session_id.to_string()))?;
            if session.is_expired(self.session_timeout) {
                sessions.remove(session_id)
            } else {
                session.touch();
                return f(session);
            }
        };
        if let Some(session) = expired {
            self.teardown(session_id, Some(session.container.id)).await;
        }
        Err(PtcError::SessionExpired(session_id.to_string()))
    }

    /// Drop handle + execution state and remove the container. No map lock is
    /// held across the Docker call.
    ///
    /// Callers have already removed the session from `sessions`, so nothing
    /// else would ever remove this container: the whole teardown runs on a
    /// spawned task (started synchronously, before the first `.await`), and
    /// dropping the awaiting future (client disconnect) cannot cancel it.
    async fn teardown(&self, session_id: &str, container_id: Option<String>) {
        let _ = self
            .spawn_teardown(session_id.to_string(), container_id)
            .await;
    }

    /// Spawn [`Self::teardown`]'s work; see there.
    fn spawn_teardown(
        &self,
        session_id: String,
        container_id: Option<String>,
    ) -> tokio::task::JoinHandle<()> {
        let handles = Arc::clone(&self.container_handles);
        let states = Arc::clone(&self.execution_states);
        let sandbox = Arc::clone(&self.sandbox);
        tokio::spawn(async move {
            if let Some(h) = handles.write().await.remove(&session_id) {
                h.abort.abort();
            }
            states.write().await.remove(&session_id);
            if let Some(cid) = container_id {
                if let Err(e) = sandbox.stop_and_remove(&cid).await {
                    tracing::debug!(session_id, error = %e, "PTC container removal failed");
                }
            }
        })
    }

    /// Remove a session and clean up its container
    pub async fn remove_session(&self, session_id: &str) -> PtcResult<()> {
        let session = self.sessions.write().await.remove(session_id);
        self.teardown(session_id, session.map(|s| s.container.id))
            .await;
        Ok(())
    }

    /// Clean up expired sessions. Called by the background sweep task and
    /// before every session creation.
    pub async fn cleanup_expired_sessions(&self) -> usize {
        let poisoned: std::collections::HashSet<String> = self
            .container_handles
            .read()
            .await
            .iter()
            .filter(|(_, h)| h.reader.is_poisoned())
            .map(|(id, _)| id.clone())
            .collect();
        let expired: Vec<(String, String)> = {
            let mut sessions = self.sessions.write().await;
            let ids: Vec<String> = sessions
                .iter()
                .filter(|(id, s)| s.is_expired(self.session_timeout) || poisoned.contains(*id))
                .map(|(id, _)| id.clone())
                .collect();
            ids.into_iter()
                .filter_map(|id| sessions.remove(&id).map(|s| (id, s.container.id)))
                .collect()
        };
        let count = expired.len();
        // Spawn every teardown before awaiting any, so cancelling this
        // future mid-loop cannot strand the not-yet-started ones.
        let tasks: Vec<_> = expired
            .into_iter()
            .map(|(id, cid)| self.spawn_teardown(id, Some(cid)))
            .collect();
        futures::future::join_all(tasks).await;
        count
    }

    /// Clean up ALL sessions (used during graceful shutdown).
    /// Returns the number of sessions cleaned up.
    pub async fn cleanup_all_sessions(&self) -> usize {
        let all: Vec<(String, String)> = {
            let mut sessions = self.sessions.write().await;
            sessions
                .drain()
                .map(|(id, s)| (id, s.container.id))
                .collect()
        };
        let count = all.len();
        let tasks: Vec<_> = all
            .into_iter()
            .map(|(id, cid)| self.spawn_teardown(id, Some(cid)))
            .collect();
        futures::future::join_all(tasks).await;
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

    /// Clone the session's handle out of the map (map lock released before
    /// the caller awaits on the handle).
    async fn handle_for(&self, session_id: &str) -> PtcResult<Arc<TokioMutex<ContainerHandle>>> {
        self.container_handles
            .read()
            .await
            .get(session_id)
            .map(|h| Arc::clone(&h.handle))
            .ok_or_else(|| PtcError::SessionNotFound(session_id.to_string()))
    }

    fn exchange_timeout(&self) -> Duration {
        Duration::from_secs(self.sandbox.config().execution_timeout + 5)
    }

    /// Send code to the container and wait for the next message (ToolCall or CodeOutput).
    ///
    /// Any outcome other than a valid ToolCall / CodeOutput (timeout, sandbox
    /// error, stream end, invalid tool call) tears the session down so the
    /// still-running code cannot answer a later request.
    pub async fn run_code_via_channel(
        &self,
        session_id: &str,
        code: &str,
    ) -> PtcResult<ContainerMessage> {
        let guard = self.exchange_guard(session_id);
        let result = async {
            self.with_session(session_id, |session| {
                session.state = SessionState::Executing;
                session.iteration_count += 1;
                if session.iteration_count > self.max_iterations {
                    return Err(PtcError::MaxIterationsExceeded(self.max_iterations));
                }
                Ok(())
            })
            .await?;

            let handle = self.handle_for(session_id).await?;
            let mut h = handle.lock().await;
            h.send_code(code).await?;
            h.recv_message_timeout(self.exchange_timeout()).await
        }
        .await;
        let out = self.after_exchange(session_id, result).await;
        guard.disarm();
        out
    }

    /// Send tool results to the container and wait for the next message.
    pub async fn send_tool_results_via_channel(
        &self,
        session_id: &str,
        results: &serde_json::Value,
    ) -> PtcResult<ContainerMessage> {
        let guard = self.exchange_guard(session_id);
        let result = async {
            self.with_session(session_id, |session| {
                session.state = SessionState::Executing;
                session.pending_tool_calls.clear();
                Ok(())
            })
            .await?;
            let handle = self.handle_for(session_id).await?;
            let mut h = handle.lock().await;
            h.send_tool_result(results).await?;
            h.recv_message_timeout(self.exchange_timeout()).await
        }
        .await;
        let out = self.after_exchange(session_id, result).await;
        guard.disarm();
        out
    }

    /// Drop guard for one exchange: if the request future is dropped while
    /// the exchange is in flight (client disconnect), the session — whose
    /// code is still running and whose next frame nobody will read — is
    /// removed in the background instead of holding a slot until expiry.
    fn exchange_guard(&self, session_id: &str) -> ExchangeGuard {
        ExchangeGuard {
            armed: true,
            session_id: session_id.to_string(),
            sessions: Arc::clone(&self.sessions),
            handles: Arc::clone(&self.container_handles),
            states: Arc::clone(&self.execution_states),
            sandbox: Arc::clone(&self.sandbox),
        }
    }

    /// Validate the exchange outcome and update session state; tear the
    /// session down on anything unusable.
    async fn after_exchange(
        &self,
        session_id: &str,
        result: PtcResult<ContainerMessage>,
    ) -> PtcResult<ContainerMessage> {
        let outcome = match result {
            Ok(ContainerMessage::ToolCall(calls)) => {
                let checked = async {
                    let allowed = self.get_session(session_id).await?.allowed_tools;
                    validate_sandbox_tool_calls(&calls, &allowed)?;
                    let pending = calls
                        .iter()
                        .map(|c| PendingToolCall {
                            tool_use_id: c.tool_use_id.clone(),
                            name: c.name.clone(),
                            input: c.input.clone(),
                            server_tool_use_id: None,
                        })
                        .collect();
                    self.with_session(session_id, |session| {
                        session.state = SessionState::WaitingForToolResults;
                        session.pending_tool_calls = pending;
                        Ok(())
                    })
                    .await
                }
                .await;
                checked.map(|()| ContainerMessage::ToolCall(calls))
            }
            Ok(ContainerMessage::CodeOutput(out)) => self
                .with_session(session_id, |session| {
                    session.state = SessionState::Active;
                    Ok(())
                })
                .await
                .map(|()| ContainerMessage::CodeOutput(out)),
            Ok(ContainerMessage::Error(e)) => Err(PtcError::CodeExecutionError(e)),
            Ok(ContainerMessage::StreamEnded) => Err(PtcError::IpcError(
                "Sandbox container exited unexpectedly".into(),
            )),
            Ok(ContainerMessage::Ready) => Err(PtcError::UnexpectedMessage(
                "unexpected ready signal".into(),
            )),
            Err(e) => Err(e),
        };
        if outcome.is_err() {
            let _ = self.remove_session(session_id).await;
        }
        outcome
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

/// See [`PtcService::exchange_guard`].
struct ExchangeGuard {
    armed: bool,
    session_id: String,
    sessions: Arc<RwLock<HashMap<String, PtcSession>>>,
    handles: Arc<RwLock<HashMap<String, SessionHandle>>>,
    states: Arc<RwLock<HashMap<String, PtcExecutionState>>>,
    sandbox: Arc<SandboxExecutor>,
}

impl ExchangeGuard {
    fn disarm(mut self) {
        self.armed = false;
    }
}

impl Drop for ExchangeGuard {
    fn drop(&mut self) {
        if !self.armed {
            return;
        }
        let Ok(rt) = tokio::runtime::Handle::try_current() else {
            return;
        };
        let id = std::mem::take(&mut self.session_id);
        let sessions = Arc::clone(&self.sessions);
        let handles = Arc::clone(&self.handles);
        let states = Arc::clone(&self.states);
        let sandbox = Arc::clone(&self.sandbox);
        rt.spawn(async move {
            let session = sessions.write().await.remove(&id);
            if let Some(h) = handles.write().await.remove(&id) {
                h.abort.abort();
            }
            states.write().await.remove(&id);
            if let Some(s) = session {
                tracing::info!(session_id = %id, "PTC exchange cancelled; session removed");
                let _ = sandbox.stop_and_remove(&s.container.id).await;
            }
        });
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

    fn ptc_request(tools: Vec<serde_json::Value>) -> MessageRequest {
        let mut req = MessageRequest::new("claude", vec![], 100);
        req.tools = Some(tools);
        req
    }

    #[test]
    fn test_is_ptc_shaped() {
        let req = ptc_request(vec![
            serde_json::json!({"type": "code_execution_20250825", "name": "code_execution"}),
        ]);
        assert!(is_ptc_shaped(&req, Some(PTC_BETA_HEADER)));
        assert!(is_ptc_shaped(
            &req,
            Some("foo-2025-01-01, advanced-tool-use-2025-11-20")
        ));
        assert!(!is_ptc_shaped(&req, None));
        // Substring of another beta name is not the PTC beta.
        assert!(!is_ptc_shaped(
            &req,
            Some("x-advanced-tool-use-2025-11-20-y")
        ));
        let no_tool = ptc_request(vec![serde_json::json!({"name": "get_weather"})]);
        assert!(!is_ptc_shaped(&no_tool, Some(PTC_BETA_HEADER)));
    }

    #[test]
    fn test_callable_tools_filter() {
        let req = ptc_request(vec![
            serde_json::json!({"name": "a", "allowed_callers": ["code_execution_20250825"]}),
            serde_json::json!({"name": "b", "allowed_callers": ["direct"]}),
            serde_json::json!({"name": "c"}),
        ]);
        let names: Vec<_> = callable_tools(&req)
            .iter()
            .map(|t| t["name"].as_str().unwrap().to_string())
            .collect();
        assert_eq!(names, vec!["a"]);
    }

    #[test]
    fn test_parse_bool_env() {
        assert!(parse_bool_env(Some("true")));
        assert!(parse_bool_env(Some(" TRUE ")));
        assert!(parse_bool_env(Some("1")));
        assert!(!parse_bool_env(Some("false")));
        assert!(!parse_bool_env(Some("")));
        assert!(!parse_bool_env(None));
    }

    #[test]
    fn test_limits_from_values() {
        assert_eq!(
            PtcLimits::from_values(None, None, None),
            PtcLimits::default()
        );
        let l = PtcLimits::from_values(Some("10"), Some("2"), Some("5"));
        assert_eq!(l.max_sessions, 10);
        assert_eq!(l.max_sessions_per_owner, 2);
        assert_eq!(l.max_sessions_per_user, 5);
        assert_eq!(PtcLimits::default().max_sessions_per_user, 8);
        // Zero / garbage fall back to defaults.
        let l = PtcLimits::from_values(Some("0"), Some("abc"), Some("-1"));
        assert_eq!(l, PtcLimits::default());
    }

    #[test]
    fn test_check_session_caps() {
        let limits = PtcLimits {
            max_sessions: 3,
            max_sessions_per_owner: 2,
            max_sessions_per_user: 2,
        };
        assert!(check_session_caps(0, 0, None, &limits).is_ok());
        assert!(check_session_caps(2, 1, Some(1), &limits).is_ok());
        let e = check_session_caps(2, 2, None, &limits).unwrap_err();
        assert!(matches!(e, PtcError::SessionLimitExceeded(_)));
        assert_eq!(e.status_code(), 429);
        assert!(matches!(
            check_session_caps(3, 0, None, &limits),
            Err(PtcError::SessionLimitExceeded(_))
        ));
        // Per-user cap: one user's many keys cannot fill the global pool.
        let e = check_session_caps(2, 0, Some(2), &limits).unwrap_err();
        assert!(e.to_string().contains("per user"), "{e}");
    }

    #[test]
    fn test_tool_name_validation() {
        assert!(is_valid_tool_name("get_weather"));
        assert!(is_valid_tool_name("mcp-tool_2"));
        assert!(!is_valid_tool_name(""));
        assert!(!is_valid_tool_name("a\"; rm -rf /; echo \""));
        assert!(!is_valid_tool_name("$(id)"));
        assert!(!is_valid_tool_name("a,b"));
        assert!(!is_valid_tool_name("a b"));
        assert!(!is_valid_tool_name("ünïcode"));
        assert!(!is_valid_tool_name(&"a".repeat(MAX_TOOL_NAME_LEN + 1)));
        assert!(validate_tool_names(&["ok".into(), "also-ok".into()]).is_ok());
        assert!(matches!(
            validate_tool_names(&["ok".into(), "bad name".into()]),
            Err(PtcError::InvalidRequest(_))
        ));
    }

    fn call(id: &str, name: &str, input: serde_json::Value) -> ToolCallData {
        ToolCallData {
            tool_use_id: id.to_string(),
            name: name.to_string(),
            input,
        }
    }

    #[test]
    fn test_validate_sandbox_tool_calls() {
        let allowed = vec!["get_weather".to_string()];
        let ok = call(
            "toolu_000000000001",
            "get_weather",
            serde_json::json!({"q": 1}),
        );
        assert!(validate_sandbox_tool_calls(std::slice::from_ref(&ok), &allowed).is_ok());

        // Not in the callable set (forged frame).
        let forged = call("toolu_1", "delete_everything", serde_json::json!({}));
        assert!(matches!(
            validate_sandbox_tool_calls(&[forged], &allowed),
            Err(PtcError::InvalidToolCall(_))
        ));
        // Malformed id.
        for bad in ["srvtoolu_1", "toolu_", "toolu_a b", "x", "toolu_\n"] {
            let c = call(bad, "get_weather", serde_json::json!({}));
            assert!(
                validate_sandbox_tool_calls(&[c], &allowed).is_err(),
                "{bad}"
            );
        }
        // Duplicate ids.
        assert!(validate_sandbox_tool_calls(&[ok.clone(), ok.clone()], &allowed).is_err());
        // Non-object input.
        let c = call("toolu_2", "get_weather", serde_json::json!("str"));
        assert!(validate_sandbox_tool_calls(&[c], &allowed).is_err());
        // Oversized input.
        let big = serde_json::json!({"x": "a".repeat(MAX_TOOL_INPUT_BYTES)});
        let c = call("toolu_3", "get_weather", big);
        assert!(validate_sandbox_tool_calls(&[c], &allowed).is_err());
        // Empty / too many.
        assert!(validate_sandbox_tool_calls(&[], &allowed).is_err());
        let many: Vec<_> = (0..=MAX_TOOL_CALLS_PER_FRAME)
            .map(|i| call(&format!("toolu_{i}"), "get_weather", serde_json::json!({})))
            .collect();
        assert!(validate_sandbox_tool_calls(&many, &allowed).is_err());
        // No callable tools at all → nothing is allowed.
        assert!(validate_sandbox_tool_calls(std::slice::from_ref(&ok), &[]).is_err());
    }

    #[test]
    fn test_slot_reservation_released_on_drop() {
        let counts = Arc::new(std::sync::Mutex::new(ReservationCounts::default()));
        let reserve = |user: Option<&str>| {
            counts.lock().unwrap().add("k", user);
            SlotReservation {
                reservations: Arc::clone(&counts),
                owner: "k".into(),
                user: user.map(str::to_string),
            }
        };
        let a = reserve(Some("u"));
        let b = reserve(None);
        assert_eq!(counts.lock().unwrap().total(), 2);
        assert_eq!(counts.lock().unwrap().by_user.get("u"), Some(&1));
        drop(a);
        assert_eq!(counts.lock().unwrap().by_key.get("k"), Some(&1));
        assert!(!counts.lock().unwrap().by_user.contains_key("u"));
        drop(b);
        assert!(counts.lock().unwrap().by_key.is_empty());
    }

    #[test]
    fn test_session_absolute_lifetime() {
        let now = chrono::Utc::now();
        let mut s = PtcSession {
            id: "s".into(),
            container: ContainerInfo {
                id: "c".into(),
                name: "n".into(),
                created_at: now,
                running: true,
            },
            owner_key_hash: "k".into(),
            owner_user_id: None,
            allowed_tools: vec![],
            created_at: now,
            last_activity: now,
            pending_tool_calls: vec![],
            iteration_count: 0,
            state: SessionState::Active,
        };
        assert!(!s.is_expired(270));
        s.created_at = now - chrono::Duration::seconds(MAX_SESSION_LIFETIME_SECS as i64 + 5);
        assert!(
            s.is_expired(270),
            "activity must not extend past the lifetime"
        );
    }
}
