// Legal Intelligence — knowledge-graph hero object.
// Renderer-agnostic: pass any three.js renderer/scene/camera + a DOM container.
// createLegalGraph(...) → { object, update(dt, t), dispose() }
import * as THREE from 'three';

const C = {
  ivory: '#FFFFFF', charcoal: '#1E1F1C', ink: '#0B0B0A',
  emerald: '#0F5A43', emeraldLit: '#1F8A66', mint: '#8FD4B6',
  graphite: '#2E302D', steel: '#C9CAC4', hair: '#8C8A82', muted: '#55544F',
};

export const NODES = [
  { id: 'statute',  label: 'Statute',     idx: '01', detail: 'Family Courts Act, 1964', pos: [-2.2, 0.95, -0.4] },
  { id: 'section',  label: 'Section',     idx: '02', detail: 'Section 7 · Institution of suits', pos: [-0.85, 1.95, 0.7] },
  { id: 'case',     label: 'Case law',    idx: '03', detail: 'PLD 2024 SC 112', pos: [2.2, 1.05, 0.3] },
  { id: 'issue',    label: 'Legal issue', idx: '04', detail: 'Custody & maintenance', pos: [1.15, -1.75, 0.9] },
  { id: 'evidence', label: 'Evidence',    idx: '05', detail: 'Exhibit P-3 · Documentary', pos: [-1.45, -1.55, 0.8] },
  { id: 'citation', label: 'Citation',    idx: '06', detail: 'Relied upon · ¶ 14', pos: [2.1, -0.55, -1.3] },
];
const LINKS = [['statute', 'section'], ['section', 'issue'], ['case', 'issue'], ['case', 'citation'], ['evidence', 'issue']];

const CARDS = [
  { id: 'statute', node: 'statute', tag: 'Statute', ref: 'XXXV / 1964', title: 'Family Courts Act, 1964', sub: 'Act of Parliament · Pakistan', foot: 'Section 7', pos: [-3.05, 2.05, -0.9], rot: [0.04, 0.42, -0.03], seed: 3 },
  { id: 'case', node: 'case', tag: 'Case law', ref: 'SC', title: 'PLD 2024 SC 112', sub: 'Supreme Court of Pakistan', foot: 'Held · ¶ 14', pos: [3.15, 2.15, -0.7], rot: [0.05, -0.4, 0.03], seed: 7 },
  { id: 'evidence', node: 'evidence', tag: 'Evidence', ref: 'P-3', title: 'Evidence', sub: 'Exhibit P-3 · Documentary', foot: 'Linked to issue 04', pos: [-2.75, -2.0, 0.6], rot: [-0.05, 0.36, 0.04], seed: 11, highlight: true },
  { id: 'citation', node: 'citation', tag: 'Citation', ref: '¶ 14', title: 'Section 7', sub: 'cited in PLD 2024 SC 112', foot: 'Precedent chain', pos: [3.3, -1.75, 0.2], rot: [-0.04, -0.44, -0.02], seed: 5 },
];

const CARD_W = 0.5, CARD_H = 0.664;

function rng(seed) {
  let a = seed * 9301 + 49297;
  return () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}

function buildEnvironment(renderer) {
  const pmrem = new THREE.PMREMGenerator(renderer);
  const env = new THREE.Scene();
  const geos = [];
  const add = (geo, color, side = THREE.FrontSide) => { geos.push(geo); const m = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color, side })); env.add(m); return m; };
  add(new THREE.SphereGeometry(20, 32, 16), new THREE.Color('#b9b4aa'), THREE.BackSide);
  const floor = add(new THREE.CircleGeometry(20, 32), new THREE.Color('#2a2a27'));
  floor.rotation.x = -Math.PI / 2; floor.position.y = -6;
  const panel = (w, h, x, y, z, k) => { const m = add(new THREE.PlaneGeometry(w, h), new THREE.Color(k, k, k * 0.97), THREE.DoubleSide); m.position.set(x, y, z); m.lookAt(0, 0, 0); };
  panel(10, 4, 0, 9, 4, 6); panel(3, 10, -10, 2, 5, 3.2); panel(3, 8, 10, 1, -3, 2); panel(14, 1.2, 0, 2.5, -12, 1.4);
  const rt = pmrem.fromScene(env, 0.02);
  pmrem.dispose();
  env.traverse((o) => o.material && o.material.dispose());
  geos.forEach((g) => g.dispose());
  return rt;
}

function wrap(ctx, text, maxW) {
  const words = text.split(' '); const lines = []; let line = '';
  for (const w of words) { const t = line ? line + ' ' + w : w; if (ctx.measureText(t).width > maxW && line) { lines.push(line); line = w; } else line = t; }
  lines.push(line); return lines;
}

