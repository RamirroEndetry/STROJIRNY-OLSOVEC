/* =====================================================================
   Strojírny Olšovec – dotyková prezentace MSV 2026 – logika aplikace
   ===================================================================== */
(() => {
"use strict";
const $ = id => document.getElementById(id);
const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };
const cz = (n, d = 0) => (isFinite(n) ? n : 0).toLocaleString("cs-CZ", { minimumFractionDigits: d, maximumFractionDigits: d });
const mil = n => cz(n / 1e6, 2) + " mil. Kč";

/* ---------- nastavení (data.js + localStorage) ---------- */
const SETTINGS_KEY = "so-msv-settings";
const settings = Object.assign({}, { idleSeconds: CONFIG.idleSeconds, loopSlideSeconds: CONFIG.loopSlideSeconds }, CALC_DEFAULTS);
delete settings.sources; delete settings.demos;
try { Object.assign(settings, JSON.parse(localStorage.getItem(SETTINGS_KEY) || "{}")); } catch (e) {}
const saveSettings = () => { try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings)); } catch (e) {} };

/* =====================================================================
   SMYČKA
   ===================================================================== */
const loop = { i: -1, timer: null, running: false };
function buildLoop() {
  $("loopFair").textContent = CONFIG.fairName;
  $("loopFairSub").textContent = CONFIG.fairDates + " · " + CONFIG.stand;
  const wrap = $("loopSlides"), dots = $("loopDots");
  LOOP_SLIDES.forEach((s, i) => {
    const sl = el("div", "slide");
    sl.innerHTML = `<div class="bg" style="background-image:url('${s.img}')"></div><div class="shade"></div>
      <div class="content">${s.logo ? `<div class="logo-big"><img src="assets/img/logo.png" alt=""></div>` : ""}
      <div class="kicker">${s.kicker}</div><h1>${s.title}</h1>
      ${s.sub ? `<div class="sub">${s.sub}</div>` : ""}
      ${s.stats ? `<div class="stats">${s.stats.map(st => `<div class="stat"><div class="v" data-count="${st.v}" data-prefix="${st.prefix || ""}" data-suffix="${st.suffix || ""}">${st.prefix || ""}0${st.suffix || ""}</div><div class="l">${st.label}</div></div>`).join("")}</div>` : ""}
      </div>`;
    wrap.appendChild(sl);
    dots.appendChild(el("i"));
  });
}
function showLoopSlide(n) {
  const slides = $("loopSlides").children, dots = $("loopDots").children;
  loop.i = (n + slides.length) % slides.length;
  [...slides].forEach((s, i) => {
    const on = i === loop.i; s.classList.toggle("on", on); dots[i].classList.toggle("on", on);
    if (on) { const bg = s.querySelector(".bg"); bg.style.animation = "none"; void bg.offsetWidth; bg.style.animation = ""; // restart Ken Burns
      s.querySelectorAll("[data-count]").forEach(countUp); }
  });
  const p = $("loopProgress"); p.style.transition = "none"; p.style.width = "0";
  requestAnimationFrame(() => requestAnimationFrame(() => { p.style.transition = `width ${settings.loopSlideSeconds}s linear`; p.style.width = "100%"; }));
  clearTimeout(loop.timer);
  loop.timer = setTimeout(() => showLoopSlide(loop.i + 1), settings.loopSlideSeconds * 1000);
}
function countUp(node) {
  const target = +node.dataset.count, pre = node.dataset.prefix, suf = node.dataset.suffix, t0 = performance.now(), dur = 1600;
  const tick = t => { const k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 3); node.textContent = pre + cz(Math.round(target * e)) + suf; if (k < 1) requestAnimationFrame(tick); };
  requestAnimationFrame(tick);
}
function startLoop() {
  loop.running = true; $("loop").classList.remove("hidden"); $("app").classList.add("hidden");
  showLoopSlide(0); stopIdle();
}
function stopLoop() {
  loop.running = false; clearTimeout(loop.timer); $("loop").classList.add("hidden"); $("app").classList.remove("hidden");
  startIdle();
}
$("loop").addEventListener("pointerdown", () => { stopLoop(); go("home"); });

/* =====================================================================
   NEČINNOST → smyčka
   ===================================================================== */
