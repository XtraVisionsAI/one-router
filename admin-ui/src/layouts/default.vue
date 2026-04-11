<script setup lang="ts">
  import type { MenuOption } from 'naive-ui'
  import type { UpdateInfo } from '@/api/update'
  import { h } from 'vue'
  import { useAuthStore } from '@/stores/auth'
  import { useUpdateApi } from '@/api/update'
  import { useMessage } from 'naive-ui'

  const auth = useAuthStore()
  const router = useRouter()
  const route = useRoute()
  const message = useMessage()
  const updateApi = useUpdateApi()

  const menuOptions: MenuOption[] = [
    { key: '/dashboard', label: 'Dashboard', icon: () => h('span', { class: 'i-carbon-dashboard text-base' }) },
    { key: '/keys', label: 'API Keys', icon: () => h('span', { class: 'i-carbon-api text-base' }) },
    { key: '/backends', label: 'Backends', icon: () => h('span', { class: 'i-carbon-server-dns text-base' }) },
    { key: '/mappings', label: 'Model Maps', icon: () => h('span', { class: 'i-carbon-arrows-horizontal text-base' }) },
    { key: '/usage', label: 'Usage', icon: () => h('span', { class: 'i-carbon-chart-bar text-base' }) },
    { key: '/settings', label: 'Settings', icon: () => h('span', { class: 'i-carbon-settings text-base' }) }
  ]

  const activeKey = computed(() => route.path)

  function onMenuSelect(key: string) {
    router.push(key)
  }

  function logout() {
    auth.logout()
    router.push('/login')
  }

  // --- Update state ---
  const updateInfo = ref<UpdateInfo | null>(null)
  const checking = ref(false)
  const applying = ref(false)

  const hasUpdate = computed(() => updateInfo.value?.update_available === true)
  const isComplete = computed(() => updateInfo.value?.status === 'complete')

  async function fetchUpdateStatus() {
    try {
      updateInfo.value = await updateApi.status()
    } catch {
      // silently ignore — non-critical
    }
  }

  async function checkForUpdate() {
    checking.value = true
    try {
      updateInfo.value = await updateApi.check()
      if (updateInfo.value?.update_available) {
        message.success(`New version available: v${updateInfo.value.latest_version}`)
      } else {
        message.info('Already up to date')
      }
    } catch (e: any) {
      message.error(`Check failed: ${e.message}`)
    } finally {
      checking.value = false
    }
  }

  async function applyUpdate() {
    applying.value = true
    try {
      const result = await updateApi.apply()
      message.success(result.message || 'Update applied')
      await fetchUpdateStatus()
    } catch (e: any) {
      message.error(`Update failed: ${e.message}`)
      await fetchUpdateStatus()
    } finally {
      applying.value = false
    }
  }

  // Poll every 5 minutes
  onMounted(() => {
    fetchUpdateStatus()
    setInterval(fetchUpdateStatus, 5 * 60 * 1000)
  })
</script>

<template>
  <div class="flex h-screen bg-slate-900 text-slate-200 overflow-hidden">
    <!-- Sidebar -->
    <aside class="w-52 flex flex-col bg-slate-800 border-r border-slate-700/60 shrink-0">
      <!-- Logo -->
      <div class="px-4 py-3.5 border-b border-slate-700/60 flex items-center gap-2.5">
        <img src="/logo.png" alt="one-router" class="w-9 h-9 rounded-lg shrink-0">
        <div class="flex flex-col">
          <span class="text-indigo-400 font-semibold text-sm leading-tight tracking-wide">one-router</span>
          <span class="text-[10px] text-slate-500 mt-0.5">admin console</span>
        </div>
      </div>

      <!-- Nav -->
      <NMenu :options="menuOptions" :value="activeKey" :indent="16" class="flex-1 pt-2" @update:value="onMenuSelect" />

      <!-- Footer -->
      <div class="px-4 py-3 border-t border-slate-700/60 flex items-center justify-between">
        <NPopover trigger="click" placement="top-start" :width="240" content-class="!p-3.5">
          <template #trigger>
            <button class="relative text-xs text-slate-500 hover:text-slate-300 transition-colors cursor-pointer bg-transparent border-0 p-0">
              v{{ auth.version || '—' }}
              <span
                v-if="hasUpdate"
                class="absolute -top-1 -right-2 w-2 h-2 bg-amber-400 rounded-full"
              />
            </button>
          </template>

          <div class="space-y-3 text-[13px]">
            <!-- Version row -->
            <div class="flex items-center justify-between">
              <span class="font-mono text-slate-200">v{{ updateInfo?.current_version || auth.version || '—' }}</span>
              <template v-if="updateInfo?.latest_version && hasUpdate">
                <span class="text-slate-600 mx-1">→</span>
                <span class="font-mono text-amber-400">v{{ updateInfo.latest_version }}</span>
              </template>
              <span v-else-if="updateInfo?.latest_version" class="text-slate-500">up to date</span>
            </div>

            <!-- Status messages -->
            <div v-if="updateInfo?.error" class="text-red-400/90 bg-red-950/40 px-2.5 py-2 rounded text-xs leading-relaxed">
              {{ updateInfo.error }}
            </div>
            <div v-if="isComplete" class="text-emerald-400/90 bg-emerald-950/40 px-2.5 py-2 rounded text-xs leading-relaxed">
              Restart to activate new version.
            </div>

            <!-- Divider -->
            <div class="border-t border-slate-700/40 my-1" />

            <!-- Actions — text buttons, low profile -->
            <div class="flex items-center justify-between pt-0.5">
              <div class="flex items-center gap-4">
                <button
                  class="text-slate-400 hover:text-slate-200 transition-colors bg-transparent border-0 p-0 cursor-pointer flex items-center gap-1.5"
                  :disabled="checking"
                  @click="checkForUpdate"
                >
                  <span class="i-carbon-renew text-xs" :class="{ 'animate-spin': checking }" />
                  Check
                </button>
                <button
                  v-if="hasUpdate && !isComplete"
                  class="text-indigo-400 hover:text-indigo-300 transition-colors bg-transparent border-0 p-0 cursor-pointer flex items-center gap-1.5 font-medium"
                  :disabled="applying"
                  @click="applyUpdate"
                >
                  <span class="i-carbon-download text-xs" :class="{ 'animate-pulse': applying }" />
                  Update
                </button>
              </div>
              <a
                href="https://github.com/XtraVisionsAI/one-router/releases"
                target="_blank"
                class="text-slate-500 hover:text-slate-300 transition-colors flex items-center gap-1.5"
              >
                Releases
                <span class="i-carbon-launch text-[10px]" />
              </a>
            </div>
          </div>
        </NPopover>

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
