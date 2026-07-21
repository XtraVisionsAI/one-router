//! Bedrock application inference profile ARN resolution.
//!
//! A client may pass a Bedrock **application inference profile** ARN as the
//! model ID, e.g.
//! `arn:aws:bedrock:us-east-1:123456789012:application-inference-profile/k5jycjzpuzbv`.
//! Such an ARN is opaque: the underlying foundation model (Claude, Nova, …)
//! cannot be told from the string. Routing (`InvokeModel` vs Mantle/Converse),
//! beta-header handling, and pricing all key off substring matches on the
//! model ID, so an unresolved ARN would be mis-routed and mis-priced.
//!
//! This module resolves such ARNs to their underlying model ARN via the
//! Bedrock control-plane `GetInferenceProfile` API (a SigV4-signed HTTPS GET,
//! mirroring the manual signing used elsewhere in the Bedrock service), and
//! caches the result with a TTL. Non-ARN model IDs return unchanged with no
//! network call (hot-path fast return). Resolution failures are strict errors
//! — the request is rejected rather than routed against a guess.

use aws_credential_types::Credentials as AwsCreds;
use aws_sigv4::http_request::{sign, SignableBody, SignableRequest, SigningSettings};
use aws_sigv4::sign::v4;
use moka::future::Cache;
use std::sync::OnceLock;
use std::time::Duration;

/// Cache TTL for resolved inference profiles.
const CACHE_TTL: Duration = Duration::from_secs(3600);

/// Process-global cache: application-inference-profile ARN → underlying model ARN.
static PROFILE_CACHE: OnceLock<Cache<String, String>> = OnceLock::new();

fn cache() -> &'static Cache<String, String> {
    PROFILE_CACHE.get_or_init(|| {
        Cache::builder()
            .max_capacity(1024)
            .time_to_live(CACHE_TTL)
            .build()
    })
}

/// True if `model_id` is a Bedrock **application** inference profile ARN.
///
/// Only application inference profiles are opaque. System-defined and
/// cross-region profiles (`us.anthropic.claude-…`) carry the model name in the
/// string and route correctly without resolution, so they are not matched here.
pub fn is_application_inference_profile(model_id: &str) -> bool {
    model_id.starts_with("arn:aws:bedrock:") && model_id.contains(":application-inference-profile/")
}

/// Credentials needed to sign the control-plane request.
pub struct ResolverCreds {
    pub region: String,
    pub access_key_id: String,
    pub secret_access_key: String,
    pub session_token: Option<String>,
}

/// Resolve `model_id` to the underlying model ARN for routing/pricing.
///
/// - Non-ARN IDs are returned unchanged with no network call.
/// - Application-inference-profile ARNs are resolved via `GetInferenceProfile`,
///   cached for [`CACHE_TTL`], and the underlying `modelArn` is returned.
/// - Resolution failures return `Err` (strict — never guess).
pub async fn resolve_model_id(model_id: &str, creds: &ResolverCreds) -> Result<String, String> {
    if !is_application_inference_profile(model_id) {
        return Ok(model_id.to_string());
    }

    if let Some(resolved) = cache().get(model_id).await {
        return Ok(resolved);
    }

    let resolved = fetch_underlying_model_arn(model_id, creds).await?;
    cache().insert(model_id.to_string(), resolved.clone()).await;
    Ok(resolved)
}

/// Percent-encode an ARN for use as a single REST path segment
/// (`:` and `/` must be escaped; unreserved chars per RFC 3986 pass through).
fn encode_path_segment(s: &str) -> String {
    let mut out = String::with_capacity(s.len() * 3);
    for b in s.bytes() {
        match b {
            b'A'..=b'Z' | b'a'..=b'z' | b'0'..=b'9' | b'-' | b'.' | b'_' | b'~' => {
                out.push(b as char)
            }
            _ => out.push_str(&format!("%{b:02X}")),
        }
    }
    out
}

