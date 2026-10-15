// -----------------------------------------------------------------------------
// Full site structure from the detailed brief: navigation, "Kogo v číslech"
// stats, breakfast menu, and content for the additional pages (CS/EN).
// Placeholder-but-usable copy is marked TODO(client) where real content is needed.
// -----------------------------------------------------------------------------
import type { L } from "./site";
import { applyOverrides, calendarOverride, menuOverride } from "./overrides";

// ---- Full navigation (with dropdowns) ------------------------------------
export type NavChild = { href: string; label: L };
export type NavNode = { href: string; label: L; children?: NavChild[] };

// Pořadí přesně podle seznamu kategorií od klientky (zadání 5. 10. 2026).
export const navFull: NavNode[] = [
  {
    href: "/menu",
    label: { cs: "Menu", en: "Menu" },
    children: [
      { href: "/menu", label: { cs: "Jídelní lístek", en: "Main menu" } },
      { href: "/menu/specialni-nabidka", label: { cs: "Speciální nabídka", en: "Special offer" } },
      { href: "/menu/dezerty", label: { cs: "Dezerty", en: "Desserts" } },
      { href: "/menu/snidane", label: { cs: "Snídaně", en: "Breakfast" } },
      { href: "/menu/napojovy-listek", label: { cs: "Nápojový lístek", en: "Drinks" } },
      { href: "/menu/vinny-listek", label: { cs: "Vinný lístek", en: "Wine list" } },
      { href: "/rozvoz", label: { cs: "Rozvoz", en: "Delivery" } },
    ],
  },
  { href: "/rezervace", label: { cs: "Rezervace", en: "Reservations" } },
  { href: "/rozvoz", label: { cs: "Rozvoz", en: "Delivery" } },
  { href: "/vouchery", label: { cs: "Vouchery", en: "Vouchers" } },
  { href: "/vernostni-program", label: { cs: "Věrnostní program", en: "Loyalty programme" } },
  // Oslavy & eventy — podstránky 3chodové/4chodové menu, raut a objednávka jsou
  // NEVEŘEJNÉ (klient je rozesílá odkazem), proto zde nejsou jako children.
  { href: "/udalosti", label: { cs: "Oslavy & eventy", en: "Celebrations & events" } },
  { href: "/kalendar-akci", label: { cs: "Kalendář akcí", en: "Events calendar" } },
  {
    href: "/galerie",
    label: { cs: "Galerie", en: "Gallery" },
    children: [
      { href: "/galerie#restaurace", label: { cs: "Restaurace", en: "Restaurant" } },
      { href: "/galerie#jidlo", label: { cs: "Jídlo", en: "Food" } },
      { href: "/galerie#wine-bar", label: { cs: "Wine bar", en: "Wine bar" } },
      { href: "/galerie#virtualni-prohlidka", label: { cs: "Virtuální prohlídka", en: "Virtual tour" } },
    ],
  },
  {
    href: "/filozofie",
    label: { cs: "O restauraci", en: "About" },
    children: [
      { href: "/filozofie", label: { cs: "Naše filozofie", en: "Our philosophy" } },
      { href: "/wine-bar", label: { cs: "Wine bar", en: "Wine bar" } },
    ],
  },
  { href: "/sefkuchar", label: { cs: "Šéfkuchař Jovo Savić", en: "Chef Jovo Savić" } },
  { href: "/kontakt", label: { cs: "Kontakt", en: "Contact" } },
  { href: "/blog", label: { cs: "Blog", en: "Blog" } },
];

// ---- "Kogo v číslech" — real data, anniversary 24. 4. 2026 ----------------
export const statsIntro = {
  eyebrow: { cs: "Kogo v číslech", en: "Kogo in numbers" } as L,
  title: { cs: "Čtvrt století v číslech", en: "A quarter century in numbers" } as L,
  note: { cs: "Data k výročí 24. 4. 2026.", en: "Figures as of the 24 April 2026 anniversary." } as L,
};

