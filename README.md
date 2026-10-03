# Strojírny Olšovec – prezentace pro MSV Brno 2026 (verze 5)

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

### Varianta: jeden soubor EXE

Ve složce `EXE` (o úroveň výš) je **`Strojirny Olsovec - prezentace MSV 2026.exe`** – celá prezentace v jednom souboru.
Po spuštění se rozbalí do `%LOCALAPPDATA%\StrojirnyOlsovec-kiosk` a otevře v Edge/Chrome v kiosk režimu se zvukem
(stejně jako `.bat`). Ukončení: `Alt + F4`. Po změně obsahu je potřeba EXE znovu sestavit: `python _exe-zdroj/sestavit.py`.
EXE není digitálně podepsaný – při prvním spuštění na jiném počítači může Windows SmartScreen zobrazit varování
(*Další informace → Přesto spustit*).

## Pořadí prezentace (smyčka cca 12 minut)

Podle e-mailu klienta z 21. 9. (bod 3), doplněno podle připomínek z 29. 9. a 30. 9.:

| Kapitola | Snímky |
|---|---|
| Historie | Vyprávění s fotografiemi (text klienta = mluvené slovo): 1902 kamenolom, 1992 privatizace, rozvoj areálu, 2008 lis ŽĎAS; časová osa 1902 → 2026 |
| MSV Brno | Pravidelná účast od roku 1994 – fotografie stánku z různých ročníků (vč. 2015 a 2019) |
| Certifikáty | EN ISO 9001, EN ISO 3834-2, EN 1090-1 EXC3 |
| O firmě | Fotovoltaika 290 kW, velké kusové zakázky, obchodní oddělení na statku Olšovec 37, pracovníci (Den otevřených dveří 2016) |
| Psali o nás | Údaje z původního úvodu (motto, firma v číslech, fotka na pozadí), přehled časopisů, články Technického magazínu 2016–2026 |
| Energie a dotace | Letošní téma: FVE, cíl 50 %, CO₂, 105 MWh; přehled projektů (OP TAK, RES+, NPO, Théta 2, DeepTech) |
| Tepelný motor | Princip a přednosti; cesta k sériové výrobě (prototyp s TU Liberec 2026–2029) |
| 4 kroky | Text „Závěr – 4 kroky“: problém zákazníka, animované schéma řešení, ekonomika, návratnost (cementárna, cihelna, BPS) |
| Kalkulačka | Výzva „Dotkněte se obrazovky a spočítejte si návratnost“ |
| Závěr | Fotka kolektivu na stánku + závěrečné mluvené slovo |

Na spodní liště je vidět, v které kapitole prezentace je, a stálá výzva k dotyku.

## Délka snímků a přechody

**Snímek s nahrávkou** trvá právě tak dlouho jako mluvené slovo (klient nechce tichá místa): délka nahrávky +
krátký náběh a doběh (`VOICE.delaySeconds`, `tailSeconds`), nejméně však tak, aby se vystřídaly všechny fotky
(`VOICE.minPhotoSeconds` na fotku). **Snímek bez nahrávky** trvá podle množství textu: delší z hodnot
*`slideSeconds` × k* a *počet slov / `readingWpm`*. Snímky i fotografie se plynule prolínají (`fadeSeconds`, `photoFadeSeconds`).
Délky všech snímků vypíše v konzoli prohlížeče `prezentace.casy()`.

## Mluvené slovo

Hudební podkres byl na přání klienta (30. 9.) odstraněn. Mluvené slovo je po snímcích:

- Nahrávky (MP3) se ukládají do **`assets/audio/slovo/`** pod názvem uvedeným u snímku v `SEQUENCE` (`audio: …`),
  např. `01-historie-1902.mp3`. Seznam souborů a texty k namluvení jsou v `Text pro namluvení.md` (o složku výš).
- Snímek s nahrávkou se automaticky prodlouží na její délku; během přehrávání svítí u textu ukazatel „Mluvené slovo“.
- Namluveno AI hlasem „Sterling“ (ElevenLabs, 30. 9. 2026). Namlouvaný text se na přání klienta **nezobrazuje** –
  snímky s vyprávěním ukazují jen fotky přes celou obrazovku s krátkým popiskem; text je v data.js jen jako `say`.
- Chybějící nahrávka se tiše přeskočí – snímek pak běží podle minimální délky.
- Zvuk se přehraje hned po spuštění přes `Spustit prezentaci (kiosk).bat` (vlastní profil prohlížeče s povoleným
  automatickým přehráváním). Při otevření `index.html` jinak prohlížeč zvuk bez dotyku zablokuje.
- Na místě zkontrolovat: výstup zvuku ve Windows nastavený na panel/reproduktor a hlasitost Windows.
- Při otevření kalkulačky se mluvené slovo zastaví.

## Úprava obsahu

Veškeré texty, čísla a obrázky jsou v souboru **`assets/js/data.js`** (upravit v Poznámkovém bloku / VS Code, uložit, `F5`).

- `CONFIG` – délka snímku, zavření kalkulačky po nečinnosti, veletrh, stánek, **telefon a e-mail (DOPLNIT)**.
  Položky s textem DOPLNIT se na obrazovce nezobrazují.
- `SEQUENCE` – pořadí snímků; `k` = násobek základní délky snímku. Snímek odeberete smazáním řádku.
- `TALES` – vyprávění s fotografiemi (text klienta, fotky, režim zobrazení fotky `fit` / `cover` / `print`).
- `INTRO`, `HISTORY`, `MSV`, `CERTS`, `ARTICLES`, `ENERGY`, `ENGINE`, `STEPS`, `CTA` – obsah snímků.
- `VOICE` – složka a hlasitost mluveného slova.
- `CALC_DEFAULTS` – účinnost, výkon a cena modulu, servis, příklady v kalkulačce.

## Servisní panel

V kalkulačce podržte prst **3 sekundy na logu vlevo nahoře**. Lze změnit: minimální délku snímku, rychlost čtení,
hlasitost mluveného slova, dobu zavření kalkulačky, účinnost, výkon a cenu modulu, roční servis; tlačítko *Celá obrazovka*.
Hodnoty se ukládají do prohlížeče (localStorage); *Výchozí* je vrátí zpět.

Klávesnice (pokud je připojena): `←` / `→` předchozí / další snímek, `K` otevře kalkulačku, `Esc` ji zavře.

## Technické poznámky

- Čistý HTML/CSS/JS, žádné externí knihovny ani fonty – běží i bez internetu.
- Navrženo pro 16:9 na šířku (FullHD i 4K), funguje i na výšku.
- Fotografie k článkům jsou výřezy z PDF časopisu, AI upscalované na 2560 px. Fotky od klienta (30. 9.) jsou v původní podobě,
  velké jen zmenšené na max. 2560 px; malé staré fotky se zobrazují v bílém rámečku jako tištěná fotka.
- Hudba z verze 3 je zálohovaná v `_archiv/hudba-odstranena-2026-09-30/`.
- Předchozí verze s menu (verze 1) je zálohovaná ve složce `_archiv/`.
