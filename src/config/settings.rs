//! Minimal application settings
//!
//! Only 5 environment variables:
//! - DATABASE: Storage backend (sqlite://, postgres://, dynamodb://)
//! - PORT: HTTP listen port (default: 8000)
//! - LOG_LEVEL: Logging level (default: info)
//! - MASTER_API_KEY: Admin API key (optional)
//! - ENCRYPTION_KEY: AES-256-GCM key for credential encryption (optional)

use anyhow::{Context, Result};
use std::env;

/// Main application settings — loaded from a minimal set of env vars.
#[derive(Debug, Clone)]
pub struct Settings {
    /// Database connection string (scheme selects backend: sqlite://, postgres://, dynamodb://)
    pub database: String,

    /// HTTP listen port
    pub port: u16,

    /// HTTP bind host
    pub host: String,

    /// Log level filter
    pub log_level: String,

    /// Master API key for admin access
    pub master_api_key: Option<String>,

    /// Encryption key for credential storage (AES-256-GCM via HKDF)
    pub encryption_key: Option<String>,

    /// Web search provider name ("tavily" or "brave")
    pub web_search_provider: Option<String>,

    /// Web search API key
    pub web_search_api_key: Option<String>,

    /// Maximum content size in KB for web fetch operations
    pub web_fetch_max_content_kb: u64,

    /// Application version (from Cargo.toml)
    pub app_version: String,

    /// Ephemeral API key generated at startup for dev convenience
    pub ephemeral_api_key: Option<String>,
}

impl Settings {
    /// Load settings from environment variables with sensible defaults.
    pub fn load() -> Result<Self> {
        dotenvy::dotenv().ok();

        let database =
            env::var("DATABASE").unwrap_or_else(|_| "sqlite://./data/gateway.db".to_string());

        let port: u16 = env::var("PORT")
            .unwrap_or_else(|_| "8000".to_string())
            .parse()
            .context("Invalid PORT value")?;

        let host = env::var("HOST").unwrap_or_else(|_| "0.0.0.0".to_string());

        let log_level = env::var("LOG_LEVEL").unwrap_or_else(|_| "info".to_string());

        let master_api_key = env::var("MASTER_API_KEY").ok().filter(|k| !k.is_empty());

        let encryption_key = env::var("ENCRYPTION_KEY").ok().filter(|k| !k.is_empty());

        let web_search_provider = env::var("WEB_SEARCH_PROVIDER")
            .ok()
            .filter(|v| !v.is_empty());
        let web_search_api_key = env::var("WEB_SEARCH_API_KEY")
            .ok()
            .filter(|v| !v.is_empty());
        let web_fetch_max_content_kb = env::var("WEB_FETCH_MAX_CONTENT_KB")
            .ok()
            .and_then(|v| v.parse().ok())
            .unwrap_or(512);

        if encryption_key.is_none() {
            tracing::warn!(
                "ENCRYPTION_KEY not set — backend credentials will be stored in PLAINTEXT. \
                 Set ENCRYPTION_KEY for production use."
            );
        }

        Ok(Self {
            database,
            port,
            host,
            log_level,
            master_api_key,
            encryption_key,
            web_search_provider,
            web_search_api_key,
            web_fetch_max_content_kb,
            app_version: env!("CARGO_PKG_VERSION").to_string(),
            ephemeral_api_key: None,
        })
    }

    /// Generate and store an ephemeral API key (for dev convenience).
    pub fn generate_ephemeral_key(&mut self) -> String {
        let key = format!("sk-{}", uuid::Uuid::new_v4().to_string().replace("-", ""));
        self.ephemeral_api_key = Some(key.clone());
        key
    }

    /// Get the server address string.
    pub fn server_addr(&self) -> String {
        format!("{}:{}", self.host, self.port)
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_server_addr() {
        let settings = Settings {
            database: "sqlite://./test.db".into(),
            port: 9000,
            host: "127.0.0.1".into(),
            log_level: "debug".into(),
            master_api_key: None,
            encryption_key: None,
            web_search_provider: None,
            web_search_api_key: None,
            web_fetch_max_content_kb: 512,
            app_version: "0.1.0".into(),
            ephemeral_api_key: None,
        };
        assert_eq!(settings.server_addr(), "127.0.0.1:9000");
    }

    #[test]
    fn test_generate_ephemeral_key() {
        let mut settings = Settings {
            database: "sqlite://./test.db".into(),
            port: 8000,
            host: "0.0.0.0".into(),
            log_level: "info".into(),
            master_api_key: None,
            encryption_key: None,
            web_search_provider: None,
            web_search_api_key: None,
            web_fetch_max_content_kb: 512,
            app_version: "0.1.0".into(),
            ephemeral_api_key: None,
        };
        let key = settings.generate_ephemeral_key();
        assert!(key.starts_with("sk-"));
        assert_eq!(settings.ephemeral_api_key, Some(key));
    }
}
