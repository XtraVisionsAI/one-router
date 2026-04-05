//! Bedrock service for AWS Bedrock API interactions
//!
//! Modified to load config from the `backends` table instead of Settings.
//! The `get_bedrock_model_id` method now uses the ModelMappingService.

use aws_sdk_bedrockruntime::{
    operation::converse::{ConverseError, ConverseOutput},
    operation::converse_stream::ConverseStreamError,
    operation::invoke_model::InvokeModelError,
    operation::invoke_model_with_response_stream::InvokeModelWithResponseStreamError,
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
use aws_sdk_bedrockruntime::types::{PayloadPart, ResponseStream};

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
    /// Per-credential service tier config (keyed by credential name)
    service_tiers: std::collections::HashMap<String, Option<String>>,
}

impl BedrockService {
    /// Create a service with a credential pool.
    pub fn with_pool(
        clients: Vec<(String, BedrockRuntimeClient)>,
        pool: CredentialPool<AwsCredential>,
        service_tiers: std::collections::HashMap<String, Option<String>>,
    ) -> Self {
        Self {
            clients,
            pool: std::sync::Arc::new(pool),
            service_tiers,
        }
    }

    /// Get the service tier config for a credential.
    pub fn credential_service_tier(&self, name: &str) -> Option<&str> {
        self.service_tiers.get(name).and_then(|t| t.as_deref())
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

    pub fn pool_stats(&self) -> crate::services::backend_pool::PoolStats {
        self.pool.stats()
    }

    /// Get health status string for a specific credential by name.
    pub fn credential_health(&self, name: &str) -> Option<String> {
        self.pool.get_by_name(name).map(|c| {
            if !c.is_enabled() {
                "unhealthy".to_string()
            } else if c.failure_count() > 0 {
                format!("degraded (failures: {})", c.failure_count())
            } else {
                "healthy".to_string()
            }
        })
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
        if let Some(additional_fields) = request.additional_model_request_fields {
            converse_request = converse_request.additional_model_request_fields(additional_fields);
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

    /// Invoke a Claude model using InvokeModel API with native Anthropic JSON format.
    ///
    /// The `request` is serialized directly to Anthropic Messages API JSON format.
    /// `model_id` is the resolved Bedrock model ID (e.g. `us.anthropic.claude-sonnet-4-6-v1:0`).
    pub async fn invoke_model_messages(
        &self,
        request: &crate::schemas::anthropic::MessageRequest,
        model_id: &str,
    ) -> Result<crate::schemas::anthropic::MessageResponse, BedrockError> {
        let (cred_name, client) = self.get_client();
        let cred_name = cred_name.to_string();

        tracing::debug!(
            model_id = %model_id,
            credential = %cred_name,
            "Calling Bedrock InvokeModel API (Anthropic native format)"
        );

        let effective_tier = crate::services::service_tier::resolve_for_provider(
            self.credential_service_tier(&cred_name),
            request.service_tier.as_deref(),
            "bedrock",
        );
        let body = build_invoke_model_body(request, model_id, false, effective_tier.as_deref())?;

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

        let response_bytes = result.body().as_ref();
        serde_json::from_slice::<crate::schemas::anthropic::MessageResponse>(response_bytes)
            .map_err(|e| {
                BedrockError::Deserialization(format!("Failed to parse InvokeModel response: {e}"))
            })
    }

    /// Invoke a Claude model using InvokeModelWithResponseStream API with native Anthropic SSE.
    pub async fn invoke_model_messages_stream(
        &self,
        request: &crate::schemas::anthropic::MessageRequest,
        model_id: &str,
    ) -> Result<InvokeModelStreamResponse, BedrockError> {
        let (cred_name, client) = self.get_client();
        let cred_name = cred_name.to_string();

        tracing::debug!(
            model_id = %model_id,
            credential = %cred_name,
            "Calling Bedrock InvokeModelWithResponseStream API (Anthropic native format)"
        );

        let effective_tier = crate::services::service_tier::resolve_for_provider(
            self.credential_service_tier(&cred_name),
            request.service_tier.as_deref(),
            "bedrock",
        );
        let body = build_invoke_model_body(request, model_id, true, effective_tier.as_deref())?;

        let result = client
            .invoke_model_with_response_stream()
            .model_id(model_id)
            .body(Blob::new(body))
            .content_type("application/json")
            .accept("application/json")
            .send()
            .await
            .map_err(|e| {
                self.record_failure(&cred_name);
                BedrockError::from_invoke_model_stream_error(e)
            })?;

        Ok(InvokeModelStreamResponse {
            inner: result.body,
            credential_name: cred_name,
        })
    }

    /// Determine if a target model ID should use Converse API (true) or OpenAI Compat (false).
    /// Uses the resolved target_model_id (after model mapping), not the original request model.
    pub fn is_claude_model(target_model_id: &str) -> bool {
        let lower = target_model_id.to_lowercase();
        lower.contains("claude") || lower.contains("anthropic")
    }

    /// Call Bedrock OpenAI-compatible endpoint (Bedrock Mantle) for non-Claude models.
    /// Uses the same AWS credentials as Converse API but calls /v1/chat/completions.
    pub async fn chat_completions(
        &self,
        openai_request: &serde_json::Value,
        _target_model_id: &str,
    ) -> Result<serde_json::Value, BedrockError> {
        use aws_credential_types::Credentials as AwsCreds;
        use aws_sigv4::http_request::{sign, SignableBody, SignableRequest, SigningSettings};
        use aws_sigv4::sign::v4;

        // Gather credential info (clone owned data before any async work)
        let (cred_name, region, access_key_id, secret_access_key, session_token, has_access_key) = {
            let cred = self
                .pool
                .get_next()
                .ok_or_else(|| BedrockError::Unknown("No available credentials".to_string()))?;
            (
                cred.name().to_string(),
                cred.region().to_string(),
                cred.access_key_id().map(|s| s.to_string()),
                cred.secret_access_key().map(|s| s.to_string()),
                cred.session_token().map(|s| s.to_string()),
                cred.uses_access_key(),
            )
        };

        let url = format!("https://bedrock-runtime.{region}.amazonaws.com/v1/chat/completions");

        let body = serde_json::to_vec(openai_request)
            .map_err(|e| BedrockError::Serialization(e.to_string()))?;

        const BEDROCK_MAX_REQUEST_BYTES: usize = 4 * 1024 * 1024; // 4MB
        if body.len() > BEDROCK_MAX_REQUEST_BYTES {
            return Err(BedrockError::Serialization(format!(
                "Request body {} bytes exceeds Bedrock 4MB limit",
                body.len()
            )));
        }

        // Warn when credentials lack explicit access keys (profile/default creds will fail SigV4 signing)
        if !has_access_key {
            tracing::warn!(
                credential = %cred_name,
                "Credential does not have explicit access keys; Bedrock Mantle SigV4 signing may fail. Use access key credentials for non-Claude models."
            );
        }

        // Build AWS Identity for signing
        let aws_creds = AwsCreds::new(
            access_key_id.as_deref().unwrap_or(""),
            secret_access_key.as_deref().unwrap_or(""),
            session_token.clone(),
            None,
            "one-router",
        );
        let identity: aws_smithy_runtime_api::client::identity::Identity = aws_creds.into();

        let host = format!("bedrock-runtime.{region}.amazonaws.com");
        let signing_settings = SigningSettings::default();
        let now = std::time::SystemTime::now();

        let signing_params = v4::SigningParams::builder()
            .identity(&identity)
            .region(region.as_str())
            .name("bedrock")
            .time(now)
            .settings(signing_settings)
            .build()
            .map_err(|e| BedrockError::Unknown(e.to_string()))?
            .into();

        // Build the list of headers for signing (must include host and content-type)
        let headers_to_sign = [
            ("host", host.as_str()),
            ("content-type", "application/json"),
        ];
        let signable = SignableRequest::new(
            "POST",
            url.as_str(),
            headers_to_sign.iter().map(|(k, v)| (*k, *v)),
            SignableBody::Bytes(&body),
        )
        .map_err(|e| BedrockError::Unknown(e.to_string()))?;

        let (signing_instructions, _) = sign(signable, &signing_params)
            .map_err(|e| BedrockError::Unknown(e.to_string()))?
            .into_parts();

        // Apply signed headers to reqwest request
        let client = reqwest::Client::new();
        let mut req_builder = client
            .post(&url)
            .header("content-type", "application/json")
            .header("host", &host)
            .body(body);

        for (name, value) in signing_instructions.headers() {
            req_builder = req_builder.header(name, value);
        }

        tracing::debug!(
            credential = %cred_name,
            region = %region,
            url = %url,
            "Calling Bedrock OpenAI Compat endpoint (Mantle)"
        );

        let response = req_builder.send().await.map_err(|e| {
            self.record_failure(&cred_name);
            BedrockError::Unknown(e.to_string())
        })?;

        let status = response.status().as_u16();
        if status == 429 || status >= 500 {
            self.record_failure(&cred_name);
        } else {
            self.record_success(&cred_name);
        }

        if !response.status().is_success() {
            let text = response.text().await.unwrap_or_default();
            return Err(BedrockError::Unknown(format!(
                "Bedrock Mantle error {status}: {text}"
            )));
        }

        let json: serde_json::Value = response
            .json()
            .await
            .map_err(|e| BedrockError::Deserialization(e.to_string()))?;

        Ok(json)
    }

    /// Call Bedrock OpenAI-compatible endpoint with streaming for non-Claude models.
    /// Returns a stream of Anthropic SSE events converted from OpenAI SSE chunks.
    pub async fn chat_completions_stream(
        &self,
        openai_request: &serde_json::Value,
        _target_model_id: &str,
    ) -> Result<
        impl futures::Stream<Item = Result<axum::response::sse::Event, std::convert::Infallible>> + Send,
        BedrockError,
    > {
        use aws_credential_types::Credentials as AwsCreds;
        use aws_sigv4::http_request::{sign, SignableBody, SignableRequest, SigningSettings};
        use aws_sigv4::sign::v4;

        // Gather credential info (same as chat_completions)
        let (cred_name, region, access_key_id, secret_access_key, session_token, has_access_key) = {
            let cred = self
                .pool
                .get_next()
                .ok_or_else(|| BedrockError::Unknown("No available credentials".to_string()))?;
            (
                cred.name().to_string(),
                cred.region().to_string(),
                cred.access_key_id().map(|s| s.to_string()),
                cred.secret_access_key().map(|s| s.to_string()),
                cred.session_token().map(|s| s.to_string()),
                cred.uses_access_key(),
            )
        };

        // Force stream: true in the request
        let mut streaming_request = openai_request.clone();
        streaming_request["stream"] = serde_json::json!(true);

        let url = format!("https://bedrock-runtime.{region}.amazonaws.com/v1/chat/completions");
        let body = serde_json::to_vec(&streaming_request)
            .map_err(|e| BedrockError::Serialization(e.to_string()))?;

        if !has_access_key {
            tracing::warn!(
                credential = %cred_name,
                "Credential does not have explicit access keys; Bedrock Mantle SigV4 signing may fail."
            );
        }

        // SigV4 sign (same pattern as chat_completions)
        let aws_creds = AwsCreds::new(
            access_key_id.as_deref().unwrap_or(""),
            secret_access_key.as_deref().unwrap_or(""),
            session_token.clone(),
            None,
            "one-router",
        );
        let identity: aws_smithy_runtime_api::client::identity::Identity = aws_creds.into();
        let host = format!("bedrock-runtime.{region}.amazonaws.com");
        let signing_settings = SigningSettings::default();
        let signing_params = v4::SigningParams::builder()
            .identity(&identity)
            .region(region.as_str())
            .name("bedrock")
            .time(std::time::SystemTime::now())
            .settings(signing_settings)
            .build()
            .map_err(|e| BedrockError::Unknown(e.to_string()))?
            .into();

        let headers_to_sign = [
            ("host", host.as_str()),
            ("content-type", "application/json"),
        ];
        let signable = SignableRequest::new(
            "POST",
            url.as_str(),
            headers_to_sign.iter().map(|(k, v)| (*k, *v)),
            SignableBody::Bytes(&body),
        )
        .map_err(|e| BedrockError::Unknown(e.to_string()))?;

        let (signing_instructions, _) = sign(signable, &signing_params)
            .map_err(|e| BedrockError::Unknown(e.to_string()))?
            .into_parts();

        let client = reqwest::Client::new();
        let mut req_builder = client
            .post(&url)
            .header("content-type", "application/json")
            .header("host", &host)
            .body(body);
        for (name, value) in signing_instructions.headers() {
            req_builder = req_builder.header(name, value);
        }

        tracing::debug!(
            credential = %cred_name,
            region = %region,
            url = %url,
            "Calling Bedrock OpenAI Compat endpoint (Mantle) streaming"
        );

        let response = req_builder.send().await.map_err(|e| {
            self.record_failure(&cred_name);
            BedrockError::Unknown(e.to_string())
        })?;

        let status = response.status().as_u16();
        if !response.status().is_success() {
            self.record_failure(&cred_name);
            let text = response.text().await.unwrap_or_default();
            return Err(BedrockError::Unknown(format!(
                "Bedrock Mantle stream error {status}: {text}"
            )));
        }
        self.record_success(&cred_name);

        // Convert OpenAI SSE byte stream → Anthropic SSE events
        let byte_stream = response.bytes_stream();
        let sse_stream = openai_sse_to_anthropic_sse(byte_stream, cred_name);
        Ok(sse_stream)
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
// InvokeModel Stream Response (native Anthropic SSE)
// ============================================================================

/// Streaming response from Bedrock InvokeModelWithResponseStream.
/// The inner stream yields native Anthropic SSE events.
pub struct InvokeModelStreamResponse {
    inner: EventReceiver<ResponseStream, aws_sdk_bedrockruntime::types::error::ResponseStreamError>,
    pub credential_name: String,
}

impl InvokeModelStreamResponse {
    /// Convert into an SSE event stream compatible with Axum's `Sse`.
    ///
    /// Bedrock yields `PayloadPart` chunks whose bytes contain raw Anthropic SSE text
    /// (lines like `event: content_block_delta\ndata: {...}\n\n`).
    /// We buffer across chunks, parse complete SSE events, and forward them.
    pub fn into_sse_stream(
        self,
    ) -> Pin<
        Box<dyn Stream<Item = Result<axum::response::sse::Event, std::convert::Infallible>> + Send>,
    > {
        use axum::response::sse::Event;

        Box::pin(async_stream::stream! {
            let mut receiver = self.inner;
            let cred_name = self.credential_name;
            let mut buffer = String::new();

            loop {
                match receiver.recv().await {
                    Ok(Some(ResponseStream::Chunk(PayloadPart { bytes: Some(blob), .. }))) => {
                        buffer.push_str(&String::from_utf8_lossy(blob.as_ref()));

                        // Emit complete SSE events (delimited by \n\n)
                        while let Some(pos) = buffer.find("\n\n") {
                            let event_str = buffer[..pos].to_string();
                            buffer = buffer[pos + 2..].to_string();

                            let mut event_type: Option<String> = None;
                            let mut data: Option<String> = None;

                            for line in event_str.lines() {
                                if let Some(v) = line.strip_prefix("event: ") {
                                    event_type = Some(v.to_string());
                                } else if let Some(v) = line.strip_prefix("data: ") {
                                    data = Some(v.to_string());
                                }
                            }

                            if let Some(data_str) = data {
                                let mut ev = Event::default().data(data_str);
                                if let Some(et) = event_type {
                                    ev = ev.event(et);
                                }
                                yield Ok(ev);
                            }
                        }
                    }
                    Ok(Some(ResponseStream::Chunk(PayloadPart { bytes: None, .. }))) => {
                        // Empty chunk, skip
                    }
                    Ok(Some(_)) | Ok(None) => break,
                    Err(e) => {
                        tracing::warn!(
                            error = %e,
                            credential = %cred_name,
                            "InvokeModel stream error"
                        );
                        break;
                    }
                }
            }
        })
    }

    /// Variant of `into_sse_stream` that yields raw `(event_type, data)` pairs
    /// instead of `axum::sse::Event`. Useful when the caller needs to re-process
    /// the Anthropic SSE events (e.g. convert to OpenAI SSE format).
    pub fn into_event_pairs(self) -> Pin<Box<dyn Stream<Item = (String, String)> + Send>> {
        Box::pin(async_stream::stream! {
            let mut receiver = self.inner;
            let cred_name = self.credential_name;
            let mut buffer = String::new();

            loop {
                match receiver.recv().await {
                    Ok(Some(ResponseStream::Chunk(PayloadPart { bytes: Some(blob), .. }))) => {
                        buffer.push_str(&String::from_utf8_lossy(blob.as_ref()));

                        while let Some(pos) = buffer.find("\n\n") {
                            let event_str = buffer[..pos].to_string();
                            buffer = buffer[pos + 2..].to_string();

                            let mut event_type = String::new();
                            let mut data = String::new();

                            for line in event_str.lines() {
                                if let Some(v) = line.strip_prefix("event: ") {
                                    event_type = v.to_string();
                                } else if let Some(v) = line.strip_prefix("data: ") {
                                    data = v.to_string();
                                }
                            }

                            if !data.is_empty() {
                                yield (event_type, data);
                            }
                        }
                    }
                    Ok(Some(ResponseStream::Chunk(PayloadPart { bytes: None, .. }))) => {}
                    Ok(Some(_)) | Ok(None) => break,
                    Err(e) => {
                        tracing::warn!(
                            error = %e,
                            credential = %cred_name,
                            "InvokeModel stream error"
                        );
                        break;
                    }
                }
            }
        })
    }
}
// ============================================================================

/// Serialize a `MessageRequest` to Anthropic-native JSON for Bedrock InvokeModel.
///
/// - Replaces `model` with the resolved Bedrock `model_id`.
/// - Removes `stream` (InvokeModel doesn't accept this field).
/// - Removes `container` (PTC field, not recognized by Bedrock).
/// - Sets or removes `service_tier` based on the resolved effective tier.
fn build_invoke_model_body(
    request: &crate::schemas::anthropic::MessageRequest,
    model_id: &str,
    _streaming: bool,
    effective_service_tier: Option<&str>,
) -> Result<Vec<u8>, BedrockError> {
    let mut body =
        serde_json::to_value(request).map_err(|e| BedrockError::Serialization(e.to_string()))?;

    if let Some(obj) = body.as_object_mut() {
        // Replace model with the resolved Bedrock model ID
        obj.insert("model".to_string(), serde_json::json!(model_id));
        // Remove fields that Bedrock InvokeModel does not recognize
        obj.remove("stream");
        obj.remove("container");

        // Set or remove service_tier based on backend config
        if let Some(tier) = effective_service_tier {
            obj.insert("service_tier".to_string(), serde_json::json!(tier));
        } else {
            obj.remove("service_tier");
        }

        // Bedrock requires tool description to be non-empty (min length 1).
        // Fill empty descriptions with a placeholder to avoid validation errors.
        if let Some(serde_json::Value::Array(tools)) = obj.get_mut("tools") {
            for tool in tools.iter_mut() {
                if let Some(tool_obj) = tool.as_object_mut() {
                    match tool_obj.get("description") {
                        Some(serde_json::Value::String(s)) if s.is_empty() => {
                            tool_obj.insert("description".to_string(), serde_json::json!("-"));
                        }
                        None => {
                            tool_obj.insert("description".to_string(), serde_json::json!("-"));
                        }
                        _ => {}
                    }
                }
            }
        }
    }

    serde_json::to_vec(&body).map_err(|e| BedrockError::Serialization(e.to_string()))
}

// ============================================================================
// Streaming Response Types (Converse API)
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
// OpenAI SSE → Anthropic SSE converter (for Bedrock Mantle)
// ============================================================================

/// Convert an OpenAI SSE byte stream from Bedrock Mantle into Anthropic SSE events.
fn openai_sse_to_anthropic_sse(
    byte_stream: impl futures::Stream<Item = Result<bytes::Bytes, reqwest::Error>> + Send + 'static,
    cred_name: String,
) -> impl futures::Stream<Item = Result<axum::response::sse::Event, std::convert::Infallible>> + Send
{
    use axum::response::sse::Event;
    use futures::StreamExt;

    async_stream::stream! {
        let message_id = format!("msg_{}", uuid::Uuid::new_v4().to_string().replace('-', ""));
        let mut buffer = String::new();
        let mut text_block_started = false;
        // tool_block_ids: ordered list of tool call IDs seen so far (index = block_index - 1)
        let mut tool_block_ids: Vec<String> = Vec::new();
        let mut input_tokens: i32 = 0;
        let mut output_tokens: i32 = 0;
        let mut stop_reason = "end_turn".to_string();

        // Emit message_start
        yield Ok(Event::default().event("message_start").data(
            serde_json::json!({
                "type": "message_start",
                "message": {
                    "id": message_id,
                    "type": "message",
                    "role": "assistant",
                    "content": [],
                    "model": "",
                    "stop_reason": null,
                    "stop_sequence": null,
                    "usage": {"input_tokens": 0, "output_tokens": 0}
                }
            }).to_string()
        ));
        yield Ok(Event::default().event("ping").data(r#"{"type":"ping"}"#));

        let mut pinned = std::pin::pin!(byte_stream);
        'outer: while let Some(chunk_result) = pinned.next().await {
            let chunk = match chunk_result {
                Ok(b) => b,
                Err(e) => {
                    tracing::warn!(error = %e, credential = %cred_name, "Mantle stream chunk error");
                    break;
                }
            };
            buffer.push_str(&String::from_utf8_lossy(&chunk));

            // Process complete lines from buffer
            while let Some(newline_pos) = buffer.find('\n') {
                let line = buffer[..newline_pos].trim_end_matches('\r').to_string();
                buffer = buffer[newline_pos + 1..].to_string();

                if line.is_empty() || !line.starts_with("data: ") {
                    continue;
                }

                let data = &line["data: ".len()..];
                if data == "[DONE]" {
                    break 'outer;
                }

                let chunk_json: serde_json::Value = match serde_json::from_str(data) {
                    Ok(v) => v,
                    Err(_) => continue,
                };

                // Extract usage if present (typically in the last chunk)
                if let Some(usage) = chunk_json.get("usage") {
                    input_tokens = usage["prompt_tokens"].as_i64().unwrap_or(0) as i32;
                    output_tokens = usage["completion_tokens"].as_i64().unwrap_or(0) as i32;
                }

                let choices = match chunk_json["choices"].as_array() {
                    Some(c) if !c.is_empty() => c,
                    _ => continue,
                };
                let choice = &choices[0];
                let delta = &choice["delta"];

                // finish_reason
                if let Some(fr) = choice["finish_reason"].as_str() {
                    stop_reason = match fr {
                        "tool_calls" => "tool_use".to_string(),
                        "length" => "max_tokens".to_string(),
                        _ => "end_turn".to_string(),
                    };
                }

                // text content
                if let Some(text) = delta["content"].as_str() {
                    if !text.is_empty() {
                        if !text_block_started {
                            text_block_started = true;
                            yield Ok(Event::default().event("content_block_start").data(
                                serde_json::json!({
                                    "type": "content_block_start",
                                    "index": 0,
                                    "content_block": {"type": "text", "text": ""}
                                })
                                .to_string(),
                            ));
                        }
                        yield Ok(Event::default().event("content_block_delta").data(
                            serde_json::json!({
                                "type": "content_block_delta",
                                "index": 0,
                                "delta": {"type": "text_delta", "text": text}
                            })
                            .to_string(),
                        ));
                    }
                }

                // tool calls
                if let Some(tool_calls) = delta["tool_calls"].as_array() {
                    for tc in tool_calls {
                        let tc_index = tc["index"].as_u64().unwrap_or(0) as usize;
                        // block_index: text block is 0, tool blocks start at 1
                        let block_index = tc_index + 1;

                        if let Some(id) = tc["id"].as_str() {
                            // New tool call — open a content block
                            let name = tc["function"]["name"].as_str().unwrap_or("").to_string();
                            tool_block_ids.push(id.to_string());
                            yield Ok(Event::default().event("content_block_start").data(
                                serde_json::json!({
                                    "type": "content_block_start",
                                    "index": block_index,
                                    "content_block": {
                                        "type": "tool_use",
                                        "id": id,
                                        "name": name,
                                        "input": {}
                                    }
                                })
                                .to_string(),
                            ));
                        }
                        if let Some(args) = tc["function"]["arguments"].as_str() {
                            if !args.is_empty() {
                                yield Ok(Event::default().event("content_block_delta").data(
                                    serde_json::json!({
                                        "type": "content_block_delta",
                                        "index": block_index,
                                        "delta": {"type": "input_json_delta", "partial_json": args}
                                    })
                                    .to_string(),
                                ));
                            }
                        }
                    }
                }
            }
        }

        // Close open content blocks
        if text_block_started {
            yield Ok(Event::default().event("content_block_stop").data(
                serde_json::json!({"type": "content_block_stop", "index": 0}).to_string()
            ));
        }
        for (i, _id) in tool_block_ids.iter().enumerate() {
            yield Ok(Event::default().event("content_block_stop").data(
                serde_json::json!({"type": "content_block_stop", "index": i + 1}).to_string()
            ));
        }

        // message_delta
        yield Ok(Event::default().event("message_delta").data(
            serde_json::json!({
                "type": "message_delta",
                "delta": {"stop_reason": stop_reason, "stop_sequence": null},
                "usage": {"output_tokens": output_tokens}
            }).to_string()
        ));

        // message_stop
        yield Ok(Event::default().event("message_stop").data(r#"{"type":"message_stop"}"#));

        let _ = input_tokens; // suppress unused warning — available for future usage tracking
    }
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
                    _ => BedrockError::Unknown(format!("{error:?}")),
                }
            }
            _ => BedrockError::Unknown(format!("{err:?}")),
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
                    _ => BedrockError::Unknown(format!("{error:?}")),
                }
            }
            _ => BedrockError::Unknown(format!("{err:?}")),
        }
    }

    pub fn from_invoke_model_stream_error<R>(
        err: SdkError<InvokeModelWithResponseStreamError, R>,
    ) -> Self
    where
        R: std::fmt::Debug,
    {
        match &err {
            SdkError::ServiceError(service_err) => {
                let error = service_err.err();
                match error {
                    InvokeModelWithResponseStreamError::ThrottlingException(e) => {
                        BedrockError::Throttled(e.message().unwrap_or("Rate limited").to_string())
                    }
                    InvokeModelWithResponseStreamError::ValidationException(e) => {
                        BedrockError::ValidationError(
                            e.message().unwrap_or("Validation failed").to_string(),
                        )
                    }
                    InvokeModelWithResponseStreamError::ModelNotReadyException(e) => {
                        BedrockError::ServiceUnavailable(
                            e.message().unwrap_or("Model not ready").to_string(),
                        )
                    }
                    InvokeModelWithResponseStreamError::ModelTimeoutException(e) => {
                        BedrockError::ServiceUnavailable(
                            e.message().unwrap_or("Model timeout").to_string(),
                        )
                    }
                    InvokeModelWithResponseStreamError::InternalServerException(e) => {
                        BedrockError::InternalError(
                            e.message().unwrap_or("Internal server error").to_string(),
                        )
                    }
                    InvokeModelWithResponseStreamError::AccessDeniedException(e) => {
                        BedrockError::AccessDenied(
                            e.message().unwrap_or("Access denied").to_string(),
                        )
                    }
                    InvokeModelWithResponseStreamError::ResourceNotFoundException(e) => {
                        BedrockError::ModelNotFound(
                            e.message().unwrap_or("Resource not found").to_string(),
                        )
                    }
                    InvokeModelWithResponseStreamError::ServiceUnavailableException(e) => {
                        BedrockError::ServiceUnavailable(
                            e.message().unwrap_or("Service unavailable").to_string(),
                        )
                    }
                    InvokeModelWithResponseStreamError::ModelErrorException(e) => {
                        BedrockError::ApiError {
                            message: e.message().unwrap_or("Model error").to_string(),
                            error_type: BedrockErrorType::Server,
                            is_retryable: true,
                        }
                    }
                    _ => BedrockError::Unknown(format!("{error:?}")),
                }
            }
            _ => BedrockError::Unknown(format!("{err:?}")),
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
                    _ => BedrockError::Unknown(format!("{error:?}")),
                }
            }
            _ => BedrockError::Unknown(format!("{err:?}")),
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

// ============================================================================
// Tests
// ============================================================================

#[cfg(test)]
mod tests {
    use super::BedrockService;

    #[test]
    fn test_is_claude_model_claude() {
        assert!(BedrockService::is_claude_model(
            "us.anthropic.claude-sonnet-4-6-v1:0"
        ));
        assert!(BedrockService::is_claude_model(
            "anthropic.claude-3-haiku-20240307-v1:0"
        ));
        assert!(BedrockService::is_claude_model(
            "global.anthropic.claude-opus-4-6-v1"
        ));
    }

    #[test]
    fn test_is_claude_model_non_claude() {
        assert!(!BedrockService::is_claude_model(
            "us.amazon.qwen3-235b-instruct-v1:0"
        ));
        assert!(!BedrockService::is_claude_model("deepseek-r1"));
        assert!(!BedrockService::is_claude_model("amazon.nova-pro-v1:0"));
    }

    #[test]
    fn test_is_claude_model_determines_mantle_routing() {
        // Non-Claude models should use Mantle (and now support streaming)
        assert!(!BedrockService::is_claude_model(
            "us.amazon.qwen3-235b-instruct-v1:0"
        ));
        assert!(!BedrockService::is_claude_model("deepseek-r1"));
        // Claude models use Converse API
        assert!(BedrockService::is_claude_model(
            "us.anthropic.claude-sonnet-4-6-v1:0"
        ));
    }
}
