"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, useGLTF } from "@react-three/drei";
import { Box3, DoubleSide, MathUtils, Vector3, type Group, type Mesh } from "three";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { applyHeroPalette } from "@/lib/three/apply-hero-palette";
import {
  HERO_3D_LIGHT_COLORS,
  HERO_3D_MODEL_SIZE,
  HERO_3D_MOTION,
  HERO_MODEL_URL,
} from "@/lib/constants/hero-3d";

interface PointerState {
  x: number;
  y: number;
}

interface GraphModelProps {
  animate: boolean;
  pointer: React.RefObject<PointerState>;
  onReady: () => void;
}

function GraphModel({ animate, pointer, onReady }: GraphModelProps) {
  const { scene } = useGLTF(HERO_MODEL_URL, false);
  const floatRef = useRef<Group>(null);
  const spinRef = useRef<Group>(null);

  const fit = useMemo(() => {
    const box = new Box3().setFromObject(scene);
    const size = box.getSize(new Vector3());
    const rotationalDiameter = Math.hypot(size.x, size.z);
    const scale = HERO_3D_MODEL_SIZE / Math.max(rotationalDiameter, size.y);
    const offset = box.getCenter(new Vector3()).multiplyScalar(-scale);
    return { scale, offset };
  }, [scene]);

  useEffect(() => {
    applyHeroPalette(scene);
    scene.traverse((object) => {
      const mesh = object as Mesh;
      if (!mesh.isMesh) return;
      const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      materials.forEach((material) => {
        if (material.name.startsWith("doc_") || material.name.startsWith("card_")) {
          material.side = DoubleSide;
        }
      });
    });
    onReady();
  }, [scene, onReady]);

  useFrame((state, delta) => {
    const float = floatRef.current;
    const spin = spinRef.current;
    if (!float || !spin || !animate) return;
    const { spinSpeed, floatAmplitude, floatSpeed, parallaxTilt, parallaxTurn, parallaxDamping } =
      HERO_3D_MOTION;
    spin.rotation.y += delta * spinSpeed;
    float.position.y = Math.sin(state.clock.elapsedTime * floatSpeed) * floatAmplitude;
    float.rotation.x = MathUtils.damp(
      float.rotation.x,
      pointer.current.y * -parallaxTilt,
      parallaxDamping,
      delta,
    );
    float.rotation.y = MathUtils.damp(
      float.rotation.y,
      pointer.current.x * parallaxTurn,
      parallaxDamping,
      delta,
    );
  });

  return (
    <group ref={floatRef}>
      <group ref={spinRef}>
        <group scale={fit.scale} position={fit.offset}>
          <primitive object={scene} />
        </group>
      </group>
    </group>
  );
}

function Lighting() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 4, 5]} intensity={1.6} color={HERO_3D_LIGHT_COLORS.key} />
      <pointLight
        position={[-4, 2, -3]}
        intensity={40}
        distance={14}
        color={HERO_3D_LIGHT_COLORS.rim}
      />
      <pointLight
        position={[3, -2.5, 2]}
        intensity={14}
        distance={10}
        color={HERO_3D_LIGHT_COLORS.fill}
      />
      <Environment resolution={128}>
        <Lightformer form="rect" intensity={2} position={[0, 5, 4]} scale={[8, 3, 1]} />
        <Lightformer
          form="rect"
          intensity={1.4}
          color={HERO_3D_LIGHT_COLORS.rim}
          position={[-5, 0, 2]}
          scale={[2, 6, 1]}
        />
        <Lightformer form="ring" intensity={0.8} position={[4, -1, -4]} scale={4} />
      </Environment>
    </>
  );
}

interface LegalAIHeroSceneProps {
  active: boolean;
  onReady: () => void;
}

export function LegalAIHeroScene({ active, onReady }: LegalAIHeroSceneProps) {
  const reducedMotion = useReducedMotion();
  const pointer = useRef<PointerState>({ x: 0, y: 0 });

  useEffect(() => {
    if (reducedMotion) return;
    const onMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reducedMotion]);

  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={[1, 1.75]}
      camera={{ position: [0, 0.6, 8.5], fov: 32 }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
    >
      <Lighting />
      <Suspense fallback={null}>
        <GraphModel animate={!reducedMotion} pointer={pointer} onReady={onReady} />
      </Suspense>
    </Canvas>
  );
}

useGLTF.preload(HERO_MODEL_URL, false);
