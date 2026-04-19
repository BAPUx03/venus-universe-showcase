import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { defaultContent, type SiteContent } from "@/content/defaultContent";

/** Deep-merge DB overrides on top of defaults (shallow per top-level key). */
function merge(defaults: SiteContent, overrides: Record<string, unknown>): SiteContent {
  const out: Record<string, unknown> = { ...defaults };
  for (const k of Object.keys(overrides)) {
    const dv = (defaults as Record<string, unknown>)[k];
    const ov = overrides[k];
    if (dv && typeof dv === "object" && !Array.isArray(dv) && ov && typeof ov === "object" && !Array.isArray(ov)) {
      out[k] = { ...dv, ...ov };
    } else if (ov !== undefined && ov !== null) {
      out[k] = ov;
    }
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
