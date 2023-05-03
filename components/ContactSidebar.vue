<template>
  <div class="sidebar">
    <ul>
      <li class="link0">
        <ContactButton
          label="GitHub"
          type="fa-brands"
          id="fa-github"
          url="https://github.com/JeremyGillard"
        />
      </li>
      <li class="link1">
        <ContactButton
          label="LinkedIn"
          type="fa-brands"
          id="fa-linkedin"
          url="https://www.linkedin.com/in/jeremy-gillard/"
        />
      </li>
      <li class="link2">
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

.link0 {
  animation-delay: 5s;
}
.link1 {
  animation-delay: 5.2s;
}
.link2 {
  animation-delay: 5.4s;
}

li {
  animation-name: appear;
  animation-duration: 0.8s;
  animation-timing-function: ease-in;
  animation-fill-mode: backwards;
}

@keyframes appear {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
