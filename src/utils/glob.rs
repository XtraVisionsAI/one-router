//! Shared glob helpers for model-id pattern matching.
//!
//! Used by both `ModelMappingService` (source-model wildcards) and the
//! per-backend model filter (`backend_pool::model_filter`) so the two features
//! share one matching semantics and cannot drift apart.

/// Simple glob matching: only supports `*` as a wildcard (equivalent to `.*` in regex).
///
/// Supported patterns:
/// - `*` — matches everything
/// - `claude-*` — prefix match
/// - `*-latest` — suffix match
/// - `claude-*-latest` — prefix + suffix match
/// - `claude-3` — exact match (no wildcard)
pub fn glob_match(pattern: &str, input: &str) -> bool {
    if pattern == "*" {
        return true;
    }
    if let Some(prefix) = pattern.strip_suffix('*') {
        return input.starts_with(prefix);
    }
    if let Some(suffix) = pattern.strip_prefix('*') {
        return input.ends_with(suffix);
    }
    // Middle `*`: split into prefix and suffix
    if let Some(pos) = pattern.find('*') {
        let prefix = &pattern[..pos];
        let suffix = &pattern[pos + 1..];
        return input.starts_with(prefix)
            && input.ends_with(suffix)
            && input.len() >= prefix.len() + suffix.len();
    }
    pattern == input
}

/// Compute the "specificity" of a wildcard pattern for tiebreaking.
/// Longer non-wildcard prefix = more specific.
pub fn pattern_specificity(pattern: &str) -> usize {
    pattern.find('*').unwrap_or(pattern.len())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_glob_match_star_only() {
        assert!(glob_match("*", "anything"));
        assert!(glob_match("*", ""));
    }

    #[test]
    fn test_glob_match_prefix() {
        assert!(glob_match("claude-*", "claude-3-opus"));
        assert!(glob_match("claude-*", "claude-"));
        assert!(!glob_match("claude-*", "gemini-pro"));
    }

    #[test]
    fn test_glob_match_suffix() {
        assert!(glob_match("*-latest", "claude-3-latest"));
        assert!(!glob_match("*-latest", "claude-3-stable"));
    }

    #[test]
    fn test_glob_match_middle() {
        assert!(glob_match("claude-*-latest", "claude-3-latest"));
        assert!(glob_match("claude-*-latest", "claude-3-5-sonnet-latest"));
        assert!(!glob_match("claude-*-latest", "claude-3-stable"));
    }

    #[test]
    fn test_glob_match_exact() {
        assert!(glob_match("claude-3", "claude-3"));
        assert!(!glob_match("claude-3", "claude-3-5"));
    }

    #[test]
    fn test_pattern_specificity() {
        assert!(pattern_specificity("claude-3-*") > pattern_specificity("claude-*"));
        assert!(pattern_specificity("claude-*") > pattern_specificity("*"));
        assert_eq!(pattern_specificity("*"), 0);
    }
}
