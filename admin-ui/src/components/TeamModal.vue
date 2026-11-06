<script setup lang="ts">
  import type { BudgetPeriod, Team, TeamBody } from '@/api/types'
  import { useMessage } from 'naive-ui'
  import { useTeamsApi } from '@/api/teams'

  const props = defineProps<{ show: boolean; existing?: Team }>()
  const emit = defineEmits<{
    (e: 'update:show', val: boolean): void
    (e: 'saved'): void
  }>()

  const message = useMessage()
  const api = useTeamsApi()
  const isEdit = computed(() => !!props.existing)

  const periodOptions = [
    { label: 'Monthly', value: 'monthly' },
    { label: 'Weekly (ISO, Mon)', value: 'weekly' },
    { label: 'Daily (UTC)', value: 'daily' }
  ]

  const blank = () => ({
    name: '',
    cost_rate: 1.0,
    monthly_budget: null as number | null,
    budget_period: 'monthly' as BudgetPeriod,
    rate_limit: null as number | null,
    tpm_limit: null as number | null,
    max_concurrency: null as number | null,
    allowed_models: [] as string[],
    allowed_cidrs: [] as string[]
  })
  const form = ref(blank())
  const saving = ref(false)

  watch(
    () => props.show,
    (val) => {
      if (!val) return
      const t = props.existing
      form.value = t
        ? {
            name: t.name,
            cost_rate: t.cost_rate,
            monthly_budget: t.monthly_budget,
            budget_period: t.budget_period,
            rate_limit: t.rate_limit,
            tpm_limit: t.tpm_limit,
            max_concurrency: t.max_concurrency,
            allowed_models: [...(t.allowed_models ?? [])],
            allowed_cidrs: [...(t.allowed_cidrs ?? [])]
          }
        : blank()
    }
  )

  async function save() {
    if (!form.value.name.trim()) {
      message.error('Name is required')
      return
    }
    const body: TeamBody = {
      name: form.value.name.trim(),
      cost_rate: form.value.cost_rate,
      monthly_budget: form.value.monthly_budget,
      budget_period: form.value.budget_period,
      rate_limit: form.value.rate_limit || null,
      tpm_limit: form.value.tpm_limit || null,
      max_concurrency: form.value.max_concurrency || null,
      allowed_models: form.value.allowed_models.length ? form.value.allowed_models : null,
      allowed_cidrs: form.value.allowed_cidrs.length ? form.value.allowed_cidrs : null
    }
    saving.value = true
    try {
      if (isEdit.value) await api.update(props.existing!.team_id, body)
      else await api.create(body as TeamBody & { name: string })
      message.success(isEdit.value ? 'Team updated' : 'Team created')
      emit('update:show', false)
      emit('saved')
    } catch (e: any) {
      message.error(e.status === 409 ? 'A team with this name already exists' : e.message)
    } finally {
      saving.value = false
    }
  }
</script>

<template>
  <NModal
    :show="show"
    :title="isEdit ? 'Edit Team' : 'Create Team'"
    preset="card"
    style="width: 520px"
    @update:show="emit('update:show', $event)"
  >
    <div class="space-y-1">
      <NFormItem label="Name" required>
        <NInput v-model:value="form.name" placeholder="e.g. infra" />
      </NFormItem>
      <div class="flex gap-4">
        <NFormItem label="Budget ($ per period)" class="flex-1">
          <NInputNumber v-model:value="form.monthly_budget" :min="0" :precision="2" placeholder="unlimited" class="w-full" />
        </NFormItem>
        <NFormItem label="Budget Period" class="flex-1">
          <NSelect v-model:value="form.budget_period" :options="periodOptions" />
        </NFormItem>
      </div>
      <div class="flex gap-4">
        <NFormItem label="Cost Rate (× member rate)" class="flex-1">
          <NInputNumber v-model:value="form.cost_rate" :min="0" :step="0.1" :precision="2" class="w-full" />
        </NFormItem>
        <NFormItem label="Max Concurrent Requests" class="flex-1">
          <NInputNumber v-model:value="form.max_concurrency" :min="1" placeholder="unlimited" class="w-full" />
        </NFormItem>
      </div>
      <div class="flex gap-4">
        <NFormItem label="Team RPM" class="flex-1">
          <NInputNumber v-model:value="form.rate_limit" :min="1" placeholder="no team limit" class="w-full" />
        </NFormItem>
        <NFormItem label="Team TPM" class="flex-1">
          <NInputNumber v-model:value="form.tpm_limit" :min="1" placeholder="no team limit" class="w-full" />
        </NFormItem>
      </div>
      <NFormItem label="Allowed Models (glob, !exclude — empty = all)">
        <NDynamicTags v-model:value="form.allowed_models" />
      </NFormItem>
      <NFormItem label="Allowed Client CIDRs (empty = any)">
        <NDynamicTags v-model:value="form.allowed_cidrs" />
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
