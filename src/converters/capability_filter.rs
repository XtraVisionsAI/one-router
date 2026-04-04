//! Capability-based request filtering.
//!
//! Applies model capability constraints and global policy flags to a request,
//! stripping fields/blocks that are not supported or are globally disabled.

use crate::schemas::anthropic::{ContentBlock, MessageContent, MessageRequest, SystemContent};
use crate::services::capabilities::ModelCapabilities;

/// Apply capability constraints to a request.
///
/// Logic: a feature is active only when the global policy allows it AND the
/// model declares support for it. When disabled, the relevant parts of the
/// request are stripped so the downstream InvokeModel call is clean.
pub fn apply_capabilities(
    request: &MessageRequest,
    caps: &ModelCapabilities,
    global_tool_use: bool,
    global_extended_thinking: bool,
    global_document_support: bool,
) -> MessageRequest {
    let mut req = request.clone();

    // ---- thinking ----
    if req.thinking.is_some() {
        let allowed = global_extended_thinking && caps.thinking.enabled;
        if !allowed {
            req.thinking = None;
        }
    }

    // ---- tools ----
    if req.tools.is_some() {
        let allowed = global_tool_use && caps.tool_use.enabled;
        if !allowed {
            req.tools = None;
            req.tool_choice = None;
        }
    }

    // ---- document blocks ----
    let document_allowed = global_document_support && caps.document.enabled;
    if !document_allowed {
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

        // Also strip document blocks from system messages
        if let Some(SystemContent::Messages(ref msgs)) = req.system {
            // System messages don't carry document blocks in the Anthropic schema,
            // so no change needed here.
            let _ = msgs;
        }
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
        ModelCapabilities::default()
    }

    fn caps_no_thinking() -> ModelCapabilities {
        ModelCapabilities {
            thinking: ThinkingCapability {
                enabled: false,
                style: ThinkingStyle::Claude,
            },
            ..ModelCapabilities::default()
        }
    }

    fn caps_no_tools() -> ModelCapabilities {
        ModelCapabilities {
            tool_use: SimpleCapability { enabled: false },
            ..ModelCapabilities::default()
        }
    }

    fn caps_no_document() -> ModelCapabilities {
        ModelCapabilities {
            document: SimpleCapability { enabled: false },
            ..ModelCapabilities::default()
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
    fn thinking_kept_when_both_allowed() {
        let req = make_request_with_thinking();
        let result = apply_capabilities(&req, &caps_all_enabled(), true, true, true);
        assert!(result.thinking.is_some());
    }

    #[test]
    fn thinking_stripped_when_global_disabled() {
        let req = make_request_with_thinking();
        let result = apply_capabilities(&req, &caps_all_enabled(), true, false, true);
        assert!(result.thinking.is_none());
    }

    #[test]
    fn thinking_stripped_when_model_disabled() {
        let req = make_request_with_thinking();
        let result = apply_capabilities(&req, &caps_no_thinking(), true, true, true);
        assert!(result.thinking.is_none());
    }

    // ---- tools ----

    #[test]
    fn tools_kept_when_both_allowed() {
        let req = make_request_with_tools();
        let result = apply_capabilities(&req, &caps_all_enabled(), true, true, true);
        assert!(result.tools.is_some());
    }

    #[test]
    fn tools_stripped_when_global_disabled() {
        let req = make_request_with_tools();
        let result = apply_capabilities(&req, &caps_all_enabled(), false, true, true);
        assert!(result.tools.is_none());
    }

    #[test]
    fn tools_stripped_when_model_disabled() {
        let req = make_request_with_tools();
        let result = apply_capabilities(&req, &caps_no_tools(), true, true, true);
        assert!(result.tools.is_none());
    }

    // ---- document ----

    #[test]
    fn document_kept_when_both_allowed() {
        let req = make_request_with_document();
        let result = apply_capabilities(&req, &caps_all_enabled(), true, true, true);
        if let MessageContent::Blocks(blocks) = &result.messages[0].content {
            assert!(blocks
                .iter()
                .any(|b| matches!(b, ContentBlock::Document { .. })));
        }
    }

    #[test]
    fn document_stripped_when_global_disabled() {
        let req = make_request_with_document();
        let result = apply_capabilities(&req, &caps_all_enabled(), true, true, false);
        if let MessageContent::Blocks(blocks) = &result.messages[0].content {
            assert!(!blocks
                .iter()
                .any(|b| matches!(b, ContentBlock::Document { .. })));
        }
    }

    #[test]
    fn document_stripped_when_model_disabled() {
        let req = make_request_with_document();
        let result = apply_capabilities(&req, &caps_no_document(), true, true, true);
        if let MessageContent::Blocks(blocks) = &result.messages[0].content {
            assert!(!blocks
                .iter()
                .any(|b| matches!(b, ContentBlock::Document { .. })));
        }
    }
}
