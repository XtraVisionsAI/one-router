//! Application settings
//!
//! Core environment variables:
//! - DATABASE: Storage backend (sqlite://, postgres://, dynamodb://)
//! - PORT: HTTP listen port (default: 8000)
//! - LOG_LEVEL: Logging level (default: info)
//! - MAX_BODY_SIZE_MB: Maximum HTTP request body size in MB (default: 64)
//! - MASTER_API_KEY: Admin API key (auto-generated if missing on bare metal)
//! - ENCRYPTION_KEY: AES-256-GCM key for credential encryption (auto-generated if missing on bare metal)

use anyhow::{bail, Context, Result};
use std::env;
use std::io::Write;

/// Default maximum HTTP request body size in megabytes.
pub const DEFAULT_MAX_BODY_SIZE_MB: u64 = 64;

/// Main application settings — loaded from a minimal set of env vars.
#[derive(Clone)]
pub struct Settings {
    /// Database connection string (scheme selects backend: sqlite://, postgres://, dynamodb://)
    pub database: String,

    /// HTTP listen port
    pub port: u16,

    /// HTTP bind host
    pub host: String,

    /// Log level filter
    pub log_level: String,

    /// Maximum HTTP request body size in megabytes (applied via axum
    /// `DefaultBodyLimit`). Long Codex / Claude Code sessions ship the whole
    /// conversation in a single request, easily exceeding axum's 2 MB default.
    pub max_body_size_mb: u64,

    /// Serve `GET /metrics` without authentication (`METRICS_PUBLIC=true`).
    /// Default `false`: the endpoint requires the master key / admin session.
    /// Only enable when the listener is reachable solely from a private network
    /// (e.g. a Prometheus sidecar).
    pub metrics_public: bool,

    /// Peers whose `X-Forwarded-For` is trusted when resolving the client
    /// address (`TRUSTED_PROXY_CIDRS`, comma-separated). Empty = use the TCP
    /// peer address only.
    pub trusted_proxy_cidrs: Vec<crate::utils::client_ip::Cidr>,

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

    /// When to seed default model mappings on startup:
    /// "off" / "empty" (default, first run only) / "missing" (legacy backfill)
    pub seed_defaults: crate::database::seed::SeedMode,

    /// Application version (from Cargo.toml)
    pub app_version: String,

    /// Ephemeral API key generated at startup for dev convenience
    pub ephemeral_api_key: Option<String>,
}

/// Hand-written: secret fields are redacted so a `{:?}` log line cannot leak them.
impl std::fmt::Debug for Settings {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        f.debug_struct("Settings")
            .field("database", &redact_database_uri(&self.database))
            .field("port", &self.port)
            .field("host", &self.host)
            .field("log_level", &self.log_level)
            .field("max_body_size_mb", &self.max_body_size_mb)
            .field("metrics_public", &self.metrics_public)
            .field("trusted_proxy_cidrs", &self.trusted_proxy_cidrs)
            .field(
                "master_api_key",
                &self.master_api_key.as_ref().map(|_| "<redacted>"),
            )
            .field(
                "encryption_key",
                &self.encryption_key.as_ref().map(|_| "<redacted>"),
            )
            .field("web_search_provider", &self.web_search_provider)
            .field(
                "web_search_api_key",
                &self.web_search_api_key.as_ref().map(|_| "<redacted>"),
            )
            .field("web_fetch_max_content_kb", &self.web_fetch_max_content_kb)
            .field("seed_defaults", &self.seed_defaults)
            .field("app_version", &self.app_version)
            .field(
                "ephemeral_api_key",
                &self.ephemeral_api_key.as_ref().map(|_| "<redacted>"),
            )
            .finish()
    }
}

/// The `DATABASE` URI with any password removed, for logs / stdout.
pub fn redact_database_uri(uri: &str) -> String {
    match reqwest::Url::parse(uri) {
        Ok(mut url) if url.password().is_some() => {
            let _ = url.set_password(Some("****"));
            url.to_string()
        }
        Ok(_) => uri.to_string(),
        // Not URL-shaped: drop anything that looks like `user:pass@`.
        Err(_) => match (uri.find("://"), uri.rfind('@')) {
            (Some(i), Some(j)) if j > i => format!("{}****@{}", &uri[..i + 3], &uri[j + 1..]),
            _ => uri.to_string(),
        },
    }
}

