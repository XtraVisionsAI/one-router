# Bedrock Prompt Caching — Design Spec

**Date:** 2026-03-27
**Status:** Approved
**Scope:** Anthropic protocol → Bedrock backend caching support

---

## Background

Claude Code and other Anthropic-protocol clients automatically inject `cache_control` markers into requests to reduce token costs and latency via prompt caching. Currently, one-router silently drops these markers when converting requests to the Bedrock backend, so no caching benefit is realized.

This spec describes adding cache support for the Anthropic→Bedrock conversion path.

---

## Out of Scope

- **Gemini backend**: Gemini context caching requires pre-creating a `cachedContent` resource (minimum 32k tokens, hourly billing). Implementation is deferred — `cache_control` fields are silently ignored with a TODO comment.
- **OpenAI→Bedrock path**: OpenAI protocol requests have no `cache_control` fields.
- **OpenAI direct**: Uses automatic server-side caching; no client-side markers needed.
- **Anthropic direct (passthrough)**: Already works — `PassthroughService` forwards the request unchanged.

---

## Cache Point Semantics

Anthropic and Bedrock model prompt caching differently:

| | Anthropic | Bedrock |
|---|---|---|
| Representation | `cache_control` field on a content block | Separate `CachePoint` variant inserted into the content sequence |
| Meaning | "Cache everything up to and including this block" | "Cache everything up to this point in the sequence" |
| Type | `{ type: "ephemeral" }` | `CachePointBlock { type: CachePointType::Default }` |

**Mapping rule:** When a content block carries `cache_control`, emit the block first, then append a `CachePoint` block immediately after it.

```
Anthropic:  [Text(cache), Image, Text]
Bedrock:    [Text, CachePoint(Default), Image, Text]
```

This applies at three levels:
1. Message content blocks (`ContentBlock` → `SdkContentBlock`)
2. System prompt blocks (`SystemMessage` → `SystemContentBlock`)
3. Tool definitions (`Tool` → `SdkTool`)

---

## Dependency Change

```toml
# Cargo.toml — pin to 1.120 (highest version compatible with rustc 1.88.0)
aws-sdk-bedrockruntime = "=1.120.0"
```

The system has both 1.120.0 and 1.127.0 installed. However, 1.127.0 requires rustc ≥ 1.91.1 while the project currently uses rustc 1.88.0 (Homebrew). We pin to exactly `=1.120.0` (which declares `rust-version = "1.88.0"`) to keep the build working without a Rust toolchain upgrade.

All required cache types (`CachePointBlock`, `CachePointType`, `cache_read_input_tokens`, `cache_write_input_tokens`) are present in 1.120.0.

---

## Code Changes

### `src/converters/anthropic_bedrock.rs`

#### 1. `convert_content_block_to_sdk()` — signature change

Current: `fn convert_content_block_to_sdk(block: &ContentBlock) -> Result<Option<SdkContentBlock>, ...>`

New: `fn convert_content_block_to_sdk(block: &ContentBlock) -> Result<Vec<SdkContentBlock>, ...>`

A single logical block may produce two SDK blocks (the block itself + a CachePoint). Callers use `flat_map` to collect results.

Logic for `Text`, `Image`, `Document`, `ToolResult` variants:
```rust
let mut out = vec![/* the primary block */];
if cache_control.is_some() {
    out.push(SdkContentBlock::CachePoint(
        CachePointBlock::builder()
            .r#type(CachePointType::Default)
            .build()
            .map_err(|e| ConversionError::InvalidRequest(e.to_string()))?
    ));
}
Ok(out)
```

`ToolUse`, `Thinking`, `RedactedThinking`, `ServerToolUse`, `ServerToolResult` have no `cache_control` field — return single-element vec, no change.

#### 2. `convert_content_to_sdk()` / `convert_messages_to_sdk()` — caller update

Replace `filter_map` / `map` + `collect` with `flat_map`:

```rust
let sdk_blocks: Vec<SdkContentBlock> = blocks
    .iter()
    .map(convert_content_block_to_sdk)
    .collect::<Result<Vec<Vec<_>>, _>>()?
    .into_iter()
    .flatten()
    .collect();
```

#### 3. `convert_system_to_sdk()` — cache support

Current: maps each `SystemMessage` to a `SystemContentBlock::Text`.

New: appends `SystemContentBlock::CachePoint(Default)` after any system block with `cache_control`.

#### 4. `convert_tools_to_sdk()` — cache support

Current: maps each `Tool` to a `SdkTool::ToolSpec(...)`.

New: appends `SdkTool::CachePoint(Default)` after any tool with `cache_control`.

(In practice, Anthropic clients typically place `cache_control` only on the last tool in the list.)

#### 5. `convert_response()` — populate cache token fields

```rust
let usage = output.usage().map(|u| Usage {
    input_tokens: u.input_tokens(),
    output_tokens: u.output_tokens(),
    cache_creation_input_tokens: u.cache_write_input_tokens(),
    cache_read_input_tokens: u.cache_read_input_tokens(),
}).unwrap_or_default();
```

`TokenUsage` in SDK 1.120 exposes `cache_read_input_tokens() -> Option<i32>` and `cache_write_input_tokens() -> Option<i32>`.

### `src/converters/anthropic_gemini.rs`

Add a comment in `convert_content()` where `cache_control` is currently ignored:

```rust
// TODO: Gemini context caching is not yet supported.
// cache_control fields in ContentBlock are silently ignored.
// Gemini caching requires pre-creating a cachedContent resource,
// has a 32k token minimum, and charges per hour.
// See: https://ai.google.dev/gemini-api/docs/caching
```

Similar comment in `convert_system()` if applicable.

---

## Streaming

The streaming path (`converse_stream`) goes through the same converters for request transformation. Response streaming uses `StreamingResponse` which accumulates usage stats at the end — the `convert_stream_response()` function (if it exists) will need the same `cache_*` field population as the non-streaming path.

---

## Testing

- Unit test: `cache_control` on a text block produces `[Text, CachePoint]` in Bedrock content
- Unit test: `cache_control` on a system message produces `[Text, CachePoint]` in system blocks
- Unit test: `cache_control` on the last tool produces `[ToolSpec, CachePoint]` in tool list
- Unit test: Bedrock response with `cache_write_input_tokens=100` maps to `cache_creation_input_tokens=100` in Anthropic response
- Unit test: content block without `cache_control` produces only `[Text]` (no regression)

---

## README / Changelog

Add a note to CHANGELOG.md and README:

> **Bedrock prompt caching**: When using `x-provider: bedrock`, `cache_control` markers in Anthropic-protocol requests are now translated to Bedrock `cachePoint` blocks. Cache usage tokens are reflected in the response `usage` object.
>
> **Gemini**: Gemini context caching is not yet supported. `cache_control` fields are silently ignored.
