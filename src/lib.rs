//! One Router
//!
//! A high-performance API gateway that unifies different AI provider APIs
//! with a pluggable database backend (SQLite, PostgreSQL, DynamoDB).

pub mod api;
pub mod config;
pub mod converters;
pub mod database;
pub mod error;
pub mod middleware;
pub mod schemas;
pub mod server;
pub mod services;
pub mod utils;

pub use config::Settings;
pub use server::App;
