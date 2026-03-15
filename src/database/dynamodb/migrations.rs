//! DynamoDB table creation (migrations)
//!
//! Creates all five DynamoDB tables with appropriate key schemas.
//! Uses `ResourceInUseException` to skip already-existing tables.

use anyhow::Result;
use aws_sdk_dynamodb::types::{
    AttributeDefinition, BillingMode, KeySchemaElement, KeyType, ScalarAttributeType,
};

use super::DynamoDbBackend;

/// Create all DynamoDB tables if they don't already exist.
pub async fn create_tables(backend: &DynamoDbBackend) -> Result<()> {
    // --- api_keys (PK: api_key) ---
    create_table_if_not_exists(
        backend,
        "api_keys",
        vec![attr_def("api_key", ScalarAttributeType::S)],
        vec![key_schema("api_key", KeyType::Hash)],
    )
    .await?;

    // --- usage (PK: api_key, SK: timestamp#request_id) ---
    create_table_if_not_exists(
        backend,
        "usage",
        vec![
            attr_def("api_key", ScalarAttributeType::S),
            attr_def("sort_key", ScalarAttributeType::S),
        ],
        vec![
            key_schema("api_key", KeyType::Hash),
            key_schema("sort_key", KeyType::Range),
        ],
    )
    .await?;

    // --- model_mappings (PK: source_model_id, SK: provider) ---
    create_table_if_not_exists(
        backend,
        "model_mappings",
        vec![
            attr_def("source_model_id", ScalarAttributeType::S),
            attr_def("provider", ScalarAttributeType::S),
        ],
        vec![
            key_schema("source_model_id", KeyType::Hash),
            key_schema("provider", KeyType::Range),
        ],
    )
    .await?;

    // --- backends (PK: name) ---
    create_table_if_not_exists(
        backend,
        "backends",
        vec![attr_def("name", ScalarAttributeType::S)],
        vec![key_schema("name", KeyType::Hash)],
    )
    .await?;

    // --- feature_flags (PK: name) ---
    create_table_if_not_exists(
        backend,
        "feature_flags",
        vec![attr_def("name", ScalarAttributeType::S)],
        vec![key_schema("name", KeyType::Hash)],
    )
    .await?;

    Ok(())
}

async fn create_table_if_not_exists(
    backend: &DynamoDbBackend,
    logical_name: &str,
    attribute_definitions: Vec<AttributeDefinition>,
    key_schema: Vec<KeySchemaElement>,
) -> Result<()> {
    let table_name = DynamoDbBackend::table_name(logical_name);

    let result = backend
        .client
        .create_table()
        .table_name(&table_name)
        .billing_mode(BillingMode::PayPerRequest)
        .set_attribute_definitions(Some(attribute_definitions))
        .set_key_schema(Some(key_schema))
        .send()
        .await;

    match result {
        Ok(_) => {
            tracing::info!(table = %table_name, "DynamoDB table created");
        }
        Err(err) => {
            // ResourceInUseException means the table already exists
            let service_err = err.into_service_error();
            if service_err.is_resource_in_use_exception() {
                tracing::debug!(table = %table_name, "DynamoDB table already exists");
            } else {
                return Err(anyhow::anyhow!(
                    "Failed to create DynamoDB table {}: {}",
                    table_name,
                    service_err
                ));
            }
        }
    }

    Ok(())
}

fn attr_def(name: &str, attr_type: ScalarAttributeType) -> AttributeDefinition {
    AttributeDefinition::builder()
        .attribute_name(name)
        .attribute_type(attr_type)
        .build()
        .expect("valid attribute definition")
}

fn key_schema(name: &str, key_type: KeyType) -> KeySchemaElement {
    KeySchemaElement::builder()
        .attribute_name(name)
        .key_type(key_type)
        .build()
        .expect("valid key schema")
}
