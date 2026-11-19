//! Docker sandbox executor for PTC
//!
//! This module handles the creation and management of Docker containers
//! for secure code execution in the PTC (Programmatic Tool Calling) system.
//!
//! The `CodeExecutor` trait provides a backend-agnostic interface for code execution
//! that can be shared between PTC (long-lived sessions) and Web Tools Dynamic Filtering
//! (one-shot execution).

use super::exceptions::{PtcError, PtcResult};
use super::runner;
use base64::Engine as _;
use bollard::container::{
    AttachContainerOptions, Config, CreateContainerOptions, LogOutput, LogsOptions,
    RemoveContainerOptions, StartContainerOptions, StopContainerOptions,
};
use bollard::exec::{CreateExecOptions, StartExecResults};
use bollard::Docker;
use futures::StreamExt;
use std::pin::Pin;
use std::sync::Arc;
use std::time::Duration;
use tokio::io::AsyncWriteExt;
use tokio::sync::{mpsc, Mutex as TokioMutex};
use tokio::task::JoinHandle;
use tokio::time::timeout;

// ============================================================================
// Code Executor Trait (shared abstraction)
// ============================================================================

/// Trait for one-shot code execution (run-and-discard).
/// Used by Web Tools Dynamic Filtering and other features that need
/// code execution without long-lived sessions.
#[async_trait::async_trait]
pub trait CodeExecutor: Send + Sync {
    async fn execute(&self, code: &str, language: &str) -> Result<ExecutionResult, PtcError>;
}

/// One-shot code executor using Docker containers (creates and destroys per call).
pub struct OneshotExecutor {
    sandbox: Arc<SandboxExecutor>,
}

impl OneshotExecutor {
    pub fn new(sandbox: Arc<SandboxExecutor>) -> Self {
        Self { sandbox }
    }
}

#[async_trait::async_trait]
impl CodeExecutor for OneshotExecutor {
    async fn execute(&self, code: &str, language: &str) -> Result<ExecutionResult, PtcError> {
        let cmd: Vec<&str> = match language {
            "python" | "py" => vec!["python", "-c", code],
            "bash" | "sh" => vec!["bash", "-c", code],
            _ => vec!["python", "-c", code],
        };

        // The container's main process only keeps it alive for the exec; the
        // code itself runs via `docker exec` (output capped in
        // `collect_exec_output`).
        let keepalive = (self.sandbox.config().execution_timeout + 30).to_string();
        let container = self
            .sandbox
            .create_container(None, vec!["sleep".to_string(), keepalive], Vec::new())
            .await?;
        // Removes the container even if this future is dropped mid-way
        // (client disconnect).
        let guard = ContainerCleanupGuard::new(Arc::clone(&self.sandbox), container.id.clone());

        let result = match self.sandbox.start_container(&container.id).await {
            Ok(()) => self.sandbox.exec_command(&container.id, cmd).await,
            Err(e) => Err(e),
        };

        // Always clean up (also on start failure). The removal runs on a
        // spawned task, so dropping this future mid-removal cannot cancel
        // it; the guard is disarmed only once removal has completed (a
        // failed removal leaves it armed → one retry on drop).
        if let Ok(Ok(())) = spawn_remove(&self.sandbox, container.id.clone()).await {
            guard.disarm();
        }

        result
    }
}

/// Remove a container on a spawned task. Awaiting the returned handle waits
/// for completion, but dropping the awaiting future (client disconnect)
/// does not cancel the removal — callers that already dropped their
/// ownership record (session map entry, armed guard) use this so no
/// cancellation point exists between "forgotten" and "removed".
pub fn spawn_remove(
    sandbox: &Arc<SandboxExecutor>,
    container_id: String,
) -> JoinHandle<PtcResult<()>> {
    let sandbox = Arc::clone(sandbox);
    tokio::spawn(async move { sandbox.stop_and_remove(&container_id).await })
}

/// Removes a created container when dropped while still armed — makes
/// create → start → (exchange) sequences cancellation-safe: if the request
/// future is dropped (client disconnect) between `create_container` and the
/// point where ownership is handed over, removal is spawned on the runtime.
pub struct ContainerCleanupGuard {
    sandbox: Arc<SandboxExecutor>,
    container_id: String,
    armed: std::sync::atomic::AtomicBool,
}

impl ContainerCleanupGuard {
    pub fn new(sandbox: Arc<SandboxExecutor>, container_id: String) -> Self {
        Self {
            sandbox,
            container_id,
            armed: std::sync::atomic::AtomicBool::new(true),
        }
    }

    /// Ownership handed over (or removal done explicitly): do nothing on drop.
    pub fn disarm(&self) {
        self.armed.store(false, std::sync::atomic::Ordering::SeqCst);
    }
}

impl Drop for ContainerCleanupGuard {
    fn drop(&mut self) {
        if !self.armed.load(std::sync::atomic::Ordering::SeqCst) {
            return;
        }
        let sandbox = Arc::clone(&self.sandbox);
        let id = std::mem::take(&mut self.container_id);
        if let Ok(rt) = tokio::runtime::Handle::try_current() {
            rt.spawn(async move {
                if let Err(e) = sandbox.stop_and_remove(&id).await {
                    tracing::debug!(container_id = %id, error = %e, "Cancelled PTC container removal failed");
                } else {
                    tracing::debug!(container_id = %id, "Removed PTC container after cancellation");
                }
            });
        }
    }
}

// ============================================================================
// Configuration
// ============================================================================

/// Default Docker image for sandbox execution. A mutable tag: operators
/// should pin a digest via `PTC_IMAGE` (`python:3.11-slim@sha256:…`); a
/// startup warning is logged while the image is unpinned.
pub const DEFAULT_SANDBOX_IMAGE: &str = "python:3.11-slim";

/// Whether an image reference is pinned by content digest.
pub fn image_is_digest_pinned(image: &str) -> bool {
    image
        .split_once("@sha256:")
        .is_some_and(|(_, d)| d.len() == 64 && d.bytes().all(|b| b.is_ascii_hexdigit()))
}

/// Container name prefix of every sandbox container (used by the startup
/// orphan sweep).
pub const SANDBOX_NAME_PREFIX: &str = "ptc_sandbox_";

/// Orphan sweep: a container that was created but never started is
/// abandoned after this long (start follows create within milliseconds).
/// Age is measured on the daemon's clock when `/info` answers; the margin
/// (minutes, not seconds) also absorbs gateway↔daemon skew on the
/// local-clock fallback. A never-started container runs nothing, so a late
/// removal is harmless.
const ORPHAN_CREATED_MIN_AGE_SECS: i64 = 600;
/// Orphan sweep: a running sandbox older than this cannot belong to a live
/// session of any instance running this version (hard session lifetime
/// `MAX_SESSION_LIFETIME_SECS` = 30 min); the other 30 min are margin for
/// clock skew on the local-clock fallback. Instances *older* than the
/// lifetime cap have no such bound — drain PTC (or set `PTC_ENABLED=false`)
/// for the stop-the-world upgrade.
const ORPHAN_RUNNING_MIN_AGE_SECS: i64 = 3600;

