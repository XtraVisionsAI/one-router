# API Key 管理重构:用户维度计费 + Key 生命周期 + 审计

日期:2026-11-06 · 状态:P0–P3 全部已实施(2026-11-06,单测 + 本地烟囱测试验证,含用 P0 二进制建库后升级)

## 背景与目标

当前模型是"Key 即主体":`api_keys` 一行同时承担**凭证**(HMAC 哈希)、
**身份**(`name`)、**计费主体**(`monthly_budget` / `budget_used_mtd` /
`cost_rate`)和**限额主体**(`rate_limit` / `tpm_limit`)。由此产生:

- 一个使用者只能有一个 Key(多个 Key = 多个互不相干的预算)。
- 计费、预算按 Key 而不是按人。
- Key 无法真正删除:`DELETE ?action=delete` 实际只是 `deactivate(reason="deleted")`,
  因为 `usage.api_key` 存的是 Key 哈希,删行会让历史用量失去归属。

代码审查另外发现的问题(本设计一并解决):

| # | 问题 | 位置 |
|---|---|---|
| B1 | `tpm_limit` 可读写但**从未执行** | `api/admin/keys.rs` 有字段,`middleware/rate_limit.rs` 未使用 |
| B2 | 修改 `rate_limit` 后,活跃 Key 的限流器不更新 | `RateLimitState.limiters` 以 Key 为缓存键、`time_to_idle(600s)`,活跃 Key 永不过期 |
| B3 | `metadata` 字段创建时写死 `None`,无任何读写路径 | `api/admin/keys.rs:239` |
| B4 | 预算"先花后查":鉴权读请求前的 `budget_used_mtd`,请求完成才累加 | `middleware/auth.rs` + `services/usage_tracker.rs` |
| B5 | 限流计数是进程内存,多实例部署时实际上限 = 配置 × 实例数 | `middleware/rate_limit.rs`(governor) |
| B6 | 每个请求都直接查一次数据库做鉴权,无缓存 | `middleware/auth.rs:245` |
| B7 | Key 哈希出现在 usage 主键、管理 API 内部关联中;哈希依赖 `ENCRYPTION_KEY`,换密钥即全部失联 | `usage.api_key`、`admin_usage.rs::resolve_api_key_filter` |
| B8 | 管理 API 以全局唯一的 `name` 作路径标识,改名即改 URL;多用户后名称冲突 | `/admin/api/keys/:name` |
| B9 | 全局 `rate_limit` 设置只在构建路由时读取一次,改设置要重启才生效(与文档"立即生效"不符) | `server/routes.rs` |
| B10 | `/v1/usage` 用 Key 的**脱敏显示串**过滤 usage,而 usage 存的是哈希 → 业务 Key 自查用量永远为空 | `api/usage.rs` |
| B11 | `increment_budget_used` 拿**累计** `budget_used` 与月预算比较(应为当月 `budget_used_mtd`);只影响返回值/日志 | 三个存储后端 |

**目标**:引入 `user`(以及 P3 的 `team`)作为计费/限额主体,Key 退化为
"可多个、可过期、可轮换、可删除"的凭证;所有管理变更写审计日志;存量
部署升级后**零行为变化**(每个旧 Key 自动迁移成"一个用户 + 一个 Key")。

**非目标**(本项目面向内部使用):

- 用户自助门户、OIDC/SSO 登录、RBAC 角色——管理面仍然只有 master key
  (+ debug 构建的 ephemeral key)。
- 充值、钱包余额、兑换码、支付等对外商业化功能。预算就是"额度上限",
  不是"预付余额"。
- 按时区对齐的预算周期(统一 UTC)。
- 引入 Redis 等新基础设施(共享限流复用现有数据库,见 P3)。

## 总体数据模型

```
team (P3, 可选) ──< user ──< api_key
                     │          │
                     └──── usage ┘   (usage 行同时冗余 user_id / key_id / team_id)
audit_logs (P2)  —— 记录所有 admin 写操作
```

**约束解析规则(全设计通用)——逐层取最严**:

| 维度 | 规则 |
|---|---|
| 启用状态 | key、user、team 任一 `is_active=false` → 拒绝 |
| 过期 | key `expires_at` 已过 → 拒绝(user 不设过期) |
| 预算 | 每一层有预算的都必须未超限;各层独立计数 |
| RPM / TPM / 并发 | 每一层有各自的计数器,任一层超限 → 429;user/team 层计数器由其下所有 Key **共享** |
| 允许模型 / provider | 各层白名单**取交集**;某层为 `NULL` 表示该层不限制 |
| `cost_rate` | 只在 user 层(P3:user 为空时取 team,再为空取 1.0) |
| `cache_ttl` | key → user → 全局 `prompt_cache` 设置,取第一个非空 |

"Key 层只能收窄、不能放宽"是这套规则的直接结论:给 Key 设比用户更高的
RPM 不会生效。

### 鉴权结果:`Principal`

`ApiKeyInfo` 扩展为(保留类型名以减少改动面):

```rust
pub struct ApiKeyInfo {
    pub key_id: String,              // UUID;master/ephemeral 为 "__master__"/"__ephemeral__"
    pub key_hash: String,            // 原 raw_api_key,仅用于 DB 写回,不外露
    pub key_display: String,
    pub user: Option<UserLimits>,    // master/ephemeral 为 None
    pub team: Option<TeamLimits>,    // P3
    pub key_limits: KeyLimits,       // key 层自身的限额
    pub effective: EffectivePolicy,  // 按上表合并后的结果,中间件/handler 只读这个
}
```

