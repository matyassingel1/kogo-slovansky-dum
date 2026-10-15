"use client";

import Link from "next/link";
import Img from "@/components/Img";
import { ArrowRight, CalendarDays } from "lucide-react";
import { useLang, pick } from "@/lib/lang";
import { eventsCalendar as C } from "@/data/pages";
import { social } from "@/data/site";
import { InstagramIcon } from "@/components/Social";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import ReserveBand from "@/components/sections/ReserveBand";

function fmt(iso: string, lang: string) {
  const d = new Date(iso + "T12:00:00");
  return d.toLocaleDateString(lang === "cs" ? "cs-CZ" : "en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export default function Page() {
  const { lang } = useLang();
  const L = (cs: string, en: string) => (lang === "cs" ? cs : en);
  // Nadcházející akce seřazené od nejbližší; minulé se automaticky skryjí.
  const today = new Date().toISOString().slice(0, 10);
  const upcoming = C.items.filter((i) => i.date >= today).sort((a, b) => a.date.localeCompare(b.date));

  return (
    <>
      <PageHero image={C.hero} eyebrow={pick(C.eyebrow, lang)} title={pick(C.title, lang)} sub={pick(C.intro, lang)} />

      <section className="section">
        <div className="wrap max-w-4xl">
          {upcoming.length > 0 ? (
            <ul className="border-t border-[color:var(--color-line)]">
              {upcoming.map((e, i) => (
                <Reveal key={i} as="li" delay={(i % 3) * 80} className="grid sm:grid-cols-[11rem_1fr] gap-4 sm:gap-10 py-8 border-b border-[color:var(--color-line)]">
                  <div>
                    <p className="caps text-[0.7rem] text-[color:var(--color-gold)]">{fmt(e.date, lang)}</p>
                    {e.time && <p className="text-sm text-[color:var(--color-muted)] mt-1">{e.time}</p>}
                  </div>
                  <div className="grid sm:grid-cols-[1fr_auto] gap-6 items-start">
                    <div>
                      <h2 className="title-md">{pick(e.title, lang)}</h2>
                      <p className="text-[color:var(--color-ink-soft)] leading-relaxed mt-3">{pick(e.body, lang)}</p>
                      {e.href && (
                        <Link href={e.href} className="ulink caps text-[0.68rem] text-[color:var(--color-gold)] inline-flex items-center gap-2 mt-5">
                          {L("Více informací", "More information")} <ArrowRight size={14} />
                        </Link>
                      )}
                    </div>
                    {e.image && (
                      <div className="photo aspect-[4/3] w-full sm:w-44">
                        <Img src={e.image} alt="" width={600} height={450} className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                </Reveal>
              ))}
            </ul>
          ) : (
            <Reveal className="text-center flex flex-col items-center border border-[color:var(--color-line)] px-6 py-14 md:py-20">
              <CalendarDays size={30} strokeWidth={1.3} className="text-[color:var(--color-gold)]" />
              <h2 className="display-sm mt-6">{pick(C.empty.title, lang)}</h2>
              <span className="rule-gold mt-6 mx-auto" />
              <p className="lead mt-6 max-w-xl">{pick(C.empty.body, lang)}</p>
              <div className="flex flex-col sm:flex-row gap-4 mt-10">
                <a href={social.instagram} target="_blank" rel="noopener noreferrer" className="btn btn-gold">
                  <InstagramIcon size={16} /> {L("Sledovat na Instagramu", "Follow on Instagram")}
                </a>
                <Link href="/udalosti" className="btn btn-ghost">
                  {L("Uspořádat vlastní akci", "Plan your own event")}
                </Link>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      <ReserveBand />
    </>
  );
}
