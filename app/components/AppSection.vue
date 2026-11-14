<script setup lang="ts">
defineOptions({ inheritAttrs: false });
</script>

<!-- Content block closed by the shared separator line (bottom border + side ticks), same as the header. -->
<template>
  <section class="section" v-bind="$attrs">
    <slot />
  </section>
  <div class="ticks" aria-hidden="true" />
</template>

<style scoped>
.section {
  padding: 32px;
  border-bottom: 1px solid var(--border);

  @media (max-width: 1024px) {
    padding: 24px 16px;
  }
}
</style>
