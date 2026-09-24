/* =====================================================================
   OBSAH PREZENTACE – Strojírny Olšovec s.r.o. – MSV Brno 2026
   Tento soubor je jediné místo, kde se mění texty, čísla a obrázky.
   Zdroje: články Technický magazín 2016–2025, text „Závěr – 4 kroky“,
   kalkulačka od klienta. Položky označené DOPLNIT čekají na klienta.
   ===================================================================== */

const CONFIG = {
  idleSeconds: 120,          // po kolika sekundách nečinnosti se vrátí smyčka
  loopSlideSeconds: 9,       // délka jednoho snímku smyčky
  fairName: "MSV Brno 2026",
  fairDates: "6.–9. 10. 2026",
  stand: "volná plocha u pavilonu G1",
  web: "www.strojirny.com",
  phone: "DOPLNIT telefon",
  email: "DOPLNIT e-mail",
  address: "Olšovec, okres Přerov (u Hranic)",
  director: "Ing. Pavel Stupárek, jednatel",
};

/* ---------- ÚVODNÍ SMYČKA (bezobslužné přehrávání) ---------- */
const LOOP_SLIDES = [
  {
    img: "assets/img/2023-misic-preprava.jpg",
    kicker: "Rodinná firma z Olšovce u Hranic",
    title: "„Zvládneme vyrobit téměř vše!“",
    sub: "Zakázková strojírenská výroba od roku 1993 · na MSV Brno každý rok od roku 1994",
    logo: true,
  },
  {
    img: "assets/img/2019-mlyn.jpg",
    kicker: "Poctivá strojařina z Olšovce",
    title: "Od obrábění po špičkové svařování",
    stats: [
      { v: 10000, suffix: " m²", label: "vlastní výrobní areál" },
      { v: 50, prefix: "≈ ", label: "kvalifikovaných zaměstnanců" },
      { v: 10, suffix: " t", label: "nosnost jeřábu · svařence do 10 000 kg" },
    ],
  },
  {
    img: "assets/img/2025-svarovani-prstenec.jpg",
    kicker: "Certifikovaní profesionálové",
    title: "Svařování podle ČSN EN ISO 3834-2 a EN 1090-1 / EXC2",
    sub: "Desítky schválených postupů WPQR (TÜV SÜD) · MIG-131 · MAG-135 · TIG-141 · Hardox, S690QL, nerez, měď, hliník",
  },
  {
    img: "assets/img/2022-svarence-mlyny.jpg",
    kicker: "Náročné zakázky jsou vítanou výzvou",
    title: "Referenční dodávky pro Siemens, STM De Ruijter, Paul Wurth…",
    sub: "Svařence tryskových mlýnů · difuzory plynových turbín · lanové bubny · míchací zařízení · armatury DN550",
  },
  {
    img: "assets/img/2016-areal.jpg",
    kicker: "Energie a udržitelnost",
    title: "Cíl: polovinu elektřiny si vyrobíme sami",
    stats: [
      { v: 300, suffix: " kW", label: "fotovoltaika po dokončení RES+" },
      { v: 105, suffix: " MWh", label: "roční úspora primární energie (OP TAK)" },
      { v: 20, prefix: "−", suffix: " %", label: "uhlíková stopa již dnes" },
    ],
  },
  {
    img: "assets/img/2024-motor-prototyp.jpg",
    kicker: "Vlastní vývoj · 2026–2029 s Technickou univerzitou v Liberci",
    title: "Vyvíjíme unikátní tepelný plynový motor",
    sub: "Uzavřený termodynamický cyklus s vnější dodávkou tepla · využije odpadní teplo už od cca 100 °C · tichý chod bez vibrací",
  },
  {
    img: "assets/img/2025-motor-3d-model.jpg",
    kicker: "Kolik vám může vydělat odpadní teplo?",
    title: "1 MW tepla → 100 kW elektřiny → 350 Kč každou hodinu",
    sub: "Dotkněte se obrazovky a spočítejte si návratnost pro váš provoz",
    cta: true,
  },
];

