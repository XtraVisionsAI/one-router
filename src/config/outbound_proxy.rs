//! Opt-in outbound proxy for SSRF-guarded fetches (`OUTBOUND_PROXY` /
//! `OUTBOUND_PROXY_SCOPE`).
//!
//! Guarded clients (`services::web_tools::ssrf::guarded_client`) ignore the
//! system proxy by default: a proxy resolves names on our behalf, which takes
//! the connect-time DNS guard out of the loop. Deployments that only reach
//! the internet through a proxy (intranets, mainland China) opt in here:
//!
//! - `OUTBOUND_PROXY`: `off` (default) | `env` (`HTTPS_PROXY` / `HTTP_PROXY` /
//!   `NO_PROXY`) | an explicit `http://` / `https://` proxy URL (userinfo
//!   allowed for proxy auth; never logged) or a scheme-less `host:port`
//!   (explicit port required). Boolean-like values (`on`, `true`, `1`, `yes`,
//!   `enabled`, …) are rejected at startup instead of becoming `http://on:80`.
//! - `OUTBOUND_PROXY_SCOPE`: `admin` (default: pricing sync, LiteLLM catalog /
//!   import, budget webhook) | `all` (also web_fetch direct fetches and image
//!   URL inlining — user-controlled URLs).
//!
//! Proxied requests keep the static URL checks and a local DNS pre-check
//! (forbidden address → reject; local resolution failure → allow for
//! public-looking names, the proxy may be the only resolver, but refuse
//! single-label / `*.internal`-style / IP-embedding wildcard-DNS names), so the
//! proxy must enforce its own egress ACL
//! for private ranges. Read once at startup; not hot-reloadable.

use std::fmt;

pub const OUTBOUND_PROXY_ENV: &str = "OUTBOUND_PROXY";
pub const OUTBOUND_PROXY_SCOPE_ENV: &str = "OUTBOUND_PROXY_SCOPE";

/// Which guarded-fetch features use the proxy.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Default)]
pub enum ProxyScope {
    /// Admin-configured URLs only (pricing sync, LiteLLM, budget webhook).
    #[default]
    Admin,
    /// Also user-controlled URLs (web_fetch direct, image URL inlining).
    All,
}

/// The kind of guarded fetch a client is built for.
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum Egress {
    /// Admin-supplied URL (pricing table, LiteLLM catalog, budget webhook).
    Admin,
    /// Request-supplied URL (web_fetch direct fetch, image URL inlining).
    UserContent,
}

/// `OUTBOUND_PROXY` value.
#[derive(Clone, PartialEq, Eq, Default)]
pub enum ProxyMode {
    #[default]
    Off,
    /// Use `HTTPS_PROXY` / `HTTP_PROXY` / `NO_PROXY` (and lowercase forms).
    Env,
    /// Explicit proxy URL.
    Url(reqwest::Url),
}

impl fmt::Debug for ProxyMode {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            ProxyMode::Off => f.write_str("Off"),
            ProxyMode::Env => f.write_str("Env"),
            ProxyMode::Url(u) => write!(f, "Url({})", redact_proxy_url(u)),
        }
    }
}

/// Parsed `OUTBOUND_PROXY` + `OUTBOUND_PROXY_SCOPE`.
#[derive(Debug, Clone, Default, PartialEq, Eq)]
pub struct OutboundProxyConfig {
    pub mode: ProxyMode,
    pub scope: ProxyScope,
}

/// Concrete proxy endpoints a guarded client is built with.
#[derive(Clone, Default, PartialEq, Eq)]
pub struct ResolvedProxy {
    /// Proxy for `http://` targets.
    pub http: Option<reqwest::Url>,
    /// Proxy for `https://` targets.
    pub https: Option<reqwest::Url>,
    /// `NO_PROXY` list (env mode only). Hosts matching it connect directly,
    /// through the guarded resolver.
    pub no_proxy: Option<String>,
}

impl fmt::Debug for ResolvedProxy {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        f.debug_struct("ResolvedProxy")
            .field("http", &self.http.as_ref().map(redact_proxy_url))
            .field("https", &self.https.as_ref().map(redact_proxy_url))
            .field("no_proxy", &self.no_proxy)
            .finish()
    }
}

/// `scheme://[***@]host[:port]` — never the userinfo, path or query.
pub fn redact_proxy_url(url: &reqwest::Url) -> String {
    let auth = if url.username().is_empty() && url.password().is_none() {
        ""
    } else {
        "***@"
    };
    let host = url.host_str().unwrap_or("");
    match url.port() {
        Some(p) => format!("{}://{auth}{host}:{p}", url.scheme()),
        None => format!("{}://{auth}{host}", url.scheme()),
    }
}

