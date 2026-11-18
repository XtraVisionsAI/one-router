//! Redaction of credentials and infrastructure identifiers in client-facing text.
//!
//! Applied to every error message the gateway returns (both error envelopes'
//! constructors), so upstream error text relayed to API-key holders cannot
//! carry:
//! - provider API keys (`sk-…`, even partially masked forms like
//!   `sk-proj-ab****wxyz`), Google keys (`AIza…`),
//! - AWS access key ids (`AKIA…` / `ASIA…`), ARNs (`arn:aws:sts::<account>:…`,
//!   which name the host's IAM role) and 12-digit account ids,
//! - request URLs embedded in reqwest errors (`… for url (https://…)`) and any
//!   other bare `http(s)://` URL, which can include a backend `base_url` or a
//!   webhook token,
//! - scheme-less **internal** endpoints: hostnames under internal-only
//!   suffixes (`*.internal`, `*.local`, `*.corp`, `*.lan`, `*.intranet`,
//!   `*.localdomain`, with or without `:port`) and `localhost` / private,
//!   loopback or link-local IPv4 **with a port** (`10.0.0.5:8443`).
//!
//! Known limit: other scheme-less hostnames (`relay.example.com:443`) and bare
//! private IPs without a port are left alone — they cannot be told apart from
//! ordinary text (versions, file names) without false positives.

/// Characters that can be part of a secret-looking token.
fn is_token_char(c: char) -> bool {
    c.is_ascii_alphanumeric() || matches!(c, '-' | '_' | ':' | '/' | '.' | '*' | '+')
}

fn redact_token(tok: &str) -> Option<String> {
    let t = tok.trim_end_matches(['.', ':', '/']);
    let suffix = &tok[t.len()..];
    let lower = t.to_ascii_lowercase();
    if lower.starts_with("arn:aws") {
        // Keep the partition + service for debuggability, drop account / resource.
        let keep: Vec<&str> = t.splitn(4, ':').take(3).collect();
        return Some(format!("{}:****{suffix}", keep.join(":")));
    }
    if t.contains('/') {
        // e.g. a SigV4 credential scope `AKIA…/20260101/us-east-1/bedrock/aws4_request`.
        let parts: Vec<String> = t
            .split('/')
            .map(|p| redact_segment(p).unwrap_or_else(|| p.to_string()))
            .collect();
        let joined = parts.join("/");
        return (joined != t).then(|| format!("{joined}{suffix}"));
    }
    redact_segment(t).map(|r| format!("{r}{suffix}"))
}

/// Suffixes that only name non-public hosts.
const INTERNAL_HOST_SUFFIXES: &[&str] = &[
    "internal",
    "local",
    "corp",
    "lan",
    "intranet",
    "localdomain",
];

/// `relay.corp`, `ip-10-0-0-5.ec2.internal:443`, `10.0.0.5:8443`,
/// `localhost:8080` → `<internal-host>`.
fn redact_internal_host(t: &str) -> Option<String> {
    let (host, port) = match t.rsplit_once(':') {
        Some((h, p)) if !p.is_empty() && p.len() <= 5 && p.bytes().all(|b| b.is_ascii_digit()) => {
            (h, Some(p))
        }
        _ => (t, None),
    };
    if host.contains(':') {
        return None;
    }
    if let Ok(ip) = host.parse::<std::net::Ipv4Addr>() {
        let internal = ip.is_private() || ip.is_loopback() || ip.is_link_local();
        return (internal && port.is_some()).then(|| "<internal-host>".to_string());
    }
    let lower = host.to_ascii_lowercase();
    if lower == "localhost" {
        return port.map(|_| "<internal-host>".to_string());
    }
    let labels: Vec<&str> = lower.split('.').collect();
    let well_formed = labels.len() >= 2
        && labels.iter().all(|l| {
            !l.is_empty()
                && l.bytes().all(|b| b.is_ascii_alphanumeric() || b == b'-')
                && !l.starts_with('-')
        });
    let internal = labels
        .last()
        .is_some_and(|tld| INTERNAL_HOST_SUFFIXES.contains(tld));
    (well_formed && internal).then(|| "<internal-host>".to_string())
}

