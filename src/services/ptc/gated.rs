//! Per-request gate for one-shot code execution (web-tool Dynamic Filtering,
//! `web_search_20260209` / `web_fetch_20260209`).
//!
//! The shared `OneshotExecutor` runs model-written code in a Docker sandbox
//! exactly like PTC, so it is subject to the same policy:
//! - only when the resolved model's effective `ptc` capability is enabled
//!   (otherwise no code executor → the web tools return plain results);
//! - every run holds a slot under the same global / per-key / per-user caps
//!   as PTC sessions ([`PtcService::reserve_oneshot`]);
//! - at most [`MAX_CODE_EXECUTIONS_PER_RESPONSE`] runs per response.

use std::sync::atomic::{AtomicU32, Ordering};
use std::sync::Arc;

use super::exceptions::{PtcError, PtcResult};
use super::sandbox::{CodeExecutor, ExecutionResult};
use super::service::PtcService;
use crate::middleware::auth::ApiKeyInfo;

/// Cap on one-shot code executions within one web-tool response.
pub const MAX_CODE_EXECUTIONS_PER_RESPONSE: u32 = 8;

/// Source of slot reservations (the PTC service; a fake in tests). The
/// returned guard releases the slot when dropped.
#[async_trait::async_trait]
pub trait OneshotSlots: Send + Sync {
    async fn reserve(
        &self,
        owner_key_hash: &str,
        owner_user_id: Option<&str>,
    ) -> PtcResult<Box<dyn Send + Sync>>;
}

#[async_trait::async_trait]
impl OneshotSlots for PtcService {
    async fn reserve(
        &self,
        owner_key_hash: &str,
        owner_user_id: Option<&str>,
    ) -> PtcResult<Box<dyn Send + Sync>> {
        let slot = self.reserve_oneshot(owner_key_hash, owner_user_id).await?;
        Ok(Box::new(slot))
    }
}

/// A [`CodeExecutor`] bound to one request: counts runs and holds a PTC slot
/// for each.
pub struct GatedCodeExecutor {
    inner: Arc<dyn CodeExecutor>,
    slots: Arc<dyn OneshotSlots>,
    owner_key_hash: String,
    owner_user_id: Option<String>,
    remaining: AtomicU32,
}

impl GatedCodeExecutor {
    pub fn new(
        inner: Arc<dyn CodeExecutor>,
        slots: Arc<dyn OneshotSlots>,
        owner_key_hash: String,
        owner_user_id: Option<String>,
        max_runs: u32,
    ) -> Self {
        Self {
            inner,
            slots,
            owner_key_hash,
            owner_user_id,
            remaining: AtomicU32::new(max_runs),
        }
    }
}

#[async_trait::async_trait]
impl CodeExecutor for GatedCodeExecutor {
    async fn execute(&self, code: &str, language: &str) -> Result<ExecutionResult, PtcError> {
        if self
            .remaining
            .try_update(Ordering::SeqCst, Ordering::SeqCst, |n| n.checked_sub(1))
            .is_err()
        {
            return Err(PtcError::SessionLimitExceeded(
                "code execution limit for this response reached".to_string(),
            ));
        }
        let _slot = self
            .slots
            .reserve(&self.owner_key_hash, self.owner_user_id.as_deref())
            .await?;
        self.inner.execute(code, language).await
    }
}

/// The PTC owner identity of a caller (`__master__` for the master key, else
/// the key hash) — the same value PTC sessions are bound to.
pub fn owner_key_hash(key_info: &ApiKeyInfo) -> String {
    if key_info.is_master {
        "__master__".to_string()
    } else {
        key_info.raw_api_key.clone()
    }
}

/// The code executor a web-tool request may use: `None` unless the model's
/// effective `ptc` capability is on and a sandbox (with slot accounting) is
/// configured; otherwise the base executor wrapped in a per-request gate.
pub fn for_request(
    base: Option<Arc<dyn CodeExecutor>>,
    ptc: Option<&Arc<PtcService>>,
    key_info: &ApiKeyInfo,
    ptc_enabled: bool,
) -> Option<Arc<dyn CodeExecutor>> {
    let slots: Arc<dyn OneshotSlots> = Arc::clone(ptc?) as Arc<dyn OneshotSlots>;
    gate(base, Some(slots), key_info, ptc_enabled)
}

