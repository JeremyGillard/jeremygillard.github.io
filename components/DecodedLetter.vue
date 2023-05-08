<template>
  <span class="decoded-letter">
    <slot></slot>
    <DigitsColumn />
  </span>
</template>

<style scoped>
.decoded-letter {
  position: relative;
  padding: 0 0.2rem;
}
</style>
