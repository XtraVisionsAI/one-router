<script setup lang="ts">
  import type { ApiKey, CreateKeyBody, UpdateKeyBody, User } from '@/api/types'
  import { useMessage } from 'naive-ui'
  import { useKeysApi } from '@/api/keys'

  const props = defineProps<{
    show: boolean
    existing?: ApiKey
    users: User[]
    /** Preselected owner when creating. */
    defaultUserId?: string | null
  }>()

  const emit = defineEmits<{
    (e: 'update:show', val: boolean): void
    (e: 'saved', newKey?: string): void
  }>()

  const message = useMessage()
  const api = useKeysApi()

  const isEdit = computed(() => !!props.existing)
  const title = computed(() => (isEdit.value ? 'Edit API Key' : 'Create API Key'))

  const cacheTtlOptions = [
    { label: 'Inherit from user', value: null },
    { label: '5 minutes', value: '5m' },
    { label: '1 hour', value: '1h' }
  ]
  const userOptions = computed(() => props.users.map((u) => ({ label: u.name, value: u.user_id })))

  const blank = () => ({
    user_id: null as string | null,
    name: '',
    rate_limit: null as number | null,
    monthly_budget: null as number | null,
    tpm_limit: null as number | null,
    cache_ttl: null as string | null,
    expires_at: null as number | null, // ms for the date picker
    allowed_models: [] as string[],
    metadata: ''
  })
  const form = ref(blank())
  const saving = ref(false)

  watch(
    () => props.show,
    (val) => {
      if (!val) return
      const k = props.existing
      form.value = k
        ? {
            user_id: k.user_id,
            name: k.name,
            rate_limit: k.rate_limit,
            monthly_budget: k.monthly_budget,
            tpm_limit: k.tpm_limit,
            cache_ttl: k.cache_ttl,
            expires_at: k.expires_at ? k.expires_at * 1000 : null,
            allowed_models: [...(k.allowed_models ?? [])],
            metadata: k.metadata ? JSON.stringify(k.metadata, null, 2) : ''
          }
        : { ...blank(), user_id: props.defaultUserId ?? null }
    }
  )

  /** Parse the metadata textarea: empty → null, otherwise a JSON object. `undefined` = invalid. */
  function parseMetadata(): Record<string, unknown> | null | undefined {
    const raw = form.value.metadata.trim()
    if (!raw) return null
    try {
      const v = JSON.parse(raw)
      if (v && typeof v === 'object' && !Array.isArray(v)) return v
    } catch {}
    return undefined
  }

  async function save() {
    if (!form.value.name.trim()) {
      message.error('Name is required')
      return
    }
    if (!isEdit.value && !form.value.user_id) {
      message.error('Select the user that owns this key')
      return
    }
    const metadata = parseMetadata()
    if (metadata === undefined) {
      message.error('Metadata must be a JSON object, e.g. {"owner": "alice"}')
      return
    }
    const fields = {
      name: form.value.name.trim(),
      rate_limit: form.value.rate_limit || null,
      monthly_budget: form.value.monthly_budget,
      tpm_limit: form.value.tpm_limit || null,
      cache_ttl: form.value.cache_ttl,
      expires_at: form.value.expires_at ? Math.floor(form.value.expires_at / 1000) : null,
      allowed_models: form.value.allowed_models.length ? form.value.allowed_models : null,
      metadata
    }

    saving.value = true
    try {
      if (isEdit.value) {
        await api.update(props.existing!.key_id, fields as UpdateKeyBody)
        message.success('Key updated')
        emit('update:show', false)
        emit('saved')
      } else {
        const body: CreateKeyBody = { ...fields, user_id: form.value.user_id! }
        const result = await api.create(body)
        message.success('Key created')
        emit('update:show', false)
        emit('saved', result.api_key)
      }
    } catch (e: any) {
      message.error(e.status === 409 ? 'This user already has a key with this name' : e.message)
    } finally {
      saving.value = false
    }
  }
</script>

<template>
  <NModal :show="show" :title="title" preset="card" style="width: 520px" @update:show="emit('update:show', $event)">
    <div class="space-y-1">
      <NFormItem v-if="isEdit" label="Key">
        <div style="font-family: monospace; font-size: 12px; color: #94a3b8; padding: 6px 0; word-break: break-all">
          {{ existing!.api_key }} · {{ existing!.user_name ?? existing!.user_id }}
        </div>
      </NFormItem>

      <div class="flex gap-4">
        <NFormItem v-if="!isEdit" label="User" required class="flex-1">
          <NSelect v-model:value="form.user_id" :options="userOptions" filterable placeholder="Select owner" />
        </NFormItem>
        <NFormItem label="Name" required class="flex-1">
          <NInput v-model:value="form.name" placeholder="e.g. laptop, ci" />
        </NFormItem>
      </div>

      <div class="text-xs text-slate-400 mb-2">
        Key-level limits are optional and can only narrow the user's limits.
      </div>
      <div class="flex gap-4">
        <NFormItem label="Rate Limit (rpm)" class="flex-1">
          <NInputNumber v-model:value="form.rate_limit" :min="1" placeholder="user limit" class="w-full" />
        </NFormItem>
        <NFormItem label="TPM Limit" class="flex-1">
          <NInputNumber v-model:value="form.tpm_limit" :min="1" placeholder="user limit" class="w-full" />
        </NFormItem>
      </div>

      <div class="flex gap-4">
        <NFormItem label="Monthly Budget ($)" class="flex-1">
          <NInputNumber v-model:value="form.monthly_budget" :min="0" :precision="2" placeholder="user budget" class="w-full" />
        </NFormItem>
        <NFormItem label="Expires At" class="flex-1">
          <NDatePicker v-model:value="form.expires_at" type="datetime" clearable placeholder="never" class="w-full" />
        </NFormItem>
      </div>

      <NFormItem label="Allowed Models (glob, !exclude — empty = user's)">
        <NDynamicTags v-model:value="form.allowed_models" />
      </NFormItem>

      <NFormItem label="Cache TTL">
        <NSelect v-model:value="form.cache_ttl" :options="cacheTtlOptions" class="w-full" />
      </NFormItem>

      <NFormItem label="Metadata (JSON, optional)">
        <NInput
          v-model:value="form.metadata"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 6 }"
          placeholder='{"ticket": "T123"}'
          style="font-family: monospace; font-size: 12px"
        />
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
