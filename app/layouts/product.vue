<script setup lang="ts">
const { showHeader, showFooter } = useShellChrome()
const { brand } = useShellSiteHeader()
</script>

<template>
  <div class="shell flex min-h-dvh min-w-0 flex-col overflow-x-clip">
    <ShellSiteHeader
      v-if="showHeader"
      class="shrink-0"
    />

    <!--
      Do not rely on Nuxt UI's default main min-height (`calc(100vh-header)`):
      with this footer sibling it always overflows. flex-1 + min-h-0 fills the shell.
    -->
    <UMain class="min-h-0 w-full flex-1">
      <UContainer>
        <UPage>
          <template v-if="$slots.aside" #left>
            <UPageAside>
              <slot name="aside" />
            </UPageAside>
          </template>

          <slot v-if="$slots.header" name="header" />
          <UPageBody>
            <slot />
          </UPageBody>
        </UPage>
      </UContainer>
    </UMain>

    <footer
      v-if="showFooter"
      class="shell-footer shrink-0"
    >
      <slot name="footer">
        <p class="shell-footer__default">
          © {{ new Date().getFullYear() }} {{ brand.name }}
        </p>
      </slot>
    </footer>
  </div>
</template>

<style scoped>
.shell-footer {
  border-top: 1px solid var(--color-border, rgb(255 255 255 / 0.12));
  padding: var(--space-4, 1rem) var(--space-6, 1.5rem);
}

.shell-footer__default {
  margin: 0;
  font-size: var(--font-size-sm, 0.875rem);
  color: var(--color-text-secondary, #a1a1aa);
}
</style>
