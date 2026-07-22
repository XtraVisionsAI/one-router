//! In-memory context store for the OpenAI Responses API.
//!
//! Backs `previous_response_id` stateful continuation. Each stored entry holds
//! the conversation messages (for continuation) plus the full response JSON
//! (for the `GET /v1/responses/{id}` endpoint), bound to the creating API key's
//! owner hash. Ownership mismatches return `NotFound` (not a 403) so the store
//! never leaks the existence of another key's response.
//!
//! Mirrors the PTC session pattern (`services/ptc/service.rs`): an
//! `Arc<RwLock<HashMap>>` with TTL expiry, a capacity bound (oldest-evicted),
//! and a periodic sweeper driven from `server/app.rs`. In-memory only — entries
//! do not survive a restart and are not shared across instances.

use std::collections::HashMap;
use std::sync::atomic::{AtomicU64, Ordering};
use std::sync::Arc;
use std::time::{SystemTime, UNIX_EPOCH};

use tokio::sync::RwLock;

/// Default time-to-live for a stored response context (1 hour).
pub const DEFAULT_TTL_SECS: u64 = 3600;

/// Default maximum number of stored responses before oldest-eviction kicks in.
pub const DEFAULT_MAX_ENTRIES: usize = 10_000;

/// A single stored turn: the conversation as (role, text) pairs plus the full
/// response JSON.
#[derive(Debug, Clone)]
pub struct StoredResponse {
    pub owner_key_hash: String,
    pub created_at: u64,
    pub expires_at: u64,
    /// Monotonic insertion sequence — used for deterministic oldest-eviction
    /// (wall-clock `created_at` has only second granularity and ties).
    seq: u64,
    /// Conversation messages (role, text) used to reconstruct history on the
    /// next turn. Only text is retained — rich parts (images/tools) are dropped.
    pub messages: Vec<(String, String)>,
    /// The full Responses response object, returned verbatim by `GET`.
    pub response_json: serde_json::Value,
}

#[derive(Debug, thiserror::Error)]
pub enum ResponsesContextError {
    #[error("previous_response_id was not found")]
    NotFound,
}

fn now_secs() -> u64 {
    SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .map(|d| d.as_secs())
        .unwrap_or(0)
}

/// In-memory, ownership-bound store for Responses continuation context.
pub struct ResponsesContextStore {
    inner: Arc<RwLock<HashMap<String, StoredResponse>>>,
    seq: AtomicU64,
    ttl_secs: u64,
    max_entries: usize,
}

impl ResponsesContextStore {
    pub fn new() -> Self {
        Self::with_config(DEFAULT_TTL_SECS, DEFAULT_MAX_ENTRIES)
    }

    pub fn with_config(ttl_secs: u64, max_entries: usize) -> Self {
        Self {
            inner: Arc::new(RwLock::new(HashMap::new())),
            seq: AtomicU64::new(0),
            ttl_secs,
            max_entries,
        }
    }

    /// Store a response's context. Evicts the oldest entry if at capacity.
    pub async fn save(
        &self,
        response_id: &str,
        owner_key_hash: &str,
        messages: Vec<(String, String)>,
        response_json: serde_json::Value,
    ) {
        let now = now_secs();
        let entry = StoredResponse {
            owner_key_hash: owner_key_hash.to_string(),
            created_at: now,
            expires_at: now + self.ttl_secs,
            seq: self.seq.fetch_add(1, Ordering::Relaxed),
            messages,
            response_json,
        };

        let mut map = self.inner.write().await;
        if map.len() >= self.max_entries && !map.contains_key(response_id) {
            // Evict the oldest entry (lowest insertion sequence) to make room.
            if let Some(oldest) = map
                .iter()
                .min_by_key(|(_, v)| v.seq)
                .map(|(k, _)| k.clone())
            {
                map.remove(&oldest);
            }
        }
        map.insert(response_id.to_string(), entry);
    }

    /// Load the stored conversation messages for `response_id`, validating owner.
    /// Returns `NotFound` if absent, expired, or owned by a different key.
    pub async fn load(
        &self,
        response_id: &str,
        owner_key_hash: &str,
    ) -> Result<Vec<(String, String)>, ResponsesContextError> {
        let map = self.inner.read().await;
        match map.get(response_id) {
            Some(entry)
                if entry.owner_key_hash == owner_key_hash && entry.expires_at > now_secs() =>
            {
                Ok(entry.messages.clone())
            }
            _ => Err(ResponsesContextError::NotFound),
        }
    }

