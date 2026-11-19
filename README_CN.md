<p align="center">
  <a href="README.md">English</a> | <a href="README_CN.md">中文</a>
</p>

<p align="center">
  <h1 align="center">One Router</h1>
  <p align="center">
    统一的 LLM API 网关 — 将 OpenAI 和 Anthropic 协议路由至 Bedrock、Gemini 等后端。
  </p>
  <p align="center">
    <a href="https://github.com/XtraVisionsAI/one-router/actions"><img src="https://github.com/XtraVisionsAI/one-router/actions/workflows/release.yml/badge.svg" alt="CI"></a>
    <a href="https://hub.docker.com/r/xtravisions/one-router"><img src="https://img.shields.io/docker/v/xtravisions/one-router?label=docker" alt="Docker"></a>
    <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License"></a>
    <img src="https://img.shields.io/badge/rust-1.75+-orange.svg" alt="Rust">
  </p>
</p>

---

One Router 是一个用 Rust 编写的高性能 API 网关，让你通过**一个端点**访问多个 LLM 提供商。使用 OpenAI 或 Anthropic SDK 格式发送请求，One Router 会自动转换协议并路由到正确的后端 — AWS Bedrock、Google Gemini 等。

## 特性

- **双协议支持** — 同时接受 OpenAI (`/v1/chat/completions`) 和 Anthropic (`/v1/messages`) 请求格式
- **多后端路由** — 路由至 AWS Bedrock、Google Gemini、Anthropic API 和 OpenAI API，自动完成协议转换
- **OpenAI Responses API** — `/v1/responses` 端点，兼容 OpenAI Responses 协议与 Codex CLI，支持命名事件 SSE 流式输出，并通过 `previous_response_id` 实现有状态多轮对话
- **Embedding 与 Rerank** — OpenAI 兼容的 `/v1/embeddings` 和 Cohere 兼容的 `/v1/rerank`，由 Bedrock 提供支持（Cohere Embed、Titan Embed、Nova Embed、Cohere Rerank）
- **文生图** — OpenAI 兼容的 `/v1/images/generations`，路由至 OpenAI DALL-E、AWS Bedrock（Stability AI SDXL、Amazon Nova Canvas、Titan Image Generator）或 Google Gemini
- **用量查询 API** — 通过 `GET /v1/usage`（按小时或模型聚合统计）和 `GET /v1/usage/records`（分页原始记录）查询自己的 token 用量和费用历史
- **智能模型映射** — 跨提供商映射模型名称（如 `gpt-4o` → Claude Sonnet、`claude-*` → Bedrock），支持精确匹配、通配符和优先级配置
- **后端池与负载均衡** — 每个后端记录是独立的服务实例，同类型多实例通过轮询、加权、随机或故障转移策略做负载均衡
- **后端模型亲和** — 每个后端可声明 `models` 过滤器（通配符 + `!` 排除，如 `["*", "!openai.*"]`），让同类型不同区域的后端各自服务不同模型
- **模型级故障转移** — 可配置的 failover 链，当主 provider 无健康凭证时自动切换到备用 provider/模型
- **Bedrock GPT-5.x（Mantle Responses）** — Bedrock 上仅支持 Responses 协议的 GPT-5.x 模型，三个对话端点全部可用：`/v1/responses` 原生透传，`/v1/messages`（Claude Code）与 `/v1/chat/completions` 一跳协议转换
- **价格自动同步** — 可选地按计划从 LiteLLM 价表同步各模型价格；手动定价的映射会被固定，不会被覆盖。Admin 界面支持从 LiteLLM 目录浏览并导入新模型映射
- **可插拔存储** — SQLite（零配置）、PostgreSQL 或 DynamoDB — 一个环境变量切换
- **API Key 管理** — 发放 API Key，支持独立的速率限制、预算上限和服务等级；Master key 仅限管理用途（不能调用业务 API）
- **Admin 会话认证** — 管理界面使用 HttpOnly cookie 会话登录，浏览器不存储任何密钥
- **流式响应** — 完整支持 OpenAI 和 Anthropic 协议的 SSE 流式传输
- **扩展思维** — 每模型扩展思维支持，含推理风格配置（Claude、Nova 2、Kimi、GPT effort 风格）
- **工具调用与 PTC** — 支持工具调用，包括带沙箱代码执行的 Programmatic Tool Calling
- **Web 搜索与抓取** — 代理侧 Web 搜索（Tavily/Brave）与页面抓取，支持 agentic loop、流式输出、引用后处理和 Dynamic Filtering（v2 工具版本支持 loop 内代码执行）
- **模型能力配置** — 在模型映射中声明每个模型支持的能力（思维、文档、工具调用、PTC）；全局默认值可通过 Settings 配置
- **Admin 管理界面** — 内置浏览器管理界面（`/admin`），可管理 API Key、后端配置、模型映射、系统设置和用量统计，无需额外工具
- **AES-256-GCM 加密** — 后端凭证静态加密存储；Admin 界面支持明文输入，保存时自动加密
- **API Key 哈希存储** — API Key 使用 HMAC-SHA256 哈希后存储；明文仅在创建时展示一次，管理界面中以中间掩码形式显示（sk-abcd....5678）
- **自更新** — 通过 CLI（`one-router update`）或 Admin API 从 GitHub Releases 检查并应用更新；仅安装经 Ed25519 签名验证的版本（无签名即拒绝，见 `scripts/release-keygen.sh`）
- **热重载** — 通过 Admin 界面修改后端配置和系统设置后即时生效，无需重启
- **CLI 配置** — 通过命令行参数覆盖任意设置（`--port`、`--database`、`--log-level`）
- **健康检查** — 内置 `/health`、`/ready`、`/liveness` 端点
- **Prometheus 指标** — `/metrics` 端点(默认需 master key;私有网络内可用 `METRICS_PUBLIC=true` 开放)，暴露请求/token/费用计数器、HTTP 时延直方图、并发请求 gauge、认证失败计数器和构建信息（API Key 永不作为 label）
- **多架构 Docker** — 提供 `linux/amd64` 和 `linux/arm64` 镜像
- **灵活部署** — Docker、AWS App Runner 或裸机部署

