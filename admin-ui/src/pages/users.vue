<script setup lang="ts">
  import type { Team, User } from '@/api/types'
  import { NButton, NProgress, NTag, useDialog, useMessage } from 'naive-ui'
  import { h } from 'vue'
  import { useRouter } from 'vue-router'
  import { useTeamsApi } from '@/api/teams'
  import { useUsersApi } from '@/api/users'
  import UserModal from '@/components/UserModal.vue'
  import { fmtMoney } from '@/utils/format'

  const message = useMessage()
  const dialog = useDialog()
  const router = useRouter()
  const api = useUsersApi()

  const users = ref<User[]>([])
  const teams = ref<Team[]>([])
  const teamsApi = useTeamsApi()
  const teamName = (id: string | null) => (id ? (teams.value.find((t) => t.team_id === id)?.name ?? id.slice(0, 8)) : '—')
  const loading = ref(true)
  const modalShow = ref(false)
  const editing = ref<User | undefined>()

  async function load() {
    loading.value = true
    try {
      const [u, t] = await Promise.all([api.list(), teamsApi.list()])
      users.value = u.data
      teams.value = t.data
    } catch (e: any) {
      message.error(e.message)
    } finally {
      loading.value = false
    }
  }

  function openCreate() {
    editing.value = undefined
    modalShow.value = true
  }

  function openEdit(u: User) {
    editing.value = u
    modalShow.value = true
  }

  async function toggleActive(u: User) {
    try {
      if (u.is_active) await api.deactivate(u.user_id)
      else await api.activate(u.user_id)
      message.success(u.is_active ? 'User deactivated — all of its keys are disabled' : 'User activated')
      await load()
    } catch (e: any) {
      message.error(e.message)
    }
  }

  function confirmDelete(u: User) {
    const cascade = u.key_count > 0
    dialog.warning({
      title: 'Delete User',
      content: cascade
        ? `Delete "${u.name}" and permanently delete its ${u.key_count} API key(s)? Clients using them stop working immediately. Usage history is kept. This cannot be undone.`
        : `Delete "${u.name}"? This cannot be undone.`,
      positiveText: 'Delete',
      negativeText: 'Cancel',
      onPositiveClick: async () => {
        try {
          await api.remove(u.user_id, cascade)
          message.success('User deleted')
          await load()
        } catch (e: any) {
          message.error(e.message)
        }
      }
    })
  }

  function budgetCell(u: User) {
    if (u.monthly_budget == null) return h('span', { class: 'text-slate-400' }, `${fmtMoney(u.budget_used_mtd)} / —`)
    const pct = u.monthly_budget > 0 ? Math.min(100, (u.budget_used_mtd / u.monthly_budget) * 100) : 100
    return h('div', { style: 'min-width: 140px' }, [
      h('div', { class: 'text-xs mb-1' }, `${fmtMoney(u.budget_used_mtd)} / ${fmtMoney(u.monthly_budget)}`),
      h(NProgress, {
        type: 'line',
        percentage: Math.round(pct),
        showIndicator: false,
        height: 4,
        status: pct >= 100 ? 'error' : pct >= 80 ? 'warning' : 'success'
      })
    ])
  }

  const columns = [
    { title: 'Name', key: 'name' },
    { title: 'Team', key: 'team_id', render: (u: User) => teamName(u.team_id) },
    { title: 'Keys', key: 'key_count', width: 70 },
    { title: 'Budget MTD', key: 'budget', render: budgetCell },
    {
      title: 'Limits',
      key: 'limits',
      render: (u: User) =>
        [u.rate_limit ? `${u.rate_limit} rpm` : 'default rpm', u.tpm_limit ? `${u.tpm_limit} tpm` : null]
          .filter(Boolean)
          .join(' · ')
    },
    { title: 'Cost Rate', key: 'cost_rate', width: 90, render: (u: User) => `×${u.cost_rate}` },
    {
      title: 'Models',
      key: 'allowed_models',
      ellipsis: { tooltip: true },
      render: (u: User) => (u.allowed_models?.length ? u.allowed_models.join(', ') : 'all')
    },
    {
      title: 'Status',
      key: 'is_active',
      render: (u: User) =>
        h(NTag, { type: u.is_active ? 'success' : 'error', size: 'small' }, { default: () => (u.is_active ? 'active' : 'inactive') })
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (u: User) =>
        h('div', { class: 'flex gap-2' }, [
          h(NButton, { size: 'small', onClick: () => router.push({ path: '/keys', query: { user: u.user_id } }) }, { default: () => 'Keys' }),
          h(NButton, { size: 'small', onClick: () => openEdit(u) }, { default: () => 'Edit' }),
          h(
            NButton,
            { size: 'small', type: u.is_active ? 'warning' : 'default', onClick: () => toggleActive(u) },
            { default: () => (u.is_active ? 'Deactivate' : 'Activate') }
          ),
          h(NButton, { size: 'small', type: 'error', ghost: true, onClick: () => confirmDelete(u) }, { default: () => 'Delete' })
        ])
    }
  ]

  onMounted(load)
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-xl font-semibold text-slate-100">Users</h1>
      <n-button type="primary" @click="openCreate">
        <template #icon><span class="i-carbon-add" /></template>
        Create User
      </n-button>
    </div>
    <p class="text-sm text-slate-400 mb-4">
      Budgets, cost rate and rate limits are enforced per user and shared by all of the user's API keys.
    </p>

    <NDataTable :columns="columns" :data="users" :loading="loading" :pagination="{ pageSize: 20 }" size="small">
      <template #empty>
        <div class="py-12 text-center">
          <span class="i-carbon-user-multiple text-4xl text-slate-600 block mx-auto mb-3" />
          <p class="text-slate-500 text-sm">No users yet</p>
          <n-button type="primary" size="small" class="mt-4" @click="openCreate">Create the first user</n-button>
        </div>
      </template>
    </NDataTable>

    <user-modal v-model:show="modalShow" :existing="editing" :teams="teams" @saved="load" />
  </div>
</template>
