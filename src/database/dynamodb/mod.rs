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
        created_at: get_i64(item, "created_at"),
        updated_at: get_opt_i64(item, "updated_at"),
    }
}

fn api_key_to_item(record: &ApiKeyRecord) -> HashMap<String, AttributeValue> {
    let mut item = HashMap::new();
    item.insert("api_key".into(), av_s(&record.api_key));
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
    item.insert("created_at".into(), av_n(record.created_at));
    item.insert("updated_at".into(), av_opt_n_i64(record.updated_at));
    item
}

fn usage_from_item(item: &HashMap<String, AttributeValue>) -> UsageRecord {
    UsageRecord {
        id: get_opt_i64(item, "id"),
        api_key: get_s(item, "api_key"),
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

    async fn initialize(&self) -> Result<()> {
        migrations::create_tables(self).await?;
        self.seed_defaults().await?;
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
        // Application-level unique check on name (DynamoDB has no UNIQUE constraints)
        let existing = self.list_api_keys().await?;
        if existing.iter().any(|r| r.name == record.name) {
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
        // Application-level unique check on name (DynamoDB has no UNIQUE constraints)
        let existing = self.list_api_keys().await?;
        if existing
            .iter()
            .any(|r| r.api_key != record.api_key && r.name == record.name)
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

    async fn increment_budget_used(&self, api_key: &str, amount: f64) -> Result<bool> {
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

        if let Some(attrs) = result.attributes() {
            let budget = get_opt_f64(attrs, "monthly_budget");
            let used = get_f64(attrs, "budget_used");
            if let Some(limit) = budget {
                if used >= limit {
                    return Ok(true);
                }
            }
        }

        Ok(false)
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
        let result = self
            .client
            .scan()
            .table_name(Self::table_name("api_keys"))
            .send()
            .await?;

        let records = result.items().iter().map(api_key_from_item).collect();

        Ok(records)
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
        api_key: &str,
        since: Option<&str>,
        limit: Option<i64>,
    ) -> Result<Vec<UsageRecord>> {
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
            result.items().iter().map(usage_from_item).collect()
        };

        Ok(records)
    }

    async fn query_usage_summary(
        &self,
        api_key: &str,
        start: Option<&str>,
        end: Option<&str>,
        group_by: &str,
    ) -> Result<Vec<UsageSummaryRow>> {
        use std::collections::HashMap;

        // 复用已有的 get_usage_by_api_key 拉全量记录
        // 注意：DynamoDB 后端会拉取指定时间范围内该 api_key 的全量记录到内存再聚合，
        // 数据量大时（如数百万条）可能造成高内存占用。
        // 生产环境建议配合合理的 start_time 参数缩小查询范围。
        let records = self.get_usage_by_api_key(api_key, start, None).await?;

        // 按 end 过滤（DynamoDB 查询只支持 sort_key >= start）
        let records: Vec<_> = if let Some(end_ts) = end {
            records
                .into_iter()
                .filter(|r| r.timestamp.as_str() <= end_ts)
                .collect()
        } else {
            records
        };

        // 聚合
        let mut map: HashMap<String, UsageSummaryRow> = HashMap::new();

        for r in &records {
            let key = if group_by == "model" {
                r.model.clone()
            } else {
                // 取 timestamp 的前 13 字符："2026-03-24T15"
                r.timestamp.chars().take(13).collect()
            };

            let entry = map.entry(key.clone()).or_insert(UsageSummaryRow {
                group_key: key,
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
        records.sort_by(|a, b| b.priority.cmp(&a.priority));
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

        records.sort_by(|a, b| b.priority.cmp(&a.priority));
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

        records.sort_by(|a, b| b.priority.cmp(&a.priority));
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

        records.sort_by(|a, b| b.priority.cmp(&a.priority));
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
            updated_at: get_opt_i64(item, "updated_at"),
        }))
    }

    async fn upsert_setting(&self, record: &SystemSettingRecord) -> Result<()> {
        let now = unix_now();
        let mut item = HashMap::new();
        item.insert("key".into(), av_s(&record.key));
        item.insert("value".into(), av_s(&record.value));
        item.insert("description".into(), av_s(&record.description));
        item.insert("updated_at".into(), av_n(now));

        self.client
            .put_item()
            .table_name(Self::table_name("system_settings"))
            .set_item(Some(item))
            .send()
            .await?;

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
                updated_at: get_opt_i64(item, "updated_at"),
            })
            .collect();

        records.sort_by(|a, b| a.key.cmp(&b.key));
        Ok(records)
    }
}