fn is_container_env() -> bool {
    env::var("CONTAINER")
        .map(|v| v == "true" || v == "1")
        .unwrap_or(false)
}

/// Default bind host: loopback on bare metal, all interfaces in a container.
fn default_host(container: bool) -> &'static str {
    if container {
        "0.0.0.0"
    } else {
        "127.0.0.1"
    }
}

impl Settings {
    /// Load settings from environment variables with sensible defaults.
    pub fn load() -> Result<Self> {
        // Only `./.env` — not `dotenv()`, which also walks parent directories
        // and could pick up an unrelated `.env` holding other keys.
        dotenvy::from_path(".env").ok();

        let database =
            env::var("DATABASE").unwrap_or_else(|_| "sqlite://./data/gateway.db".to_string());

        let port: u16 = env::var("PORT")
            .unwrap_or_else(|_| "8000".to_string())
            .parse()
            .context("Invalid PORT value")?;

        // Private by default: loopback on bare metal. Inside a container
        // (`CONTAINER=true`, set by every image) the published port is the
        // boundary, so bind all interfaces there.
        let host =
            env::var("HOST").unwrap_or_else(|_| default_host(is_container_env()).to_string());
        let metrics_public = env::var("METRICS_PUBLIC")
            .map(|v| v == "true" || v == "1")
            .unwrap_or(false);
        let trusted_proxy_cidrs = crate::utils::client_ip::parse_cidr_list(
            &env::var("TRUSTED_PROXY_CIDRS").unwrap_or_default(),
        )
        .map_err(|e| anyhow::anyhow!("Invalid TRUSTED_PROXY_CIDRS: {e}"))?;

        let log_level = env::var("LOG_LEVEL").unwrap_or_else(|_| "info".to_string());

        let max_body_size_mb: u64 = env::var("MAX_BODY_SIZE_MB")
            .unwrap_or_else(|_| DEFAULT_MAX_BODY_SIZE_MB.to_string())
            .parse()
            .context("Invalid MAX_BODY_SIZE_MB value")?;
        if max_body_size_mb == 0 {
            bail!("Invalid MAX_BODY_SIZE_MB value: must be at least 1");
        }

        let master_api_key = env::var("MASTER_API_KEY").ok().filter(|k| !k.is_empty());
        if let Some(k) = &master_api_key {
            super::master_key::validate(k).map_err(|e| anyhow::anyhow!(e))?;
        }

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

        let seed_defaults = match env::var("SEED_DEFAULTS") {
            Ok(v) if !v.is_empty() => v
                .parse()
                .map_err(|e: String| anyhow::anyhow!("Invalid SEED_DEFAULTS: {e}"))?,
            _ => crate::database::seed::SeedMode::default(),
        };

        let settings = Self {
            database,
            port,
            host,
            log_level,
            max_body_size_mb,
            metrics_public,
            trusted_proxy_cidrs,
            master_api_key,
            encryption_key,
            web_search_provider,
            web_search_api_key,
            web_fetch_max_content_kb,
            seed_defaults,
            app_version: env!("CARGO_PKG_VERSION").to_string(),
            ephemeral_api_key: None,
        };

        // Key generation happens in `ensure_required_keys`, called by main
        // *after* CLI overrides — so `--master-api-key` / `--encryption-key`
        // never trigger generating (and persisting) unused keys.
        Ok(settings)
    }

    /// Ensure MASTER_API_KEY and ENCRYPTION_KEY are set.
    ///
    /// - **Container** (`CONTAINER=true`): error and abort if missing.
    /// - **Bare metal**: auto-generate missing keys and append to `.env` file.
    pub fn ensure_required_keys(&mut self) -> Result<()> {
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
            // Only the hash is persisted; the plaintext is shown once, and only
            // on an interactive terminal (never into a captured log stream).
            let key = super::master_key::generate();
            let hashed = super::master_key::hash(&key);
            use std::io::IsTerminal;
            if std::io::stderr().is_terminal() {
                eprintln!("  [auto-generated] MASTER_API_KEY={key}");
                eprintln!(
                    "  Store it now — only its SHA-256 is saved to .env and it will not be shown again."
                );
            } else {
                eprintln!(
                    "  [auto-generated] MASTER_API_KEY (not displayed: no terminal). \
                     Run `one-router reset-master-key` interactively to obtain a usable key."
                );
            }
            lines.push(
                "# Master key stored as its SHA-256; log in with the plaintext shown at generation."
                    .to_string(),
            );
            lines.push(format!("MASTER_API_KEY={hashed}"));
            self.master_api_key = Some(hashed);
        }

