use crate::schemas::anthropic::{
    ContentBlock, MessageContent, MessageRequest, SystemContent, ToolResultValue,
};

/// Rough token count estimate: approximately 4 characters per token.
pub fn estimate_tokens(text: &str) -> u32 {
    (text.len() / 4).max(1) as u32
}

/// CJK-aware text estimate: a CJK character is roughly one token on its own,
/// everything else follows the ~4 bytes per token rule.
pub fn estimate_text_tokens(text: &str) -> u64 {
    let mut cjk = 0u64;
    let mut other_bytes = 0u64;
    for c in text.chars() {
        if is_cjk(c) {
            cjk += 1;
        } else {
            other_bytes += c.len_utf8() as u64;
        }
    }
    cjk + other_bytes / 4
}

fn is_cjk(c: char) -> bool {
    matches!(
        c as u32,
        0x3000..=0x303F   // CJK punctuation
            | 0x3040..=0x30FF // Hiragana + Katakana
            | 0x3400..=0x4DBF // CJK Ext A
            | 0x4E00..=0x9FFF // CJK Unified
            | 0xAC00..=0xD7AF // Hangul syllables
            | 0xF900..=0xFAFF // CJK compat
            | 0xFF00..=0xFFEF // full-width forms
            | 0x20000..=0x2FA1F // CJK Ext B..F
    )
}

/// Image token cost when the dimensions are unknown (we never decode image
/// bytes). Anthropic's rule is `(w*h)/750`; a 1092×1092 image — the largest
/// that is not downscaled — is ~1590 tokens, so this is a safe upper bound.
const IMAGE_TOKENS_UNKNOWN_SIZE: u64 = 1600;
/// Lower bound for a PDF document block (roughly one page of text + layout).
const DOCUMENT_TOKENS_MIN: u64 = 1500;
/// Per-message framing overhead (role tags etc.).
const MESSAGE_OVERHEAD: u64 = 3;

/// Estimate the prompt tokens of a Messages API request without calling any
/// backend. Used by `/v1/messages/count_tokens` when the resolved provider
/// has no exact token-counting API (or that call failed).
pub fn estimate_message_request_tokens(request: &MessageRequest) -> i32 {
    let mut total: u64 = 0;

    if let Some(system) = &request.system {
        total += match system {
            SystemContent::Text(t) => estimate_text_tokens(t),
            SystemContent::Messages(ms) => ms.iter().map(|m| estimate_text_tokens(&m.text)).sum(),
        };
    }

    for msg in &request.messages {
        total += MESSAGE_OVERHEAD + estimate_content_tokens(&msg.content);
    }

    if let Some(tools) = &request.tools {
        for tool in tools {
            total += estimate_text_tokens(&tool.to_string());
        }
    }

    total.clamp(1, i32::MAX as u64) as i32
}

fn estimate_content_tokens(content: &MessageContent) -> u64 {
    match content {
        MessageContent::Text(t) => estimate_text_tokens(t),
        MessageContent::Blocks(blocks) => blocks.iter().map(estimate_block_tokens).sum(),
    }
}

fn estimate_block_tokens(block: &ContentBlock) -> u64 {
    match block {
        ContentBlock::Text { text, .. } => estimate_text_tokens(text),
        ContentBlock::Thinking { thinking, .. } => estimate_text_tokens(thinking),
        ContentBlock::RedactedThinking { .. } => 0,
        ContentBlock::Image { .. } => IMAGE_TOKENS_UNKNOWN_SIZE,
        ContentBlock::Document { source, .. } => {
            // base64 → decoded bytes; a text PDF runs ~20 bytes per token
            // once layout/font overhead is accounted for.
            let decoded = (source.data.len() as u64) * 3 / 4;
            (decoded / 20).max(DOCUMENT_TOKENS_MIN)
        }
        ContentBlock::ToolUse { name, input, .. } => {
            estimate_text_tokens(name) + estimate_text_tokens(&input.to_string())
        }
        ContentBlock::ToolResult { content, .. } => match content {
            ToolResultValue::Text(t) => estimate_text_tokens(t),
            ToolResultValue::Blocks(blocks) => blocks.iter().map(estimate_block_tokens).sum(),
        },
        // Server tool blocks, fallback bookkeeping, unknown blocks: count the
        // serialized form.
        other => serde_json::to_string(other)
            .map(|s| estimate_text_tokens(&s))
            .unwrap_or(0),
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::schemas::anthropic::{ImageSource, Message};

    #[test]
    fn test_estimate_tokens() {
        assert_eq!(estimate_tokens("hello world"), 2); // 11 chars / 4 = 2
        assert_eq!(estimate_tokens(""), 1); // min 1
        assert_eq!(estimate_tokens("abcd"), 1); // 4 chars / 4 = 1
    }

    fn req(messages: Vec<Message>) -> MessageRequest {
        serde_json::from_value(serde_json::json!({
            "model": "m",
            "messages": messages,
        }))
        .unwrap()
    }

    fn user_text(text: &str) -> Message {
        Message {
            role: "user".into(),
            content: MessageContent::Text(text.into()),
            extra: Default::default(),
        }
    }

    #[test]
    fn english_text_is_about_four_bytes_per_token() {
        let text = "The quick brown fox jumps over the lazy dog. ".repeat(10); // 450 bytes
        let n = estimate_message_request_tokens(&req(vec![user_text(&text)]));
        assert!((100..=130).contains(&n), "got {n}");
    }

    #[test]
    fn cjk_text_counts_about_one_token_per_char() {
        let text = "今天天气很好我们一起去公园散步吧".repeat(10); // 160 chars
        let n = estimate_message_request_tokens(&req(vec![user_text(&text)]));
        assert!((160..=175).contains(&n), "got {n}");
        // The naive bytes/4 rule would give ~120; CJK must land higher.
        assert!(n as usize > text.len() / 4);
    }

    #[test]
    fn image_block_uses_fixed_cost() {
        let msg = Message {
            role: "user".into(),
            content: MessageContent::Blocks(vec![ContentBlock::Image {
                source: ImageSource {
                    source_type: "base64".into(),
                    media_type: Some("image/png".into()),
                    data: Some("AAAA".into()),
                    url: None,
                },
                cache_control: None,
            }]),
            extra: Default::default(),
        };
        let n = estimate_message_request_tokens(&req(vec![msg]));
        assert_eq!(n as u64, IMAGE_TOKENS_UNKNOWN_SIZE + MESSAGE_OVERHEAD);
    }

    #[test]
    fn tools_and_system_are_included() {
        let mut r = req(vec![user_text("hi")]);
        let base = estimate_message_request_tokens(&r);
        r.system = Some(SystemContent::Text("x".repeat(400)));
        r.tools = Some(vec![serde_json::json!({
            "name": "get_weather",
            "description": "d".repeat(400),
            "input_schema": {"type": "object"}
        })]);
        let n = estimate_message_request_tokens(&r);
        assert!(
            n >= base + 200,
            "system+tools must add ≥200, got {n} vs {base}"
        );
    }
}
