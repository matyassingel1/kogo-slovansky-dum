# KOGO Slovanský dům — katalog assetů

Přehled všech obrázků/fontů/loga: **název souboru → zdroj → kde se na webu používá**.
Všechny fotky pocházejí z klientových vlastních zdrojů (současný web `kogo-slovanskydum.cz`
+ jeho Instagram `@kogo_slovansky_dum`). Optimalizováno pro web (JPG, ~1500–2400 px).

> ⚠️ **Doporučení:** hero a klíčové sekce ideálně nahradit profesionálním focením /
> videem (klientka sama zmiňuje „budeme potřebovat profesionální fotografie"). Tyhle
> slouží jako plnohodnotný, ale dočasný základ.

## Logo & fonty (`public/images/brand/`, `src/fonts/`)

| Soubor | Zdroj | Použití |
|---|---|---|
| `logo-kogo-sd.png` | příloha `logo_sd/` (zlaté logo) | zdroj, ořezaná varianta |
| `logo-kogo-sd-white.png` | odvozeno | **footer** (tmavé pozadí) |
| `logo-kogo-sd-gold.png` | odvozeno | favicon / světlé pozadí |
| `Gotham-Book/Medium/Bold.otf` | příloha (Gotham) | **celý web** (písmo přes `next/font/local`) |
| Wordmark „KOGO / SLOVANSKÝ DŮM" | text (Gotham) | **header** (čistý textový lockup dle loga) |

## Interiér (`public/images/interior/`)

| Soubor | Co je na fotce | Kde se používá |
|---|---|---|
| `interier-hlavni.jpg` | hlavní sál se světlíkem | **Hero homepage** (slot pro budoucí video) |
| `interier-sal.jpg` | prostřený sál | pop-up okno, hero Filozofie |
| `interier-sal-2.jpg` | sál, červené akcenty | vizuál stránky Rezervace |
| `interier-jamon.jpg` | interiér s jamón stanicí | hero stránky Šéfkuchař |
| `interier-detail.jpg` | detail stolu / sklenky | galerie Filozofie |
| `interier-sklo.jpg` | prosklený sál | rezerva |
| `interier-lounge.jpg` | lounge s polštářem KOGO | rezerva |

## Jídlo (`public/images/food/`)

| Soubor | Co je na fotce | Kde se používá |
|---|---|---|
| `rizoto-chrest-krevety.jpg` | rizoto s chřestem a krevetami | homepage „Z kuchyně" (Rizota) |
| `tunak-tataki.jpg` | tuňák tataki se sezamem | homepage (Ryby), **hero Menu** |
| `chrest-hollandaise.jpg` | chřest s hollandaise | homepage intro + „Sezónní chody" |
| `jamon-serrano.jpg` | Jamón Serrano se sklenkou | homepage (Předkrmy) |
| `chrest.jpg` | čerstvý chřest | galerie Filozofie |

## Wine bar (`public/images/winebar/`)

| Soubor | Co je na fotce | Kde se používá |
|---|---|---|
| `wine-bar-pult.jpg` | barový pult s lahvemi | homepage wine bar teaser, **hero Wine bar** |
| `koktejl-kogo-25-sour.jpg` | koktejl „Kogo No. 25 Sour" | signature karta (homepage + Wine bar) |
| `wine-bar-1/2/3/4.jpg` | prostory wine baru | galerie Wine bar |

## Šéfkuchař & ocenění (`public/images/chef/`, `public/images/brand/`)

| Soubor | Co je na fotce | Kde se používá |
|---|---|---|
| `chef/sefkuchar-jovo-savic.jpg` | Jovo Savić v restauraci | homepage teaser, **hero/foto Šéfkuchař** |
| `brand/oceneni-nejlepsi-restaurace-2026.jpg` | odznak „Nejlepší restaurace 2026" | sekce Ocenění (Šéfkuchař) |

## Terasa (`public/images/terrace/`)

| Soubor | Co je na fotce | Kde se používá |
|---|---|---|
| `terasa.jpg`, `terasa-2/3/4.jpg` | venkovní terasa s slunečníky | galerie Filozofie |
| `terasa-zahrada.jpg` | terasa v zeleni | hero stránky Kontakt |

## Data (obsah pro pozdější WordPress/CMS)

| Soubor | Obsah |
|---|---|
| `src/data/menu.ts` | **115 jídel** v 16 sekcích (IT název, CZ+EN popis, cena, alergeny) — scrapnuto z webu |
| `src/data/site.ts` | brand, kontakt, otevírací doba, šéfkuchař, filozofie, wine bar, bannery, pop-up (CZ+EN) |