fn gate(
    base: Option<Arc<dyn CodeExecutor>>,
    slots: Option<Arc<dyn OneshotSlots>>,
    key_info: &ApiKeyInfo,
    ptc_enabled: bool,
) -> Option<Arc<dyn CodeExecutor>> {
    if !ptc_enabled {
        return None;
    }
    let (base, slots) = (base?, slots?);
    Some(Arc::new(GatedCodeExecutor::new(
        base,
        slots,
        owner_key_hash(key_info),
        key_info.user.as_ref().map(|u| u.user_id.clone()),
        MAX_CODE_EXECUTIONS_PER_RESPONSE,
    )))
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::sync::atomic::AtomicUsize;

    struct Echo(AtomicUsize);

    #[async_trait::async_trait]
    impl CodeExecutor for Echo {
        async fn execute(&self, code: &str, _l: &str) -> Result<ExecutionResult, PtcError> {
            self.0.fetch_add(1, Ordering::SeqCst);
            Ok(ExecutionResult {
                stdout: code.to_string(),
                stderr: String::new(),
                exit_code: 0,
                timed_out: false,
            })
        }
    }

    /// Fake slot pool with a fixed capacity; records the user it saw.
    struct Pool {
        cap: usize,
        used: Arc<AtomicUsize>,
        users: std::sync::Mutex<Vec<Option<String>>>,
    }

    struct Slot(Arc<AtomicUsize>);
    impl Drop for Slot {
        fn drop(&mut self) {
            self.0.fetch_sub(1, Ordering::SeqCst);
        }
    }

    #[async_trait::async_trait]
    impl OneshotSlots for Pool {
        async fn reserve(&self, _k: &str, user: Option<&str>) -> PtcResult<Box<dyn Send + Sync>> {
            self.users.lock().unwrap().push(user.map(String::from));
            if self.used.fetch_add(1, Ordering::SeqCst) >= self.cap {
                self.used.fetch_sub(1, Ordering::SeqCst);
                return Err(PtcError::SessionLimitExceeded("full".into()));
            }
            Ok(Box::new(Slot(Arc::clone(&self.used))))
        }
    }

    fn pool(cap: usize) -> Arc<Pool> {
        Arc::new(Pool {
            cap,
            used: Arc::new(AtomicUsize::new(0)),
            users: Default::default(),
        })
    }

    #[test]
    fn disabled_capability_or_missing_sandbox_means_no_executor() {
        let base: Arc<dyn CodeExecutor> = Arc::new(Echo(AtomicUsize::new(0)));
        let key = ApiKeyInfo::master("sk-x");
        assert!(gate(Some(base.clone()), Some(pool(1)), &key, false).is_none());
        assert!(gate(None, Some(pool(1)), &key, true).is_none());
        assert!(gate(Some(base.clone()), None, &key, true).is_none());
        assert!(for_request(Some(base.clone()), None, &key, true).is_none());
        assert!(gate(Some(base), Some(pool(1)), &key, true).is_some());
    }

    #[tokio::test]
    async fn runs_are_capped_per_response_and_hold_a_slot() {
        let echo = Arc::new(Echo(AtomicUsize::new(0)));
        let p = pool(1);
        let g = GatedCodeExecutor::new(echo.clone(), p.clone(), "k".into(), Some("u1".into()), 2);
        assert_eq!(g.execute("a", "python").await.unwrap().stdout, "a");
        assert_eq!(
            p.used.load(Ordering::SeqCst),
            0,
            "slot released after the run"
        );
        g.execute("b", "python").await.unwrap();
        assert!(matches!(
            g.execute("c", "python").await,
            Err(PtcError::SessionLimitExceeded(_))
        ));
        assert_eq!(echo.0.load(Ordering::SeqCst), 2);
        assert_eq!(p.users.lock().unwrap()[0].as_deref(), Some("u1"));
    }

    #[tokio::test]
    async fn full_pool_refuses_without_running_code() {
        let echo = Arc::new(Echo(AtomicUsize::new(0)));
        let p = pool(0);
        let g = GatedCodeExecutor::new(echo.clone(), p, "k".into(), None, 8);
        assert!(g.execute("x", "python").await.is_err());
        assert_eq!(echo.0.load(Ordering::SeqCst), 0);
    }
}
