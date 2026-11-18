//! AES-256-GCM encryption for credential storage
//!
//! Current format: `encrypted:v2:<base64(nonce + ciphertext + tag)>`, with the
//! row it belongs to (see [`backend_context`] / [`setting_context`]) bound in as
//! AEAD associated data — a ciphertext copied into another row fails to decrypt.
//!
//! Still readable: legacy `encrypted:<base64>` (v1, no binding) and plaintext
//! (rows written while no key was configured). [`Encryptor::needs_upgrade`]
//! flags both; the startup migration (`server::app::upgrade_stored_secrets`)
//! rewrites them in the current format.
//!
//! When ENCRYPTION_KEY is not set, values are stored in plaintext.

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

/// Encryption helper.
///
/// If `key` is `None`, encrypt/decrypt are no-ops (plaintext passthrough).
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

    /// Decrypt a stored value for `context`. v2 values must have been written
    /// for the same context; legacy v1 values and plaintext are accepted.
    pub fn decrypt(&self, value: &str, context: &str) -> anyhow::Result<String> {
        let (encoded, aad) = if let Some(rest) = value.strip_prefix(V2_PREFIX) {
            (rest, Some(format!("{AAD_DOMAIN}{context}")))
        } else if let Some(rest) = value.strip_prefix(ENCRYPTED_PREFIX) {
            (rest, None)
        } else {
            return Ok(value.to_string());
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

    /// True when encryption is enabled and `value` is not in the current
    /// format (plaintext or legacy v1). Empty values are left alone.
    pub fn needs_upgrade(&self, value: &str) -> bool {
        self.cipher.is_some() && !value.is_empty() && !value.starts_with(V2_PREFIX)
    }

    /// Returns true if encryption is enabled.
    pub fn is_enabled(&self) -> bool {
        self.cipher.is_some()
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

    /// Legacy v1 writer (no associated data), kept for compatibility tests.
    fn encrypt_v1(enc: &Encryptor, plaintext: &str) -> String {
        let cipher = enc.cipher.as_ref().unwrap();
        let nonce_bytes: [u8; NONCE_LEN] = rand::random();
        let ct = cipher
            .encrypt(Nonce::from_slice(&nonce_bytes), plaintext.as_bytes())
            .unwrap();
        let mut combined = nonce_bytes.to_vec();
        combined.extend_from_slice(&ct);
        format!("{ENCRYPTED_PREFIX}{}", BASE64.encode(&combined))
    }

    #[test]
    fn test_roundtrip_with_key() {
        let enc = Encryptor::new(Some("my-secret-key"));
        let plaintext = "super-secret-api-key-12345";
        let encrypted = enc.encrypt(plaintext, CTX);
        assert!(encrypted.starts_with("encrypted:v2:"));
        assert_ne!(encrypted, plaintext);
        assert_eq!(enc.decrypt(&encrypted, CTX).unwrap(), plaintext);
        assert!(!enc.needs_upgrade(&encrypted));
    }

    #[test]
    fn test_ciphertext_bound_to_context() {
        let enc = Encryptor::new(Some("key"));
        let encrypted = enc.encrypt("secret", &backend_context("a"));
        assert!(enc.decrypt(&encrypted, &backend_context("b")).is_err());
        assert!(enc.decrypt(&encrypted, &setting_context("a")).is_err());
    }

    #[test]
    fn test_legacy_v1_still_decrypts_and_needs_upgrade() {
        let enc = Encryptor::new(Some("key"));
        let v1 = encrypt_v1(&enc, "old-secret");
        assert_eq!(enc.decrypt(&v1, CTX).unwrap(), "old-secret");
        assert!(enc.needs_upgrade(&v1));
    }

    #[test]
    fn test_no_key_passthrough() {
        let enc = Encryptor::new(None);
        let value = "plain-api-key";
        let encrypted = enc.encrypt(value, CTX);
        assert_eq!(encrypted, value);
        assert_eq!(enc.decrypt(value, CTX).unwrap(), value);
        assert!(!enc.needs_upgrade(value));
    }

    #[test]
    fn test_decrypt_plaintext_passthrough_and_needs_upgrade() {
        let enc = Encryptor::new(Some("key"));
        let result = enc.decrypt("not-encrypted-value", CTX).unwrap();
        assert_eq!(result, "not-encrypted-value");
        assert!(enc.needs_upgrade("not-encrypted-value"));
        assert!(!enc.needs_upgrade(""));
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
