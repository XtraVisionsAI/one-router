//! Shared image helpers: magic-byte media-type sniffing and `data:` URL parsing.
//!
//! Every converter that turns an OpenAI `image_url` (or an Anthropic base64
//! image source) into a backend image block goes through here so that the
//! media type sent upstream reflects the **actual bytes**, not whatever the
//! client declared. Anthropic validates `media_type` against the payload and
//! rejects mismatches; several downstream clients (e.g. generic "vision"
//! helpers) label every image `image/jpeg` regardless of its real format.

use base64::{engine::general_purpose::STANDARD as BASE64, Engine};

/// Detect a supported image media type from the leading magic bytes.
/// Returns `None` for unrecognized/unsupported formats.
pub fn sniff_image_media_type(bytes: &[u8]) -> Option<&'static str> {
    if bytes.len() < 12 {
        return None;
    }
    // JPEG: FF D8 FF
    if bytes.starts_with(&[0xFF, 0xD8, 0xFF]) {
        return Some("image/jpeg");
    }
    // PNG: 89 50 4E 47 0D 0A 1A 0A
    if bytes.starts_with(&[0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]) {
        return Some("image/png");
    }
    // GIF: "GIF87a" / "GIF89a"
    if bytes.starts_with(b"GIF87a") || bytes.starts_with(b"GIF89a") {
        return Some("image/gif");
    }
    // WEBP: "RIFF"...."WEBP"
    if bytes.starts_with(b"RIFF") && &bytes[8..12] == b"WEBP" {
        return Some("image/webp");
    }
    None
}

/// A parsed image `data:` URL.
#[derive(Debug, Clone, PartialEq)]
pub struct ImageDataUrl {
    /// Effective media type: the sniffed type when the bytes are a recognized
    /// image format, otherwise the declared `image/*` type.
    pub media_type: String,
    /// The base64 payload exactly as it appeared in the URL.
    pub base64_data: String,
    /// The media type the URL declared (may be empty).
    pub declared_media_type: String,
}

/// Parse an image `data:` URL (`data:<media>;base64,<payload>`), decode the
/// payload to validate it, and resolve the media type from the bytes.
///
/// The sniffed type wins over the declared one; a mismatch is logged at `warn`.
/// When the bytes are not a recognized format, the declared type is used if it
/// is an `image/*` type, otherwise the URL is rejected. Rejections return a
/// human-readable message suitable for a 400 response.
pub fn parse_image_data_url(url: &str) -> Result<ImageDataUrl, String> {
    let rest = url
        .strip_prefix("data:")
        .ok_or_else(|| "Invalid data URL: missing 'data:' prefix".to_string())?;
    let (meta, data) = rest
        .split_once(',')
        .ok_or_else(|| "Invalid data URL: missing comma".to_string())?;
    let declared = meta.split(';').next().unwrap_or("").trim().to_string();
    if !meta.contains("base64") {
        return Err("Only base64 data URLs are supported".to_string());
    }

    let bytes = BASE64
        .decode(data.trim())
        .map_err(|e| format!("Invalid base64 in data URL: {e}"))?;

    let media_type = match sniff_image_media_type(&bytes) {
        Some(sniffed) => {
            if !declared.is_empty() && !declared.eq_ignore_ascii_case(sniffed) {
                // `image/jpg` is a common non-standard alias for `image/jpeg`.
                let alias_ok =
                    sniffed == "image/jpeg" && declared.eq_ignore_ascii_case("image/jpg");
                if !alias_ok {
                    tracing::warn!(
                        declared = %declared,
                        sniffed = %sniffed,
                        "image data URL media type does not match its bytes; using sniffed type"
                    );
                }
            }
            sniffed.to_string()
        }
        None => {
            if declared.to_ascii_lowercase().starts_with("image/") {
                tracing::debug!(
                    declared = %declared,
                    "image data URL bytes not recognized by magic sniff; trusting declared type"
                );
                declared.clone()
            } else {
                return Err("Unsupported or unrecognized image format in data URL".to_string());
            }
        }
    };

    Ok(ImageDataUrl {
        media_type,
        base64_data: data.trim().to_string(),
        declared_media_type: declared,
    })
}

#[cfg(test)]
pub(crate) mod test_fixtures {
    /// 1x1 red PNG.
    pub const PNG_1X1_B64: &str = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";
}

#[cfg(test)]
mod tests {
    use super::test_fixtures::PNG_1X1_B64;
    use super::*;

    #[test]
    fn test_sniff_image_media_type() {
        let png = [0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, 0, 0, 0, 0];
        assert_eq!(sniff_image_media_type(&png), Some("image/png"));
        let jpeg = [0xFF, 0xD8, 0xFF, 0xE0, 0, 0, 0, 0, 0, 0, 0, 0];
        assert_eq!(sniff_image_media_type(&jpeg), Some("image/jpeg"));
        let gif = *b"GIF89a______";
        assert_eq!(sniff_image_media_type(&gif), Some("image/gif"));
        let webp = *b"RIFF\0\0\0\0WEBP";
        assert_eq!(sniff_image_media_type(webp.as_slice()), Some("image/webp"));
        assert_eq!(sniff_image_media_type(b"not an image"), None);
        assert_eq!(sniff_image_media_type(b"short"), None);
    }

    #[test]
    fn test_parse_matching_declaration() {
        let out = parse_image_data_url(&format!("data:image/png;base64,{PNG_1X1_B64}")).unwrap();
        assert_eq!(out.media_type, "image/png");
        assert_eq!(out.base64_data, PNG_1X1_B64);
        assert_eq!(out.declared_media_type, "image/png");
    }

    #[test]
    fn test_sniffed_type_wins_over_declared() {
        // Client labels a PNG as JPEG (the agstack `client.vision` pattern).
        let out = parse_image_data_url(&format!("data:image/jpeg;base64,{PNG_1X1_B64}")).unwrap();
        assert_eq!(out.media_type, "image/png");
        assert_eq!(out.declared_media_type, "image/jpeg");
    }

    #[test]
    fn test_unrecognized_bytes_fall_back_to_declared_image_type() {
        let b64 = BASE64.encode(b"definitely-not-an-image-payload");
        let out = parse_image_data_url(&format!("data:image/heic;base64,{b64}")).unwrap();
        assert_eq!(out.media_type, "image/heic");
    }

    #[test]
    fn test_unrecognized_bytes_without_image_declaration_rejected() {
        let b64 = BASE64.encode(b"definitely-not-an-image-payload");
        assert!(parse_image_data_url(&format!("data:text/plain;base64,{b64}")).is_err());
        assert!(parse_image_data_url(&format!("data:;base64,{b64}")).is_err());
    }

    #[test]
    fn test_malformed_urls_rejected() {
        assert!(parse_image_data_url("https://example.com/a.png").is_err());
        assert!(parse_image_data_url("data:image/png;base64").is_err());
        assert!(parse_image_data_url("data:image/png,abc").is_err());
        assert!(parse_image_data_url("data:image/png;base64,!!!not-base64!!!").is_err());
    }
}
