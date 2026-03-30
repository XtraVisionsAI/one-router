<script setup lang="ts">
import { darkTheme } from 'naive-ui'
</script>

<template>
  <NConfigProvider :theme="darkTheme">
    <NMessageProvider>
      <NNotificationProvider>
        <RouterView />
      </NNotificationProvider>
    </NMessageProvider>
  </NConfigProvider>
</template>
