# Backend 模型亲和(per-backend model 过滤器)

日期:2026-07-31 · 状态:已实施(2026-07-31,本地烟囱测试验证通过:
双 backend 过滤路由 / 校验拒绝 / 删除专用后端后 503 明确报错)

## 背景与目标

模型到后端的路由目前分两层:`model_mappings` 决定 provider(模型感知);
同 provider 的全部 backend 凭证合成一个 `CredentialPool` 按策略轮询
(**不感知模型**)。因此无法表达"同一 provider 下,不同 backend 服务
不同模型"。直接动机:Bedrock 需要 `ap-northeast-1`(Claude,低延迟)与
`us-east-1`(GPT-5.x,Responses-only 模型仅在美东)并存;今天加第二个
bedrock backend 会导致两个凭证轮流接**所有**请求——GPT-5.6 一半流量
404,Claude 一半流量绕道美东,且注定失败的请求还会污染共享凭证的健康
状态(见「不级联」一节)。

目标:backend 声明一个**模型过滤器**(通配 + 排斥),凭证选取按
"精确 → 特异性"解析出最优组、组内负载均衡。存量配置零行为变化。

非目标:per-API-key 路由(参考项目 admin_portal 的维度,正交)、跨
provider 的模型降级(已有 `failover_chains`)、按凭证改写 target id
(见「mapping 配置手册」)。

## 语义定义(核心)

backend 配置模式列表,如 `["*", "!openai.*"]`。选取分两步:

### 第一步:资格判定(能力边界)

凭证可服务某 target model ⇔ **命中任一正向模式 ∧ 不命中任何负向模式**。

- 模式为 glob,仅 `*` 通配(复用 `model_mapping.rs` 的 `matches_wildcard`
  与 `specificity`,提取为共享助手,避免两套语义漂移)。
- `!` 前缀为负向(排斥)模式。排斥无条件优先,与书写顺序无关。
- **纯负向列表隐含 `*` 底座**:`["!claude.*"]` ≡ `["*", "!claude.*"]`。
- `NULL` / 空列表 ≡ `["*"]`(存量行为);显式**只**配负向且排掉一切
  (如 `["!*"]`)可表达"排空但不禁用"。
- 配置校验(Admin API 落库前):拒绝或警告无意义写法——正负同模式、
  `!*` 与其它模式并存(必然清空)、模式为空串。

正向模式表达**偏好**("GPT 优先去这"),负向模式表达**能力边界**
("这个入口调不了 openai.*,会 404")。隔离用 `!`,不要依赖对面有更
特异的 backend 来遮蔽——遮蔽方被删掉或写错时流量会漏回来。

### 第二步:组内解析(偏好排序)

对通过资格判定的凭证,按其命中的**最优正向模式**排名
(排斥不参与排名):

1. 精确匹配(无通配)优先;
2. 同为通配时,backend `priority` 高者优先(与 model_mappings 先例一致);
3. 再比特异性(非通配前缀更长者优先);隐含 `*` 底座按 `*` 计。

取排名最高的**一组**(并列者同组),组内按现有策略
(round_robin / weighted / random / failover)负载均衡。

### 不级联(硬遮蔽)

最优组全部不健康时,**不**回落到次优组,请求按现状兜底
(组内返回首个候选,交给健康机制)或失败。理由有两层:

- 过滤器是"声明"不是"能力证明"——`*` 后端未必真能服务该模型
  (ap 凭证调 GPT-5.6 就是 404),级联只会送出注定失败的请求;
- **健康污染**:凭证健康按凭证记、不分模型,注定 404 的请求攒满
  `max_failures` 会禁用整个凭证,把它本来健康的其它模型流量一起拖下水。

对价(写进运维文档):专用组全挂 = 该模型不可用,即使 `*` 组健康。
模型级降级用 `failover_chains`(跨 provider、目标显式声明,不存在
"声明 ≠ 能力"问题)。完全无资格凭证时返回明确错误:
`"No <provider> backend serves model '<id>'; check backends' models filter"`
(503,与 "No healthy X backend available" 同级)。

## 匹配对象:target model id(实际 invoke 的 id)

过滤器匹配 **mapping 解析后的 target model id**,即实际发给后端的 id;
application inference profile ARN 按**字面**匹配(不先解析)——ARN 里
本来就带 region(`arn:aws:bedrock:us-east-1:...`),`arn:aws:bedrock:us-*`
这类模式反而顺手。

不选 source 名的三个硬伤:

1. **failover 错配**:`failover_chains` 的目标直接是 backend model id,
   绕过 mapping,没有 source 名;且 failover 后 target 变、source 不变,
   按 source 匹配会选中调不动新 target 的凭证。
2. **mapping 改动静默失效**:source 重映射后,按 source 写的过滤器不会
   跟着变;按 target 写,约束跟着"实际调用什么"走。
3. **别名重复**:多 source 映射同一 target 很常见,能力按 target 定。

此外 `global.` / `us.` / `jp.` / `apac.` 等 region 前缀只存在于 target id
里,而它们正是"哪个入口能调"的真实约束——选 target 才能把约束写成模式。

## mapping 配置手册(region 前缀)

**结构约束**:mapping 是"一个 source → 一个 target",过滤器只选凭证、
从不改写 target。"同一 source 在不同 backend 用不同前缀"不可表达,也
不做(按凭证合成前缀是启发式,各 region 的 profile 可用性不一致)。

配置心法:**target 前缀声明"这次调用对 region 的要求",backend 过滤器
声明"这个入口能满足哪些要求"**。