/// Boolean-like words that are not proxy URLs (`OUTBOUND_PROXY=on` would
/// otherwise become `http://on:80`).
const BOOLEAN_WORDS: &[&str] = &[
    "on", "1", "true", "yes", "y", "enable", "enabled", "0", "false", "no", "n", "disable",
    "disabled", "none", "null",
];

/// `host:port` with an explicit numeric port (userinfo allowed, `[v6]:port`
/// accepted). Used for scheme-less proxy values.
fn has_explicit_port(raw: &str) -> bool {
    let authority = raw.split('/').next().unwrap_or("");
    let host_port = authority.rsplit('@').next().unwrap_or("");
    host_port.rsplit_once(':').is_some_and(|(host, port)| {
        !host.is_empty()
            && !port.is_empty()
            && port.bytes().all(|b| b.is_ascii_digit())
            && (!host.starts_with('[') || host.ends_with(']'))
    })
}

/// Validate a proxy URL (`http` / `https`, with a host). A scheme-less value
/// (env style, `proxy.corp:3128`) is read as `http://` and must carry an
/// explicit port; boolean-like words (`on`, `true`, `1`, …) are rejected.
/// Errors never echo the input — it may carry a password.
pub fn validate_proxy_url(raw: &str) -> Result<reqwest::Url, String> {
    validate_proxy_value(raw, false)
}

/// `lenient` (values read from `HTTPS_PROXY` / `HTTP_PROXY` in `env` mode):
/// a scheme-less value without a port is accepted as `http://host` — the
/// same reading curl and reqwest apply to these variables — with a warning,
/// so existing proxy environments keep working. The explicit
/// `OUTBOUND_PROXY=<value>` form stays strict.
fn validate_proxy_value(raw: &str, lenient: bool) -> Result<reqwest::Url, String> {
    let raw = raw.trim();
    if BOOLEAN_WORDS.iter().any(|w| raw.eq_ignore_ascii_case(w)) {
        return Err(format!(
            "'{raw}' is not a proxy; use `env` (HTTPS_PROXY / HTTP_PROXY) or a proxy URL \
             such as http://proxy.corp:3128 (`off` disables)"
        ));
    }
    // Env-style values often omit the scheme ("proxy.corp:3128").
    let with_scheme = if raw.contains("://") {
        raw.to_string()
    } else if has_explicit_port(raw) {
        format!("http://{raw}")
    } else if lenient {
        tracing::warn!(
            "proxy environment variable has no scheme or port; assuming http://<host> (port 80)"
        );
        format!("http://{raw}")
    } else {
        return Err(
            "a proxy value without a scheme must be host:port (e.g. proxy.corp:3128); \
             otherwise use `env` or a full http:// / https:// URL"
                .to_string(),
        );
    };
    let url = reqwest::Url::parse(&with_scheme)
        .map_err(|_| "proxy URL is not a valid URL".to_string())?;
    match url.scheme() {
        "http" | "https" => {}
        "socks5" | "socks5h" | "socks4" | "socks4a" => {
            return Err(
                "SOCKS proxies are not supported by this build; use an http:// or https:// proxy"
                    .to_string(),
            )
        }
        s => return Err(format!("proxy URL scheme '{s}' is not supported")),
    }
    if url.host_str().is_none_or(str::is_empty) {
        return Err("proxy URL has no host".to_string());
    }
    if url.query().is_some() || url.fragment().is_some() {
        return Err("proxy URL must not carry a query or fragment".to_string());
    }
    Ok(url)
}

impl ProxyScope {
    fn parse(raw: Option<&str>) -> Result<Self, String> {
        match raw.map(|s| s.trim().to_ascii_lowercase()).as_deref() {
            None | Some("") | Some("admin") => Ok(Self::Admin),
            Some("all") => Ok(Self::All),
            Some(other) => Err(format!(
                "invalid {OUTBOUND_PROXY_SCOPE_ENV} '{other}' (expected admin or all)"
            )),
        }
    }

    pub fn as_str(self) -> &'static str {
        match self {
            Self::Admin => "admin",
            Self::All => "all",
        }
    }
}

