"use client";
import { useLang } from "@/lib/lang";
import PageHero from "@/components/PageHero";
import Gallery from "@/components/Gallery";
import ReserveBand from "@/components/sections/ReserveBand";

export default function Page() {
  const { lang } = useLang();
  return (
    <>
      <PageHero
        image="/images/interior/interier-sal.jpg"
        eyebrow={lang === "cs" ? "Galerie" : "Gallery"}
        title={lang === "cs" ? "Podívejte se k nám" : "Take a look inside"}
        sub={lang === "cs" ? "Interiér, terasa a wine bar Slovanského domu." : "The interior, terrace and wine bar of Slovanský dům."}
      />
      <Gallery />
      <ReserveBand />
    </>
  );
}
