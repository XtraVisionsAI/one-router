<script setup lang="ts">
import { h } from 'vue'
import { useMessage } from 'naive-ui'
import { useUsageApi } from '@/api/usage'
import type { UsageSummaryParams } from '@/api/usage'
import type { UsageSummaryRow, UsageSummaryResponse } from '@/api/types'

const message = useMessage()
const api = useUsageApi()

const keyFilter = ref('')
const groupBy = ref<'hour' | 'model'>('hour')
const dateRange = ref<[number, number] | null>(null)
const result = ref<UsageSummaryResponse | null>(null)
const loading = ref(false)

function fmtTokens(n: number): string {
  if (n >= 1e6) return (n / 1e6).toFixed(1) + 'M'
  if (n >= 1e3) return (n / 1e3).toFixed(1) + 'K'
  return String(n)
}

function fmtMoney(n: number): string {
  return '$' + n.toFixed(2)
}

async function query() {
  loading.value = true
  try {
    const params: UsageSummaryParams = { group_by: groupBy.value }
    if (keyFilter.value.trim()) params.api_key = keyFilter.value.trim()
    if (dateRange.value) {
      params.start_time = new Date(dateRange.value[0]).toISOString()
      params.end_time = new Date(dateRange.value[1] + 86400000 - 1).toISOString()
    }
    result.value = await api.summary(params)
  } catch (e: any) {
    message.error(e.message)
  } finally {
    loading.value = false
  }
}

const columns = computed(() => [
  {
    title: groupBy.value === 'model' ? 'Model' : 'Hour',
    key: 'group_key',
    render: (row: UsageSummaryRow) => h('span', { class: 'font-mono text-xs' }, row.group_key),
  },
  {
    title: 'Requests',
    key: 'total_requests',
    render: (row: UsageSummaryRow) => row.total_requests.toLocaleString(),
  },
  {
    title: 'Errors',
    key: 'error_requests',
    render: (row: UsageSummaryRow) =>
      h('span', { class: row.error_requests > 0 ? 'text-red-400' : '' }, String(row.error_requests)),
  },
  {
    title: 'Input',
    key: 'input_tokens',
    render: (row: UsageSummaryRow) => fmtTokens(row.input_tokens),
  },
  {
    title: 'Output',
    key: 'output_tokens',
    render: (row: UsageSummaryRow) => fmtTokens(row.output_tokens),
  },
  {
    title: 'Cost',
    key: 'total_cost',
    render: (row: UsageSummaryRow) => fmtMoney(row.total_cost),
  },
])
</script>

<template>
  <div>
    <h1 class="text-xl font-semibold text-slate-100 mb-6">Usage</h1>

    <div style="display:flex; gap:12px; margin-bottom:24px; align-items:flex-end; flex-wrap:wrap">
      <div>
        <div style="font-size:12px; color:#94a3b8; margin-bottom:4px">API Key</div>
        <NInput
          v-model:value="keyFilter"
          placeholder="Optional — leave empty for all"
          style="width:240px"
          clearable
        />
      </div>
      <div>
        <div style="font-size:12px; color:#94a3b8; margin-bottom:4px">Date Range</div>
        <NDatePicker
          v-model:value="dateRange"
          type="daterange"
          clearable
          style="width:260px"
        />
      </div>
      <div>
        <div style="font-size:12px; color:#94a3b8; margin-bottom:4px">Group By</div>
        <NSelect
          v-model:value="groupBy"
          :options="[{ label: 'By Hour', value: 'hour' }, { label: 'By Model', value: 'model' }]"
          style="width:130px"
        />
      </div>
      <NButton type="primary" :loading="loading" @click="query">
        <template #icon><span class="i-carbon-search" /></template>
        Query
      </NButton>
    </div>

    <p v-if="!result && !loading" class="text-slate-500 text-sm">
      Select filters and click Query. Leave API key empty to aggregate all keys.
    </p>

    <template v-if="result">
      <div class="grid grid-cols-4 gap-4 mb-6">
        <NCard size="small" style="position:relative; overflow:hidden">
          <span class="i-carbon-send" style="position:absolute; top:12px; right:12px; font-size:32px; color:#818cf8; opacity:0.85" />
          <NStatistic label="Requests" :value="result.summary.total_requests.toLocaleString()" />
        </NCard>
        <NCard size="small" style="position:relative; overflow:hidden">
          <span class="i-carbon-arrow-down" style="position:absolute; top:12px; right:12px; font-size:32px; color:#60a5fa; opacity:0.85" />
          <NStatistic label="Input Tokens" :value="fmtTokens(result.summary.total_input_tokens)" />
        </NCard>
        <NCard size="small" style="position:relative; overflow:hidden">
          <span class="i-carbon-arrow-up" style="position:absolute; top:12px; right:12px; font-size:32px; color:#34d399; opacity:0.85" />
          <NStatistic label="Output Tokens" :value="fmtTokens(result.summary.total_output_tokens)" />
        </NCard>
        <NCard size="small" style="position:relative; overflow:hidden">
          <span class="i-carbon-currency-dollar" style="position:absolute; top:12px; right:12px; font-size:32px; color:#fbbf24; opacity:0.85" />
          <NStatistic label="Total Cost" :value="fmtMoney(result.summary.total_cost)" />
        </NCard>
      </div>

      <NDataTable
        :columns="columns"
        :data="result.data"
        :pagination="{ pageSize: 50 }"
        size="small"
      />
    </template>
  </div>
</template>
