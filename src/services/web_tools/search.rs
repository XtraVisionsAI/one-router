use super::domains::{domain_matches, url_host};
use super::WebToolError;
use async_trait::async_trait;

/// Domain lists passed to a provider are **hints** for its native filtering;
/// the executor enforces the effective [`super::domains::DomainPolicy`] on
/// every returned result.
#[async_trait]
pub trait SearchProvider: Send + Sync {
    async fn search(
        &self,
        query: &str,
        allowed_domains: Option<&[String]>,
        blocked_domains: Option<&[String]>,
        max_results: usize,
    ) -> Result<Vec<SearchResult>, WebToolError>;
}

#[derive(Debug, Clone)]
pub struct SearchResult {
    pub title: String,
    pub url: String,
    pub snippet: String,
}

/// Cap on a search provider's success body (results JSON).
const MAX_SEARCH_RESPONSE_BYTES: usize = 4 * 1024 * 1024;
/// Cap on a search provider's error body echoed into the error message.
const MAX_SEARCH_ERROR_BYTES: usize = 4096;

/// Read a provider response with capped bodies: an error status yields the
/// first [`MAX_SEARCH_ERROR_BYTES`] of the body; success is parsed as JSON
/// from at most [`MAX_SEARCH_RESPONSE_BYTES`] (larger bodies are rejected).
async fn read_provider_json(
    resp: reqwest::Response,
    provider: &str,
) -> Result<serde_json::Value, WebToolError> {
    use super::ssrf::{read_body_capped, OversizePolicy};
    if !resp.status().is_success() {
        let s = resp.status().as_u16();
        let body = read_body_capped(resp, MAX_SEARCH_ERROR_BYTES, OversizePolicy::Truncate)
            .await
            .unwrap_or_default();
        return Err(WebToolError::SearchApiError(format!(
            "{provider} {s}: {}",
            String::from_utf8_lossy(&body)
        )));
    }
    let body = read_body_capped(resp, MAX_SEARCH_RESPONSE_BYTES, OversizePolicy::Reject)
        .await
        .map_err(|e| WebToolError::SearchApiError(format!("{provider}: {e}")))?;
    serde_json::from_slice(&body)
        .map_err(|e| WebToolError::SearchApiError(format!("{provider}: invalid JSON: {e}")))
}

pub struct TavilySearchProvider {
    client: reqwest::Client,
    api_key: String,
}

impl TavilySearchProvider {
    pub fn new(api_key: impl Into<String>) -> Self {
        let client = reqwest::Client::builder()
            .redirect(reqwest::redirect::Policy::none())
            .timeout(std::time::Duration::from_secs(15))
            .build()
            .expect("Failed to build reqwest client");
        Self {
            client,
            api_key: api_key.into(),
        }
    }
}

#[async_trait]
impl SearchProvider for TavilySearchProvider {
    async fn search(
        &self,
        query: &str,
        allowed_domains: Option<&[String]>,
        blocked_domains: Option<&[String]>,
        max_results: usize,
    ) -> Result<Vec<SearchResult>, WebToolError> {
        let mut body = serde_json::json!({
            "api_key": self.api_key, "query": query,
            "max_results": max_results, "search_depth": "basic"
        });
        if let Some(d) = allowed_domains {
            if !d.is_empty() {
                body["include_domains"] = serde_json::json!(d);
            }
        }
        if let Some(d) = blocked_domains {
            if !d.is_empty() {
                body["exclude_domains"] = serde_json::json!(d);
            }
        }
        let resp = self
            .client
            .post("https://api.tavily.com/search")
            .json(&body)
            .send()
            .await
            .map_err(|e| WebToolError::SearchApiError(e.without_url().to_string()))?;
        let data = read_provider_json(resp, "Tavily").await?;
        Ok(data["results"]
            .as_array()
            .map(|arr| {
                arr.iter()
                    .map(|r| SearchResult {
                        title: r["title"].as_str().unwrap_or("").to_string(),
                        url: r["url"].as_str().unwrap_or("").to_string(),
                        snippet: r["content"].as_str().unwrap_or("").to_string(),
                    })
                    .collect()
            })
            .unwrap_or_default())
    }
}

pub struct BraveSearchProvider {
    client: reqwest::Client,
    api_key: String,
}

impl BraveSearchProvider {
    pub fn new(api_key: impl Into<String>) -> Self {
        let client = reqwest::Client::builder()
            .redirect(reqwest::redirect::Policy::none())
            .timeout(std::time::Duration::from_secs(15))
            .build()
            .expect("Failed to build reqwest client");
        Self {
            client,
            api_key: api_key.into(),
        }
    }
}

