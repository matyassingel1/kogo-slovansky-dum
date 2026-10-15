"use client";

import Img from "@/components/Img";
import { Check } from "lucide-react";
import { useLang, pick } from "@/lib/lang";
import { wineBar } from "@/data/site";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import ReserveBand from "@/components/sections/ReserveBand";

const gallery = [
  "/images/winebar/wine-bar-1.jpg",
  "/images/winebar/wine-bar-3.jpg",
  "/images/winebar/wine-bar-2.jpg",
];

export default function WineBarPage() {
  const { lang } = useLang();
  return (
    <>
      <PageHero
        image="/images/winebar/wine-bar-pult.jpg"
        eyebrow={pick(wineBar.eyebrow, lang)}
        title={pick(wineBar.title, lang)}
      />

      <section className="section">
        <div className="wrap grid gap-12 md:gap-16 md:grid-cols-12 items-center">
          <div className="md:col-span-6">
            <Reveal>
              <span className="eyebrow">{lang === "cs" ? "Posezení u sklenky" : "By the glass"}</span>
              <h2 className="display-sm mt-5 mb-7">{pick(wineBar.title, lang)}</h2>
              <p className="lead mb-9">{pick(wineBar.intro, lang)}</p>
              <ul className="space-y-3">
                {wineBar.points.map((p, i) => (
                  <li key={i} className="flex items-center gap-3 text-[color:var(--color-ink-soft)]">
                    <Check size={18} strokeWidth={1.8} className="text-[color:var(--color-gold)]" />
                    {pick(p, lang)}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <div className="md:col-span-5 md:col-start-8">
            <Reveal delay={120}>
              <div className="photo aspect-[3/4] relative">
                <Img src={wineBar.signature.photo} alt={wineBar.signature.name} width={1050} height={1400} className="w-full h-full object-cover" />
              </div>
              <div className="bg-[color:var(--color-espresso)] text-white p-6">
                <p className="caps text-[0.72rem] text-[color:var(--color-gold-light)]">{lang === "cs" ? "Signature" : "Signature"}</p>
                <p className="title-md mt-2 text-white">{wineBar.signature.name}</p>
                <p className="text-sm text-white/70 mt-2">{pick(wineBar.signature.desc, lang)}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="pb-6 md:pb-12">
        <div className="wrap grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
          {gallery.map((g, i) => (
            <Reveal key={g} delay={i * 80}>
              <div className="photo photo-hover aspect-[4/3]">
                <Img src={g} alt="" width={1000} height={750} className="w-full h-full object-cover" />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <ReserveBand />
    </>
  );
}
