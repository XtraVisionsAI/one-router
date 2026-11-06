//! Admin API — teams (aggregate budget / limit layer over users; no permissions)
//!
//! A user belongs to at most one team (`PUT /admin/api/users/:user {"team": ..}`).
//! Team budget, RPM / TPM and concurrency are shared by every member's keys;
//! team model / CIDR allowlists intersect with the user's and key's; the team
//! cost rate multiplies each member's own.
//!
//! GET    /admin/api/teams                       → list (with member counts)
//! POST   /admin/api/teams                       → create
//! GET    /admin/api/teams/:team                 → one team + members
//! PUT    /admin/api/teams/:team                 → update
//! DELETE /admin/api/teams/:team[?force=true]    → delete (409 while it has
//!                                                 members, unless force
//!                                                 removes them from the team)
//! POST   /admin/api/teams/:team/activate | /deactivate

use axum::{
    extract::{Path, Query, State},
    http::StatusCode,
    response::{IntoResponse, Response},
    Json,
};
use chrono::Utc;
use serde::{Deserialize, Serialize};
use std::collections::HashMap;

use super::common::*;
use crate::database::models::{period_spend, BudgetPeriod, TeamRecord};
use crate::server::state::AppState;
use crate::services::audit::AuditDetail;

#[derive(Debug, Serialize)]
pub struct AdminTeamItem {
    pub team_id: String,
    pub name: String,
    pub is_active: bool,
    pub cost_rate: f64,
    pub monthly_budget: Option<f64>,
    pub budget_period: BudgetPeriod,
    pub budget_used_mtd: f64,
    pub budget_used: f64,
    pub budget_history: Option<serde_json::Value>,
    pub rate_limit: Option<i32>,
    pub tpm_limit: Option<i32>,
    pub max_concurrency: Option<i32>,
    pub allowed_models: Option<Vec<String>>,
    pub allowed_cidrs: Option<Vec<String>>,
    pub metadata: Option<serde_json::Value>,
    pub member_count: usize,
    pub created_at: i64,
    pub updated_at: Option<i64>,
}

impl AdminTeamItem {
    fn from_record(t: &TeamRecord, member_count: usize) -> Self {
        let period = t.budget_period.key_at(Utc::now());
        Self {
            team_id: t.team_id.clone(),
            name: t.name.clone(),
            is_active: t.is_active,
            cost_rate: t.cost_rate,
            monthly_budget: t.monthly_budget,
            budget_period: t.budget_period,
            budget_used_mtd: period_spend(
                t.budget_used_mtd,
                t.budget_mtd_month.as_deref(),
                &period,
            ),
            budget_used: t.budget_used,
            budget_history: decode_metadata(t.budget_history.as_deref()),
            rate_limit: t.rate_limit,
            tpm_limit: t.tpm_limit,
            max_concurrency: t.max_concurrency,
            allowed_models: t.allowed_models.clone(),
            allowed_cidrs: t.allowed_cidrs.clone(),
            metadata: decode_metadata(t.metadata.as_deref()),
            member_count,
            created_at: t.created_at,
            updated_at: t.updated_at,
        }
    }
}

#[derive(Debug, Serialize)]
pub struct TeamMember {
    pub user_id: String,
    pub name: String,
    pub is_active: bool,
}

#[derive(Debug, Serialize)]
pub struct TeamDetail {
    #[serde(flatten)]
    pub team: AdminTeamItem,
    pub members: Vec<TeamMember>,
}

#[derive(Debug, Serialize)]
pub struct TeamListResponse {
    pub object: &'static str,
    pub data: Vec<AdminTeamItem>,
}

#[derive(Debug, Deserialize)]
pub struct CreateTeamRequest {
    pub name: String,
    pub cost_rate: Option<f64>,
    pub monthly_budget: Option<f64>,
    pub budget_period: Option<String>,
    pub rate_limit: Option<i32>,
    pub tpm_limit: Option<i32>,
    pub max_concurrency: Option<i32>,
    pub allowed_models: Option<Vec<String>>,
    pub allowed_cidrs: Option<Vec<String>>,
    pub metadata: Option<serde_json::Value>,
}

