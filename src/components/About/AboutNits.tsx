import React from "react";
import "./AboutNits.css";

const AboutNits: React.FC = () => {
  return (
    <section className="about-nit">
      <div className="about-bg" />

      <div className="color-overlay" />

      {/* Decorative cloud */}
      <img src="/about/cloud-left.svg" className="cloud cloud-right" />

      <div className="about-wrapper">
        {/* LEFT */}
        <div className="about-title">
          <img src="/about/cloud.svg" className="cloud cloud-top" />

          <h1>
            About <br />
            <span className="nit-highlight">NIT Silchar</span>
          </h1>

          <img src="/about/cloud-left.svg" className="cloud cloud-bottom" />
        </div>

        {/* RIGHT */}
        <div className="about-text">
          <p>
            NIT Silchar’s cultural extravaganza invites you into a vibrant{" "}
            <span className="highlight">Tribal Tapestry</span> — a journey woven
            with ancient rhythms, timeless traditions, and stories passed
            through generations, where heritage comes alive and brilliance
            shines from the roots.
          </p>
        </div>
      </div>

      {/* ICON STRIP */}
      <div className="icon-strip">
        <img src="/about/icon.svg" alt="Cultural icons" />
      </div>
    </section>
  );
};

export default AboutNits;
