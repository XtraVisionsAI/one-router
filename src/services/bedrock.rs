//! Bedrock service for AWS Bedrock API interactions
//!
//! Modified to load config from the `backends` table instead of Settings.
//! The `get_bedrock_model_id` method now uses the ModelMappingService.

use aws_sdk_bedrockruntime::{
    operation::converse::{ConverseError, ConverseOutput},
    operation::converse_stream::ConverseStreamError,
    operation::invoke_model::InvokeModelError,
    primitives::Blob,
    types::{
        ConverseStreamOutput, InferenceConfiguration, Message as BedrockMessage,
        SystemContentBlock, ToolConfiguration,
    },
    Client as BedrockRuntimeClient,
};
use aws_smithy_runtime_api::client::result::SdkError;
use futures::Stream;
use std::pin::Pin;

use aws_sdk_bedrockruntime::primitives::event_stream::EventReceiver;
use aws_sdk_bedrockruntime::types::error::ConverseStreamOutputError;

use super::backend_pool::{AwsCredential, Credential, CredentialPool};

/// Service for interacting with AWS Bedrock API.
///
/// Supports single-client mode (backward compat) and multi-client mode
/// with CredentialPool for load balancing across multiple AWS credentials.
#[derive(Clone)]
pub struct BedrockService {
    /// Named clients: (credential_name, client)
    clients: Vec<(String, BedrockRuntimeClient)>,
    /// Credential pool for load balancing
    pool: std::sync::Arc<CredentialPool<AwsCredential>>,
}

impl BedrockService {
    /// Create a single-client service (backward compatible).
    pub fn new(client: BedrockRuntimeClient) -> Self {
        let cred = AwsCredential::default_credential("us-east-1", "default");
        let pool = CredentialPool::single(cred);
        Self {
            clients: vec![("default".to_string(), client)],
            pool: std::sync::Arc::new(pool),
        }
    }

    /// Create a multi-client service with a credential pool.
    pub fn with_pool(
        clients: Vec<(String, BedrockRuntimeClient)>,
        pool: CredentialPool<AwsCredential>,
    ) -> Self {
        Self {
            clients,
            pool: std::sync::Arc::new(pool),
        }
    }

    /// Get the next available client from the pool.
    fn get_client(&self) -> (&str, &BedrockRuntimeClient) {
        if self.clients.len() == 1 {
            let (name, client) = &self.clients[0];
            return (name.as_str(), client);
        }

        if let Some(cred) = self.pool.get_next() {
            let name = cred.name();
            if let Some((_, client)) = self.clients.iter().find(|(n, _)| n == name) {
                return (name, client);
            }
        }

        // Fallback to first client
        let (name, client) = &self.clients[0];
        (name.as_str(), client)
    }

    /// Record a successful request for a credential.
    pub fn record_success(&self, name: &str) {
        self.pool.record_success(name);
    }

    /// Record a failed request for a credential.
    pub fn record_failure(&self, name: &str) {
        self.pool.record_failure(name);
    }

    pub fn health_check(&self) -> bool {
        true
    }

    pub async fn converse(&self, request: ConverseRequest) -> Result<ConverseOutput, BedrockError> {
        let (cred_name, client) = self.get_client();
        let cred_name = cred_name.to_string();

        tracing::debug!(
            model_id = %request.model_id,
            message_count = request.messages.len(),
            credential = %cred_name,
            "Calling Bedrock Converse API"
        );

        let mut converse_request = client
            .converse()
            .model_id(&request.model_id)
            .set_messages(Some(request.messages));

        if let Some(system) = request.system {
            converse_request = converse_request.set_system(Some(system));
        }
        if let Some(inference_config) = request.inference_config {
            converse_request = converse_request.inference_config(inference_config);
        }
        if let Some(tool_config) = request.tool_config {
            converse_request = converse_request.tool_config(tool_config);
        }

        let result = converse_request.send().await.map_err(|e| {
            self.record_failure(&cred_name);
            BedrockError::from_converse_error(e)
        })?;

        self.record_success(&cred_name);
        Ok(result)
    }

