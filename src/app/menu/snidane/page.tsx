"use client";
import { useLang, pick } from "@/lib/lang";
import { breakfast } from "@/data/pages";
import PageHero from "@/components/PageHero";
import MenuBlock from "@/components/MenuBlock";
import Reveal from "@/components/Reveal";
import ReserveBand from "@/components/sections/ReserveBand";

export default function Page() {
  const { lang } = useLang();
  return (
    <>
      <PageHero
        image="/images/interior/interier-detail.jpg"
        eyebrow={lang === "cs" ? "Menu" : "Menu"}
        title={pick(breakfast.title, lang)}
      />
      <section className="section">
        <div className="wrap max-w-3xl">
          <Reveal>
            <span className="eyebrow">Colazione</span>
            <p className="text-[0.85rem] text-[color:var(--color-muted)] mt-3">{pick(breakfast.note, lang)}</p>
            <span className="rule-gold mt-5 mb-10" />
          </Reveal>
          <MenuBlock items={breakfast.items} />
        </div>
      </section>
      <ReserveBand />
    </>
  );
}
