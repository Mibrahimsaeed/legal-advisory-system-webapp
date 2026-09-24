'use client';
// React / Next.js wrapper for the Legal Intelligence knowledge-graph hero object.
// npm i three  ·  copy legal-graph.js next to this file.
// Next.js: const LegalIntelligenceGraph = dynamic(() => import('./LegalIntelligenceGraph'), { ssr: false });
// Load Newsreader, Geist and Geist Mono (next/font) so card print + labels match.
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { createLegalGraph } from './legal-graph';

export default function LegalIntelligenceGraph({ className, style, offsetX = 0.2, breakpoint = 1024 }) {
  const hostRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    let raf = 0, graph = null, disposed = false, visible = true;

    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.domElement.style.display = 'block';
    host.appendChild(renderer.domElement);
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
          const dt = Math.min((now - last) / 1000, 0.05); last = now;
          if (!visible) return;
          graph.update(dt);
          renderer.render(scene, camera);
        };
        raf = requestAnimationFrame(loop);
      });

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect(); io.disconnect();
      graph && graph.dispose();
      renderer.dispose();
      host.replaceChildren();
    };
  }, [offsetX, breakpoint]);

  return <div ref={hostRef} className={className} style={{ position: 'relative', width: '100%', height: '100%', ...style }} />;
}
