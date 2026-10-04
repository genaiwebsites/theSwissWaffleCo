import * as THREE from 'three';

/* One procedural Swaffle: a quarter-round wedge built as three slabs
   (lid, molten filling, base). Every visible property is read from window.RIG,
   which the scroll timelines drive, so the page and the object share one state. */

const RIG = window.RIG;
const FL = window.FLAVORS;
const docEl = document.documentElement;
const canvas = document.getElementById('gl');
const REDUCE = !!window.REDUCE;

// ---------- shape constants ----------
const R = 2.0;          // radius of the full round the wedge is cut from
const T = 0.36;         // slab thickness
const RB = 0.16;        // bullnose radius on the slab edge
const P = 0.36;         // pocket pitch
const DEPTH = 0.2;      // pocket depth
const GAP = 0.09;       // half gap the filling sits in
const CX = 4 * R / (3 * Math.PI); // centroid of a quarter disc, so rotations pivot naturally
const LID_Y = T / 2 + GAP, BASE_Y = -(T / 2 + GAP);

const sst = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
const hsh = (x, y) => { const h = Math.sin(x * 127.1 + y * 311.7) * 43758.5453123; return h - Math.floor(h); };
function vn(x, y) {
  const xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi;
  const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
  const a = hsh(xi, yi), b = hsh(xi + 1, yi), c = hsh(xi, yi + 1), d = hsh(xi + 1, yi + 1);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}
function ridge(x, z) {
  const gx = x / P + 0.18, gz = z / P + 0.18;
  const u = Math.abs(gx - Math.floor(gx) - 0.5) * 2, v = Math.abs(gz - Math.floor(gz) - 0.5) * 2;
  const m = Math.pow(Math.pow(u, 6) + Math.pow(v, 6), 1 / 6); // rounded-square pockets
  return sst(0.62, 0.79, m);
}
function slabTop(x, z) {
  const r = Math.hypot(x, z);
  const d = Math.max(0, Math.min(R - r, z, x));
  const e = Math.min(1, d / RB);
  const prof = Math.sqrt(Math.max(0, 1 - (1 - e) * (1 - e)));
  const inner = sst(RB * 0.9, RB * 2.4, d);
  return T / 2 * prof - DEPTH * (1 - ridge(x, z)) * inner;
}
const theta = (ta) => (Math.PI / 2) * (ta - 0.55 * Math.sin(2 * Math.PI * ta) / (2 * Math.PI));

