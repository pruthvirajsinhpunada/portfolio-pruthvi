import { lazy, Suspense, useEffect } from "react";
import About from "./About";
import AmbientBackground from "./AmbientBackground";
import Career from "./Career";
import Contact from "./Contact";
import Cursor from "./Cursor";
import ParticleHero from "./ParticleHero";
import Navbar from "./Navbar";
import ProjectsShowcase from "./ProjectsShowcase";
import SocialIcons from "./SocialIcons";
import WhatIDo from "./WhatIDo";
import setSplitText from "./utils/splitText";

const TechStack = lazy(() => import("./TechStack"));

const MainContainer = () => {
  useEffect(() => {
    const resizeHandler = () => {
      setSplitText();
    };
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return (
    <div className="container-main">
      <AmbientBackground />
      <Cursor />
      <Navbar />
      <SocialIcons />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="container-main">
            <ParticleHero />
            <About />
            <WhatIDo />
            <Career />
            <ProjectsShowcase />
            <Suspense fallback={<div>Loading....</div>}>
              <TechStack />
            </Suspense>
            <Contact />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