fn redact_segment(t: &str) -> Option<String> {
    if let Some(r) = redact_internal_host(t) {
        return Some(r);
    }
    let suffix = "";
    let lower = t.to_ascii_lowercase();
    if t.len() >= 12 && (lower.starts_with("sk-") || lower.starts_with("sk_")) {
        return Some(format!("sk-****{suffix}"));
    }
    if t.len() >= 30 && t.starts_with("AIza") {
        return Some(format!("AIza****{suffix}"));
    }
    if t.len() >= 16
        && (t.starts_with("AKIA") || t.starts_with("ASIA"))
        && t.chars()
            .all(|c| c.is_ascii_uppercase() || c.is_ascii_digit())
    {
        return Some(format!("{}****{suffix}", &t[..4]));
    }
    if t.len() == 12 && t.chars().all(|c| c.is_ascii_digit()) {
        return Some(format!("************{suffix}"));
    }
    None
}

/// Remove `for url (…)` fragments produced by reqwest error Display.
fn strip_reqwest_urls(text: &str) -> String {
    let mut out = String::with_capacity(text.len());
    let mut rest = text;
    while let Some(i) = rest.find("for url (") {
        out.push_str(&rest[..i]);
        match rest[i..].find(')') {
            Some(j) => rest = &rest[i + j + 1..],
            None => {
                rest = "";
            }
        }
        out.push_str("for url (redacted)");
    }
    out.push_str(rest);
    out
}

/// Characters that end a bare URL (whitespace, quotes, closing brackets).
fn ends_url(c: char) -> bool {
    c.is_whitespace() || matches!(c, '"' | '\'' | '<' | '>' | ')' | ']' | '}' | '`' | ',')
}

/// Replace bare `http://…` / `https://…` URLs (any case) with `<redacted-url>`
/// — they can carry a backend `base_url`, userinfo or a token in the query.
/// Trailing sentence punctuation is kept outside the redaction.
fn strip_bare_urls(text: &str) -> String {
    let lower = text.to_ascii_lowercase();
    let mut out = String::with_capacity(text.len());
    let mut pos = 0;
    while let Some(rel) = ["http://", "https://"]
        .iter()
        .filter_map(|p| lower[pos..].find(p))
        .min()
    {
        let start = pos + rel;
        out.push_str(&text[pos..start]);
        let end = text[start..]
            .char_indices()
            .find(|(_, c)| ends_url(*c))
            .map(|(i, _)| start + i)
            .unwrap_or(text.len());
        let url = &text[start..end];
        let kept = url.trim_end_matches(['.', ':', ';', '!', '?']);
        out.push_str("<redacted-url>");
        out.push_str(&url[kept.len()..]);
        pos = end;
    }
    out.push_str(&text[pos..]);
    out
}

/// Redact secrets and infrastructure identifiers from `text`.
pub fn redact_secrets(text: &str) -> String {
    let text = strip_bare_urls(&strip_reqwest_urls(text));
    let mut out = String::with_capacity(text.len());
    let mut token = String::new();
    let flush = |token: &mut String, out: &mut String| {
        if !token.is_empty() {
            match redact_token(token) {
                Some(r) => out.push_str(&r),
                None => out.push_str(token),
            }
            token.clear();
        }
    };
    for c in text.chars() {
        if is_token_char(c) {
            token.push(c);
        } else {
            flush(&mut token, &mut out);
            out.push(c);
        }
    }
    flush(&mut token, &mut out);
    out
}

/// Client-facing message for a non-2xx upstream response. Credential failures
/// (401 / 403) never relay the provider's text (it names / partially shows
/// the gateway's key); other errors are relayed redacted.
pub fn upstream_error_message(status: u16, body: &str) -> String {
    if status == 401 || status == 403 {
        format!(
            "The upstream provider rejected the gateway's credentials (HTTP {status}). \
             Details are in the gateway logs."
        )
    } else {
        redact_secrets(body)
    }
}

