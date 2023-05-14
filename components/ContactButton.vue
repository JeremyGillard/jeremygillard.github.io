<template>
  <div class="contact-button">
    <a target="_blank" :href="url">
      <i :class="[type, id]"></i>
      <p>{{ label }}</p>
    </a>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string;
  type: string;
  id: string;
  url: string;
}>();
</script>

<style scoped>
.contact-button {
  text-align: center;
  font-size: var(--fs-300);
}

i {
  text-align: center;
  font-size: 2em;
}

p {
  font-weight: bold;
  position: relative;
  top: -0.6em;
  opacity: 0;
  transition: all 200ms ease-in;
}

a {
  color: #838383;
}

a:hover,
a:focus {
  color: #303030;
}

a:hover p,
a:focus p {
  top: 0.2em;
  opacity: 0.8;
}
</style>