const idle = { t: 0, raf: null };
function startIdle() { idle.t = performance.now(); if (!idle.raf) idle.raf = requestAnimationFrame(idleTick); }
function stopIdle() { cancelAnimationFrame(idle.raf); idle.raf = null; }
function idleTick(now) {
  const k = Math.min(1, (now - idle.t) / (settings.idleSeconds * 1000));
  $("idleRing").style.strokeDashoffset = 100 - k * 100;
  if (k >= 1) { idle.raf = null; if (!$("admin").classList.contains("hidden")) { startIdle(); return; } startLoop(); return; }
  idle.raf = requestAnimationFrame(idleTick);
}
["pointerdown", "pointermove", "keydown", "wheel", "touchstart"].forEach(ev => document.addEventListener(ev, () => { if (!loop.running) idle.t = performance.now(); }, { passive: true }));

/* =====================================================================
   NAVIGACE
   ===================================================================== */
const ICONS = {
  home: '<path d="M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"/>',
  history: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  press: '<path d="M4 5h13v14H4z"/><path d="M17 8h3v9a2 2 0 0 1-2 2"/><path d="M7 9h7M7 13h7M7 16h4"/>',
  cap: '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L4 17l3 3 5.3-5.3a4 4 0 0 0 5.4-5.4l-2.4 2.4-2.1-2.1z"/>',
  energy: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  engine: '<rect x="3" y="8" width="14" height="10" rx="2"/><path d="M17 11h3v4h-3M7 8V5h4v3M10 11v4M13 11v4"/>',
  steps: '<path d="M4 18h4v-5H4zM10 18h4V9h-4zM16 18h4V4h-4z"/>',
  calc: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 7h8M8 12h2M12 12h2M16 12h0M8 16h2M12 16h2M16 16h0"/>',
  contact: '<path d="M4 6h16v12H4z"/><path d="M4 7l8 6 8-6"/>',
};
const SECTIONS = [
  ["home", "Domů"], ["history", "Historie"], ["press", "Psali o nás"], ["cap", "Co umíme"], ["energy", "Energie a dotace"],
  ["engine", "Tepelný motor"], ["steps", "4 kroky"], ["calc", "Kalkulačka"], ["contact", "Kontakt"],
];
const NAMES = Object.fromEntries(SECTIONS);
function buildNav() {
  SECTIONS.forEach(([id, name]) => {
    const b = el("button", id === "home" ? "home" : "", `<svg viewBox="0 0 24 24">${ICONS[id]}</svg><span>${name}</span>`);
    b.dataset.go = id; $("nav").appendChild(b);
  });
}
let current = "";
function go(id, opts = {}) {
  if (current === id && !opts.force) return;
  current = id;
  document.querySelectorAll(".page").forEach(p => p.classList.toggle("on", p.id === "p-" + id));
  document.querySelectorAll("#nav button").forEach(b => b.classList.toggle("on", b.dataset.go === id));
  $("sectName").textContent = NAMES[id];
  const page = $("p-" + id); page.scrollTop = 0;
  if (id === "energy") animateEnergy();
  if (id === "steps") showStep(opts.step || 1);
  if (id === "calc") calc();
}
document.addEventListener("click", e => {
  const b = e.target.closest("[data-go]"); if (b) { go(b.dataset.go); return; }
  const s = e.target.closest("[data-step]"); if (s) showStep(+s.dataset.step);
});

/* clock */
setInterval(() => { const d = new Date(); $("clock").textContent = d.toLocaleDateString("cs-CZ", { weekday: "short", day: "numeric", month: "numeric" }) + " · " + d.toLocaleTimeString("cs-CZ", { hour: "2-digit", minute: "2-digit" }); }, 1000);

/* =====================================================================
   DOMŮ
   ===================================================================== */
function buildHome() {
  $("homeFair").textContent = CONFIG.fairName + " · " + CONFIG.fairDates + " · " + CONFIG.stand;
  const tiles = [
    ["history", "assets/img/2016-dilna.jpg", "Historie", "Od kamenolomu z roku 1902 po dnešek"],
    ["press", "assets/img/pages/2019-1.jpg", "Psali o nás", "Technický magazín 2016–2025"],
    ["cap", "assets/img/2022-hcb110.jpg", "Co umíme", "Obrábění, svařování, stroje a linky"],
    ["energy", "assets/img/2016-areal.jpg", "Energie a dotace", "FVE až 300 kW, OP TAK, RES+"],
    ["engine", "assets/img/2024-motor-prototyp.jpg", "Tepelný plynový motor", "Vlastní vývoj s TU Liberec 2026–2029"],
    ["steps", "assets/img/2025-motor-3d-model.jpg", "Řešení ve 4 krocích", "Problém · schéma · ekonomika · návratnost"],
    ["calc", "assets/img/2023-svarovani.jpg", "Kalkulačka návratnosti", "Spočítejte si přínos odpadního tepla", true],
    ["contact", "assets/img/2019-jednaci-mistnost.jpg", "Kontakt", "Kde nás najdete na MSV"],
  ];
  tiles.forEach(([id, img, t, d, accent], i) => {
    const b = el("button", "tile" + (accent ? " accent" : ""), `<div class="bg" style="background-image:url('${img}')"></div><div class="shade"></div><div class="num">${i + 1}</div><div class="in"><div class="t">${t}</div><div class="d">${d}</div></div>`);
    b.dataset.go = id; $("homeTiles").appendChild(b);
  });
}

