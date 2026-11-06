//! DynamoDB storage backend
//!
//! Full implementation using aws-sdk-dynamodb.

pub mod migrations;

use anyhow::Result;
use async_trait::async_trait;
use aws_sdk_dynamodb::types::AttributeValue;
use aws_sdk_dynamodb::Client;
use std::collections::HashMap;
use std::time::{SystemTime, UNIX_EPOCH};

use crate::database::models::*;
use crate::database::traits::*;

const TABLE_PREFIX: &str = "one_router_";

/// DynamoDB-backed storage.
pub struct DynamoDbBackend {
    client: Client,
}

impl DynamoDbBackend {
    pub async fn new(region: &str) -> Result<Self> {
        let config = aws_config::defaults(aws_config::BehaviorVersion::latest())
            .region(aws_sdk_dynamodb::config::Region::new(region.to_string()))
            .load()
            .await;
        let client = Client::new(&config);

        tracing::info!(region = %region, "DynamoDB backend connected");
        Ok(Self { client })
    }

    pub fn table_name(name: &str) -> String {
        format!("{TABLE_PREFIX}{name}")
    }

    /// Whether `user_id` already owns a key named `name` (other than
    /// `exclude_api_key`). Key names are unique per user.
    async fn user_key_name_taken(
        &self,
        user_id: &str,
        name: &str,
        exclude_api_key: Option<&str>,
    ) -> Result<bool> {
        Ok(self
            .list_api_keys_by_user(user_id)
            .await?
            .iter()
            .any(|k| k.name == name && Some(k.api_key.as_str()) != exclude_api_key))
    }

    /// Paginated scan of a whole table, optionally filtered.
    async fn scan_all(
        &self,
        table: &str,
        filter: Option<(&str, &[(&str, AttributeValue)])>,
    ) -> Result<Vec<HashMap<String, AttributeValue>>> {
        let mut out = Vec::new();
        let mut start_key = None;
        loop {
            let mut scan = self
                .client
                .scan()
                .table_name(Self::table_name(table))
                .set_exclusive_start_key(start_key);
            if let Some((expr, values)) = filter {
                scan = scan.filter_expression(expr);
                for (k, v) in values {
                    scan = scan.expression_attribute_values(*k, v.clone());
                }
                if expr.contains("#n") {
                    scan = scan.expression_attribute_names("#n", "name");
                }
                if expr.contains("#ts") {
                    scan = scan.expression_attribute_names("#ts", "timestamp");
                }
            }
            let page = scan.send().await?;
            out.extend(page.items().iter().cloned());
            start_key = page.last_evaluated_key().cloned();
            if start_key.is_none() {
                return Ok(out);
            }
        }
    }

    /// Check if a key with the given name exists, optionally excluding a specific api_key.
    /// Uses the GSI `name-index` for O(1) lookup; falls back to filtered scan if GSI is
    /// not yet available (e.g. still building after migration).
    #[allow(dead_code)]
    async fn name_exists(&self, name: &str, exclude_api_key: Option<&str>) -> Result<bool> {
        // Try GSI Query first (O(1) — GSI partition key is `name`)
        let query_result = self
            .client
            .query()
            .table_name(Self::table_name("api_keys"))
            .index_name("name-index")
            .key_condition_expression("#n = :name")
            .expression_attribute_names("#n", "name")
            .expression_attribute_values(":name", av_s(name))
            .limit(2)
            .send()
            .await;

        match query_result {
            Ok(output) => {
                let items = output.items();
                if let Some(exclude) = exclude_api_key {
                    // Exclude the current key from the results
                    Ok(items.iter().any(|item| {
                        item.get("api_key")
                            .and_then(|v| v.as_s().ok())
                            .map(|s| s.as_str())
                            != Some(exclude)
                    }))
                } else {
                    Ok(!items.is_empty())
                }
            }
            Err(e) => {
                // GSI may not exist yet (still building) — fall back to filtered scan
                tracing::debug!(error = %e, "GSI name-index query failed, falling back to scan");
                self.name_exists_scan(name, exclude_api_key).await
            }
        }
    }

    /// Backfill plaintext API keys with HMAC-SHA256 hashes.
    async fn backfill_key_hashes(&self, encryption_key: Option<&str>) -> Result<()> {
        use crate::utils::api_key::{hash_key, is_hashed, mask_key};

        let result = self
            .client
            .scan()
            .table_name(Self::table_name("api_keys"))
            .send()
            .await?;

        let mut migrated = 0u32;
        for item in result.items() {
            let old_key = get_s(item, "api_key");
            if is_hashed(&old_key) {
                continue;
            }
            let hashed = hash_key(&old_key, encryption_key);
            let display = mask_key(&old_key);

            // Delete old item, insert new one with hashed key
            self.client
                .delete_item()
                .table_name(Self::table_name("api_keys"))
                .key("api_key", av_s(&old_key))
                .send()
                .await?;

            let mut new_item = item.clone();
            new_item.insert("api_key".into(), av_s(&hashed));
            new_item.insert("key_display".into(), av_s(&display));

            self.client
                .put_item()
                .table_name(Self::table_name("api_keys"))
                .set_item(Some(new_item))
                .send()
                .await?;

            // Update usage records: scan for old key and re-insert with new key
            // Note: DynamoDB usage table has composite key (api_key, sort_key),
            // so we need to delete + re-insert
            let usage_result = self
                .client
                .query()
                .table_name(Self::table_name("usage"))
                .key_condition_expression("api_key = :ak")
                .expression_attribute_values(":ak", av_s(&old_key))
                .send()
                .await;

            if let Ok(usage_output) = usage_result {
                for usage_item in usage_output.items() {
                    let sort_key = get_s(usage_item, "sort_key");

                    self.client
                        .delete_item()
                        .table_name(Self::table_name("usage"))
                        .key("api_key", av_s(&old_key))
                        .key("sort_key", av_s(&sort_key))
                        .send()
                        .await?;

                    let mut new_usage = usage_item.clone();
                    new_usage.insert("api_key".into(), av_s(&hashed));

                    self.client
                        .put_item()
                        .table_name(Self::table_name("usage"))
                        .set_item(Some(new_usage))
                        .send()
                        .await?;
                }
            }

            migrated += 1;
        }

        if migrated > 0 {
            tracing::info!(count = migrated, "Backfilled API key hashes");
        }

        Ok(())
    }

    /// Assign a `key_id` to every api_keys item that lacks one. Usage items are
    /// NOT backfilled (the table can be large); legacy usage rows keep being
    /// attributed through the key hash while the key exists.
    async fn backfill_api_key_ids(&self) -> Result<()> {
        let mut migrated = 0u32;
        let mut start_key = None;
        loop {
            let page = self
                .client
                .scan()
                .table_name(Self::table_name("api_keys"))
                .filter_expression("attribute_not_exists(key_id)")
                .projection_expression("api_key")
                .set_exclusive_start_key(start_key)
                .send()
                .await?;
            for item in page.items() {
                let hash = get_s(item, "api_key");
                let res = self
                    .client
                    .update_item()
                    .table_name(Self::table_name("api_keys"))
                    .key("api_key", av_s(&hash))
                    .update_expression("SET key_id = :id")
                    .condition_expression(
                        "attribute_exists(api_key) AND attribute_not_exists(key_id)",
                    )
                    .expression_attribute_values(":id", av_s(&new_key_id()))
                    .send()
                    .await;
                match res {
                    Ok(_) => migrated += 1,
                    Err(e) => {
                        // A failed condition means another instance won the race — fine.
                        let svc = e.into_service_error();
                        if !svc.is_conditional_check_failed_exception() {
                            return Err(anyhow::anyhow!("backfill key_id: {svc}"));
                        }
                    }
                }
            }
            start_key = page.last_evaluated_key().cloned();
            if start_key.is_none() {
                break;
            }
        }
        if migrated > 0 {
            tracing::info!(count = migrated, "Backfilled api_keys.key_id");
        }
        Ok(())
    }

