<template>
  <div ref="area" class="timeline-area">
    <section
      id="timeline-anchor-layout"
      class="timeline-anchor-layout"
    ></section>
    <TimelineSection
      v-for="(job, index) in jobs"
      :key="index"
      :index="index"
      :job="job"
    />
  </div>
</template>

<script setup lang="ts">
const jobs = await useJobs();
</script>

<style scoped>
.timeline-area {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  padding: 30vh 0 10vh;
  gap: 30vh;
}

@media (width < 600px) {
  .timeline-area {
    display: flex;
    flex-flow: column nowrap;
    gap: 4rem;
  }
}
</style>
