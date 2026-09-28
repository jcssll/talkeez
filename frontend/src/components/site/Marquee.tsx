import { marqueePhrases } from "@/config/site";

function Row({ ariaHidden }: { ariaHidden: boolean }) {
  return (
    <div aria-hidden={ariaHidden} className="flex shrink-0 items-center">
      {marqueePhrases.map((phrase) => (
        <span key={phrase} className="flex items-center">
          <span className="mx-7 whitespace-nowrap text-lg font-extrabold uppercase tracking-[0.18em] text-cream md:text-2xl">
            {phrase}
          </span>
          <span className="text-bubble-yellow" aria-hidden="true">✦</span>
        </span>
      ))}
    </div>
  );
}

export function Marquee() {
  return (
    <div className="overflow-hidden border-y border-navy-deep bg-navy-deep py-5" data-testid="audience-marquee">
      <div className="flex w-max animate-marquee">
        <Row ariaHidden={false} />
        <Row ariaHidden={true} />
      </div>
    </div>
  );
}
