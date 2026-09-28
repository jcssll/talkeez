import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { links, mainNav, type NavItem } from "@/config/site";
import { cn } from "@/lib/utils";

function NavLink({ item, onNavigate }: { item: NavItem; onNavigate?: () => void }) {
  const { pathname } = useLocation();
  const active = item.internal && pathname === item.href;
  const cls = cn(
    "rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200",
    active ? "bg-ink text-cream" : "text-ink hover:bg-paper hover:text-bubble-blue"
  );
  if (item.internal) {
    return (
      <Link to={item.href} className={cls} onClick={onNavigate} data-testid={item.testId}>
        {item.label}
      </Link>
    );
  }
  return (
    <a href={item.href} className={cls} onClick={onNavigate} data-testid={item.testId}>
      {item.label}
    </a>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-cream/85 backdrop-blur-md" data-testid="site-header">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
        <Link to="/" className="flex items-center gap-2.5" data-testid="brand-link" onClick={close}>
          <img src="/assets/talkeez-logo.png" alt="Talkeez logo" className="h-9 w-9 object-contain" />
          <span className="text-xl font-extrabold tracking-tight text-ink">
            Talk<span className="text-bubble-blue">eez</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary" data-testid="nav-links">
          {mainNav.map((item) => (
            <NavLink key={item.testId} item={item} />
          ))}
          <a
            href={links.myDailyActivity}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 inline-flex items-center gap-1.5 rounded-full bg-ink px-5 py-2.5 text-sm font-bold text-cream transition-colors duration-200 hover:bg-bubble-blue"
            data-testid="nav-cta"
          >
            Explore My Daily Activity
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        </nav>

        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-xl border border-line-2 text-ink md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          data-testid="nav-toggle"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <nav
          className="absolute inset-x-4 top-[68px] flex flex-col gap-1 rounded-2xl border border-line bg-paper p-3 shadow-lg md:hidden"
          aria-label="Mobile"
          data-testid="nav-links-mobile"
        >
          {mainNav.map((item) => (
            <NavLink key={item.testId} item={{ ...item, testId: `${item.testId}-m` }} onNavigate={close} />
          ))}
          <a
            href={links.myDailyActivity}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-flex items-center justify-center gap-1.5 rounded-full bg-ink px-5 py-3 text-sm font-bold text-cream"
            data-testid="nav-cta-mobile"
          >
            Explore My Daily Activity
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        </nav>
      )}
    </header>
  );
}
