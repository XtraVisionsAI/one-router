//! POST /v1/embeddings — OpenAI-compatible embedding endpoint backed by AWS Bedrock
//!
//! Supports three Bedrock embedding model families:
//! - `cohere.embed-*`      (v2 and v3 variants, batch inference)
//! - `amazon.titan-embed-*` (single-text inference)
//! - `amazon.nova-*embed*`  (single-text inference with taskType)

use axum::{extract::State, http::StatusCode, response::IntoResponse, Json};
use futures::stream::{self, StreamExt};
use serde_json::json;
use std::time::Instant;
use uuid::Uuid;

pub use crate::schemas::embeddings::EmbeddingRequest;
use crate::schemas::embeddings::{EmbeddingObject, EmbeddingResponse, EmbeddingUsage};
use crate::server::state::AppState;
use crate::utils::tokens::estimate_tokens;

use super::chat_completions::OpenAIApiError;

// ============================================================================
// Handler
// ============================================================================

/// POST /v1/embeddings
pub async fn create_embeddings(
    State(state): State<AppState>,
    Json(request): Json<EmbeddingRequest>,
) -> Result<impl IntoResponse, OpenAIApiError> {
    let start_time = Instant::now();
    let request_id = Uuid::new_v4().to_string();

    // Resolve model via model mapping
    let resolved = state
        .model_mapping
        .resolve(&request.model)
        .await
        .map_err(|_| {
            OpenAIApiError::bad_request(format!(
                "Model '{}' is not supported. Check model_mappings configuration.",
                request.model
            ))
        })?;

    // Only Bedrock is supported for embeddings
    if !resolved.provider.is_empty() && resolved.provider != "bedrock" {
        return Err(OpenAIApiError::bad_request(format!(
            "Provider '{}' is not supported for /v1/embeddings. Only Bedrock is supported.",
            resolved.provider
        )));
    }

    let bedrock = state.bedrock.as_ref().ok_or_else(|| {
        OpenAIApiError::internal_error(
            "Bedrock backend is not configured. Add a 'bedrock' entry to the backends table.",
        )
    })?;

    let model_id = resolved.target_model_id.as_str();
    let texts = request.input.into_texts();

    tracing::info!(
        request_id = %request_id,
        model = %request.model,
        bedrock_model = %model_id,
        text_count = texts.len(),
        "Routing embedding request to Bedrock"
    );

    let (embeddings, total_tokens) = if model_id.starts_with("cohere.embed-") {
        embed_cohere(bedrock, model_id, &texts).await?
    } else if model_id.starts_with("amazon.titan-embed-") {
        embed_titan(bedrock, model_id, &texts).await?
    } else if model_id.contains("nova") && model_id.contains("embed") {
        embed_nova(bedrock, model_id, &texts).await?
    } else {
        return Err(OpenAIApiError::bad_request(format!(
            "Model '{model_id}' is not a supported Bedrock embedding model."
        )));
    };

    let data: Vec<EmbeddingObject> = embeddings
        .into_iter()
        .enumerate()
        .map(|(index, embedding)| EmbeddingObject {
            object: "embedding".to_string(),
            embedding,
            index,
        })
        .collect();

    let response = EmbeddingResponse {
        object: "list".to_string(),
        model: request.model.clone(),
        usage: EmbeddingUsage {
            prompt_tokens: total_tokens,
            total_tokens,
        },
        data,
    };

    let duration_ms = start_time.elapsed().as_millis();
    tracing::info!(
        request_id = %request_id,
        model = %request.model,
        total_tokens = total_tokens,
        duration_ms = duration_ms,
        "Embedding request completed"
    );

    Ok((StatusCode::OK, Json(response)))
}

// ============================================================================
// Cohere embed (batch)
// ============================================================================

async fn embed_cohere(
    bedrock: &std::sync::Arc<crate::services::BedrockService>,
    model_id: &str,
    texts: &[String],
) -> Result<(Vec<Vec<f32>>, u32), OpenAIApiError> {
    let is_v3 = model_id.contains("v3") || model_id.contains("-v3");

    let body = if is_v3 {
        json!({
            "texts": texts,
            "truncate": "END",
            "input_type": "search_document",
            "embedding_types": ["float"]
        })
    } else {
        json!({
            "texts": texts,
            "truncate": "END"
        })
    };

    let body_bytes = serde_json::to_vec(&body)
        .map_err(|e| OpenAIApiError::internal_error(format!("Serialization error: {e}")))?;

    let response_bytes = bedrock
        .invoke_model(model_id, body_bytes)
        .await
        .map_err(|e| OpenAIApiError::from_bedrock_error(&e))?;

    let response: serde_json::Value = serde_json::from_slice(&response_bytes).map_err(|e| {
        OpenAIApiError::internal_error(format!("Failed to parse Cohere response: {e}"))
    })?;

    // Cohere v3 returns embeddings under response["embeddings"]["float"]
    // Cohere v2 returns embeddings under response["embeddings"]
    let embeddings_value = if is_v3 {
        response["embeddings"]["float"].clone()
    } else {
        response["embeddings"].clone()
    };

    let embeddings: Vec<Vec<f32>> = serde_json::from_value(embeddings_value).map_err(|e| {
        OpenAIApiError::internal_error(format!("Failed to parse Cohere embeddings: {e}"))
    })?;

    // Estimate token count (Cohere doesn't always return token counts)
    let total_tokens: u32 = texts.iter().map(|t| estimate_tokens(t)).sum();

    Ok((embeddings, total_tokens))
}

