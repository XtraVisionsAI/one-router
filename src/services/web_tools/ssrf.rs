//! SSRF protection for proxy-side HTTP fetches.
//!
//! Two layers:
//! 1. [`validate_url`] — scheme, length, blocked hostnames, IP-literal checks
//!    and a pre-flight resolution (early, readable errors).
//! 2. [`GuardedResolver`] — installed as the reqwest DNS resolver of every
//!    guarded client ([`guarded_client`]). It resolves the name **at connect
//!    time** and fails the connection if any address is forbidden, so DNS
//!    rebinding, trailing-dot hostnames (`evil.com.`), and redirect hops cannot
//!    reach a different address than the one checked.
//!
//! Guarded clients ignore system proxies (`HTTP(S)_PROXY` would resolve names
//! on our behalf and bypass both layers) **unless** the operator opted in via
//! `OUTBOUND_PROXY` (see `config::outbound_proxy`). A proxied client keeps
//! [`check_url_static`] and adds a local DNS pre-check ([`precheck_proxied`]:
//! a forbidden address rejects, a local resolution failure allows — the proxy
//! may be the only resolver); the proxy must enforce its own egress ACL.
//!
//! Errors that would reveal *why* a destination is refused (the resolved
//! private address) are returned to callers as the generic
//! [`DESTINATION_NOT_ALLOWED`]; details are logged server-side.
//!
//! IP-literal hosts never reach a resolver, so [`check_url_static`] must run
//! on every URL sent with a guarded client — [`send_guarded`] and
//! [`safe_get_bytes`] do it for you. Bodies are read with
//! [`read_body_capped`] (streamed, never buffered past the cap).

use std::net::{IpAddr, SocketAddr};
use std::sync::{Arc, OnceLock};
use std::time::Duration;

use crate::config::outbound_proxy::{Egress, OutboundProxyConfig, ProxyScope, ResolvedProxy};

/// Client-facing reason for every refused destination (forbidden address,
/// blocked hostname). The concrete reason is logged, never returned: the
/// resolved address would make the gateway a DNS / network-layout oracle.
pub const DESTINATION_NOT_ALLOWED: &str = "destination not allowed";

/// Upper bound on the local DNS pre-check of a proxied request.
const PRECHECK_DNS_TIMEOUT: Duration = Duration::from_secs(3);

fn refused(reason: &str, host: &str, addr: Option<IpAddr>) -> String {
    match addr {
        Some(ip) => tracing::warn!(host, addr = %ip, reason, "Guarded fetch refused"),
        None => tracing::warn!(host, reason, "Guarded fetch refused"),
    }
    DESTINATION_NOT_ALLOWED.to_string()
}

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
            // IPv4 embedded in IPv6 translation / compatibility ranges.
            let embedded = |hi: u16, lo: u16| {
                let [a, b] = hi.to_be_bytes();
                let [c, d] = lo.to_be_bytes();
                std::net::Ipv4Addr::new(a, b, c, d)
            };
            let is_nat64 = seg[0] == 0x64 && seg[1] == 0xff9b && seg[2..6] == [0, 0, 0, 0]; // 64:ff9b::/96
            let is_v4_compat = seg[..6] == [0, 0, 0, 0, 0, 0]; // ::/96 (deprecated)
            if is_nat64 || is_v4_compat {
                return is_forbidden_ip(IpAddr::V4(embedded(seg[6], seg[7])));
            }
            if seg[0] == 0x2002 {
                // 2002::/16 6to4 — the IPv4 address is in segments 1..3.
                return is_forbidden_ip(IpAddr::V4(embedded(seg[1], seg[2])));
            }
            v6.is_loopback()
                || v6.is_multicast()
                || v6.is_unspecified()
                || (seg[0] & 0xfe00) == 0xfc00 // fc00::/7 unique local (incl. fd00:ec2::254)
                || (seg[0] & 0xffc0) == 0xfe80 // fe80::/10 link-local
                || (seg[0] & 0xffc0) == 0xfec0 // fec0::/10 site-local (deprecated)
                || (seg[0] == 0x0064 && seg[1] == 0xff9b && seg[2] == 1) // 64:ff9b:1::/48 local-use NAT64
        }
    }
}

