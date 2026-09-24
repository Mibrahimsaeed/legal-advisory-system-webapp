// Framework-agnostic legal knowledge graph renderer (SVG + one rAF loop, no dependencies).
// mountLegalKnowledgeGraph(container, options) -> { destroy() }

const NS = 'http://www.w3.org/2000/svg';
export const PRIMARY = 'oklch(0.2643 0.0345 262.71)';

export const DEFAULT_THEME = {
  primary: PRIMARY,
  ink: '#2A2926',
  slate: '#66645E',
  muted: '#A7A399',
  line: '#D5D0C4',
  paper: '#F6F3EC',
  node: '#EDE9E0',
  monoFont: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, monospace",
  sansFont: 'inherit',
};

// Illustrative sample data only — labels are placeholders, not real authorities.
// d/m = desktop (800x580) / mobile (360x640) coordinates; ld = desktop label side.
export const GRAPH = {
  path: ['q', 'issue', 'prov', 'stat', 'case', 'judg', 'evid'],
  nodes: [
    { id: 'q', type: 'Question', label: 'User question', detail: 'Sample query: “Is the notice period enforceable?”', d: [80, 470], m: [70, 50], ld: 'b' },
    { id: 'issue', type: 'Legal issue', label: 'Notice validity', detail: 'The question is resolved into a discrete legal issue.', d: [210, 340], m: [270, 135], ld: 't' },
    { id: 'prov', type: 'Provision', label: 'Provision 4(2)', detail: 'The provision that governs the issue.', d: [360, 430], m: [90, 225], ld: 'b' },
    { id: 'stat', type: 'Statute', label: 'Sample Statute', detail: 'The enactment the provision is derived from.', d: [440, 265], m: [270, 315], ld: 'l' },
    { id: 'case', type: 'Case law', label: 'Case A', detail: 'Authority interpreting the statute.', d: [585, 165], m: [90, 405], ld: 't' },
    { id: 'judg', type: 'Judgment', label: 'Judgment B', detail: 'The holding relied upon.', d: [705, 300], m: [270, 495], ld: 'b' },
    { id: 'evid', type: 'Evidence', label: 'Exhibit set', detail: 'Record material supporting the answer.', d: [610, 455], m: [100, 585], ld: 'b' },
    { id: 'facts', type: 'Fact', label: 'Facts on record', detail: 'Context attached to the question.', d: [95, 250], ld: 't', tier: 2 },
    { id: 'rel', type: 'Legal issue', label: 'Related issue', detail: 'An adjacent issue sharing the same provisions.', d: [285, 175], ld: 't', tier: 3 },
    { id: 'act', type: 'Act', label: 'Parent Act', detail: 'The Act containing the statute.', d: [420, 95], ld: 't', tier: 2 },
    { id: 'sec', type: 'Section', label: 'Section 12', detail: 'A neighbouring section of the same Act.', d: [505, 525], ld: 'r', tier: 2 },
    { id: 'cite', type: 'Citation', label: 'Citation 3', detail: 'A reported citation of Case A.', d: [560, 45], ld: 'r', tier: 3 },
    { id: 'caseC', type: 'Case', label: 'Case C', detail: 'A later case citing Case A.', d: [715, 120], ld: 't', tier: 2 },
    { id: 'court', type: 'Court', label: 'Appellate Court', detail: 'The forum that issued Judgment B.', d: [760, 215], ld: 't', tier: 3 },
    { id: 'rec', type: 'Evidence', label: 'Record E-14', detail: 'An individual exhibit in the set.', d: [735, 530], ld: 'l', tier: 3 },
  ],
  edges: [
    { f: 'q', t: 'issue', label: 'RAISES' },
    { f: 'issue', t: 'prov', label: 'APPLIES_TO', show: true },
    { f: 'prov', t: 'stat', label: 'DERIVED_FROM' },
    { f: 'stat', t: 'case', label: 'INTERPRETS', show: true },
    { f: 'case', t: 'judg', label: 'RELATED_TO' },
    { f: 'judg', t: 'evid', label: 'SUPPORTS', show: true },
    { f: 'issue', t: 'stat', label: 'RELATED_TO', c: -0.18 },
    { f: 'case', t: 'prov', label: 'INTERPRETS', c: 0.16 },
    { f: 'judg', t: 'stat', label: 'APPLIES_TO', c: 0.12 },
    { f: 'facts', t: 'q', label: 'RELATED_TO' },
    { f: 'rel', t: 'issue', label: 'RELATED_TO' },
    { f: 'act', t: 'stat', label: 'CONTAINS' },
    { f: 'act', t: 'rel', label: 'RELATED_TO' },
    { f: 'sec', t: 'prov', label: 'CONTAINS' },
    { f: 'cite', t: 'case', label: 'CITES' },
    { f: 'caseC', t: 'case', label: 'CITES' },
    { f: 'court', t: 'judg', label: 'DERIVED_FROM' },
    { f: 'rec', t: 'evid', label: 'CONTAINS' },
  ],
};

