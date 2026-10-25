//! Fetch external image URLs and inline them as base64 data URLs.
//!
//! Bedrock's `InvokeModel`/`Converse` image blocks accept only base64-encoded
//! bytes, not URLs. When a client sends an external image URL (OpenAI
//! `image_url`, or an Anthropic `url` image source), the proxy must download it
//! and inline the bytes before converting the request.
//!
//! Downloads are SSRF-guarded (private/loopback/metadata addresses blocked,
//! redirects re-validated, connection pinned — see [`crate::services::web_tools::ssrf`]),
//! size-capped, and content-type is verified by sniffing magic bytes rather than
//! trusting the server's `Content-Type`.

use crate::services::web_tools::ssrf;
use base64::{engine::general_purpose::STANDARD as BASE64, Engine};
use std::time::Duration;

/// Maximum image size to download (bytes).
pub const MAX_IMAGE_BYTES: usize = 8 * 1024 * 1024;

const FETCH_TIMEOUT: Duration = Duration::from_secs(15);

/// A fetched image: its sniffed media type and base64-encoded bytes.
#[derive(Debug)]
pub struct FetchedImage {
    pub media_type: String,
    pub base64_data: String,
}

impl FetchedImage {
    /// Render as a `data:` URL (for paths that re-parse a data URL downstream).
    pub fn to_data_url(&self) -> String {
        format!("data:{};base64,{}", self.media_type, self.base64_data)
    }
}

/// Detect a supported image media type from the leading magic bytes.
/// Shared with the converters via `utils::image`.
fn sniff_media_type(bytes: &[u8]) -> Option<&'static str> {
    crate::utils::image::sniff_image_media_type(bytes)
}

/// Strip query/fragment/userinfo from a URL for safe inclusion in error
/// messages (external image URLs may carry presigned tokens / SAS signatures).
fn safe_url(url: &str) -> String {
    match reqwest::Url::parse(url) {
        Ok(u) => {
            let host = u.host_str().unwrap_or("");
            format!("{}://{}{}", u.scheme(), host, u.path())
        }
        Err(_) => "<invalid url>".to_string(),
    }
}

/// Download an external image URL and return it as base64 with a sniffed media
/// type. `data:` URLs are decoded locally without a network call.
pub async fn fetch_image(url: &str) -> Result<FetchedImage, String> {
    if let Some(rest) = url.strip_prefix("data:") {
        return decode_data_url(rest);
    }

    let result = ssrf::safe_get_bytes(
        url,
        MAX_IMAGE_BYTES,
        FETCH_TIMEOUT,
        "one-router/image-fetch 1.0",
        // Reject oversized images rather than truncate — a truncated image is
        // corrupt but can still pass the magic-byte sniff below.
        ssrf::OversizePolicy::Reject,
        |_| Ok(()),
    )
    .await
    .map_err(|e| format!("Failed to fetch image {}: {e}", safe_url(url)))?;

    let media_type = sniff_media_type(&result.bytes).ok_or_else(|| {
        format!(
            "Unsupported or unrecognized image format at {}",
            safe_url(url)
        )
    })?;

    Ok(FetchedImage {
        media_type: media_type.to_string(),
        base64_data: BASE64.encode(&result.bytes),
    })
}

/// Decode the portion of a `data:` URL after the `data:` prefix.
///
/// The media type is resolved from the bytes (sniffed type wins over the
/// declared one) via `utils::image::parse_image_data_url`.
fn decode_data_url(rest: &str) -> Result<FetchedImage, String> {
    let parsed = crate::utils::image::parse_image_data_url(&format!("data:{rest}"))?;
    Ok(FetchedImage {
        media_type: parsed.media_type,
        base64_data: parsed.base64_data,
    })
}

/// Resolve every external `image_url` in an OpenAI chat request to an inline
/// base64 `data:` URL, in place. `data:` URLs are left untouched. Downloads run
/// concurrently. Returns an error string if any image fails (so the caller can
/// reject rather than silently drop an image the user expected the model to see).
///
/// Only needed for the Bedrock/Gemini paths — OpenAI passthrough handles URLs
/// natively upstream.
pub async fn resolve_openai_image_urls(
    request: &mut crate::schemas::openai::ChatCompletionRequest,
) -> Result<(), String> {
    use crate::schemas::openai::{ContentPart, MessageContent};

    // Collect (message_idx, part_idx, url) for every external image URL.
    let mut targets: Vec<(usize, usize, String)> = Vec::new();
    for (mi, msg) in request.messages.iter().enumerate() {
        if let Some(MessageContent::Parts(parts)) = &msg.content {
            for (pi, part) in parts.iter().enumerate() {
                if let ContentPart::ImageUrl { image_url } = part {
                    if !image_url.url.starts_with("data:") {
                        targets.push((mi, pi, image_url.url.clone()));
                    }
                }
            }
        }
    }
    if targets.is_empty() {
        return Ok(());
    }

    // Fetch all concurrently.
    let fetched = futures::future::join_all(
        targets
            .iter()
            .map(|(_, _, url)| async move { fetch_image(url).await }),
    )
    .await;

    for ((mi, pi, _), result) in targets.into_iter().zip(fetched) {
        let img = result?;
        if let Some(MessageContent::Parts(parts)) = &mut request.messages[mi].content {
            if let Some(ContentPart::ImageUrl { image_url }) = parts.get_mut(pi) {
                image_url.url = img.to_data_url();
            }
        }
    }
    Ok(())
}

