//! Generic backend instance wrapper for service-level load balancing.
//!
//! `BackendInstance<S>` wraps a service (e.g. `GeminiService`, `PassthroughService`)
//! and implements the `Credential` trait so it can be managed by `CredentialPool`.

use super::credential::{Credential, CredentialHealth};
use super::model_filter::{MatchRank, ModelFilter};
use std::sync::Arc;

/// A backend instance that wraps a service and participates in pool selection.
///
/// Each `BackendInstance` corresponds to one backend record in the database,
/// with its own service configuration (base_url, timeout, api_keys, etc.).
pub struct BackendInstance<S> {
    name: String,
    pub service: Arc<S>,
    weight: u32,
    service_tier: Option<String>,
    health: CredentialHealth,
    /// Model filter (which target model ids this backend serves)
    filter: ModelFilter,
    /// Backend priority — tiebreaker between wildcard matches of equal kind
    priority: i32,
}

impl<S> BackendInstance<S> {
    pub fn new(
        name: impl Into<String>,
        service: S,
        weight: u32,
        service_tier: Option<String>,
    ) -> Self {
        Self {
            name: name.into(),
            service: Arc::new(service),
            weight,
            service_tier,
            health: CredentialHealth::new(),
            filter: ModelFilter::default(),
            priority: 0,
        }
    }

    /// Attach a model filter and backend priority (per-backend model affinity).
    pub fn with_model_filter(mut self, models: Option<&[String]>, priority: i32) -> Self {
        self.filter = ModelFilter::from_patterns(models);
        self.priority = priority;
        self
    }

    pub fn service_tier(&self) -> Option<&str> {
        self.service_tier.as_deref()
    }
}

impl<S: Send + Sync> Credential for BackendInstance<S> {
    fn name(&self) -> &str {
        &self.name
    }

    fn weight(&self) -> u32 {
        self.weight
    }

    fn health(&self) -> &CredentialHealth {
        &self.health
    }

    fn serves_model(&self, target_model_id: &str) -> bool {
        self.filter.matches(target_model_id)
    }

    fn model_match_rank(&self, target_model_id: &str) -> MatchRank {
        self.filter
            .match_rank(target_model_id, self.priority)
            .unwrap_or(MatchRank::catch_all(self.priority))
    }
}
