import { createPinia } from 'pinia'
import { setupLayouts } from 'virtual:meta-layouts'
import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'
import App from './App.vue'
import { useAuthStore } from './stores/auth'
import 'virtual:uno.css'

const app = createApp(App)
const pinia = createPinia()

const router = createRouter({
  history: createWebHashHistory(),
  routes: setupLayouts(routes)
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
