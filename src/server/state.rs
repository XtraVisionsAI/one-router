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
use std::sync::Arc;
use std::time::Instant;
use tokio::sync::RwLock;

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

    /// Hot-reloadable config (backends, settings, web tools)
    pub dynamic: Arc<RwLock<DynamicConfig>>,
}

impl AppState {
    /// Get the application uptime in seconds
    pub fn uptime_seconds(&self) -> u64 {
        self.start_time.elapsed().as_secs()
    }
}
