<script setup lang="ts">
import type { EmploymentType, Experience, Workplace } from "#shared/types/profile";

const { profile, resolveSkills } = useProfile();
const groups = groupByCompany(profile.experience);
const { selected, dims } = useSkillSelection();

const VISIBLE_SKILLS = 8;
const expanded = ref(new Set<string>());
/** First N skills, plus the selected skill if it's hidden past the cut. */
function visibleSkills(role: Experience) {
  const all = resolveSkills(role.skills);
  if (expanded.value.has(role.id)) return all;
  const shown = all.slice(0, VISIBLE_SKILLS);
  const pick = all.find((s) => s.id === selected.value);
  return pick && !shown.includes(pick) ? [...shown, pick] : shown;
}
function toggle(id: string) {
  const next = new Set(expanded.value);
  if (!next.delete(id)) next.add(id);
  expanded.value = next;
}

const employment: Record<EmploymentType, string> = {
  "full-time": "Full-time",
  "part-time": "Part-time",
  freelance: "Freelance",
  internship: "Internship",
};
const workplace: Record<Workplace, string> = {
  "on-site": "On-site",
  hybrid: "Hybrid",
  remote: "Remote",
};
</script>

<template>
  <AppSection title="Experience">
    <ol class="companies">
      <li v-for="group in groups" :key="group.roles[0]!.id" class="company">
        <h3 class="company-name">{{ group.company }}</h3>

        <ol class="roles" :class="{ multi: group.roles.length > 1 }">
          <li
            v-for="role in group.roles"
            :id="role.id"
            :key="role.id"
            class="role"
            :class="{ dimmed: dims(role.skills) }"
          >
            <div class="role-head">
              <h4 class="title">{{ role.title }}</h4>
              <p class="period">
                <time :datetime="role.start">{{ formatPeriod(role.start, role.end) }}</time>
                <template v-if="formatDuration(role.start, role.end)">
                  · {{ formatDuration(role.start, role.end) }}
                </template>
              </p>
            </div>

            <p class="meta">
              {{ employment[role.employmentType] }} · {{ workplace[role.workplace] }} ·
              {{ role.team ? `${role.team}, ` : "" }}{{ role.location }}
            </p>

            <ul v-if="role.description.length" class="description">
              <li v-for="(line, i) in role.description" :key="i">
                <template v-for="(part, j) in linkify(line)" :key="j">
                  <a v-if="part.url" :href="part.url" target="_blank" rel="noopener">{{
                    part.text
                  }}</a>
                  <template v-else>{{ part.text }}</template>
                </template>
              </li>
            </ul>

            <ul
              v-if="role.skills.length"
              class="skills"
              :aria-label="`Skills used at ${group.company}`"
            >
              <li
                v-for="skill in visibleSkills(role)"
                :key="skill.id"
                class="chip"
                :class="{ match: skill.id === selected }"
              >
                {{ skill.name }}
              </li>
              <li v-if="role.skills.length > VISIBLE_SKILLS">
                <button
                  type="button"
                  class="chip more"
                  :aria-expanded="expanded.has(role.id)"
                  @click="toggle(role.id)"
                >
                  {{
                    expanded.has(role.id) ? "Show less" : `+${role.skills.length - VISIBLE_SKILLS}`
                  }}
                </button>
              </li>
            </ul>
          </li>
        </ol>
      </li>
    </ol>
  </AppSection>
</template>

<style scoped>
ol,
ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.company + .company {
  margin-top: 48px;
}

.company-name {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.6rem;
  letter-spacing: -0.01em;
  color: var(--text-h);
}

.role {
  scroll-margin-top: 24px;
  transition: opacity 0.2s;
}

/* A skill is selected in the Skills section and this role didn't use it. */
.dimmed {
  opacity: 0.35;
}

.chip.match {
  color: var(--text-h);
  border-color: var(--accent);
  background: var(--accent-bg);
}

.roles {
  margin-top: 12px;
}

/* Several roles at one company: a thin rail ties them together. */
.roles.multi {
  border-left: 1px solid var(--border);
  padding-left: 20px;

  .role + .role {
    margin-top: 28px;
  }

  .role {
    position: relative;

    &::before {
      content: "";
      position: absolute;
      top: 0.55em;
      left: -24.5px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--bg);
      border: 1px solid var(--text);
      box-sizing: border-box;
    }
  }
}

.role-head {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 2px 16px;
}

.title {
  margin: 0;
  font-size: 1rem;
  font-weight: 500;
  color: var(--text-h);
}

.period {
  margin: 0;
  font-size: 0.875rem;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

.meta {
  margin: 2px 0 0;
  font-size: 0.875rem;
  opacity: 0.8;
}

.description {
  margin-top: 12px;

  li {
    position: relative;
    padding-left: 16px;
    line-height: 1.6;
    text-wrap: pretty;

    &::before {
      content: "";
      position: absolute;
      left: 2px;
      top: 0.75em;
      width: 4px;
      height: 1px;
      background: var(--text);
    }

    & + li {
      margin-top: 8px;
    }
  }

  a {
    color: var(--text-h);
    text-decoration-color: var(--accent-border);
    text-underline-offset: 3px;
    overflow-wrap: anywhere;
  }
}

.skills {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 14px;
}

.chip {
  display: inline-flex;
  align-items: center;
  height: 26px;
  padding: 0 10px;
  border: 1px solid var(--border);
  border-radius: 999px;
  font-size: 0.75rem;
  letter-spacing: 0.01em;
  color: var(--text);
  box-sizing: border-box;
}

.more {
  font: inherit;
  font-size: 0.75rem;
  background: none;
  cursor: pointer;
  color: var(--text-h);
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

  @media (prefers-reduced-motion: reduce) {
    &:active {
      transform: none;
    }
  }
}
</style>
