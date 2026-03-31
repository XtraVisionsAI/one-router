use std::collections::HashSet;
use std::sync::Arc;

use crate::converters::anthropic_bedrock;
use crate::schemas::anthropic::{
    ContentBlock, Message, MessageContent, MessageRequest, MessageResponse, ToolResultValue,
};
use crate::services::bedrock::BedrockService;

use super::{extract_server_calls, split_tools, ServerToolCall, WebToolError, WebToolKind};
use super::{
    fetch::{FetchProvider, ReqwestFetchProvider},
    search::SearchProvider,
};

pub struct WebToolExecutor {
    pub search: Option<Arc<dyn SearchProvider>>,
    pub fetch: Arc<dyn FetchProvider>,
    pub max_iterations: u32,
    pub max_fetch_kb: u64,
}

impl WebToolExecutor {
    pub fn new(
        search: Option<Arc<dyn SearchProvider>>,
        max_fetch_kb: u64,
        max_iterations: u32,
    ) -> Self {
        Self {
            search,
            fetch: Arc::new(ReqwestFetchProvider::new(max_fetch_kb)),
            max_iterations,
            max_fetch_kb,
        }
    }

    pub fn has_server_tools(request: &MessageRequest) -> bool {
        request
            .tools
            .as_deref()
            .map(|tools| tools.iter().any(super::is_server_tool))
            .unwrap_or(false)
    }

    pub async fn run(
        &self,
        request: &MessageRequest,
        bedrock: &BedrockService,
        target_model: &str,
    ) -> Result<MessageResponse, WebToolError> {
        let tools = request.tools.as_deref().unwrap_or(&[]);
        let (server_tools, client_tools) = split_tools(tools);

        let server_names: HashSet<String> = server_tools
            .iter()
            .filter_map(|t| t["name"].as_str().map(|s| s.to_string()))
            .collect();

        let mut messages = request.messages.clone();
        let mut server_blocks: Vec<ContentBlock> = Vec::new();

        for iteration in 0..self.max_iterations {
            let mut modified = request.clone();
            modified.messages = messages.clone();
            modified.tools = if client_tools.is_empty() {
                None
            } else {
                Some(client_tools.clone())
            };
            modified.stream = false;

            let (converse_req, mapper) =
                anthropic_bedrock::convert_request(&modified, target_model)
                    .map_err(|e| WebToolError::ConversionError(e.to_string()))?;

            let output = bedrock
                .converse(converse_req)
                .await
                .map_err(|e| WebToolError::BedrockError(e.to_string()))?;

            let response = anthropic_bedrock::convert_response(output, &request.model, &mapper)
                .map_err(|e| WebToolError::ConversionError(e.to_string()))?;

            let server_calls = extract_server_calls(&response.content, &server_names);

            if server_calls.is_empty() {
                let mut final_content = server_blocks;
                final_content.extend(response.content);
                return Ok(MessageResponse {
                    content: final_content,
                    ..response
                });
            }

            tracing::debug!(
                iteration,
                call_count = server_calls.len(),
                "Executing web tool calls"
            );

            let mut tool_result_blocks: Vec<ContentBlock> = Vec::new();
            for call in &server_calls {
                server_blocks.push(ContentBlock::ToolUse {
                    id: call.id.clone(),
                    name: call.name.clone(),
                    input: call.input.clone(),
                    caller: None,
                });

                let result_text = self.execute_call(call).await?;

                server_blocks.push(ContentBlock::ToolResult {
                    tool_use_id: call.id.clone(),
                    content: ToolResultValue::Text(result_text.clone()),
                    is_error: None,
                    cache_control: None,
                });

                tool_result_blocks.push(ContentBlock::ToolResult {
                    tool_use_id: call.id.clone(),
                    content: ToolResultValue::Text(result_text),
                    is_error: None,
                    cache_control: None,
                });
            }

            messages.push(Message {
                role: "assistant".into(),
                content: MessageContent::Blocks(response.content),
            });
            messages.push(Message {
                role: "user".into(),
                content: MessageContent::Blocks(tool_result_blocks),
            });
        }

        Err(WebToolError::MaxIterationsExceeded(self.max_iterations))
    }

    async fn execute_call(&self, call: &ServerToolCall) -> Result<String, WebToolError> {
        let allowed: Option<Vec<String>> = call.input["allowed_domains"].as_array().map(|a| {
            a.iter()
                .filter_map(|v| v.as_str().map(|s| s.to_string()))
                .collect()
        });
        let blocked: Option<Vec<String>> = call.input["blocked_domains"].as_array().map(|a| {
            a.iter()
                .filter_map(|v| v.as_str().map(|s| s.to_string()))
                .collect()
        });

        match call.kind {
            WebToolKind::Search => {
                let searcher = self
                    .search
                    .as_ref()
                    .ok_or(WebToolError::SearchNotConfigured)?;
                let query = call.input["query"].as_str().unwrap_or("");
                let max_results = call.input["max_results"].as_u64().unwrap_or(5) as usize;
                let results = searcher
                    .search(query, allowed.as_deref(), blocked.as_deref(), max_results)
                    .await?;
                Ok(results
                    .iter()
                    .enumerate()
                    .map(|(i, r)| format!("[{}] {}\n{}\n{}", i + 1, r.title, r.url, r.snippet))
                    .collect::<Vec<_>>()
                    .join("\n\n"))
            }
            WebToolKind::Fetch => {
                let url = call.input["url"].as_str().unwrap_or("");
                let result = self
                    .fetch
                    .fetch(
                        url,
                        allowed.as_deref(),
                        blocked.as_deref(),
                        self.max_fetch_kb,
                    )
                    .await?;
                Ok(result.content)
            }
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_has_server_tools_true() {
        let mut req = MessageRequest::new("m", vec![], 100);
        req.tools = Some(vec![serde_json::json!({"name": "web_search_20250305"})]);
        assert!(WebToolExecutor::has_server_tools(&req));
    }
    #[test]
    fn test_has_server_tools_false() {
        let mut req = MessageRequest::new("m", vec![], 100);
        req.tools = Some(vec![serde_json::json!({"name": "calculator"})]);
        assert!(!WebToolExecutor::has_server_tools(&req));
    }
    #[test]
    fn test_has_server_tools_none() {
        let req = MessageRequest::new("m", vec![], 100);
        assert!(!WebToolExecutor::has_server_tools(&req));
    }
}
