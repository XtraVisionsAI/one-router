# `/v1/messages/count_tokens` 按 provider 分发实现方案

**状态**: 已实现（2026-10-08，分支 `worktree-count-tokens-design`）。本文已按实际落地内容修订；与原设计稿的差异见 §12。
**范围**: 仅 Anthropic 协议端点 `POST /v1/messages/count_tokens`。OpenAI 协议不新增端点（上游 OpenAI 也没有 token 计数 API，客户端靠 tiktoken 本地算）。

---

## 1. 背景与问题

当前实现（`src/api/messages.rs::count_tokens`）把 `messages` / `system` / `tools` 序列化成字符串后按 **4 字符 ≈ 1 token** 估算：

- 不看模型、不看 provider，不走任何上游。
- 图片、PDF 文档、工具 schema 的真实开销全部失真；中文偏差尤其大（中文 1 字符常常就是 1 token 以上）。
- `CountTokensRequest` 是一个独立的弱类型结构（`messages: Vec<Value>`），与 `MessageRequest` 脱节，`thinking` / `tool_choice` / `anthropic-beta` 等影响计数的字段全部丢失。

**直接业务影响**: Claude Code 用这个端点做上下文窗口估算和自动 compaction 触发判断。估算偏低 → compaction 来得太晚，真实请求撞 context window 400；偏高 → 过早压缩丢上下文。

---

## 2. 目标

| 目标 | 说明 |
|---|---|
| 协议兼容 | 请求/响应 wire format 与 Anthropic 官方完全一致：入参即 `MessageRequest` 减去 `max_tokens`，出参 `{"input_tokens": N}`。不加自定义字段。 |
| 按 provider 精确计数 | Anthropic 转发、Bedrock Claude 走 `CountTokens` API、Gemini 走 `countTokens`，其余回落到估算。 |
| 复用现有路由骨架 | 与 `create_message` 共用 model mapping、failover、capability filter、credential pool、models filter、错误映射，避免两条路径行为分叉。 |
| 不计费、不记 usage | 计数请求不产生 token 消耗，不写 `usage` 表，不计入 `onerouter_tokens_total`；但仍过 auth 与 rate limit 中间件（已覆盖，无需改动）。 |

非目标：不做结果缓存；不为 OpenAI 协议补端点；不引入 tiktoken（见 §8 可选项）。

---

## 3. 各后端能力矩阵

| Provider / 目标模型 | 上游能力 | 本方案处理 |
|---|---|---|
| `anthropic` passthrough | 原生 `POST /v1/messages/count_tokens` | 透传请求体 + `anthropic-version` / `anthropic-beta` 头，原样返回 |
| `bedrock` Claude（InvokeModel 形态） | `bedrock-runtime CountTokens`，输入可为 **InvokeModel 原始 body**（aws-sdk-bedrockruntime 1.120.0 已含 `count_tokens` 操作） | 复用 `build_invoke_model_body` 产出的同一份 body，精度与真实请求一致 |
| `bedrock` 非 Claude、有 Converse 形态（Nova / Kimi / GPT-OSS …） | `CountTokens` 的 `Converse` 输入 | 复用 `openai_bedrock::convert_request` 产出的 `ConverseRequest`，取 `messages` / `system` 填入 `ConverseTokensRequest` |
| `bedrock` Mantle Responses-only（`openai.gpt-5*` / `global.openai.gpt-6*`） | 无计数接口 | 回落估算 |
| `gemini` | 原生 `models/{model}:countTokens`，请求体与 `generateContent` 同形 | 复用 `AnthropicToGeminiConverter::convert_request`，读 `totalTokens` |
| `openai` backend | 无 API | 回落估算 |

> Bedrock `CountTokens` 不计费，但有独立于 InvokeModel 的限流配额，且 **`ThrottlingException` 不应触发 credential 的 rate-limit 冷却**（见 §6）。

---

## 4. 架构

### 4.1 请求形态改造

删除独立的 `CountTokensRequest`，改为复用 `MessageRequest`：

