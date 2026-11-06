import type { ApiKey, CreateKeyBody, ListResponse, UpdateKeyBody } from './types'
import { useApi } from '@/composables/useApi'

export function useKeysApi() {
  const { request } = useApi()
  const path = (keyId: string) => `/keys/${encodeURIComponent(keyId)}`

  return {
    list: (userId?: string) =>
      request<ListResponse<ApiKey>>('GET', userId ? `/keys?user=${encodeURIComponent(userId)}` : '/keys'),

    create: (body: CreateKeyBody) =>
      request<{ key_id: string; user_id: string; api_key: string; name: string }>('POST', '/keys', body),

    update: (keyId: string, body: UpdateKeyBody) => request<ApiKey>('PUT', path(keyId), body),

    activate: (keyId: string) => request<ApiKey>('POST', `${path(keyId)}/activate`),

    deactivate: (keyId: string) => request<{ ok: boolean }>('POST', `${path(keyId)}/deactivate`),

    /** Issue a replacement; the old key keeps working for `graceSecs`. */
    rotate: (keyId: string, graceSecs: number) =>
      request<{ key_id: string; api_key: string; name: string; old_key_id: string; old_expires_at: number }>(
        'POST',
        `${path(keyId)}/rotate`,
        { grace_period_secs: graceSecs }
      ),

    /** Permanent delete — usage history is kept. */
    remove: (keyId: string) => request<{ ok: boolean }>('DELETE', `${path(keyId)}?action=delete`)
  }
}
