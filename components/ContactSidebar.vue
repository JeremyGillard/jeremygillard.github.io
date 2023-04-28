<template>
  <div class="sidebar">
    <ul>
      <li>
        <ContactButton
          label="GitHub"
          type="fa-brands"
          id="fa-github"
          url="https://github.com/JeremyGillard"
        />
      </li>
      <li>
        <ContactButton
          label="LinkedIn"
          type="fa-brands"
          id="fa-linkedin"
          url="https://www.linkedin.com/in/jeremy-gillard/"
        />
      </li>
      <li>
        <ContactButton
          label="Mail"
          type="fa-solid"
          id="fa-envelope"
          url="mailto:gillard.jeremy@outlook.fr"
        />
      </li>
    </ul>
  </div>
</template>
<script></script>
<style scoped>
.sidebar {
  /* border: 1px solid black; */
  /* position: absolute;
  right: 40px; */
}
ul {
  display: flex;
  flex-direction: column;
  gap: 64px;
}
</style>
