import { useFrame, ThreeEvent } from "@react-three/fiber";
import { Text, useTexture } from "@react-three/drei";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import type { Project } from "../../data/projects";
import {
  CAMERA_Z,
  MONOLITH_H,
  MONOLITH_W,
  MONOLITH_Z,
  monolithX,
} from "./galleryConfig";

type Props = {
  project: Project;
  index: number;
  cameraX: React.MutableRefObject<number>;
  onSelect: (slug: string) => void;
};

const Monolith = ({ project, index, cameraX, onSelect }: Props) => {
  const groupRef = useRef<THREE.Group>(null);
  const slabRef = useRef<THREE.Mesh>(null);
  const rimLightRef = useRef<THREE.PointLight>(null);
  const accentColor = useMemo(() => new THREE.Color(project.accent), [project.accent]);
  const [hovered, setHovered] = useState(false);

  // Texture — use monolith image; fall back to hero or image if missing.
  const textureUrl = project.monolith || project.hero || project.image;
  const texture = useTexture(textureUrl);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;

  const baseX = monolithX(index);

  useFrame(() => {
    if (!groupRef.current || !slabRef.current || !rimLightRef.current) return;
    const dx = cameraX.current - baseX;
    const distance = Math.abs(dx);

    // Proximity 0..1 — strongest when camera is in front, falls off past 1 spacing
    const proximity = Math.max(0, 1 - distance / 4);

    // Tilt toward camera as it passes (gives the slab a presence)
    const targetYaw = THREE.MathUtils.clamp(-dx * 0.05, -0.18, 0.18) + (hovered ? -0.04 : 0);
    groupRef.current.rotation.y += (targetYaw - groupRef.current.rotation.y) * 0.08;

    // Slight Z-pop on hover
    const targetZ = MONOLITH_Z + (hovered ? 0.25 : 0);
    groupRef.current.position.z += (targetZ - groupRef.current.position.z) * 0.1;

    // Rim light intensity ramps with proximity + hover
    const targetIntensity = 1.4 + proximity * 6.0 + (hovered ? 3.0 : 0);
    const li = rimLightRef.current;
    li.intensity += (targetIntensity - li.intensity) * 0.1;
  });

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    onSelect(project.slug);
  };
  const handleOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setHovered(true);
    document.body.style.cursor = "pointer";
  };
  const handleOut = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setHovered(false);
    document.body.style.cursor = "";
  };

  return (
    <group position={[baseX, 0, MONOLITH_Z]} ref={groupRef}>
      {/* Slab */}
      <mesh
        ref={slabRef}
        position={[0, MONOLITH_H / 2 + 0.15, 0]}
        onClick={handleClick}
        onPointerOver={handleOver}
        onPointerOut={handleOut}
        castShadow
      >
        <planeGeometry args={[MONOLITH_W, MONOLITH_H]} />
        <meshStandardMaterial
          map={texture}
          metalness={0.05}
          roughness={0.78}
          emissive={accentColor}
          emissiveIntensity={hovered ? 0.18 : 0.06}
          toneMapped
        />
      </mesh>

      {/* Subtle slab back-glow plane (the "monolith aura") */}
      <mesh position={[0, MONOLITH_H / 2 + 0.15, -0.05]} renderOrder={-1}>
        <planeGeometry args={[MONOLITH_W * 1.25, MONOLITH_H * 1.18]} />
        <meshBasicMaterial
          color={accentColor}
          transparent
          opacity={0.18}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Per-project rim point light */}
      <pointLight
        ref={rimLightRef}
        color={accentColor}
        position={[0, MONOLITH_H * 0.6, 1.3]}
        intensity={1.4}
        distance={6}
        decay={2}
      />

      {/* Floating title above slab */}
      <Text
        position={[0, MONOLITH_H + 0.55, 0]}
        fontSize={0.28}
        anchorX="center"
        anchorY="middle"
        color="#f5f5f7"
        outlineColor="#0a0a0c"
        outlineWidth={0.005}
        maxWidth={3.5}
      >
        {project.title}
      </Text>
      <Text
        position={[0, MONOLITH_H + 0.18, 0]}
        fontSize={0.13}
        anchorX="center"
        anchorY="middle"
        color="#a8a8b3"
        letterSpacing={0.08}
        maxWidth={3.5}
      >
        {project.category.toUpperCase()}
      </Text>

      {/* Index number in front of base, monospace-ish via drei Text */}
      <Text
        position={[-MONOLITH_W / 2 + 0.18, 0.18, CAMERA_Z * 0]}
        fontSize={0.16}
        anchorX="left"
        anchorY="middle"
        color="#7a7a85"
      >
        {String(index + 1).padStart(2, "0")}
      </Text>
    </group>
  );
};

export default Monolith;
