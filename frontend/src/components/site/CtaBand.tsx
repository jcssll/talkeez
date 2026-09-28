import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { ctaBandCopy } from "@/config/site";

interface CtaLink {
  label: string;
  href: string;
  external?: boolean;
}

export function CtaBand({
  eyebrow = ctaBandCopy.eyebrow,
  title = ctaBandCopy.title,
  body = ctaBandCopy.body,
  primary = ctaBandCopy.primary,
  secondary = ctaBandCopy.secondary,
}: {
  eyebrow?: string;
  title?: string;
  body?: string;
  primary?: CtaLink;
  secondary?: CtaLink;
}) {
  return (
    <section className="px-6 pb-24" data-testid="cta-band">
      <Reveal className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-navy-deep px-8 py-16 text-center md:py-20">
        <div
          className="pointer-events-none absolute -top-32 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-bubble-yellow/25 blur-3xl"
          aria-hidden="true"
        />
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-bubble-yellow" data-testid="cta-band-eyebrow">
          {eyebrow}
        </p>
        <h2 className="mx-auto mt-4 max-w-2xl text-balance text-3xl font-extrabold tracking-tight text-cream md:text-5xl">
          {title}
        </h2>
        <p className="mx-auto mt-5 max-w-xl leading-relaxed text-cream/70">{body}</p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={primary.href}
            {...(primary.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="inline-flex items-center gap-2 rounded-full bg-bubble-yellow px-7 py-3.5 text-sm font-bold text-ink transition-colors duration-200 hover:bg-cream"
            data-testid="cta-band-primary"
          >
            {primary.label}
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
          <a
            href={secondary.href}
            {...(secondary.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="inline-flex items-center gap-2 rounded-full border border-cream/30 px-7 py-3.5 text-sm font-bold text-cream transition-colors duration-200 hover:border-cream hover:bg-cream/10"
            data-testid="cta-band-secondary"
          >
            {secondary.label}
          </a>
        </div>
      </Reveal>
    </section>
  );
}
