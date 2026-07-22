//! Model pricing sync from the LiteLLM price table.
//!
//! Pulls BerriAI/litellm's `model_prices_and_context_window.json` and overwrites
//! the inline prices of `model_mappings` rows whose `pricing_source == "litellm"`.
//! Rows marked `"manual"` are pinned and never touched (unless `overwrite_manual`).
//!
//! one-router stores pricing inline per mapping (keyed by source model), not in a
//! separate table, so sync only *updates existing mappings* — it never creates
//! rows (a price with no source→target mapping is meaningless). It covers all four
//! backends: each mapping's `provider` selects the LiteLLM provider namespace, and
//! its `target_model_id` is matched against the table (with Bedrock region-prefix
//! fallback).
//!
//! LiteLLM costs are USD per token; we store USD per 1M tokens.

use crate::database::models::ModelMappingRecord;
use crate::database::traits::DatabaseService;
use crate::services::ModelMappingService;
use serde::Serialize;
use std::collections::HashMap;
use std::sync::Arc;
use std::time::Duration;

pub const PRICING_SOURCE_LITELLM: &str = "litellm";
pub const PRICING_SOURCE_MANUAL: &str = "manual";

/// Default source URL (overridable via the `pricing_sync_url` setting).
pub const DEFAULT_PRICING_SYNC_URL: &str =
    "https://raw.githubusercontent.com/BerriAI/litellm/main/model_prices_and_context_window.json";

/// Safety cap on the downloaded body (the real table is ~2 MiB).
const MAX_BODY_BYTES: usize = 8 * 1024 * 1024;
const FETCH_TIMEOUT: Duration = Duration::from_secs(30);

/// Bedrock region prefixes stripped when matching a target model ID.
const REGION_PREFIXES: &[&str] = &[
    "us.", "eu.", "apac.", "global.", "jp.", "au.", "ca.", "sa.", "us-gov.",
];

/// Only chat-style entries are imported (skips embeddings/image/rerank pricing,
/// which one-router prices manually).
const SYNCED_MODES: &[&str] = &["chat", "responses"];

/// Two per-1M prices are considered equal within this tolerance (float noise guard).
const PRICE_EPSILON: f64 = 1e-6;

/// LiteLLM provider namespace, selected from a mapping's `provider`.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
enum ProviderNs {
    Bedrock,
    Anthropic,
    OpenAI,
    Gemini,
}

impl ProviderNs {
    fn from_mapping_provider(p: &str) -> Option<Self> {
        match p.to_ascii_lowercase().as_str() {
            "bedrock" => Some(Self::Bedrock),
            "anthropic" => Some(Self::Anthropic),
            "openai" => Some(Self::OpenAI),
            "gemini" => Some(Self::Gemini),
            _ => None,
        }
    }

    /// The `litellm_provider` values that belong to this namespace.
    fn from_litellm_provider(litellm_provider: &str) -> Option<Self> {
        match litellm_provider {
            "bedrock" | "bedrock_converse" => Some(Self::Bedrock),
            "anthropic" => Some(Self::Anthropic),
            "openai" => Some(Self::OpenAI),
            "gemini" | "vertex_ai-language-models" | "vertex_ai" => Some(Self::Gemini),
            _ => None,
        }
    }
}

/// Per-1M-token prices extracted from the LiteLLM table. `None` = source did not
/// provide that field (must not overwrite a stored value with zero/null).
#[derive(Debug, Clone, Default, PartialEq)]
pub struct Prices {
    pub input: Option<f64>,
    pub output: Option<f64>,
    pub cache_read: Option<f64>,
    pub cache_write: Option<f64>,
}

/// Index of extracted prices keyed by (namespace, normalized model id).
#[derive(Debug, Default)]
pub struct PricingIndex {
    map: HashMap<(ProviderNs, String), Prices>,
}

impl PricingIndex {
    fn get(&self, ns: ProviderNs, model_id: &str) -> Option<&Prices> {
        self.map.get(&(ns, model_id.to_ascii_lowercase()))
    }

