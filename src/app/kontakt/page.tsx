"use client";

import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { InstagramIcon, FacebookIcon, TripAdvisorIcon } from "@/components/Social";
import { useLang, pick } from "@/lib/lang";
import { contact, venues, operator, social } from "@/data/site";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import MapSection from "@/components/sections/MapSection";

export default function ContactPage() {
  const { lang } = useLang();
  return (
    <>
      <PageHero
        image="/images/terrace/terasa-zahrada.jpg"
        eyebrow={lang === "cs" ? "Kontakt" : "Contact"}
        title={lang === "cs" ? "Najdete nás na Příkopě" : "Find us on Na Příkopě"}
        sub={lang === "cs" ? "V samém srdci Prahy, ve Slovanském domě." : "In the very heart of Prague, in Slovanský dům."}
      />

      {/* Restaurace a wine bar zvlášť — mají rozdílnou provozní dobu i telefon */}
      <section className="section">
        <div className="wrap grid gap-12 md:grid-cols-3">
          {venues.map((v, i) => (
            <Reveal key={v.phone} delay={i * 90}>
              <Clock size={22} strokeWidth={1.5} className="text-[color:var(--color-gold)]" />
              <h3 className="caps text-[0.72rem] mt-5 mb-4">{pick(v.name, lang)}</h3>
              <ul className="space-y-2 text-[color:var(--color-ink-soft)]">
                {v.hours.map((h, j) => (
                  <li key={j} className="flex justify-between max-w-[280px]">
                    <span>{pick(h.days, lang)}</span>
                    <span className="text-[color:var(--color-ink)]">{h.time}</span>
                  </li>
                ))}
              </ul>
              {v.note && <p className="text-[0.8rem] text-[color:var(--color-muted)] mt-1.5">{pick(v.note, lang)}</p>}
              <p className="flex items-center gap-2 text-[color:var(--color-ink-soft)] mt-4">
                <Phone size={15} strokeWidth={1.6} className="text-[color:var(--color-muted)]" />
                <a href={`tel:${v.phoneHref}`} className="ulink">{v.phone}</a>
              </p>
            </Reveal>
          ))}

          <Reveal delay={180}>
            <MapPin size={22} strokeWidth={1.5} className="text-[color:var(--color-gold)]" />
            <h3 className="caps text-[0.72rem] mt-5 mb-4">{lang === "cs" ? "Adresa" : "Address"}</h3>
            <p className="text-[color:var(--color-ink-soft)] mb-3">{contact.addressLine}</p>
            <p className="flex items-center gap-2 text-[color:var(--color-ink-soft)]">
              <Mail size={15} strokeWidth={1.6} className="text-[color:var(--color-muted)]" />
              <a href={`mailto:${contact.email}`} className="ulink">{contact.email}</a>
            </p>
          </Reveal>
        </div>

        <div className="wrap grid gap-12 md:grid-cols-3 mt-16 pt-12 border-t border-[color:var(--color-line)]">
          <Reveal>
            <InstagramIcon size={22} className="text-[color:var(--color-gold)]" />
            <h3 className="caps text-[0.72rem] mt-5 mb-4">{lang === "cs" ? "Sledujte nás" : "Follow us"}</h3>
            <div className="flex flex-col gap-3">
              <a href={social.instagram} target="_blank" rel="noopener noreferrer" className="ulink inline-flex items-center gap-2 text-[color:var(--color-ink-soft)]">
                <InstagramIcon size={16} /> @kogo_slovansky_dum
              </a>
              <a href={social.facebook} target="_blank" rel="noopener noreferrer" className="ulink inline-flex items-center gap-2 text-[color:var(--color-ink-soft)]">
                <FacebookIcon size={16} /> KOGO Slovanský dům
              </a>
              <a href={social.tripadvisor} target="_blank" rel="noopener noreferrer" className="ulink inline-flex items-center gap-2 text-[color:var(--color-ink-soft)]">
                <TripAdvisorIcon size={18} /> TripAdvisor
              </a>
            </div>
          </Reveal>

          {/* Provozovatel — zákonné údaje */}
          <Reveal delay={90} className="md:col-span-2">
            <h3 className="caps text-[0.72rem] mt-[2.6rem] mb-4">{pick(operator.label, lang)}</h3>
            <p className="text-[color:var(--color-ink-soft)] leading-relaxed">
              {operator.name}<br />
              {operator.address}<br />
              IČ: {operator.ico}<br />
              DIČ: {operator.dic}
            </p>
          </Reveal>
        </div>
      </section>

      <MapSection />
    </>
  );
}