export type Stat = { value: number; suffix?: string; label: L; decimals?: number };
export const stats: Stat[] = [
  { value: 8873, label: { cs: "dní otevřeno", en: "days open" } },
  { value: 2448948, label: { cs: "spokojených hostů", en: "guests served" } },
  { value: 569, suffix: " t", label: { cs: "mořských plodů", en: "of seafood" } },
  { value: 391, suffix: " t", label: { cs: "čerstvých ryb", en: "of fresh fish" } },
  { value: 476999, label: { cs: "steaků & mas", en: "steaks & meats" } },
  { value: 535050, label: { cs: "lahví vína", en: "bottles of wine" } },
  { value: 1673300, label: { cs: "šálků kávy", en: "cups of coffee" } },
  { value: 515058, label: { cs: "dezertů", en: "desserts" } },
];

// ---- Breakfast (Colazione) — scraped -------------------------------------
export type Dish = { name: string; cs: string; en: string; price: number | null };
export const breakfast: { title: L; note: L; items: Dish[] } = {
  title: { cs: "Snídaně", en: "Breakfast" },
  note: { cs: "Teplé snídaně — Colazione calda.", en: "Warm breakfasts — Colazione calda." },
  items: [
    { name: "UOVA STRAPAZZATE", cs: "Míchaná vajíčka", en: "Scrambled eggs", price: 175 },
    { name: "UOVA CON PROSCIUTTO COTTO", cs: "Vajíčka se šunkou", en: "Eggs with ham", price: 195 },
    { name: "UOVA CON PANCETTA AFFUMICATA", cs: "Vajíčka se slaninou", en: "Eggs with bacon", price: 195 },
    { name: "OMELETTE CON FORMAGGIO", cs: "Omeleta se sýrem", en: "Cheese omelette", price: 225 },
    { name: "OMELETTE CON SPINACI", cs: "Omeleta se špenátem", en: "Spinach omelette", price: 225 },
  ],
};

// ---- Simple content pages -------------------------------------------------
export type Feature = { title: L; body: L };
export type SimplePage = {
  slug: string;
  hero: string;
  eyebrow: L;
  title: L;
  intro: L;
  features?: Feature[];
  ctaLabel?: L;
  ctaHref?: string;
  note?: L; // small print / TODO(client)
  /** Volitelný blok s praktickými informacemi pod kartami. */
  info?: { eyebrow: L; title: L; items: { title: L; body: L }[] };
};

