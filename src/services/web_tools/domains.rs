//! Domain restrictions for the proxy-side web tools (`web_search` / `web_fetch`).
//!
//! The restrictions come from the **client's server-tool definition**
//! (`{"type": "web_search_20250305", "name": "web_search", "allowed_domains":
//! [...], "blocked_domains": [...]}`) — that is the caller's policy. The model
//! may pass `allowed_domains` / `blocked_domains` in its tool call too, but
//! those can only **narrow** the client policy: model allowlists are added as
//! an extra layer every URL must also satisfy (intersection), model blocklists
//! are unioned with the client's. The executor enforces the resulting
//! [`DomainPolicy`] on every search result and every fetch URL (each redirect
//! hop included), whatever the search / fetch provider did with the hints.
//!
//! Matching: the host comes from a real URL parser (userinfo, ports, `?`/`#`,
//! backslashes, case and IDNA are handled by the WHATWG rules), only http(s)
//! URLs qualify. Filter entries are normalized the same way ([`DomainFilter`]):
//!
//! - `good.com` (or `.good.com`) matches the apex and every subdomain on a
//!   label boundary (`docs.good.com`, not `notgood.com`);
//! - `*.good.com` matches subdomains only, **not** the apex;
//! - internationalized names are compared in punycode (`bücher.de` ≡
//!   `xn--bcher-kva.de`), case-insensitively, trailing dots ignored;
//! - a port in an entry (`good.com:8443`) is ignored — filters match hosts,
//!   never ports;
//! - an entry may carry a path (`example.com/blog`), which then also has to
//!   prefix the URL path on a segment boundary;
//! - entries containing a query / fragment / userinfo / backslash /
//!   whitespace, or a `*` anywhere but a leading `*.`, are invalid. In the
//!   client's tool definition that is a 400 ([`validate_tool_definition`]);
//!   invalid entries from the model's tool input are ignored (an allowlist
//!   made only of invalid entries matches nothing — fail closed).

use serde_json::Value;

/// Host of an `http(s)` URL: lowercase, IPv6 brackets and trailing dot
/// removed. `None` for unparsable, non-http(s) or hostless URLs.
pub fn url_host(url: &str) -> Option<String> {
    let parsed = reqwest::Url::parse(url.trim()).ok()?;
    if !matches!(parsed.scheme(), "http" | "https") {
        return None;
    }
    let host = parsed
        .host_str()?
        .trim_start_matches('[')
        .trim_end_matches(']')
        .trim_end_matches('.')
        .to_ascii_lowercase();
    (!host.is_empty()).then_some(host)
}

/// A normalized domain filter entry.
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct DomainFilter {
    /// ASCII (punycode) lowercase host, no brackets / trailing dot.
    host: String,
    /// `*.host`: subdomains only, not the apex.
    subdomains_only: bool,
    /// Path prefix (percent-encoded like `Url::path`), no trailing `/`.
    path: Option<String>,
}

