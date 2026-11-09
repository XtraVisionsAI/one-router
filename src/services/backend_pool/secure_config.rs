//! Backend config validation and secret masking.
//!
//! - [`validate_backend_config`] rejects configs that could redirect
//!   credentials: an AWS `region` that is not a region code (it is interpolated
//!   into hand-built Mantle / inference-profile hostnames and would otherwise
//!   let SigV4-signed requests — security token included — go to any host), a
//!   non-https / credential-bearing `base_url`, and AWS profiles or the host's
//!   default credential chain when the operator disallowed them
//!   ([`CredentialPolicy`], from `BEDROCK_ALLOWED_PROFILES` /
//!   `BEDROCK_ALLOW_DEFAULT_CREDENTIALS`). Applied on admin writes **and** when
//!   configs are loaded, so rows written before this check are skipped too.
//! - [`mask_backend_config`] / [`merge_masked`] keep secrets write-only through
//!   the admin API: reads return `••••<last4>`, and a masked value sent back on
//!   update keeps the stored secret.

use serde_json::Value;

/// Marker prefix of a masked secret.
pub const MASK: &str = "••••";

/// Secret-bearing scalar fields (any backend type).
const SECRET_FIELDS: &[&str] = &[
    "secret_access_key",
    "session_token",
    "access_key_id",
    "api_key",
];
/// Secret-bearing string-array fields.
const SECRET_LIST_FIELDS: &[&str] = &["api_keys"];

/// Operator policy for which host AWS identities Bedrock backends may use.
#[derive(Debug, Clone, Default, PartialEq, Eq)]
pub struct CredentialPolicy {
    /// `Some(list)` = only these named profiles may be referenced; `None` = any.
    pub allowed_profiles: Option<Vec<String>>,
    /// Allow backends without explicit keys or profile to use the gateway
    /// host's default AWS credential chain (env / instance role / SSO cache).
    pub allow_default_chain: bool,
}

impl CredentialPolicy {
    /// From `BEDROCK_ALLOWED_PROFILES` (comma-separated; unset = any profile)
    /// and `BEDROCK_ALLOW_DEFAULT_CREDENTIALS` (default `true`).
    pub fn from_env() -> Self {
        let allowed_profiles = std::env::var("BEDROCK_ALLOWED_PROFILES").ok().map(|v| {
            v.split(',')
                .map(str::trim)
                .filter(|s| !s.is_empty())
                .map(String::from)
                .collect()
        });
        let allow_default_chain = std::env::var("BEDROCK_ALLOW_DEFAULT_CREDENTIALS")
            .map(|v| !matches!(v.trim(), "false" | "0" | "no"))
            .unwrap_or(true);
        Self {
            allowed_profiles,
            allow_default_chain,
        }
    }

    /// Process-wide policy (read once from the environment).
    pub fn global() -> &'static CredentialPolicy {
        static POLICY: std::sync::OnceLock<CredentialPolicy> = std::sync::OnceLock::new();
        POLICY.get_or_init(Self::from_env)
    }

    pub fn permissive() -> Self {
        Self {
            allowed_profiles: None,
            allow_default_chain: true,
        }
    }
}

/// `us-east-1`, `ap-southeast-2`, `us-gov-west-1`, `eu-central-2`, `cn-north-1`, …
pub fn is_valid_region(region: &str) -> bool {
    let parts: Vec<&str> = region.split('-').collect();
    parts.len() >= 3
        && parts[0].len() == 2
        && parts[0].bytes().all(|b| b.is_ascii_lowercase())
        && parts[1..parts.len() - 1]
            .iter()
            .all(|p| !p.is_empty() && p.bytes().all(|b| b.is_ascii_lowercase()))
        && {
            let last = parts[parts.len() - 1];
            !last.is_empty() && last.len() <= 2 && last.bytes().all(|b| b.is_ascii_digit())
        }
}

fn validate_base_url(raw: &str) -> Result<(), String> {
    let url = reqwest::Url::parse(raw).map_err(|e| format!("invalid base_url: {e}"))?;
    if url.scheme() != "https" {
        return Err("base_url must use https".into());
    }
    if !url.username().is_empty() || url.password().is_some() {
        return Err("base_url must not contain credentials".into());
    }
    if url.host_str().is_none() {
        return Err("base_url must have a host".into());
    }
    Ok(())
}

fn str_field<'a>(v: &'a Value, key: &str) -> Option<&'a str> {
    v.get(key)
        .and_then(|x| x.as_str())
        .filter(|s| !s.is_empty())
}