export const simplePages: Record<string, SimplePage> = {
  rozvoz: {
    slug: "rozvoz",
    hero: "/images/food/rizoto-chrest-krevety.jpg",
    eyebrow: { cs: "Rozvoz", en: "Delivery" },
    title: { cs: "KOGO až k vám domů", en: "KOGO to your door" },
    intro: {
      cs: "Chuť Středomoří si vychutnáte i doma. Vyberte si z naší nabídky a my vám ji přivezeme — čerstvé, pečlivě zabalené, připravené k servírování.",
      en: "Enjoy the taste of the Mediterranean at home too. Choose from our menu and we will bring it to you — fresh, carefully packed, ready to serve.",
    },
    features: [
      { title: { cs: "Objednávka online", en: "Order online" }, body: { cs: "Rychlá objednávka přes QR kód nebo náš objednávkový systém.", en: "Quick ordering via QR code or our ordering system." } },
      { title: { cs: "Centrum Prahy", en: "Prague centre" }, body: { cs: "Rozvážíme do okolí Slovanského domu a širšího centra.", en: "We deliver around Slovanský dům and the wider centre." } },
      { title: { cs: "Vždy čerstvé", en: "Always fresh" }, body: { cs: "Připravujeme až po objednávce, ze stejných surovin jako v restauraci.", en: "Prepared to order, from the same ingredients as in the restaurant." } },
    ],
    ctaLabel: { cs: "Objednat online", en: "Order online" },
    ctaHref: "https://kogo-slovanskydum.choiceqr.com/delivery/section:menu",
    note: { cs: "", en: "" },
  },
  vouchery: {
    slug: "vouchery",
    hero: "/images/winebar/wine-bar-pult.jpg",
    eyebrow: { cs: "Dárkové karty", en: "Gift cards" },
    title: { cs: "Darujte zážitek", en: "Give an experience" },
    intro: {
      cs: "Dárková karta KOGO je pozvánka do světa středomořské kuchyně a bezchybného servisu. Ideální dárek pro blízké i obchodní partnery.",
      en: "A KOGO gift card is an invitation into a world of Mediterranean cuisine and flawless service. A perfect gift for loved ones and business partners.",
    },
    features: [
      { title: { cs: "Libovolná hodnota", en: "Any value" }, body: { cs: "Kartu pořídíte v hodnotě dle vašeho výběru.", en: "Choose the value that suits you." } },
      { title: { cs: "Ihned k odeslání", en: "Ready to send" }, body: { cs: "Elektronický voucher koupíte online a dorazí obratem na e-mail.", en: "Buy an e-voucher online and it arrives by e-mail right away." } },
      { title: { cs: "Platí na vše", en: "Valid on everything" }, body: { cs: "Uplatníte na jídlo, nápoje i wine bar.", en: "Redeemable on food, drinks and the wine bar." } },
    ],
    // Nákup běží v jejich e-shopu shop.kogo.cz — web na něj jen odkazuje.
    ctaLabel: { cs: "Koupit voucher", en: "Buy a voucher" },
    ctaHref: "https://shop.kogo.cz/",
    // Fakta převzatá z e-shopu shop.kogo.cz + připomínka Jitky k plastové kartě (5. 10.).
    info: {
      eyebrow: { cs: "Jak voucher uplatnit", en: "How to redeem" },
      title: { cs: "Elektronický voucher i plastová karta", en: "E-voucher and plastic gift card" },
      items: [
        {
          title: { cs: "Elektronický voucher", en: "E-voucher" },
          body: {
            cs: "Při návštěvě restaurace stačí voucher ukázat obsluze v telefonu nebo v e-mailu. Případně si ho můžete vytisknout.",
            en: "When you visit, simply show the voucher to our staff on your phone or in the e-mail. You can also print it.",
          },
        },
        {
          title: { cs: "Plastová dárková karta", en: "Plastic gift card" },
          body: {
            cs: "Kartu je nutné mít u sebe a při placení ji fyzicky předložit obsluze. Plastové karty pořídíte přímo v restauraci — stačí se zeptat obsluhy, nebo napsat na marketing@kogo.cz.",
            en: "Please bring the card with you and present it to our staff when paying. Plastic cards are available in the restaurant — just ask our staff, or write to marketing@kogo.cz.",
          },
        },
        {
          title: { cs: "Platnost a zůstatek", en: "Validity and balance" },
          body: {
            cs: "Voucher platí 1 rok od data zakoupení. Zůstatek a platnost zjistíte naskenováním QR kódu na voucheru fotoaparátem telefonu.",
            en: "The voucher is valid for one year from purchase. Scan the QR code on the voucher with your phone camera to check its balance and validity.",
          },
        },
      ],
    },
  },
  "vernostni-program": {
    slug: "vernostni-program",
    hero: "/images/interior/interier-sal-2.jpg",
    eyebrow: { cs: "Věrnostní program", en: "Loyalty" },
    title: { cs: "KOGO Club", en: "KOGO Club" },
    intro: {
      cs: "Za vaši přízeň se odvděčujeme. Staňte se členem KOGO Clubu a proměňte každou návštěvu v odměnu.",
      en: "We reward your loyalty. Become a KOGO Club member and turn every visit into a reward.",
    },
    features: [
      { title: { cs: "Sbírejte body", en: "Collect points" }, body: { cs: "Za každou útratu získáváte body, které proměníte v odměny.", en: "Earn points on every visit and turn them into rewards." } },
      { title: { cs: "Exkluzivní pozvánky", en: "Exclusive invitations" }, body: { cs: "Přednostní rezervace a pozvánky na degustace a akce.", en: "Priority reservations and invitations to tastings and events." } },
      { title: { cs: "Narozeninový dárek", en: "Birthday treat" }, body: { cs: "Malá pozornost k vašim narozeninám.", en: "A little something for your birthday." } },
    ],
    ctaLabel: { cs: "Chci se přidat", en: "Join now" },
    ctaHref: "/kontakt",
    note: { cs: "TODO: doplnit pravidla programu a registraci.", en: "" },
  },
  udalosti: {
    slug: "udalosti",
    hero: "/images/interior/interier-hlavni.jpg",
    eyebrow: { cs: "Oslavy & eventy", en: "Celebrations & events" },
    title: { cs: "Vaše události ve Slovanském domě", en: "Your events in Slovanský dům" },
    intro: {
      cs: "Svatby, firemní večírky, oslavy i společenské akce — v srdci Prahy vám připravíme událost, na kterou se nezapomíná. Prostory, menu i servis šité na míru.",
      en: "Weddings, corporate parties, celebrations and social events — in the heart of Prague we prepare an occasion to remember. Space, menu and service tailored to you.",
    },
    features: [
      { title: { cs: "Soukromé prostory", en: "Private spaces" }, body: { cs: "Varianty pro intimní oslavy i velké společnosti.", en: "Options for intimate gatherings and large groups." } },
      { title: { cs: "Menu na míru", en: "Bespoke menu" }, body: { cs: "Degustační i à la carte menu sestavené s naším šéfkuchařem.", en: "Tasting or à la carte menus crafted with our chef." } },
      { title: { cs: "Kompletní servis", en: "Full service" }, body: { cs: "Postaráme se o vše — od vína po poslední detail.", en: "We take care of everything — from the wine to the last detail." } },
    ],
    ctaLabel: { cs: "Nezávazně poptat", en: "Enquire" },
    ctaHref: "/kontakt",
    note: { cs: "TODO(klient): doplnit kapacity, fotogalerii akcí a balíčky.", en: "" },
  },
  kariera: {
    slug: "kariera",
    hero: "/images/interior/interier-jamon.jpg",
    eyebrow: { cs: "Kariéra", en: "Careers" },
    title: { cs: "Přidejte se k týmu KOGO", en: "Join the KOGO team" },
    intro: {
      cs: "Hledáme kolegy, kteří milují gastronomii a chtějí být součástí restaurace s pětadvacetiletou tradicí. Nabízíme férové podmínky a tým, který táhne za jeden provaz.",
      en: "We are looking for colleagues who love hospitality and want to be part of a restaurant with a 25-year tradition. We offer fair conditions and a team that pulls together.",
    },
    features: [
      { title: { cs: "Číšník / Servírka", en: "Waiter / Waitress" }, body: { cs: "Pro hosty, kterým záleží na servisu.", en: "For guests who value great service." } },
      { title: { cs: "Kuchař", en: "Cook" }, body: { cs: "Práce s čerstvými rybami a italskou kuchyní.", en: "Working with fresh fish and Italian cuisine." } },
      { title: { cs: "Barman / Someliér", en: "Bartender / Sommelier" }, body: { cs: "Náš wine bar hledá posily.", en: "Our wine bar is looking for talent." } },
    ],
    ctaLabel: { cs: "Napište nám", en: "Get in touch" },
    ctaHref: "/kontakt",
    note: { cs: "TODO(klient): doplnit aktuální pozice a benefity.", en: "" },
  },
  "specialni-nabidka": {
    slug: "menu/specialni-nabidka",
    hero: "/images/food/chrest-hollandaise.jpg",
    eyebrow: { cs: "Speciální nabídka", en: "Special offer" },
    title: { cs: "Sezónní speciality", en: "Seasonal specials" },
    intro: {
      cs: "Vedle stálého lístku připravujeme sezónní menu podle toho, co právě nabízí trh — chřest na jaře, čerstvé úlovky, svatomartinská husa na podzim.",
      en: "Alongside the regular menu we prepare seasonal offers based on what the market brings — asparagus in spring, the freshest catch, St Martin's goose in autumn.",
    },
    ctaLabel: { cs: "Zobrazit jídelní lístek", en: "See the main menu" },
    ctaHref: "/menu",
    note: { cs: "TODO(klient): aktuální sezónní nabídka se bude vkládat sem.", en: "" },
  },
  "napojovy-listek": {
    slug: "menu/napojovy-listek",
    hero: "/images/winebar/koktejl-kogo-25-sour.jpg",
    eyebrow: { cs: "Nápojový lístek", en: "Drinks" },
    title: { cs: "Nápoje & koktejly", en: "Drinks & cocktails" },
    intro: {
      cs: "Aperitivy, signature koktejly a mocktaily, nealko, káva i čaje. Náš podpisový koktejl Kogo No. 25 Sour k výročí najdete i v nealko variantě.",
      en: "Aperitifs, signature cocktails and mocktails, soft drinks, coffee and teas. Our signature Kogo No. 25 Sour anniversary cocktail is also available alcohol-free.",
    },
    ctaLabel: { cs: "Náš wine bar", en: "Our wine bar" },
    ctaHref: "/wine-bar",
    note: { cs: "TODO(klient): kompletní nápojový lístek k doplnění.", en: "" },
  },
  "vinny-listek": {
    slug: "menu/vinny-listek",
    hero: "/images/winebar/wine-bar-3.jpg",
    eyebrow: { cs: "Vinný lístek", en: "Wine list" },
    title: { cs: "Vína po sklenkách i lahvích", en: "Wines by the glass and bottle" },
    intro: {
      cs: "Pečlivě vybraná vína — italská i světová — vybíráme tak, aby ladila s naší kuchyní. Nechte si poradit od naší obsluhy nebo posezením ve wine baru.",
      en: "Carefully selected wines — Italian and international — chosen to pair with our cuisine. Ask our staff for a recommendation or linger in the wine bar.",
    },
    ctaLabel: { cs: "Náš wine bar", en: "Our wine bar" },
    ctaHref: "/wine-bar",
    note: { cs: "TODO(klient): kompletní vinný lístek k doplnění.", en: "" },
  },
};

