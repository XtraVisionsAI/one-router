# Bedrock Mantle Responses API 支持(Responses-only GPT 模型)

日期:2026-07-30 · 状态:Phase 1 + Phase 2 均已实现并本地端到端验证
(Phase 1:真实 Codex CLI;Phase 2:真实 Claude Code CLI 多轮工具调用)

## 实测确认的端点事实(2026-07-30,profile=global)

- **GPT-5.x 只在专用 Mantle 主机上**:`https://bedrock-mantle.{region}.api.aws/openai/v1/responses`。
  bedrock-runtime 主机上的任何路径都调不到它。
- **region 限制**:sol 仅 us-east-1 / us-east-2;terra / luna 另有 us-west-2。
  其他 region 返回 404「model doesn't exist」。**生产后端(ap-northeast-1)必须
  增配 us-east-1 凭证才能用 GPT-5.6**。
- **认证**:SigV4 直接可用(service name `bedrock`),无需 bearer token 生成器。
  签名密钥经 SDK 凭证链解析(2026-08-02 起):`create_bedrock_client_from_config`
  把 `SdkConfig` 的 `SharedCredentialsProvider` 一并存入 `BedrockService`,
  `mantle_post` 通过它取密钥——显式 access key / profile(含 SSO)/ EC2 实例角色
  均可用,临时凭证的缓存与刷新由 `aws_config` 自带的 lazy-caching 层负责。
  (此前只读 backend 记录的显式 key 字段,profile / 实例角色签名必败。)
- **路径必须带 `/openai` 前缀**:bedrock-runtime 的 `/v1/chat/completions`(旧代码
  所用)会返回 **HTTP 200 + coral `UnknownOperationException` 包体**——这就是此前
  `/v1/messages` 走 Mantle 报「missing field `id`」的真正根因(存量 bug,本次一并
  修复为 `/openai/v1/chat/completions`,gpt-oss 实测通过)。
- **host 头 bug(存量)**:旧签名代码手动设置 `host` 头,与 reqwest 从 URL 派生的
  值叠加成 `host: a,a`,SigV4 校验必败;此前被 UnknownOperation(未走到签名校验)
  掩盖。已修复(不手动设 host,并过滤签名指令中的 host)。
- **Codex 兼容**:Codex 发的 `additional_tools` input item 是 Codex 扩展,Mantle
  拒收(`Invalid 'input': value did not match any expected variant`)。透传前把其
  中的工具定义合并进顶层 `tools` 数组(实测等价可用);`client_metadata` 顶层字段
  Mantle 容忍。
- **SSE 帧序**:Mantle 的帧是 `data:` 行在前、`event:` 行在后,自带
  `sequence_number`;转发器按行前缀解析,不依赖行序。


## 背景

Bedrock 上的 GPT-5.x 系列(`openai.gpt-5.4` / `5.5` / `5.6-luna|sol|terra`)只存在于
LiteLLM 的 `bedrock_mantle/` 命名空间且 `mode: responses` —— 即它们**只能通过
Bedrock Mantle 专用主机的 Responses API 调用**,不支持 Converse,也不出现在
`list-foundation-models` 里。

当前三个入口对这些模型全部失败:

| 入口 | 现路径 | 症状 |
|---|---|---|
| `/v1/responses` | dispatch_chat → Converse | `The provided model identifier is invalid` |
| `/v1/chat/completions` | Converse | 同上 |
| `/v1/messages` | Mantle `/v1/chat/completions` | `Failed to parse Mantle response: missing field 'id'` |

## 模型识别

`BedrockService::is_mantle_responses_model(target_model_id)`:硬编码前缀表
`["openai.gpt-5"]`(与 `beta_headers.rs` 的 blocklist/mapping 硬编码默认同一先例)。
`openai.gpt-oss-*` 支持 Converse,不匹配该前缀,行为不变。

未来泛化:LiteLLM 导入时把表里的 `mode` 字段持久化到 mapping(新列或 capabilities),
识别函数优先读显式标记、前缀表作兜底。**当前不加库列**(3 个库后端的迁移成本 vs
一个前缀常量)。

已知限制:failover 目标绕过 model_mapping(用默认 capabilities),但识别函数只依赖
target model id,failover 到 GPT 模型时判断依然正确。

## Phase 1:`/v1/responses` 透传(本次实施)

入口收到的本来就是 Responses 协议,对 responses-only 模型**直接透传** Mantle
`/v1/responses`,不做协议翻译:

- **原始 JSON 保真**:handler 改收 `Json<serde_json::Value>`;翻译路径从 Value 再解析
  `ResponsesRequest`(行为不变);透传路径直接用原始 Value(`ResponsesRequest` 是
  典型化 struct,会丢 Codex 发的 `include`/`text`/`parallel_tool_calls` 等字段)。
- **上游改写**:`model` → target id;`previous_response_id` 若命中本地 context store,
  恢复的历史注入 `input` 数组头部、并从上游请求中删除该字段(上游不认识本地 id);
  `store` 强制 `false`(状态由本地 store 管理,避免双端存储 + id 空间分裂)。
- **响应改写**:`model` 字段(含每个流式帧里的)回写为 source 模型名。
- **流式 = 原生转发**:逐帧解析上游 SSE(`event:` + `data:`,自带 `sequence_number`),
  改写 model 后原样转发。**不再回放**——消除长任务首字节静默导致 LB idle timeout
  掐流的问题。从 `response.completed` 帧提取 usage 与完整响应(供记账和 store)。
- **usage**:上游 `usage.input_tokens` 含 cached(S2 口径),记账时按
  `input_tokens_details.cached_tokens` 扣除,protocol tag 仍为 `"responses"`。