- `MessageRequest.max_tokens` 已有 `#[serde(default = "default_max_tokens")]`，官方 count_tokens 请求不带 `max_tokens` 也能反序列化。
- 复用后，`system` / `tools` / `tool_choice` / `thinking` / `role: "system"` 中间轮次 / `ContentBlock::Unknown` 全部走已有的严格解析与 `AnthropicJson` 错误包装，错误 wording 与 `/v1/messages` 一致。
- `stream` 字段若客户端误传，直接忽略。

### 4.2 Handler 骨架

```text
count_tokens(State, HeaderMap, AnthropicJson<MessageRequest>)
  │
  ├── resolve_request_route(&state, &request, beta_header)   ← 从 create_message 抽出的共享步骤
  │     ├── model_mapping.resolve
  │     ├── apply_failover（PTC 请求同样跳过）
  │     └── capability_filter::apply_capabilities
  │
  ├── image_url_fetcher::resolve_anthropic_image_urls（bedrock/gemini，同 create_message）
  │
  ├── match provider
  │     ├── "anthropic" → count_anthropic_passthrough
  │     ├── "gemini"    → count_gemini
  │     ├── "openai"    → estimate_fallback
  │     └── _ (bedrock) → count_bedrock
  │                           ├── resolve_routing_model_id
  │                           ├── is_mantle_responses_model → estimate_fallback
  │                           ├── is_claude_model           → CountTokens{InvokeModel}
  │                           └── 其他                       → CountTokens{Converse}
  │
  └── Ok(Json(CountTokensResponse { input_tokens }))
```

**抽取共享步骤**: `create_message` 里「resolve → failover」与「capability 三层回退」原本内联。已抽成两个函数共用：
`resolve_request_route(state, source_model, request_id, skip_failover) -> Result<ResolvedModel, ApiError>`
与 `effective_capabilities(state, &resolved) -> ModelCapabilities`。拆成两个而不是一个 `RoutedRequest`，是因为 `create_message` 的 PTC 分支位于两步之间且使用未过滤的请求；拆开后 `create_message` 行为完全不变（已单独 commit）。

**降级原则**: 任一上游计数失败（网络、权限、模型不支持 `CountTokens`、配额），**不对客户端报错**，记一条 `warn` 后回落到估算并返回 200。理由：计数端点是辅助端点，Claude Code 若收到 5xx 会直接把 compaction 判断置空；一个略偏的估算比报错对客户端更友好。例外：请求体解析失败（400）与 model 未映射（400）仍如实返回，与 `/v1/messages` 一致。

### 4.3 响应

```rust
#[derive(Serialize)]
pub struct CountTokensResponse { pub input_tokens: i32 }
```

保持现状。**不**添加 `source: "exact" | "estimated"` 之类的扩展字段（协议兼容优先）。精确/估算来源用 `tracing::info!(request_id, provider, method = "exact|estimated")` 记录，并新增一个 bounded-label 指标（§7）。

---

## 5. 各分支实现细节

### 5.1 Anthropic passthrough

在 `handle_anthropic_passthrough` 旁新增 `count_anthropic_passthrough`：

1. `anthropic_pool.get_next_for_model(target_model_id)` 选 credential（受 models filter 约束，与正式请求一致）。
2. `serde_json::to_value(&filtered_request)`，覆写 `model` 为 target id，移除 `container` / `stream` / `max_tokens` / `service_tier`（官方 count_tokens 不接受 `max_tokens`，带了会 400）。
3. 转发 `anthropic-version` / `anthropic-beta` 两个头，`svc.forward("/v1/messages/count_tokens", body, &extra_headers)`。
4. 2xx → 反序列化到 `CountTokensResponse` 校验后返回。
5. 非 2xx → 按 §6 规则处理后回落估算。

### 5.2 Bedrock

`BedrockService` 新增：

