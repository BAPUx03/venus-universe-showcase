import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const adminLogin = createServerFn({ method: "POST" })
  .inputValidator((input) =>
    z
      .object({
        email: z.string().trim().min(1).max(200),
        password: z.string().min(1).max(200),
      })
      .parse(input),
  )
  .handler(async ({ data }) => {
    const expectedEmail = process.env.ADMIN_EMAIL;
    const expectedPass = process.env.ADMIN_PASSWORD;
    if (!expectedEmail || !expectedPass) {
      throw new Error("Admin credentials are not configured on the server.");
    }
    const { issueAdminToken, constantTimeEqual } = await import("./auth.server");
    const okEmail = constantTimeEqual(
      data.email.trim().toLowerCase(),
      expectedEmail.trim().toLowerCase(),
    );
    const okPass = constantTimeEqual(data.password, expectedPass);
    if (!okEmail || !okPass) {
      // small delay to blunt brute-force timing signal
      await new Promise((r) => setTimeout(r, 400));
      throw new Error("Invalid email or password.");
    }
    return { token: await issueAdminToken() };
  });

export const adminVerify = createServerFn({ method: "POST" })
  .inputValidator((input) => z.object({ token: z.string() }).parse(input))
  .handler(async ({ data }) => {
    const { verifyAdminToken } = await import("./auth.server");
    return { valid: await verifyAdminToken(data.token) };
  });
