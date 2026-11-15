/** "https://www.linkedin.com/in/jeremygillard/" → "linkedin.com/in/jeremygillard" */
export function displayUrl(url: string): string {
  return url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
}
