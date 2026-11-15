/** Skill picked in the Skills section; Experience, Projects and Certifications highlight what uses it. */
export function useSkillSelection() {
  const selected = useState<string | null>("selected-skill", () => null);

  const toggle = (id: string) => {
    selected.value = selected.value === id ? null : id;
  };
  const clear = () => {
    selected.value = null;
  };
  /** True when a skill is selected and `ids` doesn't include it. */
  const dims = (ids: string[] = []) => selected.value !== null && !ids.includes(selected.value);

  return { selected, toggle, clear, dims };
}
