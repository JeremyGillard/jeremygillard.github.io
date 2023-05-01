<template>
  <div class="content">
    <!-- <div class="square"></div> -->
    <div class="title">
      <h1>Hi, I am Jeremy Gillard</h1>
      <h2>
        <DecodedText text="SOFTWARE ENGINEER" />
      </h2>
    </div>
    <ContactSidebar />
    <Navbar />
  </div>
</template>

<script></script>

<style scoped>
.content {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
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
}

.square {
  width: 100px;
  height: 100px;
  background-color: #537ecc;
}
</style>
