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
}

export interface Link {
  label: string;
  url: string;
}

export interface Basics {
  name: string;
  headline: string;
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

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issued: YearMonth;
  expires?: YearMonth;
  credentialId?: string;
  url?: string;
  /** Skill ids from `skills`. */
  skills?: string[];
}

export interface Profile {
  basics: Basics;
  about: About;
  skills: Skill[];
  experience: Experience[];
  certifications: Certification[];
}
