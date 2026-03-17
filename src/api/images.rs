//! POST /v1/images/generations — OpenAI-compatible image generation endpoint
//!
//! Supports three backend providers:
//! - `openai`  — passthrough to OpenAI DALL-E (url or b64_json)
//! - `bedrock` — Stability AI SDXL / Amazon Nova Canvas / Titan Image (b64_json only)
//! - `gemini`  — gemini-2.0-flash-preview-image-generation (b64_json only)

use axum::{extract::State, http::StatusCode, response::IntoResponse, Json};
use serde_json::json;
use std::time::Instant;
use uuid::Uuid;

use crate::schemas::images::{
    ImageGenerationRequest, ImageGenerationResponse, ImageObject, ImageResponseFormat,
};
use crate::schemas::openai::current_timestamp;
use crate::server::state::AppState;

use super::chat_completions::OpenAIApiError;

// ============================================================================
// Handler
// ============================================================================

/// POST /v1/images/generations
pub async fn create_image(
    State(state): State<AppState>,
    Json(request): Json<ImageGenerationRequest>,
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

    let provider = resolved.provider.as_str();
    let target_model_id = resolved.target_model_id.clone();

    tracing::info!(
        request_id = %request_id,
        model = %request.model,
        target_model = %target_model_id,
        provider = %provider,
        "Routing image generation request"
    );

    let response = match provider {
        "openai" => handle_openai_images(&state, &request, &target_model_id).await?,
        "gemini" => handle_gemini_images(&state, &request, &target_model_id).await?,
        "bedrock" | "" => handle_bedrock_images(&state, &request, &target_model_id).await?,
        other => {
            return Err(OpenAIApiError::bad_request(format!(
                "Provider '{}' is not supported for /v1/images/generations. Supported: openai, bedrock, gemini.",
                other
            )));
        }
    };

    let duration_ms = start_time.elapsed().as_millis();
    tracing::info!(
        request_id = %request_id,
        images = response.data.len(),
        duration_ms = duration_ms,
        "Image generation request completed"
    );

    Ok((StatusCode::OK, Json(response)))
}

// ============================================================================
// OpenAI passthrough
// ============================================================================

async fn handle_openai_images(
    state: &AppState,
    request: &ImageGenerationRequest,
    target_model_id: &str,
) -> Result<ImageGenerationResponse, OpenAIApiError> {
    let svc = state.openai_service.as_ref().ok_or_else(|| {
        OpenAIApiError::internal_error(
            "OpenAI backend is not configured. Add an 'openai' entry to the backends table.",
        )
    })?;

    // Replace model with resolved target, forward everything else as-is
    let mut body = serde_json::to_value(request)
        .map_err(|e| OpenAIApiError::internal_error(format!("Serialization error: {}", e)))?;
    body["model"] = json!(target_model_id);

    let body_bytes = serde_json::to_vec(&body)
        .map_err(|e| OpenAIApiError::internal_error(format!("Serialization error: {}", e)))?;

    let (resp, cred_name) = svc
        .forward("/v1/images/generations", body_bytes, &[])
        .await
        .map_err(|e| OpenAIApiError::internal_error(format!("OpenAI request failed: {}", e)))?;

    let status = resp.status();
    let body_text = resp
        .text()
        .await
        .map_err(|e| OpenAIApiError::internal_error(format!("Failed to read response: {}", e)))?;

    if !status.is_success() {
        // Try to propagate the upstream error message
        if let Ok(val) = serde_json::from_str::<serde_json::Value>(&body_text) {
            let msg = val["error"]["message"]
                .as_str()
                .unwrap_or(&body_text)
                .to_string();
            return Err(OpenAIApiError {
                status: axum::http::StatusCode::from_u16(status.as_u16())
                    .unwrap_or(axum::http::StatusCode::INTERNAL_SERVER_ERROR),
                error: crate::schemas::openai::OpenAIErrorResponse::server_error(&msg),
            });
        }
        return Err(OpenAIApiError::internal_error(format!(
            "OpenAI returned status {}: {}",
            status, body_text
        )));
    }

    svc.record_success(&cred_name);

    serde_json::from_str(&body_text).map_err(|e| {
        OpenAIApiError::internal_error(format!("Failed to parse OpenAI image response: {}", e))
    })
}

// ============================================================================
// Gemini
// ============================================================================