/* ---------- HISTORIE – časová osa ---------- */
const TIMELINE = [
  { y: 1902, t: "Žádost o otevření kamenolomu", d: "Augustin Janečka, stavitel z Hranic, podává žádost o povolení k otevření kamenolomu na pronajatých pozemcích v katastru obce Olšovec. Zde začíná příběh dnešního areálu.", img: "assets/img/2016-areal.jpg" },
  { y: 1919, t: "Lom přebírá Zemský moravský výbor v Brně", d: "Kamenolom se stává významným dodavatelem kamene pro moravské silnice." },
  { y: 1923, t: "Elektřina místo páry", d: "Lom získává povolení k pohonu elektřinou namísto parního pohonu a zaměstnává 122 pracovníků." },
  { y: 1928, t: "Velký rozvoj lomu", d: "V letech 1927–1928 velké investice do strojního zařízení a modernizace. Obrat 2 mil. Kč, dodávky materiálu do 28 silničních okresů na Moravě." },
  { y: 1931, t: "Stavba „dolní budovy“", d: "Zemský úřad posílá do lomu 37 trestanců z donucovací pracovny v Brně; ti si staví budovu u cesty do Stříteže nad Ludinou – tzv. dolní budovu, dnes nejstarší část společnosti." },
  { y: 1948, t: "Lom přechází pod státní správu", d: "Dolní budova slouží jako opravárenské dílny pro lomy na severní Moravě (provozovna č. 923 Severomoravského průmyslu kamene Jeseník). V roce 1961 zde pracuje 27 lidí, výroba 5,6 mil. Kč." },
  { y: 1964, t: "Lom uzavřen, provoz pokračuje", d: "Kvůli zhoršující se kvalitě kamene je lom uzavřen. Provozovna úspěšně pokračuje jako odborný opravárenský závod, později v rámci n. p. Olomoucké štěrkovny a pískovny." },
  { y: 1992, t: "Koupě provozovny současným majitelem", d: "Ve velké privatizaci formou veřejné soutěže kupuje provozovnu společnost nynějšího majitele. Účetní hodnota 2,2 mil. Kč, 25 zaměstnanců." },
  { y: 1993, t: "Vznik Strojíren Olšovec", d: "Zahájení zakázkové strojírenské výroby – obrábění, zámečnictví, výroba strojů a svařenců.", img: "assets/img/2016-dilna.jpg" },
  { y: 1994, t: "Poprvé na MSV Brno", d: "Od té doby firmu najdete každý rok na stejném místě – na volné ploše vedle pavilonu G1." },
  { y: 2000, t: "STROJÍRNY OLŠOVEC s.r.o.", d: "Změna názvu společnosti. Obrat 54,2 mil. Kč. Následují investice do výrobních prostor, strojů a lidí." },
  { y: 2010, t: "Stabilní i po krizi · první fotovoltaika", d: "Rok po celosvětové krizi obrat 77,2 mil. Kč. Na střechách hal vzniká FVE o výkonu 90 kW – firma začíná vyrábět vlastní elektřinu.", img: "assets/img/2016-areal.jpg" },
  { y: 2014, t: "Horizontka HCB 110 CNC", d: "Nové pracoviště s horizontálním vyvrtávacím strojem HCB 110 CNC (TDZ Turn) a mostovým jeřábem GIGA 5 t. O dva roky dříve přibyl CNC karusel Honor Seiki VL-125VM.", img: "assets/img/2022-hcb110.jpg" },
  { y: 2015, t: "Rekordní obrat 109,4 mil. Kč", d: "Certifikace EN 1090-1 / EXC2. Strojní park rozšiřují CNC soustruhy Samsung PL45LY a PL45XLM pro přesné rotační součásti.", img: "assets/img/2022-pl45ly.jpg" },
  { y: 2017, t: "Accuway UM-210", d: "Těžké CNC vertikální obráběcí centrum UM-210 (X/Y/Z 2100 × 1000 × 850 mm) pořízené s podporou fondů EU.", img: "assets/img/2017-um210.jpg" },
  { y: 2018, t: "Čtvrtstoletí · Quaser HX-635", d: "CNC horizontální dvoupaletové obráběcí centrum Quaser HX-635 SP s řízením Heidenhain TNC 640, přesnost polohování 0,004 mm.", img: "assets/img/2019-hx635b.jpg" },
  { y: 2020, t: "Nové technologie i v pandemii", d: "Tryskač, nové postupy svařování WPQR pro výrobce vodních turbín, vibrační odstranění zbytkového napětí místo žíhání. Výroba běží bez přerušení a bez státní podpory.", img: "assets/img/2022-ramy-siemens.jpg" },
  { y: 2021, t: "Projekt TREND – výzkum a vývoj", d: "Trojstranná spolupráce s Prefou Brno a Výzkumným ústavem stavebních hmot: zkušební linka pro jemné mletí teplárenské strusky jako náhrady cementu." },
  { y: 2022, t: "Klíčový zákazník z Německa", d: "Obráběné svařence pro tryskové mlýny s fluidním ložem – obrat s tímto zákazníkem roste šestinásobně. Spolu se Siemens patří k největším zákazníkům.", img: "assets/img/2022-svarence-mlyny.jpg" },
  { y: 2023, t: "30 let firmy · FVE +50 kW", d: "Další fotovoltaika 50 kW s podporou NPO – Čistší zdroje energie. Uhlíková stopa nižší o cca 20 %. Rozšíření svařovacích kvalifikací o hliníkové slitiny.", img: "assets/img/2023-misic-preprava.jpg" },
  { y: 2024, t: "Tepelný plynový motor – první etapa", d: "Vývojové oddělení dokončuje první etapu vývoje revolučního tepelného motoru. Podána česká patentová přihláška, žádost o dotaci Proof of concept.", img: "assets/img/2024-motor-prototyp.jpg" },
  { y: 2025, t: "Hydrostatický izotermický stroj · RES+ · DeepTech", d: "Nová konstrukce rotačního stroje pro výkony v řádu MW. Dotace RES+ č. 1/2024 na FVE 150 kW, Úspory energie II a Aplikace DeepTech na prototyp motoru s Technickou univerzitou v Liberci.", img: "assets/img/2025-motor-3d-model.jpg" },
  { y: 2026, t: "MSV 2026 · start vývoje prototypu 2026–2029", d: "Dokončujeme projekty OP TAK Úspory energií a RES+ (FVE až 300 kW). S Technickou univerzitou v Liberci pracujeme na prototypu plynového tepelného motoru.", img: "assets/img/2025-svarovani-prstenec.jpg" },
];