/// Redact the message fields of an upstream SSE error payload in place
/// (`error.message`, `response.error.message`, top-level `message`) — used for
/// relayed Responses `error` / `response.failed` frames.
pub fn redact_error_payload(payload: &mut serde_json::Value) {
    for ptr in ["/error/message", "/response/error/message", "/message"] {
        if let Some(v) = payload.pointer_mut(ptr) {
            if let Some(s) = v.as_str() {
                *v = serde_json::Value::String(redact_secrets(s));
            }
        }
    }
}

/// Redact a relayed passthrough SSE `data:` payload **if it is an error
/// frame** — Anthropic `{"type":"error","error":{...}}` or OpenAI
/// `{"error":{...}}` / `{"error":"..."}`. Returns the re-serialized payload
/// (same JSON shape, only message strings rewritten), or `None` for every
/// other frame so ordinary chunks are forwarded byte-for-byte.
pub fn redact_sse_error_frame(data: &str) -> Option<String> {
    // Cheap pre-filter: content chunks are the hot path.
    if !data.contains("\"error\"") {
        return None;
    }
    let mut v: serde_json::Value = serde_json::from_str(data).ok()?;
    let obj = v.as_object()?;
    let is_error =
        obj.get("type").and_then(|t| t.as_str()) == Some("error") || obj.contains_key("error");
    if !is_error {
        return None;
    }
    redact_error_payload(&mut v);
    if let Some(e) = v.get_mut("error") {
        if let Some(s) = e.as_str() {
            *e = serde_json::Value::String(redact_secrets(s));
        }
    }
    Some(v.to_string())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn redacts_scheme_less_internal_hosts() {
        for (input, want) in [
            (
                "dial tcp ip-10-0-1-5.ec2.internal:443: i/o timeout",
                "dial tcp <internal-host>: i/o timeout",
            ),
            (
                "lookup relay.corp: no such host",
                "lookup <internal-host>: no such host",
            ),
            (
                "upstream llm-proxy.svc.cluster.local:8080 refused",
                "upstream <internal-host> refused",
            ),
            (
                "connect 10.0.0.5:8443 failed",
                "connect <internal-host> failed",
            ),
            (
                "connect 192.168.1.20:80, 172.16.4.4:9000 and 127.0.0.1:11434",
                "connect <internal-host>, <internal-host> and <internal-host>",
            ),
            ("localhost:8080 down", "<internal-host> down"),
            (
                "proxy at gw.LAN/v1 failed",
                "proxy at <internal-host>/v1 failed",
            ),
        ] {
            assert_eq!(redact_secrets(input), want, "{input}");
        }
    }

    #[test]
    fn internal_host_redaction_has_no_false_positives() {
        for t in [
            "version 10.0.0.5 released",
            "public 8.8.8.8:53 resolver",
            "relay.example.com:443 timed out",
            "use localhost for testing",
            "the internal error was local to the corp",
            "file config.local.json missing",
            "time 10:30:00 UTC",
            "model gpt-4.1 at 0.5 temperature",
            "anthropic.claude-sonnet-4-5-20250929-v1:0",
        ] {
            assert_eq!(redact_secrets(t), t);
        }
    }

    #[test]
    fn redacts_passthrough_sse_error_frames_only() {
        // Anthropic error event payload.
        let out = redact_sse_error_frame(
            r#"{"type":"error","error":{"type":"overloaded_error","message":"relay https://10.1.2.3:8443/v1 key sk-proj-abcdefghijkl"}}"#,
        )
        .unwrap();
        let v: serde_json::Value = serde_json::from_str(&out).unwrap();
        assert_eq!(v["type"], "error");
        assert_eq!(v["error"]["type"], "overloaded_error");
        let msg = v["error"]["message"].as_str().unwrap();
        assert!(
            !msg.contains("10.1.2.3") && !msg.contains("abcdefghijkl"),
            "{msg}"
        );
        // OpenAI error frame (object and string forms).
        let out = redact_sse_error_frame(
            r#"{"error":{"message":"arn:aws:iam::123456789012:role/R","type":"server_error","code":null}}"#,
        )
        .unwrap();
        assert!(
            !out.contains("123456789012") && out.contains("server_error"),
            "{out}"
        );
        let out = redact_sse_error_frame(r#"{"error":"bad sk-proj-abcdefghijkl"}"#).unwrap();
        assert!(!out.contains("abcdefghijkl"), "{out}");
        // Ordinary frames untouched (None = forward verbatim).
        assert_eq!(
            redact_sse_error_frame(r#"{"choices":[{"delta":{"content":"the \"error\" word"}}]}"#),
            None
        );
        assert_eq!(redact_sse_error_frame("[DONE]"), None);
        assert_eq!(
            redact_sse_error_frame(r#"{"type":"content_block_delta","delta":{"text":"hi"}}"#),
            None
        );
    }

    #[test]
    fn redacts_credentials_and_identities() {
        let s = redact_secrets(
            "User: arn:aws:sts::123456789012:assumed-role/GatewayRole/i-0abc is not authorized",
        );
        assert!(!s.contains("123456789012"), "{s}");
        assert!(!s.contains("GatewayRole"), "{s}");
        assert!(s.contains("arn:aws:sts:****"));

        let s = redact_secrets("Incorrect API key provided: sk-proj-ab****wxyz.");
        assert_eq!(s, "Incorrect API key provided: sk-****.");
        assert!(!redact_secrets("Credential=AKIAIOSFODNN7EXAMPLE/2026").contains("IOSFODNN7"));
        assert!(
            !redact_secrets("key AIzaSyA-1234567890abcdefghijklmnopq").contains("1234567890abc")
        );
        assert_eq!(
            redact_secrets("account 123456789012 here"),
            "account ************ here"
        );

        let s = redact_secrets(
            "error sending request for url (https://u:p@relay.example/v1/x): timed out",
        );
        assert_eq!(s, "error sending request for url (redacted): timed out");
    }

    #[test]
    fn leaves_ordinary_text_alone() {
        for t in [
            "messages.0.content: Field required",
            "Model not found: claude-sonnet-4-5-20250929",
            "max_tokens: 64000 > 32000",
            "Throttled: Too many tokens, please wait before trying again.",
            "API key 'sk-abcd••••5678' not found",
        ] {
            assert_eq!(redact_secrets(t), t);
        }
    }

    #[test]
    fn upstream_credential_errors_are_generic() {
        assert!(
            !upstream_error_message(401, "Incorrect API key provided: sk-proj-xx").contains("sk-")
        );
        assert!(upstream_error_message(400, "bad field").contains("bad field"));
    }

    #[test]
    fn strips_bare_urls() {
        assert_eq!(
            redact_secrets("connect to https://user:pw@relay.internal:8443/v1?token=abc failed."),
            "connect to <redacted-url> failed."
        );
        assert_eq!(
            redact_secrets("see (HTTP://10.0.0.5/x), then retry"),
            "see (<redacted-url>), then retry"
        );
        assert_eq!(
            redact_secrets("\"url\":\"https://a.example/b\""),
            "\"url\":\"<redacted-url>\""
        );
        // reqwest form still collapses to its own marker.
        assert_eq!(
            redact_secrets("error for url (https://x.example/y): boom"),
            "error for url (redacted): boom"
        );
        assert_eq!(
            redact_secrets("no urls: httpx is fine"),
            "no urls: httpx is fine"
        );
    }

    #[test]
    fn redacts_error_payload_fields() {
        let mut v = serde_json::json!({
            "type": "error",
            "error": {"message": "bad key sk-proj-abcdefghijkl at https://h.example/x"},
            "response": {"error": {"message": "arn:aws:iam::123456789012:role/R"}},
        });
        redact_error_payload(&mut v);
        let s = v.to_string();
        assert!(
            !s.contains("abcdefghijkl") && !s.contains("h.example"),
            "{s}"
        );
        assert!(!s.contains("123456789012"), "{s}");
    }
}
