//! Prompt cache transformation for Bedrock InvokeModel requests.
//!
//! Controls how `cache_control` fields in Anthropic requests are handled
//! before forwarding to Bedrock InvokeModel API.

use crate::schemas::anthropic::{
    CacheControl, ContentBlock, MessageContent, MessageRequest, SystemContent,
};

/// Controls how `cache_control` fields are handled in Bedrock requests.
#[derive(Debug, Clone, PartialEq)]
pub enum PromptCacheMode {
    /// Strip all `cache_control` fields from the request.
    Disable,
    /// Preserve `cache_control` fields exactly as the client sent them.
    Passthrough,
    /// Override the TTL of all `cache_control` fields to the specified value.
    /// Blocks that already have `cache_control` keep it; TTL is replaced.
    /// Blocks without `cache_control` are not modified.
    Ttl(String),
}

impl PromptCacheMode {
    /// Parse from a settings string value.
    ///
    /// - `"disable"` → [`PromptCacheMode::Disable`]
    /// - `"5m"` → [`PromptCacheMode::Ttl("5m")`]
    /// - `"1h"` → [`PromptCacheMode::Ttl("1h")`]
    /// - anything else (including `""`, `"passthrough"`) → [`PromptCacheMode::Passthrough`]
    pub fn from_setting(s: &str) -> Self {
        match s {
            "disable" => Self::Disable,
            "5m" => Self::Ttl("5m".to_string()),
            "1h" => Self::Ttl("1h".to_string()),
            _ => Self::Passthrough,
        }
    }
}

/// Apply a [`PromptCacheMode`] to a [`MessageRequest`], returning a modified clone.
///
/// - [`PromptCacheMode::Passthrough`]: returns a clone unchanged.
/// - [`PromptCacheMode::Disable`]: removes all `cache_control` fields from
///   system messages, message content blocks, and tools.
/// - [`PromptCacheMode::Ttl`]: overwrites the TTL on every `cache_control`
///   that is already present. Does not add `cache_control` to blocks that
///   don't have one.
pub fn apply_to_request(request: &MessageRequest, mode: &PromptCacheMode) -> MessageRequest {
    match mode {
        PromptCacheMode::Passthrough => request.clone(),
        PromptCacheMode::Disable => strip_cache_control(request),
        PromptCacheMode::Ttl(ttl) => override_ttl(request, ttl),
    }
}

// ============================================================================
// Disable — strip all cache_control
// ============================================================================

fn strip_cache_control(request: &MessageRequest) -> MessageRequest {
    let mut req = request.clone();

    // Strip from system messages
    if let Some(ref system) = req.system {
        req.system = Some(strip_system_cache(system));
    }

    // Strip from message content blocks
    req.messages = req
        .messages
        .iter()
        .map(|msg| {
            let mut m = msg.clone();
            if let MessageContent::Blocks(ref blocks) = msg.content {
                m.content = MessageContent::Blocks(blocks.iter().map(strip_block_cache).collect());
            }
            m
        })
        .collect();

    // Strip from tools (serde_json::Value)
    if let Some(ref tools) = req.tools {
        req.tools = Some(tools.iter().map(strip_tool_cache).collect());
    }

    req
}

fn strip_system_cache(system: &SystemContent) -> SystemContent {
    match system {
        SystemContent::Text(_) => system.clone(),
        SystemContent::Messages(msgs) => SystemContent::Messages(
            msgs.iter()
                .map(|m| {
                    let mut msg = m.clone();
                    msg.cache_control = None;
                    msg
                })
                .collect(),
        ),
    }
}

fn strip_block_cache(block: &ContentBlock) -> ContentBlock {
    match block {
        ContentBlock::Text { text, .. } => ContentBlock::Text {
            text: text.clone(),
            cache_control: None,
        },
        ContentBlock::Image { source, .. } => ContentBlock::Image {
            source: source.clone(),
            cache_control: None,
        },
        ContentBlock::Document { source, .. } => ContentBlock::Document {
            source: source.clone(),
            cache_control: None,
        },
        ContentBlock::ToolResult {
            tool_use_id,
            content,
            is_error,
            ..
        } => ContentBlock::ToolResult {
            tool_use_id: tool_use_id.clone(),
            content: content.clone(),
            is_error: *is_error,
            cache_control: None,
        },
        // Blocks without cache_control: clone as-is
        other => other.clone(),
    }
}

