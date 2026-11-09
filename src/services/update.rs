//! Self-update service for bare-metal deployments.
//!
//! Checks GitHub Releases for new versions, downloads binaries with SHA256
//! verification, and replaces the running binary in-place.

use anyhow::{bail, Context, Result};
use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use sha2::{Digest, Sha256};
use std::path::PathBuf;
use std::sync::Arc;
use tokio::sync::RwLock;

// ============================================================================
// Constants
// ============================================================================

const GITHUB_API_BASE: &str = "https://api.github.com";
const GITHUB_OWNER: &str = "XtraVisionsAI";
const GITHUB_REPO: &str = "one-router";
const USER_AGENT: &str = "one-router-updater/1.0";

// ============================================================================
// Types
// ============================================================================

/// Current status of the update process.
#[derive(Debug, Clone, Default, Serialize, Deserialize, PartialEq, Eq)]
#[serde(rename_all = "snake_case")]
pub enum UpdateStatus {
    #[default]
    Idle,
    Checking,
    UpdateAvailable,
    Downloading,
    Verifying,
    Applying,
    Complete,
    Failed,
}

/// Cached information about the latest available update.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct UpdateInfo {
    pub current_version: String,
    pub latest_version: Option<String>,
    pub download_url: Option<String>,
    pub checksum_url: Option<String>,
    /// Detached Ed25519 signature over the checksum file (`<asset>.sha256.sig`).
    #[serde(default)]
    pub signature_url: Option<String>,
    pub release_notes: Option<String>,
    pub published_at: Option<String>,
    pub update_available: bool,
    pub last_check: Option<DateTime<Utc>>,
    pub status: UpdateStatus,
    pub error: Option<String>,
}

impl UpdateInfo {
    fn new() -> Self {
        Self {
            current_version: env!("CARGO_PKG_VERSION").to_string(),
            latest_version: None,
            download_url: None,
            checksum_url: None,
            signature_url: None,
            release_notes: None,
            published_at: None,
            update_available: false,
            last_check: None,
            status: UpdateStatus::Idle,
            error: None,
        }
    }
}

/// GitHub Release API response (partial).
#[derive(Debug, Deserialize)]
struct GitHubRelease {
    tag_name: String,
    body: Option<String>,
    published_at: Option<String>,
    assets: Vec<GitHubAsset>,
}

/// GitHub Release Asset (partial).
#[derive(Debug, Deserialize)]
struct GitHubAsset {
    name: String,
    browser_download_url: String,
}

// ============================================================================
// UpdateService
// ============================================================================

/// Service for checking and applying self-updates from GitHub Releases.
pub struct UpdateService {
    client: reqwest::Client,
    info: Arc<RwLock<UpdateInfo>>,
}

impl Default for UpdateService {
    fn default() -> Self {
        Self::new()
    }
}

impl UpdateService {
    pub fn new() -> Self {
        let client = reqwest::Client::builder()
            .timeout(std::time::Duration::from_secs(30))
            .user_agent(USER_AGENT)
            .build()
            .expect("Failed to build HTTP client for update service");

        Self {
            client,
            info: Arc::new(RwLock::new(UpdateInfo::new())),
        }
    }

    /// Get a snapshot of the current update info.
    pub async fn info(&self) -> UpdateInfo {
        self.info.read().await.clone()
    }

    // ========================================================================
    // Check for updates
    // ========================================================================

    /// Query GitHub Releases API for the latest version.
    pub async fn check_latest(&self) -> Result<UpdateInfo> {
        {
            let mut info = self.info.write().await;
            info.status = UpdateStatus::Checking;
            info.error = None;
        }

        let result = self.do_check().await;

        match &result {
            Ok(_) => {
                let info = self.info.read().await;
                tracing::info!(
                    current = %info.current_version,
                    latest = info.latest_version.as_deref().unwrap_or("unknown"),
                    available = info.update_available,
                    "Update check complete"
                );
            }
            Err(e) => {
                let mut info = self.info.write().await;
                info.status = UpdateStatus::Failed;
                info.error = Some(e.to_string());
                tracing::warn!(error = %e, "Update check failed");
            }
        }

        result
    }

