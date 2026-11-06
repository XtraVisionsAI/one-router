<script setup lang="ts">
  import type { AuditEntry } from '@/api/types'
  import { NButton, NCode, NDataTable, NInput, NSelect, NTag, useMessage } from 'naive-ui'
  import { h } from 'vue'
  import { useAuditApi } from '@/api/audit'

  const message = useMessage()
  const api = useAuditApi()

  const rows = ref<AuditEntry[]>([])
  const loading = ref(false)
  const hasMore = ref(false)
  const action = ref<string | null>(null)
  const targetType = ref<string | null>(null)
  const targetId = ref('')

  const actionOptions = [
    { label: 'All actions', value: null },
    { label: 'API keys', value: 'api_key.' },
    { label: 'Users', value: 'user.' },
    { label: 'Backends', value: 'backend.' },
    { label: 'Model mappings', value: 'mapping.' },
    { label: 'Settings', value: 'setting.' },
    { label: 'Logins', value: 'auth.' },
    { label: 'Failed logins', value: 'auth.login_failed' }
  ]
  const targetOptions = [
    { label: 'Any target', value: null },
    ...['api_key', 'user', 'backend', 'mapping', 'setting', 'pricing', 'update'].map((t) => ({ label: t, value: t }))
  ]

  async function load(append = false) {
    loading.value = true
    try {
      const res = await api.list({
        action: action.value ?? undefined,
        target_type: targetType.value ?? undefined,
        target_id: targetId.value.trim() || undefined,
        before: append && rows.value.length ? rows.value[rows.value.length - 1].timestamp : undefined,
        limit: 100
      })
      rows.value = append ? [...rows.value, ...res.data] : res.data
      hasMore.value = res.has_more
    } catch (e: any) {
      message.error(e.message)
    } finally {
      loading.value = false
    }
  }

  const statusType = (s: number) => (s < 300 ? 'success' : s < 500 ? 'warning' : 'error')

  const columns = [
    {
      type: 'expand' as const,
      expandable: (r: AuditEntry) => r.before_json != null || r.after_json != null,
      renderExpand: (r: AuditEntry) =>
        h('div', { class: 'grid grid-cols-2 gap-4' }, [
          h('div', [h('div', { class: 'text-xs text-slate-400 mb-1' }, 'Before'), h(NCode, { code: JSON.stringify(r.before_json, null, 2) ?? '—', language: 'json' })]),
          h('div', [h('div', { class: 'text-xs text-slate-400 mb-1' }, 'After'), h(NCode, { code: JSON.stringify(r.after_json, null, 2) ?? '—', language: 'json' })])
        ])
    },
    {
      title: 'Time',
      key: 'timestamp',
      width: 170,
      render: (r: AuditEntry) => new Date(r.timestamp).toLocaleString()
    },
    { title: 'Actor', key: 'actor', width: 140 },
    { title: 'Action', key: 'action', render: (r: AuditEntry) => h('span', { class: 'font-mono text-xs' }, r.action) },
    {
      title: 'Target',
      key: 'target',
      ellipsis: { tooltip: true },
      render: (r: AuditEntry) => (r.target_type ? `${r.target_type}/${r.target_id ?? ''}` : '—')
    },
    {
      title: 'Status',
      key: 'status',
      width: 80,
      render: (r: AuditEntry) => h(NTag, { size: 'small', type: statusType(r.status) }, { default: () => String(r.status) })
    },
    { title: 'Client', key: 'source_ip', width: 130, render: (r: AuditEntry) => r.source_ip ?? '—' }
  ]

  watch([action, targetType], () => load())
  onMounted(() => load())
</script>

<template>
  <div>
    <h1 class="text-xl font-semibold text-slate-100 mb-2">Audit Log</h1>
    <p class="text-sm text-slate-400 mb-4">
      Every admin write and login attempt. Snapshots never contain key secrets or sensitive setting values.
    </p>

    <div class="flex gap-3 mb-4 flex-wrap items-end">
      <NSelect v-model:value="action" :options="actionOptions" style="width: 180px" />
      <NSelect v-model:value="targetType" :options="targetOptions" style="width: 160px" />
      <NInput v-model:value="targetId" placeholder="Target id" clearable style="width: 260px" @keyup.enter="load()" />
      <NButton @click="load()">Search</NButton>
    </div>

    <NDataTable :columns="columns" :data="rows" :loading="loading" :row-key="(r: AuditEntry) => r.id" size="small" />
    <div v-if="hasMore" class="mt-4 text-center">
      <NButton :loading="loading" @click="load(true)">Load more</NButton>
    </div>
  </div>
</template>
