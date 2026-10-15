// -----------------------------------------------------------------------------
// Texty z Google tabulky.
//
// Klientka upravuje texty, ceny, jídelní lístek a kalendář akcí ve sdílené
// Google tabulce. Při sestavení webu je skript scripts/sync-sheet.mjs stáhne
// do overrides.json a tady se jimi přepíšou výchozí hodnoty z datových souborů.
//
// Pravidlo: prázdné pole v tabulce nic nemění — zůstane původní text. Překlep
// v tabulce tak nikdy nemůže web rozbít ani po sobě nechat prázdné místo.
// -----------------------------------------------------------------------------
import raw from "./overrides.json";

type Pair = { cs?: string; en?: string };
export type MenuItemOverride = { name: string; cs: string; en: string; price: number | null; allergens: string };
export type CalendarOverride = { date: string; time?: string; title: Pair; body: Pair; href?: string };

const data = raw as {
  texts: Record<string, Pair>;
  values: Record<string, string>;
  menu: Record<string, MenuItemOverride[]> | null;
  calendar: CalendarOverride[] | null;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function walk(root: any, path: string[]) {
  let cur = root;
  for (const p of path) {
    if (cur == null) return undefined;
    cur = cur[p];
  }
  return cur;
}

const filled = (s: unknown) => typeof s === "string" && s.trim() !== "";

/** Přepíše texty a hodnoty pod danou předponou (site / pages / events). */
export function applyOverrides(prefix: string, root: Record<string, unknown>) {
  const start = prefix + ".";
  for (const [key, val] of Object.entries(data.texts)) {
    if (!key.startsWith(start)) continue;
    const target = walk(root, key.slice(start.length).split("."));
    if (!target || typeof target !== "object") continue;
    if (filled(val.cs)) target.cs = val.cs!.trim();
    if (filled(val.en)) target.en = val.en!.trim();
  }
  for (const [key, val] of Object.entries(data.values)) {
    if (!key.startsWith(start) || !filled(val)) continue;
    const parts = key.slice(start.length).split(".");
    const last = parts.pop()!;
    const parent = walk(root, parts);
    if (parent && typeof parent === "object" && last in parent) {
      parent[last] = val.trim();
      // Změněné telefonní číslo musí změnit i odkaz pro vytáčení.
      if (last === "phone" && "phoneHref" in parent) parent.phoneHref = val.replace(/[^\d+]/g, "");
    }
  }
}

export const menuOverride = data.menu;
export const calendarOverride = data.calendar;