    async fn do_check(&self) -> Result<UpdateInfo> {
        let url = format!("{GITHUB_API_BASE}/repos/{GITHUB_OWNER}/{GITHUB_REPO}/releases/latest");

        let resp = self
            .client
            .get(&url)
            .header("Accept", "application/vnd.github+json")
            .send()
            .await
            .context("Failed to query GitHub Releases API")?;

        if !resp.status().is_success() {
            let status = resp.status();
            let body = resp.text().await.unwrap_or_default();
            bail!("GitHub API returned {status}: {body}");
        }

        let release: GitHubRelease = resp
            .json()
            .await
            .context("Failed to parse GitHub release JSON")?;

        let latest_tag = release.tag_name.trim_start_matches('v');
        let current = env!("CARGO_PKG_VERSION");

        let update_available = is_newer(latest_tag, current);

        let target = target_asset_name();
        let checksum_name = format!("{target}.sha256");

        let download_url = release
            .assets
            .iter()
            .find(|a| a.name == target)
            .map(|a| a.browser_download_url.clone());

        let checksum_url = release
            .assets
            .iter()
            .find(|a| a.name == checksum_name)
            .map(|a| a.browser_download_url.clone());
        let signature_name = format!("{checksum_name}.sig");
        let signature_url = release
            .assets
            .iter()
            .find(|a| a.name == signature_name)
            .map(|a| a.browser_download_url.clone());

        let mut info = self.info.write().await;
        info.latest_version = Some(latest_tag.to_string());
        info.download_url = download_url;
        info.checksum_url = checksum_url;
        info.signature_url = signature_url;
        info.release_notes = release.body;
        info.published_at = release.published_at;
        info.update_available = update_available;
        info.last_check = Some(Utc::now());
        info.status = if update_available {
            UpdateStatus::UpdateAvailable
        } else {
            UpdateStatus::Idle
        };
        info.error = None;

        Ok(info.clone())
    }

    // ========================================================================
    // Download, verify, and apply
    // ========================================================================

    /// Download the latest release, verify its signed checksum, and replace the
    /// current binary. Fails closed: a release without a checksum, without a
    /// signature, or a build without an embedded release public key is never
    /// applied.
    pub async fn download_and_apply(&self) -> Result<()> {
        let public_key = release_public_key().context(
            "This build has no release signing key embedded (ONE_ROUTER_RELEASE_PUBKEY), \
             so self-update is disabled; update by deploying a new image or binary",
        )?;
        // Ensure we have a check result
        let (download_url, checksum_url, signature_url) = {
            let info = self.info.read().await;
            if !info.update_available {
                bail!("No update available");
            }
            let dl = info
                .download_url
                .clone()
                .context("No download URL for current architecture")?;
            let cs = info
                .checksum_url
                .clone()
                .context("Release has no checksum file; refusing to update")?;
            let sig = info
                .signature_url
                .clone()
                .context("Release has no checksum signature; refusing to update")?;
            (dl, cs, sig)
        };

        // Download binary archive
        {
            let mut info = self.info.write().await;
            info.status = UpdateStatus::Downloading;
            info.error = None;
        }

        let temp_dir = tempfile::tempdir().context("Failed to create temp directory")?;
        let archive_path = temp_dir.path().join("update.tar.gz");

        tracing::info!(url = %download_url, "Downloading update archive");
        self.download_file(&download_url, &archive_path).await?;

        // Verify checksum
        {
            let mut info = self.info.write().await;
            info.status = UpdateStatus::Verifying;
        }

        let checksum_path = temp_dir.path().join("checksum.sha256");
        let signature_path = temp_dir.path().join("checksum.sha256.sig");
        self.download_file(&checksum_url, &checksum_path).await?;
        self.download_file(&signature_url, &signature_path).await?;
        // Authenticity first (the checksum file is signed by the release key),
        // then integrity of the archive against that checksum.
        verify_signature(&checksum_path, &signature_path, &public_key)?;
        verify_checksum(&archive_path, &checksum_path)?;
        tracing::info!("Release signature and SHA256 checksum verified");

        // Extract and apply
        {
            let mut info = self.info.write().await;
            info.status = UpdateStatus::Applying;
        }

        let new_binary = extract_binary(&archive_path, temp_dir.path())?;
        replace_current_binary(&new_binary)?;

        {
            let mut info = self.info.write().await;
            info.status = UpdateStatus::Complete;
            info.update_available = false;
        }

        tracing::info!("Update applied successfully. Restart to activate the new version.");
        Ok(())
    }