/// Parse the daemon's `SystemTime` (RFC 3339, nanosecond precision) into a
/// Unix timestamp; `None` when absent or unparsable.
fn daemon_now(system_time: Option<&str>) -> Option<i64> {
    chrono::DateTime::parse_from_rfc3339(system_time?.trim())
        .ok()
        .map(|t| t.timestamp())
}

/// Whether a listed container is a leftover sandbox to remove at startup.
/// Age thresholds keep the sweep safe when several gateway instances share
/// one Docker daemon.
pub fn is_orphan_sandbox(names: &[String], state: &str, created: i64, now: i64) -> bool {
    let ours = names
        .iter()
        .any(|n| n.trim_start_matches('/').starts_with(SANDBOX_NAME_PREFIX));
    if !ours {
        return false;
    }
    let age = now.saturating_sub(created);
    match state {
        "created" => age >= ORPHAN_CREATED_MIN_AGE_SECS,
        "running" | "paused" | "restarting" => age >= ORPHAN_RUNNING_MIN_AGE_SECS,
        // exited / dead: nothing runs, always safe to remove.
        _ => true,
    }
}

/// uid:gid code runs as inside sandbox containers (`nobody`).
const SANDBOX_USER: &str = "65534:65534";
/// Max processes / threads per sandbox container.
const SANDBOX_PIDS_LIMIT: i64 = 128;

/// Default memory limit for containers (256MB)
pub const DEFAULT_MEMORY_LIMIT: i64 = 256 * 1024 * 1024;

/// Default CPU period (100ms)
pub const DEFAULT_CPU_PERIOD: i64 = 100_000;

/// Default CPU quota (50% of one core)
pub const DEFAULT_CPU_QUOTA: i64 = 50_000;

/// Default execution timeout in seconds
pub const DEFAULT_EXECUTION_TIMEOUT: u64 = 60;

/// Default session timeout in seconds (4.5 minutes)
pub const DEFAULT_SESSION_TIMEOUT: u64 = 270;

/// Size of the writable tmpfs mounted at `/tmp` (the root filesystem is
/// read-only).
pub const DEFAULT_TMPFS_SIZE: &str = "64m";

/// Env var overriding the sandbox image (operators can pin by digest,
/// e.g. `python:3.11-slim@sha256:...`).
pub const PTC_IMAGE_ENV: &str = "PTC_IMAGE";

/// Max bytes buffered for one in-flight IPC frame (per stream). Beyond this
/// the reader reports an error and stops; the session (and its container)
/// is then torn down by the service.
pub const MAX_FRAME_BYTES: usize = 4 * 1024 * 1024;

/// Max combined stdout+stderr bytes collected from a one-shot exec.
pub const MAX_EXEC_OUTPUT_BYTES: usize = 4 * 1024 * 1024;

/// Max payload bytes of parsed frames queued per session between the reader
/// task and the request awaiting them.
pub const MAX_QUEUED_FRAME_BYTES: usize = 8 * 1024 * 1024;

/// Depth of the reader → handle channel. With one solicited frame per
/// exchange, a handful of slots covers the frame plus a terminal error /
/// stream-end notice.
const READER_CHANNEL_DEPTH: usize = 4;

/// State shared by a [`ContainerHandle`] and its background reader.
///
/// The runner answers every host message (code, tool results) — and its
/// startup — with exactly one frame. `awaiting` is set when the host sends
/// and consumed by the next frame; a frame arriving while nothing awaits is
/// unsolicited (model code writing raw frames to fd 1/2) and poisons the
/// session: the reader stops and removes the container.
#[derive(Debug)]
pub struct ReaderState {
    awaiting: std::sync::atomic::AtomicBool,
    queued_bytes: std::sync::atomic::AtomicUsize,
    poisoned: std::sync::atomic::AtomicBool,
    budget: usize,
}

impl ReaderState {
    fn new(budget: usize) -> Self {
        Self {
            // The runner's `__READY__` is expected right after start.
            awaiting: std::sync::atomic::AtomicBool::new(true),
            queued_bytes: std::sync::atomic::AtomicUsize::new(0),
            poisoned: std::sync::atomic::AtomicBool::new(false),
            budget,
        }
    }

    /// Admit one parsed frame of `size` payload bytes into the queue.
    fn admit(&self, size: usize) -> Result<(), String> {
        use std::sync::atomic::Ordering::SeqCst;
        if !self.awaiting.swap(false, SeqCst) {
            self.poisoned.store(true, SeqCst);
            return Err("Unsolicited sandbox frame; session terminated".to_string());
        }
        let queued = self.queued_bytes.load(SeqCst);
        if queued.saturating_add(size) > self.budget {
            self.poisoned.store(true, SeqCst);
            return Err(format!(
                "Sandbox frames exceeded the {}-byte queue budget; session terminated",
                self.budget
            ));
        }
        self.queued_bytes.fetch_add(size, SeqCst);
        Ok(())
    }

    fn expect_reply(&self) {
        self.awaiting
            .store(true, std::sync::atomic::Ordering::SeqCst);
    }

    fn consumed(&self, size: usize) {
        let _ = self.queued_bytes.try_update(
            std::sync::atomic::Ordering::SeqCst,
            std::sync::atomic::Ordering::SeqCst,
            |q| Some(q.saturating_sub(size)),
        );
    }

    /// The reader saw an unsolicited / over-budget frame.
    pub fn is_poisoned(&self) -> bool {
        self.poisoned.load(std::sync::atomic::Ordering::SeqCst)
    }
}

// ============================================================================
// Sandbox Configuration
// ============================================================================

/// Configuration for the Docker sandbox
#[derive(Debug, Clone)]
pub struct SandboxConfig {
    /// Docker image to use
    pub image: String,
    /// Memory limit in bytes
    pub memory_limit: i64,
    /// CPU period in microseconds
    pub cpu_period: i64,
    /// CPU quota in microseconds
    pub cpu_quota: i64,
    /// Execution timeout in seconds
    pub execution_timeout: u64,
    /// Whether network is disabled
    pub network_disabled: bool,
    /// Working directory in container
    pub working_dir: String,
    /// Size of the tmpfs mounted at /tmp
    pub tmpfs_size: String,
}

impl SandboxConfig {
    /// Default configuration with the image taken from `PTC_IMAGE` (if set
    /// and non-empty).
    pub fn from_env() -> Self {
        let mut cfg = Self::default();
        if let Ok(image) = std::env::var(PTC_IMAGE_ENV) {
            let image = image.trim();
            if !image.is_empty() {
                cfg.image = image.to_string();
            }
        }
        cfg
    }
}

impl Default for SandboxConfig {
    fn default() -> Self {
        Self {
            image: DEFAULT_SANDBOX_IMAGE.to_string(),
            memory_limit: DEFAULT_MEMORY_LIMIT,
            cpu_period: DEFAULT_CPU_PERIOD,
            cpu_quota: DEFAULT_CPU_QUOTA,
            execution_timeout: DEFAULT_EXECUTION_TIMEOUT,
            network_disabled: true,
            working_dir: "/tmp".to_string(),
            tmpfs_size: DEFAULT_TMPFS_SIZE.to_string(),
        }
    }
}