#[derive(Debug, Deserialize)]
pub struct UpdateTeamRequest {
    pub name: Option<String>,
    pub cost_rate: Option<f64>,
    #[serde(default, deserialize_with = "deserialize_optional_field")]
    pub monthly_budget: Option<Option<f64>>,
    pub budget_period: Option<String>,
    #[serde(default, deserialize_with = "deserialize_optional_field")]
    pub rate_limit: Option<Option<i32>>,
    #[serde(default, deserialize_with = "deserialize_optional_field")]
    pub tpm_limit: Option<Option<i32>>,
    #[serde(default, deserialize_with = "deserialize_optional_field")]
    pub max_concurrency: Option<Option<i32>>,
    #[serde(default, deserialize_with = "deserialize_optional_field")]
    pub allowed_models: Option<Option<Vec<String>>>,
    #[serde(default, deserialize_with = "deserialize_optional_field")]
    pub allowed_cidrs: Option<Option<Vec<String>>>,
    #[serde(default, deserialize_with = "deserialize_optional_field")]
    pub metadata: Option<Option<serde_json::Value>>,
}

#[derive(Debug, Deserialize)]
pub struct DeleteTeamQuery {
    #[serde(default)]
    pub force: bool,
}

/// Resolve a `team_id` or team name.
pub(super) async fn resolve_team(
    state: &AppState,
    ident: &str,
) -> Result<TeamRecord, HandlerError> {
    let teams = state.database.teams();
    match teams.get_team(ident).await {
        Ok(Some(t)) => return Ok(t),
        Ok(None) => {}
        Err(e) => return Err(internal_error("Failed to retrieve team", &e)),
    }
    match teams.get_team_by_name(ident).await {
        Ok(Some(t)) => Ok(t),
        Ok(None) => Err(not_found(format!("Team '{ident}' not found"))),
        Err(e) => Err(internal_error("Failed to retrieve team", &e)),
    }
}

fn validate_team_limits(
    cost_rate: Option<f64>,
    budget: Option<f64>,
    rpm: Option<i32>,
    tpm: Option<i32>,
    conc: Option<i32>,
) -> Result<(), HandlerError> {
    validate_non_negative("cost_rate", cost_rate)?;
    validate_non_negative("monthly_budget", budget)?;
    validate_positive("rate_limit", rpm)?;
    validate_positive("tpm_limit", tpm)?;
    validate_positive("max_concurrency", conc)
}

async fn member_count(state: &AppState, team_id: &str) -> usize {
    state
        .database
        .teams()
        .list_team_members(team_id)
        .await
        .map(|m| m.len())
        .unwrap_or(0)
}

fn audited<T: Serialize>(
    r: Result<(T, AuditDetail), HandlerError>,
    status: StatusCode,
) -> Response {
    match r {
        Ok((v, d)) => d.attach((status, Json(v)).into_response()),
        Err(resp) => *resp,
    }
}

/// GET /admin/api/teams
pub async fn list_teams(State(state): State<AppState>) -> Response {
    let teams = match state.database.teams().list_teams().await {
        Ok(t) => t,
        Err(e) => return *internal_error("Failed to retrieve teams", &e),
    };
    let mut counts: HashMap<String, usize> = HashMap::new();
    if let Ok(users) = state.database.users().list_users().await {
        for u in users {
            if let Some(t) = u.team_id {
                *counts.entry(t).or_default() += 1;
            }
        }
    }
    let data = teams
        .iter()
        .map(|t| AdminTeamItem::from_record(t, counts.get(&t.team_id).copied().unwrap_or(0)))
        .collect();
    Json(TeamListResponse {
        object: "list",
        data,
    })
    .into_response()
}

