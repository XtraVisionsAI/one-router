//! LiteLLM model catalog: browse the price table and import entries as mappings.
//!
//! Complements `pricing_sync` (which only *updates* existing mappings): the
//! catalog lets the admin search LiteLLM entries for a provider namespace and
//! create new `model_mappings` rows from them — prices, a suggested friendly
//! source alias, and heuristically inferred capabilities included. Created rows
//! get `pricing_source = "litellm"` so the background sync keeps them fresh.

use std::sync::Arc;
use std::time::{Duration, Instant};

use serde::{Deserialize, Serialize};
use tokio::sync::RwLock;

use crate::database::models::ModelMappingRecord;
use crate::database::traits::DatabaseService;
use crate::services::pricing_sync::{self, ProviderNs, PRICING_SOURCE_LITELLM, SYNCED_MODES};
use crate::services::ModelMappingService;

/// How long a fetched table is served from memory before re-downloading.
const CACHE_TTL: Duration = Duration::from_secs(3600);

/// Cap on candidates returned per query.
const MAX_CANDIDATES: usize = 200;

struct CachedTable {
    url: String,
    fetched_at: Instant,
    data: Arc<serde_json::Value>,
}

static CACHE: RwLock<Option<CachedTable>> = RwLock::const_new(None);

/// Fetch the LiteLLM table, serving from the in-memory cache when fresh.
/// A URL change (via the `pricing_sync_url` setting) invalidates the cache.
pub async fn fetch_table_cached(url: &str) -> Result<Arc<serde_json::Value>, String> {
    {
        let cache = CACHE.read().await;
        if let Some(c) = cache.as_ref() {
            if c.url == url && c.fetched_at.elapsed() < CACHE_TTL {
                return Ok(c.data.clone());
            }
        }
    }
    let data = Arc::new(pricing_sync::fetch_litellm(url).await?);
    *CACHE.write().await = Some(CachedTable {
        url: url.to_string(),
        fetched_at: Instant::now(),
        data: data.clone(),
    });
    Ok(data)
}

/// One importable LiteLLM entry, with derived mapping fields.
#[derive(Debug, Clone, Serialize)]
pub struct ImportCandidate {
    /// Raw LiteLLM table key (send this back on import).
    pub key: String,
    /// Derived target model id (provider/ prefix stripped).
    pub target_model_id: String,
    /// Suggested friendly source model id (vendor prefix + version suffix stripped).
    pub suggested_source_id: String,
    pub mode: String,
    /// USD per 1M tokens.
    pub input_price: f64,
    pub output_price: f64,
    pub cache_read_price: Option<f64>,
    pub cache_write_price: Option<f64>,
    pub supports_reasoning: bool,
    pub supports_function_calling: bool,
    pub max_input_tokens: Option<i64>,
    pub max_output_tokens: Option<i64>,
    /// Suggested capabilities JSON (editable after import).
    pub capabilities: String,
    /// Whether a mapping with (suggested_source_id, provider) already exists.
    pub exists: bool,
}

/// Strip a leading `provider/` segment without lowercasing.
fn strip_table_prefix(key: &str) -> &str {
    match key.rsplit_once('/') {
        Some((_, rest)) => rest,
        None => key,
    }
}

/// Derive a friendly source alias from a target model id.
///
/// For Bedrock ids this strips the region prefix (`us.`), the vendor segment
/// (`anthropic.` / `openai.` / `moonshot.` …) and a trailing version suffix
/// (`-v2:0` / `-1:0`), e.g. `us.anthropic.claude-3-5-sonnet-20241022-v2:0`
/// → `claude-3-5-sonnet-20241022`. Other providers' ids are already friendly.
pub(crate) fn friendly_source_id(ns: ProviderNs, target_model_id: &str) -> String {
    if ns != ProviderNs::Bedrock {
        return target_model_id.to_string();
    }
    let mut id = pricing_sync::strip_region_prefix(target_model_id);
    // Vendor segment: a short leading token before '.', e.g. "anthropic.".
    if let Some((vendor, rest)) = id.split_once('.') {
        if !vendor.is_empty() && !rest.is_empty() && !vendor.contains('-') {
            id = rest;
        }
    }
    // Version suffix: "-v2:0", "-1:0", "-v1:8k" …
    if let Some(colon) = id.rfind(':') {
        if let Some(dash) = id[..colon].rfind('-') {
            let ver = &id[dash + 1..colon];
            let ver_digits = ver.strip_prefix('v').unwrap_or(ver);
            if !ver_digits.is_empty() && ver_digits.chars().all(|c| c.is_ascii_digit()) {
                return id[..dash].to_string();
            }
        }
    }
    id.to_string()
}

