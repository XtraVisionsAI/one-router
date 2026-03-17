//! OpenAI-compatible Image Generation API schema definitions

use serde::{Deserialize, Serialize};

// ============================================================================
// Request Types
// ============================================================================

/// Response format for image generation.
#[derive(Debug, Clone, Default, Serialize, Deserialize, PartialEq, Eq)]
#[serde(rename_all = "snake_case")]
pub enum ImageResponseFormat {
    #[default]
    Url,
    B64Json,
}

/// OpenAI Images Generation API request body.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ImageGenerationRequest {
    /// Model to use for image generation (resolved via model_mapping table).
    pub model: String,

    /// Text description of the desired image.
    pub prompt: String,

    /// Image size, e.g. "1024x1024". Optional.
    #[serde(skip_serializing_if = "Option::is_none")]
    pub size: Option<String>,

    /// Image quality: "standard" or "hd". Optional (DALL-E 3 only).
    #[serde(skip_serializing_if = "Option::is_none")]
    pub quality: Option<String>,

    /// Number of images to generate. Defaults to 1.
    #[serde(skip_serializing_if = "Option::is_none")]
    pub n: Option<u32>,

    /// Response format: "url" or "b64_json". Bedrock/Gemini only support b64_json.
    #[serde(skip_serializing_if = "Option::is_none")]
    pub response_format: Option<ImageResponseFormat>,

    /// Image style: "vivid" or "natural". DALL-E 3 only.
    #[serde(skip_serializing_if = "Option::is_none")]
    pub style: Option<String>,

    /// A unique identifier representing the end-user. Ignored for non-OpenAI backends.
    #[serde(skip_serializing_if = "Option::is_none")]
    pub user: Option<String>,
}

// ============================================================================
// Response Types
// ============================================================================

/// A single generated image object.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ImageObject {
    /// Public URL of the image (only for OpenAI url format).
    #[serde(skip_serializing_if = "Option::is_none")]
    pub url: Option<String>,

    /// Base64-encoded image data.
    #[serde(skip_serializing_if = "Option::is_none")]
    pub b64_json: Option<String>,

    /// Revised prompt used by DALL-E 3 (may differ from input prompt).
    #[serde(skip_serializing_if = "Option::is_none")]
    pub revised_prompt: Option<String>,
}

/// OpenAI-compatible Image Generation API response.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ImageGenerationResponse {
    /// Unix timestamp of when the image was created.
    pub created: i64,

    /// List of generated image objects.
    pub data: Vec<ImageObject>,
}