handler 和中间件只消费 `effective`,不各自重新合并层级。

---

## P0:修正现有缺陷 + 稳定标识 + 可删除

### P0-1 `key_id`:稳定、与密钥无关的标识

- `api_keys` 新增 `key_id TEXT NOT NULL UNIQUE`(UUIDv4)。主键仍是 HMAC
  哈希(鉴权热路径不变)。
- `usage` 新增 `key_id TEXT`(以及 P1 的 `user_id`)。新写入行必填。
- 管理 API 与 UI 一律以 `key_id` 标识 Key;**哈希不再出现在任何 API 响应
  或 URL 中**(解决 B7)。

**存量回填**(启动时自动执行,与现有 key hash backfill 同一阶段):

| 后端 | 做法 |
|---|---|
| SQLite / Postgres | `UPDATE api_keys SET key_id = <uuid> WHERE key_id IS NULL`(逐行生成);`UPDATE usage SET key_id = (SELECT key_id FROM api_keys WHERE api_keys.api_key = usage.api_key) WHERE key_id IS NULL`;新增索引 `idx_usage_key_id_ts(key_id, timestamp)` |
| DynamoDB | 只给 `api_keys` 补 `key_id`(分页 Scan + `attribute_not_exists(key_id)` 条件更新,多实例并发安全)。**`usage` 不回填** |

**实施时的取舍(相对初稿)**:DynamoDB 的 `usage` 不回填、也不加 GSI、不阻止
硬删。原因:P0 里 `usage.key_id` 的唯一用途是"Key 删除后用量仍能成组显示",
而缺 `key_id` 的旧行按哈希分组,删除后显示为 `deleted key · <哈希前 8 位>`,
效果与有 `key_id` 的行(`deleted key · <key_id 前 8 位>`)相同——回填一张
可能很大的表换不来额外收益。真正需要按归属查询的是 P1 的 `user_id`,
其回填与 GSI 在 P1 迁移中一并处理(迁移时 Key 仍在,哈希 → 用户可得)。

DynamoDB `usage` 的分区键 `api_key` 无法修改,新行继续写入哈希作分区键并
附带 `key_id` 属性;按 Key 过滤仍走分区键(Key 存在时哈希可得)。
`get_api_key_by_id` 在 DynamoDB 上用带过滤的分页 Scan(api_keys 表很小),
不新增 GSI。

PostgreSQL 用内置 `gen_random_uuid()`,要求 13+。

### P0-2 Key 硬删除

- `DELETE /admin/api/keys/:key_id?action=delete` = **硬删除** `api_keys` 行。
  usage 行保留(带 `key_id`,P1 起再带 `user_id`)。
- `POST /admin/api/keys/:key_id/deactivate` / `.../activate`:可逆停用。
- **兼容**:不带 `action`(或 `action=deactivate`)的 `DELETE` 维持旧语义
  ——停用而非删除,响应带 `Deprecation: true`。旧脚本若按旧默认调用,不会
  因升级而误删 Key。下一个 minor 版本把不带参数的 `DELETE` 改为硬删除。
- 存量 `deactivated_reason = "deleted"` 的行:迁移时**不自动删除**
  (避免意外数据丢失),UI 标注"旧版已删除",提供"彻底删除"按钮。
- 用量报表中已删除 Key 的标签显示为 `已删除 · <key_id 前 8 位>`;P2 审计
  日志落地后,可从 `key.delete` 事件的快照里取回原名称和 `key_display`。

### P0-3 管理 API 改用 `key_id`(解决 B8)

- 新路径 `/admin/api/keys/:key_id`。
- **兼容一个 minor 版本**:路径参数不是 UUID 格式时按 `name` 查找(P1 后名称
  只在用户内唯一,全局匹配多于一个返回 409),响应头 `Deprecation: true`。
  下一个 minor 版本移除。

### P0-4 TPM 限流落地(解决 B1)

token 数只有在响应结束后才知道,所以 TPM 采用**事后计量 + 事前判定**:

- 每个主体维护一个 60s 滑动窗口 token 计数(两个固定窗口加权近似:
  `prev × (1 - elapsed/60) + curr`)。
- 请求进入:窗口内已用 ≥ `tpm_limit` → 429(`rate_limit_error`,
  `retry-after` 取窗口剩余秒数)。
- 请求结束(`UsageTracker::record_usage` 处):累加 `input + output +
  cache_write` tokens。`cache_read` 不计入(与 Anthropic 官方 ITPM 口径一致)。
- 单个请求可能让窗口"冲过"上限,这是事后计量的固有性质,在文档中说明。
- P0 为进程内实现;P3 可切换为数据库共享计数(同一 trait)。
- 新增 `onerouter_rate_limited_total{kind, scope}`:P0 有 `kind=rpm|tpm`、
  `scope=key`;P1/P3 再加 `user`/`team` scope 和 `concurrency` kind。
- `tpm_limit` 必须为正整数(`null` = 不限);`rate_limit = 0` 维持原义(用全局默认)。
- 全局 `rate_limit = disable` 时 TPM 同样关闭,与 RPM 一致。

### P0-5 限流器缓存失效(解决 B2、B9)

限流器缓存键从 Key 的脱敏显示串改为 `"{key_id}:{rpm}"`(P1 起加上 scope 前缀)。
配置一改,下个请求从 DB 读到新值,自然命中新的限流器;旧限流器随
`time_to_idle` 淘汰。该方案不依赖跨实例失效通知,多实例下同样正确。
原缓存键是脱敏串 `sk-abcd••••5678`,理论上两个 Key 可能撞键共享限流桶,
一并修正。