/// Static (no DNS) URL check: length, http(s) scheme, a host, blocked
/// hostnames, and — crucially — **IP-literal hosts**. reqwest/hyper never call
/// the DNS resolver for an IP literal (`https://169.254.169.254/`,
/// `http://[::ffff:127.0.0.1]/`, `http://2130706433/` which the URL parser
/// normalizes to `127.0.0.1`), so [`GuardedResolver`] cannot see them; every
/// request made with a [`guarded_client`] must pass this check first (use
/// [`send_guarded`], [`safe_get_bytes`] or [`validate_url`]).
///
/// Returns the normalized host (lowercase, no brackets / trailing dot) and the
/// IP when the host is a literal.
pub fn check_url_static(url: &reqwest::Url) -> Result<(String, Option<IpAddr>), String> {
    if url.as_str().len() > MAX_URL_LEN {
        return Err(format!("URL exceeds maximum length of {MAX_URL_LEN}"));
    }
    match url.scheme() {
        "http" | "https" => {}
        s => return Err(format!("URL scheme '{s}' is not allowed")),
    }
    // The WHATWG parser already normalized IPv4 shorthands (decimal / octal /
    // hex) to dotted form; IPv6 literals come bracketed.
    let host = url
        .host_str()
        .unwrap_or_default()
        .trim_start_matches('[')
        .trim_end_matches(']')
        .trim_end_matches('.')
        .to_ascii_lowercase();
    if host.is_empty() {
        return Err("URL has no host".to_string());
    }
    if BLOCKED_HOSTS.contains(&host.as_str()) {
        return Err(refused("blocked hostname", &host, None));
    }
    if let Ok(ip) = host.parse::<IpAddr>() {
        if is_forbidden_ip(ip) {
            return Err(refused("forbidden IP literal", &host, Some(ip)));
        }
        return Ok((host, Some(ip)));
    }
    Ok((host, None))
}

/// Validate a URL for proxy-side fetching. Rejects non-HTTP(S) schemes,
/// blocked hostnames, and any target address in a forbidden range. For
/// hostnames, resolves DNS and returns the addresses so the caller can pin
/// the connection to them.
pub async fn validate_url(url: &reqwest::Url) -> Result<ValidatedTarget, String> {
    let (host, ip) = check_url_static(url)?;

    // IP literal: already checked, nothing to pin.
    if ip.is_some() {
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
        return Err(refused(
            "resolves to forbidden address",
            &host,
            Some(bad.ip()),
        ));
    }
    Ok(ValidatedTarget {
        host,
        pinned_addrs: addrs,
    })
}

/// DNS resolver that refuses to hand out forbidden addresses. Installed on every
/// guarded client, so the check happens for the exact name the connector
/// resolves, at connect time.
///
/// `exempt` holds the configured outbound proxy's own hostnames: the client
/// must be able to reach its proxy, which usually lives on a private address.
/// Proxied *targets* never reach this resolver (the proxy resolves them).
#[derive(Debug, Default, Clone)]
pub struct GuardedResolver {
    exempt: Arc<[String]>,
}

impl GuardedResolver {
    fn with_exempt(hosts: Vec<String>) -> Self {
        Self {
            exempt: hosts.into(),
        }
    }
}