        if need_encryption {
            let key: String = (0..32)
                .map(|_| format!("{:02x}", rand::random::<u8>()))
                .collect();
            eprintln!("  [auto-generated] ENCRYPTION_KEY=•••• (full value in .env)");
            lines.push(format!("ENCRYPTION_KEY={key}"));
            self.encryption_key = Some(key);
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

    /// Replace a plaintext `MASTER_API_KEY` in `./.env` by its SHA-256 (see
    /// [`super::master_key::migrate_dotenv`]). Logs the outcome; never fails.
    pub fn migrate_master_key(&mut self) {
        use super::master_key::{migrate_dotenv, Migration};
        let Some(current) = self.master_api_key.clone() else {
            return;
        };
        let path = std::path::Path::new(super::dotenv_file::DOTENV_PATH);
        match migrate_dotenv(path, &current) {
            (Migration::Migrated, Some(hashed)) => {
                tracing::warn!(
                    "MASTER_API_KEY in .env was replaced by its SHA-256; the plaintext is no longer \
                     stored. Log in with the original key (lost it? `one-router reset-master-key`)."
                );
                self.master_api_key = Some(hashed);
            }
            (Migration::AlreadyHashed, _) => {}
            (Migration::NotFromDotenv, _) => tracing::warn!(
                "MASTER_API_KEY is plaintext from the environment / CLI. Store \
                 `sha256:<hex>` instead (`one-router hash-key`)."
            ),
            (Migration::Weak, _) => tracing::warn!(
                min_len = super::master_key::MIN_STRONG_LEN,
                "MASTER_API_KEY in .env is weak, so it was not migrated to a hash. Replace it with \
                 `one-router reset-master-key`."
            ),
            (Migration::WriteFailed(e), _) => {
                tracing::warn!(error = %e, "Could not rewrite .env to hash MASTER_API_KEY")
            }
            (Migration::Migrated, None) => {}
        }
    }

    /// Resolve an `ENCRYPTION_KEY` provider reference (`aws-kms:` /
    /// `vault-transit:` / `systemd-creds:` / `raw:`) to the key itself.
    /// Fails closed; logs a warning for a plaintext key.
    pub async fn resolve_encryption_key(&mut self) -> Result<()> {
        let Some(value) = self.encryption_key.clone() else {
            return Ok(());
        };
        let (key, source) = super::key_provider::resolve(&value)
            .await
            .map_err(|e| anyhow::anyhow!("ENCRYPTION_KEY: {e}"))?;
        if source.is_plaintext() {
            if is_container_env() {
                tracing::info!(
                    "ENCRYPTION_KEY is plaintext. Fine when injected from a secret store \
                     (Secrets Manager / SSM / K8s Secret); otherwise wrap it with `one-router wrap-key`."
                );
            } else {
                tracing::warn!(
                    "ENCRYPTION_KEY is stored in plaintext. Wrap it with `one-router wrap-key` \
                     (aws-kms / vault-transit) or use systemd-creds."
                );
            }
        } else {
            tracing::info!(provider = source.label(), "ENCRYPTION_KEY resolved");
        }
        self.encryption_key = Some(key);
        Ok(())
    }

    /// Apply CLI argument overrides (highest priority).
    ///
    /// Priority: .env file < environment variable < CLI argument.
    #[allow(clippy::too_many_arguments)]
    pub fn apply_overrides(
        &mut self,
        database: Option<String>,
        port: Option<u16>,
        host: Option<String>,
        log_level: Option<String>,
        max_body_size_mb: Option<u64>,
        master_api_key: Option<String>,
        encryption_key: Option<String>,
        seed_defaults: Option<crate::database::seed::SeedMode>,
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
        if let Some(v) = max_body_size_mb {
            self.max_body_size_mb = v.max(1);
        }
        if let Some(v) = master_api_key {
            self.master_api_key = Some(v);
        }
        if let Some(v) = encryption_key {
            self.encryption_key = Some(v);
        }
        if let Some(v) = seed_defaults {
            self.seed_defaults = v;
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

    /// Maximum request body size in bytes (for axum `DefaultBodyLimit`).
    pub fn max_body_size_bytes(&self) -> usize {
        usize::try_from(self.max_body_size_mb.saturating_mul(1024 * 1024)).unwrap_or(usize::MAX)
    }

    /// Lightweight startup configuration health check. Returns human-readable
    /// warnings for risky configuration; never blocks startup. Callers should
    /// log each returned string at `warn` level.
    pub fn security_warnings(&self) -> Vec<String> {
        let mut warnings = Vec::new();
        let is_container = env::var("CONTAINER")
            .map(|v| v == "true" || v == "1")
            .unwrap_or(false);

        if let Some(key) = self
            .master_api_key
            .as_ref()
            .filter(|k| !super::master_key::is_hashed(k))
        {
            if super::master_key::is_weak(key) {
                warnings.push(
                    "MASTER_API_KEY matches a well-known weak value; set a strong, random key."
                        .to_string(),
                );
            }
            if key.len() < 16 {
                warnings.push(format!(
                    "MASTER_API_KEY is short ({} chars); use at least 32 random characters.",
                    key.len()
                ));
            }
        }

        if let Some(key) = &self.encryption_key {
            if key.len() < 32 {
                warnings.push(format!(
                    "ENCRYPTION_KEY is short ({} chars); a full-entropy 32+ char key is recommended.",
                    key.len()
                ));
            }
        }

        // In a container the entry keys must be provided explicitly (load()
        // already aborts if missing); flag the auto-generated fallback used on
        // bare metal so operators know it is not persisted across restarts here.
        if !is_container && self.encryption_key.is_none() {
            warnings.push(
                "ENCRYPTION_KEY not set; a key will be auto-generated. Set it explicitly in production.".to_string(),
            );
        }

        warnings
    }
}

/// Append key=value lines to the .env file, creating it if it doesn't exist.
/// Append generated keys to `./.env`, readable by the owner only (0600 — the
/// file holds the master and encryption keys).
fn append_to_dotenv(lines: &[String]) -> std::io::Result<()> {
    let mut opts = std::fs::OpenOptions::new();
    opts.create(true).append(true);
    #[cfg(unix)]
    {
        use std::os::unix::fs::OpenOptionsExt;
        opts.mode(0o600);
    }
    let mut file = opts.open(".env")?;
    // `mode` only applies on creation: tighten an existing file too.
    #[cfg(unix)]
    {
        use std::os::unix::fs::PermissionsExt;
        file.set_permissions(std::fs::Permissions::from_mode(0o600))?;
    }

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
    fn database_uri_redaction() {
        assert_eq!(
            redact_database_uri("postgres://app:s3cret@db:5432/gw"),
            "postgres://app:****@db:5432/gw"
        );
        assert_eq!(
            redact_database_uri("sqlite://./data/gateway.db"),
            "sqlite://./data/gateway.db"
        );
        assert_eq!(
            redact_database_uri("dynamodb://us-east-1"),
            "dynamodb://us-east-1"
        );
        assert!(!redact_database_uri("postgres://u:p%40ss@h/d").contains("p%40ss"));
    }

    #[test]
    fn default_host_is_loopback_outside_containers() {
        assert_eq!(default_host(false), "127.0.0.1");
        assert_eq!(default_host(true), "0.0.0.0");
    }

    #[test]
    fn test_server_addr() {
        let settings = Settings {
            database: "sqlite://./test.db".into(),
            port: 9000,
            host: "127.0.0.1".into(),
            log_level: "debug".into(),
            max_body_size_mb: DEFAULT_MAX_BODY_SIZE_MB,
            metrics_public: false,
            trusted_proxy_cidrs: Vec::new(),
            master_api_key: None,
            encryption_key: None,
            web_search_provider: None,
            web_search_api_key: None,
            web_fetch_max_content_kb: 512,
            seed_defaults: crate::database::seed::SeedMode::default(),
            app_version: "0.1.0".into(),
            ephemeral_api_key: None,
        };
        assert_eq!(settings.server_addr(), "127.0.0.1:9000");
    }

    #[test]
    fn test_security_warnings_flags_weak_master_key() {
        let settings = Settings {
            database: "sqlite://./test.db".into(),
            port: 8000,
            host: "0.0.0.0".into(),
            log_level: "info".into(),
            max_body_size_mb: DEFAULT_MAX_BODY_SIZE_MB,
            metrics_public: false,
            trusted_proxy_cidrs: Vec::new(),
            master_api_key: Some("changeme".into()),
            encryption_key: Some("a".repeat(32)),
            web_search_provider: None,
            web_search_api_key: None,
            web_fetch_max_content_kb: 512,
            seed_defaults: crate::database::seed::SeedMode::default(),
            app_version: "0.1.0".into(),
            ephemeral_api_key: None,
        };
        let warnings = settings.security_warnings();
        assert!(warnings.iter().any(|w| w.contains("MASTER_API_KEY")));
    }

    #[test]
    fn test_security_warnings_strong_key_clean() {
        let settings = Settings {
            database: "sqlite://./test.db".into(),
            port: 8000,
            host: "0.0.0.0".into(),
            log_level: "info".into(),
            max_body_size_mb: DEFAULT_MAX_BODY_SIZE_MB,
            metrics_public: false,
            trusted_proxy_cidrs: Vec::new(),
            master_api_key: Some("sk-9f3c1a7e5b2d4f60a8c1e3d5b7f9a1c3".into()),
            encryption_key: Some("a".repeat(32)),
            web_search_provider: None,
            web_search_api_key: None,
            web_fetch_max_content_kb: 512,
            seed_defaults: crate::database::seed::SeedMode::default(),
            app_version: "0.1.0".into(),
            ephemeral_api_key: None,
        };
        // No master/encryption warnings for strong keys. (An ENCRYPTION_KEY-set
        // config emits no auto-generation warning.)
        assert!(!settings
            .security_warnings()
            .iter()
            .any(|w| w.contains("MASTER_API_KEY")));
    }

    #[test]
    fn test_max_body_size_bytes() {
        let mut settings = Settings {
            database: "sqlite://./test.db".into(),
            port: 8000,
            host: "0.0.0.0".into(),
            log_level: "info".into(),
            max_body_size_mb: DEFAULT_MAX_BODY_SIZE_MB,
            metrics_public: false,
            trusted_proxy_cidrs: Vec::new(),
            master_api_key: None,
            encryption_key: None,
            web_search_provider: None,
            web_search_api_key: None,
            web_fetch_max_content_kb: 512,
            seed_defaults: crate::database::seed::SeedMode::default(),
            app_version: "0.1.0".into(),
            ephemeral_api_key: None,
        };
        assert_eq!(settings.max_body_size_bytes(), 64 * 1024 * 1024);

        settings.apply_overrides(None, None, None, None, Some(8), None, None, None);
        assert_eq!(settings.max_body_size_mb, 8);
        assert_eq!(settings.max_body_size_bytes(), 8 * 1024 * 1024);

        // Zero is clamped to the 1 MB floor rather than disabling uploads.
        settings.apply_overrides(None, None, None, None, Some(0), None, None, None);
        assert_eq!(settings.max_body_size_mb, 1);
    }

    #[test]
    fn test_generate_ephemeral_key() {
        let mut settings = Settings {
            database: "sqlite://./test.db".into(),
            port: 8000,
            host: "0.0.0.0".into(),
            log_level: "info".into(),
            max_body_size_mb: DEFAULT_MAX_BODY_SIZE_MB,
            metrics_public: false,
            trusted_proxy_cidrs: Vec::new(),
            master_api_key: None,
            encryption_key: None,
            web_search_provider: None,
            web_search_api_key: None,
            web_fetch_max_content_kb: 512,
            seed_defaults: crate::database::seed::SeedMode::default(),
            app_version: "0.1.0".into(),
            ephemeral_api_key: None,
        };
        let key = settings.generate_ephemeral_key();
        assert!(key.starts_with("sk-"));
        assert_eq!(settings.ephemeral_api_key, Some(key));
    }
}
