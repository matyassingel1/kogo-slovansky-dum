"use client";

import Link from "next/link";
import Img from "@/components/Img";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { useLang, pick } from "@/lib/lang";
import { popup, cta } from "@/data/site";

// First-visit reservation pop-up (client requested pop-up windows).
// Shown once per browser session, after a short delay.
export default function Popup() {
  const { lang } = useLang();
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  // Skip the popup on focused form pages.
  const onForm = pathname?.includes("/rezervace") || pathname?.includes("/udalosti/objednavka");

  useEffect(() => {
    if (onForm) return;
    if (sessionStorage.getItem("kogo-popup-seen")) return;

    // Dokud návštěvník neodpoví na cookie lištu, pozvánku k rezervaci nezobrazujeme —
    // dvě okna přes sebe by byla otravná.
    let timer: ReturnType<typeof setTimeout>;
    const start = () => {
      timer = setTimeout(() => setShow(true), 6500);
    };

    let decided = false;
    try {
      decided = !!localStorage.getItem("kogo-consent");
    } catch {
      decided = true; // v soukromém okně lištu neřešíme
    }

    if (decided) {
      start();
      return () => clearTimeout(timer);
    }
    window.addEventListener("kogo-consent-decided", start, { once: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("kogo-consent-decided", start);
    };
  }, [onForm]);

  const close = () => {
    setShow(false);
    sessionStorage.setItem("kogo-popup-seen", "1");
  };

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center p-5 bg-black/45 backdrop-blur-[2px]"
      onClick={close}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative bg-[color:var(--color-paper)] max-w-3xl w-full grid sm:grid-cols-2 overflow-hidden shadow-2xl popup-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={close}
          aria-label={lang === "cs" ? "Zavřít" : "Close"}
          className="absolute top-3 right-3 z-10 text-white sm:text-[color:var(--color-ink)] hover:text-[color:var(--color-gold)]"
        >
          <X size={22} strokeWidth={1.5} />
        </button>
        <div className="relative h-44 sm:h-auto min-h-[220px]">
          <Img src={popup.image} alt="" fill className="object-cover" sizes="(max-width:640px) 100vw, 384px" />
        </div>
        <div className="p-8 sm:p-10 flex flex-col justify-center">
          <Img src="/images/brand/logo-mark-gold.png" alt="" width={303} height={303} className="w-9 h-9 mb-5" />
          <span className="eyebrow">{pick(popup.eyebrow, lang)}</span>
          <h3 className="title-md mt-3 mb-3">{pick(popup.title, lang)}</h3>
          <p className="text-sm text-[color:var(--color-ink-soft)] leading-relaxed mb-7">
            {pick(popup.body, lang)}
          </p>
          <Link href="/rezervace" onClick={close} className="btn btn-gold self-start">
            {pick(cta.reserve, lang)}
          </Link>
        </div>
      </div>
      <style jsx>{`
        .popup-in {
          animation: pop 0.5s var(--ease-out-soft);
        }
        @keyframes pop {
          from { opacity: 0; transform: translateY(14px) scale(0.98); }
          to { opacity: 1; transform: none; }
        }
      `}</style>
    </div>
  );
}
