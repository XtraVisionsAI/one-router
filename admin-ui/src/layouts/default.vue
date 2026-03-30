<script setup lang="ts">
import { h } from 'vue'
import type { MenuOption } from 'naive-ui'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const router = useRouter()
const route = useRoute()

const menuOptions: MenuOption[] = [
  { key: '/dashboard', label: 'Dashboard', icon: () => h('span', { class: 'i-carbon-dashboard text-base' }) },
  { key: '/keys', label: 'API Keys', icon: () => h('span', { class: 'i-carbon-api text-base' }) },
  { key: '/backends', label: 'Backends', icon: () => h('span', { class: 'i-carbon-server-dns text-base' }) },
  { key: '/mappings', label: 'Model Maps', icon: () => h('span', { class: 'i-carbon-arrows-horizontal text-base' }) },
  { key: '/usage', label: 'Usage', icon: () => h('span', { class: 'i-carbon-chart-bar text-base' }) },
  { key: '/flags', label: 'Flags', icon: () => h('span', { class: 'i-carbon-toggle-on text-base' }) },
]

const activeKey = computed(() => route.path)

function onMenuSelect(key: string) {
  router.push(key)
}

function logout() {
  auth.logout()
  router.push('/login')
}
</script>

<template>
  <div class="flex h-screen bg-slate-900 text-slate-200 overflow-hidden">
    <!-- Sidebar -->
    <aside class="w-52 flex flex-col bg-slate-800 border-r border-slate-700/60 shrink-0">
      <!-- Logo -->
      <div class="px-5 py-4 border-b border-slate-700/60">
        <span class="text-indigo-400 font-semibold text-[15px]">one-router</span>
        <span class="ml-2 text-[11px] text-slate-400 bg-slate-700 px-1.5 py-0.5 rounded">admin</span>
      </div>

      <!-- Nav -->
      <NMenu
        :options="menuOptions"
        :value="activeKey"
        :indent="16"
        class="flex-1 pt-2"
        @update:value="onMenuSelect"
      />

      <!-- Footer -->
      <div class="px-4 py-3 border-t border-slate-700/60 flex items-center justify-between">
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
