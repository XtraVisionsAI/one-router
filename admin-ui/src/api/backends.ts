import { useApi } from '@/composables/useApi'
import type { BackendSummary, UpsertBackendBody, ListResponse } from './types'

export function useBackendsApi() {
  const { request } = useApi()

  return {
    list: () =>
      request<ListResponse<BackendSummary>>('GET', '/backends'),

    getConfig: (name: string) =>
      request<{ config: Record<string, unknown> }>('GET', `/backends/${encodeURIComponent(name)}/config`),

    create: (body: UpsertBackendBody) =>
      request<BackendSummary>('POST', '/backends', body),

    update: (name: string, body: UpsertBackendBody) =>
      request<BackendSummary>('PUT', `/backends/${encodeURIComponent(name)}`, body),

    toggle: (name: string) =>
      request<BackendSummary>('PUT', `/backends/${encodeURIComponent(name)}/toggle`),

    delete: (name: string) =>
      request<{ ok: boolean }>('DELETE', `/backends/${encodeURIComponent(name)}`),
  }
}
