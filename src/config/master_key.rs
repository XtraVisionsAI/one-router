//! `MASTER_API_KEY` handling: plaintext or `sha256:<hex>`.
//!
//! The master key is only ever *compared* against what a caller presents, so
//! the gateway does not need its plaintext. `MASTER_API_KEY` may therefore hold
//! `sha256:<64 lowercase hex>` (SHA-256 of the key); a plaintext value keeps
//! working and, when it comes from `./.env` and is strong, is replaced there by
//! its hash on startup ([`migrate_dotenv`]).
//!
//! Plain SHA-256 is adequate because only high-entropy keys are migrated
//! (weak keys are refused, see [`is_strong`]); it is not a password hash.

use sha2::{Digest, Sha256};
use std::path::Path;

use super::dotenv_file;

pub const HASH_PREFIX: &str = "sha256:";

/// Minimum length of a plaintext key that may be migrated to a hash.
pub const MIN_STRONG_LEN: usize = 24;

const WEAK_FRAGMENTS: &[&str] = &[
    "changeme",
    "password",
    "secret",
    "test",
    "admin",
    "master",
    "your-master-key",
];

pub fn is_hashed(configured: &str) -> bool {
    configured.starts_with(HASH_PREFIX)
}

/// `sha256:<hex>` of a plaintext key.
pub fn hash(plain: &str) -> String {
    format!(
        "{HASH_PREFIX}{}",
        hex::encode(Sha256::digest(plain.as_bytes()))
    )
}

/// Reject malformed hashes (a typo must not silently become a plaintext key).
pub fn validate(configured: &str) -> Result<(), String> {
    if let Some(h) = configured.strip_prefix(HASH_PREFIX) {
        if h.len() != 64 || !h.bytes().all(|b| matches!(b, b'0'..=b'9' | b'a'..=b'f')) {
            return Err(
                "MASTER_API_KEY starts with 'sha256:' but is not followed by 64 lowercase hex \
                 characters"
                    .into(),
            );
        }
    }
    Ok(())
}

/// Constant-time check of a presented key against the configured value.
pub fn matches(candidate: &str, configured: &str) -> bool {
    match configured.strip_prefix(HASH_PREFIX) {
        Some(expected_hex) => {
            let got = hex::encode(Sha256::digest(candidate.as_bytes()));
            got.as_bytes()
                .iter()
                .zip(expected_hex.as_bytes())
                .fold(0u8, |acc, (a, b)| acc | (a ^ b))
                == 0
                && expected_hex.len() == got.len()
        }
        None => crate::utils::api_key::secret_eq(candidate, configured),
    }
}

/// Whether a plaintext key matches a well-known weak value.
pub fn is_weak(plain: &str) -> bool {
    let lower = plain.to_ascii_lowercase();
    WEAK_FRAGMENTS.iter().any(|w| lower.contains(w))
}

/// Long and not a well-known value (generated keys are `sk-` + 48 hex).
pub fn is_strong(plain: &str) -> bool {
    // Distinct-character floor rejects "aaaa…" / "123123…" style keys without
    // tripping on digit runs that occur by chance in random hex.
    let distinct = plain
        .chars()
        .collect::<std::collections::HashSet<_>>()
        .len();
    plain.chars().count() >= MIN_STRONG_LEN && distinct >= 10 && !is_weak(plain)
}

/// A new random master key: `sk-` + 24 random bytes as hex.
pub fn generate() -> String {
    let bytes: [u8; 24] = rand::random();
    format!("sk-{}", hex::encode(bytes))
}

/// Outcome of [`migrate_dotenv`], for logging by the caller.
#[derive(Debug, PartialEq, Eq)]
pub enum Migration {
    /// Already hashed — nothing to do.
    AlreadyHashed,
    /// Replaced in `.env`; the effective value is now the hash.
    Migrated,
    /// Plaintext that does not come from `.env` (process env / CLI flag):
    /// cannot be rewritten here.
    NotFromDotenv,
    /// Plaintext too weak to protect with an unsalted hash.
    Weak,
    /// Writing `.env` failed (message).
    WriteFailed(String),
}

/// Replace a plaintext `MASTER_API_KEY` in `.env` by its hash.
///
/// Only when the effective value is exactly what `.env` defines (so an
/// environment variable or `--master-api-key` flag is never shadowed by a
/// rewritten file). Returns the new effective value on success.
pub fn migrate_dotenv(path: &Path, effective: &str) -> (Migration, Option<String>) {
    if is_hashed(effective) {
        return (Migration::AlreadyHashed, None);
    }
    if dotenv_file::read_value(path, "MASTER_API_KEY").as_deref() != Some(effective) {
        return (Migration::NotFromDotenv, None);
    }
    if !is_strong(effective) {
        return (Migration::Weak, None);
    }
    let hashed = hash(effective);
    match dotenv_file::upsert(
        path,
        "MASTER_API_KEY",
        &hashed,
        &["Master key stored as its SHA-256 (migrated by one-router); log in with the original key."],
    ) {
        Ok(()) => (Migration::Migrated, Some(hashed)),
        Err(e) => (Migration::WriteFailed(e.to_string()), None),
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn hash_and_match() {
        let k = "sk-0123456789abcdef0123456789abcdef";
        let h = hash(k);
        assert!(h.starts_with("sha256:") && h.len() == 7 + 64);
        assert!(validate(&h).is_ok());
        assert!(matches(k, &h));
        assert!(!matches("sk-wrong", &h));
        assert!(!matches(&h, &h), "the hash itself must not log in");
        assert!(matches(k, k), "plaintext config still works");
        assert!(!matches("x", k));
    }

    #[test]
    fn malformed_hash_rejected() {
        assert!(validate("sha256:abc").is_err());
        assert!(validate(&format!("sha256:{}", "A".repeat(64))).is_err());
        assert!(validate("sk-plain").is_ok());
    }

    #[test]
    fn strength() {
        assert!(is_strong(&generate()));
        assert!(!is_strong("sk-short"));
        assert!(!is_strong("my-admin-password-is-very-long"));
        assert!(!is_strong(&"ab".repeat(20)));
        assert!(is_strong("sk-0123456789abcdef0123456789abcdef"));
        for _ in 0..2000 {
            assert!(is_strong(&generate()));
        }
    }

    #[test]
    fn migration_rules() {
        let dir = tempfile::tempdir().unwrap();
        let p = dir.path().join(".env");
        let key = generate();
        std::fs::write(&p, format!("PORT=1\nMASTER_API_KEY={key}\n")).unwrap();

        // Value from elsewhere (env / flag) differs from .env → untouched.
        assert_eq!(
            migrate_dotenv(&p, "sk-from-environment-0000000000").0,
            Migration::NotFromDotenv
        );
        let (m, new) = migrate_dotenv(&p, &key);
        assert_eq!(m, Migration::Migrated);
        let new = new.unwrap();
        assert!(matches(&key, &new));
        let text = std::fs::read_to_string(&p).unwrap();
        assert!(!text.contains(&key) && text.contains(&new) && text.contains("PORT=1"));
        assert_eq!(migrate_dotenv(&p, &new).0, Migration::AlreadyHashed);

        std::fs::write(&p, "MASTER_API_KEY=changeme\n").unwrap();
        assert_eq!(migrate_dotenv(&p, "changeme").0, Migration::Weak);
    }
}
