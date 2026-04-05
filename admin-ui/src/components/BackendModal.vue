<script setup lang="ts">
  import type { BackendSummary, UpsertBackendBody } from '@/api/types'
  import { useMessage } from 'naive-ui'
  import { useBackendsApi } from '@/api/backends'

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
  const title = computed(() => (isEdit.value ? `Edit Backend: ${props.existing!.name}` : 'Add Backend'))

  const form = ref({ name: '', backend_type: 'bedrock', priority: 0 })
  const saving = ref(false)
  const loadingConfig = ref(false)
  const configLoaded = ref(false)

  // ── Bedrock fields ──
  const bedrock = ref({
    region: 'us-east-1',
    profile: '',
    access_key_id: '',
    secret_access_key: '',
    session_token: '',
    weight: 1
  })

  // ── API-key based fields (Gemini / Anthropic / OpenAI) ──
  const apiKeyConfig = ref({
    api_keys_text: '',
    base_url: '',
    organization: '',
    timeout_seconds: 120
  })

  // ── Shared pool settings ──
  const pool = ref({
    strategy: 'round_robin' as string,
    max_failures: 3,
    retry_after_secs: 300
  })

  const strategyOptions = [
    { label: 'Round Robin', value: 'round_robin' },
    { label: 'Weighted', value: 'weighted' },
    { label: 'Random', value: 'random' },
    { label: 'Failover', value: 'failover' }
  ]

  const backendTypeOptions = ['bedrock', 'gemini', 'anthropic', 'openai'].map((t) => ({
    label: t.charAt(0).toUpperCase() + t.slice(1),
    value: t
  }))

  watch(
    () => props.show,
    (val) => {
      if (val) {
        form.value = {
          name: props.existing?.name ?? '',
          backend_type: props.existing?.backend_type ?? 'bedrock',
          priority: props.existing?.priority ?? 0
        }
        resetConfigFields()
        // Pool settings are stored as separate DB fields (not encrypted),
        // so we can populate them directly from the existing record.
        if (props.existing) {
          pool.value = {
            strategy: props.existing.strategy || 'round_robin',
            max_failures: props.existing.max_failures ?? 3,
            retry_after_secs: props.existing.retry_after_secs ?? 300
          }
        }
        configLoaded.value = false
      }
    }
  )

  function resetConfigFields() {
    bedrock.value = {
      region: 'us-east-1',
      profile: '',
      access_key_id: '',
      secret_access_key: '',
      session_token: '',
      weight: 1
    }
    apiKeyConfig.value = {
      api_keys_text: '',
      base_url: '',
      organization: '',
      timeout_seconds: 120
    }
    pool.value = {
      strategy: 'round_robin',
      max_failures: 3,
      retry_after_secs: 300
    }
  }

  function populateFromConfig(cfg: Record<string, unknown>) {
    // Pool settings are loaded from record fields (not from config JSON)

    if (form.value.backend_type === 'bedrock') {
      bedrock.value.region = (cfg.region as string) ?? 'us-east-1'
      bedrock.value.profile = (cfg.profile as string) ?? ''
      bedrock.value.access_key_id = (cfg.access_key_id as string) ?? ''
      bedrock.value.secret_access_key = (cfg.secret_access_key as string) ?? ''
      bedrock.value.session_token = (cfg.session_token as string) ?? ''
      bedrock.value.weight = (cfg.weight as number) ?? 1
    } else {
      const keys = cfg.api_keys as string[] | undefined
      apiKeyConfig.value.api_keys_text = keys?.join('\n') ?? ''
      apiKeyConfig.value.base_url = (cfg.base_url as string) ?? ''
      apiKeyConfig.value.organization = (cfg.organization as string) ?? ''
      apiKeyConfig.value.timeout_seconds = (cfg.timeout_seconds as number) ?? 120
    }
  }

  async function loadExistingConfig() {
    if (!isEdit.value || configLoaded.value) return
    loadingConfig.value = true
    try {
      const res = await api.getConfig(props.existing!.name)
      populateFromConfig(res.config)
      configLoaded.value = true
    } catch (e: any) {
      message.error(`Failed to load config: ${e.message}`)
    } finally {
      loadingConfig.value = false
    }
  }

  function buildConfigJson(): Record<string, unknown> {
    const cfg: Record<string, unknown> = {}

    if (form.value.backend_type === 'bedrock') {
      cfg.region = bedrock.value.region
      if (bedrock.value.profile) cfg.profile = bedrock.value.profile
      if (bedrock.value.access_key_id) cfg.access_key_id = bedrock.value.access_key_id
      if (bedrock.value.secret_access_key) cfg.secret_access_key = bedrock.value.secret_access_key
      if (bedrock.value.session_token) cfg.session_token = bedrock.value.session_token
      cfg.weight = bedrock.value.weight
    } else {
      const keys = apiKeyConfig.value.api_keys_text
        .split('\n')
        .map((k) => k.trim())
        .filter(Boolean)
      cfg.api_keys = keys
      if (apiKeyConfig.value.base_url) cfg.base_url = apiKeyConfig.value.base_url
      if (form.value.backend_type === 'openai' && apiKeyConfig.value.organization) {
        cfg.organization = apiKeyConfig.value.organization
      }
      cfg.timeout_seconds = apiKeyConfig.value.timeout_seconds
    }

    return cfg
  }

  async function save() {
    if (!form.value.name) {
      message.error('Name is required')
      return
    }
    if (form.value.backend_type !== 'bedrock' && !apiKeyConfig.value.api_keys_text.trim()) {
      if (!isEdit.value || configLoaded.value) {
        message.error('At least one API key is required')
        return
      }
    }

    const body: UpsertBackendBody = {
      name: form.value.name,
      backend_type: form.value.backend_type,
      priority: form.value.priority,
      enabled: props.existing?.enabled ?? true,
      strategy: pool.value.strategy,
      max_failures: pool.value.max_failures,
      retry_after_secs: pool.value.retry_after_secs,
    }

    // Only include config if we have loaded/entered it
    if (!isEdit.value || configLoaded.value) {
      body.config = buildConfigJson()
    }

    saving.value = true
    try {
      if (isEdit.value) {
        await api.update(props.existing!.name, body)
      } else {
        await api.create(body)
      }
      message.success(isEdit.value ? 'Backend updated — restart required' : 'Backend created — restart required')
      emit('update:show', false)
      emit('saved')
    } catch (e: any) {
      message.error(e.message)
    } finally {
      saving.value = false
    }
  }
