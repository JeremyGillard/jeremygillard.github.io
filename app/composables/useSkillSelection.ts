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

  /** Select `id` and jump to its chip in the Skills section. */
  const reveal = async (id: string, e?: MouseEvent) => {
    e?.preventDefault();
    selected.value = id;
    await nextTick(); // let the Skills section drop a search filter hiding the chip
    focusInView(`skill-${id}`);
  };

  return { selected, toggle, clear, dims, reveal };
}
