//! AES-256-GCM encryption for credential storage
//!
//! Current format: `encrypted:v2:<base64(nonce + ciphertext + tag)>`, with the
//! row it belongs to (see [`backend_context`] / [`setting_context`]) bound in as
//! AEAD associated data — a ciphertext copied into another row fails to decrypt.
//!
//! The runtime reads v2 only ([`Encryptor::decrypt`]). Legacy formats — v1
//! `encrypted:<base64>` (no row binding) and plaintext (rows written while no
//! key was configured) — are rejected there; only the offline
//! `one-router migrate-secrets` command reads them
//! ([`Encryptor::decrypt_legacy`], see `database::secret_migration`) to rewrite
//! them as v2. The server refuses to start while any remain.
//!
//! When ENCRYPTION_KEY is not set, `encrypt` is a no-op (the server always has
//! a key; see `Settings::ensure_required_keys`).

use aes_gcm::{
    aead::{Aead, KeyInit, Payload},
    Aes256Gcm, Nonce,
};
use base64::{engine::general_purpose::STANDARD as BASE64, Engine};
use hkdf::Hkdf;
use sha2::Sha256;

const ENCRYPTED_PREFIX: &str = "encrypted:";
const V2_PREFIX: &str = "encrypted:v2:";
const AAD_DOMAIN: &str = "one-router:v2:";
const NONCE_LEN: usize = 12;

/// Associated-data context for a `backends.config` value.
pub fn backend_context(name: &str) -> String {
    format!("backend:{name}")
}

/// Associated-data context for a `system_settings.value`.
pub fn setting_context(key: &str) -> String {
    format!("setting:{key}")
}

/// Storage format of a stored secret value.
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum SecretFormat {
    /// Empty string (e.g. a disabled sensitive setting) — nothing to protect.
    Empty,
    Plaintext,
    V1,
    V2,
}

impl SecretFormat {
    pub fn of(value: &str) -> Self {
        if value.is_empty() {
            Self::Empty
        } else if value.starts_with(V2_PREFIX) {
            Self::V2
        } else if value.starts_with(ENCRYPTED_PREFIX) {
            Self::V1
        } else {
            Self::Plaintext
        }
    }

    pub fn label(self) -> &'static str {
        match self {
            Self::Empty => "empty",
            Self::Plaintext => "plaintext",
            Self::V1 => "v1",
            Self::V2 => "v2",
        }
    }

    /// Legacy format the runtime rejects (needs `one-router migrate-secrets`).
    pub fn is_legacy(self) -> bool {
        matches!(self, Self::Plaintext | Self::V1)
    }
}

/// Encryption helper.
///
/// If `key` is `None`, `encrypt` is a no-op and `decrypt` rejects every
/// non-empty value.
#[derive(Clone)]
pub struct Encryptor {
    cipher: Option<Aes256Gcm>,
}

impl Encryptor {
    /// Create an encryptor from an optional raw key string.
    /// The raw key is stretched via HKDF-SHA256 to produce a 256-bit AES key.
    pub fn new(raw_key: Option<&str>) -> Self {
        let cipher = raw_key.map(|key| {
            let hk = Hkdf::<Sha256>::new(Some(b"one-router-enc"), key.as_bytes());
            let mut okm = [0u8; 32];
            hk.expand(b"aes-256-gcm", &mut okm)
                .expect("HKDF expand failed");
            Aes256Gcm::new_from_slice(&okm).expect("Invalid AES key length")
        });
        Self { cipher }
    }

