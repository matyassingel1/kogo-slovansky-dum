"use client";

import Img from "@/components/Img";
import { useLang, pick } from "@/lib/lang";
import { chef, awards } from "@/data/site";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import ReserveBand from "@/components/sections/ReserveBand";

export default function ChefPage() {
  const { lang } = useLang();
  return (
    <>
      <PageHero
        image="/images/interior/interier-jamon.jpg"
        eyebrow={pick(chef.eyebrow, lang)}
        title={chef.name}
        sub={pick(chef.role, lang)}
      />

      <section className="section">
        <div className="wrap grid gap-12 md:gap-16 md:grid-cols-12 items-start">
          <div className="md:col-span-5">
            <Reveal>
              <div className="photo aspect-[4/5]">
                <Img src={chef.photo} alt={chef.name} width={1200} height={1500} className="w-full h-full object-cover" />
              </div>
            </Reveal>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <Reveal delay={100}>
              <p className="lead mb-8">{pick(chef.lead, lang)}</p>
              {chef.bio.map((p, i) => (
                <p key={i} className="text-[color:var(--color-ink-soft)] leading-relaxed mb-5">
                  {pick(p, lang)}
                </p>
              ))}
              <blockquote className="mt-10 pl-6 border-l-2 border-[color:var(--color-gold)]">
                <p className="title-md italic text-[color:var(--color-ink)]">{pick(chef.quote, lang)}</p>
                <cite className="caps text-[0.72rem] text-[color:var(--color-muted)] not-italic mt-4 block">
                  {chef.name} · {pick(chef.role, lang)}
                </cite>
              </blockquote>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="section bg-[color:var(--color-cream)]">
        <div className="wrap grid gap-12 md:gap-16 md:grid-cols-12 items-center">
          <div className="md:col-span-5 flex justify-center">
            <Reveal>
              <Img
                src={awards.image}
                alt={pick(awards.title, lang)}
                width={600}
                height={600}
                className="w-52 h-auto"
              />
            </Reveal>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <Reveal delay={100}>
              <span className="eyebrow">{lang === "cs" ? "Uznání" : "Recognition"}</span>
              <h2 className="display-sm mt-5 mb-8">{pick(awards.title, lang)}</h2>
              <ul className="space-y-4">
                {awards.items.map((a, i) => (
                  <li key={i} className="flex items-baseline gap-4 pb-4 border-b border-[color:var(--color-line)]">
                    <span className="caps text-[0.7rem] text-[color:var(--color-gold)]">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-[color:var(--color-ink)]">{pick(a, lang)}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <ReserveBand />
    </>
  );
}