/// Validate a backend config before storing or loading it.
pub fn validate_backend_config(
    backend_type: &str,
    config: &Value,
    policy: &CredentialPolicy,
) -> Result<(), String> {
    if !config.is_object() {
        return Err("config must be a JSON object".into());
    }
    if let Some(base_url) = str_field(config, "base_url") {
        validate_base_url(base_url)?;
    }
    if contains_mask(config) {
        return Err("config contains a masked placeholder (••••); send the real secret".into());
    }
    if backend_type == "bedrock" {
        let region = str_field(config, "region").unwrap_or("us-east-1");
        if !is_valid_region(region) {
            return Err(format!("invalid AWS region '{region}'"));
        }
        let profile = str_field(config, "profile");
        let has_keys = str_field(config, "access_key_id").is_some()
            && str_field(config, "secret_access_key").is_some();
        if let Some(p) = profile {
            if let Some(allowed) = &policy.allowed_profiles {
                if !allowed.iter().any(|a| a == p) {
                    return Err(format!(
                        "AWS profile '{p}' is not allowed (BEDROCK_ALLOWED_PROFILES)"
                    ));
                }
            }
        } else if !has_keys && !policy.allow_default_chain {
            return Err("explicit access keys or an allowed profile are required \
                 (BEDROCK_ALLOW_DEFAULT_CREDENTIALS=false)"
                .into());
        }
    }
    Ok(())
}

/// Validate a decrypted stored config (JSON text) with the global policy.
pub fn check_stored(backend_type: &str, config_json: &str) -> Result<(), String> {
    let v: Value =
        serde_json::from_str(config_json).map_err(|e| format!("config is not valid JSON: {e}"))?;
    validate_backend_config(backend_type, &v, CredentialPolicy::global())
}

fn mask_str(s: &str) -> String {
    let chars: Vec<char> = s.chars().collect();
    if chars.len() > 8 {
        let tail: String = chars[chars.len() - 4..].iter().collect();
        format!("{MASK}{tail}")
    } else {
        MASK.to_string()
    }
}

fn is_masked(s: &str) -> bool {
    s.starts_with(MASK)
}

fn contains_mask(config: &Value) -> bool {
    SECRET_FIELDS
        .iter()
        .any(|f| str_field(config, f).is_some_and(is_masked))
        || SECRET_LIST_FIELDS.iter().any(|f| {
            config
                .get(*f)
                .and_then(|v| v.as_array())
                .is_some_and(|a| a.iter().any(|x| x.as_str().is_some_and(is_masked)))
        })
}

/// Copy of `config` with every secret replaced by `••••<last4>`.
pub fn mask_backend_config(config: &Value) -> Value {
    let mut out = config.clone();
    let Some(obj) = out.as_object_mut() else {
        return out;
    };
    for f in SECRET_FIELDS {
        if let Some(Value::String(s)) = obj.get_mut(*f) {
            if !s.is_empty() {
                *s = mask_str(s);
            }
        }
    }
    for f in SECRET_LIST_FIELDS {
        if let Some(Value::Array(items)) = obj.get_mut(*f) {
            for it in items.iter_mut() {
                if let Value::String(s) = it {
                    *s = mask_str(s);
                }
            }
        }
    }
    out
}

/// Replace masked placeholders in `incoming` with the stored secrets from
/// `stored`. A masked list entry is matched to the stored entry with the same
/// mask; a placeholder with no matching stored secret is left in place (and
/// then rejected by [`validate_backend_config`]).
pub fn merge_masked(mut incoming: Value, stored: &Value) -> Value {
    let Some(obj) = incoming.as_object_mut() else {
        return incoming;
    };
    for f in SECRET_FIELDS {
        if let Some(Value::String(s)) = obj.get_mut(*f) {
            if is_masked(s) {
                if let Some(orig) = str_field(stored, f) {
                    if mask_str(orig) == *s {
                        *s = orig.to_string();
                    }
                }
            }
        }
    }
    for f in SECRET_LIST_FIELDS {
        let originals: Vec<String> = stored
            .get(*f)
            .and_then(|v| v.as_array())
            .map(|a| {
                a.iter()
                    .filter_map(|x| x.as_str().map(String::from))
                    .collect()
            })
            .unwrap_or_default();
        if let Some(Value::Array(items)) = obj.get_mut(*f) {
            let mut used = vec![false; originals.len()];
            for it in items.iter_mut() {
                if let Value::String(s) = it {
                    if is_masked(s) {
                        if let Some((i, orig)) = originals
                            .iter()
                            .enumerate()
                            .find(|(i, o)| !used[*i] && mask_str(o) == *s)
                        {
                            used[i] = true;
                            *s = orig.clone();
                        }
                    }
                }
            }
        }
    }
    incoming
}

