//! OpenAI Models API endpoint

use axum::{
    extract::{Path, State},
    http::StatusCode,
    response::IntoResponse,
    Json,
};

use crate::schemas::openai::{current_timestamp, Model, ModelsResponse, OpenAIErrorResponse};
use crate::server::state::AppState;

fn get_available_models() -> Vec<Model> {
    let created = current_timestamp();

    vec![
        Model {
            id: "gpt-4".into(),
            object: "model".into(),
            created,
            owned_by: "openai".into(),
        },
        Model {
            id: "gpt-4-turbo".into(),
            object: "model".into(),
            created,
            owned_by: "openai".into(),
        },
        Model {
            id: "gpt-4o".into(),
            object: "model".into(),
            created,
            owned_by: "openai".into(),
        },
        Model {
            id: "gpt-4o-mini".into(),
            object: "model".into(),
            created,
            owned_by: "openai".into(),
        },
        Model {
            id: "gpt-3.5-turbo".into(),
            object: "model".into(),
            created,
            owned_by: "openai".into(),
        },
        Model {
            id: "claude-3-5-sonnet-20241022".into(),
            object: "model".into(),
            created,
            owned_by: "anthropic".into(),
        },
        Model {
            id: "claude-3-5-haiku-20241022".into(),
            object: "model".into(),
            created,
            owned_by: "anthropic".into(),
        },
        Model {
            id: "claude-3-opus-20240229".into(),
            object: "model".into(),
            created,
            owned_by: "anthropic".into(),
        },
        Model {
            id: "claude-sonnet-4-20250514".into(),
            object: "model".into(),
            created,
            owned_by: "anthropic".into(),
        },
        Model {
            id: "claude-opus-4-5-20251101".into(),
            object: "model".into(),
            created,
            owned_by: "anthropic".into(),
        },
    ]
}

pub async fn list_models(State(_state): State<AppState>) -> Json<ModelsResponse> {
    Json(ModelsResponse {
        object: "list".to_string(),
        data: get_available_models(),
    })
}

pub async fn get_model(
    State(_state): State<AppState>,
    Path(model_id): Path<String>,
) -> impl IntoResponse {
    let models = get_available_models();

    if let Some(model) = models.into_iter().find(|m| m.id == model_id) {
        return (StatusCode::OK, Json(serde_json::json!(model))).into_response();
    }

    if model_id.contains("anthropic.") || model_id.starts_with("arn:") {
        let model = Model {
            id: model_id.clone(),
            object: "model".to_string(),
            created: current_timestamp(),
            owned_by: "anthropic".to_string(),
        };
        return (StatusCode::OK, Json(serde_json::json!(model))).into_response();
    }

    let error = OpenAIErrorResponse::with_code(
        "invalid_request_error",
        &format!("The model '{model_id}' does not exist"),
        "model_not_found",
    );
    (StatusCode::NOT_FOUND, Json(error)).into_response()
}