    async fn run_usage_user_backfill(&self, owners: &HashMap<String, String>) -> Result<u64> {
        let mut updated = 0u64;
        let mut start_key = None;
        loop {
            let page = self
                .client
                .scan()
                .table_name(Self::table_name("usage"))
                .filter_expression("attribute_not_exists(user_id)")
                .projection_expression("api_key, sort_key")
                .set_exclusive_start_key(start_key)
                .send()
                .await?;
            for item in page.items() {
                let hash = get_s(item, "api_key");
                let Some(user_id) = owners.get(&hash) else {
                    continue; // key deleted before users existed — unattributable
                };
                let res = self
                    .client
                    .update_item()
                    .table_name(Self::table_name("usage"))
                    .key("api_key", av_s(&hash))
                    .key("sort_key", av_s(&get_s(item, "sort_key")))
                    .update_expression("SET user_id = :u")
                    .condition_expression(
                        "attribute_exists(api_key) AND attribute_not_exists(user_id)",
                    )
                    .expression_attribute_values(":u", av_s(user_id))
                    .send()
                    .await;
                match res {
                    Ok(_) => updated += 1,
                    Err(e) => {
                        let svc = e.into_service_error();
                        if !svc.is_conditional_check_failed_exception() {
                            return Err(anyhow::anyhow!("usage user_id backfill: {svc}"));
                        }
                    }
                }
            }
            start_key = page.last_evaluated_key().cloned();
            if start_key.is_none() {
                break;
            }
        }
        self.upsert_setting(&internal_setting(USAGE_USER_BACKFILL_SETTING, "done"))
            .await?;
        Ok(updated)
    }

    /// Compare-and-set on `budget_alerts_sent` (see `ApiKeyStore::claim_budget_alert`).
    async fn claim_alert(
        &self,
        table: &str,
        id_col: &str,
        id: &str,
        period: &str,
        threshold: f64,
    ) -> Result<bool> {
        for _ in 0..5 {
            let item = self
                .client
                .get_item()
                .table_name(Self::table_name(table))
                .key(id_col, av_s(id))
                .consistent_read(true)
                .send()
                .await?;
            let Some(item) = item.item() else {
                return Ok(false);
            };
            let current = get_opt_s(item, "budget_alerts_sent");
            let Some(next) = next_alert_state(current.as_deref(), period, threshold) else {
                return Ok(false);
            };
            let mut update = self
                .client
                .update_item()
                .table_name(Self::table_name(table))
                .key(id_col, av_s(id))
                .update_expression("SET budget_alerts_sent = :next")
                .expression_attribute_values(":next", av_s(&next));
            update = match &current {
                Some(cur) => update
                    .condition_expression("budget_alerts_sent = :cur")
                    .expression_attribute_values(":cur", av_s(cur)),
                None => update
                    .condition_expression(
                        "attribute_exists(#id) AND (attribute_not_exists(budget_alerts_sent) \
                         OR attribute_type(budget_alerts_sent, :null_t))",
                    )
                    .expression_attribute_names("#id", id_col)
                    .expression_attribute_values(":null_t", av_s("NULL")),
            };
            match update.send().await {
                Ok(_) => return Ok(true),
                Err(e) => {
                    let svc = e.into_service_error();
                    if !svc.is_conditional_check_failed_exception() {
                        return Err(anyhow::anyhow!("claim_alert: {svc}"));
                    }
                }
            }
        }
        Ok(false)
    }

    /// Fallback: filtered scan for name uniqueness check.
    async fn name_exists_scan(&self, name: &str, exclude_api_key: Option<&str>) -> Result<bool> {
        let mut scan = self
            .client
            .scan()
            .table_name(Self::table_name("api_keys"))
            .filter_expression("#n = :name")
            .expression_attribute_names("#n", "name")
            .expression_attribute_values(":name", av_s(name))
            .projection_expression("api_key");

        if let Some(exclude) = exclude_api_key {
            scan = scan
                .filter_expression("#n = :name AND api_key <> :exclude")
                .expression_attribute_values(":exclude", av_s(exclude));
        }

        let result = scan.send().await?;
        Ok(!result.items().is_empty())
    }
}

fn unix_now() -> i64 {
    SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .expect("system clock before UNIX epoch")
        .as_secs() as i64
}

// ============================================================================
// Helper: AttributeValue conversions
// ============================================================================

fn av_s(val: &str) -> AttributeValue {
    AttributeValue::S(val.to_string())
}

fn av_n(val: i64) -> AttributeValue {
    AttributeValue::N(val.to_string())
}

fn av_n_f64(val: f64) -> AttributeValue {
    AttributeValue::N(val.to_string())
}

fn av_bool(val: bool) -> AttributeValue {
    AttributeValue::Bool(val)
}

fn av_opt_s(val: &Option<String>) -> AttributeValue {
    match val {
        Some(s) => AttributeValue::S(s.clone()),
        None => AttributeValue::Null(true),
    }
}

fn av_opt_n_i64(val: Option<i64>) -> AttributeValue {
    match val {
        Some(n) => AttributeValue::N(n.to_string()),
        None => AttributeValue::Null(true),
    }
}

fn av_opt_n_i32(val: Option<i32>) -> AttributeValue {
    match val {
        Some(n) => AttributeValue::N(n.to_string()),
        None => AttributeValue::Null(true),
    }
}

fn av_opt_n_f64(val: Option<f64>) -> AttributeValue {
    match val {
        Some(n) => AttributeValue::N(n.to_string()),
        None => AttributeValue::Null(true),
    }
}

fn get_s(item: &HashMap<String, AttributeValue>, key: &str) -> String {
    item.get(key)
        .and_then(|v| v.as_s().ok())
        .cloned()
        .unwrap_or_default()
}

fn get_opt_s(item: &HashMap<String, AttributeValue>, key: &str) -> Option<String> {
    item.get(key).and_then(|v| v.as_s().ok()).cloned()
}

fn get_i64(item: &HashMap<String, AttributeValue>, key: &str) -> i64 {
    item.get(key)
        .and_then(|v| v.as_n().ok())
        .and_then(|n| n.parse().ok())
        .unwrap_or(0)
}

fn get_opt_i64(item: &HashMap<String, AttributeValue>, key: &str) -> Option<i64> {
    item.get(key)
        .and_then(|v| v.as_n().ok())
        .and_then(|n| n.parse().ok())
}

fn get_opt_i32(item: &HashMap<String, AttributeValue>, key: &str) -> Option<i32> {
    item.get(key)
        .and_then(|v| v.as_n().ok())
        .and_then(|n| n.parse().ok())
}

fn get_i32(item: &HashMap<String, AttributeValue>, key: &str) -> i32 {
    item.get(key)
        .and_then(|v| v.as_n().ok())
        .and_then(|n| n.parse().ok())
        .unwrap_or(0)
}

fn get_f64(item: &HashMap<String, AttributeValue>, key: &str) -> f64 {
    item.get(key)
        .and_then(|v| v.as_n().ok())
        .and_then(|n| n.parse().ok())
        .unwrap_or(0.0)
}

fn get_opt_f64(item: &HashMap<String, AttributeValue>, key: &str) -> Option<f64> {
    item.get(key)
        .and_then(|v| v.as_n().ok())
        .and_then(|n| n.parse().ok())
}

fn get_bool(item: &HashMap<String, AttributeValue>, key: &str) -> bool {
    item.get(key)
        .and_then(|v| v.as_bool().ok())
        .copied()
        .unwrap_or(false)
}

// ============================================================================
// Record ↔ DynamoDB item conversions
// ============================================================================

fn api_key_from_item(item: &HashMap<String, AttributeValue>) -> ApiKeyRecord {
    ApiKeyRecord {
        api_key: get_s(item, "api_key"),
        key_id: get_s(item, "key_id"),
        key_display: get_s(item, "key_display"),
        user_id: get_s(item, "user_id"),
        name: get_s(item, "name"),
        is_active: get_bool(item, "is_active"),
        rate_limit: get_i32(item, "rate_limit"),
        cost_rate: get_opt_f64(item, "cost_rate").unwrap_or_else(|| {
            // Backward compatibility: derive from old service_tier string
            match get_opt_s(item, "service_tier").as_deref() {
                Some("flex") => 0.5,
                Some("priority") => 1.75,
                Some("master") => 0.0,
                _ => 1.0,
            }
        }),
        monthly_budget: get_opt_f64(item, "monthly_budget"),
        budget_used: get_f64(item, "budget_used"),
        budget_used_mtd: get_f64(item, "budget_used_mtd"),
        budget_mtd_month: get_opt_s(item, "budget_mtd_month"),
        deactivated_reason: get_opt_s(item, "deactivated_reason"),
        budget_history: get_opt_s(item, "budget_history"),
        tpm_limit: get_opt_i32(item, "tpm_limit"),
        cache_ttl: get_opt_s(item, "cache_ttl"),
        metadata: get_opt_s(item, "metadata"),
        expires_at: get_opt_i64(item, "expires_at"),
        allowed_models: patterns_from_json(get_opt_s(item, "allowed_models")),
        allowed_cidrs: patterns_from_json(get_opt_s(item, "allowed_cidrs")),
        budget_period: BudgetPeriod::parse(get_opt_s(item, "budget_period").as_deref()),
        budget_alerts_sent: get_opt_s(item, "budget_alerts_sent"),
        default_tags: patterns_from_json(get_opt_s(item, "default_tags")),
        last_used_at: get_opt_i64(item, "last_used_at"),
        rotated_to: get_opt_s(item, "rotated_to"),
        created_at: get_i64(item, "created_at"),
        updated_at: get_opt_i64(item, "updated_at"),
    }
}

