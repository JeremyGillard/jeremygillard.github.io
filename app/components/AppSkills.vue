<script setup lang="ts">
const { profile } = useProfile();
const { selected, toggle, clear } = useSkillSelection();

const groups = groupByCategory(profile.skills);
const usage = skillUsage(profile);
const current = computed(() => (selected.value ? usage.get(selected.value) : undefined));
</script>

<template>
  <AppSection id="skills" title="Skills">
    <p class="hint">Select a skill to see where I used it.</p>

    <div v-for="group in groups" :key="group.category" class="group">
      <h3 class="category">{{ CATEGORY_LABELS[group.category] }}</h3>
      <ul class="chips">
        <li v-for="skill in group.skills" :key="skill.id">
          <button
            type="button"
            class="chip"
            :aria-pressed="selected === skill.id"
            @click="toggle(skill.id)"
          >
            {{ skill.name }}
          </button>
        </li>
      </ul>

      <!-- Usage sits right under the group that holds the selected chip. -->
      <div
        v-if="current && group.skills.some((s) => s.id === selected)"
        class="usage"
        aria-live="polite"
      >
        <template v-if="current.experience.length || current.certifications.length">
          <p class="usage-title">Used in</p>
          <ul class="usage-list">
            <li v-for="role in current.experience" :key="role.id">
              <a :href="`#${role.id}`">{{ role.title }}</a>
              <span class="where">
                · {{ role.company }} · {{ formatPeriod(role.start, role.end) }}</span
              >
            </li>
            <li v-for="cert in current.certifications" :key="cert.id">
              <a :href="`#cert-${cert.id}`">{{ cert.name }}</a>
              <span class="where"> · {{ cert.issuer }}</span>
            </li>
          </ul>
        </template>
        <p v-else class="usage-empty">Not linked to a role or certification yet.</p>
        <button type="button" class="clear" @click="clear">Clear</button>
      </div>
    </div>
  </AppSection>
</template>

<style scoped>
ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.hint {
  margin: 0 0 24px;
  font-size: 0.875rem;
}

.group + .group {
  margin-top: 24px;
}

.category {
  margin: 0 0 10px;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-h);
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.chip {
  display: inline-flex;
  align-items: center;
  height: 30px;
  padding: 0 12px;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: none;
  font: inherit;
  font-size: 0.8125rem;
  color: var(--text);
  cursor: pointer;
  transition:
    color 0.2s,
    border-color 0.2s,
    background-color 0.2s,
    transform 0.1s ease-out;

  &:hover {
    color: var(--text-h);
    border-color: var(--accent-border);
  }

  /* Feedback on press, not release */
  &:active {
    transform: scale(0.96);
  }

  &[aria-pressed="true"] {
    color: var(--text-h);
    border-color: var(--accent);
    background: var(--accent-bg);
  }

  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
}

.usage {
  position: relative;
  margin-top: 12px;
  padding: 14px 16px;
  border: 1px solid var(--accent-border);
  border-radius: 12px;
  background: var(--accent-bg);
  font-size: 0.875rem;
}

.usage-title {
  margin: 0 0 6px;
  font-weight: 500;
  color: var(--text-h);
}

.usage-list li + li {
  margin-top: 4px;
}

.usage-list a {
  color: var(--text-h);
  text-decoration-color: var(--accent-border);
  text-underline-offset: 3px;
}

.usage-empty {
  margin: 0;
  padding-right: 4rem;
}

.clear {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 2px 8px;
  border: none;
  border-radius: 6px;
  background: none;
  font: inherit;
  font-size: 0.8125rem;
  color: var(--text);
  cursor: pointer;

  &:hover {
    color: var(--text-h);
  }

  &:focus-visible {
    outline: 2px solid var(--accent);
  }
}

@media (prefers-reduced-motion: reduce) {
  .chip:active {
    transform: none;
  }
}
</style>
