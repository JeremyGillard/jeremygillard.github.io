<template>
  <nav class="navbar">
    <ul>
      <li>
        <NuxtLink class="projects normal-link" to="/projects"
          >Projects</NuxtLink
        >
      </li>
      <li>
        <NuxtLink class="about cta" to="#"> About </NuxtLink>
      </li>
      <li>
        <NuxtLink class="notes normal-link" to="/notes">Notes</NuxtLink>
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
  font-size: var(--text-size-l);
  color: var(--primary-color);
  animation-name: appear;
  animation-duration: 1s;
  animation-fill-mode: backwards;
}

a:focus {
  outline-color: var(--primary-color);
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

.normal-link::before {
  content: "";
  position: absolute;
  display: block;
  width: 100%;
  height: 0.3rem;
  bottom: 0;
  left: 0;
  border-radius: 2rem;
  background-color: #303030;
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.normal-link:hover::before {
  transform: scaleX(1);
}

.cta {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.cta:hover .svg {
  transform: translateY(0.8rem);
  /* margin-top: 0.8rem; */
}

.svg {
  transform: translateY(0.4rem);
  transition: transform 0.3s ease;
  /* margin-top: 0.4rem; */
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