fn spend_after(attrs: Option<&HashMap<String, AttributeValue>>) -> SpendAfter {
    SpendAfter {
        used: attrs.map(|a| get_f64(a, "budget_used_mtd")).unwrap_or(0.0),
        budget: attrs.and_then(|a| get_opt_f64(a, "monthly_budget")),
    }
}

fn tag_matches(r: &UsageRecord, tag: Option<&str>) -> bool {
    tag.is_none_or(|t| {
        r.tags
            .as_deref()
            .is_some_and(|tags| tags.split(',').any(|x| x == t))
    })
}

fn audit_from_item(item: &HashMap<String, AttributeValue>) -> AuditLogRecord {
    AuditLogRecord {
        id: get_s(item, "id"),
        timestamp: get_s(item, "timestamp"),
        actor: get_s(item, "actor"),
        source_ip: get_opt_s(item, "source_ip"),
        user_agent: get_opt_s(item, "user_agent"),
        action: get_s(item, "action"),
        target_type: get_opt_s(item, "target_type"),
        target_id: get_opt_s(item, "target_id"),
        before: get_opt_s(item, "before"),
        after: get_opt_s(item, "after"),
        status: get_i64(item, "status") as u16,
        method: get_s(item, "method"),
        path: get_s(item, "path"),
    }
}

fn user_from_item(item: &HashMap<String, AttributeValue>) -> UserRecord {
    UserRecord {
        user_id: get_s(item, "user_id"),
        name: get_s(item, "name"),
        email: get_opt_s(item, "email"),
        is_active: get_bool(item, "is_active"),
        cost_rate: get_opt_f64(item, "cost_rate").unwrap_or(1.0),
        monthly_budget: get_opt_f64(item, "monthly_budget"),
        budget_used: get_f64(item, "budget_used"),
        budget_used_mtd: get_f64(item, "budget_used_mtd"),
        budget_mtd_month: get_opt_s(item, "budget_mtd_month"),
        budget_history: get_opt_s(item, "budget_history"),
        rate_limit: get_opt_i32(item, "rate_limit"),
        tpm_limit: get_opt_i32(item, "tpm_limit"),
        allowed_models: patterns_from_json(get_opt_s(item, "allowed_models")),
        cache_ttl: get_opt_s(item, "cache_ttl"),
        metadata: get_opt_s(item, "metadata"),
        allowed_cidrs: patterns_from_json(get_opt_s(item, "allowed_cidrs")),
        budget_period: BudgetPeriod::parse(get_opt_s(item, "budget_period").as_deref()),
        budget_alerts_sent: get_opt_s(item, "budget_alerts_sent"),
        default_tags: patterns_from_json(get_opt_s(item, "default_tags")),
        created_at: get_i64(item, "created_at"),
        updated_at: get_opt_i64(item, "updated_at"),
    }
}

fn user_to_item(u: &UserRecord) -> HashMap<String, AttributeValue> {
    let mut item = HashMap::new();
    item.insert("user_id".into(), av_s(&u.user_id));
    item.insert("name".into(), av_s(&u.name));
    item.insert("email".into(), av_opt_s(&u.email));
    item.insert("is_active".into(), av_bool(u.is_active));
    item.insert("cost_rate".into(), av_n_f64(u.cost_rate));
    item.insert("monthly_budget".into(), av_opt_n_f64(u.monthly_budget));
    item.insert("budget_used".into(), av_n_f64(u.budget_used));
    item.insert("budget_used_mtd".into(), av_n_f64(u.budget_used_mtd));
    item.insert("budget_mtd_month".into(), av_opt_s(&u.budget_mtd_month));
    item.insert("budget_history".into(), av_opt_s(&u.budget_history));
    item.insert("rate_limit".into(), av_opt_n_i32(u.rate_limit));
    item.insert("tpm_limit".into(), av_opt_n_i32(u.tpm_limit));
    item.insert(
        "allowed_models".into(),
        av_opt_s(&patterns_to_json(&u.allowed_models)),
    );
    item.insert("cache_ttl".into(), av_opt_s(&u.cache_ttl));
    item.insert("metadata".into(), av_opt_s(&u.metadata));
    item.insert(
        "allowed_cidrs".into(),
        av_opt_s(&patterns_to_json(&u.allowed_cidrs)),
    );
    item.insert("budget_period".into(), av_s(u.budget_period.as_str()));
    item.insert("budget_alerts_sent".into(), av_opt_s(&u.budget_alerts_sent));
    item.insert(
        "default_tags".into(),
        av_opt_s(&patterns_to_json(&u.default_tags)),
    );
    item.insert("created_at".into(), av_n(u.created_at));
    item.insert("updated_at".into(), av_opt_n_i64(u.updated_at));
    item
}

fn api_key_to_item(record: &ApiKeyRecord) -> HashMap<String, AttributeValue> {
    let mut item = HashMap::new();
    item.insert("api_key".into(), av_s(&record.api_key));
    if !record.key_id.is_empty() {
        item.insert("key_id".into(), av_s(&record.key_id));
    }
    item.insert("key_display".into(), av_s(&record.key_display));
    item.insert("name".into(), av_s(&record.name));
    item.insert("is_active".into(), av_bool(record.is_active));
    item.insert("rate_limit".into(), av_n(record.rate_limit as i64));
    item.insert("cost_rate".into(), av_n_f64(record.cost_rate));
    item.insert("monthly_budget".into(), av_opt_n_f64(record.monthly_budget));
    item.insert("budget_used".into(), av_n_f64(record.budget_used));
    item.insert("budget_used_mtd".into(), av_n_f64(record.budget_used_mtd));
    item.insert(
        "budget_mtd_month".into(),
        av_opt_s(&record.budget_mtd_month),
    );
    item.insert(
        "deactivated_reason".into(),
        av_opt_s(&record.deactivated_reason),
    );
    if let Some(ref h) = record.budget_history {
        item.insert("budget_history".into(), av_s(h));
    }
    item.insert("tpm_limit".into(), av_opt_n_i32(record.tpm_limit));
    item.insert("cache_ttl".into(), av_opt_s(&record.cache_ttl));
    item.insert("metadata".into(), av_opt_s(&record.metadata));
    if !record.user_id.is_empty() {
        item.insert("user_id".into(), av_s(&record.user_id));
    }
    item.insert("expires_at".into(), av_opt_n_i64(record.expires_at));
    item.insert(
        "allowed_models".into(),
        av_opt_s(&patterns_to_json(&record.allowed_models)),
    );
    item.insert(
        "allowed_cidrs".into(),
        av_opt_s(&patterns_to_json(&record.allowed_cidrs)),
    );
    item.insert("budget_period".into(), av_s(record.budget_period.as_str()));
    item.insert(
        "budget_alerts_sent".into(),
        av_opt_s(&record.budget_alerts_sent),
    );
    item.insert(
        "default_tags".into(),
        av_opt_s(&patterns_to_json(&record.default_tags)),
    );
    item.insert("last_used_at".into(), av_opt_n_i64(record.last_used_at));
    item.insert("rotated_to".into(), av_opt_s(&record.rotated_to));
    item.insert("created_at".into(), av_n(record.created_at));
    item.insert("updated_at".into(), av_opt_n_i64(record.updated_at));
    item
}

fn usage_from_item(item: &HashMap<String, AttributeValue>) -> UsageRecord {
    UsageRecord {
        id: get_opt_i64(item, "id"),
        api_key: get_s(item, "api_key"),
        key_id: get_opt_s(item, "key_id"),
        user_id: get_opt_s(item, "user_id"),
        tags: get_opt_s(item, "tags"),
        timestamp: get_s(item, "timestamp"),
        request_id: get_s(item, "request_id"),
        model: get_s(item, "model"),
        input_tokens: get_i64(item, "input_tokens"),
        output_tokens: get_i64(item, "output_tokens"),
        cached_tokens: get_i64(item, "cached_tokens"),
        cache_write_tokens: get_i64(item, "cache_write_tokens"),
        cost: get_f64(item, "cost"),
        success: get_bool(item, "success"),
        duration_ms: get_opt_i64(item, "duration_ms"),
        error_message: get_opt_s(item, "error_message"),
        provider: get_opt_s(item, "provider"),
        protocol: get_opt_s(item, "protocol"),
    }
}

