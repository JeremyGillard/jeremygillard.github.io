<template>
  <li class="tag" :style="{ backgroundColor: tagColor }">
    {{ tag.name }}
  </li>
</template>

<script setup lang="ts">
import { Tag, colorByCategory } from "~~/utils/timeline";

const { tag } = defineProps<{ tag: Tag }>();

const tagColor = computed(() => colorByCategory(tag.category));
</script>

<style scoped>
.tag {
  padding: 0.4rem 0.8rem;
  border-radius: 1rem;
  width: fit-content;
  font-size: var(--fs-300);
  font-weight: 600;
}
</style>
