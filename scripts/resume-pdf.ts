/**
 * Renders /resume to a PDF with the installed Google Chrome.
 *
 *   vp dev                      # in another terminal
 *   vp run resume:pdf [url] [out]
 *
 * Email and phone come from the git-ignored data/private.json and are injected
 * into the page at print time only, so they never reach the repo or the site.
 */
import { existsSync, readFileSync } from "node:fs";
import { mkdir } from "node:fs/promises";
import { dirname } from "node:path";
import { chromium } from "playwright-core";

const url = process.argv[2] ?? "http://localhost:3000/resume";
const out = process.argv[3] ?? "out/JeremyGillard-Resume.pdf";
const privatePath = "data/private.json";

const contact = existsSync(privatePath) ? JSON.parse(readFileSync(privatePath, "utf8")) : {};
if (!existsSync(privatePath)) {
  console.warn(
    `No ${privatePath}: the PDF will have no email or phone (see data/private.example.json).`,
  );
}

const browser = await chromium.launch({ channel: "chrome" });
try {
  const page = await browser.newPage();
  await page.addInitScript((data) => {
    (window as Window & { __RESUME_PRIVATE__?: unknown }).__RESUME_PRIVATE__ = data;
  }, contact);
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForSelector(".resume[data-ready]");
  await page.evaluate(() => document.fonts.ready);
  await page.emulateMedia({ media: "print" });

  // Warn when content spills past one page (the article grows beyond its min-height).
  const overflow = await page.$eval(
    ".resume",
    (el) => el.getBoundingClientRect().height > parseFloat(getComputedStyle(el).minHeight) + 1,
  );
  if (overflow) console.warn("Resume is longer than one page.");

  await mkdir(dirname(out), { recursive: true });
  await page.pdf({ path: out, preferCSSPageSize: true, printBackground: true });
  console.log(`Wrote ${out}`);
} finally {
  await browser.close();
}
