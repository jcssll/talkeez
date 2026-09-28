import { useEffect, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowDown, ArrowUpRight, Check } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Reveal } from "@/components/site/Reveal";
import { Marquee } from "@/components/site/Marquee";
import { Faq } from "@/components/site/Faq";
import { CtaBand } from "@/components/site/CtaBand";
import { ToolCard } from "@/components/site/ToolCard";
import { usePageMeta } from "@/lib/usePageMeta";
import { freeToolsInvite, homeCopy, homeFaqs, links, mdaCopy, tools } from "@/config/site";

function MaskedLine({ children, index }: { children: ReactNode; index: number }) {
  const reduce = useReducedMotion();
  return (
    <span className="block overflow-hidden pb-[0.09em] -mb-[0.09em]">
      <motion.span
        className="block"
        initial={reduce ? false : { y: "112%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, delay: 0.15 + index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
}

function HeroVisual() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const yMain = useTransform(scrollY, [0, 700], [0, -46]);
  const yFast = useTransform(scrollY, [0, 700], [0, -90]);

  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none" data-testid="hero-visual">
      <div
        className="pointer-events-none absolute -top-12 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-bubble-yellow/40 blur-3xl"
        aria-hidden="true"
      />
      <motion.figure
        style={{ y: reduce ? 0 : yMain }}
        className="relative z-10 -rotate-2 rounded-3xl border border-line bg-paper p-2.5 shadow-[0_32px_70px_-16px_rgba(15,27,61,0.28)]"
      >
        <div className={reduce ? undefined : "animate-float"}>
          <img
            src="/assets/screenshots/aac.png"
            alt="The Talkeez free AAC communication board"
            className="aspect-[8/5] w-full rounded-2xl border border-line/60 object-cover object-top"
          />
          <figcaption className="flex items-center justify-between px-3 py-2.5 text-xs font-bold uppercase tracking-wider text-ink-3">
            Free AAC <span className="text-bubble-blue">Tap to speak</span>
          </figcaption>
        </div>
      </motion.figure>
      <motion.figure
        style={{ y: reduce ? 0 : yFast }}
        className="absolute -bottom-10 -left-4 z-20 w-44 rotate-3 rounded-2xl border border-line bg-paper p-2 shadow-[0_20px_45px_-12px_rgba(15,27,61,0.3)] sm:w-52 md:-left-10"
      >
        <img
          src="/assets/screenshots/sensory-timer.png"
          alt="The Talkeez sensory timer"
          className="aspect-square w-full rounded-xl border border-line/60 object-cover object-top"
        />
        <figcaption className="px-2 py-2 text-[10px] font-bold uppercase tracking-wider text-ink-3">
          Sensory Timer
        </figcaption>
      </motion.figure>
    </div>
  );
}

export default function Home() {
  usePageMeta(
    "Talkeez — Software for communication, daily routines, and a clearer picture of the day",
    "Free AAC, sensory timer, and picture-card tools from Talkeez — plus My Daily Activity, our paid application for documenting care, behavior, learning, and progress."
  );

  const { hash } = useLocation();
  useEffect(() => {
    if (!hash) return;
    const el = document.querySelector(hash);
    if (el) window.setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 120);
  }, [hash]);

  return (
    <SiteLayout>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden" data-testid="hero">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 pb-28 pt-16 md:pt-24 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Reveal y={16}>
              <p
                className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-ink-2"
                data-testid="hero-eyebrow"
              >
                <span className="size-1.5 rounded-full bg-bubble-green" aria-hidden="true" />
                {homeCopy.eyebrow}
              </p>
            </Reveal>
            <h1
              className="mt-7 text-[clamp(2.5rem,5vw,4rem)] font-extrabold leading-[1.04] tracking-[-0.035em] text-ink"
              data-testid="hero-headline"
              aria-label={homeCopy.headline}
            >
              <MaskedLine index={0}>Software for</MaskedLine>
              <MaskedLine index={1}>
                <span className="text-bubble-blue">communication,</span>
              </MaskedLine>
              <MaskedLine index={2}>daily routines,</MaskedLine>
              <MaskedLine index={3}>
                and a <span className="shadow-[inset_0_-0.32em_0_rgba(244,196,48,0.55)] [box-decoration-break:clone]">clearer</span>
              </MaskedLine>
              <MaskedLine index={4}>
                <span className="shadow-[inset_0_-0.32em_0_rgba(244,196,48,0.55)] [box-decoration-break:clone]">picture</span> of the day.
              </MaskedLine>
            </h1>
            <Reveal delay={0.55}>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink-2" data-testid="hero-supporting-copy">
                {homeCopy.supporting}
              </p>
            </Reveal>
            <Reveal delay={0.7}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href={homeCopy.primaryCta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-8 py-4 text-sm font-bold text-cream transition-colors duration-200 hover:bg-bubble-blue"
                  data-testid="cta-explore-mda"
                >
                  {homeCopy.primaryCta.label}
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </a>
                <a
                  href={homeCopy.secondaryCta.href}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-line-2 bg-paper px-8 py-4 text-sm font-bold text-ink transition-colors duration-200 hover:border-ink"
                  data-testid="cta-free-tools"
                >
                  {homeCopy.secondaryCta.label}
                  <ArrowDown className="size-4" aria-hidden="true" />
                </a>
              </div>
              <p className="mt-5 text-sm font-medium text-ink-3" data-testid="hero-clarity-note">
                {homeCopy.clarityNote}
              </p>
            </Reveal>
          </div>
          <HeroVisual />
        </div>
      </section>

      <Marquee />

      {/* ── Featured product: My Daily Activity ──────────── */}
      <section className="px-6 py-24" data-testid="mda-feature">
        <Reveal className="mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-navy-deep text-cream">
          <div className="grid items-center gap-12 p-8 md:p-14 lg:grid-cols-2">
            <div>
              <p
                className="inline-flex items-center gap-2 rounded-full bg-bubble-yellow px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-ink"
                data-testid="mda-badge"
              >
                {mdaCopy.badge}
              </p>
              <h2 className="mt-6 text-4xl font-extrabold tracking-tight md:text-5xl">{mdaCopy.name}</h2>
              <p className="mt-2 text-xl font-semibold text-bubble-yellow">{mdaCopy.tagline}</p>
              <p className="mt-5 max-w-lg leading-relaxed text-cream/75">{mdaCopy.description}</p>
              <ul className="mt-7 space-y-3.5">
                {mdaCopy.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-cream/90">
                    <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-bubble-green/20">
                      <Check className="size-3.5 text-bubble-green" aria-hidden="true" />
                    </span>
                    <span className="leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href={mdaCopy.primaryCta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-bubble-yellow px-7 py-3.5 text-sm font-bold text-ink transition-colors duration-200 hover:bg-cream"
                  data-testid="mda-feature-cta"
                >
                  {mdaCopy.primaryCta.label}
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </a>
                <a
                  href={mdaCopy.demoCta.href}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-cream/30 px-7 py-3.5 text-sm font-bold text-cream transition-colors duration-200 hover:border-cream hover:bg-cream/10"
                  data-testid="mda-demo-cta"
                >
                  {mdaCopy.demoCta.label}
                </a>
              </div>
              <p className="mt-5 text-sm text-cream/55">
                {mdaCopy.separateNote}{" "}
                <a href={links.legacy.aiInsights} className="font-semibold text-cream/80 underline underline-offset-4 hover:text-bubble-yellow" data-testid="mda-ai-insights-link">
                  See AI Insights
                </a>
              </p>
            </div>
            <div className="relative">
              <div
                className="pointer-events-none absolute -top-16 right-0 h-72 w-72 rounded-full bg-bubble-blue/30 blur-3xl"
                aria-hidden="true"
              />
              <figure className="relative rotate-1 rounded-3xl border border-cream/15 bg-cream/5 p-2.5 shadow-[0_32px_70px_-16px_rgba(0,0,0,0.5)]">
                <img
                  src={mdaCopy.demoImg}
                  alt={mdaCopy.demoImgAlt}
                  loading="lazy"
                  className="aspect-[8/6] w-full rounded-2xl object-cover object-top"
                />
                <figcaption className="px-3 py-2.5 text-xs font-bold uppercase tracking-wider text-cream/50">
                  Interactive demo · sample data
                </figcaption>
              </figure>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── Free tools bento ─────────────────────────────── */}
      <section id="free-tools" className="mx-auto max-w-6xl scroll-mt-24 px-6 pb-24" data-testid="free-tools">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-bubble-blue">Free tools · No sign-up</p>
          <div className="mt-4 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <h2 className="max-w-xl text-balance text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
              Open a tool. Use it today.
            </h2>
            <p className="max-w-sm leading-relaxed text-ink-2">
              Three free tools for communication and visual support — built to work instantly, for anyone who needs them.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3 md:grid-rows-2">
          {tools.map((tool, i) => (
            <Reveal
              key={tool.testId}
              delay={i * 0.1}
              className={tool.featured ? "md:col-span-2 md:row-span-2" : ""}
            >
              <ToolCard tool={tool} className="h-full" />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <div
            className="mt-5 flex flex-col items-start justify-between gap-5 rounded-3xl border border-dashed border-line-2 bg-surface-2 p-8 md:flex-row md:items-center"
            data-testid="free-tools-invite"
          >
            <p className="max-w-2xl leading-relaxed text-ink-2">{freeToolsInvite.text}</p>
            <a
              href={freeToolsInvite.cta.href}
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-ink px-6 py-3 text-sm font-bold text-ink transition-colors duration-200 hover:bg-ink hover:text-cream"
              data-testid="free-tools-invite-cta"
            >
              {freeToolsInvite.cta.label}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          </div>
        </Reveal>
      </section>

      {/* ── FAQ ──────────────────────────────────────────── */}
      <section id="faq" className="mx-auto max-w-4xl scroll-mt-24 px-6 pb-24" data-testid="home-faq">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-bubble-blue">Questions</p>
          <h2 className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
            Straight answers.
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="mt-10">
          <Faq items={homeFaqs} idPrefix="home-faq" />
        </Reveal>
      </section>

      <CtaBand />
    </SiteLayout>
  );
}
