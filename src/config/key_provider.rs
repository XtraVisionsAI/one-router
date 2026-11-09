//! `ENCRYPTION_KEY` sources.
//!
//! The value of `ENCRYPTION_KEY` is either the key itself (legacy plaintext)
//! or a reference that is resolved once at startup:
//!
//! | Value | Resolution |
//! |---|---|
//! | `aws-kms:<region>:<base64 ciphertext>` | AWS KMS `Decrypt` (SigV4, default credential chain — instance / task / pod role) |
//! | `vault-transit:<key>:<vault:v1:…>` | HashiCorp Vault / OpenBao Transit `decrypt` (`VAULT_ADDR`, `VAULT_TOKEN` or Kubernetes auth) |
//! | `systemd-creds:<name>` | `$CREDENTIALS_DIRECTORY/<name>` (systemd `LoadCredentialEncrypted=`, TPM-bound) |
//! | `raw:<value>` | `<value>` verbatim (escape hatch for a plaintext key that contains `:`) |
//! | anything without a `scheme:` prefix | plaintext (legacy; a startup warning is logged) |
//!
//! A value that *looks* like a scheme (`^[a-z][a-z0-9-]*:`) but names no known
//! provider is a hard error: a typo such as `aws_kms:` must never silently
//! become the encryption key (which would make every stored credential
//! undecryptable and encrypt new ones with the wrong key).
//!
//! The decrypted value is exactly the original `ENCRYPTION_KEY` string, so
//! existing ciphertexts and API-key HMACs stay valid. KMS ciphertexts are bound
//! to an encryption context (`app=one-router, purpose=ENCRYPTION_KEY`), which
//! also appears in CloudTrail.

use base64::Engine;
use serde_json::{json, Value};
use std::time::Duration;

const B64: base64::engine::general_purpose::GeneralPurpose =
    base64::engine::general_purpose::STANDARD;

const HTTP_TIMEOUT: Duration = Duration::from_secs(10);

/// Parsed `ENCRYPTION_KEY` value.
#[derive(Clone, PartialEq, Eq)]
pub enum KeySource {
    /// Legacy plaintext (no scheme).
    Plain(String),
    /// `raw:` — explicit plaintext.
    Raw(String),
    AwsKms {
        region: String,
        blob: String,
    },
    VaultTransit {
        key: String,
        ciphertext: String,
    },
    SystemdCreds {
        name: String,
    },
}

impl std::fmt::Debug for KeySource {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            Self::Plain(_) => f.write_str("Plain(<redacted>)"),
            Self::Raw(_) => f.write_str("Raw(<redacted>)"),
            Self::AwsKms { region, .. } => write!(f, "AwsKms({region})"),
            Self::VaultTransit { key, .. } => write!(f, "VaultTransit({key})"),
            Self::SystemdCreds { name } => write!(f, "SystemdCreds({name})"),
        }
    }
}

fn scheme_like(prefix: &str) -> bool {
    !prefix.is_empty()
        && prefix.len() <= 32
        && prefix.as_bytes()[0].is_ascii_lowercase()
        && prefix
            .bytes()
            .all(|b| b.is_ascii_lowercase() || b.is_ascii_digit() || b == b'-')
}

fn valid_name(s: &str) -> bool {
    !s.is_empty()
        && s.len() <= 128
        && s.bytes()
            .all(|b| b.is_ascii_alphanumeric() || matches!(b, b'_' | b'-' | b'.'))
        && s != "."
        && s != ".."
}

