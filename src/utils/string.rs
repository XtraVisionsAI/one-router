//! String utilities

/// Safely truncate a string at a character boundary
pub fn truncate_str(s: &str, max_chars: usize) -> &str {
    match s.char_indices().nth(max_chars) {
        Some((idx, _)) => &s[..idx],
        None => s,
    }
}

/// Safely truncate a string and append a suffix if truncated
pub fn truncate_with_suffix(s: &str, max_chars: usize, suffix: &str) -> String {
    if s.chars().count() <= max_chars {
        s.to_string()
    } else {
        format!("{}{}", truncate_str(s, max_chars), suffix)
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_truncate_str_ascii() {
        let text = "Hello, World!";
        assert_eq!(truncate_str(text, 5), "Hello");
        assert_eq!(truncate_str(text, 100), "Hello, World!");
    }

    #[test]
    fn test_truncate_with_suffix() {
        let text = "Hello, World!";
        assert_eq!(truncate_with_suffix(text, 5, "..."), "Hello...");
        assert_eq!(truncate_with_suffix("Hi", 5, "..."), "Hi");
    }
}
