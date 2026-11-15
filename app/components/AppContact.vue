<script setup lang="ts">
const { profile } = useProfile();
const { basics, about } = profile;

/** "https://www.linkedin.com/in/jeremygillard" → "linkedin.com/in/jeremygillard" */
const display = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
</script>

<template>
  <AppSection id="contact" title="Contact">
    <p class="closing">{{ about.closing }}</p>

    <ul class="links">
      <li v-for="link in basics.links" :key="link.url">
        <a class="link" :href="link.url" target="_blank" rel="noopener">
          <span class="label">{{ link.label }}</span>
          <span class="url">{{ display(link.url) }}</span>
          <svg class="arrow" viewBox="0 0 16 16" aria-hidden="true">
            <path
              d="M5 11 11 5M6 5h5v5"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span class="sr-only">(opens in a new tab)</span>
        </a>
      </li>
    </ul>
  </AppSection>
</template>

<style scoped>
.closing {
  margin: 0 0 24px;
  font-size: clamp(1.125rem, 2vw, 1.375rem);
  line-height: 1.4;
  letter-spacing: -0.01em;
  color: var(--text-h);
  text-wrap: pretty;
}

.links {
  margin: 0;
  padding: 0;
  list-style: none;
  border-top: 1px solid var(--border);
}

.link {
  display: grid;
  grid-template-columns: 6rem minmax(0, 1fr) 16px;
  align-items: center;
  gap: 16px;
  padding: 14px 8px;
  margin-inline: -8px;
  border-bottom: 1px solid var(--border);
  color: inherit;
  text-decoration: none;
  transition:
    background-color 0.2s,
    transform 0.1s ease-out;

  &:hover {
    background: var(--soft-bg);

    .arrow {
      color: var(--accent);
      transform: translate(2px, -2px);
    }
  }

  /* Feedback on press, not release */
  &:active {
    transform: scale(0.99);
  }

  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: -2px;
  }
}

.label {
  font-weight: 500;
  color: var(--text-h);
}

.url {
  font-family: var(--mono);
  font-size: 0.8125rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.arrow {
  width: 16px;
  height: 16px;
  transition:
    color 0.2s,
    transform 0.2s ease-out;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}

@media (prefers-reduced-motion: reduce) {
  .link,
  .arrow {
    transform: none !important;
  }
}
</style>