/// POST /admin/api/teams
pub async fn create_team(
    State(state): State<AppState>,
    Json(body): Json<CreateTeamRequest>,
) -> Response {
    let result = async {
        validate_name(&body.name)?;
        validate_team_limits(
            body.cost_rate,
            body.monthly_budget,
            body.rate_limit,
            body.tpm_limit,
            body.max_concurrency,
        )?;
        let mut t = TeamRecord::new(body.name.trim(), Utc::now().timestamp());
        t.cost_rate = body.cost_rate.unwrap_or(1.0);
        t.monthly_budget = body.monthly_budget;
        t.budget_period = parse_budget_period(body.budget_period.as_deref())?.unwrap_or_default();
        t.rate_limit = body.rate_limit;
        t.tpm_limit = body.tpm_limit;
        t.max_concurrency = body.max_concurrency;
        t.allowed_models = validate_allowed_models(body.allowed_models)?;
        t.allowed_cidrs = validate_cidrs(body.allowed_cidrs)?;
        t.metadata = body.metadata.as_ref().map(encode_metadata).transpose()?;
        match state.database.teams().create_team(&t).await {
            Ok(()) => {
                let item = AdminTeamItem::from_record(&t, 0);
                let d = AuditDetail::new("team.create", "team", &t.team_id).after(&item);
                Ok((item, d))
            }
            Err(e) if is_unique_error(&e, "name") => Err(conflict(format!(
                "A team named '{}' already exists",
                t.name
            ))),
            Err(e) => Err(internal_error("Failed to create team", &e)),
        }
    }
    .await;
    audited(result, StatusCode::CREATED)
}

/// GET /admin/api/teams/:team
pub async fn get_team(State(state): State<AppState>, Path(ident): Path<String>) -> Response {
    let result = async {
        let t = resolve_team(&state, &ident).await?;
        let members = state
            .database
            .teams()
            .list_team_members(&t.team_id)
            .await
            .map_err(|e| internal_error("Failed to retrieve members", &e))?;
        Ok::<_, HandlerError>(TeamDetail {
            team: AdminTeamItem::from_record(&t, members.len()),
            members: members
                .into_iter()
                .map(|u| TeamMember {
                    user_id: u.user_id,
                    name: u.name,
                    is_active: u.is_active,
                })
                .collect(),
        })
    }
    .await;
    match result {
        Ok(v) => Json(v).into_response(),
        Err(resp) => *resp,
    }
}

/// PUT /admin/api/teams/:team
pub async fn update_team(
    State(state): State<AppState>,
    Path(ident): Path<String>,
    Json(body): Json<UpdateTeamRequest>,
) -> Response {
    let result = async {
        let mut t = resolve_team(&state, &ident).await?;
        let count = member_count(&state, &t.team_id).await;
        let before = AdminTeamItem::from_record(&t, count);
        validate_team_limits(
            body.cost_rate,
            body.monthly_budget.flatten(),
            body.rate_limit.flatten(),
            body.tpm_limit.flatten(),
            body.max_concurrency.flatten(),
        )?;
        if let Some(name) = body.name {
            validate_name(&name)?;
            t.name = name.trim().to_string();
        }
        if let Some(v) = body.cost_rate {
            t.cost_rate = v;
        }
        if let Some(v) = body.monthly_budget {
            t.monthly_budget = v;
        }
        if let Some(p) = parse_budget_period(body.budget_period.as_deref())? {
            t.budget_period = p;
        }
        if let Some(v) = body.rate_limit {
            t.rate_limit = v;
        }
        if let Some(v) = body.tpm_limit {
            t.tpm_limit = v;
        }
        if let Some(v) = body.max_concurrency {
            t.max_concurrency = v;
        }
        if let Some(v) = body.allowed_models {
            t.allowed_models = validate_allowed_models(v)?;
        }
        if let Some(v) = body.allowed_cidrs {
            t.allowed_cidrs = validate_cidrs(v)?;
        }
        if let Some(v) = body.metadata {
            t.metadata = v.as_ref().map(encode_metadata).transpose()?;
        }
        match state.database.teams().update_team(&t).await {
            Ok(()) => {
                state.auth_cache.invalidate_all();
                let after = AdminTeamItem::from_record(&t, count);
                let d = AuditDetail::new("team.update", "team", &t.team_id)
                    .before(&before)
                    .after(&after);
                Ok((after, d))
            }
            Err(e) if is_unique_error(&e, "name") => Err(conflict(format!(
                "A team named '{}' already exists",
                t.name
            ))),
            Err(e) => Err(internal_error("Failed to update team", &e)),
        }
    }
    .await;
    audited(result, StatusCode::OK)
}

