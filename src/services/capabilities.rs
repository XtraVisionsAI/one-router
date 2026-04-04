//! Model capability declarations.
//!
//! Stored as JSON in the `capabilities` column of `model_mappings`.
//! Deserialized at model resolution time; missing or null fields default to enabled.

use serde::{Deserialize, Serialize};

/// Per-model capability declarations.
///
/// All capabilities default to enabled for backward compatibility with
/// existing mappings that have no `capabilities` column.
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(default)]
pub struct ModelCapabilities {
    pub thinking: ThinkingCapability,
    pub document: SimpleCapability,
    pub tool_use: SimpleCapability,
    pub ptc: SimpleCapability,
}

impl Default for ModelCapabilities {
    fn default() -> Self {
        Self {
            thinking: ThinkingCapability::default(),
            document: SimpleCapability { enabled: true },
            tool_use: SimpleCapability { enabled: true },
            ptc: SimpleCapability { enabled: false },
        }
    }
}

/// Thinking capability — enabled flag plus style hint for request construction.
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(default)]
pub struct ThinkingCapability {
    pub enabled: bool,
    pub style: ThinkingStyle,
}

impl Default for ThinkingCapability {
    fn default() -> Self {
        Self {
            enabled: true,
            style: ThinkingStyle::Claude,
        }
    }
}

/// Capability with only an enabled flag.
#[derive(Debug, Clone, Serialize, Deserialize, Default)]
pub struct SimpleCapability {
    pub enabled: bool,
}

/// How the model expresses extended thinking in the request body.
#[derive(Debug, Clone, Serialize, Deserialize, Default, PartialEq, Eq)]
#[serde(rename_all = "lowercase")]
pub enum ThinkingStyle {
    /// Native Anthropic `thinking` field (Claude via InvokeModel).
    #[default]
    Claude,
    /// Amazon Nova 2 `reasoningConfig` format.
    Nova2,
    /// Moonshot Kimi `reasoning_effort` format.
    Kimi,
}

impl ModelCapabilities {
    /// Parse from a JSON string stored in the database.
    /// Returns `Default` on any error or when the string is empty/None.
    pub fn from_json(json: Option<&str>) -> Self {
        match json {
            Some(s) if !s.is_empty() => serde_json::from_str(s).unwrap_or_default(),
            _ => Self::default(),
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn default_all_standard_caps_enabled() {
        let caps = ModelCapabilities::default();
        assert!(caps.thinking.enabled);
        assert!(caps.document.enabled);
        assert!(caps.tool_use.enabled);
        assert!(!caps.ptc.enabled); // PTC off by default
    }

    #[test]
    fn from_json_none_returns_default() {
        let caps = ModelCapabilities::from_json(None);
        assert!(caps.thinking.enabled);
    }

    #[test]
    fn from_json_empty_returns_default() {
        let caps = ModelCapabilities::from_json(Some(""));
        assert!(caps.thinking.enabled);
    }

    #[test]
    fn from_json_partial_merges_defaults() {
        // Only thinking specified — document/tool_use/ptc use defaults
        let caps = ModelCapabilities::from_json(Some(
            r#"{"thinking": {"enabled": false, "style": "nova2"}}"#,
        ));
        assert!(!caps.thinking.enabled);
        assert_eq!(caps.thinking.style, ThinkingStyle::Nova2);
        assert!(caps.document.enabled);
        assert!(caps.tool_use.enabled);
    }

    #[test]
    fn from_json_full_object() {
        let caps = ModelCapabilities::from_json(Some(
            r#"{
                "thinking": {"enabled": true, "style": "kimi"},
                "document": {"enabled": false},
                "tool_use": {"enabled": true},
                "ptc": {"enabled": true}
            }"#,
        ));
        assert!(caps.thinking.enabled);
        assert_eq!(caps.thinking.style, ThinkingStyle::Kimi);
        assert!(!caps.document.enabled);
        assert!(caps.tool_use.enabled);
        assert!(caps.ptc.enabled);
    }

    #[test]
    fn from_json_invalid_returns_default() {
        let caps = ModelCapabilities::from_json(Some("not json"));
        assert!(caps.thinking.enabled);
    }
}
