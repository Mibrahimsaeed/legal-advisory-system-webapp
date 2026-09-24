export const HERO_MODEL_URL = "/models/legal-intelligence-graph.glb";

// Three.js cannot read Tailwind tokens, so the scene colors are defined here
// as the one exception to the token-only color rule. Every tone shares the
// hue (262.71) of the --primary token, oklch(0.2643 0.0345 262.71), converted
// to sRGB; `primary` is that exact color.
export const HERO_3D_PALETTE = {
  deep: "#0a111f",
  primary: "#1c2536",
  mid: "#3b4860",
  light: "#79879f",
  mist: "#bdc4d2",
} as const;

export type HeroTone = keyof typeof HERO_3D_PALETTE;

interface MaterialTone {
  color?: HeroTone;
  emissive?: HeroTone;
  attenuation?: HeroTone;
}

export const HERO_3D_MATERIAL_TONES: Readonly<Record<string, MaterialTone>> = {
  node_glass: { attenuation: "primary" },
  core_glass: { attenuation: "primary" },
  emerald_energy: { color: "primary", emissive: "mid" },
  core_nucleus: { color: "primary", emissive: "mid" },
  emerald_lattice: { color: "primary" },
  emerald_lattice_inner: { color: "mid" },
  emerald_spark: { color: "light" },
  brushed_steel: { color: "mist" },
  graphite: { color: "deep" },
  graph_edge: { color: "mid" },
  flow_particle: { color: "mid" },
  card_edge: { color: "deep" },
  card_leader: { color: "mid" },
  hover_halo: { color: "mid" },
};

export const HERO_3D_LIGHT_COLORS = {
  key: "#ffffff",
  rim: HERO_3D_PALETTE.light,
  fill: HERO_3D_PALETTE.mid,
} as const;

export const HERO_3D_MOTION = {
  spinSpeed: 0.16,
  floatAmplitude: 0.07,
  floatSpeed: 0.7,
  parallaxTilt: 0.14,
  parallaxTurn: 0.22,
  parallaxDamping: 2.5,
} as const;

export const HERO_3D_MODEL_SIZE = 4.2;
