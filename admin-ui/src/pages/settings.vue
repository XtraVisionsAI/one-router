<script setup lang="ts">
  import type { SystemSetting, UiSchema } from '@/api/types'
  import { useMessage } from 'naive-ui'
  import { useSettingsApi } from '@/api/settings'

  const message = useMessage()
  const api = useSettingsApi()

  const settings = ref<SystemSetting[]>([])
  const loading = ref(true)
  const saving = ref<string | null>(null)
  const values = ref<Record<string, string>>({})

  const MASK = '••••••••'

  function parseSchema(setting: SystemSetting): UiSchema {
    if (setting.ui_schema) {
      try {
        return JSON.parse(setting.ui_schema)
      } catch {
        /* fall through */
      }
    }
    return { type: 'text', label: setting.key }
  }

  const groupOrder = ['General', 'Capabilities', 'Web Tools', 'Other']

  const groupedSettings = computed(() => {
    const groups: Record<string, Array<{ setting: SystemSetting; schema: UiSchema }>> = {}

    for (const s of settings.value) {
      const schema = parseSchema(s)
      const group = schema.group || 'Other'
      if (!groups[group]) groups[group] = []
      groups[group].push({ setting: s, schema })
    }

    for (const items of Object.values(groups)) {
      items.sort((a, b) => (a.schema.sort_order ?? 999) - (b.schema.sort_order ?? 999))
    }

    return groupOrder
      .filter((g) => groups[g]?.length)
      .map((g) => ({ name: g, items: groups[g] }))
  })

  async function load() {
    loading.value = true
    try {
      const res = await api.list()
      settings.value = res.data
      for (const s of res.data) {
        values.value[s.key] = s.value
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
    const val = values.value[key] ?? ''
    if (val === MASK) return
    saving.value = key
    try {
      await api.upsert(key, { value: val, description })
      message.success('Saved')
    } catch (e: any) {
      message.error(e.message)
      await load()
    } finally {
      saving.value = null
    }
  }

  function getNumberValue(key: string): number | null {
    const v = values.value[key]
    if (!v || v === '') return null
    const n = Number(v)
    return isNaN(n) ? null : n
  }

  function setNumberValue(key: string, val: number | null) {
    values.value[key] = val != null ? String(val) : ''
  }

  onMounted(load)
</script>

<template>
  <div>
    <h1 class="text-xl font-semibold text-slate-100 mb-6">Settings</h1>

    <NSpin :show="loading">
      <div v-for="group in groupedSettings" :key="group.name" class="mb-6">
        <h2 class="text-xs font-medium text-slate-400 uppercase tracking-wider mb-3">
          {{ group.name }}
        </h2>
        <div class="space-y-3">
          <NCard v-for="{ setting, schema } in group.items" :key="setting.key" size="small">
            <div class="flex items-center justify-between gap-4">
              <div class="min-w-0">
                <div class="text-sm font-medium text-slate-200">{{ schema.label }}</div>
                <div class="text-xs text-slate-500 mt-0.5">{{ setting.description }}</div>
              </div>

              <!-- Bool toggle -->
              <NSwitch
                v-if="schema.type === 'bool'"
                :value="getBool(setting.key)"
                :loading="saving === setting.key"
                @update:value="(v: boolean) => saveBool(setting.key, setting.description, v)"
              />

              <!-- Select -->
              <NSelect
                v-else-if="schema.type === 'select'"
                v-model:value="values[setting.key]"
                :options="schema.options"
                :loading="saving === setting.key"
                style="width: 200px"
                @update:value="() => saveKey(setting.key, setting.description)"
              />

              <!-- Password / sensitive -->
              <NInput
                v-else-if="schema.type === 'password'"
                v-model:value="values[setting.key]"
                type="password"
                show-password-on="click"
                :placeholder="schema.placeholder || ''"
                style="width: 260px"
                @focus="() => { if (values[setting.key] === MASK) values[setting.key] = '' }"
                @blur="() => saveKey(setting.key, setting.description)"
              />

              <!-- Number -->
              <NInputNumber
                v-else-if="schema.type === 'number'"
                :value="getNumberValue(setting.key)"
                :placeholder="schema.placeholder || ''"
                :min="0"
                style="width: 160px"
                @update:value="(v: number | null) => setNumberValue(setting.key, v)"
                @blur="() => saveKey(setting.key, setting.description)"
              />

              <!-- Text fallback -->
              <NInput
                v-else
                v-model:value="values[setting.key]"
                :placeholder="schema.placeholder || ''"
                style="width: 260px"
                @blur="() => saveKey(setting.key, setting.description)"
              />
            </div>
          </NCard>
        </div>
      </div>
    </NSpin>
  </div>
</template>
