import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
} as const;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...CORS },
  });

const SendSchema = z.object({
  action: z.literal("send"),
  phone: z.string().trim().regex(/^\+?[0-9]{8,15}$/, "Invalid phone"),
});

const VerifySchema = z.object({
  action: z.literal("verify"),
  sessionId: z.string().min(8).max(80),
  otp: z.string().trim().regex(/^[0-9]{4,8}$/, "Invalid OTP"),
});

const Schema = z.discriminatedUnion("action", [SendSchema, VerifySchema]);

export const Route = createFileRoute("/api/public/otp")({
  server: {
    handlers: {
      OPTIONS: async () => new Response(null, { status: 204, headers: CORS }),
      POST: async ({ request }) => {
        const apiKey = process.env.TWOFACTOR_API_KEY;
        if (!apiKey) return json({ ok: false, error: "OTP service not configured" }, 500);

        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return json({ ok: false, error: "Invalid JSON" }, 400);
        }
        const parsed = Schema.safeParse(body);
        if (!parsed.success) {
          return json({ ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input" }, 400);
        }

        try {
          if (parsed.data.action === "send") {
            const r = await fetch("https://2factor.in/API/V1/OTP/SEND", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "X-API-Key": apiKey,
              },
              body: JSON.stringify({
                to: parsed.data.phone,
                channel: "SMS",
              }),
            });
            const data = (await r.json()) as {
              status?: string;
              session_id?: string;
              details?: string;
              message?: string;
              error?: string;
            };
            if (!r.ok || data.status?.toLowerCase() !== "sent" || !data.session_id) {
              return json(
                { ok: false, error: data.message || data.error || data.details || "Failed to send OTP" },
                502,
              );
            }
            return json({ ok: true, sessionId: data.session_id });
          }

          const url = `https://2factor.in/API/V1/${apiKey}/SMS/VERIFY/${encodeURIComponent(
            parsed.data.sessionId,
          )}/${encodeURIComponent(parsed.data.otp)}`;
          const r = await fetch(url);
          const data = (await r.json()) as {
            Status?: string;
            Details?: string;
            status?: string;
            details?: string;
            message?: string;
          };
          const matched =
            (data.Status === "Success" && data.Details === "OTP Matched") ||
            (data.status?.toLowerCase() === "verified");
          if (matched) {
            return json({ ok: true, verified: true });
          }
          return json(
            {
              ok: false,
              verified: false,
              error: data.message || data.Details || data.details || "Invalid OTP",
            },
            400,
          );
        } catch (e) {
          return json({ ok: false, error: (e as Error).message }, 500);
        }
      },
    },
  },
});
