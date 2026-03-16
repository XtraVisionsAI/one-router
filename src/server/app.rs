//! Application server

use crate::{
    config::Settings,
    database,
    server::{routes, state::AppState},
    services::{
        BedrockBackendConfig, BedrockService, GeminiBackendConfig, GeminiConfig, GeminiService,
        ModelMappingService, PoolConfig, PtcService, UsageTracker,
    },
};
use anyhow::Result;
use std::net::SocketAddr;
use std::sync::Arc;
use std::time::Instant;
use tokio::signal;

/// Main application struct
pub struct App {
    settings: Settings,
    state: AppState,
}

impl App {
    /// Create a new application instance
    ///
    /// Initialization flow:
    /// 1. Parse DATABASE → create storage backend
    /// 2. storage.initialize() → auto create tables + seed defaults
    /// 3. Load backends from `backends` table → init BedrockService / GeminiService
    /// 4. Init ModelMappingService, UsageTracker
    /// 5. Build AppState
    pub async fn new(settings: Settings) -> Result<Self> {
        let settings_arc = Arc::new(settings.clone());
        let start_time = Instant::now();

        // 1. Create database backend
        tracing::info!(database = %settings.database, "Initializing database backend");
        let database = database::create_database(&settings.database).await?;

        // 2. Initialize database (auto-create tables + seed defaults)
        database.initialize().await?;
        tracing::info!("Database initialized successfully");

        // 3. Initialize Bedrock service from backends table
        let bedrock = match init_bedrock_from_backends(&database).await {
            Ok(Some(service)) => {
                tracing::info!("Bedrock service initialized from backends table");
                Some(Arc::new(service))
            }
            Ok(None) => {
                tracing::debug!("No Bedrock backend configured");
                None
            }
            Err(e) => {
                tracing::warn!(
                    "Failed to initialize Bedrock service: {}. Bedrock disabled.",
                    e
                );
                None
            }
        };

        // 4. Initialize Gemini service from backends table
        let gemini_service = match init_gemini_from_backends(&database).await {
            Ok(Some(service)) => {
                tracing::info!("Gemini service initialized from backends table");
                Some(Arc::new(service))
            }
            Ok(None) => {
                tracing::debug!("No Gemini backend configured");
                None
            }
            Err(e) => {
                tracing::warn!(
                    "Failed to initialize Gemini service: {}. Gemini disabled.",
                    e
                );
                None
            }
        };

        // 5. Initialize PTC service
        let ptc_service = match PtcService::new().await {
            Ok(service) => Some(Arc::new(service)),
            Err(e) => {
                tracing::debug!("PTC service not available: {}", e);
                None
            }
        };

        // 6. Initialize services
        let model_mapping = Arc::new(ModelMappingService::new(database.clone()));
        let usage_tracker = Arc::new(UsageTracker::new(database.clone()));

        let state = AppState {
            settings: settings_arc,
            database,
            bedrock,
            usage_tracker,
            model_mapping,
            start_time,
            ptc_service,
            gemini_service,
        };

        tracing::info!("Application state initialized successfully");

        Ok(Self { settings, state })
    }

    /// Run the server with graceful shutdown support
    pub async fn run_with_graceful_shutdown(self) -> Result<()> {
        let addr = self.settings.server_addr().parse::<SocketAddr>()?;
        let router = routes::create_router(self.state);

        tracing::info!("Starting server on {}", addr);

        let listener = tokio::net::TcpListener::bind(addr).await?;

        axum::serve(listener, router)
            .with_graceful_shutdown(shutdown_signal())
            .await?;

        Ok(())
    }
}

