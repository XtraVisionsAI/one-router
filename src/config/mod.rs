//! Configuration management module
//!
//! Minimal configuration — only 5 env vars. All other config lives in the database.

pub mod aws;
pub mod settings;

pub use aws::{
    build_aws_config, create_bedrock_client, create_bedrock_client_with_profile,
    create_dynamodb_client, AwsConfigBuilder,
};
pub use settings::Settings;