```rust
pub async fn count_tokens_invoke_model(
    &self,
    request: &MessageRequest,
    model_id: &str,
    beta_header: Option<&str>,
) -> Result<i32, BedrockError>;

pub async fn count_tokens_converse(
    &self,
    converse: &ConverseRequest,   // 已由 openai_bedrock::convert_request 产出
    model_id: &str,
) -> Result<i32, BedrockError>;
```

两者共用 `get_client_for(model_id)` 选 credential，`client.count_tokens().model_id(model_id).input(...)`。

**InvokeModel 分支**（Claude）:

- body 复用 `build_invoke_model_body(request, model_id, false, None, beta_header)`。它已经做了：`anthropic_version` 注入、`model`/`stream` 移除、`fallback` 块与 `fallback_credit_token` 剥离、message 级 `output_config` 上提、空 system 轮次丢弃、beta 头解析进 `anthropic_beta`。这是精度与正式请求一致的关键，也避免 Bedrock 对多余字段再报 "Extra inputs"。
- `max_tokens` 保留在 body 中：Bedrock 文档定义 InvokeModel 形态的计数输入就是「一份完整的 InvokeModel 请求体」。仍列入 §10 实测项 2 做确认；若实测被拒，再给 `build_invoke_model_body` 加 `for_count_tokens` 参数剥离。
- `service_tier` 固定传 `None`。
- `input(CountTokensInput::InvokeModel(InvokeModelTokensRequest::builder().body(Blob::new(body)).build()))`。
- 读 `output.input_tokens()`。

**Converse 分支**（Nova / Kimi / GPT-OSS）:

- 先用 `AnthropicToOpenAIConverter::convert_request` 得到 `ChatCompletionRequest`，再 `openai_bedrock::convert_request(&chat_req, model_id, effective_caps)` 得到 `ConverseRequest`，取其 `messages` / `system` / `tool_config` / `additional_model_request_fields` 装入 `ConverseTokensRequest`（SDK 1.120.0 的该类型**包含** `tool_config`，工具定义会被计入；只有 `inference_config` 不在计数输入里，被丢弃）。

**Mantle Responses-only**（`is_mantle_responses_model`）: 直接估算。

**错误处理**: 新增 `BedrockError::from_count_tokens_error`（与 `from_invoke_model_error` 同构）。`ValidationException` 含 "not supported" 字样时视为模型不支持，`debug` 级日志后回落估算，不记 credential failure。

### 5.3 Gemini

`GeminiService` 新增：

```rust
pub async fn count_tokens(&self, model: &str, request: &GeminiRequest) -> Result<i64, GeminiServiceError>;
```

- URL: `{base_url}/models/{model}:countTokens`，头 `x-goog-api-key`，body 与 `generateContent` 同形（`contents` / `systemInstruction` / `tools` 均被 countTokens 接受；`generationConfig` 会被忽略，不必剥离）。
- 响应读 `totalTokens`（新增 `GeminiCountTokensResponse { total_tokens: i64 }` 到 `schemas/gemini.rs`）。
- 转换复用 `AnthropicToGeminiConverter::convert_request(&filtered_request)`，返回的 `(model, GeminiRequest)` 中 model 以 `target_model_id` 覆盖（与 `handle_gemini_request` 现有做法保持一致）。
- 失败 → 按 §6 处理后回落估算。

### 5.4 估算回落（`estimate_fallback`）

把现有 4 字符估算挪到 `utils/tokens.rs::estimate_message_request_tokens(&MessageRequest) -> i32`，按内容类型分别计：

| 内容 | 规则 |
|---|---|
| 文本 / system / tool 名与描述 / tool `input_schema` 序列化 | 非 CJK 按 4 字节 ≈ 1 token，CJK 字符按 1 字符 ≈ 1 token（按 Unicode block 粗分） |
| `image` 块 | 固定 1600（不解码图片，取 Anthropic 公式 `(w*h)/750` 在不缩放上限 1092×1092 时的值） |
| 每条 message | 额外 +3 框架开销 |
| `document`（PDF）块 | base64 解码后字节数 / 20，下限 1500（约一页） |
| `thinking` 块 | 文本规则 |
| `tool_use` / `tool_result` | 序列化后文本规则 |

