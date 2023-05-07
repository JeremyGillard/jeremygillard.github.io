<template>
  <li class="tag" :style="{ backgroundColor: tagColor }">
    {{ name }}
  </li>
</template>

<script setup lang="ts">
import { Category } from "~~/utils/timelinetypes";

const props = defineProps<{
  name: string;
  category: Category;
}>();

const tagColor = computed(() => {
  switch (props.category) {
    case Category.Language:
      return "#ffd772";
    case Category.Library:
      return "#7299ff";
    case Category.Tools:
      return "#b072ff";
    case Category.Field:
      return "#72ddff";
    default:
      return "#DDDDDD";
  }
});
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