impl KeySource {
    pub fn parse(value: &str) -> Result<Self, String> {
        let Some((scheme, rest)) = value.split_once(':') else {
            return Ok(Self::Plain(value.to_string()));
        };
        if !scheme_like(scheme) {
            return Ok(Self::Plain(value.to_string()));
        }
        match scheme {
            "raw" => {
                if rest.is_empty() {
                    return Err("ENCRYPTION_KEY 'raw:' has an empty value".into());
                }
                Ok(Self::Raw(rest.to_string()))
            }
            "aws-kms" => {
                let (region, blob) = rest.split_once(':').ok_or(
                    "ENCRYPTION_KEY 'aws-kms:' must be 'aws-kms:<region>:<base64 ciphertext>'",
                )?;
                if !crate::services::backend_pool::secure_config::is_valid_region(region) {
                    return Err(format!(
                        "ENCRYPTION_KEY 'aws-kms:' has an invalid region '{region}'"
                    ));
                }
                if B64.decode(blob).map(|b| b.is_empty()).unwrap_or(true) {
                    return Err("ENCRYPTION_KEY 'aws-kms:' ciphertext is not valid base64".into());
                }
                Ok(Self::AwsKms {
                    region: region.to_string(),
                    blob: blob.to_string(),
                })
            }
            "vault-transit" => {
                let (key, ciphertext) = rest.split_once(':').ok_or(
                    "ENCRYPTION_KEY 'vault-transit:' must be 'vault-transit:<key>:<vault:v1:…>'",
                )?;
                if !valid_name(key) {
                    return Err(format!(
                        "ENCRYPTION_KEY 'vault-transit:' has an invalid key name '{key}'"
                    ));
                }
                if !ciphertext.starts_with("vault:v") {
                    return Err(
                        "ENCRYPTION_KEY 'vault-transit:' ciphertext must start with 'vault:v'"
                            .into(),
                    );
                }
                Ok(Self::VaultTransit {
                    key: key.to_string(),
                    ciphertext: ciphertext.to_string(),
                })
            }
            "systemd-creds" => {
                if !valid_name(rest) {
                    return Err(format!(
                        "ENCRYPTION_KEY 'systemd-creds:' has an invalid credential name '{rest}'"
                    ));
                }
                Ok(Self::SystemdCreds {
                    name: rest.to_string(),
                })
            }
            other => Err(format!(
                "ENCRYPTION_KEY uses unknown provider '{other}:' (known: aws-kms, vault-transit, \
                 systemd-creds, raw). If the key itself contains ':', write it as 'raw:<key>'"
            )),
        }
    }

    pub fn label(&self) -> &'static str {
        match self {
            Self::Plain(_) => "plaintext",
            Self::Raw(_) => "raw",
            Self::AwsKms { .. } => "aws-kms",
            Self::VaultTransit { .. } => "vault-transit",
            Self::SystemdCreds { .. } => "systemd-creds",
        }
    }

    pub fn is_plaintext(&self) -> bool {
        matches!(self, Self::Plain(_) | Self::Raw(_))
    }
}

/// Resolve an `ENCRYPTION_KEY` value to the key. Fails closed: any provider
/// error aborts startup — there is no fallback key.
pub async fn resolve(value: &str) -> Result<(String, KeySource), String> {
    let source = KeySource::parse(value)?;
    let key = match &source {
        KeySource::Plain(v) | KeySource::Raw(v) => v.clone(),
        KeySource::AwsKms { region, blob } => kms_decrypt(region, blob).await?,
        KeySource::VaultTransit { key, ciphertext } => vault_decrypt(key, ciphertext).await?,
        KeySource::SystemdCreds { name } => systemd_credential(name)?,
    };
    if key.is_empty() {
        return Err(format!("ENCRYPTION_KEY from {} is empty", source.label()));
    }
    if !source.is_plaintext() {
        // A wrapped reference must not unwrap to another reference.
        if let Ok(inner) = KeySource::parse(&key) {
            if !inner.is_plaintext() {
                return Err(format!(
                    "ENCRYPTION_KEY from {} decrypts to another provider reference",
                    source.label()
                ));
            }
        }
    }
    Ok((key, source))
}

fn http_client() -> Result<reqwest::Client, String> {
    reqwest::Client::builder()
        .timeout(HTTP_TIMEOUT)
        .redirect(reqwest::redirect::Policy::none())
        .build()
        .map_err(|e| format!("HTTP client: {e}"))
}

fn utf8(bytes: Vec<u8>, what: &str) -> Result<String, String> {
    String::from_utf8(bytes).map_err(|_| format!("{what}: decrypted key is not valid UTF-8"))
}

// ---------------------------------------------------------------- systemd

