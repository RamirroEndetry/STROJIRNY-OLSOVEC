/* =====================================================================
   OBSAH PREZENTACE – Strojírny Olšovec s.r.o. – MSV Brno 2026
   Tento soubor je jediné místo, kde se mění texty, čísla a obrázky.
   Prezentace běží ve smyčce sama; dotyk obrazovky otevře kalkulačku.
   Zdroje: e-mail klienta z 21. 9. (bod 3) – články Technický magazín
   2016–2025, text „Závěr – 4 kroky“, kalkulačka od klienta.
   Položky označené DOPLNIT čekají na klienta.
   ===================================================================== */

const CONFIG = {
  slideSeconds: 12,          // základní délka snímku prezentace
  calcIdleSeconds: 90,       // po kolika sekundách nečinnosti se kalkulačka zavře a prezentace pokračuje
  fairName: "MSV Brno 2026",
  fairDates: "6.–9. 10. 2026",
  stand: "volná plocha u pavilonu G1",
  web: "www.strojirny.com",
  phone: "DOPLNIT telefon",
  email: "DOPLNIT e-mail",
  address: "Olšovec, okres Přerov (u Hranic)",
  director: "Ing. Pavel Stupárek, jednatel",
};

/* ---------- POŘADÍ SNÍMKŮ ----------
   type  = šablona snímku (viz app.js), chapter = kapitola na spodní liště,
   k     = násobek základní délky snímku (1 = slideSeconds)               */
const SEQUENCE = [
  { type: "intro",    chapter: "Úvod", k: 0.9 },
  { type: "history",  chapter: "Historie", k: 1.3 },
  { type: "pressIntro", chapter: "Psali o nás", k: 0.7 },
  { type: "article", y: 2016, chapter: "Psali o nás", k: 1.25 },
  { type: "article", y: 2017, chapter: "Psali o nás", k: 1.25 },
  { type: "article", y: 2018, chapter: "Psali o nás", k: 1.25 },
  { type: "article", y: 2019, chapter: "Psali o nás", k: 1.25 },
  { type: "article", y: 2022, chapter: "Psali o nás", k: 1.25 },
  { type: "article", y: 2023, chapter: "Psali o nás", k: 1.25 },
  { type: "article", y: 2024, chapter: "Psali o nás", k: 1.25 },
  { type: "article", y: 2025, chapter: "Psali o nás", k: 1.25 },
  { type: "energy",   chapter: "Energie a dotace", k: 1.3 },
  { type: "grants",   chapter: "Energie a dotace", k: 1.3 },
  { type: "engine",   chapter: "Tepelný motor", k: 1.3 },
  { type: "roadmap",  chapter: "Tepelný motor", k: 1.2 },
  { type: "step1",    chapter: "4 kroky", k: 1.2 },
  { type: "step2",    chapter: "4 kroky", k: 1.3 },
  { type: "step3",    chapter: "4 kroky", k: 1.2 },
  { type: "step4",    chapter: "4 kroky", k: 1.4 },
  { type: "cta",      chapter: "Kalkulačka", k: 1.1 },
];

/* ---------- ÚVOD ---------- */
const INTRO = {
  img: "assets/img/2023-misic-preprava.jpg",
  kicker: "Rodinná firma z Olšovce u Hranic",
  title: "„Zvládneme vyrobit téměř vše!“",
  sub: "Zakázková strojírenská výroba od roku 1993 · na MSV Brno každý rok od roku 1994",
  stats: [
    { v: 10000, suffix: " m²", label: "vlastní výrobní areál" },
    { v: 50, prefix: "≈ ", label: "kvalifikovaných zaměstnanců" },
    { v: 10, suffix: " t", label: "svařence a stroje do 10 000 kg" },
    { v: 1993, plain: true, label: "zakázková výroba od roku" },
  ],
};

