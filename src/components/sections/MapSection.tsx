"use client";

import { MapPin, Phone, Clock, Navigation } from "lucide-react";
import { useLang, pick } from "@/lib/lang";
import { contact, venues, cta } from "@/data/site";

// Full-width map with an overlaid info card — combines both variants the client liked.
export default function MapSection() {
  const { lang } = useLang();
  return (
    <section id="mapa" className="relative">
      <div className="relative h-[520px] md:h-[600px] w-full bg-[color:var(--color-cream)]">
        <iframe
          title={lang === "cs" ? "Mapa — KOGO Slovanský dům" : "Map — KOGO Slovanský dům"}
          src={contact.mapsEmbed}
          className="absolute inset-0 w-full h-full grayscale-[0.25]"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        {/* Info card */}
        <div className="absolute inset-x-0 bottom-0 md:inset-auto md:top-1/2 md:right-[6%] md:-translate-y-1/2 md:bottom-auto">
          <div className="wrap md:p-0">
            <div className="bg-[color:var(--color-espresso)] text-white p-8 md:p-11 md:max-w-[400px] shadow-2xl">
              <span className="eyebrow text-[color:var(--color-gold-light)]">
                {lang === "cs" ? "Kde nás najdete" : "Find us"}
              </span>
              <h3 className="title-md mt-3 mb-7 text-white">
                {lang === "cs" ? "Na Příkopě, Praha 1" : "Na Příkopě, Prague 1"}
              </h3>
              <ul className="space-y-4 text-sm text-white/80">
                <li className="flex gap-3">
                  <MapPin size={18} strokeWidth={1.5} className="mt-0.5 shrink-0 text-[color:var(--color-gold-light)]" />
                  <span>{contact.addressLine}</span>
                </li>
                {venues.map((v) => (
                  <li key={v.phone} className="flex gap-3">
                    <Clock size={18} strokeWidth={1.5} className="mt-0.5 shrink-0 text-[color:var(--color-gold-light)]" />
                    <div className="flex-1">
                      <p className="caps text-[0.62rem] text-[color:var(--color-gold-light)]">{pick(v.name, lang)}</p>
                      {v.hours.map((h, i) => (
                        <div key={i} className="flex justify-between gap-6 mt-1">
                          <span>{pick(h.days, lang)}</span>
                          <span className="text-white/90">{h.time}</span>
                        </div>
                      ))}
                      <a href={`tel:${v.phoneHref}`} className="ulink inline-flex items-center gap-2 mt-1 text-white/80">
                        <Phone size={13} strokeWidth={1.5} /> {v.phone}
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
              <a
                href={contact.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost-light w-full mt-8"
              >
                <Navigation size={16} strokeWidth={1.6} /> {pick(cta.directions, lang)}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