/* ---------- PSALI O NÁS – Technický magazín 2016–2025 ---------- */
const ARTICLES = [
  {
    y: 2016, title: "„Zvládneme vyrobit téměř vše!“ zní motto Strojírny Olšovec",
    src: "TechMagazín, říjen 2016, str. 36", pages: ["assets/img/pages/2016-1.jpg"],
    photos: ["assets/img/2016-dilna.jpg", "assets/img/2016-mlyn.jpg", "assets/img/2016-buben-preprava.jpg", "assets/img/2016-areal.jpg"],
    points: [
      "23 let na trhu, 48 vysoce kvalifikovaných zaměstnanců, areál cca 10 000 m²",
      "Dva provozy: obrobna (jeřáb 8 t) a zámečna pro rozměrné stroje a svařence (jeřáb 10 t)",
      "Zakružovací lis: za studena plechy tloušťky 30–100 mm, Ø 300–3000 mm",
      "Rekordní obrat 2015: 109,4 mil. Kč · ISO 9001, EN ISO 3834-3, EN 1090-1 / EXC2",
      "Den otevřených dveří k 500 letům od první písemné zmínky o obci Olšovec",
    ],
  },
  {
    y: 2017, title: "Horká novinka: CNC vertikální centrum Accuway UM 210",
    src: "TechMagazín, říjen 2017, str. 32 (téma MSV – Průmysl 4.0)", pages: ["assets/img/pages/2017-1.jpg"],
    photos: ["assets/img/2017-um210.jpg", "assets/img/2017-kolo.jpg", "assets/img/2017-modre-dily.jpg", "assets/img/2017-rotor.jpg"],
    points: [
      "Nové pracoviště s těžkým CNC vertikálním centrem UM 210 (X/Y/Z 2100 × 1000 × 850 mm) – pořízeno s podporou fondů EU",
      "Vysoká tuhost díky kombinaci lineárních a kluzných vedení",
      "Výroba i podle vlastní dokumentace, svařence a stroje běžně do 10 000 kg, po dohodě i více",
      "Obraty kolem 100 mil. Kč v posledních letech",
    ],
  },
  {
    y: 2018, title: "Čtvrtstoletí zakázkové výroby · středisko pro vědu a výzkum",
    src: "TechMagazín, září 2018, str. 49 (téma MSV Brno 2018)", pages: ["assets/img/pages/2018-1.jpg"],
    photos: ["assets/img/2018-hx635.jpg", "assets/img/2018-dily1.jpg", "assets/img/2018-dily3.jpg", "assets/img/2018-dily4.jpg"],
    points: [
      "25 let na trhu · záměr vybudovat vlastní středisko pro vědu a výzkum",
      "Nové CNC horizontální dvoupaletové centrum Quaser HX635 SP, Heidenhain TNC 640",
      "Pojezdy 1000 / 800 / 900 mm, plynule otočný stůl, vřeteno 6000 ot/min",
      "Přesnost polohování 0,004 mm, polohování stolu 0,001°",
    ],
  },
  {
    y: 2019, title: "Poctivá strojařina z Olšovce",
    src: "TechMagazín 10/2019, str. 70–71", pages: ["assets/img/pages/2019-1.jpg", "assets/img/pages/2019-2.jpg"],
    photos: ["assets/img/2019-mlyn.jpg", "assets/img/2019-obrabeni.jpg", "assets/img/2019-hx635b.jpg", "assets/img/2019-jednaci-mistnost.jpg"],
    points: [
      "Historie sahá do roku 1902 – žádost stavitele Augustina Janečky o otevření kamenolomu",
      "Obrábíme od desítek kilogramů po součásti o hmotnosti několika tun",
      "Vlastní konstrukční oddělení: stroje i kompletní technologické linky včetně technologie",
      "Přehled investic 2012–2018: VL-125VM, HCB 110 CNC, Samsung PL45LY / PL45XLM, Accuway UM-210, Quaser HX-635",
      "Obchodní jednání v netradičním prostředí statku s vlastním sklípkem",
    ],
  },
  {
    y: 2022, title: "Kritický čas přestáli i bez dotací",
    src: "TechMagazín 10/2022, str. 56–57", pages: ["assets/img/pages/2022-1.jpg", "assets/img/pages/2022-2.jpg"],
    photos: ["assets/img/2022-svarence-mlyny.jpg", "assets/img/2022-hcb110.jpg", "assets/img/2022-pl45ly.jpg", "assets/img/2022-ramy-siemens.jpg"],
    points: [
      "Pandemii firma zvládla vlastními silami – bez přerušení výroby, bez home office, bez státní podpory",
      "Cíle 2019–2021: úspory energií, nová kompresorovna, tryskač, kamerový systém, WPQR pro vodní turbíny",
      "Vibrační odstranění zbytkového napětí místo žíhání – úspora nákladů na kooperace",
      "Projekt TREND s Prefou Brno a VÚSH: jemné mletí teplárenské strusky",
      "Záměr rozšířit FVE ze 100 kW na 300 kW – 50% soběstačnost v elektřině",
      "Svařence tryskových mlýnů pro německého zákazníka · základové rámy turbín pro Siemens",
    ],
  },
  {
    y: 2023, title: "Mistři strojaři olšovečtí",
    src: "TechMagazín 10/2023, str. 40–41", pages: ["assets/img/pages/2023-1.jpg", "assets/img/pages/2023-2.jpg"],
    photos: ["assets/img/2023-misic-preprava.jpg", "assets/img/2023-misic-rtm.jpg", "assets/img/2023-frezovani.jpg", "assets/img/2023-svarovani.jpg"],
    points: [
      "Dílce mlýnů pro jemné mletí surovin do baterií – obrat s německým zákazníkem 6× vyšší",
      "Vlastní elektřina: FVE 90 kW od roku 2010, letos +50 kW s podporou NPO – Čistší zdroje energie",
      "1 MWh z fosilních paliv = 430 kg CO₂, z fotovoltaiky jen 50 kg CO₂",
      "Spotřeba cca 635 MWh/rok, z toho 130 MWh z vlastní FVE → uhlíková stopa nižší o cca 20 %",
      "Svařování dle ČSN EN ISO 3834-2, EN 1090-1 / EXC2, svářeči se státní zkouškou ISO 9606, NDT dozor level 2",
      "Desítky WPQR (TÜV SÜD): MAG-135 pro S355, Hardox 450, S690QL, P355NL, S460NL, nerez 1.4301/1.4571/1.4828; TIG-141; MIG-131 pro CuZn10; nově hliník EN AW-5083",
    ],
  },
  {
    y: 2024, title: "Olšovečtí strojaři vyvíjejí unikátní motor",
    src: "TechMagazín 9/2024, str. 32–33", pages: ["assets/img/pages/2024-1.jpg", "assets/img/pages/2024-2.jpg"],
    photos: ["assets/img/2024-motor-prototyp.jpg", "assets/img/2024-lanove-bubny.jpg", "assets/img/2024-nadoba.jpg", "assets/img/2024-skruze.jpg"],
    points: [
      "30. výročí založení firmy",
      "OP TAK Úspory energií: stavební úpravy výrobních prostor ušetří 105 MWh primární energie ročně (cca 15 % spotřeby)",
      "Žádost RES na FVE 150 kW – cíl 50% energetické soběstačnosti",
      "Dokončena první etapa vývoje tepelného plynového motoru: uzavřený cyklus s vnější dodávkou tepla, pracovní látkou reálný plyn",
      "Využije teplo od cca 100 °C – odpadní teplo, slunce, geotermální zdroje; tichý chod bez vibrací, vysoká životnost",
      "Podána česká patentová přihláška, žádost Proof of concept na prototyp 50–100 kW",
      "Zakázky pro STM De Ruijter (lanové bubny, vykládací nádoby) · kruhové polotovary z Hardoxu 450",
    ],
  },
  {
    y: 2025, title: "Náročné zakázky jsou vítanou výzvou",
    src: "TechMagazín 9/2025, str. 22–23", pages: ["assets/img/pages/2025-1.jpg", "assets/img/pages/2025-2.jpg"],
    photos: ["assets/img/2025-svarovani-prstenec.jpg", "assets/img/2025-prevodova-skrin.jpg", "assets/img/2025-napravy.jpg", "assets/img/2025-motor-3d-model.jpg"],
    points: [
      "Převodové skříně, klapka DN550 pro odvod vysokopecního plynu (Raben, Paul Wurth), nápravy pro Bresskamp",
      "Difuzor D2280 mm o hmotnosti 3520 kg pro plynovou turbínu Siemens · dílce elektromotorů a generátorů (G&Em)",
      "Dotace RES+ č. 1/2024 na FVE 150 kW · Úspory energie II na stavební úpravy hal",
      "Nový hydrostatický izotermický rotační stroj – pro výkony jednotek až desítek MW; může pracovat i jako kompresor",
      "Umožní výrobu tepelných plynových motorů, tepelných plynových čerpadel i parních motorů",
      "Dotace Aplikace DeepTech na prototyp plynového tepelného motoru ve spolupráci s Technickou univerzitou v Liberci",
    ],
  },
];

