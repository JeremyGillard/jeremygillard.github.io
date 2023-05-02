<template>
  <div class="content">
    <div class="title">
      <h1>Hi, I am Jeremy Gillard</h1>
      <h2>
        <DecodedText text="SOFTWARE ENGINEER" />
      </h2>
    </div>
    <!-- <ContactSidebar /> -->
  </div>
</template>

<script>
definePageMeta({
  layout: "intro",
});
</script>

<style scoped>
.title {
  user-select: none;
}

h1 {
  font-weight: 500;
  font-size: 5.6rem;
}

h2 {
  font-weight: 500;
  font-size: 2.4rem;
  letter-spacing: 0.2rem;
  word-spacing: 0.4rem;
  overflow: hidden;
  margin-top: 0.2rem;
  line-height: 2.2rem;
}
</style>
