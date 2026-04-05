//! Cohere-compatible Rerank API schema definitions

use serde::{Deserialize, Serialize};

// ============================================================================
// Request Types
// ============================================================================

/// Cohere Rerank API request body.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct RerankRequest {
    pub model: String,
    pub query: String,
    pub documents: Vec<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub top_n: Option<usize>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub return_documents: Option<bool>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub max_chunks_per_doc: Option<u32>,
}

// ============================================================================
// Response Types
// ============================================================================

/// A single rerank result entry.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct RerankResult {
    pub index: usize,
    pub relevance_score: f64,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub document: Option<String>,
}

/// Cohere-compatible Rerank API response.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct RerankResponse {
    pub id: String,
    pub results: Vec<RerankResult>,
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_rerank_request_serialization() {
        let req = RerankRequest {
            model: "rerank-v3".to_string(),
            query: "What is the capital of France?".to_string(),
            documents: vec![
                "Paris is the capital.".into(),
                "Berlin is in Germany.".into(),
            ],
            top_n: Some(2),
            return_documents: Some(true),
            max_chunks_per_doc: None,
        };
        let json = serde_json::to_value(&req).unwrap();
        assert_eq!(json["model"], "rerank-v3");
        assert_eq!(json["query"], "What is the capital of France?");
        assert_eq!(json["documents"].as_array().unwrap().len(), 2);
        assert_eq!(json["top_n"], 2);
        assert_eq!(json["return_documents"], true);
        assert!(json.get("max_chunks_per_doc").is_none());
    }

    #[test]
    fn test_rerank_request_deserialization() {
        let json = r#"{
            "model": "rerank-v3",
            "query": "test query",
            "documents": ["doc1", "doc2"]
        }"#;
        let req: RerankRequest = serde_json::from_str(json).unwrap();
        assert_eq!(req.model, "rerank-v3");
        assert_eq!(req.query, "test query");
        assert_eq!(req.documents, vec!["doc1", "doc2"]);
        assert!(req.top_n.is_none());
        assert!(req.return_documents.is_none());
    }

    #[test]
    fn test_rerank_response_roundtrip() {
        let resp = RerankResponse {
            id: "req-123".to_string(),
            results: vec![
                RerankResult {
                    index: 0,
                    relevance_score: 0.95,
                    document: Some("Paris is the capital.".to_string()),
                },
                RerankResult {
                    index: 1,
                    relevance_score: 0.12,
                    document: None,
                },
            ],
        };
        let json = serde_json::to_string(&resp).unwrap();
        let parsed: RerankResponse = serde_json::from_str(&json).unwrap();
        assert_eq!(parsed.id, "req-123");
        assert_eq!(parsed.results.len(), 2);
        assert_eq!(parsed.results[0].index, 0);
        assert!((parsed.results[0].relevance_score - 0.95).abs() < f64::EPSILON);
        assert_eq!(
            parsed.results[0].document,
            Some("Paris is the capital.".to_string())
        );
        assert_eq!(parsed.results[1].index, 1);
        assert!(parsed.results[1].document.is_none());
    }
}
