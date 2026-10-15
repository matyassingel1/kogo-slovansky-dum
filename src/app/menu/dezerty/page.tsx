"use client";
import { useLang } from "@/lib/lang";
import { menu } from "@/data/menu";
import PageHero from "@/components/PageHero";
import MenuBlock from "@/components/MenuBlock";
import Reveal from "@/components/Reveal";
import ReserveBand from "@/components/sections/ReserveBand";

export default function Page() {
  const { lang } = useLang();
  const section = menu.find((s) => s.id === "dezerty");
  return (
    <>
      <PageHero
        image="/images/food/chrest-hollandaise.jpg"
        eyebrow={lang === "cs" ? "Menu" : "Menu"}
        title={lang === "cs" ? "Dezerty" : "Desserts"}
      />
      <section className="section">
        <div className="wrap max-w-3xl">
          <Reveal>
            <span className="eyebrow">{section?.it}</span>
            <span className="rule-gold mt-5 mb-10" />
          </Reveal>
          {section && <MenuBlock items={section.items} />}
        </div>
      </section>
      <ReserveBand />
    </>
  );
}
