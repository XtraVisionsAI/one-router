<script setup lang="ts">
  import type { Team } from '@/api/types'
  import { NButton, NProgress, NTag, useDialog, useMessage } from 'naive-ui'
  import { h } from 'vue'
  import { useTeamsApi } from '@/api/teams'
  import TeamModal from '@/components/TeamModal.vue'
  import { fmtMoney } from '@/utils/format'

  const message = useMessage()
  const dialog = useDialog()
  const api = useTeamsApi()

  const teams = ref<Team[]>([])
  const loading = ref(true)
  const modalShow = ref(false)
  const editing = ref<Team | undefined>()

  async function load() {
    loading.value = true
    try {
      teams.value = (await api.list()).data
    } catch (e: any) {
      message.error(e.message)
    } finally {
      loading.value = false
    }
  }

  async function toggleActive(t: Team) {
    try {
      if (t.is_active) await api.deactivate(t.team_id)
      else await api.activate(t.team_id)
      message.success(t.is_active ? 'Team deactivated — all member keys are disabled' : 'Team activated')
      await load()
    } catch (e: any) {
      message.error(e.message)
    }
  }

  function confirmDelete(t: Team) {
    dialog.warning({
      title: 'Delete Team',
      content:
        t.member_count > 0
          ? `Delete "${t.name}"? Its ${t.member_count} member(s) stay, but leave the team (team budget and limits no longer apply).`
          : `Delete "${t.name}"?`,
      positiveText: 'Delete',
      negativeText: 'Cancel',
      onPositiveClick: async () => {
        try {
          await api.remove(t.team_id, t.member_count > 0)
          message.success('Team deleted')
          await load()
        } catch (e: any) {
          message.error(e.message)
        }
      }
    })
  }

  function budgetCell(t: Team) {
    if (t.monthly_budget == null) return `${fmtMoney(t.budget_used_mtd)} / —`
    const pct = t.monthly_budget > 0 ? Math.min(100, (t.budget_used_mtd / t.monthly_budget) * 100) : 100
    return h('div', { style: 'min-width: 140px' }, [
      h('div', { class: 'text-xs mb-1' }, `${fmtMoney(t.budget_used_mtd)} / ${fmtMoney(t.monthly_budget)} (${t.budget_period})`),
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
    { title: 'Members', key: 'member_count', width: 90 },
    { title: 'Budget', key: 'budget', render: budgetCell },
    {
      title: 'Limits',
      key: 'limits',
      render: (t: Team) =>
        [
          t.rate_limit ? `${t.rate_limit} rpm` : null,
          t.tpm_limit ? `${t.tpm_limit} tpm` : null,
          t.max_concurrency ? `${t.max_concurrency} concurrent` : null
        ]
          .filter(Boolean)
          .join(' · ') || '—'
    },
    { title: 'Cost Rate', key: 'cost_rate', width: 90, render: (t: Team) => `×${t.cost_rate}` },
    {
      title: 'Status',
      key: 'is_active',
      render: (t: Team) =>
        h(NTag, { type: t.is_active ? 'success' : 'error', size: 'small' }, { default: () => (t.is_active ? 'active' : 'inactive') })
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (t: Team) =>
        h('div', { class: 'flex gap-2' }, [
          h(NButton, { size: 'small', onClick: () => ((editing.value = t), (modalShow.value = true)) }, { default: () => 'Edit' }),
          h(
            NButton,
            { size: 'small', type: t.is_active ? 'warning' : 'default', onClick: () => toggleActive(t) },
            { default: () => (t.is_active ? 'Deactivate' : 'Activate') }
          ),
          h(NButton, { size: 'small', type: 'error', ghost: true, onClick: () => confirmDelete(t) }, { default: () => 'Delete' })
        ])
    }
  ]

  onMounted(load)
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-xl font-semibold text-slate-100">Teams</h1>
      <n-button type="primary" @click="(editing = undefined), (modalShow = true)">
        <template #icon><span class="i-carbon-add" /></template>
        Create Team
      </n-button>
    </div>
    <p class="text-sm text-slate-400 mb-4">
      A team aggregates users: its budget, rate limits and concurrency cap are shared by every member's keys. Assign
      users to a team on the Users page.
    </p>
    <NDataTable :columns="columns" :data="teams" :loading="loading" :pagination="{ pageSize: 20 }" size="small" />
    <team-modal v-model:show="modalShow" :existing="editing" @saved="load" />
  </div>
</template>
