import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import type { Tool } from "@/config/site";
import { cn } from "@/lib/utils";

export function ToolCard({ tool, className }: { tool: Tool; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.a
      href={tool.href}
      whileHover={reduce ? undefined : { y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className={cn(
        "group flex flex-col rounded-3xl border border-line bg-paper p-7 shadow-[0_1px_2px_rgba(15,27,61,0.05)]",
        className
      )}
      data-testid={tool.testId}
    >
      <div className="flex items-center justify-between gap-4">
        <span className={cn("rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider", tool.chipClass)}>
          {tool.tag}
        </span>
        <ArrowUpRight
          className="size-5 text-ink-3 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-bubble-blue"
          aria-hidden="true"
        />
      </div>
      <h3 className="mt-5 text-2xl font-extrabold tracking-tight text-ink">{tool.name}</h3>
      <p className="mt-2 leading-relaxed text-ink-2">{tool.blurb}</p>
      <div className={cn("mt-6 flex-1 overflow-hidden rounded-2xl border border-line bg-surface-2", tool.featured && "min-h-[340px]")}>
        <img
          src={tool.img}
          alt={tool.imgAlt}
          loading="lazy"
          className={cn(
            "h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]",
            !tool.featured && "max-h-72"
          )}
        />
      </div>
    </motion.a>
  );
}
