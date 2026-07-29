import { useApi } from '@/composables/useApi'

export interface PricingSyncSummary {
  updated: string[]
  skipped_manual: string[]
  not_found: string[]
  unchanged: number
  source_models: number
  dry_run: boolean
  /** Unix seconds when the sync finished */
  synced_at: number | null
}

export function usePricingApi() {
  const { request } = useApi()

  return {
    /** Last (non-dry-run) sync summary, or null if never synced */
    status: () => request<{ last_sync: PricingSyncSummary | null }>('GET', '/pricing/sync'),

    /** Run a sync against the LiteLLM price table */
    sync: (opts?: { dryRun?: boolean; overwriteManual?: boolean }) => {
      const params = new URLSearchParams()
      if (opts?.dryRun) params.set('dry_run', 'true')
      if (opts?.overwriteManual) params.set('overwrite_manual', 'true')
      const qs = params.toString()
      return request<PricingSyncSummary>('POST', `/pricing/sync${qs ? `?${qs}` : ''}`)
    },

    /** Browse importable LiteLLM entries for a provider */
    models: (provider: string, q: string) => {
      const params = new URLSearchParams({ provider })
      if (q) params.set('q', q)
      return request<{ data: ImportCandidate[] }>('GET', `/pricing/models?${params}`)
    },

    /** Create mappings from selected LiteLLM entries */
    import: (provider: string, items: { key: string; source_model_id?: string }[]) =>
      request<ImportSummary>('POST', '/pricing/import', { provider, items })
  }
}

/** One importable LiteLLM table entry with derived mapping fields */
export interface ImportCandidate {
  key: string
  target_model_id: string
  suggested_source_id: string
  mode: string
  input_price: number
  output_price: number
  cache_read_price: number | null
  cache_write_price: number | null
  supports_reasoning: boolean
  supports_function_calling: boolean
  max_input_tokens: number | null
  max_output_tokens: number | null
  capabilities: string
  /** A mapping with (suggested_source_id, provider) already exists */
  exists: boolean
}

export interface ImportSummary {
  created: string[]
  skipped_existing: string[]
  not_found: string[]
}
