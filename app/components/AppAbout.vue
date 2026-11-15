<script setup lang="ts">
const { profile } = useProfile();
const { paragraphs, focus } = profile.about;
</script>

<template>
  <AppSection aria-labelledby="about-title">
    <div class="about">
      <h2 id="about-title" class="label">About</h2>

      <div class="body">
        <p v-for="(p, i) in paragraphs" :key="i" class="paragraph">{{ p }}</p>

        <p class="intro">{{ focus.intro }}</p>
        <dl class="focus">
          <div v-for="item in focus.items" :key="item.area" class="row">
            <dt class="area">{{ item.area }}</dt>
            <dd class="details">{{ item.details }}</dd>
          </div>
        </dl>
      </div>
    </div>
  </AppSection>
</template>

<style scoped>
/* Inner wrapper: AppSection is multi-root, so scoped classes on it don't apply. */
.about {
  display: grid;
  grid-template-columns: 200px minmax(0, 1fr);
  gap: 32px;

  @media (max-width: 768px) {
    grid-template-columns: minmax(0, 1fr);
    gap: 16px;
  }
}

.label {
  margin: 0;
  font-size: 0.8125rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text);
}

.body {
  max-width: 62ch;
}

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