// ============================================================================
// Container Info
// ============================================================================

/// Information about a running container
#[derive(Debug, Clone)]
pub struct ContainerInfo {
    /// Container ID
    pub id: String,
    /// Container name
    pub name: String,
    /// Creation timestamp
    pub created_at: chrono::DateTime<chrono::Utc>,
    /// Whether the container is running
    pub running: bool,
}

// ============================================================================
// Execution Result
// ============================================================================

/// Result of code execution in the sandbox
#[derive(Debug, Clone)]
pub struct ExecutionResult {
    /// Standard output
    pub stdout: String,
    /// Standard error
    pub stderr: String,
    /// Exit code
    pub exit_code: i64,
    /// Whether execution timed out
    pub timed_out: bool,
}

impl ExecutionResult {
    /// Check if execution was successful
    pub fn is_success(&self) -> bool {
        self.exit_code == 0 && !self.timed_out
    }
}

// ============================================================================
// Container Handle (persistent attach connection)
// ============================================================================

/// A parsed tool call from the sandbox runner.
#[derive(Debug, Clone, serde::Serialize, serde::Deserialize)]
pub struct ToolCallData {
    pub tool_use_id: String,
    pub name: String,
    pub input: serde_json::Value,
}

/// Parsed code execution output from the sandbox runner.
#[derive(Debug, Clone)]
pub struct CodeOutputData {
    pub stdout: String,
    pub stderr: String,
    pub exit_code: i64,
}

/// Messages received from a sandbox container via the attach stream.
#[derive(Debug)]
pub enum ContainerMessage {
    /// Runner is ready for code
    Ready,
    /// Runner is requesting tool calls
    ToolCall(Vec<ToolCallData>),
    /// Code execution completed
    CodeOutput(CodeOutputData),
    /// An error occurred
    Error(String),
    /// The output stream ended (container exited)
    StreamEnded,
}

/// Persistent bidirectional connection to a sandbox container.
///
/// Created by [`SandboxExecutor::attach_and_start`]. Wraps:
/// - An async writer for the container's stdin
/// - A channel receiver for parsed messages from a background reader task
pub struct ContainerHandle {
    /// Writer to container stdin
    stdin: Arc<TokioMutex<Pin<Box<dyn tokio::io::AsyncWrite + Send>>>>,
    /// Receiver for parsed messages (+ their queued payload size) from the
    /// background reader
    messages_rx: mpsc::Receiver<(ContainerMessage, usize)>,
    /// Handle for the background reader task
    reader_task: JoinHandle<()>,
    /// Exchange / queue-budget state shared with the reader
    state: Arc<ReaderState>,
}

impl ContainerHandle {
    /// Send a code block to the container for execution.
    pub async fn send_code(&self, code: &str) -> PtcResult<()> {
        let payload = format!(
            "{}\n{}\n{}\n",
            runner::IPC_CODE_START,
            b64_encode(code.as_bytes()),
            runner::IPC_CODE_END
        );
        self.state.expect_reply();
        let mut stdin = self.stdin.lock().await;
        stdin
            .write_all(payload.as_bytes())
            .await
            .map_err(|e| PtcError::IpcError(format!("Failed to send code: {e}")))?;
        stdin
            .flush()
            .await
            .map_err(|e| PtcError::IpcError(format!("Failed to flush stdin: {e}")))?;
        Ok(())
    }

    /// Send tool results back to the container.
    pub async fn send_tool_result(&self, results: &serde_json::Value) -> PtcResult<()> {
        let json_str = serde_json::to_string(results)
            .map_err(|e| PtcError::IpcError(format!("Failed to serialize tool results: {e}")))?;
        let payload = format!(
            "{}{}{}\n",
            runner::IPC_TOOL_RESULT_START,
            b64_encode(json_str.as_bytes()),
            runner::IPC_TOOL_RESULT_END
        );
        self.state.expect_reply();
        let mut stdin = self.stdin.lock().await;
        stdin
            .write_all(payload.as_bytes())
            .await
            .map_err(|e| PtcError::IpcError(format!("Failed to send tool result: {e}")))?;
        stdin
            .flush()
            .await
            .map_err(|e| PtcError::IpcError(format!("Failed to flush stdin: {e}")))?;
        Ok(())
    }

    /// Receive the next message from the container.
    pub async fn recv_message(&mut self) -> PtcResult<ContainerMessage> {
        let (msg, size) = self.messages_rx.recv().await.ok_or(PtcError::IpcError(
            "Container stream ended unexpectedly".into(),
        ))?;
        self.state.consumed(size);
        Ok(msg)
    }

    /// Receive the next message with a timeout.
    pub async fn recv_message_timeout(
        &mut self,
        duration: Duration,
    ) -> PtcResult<ContainerMessage> {
        timeout(duration, self.recv_message())
            .await
            .map_err(|_| PtcError::ExecutionTimeout(duration.as_secs()))?
    }

    /// Shut down the background reader.
    pub fn shutdown(&self) {
        self.reader_task.abort();
    }

    /// Abort handle for the background reader, usable without locking the
    /// handle (the handle may be held by an in-flight exchange).
    pub fn reader_abort_handle(&self) -> tokio::task::AbortHandle {
        self.reader_task.abort_handle()
    }

    /// Shared reader state (poison flag), readable without the handle lock.
    pub fn reader_state(&self) -> Arc<ReaderState> {
        Arc::clone(&self.state)
    }
}

impl Drop for ContainerHandle {
    fn drop(&mut self) {
        self.reader_task.abort();
    }
}

// ============================================================================
// Sandbox Executor
// ============================================================================

/// Docker sandbox executor for secure code execution
pub struct SandboxExecutor {
    /// Docker client
    docker: Docker,
    /// Sandbox configuration
    config: SandboxConfig,
}

impl SandboxExecutor {
    /// Create a new sandbox executor with default configuration
    pub async fn new() -> PtcResult<Self> {
        Self::with_config(SandboxConfig::default()).await
    }

    /// Create a new sandbox executor with custom configuration
    pub async fn with_config(config: SandboxConfig) -> PtcResult<Self> {
        let docker = Docker::connect_with_local_defaults()
            .map_err(|e| PtcError::DockerNotAvailable(e.to_string()))?;

        // Test Docker connection
        docker
            .ping()
            .await
            .map_err(|e| PtcError::DockerNotAvailable(format!("Failed to ping Docker: {e}")))?;

        Ok(Self { docker, config })
    }

    /// Check if Docker is available
    pub async fn is_available(&self) -> bool {
        self.docker.ping().await.is_ok()
    }

    /// Get the sandbox configuration
    pub fn config(&self) -> &SandboxConfig {
        &self.config
    }

    /// Get Docker version info
    pub async fn version(&self) -> PtcResult<String> {
        let version = self
            .docker
            .version()
            .await
            .map_err(|e| PtcError::DockerNotAvailable(e.to_string()))?;

        Ok(format!(
            "Docker {} (API {})",
            version.version.unwrap_or_default(),
            version.api_version.unwrap_or_default()
        ))
    }

