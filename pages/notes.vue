<template>
  <section class="content">
    <div class="grid">
      <TimelineSection
        v-for="(job, index) in jobs"
        :key="index"
        :title="job.title"
        :details="job.details"
        :description="job.description"
        :tags="job.tags"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { Job } from "~~/utils/timelinetypes";

let jobs = ref([] as Job[]);

const { data } = await useAsyncData("jobs", () =>
  queryContent("/jobs").findOne()
);

jobs = data.value!.body.map((elt: Job) => elt);
</script>

<style scoped></style>
