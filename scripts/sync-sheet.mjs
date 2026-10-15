// Stáhne Google tabulku s texty webu a zapíše src/data/overrides.json.
// Prázdná buňka = na webu zůstane původní text, takže tabulka web nerozbije.
//
//   node scripts/sync-sheet.mjs               – stáhne tabulku (id v sheet-config.json nebo SHEET_ID)
//   node scripts/sync-sheet.mjs --dir <složka> – načte místní CSV (<název listu>.csv), na zkoušku
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const cfg = JSON.parse(readFileSync(join(root, "scripts/sheet-config.json"), "utf8"));
const id = process.env.SHEET_ID || cfg.id;
const dirArg = process.argv.indexOf("--dir");
const dir = dirArg > 0 ? process.argv[dirArg + 1] : null;

function parseCsv(text) {
  const rows = [];
  let row = [], cell = "", q = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (q) {
      if (ch === '"' && text[i + 1] === '"') { cell += '"'; i++; }
      else if (ch === '"') q = false;
      else cell += ch;
    } else if (ch === '"') q = true;
    else if (ch === ",") { row.push(cell); cell = ""; }
    else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && text[i + 1] === "\n") i++;
      row.push(cell); rows.push(row); row = []; cell = "";
    } else cell += ch;
  }
  if (cell !== "" || row.length) { row.push(cell); rows.push(row); }
  return rows;
}

// Řádky listu jako objekty podle nadpisů sloupců (nadpisy se porovnávají jen podle začátku,
// takže drobná úprava nadpisu nevadí).
async function tab(name) {
  let text;
  if (dir) text = readFileSync(join(dir, `${name}.csv`), "utf8");
  else {
    // Export CSV listu podle názvu; headers=1 = první řádek jsou nadpisy.
    const url = `https://docs.google.com/spreadsheets/d/${id}/gviz/tq?tqx=out:csv&headers=1&sheet=${encodeURIComponent(name)}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`List „${name}“: HTTP ${res.status}`);
    text = await res.text();
  }
  const [head, ...rest] = parseCsv(text);
  const keys = head.map((h) => h.trim().toLowerCase());
  return rest
    .filter((r) => r.some((c) => c.trim() !== ""))
    .map((r) => (start) => {
      const i = keys.findIndex((k) => k.startsWith(start));
      return i < 0 ? "" : (r[i] ?? "").trim();
    });
}

const num = (s) => {
  const d = String(s).replace(/[^\d,.]/g, "").replace(",", ".");
  return d === "" ? null : Math.round(Number(d));
};

// 15. 11. 2026, 15.11.2026, 2026-11-15, 11/15/2026 (formát z anglického Google) → 2026-11-15
function isoDate(s) {
  let m = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
  if (m) return `${m[1]}-${m[2].padStart(2, "0")}-${m[3].padStart(2, "0")}`;
  m = s.match(/^(\d{1,2})\.\s*(\d{1,2})\.\s*(\d{4})/);
  if (m) return `${m[3]}-${m[2].padStart(2, "0")}-${m[1].padStart(2, "0")}`;
  m = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);
  if (m) return `${m[3]}-${m[1].padStart(2, "0")}-${m[2].padStart(2, "0")}`;
  return null;
}

if (!id && !dir) {
  console.log("Tabulka zatím není napojená (chybí id) – overrides.json beze změny.");
  process.exit(0);
}

const out = { texts: {}, values: {}, menu: null, calendar: null };
const warn = [];

for (const get of await tab(cfg.tabs.texts)) {
  const key = get("id"), cs = get("česky"), en = get("anglicky");
  if (!key || (!cs && !en)) continue;
  out.texts[key] = { ...(cs && { cs }), ...(en && { en }) };
}

for (const get of await tab(cfg.tabs.values)) {
  const key = get("id"), v = get("hodnota");
  if (key && v) out.values[key] = v;
}

// Jídelní lístek: nový řádek bez ID kategorie patří do kategorie řádku nad ním.
const menu = {};
let section = null;
for (const get of await tab(cfg.tabs.menu)) {
  section = get("id") || section;
  const name = get("název");
  if (!section || !name) continue;
  (menu[section] ||= []).push({ name, cs: get("popis č"), en: get("popis a"), price: num(get("cena")), allergens: get("alergeny") });
}
if (Object.keys(menu).length) out.menu = menu;

const cal = [];
for (const get of await tab(cfg.tabs.calendar)) {
  const raw = get("datum");
  if (/příklad/i.test(raw)) continue;
  const date = isoDate(raw);
  const titleCs = get("název č"), titleEn = get("název a");
  if (!date || !(titleCs || titleEn)) { warn.push(`Kalendář: řádek „${raw} ${titleCs}“ přeskočen (chybí datum nebo název)`); continue; }
  cal.push({
    date, ...(get("čas") && { time: get("čas") }),
    title: { cs: titleCs || titleEn, en: titleEn || titleCs },
    body: { cs: get("popis č") || get("popis a"), en: get("popis a") || get("popis č") },
    ...(get("odkaz") && { href: get("odkaz") }),
  });
}
out.calendar = cal;

writeFileSync(join(root, "src/data/overrides.json"), JSON.stringify(out, null, 2) + "\n");
console.log(`Texty ${Object.keys(out.texts).length}, hodnoty ${Object.keys(out.values).length}, jídla ${Object.values(menu).flat().length}, akce ${cal.length}`);
for (const w of warn) console.warn("⚠ " + w);