    // ========================================================================
    // Container Lifecycle
    // ========================================================================

    /// Create a PTC runner container: the runner script runs inline as the
    /// main process, callable tool names are passed via `PTC_TOOLS`.
    /// `tool_names` must already be validated (`[A-Za-z0-9_-]`).
    pub async fn create_runner_container(&self, tool_names: &[String]) -> PtcResult<ContainerInfo> {
        let env = vec![format!("PTC_TOOLS={}", tool_names.join(","))];
        self.create_container(None, runner::runner_command(), env)
            .await
    }

    /// Create a new (not started) container for code execution.
    pub async fn create_container(
        &self,
        name: Option<&str>,
        cmd: Vec<String>,
        env: Vec<String>,
    ) -> PtcResult<ContainerInfo> {
        // Generate container name if not provided
        let container_name = name
            .map(|n| n.to_string())
            .unwrap_or_else(|| format!("ptc_sandbox_{}", uuid::Uuid::new_v4()));

        // Build container config
        let host_config = bollard::service::HostConfig {
            memory: Some(self.config.memory_limit),
            cpu_period: Some(self.config.cpu_period),
            cpu_quota: Some(self.config.cpu_quota),
            network_mode: if self.config.network_disabled {
                Some("none".to_string())
            } else {
                None
            },
            security_opt: Some(vec!["no-new-privileges".to_string()]),
            cap_drop: Some(vec!["ALL".to_string()]),
            // Fork-bomb guard for model-written code.
            pids_limit: Some(SANDBOX_PIDS_LIMIT),
            // No swap beyond the memory limit.
            memory_swap: Some(self.config.memory_limit),
            // Immutable image filesystem; the only writable path is a
            // size-limited tmpfs at /tmp.
            readonly_rootfs: Some(true),
            tmpfs: Some(std::collections::HashMap::from([(
                "/tmp".to_string(),
                format!("rw,nosuid,nodev,size={},mode=1777", self.config.tmpfs_size),
            )])),
            // The daemon removes the container as soon as it exits, so a
            // crashed runner never lingers (explicit removal still runs on
            // every teardown path).
            auto_remove: Some(true),
            ..Default::default()
        };

        let config = Config {
            image: Some(self.config.image.clone()),
            working_dir: Some(self.config.working_dir.clone()),
            // Unprivileged inside the container.
            user: Some(SANDBOX_USER.to_string()),
            env: if env.is_empty() { None } else { Some(env) },
            host_config: Some(host_config),
            tty: Some(false), // Disable TTY for multiplexed stdout/stderr separation
            attach_stdin: Some(true),
            attach_stdout: Some(true),
            attach_stderr: Some(true),
            open_stdin: Some(true),
            cmd: Some(cmd),
            ..Default::default()
        };

        let options = CreateContainerOptions {
            name: container_name.as_str(),
            platform: None,
        };

        // Create the container
        let response = self
            .docker
            .create_container(Some(options), config)
            .await
            .map_err(|e| PtcError::ContainerCreationFailed(e.to_string()))?;

        Ok(ContainerInfo {
            id: response.id,
            name: container_name,
            created_at: chrono::Utc::now(),
            running: false,
        })
    }

    /// Start a container
    pub async fn start_container(&self, container_id: &str) -> PtcResult<()> {
        self.docker
            .start_container(container_id, None::<StartContainerOptions<String>>)
            .await
            .map_err(|e| PtcError::ContainerStartFailed(e.to_string()))?;

        Ok(())
    }

    /// Stop a container
    pub async fn stop_container(&self, container_id: &str) -> PtcResult<()> {
        let options = StopContainerOptions { t: 5 }; // 5 second timeout

        self.docker
            .stop_container(container_id, Some(options))
            .await
            .map_err(|e| PtcError::Internal(format!("Failed to stop container: {e}")))?;

        Ok(())
    }

    /// Remove a container
    pub async fn remove_container(&self, container_id: &str) -> PtcResult<()> {
        let options = RemoveContainerOptions {
            force: true,
            ..Default::default()
        };

        self.docker
            .remove_container(container_id, Some(options))
            .await
            .map_err(|e| PtcError::Internal(format!("Failed to remove container: {e}")))?;

        Ok(())
    }

    /// Get container logs
    pub async fn get_logs(&self, container_id: &str) -> PtcResult<(String, String)> {
        let options = LogsOptions::<String> {
            stdout: true,
            stderr: true,
            tail: "all".to_string(),
            ..Default::default()
        };

        let mut stdout = String::new();
        let mut stderr = String::new();

        let mut stream = self.docker.logs(container_id, Some(options));

        while let Some(result) = stream.next().await {
            match result {
                Ok(LogOutput::StdOut { message }) => {
                    stdout.push_str(&String::from_utf8_lossy(&message));
                }
                Ok(LogOutput::StdErr { message }) => {
                    stderr.push_str(&String::from_utf8_lossy(&message));
                }
                Ok(_) => {}
                Err(e) => {
                    tracing::warn!("Error reading container logs: {}", e);
                }
            }
        }

        Ok((stdout, stderr))
    }

    // ========================================================================
    // Code Execution
    // ========================================================================

    /// Execute a command in the container
    pub async fn exec_command(
        &self,
        container_id: &str,
        command: Vec<&str>,
    ) -> PtcResult<ExecutionResult> {
        self.exec_command_with_timeout(container_id, command, self.config.execution_timeout)
            .await
    }

    /// Execute a command with custom timeout
    pub async fn exec_command_with_timeout(
        &self,
        container_id: &str,
        command: Vec<&str>,
        timeout_secs: u64,
    ) -> PtcResult<ExecutionResult> {
        let exec_config = CreateExecOptions {
            cmd: Some(command.iter().map(|s| s.to_string()).collect()),
            attach_stdout: Some(true),
            attach_stderr: Some(true),
            working_dir: Some(self.config.working_dir.clone()),
            user: Some(SANDBOX_USER.to_string()),
            ..Default::default()
        };

        // Create exec instance
        let exec = self
            .docker
            .create_exec(container_id, exec_config)
            .await
            .map_err(|e| PtcError::ExecFailed(format!("Failed to create exec: {e}")))?;

        // Start exec and collect output with timeout
        let exec_result = timeout(
            Duration::from_secs(timeout_secs),
            self.collect_exec_output(&exec.id),
        )
        .await;

        match exec_result {
            Ok(Ok(result)) => Ok(result),
            Ok(Err(e)) => Err(e),
            Err(_) => Ok(ExecutionResult {
                stdout: String::new(),
                stderr: "Execution timed out".to_string(),
                exit_code: -1,
                timed_out: true,
            }),
        }
    }

