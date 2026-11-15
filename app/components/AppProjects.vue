<script setup lang="ts">
const { profile } = useProfile();
const { dims } = useSkillSelection();

const skillNames = new Map(profile.skills.map((s) => [s.id, s.name]));
</script>

<template>
  <AppSection v-if="profile.projects.length" id="projects" title="Projects">
    <ul class="list">
      <li
        v-for="project in profile.projects"
        :id="`project-${project.id}`"
        :key="project.id"
        class="project"
        :class="{ dimmed: dims(project.skills) }"
      >
        <div class="info">
          <!-- Name opens the live site, else the repo. -->
          <a
            v-if="project.url ?? project.repo"
            class="name"
            :href="project.url ?? project.repo"
            target="_blank"
            rel="noopener"
            >{{ project.name }}</a
          >
          <span v-else class="name">{{ project.name }}</span>
          <span class="description">{{ project.description }}</span>
          <span v-if="project.skills.length" class="skills">
            {{ project.skills.map((id) => skillNames.get(id) ?? id).join(" · ") }}
          </span>
        </div>

        <div v-if="project.repo || project.url" class="links">
          <a
            v-if="project.repo"
            class="link"
            :href="project.repo"
            target="_blank"
            rel="noopener"
            :aria-label="`${project.name} on GitHub (opens in a new tab)`"
          >
            <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="currentColor" :d="BRAND_ICONS.github" />
            </svg>
            <span>Code</span>
          </a>
          <a
            v-if="project.url"
            class="link"
            :href="project.url"
            target="_blank"
            rel="noopener"
            :aria-label="`${project.name} live site (opens in a new tab)`"
          >
            <span>Site</span>
            <svg class="icon arrow" viewBox="0 0 16 16" aria-hidden="true">
              <path
                d="M5 11 11 5M6 5h5v5"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </a>
        </div>
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

.project {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 16px;
  padding: 14px 0;
  border-bottom: 1px solid var(--border);
  scroll-margin-top: 24px;
  transition: opacity 0.2s;

  @media (max-width: 480px) {
    grid-template-columns: minmax(0, 1fr);
    gap: 10px;
  }
}

.dimmed {
  opacity: 0.35;
}

.info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.name {
  align-self: flex-start;
  font-weight: 500;
  line-height: 1.4;
  color: var(--text-h);
  text-decoration: none;
}

a.name:hover {
  color: var(--accent);
}

.description {
  font-size: 0.875rem;
  text-wrap: pretty;
}

.skills {
  margin-top: 4px;
  font-family: var(--mono);
  font-size: 0.75rem;
  opacity: 0.7;
}

.links {
  display: flex;
  gap: 8px;
}

.link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border: 1px solid var(--border);
  border-radius: 999px;
  font-size: 0.8125rem;
  color: var(--text);
  text-decoration: none;
  white-space: nowrap;
  transition:
    color 0.2s,
    background-color 0.2s,
    transform 0.1s ease-out;

  &:hover {
    color: var(--text-h);
    background: var(--soft-bg);

    .arrow {
      color: var(--accent);
      transform: translate(2px, -2px);
    }
  }

  &:active {
    transform: scale(0.97);
  }
}

.name,
.link {
  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
    border-radius: 4px;
  }
}

.link:focus-visible {
  border-radius: 999px;
}

.icon {
  width: 14px;
  height: 14px;
}

.arrow {
  transition:
    color 0.2s,
    transform 0.2s ease-out;
}

@media (prefers-reduced-motion: reduce) {
  .link,
  .arrow {
    transform: none !important;
  }
}
</style>
