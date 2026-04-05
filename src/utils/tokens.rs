/// Rough token count estimate: approximately 4 characters per token.
pub fn estimate_tokens(text: &str) -> u32 {
    (text.len() / 4).max(1) as u32
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_estimate_tokens() {
        assert_eq!(estimate_tokens("hello world"), 2); // 11 chars / 4 = 2
        assert_eq!(estimate_tokens(""), 1); // min 1
        assert_eq!(estimate_tokens("abcd"), 1); // 4 chars / 4 = 1
    }
}
