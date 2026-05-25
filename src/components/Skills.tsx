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

      <div className="skills-list">
        {categories.map((cat, i) => (
          <div className="skills-row" key={cat.label}>
            <h3 className="skills-row-label">
              <span className="skills-row-num">
                {String(i + 1).padStart(2, "0")}
              </span>
              {cat.label}
            </h3>
            <ul className="skills-row-items">
              {cat.skills.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
