<script setup lang="ts">
const title = useRuntimeConfig().public.appName as string
useHead({ title })
</script>

<template>
  <UApp>
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