/* ---------- CO UMÍME ---------- */
const CAPABILITIES = {
  numbers: [
    { v: "10 000 m²", l: "vlastní výrobní areál" },
    { v: "≈ 50", l: "kvalifikovaných zaměstnanců" },
    { v: "10 t", l: "nosnost jeřábu, svařence do 10 000 kg" },
    { v: "30+ let", l: "zakázkové výroby (od 1993)" },
    { v: "1994", l: "od té doby každý rok na MSV Brno" },
    { v: "≈ 100 mil. Kč", l: "roční obrat" },
  ],
  groups: [
    {
      title: "Obrábění", img: "assets/img/2022-hcb110.jpg",
      items: [
        "Horizontální vyvrtávání/frézování: HCB 110 CNC, WH 13.8 CNC, WH 13",
        "CNC horizontální dvoupaletové centrum Quaser HX-635 SP (Heidenhain TNC 640)",
        "CNC vertikální centrum Accuway UM-210 (2100 × 1000 × 850 mm), FSS 80 CNC, MCFV 1260 CNC, FP-16",
        "Svislé soustružení: SK 25 (Ø 2700 mm), SK 12, karusel Honor Seiki VL-125VM CNC",
        "Soustružení mezi hroty: Samsung PL45LY / PL45XLM CNC, TCA Poreba (Ø 900 × 4500 mm), SU 100, SU 90",
        "Součásti od desítek kilogramů po několik tun; svařence, výkovky, odlitky",
      ],
    },
    {
      title: "Svařování a zámečnictví", img: "assets/img/2025-svarovani-prstenec.jpg",
      items: [
        "ČSN EN ISO 3834-2 · ČSN EN 1090-1 + A1 ve třídě EXC2 · svářeči se státní zkouškou ISO 9606",
        "Desítky schválených postupů WPQR dle ČSN EN ISO 15614, certifikace TÜV SÜD",
        "MAG-135: S355J2+N (3–100 mm), Hardox 450 (3–30 mm), S690QL (10–100 mm), P355NL (8–100 mm), S460NL (27–110 mm)",
        "Nerez 1.4301, 1.4571, 1.4828 (3–80 mm) · TIG-141 · MIG-131 pro CuZn10 · hliník EN AW-5083",
        "NDT dozor: svářečský inženýr dle ČSN EN ISO 9712 sektor W level 2 (MT, VT); zkoušky VT, MT, PT, UT, RTG",
        "Řezání, pálení, střihání, ohýbání, zakružování; svařovací systémy Fronius",
      ],
    },
    {
      title: "Unikátní technologie", img: "assets/img/2024-skruze.jpg",
      items: [
        "Zakružování za studena: plechy tloušťky 30–100 mm, Ø 300–3000 mm",
        "Kruhové polotovary z těžko tvářitelných materiálů (Hardox 450) různých tlouštěk stěn, svařované po zakružení",
        "Vibrační odstranění zbytkového napětí po svařování s počítačovým protokolem",
        "Vlastní konstrukční oddělení: stroje i kompletní technologické linky",
        "Tryskání a nátěry ve vlastní hale",
      ],
    },
    {
      title: "Reference", img: "assets/img/2025-difuzor.jpg",
      items: [
        "Siemens – základové rámy turbín, difuzor plynové turbíny D2280 mm / 3520 kg",
        "Německý výrobce tryskových mlýnů s fluidním ložem – obráběné svařence",
        "STM De Ruijter (NL) – lanové bubny, rámy navijáků, vykládací nádoby pro lodě",
        "Raben, Paul Wurth – armatury pro vysoké pece, klapka DN550",
        "Bresskamp – nápravy · G&Em – dílce elektromotorů a generátorů · GTK – obrábění odlitků a výkovků",
        "Prefa Brno, VÚSH Brno – mlýny pro jemné mletí (projekt TREND)",
      ],
    },
  ],
  gallery: [
    ["assets/img/2019-mlyn.jpg", "Kulový mlýn – realizovaná zakázka 2019"],
    ["assets/img/2023-misic-rtm.jpg", "Obří míchací zařízení"],
    ["assets/img/2025-prevodova-skrin.jpg", "Obrábění převodové skříně"],
    ["assets/img/2024-lanove-bubny.jpg", "Lanové bubny pro STM De Ruijter"],
    ["assets/img/2025-napravy.jpg", "Nápravy pro Bresskamp"],
    ["assets/img/2025-klapka-dn550.jpg", "Klapka DN550 na odvod vysokopecního plynu"],
    ["assets/img/2024-nadoba.jpg", "Nádoba vykládacího zařízení"],
    ["assets/img/2024-svarovani-kuzel.jpg", "Svařování kuželové nádoby"],
    ["assets/img/2022-um210-obrabeni.jpg", "Frézování na Accuway UM-210"],
    ["assets/img/2017-kolo.jpg", "Rozměrný svařenec"],
    ["assets/img/2016-buben-preprava.jpg", "Expedice bubnu"],
    ["assets/img/2019-hx635b.jpg", "Quaser HX-635B"],
  ],
};