fn model_mapping_from_item(item: &HashMap<String, AttributeValue>) -> ModelMappingRecord {
    ModelMappingRecord {
        source_model_id: get_s(item, "source_model_id"),
        target_model_id: get_s(item, "target_model_id"),
        provider: get_s(item, "provider"),
        display_name: get_s(item, "display_name"),
        input_price: get_f64(item, "input_price"),
        output_price: get_f64(item, "output_price"),
        cache_read_price: get_f64(item, "cache_read_price"),
        cache_write_price: get_f64(item, "cache_write_price"),
        priority: get_i32(item, "priority"),
        status: get_s(item, "status"),
        created_at: get_i64(item, "created_at"),
        updated_at: get_opt_i64(item, "updated_at"),
        capabilities: get_opt_s(item, "capabilities"),
        pricing_source: get_opt_s(item, "pricing_source").unwrap_or_else(|| "litellm".to_string()),
    }
}

fn backend_from_item(item: &HashMap<String, AttributeValue>) -> BackendRecord {
    BackendRecord {
        name: get_s(item, "name"),
        backend_type: get_s(item, "backend_type"),
        config: get_s(item, "config"),
        enabled: get_bool(item, "enabled"),
        priority: get_i32(item, "priority"),
        weight: {
            let w = get_i32(item, "weight");
            if w == 0 {
                1
            } else {
                w
            }
        },
        strategy: get_s(item, "strategy"),
        max_failures: get_i32(item, "max_failures"),
        retry_after_secs: get_i64(item, "retry_after_secs"),
        service_tier: get_opt_s(item, "service_tier"),
        models: BackendRecord::models_from_json(get_opt_s(item, "models")),
        created_at: get_i64(item, "created_at"),
        updated_at: get_opt_i64(item, "updated_at"),
    }
}

// ============================================================================
// DatabaseService
// ============================================================================

#[async_trait]
impl DatabaseService for DynamoDbBackend {
    fn api_keys(&self) -> &dyn ApiKeyStore {
        self
    }
    fn users(&self) -> &dyn UserStore {
        self
    }
    fn audit(&self) -> &dyn AuditStore {
        self
    }
    fn usage(&self) -> &dyn UsageStore {
        self
    }
    fn model_mapping(&self) -> &dyn ModelMappingStore {
        self
    }
    fn backends(&self) -> &dyn BackendConfigStore {
        self
    }
    fn system_settings(&self) -> &dyn SystemSettingStore {
        self
    }

    async fn initialize(&self, encryption_key: Option<&str>, seed_mode: SeedMode) -> Result<()> {
        migrations::create_tables(self).await?;
        self.backfill_key_hashes(encryption_key).await?;
        self.backfill_api_key_ids().await?;
        self.migrate_keys_to_users().await?;
        self.seed_defaults(seed_mode).await?;
        Ok(())
    }

    /// The usage table can be large, so the backfill runs in the background and
    /// marks itself done when a full pass completes. If the process exits first,
    /// the next startup resumes (the setting is still `"pending"`; already
    /// attributed items are skipped by the scan filter).
    async fn backfill_usage_user_ids(&self) -> Result<()> {
        let owners: HashMap<String, String> = self
            .list_api_keys()
            .await?
            .into_iter()
            .filter(|k| !k.user_id.is_empty())
            .map(|k| (k.api_key, k.user_id))
            .collect();
        let backend = DynamoDbBackend {
            client: self.client.clone(),
        };
        tokio::spawn(async move {
            match backend.run_usage_user_backfill(&owners).await {
                Ok(n) => tracing::info!(rows = n, "Backfilled usage.user_id"),
                Err(e) => {
                    tracing::error!(error = %e, "usage.user_id backfill failed; will retry on next startup")
                }
            }
        });
        Ok(())
    }

    async fn health_check(&self) -> bool {
        self.client
            .describe_table()
            .table_name(Self::table_name("api_keys"))
            .send()
            .await
            .is_ok()
    }
}

// ============================================================================
// ApiKeyStore
// ============================================================================

#[async_trait]
impl ApiKeyStore for DynamoDbBackend {
    async fn get_api_key(&self, api_key: &str) -> Result<Option<ApiKeyRecord>> {
        let result = self
            .client
            .get_item()
            .table_name(Self::table_name("api_keys"))
            .key("api_key", av_s(api_key))
            .send()
            .await?;

        Ok(result.item().map(api_key_from_item))
    }

    async fn create_api_key(&self, record: &ApiKeyRecord) -> Result<()> {
        if self
            .user_key_name_taken(&record.user_id, &record.name, None)
            .await?
        {
            return Err(anyhow::anyhow!("UNIQUE constraint failed: api_keys.name"));
        }
        self.client
            .put_item()
            .table_name(Self::table_name("api_keys"))
            .set_item(Some(api_key_to_item(record)))
            .send()
            .await?;
        Ok(())
    }

    async fn update_api_key(&self, record: &ApiKeyRecord) -> Result<()> {
        // Check per-user name uniqueness, excluding the current key
        if self
            .user_key_name_taken(&record.user_id, &record.name, Some(&record.api_key))
            .await?
        {
            return Err(anyhow::anyhow!("UNIQUE constraint failed: api_keys.name"));
        }
        let mut item = api_key_to_item(record);
        item.insert("updated_at".into(), av_n(unix_now()));
        self.client
            .put_item()
            .table_name(Self::table_name("api_keys"))
            .set_item(Some(item))
            .send()
            .await?;
        Ok(())
    }

    async fn deactivate_api_key(&self, api_key: &str, reason: &str) -> Result<()> {
        let now = unix_now();
        self.client
            .update_item()
            .table_name(Self::table_name("api_keys"))
            .key("api_key", av_s(api_key))
            .update_expression(
                "SET is_active = :active, deactivated_reason = :reason, updated_at = :now",
            )
            .expression_attribute_values(":active", av_bool(false))
            .expression_attribute_values(":reason", av_s(reason))
            .expression_attribute_values(":now", av_n(now))
            .send()
            .await?;
        Ok(())
    }

    async fn increment_budget_used(&self, api_key: &str, amount: f64) -> Result<SpendAfter> {
        let now = unix_now();
        let result = self
            .client
            .update_item()
            .table_name(Self::table_name("api_keys"))
            .key("api_key", av_s(api_key))
            .update_expression(
                "SET budget_used = budget_used + :amount, \
                 budget_used_mtd = budget_used_mtd + :amount, \
                 updated_at = :now",
            )
            .expression_attribute_values(":amount", av_n_f64(amount))
            .expression_attribute_values(":now", av_n(now))
            .return_values(aws_sdk_dynamodb::types::ReturnValue::AllNew)
            .send()
            .await?;

        Ok(spend_after(result.attributes()))
    }

    async fn reset_monthly_budget(
        &self,
        api_key: &str,
        month: &str,
        prev_month: &str,
        prev_mtd: f64,
    ) -> Result<()> {
        let now = unix_now();

        // Get current item to read existing budget_history
        let get_result = self
            .client
            .get_item()
            .table_name(Self::table_name("api_keys"))
            .key("api_key", av_s(api_key))
            .send()
            .await?;

        let updated_history = if let Some(item) = get_result.item() {
            let existing = get_opt_s(item, "budget_history");
            let mut history: std::collections::HashMap<String, f64> = existing
                .as_deref()
                .and_then(|s| serde_json::from_str(s).ok())
                .unwrap_or_default();
            if prev_mtd > 0.0 && !prev_month.is_empty() {
                history.insert(prev_month.to_string(), (prev_mtd * 100.0).round() / 100.0);
            }
            serde_json::to_string(&history).unwrap_or_else(|_| "{}".to_string())
        } else {
            "{}".to_string()
        };

        self.client
            .update_item()
            .table_name(Self::table_name("api_keys"))
            .key("api_key", av_s(api_key))
            .update_expression(
                "SET budget_used_mtd = :zero, budget_mtd_month = :month, \
                 budget_history = :history, updated_at = :now",
            )
            .expression_attribute_values(":zero", AttributeValue::N("0".to_string()))
            .expression_attribute_values(":month", av_s(month))
            .expression_attribute_values(":history", av_s(&updated_history))
            .expression_attribute_values(":now", av_n(now))
            .send()
            .await
            .map_err(|e| anyhow::anyhow!("DynamoDB reset_monthly_budget: {e}"))?;
        Ok(())
    }

