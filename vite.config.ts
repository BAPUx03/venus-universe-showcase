// Lovable preview uses the default Cloudflare-targeted config.
// When deploying to Netlify, set DEPLOY_TARGET=netlify in the build env
// (already configured in netlify.toml) — this disables the Cloudflare plugin
// and switches the TanStack Start server preset to Netlify so the build
// produces `.output/public` (static) and `.netlify/functions-internal/server`
// (SSR + API handler).
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const isNetlify = process.env.DEPLOY_TARGET === "netlify";

export default defineConfig(
  isNetlify
    ? {
        tanstackStart: {
          target: "netlify",
        },
      }
    : undefined,
);