function buildSlab(seed, NR, NA) {
  const n = (NR + 1) * (NA + 1);
  const pos = new Float32Array(n * 6), tst = new Float32Array(n * 2), idx = [];
  for (let s = 0; s < 2; s++) for (let i = 0; i <= NR; i++) {
    const r = R * i / NR;
    for (let j = 0; j <= NA; j++) {
      const th = theta(j / NA);
      const x = r * Math.cos(th), z = r * Math.sin(th);
      const d = Math.max(0, Math.min(R - r, z, x));
      const e = Math.min(1, d / RB);
      const prof = Math.sqrt(Math.max(0, 1 - (1 - e) * (1 - e)));
      const nz = vn(x * 5 + seed, z * 5 - seed) - 0.5;
      const big = vn(x * 1.3 + seed * 2, z * 1.3 + seed) - 0.5; // uneven browning across the iron
      let y = T / 2 * prof, t;
      if (s === 0) {
        const inner = sst(RB * 0.9, RB * 2.4, d), w = ridge(x, z);
        y -= DEPTH * (1 - w) * inner;
        t = 0.2 + 0.62 * w * inner + 0.55 * (1 - prof) + big * 0.38 + nz * 0.2;
      } else {
        t = 0.6 + 0.3 * (1 - prof) + big * 0.3 + nz * 0.2;
      }
      y += nz * 0.012 * prof;
      if (s === 1) y = -y;
      const k = s * n + i * (NA + 1) + j;
      pos[k * 3] = x - CX; pos[k * 3 + 1] = y; pos[k * 3 + 2] = z - CX; tst[k] = t;
    }
  }
  for (let i = 0; i < NR; i++) for (let j = 0; j < NA; j++) {
    const a = i * (NA + 1) + j, b = (i + 1) * (NA + 1) + j, c = b + 1, d = a + 1;
    idx.push(a, d, c, a, c, b);
    idx.push(n + a, n + c, n + d, n + a, n + b, n + c);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  g.setAttribute('aToast', new THREE.BufferAttribute(tst, 1));
  g.setIndex(idx);
  g.computeVertexNormals();
  return g;
}

const OFF = 0.07, RC = R + OFF * 1.3, TC = GAP * 2 + 0.09, RBC = TC / 2;
function buildCore(NR, NA) {
  const n = (NR + 1) * (NA + 1);
  const pos = new Float32Array(n * 6), idx = [];
  for (let s = 0; s < 2; s++) for (let i = 0; i <= NR; i++) for (let j = 0; j <= NA; j++) {
    const ta = j / NA, th = theta(ta);
    const rmax = RC + (vn(th * 7.0, 3.1) - 0.5) * 0.09;
    const r = rmax * i / NR;
    const x = -OFF + r * Math.cos(th), z = -OFF + r * Math.sin(th);
    const ez = (z + OFF) * (1 + (vn(r * 3.2, 7.7) - 0.5) * 0.5);
    const ex = (x + OFF) * (1 + (vn(r * 3.2, 9.1) - 0.5) * 0.5);
    const d = Math.max(0, Math.min(rmax - r, ez, ex));
    const e = Math.min(1, d / RBC);
    const prof = Math.sqrt(Math.max(0, 1 - (1 - e) * (1 - e)));
    let y = TC / 2 * prof;
    // a melted surface: slow swells plus the faint print of the pockets above it
    const sw = 0.035 * (vn(x * 2.3 + 4, z * 2.3) - 0.35) + 0.012 * Math.sin(x * 9 + vn(x, z) * 6) * Math.sin(z * 8);
    const print = s === 0 ? 0.018 * (ridge(x + OFF, z + OFF) - 0.5) : 0.014 * (ridge(x + OFF, z + OFF) - 0.5);
    y += (sw + print) * prof * (s === 0 ? 1 : 0.6);
    if (s === 1) y = -y;
    const k = s * n + i * (NA + 1) + j;
    pos[k * 3] = x - CX; pos[k * 3 + 1] = y; pos[k * 3 + 2] = z - CX;
  }
  for (let i = 0; i < NR; i++) for (let j = 0; j < NA; j++) {
    const a = i * (NA + 1) + j, b = (i + 1) * (NA + 1) + j, c = b + 1, d = a + 1;
    idx.push(a, d, c, a, c, b);
    idx.push(n + a, n + c, n + d, n + a, n + b, n + c);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  g.setIndex(idx);
  g.computeVertexNormals();
  return g;
}

// Sauce piped across the lid: a flattened ribbon that sags into each pocket it crosses.
function sagSurface(x, z) {
  const r = Math.hypot(x, z);
  const d = Math.max(0, Math.min(R - r, z, x));
  const e = Math.min(1, d / RB);
  const top = T / 2 * Math.sqrt(Math.max(0, 1 - (1 - e) * (1 - e)));
  return Math.max(slabTop(x, z) + 0.004, top - 0.03 * (1 - ridge(x, z)));
}
function buildDrizzle(curve, N, M) {
  const pts = curve.getSpacedPoints(N);
  const raw = pts.map(p => sagSurface(p.x + CX, p.z + CX));
  const floor = pts.map(p => slabTop(p.x + CX, p.z + CX) + 0.002);
  const ysA = raw.map((_, i) => { let s = 0, n = 0; for (let k = -12; k <= 12; k++) { const j = i + k; if (j >= 0 && j <= N) { s += raw[j]; n++; } } return Math.max(s / n + 0.008, floor[i]); });
  const pos = [], idx = [], heads = [];
  const up = new THREE.Vector3(0, 1, 0), tan = new THREE.Vector3(), side = new THREE.Vector3();
  for (let i = 0; i <= N; i++) {
    const p = pts[i], a = pts[Math.max(0, i - 1)], b = pts[Math.min(N, i + 1)];
    tan.subVectors(b, a).setY(0).normalize();
    side.crossVectors(up, tan).normalize();
    const u = i / N;
    const taper = Math.min(1, u * 16, (1 - u) * 16);
    const w = (0.025 + 0.017 * vn(u * 11.0, 2.3)) * (0.3 + 0.7 * taper);
    const h = w * 0.62;
    const ys = ysA[i];
    heads.push([p.x, ys + h * 0.4, p.z, w]);
    for (let j = 0; j <= M; j++) {
      const ang = Math.PI * j / M, c = Math.cos(ang), s = Math.sin(ang);
      pos.push(p.x + side.x * c * w * 1.08, ys + s * h - h * 0.1, p.z + side.z * c * w * 1.08);
    }
  }
  for (let i = 0; i < N; i++) for (let j = 0; j < M; j++) {
    const a = i * (M + 1) + j, b = (i + 1) * (M + 1) + j;
    idx.push(a, b, a + 1, b, b + 1, a + 1);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setIndex(idx);
  g.computeVertexNormals();
  return { geo: g, heads, perSeg: M * 6, ys: ysA, pts };
}

// Half of a molten strand: a blob where it leaves the surface, thinning to a tip.
// A morph target holds the stretched version with a much thinner neck.
function buildStrand() {
  const S = 26, prof = [new THREE.Vector2(0, -0.06)];
  for (let i = 0; i <= S; i++) { const y = i / S; prof.push(new THREE.Vector2(0.34 + 0.66 * Math.pow(1 - y, 2.2), y)); }
  prof.push(new THREE.Vector2(0.22, 1.04), new THREE.Vector2(0, 1.07));
  const g = new THREE.LatheGeometry(prof, 18);
  const p = g.attributes.position, thin = p.clone();
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i), y = p.getY(i), z = p.getZ(i), r = Math.hypot(x, z);
    if (r < 1e-5) continue;
    const yy = Math.min(1, Math.max(0, y));
    const rt = (y > 1 ? 0.13 * Math.max(0, 1.07 - y) / 0.07 : 0.13 + 0.87 * Math.pow(1 - yy, 3.2));
    const k = rt / r;
    thin.setXYZ(i, x * k, y, z * k);
  }
  g.morphAttributes.position = [thin];
  g.computeVertexNormals();
  return g;
}

function studio(renderer) {
  const s = new THREE.Scene();
  s.add(new THREE.Mesh(new THREE.BoxGeometry(12, 12, 12), new THREE.MeshBasicMaterial({ color: new THREE.Color('#3a2219'), side: THREE.BackSide })));
  const panel = (w, h, hex, k, p) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(hex).multiplyScalar(k), side: THREE.DoubleSide }));
    m.position.set(p[0], p[1], p[2]); m.lookAt(0, 0, 0); s.add(m);
  };
  panel(7, 4, '#fff3e4', 5.0, [0, 5.6, 1]);     // overhead softbox
  panel(4, 5, '#ffe6c8', 3.0, [-5.6, 1.5, 2.5]); // warm key
  panel(4, 6, '#de301f', 2.4, [5.6, 0.5, -1]);   // brand-red bounce
  panel(6, 2.5, '#ffffff', 1.6, [0, 0.5, 5.6]);  // front fill
  panel(5, 3, '#ffd9b0', 1.0, [0, -5.6, 0]);     // floor bounce
  const pm = new THREE.PMREMGenerator(renderer);
  const tex = pm.fromScene(s, 0.035).texture;
  pm.dispose();
  return tex;
}