// ---- Blog — seeded with the restaurant's real news ------------------------
export const blogIntro = {
  eyebrow: { cs: "Blog & novinky", en: "Blog & news" } as L,
  title: { cs: "Co je u nás nového", en: "What's new with us" } as L,
};
export type Post = { date: string; image: string; title: L; excerpt: L };
export const posts: Post[] = [
  {
    date: "2026-06-17",
    image: "/images/brand/oceneni-nejlepsi-restaurace-2026.png",
    title: { cs: "Získali jsme dva Zlaté lvy", en: "We won two Golden Lions" },
    excerpt: { cs: "Děkujeme za ocenění Nejlepší restaurace 2026 i všem, kteří nás podporují.", en: "Thank you for the Best Restaurant 2026 award and to everyone who supports us." },
  },
  {
    date: "2026-05-29",
    image: "/images/chef/sefkuchar-jovo-savic.jpg",
    title: { cs: "Rozhovor s Jovem Savićem ve Forbesu", en: "Jovo Savić interviewed by Forbes" },
    excerpt: { cs: "V květnovém vydání Forbesu vyšel rozhovor o cestě našeho Founder & Executive Chefa.", en: "The May issue of Forbes featured an interview about our Founder & Executive Chef's journey." },
  },
  {
    date: "2026-04-24",
    image: "/images/interior/interier-hlavni.jpg",
    title: { cs: "Slavíme 25 let ve Slovanském domě", en: "Celebrating 25 years in Slovanský dům" },
    excerpt: { cs: "Čtvrt století, tisíce večerů a jedna posedlost dělat věci pořádně.", en: "A quarter century, thousands of evenings and one obsession — doing things right." },
  },
  {
    date: "2026-05-06",
    image: "/images/food/chrest-hollandaise.jpg",
    title: { cs: "Chřestové menu je zpět", en: "The asparagus menu is back" },
    excerpt: { cs: "Sezónní speciality s čerstvým chřestem — jen na omezenou dobu.", en: "Seasonal specials with fresh asparagus — for a limited time only." },
  },
];

