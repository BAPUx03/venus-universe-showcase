import { createClient } from "@supabase/supabase-js";
import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

export default defineTool({
  name: "get_site_content",
  title: "Get site content",
  description:
    "Fetch a piece of publicly editable site content (hero copy, sections, etc.) by its key. Returns the raw JSON value stored for that key.",
  inputSchema: {
    key: z
      .string()
      .trim()
      .min(1)
      .describe("The content key to fetch, e.g. 'hero', 'about', 'contact'."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ key }) => {
    const url = process.env.SUPABASE_URL;
    const anon = process.env.SUPABASE_PUBLISHABLE_KEY;
    if (!url || !anon) {
      return {
        content: [{ type: "text", text: "Backend is not configured." }],
        isError: true,
      };
    }
    const supabase = createClient<Database>(url, anon, {
      auth: { persistSession: false, autoRefreshToken: false, storage: undefined },
    });
    const { data, error } = await supabase
      .from("site_content")
      .select("key, value, updated_at")
      .eq("key", key)
      .maybeSingle();
    if (error) {
      return { content: [{ type: "text", text: error.message }], isError: true };
    }
    if (!data) {
      return { content: [{ type: "text", text: `No content found for key "${key}".` }] };
    }
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
      structuredContent: data as unknown as Record<string, unknown>,
    };
  },
});
