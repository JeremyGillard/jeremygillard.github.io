<template>
  <div ref="area" class="timeline-area">
    <section
      id="timeline-anchor-layout"
      class="timeline-anchor-layout"
    ></section>
    <!-- <Timeline :height="timelineHeight" /> -->
    <TimelineSection
      v-for="(job, index) in jobs"
      :key="index"
      :id="timelineSectioName(index)"
      :class="timelineSectioName(index)"
      :title="job.title"
      :start-date="job.startDate"
      :end-date="job.endDate"
      :company="job.company"
      :contract-type="job.contractType"
      :description="job.description"
      :tags="job.tags"
    />
  </div>
</template>

<script setup lang="ts">
const jobs = await useJobs();

function timelineSectioName(index: number): string {
  return `timeline-section-${index}`;
}

const area = ref<HTMLElement>();
const timelineHeight = ref(0);
onMounted(() => {
  timelineHeight.value = area.value!.getBoundingClientRect().height;
});
</script>

<style scoped>
.timeline-area {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  margin: 30vh 0;
  gap: 30vh;
}
/* .timeline-area {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(38, 12.5vh);
}

.timeline-anchor-layout {
  grid-column: 1 / span 1;
  grid-row: 2 / span 1;
}

.timeline-section-0 {
  grid-column: 3 / span 4;
  grid-row: 4 / span 2;
}

.timeline-section-1 {
  grid-column: 2 / span 5;
  grid-row: 10 / span 2;
}

.timeline-section-2 {
  grid-column: 3 / span 5;
  grid-row: 15 / span 2;
}

.timeline-section-3 {
  grid-column: 2 / span 4;
  grid-row: 22 / span 2;
}

.timeline-section-4 {
  grid-column: 3 / span 4;
  grid-row: 27 / span 2;
}

.timeline-section-5 {
  grid-column: 2 / span 4;
  grid-row: 33 / span 2;
}

@media (width < 1000px) {
  .timeline-area {
    grid-template-rows: repeat(30, 12.5vh);
  }
  .timeline-section-0 {
    grid-column: 3 / span 6;
    grid-row: 4 / span 3;
  }

  .timeline-section-1 {
    grid-column: 1 / span 7;
    grid-row: 8 / span 3;
  }

  .timeline-section-2 {
    grid-column: 2 / span 7;
    grid-row: 12 / span 3;
  }

  .timeline-section-3 {
    grid-column: 2 / span 6;
    grid-row: 17 / span 3;
  }

  .timeline-section-4 {
    grid-column: 2 / span 6;
    grid-row: 21 / span 3;
  }

  .timeline-section-5 {
    grid-column: 2 / span 6;
    grid-row: 26 / span 3;
  }
} */

@media (width < 600px) {
  .timeline-area {
    display: flex;
    flex-flow: column nowrap;
    gap: 4rem;
  }
}
</style>
