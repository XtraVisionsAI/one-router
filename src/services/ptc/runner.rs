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
/// Protocol (every payload is **base64** of UTF-8 text, so user data that
/// happens to contain a boundary marker can never truncate a frame):
///   stderr → host:  `__READY__\n`  (runner is waiting for code)
///   stdin  → runner: `__CODE_START__\n{b64(code)}\n__CODE_END__\n`
///   stderr → host:  `__PTC_TOOL_CALL__{b64(json)}__PTC_END_CALL__\n`
///   stdin  → runner: `__PTC_TOOL_RESULT__{b64(json)}__PTC_END_RESULT__\n`
///   stdout → host:  `__PTC_OUTPUT__{b64(json)}__PTC_END_OUTPUT__\n`
///
/// The script is passed to the container as `python -u -B -c <script>` (no
/// file upload, so the root filesystem can stay read-only). Callable tool
/// names arrive in the `PTC_TOOLS` environment variable.
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
import base64
import secrets
import threading
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
# Captured stdout/stderr are truncated to this many characters each before
# being reported (the host also caps every frame).
MAX_CAPTURE_CHARS = 256_000

def _b64e(text: str) -> str:
    return base64.b64encode(text.encode("utf-8")).decode("ascii")

def _b64d(data: str) -> str:
    return base64.b64decode(data.encode("ascii"), validate=True).decode("utf-8")

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

    try:
        return _b64d("".join(code_lines))
    except Exception:
        return "raise RuntimeError('PTC runner: malformed code frame')"

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
                return json.loads(_b64d(line[start:end]))
            except Exception:
                return None

# ── Tool calling ─────────────────────────────────────────────────────

# Batching: the thread that opens a round-trip waits until no new call has
# arrived for BATCH_QUIET_MS (at most BATCH_MAX_WAIT_MS), so calls issued
# concurrently from several threads (ThreadPoolExecutor, ...) share one
# frame.
BATCH_QUIET_MS = 20
BATCH_MAX_WAIT_MS = 200
# Host-side cap on calls per frame (`validate_sandbox_tool_calls`).
MAX_CALLS_PER_BATCH = 32