    /// Download a file to a local path.
    async fn download_file(&self, url: &str, dest: &PathBuf) -> Result<()> {
        let resp = self
            .client
            .get(url)
            .send()
            .await
            .with_context(|| format!("Failed to download {url}"))?;

        if !resp.status().is_success() {
            bail!("Download failed with status {}: {url}", resp.status());
        }

        let bytes = resp
            .bytes()
            .await
            .with_context(|| format!("Failed to read response body from {url}"))?;

        std::fs::write(dest, &bytes)
            .with_context(|| format!("Failed to write to {}", dest.display()))?;

        Ok(())
    }

    /// Record a failure with error message.
    pub async fn record_failure(&self, error: &str) {
        let mut info = self.info.write().await;
        info.status = UpdateStatus::Failed;
        info.error = Some(error.to_string());
    }
}

// ============================================================================
// Helper functions
// ============================================================================

/// Compare semver versions. Returns true if `latest` is newer than `current`.
fn is_newer(latest: &str, current: &str) -> bool {
    let Ok(latest_ver) = semver::Version::parse(latest) else {
        return false;
    };
    let Ok(current_ver) = semver::Version::parse(current) else {
        return false;
    };
    latest_ver > current_ver
}

/// Get the expected GitHub Release asset name for this platform.
fn target_asset_name() -> String {
    let triple = target_triple();
    format!("one-router-{triple}.tar.gz")
}

/// Detect the target triple from the current runtime environment.
fn target_triple() -> String {
    let arch = match std::env::consts::ARCH {
        "x86_64" => "x86_64",
        "aarch64" => "aarch64",
        other => {
            tracing::warn!(arch = other, "Unsupported architecture for self-update");
            other
        }
    };
    format!("{arch}-unknown-linux-gnu")
}

/// Verify SHA256 checksum of a file against a checksum file.
/// Release public key compiled in at build time (`ONE_ROUTER_RELEASE_PUBKEY`:
/// base64 of the raw 32-byte Ed25519 key or of its SPKI DER, as printed by
/// `scripts/release-keygen.sh`).
fn release_public_key() -> Option<Vec<u8>> {
    parse_public_key(option_env!("ONE_ROUTER_RELEASE_PUBKEY")?)
}

fn parse_public_key(b64: &str) -> Option<Vec<u8>> {
    use base64::Engine;
    let raw = base64::engine::general_purpose::STANDARD
        .decode(b64.trim())
        .ok()?;
    match raw.len() {
        32 => Some(raw),
        // SPKI DER for Ed25519 is a fixed 12-byte prefix + the 32-byte key.
        44 if raw.starts_with(&[0x30, 0x2a, 0x30, 0x05, 0x06, 0x03, 0x2b, 0x65, 0x70]) => {
            Some(raw[12..].to_vec())
        }
        _ => None,
    }
}

/// Verify the detached Ed25519 signature (raw 64 bytes, or base64 of them)
/// over the checksum file's exact bytes.
fn verify_signature(
    checksum_path: &PathBuf,
    signature_path: &PathBuf,
    public_key: &[u8],
) -> Result<()> {
    use base64::Engine;
    let message = std::fs::read(checksum_path).context("Failed to read checksum file")?;
    let sig_raw = std::fs::read(signature_path).context("Failed to read signature file")?;
    let signature = if sig_raw.len() == 64 {
        sig_raw
    } else {
        base64::engine::general_purpose::STANDARD
            .decode(String::from_utf8_lossy(&sig_raw).trim())
            .context("Signature file is neither raw nor base64")?
    };
    ring::signature::UnparsedPublicKey::new(&ring::signature::ED25519, public_key)
        .verify(&message, &signature)
        .map_err(|_| anyhow::anyhow!("Release signature verification FAILED; refusing to update"))
}