impl DomainFilter {
    /// Parse and normalize one filter entry.
    pub fn parse(entry: &str) -> Result<Self, String> {
        let shown: String = entry.trim().chars().take(100).collect();
        let invalid = |why: &str| format!("invalid domain filter '{shown}': {why}");
        let f = entry.trim();
        if f.is_empty() {
            return Err(invalid("empty"));
        }
        if f.chars()
            .any(|c| matches!(c, '?' | '#' | '@' | '\\') || c.is_whitespace() || c.is_control())
        {
            return Err(invalid(
                "must not contain a query, fragment, userinfo, backslash or whitespace",
            ));
        }
        // Tolerate a scheme in the filter ("https://example.com").
        let lower = f.to_ascii_lowercase();
        let f = if lower.starts_with("https://") {
            &f[8..]
        } else if lower.starts_with("http://") {
            &f[7..]
        } else {
            f
        };
        let (host_part, path_part) = match f.find('/') {
            Some(i) => (&f[..i], &f[i..]),
            None => (f, ""),
        };
        let (host_part, subdomains_only) = match host_part.strip_prefix("*.") {
            Some(rest) => (rest, true),
            None => (host_part.strip_prefix('.').unwrap_or(host_part), false),
        };
        if host_part.contains('*') || path_part.contains('*') {
            return Err(invalid("'*' is only allowed as a leading '*.'"));
        }
        if host_part.trim_end_matches('.').is_empty() {
            return Err(invalid("no host"));
        }
        // The WHATWG parser does IDNA → punycode, lowercasing, IPv4
        // normalization and path percent-encoding, exactly as for URLs.
        let parsed = reqwest::Url::parse(&format!("http://{host_part}{path_part}"))
            .map_err(|_| invalid("not a valid host"))?;
        if parsed.port().is_some() {
            tracing::debug!(filter = %shown, "Port in domain filter ignored (filters match hosts only)");
        }
        let host = parsed
            .host_str()
            .unwrap_or("")
            .trim_start_matches('[')
            .trim_end_matches(']')
            .trim_end_matches('.')
            .to_ascii_lowercase();
        if host.is_empty() {
            return Err(invalid("no host"));
        }
        let path = Some(parsed.path().trim_end_matches('/').to_string()).filter(|p| !p.is_empty());
        Ok(Self {
            host,
            subdomains_only,
            path,
        })
    }

    /// Host match, label-aligned. `host` must already be normalized
    /// ([`url_host`]).
    fn matches_host(&self, host: &str) -> bool {
        let sub = host.len() > self.host.len()
            && host.ends_with(self.host.as_str())
            && host.as_bytes()[host.len() - self.host.len() - 1] == b'.';
        sub || (!self.subdomains_only && host == self.host)
    }

    /// Full URL ↔ filter match: host and, when the filter has one, path
    /// prefix on a segment boundary.
    fn matches(&self, url: &reqwest::Url, host: &str) -> bool {
        if !self.matches_host(host) {
            return false;
        }
        match &self.path {
            None => true,
            Some(prefix) => {
                let p = url.path();
                p == prefix
                    || p.strip_prefix(prefix.as_str())
                        .is_some_and(|rest| rest.starts_with('/'))
            }
        }
    }

    /// `self` lies entirely within `other` (every URL matching `self` also
    /// matches `other`'s host rule).
    fn within(&self, other: &Self) -> bool {
        if self.subdomains_only {
            // Every subdomain of self.host: needs self.host itself or a
            // parent of it to be covered by `other` for subdomains.
            self.host == other.host || other.matches_host(&self.host)
        } else {
            other.matches_host(&self.host)
        }
    }

    /// Provider hint form (`host[/path]`). Wildcards are widened to the
    /// apex (hints may be broader; the policy is enforced afterwards).
    fn hint(&self) -> String {
        format!("{}{}", self.host, self.path.as_deref().unwrap_or(""))
    }
}

/// `host` is `domain` or a subdomain of it (label-aligned); `*.domain` matches
/// subdomains only. Case-, IDNA- and trailing-dot-insensitive. A path in
/// `domain` is ignored here; an invalid `domain` matches nothing.
pub fn domain_matches(host: &str, domain: &str) -> bool {
    let Some(host) = url_host(&format!("http://{}/", host.trim())) else {
        return false;
    };
    DomainFilter::parse(domain).is_ok_and(|d| d.matches_host(&host))
}

fn string_list(v: &Value) -> Option<Vec<&str>> {
    v.as_array().map(|a| {
        a.iter()
            .filter_map(|x| x.as_str())
            .map(str::trim)
            .filter(|s| !s.is_empty())
            .collect()
    })
}

