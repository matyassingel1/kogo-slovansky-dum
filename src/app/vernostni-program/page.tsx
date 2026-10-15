"use client";

import { useState } from "react";
import { ArrowRight, ArrowUpRight, Plus, Minus } from "lucide-react";
import { useLang, pick } from "@/lib/lang";
import { loyalty } from "@/data/pages";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import ReserveBand from "@/components/sections/ReserveBand";

/* Vysvětlivky k platnosti — na rozklik, ať stránka zůstane vzdušná. */
function Example({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <li className="border-b border-[color:var(--color-line)]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-6 py-5 text-left group"
      >
        <span className="text-[0.98rem] group-hover:text-[color:var(--color-gold)] transition-colors">{q}</span>
        <span className="shrink-0 text-[color:var(--color-gold)]">
          {open ? <Minus size={16} strokeWidth={1.6} /> : <Plus size={16} strokeWidth={1.6} />}
        </span>
      </button>
      <div
        className="grid transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="text-[0.92rem] text-[color:var(--color-ink-soft)] leading-relaxed pb-6 pr-8 max-w-2xl">{a}</p>
        </div>
      </div>
    </li>
  );
}

export default function LoyaltyPage() {
  const { lang } = useLang();
  const L = (cs: string, en: string) => (lang === "cs" ? cs : en);

  return (
    <>
      {/* Nižší hero se spodním místem navíc — rozcestníky do fotky zasahují,
          takže musí být kam. Registrace do programu je hlavní cíl stránky,
          proto mají čtverečky zaujmout hned po otevření. */}
      <PageHero
        image={loyalty.hero}
        eyebrow={pick(loyalty.eyebrow, lang)}
        title={pick(loyalty.title, lang)}
        sub={pick(loyalty.lead, lang)}
        compact
        overlap
      />

      {/* Tři rozcestníky — vytažené nahoru tak, aby přesahovaly přes fotku */}
      <section className="relative z-10 -mt-24 md:-mt-32 pb-10 md:pb-16">
        <div className="wrap">
          <div className="grid md:grid-cols-3 gap-4 md:gap-5">
            {loyalty.buttons.map((b, i) => {
              const inner = (
                <>
                  <span className="caps text-[0.62rem] text-[color:var(--color-gold)] block">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="title-md mt-5 mb-auto block leading-snug">{pick(b.title, lang)}</span>
                  <span
                    className={`caps text-[0.68rem] inline-flex items-center gap-2 mt-8 ${
                      b.primary ? "text-[color:var(--color-gold-deep)]" : "text-[color:var(--color-ink)]"
                    }`}
                  >
                    {pick(b.label, lang)}
                    {b.external ? <ArrowUpRight size={15} /> : <ArrowRight size={15} />}
                  </span>
                </>
              );
              const cls = `flex flex-col h-full p-8 md:p-9 border transition-all duration-500 group ${
                b.primary
                  ? "bg-[color:var(--color-gold-tint)] border-[color:var(--color-gold)] hover:bg-[color:var(--color-gold)] hover:text-white shadow-sm"
                  // Plné pozadí je nutné — karty přesahují přes fotku a bez něj
                  // by se text ztrácel v tmavých místech snímku.
                  : "bg-[color:var(--color-paper)] border-[color:var(--color-line)] hover:border-[color:var(--color-gold)] shadow-sm"
              }`;
              return (
                <Reveal key={i} delay={i * 100} className="h-full">
                  {b.external ? (
                    <a href={b.href} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>
                  ) : (
                    <a href={b.href} className={cls}>{inner}</a>
                  )}
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stažení karty do mobilu */}
      <section id="karta" className="section pt-4 md:pt-8 scroll-mt-28">
        <div className="wrap grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div>
            <Reveal>
              <span className="eyebrow">{pick(loyalty.card.eyebrow, lang)}</span>
              <span className="rule-gold mt-5" />
              <h2 className="display-sm mt-7">{pick(loyalty.card.title, lang)}</h2>
              <p className="lead mt-7">{pick(loyalty.card.lead, lang)}</p>
              <p className="text-[color:var(--color-ink-soft)] leading-[1.85] mt-5">{pick(loyalty.card.body, lang)}</p>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <div className="bg-[color:var(--color-cream)] p-8 md:p-11">
              <h3 className="title-md">{pick(loyalty.card.stepsTitle, lang)}</h3>
              <p className="text-[0.92rem] text-[color:var(--color-ink-soft)] mt-4 mb-7">
                {pick(loyalty.card.stepsLead, lang)}
              </p>
              <ol className="space-y-4">
                {loyalty.card.steps.map((s, i) => (
                  <li key={i} className="flex gap-4 text-[color:var(--color-ink-soft)] leading-relaxed">
                    <span className="caps text-[0.66rem] text-[color:var(--color-gold)] mt-1 tabular-nums shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{pick(s, lang)}</span>
                  </li>
                ))}
              </ol>
              <p className="text-[0.92rem] text-[color:var(--color-ink-soft)] leading-relaxed mt-8 pt-7 border-t border-[color:var(--color-line)]">
                {pick(loyalty.card.outro, lang)}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Výhody */}
      <section id="vyhody" className="section bg-[color:var(--color-cream)] scroll-mt-28">
        <div className="wrap">
          <Reveal className="flex flex-col items-center text-center">
            <span className="eyebrow">{pick(loyalty.benefits.eyebrow, lang)}</span>
            <span className="rule-gold mt-5 mx-auto" />
            <h2 className="display-sm mt-7 max-w-2xl">{pick(loyalty.benefits.title, lang)}</h2>
            <p className="lead mt-6">{pick(loyalty.benefits.lead, lang)}</p>
          </Reveal>

          <div className="grid sm:grid-cols-2 gap-5 mt-12 md:mt-16 max-w-3xl mx-auto">
            {loyalty.benefits.tiers.map((t, i) => (
              <Reveal key={t.name} delay={i * 110}>
                <div className="bg-[color:var(--color-paper)] border border-[color:var(--color-line)] p-8 md:p-10 h-full text-center">
                  <p className="caps text-[0.74rem] text-[color:var(--color-gold)] tracking-[0.24em]">{t.name}</p>
                  <p className="display-sm mt-5 tabular-nums">{pick(t.points, lang)}</p>
                  <p className="text-[0.92rem] text-[color:var(--color-ink-soft)] mt-3">{pick(t.per, lang)}</p>
                  {pick(t.condition, lang) && (
                    <p className="caps text-[0.62rem] text-[color:var(--color-muted)] mt-6 pt-5 border-t border-[color:var(--color-line)]">
                      {pick(t.condition, lang)}
                    </p>
                  )}
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={140} className="max-w-3xl mx-auto mt-12">
            <p className="text-center text-[0.92rem] text-[color:var(--color-ink-soft)]">
              {pick(loyalty.benefits.validity, lang)}
            </p>
            <ul className="mt-8 border-t border-[color:var(--color-line)]">
              {loyalty.benefits.examples.map((e, i) => (
                <Example key={i} q={pick(e.q, lang)} a={pick(e.a, lang)} />
              ))}
            </ul>
          </Reveal>

          {/* Cíl stránky je registrace — tak ji zopakujeme na konci */}
          <Reveal delay={180} className="text-center mt-14">
            <a
              href={loyalty.buttons[0].href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-gold inline-flex items-center gap-2"
            >
              {L("Stát se členem", "Become a member")} <ArrowUpRight size={16} />
            </a>
          </Reveal>
        </div>
      </section>

      <ReserveBand />
    </>
  );
}
