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
        _: Option<&[String]>,
        _: Option<&[String]>,
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
        Ok(data["web"]["results"]
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
            .unwrap_or_default())
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
}
