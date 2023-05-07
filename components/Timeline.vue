<template>
  <div class="timeline">
    <section
      id="timeline-anchor-layout"
      class="timeline-anchor-layout"
    ></section>
    <TimelineSection
      v-for="(job, index) in jobs"
      :key="index"
      :id="timelineSectioName(index)"
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
import { Job } from "~~/utils/timelinetypes";

let jobs = ref([] as Job[]);

const { data } = await useAsyncData("jobs", () =>
  queryContent("/jobs").findOne()
);

jobs = data.value!.body.map((elt: Job) => elt);

function timelineSectioName(index: number): string {
  return `timeline-section-${index}`;
}
</script>

<style scoped>
.timeline {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(38, 12.5vh);
}

.timeline-anchor-layout {
  grid-column: 1 / span 1;
  grid-row: 2 / span 1;
}

.timeline section:nth-child(2) {
  grid-column: 3 / span 4;
  grid-row: 4 / span 2;
}

.timeline section:nth-child(3) {
  grid-column: 2 / span 5;
  grid-row: 10 / span 2;
}

.timeline section:nth-child(4) {
  grid-column: 3 / span 5;
  grid-row: 15 / span 2;
}

.timeline section:nth-child(5) {
  grid-column: 2 / span 4;
  grid-row: 22 / span 2;
}

.timeline section:nth-child(6) {
  grid-column: 3 / span 4;
  grid-row: 27 / span 2;
}

.timeline section:nth-child(7) {
  grid-column: 2 / span 4;
  grid-row: 33 / span 2;
}

@media (width < 1000px) {
  .timeline {
    grid-template-rows: repeat(30, 12.5vh);
  }
  .timeline section:nth-child(2) {
    grid-column: 3 / span 6;
    grid-row: 4 / span 3;
  }

  .timeline section:nth-child(3) {
    grid-column: 1 / span 7;
    grid-row: 8 / span 3;
  }

  .timeline section:nth-child(4) {
    grid-column: 2 / span 7;
    grid-row: 12 / span 3;
  }

  .timeline section:nth-child(5) {
    grid-column: 2 / span 6;
    grid-row: 17 / span 3;
  }

  .timeline section:nth-child(6) {
    grid-column: 2 / span 6;
    grid-row: 21 / span 3;
  }

  .timeline section:nth-child(7) {
    grid-column: 2 / span 6;
    grid-row: 26 / span 3;
  }
}

@media (width < 600px) {
  .timeline {
    display: flex;
    flex-flow: column nowrap;
    gap: 4rem;
  }
}
</style>
