/* =====================================================================
   Strojírny Olšovec – prezentace MSV 2026 – logika
   Prezentace běží sama ve smyčce. Dotyk obrazovky otevře kalkulačku,
   po nečinnosti se kalkulačka zavře a prezentace pokračuje.
   ===================================================================== */
(() => {
"use strict";
const $ = id => document.getElementById(id);
const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };
const cz = (n, d = 0) => (isFinite(n) ? n : 0).toLocaleString("cs-CZ", { minimumFractionDigits: d, maximumFractionDigits: d });
const mil = n => cz(n / 1e6, 2) + " mil. Kč";
const filled = s => s && !/DOPLNIT/.test(s);   // placeholdery se na obrazovce nezobrazují

/* ---------- nastavení (data.js + localStorage) ---------- */
const SETTINGS_KEY = "so-msv-settings-v2";
const DEFAULTS = { slideSeconds: CONFIG.slideSeconds, calcIdleSeconds: CONFIG.calcIdleSeconds, eff: CALC_DEFAULTS.eff, modulePower: CALC_DEFAULTS.modulePower, moduleCapex: CALC_DEFAULTS.moduleCapex, moduleOpex: CALC_DEFAULTS.moduleOpex };
const settings = Object.assign({}, DEFAULTS);
try { Object.assign(settings, JSON.parse(localStorage.getItem(SETTINGS_KEY) || "{}")); } catch (e) {}
const saveSettings = () => { try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings)); } catch (e) {} };

/* =====================================================================
   ŠABLONY SNÍMKŮ – každá vrací { html, enter?, leave? }
   Prvky s třídou .a se po zobrazení snímku postupně objeví (--d = zpoždění).
   ===================================================================== */
const d = s => `style="--d:${s}s"`;
const statsHtml = stats => `<div class="stats">${stats.map((st, i) => `<div class="stat a" ${d(1 + i * .25)}><div class="v" data-count="${st.v}" data-plain="${st.plain ? 1 : ""}" data-prefix="${st.prefix || ""}" data-suffix="${st.suffix || ""}">${st.prefix || ""}0${st.suffix || ""}</div><div class="l">${st.label}</div></div>`).join("")}</div>`;
const stepHead = n => `<div class="stephead a" ${d(0)}><div class="dots">${[1, 2, 3, 4].map(k => `<i class="${k === n ? "on" : k < n ? "done" : ""}">${k}</i>`).join("")}</div><div><div class="kicker">Krok ${n} ze 4 · ${STEPS.title}</div><h2>${[STEPS.problem.title, STEPS.solution.title, STEPS.economics.title, "Návratnost investice"][n - 1]}</h2></div></div>`;

