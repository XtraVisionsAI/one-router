<script setup lang="ts">
  import type { PricingSyncSummary } from '@/api/pricing'
  import type { ModelMapping } from '@/api/types'
  import { NButton, NTag, useDialog, useMessage } from 'naive-ui'
  import { h } from 'vue'
  import { useMappingsApi } from '@/api/mappings'
  import { usePricingApi } from '@/api/pricing'
  import ImportLitellmModal from '@/components/ImportLitellmModal.vue'
  import MappingModal from '@/components/MappingModal.vue'

  const message = useMessage()
  const dialog = useDialog()
  const api = useMappingsApi()
  const pricingApi = usePricingApi()

  const allMappings = ref<ModelMapping[]>([])
  const loading = ref(true)
  const modalShow = ref(false)
  const importShow = ref(false)
  const editingMapping = ref<ModelMapping | undefined>()

  const filterSrc = ref('')
  const filterProvider = ref('')
  const filterStatus = ref('')

  const providerOptions = computed(() => {
    const providers = [...new Set(allMappings.value.map((m) => m.provider))].sort()
    return [{ label: 'All Providers', value: '' }, ...providers.map((p) => ({ label: p, value: p }))]
  })

  const filtered = computed(() =>
    allMappings.value.filter((m) => {
      if (filterSrc.value && !m.source_model_id.toLowerCase().includes(filterSrc.value.toLowerCase())) return false
      if (filterProvider.value && m.provider !== filterProvider.value) return false
      if (filterStatus.value && m.status !== filterStatus.value) return false
      return true
    })
  )

  async function load() {
    loading.value = true
    try {
      const res = await api.list()
      allMappings.value = res.data
    } catch (e: any) {
      message.error(e.message)
    } finally {
      loading.value = false
    }
  }

  function openCreate() {
    editingMapping.value = undefined
    modalShow.value = true
  }

  function openEdit(m: ModelMapping) {
    editingMapping.value = m
    modalShow.value = true
  }

  function confirmRemove(m: ModelMapping) {
    dialog.warning({
      title: 'Delete Mapping',
      content: `Delete mapping "${m.source_model_id}" → ${m.provider}?`,
      positiveText: 'Delete',
      negativeText: 'Cancel',
      onPositiveClick: async () => {
        try {
          await api.delete(m.source_model_id, m.provider)
          message.success('Mapping deleted')
          await load()
        } catch (e: any) {
          message.error(e.message)
        }
      }
    })
  }

  function fmtPrice(v: number) {
    if (v === 0) return '0'
    if (v < 1) return `${v}`
    return v % 1 === 0 ? `${v}` : `${v}`
  }

  // ── LiteLLM price sync ──────────────────────────────────────
  const syncing = ref(false)
  const lastSync = ref<PricingSyncSummary | null>(null)

  async function loadSyncStatus() {
    try {
      const res = await pricingApi.status()
      lastSync.value = res.last_sync
    } catch {
      // non-fatal: status display only
    }
  }

  function syncSummaryText(s: PricingSyncSummary) {
    const parts = [`${s.updated.length} updated`, `${s.unchanged} unchanged`]
    if (s.skipped_manual.length) parts.push(`${s.skipped_manual.length} manual pinned`)
    if (s.not_found.length) parts.push(`${s.not_found.length} not in price table`)
    return parts.join(' · ')
  }

  function fmtSyncTime(unixSecs: number | null) {
    if (!unixSecs) return ''
    return ` (${new Date(unixSecs * 1000).toLocaleString()})`
  }

  function renderSyncPreview(preview: PricingSyncSummary) {
    const sample = preview.updated.slice(0, 8)
    return h('div', { class: 'text-sm' }, [
      h('p', { class: 'text-slate-400' }, syncSummaryText(preview)),
      ...(sample.length
        ? [
            h('p', { class: 'text-slate-500 text-xs mt-3 mb-1' }, 'Will update:'),
            h(
              'ul',
              { class: 'font-mono text-xs text-slate-300 space-y-0.5' },
              sample.map((m) => h('li', m))
            ),
            ...(preview.updated.length > sample.length
              ? [
                  h(
                    'p',
                    { class: 'text-slate-500 text-xs mt-1' },
                    `…and ${preview.updated.length - sample.length} more`
                  )
                ]
              : [])
          ]
        : [h('p', { class: 'text-slate-500 text-xs mt-2' }, 'All prices are already up to date.')])
    ])
  }

  async function openSyncPreview() {
    syncing.value = true
    try {
      const preview = await pricingApi.sync({ dryRun: true })
      const count = preview.updated.length
      dialog.info({
        title: 'Sync Prices from LiteLLM',
        content: () => renderSyncPreview(preview),
        positiveText: count > 0 ? `Apply ${count} update${count > 1 ? 's' : ''}` : 'Apply',
        negativeText: 'Cancel',
        onPositiveClick: applySync
      })
    } catch (e: any) {
      message.error(e.message)
    } finally {
      syncing.value = false
    }
  }

  async function applySync() {
    syncing.value = true
    try {
      const summary = await pricingApi.sync()
      lastSync.value = summary
      message.success(`Prices synced: ${syncSummaryText(summary)}`)
      await load()
    } catch (e: any) {
      message.error(e.message)
    } finally {
      syncing.value = false
    }
  }

  function renderPricing(row: ModelMapping) {
    const { input_price, output_price, cache_read_price, cache_write_price } = row
    const manualMark =
      row.pricing_source === 'manual'
        ? [
            h('span', {
              class: 'i-carbon-locked inline-block text-amber-400/80 mr-1 align-[-2px]',
              title: 'Manual pricing — pinned, not overwritten by LiteLLM sync'
            })
          ]
        : []
    if (input_price === 0 && output_price === 0 && cache_read_price === 0 && cache_write_price === 0) {
      return h('span', { class: 'text-slate-600' }, [...manualMark, '—'])
    }
    return h('span', { class: 'font-mono text-[11px] text-slate-400 whitespace-nowrap' }, [
      ...manualMark,
      h('span', { class: 'text-slate-300' }, `$${fmtPrice(input_price)}`),
      h('span', { class: 'text-slate-600 mx-0.5' }, '/'),
      h('span', { class: 'text-slate-300' }, `$${fmtPrice(output_price)}`),
      ...(cache_read_price > 0 || cache_write_price > 0
        ? [
            h('span', { class: 'text-slate-700 mx-1' }, '·'),
            h('span', { class: 'text-slate-500' }, `c$${fmtPrice(cache_read_price)}`),
            h('span', { class: 'text-slate-700 mx-0.5' }, '/'),
            h('span', { class: 'text-slate-500' }, `$${fmtPrice(cache_write_price)}`)
          ]
        : [])
    ])
  }

  const columns = [
    {
      title: 'Source Model',
      key: 'source_model_id',
      width: 280,
      ellipsis: { tooltip: true },
      render: (row: ModelMapping) => h('span', { class: 'font-mono text-xs text-slate-200' }, row.source_model_id)
    },
    {
      title: 'Target Model',
      key: 'target_model_id',
      ellipsis: { tooltip: true },
      render: (row: ModelMapping) => h('span', { class: 'font-mono text-xs text-slate-400' }, row.target_model_id)
    },
    {
      title: 'Provider',
      key: 'provider',
      width: 90,
      render: (row: ModelMapping) => h(NTag, { size: 'small' }, { default: () => row.provider })
    },
    {
      title: 'Pricing',
      key: 'pricing',
      width: 180,
      render: renderPricing
    },
    { title: 'Priority', key: 'priority', width: 70, align: 'center' as const },
    {
      title: 'Status',
      key: 'status',
      width: 80,
      render: (row: ModelMapping) =>
        h(NTag, { type: row.status === 'active' ? 'success' : 'default', size: 'small' }, { default: () => row.status })
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 130,
      render: (row: ModelMapping) =>
        h('div', { class: 'flex gap-2' }, [
          h(NButton, { size: 'small', onClick: () => openEdit(row) }, { default: () => 'Edit' }),
          h(NButton, { size: 'small', type: 'error', onClick: () => confirmRemove(row) }, { default: () => 'Del' })
        ])
    }
  ]

  onMounted(() => {
    load()
    loadSyncStatus()
  })
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-xl font-semibold text-slate-100">Model Mappings</h1>
      <div class="flex gap-2">
        <n-button :loading="syncing" @click="openSyncPreview">
          <template #icon><span class="i-carbon-currency-dollar" /></template>
          Sync Prices
        </n-button>
        <n-button @click="importShow = true">
          <template #icon><span class="i-carbon-download" /></template>
          Import from LiteLLM
        </n-button>
        <n-button type="primary" @click="openCreate">
          <template #icon><span class="i-carbon-add" /></template>
          Add Mapping
        </n-button>
      </div>
    </div>

    <div class="flex gap-3 mb-4 flex-wrap items-center">
      <NInput v-model:value="filterSrc" placeholder="Filter by source model…" clearable style="width: 220px" />
      <NSelect v-model:value="filterProvider" :options="providerOptions" style="width: 160px" />
      <NSelect
        v-model:value="filterStatus"
        :options="[
          { label: 'All Status', value: '' },
          { label: 'active', value: 'active' },
          { label: 'inactive', value: 'inactive' }
        ]"
        style="width: 130px"
      />
      <span class="text-slate-500 text-xs">
        {{
          filtered.length === allMappings.length
            ? `${allMappings.length} mappings`
            : `${filtered.length} / ${allMappings.length}`
        }}
      </span>
      <span v-if="lastSync" class="text-slate-500 text-xs ml-auto">
        Last price sync{{ fmtSyncTime(lastSync.synced_at) }}: {{ syncSummaryText(lastSync) }}
      </span>
    </div>

    <NDataTable :columns="columns" :data="filtered" :loading="loading" :pagination="{ pageSize: 30 }" size="small">
      <template #empty>
        <div class="py-12 text-center">
          <span class="i-carbon-arrows-horizontal text-4xl text-slate-600 block mx-auto mb-3" />
          <p class="text-slate-500 text-sm">No model mappings configured</p>
          <n-button type="primary" size="small" class="mt-4" @click="openCreate">Add your first mapping</n-button>
        </div>
      </template>
    </NDataTable>

    <mapping-modal v-model:show="modalShow" :existing="editingMapping" @saved="load" />
    <import-litellm-modal v-model:show="importShow" @saved="load" />
  </div>
</template>
