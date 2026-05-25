import { useState } from "react";
import "./styles/WhatIDo.css";

type Item = {
  num: string;
  title: string;
  subtitle: string;
  glyph: string;
  tagline: string;
  desc: string;
  tags: string[];
};

const items: Item[] = [
  {
    num: "01",
    title: "iOS & SwiftUI",
    subtitle: "Apple Ecosystem Apps",
    glyph: "\u25D0",
    tagline: "Two apps shipped. One open-source. Production SwiftUI + Firebase.",
    desc: "Shipping accessible, user-centric iOS apps across the Apple ecosystem. Two apps on the App Store, one open-source macOS contribution, and a SwiftUI + Firebase stack for real-time social and business apps.",
    tags: ["Swift", "SwiftUI", "Firebase", "Combine", "MapKit", "AVFoundation", "Cloud Functions", "App Store", "Xcode"],
  },
  {
    num: "02",
    title: "Spatial & visionOS",
    subtitle: "Apple Vision Pro",
    glyph: "\u2B22",
    tagline: "Spatial chess for Apple Vision Pro \u2014 AI + live online play.",
    desc: "Building for Apple Vision Pro \u2014 immersive RealityKit scenes with a Blender \u2192 USDZ pipeline. On LiveChess I integrated the Stockfish C++ engine into Swift and built the live Lichess multiplayer layer, with custom 3D environments and spatial UI.",
    tags: ["visionOS", "RealityKit", "Swift \u2194 C++", "Stockfish", "Lichess API", "Reality Composer Pro", "Blender", "USDZ"],
  },
  {
    num: "03",
    title: "On-Device AI",
    subtitle: "Accessibility & ML",
    glyph: "\u2726",
    tagline: "Private ML. Real-time sign language. No cloud.",
    desc: "Privacy-first machine learning that runs entirely on device. My Swift Student Challenge 2026 submission, SignBridge, interprets sign language in real-time using CoreML + Vision \u2014 no cloud, no tracking.",
    tags: ["CoreML", "Vision", "Create ML", "Natural Language", "AVFoundation", "Accessibility", "Swift Student Challenge", "Python", "PyTorch"],
  },
];

const WhatIDo = () => {
  const [flipped, setFlipped] = useState<Record<string, boolean>>({});
  const toggle = (n: string) => setFlipped((s) => ({ ...s, [n]: !s[n] }));

  return (
    <section className="wid-section">
      <div className="wid-head">
        <span className="wid-kicker">// capabilities</span>
        <h2 className="wid-title">
          What <span className="wid-title-accent">I Do</span>
        </h2>
        <p className="wid-lede">
          Three disciplines I ship production work in — from App Store apps to
          spatial computing and on-device intelligence.{" "}
          <span className="wid-lede-hint">Hover to flip.</span>
        </p>
      </div>

      <div className="wid-grid">
        {items.map((item) => (
          <div
            key={item.num}
            className={`wid-card ${flipped[item.num] ? "is-flipped" : ""}`}
            onClick={() => toggle(item.num)}
          >
            <div className="wid-card-inner">
              <div className="wid-face wid-face-front">
                <div className="wid-card-rail" aria-hidden />
                <header className="wid-card-head">
                  <span className="wid-num">{item.num}</span>
                  <span className="wid-glyph" aria-hidden>{item.glyph}</span>
                </header>
                <div className="wid-face-body">
                  <h3 className="wid-card-title">{item.title}</h3>
                  <h4 className="wid-card-subtitle">{item.subtitle}</h4>
                  <p className="wid-tagline">{item.tagline}</p>
                </div>
                <footer className="wid-face-foot">
                  <span className="wid-flip-cta">
                    <span>Reveal stack</span>
                    <span className="wid-flip-arrow" aria-hidden>{"\u21BA"}</span>
                  </span>
                </footer>
              </div>

              <div className="wid-face wid-face-back">
                <div className="wid-card-rail wid-card-rail-back" aria-hidden />
                <header className="wid-card-head">
                  <span className="wid-num">{item.num}</span>
                  <span className="wid-back-label">Stack</span>
                </header>
                <p className="wid-back-desc">{item.desc}</p>
                <div className="wid-tags">
                  {item.tags.map((t) => (
                    <span key={t} className="wid-tag">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhatIDo;
