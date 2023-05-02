<template>
  <div class="layout">
    <header>
      <Navbar />
    </header>
    <main>
      <slot />
    </main>
  </div>
</template>

<style scoped>
.layout {
  position: relative;
  margin: 0 14vw;
  /* border: solid 1px black; */
}
header {
  margin: 6vh 0;
}
</style>
