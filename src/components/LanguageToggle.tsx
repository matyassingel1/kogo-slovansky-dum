"use client";

import { useLang } from "@/lib/lang";

export default function LanguageToggle({ light = false }: { light?: boolean }) {
  const { lang, setLang } = useLang();
  const base = light ? "text-white/65" : "text-[color:var(--color-muted)]";
  const activeCls = "border-[color:var(--color-gold)] text-[color:var(--color-gold)]";
  const idleCls = "border-transparent";

  const btn = (l: "cs" | "en", txt: string, aria: string) => (
    <button
      onClick={() => setLang(l)}
      aria-label={aria}
      className={`px-1.5 py-0.5 border transition-colors duration-300 ${
        lang === l ? activeCls : `${idleCls} ${base} hover:text-[color:var(--color-gold)]`
      }`}
    >
      {txt}
    </button>
  );

  return (
    <div className="flex items-center gap-1 text-[0.68rem] tracking-[0.16em] font-medium">
      {btn("cs", "CZ", "Přepnout na češtinu")}
      {btn("en", "EN", "Switch to English")}
    </div>
  );
}
