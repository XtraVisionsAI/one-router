import { useApi } from '@/composables/useApi'
import type { ApiKey, CreateKeyBody, UpdateKeyBody, ListResponse } from './types'

export function useKeysApi() {
  const { request } = useApi()

  return {
    list: () =>
      request<ListResponse<ApiKey>>('GET', '/keys'),

    create: (body: CreateKeyBody) =>
      request<ApiKey & { api_key: string }>('POST', '/keys', body),

    update: (key: string, body: UpdateKeyBody) =>
      request<ApiKey>('PUT', `/keys/${encodeURIComponent(key)}`, body),

    activate: (key: string) =>
      request<{ ok: boolean }>('POST', `/keys/${encodeURIComponent(key)}/activate`),

    deactivate: (key: string) =>
      request<{ ok: boolean }>('DELETE', `/keys/${encodeURIComponent(key)}?action=deactivate`),
  }
}