- **BedrockService 新方法**:`mantle_responses` / `mantle_responses_stream`,与现有
  `chat_completions(_stream)` 共用 SigV4 签名逻辑(`mantle_post(host_kind, path, body)`
  助手,`MantleHost::Runtime`(chat)/ `MantleHost::Mantle`(responses)两种主机),
  凭证池记账(429/5xx/成功)同现有约定。
- **failover**:透传分支不做 failover(先例:PTC 跳过 failover;Mantle-responses
  模型没有可等价降级的 Converse 形态)。

## Phase 2:`/v1/messages`(Claude Code)与 `/v1/chat/completions`(已实现)

实现(2026-07-30,与要点约定一致,本地 E2E 验证通过):

1. **anthropic ↔ responses 一跳直转**(`converters/anthropic_responses.rs`),
   不走 anthropic→chat→responses 链式:
   - thinking 块 `signature` ↔ reasoning item:签名编码为
     `mantle:{item_id}:{encrypted_content}`(客户端原样回传的不透明 token);
     请求恒带 `include: ["reasoning.encrypted_content"]`。外来签名(Claude 产生,
     无 `mantle:` 前缀)无法重放,从历史中丢弃;
   - `tool_use`/`tool_result` ↔ `function_call`/`function_call_output` item,
     id 原样往返(上游 `call_*` id 直接作为 tool_use id);
   - `cache_control` 剥离(构造新 JSON 天然丢弃);`stop_sequences` 与
     `temperature`/`top_p`/`top_k` 一律剥离 + debug 日志(reasoning-only 模型拒收);
   - `max_tokens` → `max_output_tokens`;thinking budget → `reasoning.effort`
     (复用 `thinking_to_reasoning_effort` 阈值),`reasoning.summary: "auto"`。
2. **Responses SSE → Anthropic SSE 流式转换器**(同文件
   `ResponsesToAnthropicStreamState`):懒开 content block、动态 index;
   reasoning summary/text delta → thinking_delta;`output_item.done(reasoning)`
   的 `encrypted_content` → signature_delta 后关块;function_call 参数若只在
   done 帧出现则整体补发 input_json_delta;`response.completed/incomplete` →
   message_delta(stop_reason + S1 口径 usage)+ message_stop。
3. `/v1/chat/completions` 复用同一思路(`responses_chat.rs`:
   `chat_to_responses_request` / `responses_to_chat_response` /
   `ResponsesToChatStreamState`):reasoning_effort ↔ reasoning.effort(受
   thinking capability 门控),reasoning summary → `reasoning_content`,
   `stream_options.include_usage` 支持。chat 协议无 reasoning 回传(与 OpenAI
   原生行为一致)。
4. `/v1/messages/count_tokens` 维持本地估算,不受影响。

接线:两个 handler 的 Bedrock 分支在 `resolve_routing_model_id` 后、Claude
判定前拦截 `is_mantle_responses_model` → `handle_mantle_responses_request`
(messages.rs)/ `handle_mantle_responses_chat`(chat_completions.rs);
`parse_sse_frame` 从 responses.rs 提为 `pub(crate)` 共用。

### Phase 2 实测发现(2026-07-30,profile=global,us-east-1)

- sol 的 reasoning item **只在实际发生推理时出现**(琐碎 prompt / 低 effort 可能
  没有);`summary` 恒为空数组(sol 不产 summary 文本),`encrypted_content`
  在 include 下正常返回 → thinking 块可能 text 为空但带签名,合法。
- **Mantle 接受不带 reasoning item 的 function_call 重放历史**(不像 OpenAI 原生
  API 会报 "function_call without its required reasoning item")——签名丢失可降级。
- 签名两轮往返实测:turn1 素数求和(129)→ 回传 thinking 块 → turn2 追问(100),
  reasoning item 成功重放。
- **Claude Code 会在 `messages[]` 里发 `role: "system"` 消息**(老 Mantle chat
  路径对此直接 400 "Unknown role: system"——生产旧版本实测复现);一跳转换器把
  非 assistant 角色统一按 user message item 处理,实测可用。
- Mantle 隐式 prompt cache 生效(Claude Code 系统提示词 cache_read 2 万+ tokens),
  S2→S1 拆分记账正确(cache_read 单列)。

## 旁路防护(与 Phase 1 同批)

- **web tools + Bedrock 非 Claude 模型**:`WebToolBackend` 走 `invoke_model_messages`
  (Claude InvokeModel 专属),现状对任何非 Claude Bedrock 模型都是静默 500。
  在 `messages.rs` 与 `responses.rs` 的 web 工具后端选择处,对
  `!is_claude_model(target)` 返回明确 `invalid_request_error`(设计红线:混合 web
  工具必须都处理或明确拒绝)。
- **PTC + 非 Claude 模型**:PTC 直接调 `invoke_model_messages`,同样加
  `is_claude_model` 校验,不匹配返回 `invalid_request_error`。

## 有状态语义(透传下)

- response id 由上游生成(`resp_*`);`store != false` 时以上游 id 存入本地
  context store(owner 绑定 + TTL 不变),`GET/DELETE /v1/responses/:id`、
  `input_items` 等辅助端点继续工作;owner 不匹配仍 404。
- Codex 默认 `disable_response_storage = true`(无状态、整史重发),不依赖此路径。

## 测试

- 识别函数:前缀命中/不命中(gpt-oss、claude、nova)。
- 透传请求构建:model 改写、previous_response_id 注入+删除、store 强制 false、
  未建模字段保真。
- SSE 转发:帧解析、model 改写、usage 提取(含 cached 扣除)。
- 旁路:web tools / PTC 对 GPT 模型的拒绝路径。
