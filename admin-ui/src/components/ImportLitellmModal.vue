<script setup lang="ts">
  import type { DataTableColumns, DataTableRowKey } from 'naive-ui'
  import type { ImportCandidate } from '@/api/pricing'
  import { NTag, useMessage } from 'naive-ui'
  import { h } from 'vue'
  import { usePricingApi } from '@/api/pricing'

  const props = defineProps<{ show: boolean }>()

  const emit = defineEmits<{
    (e: 'update:show', val: boolean): void
    (e: 'saved'): void
  }>()

  const message = useMessage()
  const api = usePricingApi()

  const provider = ref('bedrock')
  const query = ref('')
  const loading = ref(false)
  const importing = ref(false)
  const candidates = ref<ImportCandidate[]>([])
  const checkedKeys = ref<DataTableRowKey[]>([])

  let searchTimer: ReturnType<typeof setTimeout> | undefined

  async function search() {
    loading.value = true
    try {
      const res = await api.models(provider.value, query.value.trim())
      candidates.value = res.data
      // Drop selections that fell out of the new result set
      const keys = new Set(res.data.map((c) => c.key))
      checkedKeys.value = checkedKeys.value.filter((k) => keys.has(String(k)))
    } catch (e: any) {
      message.error(e.message)
    } finally {
      loading.value = false
    }
  }

  function debouncedSearch() {
    clearTimeout(searchTimer)
    searchTimer = setTimeout(search, 350)
  }

  watch(
    () => props.show,
    (val) => {
      if (val) {
        checkedKeys.value = []
        search()
      }
    }
  )
  watch(provider, () => {
    checkedKeys.value = []
    search()
  })

  async function doImport() {
    if (!checkedKeys.value.length) return
    importing.value = true
    try {
      const items = checkedKeys.value.map((k) => ({ key: String(k) }))
      const summary = await api.import(provider.value, items)
      const parts = [`${summary.created.length} created`]
      if (summary.skipped_existing.length) parts.push(`${summary.skipped_existing.length} already existed`)
      if (summary.not_found.length) parts.push(`${summary.not_found.length} not found`)
      message.success(`Import finished: ${parts.join(' · ')}`)
      emit('saved')
      emit('update:show', false)
    } catch (e: any) {
      message.error(e.message)
    } finally {
      importing.value = false
    }
  }

  function fmtPrice(v: number | null) {
    if (v === null) return '—'
    return `$${v}`
  }

  const columns = computed<DataTableColumns<ImportCandidate>>(() => [
    { type: 'selection', disabled: (row: ImportCandidate) => row.exists },
    {
      title: 'LiteLLM Model',
      key: 'key',
      ellipsis: { tooltip: true },
      render: (row) =>
        h('div', [
          h('div', { class: 'font-mono text-xs text-slate-200' }, row.key),
          h(
            'div',
            { class: 'font-mono text-[11px] text-slate-500' },
            `→ ${row.suggested_source_id}${row.exists ? ' (already mapped)' : ''}`
          )
        ])
    },
    {
      title: 'Mode',
      key: 'mode',
      width: 100,
      render: (row) => h(NTag, { size: 'small' }, { default: () => row.mode })
    },
    {
      title: 'Price in/out (1M)',
      key: 'price',
      width: 140,
      render: (row) =>
        h(
          'span',
          { class: 'font-mono text-[11px] text-slate-400 whitespace-nowrap' },
          `${fmtPrice(row.input_price)} / ${fmtPrice(row.output_price)}`
        )
    },
    {
      title: 'Capabilities',
      key: 'caps',
      width: 110,
      render: (row) =>
        h('div', { class: 'flex gap-1' }, [
          ...(row.supports_function_calling
            ? [h(NTag, { size: 'tiny', type: 'info' }, { default: () => 'tools' })]
            : []),
          ...(row.supports_reasoning
            ? [h(NTag, { size: 'tiny', type: 'warning' }, { default: () => 'thinking' })]
            : [])
        ])
    }
  ])
</script>

<template>
  <NModal
    :show="show"
    title="Import Models from LiteLLM"
    preset="card"
    style="width: 760px"
    @update:show="emit('update:show', $event)"
  >
    <div class="flex gap-3 mb-3">
      <NSelect
        v-model:value="provider"
        style="width: 140px"
        :options="['bedrock', 'gemini', 'anthropic', 'openai'].map((p) => ({ label: p, value: p }))"
      />
      <NInput
        v-model:value="query"
        placeholder="Search model id… (e.g. gpt, claude, nova)"
        clearable
        @input="debouncedSearch"
      />
    </div>

    <p class="text-xs text-slate-500 mb-2">
      Source model id defaults to a friendly alias (vendor prefix and version suffix stripped); prices and
      capabilities are prefilled from the table and stay auto-synced. Edit the mapping after import to adjust.
    </p>

    <NDataTable
      :columns="columns"
      :data="candidates"
      :loading="loading"
      :row-key="(row: ImportCandidate) => row.key"
      v-model:checked-row-keys="checkedKeys"
      :pagination="{ pageSize: 10 }"
      size="small"
      max-height="380"
    />

    <template #footer>
      <div class="flex justify-between items-center">
        <span class="text-xs text-slate-500">{{ checkedKeys.length }} selected</span>
        <div class="flex gap-2">
          <NButton @click="emit('update:show', false)">Cancel</NButton>
          <NButton type="primary" :loading="importing" :disabled="!checkedKeys.length" @click="doImport">
            Import {{ checkedKeys.length || '' }}
          </NButton>
        </div>
      </div>
    </template>
  </NModal>
</template>