    async fn reactivate_api_key(&self, api_key: &str) -> Result<()> {
        let now = unix_now();
        let result = self
            .client
            .update_item()
            .table_name(Self::table_name("api_keys"))
            .key("api_key", av_s(api_key))
            .update_expression(
                "SET is_active = :true_val, updated_at = :now REMOVE deactivated_reason",
            )
            .condition_expression("deactivated_reason = :budget_exceeded")
            .expression_attribute_values(":true_val", av_bool(true))
            .expression_attribute_values(":now", av_n(now))
            .expression_attribute_values(":budget_exceeded", av_s("budget_exceeded"))
            .send()
            .await;
        match result {
            Ok(_) => Ok(()),
            Err(e) => {
                let msg = e.to_string();
                if msg.contains("ConditionalCheckFailed") {
                    Ok(()) // key was not budget-deactivated — that's fine
                } else {
                    Err(anyhow::anyhow!("DynamoDB reactivate_api_key: {e}"))
                }
            }
        }
    }

    async fn list_api_keys(&self) -> Result<Vec<ApiKeyRecord>> {
        let mut records: Vec<ApiKeyRecord> = self
            .scan_all("api_keys", None)
            .await?
            .iter()
            .map(api_key_from_item)
            .collect();
        records.sort_by_key(|r| std::cmp::Reverse(r.created_at));
        Ok(records)
    }

    async fn find_api_key_by_prefix(&self, prefix: &str) -> Result<Option<ApiKeyRecord>> {
        let result = self
            .client
            .scan()
            .table_name(Self::table_name("api_keys"))
            .filter_expression("begins_with(api_key, :prefix)")
            .expression_attribute_values(":prefix", av_s(prefix))
            .limit(2)
            .send()
            .await?;

        let items = result.items();
        if items.len() > 1 {
            anyhow::bail!("ambiguous_prefix");
        }

        Ok(items.first().map(api_key_from_item))
    }

    async fn get_api_key_by_name(&self, name: &str) -> Result<Option<ApiKeyRecord>> {
        let result = self
            .client
            .query()
            .table_name(Self::table_name("api_keys"))
            .index_name("name-index")
            .key_condition_expression("#n = :name")
            .expression_attribute_names("#n", "name")
            .expression_attribute_values(":name", av_s(name))
            .limit(1)
            .send()
            .await;

        match result {
            Ok(output) => {
                let items = output.items();
                if let Some(item) = items.first() {
                    // GSI is KEYS_ONLY — fetch the full item by primary key
                    let api_key = get_s(item, "api_key");
                    self.get_api_key(&api_key).await
                } else {
                    Ok(None)
                }
            }
            Err(e) => {
                // GSI may not be available; fall back to scan
                tracing::debug!(error = %e, "GSI name-index query failed for get_api_key_by_name, falling back to scan");
                let scan_result = self
                    .client
                    .scan()
                    .table_name(Self::table_name("api_keys"))
                    .filter_expression("#n = :name")
                    .expression_attribute_names("#n", "name")
                    .expression_attribute_values(":name", av_s(name))
                    .limit(1)
                    .send()
                    .await?;

                Ok(scan_result.items().first().map(api_key_from_item))
            }
        }
    }

    async fn get_api_key_by_id(&self, key_id: &str) -> Result<Option<ApiKeyRecord>> {
        // api_keys is small (one row per issued key); a filtered, paginated
        // scan avoids another GSI.
        let mut start_key = None;
        loop {
            let page = self
                .client
                .scan()
                .table_name(Self::table_name("api_keys"))
                .filter_expression("key_id = :id")
                .expression_attribute_values(":id", av_s(key_id))
                .set_exclusive_start_key(start_key)
                .send()
                .await?;
            if let Some(item) = page.items().first() {
                return Ok(Some(api_key_from_item(item)));
            }
            start_key = page.last_evaluated_key().cloned();
            if start_key.is_none() {
                return Ok(None);
            }
        }
    }

    async fn delete_api_key(&self, api_key: &str) -> Result<()> {
        self.client
            .delete_item()
            .table_name(Self::table_name("api_keys"))
            .key("api_key", av_s(api_key))
            .send()
            .await?;
        Ok(())
    }

    async fn list_api_keys_by_user(&self, user_id: &str) -> Result<Vec<ApiKeyRecord>> {
        let mut records: Vec<ApiKeyRecord> = self
            .scan_all("api_keys", Some(("user_id = :u", &[(":u", av_s(user_id))])))
            .await?
            .iter()
            .map(api_key_from_item)
            .collect();
        records.sort_by_key(|r| std::cmp::Reverse(r.created_at));
        Ok(records)
    }

    async fn assign_unowned_key(&self, record: &ApiKeyRecord) -> Result<bool> {
        let mut item = api_key_to_item(record);
        item.insert("updated_at".into(), av_n(unix_now()));
        let res = self
            .client
            .put_item()
            .table_name(Self::table_name("api_keys"))
            .set_item(Some(item))
            .condition_expression(
                "attribute_exists(api_key) AND (attribute_not_exists(user_id) OR user_id = :empty)",
            )
            .expression_attribute_values(":empty", av_s(""))
            .send()
            .await;
        match res {
            Ok(_) => Ok(true),
            Err(e) => {
                let svc = e.into_service_error();
                if svc.is_conditional_check_failed_exception() {
                    Ok(false)
                } else {
                    Err(anyhow::anyhow!("assign_unowned_key: {svc}"))
                }
            }
        }
    }

    async fn touch_last_used(&self, api_key: &str, at: i64) -> Result<()> {
        let res = self
            .client
            .update_item()
            .table_name(Self::table_name("api_keys"))
            .key("api_key", av_s(api_key))
            .update_expression("SET last_used_at = :t")
            .condition_expression("attribute_exists(api_key)")
            .expression_attribute_values(":t", av_n(at))
            .send()
            .await;
        match res {
            Ok(_) => Ok(()),
            Err(e) => {
                let svc = e.into_service_error();
                if svc.is_conditional_check_failed_exception() {
                    Ok(()) // key deleted meanwhile
                } else {
                    Err(anyhow::anyhow!("touch_last_used: {svc}"))
                }
            }
        }
    }

    async fn claim_budget_alert(
        &self,
        api_key: &str,
        period: &str,
        threshold: f64,
    ) -> Result<bool> {
        self.claim_alert("api_keys", "api_key", api_key, period, threshold)
            .await
    }
}

// ============================================================================
// AuditStore — PK `month` ("YYYY-MM"), SK `sort_key` ("<timestamp>#<id>")
// ============================================================================

#[async_trait]
impl AuditStore for DynamoDbBackend {
    async fn record_audit(&self, a: &AuditLogRecord) -> Result<()> {
        let mut item = HashMap::new();
        item.insert(
            "month".into(),
            av_s(&a.timestamp.chars().take(7).collect::<String>()),
        );
        item.insert(
            "sort_key".into(),
            av_s(&format!("{}#{}", a.timestamp, a.id)),
        );
        item.insert("id".into(), av_s(&a.id));
        item.insert("timestamp".into(), av_s(&a.timestamp));
        item.insert("actor".into(), av_s(&a.actor));
        item.insert("source_ip".into(), av_opt_s(&a.source_ip));
        item.insert("user_agent".into(), av_opt_s(&a.user_agent));
        item.insert("action".into(), av_s(&a.action));
        item.insert("target_type".into(), av_opt_s(&a.target_type));
        item.insert("target_id".into(), av_opt_s(&a.target_id));
        item.insert("before".into(), av_opt_s(&a.before));
        item.insert("after".into(), av_opt_s(&a.after));
        item.insert("status".into(), av_n(a.status as i64));
        item.insert("method".into(), av_s(&a.method));
        item.insert("path".into(), av_s(&a.path));
        self.client
            .put_item()
            .table_name(Self::table_name("audit_logs"))
            .set_item(Some(item))
            .send()
            .await?;
        Ok(())
    }

    async fn query_audit(&self, q: &AuditQuery) -> Result<Vec<AuditLogRecord>> {
        // Walk month partitions newest → oldest (bounded to 36 months).
        let upper = [q.end.as_deref(), q.before.as_deref()]
            .into_iter()
            .flatten()
            .min()
            .map(String::from)
            .unwrap_or_else(|| chrono::Utc::now().to_rfc3339());
        let mut month =
            chrono::NaiveDate::parse_from_str(&format!("{}-01", &upper[..7]), "%Y-%m-%d")
                .unwrap_or_else(|_| chrono::Utc::now().date_naive());
        let lower_month = q
            .start
            .as_deref()
            .map(|s| s.chars().take(7).collect::<String>());
        let mut out = Vec::new();
        for _ in 0..36 {
            let key = month.format("%Y-%m").to_string();
            if lower_month.as_deref().is_some_and(|l| key.as_str() < l) {
                break;
            }
            let mut start_key = None;
            loop {
                let page = self
                    .client
                    .query()
                    .table_name(Self::table_name("audit_logs"))
                    .key_condition_expression("#m = :m")
                    .expression_attribute_names("#m", "month")
                    .expression_attribute_values(":m", av_s(&key))
                    .scan_index_forward(false)
                    .set_exclusive_start_key(start_key)
                    .send()
                    .await?;
                for item in page.items() {
                    let r = audit_from_item(item);
                    if q.matches(&r) {
                        out.push(r);
                        if out.len() >= q.limit.max(1) {
                            return Ok(out);
                        }
                    }
                }
                start_key = page.last_evaluated_key().cloned();
                if start_key.is_none() {
                    break;
                }
            }
            month = month
                .checked_sub_months(chrono::Months::new(1))
                .unwrap_or(month);
        }
        Ok(out)
    }

