<template>
  <NuxtLayout>
    <main class="content">
      <nav class="filters">
        <div class="filter">filter &darr;</div>
        <div class="filter">filter &darr;</div>
        <div class="filter">filter</div>
        <div class="filter">filter</div>
      </nav>
      <div class="articles">
        <article v-for="note in notes" :key="note.path">
          <NuxtLink :to="note.path">
            <header>
              <h2>{{ note.title }}</h2>
              <h3>{{ note.date }}</h3>
            </header>
            <img src="" alt="" />
            <p>{{ note.incipit }}</p>
          </NuxtLink>
        </article>
      </div>
    </main>
  </NuxtLayout>
</template>

<script setup lang="ts">
interface Notes {
  title: string;
  incipit: string;
  path: string;
  date?: string;
}

const data = await queryContent("/notes")
  .where({ date: { $exists: true } })
  .find();

console.log(data);

const notes = computed(() => {
  return data.map((note) => {
    return {
      title: note.title,
      incipit: note.description,
      path: note._path,
      date: note.date,
    } as Notes;
  });
});
</script>

<style scoped>
.filters {
  display: flex;
  gap: 1rem;
}
.filter {
  font-weight: 600;
  border: solid 2px var(--clr-primary-400);
  border-radius: 2rem;
  padding: 0 0.6rem;
}
.articles {
  margin-top: 2rem;
  display: grid;
  grid-template-areas:
    "first first"
    "second third";
  gap: 2rem;
}
article:nth-child(1) {
  grid-area: first;
}
header {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: baseline;
}
h2 {
  font-size: var(--fs-500);
}
h3 {
  font-size: var(--fs-400);
}
p {
  text-align: justify;
  font-size: var(--fs-400);
}
img {
  background-color: rgb(224, 224, 224);
  width: 100%;
  height: 20vh;
}
</style>
