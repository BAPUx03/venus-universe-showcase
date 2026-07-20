// Post-build validation of the actual SSR responses that crawlers receive.

import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const serverBundle = [resolve(".output/server/index.mjs"), resolve("dist/server/server.js")].find(existsSync);
if (!serverBundle) {
  console.error("[seo] Build output is missing. Run npm run build first.");
  process.exit(1);
}

const mod = await import(pathToFileURL(serverBundle).href);
const handler = mod.default ?? mod.server;
const origin = "https://venusuniverse.in";
const failures = [];

async function get(pathname) {
  return handler.fetch(
    new Request(`${origin}${pathname}`, { headers: { "user-agent": "venus-seo-validator" } }),
    { ASSETS: { fetch: () => new Response(null, { status: 404 }) } },
    { waitUntil: () => undefined },
  );
}

function extract(html, pattern) {
  return html.match(pattern)?.[1]?.replace(/<[^>]+>/g, "").trim() ?? "";
}

const sitemapResponse = await get("/sitemap.xml");
if (!sitemapResponse.ok) failures.push(`sitemap returned ${sitemapResponse.status}`);
const sitemap = await sitemapResponse.text();
const paths = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => new URL(match[1]).pathname);

for (const retired of ["/luxury-5bhk-ahmedabad", "/5bhk-nehrunagar-ahmedabad", "/eoi"]) {
  if (paths.includes(retired)) failures.push(`${retired} must not be in the sitemap`);
}

const titles = new Map();
for (const pathname of paths) {
  const response = await get(pathname);
  if (response.status !== 200) {
    failures.push(`${pathname} returned ${response.status}`);
    continue;
  }
  const html = await response.text();
  const title = extract(html, /<title>(.*?)<\/title>/is);
  const description = extract(html, /<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/is);
  const canonical = extract(html, /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/is);
  const h1 = extract(html, /<h1[^>]*>(.*?)<\/h1>/is);

  if (!title) failures.push(`${pathname} has no title`);
  if (!description) failures.push(`${pathname} has no meta description`);
  if (!canonical) failures.push(`${pathname} has no canonical`);
  if (!h1) failures.push(`${pathname} has no H1`);
  if (canonical && new URL(canonical).pathname.replace(/\/$/, "") !== pathname.replace(/\/$/, "")) {
    failures.push(`${pathname} canonical points to ${canonical}`);
  }
  if (titles.has(title)) failures.push(`${pathname} duplicates the title used by ${titles.get(title)}`);
  titles.set(title, pathname);
}

const eoiHtml = await (await get("/eoi")).text();
if (!/name=["']robots["'][^>]+content=["']noindex, follow["']/i.test(eoiHtml)) {
  failures.push("/eoi must be noindex, follow");
}

const notFound = await get("/__seo_not_found__");
if (notFound.status !== 404) failures.push(`unknown route returned ${notFound.status}, expected 404`);

if (failures.length) {
  console.error(`[seo] Validation failed:\n- ${failures.join("\n- ")}`);
  process.exit(1);
}

console.log(`[seo] Validated ${paths.length} indexable URLs, /eoi noindex, and genuine 404 handling.`);
