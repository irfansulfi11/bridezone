# Bridezone · Wedding Services Demo

A client-facing **demo** of a wedding-services marketplace for the Kerala / South-India
market — photographers, caterers, decor, venues, music, and heirloom bridal jewellery,
plus a budget-based **Planning Assistant**.

> **Front-end only.** There is no backend, no database, no API calls and no real auth.
> All data lives in local TypeScript files and every "change" (approvals, toggles, form
> submissions) updates React state only. Changes reset on a full page refresh — that's
> expected for a demo.

## Tech

- **React 18 + TypeScript + Vite**
- **Tailwind CSS** (custom maroon / gold / ivory theme)
- **React Router** for routing
- **lucide-react** icons
- Google Fonts: Playfair Display (display serif) + Inter (body)

## Run locally

```bash
cd wedding-demo
npm install
npm run dev          # start the dev server (prints a http://localhost:5173 URL)
```

Other scripts:

```bash
npm run build        # type-check + production build into dist/
npm run preview      # serve the production build locally
```

## Demo accounts

Shown on the login page too (tap a card to auto-fill).

| Role   | Email             | Password    | Lands on     |
| ------ | ----------------- | ----------- | ------------ |
| Admin  | `admin@demo.com`  | `admin123`  | `/admin`     |
| Vendor | `vendor@demo.com` | `vendor123` | `/dashboard` |

The signed-in session is persisted in `localStorage`, so a refresh won't log you out.

## The demo loop to show a client

1. **Enquiry → inbox:** open any vendor → **Send Enquiry** → fill + submit. Then log in as
   **admin** and open **Enquiries** — your enquiry is at the top of the inbox.
2. **Approval → public listing:** as admin, go to **Vendor approvals** and **Approve** a
   pending vendor (e.g. *Kollam Feast Kitchen*). Open **/vendors** — it now appears publicly.
   (Pending vendors are hidden from the public directory.)
3. **Featured → showcase:** as admin, toggle **Featured** on a collection under
   **Collections**; it changes the public `/collections` order and the home teaser.
4. **Planning Assistant:** open **/plan**, set a budget + city + services, and get a
   recommended vendor per service, ranked by budget fit — all computed client-side.

> Tip: navigate with the in-app links (not a hard browser refresh) so the state you create
> during the demo stays live across pages.

## Pages

- Public: `/` Home · `/vendors` listing (filters) · `/vendors/:id` detail ·
  `/plan` Planning Assistant · `/collections` showcase · `/collections/:id` detail ·
  `/login`
- Protected: `/admin` (admin only — dashboard, approvals, enquiries, collections,
  categories) · `/dashboard` (vendor only — profile, editable packages, enquiries received)

## Images

Photos load at runtime from **Unsplash** with a **picsum** fallback; if the network is
unavailable, an on-brand gradient placeholder is shown instead — so images never appear
broken. No image API keys are required.

## Deploy to Vercel (static SPA, zero env vars)

**Option A — Vercel dashboard**

1. Push this project to a Git repo (or drag-and-drop the folder in the Vercel dashboard).
2. **New Project** → import the repo.
3. Set **Root Directory** to `wedding-demo` (only needed if the repo root isn't this folder).
4. Framework preset: **Vite**. Build command `npm run build`, output directory `dist`
   (Vercel auto-detects these). **No environment variables are needed.**
5. Deploy.

**Option B — Vercel CLI**

```bash
cd wedding-demo
npm i -g vercel
vercel            # follow prompts; accept the detected Vite settings
vercel --prod
```

`vercel.json` already rewrites all routes to `index.html` so client-side routes like
`/vendors/lens-and-light` work on direct load / refresh.
