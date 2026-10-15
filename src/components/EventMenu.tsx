"use client";

import { Leaf, Download } from "lucide-react";
import { useLang, pick } from "@/lib/lang";
import type { EventMenu as EM } from "@/data/events";
import { eventTerms } from "@/data/events";
import Reveal from "@/components/Reveal";

// Native course listing for an event menu + terms + PDF download.
export default function EventMenu({ menu }: { menu: EM }) {
  const { lang } = useLang();
  return (
    <>
      <section className="section pt-28 md:pt-40">
        <div className="wrap max-w-3xl">
          <Reveal>
            <span className="eyebrow">{lang === "cs" ? "Oslavy & eventy" : "Events"}</span>
            <h1 className="display-sm mt-4 mb-5">{pick(menu.title, lang)}</h1>
            <span className="rule-gold mb-7" />
            <p className="lead">{pick(menu.intro, lang)}</p>
            {/* Cena za osobu */}
            <div className="mt-9 border border-[color:var(--color-line)] bg-[color:var(--color-cream)] px-6 py-5 md:px-8">
              <p className="caps text-[0.62rem] text-[color:var(--color-muted)] mb-3">
                {lang === "cs" ? "Cena za osobu" : "Price per person"}
              </p>
              <dl className="divide-y divide-[color:var(--color-line)]">
                {menu.prices.map((p, i) => (
                  <div key={i} className="flex items-baseline justify-between gap-6 py-2.5">
                    <dt className="text-[color:var(--color-ink)]">{pick(p.label, lang)}</dt>
                    <dd className="text-[color:var(--color-gold)] tabular-nums text-[1.05rem] whitespace-nowrap">{p.price}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <a href={menu.pdf} target="_blank" rel="noopener noreferrer" className="btn btn-ghost mt-8">
              <Download size={16} strokeWidth={1.7} /> {lang === "cs" ? "Stáhnout menu (PDF)" : "Download menu (PDF)"}
            </a>
          </Reveal>

          {menu.sections.map((course, i) => (
            <div key={i} className="mt-16 md:mt-20">
              <Reveal>
                <h2 className="title-md">{pick(course.title, lang)}</h2>
                <span className="rule-gold mt-4 mb-7" />
              </Reveal>
              <ul className="space-y-5">
                {course.dishes.map((d, j) => (
                  <li key={j} className="flex items-start gap-2.5 text-[color:var(--color-ink-soft)] leading-relaxed">
                    {d.veg && <Leaf size={15} className="mt-1 shrink-0 text-[color:var(--color-gold)]" />}
                    <span className={d.veg ? "" : "ml-[calc(15px+0.625rem)]"}>{pick({ cs: d.cs, en: d.en }, lang)}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <p className="text-[0.8rem] text-[color:var(--color-muted)] mt-10 flex items-center gap-2">
            <Leaf size={14} className="text-[color:var(--color-gold)]" /> {lang === "cs" ? "Vegetariánské" : "Vegetarian"} · {lang === "cs" ? "Z každého chodu vyberete 3–4 varianty." : "Choose 3–4 options per course."}
          </p>
        </div>
      </section>

      {/* Podmínky spolupráce */}
      <section className="section bg-[color:var(--color-cream)]">
        <div className="wrap max-w-3xl">
          <Reveal>
            <span className="eyebrow">{lang === "cs" ? "Podmínky spolupráce" : "Terms of cooperation"}</span>
            <span className="rule-gold mt-5 mb-8" />
          </Reveal>
          <ol className="space-y-5">
            {eventTerms.map((t, i) => (
              <li key={i} className="flex gap-4 text-[color:var(--color-ink-soft)] leading-relaxed">
                <span className="caps text-[0.7rem] text-[color:var(--color-gold)] mt-1">{String(i + 1).padStart(2, "0")}</span>
                <span>{pick(t, lang)}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
