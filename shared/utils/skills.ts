import type {
  Certification,
  Experience,
  Profile,
  Project,
  Skill,
  SkillCategory,
} from "../types/profile";

export interface SkillUsage {
  experience: Experience[];
  projects: Project[];
  certifications: Certification[];
}

/** For each skill id, the roles, projects and certifications that reference it. */
export function skillUsage(profile: Profile): Map<string, SkillUsage> {
  const usage = new Map<string, SkillUsage>(
    profile.skills.map((s) => [s.id, { experience: [], projects: [], certifications: [] }]),
  );
  for (const e of profile.experience) for (const id of e.skills) usage.get(id)?.experience.push(e);
  for (const p of profile.projects) for (const id of p.skills) usage.get(id)?.projects.push(p);
  for (const c of profile.certifications)
    for (const id of c.skills ?? []) usage.get(id)?.certifications.push(c);
  return usage;
}

/** Display order: DevSecOps-relevant categories first. */
export const CATEGORY_LABELS: Record<SkillCategory, string> = {
  devops: "DevOps",
  cloud: "Cloud",
  security: "Security",
  observability: "Observability",
  systems: "Systems",
  network: "Network",
  language: "Languages",
  framework: "Frameworks",
  database: "Databases",
  library: "Libraries",
  tool: "Tools",
  practice: "Practices",
};

export function groupByCategory(skills: Skill[]): { category: SkillCategory; skills: Skill[] }[] {
  return (Object.keys(CATEGORY_LABELS) as SkillCategory[])
    .map((category) => ({ category, skills: skills.filter((s) => s.category === category) }))
    .filter((g) => g.skills.length > 0);
}
