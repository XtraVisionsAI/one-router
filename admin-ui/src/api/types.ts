// ── Backends ──────────────────────────────────────────────────
export interface BackendSummary {
  name: string
  backend_type: string
  enabled: boolean
  priority: number
  health_status: string
  config_summary: Record<string, unknown>
}

export interface UpsertBackendBody {
  name: string
  backend_type: string
  priority: number
  enabled: boolean
  config?: Record<string, unknown>
}

// ── API Keys ──────────────────────────────────────────────────
export interface ApiKey {
  api_key: string
  name: string
  user_id: string
  rate_limit: number
  monthly_budget: number | null
  budget_used_mtd: number | null
  service_tier: string
  is_active: boolean
  created_at: number
}

export interface CreateKeyBody {
  name: string
  user_id: string
  rate_limit: number
  monthly_budget: number | null
  service_tier: string
}

export interface UpdateKeyBody {
  name: string
  rate_limit: number
  monthly_budget: number | null
  service_tier: string
}

// ── Model Mappings ────────────────────────────────────────────
export interface ModelMapping {
  source_model_id: string
  target_model_id: string
  provider: string
  display_name: string
  priority: number
  status: string
  input_price: number
  output_price: number
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
}

// ── Feature Flags ─────────────────────────────────────────────
export interface FeatureFlag {
  name: string
  enabled: boolean
  description: string
}

// ── Usage ─────────────────────────────────────────────────────
export interface UsageSummaryRow {
  group_key: string
  total_requests: number
  error_requests: number
  input_tokens: number
  output_tokens: number
  total_cost: number
}

export interface UsageSummaryResponse {
  data: UsageSummaryRow[]
  summary: {
    total_requests: number
    total_input_tokens: number
    total_output_tokens: number
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
