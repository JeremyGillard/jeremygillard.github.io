import { describe, expect, it } from "vite-plus/test";
import profileJson from "../data/profile.json";
import type { Profile } from "../shared/types/profile";
import { groupByCategory, skillUsage } from "../shared/utils/skills";

const profile = profileJson as Profile;

describe("skillUsage", () => {
  it("links skills to the roles and certifications that use them", () => {
    const usage = skillUsage(profile);
    const k8s = usage.get("kubernetes")!;
    expect(k8s.experience.map((e) => e.id)).toEqual(["enspirit-fulltime"]);
    expect(k8s.certifications.map((c) => c.id)).toEqual(["cka", "ckad", "kcsa", "kcna"]);
    expect(usage.get("docker")!.experience.map((e) => e.id)).toEqual([
      "enspirit-freelance",
      "enspirit-fulltime",
      "iut-cobra",
    ]);
  });
});

describe("groupByCategory", () => {
  it("covers every skill exactly once", () => {
    const grouped = groupByCategory(profile.skills).flatMap((g) => g.skills);
    expect(grouped).toHaveLength(profile.skills.length);
  });
});
