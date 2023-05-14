<template>
  <svg ref="svg" :height="height" class="timeline">
    <path
      class="timeline-path"
      :d="arrowPath"
      stroke-width="3"
      stroke-linecap="round"
      fill="none"
    />
    <path
      class="timeline-path"
      :d="path"
      stroke-width="3"
      stroke-linecap="round"
    />
  </svg>
</template>

<script setup lang="ts">
defineProps<{
  height: number;
}>();

const midX = ref(0);

const svg = ref<SVGSVGElement>();

const path = computed(() => {
  return `M${midX.value} 20 V200`;
});

const arrowPath = computed(() => {
  return `M${midX.value - 16} 2 L${midX.value} 20 L${midX.value + 16} 2`;
});

onMounted(() => {
  midX.value = svg.value!.getBoundingClientRect().width / 2 + 10;
});
</script>

<style scoped>
.timeline {
  /* border: solid 2px black; */
  position: absolute;
  /* z-index: -1; */
  top: 88vh;
  width: 100%;
}

.timeline-path {
  stroke: var(--clr-primary-400);
}

@media (width < 600px) {
  .timeline {
    visibility: hidden;
  }
}
</style>