impl OutboundProxyConfig {
    /// Read `OUTBOUND_PROXY` / `OUTBOUND_PROXY_SCOPE` from the environment.
    pub fn from_env() -> Result<Self, String> {
        Self::parse(
            std::env::var(OUTBOUND_PROXY_ENV).ok().as_deref(),
            std::env::var(OUTBOUND_PROXY_SCOPE_ENV).ok().as_deref(),
        )
    }

    pub fn parse(mode: Option<&str>, scope: Option<&str>) -> Result<Self, String> {
        let mode = match mode.map(str::trim) {
            None | Some("") => ProxyMode::Off,
            Some(m) if m.eq_ignore_ascii_case("off") => ProxyMode::Off,
            Some(m) if m.eq_ignore_ascii_case("env") => ProxyMode::Env,
            Some(url) => ProxyMode::Url(
                validate_proxy_url(url)
                    .map_err(|e| format!("invalid {OUTBOUND_PROXY_ENV}: {e}"))?,
            ),
        };
        Ok(Self {
            mode,
            scope: ProxyScope::parse(scope)?,
        })
    }

    pub fn is_off(&self) -> bool {
        self.mode == ProxyMode::Off
    }

    /// Whether a guarded client for `egress` uses the proxy (when one resolves).
    pub fn applies_to(&self, egress: Egress) -> bool {
        !self.is_off() && (egress == Egress::Admin || self.scope == ProxyScope::All)
    }

    /// Concrete proxy endpoints. `env` reads `HTTPS_PROXY` / `HTTP_PROXY` /
    /// `NO_PROXY` (and lowercase forms) through `lookup`. `Ok(None)` = no
    /// proxy in effect (off, or env mode with no proxy variable set).
    pub fn resolve(
        &self,
        lookup: impl Fn(&str) -> Option<String>,
    ) -> Result<Option<ResolvedProxy>, String> {
        match &self.mode {
            ProxyMode::Off => Ok(None),
            ProxyMode::Url(u) => Ok(Some(ResolvedProxy {
                http: Some(u.clone()),
                https: Some(u.clone()),
                no_proxy: None,
            })),
            ProxyMode::Env => {
                let read = |names: &[&str]| {
                    names
                        .iter()
                        .find_map(|n| lookup(n).filter(|v| !v.trim().is_empty()))
                };
                let parse = |names: &[&str]| -> Result<Option<reqwest::Url>, String> {
                    read(names)
                        .map(|v| {
                            validate_proxy_value(&v, true)
                                .map_err(|e| format!("invalid {}: {e}", names[0]))
                        })
                        .transpose()
                };
                let https = parse(&["HTTPS_PROXY", "https_proxy"])?;
                let http = parse(&["HTTP_PROXY", "http_proxy"])?;
                if https.is_none() && http.is_none() {
                    return Ok(None);
                }
                Ok(Some(ResolvedProxy {
                    http,
                    https,
                    no_proxy: read(&["NO_PROXY", "no_proxy"]),
                }))
            }
        }
    }

    /// Startup notes: `(is_warning, message)`. Never contains proxy secrets.
    pub fn startup_messages(&self, lookup: impl Fn(&str) -> Option<String>) -> Vec<(bool, String)> {
        let mut out = Vec::new();
        let env_proxy_set = ["HTTPS_PROXY", "https_proxy", "HTTP_PROXY", "http_proxy"]
            .iter()
            .any(|n| lookup(n).is_some_and(|v| !v.trim().is_empty()));
        match &self.mode {
            ProxyMode::Off => {
                if env_proxy_set {
                    out.push((
                        false,
                        "HTTPS_PROXY/HTTP_PROXY is set but OUTBOUND_PROXY=off: pricing sync, \
                         LiteLLM catalog/import, budget webhooks, web_fetch (direct) and image URL \
                         inlining connect directly. Set OUTBOUND_PROXY=env (and \
                         OUTBOUND_PROXY_SCOPE=all for web_fetch/images) to route them through it."
                            .to_string(),
                    ));
                }
                return out;
            }
            ProxyMode::Env if !env_proxy_set => {
                out.push((
                    true,
                    "OUTBOUND_PROXY=env but neither HTTPS_PROXY nor HTTP_PROXY is set; guarded \
                     fetches connect directly."
                        .to_string(),
                ));
                return out;
            }
            _ => {}
        }
        let target = match &self.mode {
            ProxyMode::Url(u) => redact_proxy_url(u),
            _ => "HTTPS_PROXY/HTTP_PROXY".to_string(),
        };
        out.push((
            false,
            format!(
                "Outbound proxy {target} enabled for guarded fetches (scope={}).",
                self.scope.as_str()
            ),
        ));
        if self.scope == ProxyScope::All {
            out.push((
                true,
                "OUTBOUND_PROXY_SCOPE=all routes user-supplied URLs (web_fetch, image URLs) \
                 through the proxy, which resolves names itself: the proxy MUST deny private \
                 destinations (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16, 127.0.0.0/8, \
                 169.254.0.0/16, 100.64.0.0/10, fc00::/7, ::1)."
                    .to_string(),
            ));
        }
        out
    }
}

