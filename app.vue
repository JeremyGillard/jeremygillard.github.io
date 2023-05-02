<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
:root {
  --neutral-color: #f7f7f7; /* 60 */
  --primary-color: #303030; /* 30 */
  --calltoa-color: #537ecc; /* 10 */
  --text-size-xl: 5.6rem;
  --text-size-l: 2.4rem;
  --text-size-m: 1.6rem;
  --text-size-s: 1.4rem;
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
  color: var(--primary-color);
  background: var(--neutral-color);
}
</style>
