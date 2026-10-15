"use client";

import { useEffect, useRef, useState } from "react";
import { useLang, pick } from "@/lib/lang";
import { statsIntro, stats } from "@/data/pages";

function useCountUp(target: number, run: boolean, duration = 1600) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!run) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVal(target);
      return;
    }
    let raf = 0;
    let start = 0;
    const step = (t: number) => {
      if (!start) start = t;
      const p = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, run, duration]);
  return val;
}

function Stat({ value, suffix, label, run }: { value: number; suffix?: string; label: string; run: boolean }) {
  const n = useCountUp(value, run);
  return (
    <div className="text-center">
      <div className="display-sm text-[color:var(--color-gold-light)] tabular-nums">
        {n.toLocaleString("cs-CZ")}
        {suffix || ""}
      </div>
      <div className="caps text-[0.68rem] text-white/60 mt-3">{label}</div>
    </div>
  );
}

export default function StatsSection() {
  const { lang } = useLang();
  const ref = useRef<HTMLDivElement | null>(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setRun(true)),
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className="bg-[color:var(--color-espresso)] text-white">
      <div className="wrap section">
        <div className="text-center mb-14 md:mb-20 flex flex-col items-center">
          <span className="eyebrow text-[color:var(--color-gold-light)]">{pick(statsIntro.eyebrow, lang)}</span>
          <h2 className="display-sm mt-5 text-white">{pick(statsIntro.title, lang)}</h2>
          <span className="rule-gold mt-6" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-14">
          {stats.map((s, i) => (
            <Stat key={i} value={s.value} suffix={s.suffix} label={pick(s.label, lang)} run={run} />
          ))}
        </div>
        <p className="text-center text-[0.72rem] text-white/40 mt-16">{pick(statsIntro.note, lang)}</p>
      </div>
    </section>
  );
}
