//! Client address resolution and CIDR matching.
//!
//! The client address is the TCP peer unless the peer is a **trusted proxy**
//! (`TRUSTED_PROXY_CIDRS`); then `X-Forwarded-For` is walked right-to-left and
//! the first hop that is not itself a trusted proxy is the client. Without
//! trusted proxies configured, `X-Forwarded-For` is ignored entirely — any
//! client can forge it.

use axum::http::HeaderMap;
use std::net::{IpAddr, SocketAddr};

/// An IPv4 / IPv6 network in CIDR notation (`10.0.0.0/8`, `::1/128`); a bare
/// address is a single-host network.
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct Cidr {
    addr: IpAddr,
    prefix: u8,
}

impl Cidr {
    pub fn parse(s: &str) -> Result<Self, String> {
        let s = s.trim();
        let (addr_s, prefix_s) = match s.split_once('/') {
            Some((a, p)) => (a, Some(p)),
            None => (s, None),
        };
        let addr: IpAddr = addr_s
            .parse()
            .map_err(|_| format!("'{s}' is not a valid IP address / CIDR"))?;
        let max = if addr.is_ipv4() { 32 } else { 128 };
        let prefix = match prefix_s {
            Some(p) => p
                .parse::<u8>()
                .ok()
                .filter(|p| *p <= max)
                .ok_or_else(|| format!("'{s}': prefix must be 0..={max}"))?,
            None => max,
        };
        Ok(Self { addr, prefix })
    }

    pub fn contains(&self, ip: IpAddr) -> bool {
        // Compare IPv4-mapped IPv6 clients against IPv4 networks.
        let ip = match ip {
            IpAddr::V6(v6) => v6.to_ipv4_mapped().map(IpAddr::V4).unwrap_or(ip),
            v4 => v4,
        };
        match (self.addr, ip) {
            (IpAddr::V4(net), IpAddr::V4(ip)) => {
                let mask = u32::MAX.checked_shl(32 - self.prefix as u32).unwrap_or(0);
                (u32::from(net) & mask) == (u32::from(ip) & mask)
            }
            (IpAddr::V6(net), IpAddr::V6(ip)) => {
                let mask = u128::MAX.checked_shl(128 - self.prefix as u32).unwrap_or(0);
                (u128::from(net) & mask) == (u128::from(ip) & mask)
            }
            _ => false,
        }
    }
}

/// Parse a list of CIDRs, reporting the first invalid entry.
pub fn parse_cidrs<S: AsRef<str>>(items: &[S]) -> Result<Vec<Cidr>, String> {
    items.iter().map(|s| Cidr::parse(s.as_ref())).collect()
}

/// Parse `TRUSTED_PROXY_CIDRS`-style comma-separated input.
pub fn parse_cidr_list(raw: &str) -> Result<Vec<Cidr>, String> {
    let items: Vec<&str> = raw
        .split(',')
        .map(str::trim)
        .filter(|s| !s.is_empty())
        .collect();
    parse_cidrs(&items)
}

pub fn in_any(cidrs: &[Cidr], ip: IpAddr) -> bool {
    cidrs.iter().any(|c| c.contains(ip))
}

/// Parse one `X-Forwarded-For` hop: a bare IPv4/IPv6 address, `ipv4:port`,
/// `[ipv6]` or `[ipv6]:port`. Anything else is `None`.
fn parse_hop(token: &str) -> Option<IpAddr> {
    let t = token.trim();
    if let Ok(ip) = t.parse::<IpAddr>() {
        return Some(ip);
    }
    if let Some(rest) = t.strip_prefix('[') {
        let (inner, after) = rest.split_once(']')?;
        if !(after.is_empty() || after.strip_prefix(':').is_some_and(is_port)) {
            return None;
        }
        return inner.parse::<std::net::Ipv6Addr>().ok().map(IpAddr::V6);
    }
    let (host, port) = t.split_once(':')?;
    if !is_port(port) {
        return None;
    }
    host.parse::<std::net::Ipv4Addr>().ok().map(IpAddr::V4)
}

fn is_port(s: &str) -> bool {
    !s.is_empty() && s.len() <= 5 && s.bytes().all(|b| b.is_ascii_digit())
}

/// Resolve the client address (see module docs). `None` when the peer address
/// is unknown (no `ConnectInfo`, e.g. in unit tests).
///
/// The walk runs over the **raw** comma-separated hops, right to left: trusted
/// proxies are skipped, the first untrusted address is the client. An
/// unparsable hop (garbage, `unknown`, empty) stops the walk fail-closed: the
/// answer is the nearest trusted hop already passed (or the peer) — never an
/// entry further left, which the client could have written itself.
pub fn client_ip(
    peer: Option<SocketAddr>,
    headers: &HeaderMap,
    trusted: &[Cidr],
) -> Option<IpAddr> {
    let peer = peer?.ip();
    if trusted.is_empty() || !in_any(trusted, peer) {
        return Some(peer);
    }
    let hops: Vec<&str> = headers
        .get_all("x-forwarded-for")
        .iter()
        .map(|v| v.to_str().unwrap_or(""))
        .flat_map(|v| v.split(','))
        .collect();
    // Nearest trusted hop seen so far; starts at the (trusted) peer.
    let mut nearest = peer;
    for token in hops.iter().rev() {
        match parse_hop(token) {
            None => return Some(nearest),
            Some(ip) if in_any(trusted, ip) => nearest = ip,
            Some(ip) => return Some(ip),
        }
    }
    // Every hop is a trusted proxy: the leftmost one is the best we have.
    Some(nearest)
}