## 快速开始

### 方式一：Docker（推荐）

```bash
docker run -p 8000:8000 \
  -e MASTER_API_KEY=sk-your-secret \
  -e ENCRYPTION_KEY=your-64-char-hex-key \
  -v one-router-data:/app/data \
  xtravisions/one-router:latest
```

### 方式二：Docker Compose

```bash
git clone https://github.com/XtraVisionsAI/one-router.git
cd one-router
docker compose up
```

### 方式三：源码编译

```bash
git clone https://github.com/XtraVisionsAI/one-router.git
cd one-router
cargo build --release
./target/release/one-router
```

启动后（仅 debug 构建），One Router 会输出一个**临时 API Key** 供立即使用：

```
============================================================
  One Router v0.22.1
============================================================
  Database:  sqlite://./data/gateway.db
  Listen:    127.0.0.1:8000

  Ephemeral API Key (valid for this session only):
  sk-ephemeral-xxxxxxxxxxxx

  Usage:
    export ANTHROPIC_API_KEY="sk-ephemeral-xxxxxxxxxxxx"
    export ANTHROPIC_BASE_URL="http://127.0.0.1:8000"
============================================================
```

> **生产环境：** 不会生成临时 Key。通过 Admin 界面（`/admin`）使用 Master Key 登录后创建业务 API Key。

## 使用方式

将现有的 OpenAI 或 Anthropic SDK 指向 One Router 即可 — 无需修改代码。

### Anthropic SDK

```python
import anthropic

client = anthropic.Anthropic(
    api_key="sk-ephemeral-xxxxxxxxxxxx",
    base_url="http://localhost:8000",
)

message = client.messages.create(
    model="claude-sonnet-4-20250514",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Hello!"}],
)
```

### OpenAI SDK

```python
from openai import OpenAI

client = OpenAI(
    api_key="sk-ephemeral-xxxxxxxxxxxx",
    base_url="http://localhost:8000/v1",
)

response = client.chat.completions.create(
    model="gpt-4o",  # 自动路由至 Claude Sonnet
    messages=[{"role": "user", "content": "Hello!"}],
)
```

### cURL

```bash
# Anthropic 格式
curl http://localhost:8000/v1/messages \
  -H "x-api-key: sk-ephemeral-xxxxxxxxxxxx" \
  -H "content-type: application/json" \
  -H "anthropic-version: 2023-06-01" \
  -d '{"model":"claude-sonnet-4-20250514","max_tokens":1024,"messages":[{"role":"user","content":"Hello!"}]}'

# OpenAI 格式
curl http://localhost:8000/v1/chat/completions \
  -H "Authorization: Bearer sk-ephemeral-xxxxxxxxxxxx" \
  -H "content-type: application/json" \
  -d '{"model":"gpt-4o","messages":[{"role":"user","content":"Hello!"}]}'
```

### OpenAI Responses API（Codex CLI）

One Router 暴露 `/v1/responses`，即 Codex CLI 及新一代客户端使用的 OpenAI Responses 协议。请求会被翻译到与 `/v1/chat/completions` 相同的后端，因此任意 provider 均可使用。

```bash
# 非流式
curl http://localhost:8000/v1/responses \
  -H "Authorization: Bearer sk-ephemeral-xxxxxxxxxxxx" \
  -H "content-type: application/json" \
  -d '{"model":"gpt-4o","input":"写一首关于大海的俳句。"}'

# 流式 —— 命名 SSE 事件（response.created / response.output_text.delta / response.completed）
curl -N http://localhost:8000/v1/responses \
  -H "Authorization: Bearer sk-ephemeral-xxxxxxxxxxxx" \
  -H "content-type: application/json" \
  -d '{"model":"gpt-4o","input":"你好！","stream":true}'
```

多轮对话是有状态的：把上一次响应的 `id` 作为 `previous_response_id` 传入即可续接（已存储的响应绑定创建它的 API Key）。上下文仅在内存中保存 1 小时且只保存文本（图片、工具定义不保存）；整个存储已满时，优先从占用上下文最多的用户（或无归属用户的 Key）中淘汰，轻量用户的上下文得以保留；历史超过 8 MB、或 Key / 用户超出存储配额的轮次仍会正常应答，只是不被存储——以*该*响应续接会返回 not-found（改为把对话作为 `input` 重新发送）。若要让 Codex CLI 接入 One Router，将其 base URL 设为 `http://localhost:8000/v1` 并使用你的 API Key。

