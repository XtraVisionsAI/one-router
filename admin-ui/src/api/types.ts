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
  config?: Record<string, unknown>
}

// ── API Keys ──────────────────────────────────────────────────
export interface ApiKey {
  api_key: string // masked display form (e.g. "sk-abcd••••5678")
  key_display: string
  name: string
  rate_limit: number
  monthly_budget: number | null
  budget_used_mtd: number | null
  tpm_limit: number | null
  cache_ttl: string | null
  cost_rate: number
  is_active: boolean
  created_at: number
}

export interface CreateKeyBody {
  name: string
  rate_limit: number
  monthly_budget: number | null
  tpm_limit?: number | null
  cache_ttl?: string | null
  cost_rate: number
}

export interface UpdateKeyBody {
  name?: string
  rate_limit?: number
  monthly_budget?: number | null
  tpm_limit?: number | null
  cache_ttl?: string | null
  cost_rate?: number
}

// ── Model Mappings ────────────────────────────────────────────

export interface ModelCapabilities {
  thinking: { enabled: boolean; style: 'claude' | 'nova2' | 'kimi' }
  document: { enabled: boolean }
  tool_use: { enabled: boolean }
  ptc: { enabled: boolean }
}

export const defaultCapabilities = (): ModelCapabilities => ({
  thinking: { enabled: true, style: 'claude' },
  document: { enabled: true },
  tool_use: { enabled: true },
  ptc: { enabled: false },
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
  capabilities?: ModelCapabilities | null
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
  capabilities?: string | null
}

// ── System Settings ───────────────────────────────────────────
export interface SystemSetting {
  key: string
  value: string
  description: string
  updated_at: number | null
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