#[derive(Debug, Serialize)]
pub struct DeleteTeamResponse {
    pub ok: bool,
    pub removed_members: usize,
}

/// DELETE /admin/api/teams/:team[?force=true]
pub async fn delete_team(
    State(state): State<AppState>,
    Path(ident): Path<String>,
    Query(q): Query<DeleteTeamQuery>,
) -> Response {
    let result = async {
        let t = resolve_team(&state, &ident).await?;
        let members = state
            .database
            .teams()
            .list_team_members(&t.team_id)
            .await
            .map_err(|e| internal_error("Failed to retrieve members", &e))?;
        if !members.is_empty() && !q.force {
            return Err(conflict(format!(
                "Team '{}' still has {} member(s); move them first or pass force=true",
                t.name,
                members.len()
            )));
        }
        for mut u in members.clone() {
            u.team_id = None;
            state
                .database
                .users()
                .update_user(&u)
                .await
                .map_err(|e| internal_error("Failed to remove member", &e))?;
        }
        state
            .database
            .teams()
            .delete_team(&t.team_id)
            .await
            .map_err(|e| internal_error("Failed to delete team", &e))?;
        state.auth_cache.invalidate_all();
        let d = AuditDetail::new("team.delete", "team", &t.team_id)
            .before(&AdminTeamItem::from_record(&t, members.len()))
            .after(&serde_json::json!({
                "removed_member_ids": members.iter().map(|m| m.user_id.clone()).collect::<Vec<_>>(),
            }));
        Ok((
            DeleteTeamResponse {
                ok: true,
                removed_members: members.len(),
            },
            d,
        ))
    }
    .await;
    audited(result, StatusCode::OK)
}

async fn set_active(
    state: &AppState,
    ident: &str,
    active: bool,
) -> Result<(AdminTeamItem, AuditDetail), HandlerError> {
    let mut t = resolve_team(state, ident).await?;
    t.is_active = active;
    state
        .database
        .teams()
        .update_team(&t)
        .await
        .map_err(|e| internal_error("Failed to update team", &e))?;
    state.auth_cache.invalidate_all();
    let item = AdminTeamItem::from_record(&t, member_count(state, &t.team_id).await);
    let action = if active {
        "team.activate"
    } else {
        "team.deactivate"
    };
    Ok((item, AuditDetail::new(action, "team", &t.team_id)))
}

/// POST /admin/api/teams/:team/activate
pub async fn activate_team(State(state): State<AppState>, Path(ident): Path<String>) -> Response {
    audited(set_active(&state, &ident, true).await, StatusCode::OK)
}

/// POST /admin/api/teams/:team/deactivate
pub async fn deactivate_team(State(state): State<AppState>, Path(ident): Path<String>) -> Response {
    audited(set_active(&state, &ident, false).await, StatusCode::OK)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn team_item_and_validation() {
        let mut t = TeamRecord::new("infra", 0);
        t.budget_used_mtd = 3.0;
        t.budget_mtd_month = Some("2000-01".into());
        let item = AdminTeamItem::from_record(&t, 4);
        assert_eq!(item.budget_used_mtd, 0.0);
        assert_eq!(item.member_count, 4);
        assert!(validate_team_limits(Some(0.8), Some(100.0), Some(600), None, Some(20)).is_ok());
        assert!(validate_team_limits(None, None, None, None, Some(0)).is_err());
    }
}
