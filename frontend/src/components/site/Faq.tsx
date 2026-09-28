import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { FaqEntry } from "@/config/site";
import { cn } from "@/lib/utils";

export function Faq({ items, idPrefix }: { items: readonly FaqEntry[]; idPrefix: string }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-line border-y border-line" data-testid={`${idPrefix}-list`}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} data-testid={`${idPrefix}-item-${i}`}>
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={`${idPrefix}-panel-${i}`}
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-6 py-6 text-left"
              data-testid={`${idPrefix}-question-${i}`}
            >
              <span className="text-base font-bold text-ink md:text-lg">{item.q}</span>
              <ChevronDown
                className={cn("size-5 shrink-0 text-ink-2 transition-transform duration-300", isOpen && "rotate-180")}
                aria-hidden="true"
              />
            </button>
            <div id={`${idPrefix}-panel-${i}`} role="region" hidden={!isOpen} className="pb-7 pr-8">
              <p className="max-w-2xl leading-relaxed text-ink-2">{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
