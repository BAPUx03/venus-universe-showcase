import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const LeadSchema = z.object({
  first_name: z.string().trim().min(1).max(100),
  last_name: z.string().trim().max(100).optional().default(""),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(3).max(30),
  requirement: z.string().trim().max(200).optional().default(""),
  budget: z.string().trim().max(200).optional().default(""),
  source: z.string().trim().max(100).optional().default("website"),
});

const SHEETS_GATEWAY = "https://connector-gateway.lovable.dev/google_sheets/v4";
const BREVO_URL = "https://api.brevo.com/v3/smtp/email";

async function appendToSheet(row: string[]) {
  const sheetId = process.env.GOOGLE_SHEET_ID;
  const lovableKey = process.env.LOVABLE_API_KEY;
  const sheetsKey = process.env.GOOGLE_SHEETS_API_KEY;
  if (!sheetId || !lovableKey || !sheetsKey) {
    console.warn("[notify-lead] Sheets env missing");
    return { ok: false, error: "sheets_env_missing" };
  }
  const range = "Sheet1!A:H";
  const url = `${SHEETS_GATEWAY}/spreadsheets/${sheetId}/values/${range}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${lovableKey}`,
        "X-Connection-Api-Key": sheetsKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ values: [row] }),
    });
    if (!res.ok) {
      const t = await res.text();
      console.error(`[notify-lead] Sheets append failed [${res.status}]: ${t}`);
      return { ok: false, error: `sheets_${res.status}` };
    }
    return { ok: true };
  } catch (e) {
    console.error("[notify-lead] Sheets exception:", e);
    return { ok: false, error: "sheets_exception" };
  }
}

async function sendBrevoEmail(lead: z.infer<typeof LeadSchema>) {
  const apiKey = process.env.BREVO_API_KEY;
  const to = process.env.NOTIFICATION_EMAIL;
  const sender = process.env.BREVO_SENDER_EMAIL;
  if (!apiKey || !to || !sender) {
    console.warn("[notify-lead] Brevo env missing");
    return { ok: false, error: "brevo_env_missing" };
  }
  const html = `
    <h2>New Lead — ${escapeHtml(lead.source)}</h2>
    <table cellpadding="6" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">
      <tr><td><b>Name</b></td><td>${escapeHtml(lead.first_name)} ${escapeHtml(lead.last_name)}</td></tr>
      <tr><td><b>Email</b></td><td>${escapeHtml(lead.email)}</td></tr>
      <tr><td><b>Phone</b></td><td>${escapeHtml(lead.phone)}</td></tr>
      <tr><td><b>Requirement</b></td><td>${escapeHtml(lead.requirement)}</td></tr>
      <tr><td><b>Budget</b></td><td>${escapeHtml(lead.budget)}</td></tr>
      <tr><td><b>Source</b></td><td>${escapeHtml(lead.source)}</td></tr>
      <tr><td><b>Time</b></td><td>${new Date().toLocaleString()}</td></tr>
    </table>
  `;
  try {
    const res = await fetch(BREVO_URL, {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        sender: { name: "Venus Grounds Leads", email: sender },
        to: [{ email: to }],
        replyTo: { email: lead.email, name: `${lead.first_name} ${lead.last_name}`.trim() },
        subject: `🔔 New Lead: ${lead.first_name} ${lead.last_name} — ${lead.source}`,
        htmlContent: html,
      }),
    });
    if (!res.ok) {
      const t = await res.text();
      console.error(`[notify-lead] Brevo failed [${res.status}]: ${t}`);
      return { ok: false, error: `brevo_${res.status}` };
    }
    return { ok: true };
  } catch (e) {
    console.error("[notify-lead] Brevo exception:", e);
    return { ok: false, error: "brevo_exception" };
  }
}

function escapeHtml(s: string) {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export const Route = createFileRoute("/api/public/notify-lead")({
  server: {
    handlers: {
      OPTIONS: async () =>
        new Response(null, {
          status: 204,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
          },
        }),
      POST: async ({ request }) => {
        const cors = {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        };
        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return new Response(JSON.stringify({ error: "invalid_json" }), { status: 400, headers: cors });
        }
        const parsed = LeadSchema.safeParse(body);
        if (!parsed.success) {
          return new Response(
            JSON.stringify({ error: "validation", issues: parsed.error.issues }),
            { status: 400, headers: cors }
          );
        }
        const lead = parsed.data;
        const row = [
          new Date().toISOString(),
          lead.first_name,
          lead.last_name,
          lead.email,
          lead.phone,
          lead.requirement,
          lead.budget,
          lead.source,
        ];
        const [sheet, mail] = await Promise.all([appendToSheet(row), sendBrevoEmail(lead)]);
        return new Response(JSON.stringify({ ok: true, sheet, mail }), { status: 200, headers: cors });
      },
    },
  },
});