#[async_trait]
impl SearchProvider for BraveSearchProvider {
    async fn search(
        &self,
        query: &str,
        allowed_domains: Option<&[String]>,
        blocked_domains: Option<&[String]>,
        max_results: usize,
    ) -> Result<Vec<SearchResult>, WebToolError> {
        let resp = self
            .client
            .get("https://api.search.brave.com/res/v1/web/search")
            .header("Accept", "application/json")
            .header("X-Subscription-Token", &self.api_key)
            .query(&[("q", query), ("count", &max_results.to_string())])
            .send()
            .await
            .map_err(|e| WebToolError::SearchApiError(e.without_url().to_string()))?;
        let data = read_provider_json(resp, "Brave").await?;
        let mut results: Vec<SearchResult> = data["web"]["results"]
            .as_array()
            .map(|arr| {
                arr.iter()
                    .map(|r| SearchResult {
                        title: r["title"].as_str().unwrap_or("").to_string(),
                        url: r["url"].as_str().unwrap_or("").to_string(),
                        snippet: r["description"].as_str().unwrap_or("").to_string(),
                    })
                    .collect()
            })
            .unwrap_or_default();

        // Brave has no native domain filters: pre-filter here (the executor
        // enforces the full policy on every result afterwards regardless).
        let host_matches = |url: &str, filters: &[String]| {
            url_host(url).is_some_and(|h| filters.iter().any(|d| domain_matches(&h, d)))
        };
        if let Some(allowed) = allowed_domains {
            if !allowed.is_empty() {
                results.retain(|r| host_matches(&r.url, allowed));
            }
        }
        if let Some(blocked) = blocked_domains {
            if !blocked.is_empty() {
                results.retain(|r| !host_matches(&r.url, blocked));
            }
        }

        Ok(results)
    }
}

pub fn build_search_provider(provider: &str, api_key: &str) -> Option<Box<dyn SearchProvider>> {
    if api_key.is_empty() {
        return None;
    }
    match provider {
        "tavily" => Some(Box::new(TavilySearchProvider::new(api_key))),
        "brave" => Some(Box::new(BraveSearchProvider::new(api_key))),
        _ => None,
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_build_tavily() {
        assert!(build_search_provider("tavily", "key").is_some());
    }
    #[test]
    fn test_build_brave() {
        assert!(build_search_provider("brave", "key").is_some());
    }
    #[test]
    fn test_build_unknown() {
        assert!(build_search_provider("google", "key").is_none());
    }
    #[test]
    fn test_build_empty_key() {
        assert!(build_search_provider("tavily", "").is_none());
    }
    #[test]
    fn test_extract_domain() {
        assert_eq!(url_host("https://example.com/path").unwrap(), "example.com");
        assert_eq!(
            url_host("http://sub.example.com/page").unwrap(),
            "sub.example.com"
        );
        assert_eq!(url_host("https://EXAMPLE.COM").unwrap(), "example.com");
        assert_eq!(
            url_host("https://evil.com?.example.com").unwrap(),
            "evil.com"
        );
    }
    #[test]
    fn test_domain_matches_exact() {
        assert!(domain_matches("example.com", "example.com"));
        assert!(!domain_matches("example.com", "other.com"));
    }
    #[test]
    fn test_domain_matches_subdomain() {
        assert!(domain_matches("docs.example.com", "example.com"));
        assert!(!domain_matches("example.com", "docs.example.com"));
    }

    /// Serve one response with `status` and `body` (no Content-Length).
    async fn serve(status: u16, body: Vec<u8>) -> String {
        use tokio::io::{AsyncReadExt, AsyncWriteExt};
        let listener = tokio::net::TcpListener::bind("127.0.0.1:0").await.unwrap();
        let port = listener.local_addr().unwrap().port();
        tokio::spawn(async move {
            let (mut sock, _) = listener.accept().await.unwrap();
            let mut req = [0u8; 1024];
            let _ = sock.read(&mut req).await;
            let head = format!("HTTP/1.1 {status} X\r\nConnection: close\r\n\r\n");
            let _ = sock.write_all(head.as_bytes()).await;
            for c in body.chunks(8192) {
                if sock.write_all(c).await.is_err() {
                    return;
                }
            }
            let _ = sock.shutdown().await;
        });
        format!("http://127.0.0.1:{port}/")
    }

    #[tokio::test]
    async fn provider_bodies_are_capped() {
        let client = reqwest::Client::new();
        // Error body: truncated into the message.
        let url = serve(500, vec![b'e'; 100_000]).await;
        let resp = client.get(&url).send().await.unwrap();
        let err = read_provider_json(resp, "Tavily").await.unwrap_err();
        assert!(err.to_string().len() < MAX_SEARCH_ERROR_BYTES + 100);

        // Oversized success body: rejected, never fully buffered.
        let url = serve(200, vec![b' '; MAX_SEARCH_RESPONSE_BYTES + 10]).await;
        let resp = client.get(&url).send().await.unwrap();
        assert!(read_provider_json(resp, "Brave").await.is_err());

        let url = serve(200, br#"{"results":[]}"#.to_vec()).await;
        let resp = client.get(&url).send().await.unwrap();
        assert!(read_provider_json(resp, "Tavily").await.unwrap()["results"].is_array());
    }
}