    pub async fn converse_stream(
        &self,
        request: ConverseRequest,
    ) -> Result<ConverseStreamResponse, BedrockError> {
        let (cred_name, client) = self.get_client();
        let cred_name = cred_name.to_string();

        tracing::debug!(
            model_id = %request.model_id,
            message_count = request.messages.len(),
            credential = %cred_name,
            "Calling Bedrock ConverseStream API"
        );

        let mut converse_request = client
            .converse_stream()
            .model_id(&request.model_id)
            .set_messages(Some(request.messages));

        if let Some(system) = request.system {
            converse_request = converse_request.set_system(Some(system));
        }
        if let Some(inference_config) = request.inference_config {
            converse_request = converse_request.inference_config(inference_config);
        }
        if let Some(tool_config) = request.tool_config {
            converse_request = converse_request.tool_config(tool_config);
        }
        if let Some(additional_fields) = request.additional_model_request_fields {
            converse_request = converse_request.additional_model_request_fields(additional_fields);
        }

        let result = converse_request.send().await.map_err(|e| {
            self.record_failure(&cred_name);
            BedrockError::from_converse_stream_error(e)
        })?;

        // Note: success/failure for streaming is tracked by the caller
        Ok(ConverseStreamResponse {
            inner: result.stream,
            credential_name: cred_name,
        })
    }

    /// Invoke a model using the InvokeModel API (used for embeddings and rerank).
    pub async fn invoke_model(
        &self,
        model_id: &str,
        body: Vec<u8>,
    ) -> Result<Vec<u8>, BedrockError> {
        let (cred_name, client) = self.get_client();
        let cred_name = cred_name.to_string();

        tracing::debug!(
            model_id = %model_id,
            credential = %cred_name,
            "Calling Bedrock InvokeModel API"
        );

        let result = client
            .invoke_model()
            .model_id(model_id)
            .body(Blob::new(body))
            .content_type("application/json")
            .accept("application/json")
            .send()
            .await
            .map_err(|e| {
                self.record_failure(&cred_name);
                BedrockError::from_invoke_model_error(e)
            })?;

        self.record_success(&cred_name);
        Ok(result.body().as_ref().to_vec())
    }
}

// ============================================================================
// Request types
// ============================================================================

#[derive(Debug, Clone)]
pub struct ConverseRequest {
    pub model_id: String,
    pub messages: Vec<BedrockMessage>,
    pub system: Option<Vec<SystemContentBlock>>,
    pub inference_config: Option<InferenceConfiguration>,
    pub tool_config: Option<ToolConfiguration>,
    pub additional_model_request_fields: Option<aws_smithy_types::Document>,
}

impl ConverseRequest {
    pub fn new(model_id: impl Into<String>) -> Self {
        Self {
            model_id: model_id.into(),
            messages: Vec::new(),
            system: None,
            inference_config: None,
            tool_config: None,
            additional_model_request_fields: None,
        }
    }

    pub fn with_messages(mut self, messages: Vec<BedrockMessage>) -> Self {
        self.messages = messages;
        self
    }

    pub fn with_system(mut self, system: Vec<SystemContentBlock>) -> Self {
        self.system = Some(system);
        self
    }

    pub fn with_inference_config(mut self, config: InferenceConfiguration) -> Self {
        self.inference_config = Some(config);
        self
    }

    pub fn with_tool_config(mut self, config: ToolConfiguration) -> Self {
        self.tool_config = Some(config);
        self
    }

    pub fn with_additional_fields(mut self, fields: aws_smithy_types::Document) -> Self {
        self.additional_model_request_fields = Some(fields);
        self
    }
}

// ============================================================================
// Streaming Response Types
// ============================================================================

pub struct ConverseStreamResponse {
    inner: EventReceiver<ConverseStreamOutput, ConverseStreamOutputError>,
    pub credential_name: String,
}

impl ConverseStreamResponse {
    pub async fn recv(&mut self) -> Result<Option<ConverseStreamOutput>, BedrockStreamError> {
        match self.inner.recv().await {
            Ok(Some(event)) => Ok(Some(event)),
            Ok(None) => Ok(None),
            Err(e) => Err(BedrockStreamError::StreamError(e.to_string())),
        }
    }

