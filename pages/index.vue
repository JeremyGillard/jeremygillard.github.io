<template>
  <div class="content">
    <div class="mask">
      <h1 class="name" ref="name">Hi, I am Jeremy Gillard</h1>
    </div>
    <svg ref="svg" viewBox="0 -5 200 10">
      <line class="line" ref="line" x1="0" y1="0" x2="0" y2="0" />
    </svg>
    <div class="mask">
      <h2 class="title">
        <DecodedText text="SOFTWARE ENGINEER" />
      </h2>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Power4, gsap } from "gsap";
const name = ref<HTMLHeadingElement>();
const svg = ref<SVGSVGElement>();
const line = ref<SVGElement>();

definePageMeta({
  layout: "intro",
});

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
  stroke: var(--primary-color);
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
  top: var(--text-size-xl);
  font-weight: 500;
  font-size: var(--text-size-xl);
}

.title {
  position: relative;
  bottom: var(--text-size-l);
  font-weight: 500;
  font-size: var(--text-size-l);
  letter-spacing: 0.2rem;
  word-spacing: 0.4rem;
  overflow: hidden;
  margin-top: 0.2rem;
  line-height: 2.2rem;
}
</style>
