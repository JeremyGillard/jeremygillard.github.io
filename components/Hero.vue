<template>
  <section class="hero">
    <!-- <ContactSidebar /> -->
    <div class="hero-anchor-layout"></div>
    <header>
      <div>
        <div class="mask">
          <h1 class="name" ref="name">Hi, I am Jeremy Gillard</h1>
        </div>
        <svg ref="svg" viewBox="0 -5 200 10">
          <line class="line" ref="line" x1="0" y1="0" x2="0" y2="0" />
        </svg>
        <div class="mask">
          <h2 class="title">
            <!-- <DecodedText text="SOFTWARE ENGINEER" /> -->
            SOFTWARE ENGINEER
          </h2>
        </div>
      </div>
    </header>
  </section>
</template>

<script setup lang="ts">
import { Power4, gsap } from "gsap";
const name = ref<HTMLHeadingElement>();
const svg = ref<SVGSVGElement>();
const line = ref<SVGElement>();

onMounted(() => {
  const windowWidth = svg.value!.getBoundingClientRect().right;
  const lineLength = name.value!.getBoundingClientRect().right;

  svg.value!.viewBox.baseVal.width = windowWidth;
  line.value!.setAttribute("x2", `${lineLength}`);
  line.value!.setAttribute("stroke-dasharray", `${lineLength}`);
  line.value!.setAttribute("stroke-dashoffset", `${lineLength}`);

  let tl = gsap.timeline();
  tl.set(".line", { opacity: 1 });
  tl.to(".line", { strokeDashoffset: 0, duration: 0.8 });
  tl.to(".name", { top: 0, duration: 0.6, ease: Power4.easeOut });
  tl.to(".title", { bottom: 0, duration: 0.6, ease: Power4.easeOut });
  tl.to(".line", { strokeDashoffset: -lineLength, duration: 0.6 }, 1.8);
  tl.set(".line", { opacity: 0 });
});
</script>

<style scoped>
header {
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
}

.hero-anchor-layout {
  height: 80vh;
}

svg {
  /* border: solid 1px black; */
  position: fixed;
  left: 0;
  transform: translateY(-6px);
  width: 100vw;
  height: 10px;
  fill: none;
}

.line {
  opacity: 0;
  stroke: var(--clr-primary-400);
  stroke-width: 2.4px;
  stroke-linecap: round;
}
.content {
  user-select: none;
}

.mask {
  overflow: hidden;
  /* border: solid 1px blue; */
}

.name {
  position: relative;
  top: calc(var(--fs-800) + 1rem);
  font-weight: 500;
  font-size: var(--fs-800);
}

.title {
  position: relative;
  bottom: calc(var(--fs-700) + 1rem);
  font-weight: 500;
  font-size: var(--fs-700);
  letter-spacing: 0.2rem;
  word-spacing: 0.4rem;
  overflow: hidden;
  margin-top: 0.2rem;
  line-height: 2.2rem;
}
</style>
