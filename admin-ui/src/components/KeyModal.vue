<script setup lang="ts">
import { useMessage } from 'naive-ui'
import { useKeysApi } from '@/api/keys'
import type { ApiKey, CreateKeyBody, UpdateKeyBody } from '@/api/types'

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
const title = computed(() => isEdit.value ? 'Edit API Key' : 'Create API Key')

const form = ref({
  name: '',
  user_id: '',
  rate_limit: 100,
  monthly_budget: null as number | null,
  service_tier: 'default',
})
const saving = ref(false)

watch(() => props.show, (val) => {
  if (val) {
    form.value = {
      name: props.existing?.name ?? '',
      user_id: props.existing?.user_id ?? '',
      rate_limit: props.existing?.rate_limit ?? 100,
      monthly_budget: props.existing?.monthly_budget ?? null,
      service_tier: props.existing?.service_tier ?? 'default',
    }
  }
})

async function save() {
  if (!form.value.name.trim()) { message.error('Name is required'); return }
  if (!isEdit.value && !form.value.user_id.trim()) { message.error('User ID is required'); return }

  saving.value = true
  try {
    if (isEdit.value) {
      const body: UpdateKeyBody = {
        name: form.value.name,
        rate_limit: form.value.rate_limit,
        monthly_budget: form.value.monthly_budget,
        service_tier: form.value.service_tier,
      }
      await api.update(props.existing!.api_key, body)
      message.success('Key updated')
      emit('update:show', false)
      emit('saved')
    } else {
      const body: CreateKeyBody = {
        name: form.value.name,
        user_id: form.value.user_id,
        rate_limit: form.value.rate_limit,
        monthly_budget: form.value.monthly_budget,
        service_tier: form.value.service_tier,
      }
      const result = await api.create(body)
      message.success('Key created')
      emit('update:show', false)
      emit('saved', result.api_key)
    }
  } catch (e: any) {
    message.error(e.message)
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <NModal
    :show="show"
    :title="title"
    preset="card"
    style="width: 480px"
    @update:show="emit('update:show', $event)"
  >
    <div class="space-y-1">
      <NFormItem v-if="isEdit" label="Key">
        <div style="font-family:monospace; font-size:12px; color:#94a3b8; padding:6px 0; word-break:break-all">
          {{ existing!.api_key }}
        </div>
      </NFormItem>

      <NFormItem label="Name" required>
        <NInput v-model:value="form.name" placeholder="e.g. Production App" />
      </NFormItem>

      <NFormItem v-if="!isEdit" label="User ID" required>
        <NInput v-model:value="form.user_id" placeholder="e.g. user_001" />
      </NFormItem>

      <div class="flex gap-4">
        <NFormItem label="Rate Limit (rpm)" class="flex-1">
          <NInputNumber v-model:value="form.rate_limit" :min="0" class="w-full" />
        </NFormItem>
        <NFormItem label="Monthly Budget ($)" class="flex-1">
          <NInputNumber
            v-model:value="form.monthly_budget"
            :min="0"
            :precision="2"
            placeholder="unlimited"
            class="w-full"
          />
        </NFormItem>
      </div>

      <NFormItem label="Service Tier">
        <NInput v-model:value="form.service_tier" />
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
