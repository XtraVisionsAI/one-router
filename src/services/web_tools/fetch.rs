use super::domains::DomainPolicy;
use super::ssrf;
use super::WebToolError;
use async_trait::async_trait;

#[async_trait]
pub trait FetchProvider: Send + Sync {
    /// Fetch `url`. Implementations must refuse URLs (and every redirect hop
    /// they control) that `policy` does not permit.
    async fn fetch(
        &self,
        url: &str,
        policy: &DomainPolicy,
        max_content_kb: u64,
    ) -> Result<FetchResult, WebToolError>;
}

#[derive(Debug, Clone)]
pub struct FetchResult {
    pub url: String,
    pub content: String,
    pub content_type: String,
    pub status_code: u16,
}

pub struct ReqwestFetchProvider {
    timeout: std::time::Duration,
}

impl ReqwestFetchProvider {
    pub fn new(_max_content_kb: u64) -> Self {
        Self {
            timeout: std::time::Duration::from_secs(15),
        }
    }
}

#[async_trait]
impl FetchProvider for ReqwestFetchProvider {
    async fn fetch(
        &self,
        url: &str,
        policy: &DomainPolicy,
        max_content_kb: u64,
    ) -> Result<FetchResult, WebToolError> {
        // SSRF-guarded GET that re-validates every redirect hop against the
        // domain policy and IP rules (guarded resolver at connect time).
        let max_bytes = content_cap_bytes(max_content_kb);
        let result = ssrf::safe_get_bytes(
            url,
            max_bytes,
            self.timeout,
            "one-router/web-fetch 1.0",
            ssrf::OversizePolicy::Truncate,
            |u| policy.check_url(u.as_str()),
        )
        .await
        .map_err(WebToolError::FetchError)?;

        let content = if result.content_type.contains("html") {
            strip_html(
                &decode_text(&result.bytes)
                    .unwrap_or_else(|| String::from_utf8_lossy(&result.bytes).into_owned()),
            )
        } else {
            decode_text(&result.bytes).unwrap_or_else(|| "[binary content]".to_string())
        };

        Ok(FetchResult {
            url: result.final_url,
            content,
            content_type: result.content_type,
            status_code: 200,
        })
    }
}

/// Upper bound for `web_fetch_max_content_kb` (10 MB), enforced by the
/// settings API and again here for values from env / older rows.
pub const MAX_FETCH_CONTENT_KB: u64 = 10 * 1024;

/// Byte cap for a fetch: `kb` clamped to `1..=MAX_FETCH_CONTENT_KB`, no
/// overflow on any `u64`.
pub fn content_cap_bytes(kb: u64) -> usize {
    let bytes = kb.clamp(1, MAX_FETCH_CONTENT_KB).saturating_mul(1024);
    usize::try_from(bytes).unwrap_or(usize::MAX)
}

/// Decode UTF-8 text that may have been truncated mid-character at the byte
/// cap: an incomplete sequence at the very end is dropped instead of failing
/// the whole page. `None` for bytes that are not UTF-8 elsewhere.
fn decode_text(bytes: &[u8]) -> Option<String> {
    match std::str::from_utf8(bytes) {
        Ok(s) => Some(s.to_string()),
        Err(e) if e.error_len().is_none() => {
            Some(String::from_utf8_lossy(&bytes[..e.valid_up_to()]).into_owned())
        }
        Err(_) => None,
    }
}

/// Truncate `s` to at most `max_bytes`, backing off to a char boundary.
fn truncate_to_char_boundary(s: &mut String, max_bytes: usize) {
    if s.len() <= max_bytes {
        return;
    }
    let mut end = max_bytes;
    while !s.is_char_boundary(end) {
        end -= 1;
    }
    s.truncate(end);
}

/// Fetch provider that uses the Tavily Extract API for high-quality content extraction.
/// Handles JS-rendered pages and PDF content that direct HTTP fetching cannot.
pub struct TavilyExtractProvider {
    client: reqwest::Client,
    api_key: String,
}

impl TavilyExtractProvider {
    pub fn new(api_key: String) -> Self {
        let client = reqwest::Client::builder()
            .timeout(std::time::Duration::from_secs(30))
            .redirect(reqwest::redirect::Policy::none())
            .build()
            .expect("Failed to build reqwest client");
        Self { client, api_key }
    }
}

