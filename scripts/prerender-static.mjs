// Render every public route to its own HTML file for static Netlify hosting.
// This preserves the TanStack SSR output that search crawlers receive on the
// Cloudflare/Lovable deployment and prevents SPA fallback duplicate pages.

import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { pathToFileURL } from "node:url";

if (process.env.DEPLOY_TARGET !== "netlify") {
  console.log("[prerender] Skipping because DEPLOY_TARGET is not netlify.");
  process.exit(0);
}

const serverBundle = [resolve(".output/server/index.mjs"), resolve("dist/server/server.js")].find(existsSync);
if (!serverBundle) {
  console.error("[prerender] Server bundle not found.");
  process.exit(1);
}

const mod = await import(pathToFileURL(serverBundle).href);
const handler = mod.default ?? mod.server;
if (!handler || typeof handler.fetch !== "function") {
  console.error("[prerender] Server bundle does not expose a fetch handler.");
  process.exit(1);
}

const publicOrigin = (process.env.URL || "https://venusuniverse.in").replace(/\/$/, "");

async function request(pathname) {
  return handler.fetch(
    new Request(`${publicOrigin}${pathname}`, {
      headers: { "user-agent": "venus-static-prerender" },
    }),
    { ASSETS: { fetch: () => new Response(null, { status: 404 }) } },
    { waitUntil: () => undefined },
  );
}

function writePublic(relativePath, body) {
  const output = resolve(".output/public", relativePath);
  mkdirSync(dirname(output), { recursive: true });
  writeFileSync(output, body, "utf8");
  console.log(`[prerender] Wrote ${relativePath}`);
}

const sitemapResponse = await request("/sitemap.xml");
if (!sitemapResponse.ok) {
  throw new Error(`Sitemap render failed with ${sitemapResponse.status}`);
}
const sitemap = await sitemapResponse.text();
writePublic("sitemap.xml", sitemap);

const robotsResponse = await request("/robots.txt");
if (!robotsResponse.ok) {
  throw new Error(`Robots render failed with ${robotsResponse.status}`);
}
writePublic("robots.txt", await robotsResponse.text());

const sitemapPaths = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => {
  const url = new URL(match[1]);
  return url.pathname;
});

// Conversion and admin routes are deliberately absent from the sitemap but
// still need real route HTML on a static deployment.
const htmlPaths = [...new Set([...sitemapPaths, "/eoi", "/studio"])];

for (const pathname of htmlPaths) {
  const response = await request(pathname);
  if (!response.ok) {
    throw new Error(`${pathname} render failed with ${response.status}`);
  }
  const html = await response.text();
  const relativePath = pathname === "/" ? "index.html" : `${pathname.replace(/^\//, "")}/index.html`;
  writePublic(relativePath, html);
}

const notFoundResponse = await request("/__seo_not_found__");
if (notFoundResponse.status !== 404) {
  throw new Error(`Expected a 404 response, received ${notFoundResponse.status}`);
}
writePublic("404.html", await notFoundResponse.text());
