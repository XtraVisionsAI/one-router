//! Application state container
//!
//! Holds all shared resources that handlers need access to.
//! `DynamicConfig` fields can be hot-reloaded via admin API without restart.

use crate::config::Settings;
use crate::converters::cache_transform::PromptCacheMode;
use crate::database::encryption::Encryptor;
use crate::database::traits::DatabaseService;
use crate::services::capabilities::ModelCapabilities;
use crate::services::web_tools::executor::WebToolExecutor;
use crate::services::{
    BackendInstance, BedrockService, CredentialPool, GeminiService, ModelMappingService,
    PassthroughService, PtcService, UpdateService, UsageTracker,
};
use std::collections::HashSet;
use std::sync::Arc;
use std::time::Instant;
use tokio::sync::RwLock;

/// In-memory store of active admin session tokens.
pub type SessionStore = Arc<RwLock<HashSet<String>>>;

/// Hot-reloadable configuration — wrapped in `Arc<RwLock<>>` for shared mutable access.
pub struct DynamicConfig {
    /// Bedrock service for model inference
    pub bedrock: Option<Arc<BedrockService>>,

    /// Gemini backend pool
    pub gemini_pool: Option<Arc<CredentialPool<BackendInstance<GeminiService>>>>,

    /// Anthropic passthrough backend pool
    pub anthropic_pool: Option<Arc<CredentialPool<BackendInstance<PassthroughService>>>>,

    /// OpenAI passthrough backend pool
    pub openai_pool: Option<Arc<CredentialPool<BackendInstance<PassthroughService>>>>,

    /// Web tool executor
    pub web_tool_executor: Option<Arc<WebToolExecutor>>,

    /// Prompt cache mode
    pub prompt_cache_mode: PromptCacheMode,

    /// Default rate limit in RPM (None = disabled)
    pub rate_limit_rpm: Option<u32>,

    /// Default capabilities for models without explicit capabilities
    pub default_capabilities: ModelCapabilities,

    /// Model-level failover chains (source model → backup providers/models)
    pub failover_chains: crate::services::failover::FailoverChains,
}

impl DynamicConfig {
    /// True if `provider` has at least one healthy credential (or, for bedrock,
    /// a configured service with a healthy pool). Used as the failover trigger.
    ///
    /// Provider strings map to backends exactly as the request handlers dispatch
    /// them: `gemini`/`anthropic`/`openai` route to their pools; **anything else
    /// (including the empty string) routes to bedrock**.
    pub fn provider_available(&self, provider: &str) -> bool {
        match provider {
            "gemini" => self
                .gemini_pool
                .as_ref()
                .map(|p| p.stats().is_healthy())
                .unwrap_or(false),
            "anthropic" => self
                .anthropic_pool
                .as_ref()
                .map(|p| p.stats().is_healthy())
                .unwrap_or(false),
            "openai" => self
                .openai_pool
                .as_ref()
                .map(|p| p.stats().is_healthy())
                .unwrap_or(false),
            // Empty or unknown provider dispatches to bedrock (see handlers).
            _ => self
                .bedrock
                .as_ref()
                .map(|b| b.pool_stats().is_healthy())
                .unwrap_or(false),
        }
    }

    /// Resolve the effective `(provider, model)` for a request, applying
    /// credential-exhaustion failover.
    ///
    /// If the primary provider is healthy, returns it unchanged (`false`). If it
    /// is unavailable and a failover chain is configured for `source_model`,
    /// returns the first chain target whose provider is healthy (`true`). If no
    /// target is available, returns the primary unchanged (`false`) so the
    /// normal downstream error surfaces.
    pub fn apply_failover(
        &self,
        source_model: &str,
        primary_provider: &str,
        primary_model: &str,
    ) -> (String, String, bool) {
        if self.provider_available(primary_provider) {
            return (
                primary_provider.to_string(),
                primary_model.to_string(),
                false,
            );
        }
        if let Some(target) = self
            .failover_chains
            .select_available(source_model, |p| self.provider_available(p))
        {
            return (target.provider.clone(), target.model.clone(), true);
        }
        (
            primary_provider.to_string(),
            primary_model.to_string(),
            false,
        )
    }
}

/// Shared application state
///
/// Designed to be cheaply cloneable (via Arc) and thread-safe.
/// Static fields are immutable; dynamic fields live in `DynamicConfig` behind a RwLock.
#[derive(Clone)]
pub struct AppState {
    /// Application settings
    pub settings: Arc<Settings>,

    /// Database backend (SQLite / PostgreSQL / DynamoDB)
    pub database: Arc<dyn DatabaseService>,

    /// Usage tracker for recording API usage
    pub usage_tracker: Arc<UsageTracker>,

    /// Model mapping service (source model → target model, with cache)
    pub model_mapping: Arc<ModelMappingService>,

    /// Application start time (for uptime calculation)
    pub start_time: Instant,

    /// Encryption helper (AES-256-GCM). No-op when ENCRYPTION_KEY is not set.
    pub encryptor: Encryptor,

    /// PTC service for Programmatic Tool Calling (optional)
    pub ptc_service: Option<Arc<PtcService>>,

    /// Self-update service
    pub update_service: Arc<UpdateService>,

    /// Active admin sessions (cookie tokens)
    pub sessions: SessionStore,

    /// Hot-reloadable config (backends, settings, web tools)
    pub dynamic: Arc<RwLock<DynamicConfig>>,
}

impl AppState {
    /// Get the application uptime in seconds
    pub fn uptime_seconds(&self) -> u64 {
        self.start_time.elapsed().as_secs()
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::converters::cache_transform::PromptCacheMode;
    use crate::services::failover::FailoverChains;

    /// A DynamicConfig with no backends configured — every provider is
    /// unavailable. Enough to exercise the failover orchestration branches.
    fn empty_dynamic(failover_chains: FailoverChains) -> DynamicConfig {
        DynamicConfig {
            bedrock: None,
            gemini_pool: None,
            anthropic_pool: None,
            openai_pool: None,
            web_tool_executor: None,
            prompt_cache_mode: PromptCacheMode::Passthrough,
            rate_limit_rpm: None,
            default_capabilities: ModelCapabilities::default(),
            failover_chains,
        }
    }

    #[test]
    fn test_provider_available_false_when_unconfigured() {
        let cfg = empty_dynamic(FailoverChains::default());
        for p in ["bedrock", "gemini", "anthropic", "openai", "", "weird"] {
            assert!(!cfg.provider_available(p), "provider {p} should be down");
        }
    }

    #[test]
    fn test_apply_failover_keeps_primary_when_no_target_available() {
        // A chain exists, but no provider is healthy → no switch, primary kept.
        let chains = FailoverChains::from_json(r#"{"m":[{"provider":"openai","model":"gpt-x"}]}"#);
        let cfg = empty_dynamic(chains);
        let (provider, model, switched) = cfg.apply_failover("m", "bedrock", "orig-model");
        assert!(!switched);
        assert_eq!(provider, "bedrock");
        assert_eq!(model, "orig-model");
    }

    #[test]
    fn test_apply_failover_no_chain_keeps_primary() {
        let cfg = empty_dynamic(FailoverChains::default());
        let (provider, model, switched) = cfg.apply_failover("m", "gemini", "g-model");
        assert!(!switched);
        assert_eq!(provider, "gemini");
        assert_eq!(model, "g-model");
    }
}
