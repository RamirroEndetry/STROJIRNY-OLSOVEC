/* =====================================================================
   OBSAH PREZENTACE – Strojírny Olšovec s.r.o. – MSV Brno 2026
   Tento soubor je jediné místo, kde se mění texty, čísla a obrázky.
   Prezentace běží ve smyčce sama; dotyk obrazovky otevře kalkulačku.
   Zdroje: e-mail klienta z 21. 9. (bod 3) – články Technický magazín
   2016–2025, text „Závěr – 4 kroky“, kalkulačka od klienta.
   Položky označené DOPLNIT čekají na klienta.
   ===================================================================== */

const CONFIG = {
  slideSeconds: 16,          // minimální délka snímku BEZ mluveného slova (× k v SEQUENCE)
  readingWpm: 140,           // rychlost čtení (slov/min) – snímek bez nahrávky s delším textem se automaticky prodlouží,
                             // aby návštěvník stihl dočíst celý text
  fadeSeconds: 1.8,          // plynulé prolnutí snímků
  photoFadeSeconds: 2.4,     // plynulé prolnutí fotografií uvnitř snímku
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

/* ---------- MLUVENÉ SLOVO ----------
   Text klienta (e-mail 30. 9. 2026) se zobrazuje na snímcích a je zároveň podkladem pro namluvení.
   Nahrávku ke snímku stačí uložit pod názvem uvedeným u snímku v SEQUENCE (audio: …) do složky
   assets/audio/slovo/. Snímek se pak automaticky prodlouží na délku nahrávky.
   Chybějící soubor se tiše přeskočí – snímek běží podle délky textu.
   Hudební podkres byl na přání klienta odstraněn (30. 9. 2026).                                   */
const VOICE = {
  folder: "assets/audio/slovo/",
  volume: 100,       // hlasitost mluveného slova v %; lze změnit i v servisním panelu
  delaySeconds: 0.6, // nahrávka začne chvíli po nástupu snímku
  tailSeconds: 0.8,  // po konci nahrávky snímek hned končí (klient nechce tichá místa)
  photoFadeSeconds: 1.4, // rychlejší prolnutí fotek ve snímku s nahrávkou
  minPhotoSeconds: 2.6, // každá fotka ve snímku s nahrávkou je vidět aspoň takto dlouho
};

/* ---------- POŘADÍ SNÍMKŮ ----------
   type  = šablona snímku (viz app.js), chapter = kapitola na spodní liště,
   k     = násobek minimální délky snímku (1 = slideSeconds)
   audio = nahrávka mluveného slova (soubor ve VOICE.folder), nepovinné
   sec   = pevná délka snímku v sekundách (má přednost před k i délkou textu; připomínky klienta 3. 10.)
   Snímky s delším textem se prodlouží automaticky (readingWpm).
   Pořadí podle e-mailu klienta z 30. 9. 2026 (body 2–9), pak původní obsah.  */
const SEQUENCE = [
  { type: "tale", id: "lom",         chapter: "Historie", audio: "01-historie-1902.mp3" },
  { type: "tale", id: "privatizace", chapter: "Historie", audio: "02-privatizace-1992.mp3" },
  { type: "tale", id: "rozvoj",      chapter: "Historie", audio: "03-rozvoj.mp3" },
  { type: "tale", id: "lis",         chapter: "Historie", audio: "04-lis-zdas-2008.mp3" },
  { type: "history",  chapter: "Historie", sec: 8 },    // pevné délky doladěny s klientem 3. 10.
  { type: "msv",      chapter: "MSV Brno", k: 1.8, audio: "05-msv-brno.mp3" },
  { type: "certs",    chapter: "Certifikáty", k: 1.4, audio: "06-certifikaty.mp3" },
  { type: "tale", id: "fve",         chapter: "O firmě", audio: "07-fotovoltaika.mp3" },
  { type: "tale", id: "zakazky",     chapter: "O firmě", k: 1.6, audio: "08-zakazky.mp3" },
  { type: "tale", id: "statek",      chapter: "O firmě", k: 1.4, audio: "09-obchodni-oddeleni.mp3" },
  { type: "tale", id: "lide",        chapter: "O firmě", audio: "10-pracovnici.mp3" },
  { type: "intro",    chapter: "Psali o nás", sec: 5.5 },    // údaje z původního úvodu (bod 1 e-mailu 30. 9.)
  { type: "pressIntro", chapter: "Psali o nás", k: 0.8, audio: "11-technicky-magazin.mp3" },
  { type: "article", y: 2016, chapter: "Psali o nás", sec: 9.5 },
  { type: "article", y: 2017, chapter: "Psali o nás", k: 1.25 },
  { type: "article", y: 2018, chapter: "Psali o nás", k: 1.25 },
  { type: "article", y: 2019, chapter: "Psali o nás", k: 1.25 },
  { type: "article", y: 2022, chapter: "Psali o nás", k: 1.25 },
  { type: "article", y: 2023, chapter: "Psali o nás", k: 1.25 },
  { type: "article", y: 2024, chapter: "Psali o nás", k: 1.25 },
  { type: "article", y: 2025, chapter: "Psali o nás", k: 1.25 },
  { type: "article", y: 2026, chapter: "Psali o nás", k: 1.25 },
  { type: "energy",   chapter: "Energie a dotace", k: 1.3, audio: "12-energie-a-dotace.mp3" },
  { type: "grants",   chapter: "Energie a dotace", sec: 7.5 },
  { type: "engine",   chapter: "Tepelný motor", k: 1.3, audio: "13-tepelny-motor.mp3" },
  { type: "roadmap",  chapter: "Tepelný motor", sec: 6 },
  { type: "step1",    chapter: "4 kroky", k: 1.2, audio: "14-ctyri-kroky.mp3" },
  { type: "step2",    chapter: "4 kroky", k: 1.3 },
  { type: "step3",    chapter: "4 kroky", k: 1.2 },
  { type: "step4",    chapter: "4 kroky", k: 1.4 },
  { type: "cta",      chapter: "Kalkulačka", k: 1.1, audio: "15-kalkulacka.mp3" },
  { type: "tale", id: "zaver",       chapter: "Závěr", audio: "16-zaver.mp3" },
];

/* ---------- VYPRÁVĚNÍ S FOTOGRAFIEMI (text klienta z 30. 9. 2026 = mluvené slovo) ----------
   Na přání klienta (30. 9.) se text NEZOBRAZUJE – snímek ukazuje jen fotografie přes celou
   obrazovku s krátkým popiskem (kicker, year, title) a hraje nahrávka.
   Položky „say“ (zde i u MSV, CERTS, PRESS_INTRO) jsou jen podklad k namluvení.
   text   = odstavce mluveného slova (nezobrazují se)
   stats  = nepoužívá se
   photos = fotografie; mode: "fit" (celá fotka na rozmazaném pozadí – výchozí),
            "cover" (vyplní rámeček, ořízne okraje),
            "print" (malá / stará fotka v bílém rámečku; zoom = max. zvětšení vůči FullHD)
   cap    = krátký popisek k fotce (nepovinné)                                                   */
const TALES = {
  lom: {
    kicker: "Historie firmy", year: "1902", title: "Od kamenolomu k opravárenským dílnám",
    say: [
      "Historie firmy se datuje od roku 1902, kdy byl otevřen místní kamenolom, který zaměstnává řadu lidí z okolí.",
      "V roce 1928 lom prožívá velký rozvoj v období, kdy se jeho správcem stává Zemská donucovací pracovna v Brně. Jsou realizovány velké investice do strojního zařízení a modernizace provozu, lom zaměstnává 115 zaměstnanců a obrat činí 2 mil. Kč.",
      "V roce 1948 lom přechází pod státní správu. Dolní budova slouží jako opravárenské dílny pro lomy na severní Moravě.",
    ],
    photos: [
      { img: "assets/img/historie/historie-lom-1.jpg", mode: "print", zoom: 3.2 },
      { img: "assets/img/historie/historie-lom-2.jpg", mode: "print", zoom: 3.2 },
      { img: "assets/img/historie/historie-drtic.jpg", mode: "print", zoom: 2 },
    ],
  },
  privatizace: {
    kicker: "Historie firmy", year: "1992", title: "Privatizace opravárenských dílen",
    say: ["V roce 1992 v rámci velké privatizace je provoz opravárenských dílen Štěrkoven a pískoven Olomouc koupen současným majitelem. V tu dobu činí roční obrat provozu 5 mil. Kč a zaměstnává 25 pracovníků."],
    stats: [{ v: "5 mil. Kč", l: "roční obrat v roce 1992" }, { v: "25", l: "pracovníků" }],
    photos: [{ img: "assets/img/historie/historie-1992-dilny.jpg", mode: "print", zoom: 3.2 }],
  },
  rozvoj: {
    kicker: "Historie firmy", year: "po roce 1992", title: "Neustálý rozvoj",
    say: ["Firma v průběhu následujících let neustále opravuje, přistavuje a zlepšuje podmínky pro své podnikání. Z počátku investuje do strojního vybavení tak, že nakupuje starší stroje podle toho, jak se vyvíjí poptávky našich zákazníků."],
    photos: [{ img: "assets/img/firma/areal-shora.jpg" }],
  },
  lis: {
    kicker: "Historie firmy", year: "2008", title: "Jedinečný zakružovací lis ŽĎAS",
    say: ["V době finanční krize v roce 2008 se firmě podařilo zakoupit jedinečný stroj, který vyrobila firma Žďas jako jediný v republice. Jedná se o speciální lis pro zakružování tlustých plechů a výrobu trubek do výšky jednoho metru a průměru od 300 mm do 2500 mm ze síly plechu 15 až 100 mm."],
    stats: [{ v: "Ø 300–2500", l: "průměr trubky (mm)" }, { v: "15–100", l: "síla plechu (mm)" }, { v: "1 m", l: "výška trubky" }],
    photos: [
      { img: "assets/img/firma/lis-zdas-1.jpg" },
      { img: "assets/img/firma/lis-zdas-2.jpg" },
      { img: "assets/img/firma/lis-zdas-skruze.jpg" },
    ],
  },
  fve: {
    kicker: "Životní prostředí a úspory energie", year: "290 kW", title: "Fotovoltaika na střechách výrobních budov",
    // V textu klienta je „290 kWh“ – u výkonu elektrárny jde o kW. Ověřit u klienta.
    say: ["Pokud se týká vztahu k životnímu prostředí a úsporám energie, vybudovala firma v roce 2010 a poté v roce 2024 a 2026 na střechách výrobních budov fotovoltaické elektrárny o celkovém výkonu 290 kW, které nám umožňují šetřit spotřebovanou elektrickou energii a krýt spotřebu z obnovitelných zdrojů."],
    photos: [
      { img: "assets/img/firma/areal-fve-2.jpg" },
      { img: "assets/img/firma/areal-fve-1.jpg" },
    ],
  },
  zakazky: {
    kicker: "Reference", title: "Velké kusové zakázky",
    say: ["Za dobu své existence firma zhotovila řadu velkých kusových zakázek, z nichž některé jsou na přiložených fotografiích."],
    photos: [
      { img: "assets/img/zakazky/zakazka-1.jpg" },
      { img: "assets/img/zakazky/zakazka-2.jpg" },
      { img: "assets/img/zakazky/zakazka-3.jpg" },
      { img: "assets/img/zakazky/zakazka-4.jpg" },
      { img: "assets/img/zakazky/zakazka-5.jpg" },
      { img: "assets/img/zakazky/zakazka-6.jpg", mode: "print", zoom: 2.2 },
    ],
  },
  statek: {
    kicker: "Obchodní oddělení · Olšovec 37", title: "Kanceláře v rekonstruovaném statku",
    say: ["Obchodní oddělení je vzhledem k omezeným kancelářským prostorám ve výrobním areálu umístěno v areálu rekonstruovaného statku uprostřed vesnice na adrese Olšovec 37, který tvoří příjemné pracovní prostředí pro pracovníky obchodního a ekonomického úseku."],
    photos: [
      { img: "assets/img/statek/statek-1.jpg" },
      { img: "assets/img/statek/statek-2.jpg" },
      { img: "assets/img/statek/kancelar-1.jpg" },
      { img: "assets/img/statek/kancelar-2.jpg" },
      { img: "assets/img/statek/kancelar-3.jpg" },
    ],
  },
  zaver: {
    kicker: "Závěr", title: "Těšíme se na další spolupráci s Vámi",
    say: ["Z prezentace, kterou Vám předkládáme je patrné, že naše firma Vám může poskytovat své výrobky a služby. V budoucnu se na další spolupráci s Vámi těší kolektiv Strojíren Olšovec."],
    photos: [{ img: "assets/img/firma/zaver-kolektiv.jpg" }],
  },
  lide: {
    kicker: "Naši lidé", title: "Kvalifikovaní pracovníci",
    say: ["Aby firma zvládla vysoké nároky na realizaci kusových zakázek, musí mít ve výrobě kvalifikované pracovníky. Skupinové foto z roku 2016 u příležitosti Dne otevřených dveří ve firmě zachycuje pracovníky Strojíren Olšovec před výrobním areálem."],
    photos: [{ img: "assets/img/firma/pracovnici-2016.jpg", cap: "Den otevřených dveří 2016" }],
  },
};

/* ---------- ÚVOD → nyní první snímek sekce „Psali o nás“ (bod 1 e-mailu 30. 9.) ---------- */
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

/* ---------- PRAVIDELNĚ NA MSV BRNO ---------- */
const MSV = {
  kicker: "Mezinárodní strojírenský veletrh Brno",
  title: "Na MSV Brno pravidelně od roku 1994",
  say: "Svou pozici na trhu firma neustále vylepšuje pravidelnou návštěvou na brněnském strojírenském veletrhu, kde nabízí své stále se rozšiřující služby již od roku 1994 až do dnešní doby.",
  since: 1994,
  photos: [
    { img: "assets/img/msv/msv-1-olsovecke-strojirny.jpg", y: "Počátky", t: "Ještě jako Olšovecké strojírny spol. s r.o." },
    { img: "assets/img/msv/msv-2-strojirny-olsovec.jpg", y: "Nový název", t: "Již jako Strojírny Olšovec s.r.o." },
    { img: "assets/img/msv/msv-2015.jpg", y: "2015", t: "Stánek Strojíren Olšovec" },
    { img: "assets/img/msv/msv-2018.jpg", y: "2018", t: "25 let zakázkové výroby" },
    { img: "assets/img/msv/msv-2019.jpg", y: "2019", t: "Tým Strojíren Olšovec" },
    { img: "assets/img/msv/msv-2025.jpg", y: "2025", t: "Tradiční stánek u pavilonu G1" },
  ],
};

/* ---------- CERTIFIKÁTY (PDF od klienta, certifikační orgán LL-C) ---------- */
const CERTS = {
  kicker: "Prokázaná odbornost",
  title: "Certifikovaná kvalita a svařování",
  say: "Zvyšování odbornosti firmy dokládají certifikáty, které firma vlastní a neustále udržuje v platnosti.",
  lead: "Certifikační orgán: LL-C (Certification) Czech Republic a.s.",
  items: [
    { img: "assets/img/cert/cert-iso-9001.jpg", norm: "EN ISO 9001:2015", t: "Systém managementu kvality",
      d: "Výroba a opravy ocelových konstrukcí, strojních zařízení, manipulační techniky a dopravních systémů. Zámečnictví, obrábění.", since: "certifikováno od roku 2001" },
    { img: "assets/img/cert/cert-iso-3834-2.jpg", norm: "EN ISO 3834-2:2021", t: "Nejvyšší úroveň jakosti při svařování",
      d: "Svařování metodami MAG (135), TIG (141) a obalenou elektrodou (111). Svářečský dozor: 2× EWE – evropský svářečský inženýr.", since: "certifikováno od roku 2001" },
    { img: "assets/img/cert/cert-en-1090.jpg", norm: "EN 1090-1 · EXC3", t: "Provádění ocelových konstrukcí",
      d: "Osvědčení o shodě řízení výroby pro stavební ocelové konstrukce v třídě provedení EXC3 (nařízení EU 305/2011).", since: "certifikováno od roku 2015" },
  ],
};

/* ---------- PSALI O NÁS – Technický magazín ---------- */
const PRESS_INTRO = {
  kicker: "Psali o nás",
  title: "Technický magazín",   // roky (2016–20xx) se doplní automaticky podle hotových článků
  say: "Již řadu let se firma pravidelně prezentuje v době veletrhu ve veletržním čísle Technického magazínu.",
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
    photos: ["assets/img/2019-mlyn.jpg", "assets/img/2019-obrabeni.jpg", "assets/img/2019-hx635b.jpg"],
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
  {
    y: 2026, title: "Zlaté české ručičky (a chytré mozky) z Moravy",
    src: "TechMagazín 9/2026", pages: ["assets/img/pages/2026-1.jpg", "assets/img/pages/2026-2.jpg"],
    photos: ["assets/img/2026-ocelove-konstrukce.jpg", "assets/img/2026-strojni-zarizeni.jpg", "assets/img/2026-lanovy-buben.jpg", "assets/img/2026-nadoba.jpg", "assets/img/2026-strojni-dilce.jpg", "assets/img/2026-skruze.jpg"],
    points: [
      "Více než čtyři desítky vysoce kvalifikovaných zaměstnanců, areál na spojnici Olomouc–Ostrava",
      "Strojní zařízení a svařence běžně do 10 tun, po dohodě i větší",
      "Vlastní konstrukce: jednotlivé stroje i kompletní linky včetně technologie",
      "Tepelný motor: s podporou MPO a TA ČR vznikají v letech 2026–2029 funkční prototypy",
      "Odpadní teplo 100–200 °C mění v elektřinu – z 1 MW tepla přibližně 100 kW",
    ],
  },
];

/* ---------- ENERGIE A FONDY EU (letošní článek) ---------- */
const ENERGY = {
  say: "Rok 2026 je rokem, kdy firma v nebývalé míře využívá zdrojů z dotačních fondů pro úspory energií a hledá vlastní výrobní program pomocí dotačních titulů a vyvíjí několik typů tepelných motorů, které umožní z odpadního tepla získat čistou elektrickou energii.",
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
    { n: "Théta 2 (TA ČR)", d: "Výzkum a vývoj – podporuje aplikovaný výzkum, vývoj a inovace v oblasti transformace a modernizace energetiky.", tag: "výzkum a vývoj" },
    { n: "Aplikace DeepTech", d: "Vývoj a výroba prototypu plynového tepelného motoru 50–100 kW s Technickou univerzitou v Liberci.", tag: "vývoj 2026–2029" },
  ],
};

