<script setup lang="ts">
  import type { SystemSetting } from '@/api/types'
  import { useMessage } from 'naive-ui'
  import { useSettingsApi } from '@/api/settings'

  const message = useMessage()
  const api = useSettingsApi()

  const settings = ref<SystemSetting[]>([])
  const loading = ref(true)
  const saving = ref<string | null>(null)

  // Known settings definition — drives the UI
  const knownSettings = [
    {
      key: 'default_cache_ttl',
      label: 'Default Cache TTL',
      description: 'Default prompt cache TTL for Bedrock requests. Applies to all keys unless overridden per-key.',
      type: 'select' as const,
      options: [
        { label: 'Disabled', value: '' },
        { label: '5 minutes', value: '5m' },
        { label: '1 hour', value: '1h' }
      ]
    },
    {
      key: 'enable_tool_use',
      label: 'Enable Tool Use',
      description: 'Enable tool use / function calling support.',
      type: 'bool' as const
    },
    {
      key: 'enable_ptc',
      label: 'Enable PTC',
      description: 'Enable Programmatic Tool Calling (PTC) sandbox execution.',
      type: 'bool' as const
    },
    {
      key: 'enable_extended_thinking',
      label: 'Enable Extended Thinking',
      description: 'Enable extended thinking (Claude budget_tokens support).',
      type: 'bool' as const
    },
    {
      key: 'enable_document_support',
      label: 'Enable Document Support',
      description: 'Enable document content blocks in requests.',
      type: 'bool' as const
    },
    {
      key: 'prompt_caching_enabled',
      label: 'Prompt Caching',
      description: 'Enable prompt caching headers in Bedrock/Anthropic requests.',
      type: 'bool' as const
    },
    {
      key: 'rate_limit_enabled',
      label: 'Rate Limiting',
      description: 'Enable per-key request rate limiting (RPM).',
      type: 'bool' as const
    }
  ]

  const values = ref<Record<string, string>>({})

  async function load() {
    loading.value = true
    try {
      const res = await api.list()
      settings.value = res.data
      for (const s of res.data) {
        values.value[s.key] = s.value
      }
      // Fill defaults for keys not yet in DB
      for (const k of knownSettings) {
        if (!(k.key in values.value)) {
          values.value[k.key] = k.type === 'bool' ? 'false' : ''
        }
      }
    } catch (e: any) {
      message.error(e.message)
    } finally {
      loading.value = false
    }
  }

  function getBool(key: string) {
    return values.value[key] === 'true'
  }

  async function saveBool(key: string, description: string, val: boolean) {
    values.value[key] = val ? 'true' : 'false'
    await saveKey(key, description)
  }

  async function saveKey(key: string, description: string) {
    saving.value = key
    try {
      await api.upsert(key, { value: values.value[key] ?? '', description })
      message.success('Saved')
    } catch (e: any) {
      message.error(e.message)
      await load() // revert on error
    } finally {
      saving.value = null
    }
  }

  onMounted(load)
</script>

<template>
  <div>
    <h1 class="text-xl font-semibold text-slate-100 mb-6">Settings</h1>

    <NSpin :show="loading">
      <div class="space-y-3 max-w-2xl">
        <NCard v-for="s in knownSettings" :key="s.key" size="small">
          <div class="flex items-center justify-between gap-4">
            <div class="min-w-0">
              <div class="text-sm font-medium text-slate-200">{{ s.label }}</div>
              <div class="text-xs text-slate-500 mt-0.5">{{ s.description }}</div>
            </div>

            <!-- Bool toggle -->
            <NSwitch
              v-if="s.type === 'bool'"
              :value="getBool(s.key)"
              :loading="saving === s.key"
              @update:value="(v: boolean) => saveBool(s.key, s.description, v)"
            />

            <!-- Select -->
            <NSelect
              v-else-if="s.type === 'select'"
              v-model:value="values[s.key]"
              :options="s.options"
              :loading="saving === s.key"
              style="width: 160px"
              @update:value="() => saveKey(s.key, s.description)"
            />
          </div>
        </NCard>
      </div>
    </NSpin>
  </div>
</template>