/// Parse a list; invalid entries are dropped with a warning (`strict` = error).
fn parse_list(v: &Value, field: &str, strict: bool) -> Result<Option<Vec<DomainFilter>>, String> {
    let Some(raw) = string_list(v) else {
        return Ok(None);
    };
    let mut out = Vec::with_capacity(raw.len());
    for entry in raw {
        match DomainFilter::parse(entry) {
            Ok(f) => {
                if !out.contains(&f) {
                    out.push(f);
                }
            }
            Err(e) if strict => return Err(format!("{field}: {e}")),
            Err(e) => tracing::warn!(field, error = %e, "Ignoring invalid domain filter"),
        }
    }
    Ok(Some(out))
}

/// Validate the domain filters of a client server-tool definition. Any
/// invalid entry is a client error (400 `invalid_request_error`).
pub fn validate_tool_definition(tool: &Value) -> Result<(), String> {
    DomainPolicy::try_from_tool_definition(tool).map(|_| ())
}

/// Effective domain restrictions for one web tool.
#[derive(Debug, Clone, Default, PartialEq, Eq)]
pub struct DomainPolicy {
    /// Allowlist layers; a URL must match at least one entry of **every**
    /// layer. No layers = unrestricted. An empty layer matches nothing.
    allow_layers: Vec<Vec<DomainFilter>>,
    /// A URL matching any entry is refused (wins over allowlists).
    blocked: Vec<DomainFilter>,
}

impl DomainPolicy {
    /// Policy declared by the client's server-tool definition. An empty
    /// `allowed_domains` array means "no allowlist". Invalid entries are
    /// rejected up front by [`validate_tool_definition`]; here they are
    /// dropped (an allowlist of only invalid entries matches nothing).
    pub fn from_tool_definition(tool: &Value) -> Self {
        Self::build(tool, false).unwrap_or_default()
    }

    /// Strict variant: any invalid entry is an error.
    pub fn try_from_tool_definition(tool: &Value) -> Result<Self, String> {
        Self::build(tool, true)
    }

    fn build(tool: &Value, strict: bool) -> Result<Self, String> {
        let mut policy = Self::default();
        let raw_allowed = string_list(&tool["allowed_domains"]).unwrap_or_default();
        if let Some(allowed) = parse_list(&tool["allowed_domains"], "allowed_domains", strict)? {
            // Non-empty input keeps its layer even if every entry was
            // invalid: fail closed rather than become unrestricted.
            if !raw_allowed.is_empty() {
                policy.allow_layers.push(allowed);
            }
        }
        policy.blocked =
            parse_list(&tool["blocked_domains"], "blocked_domains", strict)?.unwrap_or_default();
        Ok(policy)
    }

    /// Narrow with the model's tool-call input: its allowlist becomes another
    /// layer (intersection), its blocklist is unioned. Never widens.
    pub fn narrowed_by(&self, input: &Value) -> Self {
        let mut out = self.clone();
        let raw_allowed = string_list(&input["allowed_domains"]).unwrap_or_default();
        if let Ok(Some(allowed)) = parse_list(&input["allowed_domains"], "allowed_domains", false) {
            if !raw_allowed.is_empty() {
                out.allow_layers.push(allowed);
            }
        }
        if let Ok(Some(blocked)) = parse_list(&input["blocked_domains"], "blocked_domains", false) {
            for b in blocked {
                if !out.blocked.contains(&b) {
                    out.blocked.push(b);
                }
            }
        }
        out
    }

    pub fn is_unrestricted(&self) -> bool {
        self.allow_layers.is_empty() && self.blocked.is_empty()
    }

    /// `Ok` when `url` may be fetched / returned under this policy.
    pub fn check_url(&self, url: &str) -> Result<(), String> {
        let parsed = reqwest::Url::parse(url.trim()).map_err(|_| "Invalid URL".to_string())?;
        let host = url_host(parsed.as_str())
            .ok_or_else(|| "URL must be an http(s) URL with a host".to_string())?;
        if self.blocked.iter().any(|b| b.matches(&parsed, &host)) {
            return Err(format!("Domain '{host}' is blocked"));
        }
        for layer in &self.allow_layers {
            if !layer.iter().any(|a| a.matches(&parsed, &host)) {
                return Err(format!("Domain '{host}' is not in allowed list"));
            }
        }
        Ok(())
    }

