import { describe, expect, it } from "vite-plus/test";
import profileJson from "../data/profile.json";
import type { Profile } from "../shared/types/profile";
import { normalize, searchProfile } from "../shared/utils/search";

const profile = profileJson as Profile;
const ids = (query: string) => {
  const r = searchProfile(query, profile);
  return { skills: r.skills.map((s) => s.id), certs: r.certifications.map((c) => c.id) };
};

describe("normalize", () => {
  it("ignores case, accents and punctuation but keeps # and +", () => {
    expect(normalize("CI/CD")).toBe("cicd");
    expect(normalize("Chérie")).toBe("cherie");
    expect(normalize("C#")).not.toBe(normalize("C++"));
  });
});

describe("searchProfile", () => {
  it("finds skills by alias", () => {
    expect(ids("k8s").skills).toEqual(["kubernetes"]);
    expect(ids("k8s").certs).toEqual(["cka", "ckad", "kcsa", "kcna", "cks"]);
    expect(ids("ci/cd").skills).toContain("cicd");
  });

  it("finds certifications by code, earned or in progress", () => {
    expect(ids("CKA").certs[0]).toBe("cka");
    expect(ids("az104").certs).toEqual(["az-104"]);
  });

  it("ranks exact matches first", () => {
    expect(ids("c#").skills[0]).toBe("csharp");
    expect(ids("git").skills[0]).toBe("git");
  });

  it("returns nothing for unknown terms or an empty query", () => {
    expect(ids("aws")).toEqual({ skills: [], certs: [] });
    expect(ids("  ")).toEqual({ skills: [], certs: [] });
  });
});
