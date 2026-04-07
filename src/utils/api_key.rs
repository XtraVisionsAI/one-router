//! API key hashing and display masking utilities.

use hmac::{Hmac, Mac};
use sha2::Sha256;

type HmacSha256 = Hmac<Sha256>;

/// Default HMAC secret used when ENCRYPTION_KEY is not set.
const DEFAULT_SECRET: &[u8] = b"one-router-api-key-hash";

/// Hash an API key using HMAC-SHA256. Returns hex-encoded hash (64 chars).
///
/// When `secret` is Some, uses it as HMAC key (derived from ENCRYPTION_KEY).
/// When None, uses a built-in constant (still hashed, but not keyed).
pub fn hash_key(api_key: &str, secret: Option<&str>) -> String {
    let hmac_key = secret.map(|s| s.as_bytes()).unwrap_or(DEFAULT_SECRET);
    let mut mac = HmacSha256::new_from_slice(hmac_key).expect("HMAC accepts any key length");
    mac.update(api_key.as_bytes());
    hex::encode(mac.finalize().into_bytes())
}

/// Produce a middle-masked display string for an API key.
///
/// `sk-abcd1234efgh5678` → `sk-abcd••••5678`
///
/// Shows prefix (sk- + first 4 hex chars) and last 4 chars, masks the middle.
pub fn mask_key(api_key: &str) -> String {
    if let Some(hex_part) = api_key.strip_prefix("sk-") {
        if hex_part.len() >= 8 {
            let prefix = &hex_part[..4];
            let suffix = &hex_part[hex_part.len() - 4..];
            return format!("sk-{prefix}••••{suffix}");
        }
    }
    // Fallback for non-standard key formats
    if api_key.len() >= 8 {
        let prefix = &api_key[..4];
        let suffix = &api_key[api_key.len() - 4..];
        format!("{prefix}••••{suffix}")
    } else {
        "••••".to_string()
    }
}

/// Returns true if a stored `api_key` value looks like it has already been hashed.
/// HMAC-SHA256 hex is always 64 lowercase hex chars.
pub fn is_hashed(value: &str) -> bool {
    value.len() == 64 && value.chars().all(|c| c.is_ascii_hexdigit())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_hash_key_deterministic() {
        let h1 = hash_key("sk-abc123", Some("secret"));
        let h2 = hash_key("sk-abc123", Some("secret"));
        assert_eq!(h1, h2);
        assert_eq!(h1.len(), 64);
    }

    #[test]
    fn test_hash_key_different_secrets() {
        let h1 = hash_key("sk-abc123", Some("secret1"));
        let h2 = hash_key("sk-abc123", Some("secret2"));
        assert_ne!(h1, h2);
    }

    #[test]
    fn test_hash_key_no_secret() {
        let h = hash_key("sk-abc123", None);
        assert_eq!(h.len(), 64);
    }

    #[test]
    fn test_mask_key() {
        assert_eq!(mask_key("sk-abcd1234efgh5678"), "sk-abcd••••5678");
        assert_eq!(
            mask_key("sk-a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4"),
            "sk-a1b2••••c3d4"
        );
    }

    #[test]
    fn test_mask_key_short() {
        assert_eq!(mask_key("short"), "••••");
    }

    #[test]
    fn test_is_hashed() {
        let h = hash_key("sk-test", None);
        assert!(is_hashed(&h));
        assert!(!is_hashed("sk-abcd1234"));
        assert!(!is_hashed("not-a-hash"));
    }
}
