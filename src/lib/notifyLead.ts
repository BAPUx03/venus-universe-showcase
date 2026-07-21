export interface LeadPayload {
  first_name: string;
  last_name?: string;
  email: string;
  phone: string;
  requirement?: string;
  budget?: string;
  message?: string;
  source?: string;
}

import { apiUrl } from "./apiBase";

export async function notifyLead(lead: LeadPayload): Promise<void> {
  try {
    await fetch(apiUrl("/api/public/notify-lead"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
      keepalive: true,
    });
  } catch (e) {
    // Non-blocking — never break the form on notification failure
    console.warn("notifyLead failed:", e);
  }
}
