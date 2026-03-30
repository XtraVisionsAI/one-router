<script setup lang="ts">
import { h } from 'vue'
import { useMessage, NTag, NButton } from 'naive-ui'
import { useBackendsApi } from '@/api/backends'
import BackendModal from '@/components/BackendModal.vue'
import type { BackendSummary } from '@/api/types'

const message = useMessage()
const api = useBackendsApi()

const backends = ref<BackendSummary[]>([])
const loading = ref(true)
const modalShow = ref(false)
const editingBackend = ref<BackendSummary | undefined>()

async function load() {
  loading.value = true
  try {
    const res = await api.list()
    backends.value = res.data
  } catch (e: any) {
    message.error(e.message)
  } finally {
    loading.value = false
  }
}

function openCreate() {
  editingBackend.value = undefined
  modalShow.value = true
}

function openEdit(backend: BackendSummary) {
  editingBackend.value = backend
  modalShow.value = true
}

async function toggle(name: string) {
  try {
    await api.toggle(name)
    message.success('Backend updated')
    await load()
  } catch (e: any) {
    message.error(e.message)
  }
}

async function remove(name: string) {
  try {
    await api.delete(name)
    message.success('Backend deleted')
    await load()
  } catch (e: any) {
    message.error(e.message)
  }
}

const columns = [
  { title: 'Name', key: 'name' },
  {
    title: 'Type',
    key: 'backend_type',
    render: (row: BackendSummary) => h(NTag, { size: 'small' }, { default: () => row.backend_type }),
  },
  { title: 'Priority', key: 'priority' },
  {
    title: 'Health',
    key: 'health_status',
    render: (row: BackendSummary) => {
      const type = row.health_status === 'healthy' ? 'success' : row.health_status === 'unhealthy' ? 'error' : 'default'
      return h(NTag, { type, size: 'small' }, { default: () => row.health_status })
    },
  },
  {
    title: 'Enabled',
    key: 'enabled',
    render: (row: BackendSummary) =>
      h(NTag, { type: row.enabled ? 'success' : 'default', size: 'small' }, { default: () => row.enabled ? 'enabled' : 'disabled' }),
  },
  {
    title: 'Actions',
    key: 'actions',
    render: (row: BackendSummary) => h('div', { class: 'flex gap-2' }, [
      h(NButton, { size: 'small', onClick: () => openEdit(row) }, { default: () => 'Edit' }),
      h(NButton, { size: 'small', onClick: () => toggle(row.name) }, { default: () => row.enabled ? 'Disable' : 'Enable' }),
      h(NButton, { size: 'small', type: 'error', onClick: () => remove(row.name) }, { default: () => 'Delete' }),
    ]),
  },
]

onMounted(load)
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-xl font-semibold text-slate-100">Backends</h1>
      <NButton type="primary" @click="openCreate">
        <template #icon><span class="i-carbon-add" /></template>
        Add Backend
      </NButton>
    </div>

    <NDataTable
      :columns="columns"
      :data="backends"
      :loading="loading"
      :pagination="false"
      size="small"
    />

    <BackendModal
      v-model:show="modalShow"
      :existing="editingBackend"
      @saved="load"
    />
  </div>
</template>
