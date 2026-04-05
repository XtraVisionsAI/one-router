//! OpenAI-compatible Embeddings API schema definitions

use serde::{Deserialize, Serialize};

// ============================================================================
// Request Types
// ============================================================================

/// Input to the embedding model: either a single string or a batch of strings.
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(untagged)]
pub enum EmbeddingInput {
    Single(String),
    Batch(Vec<String>),
}

impl EmbeddingInput {
    /// Convert to a `Vec<String>` regardless of variant.
    pub fn into_texts(self) -> Vec<String> {
        match self {
            EmbeddingInput::Single(s) => vec![s],
            EmbeddingInput::Batch(v) => v,
        }
    }
}

/// OpenAI Embeddings API request body.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct EmbeddingRequest {
    pub model: String,
    pub input: EmbeddingInput,
    /// Ignored; included for API compatibility.
    #[serde(skip_serializing_if = "Option::is_none")]
    pub encoding_format: Option<String>,
    /// Ignored; included for API compatibility.
    #[serde(skip_serializing_if = "Option::is_none")]
    pub dimensions: Option<u32>,
    /// Ignored; included for API compatibility.
    #[serde(skip_serializing_if = "Option::is_none")]
    pub user: Option<String>,
}

// ============================================================================
// Response Types
// ============================================================================

/// A single embedding object returned for one input.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct EmbeddingObject {
    pub object: String,
    pub embedding: Vec<f32>,
    pub index: usize,
}

/// Token usage information for the embedding request.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct EmbeddingUsage {
    pub prompt_tokens: u32,
    pub total_tokens: u32,
}

/// OpenAI-compatible Embeddings API response.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct EmbeddingResponse {
    pub object: String,
    pub data: Vec<EmbeddingObject>,
    pub model: String,
    pub usage: EmbeddingUsage,
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_embedding_request_serialization() {
        let req = EmbeddingRequest {
            model: "text-embedding-3-small".to_string(),
            input: EmbeddingInput::Single("hello world".to_string()),
            encoding_format: None,
            dimensions: Some(256),
            user: None,
        };
        let json = serde_json::to_value(&req).unwrap();
        assert_eq!(json["model"], "text-embedding-3-small");
        assert_eq!(json["input"], "hello world");
        assert_eq!(json["dimensions"], 256);
        assert!(json.get("encoding_format").is_none());
        assert!(json.get("user").is_none());
    }

    #[test]
    fn test_embedding_request_deserialization_single() {
        let json = r#"{"model":"text-embedding-3-small","input":"hello"}"#;
        let req: EmbeddingRequest = serde_json::from_str(json).unwrap();
        assert_eq!(req.model, "text-embedding-3-small");
        match req.input {
            EmbeddingInput::Single(s) => assert_eq!(s, "hello"),
            _ => panic!("Expected Single variant"),
        }
    }

    #[test]
    fn test_embedding_request_deserialization_batch() {
        let json = r#"{"model":"m","input":["a","b","c"]}"#;
        let req: EmbeddingRequest = serde_json::from_str(json).unwrap();
        match req.input {
            EmbeddingInput::Batch(v) => assert_eq!(v, vec!["a", "b", "c"]),
            _ => panic!("Expected Batch variant"),
        }
    }

    #[test]
    fn test_embedding_input_into_texts_single() {
        let input = EmbeddingInput::Single("hello".to_string());
        assert_eq!(input.into_texts(), vec!["hello"]);
    }

    #[test]
    fn test_embedding_input_into_texts_batch() {
        let input = EmbeddingInput::Batch(vec!["a".into(), "b".into()]);
        assert_eq!(input.into_texts(), vec!["a", "b"]);
    }

    #[test]
    fn test_embedding_response_roundtrip() {
        let resp = EmbeddingResponse {
            object: "list".to_string(),
            data: vec![EmbeddingObject {
                object: "embedding".to_string(),
                embedding: vec![0.1, 0.2, 0.3],
                index: 0,
            }],
            model: "text-embedding-3-small".to_string(),
            usage: EmbeddingUsage {
                prompt_tokens: 5,
                total_tokens: 5,
            },
        };
        let json = serde_json::to_string(&resp).unwrap();
        let parsed: EmbeddingResponse = serde_json::from_str(&json).unwrap();
        assert_eq!(parsed.object, "list");
        assert_eq!(parsed.data.len(), 1);
        assert_eq!(parsed.data[0].embedding, vec![0.1, 0.2, 0.3]);
        assert_eq!(parsed.data[0].index, 0);
        assert_eq!(parsed.usage.prompt_tokens, 5);
        assert_eq!(parsed.usage.total_tokens, 5);
    }
}
