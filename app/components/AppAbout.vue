<script setup lang="ts">
const { profile } = useProfile();
const { paragraphs, focus } = profile.about;
</script>

<template>
  <AppSection title="About">
    <p v-for="(p, i) in paragraphs" :key="i" class="paragraph">{{ p }}</p>

    <p class="intro">{{ focus.intro }}</p>
    <dl class="focus">
      <div v-for="item in focus.items" :key="item.area" class="row">
        <dt class="area">{{ item.area }}</dt>
        <dd class="details">{{ item.details }}</dd>
      </div>
    </dl>
  </AppSection>
</template>

<style scoped>
.paragraph,
.intro {
  margin: 0 0 1em;
  line-height: 1.6;
  text-wrap: pretty;
}

.paragraph:first-child {
  color: var(--text-h);
}

.intro {
  margin-top: 1.5em;
}

.focus {
  margin: 0;
  border-top: 1px solid var(--border);
}

.row {
  display: grid;
  grid-template-columns: 9rem minmax(0, 1fr);
  gap: 16px;
  padding: 14px 0;
  border-bottom: 1px solid var(--border);

  @media (max-width: 480px) {
    grid-template-columns: minmax(0, 1fr);
    gap: 4px;
  }
}

.area {
  font-weight: 500;
  color: var(--text-h);
}

.details {
  margin: 0;
  line-height: 1.5;
}
</style>
