import type { ListResponse, ModelMapping, UpsertMappingBody } from './types'
import { useApi } from '@/composables/useApi'

export function useMappingsApi() {
  const { request } = useApi()

  return {
    list: () => request<ListResponse<ModelMapping>>('GET', '/mappings'),

    create: (body: UpsertMappingBody) => request<ModelMapping>('POST', '/mappings', body),

    update: (sourceModelId: string, provider: string, body: UpsertMappingBody) =>
      request<ModelMapping>(
        'PUT',
        `/mappings/${encodeURIComponent(sourceModelId)}/${encodeURIComponent(provider)}`,
        body
      ),

    delete: (sourceModelId: string, provider: string) =>
      request<{ ok: boolean }>(
        'DELETE',
        `/mappings/${encodeURIComponent(sourceModelId)}/${encodeURIComponent(provider)}`
      )
  }
}