const TEMPLATES = {
  intro: () => ({ html: `
    <div class="bg kb" style="background-image:url('${INTRO.img}')"></div><div class="shade"></div>
    <div class="hero-in">
      <div class="logo-big a" ${d(.1)}><img src="assets/img/logo.png" alt=""></div>
      <div class="kicker a" ${d(.3)}>${INTRO.kicker}</div>
      <h1 class="a" ${d(.5)}>${INTRO.title}</h1>
      <div class="sub a" ${d(.8)}>${INTRO.sub}</div>
      ${statsHtml(INTRO.stats)}
    </div>` }),

  history: () => ({ html: `
    <div class="bg kb dim" style="background-image:url('${HISTORY.img}')"></div><div class="shade full"></div>
    <div class="body">
      <div class="kicker a" ${d(0)}>Historie</div>
      <h2 class="a" ${d(.2)}>${HISTORY.title}</h2>
      <div class="tl">
        <div class="line a grow" ${d(.5)}></div>
        ${HISTORY.items.map((it, i) => `<div class="it ${i % 2 ? "dn" : "up"} a" style="--d:${1 + i * .9}s;left:${8 + i * (84 / (HISTORY.items.length - 1))}%"><i></i><b>${it.y}</b><span>${it.t}</span></div>`).join("")}
      </div>
    </div>` }),

  pressIntro: () => ({ html: `
    <div class="body center">
      <div class="kicker a" ${d(0)}>${PRESS_INTRO.kicker}</div>
      <h1 class="a" ${d(.2)}>${PRESS_INTRO.title}</h1>
      <div class="sub a" ${d(.4)}>${PRESS_INTRO.sub}</div>
      <div class="fan">${ARTICLES.map((a, i) => { const n = ARTICLES.length, r = (i - (n - 1) / 2) * 5; return `<div class="pg a" style="--d:${.6 + i * .18}s;--r:${r}deg;--y:${Math.abs(r) * .25}rem"><img src="${a.pages[0]}" alt=""><b>${a.y}</b></div>`; }).join("")}</div>
    </div>` }),

  article: s => {
    const a = ARTICLES.find(x => x.y === s.y);
    let t = null;
    return {
      html: `
      <div class="body split">
        <div class="txt">
          <div class="src a" ${d(0)}>Psali o nás · ${a.src}</div>
          <div class="year a" ${d(.1)}>${a.y}</div>
          <h2 class="a" ${d(.3)}>${a.title}</h2>
          <ul>${a.points.map((p, i) => `<li class="a" ${d(1 + i * .7)}>${p}</li>`).join("")}</ul>
        </div>
        <div class="vis a" ${d(.2)}>
          <div class="photos">${a.photos.map((p, i) => `<div class="ph${i === 0 ? " on" : ""}" style="background-image:url('${p}')"></div>`).join("")}</div>
          <div class="mag a" ${d(1.2)}><img src="${a.pages[0]}" alt=""><span>${a.src}</span></div>
        </div>
      </div>`,
      enter(node, sec) {
        const phs = node.querySelectorAll(".ph"); let k = 0;
        phs.forEach((p, i) => p.classList.toggle("on", i === 0));
        const every = sec * 1000 / phs.length;
        t = setInterval(() => { phs[k].classList.remove("on"); k = (k + 1) % phs.length; phs[k].classList.add("on"); }, every);
      },
      leave() { clearInterval(t); },
    };
  },

  energy: () => {
    const max = Math.max(...ENERGY.pv.map(p => p.kw));
    return {
      html: `
      <div class="body">
        <div class="kicker a" ${d(0)}>${ENERGY.kicker}</div>
        <h2 class="a" ${d(.2)}>${ENERGY.title}</h2>
        <p class="lead a" ${d(.4)}>${ENERGY.intro}</p>
        <div class="cols">
          <div class="card a" ${d(.7)}>
            <h3>Vlastní fotovoltaika – instalovaný výkon</h3>
            <div class="bars">${ENERGY.pv.map((p, i) => `<div class="bar"><div class="col" style="--h:${(100 * p.kw / max * .85).toFixed(1)}%;--d:${1.2 + i * .6}s"><b>${p.kw} kW</b></div><div class="y">${p.y}</div><div class="l">${p.l}</div></div>`).join("")}</div>
          </div>
          <div class="card a" ${d(1.4)}>
            <h3>Cíl: ${ENERGY.targetShare} % vlastní elektřiny</h3>
            <div class="gauge">
              <svg viewBox="0 0 36 36"><circle cx="18" cy="18" r="15.9" fill="none" stroke="#2e3d4b" stroke-width="3.5"/><circle class="ring" cx="18" cy="18" r="15.9" fill="none" stroke="#38d39f" stroke-width="3.5" stroke-linecap="round" pathLength="100" style="--p:${ENERGY.targetShare}" transform="rotate(-90 18 18)"/><text x="18" y="21" text-anchor="middle" font-size="8" font-weight="800" fill="#8be8ca">${ENERGY.targetShare} %</text></svg>
              <div class="muted">Spotřeba cca ${cz(ENERGY.consumptionMWh)} MWh/rok,<br>dnes ${ENERGY.ownMWhToday} MWh z vlastní FVE</div>
            </div>
            <div class="co2">
              <div class="box f"><div class="v">${ENERGY.co2.fossil}</div><div class="muted">kg CO₂ / MWh<br>z fosilních paliv</div></div>
              <div class="box p"><div class="v">${ENERGY.co2.pv}</div><div class="muted">kg CO₂ / MWh<br>z fotovoltaiky</div></div>
            </div>
          </div>
          <div class="card hl a" ${d(2.2)}>
            <div class="bignum">−20 %</div><div class="muted">uhlíková stopa firmy již dnes</div>
            <div class="bignum" style="margin-top:1.4rem">${ENERGY.savingMWh} MWh</div><div class="muted">roční úspora primární energie po stavebních úpravách hal (OP TAK)</div>
          </div>
        </div>
      </div>` };
  },

  grants: () => ({ html: `
    <div class="body">
      <div class="kicker a" ${d(0)}>${ENERGY.kicker} · fondy EU a výzkum</div>
      <h2 class="a" ${d(.2)}>Projekty, na kterých pracujeme</h2>
      <div class="grants">${ENERGY.grants.map((g, i) => `<div class="g a" ${d(.6 + i * .45)}><span class="pill green">${g.tag}</span><b>${g.n}</b><p>${g.d}</p></div>`).join("")}</div>
    </div>` }),

  engine: () => ({ html: `
    <div class="body split rev">
      <div class="vis a" ${d(.1)}><div class="photos"><div class="ph on kb" style="background-image:url('${ENGINE.img}')"></div></div><div class="mag photo a" ${d(1)}><img src="${ENGINE.img2}" alt=""><span>3D model</span></div></div>
      <div class="txt">
        <div class="kicker a" ${d(.2)}>${ENGINE.kicker}</div>
        <h2 class="a" ${d(.4)}>${ENGINE.title}</h2>
        <p class="lead a" ${d(.7)}>${ENGINE.lead}</p>
        <div class="feat">${ENGINE.features.map((f, i) => `<div class="f a" ${d(1.3 + i * .5)}><div class="i">${f.i}</div><div><b>${f.t}</b><p>${f.d}</p></div></div>`).join("")}</div>
      </div>
    </div>` }),

  roadmap: () => ({ html: `
    <div class="bg kb dim" style="background-image:url('${ENGINE.img2}')"></div><div class="shade full"></div>
    <div class="body">
      <div class="kicker a" ${d(0)}>Tepelný plynový motor</div>
      <h2 class="a" ${d(.2)}>${ENGINE.roadmapTitle}</h2>
      <div class="road">${ENGINE.roadmap.map((r, i) => `<div class="r${r.now ? " now" : ""} a" ${d(.8 + i * .8)}><div class="y">${r.y}</div><b>${r.t}</b><p>${r.d}</p></div>`).join("")}</div>
    </div>` }),

  step1: () => ({ html: `
    <div class="body">
      ${stepHead(1)}
      <div class="split2">
        <div class="bigtext">${STEPS.problem.lines.map((l, i) => `<p class="a" ${d(.6 + i * 1.4)}>${l.replace(/(1 MW tepelného výkonu|100 kW elektřiny|350 Kč každou hodinu|3,50 Kč\/kWh)/g, "<b>$1</b>")}</p>`).join("")}</div>
        <div class="chimney a" ${d(.4)}>
          ${$("tplChimney").innerHTML}
          <div class="money">
            <div class="m a" ${d(2)}><div class="v" data-count="${STEPS.problem.hourly}" data-suffix=" Kč">0 Kč</div><div class="l">každou hodinu</div></div>
            <div class="m a" ${d(3)}><div class="v" data-count="${STEPS.problem.hourly * 24}" data-suffix=" Kč">0 Kč</div><div class="l">každý den nepřetržitého provozu</div></div>
            <div class="m a" ${d(4)}><div class="v" data-count="${STEPS.problem.hourly * 7500}" data-suffix=" Kč">0 Kč</div><div class="l">ročně při 7 500 h provozu</div></div>
          </div>
        </div>
      </div>
    </div>` }),

  step2: () => ({ html: `
    <div class="body">
      ${stepHead(2)}
      <div class="schema a" ${d(.3)}>${$("tplSchema").innerHTML}</div>
      <div class="nofuel">${STEPS.solution.bullets.map((b, i) => `<div class="n a" ${d(4.6 + i * .4)}><i>✔</i>${b}</div>`).join("")}</div>
    </div>` }),

  step3: () => ({ html: `
    <div class="body">
      ${stepHead(3)}
      <div class="assump">${STEPS.economics.assumptions.map((a, i) => `<div class="x a" ${d(.5 + i * .3)}><div class="v">${a.v}</div><div class="l">${a.l}</div></div>`).join("")}</div>
      <div class="formula">${[["100 kW", "výkon"], "×", ["7 500 h/rok", "dostupnost"], "=", ["750 MWh", "elektřiny ročně"], "×", ["3,50 Kč", "za kWh"], "−", ["200 000 Kč", "servis"], "="].map((x, i) => typeof x === "string" ? `<span class="op a" ${d(2 + i * .3)}>${x}</span>` : `<div class="box a" ${d(2 + i * .3)}>${x[0]}<small>${x[1]}</small></div>`).join("")}<div class="box res a" ${d(5.6)}>2,43 mil. Kč<small>čistý roční efekt</small></div></div>
      <div class="closing a" ${d(6.4)}><b>${STEPS.economics.note}</b> Prodejní cena do sítě je výrazně nižší než hodnota elektřiny, kterou nemusíte nakoupit.</div>
    </div>` }),

  step4: () => ({ html: `
    <div class="body">
      ${stepHead(4)}
      <p class="lead a" ${d(.3)}>Výkon 100 kW · investice 6 mil. Kč · 3,50 Kč/kWh · servis 200 000 Kč/rok</p>
      <div class="cases">${STEPS.cases.map((c, i) => `<div class="c a" ${d(.8 + i * .7)}><div class="h"><span>${c.i}</span>${c.n}</div><table><tr><td>Vyrobená elektřina</td><td>cca ${c.mwh} MWh/rok</td></tr><tr><td>Hodnota</td><td>cca ${c.value}/rok</td></tr><tr><td>Čistý roční efekt</td><td>cca ${c.net}</td></tr></table><div class="pb">Návratnost<b>${c.payback}</b></div></div>`).join("")}</div>
      <div class="closing a" ${d(3.4)}>${STEPS.closing}</div>
    </div>` }),

  cta: () => {
    const rows = [["📍", "Stánek: " + CONFIG.stand], ["🌐", CONFIG.web], ["📞", CONFIG.phone], ["✉️", CONFIG.email]].filter(r => filled(r[1]));
    return { html: `
    <div class="bg kb" style="background-image:url('${CTA.img}')"></div><div class="shade"></div>
    <div class="hero-in">
      <div class="kicker a" ${d(.1)}>${CTA.kicker}</div>
      <h1 class="a" ${d(.3)}>${CTA.title}</h1>
      <div class="sub a" ${d(.6)}>${CTA.sub}</div>
      <div class="bigtouch a" ${d(1)}><span class="hand">👆</span>Dotkněte se obrazovky</div>
      <div class="contact a" ${d(1.6)}>${rows.map(r => `<span><i>${r[0]}</i>${r[1]}</span>`).join("")}</div>
    </div>` };
  },
};

