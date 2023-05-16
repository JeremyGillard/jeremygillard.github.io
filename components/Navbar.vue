<template>
  <nav class="navbar">
    <ul>
      <li>
        <NuxtLink class="navlink normal-link" to="/projects">
          Projects
        </NuxtLink>
      </li>
      <li>
        <NuxtLink class="navlink normal-link cta" :to="aboutHRef">
          About
        </NuxtLink>
      </li>
      <li>
        <NuxtLink class="navlink normal-link" to="/notes">Notes</NuxtLink>
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

// Due to gsap animation opacity bug
const homePageOpacity = computed(() => {
  if (route.name == "index") {
    return 0;
  } else {
    return 1;
  }
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

.navlink {
  position: relative;
  font-size: var(--fs-500);
  color: var(--clr-primary-400);
  opacity: v-bind(homePageOpacity);
}

a:focus {
  outline-color: var(--clr-primary-400);
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
</style>