// ============================================================================
// Amazon Titan embed (per-text)
// ============================================================================

async fn embed_titan(
    bedrock: &std::sync::Arc<crate::services::BedrockService>,
    model_id: &str,
    texts: &[String],
) -> Result<(Vec<Vec<f32>>, u32), OpenAIApiError> {
    let bedrock = bedrock.clone();
    let model_id = model_id.to_string();

    let results: Vec<Result<(Vec<f32>, u32), OpenAIApiError>> = stream::iter(texts.to_vec())
        .map(|text| {
            let bedrock = bedrock.clone();
            let model_id = model_id.clone();
            async move {
                let body = json!({ "inputText": text });
                let body_bytes = serde_json::to_vec(&body).map_err(|e| {
                    OpenAIApiError::internal_error(format!("Serialization error: {e}"))
                })?;

                let response_bytes = bedrock
                    .invoke_model(&model_id, body_bytes)
                    .await
                    .map_err(|e| OpenAIApiError::from_bedrock_error(&e))?;

                let response: serde_json::Value =
                    serde_json::from_slice(&response_bytes).map_err(|e| {
                        OpenAIApiError::internal_error(format!(
                            "Failed to parse Titan response: {e}"
                        ))
                    })?;

                let embedding: Vec<f32> = serde_json::from_value(response["embedding"].clone())
                    .map_err(|e| {
                        OpenAIApiError::internal_error(format!(
                            "Failed to parse Titan embedding: {e}"
                        ))
                    })?;

                let tokens = response["inputTextTokenCount"]
                    .as_u64()
                    .unwrap_or(estimate_tokens(&text) as u64) as u32;

                Ok((embedding, tokens))
            }
        })
        .buffered(5)
        .collect()
        .await;

    let mut embeddings = Vec::with_capacity(texts.len());
    let mut total_tokens: u32 = 0;

    for result in results {
        let (emb, tokens) = result?;
        embeddings.push(emb);
        total_tokens += tokens;
    }

    Ok((embeddings, total_tokens))
}

// ============================================================================
// Amazon Nova embed (per-text)
// ============================================================================

async fn embed_nova(
    bedrock: &std::sync::Arc<crate::services::BedrockService>,
    model_id: &str,
    texts: &[String],
) -> Result<(Vec<Vec<f32>>, u32), OpenAIApiError> {
    let bedrock = bedrock.clone();
    let model_id = model_id.to_string();

    let results: Vec<Result<Vec<f32>, OpenAIApiError>> = stream::iter(texts.to_vec())
        .map(|text| {
            let bedrock = bedrock.clone();
            let model_id = model_id.clone();
            async move {
                let body = json!({
                    "taskType": "SINGLE_EMBEDDING",
                    "singleEmbeddingParams": {
                        "inputText": text
                    }
                });
                let body_bytes = serde_json::to_vec(&body).map_err(|e| {
                    OpenAIApiError::internal_error(format!("Serialization error: {e}"))
                })?;

                let response_bytes = bedrock
                    .invoke_model(&model_id, body_bytes)
                    .await
                    .map_err(|e| OpenAIApiError::from_bedrock_error(&e))?;

                let response: serde_json::Value =
                    serde_json::from_slice(&response_bytes).map_err(|e| {
                        OpenAIApiError::internal_error(format!(
                            "Failed to parse Nova response: {e}"
                        ))
                    })?;

                let embedding: Vec<f32> = serde_json::from_value(response["embedding"].clone())
                    .map_err(|e| {
                        OpenAIApiError::internal_error(format!(
                            "Failed to parse Nova embedding: {e}"
                        ))
                    })?;

                Ok(embedding)
            }
        })
        .buffered(5)
        .collect()
        .await;

    let mut embeddings = Vec::with_capacity(texts.len());
    for result in results {
        embeddings.push(result?);
    }

    let total_tokens: u32 = texts.iter().map(|t| estimate_tokens(t)).sum();
    Ok((embeddings, total_tokens))
}
