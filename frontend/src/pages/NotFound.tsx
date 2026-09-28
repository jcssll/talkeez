import { Link } from "react-router-dom";
import { SiteLayout } from "@/components/site/SiteLayout";
import { usePageMeta } from "@/lib/usePageMeta";

export default function NotFound() {
  usePageMeta("Page not found — Talkeez", "The page you were looking for does not exist.");
  return (
    <SiteLayout>
      <section className="mx-auto max-w-3xl px-6 py-32 text-center" data-testid="not-found">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-bubble-blue">404</p>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-ink md:text-5xl">This page isn’t here.</h1>
        <p className="mx-auto mt-4 max-w-md leading-relaxed text-ink-2">
          The link may have moved. The free tools and My Daily Activity are right where you expect them.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/"
            className="rounded-full bg-ink px-7 py-3.5 text-sm font-bold text-cream transition-colors hover:bg-bubble-blue"
            data-testid="not-found-home"
          >
            Back to Talkeez
          </Link>
          <a
            href="/aac.html"
            className="rounded-full border border-line-2 bg-paper px-7 py-3.5 text-sm font-bold text-ink transition-colors hover:border-ink"
            data-testid="not-found-tools"
          >
            Open the free AAC
          </a>
        </div>
      </section>
    </SiteLayout>
  );
}
