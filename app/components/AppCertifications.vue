<script setup lang="ts">
const { profile } = useProfile();
const { dims } = useSkillSelection();
/** Earned (newest first), then in progress. */
const certifications = profile.certifications.toSorted((a, b) =>
  (b.issued ?? "").localeCompare(a.issued ?? ""),
);

/** "CKA: Certified Kubernetes Administrator" → "Certified Kubernetes Administrator"; the code is shown separately. */
const title = (name: string) => name.replace(/^[A-Z0-9-]+:\s*/, "");
</script>

<template>
  <AppSection id="certifications" title="Certifications">
    <ul class="list">
      <li
        v-for="cert in certifications"
        :id="`cert-${cert.id}`"
        :key="cert.id"
        class="item"
        :class="{ dimmed: dims(cert.skills), planned: cert.inProgress }"
      >
        <component
          :is="cert.url ? 'a' : 'div'"
          class="cert"
          :href="cert.url"
          :target="cert.url ? '_blank' : undefined"
          :rel="cert.url ? 'noopener' : undefined"
        >
          <!-- ids are the official exam codes (cka, az-900…) -->
          <span class="code">{{ cert.id.toUpperCase() }}</span>
          <span class="info">
            <span class="name">{{ title(cert.name) }}</span>
            <span class="issuer">{{ cert.issuer }}</span>
          </span>
          <span class="dates">
            <time v-if="cert.issued" :datetime="cert.issued">{{ formatMonth(cert.issued) }}</time>
            <span v-else class="badge">In progress</span>
            <span v-if="cert.expires" class="expires">
              Valid until <time :datetime="cert.expires">{{ formatMonth(cert.expires) }}</time>
            </span>
          </span>
          <svg v-if="cert.url" class="arrow" viewBox="0 0 16 16" aria-hidden="true">
            <path
              d="M5 11 11 5M6 5h5v5"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span v-if="cert.url" class="sr-only">(opens credential in a new tab)</span>
        </component>
      </li>
    </ul>
  </AppSection>
</template>

<style scoped>
.list {
  margin: 0;
  padding: 0;
  list-style: none;
  border-top: 1px solid var(--border);
}

.item {
  scroll-margin-top: 24px;
  transition: opacity 0.2s;
}

.dimmed {
  opacity: 0.35;
}

/* In progress: same row, quieter code + name. */
.planned .code,
.planned .name {
  color: var(--text);
}

.badge {
  padding: 1px 8px;
  border: 1px dashed var(--border);
  border-radius: 999px;
  font-size: 0.75rem;
}

.cert {
  display: grid;
  grid-template-columns: 4.5rem minmax(0, 1fr) auto 16px;
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

  @media (max-width: 480px) {
    grid-template-columns: 4.5rem minmax(0, 1fr) 16px;

    .dates {
      grid-column: 2;
      grid-row: 2;
      align-items: flex-start;
    }
  }
}

a.cert {
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

.code {
  font-family: var(--mono);
  font-size: 0.8125rem;
  letter-spacing: 0.02em;
  color: var(--text-h);
}

.info {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.name {
  font-weight: 500;
  line-height: 1.4;
  color: var(--text-h);
  text-wrap: pretty;
}

.issuer {
  font-size: 0.875rem;
}

.dates {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-size: 0.875rem;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

.expires {
  font-size: 0.75rem;
  opacity: 0.7;
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
  .cert,
  .arrow {
    transform: none !important;
  }
}
</style>