fn strip_tool_cache(tool: &serde_json::Value) -> serde_json::Value {
    let mut t = tool.clone();
    if let Some(obj) = t.as_object_mut() {
        obj.remove("cache_control");
    }
    t
}

// ============================================================================
// Ttl — override TTL on existing cache_control blocks
// ============================================================================

fn override_ttl(request: &MessageRequest, ttl: &str) -> MessageRequest {
    let mut req = request.clone();

    // Override in system messages
    if let Some(ref system) = req.system {
        req.system = Some(override_system_ttl(system, ttl));
    }

    // Override in message content blocks
    req.messages = req
        .messages
        .iter()
        .map(|msg| {
            let mut m = msg.clone();
            if let MessageContent::Blocks(ref blocks) = msg.content {
                m.content = MessageContent::Blocks(
                    blocks.iter().map(|b| override_block_ttl(b, ttl)).collect(),
                );
            }
            m
        })
        .collect();

    // Override in tools (serde_json::Value)
    if let Some(ref tools) = req.tools {
        req.tools = Some(tools.iter().map(|t| override_tool_ttl(t, ttl)).collect());
    }

    req
}

fn override_system_ttl(system: &SystemContent, ttl: &str) -> SystemContent {
    match system {
        SystemContent::Text(_) => system.clone(),
        SystemContent::Messages(msgs) => SystemContent::Messages(
            msgs.iter()
                .map(|m| {
                    let mut msg = m.clone();
                    if let Some(ref mut cc) = msg.cache_control {
                        cc.ttl = Some(ttl.to_string());
                    }
                    msg
                })
                .collect(),
        ),
    }
}

fn override_block_ttl(block: &ContentBlock, ttl: &str) -> ContentBlock {
    let set_ttl = |cc: &Option<CacheControl>| -> Option<CacheControl> {
        cc.as_ref().map(|c| CacheControl {
            cache_type: c.cache_type.clone(),
            ttl: Some(ttl.to_string()),
        })
    };

    match block {
        ContentBlock::Text {
            text,
            cache_control,
        } => ContentBlock::Text {
            text: text.clone(),
            cache_control: set_ttl(cache_control),
        },
        ContentBlock::Image {
            source,
            cache_control,
        } => ContentBlock::Image {
            source: source.clone(),
            cache_control: set_ttl(cache_control),
        },
        ContentBlock::Document {
            source,
            cache_control,
        } => ContentBlock::Document {
            source: source.clone(),
            cache_control: set_ttl(cache_control),
        },
        ContentBlock::ToolResult {
            tool_use_id,
            content,
            is_error,
            cache_control,
        } => ContentBlock::ToolResult {
            tool_use_id: tool_use_id.clone(),
            content: content.clone(),
            is_error: *is_error,
            cache_control: set_ttl(cache_control),
        },
        other => other.clone(),
    }
}

fn override_tool_ttl(tool: &serde_json::Value, ttl: &str) -> serde_json::Value {
    let mut t = tool.clone();
    if let Some(obj) = t.as_object_mut() {
        if let Some(cc) = obj.get_mut("cache_control") {
            if let Some(cc_obj) = cc.as_object_mut() {
                cc_obj.insert("ttl".to_string(), serde_json::json!(ttl));
            }
        }
    }
    t
}

// ============================================================================
// Tests
// ============================================================================

#[cfg(test)]
mod tests {
    use super::*;
    use crate::schemas::anthropic::{Message, SystemMessage};

    fn make_text_block_with_cache(ttl: Option<&str>) -> ContentBlock {
        ContentBlock::Text {
            text: "hello".to_string(),
            cache_control: Some(CacheControl {
                cache_type: "ephemeral".to_string(),
                ttl: ttl.map(|s| s.to_string()),
            }),
        }
    }

    fn make_text_block_no_cache() -> ContentBlock {
        ContentBlock::Text {
            text: "hello".to_string(),
            cache_control: None,
        }
    }

    fn make_request_with_blocks(blocks: Vec<ContentBlock>) -> MessageRequest {
        let mut req = MessageRequest::new("claude-sonnet-4-6", vec![], 100);
        req.messages = vec![Message::with_blocks("user", blocks)];
        req
    }

    // ---- PromptCacheMode::from_setting ----

    #[test]
    fn from_setting_disable() {
        assert_eq!(
            PromptCacheMode::from_setting("disable"),
            PromptCacheMode::Disable
        );
    }

    #[test]
    fn from_setting_5m() {
        assert_eq!(
            PromptCacheMode::from_setting("5m"),
            PromptCacheMode::Ttl("5m".to_string())
        );
    }