    /// Whether a search result URL may be shown to the model.
    pub fn permits(&self, url: &str) -> bool {
        self.check_url(url).is_ok()
    }

    /// Allowlist hint for search providers with native domain filtering: the
    /// intersection of all layers (an entry of one layer is kept when it lies
    /// within some entry of every other layer). `None` = no allowlist;
    /// `Some(empty)` = the layers are disjoint, nothing can match.
    pub fn allowed_hint(&self) -> Option<Vec<String>> {
        let (first, rest) = self.allow_layers.split_first()?;
        if rest.is_empty() {
            return Some(dedup(first.iter().map(DomainFilter::hint)));
        }
        let mut kept: Vec<&DomainFilter> = Vec::new();
        for (i, layer) in self.allow_layers.iter().enumerate() {
            for entry in layer {
                let ok = self
                    .allow_layers
                    .iter()
                    .enumerate()
                    .filter(|(j, _)| *j != i)
                    .all(|(_, other)| other.iter().any(|o| entry.within(o)));
                if ok && !kept.contains(&entry) {
                    kept.push(entry);
                }
            }
        }
        Some(dedup(kept.into_iter().map(DomainFilter::hint)))
    }

    /// Blocklist hint for search providers. Subdomain-only entries are left
    /// out (the provider would also drop the apex); the executor enforces
    /// the full policy on every result.
    pub fn blocked(&self) -> Vec<String> {
        dedup(
            self.blocked
                .iter()
                .filter(|b| !b.subdomains_only)
                .map(DomainFilter::hint),
        )
    }
}

fn dedup(items: impl Iterator<Item = String>) -> Vec<String> {
    let mut out: Vec<String> = Vec::new();
    for s in items {
        if !out.contains(&s) {
            out.push(s);
        }
    }
    out
}

#[cfg(test)]
mod tests {
    use super::*;
    use serde_json::json;

    #[test]
    fn url_host_uses_a_real_parser() {
        assert_eq!(
            url_host("https://example.com/path").as_deref(),
            Some("example.com")
        );
        assert_eq!(
            url_host("HTTPS://Example.COM./x").as_deref(),
            Some("example.com")
        );
        assert_eq!(
            url_host("https://evil.com?.good.com").as_deref(),
            Some("evil.com")
        );
        assert_eq!(
            url_host("https://evil.com#.good.com").as_deref(),
            Some("evil.com")
        );
        assert_eq!(
            url_host("https://good.com@evil.com/").as_deref(),
            Some("evil.com")
        );
        assert_eq!(url_host("https://x@evil.com/").as_deref(), Some("evil.com"));
        assert_eq!(
            url_host("https://evil.com:8443/").as_deref(),
            Some("evil.com")
        );
        assert_eq!(
            url_host("https://evil.com\\.good.com/").as_deref(),
            Some("evil.com")
        );
        assert_eq!(url_host("https://[::1]:80/").as_deref(), Some("::1"));
        assert_eq!(url_host("ftp://good.com/"), None);
        assert_eq!(url_host("javascript:alert(1)"), None);
        assert_eq!(url_host("good.com/page"), None);
    }

    #[test]
    fn domain_match_is_label_aligned() {
        assert!(domain_matches("good.com", "good.com"));
        assert!(domain_matches("docs.good.com", "good.com"));
        assert!(domain_matches("Docs.Good.com.", ".good.com"));
        assert!(domain_matches("docs.good.com", "*.good.com"));
        assert!(domain_matches("docs.good.com", "GOOD.COM."));
        assert!(!domain_matches("notgood.com", "good.com"));
        assert!(!domain_matches("good.com.evil.net", "good.com"));
        assert!(!domain_matches("good.com", ""));
        assert!(!domain_matches("good.com", "docs.good.com"));
    }

