"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function AboutIncand() {
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
      {/* Side Decorative Elements */}
      <div
        className={`absolute left-0 z-30 h-screen w-[80vw] transition-transform delay-300 duration-1500 ease-out ${
          isLoaded
            ? "translate-x-[-15vw] translate-y-[15vh]"
            : "translate-x-0 translate-y-0"
        }`}
      >
        <div className="h-full w-full overflow-visible">
          <Image
            draggable="false"
            src="/about/left-triangle.webp"
            alt="Left design"
            fill
            className="ml-[-10vw] object-fill object-bottom"
          />
        </div>
      </div>
      <div
        className={`absolute right-0 z-20 h-screen w-[80vw] transition-transform delay-300 duration-1500 ease-out ${
          isLoaded
            ? "translate-x-[15vw] translate-y-[15vh]"
            : "translate-x-0 translate-y-0"
        }`}
      >
        <div className="h-full w-full">
          <Image
            draggable="false"
            src="/about/right-triangle.webp"
            alt="Right design"
            fill
            className="ml-[10vw] object-fill object-bottom"
          />
        </div>
      </div>

      {/* Main Content Container */}
      <div className="flex min-h-screen flex-col justify-between">
        {/* Brochure Button - Top Right */}
        <div className="my-[18vh] flex flex-col items-center gap-[4vh]">
          <div
            className={`flex gap-[2vw] transition-transform delay-150 duration-1500 ease-out ${isLoaded ? "translate-y-[-30vh]" : "translate-y-0"}`}
          >
            <div className="relative h-[5vw] w-[5vw]">
              <Image
                src="/about/design-1.webp"
                alt="Top Left Decoration"
                fill
              />
            </div>
            <div className="relative h-[5vw] w-[5vw]">
              <Image
                src="/about/design-2.webp"
                alt="Top Left Decoration"
                fill
              />
            </div>
            <div className="relative h-[5vw] w-[5vw]">
              <Image
                src="/about/design-3.webp"
                alt="Top Left Decoration"
                fill
              />
            </div>
          </div>
          <div
            className={`z-20 transition-transform delay-150 duration-1500 ease-out ${isLoaded ? "translate-x-[30vw] translate-y-[-20vh]" : "translate-x-0 translate-y-0"}`}
          >
            <a
              href="https://drive.google.com/file/d/1_YyluMmgFQFs9SShdlpAEvIHRfD1Nnx_/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className={`relative my-[1.5vh] border-black flex items-center gap-0 overflow-hidden rounded-full border-[0.2vw] bg-[#751313] shadow-black transition-all duration-500 ease-out hover:scale-[1.3] hover:-rotate-6`}
              style={{
                boxShadow: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 1.3vh 0 0 rgba(162, 93, 93), 0 1.25vh 0 0.2vw rgba(0, 0, 0)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* Left Decorative Element */}
              <div className="relative mr-[-0.5vw] h-[3.5vw] w-[3.5vw]">
                <Image
                  src="/about/brochure.webp"
                  alt="Decoration"
                  fill
                  className="object-fill"
                />
              </div>

              {/* Button Text Background */}
              <div className="my-[1.5vh] flex items-center justify-center">
                <span
                  className="text-[1.75vw] font-bold tracking-wider text-[#f5e6c8] font-hitchcut"
                >
                  BROCHURE
                </span>
              </div>

              {/* Right Decorative Element (Rotated 180deg) */}
              <div className="relative ml-[-0.5vw] h-[3.5vw] w-[3.5vw] rotate-180">
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

        {/* Middle Section - Content with Side Designs */}
        <div className="absolute flex h-screen w-full items-center px-[22vw] min-[1800px]:px-[24vw]">
          {/* Main Content - About Us */}
          <div
            className={`flex max-w-full flex-col transition-transform delay-200 duration-1500 ease-out ${
              isLoaded ? "translate-y-0" : "translate-y-[45vh]"
            }`}
          >
            {/* About Us Title */}
            <div className="">
              <h1
                className="font-hitchcut text-[8vw] leading-[8vw] font-bold text-[#880303]"
                style={{
                  WebkitTextStroke: "2px black",
                  paintOrder: "stroke fill",
                  textShadow: "3px 3px 2px rgba(0, 0, 0, 0.25)",
                }}
              >
                About
              </h1>
            </div>
            <div className="flex max-w-full items-start gap-4">
              <h1
                className="font-hitchcut shrink-0 text-[8vw] leading-[4vw] font-bold text-[#4e0202]"
                style={{
                  WebkitTextStroke: "2px black",
                  paintOrder: "stroke fill",
                  textShadow: "3px 3px 2px rgba(0, 0, 0, 0.25)",
                }}
              >
                us
              </h1>
              {/* Description Text */}
              <p className="font-hitchcut mt-[3.5vh] min-w-0 flex-1 text-[1.75vw] text-black">
                NIT Silchar&apos;s cultural extravaganza invites you into a
                vibrant{" "}
                <span className="font-bold text-[#D45800]">
                  Tribal Tapestry
                </span>
                —a journey woven with ancient rhythms, timeless traditions, and
                stories passed through generations, where heritage comes alive
                and brilliance shines from the roots.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