> **Bedrock GPT-5.x：** Bedrock 上的 GPT-5.x 模型只支持 Responses 协议（无 Converse API）。当映射目标为此类模型（`openai.gpt-5*`）时，`/v1/responses` 将原始请求透传到 Bedrock Mantle Responses 端点并原生转发 SSE，`/v1/messages` 与 `/v1/chat/completions` 则通过内置一跳协议转换调用同一模型 —— 包括 Claude Code 的思维签名往返。注意这些模型有区域限制（如 sol 仅 us-east-1/us-east-2），Bedrock 后端凭证的区域必须匹配 —— 可配合后端 `models` 过滤器让 GPT 模型只落到对应区域的后端。

### Embeddings（OpenAI SDK）

```python
from openai import OpenAI

client = OpenAI(
    api_key="sk-ephemeral-xxxxxxxxxxxx",
    base_url="http://localhost:8000/v1",
)

# OpenAI 模型名自动映射到 Bedrock Titan Embed
response = client.embeddings.create(
    model="text-embedding-3-small",
    input="你好，世界",
)
print(response.data[0].embedding)

# 也可直接使用 Bedrock 模型
response = client.embeddings.create(
    model="amazon.titan-embed-text-v2:0",
    input=["文本一", "文本二"],  # Cohere 支持批量
)
```

### Rerank（cURL）

```bash
curl http://localhost:8000/v1/rerank \
  -H "x-api-key: sk-ephemeral-xxxxxxxxxxxx" \
  -H "content-type: application/json" \
  -d '{
    "model": "rerank-english-v3.0",
    "query": "什么是机器学习？",
    "documents": [
      "机器学习是人工智能的一个子集。",
      "今天天气晴朗。",
      "深度学习使用神经网络。"
    ],
    "top_n": 2,
    "return_documents": true
  }'
```

### 文生图（OpenAI SDK）

```python
from openai import OpenAI

client = OpenAI(
    api_key="sk-ephemeral-xxxxxxxxxxxx",
    base_url="http://localhost:8000/v1",
)

# OpenAI DALL-E（透传）
response = client.images.generate(
    model="dall-e-3",
    prompt="一只猫坐在草地上",
    size="1024x1024",
    n=1,
)
print(response.data[0].url)

# AWS Bedrock — Amazon Nova Canvas（返回 base64）
response = client.images.generate(
    model="amazon.nova-canvas-v1:0",
    prompt="一只猫坐在草地上",
    size="1024x1024",
    response_format="b64_json",
)
print(response.data[0].b64_json[:40], "...")

# Google Gemini（返回 base64）
response = client.images.generate(
    model="gemini-2.0-flash-preview-image-generation",
    prompt="一只猫坐在草地上",
    response_format="b64_json",
)
print(response.data[0].b64_json[:40], "...")
```

> **注意：** Bedrock 和 Gemini 后端仅支持 `response_format=b64_json`。对这两个后端请求 `url` 格式会返回 `400 Bad Request`。OpenAI 透传支持 `url` 和 `b64_json` 两种格式。

### 用量查询 API

查询自己 API Key 的 token 用量统计，需携带 API Key。

```bash
# 按小时聚合（默认）
curl "http://localhost:8000/v1/usage" \
  -H "x-api-key: sk-ephemeral-xxxxxxxxxxxx" | jq .

# 按模型聚合
curl "http://localhost:8000/v1/usage?group_by=model" \
  -H "x-api-key: sk-ephemeral-xxxxxxxxxxxx" | jq .

# 指定时间范围
curl "http://localhost:8000/v1/usage?start_time=2026-03-01T00:00:00Z&group_by=model" \
  -H "x-api-key: sk-ephemeral-xxxxxxxxxxxx" | jq .

# 分页原始请求记录（需提供 start_time 或 before_id）
curl "http://localhost:8000/v1/usage/records?start_time=2026-03-24T00:00:00Z&limit=50" \
  -H "x-api-key: sk-ephemeral-xxxxxxxxxxxx" | jq .
```

**`GET /v1/usage` 响应示例：**
```json
{
  "object": "list",
  "data": [
    {
      "group_key": "2026-03-24T15",
      "input_tokens": 12000,
      "output_tokens": 3400,
      "cached_tokens": 800,
      "cache_write_tokens": 0,
      "total_cost": 0.45,
      "total_requests": 10,
      "error_requests": 1
    }
  ],
  "summary": {
    "total_requests": 10,
    "total_input_tokens": 12000,
    "total_output_tokens": 3400,
    "total_cached_tokens": 800,
    "total_cost": 0.45,
    "budget_used_mtd": 4.50,
    "monthly_budget": 100.0
  }
}
```

**`GET /v1/usage` 查询参数：**

| 参数 | 取值 | 说明 |
|---|---|---|
| `start_time` | RFC3339 | 起始时间 |
| `end_time` | RFC3339 | 结束时间 |
| `group_by` | `hour`（默认）\| `model` | 聚合维度 |

**`GET /v1/usage/records` 查询参数：**

| 参数 | 取值 | 说明 |
|---|---|---|
| `start_time` | RFC3339 | **必填**（或提供 `before_id`） |
| `limit` | 1–1000（默认 100） | 每页记录数 |
| `before_id` | 整数 | 翻页游标（使用上一页最后一条记录的 `id`） |

## Admin 管理界面

