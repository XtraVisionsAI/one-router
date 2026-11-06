<script setup lang="ts">
  import type { User, UserBody } from '@/api/types'
  import { useMessage } from 'naive-ui'
  import { useUsersApi } from '@/api/users'

  const props = defineProps<{
    show: boolean
    existing?: User
  }>()

  const emit = defineEmits<{
    (e: 'update:show', val: boolean): void
    (e: 'saved'): void
  }>()

  const message = useMessage()
  const api = useUsersApi()

  const isEdit = computed(() => !!props.existing)
  const title = computed(() => (isEdit.value ? 'Edit User' : 'Create User'))

  const cacheTtlOptions = [
    { label: 'Default (no override)', value: null },
    { label: '5 minutes', value: '5m' },
    { label: '1 hour', value: '1h' }
  ]

  const blank = () => ({
    name: '',
    email: '',
    cost_rate: 1.0,
    monthly_budget: null as number | null,
    rate_limit: null as number | null,
    tpm_limit: null as number | null,
    allowed_models: [] as string[],
    cache_ttl: null as string | null,
    metadata: ''
  })
  const form = ref(blank())
  const saving = ref(false)

  watch(
    () => props.show,
    (val) => {
      if (!val) return
      const u = props.existing
      form.value = u
        ? {
            name: u.name,
            email: u.email ?? '',
            cost_rate: u.cost_rate,
            monthly_budget: u.monthly_budget,
            rate_limit: u.rate_limit,
            tpm_limit: u.tpm_limit,
            allowed_models: [...(u.allowed_models ?? [])],
            cache_ttl: u.cache_ttl,
            metadata: u.metadata ? JSON.stringify(u.metadata, null, 2) : ''
          }
        : blank()
    }
  )

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
    const metadata = parseMetadata()
    if (metadata === undefined) {
      message.error('Metadata must be a JSON object, e.g. {"team": "infra"}')
      return
    }
    const body: UserBody = {
      name: form.value.name.trim(),
      email: form.value.email.trim() || null,
      cost_rate: form.value.cost_rate,
      monthly_budget: form.value.monthly_budget,
      rate_limit: form.value.rate_limit || null,
      tpm_limit: form.value.tpm_limit || null,
      allowed_models: form.value.allowed_models.length ? form.value.allowed_models : null,
      cache_ttl: form.value.cache_ttl,
      metadata
    }
    saving.value = true
    try {
      if (isEdit.value) await api.update(props.existing!.user_id, body)
      else await api.create(body as UserBody & { name: string })
      message.success(isEdit.value ? 'User updated' : 'User created')
      emit('update:show', false)
      emit('saved')
    } catch (e: any) {
      message.error(e.status === 409 ? 'A user with this name already exists' : e.message)
    } finally {
      saving.value = false
    }
  }
</script>

<template>
  <NModal :show="show" :title="title" preset="card" style="width: 520px" @update:show="emit('update:show', $event)">
    <div class="space-y-1">
      <div class="flex gap-4">
        <NFormItem label="Name" required class="flex-1">
          <NInput v-model:value="form.name" placeholder="e.g. alice" />
        </NFormItem>
        <NFormItem label="Email" class="flex-1">
          <NInput v-model:value="form.email" placeholder="optional" />
        </NFormItem>
      </div>

      <div class="flex gap-4">
        <NFormItem label="Monthly Budget ($)" class="flex-1">
          <NInputNumber v-model:value="form.monthly_budget" :min="0" :precision="2" placeholder="unlimited" class="w-full" />
        </NFormItem>
        <NFormItem label="Cost Rate" class="flex-1">
          <NInputNumber v-model:value="form.cost_rate" :min="0" :step="0.1" :precision="2" class="w-full" />
        </NFormItem>
      </div>

      <div class="flex gap-4">
        <NFormItem label="Rate Limit (rpm, all keys)" class="flex-1">
          <NInputNumber v-model:value="form.rate_limit" :min="1" placeholder="global default" class="w-full" />
        </NFormItem>
        <NFormItem label="TPM Limit (all keys)" class="flex-1">
          <NInputNumber v-model:value="form.tpm_limit" :min="1" placeholder="unlimited" class="w-full" />
        </NFormItem>
      </div>

      <NFormItem label="Allowed Models (glob, !exclude — empty = all)">
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
          placeholder='{"team": "infra"}'
          style="font-family: monospace; font-size: 12px"
        />
      </NFormItem>
    </div>

    <template #footer>
      <div class="flex justify-end gap-2">
        <NButton @click="emit('update:show', false)">Cancel</NButton>
        <NButton type="primary" :loading="saving" @click="save">{{ isEdit ? 'Save' : 'Create' }}</NButton>
      </div>
    </template>
  </NModal>
</template>