impl reqwest::dns::Resolve for GuardedResolver {
    fn resolve(&self, name: hyper014::client::connect::dns::Name) -> reqwest::dns::Resolving {
        let host = name.as_str().trim_end_matches('.').to_ascii_lowercase();
        let exempt = self.exempt.contains(&host);
        Box::pin(async move {
            if !exempt && BLOCKED_HOSTS.contains(&host.as_str()) {
                return Err(refused("blocked hostname", &host, None).into());
            }
            let addrs: Vec<SocketAddr> = tokio::net::lookup_host((host.as_str(), 0))
                .await
                .map_err(|e| -> Box<dyn std::error::Error + Send + Sync> { Box::new(e) })?
                .collect();
            if addrs.is_empty() {
                return Err(format!("Host '{host}' did not resolve to any address").into());
            }
            if !exempt {
                if let Some(bad) = addrs.iter().find(|a| is_forbidden_ip(a.ip())) {
                    return Err(
                        refused("resolves to forbidden address", &host, Some(bad.ip())).into(),
                    );
                }
            }
            Ok(Box::new(addrs.into_iter()) as reqwest::dns::Addrs)
        })
    }
}

/// The process-wide outbound proxy (from `OUTBOUND_PROXY`), set once at startup.
#[derive(Debug)]
struct ActiveProxy {
    scope: ProxyScope,
    resolved: ResolvedProxy,
}

static ACTIVE_PROXY: OnceLock<Option<ActiveProxy>> = OnceLock::new();

/// Install the outbound proxy configuration (first call wins; later calls
/// are ignored — the setting is infra-level and not hot-reloadable) and log
/// the startup notes. Must run before guarded clients are built.
pub fn init_outbound_proxy(cfg: &OutboundProxyConfig) -> Result<(), String> {
    let lookup = |k: &str| std::env::var(k).ok();
    for (warn, msg) in cfg.startup_messages(lookup) {
        if warn {
            tracing::warn!(target: "config_check", "{msg}");
        } else {
            tracing::info!(target: "config_check", "{msg}");
        }
    }
    let active = cfg.resolve(lookup)?.map(|resolved| ActiveProxy {
        scope: cfg.scope,
        resolved,
    });
    let _ = ACTIVE_PROXY.set(active);
    Ok(())
}

fn active_proxy_for(egress: Egress) -> Option<&'static ResolvedProxy> {
    ACTIVE_PROXY
        .get()?
        .as_ref()
        .filter(|p| egress == Egress::Admin || p.scope == ProxyScope::All)
        .map(|p| &p.resolved)
}

/// A guarded reqwest client plus whether it routes through the outbound proxy
/// (which decides how [`send_guarded`] pre-checks the destination).
#[derive(Debug, Clone)]
pub struct GuardedClient {
    client: reqwest::Client,
    proxied: bool,
}

impl GuardedClient {
    pub fn get<U: reqwest::IntoUrl>(&self, url: U) -> reqwest::RequestBuilder {
        self.client.get(url)
    }

    pub fn post<U: reqwest::IntoUrl>(&self, url: U) -> reqwest::RequestBuilder {
        self.client.post(url)
    }

    /// Whether requests go through the configured outbound proxy.
    pub fn is_proxied(&self) -> bool {
        self.proxied
    }
}

/// A reqwest client for fetching untrusted / admin-supplied URLs: guarded DNS,
/// no automatic redirects (callers that follow redirects do so manually,
/// re-validating each hop), and **no system proxy** unless `OUTBOUND_PROXY`
/// covers `egress` (see [`init_outbound_proxy`]).
///
/// The guarded resolver only sees **names**: an IP-literal URL connects
/// without resolution, and a proxied target is resolved by the proxy. Send
/// through [`send_guarded`], which runs [`check_url_static`] and, when
/// proxied, [`precheck_proxied`].
pub fn guarded_client(
    egress: Egress,
    timeout: Duration,
    user_agent: &str,
) -> Result<GuardedClient, String> {
    build_guarded_client(active_proxy_for(egress), timeout, user_agent)
}

