<template>
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

  animation-name: appear;
  animation-duration: 0.8s;
  animation-timing-function: ease-in;
  animation-delay: 5s;
  animation-fill-mode: backwards;
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
  color: #303030;
}

a:hover p {
  top: 0.2em;
  opacity: 1;
}

@keyframes appear {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
