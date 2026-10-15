"use client";

import Link from "next/link";
import { useLang, pick } from "@/lib/lang";
import type { SimplePage as SP } from "@/data/pages";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import ReserveBand from "@/components/sections/ReserveBand";

export default function SimplePage({ page }: { page: SP }) {
  const { lang } = useLang();
  return (
    <>
      <PageHero image={page.hero} eyebrow={pick(page.eyebrow, lang)} title={pick(page.title, lang)} />

      <section className="section">
        <div className="wrap-tight text-center flex flex-col items-center">
          <Reveal>
            <p className="lead">{pick(page.intro, lang)}</p>
            <span className="rule-gold mt-9 mx-auto" />
          </Reveal>
          {page.ctaLabel && page.ctaHref && (
            <Reveal delay={120}>
              {page.ctaHref.startsWith("http") ? (
                <a href={page.ctaHref} target="_blank" rel="noopener noreferrer" className="btn btn-gold mt-10">
                  {pick(page.ctaLabel, lang)}
                </a>
              ) : (
                <Link href={page.ctaHref} className="btn btn-gold mt-10">
                  {pick(page.ctaLabel, lang)}
                </Link>
              )}
            </Reveal>
          )}
        </div>
      </section>

      {page.features && page.features.length > 0 && (
        <section className="pb-8 md:pb-16">
          <div className="wrap grid md:grid-cols-3 gap-px bg-[color:var(--color-line)] border border-[color:var(--color-line)]">
            {page.features.map((f, i) => (
              <Reveal key={i} delay={(i % 3) * 90} className="bg-[color:var(--color-paper)] p-8 md:p-11">
                <span className="caps text-[0.7rem] text-[color:var(--color-gold)]">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="title-md mt-4 mb-4">{pick(f.title, lang)}</h3>
                <p className="text-[color:var(--color-ink-soft)] leading-relaxed">{pick(f.body, lang)}</p>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {page.info && (
        <section className="section pt-10 md:pt-14">
          <div className="wrap pt-12 md:pt-16 border-t border-[color:var(--color-line)]">
            <Reveal>
              <span className="eyebrow">{pick(page.info.eyebrow, lang)}</span>
              <h2 className="display-sm mt-4 max-w-2xl">{pick(page.info.title, lang)}</h2>
              <span className="rule-gold mt-6 mb-10" />
            </Reveal>
            <div className="grid md:grid-cols-3 gap-8 md:gap-12">
              {page.info.items.map((it, i) => (
                <Reveal key={i} delay={i * 90}>
                  <h3 className="title-md mb-3">{pick(it.title, lang)}</h3>
                  <p className="text-[color:var(--color-ink-soft)] leading-relaxed">{pick(it.body, lang)}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <ReserveBand />
    </>
  );
}
