<script setup lang="ts">
  import type { BackendSummary } from '@/api/types'
  import { NButton, NTag, useDialog, useMessage } from 'naive-ui'
  import { h } from 'vue'
  import { useBackendsApi } from '@/api/backends'
  import BackendModal from '@/components/BackendModal.vue'

  const message = useMessage()
  const dialog = useDialog()
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
      message.success('Backend updated — restart required to take effect')
      await load()
    } catch (e: any) {
      message.error(e.message)
    }
  }

  function confirmRemove(name: string) {
    dialog.warning({
      title: 'Delete Backend',
      content: `Delete "${name}"? This cannot be undone.`,
      positiveText: 'Delete',
      negativeText: 'Cancel',
      onPositiveClick: async () => {
        try {
          await api.delete(name)
          message.success('Backend deleted — restart required to take effect')
          await load()
        } catch (e: any) {
          message.error(e.message)
        }
      }
    })
  }

  const columns = [
    { title: 'Name', key: 'name' },
    {
      title: 'Type',
      key: 'backend_type',
      render: (row: BackendSummary) => h(NTag, { size: 'small' }, { default: () => row.backend_type })
    },
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
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (row: BackendSummary) =>
        h('div', { class: 'flex gap-2' }, [
          h(NButton, { size: 'small', onClick: () => openEdit(row) }, { default: () => 'Edit' }),
          h(
            NButton,
            { size: 'small', onClick: () => toggle(row.name) },
            { default: () => (row.enabled ? 'Disable' : 'Enable') }
          ),
          h(
            NButton,
            { size: 'small', type: 'error', onClick: () => confirmRemove(row.name) },
            { default: () => 'Delete' }
          )
        ])
    }
  ]

  onMounted(load)
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-xl font-semibold text-slate-100">Backends</h1>
      <n-button type="primary" @click="openCreate">
        <template #icon><span class="i-carbon-add" /></template>
        Add Backend
      </n-button>
    </div>

    <NDataTable :columns="columns" :data="backends" :loading="loading" :pagination="false" size="small">
      <template #empty>
        <div class="py-12 text-center">
          <span class="i-carbon-server-dns text-4xl text-slate-600 block mx-auto mb-3" />
          <p class="text-slate-500 text-sm">No backends configured</p>
          <n-button type="primary" size="small" class="mt-4" @click="openCreate">Add your first backend</n-button>
        </div>
      </template>
    </NDataTable>

    <backend-modal v-model:show="modalShow" :existing="editingBackend" @saved="load" />
  </div>
</template>
