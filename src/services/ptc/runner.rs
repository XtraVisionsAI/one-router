//! Python runner script for PTC sandbox
//!
//! This module contains the Python runner script that gets injected into
//! the sandbox container for executing Claude-generated code.
//!
//! The runner operates in **loop mode**: it stays alive waiting for code
//! blocks on stdin, executes them, and communicates tool calls / results
//! via boundary-marker framed messages on stderr/stdout/stdin.

/// IPC boundary markers — must stay in sync with the Rust reader in sandbox.rs.
pub const IPC_CODE_START: &str = "__CODE_START__";
pub const IPC_CODE_END: &str = "__CODE_END__";
pub const IPC_TOOL_CALL_START: &str = "__PTC_TOOL_CALL__";
pub const IPC_TOOL_CALL_END: &str = "__PTC_END_CALL__";
pub const IPC_TOOL_RESULT_START: &str = "__PTC_TOOL_RESULT__";
pub const IPC_TOOL_RESULT_END: &str = "__PTC_END_RESULT__";
pub const IPC_CODE_OUTPUT_START: &str = "__PTC_OUTPUT__";
pub const IPC_CODE_OUTPUT_END: &str = "__PTC_END_OUTPUT__";
pub const IPC_READY: &str = "__READY__";

/// The Python runner script injected into sandbox containers.
///
/// Protocol:
///   stderr → host:  `__READY__\n`  (runner is waiting for code)
///   stdin  → runner: `__CODE_START__\n{code}\n__CODE_END__\n`
///   stderr → host:  `__PTC_TOOL_CALL__{json}__PTC_END_CALL__\n`
///   stdin  → runner: `__PTC_TOOL_RESULT__{json}__PTC_END_RESULT__\n`
///   stdout → host:  `__PTC_OUTPUT__{json}__PTC_END_OUTPUT__\n`
pub const RUNNER_SCRIPT: &str = r#"#!/usr/bin/env python3
"""
PTC Runner Script — loop-mode, boundary-marker IPC.

Stays alive for the lifetime of the container session.
Communicates with the Rust host via stdin/stdout/stderr using
boundary markers for message framing.

Channels:
  stderr → host:  __READY__, __PTC_TOOL_CALL__
  stdout → host:  __PTC_OUTPUT__
  stdin  ← host:  __CODE_START__/__CODE_END__, __PTC_TOOL_RESULT__/__PTC_END_RESULT__
"""

import sys
import os
import json
import time
import select
import traceback
import asyncio
import uuid
from typing import Any, Dict, List, Optional

# ── IPC markers ──────────────────────────────────────────────────────
IPC_CODE_START = "__CODE_START__"
IPC_CODE_END = "__CODE_END__"
IPC_TOOL_CALL_START = "__PTC_TOOL_CALL__"
IPC_TOOL_CALL_END = "__PTC_END_CALL__"
IPC_TOOL_RESULT_START = "__PTC_TOOL_RESULT__"
IPC_TOOL_RESULT_END = "__PTC_END_RESULT__"
IPC_CODE_OUTPUT_START = "__PTC_OUTPUT__"
IPC_CODE_OUTPUT_END = "__PTC_END_OUTPUT__"
IPC_READY = "__READY__"
EXIT_SIGNAL = "__EXIT_SESSION__"

# ── Unbuffered I/O ───────────────────────────────────────────────────
_stdin_fd = 0
_stdin_buffer = ""

def _write_stderr(data: str) -> None:
    """Write to stderr (unbuffered)."""
    os.write(2, data.encode("utf-8"))

def _write_stdout(data: str) -> None:
    """Write to stdout (unbuffered)."""
    os.write(1, data.encode("utf-8"))

def _read_and_buffer(timeout: float = 300.0) -> bool:
    """Read available data from stdin into buffer. Returns False on EOF."""
    global _stdin_buffer
    try:
        readable, _, _ = select.select([_stdin_fd], [], [], timeout)
        if not readable:
            return True  # timeout, not EOF
        chunk = os.read(_stdin_fd, 65536)
        if not chunk:
            return False  # EOF
        _stdin_buffer += chunk.decode("utf-8")
        return True
    except (OSError, ValueError):
        return False

def _read_line(timeout: float = 300.0) -> Optional[str]:
    """Read one line from stdin buffer. Returns None on EOF/timeout."""
    global _stdin_buffer
    deadline = time.monotonic() + timeout
    while "\n" not in _stdin_buffer:
        remaining = deadline - time.monotonic()
        if remaining <= 0:
            return None
        if not _read_and_buffer(min(remaining, 1.0)):
            # EOF — return whatever is left
            if _stdin_buffer:
                line = _stdin_buffer
                _stdin_buffer = ""
                return line.rstrip("\n")
            return None
    idx = _stdin_buffer.index("\n")
    line = _stdin_buffer[:idx]
    _stdin_buffer = _stdin_buffer[idx + 1:]
    return line