/* ---------- TEPELNÝ PLYNOVÝ MOTOR ---------- */
const ENGINE = {
  say: "Na základě malého modelu tepelného parního motoru postupuje firma dále ve vývoji těchto strojů, který by měl být ukončen v roce 2028–2029 zhotovením prototypu motoru o výkonu 100 kW, provedením jeho zkoušek a stanovením účinnosti uzavřeného tepelného cyklu.",
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
  say: "Pro naše potenciální zákazníky jsme připravili prezentaci možností využití plynového parního motoru pracujícího s jejich odpadním teplem, tj. energií, kterou doposud nevyužívali.",
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
  paybackLead: "Výkon 100 kW – Investice 6 mil. Kč – Cena nakupované elektřiny 3,50 Kč/kWh – Náklady na servis 200 000 Kč/rok",
  cases: [
    { n: "Cementárna", i: "🏭", mwh: 750, value: "2,63 mil. Kč", net: "2,43 mil. Kč", payback: "≈ 2,5 roku" },
    { n: "Cihelna", i: "🧱", mwh: 650, value: "2,28 mil. Kč", net: "2,075 mil. Kč", payback: "≈ 2,9 roku" },
    { n: "Bioplynová stanice", i: "🌿", mwh: 500, value: "1,75 mil. Kč", net: "1,55 mil. Kč", payback: "≈ 3,9 roku" },
  ],
  closing: "Nechceme měnit váš výrobní proces. Chceme se připojit na místo, kde dnes vaše technologie končí – na komín, výduch, chladič nebo vratný tepelný okruh. Z každého 1 MW této energie vám vrátíme přibližně 100 kW elektrického výkonu.",
};

/* ---------- VÝZVA NA KONCI SMYČKY ---------- */
const CTA = {
  say: "Pokud máte zájem, můžete si sami spočítat návratnost své investice při využití naší energetické jednotky, abyste mohli posoudit, zda by pro Vás mohla být tato investice vhodná a abyste nás případně mohli oslovit.",
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