    /// Encrypt `plaintext` bound to `context`. Returns `encrypted:v2:<base64>`,
    /// or the original value if no key is configured.
    pub fn encrypt(&self, plaintext: &str, context: &str) -> String {
        let Some(ref cipher) = self.cipher else {
            return plaintext.to_string();
        };

        let nonce_bytes: [u8; NONCE_LEN] = rand::random();
        let aad = format!("{AAD_DOMAIN}{context}");
        let ciphertext = cipher
            .encrypt(
                Nonce::from_slice(&nonce_bytes),
                Payload {
                    msg: plaintext.as_bytes(),
                    aad: aad.as_bytes(),
                },
            )
            .expect("AES-GCM encryption failed");

        let mut combined = Vec::with_capacity(NONCE_LEN + ciphertext.len());
        combined.extend_from_slice(&nonce_bytes);
        combined.extend_from_slice(&ciphertext);

        format!("{V2_PREFIX}{}", BASE64.encode(&combined))
    }

    /// Decrypt a stored value for `context` — the runtime reader, **v2 only**.
    /// An empty value is returned as is (empty = unset / disabled); legacy v1
    /// ciphertexts and plaintext are rejected (`one-router migrate-secrets`).
    pub fn decrypt(&self, value: &str, context: &str) -> anyhow::Result<String> {
        match SecretFormat::of(value) {
            SecretFormat::Empty => Ok(String::new()),
            SecretFormat::V2 => self.decrypt_inner(value, context),
            legacy => anyhow::bail!(
                "stored secret is in the legacy {} format; stop the server, back up the \
                 database and run `one-router migrate-secrets`",
                legacy.label()
            ),
        }
    }

    /// Decrypt any supported format (v2, legacy v1, plaintext). Only for the
    /// offline `migrate-secrets` command — runtime readers use [`Self::decrypt`].
    pub fn decrypt_legacy(&self, value: &str, context: &str) -> anyhow::Result<String> {
        match SecretFormat::of(value) {
            SecretFormat::Empty | SecretFormat::Plaintext => Ok(value.to_string()),
            SecretFormat::V1 | SecretFormat::V2 => self.decrypt_inner(value, context),
        }
    }

    fn decrypt_inner(&self, value: &str, context: &str) -> anyhow::Result<String> {
        let (encoded, aad) = if let Some(rest) = value.strip_prefix(V2_PREFIX) {
            (rest, Some(format!("{AAD_DOMAIN}{context}")))
        } else if let Some(rest) = value.strip_prefix(ENCRYPTED_PREFIX) {
            (rest, None)
        } else {
            anyhow::bail!("value is not encrypted");
        };

        let Some(ref cipher) = self.cipher else {
            anyhow::bail!(
                "Encrypted value found but ENCRYPTION_KEY is not set. \
                 Cannot decrypt credentials."
            );
        };

        let combined = BASE64
            .decode(encoded)
            .map_err(|e| anyhow::anyhow!("Base64 decode error: {e}"))?;
        if combined.len() < NONCE_LEN {
            anyhow::bail!("Encrypted value too short");
        }
        let (nonce_bytes, ciphertext) = combined.split_at(NONCE_LEN);
        let nonce = Nonce::from_slice(nonce_bytes);

        let plaintext = match aad {
            Some(aad) => cipher.decrypt(
                nonce,
                Payload {
                    msg: ciphertext,
                    aad: aad.as_bytes(),
                },
            ),
            None => cipher.decrypt(nonce, ciphertext),
        }
        .map_err(|_| {
            anyhow::anyhow!(
                "AES-GCM decryption failed (wrong ENCRYPTION_KEY, or the value was \
                 written for a different row)"
            )
        })?;

        String::from_utf8(plaintext).map_err(|e| anyhow::anyhow!("UTF-8 decode error: {e}"))
    }

    /// Returns true if encryption is enabled.
    pub fn is_enabled(&self) -> bool {
        self.cipher.is_some()
    }

