<template>
  <nav class="navbar">
    <ul>
      <li>
        <a class="path" href="/path"> Path </a>
      </li>
      <li>
        <a class="projects" href="#"> Projects </a>
      </li>
      <li>
        <a class="skills" href="#"> Skills </a>
      </li>
      <li>
        <a class="notes" href="#"> Notes </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {};
</script>

<style scoped>
.navbar {
  position: absolute;
  bottom: 14rem;
  left: 0;
  right: 0;
  /* margin-left: 18.8rem;
  margin-right: 18.8rem; */
  /* border: solid 1px black; */
}

ul {
  display: flex;
  justify-content: space-evenly;
}

a {
  position: relative;
  font-size: 2.4rem;
  color: #303030;
  animation-name: appear;
  animation-duration: 1s;
  animation-fill-mode: backwards;
}

.path {
  animation-delay: 4s;
}

.projects {
  animation-delay: 4.2s;
}

.skills {
  animation-delay: 4.4s;
}

.notes {
  animation-delay: 4.6s;
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

@keyframes appear {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