fn verify_checksum(file_path: &PathBuf, checksum_path: &PathBuf) -> Result<()> {
    let checksum_content =
        std::fs::read_to_string(checksum_path).context("Failed to read checksum file")?;

    // Format: "<hash>  <filename>" or "<hash> <filename>"
    let expected_hash = checksum_content
        .split_whitespace()
        .next()
        .context("Empty checksum file")?
        .to_lowercase();

    let file_bytes = std::fs::read(file_path).context("Failed to read archive for checksum")?;
    let mut hasher = Sha256::new();
    hasher.update(&file_bytes);
    let actual_hash = format!("{:x}", hasher.finalize());

    if actual_hash != expected_hash {
        bail!("Checksum mismatch: expected {expected_hash}, got {actual_hash}");
    }

    Ok(())
}

/// Extract the `one-router` binary from a .tar.gz archive.
fn extract_binary(archive_path: &PathBuf, dest_dir: &std::path::Path) -> Result<PathBuf> {
    let file = std::fs::File::open(archive_path).context("Failed to open archive")?;
    let decoder = flate2::read::GzDecoder::new(file);
    let mut archive = tar::Archive::new(decoder);

    archive
        .unpack(dest_dir)
        .context("Failed to extract archive")?;

    let binary_path = dest_dir.join("one-router");
    if !binary_path.exists() {
        bail!(
            "Binary 'one-router' not found in archive (extracted to {})",
            dest_dir.display()
        );
    }

    Ok(binary_path)
}

/// Replace the currently running binary with a new one.
fn replace_current_binary(new_binary: &PathBuf) -> Result<()> {
    let current_exe =
        std::env::current_exe().context("Failed to determine current executable path")?;

    let backup_path = current_exe.with_extension("backup");

    // Rename current → backup
    std::fs::rename(&current_exe, &backup_path).with_context(|| {
        format!(
            "Failed to backup current binary {} → {}",
            current_exe.display(),
            backup_path.display()
        )
    })?;

    // Copy new → current (copy instead of rename to handle cross-device)
    if let Err(e) = std::fs::copy(new_binary, &current_exe) {
        // Attempt to restore backup on failure
        let _ = std::fs::rename(&backup_path, &current_exe);
        return Err(e)
            .with_context(|| format!("Failed to install new binary to {}", current_exe.display()));
    }

    // Set executable permission
    #[cfg(unix)]
    {
        use std::os::unix::fs::PermissionsExt;
        let perms = std::fs::Permissions::from_mode(0o755);
        std::fs::set_permissions(&current_exe, perms)
            .context("Failed to set executable permission")?;
    }

    tracing::info!(
        path = %current_exe.display(),
        backup = %backup_path.display(),
        "Binary replaced"
    );

    Ok(())
}

// ============================================================================
// Tests
// ============================================================================

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_is_newer() {
        assert!(is_newer("0.13.0", "0.12.1"));
        assert!(is_newer("1.0.0", "0.99.99"));
        assert!(!is_newer("0.12.1", "0.12.1"));
        assert!(!is_newer("0.12.0", "0.12.1"));
        assert!(!is_newer("invalid", "0.12.1"));
    }

    #[test]
    fn test_target_asset_name() {
        let name = target_asset_name();
        assert!(name.starts_with("one-router-"));
        assert!(name.ends_with(".tar.gz"));
    }

    #[test]
    fn test_target_triple() {
        let triple = target_triple();
        // Should contain architecture
        assert!(
            triple.contains("x86_64") || triple.contains("aarch64"),
            "Unexpected triple: {triple}"
        );
    }

    #[test]
    fn test_update_info_default() {
        let info = UpdateInfo::new();
        assert_eq!(info.status, UpdateStatus::Idle);
        assert!(!info.update_available);
        assert_eq!(info.current_version, env!("CARGO_PKG_VERSION"));
    }

    #[test]
    fn test_verify_checksum_success() {
        let dir = tempfile::tempdir().unwrap();
        let file_path = dir.path().join("test.bin");
        let checksum_path = dir.path().join("test.bin.sha256");

        let content = b"hello world";
        std::fs::write(&file_path, content).unwrap();

        let mut hasher = Sha256::new();
        hasher.update(content);
        let hash = format!("{:x}", hasher.finalize());
        std::fs::write(&checksum_path, format!("{hash}  test.bin")).unwrap();

        assert!(verify_checksum(&file_path, &checksum_path).is_ok());
    }

    #[test]
    fn test_verify_checksum_mismatch() {
        let dir = tempfile::tempdir().unwrap();
        let file_path = dir.path().join("test.bin");
        let checksum_path = dir.path().join("test.bin.sha256");

        std::fs::write(&file_path, b"hello world").unwrap();
        std::fs::write(&checksum_path, "0000000000000000  test.bin").unwrap();

        assert!(verify_checksum(&file_path, &checksum_path).is_err());
    }
}