function wedgeShadowTexture() {
  const S = 5.2, N = 256, c = document.createElement('canvas');
  c.width = c.height = N;
  const g = c.getContext('2d');
  const k = N / S, tx = (-CX + S / 2) * k, tz = (-CX + S / 2) * k;
  g.shadowColor = 'rgba(42,18,9,0.75)'; g.shadowBlur = 26; g.shadowOffsetX = 1000;
  g.fillStyle = '#000';
  g.beginPath(); g.moveTo(tx - 1000, tz); g.lineTo(tx - 1000 + R * k, tz);
  g.arc(tx - 1000, tz, R * k, 0, Math.PI / 2); g.closePath(); g.fill();
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

const NOISE_GLSL = `
float h3(vec3 p){ p = fract(p*0.3183099 + 0.1); p *= 17.0; return fract(p.x*p.y*p.z*(p.x+p.y+p.z)); }
float n3(vec3 x){ vec3 i = floor(x), f = fract(x); f = f*f*(3.0-2.0*f);
  return mix(mix(mix(h3(i), h3(i+vec3(1,0,0)), f.x), mix(h3(i+vec3(0,1,0)), h3(i+vec3(1,1,0)), f.x), f.y),
             mix(mix(h3(i+vec3(0,0,1)), h3(i+vec3(1,0,1)), f.x), mix(h3(i+vec3(0,1,1)), h3(i+vec3(1,1,1)), f.x), f.y), f.z); }`;

function boot() {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  } catch (e) { docEl.classList.add('no-gl'); return; }
  const small = matchMedia('(max-width: 760px)').matches;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 100);
  camera.position.set(0, 0, 11);
  scene.environment = studio(renderer);
  scene.environmentIntensity = 0.85;
  const key = new THREE.DirectionalLight(0xfff1de, 2.3); key.position.set(-4, 6, 5); scene.add(key);
  const rim = new THREE.DirectionalLight(0xffc9a0, 1.5); rim.position.set(4, 3, -5); scene.add(rim);
  scene.add(new THREE.HemisphereLight(0xfff6ee, 0x6a1c10, 0.45));

  // ---------- waffle material: toast gradient, crumb colour and crumb relief ----------
  const U = {
    uBatter: { value: new THREE.Color() }, uLight: { value: new THREE.Color() },
    uGold: { value: new THREE.Color() }, uDark: { value: new THREE.Color() }, uPress: { value: 1 }, uBump: { value: 0.0042 }
  };
  const waffleMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff, roughness: 0.62, metalness: 0, clearcoat: 0.22, clearcoatRoughness: 0.5,
    sheen: 0.55, sheenRoughness: 0.5, sheenColor: new THREE.Color('#ffcf8f')
  });
  waffleMat.onBeforeCompile = (sh) => {
    Object.assign(sh.uniforms, U);
    sh.vertexShader = sh.vertexShader
      .replace('#include <common>', '#include <common>\nattribute float aToast;\nvarying float vToast;\nvarying vec3 vLoc;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\nvToast = aToast; vLoc = position;');
    sh.fragmentShader = sh.fragmentShader
      .replace('#include <common>', `#include <common>
uniform vec3 uBatter; uniform vec3 uLight; uniform vec3 uGold; uniform vec3 uDark; uniform float uPress; uniform float uBump;
varying float vToast; varying vec3 vLoc;
${NOISE_GLSL}
vec3 crumbNormal(vec3 pos, vec3 nrm, float h){
  vec3 dx = dFdx(pos), dy = dFdy(pos);
  vec3 r1 = cross(dy, nrm), r2 = cross(nrm, dx);
  float det = dot(dx, r1);
  vec3 g = sign(det) * (dFdx(h) * r1 + dFdy(h) * r2);
  return normalize(abs(det) * nrm - g);
}`)
      .replace('vec4 diffuseColor = vec4( diffuse, opacity );', `
float tt = clamp(vToast, 0.0, 1.0);
vec3 cooked = mix(uLight, uGold, smoothstep(0.04, 0.48, tt));
cooked = mix(cooked, uDark, smoothstep(0.52, 1.1, tt));
vec3 wcol = mix(uBatter, cooked, uPress);
float sp = n3(vLoc * 46.0) * 0.6 + n3(vLoc * 140.0) * 0.4;
wcol *= 0.93 + 0.12 * sp;
vec4 diffuseColor = vec4( wcol, opacity );`)
      .replace('#include <normal_fragment_maps>', `#include <normal_fragment_maps>
float hC = (n3(vLoc * 38.0) * 0.55 + n3(vLoc * 110.0) * 0.45) * uBump * (0.35 + 0.65 * uPress);
normal = crumbNormal(-vViewPosition, normal, hC);`)
      .replace('#include <roughnessmap_fragment>', `#include <roughnessmap_fragment>
roughnessFactor = clamp(roughnessFactor + (0.5 - tt) * 0.2 + (sp - 0.5) * 0.1, 0.24, 1.0);`);
  };

  // ---------- filling material: new flavours pour in from the point of the wedge ----------
  const CU = {
    uA: { value: new THREE.Color() }, uB: { value: new THREE.Color() }, uMix: { value: 0 },
    uRA: { value: 0.2 }, uRB: { value: 0.2 }, uInv: { value: new THREE.Matrix4() }
  };
  const coreMat = new THREE.MeshPhysicalMaterial({ color: 0xffffff, roughness: 0.2, clearcoat: 1, clearcoatRoughness: 0.08 });
  coreMat.onBeforeCompile = (sh) => {
    Object.assign(sh.uniforms, CU);
    sh.vertexShader = sh.vertexShader
      .replace('#include <common>', '#include <common>\nuniform mat4 uInv;\nvarying vec3 vMP;')
      .replace('#include <project_vertex>', '#include <project_vertex>\nvMP = (uInv * modelMatrix * vec4(transformed, 1.0)).xyz;');
    sh.fragmentShader = sh.fragmentShader
      .replace('#include <common>', `#include <common>
uniform vec3 uA; uniform vec3 uB; uniform float uMix; uniform float uRA; uniform float uRB;
varying vec3 vMP;
${NOISE_GLSL}
float pourFront(){ return uMix * 1.45 - 0.2; }
float pourCoord(){ return length(vMP.xz + vec2(${CX.toFixed(4)})) / 2.15 + (n3(vMP * 2.4) - 0.5) * 0.24; }`)
      .replace('vec4 diffuseColor = vec4( diffuse, opacity );', `
float pc = pourCoord(), pf = pourFront();
float inB = 1.0 - smoothstep(pf - 0.025, pf + 0.025, pc);
float wet = exp(-pow((pc - pf) / 0.035, 2.0)) * step(0.001, uMix) * step(uMix, 0.999);
vec3 fcol = mix(uA, uB, inB) * (1.0 + 0.35 * wet);
vec4 diffuseColor = vec4( fcol, opacity );`)
      .replace('#include <roughnessmap_fragment>', `#include <roughnessmap_fragment>
roughnessFactor = mix(mix(uRA, uRB, inB), 0.04, wet);`);
  };
  const sauceMat = new THREE.MeshPhysicalMaterial({ color: 0x22100a, roughness: 0.34, clearcoat: 0.55, clearcoatRoughness: 0.22, side: THREE.DoubleSide });

  // ---------- geometry ----------
  const NR = small ? 120 : 160, NA = small ? 120 : 160;
  const group = new THREE.Group(); scene.add(group);
  const model = new THREE.Group(); group.add(model);

  const lid = new THREE.Group(), core = new THREE.Group(), base = new THREE.Group();
  model.add(lid, core, base);
  lid.add(new THREE.Mesh(buildSlab(3.1, NR, NA), waffleMat));
  base.add(new THREE.Mesh(buildSlab(8.7, NR, NA), waffleMat));
  core.add(new THREE.Mesh(buildCore(Math.round(NR * 0.7), Math.round(NA * 0.7)), coreMat));

  // drips hanging off the filling; they draw back up as the layers separate
  const dripGeo = new THREE.LatheGeometry([
    [0.0, 0.05], [0.1, 0.04], [0.085, 0.0], [0.062, -0.06], [0.05, -0.13], [0.054, -0.19],
    [0.068, -0.24], [0.062, -0.29], [0.034, -0.322], [0.0, -0.33]
  ].map(([r, y]) => new THREE.Vector2(r, y)), 20);
  const drips = [
    [RC - 0.01, 0.30, 0.8, 0.9], [RC - 0.01, 1.30, 1.0, 0.95], [1.05, 0.0, 0.6, 0.8], [0.62, Math.PI / 2, 0.75, 0.85]
  ];
  const dripMeshes = [];
  for (const [r, th, len, w] of drips) {
    const m = new THREE.Mesh(dripGeo, coreMat);
    let x, z;
    if (th === 0) { x = r; z = -OFF - 0.015; }
    else if (th === Math.PI / 2) { x = -OFF - 0.015; z = r; }
    else { x = -OFF + (r + 0.015) * Math.cos(th); z = -OFF + (r + 0.015) * Math.sin(th); }
    m.position.set(x - CX, -0.01, z - CX);
    m.scale.set(w, len, w); m.userData.len = len;
    core.add(m); dripMeshes.push(m);
  }

  // molten strands that stretch between the layers as they come apart, then snap
  const strandGeo = buildStrand();
  const strands = [];
  const addStrand = (layer, x, z, r0, snap) => {
    const a = new THREE.Mesh(strandGeo, coreMat), b = new THREE.Mesh(strandGeo, coreMat);
    a.visible = b.visible = false; a.frustumCulled = b.frustumCulled = false;
    model.add(a, b);
    strands.push({ layer, x, z, r0, snap, a, b });
  };
  const polar = (r, t) => [r * Math.cos(t), r * Math.sin(t)];
  // upper strands: filling to lid  [radius, angle, thickness, length at which it snaps]
  [[1.72, 0.22, 0.1, 0.32], [1.66, 0.62, 0.13, 0.95], [1.7, 1.02, 0.11, 0.5], [1.62, 1.38, 0.12, 1.2],
   [1.2, 0.45, 0.1, 0.62], [1.1, 1.05, 0.09, 0.4], [0.7, 0.75, 0.08, 0.75], [1.45, 0.85, 0.08, 0.28]]
    .forEach(([r, t, w, s]) => { const [x, z] = polar(r, t); addStrand('up', x, z, w, s); });
  // lower strands: base to filling
  [[1.7, 0.4, 0.11, 0.36], [1.65, 0.85, 0.12, 1.0], [1.68, 1.25, 0.1, 0.55], [1.2, 0.7, 0.09, 0.7], [1.0, 1.2, 0.08, 0.45]]
    .forEach(([r, t, w, s]) => { const [x, z] = polar(r, t); addStrand('down', x, z, w, s); });
  const UPY = new THREE.Vector3(0, 1, 0), vA = new THREE.Vector3(), vB = new THREE.Vector3(), dir = new THREE.Vector3();
  function placeHalf(m, from, toward, len, w, morph) {
    m.position.copy(from);
    dir.subVectors(toward, from).normalize();
    m.quaternion.setFromUnitVectors(UPY, dir);
    m.scale.set(w, Math.max(0.001, len), w);
    m.morphTargetInfluences[0] = morph;
    m.visible = true;
  }
  function updateStrands() {
    lid.updateMatrix();
    const coreTop = core.position.y + TC / 2 - 0.012, coreBot = core.position.y - TC / 2 + 0.012;
    const baseTop = base.position.y + T / 2 - 0.03;
    for (const s of strands) {
      const lx = s.x - CX, lz = s.z - CX;
      if (s.layer === 'up') { vA.set(lx, -T / 2 + 0.02, lz).applyMatrix4(lid.matrix); vB.set(lx, coreTop, lz); }
      else { vA.set(lx, coreBot, lz); vB.set(lx, baseTop, lz); }
      const L = vA.distanceTo(vB);
      if (L < 0.03) { s.a.visible = s.b.visible = false; continue; }
      const k = sst(s.snap, s.snap * 1.35 + 0.1, L);            // 0 while joined, 1 once fully drawn back
      const f = 1 - 0.86 * k;
      const neck = L < s.snap ? sst(0.02, s.snap, L) : 1 - k;     // the neck thins as it stretches, beads up after it snaps
      const w = s.r0 * (1 - 0.22 * sst(0, 1.1, L)) * (1 + 0.15 * k);
      const half = L / 2 * f;
      if (half < 0.012) { s.a.visible = s.b.visible = false; continue; }
      placeHalf(s.a, vA, vB, half, w, neck);
      placeHalf(s.b, vB, vA, half, w, neck);
    }
  }

  // drizzle piped across the lid
  const zig = [[0.30, 0.62], [0.78, 0.28], [0.30, 1.08], [1.24, 0.28], [0.34, 1.50], [1.58, 0.36], [0.98, 1.36]];
  const curve = new THREE.CatmullRomCurve3(zig.map(([x, z]) => new THREE.Vector3(x - CX, 0, z - CX)), false, 'centripetal');
  const DZN = 520;
  const dz = buildDrizzle(curve, DZN, 10);
  const drizzle = new THREE.Mesh(dz.geo, sauceMat);
  lid.add(drizzle);
  const nozzle = new THREE.Mesh(new THREE.SphereGeometry(1, 16, 12), sauceMat);
  nozzle.visible = false; lid.add(nozzle);

  // icing sugar on the lid
  const SUG = small ? 900 : 1400;
  const sp = new Float32Array(SUG * 3), sd = new Float32Array(SUG), ss = new Float32Array(SUG);
  for (let i = 0; i < SUG; i++) {
    let x, z, tries = 0;
    do { const r = R * Math.sqrt(Math.random()), th = Math.random() * Math.PI / 2; x = r * Math.cos(th); z = r * Math.sin(th); tries++; }
    while (Math.min(R - Math.hypot(x, z), x, z) < 0.08 && tries < 20);
    sp[i * 3] = x - CX; sp[i * 3 + 1] = slabTop(x, z) + 0.01; sp[i * 3 + 2] = z - CX;
    sd[i] = Math.random(); ss[i] = 0.6 + Math.random() * 0.9;
  }
  const sugarGeo = new THREE.BufferGeometry();
  sugarGeo.setAttribute('position', new THREE.BufferAttribute(sp, 3));
  sugarGeo.setAttribute('aDelay', new THREE.BufferAttribute(sd, 1));
  sugarGeo.setAttribute('aSize', new THREE.BufferAttribute(ss, 1));
  const sugarMat = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false,
    uniforms: { uFall: { value: 1 }, uSize: { value: 3.2 }, uPR: { value: renderer.getPixelRatio() }, uScale: { value: 1 } },
    vertexShader: `uniform float uFall, uSize, uPR, uScale; attribute float aDelay; attribute float aSize; varying float vA;
      void main(){ float k = clamp((uFall - aDelay*0.6)/0.4, 0.0, 1.0); k = 1.0 - pow(1.0-k, 3.0);
        vec3 p = position; p.y += (1.0-k)*2.4;
        vec4 mv = modelViewMatrix * vec4(p,1.0); gl_Position = projectionMatrix * mv;
        gl_PointSize = uSize * aSize * uPR * uScale * (11.0 / -mv.z); vA = k; }`,
    fragmentShader: `varying float vA; void main(){ float d = length(gl_PointCoord - 0.5); float a = smoothstep(0.5, 0.12, d);
        gl_FragColor = vec4(1.0, 0.985, 0.965, a * vA * 0.95); }`
  });
  const sugar = new THREE.Points(sugarGeo, sugarMat);
  lid.add(sugar);

  // contact shadow under the base
  const shadow = new THREE.Mesh(new THREE.PlaneGeometry(5.2, 5.2),
    new THREE.MeshBasicMaterial({ map: wedgeShadowTexture(), transparent: true, depthWrite: false, toneMapped: false, opacity: 0.7 }));
  shadow.rotation.x = -Math.PI / 2; shadow.position.y = -T / 2 - 0.035;
  base.add(shadow);

  // chocolate vermicelli floating around the wedge
  const SPN = small ? 22 : 36;
  const spr = new THREE.InstancedMesh(new THREE.CapsuleGeometry(0.02, 0.1, 4, 8),
    new THREE.MeshStandardMaterial({ color: 0x2b1309, roughness: 0.42, metalness: 0 }), SPN);
  const sprD = [];
  for (let i = 0; i < SPN; i++) {
    let x, y, z;
    do { x = (Math.random() * 2 - 1) * 2.6; y = -0.3 + Math.random() * 2.0; z = (Math.random() * 2 - 1) * 2.0; }
    while ((x / 2.0) ** 2 + (y / 0.85) ** 2 + (z / 2.0) ** 2 < 1.2);
    sprD.push({ x, y, z, rx: Math.random() * 6, ry: Math.random() * 6, rz: Math.random() * 6, s: 0.15 + Math.random() * 0.35, ph: Math.random() * 6 });
  }
  group.add(spr);
  const dummy = new THREE.Object3D();

  // ---------- flavours ----------
  const FC = FL.map(f => ({
    batter: new THREE.Color(f.batter[0]), light: new THREE.Color(f.batter[1]),
    gold: new THREE.Color(f.batter[2]), dark: new THREE.Color(f.batter[3]),
    core: new THREE.Color(f.core), sauce: new THREE.Color(f.sauce), rough: f.rough
  }));
  let lastF = -1;
  function applyFlavor(f) {
    if (f === lastF) return; lastF = f;
    const i0 = Math.max(0, Math.min(FC.length - 1, Math.floor(f))), i1 = Math.min(FC.length - 1, i0 + 1);
    const raw = Math.min(1, Math.max(0, f - i0));
    const k = raw * raw * (3 - 2 * raw);
    const A = FC[i0], B = FC[i1];
    U.uBatter.value.copy(A.batter).lerp(B.batter, k);
    U.uLight.value.copy(A.light).lerp(B.light, k);
    U.uGold.value.copy(A.gold).lerp(B.gold, k);
    U.uDark.value.copy(A.dark).lerp(B.dark, k);
    CU.uA.value.copy(A.core); CU.uB.value.copy(B.core); CU.uMix.value = raw;
    CU.uRA.value = A.rough; CU.uRB.value = B.rough;
    sauceMat.color.copy(A.sauce).lerp(B.sauce, k);
  }

  // ---------- slots ----------
  const slotEls = [['wHero', '#slot-hero'], ['wCenter', '#slot-center'], ['wLeft', '#slot-left'], ['wOrder', '#slot-order']]
    .map(([k, s]) => [k, document.querySelector(s)]);
  let W = 1, H = 1, visH = 1, visW = 1;
  function resize() {
    W = docEl.clientWidth; H = window.innerHeight;
    renderer.setSize(W, H, false);
    camera.aspect = W / H; camera.updateProjectionMatrix();
    visH = 2 * camera.position.z * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    visW = visH * camera.aspect;
    sugarMat.uniforms.uPR.value = renderer.getPixelRatio();
  }
  resize();
  let rT; addEventListener('resize', () => { clearTimeout(rT); rT = setTimeout(resize, 60); });

  function place() {
    let x = 0, y = 0, s = 0, wt = 0;
    for (const [k, el] of slotEls) {
      const w = RIG[k]; if (!el || w <= 0.0001) continue;
      const r = el.getBoundingClientRect();
      const cx = (r.left + r.width / 2) / W - 0.5, cy = (r.top + r.height / 2) / H - 0.5;
      const sz = Math.min(r.width / W * visW, r.height / H * visH);
      x += cx * visW * w; y += -cy * visH * w; s += sz * w; wt += w;
    }
    if (wt <= 0) return { x: 0, y: 0, s: 3 };
    return { x: x / wt, y: y / wt, s: s / wt };
  }

  // ---------- leader lines for the exploded view ----------
  const lp = [...document.querySelectorAll('.leaders path')], ld = [...document.querySelectorAll('.leaders circle')];
  const callouts = [...document.querySelectorAll('.callout')];
  const ax0 = 1.62, az0 = 0.42;
  const anchors = [
    [lid, new THREE.Vector3(ax0 - CX, Math.max(slabTop(ax0, az0), T / 2 - 0.02) + 0.01, az0 - CX)],
    [core, new THREE.Vector3(-OFF + (RC + 0.02) * Math.cos(0.36) - CX, 0.02, -OFF + (RC + 0.02) * Math.sin(0.36) - CX)],
    [base, new THREE.Vector3((R - 0.03) * Math.cos(0.16) - CX, -0.02, (R - 0.03) * Math.sin(0.16) - CX)],
    [lid, dz.pts[Math.round(DZN * 0.667)].clone().setY(dz.ys[Math.round(DZN * 0.667)] + 0.03)]
  ];
  const shown = [false, false, false, false];
  const v = new THREE.Vector3();
  function leaders() {
    const mob = W <= 760;
    for (let i = 0; i < 4; i++) {
      const k = RIG['lab' + i];
      if (k <= 0.001 || RIG.alpha < 0.05) {
        if (shown[i]) { lp[i].style.opacity = 0; ld[i].setAttribute('r', 0); shown[i] = false; }
        continue;
      }
      shown[i] = true;
      v.copy(anchors[i][1]); anchors[i][0].localToWorld(v); v.project(camera);
      const ax = (v.x + 1) / 2 * W, ay = (1 - v.y) / 2 * H;
      const r = callouts[i].getBoundingClientRect();
      let sx, sy, ex, ey;
      if (mob) { sx = r.left + 18; sy = r.top - 10; ex = sx; ey = sy - 26; }
      else if (r.left > ax) { sx = r.left - 16; sy = r.top + 12; ex = sx - 54; ey = sy; }
      else { sx = r.right + 16; sy = r.top + 12; ex = sx + 54; ey = sy; }
      lp[i].setAttribute('d', `M${sx.toFixed(1)},${sy.toFixed(1)}L${ex.toFixed(1)},${ey.toFixed(1)}L${ax.toFixed(1)},${ay.toFixed(1)}`);
      lp[i].style.opacity = 1;
      lp[i].style.strokeDashoffset = (1 - k).toFixed(3);
      ld[i].setAttribute('cx', ax.toFixed(1)); ld[i].setAttribute('cy', ay.toFixed(1));
      ld[i].setAttribute('r', (6 * Math.min(1, k * 1.6)).toFixed(2));
    }
  }

  // ---------- loop ----------
  let mx = 0, my = 0, tx = 0, ty = 0, lastA = -1, t0 = performance.now();
  addEventListener('pointermove', (e) => { tx = e.clientX / W * 2 - 1; ty = e.clientY / H * 2 - 1; }, { passive: true });
  const idle = REDUCE ? 0 : 1;

  function frame() {
    const t = (performance.now() - t0) / 1000;
    const a = Math.max(0, Math.min(1, RIG.alpha * RIG.intro));
    if (Math.abs(a - lastA) > 0.001) { canvas.style.opacity = a.toFixed(3); lastA = a; }
    if (a < 0.003) { leaders(); return; }
    mx += (tx - mx) * 0.05; my += (ty - my) * 0.05;

    const p = place();
    const sc = p.s / 2.75 * RIG.s;
    group.position.set(
      p.x + RIG.x * visW,
      p.y + RIG.y * visH + Math.sin(t * 0.9) * 0.035 * sc * idle + (1 - RIG.intro) * 1.2,
      0);
    group.scale.setScalar(sc);
    group.rotation.set(
      RIG.rx + my * 0.10 * idle + Math.sin(t * 0.6) * 0.02 * idle,
      RIG.ry + RIG.spin + mx * 0.22 * idle + Math.sin(t * 0.35) * 0.08 * idle - (1 - RIG.intro) * 1.4,
      RIG.rz + (1 - RIG.intro) * 0.35);

    const ex = RIG.explode;
    lid.position.y = LID_Y + ex * 1.0; lid.rotation.set(ex * 0.22, 0, ex * 0.05);
    core.position.y = ex * 0.12;
    base.position.y = BASE_Y - ex * 0.7;
    const dk = Math.max(0, 1 - 1.4 * ex);
    for (const d of dripMeshes) { d.visible = dk > 0.02; d.scale.y = d.userData.len * dk; }
    updateStrands();

    applyFlavor(RIG.flavor);
    U.uPress.value = RIG.press;

    const dzv = Math.min(1, RIG.drizzle);
    drizzle.visible = dzv > 0.002;
    const seg = Math.floor(DZN * dzv);
    dz.geo.setDrawRange(0, seg * dz.perSeg);
    nozzle.visible = dzv > 0.01 && dzv < 0.995;
    if (nozzle.visible) { const hd = dz.heads[Math.min(DZN, seg)]; nozzle.position.set(hd[0], hd[1], hd[2]); nozzle.scale.setScalar(hd[3] * 1.15); }

    sugar.visible = RIG.sugar > 0.002;
    sugarMat.uniforms.uFall.value = RIG.sugar;
    sugarMat.uniforms.uScale.value = sc;

    const sv = RIG.sprinkles;
    spr.visible = sv > 0.01;
    if (spr.visible) {
      for (let i = 0; i < SPN; i++) {
        const d = sprD[i];
        dummy.position.set(d.x, d.y + Math.sin(t * 0.5 + d.ph) * 0.08 * idle, d.z);
        dummy.rotation.set(d.rx + t * d.s * idle, d.ry + t * d.s * 0.7 * idle, d.rz);
        dummy.scale.setScalar(sv);
        dummy.updateMatrix(); spr.setMatrixAt(i, dummy.matrix);
      }
      spr.instanceMatrix.needsUpdate = true;
    }

    model.updateMatrixWorld(true);
    CU.uInv.value.copy(model.matrixWorld).invert();
    renderer.render(scene, camera);
    leaders();
  }
  gsap.ticker.add(frame);
  window.SW3D = { ready: true };
  docEl.classList.add('gl-ready');
}

try { boot(); } catch (e) { console.error(e); docEl.classList.add('no-gl'); }
