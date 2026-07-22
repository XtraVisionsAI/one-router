//! SSRF protection for proxy-side HTTP fetches.
//!
//! Validates that a URL does not point at private, loopback, link-local, or
//! cloud metadata addresses. Hostnames are resolved here and the validated
//! addresses are pinned at the transport layer by the caller
//! (`ClientBuilder::resolve_to_addrs`), so the TCP connection goes to the
//! address that was checked — closing the DNS-rebinding window between
//! validation and connect.

use std::net::{IpAddr, SocketAddr};
use std::time::Duration;

/// Maximum redirects followed manually by SSRF-guarded fetches.
/// Each hop is re-validated (domain filters + IP checks).
pub const MAX_REDIRECTS: usize = 5;

/// Maximum accepted URL length.
pub const MAX_URL_LEN: usize = 2048;

/// Hostnames that must never be fetched regardless of what they resolve to.
const BLOCKED_HOSTS: &[&str] = &["localhost", "metadata.google.internal", "metadata"];

/// A validated fetch target: the hostname plus the resolved socket addresses
/// the connection must be pinned to.
pub struct ValidatedTarget {
    pub host: String,
    /// Empty when the host is an IP literal (no DNS involved, nothing to pin).
    pub pinned_addrs: Vec<SocketAddr>,
}

/// Returns true for addresses a proxy-side fetch must never connect to:
/// private ranges, loopback, link-local (incl. AWS/ECS metadata endpoints
/// 169.254.169.254 / 169.254.170.2), multicast, CGNAT, and their IPv6
/// equivalents (incl. IPv4-mapped forms).
pub fn is_forbidden_ip(ip: IpAddr) -> bool {
    match ip {
        IpAddr::V4(v4) => {
            let o = v4.octets();
            v4.is_private()
                || v4.is_loopback()
                || v4.is_link_local()
                || v4.is_multicast()
                || v4.is_broadcast()
                || v4.is_unspecified()
                || o[0] == 0 // 0.0.0.0/8 "this network"
                || (o[0] == 100 && (o[1] & 0xC0) == 64) // 100.64.0.0/10 carrier-grade NAT
                || (o[0] == 192 && o[1] == 0 && o[2] == 0) // 192.0.0.0/24 IETF protocol assignments
                || (o[0] == 198 && (o[1] & 0xFE) == 18) // 198.18.0.0/15 benchmarking
                || o[0] >= 240 // 240.0.0.0/4 reserved/future use (incl. 255.255.255.255)
        }
        IpAddr::V6(v6) => {
            if let Some(v4) = v6.to_ipv4_mapped() {
                return is_forbidden_ip(IpAddr::V4(v4));
            }
            let seg = v6.segments();
            v6.is_loopback()
                || v6.is_multicast()
                || v6.is_unspecified()
                || (seg[0] & 0xfe00) == 0xfc00 // fc00::/7 unique local
                || (seg[0] & 0xffc0) == 0xfe80 // fe80::/10 link-local
        }
    }
}

