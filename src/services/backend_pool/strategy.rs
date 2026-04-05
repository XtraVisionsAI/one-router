//! Load balancing strategies
//!
//! This module provides different load balancing strategies for distributing
//! requests across multiple credentials.

use serde::{Deserialize, Serialize};
use std::sync::atomic::{AtomicUsize, Ordering};

// ============================================================================
// Load Balance Strategy
// ============================================================================

/// Load balancing strategy for credential selection
#[derive(Debug, Clone, Copy, PartialEq, Eq, Default, Deserialize, Serialize)]
#[serde(rename_all = "snake_case")]
pub enum LoadBalanceStrategy {
    /// Round-robin selection (default)
    #[default]
    RoundRobin,
    /// Weighted selection based on credential weights
    Weighted,
    /// Random selection
    Random,
    /// Failover: use first available, switch on failure
    Failover,
}

impl LoadBalanceStrategy {
    /// Parse from string (case-insensitive)
    pub fn parse_str(s: &str) -> Self {
        match s.to_lowercase().as_str() {
            "round_robin" | "roundrobin" => Self::RoundRobin,
            "weighted" => Self::Weighted,
            "random" => Self::Random,
            "failover" => Self::Failover,
            _ => Self::RoundRobin,
        }
    }
}

impl std::fmt::Display for LoadBalanceStrategy {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            Self::RoundRobin => write!(f, "round_robin"),
            Self::Weighted => write!(f, "weighted"),
            Self::Random => write!(f, "random"),
            Self::Failover => write!(f, "failover"),
        }
    }
}

// ============================================================================
// Strategy State
// ============================================================================

/// State for round-robin selection
#[derive(Debug, Default)]
pub struct RoundRobinState {
    counter: AtomicUsize,
}

impl RoundRobinState {
    pub fn new() -> Self {
        Self {
            counter: AtomicUsize::new(0),
        }
    }

    /// Get next index for a given total count
    pub fn next(&self, total: usize) -> usize {
        if total == 0 {
            return 0;
        }
        self.counter.fetch_add(1, Ordering::SeqCst) % total
    }

    /// Reset the counter
    #[allow(dead_code)]
    pub fn reset(&self) {
        self.counter.store(0, Ordering::SeqCst);
    }
}

// ============================================================================
// Tests
// ============================================================================

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_strategy_from_str() {
        assert_eq!(
            LoadBalanceStrategy::parse_str("round_robin"),
            LoadBalanceStrategy::RoundRobin
        );
        assert_eq!(
            LoadBalanceStrategy::parse_str("weighted"),
            LoadBalanceStrategy::Weighted
        );
        assert_eq!(
            LoadBalanceStrategy::parse_str("RANDOM"),
            LoadBalanceStrategy::Random
        );
        assert_eq!(
            LoadBalanceStrategy::parse_str("failover"),
            LoadBalanceStrategy::Failover
        );
        assert_eq!(
            LoadBalanceStrategy::parse_str("unknown"),
            LoadBalanceStrategy::RoundRobin
        );
    }

    #[test]
    fn test_round_robin_state() {
        let state = RoundRobinState::new();
        assert_eq!(state.next(3), 0);
        assert_eq!(state.next(3), 1);
        assert_eq!(state.next(3), 2);
        assert_eq!(state.next(3), 0);
    }
}
