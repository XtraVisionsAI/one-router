//! Storage abstraction layer
//!
//! Provides a unified interface for multiple database backends:
//! - SQLite (default, zero-config)
//! - PostgreSQL
//! - DynamoDB
//!
//! Backend is selected automatically via the `DATABASE` scheme.

pub mod budget;
pub mod encryption;
pub mod models;
pub mod secret_migration;
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
        anyhow::bail!(
            "Unsupported DATABASE scheme: {}. Expected sqlite://, postgres://, or dynamodb://",
            crate::config::settings::redact_database_uri(database)
        )
    }
}

/// How [`open_existing_database`] may touch the store.
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum OpenMode {
    /// Read-only: SQLite `mode=ro`, PostgreSQL `default_transaction_read_only`
    /// sessions, DynamoDB client only. The caller must not call `initialize`.
    ReadOnly,
    /// Read-write on an existing store (SQLite `mode=rw`: never creates the
    /// file). The caller decides whether to `initialize`.
    ReadWrite,
}

/// Open an **existing** database for offline tools (`migrate-secrets`).
/// Unlike [`create_database`], SQLite never creates the file or its parent
/// directory — a missing file is an error. No schema migration or backfill
/// runs here (that is `DatabaseService::initialize`).
pub async fn open_existing_database(
    database: &str,
    mode: OpenMode,
) -> Result<Arc<dyn DatabaseService>> {
    let read_only = mode == OpenMode::ReadOnly;
    if let Some(path) = database.strip_prefix("sqlite://") {
        Ok(Arc::new(
            sqlite::SqliteBackend::open_existing(path, read_only).await?,
        ))
    } else if database.starts_with("postgres://") {
        if read_only {
            Ok(Arc::new(
                postgres::PostgresBackend::new_read_only(database).await?,
            ))
        } else {
            Ok(Arc::new(postgres::PostgresBackend::new(database).await?))
        }
    } else if let Some(region) = database.strip_prefix("dynamodb://") {
        // Constructing the client performs no requests; table creation and
        // backfills only happen in `initialize`.
        Ok(Arc::new(dynamodb::DynamoDbBackend::new(region).await?))
    } else {
        anyhow::bail!(
            "Unsupported DATABASE scheme: {}. Expected sqlite://, postgres://, or dynamodb://",
            crate::config::settings::redact_database_uri(database)
        )
    }
}
