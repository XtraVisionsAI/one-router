//! Per-backend model filter (wildcard + negation patterns).
//!
//! A backend declares which target model ids its credentials can serve, as a
//! pattern list like `["*", "!openai.*"]`. Selection is two-step:
//!
//! 1. **Eligibility** — a credential serves a model iff it matches at least one
//!    positive pattern AND no negative (`!`-prefixed) pattern. Exclusions win
//!    unconditionally, regardless of order. A pure-negative list gets an
//!    implicit `*` base (`["!claude.*"]` ≡ `["*", "!claude.*"]`). `None` /
//!    empty list ≡ `["*"]` (legacy behavior).
//! 2. **Ranking** — among eligible credentials, the best *positive* match wins:
//!    exact match first, then backend `priority`, then pattern specificity
//!    (negatives never rank). The pool takes the top-ranked group and load
//!    balances within it — no cascade to lower groups (a filter is a claim,
//!    not a capability proof, and doomed requests would poison shared
//!    per-credential health).
//!
//! Patterns are matched against the **target model id** (what is actually sent
//! to the backend); application inference profile ARNs match literally.

use crate::utils::glob::{glob_match, pattern_specificity};

/// Ranking key for the best positive pattern a credential matched.
///
/// Derived `Ord` compares fields in declaration order: exact match beats any
/// wildcard, then backend `priority` (model_mappings precedent), then pattern
/// specificity. The implicit `*` base counts as specificity 0.
#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord)]
pub struct MatchRank {
    pub exact: bool,
    pub priority: i32,
    pub specificity: usize,
}

impl MatchRank {
    /// Rank of the implicit `*` catch-all (a credential with no filter).
    pub fn catch_all(priority: i32) -> Self {
        Self {
            exact: false,
            priority,
            specificity: 0,
        }
    }
}

/// Parsed model filter for one backend credential.
#[derive(Debug, Clone)]
pub struct ModelFilter {
    /// Positive patterns. Never empty after parsing (implicit `*` base).
    positives: Vec<String>,
    /// Negative patterns, stored without the `!` prefix.
    negatives: Vec<String>,
}

impl Default for ModelFilter {
    /// Accept-all filter (`["*"]`) — the legacy no-filter behavior.
    fn default() -> Self {
        Self {
            positives: vec!["*".to_string()],
            negatives: Vec::new(),
        }
    }
}

impl ModelFilter {
    /// Build from the raw pattern list stored on the backend record.
    ///
    /// `None` or an empty/whitespace-only list yields the accept-all filter.
    /// A list with only negative patterns gets an implicit `*` base. Blank
    /// entries are skipped (validation rejects them at write time; reads stay
    /// lenient so a bad row can never break routing).
    pub fn from_patterns(patterns: Option<&[String]>) -> Self {
        let mut positives = Vec::new();
        let mut negatives = Vec::new();
        for raw in patterns.unwrap_or(&[]) {
            let p = raw.trim();
            if p.is_empty() {
                continue;
            }
            if let Some(neg) = p.strip_prefix('!') {
                let neg = neg.trim();
                if !neg.is_empty() {
                    negatives.push(neg.to_string());
                }
            } else {
                positives.push(p.to_string());
            }
        }
        if positives.is_empty() {
            positives.push("*".to_string());
        }
        Self {
            positives,
            negatives,
        }
    }

    /// Eligibility: matches at least one positive pattern and no negative one.
    pub fn matches(&self, target_model_id: &str) -> bool {
        if self
            .negatives
            .iter()
            .any(|n| glob_match(n, target_model_id))
        {
            return false;
        }
        self.positives
            .iter()
            .any(|p| glob_match(p, target_model_id))
    }

    /// Ranking key from the best positive pattern this filter matches.
    /// `None` when the model is not eligible (excluded or no positive match).
    pub fn match_rank(&self, target_model_id: &str, priority: i32) -> Option<MatchRank> {
        if !self.matches(target_model_id) {
            return None;
        }
        self.positives
            .iter()
            .filter(|p| glob_match(p, target_model_id))
            .map(|p| MatchRank {
                exact: !p.contains('*'),
                priority,
                specificity: pattern_specificity(p),
            })
            .max()
    }
}

/// Validate a pattern list before persisting it (Admin API).
///
/// Returns human-readable problems; an empty vec means the list is acceptable.
/// Rejected nonsense: blank patterns, a bare `!`, the same pattern appearing
/// both positive and negative (matches nothing), and `!*` mixed with other
/// patterns (unconditionally empties the filter — write `["!*"]` alone to
/// express "serve nothing without disabling the backend").
pub fn validate_patterns(patterns: &[String]) -> Vec<String> {
    let mut problems = Vec::new();
    let mut positives: Vec<&str> = Vec::new();
    let mut negatives: Vec<&str> = Vec::new();

    for raw in patterns {
        let p = raw.trim();
        if p.is_empty() {
            problems.push("empty pattern".to_string());
            continue;
        }
        if let Some(neg) = p.strip_prefix('!') {
            let neg = neg.trim();
            if neg.is_empty() {
                problems.push("bare '!' is not a pattern".to_string());
            } else {
                negatives.push(neg);
            }
        } else {
            positives.push(p);
        }
    }

    for pos in &positives {
        if negatives.contains(pos) {
            problems.push(format!(
                "pattern '{pos}' is both included and excluded — it matches nothing"
            ));
        }
    }

    if negatives.contains(&"*") && (patterns.len() > 1) {
        problems.push(
            "'!*' mixed with other patterns empties the filter; use [\"!*\"] alone".to_string(),
        );
    }

    problems
}