    /// Collect output from an exec instance
    async fn collect_exec_output(&self, exec_id: &str) -> PtcResult<ExecutionResult> {
        let start_result = self
            .docker
            .start_exec(exec_id, None)
            .await
            .map_err(|e| PtcError::ExecFailed(format!("Failed to start exec: {e}")))?;

        let mut out = CappedOutput::new(MAX_EXEC_OUTPUT_BYTES);

        if let StartExecResults::Attached { mut output, .. } = start_result {
            while let Some(result) = output.next().await {
                let full = match result {
                    Ok(LogOutput::StdOut { message }) => out.push_stdout(&message),
                    Ok(LogOutput::StdErr { message }) => out.push_stderr(&message),
                    Ok(_) => false,
                    Err(e) => {
                        tracing::warn!("Error reading exec output: {}", e);
                        false
                    }
                };
                if full {
                    // Stop reading; the caller removes the container.
                    tracing::warn!(
                        limit = MAX_EXEC_OUTPUT_BYTES,
                        "Sandbox exec output exceeded limit; truncated"
                    );
                    break;
                }
            }
        }
        let (stdout, stderr, truncated) = out.finish();

        // Get exit code
        let inspect = self
            .docker
            .inspect_exec(exec_id)
            .await
            .map_err(|e| PtcError::ExecFailed(format!("Failed to inspect exec: {e}")))?;

        let exit_code = if truncated {
            -1
        } else {
            inspect.exit_code.unwrap_or(-1)
        };

        Ok(ExecutionResult {
            stdout,
            stderr,
            exit_code,
            timed_out: false,
        })
    }

    // ========================================================================
    // Convenience Methods
    // ========================================================================

    /// Attach to a created runner container and start it.
    ///
    /// Returns a `ContainerHandle` for persistent bidirectional communication.
    ///
    /// Attach happens **before** start so we catch the runner's `__READY__` signal.
    pub async fn attach_and_start(&self, container_id: &str) -> PtcResult<ContainerHandle> {
        // Attach before starting to capture all output
        let attach_options = AttachContainerOptions::<String> {
            stdin: Some(true),
            stdout: Some(true),
            stderr: Some(true),
            stream: Some(true),
            logs: Some(false),
            ..Default::default()
        };

        let attach_result = self
            .docker
            .attach_container(container_id, Some(attach_options))
            .await
            .map_err(|e| PtcError::AttachFailed(format!("Failed to attach: {e}")))?;

        // Now start the container (runner.py begins executing)
        self.start_container(container_id).await?;

        // Split attach result into input (stdin writer) and output (stream reader)
        let stdin_writer = Arc::new(TokioMutex::new(attach_result.input));
        let mut output_stream = attach_result.output;

        // Create channel for parsed messages
        let (tx, rx) = mpsc::channel::<(ContainerMessage, usize)>(READER_CHANNEL_DEPTH);
        let state = Arc::new(ReaderState::new(MAX_QUEUED_FRAME_BYTES));
        let reader_state = Arc::clone(&state);
        let docker = self.docker.clone();
        let container_id = container_id.to_string();

        // Spawn background reader task
        let reader_task = tokio::spawn(async move {
            let mut stdout_buf = String::new();
            let mut stderr_buf = String::new();

            while let Some(result) = output_stream.next().await {
                let parsed = match result {
                    Ok(LogOutput::StdOut { message }) => {
                        stdout_buf.push_str(&String::from_utf8_lossy(&message));
                        parse_stdout_frames(&mut stdout_buf)
                    }
                    Ok(LogOutput::StdErr { message }) => {
                        stderr_buf.push_str(&String::from_utf8_lossy(&message));
                        parse_stderr_frames(&mut stderr_buf)
                    }
                    Ok(_) => Ok(Vec::new()), // StdIn echo, Console — ignore
                    Err(e) => Err(format!("Stream error: {e}")),
                };
                let mut fatal = None;
                match parsed {
                    Ok(frames) => {
                        for (msg, size) in frames {
                            if let Err(e) = reader_state.admit(size) {
                                fatal = Some(e);
                                break;
                            }
                            if tx.send((msg, size)).await.is_err() {
                                return; // handle dropped
                            }
                        }
                    }
                    Err(e) => fatal = Some(e),
                }
                if let Some(e) = fatal {
                    // Oversized / unsolicited frame or stream failure: report
                    // and stop reading; the service tears the session down.
                    // A poisoned container is removed right away — nothing
                    // may wait on the session for its expiry.
                    if reader_state.is_poisoned() {
                        tracing::warn!(container_id = %container_id, error = %e, "PTC sandbox poisoned; removing container");
                        let opts = RemoveContainerOptions {
                            force: true,
                            ..Default::default()
                        };
                        let _ = docker.remove_container(&container_id, Some(opts)).await;
                    }
                    let _ = tx.send((ContainerMessage::Error(e), 0)).await;
                    break;
                }
            }

            let _ = tx.send((ContainerMessage::StreamEnded, 0)).await;
        });

        Ok(ContainerHandle {
            stdin: stdin_writer,
            messages_rx: rx,
            reader_task,
            state,
        })
    }

    /// Kill and remove a container in one step (`force` removal kills a
    /// running container; callers ignore a 404 after `auto_remove`).
    pub async fn stop_and_remove(&self, container_id: &str) -> PtcResult<()> {
        self.remove_container(container_id).await
    }

    /// Check if a container exists
    pub async fn container_exists(&self, container_id: &str) -> bool {
        self.docker
            .inspect_container(container_id, None)
            .await
            .is_ok()
    }

    /// Remove leftover `ptc_sandbox_*` containers (crash / cancelled create
    /// before the drop guards existed). Age thresholds in
    /// [`is_orphan_sandbox`] keep live containers of other instances on the
    /// same daemon. Returns the number removed; errors are logged.
    pub async fn sweep_orphan_containers(&self) -> usize {
        use bollard::container::ListContainersOptions;
        let opts = ListContainersOptions::<String> {
            all: true,
            filters: std::collections::HashMap::from([(
                "name".to_string(),
                vec![SANDBOX_NAME_PREFIX.to_string()],
            )]),
            ..Default::default()
        };
        let list = match self.docker.list_containers(Some(opts)).await {
            Ok(l) => l,
            Err(e) => {
                tracing::warn!(error = %e, "PTC orphan sweep: listing containers failed");
                return 0;
            }
        };
        // Container `created` timestamps come from the daemon's clock; age
        // is measured against the daemon's own `SystemTime` (`/info`) so a
        // skewed gateway clock (or a remote daemon) cannot make a live
        // container of another instance look old. Fallback: the local
        // clock, with the thresholds' built-in margin (see
        // `ORPHAN_*_MIN_AGE_SECS`).
        let now = match self.docker.info().await {
            Ok(info) => daemon_now(info.system_time.as_deref()),
            Err(e) => {
                tracing::debug!(error = %e, "PTC orphan sweep: docker info failed; using local clock");
                None
            }
        }
        .unwrap_or_else(|| chrono::Utc::now().timestamp());
        let mut removed = 0;
        for c in list {
            let names = c.names.unwrap_or_default();
            let state = c.state.unwrap_or_default();
            let Some(id) = c.id else { continue };
            if !is_orphan_sandbox(&names, &state, c.created.unwrap_or(now), now) {
                continue;
            }
            match self.remove_container(&id).await {
                Ok(()) => removed += 1,
                Err(e) => {
                    tracing::debug!(container_id = %id, error = %e, "PTC orphan removal failed")
                }
            }
        }
        if removed > 0 {
            tracing::info!(removed, "Removed orphaned PTC sandbox containers");
        }
        removed
    }