#[cfg(test)]
mod tests {
    use super::*;
    use serde_json::json;

    #[test]
    fn regions() {
        for ok in [
            "us-east-1",
            "ap-southeast-2",
            "us-gov-west-1",
            "eu-central-2",
            "cn-north-1",
            "ap-northeast-3",
        ] {
            assert!(is_valid_region(ok), "{ok}");
        }
        for bad in [
            "",
            "x.evil.com/#",
            "x@evil.example/",
            "us-east-1.evil.com",
            "US-EAST-1",
            "us-east",
            "us--1",
            "us-east-123",
            "us-east-1 ",
        ] {
            assert!(!is_valid_region(bad), "{bad}");
        }
    }

    #[test]
    fn rejects_credential_redirects() {
        let p = CredentialPolicy::permissive();
        assert!(validate_backend_config("bedrock", &json!({"region": "evil.com#"}), &p).is_err());
        assert!(validate_backend_config("bedrock", &json!({"region": "us-west-2"}), &p).is_ok());
        assert!(validate_backend_config(
            "openai",
            &json!({"api_keys": ["k"], "base_url": "http://x.example"}),
            &p
        )
        .is_err());
        assert!(validate_backend_config(
            "openai",
            &json!({"api_keys": ["k"], "base_url": "https://u:p@x.example"}),
            &p
        )
        .is_err());
        assert!(validate_backend_config(
            "openai",
            &json!({"api_keys": ["k"], "base_url": "https://relay.example/v1"}),
            &p
        )
        .is_ok());
        assert!(validate_backend_config("gemini", &json!({"api_keys": ["••••abcd"]}), &p).is_err());
    }

    #[test]
    fn credential_policy() {
        let strict = CredentialPolicy {
            allowed_profiles: Some(vec!["bedrock-only".into()]),
            allow_default_chain: false,
        };
        let ok_profile = json!({"region": "us-east-1", "profile": "bedrock-only"});
        let bad_profile = json!({"region": "us-east-1", "profile": "prod-admin"});
        let default_chain = json!({"region": "us-east-1"});
        let keys =
            json!({"region": "us-east-1", "access_key_id": "AKIA1", "secret_access_key": "s"});
        assert!(validate_backend_config("bedrock", &ok_profile, &strict).is_ok());
        assert!(validate_backend_config("bedrock", &bad_profile, &strict).is_err());
        assert!(validate_backend_config("bedrock", &default_chain, &strict).is_err());
        assert!(validate_backend_config("bedrock", &keys, &strict).is_ok());
        assert!(validate_backend_config(
            "bedrock",
            &default_chain,
            &CredentialPolicy::permissive()
        )
        .is_ok());
    }

    #[test]
    fn mask_and_merge_round_trip() {
        let stored = json!({
            "region": "us-east-1",
            "access_key_id": "AKIAABCDEFGH1234",
            "secret_access_key": "supersecretvalue9999",
            "api_keys": ["sk-aaaaaaaa1111", "sk-bbbbbbbb2222"],
        });
        let masked = mask_backend_config(&stored);
        assert_eq!(masked["secret_access_key"], "••••9999");
        assert_eq!(masked["api_keys"][1], "••••2222");
        assert_eq!(masked["region"], "us-east-1");
        assert!(!masked.to_string().contains("supersecret"));

        // Client edits region, keeps masked secrets, replaces one key, drops another.
        let mut edited = masked.clone();
        edited["region"] = json!("us-west-2");
        edited["api_keys"] = json!(["••••2222", "sk-newkey00003333"]);
        let merged = merge_masked(edited, &stored);
        assert_eq!(merged["secret_access_key"], "supersecretvalue9999");
        assert_eq!(merged["access_key_id"], "AKIAABCDEFGH1234");
        assert_eq!(
            merged["api_keys"],
            json!(["sk-bbbbbbbb2222", "sk-newkey00003333"])
        );
        assert_eq!(merged["region"], "us-west-2");
        assert!(
            validate_backend_config("bedrock", &merged, &CredentialPolicy::permissive()).is_ok()
        );

        // A placeholder that matches nothing stays masked → rejected.
        let unknown = merge_masked(json!({"api_keys": ["••••zzzz"]}), &stored);
        assert!(
            validate_backend_config("openai", &unknown, &CredentialPolicy::permissive()).is_err()
        );
    }
}
