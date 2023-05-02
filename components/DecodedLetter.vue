<template>
  <span class="decoded-letter">
    <slot></slot>
    <DigitsColumn />
  </span>
</template>

<style scoped>
.decoded-letter {
  position: relative;
  margin-left: 0.2rem;
  margin-right: 0.2rem;
}
</style>
