"use client";

import { useLang, pick } from "@/lib/lang";

type Item = { name: string; cs: string; en: string; price: number | null; allergens?: string };

// Single menu block — same styling as the full /menu page. Reused on menu sub-pages.
export default function MenuBlock({ items }: { items: Item[] }) {
  const { lang } = useLang();
  return (
    <ul className="space-y-7">
      {items.map((it, idx) => (
        <li key={idx} className="grid grid-cols-[1fr_auto] gap-x-5 items-baseline">
          <div>
            <h3 className="text-[0.95rem] font-medium tracking-wide uppercase leading-snug">{it.name}</h3>
            <p className="text-sm text-[color:var(--color-ink-soft)] mt-1.5 leading-relaxed max-w-2xl">
              {pick({ cs: it.cs, en: it.en }, lang)}
            </p>
            {it.allergens ? (
              <p className="text-[0.7rem] text-[color:var(--color-muted)] mt-1.5 tracking-wide">
                {lang === "cs" ? "Alergeny" : "Allergens"}: {it.allergens}
              </p>
            ) : null}
          </div>
          <span className="text-[0.95rem] font-medium text-[color:var(--color-gold-deep)] whitespace-nowrap tabular-nums">
            {it.price !== null ? `${it.price.toLocaleString("cs-CZ")} Kč` : "—"}
          </span>
        </li>
      ))}
    </ul>
  );
}
