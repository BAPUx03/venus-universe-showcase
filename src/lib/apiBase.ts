// Resolves the base URL for our /api/public/* endpoints.
//
// - On Lovable hosting (Cloudflare): empty string -> same-origin requests.
// - On Netlify (or any other static host): set VITE_API_BASE_URL to the
//   Lovable published URL (e.g. https://venus-universe-showcase.lovable.app)
//   so the frontend talks to the Lovable-hosted backend cross-origin.

const RAW = (import.meta.env.VITE_API_BASE_URL ?? "").trim();
// Strip trailing slash so apiUrl("/api/...") never produces "//api/...".
export const API_BASE = RAW.replace(/\/+$/, "");

export function apiUrl(path: string): string {
  if (!path.startsWith("/")) path = "/" + path;
  return API_BASE ? `${API_BASE}${path}` : path;
}
