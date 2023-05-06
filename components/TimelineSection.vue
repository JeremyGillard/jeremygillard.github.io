<template>
  <section>
    <header>
      <div class="title">
        <h3>{{ title }}</h3>
        <h4>{{ details }}</h4>
      </div>
      <ul>
        <li v-for="(tag, index) in tags" :key="index">
          <TimelineTag :name="tag.name" :category="tag.category" />
        </li>
      </ul>
    </header>
    <p>{{ description }}</p>
  </section>
</template>

<script setup lang="ts">
import { Tag } from "~~/utils/timelinetypes";

defineProps<{
  title: string;
  details: string;
  description: string;
  tags: Tag[];
}>();
</script>

<style scoped>
header {
  display: flex;
}

ul {
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-end;
  align-items: center;
  column-gap: 1rem;
}

h3 {
  font-family: Roboto, sans-serif;
  font-size: 2.4rem;
  width: max-content;
}

h4 {
  font-family: Roboto, sans-serif;
  font-size: 1.4rem;
  margin-bottom: 1rem;
}

p {
  font-family: Roboto, sans-serif;
  font-size: 1.4rem;
  text-align: justify;
}
</style>