One Router 内置了一个 Admin 管理界面，访问地址：**`/admin`**。在浏览器中打开，使用 master key 或临时 key（debug 构建）登录。登录后使用 HttpOnly cookie 会话认证，浏览器中不存储任何密钥。登录按客户端地址限流：每 15 分钟最多 10 次失败；达到上限后该地址的尝试直接返回 429，不再校验密钥。部署在反向代理后面时请设置 `TRUSTED_PROXY_CIDRS`，否则所有客户端共用同一个限流桶。通过 `x-api-key` / `Authorization: Bearer` 向 `/admin/api/*` 与 `/metrics` 发送 master key 的请求共用同一组限流桶：只有错误的密钥计数（未携带密钥或携带有效会话 cookie 的请求不计数），正确的密钥只退还自己这一次的计数，不会清空其他客户端的失败记录。主密钥为**强密钥**时（随机生成的明文密钥，或任意 `sha256:` 哈希——`hash-key` 默认拒绝弱密钥，除非加 `--allow-weak`），即使限流桶已满，正确的密钥仍会放行，因此与你共用代理地址的人无法锁住管理界面、脚本调用或 Prometheus 抓取。弱的明文主密钥仍保持严格锁定。

| 页面 | 功能 |
|---|---|
| **Dashboard** | 概览：后端健康状态、API Key 数量、运行时长 |
| **API Keys** | 创建 Key（明文仅展示一次）、编辑速率限制和预算、停用 / 激活 |
| **Backends** | 新增 / 编辑后端（Gemini、Anthropic、OpenAI、Bedrock）— 明文输入凭证，保存时自动加密；可选的模型过滤器 |
| **Model Maps** | 管理源模型 → 目标模型映射规则、优先级、定价和每模型能力配置；从 LiteLLM 价表导入模型 |
| **Usage** | 按 API Key、时间范围和分组方式查询用量统计 |
| **Settings** | 配置默认模型能力（工具调用、思维、文档、PTC）、速率限制和缓存行为。修改即时生效 |

点击侧栏底部的**版本号**可检查更新、应用更新或查看 GitHub 上的更新日志。

管理界面使用 Vue 3 + Naive UI + Vite 构建，编译为静态资源后通过 rust-embed 直接嵌入二进制文件中（无需单独部署）。

## 配置

One Router 使用环境变量配置基础设施。所有运行时设置存储在数据库（`system_settings` 表）中，可通过 Admin 管理界面管理。

| 变量 | 默认值 | 说明 |
|---|---|---|
| `DATABASE` | `sqlite://./data/gateway.db` | 存储后端 URI，支持 `sqlite://`、`postgres://`、`dynamodb://` |
| `PORT` | `8000` | HTTP 监听端口 |
| `HOST` | `127.0.0.1`(`CONTAINER=true` 时为 `0.0.0.0`) | HTTP 绑定地址。裸机默认只监听本机;仅在防火墙 / TLS 反向代理之后才设置 `HOST=0.0.0.0` |
| `METRICS_PUBLIC` | `false` | `/metrics` 免鉴权。默认需要 master key(`authorization: Bearer <MASTER_API_KEY>`)或管理会话 |
| `TRUSTED_PROXY_CIDRS` | _(空)_ | 受信反向代理的 CIDR(逗号分隔),仅来自这些地址的 `X-Forwarded-For` 用于确定客户端 IP(IP 白名单、审计日志、Admin 登录限流)。受信代理转发的链格式错误/含非 ASCII 字符时,客户端视为**未知**(IP 白名单拒绝);完全没有该头时取代理自身地址。部署在代理后面时请务必设置,否则所有客户端共用代理的登录限流桶(会记录一次警告) |
| `LOG_LEVEL` | `info` | 日志级别：`trace`、`debug`、`info`、`warn`、`error` |
| `MASTER_API_KEY` | _(自动生成)_ | 管理专用 API Key — 用于 `/admin` 界面登录和管理 API，不能调用 `/v1/*` 业务端点。可填明文**或 `sha256:<hex>`**（只做比对，网关无需明文）。来自 `.env` 的强明文密钥在启动时被替换为哈希；首次生成只保存哈希并在终端显示一次。`one-router reset-master-key` / `one-router hash-key`。部署脚本只部署哈希 |
| `ENCRYPTION_KEY` | _(自动生成)_ | AES-256 密钥，用于凭证加密和 API Key HMAC。明文（启动时告警）或在启动时解析的 provider 引用（失败即退出）：`aws-kms:<region>:<base64>`（通过实例/任务/Pod 角色调用 KMS Decrypt，加密上下文 `app=one-router,purpose=ENCRYPTION_KEY`）、`vault-transit:<key>:<vault:v1:…>`（`VAULT_ADDR` + `VAULT_TOKEN` 或 `VAULT_K8S_ROLE`）、`systemd-creds:<name>`（TPM 绑定）、`raw:<key>`。未知的 `scheme:` 前缀直接退出。用 `one-router wrap-key --provider aws-kms\|vault-transit\|systemd-creds --key …` 生成（包装的是同一个密钥，已有数据不受影响） |
| `SEED_DEFAULTS` | `empty` | 启动时何时植入默认模型映射：`off`（从不）、`empty`（仅当映射表为空 — 用户删除不会被复活）或 `missing`（每次启动补齐缺失的默认项） |
| `MAX_BODY_SIZE_MB` | `64` | HTTP 请求体大小上限（MB）。长会话的 Codex / Claude Code 会把完整对话放在单个请求里。前置反向代理的限制（如 nginx `client_max_body_size`）需与此值对齐 |
| `BEDROCK_ALLOWED_PROFILES` | _(未设置=不限)_ | Bedrock 后端允许引用的 AWS profile（逗号分隔）。引用其它 profile 的后端写入时被拒绝、加载时被跳过 |
| `BEDROCK_ALLOW_DEFAULT_CREDENTIALS` | `true` | 是否允许未配置密钥/profile 的 Bedrock 后端使用主机默认凭证链（环境变量 / 实例角色 / SSO 缓存）。设为 `false` 可防止通过管理 API 借用网关自身身份 |
| `ADMIN_COOKIE_INSECURE` | _(未设置)_ | 去掉 `admin_session` cookie 的 `Secure` 标志（非 localhost 的纯 HTTP 管理访问）。有 TLS 时不要设置 |
| `OUTBOUND_PROXY` | `off` | SSRF 防护抓取所用的出站代理：`off` / `env`（使用 `HTTPS_PROXY` / `HTTP_PROXY` / `NO_PROXY`）/ 显式 `http://` 或 `https://` 代理 URL（可带认证信息，不会写入日志；不支持 SOCKS）/ 不带 scheme 的 `host:port`（必须写端口；`env` 模式下 `HTTPS_PROXY=proxy.corp` 这种不带端口的写法按 curl 的规则视为 `http://proxy.corp:80`）。布尔样式的值（`on`、`true`、`1`、`yes`、`enabled` 等）启动时直接报错 —— 请使用 `env` 或 URL。各上游 provider 客户端（Bedrock / Gemini / OpenAI / Anthropic / Tavily / Brave）本就遵循 `HTTPS_PROXY` |
| `OUTBOUND_PROXY_SCOPE` | `admin` | `admin`：价格同步、LiteLLM 目录/导入、预算 webhook。`all`：另含 web_fetch 直连抓取与图片 URL 内联（用户提供的 URL — 代理必须拒绝内网地址段） |
| `PTC_MAX_SESSIONS_PER_USER` | `8` | 单个用户（其全部 key 合计）并发 PTC 会话及动态过滤代码执行上限；超出 → 429 |

