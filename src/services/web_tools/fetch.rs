use super::WebToolError;
use async_trait::async_trait;

#[async_trait]
pub trait FetchProvider: Send + Sync {
    async fn fetch(
        &self,
        url: &str,
        allowed_domains: Option<&[String]>,
        blocked_domains: Option<&[String]>,
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
    client: reqwest::Client,
}

impl ReqwestFetchProvider {
    pub fn new(_max_content_kb: u64) -> Self {
        let client = reqwest::Client::builder()
            .timeout(std::time::Duration::from_secs(15))
            .user_agent("one-router/web-fetch 1.0")
            .build()
            .expect("Failed to build reqwest client");
        Self { client }
    }
}

#[async_trait]
impl FetchProvider for ReqwestFetchProvider {
    async fn fetch(
        &self,
        url: &str,
        allowed_domains: Option<&[String]>,
        blocked_domains: Option<&[String]>,
        max_content_kb: u64,
    ) -> Result<FetchResult, WebToolError> {
        check_domain_filters(url, allowed_domains, blocked_domains)?;

        let response = self
            .client
            .get(url)
            .send()
            .await
            .map_err(|e| WebToolError::FetchError(e.to_string()))?;

        let status_code = response.status().as_u16();
        let content_type = response
            .headers()
            .get("content-type")
            .and_then(|v| v.to_str().ok())
            .unwrap_or("text/html")
            .to_string();

        let bytes = response
            .bytes()
            .await
            .map_err(|e| WebToolError::FetchError(e.to_string()))?;

        let max_bytes = (max_content_kb * 1024) as usize;
        let bytes = if bytes.len() > max_bytes {
            &bytes[..max_bytes]
        } else {
            &bytes[..]
        };

        let content = if content_type.contains("html") {
            strip_html(std::str::from_utf8(bytes).unwrap_or(""))
        } else {
            std::str::from_utf8(bytes)
                .unwrap_or("[binary content]")
                .to_string()
        };

        Ok(FetchResult {
            url: url.to_string(),
            content,
            content_type,
            status_code,
        })
    }
}

fn check_domain_filters(
    url: &str,
    allowed_domains: Option<&[String]>,
    blocked_domains: Option<&[String]>,
) -> Result<(), WebToolError> {
    let host = extract_host(url);
    if let Some(blocked) = blocked_domains {
        if blocked.iter().any(|d| host.ends_with(d.as_str())) {
            return Err(WebToolError::FetchError(format!(
                "Domain '{host}' is blocked"
            )));
        }
    }
    if let Some(allowed) = allowed_domains {
        if !allowed.is_empty() && !allowed.iter().any(|d| host.ends_with(d.as_str())) {
            return Err(WebToolError::FetchError(format!(
                "Domain '{host}' is not in allowed list"
            )));
        }
    }
    Ok(())
}

fn extract_host(url: &str) -> String {
    url.trim_start_matches("https://")
        .trim_start_matches("http://")
        .split('/')
        .next()
        .unwrap_or("")
        .to_string()
}

fn strip_html(html: &str) -> String {
    let html_owned;
    let html = if html.to_lowercase().contains("<script") || html.to_lowercase().contains("<style")
    {
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
    let lower = html.to_lowercase();
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
    fn test_extract_host() {
        assert_eq!(extract_host("https://example.com/path"), "example.com");
        assert_eq!(
            extract_host("http://news.ycombinator.com/item?id=1"),
            "news.ycombinator.com"
        );
    }
    #[test]
    fn test_check_domain_filters_blocked() {
        let blocked = vec!["evil.com".to_string()];
        assert!(check_domain_filters("https://evil.com/page", None, Some(&blocked)).is_err());
    }
    #[test]
    fn test_check_domain_filters_allowed() {
        let allowed = vec!["good.com".to_string()];
        assert!(check_domain_filters("https://good.com/page", Some(&allowed), None).is_ok());
        assert!(check_domain_filters("https://other.com/page", Some(&allowed), None).is_err());
    }
    #[test]
    fn test_check_domain_filters_empty_allowed_passes_all() {
        let allowed: Vec<String> = vec![];
        assert!(check_domain_filters("https://anything.com/", Some(&allowed), None).is_ok());
    }
}
