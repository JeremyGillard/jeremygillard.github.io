<script setup lang="ts">
import resumeJson from "~~/data/resume.json";
import type { Resume } from "#shared/types/resume";
import type { YearMonth } from "#shared/types/profile";

/** Set only by scripts/resume-pdf.ts from the git-ignored data/private.json; never shipped. */
declare global {
  interface Window {
    __RESUME_PRIVATE__?: { email?: string; phone?: string };
  }
}

definePageMeta({ layout: false });

const { profile } = useProfile();
const now = new Date().toISOString().slice(0, 7) as YearMonth;
const resume = buildResume(profile, resumeJson as Resume, now);

const contactPrivate = ref<{ email?: string; phone?: string }>({});
const ready = ref(false);
onMounted(() => {
  contactPrivate.value = window.__RESUME_PRIVATE__ ?? {};
  ready.value = true;
});
const print = () => window.print();

const contact = computed(() =>
  [resume.location, contactPrivate.value.email, contactPrivate.value.phone, resume.linkedin]
    .filter(Boolean)
    .join(" | "),
);

useHead({
  title: `${resume.name} - Resume`,
  meta: [{ name: "robots", content: "noindex" }],
  // Page-level rules can't be scoped; useHead removes them when leaving the page.
  style: [
    {
      innerHTML: `@page { size: ${resume.paper}; margin: 0; }
html, body { background: #e9e9ec !important; color-scheme: light; }
@media print { html, body { background: #fff !important; } }`,
    },
  ],
});
</script>

<template>
  <!-- Screen only: hidden when printing and in the generated PDF. -->
  <nav class="toolbar" aria-label="Resume">
    <NuxtLink to="/" class="tool">← Back to site</NuxtLink>
    <button type="button" class="tool primary" @click="print">Print / Save as PDF</button>
  </nav>

  <article class="resume" :class="resume.paper" :data-ready="ready || undefined">
    <header>
      <h1 class="name">{{ resume.name }}</h1>
      <p class="headline">{{ resume.headline }}</p>
      <p class="contact">{{ contact }}</p>
    </header>

    <p class="summary">{{ resume.summary }}</p>

    <section>
      <h2>Skills</h2>
      <p>{{ resume.skills.join(", ") }}.</p>
    </section>

    <section>
      <h2>Experience</h2>
      <div v-for="job in resume.experience" :key="job.period + job.company" class="job">
        <p class="date">{{ job.period }} ({{ job.duration }})</p>
        <p class="role">
          <strong>{{ job.company }}</strong
          >{{ job.city ? `, ${job.city}` : "" }} - <strong class="title">{{ job.title }}</strong>
          <template v-for="tag in job.tags" :key="tag"> - {{ tag }}</template>
        </p>
        <ul v-if="job.bullets.length">
          <li v-for="(bullet, i) in job.bullets" :key="i">{{ bullet }}</li>
        </ul>
      </div>
    </section>

    <section>
      <h2>Education &amp; Certifications</h2>
      <p v-for="row in resume.credentials" :key="row.text" class="credential">
        <span class="date">{{ row.date }}</span> {{ row.text }}
      </p>
    </section>
  </article>
</template>

<style scoped>
.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 8.5in;
  margin: 24px auto 0;
  padding: 0 4px;
  font-family: var(--sans);

  @media print {
    display: none;
  }
}

.tool {
  display: inline-flex;
  align-items: center;
  height: 36px;
  padding: 0 14px;
  border: 1px solid #d4d4d8;
  border-radius: 999px;
  background: #fff;
  font: inherit;
  font-size: 0.875rem;
  color: #18181b;
  text-decoration: none;
  cursor: pointer;
  transition:
    background-color 0.2s,
    transform 0.1s ease-out;

  &:hover {
    background: #f4f4f5;
  }

  /* Feedback on press, not release */
  &:active {
    transform: scale(0.97);
  }

  &:focus-visible {
    outline: 2px solid #1f4e79;
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    &:active {
      transform: none;
    }
  }
}

.primary {
  border-color: #1f4e79;
  background: #1f4e79;
  color: #fff;

  &:hover {
    background: #193f62;
  }
}

/* Mirrors the original Google Docs resume: Roboto, navy headings, grey dates. */
.resume {
  --ink: #000;
  --navy: #1f4e79;
  --muted: #7a7a7a;

  box-sizing: border-box;
  width: 8.5in;
  min-height: 11in;
  margin: 16px auto 24px;
  padding: 0.5in 0.85in;
  background: #fff;
  color: var(--ink);
  font-family: Roboto, Arial, sans-serif;
  font-size: 10.5pt;
  line-height: 1.2;
  letter-spacing: 0;
  box-shadow: 0 4px 24px rgb(0 0 0 / 0.12);

  &.A4 {
    width: 210mm;
    min-height: 297mm;
  }

  @media print {
    margin: 0;
    box-shadow: none;
  }
}

p {
  margin: 0;
}

.name {
  margin: 0;
  font-size: 26pt;
  font-weight: 400;
  line-height: 1.1;
  color: var(--navy);
}

.headline {
  font-size: 14pt;
  color: var(--navy);
}

.contact {
  margin-top: 2pt;
  font-size: 9pt;
}

.summary {
  margin-top: 16pt;
}

h2 {
  margin: 12pt 0 4pt;
  font-size: 17pt;
  font-weight: 400;
  color: var(--navy);
}

.job {
  margin-top: 10pt;
  break-inside: avoid;

  &:first-of-type {
    margin-top: 6pt;
  }
}

.date {
  font-size: 9.5pt;
  color: var(--muted);
}

.role {
  margin-top: 1pt;
}

.title {
  font-style: italic;
}

ul {
  margin: 0;
  padding-left: 0.4in;
  list-style: "●  ";

  li::marker {
    font-size: 10pt;
  }
}

.credential {
  margin-top: 2pt;
}
</style>
