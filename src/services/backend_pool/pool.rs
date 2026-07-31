//! Credential Pool Implementation
//!
//! This module provides the generic `CredentialPool` that manages multiple
//! credentials with load balancing and health checking.

use super::credential::Credential;
use super::strategy::{LoadBalanceStrategy, RoundRobinState};
use rand::prelude::*;

// ============================================================================
// Pool Configuration
// ============================================================================

/// Configuration for credential pool behavior
#[derive(Debug, Clone)]
pub struct PoolConfig {
    /// Load balancing strategy
    pub strategy: LoadBalanceStrategy,
    /// Maximum failures before disabling a credential
    pub max_failures: u32,
    /// Seconds to wait before retrying a disabled credential
    pub retry_after_secs: u64,
}

impl Default for PoolConfig {
    fn default() -> Self {
        Self {
            strategy: LoadBalanceStrategy::RoundRobin,
            max_failures: 3,
            retry_after_secs: 300, // 5 minutes
        }
    }
}

impl From<&super::config::PoolSettings> for PoolConfig {
    fn from(s: &super::config::PoolSettings) -> Self {
        Self {
            strategy: s.strategy,
            max_failures: s.max_failures,
            retry_after_secs: s.retry_after_secs,
        }
    }
}

impl PoolConfig {
    pub fn new(strategy: LoadBalanceStrategy) -> Self {
        Self {
            strategy,
            ..Default::default()
        }
    }

    pub fn with_max_failures(mut self, max: u32) -> Self {
        self.max_failures = max;
        self
    }

    pub fn with_retry_after(mut self, secs: u64) -> Self {
        self.retry_after_secs = secs;
        self
    }
}

// ============================================================================
// Credential Pool
// ============================================================================

/// A pool of credentials with load balancing support
///
/// This is the main type for managing multiple backend credentials.
/// It supports different load balancing strategies and automatic
/// health-based credential management.
#[derive(Debug)]
pub struct CredentialPool<C: Credential> {
    /// The credentials in the pool
    credentials: Vec<C>,
    /// Pool configuration
    config: PoolConfig,
    /// State for round-robin selection
    rr_state: RoundRobinState,
}

impl<C: Credential> CredentialPool<C> {
    /// Create a new credential pool
    pub fn new(credentials: Vec<C>, config: PoolConfig) -> Self {
        Self {
            credentials,
            config,
            rr_state: RoundRobinState::new(),
        }
    }

    /// Create a pool with a single credential (backward compatibility)
    pub fn single(credential: C) -> Self {
        Self::new(vec![credential], PoolConfig::default())
    }

    /// Create a pool with round-robin strategy
    pub fn round_robin(credentials: Vec<C>) -> Self {
        Self::new(
            credentials,
            PoolConfig::new(LoadBalanceStrategy::RoundRobin),
        )
    }

    /// Create a pool with weighted strategy
    pub fn weighted(credentials: Vec<C>) -> Self {
        Self::new(credentials, PoolConfig::new(LoadBalanceStrategy::Weighted))
    }

    /// Create a pool with failover strategy
    pub fn failover(credentials: Vec<C>) -> Self {
        Self::new(credentials, PoolConfig::new(LoadBalanceStrategy::Failover))
    }

    /// Get the next available credential based on the load balancing strategy
    pub fn get_next(&self) -> Option<&C> {
        let all: Vec<usize> = (0..self.credentials.len()).collect();
        self.select_among(&all)
    }

    /// Get the next credential eligible for `target_model_id` (per-backend
    /// model filter).
    ///
    /// Two-step selection: eligibility (`serves_model`), then the top
    /// `model_match_rank` group (exact > priority > specificity), load
    /// balanced within that group by the pool strategy. There is **no cascade**
    /// to lower-ranked groups — if the whole top group is unhealthy the usual
    /// in-group recovery fallback applies, and model-level fallback is the job
    /// of `failover_chains`.
    ///
    /// Returns `None` when no credential is eligible at all (the caller should
    /// surface a "no backend serves this model" error).
    pub fn get_next_for_model(&self, target_model_id: &str) -> Option<&C> {
        let top = self.top_group_for_model(target_model_id);
        self.select_among(&top)
    }

