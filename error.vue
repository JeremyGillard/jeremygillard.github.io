<template>
  <div class="content">
    <div class="title">
      <h1>{{ error.statusCode }}</h1>
      <h2>{{ error.message }}</h2>
    </div>
    <button @click="handleError">Go back home</button>
  </div>
</template>

<script setup>
const props = defineProps({
  error: Object,
});

const handleError = () => clearError({ redirect: "/" });
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4rem;
  height: 100vh;
}

.title {
  user-select: none;
}

h1 {
  font-family: "Quicksand", sans-serif;
  font-weight: 500;
  font-size: 8rem;
  text-align: center;
}

h2 {
  font-family: "Quicksand", sans-serif;
  font-weight: 500;
  font-size: 3.2rem;
  letter-spacing: 0.2rem;
  word-spacing: 0.4rem;
  overflow: hidden;
}

button {
  font-family: "Quicksand", sans-serif;
  position: relative;
  font-size: 2.4rem;
  color: #303030;
  animation-name: appear;
  animation-duration: 1s;
  animation-fill-mode: backwards;
  cursor: pointer;
  border: none;
  background-color: var(--primary-background);
}

button::before {
  content: "";
  position: absolute;
  display: block;
  width: 100%;
  height: 0.15rem;
  bottom: 0;
  left: 0;
  border-radius: 2rem;
  background-color: #303030;
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

button:hover::before {
  transform: scaleX(1);
}
</style>