全局 `rate_limit` 设置改为每个请求从 `DynamicConfig` 读取(之前在构建路由
时读一次,改设置需要重启)。

### P0-7 顺带修复(B10、B11)

- `ApiKeyInfo::usage_api_key()` 统一给出 usage 表里的 Key 标识(数据库 Key 为
  哈希,master/ephemeral 为内部 ID),`/v1/usage`、`/v1/usage/records` 与
  `UsageTracker` 都改用它。
- `increment_budget_used` 改为比较 `budget_used_mtd`。

### P0-6 `metadata` 落地(解决 B3)

`metadata` 作为管理员自由备注字段(JSON object,≤ 4 KB,如 `{"owner":"alice","ticket":"T123"}`)
在创建/更新 API 和 UI 中开放;key 与 user 均有。网关不解释其内容。

---

## P1:用户维度(解决三个已知问题)

### 实施记录:与下文初稿的差异

以下各小节保留初稿设计;实际实现有这些调整:

| 主题 | 初稿 | 实现 | 原因 |
|---|---|---|---|
| Key 的 `cost_rate` 列 | 移除 | 列保留但不再使用(新 Key 恒为 1.0),Admin API 不再暴露;对 Key 设置 `cost_rate` 返回 400 | 避免为删一列再重建表;倍率只看用户 |
| Key `rate_limit` | 可空 | 仍为 INT,`<= 0` 表示"无 Key 级子限额"(API 上表现为 `null`) | 不改列类型;`0` 原义"用默认值",迁移后由用户层承接,结果等价 |
| 迁移触发 | `users` 表为空时 + 完成标记 | 逐个处理**无主 Key**(`user_id` 为空),对 Key 的写入是**条件写**("仍无主"才写),输了的实例删除自己刚建的用户 | 天然幂等、可续跑;多实例同时启动(App Runner 滚动部署)不会重复迁移 |
| Key 预算计数 | 清零重新累计 | 当月计数清零;**累计 `budget_used` 保留在 Key 上**作统计 | 历史已由用户承接,Key 的累计值仍有统计价值 |
| 计费累加原子性 | SQL 事务 / `TransactWriteItems` | Key、用户两次**独立**原子累加,任一失败报错但不回滚另一个 | 软预算场景不需要跨行事务;Postgres 改为单条 `UPDATE … RETURNING` |
| DynamoDB 索引 | `users` / `usage` 上加 GSI | 不加 GSI:`users` 小表用分页 Scan;按用户查 usage 用 Scan + 过滤(与现有无 Key 过滤时的 Scan 路径一致,上限 10k 条) | 少一类迁移风险;usage 量大时再加 GSI |
| usage `user_id` 回填(DynamoDB) | 带游标检查点 | 后台任务整表 Scan(`attribute_not_exists(user_id)` 过滤)+ 条件更新;内部设置 `__usage_user_backfill` 从 `pending` 到 `done`,中途退出则下次启动重跑 | 已处理的行会被过滤掉,不需要游标 |
| 内部状态 | `usage_backfill_*` 普通设置 | `__` 前缀的内部设置:Settings API 列表中隐藏、拒绝写入 | 防止管理员误改迁移状态 |
| 模型白名单执行点 | 未定 | 业务路由上的独立中间件(auth → 白名单 → 限流):仅有白名单的调用方才缓冲 body 读取顶层 `model`;403 按入站协议格式返回;`/v1/models` 过滤、`/v1/models/:id` 对不允许的模型返回 404 | 覆盖所有端点(含 embeddings / count_tokens),无白名单者零开销 |
| glob 语法 | — | 与 `model_mappings` / backend `models` 共用 `utils/glob.rs`:**只支持一个 `*`**(`claude-*`、`*-latest`、`a-*-b`);`*opus*` 这类多星号模式不生效 | 不改动路由共用的匹配语义 |
| 鉴权失败指标 | — | `onerouter_auth_failures_total{reason}` 新增 `expired_key` / `inactive_owner` / `budget_exceeded` / `model_not_allowed`(预算超限原先计在 `inactive_key`) | 可区分 |
| 用户删除 | — | 有 Key 时返回 409;`?cascade=true` 连同 Key 硬删 | |
| 按名称寻址 Key(兼容) | 全局匹配多于一个返回 409 | 已实现 | |

**顺带修复的潜在 bug**:旧的预算判断不看月份——Key 某月用完预算后,鉴权一直用
上月的 `budget_used_mtd` 拒绝请求,而月度重置只发生在成功请求的计费路径里,
于是该 Key 在之后的月份**永远**被拒(除非管理员手动改)。现在鉴权按
`period_spend`(计数月份不是本月即视为 0)判断,各层独立懒重置。

### `users` 表

| 字段 | 类型 | 说明 |
|---|---|---|
| `user_id` | TEXT PK | UUIDv4 |
| `name` | TEXT UNIQUE | 显示名 / 登录名(如 alias) |
| `email` | TEXT NULL | 仅展示 / 告警收件人 |
| `team_id` | TEXT NULL | P3 |
| `is_active` | BOOL | 停用 = 其下所有 Key 失效 |
| `cost_rate` | REAL | 计费倍率(从 Key 迁移来) |
| `monthly_budget` | REAL NULL | P2 起泛化为 `budget` + `budget_period` |
| `budget_used` / `budget_used_mtd` / `budget_mtd_month` / `budget_history` | | 语义同现有 Key 字段 |
| `rate_limit` / `tpm_limit` | INT NULL | `NULL` = 用全局默认 `rate_limit` 设置 |
| `allowed_models` | TEXT NULL | JSON glob 数组,语法同 backend `models` 过滤器(`utils/glob.rs`) |
| `cache_ttl` | TEXT NULL | |
| `metadata` | TEXT NULL | |
| `created_at` / `updated_at` | INT | |