async fn handle_gemini_images(
    state: &AppState,
    request: &ImageGenerationRequest,
    target_model_id: &str,
) -> Result<ImageGenerationResponse, OpenAIApiError> {
    // Gemini imagen does not support n > 1
    if request.n.unwrap_or(1) > 1 {
        return Err(OpenAIApiError::bad_request(
            "Gemini image generation does not support n > 1.",
        ));
    }

    // Bedrock/Gemini only return base64; reject url format requests
    if request.response_format == Some(ImageResponseFormat::Url) {
        return Err(OpenAIApiError::bad_request(
            "Gemini image generation only supports response_format=b64_json.",
        ));
    }

    let svc = state.gemini_service.as_ref().ok_or_else(|| {
        OpenAIApiError::internal_error(
            "Gemini backend is not configured. Add a 'gemini' entry to the backends table.",
        )
    })?;

    let body = json!({
        "contents": [{
            "role": "user",
            "parts": [{"text": request.prompt}]
        }],
        "generationConfig": {
            "responseModalities": ["IMAGE", "TEXT"]
        }
    });

    let response = svc
        .generate_content_raw(target_model_id, &body)
        .await
        .map_err(|e| {
            OpenAIApiError::internal_error(format!("Gemini image generation failed: {}", e))
        })?;

    // Extract inlineData parts from candidates[0].content.parts
    let parts = response["candidates"][0]["content"]["parts"]
        .as_array()
        .ok_or_else(|| {
            OpenAIApiError::internal_error("Unexpected Gemini response: missing candidates/parts")
        })?;

    let mut images = Vec::new();
    for part in parts {
        if let Some(inline_data) = part.get("inlineData") {
            if let Some(data) = inline_data["data"].as_str() {
                images.push(ImageObject {
                    url: None,
                    b64_json: Some(data.to_string()),
                    revised_prompt: None,
                });
            }
        }
    }

    if images.is_empty() {
        return Err(OpenAIApiError::internal_error(
            "Gemini returned no image data in response.",
        ));
    }

    Ok(ImageGenerationResponse {
        created: current_timestamp(),
        data: images,
    })
}

// ============================================================================
// Bedrock
// ============================================================================

async fn handle_bedrock_images(
    state: &AppState,
    request: &ImageGenerationRequest,
    target_model_id: &str,
) -> Result<ImageGenerationResponse, OpenAIApiError> {
    // Bedrock only returns base64; reject url format requests
    if request.response_format == Some(ImageResponseFormat::Url) {
        return Err(OpenAIApiError::bad_request(
            "Bedrock image generation only supports response_format=b64_json.",
        ));
    }

    let bedrock = state.bedrock.as_ref().ok_or_else(|| {
        OpenAIApiError::internal_error(
            "Bedrock backend is not configured. Add a 'bedrock' entry to the backends table.",
        )
    })?;

    if target_model_id.starts_with("stability.") {
        generate_image_stability(bedrock, request, target_model_id).await
    } else if target_model_id.starts_with("amazon.nova-canvas") {
        generate_image_nova_canvas(bedrock, request, target_model_id).await
    } else if target_model_id.starts_with("amazon.titan-image-generator") {
        generate_image_titan(bedrock, request, target_model_id).await
    } else {
        Err(OpenAIApiError::bad_request(format!(
            "Model '{}' is not a supported Bedrock image generation model. \
             Supported prefixes: stability.*, amazon.nova-canvas*, amazon.titan-image-generator*.",
            target_model_id
        )))
    }
}

// ============================================================================
// Bedrock — Stability AI SDXL
// ============================================================================

async fn generate_image_stability(
    bedrock: &std::sync::Arc<crate::services::BedrockService>,
    request: &ImageGenerationRequest,
    model_id: &str,
) -> Result<ImageGenerationResponse, OpenAIApiError> {
    let (width, height) = parse_size(request.size.as_deref().unwrap_or("1024x1024"))?;
    let n = request.n.unwrap_or(1);

    let body = json!({
        "text_prompts": [{"text": request.prompt, "weight": 1.0}],
        "cfg_scale": 7,
        "steps": 30,
        "width": width,
        "height": height,
        "samples": n
    });

    let body_bytes = serde_json::to_vec(&body)
        .map_err(|e| OpenAIApiError::internal_error(format!("Serialization error: {}", e)))?;

    let response_bytes = bedrock
        .invoke_model(model_id, body_bytes)
        .await
        .map_err(|e| OpenAIApiError::from_bedrock_error(&e))?;

    let response: serde_json::Value = serde_json::from_slice(&response_bytes).map_err(|e| {
        OpenAIApiError::internal_error(format!("Failed to parse Stability response: {}", e))
    })?;

    let artifacts = response["artifacts"].as_array().ok_or_else(|| {
        OpenAIApiError::internal_error("Stability response missing 'artifacts' field")
    })?;

    let images: Vec<ImageObject> = artifacts
        .iter()
        .filter(|a| a["finishReason"].as_str() == Some("SUCCESS"))
        .filter_map(|a| a["base64"].as_str())
        .map(|b64| ImageObject {
            url: None,
            b64_json: Some(b64.to_string()),
            revised_prompt: None,
        })
        .collect();

    if images.is_empty() {
        return Err(OpenAIApiError::internal_error(
            "Stability AI returned no successful image artifacts.",
        ));
    }

    Ok(ImageGenerationResponse {
        created: current_timestamp(),
        data: images,
    })
}

