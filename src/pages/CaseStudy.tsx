import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MdArrowBack, MdArrowOutward, MdClose } from "react-icons/md";
import { FaGithub, FaAppStoreIos } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import AmbientBackground from "../components/AmbientBackground";
import { getProjectBySlug, projects, type Project } from "../data/projects";
import "../components/styles/CaseStudy.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const STATUS_LABEL: Record<Project["status"], string> = {
  live: "Live",
  shipped: "Shipped",
  "in-development": "In development",
};

const CaseStudy = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;
  const rootRef = useRef<HTMLDivElement>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const { prev, next } = useMemo(() => {
    if (!project) return { prev: undefined, next: undefined };
    const idx = projects.findIndex((p) => p.slug === project.slug);
    return {
      prev: projects[(idx - 1 + projects.length) % projects.length],
      next: projects[(idx + 1) % projects.length],
    };
  }, [project]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [slug]);

  useGSAP(
    () => {
      if (!project) return;
      const reveals = gsap.utils.toArray<HTMLElement>(".cs-reveal");
      reveals.forEach((el) => {
        gsap.from(el, {
          y: 36,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });
    },
    { scope: rootRef, dependencies: [project?.slug] }
  );

  if (!project) {
    return (
      <div className="cs-notfound">
        <AmbientBackground />
        <div className="cs-notfound-inner">
          <p className="cs-kicker">// 404</p>
          <h1>Project not found</h1>
          <p>This project doesn't exist (yet).</p>
          <Link to="/" className="cs-btn">
            <MdArrowBack /> Back to portfolio
          </Link>
        </div>
      </div>
    );
  }

  const tools = project.tools.split(",").map((t) => t.trim()).filter(Boolean);
  const accent = project.accent;

  return (
    <div
      className="cs-root"
      ref={rootRef}
      style={{ ["--cs-accent" as string]: accent } as React.CSSProperties}
    >
      <AmbientBackground />

      <Link to="/" className="cs-back" data-cursor="disable">
        <MdArrowBack /> <span>Back</span>
      </Link>

      <header className="cs-hero">
        <div className="cs-hero-media">
          <img src={project.hero} alt={project.title} />
          <div className="cs-hero-veil" />
        </div>
        <div className="cs-hero-body">
          <span className="cs-kicker">// {project.category.toLowerCase()}</span>
          <h1 className="cs-title">{project.title}</h1>
          <p className="cs-summary">{project.summary}</p>
          <div className="cs-meta">
            <div>
              <span className="cs-meta-label">Year</span>
              <span className="cs-meta-value">{project.year}</span>
            </div>
            <div>
              <span className="cs-meta-label">Role</span>
              <span className="cs-meta-value">{project.role}</span>
            </div>
            <div>
              <span className="cs-meta-label">Status</span>
              <span className={`cs-status cs-status-${project.status}`}>
                {STATUS_LABEL[project.status]}
              </span>
            </div>
          </div>
        </div>
      </header>

      <section className="cs-section cs-facts cs-reveal">
        <div className="cs-facts-stack">
          <span className="cs-stack-label">Stack</span>
          <div className="cs-stack-pills">
            {tools.map((t) => (
              <span key={t} className="cs-pill">
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className="cs-facts-actions">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cs-btn cs-btn-primary"
              data-cursor="disable"
            >
              Visit live site <MdArrowOutward />
            </a>
          )}
          {project.link && project.link !== project.liveUrl && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="cs-btn"
              data-cursor="disable"
            >
              <FaGithub /> GitHub <MdArrowOutward />
            </a>
          )}
          {project.appStoreLink && (
            <a
              href={project.appStoreLink}
              target="_blank"
              rel="noopener noreferrer"
              className="cs-btn"
              data-cursor="disable"
            >
              <FaAppStoreIos /> App Store <MdArrowOutward />
            </a>
          )}
        </div>
      </section>

      <section className="cs-section cs-narrative">
        <article className="cs-block cs-reveal">
          <span className="cs-block-label">01 · Problem</span>
          <p>{project.caseStudy.problem}</p>
        </article>
        <article className="cs-block cs-reveal">
          <span className="cs-block-label">02 · Approach</span>
          <p>{project.caseStudy.approach}</p>
        </article>
        <article className="cs-block cs-reveal">
          <span className="cs-block-label">03 · Outcome</span>
          <p>{project.caseStudy.outcome}</p>
        </article>
        {project.caseStudy.techNotes && (
          <article className="cs-block cs-reveal cs-block-tech">
            <span className="cs-block-label">Tech notes</span>
            <p>{project.caseStudy.techNotes}</p>
          </article>
        )}
      </section>

      {project.gallery.length > 0 && (
        <section className="cs-section cs-gallery cs-reveal">
          <span className="cs-block-label">Gallery</span>
          <div className="cs-gallery-grid">
            {project.gallery.map((src, i) => (
              <button
                key={src}
                className={`cs-gallery-item${project.galleryPortrait ? " cs-gallery-item--portrait" : ""}`}
                onClick={() => setLightboxIndex(i)}
                data-cursor="disable"
                aria-label={`Open image ${i + 1}`}
              >
                <img src={src} alt="" loading="lazy" />
              </button>
            ))}
          </div>
        </section>
      )}

      {project.slug === "pizzart-caserta" && project.liveUrl && (
        <section className="cs-section cs-live cs-reveal">
          <span className="cs-block-label">The live experience</span>
          <p className="cs-live-caption">
            Real customers, real reservations.{" "}
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              Open the live site →
            </a>
          </p>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="cs-laptop"
            data-cursor="disable"
            aria-label="Visit pizzartcaserta.it"
          >
            <div className="cs-laptop-bezel">
              <div className="cs-laptop-screen">
                <img src={project.gallery[0] || project.hero} alt="" />
                <div className="cs-laptop-overlay">
                  <span className="cs-laptop-cta">
                    Visit pizzartcaserta.it <MdArrowOutward />
                  </span>
                </div>
              </div>
            </div>
            <div className="cs-laptop-base" />
          </a>
        </section>
      )}

      <nav className="cs-nav">
        {prev && (
          <Link to={`/projects/${prev.slug}`} className="cs-nav-card cs-nav-prev">
            <span className="cs-nav-direction">← Previous</span>
            <span className="cs-nav-title">{prev.title}</span>
          </Link>
        )}
        {next && (
          <Link to={`/projects/${next.slug}`} className="cs-nav-card cs-nav-next">
            <span className="cs-nav-direction">Next →</span>
            <span className="cs-nav-title">{next.title}</span>
          </Link>
        )}
      </nav>

      {lightboxIndex !== null && (
        <div
          className="cs-lightbox"
          onClick={() => setLightboxIndex(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            className="cs-lightbox-close"
            onClick={() => setLightboxIndex(null)}
            aria-label="Close"
          >
            <MdClose />
          </button>
          <img
            src={project.gallery[lightboxIndex]}
            alt=""
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default CaseStudy;
