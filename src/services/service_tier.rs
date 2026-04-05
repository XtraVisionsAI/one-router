//! Service tier resolution and provider-specific mapping.
//!
//! Backend `service_tier` field semantics (three states):
//! - `None`              → do not send service_tier to the provider
//! - `Some("passthrough")` → parse the request's service_tier, normalize, and map to the target provider
//! - `Some("flex")` etc. → force this tier regardless of the request value

/// Resolve the effective service_tier for a specific provider.
///
/// Returns `None` when no service_tier should be sent (backend is `None`,
/// provider doesn't support the tier, or the input value is unrecognized).
pub fn resolve_for_provider(
    backend_tier: Option<&str>,
    request_tier: Option<&str>,
    backend_type: &str,
) -> Option<String> {
    match backend_tier {
        None => None,
        Some("passthrough") => {
            let unified = request_tier.and_then(normalize_input)?;
            map_to_provider(&unified, backend_type)
        }
        Some(tier) => map_to_provider(tier, backend_type),
    }
}

/// Normalize any provider-specific input value to a unified tier name.
fn normalize_input(input: &str) -> Option<String> {
    match input.to_lowercase().as_str() {
        "auto" | "default" => Some("default".into()),
        "standard_only" | "flex" => Some("flex".into()),
        "priority" => Some("priority".into()),
        "reserved" => Some("reserved".into()),
        _ => None,
    }
}

/// Map a unified tier name to the provider-specific value.
fn map_to_provider(tier: &str, backend_type: &str) -> Option<String> {
    match (tier, backend_type) {
        // bedrock: supports all four tiers
        ("default", "bedrock") => Some("default".into()),
        ("flex", "bedrock") => Some("flex".into()),
        ("priority", "bedrock") => Some("priority".into()),
        ("reserved", "bedrock") => Some("reserved".into()),

        // anthropic: auto / standard_only only
        ("default", "anthropic") => Some("auto".into()),
        ("flex", "anthropic") => Some("standard_only".into()),
        ("priority", "anthropic") => Some("auto".into()),

        // openai: default / flex / priority
        ("default", "openai") => Some("default".into()),
        ("flex", "openai") => Some("flex".into()),
        ("priority", "openai") => Some("priority".into()),

        // gemini: no service tier support
        (_, "gemini") => None,

        // unsupported combination
        _ => None,
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    // ── resolve_for_provider ────────────────────────────────────────

    #[test]
    fn none_backend_returns_none() {
        assert_eq!(resolve_for_provider(None, Some("flex"), "bedrock"), None);
        assert_eq!(resolve_for_provider(None, None, "anthropic"), None);
    }

    #[test]
    fn passthrough_forwards_request_tier() {
        assert_eq!(
            resolve_for_provider(Some("passthrough"), Some("flex"), "bedrock"),
            Some("flex".into())
        );
        assert_eq!(
            resolve_for_provider(Some("passthrough"), Some("standard_only"), "bedrock"),
            Some("flex".into())
        );
        assert_eq!(
            resolve_for_provider(Some("passthrough"), Some("auto"), "anthropic"),
            Some("auto".into())
        );
    }

    #[test]
    fn passthrough_with_no_request_tier_returns_none() {
        assert_eq!(
            resolve_for_provider(Some("passthrough"), None, "bedrock"),
            None
        );
    }

    #[test]
    fn passthrough_with_unknown_request_tier_returns_none() {
        assert_eq!(
            resolve_for_provider(Some("passthrough"), Some("garbage"), "openai"),
            None
        );
    }

    #[test]
    fn override_ignores_request_tier() {
        assert_eq!(
            resolve_for_provider(Some("flex"), Some("priority"), "bedrock"),
            Some("flex".into())
        );
        assert_eq!(
            resolve_for_provider(Some("priority"), Some("flex"), "anthropic"),
            Some("auto".into())
        );
    }

    #[test]
    fn gemini_always_none() {
        assert_eq!(resolve_for_provider(Some("flex"), None, "gemini"), None);
        assert_eq!(
            resolve_for_provider(Some("passthrough"), Some("flex"), "gemini"),
            None
        );
    }

    #[test]
    fn reserved_only_bedrock() {
        assert_eq!(
            resolve_for_provider(Some("reserved"), None, "bedrock"),
            Some("reserved".into())
        );
        assert_eq!(
            resolve_for_provider(Some("reserved"), None, "anthropic"),
            None
        );
        assert_eq!(resolve_for_provider(Some("reserved"), None, "openai"), None);
    }

    // ── normalize_input ─────────────────────────────────────────────

    #[test]
    fn normalize_case_insensitive() {
        assert_eq!(normalize_input("AUTO"), Some("default".into()));
        assert_eq!(normalize_input("Flex"), Some("flex".into()));
        assert_eq!(normalize_input("STANDARD_ONLY"), Some("flex".into()));
    }

    // ── map_to_provider ─────────────────────────────────────────────

    #[test]
    fn map_bedrock_all_tiers() {
        assert_eq!(
            map_to_provider("default", "bedrock"),
            Some("default".into())
        );
        assert_eq!(map_to_provider("flex", "bedrock"), Some("flex".into()));
        assert_eq!(
            map_to_provider("priority", "bedrock"),
            Some("priority".into())
        );
        assert_eq!(
            map_to_provider("reserved", "bedrock"),
            Some("reserved".into())
        );
    }

    #[test]
    fn map_anthropic_tiers() {
        assert_eq!(map_to_provider("default", "anthropic"), Some("auto".into()));
        assert_eq!(
            map_to_provider("flex", "anthropic"),
            Some("standard_only".into())
        );
        assert_eq!(
            map_to_provider("priority", "anthropic"),
            Some("auto".into())
        );
        assert_eq!(map_to_provider("reserved", "anthropic"), None);
    }

    #[test]
    fn map_openai_tiers() {
        assert_eq!(map_to_provider("default", "openai"), Some("default".into()));
        assert_eq!(map_to_provider("flex", "openai"), Some("flex".into()));
        assert_eq!(
            map_to_provider("priority", "openai"),
            Some("priority".into())
        );
        assert_eq!(map_to_provider("reserved", "openai"), None);
    }
}