/// Where an image block lives inside a request, for index-based rewrite after
/// concurrent fetching.
enum ImgLoc {
    /// messages[msg].content.Blocks[block]
    TopLevel(usize, usize),
    /// messages[msg].content.Blocks[block] is a ToolResult whose content.Blocks[inner]
    InToolResult(usize, usize, usize),
}

/// Resolve every `url` image source in an Anthropic message request to an inline
/// base64 source, in place (including images nested in `tool_result` content).
/// Downloads run concurrently. Errors if any image fails to fetch.
///
/// Needed for Bedrock/Gemini, whose image blocks accept only inline bytes.
pub async fn resolve_anthropic_image_urls(
    request: &mut crate::schemas::anthropic::MessageRequest,
) -> Result<(), String> {
    use crate::schemas::anthropic::{ContentBlock, MessageContent, ToolResultValue};

    fn is_url_source(source: &crate::schemas::anthropic::ImageSource) -> Option<String> {
        if source.source_type == "url" || source.data.is_none() {
            source.url.clone()
        } else {
            None
        }
    }

    let mut locs: Vec<ImgLoc> = Vec::new();
    let mut urls: Vec<String> = Vec::new();
    for (mi, msg) in request.messages.iter().enumerate() {
        let MessageContent::Blocks(blocks) = &msg.content else {
            continue;
        };
        for (bi, block) in blocks.iter().enumerate() {
            match block {
                ContentBlock::Image { source, .. } => {
                    if let Some(u) = is_url_source(source) {
                        locs.push(ImgLoc::TopLevel(mi, bi));
                        urls.push(u);
                    }
                }
                ContentBlock::ToolResult {
                    content: ToolResultValue::Blocks(inner),
                    ..
                } => {
                    for (ii, ib) in inner.iter().enumerate() {
                        if let ContentBlock::Image { source, .. } = ib {
                            if let Some(u) = is_url_source(source) {
                                locs.push(ImgLoc::InToolResult(mi, bi, ii));
                                urls.push(u);
                            }
                        }
                    }
                }
                _ => {}
            }
        }
    }
    if urls.is_empty() {
        return Ok(());
    }

    let fetched =
        futures::future::join_all(urls.iter().map(|u| async move { fetch_image(u).await })).await;

    for (loc, result) in locs.into_iter().zip(fetched) {
        let img = result?;
        let new_source = crate::schemas::anthropic::ImageSource {
            source_type: "base64".to_string(),
            media_type: Some(img.media_type),
            data: Some(img.base64_data),
            url: None,
        };
        let block = match loc {
            ImgLoc::TopLevel(mi, bi) => match &mut request.messages[mi].content {
                MessageContent::Blocks(blocks) => blocks.get_mut(bi),
                _ => None,
            },
            ImgLoc::InToolResult(mi, bi, ii) => match &mut request.messages[mi].content {
                MessageContent::Blocks(blocks) => match blocks.get_mut(bi) {
                    Some(ContentBlock::ToolResult {
                        content: ToolResultValue::Blocks(inner),
                        ..
                    }) => inner.get_mut(ii),
                    _ => None,
                },
                _ => None,
            },
        };
        if let Some(ContentBlock::Image { source, .. }) = block {
            *source = new_source;
        }
    }
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_sniff_media_type() {
        let png = [0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, 0, 0, 0, 0];
        assert_eq!(sniff_media_type(&png), Some("image/png"));
        let jpeg = [0xFF, 0xD8, 0xFF, 0xE0, 0, 0, 0, 0, 0, 0, 0, 0];
        assert_eq!(sniff_media_type(&jpeg), Some("image/jpeg"));
        let gif = *b"GIF89a______";
        assert_eq!(sniff_media_type(&gif), Some("image/gif"));
        let webp = *b"RIFF\0\0\0\0WEBP";
        assert_eq!(sniff_media_type(webp.as_slice()), Some("image/webp"));
        assert_eq!(sniff_media_type(b"not an image"), None);
        assert_eq!(sniff_media_type(b"short"), None);
    }

    #[test]
    fn test_safe_url_strips_query() {
        assert_eq!(
            safe_url("https://s3.example.com/img.png?X-Amz-Signature=secret&t=1"),
            "https://s3.example.com/img.png"
        );
        assert_eq!(safe_url("not a url"), "<invalid url>");
    }

    #[test]
    fn test_decode_data_url() {
        // 1x1 red PNG.
        let png_b64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";
        let out = decode_data_url(&format!("image/png;base64,{png_b64}")).unwrap();
        assert_eq!(out.media_type, "image/png");
        assert_eq!(out.base64_data, png_b64);
    }

    #[tokio::test]
    async fn test_fetch_image_rejects_metadata_endpoint() {
        let err = fetch_image("http://169.254.169.254/latest/meta-data/")
            .await
            .unwrap_err();
        assert!(err.contains("169.254.169.254") || err.to_lowercase().contains("forbidden"));
    }
}
