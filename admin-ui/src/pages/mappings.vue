<script setup lang="ts">
import { h } from 'vue'
import { useMessage, NTag, NButton } from 'naive-ui'
import { useMappingsApi } from '@/api/mappings'
import MappingModal from '@/components/MappingModal.vue'
import type { ModelMapping } from '@/api/types'

const message = useMessage()
const api = useMappingsApi()

const allMappings = ref<ModelMapping[]>([])
const loading = ref(true)
const modalShow = ref(false)
const editingMapping = ref<ModelMapping | undefined>()

const filterSrc = ref('')
const filterProvider = ref('')
const filterStatus = ref('')

const providerOptions = computed(() => {
  const providers = [...new Set(allMappings.value.map(m => m.provider))].sort()
  return [{ label: 'All Providers', value: '' }, ...providers.map(p => ({ label: p, value: p }))]
})

const filtered = computed(() => allMappings.value.filter(m => {
  if (filterSrc.value && !m.source_model_id.toLowerCase().includes(filterSrc.value.toLowerCase())) return false
  if (filterProvider.value && m.provider !== filterProvider.value) return false
  if (filterStatus.value && m.status !== filterStatus.value) return false
  return true
}))

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

async function remove(m: ModelMapping) {
  try {
    await api.delete(m.source_model_id, m.provider)
    message.success('Mapping deleted')
    await load()
  } catch (e: any) {
    message.error(e.message)
  }
}

const columns = [
  {
    title: 'Source Model',
    key: 'source_model_id',
    render: (row: ModelMapping) => h('span', { class: 'font-mono text-xs' }, row.source_model_id),
  },
  {
    title: 'Target Model',
    key: 'target_model_id',
    ellipsis: { tooltip: true },
    render: (row: ModelMapping) => h('span', { class: 'font-mono text-xs text-slate-400' }, row.target_model_id),
  },
  {
    title: 'Provider',
    key: 'provider',
    render: (row: ModelMapping) => h(NTag, { size: 'small' }, { default: () => row.provider }),
  },
  { title: 'Priority', key: 'priority' },
  {
    title: 'Status',
    key: 'status',
    render: (row: ModelMapping) =>
      h(NTag, { type: row.status === 'active' ? 'success' : 'default', size: 'small' }, { default: () => row.status }),
  },
  {
    title: 'Actions',
    key: 'actions',
    render: (row: ModelMapping) => h('div', { class: 'flex gap-2' }, [
      h(NButton, { size: 'small', onClick: () => openEdit(row) }, { default: () => 'Edit' }),
      h(NButton, { size: 'small', type: 'error', onClick: () => remove(row) }, { default: () => 'Delete' }),
    ]),
  },
]

onMounted(load)
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-xl font-semibold text-slate-100">Model Mappings</h1>
      <NButton type="primary" @click="openCreate">
        <template #icon><span class="i-carbon-add" /></template>
        Add Mapping
      </NButton>
    </div>

    <div class="flex gap-3 mb-4 flex-wrap">
      <NInput
        v-model:value="filterSrc"
        placeholder="Filter by source model…"
        clearable
        style="width: 220px"
      />
      <NSelect
        v-model:value="filterProvider"
        :options="providerOptions"
        style="width: 160px"
      />
      <NSelect
        v-model:value="filterStatus"
        :options="[{ label: 'All Status', value: '' }, { label: 'active', value: 'active' }, { label: 'inactive', value: 'inactive' }]"
        style="width: 130px"
      />
      <span class="text-slate-500 text-sm self-center">
        {{ filtered.length === allMappings.length ? `${allMappings.length} mappings` : `${filtered.length} / ${allMappings.length}` }}
      </span>
    </div>

    <NDataTable
      :columns="columns"
      :data="filtered"
      :loading="loading"
      :pagination="{ pageSize: 30 }"
      size="small"
    />

    <MappingModal
      v-model:show="modalShow"
      :existing="editingMapping"
      @saved="load"
    />
  </div>
</template>
