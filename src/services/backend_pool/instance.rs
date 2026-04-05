//! Generic backend instance wrapper for service-level load balancing.
//!
//! `BackendInstance<S>` wraps a service (e.g. `GeminiService`, `PassthroughService`)
//! and implements the `Credential` trait so it can be managed by `CredentialPool`.

use super::credential::{Credential, CredentialHealth};
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
        }
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
}