/* ---------- HISTORIE (z článku 2019) ---------- */
const HISTORY = {
  title: "Od kamenolomu k tepelnému motoru",
  img: "assets/img/2016-areal.jpg",
  items: [
    { y: 1902, t: "Stavitel Augustin Janečka žádá o otevření kamenolomu v Olšovci" },
    { y: 1923, t: "Lom přechází z páry na elektřinu, pracuje zde 122 lidí" },
    { y: 1931, t: "Vzniká „dolní budova“ – dnes nejstarší část firmy" },
    { y: 1964, t: "Lom uzavřen, provoz pokračuje jako opravárenský závod" },
    { y: 1993, t: "Vznik Strojíren Olšovec – zakázková strojírenská výroba" },
    { y: 1994, t: "Poprvé na MSV Brno – od té doby každý rok u pavilonu G1" },
    { y: 2015, t: "Rekordní obrat 109,4 mil. Kč, certifikace EN 1090-1 / EXC2" },
    { y: 2024, t: "Dokončena první etapa vývoje tepelného plynového motoru" },
    { y: 2026, t: "Start vývoje prototypu motoru s TU Liberec (2026–2029)" },
  ],
};

/* ---------- PSALI O NÁS – Technický magazín 2016–2025 ---------- */
const PRESS_INTRO = {
  kicker: "Psali o nás",
  title: "Technický magazín 2016–2025",
  sub: "Každý rok k Mezinárodnímu strojírenskému veletrhu přinášíme novinky z Olšovce.",
};
const ARTICLES = [
  {
    y: 2016, title: "„Zvládneme vyrobit téměř vše!“ zní motto Strojírny Olšovec",
    src: "TechMagazín, říjen 2016", pages: ["assets/img/pages/2016-1.jpg"],
    photos: ["assets/img/2016-dilna.jpg", "assets/img/2016-mlyn.jpg", "assets/img/2016-buben-preprava.jpg", "assets/img/2016-areal.jpg"],
    points: [
      "23 let na trhu, 48 vysoce kvalifikovaných zaměstnanců, areál cca 10 000 m²",
      "Obrobna s jeřábem 8 t a zámečna pro rozměrné stroje a svařence s jeřábem 10 t",
      "Zakružování za studena: plechy 30–100 mm, Ø 300–3000 mm",
      "Rekordní obrat 2015: 109,4 mil. Kč · ISO 9001, EN ISO 3834-3, EN 1090-1 / EXC2",
    ],
  },
  {
    y: 2017, title: "Horká novinka: CNC vertikální centrum Accuway UM 210",
    src: "TechMagazín, říjen 2017", pages: ["assets/img/pages/2017-1.jpg"],
    photos: ["assets/img/2017-um210.jpg", "assets/img/2017-kolo.jpg", "assets/img/2017-modre-dily.jpg", "assets/img/2017-rotor.jpg"],
    points: [
      "Těžké CNC vertikální centrum UM 210 (X/Y/Z 2100 × 1000 × 850 mm) s podporou fondů EU",
      "Vysoká tuhost díky kombinaci lineárních a kluzných vedení",
      "Výroba i podle vlastní dokumentace, svařence a stroje běžně do 10 000 kg",
      "Obraty kolem 100 mil. Kč v posledních letech",
    ],
  },
  {
    y: 2018, title: "Čtvrtstoletí zakázkové výroby",
    src: "TechMagazín, září 2018", pages: ["assets/img/pages/2018-1.jpg"],
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
    src: "TechMagazín 10/2019", pages: ["assets/img/pages/2019-1.jpg", "assets/img/pages/2019-2.jpg"],
    photos: ["assets/img/2019-mlyn.jpg", "assets/img/2019-obrabeni.jpg", "assets/img/2019-hx635b.jpg", "assets/img/2019-jednaci-mistnost.jpg"],
    points: [
      "Historie areálu sahá do roku 1902 – ke kamenolomu stavitele Augustina Janečky",
      "Obrábíme od desítek kilogramů po součásti o hmotnosti několika tun",
      "Vlastní konstrukce: stroje i kompletní technologické linky včetně technologie",
      "Obchodní jednání v netradičním prostředí statku s vlastním sklípkem",
    ],
  },
  {
    y: 2022, title: "Kritický čas přestáli i bez dotací",
    src: "TechMagazín 10/2022", pages: ["assets/img/pages/2022-1.jpg", "assets/img/pages/2022-2.jpg"],
    photos: ["assets/img/2022-svarence-mlyny.jpg", "assets/img/2022-hcb110.jpg", "assets/img/2022-pl45ly.jpg", "assets/img/2022-ramy-siemens.jpg"],
    points: [
      "Pandemie bez přerušení výroby, bez home office a bez státní podpory",
      "Nová kompresorovna, tryskač, WPQR pro výrobce vodních turbín",
      "Vibrační odstranění zbytkového napětí místo žíhání",
      "Svařence tryskových mlýnů pro Německo · základové rámy turbín pro Siemens",
      "Záměr rozšířit FVE na 300 kW – 50% soběstačnost v elektřině",
    ],
  },
  {
    y: 2023, title: "Mistři strojaři olšovečtí",
    src: "TechMagazín 10/2023", pages: ["assets/img/pages/2023-1.jpg", "assets/img/pages/2023-2.jpg"],
    photos: ["assets/img/2023-misic-preprava.jpg", "assets/img/2023-misic-rtm.jpg", "assets/img/2023-frezovani.jpg", "assets/img/2023-svarovani.jpg"],
    points: [
      "Dílce mlýnů pro mletí surovin do baterií – obrat s německým zákazníkem 6× vyšší",
      "Vlastní elektřina: FVE 90 kW od roku 2010, nově +50 kW (NPO)",
      "Uhlíková stopa firmy nižší o cca 20 %",
      "Svařování dle ČSN EN ISO 3834-2 a EN 1090-1 / EXC2, desítky WPQR (TÜV SÜD)",
      "Nově svařování hliníkových slitin EN AW-5083",
    ],
  },
  {
    y: 2024, title: "Olšovečtí strojaři vyvíjejí unikátní motor",
    src: "TechMagazín 9/2024", pages: ["assets/img/pages/2024-1.jpg", "assets/img/pages/2024-2.jpg"],
    photos: ["assets/img/2024-motor-prototyp.jpg", "assets/img/2024-lanove-bubny.jpg", "assets/img/2024-nadoba.jpg", "assets/img/2024-skruze.jpg"],
    points: [
      "OP TAK Úspory energií: úspora 105 MWh primární energie ročně",
      "Dokončena první etapa vývoje tepelného plynového motoru",
      "Využije teplo už od cca 100 °C – odpadní teplo, slunce, geotermální zdroje",
      "Podána česká patentová přihláška",
      "Zakázky pro STM De Ruijter: lanové bubny, vykládací nádoby",
    ],
  },
  {
    y: 2025, title: "Náročné zakázky jsou vítanou výzvou",
    src: "TechMagazín 9/2025", pages: ["assets/img/pages/2025-1.jpg", "assets/img/pages/2025-2.jpg"],
    photos: ["assets/img/2025-svarovani-prstenec.jpg", "assets/img/2025-prevodova-skrin.jpg", "assets/img/2025-napravy.jpg", "assets/img/2025-difuzor.jpg"],
    points: [
      "Difuzor D2280 mm / 3520 kg pro plynovou turbínu Siemens",
      "Klapka DN550 pro odvod vysokopecního plynu (Paul Wurth) · nápravy pro Bresskamp",
      "Nový hydrostatický izotermický rotační stroj pro výkony v řádu MW",
      "Dotace Aplikace DeepTech na prototyp motoru s Technickou univerzitou v Liberci",
    ],
  },
];