**首次运行行为：**
- **裸机部署：** 缺失的 `MASTER_API_KEY` 或 `ENCRYPTION_KEY` 会自动生成并保存到 `.env` 文件。
- **Docker：** 必须通过 `-e` 参数显式提供，否则容器将拒绝启动。

CLI 参数优先于环境变量：`one-router --port 9000 --database postgres://...`

### 通过代理出网

在内网或中国大陆等只能经 HTTP(S) 代理访问互联网的环境中，各 provider 客户端已经使用
`HTTPS_PROXY`。而带 SSRF 防护的抓取（价格同步、LiteLLM 导入、预算 webhook、web_fetch、
图片 URL）默认不走代理 —— 代理会自行解析域名，绕过网关连接时的 DNS 校验 —— 设置了
`HTTPS_PROXY` 时启动日志会给出提示。需要显式开启：

```bash
OUTBOUND_PROXY=env            # 或 OUTBOUND_PROXY=http://user:pass@proxy.corp:3128
OUTBOUND_PROXY_SCOPE=admin    # 或 all（同时覆盖 web_fetch 与图片 URL）
```

走代理的请求仍执行静态 URL 校验（scheme、IP 字面量、禁用主机名，含 `*.localhost`）和本地 DNS
预检（解析到内网 / 元数据地址 → 拒绝；本地解析失败 → 对公网形态的域名放行，因为可能只有代理能解析，
但对代理可能解析到内部服务的名字**拒绝**：单标签主机名、`*.local` / `*.internal` / `*.corp` /
`*.lan` / `*.home` / `*.home.arpa` / `*.intranet` / `*.localdomain` / `*.private`，以及
`*.nip.io` / `*.sslip.io` / `*.xip.io` / `*.traefik.me` / `*.localtest.me` / `lvh.me` 这类在域名中
嵌入 IP 的通配 DNS 服务（一律拒绝）），重定向仍逐跳手动校验。对用户提供的 URL，被拒绝的目标与无法
解析的域名返回同一个通用错误 `destination not allowed`（细节只写入网关日志）。
`OUTBOUND_PROXY_SCOPE=all` 时**代理是用户 URL 的最后一道防线**，必须拒绝内网目标，例如：

```
# squid.conf — deny private / link-local / metadata destinations
acl private_dst dst 10.0.0.0/8 172.16.0.0/12 192.168.0.0/16 127.0.0.0/8
acl private_dst dst 169.254.0.0/16 100.64.0.0/10 0.0.0.0/8
acl private_dst dst fc00::/7 fe80::/10 ::1
http_access deny private_dst
http_access deny CONNECT private_dst
```

```yaml
# Clash rules — reject private destinations before the proxy group
rules:
  - IP-CIDR,10.0.0.0/8,REJECT,no-resolve
  - IP-CIDR,172.16.0.0/12,REJECT,no-resolve
  - IP-CIDR,192.168.0.0/16,REJECT,no-resolve
  - IP-CIDR,127.0.0.0/8,REJECT,no-resolve
  - IP-CIDR,169.254.0.0/16,REJECT,no-resolve
  - IP-CIDR,100.64.0.0/10,REJECT,no-resolve
  - IP-CIDR6,fc00::/7,REJECT,no-resolve
  - IP-CIDR6,::1/128,REJECT,no-resolve
  - MATCH,PROXY
```
Use rules that match the **resolved** destination (Clash: without `no-resolve` on
domain traffic the proxy resolves the name first; keep `IP-CIDR` rules before any
`DOMAIN` / `MATCH` rule).

### 存储后端