/// Cap on the Tavily Extract API response we are willing to buffer.
const TAVILY_MAX_RESPONSE_BYTES: usize = 16 * 1024 * 1024;

#[async_trait]
impl FetchProvider for TavilyExtractProvider {
    async fn fetch(
        &self,
        url: &str,
        policy: &DomainPolicy,
        max_content_kb: u64,
    ) -> Result<FetchResult, WebToolError> {
        // Tavily fetches server-side, so the policy is enforced on the
        // requested URL up front and on the URL Tavily reports back.
        policy.check_url(url).map_err(WebToolError::FetchError)?;

        let response = self
            .client
            .post("https://api.tavily.com/extract")
            .header("Content-Type", "application/json")
            .json(&serde_json::json!({
                "api_key": self.api_key,
                "urls": [url]
            }))
            .send()
            .await
            .map_err(|e| {
                WebToolError::FetchError(format!("Tavily Extract API error: {}", e.without_url()))
            })?;

        if !response.status().is_success() {
            let status = response.status().as_u16();
            let body = ssrf::read_body_capped(response, 4096, ssrf::OversizePolicy::Truncate)
                .await
                .unwrap_or_default();
            return Err(WebToolError::FetchError(format!(
                "Tavily Extract API returned {status}: {}",
                String::from_utf8_lossy(&body)
            )));
        }

        let body = ssrf::read_body_capped(
            response,
            TAVILY_MAX_RESPONSE_BYTES,
            ssrf::OversizePolicy::Reject,
        )
        .await
        .map_err(|e| WebToolError::FetchError(format!("Tavily Extract API: {e}")))?;
        let json: serde_json::Value = serde_json::from_slice(&body).map_err(|e| {
            WebToolError::FetchError(format!("Failed to parse Tavily response: {e}"))
        })?;

        // Tavily returns { "results": [{"url": "...", "raw_content": "..."}] }
        let first = json["results"].as_array().and_then(|arr| arr.first());
        if let Some(reported) = first.and_then(|r| r["url"].as_str()) {
            if reported != url {
                policy
                    .check_url(reported)
                    .map_err(WebToolError::FetchError)?;
            }
        }
        let mut content = first
            .and_then(|r| r["raw_content"].as_str())
            .unwrap_or("")
            .to_string();

        truncate_to_char_boundary(&mut content, content_cap_bytes(max_content_kb));

        Ok(FetchResult {
            url: url.to_string(),
            content,
            content_type: "text/plain".to_string(),
            status_code: 200,
        })
    }
}

fn strip_html(html: &str) -> String {
    let html_owned;
    // ASCII-only lowercasing keeps byte offsets identical to `html`.
    let lower = html.to_ascii_lowercase();
    let html = if lower.contains("<script") || lower.contains("<style") {
        html_owned = remove_script_style(html);
        &html_owned
    } else {
        html
    };

    let mut result = String::with_capacity(html.len());
    let mut inside_tag = false;
    for ch in html.chars() {
        match ch {
            '<' => inside_tag = true,
            '>' => {
                inside_tag = false;
                result.push(' ');
            }
            _ if !inside_tag => result.push(ch),
            _ => {}
        }
    }
    result
        .replace("&amp;", "&")
        .replace("&lt;", "<")
        .replace("&gt;", ">")
        .replace("&quot;", "\"")
        .replace("&nbsp;", " ")
        .split_whitespace()
        .collect::<Vec<_>>()
        .join(" ")
}

fn remove_script_style(html: &str) -> String {
    // `to_ascii_lowercase` (not `to_lowercase`): Unicode lowercasing can change
    // byte lengths (`İ` → `i̇`), and offsets found in `lower` slice `html`.
    let lower = html.to_ascii_lowercase();
    let mut result = String::with_capacity(html.len());
    let mut pos = 0;

    while pos < html.len() {
        let remaining_lower = &lower[pos..];
        // Find the nearest <script or <style tag
        let script_pos = remaining_lower.find("<script");
        let style_pos = remaining_lower.find("<style");

        let tag_start = match (script_pos, style_pos) {
            (Some(s), Some(st)) => Some(if s <= st {
                (s, "script")
            } else {
                (st, "style")
            }),
            (Some(s), None) => Some((s, "script")),
            (None, Some(st)) => Some((st, "style")),
            (None, None) => None,
        };

        match tag_start {
            Some((offset, tag)) => {
                // Copy everything before this tag
                result.push_str(&html[pos..pos + offset]);
                let close_tag = format!("</{tag}>");
                let search_from = pos + offset;
                if let Some(end_offset) = lower[search_from..].find(&close_tag) {
                    // Skip past the closing tag
                    pos = search_from + end_offset + close_tag.len();
                } else {
                    // No closing tag found; skip to end
                    pos = html.len();
                }
            }
            None => {
                // No more tags; copy the rest
                result.push_str(&html[pos..]);
                break;
            }
        }
    }

    result
}