/* ---------- ENERGIE A FONDY EU (letošní článek) ---------- */
const ENERGY = {
  kicker: "Letošní téma",
  title: "Úspory energií a fondy EU",
  intro: "Energetická soběstačnost a nižší uhlíková stopa. Využíváme fondy EU na nové obnovitelné zdroje a snižování emisí.",
  pv: [ // vývoj instalovaného výkonu FVE
    { y: "2010", kw: 90, l: "první FVE na střechách hal" },
    { y: "2023", kw: 140, l: "+50 kW, NPO – Čistší zdroje energie" },
    { y: "2026", kw: 300, l: "RES+ č. 1/2024: až 300 kW celkem" },
  ],
  consumptionMWh: 635, ownMWhToday: 130, targetShare: 50,
  co2: { fossil: 430, pv: 50 },
  savingMWh: 105,
  grants: [
    { n: "OP TAK – Úspory energií", d: "Stavební úpravy výrobních hal ušetří 105 MWh primární energie ročně (≈ 15 % spotřeby elektřiny).", tag: "dokončujeme 2026" },
    { n: "RES+ č. 1/2024", d: "Nové fotovoltaické elektrárny 150 kW, celkem až 300 kW. Cíl: 50 % vlastní elektřiny.", tag: "dokončujeme 2026" },
    { n: "NPO – Čistší zdroje energie", d: "Fotovoltaika 50 kW realizovaná v roce 2023.", tag: "hotovo 2023" },
    { n: "Úspory energie II", d: "Stavební úpravy výrobních budov – úspora energií a lepší pracovní prostředí.", tag: "realizace" },
    { n: "TREND (TA ČR)", d: "Výzkum a vývoj: zkušební linka pro jemné mletí teplárenské strusky s Prefou Brno a VÚSH Brno.", tag: "výzkum a vývoj" },
    { n: "Aplikace DeepTech", d: "Vývoj a výroba prototypu plynového tepelného motoru 50–100 kW s Technickou univerzitou v Liberci.", tag: "vývoj 2026–2029" },
  ],
};

