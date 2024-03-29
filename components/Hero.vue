<template>
  <section class="hero">
    <ContactSidebar />
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
            <DecodedText text="SOFTWARE ENGINEER" />
          </h2>
        </div>
      </div>
    </header>
  </section>
</template>

<script setup lang="ts">
import { gsap } from "gsap";
const route = useRoute();
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

  const navlinkTween = gsap.from(".navlink", {
    opacity: 0,
    delay: 2.8,
    duration: 0.8,
    ease: "power1.in",
    stagger: 0.2,
  });

  const sidebarTween = gsap.from(".sidebar-link", {
    opacity: 0,
    duration: 0.8,
    ease: "power1.in",
    stagger: 0.2,
  });

  // TODO: avoir une méthode sur le composant .animate
  const nameTween = gsap.from(".name", {
    y: 60,
    duration: 0.6,
    ease: "power4.out",
  });

  const titleTween = gsap.from(".title", {
    y: -40,
    duration: 0.6,
    ease: "power4.out",
  });

  let tl = gsap.timeline();
  tl.set(".line", { opacity: 1 });
  tl.to(".line", { strokeDashoffset: 0, duration: 0.8 });
  tl.add(nameTween);
  tl.add(titleTween);
  tl.to(".line", { strokeDashoffset: -lineLength, duration: 0.6 }, 1.8);
  tl.set(".line", { opacity: 0 });
  tl.add(navlinkTween);
  tl.add(sidebarTween, "-=1");
  tl.addLabel("end");

  if (route.fullPath == "/#about") {
    tl.play("end");
  }
});
</script>

<style scoped>
header {
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: -1;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
}

.hero-anchor-layout {
  /* border: solid 1px black; */
  height: 76vh;
}

svg {
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

.mask {
  overflow: hidden;
}

.name {
  font-weight: 500;
  font-size: var(--fs-800);
}

.title {
  font-weight: 500;
  font-size: var(--fs-700);
  letter-spacing: 0.2rem;
  word-spacing: 0.4rem;
  overflow: hidden;
  margin-top: 0.2rem;
}
</style>