- **默认用 `global.`**(模型有 global profile 且无驻留要求):一条
  mapping,任何入口可调,容量调度交给 AWS;流量自然走默认 backend
  (通常是延迟最低入口)。生产现状即如此
  (`claude-sonnet-5 → global.anthropic.claude-sonnet-5`)。
- **geo 前缀 = 刻意钉住**(数据驻留 / 延迟容量绑定 / 区域定价):
  target 用 `us.xxx` 时,us 后端加正向 `us.*`,**其它入口必须 `!us.*`**
  (geo profile 从错误 region 入口调用直接报错——排斥表达能力边界的
  典型场景)。
- **`global.*` 遮蔽陷阱**:给远端 backend 显式加 `global.*` 会让它的
  特异性高于默认 backend 的 `*`,把 global 流量**整体拽走**而非分担。
  想真分担,两边写同特异性模式(都写 `global.*`);否则远端专用
  backend 只写它独有的模型。

## 目标拓扑示例

```
bedrock-ap-northeast-1: ["*", "!openai.*"]     # 默认入口;声明调不了 GPT
bedrock-us-east-1:      ["openai.gpt-5*"]      # GPT-5.x 专用
```

| 请求 target | ap-northeast-1 | us-east-1 | 结果 |
|---|---|---|---|
| `global.anthropic.claude-*` | ✅ 命中 `*` | ❌ 无正向命中 | 全走 ap(延迟不变) |
| `openai.gpt-5.6-sol` | ❌ 被 `!openai.*` 排斥 | ✅ 命中 | 全走 us-east-1 |

双保险:即使 us 后端被误删,GPT 请求也因 ap 的排斥得到明确错误,
而不是 404 + 健康污染。

## 数据模型与迁移

- `backends` 新增可空列 `models`(TEXT,JSON 字符串数组);
  `BackendRecord.models: Option<Vec<String>>` 带 `#[serde(default)]`。
- `models` 放 backends 列而非 config JSON:非敏感、Admin 列表页要展示、
  config 整体加密拿不到。
- 迁移:sqlite / postgres 各一条 `ALTER TABLE backends ADD COLUMN models TEXT`;
  DynamoDB 无 schema,serde default 兼容旧行;`scripts/migrations/` 补脚本。

## 凭证池与服务接线

1. `Credential` trait 增加带默认实现的方法(零侵入):
   ```rust
   /// 该凭证是否服务此目标模型(资格判定)。默认接所有。
   fn serves_model(&self, _target_model_id: &str) -> bool { true }
   /// 命中的最优正向模式排名键(精确/priority/特异性),用于组内解析。
   fn model_match_rank(&self, _target_model_id: &str) -> MatchRank { MatchRank::CatchAll }
   ```
   `AwsCredential` 与 `BackendInstance<S>` 各加 `models: Vec<String>` 并覆写。
2. `CredentialPool::get_next_for_model(&self, model: &str)`:资格过滤 →
   取最优排名组 → 组内按现有策略与健康选取。`get_next()` 保留
   (≡ match-all)。无资格候选返回 `None`,调用方给出上文错误。
3. `PoolStats::stats_for_model(model)`:total/healthy 只统计最优组。
   `DynamicConfig::apply_failover` 的 `provider_available` 改用它
   (签名已携带 target_model_id,穿透即可)——"GPT 专用凭证全挂但
   Claude 凭证健康"时 GPT 的 failover 链正确触发,Claude 不受影响。
4. 接线点:
   - Bedrock:`init_bedrock_from_backends` 把 `BackendRecord.models` 装进
     `AwsCredential`;`get_client()` → `get_client_for(model)`;
     `mantle_post` 增加 `target_model_id` 参数(chat 路径已有形参,
     `mantle_responses(_stream)` 从 body `model` 字段取或加参);
     SDK 路径(`invoke_model_messages(_stream)` / `converse(_stream)`)的
     `get_client` 调用点同步换。
   - Gemini / Anthropic / OpenAI:`BackendInstance::new` 增 models 参数
     (`server/app.rs` 三处构造);handlers 的 `pool.get_next()` →
     `get_next_for_model(&resolved.target_model_id)`(messages.rs /
     chat_completions.rs 各 3 处 + web tools 的 gemini 选取 1 处)。

## Admin API / UI

- `UpsertBackendRequest` / `BackendSummary` 增加
  `models: Option<Vec<String>>`(PUT 语义同 config:省略保留原值,
  显式 `[]` 恢复"接所有")。落库前跑上文校验。
- UI backend 表单加多值输入(逗号/分号分隔均可),列表页展示;
  空显示 "all models"。
- 热加载:backends 变更已触发 `reload_dynamic_config`,无新增工作。

## 测试

- 单测:glob 正负匹配(空 / 纯负向隐含底座 / 排斥优先 / 无意义写法
  校验);排名(精确 > priority > 特异性,隐含 `*` 计为 CatchAll);
  `get_next_for_model` 最优组选取、组内策略、全不健康兜底不越组、
  无资格返回 None;`stats_for_model`;failover 模型感知触发。
- 集成:双 bedrock backend 配不同过滤器,以 credential name 断言
  GPT / Claude 流量各自落点;遮蔽与排斥的行为矩阵。
- E2E(profile=global):本地双后端(ap 空 vs us-east-1 `openai.gpt-5*`),
  Claude 与 GPT-5.6 各自命中正确入口。

## 迁移与发布

1. 三库迁移 + `BackendRecord` 字段 → 存量零变化(NULL ≡ `["*"]`)。
2. 代码合入、发版。
3. 生产:新增 `bedrock-us-east-1`(`["openai.gpt-5*"]`),原
   `bedrock-ap-northeast-1` 改为 `["*", "!openai.*"]`。Claude 入口与
   延迟不变,GPT-5.6 即刻可用,mapping 无需改动。
