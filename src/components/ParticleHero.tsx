import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import "./styles/ParticleHero.css";

const LINE_1 = "PRUTHVIRAJSINH";
const LINE_2 = "PUNADA";

const FONT_FAMILY = "Geist, sans-serif";
const PARTICLE_COLOR = new THREE.Color("#0F1E2E");
const PARTICLE_ACCENT = new THREE.Color("#FF6B35");

type HomePositions = {
  positions: Float32Array;
  colors: Float32Array;
  count: number;
};

function sampleTextPositions(
  line1: string,
  line2: string,
  density = 4
): HomePositions {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;
  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

  const baseSize = 220;
  canvas.width = 2800 * pixelRatio;
  canvas.height = 1000 * pixelRatio;
  ctx.scale(pixelRatio, pixelRatio);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#000";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const centerX = 2800 / 2;
  const centerY = 1000 / 2;

  ctx.font = `700 ${baseSize}px ${FONT_FAMILY}`;
  ctx.fillText(line1, centerX, centerY - baseSize * 0.55);

  ctx.font = `300 ${baseSize * 0.85}px ${FONT_FAMILY}`;
  ctx.fillText(line2, centerX, centerY + baseSize * 0.55);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = imageData.data;
  const points: number[] = [];
  const colors: number[] = [];

  const worldWidth = 13;
  const worldHeight = worldWidth * (canvas.height / canvas.width);

  for (let y = 0; y < canvas.height; y += density) {
    for (let x = 0; x < canvas.width; x += density) {
      const index = (y * canvas.width + x) * 4;
      const alpha = pixels[index + 3];
      if (alpha > 128) {
        const jitter = 0.008;
        const worldX =
          (x / canvas.width - 0.5) * worldWidth +
          (Math.random() - 0.5) * jitter;
        const worldY =
          -(y / canvas.height - 0.5) * worldHeight +
          (Math.random() - 0.5) * jitter;
        const worldZ = (Math.random() - 0.5) * 0.08;
        points.push(worldX, worldY, worldZ);

        const useAccent = Math.random() < 0.08;
        const c = useAccent ? PARTICLE_ACCENT : PARTICLE_COLOR;
        colors.push(c.r, c.g, c.b);
      }
    }
  }

  return {
    positions: new Float32Array(points),
    colors: new Float32Array(colors),
    count: points.length / 3,
  };
}

function ParticleField({ mouse }: { mouse: React.MutableRefObject<THREE.Vector2> }) {
  const pointsRef = useRef<THREE.Points>(null);
  const { viewport } = useThree();

  const home = useMemo(() => sampleTextPositions(LINE_1, LINE_2, 4), []);

  const currentPositions = useMemo(
    () => new Float32Array(home.positions),
    [home]
  );
  const velocities = useMemo(
    () => new Float32Array(home.count * 3),
    [home.count]
  );

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const positionAttr = pointsRef.current.geometry.attributes
      .position as THREE.BufferAttribute;
    const pos = positionAttr.array as Float32Array;
    const t = clock.getElapsedTime();

    const mouseWorldX =
      (mouse.current.x / window.innerWidth) * viewport.width - viewport.width / 2;
    const mouseWorldY =
      -(mouse.current.y / window.innerHeight) * viewport.height + viewport.height / 2;

    const repelRadius = 1.3;
    const repelRadiusSq = repelRadius * repelRadius;
    const invRepelRadius = 1 / repelRadius;
    const repelStrength = 0.08;
    const springStrength = 0.03;
    const damping = 0.88;
    const count = home.count;
    const homePos = home.positions;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const hx = homePos[i3];
      const hy = homePos[i3 + 1];
      const hz = homePos[i3 + 2];

      const cx = pos[i3];
      const cy = pos[i3 + 1];
      const cz = pos[i3 + 2];

      let vx = velocities[i3];
      let vy = velocities[i3 + 1];
      let vz = velocities[i3 + 2];

      const dx = cx - mouseWorldX;
      const dy = cy - mouseWorldY;
      const distSq = dx * dx + dy * dy;

      if (distSq < repelRadiusSq && distSq > 0.0001) {
        const invDist = 1 / Math.sqrt(distSq);
        const force = (1 - (1 / invDist) * invRepelRadius) * repelStrength;
        vx += dx * invDist * force;
        vy += dy * invDist * force;
        vz += (Math.random() - 0.5) * force * 0.8;
      }

      vx += (hx - cx) * springStrength;
      vy += (hy - cy) * springStrength;
      vz += (hz - cz) * springStrength;

      vy += Math.sin(t * 1.2 + i * 0.05) * 0.0006;

      vx *= damping;
      vy *= damping;
      vz *= damping;

      pos[i3] = cx + vx;
      pos[i3 + 1] = cy + vy;
      pos[i3 + 2] = cz + vz;
      velocities[i3] = vx;
      velocities[i3 + 1] = vy;
      velocities[i3 + 2] = vz;
    }

    positionAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[currentPositions, 3]}
          count={home.count}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[home.colors, 3]}
          count={home.count}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.022}
        vertexColors
        sizeAttenuation
        transparent
        opacity={0.98}
        depthWrite={false}
      />
    </points>
  );
}

