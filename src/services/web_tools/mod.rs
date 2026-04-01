pub mod executor;
pub mod fetch;
pub mod search;

#[derive(Debug, Clone, PartialEq)]
pub enum WebToolKind {
    Search,
    Fetch,
}

#[derive(Debug, Clone)]
pub struct ServerToolCall {
    pub id: String,
    pub name: String,
    pub kind: WebToolKind,
    pub input: serde_json::Value,
}

pub fn is_server_tool(tool: &serde_json::Value) -> bool {
    let name = tool["name"].as_str().unwrap_or("");
    name.starts_with("web_search_") || name.starts_with("web_fetch_")
}

pub fn split_tools(
    tools: &[serde_json::Value],
) -> (Vec<serde_json::Value>, Vec<serde_json::Value>) {
    let server: Vec<_> = tools
        .iter()
        .filter(|t| is_server_tool(t))
        .cloned()
        .collect();
    let client: Vec<_> = tools
        .iter()
        .filter(|t| !is_server_tool(t))
        .cloned()
        .collect();
    (server, client)
}

pub fn extract_server_calls(
    content: &[crate::schemas::anthropic::ContentBlock],
    server_tool_names: &std::collections::HashSet<String>,
) -> Vec<ServerToolCall> {
    content
        .iter()
        .filter_map(|block| {
            if let crate::schemas::anthropic::ContentBlock::ToolUse {
                id, name, input, ..
            } = block
            {
                if server_tool_names.contains(name) {
                    let kind = if name.starts_with("web_search_") {
                        WebToolKind::Search
                    } else {
                        WebToolKind::Fetch
                    };
                    return Some(ServerToolCall {
                        id: id.clone(),
                        name: name.clone(),
                        kind,
                        input: input.clone(),
                    });
                }
            }
            None
        })
        .collect()
}

#[derive(Debug, thiserror::Error)]
pub enum WebToolError {
    #[error("Max iterations ({0}) exceeded")]
    MaxIterationsExceeded(u32),
    #[error("Search provider not configured")]
    SearchNotConfigured,
    #[error("Search API error: {0}")]
    SearchApiError(String),
    #[error("Fetch error: {0}")]
    FetchError(String),
    #[error("Bedrock error: {0}")]
    BedrockError(String),
    #[error("Conversion error: {0}")]
    ConversionError(String),
}

#[cfg(test)]
mod tests {
    use super::*;
    use serde_json::json;

    #[test]
    fn test_is_server_tool_web_search() {
        assert!(is_server_tool(&json!({"name": "web_search_20250305"})));
    }
    #[test]
    fn test_is_server_tool_web_fetch() {
        assert!(is_server_tool(&json!({"name": "web_fetch_20250910"})));
    }
    #[test]
    fn test_is_server_tool_regular() {
        assert!(!is_server_tool(&json!({"name": "calculator"})));
    }
    #[test]
    fn test_split_tools() {
        let tools = vec![
            json!({"name": "web_search_20250305"}),
            json!({"name": "calculator"}),
            json!({"name": "web_fetch_20250910"}),
            json!({"name": "get_weather"}),
        ];
        let (server, client) = split_tools(&tools);
        assert_eq!(server.len(), 2);
        assert_eq!(client.len(), 2);
    }
}
