<template>
  <nav class="navbar">
    <ul>
      <li>
        <NuxtLink class="navlink normal-link" to="/projects">
          Projects
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
          @click.native="toggleIndexRoute"
          class="navlink normal-link cta"
          :to="indexRoute"
        >
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
const indexRoute = useIndexRoute();

function toggleIndexRoute() {
  if (indexRoute.value == "/#about") {
    indexRoute.value = "/";
  } else {
    indexRoute.value = "/#about";
  }
}

const route = useRoute();

const showNavigation = computed(() => {
  if (route.fullPath == "/") {
    return "scaleX(0)";
  } else {
    return "scaleX(1)";
  }
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
  /* border: solid 1px black; */
  height: 16vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--clr-neutral-400);
}
li {
  min-width: 6rem;
}
li:nth-child(2) {
  text-align: center;
}
li:nth-child(3) {
  text-align: right;
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
  height: 2px;
  bottom: 0;
  left: 0;
  border-radius: 2rem;
  background-color: #303030;
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

a.router-link-active::before {
  transform: v-bind(showNavigation);
}

.normal-link:hover::before {
  transform: scaleX(1);
}
</style>
