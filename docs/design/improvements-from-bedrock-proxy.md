# One Router 改进设计文档

> 基于 [aws-samples/sample-bedrock-api-proxy](https://github.com/aws-samples/sample-bedrock-api-proxy) 对比分析
> 日期：2026-05-09

---

## 背景

通过对比 AWS 官方 sample-bedrock-api-proxy（Python/FastAPI）与 one-router（Rust/Axum）在 Web Tools、PTC、Bedrock Service 层的实现差异，识别出以下改进方向。两个项目核心 agentic loop 逻辑相似，但在安全模型、版本契约、可观测性和高级功能覆盖上存在显著差距。

---

## 一、Web Tools（Search / Fetch）

### W1：Web Tools 提升到 Provider 路由之前（高优先级）

**现状：**
Web tools 检测位于 `handle_bedrock_request()` 内部（`src/api/messages.rs:499`），仅当请求路由到 Bedrock 后端时触发。Gemini/Anthropic/OpenAI 路径带 server tool 时被忽略。

**问题：**
- 用户请求路由到 Gemini 但带了 `web_search` tool → 原样透传给 Gemini（可能报错或被忽略）
- 与 PTC 的检测位置不一致（PTC 在 provider 路由之前全局拦截）

**方案：**
将 web tools 检测提升到 `create_message()` 中 provider 路由之前，与 PTC 同层：

```
create_message()
├── PTC 检测（已有）
├── Web Tools 检测（新增位置）
│   ├── has_server_tools() → 进入 WebToolExecutor
│   └── executor 内部根据 resolved.provider 选择后端调用
└── Provider 路由（bedrock / gemini / anthropic / openai）
```

**改动范围：**
- `src/api/messages.rs`：`create_message()` 函数
- `src/services/web_tools/executor.rs`：`run()` 方法需支持多后端（当前硬编码 BedrockService）
- `src/api/chat_completions.rs`：同步添加 web tools 支持

**注意事项：**
- WebToolExecutor 当前接收 `&BedrockService` 参数，需抽象为后端无关的调用接口
- 对于 Anthropic/OpenAI passthrough 后端，可直接透传 server tool（它们原生支持），不需要 proxy-side 执行

---

### W2：精确匹配 Tool 版本号（高优先级）

**现状：**
`is_server_tool()` 使用前缀匹配 `type.starts_with("web_search_")`，不区分版本。

**问题：**
- 未来新版本（如 `web_search_20261201`）可能有全新语义，前缀匹配会静默走旧路径
- 客户端无法感知代理实际支持的版本能力
- `web_search_20260209` 的 Dynamic Filtering 功能被静默丢失

**方案：**

```rust
// src/services/web_tools/mod.rs

const SUPPORTED_WEB_SEARCH_VERSIONS: &[&str] = &[
    "web_search_20250305",
    "web_search_20260209",
];

const SUPPORTED_WEB_FETCH_VERSIONS: &[&str] = &[
    "web_fetch_20250910",
    "web_fetch_20260209",
];

pub fn is_server_tool(tool: &serde_json::Value) -> bool {
    let tool_type = tool["type"].as_str().unwrap_or("");
    if SUPPORTED_WEB_SEARCH_VERSIONS.contains(&tool_type)
        || SUPPORTED_WEB_FETCH_VERSIONS.contains(&tool_type) {
        return true;
    }
    // 保留 name-based 检测作为 fallback（兼容不带 type 的请求）
    let name = tool["name"].as_str().unwrap_or("");
    name == "web_search" || name == "web_fetch"
}

pub fn tool_version(tool: &serde_json::Value) -> Option<&str> {
    tool["type"].as_str()
}
```

对不支持的版本返回明确错误：
```json
{"type": "error", "error": {"type": "invalid_request_error", "message": "web_search_20261201 is not supported by this proxy"}}
```

---

### W3：按版本区分执行行为 — Dynamic Filtering（中优先级）

**现状：**
所有 web_search/web_fetch 版本走同一条代码路径。

**目标行为：**
- `web_search_20250305` / `web_fetch_20250910`：标准 agentic loop（当前实现）
- `web_search_20260209` / `web_fetch_20260209`：注入 `bash_code_execution` tool + Docker sandbox

**方案：**

```rust
// executor.rs

pub async fn run(&self, request: &MessageRequest, ...) -> Result<MessageResponse, WebToolError> {
    let tools = request.tools.as_deref().unwrap_or(&[]);
    let (server_tools, client_tools) = split_tools(tools);

    let uses_dynamic_filtering = server_tools.iter().any(|t| {
        let version = t["type"].as_str().unwrap_or("");
        version == "web_search_20260209" || version == "web_fetch_20260209"
    });

    if uses_dynamic_filtering {
        self.run_with_sandbox(request, server_tools, client_tools, ...).await
    } else {
        self.run_standard(request, server_tools, client_tools, ...).await
    }
}
```

**依赖：** P6（与 PTC 共享 sandbox 基础设施）

---

### W4：伪流式输出（中优先级）

**现状：**
`WebToolExecutor::run()` 在整个 agentic loop 执行期间无输出，loop 结束后一次性返回。对于多轮搜索场景，客户端可能等待 30+ 秒无响应。

**方案：**
新增 `run_stream()` 方法，每轮 iteration 产出 SSE 事件：

```rust
pub fn run_stream(
    &self,
    request: &MessageRequest,
    bedrock: &BedrockService,
    target_model: &str,
) -> Pin<Box<dyn Stream<Item = Result<Event, Infallible>> + Send>> {
    Box::pin(async_stream::stream! {
        // 每轮 iteration 结束后 yield 当前轮的 content blocks
        for iteration in 0..self.max_iterations {
            let response = bedrock.invoke_model_messages(&modified, target_model).await?;
            // yield content_block_start / content_block_delta / content_block_stop
            for block in &response.content {
                yield format_as_sse_events(block, block_index);
            }
            // 如果没有 server tool calls，yield message_delta + message_stop
            if server_calls.is_empty() {
                break;
            }
            // 执行 tool calls，继续循环
        }
    })
}
```

---

### W5：Web Fetch 支持 Tavily Extract Provider（中优先级）

**现状：**
`ReqwestFetchProvider` 直接 HTTP GET + 自写 `strip_html()` 剥离标签。

**问题：**
- 无法处理 JS 渲染的 SPA 页面
- 不支持 PDF 内容提取
- HTML 解析质量低（简单标签剥离，不理解文档结构）

**方案：**
新增 `TavilyExtractProvider` 作为可选 fetch provider：

```rust
// src/services/web_tools/fetch.rs

pub struct TavilyExtractProvider {
    client: reqwest::Client,
    api_key: String,
}

#[async_trait]
impl FetchProvider for TavilyExtractProvider {
    async fn fetch(&self, url: &str, ...) -> Result<FetchResult, WebToolError> {
        let resp = self.client
            .post("https://api.tavily.com/extract")
            .json(&json!({"urls": [url]}))
            .send().await?;
        // 返回结构化内容（title, content, media_type）
    }
}
```

**配置：**
新增系统设置 `web_fetch_provider`：`direct`（默认，reqwest）| `tavily`（Tavily Extract，复用 web_search_api_key）

---

### W6：Citation 后处理（中优先级）

**现状：**
搜索结果以纯文本返回，模型输出的引用标记不做处理。

**目标：**
将模型输出的 `[1]`、`[2]` 等引用标记转为 Anthropic 官方 citation 格式。

**方案：**

1. 在 agentic loop 开始前注入 citation system prompt：
   ```
   When referencing search results, use [N] markers corresponding to result numbers.
   ```

2. Loop 结束后后处理 response content：
   ```rust
   fn post_process_citations(
       content: &mut Vec<ContentBlock>,
       search_results: &[SearchResult],
   ) {
       // 解析 [N] 标记
       // 转为 ContentBlock::Citation { ... } 或在 text block 中嵌入 citation 元数据
   }
   ```

3. 输出格式（Anthropic citation spec）：
   ```json
   {
     "type": "cite",
     "cited_text": "...",
     "source": {
       "type": "web_search_result_location",
       "url": "https://...",
       "title": "..."
     }
   }
   ```

---

### W7：Web Search/Fetch 共存语义确认（低优先级）

**现状：**
one-router 允许同一请求同时包含 web_search 和 web_fetch tools，在同一 executor loop 中处理。

**待确认：**
- Anthropic API spec 是否允许同时传两种 server tool？
- 如果允许，当前实现已领先 Python 版（Python 版互斥处理）
- 如果不允许，需在检测时返回错误

**建议：** 暂时保留当前设计（更灵活），但添加日志 warning 标记这种非常规用法。

---

## 二、PTC（Programmatic Tool Calling）

### P1：Owner 验证（高优先级）

**现状：**
`validate_container_id()` 仅检查 container_id 是否存在于活跃 session，不验证调用者身份。

**漏洞：**
用户 A 的请求获得 container_id 后，用户 B 可以通过 continuation 请求劫持该容器。

**方案：**

```rust
// src/services/ptc/service.rs

pub struct PtcSession {
    // ... 已有字段
    /// SHA256 hash of the API key that created this session
    pub owner_key_hash: String,
}

impl PtcService {
    pub async fn create_session(
        &self,
        tool_names: &[String],
        api_key_hash: &str,  // 新增参数
    ) -> PtcResult<String> {
        let session = PtcSession {
            owner_key_hash: api_key_hash.to_string(),
            // ...
        };
        // ...
    }

    pub async fn validate_ownership(
        &self,
        container_id: &str,
        api_key_hash: &str,
    ) -> PtcResult<()> {
        let sessions = self.sessions.read().await;
        let session = sessions.values()
            .find(|s| s.container.id == container_id)
            .ok_or(PtcError::SessionNotFound(container_id.to_string()))?;

        if session.owner_key_hash != api_key_hash {
            return Err(PtcError::PermissionDenied(
                "Container does not belong to this API key".into()
            ));
        }
        Ok(())
    }
}
```

**调用方式：**
```rust
// ptc_handler.rs - handle_ptc_continuation
let key_hash = sha256_hex(&key_info.key_hash); // 或直接用已有的 HMAC hash
ptc_svc.validate_ownership(container_id, &key_hash).await?;
```

---

### P2：Continuation 完整性（高优先级）

**现状：**
MEMORY.md 中记录："PTC continuation 重新运行代码而非维护长期 runner。需要 async runner 生命周期管理。"

**目标行为：**
1. Claude 调用 `execute_code` → sandbox 运行代码
2. 代码中调用 tool（如 `get_weather`）→ sandbox 暂停，返回 tool_call 给客户端
3. 客户端执行 tool，发送 continuation 请求带 tool_result
4. Proxy 将 tool_result 发送回 **同一个仍在运行的** sandbox runner
5. Runner 继续执行，最终返回 code output

**当前 channel-based 架构已支持这个流程：**
- `run_code_via_channel()` → 收到 `ContainerMessage::ToolCall` → 暂停
- `send_tool_results_via_channel()` → 发送结果 → 等待 `CodeOutput`

**需要补全的是 ptc_handler 中 continuation 的完整连接：**

```rust
// src/api/ptc_handler.rs

pub async fn handle_ptc_continuation(
    state: &AppState,
    request: &MessageRequest,
    target_model: &str,
    request_id: &str,
    container_id: &str,
) -> Result<MessageResponse, ApiError> {
    let ptc_svc = state.ptc_service.as_ref().unwrap();
    let session_id = ptc_svc.get_session_by_container(container_id).await
        .ok_or(ApiError::bad_request("Unknown container"))?;

    // 1. 从请求中提取 tool results
    let tool_results = extract_tool_results_from_request(request)?;

    // 2. 发送 tool results 到 sandbox runner
    let msg = ptc_svc.send_tool_results_via_channel(&session_id, &tool_results).await
        .map_err(|e| ApiError::internal_error(e.to_string()))?;

    // 3. 根据结果决定下一步
    match msg {
        ContainerMessage::CodeOutput(output) => {
            // 代码执行完成，取出保存的状态，构建 Claude continuation 请求
            let exec_state = ptc_svc.take_execution_state(&session_id).await?;
            build_final_response(state, &exec_state, &output, target_model).await
        }
        ContainerMessage::ToolCall(calls) => {
            // 又遇到 tool call，保存状态，返回给客户端
            build_tool_call_response(&calls, container_id)
        }
        _ => Err(ApiError::internal_error("Unexpected sandbox message"))
    }
}
```

---

### P3：HTTP 错误码细分（中优先级）

**现状：**
所有 PTC 错误通过 `ApiError::internal_error()` 返回 500。

**方案：**

```rust
// src/api/ptc_handler.rs 或统一错误映射

impl From<PtcError> for ApiError {
    fn from(err: PtcError) -> Self {
        match err {
            PtcError::DockerNotAvailable(_) => ApiError::service_unavailable(err.to_string()),
            PtcError::SessionNotFound(_) => ApiError::bad_request(err.to_string()),
            PtcError::SessionExpired(_) => ApiError::bad_request("PTC session expired"),
            PtcError::PermissionDenied(_) => ApiError {
                status: StatusCode::FORBIDDEN,
                error_type: "permission_error".into(),
                message: err.to_string(),
            },
            PtcError::MaxIterationsExceeded(_) => ApiError::bad_request(err.to_string()),
            PtcError::ExecutionTimeout(_) => ApiError {
                status: StatusCode::GATEWAY_TIMEOUT,
                error_type: "timeout_error".into(),
                message: err.to_string(),
            },
            _ => ApiError::internal_error(err.to_string()),
        }
    }
}
```

**新增 PtcError 变体：**
```rust
// src/services/ptc/exceptions.rs
pub enum PtcError {
    // ... 已有变体
    #[error("Permission denied: {0}")]
    PermissionDenied(String),

    #[error("Docker not available: {0}")]
    DockerNotAvailable(String),

    #[error("Execution timeout: {0}")]
    ExecutionTimeout(String),
}
```

---

### P4：Graceful Shutdown 容器清理（中优先级）

**现状：**
依赖 session 超时（270s）+ 手动 `cleanup_expired_sessions()`。进程被 SIGTERM/SIGKILL 时容器残留。

**方案：**

```rust
// src/main.rs 或 src/server/app.rs

async fn shutdown_signal(ptc_service: Option<Arc<PtcService>>) {
    tokio::signal::ctrl_c().await.ok();
    tracing::info!("Shutdown signal received, cleaning up PTC containers...");

    if let Some(ptc) = ptc_service {
        let sessions = ptc.sessions.read().await;
        for (session_id, session) in sessions.iter() {
            tracing::info!(session_id, container_id = %session.container.id, "Removing PTC container");
            let _ = ptc.sandbox().stop_and_remove(&session.container.id).await;
        }
    }
}

// Axum server with graceful shutdown
axum::serve(listener, app)
    .with_graceful_shutdown(shutdown_signal(ptc_service))
    .await?;
```

---

### P5：PTC Streaming 支持（中优先级）

**现状：**
PTC handler 返回 `Json(response)`，长代码执行期间客户端完全无反馈。

**方案：**
PTC 流程中有多个阶段可以产出 SSE 事件：

1. Claude 思考阶段（thinking blocks）
2. Claude 生成 execute_code tool call
3. Sandbox 执行中（可选：周期性 heartbeat）
4. 最终结果

```rust
pub async fn handle_ptc_request_streaming(
    state: &AppState,
    request: &MessageRequest,
    target_model: &str,
    request_id: &str,
) -> Result<MessageApiResponse, ApiError> {
    let stream = Box::pin(async_stream::stream! {
        // Phase 1: Call Claude (streaming) to get execute_code tool call
        // yield thinking + tool_use events as they arrive

        // Phase 2: Execute in sandbox
        // yield a synthetic event indicating execution started

        // Phase 3: Return result or tool_call
        // yield final content blocks
    });
    Ok(MessageApiResponse::Stream(stream))
}
```

---

### P6：与 Web Tools v2 共享 Sandbox 基础设施（中优先级）

**现状：**
PTC 有完整的 `SandboxExecutor` + `ContainerHandle` + runner.py 架构。Web tools Dynamic Filtering 需要类似能力但尚未实现。

**方案：**
抽象出通用 sandbox 接口：

```rust
// src/services/sandbox/mod.rs（新模块）

#[async_trait]
pub trait CodeExecutor: Send + Sync {
    async fn execute(&self, code: &str, language: &str) -> Result<ExecutionResult, SandboxError>;
}

pub struct ExecutionResult {
    pub stdout: String,
    pub stderr: String,
    pub exit_code: i32,
}
```

- PTC 的 `SandboxExecutor` 实现完整的 session 生命周期管理（长期 runner）
- Web tools 的 Dynamic Filtering 用轻量级一次性执行（run-and-discard）
- 两者共享 Docker image 和 container 创建逻辑

---

### P7：Standalone Code Execution 路径（低优先级）

**说明：**
Python 版支持独立于 PTC 协议的纯代码执行（无需 tool call 包装，直接执行用户提交的代码）。

**方案：**
暂时搁置。当前 PTC 协议足以覆盖 Claude Code 和 Agent SDK 的需求。如果后续有直接代码执行的需求再实现。

---

### P8：Tool Result ID 格式验证与映射（低优先级）

**现状：**
continuation 请求中的 tool_use_id 直接透传，无格式校验。

**方案：**

```rust
fn validate_tool_use_id(id: &str) -> Result<(), PtcError> {
    // 格式：toolu_<12 alphanumeric chars>
    if !id.starts_with("toolu_") || id.len() != 18 {
        return Err(PtcError::InvalidToolUseId(id.to_string()));
    }
    Ok(())
}

fn map_tool_result_ids(
    client_results: &[ToolResult],
    pending_calls: &[PendingToolCall],
) -> Result<Vec<(String, serde_json::Value)>, PtcError> {
    // 将客户端返回的 tool_use_id 映射回 sandbox 内部的 call_id
    client_results.iter().map(|r| {
        let call = pending_calls.iter()
            .find(|c| c.tool_use_id == r.tool_use_id)
            .ok_or(PtcError::UnknownToolUseId(r.tool_use_id.clone()))?;
        Ok((call.server_tool_use_id.clone().unwrap_or(r.tool_use_id.clone()), r.content.clone()))
    }).collect()
}
```

---

## 三、Bedrock Service 层

### B1：Service Tier 自动降级重试（中优先级）

**现状：**
`resolve_for_provider()` 解析出 effective tier 后直接使用，如果 Bedrock 返回 tier 不支持错误则失败。

**方案：**

```rust
// src/services/bedrock.rs

pub async fn invoke_model_messages_with_tier_fallback(
    &self,
    request: &MessageRequest,
    model_id: &str,
) -> Result<MessageResponse, BedrockError> {
    let result = self.invoke_model_messages(request, model_id).await;

    match &result {
        Err(BedrockError::ValidationError(msg))
            if msg.contains("service tier") || msg.contains("not supported") =>
        {
            tracing::warn!(
                model_id,
                "Service tier not supported, retrying with default tier"
            );
            // 构建一个 tier=None 的请求重试
            let mut fallback_request = request.clone();
            fallback_request.service_tier = None;
            self.invoke_model_messages(&fallback_request, model_id).await
        }
        _ => result,
    }
}
```

---

### B2：Beta Header 动态规则映射（低优先级）

**现状：**
客户端的 `anthropic-beta` header 直接透传给 Bedrock InvokeModel。

**Python 版做法：**
通过 DynamoDB 存储映射规则（5 分钟缓存），将客户端 beta header 值转换为 Bedrock 兼容值。

**建议：**
暂时搁置。当前透传行为已满足需求，Bedrock 会忽略不认识的 beta 值。如果未来出现需要映射转换的场景再实现。

---

## 四、可观测性

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
│   ├── Iteration 1: Bedrock call
│   ├── Iteration 1: Search execution
│   ├── Iteration 2: Bedrock call
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

## 五、多 Provider 智能路由

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
暂时搁置。当前静态 model_mapping + priority 排序已满足需求。Smart Router 属于 v2 路线图功能。

---

## 实施路线图

### Phase 1：安全 + 功能缺陷修复（1-2 周）

- [ ] P1：PTC Owner 验证
- [ ] W1：Web tools 全 provider 支持
- [ ] W2：精确版本匹配
- [ ] P3：PTC 错误码细分
- [ ] P4：Graceful Shutdown 容器清理

### Phase 2：完整性补全（2-3 周）

- [ ] P2：PTC Continuation 完整性
- [ ] B1：Service Tier 自动降级
- [ ] W4：Web tools 伪流式输出
- [ ] W5：Tavily Extract Provider

### Phase 3：体验提升（2-3 周）

- [ ] W6：Citation 后处理
- [ ] P5：PTC Streaming
- [ ] O1：OpenTelemetry 集成

### Phase 4：进阶能力（按需）

- [ ] W3：Dynamic Filtering
- [ ] P6：Sandbox 基础设施共享
- [ ] R1：跨 Provider Failover Chain
- [ ] O2：Prometheus Metrics
- [ ] P7：Standalone Code Execution
- [ ] P8：Tool Result ID 验证
- [ ] B2：Beta Header 映射
- [ ] R2：Smart Router