```bash
# SQLite（默认，零配置）
DATABASE=sqlite://./data/gateway.db

# PostgreSQL
DATABASE=postgres://user:pass@host/db

# DynamoDB
DATABASE=dynamodb://us-east-1
```

### 后端配置

后端凭证通过 Admin 管理界面（`/admin` -> Backends 页面）管理。凭证使用 AES-256-GCM 静态加密存储。

Bedrock 后端支持显式 access key、命名 AWS profile（含 SSO）或默认凭证链（环境变量、EC2/ECS 实例角色）— 所有凭证形式在全部请求路径上可用，包括 GPT 模型的 Mantle 端点。

每个后端可选声明一个**模型过滤器** — 与目标模型 ID 匹配的通配符模式列表，`!` 前缀表示排除。这让同类型不同区域的后端按模型分流，例如：

- `bedrock-ap-northeast-1`：`["*", "!openai.*"]` — 服务除 GPT 外的所有模型
- `bedrock-us-east-1`：`["openai.gpt-5*"]` — 专供 GPT-5.x（仅存在于美国区域）

过滤器为空表示服务所有模型。排除规则始终优先；符合条件的后端中优先选择匹配最精确的一组，组内做负载均衡。

## 架构

```
                    ┌─────────────────────────────────────┐
                    │            One Router                │
                    │                                      │
  OpenAI SDK ──────►  /v1/chat/completions               │
                    │       │                              │
                    │       ├──► 转换器 ──► Bedrock       │──► AWS Bedrock
                    │       ├──► 转换器 ──► Gemini        │──► Google Gemini
                    │       ├──► 转换器 ──► Anthropic     │──► Anthropic API
                    │       └──► 透传 ────► OpenAI        │──► OpenAI API
                    │                                      │
  Anthropic SDK ───►  /v1/messages                       │
                    │       │                              │
                    │       ├──► 转换器 ──► Bedrock       │──► AWS Bedrock
                    │       ├──► 转换器 ──► Gemini        │──► Google Gemini
                    │       ├──► 透传 ────► Anthropic     │──► Anthropic API
                    │       └──► 转换器 ──► OpenAI        │──► OpenAI API
                    │                                      │
  OpenAI SDK ──────►  /v1/embeddings                     │──► AWS Bedrock
  Cohere SDK ──────►  /v1/rerank                         │──► AWS Bedrock
  OpenAI SDK ──────►  /v1/images/generations             │──► OpenAI / Bedrock / Gemini
  Codex CLI ───────►  /v1/responses                      │──► （翻译到 chat 后端，或 Mantle 透传）
                    │                                      │
               ─────►  GET /v1/usage                     │  （用量聚合统计）
               ─────►  GET /v1/usage/records             │  （分页原始记录）
               ─────►  GET /metrics                       │  （Prometheus 指标）
                    │                                      │
  浏览器 ──────────►  GET /admin                         │  （Admin 管理界面）
               ─────►  /admin/api/*                      │  （Admin REST API）
                    │                                      │
                    │  ┌───────────────────────────────┐  │
                    │  │ 认证 · 限流 · 预算管理        │  │
                    │  │ 模型映射 · 后端池             │  │
                    │  │ 用量追踪                      │  │
                    │  └───────────────────────────────┘  │
                    │                                      │
                    │  存储: SQLite / PG / DynamoDB        │
                    └─────────────────────────────────────┘
```

## 模型映射

One Router 内置了预配置的模型映射，所有映射存储在数据库中，可自行定制。

### 对话 / 补全模型

| 源模型 | 目标 | 提供商 |
|---|---|---|
| `claude-sonnet-4-*` | `global.anthropic.claude-sonnet-4-*` | Bedrock |
| `claude-opus-4-*` | `global.anthropic.claude-opus-4-*` | Bedrock |
| `claude-haiku-4-*` | `global.anthropic.claude-haiku-4-*` | Bedrock |
| `claude-3-5-sonnet-*` | `anthropic.claude-3-5-sonnet-*` | Bedrock |
| `gpt-4o` | Claude Sonnet 4.6 | Bedrock |
| `gpt-4o-mini` | Claude Haiku 4.5 | Bedrock |
| `gpt-3.5-turbo` | Claude Haiku 4.5 | Bedrock |
| `o1` / `o1-preview` | Claude Opus 4.6 | Bedrock |
| `gemini-2.5-*` | Gemini 2.5 * | Gemini |
| `gemini-2.0-*` | Gemini 2.0 * | Gemini |

### Embedding 模型（`/v1/embeddings`）

| 源模型 | 目标 | 提供商 |
|---|---|---|
| `cohere.embed-english-v3` | 直通 | Bedrock |
| `cohere.embed-multilingual-v3` | 直通 | Bedrock |
| `amazon.titan-embed-text-v2:0` | 直通 | Bedrock |
| `amazon.titan-embed-text-v1` | 直通 | Bedrock |
| `text-embedding-3-small` | Titan Embed Text v2 | Bedrock |
| `text-embedding-3-large` | Titan Embed Text v2 | Bedrock |
| `text-embedding-ada-002` | Titan Embed Text v2 | Bedrock |

### Rerank 模型（`/v1/rerank`）

| 源模型 | 目标 | 提供商 |
|---|---|---|
| `cohere.rerank-v3-5:0` | 直通 | Bedrock |
| `rerank-english-v3.0` | Cohere Rerank v3.5 | Bedrock |
| `rerank-multilingual-v3.0` | Cohere Rerank v3.5 | Bedrock |

