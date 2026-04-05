<script setup lang="ts">
  import type { ApiKey, BackendSummary, StatusResponse } from '@/api/types'
  import { NCard, NDataTable, NSpin, NStatistic, NTag, useMessage } from 'naive-ui'
  import { h } from 'vue'
  import { useBackendsApi } from '@/api/backends'
  import { useKeysApi } from '@/api/keys'
  import { useApi } from '@/composables/useApi'
  import { fmtUptime } from '@/utils/format'

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
        request<StatusResponse>('GET', '/status')
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
      title: 'Enabled',
      key: 'enabled',
      render: (row: BackendSummary) =>
        h(
          NTag,
          { type: row.enabled ? 'success' : 'default', size: 'small' },
          { default: () => (row.enabled ? 'enabled' : 'disabled') }
        )
    }
  ]

  const keyColumns = [
    { title: 'Name', key: 'name' },
    {
      title: 'Key',
      key: 'api_key',
      ellipsis: { tooltip: true },
      render: (row: ApiKey) => h('span', { class: 'font-mono text-xs text-slate-400' }, row.api_key)
    },
    {
      title: 'Rate Limit',
      key: 'rate_limit',
      render: (row: ApiKey) => (row.rate_limit > 0 ? `${row.rate_limit} rpm` : '—')
    },
    {
      title: 'Status',
      key: 'is_active',
      render: (row: ApiKey) =>
        h(
          NTag,
          { type: row.is_active ? 'success' : 'error', size: 'small' },
          { default: () => (row.is_active ? 'active' : 'inactive') }
        )
    }
  ]
</script>

<template>
  <div>
    <h1 class="text-xl font-semibold text-slate-100 mb-6">Dashboard</h1>

    <n-spin :show="loading">
      <div class="grid grid-cols-4 gap-4 mb-8">
        <n-card size="small" style="position: relative; overflow: hidden">
          <span class="i-carbon-api absolute top-3 right-3 text-[32px] text-indigo-400 opacity-80" />
          <n-statistic label="API Keys" :value="keys.length" />
        </n-card>
        <n-card size="small" style="position: relative; overflow: hidden">
          <span class="i-carbon-server-dns absolute top-3 right-3 text-[32px] text-emerald-400 opacity-80" />
          <n-statistic label="Backends" :value="backends.length" />
        </n-card>
        <n-card size="small" style="position: relative; overflow: hidden">
          <span class="i-carbon-checkmark-outline absolute top-3 right-3 text-[32px] text-blue-400 opacity-80" />
          <n-statistic label="Active Keys" :value="keys.filter((k) => k.is_active).length" />
        </n-card>
        <n-card size="small" style="position: relative; overflow: hidden">
          <span class="i-carbon-time absolute top-3 right-3 text-[32px] text-amber-400 opacity-80" />
          <n-statistic label="Uptime" :value="uptime" />
        </n-card>
      </div>

      <div class="mb-8">
        <h2 class="text-xs font-medium text-slate-400 uppercase tracking-wider mb-3">Backend Status</h2>
        <n-data-table :columns="backendColumns" :data="backends" :pagination="false" size="small" />
      </div>

      <div>
        <h2 class="text-xs font-medium text-slate-400 uppercase tracking-wider mb-3">Recent API Keys</h2>
        <n-data-table :columns="keyColumns" :data="keys.slice(0, 5)" :pagination="false" size="small" />
      </div>
    </n-spin>
  </div>
</template>
