import type { ListResponse, SystemSetting, UpsertSettingBody } from './types'
import { useApi } from '@/composables/useApi'

export function useSettingsApi() {
  const { request } = useApi()

  return {
    list: () => request<ListResponse<SystemSetting>>('GET', '/settings'),

    upsert: (key: string, body: UpsertSettingBody) =>
      request<SystemSetting>('PUT', `/settings/${encodeURIComponent(key)}`, body)
  }
}
