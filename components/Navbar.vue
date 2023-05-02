<template>
  <nav class="navbar">
    <ul>
      <li>
        <NuxtLink class="projects normal-link" to="/projects"
          >Projects</NuxtLink
        >
      </li>
      <li>
        <NuxtLink class="about cta" to="/about">
          About
          <svg
            class="svg"
            width="31"
            height="14"
            viewBox="0 0 31 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 2L14.3095 11.1182C15.0167 11.642 15.9833 11.642 16.6905 11.1182L29 2"
              stroke="#303030"
              stroke-width="3"
              stroke-linecap="round"
            />
          </svg>
        </NuxtLink>
      </li>
      <li>
        <NuxtLink class="notes normal-link" to="/notes">Notes</NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
// import { gsap } from "gsap";

// gsap.to(".svg", { y: "0.8rem", duration: 1 });
</script>

<style scoped>
ul {
  display: flex;
  justify-content: space-around;
}

a {
  position: relative;
  font-size: 2.4rem;
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