DynamoDB:表 `users`(PK `user_id`),GSI `name-index`。

### `api_keys` 表变更

| 变更 | 说明 |
|---|---|
| 新增 `user_id TEXT NOT NULL` | 归属用户 |
| `name` 唯一约束 | 全局唯一 → `(user_id, name)` 唯一 |
| 新增 `expires_at INT NULL` | 过期时间,过期后鉴权返回 `authentication_error: API key expired` |
| 新增 `allowed_models TEXT NULL` | Key 层白名单(与用户层取交集) |
| 新增 `last_used_at INT NULL` | 见 P2-5 |
| 保留 `monthly_budget`、`rate_limit`、`tpm_limit`(可空) | Key 层**子限额**,默认 `NULL` = 只受用户层约束 |
| 移除 `cost_rate` | 迁到用户层 |
| `budget_used*` 保留 | 设置了 Key 子预算时才有意义;所有 Key 都照常累加,供按 Key 统计 |

SQLite 改唯一约束需要重建表(`CREATE TABLE api_keys_new … ; INSERT … SELECT; DROP; RENAME`),
在单个事务中完成。Postgres 用 `ALTER TABLE … DROP CONSTRAINT / ADD CONSTRAINT`。
DynamoDB 新增 GSI `user-index (user_id)`,名称唯一性在应用层用 `(user_id, name)`
条件写保证。

### `usage` 表变更

新增 `user_id TEXT`(P3 再加 `team_id`)。**写入时冗余**,不在查询时 join,
原因:Key 可删除、用户可换团队,冗余值记录的是"请求发生时"的归属,这正是
计费需要的语义。SQL 索引 `idx_usage_user_ts(user_id, timestamp)`;DynamoDB GSI
`user-index (user_id, sort_key)`。

### 存量迁移:一个 Key → 一个用户

启动时检测到 `users` 表为空且 `api_keys` 非空时执行,单事务(SQL)或逐项
幂等条件写(DynamoDB):

1. 对每个现有 Key 创建一个用户:`name` = Key 名(冲突时追加 `-2`、`-3`);
   **预算/限额/倍率整体搬到用户层**:`cost_rate`、`monthly_budget`、
   `budget_used`、`budget_used_mtd`、`budget_mtd_month`、`budget_history`、
   `rate_limit`、`tpm_limit`、`cache_ttl`。
2. Key 的这些字段置 `NULL`(Key 只受用户层约束)。`budget_used*` 清零后从迁移
   时刻起重新累计(用户层已承接历史)。
3. 现有 Key 的 `rate_limit` 值为 DB 默认 100 而非显式设置的情况无法区分 →
   **原样搬过去**,保证零行为变化。
4. `usage` 回填 `user_id`:SQL 后端经 `key_id`/哈希一条 `UPDATE`;DynamoDB 需要
   **后台任务**分页 Scan + 条件 `UpdateItem`(幂等,进度检查点存
   `system_settings.usage_backfill_cursor`,完成写 `usage_backfill_done=true`),
   并新增 GSI `user-index (user_id, sort_key)`。回填完成前,用户维度报表对缺
   `user_id` 的旧行回退为按哈希 → Key → 用户映射。
5. 写入 `system_settings.user_migration_done = <version>`,防止重复执行。

由于每个用户恰好一个 Key,迁移后所有约束的结果与迁移前完全一致。

### 预算超限的表达方式

现状:超限时把 Key `is_active=false, deactivated_reason="budget_exceeded"`,
月初再 `reactivate`。问题是把"计数状态"和"管理员意图"混在一个字段里,而且
多层预算后无法表达"用户超限但 Key 本身没问题"。

改为:**预算超限是由计数器推导出来的状态,不修改 `is_active`**。

- 鉴权时检查每一层 `used_in_period >= budget` → 拒绝,错误消息指明哪一层
  (`User budget exceeded` / `Key budget exceeded` / `Team budget exceeded`)。
- 周期滚动(现有 `reset_monthly_budget` 逻辑)在各层独立进行。
- 迁移时 `deactivated_reason = "budget_exceeded"` 的 Key 恢复 `is_active=true`,
  由计数器继续约束(当月仍会被拒,下月自动恢复——与现状行为一致)。

### 计费累加

`UsageTracker::record_usage` 一次请求对 key + user(P3 + team)各做一次原子
累加。SQL 在同一事务内完成;DynamoDB 用 `TransactWriteItems`(≤ 3 项)。
单次请求的数据库写入从 2 次(usage + key)变为 3~4 次,内部场景可接受。

### 管理 API

```
GET    /admin/api/users                       列表(含预算用量、Key 数)
POST   /admin/api/users                       创建
GET    /admin/api/users/:user_id              详情(含 Key 列表)
PUT    /admin/api/users/:user_id              更新
DELETE /admin/api/users/:user_id              删除(须先无 Key,或 ?cascade=true 连同 Key 一起硬删)
POST   /admin/api/users/:user_id/deactivate|activate

GET    /admin/api/keys?user_id=               列表
POST   /admin/api/keys                        创建 {user_id, name, expires_at?, allowed_models?, 子限额?}
                                              兼容:不带 user_id 时自动建同名用户(保留旧调用方式一个版本)
GET/PUT/DELETE /admin/api/keys/:key_id
POST   /admin/api/keys/:key_id/deactivate|activate
```

