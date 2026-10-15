"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLang, pick } from "@/lib/lang";
import { raut } from "@/data/events";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import ReserveBand from "@/components/sections/ReserveBand";

export default function Page() {
  const { lang } = useLang();
  return (
    <>
      <PageHero
        image="/images/interior/interier-jamon.jpg"
        eyebrow={pick(raut.eyebrow, lang)}
        title={pick(raut.title, lang)}
      />
      <section className="section">
        <div className="wrap-tight text-center flex flex-col items-center">
          <Reveal>
            <p className="lead">{pick(raut.body, lang)}</p>
            <span className="rule-gold mt-9 mx-auto" />
            <Link href="/udalosti#poptavka" className="btn btn-gold mt-9 inline-flex items-center gap-2">
              {lang === "cs" ? "Nezávazně poptat" : "Enquire"} <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>
      </section>
      <ReserveBand />
    </>
  );
}
