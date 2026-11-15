/** Year and month, e.g. "2023-12". */
export type YearMonth = `${number}-${number}`;

export type SkillCategory =
  | "language"
  | "framework"
  | "library"
  | "devops"
  | "cloud"
  | "observability"
  | "security"
  | "network"
  | "systems"
  | "database"
  | "tool"
  | "practice";

export interface Skill {
  /** Stable kebab-case id, referenced by experiences and certifications. */
  id: string;
  name: string;
  category: SkillCategory;
  /** Other names recruiters may search for ("k8s", "js"…). */
  aliases?: string[];
}

export interface Link {
  label: string;
  url: string;
}

export interface Basics {
  name: string;
  headline: string;
  /** One-sentence pitch shown in the hero. */
  summary: string;
  location: string;
  links: Link[];
}

export interface About {
  paragraphs: string[];
  focus: { intro: string; items: { area: string; details: string }[] };
  closing: string;
}

export type EmploymentType = "full-time" | "part-time" | "freelance" | "internship";
export type Workplace = "on-site" | "hybrid" | "remote";

export interface Experience {
  id: string;
  title: string;
  company: string;
  /** Team or lab inside the company, if any. */
  team?: string;
  employmentType: EmploymentType;
  location: string;
  workplace: Workplace;
  start: YearMonth;
  /** null = current position. */
  end: YearMonth | null;
  description: string[];
  /** Skill ids from `skills`. */
  skills: string[];
}

export interface Education {
  id: string;
  school: string;
  start: YearMonth;
  end: YearMonth;
  detail?: string;
}

/** Earned certifications have `issued`; ones being prepared have `inProgress` and no date. */
export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issued?: YearMonth;
  inProgress?: true;
  expires?: YearMonth;
  credentialId?: string;
  url?: string;
  /** Skill ids from `skills`. */
  skills?: string[];
}

/** Personal project or repository. */
export interface Project {
  id: string;
  name: string;
  description: string;
  /** Source repository. */
  repo?: string;
  /** Live site or demo. */
  url?: string;
  start?: YearMonth;
  /** Skill ids from `skills`. */
  skills: string[];
}

export interface Profile {
  basics: Basics;
  about: About;
  skills: Skill[];
  experience: Experience[];
  projects: Project[];
  certifications: Certification[];
  education: Education[];
}
