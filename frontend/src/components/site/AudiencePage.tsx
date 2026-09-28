import { ArrowUpRight, Check } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Reveal } from "@/components/site/Reveal";
import { Faq } from "@/components/site/Faq";
import { CtaBand } from "@/components/site/CtaBand";
import { Tilt } from "@/components/site/Tilt";
import { usePageMeta } from "@/lib/usePageMeta";
import { links, trustFacts, type AudienceConfig } from "@/config/site";

export function AudiencePage({ cfg }: { cfg: AudienceConfig }) {
  usePageMeta(cfg.metaTitle, cfg.metaDescription);

  return (
    <SiteLayout>
      {/* ── Hero: one specific problem ───────────────────── */}
      <section className="relative overflow-hidden" data-testid={`${cfg.slug}-hero`}>
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 pb-24 pt-16 md:pt-24 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <Reveal y={16}>
              <p
                className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-ink-2"
                data-testid={`${cfg.slug}-eyebrow`}
              >
                <span className="size-1.5 rounded-full bg-bubble-green" aria-hidden="true" />
                {cfg.eyebrow}
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h1
                className="mt-7 text-balance text-[clamp(2.4rem,4.6vw,3.8rem)] font-extrabold leading-[1.06] tracking-[-0.03em] text-ink"
                data-testid={`${cfg.slug}-headline`}
              >
                {cfg.headlinePre} <span className="text-bubble-blue">{cfg.headlineAccent}</span> {cfg.headlinePost}
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-2" data-testid={`${cfg.slug}-lead`}>
                {cfg.lead}
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href={cfg.primaryCta.href}
                  {...(cfg.primaryCta.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-8 py-4 text-sm font-bold text-cream transition-colors duration-200 hover:bg-bubble-blue"
                  data-testid={`${cfg.slug}-primary-cta`}
                >
                  {cfg.primaryCta.label}
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </a>
                <a
                  href={cfg.secondaryCta.href}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-line-2 bg-paper px-8 py-4 text-sm font-bold text-ink transition-colors duration-200 hover:border-ink"
                  data-testid={`${cfg.slug}-secondary-cta`}
                >
                  {cfg.secondaryCta.label}
                </a>
              </div>
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
                  src={cfg.demo.img}
                  alt={cfg.demo.imgAlt}
                  className="aspect-[8/6] w-full rounded-2xl border border-line/60 object-cover object-top"
                />
                <figcaption className="px-3 py-2.5 text-xs font-bold uppercase tracking-wider text-ink-3">
                  {cfg.demo.caption}
                </figcaption>
              </figure>
            </Tilt>
          </Reveal>
        </div>
      </section>

      {/* ── Three concrete benefits ──────────────────────── */}
      <section className="border-y border-line bg-paper" data-testid={`${cfg.slug}-benefits`}>
        <div className="mx-auto max-w-6xl px-6 py-24">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-bubble-blue">{cfg.name}</p>
            <h2 className="mt-4 max-w-2xl text-balance text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
              Three ways it helps.
            </h2>
          </Reveal>
          <div className="mt-12 divide-y divide-line border-y border-line">
            {cfg.benefits.map((b, i) => (
              <Reveal key={b.n} delay={i * 0.1}>
                <div
                  className="grid gap-2 py-7 md:grid-cols-[80px_280px_1fr] md:items-baseline md:gap-8"
                  data-testid={`${cfg.slug}-benefit-${b.n}`}
                >
                  <span className="text-sm font-extrabold text-bubble-yellow">{b.n}</span>
                  <h3 className="text-xl font-extrabold tracking-tight text-ink">{b.title}</h3>
                  <p className="leading-relaxed text-ink-2">{b.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Product demonstration ────────────────────────── */}
      <section className="px-6 py-24" data-testid={`${cfg.slug}-demo`}>
        <Reveal className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-navy-deep p-8 md:p-14">
          <div
            className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-bubble-blue/30 blur-3xl"
            aria-hidden="true"
          />
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-bubble-yellow">See it working</p>
              <h2 className="mt-4 text-balance text-3xl font-extrabold tracking-tight text-cream md:text-4xl">
                {cfg.demo.title}
              </h2>
              <p className="mt-4 max-w-xl leading-relaxed text-cream/70">{cfg.demo.text}</p>
            </div>
            <a
              href={cfg.demo.ctaHref}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-bubble-yellow px-7 py-3.5 text-sm font-bold text-ink transition-colors duration-200 hover:bg-cream"
              data-testid={`${cfg.slug}-demo-cta`}
            >
              {cfg.demo.ctaLabel}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          </div>
        </Reveal>
      </section>

      {/* ── Accurate trust information ───────────────────── */}
      <section className="mx-auto max-w-6xl px-6 pb-24" data-testid={`${cfg.slug}-trust`}>
        <Reveal>
          <div className="rounded-3xl border border-line bg-paper p-8 md:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-bubble-blue">Trust, plainly</p>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {trustFacts.map((fact) => (
                <div key={fact} className="flex items-start gap-3">
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-bubble-green/15">
                    <Check className="size-3.5 text-bubble-green" aria-hidden="true" />
                  </span>
                  <p className="leading-relaxed text-ink-2">{fact}</p>
                </div>
              ))}
            </div>
            <p className="mt-7 border-t border-line pt-5 text-sm text-ink-3">
              Our policies, in plain sight:{" "}
              <a href={links.legacy.privacy} className="font-semibold text-ink-2 underline underline-offset-4 hover:text-bubble-blue">Privacy</a>
              {" · "}
              <a href={links.legacy.terms} className="font-semibold text-ink-2 underline underline-offset-4 hover:text-bubble-blue">Terms</a>
              {" · "}
              <a href={links.legacy.hipaa} className="font-semibold text-ink-2 underline underline-offset-4 hover:text-bubble-blue">HIPAA statement</a>
              {" · "}
              <a href={links.legacy.ferpa} className="font-semibold text-ink-2 underline underline-offset-4 hover:text-bubble-blue">FERPA notice</a>
              {" · "}
              <a href={links.legacy.accessibility} className="font-semibold text-ink-2 underline underline-offset-4 hover:text-bubble-blue">Accessibility</a>
            </p>
          </div>
        </Reveal>
      </section>

      {/* ── FAQs ─────────────────────────────────────────── */}
      <section className="mx-auto max-w-4xl px-6 pb-24" data-testid={`${cfg.slug}-faq`}>
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-bubble-blue">Questions</p>
          <h2 className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
            Straight answers.
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="mt-10">
          <Faq items={cfg.faqs} idPrefix={`${cfg.slug}-faq`} />
        </Reveal>
      </section>

      {/* ── One primary conversion action ────────────────── */}
      <CtaBand
        title={cfg.band.title}
        body={cfg.band.body}
        primary={cfg.primaryCta}
        secondary={cfg.band.secondary}
      />
    </SiteLayout>
  );
}
