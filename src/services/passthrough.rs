//! Passthrough service for proxying requests to Anthropic and OpenAI APIs
//!
//! This module provides a generic HTTP proxy that forwards requests to the real
//! Anthropic or OpenAI APIs, replacing only the API key.

use crate::services::backend_pool::{ApiKeyCredential, Credential, CredentialPool, PoolConfig};
use reqwest::Client;
use std::sync::Arc;
use thiserror::Error;

// ============================================================================
// Constants
// ============================================================================

const ANTHROPIC_API_BASE: &str = "https://api.anthropic.com";
const OPENAI_API_BASE: &str = "https://api.openai.com";

// ============================================================================
// Error Types
// ============================================================================

#[derive(Error, Debug)]
pub enum PassthroughError {
    #[error("HTTP request failed: {0}")]
    HttpError(#[from] reqwest::Error),

    #[error("No available credentials in pool")]
    NoAvailableCredentials,

    #[error("API error: {status} - {body}")]
    ApiError { status: u16, body: String },
}

// ============================================================================
// Target enum
// ============================================================================

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum PassthroughTarget {
    Anthropic,
    OpenAI,
}

// ============================================================================
// Config
// ============================================================================

pub struct PassthroughConfig {
    pub api_keys: Vec<String>,
    pub base_url: Option<String>,
    pub organization: Option<String>,
    pub timeout_seconds: u64,
    pub target: PassthroughTarget,
}

// ============================================================================
// Service
// ============================================================================

pub struct PassthroughService {
    client: Client,
    base_url: String,
    target: PassthroughTarget,
    organization: Option<String>,
    credential_pool: Arc<CredentialPool<ApiKeyCredential>>,
}

impl Clone for PassthroughService {
    fn clone(&self) -> Self {
        Self {
            client: self.client.clone(),
            base_url: self.base_url.clone(),
            target: self.target,
            organization: self.organization.clone(),
            credential_pool: Arc::clone(&self.credential_pool),
        }
    }
}

impl PassthroughService {
    pub fn new(config: PassthroughConfig) -> Result<Self, PassthroughError> {
        Self::with_pool_config(config, PoolConfig::default())
    }

    pub fn with_pool_config(
        config: PassthroughConfig,
        pool_config: PoolConfig,
    ) -> Result<Self, PassthroughError> {
        let client = Client::builder()
            .timeout(std::time::Duration::from_secs(config.timeout_seconds))
            .build()
            .map_err(PassthroughError::HttpError)?;

        let default_base = match config.target {
            PassthroughTarget::Anthropic => ANTHROPIC_API_BASE,
            PassthroughTarget::OpenAI => OPENAI_API_BASE,
        };
        let base_url = config.base_url.unwrap_or_else(|| default_base.to_string());

        let prefix = match config.target {
            PassthroughTarget::Anthropic => "anthropic",
            PassthroughTarget::OpenAI => "openai",
        };

        let credentials: Vec<ApiKeyCredential> = config
            .api_keys
            .iter()
            .enumerate()
            .map(|(idx, key)| ApiKeyCredential::new(key, format!("{}_key_{}", prefix, idx + 1), 1))
            .collect();

        let credential_pool = CredentialPool::new(credentials, pool_config);

        tracing::info!(
            target = ?config.target,
            key_count = credential_pool.len(),
            base_url = %base_url,
            "Initialized PassthroughService"
        );

        Ok(Self {
            client,
            base_url,
            target: config.target,
            organization: config.organization,
            credential_pool: Arc::new(credential_pool),
        })
    }

    fn get_credential(&self) -> Result<&ApiKeyCredential, PassthroughError> {
        self.credential_pool
            .get_next()
            .ok_or(PassthroughError::NoAvailableCredentials)
    }

    pub fn record_success(&self, credential_name: &str) {
        self.credential_pool.record_success(credential_name);
    }

    pub fn record_failure(&self, credential_name: &str) -> bool {
        self.credential_pool.record_failure(credential_name)
    }

    pub fn pool_stats(&self) -> crate::services::backend_pool::PoolStats {
        self.credential_pool.stats()
    }

    /// Forward a request to the upstream API.
    ///
    /// `extra_headers` is a list of (name, value) pairs to forward from the client.
    /// Returns the raw reqwest::Response so the caller can handle streaming or
    /// non-streaming reads.
    pub async fn forward(
        &self,
        path: &str,
        body_bytes: Vec<u8>,
        extra_headers: &[(String, String)],
    ) -> Result<(reqwest::Response, String), PassthroughError> {
        let credential = self.get_credential()?;
        let credential_name = credential.name().to_string();
        let api_key = credential.api_key().to_string();

        let url = format!("{}{}", self.base_url, path);

        tracing::debug!(
            url = %url,
            credential = %credential_name,
            target = ?self.target,
            "Forwarding passthrough request"
        );

        let mut req_builder = self
            .client
            .post(&url)
            .header("Content-Type", "application/json");

        // Set auth header based on target
        match self.target {
            PassthroughTarget::Anthropic => {
                req_builder = req_builder.header("x-api-key", &api_key);
            }
            PassthroughTarget::OpenAI => {
                req_builder = req_builder.header("Authorization", format!("Bearer {api_key}"));
                if let Some(ref org) = self.organization {
                    req_builder = req_builder.header("OpenAI-Organization", org.as_str());
                }
            }
        }

        // Forward safe extra headers from client
        for (name, value) in extra_headers {
            req_builder = req_builder.header(name.as_str(), value.as_str());
        }

        let response = req_builder.body(body_bytes).send().await;

        match response {
            Ok(resp) => {
                let status = resp.status().as_u16();
                if status == 429 || status >= 500 {
                    let disabled = self.record_failure(&credential_name);
                    if disabled {
                        tracing::warn!(
                            credential = %credential_name,
                            "Passthrough credential disabled due to repeated failures"
                        );
                    }
                }
                Ok((resp, credential_name))
            }
            Err(e) => {
                self.record_failure(&credential_name);
                Err(PassthroughError::HttpError(e))
            }
        }
    }
}
