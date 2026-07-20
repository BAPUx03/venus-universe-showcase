import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const adminSaveContent = createServerFn({ method: "POST" })
  .inputValidator((input) =>
    z
      .object({
        token: z.string().min(1),
        key: z.string().trim().min(1).max(120),
        value: z.unknown(),
      })
      .parse(input),
  )
  .handler(async ({ data }) => {
    const { verifyAdminToken } = await import("./auth.server");
    if (!(await verifyAdminToken(data.token))) throw new Error("Unauthorized");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("site_content")
      .upsert(
        { key: data.key, value: data.value as never },
        { onConflict: "key" },
      );
    if (error) throw new Error(error.message);
    return { ok: true };
  });
