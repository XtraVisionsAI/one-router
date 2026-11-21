//! GET /v1/key — an API key reads its own lifecycle and current-period budgets.
//!
//! Authenticated by [`identify_api_key`](crate::middleware::auth::identify_api_key)
//! only: no rate limiting, no precharge, no usage row, no `last_used_at` write —
//! clients (status lines) poll this. Everything comes from the records
//! authentication already holds, so `used` is exactly the value the budget
//! check compares (stale by at most `auth_cache_ttl_secs`).

use axum::{Extension, Json};
use chrono::{DateTime, Utc};
use serde::Serialize;

use crate::database::models::{period_spend, ApiKeyRecord, BudgetPeriod, TeamRecord, UserRecord};
use crate::middleware::auth::{ApiKeyInfo, BudgetScope, KeyIdentity, EPHEMERAL_KEY_ID};

#[derive(Debug, Serialize, PartialEq)]
pub struct KeyResponse {
    pub object: &'static str,
    pub key_id: String,
    /// Omitted for an expired key.
    #[serde(skip_serializing_if = "Option::is_none")]
    pub name: Option<String>,
    pub key_display: String,
    /// Unix seconds on the gateway — compute remaining time against this, not
    /// the local clock.
    pub server_time: i64,
    /// Unix seconds; `null` = never expires.
    pub expires_at: Option<i64>,
    /// Past `expires_at`: every other endpoint answers 401 `expired_key`.
    pub expired: bool,
    /// A replacement key was issued; this one only lives until `expires_at`.
    pub rotated: bool,
    /// Budget layers that apply to this key. Empty for an expired key.
    pub budgets: Vec<BudgetLayer>,
}

#[derive(Debug, Serialize, PartialEq)]
pub struct BudgetLayer {
    pub scope: &'static str,
    /// User / team name (absent on the key layer).
    #[serde(skip_serializing_if = "Option::is_none")]
    pub name: Option<String>,
    pub period: &'static str,
    pub period_key: String,
    /// Spend in the current period (USD, after cost rate).
    pub used: f64,
    /// `null` = this layer has no budget.
    pub budget: Option<f64>,
    /// This layer is spent: business endpoints answer 403 `budget_exceeded`.
    pub exhausted: bool,
    /// Unix seconds (UTC) at which the next period starts.
    pub resets_at: i64,
}

fn layer(
    scope: BudgetScope,
    name: Option<&str>,
    period: BudgetPeriod,
    used: f64,
    stored_period: Option<&str>,
    budget: Option<f64>,
    now: DateTime<Utc>,
) -> BudgetLayer {
    let period_key = period.key_at(now);
    let used = period_spend(used, stored_period, &period_key);
    BudgetLayer {
        scope: scope.as_str(),
        name: name.map(str::to_string),
        period: period.as_str(),
        period_key,
        used,
        budget,
        // Same comparison as `ApiKeyInfo::exhausted_budget`.
        exhausted: budget.is_some_and(|limit| used >= limit),
        resets_at: period.next_start(now).timestamp(),
    }
}

/// The view of a database key. An expired key gets its lifecycle only — it may
/// be a leaked key that was rotated away, so it must not keep reading the
/// owner's names and spend.
fn stored_key_view(
    record: &ApiKeyRecord,
    user: Option<&UserRecord>,
    team: Option<&TeamRecord>,
    now: DateTime<Utc>,
    expired: bool,
) -> KeyResponse {
    let mut budgets = Vec::new();
    if !expired {
        budgets.push(layer(
            BudgetScope::Key,
            None,
            record.budget_period,
            record.budget_used_mtd,
            record.budget_mtd_month.as_deref(),
            record.monthly_budget,
            now,
        ));
        if let Some(u) = user {
            budgets.push(layer(
                BudgetScope::User,
                Some(&u.name),
                u.budget_period,
                u.budget_used_mtd,
                u.budget_mtd_month.as_deref(),
                u.monthly_budget,
                now,
            ));
        }
        // Team-wide spend is other members' data: shown only when a team
        // budget can actually block this key.
        if let Some(t) = team.filter(|t| t.monthly_budget.is_some()) {
            budgets.push(layer(
                BudgetScope::Team,
                Some(&t.name),
                t.budget_period,
                t.budget_used_mtd,
                t.budget_mtd_month.as_deref(),
                t.monthly_budget,
                now,
            ));
        }
    }
    // Same identifiers the rest of the API uses for this key.
    let info = ApiKeyInfo::from_db_record(record, None, None);
    KeyResponse {
        object: "key",
        key_id: info.key_id,
        name: (!expired).then(|| record.name.clone()),
        key_display: info.api_key,
        server_time: now.timestamp(),
        expires_at: record.expires_at,
        expired,
        rotated: record.rotated_to.is_some(),
        budgets,
    }
}

fn ephemeral_key_view(now: DateTime<Utc>) -> KeyResponse {
    KeyResponse {
        object: "key",
        key_id: EPHEMERAL_KEY_ID.to_string(),
        name: Some(EPHEMERAL_KEY_ID.to_string()),
        key_display: EPHEMERAL_KEY_ID.to_string(),
        server_time: now.timestamp(),
        expires_at: None,
        expired: false,
        rotated: false,
        budgets: Vec::new(),
    }
}

pub async fn get_key(Extension(identity): Extension<KeyIdentity>) -> Json<KeyResponse> {
    Json(match identity.principals.as_deref() {
        Some((record, user, team)) => stored_key_view(
            record,
            user.as_ref(),
            team.as_ref(),
            identity.now,
            identity.expired,
        ),
        None => ephemeral_key_view(identity.now),
    })
}

#[cfg(test)]
mod tests {
    use super::*;
    use chrono::TimeZone;

