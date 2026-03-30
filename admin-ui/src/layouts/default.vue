<script setup lang="ts">
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
  { key: '/flags', label: 'Flags', icon: () => h('span', { class: 'i-carbon-toggle text-base' }) },
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
  <div style="display:flex; height:100vh; background:#0f172a; color:#e2e8f0; overflow:hidden">
    <!-- Sidebar -->
    <aside style="width:208px; display:flex; flex-direction:column; background:#1e293b; border-right:1px solid #334155; flex-shrink:0">
      <!-- Logo -->
      <div style="padding:16px 20px; border-bottom:1px solid #334155">
        <span style="color:#818cf8; font-weight:600; font-size:15px">one-router</span>
        <span style="margin-left:8px; font-size:11px; color:#94a3b8; background:#334155; padding:1px 6px; border-radius:4px">admin</span>
      </div>

      <!-- Nav -->
      <NMenu
        :options="menuOptions"
        :value="activeKey"
        :indent="16"
        style="flex:1; padding-top:8px"
        @update:value="onMenuSelect"
      />

      <!-- Footer -->
      <div style="padding:12px 16px; border-top:1px solid #334155; display:flex; align-items:center; justify-content:space-between">
        <span style="font-size:12px; color:#94a3b8">v{{ auth.version || '—' }}</span>
        <NButton size="tiny" quaternary @click="logout">
          <template #icon><span class="i-carbon-logout" /></template>
          Sign out
        </NButton>
      </div>
    </aside>

    <!-- Main content -->
    <main style="flex:1; overflow:auto">
      <div style="padding:24px">
        <RouterView />
      </div>
    </main>
  </div>
</template>
