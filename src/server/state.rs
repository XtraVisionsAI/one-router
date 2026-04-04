//! Application state container
//!
//! Holds all shared resources that handlers need access to.

use crate::config::Settings;
use crate::converters::cache_transform::PromptCacheMode;
use crate::database::encryption::Encryptor;
use crate::database::traits::DatabaseService;
use crate::services::web_tools::executor::WebToolExecutor;
use crate::services::{
    BedrockService, GeminiService, ModelMappingService, PassthroughService, PtcService,
    UsageTracker,
};
use std::sync::Arc;
use std::time::Instant;

/// Shared application state
///
/// Designed to be cheaply cloneable (via Arc) and thread-safe.
#[derive(Clone)]
pub struct AppState {
    /// Application settings
    pub settings: Arc<Settings>,

    /// Database backend (SQLite / PostgreSQL / DynamoDB)
    pub database: Arc<dyn DatabaseService>,

    /// Bedrock service for model inference (None if no Bedrock backend configured)
    pub bedrock: Option<Arc<BedrockService>>,

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

    /// Gemini service for Google Gemini API (optional)
    pub gemini_service: Option<Arc<GeminiService>>,

    /// Anthropic passthrough service (optional)
    pub anthropic_service: Option<Arc<PassthroughService>>,

    /// OpenAI passthrough service (optional)
    pub openai_service: Option<Arc<PassthroughService>>,

    /// Web tool executor for server-side web_search/web_fetch tools (optional)
    pub web_tool_executor: Option<Arc<WebToolExecutor>>,

    /// Prompt cache mode loaded at startup from `prompt_cache` system setting.
    /// Requires restart to take effect.
    pub prompt_cache_mode: PromptCacheMode,

    /// Default rate limit in RPM loaded at startup from `rate_limit` system setting.
    /// None means rate limiting is globally disabled (option A: per-key settings also ignored).
    /// Requires restart to take effect.
    pub rate_limit_rpm: Option<u32>,

    /// Global policy: allow tool use. Requires restart.
    pub global_tool_use: bool,

    /// Global policy: allow extended thinking. Requires restart.
    pub global_extended_thinking: bool,

    /// Global policy: allow document content blocks. Requires restart.
    pub global_document_support: bool,

    /// Global policy: allow PTC (Programmatic Tool Calling). Requires restart.
    pub global_ptc: bool,
}

impl AppState {
    /// Get the application uptime in seconds
    pub fn uptime_seconds(&self) -> u64 {
        self.start_time.elapsed().as_secs()
    }
}