impl ResolvedProxy {
    /// Lowercase proxy hostnames (non-IP): the guarded resolver must let the
    /// client resolve its own proxy, which typically lives on a private address.
    pub fn proxy_hosts(&self) -> Vec<String> {
        let mut hosts: Vec<String> = [&self.http, &self.https]
            .into_iter()
            .flatten()
            .filter_map(|u| u.host_str())
            .map(|h| h.trim_end_matches('.').to_ascii_lowercase())
            .filter(|h| h.parse::<std::net::IpAddr>().is_err() && !h.starts_with('['))
            .collect();
        hosts.sort();
        hosts.dedup();
        hosts
    }

    /// Install the proxies on a client builder.
    pub fn apply(
        &self,
        mut builder: reqwest::ClientBuilder,
    ) -> Result<reqwest::ClientBuilder, String> {
        let no_proxy = || {
            self.no_proxy
                .as_deref()
                .and_then(reqwest::NoProxy::from_string)
        };
        if let Some(u) = &self.https {
            let p = reqwest::Proxy::https(u.as_str())
                .map_err(|_| "invalid https proxy".to_string())?
                .no_proxy(no_proxy());
            builder = builder.proxy(p);
        }
        if let Some(u) = &self.http {
            let p = reqwest::Proxy::http(u.as_str())
                .map_err(|_| "invalid http proxy".to_string())?
                .no_proxy(no_proxy());
            builder = builder.proxy(p);
        }
        Ok(builder)
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::collections::HashMap;

    fn env(pairs: &[(&str, &str)]) -> impl Fn(&str) -> Option<String> {
        let m: HashMap<String, String> = pairs
            .iter()
            .map(|(k, v)| (k.to_string(), v.to_string()))
            .collect();
        move |k| m.get(k).cloned()
    }

    #[test]
    fn parse_modes_and_scope() {
        assert_eq!(
            OutboundProxyConfig::parse(None, None).unwrap(),
            OutboundProxyConfig::default()
        );
        assert!(OutboundProxyConfig::parse(Some("OFF"), None)
            .unwrap()
            .is_off());
        assert_eq!(
            OutboundProxyConfig::parse(Some("env"), Some("ALL")).unwrap(),
            OutboundProxyConfig {
                mode: ProxyMode::Env,
                scope: ProxyScope::All
            }
        );
        let c = OutboundProxyConfig::parse(Some("http://u:secret@proxy.corp:3128"), None).unwrap();
        assert!(matches!(c.mode, ProxyMode::Url(_)));
        assert_eq!(c.scope, ProxyScope::Admin);
        assert!(OutboundProxyConfig::parse(Some("env"), Some("everything")).is_err());
    }

    #[test]
    fn invalid_proxy_urls_are_rejected_without_echoing_secrets() {
        for bad in [
            "socks5://u:secret@1.2.3.4:1080",
            "ftp://u:secret@proxy:21",
            "http://u:secret@proxy:3128/?x=1",
            "http://",
        ] {
            let err = OutboundProxyConfig::parse(Some(bad), None).unwrap_err();
            assert!(!err.contains("secret"), "{bad}: {err}");
        }
        // Scheme-less values default to http.
        let u = validate_proxy_url("proxy.corp:3128").unwrap();
        assert_eq!(u.scheme(), "http");
        assert_eq!(u.port(), Some(3128));
        let u = validate_proxy_url("u:secret@10.0.0.5:8080").unwrap();
        assert_eq!(u.host_str(), Some("10.0.0.5"));
        assert!(validate_proxy_url("[fd00::1]:3128").is_ok());
    }

    #[test]
    fn boolean_like_and_bare_words_are_rejected() {
        for bad in [
            "on", "ON", "1", "true", "True", "yes", "enabled", "enable", "y", "0", "false", "no",
            "disabled", "none",
        ] {
            let err = OutboundProxyConfig::parse(Some(bad), None).unwrap_err();
            assert!(err.contains("`env`"), "{bad}: {err}");
        }
        // Scheme-less without an explicit port: not guessed as :80.
        for bad in [
            "proxy",
            "proxy.corp",
            "proxy.corp:",
            "proxy.corp:abc",
            "u:secret@proxy.corp",
            "[fd00::1]",
        ] {
            let err = OutboundProxyConfig::parse(Some(bad), None).unwrap_err();
            assert!(err.contains("host:port"), "{bad}: {err}");
            assert!(!err.contains("secret"), "{bad}: {err}");
        }
        // Env mode applies the same rule to HTTPS_PROXY / HTTP_PROXY.
        let c = OutboundProxyConfig::parse(Some("env"), None).unwrap();
        assert!(c.resolve(env(&[("HTTPS_PROXY", "true")])).is_err());
        // …but a scheme-less, port-less env value is read like curl does
        // (http://host:80) instead of failing startup.
        let r = c
            .resolve(env(&[("HTTP_PROXY", "proxy.corp")]))
            .unwrap()
            .unwrap();
        assert_eq!(r.http.as_ref().unwrap().as_str(), "http://proxy.corp/");
        assert!(c
            .resolve(env(&[("HTTP_PROXY", "proxy.corp:3128")]))
            .unwrap()
            .is_some());
        // Full URLs keep working with or without a port.
        assert!(validate_proxy_url("http://proxy.corp").is_ok());
        assert!(validate_proxy_url("https://proxy.corp").is_ok());
    }

    #[test]
    fn redaction_hides_userinfo() {
        let u = validate_proxy_url("http://user:pa55@proxy.corp:3128/").unwrap();
        assert_eq!(redact_proxy_url(&u), "http://***@proxy.corp:3128");
        let dbg = format!("{:?}", ProxyMode::Url(u));
        assert!(!dbg.contains("pa55") && !dbg.contains("user"));
        let u = validate_proxy_url("https://proxy.corp").unwrap();
        assert_eq!(redact_proxy_url(&u), "https://proxy.corp");
    }

    #[test]
    fn scope_selects_egress() {
        let off = OutboundProxyConfig::default();
        assert!(!off.applies_to(Egress::Admin));
        let admin = OutboundProxyConfig::parse(Some("env"), None).unwrap();
        assert!(admin.applies_to(Egress::Admin));
        assert!(!admin.applies_to(Egress::UserContent));
        let all = OutboundProxyConfig::parse(Some("env"), Some("all")).unwrap();
        assert!(all.applies_to(Egress::UserContent));
    }

    #[test]
    fn env_mode_resolution() {
        let c = OutboundProxyConfig::parse(Some("env"), None).unwrap();
        assert_eq!(c.resolve(env(&[])).unwrap(), None);
        let r = c
            .resolve(env(&[
                ("https_proxy", "http://proxy.corp:3128"),
                ("NO_PROXY", "internal.corp"),
            ]))
            .unwrap()
            .unwrap();
        assert_eq!(r.https.unwrap().host_str(), Some("proxy.corp"));
        assert!(r.http.is_none());
        assert_eq!(r.no_proxy.as_deref(), Some("internal.corp"));
        assert!(c
            .resolve(env(&[("HTTPS_PROXY", "socks5://1.2.3.4:1080")]))
            .is_err());
    }

    #[test]
    fn proxy_hosts_exclude_ip_literals() {
        let r = ResolvedProxy {
            http: Some(validate_proxy_url("http://10.0.0.5:3128").unwrap()),
            https: Some(validate_proxy_url("http://Proxy.Corp.:3128").unwrap()),
            no_proxy: None,
        };
        assert_eq!(r.proxy_hosts(), vec!["proxy.corp".to_string()]);
        assert!(r.apply(reqwest::Client::builder()).is_ok());
    }

    #[test]
    fn startup_messages() {
        let off = OutboundProxyConfig::default();
        assert!(off.startup_messages(env(&[])).is_empty());
        let m = off.startup_messages(env(&[("HTTPS_PROXY", "http://p:1")]));
        assert_eq!(m.len(), 1);
        assert!(m[0].1.contains("OUTBOUND_PROXY=env"));

        let all = OutboundProxyConfig::parse(Some("http://u:pw@p.corp:1"), Some("all")).unwrap();
        let m = all.startup_messages(env(&[]));
        assert!(m.iter().any(|(w, s)| *w && s.contains("169.254.0.0/16")));
        assert!(m.iter().all(|(_, s)| !s.contains("pw")));

        let env_none = OutboundProxyConfig::parse(Some("env"), None).unwrap();
        assert!(env_none.startup_messages(env(&[]))[0].0);
    }
}
