import type { Profile, YearMonth } from "../types/profile";
import type { Resume, ResumeView } from "../types/resume";
import { formatMonth } from "./date";
import { formatDuration } from "./experience";

function pick<T extends { id: string }>(items: T[], id: string, kind: string): T {
  const item = items.find((i) => i.id === id);
  if (!item) throw new Error(`resume.json: unknown ${kind} "${id}"`);
  return item;
}

const period = (start: YearMonth, end: YearMonth | null) =>
  `${formatMonth(start)} - ${end ? formatMonth(end) : "PRESENT"}`;

/** Merges profile.json with the resume.json selection into what the /resume page renders. */
export function buildResume(profile: Profile, resume: Resume, now: YearMonth): ResumeView {
  const skills = resume.skills.map((s) =>
    typeof s === "string"
      ? pick(profile.skills, s, "skill").name
      : (pick(profile.skills, s.id, "skill"), s.label),
  );

  const experience = resume.experience.map((entry) => {
    const roles = entry.roles.map((id) => pick(profile.experience, id, "experience"));
    const first = roles[0];
    if (!first) throw new Error("resume.json: experience entry without roles");
    const start = roles.map((r) => r.start).toSorted()[0]!;
    const end = roles.some((r) => r.end === null)
      ? null
      : roles
          .map((r) => r.end!)
          .toSorted()
          .at(-1)!;
    return {
      period: period(start, end),
      duration: formatDuration(start, end, { style: "long", now })!,
      company: entry.company ?? first.company,
      city: entry.city,
      title: entry.title ?? first.title,
      tags: [entry.workplace, entry.note].filter((t): t is string => Boolean(t)),
      bullets: entry.bullets ?? roles.flatMap((r) => r.description),
    };
  });

  const education = resume.education.map((id) => {
    const e = pick(profile.education, id, "education");
    return {
      date: period(e.start, e.end),
      text: [e.school, e.detail].filter(Boolean).join(" - "),
    };
  });

  // "[KCNA, KCSA, CKAD, CKA] Kubernetes, [CKS] in progress", dated by the latest earned cert.
  const certifications = resume.certifications.map((line) => {
    const certs = line.ids.map((id) => pick(profile.certifications, id, "certification"));
    const code = (ids: { id: string }[]) => `[${ids.map((c) => c.id.toUpperCase()).join(", ")}]`;
    const earned = certs.filter((c) => c.issued);
    const pending = certs.filter((c) => c.inProgress);
    const latest = earned
      .map((c) => c.issued!)
      .toSorted()
      .at(-1);
    const parts = [
      earned.length ? `${code(earned)} ${line.label}` : line.label,
      pending.length ? `${code(pending)} in progress` : "",
    ];
    return {
      date: latest ? formatMonth(latest) : "",
      text: parts.filter(Boolean).join(", "),
    };
  });

  return {
    paper: resume.paper,
    name: profile.basics.name,
    headline: resume.headline,
    location: resume.location,
    website: resume.website,
    linkedin: profile.basics.links.find((l) => l.label === "LinkedIn")?.url,
    summary: resume.summary,
    skills,
    experience,
    credentials: [...education, ...certifications],
  };
}