/* ---------- ENERGIE A DOTACE ---------- */
const ENERGY = {
  intro: "Úspory energií, energetická soběstačnost a snižování uhlíkové stopy jsou pro nás aktuální téma. Využíváme fondy EU určené na podporu nových obnovitelných zdrojů a snižování emisí skleníkových plynů v ČR.",
  pv: [ // vývoj instalovaného výkonu FVE
    { y: "2010", kw: 90, l: "první FVE na střechách hal (zelený bonus)" },
    { y: "2023", kw: 140, l: "+50 kW, NPO – Čistší zdroje energie" },
    { y: "2026", kw: 300, l: "RES+ č. 1/2024: až 300 kW celkem" },
  ],
  consumptionMWh: 635, ownMWhToday: 130, targetShare: 50,
  co2: { fossil: 430, pv: 50 },
  grants: [
    { n: "OP TAK – Úspory energií", d: "Snížení energetické náročnosti podniku a emisí CO₂. Stavební úpravy výrobních hal ušetří 105 MWh primární energie ročně (≈ 15 % spotřeby elektřiny). Dokončení 2026.", tag: "dokončujeme 2026" },
    { n: "RES+ č. 1/2024", d: "Podpora nových obnovitelných zdrojů: nové fotovoltaické elektrárny 150 kW, celkem až 300 kW. Cíl: 50 % vlastní elektřiny. Dokončení 2026.", tag: "dokončujeme 2026" },
    { n: "NPO – Čistší zdroje energie", d: "Fotovoltaika 50 kW realizovaná v roce 2023.", tag: "hotovo 2023" },
    { n: "Úspory energie II", d: "Stavební úpravy výrobních budov – úspora energií a lepší pracovní prostředí.", tag: "realizace" },
    { n: "TREND (TA ČR)", d: "Výzkum a vývoj: zkušební linka pro jemné mletí teplárenské strusky s Prefou Brno a VÚSH Brno.", tag: "výzkum a vývoj" },
    { n: "Proof of concept · Aplikace DeepTech", d: "Financování vývoje a výroby prototypu plynového tepelného motoru 50–100 kW ve spolupráci s Technickou univerzitou v Liberci (2026–2029).", tag: "vývoj 2026–2029" },
  ],
};

