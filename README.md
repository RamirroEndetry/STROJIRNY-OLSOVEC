# Strojírny Olšovec – prezentace pro MSV Brno 2026 (verze 3)

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

## Pořadí prezentace (smyčka cca 11 minut)

Podle e-mailu klienta z 21. 9., bod 3, doplněno podle připomínek z 29. 9.:

| Kapitola | Snímky |
|---|---|
| Úvod | Logo, motto, firma v číslech |
| Historie | Mluvené slovo + fotografie (připraveno, zapne se po dodání nahrávky – `STORY`), časová osa 1902 → 2026 |
| MSV Brno | Pravidelná účast od roku 1994 – fotografie stánku z různých ročníků |
| Certifikáty | EN ISO 9001, EN ISO 3834-2, EN 1090-1 EXC3 |
| Psali o nás | Úvodní snímek + články Technického magazínu 2016–2025, místo pro článek 2026 (`ready: true` po dodání) |
| Energie a dotace | Letošní téma: FVE 90 → 300 kW, cíl 50 %, CO₂, 105 MWh; přehled projektů (OP TAK, RES+, NPO, TREND, DeepTech) |
| Tepelný motor | Princip a přednosti; cesta k sériové výrobě (prototyp s TU Liberec 2026–2029) |
| 4 kroky | Text „Závěr – 4 kroky“: problém zákazníka, animované schéma řešení, ekonomika, návratnost (cementárna, cihelna, BPS) |
| Kalkulačka | Výzva „Dotkněte se obrazovky a spočítejte si návratnost“ |

Na spodní liště je vidět, v které kapitole prezentace je, a stálá výzva k dotyku.

## Délka snímků a přechody

Každý snímek trvá tak dlouho, aby šel dočíst celý text: délka = delší z hodnot *minimální délka × k* a
*počet slov / rychlost čtení* (`CONFIG.readingWpm`, výchozí 140 slov/min). Snímky i fotografie se plynule prolínají
(`fadeSeconds`, `photoFadeSeconds`). Délky všech snímků vypíše v konzoli prohlížeče `prezentace.casy()`.

## Hudba a mluvené slovo

- Hudbu (MP3) uložte do `assets/audio` jako `hudba-1.mp3`, `hudba-2.mp3` (seznam v `AUDIO.music` v data.js). Hraje dokola.
- Mluvené slovo k historii: `assets/audio/historie-mluvene-slovo.mp3`, fotky vypsat do `STORY.scenes`, `STORY.enabled: true`.
  Snímek trvá přesně jako nahrávka, hudba se během ní ztiší.
- **Hudba hraje hned po spuštění** přes `Spustit prezentaci (kiosk).bat` – prohlížeč běží s vlastním profilem
  a povoleným automatickým přehráváním (funguje, i když už Edge na počítači běží). Obě skladby se střídají stále dokola.
  Při otevření `index.html` jinak (nebo z GitHub Pages) prohlížeč zvuk zablokuje a hudba začne až po prvním dotyku.
- Pokud zvuk po startu PC ještě není připravený (HDMI audio), aplikace zkouší hudbu spustit znovu každé 3 s.
- Na místě zkontrolovat: výstup zvuku ve Windows nastavený na panel/reproduktor a hlasitost Windows.
- Chybějící zvukový soubor se tiše přeskočí – prezentace běží dál bez zvuku.

## Úprava obsahu

Veškeré texty, čísla a obrázky jsou v souboru **`assets/js/data.js`** (upravit v Poznámkovém bloku / VS Code, uložit, `F5`).

- `CONFIG` – délka snímku, zavření kalkulačky po nečinnosti, veletrh, stánek, **telefon a e-mail (DOPLNIT)**.
  Položky s textem DOPLNIT se na obrazovce nezobrazují.
- `SEQUENCE` – pořadí snímků; `k` = násobek základní délky snímku. Snímek odeberete smazáním řádku.
- `INTRO`, `STORY`, `HISTORY`, `MSV`, `CERTS`, `ARTICLES`, `ENERGY`, `ENGINE`, `STEPS`, `CTA` – obsah snímků.
- `AUDIO` – soubory a hlasitost hudby.
- `CALC_DEFAULTS` – účinnost, výkon a cena modulu, servis, příklady v kalkulačce.

## Servisní panel

V kalkulačce podržte prst **3 sekundy na logu vlevo nahoře**. Lze změnit: minimální délku snímku, rychlost čtení,
hlasitost hudby a mluveného slova, dobu zavření kalkulačky, účinnost, výkon a cenu modulu, roční servis; tlačítko *Celá obrazovka*.
Hodnoty se ukládají do prohlížeče (localStorage); *Výchozí* je vrátí zpět.

Klávesnice (pokud je připojena): `←` / `→` předchozí / další snímek, `K` otevře kalkulačku, `Esc` ji zavře.

## Technické poznámky

- Čistý HTML/CSS/JS, žádné externí knihovny ani fonty – běží i bez internetu.
- Navrženo pro 16:9 na šířku (FullHD i 4K), funguje i na výšku.
- Fotografie jsou výřezy z PDF časopisu, AI upscalované na 2560 px. Originály od klienta budou lepší.
- Předchozí verze s menu (verze 1) je zálohovaná ve složce `_archiv/`.