    /// Indices of the top-ranked eligible group for a model (empty when no
    /// credential is eligible).
    fn top_group_for_model(&self, target_model_id: &str) -> Vec<usize> {
        let ranked: Vec<(usize, super::model_filter::MatchRank)> = self
            .credentials
            .iter()
            .enumerate()
            .filter(|(_, c)| c.serves_model(target_model_id))
            .map(|(i, c)| (i, c.model_match_rank(target_model_id)))
            .collect();
        let Some(best) = ranked.iter().map(|(_, r)| *r).max() else {
            return Vec::new();
        };
        ranked
            .into_iter()
            .filter(|(_, r)| *r == best)
            .map(|(i, _)| i)
            .collect()
    }

    /// Select a credential among the given candidate indices using the pool
    /// strategy, considering only healthy candidates. When none are healthy,
    /// falls back to recovering a disabled candidate (or the first candidate),
    /// never leaving the candidate set.
    fn select_among(&self, candidates: &[usize]) -> Option<&C> {
        if candidates.is_empty() {
            return None;
        }

        // Get list of healthy credentials
        let healthy_indices: Vec<usize> = candidates
            .iter()
            .copied()
            .filter(|&i| self.is_credential_available(&self.credentials[i]))
            .collect();

        if healthy_indices.is_empty() {
            // Try to recover a disabled credential
            return self.try_recover_among(candidates);
        }

        let idx = match self.config.strategy {
            LoadBalanceStrategy::RoundRobin => {
                let pos = self.rr_state.next(healthy_indices.len());
                healthy_indices[pos]
            }
            LoadBalanceStrategy::Weighted => {
                // For weighted, we need to consider only healthy credentials
                let healthy_weights: Vec<u32> = healthy_indices
                    .iter()
                    .map(|&i| self.credentials[i].weight())
                    .collect();
                let total_weight: u32 = healthy_weights.iter().sum();
                if total_weight == 0 {
                    healthy_indices[0]
                } else {
                    let mut rng = thread_rng();
                    let random_weight = rng.gen_range(0..total_weight);
                    let mut cumulative = 0;
                    let mut selected = 0;
                    for (i, &weight) in healthy_weights.iter().enumerate() {
                        cumulative += weight;
                        if random_weight < cumulative {
                            selected = i;
                            break;
                        }
                    }
                    healthy_indices[selected]
                }
            }
            LoadBalanceStrategy::Random => {
                let mut rng = thread_rng();
                let pos = rng.gen_range(0..healthy_indices.len());
                healthy_indices[pos]
            }
            LoadBalanceStrategy::Failover => {
                // Always use the first available (lowest index = highest priority)
                healthy_indices[0]
            }
        };

        Some(&self.credentials[idx])
    }

    /// Get a credential by name
    pub fn get_by_name(&self, name: &str) -> Option<&C> {
        self.credentials.iter().find(|c| c.name() == name)
    }

    /// Get all credentials
    pub fn all(&self) -> &[C] {
        &self.credentials
    }

    /// Get the number of credentials
    pub fn len(&self) -> usize {
        self.credentials.len()
    }

    /// Get the load balancing strategy
    pub fn strategy(&self) -> LoadBalanceStrategy {
        self.config.strategy
    }

    /// Check if the pool is empty
    pub fn is_empty(&self) -> bool {
        self.credentials.is_empty()
    }

    /// Get the number of healthy credentials
    pub fn healthy_count(&self) -> usize {
        self.credentials
            .iter()
            .filter(|c| self.is_credential_available(c))
            .count()
    }

    /// Get the number of disabled credentials
    pub fn disabled_count(&self) -> usize {
        self.credentials.iter().filter(|c| !c.is_enabled()).count()
    }

    /// Record a successful request for a credential
    pub fn record_success(&self, name: &str) {
        if let Some(cred) = self.credentials.iter().find(|c| c.name() == name) {
            cred.record_success();
        }
    }

    /// Record a failed request for a credential
    /// Returns true if the credential was disabled due to max failures
    pub fn record_failure(&self, name: &str) -> bool {
        if let Some(cred) = self.credentials.iter().find(|c| c.name() == name) {
            cred.record_failure();
            if cred.failure_count() >= self.config.max_failures {
                cred.disable();
                tracing::warn!(
                    credential = name,
                    failures = cred.failure_count(),
                    "Credential disabled due to max failures"
                );
                return true;
            }
        }
        false
    }

