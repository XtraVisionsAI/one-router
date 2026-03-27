# Prompt Caching — Design Spec

**Date:** 2026-03-27
**Status:** Approved
**Scope:** All backend caching support across Anthropic and OpenAI protocol inputs

---

## Background

Claude Code and other Anthropic-protocol clients automatically inject `cache_control` markers into requests to reduce token costs and latency via prompt caching. Currently, one-router silently drops these markers when converting requests to Bedrock/Gemini backends. OpenAI-protocol requests have no cache fields at all, so they also receive no caching benefit when routed to Bedrock or Anthropic backends.

This spec adds caching support across all applicable conversion paths.

---

## Coverage Matrix

| Input Protocol | Backend | Strategy | Status |
|---|---|---|---|
| Anthropic | Anthropic (passthrough) | Transparent — forwards `cache_control` as-is | Already works |
| Anthropic | Bedrock | Translate `cache_control` → `CachePoint` blocks | **Implement** |
| Anthropic | Gemini | Deferred — silently ignore with TODO | **TODO comment** |
| Anthropic | OpenAI | Transparent — forwards `cache_control` as-is | Already works |
| OpenAI | OpenAI (passthrough) | Server-side automatic caching | No action needed |
| OpenAI | Bedrock | Auto-inject `CachePoint` after system/tools/last user message | **Implement** |
| OpenAI | Anthropic | Auto-inject `cache_control: ephemeral` after system/tools/last user message | **Implement** |
| OpenAI | Gemini | Deferred | **TODO comment** |

---

## Out of Scope

- **Gemini backend**: Gemini context caching requires pre-creating a `cachedContent` resource (minimum 32k tokens, hourly billing). Implementation is deferred — `cache_control` fields are silently ignored with a TODO comment.
- **Anthropic direct (passthrough)**: Already works — `PassthroughService` forwards the request unchanged.
- **OpenAI direct (passthrough)**: Server-side automatic caching, no action needed.

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

### `src/converters/openai_bedrock.rs` — auto-inject CachePoint

OpenAI requests have no `cache_control` field. The gateway auto-injects CachePoints at the end of each "stable" prefix to enable caching for all OpenAI→Bedrock requests:

**Injection points** (in `convert_request()`):
1. After the last system `SystemContentBlock` in the system list
2. After the last `Tool::ToolSpec` in the tool config (if tools present)
3. After the last user message content

This matches the recommended Bedrock caching strategy: cache the system prompt, then the tools, then the conversation history.

```rust
// After building system blocks:
if !system_blocks.is_empty() {
    system_blocks.push(SystemContentBlock::CachePoint(cache_point.clone()));
}

// After building tool list:
if !sdk_tools.is_empty() {
    sdk_tools.push(Tool::CachePoint(cache_point.clone()));
}

// After building messages — append to last user message's content:
if let Some(last_user_msg) = sdk_messages.iter_mut().rev()
    .find(|m| m.role() == ConversationRole::User)
{
    last_user_msg.content.push(SdkContentBlock::CachePoint(cache_point));
}
```

Note: Bedrock silently ignores CachePoints when the content is below the minimum threshold (~1024 tokens), so injecting them unconditionally is safe.

---

### `src/converters/anthropic_openai.rs` — auto-inject cache_control (OpenAI→Anthropic)

When converting an OpenAI request to Anthropic format (`OpenAIToAnthropicConverter::convert_request()`), auto-inject `cache_control: ephemeral` at the same logical positions:

1. On the last system `SystemMessage` block
2. On the last `Tool` in the tools list
3. On the last `ContentBlock` of the last user message

```rust
// On last system block:
if let Some(last) = system_blocks.last_mut() {
    last.cache_control = Some(CacheControl::new());
}

// On last tool:
if let Some(last) = tools.last_mut() {
    last.cache_control = Some(CacheControl::new());
}

// On last content block of last user message:
// (find last user message, get its last content block, set cache_control)
```

---

### `src/converters/anthropic_gemini.rs` — TODO comments

Add TODO comments wherever `cache_control` is silently ignored:

```rust
// TODO: Gemini context caching is not yet supported.
// cache_control fields in ContentBlock are silently ignored.
// Gemini caching requires pre-creating a cachedContent resource,
// has a 32k token minimum, and charges per hour.
// See: https://ai.google.dev/gemini-api/docs/caching
```

### `src/converters/openai_gemini.rs` — TODO comment

Same TODO comment in the OpenAI→Gemini converter.

---

## Streaming

The streaming path (`converse_stream`) goes through the same converters for request transformation. Response streaming uses `StreamingResponse` which accumulates usage stats at the end — the `convert_stream_response()` function (if it exists) will need the same `cache_*` field population as the non-streaming path.

---

## Testing

**Anthropic → Bedrock:**
- `cache_control` on a text block produces `[Text, CachePoint]` in Bedrock content
- `cache_control` on a system message produces `[SystemText, CachePoint]` in system blocks
- `cache_control` on the last tool produces `[ToolSpec, CachePoint]` in tool list
- Bedrock response with `cache_write_input_tokens=100` → `cache_creation_input_tokens=100` in Anthropic response
- Content block without `cache_control` produces only `[Text]` (no regression)

**OpenAI → Bedrock (auto-inject):**
- System message always gets a trailing `SystemContentBlock::CachePoint`
- Last user message always gets a trailing `ContentBlock::CachePoint`
- Tools list always gets a trailing `Tool::CachePoint` when tools are present
- Request with no system and no tools still injects CachePoint on last user message

**OpenAI → Anthropic (auto-inject):**
- Last system block has `cache_control: ephemeral`
- Last tool has `cache_control: ephemeral`
- Last content block of last user message has `cache_control: ephemeral`

---

## README / Changelog

> **Prompt caching enabled for all Bedrock and Anthropic backend routes:**
>
> - `x-provider: bedrock` (Anthropic input): `cache_control` markers are translated to Bedrock `cachePoint` blocks. Cache usage tokens appear in the response `usage` object.
> - `x-provider: bedrock` (OpenAI input): CachePoints are automatically injected after system prompt, tools, and the last user message.
> - `x-provider: anthropic` (OpenAI input): `cache_control: ephemeral` is automatically injected on the last system block, last tool, and last user message content block.
>
> **Gemini**: Gemini context caching is not yet supported. `cache_control` fields are silently ignored.
