import { describe, expect, it } from "vite-plus/test";
import profileJson from "../data/profile.json";
import type { Profile } from "../shared/types/profile";

const profile = profileJson as Profile;
const skillIds = new Set(profile.skills.map((s) => s.id));
const yearMonth = /^\d{4}-(0[1-9]|1[0-2])$/;

function duplicates(ids: string[]) {
  return ids.filter((id, i) => ids.indexOf(id) !== i);
}

describe("data/profile.json", () => {
  it("has unique ids", () => {
    expect(duplicates(profile.skills.map((s) => s.id))).toEqual([]);
    expect(duplicates(profile.experience.map((e) => e.id))).toEqual([]);
    expect(duplicates(profile.certifications.map((c) => c.id))).toEqual([]);
    expect(duplicates(profile.education.map((e) => e.id))).toEqual([]);
  });

  it("references only existing skills", () => {
    const refs = [
      ...profile.experience.flatMap((e) => e.skills.map((id) => `${e.id} -> ${id}`)),
      ...profile.certifications.flatMap((c) => (c.skills ?? []).map((id) => `${c.id} -> ${id}`)),
    ];
    expect(refs.filter((ref) => !skillIds.has(ref.split(" -> ")[1]!))).toEqual([]);
  });

  it("uses YYYY-MM dates with start before end", () => {
    for (const e of profile.experience) {
      expect(e.start, e.id).toMatch(yearMonth);
      if (e.end !== null) {
        expect(e.end, e.id).toMatch(yearMonth);
        expect(e.start <= e.end, e.id).toBe(true);
      }
    }
    for (const c of profile.certifications) {
      if (c.issued) expect(c.issued, c.id).toMatch(yearMonth);
      if (c.expires) expect(c.expires, c.id).toMatch(yearMonth);
    }
    for (const e of profile.education) {
      expect(e.start, e.id).toMatch(yearMonth);
      expect(e.end, e.id).toMatch(yearMonth);
      expect(e.start <= e.end, e.id).toBe(true);
    }
  });

  it("marks each certification as either earned or in progress", () => {
    const bad = profile.certifications.filter((c) => Boolean(c.issued) === Boolean(c.inProgress));
    expect(bad.map((c) => c.id)).toEqual([]);
  });

  it("uses aliases that don't collide across skills", () => {
    const terms = profile.skills.flatMap((s) =>
      [s.id, s.name, ...(s.aliases ?? [])].map((t) => `${t.toLowerCase()}|${s.id}`),
    );
    const owners = new Map<string, Set<string>>();
    for (const t of terms) {
      const [term, id] = t.split("|") as [string, string];
      owners.set(term, (owners.get(term) ?? new Set()).add(id));
    }
    expect([...owners].filter(([, ids]) => ids.size > 1).map(([term]) => term)).toEqual([]);
  });
});