    /// Check if a container is running
    pub async fn is_container_running(&self, container_id: &str) -> bool {
        if let Ok(info) = self.docker.inspect_container(container_id, None).await {
            info.state.and_then(|s| s.running).unwrap_or(false)
        } else {
            false
        }
    }
}

// ============================================================================
// Boundary Marker Parsers (used by the background reader task)
// ============================================================================

fn b64_encode(data: &[u8]) -> String {
    base64::engine::general_purpose::STANDARD.encode(data)
}

/// Decode a base64 frame payload into a JSON value.
fn decode_frame_json(payload: &str) -> Result<serde_json::Value, String> {
    let bytes = base64::engine::general_purpose::STANDARD
        .decode(payload.trim().as_bytes())
        .map_err(|e| format!("invalid base64 frame: {e}"))?;
    serde_json::from_slice(&bytes).map_err(|e| format!("invalid frame JSON: {e}"))
}

/// One frame type recognised on a stream: start marker, optional end marker
/// (`None` = bare signal such as `__READY__`).
type FrameSpec = (&'static str, Option<&'static str>);

/// Extract every complete frame from `buf`, in stream order.
///
/// Returns `(spec index, payload)` pairs. Bytes outside frames are noise
/// (stray writes straight to fd 1/2) and are discarded, keeping only a tail
/// that could still be the beginning of a marker, so the buffer never grows
/// without a frame in flight. An in-flight frame larger than `max_frame`
/// is an error (the caller tears the session down).
fn drain_frames(
    buf: &mut String,
    specs: &[FrameSpec],
    max_frame: usize,
) -> Result<Vec<(usize, String)>, String> {
    let mut out = Vec::new();
    loop {
        let earliest = specs
            .iter()
            .enumerate()
            .filter_map(|(i, (start, _))| buf.find(start).map(|pos| (pos, i)))
            .min();
        let Some((pos, i)) = earliest else {
            // No marker: keep at most (longest marker - 1) trailing bytes.
            let keep = specs.iter().map(|(s, _)| s.len()).max().unwrap_or(1) - 1;
            if buf.len() > keep {
                let mut cut = buf.len() - keep;
                while !buf.is_char_boundary(cut) {
                    cut += 1;
                }
                buf.drain(..cut);
            }
            break;
        };
        buf.drain(..pos);
        let (start, end) = specs[i];
        match end {
            None => {
                let mut consume = start.len();
                if buf[consume..].starts_with('\n') {
                    consume += 1;
                }
                buf.drain(..consume);
                out.push((i, String::new()));
            }
            Some(end) => {
                let payload_start = start.len();
                let Some(end_rel) = buf[payload_start..].find(end) else {
                    break; // incomplete frame — wait for more data
                };
                let payload = buf[payload_start..payload_start + end_rel].to_string();
                let mut consume = payload_start + end_rel + end.len();
                if buf[consume..].starts_with('\n') {
                    consume += 1;
                }
                buf.drain(..consume);
                out.push((i, payload));
            }
        }
    }
    if buf.len() > max_frame {
        buf.clear();
        return Err(format!(
            "Sandbox output frame exceeded the {max_frame}-byte limit"
        ));
    }
    Ok(out)
}

fn parse_code_output(payload: &str) -> ContainerMessage {
    match decode_frame_json(payload) {
        Ok(val) => ContainerMessage::CodeOutput(CodeOutputData {
            stdout: val
                .get("stdout")
                .and_then(|v| v.as_str())
                .unwrap_or("")
                .to_string(),
            stderr: val
                .get("stderr")
                .and_then(|v| v.as_str())
                .unwrap_or("")
                .to_string(),
            exit_code: val.get("exit_code").and_then(|v| v.as_i64()).unwrap_or(-1),
        }),
        Err(e) => ContainerMessage::Error(format!("Invalid code output: {e}")),
    }
}

fn parse_tool_calls(payload: &str) -> ContainerMessage {
    let val = match decode_frame_json(payload) {
        Ok(v) => v,
        Err(e) => return ContainerMessage::Error(format!("Invalid tool call: {e}")),
    };
    let Some(arr) = val.get("calls").and_then(|c| c.as_array()) else {
        return ContainerMessage::Error("Invalid tool call: missing 'calls' array".into());
    };
    let mut calls = Vec::with_capacity(arr.len());
    for call in arr {
        let (Some(tool_use_id), Some(name)) = (
            call.get("tool_use_id").and_then(|v| v.as_str()),
            call.get("name").and_then(|v| v.as_str()),
        ) else {
            return ContainerMessage::Error(
                "Invalid tool call: entry without string 'tool_use_id'/'name'".into(),
            );
        };
        calls.push(ToolCallData {
            tool_use_id: tool_use_id.to_string(),
            name: name.to_string(),
            input: call.get("input").cloned().unwrap_or(serde_json::json!({})),
        });
    }
    ContainerMessage::ToolCall(calls)
}

/// Parse the stdout buffer for `__PTC_OUTPUT__{b64}__PTC_END_OUTPUT__` frames.
/// Returns each message with its payload size (for the queue budget).
fn parse_stdout_frames(buf: &mut String) -> Result<Vec<(ContainerMessage, usize)>, String> {
    const SPECS: [FrameSpec; 1] = [(
        runner::IPC_CODE_OUTPUT_START,
        Some(runner::IPC_CODE_OUTPUT_END),
    )];
    Ok(drain_frames(buf, &SPECS, MAX_FRAME_BYTES)?
        .into_iter()
        .map(|(_, payload)| (parse_code_output(&payload), payload.len()))
        .collect())
}

/// Parse the stderr buffer for `__READY__` and `__PTC_TOOL_CALL__{b64}__PTC_END_CALL__`.
fn parse_stderr_frames(buf: &mut String) -> Result<Vec<(ContainerMessage, usize)>, String> {
    const SPECS: [FrameSpec; 2] = [
        (runner::IPC_READY, None),
        (runner::IPC_TOOL_CALL_START, Some(runner::IPC_TOOL_CALL_END)),
    ];
    Ok(drain_frames(buf, &SPECS, MAX_FRAME_BYTES)?
        .into_iter()
        .map(|(i, payload)| {
            let msg = if i == 0 {
                ContainerMessage::Ready
            } else {
                parse_tool_calls(&payload)
            };
            (msg, payload.len())
        })
        .collect())
}

#[cfg(test)]
async fn parse_stdout_messages(
    buf: &mut String,
    tx: &mpsc::Sender<ContainerMessage>,
) -> Result<(), String> {
    for (msg, _) in parse_stdout_frames(buf)? {
        let _ = tx.send(msg).await;
    }
    Ok(())
}

#[cfg(test)]
async fn parse_stderr_messages(
    buf: &mut String,
    tx: &mpsc::Sender<ContainerMessage>,
) -> Result<(), String> {
    for (msg, _) in parse_stderr_frames(buf)? {
        let _ = tx.send(msg).await;
    }
    Ok(())
}

