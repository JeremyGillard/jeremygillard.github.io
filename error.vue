<template>
  <div class="content">
    <div class="title">
      <h1>{{ error.statusCode }}</h1>
      <h2>{{ error.message }}</h2>
    </div>
    <a @click="handleError">Go back home</a>
  </div>
</template>

<script setup lang="ts">
const error = useError();

const handleError = () => clearError({ redirect: "/" });
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8rem;
  height: 100vh;
}

.title {
  user-select: none;
}

h1 {
  font-weight: 500;
  font-size: var(--text-size-xl);
  text-align: center;
}

h2 {
  font-weight: 500;
  font-size: var(--text-size-l);
}

a {
  position: relative;
  font-size: var(--text-size-l);
  color: #303030;
  animation-name: appear;
  animation-duration: 1s;
  animation-fill-mode: backwards;
  cursor: pointer;
  border: none;
  background-color: var(--neutral-color);
}

a::before {
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

a:hover::before {
  transform: scaleX(1);
}
</style>