/* =====================================================================
   PŘEHRÁVAČ
   ===================================================================== */
const show = { i: -1, timer: null, paused: false, slides: [] };
const CHAPTERS = [...new Set(SEQUENCE.map(s => s.chapter))];
const secOf = s => Math.max(3, settings.slideSeconds * (s.k || 1));

function buildShow() {
  $("topFair").textContent = CONFIG.fairName;
  $("topFairSub").textContent = CONFIG.fairDates + " · " + CONFIG.stand;
  SEQUENCE.forEach(s => {
    const t = TEMPLATES[s.type](s);
    const node = el("div", "s s-" + s.type, t.html);
    $("slides").appendChild(node);
    show.slides.push({ node, spec: s, t });
  });
  CHAPTERS.forEach(c => {
    const n = SEQUENCE.filter(s => s.chapter === c).length;
    const seg = el("div", "seg", `<div class="fill"><i></i></div><span>${c}</span>`);
    seg.style.flex = String(n + 2);
    $("chapters").appendChild(seg);
  });
}

function goSlide(n) {
  const len = show.slides.length;
  const prev = show.slides[show.i];
  if (prev) { prev.node.classList.remove("on"); prev.t.leave?.(prev.node); }
  show.i = (n + len) % len;
  const cur = show.slides[show.i], sec = secOf(cur.spec);
  cur.node.classList.remove("on"); void cur.node.offsetWidth; cur.node.classList.add("on");   // restart animací
  cur.node.querySelectorAll("[data-count]").forEach(nd => {
    const host = nd.closest(".a"), delay = host ? parseFloat(getComputedStyle(host).getPropertyValue("--d")) || 0 : 0;
    nd.textContent = (nd.dataset.prefix || "") + "0" + (nd.dataset.suffix || "");
    setTimeout(() => { if (cur.node.classList.contains("on")) countUp(nd); }, delay * 1000 + 300);
  });
  fitSlide(cur.node);
  cur.t.enter?.(cur.node, sec);
  updateChapters(cur.spec, sec);
  clearTimeout(show.timer);
  if (!show.paused) show.timer = setTimeout(() => goSlide(show.i + 1), sec * 1000);
}

