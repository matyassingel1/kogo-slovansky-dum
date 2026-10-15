"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLang } from "@/lib/lang";

/**
 * Cookie lišta se souhlasem (Consent Mode v2).
 *
 * Měření je ve výchozím stavu vypnuté — zapne se až po souhlasu. Volba se
 * pamatuje v prohlížeči návštěvníka a dá se kdykoli změnit na stránce Cookies.
 */
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    kogoOpenConsent?: () => void;
  }
}

const KEY = "kogo-consent";

/** Předá Google Tag Manageru, co návštěvník povolil. */
function updateConsent(granted: boolean) {
  const value = granted ? "granted" : "denied";
  window.gtag?.("consent", "update", {
    ad_storage: value,
    ad_user_data: value,
    ad_personalization: value,
    analytics_storage: value,
  });
}

export default function CookieConsent() {
  const { lang } = useLang();
  const L = (cs: string, en: string) => (lang === "cs" ? cs : en);
  const [show, setShow] = useState(false);

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(KEY);
    } catch {
      return;
    }
    if (!saved) setShow(true);

    // Odkaz „Nastavení cookies" v patičce a na stránce Cookies lištu vyvolá znovu.
    window.kogoOpenConsent = () => setShow(true);
  }, []);

  const decide = (granted: boolean) => {
    try {
      localStorage.setItem(KEY, granted ? "all" : "necessary");
    } catch {
      /* soukromé okno — volbu si nezapamatujeme, měření zůstane vypnuté */
    }
    updateConsent(granted);
    setShow(false);
    window.dispatchEvent(new CustomEvent("kogo-consent-decided"));
  };

  if (!show) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[80] p-4 sm:p-5"
      role="dialog"
      aria-live="polite"
      aria-label={L("Souhlas s cookies", "Cookie consent")}
    >
      <div className="wrap max-w-5xl bg-[color:var(--color-espresso)] text-white shadow-2xl p-6 sm:p-7 flex flex-col lg:flex-row lg:items-center gap-6">
        <div className="flex-1">
          <p className="caps text-[0.66rem] text-[color:var(--color-gold-light)] mb-2">
            {L("Cookies", "Cookies")}
          </p>
          <p className="text-sm text-white/80 leading-relaxed max-w-2xl">
            {L(
              "Používáme cookies, abychom věděli, co na webu lidi zajímá, a mohli ho zlepšovat. Bez vašeho souhlasu měříme jen to nezbytné.",
              "We use cookies to understand what interests visitors and to improve the site. Without your consent we only measure what is strictly necessary."
            )}{" "}
            <Link href="/cookies" className="ulink text-[color:var(--color-gold-light)]">
              {L("Více o cookies", "More about cookies")}
            </Link>
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
          <button type="button" onClick={() => decide(false)} className="btn btn-ghost-light">
            {L("Jen nezbytné", "Necessary only")}
          </button>
          <button type="button" onClick={() => decide(true)} className="btn btn-gold">
            {L("Přijmout vše", "Accept all")}
          </button>
        </div>
      </div>
    </div>
  );
}
