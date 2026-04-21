import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { MdArrowOutward, MdClose } from "react-icons/md";
import { FaGithub, FaAppStoreIos } from "react-icons/fa";
import { projects } from "../data/projects";
import "./styles/ProjectsShowcase.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const ProjectsShowcase = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [active, setActive] = useState<number | null>(null);
  const [originRect, setOriginRect] = useState<DOMRect | null>(null);
  const [phase, setPhase] = useState<"idle" | "opening" | "open" | "closing">(
    "idle"
  );

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".pw-card");
      if (!cards.length) return;
      gsap.from(cards, {
        y: 40,
        opacity: 0,
        scale: 0.95,
        stagger: 0.06,
        duration: 0.8,
        ease: "power3.out",
      });
    },
    { scope: sectionRef }
  );

  const openAt = (i: number) => {
    const el = cardRefs.current[i];
    if (!el) return;
    setOriginRect(el.getBoundingClientRect());
    setActive(i);
    setPhase("opening");
    document.body.style.overflow = "hidden";
  };

  const close = () => {
    if (phase !== "open") return;
    setPhase("closing");
    const el = cardRefs.current[active ?? 0];
    if (el) setOriginRect(el.getBoundingClientRect());
  };

  useLayoutEffect(() => {
    if (phase === "opening") {
      const id = requestAnimationFrame(() =>
        requestAnimationFrame(() => setPhase("open"))
      );
      return () => cancelAnimationFrame(id);
    }
  }, [phase]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const current = active !== null ? projects[active] : null;

  const getOverlayStyle = (): React.CSSProperties => {
    if (phase === "opening" && originRect) {
      return {
        top: originRect.top,
        left: originRect.left,
        width: originRect.width,
        height: originRect.height,
        borderRadius: 22,
        opacity: 1,
      };
    }
    if (phase === "open") {
      return {
        top: "50%",
        left: "50%",
        width: "min(1180px, 92vw)",
        height: "min(720px, 86vh)",
        transform: "translate(-50%, -50%)",
        borderRadius: 24,
        opacity: 1,
      };
    }
    if (phase === "closing" && originRect) {
      return {
        top: originRect.top,
        left: originRect.left,
        width: originRect.width,
        height: originRect.height,
        borderRadius: 22,
        opacity: 0,
      };
    }
    return {};
  };

  const onOverlayTransitionEnd = (
    e: React.TransitionEvent<HTMLDivElement>
  ) => {
    if (e.propertyName !== "width") return;
    if (phase === "closing") {
      setActive(null);
      setPhase("idle");
      setOriginRect(null);
      document.body.style.overflow = "";
    }
  };

  return (
    <section className="pw-section" id="work" ref={sectionRef}>
      <div className="pw-container section-container">
        <header className="pw-header">
          <span className="pw-kicker">// selected work</span>
          <h2 className="pw-title">
            My <span className="pw-title-accent">Work</span>
          </h2>
          <p className="pw-lede">
            Seven shipped projects across iOS, visionOS, and data.{" "}
            <span className="pw-hint">Tap a tile to expand.</span>
          </p>
        </header>

        <div className="pw-grid">
          {projects.map((p, i) => {
            const isSource = active === i && phase !== "idle";
            return (
              <button
                key={p.title}
                ref={(el) => (cardRefs.current[i] = el)}
                className={`pw-card ${isSource ? "is-source" : ""}`}
                onClick={() => openAt(i)}
                data-cursor="disable"
                style={{ "--i": i } as React.CSSProperties}
              >
                <div className="pw-card-media">
                  <img src={p.image} alt={p.title} loading="lazy" />
                  <div className="pw-card-veil" />
                </div>
                <div className="pw-card-head">
                  <span className="pw-card-num">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="pw-card-arrow" aria-hidden>
                    <MdArrowOutward />
                  </span>
                </div>
                <div className="pw-card-foot">
                  <h3 className="pw-card-title">{p.title}</h3>
                  <p className="pw-card-cat">{p.category}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {current && (
        <div
          className={`pw-backdrop ${phase === "open" ? "is-open" : ""} ${
            phase === "closing" ? "is-closing" : ""
          }`}
          onClick={close}
        >
          <div
            className={`pw-detail phase-${phase}`}
            style={getOverlayStyle()}
            onTransitionEnd={onOverlayTransitionEnd}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="pw-close"
              onClick={close}
              aria-label="Close"
              data-cursor="disable"
            >
              <MdClose />
            </button>

            <div className="pw-detail-media">
              <img src={current.image} alt={current.title} />
            </div>

            <div className="pw-detail-body">
              <span className="pw-detail-num">
                {String((active ?? 0) + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
              </span>
              <h3 className="pw-detail-title">{current.title}</h3>
              <p className="pw-detail-cat">{current.category}</p>
              <p className="pw-detail-desc">{current.description}</p>

              <div className="pw-detail-stack">
                <span className="pw-stack-label">Stack</span>
                <div className="pw-stack-pills">
                  {current.tools.split(",").map((t) => (
                    <span key={t} className="pw-pill">
                      {t.trim()}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pw-detail-actions">
                <a
                  href={current.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pw-btn"
                  data-cursor="disable"
                >
                  <FaGithub /> GitHub <MdArrowOutward className="pw-btn-arrow" />
                </a>
                {current.appStoreLink && (
                  <a
                    href={current.appStoreLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pw-btn pw-btn-primary"
                    data-cursor="disable"
                  >
                    <FaAppStoreIos /> App Store{" "}
                    <MdArrowOutward className="pw-btn-arrow" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectsShowcase;