/* ---------- TEPELNÝ PLYNOVÝ MOTOR ---------- */
const ENGINE = {
  lead: "Nová energetická jednotka (NEJ) – tepelný motor pracující v uzavřeném termodynamickém cyklu s vnější dodávkou tepla, v němž je pracovní látkou reálný plyn.",
  features: [
    { i: "🌡️", t: "Teplo už od cca 100 °C", d: "Odpadní teplo ze spalin, sušáren, chladičů, kogenerace; slunce i geotermální zdroje." },
    { i: "🔁", t: "Uzavřený cyklus", d: "Vnější dodávka tepla, žádné palivo, žádné spaliny z motoru." },
    { i: "🔇", t: "Tichý chod bez vibrací", d: "Vysoká životnost a výrazně nižší výrobní cena než u spalovacích motorů." },
    { i: "📈", t: "Účinnost i při malém ΔT", d: "Zvyšuje efektivitu stávajících zdrojů; v tropech až 2× účinnost FVE při nižších nákladech na kWh." },
    { i: "🔄", t: "Motor i kompresor", d: "Hydrostatický izotermický rotační stroj po malé úpravě pracuje i jako tepelné čerpadlo či parní motor." },
    { i: "🛡️", t: "Chráněno patentem", d: "Česká patentová přihláška, následuje evropská. Zajištěny podíly na patentech „plynový motor“ a „tepelné plynové čerpadlo“." },
  ],
  roadmap: [
    { y: "2024", t: "První etapa vývoje dokončena", d: "Modelové zařízení tepelného plynového motoru, patentová přihláška." },
    { y: "2025", t: "Nový hydrostatický izotermický rotační stroj", d: "Dvoulamelový stroj nestačí pro výkony v řádu MW – vzniká nová konstrukce s dokonale vyváženým rotorem." },
    { y: "2026–2029", t: "Prototyp s Technickou univerzitou v Liberci", d: "Dotace Aplikace DeepTech. Vývoj prototypu jednotky 50–100 kW a kompletního výrobního know-how." },
    { y: "výhled", t: "Sériová výroba nových energetických jednotek", d: "Tandemové provedení může v budoucnu nahradit dieselové motory v nákladních vozech, lokomotivách či lodích." },
  ],
  imgs: ["assets/img/2024-motor-prototyp.jpg", "assets/img/2025-motor-3d-model.jpg"],
};

