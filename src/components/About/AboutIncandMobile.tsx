"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function AboutIncandMobile() {
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsLoaded(true);
          }
        });
      },
      {
        threshold: 0.2, // Trigger when 20% of the component is visible
      },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-[#FFF7DE]"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <Image
          src="/about/background.webp"
          alt="Background pattern"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Main Content Container */}
      <div className="relative flex min-h-screen flex-col items-center justify-between">
        {/* About Us Section */}
        <div
          className={`my-[8vh] flex w-full flex-col items-center px-[18vw] transition-opacity duration-1000 ease-out ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* About Us Title */}
          <div className="text-center">
            <h1
              className="font-hitchcut text-[8vh] leading-[7vw] font-bold text-[#880303]"
              style={{
                WebkitTextStroke: "2px black",
                paintOrder: "stroke fill",
                textShadow: "3px 3px 2px rgba(0, 0, 0, 0.25)",
                letterSpacing: "0.1em",
              }}
            >
              About
            </h1>
            <h1
              className="font-hitchcut text-[8vh] leading-[10vh] font-bold text-[#4e0202]"
              style={{
                WebkitTextStroke: "2px black",
                paintOrder: "stroke fill",
                textShadow: "3px 3px 2px rgba(0, 0, 0, 0.25)",
                letterSpacing: "0.1em",
              }}
            >
              us
            </h1>
          </div>

          {/* Description Text */}
          <p className="font-hitchcut mt-4 text-center text-[2.8vh] leading-[6vw] text-black">
            NIT Silchar&apos;s cultural extravaganza invites you into a vibrant{" "}
            <span className="font-bold text-[#D45800]">Tribal Tapestry</span>—a
            journey woven with ancient rhythms, timeless traditions, and stories
            passed through generations, where heritage comes alive and
            brilliance shines from the roots.
          </p>

          {/* Brochure Button */}
          <div className="mt-4">
              <a
              href="https://drive.google.com/file/d/1_YyluMmgFQFs9SShdlpAEvIHRfD1Nnx_/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 flex items-center gap-0 overflow-hidden rounded-full border-black border-[0.2vw] bg-[#751313] shadow-black transition-all duration-500 ease-out"
              style={{
                boxShadow: "none",
              }}
            >
              {/* Left Decorative Element */}
              <div className="relative mr-[-0.5vw] h-[5vh] w-[5vh]">
                <Image
                  src="/about/brochure.webp"
                  alt="Decoration"
                  fill
                  className="object-fill"
                />
              </div>

              {/* Button Text Background */}
              <div className="flex items-center justify-center px-1 py-2">
                <span
                  className="font-hitchcut text-[2.5vh] font-bold tracking-wider text-[#f5e6c8]"
                >
                  BROCHURE
                </span>
              </div>

              {/* Right Decorative Element (Rotated 180deg) */}
              <div className="relative ml-[-0.5vw] h-[5vh] w-[5vh] rotate-180">
                <Image
                  src="/about/brochure.webp"
                  alt="Decoration"
                  fill
                  className="object-fill"
                />
              </div>
            </a>
          </div>
        </div>

        {/* Bottom Decorative Triangles */}
        <div className="relative w-full">
          <div
            className={`transition-transform duration-1000 ease-out ${
              isLoaded ? "translate-y-0" : "translate-y-[50vh]"
            }`}
          >
            {/* Left Triangle */}
            <div className="absolute bottom-0 left-[-13vw] z-10 h-[50vh] w-[80vw]">
              <Image
                src="/about/left-triangle.webp"
                alt="Left design"
                fill
                className="object-contain object-bottom-left"
              />
            </div>

            {/* Right Triangle */}
            <div className="absolute right-[-13vw] bottom-0 h-[50vh] w-[80vw]">
              <Image
                src="/about/right-triangle.webp"
                alt="Right design"
                fill
                className="object-contain object-bottom-right"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
