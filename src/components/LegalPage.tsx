"use client";

import { useLang, pick } from "@/lib/lang";
import type { LegalPage as LP } from "@/data/pages";

export default function LegalPage({ page }: { page: LP }) {
  const { lang } = useLang();
  return (
    <section className="section pt-32 md:pt-44">
      <div className="wrap-tight">
        <span className="eyebrow">{lang === "cs" ? "Informace" : "Information"}</span>
        <h1 className="display-sm mt-5 mb-5">{pick(page.title, lang)}</h1>
        <span className="rule-gold mb-9" />
        <p className="lead mb-12">{pick(page.intro, lang)}</p>

        <div className="space-y-10">
          {page.sections.map((s, i) => (
            <div key={i}>
              <h2 className="title-md mb-3">{pick(s.heading, lang)}</h2>
              <p className="text-[color:var(--color-ink-soft)] leading-relaxed">{pick(s.body, lang)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