fn build_guarded_client(
    proxy: Option<&ResolvedProxy>,
    timeout: Duration,
    user_agent: &str,
) -> Result<GuardedClient, String> {
    // Always clear the implicit env proxies; an opted-in proxy is installed
    // explicitly below.
    let builder = reqwest::Client::builder()
        .timeout(timeout)
        .user_agent(user_agent)
        .redirect(reqwest::redirect::Policy::none())
        .no_proxy();
    let (builder, resolver) = match proxy {
        Some(p) => (
            p.apply(builder)?,
            GuardedResolver::with_exempt(p.proxy_hosts()),
        ),
        None => (builder, GuardedResolver::default()),
    };
    let client = builder
        .dns_resolver(Arc::new(resolver))
        .build()
        .map_err(|e| e.to_string())?;
    Ok(GuardedClient {
        client,
        proxied: proxy.is_some(),
    })
}

/// Local DNS pre-check for a proxied request (the proxy resolves the name,
/// so the connect-time guard never sees it): static checks first, then any
/// forbidden resolved address rejects; a local resolution failure or timeout
/// allows (in proxy-only networks the gateway often cannot resolve public
/// names itself).
pub async fn precheck_proxied(url: &reqwest::Url) -> Result<(), String> {
    let (host, ip) = check_url_static(url)?;
    if ip.is_some() {
        return Ok(());
    }
    let port = url.port_or_known_default().unwrap_or(443);
    let lookup = tokio::time::timeout(
        PRECHECK_DNS_TIMEOUT,
        tokio::net::lookup_host((host.as_str(), port)),
    )
    .await;
    match lookup {
        Ok(Ok(addrs)) => {
            let addrs: Vec<SocketAddr> = addrs.collect();
            if let Some(bad) = addrs.iter().find(|a| is_forbidden_ip(a.ip())) {
                return Err(refused(
                    "resolves to forbidden address (proxied)",
                    &host,
                    Some(bad.ip()),
                ));
            }
            Ok(())
        }
        Ok(Err(e)) => {
            tracing::debug!(host = %host, error = %e, "Local resolution failed; deferring to the outbound proxy");
            Ok(())
        }
        Err(_) => {
            tracing::debug!(host = %host, "Local resolution timed out; deferring to the outbound proxy");
            Ok(())
        }
    }
}

/// Build `request`, run the static URL check (IP literals, scheme, blocked
/// hosts) on its final URL — plus [`precheck_proxied`] when the client is
/// proxied — then execute it on `client` (whose resolver covers direct
/// hostnames at connect time). Errors never include the URL (it may carry a
/// token).
pub async fn send_guarded(
    client: &GuardedClient,
    request: reqwest::RequestBuilder,
) -> Result<reqwest::Response, String> {
    let request = request.build().map_err(|e| e.without_url().to_string())?;
    check_url_static(request.url())?;
    if client.proxied {
        precheck_proxied(request.url()).await?;
    }
    client
        .client
        .execute(request)
        .await
        .map_err(|e| e.without_url().to_string())
}

