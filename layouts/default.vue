<template>
  <main>
    <slot />
  </main>
</template>

<style>
:root {
  --primary: #1e2046;
  --second: #313575;
  --third: #6175f9;
  --fourth: #5bd6b8;
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
  font-family: "Work Sans", sans-serif;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(-30deg, var(--second), var(--primary) 60%);
}
</style>