# ── Code block reading ───────────────────────────────────────────────

def read_code_block() -> Optional[str]:
    """Read a code block delimited by __CODE_START__/__CODE_END__ from stdin."""
    while True:
        line = _read_line()
        if line is None:
            return None
        if line == EXIT_SIGNAL:
            return None
        if line == IPC_CODE_START:
            break
        # Ignore unexpected lines before code start

    code_lines = []
    while True:
        line = _read_line()
        if line is None:
            return None
        if line == IPC_CODE_END:
            break
        code_lines.append(line)

    return "\n".join(code_lines)

# ── Tool result reading ──────────────────────────────────────────────

def _read_tool_result(timeout: float = 300.0) -> Optional[Dict]:
    """Read a tool result message from stdin.

    Looks for __PTC_TOOL_RESULT__{json}__PTC_END_RESULT__ on a single line.
    """
    deadline = time.monotonic() + timeout
    while True:
        remaining = deadline - time.monotonic()
        if remaining <= 0:
            return None
        line = _read_line(remaining)
        if line is None:
            return None
        if IPC_TOOL_RESULT_START in line and IPC_TOOL_RESULT_END in line:
            start = line.find(IPC_TOOL_RESULT_START) + len(IPC_TOOL_RESULT_START)
            end = line.find(IPC_TOOL_RESULT_END)
            try:
                return json.loads(line[start:end])
            except json.JSONDecodeError:
                return None

# ── Tool calling ─────────────────────────────────────────────────────

BATCH_WINDOW_MS = 100

class ToolCallHandler:
    """Handles tool calls by writing to stderr and waiting for results on stdin."""

    def __init__(self):
        self.call_counter = 0
        self._pending_calls: List[Dict] = []
        self._last_call_time: Optional[float] = None
        self._results_cache: Dict[str, Any] = {}

    def _generate_id(self) -> str:
        self.call_counter += 1
        return f"toolu_{self.call_counter:012d}"

    def request_tool_call(self, name: str, **kwargs) -> Any:
        """Issue a tool call. Batches with other calls within the batch window."""
        tool_use_id = self._generate_id()

        self._pending_calls.append({
            "tool_use_id": tool_use_id,
            "name": name,
            "input": kwargs,
        })
        self._last_call_time = time.monotonic()

        # Wait for the batch window to collect parallel calls
        time.sleep(BATCH_WINDOW_MS / 1000.0)

        # Check if batch window elapsed
        elapsed_ms = (time.monotonic() - self._last_call_time) * 1000
        if elapsed_ms >= BATCH_WINDOW_MS and self._pending_calls:
            calls = self._pending_calls
            self._pending_calls = []
            self._last_call_time = None
            self._flush_calls(calls)

        return self._results_cache.get(tool_use_id)

    def _flush_calls(self, calls: List[Dict]) -> None:
        """Write tool calls to stderr and wait for results on stdin."""
        request = json.dumps({"calls": calls})
        _write_stderr(f"{IPC_TOOL_CALL_START}{request}{IPC_TOOL_CALL_END}\n")

        # Wait for results
        ids_needed = {c["tool_use_id"] for c in calls}
        while not ids_needed.issubset(self._results_cache.keys()):
            data = _read_tool_result()
            if data is None:
                # Timeout or EOF — fill missing with errors
                for cid in ids_needed:
                    if cid not in self._results_cache:
                        self._results_cache[cid] = {"error": "Timeout waiting for tool result"}
                return
            if "results" in data:
                for r in data["results"]:
                    rid = r.get("tool_use_id")
                    if rid:
                        if r.get("is_error"):
                            self._results_cache[rid] = {"error": r.get("content", "Tool error")}
                        else:
                            self._results_cache[rid] = r.get("content")


_handler = ToolCallHandler()


def call_tool(name: str, **kwargs) -> Any:
    """Call a tool. Used by Claude-generated code."""
    return _handler.request_tool_call(name, **kwargs)


async def async_call_tool(name: str, **kwargs) -> Any:
    """Async wrapper for call_tool (still synchronous under the hood)."""
    return call_tool(name, **kwargs)


def _create_tool_function(name: str):
    """Create a named tool function."""
    def tool_func(**kwargs):
        return call_tool(name, **kwargs)
    tool_func.__name__ = name
    return tool_func


# ── Code execution ───────────────────────────────────────────────────

