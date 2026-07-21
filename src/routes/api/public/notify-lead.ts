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

type Lead = z.infer<typeof LeadSchema>;

const SHEETS_GATEWAY = "https://connector-gateway.lovable.dev/google_sheets/v4";
const BREVO_URL = "https://api.brevo.com/v3/smtp/email";
const BRAND = "Venus Universe Nehrunagar";
const ACCENT = "#b4281e";
const ACCENT_DEEP = "#7a1a13";

function escapeHtml(s: string) {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function sourceLabel(s: string) {
  const map: Record<string, string> = {
    eoi_form: "EOI Booking",
    contact_form: "Contact Form",
    lead_gate: "Brochure / Lead Gate",
  };
  return map[s] ?? s;
}

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

async function sendBrevo(payload: Record<string, unknown>) {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) return { ok: false, error: "brevo_key_missing" };
  try {
    const res = await fetch(BREVO_URL, {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const t = await res.text();
      console.error(`[notify-lead] Brevo failed [${res.status}]: ${t}`);
      return { ok: false, error: `brevo_${res.status}: ${t.slice(0, 200)}` };
    }
    return { ok: true };
  } catch (e) {
    console.error("[notify-lead] Brevo exception:", e);
    return { ok: false, error: "brevo_exception" };
  }
}

function adminHtml(lead: Lead) {
  const fullName = `${lead.first_name} ${lead.last_name}`.trim();
  return `<!doctype html><html><body style="margin:0;padding:0;background:#f4f4f5;font-family:Arial,Helvetica,sans-serif;color:#111">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:24px 0">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 6px 24px rgba(0,0,0,0.08)">
        <tr><td style="background:linear-gradient(135deg,${ACCENT},${ACCENT_DEEP});padding:24px 28px;color:#fff">
          <div style="font-size:11px;letter-spacing:3px;text-transform:uppercase;opacity:0.9">${escapeHtml(BRAND)}</div>
          <div style="font-size:22px;font-weight:700;margin-top:6px">🔔 New Lead Captured</div>
          <div style="font-size:13px;opacity:0.9;margin-top:4px">Source: ${escapeHtml(sourceLabel(lead.source))}</div>
        </td></tr>
        <tr><td style="padding:28px">
          <div style="font-size:18px;font-weight:600;color:#111;margin-bottom:18px">${escapeHtml(fullName)}</div>
          <table width="100%" cellpadding="10" cellspacing="0" style="border-collapse:collapse;font-size:14px">
            <tr><td style="background:#fafafa;border:1px solid #eee;width:130px;color:#666;font-weight:600">Email</td><td style="border:1px solid #eee"><a href="mailto:${escapeHtml(lead.email)}" style="color:${ACCENT};text-decoration:none">${escapeHtml(lead.email)}</a></td></tr>
            <tr><td style="background:#fafafa;border:1px solid #eee;color:#666;font-weight:600">Phone</td><td style="border:1px solid #eee"><a href="tel:${escapeHtml(lead.phone)}" style="color:${ACCENT};text-decoration:none">${escapeHtml(lead.phone)}</a></td></tr>
            <tr><td style="background:#fafafa;border:1px solid #eee;color:#666;font-weight:600">Requirement</td><td style="border:1px solid #eee">${escapeHtml(lead.requirement || "—")}</td></tr>
            <tr><td style="background:#fafafa;border:1px solid #eee;color:#666;font-weight:600">Budget</td><td style="border:1px solid #eee">${escapeHtml(lead.budget || "—")}</td></tr>
            <tr><td style="background:#fafafa;border:1px solid #eee;color:#666;font-weight:600">Received</td><td style="border:1px solid #eee">${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST</td></tr>
          </table>
          <div style="margin-top:24px;padding:14px 16px;background:#fff7f6;border-left:4px solid ${ACCENT};border-radius:4px;font-size:13px;color:#444">
            ⏱ <b>Action required:</b> Call this lead within 5 minutes for highest conversion.
          </div>
          <div style="margin-top:22px;text-align:center">
            <a href="tel:${escapeHtml(lead.phone)}" style="display:inline-block;background:${ACCENT};color:#fff;text-decoration:none;padding:12px 26px;border-radius:6px;font-size:13px;font-weight:600;letter-spacing:1px;text-transform:uppercase">📞 Call ${escapeHtml(lead.first_name)}</a>
          </div>
        </td></tr>
        <tr><td style="background:#fafafa;padding:14px 28px;font-size:11px;color:#999;text-align:center;border-top:1px solid #eee">
          ${escapeHtml(BRAND)} · Lead Notification System
        </td></tr>
      </table>
    </td></tr>
  </table></body></html>`;
}

function clientHtml(lead: Lead) {
  const fullName = `${lead.first_name} ${lead.last_name}`.trim();
  return `<!doctype html><html><body style="margin:0;padding:0;background:#f7f4f2;font-family:Georgia,'Times New Roman',serif;color:#1a1a1a">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f7f4f2;padding:32px 0">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 8px 30px rgba(122,26,19,0.12)">
        <tr><td style="background:linear-gradient(135deg,${ACCENT},${ACCENT_DEEP});padding:36px 32px;text-align:center;color:#fff">
          <div style="font-size:11px;letter-spacing:4px;text-transform:uppercase;opacity:0.85;font-family:Arial,sans-serif">${escapeHtml(BRAND)}</div>
          <div style="font-size:30px;font-weight:400;margin-top:14px;font-style:italic">Thank You</div>
          <div style="width:50px;height:2px;background:#fff;margin:14px auto 0;opacity:0.6"></div>
        </td></tr>
        <tr><td style="padding:36px 36px 28px;font-family:Arial,Helvetica,sans-serif">
          <div style="font-size:17px;color:#222;margin-bottom:14px">Dear ${escapeHtml(fullName)},</div>
          <div style="font-size:15px;line-height:1.65;color:#444">
            Thank you for your interest in <b style="color:${ACCENT_DEEP}">${escapeHtml(BRAND)}</b>. We have received your enquiry and a member of our advisory team will personally reach out to you very shortly.
          </div>
          <div style="margin:26px 0;padding:18px 20px;background:#fff7f6;border-radius:8px;border:1px solid #f0d8d4">
            <div style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:${ACCENT};font-weight:700;margin-bottom:10px">Your Submission</div>
            <table width="100%" cellpadding="4" cellspacing="0" style="font-size:13.5px;color:#333">
              <tr><td style="color:#888;width:110px">Requirement</td><td><b>${escapeHtml(lead.requirement || "—")}</b></td></tr>
              <tr><td style="color:#888">Phone</td><td><b>${escapeHtml(lead.phone)}</b></td></tr>
              <tr><td style="color:#888">Email</td><td><b>${escapeHtml(lead.email)}</b></td></tr>
            </table>
          </div>
          <div style="font-size:14px;line-height:1.65;color:#444">
            In the meantime, if you have any urgent questions, feel free to reach us directly. Our team is delighted to assist you in discovering your future home at ${escapeHtml(BRAND)}.
          </div>
          <div style="margin-top:30px;padding-top:22px;border-top:1px solid #eee;font-size:14px;color:#333">
            Warm regards,<br/>
            <b style="color:${ACCENT_DEEP}">The ${escapeHtml(BRAND)} Team</b>
          </div>
        </td></tr>
        <tr><td style="background:#fafafa;padding:18px 32px;font-size:11px;color:#999;text-align:center;border-top:1px solid #eee;font-family:Arial,sans-serif">
          This is an automated confirmation. Please do not reply to this email.
        </td></tr>
      </table>
    </td></tr>
  </table></body></html>`;
}

async function sendAdminEmail(lead: Lead) {
  const to = process.env.NOTIFICATION_EMAIL;
  const sender = process.env.BREVO_SENDER_EMAIL;
  if (!to || !sender) return { ok: false, error: "admin_env_missing" };
  return sendBrevo({
    sender: { name: `${BRAND} Leads`, email: sender },
    to: [{ email: to }],
    replyTo: { email: lead.email, name: `${lead.first_name} ${lead.last_name}`.trim() },
    subject: `🔔 New Lead: ${lead.first_name} ${lead.last_name} — ${sourceLabel(lead.source)}`,
    htmlContent: adminHtml(lead),
  });
}

async function sendClientEmail(lead: Lead) {
  const sender = process.env.BREVO_SENDER_EMAIL;
  const replyTo = process.env.NOTIFICATION_EMAIL;
  if (!sender) return { ok: false, error: "client_env_missing" };
  return sendBrevo({
    sender: { name: BRAND, email: sender },
    to: [{ email: lead.email, name: `${lead.first_name} ${lead.last_name}`.trim() }],
    replyTo: replyTo ? { email: replyTo, name: `${BRAND} Team` } : undefined,
    subject: `Thank you for your interest in ${BRAND}`,
    htmlContent: clientHtml(lead),
  });
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
        try {
          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
          const { error } = await supabaseAdmin.from("leads").insert({
            first_name: lead.first_name,
            last_name: lead.last_name || "—",
            email: lead.email,
            phone: lead.phone,
            requirement: lead.requirement || "General enquiry",
            budget: lead.budget || "Not specified",
            source: lead.source,
          });
          if (error) throw error;
        } catch (error) {
          console.error("Lead storage failed", error);
          return new Response(
            JSON.stringify({ ok: false, error: "We couldn't save your details. Please try again." }),
            { status: 503, headers: cors },
          );
        }
        const row = [
          new Date().toISOString(),
          lead.first_name,
          lead.last_name,
          lead.email,
          lead.phone,
          lead.requirement,
          lead.budget,
          sourceLabel(lead.source),
        ];
        const [sheet, admin, client] = await Promise.all([
          appendToSheet(row),
          sendAdminEmail(lead),
          sendClientEmail(lead),
        ]);
        return new Response(
          JSON.stringify({ ok: true, sheet, admin, client }),
          { status: 200, headers: cors }
        );
      },
    },
  },
});
