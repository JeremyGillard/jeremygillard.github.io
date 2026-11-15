<template>
  <div class="frame">
    <AppHeader />
    <div class="ticks" />
    <main class="main">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.frame {
  width: 1126px;
  max-width: 100%;
  margin: 0 auto;
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  /* Side borders only from tablet up; edge-to-edge on mobile (like viteplus.dev). */
  @media (min-width: 768px) {
    border-inline: 1px solid var(--border);
  }
}

.main {
  flex-grow: 1;
}
</style>
