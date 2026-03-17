//! Application state container
//!
//! Holds all shared resources that handlers need access to.

use crate::config::Settings;
use crate::database::traits::DatabaseService;
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

    /// PTC service for Programmatic Tool Calling (optional)
    pub ptc_service: Option<Arc<PtcService>>,

    /// Gemini service for Google Gemini API (optional)
    pub gemini_service: Option<Arc<GeminiService>>,

    /// Anthropic passthrough service (optional)
    pub anthropic_service: Option<Arc<PassthroughService>>,

    /// OpenAI passthrough service (optional)
    pub openai_service: Option<Arc<PassthroughService>>,
}

impl AppState {
    /// Get the application uptime in seconds
    pub fn uptime_seconds(&self) -> u64 {
        self.start_time.elapsed().as_secs()
    }
}
