import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { MdArrowOutward } from "react-icons/md";
import { projects } from "../data/projects";
import "./styles/ProjectsShowcase.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type QuickTo = ReturnType<typeof gsap.quickTo>;

const ProjectsShowcase = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const xTo = useRef<QuickTo | null>(null);
  const yTo = useRef<QuickTo | null>(null);
  const [active, setActive] = useState<number | null>(null);
  const navigate = useNavigate();

  useGSAP(
    () => {
      if (revealRef.current) {
        gsap.set(revealRef.current, { xPercent: -50, yPercent: -50 });
        xTo.current = gsap.quickTo(revealRef.current, "x", {
          duration: 0.55,
          ease: "power3",
        });
        yTo.current = gsap.quickTo(revealRef.current, "y", {
          duration: 0.55,
          ease: "power3",
        });
      }

      // immediateRender:false + once keeps rows from getting stuck at opacity:0
      // when the section is jumped to via the nav anchor (skipping the trigger).
      gsap.from(".pw-header > *", {
        y: 32,
        opacity: 0,
        stagger: 0.1,
        duration: 0.9,
        ease: "power3.out",
        immediateRender: false,
        scrollTrigger: { trigger: ".pw-header", start: "top 90%", once: true },
      });
      gsap.from(".rg-row", {
        y: 40,
        opacity: 0,
        stagger: 0.07,
        duration: 0.8,
        ease: "power3.out",
        immediateRender: false,
        scrollTrigger: { trigger: ".rg-list", start: "top 92%", once: true },
      });

      ScrollTrigger.refresh();
    },
    { scope: sectionRef }
  );

  const handleMove = (e: React.MouseEvent) => {
    xTo.current?.(e.clientX);
    yTo.current?.(e.clientY);
  };

  return (
    <section
      className="pw-section"
      id="work"
      ref={sectionRef}
      onMouseMove={handleMove}
    >
      <div className="pw-container section-container">
        <header className="pw-header">
          <span className="pw-kicker">// selected work</span>
          <h2 className="pw-title">
            Selected <span className="pw-title-accent">work</span>.
          </h2>
          <p className="pw-lede">
            Eight things I've designed, built, and shipped.{" "}
            <span className="pw-hint">Hover to peek · click to open.</span>
          </p>
        </header>

        <ul
          className="rg-list"
          onMouseLeave={() => setActive(null)}
          data-hovering={active !== null}
        >
          {projects.map((p, i) => (
            <li
              key={p.slug}
              className="rg-row"
              data-active={active === i}
              style={{ ["--accent" as string]: p.accent } as React.CSSProperties}
              onMouseEnter={() => setActive(i)}
              onClick={() => navigate(`/projects/${p.slug}`)}
              data-cursor="disable"
            >
              <span className="rg-index">{String(i + 1).padStart(2, "0")}</span>
              <span className="rg-title">{p.title}</span>
              <span className="rg-thumb" aria-hidden>
                <img src={p.image} alt="" loading="lazy" />
              </span>
              <span className="rg-meta">{p.category}</span>
              <span className="rg-year">{p.year}</span>
              <MdArrowOutward className="rg-arrow" />
            </li>
          ))}
        </ul>
      </div>

      {/* Cursor-following image reveal (pointer devices only) */}
      <div className="rg-reveal" ref={revealRef} data-show={active !== null}>
        {projects.map((p, i) => (
          <img
            key={p.slug}
            className="rg-reveal-img"
            src={p.image}
            alt=""
            loading="lazy"
            data-on={active === i}
          />
        ))}
      </div>
    </section>
  );
};

export default ProjectsShowcase;
