import { createFileRoute } from "@tanstack/react-router";
import { createHmac, timingSafeEqual } from "node:crypto";
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
  sessionId: z.string().min(32).max(512),
  otp: z.string().trim().regex(/^[0-9]{4}$/, "Invalid OTP"),
});

const Schema = z.discriminatedUnion("action", [SendSchema, VerifySchema]);

const OTP_LENGTH = 4;
const OTP_TTL_MS = 10 * 60 * 1000;

function getSigningSecret(apiKey: string) {
  return process.env.OTP_SIGNING_SECRET || apiKey;
}

function signPayload(payload: string, secret: string) {
  return createHmac("sha256", secret).update(payload).digest("hex");
}

function createSessionId(phone: string, otp: string, secret: string) {
  const expiresAt = Date.now() + OTP_TTL_MS;
  const payload = `${phone}.${otp}.${expiresAt}`;
  const signature = signPayload(payload, secret);
  return Buffer.from(`${payload}.${signature}`, "utf8").toString("base64url");
}

function verifySessionId(sessionId: string, otp: string, secret: string) {
  try {
    const decoded = Buffer.from(sessionId, "base64url").toString("utf8");
    const parts = decoded.split(".");
    if (parts.length !== 4) return { ok: false as const, error: "Invalid session" };

    const [phone, storedOtp, expiresAtRaw, signature] = parts;
    const payload = `${phone}.${storedOtp}.${expiresAtRaw}`;
    const expected = signPayload(payload, secret);
    const validSignature = timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
    if (!validSignature) return { ok: false as const, error: "Invalid session" };

    const expiresAt = Number(expiresAtRaw);
    if (!Number.isFinite(expiresAt) || Date.now() > expiresAt) {
      return { ok: false as const, error: "OTP expired. Please request a new code." };
    }

    if (storedOtp !== otp) return { ok: false as const, error: "Invalid OTP" };

    return { ok: true as const, phone };
  } catch {
    return { ok: false as const, error: "Invalid session" };
  }
}

function parseGatewayResponse(text: string) {
  try {
    return JSON.parse(text) as { Status?: string; Details?: string };
  } catch {
    return null;
  }
}

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
            const otp = Math.floor(10 ** (OTP_LENGTH - 1) + Math.random() * 9 * 10 ** (OTP_LENGTH - 1)).toString();
            const templateName = process.env.TWOFACTOR_TEMPLATE_NAME || "gentam";
            const sendUrl = `https://2factor.in/API/V1/${apiKey}/SMS/${encodeURIComponent(phone)}/${encodeURIComponent(otp)}/${encodeURIComponent(templateName)}`;
            const r = await fetch(sendUrl, { method: "POST" });
            const text = await r.text();
            const data = parseGatewayResponse(text);
            if (!data || data.Status !== "Success") {
              return json(
                { ok: false, error: data?.Details || `Failed to send OTP (${r.status})` },
                502,
              );
            }

            const sessionId = createSessionId(phone, otp, getSigningSecret(apiKey));
            return json({ ok: true, sessionId, digits: OTP_LENGTH });
          }

          const verified = verifySessionId(parsed.data.sessionId, parsed.data.otp, getSigningSecret(apiKey));
          if (verified.ok) {
            return json({ ok: true, verified: true });
          }
          return json(
            {
              ok: false,
              verified: false,
              error: verified.error,
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
