<script setup lang="ts">
import { h } from 'vue'
import { useMessage, NTag, NButton, NAlert } from 'naive-ui'
import { useKeysApi } from '@/api/keys'
import KeyModal from '@/components/KeyModal.vue'
import type { ApiKey } from '@/api/types'
import { fmtMoney } from '@/utils/format'

const message = useMessage()
const api = useKeysApi()

const keys = ref<ApiKey[]>([])
const loading = ref(true)
const modalShow = ref(false)
const editingKey = ref<ApiKey | undefined>()
const revealedKey = ref<string | null>(null)

async function load() {
  loading.value = true
  try {
    const res = await api.list()
    keys.value = res.data
  } catch (e: any) {
    message.error(e.message)
  } finally {
    loading.value = false
  }
}

function openCreate() {
  editingKey.value = undefined
  modalShow.value = true
}

function openEdit(key: ApiKey) {
  editingKey.value = key
  modalShow.value = true
}

async function toggleActive(key: ApiKey) {
  try {
    if (key.is_active) {
      await api.deactivate(key.api_key)
      message.success('Key deactivated')
    } else {
      await api.activate(key.api_key)
      message.success('Key activated')
    }
    await load()
  } catch (e: any) {
    message.error(e.message)
  }
}

function onSaved(newKey?: string) {
  if (newKey) revealedKey.value = newKey
  load()
}

function copyKey(key: string) {
  navigator.clipboard.writeText(key).then(() => message.success('Copied!'))
}

const columns = [
  { title: 'Name', key: 'name' },
  {
    title: 'Key',
    key: 'api_key',
    ellipsis: { tooltip: true },
    render: (row: ApiKey) => h('span', { class: 'font-mono text-xs text-slate-400' }, row.api_key),
  },
  {
    title: 'User',
    key: 'user_id',
    render: (row: ApiKey) => h('span', { class: 'text-slate-400' }, row.user_id),
  },
  {
    title: 'Rate Limit',
    key: 'rate_limit',
    render: (row: ApiKey) => row.rate_limit > 0 ? `${row.rate_limit} rpm` : '—',
  },
  {
    title: 'Budget MTD',
    key: 'budget',
    render: (row: ApiKey) => row.monthly_budget != null
      ? `${fmtMoney(row.budget_used_mtd)} / ${fmtMoney(row.monthly_budget)}`
      : '—',
  },
  {
    title: 'Status',
    key: 'is_active',
    render: (row: ApiKey) =>
      h(NTag, { type: row.is_active ? 'success' : 'error', size: 'small' }, { default: () => row.is_active ? 'active' : 'inactive' }),
  },
  {
    title: 'Actions',
    key: 'actions',
    render: (row: ApiKey) => h('div', { class: 'flex gap-2' }, [
      h(NButton, { size: 'small', onClick: () => openEdit(row) }, { default: () => 'Edit' }),
      h(NButton, {
        size: 'small',
        type: row.is_active ? 'warning' : 'default',
        onClick: () => toggleActive(row),
      }, { default: () => row.is_active ? 'Deactivate' : 'Activate' }),
    ]),
  },
]

onMounted(load)
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-xl font-semibold text-slate-100">API Keys</h1>
      <NButton type="primary" @click="openCreate">
        <template #icon><span class="i-carbon-add" /></template>
        Create Key
      </NButton>
    </div>

    <NAlert
      v-if="revealedKey"
      type="success"
      class="mb-4"
      title="API Key Created — save this key now, it will not be shown again"
      closable
      @close="revealedKey = null"
    >
      <div class="flex items-center gap-3 mt-2">
        <span class="font-mono text-sm">{{ revealedKey }}</span>
        <NButton size="small" @click="copyKey(revealedKey!)">
          <template #icon><span class="i-carbon-copy" /></template>
          Copy
        </NButton>
      </div>
    </NAlert>

    <NDataTable
      :columns="columns"
      :data="keys"
      :loading="loading"
      :pagination="{ pageSize: 20 }"
      size="small"
    >
      <template #empty>
        <div class="py-12 text-center">
          <span class="i-carbon-api text-4xl text-slate-600 block mx-auto mb-3" />
          <p class="text-slate-500 text-sm">No API keys yet</p>
          <NButton type="primary" size="small" class="mt-4" @click="openCreate">Create your first key</NButton>
        </div>
      </template>
    </NDataTable>

    <KeyModal
      v-model:show="modalShow"
      :existing="editingKey"
      @saved="onSaved"
    />
  </div>
</template>
