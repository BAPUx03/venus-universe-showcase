// Post-build: render the home route ("/") via the SSR server bundle and write
// the resulting HTML to dist/client/index.html so static hosts (Netlify) can
// serve a real HTML shell. Client-side routing then takes over for other paths.
//
// This runs ONLY when DEPLOY_TARGET=netlify (see netlify.toml). On Cloudflare
// (Lovable hosting) the SSR server handles every request live, so no static
// shell is needed.

import { writeFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const isNetlify = process.env.DEPLOY_TARGET === "netlify";
if (!isNetlify) {
  console.log("[prerender] Skipping — DEPLOY_TARGET is not 'netlify'.");
  process.exit(0);
}

const serverBundle = resolve("dist/server/server.js");
if (!existsSync(serverBundle)) {
  console.error(`[prerender] Server bundle not found at ${serverBundle}`);
  process.exit(1);
}

const baseUrl = process.env.URL || "http://localhost";
const targetUrl = `${baseUrl.replace(/\/$/, "")}/`;

console.log(`[prerender] Importing server bundle…`);
const mod = await import(pathToFileURL(serverBundle).href);
const handler = mod.default ?? mod.server;
if (!handler || typeof handler.fetch !== "function") {
  console.error("[prerender] Server bundle does not expose a fetch() handler.");
  process.exit(1);
}

console.log(`[prerender] Rendering ${targetUrl}…`);
const req = new Request(targetUrl, { method: "GET", headers: { "user-agent": "lovable-prerender" } });

let html;
try {
  const res = await handler.fetch(req);
  html = await res.text();
  if (!res.ok) {
    console.warn(`[prerender] SSR returned ${res.status}. Writing response body anyway.`);
  }
} catch (e) {
  console.error("[prerender] SSR rendering failed:", e);
  process.exit(1);
}

const out = resolve("dist/client/index.html");
writeFileSync(out, html, "utf8");
console.log(`[prerender] Wrote ${out} (${html.length} bytes).`);
