//! Docker sandbox executor for PTC
//!
//! This module handles the creation and management of Docker containers
//! for secure code execution in the PTC (Programmatic Tool Calling) system.

use super::exceptions::{PtcError, PtcResult};
use super::runner;
use bollard::container::{
    AttachContainerOptions, Config, CreateContainerOptions, LogOutput, LogsOptions,
    RemoveContainerOptions, StartContainerOptions, StopContainerOptions, UploadToContainerOptions,
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
// Configuration
// ============================================================================

/// Default Docker image for sandbox execution
pub const DEFAULT_SANDBOX_IMAGE: &str = "python:3.11-slim";

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
    /// Receiver for parsed messages from the background reader
    messages_rx: mpsc::Receiver<ContainerMessage>,
    /// Handle for the background reader task
    reader_task: JoinHandle<()>,
}

impl ContainerHandle {
    /// Send a code block to the container for execution.
    pub async fn send_code(&self, code: &str) -> PtcResult<()> {
        let payload = format!(
            "{}\n{}\n{}\n",
            runner::IPC_CODE_START,
            code,
            runner::IPC_CODE_END
        );
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
            json_str,
            runner::IPC_TOOL_RESULT_END
        );
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
        self.messages_rx.recv().await.ok_or(PtcError::IpcError(
            "Container stream ended unexpectedly".into(),
        ))
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