fn systemd_credential(name: &str) -> Result<String, String> {
    let dir = std::env::var("CREDENTIALS_DIRECTORY").map_err(|_| {
        "ENCRYPTION_KEY=systemd-creds:… but $CREDENTIALS_DIRECTORY is not set (run under systemd \
         with LoadCredentialEncrypted=)"
            .to_string()
    })?;
    let path = std::path::Path::new(&dir).join(name);
    let raw = std::fs::read(&path).map_err(|e| format!("systemd credential '{name}': {e}"))?;
    let mut s = utf8(raw, "systemd credential")?;
    while s.ends_with('\n') || s.ends_with('\r') {
        s.pop();
    }
    Ok(s)
}

// ---------------------------------------------------------------- AWS KMS

fn kms_context() -> Value {
    json!({"app": "one-router", "purpose": "ENCRYPTION_KEY"})
}

fn kms_host(region: &str) -> String {
    if region.starts_with("cn-") {
        format!("kms.{region}.amazonaws.com.cn")
    } else {
        format!("kms.{region}.amazonaws.com")
    }
}

async fn aws_credentials(region: &str) -> Result<aws_credential_types::Credentials, String> {
    use aws_credential_types::provider::ProvideCredentials;
    let cfg = aws_config::defaults(aws_config::BehaviorVersion::latest())
        .region(aws_config::Region::new(region.to_string()))
        .load()
        .await;
    let provider = cfg
        .credentials_provider()
        .ok_or("no AWS credentials provider available")?;
    provider
        .provide_credentials()
        .await
        .map_err(|e| format!("AWS credentials: {e}"))
}

/// Signed KMS JSON-protocol call (`TrentService.<op>`).
async fn kms_call_at(
    url: &str,
    host: &str,
    region: &str,
    creds: aws_credential_types::Credentials,
    op: &str,
    body: &Value,
) -> Result<Value, String> {
    use aws_sigv4::http_request::{sign, SignableBody, SignableRequest, SigningSettings};
    use aws_sigv4::sign::v4;

    let body = serde_json::to_vec(body).map_err(|e| e.to_string())?;
    let target = format!("TrentService.{op}");
    let identity: aws_smithy_runtime_api::client::identity::Identity = creds.into();
    let params = v4::SigningParams::builder()
        .identity(&identity)
        .region(region)
        .name("kms")
        .time(std::time::SystemTime::now())
        .settings(SigningSettings::default())
        .build()
        .map_err(|e| e.to_string())?
        .into();
    let headers = [
        ("host", host),
        ("content-type", "application/x-amz-json-1.1"),
        ("x-amz-target", target.as_str()),
    ];
    let signable = SignableRequest::new(
        "POST",
        url,
        headers.iter().copied(),
        SignableBody::Bytes(&body),
    )
    .map_err(|e| e.to_string())?;
    let (instructions, _) = sign(signable, &params)
        .map_err(|e| e.to_string())?
        .into_parts();

    let mut req = http_client()?
        .post(url)
        .header("content-type", "application/x-amz-json-1.1")
        .header("x-amz-target", &target)
        .body(body);
    for (name, value) in instructions.headers() {
        if !name.eq_ignore_ascii_case("host") {
            req = req.header(name, value);
        }
    }
    let resp = req
        .send()
        .await
        .map_err(|e| format!("KMS {op}: {}", e.without_url()))?;
    let status = resp.status();
    let v: Value = resp.json().await.unwrap_or(Value::Null);
    if !status.is_success() {
        let kind = v["__type"].as_str().unwrap_or("error");
        let msg = v["message"]
            .as_str()
            .or_else(|| v["Message"].as_str())
            .unwrap_or("");
        return Err(format!("KMS {op} failed ({status}): {kind} {msg}"));
    }
    Ok(v)
}

async fn kms_call(region: &str, op: &str, body: &Value) -> Result<Value, String> {
    let host = kms_host(region);
    let url = format!("https://{host}/");
    let creds = aws_credentials(region).await?;
    kms_call_at(&url, &host, region, creds, op, body).await
}