    pub fn into_stream(
        self,
    ) -> Pin<Box<dyn Stream<Item = Result<ConverseStreamOutput, BedrockStreamError>> + Send>> {
        Box::pin(async_stream::stream! {
            let mut receiver = self.inner;
            loop {
                match receiver.recv().await {
                    Ok(Some(event)) => yield Ok(event),
                    Ok(None) => break,
                    Err(e) => {
                        yield Err(BedrockStreamError::StreamError(e.to_string()));
                        break;
                    }
                }
            }
        })
    }
}

#[derive(Debug, thiserror::Error)]
pub enum BedrockStreamError {
    #[error("Stream error: {0}")]
    StreamError(String),

    #[error("Event parse error: {0}")]
    ParseError(String),
}

// ============================================================================
// Error Types
// ============================================================================

#[derive(Debug, thiserror::Error)]
pub enum BedrockError {
    #[error("Bedrock API error: {message}")]
    ApiError {
        message: String,
        error_type: BedrockErrorType,
        is_retryable: bool,
    },
    #[error("Serialization error: {0}")]
    Serialization(String),
    #[error("Deserialization error: {0}")]
    Deserialization(String),
    #[error("Model not found: {0}")]
    ModelNotFound(String),
    #[error("Throttled: {0}")]
    Throttled(String),
    #[error("Validation error: {0}")]
    ValidationError(String),
    #[error("Service unavailable: {0}")]
    ServiceUnavailable(String),
    #[error("Access denied: {0}")]
    AccessDenied(String),
    #[error("Internal error: {0}")]
    InternalError(String),
    #[error("Unknown error: {0}")]
    Unknown(String),
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum BedrockErrorType {
    Client,
    Server,
    Throttling,
    Validation,
    Unknown,
}

impl BedrockError {
    pub fn from_converse_error<R>(err: SdkError<ConverseError, R>) -> Self
    where
        R: std::fmt::Debug,
    {
        match &err {
            SdkError::ServiceError(service_err) => {
                let error = service_err.err();
                match error {
                    ConverseError::ThrottlingException(e) => {
                        BedrockError::Throttled(e.message().unwrap_or("Rate limited").to_string())
                    }
                    ConverseError::ValidationException(e) => BedrockError::ValidationError(
                        e.message().unwrap_or("Validation failed").to_string(),
                    ),
                    ConverseError::ModelNotReadyException(e) => BedrockError::ServiceUnavailable(
                        e.message().unwrap_or("Model not ready").to_string(),
                    ),
                    ConverseError::ModelTimeoutException(e) => BedrockError::ServiceUnavailable(
                        e.message().unwrap_or("Model timeout").to_string(),
                    ),
                    ConverseError::InternalServerException(e) => BedrockError::InternalError(
                        e.message().unwrap_or("Internal server error").to_string(),
                    ),
                    ConverseError::AccessDeniedException(e) => BedrockError::AccessDenied(
                        e.message().unwrap_or("Access denied").to_string(),
                    ),
                    ConverseError::ResourceNotFoundException(e) => BedrockError::ModelNotFound(
                        e.message().unwrap_or("Resource not found").to_string(),
                    ),
                    _ => BedrockError::Unknown(format!("{:?}", error)),
                }
            }
            _ => BedrockError::Unknown(format!("{:?}", err)),
        }
    }

