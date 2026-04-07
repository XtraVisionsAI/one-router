<script setup lang="ts">
  import type { UpdateInfo } from '@/api/update'
  import { useMessage } from 'naive-ui'
  import { useUpdateApi } from '@/api/update'

  const message = useMessage()
  const api = useUpdateApi()

  const info = ref<UpdateInfo | null>(null)
  const loading = ref(true)
  const checking = ref(false)
  const applying = ref(false)

  async function load() {
    loading.value = true
    try {
      info.value = await api.status()
    } catch (e: any) {
      message.error(`Failed to load update status: ${e.message}`)
    } finally {
      loading.value = false
    }
  }

  async function checkForUpdate() {
    checking.value = true
    try {
      info.value = await api.check()
      if (info.value?.update_available) {
        message.success(`New version available: v${info.value.latest_version}`)
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
      const result = await api.apply()
      message.success(result.message || 'Update applied. Restart to activate.')
      await load()
    } catch (e: any) {
      message.error(`Update failed: ${e.message}`)
      await load()
    } finally {
      applying.value = false
    }
  }

  function formatTime(iso: string | null) {
    if (!iso) return '—'
    return new Date(iso).toLocaleString()
  }

  const statusColor = computed(() => {
    if (!info.value) return 'default'
    switch (info.value.status) {
      case 'update_available': return 'warning'
      case 'complete': return 'success'
      case 'failed': return 'error'
      case 'downloading':
      case 'verifying':
      case 'applying':
      case 'checking': return 'info'
      default: return 'default'
    }
  })

  const statusLabel = computed(() => {
    if (!info.value) return ''
    return info.value.status.replace(/_/g, ' ')
  })

  onMounted(load)
</script>

<template>
  <div>
    <h1 class="text-xl font-semibold text-slate-100 mb-6">Update</h1>

    <NSpin :show="loading">
      <div v-if="info" class="space-y-4 max-w-2xl">
        <!-- Version info -->
        <NCard size="small">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <div class="text-xs text-slate-500">Current Version</div>
              <div class="text-lg font-mono text-slate-200">v{{ info.current_version }}</div>
            </div>
            <div>
              <div class="text-xs text-slate-500">Latest Version</div>
              <div class="text-lg font-mono" :class="info.update_available ? 'text-amber-400' : 'text-slate-200'">
                {{ info.latest_version ? `v${info.latest_version}` : '—' }}
              </div>
            </div>
          </div>

          <div class="flex items-center gap-3 mt-4">
            <NTag :type="statusColor" size="small">{{ statusLabel }}</NTag>
            <span v-if="info.last_check" class="text-xs text-slate-500">
              Last checked: {{ formatTime(info.last_check) }}
            </span>
          </div>

          <div v-if="info.error" class="mt-3 text-sm text-red-400 bg-red-900/20 px-3 py-2 rounded">
            {{ info.error }}
          </div>
        </NCard>

        <!-- Actions -->
        <div class="flex gap-3">
          <NButton :loading="checking" @click="checkForUpdate">
            <template #icon><span class="i-carbon-renew" /></template>
            Check for Updates
          </NButton>
          <NButton
            v-if="info.update_available"
            type="primary"
            :loading="applying"
            :disabled="info.status === 'complete'"
            @click="applyUpdate"
          >
            <template #icon><span class="i-carbon-download" /></template>
            Apply Update
          </NButton>
        </div>

        <!-- Release notes -->
        <NCard v-if="info.release_notes && info.update_available" size="small" title="Release Notes">
          <div class="text-sm text-slate-300 whitespace-pre-wrap max-h-64 overflow-auto font-mono">{{ info.release_notes }}</div>
          <div v-if="info.published_at" class="text-xs text-slate-500 mt-2">
            Published: {{ formatTime(info.published_at) }}
          </div>
        </NCard>

        <!-- Complete banner -->
        <NAlert v-if="info.status === 'complete'" type="success" title="Update Applied">
          The new binary has been installed. Restart one-router to activate the new version.
        </NAlert>
      </div>
    </NSpin>
  </div>
</template>
