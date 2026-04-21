import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import { createSmoother, SmootherAPI } from "./utils/smoothScroll";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollTrigger);
export let smoother: SmootherAPI;

const Navbar = () => {
  useEffect(() => {
    smoother = createSmoother();

    smoother.scrollTop(0);

    let links = document.querySelectorAll(".header ul a");
    links.forEach((elem) => {
      let element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        if (window.innerWidth > 1024) {
          e.preventDefault();
          let el = e.currentTarget as HTMLAnchorElement;
          let section = el.getAttribute("data-href");
          if (section) {
            const target = document.querySelector(section) as HTMLElement | null;
            if (target) smoother.scrollTo(target, true, "top top");
          }
        }
      });
    });
    window.addEventListener("resize", () => {
      smoother.refresh();
    });
  }, []);
  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          PP
        </a>
        <a
          href="mailto:pruthviraj1022004@gmail.com"
          className="navbar-connect"
          data-cursor="disable"
        >
          pruthviraj1022004@gmail.com
        </a>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