`/admin/api/usage/summary` 的 `group_by` 新增 `user`;过滤参数新增
`user_id`,`api_key` 参数改为接受 `key_id`(兼容旧 name)。

`/v1/usage`(业务 Key 自查):默认仍只返回本 Key 的用量;新增 `scope=user`
返回所属用户全部 Key 的合计(同一用户的 Key 之间本就互相可见预算状态)。

### 白名单与过期的错误语义

| 情况 | HTTP | 错误类型 | 消息 |
|---|---|---|---|
| Key 过期 | 401 | `authentication_error` | `API key expired` |
| 用户停用 | 401 | `authentication_error` | `API key owner is inactive` |
| 模型不在白名单 | 403 | `permission_error` | `Model '<source_model>' is not allowed for this API key` |

模型白名单匹配的是**客户端请求的 source model id**(`model_mappings` 解析之前),
因为这是管理员和用户都能看到的名字;failover 切换到的 target 不再做二次检查
(failover 是网关内部行为)。`/v1/models` 按白名单过滤返回结果。

### Admin UI

- 新增「用户」页:列表(预算进度条、Key 数、状态)+ 详情抽屉(Key 列表、
  近 30 天用量)。
- 「API Keys」页改为按用户分组或按用户过滤;创建 Key 时必须选择用户
  (可在弹窗内快捷新建)。
- 预算/倍率/限流编辑从 `KeyModal.vue` 移到新的 `UserModal.vue`;`KeyModal`
  保留子限额(折叠在"高级"中)、过期时间、模型白名单。

---

## P2:运维能力

### 实施记录:与下文初稿的差异

| 主题 | 初稿 | 实现 |
|---|---|---|
| 审计写入点 | 各 handler 显式调用 | **中间件统一记录**所有 admin 写操作(位于 admin 鉴权层之内,读取鉴权写入的 `AdminActor`),动作/目标由路径推导(`PUT /keys/<id>` → `api_key.update`,动作集合有界);keys / users / settings 的 handler 通过响应扩展 `AuditDetail` 补充 before/after 快照。**失败的请求(4xx/5xx)同样记录**。登录成功/失败由登录 handler 显式记录 |
| 脱敏 | `audit::redact` 按类型脱敏 | **构造即安全**:快照只来自 Admin API 自己的响应类型(`AdminKeyItem` / `AdminUserItem`,不含明文和哈希);敏感设置(`ui_schema.sensitive`)只记 `<redacted>`;backend 凭证从不快照 |
| actor | `master` + session 前 8 位 | `master` / `ephemeral` / `session:<token 的 SHA-256 前 8 位 hex>`(不记录 token 本身的任何部分) |
| DynamoDB 审计保留 | 表 TTL | 与 SQL 一致的每日清理任务(Scan + 删除;admin 写入量小) |
| 信任代理 | `TRUSTED_PROXY_CIDRS` | 已实现;`X-Forwarded-For` 从右向左跳过受信代理取第一个非受信地址;未配置时完全忽略该头。IP 白名单在客户端地址未知时**拒绝**(fail closed) |
| 预算周期 | 新列 `budget_period_start`、重命名 `budget_used_period` | **不改列名**:沿用 `budget_mtd_month` 存"周期键"(`2026-11` / `2026-W45` / `2026-11-06`),`budget_used_mtd` 存本周期用量,新增 `budget_period` 列。修改周期后旧周期键与新格式不一致,按"已进入新周期"处理(计数从 0 起) |
| 告警去重 | 条件更新 | 对 `budget_alerts_sent` 做比较并交换(SQLite `IS ?`、Postgres `IS NOT DISTINCT FROM`、DynamoDB 条件表达式),最多重试 5 次;每个阈值每周期只发一次。告警 payload 中 Key 用 `key_id`,从不出现哈希 |
| 轮换 | 新旧 Key 同名 | 名称在用户内唯一,所以旧 Key 改名为 `<name>~rotated-<时间戳>-<key_id 前 8 位>`,新 Key 继承原名;新 Key **不继承**过期时间;已轮换过的 Key 再轮换返回 409。创建新 Key 失败时回滚旧 Key |
| 鉴权缓存 | 30s TTL + 本实例失效 | 已实现;任何 Key / 用户写操作对本实例 `invalidate_all`;不存在的 Key 负缓存 5s;TTL 上限 300s;设置为 0 关闭缓存 |
| 标签 | 维度 `group_by=tag` | 存储层按原始标签串分组,应用层拆分到每个标签(`a,b` 同时计入 a 和 b,无标签计入 `(none)`,因此各标签合计可能大于总量);`tag=` 过滤为精确匹配。Admin 与 `/v1/usage` 都支持 |
| Key 前缀 | `sk-or-` | 已实现,旧 `sk-` Key 继续有效 |

顺带修复:**鉴权在 P2 之前每个请求都读两次数据库**(Key + 用户),现在由缓存承担。

### P2-1 审计日志

**范围**:所有 admin 写操作(`POST/PUT/DELETE /admin/api/*`),包括 keys、users、
teams、backends、mappings、settings、pricing sync/import、update、login(成功
与失败)。业务请求不记审计(已有 usage 表与 metrics)。

**表 `audit_logs`**:

| 字段 | 说明 |
|---|---|
| `id` | UUIDv7(时间有序) |
| `timestamp` | RFC3339 |
| `actor` | `master` / `ephemeral`;经 session cookie 登录的记 `master` + `session_id` 前 8 位 |
| `source_ip` / `user_agent` | 取 `X-Forwarded-For` 首个地址(仅当配置为信任代理时)否则取对端地址 |
| `action` | `key.create` / `key.update` / `key.delete` / `key.rotate` / `user.update` / `backend.create` / `setting.update` / `auth.login_failed` … |
| `target_type` / `target_id` | 如 `api_key` / `<key_id>` |
| `before` / `after` | JSON 快照,**敏感字段脱敏** |
| `request_id` | 与日志关联 |

**脱敏规则**:backend 凭证(AK/SK、API key、session token)、
`web_search_api_key`、任何 Key 明文与哈希一律替换为 `"<redacted>"`;Key 只记录
`key_display`。脱敏在一个统一的 `audit::redact(target_type, value)` 中实现,
新增敏感字段时只改这一处,并有单测覆盖每种 target_type。

**写入策略**:handler 在变更成功后显式调用 `AuditLogger::record(...)`(需要
before/after,中间件拿不到)。**best-effort**:审计写入失败记 `error` 日志 +
`onerouter_audit_write_failures_total`,不回滚业务变更。理由:admin 操作低频,
用指标告警即可发现;而强一致需要跨表事务,DynamoDB 下代价高。

**存储**:SQL 表加索引 `(timestamp)`、`(target_type, target_id, timestamp)`。
DynamoDB:PK `month`(`YYYY-MM`)+ SK `timestamp#id`,GSI `target-index
(target_key = "type#id", sort_key)`;每月一个分区对 admin 写入量足够。

**保留期**:设置 `audit_log_retention_days`(默认 `365`,`0` = 永久)。SQL 由
后台任务每日删除过期行;DynamoDB 写入时带 `ttl` 属性,由表 TTL 自动清理。

**查询**:`GET /admin/api/audit?action=&target_type=&target_id=&start=&end=&cursor=`,
Admin UI 新增「审计日志」页,并在 Key / 用户 / backend 详情中显示该对象的变更历史。

### P2-2 可配置的预算周期

`monthly_budget` 泛化为 `budget` + `budget_period`:

| `budget_period` | 重置时刻(UTC) |
|---|---|
| `monthly`(默认,迁移值) | 每月 1 日 00:00 |
| `weekly` | 每周一 00:00 |
| `daily` | 每日 00:00 |

`budget_mtd_month` 泛化为 `budget_period_start`(该周期起点的日期字符串),
`budget_used_mtd` 改名为 `budget_used_period`(SQL 保留旧列名做别名一个版本,
减少迁移风险)。`budget_history` 的键随周期变成 `2026-11` / `2026-W45` / `2026-11-06`。
周期判断仍是写入/鉴权时懒计算(沿用 `is_new_month` 的模式),不依赖定时任务。

### P2-3 预算告警

- 设置 `budget_alert_thresholds`:默认 `[0.8, 1.0]`。
- 设置 `budget_alert_webhook_url`:必须 https;payload 兼容 Slack incoming
  webhook(`{"text": "..."}`),同时带结构化字段 `{scope, id, name, budget, used, threshold, period}`。
  为空则只打日志和指标。
- **去重**:每层主体记录 `budget_alerts_sent = {"period": "2026-11", "thresholds": [0.8]}`;
  跨过阈值时用条件更新(SQL `WHERE` / DynamoDB `ConditionExpression`)抢占,
  抢到的实例才发送,保证多实例下每阈值每周期只发一次。
- 发送异步执行、超时 5s、失败重试 3 次后放弃并记指标
  `onerouter_budget_alerts_total{scope, result}`。不阻塞请求路径。
- `user.email` 目前仅随 payload 带出,网关不直接发邮件。

### P2-4 Key 轮换

`POST /admin/api/keys/:key_id/rotate {grace_period_secs?: 86400}`:

1. 新建一个 Key:同一 `user_id`、复制名称/白名单/子限额,返回新明文(仅此一次)。
2. 旧 Key 设置 `expires_at = now + grace_period`(若原过期时间更早则保留更早的),
   并记录 `rotated_to = <new key_id>`。
3. 写审计 `key.rotate`(before/after 均只含 `key_display`)。

新旧 Key 是两个独立的 `key_id`:用量按用户聚合不受影响,按 Key 查看时 UI
通过 `rotated_to` 链展示"轮换历史"。`grace_period_secs = 0` 即立即作废。

### P2-5 `last_used_at`

鉴权成功后更新,但做**进程内去抖**:同一 Key 距上次写入不足 5 分钟则跳过。
写入异步、失败忽略。UI 列表显示"最近使用",并支持筛选"超过 N 天未使用"
以便清理。

### P2-6 鉴权缓存(解决 B6)

- moka 缓存 `key_hash → ApiKeyInfo`,TTL `auth_cache_ttl_secs`(默认 `30`,
  `0` = 关闭),同时缓存"不存在"结果(TTL 5s,防止无效 Key 打穿数据库)。
- 本实例的 admin 写操作主动失效相关条目(Key、用户及其下所有 Key、团队及其
  下所有用户)。
- **跨实例**:其他实例最多在 TTL 后生效。即"吊销最长有 30s 延迟",在文档和
  Admin UI 删除确认框中明示。
- 缓存的是配置与身份;预算用量也随缓存读取,意味着软预算判断可能滞后 ≤ TTL,
  P3 的预扣模式不经过缓存。

### P2-7 IP 白名单