这是对 `estimate_tokens` 的增强而非替换，`embeddings.rs` 现有调用不受影响。

---

## 6. 凭据健康与限流语义

适用于所有 provider 的计数分支：

| 场景 | 处理 |
|---|---|
| 上游 429 / Throttling | **不**调用 `record_rate_limited`（CountTokens 配额独立，不代表正式推理不可用，不应让正式请求的 credential 被冷却）。只 `warn` + 回落估算。 |
| 上游 5xx / 网络错误 | `record_failure`（信号与正式请求共享，上游真挂了应当体现） |
| 上游 2xx | `record_success`（会自动 re-enable 被禁用的 credential，这是现有语义，可接受） |
| 上游 4xx 表示模型不支持计数 | 不记 failure，`debug` 日志 + 回落估算 |
| 无 eligible credential（models filter） | 回落估算，**不**返回 503。正式请求会在 `/v1/messages` 上拿到 503，计数端点不必重复报。 |

---

## 7. 可观测性

新增 counter（`observability/metrics.rs`）：

```text
onerouter_count_tokens_total{provider, method}
  provider ∈ anthropic | bedrock | gemini | openai
  method   ∈ exact | estimated
```

labels bounded，不含 api_key。`estimated` 分支的原因（`unsupported_model` / `upstream_error` / `no_credential` / `provider_has_no_api`）记到日志，**不**作 label（避免上游 message 进入 label 集）。

---

## 8. 可选项与不做的事

- **tiktoken-rs 替代估算**（OpenAI backend 与所有回落路径）: 精度更好但引入词表体积与编译时间，且 Claude 模型 tokenizer 与 cl100k 并不一致。本期不做；若后续要做，只替换 `estimate_fallback` 内部，接口不变。
- **结果缓存**: Claude Code 每轮都会带不同内容调用，命中率低，不做。
- **OpenAI 协议端点**: 上游无此端点，客户端已有 tiktoken，不做。
- **Mantle Responses 计数**: 上游无接口，估算即可。

---

## 9. 改动清单

| 文件 | 改动 |
|---|---|
| `src/api/messages.rs` | 删 `CountTokensRequest`；`count_tokens` 改签名为 `(State, Extension<ApiKeyInfo>, HeaderMap, AnthropicJson<MessageRequest>)`；抽 `resolve_request_route` 供 `create_message` / `count_tokens` 共用；新增 `count_anthropic_passthrough` / `count_bedrock` / `count_gemini` / `estimate_fallback` |
| `src/services/bedrock.rs` | `count_tokens_invoke_model` / `count_tokens_converse` / `finish_count_tokens`（健康记账）；`BedrockError::from_count_tokens_error` |
| `src/services/gemini.rs` | `count_tokens` |
| `src/schemas/gemini.rs` | `GeminiCountTokensResponse` |
| `src/utils/tokens.rs` | `estimate_text_tokens`（CJK 感知）/ `estimate_message_request_tokens` |
| `src/observability/metrics.rs` | `onerouter_count_tokens_total` |
| `src/server/routes.rs` | 无变化（路由已存在，中间件已覆盖） |
| `CLAUDE.md` | Conventions 加一条 count_tokens 分发规则 |
| `docs/design/mantle-responses-support.md` | 第 114 行 "维持本地估算" 改为指向本文 |

> `resolve_request_route` 的抽取建议**单独一个 commit** 先落（纯重构、`create_message` 行为不变），再落 count_tokens 功能 commit，便于 review 与回滚。

---

## 10. 测试计划

**单元测试**

- `estimate_message_request_tokens`: 纯英文 / 纯中文 / 含 image 块 / 含 tools 的四组用例，断言区间而非精确值。
- `count_tokens` handler: 构造 `anthropic` / `gemini` / `openai` / `bedrock` 四种 resolved provider，验证分发到正确分支；验证上游失败时返回 200 + 估算值而非 5xx。
- Bedrock Claude 分支：断言送入 `CountTokens` 的 body 与 `build_invoke_model_body` 输出一致（不含 `model` / `stream`，含 `anthropic_version`）。
- `AnthropicJson<MessageRequest>` 对不带 `max_tokens` 的 count_tokens 请求能成功解析。

