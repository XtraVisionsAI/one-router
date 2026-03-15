//! Storage abstraction layer
//!
//! Provides a unified interface for multiple database backends:
//! - SQLite (default, zero-config)
//! - PostgreSQL
//! - DynamoDB
//!
//! Backend is selected automatically via the `DATABASE` scheme.

pub mod encryption;
pub mod models;
pub mod seed;
pub mod traits;

pub mod dynamodb;
pub mod postgres;
pub mod sqlite;

use anyhow::Result;
use std::sync::Arc;
use traits::DatabaseService;

/// Create a database backend from a DATABASE string.
///
/// Supported schemes:
/// - `sqlite://path` → SQLite
/// - `postgres://...` → PostgreSQL
/// - `dynamodb://region` → DynamoDB
pub async fn create_database(database: &str) -> Result<Arc<dyn DatabaseService>> {
    if database.starts_with("sqlite://") {
        let path = database.strip_prefix("sqlite://").unwrap();
        Ok(Arc::new(sqlite::SqliteBackend::new(path).await?))
    } else if database.starts_with("postgres://") {
        Ok(Arc::new(postgres::PostgresBackend::new(database).await?))
    } else if database.starts_with("dynamodb://") {
        let region = database.strip_prefix("dynamodb://").unwrap();
        Ok(Arc::new(dynamodb::DynamoDbBackend::new(region).await?))
    } else {
        anyhow::bail!("Unsupported DATABASE scheme: {database}. Expected sqlite://, postgres://, or dynamodb://")
    }
}
