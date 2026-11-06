import type { AuditListResponse } from './types'
import { useApi } from '@/composables/useApi'

export interface AuditParams {
  action?: string
  target_type?: string
  target_id?: string
  before?: string
  limit?: number
}

export function useAuditApi() {
  const { request } = useApi()
  return {
    list: (p: AuditParams) => {
      const qs = new URLSearchParams()
      for (const [k, v] of Object.entries(p)) if (v !== undefined && v !== null && v !== '') qs.set(k, String(v))
      return request<AuditListResponse>('GET', `/audit?${qs.toString()}`)
    }
  }
}
