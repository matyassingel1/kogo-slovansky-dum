"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/lib/lang";
import EventMenu from "@/components/EventMenu";
import { eventMenus } from "@/data/events";

export default function Page() {
  const { lang } = useLang();
  const L = (cs: string, en: string) => (lang === "cs" ? cs : en);
  return (
    <>
      <EventMenu menu={eventMenus[0]} />
      <section className="section bg-[color:var(--color-espresso)] text-white">
        <div className="wrap-tight text-center flex flex-col items-center">
          <span className="eyebrow text-[color:var(--color-gold-light)]">{L("Další krok", "Next step")}</span>
          <h2 className="display-sm mt-5 text-white">{L("Vyberte svá jídla", "Choose your dishes")}</h2>
          <span className="rule-gold mt-7 mx-auto" />
          <p className="text-white/75 mt-8 max-w-lg">
            {L(
              "V objednávkovém formuláři zaškrtnete max. 4 jídla z každého chodu. Z vašeho výběru připravíme menu na stůl a hosté si zvolí na místě.",
              "In the order form you tick up to 4 dishes per course. We prepare the table menu from your selection and guests choose on the spot."
            )}
          </p>
          <Link href="/udalosti/objednavka" className="btn btn-gold mt-10 inline-flex items-center gap-2">
            {L("Přejít na objednávku", "Go to the order form")} <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
