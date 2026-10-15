"use client";

import { Download, Mail } from "lucide-react";
import { useLang, pick } from "@/lib/lang";
import { eventsIntro, eventPresentation as P } from "@/data/events";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import EnquiryForm from "@/components/EnquiryForm";
import EventPresentation from "@/components/EventPresentation";

export default function EventsPage() {
  const { lang } = useLang();
  const L = (cs: string, en: string) => (lang === "cs" ? cs : en);

  return (
    <>
      <PageHero
        image="/images/interior/interier-hlavni.jpg"
        eyebrow={pick(eventsIntro.eyebrow, lang)}
        title={pick(eventsIntro.title, lang)}
      />

      {/* Lead + PDF ke stažení */}
      <section className="pt-20 md:pt-28">
        <div className="wrap-tight text-center flex flex-col items-center">
          <Reveal>
            <p className="lead">{pick(eventsIntro.lead, lang)}</p>
            <span className="rule-gold mt-9 mx-auto" />
            <a
              href={eventsIntro.presentationPdf}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost mt-9"
            >
              <Download size={16} strokeWidth={1.7} />
              {L("Stáhnout prezentaci (PDF)", "Download presentation (PDF)")}
            </a>
          </Reveal>
        </div>
      </section>

      {/* Celá prezentace zapracovaná do webu */}
      <EventPresentation />

      {/* Kontakt na manažerky + PDF ještě jednou */}
      <section className="section bg-[color:var(--color-espresso)] text-white">
        <div className="wrap-tight text-center flex flex-col items-center">
          <Reveal className="flex flex-col items-center">
            <span className="eyebrow text-[color:var(--color-gold-light)]">{pick(P.contact.eyebrow, lang)}</span>
            <h2 className="display-sm mt-5 text-white">{pick(P.contact.title, lang)}</h2>
            <span className="rule-gold mt-7 mx-auto" />
            <p className="text-white/75 mt-8 text-[1.05rem]">{P.contact.managers.join(" · ")}</p>
            <a href={`mailto:${P.contact.email}`} className="ulink text-[color:var(--color-gold-light)] mt-3 inline-flex items-center gap-2">
              <Mail size={15} strokeWidth={1.7} /> {P.contact.email}
            </a>
            <div className="flex flex-wrap gap-4 justify-center mt-10">
              <a href="#poptavka" className="btn btn-gold">{L("Odeslat poptávku", "Send an enquiry")}</a>
              <a
                href={eventsIntro.presentationPdf}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost-light"
              >
                <Download size={16} strokeWidth={1.7} /> {L("Prezentace v PDF", "Presentation as PDF")}
              </a>
            </div>
            <p className="text-[0.72rem] text-white/40 mt-12 leading-relaxed">
              {P.contact.operator.name} · {P.contact.operator.address} · IČ {P.contact.operator.ico} · DIČ {P.contact.operator.dic}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Poptávkový formulář */}
      <section className="section" id="poptavka">
        <div className="wrap max-w-2xl">
          <Reveal className="text-center mb-12 flex flex-col items-center">
            <span className="eyebrow">{L("Nezávazná poptávka", "Enquiry")}</span>
            <h2 className="display-sm mt-4">{L("Napište nám o vaší akci", "Tell us about your event")}</h2>
            <span className="rule-gold mt-6 mx-auto" />
            <p className="text-[color:var(--color-ink-soft)] mt-6 max-w-xl">
              {L(
                "Ozveme se vám s návrhem termínu, prostoru i menu. Konkrétní výběr jídel s vámi projdeme individuálně.",
                "We will come back to you with a proposal for the date, the space and the menu. The exact dish selection is arranged individually."
              )}
            </p>
          </Reveal>
          <EnquiryForm />
        </div>
      </section>
    </>
  );
}
