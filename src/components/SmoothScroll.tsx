"use client";

import { useEffect, ReactNode } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // Skoky na kotvy uvnitř stránky. Odsazení počítáme podle toho, co je
    // nahoře skutečně přilepené (hlavička + na mobilu pás kategorií menu),
    // aby nadpis sekce dosedl těsně pod ně — bez prázdné mezery.
    const stickyHeight = () => {
      let h = 0;
      document.querySelectorAll<HTMLElement>("header, [data-sticky-bar]").forEach((el) => {
        if (getComputedStyle(el).display !== "none") h += el.getBoundingClientRect().height;
      });
      return h;
    };
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute("href");
      if (id && id.length > 1) {
        const el = document.querySelector(id);
        if (el) {
          e.preventDefault();
          const y = (el as HTMLElement).getBoundingClientRect().top + window.scrollY - stickyHeight() - 16;
          lenis.scrollTo(Math.max(0, y));
        }
      }
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