**集成 / 实测（需真实凭据，结果记入代码注释与本文）**

1. Bedrock us-east-1 `global.anthropic.claude-haiku-4-5*`：同一份 messages 分别调 `CountTokens` 与真实 `InvokeModel`，比较 `input_tokens` 与响应 `usage.input_tokens`，期望相等。
2. 验证 `CountTokens` InvokeModel 输入是否接受 `max_tokens`，决定 §5.2 的剥离策略。
3. Bedrock Nova 2 `Converse` 计数可用性与含 tools 时的偏差。
4. Gemini `countTokens` 含 `systemInstruction` + `tools` 的返回。
5. Anthropic passthrough 带 `anthropic-beta: context-1m-2025-08-07` 时透传正确。
6. 端到端：Claude Code 指向本地网关，观察 `/context` 显示的上下文占比与真实响应 `usage` 一致，compaction 在预期阈值触发。

---

## 11. 风险与待确认

| 风险 | 处理 |
|---|---|
| Bedrock `CountTokens` 对 InvokeModel body 中 `max_tokens` / `tools` 等字段的接受度未知 | §10 实测项 2 先行；结果决定是否给 `build_invoke_model_body` 加 flag |
| `CountTokens` 在部分 region / 部分模型（尤其 inference profile ARN）不可用 | 回落估算 + `debug` 日志；不记 failure |
| CJK 估算规则仍是粗估 | 仅作为兜底，精确路径覆盖主流 provider 后影响面很小 |
| `record_success` 自动 re-enable credential 可能被计数请求触发 | 可接受：计数 2xx 说明凭据与网络确实可用 |
| 抽取 `resolve_request_route` 触碰 `create_message` 热路径 | 单独 commit + 既有测试覆盖；行为无改变 |

---

## 12. 落地记录（2026-10-08）

**Commit 结构**

1. `refactor(messages): extract resolve_request_route + effective_capabilities` — 纯重构，`create_message` 行为不变。
2. `feat(messages): per-provider token counting for /v1/messages/count_tokens` — 本文 §4–§7 全部内容。

**与原设计稿的差异**

- Handler 签名不取 `Extension<ApiKeyInfo>`：计数不记 usage，不需要 key 信息（auth 中间件仍然生效）。
- `ConverseTokensRequest` 含 `tool_config`，Converse 模型的工具定义可以精确计数，原稿「无法精确」的限制不成立。
- 估算规则：PDF 改为「解码字节 / 20，下限 1500」；image 固定 1600；每条 message +3。
- Gemini 分支用 `resolved.target_model_id` 调 countTokens。注意现有 `handle_gemini_request` 用的是转换器按**源**模型名得到的 id（`AnthropicToGeminiConverter::get_gemini_model`，内部映射表为空时等于源名），与 CLAUDE.md「模型 id 一律经 ModelMappingService」的约定不一致，属既有问题，本次未改。

**已验证**

- `cargo clippy --all-targets -D warnings` / `cargo fmt --check` 通过；`cargo test --lib` 413 通过（新增 6 个：估算 4 个、请求形态 1 个、fallback 标签 1 个）。
- 本地起服（无任何 backend）HTTP 冒烟：已映射模型 → 200 + 估算；CJK 文本估算高于 bytes/4；未映射模型 → 400 Anthropic 错误封装；畸形 content block → 400 带 serde 路径；缺 key → 401；`/metrics` 出现 `onerouter_count_tokens_total{method="estimated",provider="bedrock"}`。

**未验证（需真实凭据，见 §10 集成项）**

- Bedrock `CountTokens`（InvokeModel / Converse 两种输入）、Gemini `countTokens`、Anthropic 透传三条精确路径均未对真实上游跑过；SDK 类型与 HTTP 形态按文档实现。
