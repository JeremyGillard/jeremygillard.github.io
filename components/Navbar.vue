<template>
  <nav class="navbar">
    <ul>
      <li>
        <NuxtLink class="navlink" to="/projects"> Projects </NuxtLink>
      </li>
      <li>
        <NuxtLink
          @click.native="toggleIndexRoute"
          class="navlink"
          :to="indexRoute"
        >
          About
        </NuxtLink>
      </li>
      <li>
        <NuxtLink class="navlink" to="/notes">Notes</NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
const indexRoute = useIndexRoute();

const route = useRoute();

const showNavigation = computed(() => {
  if (route.fullPath == "/") {
    return "scaleX(0)";
  } else {
    return "scaleX(1)";
  }
});
</script>

<style scoped>
ul {
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
}
a:focus {
  outline-color: var(--clr-primary-400);
}
.navlink::before {
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
.navlink:hover::before {
  transform: scaleX(1);
}
</style>