function updateChapters(spec, sec) {
  const ci = CHAPTERS.indexOf(spec.chapter);
  const inCh = SEQUENCE.filter(s => s.chapter === spec.chapter);
  const pos = SEQUENCE.slice(0, show.i + 1).filter(s => s.chapter === spec.chapter).length - 1;
  [...$("chapters").children].forEach((seg, k) => {
    const f = seg.querySelector("i");
    seg.classList.toggle("on", k === ci);
    f.style.transition = "none";
    if (k < ci) f.style.width = "100%";
    else if (k > ci) f.style.width = "0";
    else {
      f.style.width = (100 * pos / inCh.length) + "%";
      void f.offsetWidth;
      if (!show.paused) { f.style.transition = `width ${sec}s linear`; f.style.width = (100 * (pos + 1) / inCh.length) + "%"; }
    }
  });
}

function countUp(node) {
  const target = +node.dataset.count, pre = node.dataset.prefix || "", suf = node.dataset.suffix || "", plain = !!node.dataset.plain, t0 = performance.now(), dur = 1600;
  const fmt = v => plain ? String(v) : cz(v);
  const tick = t => { const k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 3); node.textContent = pre + fmt(Math.round(target * e)) + suf; if (k < 1) requestAnimationFrame(tick); };
  requestAnimationFrame(tick);
}

