//! Backend-independent helpers for budget-period rollover and refunds.

use std::collections::HashMap;

/// Attempts at the compare-and-set period reset / DynamoDB refund before the
/// fallback (reset: month-only condition; refund: give up with an error).
pub const CAS_ATTEMPTS: usize = 5;

/// Whether a row's stored period key is still `prev` (`NULL` ≡ `""`), i.e. a
/// rollover from `prev` has not happened yet. A reset is applied only then:
/// requests carrying a cached (stale) period must not reset the counter again
/// after another request already rolled it.
pub fn period_is(stored: Option<&str>, prev: &str) -> bool {
    stored.unwrap_or("") == prev
}

/// Archive `prev_used` (rounded to cents) under `prev` in a `budget_history`
/// JSON object. The archived value is the **stored** spend read from the row
/// being reset, never a caller's cached copy.
pub fn archive_period(existing: Option<&str>, prev: &str, prev_used: f64) -> String {
    let mut history: HashMap<String, f64> = existing
        .and_then(|s| serde_json::from_str(s).ok())
        .unwrap_or_default();
    if prev_used > 0.0 && !prev.is_empty() {
        history.insert(prev.to_string(), (prev_used * 100.0).round() / 100.0);
    }
    serde_json::to_string(&history).unwrap_or_else(|_| "{}".to_string())
}

/// `max(0, current - refund)` — the SQL backends' `MAX(0, x + amount)` clamp.
pub fn clamped_after_refund(current: f64, refund: f64) -> f64 {
    (current - refund).max(0.0)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn period_match_treats_null_as_empty() {
        assert!(period_is(None, ""));
        assert!(period_is(Some("2026-10"), "2026-10"));
        assert!(!period_is(Some("2026-11"), "2026-10"));
        assert!(!period_is(None, "2026-10"));
    }

    #[test]
    fn archive_keeps_existing_and_skips_empty() {
        let h = archive_period(Some(r#"{"2026-09":1.5}"#), "2026-10", 2.345);
        let m: HashMap<String, f64> = serde_json::from_str(&h).unwrap();
        assert_eq!(m["2026-09"], 1.5);
        assert_eq!(m["2026-10"], 2.35);
        assert_eq!(archive_period(None, "", 5.0), "{}");
        assert_eq!(archive_period(None, "2026-10", 0.0), "{}");
    }

    #[test]
    fn refund_clamps_at_zero() {
        assert_eq!(clamped_after_refund(5.0, 2.0), 3.0);
        assert_eq!(clamped_after_refund(1.0, 2.0), 0.0);
    }
}
