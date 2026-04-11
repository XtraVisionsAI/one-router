<script setup lang="ts">
  import type { ApiKey, UsageSummaryResponse, UsageSummaryRow } from '@/api/types'
  import type { GroupByDimension, UsageSummaryParams } from '@/api/usage'
  import { NButton, NCard, NDataTable, NDatePicker, NSelect, NStatistic, useMessage } from 'naive-ui'
  import { h } from 'vue'
  import VChart from 'vue-echarts'
  import { use } from 'echarts/core'
  import { BarChart, LineChart } from 'echarts/charts'
  import { GridComponent, LegendComponent, TooltipComponent } from 'echarts/components'
  import { CanvasRenderer } from 'echarts/renderers'
  import { useKeysApi } from '@/api/keys'
  import { useUsageApi } from '@/api/usage'
  import { useChartTheme } from '@/composables/useChartTheme'
  import { fmtMoney, fmtTokens, fmtPercent } from '@/utils/format'

  use([BarChart, LineChart, GridComponent, LegendComponent, TooltipComponent, CanvasRenderer])

  const message = useMessage()
  const api = useUsageApi()
  const keysApi = useKeysApi()
  const { baseOption, axisCommon, COLORS } = useChartTheme()

  const keys = ref<ApiKey[]>([])
  const selectedKey = ref<string | null>(null)
  const groupBy = ref<GroupByDimension>('hour')
  const splitBy = ref<GroupByDimension | null>(null)
  const dateRange = ref<[number, number] | null>(null)
  const result = ref<UsageSummaryResponse | null>(null)
  const loading = ref(false)

  const keyOptions = computed(() => [
    { label: 'All keys', value: null },
    ...keys.value.map((k) => ({ label: k.name, value: k.name }))
  ])

  const groupByOptions = [
    { label: 'By Hour', value: 'hour' },
    { label: 'By Day', value: 'day' },
    { label: 'By Month', value: 'month' },
    { label: 'By Model', value: 'model' },
    { label: 'By Provider', value: 'provider' },
    { label: 'By API Key', value: 'api_key' }
  ]

  const splitByOptions = computed(() => [
    { label: 'None', value: null },
    ...groupByOptions.filter(o => o.value !== groupBy.value)
  ])

  const groupByLabel: Record<string, string> = {
    hour: 'Hour', day: 'Day', month: 'Month',
    model: 'Model', provider: 'Provider', api_key: 'API Key',
  }

  const isTimeDimension = computed(() => ['hour', 'day', 'month'].includes(groupBy.value))

  // Derived metrics
  const totalErrors = computed(() => result.value?.data.reduce((s, r) => s + r.error_requests, 0) ?? 0)
  const errorRate = computed(() => {
    const total = result.value?.summary.total_requests ?? 0
    return total > 0 ? totalErrors.value / total : 0
  })
  const cacheHitRate = computed(() => {
    const cached = result.value?.data.reduce((s, r) => s + r.cached_tokens, 0) ?? 0
    const input = result.value?.summary.total_input_tokens ?? 0
    const denom = input + cached
    return denom > 0 ? cached / denom : 0
  })

  onMounted(async () => {
    try { keys.value = (await keysApi.list()).data }
    catch (e: any) { message.error(`Failed to load keys: ${e.message}`) }
  })

  function applyPreset(hours: number) {
    const now = Date.now()
    dateRange.value = [now - hours * 3600000, now]
    if (hours <= 24) groupBy.value = 'hour'
    else if (hours <= 24 * 7) groupBy.value = 'day'
    else groupBy.value = 'day'
  }

  function applyMTD() {
    const now = new Date()
    const start = new Date(now.getFullYear(), now.getMonth(), 1)
    dateRange.value = [start.getTime(), now.getTime()]
    groupBy.value = 'day'
  }

  async function query() {
    loading.value = true
    try {
      const params: UsageSummaryParams = { group_by: groupBy.value }
      if (splitBy.value) params.split_by = splitBy.value
      if (selectedKey.value) params.api_key = selectedKey.value
      if (dateRange.value) {
        params.start_time = new Date(dateRange.value[0]).toISOString()
        params.end_time = new Date(dateRange.value[1] + 86400000 - 1).toISOString()
      }
      result.value = await api.summary(params)
    } catch (e: any) { message.error(e.message) }
    finally { loading.value = false }
  }

  // ── Chart ──────────────────────────────────────────────
  const chartOption = computed(() => {
    if (!result.value || !isTimeDimension.value) return null
    const data = result.value.data

    if (!splitBy.value) {
      // Single series
      const sorted = data.slice().sort((a, b) => a.group_key.localeCompare(b.group_key))
      return {
        ...baseOption,
        tooltip: { ...baseOption.tooltip, trigger: 'axis' },
        legend: { show: false },
        grid: { left: 55, right: 20, top: 20, bottom: 25 },
        xAxis: { type: 'category', data: sorted.map(r => r.group_key), ...axisCommon },
        yAxis: { type: 'value', ...axisCommon },
        series: [{
          type: 'line', smooth: true, symbol: 'circle', symbolSize: 5,
          data: sorted.map(r => +r.total_cost.toFixed(2)),
          lineStyle: { color: COLORS[0], width: 2 },
          itemStyle: { color: COLORS[0] },
          areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: 'rgba(129,140,248,0.3)' }, { offset: 1, color: 'rgba(129,140,248,0)' }] } },
        }],
      }
    }

    // Multi-series (split_by)
    const splitKeys = [...new Set(data.map(r => r.split_key ?? 'unknown'))]
    const groupKeys = [...new Set(data.map(r => r.group_key))].sort()
    const lookup = new Map<string, number>()
    for (const r of data) lookup.set(`${r.group_key}\0${r.split_key ?? 'unknown'}`, r.total_cost)

    return {
      ...baseOption,
      tooltip: { ...baseOption.tooltip, trigger: 'axis' },
      legend: { ...baseOption.legend, data: splitKeys, top: 0 },
      grid: { left: 55, right: 20, top: 30, bottom: 25 },
      xAxis: { type: 'category', data: groupKeys, ...axisCommon },
      yAxis: { type: 'value', ...axisCommon },
      series: splitKeys.map((sk, i) => ({
        name: sk, type: 'line', smooth: true, symbol: 'circle', symbolSize: 4,
        stack: 'total',
        areaStyle: { opacity: 0.3 },
        lineStyle: { color: COLORS[i % COLORS.length], width: 2 },
        itemStyle: { color: COLORS[i % COLORS.length] },
        data: groupKeys.map(gk => +(lookup.get(`${gk}\0${sk}`) ?? 0).toFixed(2)),
      })),
    }
  })

  // ── Table columns ──────────────────────────────────────
  const columns = computed(() => {
    const cols: any[] = [
      {
        title: groupByLabel[groupBy.value] ?? groupBy.value,
        key: 'group_key',
        render: (row: UsageSummaryRow) => h('span', { class: 'font-mono text-xs' }, row.group_key)
      }
    ]
    if (splitBy.value) {
      cols.push({
        title: groupByLabel[splitBy.value] ?? splitBy.value,
        key: 'split_key',
        render: (row: UsageSummaryRow) => h('span', { class: 'font-mono text-xs' }, row.split_key ?? '—')
      })
    }
    cols.push(
      { title: 'Requests', key: 'total_requests', render: (row: UsageSummaryRow) => row.total_requests.toLocaleString() },
      { title: 'Errors', key: 'error_requests', render: (row: UsageSummaryRow) => h('span', { class: row.error_requests > 0 ? 'text-red-400' : '' }, String(row.error_requests)) },
      { title: 'Error %', key: 'error_rate', render: (row: UsageSummaryRow) => { const r = row.total_requests > 0 ? row.error_requests / row.total_requests : 0; return h('span', { class: r > 0.05 ? 'text-red-400' : '' }, fmtPercent(r)) } },
      { title: 'Input', key: 'input_tokens', render: (row: UsageSummaryRow) => fmtTokens(row.input_tokens) },
      { title: 'Output', key: 'output_tokens', render: (row: UsageSummaryRow) => fmtTokens(row.output_tokens) },
      { title: 'Cost', key: 'total_cost', render: (row: UsageSummaryRow) => fmtMoney(row.total_cost) },
      { title: 'Avg Cost', key: 'avg_cost', render: (row: UsageSummaryRow) => { const avg = row.total_requests > 0 ? row.total_cost / row.total_requests : 0; return fmtMoney(avg) } },
    )
    return cols
  })