// ---- Legal / info pages (text) -------------------------------------------
export type LegalSection = { heading: L; body: L };
export type LegalPage = { slug: string; title: L; intro: L; sections: LegalSection[]; note?: L };

export const legalPages: Record<string, LegalPage> = {
  "obchodni-podminky": {
    slug: "obchodni-podminky",
    title: { cs: "Obchodní podmínky", en: "Terms & Conditions" },
    intro: {
      cs: "Podmínky pro rezervace, dárkové karty a rozvoz KOGO Slovanský dům.",
      en: "Terms for reservations, gift cards and delivery at KOGO Slovanský dům.",
    },
    sections: [
      { heading: { cs: "Rezervace", en: "Reservations" }, body: { cs: "Rezervace potvrzujeme e-mailem nebo telefonicky. U větších skupin a akcí si vyhrazujeme právo požadovat zálohu.", en: "Reservations are confirmed by e-mail or phone. For larger groups and events we reserve the right to request a deposit." } },
      { heading: { cs: "Dárkové karty", en: "Gift cards" }, body: { cs: "Dárkové karty jsou přenosné a platí po dobu uvedenou na kartě. Nelze je směnit za hotovost.", en: "Gift cards are transferable and valid for the period stated on the card. They cannot be exchanged for cash." } },
      { heading: { cs: "Zrušení", en: "Cancellation" }, body: { cs: "Rezervaci lze bezplatně zrušit do sjednané doby před termínem.", en: "Reservations can be cancelled free of charge up to the agreed time before the booking." } },
    ],
    note: { cs: "TODO(klient): finální znění dodá právník / provozovatel.", en: "" },
  },
  "ochrana-osobnich-udaju": {
    slug: "ochrana-osobnich-udaju",
    title: { cs: "Ochrana osobních údajů", en: "Privacy Policy" },
    intro: {
      cs: "Jak nakládáme s vašimi osobními údaji v souladu s GDPR.",
      en: "How we handle your personal data in line with the GDPR.",
    },
    sections: [
      { heading: { cs: "Správce údajů", en: "Data controller" }, body: { cs: "Správcem je provozovatel restaurace KOGO Slovanský dům, Na Příkopě 859/22, Praha 1.", en: "The controller is the operator of KOGO Slovanský dům, Na Příkopě 859/22, Prague 1." } },
      { heading: { cs: "Jaké údaje zpracováváme", en: "What we process" }, body: { cs: "Údaje z rezervací a kontaktních formulářů (jméno, e-mail, telefon) používáme výhradně k vyřízení vaší žádosti.", en: "Data from reservations and contact forms (name, e-mail, phone) is used solely to handle your request." } },
      { heading: { cs: "Vaše práva", en: "Your rights" }, body: { cs: "Máte právo na přístup, opravu i výmaz svých údajů. Kontaktujte nás na uvedeném e-mailu.", en: "You have the right to access, correct and delete your data. Contact us at the e-mail provided." } },
    ],
    note: { cs: "TODO(klient): finální znění dodá právník / provozovatel.", en: "" },
  },
  cookies: {
    slug: "cookies",
    title: { cs: "Zásady cookies", en: "Cookie Policy" },
    intro: {
      cs: "Tento web používá cookies pro základní funkčnost a anonymní statistiky návštěvnosti.",
      en: "This site uses cookies for basic functionality and anonymous traffic statistics.",
    },
    sections: [
      { heading: { cs: "Nezbytné cookies", en: "Essential cookies" }, body: { cs: "Potřebné pro provoz webu (např. volba jazyka).", en: "Required for the site to work (e.g. language choice)." } },
      { heading: { cs: "Analytické cookies", en: "Analytics cookies" }, body: { cs: "Pomáhají nám anonymně měřit návštěvnost a web zlepšovat.", en: "Help us measure traffic anonymously and improve the site." } },
    ],
    note: { cs: "TODO(klient): napojit cookie lištu a analytiku (GA4) dle potřeby.", en: "" },
  },
};

