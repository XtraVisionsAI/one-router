//! API endpoint handlers module

pub mod admin;
pub mod chat_completions;
pub mod embeddings;
pub mod extractors;
pub mod health;
pub mod images;
pub mod messages;
pub mod models;
pub mod ptc_handler;
pub mod rerank;
pub mod responses;
pub mod usage;

/// SSE keep-alive used by every streaming endpoint.
///
/// Emits an SSE comment line (`:`) whenever the inner stream has been quiet
/// for the interval. Bedrock `InvokeModelWithResponseStream` sends no `ping`
/// events while a model is thinking, and a multi-minute silence trips client
/// idle watchdogs (Claude Code: "The response stopped arriving", 180s default
/// against a base-URL proxy). Comment frames are ignored by every SSE client
/// but still count as received bytes.
pub fn sse_keep_alive() -> axum::response::sse::KeepAlive {
    axum::response::sse::KeepAlive::new().interval(std::time::Duration::from_secs(15))
}
