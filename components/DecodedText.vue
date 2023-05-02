<template>
  <span>
    <DecodedLetter v-for="letter in lettersFromString">
      {{ letter }}
    </DecodedLetter>
  </span>
</template>

<script setup lang="ts">
interface Props {
  text: string;
}
const props = defineProps<Props>();

const lettersFromString = computed(() => [...props.text]);
</script>
