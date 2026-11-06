// ── Backends ──────────────────────────────────────────────────
export interface BackendSummary {
  name: string
  backend_type: string
  enabled: boolean
  priority: number
  weight: number
  strategy: string
  max_failures: number
  retry_after_secs: number
  service_tier: string | null
  models: string[] | null
  health_status: string
  config_summary: Record<string, unknown>
}

export interface UpsertBackendBody {
  name: string
  backend_type: string
  priority: number
  weight?: number
  enabled: boolean
  strategy?: string
  max_failures?: number
  retry_after_secs?: number
  service_tier?: string | null
  models?: string[]
  config?: Record<string, unknown>
}

// ── Users ─────────────────────────────────────────────────────
export type BudgetPeriod = 'monthly' | 'weekly' | 'daily'

export interface User {
  user_id: string
  name: string
  email: string | null
  team_id: string | null
  max_concurrency: number | null
  is_active: boolean
  cost_rate: number
  monthly_budget: number | null
  budget_used_mtd: number
  budget_used: number
  budget_history: Record<string, number> | null
  rate_limit: number | null // shared RPM; null = global default
  tpm_limit: number | null
  allowed_models: string[] | null
  cache_ttl: string | null
  allowed_cidrs: string[] | null
  budget_period: BudgetPeriod
  default_tags: string[] | null
  metadata: Record<string, unknown> | null
  key_count: number
  created_at: number
  updated_at: number | null
}

export interface UserDetail extends User {
  keys: ApiKey[]
}

export interface UserBody {
  name?: string
  email?: string | null
  team?: string | null
  max_concurrency?: number | null
  cost_rate?: number
  monthly_budget?: number | null
  rate_limit?: number | null
  tpm_limit?: number | null
  allowed_models?: string[] | null
  cache_ttl?: string | null
  metadata?: Record<string, unknown> | null
  allowed_cidrs?: string[] | null
  budget_period?: BudgetPeriod
  default_tags?: string[] | null
}

// ── API Keys ──────────────────────────────────────────────────
export interface ApiKey {
  key_id: string // stable identifier used in admin API paths
  api_key: string // masked display form (e.g. "sk-abcd••••5678")
  name: string
  user_id: string
  user_name: string | null
  deactivated_reason: string | null
  rate_limit: number | null // key-level sub-limit
  tpm_limit: number | null
  monthly_budget: number | null
  budget_used_mtd: number
  budget_used: number
  cache_ttl: string | null
  expires_at: number | null // unix seconds
  allowed_models: string[] | null
  allowed_cidrs: string[] | null
  budget_period: BudgetPeriod
  default_tags: string[] | null
  last_used_at: number | null
  rotated_to: string | null
  max_concurrency: number | null
  is_active: boolean
  metadata: Record<string, unknown> | null
  created_at: number
  updated_at: number | null
}

export interface CreateKeyBody {
  name: string
  user_id: string
  rate_limit?: number | null
  monthly_budget?: number | null
  tpm_limit?: number | null
  cache_ttl?: string | null
  expires_at?: number | null
  allowed_models?: string[] | null
  allowed_cidrs?: string[] | null
  budget_period?: BudgetPeriod
  default_tags?: string[] | null
  max_concurrency?: number | null
  metadata?: Record<string, unknown> | null
}

export interface UpdateKeyBody {
  name?: string
  rate_limit?: number | null
  monthly_budget?: number | null
  tpm_limit?: number | null
  cache_ttl?: string | null
  expires_at?: number | null
  allowed_models?: string[] | null
  allowed_cidrs?: string[] | null
  budget_period?: BudgetPeriod
  default_tags?: string[] | null
  max_concurrency?: number | null
  metadata?: Record<string, unknown> | null
}

// ── Model Mappings ────────────────────────────────────────────

export interface ModelCapabilities {
  thinking: { enabled: boolean; style: 'claude' | 'nova2' | 'kimi' | 'effort' }
  document: { enabled: boolean }
  tool_use: { enabled: boolean; required_choice: boolean }
  ptc: { enabled: boolean }
}

export const defaultCapabilities = (): ModelCapabilities => ({
  thinking: { enabled: true, style: 'claude' },
  document: { enabled: true },
  tool_use: { enabled: true, required_choice: true },
  ptc: { enabled: false }
})

export interface ModelMapping {
  source_model_id: string
  target_model_id: string
  provider: string
  display_name: string
  priority: number
  status: string
  input_price: number
  output_price: number
  cache_read_price: number
  cache_write_price: number
  pricing_source: string
  /** JSON-encoded ModelCapabilities as returned by the API. null = gateway defaults. */
  capabilities?: string | null
}

export interface UpsertMappingBody {
  source_model_id: string
  target_model_id: string
  provider: string
  display_name: string
  priority: number
  status: string
  input_price: number
  output_price: number
  cache_read_price: number
  cache_write_price: number
  pricing_source: string
  capabilities?: string | null
}

// ── System Settings ───────────────────────────────────────────
export interface SystemSetting {
  key: string
  value: string
  description: string
  ui_schema: string | null
  updated_at: number | null
}

export interface UiSchema {
  type: 'text' | 'select' | 'bool' | 'number' | 'password'
  label: string
  options?: Array<{ label: string; value: string }>
  group?: string
  sort_order?: number
  sensitive?: boolean
  placeholder?: string
}

export interface UpsertSettingBody {
  value: string
  description?: string
}

// ── Usage ─────────────────────────────────────────────────────
export interface UsageSummaryRow {
  group_key: string
  split_key?: string | null
  total_requests: number
  error_requests: number
  input_tokens: number
  output_tokens: number
  cached_tokens: number
  cache_write_tokens: number
  total_cost: number
}

export interface UsageSummaryResponse {
  data: UsageSummaryRow[]
  summary: {
    total_requests: number
    total_input_tokens: number
    total_output_tokens: number
    total_cached_tokens: number
    total_cost: number
  }
}

// ── Status ────────────────────────────────────────────────────
export interface StatusResponse {
  version: string
  uptime_seconds: number
}

// ── Generic list wrapper ──────────────────────────────────────
export interface ListResponse<T> {
  object: string
  data: T[]
}

// ── Audit log ─────────────────────────────────────────────────
export interface AuditEntry {
  id: string
  timestamp: string
  actor: string
  source_ip: string | null
  user_agent: string | null
  action: string
  target_type: string | null
  target_id: string | null
  status: number
  method: string
  path: string
  before_json: unknown
  after_json: unknown
}

export interface AuditListResponse {
  object: 'list'
  data: AuditEntry[]
  has_more: boolean
}

// ── Teams ─────────────────────────────────────────────────────
export interface Team {
  team_id: string
  name: string
  is_active: boolean
  cost_rate: number
  monthly_budget: number | null
  budget_period: BudgetPeriod
  budget_used_mtd: number
  budget_used: number
  rate_limit: number | null
  tpm_limit: number | null
  max_concurrency: number | null
  allowed_models: string[] | null
  allowed_cidrs: string[] | null
  metadata: Record<string, unknown> | null
  member_count: number
  created_at: number
}

export interface TeamBody {
  name?: string
  cost_rate?: number
  monthly_budget?: number | null
  budget_period?: BudgetPeriod
  rate_limit?: number | null
  tpm_limit?: number | null
  max_concurrency?: number | null
  allowed_models?: string[] | null
  allowed_cidrs?: string[] | null
  metadata?: Record<string, unknown> | null
}
