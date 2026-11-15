import type { Experience, YearMonth } from "../types/profile";
import { formatMonth } from "./date";

export interface CompanyGroup {
  company: string;
  roles: Experience[];
}

/** Newest first: current roles, then by end date, then by start date. */
export function sortExperience(list: Experience[]): Experience[] {
  const end = (e: Experience) => e.end ?? "9999-12";
  return list.toSorted((a, b) => end(b).localeCompare(end(a)) || b.start.localeCompare(a.start));
}

/** Merges consecutive roles at the same company (e.g. full-time → freelance). */
export function groupByCompany(list: Experience[]): CompanyGroup[] {
  const groups: CompanyGroup[] = [];
  for (const role of sortExperience(list)) {
    const last = groups.at(-1);
    if (last?.company === role.company) last.roles.push(role);
    else groups.push({ company: role.company, roles: [role] });
  }
  return groups;
}

/** "Dec 2023 – Mar 2025", or "Jun 2026 – Present". */
export function formatPeriod(start: YearMonth, end: YearMonth | null): string {
  return `${formatMonth(start)} – ${end ? formatMonth(end) : "Present"}`;
}

/** Inclusive month count as "1 yr 4 mos". Null for ongoing roles (avoids build-time "now"). */
export function formatDuration(start: YearMonth, end: YearMonth | null): string | null {
  if (!end) return null;
  const [sy, sm] = start.split("-").map(Number);
  const [ey, em] = end.split("-").map(Number);
  const months = (ey! - sy!) * 12 + (em! - sm!) + 1;
  const y = Math.floor(months / 12);
  const m = months % 12;
  return [y && `${y} yr${y > 1 ? "s" : ""}`, m && `${m} mo${m > 1 ? "s" : ""}`]
    .filter(Boolean)
    .join(" ");
}

/** Splits text into plain and URL parts so links render without v-html. */
export function linkify(text: string): { text: string; url?: string }[] {
  return text
    .split(/(https?:\/\/[^\s)]*[^\s).,])/)
    .filter(Boolean)
    .map((part) => (/^https?:\/\//.test(part) ? { text: part, url: part } : { text: part }));
}
