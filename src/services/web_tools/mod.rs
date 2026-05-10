pub mod executor;
pub mod fetch;
pub mod search;

// Supported server tool versions (exact match required)
pub const SUPPORTED_WEB_SEARCH_VERSIONS: &[&str] = &["web_search_20250305", "web_search_20260209"];

pub const SUPPORTED_WEB_FETCH_VERSIONS: &[&str] = &["web_fetch_20250910", "web_fetch_20260209"];

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

/// Check if a tool is a supported server tool (web_search or web_fetch).
///
/// Uses exact version matching for type-based detection. Falls back to name-based
/// detection for requests that don't include a type field.
pub fn is_server_tool(tool: &serde_json::Value) -> bool {
    let tool_type = tool["type"].as_str().unwrap_or("");
    if SUPPORTED_WEB_SEARCH_VERSIONS.contains(&tool_type)
        || SUPPORTED_WEB_FETCH_VERSIONS.contains(&tool_type)
    {
        return true;
    }
    // Name-based fallback for requests without explicit type
    let name = tool["name"].as_str().unwrap_or("");
    name == "web_search" || name == "web_fetch"
}

/// Check if a tool looks like a server tool but uses an unsupported version.
/// Returns the unsupported version string if detected.
pub fn unsupported_server_tool_version(tool: &serde_json::Value) -> Option<&str> {
    let tool_type = tool["type"].as_str().unwrap_or("");
    if (tool_type.starts_with("web_search_") || tool_type.starts_with("web_fetch_"))
        && !SUPPORTED_WEB_SEARCH_VERSIONS.contains(&tool_type)
        && !SUPPORTED_WEB_FETCH_VERSIONS.contains(&tool_type)
    {
        return Some(tool_type);
    }
    None
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
                    let kind = if name == "web_search" || name.starts_with("web_search_") {
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
    #[error("Backend error: {0}")]
    BackendError(String),
    #[error("Conversion error: {0}")]
    ConversionError(String),
    #[error("{0} is not supported by this proxy")]
    UnsupportedVersion(String),
}

#[cfg(test)]
mod tests {
    use super::*;
    use serde_json::json;

    #[test]
    fn test_is_server_tool_web_search_supported_version() {
        assert!(is_server_tool(
            &json!({"type": "web_search_20250305", "name": "web_search"})
        ));
        assert!(is_server_tool(
            &json!({"type": "web_search_20260209", "name": "web_search"})
        ));
    }

    #[test]
    fn test_is_server_tool_web_fetch_supported_version() {
        assert!(is_server_tool(
            &json!({"type": "web_fetch_20250910", "name": "web_fetch"})
        ));
        assert!(is_server_tool(
            &json!({"type": "web_fetch_20260209", "name": "web_fetch"})
        ));
    }

    #[test]
    fn test_is_server_tool_name_fallback() {
        assert!(is_server_tool(&json!({"name": "web_search"})));
        assert!(is_server_tool(&json!({"name": "web_fetch"})));
    }

    #[test]
    fn test_is_server_tool_unsupported_version_not_matched() {
        // Unsupported version should NOT be matched by is_server_tool
        assert!(!is_server_tool(
            &json!({"type": "web_search_20261201", "name": "web_search_20261201"})
        ));
    }

    #[test]
    fn test_unsupported_version_detection() {
        assert_eq!(
            unsupported_server_tool_version(&json!({"type": "web_search_20261201"})),
            Some("web_search_20261201")
        );
        assert_eq!(
            unsupported_server_tool_version(&json!({"type": "web_fetch_20991231"})),
            Some("web_fetch_20991231")
        );
        // Supported versions should return None
        assert_eq!(
            unsupported_server_tool_version(&json!({"type": "web_search_20250305"})),
            None
        );
        // Non-web-tool types return None
        assert_eq!(
            unsupported_server_tool_version(&json!({"type": "code_execution_20250825"})),
            None
        );
    }

    #[test]
    fn test_is_server_tool_regular() {
        assert!(!is_server_tool(&json!({"name": "calculator"})));
    }

    #[test]
    fn test_split_tools() {
        let tools = vec![
            json!({"type": "web_search_20250305", "name": "web_search"}),
            json!({"name": "calculator"}),
            json!({"type": "web_fetch_20250910", "name": "web_fetch"}),
            json!({"name": "get_weather"}),
        ];
        let (server, client) = split_tools(&tools);
        assert_eq!(server.len(), 2);
        assert_eq!(client.len(), 2);
    }
}