key 与 user 层新增 `allowed_cidrs`(JSON 数组,如 `["10.0.0.0/8"]`),取交集。
客户端地址的获取复用审计日志的"信任代理"配置:新增基础设施环境变量
`TRUSTED_PROXY_CIDRS`(默认空 = 只信任对端地址,不读 `X-Forwarded-For`)。
App Runner 部署需要配置为其负载均衡的地址段,文档给出示例。不命中 → 403
`permission_error`。

### P2-8 用量标签

- 请求头 `x-onerouter-tags: projA,ci`(≤ 5 个,每个 ≤ 64 字符,`[A-Za-z0-9_.:-]`,
  超出部分丢弃并 warn)。Key/用户层可配置 `default_tags` 合并进来。
- `usage` 新增 `tags TEXT`(逗号拼接)。
- `/admin/api/usage/summary` 支持 `tag=` 过滤和 `group_by=tag`;tag 维度在
  应用层聚合(SQL 用 `LIKE` 预过滤缩小范围),不在三种后端各写一套 JSON 展开。
- 标签**不进** Prometheus label(基数不受控)。

### P2-9 新 Key 前缀

新生成的 Key 格式改为 `sk-or-<32 hex>`,旧 `sk-<32 hex>` 继续有效。可识别的
前缀便于 secret scanning 规则(内部代码仓库扫描)命中泄露的 Key。

---

## P3:团队、预扣、共享限流

### 实施记录:与下文初稿的差异

| 主题 | 初稿 | 实现 |
|---|---|---|
| 团队 `cost_rate` | 用户为空时取团队 | 用户的 `cost_rate` 不可为空,所以改为**相乘**:有效倍率 = 用户倍率 × 团队倍率(团队默认 1.0,可表达团队折扣) |
| 团队成员管理 | 单独的成员增删接口 | 通过 `PUT /admin/api/users/:user {"team": <id 或名称> / null}`;团队详情返回成员列表。删除有成员的团队返回 409,`?force=true` 先把成员移出团队 |
| 团队 RPM | — | 只有显式设置时才限制(不回退到全局默认,全局默认只作用于用户层) |
| 并发上限 | 进程内信号量;数据库模式用租约 | **只做进程内**(三层计数器,任一层满即 429 `kind=concurrency`),槽位在响应 body 结束(或客户端断开)时释放,流式响应全程占用。数据库租约未实现 |
| 共享限流 | `rate_counters` 固定窗口 + 两窗口加权 | 已实现:RPM 先计数后判断,超限时**回退本次计数**;TPM 读两个窗口判断、响应后累加。SQLite/Postgres 用 `INSERT … ON CONFLICT … RETURNING`;DynamoDB 用 `ADD` 原子更新 + 表 TTL;SQL 后端每 10 分钟清理过期窗口。存储出错时**放行**并计入 `onerouter_rate_limit_store_errors_total` |
| 预扣估算 | 输入用 `utils/tokens` 估算 | 输入按 body 字节数 / 4 估算(上限 200k tokens,不解析 body——各协议 body 形态不同,而多估的部分结算时会退回);输出 = `min(max_tokens / max_output_tokens / max_completion_tokens, cap)` |
| 预扣原子性 | 各层同事务 / `TransactWriteItems` | 各层分别做**条件增量**(`spend <= budget - estimate`,阈值由客户端算出,因为 DynamoDB 条件表达式不能做加法);任一层失败则回滚已预扣的层并 403 |
| 结算时机 | 请求结束后按差额修正 | 结算挂在**响应 body 结束时**(含流式、含客户端断开),而不是 `record_usage` 里——这样 handler 的任何错误路径(没调用 `record_usage`)都会按实际花费 0 全额退回。`record_usage` 只把实际花费累加进结算单,不再自己累加预算 |
| 预扣适用范围 | — | 仅 `POST /v1/messages`、`/v1/chat/completions`、`/v1/responses`、`/v1/embeddings`,且调用方至少有一层设置了预算;存储出错时本请求退回 soft 模式 |
| 周期滚动 | — | 预扣前先做各层的懒重置并同步到请求上下文,避免"预扣后被月初重置抹掉" |

### P3-1 团队

`teams` 表:`team_id`、`name`、`is_active`、`cost_rate`、预算全套字段
(`budget` / `budget_period` / 用量 / 历史 / 告警去重)、`rate_limit`、`tpm_limit`、
`max_concurrency`、`allowed_models`、`allowed_cidrs`、`metadata`。

- 用户最多属于一个团队(`users.team_id`),团队是可选的。
- 团队只是**计费与限额的汇总层**,不涉及权限(RBAC 不在范围内)。
- `usage` 冗余 `team_id`;`group_by=team`;迁移无需回填(历史行 `team_id`
  为空,团队报表从加入时刻起统计,UI 说明)。
- 用户换团队:之前的用量留在原团队,之后的计入新团队(由写入时冗余天然保证)。
- 管理 API `/admin/api/teams` CRUD + 成员增删。

### P3-2 并发上限

key / user / team 层 `max_concurrency`。进程内信号量在请求开始时获取、在响应
(含流式)结束时释放——流式场景释放点挂在 SSE stream 的 `Drop` 上,保证客户端
断开也会释放。数据库共享模式下(P3-3)用"租约计数 + 过期时间"实现,租约
120s,长流式每 60s 续租。

### P3-3 共享限流(解决 B5)

新设置 `rate_limit_store`:`memory`(默认,现状)/ `database`。

`database` 模式使用固定窗口计数表 `rate_counters(subject, window_start, requests, tokens, ttl)`,
配合 P0-4 的两窗口加权近似:

- SQL:`INSERT … ON CONFLICT (subject, window_start) DO UPDATE SET requests = requests + 1 RETURNING requests, tokens`。
- DynamoDB:`UpdateItem ADD requests :1` + `ReturnValues=ALL_NEW`,带 `ttl` 自动清理。
- 每层主体每请求 1 次读改写;key/user/team 三层合计 3 次。代价写入文档,由
  部署方按规模取舍。
- 数据库不可用时**放行**并记 `onerouter_rate_limit_store_errors_total`(限流是
  保护措施,不应成为可用性单点)。
- SQLite 部署本就是单实例,保持 `memory` 即可。
- 未来如需更高吞吐可加 Redis 实现同一 `RateCounterStore` trait,不在本设计范围。

### P3-4 预算预扣(解决 B4)

新设置 `budget_enforcement`:`soft`(默认,现状:先用后扣,可能超支)/ `precharge`。

`precharge` 模式:

1. 请求进入时估算成本:`estimate = 输入 tokens 估算(utils/tokens.rs) × 输入单价
   + min(max_tokens, budget_precharge_output_cap) × 输出单价`,再乘 `cost_rate`。
   `budget_precharge_output_cap` 默认 `8192`,避免 `max_tokens: 64000` 的请求在
   预算尾部被过早拒绝。
2. 对每一层做**条件原子累加**:`used + estimate <= budget` 才成功(SQL 同事务;
   DynamoDB `TransactWriteItems` + `ConditionExpression`)。任一层失败 → 整体
   回滚并 429 `budget exceeded`。
3. 请求结束:各层累加 `actual - estimate`(可为负)。
4. 进程崩溃导致第 3 步缺失时,该请求按估算值计费——偏保守、有上界,并记日志。

`precharge` 模式下仍可能有少量超支(单请求实际输出超过 cap 的部分),但上界
从"并发数 × 单请求成本"降到"并发数 × 超出 cap 的部分"。预扣路径**不使用**
鉴权缓存中的用量值。

价格缺失(mapping 未配置价格)时估算为 0,即对该模型退化为 `soft` 行为,
与现状"无价格不计费"一致。

---

## 新增 / 变更的系统设置汇总

| Key | 默认 | 阶段 |
|---|---|---|
| `audit_log_retention_days` | `365` | P2 |
| `budget_alert_thresholds` | `[0.8, 1.0]` | P2 |
| `budget_alert_webhook_url` | _(空)_ | P2 |
| `auth_cache_ttl_secs` | `30` | P2 |
| `rate_limit_store` | `memory` | P3 |
| `budget_enforcement` | `soft` | P3 |
| `budget_precharge_output_cap` | `8192` | P3 |

基础设施环境变量:`TRUSTED_PROXY_CIDRS`(P2,默认空)。

内部状态键(不在 UI 展示):`usage_backfill_cursor`、`usage_backfill_done`、
`user_migration_done`。

## 迁移脚本

在 `scripts/migrations/{sqlite,postgres,dynamodb}/` 下按阶段新增编号脚本
(`006_api_key_id.*` ✅ / DynamoDB `003_api_key_ids.sh` ✅、`007_users.*`、`008_audit_logs.*`、`009_teams.*`、
`010_rate_counters.*`),内容与启动时自动迁移一致,供预部署执行。DynamoDB
脚本负责建表、建 GSI、开启 `audit_logs` / `rate_counters` 表的 TTL。

**降级说明**:P1 迁移把预算字段搬到用户层后,回退到旧版本会看到 Key 层预算为空
(即不受限)。升级 release notes 必须写明:回退前需手动把预算写回 Key,或先
备份数据库。

## 测试计划

- **单元**:层级合并规则(每个维度各一组用例,含 `NULL` 继承与交集为空);
  TPM 两窗口近似;脱敏覆盖所有 target_type;预算周期边界(月末、周一、
  跨年 ISO 周);预扣的估算与差额修正。
- **存储层**(三种后端各跑一遍现有的存储测试套件):key_id/user_id 回填幂等;
  `(user_id, name)` 唯一约束;多层预算条件累加的原子性(并发 50 请求不超支);
  告警去重的条件写。
- **迁移**:用当前版本生成含多 Key、超预算 Key、`deleted` Key 的数据库快照,
  升级后逐项断言鉴权结果、限流值、预算状态与升级前一致。
- **端到端**:本地网关 + 真实 Claude Code / Codex,覆盖 Key 过期、模型白名单
  拒绝、轮换宽限期内新旧 Key 均可用、硬删后用量报表仍按用户正确聚合。

## 实施顺序与发布节奏

| 版本 | 内容 | 兼容性 |
|---|---|---|
| P0 ✅ | key_id + 回填、硬删除、`/keys/:key_id`(兼容 name)、TPM、限流缓存键、全局 RPM 热更新、metadata、`/v1/usage` 修复 | 完全向后兼容(无参 `DELETE` 仍为停用) |
| P1 ✅ | users 表 + 自动迁移、多 Key、用户级计费、过期、模型白名单、UI 用户页 | 行为不变;**不可无损回退** |
| P2 ✅ | 审计日志、预算周期、告警、轮换、last_used、鉴权缓存、IP 白名单、标签、Key 前缀 | 向后兼容(name 路径兼容与无参 `DELETE` 的停用语义暂未移除,留待下个 minor 版本) |
| P3 ✅ | 团队、并发上限、共享限流、预扣 | 新能力默认关闭(`rate_limit_store = memory`、`budget_enforcement = soft`) |

建议 P0 与 P1 分两个 minor 版本发布:P0 完全向后兼容、可随时回退;P1 的用户
迁移不可无损回退,单独发布便于在出问题时定位。