    /// Number of (namespace, model) entries indexed.
    pub fn len(&self) -> usize {
        self.map.len()
    }

    pub fn is_empty(&self) -> bool {
        self.map.is_empty()
    }
}

/// Options controlling a sync run.
#[derive(Debug, Clone, Copy, Default)]
pub struct SyncOptions {
    /// Compute the plan without writing anything.
    pub dry_run: bool,
    /// Also overwrite rows whose `pricing_source != "litellm"` (pinned rows).
    pub overwrite_manual: bool,
}

/// Result of a sync run. Model labels are `"provider/source_model_id"`.
#[derive(Debug, Default, Serialize, Clone)]
pub struct SyncSummary {
    pub updated: Vec<String>,
    pub skipped_manual: Vec<String>,
    pub not_found: Vec<String>,
    pub unchanged: usize,
    pub source_models: usize,
    pub dry_run: bool,
}

/// Convert a LiteLLM per-token cost to USD per 1M tokens. Rejects negatives.
fn to_price_per_million(value: Option<&serde_json::Value>) -> Option<f64> {
    let cost = value?.as_f64()?;
    if cost < 0.0 {
        return None;
    }
    Some(cost * 1_000_000.0)
}

/// Strip a leading Bedrock region prefix (`us.`, `eu.`, …), if present.
fn strip_region_prefix(model_id: &str) -> &str {
    for prefix in REGION_PREFIXES {
        if let Some(rest) = model_id.strip_prefix(prefix) {
            return rest;
        }
    }
    model_id
}

/// Normalize a LiteLLM key or target model id: drop a leading `provider/` segment
/// (`bedrock/…`, `gemini/…`, `vertex_ai/…`) and lowercase.
fn normalize_model_id(id: &str) -> String {
    let base = match id.rsplit_once('/') {
        Some((_, rest)) => rest,
        None => id,
    };
    base.to_ascii_lowercase()
}

/// Parse the LiteLLM payload into a price index keyed by (namespace, model id).
pub fn build_index(data: &serde_json::Value) -> PricingIndex {
    let mut index = PricingIndex::default();
    let Some(obj) = data.as_object() else {
        return index;
    };

    for (key, spec) in obj {
        if key == "sample_spec" {
            continue;
        }
        let Some(spec) = spec.as_object() else {
            continue;
        };
        let Some(litellm_provider) = spec.get("litellm_provider").and_then(|v| v.as_str()) else {
            continue;
        };
        let Some(ns) = ProviderNs::from_litellm_provider(litellm_provider) else {
            continue;
        };
        match spec.get("mode").and_then(|v| v.as_str()) {
            Some(mode) if SYNCED_MODES.contains(&mode) => {}
            _ => continue,
        }

        let input = to_price_per_million(spec.get("input_cost_per_token"));
        let output = to_price_per_million(spec.get("output_cost_per_token"));
        // Require at least the base rates to consider this a usable pricing entry.
        if input.is_none() || output.is_none() {
            continue;
        }
        let prices = Prices {
            input,
            output,
            cache_read: to_price_per_million(spec.get("cache_read_input_token_cost")),
            cache_write: to_price_per_million(spec.get("cache_creation_input_token_cost")),
        };

        // Index under the normalized key (drops any `provider/` prefix).
        index
            .map
            .insert((ns, normalize_model_id(key)), prices.clone());
    }

    index
}

/// Look up prices for a mapping's (provider, target model id). Tries: exact →
/// region-stripped → `us.`-prefixed → provider-prefix-stripped.
pub fn match_prices(index: &PricingIndex, provider: &str, target_model_id: &str) -> Option<Prices> {
    let ns = ProviderNs::from_mapping_provider(provider)?;

    let stripped = strip_region_prefix(target_model_id);
    let candidates = [
        target_model_id.to_string(),
        stripped.to_string(),
        format!("us.{stripped}"),
        normalize_model_id(target_model_id),
    ];
    for cand in candidates {
        if let Some(p) = index.get(ns, &cand) {
            return Some(p.clone());
        }
        // Also try the normalized (prefix-stripped) form of each candidate.
        let norm = normalize_model_id(&cand);
        if norm != cand {
            if let Some(p) = index.get(ns, &norm) {
                return Some(p.clone());
            }
        }
    }
    None
}

