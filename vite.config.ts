// Lovable preview uses the default Cloudflare-targeted config.
// When deploying to Netlify, set DEPLOY_TARGET=netlify in the build env
// (already configured in netlify.toml) — this swaps the server preset.
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
