// Vytáhne z datových souborů všechny texty, ceny, jídla a akce do řádků
// pro Google tabulku. Výstup: JSON (zpracuje scripts/build-sheet.py do .xlsx).
const D = new URL('../src/data/', import.meta.url).href;
const site = await import(D + 'site.ts'), pages = await import(D + 'pages.ts');
const events = await import(D + 'events.ts'), menu = await import(D + 'menu.ts');

const LABELS = [
  ['site.hero', 'Úvodní stránka – hlavní fotka'], ['site.introTeaser', 'Úvodní stránka – Náš přístup'],
  ['site.menuTeaser', 'Úvodní stránka – ukázka menu'], ['pages.statsIntro', 'Úvodní stránka – Kogo v číslech'],
  ['pages.stats', 'Úvodní stránka – Kogo v číslech'], ['site.banners', 'Oznamovací pruh nahoře'],
  ['site.popup', 'Uvítací okno'], ['site.cta', 'Texty tlačítek'], ['pages.navFull', 'Hlavní menu (navigace)'],
  ['site.nav', 'Patička – navigace'], ['site.footer', 'Patička'], ['site.brand', 'Značka'],
  ['site.venues', 'Restaurace a wine bar – kontakt'], ['site.hours', 'Otevírací doba'], ['site.operator', 'Provozovatel'],
  ['site.philosophy', 'Naše filozofie'], ['site.chef', 'Šéfkuchař'], ['site.awards', 'Šéfkuchař – ocenění'],
  ['site.wineBar', 'Wine bar'], ['pages.simplePages.rozvoz', 'Rozvoz'], ['pages.simplePages.vouchery', 'Vouchery'],
  ['pages.simplePages.kariera', 'Kariéra'], ['pages.simplePages.specialni-nabidka', 'Menu – Speciální nabídka'],
  ['pages.simplePages.napojovy-listek', 'Menu – Nápojový lístek'], ['pages.simplePages.vinny-listek', 'Menu – Vinný lístek'],
  ['pages.breakfast', 'Menu – Snídaně'], ['pages.loyalty', 'Věrnostní program'], ['pages.eventsCalendar', 'Kalendář akcí'],
  ['pages.galleryGroups', 'Galerie'], ['pages.blogIntro', 'Blog'], ['pages.posts', 'Blog – články'],
  ['pages.legalPages.obchodni-podminky', 'Obchodní podmínky'], ['pages.legalPages.ochrana-osobnich-udaju', 'Ochrana osobních údajů'],
  ['pages.legalPages.cookies', 'Cookies'], ['events.eventsIntro', 'Oslavy & eventy – úvod'],
  ['events.eventPresentation', 'Oslavy & eventy – prezentace'], ['events.eventMenus.0', 'Tříchodové menu (neveřejné)'],
  ['events.eventMenus.1', 'Čtyřchodové menu (neveřejné)'], ['events.eventTerms', 'Podmínky spolupráce (menu akcí)'],
  ['events.raut', 'Rautová nabídka (neveřejné)'],
];
// Data, která web nepoužívá (nahradily je jiné stránky) — do tabulky nepatří.
const SKIP = [/^pages\.simplePages\.(vernostni-program|udalosti)\b/, /^pages\.breakfast\.items/, /^pages\.eventsCalendar\.items/];
const VALUES = [/^site\.contact\.(phone|email|addressLine)$/, /^site\.venues\.\d+\.phone$/, /^site\.venues\.\d+\.hours\.\d+\.time$/,
  /^site\.hours\.\d+\.time$/, /^events\.eventMenus\.\d+\.prices\.\d+\.price$/, /^events\.eventPresentation\.pricing\.rows\.\d+\.(three|four)$/];

const where = (k) => (LABELS.find(([p]) => k === p || k.startsWith(p + '.')) || [, 'Ostatní'])[1];
const texts = [], values = [];
function flat(v, key) {
  if (SKIP.some((r) => r.test(key))) return;
  if (v && typeof v === 'object' && !Array.isArray(v) && typeof v.cs === 'string' && typeof v.en === 'string') {
    texts.push({ key, where: where(key), cs: v.cs, en: v.en }); return;
  }
  if (typeof v === 'string') { if (VALUES.some((r) => r.test(key))) values.push({ key, where: where(key), value: v }); return; }
  if (v && typeof v === 'object') for (const [k, x] of Object.entries(v)) flat(x, key + '.' + k);
}
for (const [pre, mod] of [['site', site], ['pages', pages], ['events', events]])
  for (const [k, v] of Object.entries(mod)) if (typeof v === 'object') flat(v, pre + '.' + k);

const menuRows = [];
for (const s of menu.menu) for (const it of s.items)
  menuRows.push({ id: s.id, section: s.cs, name: it.name, cs: it.cs, en: it.en, price: it.price, allergens: it.allergens || '' });
for (const it of pages.breakfast.items)
  menuRows.push({ id: 'snidane', section: 'Snídaně', name: it.name, cs: it.cs, en: it.en, price: it.price, allergens: it.allergens || '' });

process.stdout.write(JSON.stringify({ texts, values, menu: menuRows, sections: menu.menu.map((s) => [s.id, s.cs]).concat([['snidane', 'Snídaně']]) }));
