//! Application server

use crate::{
    config::Settings,
    database,
    database::encryption::Encryptor,
    server::{routes, state::AppState},
    services::web_tools::{executor::WebToolExecutor, search::build_search_provider},
    services::{
        AnthropicBackendConfig, BackendInstance, BedrockBackendConfig, BedrockService,
        CredentialPool, GeminiBackendConfig, GeminiConfig, GeminiService, LoadBalanceStrategy,
        ModelMappingService, OpenAIBackendConfig, PassthroughConfig, PassthroughService,
        PassthroughTarget, PoolConfig, PtcService, UsageTracker,
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

        // 2.5. Create encryptor early — needed to decrypt backend configs
        let encryptor = Encryptor::new(settings.encryption_key.as_deref());
        if encryptor.is_enabled() {
            tracing::info!("Credential encryption enabled (AES-256-GCM)");
        }

        // 3. Initialize Bedrock service from backends table
        let bedrock = match init_bedrock_from_backends(&database, &encryptor).await {
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

        // 4. Initialize Gemini pool from backends table
        let gemini_pool = match init_gemini_from_backends(&database, &encryptor).await {
            Ok(Some(pool)) => {
                tracing::info!("Gemini pool initialized from backends table");
                Some(pool)
            }
            Ok(None) => {
                tracing::debug!("No Gemini backend configured");
                None
            }
            Err(e) => {
                tracing::warn!("Failed to initialize Gemini pool: {}. Gemini disabled.", e);
                None
            }
        };

        // 5a. Initialize Anthropic passthrough pool from backends table
        let anthropic_pool = match init_passthrough_from_backends(
            &database,
            "anthropic",
            PassthroughTarget::Anthropic,
            &encryptor,
        )
        .await
        {
            Ok(Some(pool)) => {
                tracing::info!("Anthropic passthrough pool initialized from backends table");
                Some(pool)
            }
            Ok(None) => {
                tracing::debug!("No Anthropic backend configured");
                None
            }
            Err(e) => {
                tracing::warn!(
                    "Failed to initialize Anthropic passthrough pool: {}. Anthropic disabled.",
                    e
                );
                None
            }
        };

        // 5b. Initialize OpenAI passthrough pool from backends table
        let openai_pool = match init_passthrough_from_backends(
            &database,
            "openai",
            PassthroughTarget::OpenAI,
            &encryptor,
        )
        .await
        {
            Ok(Some(pool)) => {
                tracing::info!("OpenAI passthrough pool initialized from backends table");
                Some(pool)
            }
            Ok(None) => {
                tracing::debug!("No OpenAI backend configured");
                None
            }
            Err(e) => {
                tracing::warn!(
                    "Failed to initialize OpenAI passthrough pool: {}. OpenAI disabled.",
                    e
                );
                None
            }
        };

        // 6. Initialize PTC service
        let ptc_service = match PtcService::new().await {
            Ok(service) => Some(Arc::new(service)),
            Err(e) => {
                tracing::debug!("PTC service not available: {}", e);
                None
            }
        };

        // 7. Initialize services
        let model_mapping = Arc::new(ModelMappingService::new(database.clone()));
        let usage_tracker = Arc::new(UsageTracker::new(database.clone()));

        // 8. Initialize web tool executor
        let web_tool_executor = {
            let search = settings
                .web_search_provider
                .as_deref()
                .zip(settings.web_search_api_key.as_deref())
                .and_then(|(p, k)| build_search_provider(p, k))
                .map(|p| {
                    Arc::from(p) as Arc<dyn crate::services::web_tools::search::SearchProvider>
                });
            Some(Arc::new(WebToolExecutor::new(
                search,
                settings.web_fetch_max_content_kb,
                10,
            )))
        };

        // 10. Load startup settings from DB (rate_limit, prompt_cache, default capabilities)
        let prompt_cache_mode = load_prompt_cache_mode(&database).await;
        let rate_limit_rpm = load_rate_limit_rpm(&database).await;
        let default_capabilities = load_default_capabilities(&database).await;

        tracing::info!(
            prompt_cache = ?prompt_cache_mode,
            rate_limit_rpm = ?rate_limit_rpm,
            tool_use = default_capabilities.tool_use.enabled,
            extended_thinking = default_capabilities.thinking.enabled,
            document_support = default_capabilities.document.enabled,
            ptc = default_capabilities.ptc.enabled,
            "Startup settings loaded"
        );

        let state = AppState {
            settings: settings_arc,
            database,
            bedrock,
            usage_tracker,
            model_mapping,
            start_time,
            ptc_service,
            gemini_pool,
            anthropic_pool,
            openai_pool,
            encryptor,
            web_tool_executor,
            prompt_cache_mode,
            rate_limit_rpm,
            default_capabilities,
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
    encryptor: &Encryptor,
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
    let mut service_tiers: std::collections::HashMap<String, Option<String>> =
        std::collections::HashMap::new();
    let mut pool_config = PoolConfig::default();

    for (i, backend) in bedrock_backends.iter().enumerate() {
        let decrypted_config = encryptor.decrypt(&backend.config).map_err(|e| {
            anyhow::anyhow!("Failed to decrypt config for '{}': {}", backend.name, e)
        })?;
        let cfg: BedrockBackendConfig = serde_json::from_str(&decrypted_config)
            .map_err(|e| anyhow::anyhow!("Invalid bedrock config for '{}': {}", backend.name, e))?;

        // Use pool settings from the first backend
        if i == 0 {
            pool_config = PoolConfig {
                strategy: crate::services::LoadBalanceStrategy::parse_str(&backend.strategy),
                max_failures: backend.max_failures as u32,
                retry_after_secs: backend.retry_after_secs as u64,
            };
        }

        let cred_name = backend.name.clone();

        tracing::info!(
            name = %cred_name,
            region = %cfg.region,
            profile = ?cfg.profile,
            access_key = cfg.access_key_id.is_some(),
            weight = backend.weight,
            index = i,
            "Creating Bedrock client from backends table"
        );

        let client = crate::config::create_bedrock_client_from_config(&cfg).await;

        let aws_cred = if let Some(ref p) = cfg.profile {
            crate::services::AwsCredential::with_profile(
                p,
                &cfg.region,
                &cred_name,
                backend.weight as u32,
            )
        } else if let (Some(ref ak), Some(ref sk)) = (&cfg.access_key_id, &cfg.secret_access_key) {
            let mut cred = crate::services::AwsCredential::with_access_key(
                ak,
                sk,
                &cfg.region,
                &cred_name,
                backend.weight as u32,
            );
            if let Some(ref token) = cfg.session_token {
                cred = cred.with_session_token(token);
            }
            cred
        } else {
            crate::services::AwsCredential::default_credential(&cfg.region, &cred_name)
        };

        service_tiers.insert(cred_name.clone(), backend.service_tier.clone());
        clients.push((cred_name, client));
        credentials.push(aws_cred);
    }

    let pool = crate::services::CredentialPool::new(credentials, pool_config);
    tracing::info!(
        count = clients.len(),
        strategy = %pool.strategy(),
        "Bedrock service initialized with credential pool"
    );
    Ok(Some(BedrockService::with_pool(
        clients,
        pool,
        service_tiers,
    )))
}

/// Initialize Gemini pool from the backends table.
///
/// Creates one GeminiService per backend record, wrapped in a CredentialPool.
async fn init_gemini_from_backends(
    database: &Arc<dyn crate::database::traits::DatabaseService>,
    encryptor: &Encryptor,
) -> Result<Option<Arc<CredentialPool<BackendInstance<GeminiService>>>>> {
    let backends = database.backends().list_enabled_backends().await?;

    let gemini_backends: Vec<_> = backends
        .into_iter()
        .filter(|b| b.backend_type == "gemini" && b.enabled)
        .collect();

    if gemini_backends.is_empty() {
        return Ok(None);
    }

    let mut instances: Vec<BackendInstance<GeminiService>> = Vec::new();
    let mut pool_config = PoolConfig::default();

    for (i, backend) in gemini_backends.iter().enumerate() {
        let decrypted_config = encryptor.decrypt(&backend.config).map_err(|e| {
            anyhow::anyhow!("Failed to decrypt config for '{}': {}", backend.name, e)
        })?;
        let cfg: GeminiBackendConfig = serde_json::from_str(&decrypted_config)
            .map_err(|e| anyhow::anyhow!("Invalid gemini config for '{}': {}", backend.name, e))?;

        if cfg.api_keys.is_empty() {
            continue;
        }

        if i == 0 {
            pool_config = PoolConfig {
                strategy: LoadBalanceStrategy::parse_str(&backend.strategy),
                max_failures: backend.max_failures as u32,
                retry_after_secs: backend.retry_after_secs as u64,
            };
        }

        let key_count = cfg.api_keys.len();

        // Create independent GeminiService for this backend
        let mut gemini_config = GeminiConfig::with_keys(cfg.api_keys);
        if let Some(url) = cfg.base_url {
            gemini_config = gemini_config.with_base_url(url);
        }
        gemini_config = gemini_config.with_timeout(cfg.timeout_seconds);

        // Use the backend's own pool config for the internal key pool
        let internal_pool_config = PoolConfig {
            strategy: LoadBalanceStrategy::parse_str(&backend.strategy),
            max_failures: backend.max_failures as u32,
            retry_after_secs: backend.retry_after_secs as u64,
        };

        match GeminiService::with_pool_config(gemini_config, internal_pool_config) {
            Ok(svc) => {
                tracing::info!(name = %backend.name, key_count = key_count, "Created Gemini service instance");
                instances.push(BackendInstance::new(
                    &backend.name,
                    svc,
                    backend.weight as u32,
                    backend.service_tier.clone(),
                ));
            }
            Err(e) => {
                tracing::warn!(name = %backend.name, error = %e, "Failed to create Gemini service");
            }
        }
    }

    if instances.is_empty() {
        return Ok(None);
    }

    let pool = CredentialPool::new(instances, pool_config);
    Ok(Some(Arc::new(pool)))
}

/// Initialize a passthrough pool from the backends table.
///
/// Creates one PassthroughService per backend record, wrapped in a CredentialPool.
async fn init_passthrough_from_backends(
    database: &Arc<dyn crate::database::traits::DatabaseService>,
    backend_type_name: &str,
    target: PassthroughTarget,
    encryptor: &Encryptor,
) -> anyhow::Result<Option<Arc<CredentialPool<BackendInstance<PassthroughService>>>>> {
    let backends = database.backends().list_enabled_backends().await?;

    let matching_backends: Vec<_> = backends
        .into_iter()
        .filter(|b| b.backend_type == backend_type_name && b.enabled)
        .collect();

    if matching_backends.is_empty() {
        return Ok(None);
    }

    let mut instances: Vec<BackendInstance<PassthroughService>> = Vec::new();
    let mut pool_config = PoolConfig::default();

    for (i, backend) in matching_backends.iter().enumerate() {
        let decrypted_config = encryptor.decrypt(&backend.config).map_err(|e| {
            anyhow::anyhow!("Failed to decrypt config for '{}': {}", backend.name, e)
        })?;

        if i == 0 {
            pool_config = PoolConfig {
                strategy: LoadBalanceStrategy::parse_str(&backend.strategy),
                max_failures: backend.max_failures as u32,
                retry_after_secs: backend.retry_after_secs as u64,
            };
        }

        let internal_pool_config = PoolConfig {
            strategy: LoadBalanceStrategy::parse_str(&backend.strategy),
            max_failures: backend.max_failures as u32,
            retry_after_secs: backend.retry_after_secs as u64,
        };

        match target {
            PassthroughTarget::Anthropic => {
                let cfg: AnthropicBackendConfig =
                    serde_json::from_str(&decrypted_config).map_err(|e| {
                        anyhow::anyhow!(
                            "Invalid {} config for '{}': {}",
                            backend_type_name,
                            backend.name,
                            e
                        )
                    })?;

                if cfg.api_keys.is_empty() {
                    continue;
                }

                let key_count = cfg.api_keys.len();
                let config = PassthroughConfig {
                    api_keys: cfg.api_keys,
                    base_url: cfg.base_url,
                    organization: None,
                    timeout_seconds: cfg.timeout_seconds,
                    target: PassthroughTarget::Anthropic,
                };

                match PassthroughService::with_pool_config(config, internal_pool_config) {
                    Ok(svc) => {
                        tracing::info!(
                            name = %backend.name,
                            key_count = key_count,
                            "Created Anthropic passthrough service instance"
                        );
                        instances.push(BackendInstance::new(
                            &backend.name,
                            svc,
                            backend.weight as u32,
                            backend.service_tier.clone(),
                        ));
                    }
                    Err(e) => {
                        tracing::warn!(name = %backend.name, error = %e, "Failed to create Anthropic passthrough service");
                    }
                }
            }
            PassthroughTarget::OpenAI => {
                let cfg: OpenAIBackendConfig =
                    serde_json::from_str(&decrypted_config).map_err(|e| {
                        anyhow::anyhow!(
                            "Invalid {} config for '{}': {}",
                            backend_type_name,
                            backend.name,
                            e
                        )
                    })?;

                if cfg.api_keys.is_empty() {
                    continue;
                }

                let key_count = cfg.api_keys.len();
                let config = PassthroughConfig {
                    api_keys: cfg.api_keys,
                    base_url: cfg.base_url,
                    organization: cfg.organization,
                    timeout_seconds: cfg.timeout_seconds,
                    target: PassthroughTarget::OpenAI,
                };

                match PassthroughService::with_pool_config(config, internal_pool_config) {
                    Ok(svc) => {
                        tracing::info!(
                            name = %backend.name,
                            key_count = key_count,
                            "Created OpenAI passthrough service instance"
                        );
                        instances.push(BackendInstance::new(
                            &backend.name,
                            svc,
                            backend.weight as u32,
                            backend.service_tier.clone(),
                        ));
                    }
                    Err(e) => {
                        tracing::warn!(name = %backend.name, error = %e, "Failed to create OpenAI passthrough service");
                    }
                }
            }
        }
    }

    if instances.is_empty() {
        return Ok(None);
    }

    let pool = CredentialPool::new(instances, pool_config);
    Ok(Some(Arc::new(pool)))
}

/// Load prompt_cache mode from system settings at startup.
/// Falls back to Passthrough on any error or missing value.
async fn load_prompt_cache_mode(
    database: &Arc<dyn crate::database::traits::DatabaseService>,
) -> crate::converters::cache_transform::PromptCacheMode {
    use crate::converters::cache_transform::PromptCacheMode;
    let value = database
        .system_settings()
        .get_setting("prompt_cache")
        .await
        .ok()
        .flatten()
        .map(|s| s.value)
        .unwrap_or_default();
    PromptCacheMode::from_setting(&value)
}

/// Load rate_limit RPM from system settings at startup.
/// Returns None (disabled) when set to "disable" or on error.
/// Returns Some(rpm) for numeric values like "60", "100", "200", "500".
async fn load_rate_limit_rpm(
    database: &Arc<dyn crate::database::traits::DatabaseService>,
) -> Option<u32> {
    let value = database
        .system_settings()
        .get_setting("rate_limit")
        .await
        .ok()
        .flatten()
        .map(|s| s.value)
        .unwrap_or_default();
    match value.as_str() {
        "disable" | "" => None,
        v => v.parse::<u32>().ok(),
    }
}

/// Load a bool system setting at startup.
/// Returns `default` on any error or missing value.
/// The value is `false` only when explicitly set to the string `"false"`.
async fn load_bool_setting(
    database: &Arc<dyn crate::database::traits::DatabaseService>,
    key: &str,
    default: bool,
) -> bool {
    database
        .system_settings()
        .get_setting(key)
        .await
        .ok()
        .flatten()
        .map(|s| s.value != "false")
        .unwrap_or(default)
}

/// Load default capabilities from system settings at startup.
/// These are used for model mappings that have no explicit `capabilities` JSON.
async fn load_default_capabilities(
    database: &Arc<dyn crate::database::traits::DatabaseService>,
) -> crate::services::capabilities::ModelCapabilities {
    use crate::services::capabilities::{
        ModelCapabilities, SimpleCapability, ThinkingCapability, ThinkingStyle,
    };
    ModelCapabilities {
        thinking: ThinkingCapability {
            enabled: load_bool_setting(database, "enable_extended_thinking", true).await,
            style: ThinkingStyle::Claude,
        },
        document: SimpleCapability {
            enabled: load_bool_setting(database, "enable_document_support", true).await,
        },
        tool_use: SimpleCapability {
            enabled: load_bool_setting(database, "enable_tool_use", true).await,
        },
        ptc: SimpleCapability {
            enabled: load_bool_setting(database, "enable_ptc", false).await,
        },
    }
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
