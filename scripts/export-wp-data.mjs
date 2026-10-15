// Přenese obsah z datových souborů Next verze do JSON pro WordPress šablonu.
// Spuštění: node --experimental-strip-types --no-warnings scripts/export-wp-data.mjs
import { writeFileSync } from 'node:fs';
const D = new URL('../src/data/', import.meta.url).href;
const OUT = '/Users/admin/web maxing/kogo-wp/site/wp-content/themes/kogo/data/';
const site = await import(D + 'site.ts'), menu = await import(D + 'menu.ts');
const pages = await import(D + 'pages.ts'), events = await import(D + 'events.ts');
const bundle = {
  site: { brand: site.brand, contact: site.contact, hours: site.hours, venues: site.venues, operator: site.operator,
    social: site.social, nav: site.nav, cta: site.cta, hero: site.hero, introTeaser: site.introTeaser,
    philosophy: site.philosophy, chef: site.chef, awards: site.awards, wineBar: site.wineBar,
    banners: site.banners, popup: site.popup, menuTeaser: site.menuTeaser, footer: site.footer },
  menu: { sections: menu.menu, allergens: menu.allergens },
  pages: { navFull: pages.navFull, statsIntro: pages.statsIntro, stats: pages.stats, simplePages: pages.simplePages,
    legalPages: pages.legalPages, galleryGroups: pages.galleryGroups, blogIntro: pages.blogIntro, posts: pages.posts,
    breakfast: pages.breakfast, loyalty: pages.loyalty, eventsCalendar: pages.eventsCalendar },
  events: { eventMenus: events.eventMenus, eventTerms: events.eventTerms, eventsIntro: events.eventsIntro,
    raut: events.raut, presentation: events.eventPresentation },
};
for (const [k, v] of Object.entries(bundle)) {
  writeFileSync(OUT + k + '.json', JSON.stringify(v, null, 1), 'utf8');
  console.log(k + '.json', JSON.stringify(v).length, 'B');
}
