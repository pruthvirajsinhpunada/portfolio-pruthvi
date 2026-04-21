import { useEffect, useRef } from "react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { TbNotes } from "react-icons/tb";
import HoverLinks from "./HoverLinks";
import "./styles/SocialIcons.css";

const STRENGTH = 0.35;
const RADIUS = 90;
const LERP = 0.18;
const EPS = 0.05;

const SocialIcons = () => {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = wrapRef.current;
    if (!root) return;

    const items = Array.from(
      root.querySelectorAll<HTMLElement>(".si-item")
    ).map((item) => {
      const link = item.querySelector("a") as HTMLElement;
      return {
        item,
        link,
        tx: 0,
        ty: 0,
        cx: 0,
        cy: 0,
        active: false,
      };
    });

    let rafId = 0;
    let running = false;

    const tick = () => {
      let keep = false;
      for (const s of items) {
        s.cx += (s.tx - s.cx) * LERP;
        s.cy += (s.ty - s.cy) * LERP;
        if (Math.abs(s.tx - s.cx) > EPS || Math.abs(s.ty - s.cy) > EPS) {
          keep = true;
        } else {
          s.cx = s.tx;
          s.cy = s.ty;
        }
        s.link.style.transform = `translate3d(${s.cx}px, ${s.cy}px, 0)`;
      }
      if (keep) {
        rafId = requestAnimationFrame(tick);
      } else {
        running = false;
      }
    };

    const start = () => {
      if (running) return;
      running = true;
      rafId = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      let anyActive = false;
      for (const s of items) {
        const r = s.item.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const d = Math.hypot(dx, dy);
        if (d < RADIUS) {
          s.tx = dx * STRENGTH;
          s.ty = dy * STRENGTH;
          s.active = true;
          anyActive = true;
        } else if (s.active) {
          s.tx = 0;
          s.ty = 0;
          s.active = false;
        }
      }
      if (anyActive) start();
    };

    const onLeave = () => {
      for (const s of items) {
        s.tx = 0;
        s.ty = 0;
        s.active = false;
      }
      start();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div className="icons-section" ref={wrapRef}>
      <div className="social-icons" data-cursor="icons" id="social">
        <span className="si-item">
          <a
            href="https://github.com/pruthvirajsinhpunada"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
        </span>
        <span className="si-item">
          <a
            href="https://www.linkedin.com/in/punada-pruthviraj-4ba704239/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn />
          </a>
        </span>
        <span className="si-item">
          <a href="mailto:pruthviraj1022004@gmail.com" aria-label="Email">
            <MdEmail />
          </a>
        </span>
      </div>
      <a className="resume-button" href="/CV.pdf" target="_blank">
        <HoverLinks text="RESUME" />
        <span>
          <TbNotes />
        </span>
      </a>
    </div>
  );
};

export default SocialIcons;
