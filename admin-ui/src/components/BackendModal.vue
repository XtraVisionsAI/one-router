<script setup lang="ts">
import { h } from 'vue'
import { useMessage, NCode } from 'naive-ui'
import { useBackendsApi } from '@/api/backends'
import type { BackendSummary, UpsertBackendBody } from '@/api/types'

const props = defineProps<{
  show: boolean
  existing?: BackendSummary
}>()

const emit = defineEmits<{
  (e: 'update:show', val: boolean): void
  (e: 'saved'): void
}>()

const message = useMessage()
const api = useBackendsApi()

const isEdit = computed(() => !!props.existing)
const title = computed(() => isEdit.value ? `Edit Backend: ${props.existing!.name}` : 'Add Backend')

const form = ref({ name: '', backend_type: 'gemini', priority: 0 })
const configJson = ref('')
const configStatus = ref<'idle' | 'valid' | 'invalid'>('idle')
const configError = ref('')
const showDecrypted = ref(false)
const loadingConfig = ref(false)
const saving = ref(false)

watch(() => props.show, (val) => {
  if (val) {
    form.value = {
      name: props.existing?.name ?? '',
      backend_type: props.existing?.backend_type ?? 'gemini',
      priority: props.existing?.priority ?? 0,
    }
    configJson.value = ''
    configStatus.value = 'idle'
    configError.value = ''
    showDecrypted.value = false
  }
})

function validateJson(val: string) {
  if (!val.trim()) { configStatus.value = 'idle'; configError.value = ''; return }
  try {
    JSON.parse(val)
    configStatus.value = 'valid'
    configError.value = ''
  } catch (e: any) {
    configStatus.value = 'invalid'
    configError.value = e.message
  }
}

function onConfigInput(val: string) {
  configJson.value = val
  validateJson(val)
}

function onConfigBlur() {
  if (!configJson.value.trim()) return
  try {
    configJson.value = JSON.stringify(JSON.parse(configJson.value), null, 2)
    configStatus.value = 'valid'
  } catch { /* keep as-is */ }
}

async function toggleDecrypted() {
  if (showDecrypted.value) {
    showDecrypted.value = false
    configJson.value = ''
    configStatus.value = 'idle'
    return
  }
  loadingConfig.value = true
  try {
    const res = await api.getConfig(props.existing!.name)
    configJson.value = JSON.stringify(res.config, null, 2)
    configStatus.value = 'valid'
    showDecrypted.value = true
  } catch (e: any) {
    message.error(`Failed to load config: ${e.message}`)
  } finally {
    loadingConfig.value = false
  }
}

async function save() {
  if (!form.value.name) { message.error('Name is required'); return }
  if (!isEdit.value && !configJson.value.trim()) { message.error('Config JSON is required'); return }
  if (configJson.value.trim() && configStatus.value === 'invalid') { message.error('Invalid JSON in config field'); return }

  let config: Record<string, unknown> | undefined
  if (configJson.value.trim()) {
    config = JSON.parse(configJson.value)
  }

  const body: UpsertBackendBody = {
    name: form.value.name,
    backend_type: form.value.backend_type,
    priority: form.value.priority,
    enabled: props.existing?.enabled ?? true,
    ...(config !== undefined ? { config } : {}),
  }

  saving.value = true
  try {
    if (isEdit.value) {
      await api.update(props.existing!.name, body)
    } else {
      await api.create(body)
    }
    message.success(isEdit.value ? 'Backend updated' : 'Backend created')
    emit('update:show', false)
    emit('saved')
  } catch (e: any) {
    message.error(e.message)
  } finally {
    saving.value = false
  }
}

const configSummaryText = computed(() => {
  if (!props.existing?.config_summary) return ''
  return JSON.stringify(props.existing.config_summary, null, 2)
})
</script>

<template>
  <NModal
    :show="show"
    :title="title"
    preset="card"
    style="width: 520px"
    @update:show="emit('update:show', $event)"
  >
    <NFormItem v-if="!isEdit" label="Name" required>
      <NInput v-model:value="form.name" placeholder="e.g. gemini-prod" />
    </NFormItem>

    <div class="flex gap-4">
      <NFormItem label="Type" class="flex-1" required>
        <NSelect
          v-model:value="form.backend_type"
          :options="['gemini','anthropic','openai','bedrock'].map(t => ({ label: t, value: t }))"
        />
      </NFormItem>
      <NFormItem label="Priority" class="w-28">
        <NInputNumber v-model:value="form.priority" :min="-999" :max="999" />
      </NFormItem>
    </div>

    <NFormItem :label="isEdit ? 'Config' : 'Config JSON'" :required="!isEdit">
      <template v-if="isEdit">
        <div class="w-full">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs text-slate-400">
              {{ showDecrypted ? 'Decrypted config (editable)' : 'Current config summary' }}
            </span>
            <NButton size="tiny" :loading="loadingConfig" @click="toggleDecrypted">
              <template #icon>
                <span :class="showDecrypted ? 'i-carbon-view-off' : 'i-carbon-view'" />
              </template>
              {{ showDecrypted ? 'Hide' : 'View / Edit Config' }}
            </NButton>
          </div>
          <NCode v-if="!showDecrypted" :code="configSummaryText" language="json" class="text-xs" />
          <NInput
            v-else
            :value="configJson"
            type="textarea"
            :rows="8"
            placeholder="Leave empty to keep existing config"
            :status="configStatus === 'invalid' ? 'error' : configStatus === 'valid' ? 'success' : undefined"
            @input="onConfigInput"
            @blur="onConfigBlur"
          />
          <div v-if="configStatus === 'invalid'" class="text-xs text-red-400 mt-1">✗ {{ configError }}</div>
          <div v-else-if="configStatus === 'valid' && showDecrypted" class="text-xs text-green-400 mt-1">✓ Valid JSON</div>
          <p class="text-xs text-slate-500 mt-1">Leave empty to keep existing config.</p>
        </div>
      </template>
      <template v-else>
        <div class="w-full">
          <NInput
            :value="configJson"
            type="textarea"
            :rows="6"
            placeholder='{"api_keys":["AIza..."]}'
            :status="configStatus === 'invalid' ? 'error' : configStatus === 'valid' ? 'success' : undefined"
            @input="onConfigInput"
            @blur="onConfigBlur"
          />
          <div v-if="configStatus === 'invalid'" class="text-xs text-red-400 mt-1">✗ {{ configError }}</div>
          <div v-else-if="configStatus === 'valid'" class="text-xs text-green-400 mt-1">✓ Valid JSON</div>
          <p class="text-xs text-slate-500 mt-1">
            Credentials are encrypted before storage.<br>
            Gemini/Anthropic/OpenAI: <code>{"api_keys":["key1"]}</code><br>
            Bedrock: <code>{"region":"us-east-1"}</code>
          </p>
        </div>
      </template>
    </NFormItem>

    <template #footer>
      <div class="flex justify-end gap-2">
        <NButton @click="emit('update:show', false)">Cancel</NButton>
        <NButton type="primary" :loading="saving" @click="save">
          {{ isEdit ? 'Save' : 'Create' }}
        </NButton>
      </div>
    </template>
  </NModal>
</template>