async fn kms_decrypt(region: &str, blob: &str) -> Result<String, String> {
    let v = kms_call(
        region,
        "Decrypt",
        &json!({"CiphertextBlob": blob, "EncryptionContext": kms_context()}),
    )
    .await?;
    let pt = v["Plaintext"]
        .as_str()
        .ok_or("KMS Decrypt: response has no Plaintext")?;
    utf8(
        B64.decode(pt).map_err(|e| format!("KMS Decrypt: {e}"))?,
        "KMS Decrypt",
    )
}

async fn kms_encrypt(region: &str, key_id: &str, plaintext: &str) -> Result<String, String> {
    let v = kms_call(
        region,
        "Encrypt",
        &json!({
            "KeyId": key_id,
            "Plaintext": B64.encode(plaintext.as_bytes()),
            "EncryptionContext": kms_context(),
        }),
    )
    .await?;
    v["CiphertextBlob"]
        .as_str()
        .map(String::from)
        .ok_or_else(|| "KMS Encrypt: response has no CiphertextBlob".into())
}

/// Region of a KMS key ARN (`arn:<partition>:kms:<region>:…`).
pub fn region_from_key_arn(key_id: &str) -> Option<String> {
    let mut parts = key_id.split(':');
    (parts.next()? == "arn").then_some(())?;
    parts.next()?;
    (parts.next()? == "kms").then_some(())?;
    let region = parts.next()?;
    crate::services::backend_pool::secure_config::is_valid_region(region)
        .then(|| region.to_string())
}

// ---------------------------------------------------------------- Vault

struct VaultCfg {
    addr: String,
    mount: String,
    namespace: Option<String>,
    client: reqwest::Client,
}

fn vault_cfg() -> Result<VaultCfg, String> {
    let addr = std::env::var("VAULT_ADDR")
        .map_err(|_| "ENCRYPTION_KEY=vault-transit:… requires VAULT_ADDR".to_string())?;
    let url = reqwest::Url::parse(&addr).map_err(|e| format!("VAULT_ADDR: {e}"))?;
    let loopback = matches!(
        url.host_str(),
        Some("127.0.0.1") | Some("localhost") | Some("[::1]") | Some("::1")
    );
    if url.scheme() != "https" && !(url.scheme() == "http" && loopback) {
        return Err("VAULT_ADDR must use https (http only for a loopback address)".into());
    }
    if !url.username().is_empty() || url.password().is_some() {
        return Err("VAULT_ADDR must not contain credentials".into());
    }
    let mount = std::env::var("VAULT_TRANSIT_MOUNT").unwrap_or_else(|_| "transit".into());
    if mount.is_empty() || !mount.split('/').all(valid_name) {
        return Err(format!("VAULT_TRANSIT_MOUNT '{mount}' is invalid"));
    }
    let mut builder = reqwest::Client::builder()
        .timeout(HTTP_TIMEOUT)
        .redirect(reqwest::redirect::Policy::none());
    if let Ok(ca) = std::env::var("VAULT_CACERT") {
        let pem = std::fs::read(&ca).map_err(|e| format!("VAULT_CACERT: {e}"))?;
        let cert =
            reqwest::Certificate::from_pem(&pem).map_err(|e| format!("VAULT_CACERT: {e}"))?;
        builder = builder.add_root_certificate(cert);
    }
    Ok(VaultCfg {
        addr: addr.trim_end_matches('/').to_string(),
        mount,
        namespace: std::env::var("VAULT_NAMESPACE")
            .ok()
            .filter(|s| !s.is_empty()),
        client: builder.build().map_err(|e| format!("HTTP client: {e}"))?,
    })
}

impl VaultCfg {
    fn post(&self, path: &str) -> reqwest::RequestBuilder {
        let mut req = self.client.post(format!("{}/v1/{path}", self.addr));
        if let Some(ns) = &self.namespace {
            req = req.header("X-Vault-Namespace", ns);
        }
        req
    }

