<template>
  <div class="layout">
    <slot name="hero"></slot>
    <header>
      <Navbar />
    </header>
    <slot></slot>
  </div>
</template>

<style scoped>
.layout {
  max-width: 64vw;
  margin: 0 auto;
}

@media (width < 600px) {
  .layout {
    max-width: 80vw;
  }
}

header {
  position: sticky;
  top: 0;
}
</style>
