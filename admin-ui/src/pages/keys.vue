<script setup lang="ts">
  import type { ApiKey, User } from '@/api/types'
  import { NAlert, NButton, NSelect, NTag, NTooltip, useDialog, useMessage } from 'naive-ui'
  import { h } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useKeysApi } from '@/api/keys'
  import { useUsersApi } from '@/api/users'
  import KeyModal from '@/components/KeyModal.vue'
  import { fmtMoney } from '@/utils/format'

  const message = useMessage()
  const dialog = useDialog()
  const api = useKeysApi()
  const usersApi = useUsersApi()
  const route = useRoute()
  const router = useRouter()

  const keys = ref<ApiKey[]>([])
  const users = ref<User[]>([])
  const userFilter = ref<string | null>((route.query.user as string) || null)
  const userOptions = computed(() => users.value.map((u) => ({ label: u.name, value: u.user_id })))
  const visibleKeys = computed(() =>
    userFilter.value ? keys.value.filter((k) => k.user_id === userFilter.value) : keys.value
  )
  watch(userFilter, (v) => router.replace({ query: v ? { user: v } : {} }))
  const loading = ref(true)
  const modalShow = ref(false)
  const editingKey = ref<ApiKey | undefined>()
  const revealedKey = ref<string | null>(null)

  async function load() {
    loading.value = true
    try {
      const [k, u] = await Promise.all([api.list(), usersApi.list()])
      keys.value = k.data
      users.value = u.data
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
        await api.deactivate(key.key_id)
        message.success('Key deactivated')
      } else {
        await api.activate(key.key_id)
        message.success('Key activated')
      }
      await load()
    } catch (e: any) {
      message.error(e.message)
    }
  }

  function confirmDelete(key: ApiKey) {
    dialog.warning({
      title: 'Delete API Key',
      content: `Permanently delete "${key.name}" (${key.api_key})? Clients using it stop working immediately. Usage history is kept. This cannot be undone.`,
      positiveText: 'Delete',
      negativeText: 'Cancel',
      onPositiveClick: async () => {
        try {
          await api.remove(key.key_id)
          message.success('Key deleted')
          await load()
        } catch (e: any) {
          message.error(e.message)
        }
      }
    })
  }

  /** Status tag: legacy soft-deleted keys (pre key-id releases) are flagged so they can be purged. */
  function statusTag(row: ApiKey) {
    if (row.is_active) return h(NTag, { type: 'success', size: 'small' }, { default: () => 'active' })
    const reason = row.deactivated_reason
    const label = reason === 'deleted' ? 'deleted (legacy)' : reason === 'budget_exceeded' ? 'budget exceeded' : 'inactive'
    const tag = h(NTag, { type: reason === 'deleted' ? 'default' : 'error', size: 'small' }, { default: () => label })
    if (reason !== 'deleted') return tag
    return h(NTooltip, null, {
      trigger: () => tag,
      default: () => 'Soft-deleted by an older version. Use Delete to remove it permanently.'
    })
  }

  function onSaved(newKey?: string) {
    if (newKey) revealedKey.value = newKey
    load()
  }

  function copyKey(key: string) {
    navigator.clipboard.writeText(key).then(() => message.success('Copied!'))
  }

  function fmtExpiry(row: ApiKey) {
    if (!row.expires_at) return '—'
    const d = new Date(row.expires_at * 1000)
    const expired = row.expires_at * 1000 <= Date.now()
    return h('span', { class: expired ? 'text-red-400' : '' }, `${expired ? 'expired ' : ''}${d.toLocaleDateString()}`)
  }

  const columns = [
    { title: 'Name', key: 'name' },
    {
      title: 'User',
      key: 'user_name',
      render: (row: ApiKey) => row.user_name ?? h('span', { class: 'text-slate-500' }, row.user_id || '—')
    },
    {
      title: 'Key',
      key: 'api_key',
      ellipsis: { tooltip: true },
      render: (row: ApiKey) => h('span', { class: 'font-mono text-xs text-slate-400' }, row.api_key)
    },
    {
      title: 'Key Limits',
      key: 'rate_limit',
      render: (row: ApiKey) =>
        [row.rate_limit > 0 ? `${row.rate_limit} rpm` : null, row.tpm_limit ? `${row.tpm_limit} tpm` : null]
          .filter(Boolean)
          .join(' · ') || 'user'
    },
    {
      title: 'Spend MTD',
      key: 'budget',
      render: (row: ApiKey) =>
        row.monthly_budget != null
          ? `${fmtMoney(row.budget_used_mtd)} / ${fmtMoney(row.monthly_budget)}`
          : fmtMoney(row.budget_used_mtd)
    },
    {
      title: 'Models',
      key: 'allowed_models',
      ellipsis: { tooltip: true },
      render: (row: ApiKey) => (row.allowed_models?.length ? row.allowed_models.join(', ') : 'user')
    },
    { title: 'Expires', key: 'expires_at', render: fmtExpiry },
    {
      title: 'Status',
      key: 'is_active',
      render: statusTag
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (row: ApiKey) =>
        h('div', { class: 'flex gap-2' }, [
          h(NButton, { size: 'small', onClick: () => openEdit(row) }, { default: () => 'Edit' }),
          h(
            NButton,
            {
              size: 'small',
              type: row.is_active ? 'warning' : 'default',
              onClick: () => toggleActive(row)
            },
            { default: () => (row.is_active ? 'Deactivate' : 'Activate') }
          ),
          h(NButton, { size: 'small', type: 'error', ghost: true, onClick: () => confirmDelete(row) }, { default: () => 'Delete' })
        ])
    }
  ]

  onMounted(load)
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-xl font-semibold text-slate-100">API Keys</h1>
      <n-button type="primary" :disabled="!users.length" @click="openCreate">
        <template #icon><span class="i-carbon-add" /></template>
        Create Key
      </n-button>
    </div>

    <n-alert
      v-if="revealedKey"
      type="success"
      class="mb-4"
      title="API Key Created — save this key now, it will not be shown again"
      closable
      @close="revealedKey = null"
    >
      <div class="flex items-center gap-3 mt-2">
        <span class="font-mono text-sm">{{ revealedKey }}</span>
        <n-button size="small" @click="copyKey(revealedKey!)">
          <template #icon><span class="i-carbon-copy" /></template>
          Copy
        </n-button>
      </div>
    </n-alert>

    <div class="flex items-center gap-3 mb-4">
      <span class="text-xs text-slate-400">User</span>
      <NSelect
        v-model:value="userFilter"
        :options="userOptions"
        filterable
        clearable
        placeholder="All users"
        style="width: 220px"
      />
      <span v-if="!users.length && !loading" class="text-xs text-slate-400">
        Create a user first — every key belongs to a user.
      </span>
    </div>

    <NDataTable :columns="columns" :data="visibleKeys" :loading="loading" :pagination="{ pageSize: 20 }" size="small">
      <template #empty>
        <div class="py-12 text-center">
          <span class="i-carbon-api text-4xl text-slate-600 block mx-auto mb-3" />
          <p class="text-slate-500 text-sm">No API keys yet</p>
          <n-button type="primary" size="small" class="mt-4" :disabled="!users.length" @click="openCreate">
            Create a key
          </n-button>
        </div>
      </template>
    </NDataTable>

    <key-modal
      v-model:show="modalShow"
      :existing="editingKey"
      :users="users"
      :default-user-id="userFilter"
      @saved="onSaved"
    />
  </div>
</template>