    /// Record a rate-limit (HTTP 429) for a credential.
    ///
    /// Unlike [`record_failure`](Self::record_failure), a 429 disables the
    /// credential *immediately* rather than after `max_failures` consecutive
    /// failures. A rate-limited credential is unusable right now regardless of
    /// how many prior failures it had, so eager cooldown lets failover switch to
    /// a healthy pool without burning `max_failures - 1` more doomed requests.
    /// The credential re-enters rotation after `retry_after_secs` via
    /// [`try_recover_credential`](Self::try_recover_credential), or immediately
    /// on the next `record_success`.
    ///
    /// Always returns `true` (the credential is now disabled).
    pub fn record_rate_limited(&self, name: &str) -> bool {
        if let Some(cred) = self.credentials.iter().find(|c| c.name() == name) {
            cred.record_failure();
            cred.disable();
            tracing::warn!(
                credential = name,
                "Credential disabled due to rate limit (429), cooling down"
            );
            return true;
        }
        false
    }

    /// Manually disable a credential
    pub fn disable(&self, name: &str) {
        if let Some(cred) = self.credentials.iter().find(|c| c.name() == name) {
            cred.disable();
        }
    }

    /// Manually enable a credential
    pub fn enable(&self, name: &str) {
        if let Some(cred) = self.credentials.iter().find(|c| c.name() == name) {
            cred.enable();
            cred.reset_health();
        }
    }

    /// Get pool statistics
    pub fn stats(&self) -> PoolStats {
        PoolStats {
            total: self.credentials.len(),
            healthy: self.healthy_count(),
            disabled: self.disabled_count(),
            strategy: self.config.strategy,
        }
    }

    /// Pool statistics restricted to the top-ranked group eligible for
    /// `target_model_id`. `total == 0` means no credential serves the model —
    /// `is_healthy()` is then false, which is what triggers model-level
    /// failover chains for that model without affecting other models.
    pub fn stats_for_model(&self, target_model_id: &str) -> PoolStats {
        let top = self.top_group_for_model(target_model_id);
        PoolStats {
            total: top.len(),
            healthy: top
                .iter()
                .filter(|&&i| self.is_credential_available(&self.credentials[i]))
                .count(),
            disabled: top
                .iter()
                .filter(|&&i| !self.credentials[i].is_enabled())
                .count(),
            strategy: self.config.strategy,
        }
    }

    /// Check if a credential is available (enabled and not at max failures)
    fn is_credential_available(&self, cred: &C) -> bool {
        if !cred.is_enabled() {
            // Disabled credentials are not available
            // They can only be re-enabled via try_recover_credential or manual enable()
            return false;
        }
        cred.failure_count() < self.config.max_failures
    }

    /// Try to recover a disabled credential among the given candidate indices.
    fn try_recover_among(&self, candidates: &[usize]) -> Option<&C> {
        // Find a disabled credential that's ready for retry
        for &i in candidates {
            let cred = &self.credentials[i];
            if !cred.is_enabled() && cred.health().should_retry(self.config.retry_after_secs) {
                tracing::info!(
                    credential = cred.name(),
                    "Attempting to recover disabled credential"
                );
                cred.enable();
                cred.reset_health();
                return Some(cred);
            }
        }
        // Last resort: return the first candidate even if it's unhealthy
        candidates.first().map(|&i| &self.credentials[i])
    }
}

// ============================================================================
// Pool Statistics
// ============================================================================

/// Statistics about a credential pool
#[derive(Debug, Clone)]
pub struct PoolStats {
    /// Total number of credentials
    pub total: usize,
    /// Number of healthy credentials
    pub healthy: usize,
    /// Number of disabled credentials
    pub disabled: usize,
    /// Current load balancing strategy
    pub strategy: LoadBalanceStrategy,
}

impl PoolStats {
    /// Check if the pool is healthy (at least one credential available)
    pub fn is_healthy(&self) -> bool {
        self.healthy > 0
    }
}

// ============================================================================
// Tests
// ============================================================================

#[cfg(test)]
mod tests {
    use super::super::credential::{ApiKeyCredential, AwsCredential};
    use super::*;

    fn create_test_credentials() -> Vec<ApiKeyCredential> {
        vec![
            ApiKeyCredential::new("key1", "primary", 2),
            ApiKeyCredential::new("key2", "secondary", 1),
            ApiKeyCredential::new("key3", "backup", 1),
        ]
    }

    /// AwsCredential with a model filter, for model-affinity tests.
    fn aws_cred(name: &str, models: &[&str], priority: i32) -> AwsCredential {
        let models: Vec<String> = models.iter().map(|s| s.to_string()).collect();
        AwsCredential::default_credential("us-east-1", name)
            .with_model_filter(Some(&models), priority)
    }

