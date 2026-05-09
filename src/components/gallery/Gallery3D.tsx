import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MeshReflectorMaterial } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";
import type { Project } from "../../data/projects";
import Monolith from "./Monolith";
import {
  CAMERA_LOOK_AHEAD,
  CAMERA_Y,
  CAMERA_Z,
  DOLLY_PRE,
  monolithX,
  totalDollyDistance,
} from "./galleryConfig";

type Props = {
  projects: Project[];
  progressRef: React.MutableRefObject<number>;
  onSelect: (slug: string) => void;
};

const CameraDolly = ({
  projects,
  progressRef,
  cameraX,
}: {
  projects: Project[];
  progressRef: React.MutableRefObject<number>;
  cameraX: React.MutableRefObject<number>;
}) => {
  const { camera } = useThree();
  const target = useRef(new THREE.Vector3());

  useFrame(() => {
    const span = totalDollyDistance(projects.length);
    const startX = monolithX(0) - DOLLY_PRE;
    const t = THREE.MathUtils.clamp(progressRef.current, 0, 1);
    const targetX = startX + t * span;

    // Smooth camera X with damping
    const next = THREE.MathUtils.lerp(camera.position.x, targetX, 0.08);
    camera.position.set(next, CAMERA_Y, CAMERA_Z);
    cameraX.current = next;

    // Look slightly ahead so passing monoliths sweep across the frame
    target.current.set(next + CAMERA_LOOK_AHEAD, CAMERA_Y - 0.2, 0);
    camera.lookAt(target.current);
  });

  return null;
};

const Floor = () => (
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
    <planeGeometry args={[200, 60]} />
    <MeshReflectorMaterial
      blur={[300, 100]}
      resolution={512}
      mixBlur={1}
      mixStrength={1.2}
      roughness={0.85}
      depthScale={0.4}
      minDepthThreshold={0.4}
      maxDepthThreshold={1.4}
      color="#0a0a0c"
      metalness={0.4}
      mirror={0.6}
    />
  </mesh>
);

const Backdrop = () => (
  <>
    {/* Far back wall — a big dark plane behind monoliths */}
    <mesh position={[0, 4, -8]}>
      <planeGeometry args={[200, 30]} />
      <meshBasicMaterial color="#070709" />
    </mesh>
    {/* Subtle gradient via a second plane */}
    <mesh position={[0, 6, -7.8]}>
      <planeGeometry args={[200, 12]} />
      <meshBasicMaterial color="#11111a" transparent opacity={0.6} />
    </mesh>
  </>
);

const Gallery3D = ({ projects, progressRef, onSelect }: Props) => {
  const cameraX = useRef(0);

  return (
    <Canvas
      shadows
      dpr={[1, 1.6]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      camera={{ position: [-DOLLY_PRE, CAMERA_Y, CAMERA_Z], fov: 42, near: 0.1, far: 80 }}
    >
      <fog attach="fog" args={["#06060a", 8, 24]} />
      <color attach="background" args={["#06060a"]} />

      <ambientLight intensity={0.25} />
      <directionalLight
        position={[-6, 8, 5]}
        intensity={0.7}
        color="#dcdcff"
        castShadow
      />

      <Suspense fallback={null}>
        <Backdrop />
        <Floor />
        {projects.map((p, i) => (
          <Monolith
            key={p.slug}
            project={p}
            index={i}
            cameraX={cameraX}
            onSelect={onSelect}
          />
        ))}
      </Suspense>

      <CameraDolly
        projects={projects}
        progressRef={progressRef}
        cameraX={cameraX}
      />
    </Canvas>
  );
};

export default Gallery3D;
