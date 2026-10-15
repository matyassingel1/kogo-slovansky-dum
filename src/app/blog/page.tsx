"use client";
import Img from "@/components/Img";
import { useLang, pick } from "@/lib/lang";
import { blogIntro, posts } from "@/data/pages";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import ReserveBand from "@/components/sections/ReserveBand";

function fmtDate(iso: string, lang: string) {
  const [y, m, d] = iso.split("-");
  return lang === "cs" ? `${Number(d)}. ${Number(m)}. ${y}` : `${d}/${m}/${y}`;
}

export default function Page() {
  const { lang } = useLang();
  return (
    <>
      <PageHero
        image="/images/interior/interier-sal-2.jpg"
        eyebrow={pick(blogIntro.eyebrow, lang)}
        title={pick(blogIntro.title, lang)}
      />
      <section className="section">
        <div className="wrap">
          <div className="grid md:grid-cols-3 gap-8 md:gap-6">
            {posts.map((p, i) => (
              <Reveal key={i} delay={(i % 3) * 90}>
                <article>
                  <div className="photo photo-hover aspect-[4/3] mb-5">
                    <Img src={p.image} alt={pick(p.title, lang)} width={900} height={675} className="w-full h-full object-cover" />
                  </div>
                  <p className="caps text-[0.64rem] text-[color:var(--color-gold)] mb-3">{fmtDate(p.date, lang)}</p>
                  <h2 className="title-md mb-3">{pick(p.title, lang)}</h2>
                  <p className="text-sm text-[color:var(--color-ink-soft)] leading-relaxed">{pick(p.excerpt, lang)}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <p className="text-center text-[0.8rem] text-[color:var(--color-muted)] mt-16">
            {lang === "cs" ? "Další novinky připravujeme." : "More news coming soon."}
          </p>
        </div>
      </section>
      <ReserveBand />
    </>
  );
}