/* ---------- TEPELNÝ PLYNOVÝ MOTOR ---------- */
const ENGINE = {
  kicker: "Vlastní vývoj · s TU Liberec 2026–2029",
  title: "Tepelný plynový motor",
  lead: "Nová energetická jednotka: motor v uzavřeném termodynamickém cyklu s vnější dodávkou tepla, pracovní látkou je reálný plyn.",
  features: [
    { i: "🌡️", t: "Teplo už od cca 100 °C", d: "Odpadní teplo, slunce i geotermální zdroje" },
    { i: "🔁", t: "Uzavřený cyklus", d: "Žádné palivo, žádné spaliny z motoru" },
    { i: "🔇", t: "Tichý chod bez vibrací", d: "Vysoká životnost, nižší výrobní cena" },
    { i: "🛡️", t: "Chráněno patentem", d: "Česká přihláška, následuje evropská" },
  ],
  img: "assets/img/2024-motor-prototyp.jpg",
  img2: "assets/img/2025-motor-3d-model.jpg",
  roadmapTitle: "Cesta k sériové výrobě",
  roadmap: [
    { y: "2024", t: "První etapa vývoje dokončena", d: "Modelové zařízení tepelného plynového motoru, patentová přihláška." },
    { y: "2025", t: "Hydrostatický izotermický stroj", d: "Nová konstrukce rotačního stroje s dokonale vyváženým rotorem pro výkony v řádu MW." },
    { y: "2026–2029", t: "Prototyp s TU Liberec", d: "Dotace Aplikace DeepTech: prototyp jednotky 50–100 kW a kompletní výrobní know-how.", now: true },
    { y: "výhled", t: "Sériová výroba", d: "Nové energetické jednotky pro průmysl; v tandemu i náhrada dieselových motorů." },
  ],
};

/* ---------- ZÁVĚR VE 4 KROCÍCH (text klienta) ---------- */
const STEPS = {
  title: "Odpadní teplo → vlastní elektřina",
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
    { n: "Cementárna", i: "🏭", mwh: 750, value: "2,63 mil. Kč", net: "2,43 mil. Kč", payback: "≈ 2,5 roku" },
    { n: "Cihelna", i: "🧱", mwh: 650, value: "2,28 mil. Kč", net: "2,075 mil. Kč", payback: "≈ 2,9 roku" },
    { n: "Bioplynová stanice", i: "🌿", mwh: 500, value: "1,75 mil. Kč", net: "1,55 mil. Kč", payback: "≈ 3,9 roku" },
  ],
  closing: "Nechceme měnit váš výrobní proces. Chceme se připojit na místo, kde dnes vaše technologie končí – na komín, výduch, chladič nebo vratný tepelný okruh. Z každého 1 MW této energie vám vrátíme přibližně 100 kW elektrického výkonu.",
};

/* ---------- VÝZVA NA KONCI SMYČKY ---------- */
const CTA = {
  img: "assets/img/2025-motor-3d-model.jpg",
  kicker: "Kolik vám může vydělat odpadní teplo?",
  title: "Spočítejte si návratnost pro váš provoz",
  sub: "Dotkněte se obrazovky a otevře se kalkulačka. Pro technické posouzení se zastavte přímo u nás na stánku.",
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