async fn fetch_underlying_model_arn(arn: &str, creds: &ResolverCreds) -> Result<String, String> {
    let region = &creds.region;
    let host = format!("bedrock.{region}.amazonaws.com");
    let url = format!(
        "https://{host}/inference-profiles/{}",
        encode_path_segment(arn)
    );

    let aws_creds = AwsCreds::new(
        creds.access_key_id.as_str(),
        creds.secret_access_key.as_str(),
        creds.session_token.clone(),
        None,
        "one-router",
    );
    let identity: aws_smithy_runtime_api::client::identity::Identity = aws_creds.into();

    let signing_params = v4::SigningParams::builder()
        .identity(&identity)
        .region(region.as_str())
        .name("bedrock")
        .time(std::time::SystemTime::now())
        .settings(SigningSettings::default())
        .build()
        .map_err(|e| e.to_string())?
        .into();

    let headers_to_sign = [("host", host.as_str())];
    let signable = SignableRequest::new(
        "GET",
        url.as_str(),
        headers_to_sign.iter().map(|(k, v)| (*k, *v)),
        SignableBody::Bytes(&[]),
    )
    .map_err(|e| e.to_string())?;

    let (signing_instructions, _) = sign(signable, &signing_params)
        .map_err(|e| e.to_string())?
        .into_parts();

    let client = reqwest::Client::new();
    let mut req = client.get(&url).header("host", &host);
    for (name, value) in signing_instructions.headers() {
        req = req.header(name, value);
    }

    let response = req
        .send()
        .await
        .map_err(|e| format!("GetInferenceProfile request failed: {e}"))?;
    let status = response.status();
    if !status.is_success() {
        let body = response.text().await.unwrap_or_default();
        return Err(format!(
            "GetInferenceProfile returned {}: {body}",
            status.as_u16()
        ));
    }

    let json: serde_json::Value = response
        .json()
        .await
        .map_err(|e| format!("Failed to parse GetInferenceProfile response: {e}"))?;

    // Response shape: { "models": [ { "modelArn": "arn:...:foundation-model/anthropic.claude-..." } ], ... }
    json["models"]
        .as_array()
        .and_then(|arr| arr.first())
        .and_then(|m| m["modelArn"].as_str())
        .map(|s| s.to_string())
        .ok_or_else(|| {
            format!("GetInferenceProfile response for '{arn}' has no models[0].modelArn")
        })
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_is_application_inference_profile() {
        assert!(is_application_inference_profile(
            "arn:aws:bedrock:us-east-1:123456789012:application-inference-profile/k5jycjzpuzbv"
        ));
        // System-defined / cross-region profiles are not application profiles.
        assert!(!is_application_inference_profile(
            "us.anthropic.claude-sonnet-4-20250514-v1:0"
        ));
        assert!(!is_application_inference_profile(
            "anthropic.claude-3-5-sonnet"
        ));
        // Foundation-model ARN is not an application profile.
        assert!(!is_application_inference_profile(
            "arn:aws:bedrock:us-east-1::foundation-model/anthropic.claude-3-5-sonnet-20240620-v1:0"
        ));
    }

    #[tokio::test]
    async fn test_resolve_non_arn_is_passthrough() {
        let creds = ResolverCreds {
            region: "us-east-1".to_string(),
            access_key_id: "x".to_string(),
            secret_access_key: "y".to_string(),
            session_token: None,
        };
        // Non-ARN model IDs return unchanged with no network call.
        let out = resolve_model_id("anthropic.claude-3-5-sonnet", &creds)
            .await
            .unwrap();
        assert_eq!(out, "anthropic.claude-3-5-sonnet");
    }

    #[test]
    fn test_encode_path_segment() {
        assert_eq!(
            encode_path_segment("arn:aws:bedrock:us-east-1:1:application-inference-profile/abc"),
            "arn%3Aaws%3Abedrock%3Aus-east-1%3A1%3Aapplication-inference-profile%2Fabc"
        );
    }
}
