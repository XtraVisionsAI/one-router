import { useAuthStore } from '@/stores/auth'

export function useApi() {
  const auth = useAuthStore()

  async function request<T>(method: string, path: string, body?: unknown): Promise<T> {
    const res = await fetch('/admin/api' + path, {
      method,
      headers: {
        'x-api-key': auth.apiKey,
        'Content-Type': 'application/json',
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    })

    if (res.status === 401 || res.status === 403) {
      auth.logout()
      window.location.hash = '/login'
      throw new Error('Unauthorized')
    }

    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: { message: res.statusText } }))
      throw new Error(err.error?.message ?? res.statusText)
    }

    return res.json() as Promise<T>
  }

  return { request }
}