/// stdout/stderr collector with a combined byte cap.
struct CappedOutput {
    stdout: Vec<u8>,
    stderr: Vec<u8>,
    limit: usize,
    truncated: bool,
}

impl CappedOutput {
    fn new(limit: usize) -> Self {
        Self {
            stdout: Vec::new(),
            stderr: Vec::new(),
            limit,
            truncated: false,
        }
    }

    fn remaining(&self) -> usize {
        self.limit
            .saturating_sub(self.stdout.len() + self.stderr.len())
    }

    /// Append; returns `true` once the cap is reached.
    fn push(&mut self, data: &[u8], to_stdout: bool) -> bool {
        let take = data.len().min(self.remaining());
        let dst = if to_stdout {
            &mut self.stdout
        } else {
            &mut self.stderr
        };
        dst.extend_from_slice(&data[..take]);
        if take < data.len() {
            self.truncated = true;
        }
        self.truncated
    }

    fn push_stdout(&mut self, data: &[u8]) -> bool {
        self.push(data, true)
    }

    fn push_stderr(&mut self, data: &[u8]) -> bool {
        self.push(data, false)
    }

    fn finish(self) -> (String, String, bool) {
        let stdout = String::from_utf8_lossy(&self.stdout).into_owned();
        let mut stderr = String::from_utf8_lossy(&self.stderr).into_owned();
        if self.truncated {
            stderr.push_str(&format!("\n[output truncated at {} bytes]", self.limit));
        }
        (stdout, stderr, self.truncated)
    }
}

