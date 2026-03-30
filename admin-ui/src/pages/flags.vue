<script setup lang="ts">
import { useMessage } from 'naive-ui'
import { useFlagsApi } from '@/api/flags'
import type { FeatureFlag } from '@/api/types'

const message = useMessage()
const api = useFlagsApi()

const flags = ref<FeatureFlag[]>([])
const loading = ref(true)

async function load() {
  loading.value = true
  try {
    const res = await api.list()
    flags.value = res.data
  } catch (e: any) {
    message.error(e.message)
  } finally {
    loading.value = false
  }
}

async function toggle(flag: FeatureFlag) {
  const next = !flag.enabled
  flag.enabled = next
  try {
    await api.update(flag.name, next)
    message.success(`${flag.name} ${next ? 'enabled' : 'disabled'}`)
  } catch (e: any) {
    flag.enabled = !next
    message.error(e.message)
  }
}

onMounted(load)
</script>

<template>
  <div>
    <h1 class="text-xl font-semibold text-slate-100 mb-6">Feature Flags</h1>

    <NSpin :show="loading">
      <div v-if="flags.length === 0 && !loading" class="text-slate-500 text-sm">
        No feature flags configured.
      </div>

      <div class="space-y-2">
        <NCard
          v-for="flag in flags"
          :key="flag.name"
          size="small"
        >
          <div class="flex items-center justify-between">
            <div>
              <div class="text-sm font-medium text-slate-200">{{ flag.name }}</div>
              <div v-if="flag.description" class="text-xs text-slate-500 mt-0.5">{{ flag.description }}</div>
            </div>
            <NSwitch :value="flag.enabled" @update:value="toggle(flag)" />
          </div>
        </NCard>
      </div>
    </NSpin>
  </div>
</template>
