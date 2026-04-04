//! Services module

pub mod backend_pool;
pub mod bedrock;
pub mod capabilities;
pub mod gemini;
pub mod model_mapping;
pub mod passthrough;
pub mod ptc;
pub mod usage_tracker;

pub use backend_pool::{
    AnthropicBackendConfig, ApiKeyCredential, AwsCredential, BedrockBackendConfig, Credential,
    CredentialHealth, CredentialPool, GeminiBackendConfig, LoadBalanceStrategy,
    OpenAIBackendConfig, PoolConfig, PoolSettings, PoolStats,
};
pub use bedrock::{
    BedrockError, BedrockService, BedrockStreamError, ConverseRequest, ConverseStreamResponse,
};
pub use capabilities::{ModelCapabilities, SimpleCapability, ThinkingCapability, ThinkingStyle};
pub use gemini::{GeminiConfig, GeminiService, GeminiServiceError, GeminiStream};
pub use model_mapping::{ModelMappingService, ModelNotFoundError, ResolvedModel};
pub use passthrough::{PassthroughConfig, PassthroughError, PassthroughService, PassthroughTarget};
pub use ptc::{
    ContainerInfo, ExecutionResult, PendingToolCall, PtcError, PtcHealthStatus, PtcResponse,
    PtcResult, PtcService, PtcSession, SandboxConfig, SandboxExecutor, SessionState,
};
pub use usage_tracker::UsageTracker;

pub mod web_tools;
pub use web_tools::{is_server_tool, split_tools, WebToolError};
