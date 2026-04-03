import type { UsageSummaryResponse } from './types'
import { useApi } from '@/composables/useApi'

export interface UsageSummaryParams {
  group_by: 'hour' | 'model'
  api_key?: string
  start_time?: string
  end_time?: string
}

export function useUsageApi() {
  const { request } = useApi()

  return {
    summary: (params: UsageSummaryParams) => {
      const qs = new URLSearchParams({ group_by: params.group_by })
      if (params.api_key) qs.set('api_key', params.api_key)
      if (params.start_time) qs.set('start_time', params.start_time)
      if (params.end_time) qs.set('end_time', params.end_time)
      return request<UsageSummaryResponse>('GET', `/usage/summary?${qs.toString()}`)
    }
  }
}