// ---- Gallery groups (from downloaded photos) ------------------------------
export const galleryGroups: { id: string; title: L; images: string[] }[] = [
  {
    id: "restaurace",
    title: { cs: "Restaurace", en: "Restaurant" },
    images: [
      "/images/interior/interier-hlavni.jpg",
      "/images/interior/interier-sal.jpg",
      "/images/interior/interier-sal-2.jpg",
      "/images/interior/interier-jamon.jpg",
      "/images/interior/interier-detail.jpg",
      "/images/terrace/terasa.jpg",
      "/images/terrace/terasa-2.jpg",
      "/images/terrace/terasa-zahrada.jpg",
    ],
  },
  {
    id: "jidlo",
    title: { cs: "Jídlo", en: "Food" },
    images: [
      "/images/food/tunak-tataki.jpg",
      "/images/food/rizoto-chrest-krevety.jpg",
      "/images/food/chrest-hollandaise.jpg",
      "/images/food/jamon-serrano.jpg",
      "/images/food/chrest.jpg",
    ],
  },
  {
    id: "wine-bar",
    title: { cs: "Wine bar", en: "Wine bar" },
    images: [
      "/images/winebar/wine-bar-pult.jpg",
      "/images/winebar/wine-bar-1.jpg",
      "/images/winebar/wine-bar-2.jpg",
      "/images/winebar/wine-bar-3.jpg",
      "/images/winebar/wine-bar-4.jpg",
      "/images/winebar/koktejl-kogo-25-sour.jpg",
    ],
  },
];