    async fn purge_audit_before(&self, cutoff: &str) -> Result<u64> {
        let old = self
            .scan_all(
                "audit_logs",
                Some(("#ts < :cut", &[(":cut", av_s(cutoff))])),
            )
            .await?;
        let mut n = 0;
        for item in old {
            self.client
                .delete_item()
                .table_name(Self::table_name("audit_logs"))
                .key("month", item.get("month").cloned().unwrap_or(av_s("")))
                .key(
                    "sort_key",
                    item.get("sort_key").cloned().unwrap_or(av_s("")),
                )
                .send()
                .await?;
            n += 1;
        }
        Ok(n)
    }
}

// ============================================================================
// UserStore
// ============================================================================

#[async_trait]
impl UserStore for DynamoDbBackend {
    async fn get_user(&self, user_id: &str) -> Result<Option<UserRecord>> {
        let result = self
            .client
            .get_item()
            .table_name(Self::table_name("users"))
            .key("user_id", av_s(user_id))
            .send()
            .await?;
        Ok(result.item().map(user_from_item))
    }

    async fn get_user_by_name(&self, name: &str) -> Result<Option<UserRecord>> {
        // users is small (one row per person); a filtered scan avoids a GSI.
        Ok(self
            .scan_all("users", Some(("#n = :name", &[(":name", av_s(name))])))
            .await?
            .first()
            .map(user_from_item))
    }

    async fn list_users(&self) -> Result<Vec<UserRecord>> {
        let mut users: Vec<UserRecord> = self
            .scan_all("users", None)
            .await?
            .iter()
            .map(user_from_item)
            .collect();
        users.sort_by_key(|u| std::cmp::Reverse(u.created_at));
        Ok(users)
    }

    async fn create_user(&self, record: &UserRecord) -> Result<()> {
        if self.get_user_by_name(&record.name).await?.is_some() {
            return Err(anyhow::anyhow!("UNIQUE constraint failed: users.name"));
        }
        self.client
            .put_item()
            .table_name(Self::table_name("users"))
            .set_item(Some(user_to_item(record)))
            .condition_expression("attribute_not_exists(user_id)")
            .send()
            .await?;
        Ok(())
    }

    async fn update_user(&self, u: &UserRecord) -> Result<()> {
        if let Some(other) = self.get_user_by_name(&u.name).await? {
            if other.user_id != u.user_id {
                return Err(anyhow::anyhow!("UNIQUE constraint failed: users.name"));
            }
        }
        // Spend counters are owned by increment/reset — never overwritten here.
        self.client
            .update_item()
            .table_name(Self::table_name("users"))
            .key("user_id", av_s(&u.user_id))
            .condition_expression("attribute_exists(user_id)")
            .update_expression(
                "SET #n = :name, email = :email, is_active = :active, cost_rate = :rate, \
                 monthly_budget = :budget, rate_limit = :rpm, tpm_limit = :tpm, \
                 allowed_models = :models, cache_ttl = :ttl, metadata = :meta, \
                 allowed_cidrs = :cidrs, budget_period = :period, default_tags = :tags, \
                 updated_at = :now",
            )
            .expression_attribute_names("#n", "name")
            .expression_attribute_values(":name", av_s(&u.name))
            .expression_attribute_values(":email", av_opt_s(&u.email))
            .expression_attribute_values(":active", av_bool(u.is_active))
            .expression_attribute_values(":rate", av_n_f64(u.cost_rate))
            .expression_attribute_values(":budget", av_opt_n_f64(u.monthly_budget))
            .expression_attribute_values(":rpm", av_opt_n_i32(u.rate_limit))
            .expression_attribute_values(":tpm", av_opt_n_i32(u.tpm_limit))
            .expression_attribute_values(":models", av_opt_s(&patterns_to_json(&u.allowed_models)))
            .expression_attribute_values(":ttl", av_opt_s(&u.cache_ttl))
            .expression_attribute_values(":meta", av_opt_s(&u.metadata))
            .expression_attribute_values(":cidrs", av_opt_s(&patterns_to_json(&u.allowed_cidrs)))
            .expression_attribute_values(":period", av_s(u.budget_period.as_str()))
            .expression_attribute_values(":tags", av_opt_s(&patterns_to_json(&u.default_tags)))
            .expression_attribute_values(":now", av_n(unix_now()))
            .send()
            .await?;
        Ok(())
    }

    async fn delete_user(&self, user_id: &str) -> Result<()> {
        self.client
            .delete_item()
            .table_name(Self::table_name("users"))
            .key("user_id", av_s(user_id))
            .send()
            .await?;
        Ok(())
    }

    async fn increment_user_budget_used(&self, user_id: &str, amount: f64) -> Result<SpendAfter> {
        let result = self
            .client
            .update_item()
            .table_name(Self::table_name("users"))
            .key("user_id", av_s(user_id))
            .condition_expression("attribute_exists(user_id)")
            .update_expression(
                "SET budget_used = budget_used + :amount, \
                 budget_used_mtd = budget_used_mtd + :amount, updated_at = :now",
            )
            .expression_attribute_values(":amount", av_n_f64(amount))
            .expression_attribute_values(":now", av_n(unix_now()))
            .return_values(aws_sdk_dynamodb::types::ReturnValue::AllNew)
            .send()
            .await?;
        Ok(spend_after(result.attributes()))
    }

    async fn claim_user_budget_alert(
        &self,
        user_id: &str,
        period: &str,
        threshold: f64,
    ) -> Result<bool> {
        self.claim_alert("users", "user_id", user_id, period, threshold)
            .await
    }

    async fn reset_user_monthly_budget(
        &self,
        user_id: &str,
        month: &str,
        prev_month: &str,
        prev_mtd: f64,
    ) -> Result<()> {
        let existing = self.get_user(user_id).await?.and_then(|u| u.budget_history);
        let mut history: HashMap<String, f64> = existing
            .as_deref()
            .and_then(|s| serde_json::from_str(s).ok())
            .unwrap_or_default();
        if prev_mtd > 0.0 && !prev_month.is_empty() {
            history.insert(prev_month.to_string(), (prev_mtd * 100.0).round() / 100.0);
        }
        let history = serde_json::to_string(&history).unwrap_or_else(|_| "{}".to_string());
        self.client
            .update_item()
            .table_name(Self::table_name("users"))
            .key("user_id", av_s(user_id))
            .update_expression(
                "SET budget_used_mtd = :zero, budget_mtd_month = :month, \
                 budget_history = :history, updated_at = :now",
            )
            .expression_attribute_values(":zero", AttributeValue::N("0".to_string()))
            .expression_attribute_values(":month", av_s(month))
            .expression_attribute_values(":history", av_s(&history))
            .expression_attribute_values(":now", av_n(unix_now()))
            .send()
            .await
            .map_err(|e| anyhow::anyhow!("DynamoDB reset_user_monthly_budget: {e}"))?;
        Ok(())
    }
}

// ============================================================================
// UsageStore
// ============================================================================

#[async_trait]
impl UsageStore for DynamoDbBackend {
    async fn record_usage(&self, record: &UsageRecord) -> Result<()> {
        let sort_key = format!("{}#{}", record.timestamp, record.request_id);
        let mut item = HashMap::new();
        item.insert("api_key".into(), av_s(&record.api_key));
        item.insert("sort_key".into(), av_s(&sort_key));
        if let Some(ref key_id) = record.key_id {
            item.insert("key_id".into(), av_s(key_id));
        }
        if let Some(ref user_id) = record.user_id {
            item.insert("user_id".into(), av_s(user_id));
        }
        if let Some(ref tags) = record.tags {
            item.insert("tags".into(), av_s(tags));
        }
        item.insert("timestamp".into(), av_s(&record.timestamp));
        item.insert("request_id".into(), av_s(&record.request_id));
        item.insert("model".into(), av_s(&record.model));
        item.insert("input_tokens".into(), av_n(record.input_tokens));
        item.insert("output_tokens".into(), av_n(record.output_tokens));
        item.insert("cached_tokens".into(), av_n(record.cached_tokens));
        item.insert("cache_write_tokens".into(), av_n(record.cache_write_tokens));
        item.insert("cost".into(), av_n_f64(record.cost));
        item.insert("success".into(), av_bool(record.success));
        item.insert("duration_ms".into(), av_opt_n_i64(record.duration_ms));
        item.insert("error_message".into(), av_opt_s(&record.error_message));
        if let Some(ref provider) = record.provider {
            item.insert("provider".into(), av_s(provider));
        }
        if let Some(ref protocol) = record.protocol {
            item.insert("protocol".into(), av_s(protocol));
        }

        self.client
            .put_item()
            .table_name(Self::table_name("usage"))
            .set_item(Some(item))
            .send()
            .await?;

        Ok(())
    }

