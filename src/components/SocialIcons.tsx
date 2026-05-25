import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { TbNotes } from "react-icons/tb";
import HoverLinks from "./HoverLinks";
import "./styles/SocialIcons.css";

const SocialIcons = () => {
  return (
    <div className="icons-section">
      <div className="social-icons" id="social">
        <span className="si-item">
          <a
            href="https://github.com/pruthvirajsinhpunada"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
        </span>
        <span className="si-item">
          <a
            href="https://www.linkedin.com/in/punada-pruthviraj-4ba704239/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn />
          </a>
        </span>
        <span className="si-item">
          <a href="mailto:pruthviraj1022004@gmail.com" aria-label="Email">
            <MdEmail />
          </a>
        </span>
      </div>
      <a className="resume-button" href="/CV.pdf" target="_blank">
        <HoverLinks text="RESUME" />
        <span>
          <TbNotes />
        </span>
      </a>
    </div>
  );
};

export default SocialIcons;