// ---- Věrnostní program — KOGO Members Program ------------------------------
// Obsah dodaný klientkou (zadání 15. 9. 2026). Registrace vede do jejich
// e-shopu shop.kogo.cz, zbylá dvě tlačítka míří na sekce níže na stránce.
export type LoyaltyButton = { title: L; label: L; href: string; external?: boolean; primary?: boolean };

export const loyalty = {
  hero: "/images/interior/interier-detail.jpg",
  eyebrow: { cs: "Věrnostní program", en: "Loyalty programme" } as L,
  title: { cs: "KOGO Members Program", en: "KOGO Members Program" } as L,
  lead: {
    cs: "Sbírejte odměny a cashback z každé návštěvy ve Slovanském domě. Registrace zabere minutu.",
    en: "Collect rewards and cashback on every visit to Slovanský dům. Signing up takes a minute.",
  } as L,

  buttons: [
    {
      title: { cs: "Staňte se členem a získejte odměny a cashback za svou útratu", en: "Become a member and earn rewards and cashback on what you spend" } as L,
      label: { cs: "Registrace zde", en: "Register here" } as L,
      href: "https://shop.kogo.cz/loyalty/join/kogo-members-program",
      external: true,
      primary: true,
    },
    {
      title: { cs: "Stáhněte si členskou kartu do své peněženky", en: "Save your membership card to your phone wallet" } as L,
      label: { cs: "Návod zde", en: "How to" } as L,
      href: "#karta",
    },
    {
      title: { cs: "Využívejte výhody KOGO Members Programu", en: "Enjoy the benefits of the KOGO Members Program" } as L,
      label: { cs: "Více zde", en: "More here" } as L,
      href: "#vyhody",
    },
  ] as LoyaltyButton[],

  // 2 — Stažení karty do mobilu
  card: {
    eyebrow: { cs: "Členská karta", en: "Membership card" } as L,
    title: { cs: "Stažení karty do mobilu", en: "Save the card to your phone" } as L,
    lead: {
      cs: "Mějte svou věrnostní kartu vždy po ruce — přímo v mobilu.",
      en: "Keep your loyalty card always at hand — right in your phone.",
    } as L,
    body: {
      cs: "Plastová karta už nemusí být další věc, kterou nosíte v peněžence. Uložte si ji do Apple Wallet nebo Google Peněženky a mějte ji kdykoliv k dispozici. Je to pohodlnější pro vás a zároveň šetrnější k životnímu prostředí.",
      en: "A plastic card no longer has to be another thing in your wallet. Save it to Apple Wallet or Google Wallet and have it with you at all times. More convenient for you and gentler on the planet.",
    } as L,
    stepsTitle: { cs: "Jak si kartu stáhnout do mobilu?", en: "How to save the card to your phone" } as L,
    stepsLead: {
      cs: "Pokud už svou věrnostní kartu máte, stačí pár jednoduchých kroků:",
      en: "If you already have your loyalty card, it only takes a few simple steps:",
    } as L,
    steps: [
      { cs: "Přihlaste se do svého věrnostního účtu.", en: "Sign in to your loyalty account." } as L,
      { cs: "V části Správa karty vyberte Stažení karty do mobilu.", en: "Under Card management choose Save card to phone." } as L,
      { cs: "Zvolte Přidat do Apple Peněženky nebo Přidat do Google Peněženky podle typu svého telefonu.", en: "Select Add to Apple Wallet or Add to Google Wallet depending on your phone." } as L,
      { cs: "Potvrďte tlačítkem Přidat.", en: "Confirm with the Add button." } as L,
    ] as L[],
    outro: {
      cs: "A je hotovo. Vaši kartu teď máte vždy u sebe. V restauraci ji pak jednoduše předložte obsluze při žádosti o účet, stejně jako klasickou kartu.",
      en: "And that is it. Your card is now always with you. In the restaurant simply show it to the staff when asking for the bill, just like the plastic one.",
    } as L,
  },

  // 3 — Výhody
  benefits: {
    eyebrow: { cs: "Výhody", en: "Benefits" } as L,
    title: { cs: "Využívejte výhody KOGO Members Programu", en: "Enjoy the benefits of the KOGO Members Program" } as L,
    lead: { cs: "Sbírejte odměny z vaší útraty v Kogo Slovanský dům.", en: "Collect rewards on what you spend at Kogo Slovanský dům." } as L,
    tiers: [
      {
        name: "Silver",
        points: { cs: "50 bodů", en: "50 points" } as L,
        per: { cs: "za každých 1 000 Kč útraty", en: "for every 1,000 CZK spent" } as L,
        condition: { cs: "", en: "" } as L,
      },
      {
        name: "Gold",
        points: { cs: "100 bodů", en: "100 points" } as L,
        per: { cs: "za každých 1 000 Kč útraty", en: "for every 1,000 CZK spent" } as L,
        condition: { cs: "od 40 000 Kč / rok", en: "from 40,000 CZK / year" } as L,
      },
    ],
    validity: { cs: "Cashback i členská úroveň platí 1 rok.", en: "Both cashback and membership tier are valid for one year." } as L,
    examples: [
      {
        q: { cs: "Jak funguje cashback?", en: "How does cashback work?" } as L,
        a: {
          cs: "10. 9. 2026 zákazník Silver utratí 2 100 Kč a získá 100 Kč cashback. Ten může využít do 10. 9. 2027.",
          en: "On 10 September 2026 a Silver member spends 2,100 CZK and earns 100 CZK cashback, which can be used until 10 September 2027.",
        } as L,
      },
      {
        q: { cs: "Jak se mění členská úroveň?", en: "How does the membership tier change?" } as L,
        a: {
          cs: "10. 9. 2026 zákazník Silver utratí 41 000 Kč a automaticky se posune do úrovně Gold. V Gold zůstává do 10. 9. 2027. Pokud do tohoto data znovu neutratí alespoň 40 000 Kč, vrátí se do úrovně Silver.",
          en: "On 10 September 2026 a Silver member spends 41,000 CZK and moves automatically to Gold, staying there until 10 September 2027. If they do not spend at least 40,000 CZK again by that date, they return to Silver.",
        } as L,
      },
    ],
  },
};

