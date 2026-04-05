use super::WebToolError;
use async_trait::async_trait;

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

pub struct TavilySearchProvider {
    client: reqwest::Client,
    api_key: String,
}

impl TavilySearchProvider {
    pub fn new(api_key: impl Into<String>) -> Self {
        let client = reqwest::Client::builder()
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
            .map_err(|e| WebToolError::SearchApiError(e.to_string()))?;
        if !resp.status().is_success() {
            let s = resp.status().as_u16();
            let t = resp.text().await.unwrap_or_default();
            return Err(WebToolError::SearchApiError(format!("Tavily {s}: {t}")));
        }
        let data: serde_json::Value = resp
            .json()
            .await
            .map_err(|e| WebToolError::SearchApiError(e.to_string()))?;
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
            .map_err(|e| WebToolError::SearchApiError(e.to_string()))?;
        if !resp.status().is_success() {
            let s = resp.status().as_u16();
            let t = resp.text().await.unwrap_or_default();
            return Err(WebToolError::SearchApiError(format!("Brave {s}: {t}")));
        }
        let data: serde_json::Value = resp
            .json()
            .await
            .map_err(|e| WebToolError::SearchApiError(e.to_string()))?;
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

        // Client-side domain filtering (Brave API does not support domain filters natively)
        if let Some(allowed) = allowed_domains {
            if !allowed.is_empty() {
                results.retain(|r| {
                    let domain = extract_domain(&r.url);
                    allowed.iter().any(|d| domain_matches(&domain, d))
                });
            }
        }
        if let Some(blocked) = blocked_domains {
            if !blocked.is_empty() {
                results.retain(|r| {
                    let domain = extract_domain(&r.url);
                    !blocked.iter().any(|d| domain_matches(&domain, d))
                });
            }
        }

        Ok(results)
    }
}

/// Extract the domain (host) from a URL string.
/// Falls back to returning the full URL if parsing fails.
fn extract_domain(url: &str) -> String {
    // Try to parse as a URL; extract the host portion
    if let Some(rest) = url
        .strip_prefix("https://")
        .or_else(|| url.strip_prefix("http://"))
    {
        rest.split('/').next().unwrap_or(rest).to_lowercase()
    } else {
        url.to_lowercase()
    }
}

/// Check whether a URL domain matches a filter domain.
/// Matches if the domain equals the filter or ends with `.{filter}`.
/// For example, domain "docs.example.com" matches filter "example.com".
fn domain_matches(domain: &str, filter: &str) -> bool {
    let filter_lower = filter.to_lowercase();
    domain == filter_lower || domain.ends_with(&format!(".{filter_lower}"))
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
        assert_eq!(extract_domain("https://example.com/path"), "example.com");
        assert_eq!(
            extract_domain("http://sub.example.com/page"),
            "sub.example.com"
        );
        assert_eq!(extract_domain("https://EXAMPLE.COM"), "example.com");
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
}
