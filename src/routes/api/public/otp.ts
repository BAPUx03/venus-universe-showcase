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
            const phone = parsed.data.phone.replace(/^\+/, "");
            const url = `https://2factor.in/API/V1/${apiKey}/SMS/${encodeURIComponent(phone)}/AUTOGEN/OTP1`;
            const r = await fetch(url);
            const data = (await r.json()) as { Status?: string; Details?: string };
            if (data.Status !== "Success") {
              return json({ ok: false, error: data.Details || "Failed to send OTP" }, 502);
            }
            return json({ ok: true, sessionId: data.Details });
          }

          // verify
          const url = `https://2factor.in/API/V1/${apiKey}/SMS/VERIFY/${encodeURIComponent(
            parsed.data.sessionId,
          )}/${encodeURIComponent(parsed.data.otp)}`;
          const r = await fetch(url);
          const data = (await r.json()) as { Status?: string; Details?: string };
          if (data.Status === "Success" && data.Details === "OTP Matched") {
            return json({ ok: true, verified: true });
          }
          return json({ ok: false, verified: false, error: data.Details || "Invalid OTP" }, 400);
        } catch (e) {
          return json({ ok: false, error: (e as Error).message }, 500);
        }
      },
    },
  },
});
