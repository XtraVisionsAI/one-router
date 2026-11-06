import type { ListResponse, User, UserBody, UserDetail } from './types'
import { useApi } from '@/composables/useApi'

export function useUsersApi() {
  const { request } = useApi()
  const path = (id: string) => `/users/${encodeURIComponent(id)}`

  return {
    list: () => request<ListResponse<User>>('GET', '/users'),
    get: (id: string) => request<UserDetail>('GET', path(id)),
    create: (body: UserBody & { name: string }) => request<User>('POST', '/users', body),
    update: (id: string, body: UserBody) => request<User>('PUT', path(id), body),
    activate: (id: string) => request<User>('POST', `${path(id)}/activate`),
    deactivate: (id: string) => request<User>('POST', `${path(id)}/deactivate`),
    /** cascade=true also deletes the user's keys (usage history is kept). */
    remove: (id: string, cascade = false) =>
      request<{ ok: boolean; deleted_keys: number }>('DELETE', `${path(id)}${cascade ? '?cascade=true' : ''}`)
  }
}
