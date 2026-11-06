import type { ListResponse, Team, TeamBody } from './types'
import { useApi } from '@/composables/useApi'

export function useTeamsApi() {
  const { request } = useApi()
  const path = (id: string) => `/teams/${encodeURIComponent(id)}`
  return {
    list: () => request<ListResponse<Team>>('GET', '/teams'),
    create: (body: TeamBody & { name: string }) => request<Team>('POST', '/teams', body),
    update: (id: string, body: TeamBody) => request<Team>('PUT', path(id), body),
    activate: (id: string) => request<Team>('POST', `${path(id)}/activate`),
    deactivate: (id: string) => request<Team>('POST', `${path(id)}/deactivate`),
    /** force=true removes members from the team first. */
    remove: (id: string, force = false) =>
      request<{ ok: boolean; removed_members: number }>('DELETE', `${path(id)}${force ? '?force=true' : ''}`)
  }
}
