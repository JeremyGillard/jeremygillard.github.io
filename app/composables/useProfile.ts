import profileJson from "~~/data/profile.json";
import type { Profile, Skill } from "#shared/types/profile";

const profile = profileJson as Profile;
const skillsById = new Map(profile.skills.map((s) => [s.id, s]));

/** Profile data from data/profile.json, with skill references resolved. */
export function useProfile() {
  const resolveSkills = (ids: string[] = []): Skill[] =>
    ids.map((id) => skillsById.get(id)).filter((s): s is Skill => s !== undefined);

  return { profile, skillsById, resolveSkills };
}
