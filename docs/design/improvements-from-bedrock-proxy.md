# One Router 改进设计文档

> 基于 [aws-samples/sample-bedrock-api-proxy](https://github.com/aws-samples/sample-bedrock-api-proxy) 对比分析
> 日期：2026-05-09
> 更新：2026-05-10（已实现项目移除）

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
