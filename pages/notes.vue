<template>
  <section class="content">
    <div class="grid">
      <section v-for="(job, index) in jobs" :key="index" :class="`s${index}`">
        <h3>{{ job.title }}</h3>
        <h4>{{ job.details }}</h4>
        <p>{{ job.description }}</p>
      </section>
    </div>
  </section>
</template>

<script setup lang="ts">
let jobs = ref([] as Job[]);

interface Job {
  title: string;
  details: string;
  description: string;
}

const { data } = await useAsyncData("jobs", () =>
  queryContent("/jobs").findOne()
);

jobs = data.value!.body.map((elt: Job) => elt);
</script>

<style scoped>
.content {
  margin-top: 4vh;
}

h1 {
  font-weight: 500;
  font-size: var(--text-size-xl);
  margin-bottom: 4.8vh;
  text-align: center;
}

h3 {
  font-family: Roboto, sans-serif;
  font-size: 2.4rem;
}

h4 {
  font-family: Roboto, sans-serif;
  font-size: 1.8rem;
  margin-bottom: 1rem;
}

p {
  font-family: Roboto, sans-serif;
  font-size: 1.4rem;
  text-align: justify;
}

.grid {
  display: grid;
  gap: 3.2rem;
  grid-template-columns: repeat(3, 1fr);
  /* grid-template-rows: repeat(3, 1fr); */
}

.s0 {
  grid-column: span 2;
}

.s1 {
  grid-column-start: 2;
  grid-column-end: 4;
}

.s2 {
  grid-column: span 2;
}

.s3 {
  grid-column-start: 2;
  grid-column-end: 4;
}

.s4 {
  grid-column: span 2;
}

.s5 {
  grid-column-start: 2;
  grid-column-end: 4;
}
</style>