    async fn send(&self, req: reqwest::RequestBuilder, what: &str) -> Result<Value, String> {
        let resp = req
            .send()
            .await
            .map_err(|e| format!("Vault {what}: {}", e.without_url()))?;
        let status = resp.status();
        let v: Value = resp.json().await.unwrap_or(Value::Null);
        if !status.is_success() {
            let errs = v["errors"]
                .as_array()
                .map(|a| {
                    a.iter()
                        .filter_map(|e| e.as_str())
                        .collect::<Vec<_>>()
                        .join("; ")
                })
                .unwrap_or_default();
            return Err(format!("Vault {what} failed ({status}): {errs}"));
        }
        Ok(v)
    }

    /// `VAULT_TOKEN`, else Kubernetes auth (`VAULT_K8S_ROLE`).
    async fn token(&self) -> Result<String, String> {
        if let Ok(t) = std::env::var("VAULT_TOKEN") {
            if !t.is_empty() {
                return Ok(t);
            }
        }
        let role = std::env::var("VAULT_K8S_ROLE").map_err(|_| {
            "Vault auth: set VAULT_TOKEN or VAULT_K8S_ROLE (Kubernetes auth)".to_string()
        })?;
        let mount = std::env::var("VAULT_K8S_MOUNT").unwrap_or_else(|_| "kubernetes".into());
        if !mount.split('/').all(valid_name) {
            return Err(format!("VAULT_K8S_MOUNT '{mount}' is invalid"));
        }
        let jwt_path = std::env::var("VAULT_K8S_TOKEN_PATH")
            .unwrap_or_else(|_| "/var/run/secrets/kubernetes.io/serviceaccount/token".into());
        let jwt = std::fs::read_to_string(&jwt_path)
            .map_err(|e| format!("Vault Kubernetes auth: reading {jwt_path}: {e}"))?;
        let v = self
            .send(
                self.post(&format!("auth/{mount}/login"))
                    .json(&json!({"role": role, "jwt": jwt.trim()})),
                "login",
            )
            .await?;
        v["auth"]["client_token"]
            .as_str()
            .map(String::from)
            .ok_or_else(|| "Vault login: response has no client_token".into())
    }

    async fn transit(&self, op: &str, key: &str, body: Value) -> Result<Value, String> {
        let token = self.token().await?;
        self.send(
            self.post(&format!("{}/{op}/{key}", self.mount))
                .header("X-Vault-Token", token)
                .json(&body),
            op,
        )
        .await
    }
}

async fn vault_decrypt(key: &str, ciphertext: &str) -> Result<String, String> {
    let cfg = vault_cfg()?;
    let v = cfg
        .transit("decrypt", key, json!({"ciphertext": ciphertext}))
        .await?;
    let pt = v["data"]["plaintext"]
        .as_str()
        .ok_or("Vault decrypt: response has no plaintext")?;
    utf8(
        B64.decode(pt).map_err(|e| format!("Vault decrypt: {e}"))?,
        "Vault decrypt",
    )
}

async fn vault_encrypt(key: &str, plaintext: &str) -> Result<String, String> {
    let cfg = vault_cfg()?;
    let v = cfg
        .transit(
            "encrypt",
            key,
            json!({"plaintext": B64.encode(plaintext.as_bytes())}),
        )
        .await?;
    v["data"]["ciphertext"]
        .as_str()
        .map(String::from)
        .ok_or_else(|| "Vault encrypt: response has no ciphertext".into())
}

// ---------------------------------------------------------------- wrapping

/// Where `one-router wrap-key` should wrap the key.
#[derive(Debug, Clone)]
pub enum WrapTarget {
    AwsKms { key_id: String, region: String },
    VaultTransit { key: String },
}

