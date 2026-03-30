export const useAuthStore = defineStore('auth', () => {
  const apiKey = ref(sessionStorage.getItem('admin_api_key') ?? '')
  const version = ref(sessionStorage.getItem('admin_version') ?? '')

  const isAuthenticated = computed(() => !!apiKey.value)

  function login(key: string, ver: string) {
    apiKey.value = key
    version.value = ver
    sessionStorage.setItem('admin_api_key', key)
    sessionStorage.setItem('admin_version', ver)
  }

  function logout() {
    apiKey.value = ''
    version.value = ''
    sessionStorage.removeItem('admin_api_key')
    sessionStorage.removeItem('admin_version')
  }

  return { apiKey, version, isAuthenticated, login, logout }
})