/// Infer a capabilities JSON from a LiteLLM spec + model id heuristics.
fn infer_capabilities(spec: &serde_json::Map<String, serde_json::Value>, target: &str) -> String {
    let mode = spec.get("mode").and_then(|v| v.as_str()).unwrap_or("chat");
    if mode == "embedding" {
        return r#"{"thinking":{"enabled":false,"style":"claude"},"document":{"enabled":false},"tool_use":{"enabled":false},"ptc":{"enabled":false}}"#.to_string();
    }
    let tool_use = spec
        .get("supports_function_calling")
        .and_then(|v| v.as_bool())
        .unwrap_or(false);
    let reasoning = spec
        .get("supports_reasoning")
        .and_then(|v| v.as_bool())
        .unwrap_or(false);
    let lower = target.to_ascii_lowercase();
    let style = if lower.contains("nova") {
        "nova2"
    } else if lower.contains("kimi") {
        "kimi"
    } else if lower.contains("claude") {
        "claude"
    } else {
        "effort"
    };
    format!(
        r#"{{"thinking":{{"enabled":{reasoning},"style":"{style}"}},"document":{{"enabled":false}},"tool_use":{{"enabled":{tool_use}}},"ptc":{{"enabled":false}}}}"#
    )
}

/// List import candidates for a provider, filtered by a substring query.
pub fn list_candidates(
    data: &serde_json::Value,
    provider: &str,
    query: &str,
    existing: &[ModelMappingRecord],
) -> Result<Vec<ImportCandidate>, String> {
    let ns = ProviderNs::from_mapping_provider(provider)
        .ok_or_else(|| format!("unknown provider '{provider}'"))?;
    let obj = data
        .as_object()
        .ok_or_else(|| "unexpected pricing payload".to_string())?;
    let query = query.to_ascii_lowercase();

    let mut out = Vec::new();
    for (key, spec) in obj {
        if key == "sample_spec" {
            continue;
        }
        let Some(spec) = spec.as_object() else {
            continue;
        };
        let Some(entry_ns) = spec
            .get("litellm_provider")
            .and_then(|v| v.as_str())
            .and_then(ProviderNs::from_litellm_provider)
        else {
            continue;
        };
        if entry_ns != ns {
            continue;
        }
        let Some(mode) = spec.get("mode").and_then(|v| v.as_str()) else {
            continue;
        };
        if !SYNCED_MODES.contains(&mode) {
            continue;
        }
        let (Some(input), Some(output)) = (
            pricing_sync::to_price_per_million(spec.get("input_cost_per_token")),
            pricing_sync::to_price_per_million(spec.get("output_cost_per_token")),
        ) else {
            continue;
        };
        if !query.is_empty() && !key.to_ascii_lowercase().contains(&query) {
            continue;
        }

        let target = strip_table_prefix(key).to_string();
        let suggested = friendly_source_id(ns, &target);
        let exists = existing
            .iter()
            .any(|m| m.provider == provider && m.source_model_id == suggested);
        out.push(ImportCandidate {
            key: key.clone(),
            capabilities: infer_capabilities(spec, &target),
            suggested_source_id: suggested,
            target_model_id: target,
            mode: mode.to_string(),
            input_price: input,
            output_price: output,
            cache_read_price: pricing_sync::to_price_per_million(
                spec.get("cache_read_input_token_cost"),
            ),
            cache_write_price: pricing_sync::to_price_per_million(
                spec.get("cache_creation_input_token_cost"),
            ),
            supports_reasoning: spec
                .get("supports_reasoning")
                .and_then(|v| v.as_bool())
                .unwrap_or(false),
            supports_function_calling: spec
                .get("supports_function_calling")
                .and_then(|v| v.as_bool())
                .unwrap_or(false),
            max_input_tokens: spec.get("max_input_tokens").and_then(|v| v.as_i64()),
            max_output_tokens: spec.get("max_output_tokens").and_then(|v| v.as_i64()),
            exists,
        });
        if out.len() >= MAX_CANDIDATES {
            break;
        }
    }
    out.sort_by(|a, b| a.key.cmp(&b.key));
    Ok(out)
}

