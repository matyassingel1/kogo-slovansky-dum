// -----------------------------------------------------------------------------
// Oslavy & eventy — content from the client's Canva docs (3chodové/4chodové menu
// + Podmínky spolupráce) and the events presentation. Bilingual CS/EN.
// Dish lists transcribed verbatim from the 2 menu PDFs (2026 srpen).
// -----------------------------------------------------------------------------
import type { L } from "./site";
import { applyOverrides } from "./overrides";

export type EventDish = { cs: string; en: string; veg?: boolean };
export type EventCourse = { title: L; dishes: EventDish[] };

// ---- Shared course building blocks ---------------------------------------
const predkrmy: EventCourse = {
  title: { cs: "Chod 1 — Servírované předkrmy", en: "Course 1 — Plated starters" },
  dishes: [
    { cs: "Salát z čerstvých mořských plodů s citronovou salsou a extra panenským olivovým olejem", en: "Fresh seafood salad with lemon salsa and extra virgin olive oil" },
    { cs: "Tris di tartare — tatarák z tuňáka, lososa a mořského vlka", en: "Tris di tartare — tuna, salmon and sea bass tartare" },
    { cs: "Sashimi di tonno — plátky syrového tuňáka s guacamole", en: "Sashimi di tonno — raw tuna slices with guacamole" },
    { cs: "Toro di tartare — tatarák z tuňáka, lososa a avokáda s wasabi majonézou", en: "Toro di tartare — tuna, salmon and avocado tartare with wasabi mayonnaise" },
    { cs: "Tatarák z tuňáka s buratou a pistáciemi", en: "Tuna tartare with burrata and pistachios" },
    { cs: "Polpo Pil Pil — chobotnice s cherry piccante a kimchi", en: "Polpo Pil Pil — octopus with spicy cherry peppers and kimchi" },
    { cs: "Španělská sušená šunka Jamón Serrano", en: "Spanish dry-cured ham Jamón Serrano" },
    { cs: "Hovězí carpaccio s rukolou a parmezánem", en: "Beef carpaccio with rocket and parmesan" },
    { cs: "Jemně pikantní tatarák z hovězí svíčkové podávaný s topinkami", en: "Lightly spiced beef tenderloin tartare with toasted bread" },
    { cs: "Telecí svíčková se salsou „tonnata“ (salsa z tuňáka, majonézy, kaparů a ančoviček)", en: "Veal with tonnata salsa (tuna, mayonnaise, capers and anchovies)" },
    { cs: "Míchaný zeleninový salát s rukolou a parmazánem", en: "Mixed vegetable salad with rocket and parmesan", veg: true },
    { cs: "Burrata (sýr z Apulie) s cherry rajčaty, listovým salátem a olivovým olejem", en: "Burrata (Apulian cheese) with cherry tomatoes, salad and olive oil", veg: true },
    { cs: "Caprese s buvolí mozzarelou, rajčaty a čerstvou bazalkou", en: "Caprese with buffalo mozzarella, tomatoes and fresh basil", veg: true },
    { cs: "Pečené červené papriky s řeckou fetou, česnekem, olivovým olejem a balsamikem", en: "Roasted red peppers with Greek feta, garlic, olive oil and balsamic", veg: true },
  ],
};

