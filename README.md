# Strojírny Olšovec – dotyková prezentace pro MSV Brno 2026

Samostatná webová aplikace pro dotykový LED panel (bez internetu, bez instalace, bez serveru).
Stačí otevřít `index.html` v prohlížeči Edge nebo Chrome.

## Spuštění na panelu

1. Zkopírujte celou složku `Prezentace MSV 2026` do počítače, který panel pohání.
2. Poklepejte na **`Spustit prezentaci (kiosk).bat`** – otevře Edge/Chrome v kiosk režimu (celá obrazovka, bez lišt).
   Ukončení: `Alt + F4`.
3. Doporučené nastavení Windows na místě: vypnout spořič obrazovky a uspávání displeje,
   vypnout aktualizace na dobu veletrhu, přidat `.bat` do složky *Po spuštění* (`shell:startup`), aby se prezentace spustila sama po zapnutí.

Funguje na šířku (16:9) i na výšku (9:16) – rozvržení se přizpůsobí automaticky. Vše se škáluje podle velikosti obrazovky (FullHD i 4K).

## Co aplikace obsahuje

| Režim | Popis |
|---|---|
| **Informační smyčka** | Po startu a po nečinnosti se automaticky přehrávají snímky (fotky s pomalým přiblížením, čítače, výzva „Dotkněte se obrazovky“). |
| **Domů** | Hero + 8 dlaždic do sekcí. |
| **Historie** | Interaktivní časová osa 1902–2026 (z článků Technického magazínu). |
| **Psali o nás** | Články 2016–2025: shrnutí v bodech, fotografie, stránky časopisu k zvětšení. |
| **Co umíme** | Čísla firmy, obrábění, svařování, unikátní technologie, reference, galerie. |
| **Energie a dotace** | Vývoj FVE 90 → 300 kW, cíl 50 % soběstačnosti, CO₂ srovnání, přehled dotačních titulů (OP TAK, RES+, NPO, TREND, DeepTech). |
| **Tepelný motor** | Princip, přednosti, plán vývoje 2024 → 2026–2029 (TU Liberec), fotky prototypu a 3D modelu. |
| **4 kroky** | Text klienta „Závěr – 4 kroky“: 1 Problém (animovaný komín + počítadlo Kč), 2 Barevné animované schéma řešení, 3 Ekonomika, 4 Návratnost (cementárna, cihelna, BPS). |
| **Kalkulačka** | Dotyková kalkulačka návratnosti (rychlá i technická z průtoku média), numerická klávesnice na obrazovce, graf kumulovaného efektu, demo případy. |
| **Kontakt** | Adresa, web, stánek na MSV. |

## Úprava obsahu

Veškeré texty, čísla a odkazy na obrázky jsou v jednom souboru: **`assets/js/data.js`**.
Otevřete ho v Poznámkovém bloku / VS Code, upravte a uložte – po obnovení stránky (`F5`) se změny projeví.

- `CONFIG` – název veletrhu, termín, stánek, web, **telefon a e-mail (DOPLNIT)**, doba nečinnosti, délka snímku.
- `LOOP_SLIDES` – snímky úvodní smyčky.
- `TIMELINE` – časová osa.
- `ARTICLES` – články „Psali o nás“.
- `CAPABILITIES`, `ENERGY`, `ENGINE`, `STEPS` – obsah sekcí.
- `CALC_DEFAULTS` – účinnost, výkon a cena modulu, servis, demo případy kalkulačky.

Obrázky jsou ve složce `assets/img/` (fotky) a `assets/img/pages/` (stránky časopisu). Novou fotku stačí nakopírovat a odkázat na ni v `data.js`.

## Servisní panel (pro obsluhu na stánku)

Podržte prst **3 sekundy na logu vlevo nahoře**. Otevře se panel, kde lze bez editace souborů změnit:
dobu návratu do smyčky, délku snímku, účinnost, výkon a cenu modulu, roční servis. Je zde i tlačítko *Celá obrazovka*.
Hodnoty se ukládají do prohlížeče (localStorage); *Výchozí* je vrátí zpět.

Klávesové zkratky (pokud je připojena klávesnice): `Esc` zavře okno / klávesnici, `Ctrl + L` spustí smyčku ihned.

## Technické poznámky

- Čistý HTML/CSS/JS, žádné externí knihovny ani fonty – běží i bez internetu.
- Písmo: Segoe UI (Windows), náhradně Roboto/Arial.
- Testováno v Chromium (Edge/Chrome) při 1920×1080 a 1080×1920.
- Fotografie byly vyříznuté z PDF časopisu a následně AI upscalované na 2560 px (24. 9. 2026). Původní nízkorozlišené verze jsou v `assets/img/_original-lowres/` (aplikace je nepoužívá, lze smazat). Originály od klienta budou stále lepší, zejména u detailů.