function drawCard(card, renderer) {
  const W = 512, H = 680, S = 2;
  const cv = document.createElement('canvas'); cv.width = W * S; cv.height = H * S;
  const ctx = cv.getContext('2d'); ctx.scale(S, S);
  const pad = 44, r = rng(card.seed);
  const ls = (v) => { if ('letterSpacing' in ctx) ctx.letterSpacing = v; };
  // tag row
  ctx.fillStyle = C.emerald; ctx.beginPath(); ctx.arc(pad + 5, pad + 11, 5, 0, Math.PI * 2); ctx.fill();
  ctx.font = '500 19px "Geist Mono", ui-monospace, monospace'; ls('3px');
  ctx.fillText(card.tag.toUpperCase(), pad + 22, pad + 18);
  ctx.fillStyle = C.hair; ctx.textAlign = 'right'; ctx.fillText(card.ref, W - pad, pad + 18); ctx.textAlign = 'left'; ls('0px');
  // title
  ctx.fillStyle = C.ink; ctx.font = '400 50px Newsreader, Georgia, serif';
  let y = pad + 112;
  for (const l of wrap(ctx, card.title, W - pad * 2)) { ctx.fillText(l, pad, y); y += 54; }
  ctx.fillStyle = C.muted; ctx.font = '400 21px Geist, system-ui, sans-serif';
  ctx.fillText(card.sub, pad, y + 2); y += 38;
  ctx.fillStyle = 'rgba(30,31,28,0.16)'; ctx.fillRect(pad, y, W - pad * 2, 1.5); y += 34;
  // body lines
  const bar = (x, yy, w, col) => { ctx.fillStyle = col; ctx.beginPath(); ctx.roundRect(x, yy, w, 8, 4); ctx.fill(); };
  const rows = Math.floor((H - pad - 90 - y) / 24);
  for (let i = 0; i < rows; i++) {
    const last = i === rows - 1 || r() < 0.14;
    const w = (W - pad * 2) * (last ? 0.35 + r() * 0.3 : 0.82 + r() * 0.18);
    const hi = card.highlight && (i === 2 || i === 3);
    if (hi) { ctx.fillStyle = 'rgba(31,138,102,0.12)'; ctx.fillRect(pad - 10, y - 8, W - pad * 2 + 20, 24); }
    bar(pad, y, w, hi ? 'rgba(15,90,67,0.55)' : 'rgba(30,31,28,0.10)');
    y += last && i !== rows - 1 ? 36 : 24;
    if (y > H - pad - 90) break;
  }
  // footer
  ctx.fillStyle = 'rgba(30,31,28,0.16)'; ctx.fillRect(pad, H - pad - 44, W - pad * 2, 1.5);
  ctx.fillStyle = C.charcoal; ctx.font = '500 18px "Geist Mono", ui-monospace, monospace'; ls('2px');
  ctx.fillText(card.foot.toUpperCase(), pad, H - pad - 6);
  ctx.fillStyle = C.emerald; ctx.textAlign = 'right'; ctx.fillText('→', W - pad, H - pad - 6);
  const tex = new THREE.CanvasTexture(cv);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
  return tex;
}

function shadowTexture() {
  const cv = document.createElement('canvas'); cv.width = cv.height = 256;
  const ctx = cv.getContext('2d');
  const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
  g.addColorStop(0, 'rgba(30,31,28,0.22)'); g.addColorStop(0.5, 'rgba(30,31,28,0.08)'); g.addColorStop(1, 'rgba(30,31,28,0)');
  ctx.fillStyle = g; ctx.fillRect(0, 0, 256, 256);
  const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace; return t;
}

let cssInjected = false;
function injectCSS() {
  if (cssInjected || typeof document === 'undefined') return; cssInjected = true;
  const s = document.createElement('style');
  s.textContent = `
.lig-label{position:absolute;left:0;top:0;display:flex;align-items:center;gap:8px;font:500 10.5px/1 "Geist Mono",ui-monospace,monospace;letter-spacing:.14em;text-transform:uppercase;color:#1E1F1C;white-space:nowrap;will-change:transform,opacity;transition:color .5s ease;pointer-events:none}
.lig-label.is-left{flex-direction:row-reverse}
.lig-tick{width:16px;height:1px;background:currentColor;opacity:.3;transition:width .6s cubic-bezier(.2,.7,.2,1),opacity .4s}
.lig-idx{color:#8C8A82}
.lig-detail{font:400 12.5px/1 Geist,system-ui,sans-serif;letter-spacing:0;text-transform:none;color:#4A4944;max-width:0;overflow:hidden;opacity:0;transition:max-width .7s cubic-bezier(.2,.7,.2,1),opacity .5s}
.lig-label.is-hover{color:#0F5A43}
.lig-label.is-hover .lig-tick{width:26px;opacity:.7}
.lig-label.is-hover .lig-detail{max-width:260px;opacity:1}`;
  document.head.appendChild(s);
}

