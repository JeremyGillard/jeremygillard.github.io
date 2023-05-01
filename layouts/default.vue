<template>
  <main>
    <slot />
  </main>
</template>

<style>
:root {
  --primary-background: #f7f7f7;
  /* --neutral 60, --primary 30, --cta 10 */
}

*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  list-style: none;
  text-decoration: none;
}

html {
  box-sizing: inherit;
  font-size: 0.625rem;
}

body {
  box-sizing: border-box;
  font-family: "Quicksand", sans-serif;
  color: #303030;
  width: 100%;
  height: 100vh;
  background: var(--primary-background);
}
</style>
