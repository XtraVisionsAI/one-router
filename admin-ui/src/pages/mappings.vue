<script setup lang="ts">
  import type { ModelMapping } from '@/api/types'
  import { NButton, NTag, useDialog, useMessage } from 'naive-ui'
  import { h } from 'vue'
  import { useMappingsApi } from '@/api/mappings'
  import MappingModal from '@/components/MappingModal.vue'

  const message = useMessage()
  const dialog = useDialog()
  const api = useMappingsApi()

  const allMappings = ref<ModelMapping[]>([])
  const loading = ref(true)
  const modalShow = ref(false)
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

  function renderPricing(row: ModelMapping) {
    const { input_price, output_price, cache_read_price, cache_write_price } = row
    if (input_price === 0 && output_price === 0 && cache_read_price === 0 && cache_write_price === 0) {
      return h('span', { class: 'text-slate-600' }, '—')
    }
    return h('span', { class: 'font-mono text-[11px] text-slate-400 whitespace-nowrap' }, [
      h('span', { class: 'text-slate-300' }, `$${fmtPrice(input_price)}`),
      h('span', { class: 'text-slate-600 mx-0.5' }, '/'),
      h('span', { class: 'text-slate-300' }, `$${fmtPrice(output_price)}`),
      ...(cache_read_price > 0 || cache_write_price > 0
        ? [
            h('span', { class: 'text-slate-700 mx-1' }, '·'),
            h('span', { class: 'text-slate-500' }, `c$${fmtPrice(cache_read_price)}`),
            h('span', { class: 'text-slate-700 mx-0.5' }, '/'),
            h('span', { class: 'text-slate-500' }, `$${fmtPrice(cache_write_price)}`),
          ]
        : []),
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

  onMounted(load)
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-xl font-semibold text-slate-100">Model Mappings</h1>
      <n-button type="primary" @click="openCreate">
        <template #icon><span class="i-carbon-add" /></template>
        Add Mapping
      </n-button>
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
  </div>
</template>
