# Strojírny Olšovec – prezentace pro MSV Brno 2026 (verze 2)

Prezentace pro dotykový LED panel na stánku. Běží **sama ve smyčce**, návštěvníci se na ni dívají.
**Dotyk obrazovky otevře kalkulačku návratnosti**; po nečinnosti (výchozí 90 s) nebo tlačítkem
„Zpět na prezentaci“ se kalkulačka zavře a prezentace pokračuje.

Bez internetu, bez instalace, bez serveru – stačí otevřít `index.html` v Edge nebo Chrome.

## Spuštění na panelu

1. Zkopírujte celou složku `Prezentace MSV 2026` do počítače, který panel pohání.
2. Poklepejte na **`Spustit prezentaci (kiosk).bat`** – otevře Edge/Chrome v kiosk režimu (celá obrazovka, bez lišt).
   Ukončení: `Alt + F4`.
3. Na místě: vypnout spořič obrazovky a uspávání displeje, vypnout aktualizace na dobu veletrhu,
   přidat `.bat` do složky *Po spuštění* (`shell:startup`).

## Pořadí prezentace (smyčka cca 5 minut)

Podle e-mailu klienta z 21. 9., bod 3:

| Kapitola | Snímky |
|---|---|
| Úvod | Logo, motto, firma v číslech |
| Historie | Časová osa 1902 → 2026 (z článku 2019) |
| Psali o nás | Úvodní snímek + 8 článků Technického magazínu 2016–2025 (hlavní body, střídající se fotky, stránka časopisu) |
| Energie a dotace | Letošní téma: FVE 90 → 300 kW, cíl 50 %, CO₂, 105 MWh; přehled projektů (OP TAK, RES+, NPO, TREND, DeepTech) |
| Tepelný motor | Princip a přednosti; cesta k sériové výrobě (prototyp s TU Liberec 2026–2029) |
| 4 kroky | Text „Závěr – 4 kroky“: problém zákazníka, animované schéma řešení, ekonomika, návratnost (cementárna, cihelna, BPS) |
| Kalkulačka | Výzva „Dotkněte se obrazovky a spočítejte si návratnost“ |

Na spodní liště je vidět, v které kapitole prezentace je, a stálá výzva k dotyku.

## Úprava obsahu

Veškeré texty, čísla a obrázky jsou v souboru **`assets/js/data.js`** (upravit v Poznámkovém bloku / VS Code, uložit, `F5`).

- `CONFIG` – délka snímku, zavření kalkulačky po nečinnosti, veletrh, stánek, **telefon a e-mail (DOPLNIT)**.
  Položky s textem DOPLNIT se na obrazovce nezobrazují.
- `SEQUENCE` – pořadí snímků; `k` = násobek základní délky snímku. Snímek odeberete smazáním řádku.
- `INTRO`, `HISTORY`, `ARTICLES`, `ENERGY`, `ENGINE`, `STEPS`, `CTA` – obsah snímků.
- `CALC_DEFAULTS` – účinnost, výkon a cena modulu, servis, příklady v kalkulačce.

## Servisní panel

V kalkulačce podržte prst **3 sekundy na logu vlevo nahoře**. Lze změnit: základní délku snímku,
dobu zavření kalkulačky, účinnost, výkon a cenu modulu, roční servis; tlačítko *Celá obrazovka*.
Hodnoty se ukládají do prohlížeče (localStorage); *Výchozí* je vrátí zpět.

Klávesnice (pokud je připojena): `←` / `→` předchozí / další snímek, `K` otevře kalkulačku, `Esc` ji zavře.

## Technické poznámky

- Čistý HTML/CSS/JS, žádné externí knihovny ani fonty – běží i bez internetu.
- Navrženo pro 16:9 na šířku (FullHD i 4K), funguje i na výšku.
- Fotografie jsou výřezy z PDF časopisu, AI upscalované na 2560 px. Originály od klienta budou lepší.
- Předchozí verze s menu (verze 1) je zálohovaná ve složce `_archiv/`.