    /// The target topology from the design doc: ap serves everything except
    /// GPT, us-east-1 serves only GPT-5.x.
    fn affinity_pool() -> CredentialPool<AwsCredential> {
        CredentialPool::new(
            vec![
                aws_cred("ap-northeast-1", &["*", "!openai.*"], 0),
                aws_cred("us-east-1", &["openai.gpt-5*"], 0),
            ],
            PoolConfig::new(LoadBalanceStrategy::RoundRobin),
        )
    }

    #[test]
    fn test_get_next_for_model_routes_by_filter() {
        let pool = affinity_pool();
        // Claude traffic only ever hits ap (us has no positive match).
        for _ in 0..4 {
            let cred = pool
                .get_next_for_model("global.anthropic.claude-sonnet-5")
                .unwrap();
            assert_eq!(cred.name(), "ap-northeast-1");
        }
        // GPT traffic only ever hits us-east-1 (ap excludes openai.*).
        for _ in 0..4 {
            let cred = pool.get_next_for_model("openai.gpt-5.6-sol").unwrap();
            assert_eq!(cred.name(), "us-east-1");
        }
    }

    #[test]
    fn test_get_next_for_model_none_when_no_eligible() {
        // us backend deleted: GPT is excluded by ap and matched by nobody.
        let pool = CredentialPool::new(
            vec![aws_cred("ap-northeast-1", &["*", "!openai.*"], 0)],
            PoolConfig::default(),
        );
        assert!(pool.get_next_for_model("openai.gpt-5.6-sol").is_none());
        assert!(pool
            .get_next_for_model("global.anthropic.claude-sonnet-5")
            .is_some());
    }

    #[test]
    fn test_get_next_for_model_unhealthy_top_group_does_not_cascade() {
        let pool = affinity_pool();
        pool.disable("us-east-1");
        // The dedicated group is down — traffic must NOT leak to the `*` group
        // (hard shadow); the in-group recovery fallback returns the unhealthy
        // dedicated credential instead.
        let cred = pool.get_next_for_model("openai.gpt-5.6-sol").unwrap();
        assert_eq!(cred.name(), "us-east-1");
    }

    #[test]
    fn test_get_next_for_model_exact_beats_wildcard() {
        let pool = CredentialPool::new(
            vec![
                aws_cred("wild", &["openai.gpt-5*"], 5),
                aws_cred("exact", &["openai.gpt-5.6-sol"], 0),
            ],
            PoolConfig::new(LoadBalanceStrategy::RoundRobin),
        );
        // Exact match wins even against a higher-priority wildcard.
        for _ in 0..4 {
            let cred = pool.get_next_for_model("openai.gpt-5.6-sol").unwrap();
            assert_eq!(cred.name(), "exact");
        }
        // A sibling model only matches the wildcard.
        let cred = pool.get_next_for_model("openai.gpt-5.4").unwrap();
        assert_eq!(cred.name(), "wild");
    }

    #[test]
    fn test_get_next_for_model_priority_breaks_wildcard_tie() {
        let pool = CredentialPool::new(
            vec![
                aws_cred("low", &["openai.*"], 0),
                aws_cred("high", &["openai.*"], 10),
            ],
            PoolConfig::new(LoadBalanceStrategy::RoundRobin),
        );
        for _ in 0..4 {
            let cred = pool.get_next_for_model("openai.gpt-5.6-sol").unwrap();
            assert_eq!(cred.name(), "high");
        }
    }

    #[test]
    fn test_get_next_for_model_same_rank_load_balances() {
        // Two backends with the same-specificity pattern share the traffic.
        let pool = CredentialPool::new(
            vec![
                aws_cred("a", &["global.*"], 0),
                aws_cred("b", &["global.*"], 0),
            ],
            PoolConfig::new(LoadBalanceStrategy::RoundRobin),
        );
        let names: std::collections::HashSet<&str> = (0..6)
            .map(|_| {
                pool.get_next_for_model("global.anthropic.claude-sonnet-5")
                    .unwrap()
                    .name()
            })
            .collect();
        assert!(names.contains("a") && names.contains("b"));
    }

