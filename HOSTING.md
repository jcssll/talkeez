# Talkeez marketing site — running, building, hosting

## What's here
- `frontend/` — Vite + React + TypeScript app. The new marketing pages (homepage, My Daily Activity overview) are React routes; the existing Talkeez site (tools, legal pages, donate, contact) is preserved as static files in `frontend/public/` and served untouched.
- `backend/` — FastAPI + MongoDB template backend. The marketing site does not need it; it only carries the template's `/api/status` probe.
- `frontend/src/config/site.ts` — central configuration: all page copy, navigation, links, and the offer-details review queue (pricing, trial terms — unconfirmed, unpublished).

## Local development
```bash
cd frontend && yarn install && yarn dev     # http://localhost:3000
cd backend && uvicorn server:app --reload --port 8001   # optional, /api only
```
Copy `frontend/.env.example` / `backend/.env.example` to `.env` if you need local overrides. No secrets are required for the marketing pages.

## Production build
```bash
cd frontend && yarn build      # outputs static site to frontend/dist/
cd frontend && yarn typecheck  # type gate (tsc -b), run before shipping
```
`dist/` is a fully static bundle: the React marketing pages plus all preserved legacy pages and tools.

## Independent hosting
Serve `frontend/dist/` from any static host (Netlify, Vercel, Cloudflare Pages, S3 + CDN, nginx). Two hosting rules:
1. SPA fallback: rewrite unknown paths (e.g. `/my-daily-activity`) to `index.html`. Direct file paths (`/aac.html`, `/css/…`) must be served as-is — every static host does this automatically.
2. The `/api/*` proxy is only needed for the template status probe; the marketing pages make no API calls, so a purely static host works.

Example `serve` config matching the original deployment style:
```bash
npx serve dist -l 3000    # with cleanUrls disabled so .html URLs stay exact
```

## Preserved URLs
- `/aac.html`, `/sensory-timer.html`, `/picture-cards.html` (+ clean-URL redirects `/aac`, `/sensory-timer`, `/picture-cards`)
- `/daily-activity.html`, `/daily-activity-demo.html`, `/ai-insights.html`, `/district-solutions.html`, `/about.html`, `/help.html`, `/contact.html`, `/donate.html`, `/privacy.html`, `/terms.html`, `/hipaa.html`, `/ferpa.html`, `/accessibility.html`

## Forms
The contact page uses Talkeez's live Calendly widget and the donations page uses Talkeez's Stripe links — both have working destinations. No form on the site shows a fake success message.
