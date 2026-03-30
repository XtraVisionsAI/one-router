import { useApi } from '@/composables/useApi'
import type { FeatureFlag, ListResponse } from './types'

export function useFlagsApi() {
  const { request } = useApi()

  return {
    list: () =>
      request<ListResponse<FeatureFlag>>('GET', '/flags'),

    update: (name: string, enabled: boolean) =>
      request<{ ok: boolean }>('PUT', `/flags/${encodeURIComponent(name)}`, { enabled }),
  }
}