/* ---------- ZÁVĚR VE 4 KROCÍCH (text klienta) ---------- */
const STEPS = {
  problem: {
    title: "Problém zákazníka",
    lines: [
      "Každou hodinu odvádíte komínem, chladičem nebo ventilátorem energii, kterou jste už jednou zaplatili nebo vyrobili.",
      "Pokud máte trvale alespoň 1 MW tepelného výkonu, představuje to pro náš systém potenciál přibližně 100 kW elektřiny.",
      "Při hodnotě vlastní elektřiny 3,50 Kč/kWh je to přibližně 350 Kč každou hodinu, kdy zařízení běží.",
    ],
    hourly: 350,
  },
  solution: {
    title: "Schéma řešení",
    bullets: ["Žádné další palivo.", "Žádný zásah do výrobního procesu.", "Žádná změna produktu.", "Pouze využití energie před jejím vypuštěním do okolí."],
  },
  economics: {
    title: "Ekonomika",
    assumptions: [
      { l: "Elektrický výkon jednotky", v: "100 kW" },
      { l: "Investice", v: "6 mil. Kč" },
      { l: "Hodnota vlastní elektřiny", v: "3,50 Kč/kWh" },
      { l: "Provozní servis", v: "200 000 Kč/rok" },
    ],
    note: "Zásadní je elektřinu spotřebovat uvnitř závodu, ne ji prodávat do sítě.",
  },
  cases: [
    { n: "Cementárna", i: "🏭", mwh: 750, hours: 7500, value: "2,63 mil. Kč", net: "2,43 mil. Kč", payback: "≈ 2,5 roku", src: "Pec / chladič výrobku" },
    { n: "Cihelna", i: "🧱", mwh: 650, hours: 6500, value: "2,28 mil. Kč", net: "2,075 mil. Kč", payback: "≈ 2,9 roku", src: "Sušárna" },
    { n: "Bioplynová stanice", i: "🌿", mwh: 500, hours: 5000, value: "1,75 mil. Kč", net: "1,55 mil. Kč", payback: "≈ 3,9 roku", src: "Kogenerační jednotka / BPS" },
  ],
  closing: "Nechceme měnit váš výrobní proces. Chceme se připojit na místo, kde dnes vaše technologie končí – na komín, výduch, chladič nebo vratný tepelný okruh. Energie, kterou dnes vypouštíte do okolí, bude pro nás palivem. Z každého 1 MW této energie vám vrátíme přibližně 100 kW elektrického výkonu.",
};

/* ---------- KALKULAČKA – výchozí parametry ---------- */
const CALC_DEFAULTS = {
  eff: 10,            // čistá elektrická účinnost [%]
  modulePower: 100,   // jmenovitý výkon modulu [kWe]
  moduleCapex: 6000000, // cena 1 modulu [Kč] – dle textu „Závěr – 4 kroky“ (v původní kalkulačce bylo 5 mil.)
  moduleOpex: 200000,   // roční servis 1 modulu [Kč/rok]
  sources: ["Průmyslové spaliny / komín", "Pec / chladič výrobku", "Sušárna", "Kogenerační jednotka / BPS", "Horká voda / technologické chlazení", "Jiný zdroj"],
  demos: [
    { n: "Cementárna", src: "Pec / chladič výrobku", heat: 1, unused: 100, hours: 7500, price: 3.5 },
    { n: "Cihelna", src: "Sušárna", heat: 1, unused: 100, hours: 6500, price: 3.5 },
    { n: "Bioplynová stanice", src: "Kogenerační jednotka / BPS", heat: 1, unused: 100, hours: 5000, price: 3.5 },
  ],
};
