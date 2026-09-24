'use client';

import { useEffect, useRef } from 'react';
import { mountLegalKnowledgeGraph, type LegalGraphOptions } from './legal-graph-engine';

export interface LegalKnowledgeGraphProps extends LegalGraphOptions {
  className?: string;
}

const A11Y_LABEL =
  'Illustrative legal knowledge graph. A user question raises a legal issue, which applies to a provision derived from a statute. Case law interprets the statute, leading to a judgment supported by evidence.';

export default function LegalKnowledgeGraph({ className, theme, graph, replayEvery, edgeLabels }: LegalKnowledgeGraphProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const handle = mountLegalKnowledgeGraph(ref.current, { theme, graph, replayEvery, edgeLabels });
    return () => handle.destroy();
    // Options are read once at mount; remount the component (via `key`) to change them.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={ref} role="img" aria-label={A11Y_LABEL} className={className} style={{ position: 'relative', width: '100%' }} />;
}
