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

/**
 * Inclusive month count: "1 yr 4 mos" (short) or "1 year 4 months" (long).
 * Ongoing roles return null unless `now` is given (the site avoids a build-time "now").
 */
export function formatDuration(
  start: YearMonth,
  end: YearMonth | null,
  { style = "short", now }: { style?: "short" | "long"; now?: YearMonth } = {},
): string | null {
  const last = end ?? now;
  if (!last) return null;
  const [sy, sm] = start.split("-").map(Number);
  const [ey, em] = last.split("-").map(Number);
  const months = (ey! - sy!) * 12 + (em! - sm!) + 1;
  const y = Math.floor(months / 12);
  const m = months % 12;
  const unit = (n: number, s: string, l: string) =>
    style === "long" ? `${n} ${l}${n > 1 ? "s" : ""}` : `${n} ${s}${n > 1 ? "s" : ""}`;
  return [y && unit(y, "yr", "year"), m && unit(m, "mo", "month")].filter(Boolean).join(" ");
}

/** Splits text into plain and URL parts so links render without v-html. */
export function linkify(text: string): { text: string; url?: string }[] {
  return text
    .split(/(https?:\/\/[^\s)]*[^\s).,])/)
    .filter(Boolean)
    .map((part) => (/^https?:\/\//.test(part) ? { text: part, url: part } : { text: part }));
}
