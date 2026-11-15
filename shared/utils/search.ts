import type { Certification, Profile, Skill } from "../types/profile";

/**
 * Loose comparison key: case, accents, spaces and punctuation ignored, so
 * "CI/CD" ≈ "cicd" and "Argo CD" ≈ "argocd". "#" and "+" are spelled out
 * first so "C#" and "C++" don't both collapse to "c".
 */
export function normalize(text: string): string {
  return text
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replaceAll("#", "sharp")
    .replaceAll("+", "plus")
    .replace(/[^a-z0-9]/g, "");
}

export interface SearchResult {
  skills: Skill[];
  certifications: Certification[];
}

/** Skills and certifications whose id, name or alias contains the query (exact matches first), plus certs covering the top skill. */
export function searchProfile(query: string, profile: Profile): SearchResult {
  const q = normalize(query);
  if (!q) return { skills: [], certifications: [] };

  const rank = (terms: string[]) => {
    const keys = terms.map(normalize);
    if (keys.includes(q)) return 0;
    if (keys.some((k) => k.startsWith(q))) return 1;
    if (keys.some((k) => k.includes(q))) return 2;
    return -1;
  };
  const matches = <T>(items: T[], terms: (item: T) => string[]) =>
    items
      .map((item) => ({ item, r: rank(terms(item)) }))
      .filter(({ r }) => r >= 0)
      .sort((a, b) => a.r - b.r)
      .map(({ item }) => item);

  const skills = matches(profile.skills, (s) => [s.id, s.name, ...(s.aliases ?? [])]);
  const certifications = matches(profile.certifications, (c) => [c.id, c.name]);
  // "k8s" should also surface CKA, CKAD…: certs covering the best skill match.
  const top = skills[0]?.id;
  const linked = top ? profile.certifications.filter((c) => c.skills?.includes(top)) : [];
  return { skills, certifications: [...new Set([...certifications, ...linked])] };
}
