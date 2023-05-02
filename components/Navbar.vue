<template>
  <nav class="navbar">
    <ul>
      <li>
        <NuxtLink class="projects" to="/projects">Projects</NuxtLink>
      </li>
      <li>
        <NuxtLink class="about" to="/about">About</NuxtLink>
      </li>
      <li>
        <NuxtLink class="notes" to="/notes">Notes</NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
ul {
  display: flex;
  justify-content: space-around;
}

a {
  position: relative;
  font-size: 2.4rem;
  color: #303030;
  animation-name: appear;
  animation-duration: 1s;
  animation-fill-mode: backwards;
}

.about {
  animation-delay: 4.2s;
}

.projects {
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
