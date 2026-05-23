import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { MdArrowOutward } from "react-icons/md";
import { projects } from "../data/projects";
import Gallery3D from "./gallery/Gallery3D";
import "./styles/ProjectsShowcase.css";
import "./styles/Gallery.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const useImmersiveCapable = () => {
  const [capable, setCapable] = useState(true);
  useLayoutEffect(() => {
    const check = () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const narrow = window.innerWidth < 880;
      setCapable(!reduce && !narrow);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return capable;
};

const ProjectsShowcase = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const navigate = useNavigate();
  const immersive = useImmersiveCapable();

  // Scroll-pin the gallery for the duration of the dolly
  useGSAP(
    () => {
      if (!immersive) return;
      const stage = stageRef.current;
      const track = trackRef.current;
      if (!stage || !track) return;

      const trigger = ScrollTrigger.create({
        trigger: track,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        pin: stage,
        pinSpacing: false,
        onUpdate: (self) => {
          progressRef.current = self.progress;
        },
      });

      return () => {
        trigger.kill();
      };
    },
    { dependencies: [immersive] }
  );

  // Animate header on first reveal
  useGSAP(
    () => {
      gsap.from(".pw-header > *", {
        y: 32,
        opacity: 0,
        stagger: 0.1,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ".pw-header", start: "top 85%" },
      });
    },
    { scope: sectionRef }
  );

  useEffect(() => {
    return () => {
      progressRef.current = 0;
    };
  }, []);

  const onSelect = (slug: string) => {
    navigate(`/projects/${slug}`);
  };

  // Track height drives the scroll distance for the pin (one viewport per ~1.4 monoliths)
  const trackHeight = `${Math.max(180, projects.length * 70)}vh`;

  return (
    <section className="pw-section" id="work" ref={sectionRef}>
      <div className="pw-container section-container">
        <header className="pw-header">
          <span className="pw-kicker">// selected work</span>
          <h2 className="pw-title">
            Walk the <span className="pw-title-accent">gallery</span>.
          </h2>
          <p className="pw-lede">
            {immersive ? (
              <>
                Nine projects, each in their own light.{" "}
                <span className="pw-hint">Scroll to dolly through · Click any monolith to enter.</span>
              </>
            ) : (
              <>
                Nine projects, each in their own light.{" "}
                <span className="pw-hint">Tap a tile to open the case study.</span>
              </>
            )}
          </p>
        </header>
      </div>

      {immersive ? (
        <div
          ref={trackRef}
          className="gx-track"
          style={{ height: trackHeight }}
        >
          <div ref={stageRef} className="gx-stage">
            <Gallery3D
              projects={projects}
              progressRef={progressRef}
              onSelect={onSelect}
            />
            <div className="gx-edge gx-edge-left" />
            <div className="gx-edge gx-edge-right" />
            <div className="gx-hint">
              <span>scroll</span>
              <span className="gx-hint-bar" />
            </div>
          </div>
        </div>
      ) : (
        <div className="gx-fallback">
          <div className="gx-fallback-strip">
            {projects.map((p, i) => (
              <button
                key={p.slug}
                className="gx-fallback-card"
                style={{ ["--accent" as string]: p.accent } as React.CSSProperties}
                onClick={() => onSelect(p.slug)}
                data-cursor="disable"
              >
                <div className="gx-fallback-media">
                  <img src={p.monolith || p.image} alt={p.title} loading="lazy" />
                </div>
                <div className="gx-fallback-body">
                  <span className="gx-fallback-num">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="gx-fallback-arrow">
                    <MdArrowOutward />
                  </span>
                  <h3 className="gx-fallback-title">{p.title}</h3>
                  <p className="gx-fallback-cat">{p.category}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectsShowcase;
