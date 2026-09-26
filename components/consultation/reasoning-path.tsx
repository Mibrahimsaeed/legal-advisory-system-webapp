const NODES = [
  { id: "q", label: "Question", x: 100, y: 12 },
  { id: "i", label: "Legal issue", x: 100, y: 52 },
  { id: "s", label: "Statute", x: 52, y: 98 },
  { id: "c", label: "Case law", x: 148, y: 98 },
  { id: "r", label: "Reasoning", x: 100, y: 140 },
] as const;

const EDGES = [
  ["q", "i"],
  ["i", "s"],
  ["i", "c"],
  ["s", "r"],
  ["c", "r"],
] as const;

export function ReasoningPath() {
  const byId = Object.fromEntries(NODES.map((node) => [node.id, node]));

  return (
    <svg
      viewBox="0 0 200 152"
      role="img"
      aria-label="How the sources connect: the question raises a legal issue, which draws on statute and case law, leading to reasoning."
      className="mx-auto w-full max-w-[13rem]"
    >
      {EDGES.map(([from, to]) => (
        <line
          key={`${from}-${to}`}
          x1={byId[from].x}
          y1={byId[from].y}
          x2={byId[to].x}
          y2={byId[to].y}
          className="stroke-primary/40"
          strokeWidth="1"
        />
      ))}
      {NODES.map((node) => (
        <g key={node.id}>
          <rect x={node.x - 34} y={node.y - 9} width="68" height="18" rx="9" className="fill-card stroke-border" />
          <text x={node.x} y={node.y + 3} textAnchor="middle" className="fill-foreground text-[8.5px] font-medium">
            {node.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
