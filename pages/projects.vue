<template>
  <NuxtLayout>
    <main class="content">
      <div v-for="project in projects" :key="project._path" class="card">
        <h2>
          <NuxtLink :to="project._path">
            {{ project.title }}
          </NuxtLink>
        </h2>
      </div>
    </main>
  </NuxtLayout>
</template>

<script setup lang="ts">
// let jobs = ref<Job[]>();
// let projects = ref<{}>();

// const { data } = await useAsyncData("projects", () =>
//   queryContent("/projects/fluent-backend").findOne()
// );
// console.log(data.value);

const projects = await queryContent("/projects").find();
console.log(projects);

// jobs = data.value!.body.map((elt: Job) => elt);
</script>

<style scoped></style>
