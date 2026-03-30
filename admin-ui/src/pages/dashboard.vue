<script setup lang="ts">
import { h } from 'vue'
import { useMessage, NTag, NCard, NStatistic, NDataTable, NSpin } from 'naive-ui'
import { useBackendsApi } from '@/api/backends'
import { useKeysApi } from '@/api/keys'
import { useApi } from '@/composables/useApi'
import type { BackendSummary, ApiKey, StatusResponse } from '@/api/types'
import { fmtUptime, healthType } from '@/utils/format'

const message = useMessage()
const backendsApi = useBackendsApi()
const keysApi = useKeysApi()
const { request } = useApi()

const backends = ref<BackendSummary[]>([])
const keys = ref<ApiKey[]>([])
const uptime = ref('')
const loading = ref(true)

onMounted(async () => {
  try {
    const [backendsRes, keysRes, statusRes] = await Promise.all([
      backendsApi.list(),
      keysApi.list(),
      request<StatusResponse>('GET', '/status'),
    ])
    backends.value = backendsRes.data
    keys.value = keysRes.data
    uptime.value = fmtUptime(statusRes.uptime_seconds)
  } catch (e: any) {
    message.error(e.message)
  } finally {
    loading.value = false
  }
})

const backendColumns = [
  { title: 'Name', key: 'name' },
  { title: 'Type', key: 'backend_type' },
  { title: 'Priority', key: 'priority' },
  {
    title: 'Health',
    key: 'health_status',
    render: (row: BackendSummary) =>
      h(NTag, { type: healthType(row.health_status), size: 'small' }, { default: () => row.health_status }),
  },
  {
    title: 'Enabled',
    key: 'enabled',
    render: (row: BackendSummary) =>
      h(NTag, { type: row.enabled ? 'success' : 'default', size: 'small' }, { default: () => row.enabled ? 'enabled' : 'disabled' }),
  },
]

const keyColumns = [
  { title: 'Name', key: 'name' },
  {
    title: 'Key',
    key: 'api_key',
    ellipsis: { tooltip: true },
    render: (row: ApiKey) => h('span', { class: 'font-mono text-xs text-slate-400' }, row.api_key),
  },
  {
    title: 'Rate Limit',
    key: 'rate_limit',
    render: (row: ApiKey) => row.rate_limit > 0 ? `${row.rate_limit} rpm` : '—',
  },
  {
    title: 'Status',
    key: 'is_active',
    render: (row: ApiKey) =>
      h(NTag, { type: row.is_active ? 'success' : 'error', size: 'small' }, { default: () => row.is_active ? 'active' : 'inactive' }),
  },
]
</script>

<template>
  <div>
    <h1 class="text-xl font-semibold text-slate-100 mb-6">Dashboard</h1>

    <NSpin :show="loading">
      <div class="grid grid-cols-4 gap-4 mb-8">
        <NCard size="small" style="position:relative; overflow:hidden">
          <span class="i-carbon-api absolute top-3 right-3 text-[32px] text-indigo-400 opacity-80" />
          <NStatistic label="API Keys" :value="keys.length" />
        </NCard>
        <NCard size="small" style="position:relative; overflow:hidden">
          <span class="i-carbon-server-dns absolute top-3 right-3 text-[32px] text-emerald-400 opacity-80" />
          <NStatistic label="Backends" :value="backends.length" />
        </NCard>
        <NCard size="small" style="position:relative; overflow:hidden">
          <span class="i-carbon-checkmark-outline absolute top-3 right-3 text-[32px] text-blue-400 opacity-80" />
          <NStatistic label="Active Keys" :value="keys.filter(k => k.is_active).length" />
        </NCard>
        <NCard size="small" style="position:relative; overflow:hidden">
          <span class="i-carbon-time absolute top-3 right-3 text-[32px] text-amber-400 opacity-80" />
          <NStatistic label="Uptime" :value="uptime" />
        </NCard>
      </div>

      <div class="mb-8">
        <h2 class="text-xs font-medium text-slate-400 uppercase tracking-wider mb-3">Backend Status</h2>
        <NDataTable :columns="backendColumns" :data="backends" :pagination="false" size="small" />
      </div>

      <div>
        <h2 class="text-xs font-medium text-slate-400 uppercase tracking-wider mb-3">Recent API Keys</h2>
        <NDataTable :columns="keyColumns" :data="keys.slice(0, 5)" :pagination="false" size="small" />
      </div>
    </NSpin>
  </div>
</template>
