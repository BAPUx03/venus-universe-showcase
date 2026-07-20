# Deploy to Netlify (Hybrid: Frontend on Netlify, Backend on Lovable)

This project uses a **hybrid hosting** setup:
- **Frontend (website)** → Netlify (static SPA)
- **Backend (`/api/public/*`, OTP, leads, notify)** → Lovable Cloud (Cloudflare)

The frontend reads `VITE_API_BASE_URL` at build time and prefixes every
backend call with the Lovable URL. CORS is already enabled on the API routes.

---

## 1. Make sure Lovable is published

Click **Publish** in Lovable so the backend is live at:
`https://venus-universe-showcase.lovable.app`

The OTP, leads, and notify endpoints must be reachable here. Test:
```
curl -X POST https://venus-universe-showcase.lovable.app/api/public/otp \
  -H "Content-Type: application/json" \
  -d '{"action":"send","phone":"+919999999999"}'
```

## 2. Push code to GitHub

In Lovable: **Connectors → GitHub → Connect project**.

## 3. Create the Netlify site

1. https://app.netlify.com → **Add new site → Import an existing project**
2. Pick **GitHub** and select your repo
3. Build settings auto-detect from `netlify.toml`:
   - **Build command:** `npm run build && npm run validate:seo && node scripts/prerender-static.mjs`
   - **Publish directory:** `.output/public`
4. Click **Deploy site** (first deploy will likely fail until env vars are set).

## 4. Add environment variables (CRITICAL)

In Netlify: **Site settings → Environment variables → Add a variable**.

| Variable | Value |
|---|---|
| `VITE_API_BASE_URL` | `https://venus-universe-showcase.lovable.app` |
| `VITE_SUPABASE_URL` | `https://yszfvicefomtrwbzemct.supabase.co` |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | (anon key from your `.env`) |
| `VITE_SUPABASE_PROJECT_ID` | `yszfvicefomtrwbzemct` |

> No `TWOFACTOR_API_KEY`, `BREVO_API_KEY`, `GOOGLE_*` etc. on Netlify — those
> stay on Lovable Cloud since the backend runs there.

After adding variables: **Deploys → Trigger deploy → Clear cache and deploy site**.

## 5. Verify

- Open the Netlify URL → site should load (real HTML shell, then SPA hydrates)
- Open browser DevTools → Network → submit the EOI form → the OTP request
  should go to `venus-universe-showcase.lovable.app/api/public/otp`
- OTP should arrive on phone via SMS (4-digit)
- After verifying OTP → lead should appear in the database and notification email should fire

## 6. Custom domain

**Netlify → Domain settings → Add custom domain**. The Lovable backend URL
stays the same — only the frontend domain changes.

---

## How it works

- `vite.config.ts` disables the Cloudflare plugin when `DEPLOY_TARGET=netlify`
  (so the build doesn't produce a Cloudflare Worker).
- `scripts/prerender-static.mjs` renders every sitemap URL plus `/eoi` and
  `/studio` into `.output/public`, and creates static robots, sitemap and 404 files.
- Unknown paths use the generated `404.html`; there is no SEO-damaging SPA
  fallback that serves homepage HTML with status 200.
- `src/lib/apiBase.ts` prepends `VITE_API_BASE_URL` to every backend fetch.

If anything fails, check Netlify → **Deploys → Deploy log** and the browser
**Network** tab.