def execute_code(code: str, tools: List[str]) -> Dict:
    """Execute code in a controlled namespace with tool functions available."""
    import io
    from contextlib import redirect_stdout, redirect_stderr

    stdout_capture = io.StringIO()
    stderr_capture = io.StringIO()

    namespace = {
        "__builtins__": __builtins__,
        "call_tool": call_tool,
        "async_call_tool": async_call_tool,
        "asyncio": asyncio,
        "json": json,
    }

    for tool_name in tools:
        namespace[tool_name] = _create_tool_function(tool_name)

    exit_code = 0
    try:
        with redirect_stdout(stdout_capture), redirect_stderr(stderr_capture):
            exec(code, namespace)
    except SystemExit as e:
        exit_code = e.code if isinstance(e.code, int) else 1
    except Exception:
        exit_code = 1
        stderr_capture.write(traceback.format_exc())

    return {
        "stdout": stdout_capture.getvalue(),
        "stderr": stderr_capture.getvalue(),
        "exit_code": exit_code,
    }

# ── Main loop ────────────────────────────────────────────────────────

def main():
    # Parse tool names from environment
    tools = []
    ptc_tools = os.environ.get("PTC_TOOLS", "")
    if ptc_tools:
        tools = [t.strip() for t in ptc_tools.split(",") if t.strip()]

    # Signal ready
    _write_stderr(f"{IPC_READY}\n")

    while True:
        code = read_code_block()
        if code is None:
            break  # EOF or exit signal

        # Reset tool handler state between executions
        _handler.call_counter = 0
        _handler._pending_calls = []
        _handler._last_call_time = None
        _handler._results_cache = {}

        result = execute_code(code, tools)

        # Send result to host via stdout
        result_json = json.dumps(result)
        _write_stdout(f"{IPC_CODE_OUTPUT_START}{result_json}{IPC_CODE_OUTPUT_END}\n")


if __name__ == "__main__":
    main()
"#;

/// Get the runner script as bytes for copying to container.
pub fn get_runner_script_bytes() -> Vec<u8> {
    RUNNER_SCRIPT.as_bytes().to_vec()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_runner_script_not_empty() {
        assert!(!RUNNER_SCRIPT.is_empty());
        assert!(RUNNER_SCRIPT.contains("def execute_code"));
        assert!(RUNNER_SCRIPT.contains("def call_tool"));
    }

    #[test]
    fn test_runner_script_bytes() {
        let bytes = get_runner_script_bytes();
        assert!(!bytes.is_empty());
        assert!(std::str::from_utf8(&bytes).is_ok());
    }

    #[test]
    fn test_runner_has_main() {
        assert!(RUNNER_SCRIPT.contains("def main():"));
        assert!(RUNNER_SCRIPT.contains("if __name__ == \"__main__\":"));
    }

    #[test]
    fn test_runner_has_ipc_markers() {
        assert!(RUNNER_SCRIPT.contains("__PTC_TOOL_CALL__"));
        assert!(RUNNER_SCRIPT.contains("__PTC_END_CALL__"));
        assert!(RUNNER_SCRIPT.contains("__PTC_TOOL_RESULT__"));
        assert!(RUNNER_SCRIPT.contains("__PTC_END_RESULT__"));
        assert!(RUNNER_SCRIPT.contains("__PTC_OUTPUT__"));
        assert!(RUNNER_SCRIPT.contains("__PTC_END_OUTPUT__"));
        assert!(RUNNER_SCRIPT.contains("__READY__"));
    }

    #[test]
    fn test_runner_loop_mode() {
        assert!(RUNNER_SCRIPT.contains("__CODE_START__"));
        assert!(RUNNER_SCRIPT.contains("__CODE_END__"));
        assert!(RUNNER_SCRIPT.contains("while True:"));
        assert!(RUNNER_SCRIPT.contains("read_code_block"));
    }

    #[test]
    fn test_runner_unbuffered_io() {
        // Uses os.write/os.read instead of print/sys.stdin
        assert!(RUNNER_SCRIPT.contains("os.write("));
        assert!(RUNNER_SCRIPT.contains("os.read("));
        assert!(RUNNER_SCRIPT.contains("select.select"));
    }

    #[test]
    fn test_ipc_constants_match_script() {
        assert!(RUNNER_SCRIPT.contains(IPC_CODE_START));
        assert!(RUNNER_SCRIPT.contains(IPC_CODE_END));
        assert!(RUNNER_SCRIPT.contains(IPC_TOOL_CALL_START));
        assert!(RUNNER_SCRIPT.contains(IPC_TOOL_CALL_END));
        assert!(RUNNER_SCRIPT.contains(IPC_TOOL_RESULT_START));
        assert!(RUNNER_SCRIPT.contains(IPC_TOOL_RESULT_END));
        assert!(RUNNER_SCRIPT.contains(IPC_CODE_OUTPUT_START));
        assert!(RUNNER_SCRIPT.contains(IPC_CODE_OUTPUT_END));
        assert!(RUNNER_SCRIPT.contains(IPC_READY));
    }
}