/* Pojistka: pokud se obsah snímku nevejde mezi horní a spodní lištu (jiný poměr stran,
   delší text v data.js), snímek se zmenší (CSS zoom) tak, aby se vešel. */
function fitSlide(node) {
  const px = v => parseFloat(v) || 0;
  node.querySelectorAll(".body, .hero-in").forEach(box => {
    box.style.zoom = ""; box.style.top = box.style.bottom = box.style.left = box.style.right = "";
    const cs = getComputedStyle(box);
    let need, have;
    if (box.classList.contains("body")) {
      const kids = [...box.children]; if (!kids.length) return;
      const first = kids[0], last = kids[kids.length - 1];
      need = last.offsetTop + last.offsetHeight + px(getComputedStyle(last).marginBottom) - first.offsetTop + px(getComputedStyle(first).marginTop);
      have = box.clientHeight;
      if (box.scrollWidth > box.clientWidth + 2) have = Math.min(have, need * box.clientWidth / box.scrollWidth);
    } else {
      const topBar = node.parentElement.parentElement.querySelector(".show-top").offsetHeight;
      need = box.offsetHeight; have = window.innerHeight - px(cs.bottom) - topBar - 16;
    }
    if (need <= have || need <= 0) return;
    const z = Math.max(0.5, have / need * 0.98);
    // svisle se box zvětší o 1/z (obsah se vejde), vodorovně zůstane stejně široký a zmenšený obsah se vystředí
    const extra = box.offsetWidth * (1 - z) / 2;
    ["top", "bottom"].forEach(k => { if (cs[k] !== "auto") box.style[k] = (px(cs[k]) / z) + "px"; });
    ["left", "right"].forEach(k => { if (cs[k] !== "auto") box.style[k] = ((px(cs[k]) + extra) / z) + "px"; });
    box.style.zoom = z;
  });
}
window.addEventListener("resize", () => { const cur = show.slides[show.i]; if (cur) fitSlide(cur.node); });

function pauseShow() { show.paused = true; clearTimeout(show.timer); const cur = show.slides[show.i]; cur?.t.leave?.(cur.node); }
function resumeShow() { show.paused = false; goSlide(show.i + 1); }

/* =====================================================================
   DOTYK → KALKULAČKA, nečinnost → zpět do prezentace
   ===================================================================== */
function openCalc() {
  pauseShow();
  resetCalc();
  calcOpenedAt = performance.now();
  $("show").classList.add("hidden"); $("calcView").classList.remove("hidden");
  requestAnimationFrame(drawChart);
  startIdle();
}
function closeCalc() {
  stopIdle();
  $("numpad").classList.add("hidden"); $("admin").classList.add("hidden");
  $("calcView").classList.add("hidden"); $("show").classList.remove("hidden");
  resumeShow();
}
$("show").addEventListener("click", openCalc);
// dotyk, který kalkulačku otevřel, nesmí zároveň stisknout tlačítko pod prstem
let calcOpenedAt = 0;
$("calcView").addEventListener("click", e => { if (performance.now() - calcOpenedAt < 450) { e.stopPropagation(); e.preventDefault(); } }, true);
$("backBtn").addEventListener("click", closeCalc);

