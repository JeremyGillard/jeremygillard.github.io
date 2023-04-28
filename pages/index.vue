<template>
  <ContactSidebar />
  <div class="content">
    <div class="title">
      <h1>Hi, I am Jeremy Gillard</h1>
      <h2>Software Engineer</h2>
    </div>
  </div>
</template>

<script setup>
import ContactSidebar from "@/components/ContactSidebar.vue";
</script>

<style scoped>
.content {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
h1 {
  font-weight: 500;
  font-size: 5.6rem;
}

h2 {
  font-weight: 500;
  font-size: 3.2rem;
}
</style>
