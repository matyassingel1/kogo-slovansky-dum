import { writeFileSync } from 'node:fs';
const D = 'file:///Users/admin/web%20maxing/kogo-web/src/data/';
const ev = await import(D + 'events.ts');
const site = await import(D + 'site.ts');
const FONTS = '/Users/admin/web maxing/kogo-web/src/fonts/';
const LOGO = '/Users/admin/web maxing/kogo-web/public/images/brand/logo-kogo-sd-gold.png';
const esc = (s) => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;');
const leaf = '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#8b7041" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>';

for (const m of ev.eventMenus) {
  const courses = m.sections.map((c, i) => {
    const t = c.title.cs.replace(/^Chod\s*\d+\s*[—-]\s*/,'');
    const dishes = c.dishes.map(d => `<li><span class="mk">${d.veg ? leaf : ''}</span><span>${esc(d.cs)}</span></li>`).join('');
    return `<section class="course"><p class="no">${i+1}. chod</p><h2>${esc(t)}</h2><ul>${dishes}</ul></section>`;
  }).join('');
  const prices = m.prices.map(p => `<div class="row"><span>${esc(p.label.cs)}</span><b>${esc(p.price)}</b></div>`).join('');
  const terms = ev.eventTerms.map(t => `<li>${esc(t.cs)}</li>`).join('');
  const op = site.operator;
  const html = `<!doctype html><html lang="cs"><head><meta charset="utf-8"><title>${esc(m.title.cs)} — KOGO Slovanský dům</title>
<style>
@font-face{font-family:G;src:url("file://${FONTS}Gotham-Book.otf");font-weight:400}
@font-face{font-family:G;src:url("file://${FONTS}Gotham-Medium.otf");font-weight:500}
@page{size:A4;margin:16mm 17mm 18mm}
*{box-sizing:border-box}
body{margin:0;font-family:G,Helvetica,Arial,sans-serif;color:#191512;font-size:9.6pt;line-height:1.5;-webkit-print-color-adjust:exact;print-color-adjust:exact}
header{display:flex;justify-content:space-between;align-items:flex-end;border-bottom:.6pt solid #8b7041;padding-bottom:9mm;margin-bottom:8mm}
header img{width:30mm}
.kick{font-weight:500;font-size:7pt;letter-spacing:.28em;text-transform:uppercase;color:#8b7041;margin:0 0 2mm}
h1{font-weight:400;font-size:26pt;line-height:1;margin:0;letter-spacing:-.01em}
.intro{color:#3d3630;max-width:120mm;margin:6mm 0 0}
.price{border:.6pt solid #e2dad0;background:#f4efe6;padding:4mm 6mm;margin:7mm 0 2mm}
.price .kick{color:#857b72}
.row{display:flex;justify-content:space-between;padding:1.6mm 0;border-top:.4pt solid #e2dad0}
.row:first-of-type{border-top:0}
.row b{font-weight:500;color:#8b7041;font-size:11pt}
.course{break-inside:avoid;margin-top:9mm}
.no{font-weight:500;font-size:7pt;letter-spacing:.28em;text-transform:uppercase;color:#8b7041;margin:0}
h2{font-weight:400;font-size:15pt;margin:1.5mm 0 4mm;padding-bottom:3mm;border-bottom:.4pt solid #e2dad0}
ul{list-style:none;margin:0;padding:0}
.course li{display:grid;grid-template-columns:5mm 1fr;align-items:start;padding:1.2mm 0;color:#3d3630}
.mk{line-height:0;padding-top:1.15mm}.mk svg{display:block}
.legend{display:flex;gap:2mm;align-items:center;color:#857b72;font-size:8pt;margin-top:8mm}
.terms{break-inside:avoid;margin-top:10mm;padding-top:6mm;border-top:.6pt solid #8b7041}
.terms ol{margin:3mm 0 0;padding-left:5mm;color:#3d3630}
.terms li{margin:1.4mm 0}
footer{margin-top:9mm;padding-top:4mm;border-top:.4pt solid #e2dad0;color:#857b72;font-size:7.6pt;display:flex;justify-content:space-between;gap:6mm}
</style></head><body>
<header><div><p class="kick">KOGO Slovanský dům · Oslavy &amp; eventy</p><h1>${esc(m.title.cs)}</h1></div><img src="file://${LOGO}" alt=""></header>
<p class="intro">${esc(m.intro.cs)}</p>
<div class="price"><p class="kick">Cena za osobu</p>${prices}</div>
${courses}
<p class="legend">${leaf} Vegetariánské jídlo · Z každého chodu vyberete 3–4 varianty.</p>
<div class="terms"><p class="kick">Podmínky spolupráce</p><ol>${terms}</ol></div>
<footer><span>${esc(site.contact.addressLine)} · slovanskydum@kogo.cz · +420 221 451 259</span><span>${esc(op.name)} · IČ ${op.ico}</span></footer>
</body></html>`;
  writeFileSync(`/private/tmp/claude-501/-Users-admin-web-maxing/ef3f32b5-7741-427c-a6a0-ea41e95aa60d/scratchpad/pdf/${m.slug}.html`, html);
  console.log('html:', m.slug, '| chodů', m.sections.length, '| veg', m.sections.flatMap(s=>s.dishes).filter(d=>d.veg).length);
}
