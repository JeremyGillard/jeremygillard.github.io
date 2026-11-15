<script setup lang="ts">
defineOptions({ inheritAttrs: false });

/** With a title: label column + content column (stacks on narrow screens). */
const { title } = defineProps<{ title?: string }>();
const titleId = useId();
</script>

<!-- Content block closed by the shared separator line (bottom border + side ticks), same as the header. -->
<template>
  <section class="section" :aria-labelledby="title ? titleId : undefined" v-bind="$attrs">
    <div v-if="title" class="split">
      <h2 :id="titleId" class="label">{{ title }}</h2>
      <div class="body"><slot /></div>
    </div>
    <slot v-else />
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

.split {
  display: grid;
  grid-template-columns: 200px minmax(0, 1fr);
  gap: 32px;
  padding-block: 32px;

  @media (max-width: 768px) {
    grid-template-columns: minmax(0, 1fr);
    gap: 16px;
    padding-block: 16px;
  }
}

.label {
  margin: 0;
  font-size: 0.8125rem;
  font-weight: 500;
  line-height: 1.6rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text);
}

.body {
  max-width: 62ch;
}
</style>
