<template>
  <main>
    <slot />
  </main>
</template>

<style>
:root {
  --primary-background: #141e30;
  --second-background: #243b55;
  --primary-text: #f8f8f9;
  --second-text: #86a1c1;
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
  background: var(--primary-background);
  background: -webkit-linear-gradient(
    to right,
    var(--second-background),
    var(--primary-background)
  );
  background: linear-gradient(
    to right,
    var(--second-background),
    var(--primary-background)
  );
}
</style>
