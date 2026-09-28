import { ArrowUpRight } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Tilt } from "@/components/site/Tilt";
import { Reveal } from "@/components/site/Reveal";
import { Faq } from "@/components/site/Faq";
import { CtaBand } from "@/components/site/CtaBand";
import { usePageMeta } from "@/lib/usePageMeta";
import { links, mdaAudiences, mdaCopy, mdaDocumentRows, mdaFaqs, tools } from "@/config/site";

export default function MyDailyActivity() {
  usePageMeta(
    "My Daily Activity, by Talkeez — document care, behavior, learning, and progress",
    "My Daily Activity is Talkeez's paid subscription application for documenting care, behavior, learning, and progress — for families, educators, caregivers, and support teams."
  );

  return (
    <SiteLayout>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden" data-testid="mda-hero">
        <div className="mx-auto grid max-w-6xl items-center gap-16 px-6 pb-24 pt-16 md:pt-24 lg:grid-cols-2">
          <div>
            <Reveal y={16}>
              <p
                className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-ink-2"
                data-testid="mda-hero-badge"
              >
                <span className="size-1.5 rounded-full bg-bubble-yellow" aria-hidden="true" />
                {mdaCopy.badge}
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h1
                className="mt-7 text-balance text-[clamp(2.4rem,5vw,4rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-ink"
                data-testid="mda-hero-headline"
              >
                {mdaCopy.name}. <span className="text-bubble-blue">{mdaCopy.tagline}</span>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-2" data-testid="mda-hero-description">
                {mdaCopy.description}
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href={mdaCopy.primaryCta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-8 py-4 text-sm font-bold text-cream transition-colors duration-200 hover:bg-bubble-blue"
                  data-testid="mda-hero-cta"
                >
                  {mdaCopy.primaryCta.label}
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </a>
                <a
                  href={mdaCopy.demoCta.href}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-line-2 bg-paper px-8 py-4 text-sm font-bold text-ink transition-colors duration-200 hover:border-ink"
                  data-testid="mda-hero-demo-cta"
                >
                  {mdaCopy.demoCta.label}
                </a>
              </div>
              <p className="mt-5 max-w-md text-sm font-medium text-ink-3" data-testid="mda-separate-note">
                {mdaCopy.separateNote}
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.2} className="relative">
            <div
              className="pointer-events-none absolute -top-10 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-bubble-yellow/40 blur-3xl"
              aria-hidden="true"
            />
            <Tilt className="relative rotate-1">
            <figure className="rounded-3xl border border-line bg-paper p-2.5 shadow-[0_32px_70px_-16px_rgba(15,27,61,0.28)]">
              <img
                src={mdaCopy.demoImg}
                alt={mdaCopy.demoImgAlt}
                className="aspect-[8/6] w-full rounded-2xl border border-line/60 object-cover object-top"
              />
              <figcaption className="flex items-center justify-between px-3 py-2.5 text-xs font-bold uppercase tracking-wider text-ink-3">
                Interactive demo <span className="text-bubble-blue">Sample data</span>
              </figcaption>
            </figure>
            </Tilt>
          </Reveal>
        </div>
      </section>

      {/* ── What it documents ────────────────────────────── */}
      <section className="border-y border-line bg-paper" data-testid="mda-documents">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-bubble-blue">What it documents</p>
            <h2 className="mt-4 max-w-2xl text-balance text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
              The whole day, in one calm record.
            </h2>
          </Reveal>
          <div className="mt-12 divide-y divide-line border-y border-line">
            {mdaDocumentRows.map((row, i) => (
              <Reveal key={row.n} delay={i * 0.08}>
                <div className="grid gap-2 py-7 md:grid-cols-[80px_240px_1fr] md:items-baseline md:gap-8" data-testid={`mda-doc-row-${row.n}`}>
                  <span className="text-sm font-extrabold text-bubble-yellow [text-shadow:0_0_0_#0B1220]">{row.n}</span>
                  <h3 className="text-xl font-extrabold tracking-tight text-ink">{row.title}</h3>
                  <p className="leading-relaxed text-ink-2">{row.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Who it's for ─────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 py-24" data-testid="mda-audiences">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-bubble-blue">Who it’s for</p>
          <h2 className="mt-4 max-w-2xl text-balance text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
            Built with — and for — the people in the room.
          </h2>
        </Reveal>
        <div className="mt-12 space-y-5">
          {mdaAudiences.map((aud, i) => (
            <Reveal key={aud.testId} delay={i * 0.08}>
              <div
                className="flex flex-col gap-5 rounded-3xl border border-line bg-paper p-8 md:flex-row md:items-center md:justify-between"
                data-testid={aud.testId}
              >
                <div className="max-w-2xl">
                  <h3 className="text-2xl font-extrabold tracking-tight text-ink">{aud.title}</h3>
                  <p className="mt-2 leading-relaxed text-ink-2">{aud.text}</p>
                </div>
                <div className="flex shrink-0 flex-col items-start gap-3">
                  <a
                    href={aud.cta.href}
                    {...(aud.cta.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-bold text-cream transition-colors duration-200 hover:bg-bubble-blue"
                    data-testid={`${aud.testId}-cta`}
                  >
                    {aud.cta.label}
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </a>
                  {"extra" in aud && aud.extra && (
                    <a
                      href={aud.extra.href}
                      className="text-sm font-semibold text-ink-2 underline underline-offset-4 transition-colors hover:text-bubble-blue"
                      data-testid={`${aud.testId}-extra`}
                    >
                      {aud.extra.label}
                    </a>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Free tools cross-link ────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 pb-24" data-testid="mda-free-tools-note">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-5 rounded-3xl border border-dashed border-line-2 bg-surface-2 p-8 md:flex-row md:items-center">
            <p className="max-w-2xl leading-relaxed text-ink-2">
              Just looking for the free tools? The{" "}
              <a href={tools[0].href} className="font-semibold text-ink underline underline-offset-4 hover:text-bubble-blue">AAC board</a>,{" "}
              <a href={tools[1].href} className="font-semibold text-ink underline underline-offset-4 hover:text-bubble-blue">Sensory Timer</a>, and{" "}
              <a href={tools[2].href} className="font-semibold text-ink underline underline-offset-4 hover:text-bubble-blue">Picture Cards</a>{" "}
              stay free — no account, no sign-up. Related:{" "}
              <a href={links.legacy.aiInsights} className="font-semibold text-ink underline underline-offset-4 hover:text-bubble-blue" data-testid="mda-ai-insights-link">
                AI Insights
              </a>
              .
            </p>
          </div>
        </Reveal>
      </section>

      {/* ── FAQ ──────────────────────────────────────────── */}
      <section className="mx-auto max-w-4xl px-6 pb-24" data-testid="mda-faq">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-bubble-blue">Questions</p>
          <h2 className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
            About My Daily Activity.
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="mt-10">
          <Faq items={mdaFaqs} idPrefix="mda-faq" />
        </Reveal>
      </section>

      <CtaBand />
    </SiteLayout>
  );
}