/// Wrap `plaintext` and return the new `ENCRYPTION_KEY` value. The result is
/// verified by resolving it and comparing with `plaintext`.
pub async fn wrap(target: &WrapTarget, plaintext: &str) -> Result<String, String> {
    let value = match target {
        WrapTarget::AwsKms { key_id, region } => {
            if !crate::services::backend_pool::secure_config::is_valid_region(region) {
                return Err(format!("invalid AWS region '{region}'"));
            }
            format!(
                "aws-kms:{region}:{}",
                kms_encrypt(region, key_id, plaintext).await?
            )
        }
        WrapTarget::VaultTransit { key } => {
            if !valid_name(key) {
                return Err(format!("invalid Vault key name '{key}'"));
            }
            format!(
                "vault-transit:{key}:{}",
                vault_encrypt(key, plaintext).await?
            )
        }
    };
    let (roundtrip, _) = resolve(&value).await?;
    if roundtrip != plaintext {
        return Err("wrapped key did not decrypt back to the original".into());
    }
    Ok(value)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn parse_sources() {
        let hex = "0123456789abcdef".repeat(4);
        assert_eq!(
            KeySource::parse(&hex).unwrap(),
            KeySource::Plain(hex.clone())
        );
        // Not scheme-shaped → still legacy plaintext.
        assert!(KeySource::parse("Ab:cd").unwrap().is_plaintext());
        assert!(KeySource::parse("9x:cd").unwrap().is_plaintext());
        assert_eq!(
            KeySource::parse("raw:a:b").unwrap(),
            KeySource::Raw("a:b".into())
        );
        assert_eq!(
            KeySource::parse("aws-kms:us-east-1:AQID").unwrap(),
            KeySource::AwsKms {
                region: "us-east-1".into(),
                blob: "AQID".into()
            }
        );
        assert_eq!(
            KeySource::parse("vault-transit:one-router:vault:v1:abc").unwrap(),
            KeySource::VaultTransit {
                key: "one-router".into(),
                ciphertext: "vault:v1:abc".into()
            }
        );
        assert_eq!(
            KeySource::parse("systemd-creds:one-router-key").unwrap(),
            KeySource::SystemdCreds {
                name: "one-router-key".into()
            }
        );
    }

    #[test]
    fn parse_rejects_typos_and_bad_payloads() {
        // '_' is outside the scheme alphabet, so this is (legacy) plaintext;
        // typos *within* the alphabet are the dangerous ones and must error.
        assert!(KeySource::parse("aws_kms:us-east-1:AQID")
            .unwrap()
            .is_plaintext());
        for bad in [
            "awskms:us-east-1:AQID",
            "kms:AQID",
            "sha256:abcd",
            "aws-kms:AQID",
            "aws-kms:evil.com:AQID",
            "aws-kms:us-east-1:not base64!",
            "vault-transit:k:notvault",
            "vault-transit:../x:vault:v1:a",
            "systemd-creds:../etc/passwd",
            "systemd-creds:",
            "raw:",
        ] {
            assert!(KeySource::parse(bad).is_err(), "{bad}");
        }
    }

    #[test]
    fn debug_is_redacted() {
        let s = format!("{:?}", KeySource::Plain("supersecret".into()));
        assert!(!s.contains("supersecret"));
    }

    #[test]
    fn arn_region() {
        assert_eq!(
            region_from_key_arn("arn:aws:kms:ap-northeast-1:123456789012:key/abc").as_deref(),
            Some("ap-northeast-1")
        );
        assert_eq!(region_from_key_arn("alias/one-router"), None);
        assert_eq!(region_from_key_arn("arn:aws:s3:::bucket"), None);
        assert_eq!(kms_host("cn-north-1"), "kms.cn-north-1.amazonaws.com.cn");
    }

    #[tokio::test]
    async fn plaintext_and_systemd_resolution() {
        let (k, src) = resolve("raw:x:y").await.unwrap();
        assert_eq!((k.as_str(), src.label()), ("x:y", "raw"));
        assert!(resolve("bogus-provider:x").await.is_err());
    }

    #[test]
    fn systemd_reads_credentials_directory() {
        let dir = tempfile::tempdir().unwrap();
        std::fs::write(dir.path().join("enc"), "the-key\n").unwrap();
        // Single test touching this env var.
        std::env::set_var("CREDENTIALS_DIRECTORY", dir.path());
        assert_eq!(systemd_credential("enc").unwrap(), "the-key");
        assert!(systemd_credential("missing").is_err());
        std::env::remove_var("CREDENTIALS_DIRECTORY");
        assert!(systemd_credential("enc").is_err());
    }

    /// KMS request shape + response parsing against a loopback mock.
    #[tokio::test]
    async fn kms_call_is_signed_and_parsed() {
        use axum::{http::HeaderMap, routing::post, Router};
        let app = Router::new().route(
            "/",
            post(|headers: HeaderMap, body: String| async move {
                let ok = headers
                    .get("x-amz-target")
                    .is_some_and(|v| v == "TrentService.Decrypt")
                    && headers
                        .get("authorization")
                        .and_then(|v| v.to_str().ok())
                        .is_some_and(|v| {
                            v.starts_with("AWS4-HMAC-SHA256 Credential=AKIDTEST/")
                                && v.contains("/us-east-1/kms/aws4_request")
                        })
                    && headers.get("x-amz-security-token").is_some()
                    && body.contains("\"EncryptionContext\"");
                if ok {
                    (
                        axum::http::StatusCode::OK,
                        r#"{"Plaintext":"c2VjcmV0LWtleQ=="}"#.to_string(),
                    )
                } else {
                    (
                        axum::http::StatusCode::BAD_REQUEST,
                        r#"{"__type":"InvalidSignatureException","message":"bad"}"#.to_string(),
                    )
                }
            }),
        );
        let listener = tokio::net::TcpListener::bind("127.0.0.1:0").await.unwrap();
        let addr = listener.local_addr().unwrap();
        tokio::spawn(async move { axum::serve(listener, app).await.unwrap() });

        let creds = aws_credential_types::Credentials::new(
            "AKIDTEST",
            "secret",
            Some("token".into()),
            None,
            "test",
        );
        let host = addr.to_string();
        let v = kms_call_at(
            &format!("http://{host}/"),
            &host,
            "us-east-1",
            creds,
            "Decrypt",
            &json!({"CiphertextBlob": "AQID", "EncryptionContext": kms_context()}),
        )
        .await
        .unwrap();
        assert_eq!(v["Plaintext"], "c2VjcmV0LWtleQ==");
    }

    /// Vault Transit wrap → resolve round trip against a loopback mock.
    #[tokio::test]
    async fn vault_wrap_round_trip() {
        use axum::{extract::Path, http::HeaderMap, routing::post, Json, Router};
        let app = Router::new().route(
            "/v1/transit/:op/:key",
            post(
                |Path((op, key)): Path<(String, String)>,
                 headers: HeaderMap,
                 Json(body): Json<Value>| async move {
                    assert_eq!(key, "one-router");
                    assert_eq!(headers.get("x-vault-token").unwrap(), "test-token");
                    let data = match op.as_str() {
                        "encrypt" => json!({"ciphertext": format!(
                            "vault:v1:{}", body["plaintext"].as_str().unwrap())}),
                        _ => json!({"plaintext": body["ciphertext"].as_str().unwrap()
                            .trim_start_matches("vault:v1:")}),
                    };
                    Json(json!({"data": data}))
                },
            ),
        );
        let listener = tokio::net::TcpListener::bind("127.0.0.1:0").await.unwrap();
        let addr = listener.local_addr().unwrap();
        tokio::spawn(async move { axum::serve(listener, app).await.unwrap() });
        // Single test touching the VAULT_* variables.
        std::env::set_var("VAULT_ADDR", format!("http://{addr}"));
        std::env::set_var("VAULT_TOKEN", "test-token");
        let target = WrapTarget::VaultTransit {
            key: "one-router".into(),
        };
        let wrapped = wrap(&target, "my-legacy-key").await.unwrap();
        assert!(wrapped.starts_with("vault-transit:one-router:vault:v1:"));
        let (k, src) = resolve(&wrapped).await.unwrap();
        assert_eq!(
            (k.as_str(), src.label()),
            ("my-legacy-key", "vault-transit")
        );
        std::env::set_var("VAULT_ADDR", "http://vault.example:8200");
        assert!(resolve(&wrapped).await.unwrap_err().contains("https"));
        std::env::remove_var("VAULT_ADDR");
        std::env::remove_var("VAULT_TOKEN");
    }
}