const hlavni: EventCourse = {
  title: { cs: "Servírované hlavní chody", en: "Plated main courses" },
  dishes: [
    { cs: "Grilované kalamáry, chobotničky a krevety s bramborovou kaší se špenátem", en: "Grilled calamari, baby octopus and prawns with mashed potato and spinach" },
    { cs: "Grilovaná chobotnice s jemně pikantními fazolemi a bramborovými lupínky", en: "Grilled octopus with lightly spiced beans and potato chips" },
    { cs: "Filet z divokého mořského vlka s kapary, citronovou šťávou a bramborovou kaší", en: "Wild sea bass fillet with capers, lemon juice and mashed potato" },
    { cs: "Filet z mořského vlka s bramborovou kaší a špenátem", en: "Sea bass fillet with mashed potato and spinach" },
    { cs: "Grilovaný toskánský hovězí roštěnec s pečenými bramborami na rozmarýnu", en: "Grilled Tuscan beef sirloin with rosemary roast potatoes" },
    { cs: "Pečené plátky husích jater na bramborových lupínkách s omáčkou z portského vína", en: "Seared foie gras on potato chips with port wine sauce" },
    { cs: "Smažený telecí řízek na milánský způsob s rukolou a rajčaty", en: "Milanese veal cutlet with rocket and tomatoes" },
    { cs: "Grilovaná kuřecí prsa s hranolkami", en: "Grilled chicken breast with fries" },
    { cs: "Ravioli plněné ricottou a špenátem", en: "Ravioli filled with ricotta and spinach", veg: true },
    { cs: "Rizoto s hříbky", en: "Porcini risotto", veg: true },
    { cs: "Linguine aglio, olio e pepperoncino s olivovým olejem, česnekem a feferonkou", en: "Linguine aglio, olio e pepperoncino with olive oil, garlic and chilli", veg: true },
    { cs: "Bucatini cacio e pepe — římské těstoviny se sýrem pecorino a pepřem", en: "Bucatini cacio e pepe — Roman pasta with pecorino and pepper", veg: true },
  ],
};

const dorty: EventCourse = {
  title: { cs: "Servírované dorty", en: "Plated desserts" },
  dishes: [
    { cs: "Tiramisu", en: "Tiramisu" },
    { cs: "Panna cotta s lesními plody", en: "Panna cotta with forest berries" },
    { cs: "Jahodový cheesecake", en: "Strawberry cheesecake" },
    { cs: "Reforma (čokoládovo-ořechový dort)", en: "Reforma (chocolate-walnut cake)" },
    { cs: "Citronový sorbet s jahodami", en: "Lemon sorbet with strawberries" },
    { cs: "Čokoládové souflé s vanilkovou zmrzlinou", en: "Chocolate soufflé with vanilla ice cream" },
  ],
};

const mezichody: EventCourse = {
  title: { cs: "Servírované mezi-chody (pasta / risotto)", en: "Plated intermediate course (pasta / risotto)" },
  dishes: [
    { cs: "Risotto s bazalkovým pestem a krevetami", en: "Risotto with basil pesto and prawns" },
    { cs: "Linguine s čerstvými mořskými plody", en: "Linguine with fresh seafood" },
    { cs: "Pikantní špagety se slaninou, rajčatovou omáčkou, feferonkou a ovčím sýrem", en: "Spicy spaghetti with bacon, tomato sauce, chilli and Sardinian pecorino" },
    { cs: "Linguine s kousky hovězí svíčkové v jemně pikantní tomatové omáčce", en: "Linguine with beef tenderloin in a lightly spiced tomato sauce" },
    { cs: "Rybářské risotto s čerstvými mořskými plody", en: "Fisherman's risotto with fresh seafood" },
    { cs: "Černé sépiové risotto s kousky grilované chobotnice", en: "Black squid-ink risotto with grilled octopus" },
    { cs: "Ravioli plněné ricottou a špenátem", en: "Ravioli filled with ricotta and spinach", veg: true },
    { cs: "Linguine aglio, olio e pepperoncino s olivovým olejem, česnekem a feferonkou", en: "Linguine aglio, olio e pepperoncino with olive oil, garlic and chilli", veg: true },
    { cs: "Bucatini cacio e pepe — římské těstoviny se sýrem pecorino a pepřem", en: "Bucatini cacio e pepe — Roman pasta with pecorino and pepper", veg: true },
  ],
};

export type EventMenu = {
  slug: string;
  courses: number;
  title: L;
  intro: L;
  hero: string;
  pdf: string;
  /** Cena za osobu — dle ceníku v prezentaci (připomínka Jitky, 5. 10.). */
  prices: { label: L; price: string }[];
  sections: EventCourse[];
};

