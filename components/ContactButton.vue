<template lang="">
  <div class="contact-button">
    <a target="_blank" :href="url">
      <i :class="[type, id]"></i>
      <p>{{ label }}</p>
    </a>
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    type: String,
    id: String,
    url: String,
  },
};
</script>

<style scoped>
.contact-button {
  text-align: center;
  font-size: 1.4rem;
}

i {
  text-align: center;
  font-size: 2.4em;
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

a:hover {
  color: #383838;
}

a:hover p {
  top: 0.2em;
  opacity: 1;
}
</style>