const VIEWBOX = { d: [800, 580], t: [800, 580], m: [360, 640] };
const STEP = 1.05, DRAW = 0.8, FIRST = 0.9;
const INTRO_END = FIRST + STEP * 6 + 0.5;

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const seg = (t, a, d) => clamp((t - a) / d, 0, 1);
const easeOut = (t) => 1 - Math.pow(1 - t, 3);
const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

function el(tag, attrs, parent) {
  const e = document.createElementNS(NS, tag);
  for (const k in attrs) e.setAttribute(k, attrs[k]);
  if (parent) parent.appendChild(e);
  return e;
}

function bez(e, u) {
  const v = 1 - u;
  return [v * v * e.x0 + 2 * v * u * e.cx + u * u * e.x2, v * v * e.y0 + 2 * v * u * e.cy + u * u * e.y2];
}

export function mountLegalKnowledgeGraph(container, options = {}) {
  const theme = { ...DEFAULT_THEME, ...(options.theme || {}) };
  const replayEvery = options.replayEvery ?? 11;
  const edgeLabels = options.edgeLabels ?? true;
  const graph = options.graph || GRAPH;

  const reduceMQ = window.matchMedia('(prefers-reduced-motion: reduce)');
  let reduced = reduceMQ.matches;

  if (getComputedStyle(container).position === 'static') container.style.position = 'relative';
  container.style.width = container.style.width || '100%';

  const svg = el('svg', { width: '100%', height: '100%', 'aria-hidden': 'true' });
  svg.style.cssText = 'position:absolute;inset:0;display:block;overflow:visible;';
  const tip = document.createElement('div');
  tip.style.cssText = `position:absolute;left:0;top:0;pointer-events:none;opacity:0;transform:translateY(4px);transition:opacity .2s ease,transform .2s ease;max-width:220px;padding:10px 12px;background:#FCFBF8;border:1px solid ${theme.line};border-radius:3px;box-shadow:0 8px 24px rgba(28,30,38,.08);font-family:${theme.sansFont};z-index:2;`;
  container.append(svg, tip);

  let mode = null, W = 0, H = 0;
  let nodes = [], edges = [], byId = {}, pathEdges = [];
  let clock = 0, started = false, visible = false, raf = 0, last = 0;
  let hoverNode = null, hoverEdge = null;
  const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
  let particles = [], pool = [];
  let nextAmbient = 0, nextTrace = 0;

  function build() {
    svg.textContent = '';
    const gEdges = el('g', {}, svg), gLabels = el('g', {}, svg), gPart = el('g', {}, svg), gNodes = el('g', {}, svg);
    const pathSet = new Set(graph.path);
    const show = (d) => (mode === 'm' ? !!d.m : mode === 't' ? (d.tier || 1) <= 2 : true);
    nodes = graph.nodes.filter(show).map((def, i) => ({ def, main: pathSet.has(def.id), a: 0, bump: 0, o: 0, s: 1, phase: i * 1.37, nb: new Set([def.id]) }));
    byId = Object.fromEntries(nodes.map((n) => [n.def.id, n]));

    edges = graph.edges.filter((d) => byId[d.f] && byId[d.t]).map((def) => {
      const fi = graph.path.indexOf(def.f), ti = graph.path.indexOf(def.t);
      const main = fi >= 0 && ti === fi + 1;
      const e = { def, main, pi: main ? fi : -1, from: byId[def.f], to: byId[def.t], hl: 0, lo: 0 };
      e.from.nb.add(def.t); e.to.nb.add(def.f);
      e.base = el('path', { fill: 'none', stroke: theme.line, 'stroke-width': main ? 1.25 : 1, 'stroke-linecap': 'round' }, gEdges);
      e.over = el('path', { fill: 'none', stroke: theme.primary, 'stroke-width': main ? 1.6 : 1.3, 'stroke-linecap': 'round', pathLength: 1, 'stroke-dasharray': '1 1', 'stroke-dashoffset': 1, opacity: 0 }, gEdges);
      e.hit = el('path', { fill: 'none', stroke: 'transparent', 'stroke-width': 14 }, gEdges);
      e.hit.style.cursor = 'default';
      e.hit.addEventListener('pointerenter', () => setHover(null, e));
      e.hit.addEventListener('pointerleave', () => setHover(null, null));
      if (def.label && edgeLabels) {
        e.text = el('text', { 'text-anchor': 'middle', 'dominant-baseline': 'middle', 'font-size': 8.5, 'letter-spacing': '0.08em', fill: theme.slate, stroke: theme.paper, 'stroke-width': 4, 'paint-order': 'stroke', opacity: 0 }, gLabels);
        e.text.style.fontFamily = theme.monoFont;
        e.text.style.pointerEvents = 'none';
        e.text.textContent = def.label;
      }
      return e;
    });
    pathEdges = edges.filter((e) => e.main).sort((a, b) => a.pi - b.pi);

    pool = Array.from({ length: 6 }, () => {
      const g = el('g', { opacity: 0 }, gPart);
      el('circle', { r: 6, fill: theme.primary, opacity: 0.12 }, g);
      el('circle', { r: 2.4, fill: theme.primary }, g);
      return g;
    });

    for (const n of nodes) {
      const d = n.def;
      n.r = n.main ? (d.id === 'q' ? 8.5 : 7.5) : 4.5;
      n.g = el('g', {}, gNodes);
      n.gc = el('g', {}, n.g);
      n.halo = el('circle', { r: n.r * 3, fill: theme.primary, opacity: 0 }, n.gc);
      n.ring = el('circle', { r: n.r + 4.5, fill: 'none', stroke: theme.primary, 'stroke-width': 1, opacity: 0 }, n.gc);
      el('circle', { r: n.r, fill: n.main ? theme.paper : theme.node, stroke: theme.muted, 'stroke-width': 1.25 }, n.gc);
      n.core = el('circle', { r: n.r, fill: theme.primary, opacity: 0 }, n.gc);

      const side = mode === 'm' ? (d.m[0] < 180 ? 'r' : 'l') : d.ld || 'b';
      const off = n.r + 12;
      const anchor = side === 'l' ? 'end' : side === 'r' ? 'start' : 'middle';
      const x = side === 'l' ? -off : side === 'r' ? off : 0;
      const [ty, ly] = side === 't' ? [-n.r - 24, -n.r - 10] : side === 'b' ? [n.r + 16, n.r + 30] : [-4, 10];
      const lg = el('g', { 'text-anchor': anchor }, n.g);
      lg.style.pointerEvents = 'none';
      n.tType = el('text', { x, y: ty, 'font-size': 8.5, 'letter-spacing': '0.14em', fill: theme.muted }, lg);
      n.tType.style.fontFamily = theme.monoFont;
      n.tType.textContent = d.type.toUpperCase();
      n.tLabel = el('text', { x, y: ly, 'font-size': n.main ? (mode === 'm' ? 12 : 12.5) : 11, 'font-weight': n.main ? 500 : 400, fill: theme.slate }, lg);
      n.tLabel.style.fontFamily = theme.sansFont;
      n.tLabel.textContent = d.label;
      n.activeTint = false;

      n.hit = el('circle', { r: n.r + 12, fill: 'transparent' }, n.g);
      n.hit.addEventListener('pointerenter', () => setHover(n, null));
      n.hit.addEventListener('pointerleave', () => setHover(null, null));
    }
    layout();
  }

  function layout() {
    const [vw, vh] = VIEWBOX[mode];
    const s = Math.min(W / vw, H / vh) || 1;
    const ox = (W - vw * s) / 2, oy = (H - vh * s) / 2;
    for (const n of nodes) {
      const p = mode === 'm' ? n.def.m : n.def.d;
      n.x = ox + p[0] * s; n.y = oy + p[1] * s;
      n.cx = n.x; n.cy = n.y;
    }
  }

  function setHover(n, e) {
    hoverNode = n; hoverEdge = e;
    if (n) {
      const deg = n.nb.size - 1;
      tip.innerHTML = `<div style="font-family:${theme.monoFont};font-size:9.5px;letter-spacing:.14em;color:${theme.primary};margin-bottom:4px">${n.def.type.toUpperCase()}</div><div style="font-size:14px;font-weight:500;color:${theme.ink};margin-bottom:4px">${n.def.label}</div><div style="font-size:12.5px;line-height:1.45;color:${theme.slate}">${n.def.detail}</div><div style="font-family:${theme.monoFont};font-size:9.5px;letter-spacing:.08em;color:${theme.muted};margin-top:8px">${deg} CONNECTION${deg === 1 ? '' : 'S'}</div>`;
      const tw = 220, right = n.cx + 22 + tw > W;
      tip.style.left = `${clamp(right ? n.cx - 22 - tw : n.cx + 22, 0, Math.max(0, W - tw))}px`;
      tip.style.top = `${clamp(n.cy - 30, 0, Math.max(0, H - 130))}px`;
      tip.style.opacity = '1'; tip.style.transform = 'translateY(0)';
    } else {
      tip.style.opacity = '0'; tip.style.transform = 'translateY(4px)';
    }
    if (reduced) render();
  }

  function spawn(list, per, alpha, kind) { particles.push({ list, t0: clock, per, alpha, kind, k: -1 }); }

  function update() {
    const t = clock;
    const intro = !reduced && t < INTRO_END;
    // Activation timeline
    for (const n of nodes) {
      if (reduced) { n.a = n.main ? 1 : 0; n.vis = 1; continue; }
      n.vis = started ? easeOut(seg(t, 0, 0.9)) : 0;
      if (!n.main) continue;
      const i = graph.path.indexOf(n.def.id);
      n.a = i === 0 ? easeOut(seg(t, 0.3, 0.5)) : easeOut(seg(t, FIRST + (i - 1) * STEP + DRAW - 0.05, 0.45));
      n.bump *= 0.965;
    }
    for (const e of edges) e.draw = e.main ? (reduced ? 1 : easeInOut(seg(t, FIRST + e.pi * STEP, DRAW))) : 0;

    // Particles
    const dots = [];
    if (!reduced && started) {
      if (intro) {
        for (const e of pathEdges) if (e.draw > 0 && e.draw < 1) dots.push({ e, u: e.draw, a: 1 });
        nextTrace = INTRO_END + replayEvery * 0.5; nextAmbient = INTRO_END + 2;
      } else {
        if (t >= nextTrace && pathEdges.length) { spawn(pathEdges, 0.55, 1, 'trace'); nextTrace = t + replayEvery; }
        if (t >= nextAmbient && pathEdges.length) {
          spawn([pathEdges[Math.floor(Math.random() * pathEdges.length)]], 1.5, 0.55, 'ambient');
          nextAmbient = t + 3 + Math.random() * 2;
        }
      }
      particles = particles.filter((p) => {
        const f = (t - p.t0) / p.per, k = Math.floor(f);
        if (p.kind === 'trace' && k !== p.k) {
          if (p.k === -1) p.list[0].from.bump = 1;
          for (let j = Math.max(p.k, 0); j < Math.min(k, p.list.length); j++) p.list[j].to.bump = 1;
          p.k = k;
        }
        if (k >= p.list.length) return false;
        const u = easeInOut(f - k);
        const fade = p.kind === 'ambient' ? Math.sin(Math.PI * u) : 1;
        dots.push({ e: p.list[k], u, a: p.alpha * fade });
        return true;
      });
    }

    // Positions: float + parallax
    mouse.x += (mouse.tx - mouse.x) * 0.04; mouse.y += (mouse.ty - mouse.y) * 0.04;
    const motion = !reduced;
    for (const n of nodes) {
      const A = motion ? (n.main ? 2.2 : 1) : 0, P = motion ? (n.main ? 7 : 3.5) : 0;
      n.cx = n.x + A * Math.sin(t * 0.35 + n.phase) + mouse.x * P;
      n.cy = n.y + A * Math.cos(t * 0.28 + n.phase * 1.3) + mouse.y * P;
    }
    for (const e of edges) {
      const c = e.def.c ?? (e.main ? 0.08 : 0.1);
      const dx = e.to.cx - e.from.cx, dy = e.to.cy - e.from.cy;
      e.x0 = e.from.cx; e.y0 = e.from.cy; e.x2 = e.to.cx; e.y2 = e.to.cy;
      e.cx = (e.x0 + e.x2) / 2 - dy * c; e.cy = (e.y0 + e.y2) / 2 + dx * c;
    }

    render(dots);
  }

  function render(dots = []) {
    const L = reduced ? 1 : 0.14;
    const hn = hoverNode, he = hoverEdge;
    const t = clock;
    for (const e of edges) {
      const d = `M${e.x0.toFixed(1)} ${e.y0.toFixed(1)}Q${e.cx.toFixed(1)} ${e.cy.toFixed(1)} ${e.x2.toFixed(1)} ${e.y2.toFixed(1)}`;
      e.base.setAttribute('d', d); e.over.setAttribute('d', d); e.hit.setAttribute('d', d);
      const incident = hn && (e.from === hn || e.to === hn);
      const hlT = incident || he === e ? 1 : 0;
      e.hl += (hlT - e.hl) * L;
      const vis = Math.min(e.from.vis, e.to.vis);
      const dim = (hn || he) && !hlT ? 0.35 : 1;
      e.base.setAttribute('opacity', (vis * dim).toFixed(3));
      const pulse = reduced ? 0 : 0.1 * Math.sin(t * 1.1 + e.pi);
      const mainO = e.main ? (0.78 + pulse) * dim : 0;
      e.over.setAttribute('stroke-dashoffset', (1 - Math.max(e.draw, e.hl)).toFixed(4));
      e.over.setAttribute('opacity', Math.max(mainO * (e.draw > 0 ? 1 : 0), e.hl).toFixed(3));
      e.over.setAttribute('stroke-width', ((e.main ? 1.6 : 1.3) + e.hl * 0.5).toFixed(2));
      if (e.text) {
        const loT = hlT ? 1 : e.def.show && e.main && e.draw >= 1 && !(hn || he) ? 0.8 : 0;
        e.lo += (loT - e.lo) * L;
        const [mx, my] = bez(e, 0.5);
        e.text.setAttribute('x', mx.toFixed(1)); e.text.setAttribute('y', my.toFixed(1));
        e.text.setAttribute('opacity', (e.lo * vis).toFixed(3));
        e.text.setAttribute('fill', hlT ? theme.primary : theme.slate);
      }
    }
    for (const n of nodes) {
      const isH = hn === n;
      const related = hn ? hn.nb.has(n.def.id) : he ? he.from === n || he.to === n : true;
      const oT = n.vis * (isH ? 1 : (n.main ? 0.6 + 0.4 * n.a : 0.8) * (related ? 1 : 0.3));
      n.o += (oT - n.o) * L;
      n.s += ((isH ? 1.18 : 1) - n.s) * L;
      n.g.setAttribute('transform', `translate(${n.cx.toFixed(1)} ${n.cy.toFixed(1)})`);
      n.g.setAttribute('opacity', n.o.toFixed(3));
      n.gc.setAttribute('transform', `scale(${n.s.toFixed(3)})`);
      const glow = reduced ? 0 : 0.025 * Math.sin(t * 1.3 + n.phase);
      n.core.setAttribute('opacity', (n.main ? n.a : isH ? 0.85 : 0).toFixed(3));
      n.halo.setAttribute('opacity', Math.max(0, n.a * (0.06 + glow) + n.bump * 0.12 + (isH ? 0.07 : 0)).toFixed(3));
      n.ring.setAttribute('opacity', Math.min(1, n.a * 0.22 + n.bump * 0.45 + (isH ? 0.35 : 0)).toFixed(3));
      const tint = n.a > 0.5 || isH;
      if (tint !== n.activeTint) {
        n.activeTint = tint;
        n.tType.setAttribute('fill', tint ? theme.primary : theme.muted);
        n.tLabel.setAttribute('fill', tint ? theme.primary : theme.slate);
      }
    }
    pool.forEach((g, i) => {
      const p = dots[i];
      if (!p) { g.setAttribute('opacity', 0); return; }
      const [x, y] = bez(p.e, p.u);
      g.setAttribute('transform', `translate(${x.toFixed(1)} ${y.toFixed(1)})`);
      g.setAttribute('opacity', p.a.toFixed(3));
    });
  }

  function frame(ts) {
    const dt = last ? (ts - last) / 1000 : 0;
    last = ts;
    if (started) clock += Math.min(dt, 0.05);
    update();
    raf = requestAnimationFrame(frame);
  }
  function syncLoop() {
    const run = visible && !document.hidden && !reduced;
    if (run && !raf) { last = 0; raf = requestAnimationFrame(frame); }
    if (!run && raf) { cancelAnimationFrame(raf); raf = 0; }
    if (reduced) { clock = INTRO_END; update(); }
  }

  const ro = new ResizeObserver(() => {
    const r = container.getBoundingClientRect();
    const m = r.width < 560 ? 'm' : r.width < 900 ? 't' : 'd';
    if (m !== mode) {
      mode = m;
      container.style.aspectRatio = m === 'm' ? '360 / 640' : '800 / 580';
      W = r.width; H = container.getBoundingClientRect().height;
      build();
    } else { W = r.width; H = r.height; layout(); }
    update();
  });
  const io = new IntersectionObserver((entries) => {
    for (const en of entries) {
      visible = en.isIntersecting;
      if (en.intersectionRatio >= 0.25 && !started) started = true;
    }
    syncLoop();
  }, { threshold: [0, 0.25] });
  const onMove = (ev) => {
    if (ev.pointerType === 'touch' || mode === 'm') return;
    const r = container.getBoundingClientRect();
    mouse.tx = clamp(((ev.clientX - r.left) / r.width - 0.5) * 2, -1, 1);
    mouse.ty = clamp(((ev.clientY - r.top) / r.height - 0.5) * 2, -1, 1);
  };
  const onLeave = () => { mouse.tx = 0; mouse.ty = 0; setHover(null, null); };
  const onVis = () => syncLoop();
  const onReduce = (ev) => { reduced = ev.matches; particles = []; syncLoop(); };

  ro.observe(container);
  io.observe(container);
  container.addEventListener('pointermove', onMove);
  container.addEventListener('pointerleave', onLeave);
  document.addEventListener('visibilitychange', onVis);
  reduceMQ.addEventListener('change', onReduce);

  return {
    replay() { if (!reduced) { clock = 0; started = true; particles = []; } },
    destroy() {
      cancelAnimationFrame(raf); raf = 0;
      ro.disconnect(); io.disconnect();
      container.removeEventListener('pointermove', onMove);
      container.removeEventListener('pointerleave', onLeave);
      document.removeEventListener('visibilitychange', onVis);
      reduceMQ.removeEventListener('change', onReduce);
      svg.remove(); tip.remove();
      container.style.aspectRatio = '';
    },
  };
}
