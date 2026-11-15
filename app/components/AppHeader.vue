<script setup lang="ts">
const { basics } = useProfile().profile;

/** Brand icons by lowercased link label; unknown labels fall back to text. */
const icons = BRAND_ICONS;
</script>

<template>
  <header class="header">
    <NuxtLink to="/" class="name">{{ basics.name }}</NuxtLink>
    <div class="actions">
      <NuxtLink to="/resume" class="nav-link">Resume</NuxtLink>
      <ThemeSwitch />
      <span class="divider" aria-hidden="true" />
      <a
        v-for="link in basics.links"
        :key="link.url"
        class="social"
        :href="link.url"
        target="_blank"
        rel="noopener"
        :aria-label="link.label"
      >
        <svg v-if="icons[link.label.toLowerCase()]" viewBox="0 0 24 24" aria-hidden="true">
          <path fill="currentColor" :d="icons[link.label.toLowerCase()]" />
        </svg>
        <span v-else class="text">{{ link.label }}</span>
      </a>
    </div>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  height: 64px;
  padding: 0 32px;
  border-bottom: 1px solid var(--border);
  box-sizing: border-box;

  @media (max-width: 1024px) {
    padding: 0 16px;
  }
}

.name {
  font-family: var(--brand);
  font-size: 20px;
  letter-spacing: 0.5px;
  color: var(--text-h);
  text-decoration: none;
  white-space: nowrap;
}

.actions {
  display: flex;
  align-items: center;
  gap: 4px;
}

.nav-link {
  margin-right: 12px;

  /* Desktop/tablet only (same 768px breakpoint as the frame borders). */
  @media (max-width: 767px) {
    display: none;
  }

  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text);
  text-decoration: none;
  transition: color 0.25s;

  &:hover {
    color: var(--text-h);
  }

  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
    border-radius: 4px;
  }
}

.divider {
  width: 1px;
  height: 24px;
  margin: 0 8px 0 12px;
  background: var(--border);
}

.social {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 36px;
  height: 36px;
  color: var(--text);
  transition: color 0.25s;

  &:hover {
    color: var(--text-h);
  }

  svg {
    width: 20px;
    height: 20px;
  }

  .text {
    font-size: 0.875rem;
  }
}
</style>