export const eventMenus: EventMenu[] = [
  {
    slug: "3-chodove-menu",
    courses: 3,
    title: { cs: "Tříchodové menu", en: "Three-course menu" },
    intro: {
      cs: "Ze skupinové nabídky vyberete 3–4 varianty z každého chodu. Zúžené menu připravíme na stůl a hosté si na místě zvolí svou variantu.",
      en: "From the group offer you choose 3–4 options per course. We prepare the shortened menu on the table and guests pick their choice on the spot.",
    },
    hero: "/images/food/chrest-hollandaise.jpg",
    pdf: "/dokumenty/kogo-3chodove-menu.pdf",
    prices: [
      { label: { cs: "Vegetariánské menu", en: "Vegetarian menu" }, price: "1 150 Kč" },
      { label: { cs: "Rybí / masové menu", en: "Fish / meat menu" }, price: "1 650 Kč" },
    ],
    sections: [
      predkrmy,
      { title: { cs: "Chod 2 — Servírované hlavní chody", en: "Course 2 — Plated main courses" }, dishes: hlavni.dishes },
      { title: { cs: "Chod 3 — Servírované dorty", en: "Course 3 — Plated desserts" }, dishes: dorty.dishes },
    ],
  },
  {
    slug: "4-chodove-menu",
    courses: 4,
    title: { cs: "Čtyřchodové menu", en: "Four-course menu" },
    intro: {
      cs: "Ze skupinové nabídky vyberete 3–4 varianty z každého chodu. Zúžené menu připravíme na stůl a hosté si na místě zvolí svou variantu.",
      en: "From the group offer you choose 3–4 options per course. We prepare the shortened menu on the table and guests pick their choice on the spot.",
    },
    hero: "/images/food/tunak-tataki.jpg",
    pdf: "/dokumenty/kogo-4chodove-menu.pdf",
    prices: [
      { label: { cs: "Vegetariánské menu", en: "Vegetarian menu" }, price: "1 450 Kč" },
      { label: { cs: "Rybí / masové menu", en: "Fish / meat menu" }, price: "1 950 Kč" },
    ],
    sections: [
      predkrmy,
      { title: { cs: "Chod 2 — Servírované mezi-chody (pasta / risotto)", en: "Course 2 — Pasta / risotto" }, dishes: mezichody.dishes },
      { title: { cs: "Chod 3 — Servírované hlavní chody", en: "Course 3 — Plated main courses" }, dishes: hlavni.dishes },
      { title: { cs: "Chod 4 — Servírované dorty", en: "Course 4 — Plated desserts" }, dishes: dorty.dishes },
    ],
  },
];

// ---- Podmínky spolupráce (from the PDF) ----------------------------------
export const eventTerms: L[] = [
  {
    cs: "Ze skupinové nabídky zvolíte 3 až 4 varianty od každého chodu. Zúžené menu bude pro hosty připraveno v tištěné podobě na stole a hosté z něj objednávají na místě.",
    en: "You choose 3 to 4 options per course. The shortened menu is printed and placed on the table; guests order from it on the spot.",
  },
  {
    cs: "Konečná nabídka bude obsahovat veškeré informace související s danou akcí.",
    en: "The final offer will contain all information related to your event.",
  },
  {
    cs: "Pro potvrzení skupinové rezervace vyžadujeme uhrazení zálohy — bankovním převodem nebo online platební kartou.",
    en: "To confirm a group reservation we require a deposit — by bank transfer or online card payment.",
  },
  {
    cs: "Zrušení: při zrušení nejpozději 48 hodin před akcí je záloha vratná v plné výši; později se záloha použije jako storno poplatek a je nevratná.",
    en: "Cancellation: if cancelled at least 48 hours before the event the deposit is fully refundable; later it is used as a cancellation fee and is non-refundable.",
  },
  {
    cs: "Změny: snížení počtu osob později než 24 hodin před akcí účtujeme dle původního počtu; navýšení účtujeme dle reálného počtu.",
    en: "Changes: reducing the number of guests later than 24 hours before is billed at the original count; increases are billed at the actual count.",
  },
  {
    cs: "Service charge: veškeré skupinové akce podléhají service charge ve výši 10 % z celkové konzumace.",
    en: "Service charge: all group events are subject to a 10% service charge on total consumption.",
  },
];