    /// Fetch the full stored response JSON (owner-validated). Used by `GET`.
    pub async fn get_response_json(
        &self,
        response_id: &str,
        owner_key_hash: &str,
    ) -> Result<serde_json::Value, ResponsesContextError> {
        let map = self.inner.read().await;
        match map.get(response_id) {
            Some(entry)
                if entry.owner_key_hash == owner_key_hash && entry.expires_at > now_secs() =>
            {
                Ok(entry.response_json.clone())
            }
            _ => Err(ResponsesContextError::NotFound),
        }
    }

    /// Delete a stored response (owner-validated). Returns `NotFound` if it did
    /// not exist or belonged to another key.
    pub async fn delete(
        &self,
        response_id: &str,
        owner_key_hash: &str,
    ) -> Result<(), ResponsesContextError> {
        let mut map = self.inner.write().await;
        match map.get(response_id) {
            Some(entry) if entry.owner_key_hash == owner_key_hash => {
                map.remove(response_id);
                Ok(())
            }
            _ => Err(ResponsesContextError::NotFound),
        }
    }

    /// Remove all expired entries. Returns the number removed.
    pub async fn sweep_expired(&self) -> usize {
        let now = now_secs();
        let mut map = self.inner.write().await;
        let before = map.len();
        map.retain(|_, v| v.expires_at > now);
        before - map.len()
    }

    #[cfg(test)]
    async fn len(&self) -> usize {
        self.inner.read().await.len()
    }
}

impl Default for ResponsesContextStore {
    fn default() -> Self {
        Self::new()
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    fn msgs() -> Vec<(String, String)> {
        vec![
            ("user".to_string(), "q".to_string()),
            ("assistant".to_string(), "a".to_string()),
        ]
    }

    #[tokio::test]
    async fn test_save_and_load_same_owner() {
        let store = ResponsesContextStore::new();
        store
            .save(
                "resp_1",
                "owner_a",
                msgs(),
                serde_json::json!({"id": "resp_1"}),
            )
            .await;
        let loaded = store.load("resp_1", "owner_a").await.unwrap();
        assert_eq!(loaded.len(), 2);
    }

    #[tokio::test]
    async fn test_load_wrong_owner_is_not_found() {
        let store = ResponsesContextStore::new();
        store
            .save("resp_1", "owner_a", msgs(), serde_json::json!({}))
            .await;
        assert!(matches!(
            store.load("resp_1", "owner_b").await,
            Err(ResponsesContextError::NotFound)
        ));
    }

    #[tokio::test]
    async fn test_expired_entry_not_loadable_and_swept() {
        let store = ResponsesContextStore::with_config(0, 100); // ttl 0 → immediately expired
        store
            .save("resp_1", "owner_a", msgs(), serde_json::json!({}))
            .await;
        assert!(matches!(
            store.load("resp_1", "owner_a").await,
            Err(ResponsesContextError::NotFound)
        ));
        let removed = store.sweep_expired().await;
        assert_eq!(removed, 1);
        assert_eq!(store.len().await, 0);
    }

    #[tokio::test]
    async fn test_delete_owner_validated() {
        let store = ResponsesContextStore::new();
        store
            .save("resp_1", "owner_a", msgs(), serde_json::json!({}))
            .await;
        assert!(store.delete("resp_1", "owner_b").await.is_err());
        assert!(store.delete("resp_1", "owner_a").await.is_ok());
        assert_eq!(store.len().await, 0);
    }

    #[tokio::test]
    async fn test_capacity_evicts_oldest() {
        let store = ResponsesContextStore::with_config(3600, 2);
        store.save("r1", "o", msgs(), serde_json::json!({})).await;
        store.save("r2", "o", msgs(), serde_json::json!({})).await;
        store.save("r3", "o", msgs(), serde_json::json!({})).await;
        assert_eq!(store.len().await, 2);
        // r1 (oldest) evicted
        assert!(store.load("r1", "o").await.is_err());
        assert!(store.load("r3", "o").await.is_ok());
    }

    #[tokio::test]
    async fn test_get_response_json() {
        let store = ResponsesContextStore::new();
        store
            .save(
                "resp_1",
                "o",
                msgs(),
                serde_json::json!({"id": "resp_1", "object": "response"}),
            )
            .await;
        let json = store.get_response_json("resp_1", "o").await.unwrap();
        assert_eq!(json["object"], "response");
    }
}