/// One item selected for import.
#[derive(Debug, Deserialize)]
pub struct ImportItem {
    /// Raw LiteLLM table key from `list_candidates`.
    pub key: String,
    /// Override for the source model id; defaults to the friendly alias.
    #[serde(default)]
    pub source_model_id: Option<String>,
}

/// Result of an import run. Labels are source model ids.
#[derive(Debug, Default, Serialize)]
pub struct ImportSummary {
    pub created: Vec<String>,
    pub skipped_existing: Vec<String>,
    pub not_found: Vec<String>,
}

/// Import the selected LiteLLM entries as new model mappings (status active,
/// `pricing_source = "litellm"`). Existing (source, provider) rows are never
/// overwritten; an auto-suggested alias that collides falls back to the full
/// target model id before being reported as skipped.
pub async fn import_models(
    database: Arc<dyn DatabaseService>,
    model_mapping: Arc<ModelMappingService>,
    data: &serde_json::Value,
    provider: &str,
    items: &[ImportItem],
) -> Result<ImportSummary, String> {
    let existing = database
        .model_mapping()
        .list_mappings()
        .await
        .map_err(|e| format!("failed to list model mappings: {e}"))?;
    let candidates = list_candidates(data, provider, "", &existing)?;

    let mut summary = ImportSummary::default();
    let mut taken: std::collections::HashSet<String> = existing
        .iter()
        .filter(|m| m.provider == provider)
        .map(|m| m.source_model_id.clone())
        .collect();
    let now = chrono::Utc::now().timestamp();

    for item in items {
        let Some(cand) = candidates.iter().find(|c| c.key == item.key) else {
            summary.not_found.push(item.key.clone());
            continue;
        };

        // Explicit source id is honored as-is; the auto alias falls back to the
        // full target id when taken.
        let source = match &item.source_model_id {
            Some(explicit) => {
                if taken.contains(explicit) {
                    summary.skipped_existing.push(explicit.clone());
                    continue;
                }
                explicit.clone()
            }
            None => {
                if !taken.contains(&cand.suggested_source_id) {
                    cand.suggested_source_id.clone()
                } else if !taken.contains(&cand.target_model_id) {
                    cand.target_model_id.clone()
                } else {
                    summary
                        .skipped_existing
                        .push(cand.suggested_source_id.clone());
                    continue;
                }
            }
        };

        let record = ModelMappingRecord {
            source_model_id: source.clone(),
            target_model_id: cand.target_model_id.clone(),
            provider: provider.to_string(),
            display_name: source.clone(),
            input_price: cand.input_price,
            output_price: cand.output_price,
            cache_read_price: cand.cache_read_price.unwrap_or(0.0),
            cache_write_price: cand.cache_write_price.unwrap_or(0.0),
            priority: 0,
            status: "active".to_string(),
            created_at: now,
            updated_at: None,
            capabilities: Some(cand.capabilities.clone()),
            pricing_source: PRICING_SOURCE_LITELLM.to_string(),
        };
        database
            .model_mapping()
            .upsert_mapping(&record)
            .await
            .map_err(|e| format!("failed to create mapping {source}: {e}"))?;
        taken.insert(source.clone());
        summary.created.push(source);
    }

    if !summary.created.is_empty() {
        model_mapping.invalidate_all().await;
    }

    tracing::info!(
        provider = provider,
        created = summary.created.len(),
        skipped_existing = summary.skipped_existing.len(),
        not_found = summary.not_found.len(),
        "LiteLLM model import completed"
    );
    Ok(summary)
}

#[cfg(test)]
mod tests {
    use super::*;
    use serde_json::json;

