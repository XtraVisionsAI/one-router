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
- **Embedding 与 Rerank** — OpenAI 兼容的 `/v1/embeddings` 和 Cohere 兼容的 `/v1/rerank`，由 Bedrock 提供支持（Cohere Embed、Titan Embed、Nova Embed、Cohere Rerank）
- **文生图** — OpenAI 兼容的 `/v1/images/generations`，路由至 OpenAI DALL-E、AWS Bedrock（Stability AI SDXL、Amazon Nova Canvas、Titan Image Generator）或 Google Gemini
- **用量查询 API** — 通过 `GET /v1/usage`（按小时或模型聚合统计）和 `GET /v1/usage/records`（分页原始记录）查询自己的 token 用量和费用历史
- **智能模型映射** — 跨提供商映射模型名称（如 `gpt-4o` → Claude Sonnet、`claude-*` → Bedrock），支持精确匹配、通配符和优先级配置
- **后端池与负载均衡** — 每个后端记录是独立的服务实例，同类型多实例通过轮询、加权、随机或故障转移策略做负载均衡
- **可插拔存储** — SQLite（零配置）、PostgreSQL 或 DynamoDB — 一个环境变量切换
- **API Key 管理** — 发放 API Key，支持独立的速率限制、预算上限和服务等级
- **流式响应** — 完整支持 OpenAI 和 Anthropic 协议的 SSE 流式传输
- **扩展思维** — 每模型扩展思维支持，含推理风格配置（Claude、Nova 2、Kimi）
- **工具调用与 PTC** — 支持工具调用，包括带沙箱代码执行的 Programmatic Tool Calling
- **模型能力配置** — 在模型映射中声明每个模型支持的能力（思维、文档、工具调用、PTC）；全局默认值可通过 Settings 配置
- **Admin 管理界面** — 内置浏览器管理界面（`/admin`），可管理 API Key、后端配置、模型映射、系统设置和用量统计，无需额外工具
- **AES-256-GCM 加密** — 后端凭证静态加密存储；Admin 界面支持明文输入，保存时自动加密
- **API Key 哈希存储** — API Key 使用 HMAC-SHA256 哈希后存储；明文仅在创建时展示一次，管理界面中以中间掩码形式显示（sk-abcd....5678）
- **自更新** — 通过 CLI（`one-router update`）或 Admin API 从 GitHub Releases 检查并应用更新
- **热重载** — 通过 Admin 界面修改后端配置和系统设置后即时生效，无需重启
- **CLI 配置** — 通过命令行参数覆盖任意设置（`--port`、`--database`、`--log-level`）
- **健康检查** — 内置 `/health`、`/ready`、`/liveness` 端点
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

启动后，One Router 会输出一个**临时 API Key** 供立即使用：

```
============================================================
  One Router v0.13.0
============================================================
  Database:  sqlite://./data/gateway.db
  Listen:    0.0.0.0:8000

  Ephemeral API Key (valid for this session only):
  sk-ephemeral-xxxxxxxxxxxx

  Usage:
    export ANTHROPIC_API_KEY="sk-ephemeral-xxxxxxxxxxxx"
    export ANTHROPIC_BASE_URL="http://0.0.0.0:8000"
============================================================
```

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

