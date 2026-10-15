"use client";

import { useEffect, useState, useRef } from "react";
import { useLang, pick } from "@/lib/lang";
import { menu, allergens } from "@/data/menu";
import Reveal from "@/components/Reveal";
import ReserveBand from "@/components/sections/ReserveBand";

function formatPrice(n: number): string {
  return n.toLocaleString("cs-CZ").replace(/ /g, " ");
}

export default function MenuPage() {
  const { lang } = useLang();
  const [active, setActive] = useState(menu[0].id);
  const navRef = useRef<HTMLDivElement>(null);

  // Scroll-spy: highlight the section currently in view.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    menu.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  // Keep active pill in view on the mobile horizontal nav.
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const el = nav.querySelector(`[data-nav="${active}"]`) as HTMLElement | null;
    if (el) el.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
  }, [active]);

  const usedAllergens = Array.from(
    new Set(menu.flatMap((s) => s.items.flatMap((i) => i.allergens.split(",").map((a) => a.trim()))))
  )
    .filter(Boolean)
    .sort((a, b) => Number(a) - Number(b));

  return (
    <>
      {/* Compact header — no big intro photo/gallery so dishes are immediately visible (client req) */}
      <section className="pt-28 md:pt-40 pb-2">
        <div className="wrap">
          <span className="eyebrow">{lang === "cs" ? "Jídelní lístek" : "Menu"}</span>
          <h1 className="display-sm mt-4">Menu</h1>
          <p className="lead mt-4 max-w-2xl">
            {lang === "cs"
              ? "Středomořská a italská kuchyně postavená na čerstvých rybách a mořských plodech."
              : "Mediterranean and Italian cuisine built on fresh fish and seafood."}
          </p>
          <span className="rule-gold mt-7" />
        </div>
      </section>

      {/* Mobile sticky category pills */}
      <div data-sticky-bar className="lg:hidden sticky top-16 md:top-[88px] z-30 bg-[color:var(--color-paper)] border-b border-[color:var(--color-line)] mt-8">
        <div ref={navRef} className="flex gap-2 overflow-x-auto px-4 py-3 no-scrollbar">
          {menu.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              data-nav={s.id}
              className={`shrink-0 caps text-[0.66rem] px-3 py-2 border transition-colors ${
                active === s.id
                  ? "border-[color:var(--color-gold)] text-[color:var(--color-gold)]"
                  : "border-[color:var(--color-line)] text-[color:var(--color-muted)]"
              }`}
            >
              {pick({ cs: s.cs, en: s.en }, lang)}
            </a>
          ))}
        </div>
      </div>

      <section className="section pt-6 md:pt-10">
        <div className="wrap grid lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Desktop sticky side nav */}
          <aside className="hidden lg:block lg:col-span-3">
            <nav className="sticky top-28 space-y-1">
              {menu.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className={`block py-1.5 text-sm transition-colors ${
                    active === s.id
                      ? "text-[color:var(--color-gold)] font-medium"
                      : "text-[color:var(--color-muted)] hover:text-[color:var(--color-ink)]"
                  }`}
                >
                  {pick({ cs: s.cs, en: s.en }, lang)}
                </a>
              ))}
            </nav>
          </aside>

          {/* Menu content */}
          <div className="lg:col-span-9">
            {menu.map((s) => (
              <div key={s.id} id={s.id} className="scroll-mt-32 mb-16 md:mb-24 last:mb-0">
                <Reveal>
                  <span className="eyebrow">{s.it}</span>
                  <h2 className="display-sm mt-3">{pick({ cs: s.cs, en: s.en }, lang)}</h2>
                  {(s.noteCs || s.noteEn) && (
                    <p className="text-[0.8rem] text-[color:var(--color-muted)] mt-2">
                      {pick({ cs: s.noteCs || "", en: s.noteEn || "" }, lang)}
                    </p>
                  )}
                  <span className="rule-gold mt-5 mb-8" />
                </Reveal>
                <ul className="space-y-7">
                  {s.items.map((it, idx) => (
                    <li key={idx} className="grid grid-cols-[1fr_auto] gap-x-5 items-baseline">
                      <div>
                        <h3 className="text-[0.95rem] font-medium tracking-wide uppercase leading-snug">
                          {it.name}
                        </h3>
                        <p className="text-sm text-[color:var(--color-ink-soft)] mt-1.5 leading-relaxed max-w-2xl">
                          {pick({ cs: it.cs, en: it.en }, lang)}
                        </p>
                        {it.allergens && (
                          <p className="text-[0.7rem] text-[color:var(--color-muted)] mt-1.5 tracking-wide">
                            {lang === "cs" ? "Alergeny" : "Allergens"}: {it.allergens}
                          </p>
                        )}
                      </div>
                      <span className="text-[0.95rem] font-medium text-[color:var(--color-gold-deep)] whitespace-nowrap tabular-nums">
                        {it.price !== null ? `${formatPrice(it.price)} Kč` : "—"}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Allergen legend */}
            <div className="mt-20 pt-10 border-t border-[color:var(--color-line)]">
              <h3 className="caps text-[0.72rem] text-[color:var(--color-gold)] mb-5">
                {lang === "cs" ? "Seznam alergenů" : "Allergen list"}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-2 text-[0.78rem] text-[color:var(--color-ink-soft)]">
                {usedAllergens.map((a) => (
                  <div key={a} className="flex gap-2">
                    <span className="text-[color:var(--color-gold)] font-medium">{a}</span>
                    <span>{allergens[a] ? pick(allergens[a], lang) : ""}</span>
                  </div>
                ))}
              </div>
              <p className="text-[0.72rem] text-[color:var(--color-muted)] mt-8 max-w-2xl">
                {lang === "cs"
                  ? "Změny v jídelním lístku a cenách vyhrazeny. V případě dotazů k alergenům se prosím obraťte na obsluhu."
                  : "Menu and prices subject to change. For any allergen questions, please ask our staff."}
              </p>
            </div>
          </div>
        </div>
      </section>

      <ReserveBand />
    </>
  );
}
