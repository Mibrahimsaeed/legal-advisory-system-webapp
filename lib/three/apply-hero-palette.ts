import { Color, MeshPhysicalMaterial, type Material, type Object3D } from "three";
import { HERO_3D_MATERIAL_TONES, HERO_3D_PALETTE } from "@/lib/constants/hero-3d";

type ColorSlot = "color" | "emissive";

function toneFor(name: string) {
  const exact = HERO_3D_MATERIAL_TONES[name];
  if (exact) return exact;
  return name.startsWith("hover_halo") ? HERO_3D_MATERIAL_TONES.hover_halo : undefined;
}

function setColor(material: Material, slot: ColorSlot, hex: string) {
  const current = (material as Material & Partial<Record<ColorSlot, Color>>)[slot];
  if (current instanceof Color) current.set(hex);
}

function recolor(material: Material) {
  const tone = toneFor(material.name);
  if (!tone) return;
  if (tone.color) setColor(material, "color", HERO_3D_PALETTE[tone.color]);
  if (tone.emissive) setColor(material, "emissive", HERO_3D_PALETTE[tone.emissive]);
  if (tone.attenuation && material instanceof MeshPhysicalMaterial) {
    material.attenuationColor = new Color(HERO_3D_PALETTE[tone.attenuation]);
  }
  material.needsUpdate = true;
}

export function applyHeroPalette(root: Object3D) {
  root.traverse((object) => {
    const { material } = object as Object3D & { material?: Material | Material[] };
    if (!material) return;
    (Array.isArray(material) ? material : [material]).forEach(recolor);
  });
}
