<template>
  <header>
    <h1>Hi, I'm Jeremy</h1>
    <h2>Full Stack Developer</h2>
  </header>
  <p>
    From analysis (UML, SCRUM) to concrete application development in Java and
    C++, my studies has also given me a solid background in linux system
    administration and database management (from modeling to implementation).
    via MySql or PostgreSql). Thanks to my option, I was also able to enrich my
    knowledge on subjects such as the many protocols that make up the Internet
    and how it works, IOT, embedded systems or even certain machine learning
    techniques. During my last year of study, I focused more precisely on the
    fields of web development and data science.
  </p>
  <ul class="media">
    <li>
      <a href="https://www.linkedin.com/in/gillard-jeremy/" target="_blank">
        <i class="fab fa-linkedin fa-2x"></i>
      </a>
    </li>
    <li>
      <a href="https://github.com/JeremyGillard" target="_blank">
        <i class="fab fa-github fa-2x"></i>
      </a>
    </li>
  </ul>
</template>

<script setup>
// import * as d3 from "d3";
</script>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 3.2rem;
  color: white;
}

h2 {
  font-weight: 500;
  font-size: 1.6rem;
  color: white;
}

p {
  font-family: "Open Sans", sans-serif;
  max-width: 620px;
  color: white;
}

main {
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.media {
  display: flex;
  flex-direction: row;
  gap: 32px;
}

i {
  background: linear-gradient(-30deg, var(--fourth), var(--third));
  background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: background 300ms ease-out;
}
i:hover {
  background: var(--third);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
