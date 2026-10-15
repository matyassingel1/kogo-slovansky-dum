# KOGO Slovanský dům — web (návrh)

Návrh nového webu pro restauraci **KOGO Slovanský dům** (Na Příkopě 22, Praha 1).
Design koncept **„Zlatý řez"** — bílé plátno, velké fotografie, zlaté vlasové akcenty
(#8B7041), písmo **Gotham**. Inspirace jimbochoden.com (jednoduchost, minimum textu).

Stavěno jako **čistý statický základ**, který se později přenese do **WordPressu**.

## Stack

Next.js 16 (App Router, statický export) · TypeScript · Tailwind v4 · Framer/GSAP-ready +
Lenis smooth scroll · React Hook Form + Zod · lokální Gotham přes `next/font/local`.

## Spuštění

```bash
nvm use --lts        # nebo mít Node 20+
npm install
npm run dev          # http://localhost:3000
npm run build        # statický export do out/
```

## Struktura stránek

| Route | Obsah |
|---|---|
| `/` | Hero (foto, slot pro video) → Filozofie teaser → Z kuchyně → Šéfkuchař → Menu teaser → Wine bar → Mapa → Rezervace CTA |
| `/menu` | 115 jídel, 16 sekcí, sticky navigace + scroll-spy, alergeny |
| `/filozofie` | „Náš přístup" (místo O nás) — hodnoty, galerie |
| `/sefkuchar` | Jovo Savić — příběh, citace, ocenění |
| `/wine-bar` | prezentace wine baru + „Kogo No. 25 Sour" |
| `/kontakt` | otevírací doba, adresa, sítě, mapa přes celou šířku + info karta |
| `/rezervace` | formulář (zatím bez backendu) + telefon |

## Funkce z briefu

- ✅ Výrazné CTA (Rezervovat stůl / Prohlédnout menu)
- ✅ Velké fotografie, velké okraje, minimum textu, bílá dominuje
- ✅ **Mobilní design jako priorita** + rychlost (statický export, optimalizované fotky)
- ✅ Menu jako **text** (ne obrázek), rozdělené do sekcí → později Excel/CMS
- ✅ Mapa s trasou (kombinace obou variant: full-width mapa + info karta)
- ✅ Šéfkuchař, Filozofie (místo „O nás")
- ✅ Footer: sítě, © 2026, kontakt
- ✅ **Pop-up okno** (`src/components/Popup.tsx`), **rotující banner** (`Banner.tsx`)
- ✅ Wine bar prezentace
- ✅ **CZ + EN** (přepínač, `src/lib/lang.tsx`)

## Obsah = data soubory (kvůli WordPressu)

Veškerý text/menu je v `src/data/menu.ts` a `src/data/site.ts` (dvojjazyčně). Při migraci
do WordPressu se z nich stanou pole (ACF) / custom post types — komponenty jsou psané
sémanticky a mapovatelné 1:1 na WP šablony.

## Otevřené body k potvrzení s klientkou

1. **E-mail** restaurace (`site.ts` → `contact.email`) — nyní placeholder `slovanskydum@kogo.cz`.
2. **Přesná otevírací doba** (uvedeno Po–Pá 9–23, So–Ne 10–23 — ověřit).
3. **Rezervační systém** — formulář teď neodesílá; napojit na jejich systém.
4. **Profi fotky / hero video** — nahradit dočasné fotky z webu/IG.
5. **Bio šéfkuchaře & filozofie** — texty jsou návrh, ke schválení/doplnění.

Viz [ASSETS.md](./ASSETS.md) pro katalog obrázků (co je co, kde se používá).
