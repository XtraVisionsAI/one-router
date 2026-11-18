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
//!   webhook token.

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

fn redact_segment(t: &str) -> Option<String> {
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

#[cfg(test)]
mod tests {
    use super::*;

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
