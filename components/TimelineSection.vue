<template>
  <section
    :id="timelineSectioName(index)"
    :class="timelineSectioName(index)"
    ref="section"
    class="timeline-section"
  >
    <header>
      <h3>{{ title }}</h3>
      <div class="details">
        <h4>{{ period }} {{ details }}</h4>
      </div>
    </header>
    <p>{{ description }}</p>
    <ul>
      <TimelineTag v-for="(tag, index) in tags" :key="index" :tag="tag" />
    </ul>
  </section>
</template>

<script setup lang="ts">
import {
  Job,
  formatDetails,
  formatPeriod,
  timelineSectioName,
} from "~~/utils/timeline";

const { job, index } = defineProps<{ job: Job; index: number }>();
const { title, startDate, endDate, company, contractType, description, tags } =
  job;

const period = computed(() => formatPeriod(startDate, endDate));
const details = computed(() => formatDetails(company, contractType));

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const section = ref<HTMLElement>();

onMounted(() => {
  gsap.from(`.${section.value?.id}`, {
    scrollTrigger: {
      trigger: `.${section.value?.id}`,
      start: "top 60%",
      // markers: true,
    },
    y: 60,
    opacity: 0,
    delay: 0.2,
    duration: 1,
  });
});
</script>

<style scoped>
.timeline-section {
  display: flex;
  flex-flow: column nowrap;
  gap: 1rem;
  z-index: -1;
  max-width: 460px;
}

ul {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
}

h3 {
  font-size: var(--fs-500);
  width: max-content;
  max-width: 80vw;
}

h4 {
  font-size: var(--fs-400);
}

p {
  font-size: var(--fs-400);
  text-align: justify;
}
</style>