fn label(record: &ModelMappingRecord) -> String {
    format!("{}/{}", record.provider, record.source_model_id)
}

fn differs(current: f64, new: f64) -> bool {
    (current - new).abs() > PRICE_EPSILON
}

/// Reconcile mappings against the price index. Returns the summary and the set of
/// records to write (empty on dry_run-equivalent no-ops). Never nulls out a stored
/// price when the source lacks that field.
pub fn reconcile(
    mappings: &[ModelMappingRecord],
    index: &PricingIndex,
    opts: &SyncOptions,
) -> (SyncSummary, Vec<ModelMappingRecord>) {
    let mut summary = SyncSummary {
        source_models: index.len(),
        dry_run: opts.dry_run,
        ..Default::default()
    };
    let mut to_write = Vec::new();

    for m in mappings {
        if m.pricing_source == PRICING_SOURCE_MANUAL && !opts.overwrite_manual {
            summary.skipped_manual.push(label(m));
            continue;
        }
        let Some(prices) = match_prices(index, &m.provider, &m.target_model_id) else {
            summary.not_found.push(label(m));
            continue;
        };

        let mut updated = m.clone();
        let mut changed = false;
        if let Some(v) = prices.input {
            if differs(m.input_price, v) {
                updated.input_price = v;
                changed = true;
            }
        }
        if let Some(v) = prices.output {
            if differs(m.output_price, v) {
                updated.output_price = v;
                changed = true;
            }
        }
        if let Some(v) = prices.cache_read {
            if differs(m.cache_read_price, v) {
                updated.cache_read_price = v;
                changed = true;
            }
        }
        if let Some(v) = prices.cache_write {
            if differs(m.cache_write_price, v) {
                updated.cache_write_price = v;
                changed = true;
            }
        }

        if !changed {
            summary.unchanged += 1;
            continue;
        }
        summary.updated.push(label(m));
        if !opts.dry_run {
            to_write.push(updated);
        }
    }

    (summary, to_write)
}

/// Download and parse the LiteLLM price table. https-only, timeout- and size-capped.
async fn fetch_litellm(url: &str) -> Result<serde_json::Value, String> {
    let parsed: reqwest::Url = url
        .parse()
        .map_err(|e| format!("invalid pricing_sync_url: {e}"))?;
    if parsed.scheme() != "https" {
        return Err("pricing_sync_url must use https".to_string());
    }

    let client = reqwest::Client::builder()
        .timeout(FETCH_TIMEOUT)
        .build()
        .map_err(|e| e.to_string())?;
    let resp = client
        .get(parsed)
        .send()
        .await
        .map_err(|e| format!("pricing table fetch failed: {e}"))?;
    if !resp.status().is_success() {
        return Err(format!(
            "pricing table fetch failed: HTTP {}",
            resp.status().as_u16()
        ));
    }
    if let Some(len) = resp.content_length() {
        if len as usize > MAX_BODY_BYTES {
            return Err(format!(
                "pricing table too large ({len} > {MAX_BODY_BYTES} bytes)"
            ));
        }
    }
    let bytes = resp.bytes().await.map_err(|e| e.to_string())?;
    if bytes.len() > MAX_BODY_BYTES {
        return Err(format!(
            "pricing table too large ({} > {MAX_BODY_BYTES} bytes)",
            bytes.len()
        ));
    }
    let data: serde_json::Value =
        serde_json::from_slice(&bytes).map_err(|e| format!("invalid pricing JSON: {e}"))?;
    if !data.is_object() {
        return Err("unexpected pricing payload: not a JSON object".to_string());
    }
    Ok(data)
}