// ============================================================================
// Tests
// ============================================================================

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_sandbox_config_default() {
        let config = SandboxConfig::default();
        assert_eq!(config.image, DEFAULT_SANDBOX_IMAGE);
        assert_eq!(config.memory_limit, DEFAULT_MEMORY_LIMIT);
        assert!(config.network_disabled);
    }

    #[test]
    fn test_execution_result_success() {
        let result = ExecutionResult {
            stdout: "output".to_string(),
            stderr: String::new(),
            exit_code: 0,
            timed_out: false,
        };
        assert!(result.is_success());
    }

    #[test]
    fn test_execution_result_failure() {
        let result = ExecutionResult {
            stdout: String::new(),
            stderr: "error".to_string(),
            exit_code: 1,
            timed_out: false,
        };
        assert!(!result.is_success());
    }

    #[test]
    fn test_execution_result_timeout() {
        let result = ExecutionResult {
            stdout: String::new(),
            stderr: String::new(),
            exit_code: 0,
            timed_out: true,
        };
        assert!(!result.is_success());
    }

    #[test]
    fn test_container_info() {
        let info = ContainerInfo {
            id: "abc123".to_string(),
            name: "test_container".to_string(),
            created_at: chrono::Utc::now(),
            running: true,
        };
        assert_eq!(info.id, "abc123");
        assert!(info.running);
    }

    #[tokio::test]
    async fn test_parse_stdout_code_output() {
        let (tx, mut rx) = mpsc::channel(8);
        let payload = b64_encode(br#"{"stdout":"hello","stderr":"","exit_code":0}"#);
        let mut buf = format!("__PTC_OUTPUT__{payload}__PTC_END_OUTPUT__\n");
        parse_stdout_messages(&mut buf, &tx).await.unwrap();
        let msg = rx.try_recv().unwrap();
        match msg {
            ContainerMessage::CodeOutput(data) => {
                assert_eq!(data.stdout, "hello");
                assert_eq!(data.exit_code, 0);
            }
            _ => panic!("Expected CodeOutput"),
        }
        assert!(buf.is_empty());
    }

    #[tokio::test]
    async fn test_parse_stderr_ready() {
        let (tx, mut rx) = mpsc::channel(8);
        let mut buf = "__READY__\n".to_string();
        parse_stderr_messages(&mut buf, &tx).await.unwrap();
        let msg = rx.try_recv().unwrap();
        assert!(matches!(msg, ContainerMessage::Ready));
        assert!(buf.is_empty());
    }

    #[tokio::test]
    async fn test_parse_stderr_tool_call() {
        let (tx, mut rx) = mpsc::channel(8);
        let payload = b64_encode(
            br#"{"calls":[{"tool_use_id":"toolu_1","name":"web_search","input":{"query":"test"}}]}"#,
        );
        let mut buf = format!("__PTC_TOOL_CALL__{payload}__PTC_END_CALL__\n");
        parse_stderr_messages(&mut buf, &tx).await.unwrap();
        let msg = rx.try_recv().unwrap();
        match msg {
            ContainerMessage::ToolCall(calls) => {
                assert_eq!(calls.len(), 1);
                assert_eq!(calls[0].name, "web_search");
                assert_eq!(calls[0].tool_use_id, "toolu_1");
            }
            _ => panic!("Expected ToolCall"),
        }
        assert!(buf.is_empty());
    }

    #[tokio::test]
    async fn test_parse_incomplete_marker() {
        let (tx, mut rx) = mpsc::channel(8);
        let mut buf = "__PTC_OUTPUT__eyJzdGRvdXQiOiJwYXJ0".to_string();
        parse_stdout_messages(&mut buf, &tx).await.unwrap();
        // Should not produce a message — waiting for end marker
        assert!(rx.try_recv().is_err());
        assert!(buf.contains("eyJzdGRvdXQiOiJwYXJ0"));
    }

    #[tokio::test]
    async fn test_marker_inside_payload_does_not_truncate() {
        // Output that contains the boundary markers literally.
        let json = serde_json::json!({
            "stdout": "a __PTC_END_OUTPUT__ b __PTC_END_RESULT__ c",
            "stderr": "",
            "exit_code": 0
        });
        let payload = b64_encode(json.to_string().as_bytes());
        let (tx, mut rx) = mpsc::channel(8);
        let mut buf = format!("__PTC_OUTPUT__{payload}__PTC_END_OUTPUT__\n");
        parse_stdout_messages(&mut buf, &tx).await.unwrap();
        match rx.try_recv().unwrap() {
            ContainerMessage::CodeOutput(d) => {
                assert_eq!(d.stdout, "a __PTC_END_OUTPUT__ b __PTC_END_RESULT__ c")
            }
            other => panic!("Expected CodeOutput, got {other:?}"),
        }
    }

    #[tokio::test]
    async fn test_unframed_json_is_rejected() {
        // Raw (non-base64) JSON must not be accepted as a tool call.
        let (tx, mut rx) = mpsc::channel(8);
        let mut buf = r#"__PTC_TOOL_CALL__{"calls":[]}__PTC_END_CALL__"#.to_string();
        parse_stderr_messages(&mut buf, &tx).await.unwrap();
        assert!(matches!(rx.try_recv().unwrap(), ContainerMessage::Error(_)));
    }

    #[tokio::test]
    async fn test_tool_call_entry_missing_name_is_error() {
        let payload = b64_encode(br#"{"calls":[{"tool_use_id":"toolu_1"}]}"#);
        let (tx, mut rx) = mpsc::channel(8);
        let mut buf = format!("__PTC_TOOL_CALL__{payload}__PTC_END_CALL__");
        parse_stderr_messages(&mut buf, &tx).await.unwrap();
        assert!(matches!(rx.try_recv().unwrap(), ContainerMessage::Error(_)));
    }

    #[tokio::test]
    async fn test_oversized_stdout_frame_is_error() {
        let (tx, _rx) = mpsc::channel(8);
        let mut buf = format!("__PTC_OUTPUT__{}", "A".repeat(MAX_FRAME_BYTES + 1));
        assert!(parse_stdout_messages(&mut buf, &tx).await.is_err());
        assert!(buf.is_empty());
    }

    #[test]
    fn test_drain_frames_discards_noise_and_bounds_buffer() {
        const SPECS: [FrameSpec; 1] = [("__S__", Some("__E__"))];
        let mut buf = "x".repeat(10_000);
        let frames = drain_frames(&mut buf, &SPECS, 1024).unwrap();
        assert!(frames.is_empty());
        assert!(buf.len() < 5, "noise must not accumulate: {}", buf.len());

        let mut buf = "noise__S__abc__E__\nmore__S__def__E__".to_string();
        let frames = drain_frames(&mut buf, &SPECS, 1024).unwrap();
        assert_eq!(frames, vec![(0, "abc".to_string()), (0, "def".to_string())]);
    }

    #[test]
    fn test_drain_frames_partial_marker_tail_kept() {
        const SPECS: [FrameSpec; 1] = [("__S__", Some("__E__"))];
        let mut buf = "garbage__S".to_string();
        drain_frames(&mut buf, &SPECS, 1024).unwrap();
        buf.push_str("__ok__E__");
        let frames = drain_frames(&mut buf, &SPECS, 1024).unwrap();
        assert_eq!(frames, vec![(0, "ok".to_string())]);
    }

    #[test]
    fn test_drain_frames_oversized_frame_errors() {
        const SPECS: [FrameSpec; 1] = [("__S__", Some("__E__"))];
        let mut buf = format!("__S__{}", "A".repeat(2048));
        let err = drain_frames(&mut buf, &SPECS, 1024).unwrap_err();
        assert!(err.contains("exceeded"));
        assert!(buf.is_empty());
    }

    #[test]
    fn test_drain_frames_multibyte_noise() {
        const SPECS: [FrameSpec; 1] = [("__S__", Some("__E__"))];
        let mut buf = "日本語のノイズ".repeat(100);
        drain_frames(&mut buf, &SPECS, 1024).unwrap();
        assert!(buf.len() <= 8);
    }

    #[test]
    fn test_drain_frames_ready_and_call_in_order() {
        const SPECS: [FrameSpec; 2] = [("__R__", None), ("__S__", Some("__E__"))];
        let mut buf = "__S__one__E____R__\n__S__two__E__".to_string();
        let frames = drain_frames(&mut buf, &SPECS, 1024).unwrap();
        assert_eq!(
            frames,
            vec![
                (1, "one".to_string()),
                (0, String::new()),
                (1, "two".to_string())
            ]
        );
    }

    #[test]
    fn test_capped_output() {
        let mut out = CappedOutput::new(10);
        assert!(!out.push_stdout(b"12345"));
        assert!(out.push_stderr(b"6789012"));
        let (stdout, stderr, truncated) = out.finish();
        assert!(truncated);
        assert_eq!(stdout, "12345");
        assert!(stderr.starts_with("67890"));
        assert!(stderr.contains("truncated"));
    }

    #[test]
    fn reader_state_admits_one_frame_per_exchange() {
        let s = ReaderState::new(100);
        // Startup: the ready signal is expected.
        assert!(s.admit(0).is_ok());
        // A second frame with nothing awaiting is unsolicited.
        assert!(s.admit(10).is_err());
        assert!(s.is_poisoned());

        let s = ReaderState::new(100);
        s.admit(0).unwrap();
        s.expect_reply();
        s.admit(60).unwrap();
        // Not yet consumed: the next (solicited) frame would exceed budget.
        s.expect_reply();
        assert!(s.admit(50).unwrap_err().contains("budget"));
        assert!(s.is_poisoned());

        let s = ReaderState::new(100);
        s.admit(0).unwrap();
        s.expect_reply();
        s.admit(60).unwrap();
        s.consumed(60);
        s.expect_reply();
        assert!(s.admit(90).is_ok());
        assert!(!s.is_poisoned());
    }

    #[test]
    fn frame_sizes_are_reported() {
        let payload = b64_encode(br#"{"stdout":"x","stderr":"","exit_code":0}"#);
        let mut buf = format!("__PTC_OUTPUT__{payload}__PTC_END_OUTPUT__\n");
        let frames = parse_stdout_frames(&mut buf).unwrap();
        assert_eq!(frames.len(), 1);
        assert_eq!(frames[0].1, payload.len());
    }

    #[test]
    fn daemon_clock_parsing() {
        assert_eq!(
            daemon_now(Some("2026-11-18T12:00:00.123456789Z")),
            Some(1_795_003_200)
        );
        assert_eq!(
            daemon_now(Some("2026-11-18T20:00:00.5+08:00")),
            Some(1_795_003_200)
        );
        assert_eq!(daemon_now(Some("")), None);
        assert_eq!(daemon_now(Some("garbage")), None);
        assert_eq!(daemon_now(None), None);
        // A container "created in the future" (skewed clocks) is never old.
        let n = vec!["/ptc_sandbox_x".to_string()];
        assert!(!is_orphan_sandbox(&n, "created", 2_000, 1_000));
        assert!(!is_orphan_sandbox(&n, "created", 1_000 - 599, 1_000));
    }

    #[test]
    fn orphan_sweep_decisions() {
        let n = |s: &str| vec![s.to_string()];
        let now = 1_000_000;
        assert!(is_orphan_sandbox(
            &n("/ptc_sandbox_x"),
            "created",
            now - 600,
            now
        ));
        assert!(!is_orphan_sandbox(
            &n("/ptc_sandbox_x"),
            "created",
            now - 5,
            now
        ));
        assert!(!is_orphan_sandbox(
            &n("/ptc_sandbox_x"),
            "running",
            now - 600,
            now
        ));
        assert!(is_orphan_sandbox(
            &n("/ptc_sandbox_x"),
            "running",
            now - 7200,
            now
        ));
        assert!(is_orphan_sandbox(&n("/ptc_sandbox_x"), "exited", now, now));
        assert!(!is_orphan_sandbox(&n("/other"), "exited", now - 7200, now));
        assert!(!is_orphan_sandbox(
            &n("/my_ptc_sandbox_x"),
            "exited",
            0,
            now
        ));
    }

    #[test]
    fn digest_pinning_detection() {
        assert!(!image_is_digest_pinned(DEFAULT_SANDBOX_IMAGE));
        assert!(!image_is_digest_pinned("python@sha256:abc"));
        let pinned = format!("python:3.11-slim@sha256:{}", "a".repeat(64));
        assert!(image_is_digest_pinned(&pinned));
    }

    #[test]
    fn test_sandbox_config_default_tmpfs() {
        let cfg = SandboxConfig::default();
        assert_eq!(cfg.tmpfs_size, DEFAULT_TMPFS_SIZE);
    }
}