// ---- Events landing (presentation) ---------------------------------------
export const eventsIntro = {
  eyebrow: { cs: "Oslavy & eventy", en: "Celebrations & events" } as L,
  title: { cs: "Vaše události ve Slovanském domě", en: "Your events in Slovanský dům" } as L,
  lead: {
    cs: "Svatby, firemní večírky, oslavy i společenské akce v srdci Prahy. Prostory, menu i servis šité na míru — postaráme se o vše.",
    en: "Weddings, corporate parties, celebrations and social events in the heart of Prague. Space, menu and service tailored to you — we take care of everything.",
  } as L,
  presentationPdf: "/dokumenty/kogo-eventy-prezentace.pdf",
  points: [
    { title: { cs: "Prostory na míru", en: "Tailored spaces" } as L, body: { cs: "Varianty pro intimní oslavy i velké společnosti v reprezentativních prostorách Slovanského domu.", en: "Options for intimate gatherings and large groups in the elegant Slovanský dům." } as L },
    { title: { cs: "Menu dle výběru", en: "Menu of your choice" } as L, body: { cs: "Tříchodové nebo čtyřchodové servírované menu — vyberete varianty z každého chodu.", en: "Three- or four-course plated menus — you pick options from each course." } as L },
    { title: { cs: "Kompletní servis", en: "Full service" } as L, body: { cs: "Od vína po poslední detail. Service charge 10 %, rezervaci potvrzuje záloha.", en: "From the wine to the last detail. 10% service charge; a deposit confirms the booking." } as L },
  ],
};

// Raut (informative only)
export const raut = {
  eyebrow: { cs: "Rautová nabídka", en: "Buffet offer" } as L,
  title: { cs: "Raut na míru", en: "Bespoke buffet" } as L,
  body: {
    cs: "Rautovou nabídku řešíme vždy individuálně podle vašich představ a potřeb. Ozvěte se nám a rádi s vámi projdeme možnosti a připravíme nabídku na míru. Základní varianta je pouze informativní a neobsahuje výběr menu ani formulář.",
    en: "We always arrange the buffet offer individually, based on your ideas and needs. Get in touch and we will gladly go through the options and prepare a bespoke offer. The basic variant is informative only — no menu selection or form.",
  } as L,
};

// ---- Prezentace „EVENT 2026" — celý obsah klientského PDF na webu ---------
// Přepsáno 1:1 z public/dokumenty/kogo-eventy-prezentace.pdf (10 slidů), aby
// host nemusel nic stahovat. PDF zůstává ke stažení vedle toho.
export type SpaceSpec = { label: L; value: L };
export type Space = { name: L; image: string; specs: SpaceSpec[] };
export type PriceRow = { label: L; three: string; four: string };
export type Faq = { q: L; a: L };