/* =====================================================================
   HISTORIE
   ===================================================================== */
let histI = 0;
function buildHistory() {
  TIMELINE.forEach((t, i) => { const b = el("button", "", t.y); b.addEventListener("click", () => showHist(i)); $("histYears").appendChild(b); });
  $("histPrev").addEventListener("click", () => showHist(histI - 1));
  $("histNext").addEventListener("click", () => showHist(histI + 1));
  showHist(0);
}
function showHist(i) {
  histI = (i + TIMELINE.length) % TIMELINE.length;
  const t = TIMELINE[histI];
  [...$("histYears").children].forEach((b, k) => { b.classList.toggle("on", k === histI); if (k === histI) b.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" }); });
  $("histDot").style.left = (100 * (t.y - 1902) / (2026 - 1902)) + "%";
  $("histYear").textContent = t.y; $("histTitle").textContent = t.t; $("histText").textContent = t.d;
  let img = t.img; if (!img) { for (let k = histI; k >= 0; k--) if (TIMELINE[k].img) { img = TIMELINE[k].img; break; } }
  $("histImg").src = img;
  const d = $("p-history").querySelector(".detail"); d.style.animation = "none"; void d.offsetWidth; d.style.animation = "fadeUp .4s both";
}

/* =====================================================================
   PSALI O NÁS
   ===================================================================== */
function buildPress() {
  ARTICLES.forEach((a, i) => { const b = el("button", "", a.y); b.addEventListener("click", () => showPress(i)); $("pressYears").appendChild(b); });
  showPress(ARTICLES.length - 1);
}
function showPress(i) {
  const a = ARTICLES[i];
  [...$("pressYears").children].forEach((b, k) => b.classList.toggle("on", k === i));
  $("pressSrc").textContent = a.src; $("pressTitle").textContent = a.title;
  $("pressPoints").innerHTML = a.points.map(p => `<li>${p}</li>`).join("");
  const ph = $("pressPhotos"); ph.innerHTML = "";
  a.photos.forEach((p, k) => { const im = el("img"); im.src = p; im.addEventListener("click", () => openLightbox(a.photos, k, a.y + " · " + a.title)); ph.appendChild(im); });
  const pg = $("pressPages"); pg.innerHTML = "";
  a.pages.forEach((p, k) => { const b = el("button", "", `<img src="${p}" alt=""><span>Stránka časopisu ${a.pages.length > 1 ? k + 1 : ""} – zvětšit</span>`); b.addEventListener("click", () => openLightbox(a.pages, k, a.src)); pg.appendChild(b); });
}

/* =====================================================================
   LIGHTBOX
   ===================================================================== */
const lb = { imgs: [], i: 0, cap: "" };
function openLightbox(imgs, i, cap) { lb.imgs = imgs; lb.i = i; lb.cap = cap; showLb(); $("lightbox").classList.remove("hidden"); }
function showLb() { $("lbImg").src = lb.imgs[lb.i]; $("lbCap").textContent = lb.cap + (lb.imgs.length > 1 ? ` (${lb.i + 1}/${lb.imgs.length})` : ""); const one = lb.imgs.length < 2; $("lbPrev").classList.toggle("hidden", one); $("lbNext").classList.toggle("hidden", one); }
$("lbClose").addEventListener("click", () => $("lightbox").classList.add("hidden"));
$("lbPrev").addEventListener("click", () => { lb.i = (lb.i - 1 + lb.imgs.length) % lb.imgs.length; showLb(); });
$("lbNext").addEventListener("click", () => { lb.i = (lb.i + 1) % lb.imgs.length; showLb(); });
$("lightbox").addEventListener("click", e => { if (e.target === $("lightbox") || e.target.id === "lbImg") $("lightbox").classList.add("hidden"); });

/* =====================================================================
   CO UMÍME
   ===================================================================== */
function buildCap() {
  CAPABILITIES.numbers.forEach(n => $("capNums").appendChild(el("div", "card", `<div class="v">${n.v}</div><div class="l">${n.l}</div>`)));
  CAPABILITIES.groups.forEach((g, i) => { const b = el("button", "", g.title); b.addEventListener("click", () => showCap(i)); $("capTabs").appendChild(b); });
  CAPABILITIES.gallery.forEach(([src, cap], k) => { const b = el("button", "", `<img src="${src}" alt="${cap}">`); b.addEventListener("click", () => openLightbox(CAPABILITIES.gallery.map(g => g[0]), k, cap)); $("capGallery").appendChild(b); });
  // popisky v lightboxu galerie
  showCap(0);
}
function showCap(i) {
  const g = CAPABILITIES.groups[i];
  [...$("capTabs").children].forEach((b, k) => b.classList.toggle("on", k === i));
  $("capList").innerHTML = g.items.map(x => `<li>${x}</li>`).join(""); $("capImg").src = g.img;
}

/* =====================================================================
   ENERGIE
   ===================================================================== */
function buildEnergy() {
  $("energyIntro").textContent = ENERGY.intro;
  ENERGY.pv.forEach(p => $("pvBars").appendChild(el("div", "bar", `<div class="col" data-kw="${p.kw}"><b>${p.kw} kW</b></div><div class="y">${p.y}</div><div class="l">${p.l}</div>`)));
  $("co2f").textContent = ENERGY.co2.fossil; $("co2p").textContent = ENERGY.co2.pv;
  $("gaugeSub").textContent = `Spotřeba cca ${ENERGY.consumptionMWh} MWh/rok, dnes ${ENERGY.ownMWhToday} MWh z vlastní FVE`;
  ENERGY.grants.forEach(g => $("grants").appendChild(el("div", "g", `<span class="pill green">${g.tag}</span><b style="margin-top:.5rem">${g.n}</b><p>${g.d}</p>`)));
}
function animateEnergy() {
  const max = Math.max(...ENERGY.pv.map(p => p.kw));
  document.querySelectorAll("#pvBars .col").forEach(c => { c.style.height = "0"; setTimeout(() => c.style.height = (100 * c.dataset.kw / max * 0.85) + "%", 60); });
  const ring = $("gaugeRing"); ring.style.strokeDasharray = "0 100"; setTimeout(() => ring.style.strokeDasharray = `${ENERGY.targetShare} 100`, 80);
}

/* =====================================================================
   MOTOR
   ===================================================================== */
function buildEngine() {
  $("engineLead").textContent = ENGINE.lead;
  ENGINE.imgs.forEach((s, k) => { const im = el("img"); im.src = s; im.addEventListener("click", () => openLightbox(ENGINE.imgs, k, "Tepelný plynový motor – vývoj Strojírny Olšovec")); $("engineImgs").appendChild(im); });
  ENGINE.features.forEach(f => $("engineFeat").appendChild(el("div", "f", `<div class="i">${f.i}</div><div><b>${f.t}</b><p>${f.d}</p></div>`)));
  ENGINE.roadmap.forEach((r, i) => $("engineRoad").appendChild(el("div", "r" + (i === 2 ? " now" : ""), `<div class="y">${r.y}</div><b>${r.t}</b><p>${r.d}</p>`)));
}

/* =====================================================================
   4 KROKY
   ===================================================================== */
let stepI = 1, moneyT0 = 0, moneyRaf = null;
function buildSteps() {
  const names = [STEPS.problem.title, STEPS.solution.title, STEPS.economics.title, "Návratnost"];
  names.forEach((n, i) => { const b = el("button", "", `<i>${i + 1}</i><span>${n}</span>`); b.addEventListener("click", () => showStep(i + 1)); $("stepNav").appendChild(b); });
  $("problemText").innerHTML = STEPS.problem.lines.map(l => `<p>${l.replace(/(1 MW tepelného výkonu|100 kW elektřiny|350 Kč každou hodinu|3,50 Kč\/kWh)/g, "<b>$1</b>")}</p>`).join("");
  // obláčky tepla
  const ch = $("chimney"); for (let i = 0; i < 4; i++) { const p = el("div", "puff"); p.style.left = "calc(72% + " + (i * 1.2 - 2) + "rem)"; p.style.bottom = "70%"; p.style.animationDelay = (i * 0.8) + "s"; ch.appendChild(p); }
  $("nofuel").innerHTML = STEPS.solution.bullets.map(b => `<div class="n"><i>✔</i>${b}</div>`).join("");
  $("assump").innerHTML = STEPS.economics.assumptions.map(a => `<div class="a"><div class="v">${a.v}</div><div class="l">${a.l}</div></div>`).join("");
  $("formula").innerHTML = `<div class="box">100 kW<small>výkon</small></div><span class="op">×</span><div class="box">7 500 h/rok<small>dostupnost</small></div><span class="op">=</span><div class="box">750 MWh<small>elektřiny ročně</small></div><span class="op">×</span><div class="box">3,50 Kč<small>za kWh</small></div><span class="op">−</span><div class="box">200 000 Kč<small>servis</small></div><span class="op">=</span><div class="box res">2,43 mil. Kč<small>čistý roční efekt</small></div>`;
  $("econNote").innerHTML = `<b>${STEPS.economics.note}</b> Prodejní cena do sítě je výrazně nižší než hodnota elektřiny, kterou nemusíte nakoupit.`;
  STEPS.cases.forEach((c, i) => { const b = el("button", "c", `<div class="h"><span>${c.i}</span>${c.n}</div><table><tr><td>Investice</td><td>6 000 000 Kč</td></tr><tr><td>Vyrobená elektřina</td><td>cca ${c.mwh} MWh/rok</td></tr><tr><td>Hodnota</td><td>cca ${c.value}/rok</td></tr><tr><td>Čistý roční efekt</td><td>cca ${c.net}</td></tr></table><div class="pb">Návratnost<b>${c.payback}</b></div><div class="go">Otevřít v kalkulačce ›</div>`); b.addEventListener("click", () => { applyDemo(CALC_DEFAULTS.demos[i]); go("calc"); }); $("cases").appendChild(b); });
  $("closingText").textContent = STEPS.closing;
}
function showStep(n) {
  stepI = n;
  for (let i = 1; i <= 4; i++) $("step" + i).classList.toggle("on", i === n);
  [...$("stepNav").children].forEach((b, k) => b.classList.toggle("on", k + 1 === n));
  $("p-steps").scrollTop = 0;
  cancelAnimationFrame(moneyRaf);
  if (n === 1) { moneyT0 = performance.now(); const tick = t => { const kc = (t - moneyT0) / 3600000 * STEPS.problem.hourly; $("moneyCounter").textContent = cz(kc, 2) + " Kč"; moneyRaf = requestAnimationFrame(tick); }; moneyRaf = requestAnimationFrame(tick); }
}

/* =====================================================================
   KALKULAČKA
   ===================================================================== */
const F = { // hodnota, min, max, krok, desetinná místa
  heat: { v: 1, min: 0.1, max: 50, step: 0.1, d: 1 }, unused: { v: 100, min: 5, max: 100, step: 5, d: 0 }, hours: { v: 7500, min: 500, max: 8760, step: 250, d: 0 }, price: { v: 3.5, min: 0.5, max: 15, step: 0.1, d: 2 },
  flow: { v: 100000, min: 100, max: 5e6, step: 5000, d: 0 }, tin: { v: 120, min: -20, max: 1500, step: 5, d: 0 }, tout: { v: 70, min: -20, max: 1500, step: 5, d: 0 }, density: { v: 1.0, min: 0.05, max: 2000, step: 0.05, d: 2 }, cp: { v: 1.05, min: 0.1, max: 10, step: 0.05, d: 2 }, techHours: { v: 7000, min: 500, max: 8760, step: 250, d: 0 }, techPrice: { v: 3.5, min: 0.5, max: 15, step: 0.1, d: 2 },
};
const cs = { tab: "quick", src: CALC_DEFAULTS.sources[0], medium: "air", last: null };
function buildCalc() {
  CALC_DEFAULTS.sources.forEach(s => { const b = el("button", "", s); b.addEventListener("click", () => { cs.src = s; renderChoices(); calc(); }); $("srcChoices").appendChild(b); });
  [["air", "Vzduch / suché spaliny"], ["water", "Voda"]].forEach(([v, n]) => { const b = el("button", "", n); b.dataset.v = v; b.addEventListener("click", () => { cs.medium = v; if (v === "water") { F.density.v = 985; F.cp.v = 4.18; } else { F.density.v = 1.0; F.cp.v = 1.05; } renderChoices(); renderFields(); calc(); }); $("mediumChoices").appendChild(b); });
  CALC_DEFAULTS.demos.forEach(d => { const b = el("button", "btn", "Demo: " + d.n); b.addEventListener("click", () => applyDemo(d)); $("demos").appendChild(b); });
  document.querySelectorAll("#p-calc .field[data-f]").forEach(f => {
    const id = f.dataset.f, spec = F[id];
    f.querySelectorAll(".step").forEach(b => b.addEventListener("click", () => { setF(id, spec.v + spec.step * +b.dataset.d); }));
    f.querySelector(".val").addEventListener("click", () => openNumpad(id, f.querySelector("label").textContent, f.querySelector("small").textContent));
    const pr = f.querySelector(".presets"); if (pr) pr.dataset.p.split(",").forEach(p => { const b = el("button", "", cz(+p, +p % 1 ? 1 : 0)); b.dataset.v = p; b.addEventListener("click", () => setF(id, +p)); pr.appendChild(b); });
  });
  document.querySelectorAll("#p-calc .tabs button").forEach(b => b.addEventListener("click", () => { cs.tab = b.dataset.ctab; document.querySelectorAll("#p-calc .tabs button").forEach(x => x.classList.toggle("on", x === b)); $("quickPane").classList.toggle("hidden", cs.tab !== "quick"); $("techPane").classList.toggle("hidden", cs.tab !== "tech"); calc(); }));
  renderChoices(); renderFields(); calc();
  window.addEventListener("resize", () => { if (cs.last) drawChart(); });
}
function setF(id, v) { const s = F[id]; s.v = Math.min(s.max, Math.max(s.min, Math.round(v / s.step) * s.step)); s.v = +s.v.toFixed(4); renderFields(); calc(); }
function renderFields() { document.querySelectorAll("#p-calc .field[data-f]").forEach(f => { const s = F[f.dataset.f]; f.querySelector(".n").textContent = cz(s.v, s.d); f.querySelectorAll(".presets button").forEach(b => b.classList.toggle("on", Math.abs(+b.dataset.v - s.v) < 1e-9)); }); }
function renderChoices() { [...$("srcChoices").children].forEach(b => b.classList.toggle("on", b.textContent === cs.src)); [...$("mediumChoices").children].forEach(b => b.classList.toggle("on", b.dataset.v === cs.medium)); }
function applyDemo(d) { cs.tab = "quick"; document.querySelectorAll("#p-calc .tabs button").forEach(x => x.classList.toggle("on", x.dataset.ctab === "quick")); $("quickPane").classList.remove("hidden"); $("techPane").classList.add("hidden"); cs.src = d.src; F.heat.v = d.heat; F.unused.v = d.unused; F.hours.v = d.hours; F.price.v = d.price; renderChoices(); renderFields(); calc(); }

function calc() {
  let heatMW, hours, price, src;
  if (cs.tab === "quick") { heatMW = F.heat.v * F.unused.v / 100; hours = F.hours.v; price = F.price.v; src = cs.src; }
  else { const dt = Math.max(0, F.tin.v - F.tout.v); const kgS = F.flow.v * F.density.v / 3600; heatMW = kgS * F.cp.v * dt / 1000; hours = F.techHours.v; price = F.techPrice.v; src = "Technická kalkulace z průtoku média"; }
  const eff = settings.eff / 100, modP = Math.max(1, settings.modulePower), modC = settings.moduleCapex, modO = settings.moduleOpex;
  const kW = heatMW * 1000 * eff;
  const modules = kW > 0 ? Math.max(1, Math.ceil(kW / modP)) : 0;
  const prod = kW * hours, gross = prod * price, opex = modules * modO, net = gross - opex, capex = modules * modC, payback = net > 0 ? capex / net : Infinity, hourly = kW * price;
  cs.last = { heatMW, hours, price, src, kW, modules, prod, gross, opex, net, capex, payback, hourly };
  $("rPower").textContent = cz(kW) + " kW"; $("rConfig").textContent = modules ? `${modules} × ${cz(modP)} kWe modul${modules > 1 ? "y" : ""}` : "—";
  $("rEnergy").textContent = cz(prod / 1000) + " MWh"; $("rGross").textContent = mil(gross); $("rNet").textContent = mil(net); $("rCapex").textContent = mil(capex); $("rHourly").textContent = cz(hourly) + " Kč";
  $("rPayback").textContent = isFinite(payback) ? cz(payback, 1) + " roku" : "—";
  $("interp").innerHTML = `<b>Interpretace:</b> ${src} · z <b>${cz(heatMW, 2)} MW</b> skutečně dostupného odpadního tepla při ${cz(eff * 100, 1)} % čisté elektrické účinnosti vychází přibližně <b>${cz(kW)} kW</b> elektrického výkonu při ${cz(hours)} h/rok. Orientační investice: ${modules} modul${modules === 1 ? "" : modules < 5 ? "y" : "ů"} po ${mil(modC)}.`;
  drawChart();
}
function drawChart() {
  const c = $("chart"), r = c.getBoundingClientRect(); const dpr = window.devicePixelRatio || 1;
  c.width = Math.max(300, r.width * dpr); c.height = Math.max(150, r.height * dpr);
  const ctx = c.getContext("2d"); ctx.scale(dpr, dpr); const w = r.width, h = r.height, d = cs.last;
  ctx.clearRect(0, 0, w, h);
  const years = 10, vals = []; for (let y = 0; y <= years; y++) vals.push(-d.capex + d.net * y);
  const min = Math.min(...vals, 0), max = Math.max(...vals, 0), pad = { l: 96, r: 18, t: 30, b: 28 };
  const x = y => pad.l + (w - pad.l - pad.r) * y / years, yv = v => h - pad.b - (h - pad.t - pad.b) * (v - min) / ((max - min) || 1);
  const fs = Math.max(10, w / 48);
  ctx.font = `${fs}px Segoe UI, Arial`; ctx.fillStyle = "#a7b6c2"; ctx.strokeStyle = "#2e3d4b"; ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) { const v = min + (max - min) * i / 4, yy = yv(v); ctx.beginPath(); ctx.moveTo(pad.l, yy); ctx.lineTo(w - pad.r, yy); ctx.stroke(); ctx.textAlign = "right"; ctx.fillText(cz(v / 1e6, 1) + " mil.", pad.l - 6, yy + fs / 3); }
  ctx.strokeStyle = "#8aa0ac"; ctx.beginPath(); ctx.moveTo(pad.l, yv(0)); ctx.lineTo(w - pad.r, yv(0)); ctx.stroke();
  ctx.textAlign = "center"; for (let i = 0; i <= years; i += 2) ctx.fillText(i + ". rok", x(i), h - 8);
  ctx.textAlign = "left"; ctx.fillStyle = "#dbe4ec"; ctx.font = `bold ${fs}px Segoe UI, Arial`; ctx.fillText("Kumulovaný efekt investice (Kč)", pad.l, fs + 4);
  // plocha
  const grad = ctx.createLinearGradient(0, pad.t, 0, h - pad.b); grad.addColorStop(0, "rgba(56,211,159,.35)"); grad.addColorStop(1, "rgba(56,211,159,0)");
  ctx.beginPath(); ctx.moveTo(x(0), yv(0)); vals.forEach((v, i) => ctx.lineTo(x(i), yv(v))); ctx.lineTo(x(years), yv(0)); ctx.closePath(); ctx.fillStyle = grad; ctx.fill();
  ctx.strokeStyle = "#38d39f"; ctx.lineWidth = 4; ctx.lineJoin = "round"; ctx.beginPath(); vals.forEach((v, i) => i ? ctx.lineTo(x(i), yv(v)) : ctx.moveTo(x(i), yv(v))); ctx.stroke();
  if (isFinite(d.payback) && d.payback <= years) { const px = x(d.payback), py = yv(0); ctx.fillStyle = "#ffc36b"; ctx.beginPath(); ctx.arc(px, py, 7, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = "#ffc36b"; ctx.font = `bold ${fs}px Segoe UI, Arial`; ctx.textAlign = px > w * 0.7 ? "right" : "left"; ctx.fillText("návratnost " + cz(d.payback, 1) + " r.", px + (px > w * 0.7 ? -12 : 12), py - 12); }
}

/* ---------- numerická klávesnice ---------- */
const np = { id: null, buf: "", cb: null };
function openNumpad(id, label, unit, cb) {
  np.id = id; np.cb = cb || null; np.buf = ""; $("npLabel").textContent = label; $("npUnit").textContent = unit;
  const cur = cb ? cb.get() : F[id].v; $("npDisp").textContent = cz(cur, cb ? 0 : F[id].d); $("npDisp").style.color = "#a7b6c2";
  $("numpad").classList.remove("hidden");
}
function buildNumpad() {
  const keys = ["7", "8", "9", "4", "5", "6", "1", "2", "3", ",", "0", "⌫", "Zrušit", "OK"];
  keys.forEach(k => { const b = el("button", k === "OK" ? "ok" : k === "Zrušit" ? "x" : k === "⌫" ? "c" : "", k); b.addEventListener("click", () => npKey(k)); $("npKeys").appendChild(b); });
}
function npKey(k) {
  if (k === "Zrušit") { $("numpad").classList.add("hidden"); return; }
  if (k === "OK") { const v = parseFloat(np.buf.replace(",", ".")); if (np.buf && !isNaN(v)) { if (np.cb) np.cb.set(v); else setF(np.id, v); } $("numpad").classList.add("hidden"); return; }
  if (k === "⌫") np.buf = np.buf.slice(0, -1);
  else if (k === ",") { if (!np.buf.includes(",")) np.buf = (np.buf || "0") + ","; }
  else if (np.buf.length < 10) np.buf += k;
  $("npDisp").textContent = np.buf || "0"; $("npDisp").style.color = "#fff";
}

/* =====================================================================
   ADMIN – dlouhý stisk loga (3 s)
   ===================================================================== */
const ADMIN_FIELDS = [["idleSeconds", "Návrat do smyčky po nečinnosti", "s"], ["loopSlideSeconds", "Délka snímku smyčky", "s"], ["eff", "Čistá elektrická účinnost", "%"], ["modulePower", "Jmenovitý výkon modulu", "kWe"], ["moduleCapex", "Cena 1 modulu", "Kč"], ["moduleOpex", "Roční servis 1 modulu", "Kč/rok"]];
function buildAdmin() {
  buildAdminFieldsOnly();
  $("adminClose").addEventListener("click", () => { saveSettings(); $("admin").classList.add("hidden"); calc(); });
  $("adminReset").addEventListener("click", () => { Object.assign(settings, { idleSeconds: CONFIG.idleSeconds, loopSlideSeconds: CONFIG.loopSlideSeconds, eff: CALC_DEFAULTS.eff, modulePower: CALC_DEFAULTS.modulePower, moduleCapex: CALC_DEFAULTS.moduleCapex, moduleOpex: CALC_DEFAULTS.moduleOpex }); saveSettings(); $("adminFields").innerHTML = ""; buildAdminFieldsOnly(); });
  $("adminFs").addEventListener("click", () => { if (!document.fullscreenElement) document.documentElement.requestFullscreen?.(); else document.exitFullscreen?.(); });
  let pressT = null;
  const logo = $("logoBtn");
  logo.addEventListener("pointerdown", () => { pressT = setTimeout(() => { $("admin").classList.remove("hidden"); }, 3000); });
  ["pointerup", "pointerleave", "pointercancel"].forEach(ev => logo.addEventListener(ev, () => clearTimeout(pressT)));
  logo.addEventListener("click", () => go("home"));
}
function buildAdminFieldsOnly() { ADMIN_FIELDS.forEach(([k, l, u]) => { const f = el("div", "field", `<label>${l}</label><div class="row"><div class="val"><span class="n">${cz(settings[k])}</span><small>${u}</small></div></div>`); f.querySelector(".val").addEventListener("click", () => openNumpad(null, l, u, { get: () => settings[k], set: v => { settings[k] = v; f.querySelector(".n").textContent = cz(v); } })); $("adminFields").appendChild(f); }); }

/* =====================================================================
   KONTAKT + START
   ===================================================================== */
function buildContact() {
  $("cAddress").textContent = CONFIG.address; $("cWeb").textContent = CONFIG.web; $("cPhone").textContent = CONFIG.phone; $("cEmail").textContent = CONFIG.email; $("cDirector").textContent = CONFIG.director;
  $("cFair").textContent = CONFIG.fairName + " · " + CONFIG.fairDates; $("cStand").textContent = "Stánek: " + CONFIG.stand;
}
document.addEventListener("keydown", e => { if (e.key === "Escape") { $("lightbox").classList.add("hidden"); $("numpad").classList.add("hidden"); } if (e.key === "l" && e.ctrlKey) startLoop(); });
document.addEventListener("contextmenu", e => e.preventDefault());

buildLoop(); buildNav(); buildHome(); buildHistory(); buildPress(); buildCap(); buildEnergy(); buildEngine(); buildSteps(); buildCalc(); buildNumpad(); buildAdmin(); buildContact();
startLoop();
})();