    /// Shut down the background reader and drop resources.
    pub fn shutdown(self) {
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

    /// Create a new container for code execution
    pub async fn create_container(&self, name: Option<&str>) -> PtcResult<ContainerInfo> {
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
            ..Default::default()
        };

        let config = Config {
            image: Some(self.config.image.clone()),
            working_dir: Some(self.config.working_dir.clone()),
            host_config: Some(host_config),
            tty: Some(false), // Disable TTY for multiplexed stdout/stderr separation
            attach_stdin: Some(true),
            attach_stdout: Some(true),
            attach_stderr: Some(true),
            open_stdin: Some(true),
            // Run the runner script as main process (unbuffered Python)
            cmd: Some(vec![
                "python".to_string(),
                "-u".to_string(),
                "/tmp/runner.py".to_string(),
            ]),
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
    // File Operations
    // ========================================================================

    /// Copy a file to the container using put_archive API
    ///
    /// This method creates a tar archive and uploads it to the container,
    /// which works correctly in Docker-in-Docker scenarios where bind mounts fail.
    pub async fn copy_file_to_container(
        &self,
        container_id: &str,
        content: &[u8],
        dest_path: &str,
    ) -> PtcResult<()> {
        // Create a tar archive containing the file
        let mut tar_buffer = Vec::new();
        {
            let mut tar_builder = tar::Builder::new(&mut tar_buffer);

            // Extract filename from dest_path
            let filename = std::path::Path::new(dest_path)
                .file_name()
                .and_then(|n| n.to_str())
                .unwrap_or("file");

            // Create tar header
            let mut header = tar::Header::new_gnu();
            header
                .set_path(filename)
                .map_err(|e| PtcError::FileCopyFailed(format!("Failed to set tar path: {e}")))?;
            header.set_size(content.len() as u64);
            header.set_mode(0o644);
            header.set_cksum();

            // Add file to archive
            tar_builder
                .append(&header, content)
                .map_err(|e| PtcError::FileCopyFailed(format!("Failed to append to tar: {e}")))?;

            tar_builder
                .finish()
                .map_err(|e| PtcError::FileCopyFailed(format!("Failed to finish tar: {e}")))?;
        }

        // Get the directory path
        let dir_path = std::path::Path::new(dest_path)
            .parent()
            .map(|p| p.to_string_lossy().to_string())
            .unwrap_or_else(|| "/tmp".to_string());

        // Upload the tar archive to the container
        let options = UploadToContainerOptions {
            path: dir_path,
            ..Default::default()
        };

        self.docker
            .upload_to_container(container_id, Some(options), tar_buffer.into())
            .await
            .map_err(|e| PtcError::FileCopyFailed(format!("Failed to upload to container: {e}")))?;

        Ok(())
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

    /// Execute Python code in the container
    pub async fn execute_python(
        &self,
        container_id: &str,
        code: &str,
    ) -> PtcResult<ExecutionResult> {
        // Write code to a temporary file
        let script_path = "/tmp/script.py";
        self.copy_file_to_container(container_id, code.as_bytes(), script_path)
            .await?;

        // Execute the script
        self.exec_command(container_id, vec!["python", script_path])
            .await
    }

    /// Collect output from an exec instance
    async fn collect_exec_output(&self, exec_id: &str) -> PtcResult<ExecutionResult> {
        let start_result = self
            .docker
            .start_exec(exec_id, None)
            .await
            .map_err(|e| PtcError::ExecFailed(format!("Failed to start exec: {e}")))?;

        let mut stdout = String::new();
        let mut stderr = String::new();

        if let StartExecResults::Attached { mut output, .. } = start_result {
            while let Some(result) = output.next().await {
                match result {
                    Ok(LogOutput::StdOut { message }) => {
                        stdout.push_str(&String::from_utf8_lossy(&message));
                    }
                    Ok(LogOutput::StdErr { message }) => {
                        stderr.push_str(&String::from_utf8_lossy(&message));
                    }
                    Ok(_) => {}
                    Err(e) => {
                        tracing::warn!("Error reading exec output: {}", e);
                    }
                }
            }
        }

        // Get exit code
        let inspect = self
            .docker
            .inspect_exec(exec_id)
            .await
            .map_err(|e| PtcError::ExecFailed(format!("Failed to inspect exec: {e}")))?;

        let exit_code = inspect.exit_code.unwrap_or(-1);

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

    /// Create and start a container in one step
    pub async fn create_and_start(&self, name: Option<&str>) -> PtcResult<ContainerInfo> {
        let mut info = self.create_container(name).await?;
        self.start_container(&info.id).await?;
        info.running = true;
        Ok(info)
    }

    /// Create a container, copy the runner script, attach, and start.
    ///
    /// Returns both a `ContainerInfo` and a `ContainerHandle` for persistent
    /// bidirectional communication. The runner script must already be copied
    /// to the container before calling this method (via `copy_file_to_container`).
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
        let (tx, rx) = mpsc::channel::<ContainerMessage>(32);

        // Spawn background reader task
        let reader_task = tokio::spawn(async move {
            let mut stdout_buf = String::new();
            let mut stderr_buf = String::new();

            while let Some(result) = output_stream.next().await {
                match result {
                    Ok(LogOutput::StdOut { message }) => {
                        stdout_buf.push_str(&String::from_utf8_lossy(&message));
                        parse_stdout_messages(&mut stdout_buf, &tx).await;
                    }
                    Ok(LogOutput::StdErr { message }) => {
                        stderr_buf.push_str(&String::from_utf8_lossy(&message));
                        parse_stderr_messages(&mut stderr_buf, &tx).await;
                    }
                    Ok(_) => {} // StdIn echo, Console — ignore
                    Err(e) => {
                        let _ = tx
                            .send(ContainerMessage::Error(format!("Stream error: {e}")))
                            .await;
                        break;
                    }
                }
            }

            let _ = tx.send(ContainerMessage::StreamEnded).await;
        });

        Ok(ContainerHandle {
            stdin: stdin_writer,
            messages_rx: rx,
            reader_task,
        })
    }

    /// Stop and remove a container in one step
    pub async fn stop_and_remove(&self, container_id: &str) -> PtcResult<()> {
        // Try to stop first, but don't fail if already stopped
        let _ = self.stop_container(container_id).await;
        self.remove_container(container_id).await
    }

    /// Check if a container exists
    pub async fn container_exists(&self, container_id: &str) -> bool {
        self.docker
            .inspect_container(container_id, None)
            .await
            .is_ok()
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

/// Parse stdout buffer for `__PTC_OUTPUT__{json}__PTC_END_OUTPUT__` messages.
async fn parse_stdout_messages(buf: &mut String, tx: &mpsc::Sender<ContainerMessage>) {
    while let Some(start_idx) = buf.find(runner::IPC_CODE_OUTPUT_START) {
        let json_start = start_idx + runner::IPC_CODE_OUTPUT_START.len();
        if let Some(end_idx) = buf[json_start..].find(runner::IPC_CODE_OUTPUT_END) {
            let json_str = &buf[json_start..json_start + end_idx];
            let msg = match serde_json::from_str::<serde_json::Value>(json_str) {
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
                Err(e) => ContainerMessage::Error(format!("Invalid code output JSON: {e}")),
            };
            let consume_end = json_start + end_idx + runner::IPC_CODE_OUTPUT_END.len();
            // Also consume trailing newline if present
            let consume_end = if buf[consume_end..].starts_with('\n') {
                consume_end + 1
            } else {
                consume_end
            };
            buf.drain(..consume_end);
            let _ = tx.send(msg).await;
        } else {
            // Incomplete marker — wait for more data
            break;
        }
    }
}

/// Parse stderr buffer for `__READY__` and `__PTC_TOOL_CALL__` messages.
async fn parse_stderr_messages(buf: &mut String, tx: &mpsc::Sender<ContainerMessage>) {
    // Check for __READY__ signal
    while let Some(idx) = buf.find(runner::IPC_READY) {
        let consume_end = idx + runner::IPC_READY.len();
        let consume_end = if buf[consume_end..].starts_with('\n') {
            consume_end + 1
        } else {
            consume_end
        };
        buf.drain(..consume_end);
        let _ = tx.send(ContainerMessage::Ready).await;
    }

    // Check for tool call messages
    while let Some(start_idx) = buf.find(runner::IPC_TOOL_CALL_START) {
        let json_start = start_idx + runner::IPC_TOOL_CALL_START.len();
        if let Some(end_idx) = buf[json_start..].find(runner::IPC_TOOL_CALL_END) {
            let json_str = &buf[json_start..json_start + end_idx];
            let msg = match serde_json::from_str::<serde_json::Value>(json_str) {
                Ok(val) => {
                    let calls = val
                        .get("calls")
                        .and_then(|c| c.as_array())
                        .map(|arr| {
                            arr.iter()
                                .filter_map(|call| {
                                    let tool_use_id =
                                        call.get("tool_use_id")?.as_str()?.to_string();
                                    let name = call.get("name")?.as_str()?.to_string();
                                    let input =
                                        call.get("input").cloned().unwrap_or(serde_json::json!({}));
                                    Some(ToolCallData {
                                        tool_use_id,
                                        name,
                                        input,
                                    })
                                })
                                .collect::<Vec<_>>()
                        })
                        .unwrap_or_default();
                    ContainerMessage::ToolCall(calls)
                }
                Err(e) => ContainerMessage::Error(format!("Invalid tool call JSON: {e}")),
            };
            let consume_end = json_start + end_idx + runner::IPC_TOOL_CALL_END.len();
            let consume_end = if buf[consume_end..].starts_with('\n') {
                consume_end + 1
            } else {
                consume_end
            };
            buf.drain(..consume_end);
            let _ = tx.send(msg).await;
        } else {
            // Incomplete marker — wait for more data
            break;
        }
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
        let mut buf =
            r#"__PTC_OUTPUT__{"stdout":"hello","stderr":"","exit_code":0}__PTC_END_OUTPUT__
"#
            .to_string();
        parse_stdout_messages(&mut buf, &tx).await;
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
        parse_stderr_messages(&mut buf, &tx).await;
        let msg = rx.try_recv().unwrap();
        assert!(matches!(msg, ContainerMessage::Ready));
        assert!(buf.is_empty());
    }

    #[tokio::test]
    async fn test_parse_stderr_tool_call() {
        let (tx, mut rx) = mpsc::channel(8);
        let mut buf = r#"__PTC_TOOL_CALL__{"calls":[{"tool_use_id":"toolu_1","name":"web_search","input":{"query":"test"}}]}__PTC_END_CALL__
"#.to_string();
        parse_stderr_messages(&mut buf, &tx).await;
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
        let mut buf = "__PTC_OUTPUT__{\"stdout\":\"partial".to_string();
        parse_stdout_messages(&mut buf, &tx).await;
        // Should not produce a message — waiting for end marker
        assert!(rx.try_recv().is_err());
        assert!(buf.contains("partial"));
    }
}