    pub fn from_converse_stream_error<R>(err: SdkError<ConverseStreamError, R>) -> Self
    where
        R: std::fmt::Debug,
    {
        match &err {
            SdkError::ServiceError(service_err) => {
                let error = service_err.err();
                match error {
                    ConverseStreamError::ThrottlingException(e) => {
                        BedrockError::Throttled(e.message().unwrap_or("Rate limited").to_string())
                    }
                    ConverseStreamError::ValidationException(e) => BedrockError::ValidationError(
                        e.message().unwrap_or("Validation failed").to_string(),
                    ),
                    ConverseStreamError::ModelNotReadyException(e) => {
                        BedrockError::ServiceUnavailable(
                            e.message().unwrap_or("Model not ready").to_string(),
                        )
                    }
                    ConverseStreamError::ModelTimeoutException(e) => {
                        BedrockError::ServiceUnavailable(
                            e.message().unwrap_or("Model timeout").to_string(),
                        )
                    }
                    ConverseStreamError::InternalServerException(e) => BedrockError::InternalError(
                        e.message().unwrap_or("Internal server error").to_string(),
                    ),
                    ConverseStreamError::AccessDeniedException(e) => BedrockError::AccessDenied(
                        e.message().unwrap_or("Access denied").to_string(),
                    ),
                    ConverseStreamError::ResourceNotFoundException(e) => {
                        BedrockError::ModelNotFound(
                            e.message().unwrap_or("Resource not found").to_string(),
                        )
                    }
                    ConverseStreamError::ServiceUnavailableException(e) => {
                        BedrockError::ServiceUnavailable(
                            e.message().unwrap_or("Service unavailable").to_string(),
                        )
                    }
                    ConverseStreamError::ModelErrorException(e) => BedrockError::ApiError {
                        message: e.message().unwrap_or("Model error").to_string(),
                        error_type: BedrockErrorType::Server,
                        is_retryable: true,
                    },
                    _ => BedrockError::Unknown(format!("{:?}", error)),
                }
            }
            _ => BedrockError::Unknown(format!("{:?}", err)),
        }
    }

    pub fn from_invoke_model_error<R>(err: SdkError<InvokeModelError, R>) -> Self
    where
        R: std::fmt::Debug,
    {
        match &err {
            SdkError::ServiceError(service_err) => {
                let error = service_err.err();
                match error {
                    InvokeModelError::ThrottlingException(e) => {
                        BedrockError::Throttled(e.message().unwrap_or("Rate limited").to_string())
                    }
                    InvokeModelError::ValidationException(e) => BedrockError::ValidationError(
                        e.message().unwrap_or("Validation failed").to_string(),
                    ),
                    InvokeModelError::ModelNotReadyException(e) => {
                        BedrockError::ServiceUnavailable(
                            e.message().unwrap_or("Model not ready").to_string(),
                        )
                    }
                    InvokeModelError::ModelTimeoutException(e) => BedrockError::ServiceUnavailable(
                        e.message().unwrap_or("Model timeout").to_string(),
                    ),
                    InvokeModelError::InternalServerException(e) => BedrockError::InternalError(
                        e.message().unwrap_or("Internal server error").to_string(),
                    ),
                    InvokeModelError::AccessDeniedException(e) => BedrockError::AccessDenied(
                        e.message().unwrap_or("Access denied").to_string(),
                    ),
                    InvokeModelError::ResourceNotFoundException(e) => BedrockError::ModelNotFound(
                        e.message().unwrap_or("Resource not found").to_string(),
                    ),
                    InvokeModelError::ServiceUnavailableException(e) => {
                        BedrockError::ServiceUnavailable(
                            e.message().unwrap_or("Service unavailable").to_string(),
                        )
                    }
                    InvokeModelError::ModelErrorException(e) => BedrockError::ApiError {
                        message: e.message().unwrap_or("Model error").to_string(),
                        error_type: BedrockErrorType::Server,
                        is_retryable: true,
                    },
                    _ => BedrockError::Unknown(format!("{:?}", error)),
                }
            }
            _ => BedrockError::Unknown(format!("{:?}", err)),
        }
    }

    pub fn is_retryable(&self) -> bool {
        matches!(
            self,
            BedrockError::Throttled(_)
                | BedrockError::ServiceUnavailable(_)
                | BedrockError::InternalError(_)
                | BedrockError::ApiError {
                    is_retryable: true,
                    ..
                }
        )
    }

    pub fn error_type(&self) -> BedrockErrorType {
        match self {
            BedrockError::Throttled(_) => BedrockErrorType::Throttling,
            BedrockError::ValidationError(_) => BedrockErrorType::Validation,
            BedrockError::ModelNotFound(_)
            | BedrockError::AccessDenied(_)
            | BedrockError::Serialization(_)
            | BedrockError::Deserialization(_) => BedrockErrorType::Client,
            BedrockError::ServiceUnavailable(_) | BedrockError::InternalError(_) => {
                BedrockErrorType::Server
            }
            BedrockError::ApiError { error_type, .. } => *error_type,
            BedrockError::Unknown(_) => BedrockErrorType::Unknown,
        }
    }
}
