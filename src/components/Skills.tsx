import type { IconType } from "react-icons";
import {
  SiSwift,
  SiPython,
  SiTypescript,
  SiJavascript,
  SiCplusplus,
  SiReact,
  SiNextdotjs,
  SiThreedotjs,
  SiBlender,
  SiGit,
  SiFirebase,
  SiVercel,
  SiPytorch,
  SiTensorflow,
  SiScikitlearn,
  SiWebgl,
  SiApple,
  SiXcode,
} from "react-icons/si";
import {
  FaDatabase,
  FaCube,
  FaVrCardboard,
  FaBrain,
  FaEye,
  FaArrowsRotate,
  FaGamepad,
  FaVideo,
  FaServer,
  FaCodeBranch,
  FaLayerGroup,
  FaChartLine,
} from "react-icons/fa6";
import "./styles/Skills.css";

type Skill = { name: string; Icon: IconType };

const skills: Skill[] = [
  { name: "Swift", Icon: SiSwift },
  { name: "Python", Icon: SiPython },
  { name: "TypeScript", Icon: SiTypescript },
  { name: "JavaScript", Icon: SiJavascript },
  { name: "C++", Icon: SiCplusplus },
  { name: "SQL", Icon: FaDatabase },
  { name: "SwiftUI", Icon: SiSwift },
  { name: "UIKit", Icon: SiApple },
  { name: "AppKit", Icon: SiApple },
  { name: "RealityKit", Icon: FaCube },
  { name: "ARKit", Icon: FaVrCardboard },
  { name: "Core ML", Icon: FaBrain },
  { name: "Vision", Icon: FaEye },
  { name: "Combine", Icon: FaArrowsRotate },
  { name: "SpriteKit", Icon: FaGamepad },
  { name: "AVFoundation", Icon: FaVideo },
  { name: "Xcode", Icon: SiXcode },
  { name: "iOS", Icon: SiApple },
  { name: "iPadOS", Icon: SiApple },
  { name: "macOS", Icon: SiApple },
  { name: "visionOS", Icon: FaVrCardboard },
  { name: "PyTorch", Icon: SiPytorch },
  { name: "TensorFlow", Icon: SiTensorflow },
  { name: "scikit-learn", Icon: SiScikitlearn },
  { name: "Computer Vision", Icon: FaEye },
  { name: "Anomaly Detection", Icon: FaChartLine },
  { name: "Data Analysis", Icon: FaChartLine },
  { name: "React", Icon: SiReact },
  { name: "Next.js", Icon: SiNextdotjs },
  { name: "Three.js", Icon: SiThreedotjs },
  { name: "React Three Fiber", Icon: SiReact },
  { name: "WebGL", Icon: SiWebgl },
  { name: "Blender", Icon: SiBlender },
  { name: "USDZ", Icon: FaCube },
  { name: "glTF", Icon: FaCube },
  { name: "Git", Icon: SiGit },
  { name: "Firebase", Icon: SiFirebase },
  { name: "Vercel", Icon: SiVercel },
  { name: "REST APIs", Icon: FaServer },
  { name: "CI/CD", Icon: FaCodeBranch },
  { name: "MVVM", Icon: FaLayerGroup },
  { name: "Agile", Icon: FaArrowsRotate },
];

// Deal skills round-robin into 3 rows so brand logos spread evenly.
const rows: Skill[][] = [[], [], []];
skills.forEach((s, i) => rows[i % 3].push(s));

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

      <div className="skills-marquee" aria-label="Skills and tools">
        {rows.map((row, r) => (
          <div className={`mq-row${r % 2 === 1 ? " mq-row--rev" : ""}`} key={r}>
            <ul
              className="mq-track"
              style={{ animationDuration: `${46 + r * 9}s` }}
            >
              {[...row, ...row].map((s, i) => (
                <li
                  className="mq-item"
                  key={`${s.name}-${i}`}
                  aria-hidden={i >= row.length}
                >
                  <s.Icon className="mq-icon" />
                  <span>{s.name}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
