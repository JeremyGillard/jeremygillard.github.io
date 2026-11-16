<script setup lang="ts">
const { profile } = useProfile();
const { basics, experience, certifications } = profile;

const current = experience.find((e) => e.end === null);
const earned = certifications.filter((c) => c.issued);

/** Jump to the skills search and focus it; the plain #hash stays as no-JS fallback. */
function toSearch(e: MouseEvent) {
  const el = document.getElementById("skills-search");
  if (!el) return;
  e.preventDefault();
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
  el.focus({ preventScroll: true });
  history.replaceState(null, "", "#skills-search");
}
</script>

<template>
  <AppSection aria-labelledby="hero-title">
    <div class="hero">
      <h1 id="hero-title" class="headline">{{ basics.headline }}</h1>
      <p class="summary">{{ basics.summary }}</p>

      <ul class="meta">
        <li>{{ basics.location }}</li>
        <li v-if="current">
          {{ current.employmentType === "freelance" ? "Freelance" : "Currently" }} at
          <span class="strong">{{ current.company }}</span>
        </li>
      </ul>

      <ul class="certs" aria-label="Certifications">
        <li v-for="cert in earned" :key="cert.id">
          <a class="cert" :href="`#cert-${cert.id}`" :title="cert.name">
            <!-- ids are the official exam codes (cka, az-900…) -->
            {{ cert.id.toUpperCase() }}
          </a>
        </li>
      </ul>

      <div class="actions">
        <a class="action primary" href="#contact">Get in touch</a>
        <a class="action" href="#skills-search" @click="toSearch">
          Looking for a specific skill?
          <kbd class="kbd" aria-hidden="true">/</kbd>
        </a>
      </div>
    </div>
  </AppSection>
</template>

<style scoped>
/* Adds to AppSection padding (multi-root, so its class can't be styled from here). */
.hero {
  padding-block: 64px 32px;

  @media (max-width: 1024px) {
    padding-block: 32px 16px;
  }
}

.headline {
  margin: 0;
  font-size: clamp(2.25rem, 6vw, 4rem);
  font-weight: 600;
  line-height: 1.05;
  letter-spacing: -0.03em;
  color: var(--text-h);
}

.summary {
  max-width: 40ch;
  margin: 20px 0 0;
  font-size: clamp(1.125rem, 2vw, 1.375rem);
  line-height: 1.4;
  letter-spacing: -0.01em;
  text-wrap: pretty;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin: 40px 0 0;
}

.action {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  height: 44px;
  padding: 0 18px;
  border: 1px solid var(--border);
  border-radius: 999px;
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--text-h);
  text-decoration: none;
  transition:
    border-color 0.2s,
    background-color 0.2s,
    transform 0.1s ease-out;

  &:hover {
    border-color: var(--accent-border);
    background: var(--accent-bg);
  }

  &:active {
    transform: scale(0.96);
  }

  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }

  &.primary {
    border-color: var(--accent);
    background: var(--accent);
    color: var(--accent-fg);

    &:hover {
      background: var(--accent);
      opacity: 0.9;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    &:active {
      transform: none;
    }
  }
}

.kbd {
  min-width: 20px;
  padding: 1px 6px;
  border: 1px solid var(--border);
  border-radius: 6px;
  font-family: var(--mono);
  font-size: 0.75rem;
  text-align: center;
  color: var(--text);

  /* No keyboard shortcut on touch devices. */
  @media (hover: none) {
    display: none;
  }
}

.meta {
  display: flex;
  flex-wrap: wrap;
  gap: 4px 0;
  margin: 24px 0 0;
  padding: 0;
  list-style: none;
  font-size: 0.875rem;

  li + li::before {
    content: "·";
    margin: 0 10px;
    opacity: 0.5;
  }
}

.strong {
  color: var(--text-h);
}

.certs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 32px 0 0;
  padding: 0;
  list-style: none;
}

.cert {
  display: inline-flex;
  align-items: center;
  height: 32px;
  padding: 0 12px;
  border: 1px solid var(--border);
  border-radius: 999px;
  font-family: var(--mono);
  font-size: 0.8125rem;
  letter-spacing: 0.02em;
  color: var(--text-h);
  text-decoration: none;
  transition:
    border-color 0.2s,
    background-color 0.2s,
    transform 0.1s ease-out;

  &:hover {
    border-color: var(--accent-border);
    background: var(--accent-bg);
  }

  /* Feedback on press, not release */
  &:active {
    transform: scale(0.96);
  }

  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    &:active {
      transform: none;
    }
  }
}
</style>
