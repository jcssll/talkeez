import { Link } from "react-router-dom";
import { footerGroups, links, type NavItem } from "@/config/site";

function FooterLink({ item }: { item: NavItem }) {
  const cls = "text-sm text-ink-2 transition-colors duration-200 hover:text-bubble-blue";
  if (item.internal) {
    return (
      <Link to={item.href} className={cls} data-testid={item.testId}>
        {item.label}
      </Link>
    );
  }
  return (
    <a href={item.href} className={cls} data-testid={item.testId}>
      {item.label}
    </a>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-paper" data-testid="site-footer">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <img src="/assets/talkeez-logo.png" alt="" className="h-9 w-9 object-contain" />
              <span className="text-xl font-extrabold tracking-tight text-ink">
                Talk<span className="text-bubble-blue">eez</span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-2">
              Every child deserves a voice. Talkeez builds free communication and visual-support tools — and{" "}
              <span className="font-semibold text-ink">My Daily Activity</span>, our paid application for documenting
              care, behavior, learning, and progress.
            </p>
            <a
              href={`mailto:${links.contactEmail}`}
              className="mt-4 inline-block text-sm font-semibold text-ink transition-colors hover:text-bubble-blue"
              data-testid="footer-email"
            >
              {links.contactEmail}
            </a>
          </div>

          {footerGroups.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-ink-3">{group.title}</h2>
              <ul className="mt-4 space-y-2.5">
                {group.items.map((item) => (
                  <li key={item.testId}>
                    <FooterLink item={item} />
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-line pt-6 text-sm text-ink-3 sm:flex-row sm:items-center sm:justify-between">
          <span data-testid="footer-copy">© {new Date().getFullYear()} Talkeez. Made with care for every child’s voice.</span>
          <span>Maryland, USA</span>
        </div>
      </div>
    </footer>
  );
}
