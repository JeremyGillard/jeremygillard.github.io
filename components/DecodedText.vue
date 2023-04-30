<template>
  <span class="decoded-text">
    <DecodedLetter v-for="letter in lettersFromString">
      {{ letter }}
    </DecodedLetter>
  </span>
</template>

<script>
export default {
  props: {
    text: String,
  },
  computed: {
    lettersFromString() {
      return [...this.text];
    },
  },
};
</script>

<style scoped>
</style>