export const eventPresentation = {
  // 01 — Společenské akce
  about: {
    eyebrow: { cs: "Společenské akce", en: "Corporate & private events" } as L,
    title: { cs: "Pronájem prostor pro firemní\nvečírky a soukromé akce", en: "Venue hire for corporate\nparties and private events" } as L,
    body: [
      {
        cs: "Restaurace a Wine Bar Kogo je ideálním místem pro firemní večírky, společenské události i soukromé oslavy — přímo v centru Prahy. Společně s vámi navrhneme event na míru přesně podle vašich představ, s důrazem na detail, hladkým průběhem a osobní péčí o každého hosta.",
        en: "Kogo restaurant and Wine Bar is the ideal venue for corporate parties, social occasions and private celebrations — right in the centre of Prague. Together we design a bespoke event exactly to your wishes, with attention to detail, a smooth run of show and personal care for every guest.",
      } as L,
      {
        cs: "Naší rolí je vás hýčkat do posledního detailu. Děláme to s nasazením, profesionalitou a hlavně s chutí, protože nás to jednoduše baví.",
        en: "Our role is to look after you down to the last detail. We do it with commitment, professionalism and, above all, with pleasure — because we simply enjoy it.",
      } as L,
      {
        cs: "Firemní stolování už dávno není jen o objednávání a podávání rukou přes stůl. Jde o budování vztahů, vytváření pozitivního dojmu a spojení kulinářského zážitku s vaší značkou. V Kogu tomu rozumíme.",
        en: "Corporate dining has long stopped being about ordering food and shaking hands across the table. It is about building relationships, creating a lasting impression and connecting a culinary experience with your brand. At Kogo, we understand that.",
      } as L,
    ],
    stats: [
      { value: 30, suffix: "+", label: { cs: "Let zkušeností", en: "Years of experience" } as L },
      { value: 25, suffix: "", label: { cs: "Let ve Slovanském domě", en: "Years in Slovanský dům" } as L },
      { value: 1000, suffix: "+", label: { cs: "Realizovaných eventů", en: "Events delivered" } as L },
    ],
  },

  // 02 — Prostory
  spaces: {
    eyebrow: { cs: "Prostory", en: "Spaces" } as L,
    title: { cs: "Prostor, který se přizpůsobí akci", en: "A space that adapts to your event" } as L,
    lead: {
      cs: "Prostory restaurace i odděleného Wine Baru lze upravit podle typu akce. Klidná zahrada ve vnitrobloku, jedna z nejhezčích v Praze, nabízí příjemné zázemí.",
      en: "The restaurant and the separate Wine Bar can both be adapted to the type of event. The quiet courtyard garden, one of the loveliest in Prague, offers a pleasant retreat.",
    } as L,
    note: {
      cs: "Pronájem je pro skupiny od 50 osob zdarma. Pro menší skupiny a rezervaci celého Wine Baru nás kontaktujte pro individuální nabídku.",
      en: "Venue hire is free for groups of 50 or more. For smaller groups and for booking the entire Wine Bar, contact us for an individual offer.",
    } as L,
    list: [
      {
        name: { cs: "Restaurace", en: "Restaurant" } as L,
        image: "/images/interior/interier-sal.jpg",
        specs: [
          { label: { cs: "Rozloha", en: "Area" } as L, value: { cs: "200 m²", en: "200 m²" } as L },
          { label: { cs: "Kapacita k sezení", en: "Seated capacity" } as L, value: { cs: "60 míst", en: "60 seats" } as L },
          { label: { cs: "Recepce (koktejl)", en: "Reception (cocktail)" } as L, value: { cs: "100 osob", en: "100 people" } as L },
          { label: { cs: "Zahrada", en: "Garden" } as L, value: { cs: "90 míst", en: "90 seats" } as L },
        ],
      },
      {
        name: { cs: "Wine Bar", en: "Wine Bar" } as L,
        image: "/images/winebar/wine-bar-1.jpg",
        specs: [
          { label: { cs: "Rozloha", en: "Area" } as L, value: { cs: "358 m²", en: "358 m²" } as L },
          { label: { cs: "Kapacita k sezení", en: "Seated capacity" } as L, value: { cs: "120 míst", en: "120 seats" } as L },
          { label: { cs: "Letní zahrada", en: "Summer garden" } as L, value: { cs: "120 míst", en: "120 seats" } as L },
        ],
      },
    ] as Space[],
  },

  // 03 — Ceník menu
  pricing: {
    eyebrow: { cs: "Ceník menu", en: "Menu pricing" } as L,
    title: { cs: "Středomořské menu\npro každou příležitost", en: "Mediterranean menus\nfor every occasion" } as L,
    lead: {
      cs: "Pro vaše společenské akce připravujeme tříchodová i čtyřchodová menu, která zaujmou všechny — od milovníků mořských plodů, přes gurmány vyhledávající kvalitní maso, až po vegetariány.",
      en: "For your events we prepare three- and four-course menus that appeal to everyone — from seafood lovers, through connoisseurs of fine meat, to vegetarians.",
    } as L,
    rows: [
      { label: { cs: "Vegetariánské menu", en: "Vegetarian menu" } as L, three: "1 150 Kč", four: "1 450 Kč" },
      { label: { cs: "Rybí / masové menu", en: "Fish / meat menu" } as L, three: "1 650 Kč", four: "1 950 Kč" },
    ] as PriceRow[],
    courses: [
      { title: { cs: "Předkrmy", en: "Starters" } as L, body: { cs: "Výběr toho nejlepšího z naší studené kuchyně.", en: "The best of our cold kitchen." } as L },
      { title: { cs: "Mezichody", en: "Intermediate courses" } as L, body: { cs: "Domácí těstoviny a rizota s důrazem na autentické středomořské ingredience.", en: "Home-made pasta and risotto built on authentic Mediterranean ingredients." } as L },
      { title: { cs: "Hlavní chody", en: "Main courses" } as L, body: { cs: "Pečlivě vybrané speciality z ryb, masa i vegetariánské alternativy.", en: "Carefully selected fish and meat specialities plus vegetarian alternatives." } as L },
      { title: { cs: "Dezerty", en: "Desserts" } as L, body: { cs: "Klasické sladké speciality, které elegantně zakončí vaše setkání.", en: "Classic sweet specialities to close your gathering with elegance." } as L },
    ],
    notes: [
      { cs: "Občerstvení je možné podávat servírovanou formou nebo rautově.", en: "Food can be served plated or as a buffet." } as L,
      { cs: "Individuální menu na míru připravíme dle požadavků klienta.", en: "A bespoke menu can be prepared to the client's requirements." } as L,
      { cs: "Menu doplňuje pečlivě sestavený vinný lístek s více než 200 italskými víny, takže si každý host najde ideální doprovod k vybraným chodům.", en: "The menu is complemented by a carefully curated wine list with over 200 Italian wines, so every guest finds the perfect pairing." } as L,
    ],
  },

  // 04 — Šéfkuchař
  chef: {
    eyebrow: { cs: "Šéfkuchař a majitel", en: "Chef & owner" } as L,
    name: { cs: "Jovo Savić", en: "Jovo Savić" } as L,
    image: "/images/chef/sefkuchar-jovo-savic.jpg",
    body: [
      {
        cs: "Jovo Savić je srdcem a duší restaurace Kogo ve Slovanském domě. Narodil se v Sarajevu, kde vlastnil a vedl tři restaurace, které musel opustit kvůli válce. Do Prahy přesídlil v roce 1992 a od té doby zde buduje svou gastronomickou vizi.",
        en: "Jovo Savić is the heart and soul of Kogo in Slovanský dům. Born in Sarajevo, where he owned and ran three restaurants he had to leave because of the war, he moved to Prague in 1992 and has been building his culinary vision here ever since.",
      } as L,
      {
        cs: "Od založení Koga se zaměřuje na středomořskou kuchyni, kladoucí důraz na prémiové a čerstvé suroviny, kvalitní italská vína a dokonalou péči o každý detail — od servisu přes přípravu pokrmů až po atmosféru. Jeho filozofie je jednoduchá: nabízet vždy jen to nejlepší.",
        en: "Since founding Kogo he has focused on Mediterranean cuisine, insisting on premium fresh produce, fine Italian wines and impeccable attention to every detail — from the service and the cooking to the atmosphere. His philosophy is simple: always offer only the best.",
      } as L,
      {
        cs: "Jovo udržuje osobní a důvěryhodné vztahy s klienty i týmem, inspiruje se cestami po Středomoří a svou vášeň přenáší do každého pokrmu.",
        en: "Jovo keeps personal, trusting relationships with guests and his team alike, draws inspiration from his travels around the Mediterranean and carries that passion into every dish.",
      } as L,
    ],
  },

  // 05 — Udržitelnost
  sustainability: {
    eyebrow: { cs: "Udržitelnost", en: "Sustainability" } as L,
    title: { cs: "Vaříme s respektem\nke kvalitě, lidem i přírodě", en: "We cook with respect\nfor quality, people and nature" } as L,
    image: "/images/food/chrest.jpg",
    body: [
      {
        cs: "S našimi dodavateli se osobně známe, majitel Jovo Savić je všechny navštívil, takže přesně víme, odkud naše suroviny pocházejí a jakým způsobem jsou pěstovány, vyráběny nebo loveny.",
        en: "We know our suppliers personally — owner Jovo Savić has visited every one of them — so we know exactly where our ingredients come from and how they are grown, produced or caught.",
      } as L,
      {
        cs: "Přestože jsme velká restaurace, pečlivě plánujeme, nic nevyhazujeme a nic u nás nepřijde nazmar. Udržitelnost pro nás neznamená jen vybírat lokální produkty, ale přemýšlet nad celým procesem. Sledujeme skutečnou uhlíkovou stopu — od pěstování až po dopravu.",
        en: "Even though we are a large restaurant, we plan carefully and nothing goes to waste. For us sustainability is not only about choosing local produce, but about thinking through the whole process. We track the real carbon footprint — from growing to transport.",
      } as L,
      {
        cs: "Zelenina z vytápěných skleníků v tuzemsku má kvůli vysoké energetické náročnosti větší uhlíkovou stopu než plodiny pěstované přirozeně na poli v italském klimatu. Díky šetrnému hospodaření, efektivní logistice a zodpovědnému lovu mořských plodů mají naše suroviny ze Středomoří často menší dopad na životní prostředí.",
        en: "Vegetables from heated greenhouses at home carry a larger carbon footprint, because of their energy demands, than crops grown naturally in the field in the Italian climate. Thanks to careful husbandry, efficient logistics and responsible seafood sourcing, our Mediterranean ingredients often have a smaller environmental impact.",
      } as L,
    ],
  },

  // 06 — FAQ
  faq: {
    eyebrow: { cs: "Často kladené dotazy", en: "Frequently asked questions" } as L,
    items: [
      { q: { cs: "Do kdy může akce trvat?", en: "How late can an event run?" } as L, a: { cs: "Otevírací doba restaurace je do 23:00. Po dohodě lze prodloužit.", en: "The restaurant is open until 11 pm. It can be extended by arrangement." } as L },
      { q: { cs: "Jaké jsou storno podmínky?", en: "What is the cancellation policy?" } as L, a: { cs: "Do 48 hodin před akcí je záloha vratná v plné výši. Při zrušení později je záloha použita jako storno poplatek.", en: "Up to 48 hours before the event the deposit is fully refundable. If cancelled later, the deposit is used as a cancellation fee." } as L },
      { q: { cs: "Je objekt bezbariérový?", en: "Is the venue wheelchair accessible?" } as L, a: { cs: "Přístup je možný, avšak toalety bezbariérové nejsou.", en: "Access is possible, however the toilets are not wheelchair accessible." } as L },
      { q: { cs: "Je možné přinést si vlastní dort?", en: "Can we bring our own cake?" } as L, a: { cs: "Ano, lze přinést vlastní dort, nebo využít naše domácí dorty — jahodový cheesecake, Reforma (čokoládový dort s ořechy).", en: "Yes, you may bring your own cake, or choose one of ours — strawberry cheesecake or Reforma (chocolate walnut cake)." } as L },
      { q: { cs: "Účtujete poplatek za vlastní jídlo?", en: "Do you charge a fee for outside food?" } as L, a: { cs: "Ano, poplatek odpovídá ceně tříchodového vegetariánského menu.", en: "Yes — the fee equals the price of the three-course vegetarian menu." } as L },
      { q: { cs: "Lze u vás promítat prezentaci nebo pustit vlastní hudbu?", en: "Can we show a presentation or play our own music?" } as L, a: { cs: "Ano. K dispozici je televizor i možnost přehrávání hudby z mobilního zařízení.", en: "Yes. A television is available, as well as music playback from a mobile device." } as L },
      { q: { cs: "Zajišťujete výzdobu a doprovodný program?", en: "Do you arrange decoration and entertainment?" } as L, a: { cs: "Ano — květiny, tematickou výzdobu, fotokoutek, barmanskou show, sommeliera či hudební doprovod je možné objednat u externích dodavatelů.", en: "Yes — flowers, themed decoration, a photo booth, a bartending show, a sommelier or live music can be arranged through external suppliers." } as L },
      { q: { cs: "Máte dětské židličky?", en: "Do you have high chairs?" } as L, a: { cs: "Ano, dětské židle jsou k dispozici. Dětský koutek nemáme.", en: "Yes, high chairs are available. We do not have a children's play corner." } as L },
      { q: { cs: "Poskytujete košer nebo halal jídlo?", en: "Do you offer kosher or halal food?" } as L, a: { cs: "Košer ani halal jídlo nezajišťujeme, ale je možné přinést si vlastní pokrm za poplatek.", en: "We do not provide kosher or halal food, but you may bring your own dish for a fee." } as L },
    ] as Faq[],
  },

  // 07 — Podmínky
  terms: {
    eyebrow: { cs: "Podmínky", en: "Terms" } as L,
    items: [
      { q: { cs: "Záloha", en: "Deposit" } as L, a: { cs: "Pro potvrzení skupinové rezervace je nutné uhradit zálohu (výše dle rozpočtu). Platba převodem nebo online kartou.", en: "A deposit (amount based on the budget) is required to confirm a group booking. Payment by bank transfer or online card." } as L },
      { q: { cs: "Zrušení rezervace", en: "Cancellation" } as L, a: { cs: "Do 48 hodin před akcí je záloha vratná v plné výši. Při zrušení později je záloha nevratná.", en: "Up to 48 hours before the event the deposit is fully refundable. Later cancellations forfeit the deposit." } as L },
      { q: { cs: "Změna počtu osob", en: "Change of guest count" } as L, a: { cs: "Snížení počtu účastníků méně než 24 hodin před akcí nemá vliv na cenu. Při navýšení bude účtován skutečný počet osob.", en: "Reducing the number of guests less than 24 hours before the event does not affect the price. Increases are billed at the actual count." } as L },
      { q: { cs: "Service charge", en: "Service charge" } as L, a: { cs: "Skupinové akce podléhají poplatku 10 % z celkové konzumace.", en: "Group events are subject to a 10% charge on total consumption." } as L },
      { q: { cs: "Způsob platby", en: "Payment methods" } as L, a: { cs: "Bankovním převodem, kartou online, hotově nebo kartou v restauraci.", en: "Bank transfer, online card, cash or card at the restaurant." } as L },
    ] as Faq[],
  },

  // 08 — Reference & ocenění
  references: {
    eyebrow: { cs: "Reference & ocenění", en: "References & awards" } as L,
    // Další reference stačí připsat do tohoto seznamu — karusel je zobrazí sám.
    quotes: [
      {
        quote: {
          cs: "V centru Prahy představuje Kogo Slovanský dům ideální volbu pro pracovní obědy i večerní setkání. Elegantní interiér, profesionální servis a špičková kuchyně podtrhují prestižní charakter tohoto místa.",
          en: "In the centre of Prague, Kogo Slovanský dům is the ideal choice for business lunches and evening gatherings. The elegant interior, professional service and outstanding cuisine underline the prestige of this place.",
        } as L,
        author: {
          cs: "Václav Koukolíček, manažer externí komunikace Coca-Cola HBC ČR a SR",
          en: "Václav Koukolíček, External Communications Manager, Coca-Cola HBC CZ & SK",
        } as L,
      },
    ],
    awards: [
      {
        title: { cs: "Gault & Millau — dvě čepice", en: "Gault & Millau — two toques" } as L,
        body: {
          cs: "Prestižní gastronomický průvodce hodnotící restaurace napříč světem. Dvě čepice představují vysokou úroveň gastronomie a řadí restauraci mezi 100 nejlepších v České republice.",
          en: "A prestigious guide rating restaurants worldwide. Two toques mark a high level of gastronomy and place the restaurant among the 100 best in the Czech Republic.",
        } as L,
      },
      {
        title: { cs: "Zlatí lvi — dva zlaté lvi", en: "Golden Lions — two golden lions" } as L,
        body: {
          cs: "Prestižní česká gastronomická certifikace udělovaná v rámci nezávislého průvodce TopLife Czech. Dva zlaté lvi představují špičkovou úroveň kvality, luxusní servis a komplexní kulinářský zážitek.",
          en: "A prestigious Czech certification awarded within the independent TopLife Czech guide. Two golden lions denote top quality, luxury service and a complete culinary experience.",
        } as L,
      },
    ],
  },

  // 09 — Kontakt
  contact: {
    eyebrow: { cs: "Plánujete společenskou akci?", en: "Planning an event?" } as L,
    title: { cs: "Kontaktujte naše manažerky", en: "Contact our event managers" } as L,
    managers: ["Jitka Kovalčíková", "Jana Silná"],
    email: "slovanskydum@kogo.cz",
    web: "www.kogo-slovanskydum.cz",
    operator: {
      name: "Prague Rest Group, s.r.o.",
      address: "Na Příkopě 859/22, 110 00 Praha 1",
      ico: "27209270",
      dic: "CZ27209270",
    },
  },
};

// Texty upravené klientkou v Google tabulce (viz overrides.ts).
applyOverrides("events", { eventMenus, eventPresentation, eventTerms, eventsIntro, raut });
