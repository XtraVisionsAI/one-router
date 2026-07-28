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
    }
  }
}
