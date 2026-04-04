//! Capability-based request filtering.
//!
//! Strips request fields that the target model does not support according to
//! its `ModelCapabilities`. The effective capabilities are either the per-model
//! value from `model_mappings.capabilities` or `AppState::default_capabilities`
//! when the mapping has no explicit configuration.

use crate::schemas::anthropic::{ContentBlock, MessageContent, MessageRequest};
use crate::services::capabilities::ModelCapabilities;

/// Apply capability constraints to a request, returning a filtered clone.
///
/// Fields/blocks are stripped when the corresponding capability is disabled:
/// - `thinking` when `caps.thinking.enabled` is false
/// - `tools` + `tool_choice` when `caps.tool_use.enabled` is false
/// - `document` content blocks when `caps.document.enabled` is false
pub fn apply_capabilities(request: &MessageRequest, caps: &ModelCapabilities) -> MessageRequest {
    let mut req = request.clone();

    // ---- thinking ----
    if req.thinking.is_some() && !caps.thinking.enabled {
        req.thinking = None;
    }

    // ---- tools ----
    if req.tools.is_some() && !caps.tool_use.enabled {
        req.tools = None;
        req.tool_choice = None;
    }

    // ---- document blocks ----
    if !caps.document.enabled {
        req.messages = req
            .messages
            .iter()
            .map(|msg| {
                let mut m = msg.clone();
                if let MessageContent::Blocks(ref blocks) = msg.content {
                    let filtered: Vec<ContentBlock> = blocks
                        .iter()
                        .filter(|b| !matches!(b, ContentBlock::Document { .. }))
                        .cloned()
                        .collect();
                    m.content = MessageContent::Blocks(filtered);
                }
                m
            })
            .collect();

        // System messages don't carry document blocks in the Anthropic schema.
        let _ = &req.system;
    }

    req
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::schemas::anthropic::{DocumentSource, Message, MessageContent, ThinkingConfig};
    use crate::services::capabilities::{
        ModelCapabilities, SimpleCapability, ThinkingCapability, ThinkingStyle,
    };

    fn caps_all_enabled() -> ModelCapabilities {
        ModelCapabilities {
            thinking: ThinkingCapability {
                enabled: true,
                style: ThinkingStyle::Claude,
            },
            document: SimpleCapability { enabled: true },
            tool_use: SimpleCapability { enabled: true },
            ptc: SimpleCapability { enabled: false },
        }
    }

    fn caps_no_thinking() -> ModelCapabilities {
        ModelCapabilities {
            thinking: ThinkingCapability {
                enabled: false,
                style: ThinkingStyle::Claude,
            },
            ..caps_all_enabled()
        }
    }

    fn caps_no_tools() -> ModelCapabilities {
        ModelCapabilities {
            tool_use: SimpleCapability { enabled: false },
            ..caps_all_enabled()
        }
    }

    fn caps_no_document() -> ModelCapabilities {
        ModelCapabilities {
            document: SimpleCapability { enabled: false },
            ..caps_all_enabled()
        }
    }

    fn make_request_with_thinking() -> MessageRequest {
        let mut req = MessageRequest::new("claude-sonnet-4-6", vec![], 100);
        req.thinking = Some(ThinkingConfig {
            thinking_type: "enabled".to_string(),
            budget_tokens: Some(5000),
        });
        req
    }

    fn make_request_with_tools() -> MessageRequest {
        let mut req = MessageRequest::new("m", vec![], 100);
        req.tools = Some(vec![serde_json::json!({"name": "my_tool"})]);
        req
    }

    fn make_request_with_document() -> MessageRequest {
        let blocks = vec![ContentBlock::Document {
            source: DocumentSource {
                source_type: "base64".to_string(),
                media_type: "application/pdf".to_string(),
                data: "abc".to_string(),
            },
            cache_control: None,
        }];
        let mut req = MessageRequest::new("m", vec![], 100);
        req.messages = vec![Message::with_blocks("user", blocks)];
        req
    }

    // ---- thinking ----

    #[test]
    fn thinking_kept_when_enabled() {
        let req = make_request_with_thinking();
        let result = apply_capabilities(&req, &caps_all_enabled());
        assert!(result.thinking.is_some());
    }

    #[test]
    fn thinking_stripped_when_caps_disabled() {
        let req = make_request_with_thinking();
        let result = apply_capabilities(&req, &caps_no_thinking());
        assert!(result.thinking.is_none());
    }

    // ---- tools ----

    #[test]
    fn tools_kept_when_enabled() {
        let req = make_request_with_tools();
        let result = apply_capabilities(&req, &caps_all_enabled());
        assert!(result.tools.is_some());
    }

    #[test]
    fn tools_stripped_when_caps_disabled() {
        let req = make_request_with_tools();
        let result = apply_capabilities(&req, &caps_no_tools());
        assert!(result.tools.is_none());
    }

    // ---- document ----

    #[test]
    fn document_kept_when_enabled() {
        let req = make_request_with_document();
        let result = apply_capabilities(&req, &caps_all_enabled());
        if let MessageContent::Blocks(blocks) = &result.messages[0].content {
            assert!(blocks
                .iter()
                .any(|b| matches!(b, ContentBlock::Document { .. })));
        }
    }

    #[test]
    fn document_stripped_when_caps_disabled() {
        let req = make_request_with_document();
        let result = apply_capabilities(&req, &caps_no_document());
        if let MessageContent::Blocks(blocks) = &result.messages[0].content {
            assert!(!blocks
                .iter()
                .any(|b| matches!(b, ContentBlock::Document { .. })));
        }
    }
}