    #[test]
    fn from_setting_1h() {
        assert_eq!(
            PromptCacheMode::from_setting("1h"),
            PromptCacheMode::Ttl("1h".to_string())
        );
    }

    #[test]
    fn from_setting_passthrough_empty() {
        assert_eq!(
            PromptCacheMode::from_setting(""),
            PromptCacheMode::Passthrough
        );
    }

    #[test]
    fn from_setting_passthrough_explicit() {
        assert_eq!(
            PromptCacheMode::from_setting("passthrough"),
            PromptCacheMode::Passthrough
        );
    }

    // ---- Passthrough ----

    #[test]
    fn passthrough_preserves_cache_control() {
        let req = make_request_with_blocks(vec![make_text_block_with_cache(Some("1h"))]);
        let result = apply_to_request(&req, &PromptCacheMode::Passthrough);
        if let MessageContent::Blocks(blocks) = &result.messages[0].content {
            if let ContentBlock::Text { cache_control, .. } = &blocks[0] {
                assert_eq!(cache_control.as_ref().unwrap().ttl, Some("1h".to_string()));
                return;
            }
        }
        panic!("unexpected structure");
    }

    // ---- Disable ----

    #[test]
    fn disable_strips_cache_control_from_text_block() {
        let req = make_request_with_blocks(vec![make_text_block_with_cache(Some("1h"))]);
        let result = apply_to_request(&req, &PromptCacheMode::Disable);
        if let MessageContent::Blocks(blocks) = &result.messages[0].content {
            if let ContentBlock::Text { cache_control, .. } = &blocks[0] {
                assert!(cache_control.is_none());
                return;
            }
        }
        panic!("unexpected structure");
    }

    #[test]
    fn disable_strips_cache_control_from_system() {
        let mut req = MessageRequest::new("m", vec![], 100);
        let mut sm = SystemMessage::new("You are helpful.");
        sm.cache_control = Some(CacheControl::with_ttl("1h"));
        req.system = Some(SystemContent::Messages(vec![sm]));
        let result = apply_to_request(&req, &PromptCacheMode::Disable);
        if let Some(SystemContent::Messages(msgs)) = &result.system {
            assert!(msgs[0].cache_control.is_none());
        }
    }

    #[test]
    fn disable_strips_cache_control_from_tool() {
        let mut req = MessageRequest::new("m", vec![], 100);
        req.tools = Some(vec![serde_json::json!({
            "name": "my_tool",
            "cache_control": {"type": "ephemeral", "ttl": "1h"}
        })]);
        let result = apply_to_request(&req, &PromptCacheMode::Disable);
        let tool = &result.tools.unwrap()[0];
        assert!(tool.get("cache_control").is_none());
    }

    // ---- Ttl ----

    #[test]
    fn ttl_overrides_existing_cache_control() {
        let req = make_request_with_blocks(vec![make_text_block_with_cache(Some("5m"))]);
        let result = apply_to_request(&req, &PromptCacheMode::Ttl("1h".to_string()));
        if let MessageContent::Blocks(blocks) = &result.messages[0].content {
            if let ContentBlock::Text { cache_control, .. } = &blocks[0] {
                assert_eq!(cache_control.as_ref().unwrap().ttl, Some("1h".to_string()));
                return;
            }
        }
        panic!("unexpected structure");
    }

    #[test]
    fn ttl_does_not_add_cache_control_to_uncached_block() {
        let req = make_request_with_blocks(vec![make_text_block_no_cache()]);
        let result = apply_to_request(&req, &PromptCacheMode::Ttl("1h".to_string()));
        if let MessageContent::Blocks(blocks) = &result.messages[0].content {
            if let ContentBlock::Text { cache_control, .. } = &blocks[0] {
                assert!(cache_control.is_none());
                return;
            }
        }
        panic!("unexpected structure");
    }

    #[test]
    fn ttl_overrides_tool_cache_control() {
        let mut req = MessageRequest::new("m", vec![], 100);
        req.tools = Some(vec![serde_json::json!({
            "name": "my_tool",
            "cache_control": {"type": "ephemeral", "ttl": "5m"}
        })]);
        let result = apply_to_request(&req, &PromptCacheMode::Ttl("1h".to_string()));
        let tool = &result.tools.unwrap()[0];
        assert_eq!(tool["cache_control"]["ttl"].as_str(), Some("1h"));
    }
}
