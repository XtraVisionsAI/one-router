export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false)
  const version = ref('')

  async function login(key: string) {
    const res = await fetch('/admin/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
      body: JSON.stringify({ key: key.trim() }),
    })
    if (!res.ok) throw new Error('Invalid API key')
    const data = await res.json()
    version.value = data.version ?? ''
    isAuthenticated.value = true
  }

  async function logout() {
    await fetch('/admin/api/logout', { method: 'POST', credentials: 'same-origin' })
    isAuthenticated.value = false
    version.value = ''
  }

  async function check() {
    try {
      const res = await fetch('/admin/api/status', { credentials: 'same-origin' })
      if (res.ok) {
        const data = await res.json()
        version.value = data.version ?? ''
        isAuthenticated.value = true
      } else {
        isAuthenticated.value = false
      }
    } catch {
      isAuthenticated.value = false
    }
  }

  return { isAuthenticated, version, login, logout, check }
})
