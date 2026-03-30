import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHashHistory } from 'vue-router/auto'
import { routes } from 'vue-router/auto-routes'
import { useAuthStore } from './stores/auth'
import App from './App.vue'
import 'virtual:uno.css'

const app = createApp(App)
const pinia = createPinia()

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

// Route guard: redirect to /login when not authenticated, redirect to /dashboard when already authenticated
router.beforeEach((to) => {
  const auth = useAuthStore()
  if (!auth.isAuthenticated && to.path !== '/login') {
    return { path: '/login', query: { redirect: to.fullPath } }
  }
  if (auth.isAuthenticated && to.path === '/login') {
    return { path: '/dashboard' }
  }
})

app.use(pinia)
app.use(router)
app.mount('#app')
