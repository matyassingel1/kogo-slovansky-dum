"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Lang = "cs" | "en";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (cs: string, en: string) => string;
};

const LangContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("cs");

  // Restore saved preference after mount (avoids hydration mismatch).
  useEffect(() => {
    const saved = (typeof window !== "undefined" &&
      window.localStorage.getItem("kogo-lang")) as Lang | null;
    if (saved === "cs" || saved === "en") setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("kogo-lang", l);
      document.documentElement.lang = l;
    }
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const t = (cs: string, en: string) => (lang === "cs" ? cs : en);

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang(): Ctx {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}

// Helper for bilingual content objects.
export type LocalizedText = { cs: string; en: string };
export function pick(v: LocalizedText, lang: Lang): string {
  return lang === "cs" ? v.cs : v.en;
}