/// Validate a URL for proxy-side fetching. Rejects non-HTTP(S) schemes,
/// blocked hostnames, and any target address in a forbidden range. For
/// hostnames, resolves DNS and returns the addresses so the caller can pin
/// the connection to them.
pub async fn validate_url(url: &reqwest::Url) -> Result<ValidatedTarget, String> {
    if url.as_str().len() > MAX_URL_LEN {
        return Err(format!("URL exceeds maximum length of {MAX_URL_LEN}"));
    }
    match url.scheme() {
        "http" | "https" => {}
        s => return Err(format!("URL scheme '{s}' is not allowed")),
    }
    let host = url
        .host_str()
        .ok_or_else(|| "URL has no host".to_string())?;
    let host = host
        .trim_start_matches('[')
        .trim_end_matches(']')
        .trim_end_matches('.')
        .to_ascii_lowercase();

    if BLOCKED_HOSTS.contains(&host.as_str()) {
        return Err(format!("Host '{host}' is not allowed"));
    }

    // IP literal: check directly, nothing to pin.
    if let Ok(ip) = host.parse::<IpAddr>() {
        if is_forbidden_ip(ip) {
            return Err(format!("Address '{ip}' is in a forbidden range"));
        }
        return Ok(ValidatedTarget {
            host,
            pinned_addrs: Vec::new(),
        });
    }

    // Hostname: resolve and validate every address it maps to.
    let port = url.port_or_known_default().unwrap_or(443);
    let addrs: Vec<SocketAddr> = tokio::net::lookup_host((host.as_str(), port))
        .await
        .map_err(|e| format!("Failed to resolve host '{host}': {e}"))?
        .collect();
    if addrs.is_empty() {
        return Err(format!("Host '{host}' did not resolve to any address"));
    }
    if let Some(bad) = addrs.iter().find(|a| is_forbidden_ip(a.ip())) {
        return Err(format!(
            "Host '{host}' resolves to forbidden address '{}'",
            bad.ip()
        ));
    }
    Ok(ValidatedTarget {
        host,
        pinned_addrs: addrs,
    })
}

/// Bytes fetched by an SSRF-guarded GET, plus the response content type.
pub struct SafeGetResult {
    pub bytes: Vec<u8>,
    pub content_type: String,
    /// Final URL after following redirects.
    pub final_url: String,
}

/// What to do when a response body exceeds `max_bytes`.
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum OversizePolicy {
    /// Truncate to `max_bytes`. Correct for text (web_fetch): partial content is
    /// still usable.
    Truncate,
    /// Reject with an error. Correct for binary content (images): a truncated
    /// body is corrupt but can still pass a magic-byte sniff, so it must not be
    /// forwarded.
    Reject,
}

/// Perform an SSRF-guarded HTTP GET, following redirects manually so every hop
/// is re-validated (via `check_hop`, plus IP checks) and the connection is
/// pinned to the validated address.
///
/// Bodies larger than `max_bytes` are truncated or rejected per `oversize`. When
/// rejecting, a declared `Content-Length` over the cap short-circuits before the
/// body is read.
///
/// `check_hop` is called for each URL before it is fetched; return `Err` to
/// reject the hop (used for caller-specific domain filtering).
pub async fn safe_get_bytes(
    url: &str,
    max_bytes: usize,
    timeout: Duration,
    user_agent: &str,
    oversize: OversizePolicy,
    mut check_hop: impl FnMut(&reqwest::Url) -> Result<(), String>,
) -> Result<SafeGetResult, String> {
    let mut current: reqwest::Url = url.parse().map_err(|e| format!("Invalid URL: {e}"))?;

    for _ in 0..=MAX_REDIRECTS {
        check_hop(&current)?;
        let target = validate_url(&current).await?;

        let mut builder = reqwest::Client::builder()
            .timeout(timeout)
            .user_agent(user_agent)
            .redirect(reqwest::redirect::Policy::none());
        if !target.pinned_addrs.is_empty() {
            builder = builder.resolve_to_addrs(&target.host, &target.pinned_addrs);
        }
        let client = builder.build().map_err(|e| e.to_string())?;

        let response = client
            .get(current.clone())
            .send()
            .await
            .map_err(|e| e.to_string())?;

        let status = response.status();
        if status.is_redirection() {
            let location = response
                .headers()
                .get(reqwest::header::LOCATION)
                .and_then(|v| v.to_str().ok())
                .ok_or_else(|| "Redirect without Location header".to_string())?;
            current = current
                .join(location)
                .map_err(|e| format!("Invalid redirect target: {e}"))?;
            continue;
        }

        if !status.is_success() {
            return Err(format!("HTTP {}", status.as_u16()));
        }

        let content_type = response
            .headers()
            .get(reqwest::header::CONTENT_TYPE)
            .and_then(|v| v.to_str().ok())
            .unwrap_or("application/octet-stream")
            .to_string();
        let final_url = current.to_string();

        // When rejecting oversize, short-circuit on a declared Content-Length
        // over the cap so an oversized body is never buffered.
        if oversize == OversizePolicy::Reject {
            if let Some(len) = response.content_length() {
                if len as usize > max_bytes {
                    return Err(format!(
                        "response body exceeds maximum size ({len} > {max_bytes} bytes)"
                    ));
                }
            }
        }

        let full = response.bytes().await.map_err(|e| e.to_string())?;
        let bytes = if full.len() > max_bytes {
            match oversize {
                OversizePolicy::Truncate => full[..max_bytes].to_vec(),
                OversizePolicy::Reject => {
                    return Err(format!(
                        "response body exceeds maximum size ({} > {max_bytes} bytes)",
                        full.len()
                    ));
                }
            }
        } else {
            full.to_vec()
        };
        return Ok(SafeGetResult {
            bytes,
            content_type,
            final_url,
        });
    }

    Err(format!("Too many redirects (>{MAX_REDIRECTS})"))
}

