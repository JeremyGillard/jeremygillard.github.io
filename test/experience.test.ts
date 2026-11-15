import { describe, expect, it } from "vite-plus/test";
import profileJson from "../data/profile.json";
import type { Profile } from "../shared/types/profile";
import { formatDuration, formatPeriod, groupByCompany, linkify } from "../shared/utils/experience";

const profile = profileJson as Profile;

describe("groupByCompany", () => {
  it("puts the current role first and merges consecutive Enspirit roles", () => {
    const groups = groupByCompany(profile.experience);
    expect(groups[0]!.roles[0]!.end).toBeNull();
    const enspirit = groups.find((g) => g.company === "Enspirit")!;
    expect(enspirit.roles.map((r) => r.id)).toEqual(["enspirit-freelance", "enspirit-fulltime"]);
    expect(groups.filter((g) => g.company === "Enspirit")).toHaveLength(1);
  });
});

describe("formatting", () => {
  it("formats periods", () => {
    expect(formatPeriod("2023-12", "2025-03")).toBe("Dec 2023 – Mar 2025");
    expect(formatPeriod("2026-06", null)).toBe("Jun 2026 – Present");
  });

  it("counts months inclusively", () => {
    expect(formatDuration("2023-12", "2025-03")).toBe("1 yr 4 mos");
    expect(formatDuration("2020-02", "2020-05")).toBe("4 mos");
    expect(formatDuration("2021-04", "2023-03")).toBe("2 yrs");
    expect(formatDuration("2026-06", null)).toBeNull();
  });

  it("linkifies URLs without trailing punctuation", () => {
    expect(linkify("See https://cobra-2seas.eu/. Done")).toEqual([
      { text: "See " },
      { text: "https://cobra-2seas.eu/", url: "https://cobra-2seas.eu/" },
      { text: ". Done" },
    ]);
  });
});
