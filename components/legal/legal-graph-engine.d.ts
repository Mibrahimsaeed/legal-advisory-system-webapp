export const PRIMARY: string;

export interface LegalGraphTheme {
  primary: string;
  ink: string;
  slate: string;
  muted: string;
  line: string;
  paper: string;
  node: string;
  monoFont: string;
  sansFont: string;
}

export interface LegalGraphNode {
  id: string;
  type: string;
  label: string;
  detail: string;
  d: [number, number];
  m?: [number, number];
  ld?: 't' | 'b' | 'l' | 'r';
  tier?: 1 | 2 | 3;
}

export interface LegalGraphEdge {
  f: string;
  t: string;
  label?: string;
  show?: boolean;
  c?: number;
}

export interface LegalGraphData {
  path: string[];
  nodes: LegalGraphNode[];
  edges: LegalGraphEdge[];
}

export interface LegalGraphOptions {
  theme?: Partial<LegalGraphTheme>;
  graph?: LegalGraphData;
  replayEvery?: number;
  edgeLabels?: boolean;
}

export interface LegalGraphHandle {
  replay(): void;
  destroy(): void;
}

export const DEFAULT_THEME: LegalGraphTheme;
export const GRAPH: LegalGraphData;
export function mountLegalKnowledgeGraph(container: HTMLElement, options?: LegalGraphOptions): LegalGraphHandle;
