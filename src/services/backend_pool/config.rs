//! Typed backend configuration structs
//!
//! These structs define the JSON schema for `BackendRecord.config`.
//! They are deserialized in `app.rs` when initializing backend services.

use super::strategy::LoadBalanceStrategy;
use serde::{Deserialize, Serialize};

// ============================================================================
// Shared pool settings (flattened into each backend config)
// ============================================================================

/// Pool-level configuration shared by all backend types.
///
/// Embedded via `#[serde(flatten)]` so the JSON stays flat:
/// ```json
/// { "region": "us-east-1", "strategy": "round_robin", "max_failures": 3 }
/// ```
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PoolSettings {
    #[serde(default)]
    pub strategy: LoadBalanceStrategy,
    #[serde(default = "default_max_failures")]
    pub max_failures: u32,
    #[serde(default = "default_retry_after_secs")]
    pub retry_after_secs: u64,
}

impl Default for PoolSettings {
    fn default() -> Self {
        Self {
            strategy: LoadBalanceStrategy::default(),
            max_failures: default_max_failures(),
            retry_after_secs: default_retry_after_secs(),
        }
    }
}

// ============================================================================
// Bedrock backend config
// ============================================================================

/// Configuration stored in `BackendRecord.config` for `backend_type = "bedrock"`.
///
/// Supports three authentication modes (checked in order):
/// 1. `profile` — AWS named profile
/// 2. `access_key_id` + `secret_access_key` (+ optional `session_token`)
/// 3. Default credential chain (env / instance role)
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct BedrockBackendConfig {
    #[serde(default = "default_region")]
    pub region: String,
    #[serde(default)]
    pub profile: Option<String>,
    #[serde(default)]
    pub access_key_id: Option<String>,
    #[serde(default)]
    pub secret_access_key: Option<String>,
    #[serde(default)]
    pub session_token: Option<String>,
    #[serde(default = "default_weight")]
    pub weight: u32,
    #[serde(flatten)]
    pub pool: PoolSettings,
}

// ============================================================================
// Gemini backend config
// ============================================================================

/// Configuration stored in `BackendRecord.config` for `backend_type = "gemini"`.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct GeminiBackendConfig {
    pub api_keys: Vec<String>,
    #[serde(default)]
    pub base_url: Option<String>,
    #[serde(default = "default_timeout")]
    pub timeout_seconds: u64,
    #[serde(flatten)]
    pub pool: PoolSettings,
}

// ============================================================================
// Defaults
// ============================================================================

fn default_region() -> String {
    "us-east-1".to_string()
}
fn default_weight() -> u32 {
    1
}
fn default_max_failures() -> u32 {
    3
}
fn default_retry_after_secs() -> u64 {
    300
}
fn default_timeout() -> u64 {
    120
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_bedrock_config_minimal() {
        let json = r#"{"region":"ap-northeast-1"}"#;
        let cfg: BedrockBackendConfig = serde_json::from_str(json).unwrap();
        assert_eq!(cfg.region, "ap-northeast-1");
        assert_eq!(cfg.weight, 1);
        assert!(cfg.profile.is_none());
        assert!(cfg.access_key_id.is_none());
        assert_eq!(cfg.pool.max_failures, 3);
    }

    #[test]
    fn test_bedrock_config_full() {
        let json = r#"{
            "region": "us-west-2",
            "profile": "prod",
            "weight": 5,
            "strategy": "weighted",
            "max_failures": 5,
            "retry_after_secs": 600
        }"#;
        let cfg: BedrockBackendConfig = serde_json::from_str(json).unwrap();
        assert_eq!(cfg.profile.as_deref(), Some("prod"));
        assert_eq!(cfg.weight, 5);
        assert_eq!(cfg.pool.strategy, LoadBalanceStrategy::Weighted);
        assert_eq!(cfg.pool.max_failures, 5);
    }

    #[test]
    fn test_bedrock_config_access_key() {
        let json = r#"{
            "region": "us-east-1",
            "access_key_id": "AKIA...",
            "secret_access_key": "secret",
            "session_token": "token"
        }"#;
        let cfg: BedrockBackendConfig = serde_json::from_str(json).unwrap();
        assert_eq!(cfg.access_key_id.as_deref(), Some("AKIA..."));
        assert_eq!(cfg.secret_access_key.as_deref(), Some("secret"));
        assert_eq!(cfg.session_token.as_deref(), Some("token"));
    }

    #[test]
    fn test_gemini_config_minimal() {
        let json = r#"{"api_keys":["k1"]}"#;
        let cfg: GeminiBackendConfig = serde_json::from_str(json).unwrap();
        assert_eq!(cfg.api_keys, vec!["k1"]);
        assert_eq!(cfg.timeout_seconds, 120);
        assert!(cfg.base_url.is_none());
        assert_eq!(cfg.pool.strategy, LoadBalanceStrategy::RoundRobin);
    }

    #[test]
    fn test_gemini_config_full() {
        let json = r#"{
            "api_keys": ["k1", "k2"],
            "base_url": "https://custom.api",
            "timeout_seconds": 60,
            "strategy": "random",
            "max_failures": 10
        }"#;
        let cfg: GeminiBackendConfig = serde_json::from_str(json).unwrap();
        assert_eq!(cfg.api_keys.len(), 2);
        assert_eq!(cfg.base_url.as_deref(), Some("https://custom.api"));
        assert_eq!(cfg.timeout_seconds, 60);
        assert_eq!(cfg.pool.strategy, LoadBalanceStrategy::Random);
        assert_eq!(cfg.pool.max_failures, 10);
    }
}
