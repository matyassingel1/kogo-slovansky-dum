"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLang, pick } from "@/lib/lang";
import { banners } from "@/data/site";

// Rotating announcement banner (client requested a banner that cycles messages).
export default function Banner() {
  const { lang } = useLang();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (banners.length < 2) return;
    const id = setInterval(() => setI((v) => (v + 1) % banners.length), 5000);
    return () => clearInterval(id);
  }, []);

  const b = banners[i];

  return (
    <div className="bg-[color:var(--color-espresso)] text-white">
      <div className="wrap h-9 flex items-center justify-center overflow-hidden">
        <Link
          key={i}
          href={b.href}
          className="text-[0.7rem] tracking-[0.18em] uppercase font-medium text-white/90 hover:text-[color:var(--color-gold-light)] transition-colors banner-in text-center"
        >
          {pick(b.text, lang)}
        </Link>
      </div>
      <style jsx>{`
        .banner-in {
          animation: bfade 0.7s var(--ease-out-soft);
        }
        @keyframes bfade {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </div>
  );
}
