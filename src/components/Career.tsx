import { useEffect } from "react";
import { setAllTimeline } from "./utils/GsapScroll";
import "./styles/Career.css";

const Career = () => {
  useEffect(() => {
    const raf = requestAnimationFrame(() => setAllTimeline());
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My journey <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Bachelor's in Data Analytics</h4>
                <h5>Università della Campania Luigi Vanvitelli · Naples</h5>
              </div>
              <h3>2022</h3>
            </div>
            <p>
              Coursework in Numerical Methods for Data Analytics, Computer
              Systems Modelling, Operations Research, and Inferential
              Statistics. Thesis on Support Vector Machine classifiers for
              image recognition.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Volunteer Coding Mentor</h4>
                <h5>Local Communities · Italy &amp; India</h5>
              </div>
              <h3>2024</h3>
            </div>
            <p>
              Designed and delivered hands-on Python and Swift curriculum
              for 5th– and 6th-grade students, empowering underprivileged
              youth to build their first applications.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Developer Student</h4>
                <h5>Apple Developer Academy @ UNINA Federico II · Naples</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Selected from a highly competitive global pool. Spearheading
              full-stack Swift projects using Challenge-Based Learning —
              advanced SwiftUI architecture, CoreML/Vision integration,
              Human Interface Guidelines, and end-to-end App Store
              lifecycle management.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Analyst &amp; Web Developer</h4>
                <h5>Pizz'Art S.r.l.s. · Caserta, Italy</h5>
              </div>
              <h3>2025 — 2026</h3>
            </div>
            <p>
              Designed, built, and maintained the company's website and online
              reservation system — bookings, email notifications, deployment,
              and SEO on Vercel behind Cloudflare.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Freelance Full-Stack &amp; iOS Developer</h4>
                <h5>Self-employed · Web &amp; Mobile</h5>
              </div>
              <h3>2025 — Now</h3>
            </div>
            <p>
              End-to-end design and delivery of web and native apps for paying
              clients and the App Store — a Next.js restaurant site and a
              published iOS news app — shipping across iOS, iPadOS, macOS, and
              visionOS.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