/// Fetch the LiteLLM table and reconcile it against the stored mappings, writing
/// price updates unless `dry_run`. Invalidates the model-mapping cache on change.
pub async fn run_sync(
    database: Arc<dyn DatabaseService>,
    model_mapping: Arc<ModelMappingService>,
    url: &str,
    opts: SyncOptions,
) -> Result<SyncSummary, String> {
    let data = fetch_litellm(url).await?;
    let index = build_index(&data);
    let mappings = database
        .model_mapping()
        .list_mappings()
        .await
        .map_err(|e| format!("failed to list model mappings: {e}"))?;

    let (summary, to_write) = reconcile(&mappings, &index, &opts);

    if !opts.dry_run && !to_write.is_empty() {
        for rec in &to_write {
            database
                .model_mapping()
                .upsert_mapping(rec)
                .await
                .map_err(|e| format!("failed to update mapping {}: {e}", label(rec)))?;
        }
        model_mapping.invalidate_all().await;
    }

    tracing::info!(
        source_models = summary.source_models,
        updated = summary.updated.len(),
        unchanged = summary.unchanged,
        skipped_manual = summary.skipped_manual.len(),
        not_found = summary.not_found.len(),
        dry_run = summary.dry_run,
        "LiteLLM pricing sync completed"
    );

    Ok(summary)
}

#[cfg(test)]
mod tests {
    use super::*;
    use serde_json::json;

    fn sample_table() -> serde_json::Value {
        json!({
            "sample_spec": {"litellm_provider": "openai", "mode": "chat"},
            "gpt-4o": {
                "litellm_provider": "openai",
                "mode": "chat",
                "input_cost_per_token": 0.0000025,
                "output_cost_per_token": 0.00001,
                "cache_read_input_token_cost": 0.00000125
            },
            "text-embedding-3-small": {
                "litellm_provider": "openai",
                "mode": "embedding",
                "input_cost_per_token": 0.00000002,
                "output_cost_per_token": 0.0
            },
            "claude-3-5-sonnet-20241022": {
                "litellm_provider": "anthropic",
                "mode": "chat",
                "input_cost_per_token": 0.000003,
                "output_cost_per_token": 0.000015,
                "cache_read_input_token_cost": 0.0000003,
                "cache_creation_input_token_cost": 0.00000375
            },
            "anthropic.claude-3-5-sonnet-20241022-v2:0": {
                "litellm_provider": "bedrock",
                "mode": "chat",
                "input_cost_per_token": 0.000003,
                "output_cost_per_token": 0.000015
            },
            "gemini/gemini-1.5-pro": {
                "litellm_provider": "gemini",
                "mode": "chat",
                "input_cost_per_token": 0.00000125,
                "output_cost_per_token": 0.000005
            }
        })
    }

    fn mapping(
        source: &str,
        provider: &str,
        target: &str,
        prices: (f64, f64, f64, f64),
        pricing_source: &str,
    ) -> ModelMappingRecord {
        ModelMappingRecord {
            source_model_id: source.into(),
            target_model_id: target.into(),
            provider: provider.into(),
            display_name: source.into(),
            input_price: prices.0,
            output_price: prices.1,
            cache_read_price: prices.2,
            cache_write_price: prices.3,
            priority: 0,
            status: "active".into(),
            created_at: 0,
            updated_at: None,
            capabilities: None,
            pricing_source: pricing_source.into(),
        }
    }

    #[test]
    fn test_per_token_to_per_million() {
        assert_eq!(to_price_per_million(Some(&json!(0.0000025))), Some(2.5));
        assert_eq!(to_price_per_million(Some(&json!(0.000015))), Some(15.0));
        assert_eq!(to_price_per_million(Some(&json!(-1.0))), None);
        assert_eq!(to_price_per_million(None), None);
    }

    #[test]
    fn test_build_index_filters_by_mode_and_provider() {
        let index = build_index(&sample_table());
        // embedding mode is excluded; sample_spec skipped.
        assert!(index
            .get(ProviderNs::OpenAI, "text-embedding-3-small")
            .is_none());
        assert!(index.get(ProviderNs::OpenAI, "gpt-4o").is_some());
        assert!(index
            .get(ProviderNs::Anthropic, "claude-3-5-sonnet-20241022")
            .is_some());
        // gemini/ prefix normalized away.
        assert!(index.get(ProviderNs::Gemini, "gemini-1.5-pro").is_some());
    }

