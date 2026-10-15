"use client";

import Img from "@/components/Img";
import { useLang, pick } from "@/lib/lang";
import { galleryGroups } from "@/data/pages";
import { contact } from "@/data/site";
import Reveal from "@/components/Reveal";

export default function Gallery() {
  const { lang } = useLang();
  return (
    <>
      {galleryGroups.map((group) => (
        <section key={group.id} id={group.id} className="section scroll-mt-28">
          <div className="wrap">
            <Reveal className="mb-10">
              <span className="eyebrow">{lang === "cs" ? "Galerie" : "Gallery"}</span>
              <h2 className="display-sm mt-4">{pick(group.title, lang)}</h2>
              <span className="rule-gold mt-6" />
            </Reveal>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {group.images.map((src, i) => (
                <Reveal key={src} delay={(i % 3) * 80}>
                  <div className={`photo photo-hover ${i % 5 === 0 ? "aspect-[4/5]" : "aspect-square"}`}>
                    <Img src={src} alt="" width={900} height={900} className="w-full h-full object-cover" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Virtual tour */}
      <section id="virtualni-prohlidka" className="section bg-[color:var(--color-cream)] scroll-mt-28">
        <div className="wrap-tight text-center flex flex-col items-center">
          <span className="eyebrow">{lang === "cs" ? "Virtuální prohlídka" : "Virtual tour"}</span>
          <h2 className="display-sm mt-5 mb-6">
            {lang === "cs" ? "Projděte se restaurací online" : "Walk through the restaurant online"}
          </h2>
          <span className="rule-gold mb-8" />
          <p className="lead max-w-xl mb-9">
            {lang === "cs"
              ? "Nahlédněte do interiéru Slovanského domu ještě před svou návštěvou."
              : "Take a look inside Slovanský dům before your visit."}
          </p>
          <a href={contact.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-solid">
            {lang === "cs" ? "Prohlédnout na Google Maps" : "View on Google Maps"}
          </a>
        </div>
      </section>
    </>
  );
}