#[cfg(test)]
mod tests {
    use super::*;

    fn filter(patterns: &[&str]) -> ModelFilter {
        let owned: Vec<String> = patterns.iter().map(|s| s.to_string()).collect();
        ModelFilter::from_patterns(Some(&owned))
    }

    #[test]
    fn empty_and_none_accept_everything() {
        assert!(ModelFilter::from_patterns(None).matches("anything"));
        assert!(ModelFilter::default().matches("openai.gpt-5.6-sol"));
        assert!(filter(&[]).matches("x"));
        assert!(filter(&["  ", ""]).matches("x"));
    }

    #[test]
    fn positive_wildcard_and_exact() {
        let f = filter(&["openai.gpt-5*"]);
        assert!(f.matches("openai.gpt-5.6-sol"));
        assert!(!f.matches("global.anthropic.claude-sonnet-5"));

        let f = filter(&["global.anthropic.claude-sonnet-5"]);
        assert!(f.matches("global.anthropic.claude-sonnet-5"));
        assert!(!f.matches("global.anthropic.claude-opus-4-8"));
    }

    #[test]
    fn exclusion_wins_regardless_of_order() {
        for patterns in [&["*", "!openai.*"][..], &["!openai.*", "*"][..]] {
            let f = filter(patterns);
            assert!(f.matches("global.anthropic.claude-sonnet-5"));
            assert!(!f.matches("openai.gpt-5.6-sol"));
        }
    }

    #[test]
    fn pure_negative_implies_star_base() {
        let f = filter(&["!claude.*"]);
        assert!(f.matches("openai.gpt-5.6-sol"));
        assert!(!f.matches("claude.opus"));
    }

    #[test]
    fn bang_star_alone_serves_nothing() {
        let f = filter(&["!*"]);
        assert!(!f.matches("anything"));
        assert!(!f.matches(""));
    }

    #[test]
    fn arn_matches_literally() {
        let f = filter(&["arn:aws:bedrock:us-*"]);
        assert!(f.matches("arn:aws:bedrock:us-east-1:123:application-inference-profile/x"));
        assert!(!f.matches("arn:aws:bedrock:ap-northeast-1:123:application-inference-profile/x"));
    }

    #[test]
    fn match_rank_exact_beats_wildcard_beats_catch_all() {
        let exact = filter(&["openai.gpt-5.6-sol"])
            .match_rank("openai.gpt-5.6-sol", 0)
            .unwrap();
        let wild = filter(&["openai.gpt-5*"])
            .match_rank("openai.gpt-5.6-sol", 0)
            .unwrap();
        let all = filter(&["*"]).match_rank("openai.gpt-5.6-sol", 0).unwrap();
        assert!(exact > wild);
        assert!(wild > all);
        assert_eq!(all, MatchRank::catch_all(0));
    }

    #[test]
    fn match_rank_priority_breaks_wildcard_ties() {
        let low = filter(&["openai.*"])
            .match_rank("openai.gpt-5.6-sol", 0)
            .unwrap();
        let high = filter(&["openai.*"])
            .match_rank("openai.gpt-5.6-sol", 10)
            .unwrap();
        assert!(high > low);
        // But an exact match still beats a higher-priority wildcard.
        let exact_low = filter(&["openai.gpt-5.6-sol"])
            .match_rank("openai.gpt-5.6-sol", 0)
            .unwrap();
        assert!(exact_low > high);
    }

    #[test]
    fn match_rank_uses_best_positive_pattern() {
        // Both `*` and `openai.gpt-5*` match; the rank must come from the
        // more specific pattern.
        let f = filter(&["*", "openai.gpt-5*"]);
        let rank = f.match_rank("openai.gpt-5.6-sol", 0).unwrap();
        assert_eq!(rank.specificity, "openai.gpt-5".len());
    }

    #[test]
    fn match_rank_none_when_excluded() {
        let f = filter(&["*", "!openai.*"]);
        assert!(f.match_rank("openai.gpt-5.6-sol", 0).is_none());
        assert!(f.match_rank("claude.x", 0).is_some());
    }

    #[test]
    fn validate_accepts_reasonable_lists() {
        for patterns in [
            vec![],
            vec!["*".to_string()],
            vec!["*".to_string(), "!openai.*".to_string()],
            vec!["!claude.*".to_string()],
            vec!["!*".to_string()],
            vec!["openai.gpt-5*".to_string()],
        ] {
            assert!(
                validate_patterns(&patterns).is_empty(),
                "{patterns:?} should validate"
            );
        }
    }

    #[test]
    fn validate_rejects_nonsense() {
        // Blank pattern.
        assert!(!validate_patterns(&["".to_string()]).is_empty());
        // Bare '!'.
        assert!(!validate_patterns(&["!".to_string()]).is_empty());
        // Same pattern positive and negative.
        assert!(!validate_patterns(&["claude.*".to_string(), "!claude.*".to_string()]).is_empty());
        // '!*' mixed with other patterns.
        assert!(!validate_patterns(&["claude.*".to_string(), "!*".to_string()]).is_empty());
    }
}
