import * as THREE from "three";
import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
import {
  BallCollider,
  Physics,
  RigidBody,
  CylinderCollider,
  RapierRigidBody,
} from "@react-three/rapier";

const textureLoader = new THREE.TextureLoader();

type LogoSrc = { type: "image"; url: string };
type LabelSrc = { type: "label"; label: string; color: string };
type Src = LogoSrc | LabelSrc;

const sources: Src[] = [
  // Apple / iOS & project tech
  { type: "image", url: "/images/tech/swift.png" },
  { type: "image", url: "/images/tech/swiftui.png" },
  { type: "image", url: "/images/tech/xcode.png" },
  { type: "image", url: "/images/tech/visionos.png" },
  { type: "image", url: "/images/tech/realitykit.png" },
  { type: "image", url: "/images/tech/coreml.png" },
  { type: "image", url: "/images/tech/react.png" },
  { type: "image", url: "/images/typescript.webp" },
  // Text-label balls — brand-colored sans text on white sphere
  { type: "label", label: "Firebase", color: "#FFA000" },
  { type: "label", label: "Combine", color: "#0066CC" },
  { type: "label", label: "MapKit", color: "#34C759" },
  { type: "label", label: "AVFoundation", color: "#FF375F" },
  { type: "label", label: "ARKit", color: "#007AFF" },
  { type: "label", label: "Reality\nComposer", color: "#AF52DE" },
  { type: "label", label: "SpriteKit", color: "#00BCD4" },
  { type: "label", label: "Vision", color: "#FF9500" },
  { type: "label", label: "Create ML", color: "#30B0C7" },
  { type: "label", label: "Natural\nLanguage", color: "#FF6482" },
  { type: "label", label: "Game\nCenter", color: "#5856D6" },
  { type: "label", label: "Blender", color: "#E87D0D" },
  { type: "label", label: "USDZ", color: "#8E8E93" },
  { type: "label", label: "Python", color: "#3776AB" },
  { type: "label", label: "PyTorch", color: "#EE4C2C" },
  // Portfolio site tech
  { type: "label", label: "Vite", color: "#646CFF" },
  { type: "label", label: "Three.js", color: "#049EF4" },
  { type: "label", label: "R3F", color: "#1EC8E8" },
  { type: "label", label: "Rapier", color: "#B72025" },
  { type: "label", label: "GSAP", color: "#88CE02" },
];

const TEX_SIZE = 512;

function makeLabelTexture(text: string, color: string): THREE.Texture {
  const canvas = document.createElement("canvas");
  canvas.width = TEX_SIZE;
  canvas.height = TEX_SIZE;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, TEX_SIZE, TEX_SIZE);

  const lines = text.split("\n");
  const baseSize = lines.length > 1 ? 88 : 110;
  ctx.fillStyle = color;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `700 ${baseSize}px "Geist", "Inter", system-ui, sans-serif`;

  const longest = Math.max(...lines.map((l) => ctx.measureText(l).width));
  const maxWidth = TEX_SIZE * 0.82;
  let fontSize = baseSize;
  if (longest > maxWidth) {
    fontSize = Math.floor((baseSize * maxWidth) / longest);
    ctx.font = `700 ${fontSize}px "Geist", "Inter", system-ui, sans-serif`;
  }

  const lineHeight = fontSize * 1.08;
  const totalHeight = lineHeight * lines.length;
  const startY = TEX_SIZE / 2 - totalHeight / 2 + lineHeight / 2;
  lines.forEach((line, i) => {
    ctx.fillText(line, TEX_SIZE / 2, startY + i * lineHeight);
  });

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

const textures: THREE.Texture[] = sources.map((s) => {
  if (s.type === "image") {
    const t = textureLoader.load(s.url);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }
  return makeLabelTexture(s.label, s.color);
});

const sphereGeometry = new THREE.SphereGeometry(1, 28, 28);

const SPHERE_COUNT = 42;
const spheres = [...Array(SPHERE_COUNT)].map((_, i) => ({
  scale: [0.7, 1, 0.8, 1, 1][i % 5],
  textureIndex: i % textures.length,
}));

type SphereProps = {
  vec?: THREE.Vector3;
  scale: number;
  r?: typeof THREE.MathUtils.randFloatSpread;
  material: THREE.MeshPhysicalMaterial;
  isActive: boolean;
};