```

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

One Router 内置了一个 Admin 管理界面，访问地址：**`/admin`**。在浏览器中打开，使用 master key 或临时 key 登录。

| 页面 | 功能 |
|---|---|
| **Dashboard** | 概览：后端健康状态、API Key 数量、运行时长 |
| **API Keys** | 创建 Key（明文仅展示一次）、编辑速率限制和预算、停用 / 激活 |
| **Backends** | 新增 / 编辑后端（Gemini、Anthropic、OpenAI、Bedrock）— 明文输入凭证，保存时自动加密 |
| **Model Maps** | 管理源模型 → 目标模型映射规则、优先级、定价和每模型能力配置 |
| **Usage** | 按 API Key、时间范围和分组方式查询用量统计 |
| **Settings** | 配置默认模型能力（工具调用、思维、文档、PTC）、速率限制和缓存行为。修改即时生效 |
| **Update** | 检查更新、查看发布说明、应用更新 |

管理界面直接嵌入二进制文件中（无需单独部署），使用纯 HTML + CSS + 原生 JS 实现，无需任何构建步骤。

## 配置

One Router 使用环境变量配置基础设施。所有运行时设置存储在数据库（`system_settings` 表）中，可通过 Admin 管理界面管理。

| 变量 | 默认值 | 说明 |
|---|---|---|
| `DATABASE` | `sqlite://./data/gateway.db` | 存储后端 URI，支持 `sqlite://`、`postgres://`、`dynamodb://` |
| `PORT` | `8000` | HTTP 监听端口 |
| `HOST` | `0.0.0.0` | HTTP 绑定地址 |
| `LOG_LEVEL` | `info` | 日志级别：`trace`、`debug`、`info`、`warn`、`error` |
| `MASTER_API_KEY` | _(自动生成)_ | 管理员 API Key — 裸机首次运行时自动生成并保存到 `.env` |
| `ENCRYPTION_KEY` | _(自动生成)_ | AES-256 密钥，用于凭证加密和 API Key HMAC — 首次运行时自动生成 |

**首次运行行为：**
- **裸机部署：** 缺失的 `MASTER_API_KEY` 或 `ENCRYPTION_KEY` 会自动生成并保存到 `.env` 文件。
- **Docker：** 必须通过 `-e` 参数显式提供，否则容器将拒绝启动。

CLI 参数优先于环境变量：`one-router --port 9000 --database postgres://...`

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
                    │                                      │
               ─────►  GET /v1/usage                     │  （用量聚合统计）
               ─────►  GET /v1/usage/records             │  （分页原始记录）
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

通配符兜底规则（`claude-*`、`gpt-*`、`gemini-*`、`o1-*`）确保未知模型变体也能被正确路由。

### 模型能力配置

每条映射声明了目标模型支持的功能，用于控制请求中哪些内容会被转发。

| 字段 | 默认值 | 说明 |
|---|---|---|
| `thinking.enabled` | false | 是否转发扩展思维 / 推理请求 |
| `thinking.style` | `claude` | 思维表达方式：`claude`（原生）、`nova2`、`kimi` |
| `document.enabled` | false | 是否转发文档内容块 |
| `tool_use.enabled` | false | 是否转发工具定义 |
| `ptc.enabled` | false | 是否启用 Programmatic Tool Calling |

预置映射已配置合理默认值：Claude 模型支持全部能力，Gemini 模型禁用思维，Embedding/Rerank 模型禁用所有能力。

对于没有显式能力配置的模型映射，将使用 **Settings -> 默认能力** 中的值作为兜底（可配置）。修改即时生效。

## 项目结构

```
src/
├── api/                 # HTTP 处理器（messages、chat_completions、embeddings、rerank、images、models、usage、health、admin）
├── config/              # 配置与 AWS 设置
├── converters/          # 协议转换器（Anthropic/OpenAI ↔ Bedrock/Gemini/OpenAI/Anthropic）
├── database/            # 存储后端（SQLite、PostgreSQL、DynamoDB）
│   ├── sqlite/
│   ├── postgres/
│   └── dynamodb/
├── error/               # 错误类型
├── middleware/           # 认证与限流中间件
├── schemas/             # 请求/响应 Schema（Anthropic、OpenAI、Bedrock、Gemini、Embeddings、Rerank、Images）
├── server/              # 应用启动、路由、状态管理
├── services/            # 业务逻辑
│   ├── backend_pool/    # 后端实例池与负载均衡
│   ├── ptc/             # Programmatic Tool Calling（沙箱执行）
│   ├── bedrock.rs       # AWS Bedrock 服务（Claude 用 InvokeModel；非 Claude /v1/chat/completions 用 Converse；非 Claude /v1/messages 用 Bedrock Mantle）
│   ├── gemini.rs        # Google Gemini 服务
│   ├── passthrough.rs   # Anthropic & OpenAI 透传服务
│   ├── model_mapping.rs # 模型解析与缓存
│   └── usage_tracker.rs # 用量与成本追踪
└── utils/
static/
└── admin/               # Admin 管理界面（通过 rust-embed 嵌入二进制）
    ├── index.html
    ├── app.js
    └── app.css
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
