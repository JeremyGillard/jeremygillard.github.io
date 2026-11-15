/** A skill id, optionally with a resume-specific label ("C# (.NET Core 8, REST Api)"). */
export type ResumeSkill = string | { id: string; label: string };

export interface ResumeExperience {
  /** Experience ids from profile.json, merged into one entry (period spans all of them). */
  roles: string[];
  /** Short company name; defaults to the profile's. */
  company?: string;
  city?: string;
  /** Defaults to the first role's title. */
  title?: string;
  workplace?: string;
  /** Extra tag after the workplace, e.g. "Student job". */
  note?: string;
  /** Defaults to the roles' descriptions. */
  bullets?: string[];
}

export interface ResumeCertificationLine {
  /** Certification ids from profile.json, earned and in progress. */
  ids: string[];
  label: string;
}

/** What goes into the PDF resume, and how it's worded. Everything not listed is left out. */
export interface Resume {
  paper: "Letter" | "A4";
  headline: string;
  location: string;
  /** Shown in the contact line, before LinkedIn. */
  website?: string;
  summary: string;
  skills: ResumeSkill[];
  experience: ResumeExperience[];
  education: string[];
  certifications: ResumeCertificationLine[];
}

/** Render-ready resume, produced by buildResume(). */
export interface ResumeView {
  paper: Resume["paper"];
  name: string;
  headline: string;
  location: string;
  website?: string;
  linkedin?: string;
  summary: string;
  skills: string[];
  experience: {
    period: string;
    duration: string;
    company: string;
    city?: string;
    title: string;
    tags: string[];
    bullets: string[];
  }[];
  /** Education and certification rows share one section, as in the original PDF. */
  credentials: { date: string; text: string }[];
}
