"use client";

import Img from "@/components/Img";
import { useLang, pick } from "@/lib/lang";
import { philosophy } from "@/data/site";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import ReserveBand from "@/components/sections/ReserveBand";

export default function PhilosophyPage() {
  const { lang } = useLang();
  return (
    <>
      <PageHero
        image="/images/interior/interier-sal.jpg"
        eyebrow={pick(philosophy.eyebrow, lang)}
        title={pick(philosophy.title, lang)}
      />

      <section className="section">
        <div className="wrap-tight text-center">
          <Reveal>
            <p className="display-sm font-normal leading-tight">{pick(philosophy.intro, lang)}</p>
          </Reveal>
        </div>
      </section>

      <section className="pb-0">
        <div className="wrap grid md:grid-cols-2 gap-px bg-[color:var(--color-line)] border border-[color:var(--color-line)]">
          {philosophy.values.map((v, i) => (
            <Reveal key={i} delay={(i % 2) * 90} className="bg-[color:var(--color-paper)] p-8 md:p-12">
              <span className="caps text-[0.7rem] text-[color:var(--color-gold)]">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="title-md mt-4 mb-4">{pick(v.title, lang)}</h3>
              <p className="text-[color:var(--color-ink-soft)] leading-relaxed">{pick(v.body, lang)}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="wrap grid md:grid-cols-3 gap-3 md:gap-4">
          <div className="photo photo-hover aspect-[4/5] md:col-span-1">
            <Img src="/images/terrace/terasa.jpg" alt="" width={900} height={1125} className="w-full h-full object-cover" />
          </div>
          <div className="photo photo-hover aspect-[4/5] md:col-span-1 md:mt-12">
            <Img src="/images/interior/interier-detail.jpg" alt="" width={900} height={1125} className="w-full h-full object-cover" />
          </div>
          <div className="photo photo-hover aspect-[4/5] md:col-span-1">
            <Img src="/images/food/chrest.jpg" alt="" width={900} height={1125} className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      <ReserveBand />
    </>
  );
}
