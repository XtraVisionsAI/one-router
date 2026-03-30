import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHashHistory } from 'vue-router/auto'
import { routes } from 'vue-router/auto-routes'
import App from './App.vue'
import 'virtual:uno.css'

const app = createApp(App)
const pinia = createPinia()

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

app.use(pinia)
app.use(router)
app.mount('#app')
