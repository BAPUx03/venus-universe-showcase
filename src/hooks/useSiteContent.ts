import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { defaultContent, type SiteContent } from "@/content/defaultContent";

/** Recursively merge DB overrides on top of defaults.
 *  - Arrays: if override is a non-empty array, use override; otherwise keep defaults.
 *    (Prevents the site from crashing when stale DB rows are missing array fields.)
 *  - Plain objects: deep-merge so missing keys fall back to defaults.
 *  - Primitives: override wins when defined. */
function deepMerge<T>(defaults: T, override: unknown): T {
  if (Array.isArray(defaults)) {
    if (Array.isArray(override) && override.length > 0) return override as unknown as T;
    return defaults;
  }
  if (defaults && typeof defaults === "object") {
    if (!override || typeof override !== "object" || Array.isArray(override)) return defaults;
    const out: Record<string, unknown> = { ...(defaults as Record<string, unknown>) };
    const ov = override as Record<string, unknown>;
    for (const k of Object.keys(ov)) {
      const dv = (defaults as Record<string, unknown>)[k];
      out[k] = dv !== undefined ? deepMerge(dv, ov[k]) : ov[k];
    }
    return out as T;
  }
  return (override === undefined || override === null ? defaults : (override as T));
}

function merge(defaults: SiteContent, overrides: Record<string, unknown>): SiteContent {
  const out: Record<string, unknown> = { ...defaults };
  for (const k of Object.keys(overrides)) {
    const dv = (defaults as Record<string, unknown>)[k];
    out[k] = dv !== undefined ? deepMerge(dv, overrides[k]) : overrides[k];
  }
  return out as SiteContent;
}

export function useSiteContent() {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      const { data } = await supabase.from("site_content").select("key, value");
      if (!active) return;
      if (data && data.length) {
        const overrides: Record<string, unknown> = {};
        for (const row of data) overrides[row.key as string] = row.value;
        setContent(merge(defaultContent, overrides));
      }
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, []);

  return { content, loading };
}

export async function saveSiteContentKey(key: string, value: unknown) {
  const { error } = await supabase
    .from("site_content")
    .upsert({ key, value: value as never }, { onConflict: "key" });
  if (error) throw error;
}
