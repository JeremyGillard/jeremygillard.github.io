<template>
  <div class="content">
    <div class="title">
      <h1>Path page</h1>
      <h2>This is my path</h2>
    </div>
    <a href="/">Go back home</a>
  </div>
</template>

<script>
export default {};
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
  font-weight: 500;
  font-size: 8rem;
  text-align: center;
}

h2 {
  font-weight: 500;
  font-size: 3.2rem;
  letter-spacing: 0.2rem;
  word-spacing: 0.4rem;
  overflow: hidden;
  text-align: center;
}

a {
  position: relative;
  font-size: 2.4rem;
  color: #303030;
  animation-name: appear;
  animation-duration: 1s;
  animation-fill-mode: backwards;
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
