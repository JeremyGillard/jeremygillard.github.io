<script setup lang="ts">
const { profile } = useProfile();
const { selected, toggle, clear } = useSkillSelection();

const allGroups = groupByCategory(profile.skills);
const usage = skillUsage(profile);
const current = computed(() => (selected.value ? usage.get(selected.value) : undefined));

/* Recruiter search: filters the chips and answers "do you have X?" directly. */
const query = ref("");
const input = useTemplateRef("input");
const searchId = "skills-search"; // hero CTA targets it
const result = computed(() => searchProfile(query.value, profile));
const searching = computed(() => normalize(query.value) !== "");
const earned = computed(() => result.value.certifications.filter((c) => c.issued));
const inProgress = computed(() => result.value.certifications.filter((c) => c.inProgress));
const verdict = computed(() =>
  result.value.skills.length || earned.value.length
    ? "yes"
    : inProgress.value.length
      ? "progress"
      : "no",
);

const groups = computed(() => {
  if (!searching.value) return allGroups;
  const hits = new Set(result.value.skills.map((s) => s.id));
  return allGroups
    .map((g) => ({ ...g, skills: g.skills.filter((s) => hits.has(s.id)) }))
    .filter((g) => g.skills.length > 0);
});

/* Selected from elsewhere (Experience badge) while filtered out: drop the filter so its chip shows. */
watch(selected, (id) => {
  if (id && !groups.value.some((g) => g.skills.some((s) => s.id === id))) query.value = "";
});

/** Enter: open the usage panel of the best match. */
function pickFirst() {
  const first = result.value.skills[0];
  if (first) selected.value = first.id;
}

/** "/" focuses the search from anywhere, unless the user is already typing. */
function onKey(e: KeyboardEvent) {
  const t = e.target as HTMLElement | null;
  if (e.key !== "/" || e.metaKey || e.ctrlKey || e.altKey) return;
  if (t?.closest("input, textarea, select, [contenteditable]")) return;
  e.preventDefault();
  input.value?.focus();
}
onMounted(() => window.addEventListener("keydown", onKey));
onBeforeUnmount(() => window.removeEventListener("keydown", onKey));
</script>

<template>
  <AppSection id="skills" title="Skills">
    <div class="search">
      <label :for="searchId" class="search-label">Search a skill or certification</label>
      <div class="field">
        <svg class="icon" viewBox="0 0 16 16" aria-hidden="true">
          <circle cx="7" cy="7" r="4.5" fill="none" stroke="currentColor" stroke-width="1.5" />
          <path
            d="m10.5 10.5 3 3"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
          />
        </svg>
        <input
          :id="searchId"
          ref="input"
          v-model="query"
          type="search"
          class="input"
          placeholder="Kubernetes, k8s, CKA…"
          autocomplete="off"
          spellcheck="false"
          @keydown.enter.prevent="pickFirst"
          @keydown.esc="query = ''"
        />
        <kbd class="kbd" aria-hidden="true">/</kbd>
      </div>

      <p class="answer" :class="searching && verdict" aria-live="polite">
        <template v-if="!searching">Or select a skill below to see where I used it.</template>
        <template v-else-if="verdict === 'no'">
          <strong>No</strong>, “{{ query.trim() }}” isn't in my profile.
          <a href="#contact">Ask me about it</a>.
        </template>
        <template v-else>
          <strong>{{ verdict === "yes" ? "Yes" : "In progress" }}</strong>
          <template v-if="earned.length">
            · certified
            <template v-for="(c, i) in earned" :key="c.id"
              >{{ i ? ", " : " " }}<a :href="`#cert-${c.id}`">{{ c.id.toUpperCase() }}</a></template
            >
          </template>
          <template v-if="inProgress.length">
            · preparing
            <template v-for="(c, i) in inProgress" :key="c.id"
              >{{ i ? ", " : " " }}<a :href="`#cert-${c.id}`">{{ c.id.toUpperCase() }}</a></template
            >
          </template>
          <template v-if="result.skills.length">
            · press Enter to see where I used {{ result.skills[0]!.name }}
          </template>
        </template>
      </p>
    </div>

    <div v-for="group in groups" :key="group.category" class="group">
      <h3 class="category">{{ CATEGORY_LABELS[group.category] }}</h3>
      <ul class="chips">
        <li v-for="skill in group.skills" :key="skill.id">
          <button
            :id="`skill-${skill.id}`"
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
        <template
          v-if="
            current.experience.length || current.projects.length || current.certifications.length
          "
        >
          <p class="usage-title">Used in</p>
          <ul class="usage-list">
            <li v-for="role in current.experience" :key="role.id">
              <a :href="`#${role.id}`">{{ role.title }}</a>
              <span class="where">
                · {{ role.company }} · {{ formatPeriod(role.start, role.end) }}</span
              >
            </li>
            <li v-for="project in current.projects" :key="project.id">
              <a :href="`#project-${project.id}`">{{ project.name }}</a>
              <span class="where"> · personal project</span>
            </li>
            <li v-for="cert in current.certifications" :key="cert.id">
              <a :href="`#cert-${cert.id}`">{{ cert.name }}</a>
              <span class="where">
                · {{ cert.issuer }}{{ cert.inProgress ? " · in progress" : "" }}</span
              >
            </li>
          </ul>
        </template>
        <p v-else class="usage-empty">Not linked to a role, project or certification yet.</p>
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

.search {
  margin-bottom: 28px;
}

.search-label {
  display: block;
  margin-bottom: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-h);
}

.field {
  position: relative;
  display: flex;
  align-items: center;
}

.icon {
  position: absolute;
  left: 14px;
  width: 16px;
  height: 16px;
  pointer-events: none;
}

.input {
  width: 100%;
  height: 44px;
  padding: 0 40px;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: var(--soft-bg);
  font: inherit;
  font-size: 1rem;
  color: var(--text-h);
  box-sizing: border-box;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;

  &::placeholder {
    color: var(--text);
    opacity: 0.7;
  }

  &:focus {
    outline: none;
    border-color: var(--accent);
    box-shadow: 0 0 0 3px var(--accent-bg);
  }

  /* Native clear button would collide with the "/" hint. */
  &::-webkit-search-cancel-button {
    display: none;
  }
}

.kbd {
  position: absolute;
  right: 12px;
  min-width: 20px;
  padding: 1px 6px;
  border: 1px solid var(--border);
  border-radius: 6px;
  font-family: var(--mono);
  font-size: 0.75rem;
  text-align: center;
  pointer-events: none;
}

.input:focus + .kbd {
  opacity: 0;
}

.answer {
  min-height: 1.5em;
  margin: 10px 0 0;
  font-size: 0.875rem;

  strong {
    font-weight: 600;
    color: var(--text-h);
  }

  &.yes strong {
    color: var(--accent);
  }

  a {
    color: var(--text-h);
    text-decoration-color: var(--accent-border);
    text-underline-offset: 3px;
  }
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