const idle = { t: 0, raf: null };
function startIdle() { idle.t = performance.now(); if (!idle.raf) idle.raf = requestAnimationFrame(idleTick); }
function stopIdle() { cancelAnimationFrame(idle.raf); idle.raf = null; }
function idleTick(now) {
  const k = Math.min(1, (now - idle.t) / (settings.calcIdleSeconds * 1000));
  $("idleRing").style.strokeDashoffset = 100 - k * 100;
  if (k >= 1) { idle.raf = null; if (!$("admin").classList.contains("hidden")) { startIdle(); return; } closeCalc(); return; }
  idle.raf = requestAnimationFrame(idleTick);
}
["pointerdown", "pointermove", "keydown", "wheel", "touchstart"].forEach(ev => document.addEventListener(ev, () => { if (idle.raf) idle.t = performance.now(); }, { passive: true }));

/* =====================================================================
   KALKULAČKA
   ===================================================================== */
const F_DEFAULTS = {
  heat: { v: 1, min: 0.1, max: 50, step: 0.1, d: 1 }, unused: { v: 100, min: 5, max: 100, step: 5, d: 0 }, hours: { v: 7500, min: 500, max: 8760, step: 250, d: 0 }, price: { v: 3.5, min: 0.5, max: 15, step: 0.1, d: 2 },
  flow: { v: 100000, min: 100, max: 5e6, step: 5000, d: 0 }, tin: { v: 120, min: -20, max: 1500, step: 5, d: 0 }, tout: { v: 70, min: -20, max: 1500, step: 5, d: 0 }, density: { v: 1.0, min: 0.05, max: 2000, step: 0.05, d: 2 }, cp: { v: 1.05, min: 0.1, max: 10, step: 0.05, d: 2 }, techHours: { v: 7000, min: 500, max: 8760, step: 250, d: 0 }, techPrice: { v: 3.5, min: 0.5, max: 15, step: 0.1, d: 2 },
};
const F = JSON.parse(JSON.stringify(F_DEFAULTS));
const cs = { tab: "quick", src: CALC_DEFAULTS.sources[0], medium: "air", last: null };