#[cfg(test)]
mod tests {
    use super::*;
    use serde_json::json;

    #[test]
    fn test_strip_html_basic() {
        let text = strip_html("<h1>Hello</h1><p>World</p>");
        assert!(text.contains("Hello") && text.contains("World") && !text.contains("<h1>"));
    }
    #[test]
    fn test_strip_html_entities() {
        let text = strip_html("<p>AT&amp;T &lt;Corp&gt;</p>");
        assert!(text.contains("AT&T") && text.contains("<Corp>"));
    }

    #[test]
    fn strip_html_with_length_changing_unicode_does_not_panic() {
        // `İ`.to_lowercase() is 3 bytes vs 2: offsets from a Unicode-lowercased
        // copy used to slice the original mid-character.
        let html = "İİİİ<p>前</p><SCRIPT>evil()</SCRIPT>中文😀 <style>x{}</style>end İ";
        let text = strip_html(html);
        assert!(text.contains("前") && text.contains("中文😀") && text.contains("end"));
        assert!(!text.contains("evil") && !text.contains("x{}"));
        // Unclosed script after multibyte text.
        let text = strip_html("ẞẞ😀<script>never closed");
        assert_eq!(text, "ẞẞ😀");
    }

    #[test]
    fn truncation_respects_char_boundaries() {
        let mut s = "中文😀abc".to_string(); // 3 + 3 + 4 + 3 bytes
        truncate_to_char_boundary(&mut s, 8);
        assert_eq!(s, "中文");
        let mut s = "😀".to_string();
        truncate_to_char_boundary(&mut s, 2);
        assert_eq!(s, "");
        let mut s = "abc".to_string();
        truncate_to_char_boundary(&mut s, 10);
        assert_eq!(s, "abc");
    }

    #[test]
    fn decode_text_tolerates_cut_at_the_cap() {
        let bytes = "页面内容".as_bytes();
        // Cut inside the last character: the complete prefix survives.
        assert_eq!(decode_text(&bytes[..bytes.len() - 1]).unwrap(), "页面内");
        assert_eq!(decode_text(bytes).unwrap(), "页面内容");
        // Invalid bytes in the middle: not text.
        assert!(decode_text(&[b'a', 0xff, b'b']).is_none());
    }

    #[test]
    fn content_cap_never_overflows() {
        assert_eq!(content_cap_bytes(512), 512 * 1024);
        assert_eq!(content_cap_bytes(0), 1024);
        assert_eq!(content_cap_bytes(u64::MAX), 10 * 1024 * 1024);
        assert_eq!(content_cap_bytes(u64::MAX / 512), 10 * 1024 * 1024);
    }

    #[test]
    fn policy_blocks_and_allows() {
        let blocked = DomainPolicy::from_tool_definition(&json!({"blocked_domains": ["evil.com"]}));
        assert!(blocked.check_url("https://evil.com/page").is_err());
        let allowed = DomainPolicy::from_tool_definition(&json!({"allowed_domains": ["good.com"]}));
        assert!(allowed.check_url("https://good.com/page").is_ok());
        assert!(allowed.check_url("https://other.com/page").is_err());
        let open = DomainPolicy::from_tool_definition(&json!({"allowed_domains": []}));
        assert!(open.check_url("https://anything.com/").is_ok());
    }

    #[tokio::test]
    async fn tavily_provider_refuses_disallowed_url_before_calling_api() {
        let p = TavilyExtractProvider::new("k".into());
        let policy = DomainPolicy::from_tool_definition(&json!({"allowed_domains": ["good.com"]}));
        let err = p
            .fetch("https://evil.com?.good.com", &policy, 64)
            .await
            .unwrap_err();
        assert!(err.to_string().contains("not in allowed list"), "{err}");
    }
}
