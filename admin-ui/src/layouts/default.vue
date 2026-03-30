<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const router = useRouter()
const route = useRoute()

const navItems = [
  { path: '/dashboard', icon: 'i-carbon-dashboard', label: 'Dashboard' },
  { path: '/keys', icon: 'i-carbon-api', label: 'API Keys' },
  { path: '/backends', icon: 'i-carbon-server-dns', label: 'Backends' },
  { path: '/mappings', icon: 'i-carbon-arrows-horizontal', label: 'Model Maps' },
  { path: '/usage', icon: 'i-carbon-chart-bar', label: 'Usage' },
  { path: '/flags', icon: 'i-carbon-toggle', label: 'Flags' },
]

function logout() {
  auth.logout()
  router.push('/login')
}
</script>

<template>
  <div class="flex h-screen bg-[#0f172a] text-slate-200 overflow-hidden">
    <!-- Sidebar -->
    <aside class="w-52 flex flex-col bg-[#1e293b] border-r border-slate-700 shrink-0">
      <!-- Logo -->
      <div class="px-5 py-4 border-b border-slate-700">
        <span class="text-indigo-400 font-semibold text-base">one-router</span>
        <span class="ml-2 text-xs text-slate-500 bg-slate-700 px-1.5 py-0.5 rounded">admin</span>
      </div>

      <!-- Nav -->
      <nav class="flex-1 py-3 space-y-0.5 px-2">
        <RouterLink
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-slate-400 hover:text-slate-100 hover:bg-slate-700/60 transition-colors"
          :class="{ 'bg-indigo-600/20 text-indigo-300': route.path === item.path }"
        >
          <span :class="item.icon" class="text-base" />
          {{ item.label }}
        </RouterLink>
      </nav>

      <!-- Footer -->
      <div class="px-4 py-3 border-t border-slate-700 flex items-center justify-between">
        <span class="text-xs text-slate-500">v{{ auth.version || '—' }}</span>
        <NButton size="tiny" quaternary @click="logout">
          <template #icon><span class="i-carbon-logout" /></template>
          Sign out
        </NButton>
      </div>
    </aside>

    <!-- Main content -->
    <main class="flex-1 overflow-auto">
      <div class="p-6">
        <RouterView />
      </div>
    </main>
  </div>
</template>