    fn now() -> DateTime<Utc> {
        // Saturday, ISO week 47.
        Utc.with_ymd_and_hms(2026, 11, 21, 12, 0, 0).unwrap()
    }

    fn key() -> ApiKeyRecord {
        ApiKeyRecord {
            api_key: "hash-never-shown".into(),
            key_id: "kid".into(),
            key_display: "sk-ab••••cd".into(),
            user_id: "uid".into(),
            name: "laptop".into(),
            is_active: true,
            rate_limit: 0,
            cost_rate: 1.0,
            monthly_budget: Some(100.0),
            budget_used: 500.0,
            budget_used_mtd: 45.6,
            budget_mtd_month: Some("2026-11".into()),
            deactivated_reason: None,
            budget_history: None,
            tpm_limit: None,
            cache_ttl: None,
            metadata: Some(r#"{"secret":"note"}"#.into()),
            expires_at: None,
            allowed_models: None,
            allowed_cidrs: Some(vec!["10.0.0.0/8".into()]),
            budget_period: BudgetPeriod::Monthly,
            budget_alerts_sent: None,
            default_tags: None,
            last_used_at: None,
            rotated_to: None,
            max_concurrency: None,
            created_at: 0,
            updated_at: None,
        }
    }

    fn user() -> UserRecord {
        let mut u = UserRecord::new("alice", 0);
        u.budget_period = BudgetPeriod::Weekly;
        u.monthly_budget = Some(50.0);
        u.budget_used_mtd = 50.0;
        u.budget_mtd_month = Some("2026-W47".into());
        u
    }

    #[test]
    fn layers_use_their_own_period_and_the_auth_spend() {
        let mut team = TeamRecord::new("platform", 0);
        team.budget_period = BudgetPeriod::Daily;
        team.monthly_budget = Some(1000.0);
        team.budget_used_mtd = 812.0;
        team.budget_mtd_month = Some("2026-11-20".into()); // yesterday → 0 today
        let view = stored_key_view(&key(), Some(&user()), Some(&team), now(), false);

        assert_eq!(view.key_id, "kid");
        assert_eq!(view.name.as_deref(), Some("laptop"));
        assert_eq!(view.key_display, "sk-ab••••cd");
        assert_eq!(view.server_time, now().timestamp());
        assert!(!view.expired && !view.rotated);
        let at = |y, m, d| Utc.with_ymd_and_hms(y, m, d, 0, 0, 0).unwrap().timestamp();

        let [k, u, t] = view.budgets.as_slice() else {
            panic!("expected three layers: {:?}", view.budgets);
        };
        assert_eq!(
            (k.scope, k.period, k.period_key.as_str()),
            ("key", "monthly", "2026-11")
        );
        assert_eq!((k.used, k.budget, k.exhausted), (45.6, Some(100.0), false));
        assert_eq!(k.resets_at, at(2026, 12, 1));
        assert_eq!(k.name, None);

        assert_eq!(
            (u.scope, u.period, u.period_key.as_str()),
            ("user", "weekly", "2026-W47")
        );
        assert_eq!(u.name.as_deref(), Some("alice"));
        assert!(u.exhausted); // 50 of 50 — what auth answers 403 on
        assert_eq!(u.resets_at, at(2026, 11, 23));

        assert_eq!(
            (t.scope, t.period, t.period_key.as_str()),
            ("team", "daily", "2026-11-21")
        );
        assert_eq!((t.used, t.exhausted), (0.0, false)); // stale period counts as 0
        assert_eq!(t.resets_at, at(2026, 11, 22));
    }

    #[test]
    fn team_without_a_budget_and_missing_owner_are_omitted() {
        let mut team = TeamRecord::new("platform", 0);
        team.budget_used_mtd = 812.0;
        team.budget_mtd_month = Some("2026-11".into());
        let view = stored_key_view(&key(), Some(&user()), Some(&team), now(), false);
        let scopes: Vec<_> = view.budgets.iter().map(|b| b.scope).collect();
        assert_eq!(scopes, ["key", "user"]);

        let mut k = key();
        k.monthly_budget = None;
        let view = stored_key_view(&k, None, None, now(), false);
        assert_eq!(view.budgets.len(), 1);
        assert_eq!(
            (view.budgets[0].budget, view.budgets[0].exhausted),
            (None, false)
        );
    }

    #[test]
    fn expired_key_reports_lifecycle_only() {
        let mut k = key();
        k.expires_at = Some(now().timestamp() - 60);
        k.rotated_to = Some("new-key-id".into());
        let view = stored_key_view(&k, Some(&user()), None, now(), true);
        assert!(view.expired && view.rotated);
        assert_eq!(view.expires_at, k.expires_at);
        assert_eq!(view.name, None);
        assert!(view.budgets.is_empty());
    }

    #[test]
    fn internal_fields_never_serialize() {
        let mut k = key();
        k.rotated_to = Some("new-key-id".into());
        let view = stored_key_view(&k, Some(&user()), None, now(), false);
        let json = serde_json::to_string(&view).unwrap();
        for leaked in [
            "hash-never-shown",
            "new-key-id",
            "10.0.0.0",
            "secret",
            "cost_rate",
            "uid",
        ] {
            assert!(!json.contains(leaked), "{leaked} in {json}");
        }
        assert!(json.contains(r#""rotated":true"#));
        assert!(json.contains(r#""expires_at":null"#));
    }

    #[test]
    fn ephemeral_key_has_no_expiry_or_budgets() {
        let view = ephemeral_key_view(now());
        assert_eq!(view.key_id, EPHEMERAL_KEY_ID);
        assert_eq!(view.expires_at, None);
        assert!(view.budgets.is_empty());
    }
}