function SphereGeo({
  vec = new THREE.Vector3(),
  scale,
  r = THREE.MathUtils.randFloatSpread,
  material,
  isActive,
}: SphereProps) {
  const api = useRef<RapierRigidBody | null>(null);

  useFrame((_state, delta) => {
    if (!isActive) return;
    delta = Math.min(0.1, delta);
    const impulse = vec
      .copy(api.current!.translation())
      .normalize()
      .multiply(
        new THREE.Vector3(
          -50 * delta * scale,
          -150 * delta * scale,
          -50 * delta * scale
        )
      );

    api.current?.applyImpulse(impulse, true);
  });

  return (
    <RigidBody
      linearDamping={0.75}
      angularDamping={0.15}
      friction={0.2}
      position={[r(20), r(20) - 25, r(20) - 10]}
      ref={api}
      colliders={false}
    >
      <BallCollider args={[scale]} />
      <CylinderCollider
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 1.2 * scale]}
        args={[0.15 * scale, 0.275 * scale]}
      />
      <mesh
        castShadow
        receiveShadow
        scale={scale}
        geometry={sphereGeometry}
        material={material}
        rotation={[0.3, 1, 1]}
      />
    </RigidBody>
  );
}

type PointerProps = {
  vec?: THREE.Vector3;
  isActive: boolean;
};

function Pointer({ vec = new THREE.Vector3(), isActive }: PointerProps) {
  const ref = useRef<RapierRigidBody>(null);

  useFrame(({ pointer, viewport }) => {
    if (!isActive) return;
    const targetVec = vec.lerp(
      new THREE.Vector3(
        (pointer.x * viewport.width) / 2,
        (pointer.y * viewport.height) / 2,
        0
      ),
      0.2
    );
    ref.current?.setNextKinematicTranslation(targetVec);
  });

  return (
    <RigidBody
      position={[100, 100, 100]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
    >
      <BallCollider args={[2]} />
    </RigidBody>
  );
}

const TechStack = () => {
  const [isActive, setIsActive] = useState(false);
  const [frameloop, setFrameloop] = useState<"always" | "never">("never");
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapRef.current) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setFrameloop(entry.isIntersecting ? "always" : "never");
      },
      { threshold: 0 }
    );
    io.observe(wrapRef.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const workEl = document.getElementById("work");
      if (!workEl) return;
      const threshold = workEl.getBoundingClientRect().top;
      setIsActive(scrollY > threshold);
    };
    document.querySelectorAll(".header a").forEach((elem) => {
      const element = elem as HTMLAnchorElement;
      element.addEventListener("click", () => {
        const interval = setInterval(() => {
          handleScroll();
        }, 10);
        setTimeout(() => {
          clearInterval(interval);
        }, 1000);
      });
    });
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const materials = useMemo(() => {
    return textures.map(
      (texture) =>
        new THREE.MeshPhysicalMaterial({
          map: texture,
          emissive: "#ffffff",
          emissiveMap: texture,
          emissiveIntensity: 0.3,
          metalness: 0.5,
          roughness: 1,
          clearcoat: 0.1,
        })
    );
  }, []);

  return (
    <div className="techstack" ref={wrapRef}>
      <header className="techstack-header">
        <span className="techstack-kicker">// toolkit</span>
        <h2 className="techstack-title">
          My <span className="techstack-title-accent">Techstack</span>
        </h2>
        <p className="techstack-lede">
          Everything I reach for — from Apple platforms to the stack powering
          this site. Drag the balls around.
        </p>
      </header>

      <Canvas
        shadows
        frameloop={frameloop}
        gl={{ alpha: true, stencil: false, depth: false, antialias: false }}
        camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 100 }}
        onCreated={(state) => (state.gl.toneMappingExposure = 1.5)}
        className="tech-canvas"
      >
        <ambientLight intensity={1} />
        <spotLight
          position={[20, 20, 25]}
          penumbra={1}
          angle={0.2}
          color="white"
          castShadow
          shadow-mapSize={[512, 512]}
        />
        <directionalLight position={[0, 5, -4]} intensity={2} />
        <Physics gravity={[0, 0, 0]}>
          <Pointer isActive={isActive} />
          {spheres.map((props, i) => (
            <SphereGeo
              key={i}
              scale={props.scale}
              material={materials[props.textureIndex]}
              isActive={isActive}
            />
          ))}
        </Physics>
        <Environment
          preset="city"
          environmentIntensity={0.5}
          environmentRotation={[0, 4, 2]}
        />
        <EffectComposer enableNormalPass={false}>
          <N8AO color="#0f002c" aoRadius={2} intensity={1.15} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default TechStack;
