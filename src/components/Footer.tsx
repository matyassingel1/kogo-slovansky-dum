"use client";

import Link from "next/link";
import Img from "@/components/Img";
import { MapPin, Phone, Mail } from "lucide-react";
import { InstagramIcon, FacebookIcon, TripAdvisorIcon } from "./Social";
import { useLang, pick } from "@/lib/lang";
import { nav, contact, venues, operator, social, footer, brand } from "@/data/site";

export default function Footer() {
  const { lang } = useLang();
  const year = 2026;

  return (
    <footer className="bg-[color:var(--color-espresso)] text-white/85">
      <div className="wrap py-16 md:py-24">
        <div className="grid gap-12 md:gap-8 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-4">
            <Img
              src="/images/brand/logo-kogo-sd.png"
              alt="KOGO Slovanský dům"
              width={150}
              height={184}
              className="w-[120px] h-auto"
            />
            <p className="mt-7 text-sm leading-relaxed text-white/60 max-w-xs">
              {pick(footer.blurb, lang)}
            </p>
            <div className="mt-7 flex items-center gap-4">
              <a href={social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-white/70 hover:text-[color:var(--color-gold-light)] transition-colors">
                <InstagramIcon size={20} />
              </a>
              <a href={social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-white/70 hover:text-[color:var(--color-gold-light)] transition-colors">
                <FacebookIcon size={20} />
              </a>
              <a href={social.tripadvisor} target="_blank" rel="noopener noreferrer" aria-label="TripAdvisor" className="text-white/70 hover:text-[color:var(--color-gold-light)] transition-colors">
                <TripAdvisorIcon size={22} />
              </a>
            </div>
          </div>

          {/* Nav */}
          <div className="md:col-span-3 md:col-start-6">
            <h3 className="caps text-[0.7rem] text-[color:var(--color-gold-light)] mb-5">
              {lang === "cs" ? "Navigace" : "Navigation"}
            </h3>
            <ul className="space-y-3 text-sm">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="ulink text-white/75 hover:text-white">
                    {pick(item.label, lang)}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/rezervace" className="ulink text-white/75 hover:text-white">
                  {lang === "cs" ? "Rezervace" : "Reservations"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact + hours */}
          <div className="md:col-span-4 md:col-start-9">
            <h3 className="caps text-[0.7rem] text-[color:var(--color-gold-light)] mb-5">
              {lang === "cs" ? "Kontakt" : "Contact"}
            </h3>
            <ul className="space-y-3 text-sm text-white/75">
              <li className="flex gap-3">
                <MapPin size={17} strokeWidth={1.5} className="mt-0.5 shrink-0 text-white/50" />
                <span>{contact.addressLine}</span>
              </li>
              <li className="flex gap-3">
                <Mail size={17} strokeWidth={1.5} className="mt-0.5 shrink-0 text-white/50" />
                <a href={`mailto:${contact.email}`} className="ulink">{contact.email}</a>
              </li>
            </ul>
            {/* Restaurace a wine bar mají rozdílný telefon i provozní dobu */}
            <div className="mt-7 grid grid-cols-2 gap-6 text-sm">
              {venues.map((v) => (
                <div key={v.phone}>
                  <p className="caps text-[0.62rem] text-[color:var(--color-gold-light)] mb-2">{pick(v.name, lang)}</p>
                  <a href={`tel:${v.phoneHref}`} className="ulink text-white/80 inline-flex items-center gap-2">
                    <Phone size={14} strokeWidth={1.5} className="text-white/50" /> {v.phone}
                  </a>
                  {v.hours.map((h, i) => (
                    <p key={i} className="text-white/60 mt-1.5">
                      {pick(h.days, lang)} <span className="text-white/80 whitespace-nowrap">{h.time}</span>
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="hairline mt-14 mb-6 opacity-10" />
        <div className="flex flex-wrap gap-x-6 gap-y-2 mb-6 text-[0.72rem] text-white/55">
          <Link href="/kariera" className="ulink">{lang === "cs" ? "Kariéra" : "Careers"}</Link>
          <Link href="/obchodni-podminky" className="ulink">{lang === "cs" ? "Obchodní podmínky" : "Terms"}</Link>
          <Link href="/ochrana-osobnich-udaju" className="ulink">{lang === "cs" ? "Ochrana osobních údajů" : "Privacy"}</Link>
          <Link href="/cookies" className="ulink">Cookies</Link>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-[0.72rem] tracking-wide text-white/45">
          <span>© {year} {brand.full}. {lang === "cs" ? "Všechna práva vyhrazena." : "All rights reserved."}</span>
          <span>{lang === "cs" ? "Součást skupiny" : "Part of"} KOGO Group</span>
        </div>
        <p className="mt-4 text-[0.72rem] tracking-wide text-white/40 text-center sm:text-left">
          {pick(operator.label, lang)}: {operator.name}, {operator.address} · IČ {operator.ico} · DIČ {operator.dic}
        </p>
      </div>
    </footer>
  );
}
