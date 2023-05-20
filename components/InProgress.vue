<template>
  <div class="in-progress">
    <h1 class="in-progress-h1">
      <slot></slot>
    </h1>
    <h2 class="in-progress-h2">IN PROGRESS</h2>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.in-progress {
  width: 100%;
  height: 80vh;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  border: solid 1px var(--clr-primary-400);
  border-radius: 0.2rem;
}

.in-progress-h2 {
  margin-top: 1rem;
  font-size: var(--fs-400);
  font-weight: 500;
  letter-spacing: 0.2rem;
}
</style>
