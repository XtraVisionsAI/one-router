<script setup lang="ts">
  import type { BackendSummary, StatusResponse, UsageSummaryResponse, UsageSummaryRow } from '@/api/types'
  import { NCard, NDataTable, NSelect, NSpin, NStatistic, NTag, useMessage } from 'naive-ui'
  import { h } from 'vue'
  import VChart from 'vue-echarts'
  import { use } from 'echarts/core'
  import { BarChart, LineChart, PieChart } from 'echarts/charts'
  import { GridComponent, LegendComponent, TooltipComponent } from 'echarts/components'
  import { CanvasRenderer } from 'echarts/renderers'
  import { useBackendsApi } from '@/api/backends'
  import { useUsageApi } from '@/api/usage'
  import { useApi } from '@/composables/useApi'
  import { useChartTheme } from '@/composables/useChartTheme'
  import { fmtMoney, fmtTokens, fmtUptime, fmtPercent } from '@/utils/format'

  use([BarChart, LineChart, PieChart, GridComponent, LegendComponent, TooltipComponent, CanvasRenderer])

  const message = useMessage()
  const backendsApi = useBackendsApi()
  const usageApi = useUsageApi()
  const { request } = useApi()
  const { baseOption, axisCommon, COLORS } = useChartTheme()

  // ── State ────────────────────────────────────────────────
  const loading = ref(true)
  const uptime = ref('')
  const backends = ref<BackendSummary[]>([])
  const period = ref('7d')

  // Usage data from parallel API calls
  const dailyData = ref<UsageSummaryRow[]>([])
  const providerData = ref<UsageSummaryRow[]>([])
  const modelData = ref<UsageSummaryRow[]>([])
  const summary = ref<UsageSummaryResponse['summary'] | null>(null)

  // Derived metrics
  const totalErrors = computed(() => dailyData.value.reduce((s, r) => s + r.error_requests, 0))
  const totalRequests = computed(() => summary.value?.total_requests ?? 0)
  const errorRate = computed(() => totalRequests.value > 0 ? totalErrors.value / totalRequests.value : 0)
  const totalCachedTokens = computed(() => dailyData.value.reduce((s, r) => s + r.cached_tokens, 0))
  const totalInputTokens = computed(() => summary.value?.total_input_tokens ?? 0)
  const cacheHitRate = computed(() => {
    const denom = totalInputTokens.value + totalCachedTokens.value
    return denom > 0 ? totalCachedTokens.value / denom : 0
  })

  const periodOptions = [
    { label: 'Last 24h', value: '1d' },
    { label: 'Last 7 days', value: '7d' },
    { label: 'Last 30 days', value: '30d' },
  ]

  function getStartTime(p: string): string {
    const now = new Date()
    const ms = p === '1d' ? 86400000 : p === '7d' ? 7 * 86400000 : 30 * 86400000
    return new Date(now.getTime() - ms).toISOString()
  }

  async function load() {
    loading.value = true
    try {
      const start_time = getStartTime(period.value)
      const groupBy = period.value === '1d' ? 'hour' : 'day'
      const [statusRes, dailyRes, providerRes, modelRes, backendsRes] = await Promise.all([
        request<StatusResponse>('GET', '/status'),
        usageApi.summary({ group_by: groupBy, start_time }),
        usageApi.summary({ group_by: 'provider', start_time }),
        usageApi.summary({ group_by: 'model', start_time }),
        backendsApi.list(),
      ])
      uptime.value = fmtUptime(statusRes.uptime_seconds)
      dailyData.value = dailyRes.data.slice().reverse() // chronological order for chart
      providerData.value = providerRes.data
      modelData.value = modelRes.data
      summary.value = dailyRes.summary
      backends.value = backendsRes.data
    } catch (e: any) {
      message.error(e.message)
    } finally {
      loading.value = false
    }
  }

  onMounted(load)
  watch(period, load)

  // ── Charts ───────────────────────────────────────────────

  const trendOption = computed(() => ({
    ...baseOption,
    tooltip: { ...baseOption.tooltip, trigger: 'axis' },
    legend: { ...baseOption.legend, data: ['Requests', 'Cost'], right: 0, top: 0 },
    grid: { left: 55, right: 55, top: 35, bottom: 25 },
    xAxis: { type: 'category', data: dailyData.value.map(r => r.group_key), ...axisCommon },
    yAxis: [
      { type: 'value', name: 'Requests', ...axisCommon, splitLine: axisCommon.splitLine },
      { type: 'value', name: 'Cost ($)', ...axisCommon, splitLine: { show: false } },
    ],
    series: [
      {
        name: 'Requests',
        type: 'bar',
        data: dailyData.value.map(r => r.total_requests),
        itemStyle: { color: COLORS[3], borderRadius: [3, 3, 0, 0] },
        barMaxWidth: 28,
        yAxisIndex: 0,
      },
      {
        name: 'Cost',
        type: 'line',
        data: dailyData.value.map(r => r.total_cost),
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: { color: COLORS[2], width: 2 },
        itemStyle: { color: COLORS[2] },
        areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: 'rgba(251,191,36,0.25)' }, { offset: 1, color: 'rgba(251,191,36,0)' }] } },
        yAxisIndex: 1,
      },
    ],
  }))

  const providerOption = computed(() => {
    const data = providerData.value
      .filter(r => r.total_cost > 0)
      .map(r => ({ name: r.group_key, value: +r.total_cost.toFixed(2) }))
    return {
      ...baseOption,
      tooltip: { ...baseOption.tooltip, trigger: 'item', formatter: '{b}: ${c} ({d}%)' },
      legend: { show: false },
      series: [{
        type: 'pie',
        radius: ['45%', '72%'],
        center: ['50%', '52%'],
        avoidLabelOverlap: true,
        itemStyle: { borderColor: '#1a2638', borderWidth: 2 },
        label: { color: '#94a3b8', fontSize: 11 },
        data,
      }],
    }
  })

  const modelOption = computed(() => {
    const top = modelData.value
      .slice()
      .sort((a, b) => b.total_cost - a.total_cost)
      .slice(0, 8)
      .reverse()
    return {
      ...baseOption,
      tooltip: { ...baseOption.tooltip, trigger: 'axis' },
      legend: { show: false },
      grid: { left: 10, right: 20, top: 8, bottom: 8, containLabel: true },
      xAxis: { type: 'value', ...axisCommon },
      yAxis: {
        type: 'category',
        data: top.map(r => r.group_key),
        ...axisCommon,
        axisLabel: { ...axisCommon.axisLabel, width: 140, overflow: 'truncate' },
      },
      series: [{
        type: 'bar',
        data: top.map((r, i) => ({ value: +r.total_cost.toFixed(2), itemStyle: { color: COLORS[i % COLORS.length], borderRadius: [0, 3, 3, 0] } })),
        barMaxWidth: 18,
        label: { show: true, position: 'right', color: '#94a3b8', fontSize: 11, formatter: '${c}' },
      }],
    }
  })

  // ── Backend Table ────────────────────────────────────────
  const backendColumns = [
    { title: 'Name', key: 'name' },
    { title: 'Type', key: 'backend_type' },
    {
      title: 'Health',
      key: 'health_status',
      render: (row: BackendSummary) => {
        const t = row.health_status === 'healthy' ? 'success'
          : row.health_status.startsWith('degraded') ? 'warning'
          : row.health_status === 'unhealthy' ? 'error'
          : 'default'
        return h(NTag, { type: t, size: 'small' }, { default: () => row.health_status })
      }
    },
    {
      title: 'Enabled',
      key: 'enabled',
      render: (row: BackendSummary) =>
        h(NTag, { type: row.enabled ? 'success' : 'default', size: 'small' }, { default: () => (row.enabled ? 'yes' : 'no') })
    }
  ]
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-xl font-semibold text-slate-100">Dashboard</h1>
      <NSelect v-model:value="period" :options="periodOptions" style="width: 150px" size="small" />
    </div>

    <NSpin :show="loading">
      <!-- Stat cards -->
      <div class="grid grid-cols-6 gap-3 mb-6">
        <NCard size="small" style="position: relative; overflow: hidden">
          <span class="i-carbon-send absolute top-3 right-3 text-[28px] text-indigo-400 opacity-80" />
          <NStatistic label="Requests" :value="totalRequests.toLocaleString()" />
        </NCard>
        <NCard size="small" style="position: relative; overflow: hidden">
          <span class="i-carbon-currency-dollar absolute top-3 right-3 text-[28px] text-amber-400 opacity-80" />
          <NStatistic label="Cost" :value="fmtMoney(summary?.total_cost)" />
        </NCard>
        <NCard size="small" style="position: relative; overflow: hidden">
          <span class="i-carbon-warning absolute top-3 right-3 text-[28px] text-rose-400 opacity-80" />
          <NStatistic label="Errors" :value="totalErrors.toLocaleString()" />
        </NCard>
        <NCard size="small" style="position: relative; overflow: hidden">
          <span class="i-carbon-warning-alt absolute top-3 right-3 text-[28px] text-rose-400 opacity-60" />
          <NStatistic label="Error Rate" :value="fmtPercent(errorRate)" />
        </NCard>
        <NCard size="small" style="position: relative; overflow: hidden">
          <span class="i-carbon-data-backup absolute top-3 right-3 text-[28px] text-blue-400 opacity-80" />
          <NStatistic label="Cache Hit" :value="fmtPercent(cacheHitRate)" />
        </NCard>
        <NCard size="small" style="position: relative; overflow: hidden">
          <span class="i-carbon-time absolute top-3 right-3 text-[28px] text-emerald-400 opacity-80" />
          <NStatistic label="Uptime" :value="uptime" />
        </NCard>
      </div>

      <!-- Trend chart -->
      <NCard size="small" class="mb-6">
        <h2 class="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Requests & Cost Trend</h2>
        <VChart :option="trendOption" style="height: 260px" autoresize />
      </NCard>

      <!-- Provider + Model charts -->
      <div class="grid grid-cols-2 gap-4 mb-6">
        <NCard size="small">
          <h2 class="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Cost by Provider</h2>
          <VChart :option="providerOption" style="height: 220px" autoresize />
        </NCard>
        <NCard size="small">
          <h2 class="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Top Models by Cost</h2>
          <VChart :option="modelOption" style="height: 220px" autoresize />
        </NCard>
      </div>

      <!-- Backend status -->
      <div>
        <h2 class="text-xs font-medium text-slate-400 uppercase tracking-wider mb-3">Backend Status</h2>
        <NDataTable :columns="backendColumns" :data="backends" :pagination="false" size="small" />
      </div>
    </NSpin>
  </div>
</template>
