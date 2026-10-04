(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const SVG = 'http://www.w3.org/2000/svg';
  const el = (tag, attrs = {}, parent) => {
    const n = document.createElementNS(SVG, tag);
    for (const k in attrs) n.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(n);
    return n;
  };
  const docEl = document.documentElement;
  const REDUCE = matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.REDUCE = REDUCE;

  // Shared state. Scroll timelines write it, the WebGL loop reads it.
  // Each scene owns a full copy of the wedge's state; a director hands RIG to whichever scene is on screen.
  const BASE = {
    alpha: 1, wHero: 0, wCenter: 0, wLeft: 0, wOrder: 0,
    x: 0, y: 0, s: 1, rx: 0.52, ry: -0.62, rz: 0.05, spin: 0,
    explode: 0, press: 1, flavor: 0, drizzle: 1, sugar: 1, sprinkles: 1,
    lab0: 0, lab1: 0, lab2: 0, lab3: 0
  };
  const HERO = { ...BASE, wHero: 1, rx: 0.7, ry: -0.7 };
  const INS = { ...BASE, wCenter: 1, alpha: 0, y: -0.3, s: 0.92, rx: 1.05, ry: 0.25, rz: -0.12, press: 0, drizzle: 0, sugar: 0, sprinkles: 0 };
  const ORD = { ...BASE, wOrder: 1, alpha: 0, rx: 0.95, ry: -3.4, rz: 0.1, sprinkles: 0 };
  const FADE = { menu: 1 };
  const RIG = window.RIG = { ...HERO, intro: REDUCE ? 1 : 0 };

  const GOLD = ['#E8D3AE', '#E0AA5E', '#BC742B', '#6B300F'];
  const FLAVORS = window.FLAVORS = [
    { name: 'Swiss Choco Dark', desc: 'Stuffed with dark chocolate. The one to pick if you like it bitter and intense.', inside: 'Dark chocolate', bat: 'Classic golden', img: 'assets/img/CA802417.webp', alt: 'Swiss Choco Dark Swaffle on a white plate', batter: GOLD, core: '#2B130B', sauce: '#22100A', rough: 0.2 },
    { name: 'Choco Nutella Indulgence', desc: 'Filled with Nutella and cocoa, warmed until the spread runs.', inside: 'Nutella and cocoa', bat: 'Classic golden', img: 'assets/img/CA802515.webp', alt: 'Choco Nutella Indulgence Swaffle beside a jar of Nutella', batter: GOLD, core: '#5E2F16', sauce: '#3E1C0C', rough: 0.18 },
    { name: 'Crispy KitKat Treat', desc: 'Real KitKat pieces in a chocolate filling, so you get wafer crunch inside the melt.', inside: 'KitKat and chocolate', bat: 'Classic golden', img: 'assets/img/CA802449.webp', alt: 'Crispy KitKat Treat Swaffle with KitKat pieces', batter: GOLD, core: '#6C3B1D', sauce: '#2E150A', rough: 0.24 },
    { name: 'Swiss Red Bliss', desc: 'Red velvet-style batter with a white cream filling.', inside: 'White cream', bat: 'Red velvet style', img: 'assets/img/CA802616.webp', alt: 'Swiss Red Bliss Swaffle, red with a white cream filling', batter: ['#B8615A', '#8E2420', '#6A1414', '#360606'], core: '#F2ECE2', sauce: '#F6F1EA', rough: 0.38 },
    { name: 'Swiss Berry Bliss', desc: 'Mixed berry flavour through a red batter.', inside: 'Mixed berry', bat: 'Berry red', img: 'assets/img/CA802633.webp', alt: 'Swiss Berry Bliss Swaffle', batter: ['#CF7F8A', '#9A2535', '#741424', '#3A0610'], core: '#5E0F24', sauce: '#4A0A1C', rough: 0.16 },
    { name: 'Aqua Oreo Delight', desc: 'Cocoa batter with Oreo crunch and swirls of aqua cream. From the Dark Obsession range.', inside: 'Oreo and aqua cream', bat: 'Dark cocoa', img: 'assets/img/oreo_waffle.webp', alt: 'Aqua Oreo Delight Swaffle with Oreo cookies', batter: ['#A98F7C', '#6D4632', '#4A2B1C', '#22120A'], core: '#78D0C9', sauce: '#F2EFEA', rough: 0.32 }
  ];

  // If the 3D module cannot load, fall back to photography.
  setTimeout(() => { if (!window.SW3D) docEl.classList.add('no-gl'); }, 9000);

  // ---------- 24-hour dial: a round waffle with the closed hours cut out ----------
  const OPEN0 = 165, OPEN_SPAN = 225;           // 11:00 is 165° from midnight, 15 open hours are 225°
  const RD = 168;
  const pol = (deg, r) => { const a = deg * Math.PI / 180; return [r * Math.sin(a), -r * Math.cos(a)]; };
  const dialPockets = [];
  let dialHand = null;
  (function buildDial() {
    const svg = $('.dial-svg'); if (!svg) return;
    const defs = el('defs', {}, svg);
    const clip = el('clipPath', { id: 'dial-open' }, defs);
    const [ax, ay] = pol(OPEN0, RD), [bx, by] = pol(OPEN0 + OPEN_SPAN, RD);
    const sector = `M0,0L${ax.toFixed(2)},${ay.toFixed(2)}A${RD},${RD} 0 1 1 ${bx.toFixed(2)},${by.toFixed(2)}Z`;
    el('path', { d: sector }, clip);
    // closed slice, drawn as an outline only
    const [cx0, cy0] = pol(OPEN0 + OPEN_SPAN, RD), [cx1, cy1] = pol(OPEN0, RD);
    el('path', { d: `M0,0L${cx0.toFixed(2)},${cy0.toFixed(2)}A${RD},${RD} 0 0 1 ${cx1.toFixed(2)},${cy1.toFixed(2)}Z`, class: 'dial-closed' }, svg);
    const [lx, ly] = pol(97.5, 102);
    const t1 = el('text', { x: lx.toFixed(1), y: (ly - 6).toFixed(1), class: 'dial-closed-t' }, svg); t1.textContent = 'Closed';
    const t2 = el('text', { x: lx.toFixed(1), y: (ly + 14).toFixed(1), class: 'dial-closed-s' }, svg); t2.textContent = '02:00 to 11:00';
    // the open part of the day is waffle
    el('path', { d: sector, class: 'dial-waffle' }, svg);
    const g = el('g', { 'clip-path': 'url(#dial-open)' }, svg);
    const PITCH = 30, PK = 21;
    for (let gx = -6; gx <= 6; gx++) for (let gy = -6; gy <= 6; gy++) {
      const x = gx * PITCH, y = gy * PITCH;
      const r = Math.hypot(x, y);
      if (r > RD - 12 || r < 8) continue;
      let ang = Math.atan2(x, -y) * 180 / Math.PI; if (ang < 0) ang += 360;
      const s = (ang - OPEN0 + 360) % 360;
      if (s > OPEN_SPAN) continue;
      el('rect', { x: x - PK / 2, y: y - PK / 2, width: PK, height: PK, rx: 5, class: 'dial-pocket' }, g);
      const f = el('rect', { x: x - PK / 2 + 2, y: y - PK / 2 + 2, width: PK - 4, height: PK - 4, rx: 4, class: 'dial-fill' }, g);
      f.style.transformOrigin = `${x}px ${y}px`; f.style.transformBox = 'view-box'; f.style.transform = 'scale(0)';
      dialPockets.push({ f, s });
    }
    el('path', { d: sector, class: 'dial-edge' }, svg);
    for (let h = 0; h < 24; h++) {
      const [x0, y0] = pol(h * 15, RD + 10), [x1, y1] = pol(h * 15, RD + (h % 6 ? 16 : 22));
      el('line', { x1: x0.toFixed(1), y1: y0.toFixed(1), x2: x1.toFixed(1), y2: y1.toFixed(1), class: h % 6 ? 'dial-tick' : 'dial-tick major' }, svg);
    }
    ['00', '06', '12', '18'].forEach((lab, i) => {
      const [x, y] = pol(i * 90, RD + 40);
      const t = el('text', { x: x.toFixed(1), y: (y + 5).toFixed(1), class: 'dial-hour' }, svg); t.textContent = lab;
    });
    [[OPEN0, '11:00'], [OPEN0 + OPEN_SPAN, '02:00']].forEach(([a, lab]) => {
      const [x0, y0] = pol(a, 0), [x1, y1] = pol(a, RD + 24);
      el('line', { x1: x0, y1: y0, x2: x1.toFixed(1), y2: y1.toFixed(1), class: 'dial-mark' }, svg);
      const [tx, ty] = pol(a, RD + 42);
      const t = el('text', { x: tx.toFixed(1), y: (ty + 5).toFixed(1), class: 'dial-mark-t' }, svg); t.textContent = lab;
    });
    dialHand = el('g', { class: 'dial-hand' }, svg);
    el('line', { x1: 0, y1: 10, x2: 0, y2: -(RD + 6) }, dialHand);
    el('rect', { x: -9, y: -9, width: 18, height: 18, rx: 4, class: 'dial-knob' }, svg);
  })();
  const roH = $('.ro-h'), roM = $('.ro-m');
  const TIME = { m: 660 };
  function paintClock() {
    const m = TIME.m, sweep = (m - 660) / 4;
    roH.textContent = String(Math.floor(m / 60) % 24).padStart(2, '0');
    roM.textContent = String(Math.floor(m % 60)).padStart(2, '0');
    if (dialHand) dialHand.setAttribute('transform', `rotate(${(OPEN0 + sweep).toFixed(2)})`);
    for (const p of dialPockets) {
      const k = Math.max(0, Math.min(1, (sweep - p.s) / 14));
      p.f.style.transform = `scale(${k.toFixed(3)})`;
    }
  }
  paintClock();

  if (!window.gsap || !window.ScrollTrigger) { docEl.classList.add('no-gl'); RIG.intro = 1; return; }
  gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin);
  ScrollTrigger.config({ ignoreMobileResize: true });

  // ---------- smooth scroll ----------
  let lenis = null;
  if (!REDUCE && window.Lenis) {
    lenis = new Lenis({ lerp: 0.085, smoothWheel: true, wheelMultiplier: 0.95 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }
  window.__lenis = lenis;
  const scrollToY = (y, d = 1.4) => lenis ? lenis.scrollTo(y, { duration: d }) : window.scrollTo({ top: y, behavior: 'auto' });

  // ---------- nav ----------
  const burger = $('.burger'), sheet = $('#sheet');
  function openSheet(open) {
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    sheet.hidden = !open;
    if (lenis) open ? lenis.stop() : lenis.start();
    if (open && !REDUCE) gsap.from('.sheet li', { yPercent: 50, opacity: 0, stagger: 0.05, duration: 0.7, ease: 'expo.out' });
  }
  burger.addEventListener('click', () => openSheet(burger.getAttribute('aria-expanded') !== 'true'));
  addEventListener('keydown', (e) => { if (e.key === 'Escape' && !sheet.hidden) openSheet(false); });

  let insideTL = null, flavorTime = () => 0;
  $$('a[href^="#"]').forEach((a) => a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    const target = id.length > 1 && document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    if (!sheet.hidden) openSheet(false);
    let y = id === '#top' ? 0 : target.getBoundingClientRect().top + window.scrollY;
    if (id === '#inside' && insideTL) {
      const st = insideTL.scrollTrigger;
      y = st.start + (2.6 / insideTL.duration()) * (st.end - st.start);
    }
    scrollToY(y, 1.6);
  }));

  // ---------- copy buttons ----------
  $$('.copy').forEach((b) => b.addEventListener('click', () => {
    const src = document.getElementById(b.dataset.copy);
    const txt = src.textContent.trim();
    const flash = (m) => { b.textContent = m; if (window.Motion && !REDUCE) window.Motion.animate(b, { scale: [1.12, 1] }, { type: 'spring', stiffness: 500, damping: 12 }); setTimeout(() => { b.textContent = 'Copy'; }, 1600); };
    const select = () => { const r = document.createRange(); r.selectNodeContents(src); const s = getSelection(); s.removeAllRanges(); s.addRange(r); flash('Selected'); };
    try { navigator.clipboard.writeText(txt).then(() => flash('Copied'), select); } catch (e) { select(); }
  }));

  // ---------- Motion (the standalone build of Framer Motion) for springs and gestures ----------
  const MO = window.Motion || null;
  const SPRING = { type: 'spring', stiffness: 420, damping: 36, mass: 0.8 };
  const anim = (el, kf, opt) => (MO && el ? MO.animate(el, kf, opt) : null);
  const done = (a) => (a && typeof a.then === 'function' ? a : Promise.resolve());

  // ---------- menu reel: seven cards, each with a plate that shows the item you point at ----------
  const mcards = $$('.mcard'), mtrack = $('.mtrack'), midxBtns = $$('.midx button'), midxBar = $('.midx-bar b');
  const isDesk = () => matchMedia('(min-width: 761px)').matches;
  function plateShow(card, src, name, desc) {
    const img = $('.plate img', card), pn = $('.pc-name', card), pd = $('.pc-desc', card);
    if (img.getAttribute('src') === src) return;
    img.src = src; img.alt = name; pn.textContent = name; pd.textContent = desc;
    if (!MO || REDUCE) return;
    anim(img, { opacity: [0, 1], scale: [1.08, 1], rotate: [-8, 0] }, { type: 'spring', stiffness: 220, damping: 24 });
    anim([pn, pd], { opacity: [0, 1], y: [8, 0] }, { delay: MO.stagger(0.04), type: 'spring', stiffness: 380, damping: 30 });
  }
  mcards.forEach((card) => {
    const img = $('.plate img', card);
    const def = { src: img.getAttribute('src'), name: $('.pc-name', card).textContent, desc: $('.pc-desc', card).textContent };
    let active = null;
    $$('.mci.has-img', card).forEach((b) => {
      const pick = () => {
        if (active) active.removeAttribute('aria-current');
        active = b; b.setAttribute('aria-current', 'true');
        plateShow(card, b.dataset.img, $('span', b).textContent, b.dataset.desc || '');
      };
      b.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') pick(); });
      b.addEventListener('focus', pick);
      b.addEventListener('click', pick);
    });
    card.addEventListener('pointerleave', (e) => {
      if (e.pointerType !== 'mouse' || !active) return;
      active.removeAttribute('aria-current'); active = null;
      plateShow(card, def.src, def.name, def.desc);
    });
  });
  let reelST = null;
  const reelMax = () => Math.max(0, mtrack.scrollWidth - mtrack.parentElement.clientWidth);
  function setIdx(p) {
    if (midxBar) midxBar.style.transform = `scaleX(${Math.max(0.0001, p).toFixed(4)})`;
    const x = p * reelMax();
    let k = 0;
    mcards.forEach((c, i) => { if (c.offsetLeft - mcards[0].offsetLeft <= x + c.offsetWidth * 0.5) k = i; });
    midxBtns.forEach((btn, i) => { if (i === k) btn.setAttribute('aria-current', 'true'); else btn.removeAttribute('aria-current'); });
  }
  midxBtns.forEach((btn, i) => btn.addEventListener('click', () => {
    if (!reelST) return;
    const x = Math.min(reelMax(), mcards[i].offsetLeft - mcards[0].offsetLeft);
    scrollToY(reelST.start + (x / (reelMax() || 1)) * (reelST.end - reelST.start), 1.2);
  }));

  // ---------- the nav's Order button turns white over red sections so it never disappears ----------
  const navEl = $('.nav');
  const redZones = ['#top', '#word', '#grid', '#hours', '#order'];

  // ---------- spring press on everything you can tap ----------
  if (MO && MO.press && !REDUCE) {
    MO.press('.btn, .chip, .copy, .burger, .midx button, .links .go', (el) => {
      anim(el, { scale: 0.95 }, { type: 'spring', stiffness: 700, damping: 30 });
      return () => anim(el, { scale: 1 }, { type: 'spring', stiffness: 520, damping: 14 });
    });
  }
  // ---------- small reveals as blocks come into view ----------
  if (MO && MO.inView && !REDUCE) {
    const reveal = (sel, kids, from) => $$(sel).forEach((host) => {
      const items = $$(kids, host);
      if (host.getBoundingClientRect().top < innerHeight) return;
      items.forEach((n) => { n.style.opacity = 0; });
      MO.inView(host, () => { anim(items, { opacity: [0, 1], ...from }, { delay: MO.stagger(0.06), type: 'spring', stiffness: 260, damping: 26 }); }, { amount: 0.2 });
    });
    reveal('.label', 'dl > div', { x: [-16, 0] });
    reveal('.contact', ':scope > div', { y: [16, 0] });
  }

  // ---------- flavour panel ----------
  const chips = $$('.chip');
  const fName = $('.flv-name'), fDesc = $('.flv-desc'), fIn = $('.flv-in'), fBat = $('.flv-bat'), fImg = $('.flv-img'), fN = $('.flv-n');
  let curF = 0;
  function setPanel(i) {
    const f = FLAVORS[i];
    fN.textContent = i + 1; fName.textContent = f.name; fDesc.textContent = f.desc; fIn.textContent = f.inside; fBat.textContent = f.bat;
    fImg.src = f.img; fImg.alt = f.alt;
    chips.forEach((c, k) => c.setAttribute('aria-pressed', String(k === i)));
    if (!REDUCE && MO) {
      anim([fName, fDesc], { opacity: [0, 1], y: [18, 0] }, { delay: MO.stagger(0.05), type: 'spring', stiffness: 320, damping: 28 });
      anim(fImg, { opacity: [0.25, 1], scale: [1.06, 1] }, { type: 'spring', stiffness: 200, damping: 26 });
    }
  }
  chips.forEach((c, i) => c.addEventListener('click', () => {
    if (!insideTL) return;
    const st = insideTL.scrollTrigger;
    scrollToY(st.start + (flavorTime(i) / insideTL.duration()) * (st.end - st.start), 1.1);
  }));

  // ---------- director ----------
  let insST = null, ordST = null;
  gsap.ticker.add(() => {
    const y = window.scrollY;
    let S = HERO;
    if (insST && y >= insST.start - 1) S = INS;
    if (ordST && y >= ordST.start) S = ORD;
    for (const k in BASE) RIG[k] = S[k];
    if (S === INS) RIG.alpha = INS.alpha * FADE.menu;
  });

  // ---------- per-frame DOM sync from RIG ----------
  const pressEl = $('.press-type'), meterState = $('.meter-state');
  let lastPress = -1;
  gsap.ticker.add(() => {
    const p = RIG.press;
    if (Math.abs(p - lastPress) > 0.0005) {
      lastPress = p;
      pressEl.style.fontVariationSettings = `"wght" ${Math.round(250 + p * 610)}, "wdth" ${Math.round(112 - p * 37)}`;
      docEl.style.setProperty('--press', p.toFixed(3));
      meterState.textContent = p < 0.06 ? 'Batter in' : p < 0.95 ? 'Pressing' : 'Golden';
    }
    const fi = Math.max(0, Math.min(5, Math.round(RIG.flavor)));
    if (fi !== curF) { curF = fi; setPanel(fi); }
  });

  // ---------- word merge measurement ----------
  const wWrap = $('.word-wrap'), wk = $$('.wk'), wx = $$('.wx'), wplus = $('.wplus');
  const M = { k: wk.map(() => ({ x: 0, y: 0 })), x: wx.map(() => ({ y: 0 })), fall: 200 };
  function measureWord() {
    const fs = parseFloat(getComputedStyle(wWrap).fontSize), lh = fs * 0.9;
    const Wd = wWrap.offsetWidth, c = Wd / 2, w = (e) => e.offsetWidth;
    const row1 = [wk[0], wk[1], wx[0], wx[1], wx[2]];
    const row2 = [wx[3], wk[2], wk[3], wk[4], wk[5], wk[6]];
    let x = c - row1.reduce((a, e) => a + w(e), 0) / 2;
    const p1 = row1.map((e) => { const p = x; x += w(e); return p; });
    x = c - row2.reduce((a, e) => a + w(e), 0) / 2;
    const p2 = row2.map((e) => { const p = x; x += w(e); return p; });
    const dy = lh * 0.6;
    M.k[0] = { x: p1[0] - wk[0].offsetLeft, y: -dy };
    M.k[1] = { x: p1[1] - wk[1].offsetLeft, y: -dy };
    for (let i = 2; i < 7; i++) M.k[i] = { x: p2[i - 1] - wk[i].offsetLeft, y: dy };
    [p1[2], p1[3], p1[4], p2[0]].forEach((l, i) => { wx[i].style.left = l + 'px'; M.x[i].y = i < 3 ? -dy : dy; });
    M.fall = fs * 1.25;
  }

  // ---------- transit line ----------
  const transit = $('.transit'), tBase = $('.tl-base'), tDraw = $('.tl-draw'), marks = $$('.st-mark');
  function routeTransit() {
    const r0 = transit.getBoundingClientRect();
    const pts = marks.map((m) => { const r = m.getBoundingClientRect(); return [r.left + r.width / 2 - r0.left, r.top + r.height / 2 - r0.top]; });
    const vertical = innerWidth <= 760;
    let d;
    if (!vertical) {
      d = `M0,${pts[0][1]}L${pts[0][0]},${pts[0][1]}`;
      for (let i = 1; i < pts.length; i++) {
        const [x0, y0] = pts[i - 1], [x1, y1] = pts[i], dy = Math.abs(y1 - y0), run = (x1 - x0 - dy) / 2;
        d += `L${x0 + run},${y0}L${x0 + run + dy},${y1}L${x1},${y1}`;
      }
      d += `L${r0.width},${pts[pts.length - 1][1]}`;
    } else {
      d = `M${pts[0][0]},0L${pts[0][0]},${pts[0][1]}`;
      for (let i = 1; i < pts.length; i++) {
        const [x0, y0] = pts[i - 1], [x1, y1] = pts[i], dx = Math.abs(x1 - x0), run = (y1 - y0 - dx) / 2;
        d += `L${x0},${y0 + run}L${x1},${y0 + run + dx}L${x1},${y1}`;
      }
      d += `L${pts[pts.length - 1][0]},${r0.height}`;
    }
    tBase.setAttribute('d', d); tDraw.setAttribute('d', d);
  }

  // ---------- footer word ----------
  const mega = $('.mega');
  function fitMega() {
    mega.style.fontSize = '100px';
    mega.style.fontVariationSettings = '"wdth" 125, "wght" 900';
    const rg = document.createRange(); rg.selectNodeContents(mega);
    const w = rg.getBoundingClientRect().width || 1;
    mega.style.fontSize = (100 * mega.clientWidth / w * 0.985).toFixed(2) + 'px';
    mega.style.fontVariationSettings = '';
  }

  ScrollTrigger.addEventListener('refreshInit', () => { measureWord(); routeTransit(); fitMega(); });

  // ================= build all scroll scenes =================
  function build() {
    measureWord(); routeTransit(); fitMega();

    // hero entrance
    if (!REDUCE) {
      SplitText.create('.hero-title .ln', {
        type: 'chars', mask: 'chars',
        onSplit(self) { return gsap.from(self.chars, { yPercent: 108, duration: 1.25, ease: 'expo.out', stagger: 0.028, delay: 0.1 }); }
      });
      gsap.from('.hero-body > *, .hero-meta li', { y: 22, opacity: 0, duration: 1, ease: 'expo.out', stagger: 0.08, delay: 0.55 });
      gsap.to(RIG, { intro: 1, duration: 2.1, ease: 'expo.out', delay: 0.25 });
    }

    // headings outside the pinned scenes rise out of their own line masks
    if (!REDUCE) {
      $$('#menu-h, #f-h, #find-h, #order-h').forEach((h) => SplitText.create(h, {
        type: 'lines', mask: 'lines', autoSplit: true,
        onSplit(self) { return gsap.from(self.lines, { yPercent: 100, duration: 1.1, ease: 'expo.out', stagger: 0.08, scrollTrigger: { trigger: h, start: 'top 88%', once: true } }); }
      }));
    }

    const mm = gsap.matchMedia();
    mm.add({ mob: '(max-width: 760px)', desk: '(min-width: 761px)' }, (ctx) => {
      const mob = ctx.conditions.mob;

      // 1 · hero exit: the wedge tips back and fades as the page moves on
      gsap.timeline({ scrollTrigger: { trigger: '#top', start: 'top top', end: 'bottom top', scrub: true } })
        .to(HERO, { rx: 1.0, spin: 0.9, duration: 1, ease: 'power1.in' }, 0)
        .to(HERO, { alpha: 0, duration: 0.45 }, 0.55);

      // 2 · Swiss + Waffle -> Swaffle
      const wt = gsap.timeline({ scrollTrigger: { trigger: '#word', start: 'top top', end: () => '+=' + innerHeight * 1.6, pin: true, scrub: 0.8, invalidateOnRefresh: true } });
      wk.forEach((e, i) => wt.fromTo(e, { x: () => M.k[i].x, y: () => M.k[i].y }, { x: 0, y: 0, duration: 1, ease: 'power3.inOut' }, 0.9 + (i < 2 ? 0 : 0.05 * i)));
      wx.forEach((e, i) => wt.fromTo(e, { y: () => M.x[i].y, rotation: 0, opacity: 1 }, { y: () => M.x[i].y + M.fall, rotation: [-26, 18, -12, 22][i], opacity: 0, duration: 0.8, ease: 'power2.in' }, 0.35 + i * 0.07));
      wt.fromTo(wplus, { scale: 1, rotation: 0 }, { scale: 0, rotation: 90, duration: 0.5, ease: 'power2.in' }, 0.35);
      wt.fromTo('.dict', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6 }, 2.0);
      wt.to({}, { duration: 0.5 }, 2.6);

      // 3 · the cross becomes the grid
      const g = $('#grid svg'), lines = $$('.g-lines line', g), pockets = $$('.g-pockets rect', g), sauce = $$('.g-sauce rect', g), steps = $$('#grid .steps li');
      const gt = gsap.timeline({
        scrollTrigger: {
          trigger: '#grid', start: 'top top', end: () => '+=' + innerHeight * 2, pin: true, scrub: 0.8,
          onUpdate: (self) => { const p = self.progress, s = p < 0.2 ? 0 : p < 0.46 ? 1 : 2; steps.forEach((li, i) => li.classList.toggle('on', i === s)); }
        }
      });
      gt.to('.hbar', { attr: { x: 13, y: 243, width: 474, height: 14, rx: 7 }, duration: 1, ease: 'power3.inOut' }, 0.4)
        .to('.vbar', { attr: { x: 243, y: 13, width: 14, height: 474, rx: 7 }, duration: 1, ease: 'power3.inOut' }, 0.4)
        .fromTo(lines.slice(0, 4), { drawSVG: '50% 50%', opacity: 0 }, { drawSVG: '0% 100%', opacity: 1, duration: 0.9, ease: 'power2.out', stagger: 0.08 }, 1.2)
        .fromTo(lines.slice(4), { drawSVG: '50% 50%', opacity: 0 }, { drawSVG: '0% 100%', opacity: 1, duration: 0.9, ease: 'power2.out', stagger: 0.08 }, 1.45)
        .fromTo(pockets, { opacity: 0 }, { opacity: 1, duration: 0.4, stagger: { each: 0.03, from: 'center' } }, 2.0)
        .fromTo(sauce, { scale: 0, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.5, ease: 'expo.out', stagger: { each: 0.05, grid: [4, 4], from: 'start' } }, 2.4)
        .to(g, { rotationX: 52, rotationZ: -38, scale: 0.86, duration: 1.1, ease: 'power2.inOut' }, 3.7)
        .to({}, { duration: 0.3 });

      // 4 · inside: press, pull apart, finish, then pick a filling
      const it = insideTL = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: '#inside', start: 'top top', end: () => '+=' + Math.round(innerHeight * 9.5), pin: true, scrub: 0.9, invalidateOnRefresh: true }
      });
      insST = it.scrollTrigger;
      it.to(INS, { alpha: 1, y: 0, s: 1, rx: 0.46, ry: -0.55, rz: 0.03, duration: 1.1, ease: 'power2.out' }, 0);
      it.to(INS, { press: 1, duration: 1.8 }, 0.7);
      // a slow pull first, so the strands have time to stretch, then the full separation
      it.to(INS, { explode: 0.45, ry: -0.78, rx: 0.2, s: mob ? 0.98 : 1.04, duration: 1.3, ease: 'power1.inOut' }, 2.7);
      it.to(INS, { explode: 1, ry: -0.98, rx: 0.36, rz: 0.02, s: mob ? 0.95 : 1.0, duration: 1.1, ease: 'power2.inOut' }, 4.0);
      const C = $$('.callout');
      const at = mob ? [4.3, 5.1, 5.9, 6.7] : [4.4, 4.8, 5.2, 6.2];
      C.forEach((c, i) => {
        it.fromTo(c, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.45, ease: 'power2.out', immediateRender: false }, at[i]);
        it.to(INS, { ['lab' + i]: 1, duration: 0.6 }, at[i]);
        if (mob && i < 3) { it.to(c, { autoAlpha: 0, duration: 0.25 }, at[i] + 0.6); it.to(INS, { ['lab' + i]: 0, duration: 0.25 }, at[i] + 0.6); }
      });
      it.fromTo('.pull-note', { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.4, immediateRender: false }, 3.0);
      it.to('.pull-note', { autoAlpha: 0, duration: 0.3 }, 4.1);
      it.to(INS, { drizzle: 1, duration: 1.3, ease: 'power1.inOut' }, mob ? 6.2 : 5.7);
      it.to(INS, { sugar: 1, duration: 1.0 }, mob ? 6.6 : 6.2);
      const out = 7.7;
      it.to(C, { autoAlpha: 0, duration: 0.35 }, out);
      it.to(INS, { lab0: 0, lab1: 0, lab2: 0, lab3: 0, duration: 0.35 }, out);
      it.to('.inside-head, .spec', { autoAlpha: 0, y: -16, duration: 0.4 }, out);
      it.to(INS, { wCenter: 0, wLeft: 1, explode: 0.5, rx: 0.34, ry: -0.5, rz: 0.02, s: mob ? 0.92 : 0.84, duration: 1.4, ease: 'power2.inOut' }, out + 0.15);
      it.fromTo('.flv', { autoAlpha: 0, x: mob ? 0 : 40, y: mob ? 24 : 0 }, { autoAlpha: 1, x: 0, y: 0, duration: 0.8, ease: 'power2.out', immediateRender: false }, out + 0.8);
      const F0 = out + 1.6;
      for (let i = 1; i < 6; i++) it.to(INS, { flavor: i, duration: 0.6, ease: 'power1.inOut' }, F0 + 0.2 + (i - 1));
      it.to(INS, { spin: -0.35, duration: 5.6 }, F0);
      it.to({}, { duration: 0.6 }, F0 + 5.2);
      flavorTime = (i) => (i === 0 ? F0 + 0.05 : F0 + 0.2 + (i - 1) + 0.6 + 0.15);

      // 5a · menu reel: the cards slide sideways while the page is held; plates turn as they travel
      if (!mob && mtrack) {
        const reel = gsap.to(mtrack, {
          x: () => -reelMax(), ease: 'none',
          scrollTrigger: { trigger: '.mstage', start: 'top top', end: () => '+=' + reelMax(), pin: true, scrub: 0.7, invalidateOnRefresh: true, onUpdate: (self) => setIdx(self.progress) }
        });
        reelST = reel.scrollTrigger;
        mcards.forEach((card) => {
          gsap.fromTo($('.plate', card), { rotate: -14, scale: 0.9 }, { rotate: 10, scale: 1, ease: 'none', scrollTrigger: { trigger: card, containerAnimation: reel, start: 'left right', end: 'right left', scrub: true } });
          gsap.from($$('.mc-title, .mc-line', card), { x: 60, opacity: 0, ease: 'power2.out', stagger: 0.08, scrollTrigger: { trigger: card, containerAnimation: reel, start: 'left 85%', end: 'left 45%', scrub: true } });
        });
      } else { reelST = null; gsap.set(mtrack, { x: 0 }); }

      // 5 · menu: the wedge leaves with the scene
      gsap.timeline({ scrollTrigger: { trigger: '#menu', start: 'top bottom', end: 'top 35%', scrub: true } })
        .to(FADE, { menu: 0, ease: 'none' });

      // 6 · hours: the day sweeps round the waffle dial
      const nt = gsap.timeline({ scrollTrigger: { trigger: '#hours', start: 'top top', end: () => '+=' + innerHeight * 2.4, pin: true, scrub: 0.6 } });
      nt.fromTo(TIME, { m: 660 }, { m: 1560, ease: 'none', duration: 1, onUpdate: paintClock, immediateRender: false }, 0)
        .fromTo('#hours', { backgroundColor: '#DE301F' }, { backgroundColor: '#9A1C10', duration: 0.5, ease: 'none', immediateRender: false }, 0)
        .to('#hours', { backgroundColor: '#1C0A05', duration: 0.42, ease: 'none' }, 0.5)
        .to({}, { duration: 0.12 }, 1);

      // 7 · founders photo parallax
      $$('.fp img').forEach((img) => {
        const sp = parseFloat(img.dataset.speed) || 1;
        gsap.fromTo(img, { yPercent: 0 }, { yPercent: -Math.min(15, 9.5 * sp), ease: 'none', scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } });
      });
      // the founders' quote bakes word by word: thin pale batter spreading into its slot, then golden-heavy white
      const pq = $('.pq');
      if (pq && !REDUCE) {
        // thin-and-wide batter and heavy-and-condensed bake measure almost the same width, so nothing reflows
        const FINAL = '"wght" 860, "wdth" 75', THIN = '"wght" 160, "wdth" 92';
        SplitText.create(pq, {
          type: 'words', autoSplit: true,
          onSplit(self) {
            gsap.set(self.words, { display: 'inline-block', width: 'auto', fontVariationSettings: FINAL });
            const wf = self.words.map((w) => w.getBoundingClientRect().width);
            gsap.set(self.words, { fontVariationSettings: THIN });
            self.words.forEach((w, i) => { w.style.width = Math.max(wf[i], w.getBoundingClientRect().width).toFixed(2) + 'px'; });
            return gsap.fromTo(self.words,
              { fontVariationSettings: THIN, color: 'rgba(232,211,174,0.34)' },
              { fontVariationSettings: FINAL, color: '#FFFFFF', ease: 'none', stagger: 0.14,
                scrollTrigger: { trigger: pq, start: 'top 82%', end: 'bottom 42%', scrub: 0.6 } });
          }
        });
      }

      // 8 · the line between the shops draws itself
      gsap.fromTo(tDraw, { drawSVG: '0%' }, { drawSVG: '100%', ease: 'none', scrollTrigger: { trigger: transit, start: 'top 78%', end: 'bottom 60%', scrub: true, invalidateOnRefresh: true } });
      gsap.fromTo(marks, { scale: 0.4, rotation: -45 }, { scale: 1, rotation: 0, duration: 0.8, ease: 'expo.out', stagger: 0.15, scrollTrigger: { trigger: transit, start: 'top 78%', once: true } });

      // 9 · order: the wedge comes back, the word spreads like batter in the iron
      const ot = gsap.timeline({ scrollTrigger: { trigger: '#order', start: 'top bottom', end: 'top top', scrub: true } });
      ordST = ot.scrollTrigger;
      ot.to(ORD, { alpha: 1, rx: 0.5, ry: -0.62, rz: 0.04, duration: 1, ease: 'power2.out' }, 0).to(ORD, { sprinkles: 1, duration: 0.5 }, 0.5);
      gsap.fromTo(mega, { fontVariationSettings: '"wdth" 62, "wght" 900' }, { fontVariationSettings: '"wdth" 125, "wght" 900', ease: 'none', scrollTrigger: { trigger: '#order', start: 'top 45%', end: 'bottom bottom', scrub: true } });
    });

    const zones = [];
    const paintNav = () => navEl.classList.toggle('over-red', zones.some((t) => t.isActive));
    redZones.forEach((sel) => {
      const z = $(sel); if (!z) return;
      const box = z.parentElement && z.parentElement.classList.contains('pin-spacer') ? z.parentElement : z;  // include the time a section is held
      zones.push(ScrollTrigger.create({ trigger: box, start: 'top top+=36', end: 'bottom top+=36', onToggle: paintNav, onRefresh: paintNav }));
    });
    paintNav();

    ScrollTrigger.refresh();
  }

  const go = () => { if (go.done) return; go.done = true; build(); };
  (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(go);
  setTimeout(go, 2500);
  addEventListener('load', () => ScrollTrigger.refresh());
})();
