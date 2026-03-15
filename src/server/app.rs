//! Application server

use crate::{
    config::Settings,
    database,
    server::{routes, state::AppState},
    services::{
        BedrockService, GeminiConfig, GeminiService, ModelMappingService, PtcService, UsageTracker,
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

    for (i, backend) in bedrock_backends.iter().enumerate() {
        let config: serde_json::Value = serde_json::from_str(&backend.config).unwrap_or_default();

        let region = config
            .get("region")
            .and_then(|v| v.as_str())
            .unwrap_or("us-east-1");

        let profile = config.get("profile").and_then(|v| v.as_str());
        let weight = config.get("weight").and_then(|v| v.as_u64()).unwrap_or(1) as u32;

        let cred_name = backend.name.clone();

        tracing::info!(
            name = %cred_name,
            region = %region,
            profile = ?profile,
            index = i,
            "Creating Bedrock client from backends table"
        );

        let client = crate::config::create_bedrock_client_with_profile(profile, region, None).await;

        // Create AwsCredential for the pool
        let aws_cred = if let Some(p) = profile {
            crate::services::AwsCredential::with_profile(p, region, &cred_name, weight)
        } else {
            crate::services::AwsCredential::default_credential(region, &cred_name)
        };

        clients.push((cred_name, client));
        credentials.push(aws_cred);
    }

    if clients.len() == 1 {
        // Single client: use simple constructor
        let (_, client) = clients.into_iter().next().unwrap();
        return Ok(Some(BedrockService::new(client)));
    }

    // Multiple clients: use credential pool
    let pool = crate::services::CredentialPool::round_robin(credentials);
    tracing::info!(
        count = clients.len(),
        "Bedrock service initialized with credential pool"
    );
    Ok(Some(BedrockService::with_pool(clients, pool)))
}

/// Initialize Gemini service from the backends table
async fn init_gemini_from_backends(
    database: &Arc<dyn crate::database::traits::DatabaseService>,
) -> Result<Option<GeminiService>> {
    let backends = database.backends().list_enabled_backends().await?;

    for backend in backends {
        if backend.backend_type == "gemini" && backend.enabled {
            let config: serde_json::Value =
                serde_json::from_str(&backend.config).unwrap_or_default();

            let api_keys: Vec<String> = config
                .get("api_keys")
                .and_then(|v| v.as_array())
                .map(|arr| {
                    arr.iter()
                        .filter_map(|v| v.as_str().map(String::from))
                        .collect()
                })
                .unwrap_or_default();

            if api_keys.is_empty() {
                continue;
            }

            let mut gemini_config = GeminiConfig::with_keys(api_keys);

            if let Some(base_url) = config.get("base_url").and_then(|v| v.as_str()) {
                gemini_config = gemini_config.with_base_url(base_url);
            }

            if let Some(timeout) = config.get("timeout_seconds").and_then(|v| v.as_u64()) {
                gemini_config = gemini_config.with_timeout(timeout);
            }

            return Ok(Some(GeminiService::new(gemini_config)?));
        }
    }

    Ok(None)
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
