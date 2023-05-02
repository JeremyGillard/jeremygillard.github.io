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
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  margin: 0 14vw;
  border: solid 1px black;
}
header {
  position: absolute;
  width: 100%;
  bottom: 14vh;
  bottom: 14svh;
}
</style>
