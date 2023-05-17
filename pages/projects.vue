<template>
  <NuxtLayout>
    <main class="content">
      <!-- <div v-for="project in projects" :key="project._path" class="card">
        <h2>
          <NuxtLink :to="project._path">
            {{ project.title }}
          </NuxtLink>
        </h2>
      </div> -->
      <NuxtLink
        v-for="project in projects"
        :key="project.path"
        class="card"
        :to="project.path"
      >
        <h2>{{ project.title }}</h2>
        <div class="icon"></div>
        <p>
          {{ project.incipit }}
        </p>
        <div class="plus">
          <div class="fakelink">+</div>
        </div>
      </NuxtLink>
    </main>
  </NuxtLayout>
</template>

<script setup lang="ts">
interface Project {
  title: string;
  incipit: string;
  path: string;
}

const data = await queryContent("/projects").find();

const projects = computed(() => {
  return data.map((project) => {
    return {
      title: project.title,
      incipit: `${project.body.children[5].children[0].value.substring(
        0,
        240
      )}...`,
      path: project._path,
    } as Project;
  });
});
</script>

<style scoped>
.content {
  display: flex;
  justify-content: space-between;
}
h2 {
  font-size: var(--fs-500);
}
p {
  font-size: 0.9rem;
  text-align: justify;
}
.fakelink {
  font-size: var(--fs-600);
  text-align: center;
  border: solid 2px var(--clr-primary-400);
  border-radius: 2rem;
  padding: 0.04rem 0.6rem;
  display: block;
  width: fit-content;
  margin: 0 auto;
}
.card {
  max-width: 200px;
  border: solid 2px var(--clr-primary-400);
  border-radius: 2rem;
  padding: 2rem;
  display: flex;
  flex-flow: column nowrap;
  gap: 0.4rem;
}
</style>