### 图像生成模型（`/v1/images/generations`）

| 源模型 | 目标 | 提供商 |
|---|---|---|
| `dall-e-3` | 直通 | OpenAI |
| `dall-e-2` | 直通 | OpenAI |
| `stability.stable-diffusion-xl-v1` | 直通 | Bedrock |
| `amazon.nova-canvas-v1:0` | 直通 | Bedrock |
| `amazon.titan-image-generator-v2:0` | 直通 | Bedrock |
| `gemini-2.0-flash-preview-image-generation` | 直通 | Gemini |

Bedrock 和 Gemini 仅返回 `b64_json` 格式；OpenAI 透传同时支持 `url` 和 `b64_json`。

### 模型定价

每条映射包含按每百万 token 计的价格（`input_price`、`output_price`、`cache_read_price`、`cache_write_price`），以及三个非 token 价格（美元，默认 0）：

| 字段 | 计费方式 | 适用端点 |
|---|---|---|
| `price_per_request` | 每次调用一次 | `/v1/images/generations`、`/v1/rerank`（token 计费端点忽略此字段） |
| `price_per_image` | 按实际返回的图像张数 | `/v1/images/generations` |
| `price_per_search_unit` | 按搜索单元：一次查询最多 100 个文档（101–200 个文档 = 2 个单元）；query + 文档超过 500 token 的文档按 500 token 切块，每块计为一个文档（`ceil(Σ ceil((query + 文档ᵢ token) / 500) / 100)`，至少 1，token 为估算值） | `/v1/rerank` |

费用 = token 费用 + 非 token 费用，再乘以调用方的费率（user × team）。图像生成把 prompt 记为输入 token，rerank 把 query + 文档记为输入 token——两者都只按映射自身的输入价计费（不使用默认 token 价兜底）。预置的 Cohere Rerank 3.5 映射为每搜索单元 `$0.002`（Bedrock：每千次查询 $2.00）；图像映射需先设置价格才会产生费用——有预算的 key 调用未定价的图像/rerank 映射时会记录一次警告。`budget_enforcement = precharge` 时，图像请求预扣 `price_per_image × n`（默认 1），rerank 预扣其搜索单元费用。

LiteLLM 价格同步与导入会从价表填充这些字段：`image_generation` 条目的 `output_cost_per_image` → `price_per_image`，`rerank` 条目的 `input_cost_per_query` → `price_per_search_unit`，`input_cost_per_request` → `price_per_request`。尺寸/质量变体（`hd/1024-x-1024/dall-e-3`、`…/50-steps/…`、按像素计价）以及按 token 计价的图像模型（`gpt-image-1`）不会导入——请手动设置价格（并将映射标记为 `manual`）。

通配符兜底规则（`claude-*`、`gpt-*`、`gemini-*`、`o1-*`）确保未知模型变体也能被正确路由。

### 模型能力配置

每条映射声明了目标模型支持的功能，用于控制请求中哪些内容会被转发。

| 字段 | 默认值 | 说明 |
|---|---|---|
| `thinking.enabled` | false | 是否转发扩展思维 / 推理请求 |
| `thinking.style` | `claude` | 思维表达方式：`claude`（原生）、`nova2`、`kimi` 或 `effort`（GPT-OSS / o 系列的 reasoning effort） |
| `document.enabled` | false | 是否转发文档内容块 |
| `tool_use.enabled` | false | 是否转发工具定义 |
| `ptc.enabled` | false | 是否启用 Programmatic Tool Calling |

预置映射已配置合理默认值：Claude 模型支持全部能力，Gemini 模型禁用思维，Embedding/Rerank 模型禁用所有能力。

对于没有显式能力配置的模型映射，将使用 **Settings -> 默认能力** 中的值作为兜底（可配置）。修改即时生效。

## 项目结构

```
src/
├── api/                 # HTTP 处理器（messages、chat_completions、responses、embeddings、rerank、images、models、usage、health、admin）
├── config/              # 配置与 AWS 设置
├── converters/          # 协议转换器（Anthropic/OpenAI ↔ Bedrock/Gemini/OpenAI/Anthropic；Responses ↔ Chat）
├── database/            # 存储后端（SQLite、PostgreSQL、DynamoDB）
│   ├── sqlite/
│   ├── postgres/
│   └── dynamodb/
├── error/               # 错误类型
├── middleware/           # 认证与限流中间件
├── observability/       # Prometheus 指标注册表与 /metrics
├── schemas/             # 请求/响应 Schema（Anthropic、OpenAI、Responses、Bedrock、Gemini、Embeddings、Rerank、Images）
├── server/              # 应用启动、路由、状态管理
├── services/            # 业务逻辑
│   ├── backend_pool/    # 后端实例池与负载均衡
│   ├── ptc/             # Programmatic Tool Calling（沙箱执行）
│   ├── web_tools/       # Web 搜索、抓取和 Dynamic Filtering（agentic loop）
│   ├── bedrock.rs       # AWS Bedrock 服务（Claude 用 InvokeModel；非 Claude 用 Converse；GPT-5.x 用 Mantle Responses）
│   ├── gemini.rs        # Google Gemini 服务
│   ├── passthrough.rs   # Anthropic & OpenAI 透传服务
│   ├── failover.rs      # 模型级凭证耗尽故障转移
│   ├── pricing_sync.rs  # LiteLLM 价表同步
│   ├── responses_context.rs # Responses 对话内存存储
│   ├── model_mapping.rs # 模型解析与缓存
│   └── usage_tracker.rs # 用量与成本追踪
└── utils/
static/
└── admin/               # Admin 管理界面构建产物（通过 rust-embed 嵌入二进制）
    ├── index.html
    └── assets/          # Vite 编译的 JS/CSS 分块
docker/
├── Dockerfile           # 多阶段构建
├── Dockerfile.prebuilt  # 预编译二进制（CI 使用）
└── Dockerfile.release   # 发布构建
scripts/
├── deploy-apprunner.sh  # AWS App Runner 部署
├── docker-publish.sh    # Docker 镜像发布
└── ...
```

