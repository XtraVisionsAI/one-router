//! Programmatic Tool Calling (PTC) module
//!
//! This module provides the PTC implementation for executing code
//! in a secure Docker sandbox environment with persistent attach connections.

pub mod exceptions;
pub mod runner;
pub mod sandbox;
pub mod service;

pub use exceptions::{PtcError, PtcResult};
pub use runner::{get_runner_script_bytes, RUNNER_SCRIPT};
pub use sandbox::{
    CodeOutputData, ContainerHandle, ContainerInfo, ContainerMessage, ExecutionResult,
    SandboxConfig, SandboxExecutor, ToolCallData,
};
pub use service::{
    PendingToolCall, PtcExecutionState, PtcHealthStatus, PtcResponse, PtcService, PtcSession,
    SessionState, CODE_EXECUTION_TOOL_TYPE, DEFAULT_MAX_ITERATIONS, DEFAULT_SESSION_TIMEOUT_SECS,
    PTC_BETA_HEADER,
};
