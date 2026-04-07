import { useApi } from '@/composables/useApi'

export interface UpdateInfo {
  current_version: string
  latest_version: string | null
  download_url: string | null
  checksum_url: string | null
  release_notes: string | null
  published_at: string | null
  update_available: boolean
  last_check: string | null
  status: string
  error: string | null
}

export function useUpdateApi() {
  const { request } = useApi()

  return {
    /** Get cached update status */
    status: () => request<UpdateInfo>('GET', '/update'),

    /** Trigger immediate check against GitHub Releases */
    check: () => request<UpdateInfo>('POST', '/update/check'),

    /** Download, verify, and apply the latest update */
    apply: () => request<{ message: string; previous_version: string; new_version: string }>('POST', '/update'),
  }
}