    #[test]
    fn test_stats_for_model() {
        let pool = affinity_pool();

        let gpt = pool.stats_for_model("openai.gpt-5.6-sol");
        assert_eq!(gpt.total, 1);
        assert_eq!(gpt.healthy, 1);
        assert!(gpt.is_healthy());

        // Disabling the dedicated credential makes GPT unhealthy without
        // affecting Claude — the failover-chain trigger is model-scoped.
        pool.disable("us-east-1");
        let gpt = pool.stats_for_model("openai.gpt-5.6-sol");
        assert_eq!(gpt.total, 1);
        assert_eq!(gpt.healthy, 0);
        assert!(!gpt.is_healthy());
        let claude = pool.stats_for_model("global.anthropic.claude-sonnet-5");
        assert_eq!(claude.total, 1);
        assert!(claude.is_healthy());

        // A model nobody serves: total 0 → unhealthy.
        let pool2 = CredentialPool::new(
            vec![aws_cred("ap", &["*", "!openai.*"], 0)],
            PoolConfig::default(),
        );
        let stats = pool2.stats_for_model("openai.gpt-5.6-sol");
        assert_eq!(stats.total, 0);
        assert!(!stats.is_healthy());
    }

    #[test]
    fn test_single_credential_pool() {
        let cred = ApiKeyCredential::new("single-key", "default", 1);
        let pool = CredentialPool::single(cred);

        assert_eq!(pool.len(), 1);
        assert!(!pool.is_empty());

        let selected = pool.get_next().unwrap();
        assert_eq!(selected.name(), "default");
    }

    #[test]
    fn test_round_robin_selection() {
        let pool = CredentialPool::round_robin(create_test_credentials());

        // Should cycle through all credentials
        let names: Vec<&str> = (0..6).map(|_| pool.get_next().unwrap().name()).collect();

        // Should see each credential at least once
        assert!(names.contains(&"primary"));
        assert!(names.contains(&"secondary"));
        assert!(names.contains(&"backup"));
    }

    #[test]
    fn test_failover_selection() {
        let pool = CredentialPool::failover(create_test_credentials());

        // Should always return the first credential
        for _ in 0..5 {
            let selected = pool.get_next().unwrap();
            assert_eq!(selected.name(), "primary");
        }

        // Disable the first credential
        pool.disable("primary");

        // Should now return the second credential
        let selected = pool.get_next().unwrap();
        assert_eq!(selected.name(), "secondary");
    }

    #[test]
    fn test_record_failure_and_disable() {
        let pool = CredentialPool::new(
            create_test_credentials(),
            PoolConfig::new(LoadBalanceStrategy::Failover).with_max_failures(2),
        );

        // First failure
        assert!(!pool.record_failure("primary"));
        assert_eq!(pool.get_by_name("primary").unwrap().failure_count(), 1);

        // Second failure - should disable
        assert!(pool.record_failure("primary"));
        assert!(!pool.get_by_name("primary").unwrap().is_enabled());

        // Pool should now use secondary
        let selected = pool.get_next().unwrap();
        assert_eq!(selected.name(), "secondary");
    }

    #[test]
    fn test_record_rate_limited_disables_immediately() {
        // max_failures=5, but a single 429 should disable the credential right away.
        let pool = CredentialPool::new(
            create_test_credentials(),
            PoolConfig::new(LoadBalanceStrategy::Failover).with_max_failures(5),
        );

        assert!(pool.record_rate_limited("primary"));
        assert!(!pool.get_by_name("primary").unwrap().is_enabled());

        // Failover to secondary.
        let selected = pool.get_next().unwrap();
        assert_eq!(selected.name(), "secondary");

        // A later success re-enables and clears the cooldown.
        pool.record_success("primary");
        assert!(pool.get_by_name("primary").unwrap().is_enabled());
        assert_eq!(pool.get_by_name("primary").unwrap().failure_count(), 0);
    }

    #[test]
    fn test_record_success_resets_failures() {
        let pool = CredentialPool::round_robin(create_test_credentials());

        pool.record_failure("primary");
        pool.record_failure("primary");
        assert_eq!(pool.get_by_name("primary").unwrap().failure_count(), 2);

        pool.record_success("primary");
        assert_eq!(pool.get_by_name("primary").unwrap().failure_count(), 0);
    }

    #[test]
    fn test_pool_stats() {
        let pool = CredentialPool::round_robin(create_test_credentials());
        let stats = pool.stats();

        assert_eq!(stats.total, 3);
        assert_eq!(stats.healthy, 3);
        assert_eq!(stats.disabled, 0);
        assert!(stats.is_healthy());

        pool.disable("primary");
        let stats = pool.stats();
        assert_eq!(stats.disabled, 1);
        assert_eq!(stats.healthy, 2);
    }

    #[test]
    fn test_get_by_name() {
        let pool = CredentialPool::round_robin(create_test_credentials());

        let cred = pool.get_by_name("secondary").unwrap();
        assert_eq!(cred.api_key(), "key2");

        assert!(pool.get_by_name("nonexistent").is_none());
    }
}
