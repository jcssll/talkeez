import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { audienceNav, links, mainNav, type NavItem } from "@/config/site";
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

function AudienceDropdown() {
  const { pathname } = useLocation();
  const active = pathname.startsWith("/for-");
  return (
    <div className="group relative">
      <button
        type="button"
        aria-haspopup="true"
        className={cn(
          "inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200",
          active ? "bg-ink text-cream" : "text-ink hover:bg-paper hover:text-bubble-blue"
        )}
        data-testid="nav-audiences-toggle"
      >
        Who it’s for
        <ChevronDown className="size-3.5 transition-transform duration-200 group-hover:rotate-180" aria-hidden="true" />
      </button>
      <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-2 opacity-0 transition-opacity duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        <div className="w-64 rounded-2xl border border-line bg-paper p-2 shadow-lg">
          {audienceNav.map((item) => (
            <Link
              key={item.testId}
              to={item.href}
              className={cn(
                "block rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors",
                pathname === item.href ? "bg-ink text-cream" : "text-ink hover:bg-cream hover:text-bubble-blue"
              )}
              data-testid={item.testId}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-cream/85 backdrop-blur-md" data-testid="site-header">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">
        <Link to="/" className="flex items-center gap-2.5" data-testid="brand-link" onClick={close}>
          <img src="/assets/talkeez-logo.png" alt="Talkeez logo" className="h-9 w-9 object-contain" />
          <span className="text-xl font-extrabold tracking-tight text-ink">
            Talk<span className="text-bubble-blue">eez</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary" data-testid="nav-links">
          {mainNav.slice(0, 2).map((item) => (
            <NavLink key={item.testId} item={item} />
          ))}
          <AudienceDropdown />
          {mainNav.slice(2).map((item) => (
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
          className="inline-flex size-10 items-center justify-center rounded-xl border border-line-2 text-ink lg:hidden"
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
          className="absolute inset-x-4 top-[68px] flex flex-col gap-1 rounded-2xl border border-line bg-paper p-3 shadow-lg lg:hidden"
          aria-label="Mobile"
          data-testid="nav-links-mobile"
        >
          {mainNav.map((item) => (
            <NavLink key={item.testId} item={{ ...item, testId: `${item.testId}-m` }} onNavigate={close} />
          ))}
          <p className="mt-2 border-t border-line px-4 pt-3 text-xs font-bold uppercase tracking-[0.16em] text-ink-3">
            Who it’s for
          </p>
          {audienceNav.map((item) => (
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
