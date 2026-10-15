"use client";

import Link from "next/link";
import { Phone } from "lucide-react";
import { useLang, pick } from "@/lib/lang";
import { cta, contact } from "@/data/site";

export default function ReserveBand() {
  const { lang } = useLang();
  return (
    <section className="bg-[color:var(--color-cream)]">
      <div className="wrap section flex flex-col items-center text-center gap-8">
        <span className="eyebrow">{lang === "cs" ? "Těšíme se na vás" : "We look forward to you"}</span>
        <h2 className="display-sm max-w-3xl">
          {lang === "cs"
            ? "Rezervujte si stůl ve Slovanském domě"
            : "Reserve your table in Slovanský dům"}
        </h2>
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
          <Link href="/rezervace" className="btn btn-gold">
            {pick(cta.reserve, lang)}
          </Link>
          <a href={`tel:${contact.phoneHref}`} className="btn btn-ghost">
            <Phone size={16} strokeWidth={1.6} /> {contact.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
