// src/components/AboutIncand.tsx
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./AboutIncand.css";

const AboutIncand: React.FC = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const iconRowRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null); //
  const leftTriRef = useRef<HTMLImageElement>(null);
  const rightTriRef = useRef<HTMLImageElement>(null);
  const brochureRef = useRef<HTMLAnchorElement>(null);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ paused: true });

    /* =============================
       INITIAL STATES (LOCKED)
    ============================== */
    gsap.set(contentRef.current, { opacity: 0, x: -140 });
    gsap.set(iconRowRef.current, { opacity: 1, y: 0 });
    gsap.set(iconRef.current, { opacity: 0, y: 40 });
    gsap.set(brochureRef.current, { x: 0, y: 0 });

    tl
      /* TRIANGLES OPEN */
      .to(
        leftTriRef.current,
        {
          x: "-18vw",
          duration: 1.2,
          ease: "power4.out",
        },
        0,
      )
      .to(
        rightTriRef.current,
        {
          x: "18vw",
          duration: 1.2,
          ease: "power4.out",
        },
        0,
      )

      /* TOP ICONS FLY AWAY */
      .to(
        iconRowRef.current,
        {
          y: -80,
          opacity: 0,
          duration: 0.6,
          ease: "power2.in",
        },
        0.3,
      )

      /* BROCHURE → TOP RIGHT */
      .to(
        brochureRef.current,
        {
          x: 1000,
          y: -50,
          duration: 0.9,
          ease: "power3.out",
        },
        0.5,
      )

      /* CONTENT IN */
      .to(
        contentRef.current,
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
        },
        0.6,
      )

      /* BOTTOM ICON STRIP IN */
      .to(
        iconRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        0.9,
      );

    const trigger = () => {
      tl.play();
      containerRef.current?.classList.add("is-active");
      window.removeEventListener("pointerdown", trigger);
    };

    window.addEventListener("pointerdown", trigger);
    return () => window.removeEventListener("pointerdown", trigger);
  }, []);

  return (
    <section ref={containerRef} className="about-container">
      <div className="bg-pattern" />

      <div className="color-overlay" />

      {/* TOP CONTROLS */}
      <div className="top-controls">
        <div ref={iconRowRef} className="top-icons">
          <img src="/about/icon-1.svg" />
          <img src="/about/icon-2.svg" />
          <img src="/about/icon-3.svg" />
        </div>

        <a
          ref={brochureRef}
          href="/about/INCAND_Brochure.pdf"
          target="_blank"
          className="brochure-btn"
        >
          <img src="/about/brochure.svg" className="brochure-svg" />
        </a>
      </div>

      {/* TRIANGLES */}
      <div className="triangles">
        <img
          ref={leftTriRef}
          src="/about/left-triangle.svg"
          className="triangle left-triangle"
        />
        <img
          ref={rightTriRef}
          src="/about/right-triangle.svg"
          className="triangle right-triangle"
        />
      </div>

      {/* CONTENT */}
      <div className="content-wrapper">
        <div ref={contentRef} className="content-inner">
          <h2 className="main-title">
            About <br />
            <span className="us-highlight">
              Us
              <br />
            </span>
          </h2>

          <p className="description">
            NIT Silchar’s cultural extravaganza invites you into a vibrant{" "}
            <span className="highlight">Tribal Tapestry</span> — a journey woven
            with ancient rhythms, timeless traditions, and stories passed
            through generations.
          </p>

          {/* BOTTOM ICON STRIP */}
          <div ref={iconRef} className="icon-strip">
            <img src="/about/icon.svg" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutIncand;
