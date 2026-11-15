import { describe, expect, it } from "vite-plus/test";
import profileJson from "../data/profile.json";
import resumeJson from "../data/resume.json";
import type { Profile } from "../shared/types/profile";
import type { Resume } from "../shared/types/resume";
import { buildResume } from "../shared/utils/resume";

const profile = profileJson as Profile;
const resume = resumeJson as Resume;
const view = buildResume(profile, resume, "2026-11");
const job = (company: string) => view.experience.find((e) => e.company === company)!;

describe("data/resume.json", () => {
  it("only references existing profile entries", () => {
    expect(() => buildResume(profile, resume, "2026-11")).not.toThrow();
  });

  it("throws on unknown ids", () => {
    expect(() => buildResume(profile, { ...resume, skills: ["nope"] }, "2026-11")).toThrow(
      /unknown skill "nope"/,
    );
  });
});

describe("buildResume", () => {
  it("merges roles into one entry spanning all of them", () => {
    const enspirit = job("Enspirit");
    expect(enspirit.period).toBe("Dec 2023 - Jul 2026");
    expect(enspirit.duration).toBe("2 years 8 months");
    expect(enspirit.title).toBe("DevOps Engineer & Software Developer");
  });

  it("computes ongoing roles up to now", () => {
    expect(job("EEAS").period).toBe("Jun 2026 - PRESENT");
    expect(job("EEAS").duration).toBe("6 months");
  });

  it("applies label and title overrides", () => {
    expect(view.skills).toContain("C# (.NET Core 8, REST Api)");
    expect(view.skills).toContain("Kubernetes");
    expect(job("NGroup").title).toBe("System Administrator");
    expect(job("UCLouvain").tags).toEqual(["Hybrid", "Student job"]);
  });

  it("builds education and certification lines", () => {
    expect(view.credentials.map((c) => [c.date, c.text])).toEqual([
      ["Sep 2017 - Jan 2021", "HE2B ESI Brussels - avg. score 15.5/20"],
      ["Oct 2023", "[AZ-900] Azure Fundamentals, [AZ-104] in progress"],
      ["Mar 2026", "[KCNA, KCSA, CKAD, CKA] Kubernetes, [CKS] in progress"],
    ]);
  });
});
