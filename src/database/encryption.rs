//! AES-256-GCM encryption for credential storage
//!
//! Values are stored as `encrypted:<base64(nonce + ciphertext + tag)>`.
//! When ENCRYPTION_KEY is not set, values are stored in plaintext.

use aes_gcm::{
    aead::{Aead, KeyInit},
    Aes256Gcm, Nonce,
};
use base64::{engine::general_purpose::STANDARD as BASE64, Engine};
use hkdf::Hkdf;
use sha2::Sha256;

const ENCRYPTED_PREFIX: &str = "encrypted:";
const NONCE_LEN: usize = 12;

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

    /// Encrypt a plaintext value. Returns `encrypted:<base64>` or the original value if no key.
    pub fn encrypt(&self, plaintext: &str) -> String {
        let Some(ref cipher) = self.cipher else {
            return plaintext.to_string();
        };

        let nonce_bytes: [u8; NONCE_LEN] = rand::random();
        let nonce = Nonce::from_slice(&nonce_bytes);

        let ciphertext = cipher
            .encrypt(nonce, plaintext.as_bytes())
            .expect("AES-GCM encryption failed");

        let mut combined = Vec::with_capacity(NONCE_LEN + ciphertext.len());
        combined.extend_from_slice(&nonce_bytes);
        combined.extend_from_slice(&ciphertext);

        format!("{}{}", ENCRYPTED_PREFIX, BASE64.encode(&combined))
    }

    /// Decrypt a value. If it starts with `encrypted:`, decrypts; otherwise returns as-is.
    pub fn decrypt(&self, value: &str) -> anyhow::Result<String> {
        if !value.starts_with(ENCRYPTED_PREFIX) {
            return Ok(value.to_string());
        }

        let Some(ref cipher) = self.cipher else {
            anyhow::bail!(
                "Encrypted value found but ENCRYPTION_KEY is not set. \
                 Cannot decrypt credentials."
            );
        };

        let encoded = &value[ENCRYPTED_PREFIX.len()..];
        let combined = BASE64
            .decode(encoded)
            .map_err(|e| anyhow::anyhow!("Base64 decode error: {e}"))?;

        if combined.len() < NONCE_LEN {
            anyhow::bail!("Encrypted value too short");
        }

        let (nonce_bytes, ciphertext) = combined.split_at(NONCE_LEN);
        let nonce = Nonce::from_slice(nonce_bytes);

        let plaintext = cipher
            .decrypt(nonce, ciphertext)
            .map_err(|e| anyhow::anyhow!("AES-GCM decryption failed: {e}"))?;

        String::from_utf8(plaintext).map_err(|e| anyhow::anyhow!("UTF-8 decode error: {e}"))
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

    #[test]
    fn test_roundtrip_with_key() {
        let enc = Encryptor::new(Some("my-secret-key"));
        let plaintext = "super-secret-api-key-12345";
        let encrypted = enc.encrypt(plaintext);
        assert!(encrypted.starts_with("encrypted:"));
        assert_ne!(encrypted, plaintext);

        let decrypted = enc.decrypt(&encrypted).unwrap();
        assert_eq!(decrypted, plaintext);
    }

    #[test]
    fn test_no_key_passthrough() {
        let enc = Encryptor::new(None);
        let value = "plain-api-key";
        let encrypted = enc.encrypt(value);
        assert_eq!(encrypted, value);
        assert!(!encrypted.starts_with("encrypted:"));

        let decrypted = enc.decrypt(value).unwrap();
        assert_eq!(decrypted, value);
    }

    #[test]
    fn test_decrypt_plaintext_passthrough() {
        let enc = Encryptor::new(Some("key"));
        let result = enc.decrypt("not-encrypted-value").unwrap();
        assert_eq!(result, "not-encrypted-value");
    }

    #[test]
    fn test_decrypt_without_key_fails() {
        let enc_with_key = Encryptor::new(Some("key"));
        let encrypted = enc_with_key.encrypt("secret");

        let enc_no_key = Encryptor::new(None);
        let result = enc_no_key.decrypt(&encrypted);
        assert!(result.is_err());
    }

    #[test]
    fn test_different_encryptions_differ() {
        let enc = Encryptor::new(Some("key"));
        let e1 = enc.encrypt("same-value");
        let e2 = enc.encrypt("same-value");
        // Different nonces → different ciphertexts
        assert_ne!(e1, e2);
        // But both decrypt to the same value
        assert_eq!(enc.decrypt(&e1).unwrap(), enc.decrypt(&e2).unwrap());
    }
}