// ============================================================================
// Bedrock — Amazon Nova Canvas
// ============================================================================

async fn generate_image_nova_canvas(
    bedrock: &std::sync::Arc<crate::services::BedrockService>,
    request: &ImageGenerationRequest,
    model_id: &str,
) -> Result<ImageGenerationResponse, OpenAIApiError> {
    let (width, height) = parse_size(request.size.as_deref().unwrap_or("1024x1024"))?;
    let n = request.n.unwrap_or(1);
    let quality = request.quality.as_deref().unwrap_or("standard");

    let body = json!({
        "taskType": "TEXT_IMAGE",
        "textToImageParams": {
            "text": request.prompt
        },
        "imageGenerationConfig": {
            "numberOfImages": n,
            "width": width,
            "height": height,
            "quality": quality,
            "cfgScale": 8.0
        }
    });

    invoke_bedrock_image(bedrock, model_id, body).await
}

// ============================================================================
// Bedrock — Amazon Titan Image Generator
// ============================================================================

async fn generate_image_titan(
    bedrock: &std::sync::Arc<crate::services::BedrockService>,
    request: &ImageGenerationRequest,
    model_id: &str,
) -> Result<ImageGenerationResponse, OpenAIApiError> {
    let (width, height) = parse_size(request.size.as_deref().unwrap_or("1024x1024"))?;
    let n = request.n.unwrap_or(1);
    let quality = request.quality.as_deref().unwrap_or("standard");

    let body = json!({
        "taskType": "TEXT_IMAGE",
        "textToImageParams": {
            "text": request.prompt
        },
        "imageGenerationConfig": {
            "numberOfImages": n,
            "width": width,
            "height": height,
            "quality": quality,
            "cfgScale": 8.0
        }
    });

    invoke_bedrock_image(bedrock, model_id, body).await
}

/// Shared invocation logic for Nova Canvas and Titan Image Generator.
async fn invoke_bedrock_image(
    bedrock: &std::sync::Arc<crate::services::BedrockService>,
    model_id: &str,
    body: serde_json::Value,
) -> Result<ImageGenerationResponse, OpenAIApiError> {
    let body_bytes = serde_json::to_vec(&body)
        .map_err(|e| OpenAIApiError::internal_error(format!("Serialization error: {}", e)))?;

    let response_bytes = bedrock
        .invoke_model(model_id, body_bytes)
        .await
        .map_err(|e| OpenAIApiError::from_bedrock_error(&e))?;

    let response: serde_json::Value = serde_json::from_slice(&response_bytes).map_err(|e| {
        OpenAIApiError::internal_error(format!("Failed to parse Bedrock image response: {}", e))
    })?;

    // Check for error field
    if let Some(err_msg) = response["error"].as_str() {
        if !err_msg.is_empty() {
            return Err(OpenAIApiError::internal_error(format!(
                "Bedrock image generation error: {}",
                err_msg
            )));
        }
    }

    let images_raw = response["images"]
        .as_array()
        .ok_or_else(|| OpenAIApiError::internal_error("Bedrock response missing 'images' field"))?;

    let images: Vec<ImageObject> = images_raw
        .iter()
        .filter_map(|v| v.as_str())
        .map(|b64| ImageObject {
            url: None,
            b64_json: Some(b64.to_string()),
            revised_prompt: None,
        })
        .collect();

    if images.is_empty() {
        return Err(OpenAIApiError::internal_error(
            "Bedrock returned no image data.",
        ));
    }

    Ok(ImageGenerationResponse {
        created: current_timestamp(),
        data: images,
    })
}

// ============================================================================
// Helpers
// ============================================================================

/// Parse a size string like "1024x1024" into (width, height).
fn parse_size(size: &str) -> Result<(u32, u32), OpenAIApiError> {
    let parts: Vec<&str> = size.split('x').collect();
    if parts.len() != 2 {
        return Err(OpenAIApiError::bad_request(format!(
            "Invalid size format '{}'. Expected WxH, e.g. '1024x1024'.",
            size
        )));
    }
    let width = parts[0]
        .parse::<u32>()
        .map_err(|_| OpenAIApiError::bad_request(format!("Invalid width in size '{}'.", size)))?;
    let height = parts[1]
        .parse::<u32>()
        .map_err(|_| OpenAIApiError::bad_request(format!("Invalid height in size '{}'.", size)))?;
    Ok((width, height))
}
