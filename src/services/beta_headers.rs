//! Anthropic `anthropic-beta` header → Bedrock `anthropic_beta` body pipeline.
//!
//! Bedrock InvokeModel accepts an `anthropic_beta` array in the request body,
//! but it does **not** understand every beta a client may send on the inbound
//! `anthropic-beta` HTTP header. Some aggregate betas must be translated to the
//! granular Bedrock-native betas they expand to; others are unsupported and must
//! be dropped or Bedrock returns a ValidationError.
//!
//! [`resolve_bedrock_betas`] applies a three-state rule to each comma-separated
//! beta value:
//! - **blocklist** → dropped (Bedrock rejects it);
//! - **mapping** (only for Claude models) → expanded to native betas;
//! - otherwise → passed through verbatim.
//!
//! This is **Bedrock-only**. The Anthropic/OpenAI passthrough path forwards the
//! header untouched to a native upstream that understands real betas, so no
//! filtering happens there.
//!
//! Defaults mirror the reference proxy (`app/core/config.py`).

/// Betas Bedrock InvokeModel does not accept — dropped before the request.
const BEDROCK_BETA_BLOCKLIST: &[&str] = &[
    "prompt-caching-scope-2026-01-05",
    "redact-thinking-2026-02-12",
    "advisor-tool-2026-03-01",
    "thinking-token-count-2026-05-13",
    // Server-side fallbacks are unavailable on Bedrock.
    "server-side-fallback-2026-06-01",
];

/// Aggregate betas Bedrock rejects, mapped to the granular native betas they
/// expand to. Only applied to Claude models.
const BEDROCK_BETA_MAPPING: &[(&str, &[&str])] = &[(
    "advanced-tool-use-2025-11-20",
    &["tool-examples-2025-10-29", "tool-search-tool-2025-10-19"],
)];

/// Whether `model_id` denotes a Claude model (substring match, case-insensitive).
fn is_claude_model(model_id: &str) -> bool {
    model_id.to_ascii_lowercase().contains("claude")
}

/// Resolve the inbound `anthropic-beta` header into the list of betas to place
/// on the Bedrock `anthropic_beta` request body.
///
/// Comma-separated, trimmed, empties dropped. Each value is blocklist-filtered,
/// mapping-expanded (Claude models only), or passed through. The result is
/// order-preserving and de-duplicated.
pub fn resolve_bedrock_betas(header: Option<&str>, model_id: &str) -> Vec<String> {
    let Some(header) = header else {
        return Vec::new();
    };

    let claude = is_claude_model(model_id);
    let mut out: Vec<String> = Vec::new();
    let push_unique = |value: String, out: &mut Vec<String>| {
        if !out.contains(&value) {
            out.push(value);
        }
    };

    for beta in header.split(',').map(str::trim).filter(|s| !s.is_empty()) {
        if BEDROCK_BETA_BLOCKLIST.contains(&beta) {
            continue;
        }
        if claude {
            if let Some((_, expansions)) =
                BEDROCK_BETA_MAPPING.iter().find(|(name, _)| *name == beta)
            {
                for &native in *expansions {
                    push_unique(native.to_string(), &mut out);
                }
                continue;
            }
        }
        push_unique(beta.to_string(), &mut out);
    }

    out
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_none_header_returns_empty() {
        assert!(resolve_bedrock_betas(None, "claude-sonnet").is_empty());
        assert!(resolve_bedrock_betas(Some(""), "claude-sonnet").is_empty());
        assert!(resolve_bedrock_betas(Some("  ,  "), "claude-sonnet").is_empty());
    }

    #[test]
    fn test_blocklist_filtered() {
        let out = resolve_bedrock_betas(Some("redact-thinking-2026-02-12"), "claude-sonnet");
        assert!(out.is_empty());
        // Mixed: blocklisted dropped, other passed through.
        let out = resolve_bedrock_betas(
            Some("server-side-fallback-2026-06-01, some-other-beta"),
            "claude-sonnet",
        );
        assert_eq!(out, vec!["some-other-beta"]);
    }

    #[test]
    fn test_mapping_expands_for_claude() {
        let out = resolve_bedrock_betas(Some("advanced-tool-use-2025-11-20"), "claude-opus-4");
        assert_eq!(
            out,
            vec!["tool-examples-2025-10-29", "tool-search-tool-2025-10-19"]
        );
    }

    #[test]
    fn test_mapping_not_applied_for_non_claude() {
        // Non-Claude model: aggregate is passed through verbatim, not expanded.
        let out = resolve_bedrock_betas(Some("advanced-tool-use-2025-11-20"), "llama-3");
        assert_eq!(out, vec!["advanced-tool-use-2025-11-20"]);
    }

    #[test]
    fn test_multi_value_split_and_trim() {
        let out = resolve_bedrock_betas(
            Some(" beta-a , beta-b ,beta-c"),
            "anthropic.claude-3-sonnet",
        );
        assert_eq!(out, vec!["beta-a", "beta-b", "beta-c"]);
    }

    #[test]
    fn test_dedup_preserves_order() {
        // Duplicate passthrough values collapse; mapping expansions also dedup.
        let out = resolve_bedrock_betas(Some("beta-a, beta-a, beta-b"), "claude-x");
        assert_eq!(out, vec!["beta-a", "beta-b"]);

        let out = resolve_bedrock_betas(
            Some("tool-examples-2025-10-29, advanced-tool-use-2025-11-20"),
            "claude-x",
        );
        // tool-examples already present, mapping adds tool-search-tool only once.
        assert_eq!(
            out,
            vec!["tool-examples-2025-10-29", "tool-search-tool-2025-10-19"]
        );
    }
}