type IconDef = { src: string; label: string };
const ICONS: IconDef[] = [
  { src: "/images/tech/swift.webp", label: "Swift" },
  { src: "/images/tech/swiftui.webp", label: "SwiftUI" },
  { src: "/images/tech/xcode.webp", label: "Xcode" },
  { src: "/images/tech/visionos.webp", label: "visionOS" },
  { src: "/images/tech/realitykit.webp", label: "RealityKit" },
  { src: "/images/tech/coreml.webp", label: "Core ML" },
  { src: "/images/tech/react.webp", label: "React" },
  { src: "/images/tech/sketch.webp", label: "Sketch" },
];

function OrbitIcons({ scrollProgress }: { scrollProgress: number }) {
  const reveal = Math.min(scrollProgress * 2.2, 1);
  if (reveal <= 0.02) return null;

  const count = ICONS.length;
  const radiusX = 620;
  const radiusY = 250;
  const time = performance.now() / 1000;

  return (
    <div className="orbit-icons" style={{ opacity: reveal }}>
      {ICONS.map((icon, i) => {
        const baseAngle = (i / count) * Math.PI * 2 - Math.PI / 2;
        const spin = scrollProgress * Math.PI * 0.5 + time * 0.08;
        const angle = baseAngle + spin;
        const x = Math.cos(angle) * radiusX;
        const y = Math.sin(angle) * radiusY;
        const depth = Math.sin(angle) * 0.5 + 0.5;
        const scale = 0.65 + depth * 0.35 + reveal * 0.1;
        const blur = (1 - depth) * 1.5;
        return (
          <div
            key={icon.label}
            className="orbit-icon"
            style={{
              transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`,
              filter: `blur(${blur}px) drop-shadow(0 10px 24px rgba(15, 30, 46, 0.18))`,
              zIndex: Math.round(depth * 100),
              opacity: 0.5 + depth * 0.5,
            }}
          >
            <img src={icon.src} alt={icon.label} draggable={false} />
          </div>
        );
      })}
    </div>
  );
}

const ParticleHero = () => {
  const mouse = useRef(new THREE.Vector2(-9999, -9999));
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouse.current.set(e.clientX, e.clientY);
    };
    const handleLeave = () => {
      mouse.current.set(-9999, -9999);
    };

    let scrollTicking = false;
    const computeScroll = () => {
      scrollTicking = false;
      const hero = document.getElementById("particle-hero");
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      const progress = Math.max(
        0,
        Math.min(1, -rect.top / (rect.height || 1))
      );
      setScrollProgress(progress);
    };
    const handleScroll = () => {
      if (scrollTicking) return;
      scrollTicking = true;
      requestAnimationFrame(computeScroll);
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseleave", handleLeave);
    window.addEventListener("scroll", handleScroll, { passive: true });
    computeScroll();

    const hero = document.getElementById("particle-hero");
    let observer: IntersectionObserver | null = null;
    if (hero) {
      observer = new IntersectionObserver(
        ([entry]) => {
          document.body.classList.toggle(
            "hero-in-view",
            entry.isIntersecting && entry.intersectionRatio > 0.25
          );
        },
        { threshold: [0, 0.25, 0.5, 0.75, 1] }
      );
      observer.observe(hero);
    }

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseleave", handleLeave);
      window.removeEventListener("scroll", handleScroll);
      observer?.disconnect();
      document.body.classList.remove("hero-in-view");
    };
  }, []);

  return (
    <section id="particle-hero" className="particle-hero">
      <div className="particle-hero-bg" />
      <div className="particle-hero-grain" />
      <div className="particle-hero-blob blob-a" />
      <div className="particle-hero-blob blob-b" />

      <OrbitIcons scrollProgress={scrollProgress} />

      <div className="particle-canvas-wrap">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 50 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]}
        >
          <ParticleField mouse={mouse} />
        </Canvas>
      </div>

      <div className="particle-hero-label-left">
        <span className="label-dot" />
        Available for work · 2026
      </div>

      <div className="particle-hero-label-right">
        iOS · Data · Spatial
      </div>

      <div className="particle-hero-scrollhint">
        <span>Scroll</span>
        <span className="scroll-arrow" aria-hidden>
          ↓
        </span>
      </div>
    </section>
  );
};

export default ParticleHero;