#[cfg(test)]
mod signature_tests {
    use super::*;
    use ring::signature::{Ed25519KeyPair, KeyPair};

    #[test]
    fn signed_checksum_verifies_and_tampering_fails() {
        let rng = ring::rand::SystemRandom::new();
        let pkcs8 = Ed25519KeyPair::generate_pkcs8(&rng).unwrap();
        let kp = Ed25519KeyPair::from_pkcs8(pkcs8.as_ref()).unwrap();
        let dir = tempfile::tempdir().unwrap();
        let cs = dir.path().join("a.sha256");
        let sig = dir.path().join("a.sha256.sig");
        std::fs::write(&cs, b"abc123  one-router.tar.gz\n").unwrap();
        std::fs::write(&sig, kp.sign(b"abc123  one-router.tar.gz\n").as_ref()).unwrap();
        let pk = kp.public_key().as_ref().to_vec();
        assert!(verify_signature(&cs, &sig, &pk).is_ok());

        std::fs::write(&cs, b"def456  one-router.tar.gz\n").unwrap();
        assert!(verify_signature(&cs, &sig, &pk).is_err());

        let other =
            Ed25519KeyPair::from_pkcs8(Ed25519KeyPair::generate_pkcs8(&rng).unwrap().as_ref())
                .unwrap();
        assert!(verify_signature(&cs, &sig, other.public_key().as_ref()).is_err());
    }

    /// Interop with the CI signer: produced by `openssl pkeyutl -sign -rawin`
    /// (OpenSSL 3) with a throwaway key; public key as printed by
    /// `scripts/release-keygen.sh` (SPKI DER, base64).
    #[test]
    fn openssl_signature_verifies() {
        use base64::Engine;
        let dir = tempfile::tempdir().unwrap();
        let cs = dir.path().join("x.sha256");
        let sig = dir.path().join("x.sha256.sig");
        std::fs::write(&cs, b"abc  x.tar.gz\n").unwrap();
        std::fs::write(
            &sig,
            base64::engine::general_purpose::STANDARD
                .decode("nGT5DtvCy/amDaKGaNRD2dxKmfddCMlUJaiiuZFfOtbRgBmMwApnr4VdRkvibHkOgdWJeDYP9wAytWinOcFmAQ==")
                .unwrap(),
        )
        .unwrap();
        let pk = parse_public_key("MCowBQYDK2VwAyEAcHbS7taSZNSjapWRqUQJkKzbzMwVwurSmit4gHYW59c=")
            .unwrap();
        assert!(verify_signature(&cs, &sig, &pk).is_ok());
    }

    #[test]
    fn public_key_formats() {
        use base64::Engine;
        let raw = [7u8; 32];
        let b64 = base64::engine::general_purpose::STANDARD;
        assert_eq!(parse_public_key(&b64.encode(raw)).unwrap(), raw);
        let mut spki = vec![
            0x30, 0x2a, 0x30, 0x05, 0x06, 0x03, 0x2b, 0x65, 0x70, 0x03, 0x21, 0x00,
        ];
        spki.extend_from_slice(&raw);
        assert_eq!(parse_public_key(&b64.encode(&spki)).unwrap(), raw);
        assert!(parse_public_key("not base64!").is_none());
        assert!(parse_public_key(&b64.encode([1u8; 10])).is_none());
    }
}
