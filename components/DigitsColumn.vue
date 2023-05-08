<template>
  <span
    class="random-string"
    :style="{
      'animation-delay': animationDelay,
      'animation-duration': animationDuration,
    }"
  >
    <span v-for="number in stringArrayNumber">
      {{ number }}
    </span>
  </span>
</template>

<script setup lang="ts">
import { getRandomInt, getRandomNumberString } from "~~/utils/numbers";

let stringArrayNumber = ref<string[]>([]);
let animationDuration = ref("");
let animationDelay = ref("");

onMounted(() => {
  stringArrayNumber.value = [...getRandomNumberString()];
  animationDelay.value = `${getRandomInt(3, 4)}s`;
  animationDuration.value = `${getRandomInt(2, 5)}s`;
});
</script>

<style scoped>
.random-string {
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  bottom: 0.22rem;
  display: flex;
  flex-direction: column;
  line-height: var(--fs-600);
  background: var(--clr-neutral-400);
  border-radius: 1rem;
  text-align: center;
  animation-name: decode;
  animation-timing-function: ease-in-out;
  animation-fill-mode: forwards;
}

@keyframes decode {
  from {
    bottom: 0.22rem;
  }
  to {
    bottom: -10.4rem;
  }
}
</style>
