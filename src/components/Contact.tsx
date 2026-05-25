import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        <header className="contact-head">
          <span className="contact-kicker">// get in touch</span>
          <h2 className="contact-title">
            Let's <span className="contact-title-accent">build</span> something.
          </h2>
          <p className="contact-lede">
            Open to iOS, visionOS, and ML roles — collaborations and chats
            equally welcome.
          </p>
        </header>

        <div className="contact-grid">
          <div className="contact-col">
            <div className="contact-block">
              <span className="contact-label">Email</span>
              <a
                href="mailto:pruthviraj1022004@gmail.com"
                className="contact-value"
                data-cursor="disable"
              >
                pruthviraj1022004@gmail.com
              </a>
            </div>
            <div className="contact-block">
              <span className="contact-label">Phone</span>
              <a
                href="tel:+393755775010"
                className="contact-value"
                data-cursor="disable"
              >
                +39 375 577 5010
              </a>
            </div>
            <div className="contact-block">
              <span className="contact-label">Location</span>
              <span className="contact-value">Caserta · Naples, Italy</span>
            </div>
          </div>

          <div className="contact-col">
            <span className="contact-label">Social</span>
            <a
              href="https://github.com/pruthvirajsinhpunada"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              <span>GitHub</span>
              <MdArrowOutward />
            </a>
            <a
              href="https://www.linkedin.com/in/punada-pruthviraj-4ba704239/"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              <span>LinkedIn</span>
              <MdArrowOutward />
            </a>
            <a
              href="mailto:pruthviraj1022004@gmail.com"
              data-cursor="disable"
              className="contact-social"
            >
              <span>Email</span>
              <MdArrowOutward />
            </a>
          </div>

        </div>

        <div className="contact-footer">
          <p className="contact-colo">
            Designed &amp; developed by <span>Pruthvirajsinh Punada</span>
          </p>
          <p className="contact-copyright">
            <MdCopyright /> 2026 · All rights reserved
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
