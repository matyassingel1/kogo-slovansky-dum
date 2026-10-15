"use client";

import { useEffect, useRef, useState } from "react";
import { Plus, Minus, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { useLang, pick } from "@/lib/lang";
import { eventPresentation as P } from "@/data/events";
import Img from "@/components/Img";
import Reveal from "@/components/Reveal";

/* ---------- count-up (shared rhythm with "Kogo v číslech") ---------- */
function useCountUp(target: number, run: boolean, duration = 1500) {
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
      setVal(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, run, duration]);
  return val;
}

function useInView<T extends HTMLElement>(threshold = 0.3) {
  const ref = useRef<T | null>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setSeen(true)),
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, seen };
}

/* ---------- accordion row ---------- */
function Accordion({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <li className="border-b border-[color:var(--color-line)]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-start justify-between gap-6 py-6 text-left group"
      >
        <span className="flex items-baseline gap-5">
          <span className="caps text-[0.64rem] text-[color:var(--color-gold)] shrink-0 tabular-nums">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-[1.02rem] md:text-[1.12rem] leading-snug group-hover:text-[color:var(--color-gold)] transition-colors">
            {q}
          </span>
        </span>
        <span className="mt-1 shrink-0 text-[color:var(--color-gold)]">
          {open ? <Minus size={17} strokeWidth={1.6} /> : <Plus size={17} strokeWidth={1.6} />}
        </span>
      </button>
      <div
        className="grid transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="text-[color:var(--color-ink-soft)] leading-relaxed pb-7 pl-0 md:pl-[3.4rem] pr-8 max-w-3xl">
            {a}
          </p>
        </div>
      </div>
    </li>
  );
}


/* ---------- karusel referencí a ocenění ---------- */
type Slide = { kind: "quote"; text: string; by: string } | { kind: "award"; title: string; body: string };

