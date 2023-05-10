<template>
  <div class="notes-navbar">
    <ul>
      <li v-for="notes in navigation[1].children" :key="notes._path">
        <NuxtLink :to="notes._path">{{ notes.title }}</NuxtLink>
        <ul>
          <li v-for="childnote in notes.children" :key="childnote._path">
            <span>---</span
            ><NuxtLink :to="childnote._path">{{ childnote.title }}</NuxtLink>
          </li>
        </ul>
      </li>
    </ul>
    <!-- <pre>{{ navigation[1] }}</pre> -->
  </div>
</template>

<script setup lang="ts">
const { page, navigation } = useContent();

console.log(navigation.value);
console.log(page.value);
</script>

<style scoped></style>
