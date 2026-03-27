//! POST /v1/rerank — Cohere-compatible rerank endpoint backed by AWS Bedrock
//!
//! Supports Bedrock Cohere rerank models (e.g. `cohere.rerank-v3-5:0`).

use axum::{extract::State, http::StatusCode, response::IntoResponse, Json};
use serde_json::json;
use std::time::Instant;
use uuid::Uuid;

use crate::schemas::rerank::{RerankRequest, RerankResponse, RerankResult};
use crate::server::state::AppState;

use super::chat_completions::OpenAIApiError;

// ============================================================================
// Handler
// ============================================================================

/// POST /v1/rerank
pub async fn create_rerank(
    State(state): State<AppState>,
    Json(request): Json<RerankRequest>,
) -> Result<impl IntoResponse, OpenAIApiError> {
    let start_time = Instant::now();
    let request_id = Uuid::new_v4().to_string();

    // Resolve model
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

    // Only Bedrock is supported for rerank
    if !resolved.provider.is_empty() && resolved.provider != "bedrock" {
        return Err(OpenAIApiError::bad_request(format!(
            "Provider '{}' is not supported for /v1/rerank. Only Bedrock is supported.",
            resolved.provider
        )));
    }

    let bedrock = state.bedrock.as_ref().ok_or_else(|| {
        OpenAIApiError::internal_error(
            "Bedrock backend is not configured. Add a 'bedrock' entry to the backends table.",
        )
    })?;

    let model_id = resolved.target_model_id.as_str();

    tracing::info!(
        request_id = %request_id,
        model = %request.model,
        bedrock_model = %model_id,
        doc_count = request.documents.len(),
        "Routing rerank request to Bedrock"
    );

    // Build Bedrock request body
    let mut body = json!({
        "api_version": 2,
        "query": request.query,
        "documents": request.documents,
    });

    if let Some(top_n) = request.top_n {
        body["top_n"] = json!(top_n);
    }
    if let Some(max_chunks) = request.max_chunks_per_doc {
        body["max_chunks_per_doc"] = json!(max_chunks);
    }

    let body_bytes = serde_json::to_vec(&body)
        .map_err(|e| OpenAIApiError::internal_error(format!("Serialization error: {e}")))?;

    let response_bytes = bedrock
        .invoke_model(model_id, body_bytes)
        .await
        .map_err(|e| OpenAIApiError::from_bedrock_error(&e))?;

    // Parse Bedrock response: { "results": [{ "index": N, "relevanceScore": F }] }
    let bedrock_response: serde_json::Value =
        serde_json::from_slice(&response_bytes).map_err(|e| {
            OpenAIApiError::internal_error(format!("Failed to parse rerank response: {e}"))
        })?;

    let raw_results = bedrock_response["results"]
        .as_array()
        .ok_or_else(|| OpenAIApiError::internal_error("Rerank response missing 'results' field"))?;

    let return_documents = request.return_documents.unwrap_or(false);

    let results: Vec<RerankResult> = raw_results
        .iter()
        .map(|r| {
            let index = r["index"].as_u64().unwrap_or(0) as usize;
            let relevance_score = r["relevanceScore"].as_f64().unwrap_or(0.0);
            let document = if return_documents {
                request.documents.get(index).cloned()
            } else {
                None
            };
            RerankResult {
                index,
                relevance_score,
                document,
            }
        })
        .collect();

    let duration_ms = start_time.elapsed().as_millis();
    tracing::info!(
        request_id = %request_id,
        model = %request.model,
        result_count = results.len(),
        duration_ms = duration_ms,
        "Rerank request completed"
    );

    let response = RerankResponse {
        id: request_id,
        results,
    };

    Ok((StatusCode::OK, Json(response)))
}
