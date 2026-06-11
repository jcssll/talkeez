
Action: file_editor create /app/memory/PRD.md --file-text "# Talkeez — PRD

## Problem Statement (original, summarized)
Build a modern, responsive corporate website for Talkeez — a mission-driven software company helping children with special needs and the specialists who support them — plus a fully-functional Free AAC web app. Must be plain HTML + CSS + Vanilla JS (no React/Vite/CRA). Mobile-first, accessibility-focused, professional enterprise styling.

## Audience
Parents · Teachers · SPED Staff · ABA Therapists · SLPs · Behavioral Specialists · District Administrators.

## Mission
Every child deserves a voice.

## Tech Stack
- Frontend only: static HTML + CSS + Vanilla JS served by `serve` package on port 3000 (via existing supervisor `frontend` program).
- No backend, no database.
- Web Speech API (built-in browser) for AAC TTS.
- Stripe Buy Button + Payment Link for donations.

## Pages Implemented (Feb 2026)
1. `/index.html` — Home (hero, audiences, products, values, CTA)
2. `/aac.html` — Free AAC tool (8 categories, ~100 vocab tiles, sentence builder, TTS)
3. `/daily-activity.html` — Daily Activity product page
4. `/ai-insights.html` — AI Insights product page
5. `/district-solutions.html` — Districts solution page
6. `/about.html` — Founder story, mission, values
7. `/contact.html` — Contact form (static success state)
8. `/donate.html` — Donate page with Stripe Payment Link + Buy Button
9. `/help.html` — Help & FAQ (AAC, Daily Activity, support)
10. `/privacy.html` — Privacy Policy
11. `/terms.html` — Terms of Service
12. `/hipaa.html` — HIPAA Compliance Statement
13. `/ferpa.html` — FERPA Notice
14. `/accessibility.html` — WCAG Accessibility Statement

## Shared Assets
- `/css/styles.css` — design system (neutral enterprise palette + bubble RYG accents, Fraunces + Manrope fonts)
- `/js/layout.js` — shared nav + footer auto-mount
- `/js/nav.js` — mobile toggle, active link, FAQ accordion, contact form handler
- `/js/speech.js` — Web Speech API helper (`TalkeezSpeech.speak`)
- `/js/aac.js` — AAC grid + sentence builder
- `/data/aacCategories.js` — vocabulary data (Core, Feelings, Food, Actions, Places, People, School, Time)

## Core Requirements (status)
- [x] Mobile-first responsive design
- [x] Accessibility-focused (skip link, aria-labels, semantic HTML, keyboard-friendly tiles)
- [x] Fast loading (no React bundle; just HTML + ~10KB JS + CDN fonts/icons)
- [x] Modern SaaS / enterprise appearance
- [x] Clean, minimal animations (hover lift, sentence-token pulse)
- [x] High contrast text on warm off-white background
- [x] SEO-friendly meta tags on every page
- [x] data-testid coverage on key elements
- [x] Free AAC: full-screen, category grid, sentence builder, TTS, fullscreen toggle, no login
- [x] Stripe Payment Link + Buy Button on Donate

## Backlog (P1)
- Real email backend (Resend or SendGrid) for contact form submissions
- Save AAC sentence history to localStorage for quick replay
- Custom vocabulary editor in AAC (user-added tiles)
- Multi-language voices in AAC speech
- Blog / press section
- Analytics (privacy-friendly: Plausible or Umami)

## Backlog (P2)
- Daily Activity demo (sandbox) accessible from product page
- District procurement PDF and security one-pager downloads
- Newsletter signup
- Animated section reveals (Intersection Observer)
"
Observation: Create successful: /app/memory/PRD.md