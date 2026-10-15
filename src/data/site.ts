import { applyOverrides } from "./overrides";
// -----------------------------------------------------------------------------
// KOGO Slovanský dům — site content (bilingual CS/EN).
// All copy lives here so it maps cleanly to WordPress/ACF fields later.
// Facts (address, phone, hours, chef, awards) extracted from kogo-slovanskydum.cz.
// TODO(client): confirm e-mail + exact opening hours before go-live.
// -----------------------------------------------------------------------------

export type L = { cs: string; en: string };

export const brand = {
  name: "KOGO",
  full: "KOGO Slovanský dům",
  since: 2000, // 25 years in 2026
  tagline: {
    cs: "Středomoří v srdci Prahy. Už 25 let.",
    en: "The Mediterranean in the heart of Prague. For 25 years.",
  } as L,
};

export const contact = {
  street: "Na Příkopě 859/22",
  city: "110 00 Praha 1",
  addressLine: "Na Příkopě 859/22, 110 00 Praha 1",
  phone: "+420 221 451 259", // restaurace (258 = wine bar) — dle připomínky klientky
  phone2: "+420 221 451 258",
  phoneHref: "+420221451259",
  email: "slovanskydum@kogo.cz", // TODO(client): confirm
  mapsUrl: "https://maps.google.com/?q=KOGO+Slovansk%C3%BD+d%C5%AFm+Na+P%C5%99%C3%ADkop%C4%9B+22+Praha",
  mapsEmbed:
    "https://www.google.com/maps?q=Na+P%C5%99%C3%ADkop%C4%9B+859/22,+110+00+Praha+1&output=embed",
  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=Na+P%C5%99%C3%ADkop%C4%9B+859%2F22+Praha",
};

// Otevírací doba restaurace — dle současného webu klienta (kogo-slovanskydum.cz/kontakt).
export const hours: { days: L; time: string }[] = [
  { days: { cs: "Každý den", en: "Every day" }, time: "11:00 – 23:00" },
];

// Restaurace a wine bar mají rozdílnou provozní dobu i telefon (připomínka Jitky, 5. 10.).
export type Venue = { name: L; phone: string; phoneHref: string; hours: { days: L; time: string }[]; note?: L };
export const venues: Venue[] = [
  {
    name: { cs: "Restaurace", en: "Restaurant" },
    phone: "+420 221 451 259",
    phoneHref: "+420221451259",
    hours: [{ days: { cs: "Každý den", en: "Every day" }, time: "11:00 – 23:00" }],
  },
  {
    name: { cs: "Wine bar", en: "Wine bar" },
    phone: "+420 221 451 258",
    phoneHref: "+420221451258",
    hours: [{ days: { cs: "Každý den", en: "Every day" }, time: "10:00 – 23:00" }],
    note: { cs: "Včetně víkendů a svátků", en: "Including weekends and holidays" },
  },
];

// Provozovatel — zákonné údaje (připomínka Jitky, 5. 10.).
export const operator = {
  label: { cs: "Provozovatel", en: "Operator" } as L,
  name: "Prague Rest Group, s.r.o.",
  address: "Na Příkopě 859/22, 110 00 Praha 1",
  ico: "27209270",
  dic: "CZ27209270",
};

export const social = {
  instagram: "https://www.instagram.com/kogo_slovansky_dum/",
  facebook: "https://www.facebook.com/KogoRistaronte/",
  tripadvisor:
    "https://www.tripadvisor.co.uk/Restaurant_Review-g274707-d694832-Reviews-Kogo_Slovansky_Dum-Prague_Bohemia.html",
};

// Reservation is handled by their existing system later; for the proposal a form posts nowhere.
export const nav: { href: string; label: L }[] = [
  { href: "/menu", label: { cs: "Menu", en: "Menu" } },
  { href: "/filozofie", label: { cs: "Filozofie", en: "Philosophy" } },
  { href: "/sefkuchar", label: { cs: "Šéfkuchař", en: "Chef" } },
  { href: "/wine-bar", label: { cs: "Wine bar", en: "Wine bar" } },
  { href: "/kontakt", label: { cs: "Kontakt", en: "Contact" } },
];

export const cta = {
  reserve: { cs: "Rezervovat stůl", en: "Book a table" },
  menu: { cs: "Prohlédnout menu", en: "View menu" },
  directions: { cs: "Zobrazit trasu", en: "Get directions" },
};

// Hero ---------------------------------------------------------------------
export const hero = {
  // "Video — zatím foto" (client brief). Photo now, <video> slot ready.
  image: "/images/interior/interier-hlavni.jpg",
  eyebrow: { cs: "Praha · Na Příkopě · od roku 2000", en: "Prague · Na Příkopě · since 2000" } as L,
  title: {
    cs: "Chuť Středomoří,\nservírovaná s pokorou",
    en: "The taste of the Mediterranean,\nserved with grace",
  } as L,
  sub: {
    cs: "Ryby, mořské plody a italské řemeslo. Vlajková restaurace skupiny KOGO ve Slovanském domě — už čtvrt století.",
    en: "Fish, seafood and Italian craft. The flagship of the KOGO group in Slovanský dům — for a quarter of a century.",
  } as L,
};

