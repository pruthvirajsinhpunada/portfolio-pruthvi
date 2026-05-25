import "./styles/Skills.css";

type Category = {
  label: string;
  skills: string[];
};

const categories: Category[] = [
  {
    label: "Languages",
    skills: ["Swift", "Python", "TypeScript", "JavaScript", "C++", "SQL"],
  },
  {
    label: "Apple Frameworks",
    skills: [
      "SwiftUI",
      "UIKit",
      "AppKit",
      "RealityKit",
      "ARKit",
      "Core ML",
      "Vision",
      "Combine",
      "SpriteKit",
      "AVFoundation",
      "Xcode",
    ],
  },
  {
    label: "Platforms",
    skills: ["iOS", "iPadOS", "macOS", "visionOS"],
  },
  {
    label: "Machine Learning & Data",
    skills: [
      "PyTorch",
      "TensorFlow",
      "scikit-learn",
      "Computer Vision",
      "Anomaly Detection",
      "Data Analysis",
    ],
  },
  {
    label: "Web & 3D",
    skills: [
      "React",
      "Next.js",
      "Three.js",
      "React Three Fiber",
      "WebGL",
      "Blender",
      "USDZ",
      "glTF",
    ],
  },
  {
    label: "Tools & Practices",
    skills: ["Git", "Firebase", "Vercel", "REST APIs", "CI/CD", "MVVM", "Agile"],
  },
];

const Skills = () => {
  return (
    <section className="skills-section" id="skills">
      <div className="skills-head">
        <span className="skills-kicker">// skills</span>
        <h2 className="skills-title">
          Skills <span className="skills-title-accent">&amp; tools</span>
        </h2>
        <p className="skills-lede">
          The stack I reach for — Apple platforms, on-device ML, and the web/3D
          tooling behind this site.
        </p>
      </div>

      <div className="skills-grid">
        {categories.map((cat) => (
          <div key={cat.label} className="skills-card">
            <div className="skills-card-rail" aria-hidden />
            <h3 className="skills-card-label">{cat.label}</h3>
            <div className="skills-tags">
              {cat.skills.map((s) => (
                <span key={s} className="skills-tag">
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
