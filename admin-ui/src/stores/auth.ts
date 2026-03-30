export const useAuthStore = defineStore('auth', () => {
  const apiKey = ref(sessionStorage.getItem('admin_api_key') ?? '')
  const version = ref('')

  const isAuthenticated = computed(() => !!apiKey.value)

  function login(key: string, ver: string) {
    apiKey.value = key
    version.value = ver
    sessionStorage.setItem('admin_api_key', key)
  }

  function logout() {
    apiKey.value = ''
    version.value = ''
    sessionStorage.removeItem('admin_api_key')
  }

  return { apiKey, version, isAuthenticated, login, logout }
})