class ToolCallHandler:
    """Thread-safe tool calling over the single host channel.

    Invariant (host protocol): exactly one frame per host message — at
    most one tool-call frame is in flight, and the next one is written
    only after the host's result message for the previous one was read.

    `call_tool` may be called from any thread. Calls are queued under a
    lock; when no round-trip is in flight, one caller becomes the leader:
    it collects the queue into one batch (≤ MAX_CALLS_PER_BATCH; any
    excess gets an error result), writes one frame, reads one result
    message and routes the results to their callers by tool_use_id. Calls
    made while a batch is in flight wait for the next round-trip. Every
    caller blocks until its own result (or an error) is available — never
    None for a missing result.
    """

    def __init__(self):
        self._cond = threading.Condition()
        self.reset()

    def reset(self) -> None:
        with self._cond:
            self.call_counter = 0
            self._queue: List[Dict] = []
            self._results: Dict[str, Any] = {}
            self._in_flight = False
            self._closed = False

    def _generate_id(self) -> str:
        # Random per call (not a per-session counter): ids never repeat
        # across sessions, so a stale or foreign tool_result cannot match.
        self.call_counter += 1
        return "toolu_" + secrets.token_hex(12)

    def close_and_drain(self) -> None:
        """The code block finished: refuse new calls and wait for any
        round-trip still in flight (a straggler thread), so the output
        frame is never written while a tool-call frame awaits its reply."""
        with self._cond:
            self._closed = True
            for call in self._queue:
                self._results[call["tool_use_id"]] = {
                    "error": "Code execution finished before the tool call was sent"
                }
            self._queue = []
            self._cond.notify_all()
            while self._in_flight:
                self._cond.wait()

    def request_tool_call(self, name: str, **kwargs) -> Any:
        """Issue a tool call; blocks until this call's result arrives."""
        with self._cond:
            tool_use_id = self._generate_id()
            if self._closed:
                return {"error": "Code execution finished before the tool call was sent"}
            self._queue.append({"tool_use_id": tool_use_id, "name": name, "input": kwargs})
            self._cond.notify_all()
            while True:
                if tool_use_id in self._results:
                    return self._results.pop(tool_use_id)
                if not self._in_flight and self._queue:
                    self._lead_round_trip()
                    continue
                self._cond.wait()

    def _lead_round_trip(self) -> None:
        """Called with the lock held; releases it while sleeping / doing IO."""
        self._in_flight = True
        try:
            # Collect concurrent callers into this batch.
            started = time.monotonic()
            while len(self._queue) < MAX_CALLS_PER_BATCH:
                seen = len(self._queue)
                self._cond.release()
                try:
                    time.sleep(BATCH_QUIET_MS / 1000.0)
                finally:
                    self._cond.acquire()
                if len(self._queue) == seen:
                    break
                if (time.monotonic() - started) * 1000 >= BATCH_MAX_WAIT_MS:
                    break
            batch = self._queue[:MAX_CALLS_PER_BATCH]
            excess = self._queue[MAX_CALLS_PER_BATCH:]
            self._queue = []
            for call in excess:
                self._results[call["tool_use_id"]] = {
                    "error": f"Too many concurrent tool calls (max {MAX_CALLS_PER_BATCH} per batch)"
                }
            self._cond.notify_all()
            # The code block may have ended while we slept (close_and_drain
            # errors out and clears the queue): never send an empty frame —
            # the host treats `{"calls": []}` as invalid and tears the
            # session down, losing the real output.
            if not batch or self._closed:
                for call in batch:
                    self._results[call["tool_use_id"]] = {"error": "Code execution finished"}
                return

            self._cond.release()
            try:
                results = self._round_trip(batch)
            finally:
                self._cond.acquire()
            self._results.update(results)
        finally:
            self._in_flight = False
            self._cond.notify_all()

    def _round_trip(self, calls: List[Dict]) -> Dict[str, Any]:
        """Write one tool-call frame, read one result message (no lock held)."""
        ids = [c["tool_use_id"] for c in calls]
        out: Dict[str, Any] = {}
        try:
            request = _b64e(json.dumps({"calls": calls}))
            _write_stderr(f"{IPC_TOOL_CALL_START}{request}{IPC_TOOL_CALL_END}\n")
            data = _read_tool_result()
        except Exception as e:  # e.g. non-JSON-serializable tool input
            data = None
            for cid in ids:
                out[cid] = {"error": f"Tool call failed: {e}"}
            return out
        if data is None:
            for cid in ids:
                out[cid] = {"error": "Timeout waiting for tool result"}
            return out
        wanted = set(ids)
        for r in data.get("results", []) if isinstance(data, dict) else []:
            rid = r.get("tool_use_id") if isinstance(r, dict) else None
            if rid not in wanted:
                continue
            if r.get("is_error"):
                out[rid] = {"error": r.get("content", "Tool error")}
            else:
                out[rid] = r.get("content")
        for cid in ids:
            if cid not in out:
                out[cid] = {"error": "No tool result received for this call"}
        return out


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

    def _cap(text: str) -> str:
        if len(text) > MAX_CAPTURE_CHARS:
            return text[:MAX_CAPTURE_CHARS] + "\n[output truncated]"
        return text

    return {
        "stdout": _cap(stdout_capture.getvalue()),
        "stderr": _cap(stderr_capture.getvalue()),
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
        _handler.reset()

        result = execute_code(code, tools)
        # Straggler threads must not write a tool-call frame after (or
        # while) the output frame is written.
        _handler.close_and_drain()

        # Send result to host via stdout
        result_json = _b64e(json.dumps(result))
        _write_stdout(f"{IPC_CODE_OUTPUT_START}{result_json}{IPC_CODE_OUTPUT_END}\n")


if __name__ == "__main__":
    main()
"#;

/// Get the runner script as bytes.
pub fn get_runner_script_bytes() -> Vec<u8> {
    RUNNER_SCRIPT.as_bytes().to_vec()
}

/// Container command that runs the runner script inline (`python -c`), so no
/// file has to be uploaded into the (read-only) container filesystem.
pub fn runner_command() -> Vec<String> {
    vec![
        "python".to_string(),
        "-u".to_string(),
        "-B".to_string(),
        "-c".to_string(),
        RUNNER_SCRIPT.to_string(),
    ]
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
    fn test_runner_uses_base64_framing() {
        assert!(RUNNER_SCRIPT.contains("import base64"));
        assert!(RUNNER_SCRIPT.contains("_b64e(json.dumps(result))"));
        assert!(RUNNER_SCRIPT.contains("_b64e(json.dumps({\"calls\": calls}))"));
        assert!(RUNNER_SCRIPT.contains("MAX_CALLS_PER_BATCH = 32"));
        assert!(RUNNER_SCRIPT.contains("json.loads(_b64d(line[start:end]))"));
        assert!(RUNNER_SCRIPT.contains("MAX_CAPTURE_CHARS"));
    }

    #[test]
    fn test_runner_tool_ids_are_random() {
        // 24 hex chars after `toolu_` — within the host-side validation
        // (`toolu_[A-Za-z0-9_-]{1,64}`), and never a per-session counter.
        assert!(RUNNER_SCRIPT.contains("import secrets"));
        assert!(RUNNER_SCRIPT.contains(r#"return "toolu_" + secrets.token_hex(12)"#));
        assert!(!RUNNER_SCRIPT.contains("call_counter:012d"));
    }

    /// Drives the real runner script with a fake host (`testdata/runner_host.py`):
    /// concurrent calls from 8 threads, nested batches, > 32 concurrent calls,
    /// missing results, straggler threads — asserting exactly one frame per
    /// host message and correct result routing. Skipped without `python3`.
    #[test]
    fn test_runner_thread_safe_batching_with_python() {
        let python = std::env::var("PYTHON").unwrap_or_else(|_| "python3".into());
        if std::process::Command::new(&python)
            .arg("--version")
            .output()
            .is_err()
        {
            eprintln!("python3 not available; skipping runner integration test");
            return;
        }
        let dir = tempfile::tempdir().unwrap();
        let runner = dir.path().join("runner.py");
        let host = dir.path().join("host.py");
        std::fs::write(&runner, RUNNER_SCRIPT).unwrap();
        std::fs::write(&host, include_str!("testdata/runner_host.py")).unwrap();
        let out = std::process::Command::new(&python)
            .arg("-I")
            .arg(&host)
            .arg(&runner)
            .current_dir(dir.path())
            .output()
            .unwrap();
        let stdout = String::from_utf8_lossy(&out.stdout);
        assert!(
            out.status.success() && stdout.contains("ALL OK"),
            "runner host test failed:\n{stdout}\n{}",
            String::from_utf8_lossy(&out.stderr)
        );
    }

    #[test]
    fn test_runner_command_inline() {
        let cmd = runner_command();
        assert_eq!(&cmd[..4], &["python", "-u", "-B", "-c"]);
        assert_eq!(cmd[4], RUNNER_SCRIPT);
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
