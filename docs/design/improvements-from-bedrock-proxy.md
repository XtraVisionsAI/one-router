# One Router 改进设计文档

> 基于 [aws-samples/sample-bedrock-api-proxy](https://github.com/aws-samples/sample-bedrock-api-proxy) 对比分析
> 日期：2026-05-09
> 更新：2026-05-10（已实现项目移除）
> 更新：2026-07-21（二次分析：新增缺口清单 + 设计红线，见文末）

---

## 状态总览

### 已实现 ✓

- W1: Web Tools 提升到 Provider 路由之前
- W2: 精确匹配 Tool 版本号
- W3: Dynamic Filtering（按版本区分执行行为）
- W4: 伪流式输出
- W5: Tavily Extract Provider
- W6: Citation 后处理
- W7: Web Search/Fetch 共存语义确认
- P1: PTC Owner 验证
- P2: PTC Continuation 完整性
- P3: HTTP 错误码细分
- P4: Graceful Shutdown 容器清理
- P5: PTC Streaming 支持
- P6: Sandbox 基础设施共享
- P8: Tool Result ID 格式验证与映射
- B1: Service Tier 自动降级重试

### 搁置（无实际需求）

- P7: Standalone Code Execution — 当前 PTC 协议已覆盖需求
- B2: Beta Header 动态规则映射 — Bedrock 会忽略不认识的 beta 值

### 未实现

- R1: 跨 Provider Failover Chain
- R2: Smart Router
- O1: OpenTelemetry 分布式追踪
- O2: Prometheus Metrics 导出

---

## 未实现项目详细设计

---

## 一、多 Provider 智能路由

### R1：跨 Provider Failover Chain（中优先级）

**现状：**
`CredentialPool` 仅在 **同一 provider 内** 做凭证级别 failover。Bedrock 所有凭证都挂了 → 直接报错。

**目标：**
Bedrock 不可用 → 自动 failover 到 Anthropic API（同模型，不同后端）。

**方案：**

```rust
// src/services/failover.rs（新模块）

pub struct FailoverChain {
    /// 按优先级排列的 provider
    providers: Vec<FailoverProvider>,
}

pub struct FailoverProvider {
    pub provider: String,      // "bedrock", "anthropic", "openai"
    pub model_mapping: String, // 该 provider 下对应的 model ID
    pub weight: u32,           // 0 = 仅 failover 时使用
}

impl FailoverChain {
    pub async fn execute<F, R>(&self, f: F) -> Result<R, ApiError>
    where
        F: Fn(&str, &str) -> Pin<Box<dyn Future<Output = Result<R, ApiError>> + Send>>,
    {
        for provider in &self.providers {
            match f(&provider.provider, &provider.model_mapping).await {
                Ok(result) => return Ok(result),
                Err(e) if e.is_retryable() => {
                    tracing::warn!(provider = %provider.provider, error = %e, "Failover to next provider");
                    continue;
                }
                Err(e) => return Err(e),
            }
        }
        Err(ApiError::service_unavailable("All providers exhausted"))
    }
}
```

**配置方式：**
在 model_mappings 表中支持多条同 source_model 不同 provider 的映射，按 priority 排序作为 failover chain。

---

### R2：Smart Router（低优先级）

**说明：**
基于规则引擎的路由决策（按模型能力、成本、延迟、配额余量选择最优 provider）。

**建议：**
属于 v2 路线图功能。当前静态 model_mapping + priority 排序 + R1 failover 已满足需求。

---

## 二、可观测性

### O1：OpenTelemetry 分布式追踪（中优先级）

**现状：**
仅有 `tracing` crate 结构化日志，无分布式追踪链路。

**方案：**

```rust
// Cargo.toml
[dependencies]
opentelemetry = "0.22"
opentelemetry-otlp = "0.15"
tracing-opentelemetry = "0.23"

// src/server/app.rs
fn init_tracing() {
    let tracer = opentelemetry_otlp::new_pipeline()
        .tracing()
        .with_exporter(opentelemetry_otlp::new_exporter().tonic())
        .install_batch(opentelemetry_sdk::runtime::Tokio)
        .unwrap();

    let telemetry_layer = tracing_opentelemetry::layer().with_tracer(tracer);
    // 与现有 tracing subscriber 组合
}
```

**Span 层次设计：**
```
Request (root span)
├── Auth middleware
├── Rate limit check
├── Model mapping resolution
├── [Web Tool Loop] (optional)
│   ├── Iteration 1: Backend call
│   ├── Iteration 1: Search execution
│   ├── Iteration 2: Backend call
│   └── ...
├── Converter: request transform
├── Backend call (Bedrock/Gemini/Anthropic/OpenAI)
├── Converter: response transform
└── Usage recording
```

**配置：**
新增环境变量 `OTEL_EXPORTER_OTLP_ENDPOINT`，设置后自动启用 OpenTelemetry。不设置则仅用 tracing 日志。

---

### O2：Prometheus Metrics 导出（低优先级）

**关键 Metrics：**
- `request_duration_seconds` (histogram, labels: provider, model, status)
- `tokens_total` (counter, labels: direction=input/output, provider, model)
- `backend_errors_total` (counter, labels: provider, error_type)
- `active_ptc_sessions` (gauge)
- `web_tool_iterations_total` (counter)
- `credential_pool_health` (gauge, labels: backend, credential_name)

**方案：**
使用 `axum-prometheus` 或 `metrics` + `metrics-exporter-prometheus` crate，暴露 `/metrics` endpoint。

---

## 实施路线图

### 下一步：Failover（1-2 周）

- [ ] R1：跨 Provider Failover Chain

### 按需：可观测性

- [ ] O1：OpenTelemetry 集成
- [ ] O2：Prometheus Metrics

### v2 路线图

- [ ] R2：Smart Router

---

# 2026-07-21 二次分析

对同一参考仓库（已更新至含 PTC/web tools/Responses API 的版本）重新做了全量对比。第一轮吸收的项目（W1-W7、P1-P8、B1）均已确认在线上代码中。以下为新发现。

## 一、已核实的缺口（无条件应修）

### S1：web_fetch SSRF 防护（高优先级，安全）

**现状：** `src/services/web_tools/fetch.rs` 的 `ReqwestFetchProvider` 仅做域名过滤后直接 GET：
- 不屏蔽私网/环回/链路本地 IP，不屏蔽云 metadata 端点（`169.254.169.254`、`169.254.170.2`）。部署在 AWS 上时可被诱导读取 ECS/EC2 metadata 窃取 IAM 凭证。
- reqwest 默认跟随重定向（最多 10 跳），域名过滤只检查原始 URL——allowed_domains 内的 URL 可 302 到任意内网地址。

**方案：** 解析主机名后校验 IP（拒绝 private/loopback/link-local/multicast/metadata）；`redirect::Policy::custom` 对每一跳重做域名过滤 + IP 校验。参考实现：sample 仓库 `app/services/web_fetch/providers.py:75-303`（含 DNS 重绑定防护的传输层 IP pinning，可作为二期）。

### S2：OpenAI cached token 提取与计费口径（计费正确性）

**现状：** `schemas/openai.rs` 的 `CompletionUsage` 无 `prompt_tokens_details`；`prompt_tokens`（OpenAI 语义下**含** cached tokens）整个按全价 input 计费。后果：缓存流量多收费、cached_tokens 恒为 0 不可见。

**方案：** 增加 `prompt_tokens_details.cached_tokens` 提取，记账时 `input = prompt_tokens - cached_tokens`，cached 部分按 cache_read 价。**红线：补提取时必须同时扣减 input，否则重复计费。**

### S3：Inference Profile ARN 解析（正确性）

**现状：** `bedrock.rs:351` `is_claude_model` 纯子串匹配。application inference profile ARN（不透明字符串）会被误路由到非 Claude 路径且计价查不到。

**方案：** 正则守卫（非 ARN 零开销）→ moka TTL 缓存（1h）→ Bedrock 控制面 `GetInferenceProfile` 取底层 modelArn。解析失败严格报错不猜测。usage 保留原始 ARN、metadata 记录解析结果。参考：`app/services/inference_profile_resolver.py`。

### S4：图片 URL 源支持

**现状：** Anthropic 协议 `ImageSource` 仅 base64（官方 API 支持 `{"type":"url"}`）；OpenAI 协议对外部 `image_url` 直接报错。

**方案：** 请求预处理阶段并发下载 URL 图片转 base64：大小上限（边下边检）、content-type 白名单 + magic bytes 嗅探、错误信息剥 query/fragment（防 presigned token 泄露）、递归处理 tool_result 内嵌图片。**必须复用 S1 的 SSRF 防护。**参考：`app/services/image_url_fetcher.py`。

### S5：Cache TTL 分级计费

**现状：** usage record 已有 `cache_ttl` 字段，但 `calculate_cost` 用单一 `cache_write_price`。

**方案：** `cache_ttl == "1h"` 时 cache-write 按 `input_price × 2.0`；`5m`/未知用现价（≈1.25×）。

## 二、功能采纳清单（按性价比排序）

| # | 项 | 工程量 | 说明 |
|---|---|---|---|
| F1 | LiteLLM 价格自动同步 | 中 | 从 LiteLLM 价表拉取；synced/manual 行隔离；行永不删、价永不置空；消灭手动修 seed 价格 |
| F2 | Beta header 自动注入 | 小 | tools 含 `defer_loading` 等特性但缺 beta header 时自动补（防 Bedrock 硬拒）。注意 B2 三态表仍维持搁置 |
| F3 | 模型级 failover 链 | 中 | 即 R1，设计见上文；某模型凭证全不可用时切备用模型 |
| F4 | Prometheus /metrics | 小-中 | 即 O2；`prometheus` crate 已在 Cargo.toml 未使用。注意 label 基数（api_key 掩码或省略） |
| F5 | fallback_credit 透传 | 小 | Anthropic refusal-fallback beta：顶层 `fallback_credit_token` 透传、`stop_details` 保留、历史 `fallback` block 转 Bedrock 时剥离 |
| F6 | AgentCore Gateway WebSearch | 中 | 第三个搜索 provider：MCP JSON-RPC + SigV4（service=bedrock-agentcore）；无需第三方搜索 key，走 AWS 账单；不支持域名/位置过滤 |
| F7 | 启动配置体检 | 很小 | 弱 master key 黑名单、容器缺显式 key 等，只警告不阻断 |
| F8 | OTel 分布式追踪 | 大 | 即 O1；增补：GenAI 语义约定属性、session 聚合（header → metadata → sha256(model+首条 user 消息) 派生）、流式 span 边转发边累积 |
| F9 | Responses API + Codex 兼容 | 大 | `/v1/responses` 端点 + Chat↔Responses 翻译（content part 改名）+ unsupported-param 学习式重试 + **SSE `event:` 行合成**（Mantle 只发 data 帧，Codex CLI 拒收无 event 行的流——这是 Codex 兼容的唯一硬门槛） |

## 三、设计红线（做相关功能时必须遵守）

1. **Cache affinity 优先**：任何自动换模型/降级/智能路由逻辑，在 prompt cache 活跃时必须锁定原模型——切换省下的钱会被 cache miss 吃掉。
2. **永不触碰 `cache_control` 块**：上下文压缩、历史折叠、消息改写等一切变换必须跳过带 cache_control 标记的内容，否则破坏缓存前缀。
3. **有状态会话必须绑定归属**：任何跨请求状态（`previous_response_id`、PTC session 等）必须绑定创建方 API key 并在读取时校验（PTC 已有 `owner_key_hash` 先例，照搬）。
4. **增量聚合必须配重算工具**：若 usage 统计改为增量聚合，必须同时交付从 raw 记录全量重算的脚本（聚合 bug 修复后需要重建历史）。
5. **OpenAI usage 口径**：OpenAI 协议的 `prompt_tokens` 含 cached tokens；任何计费/展示都要先扣减，禁止 cached 部分同时计 input 价和 cache_read 价。
6. **服务端状态优先于 client 回传历史**：continuation 类流程（PTC 等）重建对话时信任服务端持久化的原始内容（SDK 会剥离 `caller` 等字段）。
7. **混合 server tools 请求**：同一请求同时声明 web_search + web_fetch 时必须两者都处理或明确拒绝（参考实现此场景是坏的——只处理 search、fetch 工具裸透传导致上游报错）。

---

# 2026-07-21 实现落地 + 勘误

## 已实现并合入（全部通过 fmt / clippy -D warnings / cargo test）

| 项 | 落地位置 |
|---|---|
| S1 web_fetch SSRF 防护 | `services/web_tools/ssrf.rs`（IP 校验 + 每跳重定向重校验 + 传输层 IP pinning），`fetch.rs` 改用 `safe_get_bytes` |
| S2 OpenAI cached token 计费口径 | `schemas/openai.rs` `PromptTokensDetails`；`chat_completions.rs` 拆分 cached，`input = prompt_tokens - cached` |
| S3 Inference Profile ARN 解析 | `services/inference_profile.rs`（控制面 `GetInferenceProfile` + SigV4 + moka TTL 1h，严格失败）；`bedrock.rs::resolve_routing_model_id` |
| S4 图片 URL → base64 | `services/image_url_fetcher.rs`（复用 SSRF，magic-byte 嗅探，剥 query/fragment，递归 tool_result）；两个 handler 请求预处理 |
| S5 Cache TTL 分级计费 | `usage_tracker.rs::cache_write_price_for_ttl`（1h = input×2.0） |
| F2 Beta header 自动注入 | `bedrock.rs::build_invoke_model_body`（`defer_loading` → `advanced-tool-use-2025-11-20`） |
| F4 Prometheus /metrics | `observability/metrics.rs` + `GET /metrics`（无鉴权，label 只用 provider/protocol/model/direction/status，**刻意不含 api_key**——不照抄参考的高基数反模式） |
| F7 启动配置体检 | `config/settings.rs::security_warnings()`（弱 key 黑名单等，仅警告） |
| F3/R1 模型级 failover 链 | `services/failover.rs` + `DynamicConfig::{provider_available, apply_failover}`；配置存 `failover_chains` 设置项（JSON，热加载）；触发条件 = 主 provider 池无健康凭证（`PoolStats::is_healthy()`）。**关键实现细节：`get_next()` 永不返回 None（最后兜底返回首个凭证），故健康信号用 `healthy_count>0` 而非 `get_next().is_some()`。** 空/未知 provider 按 handler 语义归一到 bedrock。**PTC 请求跳过 failover**（Bedrock/Docker 专属，前置 `is_ptc` 判定）。每次切换计入 `onerouter_failover_total{from,to}` |

**R1 与 cache-affinity 红线的关系（已裁定）**：耗尽式 failover **豁免**红线 #1。红线针对的是「为省钱主动换模型」，而 failover 触发时主 provider 已不可用，其缓存前缀本就无法命中，不存在被牺牲的缓存收益——只是把硬 503 换成可用后端。此豁免在 `services/failover.rs` 模块注释中明确记录。

## 勘误：第一轮「功能采纳清单」中的 4 项系我方分析臆造，参考仓库并不存在

对参考仓库（`sample-bedrock-api-proxy`）逐项核实后确认，下列 4 项在其源码中**零匹配**，已从任务清单删除：

| 臆造项 | 核实结论 |
|---|---|
| F1 LiteLLM 价格自动同步 | `litellm` 仅作为 `uv.lock` 间接依赖出现，无任何价格同步逻辑 |
| F6 AgentCore Gateway WebSearch | 搜索 provider 只有 Tavily / Brave；"AgentCore" 仅 README 里作为部署环境提及 |
| fallback_credit 双向透传 | 全仓库零匹配（该 Anthropic beta 特性系臆造） |
| Responses API + Codex 兼容 | 无 `/v1/responses` 端点 |

> 教训：对比分析产出的「借鉴清单」必须逐项回源核对，不能凭对同类项目的先验直接列项。

## F8 / O1：OpenTelemetry 分布式追踪（暂缓，本节即设计稿）

参考实现：`app/tracing/`（8 文件：`provider/middleware/spans/attributes/context/session_store/streaming`）。工程量大，本轮决定只出设计、暂不落地。

**依赖（需评估版本与现有 `tracing` 生态兼容）：**
```toml
opentelemetry = { version = "0.24", features = ["trace"] }
opentelemetry_sdk = { version = "0.24", features = ["rt-tokio"] }
opentelemetry-otlp = { version = "0.17", features = ["grpc-tonic"] }
tracing-opentelemetry = "0.25"
```

**启用条件**：设 `OTEL_EXPORTER_OTLP_ENDPOINT` 时自动启用；未设仅走现有 `tracing` 日志。init 逻辑放 `observability/`（与 metrics 同模块树，预留 `observability/tracing.rs`）。

**Span 层次**（root = 单次业务请求）：
```
request  (attrs: gen_ai.system, gen_ai.request.model, provider, protocol, stream)
├── model_mapping.resolve
├── failover.apply            (仅在触发时创建；attrs: from/to provider+model)
├── web_tool_loop             (可选)
│   └── iteration.N           (backend_call / search / fetch / code_exec)
├── converter.request
├── backend_call              (attrs: gen_ai.response.model, usage.*)
├── converter.response
└── usage.record
```

**GenAI 语义约定属性**：`gen_ai.system`（bedrock/anthropic/…）、`gen_ai.request.model`、`gen_ai.response.model`、`gen_ai.usage.input_tokens`、`gen_ai.usage.output_tokens`、缓存 token 分维。

**Session 聚合键派生**（参考 `session_store.py`）：优先 header（如 `x-session-id`）→ 请求 metadata → 派生 `sha256(model + 首条 user 消息前缀)`。**红线**：session 是跨请求状态，若用于任何有状态行为必须绑定 API key 归属（红线 #3）；纯追踪聚合只读不写则无此要求。

**流式 span**：`async_stream::stream!` 内边转发边累积 token/usage，在流结束（`message_delta`/`[DONE]`）时 `span.set_attribute` 记录最终 usage 再 `end()`；不可在首个 chunk 就 end。

**落地顺序建议**：① OTLP init + root span 中间件（复用现有 `track_http_metrics` 的位置）→ ② backend_call span + usage 属性 → ③ web_tool / failover 子 span → ④ session 聚合。每步可独立合入。
