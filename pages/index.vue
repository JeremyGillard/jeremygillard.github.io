<template>
  <NuxtLayout>
    <template #hero>
      <Hero />
    </template>

    <template #default>
      <main class="content">
        <TimelineArea />
      </main>
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
onMounted(async () => {
  await navigateTo("/");
});
</script>