    async fn get_usage_by_api_key(
        &self,
        filter: UsageFilter<'_>,
        since: Option<&str>,
        limit: Option<i64>,
        _before_id: Option<i64>,
    ) -> Result<Vec<UsageRecord>> {
        let UsageFilter {
            api_key,
            user_id,
            tag,
        } = filter;
        // Empty api_key means "all keys" — use Scan instead of Query
        let records = if api_key.is_empty() {
            let mut scan = self.client.scan().table_name(Self::table_name("usage"));

            if let Some(lim) = limit {
                scan = scan.limit(lim as i32);
            }

            let result = scan.send().await?;
            let mut records: Vec<UsageRecord> =
                result.items().iter().map(usage_from_item).collect();

            // Filter by since in application layer (Scan has no sort key condition)
            if let Some(since_ts) = since {
                records.retain(|r| r.timestamp.as_str() >= since_ts);
            }
            if let Some(u) = user_id {
                records.retain(|r| r.user_id.as_deref() == Some(u));
            }
            records.retain(|r| tag_matches(r, tag));
            records.sort_by(|a, b| b.timestamp.cmp(&a.timestamp));
            records
        } else {
            let mut query = self
                .client
                .query()
                .table_name(Self::table_name("usage"))
                .key_condition_expression("api_key = :ak")
                .expression_attribute_values(":ak", av_s(api_key))
                .scan_index_forward(false); // DESC order

            if let Some(since_ts) = since {
                query = query
                    .key_condition_expression("api_key = :ak AND sort_key >= :since")
                    .expression_attribute_values(":since", av_s(since_ts));
            }

            if let Some(lim) = limit {
                query = query.limit(lim as i32);
            }

            let result = query.send().await?;
            result
                .items()
                .iter()
                .map(usage_from_item)
                .filter(|r| user_id.is_none() || r.user_id.as_deref() == user_id)
                .filter(|r| tag_matches(r, tag))
                .collect()
        };

        Ok(records)
    }

    async fn query_usage_summary(
        &self,
        filter: UsageFilter<'_>,
        start: Option<&str>,
        end: Option<&str>,
        group_by: &str,
        split_by: Option<&str>,
    ) -> Result<Vec<UsageSummaryRow>> {
        use std::collections::HashMap;

        const MAX_ITEMS: i32 = 10_000;

        let UsageFilter {
            api_key,
            user_id,
            tag,
        } = filter;
        let filter_by_key = !api_key.is_empty();

        // Build timestamp filter expression for server-side filtering
        let mut filter_parts: Vec<String> = Vec::new();
        let mut expr_values: Vec<(String, AttributeValue)> = Vec::new();

        if let Some(start_ts) = start {
            filter_parts.push("#ts >= :start_ts".to_string());
            expr_values.push((":start_ts".to_string(), av_s(start_ts)));
        }
        if let Some(end_ts) = end {
            filter_parts.push("#ts <= :end_ts".to_string());
            expr_values.push((":end_ts".to_string(), av_s(end_ts)));
        }
        if let Some(u) = user_id {
            filter_parts.push("user_id = :uid".to_string());
            expr_values.push((":uid".to_string(), av_s(u)));
        }
        if let Some(t) = tag {
            // Substring pre-filter; exact per-tag match applied after fetch.
            filter_parts.push("contains(tags, :tag)".to_string());
            expr_values.push((":tag".to_string(), av_s(t)));
        }

        let filter_expr = if filter_parts.is_empty() {
            None
        } else {
            Some(filter_parts.join(" AND "))
        };

        // When api_key is provided, use Query (partition key lookup) instead of Scan
        let records: Vec<UsageRecord> = if filter_by_key {
            let mut query = self
                .client
                .query()
                .table_name(Self::table_name("usage"))
                .key_condition_expression("api_key = :ak")
                .expression_attribute_values(":ak", av_s(api_key))
                .limit(MAX_ITEMS);

            if let Some(ref fe) = filter_expr {
                query = query.filter_expression(fe.as_str());
                if fe.contains("#ts") {
                    query = query.expression_attribute_names("#ts", "timestamp");
                }
            }
            for (k, v) in &expr_values {
                query = query.expression_attribute_values(k, v.clone());
            }

            let result = query.send().await?;
            let items = result.items();
            if items.len() >= MAX_ITEMS as usize {
                tracing::warn!(
                    api_key = %api_key,
                    count = items.len(),
                    "query_usage_summary hit item limit ({MAX_ITEMS}); results may be incomplete"
                );
            }
            items.iter().map(usage_from_item).collect()
        } else {
            // No api_key filter — must scan
            let mut scan = self
                .client
                .scan()
                .table_name(Self::table_name("usage"))
                .limit(MAX_ITEMS);

            if let Some(ref fe) = filter_expr {
                scan = scan.filter_expression(fe.as_str());
                if fe.contains("#ts") {
                    scan = scan.expression_attribute_names("#ts", "timestamp");
                }
            }
            for (k, v) in &expr_values {
                scan = scan.expression_attribute_values(k, v.clone());
            }

            let result = scan.send().await?;
            let items = result.items();
            if items.len() >= MAX_ITEMS as usize {
                tracing::warn!(
                    count = items.len(),
                    "query_usage_summary hit item limit ({MAX_ITEMS}); results may be incomplete"
                );
            }
            items.iter().map(usage_from_item).collect()
        };

        let records: Vec<UsageRecord> = records
            .into_iter()
            .filter(|r| tag_matches(r, tag))
            .collect();

        // Aggregate in memory
        fn dim_value(r: &UsageRecord, dim: &str) -> String {
            match dim {
                "model" => r.model.clone(),
                "day" => r.timestamp.chars().take(10).collect(),
                "month" => r.timestamp.chars().take(7).collect(),
                "provider" => r.provider.as_deref().unwrap_or("unknown").to_string(),
                "api_key" => r.key_id.clone().unwrap_or_else(|| r.api_key.clone()),
                "user" => r.user_id.clone().unwrap_or_default(),
                "tags" => r.tags.clone().unwrap_or_default(),
                _ => r.timestamp.chars().take(13).collect(),
            }
        }

        // Composite key: "group_key\0split_key" (split_key may be empty)
        let mut map: HashMap<String, UsageSummaryRow> = HashMap::new();

        for r in &records {
            let gk = dim_value(r, group_by);
            let sk = split_by.map(|sb| dim_value(r, sb));
            let composite = match &sk {
                Some(s) => format!("{gk}\0{s}"),
                None => gk.clone(),
            };

            let entry = map.entry(composite).or_insert(UsageSummaryRow {
                group_key: gk,
                split_key: sk,
                input_tokens: 0,
                output_tokens: 0,
                cached_tokens: 0,
                cache_write_tokens: 0,
                total_cost: 0.0,
                total_requests: 0,
                error_requests: 0,
            });

            entry.input_tokens += r.input_tokens;
            entry.output_tokens += r.output_tokens;
            entry.cached_tokens += r.cached_tokens;
            entry.cache_write_tokens += r.cache_write_tokens;
            entry.total_cost += r.cost;
            entry.total_requests += 1;
            if !r.success {
                entry.error_requests += 1;
            }
        }

        let mut result: Vec<UsageSummaryRow> = map.into_values().collect();
        result.sort_by(|a, b| b.group_key.cmp(&a.group_key));

        Ok(result)
    }
}

// ============================================================================
// ModelMappingStore
// ============================================================================

#[async_trait]
impl ModelMappingStore for DynamoDbBackend {
    async fn get_mappings(&self, source_model_id: &str) -> Result<Vec<ModelMappingRecord>> {
        let result = self
            .client
            .query()
            .table_name(Self::table_name("model_mappings"))
            .key_condition_expression("source_model_id = :sid")
            .expression_attribute_values(":sid", av_s(source_model_id))
            .send()
            .await?;

        let mut records: Vec<ModelMappingRecord> =
            result.items().iter().map(model_mapping_from_item).collect();

        // Sort by priority DESC
        records.sort_by_key(|r| std::cmp::Reverse(r.priority));
        Ok(records)
    }

