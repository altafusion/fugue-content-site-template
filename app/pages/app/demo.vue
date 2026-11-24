<script setup lang="ts">
definePageMeta({
  layout: 'product',
  title: 'Product Demo',
  nav: { primary: 'demo' }
})

useFugueContentSiteSeo({
  title: 'Product Demo',
  description: 'Vue product route with a Studio-editable fragment embedded via FugueContentFragment.'
})
</script>

<template>
  <div class="flex flex-col gap-8">
    <div class="flex flex-col gap-4">
      <h1 class="text-3xl font-bold tracking-tight text-highlighted">
        Product Route Demo
      </h1>
      <p class="max-w-2xl text-muted">
        This page is served from
        <code class="rounded bg-elevated px-1.5 py-0.5 text-sm">app/pages/app/demo.vue</code>.
        The section below is Studio-editable markdown from
        <code class="rounded bg-elevated px-1.5 py-0.5 text-sm">content/**/fragments/app-demo.md</code>.
      </p>
      <UButton
        to="/"
        label="Back to Home"
        variant="outline"
        color="neutral"
        class="self-start"
      />
    </div>

    <section
      class="rounded-lg border border-muted/30 bg-elevated/30 p-6"
      aria-label="Studio-editable content"
    >
      <FugueContentFragment slug="app-demo" />
    </section>
  </div>
</template>