function buildCalc() {
  CALC_DEFAULTS.sources.forEach(s => { const b = el("button", "", s); b.addEventListener("click", () => { cs.src = s; renderChoices(); calc(); }); $("srcChoices").appendChild(b); });
  [["air", "Vzduch / suché spaliny"], ["water", "Voda"]].forEach(([v, n]) => { const b = el("button", "", n); b.dataset.v = v; b.addEventListener("click", () => { cs.medium = v; if (v === "water") { F.density.v = 985; F.cp.v = 4.18; } else { F.density.v = 1.0; F.cp.v = 1.05; } renderChoices(); renderFields(); calc(); }); $("mediumChoices").appendChild(b); });
  CALC_DEFAULTS.demos.forEach(dm => { const b = el("button", "btn", "Příklad: " + dm.n); b.addEventListener("click", () => applyDemo(dm)); $("demos").appendChild(b); });
  document.querySelectorAll("#p-calc .field[data-f]").forEach(f => {
    const id = f.dataset.f;
    f.querySelectorAll(".step").forEach(b => b.addEventListener("click", () => { setF(id, F[id].v + F[id].step * +b.dataset.d); }));
    f.querySelector(".val").addEventListener("click", () => openNumpad(id, f.querySelector("label").textContent, f.querySelector("small").textContent));
    const pr = f.querySelector(".presets"); if (pr) pr.dataset.p.split(",").forEach(p => { const b = el("button", "", cz(+p, +p % 1 ? 1 : 0)); b.dataset.v = p; b.addEventListener("click", () => setF(id, +p)); pr.appendChild(b); });
  });
  document.querySelectorAll("#p-calc .tabs button").forEach(b => b.addEventListener("click", () => setTab(b.dataset.ctab)));
  renderChoices(); renderFields(); calc();
  window.addEventListener("resize", () => { if (cs.last) drawChart(); });
}
function setTab(tab) { cs.tab = tab; document.querySelectorAll("#p-calc .tabs button").forEach(x => x.classList.toggle("on", x.dataset.ctab === tab)); $("quickPane").classList.toggle("hidden", tab !== "quick"); $("techPane").classList.toggle("hidden", tab !== "tech"); calc(); }
function resetCalc() { Object.keys(F_DEFAULTS).forEach(k => F[k].v = F_DEFAULTS[k].v); cs.src = CALC_DEFAULTS.sources[0]; cs.medium = "air"; renderChoices(); renderFields(); setTab("quick"); }
function setF(id, v) { const s = F[id]; s.v = Math.min(s.max, Math.max(s.min, Math.round(v / s.step) * s.step)); s.v = +s.v.toFixed(4); renderFields(); calc(); }
function renderFields() { document.querySelectorAll("#p-calc .field[data-f]").forEach(f => { const s = F[f.dataset.f]; f.querySelector(".n").textContent = cz(s.v, s.d); f.querySelectorAll(".presets button").forEach(b => b.classList.toggle("on", Math.abs(+b.dataset.v - s.v) < 1e-9)); }); }
function renderChoices() { [...$("srcChoices").children].forEach(b => b.classList.toggle("on", b.textContent === cs.src)); [...$("mediumChoices").children].forEach(b => b.classList.toggle("on", b.dataset.v === cs.medium)); }
function applyDemo(dm) { cs.src = dm.src; F.heat.v = dm.heat; F.unused.v = dm.unused; F.hours.v = dm.hours; F.price.v = dm.price; renderChoices(); renderFields(); setTab("quick"); }

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
  const c = $("chart"), r = c.getBoundingClientRect(); if (!r.width) return;
  const dpr = window.devicePixelRatio || 1;
  c.width = Math.max(300, r.width * dpr); c.height = Math.max(150, r.height * dpr);
  const ctx = c.getContext("2d"); ctx.scale(dpr, dpr); const w = r.width, h = r.height, dd = cs.last;
  ctx.clearRect(0, 0, w, h);
  const years = 10, vals = []; for (let y = 0; y <= years; y++) vals.push(-dd.capex + dd.net * y);
  const min = Math.min(...vals, 0), max = Math.max(...vals, 0), pad = { l: 96, r: 18, t: 30, b: 28 };
  const x = y => pad.l + (w - pad.l - pad.r) * y / years, yv = v => h - pad.b - (h - pad.t - pad.b) * (v - min) / ((max - min) || 1);
  const fs = Math.max(10, Math.min(w / 48, h / 11));
  ctx.font = `${fs}px Segoe UI, Arial`; ctx.fillStyle = "#a7b6c2"; ctx.strokeStyle = "#2e3d4b"; ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) { const v = min + (max - min) * i / 4, yy = yv(v); ctx.beginPath(); ctx.moveTo(pad.l, yy); ctx.lineTo(w - pad.r, yy); ctx.stroke(); ctx.textAlign = "right"; ctx.fillText(cz(v / 1e6, 1) + " mil.", pad.l - 6, yy + fs / 3); }
  ctx.strokeStyle = "#8aa0ac"; ctx.beginPath(); ctx.moveTo(pad.l, yv(0)); ctx.lineTo(w - pad.r, yv(0)); ctx.stroke();
  ctx.textAlign = "center"; for (let i = 0; i <= years; i += 2) ctx.fillText(i + ". rok", x(i), h - 8);
  ctx.textAlign = "left"; ctx.fillStyle = "#dbe4ec"; ctx.font = `bold ${fs}px Segoe UI, Arial`; ctx.fillText("Kumulovaný efekt investice (Kč)", pad.l, fs + 4);
  const grad = ctx.createLinearGradient(0, pad.t, 0, h - pad.b); grad.addColorStop(0, "rgba(56,211,159,.35)"); grad.addColorStop(1, "rgba(56,211,159,0)");
  ctx.beginPath(); ctx.moveTo(x(0), yv(0)); vals.forEach((v, i) => ctx.lineTo(x(i), yv(v))); ctx.lineTo(x(years), yv(0)); ctx.closePath(); ctx.fillStyle = grad; ctx.fill();
  ctx.strokeStyle = "#38d39f"; ctx.lineWidth = 4; ctx.lineJoin = "round"; ctx.beginPath(); vals.forEach((v, i) => i ? ctx.lineTo(x(i), yv(v)) : ctx.moveTo(x(i), yv(v))); ctx.stroke();
  if (isFinite(dd.payback) && dd.payback <= years) { const px = x(dd.payback), py = yv(0); ctx.fillStyle = "#ffc36b"; ctx.beginPath(); ctx.arc(px, py, 7, 0, Math.PI * 2); ctx.fill(); ctx.font = `bold ${fs}px Segoe UI, Arial`; ctx.textAlign = px > w * 0.7 ? "right" : "left"; ctx.fillText("návratnost " + cz(dd.payback, 1) + " r.", px + (px > w * 0.7 ? -12 : 12), py - 12); }
}

