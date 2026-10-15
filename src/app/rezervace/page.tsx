"use client";

import Img from "@/components/Img";
import { Phone, CalendarCheck } from "lucide-react";
import { useLang } from "@/lib/lang";
import { contact } from "@/data/site";
import { openBooking } from "@/components/GuestPlan";

export default function ReservationPage() {
  const { lang } = useLang();
  const L = (cs: string, en: string) => (lang === "cs" ? cs : en);

  return (
    <section className="grid lg:grid-cols-2 min-h-[calc(100vh-104px)]">
      {/* Visual side */}
      <div className="relative hidden lg:block">
        <Img src="/images/interior/interier-sal-2.jpg" alt="" fill className="object-cover" sizes="50vw" />
        <div className="absolute inset-0 bg-black/25" />
        <div className="absolute bottom-0 left-0 p-12 text-white">
          <span className="eyebrow text-[color:var(--color-gold-light)]">{L("Rezervace", "Reservations")}</span>
          <h2 className="display-sm mt-4 max-w-sm text-white">{L("Zajistěte si svůj večer", "Secure your evening")}</h2>
        </div>
      </div>

      {/* Reservation side */}
      <div className="flex items-center py-16 md:py-24">
        <div className="wrap max-w-xl w-full">
          <span className="eyebrow lg:hidden">{L("Rezervace", "Reservations")}</span>
          <h1 className="display-sm mt-4 lg:mt-0 mb-3">{L("Rezervovat stůl", "Book a table")}</h1>
          <span className="rule-gold mb-7" />
          <p className="lead mb-9">
            {L(
              "Vyberte si datum, čas a počet hostů přímo v našem rezervačním systému. Potvrzení dorazí obratem.",
              "Choose the date, time and number of guests directly in our reservation system. Confirmation arrives right away."
            )}
          </p>

          <button onClick={openBooking} className="btn btn-gold">
            <CalendarCheck size={17} strokeWidth={1.7} /> {L("Otevřít rezervaci", "Open reservation")}
          </button>

          <p className="text-[0.8rem] text-[color:var(--color-muted)] pt-8 mt-8 border-t border-[color:var(--color-line)]">
            {L("Raději telefonicky? Zavolejte nám na ", "Prefer to call? Reach us at ")}
            <a href={`tel:${contact.phoneHref}`} className="ulink text-[color:var(--color-gold)] inline-flex items-center gap-1">
              <Phone size={14} strokeWidth={1.6} /> {contact.phone}
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
