//! Application settings
//!
//! Core environment variables:
//! - DATABASE: Storage backend (sqlite://, postgres://, dynamodb://)
//! - PORT: HTTP listen port (default: 8000)
//! - LOG_LEVEL: Logging level (default: info)
//! - MASTER_API_KEY: Admin API key (auto-generated if missing on bare metal)
//! - ENCRYPTION_KEY: AES-256-GCM key for credential encryption (auto-generated if missing on bare metal)

use anyhow::{bail, Context, Result};
use std::env;
use std::io::Write;

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

        let mut settings = Self {
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
        };

        settings.ensure_required_keys()?;

        Ok(settings)
    }

    /// Ensure MASTER_API_KEY and ENCRYPTION_KEY are set.
    ///
    /// - **Container** (`CONTAINER=true`): error and abort if missing.
    /// - **Bare metal**: auto-generate missing keys and append to `.env` file.
    fn ensure_required_keys(&mut self) -> Result<()> {
        let is_container = env::var("CONTAINER")
            .map(|v| v == "true" || v == "1")
            .unwrap_or(false);

        let need_master = self.master_api_key.is_none();
        let need_encryption = self.encryption_key.is_none();

        if !need_master && !need_encryption {
            return Ok(());
        }

        if is_container {
            let mut missing = Vec::new();
            if need_master {
                missing.push("MASTER_API_KEY");
            }
            if need_encryption {
                missing.push("ENCRYPTION_KEY");
            }
            bail!(
                "Required environment variables not set: {}. \
                 In container deployments, these must be provided via environment variables.",
                missing.join(", ")
            );
        }

        // Bare metal: auto-generate and write to .env
        let mut lines = Vec::new();

        if need_master {
            let key = format!("sk-{}", uuid::Uuid::new_v4().to_string().replace('-', ""));
            self.master_api_key = Some(key.clone());
            lines.push(format!("MASTER_API_KEY={key}"));
            eprintln!("  [auto-generated] MASTER_API_KEY={key}");
        }

        if need_encryption {
            let key: String = (0..32)
                .map(|_| format!("{:02x}", rand::random::<u8>()))
                .collect();
            self.encryption_key = Some(key.clone());
            lines.push(format!("ENCRYPTION_KEY={key}"));
            eprintln!("  [auto-generated] ENCRYPTION_KEY={key}");
        }

        if !lines.is_empty() {
            if let Err(e) = append_to_dotenv(&lines) {
                eprintln!(
                    "  Warning: could not write to .env file: {e}. \
                     Keys are active for this session only."
                );
            } else {
                eprintln!("  Auto-generated keys saved to .env — keep this file safe.");
            }
        }

        Ok(())
    }

    /// Apply CLI argument overrides (highest priority).
    ///
    /// Priority: .env file < environment variable < CLI argument.
    pub fn apply_overrides(
        &mut self,
        database: Option<String>,
        port: Option<u16>,
        host: Option<String>,
        log_level: Option<String>,
        master_api_key: Option<String>,
        encryption_key: Option<String>,
    ) {
        if let Some(v) = database {
            self.database = v;
        }
        if let Some(v) = port {
            self.port = v;
        }
        if let Some(v) = host {
            self.host = v;
        }
        if let Some(v) = log_level {
            self.log_level = v;
        }
        if let Some(v) = master_api_key {
            self.master_api_key = Some(v);
        }
        if let Some(v) = encryption_key {
            self.encryption_key = Some(v);
        }
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

/// Append key=value lines to the .env file, creating it if it doesn't exist.
fn append_to_dotenv(lines: &[String]) -> std::io::Result<()> {
    let mut file = std::fs::OpenOptions::new()
        .create(true)
        .append(true)
        .open(".env")?;

    // Add a blank line separator if the file is non-empty
    let metadata = file.metadata()?;
    if metadata.len() > 0 {
        writeln!(file)?;
    }

    writeln!(file, "# Auto-generated by one-router")?;
    for line in lines {
        writeln!(file, "{line}")?;
    }
    Ok(())
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
