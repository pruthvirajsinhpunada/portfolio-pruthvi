import { useEffect, useRef } from "react";
import "./styles/AmbientBackground.css";

const AmbientBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    type P = {
      x: number;
      y: number;
      z: number;
      r: number;
      vx: number;
      vy: number;
      a: number;
      tw: number;
      hue: number;
    };

    let particles: P[] = [];

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const target = Math.min(110, Math.round((w * h) / 22000));
      particles = new Array(target).fill(0).map(() => ({
        x: Math.random() * w,
        y: Math.random() * h,
        z: Math.random() * 0.7 + 0.3,
        r: Math.random() * 1.4 + 0.4,
        vx: (Math.random() - 0.5) * 0.12,
        vy: -Math.random() * 0.18 - 0.04,
        a: Math.random() * Math.PI * 2,
        tw: Math.random() * 0.015 + 0.005,
        hue: Math.random() < 0.7 ? 22 : 265,
      }));
    };
    resize();
    window.addEventListener("resize", resize);

    let rafId = 0;
    let visible = !document.hidden;
    const onVis = () => {
      visible = !document.hidden;
      if (visible) rafId = requestAnimationFrame(draw);
    };
    document.addEventListener("visibilitychange", onVis);

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx * p.z;
        p.y += p.vy * p.z;
        p.a += p.tw;
        if (p.y < -20) {
          p.y = h + 10;
          p.x = Math.random() * w;
        }
        if (p.x < -20) p.x = w + 10;
        if (p.x > w + 20) p.x = -10;

        const alpha = (0.35 + 0.4 * Math.sin(p.a)) * p.z;
        const size = p.r * p.z;
        ctx.beginPath();
        ctx.fillStyle = `hsla(${p.hue}, 90%, 70%, ${alpha.toFixed(3)})`;
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fill();
      }
      if (visible) rafId = requestAnimationFrame(draw);
    };
    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <div className="ambient" aria-hidden>
      <div className="ambient-base" />
      <div className="ambient-grid" />
      <div className="ambient-orb ambient-orb-1" />
      <div className="ambient-orb ambient-orb-2" />
      <div className="ambient-orb ambient-orb-3" />
      <div className="ambient-orb ambient-orb-4" />
      <div className="ambient-orb ambient-orb-5" />
      <div className="ambient-orb ambient-orb-6" />
      <div className="ambient-aurora" />
      <canvas ref={canvasRef} className="ambient-particles" />
      <div className="ambient-noise" />
    </div>
  );
};

export default AmbientBackground;
