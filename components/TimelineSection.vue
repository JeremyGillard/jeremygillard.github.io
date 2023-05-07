<template>
  <section class="timeline-section">
    <header>
      <h3>{{ title }}</h3>
      <div class="details">
        <h4>{{ period }} {{ details }}</h4>
      </div>
    </header>
    <p>{{ description }}</p>
    <ul>
      <TimelineTag
        v-for="(tag, index) in tags"
        :key="index"
        :name="tag.name"
        :category="tag.category"
      />
    </ul>
  </section>
</template>

<script setup lang="ts">
import { Tag } from "~~/utils/timelinetypes";

const { startDate, endDate, company, contractType } = defineProps<{
  title: string;
  startDate: string;
  endDate: string;
  company: string;
  contractType: string;
  description: string;
  tags: Tag[];
}>();

const period = computed(() => {
  return `${startDate} - ${endDate}`;
});

const details = computed(() => {
  let details = "";
  if (company) {
    details += `at ${company}`;
  }
  if (contractType) {
    details += ` [${contractType}]`;
  }
  return details;
});
</script>

<style scoped>
ul {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
}

h3 {
  font-size: var(--fs-500);
  width: max-content;
}

h4 {
  font-size: var(--fs-400);
  margin-bottom: 1rem;
}

p {
  font-size: var(--fs-400);
  text-align: justify;
}
</style>