function ReferenceCarousel({ lang }: { lang: "cs" | "en" }) {
  const slides: Slide[] = [
    ...P.references.quotes.map((q) => ({ kind: "quote" as const, text: pick(q.quote, lang), by: pick(q.author, lang) })),
    ...P.references.awards.map((a) => ({ kind: "award" as const, title: pick(a.title, lang), body: pick(a.body, lang) })),
  ];
  const track = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = (i: number) => {
    const el = track.current;
    if (!el) return;
    const n = slides.length;
    const target = ((i % n) + n) % n;
    const child = el.children[target] as HTMLElement | undefined;
    if (child) el.scrollTo({ left: child.offsetLeft - el.offsetLeft, behavior: "smooth" });
  };

  // Který snímek je zrovna vlevo — podle polohy posuvníku.
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const onScroll = () => {
      const kids = Array.from(el.children) as HTMLElement[];
      let best = 0, dist = Infinity;
      kids.forEach((k, i) => {
        const d = Math.abs(k.offsetLeft - el.offsetLeft - el.scrollLeft);
        if (d < dist) { dist = d; best = i; }
      });
      setActive(best);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  // Samo se posouvá, dokud na něj návštěvník nenajede myší nebo prstem.
  useEffect(() => {
    if (paused || slides.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => go(active + 1), 6000);
    return () => clearInterval(t);
  });

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onFocusCapture={() => setPaused(true)}
      aria-roledescription="carousel"
    >
      <div
        ref={track}
        className="flex gap-5 overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-smooth"
      >
        {slides.map((s, i) => (
          <article
            key={i}
            aria-roledescription="slide"
            aria-label={`${i + 1} / ${slides.length}`}
            className="snap-start shrink-0 w-[86%] sm:w-[70%] lg:w-[calc(50%-10px)] bg-[color:var(--color-paper)] border border-[color:var(--color-line)] p-8 md:p-11 flex flex-col"
          >
            {s.kind === "quote" ? (
              <>
                <Quote size={24} className="text-[color:var(--color-gold)] mb-6" strokeWidth={1.4} />
                <p className="text-[1.15rem] md:text-[1.3rem] leading-[1.5] text-[color:var(--color-ink)]">„{s.text}"</p>
                <p className="caps text-[0.62rem] text-[color:var(--color-muted)] mt-auto pt-7">{s.by}</p>
              </>
            ) : (
              <>
                <span className="caps text-[0.62rem] text-[color:var(--color-gold)]">{lang === "cs" ? "Ocenění" : "Award"}</span>
                <h3 className="title-md mt-4">{s.title}</h3>
                <span className="rule-gold mt-5 mb-6" />
                <p className="text-[color:var(--color-ink-soft)] leading-relaxed">{s.body}</p>
              </>
            )}
          </article>
        ))}
      </div>

      {slides.length > 1 && (
        <div className="flex items-center justify-between mt-7">
          <div className="flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => go(i)}
                aria-label={`${lang === "cs" ? "Snímek" : "Slide"} ${i + 1}`}
                className="h-[3px] transition-all duration-500"
                style={{ width: i === active ? 34 : 16, background: i === active ? "var(--color-gold)" : "var(--color-line)" }}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={() => go(active - 1)} aria-label={lang === "cs" ? "Předchozí" : "Previous"}
              className="h-10 w-10 inline-flex items-center justify-center border border-[color:var(--color-line)] hover:border-[color:var(--color-gold)] hover:text-[color:var(--color-gold)] transition-colors">
              <ChevronLeft size={18} strokeWidth={1.5} />
            </button>
            <button type="button" onClick={() => go(active + 1)} aria-label={lang === "cs" ? "Další" : "Next"}
              className="h-10 w-10 inline-flex items-center justify-center border border-[color:var(--color-line)] hover:border-[color:var(--color-gold)] hover:text-[color:var(--color-gold)] transition-colors">
              <ChevronRight size={18} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- section eyebrow + rule ---------- */
function Kicker({ children, center }: { children: React.ReactNode; center?: boolean }) {
  return (
    <Reveal className={center ? "flex flex-col items-center text-center" : ""}>
      <span className="eyebrow">{children}</span>
      <span className={`rule-gold mt-5 ${center ? "mx-auto" : ""}`} />
    </Reveal>
  );
}

export default function EventPresentation() {
  const { lang } = useLang();
  const L = (cs: string, en: string) => (lang === "cs" ? cs : en);
  const stats = useInView<HTMLDivElement>();

  return (
    <>
      {/* ============ 01 · Společenské akce ============ */}
      <section className="section pt-20 md:pt-28">
        <div className="wrap grid lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-24 items-start">
          <div className="lg:sticky lg:top-32">
            <Kicker>{pick(P.about.eyebrow, lang)}</Kicker>
            <Reveal delay={80}>
              <h2 className="display-sm mt-7 whitespace-pre-line">{pick(P.about.title, lang)}</h2>
            </Reveal>
          </div>
          <div>
            {P.about.body.map((b, i) => (
              <Reveal key={i} delay={i * 90}>
                <p className={`leading-[1.85] text-[color:var(--color-ink-soft)] ${i === 0 ? "lead" : "mt-6"}`}>
                  {pick(b, lang)}
                </p>
              </Reveal>
            ))}
          </div>
        </div>

        {/* stats */}
        <div ref={stats.ref} className="wrap mt-16 md:mt-24">
          <div className="grid grid-cols-3 border-y border-[color:var(--color-line)] divide-x divide-[color:var(--color-line)]">
            {P.about.stats.map((s, i) => (
              <StatCell key={i} value={s.value} suffix={s.suffix} label={pick(s.label, lang)} run={stats.seen} />
            ))}
          </div>
        </div>
      </section>

      {/* ============ 02 · Prostory ============ */}
      <section className="section pt-0">
        <div className="wrap">
          <Kicker>{pick(P.spaces.eyebrow, lang)}</Kicker>
          <Reveal delay={80}>
            <h2 className="display-sm mt-7 max-w-2xl">{pick(P.spaces.title, lang)}</h2>
            <p className="lead mt-7 max-w-2xl">{pick(P.spaces.lead, lang)}</p>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-10 md:gap-14 mt-14 md:mt-20">
            {P.spaces.list.map((sp, i) => (
              <Reveal key={i} delay={i * 110}>
                <div className="photo photo-hover aspect-[4/3] relative">
                  <Img src={sp.image} alt={pick(sp.name, lang)} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
                </div>
                <h3 className="title-md mt-7">{pick(sp.name, lang)}</h3>
                <span className="rule-gold mt-4 mb-1" />
                <dl className="mt-5">
                  {sp.specs.map((s, j) => (
                    <div key={j} className="flex items-baseline justify-between gap-6 py-3 border-b border-[color:var(--color-line)]">
                      <dt className="caps text-[0.64rem] text-[color:var(--color-muted)]">{pick(s.label, lang)}</dt>
                      <dd className="text-[color:var(--color-ink)] tabular-nums">{pick(s.value, lang)}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120}>
            <p className="mt-12 md:mt-16 border-l border-[color:var(--color-gold)] pl-6 py-1 max-w-2xl text-[color:var(--color-ink-soft)] leading-relaxed">
              {pick(P.spaces.note, lang)}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============ 03 · Ceník menu ============ */}
      <section className="section bg-[color:var(--color-cream)]">
        <div className="wrap">
          <Kicker>{pick(P.pricing.eyebrow, lang)}</Kicker>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 mt-7 items-start">
            <Reveal>
              <h2 className="display-sm whitespace-pre-line">{pick(P.pricing.title, lang)}</h2>
              <p className="lead mt-7">{pick(P.pricing.lead, lang)}</p>
            </Reveal>

            <Reveal delay={110}>
              {/* price table */}
              <div className="bg-[color:var(--color-paper)] border border-[color:var(--color-line)] p-7 md:p-10">
                <div className="grid grid-cols-[1fr_auto_auto] gap-x-6 md:gap-x-10 items-end pb-4 border-b border-[color:var(--color-line)]">
                  <span />
                  <span className="caps text-[0.6rem] text-[color:var(--color-muted)] text-right">{L("3 chody", "3 courses")}</span>
                  <span className="caps text-[0.6rem] text-[color:var(--color-muted)] text-right">{L("4 chody", "4 courses")}</span>
                </div>
                {P.pricing.rows.map((r, i) => (
                  <div key={i} className="grid grid-cols-[1fr_auto_auto] gap-x-6 md:gap-x-10 items-baseline py-5 border-b border-[color:var(--color-line)] last:border-0">
                    <span className="text-[color:var(--color-ink)]">{pick(r.label, lang)}</span>
                    <span className="text-right tabular-nums text-[color:var(--color-gold)] text-[1.05rem]">{r.three}</span>
                    <span className="text-right tabular-nums text-[color:var(--color-gold)] text-[1.05rem]">{r.four}</span>
                  </div>
                ))}
                <p className="caps text-[0.58rem] text-[color:var(--color-muted)] mt-5">
                  {L("Cena za osobu", "Price per person")}
                </p>
              </div>
            </Reveal>
          </div>

          {/* what the menu contains */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[color:var(--color-line)] border border-[color:var(--color-line)] mt-14 md:mt-20">
            {P.pricing.courses.map((c, i) => (
              <Reveal key={i} delay={(i % 4) * 80} className="bg-[color:var(--color-paper)] p-7 md:p-9">
                <span className="caps text-[0.62rem] text-[color:var(--color-gold)]">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-[1.15rem] mt-4 mb-3">{pick(c.title, lang)}</h3>
                <p className="text-[0.92rem] text-[color:var(--color-ink-soft)] leading-relaxed">{pick(c.body, lang)}</p>
              </Reveal>
            ))}
          </div>

          <ul className="mt-10 space-y-3 max-w-3xl">
            {P.pricing.notes.map((n, i) => (
              <Reveal key={i} delay={i * 70}>
                <li className="flex gap-4 text-[0.94rem] text-[color:var(--color-ink-soft)] leading-relaxed">
                  <span className="mt-[0.7em] w-4 h-px bg-[color:var(--color-gold)] shrink-0" />
                  {pick(n, lang)}
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ============ 04 · Šéfkuchař ============ */}
      <section className="section">
        <div className="wrap grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <Reveal>
            <div className="photo aspect-[4/5] relative">
              <Img src={P.chef.image} alt={pick(P.chef.name, lang)} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
            </div>
          </Reveal>
          <div>
            <Kicker>{pick(P.chef.eyebrow, lang)}</Kicker>
            <Reveal delay={80}>
              <h2 className="display-sm mt-7">{pick(P.chef.name, lang)}</h2>
            </Reveal>
            {P.chef.body.map((b, i) => (
              <Reveal key={i} delay={120 + i * 80}>
                <p className={`text-[color:var(--color-ink-soft)] leading-[1.85] ${i === 0 ? "mt-7" : "mt-5"}`}>{pick(b, lang)}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 05 · Udržitelnost ============ */}
      <section className="relative">
        <div className="photo-bleed h-[46vh] min-h-[300px] relative">
          <Img src={P.sustainability.image} alt="" fill sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-black/25" />
        </div>
        <div className="section pt-16 md:pt-24">
          <div className="wrap grid lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-24 items-start">
            <div className="lg:sticky lg:top-32">
              <Kicker>{pick(P.sustainability.eyebrow, lang)}</Kicker>
              <Reveal delay={80}>
                <h2 className="display-sm mt-7 whitespace-pre-line">{pick(P.sustainability.title, lang)}</h2>
              </Reveal>
            </div>
            <div>
              {P.sustainability.body.map((b, i) => (
                <Reveal key={i} delay={i * 90}>
                  <p className={`text-[color:var(--color-ink-soft)] leading-[1.85] ${i === 0 ? "lead" : "mt-6"}`}>{pick(b, lang)}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ 06 · Reference & ocenění ============ */}
      <section className="section pt-0">
        <div className="wrap">
          <Kicker center>{pick(P.references.eyebrow, lang)}</Kicker>
          <Reveal delay={80} className="mt-12 md:mt-16">
            <ReferenceCarousel lang={lang} />
          </Reveal>
        </div>
      </section>

      {/* ============ 07 · FAQ + Podmínky ============ */}
      <section className="section bg-[color:var(--color-cream)]">
        <div className="wrap grid lg:grid-cols-2 gap-14 lg:gap-24 items-start">
          <div>
            <Kicker>{pick(P.faq.eyebrow, lang)}</Kicker>
            <ul className="mt-9 border-t border-[color:var(--color-line)]">
              {P.faq.items.map((f, i) => (
                <Accordion key={i} index={i} q={pick(f.q, lang)} a={pick(f.a, lang)} />
              ))}
            </ul>
          </div>
          <div className="lg:sticky lg:top-32">
            <Kicker>{pick(P.terms.eyebrow, lang)}</Kicker>
            <dl className="mt-9 border-t border-[color:var(--color-line)]">
              {P.terms.items.map((t, i) => (
                <Reveal key={i} delay={i * 60} className="py-6 border-b border-[color:var(--color-line)]">
                  <dt className="caps text-[0.64rem] text-[color:var(--color-gold)]">{pick(t.q, lang)}</dt>
                  <dd className="text-[color:var(--color-ink-soft)] leading-relaxed mt-3">{pick(t.a, lang)}</dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </>
  );
}

function StatCell({ value, suffix, label, run }: { value: number; suffix?: string; label: string; run: boolean }) {
  const n = useCountUp(value, run);
  return (
    <div className="text-center py-10 md:py-14 px-3">
      <div className="display-sm text-[color:var(--color-gold)] tabular-nums">
        {n.toLocaleString("cs-CZ")}
        {suffix || ""}
      </div>
      <div className="caps text-[0.62rem] text-[color:var(--color-muted)] mt-4">{label}</div>
    </div>
  );
}