    /// Legacy v1 writer (no associated data) — tests only.
    #[cfg(test)]
    pub(crate) fn encrypt_v1_for_tests(&self, plaintext: &str) -> String {
        let cipher = self.cipher.as_ref().unwrap();
        let nonce_bytes: [u8; NONCE_LEN] = rand::random();
        let ct = cipher
            .encrypt(Nonce::from_slice(&nonce_bytes), plaintext.as_bytes())
            .unwrap();
        let mut combined = nonce_bytes.to_vec();
        combined.extend_from_slice(&ct);
        format!("{ENCRYPTED_PREFIX}{}", BASE64.encode(&combined))
    }
}

impl std::fmt::Debug for Encryptor {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        f.debug_struct("Encryptor")
            .field("enabled", &self.is_enabled())
            .finish()
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    const CTX: &str = "backend:test";

    #[test]
    fn test_roundtrip_with_key() {
        let enc = Encryptor::new(Some("my-secret-key"));
        let plaintext = "super-secret-api-key-12345";
        let encrypted = enc.encrypt(plaintext, CTX);
        assert!(encrypted.starts_with("encrypted:v2:"));
        assert_ne!(encrypted, plaintext);
        assert_eq!(enc.decrypt(&encrypted, CTX).unwrap(), plaintext);
        assert_eq!(SecretFormat::of(&encrypted), SecretFormat::V2);
    }

    #[test]
    fn test_ciphertext_bound_to_context() {
        let enc = Encryptor::new(Some("key"));
        let encrypted = enc.encrypt("secret", &backend_context("a"));
        assert!(enc.decrypt(&encrypted, &backend_context("b")).is_err());
        assert!(enc.decrypt(&encrypted, &setting_context("a")).is_err());
    }

    #[test]
    fn test_strict_decrypt_rejects_v1() {
        let enc = Encryptor::new(Some("key"));
        let v1 = enc.encrypt_v1_for_tests("old-secret");
        assert_eq!(SecretFormat::of(&v1), SecretFormat::V1);
        let err = enc.decrypt(&v1, CTX).unwrap_err().to_string();
        assert!(err.contains("migrate-secrets"), "{err}");
        // Only the migration path still reads it.
        assert_eq!(enc.decrypt_legacy(&v1, CTX).unwrap(), "old-secret");
    }

    #[test]
    fn test_strict_decrypt_rejects_plaintext() {
        let enc = Encryptor::new(Some("key"));
        assert!(enc.decrypt("not-encrypted-value", CTX).is_err());
        assert_eq!(
            enc.decrypt_legacy("not-encrypted-value", CTX).unwrap(),
            "not-encrypted-value"
        );
        assert_eq!(
            SecretFormat::of("not-encrypted-value"),
            SecretFormat::Plaintext
        );
        // Without a key plaintext is still rejected at runtime.
        assert!(Encryptor::new(None).decrypt("plain", CTX).is_err());
    }

    #[test]
    fn test_empty_value_allowed() {
        let enc = Encryptor::new(Some("key"));
        assert_eq!(enc.decrypt("", CTX).unwrap(), "");
        assert_eq!(SecretFormat::of(""), SecretFormat::Empty);
        assert!(!SecretFormat::Empty.is_legacy());
    }

    #[test]
    fn test_no_key_encrypt_passthrough() {
        let enc = Encryptor::new(None);
        assert_eq!(enc.encrypt("plain-api-key", CTX), "plain-api-key");
    }

    #[test]
    fn test_decrypt_without_key_fails() {
        let enc_with_key = Encryptor::new(Some("key"));
        let encrypted = enc_with_key.encrypt("secret", CTX);
        let enc_no_key = Encryptor::new(None);
        assert!(enc_no_key.decrypt(&encrypted, CTX).is_err());
    }

    #[test]
    fn test_different_encryptions_differ() {
        let enc = Encryptor::new(Some("key"));
        let e1 = enc.encrypt("same-value", CTX);
        let e2 = enc.encrypt("same-value", CTX);
        assert_ne!(e1, e2);
        assert_eq!(
            enc.decrypt(&e1, CTX).unwrap(),
            enc.decrypt(&e2, CTX).unwrap()
        );
    }
}