    #[test]
    fn wildcard_matches_subdomains_only() {
        assert!(!domain_matches("good.com", "*.good.com"));
        assert!(domain_matches("a.b.good.com", "*.good.com"));
        let p = DomainPolicy::from_tool_definition(&json!({"allowed_domains": ["*.good.com"]}));
        assert!(p.check_url("https://good.com/").is_err());
        assert!(p.check_url("https://docs.good.com/").is_ok());
        let p = DomainPolicy::from_tool_definition(&json!({"blocked_domains": ["*.good.com"]}));
        assert!(p.check_url("https://good.com/").is_ok());
        assert!(p.check_url("https://ads.good.com/").is_err());
        assert!(
            p.blocked().is_empty(),
            "subdomain-only entries are not hinted"
        );
    }

    #[test]
    fn idna_entries_are_normalized_to_punycode() {
        let f = DomainFilter::parse("Bücher.DE").unwrap();
        assert_eq!(f.host, "xn--bcher-kva.de");
        let p = DomainPolicy::from_tool_definition(&json!({"allowed_domains": ["bücher.de"]}));
        assert!(p.check_url("https://xn--bcher-kva.de/x").is_ok());
        assert!(p.check_url("https://www.bücher.de/x").is_ok());
        let p =
            DomainPolicy::from_tool_definition(&json!({"blocked_domains": ["xn--bcher-kva.de"]}));
        assert!(p.check_url("https://bücher.de/").is_err());
        assert!(domain_matches("shop.bücher.de", "*.xn--bcher-kva.de"));
    }

    #[test]
    fn ports_in_entries_are_ignored() {
        let f = DomainFilter::parse("good.com:8443/docs").unwrap();
        assert_eq!(f.host, "good.com");
        assert_eq!(f.path.as_deref(), Some("/docs"));
        let p = DomainPolicy::from_tool_definition(&json!({"allowed_domains": ["good.com:8443"]}));
        assert!(p.check_url("https://good.com/").is_ok());
        assert!(p.check_url("https://good.com:9999/").is_ok());
        assert!(p.check_url("https://evil.com:8443/").is_err());
        assert_eq!(DomainFilter::parse("[::1]:80").unwrap().host, "::1");
    }

    #[test]
    fn malformed_entries_are_rejected_at_parse_time() {
        for bad in [
            "good.com?x=1",
            "good.com#frag",
            "user@good.com",
            "good.com\\x",
            "good .com",
            "*",
            "*.",
            "foo*.com",
            "good.com/*",
            "",
            "https://",
        ] {
            assert!(DomainFilter::parse(bad).is_err(), "{bad} must be rejected");
            let tool = json!({"type": "web_fetch_20250910", "allowed_domains": [bad]});
            if !bad.is_empty() {
                assert!(validate_tool_definition(&tool).is_err(), "{bad}");
            }
        }
        assert!(validate_tool_definition(&json!({
            "allowed_domains": ["good.com", "https://docs.example.com/blog/"],
            "blocked_domains": ["*.ads.good.com"]
        }))
        .is_ok());
        let err = validate_tool_definition(&json!({"blocked_domains": ["x.com?y"]})).unwrap_err();
        assert!(err.starts_with("blocked_domains:"), "{err}");
    }

    #[test]
    fn invalid_only_allowlist_fails_closed() {
        let p = DomainPolicy::from_tool_definition(&json!({"allowed_domains": ["a.com?x"]}));
        assert!(!p.is_unrestricted());
        assert!(p.check_url("https://a.com/").is_err());
        let open = DomainPolicy::default();
        let narrowed = open.narrowed_by(&json!({"allowed_domains": ["#"]}));
        assert!(narrowed.check_url("https://anything.example/").is_err());
    }

