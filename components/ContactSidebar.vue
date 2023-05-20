<template>
  <div class="sidebar">
    <ul>
      <li class="sidebar-link">
        <ContactButton
          label="GitHub"
          type="fa-brands"
          id="fa-github"
          url="https://github.com/JeremyGillard"
        />
      </li>
      <li class="sidebar-link">
        <ContactButton
          label="LinkedIn"
          type="fa-brands"
          id="fa-linkedin"
          url="https://www.linkedin.com/in/jeremy-gillard/"
        />
      </li>
      <li class="sidebar-link">
        <ContactButton
          label="Mail"
          type="fa-solid"
          id="fa-envelope"
          url="mailto:gillard.jeremy@outlook.fr?subject=Mail from jeremygillard.github.io"
        />
      </li>
    </ul>
  </div>
</template>

<style scoped>
.sidebar {
  /* border: solid 1px black; */
  height: 99vh;
  position: absolute;
  right: 2vw;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
ul {
  display: flex;
  flex-direction: column;
  gap: 64px;
}
</style>