#[cfg(test)]
mod tests {
    use super::*;
    use axum::http::HeaderValue;

    fn ip(s: &str) -> IpAddr {
        s.parse().unwrap()
    }

    #[test]
    fn cidr_parse_and_contains() {
        let net = Cidr::parse("10.0.0.0/8").unwrap();
        assert!(net.contains(ip("10.1.2.3")));
        assert!(!net.contains(ip("11.0.0.1")));
        assert!(net.contains(ip("::ffff:10.9.9.9"))); // IPv4-mapped
        let host = Cidr::parse("192.168.1.5").unwrap();
        assert!(host.contains(ip("192.168.1.5")));
        assert!(!host.contains(ip("192.168.1.6")));
        assert!(Cidr::parse("0.0.0.0/0").unwrap().contains(ip("8.8.8.8")));
        let v6 = Cidr::parse("2001:db8::/32").unwrap();
        assert!(v6.contains(ip("2001:db8::1")));
        assert!(!v6.contains(ip("10.0.0.1")));
        assert!(Cidr::parse("10.0.0.0/33").is_err());
        assert!(Cidr::parse("nope").is_err());
        assert!(parse_cidr_list("10.0.0.0/8, ,172.16.0.0/12").unwrap().len() == 2);
    }

    #[test]
    fn forwarded_for_only_honored_from_trusted_peer() {
        let mut h = HeaderMap::new();
        h.insert(
            "x-forwarded-for",
            HeaderValue::from_static("1.2.3.4, 10.0.0.7"),
        );
        let peer: SocketAddr = "10.0.0.2:5555".parse().unwrap();
        let trusted = parse_cidr_list("10.0.0.0/8").unwrap();
        // Untrusted config: header ignored.
        assert_eq!(client_ip(Some(peer), &h, &[]), Some(ip("10.0.0.2")));
        // Trusted: walk right-to-left past 10.0.0.7 (trusted) to 1.2.3.4.
        assert_eq!(client_ip(Some(peer), &h, &trusted), Some(ip("1.2.3.4")));
        // Peer not a trusted proxy: forged header ignored.
        let outsider: SocketAddr = "8.8.8.8:1".parse().unwrap();
        assert_eq!(client_ip(Some(outsider), &h, &trusted), Some(ip("8.8.8.8")));
        assert_eq!(client_ip(None, &h, &trusted), None);
    }

    fn xff(v: &'static str) -> HeaderMap {
        let mut h = HeaderMap::new();
        h.insert("x-forwarded-for", HeaderValue::from_static(v));
        h
    }

    #[test]
    fn unparsable_hop_stops_walk_fail_closed() {
        let peer: SocketAddr = "10.0.0.2:5555".parse().unwrap();
        let trusted = parse_cidr_list("10.0.0.0/8").unwrap();
        // Attacker-written "1.1.1.1" left of a garbage hop must not win.
        let h = xff("1.1.1.1, garbage, 10.0.0.7");
        assert_eq!(client_ip(Some(peer), &h, &trusted), Some(ip("10.0.0.7")));
        // Garbage as the rightmost hop -> the peer itself.
        let h = xff("1.1.1.1, unknown");
        assert_eq!(client_ip(Some(peer), &h, &trusted), Some(ip("10.0.0.2")));
        // An empty hop is malformed too.
        let h = xff("1.1.1.1, ");
        assert_eq!(client_ip(Some(peer), &h, &trusted), Some(ip("10.0.0.2")));
        // All trusted -> leftmost.
        let h = xff("10.0.0.9, 10.0.0.7");
        assert_eq!(client_ip(Some(peer), &h, &trusted), Some(ip("10.0.0.9")));
        // No header -> peer.
        assert_eq!(
            client_ip(Some(peer), &HeaderMap::new(), &trusted),
            Some(ip("10.0.0.2"))
        );
    }

    #[test]
    fn hops_with_ports_are_parsed() {
        let peer: SocketAddr = "10.0.0.2:5555".parse().unwrap();
        let trusted = parse_cidr_list("10.0.0.0/8").unwrap();
        let h = xff("9.9.9.9, 1.2.3.4:8080, 10.0.0.7:443");
        assert_eq!(client_ip(Some(peer), &h, &trusted), Some(ip("1.2.3.4")));
        let h = xff("[2001:db8::5]:1234");
        assert_eq!(client_ip(Some(peer), &h, &trusted), Some(ip("2001:db8::5")));
        assert_eq!(parse_hop("[2001:db8::5]"), Some(ip("2001:db8::5")));
        assert_eq!(parse_hop("2001:db8::5"), Some(ip("2001:db8::5")));
        assert_eq!(parse_hop("1.2.3.4:"), None);
        assert_eq!(parse_hop("1.2.3.4:abc"), None);
        assert_eq!(parse_hop("[2001:db8::5]x"), None);
        assert_eq!(parse_hop("host.example:80"), None);
    }
}