export async function createLegalGraph(opts) {
  const { renderer, scene, camera, container, labelRoot = container, offsetX = 0.2, breakpoint = 1024 } = opts;
  const reduce = opts.reducedMotion ?? (typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches);
  const speed = reduce ? 0.3 : 1;
  const drift = reduce ? 0 : 1;

  if (document.fonts) {
    await Promise.race([
      Promise.all(['400 50px Newsreader', '500 19px "Geist Mono"', '400 21px Geist'].map((f) => document.fonts.load(f).catch(() => {}))),
      new Promise((r) => setTimeout(r, 1500)),
    ]);
  }
  injectCSS();

  renderer.toneMapping = THREE.NeutralToneMapping;
  renderer.toneMappingExposure = 1;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  const prevBg = scene.background, prevEnv = scene.environment;
  scene.background = new THREE.Color(C.ivory);
  const envRT = buildEnvironment(renderer);
  scene.environment = envRT.texture;
  camera.fov = 30; camera.near = 0.1; camera.far = 200;

  const rig = new THREE.Group(); rig.name = 'lighting';
  rig.add(new THREE.HemisphereLight(0xffffff, 0xd6d0c4, 0.7));
  const key = new THREE.DirectionalLight(0xffffff, 1.6); key.position.set(4, 6, 6); rig.add(key);
  const rim = new THREE.DirectionalLight(0xe4f0ea, 0.9); rim.position.set(-5, 2, -4); rig.add(rim);
  scene.add(rig);

  // ─── materials (small shared palette) ───
  const glassBase = { color: 0xffffff, metalness: 0, transmission: 1, ior: 1.46, clearcoat: 1, clearcoatRoughness: 0.05, specularIntensity: 1, envMapIntensity: 1.15 };
  const M = {
    glass: new THREE.MeshPhysicalMaterial({ ...glassBase, name: 'core_glass', roughness: 0.06, thickness: 1.5, attenuationColor: new THREE.Color('#2F4F45'), attenuationDistance: 1.9 }),
    bead: new THREE.MeshPhysicalMaterial({ ...glassBase, name: 'node_glass', roughness: 0.1, thickness: 0.2, attenuationColor: new THREE.Color('#1E4A3C'), attenuationDistance: 0.12 }),
    steel: new THREE.MeshStandardMaterial({ name: 'brushed_steel', color: C.steel, metalness: 1, roughness: 0.26 }),
    graphite: new THREE.MeshStandardMaterial({ name: 'graphite', color: C.graphite, metalness: 0.85, roughness: 0.32 }),
    energy: new THREE.MeshStandardMaterial({ name: 'emerald_energy', color: C.emerald, emissive: C.emeraldLit, emissiveIntensity: 1.1, roughness: 0.4 }),
    nucleus: new THREE.MeshStandardMaterial({ name: 'core_nucleus', color: C.emerald, emissive: C.emeraldLit, emissiveIntensity: 1.6, roughness: 0.3 }),
    spark: new THREE.MeshBasicMaterial({ name: 'emerald_spark', color: new THREE.Color(C.mint).multiplyScalar(2.2), toneMapped: false }),
    lattice: new THREE.LineBasicMaterial({ name: 'emerald_lattice', color: new THREE.Color('#5CC39C').multiplyScalar(1.6), toneMapped: false }),
    latticeDim: new THREE.LineBasicMaterial({ name: 'emerald_lattice_inner', color: new THREE.Color('#2F9A74').multiplyScalar(1.4), toneMapped: false }),
    edge: new THREE.LineBasicMaterial({ name: 'graph_edge', vertexColors: true, transparent: true, depthWrite: false, toneMapped: false }),
    flow: new THREE.MeshBasicMaterial({ name: 'flow_particle', color: 0xffffff, toneMapped: false }),
    card: new THREE.MeshPhysicalMaterial({ name: 'card_glass', color: 0xffffff, metalness: 0, roughness: 0.3, transmission: 0.7, thickness: 0.06, ior: 1.4, clearcoat: 0.5, clearcoatRoughness: 0.2 }),
    cardEdge: new THREE.LineBasicMaterial({ name: 'card_edge', color: C.charcoal, transparent: true, opacity: 0.2, depthWrite: false }),
    leader: new THREE.LineDashedMaterial({ name: 'card_leader', color: C.hair, dashSize: 0.035, gapSize: 0.05, transparent: true, opacity: 0.6, depthWrite: false, toneMapped: false }),
  };
  const textures = [];
  const mesh = (geo, mat, name) => { const m = new THREE.Mesh(geo, mat); m.name = name; return m; };

  const root = new THREE.Group(); root.name = 'LegalIntelligence';
  const graph = new THREE.Group(); graph.name = 'knowledge_graph'; root.add(graph);

  // ─── AI core ───
  const core = new THREE.Group(); core.name = 'ai_core'; root.add(core);
  core.add(mesh(new THREE.SphereGeometry(1, 128, 96), M.glass, 'core_shell'));
  const surface = new THREE.Group(); surface.name = 'core_surface'; core.add(surface);
  const band = mesh(new THREE.TorusGeometry(1.004, 0.0034, 12, 256), M.steel, 'core_equator'); band.rotation.x = Math.PI / 2; surface.add(band);
  const meridian = mesh(new THREE.TorusGeometry(1.004, 0.0018, 8, 256), M.steel, 'core_meridian'); meridian.rotation.y = 0.6; surface.add(meridian);
  surface.rotation.set(0.35, 0, -0.28);
  const arcs = new THREE.Group(); arcs.name = 'core_arcs'; core.add(arcs);
  const arcA = mesh(new THREE.TorusGeometry(1.22, 0.0042, 10, 220, Math.PI * 1.3), M.steel, 'orbit_arc_a'); arcA.rotation.set(1.2, 0.2, 0); arcs.add(arcA);
  const arcB = mesh(new THREE.TorusGeometry(1.34, 0.0024, 8, 220, Math.PI * 0.62), M.graphite, 'orbit_arc_b'); arcB.rotation.set(-0.5, 0.9, 0.4); arcs.add(arcB);
  const beadGeo = new THREE.SphereGeometry(0.018, 16, 12);
  for (const [arc, R, a] of [[arcA, 1.22, Math.PI * 1.3], [arcB, 1.34, Math.PI * 0.62]]) {
    for (const ang of [0, a]) { const b = mesh(beadGeo, M.graphite, arc.name + '_cap'); b.position.set(Math.cos(ang) * R, Math.sin(ang) * R, 0); arc.add(b); }
  }

  const inner = new THREE.Group(); inner.name = 'core_interior'; core.add(inner);
  const nucleus = mesh(new THREE.IcosahedronGeometry(0.14, 5), M.nucleus, 'core_nucleus'); inner.add(nucleus);
  const latGeo = new THREE.IcosahedronGeometry(0.56, 1);
  const lattice = new THREE.LineSegments(new THREE.EdgesGeometry(latGeo), M.lattice); lattice.name = 'reasoning_lattice'; inner.add(lattice);
  const latInner = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.DodecahedronGeometry(0.32)), M.latticeDim); latInner.name = 'reasoning_lattice_inner'; inner.add(latInner);
  const verts = []; const pa = latGeo.attributes.position;
  for (let i = 0; i < pa.count; i++) { const v = new THREE.Vector3().fromBufferAttribute(pa, i); if (!verts.some((u) => u.distanceToSquared(v) < 1e-6)) verts.push(v); }
  latGeo.dispose();
  const dummy = new THREE.Object3D();
  const latNodes = new THREE.InstancedMesh(new THREE.IcosahedronGeometry(1, 1), M.spark, verts.length); latNodes.name = 'lattice_nodes';
  verts.forEach((v, i) => { dummy.position.copy(v); dummy.scale.setScalar(0.013); dummy.updateMatrix(); latNodes.setMatrixAt(i, dummy.matrix); });
  lattice.add(latNodes);
  const cloud = new THREE.InstancedMesh(new THREE.IcosahedronGeometry(1, 0), M.spark, 170); cloud.name = 'reasoning_particles';
  const rr = rng(42);
  for (let i = 0; i < cloud.count; i++) {
    const u = rr() * 2 - 1, th = rr() * Math.PI * 2, rad = 0.22 + Math.pow(rr(), 0.7) * 0.66, s = Math.sqrt(1 - u * u);
    dummy.position.set(s * Math.cos(th) * rad, u * rad, s * Math.sin(th) * rad); dummy.scale.setScalar(0.004 + rr() * 0.006); dummy.updateMatrix(); cloud.setMatrixAt(i, dummy.matrix);
  }
  inner.add(cloud);
  const gyroA = mesh(new THREE.TorusGeometry(0.76, 0.0026, 8, 180), M.steel, 'gyro_ring_a'); inner.add(gyroA);
  const gyroB = mesh(new THREE.TorusGeometry(0.72, 0.002, 8, 180), M.steel, 'gyro_ring_b'); gyroB.rotation.x = Math.PI / 2; inner.add(gyroB);

  // ─── nodes ───
  const beadG = new THREE.SphereGeometry(0.1, 48, 32), seedG = new THREE.SphereGeometry(0.036, 24, 16);
  const ringG = new THREE.TorusGeometry(0.17, 0.0034, 8, 128), arcG = new THREE.TorusGeometry(0.135, 0.002, 6, 96, Math.PI * 1.4), haloG = new THREE.TorusGeometry(0.235, 0.0028, 6, 128);
  const nodes = NODES.map((n, i) => {
    const g = new THREE.Group(); g.name = 'node_' + n.id; graph.add(g);
    const body = new THREE.Group(); body.name = 'node_' + n.id + '_body'; g.add(body);
    body.add(mesh(beadG, M.bead, 'node_' + n.id + '_glass'));
    body.add(mesh(seedG, M.energy, 'node_' + n.id + '_seed'));
    const ring = mesh(ringG, M.steel, 'node_' + n.id + '_ring'); body.add(ring);
    const arc = mesh(arcG, M.graphite, 'node_' + n.id + '_arc'); body.add(arc);
    const haloMat = new THREE.MeshBasicMaterial({ name: 'hover_halo', color: C.emeraldLit, transparent: true, opacity: 0, depthWrite: false, toneMapped: false });
    const halo = mesh(haloG, haloMat, 'node_' + n.id + '_halo'); g.add(halo);
    const el = document.createElement('div'); el.className = 'lig-label';
    el.innerHTML = `<i class="lig-tick"></i><span class="lig-idx">${n.idx}</span><span class="lig-name">${n.label}</span><span class="lig-detail">${n.detail}</span>`;
    labelRoot.appendChild(el);
    return { ...n, g, body, ring, arc, halo, haloMat, el, base: new THREE.Vector3(...n.pos), ph: i * 1.7, h: 0, bump: 0, world: new THREE.Vector3(), side: null };
  });
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));

  // ─── edges ───
  const SEG = 72;
  const bgC = new THREE.Color(C.ivory), baseC = new THREE.Color('#7E7C75'), hiC = new THREE.Color(C.emeraldLit);
  const makeEdge = (a, b, isCore, i) => {
    const pos = new Float32Array(SEG * 3), col = new Float32Array(SEG * 4);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3).setUsage(THREE.DynamicDrawUsage));
    geo.setAttribute('color', new THREE.BufferAttribute(col, 4).setUsage(THREE.DynamicDrawUsage));
    const line = new THREE.Line(geo, M.edge); line.name = isCore ? 'edge_core_' + b.id : 'edge_' + a.id + '_' + b.id; line.frustumCulled = false;
    graph.add(line);
    return { a, b, isCore, line, pos, col, curve: new THREE.QuadraticBezierCurve3(new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()), a0: isCore ? 0.42 : 0.3, sign: i % 2 ? 1 : -1, phase: i * 0.37 };
  };
  const edges = [
    ...nodes.map((n, i) => makeEdge(null, n, true, i)),
    ...LINKS.map(([a, b], i) => makeEdge(byId[a], byId[b], false, i + 6)),
  ];

  // ─── flow particles (instanced, colour-faded toward the background) ───
  const TRAIL = 5;
  const flows = [
    ...edges.slice(0, 6).map((e, i) => ({ e, dir: e.b.id === 'evidence' || e.b.id === 'issue' ? 1 : -1, v: 0.16 + (i % 3) * 0.04, u: (i * 0.29) % 1 })),
    { e: edges[6], dir: 1, v: 0.14, u: 0.3 }, { e: edges[8], dir: -1, v: 0.12, u: 0.7 }, { e: edges[10], dir: -1, v: 0.15, u: 0.1 },
    { e: edges[2], dir: -1, v: 0.2, u: 0.62 },
  ];
  const flowMesh = new THREE.InstancedMesh(new THREE.IcosahedronGeometry(1, 2), M.flow, flows.length * TRAIL);
  flowMesh.name = 'retrieval_particles'; flowMesh.frustumCulled = false;
  const tmpC = new THREE.Color();
  for (let i = 0; i < flowMesh.count; i++) flowMesh.setColorAt(i, bgC);
  graph.add(flowMesh);

  // ─── documents ───
  const docs = new THREE.Group(); docs.name = 'documents'; root.add(docs);
  const shape = new THREE.Shape(); { const w = CARD_W / 2, h = CARD_H / 2, r = 0.028;
    shape.moveTo(-w + r, -h); shape.lineTo(w - r, -h); shape.quadraticCurveTo(w, -h, w, -h + r); shape.lineTo(w, h - r); shape.quadraticCurveTo(w, h, w - r, h);
    shape.lineTo(-w + r, h); shape.quadraticCurveTo(-w, h, -w, h - r); shape.lineTo(-w, -h + r); shape.quadraticCurveTo(-w, -h, -w + r, -h); }
  const bodyG = new THREE.ExtrudeGeometry(shape, { depth: 0.006, bevelEnabled: false, curveSegments: 8 }); bodyG.translate(0, 0, -0.003);
  const printG = new THREE.PlaneGeometry(CARD_W, CARD_H);
  const edgeG = new THREE.BufferGeometry().setFromPoints(shape.getPoints(8).map((p) => new THREE.Vector3(p.x, p.y, 0.0036)));
  const cards = CARDS.map((c, i) => {
    const g = new THREE.Group(); g.name = 'doc_' + c.id; g.scale.setScalar(1.45); docs.add(g);
    g.add(mesh(bodyG, M.card, 'doc_' + c.id + '_body'));
    const tex = drawCard(c, renderer); textures.push(tex);
    const print = mesh(printG, new THREE.MeshBasicMaterial({ name: 'doc_print_' + c.id, map: tex, transparent: true, depthWrite: false, toneMapped: false }), 'doc_' + c.id + '_print');
    print.position.z = 0.0048; g.add(print);
    const outline = new THREE.LineLoop(edgeG, M.cardEdge); outline.name = 'doc_' + c.id + '_edge'; g.add(outline);
    const lg = new THREE.BufferGeometry(); lg.setAttribute('position', new THREE.BufferAttribute(new Float32Array(24 * 3), 3));
    const leader = new THREE.Line(lg, M.leader); leader.name = 'doc_' + c.id + '_leader'; leader.frustumCulled = false; docs.add(leader);
    return { ...c, g, leader, base: new THREE.Vector3(...c.pos), baseRot: new THREE.Euler(...c.rot), ph: i * 2.1, curve: new THREE.QuadraticBezierCurve3(new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()) };
  });

  const shadowTex = shadowTexture(); textures.push(shadowTex);
  const shadow = mesh(new THREE.PlaneGeometry(5.4, 5.4), new THREE.MeshBasicMaterial({ name: 'contact_shadow', map: shadowTex, transparent: true, depthWrite: false, toneMapped: false }), 'contact_shadow');
  shadow.rotation.x = -Math.PI / 2; shadow.position.y = -2.75; shadow.scale.set(1, 0.42, 1); root.add(shadow);

  scene.add(root);

  // ─── pointer ───
  const ptr = { nx: 0, ny: 0, sx: 0, sy: 0, inside: false, ndc: new THREE.Vector2() };
  const onMove = (e) => {
    ptr.nx = (e.clientX / innerWidth) * 2 - 1; ptr.ny = (e.clientY / innerHeight) * 2 - 1;
    const r = renderer.domElement.getBoundingClientRect();
    ptr.inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
    ptr.ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
  };
  const onLeave = () => { ptr.inside = false; ptr.nx = ptr.ny = 0; };
  window.addEventListener('pointermove', onMove, { passive: true });
  document.documentElement.addEventListener('pointerleave', onLeave);
  const ray = new THREE.Raycaster();

  // ─── frame ───
  const V = () => new THREE.Vector3();
  const A = V(), B = V(), mid = V(), dir = V(), perp = V(), P = V(), camDir = V(), coreW = V(), tmp = V();
  const UP = new THREE.Vector3(0, 1, 0), q = new THREE.Quaternion();
  let time = 0, hovered = null;
  const gauss = (x, w) => Math.exp(-(x * x) / w);

  function layoutCamera() {
    const w = container.clientWidth || 1, h = container.clientHeight || 1, aspect = w / h;
    const desktop = w >= breakpoint;
    const R = 3.35, tanH = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    const frac = desktop ? 0.46 : 0.94;
    const dist = Math.max((2 * R / frac) / (2 * tanH * aspect), (desktop ? 1.16 : 1.05) * R / tanH);
    camera.aspect = aspect;
    camera.position.set(Math.sin(time * 0.07) * 0.3 * drift + ptr.sx * 0.6, 0.25 + Math.sin(time * 0.05) * 0.12 * drift - ptr.sy * 0.35, dist);
    camera.lookAt(0, 0, 0);
    const shift = desktop ? w * offsetX : 0;
    camera.setViewOffset(w, h, -shift, 0, w, h);
    camera.updateProjectionMatrix();
    camera.updateMatrixWorld();
    return { w, h };
  }

  function update(dt) {
    time += dt * speed;
    const k = Math.min(1, dt * 2.2);
    ptr.sx += (ptr.nx - ptr.sx) * k; ptr.sy += (ptr.ny - ptr.sy) * k;
    const { w, h } = layoutCamera();

    root.rotation.y = ptr.sx * 0.07; root.rotation.x = ptr.sy * 0.04;
    root.position.y = Math.sin(time * 0.4) * 0.05 * (drift || 0.3);

    // core
    inner.rotation.y += dt * speed * 0.12; inner.rotation.x = Math.sin(time * 0.2) * 0.2;
    latInner.rotation.y -= dt * speed * 0.3; latInner.rotation.z += dt * speed * 0.1;
    gyroA.rotation.x += dt * speed * 0.18; gyroB.rotation.y += dt * speed * 0.14;
    surface.rotation.y += dt * speed * 0.04;
    arcA.rotation.z += dt * speed * 0.09; arcB.rotation.z -= dt * speed * 0.06;

    const cycle = time % 9;
    const flash = gauss(cycle - 0.12, 0.05) + gauss(cycle - 9.12, 0.05);
    M.nucleus.emissiveIntensity = 1.5 + flash * 1.6 + Math.sin(time * 1.1) * 0.15;

    // graph orbit
    graph.rotation.y = Math.sin(time * 0.045) * 0.55;
    graph.rotation.x = Math.sin(time * 0.08) * 0.06;
    graph.updateMatrixWorld(true);

    // hover
    let hit = null;
    if (ptr.inside) {
      ray.setFromCamera(ptr.ndc, camera);
      let best = 0.3 * 0.3;
      for (const n of nodes) { n.g.getWorldPosition(tmp); const d = ray.ray.distanceSqToPoint(tmp); if (d < best) { best = d; hit = n; } }
    }
    if (hit !== hovered) { hovered = hit; if (opts.cursorEl) opts.cursorEl.style.cursor = hit ? 'pointer' : ''; }

    camera.getWorldDirection(camDir);
    core.getWorldPosition(coreW);
    const coreDepth = tmp.copy(coreW).sub(camera.position).dot(camDir);
    const coreScreen = coreW.clone().project(camera);

    for (const n of nodes) {
      n.g.position.set(n.base.x + Math.sin(time * 0.5 + n.ph) * 0.07, n.base.y + Math.cos(time * 0.43 + n.ph) * 0.06, n.base.z + Math.sin(time * 0.37 + n.ph) * 0.07);
      n.h += ((hovered === n ? 1 : 0) - n.h) * Math.min(1, dt * 5);
      n.bump = gauss(cycle - 1.5, 0.04) * 0.16;
      n.body.scale.setScalar(1 + n.h * 0.32 + n.bump);
      n.g.updateMatrixWorld(true);
      n.g.getWorldQuaternion(q); q.invert().multiply(camera.quaternion);
      n.ring.quaternion.copy(q); n.halo.quaternion.copy(q);
      n.arc.rotation.x += dt * speed * 0.5; n.arc.rotation.y += dt * speed * 0.3;
      n.halo.scale.setScalar(0.85 + n.h * 0.25 + n.bump * 1.4);
      n.haloMat.opacity = Math.min(1, n.h * 0.9 + n.bump * 3);
      // label
      n.g.getWorldPosition(n.world);
      const depth = tmp.copy(n.world).sub(camera.position).dot(camDir);
      P.copy(n.world).project(camera);
      const x = (P.x * 0.5 + 0.5) * w, y = (-P.y * 0.5 + 0.5) * h;
      const left = P.x < coreScreen.x;
      if (left !== n.side) { n.side = left; n.el.classList.toggle('is-left', left); }
      n.el.classList.toggle('is-hover', n.h > 0.5);
      const behind = THREE.MathUtils.clamp((depth - coreDepth) / 0.8, 0, 1);
      n.el.style.opacity = (1 - behind * 0.6).toFixed(3);
      n.el.style.transform = `translate3d(${left ? `calc(${x - 16}px - 100%)` : `${x + 16}px`}, ${y - 5}px, 0)`;
    }

    // edges
    for (const e of edges) {
      if (e.isCore) {
        dir.copy(e.b.g.position).normalize();
        A.copy(dir).multiplyScalar(1.04); B.copy(e.b.g.position).addScaledVector(dir, -0.13);
        mid.addVectors(A, B).multiplyScalar(0.5);
        perp.crossVectors(dir, UP); if (perp.lengthSq() < 1e-4) perp.set(1, 0, 0); perp.normalize();
        mid.addScaledVector(perp, A.distanceTo(B) * 0.14 * e.sign);
      } else {
        dir.subVectors(e.b.g.position, e.a.g.position).normalize();
        A.copy(e.a.g.position).addScaledVector(dir, 0.13); B.copy(e.b.g.position).addScaledVector(dir, -0.13);
        mid.addVectors(A, B).multiplyScalar(0.5);
        perp.copy(mid); if (perp.lengthSq() < 1e-4) perp.set(0, 1, 0); perp.normalize();
        mid.addScaledVector(perp, A.distanceTo(B) * 0.22);
      }
      e.curve.v0.copy(A); e.curve.v1.copy(mid); e.curve.v2.copy(B);
      const pulseU = e.isCore ? cycle / 1.5 : (cycle - 1.55) / 1.4;
      const shimU = (time * 0.11 + e.phase) % 1.4 - 0.2;
      const hv = Math.max(e.b.h, e.a ? e.a.h : 0);
      for (let i = 0; i < SEG; i++) {
        const u = i / (SEG - 1);
        e.curve.getPoint(u, P);
        e.pos[i * 3] = P.x; e.pos[i * 3 + 1] = P.y; e.pos[i * 3 + 2] = P.z;
        let kk = gauss(u - shimU, 0.006) * 0.28;
        if (pulseU > -0.1 && pulseU < 1.1) kk = Math.max(kk, gauss(u - pulseU, 0.004) * 0.9);
        kk = Math.max(kk, hv * 0.75);
        const ends = Math.min(1, u / 0.05, (1 - u) / 0.05);
        e.col[i * 4] = baseC.r + (hiC.r - baseC.r) * kk;
        e.col[i * 4 + 1] = baseC.g + (hiC.g - baseC.g) * kk;
        e.col[i * 4 + 2] = baseC.b + (hiC.b - baseC.b) * kk;
        e.col[i * 4 + 3] = (e.a0 + (0.95 - e.a0) * kk) * (0.35 + 0.65 * ends);
      }
      e.line.geometry.attributes.position.needsUpdate = true;
      e.line.geometry.attributes.color.needsUpdate = true;
    }

    // particles
    let idx = 0;
    for (const f of flows) {
      f.u = (f.u + dt * speed * f.v) % 1;
      const boost = f.e.b.h || (f.e.a && f.e.a.h) ? 1 + Math.max(f.e.b.h, f.e.a ? f.e.a.h : 0) * 0.6 : 1;
      for (let j = 0; j < TRAIL; j++) {
        let u = f.u - j * 0.016;
        const vis = u >= 0 ? Math.min(1, u / 0.08, (1 - u) / 0.08) : 0;
        u = THREE.MathUtils.clamp(u, 0, 1);
        f.e.curve.getPoint(f.dir > 0 ? u : 1 - u, P);
        dummy.position.copy(P); dummy.scale.setScalar((0.021 - j * 0.0034) * boost); dummy.updateMatrix();
        flowMesh.setMatrixAt(idx, dummy.matrix);
        tmpC.copy(bgC).lerp(hiC, vis * (1 - j * 0.18)); flowMesh.setColorAt(idx, tmpC);
        idx++;
      }
    }
    flowMesh.instanceMatrix.needsUpdate = true; flowMesh.instanceColor.needsUpdate = true;

    // documents
    root.updateMatrixWorld(true);
    for (const c of cards) {
      c.g.position.set(c.base.x + Math.sin(time * 0.3 + c.ph) * 0.05, c.base.y + Math.sin(time * 0.45 + c.ph) * 0.08, c.base.z + Math.cos(time * 0.33 + c.ph) * 0.04);
      c.g.rotation.set(c.baseRot.x + Math.sin(time * 0.27 + c.ph) * 0.03, c.baseRot.y + Math.sin(time * 0.21 + c.ph) * 0.05, c.baseRot.z + Math.sin(time * 0.31 + c.ph) * 0.015);
      c.g.updateMatrixWorld(true);
      const node = byId[c.node];
      B.copy(node.world); root.worldToLocal(B);
      const side = B.x > c.g.position.x ? 1 : -1;
      A.set(side * CARD_W * 0.5, 0, 0.004); c.g.localToWorld(A); root.worldToLocal(A);
      dir.subVectors(B, A); B.addScaledVector(dir.normalize(), -0.16);
      mid.addVectors(A, B).multiplyScalar(0.5); mid.y += 0.12;
      c.curve.v0.copy(A); c.curve.v1.copy(mid); c.curve.v2.copy(B);
      const arr = c.leader.geometry.attributes.position.array;
      for (let i = 0; i < 24; i++) { c.curve.getPoint(i / 23, P); arr[i * 3] = P.x; arr[i * 3 + 1] = P.y; arr[i * 3 + 2] = P.z; }
      c.leader.geometry.attributes.position.needsUpdate = true;
      c.leader.computeLineDistances();
    }
  }

  function dispose() {
    window.removeEventListener('pointermove', onMove);
    document.documentElement.removeEventListener('pointerleave', onLeave);
    scene.remove(root); scene.remove(rig);
    const seen = new Set();
    root.traverse((o) => {
      if (o.geometry && !seen.has(o.geometry)) { seen.add(o.geometry); o.geometry.dispose(); }
      const ms = o.material ? (Array.isArray(o.material) ? o.material : [o.material]) : [];
      ms.forEach((m) => { if (!seen.has(m)) { seen.add(m); m.dispose(); } });
    });
    textures.forEach((t) => t.dispose());
    envRT.dispose();
    nodes.forEach((n) => n.el.remove());
    scene.background = prevBg; scene.environment = prevEnv;
  }

  layoutCamera();
  return { object: root, update, dispose, nodes: NODES };
}
