import "./styles/About.css";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-photo">
        <div className="about-photo-frame">
          <img
            src="/images/profile.webp"
            alt="Pruthvirajsinh Punada"
            loading="lazy"
          />
        </div>
        <div className="about-photo-accent" aria-hidden />
      </div>
      <div className="about-me">
        <h3 className="title">About Me</h3>
        <p className="para">
          I'm an iOS developer and data analyst building accessible,
          user-centric apps across the Apple ecosystem. I fuse SwiftUI,
          SpriteKit, and on-device machine learning (CoreML, Vision,
          RealityKit) to ship empathetic, high-performance experiences —
          from Swift Student Challenge projects on sign-language
          recognition to spatial chess for Apple Vision Pro. Currently a
          Developer Student at the Apple Developer Academy @ UNINA
          Federico II in Naples, with a foundation in mathematical
          modeling and Support Vector Machines from my Data Analytics
          degree.
        </p>
      </div>
    </div>
  );
};

export default About;
