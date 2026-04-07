# ENCRYPTION_KEY Rotation Support

## Status: Planned

## Problem

当前 ENCRYPTION_KEY 一旦设置不可修改：
- **Backend 凭证** (AES-256-GCM)：可用旧 key 解密再用新 key 重新加密 — 技术上可迁移
- **API key** (HMAC-SHA256)：单向 hash 不可逆，key 变更后所有已发放的 API key 永久失效

## Proposed Solution

三列存储方案 — 兼顾查询性能、安全性和 rotation 能力：

```
api_key       = HMAC-SHA256 hash（查询索引，不可逆，用于认证时快速定位）
key_encrypted = AES-256-GCM 加密（可逆，仅用于 key rotation 时恢复明文）
key_display   = 中间 mask（显示用，如 sk-abcd••••5678）
```

### Rotation 流程

```
1. 设置 ENCRYPTION_KEY_OLD = <current key>
2. 设置 ENCRYPTION_KEY = <new key>
3. 启动时检测到双 key：
   a. 遍历所有 api_keys：
      - 用 OLD key 解密 key_encrypted → 得到明文
      - 用 NEW key 重新计算 HMAC → 更新 api_key
      - 用 NEW key 重新加密 → 更新 key_encrypted
      - 同步更新 usage 表中对应的 api_key hash
   b. 遍历所有 backends：
      - 用 OLD key 解密 config → 用 NEW key 重新加密
4. 迁移完成后移除 ENCRYPTION_KEY_OLD
```

### 方案对比

| 方案 | 可逆 | Key Rotation | 查询性能 | 安全性 |
|------|------|-------------|---------|--------|
| HMAC-SHA256 only（当前） | ❌ | ❌ 不可能 | 极快 (WHERE hash = ?) | 高 |
| AES-256-GCM only | ✅ | ✅ | ❌ 无法直接查（随机 nonce） | 高 |
| **HMAC + AES 双列**（推荐） | ✅ | ✅ | ✅ HMAC 做索引 | 高 |

### Schema 变更

```sql
ALTER TABLE api_keys ADD COLUMN key_encrypted TEXT DEFAULT '';
```

### 安全考量

- `key_encrypted` 存储的是 AES 密文，数据库泄露后仍需 ENCRYPTION_KEY 才能解密
- HMAC hash 即使 key 泄露也无法反推明文（单向）
- 双列方案的安全性不低于单 AES 方案，且查询不需要解密全表
- API key 是高熵随机串 (sk- + 32 hex)，不存在字典攻击风险

### Implementation Notes

- 新增 `key_encrypted` 列到 api_keys 表（三个后端）
- 新建 key 时同时写入 HMAC hash + AES 密文
- CLI 子命令 `one-router rotate-key` 或启动时自动检测 `ENCRYPTION_KEY_OLD`
- 迁移是原子操作：用事务确保所有记录同时更新

### Priority

低 — 当前 auto-generate 机制确保首次启动就有 key，正常使用不需要 rotation。
仅在 key 泄露或合规要求定期轮换时需要。