// Intro / philosophy teaser ------------------------------------------------
export const introTeaser = {
  eyebrow: { cs: "Náš přístup", en: "Our approach" } as L,
  title: {
    cs: "Jednoduchost, ve které je vidět každý detail",
    en: "Simplicity in which every detail shows",
  } as L,
  body: {
    cs: "Vaříme ze surovin, které mluví samy za sebe — čerstvé ryby z Jadranu i Středomoří, sicilské krevety, piemontské maso a těstoviny připravené tak, jak se to dělá v Itálii. Bez zbytečných gest. Se vším, na čem záleží.",
    en: "We cook with ingredients that speak for themselves — fresh fish from the Adriatic and the Mediterranean, Sicilian prawns, Piedmont beef and pasta made the way it is done in Italy. No needless gestures. With everything that matters.",
  } as L,
};

// Philosophy page ----------------------------------------------------------
export const philosophy = {
  eyebrow: { cs: "Filozofie", en: "Philosophy" } as L,
  title: {
    cs: "Náš přístup",
    en: "Our approach",
  } as L,
  intro: {
    cs: "Nechceme být restaurací, která ohromí okázalostí. Chceme být místem, kam se vracíte — protože jídlo chutná přesně tak, jak má, protože jste vítáni jménem a protože se u nás cítíte doma.",
    en: "We do not want to be a restaurant that dazzles with spectacle. We want to be a place you return to — because the food tastes exactly as it should, because you are welcomed by name, and because here you feel at home.",
  } as L,
  values: [
    {
      title: { cs: "Surovina na prvním místě", en: "Ingredient first" } as L,
      body: {
        cs: "Čerstvé ryby a mořské plody vybíráme denně. Kvalita suroviny určuje, co je dnes na talíři — ne naopak.",
        en: "We select fresh fish and seafood daily. The quality of the ingredient decides what is on the plate today — not the other way around.",
      } as L,
    },
    {
      title: { cs: "Italské řemeslo", en: "Italian craft" } as L,
      body: {
        cs: "Těstoviny, rizota i pizza vznikají poctivě a bez zkratek. Recepty, které fungují už desetiletí, neupravujeme kvůli módě.",
        en: "Pasta, risotto and pizza are made honestly and without shortcuts. Recipes that have worked for decades we do not change for fashion.",
      } as L,
    },
    {
      title: { cs: "Servis, který je vidět i není", en: "Service, seen and unseen" } as L,
      body: {
        cs: "Perfektní servis znamená, že o něm nepřemýšlíte. Víno je dolito, talíř zmizí ve správný čas, večer plyne.",
        en: "Perfect service means you never think about it. The wine is topped up, the plate disappears at the right moment, the evening flows.",
      } as L,
    },
    {
      title: { cs: "25 let na jednom místě", en: "25 years in one place" } as L,
      body: {
        cs: "Od roku 2000 ve Slovanském domě. Za tu dobu se u nás zasnoubily páry, uzavřely obchody i oslavila výročí. Píšeme příběh dál.",
        en: "In Slovanský dům since 2000. Over that time couples got engaged, deals were closed and anniversaries celebrated. We keep writing the story.",
      } as L,
    },
  ],
};

// Chef ---------------------------------------------------------------------
export const chef = {
  name: "Jovo Savić",
  role: { cs: "Šéfkuchař, majitel & zakladatel", en: "Executive chef, owner & founder" } as L,
  photo: "/images/chef/sefkuchar-jovo-savic.jpg",
  eyebrow: { cs: "Šéfkuchař", en: "The chef" } as L,
  lead: {
    cs: "Za KOGO stojí jeden člověk a jedna posedlost — dělat věci pořádně.",
    en: "Behind KOGO stands one person and one obsession — to do things properly.",
  } as L,
  // Facts verified from kogo-slovanskydum.cz: Founder & Executive Chef Jovo Savić,
  // 25 years (2026), two "Zlaté lvy" (Golden Lions), Forbes interview (May 2026).
  // NOTE(client): the quote below is suggested placeholder copy — ideally replace it
  // with a real line from Jovo's Forbes rozhovor.
  bio: [
    {
      cs: "Jovo Savić vaří přes pětadvacet let. KOGO Slovanský dům není jen restaurace, kterou vede — je jejím Founderem i Executive Chefem a místu dal svůj rukopis: středomořskou kuchyni s italským nádechem, postavenou na čerstvých rybách a mořských plodech.",
      en: "Jovo Savić has been cooking for over twenty-five years. KOGO Slovanský dům is not merely a restaurant he runs — he is its Founder and Executive Chef, and he gave the place his signature: Mediterranean cuisine with an Italian accent, built on fresh fish and seafood.",
    } as L,
    {
      cs: "Jeho přístup je jednoduchý a nekompromisní zároveň — nejlepší surovina, minimum zásahů, maximum chuti. O jeho cestě letos vyšel rozhovor ve Forbesu a restaurace, která slaví 25 let, si připsala dva Zlaté lvy a titul Nejlepší restaurace 2026.",
      en: "His approach is simple and uncompromising at once — the best ingredient, minimal intervention, maximum flavour. Forbes featured an interview about his journey this year, and the restaurant, now celebrating 25 years, has earned two Golden Lions and the Best Restaurant 2026 title.",
    } as L,
  ] as L[],
  quote: {
    cs: "„Nejde o to ohromit. Jde o to, aby si host řekl: tohle bylo přesně ono.“",
    en: "“It is not about impressing. It is about the guest thinking: this was exactly it.”",
  } as L,
};