/// Read a response body, never buffering more than `max_bytes` (plus one
/// network chunk): `Truncate` stops reading at the cap and keeps the prefix,
/// `Reject` errors as soon as the cap is exceeded. A declared `Content-Length`
/// over the cap is rejected up front under `Reject`.
pub async fn read_body_capped(
    response: reqwest::Response,
    max_bytes: usize,
    oversize: OversizePolicy,
) -> Result<Vec<u8>, String> {
    use futures::StreamExt;
    let declared = response.content_length();
    if oversize == OversizePolicy::Reject {
        if let Some(len) = declared {
            if len > max_bytes as u64 {
                return Err(format!(
                    "response body exceeds maximum size ({len} > {max_bytes} bytes)"
                ));
            }
        }
    }
    let initial = declared.map_or(0, |l| l.min(max_bytes as u64) as usize);
    let mut buf: Vec<u8> = Vec::with_capacity(initial.min(1024 * 1024));
    let mut stream = response.bytes_stream();
    while let Some(chunk) = stream.next().await {
        let chunk = chunk.map_err(|e| e.without_url().to_string())?;
        let room = max_bytes - buf.len();
        if chunk.len() > room {
            match oversize {
                OversizePolicy::Truncate => {
                    buf.extend_from_slice(&chunk[..room]);
                    break;
                }
                OversizePolicy::Reject => {
                    return Err(format!(
                        "response body exceeds maximum size (> {max_bytes} bytes)"
                    ));
                }
            }
        }
        buf.extend_from_slice(&chunk);
    }
    Ok(buf)
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
    // Request-supplied URLs: proxied only under OUTBOUND_PROXY_SCOPE=all.
    let client = guarded_client(Egress::UserContent, timeout, user_agent)?;

    for _ in 0..=MAX_REDIRECTS {
        check_hop(&current)?;
        if !client.is_proxied() {
            // Pre-flight (IP literals, early errors); the guarded resolver
            // re-checks the exact name at connect time. Proxied clients run
            // the lenient pre-check inside `send_guarded` instead.
            validate_url(&current).await?;
        }

        let response = send_guarded(&client, client.get(current.clone())).await?;

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

        // Streamed: an oversized body is never buffered past the cap.
        let bytes = read_body_capped(response, max_bytes, oversize).await?;
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
    fn test_ipv6_embedded_ipv4_forbidden() {
        assert!(forbidden("64:ff9b::a9fe:a9fe")); // NAT64 of 169.254.169.254
        assert!(forbidden("64:ff9b::a00:1")); // NAT64 of 10.0.0.1
        assert!(forbidden("::a9fe:a9fe")); // IPv4-compatible
        assert!(forbidden("2002:a9fe:a9fe::1")); // 6to4 of 169.254.169.254
        assert!(forbidden("fec0::1")); // site-local
        assert!(!forbidden("64:ff9b::808:808")); // NAT64 of 8.8.8.8 is fine
        assert!(!forbidden("2002:808:808::1")); // 6to4 of 8.8.8.8
    }

    #[tokio::test]
    async fn guarded_resolver_rejects_trailing_dot_and_private_names() {
        use reqwest::dns::Resolve;
        use std::str::FromStr;
        let r = GuardedResolver::default();
        // "localhost." must be rejected exactly like "localhost" (the bypass
        // was a name-keyed pin that missed the trailing-dot form).
        for name in ["localhost", "localhost.", "LOCALHOST.", "metadata."] {
            let n = hyper014::client::connect::dns::Name::from_str(name).unwrap();
            assert!(r.resolve(n).await.is_err(), "{name} should be rejected");
        }
    }

    #[tokio::test]
    async fn guarded_client_never_connects_to_loopback_via_trailing_dot() {
        // Regression for the pinning bypass: `localhost.` must never reach a
        // loopback listener, even when the caller skips validate_url.
        let listener = tokio::net::TcpListener::bind("127.0.0.1:0").await.unwrap();
        let port = listener.local_addr().unwrap().port();
        let accepted = tokio::spawn(async move {
            tokio::time::timeout(Duration::from_millis(500), listener.accept())
                .await
                .is_ok()
        });
        let client = guarded_client(Egress::UserContent, Duration::from_secs(2), "test").unwrap();
        for url in [
            format!("http://localhost.:{port}/"),
            format!("http://localhost:{port}/"),
        ] {
            assert!(client.get(&url).send().await.is_err(), "{url} must fail");
        }
        assert!(
            !accepted.await.unwrap(),
            "loopback listener must not be reached"
        );
    }

    #[test]
    fn static_check_blocks_ip_literals_in_every_form() {
        for u in [
            "https://169.254.169.254/latest/meta-data/",
            "http://127.0.0.1:8080/",
            "http://2130706433/",         // decimal 127.0.0.1
            "http://0x7f.1/",             // hex shorthand
            "http://[::ffff:127.0.0.1]/", // IPv4-mapped
            "http://[::1]/",
            "http://[fd00:ec2::254]/", // EC2 IPv6 IMDS
            "http://10.0.0.1./",
            "http://localhost./",
            "http://LOCALHOST/",
            "ftp://example.com/",
        ] {
            let url: reqwest::Url = u.parse().unwrap();
            assert!(check_url_static(&url).is_err(), "{u} must be rejected");
        }
        let ok: reqwest::Url = "https://93.184.216.34/x".parse().unwrap();
        assert!(check_url_static(&ok).is_ok());
        let ok: reqwest::Url = "https://example.com/x".parse().unwrap();
        assert_eq!(check_url_static(&ok).unwrap(), ("example.com".into(), None));
    }

    #[tokio::test]
    async fn send_guarded_never_connects_to_ip_literal_loopback() {
        // The resolver is bypassed for IP literals; send_guarded must still
        // refuse before any connection is attempted.
        let listener = tokio::net::TcpListener::bind("127.0.0.1:0").await.unwrap();
        let port = listener.local_addr().unwrap().port();
        let accepted = tokio::spawn(async move {
            tokio::time::timeout(Duration::from_millis(500), listener.accept())
                .await
                .is_ok()
        });
        let client = guarded_client(Egress::UserContent, Duration::from_secs(2), "test").unwrap();
        for url in [
            format!("http://127.0.0.1:{port}/"),
            format!("http://[::ffff:127.0.0.1]:{port}/"),
        ] {
            let err = send_guarded(&client, client.post(&url)).await.unwrap_err();
            assert_eq!(err, DESTINATION_NOT_ALLOWED, "{url}");
        }
        assert!(!accepted.await.unwrap(), "loopback must not be reached");
    }

    /// Serve `body` once (no Content-Length when `declare` is false, so the
    /// body is read until EOF) and return the URL.
    async fn serve_once(body: Vec<u8>, declare: bool) -> String {
        use tokio::io::{AsyncReadExt, AsyncWriteExt};
        let listener = tokio::net::TcpListener::bind("127.0.0.1:0").await.unwrap();
        let port = listener.local_addr().unwrap().port();
        tokio::spawn(async move {
            let (mut sock, _) = listener.accept().await.unwrap();
            let mut req = [0u8; 1024];
            let _ = sock.read(&mut req).await;
            let head = if declare {
                format!(
                    "HTTP/1.1 200 OK\r\nContent-Length: {}\r\nConnection: close\r\n\r\n",
                    body.len()
                )
            } else {
                "HTTP/1.1 200 OK\r\nConnection: close\r\n\r\n".to_string()
            };
            let _ = sock.write_all(head.as_bytes()).await;
            for chunk in body.chunks(4096) {
                if sock.write_all(chunk).await.is_err() {
                    return;
                }
            }
            let _ = sock.shutdown().await;
        });
        format!("http://127.0.0.1:{port}/")
    }

    #[tokio::test]
    async fn body_cap_truncates_and_rejects_without_content_length() {
        // Plain client: the capped reader is what is under test (a guarded
        // client would refuse the loopback test server).
        let client = reqwest::Client::new();
        let big = vec![b'a'; 200_000];

        let url = serve_once(big.clone(), false).await;
        let resp = client.get(&url).send().await.unwrap();
        let got = read_body_capped(resp, 10_000, OversizePolicy::Truncate)
            .await
            .unwrap();
        assert_eq!(got.len(), 10_000);

        let url = serve_once(big.clone(), false).await;
        let resp = client.get(&url).send().await.unwrap();
        assert!(read_body_capped(resp, 10_000, OversizePolicy::Reject)
            .await
            .is_err());

        // Declared Content-Length over the cap: rejected up front.
        let url = serve_once(big.clone(), true).await;
        let resp = client.get(&url).send().await.unwrap();
        assert!(read_body_capped(resp, 10_000, OversizePolicy::Reject)
            .await
            .is_err());

        // Exactly at the cap / under it: returned whole.
        let url = serve_once(vec![b'b'; 10_000], false).await;
        let resp = client.get(&url).send().await.unwrap();
        let got = read_body_capped(resp, 10_000, OversizePolicy::Reject)
            .await
            .unwrap();
        assert_eq!(got.len(), 10_000);
    }

    #[tokio::test]
    async fn refusals_do_not_leak_the_resolved_address() {
        // `localhost` resolves to loopback; the client-facing error must not
        // say so (DNS / network-layout oracle).
        for u in ["http://127.0.0.1/", "http://[::1]/", "http://localhost/"] {
            let url: reqwest::Url = u.parse().unwrap();
            let err = validate_url(&url).await.err().unwrap();
            assert_eq!(err, DESTINATION_NOT_ALLOWED, "{u}");
        }
    }

    #[tokio::test]
    async fn proxied_precheck_rejects_private_and_allows_unresolvable() {
        for u in [
            "http://127.0.0.1/",
            "http://169.254.169.254/latest/",
            "http://localhost/",
        ] {
            let url: reqwest::Url = u.parse().unwrap();
            assert!(precheck_proxied(&url).await.is_err(), "{u}");
        }
        // `.invalid` never resolves (RFC 6761): only the proxy could, so the
        // pre-check defers to it.
        let url: reqwest::Url = "https://does-not-exist.invalid/x".parse().unwrap();
        assert!(precheck_proxied(&url).await.is_ok());
        let url: reqwest::Url = "ftp://example.com/".parse().unwrap();
        assert!(precheck_proxied(&url).await.is_err());
    }

    /// Minimal forward proxy: answers every request with 200 "proxied" and
    /// reports the request line it saw.
    async fn fake_proxy() -> (String, tokio::sync::mpsc::Receiver<String>) {
        use tokio::io::{AsyncReadExt, AsyncWriteExt};
        let listener = tokio::net::TcpListener::bind("127.0.0.1:0").await.unwrap();
        let port = listener.local_addr().unwrap().port();
        let (tx, rx) = tokio::sync::mpsc::channel(8);
        tokio::spawn(async move {
            while let Ok((mut sock, _)) = listener.accept().await {
                let mut buf = [0u8; 2048];
                let n = sock.read(&mut buf).await.unwrap_or(0);
                let line = String::from_utf8_lossy(&buf[..n])
                    .lines()
                    .next()
                    .unwrap_or("")
                    .to_string();
                let _ = tx.send(line).await;
                let resp =
                    "HTTP/1.1 200 OK\r\nContent-Length: 7\r\nConnection: close\r\n\r\nproxied";
                let _ = sock.write_all(resp.as_bytes()).await;
            }
        });
        (format!("http://localhost:{port}"), rx)
    }

    #[tokio::test]
    async fn proxied_client_reaches_its_private_proxy_but_not_private_targets() {
        let (proxy_url, mut seen) = fake_proxy().await;
        let resolved = ResolvedProxy {
            http: Some(proxy_url.parse().unwrap()),
            https: None,
            no_proxy: None,
        };
        let client = build_guarded_client(Some(&resolved), Duration::from_secs(5), "t").unwrap();
        assert!(client.is_proxied());

        // Unresolvable name: allowed and sent via the proxy (the `localhost`
        // proxy host itself is exempt from the resolver guard).
        let resp = send_guarded(&client, client.get("http://does-not-exist.invalid/p"))
            .await
            .unwrap();
        assert_eq!(resp.text().await.unwrap(), "proxied");
        let line = seen.recv().await.unwrap();
        assert!(
            line.starts_with("GET http://does-not-exist.invalid/p"),
            "{line}"
        );

        // Private targets never reach the proxy.
        for u in [
            "http://127.0.0.1/",
            "http://localhost./",
            "http://10.1.2.3/",
        ] {
            let err = send_guarded(&client, client.get(u)).await.unwrap_err();
            assert_eq!(err, DESTINATION_NOT_ALLOWED, "{u}");
        }
        assert!(seen.try_recv().is_err());
    }

    #[test]
    fn unconfigured_proxy_means_direct_clients() {
        // Tests never call init_outbound_proxy: every egress is direct.
        assert!(!guarded_client(Egress::Admin, Duration::from_secs(1), "t")
            .unwrap()
            .is_proxied());
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