// ---- Kalendář akcí ---------------------------------------------------------
// Zatím bez akcí — klientka je doplní (později v administraci). Dokud je seznam
// prázdný, stránka ukáže pozvánku ke sledování a odkazy na eventy a Instagram.
export type CalendarItem = { date: string; time?: string; title: L; body: L; image?: string; href?: string };

export const eventsCalendar = {
  hero: "/images/interior/interier-sklo.jpg",
  eyebrow: { cs: "Kalendář akcí", en: "Events calendar" } as L,
  title: { cs: "Co se u nás chystá", en: "What's coming up" } as L,
  intro: {
    cs: "Degustační večery, sezónní menu a speciální příležitosti ve Slovanském domě.",
    en: "Tasting evenings, seasonal menus and special occasions in Slovanský dům.",
  } as L,
  empty: {
    title: { cs: "Nové akce právě připravujeme", en: "New events are on their way" } as L,
    body: {
      cs: "Jakmile zveřejníme termíny, najdete je právě tady. Do té doby nás sledujte na Instagramu — tam se o novinkách dozvíte jako první.",
      en: "As soon as we announce dates, you will find them right here. Until then, follow us on Instagram — that is where news appears first.",
    } as L,
  },
  items: [] as CalendarItem[],
};

// Snídaně a kalendář akcí z Google tabulky.
if (menuOverride?.snidane?.length) breakfast.items = menuOverride.snidane as typeof breakfast.items;
if (calendarOverride) eventsCalendar.items = calendarOverride as CalendarItem[];

// Texty upravené klientkou v Google tabulce (viz overrides.ts).
applyOverrides("pages", { blogIntro, breakfast, eventsCalendar, galleryGroups, legalPages, loyalty, navFull, posts, simplePages, stats, statsIntro });
