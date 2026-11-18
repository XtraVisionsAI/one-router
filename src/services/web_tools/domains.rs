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
//! URLs qualify, and a filter matches its exact host or any subdomain on a
//! label boundary (`good.com` matches `docs.good.com`, not `notgood.com`),
//! case-insensitively with trailing dots ignored. A filter may carry a path
//! (`example.com/blog`), which then also has to prefix the URL path on a
//! segment boundary.

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

/// A normalized filter entry: host part + optional path prefix.
fn split_filter(filter: &str) -> Option<(String, Option<String>)> {
    let f = filter.trim();
    // Tolerate a scheme in the filter ("https://example.com").
    let f = f
        .strip_prefix("https://")
        .or_else(|| f.strip_prefix("http://"))
        .unwrap_or(f);
    let (host, path) = match f.find('/') {
        Some(i) => (&f[..i], Some(&f[i..])),
        None => (f, None),
    };
    let host = host
        .trim_start_matches("*.")
        .trim_start_matches('.')
        .trim_end_matches('.')
        .to_ascii_lowercase();
    if host.is_empty() {
        return None;
    }
    let path = path
        .map(|p| p.trim_end_matches('/').to_string())
        .filter(|p| !p.is_empty());
    Some((host, path))
}

/// `host` is `domain` or a subdomain of it (label-aligned). Case- and
/// trailing-dot-insensitive. A path in `domain` is ignored here.
pub fn domain_matches(host: &str, domain: &str) -> bool {
    let host = host.trim_end_matches('.').to_ascii_lowercase();
    match split_filter(domain) {
        Some((d, _)) => host == d || host.ends_with(&format!(".{d}")),
        None => false,
    }
}

/// Full URL ↔ filter match: host (label-aligned) and, when the filter has
/// one, path prefix on a segment boundary.
fn url_matches(url: &reqwest::Url, host: &str, filter: &str) -> bool {
    let Some((d, path)) = split_filter(filter) else {
        return false;
    };
    if !(host == d || host.ends_with(&format!(".{d}"))) {
        return false;
    }
    match path {
        None => true,
        Some(prefix) => {
            let p = url.path();
            p == prefix
                || p.strip_prefix(prefix.as_str())
                    .is_some_and(|rest| rest.starts_with('/'))
        }
    }
}

fn string_list(v: &Value) -> Option<Vec<String>> {
    v.as_array().map(|a| {
        a.iter()
            .filter_map(|x| x.as_str())
            .map(str::trim)
            .filter(|s| !s.is_empty())
            .map(String::from)
            .collect()
    })
}

/// Effective domain restrictions for one web tool.
#[derive(Debug, Clone, Default, PartialEq, Eq)]
pub struct DomainPolicy {
    /// Allowlist layers; a URL must match at least one entry of **every**
    /// layer. No layers = unrestricted.
    allow_layers: Vec<Vec<String>>,
    /// A URL matching any entry is refused (wins over allowlists).
    blocked: Vec<String>,
}

impl DomainPolicy {
    /// Policy declared by the client's server-tool definition. An empty
    /// `allowed_domains` array means "no allowlist".
    pub fn from_tool_definition(tool: &Value) -> Self {
        let mut policy = Self::default();
        if let Some(allowed) = string_list(&tool["allowed_domains"]) {
            if !allowed.is_empty() {
                policy.allow_layers.push(allowed);
            }
        }
        policy.blocked = string_list(&tool["blocked_domains"]).unwrap_or_default();
        policy
    }

    /// Narrow with the model's tool-call input: its allowlist becomes another
    /// layer (intersection), its blocklist is unioned. Never widens.
    pub fn narrowed_by(&self, input: &Value) -> Self {
        let mut out = self.clone();
        if let Some(allowed) = string_list(&input["allowed_domains"]) {
            if !allowed.is_empty() {
                out.allow_layers.push(allowed);
            }
        }
        if let Some(blocked) = string_list(&input["blocked_domains"]) {
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
        if self.blocked.iter().any(|b| url_matches(&parsed, &host, b)) {
            return Err(format!("Domain '{host}' is blocked"));
        }
        for layer in &self.allow_layers {
            if !layer.iter().any(|a| url_matches(&parsed, &host, a)) {
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
            return Some(first.clone());
        }
        let within = |a: &str, b: &str| -> bool {
            match split_filter(a) {
                Some((host, _)) => domain_matches(&host, b),
                None => false,
            }
        };
        let mut out: Vec<String> = Vec::new();
        for (i, layer) in self.allow_layers.iter().enumerate() {
            for entry in layer {
                let ok = self
                    .allow_layers
                    .iter()
                    .enumerate()
                    .filter(|(j, _)| *j != i)
                    .all(|(_, other)| other.iter().any(|o| within(entry, o)));
                if ok && !out.contains(entry) {
                    out.push(entry.clone());
                }
            }
        }
        Some(out)
    }

    pub fn blocked(&self) -> &[String] {
        &self.blocked
    }
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