/* ---------- numerická klávesnice ---------- */
const np = { id: null, buf: "", cb: null };
function openNumpad(id, label, unit, cb) {
  np.id = id; np.cb = cb || null; np.buf = ""; $("npLabel").textContent = label; $("npUnit").textContent = unit;
  const cur = cb ? cb.get() : F[id].v; $("npDisp").textContent = cz(cur, cb ? 0 : F[id].d); $("npDisp").style.color = "#a7b6c2";
  $("numpad").classList.remove("hidden");
}
function buildNumpad() {
  ["7", "8", "9", "4", "5", "6", "1", "2", "3", ",", "0", "⌫", "Zrušit", "OK"].forEach(k => { const b = el("button", k === "OK" ? "ok" : k === "Zrušit" ? "x" : k === "⌫" ? "c" : "", k); b.addEventListener("click", () => npKey(k)); $("npKeys").appendChild(b); });
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
   SERVIS – v kalkulačce podržet logo 3 s
   ===================================================================== */
const ADMIN_FIELDS = [["slideSeconds", "Základní délka snímku", "s"], ["calcIdleSeconds", "Zavření kalkulačky po nečinnosti", "s"], ["eff", "Čistá elektrická účinnost", "%"], ["modulePower", "Jmenovitý výkon modulu", "kWe"], ["moduleCapex", "Cena 1 modulu", "Kč"], ["moduleOpex", "Roční servis 1 modulu", "Kč/rok"]];
function buildAdmin() {
  buildAdminFields();
  $("adminClose").addEventListener("click", () => { saveSettings(); $("admin").classList.add("hidden"); calc(); });
  $("adminReset").addEventListener("click", () => { Object.assign(settings, DEFAULTS); saveSettings(); buildAdminFields(); });
  $("adminFs").addEventListener("click", () => { if (!document.fullscreenElement) document.documentElement.requestFullscreen?.(); else document.exitFullscreen?.(); });
  let pressT = null;
  const logo = $("logoBtn");
  logo.addEventListener("pointerdown", () => { pressT = setTimeout(() => $("admin").classList.remove("hidden"), 3000); });
  ["pointerup", "pointerleave", "pointercancel"].forEach(ev => logo.addEventListener(ev, () => clearTimeout(pressT)));
}
function buildAdminFields() {
  $("adminFields").innerHTML = "";
  ADMIN_FIELDS.forEach(([k, l, u]) => { const f = el("div", "field", `<label>${l}</label><div class="row"><div class="val"><span class="n">${cz(settings[k])}</span><small>${u}</small></div></div>`); f.querySelector(".val").addEventListener("click", () => openNumpad(null, l, u, { get: () => settings[k], set: v => { settings[k] = v; f.querySelector(".n").textContent = cz(v); } })); $("adminFields").appendChild(f); });
}

/* ---------- klávesnice pro obsluhu (pokud je připojena) ---------- */
document.addEventListener("keydown", e => {
  if (e.key === "Escape") { $("numpad").classList.add("hidden"); if (!$("calcView").classList.contains("hidden")) closeCalc(); }
  if ($("calcView").classList.contains("hidden")) {
    if (e.key === "ArrowRight") goSlide(show.i + 1);
    if (e.key === "ArrowLeft") goSlide(show.i - 1);
    if (e.key === "k") openCalc();
  }
});
document.addEventListener("contextmenu", e => e.preventDefault());

buildShow(); buildCalc(); buildNumpad(); buildAdmin();
window.prezentace = { go: n => goSlide(n), pause: pauseShow, resume: resumeShow };   // pro servis z konzole
goSlide(0);
})();
