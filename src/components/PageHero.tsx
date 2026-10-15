"use client";

import Img from "@/components/Img";
import Reveal from "./Reveal";

type Props = {
  image: string;
  eyebrow: string;
  title: string;
  sub?: string;
  /** Nižší hero — použijeme tam, kde má být obsah vidět hned po otevření stránky. */
  compact?: boolean;
  /** Rezervuje dole místo pro obsah, který má do fotky zasahovat. */
  overlap?: boolean;
};

// Hero vnitřních stránek — velká fotka, zlatý nadtitulek, světlý nadpis.
export default function PageHero({ image, eyebrow, title, sub, compact = false, overlap = false }: Props) {
  // Záměrně min-height, ne pevná výška: kdyby se na úzkém nebo nízkém okně
  // text nevešel, sekce se roztáhne, místo aby obsah vylezl nahoru do hlavičky.
  const box = compact ? "min-h-[52vh] sm:min-h-[430px]" : "min-h-[68vh] sm:min-h-[500px]";
  // Horní odsazení musí vždy přesáhnout hlavičku, pod kterou hero podjíždí.
  // Spodní odsazení se zvětší tam, kde přes fotku přesahuje další obsah.
  const pad = compact
    ? `pt-28 md:pt-36 ${overlap ? "pb-32 md:pb-40" : "pb-10 md:pb-12"}`
    : "pt-32 md:pt-44 pb-14 md:pb-20";

  return (
    <section className={`relative -mt-16 md:-mt-[88px] ${box} w-full flex items-end overflow-hidden`}>
      <Img src={image} alt="" fill priority className="object-cover hero-breathe" sizes="100vw" />
      {/* Horní tmavší část kryje hlavičku, aby logo i nadtitulek zůstaly čitelné
          i nad světlou fotkou. */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/38 to-black/45" />
      {/* Stínítko zleva chrání čitelnost textu i loga nad světlými fotkami. */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/20 to-transparent" />
      <div className={`wrap relative ${pad} text-white`}>
        <Reveal>
          <span
            className="eyebrow text-[color:var(--color-gold-light)]"
            style={{ textShadow: "0 1px 2px rgba(0,0,0,0.85), 0 2px 16px rgba(0,0,0,0.7)" }}
          >
            {eyebrow}
          </span>
          <h1
            className="display mt-4 max-w-4xl whitespace-pre-line"
            style={{ textShadow: "0 1px 3px rgba(0,0,0,0.45), 0 2px 26px rgba(0,0,0,0.5)" }}
          >
            {title}
          </h1>
          {sub && (
            <p
              className="lead text-white/90 mt-6 max-w-xl"
              style={{ textShadow: "0 1px 2px rgba(0,0,0,0.7), 0 2px 16px rgba(0,0,0,0.55)" }}
            >
              {sub}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
