<script setup lang="ts">
const colorMode = useColorMode();
const isDark = computed(() => colorMode.value === "dark");

function toggle() {
  colorMode.preference = isDark.value ? "light" : "dark";
}
</script>

<template>
  <ClientOnly>
    <button
      type="button"
      class="switch"
      role="switch"
      :aria-checked="isDark"
      :title="isDark ? 'Switch to light theme' : 'Switch to dark theme'"
      aria-label="Toggle dark mode"
      @click="toggle"
    >
      <span class="knob">
        <svg v-if="isDark" viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M12.1 22h-.9A10 10 0 0 1 9.2 2.3a1 1 0 0 1 1.2 1.3 8 8 0 0 0 10 10.1 1 1 0 0 1 1.3 1.2A10 10 0 0 1 12.1 22Z"
          />
        </svg>
        <svg v-else viewBox="0 0 24 24" aria-hidden="true">
          <g fill="currentColor">
            <circle cx="12" cy="12" r="5" />
            <path
              d="M12 1a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V2a1 1 0 0 1 1-1Zm0 19a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1ZM1 12a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2H2a1 1 0 0 1-1-1Zm19 0a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2h-1a1 1 0 0 1-1-1ZM4.2 4.2a1 1 0 0 1 1.4 0l.7.7a1 1 0 0 1-1.4 1.4l-.7-.7a1 1 0 0 1 0-1.4Zm13.5 13.5a1 1 0 0 1 1.4 0l.7.7a1 1 0 0 1-1.4 1.4l-.7-.7a1 1 0 0 1 0-1.4ZM4.2 19.8a1 1 0 0 1 0-1.4l.7-.7a1 1 0 0 1 1.4 1.4l-.7.7a1 1 0 0 1-1.4 0ZM17.7 6.3a1 1 0 0 1 0-1.4l.7-.7a1 1 0 0 1 1.4 1.4l-.7.7a1 1 0 0 1-1.4 0Z"
            />
          </g>
        </svg>
      </span>
    </button>
    <template #fallback>
      <span class="switch" aria-hidden="true" />
    </template>
  </ClientOnly>
</template>

<style scoped>
.switch {
  position: relative;
  display: block;
  flex-shrink: 0;
  width: 40px;
  height: 22px;
  padding: 0;
  border: 1px solid var(--border);
  border-radius: 11px;
  background: var(--soft-bg);
  cursor: pointer;
  box-sizing: border-box;
  transition: border-color 0.25s;

  &:hover {
    border-color: var(--accent-border);
  }
  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
}

.knob {
  position: absolute;
  top: 1px;
  left: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--bg);
  color: var(--text);
  box-shadow:
    0 1px 2px rgba(0, 0, 0, 0.04),
    0 1px 2px rgba(0, 0, 0, 0.06);
  transition: transform 0.25s;

  svg {
    width: 12px;
    height: 12px;
  }
}

.switch[aria-checked="true"] .knob {
  transform: translateX(18px);
}
</style>
