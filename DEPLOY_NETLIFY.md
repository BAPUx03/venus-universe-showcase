# Deploy to Netlify

This project is built with **TanStack Start** and supports both Lovable's
default hosting (Cloudflare Workers) and **Netlify**. The Netlify build is
selected automatically when the `DEPLOY_TARGET=netlify` environment variable
is set (already configured in `netlify.toml`).

## 1. Push code to GitHub

In Lovable: **Connectors → GitHub → Connect project** and create the repo.

## 2. Create the Netlify site

1. Go to https://app.netlify.com → **Add new site → Import an existing project**
2. Pick **GitHub** and select your repo
3. Build settings (Netlify usually auto-detects from `netlify.toml`):
   - **Build command:** `npm run build`
   - **Publish directory:** `.output/public`
   - **Functions directory:** *(leave default)*
4. Click **Deploy site** — first deploy will run.

## 3. Add environment variables (CRITICAL)

In Netlify: **Site settings → Environment variables → Add variables**.
Add ALL of these (copy values from Lovable Cloud → Secrets):

| Variable | Where to copy from |
|---|---|
| `TWOFACTOR_API_KEY` | Lovable Cloud → Secrets |
| `BREVO_API_KEY` | Lovable Cloud → Secrets |
| `BREVO_SENDER_EMAIL` | Lovable Cloud → Secrets |
| `NOTIFICATION_EMAIL` | Lovable Cloud → Secrets |
| `GOOGLE_SHEET_ID` | Lovable Cloud → Secrets |
| `GOOGLE_SHEETS_API_KEY` | Lovable Cloud → Connectors → Google Sheets |
| `SUPABASE_URL` | `https://yszfvicefomtrwbzemct.supabase.co` |
| `SUPABASE_PUBLISHABLE_KEY` | from `.env` (anon key) |
| `VITE_SUPABASE_URL` | same as `SUPABASE_URL` |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | same as `SUPABASE_PUBLISHABLE_KEY` |
| `VITE_SUPABASE_PROJECT_ID` | `yszfvicefomtrwbzemct` |

After adding variables, click **Trigger deploy → Clear cache and deploy site**.

## 4. Verify

- Open the Netlify URL → site should load
- Submit the EOI form → OTP should arrive on phone (SMS)
- After verifying OTP → lead should:
  - appear in Supabase `leads` table
  - send notification email via Brevo
  - append a row to your Google Sheet

If anything fails, check **Netlify → Deploys → Functions → server logs**.

## Notes

- The `netlify.toml` already configures the redirect so all routes
  (including `/api/public/*`) go through the SSR function.
- Lovable preview keeps using Cloudflare — Netlify only activates when
  `DEPLOY_TARGET=netlify` is set (Netlify sets it via `netlify.toml`).
- Custom domain: **Netlify → Domain settings → Add custom domain**.