## 部署

### Docker

```bash
docker run -d \
  -p 8000:8000 \
  -e DATABASE=sqlite:///app/data/gateway.db \
  -e MASTER_API_KEY=sk-your-secret \
  -e ENCRYPTION_KEY=your-64-char-hex-key \
  -v one-router-data:/app/data \
  xtravisions/one-router:latest
```

### Docker Compose + DynamoDB

```bash
docker compose --profile dynamodb up
```

### AWS App Runner

```bash
# 默认：通过 ECR Pull Through Cache 从 DockerHub 拉取
./scripts/deploy-apprunner.sh --create

# 指定 DockerHub 镜像（Apple Silicon 上需指定 --platform）
./scripts/deploy-apprunner.sh --image xtravisions/one-router:latest --platform linux/amd64 --create

# 本地构建并推送到 ECR
./scripts/deploy-apprunner.sh --build --platform linux/amd64 --create

# 指定区域、数据库和 AWS profile
./scripts/deploy-apprunner.sh --profile prod -r ap-northeast-1 \
  --database dynamodb://ap-northeast-1 --create

# 直接传入密钥（否则部署后在 AWS Console 中设置）
./scripts/deploy-apprunner.sh --create \
  --master-api-key sk-your-secret --encryption-key your-aes256-key
```

运行 `./scripts/deploy-apprunner.sh --help` 查看完整选项。

## 升级

升级采用**停机升级（stop-the-world）**：同一数据库同一时间只运行一个版本（不支持滚动升级），回滚即恢复数据库备份。

1. 停止所有 one-router 实例。
2. 备份数据库（复制 SQLite 文件、`pg_dump`，或 DynamoDB 按需备份）。
3. 使用**新版本**二进制 / 镜像，以及相同的 `DATABASE` + `ENCRYPTION_KEY`（来自 `.env`、环境变量或 `-d` / `--encryption-key`），预览存储密钥迁移：
   ```bash
   one-router migrate-secrets --dry-run
   ```
4. 执行迁移：
   ```bash
   one-router migrate-secrets
   ```
   每个变更行输出一行（`backend <name>: v1 → v2`、`setting <key>: plaintext → v2`、`… decrypt failed (skipped)`）以及汇总——绝不输出密钥值。命令是幂等的（"Nothing to migrate"），若有任何行无法解密（`ENCRYPTION_KEY` 错误，或值损坏 / 被复制到其他行）则以非零退出码结束。数据库必须已存在（SQLite 路径不存在时直接报错，不会创建空文件）。`--dry-run` 严格只读：以只读方式打开数据库，不执行任何表结构迁移或回填；若表结构过旧无法直接读取，dry run 会说明原因并以非零退出码结束——此时直接执行第 4 步。不带 `--dry-run` 时，命令会先执行与启动时相同的表结构迁移与回填（不写入默认模型映射），再重新加密。（直接启动新版本服务也会迁移表结构，但随后会因旧格式密钥而拒绝启动。）
5. 启动新版本。

已存储的后端凭证与敏感设置必须是当前的 `encrypted:v2:` 格式：只要仍有明文或旧版 v1 数据，服务就会拒绝启动，并列出受影响的后端名 / 设置键。回滚 = 停机、恢复第 2 步的备份、启动旧版本。

Docker：`docker run --rm -e DATABASE=… -e ENCRYPTION_KEY=… -v one-router-data:/app/data xtravisions/one-router:<tag> one-router migrate-secrets --dry-run`（镜像的默认命令是 `one-router`，需显式写出）。

**CLI 命令：**

| 命令 | 说明 |
|---|---|
| `one-router` | 运行服务 |
| `one-router update [--check]` | 检查 / 应用已签名的自更新（裸机） |
| `one-router migrate-secrets [--dry-run]` | 将明文 / v1 存储密钥重新加密为 v2（需停机） |
| `one-router reset-master-key [--no-write]` | 生成新主密钥并仅显示一次；`.env` 中只保存其 SHA-256 |
| `one-router hash-key [--allow-weak]` | 从 stdin 读取密钥 → `sha256:<hex>`（用于 `MASTER_API_KEY`）；弱密钥默认拒绝，除非加 `--allow-weak` |
| `one-router wrap-key --provider aws-kms\|vault-transit\|systemd-creds` | 用密钥提供方包装 `ENCRYPTION_KEY` |

## 开发

```bash
# 本地运行
cargo run

# 调试日志运行
LOG_LEVEL=debug cargo run

# 使用 CLI 参数覆盖配置
one-router --port 9000 --database postgres://localhost/mydb

# 检查更新
one-router update --check

# 应用更新
one-router update

# 运行测试
cargo test

# 交叉编译 Linux
cargo install cross
cross build --release --target aarch64-unknown-linux-gnu
```

## 许可证

[MIT](LICENSE)
