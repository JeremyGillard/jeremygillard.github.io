<template>
  <div class="timeline">
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

<style scoped></style>