</script>

<template>
  <NModal :show="show" :title="title" preset="card" style="width: 560px" @update:show="emit('update:show', $event)">
    <!-- Name & Type -->
    <NFormItem v-if="!isEdit" label="Name" required>
      <NInput v-model:value="form.name" placeholder="e.g. bedrock-prod" />
    </NFormItem>

    <div class="flex gap-4">
      <NFormItem label="Type" class="flex-1" required>
        <NSelect v-model:value="form.backend_type" :options="backendTypeOptions" :disabled="isEdit" />
      </NFormItem>
      <NFormItem label="Priority" class="w-28">
        <NInputNumber v-model:value="form.priority" :min="-999" :max="999" />
      </NFormItem>
    </div>

    <!-- Load existing config button (edit mode) -->
    <div v-if="isEdit && !configLoaded" class="mb-4">
      <NButton size="small" :loading="loadingConfig" @click="loadExistingConfig">
        Load Current Config for Editing
      </NButton>
      <p class="text-xs text-slate-500 mt-1">Config is encrypted. Click to decrypt and edit.</p>
    </div>

    <!-- Bedrock config -->
    <template v-if="form.backend_type === 'bedrock' && (!isEdit || configLoaded)">
      <NDivider title-placement="left"><span class="text-xs text-slate-500">AWS Credentials</span></NDivider>

      <NFormItem label="Region">
        <NInput v-model:value="bedrock.region" placeholder="us-east-1" />
      </NFormItem>

      <NFormItem label="Profile">
        <NInput v-model:value="bedrock.profile" placeholder="(optional) AWS named profile" />
      </NFormItem>

      <NFormItem label="Access Key ID">
        <NInput v-model:value="bedrock.access_key_id" placeholder="(optional) AKIA..." />
      </NFormItem>

      <NFormItem label="Secret Access Key">
        <NInput
          v-model:value="bedrock.secret_access_key"
          type="password"
          show-password-on="click"
          placeholder="(optional)"
        />
      </NFormItem>

      <NFormItem label="Session Token">
        <NInput v-model:value="bedrock.session_token" placeholder="(optional) temporary credentials" />
      </NFormItem>

      <NFormItem label="Weight">
        <NInputNumber v-model:value="bedrock.weight" :min="0" :max="100" />
      </NFormItem>
    </template>

    <!-- API-key based config (Gemini / Anthropic / OpenAI) -->
    <template v-if="form.backend_type !== 'bedrock' && (!isEdit || configLoaded)">
      <NDivider title-placement="left"><span class="text-xs text-slate-500">Credentials</span></NDivider>

      <NFormItem label="API Keys" required>
        <NInput
          v-model:value="apiKeyConfig.api_keys_text"
          type="textarea"
          :rows="3"
          placeholder="One key per line"
        />
      </NFormItem>

      <NFormItem label="Base URL">
        <NInput v-model:value="apiKeyConfig.base_url" placeholder="(optional) override default endpoint" />
      </NFormItem>

      <NFormItem v-if="form.backend_type === 'openai'" label="Organization">
        <NInput v-model:value="apiKeyConfig.organization" placeholder="(optional) org-..." />
      </NFormItem>

      <NFormItem label="Timeout (seconds)">
        <NInputNumber v-model:value="apiKeyConfig.timeout_seconds" :min="10" :max="600" />
      </NFormItem>
    </template>

    <!-- Pool settings (always editable — stored as plain DB fields, not encrypted) -->
    <NDivider title-placement="left"><span class="text-xs text-slate-500">Pool Settings</span></NDivider>

    <div class="flex gap-4">
      <NFormItem label="Strategy" class="flex-1">
        <NSelect v-model:value="pool.strategy" :options="strategyOptions" />
      </NFormItem>
      <NFormItem label="Max Failures" class="w-28">
        <NInputNumber v-model:value="pool.max_failures" :min="1" :max="100" />
      </NFormItem>
      <NFormItem label="Retry After (s)" class="w-32">
        <NInputNumber v-model:value="pool.retry_after_secs" :min="0" :max="3600" />
      </NFormItem>
    </div>

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
