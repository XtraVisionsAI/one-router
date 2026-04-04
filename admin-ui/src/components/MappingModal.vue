<script setup lang="ts">
  import type { ModelMapping, UpsertMappingBody, ModelCapabilities } from '@/api/types'
  import { defaultCapabilities } from '@/api/types'
  import { useMessage } from 'naive-ui'
  import { useMappingsApi } from '@/api/mappings'

  const props = defineProps<{
    show: boolean
    existing?: ModelMapping
  }>()

  const emit = defineEmits<{
    (e: 'update:show', val: boolean): void
    (e: 'saved'): void
  }>()

  const message = useMessage()
  const api = useMappingsApi()

  const isEdit = computed(() => !!props.existing)
  const title = computed(() => (isEdit.value ? 'Edit Mapping' : 'Add Mapping'))

  // Separate reactive caps object for the UI checkboxes
  const caps = ref<ModelCapabilities>(defaultCapabilities())

  const form = ref<Omit<UpsertMappingBody, 'capabilities'>>({
    source_model_id: '',
    target_model_id: '',
    provider: 'bedrock',
    display_name: '',
    priority: 0,
    status: 'active',
    input_price: 0,
    output_price: 0,
    cache_read_price: 0,
    cache_write_price: 0,
  })
  const saving = ref(false)

  watch(
    () => props.show,
    (val) => {
      if (val) {
        form.value = {
          source_model_id: props.existing?.source_model_id ?? '',
          target_model_id: props.existing?.target_model_id ?? '',
          provider: props.existing?.provider ?? 'bedrock',
          display_name: props.existing?.display_name ?? '',
          priority: props.existing?.priority ?? 0,
          status: props.existing?.status ?? 'active',
          input_price: props.existing?.input_price ?? 0,
          output_price: props.existing?.output_price ?? 0,
          cache_read_price: props.existing?.cache_read_price ?? 0,
          cache_write_price: props.existing?.cache_write_price ?? 0,
        }
        caps.value = props.existing?.capabilities
          ? { ...defaultCapabilities(), ...props.existing.capabilities }
          : defaultCapabilities()
      }
    }
  )

  async function save() {
    if (!form.value.source_model_id.trim()) {
      message.error('Source model ID is required')
      return
    }
    if (!form.value.target_model_id.trim()) {
      message.error('Target model ID is required')
      return
    }

    saving.value = true
    try {
      const body: UpsertMappingBody = {
        ...form.value,
        capabilities: JSON.stringify(caps.value),
      }
      if (isEdit.value) {
        await api.update(props.existing!.source_model_id, props.existing!.provider, body)
      } else {
        await api.create(body)
      }
      message.success(isEdit.value ? 'Mapping updated' : 'Mapping created')
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
    <div class="space-y-1">
      <div class="flex gap-4">
        <NFormItem label="Source Model ID" required class="flex-1">
          <NInput v-model:value="form.source_model_id" placeholder="claude-3-5-sonnet*" :readonly="isEdit" />
        </NFormItem>
        <NFormItem label="Provider" required class="w-36">
          <NSelect
            v-model:value="form.provider"
            :disabled="isEdit"
            :options="['bedrock', 'gemini', 'anthropic', 'openai'].map((p) => ({ label: p, value: p }))"
          />
        </NFormItem>
      </div>

      <NFormItem label="Target Model ID" required>
        <NInput v-model:value="form.target_model_id" placeholder="anthropic.claude-3-5-sonnet-20241022-v2:0" />
      </NFormItem>

      <NFormItem label="Display Name">
        <NInput v-model:value="form.display_name" />
      </NFormItem>

      <div class="flex gap-4">
        <NFormItem label="Priority" class="flex-1">
          <NInputNumber v-model:value="form.priority" class="w-full" />
        </NFormItem>
        <NFormItem label="Status" class="flex-1">
          <NSelect
            v-model:value="form.status"
            :options="[
              { label: 'active', value: 'active' },
              { label: 'inactive', value: 'inactive' }
            ]"
          />
        </NFormItem>
      </div>

      <div class="flex gap-4">
        <NFormItem label="Input Price (per 1K)" class="flex-1">
          <NInputNumber v-model:value="form.input_price" :precision="4" :min="0" class="w-full" />
        </NFormItem>
        <NFormItem label="Output Price (per 1K)" class="flex-1">
          <NInputNumber v-model:value="form.output_price" :precision="4" :min="0" class="w-full" />
        </NFormItem>
      </div>

      <div class="flex gap-4">
        <NFormItem label="Cache Read Price (per 1K)" class="flex-1">
          <NInputNumber v-model:value="form.cache_read_price" :precision="4" :min="0" class="w-full" />
        </NFormItem>
        <NFormItem label="Cache Write Price (per 1K)" class="flex-1">
          <NInputNumber v-model:value="form.cache_write_price" :precision="4" :min="0" class="w-full" />
        </NFormItem>
      </div>

      <!-- Capabilities -->
      <NDivider title-placement="left">
        <span class="text-xs text-slate-500">Capabilities</span>
      </NDivider>

      <div class="space-y-2">
        <!-- Extended Thinking -->
        <div class="flex items-center gap-3">
          <NCheckbox v-model:checked="caps.thinking.enabled">Extended Thinking</NCheckbox>
          <NSelect
            v-if="caps.thinking.enabled"
            v-model:value="caps.thinking.style"
            size="small"
            style="width: 110px"
            :options="[
              { label: 'Claude', value: 'claude' },
              { label: 'Nova 2', value: 'nova2' },
              { label: 'Kimi', value: 'kimi' }
            ]"
          />
        </div>

        <NCheckbox v-model:checked="caps.document.enabled">Document Support</NCheckbox>
        <NCheckbox v-model:checked="caps.tool_use.enabled">Tool Use</NCheckbox>
        <NCheckbox v-model:checked="caps.ptc.enabled">PTC (Programmatic Tool Calling)</NCheckbox>
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
