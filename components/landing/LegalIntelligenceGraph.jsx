'use client';
// React / Next.js wrapper for the Legal Intelligence knowledge-graph hero object.
// npm i three  ·  copy legal-graph.js next to this file.
// Next.js: const LegalIntelligenceGraph = dynamic(() => import('./LegalIntelligenceGraph'), { ssr: false });
// Load Newsreader, Geist and Geist Mono (next/font) so card print + labels match.
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { createLegalGraph, NODES } from './legal-graph';

const LOW_POWER_FRAME_MS = 30;

function canRenderWebGL() {
  try {
    if (navigator.connection && navigator.connection.saveData) return false;
    const gl = document.createElement('canvas').getContext('webgl2');
    if (!gl) return false;
    const lose = gl.getExtension('WEBGL_lose_context');
    if (lose) lose.loseContext();
    return true;
  } catch {
    return false;
  }
}

// Static stand-in for devices without WebGL (or with data-saver on): the same pipeline, no 3D.
function PipelineFallback({ className, style }) {
  return (
    <div className={className} style={{ position: 'relative', width: '100%', height: '100%', ...style }}>
      <div className="flex h-full w-full items-center justify-center lg:justify-end lg:pr-[8%]">
        <ol className="flex w-full max-w-xs flex-col gap-3 rounded-2xl border bg-card p-6 text-card-foreground shadow-sm">
          {NODES.map((node) => (
            <li key={node.id} className="flex items-center gap-3 text-sm">
              <span className="font-mono text-xs text-muted-foreground">{node.idx}</span>
              <span className="font-medium">{node.label}</span>
              <span className="truncate text-xs text-muted-foreground">{node.detail}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default function LegalIntelligenceGraph({ className, style, offsetX = 0.2, breakpoint = 1024 }) {
  const hostRef = useRef(null);
  const [failed, setFailed] = useState(() => !canRenderWebGL());

  useEffect(() => {
    if (failed) return;
    const host = hostRef.current;
    let raf = 0, graph = null, disposed = false, visible = true;

    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.domElement.style.display = 'block';
    host.appendChild(renderer.domElement);
    const onContextLost = (e) => { e.preventDefault(); setFailed(true); };
    renderer.domElement.addEventListener('webglcontextlost', onContextLost);
    const labels = document.createElement('div');
    labels.style.cssText = 'position:absolute;inset:0;pointer-events:none;overflow:hidden';
    host.appendChild(labels);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 200);
    const fit = () => {
      const w = host.clientWidth || 1, h = host.clientHeight || 1;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    fit();
    const ro = new ResizeObserver(fit); ro.observe(host);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }); io.observe(host);

    createLegalGraph({ renderer, scene, camera, container: host, labelRoot: labels, cursorEl: host, offsetX, breakpoint })
      .then((g) => {
        if (disposed) { g.dispose(); return; }
        graph = g;
        let last = performance.now();
        const loop = (now) => {
          raf = requestAnimationFrame(loop);
          if (!visible) { last = now; return; }
          if (graph.lowPower && now - last < LOW_POWER_FRAME_MS) return;
          const dt = Math.min((now - last) / 1000, 0.05); last = now;
          graph.update(dt);
          renderer.render(scene, camera);
        };
        raf = requestAnimationFrame(loop);
      })
      .catch(() => { if (!disposed) setFailed(true); });

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect(); io.disconnect();
      renderer.domElement.removeEventListener('webglcontextlost', onContextLost);
      graph && graph.dispose();
      renderer.dispose();
      host.replaceChildren();
    };
  }, [offsetX, breakpoint, failed]);

  if (failed) return <PipelineFallback className={className} style={style} />;
  return <div ref={hostRef} className={className} style={{ position: 'relative', width: '100%', height: '100%', ...style }} />;
}