    fn table() -> serde_json::Value {
        json!({
            "sample_spec": {"litellm_provider": "openai", "mode": "chat"},
            "us.anthropic.claude-3-5-sonnet-20241022-v2:0": {
                "litellm_provider": "bedrock",
                "mode": "chat",
                "input_cost_per_token": 0.000003,
                "output_cost_per_token": 0.000015,
                "supports_function_calling": true,
                "supports_reasoning": true
            },
            "bedrock_mantle/openai.gpt-5.5": {
                "litellm_provider": "bedrock_mantle",
                "mode": "responses",
                "input_cost_per_token": 0.0000055,
                "output_cost_per_token": 0.000033,
                "supports_function_calling": true,
                "supports_reasoning": true
            },
            "cohere.embed-v4:0": {
                "litellm_provider": "bedrock",
                "mode": "embedding",
                "input_cost_per_token": 0.00000012,
                "output_cost_per_token": 0.0
            },
            "gpt-4o": {
                "litellm_provider": "openai",
                "mode": "chat",
                "input_cost_per_token": 0.0000025,
                "output_cost_per_token": 0.00001,
                "supports_function_calling": true
            }
        })
    }

    #[test]
    fn friendly_alias_strips_region_vendor_and_version() {
        assert_eq!(
            friendly_source_id(
                ProviderNs::Bedrock,
                "us.anthropic.claude-3-5-sonnet-20241022-v2:0"
            ),
            "claude-3-5-sonnet-20241022"
        );
        assert_eq!(
            friendly_source_id(ProviderNs::Bedrock, "openai.gpt-oss-120b-1:0"),
            "gpt-oss-120b"
        );
        assert_eq!(
            friendly_source_id(ProviderNs::Bedrock, "openai.gpt-5.5"),
            "gpt-5.5"
        );
        // Non-bedrock ids pass through untouched.
        assert_eq!(friendly_source_id(ProviderNs::OpenAI, "gpt-4o"), "gpt-4o");
    }

    #[test]
    fn candidates_filter_by_provider_and_query() {
        let data = table();
        let all = list_candidates(&data, "bedrock", "", &[]).unwrap();
        let keys: Vec<&str> = all.iter().map(|c| c.key.as_str()).collect();
        assert_eq!(
            keys,
            vec![
                "bedrock_mantle/openai.gpt-5.5",
                "cohere.embed-v4:0",
                "us.anthropic.claude-3-5-sonnet-20241022-v2:0"
            ]
        );

        let gpt = list_candidates(&data, "bedrock", "gpt", &[]).unwrap();
        assert_eq!(gpt.len(), 1);
        assert_eq!(gpt[0].target_model_id, "openai.gpt-5.5");
        assert_eq!(gpt[0].suggested_source_id, "gpt-5.5");
        assert_eq!(gpt[0].input_price, 5.5);
        // reasoning → thinking enabled, effort style for gpt
        assert!(gpt[0].capabilities.contains(r#""enabled":true"#));
        assert!(gpt[0].capabilities.contains(r#""style":"effort""#));

        let openai = list_candidates(&data, "openai", "", &[]).unwrap();
        assert_eq!(openai.len(), 1);
        assert_eq!(openai[0].key, "gpt-4o");
    }

    #[test]
    fn candidate_capabilities_inference() {
        let data = table();
        let all = list_candidates(&data, "bedrock", "", &[]).unwrap();
        let claude = all.iter().find(|c| c.key.contains("claude")).unwrap();
        assert!(claude.capabilities.contains(r#""style":"claude""#));
        let embed = all.iter().find(|c| c.key.contains("embed")).unwrap();
        assert_eq!(embed.mode, "embedding");
        assert!(embed
            .capabilities
            .contains(r#""tool_use":{"enabled":false}"#));
    }

    #[test]
    fn candidate_marks_existing_source() {
        let data = table();
        let existing = vec![ModelMappingRecord {
            source_model_id: "gpt-5.5".into(),
            target_model_id: "openai.gpt-5.5".into(),
            provider: "bedrock".into(),
            display_name: "gpt-5.5".into(),
            input_price: 0.0,
            output_price: 0.0,
            cache_read_price: 0.0,
            cache_write_price: 0.0,
            priority: 0,
            status: "active".into(),
            created_at: 0,
            updated_at: None,
            capabilities: None,
            pricing_source: "litellm".into(),
        }];
        let gpt = list_candidates(&data, "bedrock", "gpt-5.5", &existing).unwrap();
        assert!(gpt[0].exists);
    }
}
