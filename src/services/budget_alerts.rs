//! Budget threshold alerts.
//!
//! After every spend increment the usage tracker asks which configured
//! thresholds (`budget_alert_thresholds`, fractions of the budget) the request
//! **crossed**. Each crossing is claimed in storage (`claim_budget_alert`) so a
//! threshold fires once per budget period across all instances; the winner logs,
//! counts `onerouter_budget_alerts_total`, and — when `budget_alert_webhook_url`
//! is set — POSTs a Slack-compatible JSON payload in the background (5 s
//! timeout, 3 attempts). Nothing here blocks or fails the request.

use serde::Serialize;
use std::sync::Arc;
use std::time::Duration;

/// Hot-reloadable alert configuration.
#[derive(Debug, Clone, PartialEq)]
pub struct BudgetAlertConfig {
    /// Ascending fractions in (0, 10], e.g. `[0.8, 1.0]`.
    pub thresholds: Vec<f64>,
    /// `https://` only; `None` = log + metric only.
    pub webhook_url: Option<String>,
}

impl Default for BudgetAlertConfig {
    fn default() -> Self {
        Self {
            thresholds: vec![0.8, 1.0],
            webhook_url: None,
        }
    }
}

/// Parse `budget_alert_thresholds` ("0.8,1.0" or "[0.8, 1.0]"; empty = none).
pub fn parse_thresholds(raw: &str) -> Result<Vec<f64>, String> {
    let trimmed = raw.trim().trim_start_matches('[').trim_end_matches(']');
    let mut out = Vec::new();
    for part in trimmed.split(',').map(str::trim).filter(|s| !s.is_empty()) {
        let v: f64 = part
            .parse()
            .map_err(|_| format!("'{part}' is not a number"))?;
        if !(v > 0.0 && v <= 10.0) {
            return Err(format!("threshold {v} must be in (0, 10]"));
        }
        out.push(v);
    }
    out.sort_by(|a, b| a.partial_cmp(b).unwrap_or(std::cmp::Ordering::Equal));
    out.dedup();
    Ok(out)
}

/// Validate `budget_alert_webhook_url` (empty = disabled).
pub fn parse_webhook_url(raw: &str) -> Result<Option<String>, String> {
    let raw = raw.trim();
    if raw.is_empty() {
        return Ok(None);
    }
    let url = reqwest::Url::parse(raw).map_err(|e| format!("invalid URL: {e}"))?;
    if url.scheme() != "https" {
        return Err("webhook URL must use https".into());
    }
    Ok(Some(raw.to_string()))
}

/// Thresholds crossed by moving from `used - delta` to `used` (strictly below
/// before, at/above after).
pub fn crossed(thresholds: &[f64], budget: f64, used: f64, delta: f64) -> Vec<f64> {
    if budget <= 0.0 || delta <= 0.0 {
        return Vec::new();
    }
    let before = used - delta;
    thresholds
        .iter()
        .copied()
        .filter(|t| before < t * budget && used >= t * budget)
        .collect()
}

#[derive(Debug, Clone, Serialize)]
pub struct BudgetAlert {
    /// `"user"` or `"key"`.
    pub scope: &'static str,
    pub id: String,
    pub name: String,
    pub budget: f64,
    pub used: f64,
    pub threshold: f64,
    /// Period key, e.g. `2026-11`.
    pub period: String,
}

impl BudgetAlert {
    fn text(&self) -> String {
        format!(
            ":warning: one-router budget alert — {} '{}' reached {:.0}% of its {} budget (${:.2} of ${:.2})",
            self.scope,
            self.name,
            self.threshold * 100.0,
            self.period,
            self.used,
            self.budget
        )
    }
}

/// Emit a claimed alert: log + metric now, webhook in the background.
pub fn emit(alert: BudgetAlert, webhook_url: Option<String>, http: Arc<reqwest::Client>) {
    tracing::warn!(
        scope = alert.scope,
        id = %alert.id,
        name = %alert.name,
        threshold = alert.threshold,
        used = alert.used,
        budget = alert.budget,
        period = %alert.period,
        "Budget alert threshold reached"
    );
    let Some(url) = webhook_url else {
        crate::observability::metrics::record_budget_alert(alert.scope, "logged");
        return;
    };
    tokio::spawn(async move {
        let body = serde_json::json!({ "text": alert.text(), "alert": &alert });
        let mut result = "failed";
        for attempt in 0..3u32 {
            let resp = http
                .post(&url)
                .timeout(Duration::from_secs(5))
                .json(&body)
                .send()
                .await;
            match resp {
                Ok(r) if r.status().is_success() => {
                    result = "sent";
                    break;
                }
                Ok(r) => {
                    tracing::warn!(status = %r.status(), attempt, "Budget alert webhook rejected")
                }
                // without_url(): the webhook URL is itself a secret (Slack token).
                Err(e) => {
                    tracing::warn!(error = %e.without_url(), attempt, "Budget alert webhook failed")
                }
            }
            tokio::time::sleep(Duration::from_millis(500 * 2u64.pow(attempt))).await;
        }
        crate::observability::metrics::record_budget_alert(alert.scope, result);
    });
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn threshold_parsing() {
        assert_eq!(parse_thresholds("0.8,1.0").unwrap(), vec![0.8, 1.0]);
        assert_eq!(parse_thresholds("[1.0, 0.5, 0.5]").unwrap(), vec![0.5, 1.0]);
        assert!(parse_thresholds("").unwrap().is_empty());
        assert!(parse_thresholds("0").is_err());
        assert!(parse_thresholds("x").is_err());
    }

    #[test]
    fn webhook_must_be_https() {
        assert_eq!(parse_webhook_url("").unwrap(), None);
        assert!(parse_webhook_url("http://hooks.example.com/x").is_err());
        assert!(parse_webhook_url("https://hooks.example.com/x")
            .unwrap()
            .is_some());
        assert!(parse_webhook_url("not a url").is_err());
    }

    #[test]
    fn crossing_detection() {
        let t = [0.8, 1.0];
        assert_eq!(crossed(&t, 10.0, 8.5, 1.0), vec![0.8]); // 7.5 → 8.5
        assert_eq!(crossed(&t, 10.0, 10.5, 3.5), vec![0.8, 1.0]); // 7 → 10.5
        assert!(crossed(&t, 10.0, 9.0, 0.5).is_empty()); // 8.5 → 9 (already past 0.8)
        assert!(crossed(&t, 0.0, 9.0, 0.5).is_empty());
        assert_eq!(crossed(&t, 10.0, 8.0, 0.5), vec![0.8]); // exactly at threshold
    }
}