#[cfg(test)]
mod tests {
    use super::*;

    fn forbidden(s: &str) -> bool {
        is_forbidden_ip(s.parse().unwrap())
    }

    #[test]
    fn test_metadata_endpoints_forbidden() {
        assert!(forbidden("169.254.169.254")); // EC2/IMDS
        assert!(forbidden("169.254.170.2")); // ECS task metadata
    }

    #[test]
    fn test_private_and_loopback_forbidden() {
        assert!(forbidden("127.0.0.1"));
        assert!(forbidden("10.1.2.3"));
        assert!(forbidden("172.16.0.1"));
        assert!(forbidden("192.168.1.1"));
        assert!(forbidden("100.64.0.1")); // CGNAT
        assert!(forbidden("0.0.0.0"));
        assert!(forbidden("198.18.0.1")); // benchmarking 198.18.0.0/15
        assert!(forbidden("198.19.255.255")); // benchmarking (upper half)
        assert!(forbidden("240.0.0.1")); // reserved 240.0.0.0/4
        assert!(forbidden("255.255.255.255")); // broadcast / reserved
        assert!(forbidden("::1"));
        assert!(forbidden("fc00::1")); // unique local
        assert!(forbidden("fe80::1")); // link-local
        assert!(forbidden("::ffff:127.0.0.1")); // IPv4-mapped loopback
        assert!(forbidden("::ffff:169.254.169.254")); // IPv4-mapped metadata
    }

    #[test]
    fn test_public_ips_allowed() {
        assert!(!forbidden("93.184.216.34"));
        assert!(!forbidden("8.8.8.8"));
        assert!(!forbidden("2606:4700:4700::1111"));
    }

    #[tokio::test]
    async fn test_validate_url_rejects_schemes_and_hosts() {
        let url: reqwest::Url = "file:///etc/passwd".parse().unwrap();
        assert!(validate_url(&url).await.is_err());

        let url: reqwest::Url = "http://localhost:8080/admin".parse().unwrap();
        assert!(validate_url(&url).await.is_err());

        let url: reqwest::Url = "http://169.254.169.254/latest/meta-data/".parse().unwrap();
        assert!(validate_url(&url).await.is_err());

        let url: reqwest::Url = "http://[::1]/".parse().unwrap();
        assert!(validate_url(&url).await.is_err());

        let url: reqwest::Url = "http://metadata.google.internal/computeMetadata/"
            .parse()
            .unwrap();
        assert!(validate_url(&url).await.is_err());
    }

    #[tokio::test]
    async fn test_validate_url_allows_public_ip_literal() {
        let url: reqwest::Url = "https://93.184.216.34/page".parse().unwrap();
        let target = validate_url(&url).await.unwrap();
        assert!(target.pinned_addrs.is_empty());
        assert_eq!(target.host, "93.184.216.34");
    }
}
