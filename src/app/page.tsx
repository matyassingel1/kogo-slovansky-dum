"use client";

import Link from "next/link";
import Img from "@/components/Img";
import { ArrowRight, ArrowDown } from "lucide-react";
import { useLang, pick } from "@/lib/lang";
import { brand, hero, introTeaser, chef, menuTeaser, wineBar, cta } from "@/data/site";
import { menu } from "@/data/menu";
import Reveal from "@/components/Reveal";
import MapSection from "@/components/sections/MapSection";
import StatsSection from "@/components/sections/StatsSection";

// "From the kitchen" tiles — uniform ratio so all four read consistently.
const signature = [
  { img: "/images/food/rizoto-chrest-krevety.jpg", cs: "Rizota", en: "Risotto" },
  { img: "/images/food/tunak-tataki.jpg", cs: "Ryby & mořské plody", en: "Fish & seafood" },
  { img: "/images/food/jamon-serrano.jpg", cs: "Předkrmy", en: "Starters" },
  { img: "/images/food/chrest-hollandaise.jpg", cs: "Sezónní chody", en: "Seasonal dishes" },
];

export default function Home() {
  const { lang } = useLang();

  return (
    <>
      {/* HERO — breathing photo (video later). Minimal: label + the two CTAs the client asked for. */}
      <section className="relative -mt-16 md:-mt-[88px] h-[92vh] min-h-[600px] w-full flex items-end overflow-hidden">
        <Img
          src={hero.image}
          alt={lang === "cs" ? "Interiér KOGO Slovanský dům" : "KOGO Slovanský dům interior"}
          fill
          priority
          className="object-cover hero-breathe"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/18 to-black/35" />
        {/* Stínítko zleva — text i logo sedí vlevo, a fotka má přesně tam přepálené
            okno. Ztmavíme tedy jen tu část, zbytek snímku zůstane vzdušný. */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-transparent" />
        <div className="wrap relative pb-16 md:pb-24 text-white w-full">
          <Reveal>
            <span
              className="eyebrow text-[color:var(--color-gold-light)]"
              style={{ textShadow: "0 1px 2px rgba(0,0,0,0.85), 0 2px 16px rgba(0,0,0,0.7)" }}
            >
              {pick(hero.eyebrow, lang)}
            </span>
          </Reveal>
          <Reveal delay={100}>
            <h1
              className="display-sm mt-5 font-normal"
              style={{ textShadow: "0 1px 3px rgba(0,0,0,0.45), 0 2px 26px rgba(0,0,0,0.5)" }}
            >
              {brand.full}
            </h1>
            <span className="rule-gold mt-6" />
          </Reveal>
          <Reveal delay={180}>
            <div className="flex flex-col sm:flex-row gap-4 mt-9">
              <Link href="/rezervace" className="btn btn-gold">{pick(cta.reserve, lang)}</Link>
              <Link href="/menu" className="btn btn-ghost-light">{pick(cta.menu, lang)}</Link>
            </div>
          </Reveal>
        </div>
        <div className="absolute bottom-6 right-6 hidden md:flex items-center gap-2 text-white/60 text-[0.68rem] tracking-[0.2em] uppercase">
          <ArrowDown size={15} className="animate-bounce" /> {lang === "cs" ? "Listujte" : "Scroll"}
        </div>
      </section>

      {/* STATEMENT — the line the hero used to shout, now spoken quietly with air around it */}
      <section className="section">
        <div className="wrap-tight text-center flex flex-col items-center">
          <Reveal>
            <span className="eyebrow">{pick(introTeaser.eyebrow, lang)}</span>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="display mt-7 whitespace-pre-line">{pick(hero.title, lang)}</h1>
          </Reveal>
          <Reveal delay={180}>
            <span className="rule-gold mt-9 mb-9" />
            <p className="lead max-w-2xl">{pick(introTeaser.body, lang)}</p>
            <Link href="/filozofie" className="ulink caps text-[color:var(--color-gold)] inline-flex items-center gap-2 mt-9">
              {lang === "cs" ? "Naše filozofie" : "Our philosophy"} <ArrowRight size={15} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* SIGNATURE — asymmetric bento, big photos, index numerals, minimal text */}
      <section className="pb-8 md:pb-14">
        <div className="wrap">
          <Reveal className="flex items-end justify-between mb-12 gap-6 flex-wrap">
            <div>
              <span className="eyebrow">{lang === "cs" ? "Z kuchyně" : "From the kitchen"}</span>
              <h2 className="display-sm mt-4 max-w-xl">
                {lang === "cs" ? "Suroviny, které mluví samy za sebe" : "Ingredients that speak for themselves"}
              </h2>
              <span className="rule-gold mt-6" />
            </div>
            <Link href="/menu" className="ulink caps text-[color:var(--color-gold)] inline-flex items-center gap-2">
              {pick(cta.menu, lang)} <ArrowRight size={15} />
            </Link>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {signature.map((s, i) => (
              <Reveal key={s.img} delay={i * 90}>
                <div className="photo photo-hover aspect-[4/5]">
                  <Img src={s.img} alt={lang === "cs" ? s.cs : s.en} width={1000} height={1250} className="w-full h-full object-cover" />
                </div>
                <div className="flex items-baseline gap-3 mt-3">
                  <span className="caps text-[0.62rem] text-[color:var(--color-gold)]">{String(i + 1).padStart(2, "0")}</span>
                  <span className="caps text-[0.7rem] text-[color:var(--color-ink-soft)]">{lang === "cs" ? s.cs : s.en}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CHEF TEASER */}
      <section className="section">
        <div className="wrap grid gap-12 md:gap-16 md:grid-cols-12 items-center">
          <div className="md:col-span-5 order-2 md:order-1">
            <Reveal>
              <div className="photo aspect-[4/5]">
                <Img src={chef.photo} alt={chef.name} width={1200} height={1500} className="w-full h-full object-cover" />
              </div>
            </Reveal>
          </div>
          <div className="md:col-span-6 md:col-start-7 order-1 md:order-2">
            <Reveal delay={100}>
              <span className="eyebrow">{pick(chef.eyebrow, lang)}</span>
              <h2 className="display-sm mt-5 mb-3">{chef.name}</h2>
              <p className="caps text-[color:var(--color-muted)] mb-6">{pick(chef.role, lang)}</p>
              <span className="rule-gold mb-7" />
              <p className="lead mb-6">{pick(chef.lead, lang)}</p>
              <p className="text-[color:var(--color-ink-soft)] leading-relaxed">{pick(chef.bio[0], lang)}</p>
              <Link href="/sefkuchar" className="ulink caps text-[color:var(--color-gold)] inline-flex items-center gap-2 mt-9">
                {lang === "cs" ? "Poznejte Jova" : "Meet Jovo"} <ArrowRight size={15} />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* MENU TEASER */}
      <section className="section bg-[color:var(--color-cream)]">
        <div className="wrap grid gap-12 md:gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <Reveal>
              <span className="eyebrow">{pick(menuTeaser.eyebrow, lang)}</span>
              <h2 className="display-sm mt-5 mb-7">{pick(menuTeaser.title, lang)}</h2>
              <span className="rule-gold mb-8" />
              <p className="lead mb-9">{pick(menuTeaser.body, lang)}</p>
              <Link href="/menu" className="btn btn-solid">{pick(cta.menu, lang)}</Link>
            </Reveal>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <Reveal delay={120}>
              <ul className="divide-y divide-[color:var(--color-line)]">
                {menu.slice(0, 8).map((s) => (
                  <li key={s.id}>
                    {/* Na mobilu italský název pod českým — vedle sebe se lámaly a skákaly */}
                    <Link href={`/menu#${s.id}`} className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-6 py-4 group">
                      <span className="title-md group-hover:text-[color:var(--color-gold)] transition-colors">{pick({ cs: s.cs, en: s.en }, lang)}</span>
                      <span className="caps text-[0.62rem] text-[color:var(--color-muted)] sm:text-right sm:shrink-0">{s.it}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* WINE BAR TEASER */}
      <section className="section">
        <div className="wrap grid gap-12 md:gap-16 md:grid-cols-12 items-center">
          <div className="md:col-span-7">
            <Reveal>
              <div className="photo photo-hover aspect-[16/10]">
                <Img src="/images/winebar/wine-bar-pult.jpg" alt={pick(wineBar.title, lang)} width={1400} height={875} className="w-full h-full object-cover" />
              </div>
            </Reveal>
          </div>
          <div className="md:col-span-5">
            <Reveal delay={100}>
              <span className="eyebrow">{pick(wineBar.eyebrow, lang)}</span>
              <h2 className="display-sm mt-5 mb-7">{pick(wineBar.title, lang)}</h2>
              <span className="rule-gold mb-8" />
              <p className="lead mb-8">{pick(wineBar.intro, lang)}</p>
              <div className="flex items-center gap-4 p-4 border border-[color:var(--color-line)]">
                <Img src={wineBar.signature.photo} alt={wineBar.signature.name} width={120} height={160} className="w-16 h-20 object-cover" />
                <div>
                  <p className="caps text-[0.72rem] text-[color:var(--color-gold)]">{wineBar.signature.name}</p>
                  <p className="text-sm text-[color:var(--color-ink-soft)] mt-1">{pick(wineBar.signature.desc, lang)}</p>
                </div>
              </div>
              <Link href="/wine-bar" className="ulink caps text-[color:var(--color-gold)] inline-flex items-center gap-2 mt-8">
                {lang === "cs" ? "Náš wine bar" : "Our wine bar"} <ArrowRight size={15} />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <StatsSection />
      <MapSection />
      {/* Rezervace je na úvodní stránce jen jednou (tlačítko na fotce) + plovoucí
          widget rezervačního systému — přání klientky 5. 10. */}
    </>
  );
}