/// Initialize Bedrock service from the backends table
///
/// Supports multiple Bedrock backends with CredentialPool for load balancing.
async fn init_bedrock_from_backends(
    database: &Arc<dyn crate::database::traits::DatabaseService>,
) -> Result<Option<BedrockService>> {
    let backends = database.backends().list_enabled_backends().await?;

    let bedrock_backends: Vec<_> = backends
        .into_iter()
        .filter(|b| b.backend_type == "bedrock" && b.enabled)
        .collect();

    if bedrock_backends.is_empty() {
        return Ok(None);
    }

    let mut clients: Vec<(String, aws_sdk_bedrockruntime::Client)> = Vec::new();
    let mut credentials: Vec<crate::services::AwsCredential> = Vec::new();
    let mut pool_config = PoolConfig::default();

    for (i, backend) in bedrock_backends.iter().enumerate() {
        let cfg: BedrockBackendConfig = serde_json::from_str(&backend.config)
            .map_err(|e| anyhow::anyhow!("Invalid bedrock config for '{}': {}", backend.name, e))?;

        // Use pool settings from the first backend
        if i == 0 {
            pool_config = PoolConfig::from(&cfg.pool);
        }

        let cred_name = backend.name.clone();

        tracing::info!(
            name = %cred_name,
            region = %cfg.region,
            profile = ?cfg.profile,
            access_key = cfg.access_key_id.is_some(),
            weight = cfg.weight,
            index = i,
            "Creating Bedrock client from backends table"
        );

        let client = crate::config::create_bedrock_client_from_config(&cfg).await;

        let aws_cred = if let Some(ref p) = cfg.profile {
            crate::services::AwsCredential::with_profile(p, &cfg.region, &cred_name, cfg.weight)
        } else if let (Some(ref ak), Some(ref sk)) = (&cfg.access_key_id, &cfg.secret_access_key) {
            let mut cred = crate::services::AwsCredential::with_access_key(
                ak,
                sk,
                &cfg.region,
                &cred_name,
                cfg.weight,
            );
            if let Some(ref token) = cfg.session_token {
                cred = cred.with_session_token(token);
            }
            cred
        } else {
            crate::services::AwsCredential::default_credential(&cfg.region, &cred_name)
        };

        clients.push((cred_name, client));
        credentials.push(aws_cred);
    }

    if clients.len() == 1 {
        let (_, client) = clients.into_iter().next().unwrap();
        return Ok(Some(BedrockService::new(client)));
    }

    let pool = crate::services::CredentialPool::new(credentials, pool_config);
    tracing::info!(
        count = clients.len(),
        strategy = %pool.strategy(),
        "Bedrock service initialized with credential pool"
    );
    Ok(Some(BedrockService::with_pool(clients, pool)))
}

/// Initialize Gemini service from the backends table.
///
/// Merges API keys from all enabled gemini backends into a single credential pool.
async fn init_gemini_from_backends(
    database: &Arc<dyn crate::database::traits::DatabaseService>,
) -> Result<Option<GeminiService>> {
    let backends = database.backends().list_enabled_backends().await?;

    let gemini_backends: Vec<_> = backends
        .into_iter()
        .filter(|b| b.backend_type == "gemini" && b.enabled)
        .collect();

    if gemini_backends.is_empty() {
        return Ok(None);
    }

    let mut all_api_keys: Vec<String> = Vec::new();
    let mut base_url: Option<String> = None;
    let mut timeout_seconds: u64 = 120;
    let mut pool_config = PoolConfig::default();

    for (i, backend) in gemini_backends.iter().enumerate() {
        let cfg: GeminiBackendConfig = serde_json::from_str(&backend.config)
            .map_err(|e| anyhow::anyhow!("Invalid gemini config for '{}': {}", backend.name, e))?;

        if cfg.api_keys.is_empty() {
            continue;
        }

        // Use settings from the first backend with keys
        if all_api_keys.is_empty() {
            base_url = cfg.base_url.clone();
            timeout_seconds = cfg.timeout_seconds;
            pool_config = PoolConfig::from(&cfg.pool);
        }

        tracing::info!(
            name = %backend.name,
            key_count = cfg.api_keys.len(),
            index = i,
            "Loading Gemini API keys from backends table"
        );

        all_api_keys.extend(cfg.api_keys);
    }

    if all_api_keys.is_empty() {
        return Ok(None);
    }

    let mut gemini_config = GeminiConfig::with_keys(all_api_keys);
    if let Some(url) = base_url {
        gemini_config = gemini_config.with_base_url(url);
    }
    gemini_config = gemini_config.with_timeout(timeout_seconds);

    Ok(Some(GeminiService::with_pool_config(
        gemini_config,
        pool_config,
    )?))
}

/// Create a future that completes when a shutdown signal is received
async fn shutdown_signal() {
    let ctrl_c = async {
        signal::ctrl_c()
            .await
            .expect("Failed to install Ctrl+C handler");
    };

    #[cfg(unix)]
    let terminate = async {
        signal::unix::signal(signal::unix::SignalKind::terminate())
            .expect("Failed to install SIGTERM handler")
            .recv()
            .await;
    };

    #[cfg(not(unix))]
    let terminate = std::future::pending::<()>();

    tokio::select! {
        _ = ctrl_c => {
            tracing::info!("Received Ctrl+C, initiating graceful shutdown");
        }
        _ = terminate => {
            tracing::info!("Received SIGTERM, initiating graceful shutdown");
        }
    }
}