    async fn get_mapping(
        &self,
        source_model_id: &str,
        provider: &str,
    ) -> Result<Option<ModelMappingRecord>> {
        let result = self
            .client
            .get_item()
            .table_name(Self::table_name("model_mappings"))
            .key("source_model_id", av_s(source_model_id))
            .key("provider", av_s(provider))
            .send()
            .await?;

        Ok(result.item().map(model_mapping_from_item))
    }

    async fn list_mappings(&self) -> Result<Vec<ModelMappingRecord>> {
        let result = self
            .client
            .scan()
            .table_name(Self::table_name("model_mappings"))
            .send()
            .await?;

        let mut records: Vec<ModelMappingRecord> =
            result.items().iter().map(model_mapping_from_item).collect();

        // DynamoDB Scan returns unordered results; sort client-side
        records.sort_by(|a, b| {
            a.provider
                .cmp(&b.provider)
                .then(b.priority.cmp(&a.priority))
                .then(a.source_model_id.cmp(&b.source_model_id))
        });

        Ok(records)
    }

    async fn upsert_mapping(&self, record: &ModelMappingRecord) -> Result<()> {
        let now = unix_now();
        let mut item = HashMap::new();
        item.insert("source_model_id".into(), av_s(&record.source_model_id));
        item.insert("target_model_id".into(), av_s(&record.target_model_id));
        item.insert("provider".into(), av_s(&record.provider));
        item.insert("display_name".into(), av_s(&record.display_name));
        item.insert("input_price".into(), av_n_f64(record.input_price));
        item.insert("output_price".into(), av_n_f64(record.output_price));
        item.insert("cache_read_price".into(), av_n_f64(record.cache_read_price));
        item.insert(
            "cache_write_price".into(),
            av_n_f64(record.cache_write_price),
        );
        item.insert("priority".into(), av_n(record.priority as i64));
        item.insert("status".into(), av_s(&record.status));
        item.insert("created_at".into(), av_n(record.created_at));
        item.insert("updated_at".into(), av_n(now));
        item.insert("capabilities".into(), av_opt_s(&record.capabilities));
        item.insert("pricing_source".into(), av_s(&record.pricing_source));

        self.client
            .put_item()
            .table_name(Self::table_name("model_mappings"))
            .set_item(Some(item))
            .send()
            .await?;

        Ok(())
    }

    async fn delete_mapping(&self, source_model_id: &str, provider: &str) -> Result<()> {
        self.client
            .delete_item()
            .table_name(Self::table_name("model_mappings"))
            .key("source_model_id", av_s(source_model_id))
            .key("provider", av_s(provider))
            .send()
            .await?;

        Ok(())
    }

    async fn list_wildcard_mappings(&self) -> Result<Vec<ModelMappingRecord>> {
        let result = self
            .client
            .scan()
            .table_name(Self::table_name("model_mappings"))
            .filter_expression("contains(source_model_id, :wildcard) AND #s = :active")
            .expression_attribute_names("#s", "status")
            .expression_attribute_values(":wildcard", av_s("*"))
            .expression_attribute_values(":active", av_s("active"))
            .send()
            .await?;

        let mut records: Vec<ModelMappingRecord> =
            result.items().iter().map(model_mapping_from_item).collect();

        records.sort_by_key(|r| std::cmp::Reverse(r.priority));
        Ok(records)
    }
}

// ============================================================================
// BackendConfigStore
// ============================================================================

#[async_trait]
impl BackendConfigStore for DynamoDbBackend {
    async fn get_backend(&self, name: &str) -> Result<Option<BackendRecord>> {
        let result = self
            .client
            .get_item()
            .table_name(Self::table_name("backends"))
            .key("name", av_s(name))
            .send()
            .await?;

        Ok(result.item().map(backend_from_item))
    }

    async fn list_enabled_backends(&self) -> Result<Vec<BackendRecord>> {
        let result = self
            .client
            .scan()
            .table_name(Self::table_name("backends"))
            .filter_expression("enabled = :enabled")
            .expression_attribute_values(":enabled", av_bool(true))
            .send()
            .await?;

        let mut records: Vec<BackendRecord> =
            result.items().iter().map(backend_from_item).collect();

        records.sort_by_key(|r| std::cmp::Reverse(r.priority));
        Ok(records)
    }

    async fn list_all_backends(&self) -> Result<Vec<BackendRecord>> {
        let result = self
            .client
            .scan()
            .table_name(Self::table_name("backends"))
            .send()
            .await?;

        let mut records: Vec<BackendRecord> =
            result.items().iter().map(backend_from_item).collect();

        records.sort_by_key(|r| std::cmp::Reverse(r.priority));
        Ok(records)
    }

    async fn upsert_backend(&self, record: &BackendRecord) -> Result<()> {
        let now = unix_now();
        let mut item = HashMap::new();
        item.insert("name".into(), av_s(&record.name));
        item.insert("backend_type".into(), av_s(&record.backend_type));
        item.insert("config".into(), av_s(&record.config));
        item.insert("enabled".into(), av_bool(record.enabled));
        item.insert("priority".into(), av_n(record.priority as i64));
        item.insert("weight".into(), av_n(record.weight as i64));
        item.insert("strategy".into(), av_s(&record.strategy));
        item.insert("max_failures".into(), av_n(record.max_failures as i64));
        item.insert("retry_after_secs".into(), av_n(record.retry_after_secs));
        item.insert("service_tier".into(), av_opt_s(&record.service_tier));
        item.insert(
            "models".into(),
            av_opt_s(&BackendRecord::models_to_json(&record.models)),
        );
        item.insert("created_at".into(), av_n(record.created_at));
        item.insert("updated_at".into(), av_n(now));

        self.client
            .put_item()
            .table_name(Self::table_name("backends"))
            .set_item(Some(item))
            .send()
            .await?;

        Ok(())
    }

    async fn delete_backend(&self, name: &str) -> Result<()> {
        self.client
            .delete_item()
            .table_name(Self::table_name("backends"))
            .key("name", av_s(name))
            .send()
            .await?;

        Ok(())
    }
}

// ============================================================================
// FeatureFlagStore
// ============================================================================

// ============================================================================
// SystemSettingStore
// ============================================================================

#[async_trait]
impl SystemSettingStore for DynamoDbBackend {
    async fn get_setting(&self, key: &str) -> Result<Option<SystemSettingRecord>> {
        let result = self
            .client
            .get_item()
            .table_name(Self::table_name("system_settings"))
            .key("key", av_s(key))
            .send()
            .await?;

        Ok(result.item().map(|item| SystemSettingRecord {
            key: get_s(item, "key"),
            value: get_s(item, "value"),
            description: get_s(item, "description"),
            ui_schema: get_opt_s(item, "ui_schema"),
            updated_at: get_opt_i64(item, "updated_at"),
        }))
    }

    async fn upsert_setting(&self, record: &SystemSettingRecord) -> Result<()> {
        let now = unix_now();

        let (expr, attr_values) = if let Some(ref schema) = record.ui_schema {
            (
                "SET #v = :v, description = :d, ui_schema = :u, updated_at = :t",
                vec![
                    (":v", av_s(&record.value)),
                    (":d", av_s(&record.description)),
                    (":u", av_s(schema)),
                    (":t", av_n(now)),
                ],
            )
        } else {
            (
                "SET #v = :v, description = :d, updated_at = :t",
                vec![
                    (":v", av_s(&record.value)),
                    (":d", av_s(&record.description)),
                    (":t", av_n(now)),
                ],
            )
        };

        let mut req = self
            .client
            .update_item()
            .table_name(Self::table_name("system_settings"))
            .key("key", av_s(&record.key))
            .update_expression(expr)
            .expression_attribute_names("#v", "value");

        for (k, v) in attr_values {
            req = req.expression_attribute_values(k, v);
        }

        req.send().await?;
        Ok(())
    }

    async fn list_settings(&self) -> Result<Vec<SystemSettingRecord>> {
        let result = self
            .client
            .scan()
            .table_name(Self::table_name("system_settings"))
            .send()
            .await?;

        let mut records: Vec<SystemSettingRecord> = result
            .items()
            .iter()
            .map(|item| SystemSettingRecord {
                key: get_s(item, "key"),
                value: get_s(item, "value"),
                description: get_s(item, "description"),
                ui_schema: get_opt_s(item, "ui_schema"),
                updated_at: get_opt_i64(item, "updated_at"),
            })
            .collect();

        records.sort_by(|a, b| a.key.cmp(&b.key));
        Ok(records)
    }
}
