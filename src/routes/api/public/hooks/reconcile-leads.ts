import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/public/hooks/reconcile-leads")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let sinceMinutes = 90;
        try {
          const body = (await request.json().catch(() => ({}))) as { sinceMinutes?: number };
          if (typeof body.sinceMinutes === "number" && body.sinceMinutes >= 0) {
            sinceMinutes = body.sinceMinutes;
          }
        } catch { /* empty body allowed */ }
        const { reconcileLeads } = await import("@/lib/mirror.server");
        const result = await reconcileLeads(sinceMinutes);
        return new Response(JSON.stringify(result), {
          status: result.ok ? 200 : 500,
          headers: { "Content-Type": "application/json" },
        });
      },
    },
  },
});
