"use client";

import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, CalendarDays, Phone } from "lucide-react";
import { useLang, pick } from "@/lib/lang";
import { cta, contact, venues } from "@/data/site";
import { navFull } from "@/data/pages";
import { InstagramIcon, FacebookIcon, TripAdvisorIcon } from "./Social";
import { social } from "@/data/site";
import LanguageToggle from "./LanguageToggle";
import Logo from "./Logo";

export default function Header() {
  const { lang } = useLang();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // Které oddíly navigace mají rozbalené podnadpisy. Na první pohled jsou
  // vidět jen hlavní kategorie, aby menu působilo klidně.
  const [expanded, setExpanded] = useState<string | null>(null);
  // Panel menu musí začínat přesně pod spodní hranou hlavičky. Ta je dokud se
  // nescrolluje posunutá dolů o oznamovací pruh — pevná hodnota by ji překryla
  // a tlačítka vpravo by byla dole useknutá.
  const [panelTop, setPanelTop] = useState<number | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    // Widget rezervačního systému by se jinak rozbaloval přes otevřené menu.
    document.body.classList.toggle("menu-open", open);
    if (open) {
      const h = document.querySelector("header");
      if (h) setPanelTop(Math.round(h.getBoundingClientRect().bottom));
    }
    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("menu-open");
    };
  }, [open]);

  // Close overlay on route change.
  useEffect(() => {
    setOpen(false);
    setExpanded(null);
  }, [pathname]);

  // Pages without a top hero image use a solid header (normalize trailing slash).
  const path = (pathname || "/").replace(/\/+$/, "") || "/";
  const noHero = [
    "/rezervace",
    "/menu",
    "/udalosti/objednavka",
    "/udalosti/3-chodove-menu",
    "/udalosti/4-chodove-menu",
    "/obchodni-podminky",
    "/ochrana-osobnich-udaju",
    "/cookies",
  ].includes(path);
  const solid = scrolled || open || noHero;
  const overHero = !solid;
  const fg = overHero ? "#fff" : "var(--color-ink)";
  const fgShadow = overHero ? "0 1px 6px rgba(0,0,0,0.5)" : "none";

  const close = () => setOpen(false);

  return (
    <header
      className="sticky top-0 z-50 transition-colors duration-500"
      style={{
        background: overHero
          ? "linear-gradient(180deg, rgba(0,0,0,0.48) 0%, rgba(0,0,0,0.14) 70%, rgba(0,0,0,0) 100%)"
          : "var(--color-paper)",
        boxShadow: solid && !open ? "0 1px 0 var(--color-line)" : "none",
      }}
    >
      <div className="wrap flex items-center justify-between h-16 md:h-[88px] gap-3">
        <Link href="/" aria-label="KOGO Slovanský dům" onClick={close}>
          <Logo variant={overHero ? "white" : "gold"} condensed={scrolled} />
        </Link>

        <div className="flex items-center gap-3 md:gap-5">
          {/* Přepínač jazyka je vidět vždy, i na mobilu — téměř polovina hostů mluví anglicky */}
          <LanguageToggle light={overHero} />

          {/* Kalendář akcí v hlavičce. Rezervaci obstarává tlačítko na úvodní fotce
              a plovoucí widget rezervačního systému vpravo dole. */}
          <Link href="/kalendar-akci" className="hidden md:inline-flex btn btn-gold">
            <CalendarDays size={16} strokeWidth={1.7} /> {lang === "cs" ? "Kalendář akcí" : "Events"}
          </Link>

          {/* Přepínač navigace — pevná velikost, v otevřeném stavu jako orámovaný obdélník */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? (lang === "cs" ? "Zavřít menu" : "Close menu") : lang === "cs" ? "Otevřít menu" : "Open menu"}
            aria-expanded={open}
            className="inline-flex items-center justify-center gap-2.5 h-11 md:h-[46px] px-3 md:px-4 border transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-gold)]"
            style={{
              color: fg,
              textShadow: fgShadow,
              borderColor: open ? "var(--color-ink)" : "transparent",
            }}
          >
            <span className="caps text-[0.7rem] hidden sm:inline">
              {open ? (lang === "cs" ? "Zavřít" : "Close") : "Menu"}
            </span>
            {open ? <X size={22} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {/* Celá navigace — vlevo kategorie v pořadí od klientky, vpravo kontakt a rezervace */}
      {open && (
        <div
          className="fixed inset-x-0 bottom-0 top-16 md:top-[88px] bg-[color:var(--color-paper)] z-40 overflow-y-auto menu-overlay"
          style={panelTop !== null ? { top: panelTop } : undefined}
        >
          <div className="wrap py-10 md:py-14">
            {/* Tři sloupce, v každém řádku vždy tři kategorie, čteno po řádcích v pořadí
                od klientky. Podnadpisy se rozbalí jako pruh pod celým řádkem, takže
                řádky zůstanou srovnané. */}
            <nav aria-label={lang === "cs" ? "Hlavní navigace" : "Main navigation"}>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-10 gap-y-6 lg:gap-y-9">
                {navFull.map((node, i) => {
                  const hasChildren = !!node.children?.length;
                  const isOpen = expanded === node.href;
                  const openIdx = navFull.findIndex((n) => n.href === expanded);
                  const rowEnd = Math.min(Math.floor(i / 3) * 3 + 2, navFull.length - 1);
                  const panelHere = i === rowEnd && openIdx >= 0 && Math.floor(openIdx / 3) === Math.floor(i / 3);
                  const children = (list: typeof navFull[number]["children"]) => (
                    <ul className="flex flex-wrap gap-x-8 gap-y-3">
                      {list!.map((c) => (
                        <li key={c.href}>
                          <Link href={c.href} onClick={close} className="caps text-[0.68rem] text-[color:var(--color-muted)] hover:text-[color:var(--color-gold)] transition-colors">
                            {pick(c.label, lang)}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  );
                  return (
                    <Fragment key={node.href}>
                      <div>
                        {hasChildren ? (
                          <button
                            type="button"
                            onClick={() => setExpanded(isOpen ? null : node.href)}
                            aria-expanded={isOpen}
                            className={`inline-flex items-center gap-3 text-left transition-colors hover:text-[color:var(--color-gold)] ${isOpen ? "text-[color:var(--color-gold)]" : "text-[color:var(--color-ink)]"}`}
                          >
                            <span className="nav-item">{pick(node.label, lang)}</span>
                            <ChevronDown size={18} strokeWidth={1.5} className="shrink-0 text-[color:var(--color-gold)] transition-transform duration-500" style={{ transform: isOpen ? "rotate(180deg)" : "none" }} />
                          </button>
                        ) : (
                          <Link href={node.href} onClick={close} className="text-[color:var(--color-ink)] hover:text-[color:var(--color-gold)] transition-colors">
                            <span className="nav-item">{pick(node.label, lang)}</span>
                          </Link>
                        )}
                        {/* Mobil: podnadpisy hned pod položkou */}
                        {isOpen && <div className="lg:hidden mt-4 sub-in">{children(node.children)}</div>}
                      </div>
                      {/* Počítač: podnadpisy jako pruh pod celým řádkem */}
                      {panelHere && (
                        <div className="hidden lg:block lg:col-span-3 -mt-3 py-5 px-6 bg-[color:var(--color-cream)] sub-in">
                          {children(navFull[openIdx].children)}
                        </div>
                      )}
                    </Fragment>
                  );
                })}
              </div>
            </nav>

            <div className="mt-12 md:mt-14 pt-9 border-t border-[color:var(--color-line)] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-7">
              <div className="flex flex-wrap gap-3">
                <Link href="/rezervace" onClick={close} className="btn btn-gold">{pick(cta.reserve, lang)}</Link>
                <Link href="/kalendar-akci" onClick={close} className="btn btn-ghost md:hidden">
                  <CalendarDays size={16} strokeWidth={1.7} /> {lang === "cs" ? "Kalendář akcí" : "Events"}
                </Link>
              </div>
              <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-[color:var(--color-ink-soft)]">
                {venues.map((v) => (
                  <a key={v.phone} href={`tel:${v.phoneHref}`} className="ulink inline-flex items-center gap-2">
                    <Phone size={14} strokeWidth={1.6} className="text-[color:var(--color-muted)]" />
                    <span className="caps text-[0.6rem] text-[color:var(--color-gold)]">{pick(v.name, lang)}</span> {v.phone}
                  </a>
                ))}
                <span className="flex items-center gap-4">
                  <a href={social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-[color:var(--color-gold)] transition-colors"><InstagramIcon size={19} /></a>
                  <a href={social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-[color:var(--color-gold)] transition-colors"><FacebookIcon size={19} /></a>
                  <a href={social.tripadvisor} target="_blank" rel="noopener noreferrer" aria-label="TripAdvisor" className="hover:text-[color:var(--color-gold)] transition-colors"><TripAdvisorIcon size={21} /></a>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .menu-overlay {
          animation: menufade 0.4s var(--ease-out-soft);
        }
        @keyframes menufade {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }
        .sub-in {
          animation: menufade 0.35s var(--ease-out-soft);
        }
        .nav-item {
          font-size: clamp(1.35rem, 2vw, 1.55rem);
          line-height: 1.15;
          letter-spacing: -0.01em;
        }
      `}</style>
    </header>
  );
}