    #[test]
    fn test_namespace_isolation() {
        let index = build_index(&sample_table());
        // An OpenAI model must not resolve under the Anthropic namespace.
        assert!(index.get(ProviderNs::Anthropic, "gpt-4o").is_none());
        assert!(match_prices(&index, "anthropic", "gpt-4o").is_none());
    }

    #[test]
    fn test_match_bedrock_region_prefix() {
        let index = build_index(&sample_table());
        // Region-prefixed target falls back to the un-prefixed source entry.
        let p = match_prices(
            &index,
            "bedrock",
            "us.anthropic.claude-3-5-sonnet-20241022-v2:0",
        )
        .expect("region-prefixed bedrock id should match");
        assert_eq!(p.input, Some(3.0));
        assert_eq!(p.output, Some(15.0));
    }

    #[test]
    fn test_reconcile_updates_and_converts() {
        let index = build_index(&sample_table());
        let mappings = vec![mapping(
            "gpt-4o",
            "openai",
            "gpt-4o",
            (0.0, 0.0, 0.0, 0.0),
            PRICING_SOURCE_LITELLM,
        )];
        let (summary, writes) = reconcile(&mappings, &index, &SyncOptions::default());
        assert_eq!(summary.updated.len(), 1);
        assert_eq!(writes.len(), 1);
        assert_eq!(writes[0].input_price, 2.5);
        assert_eq!(writes[0].output_price, 10.0);
        assert_eq!(writes[0].cache_read_price, 1.25);
    }

    #[test]
    fn test_reconcile_skips_manual() {
        let index = build_index(&sample_table());
        let mappings = vec![mapping(
            "gpt-4o",
            "openai",
            "gpt-4o",
            (0.0, 0.0, 0.0, 0.0),
            PRICING_SOURCE_MANUAL,
        )];
        let (summary, writes) = reconcile(&mappings, &index, &SyncOptions::default());
        assert_eq!(summary.skipped_manual.len(), 1);
        assert!(writes.is_empty());

        // overwrite_manual forces the update.
        let opts = SyncOptions {
            dry_run: false,
            overwrite_manual: true,
        };
        let (summary, writes) = reconcile(&mappings, &index, &opts);
        assert!(summary.skipped_manual.is_empty());
        assert_eq!(writes.len(), 1);
    }

    #[test]
    fn test_reconcile_never_nulls_out_stored_price() {
        let index = build_index(&sample_table());
        // Bedrock entry has no cache prices in source; existing cache prices must survive.
        let mappings = vec![mapping(
            "claude-bedrock",
            "bedrock",
            "anthropic.claude-3-5-sonnet-20241022-v2:0",
            (3.0, 15.0, 0.6, 7.5),
            PRICING_SOURCE_LITELLM,
        )];
        let (summary, writes) = reconcile(&mappings, &index, &SyncOptions::default());
        // input/output already match source, cache fields absent in source → no change.
        assert_eq!(summary.unchanged, 1);
        assert!(writes.is_empty());
    }

    #[test]
    fn test_reconcile_not_found_and_dry_run() {
        let index = build_index(&sample_table());
        let mappings = vec![
            mapping(
                "unknown",
                "openai",
                "totally-made-up-model",
                (0.0, 0.0, 0.0, 0.0),
                PRICING_SOURCE_LITELLM,
            ),
            mapping(
                "gpt-4o",
                "openai",
                "gpt-4o",
                (0.0, 0.0, 0.0, 0.0),
                PRICING_SOURCE_LITELLM,
            ),
        ];
        let opts = SyncOptions {
            dry_run: true,
            overwrite_manual: false,
        };
        let (summary, writes) = reconcile(&mappings, &index, &opts);
        assert_eq!(summary.not_found, vec!["openai/unknown".to_string()]);
        assert_eq!(summary.updated.len(), 1);
        // dry_run: nothing to write even though an update was detected.
        assert!(writes.is_empty());
        assert!(summary.dry_run);
    }
}
