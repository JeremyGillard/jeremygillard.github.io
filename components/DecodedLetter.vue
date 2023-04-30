<template>
  <span class="decoded-letter">
    <slot></slot>
    <span
      class="random-string"
      :style="{
        'animation-delay': animationDelay,
        'animation-duration': animationDuration,
      }"
    >
      <span v-for="number in numberStringArray">
        {{ number }}
      </span>
    </span>
  </span>
</template>

<script>
export default {
  data() {
    return {
      numberStringArray: [],
      animationDuration: "",
      animationDelay: "",
    };
  },
  methods: {
    getRandomNumberString() {
      /*
        I chained the substring function because Math.random did not give me a strong enough disparity between very large and very small numbers. This allows me to have a nice disparity in string length.
        */
      return this.getRandomInt(1, 1000000)
        .toString()
        .substring(0, this.getRandomInt(1, 10));
    },
    getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
  },
  mounted() {
    this.numberStringArray = [...this.getRandomNumberString()];
    this.animationDelay = `${this.getRandomInt(1, 2)}s`;
    this.animationDuration = `${this.getRandomInt(2, 5)}s`;
  },
};
</script>

<style scoped>
.decoded-letter {
  position: relative;
  margin-left: 0.2rem;
  margin-right: 0.2rem;
}
.random-string {
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  bottom: -14rem;
  display: flex;
  flex-direction: column;
  line-height: 2.4rem;
  background: var(--primary-background);
  border-radius: 1.2rem;
  text-align: center;
  animation-name: decode;
  /* animation-duration: 5s; */
  animation-timing-function: ease-in-out;
  /* animation-delay: 2s; */
  animation-fill-mode: backwards;
}

@keyframes decode {
  from {
    bottom: 0.4rem;
  }
  to {
    bottom: -14rem;
  }
}
</style>