export const awards = {
  title: { cs: "Ocenění & uznání", en: "Awards & recognition" } as L,
  image: "/images/brand/oceneni-nejlepsi-restaurace-2026.png",
  items: [
    { cs: "Nejlepší restaurace 2026 — TopLife Czech", en: "Best restaurant 2026 — TopLife Czech" } as L,
    { cs: "Dva Zlaté lvi", en: "Two Golden Lions" } as L,
    { cs: "Čtvrt století ve Slovanském domě", en: "A quarter century in Slovanský dům" } as L,
  ],
};

// Wine bar -----------------------------------------------------------------
export const wineBar = {
  eyebrow: { cs: "Wine bar", en: "Wine bar" } as L,
  title: { cs: "Sklenka, která otevírá večer", en: "A glass that opens the evening" } as L,
  intro: {
    cs: "Náš wine bar je místo samo o sobě. Pečlivě vybraná vína po sklenkách, aperitivy a signature koktejly — ať už čekáte na stůl, nebo si chcete jen posedět.",
    en: "Our wine bar is a place in its own right. Carefully selected wines by the glass, aperitifs and signature cocktails — whether you are waiting for your table or simply want to linger.",
  } as L,
  signature: {
    name: "Kogo No. 25 Sour",
    photo: "/images/winebar/koktejl-kogo-25-sour.jpg",
    desc: {
      cs: "Náš podpisový koktejl ke 25. výročí. K dispozici i v nealko variantě.",
      en: "Our signature cocktail for the 25th anniversary. Also available alcohol-free.",
    } as L,
  },
  points: [
    { cs: "Vína po sklenkách", en: "Wines by the glass" } as L,
    { cs: "Signature koktejly & mocktaily", en: "Signature cocktails & mocktails" } as L,
    { cs: "Aperitivo před večeří", en: "Aperitivo before dinner" } as L,
  ],
};

// Rotating banner (client wants a banner that can cycle multiple messages) --
export const banners: { text: L; href: string }[] = [
  {
    text: { cs: "Slavíme 25 let ve Slovanském domě", en: "Celebrating 25 years in Slovanský dům" },
    href: "/filozofie",
  },
  {
    text: { cs: "Darujte zážitek — dárkové karty KOGO", en: "Give an experience — KOGO gift cards" },
    href: "/kontakt",
  },
  {
    text: { cs: "Nový wine bar & signature koktejly", en: "New wine bar & signature cocktails" },
    href: "/wine-bar",
  },
];

// Pop-up (client wants pop-up windows) — first-visit reservation nudge ------
export const popup = {
  eyebrow: { cs: "Rezervace", en: "Reservations" } as L,
  title: { cs: "Rezervujte si stůl", en: "Reserve your table" } as L,
  body: {
    cs: "Víkendové večery se plní rychle. Zajistěte si místo ve Slovanském domě.",
    en: "Weekend evenings fill up fast. Secure your place in Slovanský dům.",
  } as L,
  image: "/images/interior/interier-sal.jpg",
};

// Section headings reused on homepage --------------------------------------
export const menuTeaser = {
  eyebrow: { cs: "Menu", en: "Menu" } as L,
  title: { cs: "Přes sto chodů, jeden směr", en: "Over a hundred dishes, one direction" } as L,
  body: {
    cs: "Od syrových sicilských krevet přes rizota po piemontské maso a pizzu z pece. Jednoduše rozdělené, ať si vyberete v klidu.",
    en: "From raw Sicilian prawns through risotto to Piedmont beef and pizza from the oven. Simply divided, so you can choose at ease.",
  } as L,
};

export const footer = {
  blurb: {
    cs: "Středomořská, italská a rybí restaurace v centru Prahy. Vlajková loď skupiny KOGO.",
    en: "Mediterranean, Italian and seafood restaurant in the centre of Prague. Flagship of the KOGO group.",
  } as L,
};

// Texty upravené klientkou v Google tabulce (viz overrides.ts).
applyOverrides("site", { awards, banners, brand, chef, contact, cta, footer, hero, hours, introTeaser, menuTeaser, nav, operator, philosophy, popup, social, venues, wineBar });
