//! Model mapping service with moka cache
//!
//! Three-level lookup priority:
//! 1. Exact match in `model_mappings` table
//! 2. Wildcard match (e.g. `claude-*`) with priority + specificity tiebreaker
//! 3. Reject request (ModelNotFoundError)

use moka::future::Cache;
use std::sync::Arc;
use std::time::Duration;

use crate::database::models::ModelMappingRecord;
use crate::database::traits::DatabaseService;
use crate::services::capabilities::ModelCapabilities;

/// Error returned when no model mapping matches the requested model.
#[derive(Debug, Clone)]
pub struct ModelNotFoundError(pub String);

impl std::fmt::Display for ModelNotFoundError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "Model not found: {}", self.0)
    }
}

impl std::error::Error for ModelNotFoundError {}

/// Resolved model information including routing provider and capabilities.
#[derive(Debug, Clone)]
pub struct ResolvedModel {
    pub target_model_id: String,
    pub provider: String, // "bedrock" / "gemini" / ""
    pub capabilities: ModelCapabilities,
}

/// Simple glob matching: only supports `*` as a wildcard (equivalent to `.*` in regex).
///
/// Supported patterns:
/// - `*` — matches everything
/// - `claude-*` — prefix match
/// - `*-latest` — suffix match
/// - `claude-*-latest` — prefix + suffix match
/// - `claude-3` — exact match (no wildcard)
fn glob_match(pattern: &str, input: &str) -> bool {
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
fn pattern_specificity(pattern: &str) -> usize {
    pattern.find('*').unwrap_or(pattern.len())
}

/// Service for resolving model IDs with caching.
pub struct ModelMappingService {
    storage: Arc<dyn DatabaseService>,
    cache: Cache<String, Option<ResolvedModel>>,
    wildcard_cache: Cache<String, Vec<ModelMappingRecord>>,
}

impl ModelMappingService {
    pub fn new(storage: Arc<dyn DatabaseService>) -> Self {
        let cache = Cache::builder()
            .max_capacity(1000)
            .time_to_live(Duration::from_secs(300)) // 5min TTL
            .build();

        let wildcard_cache = Cache::builder()
            .max_capacity(1)
            .time_to_live(Duration::from_secs(300)) // 5min TTL
            .build();

        Self {
            storage,
            cache,
            wildcard_cache,
        }
    }

    /// Load wildcard mappings (with caching).
    async fn get_wildcard_mappings(&self) -> Vec<ModelMappingRecord> {
        let key = "_wildcards".to_string();
        if let Some(cached) = self.wildcard_cache.get(&key).await {
            return cached;
        }

        let wildcards = self
            .storage
            .model_mapping()
            .list_wildcard_mappings()
            .await
            .unwrap_or_else(|e| {
                tracing::warn!(error = %e, "Failed to load wildcard mappings");
                vec![]
            });

        self.wildcard_cache.insert(key, wildcards.clone()).await;
        wildcards
    }

    /// Resolve a source model ID to a ResolvedModel (target model ID + provider).
    ///
    /// Priority: exact match > wildcard match (by priority, then specificity) > error.
    pub async fn resolve(
        &self,
        source_model_id: &str,
    ) -> Result<ResolvedModel, ModelNotFoundError> {
        let key = source_model_id.to_string();

        // 1. Check cache
        if let Some(cached) = self.cache.get(&key).await {
            return cached.ok_or_else(|| ModelNotFoundError(source_model_id.to_string()));
        }

        // 2. Exact match from database
        if let Ok(mappings) = self
            .storage
            .model_mapping()
            .get_mappings(source_model_id)
            .await
        {
            if let Some(mapping) = mappings.into_iter().find(|m| m.status == "active") {
                let resolved = ResolvedModel {
                    target_model_id: mapping.target_model_id.clone(),
                    provider: mapping.provider.clone(),
                    capabilities: ModelCapabilities::from_json(mapping.capabilities.as_deref()),
                };
                self.cache.insert(key, Some(resolved.clone())).await;
                return Ok(resolved);
            }
        }

        // 3. Wildcard match
        let wildcards = self.get_wildcard_mappings().await;
        let matched = wildcards
            .iter()
            .filter(|m| glob_match(&m.source_model_id, source_model_id))
            .max_by_key(|m| (m.priority, pattern_specificity(&m.source_model_id) as i32));

        match matched {
            Some(mapping) => {
                let resolved = ResolvedModel {
                    target_model_id: mapping.target_model_id.clone(),
                    provider: mapping.provider.clone(),
                    capabilities: ModelCapabilities::from_json(mapping.capabilities.as_deref()),
                };
                self.cache.insert(key, Some(resolved.clone())).await;
                Ok(resolved)
            }
            None => {
                // Cache the miss to avoid repeated DB queries
                self.cache.insert(key, None).await;
                Err(ModelNotFoundError(source_model_id.to_string()))
            }
        }
    }

    /// Invalidate a specific cache entry.
    pub async fn invalidate(&self, source_model_id: &str) {
        self.cache.invalidate(&source_model_id.to_string()).await;
    }

    /// Invalidate all cached entries (including wildcard cache).
    pub async fn invalidate_all(&self) {
        self.cache.invalidate_all();
        self.wildcard_cache.invalidate_all();
    }

    /// Get the pricing info for a model (for cost calculation).
    pub async fn get_pricing(&self, source_model_id: &str) -> Option<(f64, f64, f64, f64)> {
        match self
            .storage
            .model_mapping()
            .get_mappings(source_model_id)
            .await
        {
            Ok(mappings) => mappings
                .into_iter()
                .find(|m| m.status == "active")
                .map(|mapping| {
                    (
                        mapping.input_price,
                        mapping.output_price,
                        mapping.cache_read_price,
                        mapping.cache_write_price,
                    )
                }),
            _ => None,
        }
    }
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
