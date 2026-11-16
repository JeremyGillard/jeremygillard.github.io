/** Scroll `id` to the middle of the screen, focus it, and record it in the URL hash. */
export function focusInView(id: string): boolean {
  const el = document.getElementById(id);
  if (!el) return false;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
  el.focus({ preventScroll: true });
  history.replaceState(null, "", `#${id}`);
  return true;
}
