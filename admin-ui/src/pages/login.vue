<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const route = useRoute()
const message = useMessage()
const auth = useAuthStore()

const apiKey = ref('')
const loading = ref(false)
const showKey = ref(false)

async function handleLogin() {
  if (!apiKey.value.trim()) return
  loading.value = true
  try {
    const res = await fetch('/admin/api/status', {
      headers: { 'x-api-key': apiKey.value.trim() },
    })
    if (!res.ok) throw new Error('Invalid API key')
    const data = await res.json()
    auth.login(apiKey.value.trim(), data.version ?? '')
    const redirect = (route.query.redirect as string) || '/dashboard'
    router.push(redirect)
  } catch {
    message.error('Invalid API key. Please try again.')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="bg-[#1e293b] rounded-xl shadow-2xl p-8 w-[400px] border border-slate-700">
    <div class="mb-6 text-center">
      <span class="text-indigo-400 font-semibold text-xl">one-router</span>
      <span class="ml-2 text-sm text-slate-500 bg-slate-700 px-2 py-0.5 rounded">admin</span>
    </div>
    <p class="text-slate-400 text-sm text-center mb-6">
      Enter your master or ephemeral API key to continue.
    </p>

    <NForm @submit.prevent="handleLogin">
      <NFormItem>
        <NInputGroup>
          <NInput
            v-model:value="apiKey"
            :type="showKey ? 'text' : 'password'"
            placeholder="sk-..."
            :disabled="loading"
            @keydown.enter="handleLogin"
          />
          <NButton @click="showKey = !showKey">
            <template #icon>
              <span :class="showKey ? 'i-carbon-view-off' : 'i-carbon-view'" />
            </template>
          </NButton>
        </NInputGroup>
      </NFormItem>
      <NButton
        type="primary"
        block
        :loading="loading"
        @click="handleLogin"
      >
        Sign in
      </NButton>
    </NForm>
  </div>
</template>

<route lang="json">
{ "meta": { "layout": "auth" } }
</route>
