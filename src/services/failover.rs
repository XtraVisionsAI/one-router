//! Model-level failover chains.
//!
//! When the provider a source model resolves to has **no healthy credential**
//! (every credential in its pool is disabled / at max failures, or the backend
//! is not configured), a configured failover chain lets the gateway fall over
//! to a backup `(provider, model)` instead of returning an error.
//!
//! This mirrors the reference implementation's `FailoverManager`
//! (`app/keypool/failover.py`): a pre-invocation, credential-exhaustion
//! failover — **not** a per-response retry. The chain is walked in order and
//! the first target whose provider is healthy wins.
//!
//! ## Configuration
//!
//! Stored as the `failover_chains` system setting, a JSON object keyed by the
//! **source model id** (what the client sends, i.e. `request.model`):
//!
//! ```json
//! {
//!   "claude-sonnet-4-5": [
//!     {"provider": "anthropic", "model": "claude-sonnet-4-5-20250929"},
//!     {"provider": "bedrock",   "model": "us.anthropic.claude-sonnet-4-5-20250929-v1:0"}
//!   ]
//! }
//! ```
//!
//! Each target's `model` is the **backend target model id** used directly for
//! that provider (it bypasses `ModelMappingService`, since the operator is
//! explicitly naming the backend model). A failed-over request therefore uses
//! the gateway's *default* capabilities rather than any per-model capability
//! override — a deliberate, documented limitation.
//!
//! ## Cache-affinity note
//!
//! The project's cache-affinity red line forbids *optional* model switches
//! (cost/quality routing) while a prompt cache is active. Exhaustion failover
//! is **exempt**: the primary provider is unusable, so its cached prefix cannot
//! be served regardless — there is no cache benefit being sacrificed, only a
//! hard error being avoided.

use serde::Deserialize;
use std::collections::HashMap;

/// A single failover destination.
#[derive(Debug, Clone, PartialEq, Eq, Deserialize)]
pub struct FailoverTarget {
    /// Backend provider: `bedrock` / `gemini` / `anthropic` / `openai`.
    pub provider: String,
    /// Backend target model id, used directly (not routed through model_mapping).
    pub model: String,
}

/// Source-model → ordered failover targets.
#[derive(Debug, Clone, Default)]
pub struct FailoverChains {
    chains: HashMap<String, Vec<FailoverTarget>>,
}

impl FailoverChains {
    /// Parse from the `failover_chains` system-setting JSON.
    ///
    /// Empty / whitespace input yields an empty (disabled) set. Malformed JSON
    /// is logged and also yields an empty set — a bad setting must never break
    /// routing.
    pub fn from_json(raw: &str) -> Self {
        let trimmed = raw.trim();
        if trimmed.is_empty() {
            return Self::default();
        }
        match serde_json::from_str::<HashMap<String, Vec<FailoverTarget>>>(trimmed) {
            Ok(mut chains) => {
                // Drop targets with empty provider/model and drop now-empty chains.
                chains.retain(|_, targets| {
                    targets.retain(|t| !t.provider.is_empty() && !t.model.is_empty());
                    !targets.is_empty()
                });
                Self { chains }
            }
            Err(e) => {
                tracing::warn!(error = %e, "Invalid failover_chains setting; ignoring");
                Self::default()
            }
        }
    }

    /// True if no chains are configured.
    pub fn is_empty(&self) -> bool {
        self.chains.is_empty()
    }

    /// Ordered failover targets for a source model (empty slice if none).
    pub fn targets_for(&self, source_model: &str) -> &[FailoverTarget] {
        self.chains
            .get(source_model)
            .map(Vec::as_slice)
            .unwrap_or(&[])
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_empty_inputs() {
        assert!(FailoverChains::from_json("").is_empty());
        assert!(FailoverChains::from_json("   ").is_empty());
        // Malformed JSON is ignored, not fatal.
        assert!(FailoverChains::from_json("{not json").is_empty());
    }

    #[test]
    fn test_parse_and_lookup() {
        let raw = r#"{
            "claude-sonnet-4-5": [
                {"provider": "anthropic", "model": "claude-sonnet-4-5-20250929"},
                {"provider": "bedrock",   "model": "us.anthropic.claude-sonnet-4-5-20250929-v1:0"}
            ]
        }"#;
        let chains = FailoverChains::from_json(raw);
        assert!(!chains.is_empty());
        let targets = chains.targets_for("claude-sonnet-4-5");
        assert_eq!(targets.len(), 2);
        assert_eq!(targets[0].provider, "anthropic");
        assert_eq!(targets[0].model, "claude-sonnet-4-5-20250929");
        assert_eq!(targets[1].provider, "bedrock");
        // Unknown source model → empty.
        assert!(chains.targets_for("unknown-model").is_empty());
    }

    #[test]
    fn test_drops_incomplete_targets() {
        let raw = r#"{
            "m": [
                {"provider": "", "model": "x"},
                {"provider": "openai", "model": ""},
                {"provider": "openai", "model": "gpt-x"}
            ],
            "empty-after-filter": [{"provider": "", "model": ""}]
        }"#;
        let chains = FailoverChains::from_json(raw);
        let targets = chains.targets_for("m");
        assert_eq!(targets.len(), 1);
        assert_eq!(targets[0].model, "gpt-x");
        // A chain that becomes empty after filtering is removed entirely.
        assert!(chains.targets_for("empty-after-filter").is_empty());
    }
}
