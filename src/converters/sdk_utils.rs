//! SDK utility functions for converting between serde_json::Value and aws_smithy_types::Document.
//!
//! These are used by both Anthropic-Bedrock and OpenAI-Bedrock converters.

/// Convert serde_json::Value to aws_smithy_types::Document
pub fn json_to_document(value: &serde_json::Value) -> aws_smithy_types::Document {
    match value {
        serde_json::Value::Null => aws_smithy_types::Document::Null,
        serde_json::Value::Bool(b) => aws_smithy_types::Document::Bool(*b),
        serde_json::Value::Number(n) => {
            if let Some(i) = n.as_i64() {
                if i >= 0 {
                    aws_smithy_types::Document::Number(aws_smithy_types::Number::PosInt(i as u64))
                } else {
                    aws_smithy_types::Document::Number(aws_smithy_types::Number::NegInt(i))
                }
            } else if let Some(f) = n.as_f64() {
                aws_smithy_types::Document::Number(aws_smithy_types::Number::Float(f))
            } else {
                aws_smithy_types::Document::Null
            }
        }
        serde_json::Value::String(s) => aws_smithy_types::Document::String(s.clone()),
        serde_json::Value::Array(arr) => {
            aws_smithy_types::Document::Array(arr.iter().map(json_to_document).collect())
        }
        serde_json::Value::Object(obj) => {
            let map: std::collections::HashMap<String, aws_smithy_types::Document> = obj
                .iter()
                .map(|(k, v)| (k.clone(), json_to_document(v)))
                .collect();
            aws_smithy_types::Document::Object(map)
        }
    }
}

/// Convert aws_smithy_types::Document to serde_json::Value
pub fn document_to_json(doc: &aws_smithy_types::Document) -> serde_json::Value {
    match doc {
        aws_smithy_types::Document::Null => serde_json::Value::Null,
        aws_smithy_types::Document::Bool(b) => serde_json::Value::Bool(*b),
        aws_smithy_types::Document::Number(n) => match n {
            aws_smithy_types::Number::PosInt(i) => serde_json::json!(*i),
            aws_smithy_types::Number::NegInt(i) => serde_json::json!(*i),
            aws_smithy_types::Number::Float(f) => serde_json::json!(*f),
        },
        aws_smithy_types::Document::String(s) => serde_json::Value::String(s.clone()),
        aws_smithy_types::Document::Array(arr) => {
            serde_json::Value::Array(arr.iter().map(document_to_json).collect())
        }
        aws_smithy_types::Document::Object(obj) => {
            let map: serde_json::Map<String, serde_json::Value> = obj
                .iter()
                .map(|(k, v)| (k.clone(), document_to_json(v)))
                .collect();
            serde_json::Value::Object(map)
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_json_to_document() {
        let json = serde_json::json!({"key": "value", "num": 42});
        let doc = json_to_document(&json);

        if let aws_smithy_types::Document::Object(map) = doc {
            assert!(map.contains_key("key"));
            assert!(map.contains_key("num"));
        } else {
            panic!("Expected Document::Object");
        }
    }

    #[test]
    fn test_document_to_json() {
        let doc = aws_smithy_types::Document::Object(std::collections::HashMap::from([(
            "key".to_string(),
            aws_smithy_types::Document::String("value".to_string()),
        )]));
        let json = document_to_json(&doc);

        assert_eq!(json["key"], "value");
    }

    #[test]
    fn test_roundtrip() {
        let original = serde_json::json!({
            "string": "hello",
            "number": 42,
            "float": 3.14,
            "bool": true,
            "null": null,
            "array": [1, 2, 3],
            "nested": {"a": "b"}
        });

        let doc = json_to_document(&original);
        let roundtripped = document_to_json(&doc);

        assert_eq!(original["string"], roundtripped["string"]);
        assert_eq!(original["number"], roundtripped["number"]);
        assert_eq!(original["bool"], roundtripped["bool"]);
        assert_eq!(original["null"], roundtripped["null"]);
    }
}
