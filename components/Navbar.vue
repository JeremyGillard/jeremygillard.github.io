<template>
  <nav class="navbar">
    <ul>
      <li>
        <NuxtLink class="projects normal-link" to="/projects"
          >Projects</NuxtLink
        >
      </li>
      <li>
        <NuxtLink class="about cta" :to="aboutHRef"> About </NuxtLink>
      </li>
      <li>
        <NuxtLink class="notes normal-link" to="/notes">Notes</NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
const route = useRoute();
const aboutHRef = computed(() => {
  if (route.name == "index") {
    if (route.fullPath == "/#timeline-anchor-layout") {
      return "/";
    } else {
      return "#timeline-anchor-layout";
    }
  }
  return "/";
});
</script>

<style scoped>
ul {
  height: 10vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10vh;
  background: var(--clr-neutral-400);
}

a {
  position: relative;
  font-size: var(--fs-500);
  color: var(--clr-primary-400);
  animation-name: appear;
  animation-duration: 1s;
  animation-fill-mode: backwards;
}

a:focus {
  outline-color: var(--clr-primary-400);
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
  height: 3px;
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