    #[test]
    fn bypass_urls_are_not_allowed() {
        let p = DomainPolicy::from_tool_definition(&json!({"allowed_domains": ["good.com"]}));
        for bad in [
            "https://evil.com?.good.com",
            "https://evil.com#.good.com",
            "https://good.com@evil.com/",
            "https://evil.com\\.good.com/",
            "https://evil.com/good.com",
            "https://notgood.com/",
            "ftp://good.com/",
            "not a url",
        ] {
            assert!(p.check_url(bad).is_err(), "{bad} must be refused");
        }
        for ok in [
            "https://good.com/",
            "HTTPS://GOOD.COM/x",
            "https://docs.good.com:8443/a?b=c",
            "http://good.com./",
            "https://user@good.com/",
        ] {
            assert!(p.check_url(ok).is_ok(), "{ok} must be allowed");
        }
    }

    #[test]
    fn blocked_wins_and_paths_are_segment_prefixes() {
        let p = DomainPolicy::from_tool_definition(&json!({
            "allowed_domains": ["example.com/blog"],
            "blocked_domains": ["secret.example.com"]
        }));
        assert!(p.check_url("https://example.com/blog").is_ok());
        assert!(p.check_url("https://example.com/blog/post-1").is_ok());
        assert!(p.check_url("https://example.com/blogger").is_err());
        assert!(p.check_url("https://example.com/admin").is_err());
        assert!(p.check_url("https://secret.example.com/blog").is_err());
    }

    #[test]
    fn model_input_only_narrows() {
        let client = DomainPolicy::from_tool_definition(&json!({
            "allowed_domains": ["good.com"],
            "blocked_domains": ["bad.good.com"]
        }));
        // The model tries to widen: its allowlist is just another layer.
        let widened = client.narrowed_by(&json!({"allowed_domains": ["evil.com"]}));
        assert!(widened.check_url("https://evil.com/").is_err());
        assert!(widened.check_url("https://good.com/").is_err());
        assert_eq!(widened.allowed_hint(), Some(vec![]));

        // The model narrows within the client policy.
        let narrowed = client.narrowed_by(&json!({
            "allowed_domains": ["docs.good.com"],
            "blocked_domains": ["old.docs.good.com"]
        }));
        assert!(narrowed.check_url("https://docs.good.com/x").is_ok());
        assert!(narrowed.check_url("https://good.com/").is_err());
        assert!(narrowed.check_url("https://old.docs.good.com/").is_err());
        assert_eq!(
            narrowed.allowed_hint(),
            Some(vec!["docs.good.com".to_string()])
        );

        // Wildcard narrowing: subdomains of good.com only.
        let wild = client.narrowed_by(&json!({"allowed_domains": ["*.good.com"]}));
        assert!(wild.check_url("https://good.com/").is_err());
        assert!(wild.check_url("https://docs.good.com/").is_ok());
        assert_eq!(wild.allowed_hint(), Some(vec!["good.com".to_string()]));

        // The model cannot drop the client's blocklist (empty list = no-op).
        let cleared = client.narrowed_by(&json!({"blocked_domains": [], "allowed_domains": []}));
        assert!(cleared.check_url("https://bad.good.com/").is_err());
        assert_eq!(cleared, client);
    }

    #[test]
    fn empty_client_policy_is_unrestricted_but_model_may_restrict() {
        let open = DomainPolicy::from_tool_definition(&json!({"allowed_domains": []}));
        assert!(open.is_unrestricted());
        assert!(open.check_url("https://anything.example/").is_ok());
        assert_eq!(open.allowed_hint(), None);
        let restricted = open.narrowed_by(&json!({"allowed_domains": ["a.com"]}));
        assert!(restricted.check_url("https://b.com/").is_err());
        assert_eq!(restricted.allowed_hint(), Some(vec!["a.com".to_string()]));
    }
}
