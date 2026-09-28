# Talkeez Marketing Website — PRD

## Original problem statement
Build an exportable marketing website for Talkeez (independent software company; free tools: AAC, Sensory Timer, Picture Cards; paid product: My Daily Activity — mydailyactivity.org). Milestone-based delivery: (1) shared design system + homepage + product overview, (2) audience pages, (3) QA + export. Do not invent pricing/claims; keep unconfirmed offer details in a central config flagged for review; preserve existing tool URLs and functionality; no new backend unless needed.

## Imported repository (inspected, reused — not rebuilt)
- Source: github.com/jcssll/talkeez — plain HTML + CSS + vanilla JS static site, deployed via `serve public` on port 3000.
- Imported unchanged into `frontend/public/`: all tools (aac.html, sensory-timer.html, picture-cards.html), daily-activity.html + demo, ai-insights, district-solutions, about, contact (Calendly widget), help, donate (Stripe), privacy, terms, hipaa, ferpa, accessibility, plus css/js/data assets. `index.html` was NOT imported (replaced by the new React homepage; `/index.html` redirects to `/`).
- Clean tool URLs preserved via redirect routes: /aac → /aac.html etc.

## User personas
Families · educators & schools · providers & support teams · free-tool visitors.

## Architecture
- New marketing pages: Vite + React + TS routes in the existing pod frontend (Home `/`, My Daily Activity `/my-daily-activity`, 404).
- Design system: Tailwind v4 tokens in `src/index.css` (Talkeez warm palette #F7F5EF / navy / bubble RYG accents, Manrope bundled locally via @fontsource-variable — user explicitly chose Manrope-only, no serif, no runtime Google Fonts on new pages).
- Shared components: `src/components/site/` — SiteLayout, SiteHeader, SiteFooter, Reveal (motion), Marquee, Faq, CtaBand, ToolCard.
- Central config: `src/config/site.ts` — ALL copy, nav, links, FAQs + `offerReviewQueue` (unconfirmed business decisions, unpublished).
- Motion: `motion/react` reveals + Lenis smooth scroll, both disabled under prefers-reduced-motion.
- Real product screenshots captured from the live tools → `public/assets/screenshots/`.

## Confirmed business decisions (from user, milestone 1)
1. Demo/pilot CTA → existing Calendly: calendly.com/subscriptions-talkeez.
2. No pricing or trial claims anywhere; pricing fields flagged in config review queue.
3. Legacy pages all preserved; main nav = Free tools / My Daily Activity / FAQ / Contact; footer carries About, Help, Donate (footer-only), and a "Privacy & policies" group (Privacy, Terms, HIPAA, FERPA, Accessibility) — never as badges/certification claims; HIPAA/FERPA content accuracy flagged for separate review. Districts linked from schools context; AI Insights linked from MDA overview.
4. Manrope everywhere, bundled locally (OFL 1.1), system sans fallback.
5. Exact brief hero copy + refined supporting copy; primary CTA → mydailyactivity.org; secondary CTA → #free-tools.

## Implemented (2026-09-28, milestone 1)
- [x] Shared design system, header, footer, FAQ, CTA band, tool/bento cards
- [x] Homepage: kinetic masked-line hero w/ parallax real-tool screenshots, editorial marquee, featured MDA section ("My Daily Activity, by Talkeez" unmistakable, paid vs free labeled), free-tools bento + contextual invite (no sync implied), FAQ, CTA band
- [x] My Daily Activity overview: hero w/ demo screenshot, what-it-documents rows, audience rows (families/schools/providers w/ correct CTAs + Districts link), free-tools cross-link + AI Insights, FAQ, CTA band
- [x] Page-specific titles/descriptions, skip link, aria on accordion/nav, data-testid coverage
- [x] Delivery: HOSTING.md (local dev, build, independent static hosting), ASSETS.md (licenses), .env.example files (no secrets)
- [x] Verified: typecheck clean; /api/status 200 via public URL; all sections render desktop+mobile; mobile nav works; /aac clean URL → working tool; FAQ opens; no console errors

## Review queue (missing business decisions — consolidated, see site.ts offerReviewQueue)
- MDA pricing; trial terms; exact signup URL on mydailyactivity.org; HIPAA/FERPA statement accuracy; Districts final placement.

## Backlog
- P0 (milestone 2): audience pages (For Families, For Educators & Schools, For Providers & Support Teams) from a reusable audience template; Contact/demo page refresh in new design system; FAQ page route
- P1: real destination decision for demo form if Calendly is replaced; sitemap/robots; structured data
- P2: blog/press; privacy-friendly analytics; district procurement downloads

## Test credentials
- None — no auth in this site. See /app/memory/test_credentials.md.
