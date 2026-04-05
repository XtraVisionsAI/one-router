<script setup lang="ts">
  import type { ApiKey, CreateKeyBody, UpdateKeyBody } from '@/api/types'
  import { useMessage } from 'naive-ui'
  import { useKeysApi } from '@/api/keys'

  const props = defineProps<{
    show: boolean
    existing?: ApiKey
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
    { label: 'Default (no override)', value: null },
    { label: '5 minutes', value: '5m' },
    { label: '1 hour', value: '1h' },
    { label: '24 hours', value: '24h' }
  ]

  const form = ref({
    name: '',
    rate_limit: 100,
    monthly_budget: null as number | null,
    tpm_limit: null as number | null,
    cache_ttl: null as string | null,
    cost_rate: 1.0
  })
  const saving = ref(false)

  watch(
    () => props.show,
    (val) => {
      if (val) {
        form.value = {
          name: props.existing?.name ?? '',
          rate_limit: props.existing?.rate_limit ?? 100,
          monthly_budget: props.existing?.monthly_budget ?? null,
          tpm_limit: props.existing?.tpm_limit ?? null,
          cache_ttl: props.existing?.cache_ttl ?? null,
          cost_rate: props.existing?.cost_rate ?? 1.0
        }
      }
    }
  )

  async function save() {
    if (!form.value.name.trim()) {
      message.error('Name is required')
      return
    }

    saving.value = true
    try {
      if (isEdit.value) {
        const body: UpdateKeyBody = {}
        if (form.value.name !== props.existing?.name) body.name = form.value.name
        if (form.value.rate_limit !== props.existing?.rate_limit) body.rate_limit = form.value.rate_limit
        if (form.value.monthly_budget !== props.existing?.monthly_budget)
          body.monthly_budget = form.value.monthly_budget
        if (form.value.tpm_limit !== props.existing?.tpm_limit) body.tpm_limit = form.value.tpm_limit
        if (form.value.cache_ttl !== props.existing?.cache_ttl) body.cache_ttl = form.value.cache_ttl
        if (form.value.cost_rate !== props.existing?.cost_rate) body.cost_rate = form.value.cost_rate
        await api.update(props.existing!.api_key, body)
        message.success('Key updated')
        emit('update:show', false)
        emit('saved')
      } else {
        const body: CreateKeyBody = {
          name: form.value.name,
          rate_limit: form.value.rate_limit,
          monthly_budget: form.value.monthly_budget,
          tpm_limit: form.value.tpm_limit,
          cache_ttl: form.value.cache_ttl,
          cost_rate: form.value.cost_rate
        }
        const result = await api.create(body)
        message.success('Key created')
        emit('update:show', false)
        emit('saved', result.api_key)
      }
    } catch (e: any) {
      if (e.status === 409) {
        message.error('A key with this name already exists')
      } else {
        message.error(e.message)
      }
    } finally {
      saving.value = false
    }
  }
</script>

<template>
  <NModal :show="show" :title="title" preset="card" style="width: 480px" @update:show="emit('update:show', $event)">
    <div class="space-y-1">
      <NFormItem v-if="isEdit" label="Key">
        <div style="font-family: monospace; font-size: 12px; color: #94a3b8; padding: 6px 0; word-break: break-all">
          {{ existing!.api_key }}
        </div>
      </NFormItem>

      <NFormItem label="Name" required>
        <NInput v-model:value="form.name" placeholder="e.g. Production App" />
      </NFormItem>

      <div class="flex gap-4">
        <NFormItem label="Rate Limit (rpm)" class="flex-1">
          <NInputNumber v-model:value="form.rate_limit" :min="0" class="w-full" />
        </NFormItem>
        <NFormItem label="TPM Limit" class="flex-1">
          <NInputNumber v-model:value="form.tpm_limit" :min="0" placeholder="unlimited" class="w-full" />
        </NFormItem>
      </div>

      <NFormItem label="Monthly Budget ($)">
        <NInputNumber
          v-model:value="form.monthly_budget"
          :min="0"
          :precision="2"
          placeholder="unlimited"
          class="w-full"
        />
      </NFormItem>

      <div class="flex gap-4">
        <NFormItem label="Cache TTL" class="flex-1">
          <NSelect v-model:value="form.cache_ttl" :options="cacheTtlOptions" class="w-full" />
        </NFormItem>
        <NFormItem label="Cost Rate" class="flex-1">
          <NInputNumber v-model:value="form.cost_rate" :min="0" :step="0.1" :precision="2" class="w-full" />
        </NFormItem>
      </div>
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
