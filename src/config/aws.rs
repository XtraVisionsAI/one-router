//! AWS SDK configuration
//!
//! Provides AWS SDK configuration for Bedrock and DynamoDB clients.

use aws_config::{meta::region::RegionProviderChain, BehaviorVersion, Region, SdkConfig};
use aws_sdk_bedrockruntime::Client as BedrockRuntimeClient;
use aws_sdk_dynamodb::Client as DynamoDbSdkClient;

use crate::services::BedrockBackendConfig;

/// AWS configuration builder
pub struct AwsConfigBuilder {
    region: String,
}

impl AwsConfigBuilder {
    pub fn new(region: &str) -> Self {
        Self {
            region: region.to_string(),
        }
    }

    pub async fn build_sdk_config(&self) -> SdkConfig {
        let region_provider =
            RegionProviderChain::first_try(Region::new(self.region.clone())).or_default_provider();

        aws_config::defaults(BehaviorVersion::latest())
            .region(region_provider)
            .load()
            .await
    }

    pub async fn build_dynamodb_client(&self) -> DynamoDbSdkClient {
        let sdk_config = self.build_sdk_config().await;
        DynamoDbSdkClient::new(&sdk_config)
    }

    pub async fn build_bedrock_client(&self) -> BedrockRuntimeClient {
        let sdk_config = self.build_sdk_config().await;
        BedrockRuntimeClient::new(&sdk_config)
    }
}

/// Build AWS SDK config for a given region
pub async fn build_aws_config(region: &str) -> SdkConfig {
    AwsConfigBuilder::new(region).build_sdk_config().await
}

/// Create a DynamoDB client for a given region
pub async fn create_dynamodb_client(region: &str) -> DynamoDbSdkClient {
    AwsConfigBuilder::new(region).build_dynamodb_client().await
}

/// Create a Bedrock Runtime client for a given region
pub async fn create_bedrock_client(region: &str) -> BedrockRuntimeClient {
    AwsConfigBuilder::new(region).build_bedrock_client().await
}

/// Create a Bedrock Runtime client with a specific profile and region
pub async fn create_bedrock_client_with_profile(
    profile: Option<&str>,
    region: &str,
    _endpoint_url: Option<&str>,
) -> BedrockRuntimeClient {
    let region = Region::new(region.to_string());

    let config_loader = if let Some(profile_name) = profile {
        tracing::debug!(profile = %profile_name, region = %region, "Creating Bedrock client with profile");
        aws_config::defaults(BehaviorVersion::latest())
            .region(region)
            .profile_name(profile_name)
    } else {
        tracing::debug!(region = %region, "Creating Bedrock client with default credentials");
        aws_config::defaults(BehaviorVersion::latest()).region(region)
    };

    let sdk_config = config_loader.load().await;
    BedrockRuntimeClient::new(&sdk_config)
}

/// Create a Bedrock Runtime client from a typed backend config.
///
/// Supports profile, access key, and default credential chain.
pub async fn create_bedrock_client_from_config(cfg: &BedrockBackendConfig) -> BedrockRuntimeClient {
    let region = Region::new(cfg.region.clone());

    if let Some(profile_name) = &cfg.profile {
        tracing::debug!(profile = %profile_name, region = %region, "Creating Bedrock client with profile");
        let sdk_config = aws_config::defaults(BehaviorVersion::latest())
            .region(region)
            .profile_name(profile_name)
            .load()
            .await;
        return BedrockRuntimeClient::new(&sdk_config);
    }

    if let (Some(ak), Some(sk)) = (&cfg.access_key_id, &cfg.secret_access_key) {
        tracing::debug!(region = %region, "Creating Bedrock client with access key");
        let creds = aws_sdk_bedrockruntime::config::Credentials::new(
            ak,
            sk,
            cfg.session_token.clone(),
            None,
            "one-router-static",
        );
        let sdk_config = aws_config::defaults(BehaviorVersion::latest())
            .region(region)
            .credentials_provider(creds)
            .load()
            .await;
        return BedrockRuntimeClient::new(&sdk_config);
    }

    tracing::debug!(region = %region, "Creating Bedrock client with default credentials");
    let sdk_config = aws_config::defaults(BehaviorVersion::latest())
        .region(region)
        .load()
        .await;
    BedrockRuntimeClient::new(&sdk_config)
}
