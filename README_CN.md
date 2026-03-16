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
- **多后端路由** — 路由至 AWS Bedrock 和 Google Gemini，自动完成协议转换
- **智能模型映射** — 跨提供商映射模型名称（如 `gpt-4o` → Claude Sonnet、`claude-*` → Bedrock），支持精确匹配、通配符和优先级配置
- **凭证池与负载均衡** — 管理多组后端凭证，支持轮询、加权、随机和故障转移策略
- **可插拔存储** — SQLite（零配置）、PostgreSQL 或 DynamoDB — 一个环境变量切换
- **API Key 管理** — 发放 API Key，支持独立的速率限制、预算上限和服务等级
- **流式响应** — 完整支持 OpenAI 和 Anthropic 协议的 SSE 流式传输
- **扩展思维** — 透传支持 Anthropic Extended Thinking
- **工具调用与 PTC** — 支持工具调用，包括带沙箱代码执行的 Programmatic Tool Calling
- **AES-256-GCM 加密** — 后端凭证静态加密存储
- **健康检查** — 内置 `/health`、`/ready`、`/liveness` 端点
- **功能开关** — 通过数据库控制功能启停（工具调用、PTC、缓存、限流等）
- **多架构 Docker** — 提供 `linux/amd64` 和 `linux/arm64` 镜像
- **灵活部署** — Docker、AWS App Runner 或裸机部署

## 快速开始

### 方式一：Docker（推荐）

```bash
docker run -p 8000:8000 xtravisions/one-router:latest
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
  One Router v0.1.0
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

## 配置

One Router 仅需 **5 个环境变量**配置，其余所有配置均存储在数据库中。

| 变量 | 默认值 | 说明 |
|---|---|---|
| `DATABASE` | `sqlite://./data/gateway.db` | 存储后端 URI，支持 `sqlite://`、`postgres://`、`dynamodb://` |
| `PORT` | `8000` | HTTP 监听端口 |
| `LOG_LEVEL` | `info` | 日志级别：`trace`、`debug`、`info`、`warn`、`error` |
| `MASTER_API_KEY` | _(无)_ | 管理员 API Key，绕过速率限制 |
| `ENCRYPTION_KEY` | _(无)_ | AES-256-GCM 密钥，用于加密存储后端凭证 |

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

后端凭证存储在 `backends` 数据库表中。使用内置脚本生成配置：

```bash
# 交互模式
./scripts/backend-config-builder.sh

# Bedrock 使用 AWS profile
./scripts/backend-config-builder.sh --type bedrock --region us-east-1 --profile prod

# Bedrock 使用 access key
./scripts/backend-config-builder.sh --type bedrock --region us-east-1 \
  --access-key-id AKIA... --secret-access-key ...

# Gemini 使用多个 API key
./scripts/backend-config-builder.sh --type gemini --api-keys "key1,key2"

# 连接池设置（两种后端通用）
./scripts/backend-config-builder.sh --type bedrock --region us-east-1 \
  --strategy weighted --max-failures 5 --retry-after 600
```

通过 `--format` 指定输出格式：

| 格式 | 说明 |
|---|---|
| `json` | 格式化 JSON（默认） |
| `json-compact` | 单行 JSON（也可用 `--compact`） |
| `dynamodb` | DynamoDB item JSON，可直接用于 AWS Console / `put-item` |
| `sql` | SQL INSERT 语句，带 ON CONFLICT upsert（SQLite / PostgreSQL） |

```bash
# 输出为 DynamoDB item
./scripts/backend-config-builder.sh --type bedrock --region ap-northeast-1 --format dynamodb

# 输出为 SQL
./scripts/backend-config-builder.sh --type gemini --api-keys "key1" --format sql
```

## 架构

```
                    ┌─────────────────────────────────┐
                    │          One Router              │
                    │                                  │
  OpenAI SDK ──────►  /v1/chat/completions            │
                    │       │                          │
                    │       ├──► 转换器 ──► Bedrock    │──► AWS Bedrock
                    │       └──► 转换器 ──► Gemini     │──► Google Gemini
                    │                                  │
  Anthropic SDK ───►  /v1/messages                    │
                    │       │                          │
                    │       ├──► 转换器 ──► Bedrock    │──► AWS Bedrock
                    │       └──► 转换器 ──► Gemini     │──► Google Gemini
                    │                                  │
                    │  ┌─────────────────────────────┐ │
                    │  │ 认证 · 限流 · 预算管理      │ │
                    │  │ 模型映射 · 凭证池           │ │
                    │  │ 用量追踪                    │ │
                    │  └─────────────────────────────┘ │
                    │                                  │
                    │  存储: SQLite / PG / DynamoDB    │
                    └─────────────────────────────────┘
```

## 模型映射

One Router 内置了预配置的模型映射，所有映射存储在数据库中，可自行定制。

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

通配符兜底规则（`claude-*`、`gpt-*`、`gemini-*`、`o1-*`）确保未知模型变体也能被正确路由。

## 项目结构

```
src/
├── api/                 # HTTP 处理器（messages、chat_completions、models、health）
├── config/              # 配置与 AWS 设置
├── converters/          # 协议转换器（Anthropic/OpenAI ↔ Bedrock/Gemini）
├── database/            # 存储后端（SQLite、PostgreSQL、DynamoDB）
│   ├── sqlite/
│   ├── postgres/
│   └── dynamodb/
├── error/               # 错误类型
├── middleware/           # 认证与限流中间件
├── schemas/             # 请求/响应 Schema（Anthropic、OpenAI、Bedrock、Gemini）
├── server/              # 应用启动、路由、状态管理
├── services/            # 业务逻辑
│   ├── backend_pool/    # 凭证池与负载均衡
│   ├── ptc/             # Programmatic Tool Calling（沙箱执行）
│   ├── bedrock.rs       # AWS Bedrock 服务
│   ├── gemini.rs        # Google Gemini 服务
│   ├── model_mapping.rs # 模型解析与缓存
│   └── usage_tracker.rs # 用量与成本追踪
└── utils/
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

# 运行测试
cargo test

# 交叉编译 Linux
cargo install cross
cross build --release --target aarch64-unknown-linux-gnu
```

## 许可证

[MIT](LICENSE)