</script>

<template>
  <div>
    <h1 class="text-xl font-semibold text-slate-100 mb-6">Usage</h1>

    <!-- Filters -->
    <div class="flex gap-3 mb-3 flex-wrap items-end">
      <div>
        <div class="text-xs text-slate-400 mb-1">API Key</div>
        <NSelect v-model:value="selectedKey" :options="keyOptions" placeholder="All keys" clearable style="width: 200px" />
      </div>
      <div>
        <div class="text-xs text-slate-400 mb-1">Group By</div>
        <NSelect v-model:value="groupBy" :options="groupByOptions" style="width: 140px" />
      </div>
      <div>
        <div class="text-xs text-slate-400 mb-1">Split By</div>
        <NSelect v-model:value="splitBy" :options="splitByOptions" clearable style="width: 140px" />
      </div>
      <div>
        <div class="text-xs text-slate-400 mb-1">Date Range</div>
        <NDatePicker v-model:value="dateRange" type="daterange" clearable style="width: 260px" />
      </div>
      <NButton type="primary" :loading="loading" @click="query">
        <template #icon><span class="i-carbon-search" /></template>
        Query
      </NButton>
    </div>

    <!-- Time presets -->
    <div class="flex gap-2 mb-6">
      <NButton size="tiny" quaternary @click="applyPreset(24)">24h</NButton>
      <NButton size="tiny" quaternary @click="applyPreset(24 * 7)">7d</NButton>
      <NButton size="tiny" quaternary @click="applyPreset(24 * 30)">30d</NButton>
      <NButton size="tiny" quaternary @click="applyMTD()">MTD</NButton>
    </div>

    <p v-if="!result && !loading" class="text-slate-500 text-sm">
      Select filters and click Query, or use a time preset above.
    </p>

    <template v-if="result">
      <!-- Summary cards -->
      <div class="grid grid-cols-4 gap-4 mb-6">
        <NCard size="small" style="position: relative; overflow: hidden">
          <span class="i-carbon-send absolute top-3 right-3 text-[32px] text-indigo-400 opacity-80" />
          <NStatistic label="Requests" :value="result.summary.total_requests.toLocaleString()" />
        </NCard>
        <NCard size="small" style="position: relative; overflow: hidden">
          <span class="i-carbon-currency-dollar absolute top-3 right-3 text-[32px] text-amber-400 opacity-80" />
          <NStatistic label="Total Cost" :value="fmtMoney(result.summary.total_cost)" />
        </NCard>
        <NCard size="small" style="position: relative; overflow: hidden">
          <span class="i-carbon-warning absolute top-3 right-3 text-[32px] text-rose-400 opacity-80" />
          <NStatistic label="Error Rate" :value="fmtPercent(errorRate)" />
        </NCard>
        <NCard size="small" style="position: relative; overflow: hidden">
          <span class="i-carbon-data-backup absolute top-3 right-3 text-[32px] text-blue-400 opacity-80" />
          <NStatistic label="Cache Hit" :value="fmtPercent(cacheHitRate)" />
        </NCard>
      </div>

      <!-- Chart (when group_by is time-based) -->
      <NCard v-if="chartOption" size="small" class="mb-6">
        <h2 class="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
          Cost Trend{{ splitBy ? ` by ${groupByLabel[splitBy]}` : '' }}
        </h2>
        <VChart :option="chartOption" style="height: 240px" autoresize />
      </NCard>

      <!-- Data table -->
      <NDataTable :columns="columns" :data="result.data" :pagination="{ pageSize: 50 }" size="small" />
    </template>
  </div>
</template>
