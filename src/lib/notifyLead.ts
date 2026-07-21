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
  const response = await fetch(apiUrl("/api/public/notify-lead"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(lead),
    keepalive: true,
  });
  const result = (await response.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
  if (!response.ok || !result?.ok) {
    throw new Error(result?.error || "Unable to save your details. Please try again.");
  }
}
