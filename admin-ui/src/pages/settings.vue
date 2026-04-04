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
      key: 'prompt_cache',
      label: 'Prompt Cache',
      description:
        'Prompt caching behavior for Bedrock (Claude) requests. Disable: strip all cache_control. Passthrough: preserve as-is. 5m/1h: override TTL on all cache_control blocks. Takes effect on restart.',
      type: 'select' as const,
      options: [
        { label: 'Passthrough (default)', value: 'passthrough' },
        { label: 'Disabled', value: 'disable' },
        { label: '5 minutes', value: '5m' },
        { label: '1 hour', value: '1h' }
      ]
    },
    {
      key: 'rate_limit',
      label: 'Rate Limit',
      description:
        'Default rate limit for API keys (requests per minute). Disable turns off rate limiting globally — per-key limits are also ignored. Takes effect on restart.',
      type: 'select' as const,
      options: [
        { label: 'Disabled', value: 'disable' },
        { label: '60 RPM', value: '60' },
        { label: '100 RPM (default)', value: '100' },
        { label: '200 RPM', value: '200' },
        { label: '500 RPM', value: '500' }
      ]
    },
    {
      key: 'enable_tool_use',
      label: 'Enable Tool Use',
      description: 'Global policy: enable tool use / function calling support. Takes effect on restart.',
      type: 'bool' as const
    },
    {
      key: 'enable_ptc',
      label: 'Enable PTC',
      description: 'Global policy: enable Programmatic Tool Calling (PTC) sandbox execution. Takes effect on restart.',
      type: 'bool' as const
    },
    {
      key: 'enable_extended_thinking',
      label: 'Enable Extended Thinking',
      description: 'Global policy: enable extended thinking (Claude budget_tokens support). Takes effect on restart.',
      type: 'bool' as const
    },
    {
      key: 'enable_document_support',
      label: 'Enable Document Support',
      description: 'Global policy: enable document content blocks in requests. Takes effect on restart.',
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
      <div class="space-y-3 max-w-full">
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
              style="width: 200px"
              @update:value="() => saveKey(s.key, s.description)"
            />
          </div>
        </NCard>
      </div>
    </NSpin>
  </div>
</template>
