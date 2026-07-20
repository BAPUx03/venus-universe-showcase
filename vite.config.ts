// Lovable preview uses the default Cloudflare-targeted config.
// When deploying to Netlify, set DEPLOY_TARGET=netlify in the build env
// (already configured in netlify.toml) — this disables the Cloudflare plugin
// and switches the TanStack Start server preset to Netlify so the build
// produces `.output/public` (static) and `.netlify/functions-internal/server`
// (SSR + API handler).
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { mcpPlugin } from "@lovable.dev/mcp-js/stacks/tanstack/vite";

const isNetlify = process.env.DEPLOY_TARGET === "netlify";
// @lovable.dev/mcp-js 0.20.x compares Vite's normalized root (forward
// slashes) with Node-resolved Windows paths (backslashes) and aborts before
// dev/build can start. The generated MCP routes are already committed, so the
// plugin can be skipped on Windows while remaining enabled on Linux deploys.
const mcpPlugins = process.platform === "win32" ? [] : [mcpPlugin()];

export default defineConfig(
  isNetlify
    ? {
        tanstackStart: { target: "netlify" },
        plugins: mcpPlugins,
      }
    : { plugins: mcpPlugins },
);

