import type { YearMonth } from "../types/profile";

const monthFormat = new Intl.DateTimeFormat("en", {
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

/** "2023-12" → "Dec 2023". */
export function formatMonth(ym: YearMonth): string {
  const [y, m] = ym.split("-").map(Number);
  return monthFormat.format(new Date(Date.UTC(y!, m! - 1)));
}
