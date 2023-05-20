<template>
  <NuxtLayout>
    <InProgress>Notes</InProgress>
  </NuxtLayout>
</template>

<script setup lang="ts">
const indexRoute = useIndexRoute();

onMounted(() => {
  indexRoute.value = "/#about";
});
</script>

<style scoped></style>
